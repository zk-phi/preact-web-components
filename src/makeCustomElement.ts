import {
  h,
  render,
  type FunctionComponent,
  type ComponentClass,
  type FunctionalComponent,
  type VNode,
  type ComponentChildren,
} from "preact";
import { signal, type Signal } from "@preact/signals";

export type AttributeValue = null | string | boolean | number;

// ----

export type PreactComponent<P> =
  FunctionComponent<P> |
  ComponentClass<P> |
  FunctionalComponent<P>;

type AttributeConfig<T> = {
  name: string,
  type: (value: AttributeValue) => T,
};

export type PropertyConfig<T, K extends string> = (
  { name: K, formAssociated?: boolean }
) & (
  { attribute: AttributeConfig<T> } | { initialValue: T }
);

export type Options<
  P extends PropertyConfig<any, any>[],
  S extends string[]
> = {
  adoptedStyleSheets?: (CSSStyleSheet | null)[],
  slots?: S,
  properties?: P,
};

type PropsFromProperties<P extends PropertyConfig<any, any>[]> = {
  [K in P[number]["name"]]: Signal<
    Extract<P[number], { name: K }> extends PropertyConfig<infer V, K> ? V : never
  >;
};

type PropsFromSlots<S extends string[]> = {
  [K in S[number]]: ComponentChildren;
};

export type ExpectedProps<P extends PropertyConfig<any, any>[], S extends string[]> =
  PropsFromProperties<P> &
  PropsFromSlots<S> &
  { children: ComponentChildren, $el: HTMLElement };

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
    return value.map(item => item.toString().replaceAll(",", "\\,")).join(",");
  }
  // valueType must be "object" here
  const fields = Object.keys(value);
  const formData = new FormData();
  for (const field of fields) {
    formData.append(field, value[field].toString());
  }
  return formData;
}

export const makeCustomElement = <
  const P extends PropertyConfig<any, any>[],
  const S extends string[],
>(
  Component: PreactComponent<ExpectedProps<P, S>>,
  options: Options<P, S> = {},
) => {
  const properties: PropertyConfig<any, any>[] = options.properties ?? [];
  const slots: string[] = options.slots ?? [];
  const sheets = options.adoptedStyleSheets?.filter(s => !!s) ?? [];
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
    _internals: ElementInternals | null;
    _props: Record<string, Signal<any>>;
    _dirtyAttrs: Record<string, true>;
    _frameRequested = false;

    constructor () {
      super();
      // This library assumes that the ShadowDOM feature is always enabled
      this._root = this.attachShadow({ mode: "open" });
      this._root.adoptedStyleSheets = sheets;
      this._internals = formAssociatedField ? this.attachInternals() : null;
      this._dirtyAttrs = {};
      this._props = Object.fromEntries(
        properties.map(prop => {
          const initialValue = "initialValue" in prop ? (
            prop.initialValue
          ) : (
            this.parseAttribute(prop.attribute)
          );
          if (formAssociatedField === prop.name && this._internals) {
            this._internals.setFormValue(serializeFormValue(initialValue));
          }
          return [prop.name, signal(initialValue)];
        })
      );
    }

    parseAttribute <T>(attribute: AttributeConfig<T>) {
      return attribute.type(this.getAttribute(attribute.name));
    }

    setProp (name: string, value: any, markAsDirty: boolean) {
      if (this._props[name].value !== value) {
        this._props[name].value = value;
        if (markAsDirty) {
          this._dirtyAttrs[name] = true;
        }
        if (formAssociatedField === name && this._internals) {
          this._internals.setFormValue(serializeFormValue(value));
        }
      }
    }

    connectedCallback () {
      const vSlots: Record<string, VNode<any>> = Object.fromEntries(
        slots.map(slot => [slot, h(Slot, { name: slot }, null)]),
      );
      const props = { $el: this, ...this._props, ...vSlots } as unknown as ExpectedProps<P, S>;
      const vdom = h(Component, props, h(Slot, { name: undefined }, null));
      render(vdom, this._root);
    }

    disconnectedCallback () {
      render(null, this._root);
    }

    attributeChangedCallback (name: string, _: AttributeValue, newValue: AttributeValue) {
      const { parser, prop } = attributes[name];
      if (!this._dirtyAttrs[prop]) {
        this.setProp(prop, parser(newValue), false);
      }
    }
  }

  for (const prop of properties) {
    Object.defineProperty(CustomElement.prototype, prop.name, {
      get () {
        return this._props[prop.name].value;
      },
      set (value: any) {
        this.setProp(prop.name, value, true);
      },
    });
  }

  return CustomElement as unknown as {
    new (): HTMLElement & {
      [K in P[number]['name']]:
      Extract<P[number], { name: K }> extends PropertyConfig<infer V, K> ? V : never
    };
    observedAttributes: string[];
    formAssociated: boolean;
  };
};
