const t = (n) => n && n !== "false" && n !== "0" || n === "", o = (n) => n == null ? "" : n.toString(), e = (n) => n === null || n === "" || n === !1 || n === !0 ? NaN : Number(n), r = (n) => n;
export {
  t as boolean,
  e as number,
  r as raw,
  o as string
};
//# sourceMappingURL=attributeTypes.js.map
