# preact-web-components

WIP UN-TESTED

Yet another very thin, simple-minded wrapper to convert Preact components to Web Components, with fully-customizable attribute parsers.

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
import { makeCustomElement, type AttributeValue } from "preact-web-components";
import { string } from "preact-web-components/attribute-types";
import MyInput from "./MyInput";
import styles from "./style.css?inline";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const MyInputElement = makeCustomElement(MyInput, {
  // Add styles to the ShadowDOM
  adoptedStyleSheets: [sheet],
  // Create slots and pass to Preact component through its properties
  // eg. When set `["label"]`, then `<slot name="label" />` is passed to the `label` prop
  slots: ["label"],
  // Expose some properties to update/read property values from outside the component
  properties: ["onInput", "value"],
  // Integrate "value" prop to the enclosing "form" tag
  formAssociated: "value"
  // Set attribute parsers to read initial props from DOM attributes
  attributes: {
    value: string,
    "my-special-attr": (attrValue: AttributeValue) => (
      mySpecialParser(attrValue)
    ),
    "my-another-attr": {
      parse: (attrValue: AttributeValue) => myAnotherParser(attrValue),
      reflect: (propValue: MyAnotherValue) => myAnotherSerializer(propValue),
    },
  },
});
```

or use `register` function to directly register Preact components as Web Components.

``` typescript
import { register, type AttributeValue } from "preact-web-components";

...
register(MyInput, "my-input", {
  ...options,
});
```

## Option parameters
### `adoptedStyleSheets`

Use this parameter to attach styles to the ShadowDOM.

This may especially be powerful to reuse the same CSS in many components (like reset CSS).

Value must be an array of `CSSStyleSheet`.

### `slots`

Use this parameter to accept DOM elements as argument to the Custom Element.

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

Specify which properties should be exposed, to make them readable/updatable from the vanilla JS world.

For an example, when you have an input component like this:

``` typescript
const MyInput = ({ value, onInput }) => (
  <input type="text" value={value} onInput={onInput} />
)
```

then you may want to expose `value` prop,

``` typescript
const MyInputElement = makeCustomElement(MyInput, {
  ...
  props: ["value"],
});
```

so that users may update the value from outside the component.

``` typescript
const input = document.getElementsByTagName("my-input")[0];
input.value = "hello!";
```

### `formAssociated`

Specify which property value should be integrated with the enclosing `form` tag.

You may usually want to integrate `value` prop of input elements with `form`s.

### `attributes`

Specify attribute parsers to read initial prop values from DOM attributes.

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
  attributes: {
    "variant": string,
  },
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
  attributes: {
    "variant": (attr: AttributeValue) => myVariantParser(attr),
  },
});
```

If you want to reflect the prop changes back to attributes, you may also set `parse`/`reflect` pair as an attribute type.

``` typescript
const MyButtonElement = makeCustomElement(MyButton, {
  ...
  attributes: {
    "variant": {
      parse: (attr: AttributeValue) => myVariantParser(attr),
      reflect: (prop: VariantObj) => myVariantSerializer(prop),
    },
  },
});
```

## TODO

- Customizable attr-name and variable-name mapping
- Utility hook like `useState` but the value can be seen from outside as a element prop
- Read-only props

## Non-goals

Following features are NOT planned (to keep this library simple).

- Support custom elements without ShadowDOM
  - Reason: Slots is a part of ShadowDOM API

- Support for Preact contexts
  - Reason: You may use signals, if you need a global state.
