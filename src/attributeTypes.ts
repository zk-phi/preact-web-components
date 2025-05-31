import type { AttributeParser, AttributeValue } from "./preact-custom-component";

export const boolean: AttributeParser<boolean> = val => (
  (val && val !== "false" && val !== "0") || val === ""
);

export const string: AttributeParser<string> = val => (
  val == null ? "" : val.toString()
);

export const number: AttributeParser<number> = val => (
  val === null || val === "" || val === false || val === true ? NaN : Number(val)
);

export const any: AttributeParser<AttributeValue> = val => (
  val
);
