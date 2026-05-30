var k = Object.defineProperty;
var O = (t, e, r) => e in t ? k(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var c = (t, e, r) => O(t, typeof e != "symbol" ? e + "" : e, r);
import { cloneElement as E, render as f, h as l } from "preact";
const R = (t) => t && t !== "false" && t !== "0" || t === "", L = (t) => t == null ? "" : t.toString(), A = (t) => typeof t == "number" ? t : t == null || t === "" ? void 0 : typeof t == "string" ? Number(t) : Number.NaN, x = (t) => (e) => A(e) ?? t, F = (t) => t == null || t === "" ? [] : typeof t == "string" ? (
  // non-empty string
  t.split(",")
) : (
  // boolean or number
  [t.toString()]
), D = (t) => F(t).map((r) => r === "" ? Number.NaN : Number(r)), K = (t) => t, N = (t) => (e) => {
  const r = (e == null ? void 0 : e.toString()) ?? "";
  return t.find((s) => s === r) ?? void 0;
}, z = (t, e) => {
  const r = N(e);
  return (s) => r(s) ?? t;
}, V = (t) => {
  const e = N(t);
  return (r) => e(r) ?? A(r);
}, H = (t, e = []) => {
  const r = V([t, ...e]);
  return (s) => r(s) ?? t;
}, S = (t) => l("slot", t), g = (t) => {
  if (t == null)
    return "";
  if (typeof t == "boolean")
    return t ? "1" : "0";
  if (typeof t != "object")
    return t.toString();
  if (Array.isArray(t))
    return t.map((s) => s.toString().replaceAll(",", "\\,")).join(",");
  const e = Object.keys(t), r = new FormData();
  for (const s of e)
    r.append(s, t[s].toString());
  return r;
}, q = (t, e) => {
  var _, b;
  const r = (e == null ? void 0 : e.properties) ?? [], s = (e == null ? void 0 : e.slots) ?? [], w = ((_ = e == null ? void 0 : e.adoptedStyleSheets) == null ? void 0 : _.filter((n) => !!n)) ?? [], h = Object.fromEntries(
    r.filter((n) => "attribute" in n).map((n) => [n.attribute.name, { prop: n.name, parser: n.attribute.type }])
  ), j = Object.keys(h), u = (b = r.find((n) => n.formAssociated)) == null ? void 0 : b.name;
  class m extends HTMLElement {
    constructor() {
      super();
      c(this, "_root");
      c(this, "_vdom", null);
      c(this, "_internals");
      c(this, "_props");
      c(this, "_frameRequested", !1);
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = w, this._vdom = null, this._internals = u ? this.attachInternals() : null;
      const i = this;
      this._props = Object.fromEntries(
        r.map((o) => {
          const a = "initialValue" in o ? o.initialValue : this.parseAttribute(o.attribute);
          return u === o.name && this._internals && this._internals.setFormValue(g(a)), [o.name, {
            _dirty: !1,
            _value: a,
            get value() {
              return this._value;
            },
            set value(d) {
              i.setProp(o.name, d, !0);
            }
          }];
        })
      );
    }
    parseAttribute(i) {
      return i.type(this.getAttribute(i.name));
    }
    setProp(i, o, a) {
      this._props[i]._value !== o && (this._props[i]._value = o, a && (this._props[i]._dirty = !0), u === i && this._internals && this._internals.setFormValue(g(o)), this.rerender());
    }
    rerender() {
      this._frameRequested || (this._frameRequested = !0, requestAnimationFrame(() => {
        this._vdom && (this._frameRequested = !1, this._vdom = E(this._vdom, this._props), f(this._vdom, this._root));
      }));
    }
    connectedCallback() {
      const i = Object.fromEntries(
        s.map((a) => [a, l(S, { name: a }, null)])
      ), o = { $el: this, ...this._props, ...i };
      this._vdom = l(t, o, l(S, { name: void 0 }, null)), f(this._vdom, this._root);
    }
    disconnectedCallback() {
      this._vdom = null, f(null, this._root);
    }
    attributeChangedCallback(i, o, a) {
      const { parser: d, prop: y } = h[i];
      this._props[y]._dirty || this.setProp(y, d(a), !1);
    }
  }
  c(m, "observedAttributes", j), c(m, "formAssociated", !!u);
  for (const n of r)
    Object.defineProperty(m.prototype, n.name, {
      get() {
        return this._props[n.name]._value;
      },
      set(p) {
        this.setProp(n.name, p, !0);
      }
    });
  return m;
}, I = (t, e, r) => {
  const s = q(t, r);
  return customElements.define(e, s);
}, M = (...t) => {
  if (typeof window > "u")
    return null;
  const e = new CSSStyleSheet();
  return e.replaceSync(t.join("")), e;
};
export {
  R as boolean,
  M as instantiateStyleSheet,
  z as keyword,
  H as keywordOrNumber,
  q as makeCustomElement,
  N as maybeKeyword,
  V as maybeKeywordOrNumber,
  A as maybeNumber,
  x as number,
  D as numberList,
  K as raw,
  I as register,
  L as string,
  F as stringList
};
//# sourceMappingURL=index.js.map
