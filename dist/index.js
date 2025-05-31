var m = Object.defineProperty;
var A = (i, t, e) => t in i ? m(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var h = (i, t, e) => A(i, typeof t != "symbol" ? t + "" : t, e);
import { cloneElement as P, render as d, h as n, hydrate as v } from "preact";
const f = (i) => i.replace(/-(\w)/g, (t, e) => e ? e.toUpperCase() : ""), b = (i) => n("slot", i), y = (i, t) => {
  class e extends HTMLElement {
    constructor() {
      super();
      h(this, "_root");
      h(this, "_vdom");
      h(this, "_initialProps");
      h(this, "_internals");
      this._root = this.attachShadow({ mode: "open" }), this._vdom = null, this._internals = t.formAssociated ? this.attachInternals() : null, this._initialProps = {}, t.adoptedStyleSheets && (this._root.adoptedStyleSheets = t.adoptedStyleSheets);
    }
    // Reflect prop/attr change to Preact props
    // -- Maybe VALUE cannot be typed in TypeScript.
    updateProp(s, o) {
      if (!this._vdom) {
        this._initialProps[s] = o, this._initialProps[f(s)] = o;
        return;
      }
      const a = { [s]: o, [f(s)]: o };
      this._vdom = P(this._vdom, a), d(this._vdom, this._root);
    }
    // Reflect raw attr value to Preact props if appropreate
    parseAttribute(s, o, a) {
      var r, u;
      if (!(a && ((r = this._initialProps) != null && r.hasOwnProperty(s))) && (u = t.attributes) != null && u[s]) {
        const c = t.attributes[s], _ = "parse" in c ? c.parse : c;
        _ && this.updateProp(s, _(o ?? void 0));
      }
    }
    connectedCallback() {
      const { attributes: s, childNodes: o } = this;
      for (let r = 0; r < s.length; r++)
        this.parseAttribute(s[r].name, s[r].value, !0);
      const a = this._initialProps ?? {};
      (t.slots ?? []).forEach((r) => {
        a[r] = n(b, { name: r }, null);
      }), this._vdom = n(i, a, n(b, { name: void 0 }, null)), (this.hasAttribute("hydrate") ? v : d)(this._vdom, this._root);
    }
    disconnectedCallback() {
      this._vdom = null, d(null, this._root);
    }
    attributeChangedCallback(s, o, a) {
      this.parseAttribute(s, a);
    }
  }
  return h(e, "observedAttributes", Object.keys(t.attributes ?? {})), h(e, "formAssociated", !!t.formAssociated), (t.properties ?? []).forEach((l) => {
    var a;
    const p = l === t.formAssociated, s = (a = t.attributes) == null ? void 0 : a[l], o = s && "reflect" in s && s.reflect;
    Object.defineProperty(e.prototype, l, {
      get() {
        return this._vdom.props[l];
      },
      set(r) {
        this.updateProp(l, r), o && this.setAttribute(l, o(r)), p && this._internals && this._internals.setFormValue(r);
      }
    });
  }), e;
}, g = (i, t, e) => {
  const l = y(i, e);
  return customElements.define(t, l);
};
export {
  y as makeCustomElement,
  g as register
};
//# sourceMappingURL=index.js.map
