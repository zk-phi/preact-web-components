import { FunctionComponent, ComponentClass, FunctionalComponent, ComponentChildren } from 'preact';
import { Signal } from '@preact/signals';
export type AttributeValue = null | string | boolean | number;
export type PreactComponent<P> = FunctionComponent<P> | ComponentClass<P> | FunctionalComponent<P>;
type AttributeConfig<T> = {
    name: string;
    type: (value: AttributeValue) => T;
};
export type PropertyConfig<T, K extends string> = ({
    name: K;
    formAssociated?: boolean;
}) & ({
    attribute: AttributeConfig<T>;
} | {
    initialValue: T;
});
export type Options<P extends PropertyConfig<any, any>[], S extends string[]> = {
    adoptedStyleSheets?: (CSSStyleSheet | null)[];
    slots?: S;
    properties?: P;
};
type PropsFromProperties<P extends PropertyConfig<any, any>[]> = {
    [K in P[number]['name']]: Signal<Extract<P[number], {
        name: K;
    }> extends PropertyConfig<infer V, K> ? V : never>;
};
type PropsFromSlots<S extends string[]> = {
    [K in S[number]]: ComponentChildren;
};
export type ExpectedProps<P extends PropertyConfig<any, any>[], S extends string[]> = PropsFromProperties<P> & PropsFromSlots<S> & {
    children: ComponentChildren;
    $el: HTMLElement;
};
export declare const makeCustomElement: <const P extends PropertyConfig<any, any>[], const S extends string[]>(Component: PreactComponent<ExpectedProps<P, S>>, options?: Options<P, S>) => {
    new (): HTMLElement & { [K in P[number]["name"]]: Extract<P[number], {
        name: K;
    }> extends PropertyConfig<infer V, K> ? V : never; };
    observedAttributes: string[];
    formAssociated: boolean;
};
export {};
