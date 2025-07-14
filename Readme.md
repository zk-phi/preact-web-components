# preact-web-components

- 💀 This is an WIP, UNTESTED

Yet another VERY thin (<1.5KB Brotli'd, including all utility functions), opinionated wrapper to convert Preact components to Web Components, with highly-customizable attribute parsers.

## Installation

Install directly from this repo.

In `package.json`,

``` javascript
...
{
  "dependencies": {
    ...
    "preact-web-components": "zk-phi/preact-web-components#<commit-or-branch-id>"
  }
}
```

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
```

or use `register` function to directly register Preact components as Web Components.

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

## Option parameters
### Full example

``` typescript
import type { ComponentChildren } from "preact";
import {
  makeCustomElement,
  instantiateStyleSheet,
  string,
  type AttributeValue,
  type SignalLike,
} from "preact-web-components";
import styles from "./style.css?inline";

const sheet = instantiateStyleSheet([styles]);

const Input = ({ name, value, danger, icon, children }: {
  // custom element properties are wrapped with SignalLike<T>
  name: SignalLike<string>,
  value: SignalLike<string>,
  danger: SignalLike<boolean>,
  // custom element slots are wrapped as ComponentChildren
  icon: ComponentChildren,
  children: ComponentChildren,
}) => (
  <div className={`input ${danger.value ? "danger" : ""}`}>
    <label for="name">{icon} {children}</label>
    <input
      name={name.value}
      type="text"
      value={value.value}
      onInput={(e) => value.value = e.currentTarget.value} />
  </div>
);

const InputElement = makeCustomElement(Input, {
  // - Add styles to the ShadowDOM
  // This may especially be powerful when you want to reuse the same CSS
  // in many components (like reset CSS) with minimal overheads.
  adoptedStyleSheets: [sheet],
  // - Register slots
  // Create slots and pass to Preact component through its properties.
  // This is usually used for props with type `ComponentChildren`.
  slots: ["icon"],
  // - Register DOM properties
  // Create states that are both accessible from the Preact world,
  // and the vanilla JS world.
  // They look like signals from the Preact world, and the component will be
  // re-rendered on changes.
  properties: [{
    name: "value", // should be camelCase
    // This value will be emitted when enclosing `form` is "submit"-ted.
    formAssociated: true,
    // Initial values can (optionally) be retrieved from each corresponding DOM attributes.
    attribute: {
      name: "value", // should be kebab-case
      type: string,
    },
  }, {
    name: "danger",
    attribute: {
      name: "danger",
      // You may also define custom parsers for attributes
      type: (v: AttributeValue) => v && v !== "false" || v === "",
    },
  }],
});
```

### `adoptedStyleSheets`

Use this parameter to attach styles to the ShadowDOM.

This may especially be powerful when you want to reuse the same CSS in many components (like reset CSS), with minimal overheads.

Value must be an array of `CSSStyleSheet`.

There's an utility function `instantiateStyleSheet` to instantiate `CSSStyleSheet`.

### `slots`

Use this parameter to accept DOM elements as arguments to the Custom Element.

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

so that users may pass an `img` tag as the `icon` argument of the component.

``` html
<form-field label="foo">
  <img slot="icon" src="icon.svg">
  <input type="text" />
</form-field>
```

### `properties`

Use this parameter to create local states, that are both accessible from inside the Preact component, and outside (i.e. the vanilla JS world).

For an example, when you have an input component like this:

``` typescript
const MyInput = ({ value, onInput }) => (
  <input type="text" value={value} onInput={onInput} />
)
```

then you may want a `value` DOM prop,

``` typescript
const WCInput = ({ value }: {
  // DOM properties look like Signals from the Preact world
  value: Signal<string>
}) => (
  <MyInput value={value.value} />
);

const MyInputElement = makeCustomElement(WCInput, {
  ...
  props: [
    { name: "value", initialValue: "" },
  ],
});
```

so that users may update the value from outside the component.

``` typescript
const input = document.getElementsByTagName("my-input")[0];
input.value = "hello!";
```

Note that property names should be camelCase.

#### `formAssociated`

When you want to emit an input components' value on `form` submit, you may specify `formAssociated: true` for the property you want to emit.

``` typescript
const MyInputElement = makeCustomElement(WCInput, {
  ...
  props: [{
    name: "value",
    initialValue: "",
    formAssociated: true,
  }],
});
```

Users can use your component, just like other input elements this way.

#### `attribute`

When you want to retrieve initial values of DOM properties, you may specify `attribute` field of the property.

For an example, when you have a component like this:

``` typescript
const MyButton = ({ variant, onClick, children }) => (
  <button class={variant} onClick={onClick}>
    {children}
  </button>
)
```

then you may be want to read `variant` value from the DOM attributes,

``` typescript
const MyButtonElement = makeCustomElement(MyButton, {
  ...
  properties: [{
    name: "variant",
    attribute: { name: "variant", type: string }
  }],
});
```

so that users may select variant of the button through the DOM attribute `variant`.

``` html
<my-button variant="primary">Hello!</button>
```

You may also set an arbitrary parser as an attribute type.

``` typescript
const MyButtonElement = makeCustomElement(MyButton, {
  ...
  properties: [{
    name: "variant",
    attribute: {
      name: "variant",
      type: (attr: AttributeValue) => myVariantParser(attr),
    },
  }],
});
```

Note that attribute change does not overwrite property values, if they are already modified by the other reasons (this is the same behavior as normal DOM elements).

Note that attribute names should be kebab-case.

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
- `keyword(default, [...others])` ... enum parser that returns either `default` or one of the `others`
- `maybeKeywordOrNumber([...keywords])` ... enum-or-number parser with default value `undefined`
- `keywordOrNumber(default, [...others])` ... enum-or-number parser with default value `default`.

Raw attribute value
- `raw` ... identity parser that returns one of `number`, `string`, `boolean`, `null`

## Goals and non-goals
### Goals

- To make it easier to make custom elements, that behaves just like normal DOM elements

#### TODOs

- Read-only props maybe ?
- More strict types

#### Type-safety

Currently, this package's type is weak (due to technical reason -- or lack of my knowledge).

For an example, following snippet passes the type check, but is not type-safe.

``` typescript
const Component = ({ stringProp }: { stringProp: SignalLike<string> }) => (
  <span class="foo">
    {stringProp.value}
  </span>
);

const Element = makeCustomElement(Component, {
  properties: [{
    name: "stringProp",
    attributes: { name: "string-prop", type: boolean }, // type mismatch
  }],
});
```

### Non-goals

Following features are NOT planned (to keep this library simple).

- Support custom elements without ShadowDOM
  - Reason: Slots is a part of ShadowDOM API.

- Support for Preact contexts
  - Reason: You may use signals, if you need a global state.

- Support attribute reflection (auto-updating attribute values on property values change)
  - Reason: Normal DOM elements does not do that.
    - This library aims to make it easier to creating custom elements,
      that behaves just like normal DOM elements.
