import {
  h,
  cloneElement,
  render,
  hydrate,
  type FunctionComponent,
  type ComponentClass,
  type FunctionalComponent,
  type VNode,
} from "preact";

export type AttributeValue = null | string | boolean | number;
export type SignalLike<T> = { value: T };

// ----

type PreactComponent =
  FunctionComponent<any> |
  ComponentClass<any> |
  FunctionalComponent<any>;

type AttributeConfig<T> = {
  name: string,
  type: (value: AttributeValue) => T,
};
type PropertyConfig<T> = (
  { name: string, formAssociated?: boolean }
) & (
  { attribute: AttributeConfig<T> } | { initialValue: T }
);

type Options = {
  adoptedStyleSheets?: CSSStyleSheet[],
  slots?: string[],
  properties?: PropertyConfig<any>[],
};

type AttributeChangeHandler = (v: AttributeValue) => void;
type InternalProp<T> = { _dirty: boolean, _value: T, value: T };

// ----

const Slot = (props: { name?: string }) => (
  h("slot", props)
);

// Sanitize any value to FormValue
const serializeFormValue = (value: any): string | FormData => {
  if (value == null) {
    return "";
  }
  if (typeof value !== "object") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    value.map(item => item.toString().replaceAll(",", "\\,")).join(",");
  }
  // valueType must be "object" here
  const fields = Object.keys(value);
  const formData = new FormData();
  fields.forEach(field => {
    formData.append(field, value[field].toString());
  });
  return formData;
}

const pushOrNew = <T>(obj: Record<string, T[]>, field: string, item: T) => {
  if (obj[field]) {
    obj[field].push(item);
  } else {
    obj[field] = [item];
  }
}

export const makeCustomElement = (
  Component: PreactComponent,
  options?: Options,
) => {
  const properties = options?.properties ?? [];
  const slots = options?.slots ?? [];
  const sheets = options?.adoptedStyleSheets ?? [];

  const observedAttributes = (
    properties.filter(prop => "attribute" in prop).map(prop => prop.attribute.name)
  );

  const formAssociatedField = properties.find(prop => prop.formAssociated)?.name;

  class CustomElement extends HTMLElement {
    static observedAttributes = observedAttributes;
    static formAssociated = !!formAssociatedField;
    _root;
    _vdom;
    _internals;
    _props;
    _attributeChangeHooks;

    constructor () {
      super();
      // This library assumes that the ShadowDOM feature is always enabled
      this._root = this.attachShadow({ mode: "open" });
      this._root.adoptedStyleSheets = sheets;
      this._vdom = null as (VNode | null);
      this._internals = formAssociatedField ? this.attachInternals() : null;
      this._props = {} as Record<string, InternalProp<any>>;
      this._attributeChangeHooks = {} as Record<string, AttributeChangeHandler[]>;
      properties.forEach(prop => this.registerProperty(prop));
    }

    parseAttribute <T>(attribute: AttributeConfig<T>) {
      return attribute.type(this.getAttribute(attribute.name));
    }

    registerProperty <T>(options: PropertyConfig<T>) {
      const name = options.name;

      const isAssociatedField = formAssociatedField === name;
      const getter = () => this._props[name].value;
      const setter = (value: T, markAsDirty: boolean) => {
        if (value !== this._props[name].value) {
          this._props[name]._value = value;
          if (markAsDirty) {
            this._props[name]._dirty = true;
          }
          if (isAssociatedField && this._internals) {
            this._internals.setFormValue(serializeFormValue(value));
          }
          this.rerender();
        }
      };
      Object.defineProperty(this, name, {
        get: getter,
        set: (value: T) => setter(value, true),
      });

      const initialValue = "initialValue" in options ? (
        options.initialValue
      ) : (
        this.parseAttribute(options.attribute)
      );
      this._props[name] = {
        _value: initialValue,
        _dirty: false,
        get value () { return this._value; },
        set value (v: T) { setter(v, true); },
      };

      if ("attribute" in options) {
        const onAttributeChange = (newValue: AttributeValue) => {
          if (!this._props[name]?._dirty) {
            setter(options.attribute.type(newValue), false);
          }
        };
        pushOrNew(this._attributeChangeHooks, name, onAttributeChange);
      }
    }

    rerender () {
      if (this._vdom) {
        this._vdom = cloneElement(this._vdom, this._props);
        render(this._vdom, this._root);
      }
    }

    connectedCallback () {
      const slots = Object.fromEntries(
        (options?.slots ?? []).map(slot => [
          slot,
          h(Slot, { name: slot }, null),
        ]),
      );
      const props = { ...this._props, ...slots };
      this._vdom = h(Component, props, h(Slot, { name: undefined }, null));
      // TODO: I don't know how this works (just copy-pasted from preact-custom-component)
      (this.hasAttribute('hydrate') ? hydrate : render)(this._vdom, this._root);
    }

    disconnectedCallback () {
      this._vdom = null;
      render(null, this._root);
    }

    attributeChangedCallback (name: string, _: AttributeValue, newValue: AttributeValue) {
      if (this._attributeChangeHooks[name]) {
        this._attributeChangeHooks[name].forEach(hook => hook(newValue));
      }
    }
  }

  return CustomElement;
};

export const register = (
  Component: PreactComponent,
  tagName: string,
  options?: Options,
) => {
  const element = makeCustomElement(Component, options);
  return customElements.define(tagName, element);
};
