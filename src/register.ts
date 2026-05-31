import {
  makeCustomElement,
  type PreactComponent,
  type Options,
  type PropertyConfig,
  type ExpectedProps,
} from "./makeCustomElement";

export const register = <
  const P extends PropertyConfig<any, any>[],
  const S extends string[],
>(
  Component: PreactComponent<ExpectedProps<P, S>>,
  tagName: string,
  options: Options<P, S> = {},
) => {
  const element = makeCustomElement(Component, options);
  return customElements.define(tagName, element);
};
