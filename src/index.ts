import {
  h,
  cloneElement,
  render,
  hydrate,
  type FunctionComponent,
  type ComponentClass,
  type FunctionalComponent,
  type VNode,
} from 'preact';

type PreactComponent =
  FunctionComponent<any> |
  ComponentClass<any> |
  FunctionalComponent<any>;

export type AttributeValue = null | string | boolean | number;
export type AttributeParser<T> = (a: AttributeValue) => T;
export type AttributeUnparser<T> = (p: T) => AttributeValue;

export type AttributeConfig<T> =
  AttributeParser<T> |
  { parse: AttributeParser<T>, reflect: AttributeUnparser<T> };

type Options = {
  adoptedStyleSheets?: CSSStyleSheet[],
  slots?: string[],
  properties?: string[],
  formAssociated?: string,
  attributes?: Record<string, AttributeConfig<any>>,
};

const toCamelCase = (str: string) => (
  str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
);

const Slot = (props: { name?: string }) => (
  h("slot", props)
);

export const makeCustomElement = (Component: PreactComponent, options: Options) => {
  class PreactElement extends HTMLElement {
    static observedAttributes = Object.keys(options.attributes ?? {});
    static formAssociated = !!options.formAssociated;
    _root;
    _vdom;
    _initialProps;
    _internals;

    constructor () {
      super();
      // This library assumes that the ShadowDOM feature is always enabled
      this._root = this.attachShadow({ mode: "open" });
      this._vdom = null as (VNode | null);
      this._internals = options.formAssociated ? this.attachInternals() : null;
      this._initialProps = {} as Record<string, any>;
      if (options.adoptedStyleSheets) {
        this._root.adoptedStyleSheets = options.adoptedStyleSheets;
      }
    }

    // Reflect prop/attr change to Preact props
    // -- Maybe VALUE cannot be typed in TypeScript.
    updateProp (name: string, value: any) {
      // Before the first render: reserve the new value for the first render
      if (!this._vdom) {
        this._initialProps[name] = value;
        this._initialProps[toCamelCase(name)] = value;
        return;
      }
      // After the first render: rerender UI with the new value
      const props = { [name]: value, [toCamelCase(name)]: value };
      this._vdom = cloneElement(this._vdom, props);
      render(this._vdom, this._root);
    }

    // Reflect raw attr value to Preact props if appropreate
    parseAttribute (
      name: string,
      rawValue: any,
      prepend?: boolean /* = do not overwrite existing values */
    ) {
      if (prepend && this._initialProps?.hasOwnProperty(name)) {
        return;
      }
      if (options.attributes?.[name]) {
        const config = options.attributes[name];
        const parser = ("parse" in config) ? config.parse : config;
        if (parser) {
          // Attributes value defaults to null, but Preact props value defaults to undef.
          // So we convert here for usability.
          this.updateProp(name, parser(rawValue ?? undefined));
        }
      }
    }

    connectedCallback () {
      const { attributes, childNodes } = this;
      // Parse attributes.
      // Results are accumulated in `this._initialProps` by `updateProp`.
      for (let i = 0; i < attributes.length; i++) {
        this.parseAttribute(attributes[i].name, attributes[i].value, true);
      }
      const props = this._initialProps ?? {};
      (options.slots ?? []).forEach(name => {
        props[name] = h(Slot, { name }, null)
      });
      this._vdom = h(Component, props, h(Slot, { name: undefined }, null));
      // TODO: I don't know how this works (just copy-pasted from preact-custom-component)
      (this.hasAttribute('hydrate') ? hydrate : render)(this._vdom, this._root);
    }

    disconnectedCallback () {
      this._vdom = null;
      render(null, this._root);
    }

    attributeChangedCallback (name: string, _: any, newValue: any) {
      this.parseAttribute(name, newValue);
    }
  }

  // Keep Preact props and DOM props in sync
  (options.properties ?? []).forEach(name => {
    const isAssociatedField = name === options.formAssociated;
    const config = options.attributes?.[name];
    const unparser = config && ("reflect" in config) && config.reflect;
    Object.defineProperty(PreactElement.prototype, name, {
      get () {
        return this._vdom.props[name];
      },
      set (v) {
        this.updateProp(name, v);
        if (unparser) {
          this.setAttribute(name, unparser(v));
        }
        if (isAssociatedField && this._internals) {
          this._internals.setFormValue(v);
        }
      },
    });
  });

  return PreactElement;
};

export const register = (Component: PreactComponent, tagName: string, options: Options) => {
  const element = makeCustomElement(Component, options);
  return customElements.define(tagName, element);
};
