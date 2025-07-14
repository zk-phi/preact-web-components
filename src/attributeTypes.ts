import type { AttributeValue } from "./makeCustomElement";

export const boolean = (val: AttributeValue): boolean => (
  (val && val !== "false" && val !== "0") || val === ""
);

export const string = (val: AttributeValue): string => (
  val == null ? "" : val.toString()
);

export const maybeNumber = (val: AttributeValue): number | undefined => (
  typeof val === "number" ? (
    val
  ) : val == null || val === "" ? (
    undefined
  ) : typeof val === "string" ? (
    Number(val)
  ) : (
    Number.NaN
  )
);

export const number = (n: number) => (
  (val: AttributeValue) => maybeNumber(val) ?? n
);

export const stringList = (val: AttributeValue): string[] => (
  val == null || val === "" ? (
    []
  ) : typeof val === "string" ? (
    // non-empty string
    val.split(",")
  ) : (
    // boolean or number
    [val.toString()]
  )
);

export const numberList = (val: AttributeValue): number[] => {
  const list = stringList(val);
  return list.map(str => str === "" ? Number.NaN : Number(str));
};

export const raw = (val: AttributeValue): AttributeValue => (
  val
);

export const maybeKeyword = <Key>(items: Key[]) => {
  return (val: AttributeValue): Key | undefined => {
    const string = val?.toString() ?? "";
    return items.find(item => item === string) ?? undefined;
  };
};

export const keyword = <Key>(deflt: Key, others: Key[]) => {
  const find = maybeKeyword(others);
  return (val: AttributeValue): Key => find(val) ?? deflt;
};

export const maybeKeywordOrNumber = <Key>(others: Key[]) => {
  const find = maybeKeyword(others);
  return (val: AttributeValue): Key | number | undefined => find(val) ?? maybeNumber(val);
};

export const keywordOrNumber = <Key>(deflt: Key | number, others: Key[] = []) => {
  const find = maybeKeywordOrNumber([deflt, ...others]);
  return (val: AttributeValue): Key | number => find(val) ?? deflt;
};
