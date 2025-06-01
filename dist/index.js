var k = Object.defineProperty;
var C = (e, t, r) => t in e ? k(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var h = (e, t, r) => C(e, typeof t != "symbol" ? t + "" : t, r);
import { cloneElement as S, render as b, h as c, hydrate as E } from "preact";
const y = (e) => c("slot", e), H = (e) => {
  if (e == null)
    return "";
  if (typeof e != "object")
    return e.toString();
  Array.isArray(e) && e.map((n) => n.toString().replaceAll(",", "\\,")).join(",");
  const t = Object.keys(e), r = new FormData();
  return t.forEach((n) => {
    r.append(n, e[n].toString());
  }), r;
}, F = (e, t, r) => {
  e[t] ? e[t].push(r) : e[t] = [r];
}, V = (e, t) => {
  var p;
  const r = (t == null ? void 0 : t.properties) ?? [];
  t == null || t.slots;
  const n = (t == null ? void 0 : t.adoptedStyleSheets) ?? [], A = r.filter((o) => "attribute" in o).map((o) => o.attribute.name), u = (p = r.find((o) => o.formAssociated)) == null ? void 0 : p.name;
  class _ extends HTMLElement {
    constructor() {
      super();
      h(this, "_root");
      h(this, "_vdom");
      h(this, "_internals");
      h(this, "_props");
      h(this, "_attributeChangeHooks");
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = n, this._vdom = null, this._internals = u ? this.attachInternals() : null, this._props = {}, this._attributeChangeHooks = {}, r.forEach((s) => this.registerProperty(s));
    }
    parseAttribute(s) {
      return s.type(this.getAttribute(s.name));
    }
    registerProperty(s) {
      const i = s.name, l = u === i, d = () => this._props[i].value, m = (a, f) => {
        a !== this._props[i].value && (this._props[i]._value = a, f && (this._props[i]._dirty = !0), l && this._internals && this._internals.setFormValue(H(a)), this.rerender());
      };
      Object.defineProperty(this, i, {
        get: d,
        set: (a) => m(a, !0)
      });
      const v = "initialValue" in s ? s.initialValue : this.parseAttribute(s.attribute);
      if (this._props[i] = {
        _value: v,
        _dirty: !1,
        get value() {
          return this._value;
        },
        set value(a) {
          m(a, !0);
        }
      }, "attribute" in s) {
        const a = (f) => {
          var g;
          (g = this._props[i]) != null && g._dirty || m(s.attribute.type(f), !1);
        };
        F(this._attributeChangeHooks, i, a);
      }
    }
    rerender() {
      this._vdom && (this._vdom = S(this._vdom, this._props), b(this._vdom, this._root));
    }
    connectedCallback() {
      const s = Object.fromEntries(
        ((t == null ? void 0 : t.slots) ?? []).map((l) => [
          l,
          c(y, { name: l }, null)
        ])
      ), i = { ...this._props, ...s };
      this._vdom = c(e, i, c(y, { name: void 0 }, null)), (this.hasAttribute("hydrate") ? E : b)(this._vdom, this._root);
    }
    disconnectedCallback() {
      this._vdom = null, b(null, this._root);
    }
    attributeChangedCallback(s, i, l) {
      this._attributeChangeHooks[s] && this._attributeChangeHooks[s].forEach((d) => d(l));
    }
  }
  return h(_, "observedAttributes", A), h(_, "formAssociated", !!u), _;
}, P = (e, t, r) => {
  const n = V(e, r);
  return customElements.define(t, n);
};
export {
  V as makeCustomElement,
  P as register
};
//# sourceMappingURL=index.js.map
