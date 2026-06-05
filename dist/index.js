var k = Object.defineProperty;
var O = (t, e, r) => e in t ? k(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var c = (t, e, r) => O(t, typeof e != "symbol" ? e + "" : e, r);
import { h as p, render as _ } from "preact";
import { signal as V } from "@preact/signals";
const D = (t) => t && t !== "false" && t !== "0" || t === "", K = (t) => t == null ? "" : t.toString(), A = (t) => typeof t == "number" ? t : t == null || t === "" ? void 0 : typeof t == "string" ? Number(t) : Number.NaN, q = (t) => (e) => A(e) ?? t, C = (t) => t == null || t === "" ? [] : typeof t == "string" ? (
  // non-empty string
  t.split(",")
) : (
  // boolean or number
  [t.toString()]
), z = (t) => C(t).map((r) => r === "" ? Number.NaN : Number(r)), H = (t) => t, N = (t) => (e) => {
  const r = (e == null ? void 0 : e.toString()) ?? "";
  return t.find((n) => n === r) ?? void 0;
}, I = (t, e) => {
  const r = N(e);
  return (n) => r(n) ?? t;
}, E = (t) => {
  const e = N(t);
  return (r) => e(r) ?? A(r);
}, M = (t, e = []) => {
  const r = E([t, ...e]);
  return (n) => r(n) ?? t;
}, S = (t) => p("slot", t), g = (t) => {
  if (t == null)
    return "";
  if (typeof t == "boolean")
    return t ? "1" : "0";
  if (typeof t != "object")
    return t.toString();
  if (Array.isArray(t))
    return t.map((n) => n.toString().replaceAll(",", "\\,")).join(",");
  const e = Object.keys(t), r = new FormData();
  for (const n of e)
    r.append(n, t[n].toString());
  return r;
}, F = (t, e = {}) => {
  var d, b;
  const r = e.properties ?? [], n = e.slots ?? [], w = ((d = e.adoptedStyleSheets) == null ? void 0 : d.filter((o) => !!o)) ?? [], f = Object.fromEntries(
    r.filter((o) => "attribute" in o).map((o) => [o.attribute.name, { prop: o.name, parser: o.attribute.type }])
  ), j = Object.keys(f), u = (b = r.find((o) => o.formAssociated)) == null ? void 0 : b.name;
  class m extends HTMLElement {
    constructor() {
      super();
      c(this, "_root");
      c(this, "_internals");
      c(this, "_props");
      c(this, "_dirtyAttrs");
      c(this, "_frameRequested", !1);
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = w, this._internals = u ? this.attachInternals() : null, this._dirtyAttrs = {}, this._props = Object.fromEntries(
        r.map((s) => {
          const i = "initialValue" in s ? s.initialValue : this.parseAttribute(s.attribute);
          return u === s.name && this._internals && this._internals.setFormValue(g(i)), [s.name, V(i)];
        })
      );
    }
    parseAttribute(s) {
      return s.type(this.getAttribute(s.name));
    }
    setProp(s, i, a) {
      this._props[s].value !== i && (this._props[s].value = i, a && (this._dirtyAttrs[s] = !0), u === s && this._internals && this._internals.setFormValue(g(i)));
    }
    connectedCallback() {
      const s = Object.fromEntries(
        n.map((l) => [l, p(S, { name: l }, null)])
      ), i = { $el: this, ...this._props, ...s }, a = p(t, i, p(S, { name: void 0 }, null));
      _(a, this._root);
    }
    disconnectedCallback() {
      _(null, this._root);
    }
    attributeChangedCallback(s, i, a) {
      const { parser: l, prop: y } = f[s];
      this._dirtyAttrs[y] || this.setProp(y, l(a), !1);
    }
  }
  c(m, "observedAttributes", j), c(m, "formAssociated", !!u);
  for (const o of r)
    Object.defineProperty(m.prototype, o.name, {
      get() {
        return this._props[o.name].value;
      },
      set(h) {
        this.setProp(o.name, h, !0);
      }
    });
  return m;
}, R = (t, e, r = {}) => {
  const n = F(t, r);
  return customElements.define(e, n);
}, T = (...t) => {
  if (typeof window > "u")
    return null;
  const e = new CSSStyleSheet();
  return e.replaceSync(t.join("")), e;
};
export {
  D as boolean,
  T as instantiateStyleSheet,
  I as keyword,
  M as keywordOrNumber,
  F as makeCustomElement,
  N as maybeKeyword,
  E as maybeKeywordOrNumber,
  A as maybeNumber,
  q as number,
  z as numberList,
  H as raw,
  R as register,
  K as string,
  C as stringList
};
//# sourceMappingURL=index.js.map
