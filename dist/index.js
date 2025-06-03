var S = Object.defineProperty;
var g = (e, t, r) => t in e ? S(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var l = (e, t, r) => g(e, typeof t != "symbol" ? t + "" : t, r);
import { cloneElement as j, render as u, h as c, hydrate as E } from "preact";
const y = (e) => c("slot", e), k = (e) => {
  if (e == null)
    return "";
  if (typeof e != "object")
    return e.toString();
  Array.isArray(e) && e.map((n) => n.toString().replaceAll(",", "\\,")).join(",");
  const t = Object.keys(e), r = new FormData();
  return t.forEach((n) => {
    r.append(n, e[n].toString());
  }), r;
}, O = (e, t) => {
  var f;
  const r = (t == null ? void 0 : t.properties) ?? [], n = (t == null ? void 0 : t.slots) ?? [], A = (t == null ? void 0 : t.adoptedStyleSheets) ?? [], _ = Object.fromEntries(
    r.filter((i) => "attribute" in i).map((i) => [i.attribute.name, { prop: i.name, parser: i.attribute.type }])
  ), v = Object.keys(_), m = (f = r.find((i) => i.formAssociated)) == null ? void 0 : f.name;
  class h extends HTMLElement {
    constructor() {
      super();
      l(this, "_root");
      l(this, "_vdom", null);
      l(this, "_internals");
      l(this, "_props");
      l(this, "_frameRequested", !1);
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = A, this._vdom = null, this._internals = m ? this.attachInternals() : null;
      const s = this;
      this._props = Object.fromEntries(
        r.map((a) => {
          const o = "initialValue" in a ? a.initialValue : this.parseAttribute(a.attribute);
          return [a.name, {
            _dirty: !1,
            _value: o,
            get value() {
              return this._value;
            },
            set value(d) {
              s.setProp(a.name, d, !0);
            }
          }];
        })
      );
    }
    parseAttribute(s) {
      return s.type(this.getAttribute(s.name));
    }
    setProp(s, a, o) {
      this._props[s]._value !== a && (this._props[s]._value = a, o && (this._props[s]._dirty = !0), m === s && this._internals && this._internals.setFormValue(k(a)), this.rerender());
    }
    rerender() {
      this._frameRequested || requestAnimationFrame(() => {
        this._vdom && (this._frameRequested = !1, this._vdom = j(this._vdom, this._props), u(this._vdom, this._root));
      });
    }
    connectedCallback() {
      const s = Object.fromEntries(
        n.map((o) => [o, c(y, { name: o }, null)])
      ), a = { $el: this, ...this._props, ...s };
      this._vdom = c(e, a, c(y, { name: void 0 }, null)), (this.hasAttribute("hydrate") ? E : u)(this._vdom, this._root);
    }
    disconnectedCallback() {
      this._vdom = null, u(null, this._root);
    }
    attributeChangedCallback(s, a, o) {
      const { parser: d, prop: b } = _[s];
      this._props[b]._dirty || this.setProp(b, d(o), !1);
    }
  }
  return l(h, "observedAttributes", v), l(h, "formAssociated", !!m), r.forEach((i) => Object.defineProperty(h.prototype, i.name, {
    get() {
      return this._props[i.name]._value;
    },
    set(p) {
      this.setProp(i.name, p, !0);
    }
  })), h;
}, V = (e, t, r) => {
  const n = O(e, r);
  return customElements.define(t, n);
};
export {
  O as makeCustomElement,
  V as register
};
//# sourceMappingURL=index.js.map
