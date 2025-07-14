import {
  h,
  cloneElement,
  render,
  type FunctionComponent,
  type ComponentClass,
  type FunctionalComponent,
  type VNode,
} from "preact";

export type AttributeValue = null | string | boolean | number;
export type SignalLike<T> = { value: T };

// ----

export type PreactComponent =
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

export type Options = {
  adoptedStyleSheets?: (CSSStyleSheet | null)[],
  slots?: string[],
  properties?: PropertyConfig<any>[],
};

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
  if (typeof value === "boolean") {
    return value ? "1" : "0";
  }
  // string or number
  if (typeof value !== "object") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    value.map(item => item.toString().replaceAll(",", "\\,")).join(",");
  }
  // valueType must be "object" here
  const fields = Object.keys(value);
  const formData = new FormData();
  for (const field of fields) {
    formData.append(field, value[field].toString());
  }
  return formData;
}

export const makeCustomElement = (
  Component: PreactComponent,
  options?: Options,
) => {
  const properties = options?.properties ?? [];
  const slots = options?.slots ?? [];
  const sheets = options?.adoptedStyleSheets?.filter(s => !!s) ?? [];
  const attributes = Object.fromEntries(
    properties.filter(prop => "attribute" in prop).map(prop => (
      [prop.attribute.name, { prop: prop.name, parser: prop.attribute.type }]
    )),
  );
  const observedAttributes = Object.keys(attributes);
  const formAssociatedField = properties.find(prop => prop.formAssociated)?.name;

  class CustomElement extends HTMLElement {
    static observedAttributes = observedAttributes;
    static formAssociated = !!formAssociatedField;
    _root: ShadowRoot;
    _vdom: VNode | null = null;
    _internals: ElementInternals | null;
    _props: Record<string, InternalProp<any>>;
    _frameRequested = false;

    constructor () {
      super();
      // This library assumes that the ShadowDOM feature is always enabled
      this._root = this.attachShadow({ mode: "open" });
      this._root.adoptedStyleSheets = sheets;
      this._vdom = null as (VNode | null);
      this._internals = formAssociatedField ? this.attachInternals() : null;
      const el = this;
      this._props = Object.fromEntries(
        properties.map(prop => {
          const initialValue = "initialValue" in prop ? (
            prop.initialValue
          ) : (
            this.parseAttribute(prop.attribute)
          );
          return [prop.name, {
            _dirty: false,
            _value: initialValue,
            get value () { return this._value; },
            set value (value: any) { el.setProp(prop.name, value, true); },
          }];
        })
      );
    }

    parseAttribute <T>(attribute: AttributeConfig<T>) {
      return attribute.type(this.getAttribute(attribute.name));
    }

    setProp (name: string, value: any, markAsDirty: boolean) {
      if (this._props[name]._value !== value) {
        this._props[name]._value = value;
        if (markAsDirty) {
          this._props[name]._dirty = true;
        }
        if (formAssociatedField === name && this._internals) {
          this._internals.setFormValue(serializeFormValue(value));
        }
        this.rerender();
      }
    }

    rerender () {
      if (!this._frameRequested) {
        requestAnimationFrame(() => {
          if (this._vdom) {
            this._frameRequested = false;
            this._vdom = cloneElement(this._vdom, this._props);
            render(this._vdom, this._root);
          }
        });
      }
    }

    connectedCallback () {
      const vSlots: Record<string, VNode<any>> = Object.fromEntries(
        slots.map(slot => [slot, h(Slot, { name: slot }, null)]),
      );
      const props = { $el: this, ...this._props, ...vSlots };
      this._vdom = h(Component, props, h(Slot, { name: undefined }, null));
      render(this._vdom, this._root);
    }

    disconnectedCallback () {
      this._vdom = null;
      render(null, this._root);
    }

    attributeChangedCallback (name: string, _: AttributeValue, newValue: AttributeValue) {
      const { parser, prop } = attributes[name];
      if (!this._props[prop]._dirty) {
        this.setProp(prop, parser(newValue), false);
      }
    }
  }

  for (const prop of properties) {
    Object.defineProperty(CustomElement.prototype, prop.name, {
      get () {
        return this._props[prop.name]._value;
      },
      set (value: any) {
        this.setProp(prop.name, value, true);
      },
    });
  }

  return CustomElement;
};
