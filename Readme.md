# preact-web-components

- 💀 This is an WIP, UNTESTED

Yet another VERY thin (< 900B Brotli'd, excluding helper functions), opinionated wrapper to convert Preact components to Web Components, with highly-customizable attribute parsers, and optimized performance powered by `@preact/signals`.

Built to implement design-systems with Web Components.

## Installation

Install directly from this repo:

in `package.json`,

``` javascript
...
{
  "dependencies": {
    ...
    "preact-web-components": "zk-phi/preact-web-components#<commit-or-branch-id>"
  }
}
```

Make sure you have installed peer dependencies (`preact`, `@preact/signals`).

## Usage

Use `makeCustomElement` function to convert Preact components,

``` typescript
import { makeCustomElement, string } from "preact-web-components";

const InputElement = makeCustomElement(Input, {
  properties: [{
    name: "value",
    formAssociated: true,
    attributes: { name: "value", type: string },
  }],
});

customElements.define("my-input", InputElement);
```

or use `register` helper function to directly register Preact components as Web Components.

``` typescript
import { register, string } from "preact-web-components";

register(Input, "my-input", {
  properties: [{
    name: "value",
    formAssociated: true,
    attributes: { name: "value", type: string },
  }],
});
```

## Pros and Cons

Pros:

- VERY thin
- seamless integration between Preact props DOM props and DOM attributes
- built-in `<slot>`s integration to give children to the components
- customizable attribute parsers to yield non-primitive DOM property values
- automatic and effortless `<form>` integration (`formAssociated`)
- reusable CSS with performance (`adoptedStyleSheets`)
- optimized re-rendering performance powered by `@preact/signals`
- components can be nested (unlike an existing implementation)
- strictly typed interface

Cons:

- `@preact/signals` is required
- Shadow DOM is required

TODOs:

- improve type usability

## Option parameters
### Full example

``` typescript
import type { ComponentChildren } from "preact";
import type { Signal } from "@preact/signals";
import {
  makeCustomElement,
  instantiateStyleSheet,
  string,
  type AttributeValue,
} from "preact-web-components";
import resetCSS from "@/styles/reset";
import styles from "./style.css?inline";

const Input = ({ name, value, danger, icon, children }: {
  // custom element properties are converted to Preact signals
  name: Signal<string>,
  value: Signal<string>,
  danger: Signal<boolean>,
  // custom element slots are converted to ComponentChildren
  icon: ComponentChildren,
  children: ComponentChildren,
}) => (
  <div className={`input ${danger.value ? "danger" : ""}`}>
    <label for="name">{icon} {children}</label>
    <input
      name={name}
      type="text"
      value={value}
      onInput={(e) => value.value = e.currentTarget.value} />
  </div>
);

const InputElement = makeCustomElement(Input, {
  // - Add styles to the ShadowDOM
  // This may especially be powerful when you want to reuse the same CSS
  // in many components (like reset CSS) with minimal overheads.
  adoptedStyleSheets: [resetCSS, instantiateStyleSheet([styles])],
  // - Register slots
  // Create slots and pass to Preact component as `ComponentChildren`.
  slots: ["icon"],
  // - Register DOM properties
  // Create states that are both accessible from the Preact world,
  // and the vanilla JS world.
  // They look like signals from the Preact world, and the component will be
  // re-rendered on changes.
  properties: [{
    name: "value", // * this should be camelCased
    // This value will be automatically emitted when submitting an enclosing `<form>`.
    formAssociated: true,
    // Initial values can (optionally) be retrieved from their corresponding DOM attributes
    attribute: {
      name: "value", // * this should be kebab-cased
      type: string,
    },
  }, {
    name: "danger",
    attribute: {
      name: "danger",
      // You may also give custom parsers for attributes
      type: (v: AttributeValue): boolean => v && v !== "false" || v === "",
    },
  }],
});
```

### `adoptedStyleSheets`

Use this parameter to attach CSS objects to the ShadowDOM.

This may especially be powerful when you want to reuse the same CSS in many components (like reset CSS), with minimal overheads.

Value must be an array of `CSSStyleSheet`.

There's a helper function `instantiateStyleSheet` to instantiate `CSSStyleSheet`.

### `slots`

Use this parameter to create slots and pass to the Preact component as `ComponentChildren`.

For an example, when you have a component like this:

``` typescript
const FormField = ({ icon, label, children }) => (
  <div>
    <label>{icon} {label}</label>
    {children}
  </div>
)
```

then you may want a slot for `icon`,

``` typescript
const FormFieldElement = makeCustomElement(FormField, {
  ...
  slots: ["icon"],
});
```

so that users may pass an `img` tag as the `icon` property of the component.

``` html
<form-field label="foo">
  <img slot="icon" src="icon.svg">
  <input type="text" />
</form-field>
```

Note that `children` slot does not need explicit declaration and automatically created by default (You may ignore or dispose it though).

### `properties`

Use this parameter to create local states, that are both accessible from inside the Preact component, and outside (i.e. the vanilla JS world).

For an example, when you have a component like this:

``` typescript
const FormField = ({ icon, label, children }) => (
  <div>
    <label>{icon} {label}</label>
    {children}
  </div>
)
```

then you may want a `label` DOM prop,

``` typescript
const FormFieldElement = makeCustomElement(FormField, {
  ...
  properties: [
    { name: "label", attribute: { name: "label", type: string } }
  ],
});
```

so that users can set `label` value via DOM attirbutes,

``` html
<form-field label="foo">
  <img slot="icon" src="icon.svg">
  <input type="text" />
</form-field>
```

or modify via the JS interface.

``` typescript
const field = document.getElementsByTagName("form-field")[0];
field.label = "bar";
```

Note that attribute change does not update property values if the property is already modified by the other reasons (this is the same behavior as normal DOM elements).

Note that property names should be camelCased, and attribute names should be kebab-cased.

#### `formAssociated`

When you want to emit an input components' value on `form` submit, you may specify `formAssociated: true` for the property you want to emit.

``` typescript
const MyInputElement = makeCustomElement(MyInput, {
  ...
  properties: [{
    name: "value",
    initialValue: "",
    formAssociated: true,
  }],
});
```

This way users can use your component just like normal input elements.

``` typescript
<form method="POST" action="/submit">
  <my-input name="field1" />
</form>
```

## Built-in attribute parsers

Boolean
- `boolean` ... simple boolean paresr

String
- `string` ... string parser with default value `""`

Number
- `number(n)` ... number parser with default value `n`
- `maybeNumber` ... number parser with default value `undefined`

Comma-separated
- `stringList` ... comma-separated string parser with default value `[]`
- `numberList` ... comma-separated number parser with default value `[]`

Keyword
- `keyword<Keys>(default, [...others])` ... enum parser that returns either `default` or one of the `others`
- `maybeKeywordOrNumber<Keys>([...keywords])` ... enum-or-number parser with default value `undefined`
- `keywordOrNumber<Keys>(default, [...others])` ... enum-or-number parser with default value `default`.

Raw attribute value
- `raw` ... identity parser that returns one of `number`, `string`, `boolean`, `null`

## Goals and non-goals
### Goals

- Making it easier to make custom elements, that behaves just like normal DOM elements

### Non-goals

Following features are NOT planned (to keep this library simple).

- Support custom elements without ShadowDOM
  - Reason: Slots is a part of ShadowDOM API.

- Support for Preact contexts
  - Reason: You may use signals, if you need a global state.

- Support attribute reflection (auto-updating attribute values on property values change)
  - Reason: Normal DOM elements does not behave like that.

### FIXMEs

- strict type inference for keyword attribute parsers
  - example: `type: keyword<"md"|"sm">("md", ["sm"])`
    - should be like this: `type: keyword("md", ["sm"])`

- complex initialValues requires readonly assertions
  - example: `numbers: Signal<readonly number[]>` for `initialValue: [1, 2, 3]`
    - should be like this: `numbers: Signal<number[]>`
