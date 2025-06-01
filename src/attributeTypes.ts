import type { AttributeValue } from ".";

export const boolean = (val: AttributeValue): boolean => (
  (val && val !== "false" && val !== "0") || val === ""
);

export const string = (val: AttributeValue): string => (
  val == null ? "" : val.toString()
);

export const number = (val: AttributeValue): number => (
  val === null || val === "" || val === false || val === true ? NaN : Number(val)
);

export const raw = (val: AttributeValue): AttributeValue => (
  val
);
