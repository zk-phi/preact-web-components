import { makeCustomElement, type PreactComponent, type Options } from "./makeCustomElement";

export const register = (
  Component: PreactComponent,
  tagName: string,
  options?: Options,
) => {
  const element = makeCustomElement(Component, options);
  return customElements.define(tagName, element);
};
