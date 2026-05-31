import { PreactComponent, Options, PropertyConfig, ExpectedProps } from './makeCustomElement';
export declare const register: <const P extends PropertyConfig<any, any>[], const S extends string[]>(Component: PreactComponent<ExpectedProps<P, S>>, tagName: string, options?: Options<P, S>) => void;
