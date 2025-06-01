var S = Object.defineProperty;
var g = (e, t, r) => t in e ? S(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var l = (e, t, r) => g(e, typeof t != "symbol" ? t + "" : t, r);
import { cloneElement as j, render as u, h, hydrate as E } from "preact";
const y = (e) => h("slot", e), k = (e) => {
  if (e == null)
    return "";
  if (typeof e != "object")
    return e.toString();
  Array.isArray(e) && e.map((a) => a.toString().replaceAll(",", "\\,")).join(",");
  const t = Object.keys(e), r = new FormData();
  return t.forEach((a) => {
    r.append(a, e[a].toString());
  }), r;
}, O = (e, t) => {
  var f;
  const r = (t == null ? void 0 : t.properties) ?? [], a = (t == null ? void 0 : t.slots) ?? [], v = (t == null ? void 0 : t.adoptedStyleSheets) ?? [], _ = Object.fromEntries(
    r.filter((i) => "attribute" in i).map((i) => [i.attribute.name, { prop: i.name, parser: i.attribute.type }])
  ), A = Object.keys(_), m = (f = r.find((i) => i.formAssociated)) == null ? void 0 : f.name;
  class c extends HTMLElement {
    constructor() {
      super();
      l(this, "_root");
      l(this, "_vdom");
      l(this, "_internals");
      l(this, "_props");
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = v, this._vdom = null, this._internals = m ? this.attachInternals() : null;
      const s = this;
      this._props = Object.fromEntries(
        r.map((n) => {
          const o = "initialValue" in n ? n.initialValue : this.parseAttribute(n.attribute);
          return [n.name, {
            _dirty: !1,
            _value: o,
            get value() {
              return this._value;
            },
            set value(d) {
              s.setProp(n.name, d, !0);
            }
          }];
        })
      );
    }
    parseAttribute(s) {
      return s.type(this.getAttribute(s.name));
    }
    setProp(s, n, o) {
      this._props[s]._value !== n && (this._props[s]._value = n, o && (this._props[s]._dirty = !0), m === s && this._internals && this._internals.setFormValue(k(n)), this.rerender());
    }
    rerender() {
      this._vdom && (this._vdom = j(this._vdom, this._props), u(this._vdom, this._root));
    }
    connectedCallback() {
      const s = Object.fromEntries(
        a.map((o) => [o, h(y, { name: o }, null)])
      ), n = { ...this._props, ...s };
      this._vdom = h(e, n, h(y, { name: void 0 }, null)), (this.hasAttribute("hydrate") ? E : u)(this._vdom, this._root);
    }
    disconnectedCallback() {
      this._vdom = null, u(null, this._root);
    }
    attributeChangedCallback(s, n, o) {
      const { parser: d, prop: b } = _[s];
      this._props[b]._dirty || this.setProp(b, d(o), !1);
    }
  }
  return l(c, "observedAttributes", A), l(c, "formAssociated", !!m), r.forEach((i) => Object.defineProperty(c.prototype, i.name, {
    get() {
      return this._props[i.name]._value;
    },
    set(p) {
      this.setProp(i.name, p, !0);
    }
  })), c;
}, C = (e, t, r) => {
  const a = O(e, r);
  return customElements.define(t, a);
};
export {
  O as makeCustomElement,
  C as register
};
//# sourceMappingURL=index.js.map
