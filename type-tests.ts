import type { Signal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import { makeCustomElement } from "./src/makeCustomElement";
import { string, boolean, number } from "./src/attributeTypes";

const FullComponent = ({
  $el,
  name,
  age,
  slot,
  children,
}: {
  $el: HTMLElement,
  name: Signal<string>,
  age: Signal<number>,
  slot: ComponentChildren,
  children: ComponentChildren,
}) => null;

const SimpleComponent = ({
  name,
  age,
  slot,
}: {
  name: Signal<string>,
  age: Signal<number>,
  slot: ComponentChildren,
}) => null;

const ComponentWithInvalidProp = ({
  name,
  age,
  slot,
}: {
  name: string,
  age: number,
  slot: ComponentChildren,
}) => null;

const ComponentWithInvalidSlot = ({
  name,
  age,
  slot,
}: {
  name: Signal<string>,
  age: Signal<number>,
  slot: string,
}) => null;

// 1-1. Valid case
const ValidElement = makeCustomElement(FullComponent, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
    { name: "age", attribute: { name: "age", type: number(0) } },
  ],
  slots: ["slot"],
});

// Instance property check
const element = new ValidElement();
element.name = "hello"; // Should be OK
// @ts-expect-error: 'unknown' property does not exist on the custom element
element.unknown = 123;

// 1-2. Valid case without children and $el
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
    { name: "age", attribute: { name: "age", type: number(0) } },
  ],
  slots: ["slot"],
});

// 1-3. Valid case with extra field
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
    { name: "age", attribute: { name: "age", type: number(0) } },
    { name: "extra", attribute: { name: "extra", type: boolean } },
  ],
  slots: ["slot"],
});

// 1-4. Valid case with initialValues
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", initialValue: "" },
    { name: "age", initialValue: 0 },
  ],
  slots: ["slot"],
});

// @ts-expect-error: 2-1. Error case: Invalid prop in component
makeCustomElement(ComponentWithInvalidProp, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
    { name: "age", attribute: { name: "age", type: number(0) } },
  ],
  slots: ["slot"],
});

// @ts-expect-error: 2-1. Error case: Invalid slot in component
makeCustomElement(ComponentWithInvalidSlot, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
    { name: "age", attribute: { name: "age", type: number(0) } },
  ],
  slots: ["slot"],
});

// @ts-expect-error: 3-1. Error case: Missing property in options
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
  ],
  slots: ["slot"],
});

// @ts-expect-error: 3-2. Error case: Missing slot in options
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
    { name: "age", attribute: { name: "age", type: number(0) } },
  ],
});

// @ts-expect-error: 4-1. Error case: Signal type mismatch
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", attribute: { name: "name", type: number(0) } },
    { name: "age", attribute: { name: "age", type: string } },
  ],
  slots: ["slot"],
});

// @ts-expect-error: 4-2. Error case: initialValue type mismatch
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", initialValue: 0 },
    { name: "age", initialValue: "" },
  ],
  slots: ["slot"],
});

// @ts-expect-error: 4-3. Error case: Slot/prop mismatch
makeCustomElement(SimpleComponent, {
  properties: [
    { name: "name", attribute: { name: "name", type: string } },
  ],
  slots: ["slot", "age"],
});
