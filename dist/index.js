var j = Object.defineProperty;
var k = (t, e, r) => e in t ? j(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var a = (t, e, r) => k(t, typeof e != "symbol" ? e + "" : e, r);
import { cloneElement as O, render as f, h as m } from "preact";
const L = (t) => t && t !== "false" && t !== "0" || t === "", R = (t) => t == null ? "" : t.toString(), g = (t) => typeof t == "number" ? t : t == null || t === "" ? void 0 : typeof t == "string" ? Number(t) : Number.NaN, x = (t) => (e) => g(e) ?? t, E = (t) => t == null || t === "" ? [] : typeof t == "string" ? (
  // non-empty string
  t.split(",")
) : (
  // boolean or number
  [t.toString()]
), D = (t) => E(t).map((r) => r === "" ? Number.NaN : Number(r)), K = (t) => t, A = (t) => (e) => {
  const r = (e == null ? void 0 : e.toString()) ?? "";
  return t.find((s) => s === r) ?? void 0;
}, z = (t, e) => {
  const r = A(e);
  return (s) => r(s) ?? t;
}, C = (t) => {
  const e = A(t);
  return (r) => e(r) ?? g(r);
}, H = (t, e = []) => {
  const r = C([t, ...e]);
  return (s) => r(s) ?? t;
}, S = (t) => m("slot", t), F = (t) => {
  if (t == null)
    return "";
  if (typeof t == "boolean")
    return t ? "1" : "0";
  if (typeof t != "object")
    return t.toString();
  Array.isArray(t) && t.map((s) => s.toString().replaceAll(",", "\\,")).join(",");
  const e = Object.keys(t), r = new FormData();
  for (const s of e)
    r.append(s, t[s].toString());
  return r;
}, P = (t, e) => {
  var _, p;
  const r = (e == null ? void 0 : e.properties) ?? [], s = (e == null ? void 0 : e.slots) ?? [], N = ((_ = e == null ? void 0 : e.adoptedStyleSheets) == null ? void 0 : _.filter((n) => !!n)) ?? [], h = Object.fromEntries(
    r.filter((n) => "attribute" in n).map((n) => [n.attribute.name, { prop: n.name, parser: n.attribute.type }])
  ), w = Object.keys(h), l = (p = r.find((n) => n.formAssociated)) == null ? void 0 : p.name;
  class u extends HTMLElement {
    constructor() {
      super();
      a(this, "_root");
      a(this, "_vdom", null);
      a(this, "_internals");
      a(this, "_props");
      a(this, "_frameRequested", !1);
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = N, this._vdom = null, this._internals = l ? this.attachInternals() : null;
      const i = this;
      this._props = Object.fromEntries(
        r.map((o) => {
          const c = "initialValue" in o ? o.initialValue : this.parseAttribute(o.attribute);
          return [o.name, {
            _dirty: !1,
            _value: c,
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
    setProp(i, o, c) {
      this._props[i]._value !== o && (this._props[i]._value = o, c && (this._props[i]._dirty = !0), l === i && this._internals && this._internals.setFormValue(F(o)), this.rerender());
    }
    rerender() {
      this._frameRequested || requestAnimationFrame(() => {
        this._vdom && (this._frameRequested = !1, this._vdom = O(this._vdom, this._props), f(this._vdom, this._root));
      });
    }
    connectedCallback() {
      const i = Object.fromEntries(
        s.map((c) => [c, m(S, { name: c }, null)])
      ), o = { $el: this, ...this._props, ...i };
      this._vdom = m(t, o, m(S, { name: void 0 }, null)), f(this._vdom, this._root);
    }
    disconnectedCallback() {
      this._vdom = null, f(null, this._root);
    }
    attributeChangedCallback(i, o, c) {
      const { parser: d, prop: y } = h[i];
      this._props[y]._dirty || this.setProp(y, d(c), !1);
    }
  }
  a(u, "observedAttributes", w), a(u, "formAssociated", !!l);
  for (const n of r)
    Object.defineProperty(u.prototype, n.name, {
      get() {
        return this._props[n.name]._value;
      },
      set(b) {
        this.setProp(n.name, b, !0);
      }
    });
  return u;
}, I = (t, e, r) => {
  const s = P(t, r);
  return customElements.define(e, s);
}, M = (...t) => {
  if (typeof window > "u")
    return null;
  const e = new CSSStyleSheet();
  return e.replaceSync(t.join("")), e;
};
export {
  L as boolean,
  M as instantiateStyleSheet,
  z as keyword,
  H as keywordOrNumber,
  P as makeCustomElement,
  A as maybeKeyword,
  C as maybeKeywordOrNumber,
  g as maybeNumber,
  x as number,
  D as numberList,
  K as raw,
  I as register,
  R as string,
  E as stringList
};
//# sourceMappingURL=index.js.map
