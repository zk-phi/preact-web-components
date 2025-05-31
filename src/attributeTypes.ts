import type { AttributeConfig, AttributeValue } from ".";

export const boolean: AttributeConfig<boolean> = {
  parse: val => (
    (val && val !== "false" && val !== "0") || val === ""
  ),
  reflect: val => val,
};

export const string: AttributeConfig<string> = {
  parse: val => (
    val == null ? "" : val.toString()
  ),
  reflect: val => val,
};

export const number: AttributeConfig<number> = {
  parse: val => (
    val === null || val === "" || val === false || val === true ? NaN : Number(val)
  ),
  reflect: val => val,
};

export const any: AttributeConfig<AttributeValue> = {
  parse: val => val,
  reflect: val => val,
};
