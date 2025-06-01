var ct = Object.defineProperty;
var vt = (i, t, r) => t in i ? ct(i, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[t] = r;
var y = (i, t, r) => vt(i, typeof t != "symbol" ? t + "" : t, r);
import { options as C, Component as lt, Fragment as dt, isValidElement as pt, h as k, hydrate as yt, render as Z } from "preact";
var q, l, U, z, D = 0, Y = [], _ = C, B = _.__b, G = _.__r, I = _.diffed, J = _.__c, L = _.unmount, K = _.__;
function mt(i, t) {
  _.__h && _.__h(l, i, D || t), D = 0;
  var r = l.__H || (l.__H = { __: [], __h: [] });
  return i >= r.__.length && r.__.push({}), r.__[i];
}
function tt(i, t) {
  var r = mt(q++, 7);
  return $t(r.__H, t) && (r.__ = i(), r.__H = t, r.__h = i), r.__;
}
function bt() {
  for (var i; i = Y.shift(); ) if (i.__P && i.__H) try {
    i.__H.__h.forEach(E), i.__H.__h.forEach(j), i.__H.__h = [];
  } catch (t) {
    i.__H.__h = [], _.__e(t, i.__v);
  }
}
_.__b = function(i) {
  l = null, B && B(i);
}, _.__ = function(i, t) {
  i && t.__k && t.__k.__m && (i.__m = t.__k.__m), K && K(i, t);
}, _.__r = function(i) {
  G && G(i), q = 0;
  var t = (l = i.__c).__H;
  t && (U === l ? (t.__h = [], l.__h = [], t.__.forEach(function(r) {
    r.__N && (r.__ = r.__N), r.u = r.__N = void 0;
  })) : (t.__h.forEach(E), t.__h.forEach(j), t.__h = [], q = 0)), U = l;
}, _.diffed = function(i) {
  I && I(i);
  var t = i.__c;
  t && t.__H && (t.__H.__h.length && (Y.push(t) !== 1 && z === _.requestAnimationFrame || ((z = _.requestAnimationFrame) || gt)(bt)), t.__H.__.forEach(function(r) {
    r.u && (r.__H = r.u), r.u = void 0;
  })), U = l = null;
}, _.__c = function(i, t) {
  t.some(function(r) {
    try {
      r.__h.forEach(E), r.__h = r.__h.filter(function(e) {
        return !e.__ || j(e);
      });
    } catch (e) {
      t.some(function(f) {
        f.__h && (f.__h = []);
      }), t = [], _.__e(e, r.__v);
    }
  }), J && J(i, t);
}, _.unmount = function(i) {
  L && L(i);
  var t, r = i.__c;
  r && r.__H && (r.__H.__.forEach(function(e) {
    try {
      E(e);
    } catch (f) {
      t = f;
    }
  }), r.__H = void 0, t && _.__e(t, r.__v));
};
var Q = typeof requestAnimationFrame == "function";
function gt(i) {
  var t, r = function() {
    clearTimeout(e), Q && cancelAnimationFrame(t), setTimeout(i);
  }, e = setTimeout(r, 35);
  Q && (t = requestAnimationFrame(r));
}
function E(i) {
  var t = l, r = i.__c;
  typeof r == "function" && (i.__c = void 0, r()), l = t;
}
function j(i) {
  var t = l;
  i.__c = i.__(), l = t;
}
function $t(i, t) {
  return !i || i.length !== t.length || t.some(function(r, e) {
    return r !== i[e];
  });
}
var St = Symbol.for("preact-signals");
function N() {
  if (b > 1)
    b--;
  else {
    for (var i, t = !1; w !== void 0; ) {
      var r = w;
      for (w = void 0, T++; r !== void 0; ) {
        var e = r.o;
        if (r.o = void 0, r.f &= -3, !(8 & r.f) && et(r)) try {
          r.c();
        } catch (f) {
          t || (i = f, t = !0);
        }
        r = e;
      }
    }
    if (T = 0, b--, t) throw i;
  }
}
function wt(i) {
  if (b > 0) return i();
  b++;
  try {
    return i();
  } finally {
    N();
  }
}
var o = void 0;
function it(i) {
  var t = o;
  o = void 0;
  try {
    return i();
  } finally {
    o = t;
  }
}
var w = void 0, b = 0, T = 0, x = 0;
function rt(i) {
  if (o !== void 0) {
    var t = i.n;
    if (t === void 0 || t.t !== o)
      return t = { i: 0, S: i, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t }, o.s !== void 0 && (o.s.n = t), o.s = t, i.n = t, 32 & o.f && i.S(t), t;
    if (t.i === -1)
      return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = o.s, t.n = void 0, o.s.n = t, o.s = t), t;
  }
}
function h(i, t) {
  this.v = i, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched;
}
h.prototype.brand = St;
h.prototype.h = function() {
  return !0;
};
h.prototype.S = function(i) {
  var t = this, r = this.t;
  r !== i && i.e === void 0 && (i.x = r, this.t = i, r !== void 0 ? r.e = i : it(function() {
    var e;
    (e = t.W) == null || e.call(t);
  }));
};
h.prototype.U = function(i) {
  var t = this;
  if (this.t !== void 0) {
    var r = i.e, e = i.x;
    r !== void 0 && (r.x = e, i.e = void 0), e !== void 0 && (e.e = r, i.x = void 0), i === this.t && (this.t = e, e === void 0 && it(function() {
      var f;
      (f = t.Z) == null || f.call(t);
    }));
  }
};
h.prototype.subscribe = function(i) {
  var t = this;
  return H(function() {
    var r = t.value, e = o;
    o = void 0;
    try {
      i(r);
    } finally {
      o = e;
    }
  });
};
h.prototype.valueOf = function() {
  return this.value;
};
h.prototype.toString = function() {
  return this.value + "";
};
h.prototype.toJSON = function() {
  return this.value;
};
h.prototype.peek = function() {
  var i = o;
  o = void 0;
  try {
    return this.value;
  } finally {
    o = i;
  }
};
Object.defineProperty(h.prototype, "value", { get: function() {
  var i = rt(this);
  return i !== void 0 && (i.i = this.i), this.v;
}, set: function(i) {
  if (i !== this.v) {
    if (T > 100) throw new Error("Cycle detected");
    this.v = i, this.i++, x++, b++;
    try {
      for (var t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      N();
    }
  }
} });
function V(i, t) {
  return new h(i, t);
}
function et(i) {
  for (var t = i.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function nt(i) {
  for (var t = i.s; t !== void 0; t = t.n) {
    var r = t.S.n;
    if (r !== void 0 && (t.r = r), t.S.n = t, t.i = -1, t.n === void 0) {
      i.s = t;
      break;
    }
  }
}
function ot(i) {
  for (var t = i.s, r = void 0; t !== void 0; ) {
    var e = t.p;
    t.i === -1 ? (t.S.U(t), e !== void 0 && (e.n = t.n), t.n !== void 0 && (t.n.p = e)) : r = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = e;
  }
  i.s = r;
}
function $(i, t) {
  h.call(this, void 0), this.x = i, this.s = void 0, this.g = x - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched;
}
$.prototype = new h();
$.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === x)) return !0;
  if (this.g = x, this.f |= 1, this.i > 0 && !et(this))
    return this.f &= -2, !0;
  var i = o;
  try {
    nt(this), o = this;
    var t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (r) {
    this.v = r, this.f |= 16, this.i++;
  }
  return o = i, ot(this), this.f &= -2, !0;
};
$.prototype.S = function(i) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  h.prototype.S.call(this, i);
};
$.prototype.U = function(i) {
  if (this.t !== void 0 && (h.prototype.U.call(this, i), this.t === void 0)) {
    this.f &= -33;
    for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
};
$.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var i = this.t; i !== void 0; i = i.x) i.t.N();
  }
};
Object.defineProperty($.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var i = rt(this);
  if (this.h(), i !== void 0 && (i.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function R(i, t) {
  return new $(i, t);
}
function ft(i) {
  var t = i.u;
  if (i.u = void 0, typeof t == "function") {
    b++;
    var r = o;
    o = void 0;
    try {
      t();
    } catch (e) {
      throw i.f &= -2, i.f |= 8, M(i), e;
    } finally {
      o = r, N();
    }
  }
}
function M(i) {
  for (var t = i.s; t !== void 0; t = t.n) t.S.U(t);
  i.x = void 0, i.s = void 0, ft(i);
}
function At(i) {
  if (o !== this) throw new Error("Out-of-order effect");
  ot(this), o = i, this.f &= -2, 8 & this.f && M(this), N();
}
function A(i) {
  this.x = i, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32;
}
A.prototype.c = function() {
  var i = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    var t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    i();
  }
};
A.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ft(this), nt(this), b++;
  var i = o;
  return o = this, At.bind(this, i);
};
A.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = w, w = this);
};
A.prototype.d = function() {
  this.f |= 8, 1 & this.f || M(this);
};
function H(i) {
  var t = new A(i);
  try {
    t.c();
  } catch (r) {
    throw t.d(), r;
  }
  return t.d.bind(t);
}
var st, O, ut = [];
H(function() {
  st = this.N;
})();
function S(i, t) {
  C[i] = t.bind(null, C[i] || function() {
  });
}
function F(i) {
  O && O(), O = i && i.S();
}
function _t(i) {
  var t = this, r = i.data, e = kt(r);
  e.value = r;
  var f = tt(function() {
    for (var a = t, c = t.__v; c = c.__; ) if (c.__c) {
      c.__c.__$f |= 4;
      break;
    }
    var d = R(function() {
      var p = e.value.value;
      return p === 0 ? 0 : p === !0 ? "" : p || "";
    }), u = R(function() {
      return !Array.isArray(d.value) && !pt(d.value);
    }), v = H(function() {
      if (this.N = at, u.value) {
        var p = d.value;
        a.__v && a.__v.__e && a.__v.__e.nodeType === 3 && (a.__v.__e.data = p);
      }
    }), m = t.__$u.d;
    return t.__$u.d = function() {
      v(), m.call(this);
    }, [u, d];
  }, []), n = f[0], s = f[1];
  return n.value ? s.peek() : s.value;
}
_t.displayName = "_st";
Object.defineProperties(h.prototype, { constructor: { configurable: !0, value: void 0 }, type: { configurable: !0, value: _t }, props: { configurable: !0, get: function() {
  return { data: this };
} }, __b: { configurable: !0, value: 1 } });
S("__b", function(i, t) {
  if (typeof t.type == "string") {
    var r, e = t.props;
    for (var f in e) if (f !== "children") {
      var n = e[f];
      n instanceof h && (r || (t.__np = r = {}), r[f] = n, e[f] = n.peek());
    }
  }
  i(t);
});
S("__r", function(i, t) {
  if (t.type !== dt) {
    F();
    var r, e = t.__c;
    e && (e.__$f &= -2, (r = e.__$u) === void 0 && (e.__$u = r = function(f) {
      var n;
      return H(function() {
        n = this;
      }), n.c = function() {
        e.__$f |= 1, e.setState({});
      }, n;
    }())), F(r);
  }
  i(t);
});
S("__e", function(i, t, r, e) {
  F(), i(t, r, e);
});
S("diffed", function(i, t) {
  F();
  var r;
  if (typeof t.type == "string" && (r = t.__e)) {
    var e = t.__np, f = t.props;
    if (e) {
      var n = r.U;
      if (n) for (var s in n) {
        var a = n[s];
        a !== void 0 && !(s in e) && (a.d(), n[s] = void 0);
      }
      else
        n = {}, r.U = n;
      for (var c in e) {
        var d = n[c], u = e[c];
        d === void 0 ? (d = Ht(r, c, u, f), n[c] = d) : d.o(u, f);
      }
    }
  }
  i(t);
});
function Ht(i, t, r, e) {
  var f = t in i && i.ownerSVGElement === void 0, n = V(r);
  return { o: function(s, a) {
    n.value = s, e = a;
  }, d: H(function() {
    this.N = at;
    var s = n.value.value;
    e[t] !== s && (e[t] = s, f ? i[t] = s : s ? i.setAttribute(t, s) : i.removeAttribute(t));
  }) };
}
S("unmount", function(i, t) {
  if (typeof t.type == "string") {
    var r = t.__e;
    if (r) {
      var e = r.U;
      if (e) {
        r.U = void 0;
        for (var f in e) {
          var n = e[f];
          n && n.d();
        }
      }
    }
  } else {
    var s = t.__c;
    if (s) {
      var a = s.__$u;
      a && (s.__$u = void 0, a.d());
    }
  }
  i(t);
});
S("__h", function(i, t, r, e) {
  (e < 3 || e === 9) && (t.__$f |= 2), i(t, r, e);
});
lt.prototype.shouldComponentUpdate = function(i, t) {
  var r = this.__$u, e = r && r.s !== void 0;
  for (var f in t) return !0;
  if (this.__f || typeof this.u == "boolean" && this.u === !0) {
    var n = 2 & this.__$f;
    if (!(e || n || 4 & this.__$f) || 1 & this.__$f) return !0;
  } else if (!(e || 4 & this.__$f) || 3 & this.__$f) return !0;
  for (var s in i) if (s !== "__source" && i[s] !== this.props[s]) return !0;
  for (var a in this.props) if (!(a in i)) return !0;
  return !1;
};
function kt(i, t) {
  return tt(function() {
    return V(i, t);
  }, []);
}
var Et = function(i) {
  queueMicrotask(function() {
    queueMicrotask(i);
  });
};
function Ct() {
  wt(function() {
    for (var i; i = ut.shift(); ) st.call(i);
  });
}
function at() {
  ut.push(this) === 1 && (C.requestAnimationFrame || Et)(Ct);
}
const X = (i) => k("slot", i), xt = (i) => {
  if (i == null)
    return "";
  if (typeof i != "object")
    return i.toString();
  Array.isArray(i) && i.map((e) => e.toString().replaceAll(",", "\\,")).join(",");
  const t = Object.keys(i), r = new FormData();
  return t.forEach((e) => {
    r.append(e, i[e].toString());
  }), r;
}, Ft = (i, t, r) => {
  i[t] ? i[t].push(r) : i[t] = [r];
}, Nt = (i, t) => {
  var a;
  const r = (t == null ? void 0 : t.properties) ?? [];
  t == null || t.slots;
  const e = (t == null ? void 0 : t.adoptedStyleSheets) ?? [], f = r.filter((c) => "attribute" in c).map((c) => c.attribute.name), n = (a = r.find((c) => c.formAssociated)) == null ? void 0 : a.name;
  class s extends HTMLElement {
    constructor() {
      super();
      y(this, "_root");
      y(this, "_vdom");
      y(this, "_internals");
      y(this, "_props");
      y(this, "_dirtyProps");
      y(this, "_attributeChangeHooks");
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = e, this._vdom = null, this._internals = n ? this.attachInternals() : null, this._props = {}, this._dirtyProps = {}, this._attributeChangeHooks = {}, r.forEach((u) => this.registerProperty(u));
    }
    parseAttribute(u) {
      return u.type(this.getAttribute(u.name));
    }
    registerProperty(u) {
      const v = u.name, m = n === v, p = () => this._props[v].value, W = (g, P) => {
        g !== this._props[v].value && (this._props[v].value = g, P && (this._dirtyProps[v] = !0), m && this._internals && this._internals.setFormValue(xt(g)));
      };
      Object.defineProperty(this, v, {
        get: p,
        set: (g) => W(g, !0)
      });
      const ht = "initialValue" in u ? u.initialValue : this.parseAttribute(u.attribute);
      if (this._props[v] = V(ht), "attribute" in u) {
        const g = (P) => {
          this._dirtyProps[v] || W(u.attribute.type(P), !1);
        };
        Ft(this._attributeChangeHooks, v, g);
      }
    }
    connectedCallback() {
      const u = Object.fromEntries(
        ((t == null ? void 0 : t.slots) ?? []).map((m) => [
          m,
          k(X, { name: m }, null)
        ])
      ), v = { ...this._props, ...u };
      this._vdom = k(i, v, k(X, { name: void 0 }, null)), (this.hasAttribute("hydrate") ? yt : Z)(this._vdom, this._root);
    }
    disconnectedCallback() {
      this._vdom = null, Z(null, this._root);
    }
    attributeChangedCallback(u, v, m) {
      this._attributeChangeHooks[u] && this._attributeChangeHooks[u].forEach((p) => p(m));
    }
  }
  return y(s, "observedAttributes", f), y(s, "formAssociated", !!n), s;
}, Ot = (i, t, r) => {
  const e = Nt(i, r);
  return customElements.define(t, e);
};
export {
  Nt as makeCustomElement,
  Ot as register
};
//# sourceMappingURL=index.js.map
