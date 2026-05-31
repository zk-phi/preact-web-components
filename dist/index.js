var yt = Object.defineProperty;
var mt = (i, t, r) => t in i ? yt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : i[t] = r;
var b = (i, t, r) => mt(i, typeof t != "symbol" ? t + "" : t, r);
import { options as j, Component as bt, Fragment as St, isValidElement as wt, h as H, render as z } from "preact";
const Rt = (i) => i && i !== "false" && i !== "0" || i === "", Dt = (i) => i == null ? "" : i.toString(), nt = (i) => typeof i == "number" ? i : i == null || i === "" ? void 0 : typeof i == "string" ? Number(i) : Number.NaN, Mt = (i) => (t) => nt(t) ?? i, $t = (i) => i == null || i === "" ? [] : typeof i == "string" ? (
  // non-empty string
  i.split(",")
) : (
  // boolean or number
  [i.toString()]
), Wt = (i) => $t(i).map((r) => r === "" ? Number.NaN : Number(r)), Zt = (i) => i, ot = (i) => (t) => {
  const r = (t == null ? void 0 : t.toString()) ?? "";
  return i.find((e) => e === r) ?? void 0;
}, zt = (i, t) => {
  const r = ot(t);
  return (e) => r(e) ?? i;
}, gt = (i) => {
  const t = ot(i);
  return (r) => t(r) ?? nt(r);
}, Gt = (i, t = []) => {
  const r = gt([i, ...t]);
  return (e) => r(e) ?? i;
};
var V, d, T, G, I = 0, st = [], a = j, K = a.__b, B = a.__r, J = a.diffed, Q = a.__c, X = a.unmount, Y = a.__;
function At(i, t) {
  a.__h && a.__h(d, i, I || t), I = 0;
  var r = d.__H || (d.__H = { __: [], __h: [] });
  return i >= r.__.length && r.__.push({}), r.__[i];
}
function ft(i, t) {
  var r = At(V++, 7);
  return kt(r.__H, t) && (r.__ = i(), r.__H = t, r.__h = i), r.__;
}
function Nt() {
  for (var i; i = st.shift(); ) if (i.__P && i.__H) try {
    i.__H.__h.forEach(O), i.__H.__h.forEach(L), i.__H.__h = [];
  } catch (t) {
    i.__H.__h = [], a.__e(t, i.__v);
  }
}
a.__b = function(i) {
  d = null, K && K(i);
}, a.__ = function(i, t) {
  i && t.__k && t.__k.__m && (i.__m = t.__k.__m), Y && Y(i, t);
}, a.__r = function(i) {
  B && B(i), V = 0;
  var t = (d = i.__c).__H;
  t && (T === d ? (t.__h = [], d.__h = [], t.__.forEach(function(r) {
    r.__N && (r.__ = r.__N), r.u = r.__N = void 0;
  })) : (t.__h.forEach(O), t.__h.forEach(L), t.__h = [], V = 0)), T = d;
}, a.diffed = function(i) {
  J && J(i);
  var t = i.__c;
  t && t.__H && (t.__H.__h.length && (st.push(t) !== 1 && G === a.requestAnimationFrame || ((G = a.requestAnimationFrame) || Et)(Nt)), t.__H.__.forEach(function(r) {
    r.u && (r.__H = r.u), r.u = void 0;
  })), T = d = null;
}, a.__c = function(i, t) {
  t.some(function(r) {
    try {
      r.__h.forEach(O), r.__h = r.__h.filter(function(e) {
        return !e.__ || L(e);
      });
    } catch (e) {
      t.some(function(n) {
        n.__h && (n.__h = []);
      }), t = [], a.__e(e, r.__v);
    }
  }), Q && Q(i, t);
}, a.unmount = function(i) {
  X && X(i);
  var t, r = i.__c;
  r && r.__H && (r.__H.__.forEach(function(e) {
    try {
      O(e);
    } catch (n) {
      t = n;
    }
  }), r.__H = void 0, t && a.__e(t, r.__v));
};
var tt = typeof requestAnimationFrame == "function";
function Et(i) {
  var t, r = function() {
    clearTimeout(e), tt && cancelAnimationFrame(t), setTimeout(i);
  }, e = setTimeout(r, 35);
  tt && (t = requestAnimationFrame(r));
}
function O(i) {
  var t = d, r = i.__c;
  typeof r == "function" && (i.__c = void 0, r()), d = t;
}
function L(i) {
  var t = d;
  i.__c = i.__(), d = t;
}
function kt(i, t) {
  return !i || i.length !== t.length || t.some(function(r, e) {
    return r !== i[e];
  });
}
var xt = Symbol.for("preact-signals");
function P() {
  if (m > 1)
    m--;
  else {
    var i, t = !1;
    for (function() {
      var n = C;
      for (C = void 0; n !== void 0; )
        n.S.v === n.v && (n.S.i = n.i), n = n.o;
    }(); A !== void 0; ) {
      var r = A;
      for (A = void 0, F++; r !== void 0; ) {
        var e = r.u;
        if (r.u = void 0, r.f &= -3, !(8 & r.f) && _t(r)) try {
          r.c();
        } catch (n) {
          t || (i = n, t = !0);
        }
        r = e;
      }
    }
    if (F = 0, m--, t) throw i;
  }
}
function Ht(i) {
  if (m > 0) return i();
  R = ++Ot, m++;
  try {
    return i();
  } finally {
    P();
  }
}
var s = void 0;
function D(i) {
  var t = s;
  s = void 0;
  try {
    return i();
  } finally {
    s = t;
  }
}
var A = void 0, m = 0, F = 0, Ot = 0, R = 0, C = void 0, U = 0;
function ut(i) {
  if (s !== void 0) {
    var t = i.n;
    if (t === void 0 || t.t !== s)
      return t = { i: 0, S: i, p: s.s, n: void 0, t: s, e: void 0, x: void 0, r: t }, s.s !== void 0 && (s.s.n = t), s.s = t, i.n = t, 32 & s.f && i.S(t), t;
    if (t.i === -1)
      return t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = s.s, t.n = void 0, s.s.n = t, s.s = t), t;
  }
}
function h(i, t) {
  this.v = i, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
h.prototype.brand = xt;
h.prototype.h = function() {
  return !0;
};
h.prototype.S = function(i) {
  var t = this, r = this.t;
  r !== i && i.e === void 0 && (i.x = r, this.t = i, r !== void 0 ? r.e = i : D(function() {
    var e;
    (e = t.W) == null || e.call(t);
  }));
};
h.prototype.U = function(i) {
  var t = this;
  if (this.t !== void 0) {
    var r = i.e, e = i.x;
    r !== void 0 && (r.x = e, i.e = void 0), e !== void 0 && (e.e = r, i.x = void 0), i === this.t && (this.t = e, e === void 0 && D(function() {
      var n;
      (n = t.Z) == null || n.call(t);
    }));
  }
};
h.prototype.subscribe = function(i) {
  var t = this;
  return N(function() {
    var r = t.value, e = s;
    s = void 0;
    try {
      i(r);
    } finally {
      s = e;
    }
  }, { name: "sub" });
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
  var i = this;
  return D(function() {
    return i.value;
  });
};
Object.defineProperty(h.prototype, "value", { get: function() {
  var i = ut(this);
  return i !== void 0 && (i.i = this.i), this.v;
}, set: function(i) {
  if (i !== this.v) {
    if (F > 100) throw new Error("Cycle detected");
    (function(r) {
      m !== 0 && F === 0 && r.l !== R && (r.l = R, C = { S: r, v: r.v, i: r.i, o: C });
    })(this), this.v = i, this.i++, U++, m++;
    try {
      for (var t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      P();
    }
  }
} });
function M(i, t) {
  return new h(i, t);
}
function _t(i) {
  for (var t = i.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function at(i) {
  for (var t = i.s; t !== void 0; t = t.n) {
    var r = t.S.n;
    if (r !== void 0 && (t.r = r), t.S.n = t, t.i = -1, t.n === void 0) {
      i.s = t;
      break;
    }
  }
}
function ct(i) {
  for (var t = i.s, r = void 0; t !== void 0; ) {
    var e = t.p;
    t.i === -1 ? (t.S.U(t), e !== void 0 && (e.n = t.n), t.n !== void 0 && (t.n.p = e)) : r = t, t.S.n = t.r, t.r !== void 0 && (t.r = void 0), t = e;
  }
  i.s = r;
}
function S(i, t) {
  h.call(this, void 0), this.x = i, this.s = void 0, this.g = U - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
S.prototype = new h();
S.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === U)) return !0;
  if (this.g = U, this.f |= 1, this.i > 0 && !_t(this))
    return this.f &= -2, !0;
  var i = s;
  try {
    at(this), s = this;
    var t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (r) {
    this.v = r, this.f |= 16, this.i++;
  }
  return s = i, ct(this), this.f &= -2, !0;
};
S.prototype.S = function(i) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  h.prototype.S.call(this, i);
};
S.prototype.U = function(i) {
  if (this.t !== void 0 && (h.prototype.U.call(this, i), this.t === void 0)) {
    this.f &= -33;
    for (var t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
};
S.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var i = this.t; i !== void 0; i = i.x) i.t.N();
  }
};
Object.defineProperty(S.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var i = ut(this);
  if (this.h(), i !== void 0 && (i.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function it(i, t) {
  return new S(i, t);
}
function ht(i) {
  var t = i.m;
  if (i.m = void 0, typeof t == "function") {
    m++;
    var r = s;
    s = void 0;
    try {
      t();
    } catch (e) {
      throw i.f &= -2, i.f |= 8, W(i), e;
    } finally {
      s = r, P();
    }
  }
}
function W(i) {
  for (var t = i.s; t !== void 0; t = t.n) t.S.U(t);
  i.x = void 0, i.s = void 0, ht(i);
}
function jt(i) {
  if (s !== this) throw new Error("Out-of-order effect");
  ct(this), s = i, this.f &= -2, 8 & this.f && W(this), P();
}
function w(i, t) {
  this.x = i, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
w.prototype.c = function() {
  var i = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    var t = this.x();
    typeof t == "function" && (this.m = t);
  } finally {
    i();
  }
};
w.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, ht(this), at(this), m++;
  var i = s;
  return s = this, jt.bind(this, i);
};
w.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = A, A = this);
};
w.prototype.d = function() {
  this.f |= 8, 1 & this.f || W(this);
};
w.prototype.dispose = function() {
  this.d();
};
function N(i, t) {
  var r = new w(i, t);
  try {
    r.c();
  } catch (n) {
    throw r.d(), n;
  }
  var e = r.d.bind(r);
  return e[Symbol.dispose] = e, e;
}
var vt, x, Ft = typeof window < "u" && !!window.__PREACT_SIGNALS_DEVTOOLS__, lt = [];
N(function() {
  vt = this.N;
})();
function $(i, t) {
  j[i] = t.bind(null, j[i] || function() {
  });
}
function q(i) {
  if (x) {
    var t = x;
    x = void 0, t();
  }
  x = i && i.S();
}
function dt(i) {
  var t = this, r = i.data, e = Ut(r);
  e.value = r;
  var n = ft(function() {
    for (var u = t, c = t.__v; c = c.__; ) if (c.__c) {
      c.__c.__$f |= 4;
      break;
    }
    var v = it(function() {
      var _ = e.value.value;
      return _ === 0 ? 0 : _ === !0 ? "" : _ || "";
    }), p = it(function() {
      return !Array.isArray(v.value) && !wt(v.value);
    }), l = N(function() {
      if (this.N = pt, p.value) {
        var _ = v.value;
        u.__v && u.__v.__e && u.__v.__e.nodeType === 3 && (u.__v.__e.data = _);
      }
    }), E = t.__$u.d;
    return t.__$u.d = function() {
      l(), E.call(this);
    }, [p, v];
  }, []), o = n[0], f = n[1];
  return o.value ? f.peek() : f.value;
}
dt.displayName = "ReactiveTextNode";
Object.defineProperties(h.prototype, { constructor: { configurable: !0, value: void 0 }, type: { configurable: !0, value: dt }, props: { configurable: !0, get: function() {
  var i = this;
  return { data: { get value() {
    return i.value;
  } } };
} }, __b: { configurable: !0, value: 1 } });
$("__b", function(i, t) {
  if (typeof t.type == "string") {
    var r, e = t.props;
    for (var n in e) if (n !== "children") {
      var o = e[n];
      o instanceof h && (r || (t.__np = r = {}), r[n] = o, e[n] = o.peek());
    }
  }
  i(t);
});
$("__r", function(i, t) {
  if (i(t), t.type !== St) {
    q();
    var r, e = t.__c;
    e && (e.__$f &= -2, (r = e.__$u) === void 0 && (e.__$u = r = function(n, o) {
      var f;
      return N(function() {
        f = this;
      }, { name: o }), f.c = n, f;
    }(function() {
      var n;
      Ft && ((n = r.y) == null || n.call(r)), e.__$f |= 1, e.setState({});
    }, typeof t.type == "function" ? t.type.displayName || t.type.name : ""))), q(r);
  }
});
$("__e", function(i, t, r, e) {
  q(), i(t, r, e);
});
$("diffed", function(i, t) {
  q();
  var r;
  if (typeof t.type == "string" && (r = t.__e)) {
    var e = t.__np, n = t.props;
    if (e) {
      var o = r.U;
      if (o) for (var f in o) {
        var u = o[f];
        u !== void 0 && !(f in e) && (u.d(), o[f] = void 0);
      }
      else
        o = {}, r.U = o;
      for (var c in e) {
        var v = o[c], p = e[c];
        v === void 0 ? (v = Ct(r, c, p), o[c] = v) : v.o(p, n);
      }
    }
  }
  i(t);
});
function Ct(i, t, r, e) {
  var n = t in i && i.ownerSVGElement === void 0, o = M(r), f = r.peek();
  return { o: function(u, c) {
    o.value = u, f = u.peek();
  }, d: N(function() {
    this.N = pt;
    var u = o.value.value;
    f !== u ? (f = void 0, n ? i[t] = u : u != null && (u !== !1 || t[4] === "-") ? i.setAttribute(t, u) : i.removeAttribute(t)) : f = void 0;
  }) };
}
$("unmount", function(i, t) {
  if (typeof t.type == "string") {
    var r = t.__e;
    if (r) {
      var e = r.U;
      if (e) {
        r.U = void 0;
        for (var n in e) {
          var o = e[n];
          o && o.d();
        }
      }
    }
    var f = t.__np;
    if (f) {
      var u = t.props;
      for (var c in f) u[c] = f[c];
    }
    t.__np = void 0;
  } else {
    var v = t.__c;
    if (v) {
      var p = v.__$u;
      p && (v.__$u = void 0, p.d());
    }
  }
  i(t);
});
$("__h", function(i, t, r, e) {
  (e < 3 || e === 9) && (t.__$f |= 2), i(t, r, e);
});
bt.prototype.shouldComponentUpdate = function(i, t) {
  if (this.__R) return !0;
  var r = this.__$u, e = r && r.s !== void 0;
  for (var n in t) return !0;
  if (this.__f || typeof this.u == "boolean" && this.u === !0) {
    var o = 2 & this.__$f;
    if (!(e || o || 4 & this.__$f) || 1 & this.__$f) return !0;
  } else if (!(e || 4 & this.__$f) || 3 & this.__$f) return !0;
  for (var f in i) if (f !== "__source" && i[f] !== this.props[f]) return !0;
  for (var u in this.props) if (!(u in i)) return !0;
  return !1;
};
function Ut(i, t) {
  return ft(function() {
    return M(i, t);
  }, []);
}
var qt = function(i) {
  queueMicrotask(function() {
    queueMicrotask(i);
  });
};
function Pt() {
  Ht(function() {
    for (var i; i = lt.shift(); ) vt.call(i);
  });
}
function pt() {
  lt.push(this) === 1 && (j.requestAnimationFrame || qt)(Pt);
}
const rt = (i) => H("slot", i), et = (i) => {
  if (i == null)
    return "";
  if (typeof i == "boolean")
    return i ? "1" : "0";
  if (typeof i != "object")
    return i.toString();
  if (Array.isArray(i))
    return i.map((e) => e.toString().replaceAll(",", "\\,")).join(",");
  const t = Object.keys(i), r = new FormData();
  for (const e of t)
    r.append(e, i[e].toString());
  return r;
}, Tt = (i, t = {}) => {
  var v, p;
  const r = t.properties ?? [], e = t.slots ?? [], n = ((v = t.adoptedStyleSheets) == null ? void 0 : v.filter((l) => !!l)) ?? [], o = Object.fromEntries(
    r.filter((l) => "attribute" in l).map((l) => [l.attribute.name, { prop: l.name, parser: l.attribute.type }])
  ), f = Object.keys(o), u = (p = r.find((l) => l.formAssociated)) == null ? void 0 : p.name;
  class c extends HTMLElement {
    constructor() {
      super();
      b(this, "_root");
      b(this, "_internals");
      b(this, "_props");
      b(this, "_dirtyAttrs");
      b(this, "_frameRequested", !1);
      this._root = this.attachShadow({ mode: "open" }), this._root.adoptedStyleSheets = n, this._internals = u ? this.attachInternals() : null, this._dirtyAttrs = {}, this._props = Object.fromEntries(
        r.map((_) => {
          const y = "initialValue" in _ ? _.initialValue : this.parseAttribute(_.attribute);
          return u === _.name && this._internals && this._internals.setFormValue(et(y)), [_.name, M(y)];
        })
      );
    }
    parseAttribute(_) {
      return _.type(this.getAttribute(_.name));
    }
    setProp(_, y, g) {
      this._props[_].value !== y && (this._props[_].value = y, g && (this._dirtyAttrs[_] = !0), u === _ && this._internals && this._internals.setFormValue(et(y)));
    }
    connectedCallback() {
      const _ = Object.fromEntries(
        e.map((k) => [k, H(rt, { name: k }, null)])
      ), y = { $el: this, ...this._props, ..._ }, g = H(i, y, H(rt, { name: void 0 }, null));
      z(g, this._root);
    }
    disconnectedCallback() {
      z(null, this._root);
    }
    attributeChangedCallback(_, y, g) {
      const { parser: k, prop: Z } = o[_];
      this._dirtyAttrs[Z] || this.setProp(Z, k(g), !1);
    }
  }
  b(c, "observedAttributes", f), b(c, "formAssociated", !!u);
  for (const l of r)
    Object.defineProperty(c.prototype, l.name, {
      get() {
        return this._props[l.name].value;
      },
      set(E) {
        this.setProp(l.name, E, !0);
      }
    });
  return c;
}, It = (i, t, r = {}) => {
  const e = Tt(i, r);
  return customElements.define(t, e);
}, Kt = (...i) => {
  if (typeof window > "u")
    return null;
  const t = new CSSStyleSheet();
  return t.replaceSync(i.join("")), t;
};
export {
  Rt as boolean,
  Kt as instantiateStyleSheet,
  zt as keyword,
  Gt as keywordOrNumber,
  Tt as makeCustomElement,
  ot as maybeKeyword,
  gt as maybeKeywordOrNumber,
  nt as maybeNumber,
  Mt as number,
  Wt as numberList,
  Zt as raw,
  It as register,
  Dt as string,
  $t as stringList
};
//# sourceMappingURL=index.js.map
