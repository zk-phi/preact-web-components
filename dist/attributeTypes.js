const r = {
  parse: (e) => e && e !== "false" && e !== "0" || e === "",
  reflect: (e) => e
}, t = {
  parse: (e) => e == null ? "" : e.toString(),
  reflect: (e) => e
}, n = {
  parse: (e) => e === null || e === "" || e === !1 || e === !0 ? NaN : Number(e),
  reflect: (e) => e
}, s = {
  parse: (e) => e,
  reflect: (e) => e
};
export {
  s as any,
  r as boolean,
  n as number,
  t as string
};
//# sourceMappingURL=attributeTypes.js.map
