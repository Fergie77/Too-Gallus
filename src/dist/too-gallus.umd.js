;(function (jr) {
  typeof define == 'function' && define.amd ? define(jr) : jr()
})(function () {
  'use strict'
  const jr = (s) => {
    let e = s.querySelectorAll('.lazy')
    if (e.length > 0) {
      let r = new IntersectionObserver(
        (t, n) => {
          t.forEach((i) => {
            if (i.isIntersecting) {
              let o = i.target,
                a = o.getAttribute('data-src')
              a && ((o.src = a), o.removeAttribute('data-src')), n.unobserve(o)
            }
          })
        },
        { threshold: 0 }
      )
      e.forEach((t) => r.observe(t))
    } else return
  }
  function Cf(s, e) {
    for (var r = 0; r < e.length; r++) {
      var t = e[r]
      ;(t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        'value' in t && (t.writable = !0),
        Object.defineProperty(
          s,
          typeof (n = (function (i, o) {
            if (typeof i != 'object' || i === null) return i
            var a = i[Symbol.toPrimitive]
            if (a !== void 0) {
              var u = a.call(i, 'string')
              if (typeof u != 'object') return u
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              )
            }
            return String(i)
          })(t.key)) == 'symbol'
            ? n
            : String(n),
          t
        )
    }
    var n
  }
  function ho(s, e, r) {
    return (
      e && Cf(s.prototype, e),
      Object.defineProperty(s, 'prototype', { writable: !1 }),
      s
    )
  }
  function Jt() {
    return (
      (Jt = Object.assign
        ? Object.assign.bind()
        : function (s) {
            for (var e = 1; e < arguments.length; e++) {
              var r = arguments[e]
              for (var t in r)
                Object.prototype.hasOwnProperty.call(r, t) && (s[t] = r[t])
            }
            return s
          }),
      Jt.apply(this, arguments)
    )
  }
  function is(s, e) {
    ;(s.prototype = Object.create(e.prototype)),
      (s.prototype.constructor = s),
      ai(s, e)
  }
  function po(s) {
    return (
      (po = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
          }),
      po(s)
    )
  }
  function ai(s, e) {
    return (
      (ai = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (r, t) {
            return (r.__proto__ = t), r
          }),
      ai(s, e)
    )
  }
  function Ef() {
    if (typeof Reflect > 'u' || !Reflect.construct || Reflect.construct.sham)
      return !1
    if (typeof Proxy == 'function') return !0
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      )
    } catch {
      return !1
    }
  }
  function go(s, e, r) {
    return (
      (go = Ef()
        ? Reflect.construct.bind()
        : function (t, n, i) {
            var o = [null]
            o.push.apply(o, n)
            var a = new (Function.bind.apply(t, o))()
            return i && ai(a, i.prototype), a
          }),
      go.apply(null, arguments)
    )
  }
  function mo(s) {
    var e = typeof Map == 'function' ? new Map() : void 0
    return (
      (mo = function (r) {
        if (
          r === null ||
          Function.toString.call(r).indexOf('[native code]') === -1
        )
          return r
        if (typeof r != 'function')
          throw new TypeError(
            'Super expression must either be null or a function'
          )
        if (e !== void 0) {
          if (e.has(r)) return e.get(r)
          e.set(r, t)
        }
        function t() {
          return go(r, arguments, po(this).constructor)
        }
        return (
          (t.prototype = Object.create(r.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          ai(t, r)
        )
      }),
      mo(s)
    )
  }
  function Pf(s) {
    if (s === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    return s
  }
  var Er,
    kf = function () {
      ;(this.before = void 0),
        (this.beforeLeave = void 0),
        (this.leave = void 0),
        (this.afterLeave = void 0),
        (this.beforeEnter = void 0),
        (this.enter = void 0),
        (this.afterEnter = void 0),
        (this.after = void 0)
    }
  ;(function (s) {
    ;(s[(s.off = 0)] = 'off'),
      (s[(s.error = 1)] = 'error'),
      (s[(s.warning = 2)] = 'warning'),
      (s[(s.info = 3)] = 'info'),
      (s[(s.debug = 4)] = 'debug')
  })(Er || (Er = {}))
  var hu = Er.off,
    Ur = (function () {
      function s(r) {
        ;(this.t = void 0), (this.t = r)
      }
      ;(s.getLevel = function () {
        return hu
      }),
        (s.setLevel = function (r) {
          return (hu = Er[r])
        })
      var e = s.prototype
      return (
        (e.error = function () {
          this.i(console.error, Er.error, [].slice.call(arguments))
        }),
        (e.warn = function () {
          this.i(console.warn, Er.warning, [].slice.call(arguments))
        }),
        (e.info = function () {
          this.i(console.info, Er.info, [].slice.call(arguments))
        }),
        (e.debug = function () {
          this.i(console.log, Er.debug, [].slice.call(arguments))
        }),
        (e.i = function (r, t, n) {
          t <= s.getLevel() && r.apply(console, ['[' + this.t + '] '].concat(n))
        }),
        s
      )
    })()
  function kn(s) {
    return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
  }
  function du(s) {
    return s && s.sensitive ? '' : 'i'
  }
  var er = {
      container: 'container',
      history: 'history',
      namespace: 'namespace',
      prefix: 'data-barba',
      prevent: 'prevent',
      wrapper: 'wrapper',
    },
    Gr = new ((function () {
      function s() {
        ;(this.o = er),
          (this.u = void 0),
          (this.h = { after: null, before: null, parent: null })
      }
      var e = s.prototype
      return (
        (e.toString = function (r) {
          return r.outerHTML
        }),
        (e.toDocument = function (r) {
          return (
            this.u || (this.u = new DOMParser()),
            this.u.parseFromString(r, 'text/html')
          )
        }),
        (e.toElement = function (r) {
          var t = document.createElement('div')
          return (t.innerHTML = r), t
        }),
        (e.getHtml = function (r) {
          return (
            r === void 0 && (r = document), this.toString(r.documentElement)
          )
        }),
        (e.getWrapper = function (r) {
          return (
            r === void 0 && (r = document),
            r.querySelector('[' + this.o.prefix + '="' + this.o.wrapper + '"]')
          )
        }),
        (e.getContainer = function (r) {
          return (
            r === void 0 && (r = document),
            r.querySelector(
              '[' + this.o.prefix + '="' + this.o.container + '"]'
            )
          )
        }),
        (e.removeContainer = function (r) {
          document.body.contains(r) && (this.v(r), r.parentNode.removeChild(r))
        }),
        (e.addContainer = function (r, t) {
          var n = this.getContainer() || this.h.before
          n
            ? this.l(r, n)
            : this.h.after
            ? this.h.after.parentNode.insertBefore(r, this.h.after)
            : this.h.parent
            ? this.h.parent.appendChild(r)
            : t.appendChild(r)
        }),
        (e.getSibling = function () {
          return this.h
        }),
        (e.getNamespace = function (r) {
          r === void 0 && (r = document)
          var t = r.querySelector(
            '[' + this.o.prefix + '-' + this.o.namespace + ']'
          )
          return t
            ? t.getAttribute(this.o.prefix + '-' + this.o.namespace)
            : null
        }),
        (e.getHref = function (r) {
          if (r.tagName && r.tagName.toLowerCase() === 'a') {
            if (typeof r.href == 'string') return r.href
            var t = r.getAttribute('href') || r.getAttribute('xlink:href')
            if (t) return this.resolveUrl(t.baseVal || t)
          }
          return null
        }),
        (e.resolveUrl = function () {
          var r = [].slice.call(arguments).length
          if (r === 0)
            throw new Error(
              'resolveUrl requires at least one argument; got none.'
            )
          var t = document.createElement('base')
          if (((t.href = arguments[0]), r === 1)) return t.href
          var n = document.getElementsByTagName('head')[0]
          n.insertBefore(t, n.firstChild)
          for (var i, o = document.createElement('a'), a = 1; a < r; a++)
            (o.href = arguments[a]), (t.href = i = o.href)
          return n.removeChild(t), i
        }),
        (e.l = function (r, t) {
          t.parentNode.insertBefore(r, t.nextSibling)
        }),
        (e.v = function (r) {
          return (
            (this.h = {
              after: r.nextElementSibling,
              before: r.previousElementSibling,
              parent: r.parentElement,
            }),
            this.h
          )
        }),
        s
      )
    })())(),
    Of = (function () {
      function s() {
        ;(this.p = void 0), (this.m = []), (this.P = -1)
      }
      var e = s.prototype
      return (
        (e.init = function (r, t) {
          this.p = 'barba'
          var n = {
            data: {},
            ns: t,
            scroll: { x: window.scrollX, y: window.scrollY },
            url: r,
          }
          ;(this.P = 0), this.m.push(n)
          var i = { from: this.p, index: this.P, states: [].concat(this.m) }
          window.history && window.history.replaceState(i, '', r)
        }),
        (e.change = function (r, t, n) {
          if (n && n.state) {
            var i = n.state,
              o = i.index
            ;(t = this.g(this.P - o)), this.replace(i.states), (this.P = o)
          } else this.add(r, t)
          return t
        }),
        (e.add = function (r, t, n, i) {
          var o = n ?? this.R(t),
            a = {
              data: i ?? {},
              ns: 'tmp',
              scroll: { x: window.scrollX, y: window.scrollY },
              url: r,
            }
          switch (o) {
            case 'push':
              ;(this.P = this.size), this.m.push(a)
              break
            case 'replace':
              this.set(this.P, a)
          }
          var u = { from: this.p, index: this.P, states: [].concat(this.m) }
          switch (o) {
            case 'push':
              window.history && window.history.pushState(u, '', r)
              break
            case 'replace':
              window.history && window.history.replaceState(u, '', r)
          }
        }),
        (e.store = function (r, t) {
          var n = t || this.P,
            i = this.get(n)
          ;(i.data = Jt({}, i.data, r)), this.set(n, i)
          var o = { from: this.p, index: this.P, states: [].concat(this.m) }
          window.history.replaceState(o, '')
        }),
        (e.update = function (r, t) {
          var n = t || this.P,
            i = Jt({}, this.get(n), r)
          this.set(n, i)
        }),
        (e.remove = function (r) {
          r ? this.m.splice(r, 1) : this.m.pop(), this.P--
        }),
        (e.clear = function () {
          ;(this.m = []), (this.P = -1)
        }),
        (e.replace = function (r) {
          this.m = r
        }),
        (e.get = function (r) {
          return this.m[r]
        }),
        (e.set = function (r, t) {
          return (this.m[r] = t)
        }),
        (e.R = function (r) {
          var t = 'push',
            n = r,
            i = er.prefix + '-' + er.history
          return (
            n.hasAttribute && n.hasAttribute(i) && (t = n.getAttribute(i)), t
          )
        }),
        (e.g = function (r) {
          return Math.abs(r) > 1
            ? r > 0
              ? 'forward'
              : 'back'
            : r === 0
            ? 'popstate'
            : r > 0
            ? 'back'
            : 'forward'
        }),
        ho(s, [
          {
            key: 'current',
            get: function () {
              return this.m[this.P]
            },
          },
          {
            key: 'previous',
            get: function () {
              return this.P < 1 ? null : this.m[this.P - 1]
            },
          },
          {
            key: 'size',
            get: function () {
              return this.m.length
            },
          },
        ]),
        s
      )
    })(),
    pu = new Of(),
    ss = function (s, e) {
      try {
        var r = (function () {
          if (!e.next.html)
            return Promise.resolve(s).then(function (t) {
              var n = e.next
              if (t) {
                var i = Gr.toElement(t.html)
                ;(n.namespace = Gr.getNamespace(i)),
                  (n.container = Gr.getContainer(i)),
                  (n.url = t.url),
                  (n.html = t.html),
                  pu.update({ ns: n.namespace })
                var o = Gr.toDocument(t.html)
                document.title = o.title
              }
            })
        })()
        return Promise.resolve(r && r.then ? r.then(function () {}) : void 0)
      } catch (t) {
        return Promise.reject(t)
      }
    },
    gu = function s(e, r, t) {
      return e instanceof RegExp
        ? (function (n, i) {
            if (!i) return n
            for (
              var o = /\((?:\?<(.*?)>)?(?!\?)/g, a = 0, u = o.exec(n.source);
              u;

            )
              i.push({
                name: u[1] || a++,
                prefix: '',
                suffix: '',
                modifier: '',
                pattern: '',
              }),
                (u = o.exec(n.source))
            return n
          })(e, r)
        : Array.isArray(e)
        ? (function (n, i, o) {
            var a = n.map(function (u) {
              return s(u, i, o).source
            })
            return new RegExp('(?:'.concat(a.join('|'), ')'), du(o))
          })(e, r, t)
        : (function (n, i, o) {
            return (function (a, u, l) {
              l === void 0 && (l = {})
              for (
                var c = l.strict,
                  h = c !== void 0 && c,
                  f = l.start,
                  d = f === void 0 || f,
                  g = l.end,
                  p = g === void 0 || g,
                  m = l.encode,
                  _ =
                    m === void 0
                      ? function (D) {
                          return D
                        }
                      : m,
                  v = l.delimiter,
                  y = v === void 0 ? '/#?' : v,
                  b = l.endsWith,
                  T = '['.concat(kn(b === void 0 ? '' : b), ']|$'),
                  S = '['.concat(kn(y), ']'),
                  w = d ? '^' : '',
                  P = 0,
                  E = a;
                P < E.length;
                P++
              ) {
                var C = E[P]
                if (typeof C == 'string') w += kn(_(C))
                else {
                  var L = kn(_(C.prefix)),
                    k = kn(_(C.suffix))
                  if (C.pattern)
                    if ((u && u.push(C), L || k))
                      if (C.modifier === '+' || C.modifier === '*') {
                        var R = C.modifier === '*' ? '?' : ''
                        w += '(?:'
                          .concat(L, '((?:')
                          .concat(C.pattern, ')(?:')
                          .concat(k)
                          .concat(L, '(?:')
                          .concat(C.pattern, '))*)')
                          .concat(k, ')')
                          .concat(R)
                      } else
                        w += '(?:'
                          .concat(L, '(')
                          .concat(C.pattern, ')')
                          .concat(k, ')')
                          .concat(C.modifier)
                    else
                      w +=
                        C.modifier === '+' || C.modifier === '*'
                          ? '((?:'
                              .concat(C.pattern, ')')
                              .concat(C.modifier, ')')
                          : '('.concat(C.pattern, ')').concat(C.modifier)
                  else w += '(?:'.concat(L).concat(k, ')').concat(C.modifier)
                }
              }
              if (p)
                h || (w += ''.concat(S, '?')),
                  (w += l.endsWith ? '(?='.concat(T, ')') : '$')
              else {
                var A = a[a.length - 1],
                  O =
                    typeof A == 'string'
                      ? S.indexOf(A[A.length - 1]) > -1
                      : A === void 0
                h || (w += '(?:'.concat(S, '(?=').concat(T, '))?')),
                  O || (w += '(?='.concat(S, '|').concat(T, ')'))
              }
              return new RegExp(w, du(l))
            })(
              (function (a, u) {
                u === void 0 && (u = {})
                for (
                  var l = (function (k) {
                      for (var R = [], A = 0; A < k.length; ) {
                        var O = k[A]
                        if (O !== '*' && O !== '+' && O !== '?')
                          if (O !== '\\')
                            if (O !== '{')
                              if (O !== '}')
                                if (O !== ':')
                                  if (O !== '(')
                                    R.push({
                                      type: 'CHAR',
                                      index: A,
                                      value: k[A++],
                                    })
                                  else {
                                    var D = 1,
                                      I = ''
                                    if (k[(z = A + 1)] === '?')
                                      throw new TypeError(
                                        'Pattern cannot start with "?" at '.concat(
                                          z
                                        )
                                      )
                                    for (; z < k.length; )
                                      if (k[z] !== '\\') {
                                        if (k[z] === ')') {
                                          if (--D == 0) {
                                            z++
                                            break
                                          }
                                        } else if (
                                          k[z] === '(' &&
                                          (D++, k[z + 1] !== '?')
                                        )
                                          throw new TypeError(
                                            'Capturing groups are not allowed at '.concat(
                                              z
                                            )
                                          )
                                        I += k[z++]
                                      } else I += k[z++] + k[z++]
                                    if (D)
                                      throw new TypeError(
                                        'Unbalanced pattern at '.concat(A)
                                      )
                                    if (!I)
                                      throw new TypeError(
                                        'Missing pattern at '.concat(A)
                                      )
                                    R.push({
                                      type: 'PATTERN',
                                      index: A,
                                      value: I,
                                    }),
                                      (A = z)
                                  }
                                else {
                                  for (var F = '', z = A + 1; z < k.length; ) {
                                    var x = k.charCodeAt(z)
                                    if (
                                      !(
                                        (x >= 48 && x <= 57) ||
                                        (x >= 65 && x <= 90) ||
                                        (x >= 97 && x <= 122) ||
                                        x === 95
                                      )
                                    )
                                      break
                                    F += k[z++]
                                  }
                                  if (!F)
                                    throw new TypeError(
                                      'Missing parameter name at '.concat(A)
                                    )
                                  R.push({ type: 'NAME', index: A, value: F }),
                                    (A = z)
                                }
                              else
                                R.push({
                                  type: 'CLOSE',
                                  index: A,
                                  value: k[A++],
                                })
                            else
                              R.push({ type: 'OPEN', index: A, value: k[A++] })
                          else
                            R.push({
                              type: 'ESCAPED_CHAR',
                              index: A++,
                              value: k[A++],
                            })
                        else
                          R.push({ type: 'MODIFIER', index: A, value: k[A++] })
                      }
                      return R.push({ type: 'END', index: A, value: '' }), R
                    })(a),
                    c = u.prefixes,
                    h = c === void 0 ? './' : c,
                    f = '[^'.concat(kn(u.delimiter || '/#?'), ']+?'),
                    d = [],
                    g = 0,
                    p = 0,
                    m = '',
                    _ = function (k) {
                      if (p < l.length && l[p].type === k) return l[p++].value
                    },
                    v = function (k) {
                      var R = _(k)
                      if (R !== void 0) return R
                      var A = l[p],
                        O = A.index
                      throw new TypeError(
                        'Unexpected '
                          .concat(A.type, ' at ')
                          .concat(O, ', expected ')
                          .concat(k)
                      )
                    },
                    y = function () {
                      for (
                        var k, R = '';
                        (k = _('CHAR') || _('ESCAPED_CHAR'));

                      )
                        R += k
                      return R
                    };
                  p < l.length;

                ) {
                  var b = _('CHAR'),
                    T = _('NAME'),
                    S = _('PATTERN')
                  if (T || S)
                    h.indexOf((P = b || '')) === -1 && ((m += P), (P = '')),
                      m && (d.push(m), (m = '')),
                      d.push({
                        name: T || g++,
                        prefix: P,
                        suffix: '',
                        pattern: S || f,
                        modifier: _('MODIFIER') || '',
                      })
                  else {
                    var w = b || _('ESCAPED_CHAR')
                    if (w) m += w
                    else if ((m && (d.push(m), (m = '')), _('OPEN'))) {
                      var P = y(),
                        E = _('NAME') || '',
                        C = _('PATTERN') || '',
                        L = y()
                      v('CLOSE'),
                        d.push({
                          name: E || (C ? g++ : ''),
                          pattern: E && !C ? f : C,
                          prefix: P,
                          suffix: L,
                          modifier: _('MODIFIER') || '',
                        })
                    } else v('END')
                  }
                }
                return d
              })(n, o),
              i,
              o
            )
          })(e, r, t)
    },
    Af = {
      __proto__: null,
      update: ss,
      nextTick: function () {
        return new Promise(function (s) {
          window.requestAnimationFrame(s)
        })
      },
      pathToRegexp: gu,
    },
    mu = function () {
      return window.location.origin
    },
    ui = function (s) {
      return s === void 0 && (s = window.location.href), Pr(s).port
    },
    Pr = function (s) {
      var e,
        r = s.match(/:\d+/)
      if (r === null) /^http/.test(s) && (e = 80), /^https/.test(s) && (e = 443)
      else {
        var t = r[0].substring(1)
        e = parseInt(t, 10)
      }
      var n,
        i = s.replace(mu(), ''),
        o = {},
        a = i.indexOf('#')
      a >= 0 && ((n = i.slice(a + 1)), (i = i.slice(0, a)))
      var u = i.indexOf('?')
      return (
        u >= 0 && ((o = _u(i.slice(u + 1))), (i = i.slice(0, u))),
        { hash: n, path: i, port: e, query: o }
      )
    },
    _u = function (s) {
      return s.split('&').reduce(function (e, r) {
        var t = r.split('=')
        return (e[t[0]] = t[1]), e
      }, {})
    },
    _o = function (s) {
      return (
        s === void 0 && (s = window.location.href),
        s.replace(/(\/#.*|\/|#.*)$/, '')
      )
    },
    Mf = {
      __proto__: null,
      getHref: function () {
        return window.location.href
      },
      getAbsoluteHref: function (s, e) {
        return e === void 0 && (e = document.baseURI), new URL(s, e).href
      },
      getOrigin: mu,
      getPort: ui,
      getPath: function (s) {
        return s === void 0 && (s = window.location.href), Pr(s).path
      },
      getQuery: function (s, e) {
        return (
          e === void 0 && (e = !1),
          e ? JSON.stringify(Pr(s).query) : Pr(s).query
        )
      },
      getHash: function (s) {
        return Pr(s).hash
      },
      parse: Pr,
      parseQuery: _u,
      clean: _o,
    }
  function Df(s, e, r, t, n) {
    return (
      e === void 0 && (e = 2e3),
      new Promise(function (i, o) {
        var a = new XMLHttpRequest()
        ;(a.onreadystatechange = function () {
          if (a.readyState === XMLHttpRequest.DONE) {
            if (a.status === 200) {
              var u =
                a.responseURL !== '' && a.responseURL !== s ? a.responseURL : s
              i({ html: a.responseText, url: Jt({ href: u }, Pr(u)) }),
                t.update(s, { status: 'fulfilled', target: u })
            } else if (a.status) {
              var l = { status: a.status, statusText: a.statusText }
              r(s, l), o(l), t.update(s, { status: 'rejected' })
            }
          }
        }),
          (a.ontimeout = function () {
            var u = new Error('Timeout error [' + e + ']')
            r(s, u), o(u), t.update(s, { status: 'rejected' })
          }),
          (a.onerror = function () {
            var u = new Error('Fetch error')
            r(s, u), o(u), t.update(s, { status: 'rejected' })
          }),
          a.open('GET', s),
          (a.timeout = e),
          a.setRequestHeader(
            'Accept',
            'text/html,application/xhtml+xml,application/xml'
          ),
          a.setRequestHeader('x-barba', 'yes'),
          n.all().forEach(function (u, l) {
            a.setRequestHeader(l, u)
          }),
          a.send()
      })
    )
  }
  function Rf(s) {
    return (
      !!s &&
      (typeof s == 'object' || typeof s == 'function') &&
      typeof s.then == 'function'
    )
  }
  function On(s, e) {
    return (
      e === void 0 && (e = {}),
      function () {
        var r = arguments,
          t = !1,
          n = new Promise(function (i, o) {
            e.async = function () {
              return (
                (t = !0),
                function (u, l) {
                  u ? o(u) : i(l)
                }
              )
            }
            var a = s.apply(e, [].slice.call(r))
            t || (Rf(a) ? a.then(i, o) : i(a))
          })
        return n
      }
    )
  }
  var kr = new ((function (s) {
      function e() {
        var t
        return (
          ((t = s.call(this) || this).logger = new Ur('@barba/core')),
          (t.all = [
            'ready',
            'page',
            'reset',
            'currentAdded',
            'currentRemoved',
            'nextAdded',
            'nextRemoved',
            'beforeOnce',
            'once',
            'afterOnce',
            'before',
            'beforeLeave',
            'leave',
            'afterLeave',
            'beforeEnter',
            'enter',
            'afterEnter',
            'after',
          ]),
          (t.registered = new Map()),
          t.init(),
          t
        )
      }
      is(e, s)
      var r = e.prototype
      return (
        (r.init = function () {
          var t = this
          this.registered.clear(),
            this.all.forEach(function (n) {
              t[n] ||
                (t[n] = function (i, o) {
                  t.registered.has(n) || t.registered.set(n, new Set()),
                    t.registered.get(n).add({ ctx: o || {}, fn: i })
                })
            })
        }),
        (r.do = function (t) {
          var n = arguments,
            i = this
          if (this.registered.has(t)) {
            var o = Promise.resolve()
            return (
              this.registered.get(t).forEach(function (a) {
                o = o.then(function () {
                  return On(a.fn, a.ctx).apply(void 0, [].slice.call(n, 1))
                })
              }),
              o.catch(function (a) {
                i.logger.debug('Hook error [' + t + ']'), i.logger.error(a)
              })
            )
          }
          return Promise.resolve()
        }),
        (r.clear = function () {
          var t = this
          this.all.forEach(function (n) {
            delete t[n]
          }),
            this.init()
        }),
        (r.help = function () {
          this.logger.info('Available hooks: ' + this.all.join(','))
          var t = []
          this.registered.forEach(function (n, i) {
            return t.push(i)
          }),
            this.logger.info('Registered hooks: ' + t.join(','))
        }),
        e
      )
    })(kf))(),
    vu = (function () {
      function s(e) {
        if (((this.k = void 0), (this.O = []), typeof e == 'boolean'))
          this.k = e
        else {
          var r = Array.isArray(e) ? e : [e]
          this.O = r.map(function (t) {
            return gu(t)
          })
        }
      }
      return (
        (s.prototype.checkHref = function (e) {
          if (typeof this.k == 'boolean') return this.k
          var r = Pr(e).path
          return this.O.some(function (t) {
            return t.exec(r) !== null
          })
        }),
        s
      )
    })(),
    Lf = (function (s) {
      function e(t) {
        var n
        return ((n = s.call(this, t) || this).T = new Map()), n
      }
      is(e, s)
      var r = e.prototype
      return (
        (r.set = function (t, n, i, o, a) {
          return (
            this.T.set(t, { action: i, request: n, status: o, target: a ?? t }),
            { action: i, request: n, status: o, target: a }
          )
        }),
        (r.get = function (t) {
          return this.T.get(t)
        }),
        (r.getRequest = function (t) {
          return this.T.get(t).request
        }),
        (r.getAction = function (t) {
          return this.T.get(t).action
        }),
        (r.getStatus = function (t) {
          return this.T.get(t).status
        }),
        (r.getTarget = function (t) {
          return this.T.get(t).target
        }),
        (r.has = function (t) {
          return !this.checkHref(t) && this.T.has(t)
        }),
        (r.delete = function (t) {
          return this.T.delete(t)
        }),
        (r.update = function (t, n) {
          var i = Jt({}, this.T.get(t), n)
          return this.T.set(t, i), i
        }),
        e
      )
    })(vu),
    If = (function () {
      function s() {
        this.A = new Map()
      }
      var e = s.prototype
      return (
        (e.set = function (r, t) {
          return this.A.set(r, t), { name: t }
        }),
        (e.get = function (r) {
          return this.A.get(r)
        }),
        (e.all = function () {
          return this.A
        }),
        (e.has = function (r) {
          return this.A.has(r)
        }),
        (e.delete = function (r) {
          return this.A.delete(r)
        }),
        (e.clear = function () {
          return this.A.clear()
        }),
        s
      )
    })(),
    Ff = function () {
      return !window.history.pushState
    },
    zf = function (s) {
      return !s.el || !s.href
    },
    Vf = function (s) {
      var e = s.event
      return e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
    },
    Nf = function (s) {
      var e = s.el
      return e.hasAttribute('target') && e.target === '_blank'
    },
    Bf = function (s) {
      var e = s.el
      return (
        (e.protocol !== void 0 && window.location.protocol !== e.protocol) ||
        (e.hostname !== void 0 && window.location.hostname !== e.hostname)
      )
    },
    qf = function (s) {
      var e = s.el
      return e.port !== void 0 && ui() !== ui(e.href)
    },
    $f = function (s) {
      var e = s.el
      return e.getAttribute && typeof e.getAttribute('download') == 'string'
    },
    Yf = function (s) {
      return s.el.hasAttribute(er.prefix + '-' + er.prevent)
    },
    Hf = function (s) {
      return !!s.el.closest('[' + er.prefix + '-' + er.prevent + '="all"]')
    },
    Xf = function (s) {
      var e = s.href
      return _o(e) === _o() && ui(e) === ui()
    },
    Wf = (function (s) {
      function e(t) {
        var n
        return (
          ((n = s.call(this, t) || this).suite = []),
          (n.tests = new Map()),
          n.init(),
          n
        )
      }
      is(e, s)
      var r = e.prototype
      return (
        (r.init = function () {
          this.add('pushState', Ff),
            this.add('exists', zf),
            this.add('newTab', Vf),
            this.add('blank', Nf),
            this.add('corsDomain', Bf),
            this.add('corsPort', qf),
            this.add('download', $f),
            this.add('preventSelf', Yf),
            this.add('preventAll', Hf),
            this.add('sameUrl', Xf, !1)
        }),
        (r.add = function (t, n, i) {
          i === void 0 && (i = !0),
            this.tests.set(t, n),
            i && this.suite.push(t)
        }),
        (r.run = function (t, n, i, o) {
          return this.tests.get(t)({ el: n, event: i, href: o })
        }),
        (r.checkLink = function (t, n, i) {
          var o = this
          return this.suite.some(function (a) {
            return o.run(a, t, n, i)
          })
        }),
        e
      )
    })(vu),
    vo = (function (s) {
      function e(r, t) {
        var n
        return (
          t === void 0 && (t = 'Barba error'),
          ((n =
            s.call.apply(s, [this].concat([].slice.call(arguments, 2))) ||
            this).error = void 0),
          (n.label = void 0),
          (n.error = r),
          (n.label = t),
          Error.captureStackTrace && Error.captureStackTrace(Pf(n), e),
          (n.name = 'BarbaError'),
          n
        )
      }
      return is(e, s), e
    })(mo(Error)),
    jf = (function () {
      function s(r) {
        r === void 0 && (r = []),
          (this.logger = new Ur('@barba/core')),
          (this.all = []),
          (this.page = []),
          (this.once = []),
          (this.j = [
            { name: 'namespace', type: 'strings' },
            { name: 'custom', type: 'function' },
          ]),
          r && (this.all = this.all.concat(r)),
          this.update()
      }
      var e = s.prototype
      return (
        (e.add = function (r, t) {
          r === 'rule'
            ? this.j.splice(t.position || 0, 0, t.value)
            : this.all.push(t),
            this.update()
        }),
        (e.resolve = function (r, t) {
          var n = this
          t === void 0 && (t = {})
          var i = t.once ? this.once : this.page
          i = i.filter(
            t.self
              ? function (f) {
                  return f.name && f.name === 'self'
                }
              : function (f) {
                  return !f.name || f.name !== 'self'
                }
          )
          var o = new Map(),
            a = i.find(function (f) {
              var d = !0,
                g = {}
              return t.self && f.name === 'self'
                ? (o.set(f, g), !0)
                : (n.j.reverse().forEach(function (p) {
                    d &&
                      ((d = n.M(f, p, r, g)),
                      f.from &&
                        f.to &&
                        (d = n.M(f, p, r, g, 'from') && n.M(f, p, r, g, 'to')),
                      f.from && !f.to && (d = n.M(f, p, r, g, 'from')),
                      !f.from && f.to && (d = n.M(f, p, r, g, 'to')))
                  }),
                  o.set(f, g),
                  d)
            }),
            u = o.get(a),
            l = []
          if ((l.push(t.once ? 'once' : 'page'), t.self && l.push('self'), u)) {
            var c,
              h = [a]
            Object.keys(u).length > 0 && h.push(u),
              (c = this.logger).info.apply(
                c,
                ['Transition found [' + l.join(',') + ']'].concat(h)
              )
          } else this.logger.info('No transition found [' + l.join(',') + ']')
          return a
        }),
        (e.update = function () {
          var r = this
          ;(this.all = this.all
            .map(function (t) {
              return r.N(t)
            })
            .sort(function (t, n) {
              return t.priority - n.priority
            })
            .reverse()
            .map(function (t) {
              return delete t.priority, t
            })),
            (this.page = this.all.filter(function (t) {
              return t.leave !== void 0 || t.enter !== void 0
            })),
            (this.once = this.all.filter(function (t) {
              return t.once !== void 0
            }))
        }),
        (e.M = function (r, t, n, i, o) {
          var a = !0,
            u = !1,
            l = r,
            c = t.name,
            h = c,
            f = c,
            d = c,
            g = o ? l[o] : l,
            p = o === 'to' ? n.next : n.current
          if (o ? g && g[c] : g[c]) {
            switch (t.type) {
              case 'strings':
              default:
                var m = Array.isArray(g[h]) ? g[h] : [g[h]]
                p[h] && m.indexOf(p[h]) !== -1 && (u = !0),
                  m.indexOf(p[h]) === -1 && (a = !1)
                break
              case 'object':
                var _ = Array.isArray(g[f]) ? g[f] : [g[f]]
                p[f]
                  ? (p[f].name && _.indexOf(p[f].name) !== -1 && (u = !0),
                    _.indexOf(p[f].name) === -1 && (a = !1))
                  : (a = !1)
                break
              case 'function':
                g[d](n) ? (u = !0) : (a = !1)
            }
            u &&
              (o ? ((i[o] = i[o] || {}), (i[o][c] = l[o][c])) : (i[c] = l[c]))
          }
          return a
        }),
        (e.S = function (r, t, n) {
          var i = 0
          return (
            (r[t] || (r.from && r.from[t]) || (r.to && r.to[t])) &&
              ((i += Math.pow(10, n)),
              r.from && r.from[t] && (i += 1),
              r.to && r.to[t] && (i += 2)),
            i
          )
        }),
        (e.N = function (r) {
          var t = this
          r.priority = 0
          var n = 0
          return (
            this.j.forEach(function (i, o) {
              n += t.S(r, i.name, o + 1)
            }),
            (r.priority = n),
            r
          )
        }),
        s
      )
    })()
  function li(s, e) {
    try {
      var r = s()
    } catch (t) {
      return e(t)
    }
    return r && r.then ? r.then(void 0, e) : r
  }
  var Uf = (function () {
      function s(r) {
        r === void 0 && (r = []),
          (this.logger = new Ur('@barba/core')),
          (this.store = void 0),
          (this.C = !1),
          (this.store = new jf(r))
      }
      var e = s.prototype
      return (
        (e.get = function (r, t) {
          return this.store.resolve(r, t)
        }),
        (e.doOnce = function (r) {
          var t = r.data,
            n = r.transition
          try {
            var i = function () {
                o.C = !1
              },
              o = this,
              a = n || {}
            o.C = !0
            var u = li(
              function () {
                return Promise.resolve(o.L('beforeOnce', t, a)).then(
                  function () {
                    return Promise.resolve(o.once(t, a)).then(function () {
                      return Promise.resolve(o.L('afterOnce', t, a)).then(
                        function () {}
                      )
                    })
                  }
                )
              },
              function (l) {
                ;(o.C = !1),
                  o.logger.debug('Transition error [before/after/once]'),
                  o.logger.error(l)
              }
            )
            return Promise.resolve(u && u.then ? u.then(i) : i())
          } catch (l) {
            return Promise.reject(l)
          }
        }),
        (e.doPage = function (r) {
          var t = r.data,
            n = r.transition,
            i = r.page,
            o = r.wrapper
          try {
            var a = function (f) {
                u.C = !1
              },
              u = this,
              l = n || {},
              c = l.sync === !0 || !1
            u.C = !0
            var h = li(
              function () {
                function f() {
                  return Promise.resolve(u.L('before', t, l)).then(function () {
                    function g(m) {
                      return Promise.resolve(u.remove(t)).then(function () {
                        return Promise.resolve(u.L('after', t, l)).then(
                          function () {}
                        )
                      })
                    }
                    var p = (function () {
                      if (c)
                        return li(
                          function () {
                            return Promise.resolve(u.add(t, o)).then(
                              function () {
                                return Promise.resolve(
                                  u.L('beforeLeave', t, l)
                                ).then(function () {
                                  return Promise.resolve(
                                    u.L('beforeEnter', t, l)
                                  ).then(function () {
                                    return Promise.resolve(
                                      Promise.all([
                                        u.leave(t, l),
                                        u.enter(t, l),
                                      ])
                                    ).then(function () {
                                      return Promise.resolve(
                                        u.L('afterLeave', t, l)
                                      ).then(function () {
                                        return Promise.resolve(
                                          u.L('afterEnter', t, l)
                                        ).then(function () {})
                                      })
                                    })
                                  })
                                })
                              }
                            )
                          },
                          function (y) {
                            if (u.H(y))
                              throw new vo(y, 'Transition error [sync]')
                          }
                        )
                      var m = function (y) {
                          return li(
                            function () {
                              var b = (function () {
                                if (_ !== !1)
                                  return Promise.resolve(u.add(t, o)).then(
                                    function () {
                                      return Promise.resolve(
                                        u.L('beforeEnter', t, l)
                                      ).then(function () {
                                        return Promise.resolve(
                                          u.enter(t, l, _)
                                        ).then(function () {
                                          return Promise.resolve(
                                            u.L('afterEnter', t, l)
                                          ).then(function () {})
                                        })
                                      })
                                    }
                                  )
                              })()
                              if (b && b.then) return b.then(function () {})
                            },
                            function (b) {
                              if (u.H(b))
                                throw new vo(
                                  b,
                                  'Transition error [before/after/enter]'
                                )
                            }
                          )
                        },
                        _ = !1,
                        v = li(
                          function () {
                            return Promise.resolve(
                              u.L('beforeLeave', t, l)
                            ).then(function () {
                              return Promise.resolve(
                                Promise.all([u.leave(t, l), ss(i, t)]).then(
                                  function (y) {
                                    return y[0]
                                  }
                                )
                              ).then(function (y) {
                                return (
                                  (_ = y),
                                  Promise.resolve(u.L('afterLeave', t, l)).then(
                                    function () {}
                                  )
                                )
                              })
                            })
                          },
                          function (y) {
                            if (u.H(y))
                              throw new vo(
                                y,
                                'Transition error [before/after/leave]'
                              )
                          }
                        )
                      return v && v.then ? v.then(m) : m()
                    })()
                    return p && p.then ? p.then(g) : g()
                  })
                }
                var d = (function () {
                  if (c) return Promise.resolve(ss(i, t)).then(function () {})
                })()
                return d && d.then ? d.then(f) : f()
              },
              function (f) {
                throw (
                  ((u.C = !1),
                  f.name && f.name === 'BarbaError'
                    ? (u.logger.debug(f.label), u.logger.error(f.error), f)
                    : (u.logger.debug('Transition error [page]'),
                      u.logger.error(f),
                      f))
                )
              }
            )
            return Promise.resolve(h && h.then ? h.then(a) : a())
          } catch (f) {
            return Promise.reject(f)
          }
        }),
        (e.once = function (r, t) {
          try {
            return Promise.resolve(kr.do('once', r, t)).then(function () {
              return t.once ? On(t.once, t)(r) : Promise.resolve()
            })
          } catch (n) {
            return Promise.reject(n)
          }
        }),
        (e.leave = function (r, t) {
          try {
            return Promise.resolve(kr.do('leave', r, t)).then(function () {
              return t.leave ? On(t.leave, t)(r) : Promise.resolve()
            })
          } catch (n) {
            return Promise.reject(n)
          }
        }),
        (e.enter = function (r, t, n) {
          try {
            return Promise.resolve(kr.do('enter', r, t)).then(function () {
              return t.enter ? On(t.enter, t)(r, n) : Promise.resolve()
            })
          } catch (i) {
            return Promise.reject(i)
          }
        }),
        (e.add = function (r, t) {
          try {
            return (
              Gr.addContainer(r.next.container, t),
              kr.do('nextAdded', r),
              Promise.resolve()
            )
          } catch (n) {
            return Promise.reject(n)
          }
        }),
        (e.remove = function (r) {
          try {
            return (
              Gr.removeContainer(r.current.container),
              kr.do('currentRemoved', r),
              Promise.resolve()
            )
          } catch (t) {
            return Promise.reject(t)
          }
        }),
        (e.H = function (r) {
          return r.message
            ? !/Timeout error|Fetch error/.test(r.message)
            : !r.status
        }),
        (e.L = function (r, t, n) {
          try {
            return Promise.resolve(kr.do(r, t, n)).then(function () {
              return n[r] ? On(n[r], n)(t) : Promise.resolve()
            })
          } catch (i) {
            return Promise.reject(i)
          }
        }),
        ho(s, [
          {
            key: 'isRunning',
            get: function () {
              return this.C
            },
            set: function (r) {
              this.C = r
            },
          },
          {
            key: 'hasOnce',
            get: function () {
              return this.store.once.length > 0
            },
          },
          {
            key: 'hasSelf',
            get: function () {
              return this.store.all.some(function (r) {
                return r.name === 'self'
              })
            },
          },
          {
            key: 'shouldWait',
            get: function () {
              return this.store.all.some(function (r) {
                return (r.to && !r.to.route) || r.sync
              })
            },
          },
        ]),
        s
      )
    })(),
    Gf = (function () {
      function s(e) {
        var r = this
        ;(this.names = [
          'beforeLeave',
          'afterLeave',
          'beforeEnter',
          'afterEnter',
        ]),
          (this.byNamespace = new Map()),
          e.length !== 0 &&
            (e.forEach(function (t) {
              r.byNamespace.set(t.namespace, t)
            }),
            this.names.forEach(function (t) {
              kr[t](r._(t))
            }))
      }
      return (
        (s.prototype._ = function (e) {
          var r = this
          return function (t) {
            var n = e.match(/enter/i) ? t.next : t.current,
              i = r.byNamespace.get(n.namespace)
            return i && i[e] ? On(i[e], i)(t) : Promise.resolve()
          }
        }),
        s
      )
    })()
  Element.prototype.matches ||
    (Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector),
    Element.prototype.closest ||
      (Element.prototype.closest = function (s) {
        var e = this
        do {
          if (e.matches(s)) return e
          e = e.parentElement || e.parentNode
        } while (e !== null && e.nodeType === 1)
        return null
      })
  var Kf = {
      container: null,
      html: '',
      namespace: '',
      url: { hash: '', href: '', path: '', port: null, query: {} },
    },
    os = new ((function () {
      function s() {
        ;(this.version = '2.10.0'),
          (this.schemaPage = Kf),
          (this.Logger = Ur),
          (this.logger = new Ur('@barba/core')),
          (this.plugins = []),
          (this.timeout = void 0),
          (this.cacheIgnore = void 0),
          (this.cacheFirstPage = void 0),
          (this.prefetchIgnore = void 0),
          (this.preventRunning = void 0),
          (this.hooks = kr),
          (this.cache = void 0),
          (this.headers = void 0),
          (this.prevent = void 0),
          (this.transitions = void 0),
          (this.views = void 0),
          (this.dom = Gr),
          (this.helpers = Af),
          (this.history = pu),
          (this.request = Df),
          (this.url = Mf),
          (this.D = void 0),
          (this.B = void 0),
          (this.q = void 0),
          (this.F = void 0)
      }
      var e = s.prototype
      return (
        (e.use = function (r, t) {
          var n = this.plugins
          n.indexOf(r) > -1
            ? this.logger.warn('Plugin [' + r.name + '] already installed.')
            : typeof r.install == 'function'
            ? (r.install(this, t), n.push(r))
            : this.logger.warn(
                'Plugin [' + r.name + '] has no "install" method.'
              )
        }),
        (e.init = function (r) {
          var t = r === void 0 ? {} : r,
            n = t.transitions,
            i = n === void 0 ? [] : n,
            o = t.views,
            a = o === void 0 ? [] : o,
            u = t.schema,
            l = u === void 0 ? er : u,
            c = t.requestError,
            h = t.timeout,
            f = h === void 0 ? 2e3 : h,
            d = t.cacheIgnore,
            g = d !== void 0 && d,
            p = t.cacheFirstPage,
            m = p !== void 0 && p,
            _ = t.prefetchIgnore,
            v = _ !== void 0 && _,
            y = t.preventRunning,
            b = y !== void 0 && y,
            T = t.prevent,
            S = T === void 0 ? null : T,
            w = t.debug,
            P = t.logLevel
          if (
            (Ur.setLevel(
              (w !== void 0 && w) === !0 ? 'debug' : P === void 0 ? 'off' : P
            ),
            this.logger.info(this.version),
            Object.keys(l).forEach(function (L) {
              er[L] && (er[L] = l[L])
            }),
            (this.B = c),
            (this.timeout = f),
            (this.cacheIgnore = g),
            (this.cacheFirstPage = m),
            (this.prefetchIgnore = v),
            (this.preventRunning = b),
            (this.q = this.dom.getWrapper()),
            !this.q)
          )
            throw new Error('[@barba/core] No Barba wrapper found')
          this.I()
          var E = this.data.current
          if (!E.container)
            throw new Error('[@barba/core] No Barba container found')
          if (
            ((this.cache = new Lf(g)),
            (this.headers = new If()),
            (this.prevent = new Wf(v)),
            (this.transitions = new Uf(i)),
            (this.views = new Gf(a)),
            S !== null)
          ) {
            if (typeof S != 'function')
              throw new Error('[@barba/core] Prevent should be a function')
            this.prevent.add('preventCustom', S)
          }
          this.history.init(E.url.href, E.namespace),
            m &&
              this.cache.set(
                E.url.href,
                Promise.resolve({ html: E.html, url: E.url }),
                'init',
                'fulfilled'
              ),
            (this.U = this.U.bind(this)),
            (this.$ = this.$.bind(this)),
            (this.X = this.X.bind(this)),
            this.G(),
            this.plugins.forEach(function (L) {
              return L.init()
            })
          var C = this.data
          ;(C.trigger = 'barba'),
            (C.next = C.current),
            (C.current = Jt({}, this.schemaPage)),
            this.hooks.do('ready', C),
            this.once(C),
            this.I()
        }),
        (e.destroy = function () {
          this.I(),
            this.J(),
            this.history.clear(),
            this.hooks.clear(),
            (this.plugins = [])
        }),
        (e.force = function (r) {
          window.location.assign(r)
        }),
        (e.go = function (r, t, n) {
          var i
          if (
            (t === void 0 && (t = 'barba'),
            (this.F = null),
            this.transitions.isRunning)
          )
            this.force(r)
          else if (
            !(i =
              t === 'popstate'
                ? this.history.current &&
                  this.url.getPath(this.history.current.url) ===
                    this.url.getPath(r) &&
                  this.url.getQuery(this.history.current.url, !0) ===
                    this.url.getQuery(r, !0)
                : this.prevent.run('sameUrl', null, null, r)) ||
            this.transitions.hasSelf
          )
            return (
              (t = this.history.change(
                this.cache.has(r) ? this.cache.get(r).target : r,
                t,
                n
              )),
              n && (n.stopPropagation(), n.preventDefault()),
              this.page(r, t, n ?? void 0, i)
            )
        }),
        (e.once = function (r) {
          try {
            var t = this
            return Promise.resolve(t.hooks.do('beforeEnter', r)).then(
              function () {
                function n() {
                  return Promise.resolve(t.hooks.do('afterEnter', r)).then(
                    function () {}
                  )
                }
                var i = (function () {
                  if (t.transitions.hasOnce) {
                    var o = t.transitions.get(r, { once: !0 })
                    return Promise.resolve(
                      t.transitions.doOnce({ transition: o, data: r })
                    ).then(function () {})
                  }
                })()
                return i && i.then ? i.then(n) : n()
              }
            )
          } catch (n) {
            return Promise.reject(n)
          }
        }),
        (e.page = function (r, t, n, i) {
          try {
            var o,
              a = function () {
                var h = u.data
                return Promise.resolve(u.hooks.do('page', h)).then(function () {
                  var f = (function (d, g) {
                    try {
                      var p =
                        ((m = u.transitions.get(h, { once: !1, self: i })),
                        Promise.resolve(
                          u.transitions.doPage({
                            data: h,
                            page: o,
                            transition: m,
                            wrapper: u.q,
                          })
                        ).then(function () {
                          u.I()
                        }))
                    } catch {
                      return g()
                    }
                    var m
                    return p && p.then ? p.then(void 0, g) : p
                  })(0, function () {
                    Ur.getLevel() === 0 && u.force(h.next.url.href)
                  })
                  if (f && f.then) return f.then(function () {})
                })
              },
              u = this
            if (
              ((u.data.next.url = Jt({ href: r }, u.url.parse(r))),
              (u.data.trigger = t),
              (u.data.event = n),
              u.cache.has(r))
            )
              o = u.cache.update(r, { action: 'click' }).request
            else {
              var l = u.request(
                r,
                u.timeout,
                u.onRequestError.bind(u, t),
                u.cache,
                u.headers
              )
              l.then(function (h) {
                h.url.href !== r && u.history.add(h.url.href, t, 'replace')
              }),
                (o = u.cache.set(r, l, 'click', 'pending').request)
            }
            var c = (function () {
              if (u.transitions.shouldWait)
                return Promise.resolve(ss(o, u.data)).then(function () {})
            })()
            return Promise.resolve(c && c.then ? c.then(a) : a())
          } catch (h) {
            return Promise.reject(h)
          }
        }),
        (e.onRequestError = function (r) {
          this.transitions.isRunning = !1
          var t = [].slice.call(arguments, 1),
            n = t[0],
            i = t[1],
            o = this.cache.getAction(n)
          return (
            this.cache.delete(n),
            (this.B && this.B(r, o, n, i) === !1) ||
              (o === 'click' && this.force(n)),
            !1
          )
        }),
        (e.prefetch = function (r) {
          var t = this
          ;(r = this.url.getAbsoluteHref(r)),
            this.cache.has(r) ||
              this.cache.set(
                r,
                this.request(
                  r,
                  this.timeout,
                  this.onRequestError.bind(this, 'barba'),
                  this.cache,
                  this.headers
                ).catch(function (n) {
                  t.logger.error(n)
                }),
                'prefetch',
                'pending'
              )
        }),
        (e.G = function () {
          this.prefetchIgnore !== !0 &&
            (document.addEventListener('mouseover', this.U),
            document.addEventListener('touchstart', this.U)),
            document.addEventListener('click', this.$),
            window.addEventListener('popstate', this.X)
        }),
        (e.J = function () {
          this.prefetchIgnore !== !0 &&
            (document.removeEventListener('mouseover', this.U),
            document.removeEventListener('touchstart', this.U)),
            document.removeEventListener('click', this.$),
            window.removeEventListener('popstate', this.X)
        }),
        (e.U = function (r) {
          var t = this,
            n = this.W(r)
          if (n) {
            var i = this.url.getAbsoluteHref(this.dom.getHref(n))
            this.prevent.checkHref(i) ||
              this.cache.has(i) ||
              this.cache.set(
                i,
                this.request(
                  i,
                  this.timeout,
                  this.onRequestError.bind(this, n),
                  this.cache,
                  this.headers
                ).catch(function (o) {
                  t.logger.error(o)
                }),
                'enter',
                'pending'
              )
          }
        }),
        (e.$ = function (r) {
          this.F = r
          var t = this.W(r)
          if (t)
            return this.transitions.isRunning && this.preventRunning
              ? (r.preventDefault(), void r.stopPropagation())
              : void this.go(this.dom.getHref(t), t, r)
        }),
        (e.X = function (r) {
          ;(this.F && !this.W(this.F)) ||
            this.go(this.url.getHref(), 'popstate', r)
        }),
        (e.W = function (r) {
          for (var t = r.target; t && !this.dom.getHref(t); ) t = t.parentNode
          if (t && !this.prevent.checkLink(t, r, this.dom.getHref(t))) return t
        }),
        (e.I = function () {
          var r = this.url.getHref(),
            t = {
              container: this.dom.getContainer(),
              html: this.dom.getHtml(),
              namespace: this.dom.getNamespace(),
              url: Jt({ href: r }, this.url.parse(r)),
            }
          ;(this.D = {
            current: t,
            event: void 0,
            next: Jt({}, this.schemaPage),
            trigger: void 0,
          }),
            this.hooks.do('reset', this.data)
        }),
        ho(s, [
          {
            key: 'data',
            get: function () {
              return this.D
            },
          },
          {
            key: 'wrapper',
            get: function () {
              return this.q
            },
          },
        ]),
        s
      )
    })())()
  function gr(s) {
    if (s === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    return s
  }
  function yu(s, e) {
    ;(s.prototype = Object.create(e.prototype)),
      (s.prototype.constructor = s),
      (s.__proto__ = e)
  }
  /*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var xt = {
      autoSleep: 120,
      force3D: 'auto',
      nullTargetWarn: 1,
      units: { lineHeight: '' },
    },
    An = { duration: 0.5, overwrite: !1, delay: 0 },
    yo,
    Ge,
    ve,
    tr = 1e8,
    Ke = 1 / tr,
    bo = Math.PI * 2,
    Zf = bo / 4,
    Qf = 0,
    bu = Math.sqrt,
    Jf = Math.cos,
    eh = Math.sin,
    ze = function (e) {
      return typeof e == 'string'
    },
    Se = function (e) {
      return typeof e == 'function'
    },
    mr = function (e) {
      return typeof e == 'number'
    },
    wo = function (e) {
      return typeof e > 'u'
    },
    rr = function (e) {
      return typeof e == 'object'
    },
    gt = function (e) {
      return e !== !1
    },
    xo = function () {
      return typeof window < 'u'
    },
    as = function (e) {
      return Se(e) || ze(e)
    },
    wu =
      (typeof ArrayBuffer == 'function' && ArrayBuffer.isView) ||
      function () {},
    Ze = Array.isArray,
    To = /(?:-?\.?\d|\.)+/gi,
    xu = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Mn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    So = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    Tu = /[+-]=-?[.\d]+/,
    Su = /[^,'"\[\]\s]+/gi,
    th = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    be,
    nr,
    Co,
    Eo,
    Tt = {},
    us = {},
    Cu,
    Eu = function (e) {
      return (us = Zr(e, Tt)) && vt
    },
    Po = function (e, r) {
      return console.warn(
        'Invalid property',
        e,
        'set to',
        r,
        'Missing plugin? gsap.registerPlugin()'
      )
    },
    ci = function (e, r) {
      return !r && console.warn(e)
    },
    Pu = function (e, r) {
      return (e && (Tt[e] = r) && us && (us[e] = r)) || Tt
    },
    fi = function () {
      return 0
    },
    rh = { suppressEvents: !0, isStart: !0, kill: !1 },
    ls = { suppressEvents: !0, kill: !1 },
    nh = { suppressEvents: !0 },
    ko = {},
    Or = [],
    Oo = {},
    ku,
    St = {},
    Ao = {},
    Ou = 30,
    cs = [],
    Mo = '',
    Do = function (e) {
      var r = e[0],
        t,
        n
      if ((rr(r) || Se(r) || (e = [e]), !(t = (r._gsap || {}).harness))) {
        for (n = cs.length; n-- && !cs[n].targetTest(r); );
        t = cs[n]
      }
      for (n = e.length; n--; )
        (e[n] && (e[n]._gsap || (e[n]._gsap = new il(e[n], t)))) ||
          e.splice(n, 1)
      return e
    },
    Kr = function (e) {
      return e._gsap || Do(Rt(e))[0]._gsap
    },
    Au = function (e, r, t) {
      return (t = e[r]) && Se(t)
        ? e[r]()
        : (wo(t) && e.getAttribute && e.getAttribute(r)) || t
    },
    mt = function (e, r) {
      return (e = e.split(',')).forEach(r) || e
    },
    Ee = function (e) {
      return Math.round(e * 1e5) / 1e5 || 0
    },
    Ve = function (e) {
      return Math.round(e * 1e7) / 1e7 || 0
    },
    Dn = function (e, r) {
      var t = r.charAt(0),
        n = parseFloat(r.substr(2))
      return (
        (e = parseFloat(e)),
        t === '+' ? e + n : t === '-' ? e - n : t === '*' ? e * n : e / n
      )
    },
    ih = function (e, r) {
      for (var t = r.length, n = 0; e.indexOf(r[n]) < 0 && ++n < t; );
      return n < t
    },
    fs = function () {
      var e = Or.length,
        r = Or.slice(0),
        t,
        n
      for (Oo = {}, Or.length = 0, t = 0; t < e; t++)
        (n = r[t]),
          n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0)
    },
    Mu = function (e, r, t, n) {
      Or.length && !Ge && fs(),
        e.render(r, t, Ge && r < 0 && (e._initted || e._startAt)),
        Or.length && !Ge && fs()
    },
    Du = function (e) {
      var r = parseFloat(e)
      return (r || r === 0) && (e + '').match(Su).length < 2
        ? r
        : ze(e)
        ? e.trim()
        : e
    },
    Ru = function (e) {
      return e
    },
    Mt = function (e, r) {
      for (var t in r) t in e || (e[t] = r[t])
      return e
    },
    sh = function (e) {
      return function (r, t) {
        for (var n in t)
          n in r || (n === 'duration' && e) || n === 'ease' || (r[n] = t[n])
      }
    },
    Zr = function (e, r) {
      for (var t in r) e[t] = r[t]
      return e
    },
    Lu = function s(e, r) {
      for (var t in r)
        t !== '__proto__' &&
          t !== 'constructor' &&
          t !== 'prototype' &&
          (e[t] = rr(r[t]) ? s(e[t] || (e[t] = {}), r[t]) : r[t])
      return e
    },
    hs = function (e, r) {
      var t = {},
        n
      for (n in e) n in r || (t[n] = e[n])
      return t
    },
    hi = function (e) {
      var r = e.parent || be,
        t = e.keyframes ? sh(Ze(e.keyframes)) : Mt
      if (gt(e.inherit))
        for (; r; ) t(e, r.vars.defaults), (r = r.parent || r._dp)
      return e
    },
    oh = function (e, r) {
      for (var t = e.length, n = t === r.length; n && t-- && e[t] === r[t]; );
      return t < 0
    },
    Iu = function (e, r, t, n, i) {
      var o = e[n],
        a
      if (i) for (a = r[i]; o && o[i] > a; ) o = o._prev
      return (
        o
          ? ((r._next = o._next), (o._next = r))
          : ((r._next = e[t]), (e[t] = r)),
        r._next ? (r._next._prev = r) : (e[n] = r),
        (r._prev = o),
        (r.parent = r._dp = e),
        r
      )
    },
    ds = function (e, r, t, n) {
      t === void 0 && (t = '_first'), n === void 0 && (n = '_last')
      var i = r._prev,
        o = r._next
      i ? (i._next = o) : e[t] === r && (e[t] = o),
        o ? (o._prev = i) : e[n] === r && (e[n] = i),
        (r._next = r._prev = r.parent = null)
    },
    Ar = function (e, r) {
      e.parent &&
        (!r || e.parent.autoRemoveChildren) &&
        e.parent.remove &&
        e.parent.remove(e),
        (e._act = 0)
    },
    Qr = function (e, r) {
      if (e && (!r || r._end > e._dur || r._start < 0))
        for (var t = e; t; ) (t._dirty = 1), (t = t.parent)
      return e
    },
    ah = function (e) {
      for (var r = e.parent; r && r.parent; )
        (r._dirty = 1), r.totalDuration(), (r = r.parent)
      return e
    },
    Ro = function (e, r, t, n) {
      return (
        e._startAt &&
        (Ge
          ? e._startAt.revert(ls)
          : (e.vars.immediateRender && !e.vars.autoRevert) ||
            e._startAt.render(r, !0, n))
      )
    },
    uh = function s(e) {
      return !e || (e._ts && s(e.parent))
    },
    Fu = function (e) {
      return e._repeat ? Rn(e._tTime, (e = e.duration() + e._rDelay)) * e : 0
    },
    Rn = function (e, r) {
      var t = Math.floor((e /= r))
      return e && t === e ? t - 1 : t
    },
    ps = function (e, r) {
      return (
        (e - r._start) * r._ts +
        (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur)
      )
    },
    gs = function (e) {
      return (e._end = Ve(
        e._start + (e._tDur / Math.abs(e._ts || e._rts || Ke) || 0)
      ))
    },
    ms = function (e, r) {
      var t = e._dp
      return (
        t &&
          t.smoothChildTiming &&
          e._ts &&
          ((e._start = Ve(
            t._time -
              (e._ts > 0
                ? r / e._ts
                : ((e._dirty ? e.totalDuration() : e._tDur) - r) / -e._ts)
          )),
          gs(e),
          t._dirty || Qr(t, e)),
        e
      )
    },
    zu = function (e, r) {
      var t
      if (
        ((r._time ||
          (!r._dur && r._initted) ||
          (r._start < e._time && (r._dur || !r.add))) &&
          ((t = ps(e.rawTime(), r)),
          (!r._dur || pi(0, r.totalDuration(), t) - r._tTime > Ke) &&
            r.render(t, !0)),
        Qr(e, r)._dp && e._initted && e._time >= e._dur && e._ts)
      ) {
        if (e._dur < e.duration())
          for (t = e; t._dp; )
            t.rawTime() >= 0 && t.totalTime(t._tTime), (t = t._dp)
        e._zTime = -1e-8
      }
    },
    ir = function (e, r, t, n) {
      return (
        r.parent && Ar(r),
        (r._start = Ve(
          (mr(t) ? t : t || e !== be ? Dt(e, t, r) : e._time) + r._delay
        )),
        (r._end = Ve(
          r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0)
        )),
        Iu(e, r, '_first', '_last', e._sort ? '_start' : 0),
        Lo(r) || (e._recent = r),
        n || zu(e, r),
        e._ts < 0 && ms(e, e._tTime),
        e
      )
    },
    Vu = function (e, r) {
      return (
        (Tt.ScrollTrigger || Po('scrollTrigger', r)) &&
        Tt.ScrollTrigger.create(r, e)
      )
    },
    Nu = function (e, r, t, n, i) {
      if ((Yo(e, r, i), !e._initted)) return 1
      if (
        !t &&
        e._pt &&
        !Ge &&
        ((e._dur && e.vars.lazy !== !1) || (!e._dur && e.vars.lazy)) &&
        ku !== Et.frame
      )
        return Or.push(e), (e._lazy = [i, n]), 1
    },
    lh = function s(e) {
      var r = e.parent
      return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || s(r))
    },
    Lo = function (e) {
      var r = e.data
      return r === 'isFromStart' || r === 'isStart'
    },
    ch = function (e, r, t, n) {
      var i = e.ratio,
        o =
          r < 0 ||
          (!r &&
            ((!e._start && lh(e) && !(!e._initted && Lo(e))) ||
              ((e._ts < 0 || e._dp._ts < 0) && !Lo(e))))
            ? 0
            : 1,
        a = e._rDelay,
        u = 0,
        l,
        c,
        h
      if (
        (a &&
          e._repeat &&
          ((u = pi(0, e._tDur, r)),
          (c = Rn(u, a)),
          e._yoyo && c & 1 && (o = 1 - o),
          c !== Rn(e._tTime, a) &&
            ((i = 1 - o),
            e.vars.repeatRefresh && e._initted && e.invalidate())),
        o !== i || Ge || n || e._zTime === Ke || (!r && e._zTime))
      ) {
        if (!e._initted && Nu(e, r, n, t, u)) return
        for (
          h = e._zTime,
            e._zTime = r || (t ? Ke : 0),
            t || (t = r && !h),
            e.ratio = o,
            e._from && (o = 1 - o),
            e._time = 0,
            e._tTime = u,
            l = e._pt;
          l;

        )
          l.r(o, l.d), (l = l._next)
        r < 0 && Ro(e, r, t, !0),
          e._onUpdate && !t && Ct(e, 'onUpdate'),
          u && e._repeat && !t && e.parent && Ct(e, 'onRepeat'),
          (r >= e._tDur || r < 0) &&
            e.ratio === o &&
            (o && Ar(e, 1),
            !t &&
              !Ge &&
              (Ct(e, o ? 'onComplete' : 'onReverseComplete', !0),
              e._prom && e._prom()))
      } else e._zTime || (e._zTime = r)
    },
    fh = function (e, r, t) {
      var n
      if (t > r)
        for (n = e._first; n && n._start <= t; ) {
          if (n.data === 'isPause' && n._start > r) return n
          n = n._next
        }
      else
        for (n = e._last; n && n._start >= t; ) {
          if (n.data === 'isPause' && n._start < r) return n
          n = n._prev
        }
    },
    Ln = function (e, r, t, n) {
      var i = e._repeat,
        o = Ve(r) || 0,
        a = e._tTime / e._tDur
      return (
        a && !n && (e._time *= o / e._dur),
        (e._dur = o),
        (e._tDur = i ? (i < 0 ? 1e10 : Ve(o * (i + 1) + e._rDelay * i)) : o),
        a > 0 && !n && ms(e, (e._tTime = e._tDur * a)),
        e.parent && gs(e),
        t || Qr(e.parent, e),
        e
      )
    },
    Bu = function (e) {
      return e instanceof st ? Qr(e) : Ln(e, e._dur)
    },
    hh = { _start: 0, endTime: fi, totalDuration: fi },
    Dt = function s(e, r, t) {
      var n = e.labels,
        i = e._recent || hh,
        o = e.duration() >= tr ? i.endTime(!1) : e._dur,
        a,
        u,
        l
      return ze(r) && (isNaN(r) || r in n)
        ? ((u = r.charAt(0)),
          (l = r.substr(-1) === '%'),
          (a = r.indexOf('=')),
          u === '<' || u === '>'
            ? (a >= 0 && (r = r.replace(/=/, '')),
              (u === '<' ? i._start : i.endTime(i._repeat >= 0)) +
                (parseFloat(r.substr(1)) || 0) *
                  (l ? (a < 0 ? i : t).totalDuration() / 100 : 1))
            : a < 0
            ? (r in n || (n[r] = o), n[r])
            : ((u = parseFloat(r.charAt(a - 1) + r.substr(a + 1))),
              l && t && (u = (u / 100) * (Ze(t) ? t[0] : t).totalDuration()),
              a > 1 ? s(e, r.substr(0, a - 1), t) + u : o + u))
        : r == null
        ? o
        : +r
    },
    di = function (e, r, t) {
      var n = mr(r[1]),
        i = (n ? 2 : 1) + (e < 2 ? 0 : 1),
        o = r[i],
        a,
        u
      if ((n && (o.duration = r[1]), (o.parent = t), e)) {
        for (a = o, u = t; u && !('immediateRender' in a); )
          (a = u.vars.defaults || {}), (u = gt(u.vars.inherit) && u.parent)
        ;(o.immediateRender = gt(a.immediateRender)),
          e < 2 ? (o.runBackwards = 1) : (o.startAt = r[i - 1])
      }
      return new Me(r[0], o, r[i + 1])
    },
    Mr = function (e, r) {
      return e || e === 0 ? r(e) : r
    },
    pi = function (e, r, t) {
      return t < e ? e : t > r ? r : t
    },
    Qe = function (e, r) {
      return !ze(e) || !(r = th.exec(e)) ? '' : r[1]
    },
    dh = function (e, r, t) {
      return Mr(t, function (n) {
        return pi(e, r, n)
      })
    },
    Io = [].slice,
    qu = function (e, r) {
      return (
        e &&
        rr(e) &&
        'length' in e &&
        ((!r && !e.length) || (e.length - 1 in e && rr(e[0]))) &&
        !e.nodeType &&
        e !== nr
      )
    },
    ph = function (e, r, t) {
      return (
        t === void 0 && (t = []),
        e.forEach(function (n) {
          var i
          return (ze(n) && !r) || qu(n, 1)
            ? (i = t).push.apply(i, Rt(n))
            : t.push(n)
        }) || t
      )
    },
    Rt = function (e, r, t) {
      return ve && !r && ve.selector
        ? ve.selector(e)
        : ze(e) && !t && (Co || !Fn())
        ? Io.call((r || Eo).querySelectorAll(e), 0)
        : Ze(e)
        ? ph(e, t)
        : qu(e)
        ? Io.call(e, 0)
        : e
        ? [e]
        : []
    },
    Fo = function (e) {
      return (
        (e = Rt(e)[0] || ci('Invalid scope') || {}),
        function (r) {
          var t = e.current || e.nativeElement || e
          return Rt(
            r,
            t.querySelectorAll
              ? t
              : t === e
              ? ci('Invalid scope') || Eo.createElement('div')
              : e
          )
        }
      )
    },
    $u = function (e) {
      return e.sort(function () {
        return 0.5 - Math.random()
      })
    },
    Yu = function (e) {
      if (Se(e)) return e
      var r = rr(e) ? e : { each: e },
        t = Jr(r.ease),
        n = r.from || 0,
        i = parseFloat(r.base) || 0,
        o = {},
        a = n > 0 && n < 1,
        u = isNaN(n) || a,
        l = r.axis,
        c = n,
        h = n
      return (
        ze(n)
          ? (c = h = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
          : !a && u && ((c = n[0]), (h = n[1])),
        function (f, d, g) {
          var p = (g || r).length,
            m = o[p],
            _,
            v,
            y,
            b,
            T,
            S,
            w,
            P,
            E
          if (!m) {
            if (((E = r.grid === 'auto' ? 0 : (r.grid || [1, tr])[1]), !E)) {
              for (
                w = -1e8;
                w < (w = g[E++].getBoundingClientRect().left) && E < p;

              );
              E < p && E--
            }
            for (
              m = o[p] = [],
                _ = u ? Math.min(E, p) * c - 0.5 : n % E,
                v = E === tr ? 0 : u ? (p * h) / E - 0.5 : (n / E) | 0,
                w = 0,
                P = tr,
                S = 0;
              S < p;
              S++
            )
              (y = (S % E) - _),
                (b = v - ((S / E) | 0)),
                (m[S] = T =
                  l ? Math.abs(l === 'y' ? b : y) : bu(y * y + b * b)),
                T > w && (w = T),
                T < P && (P = T)
            n === 'random' && $u(m),
              (m.max = w - P),
              (m.min = P),
              (m.v = p =
                (parseFloat(r.amount) ||
                  parseFloat(r.each) *
                    (E > p
                      ? p - 1
                      : l
                      ? l === 'y'
                        ? p / E
                        : E
                      : Math.max(E, p / E)) ||
                  0) * (n === 'edges' ? -1 : 1)),
              (m.b = p < 0 ? i - p : i),
              (m.u = Qe(r.amount || r.each) || 0),
              (t = t && p < 0 ? tl(t) : t)
          }
          return (
            (p = (m[f] - m.min) / m.max || 0),
            Ve(m.b + (t ? t(p) : p) * m.v) + m.u
          )
        }
      )
    },
    zo = function (e) {
      var r = Math.pow(10, ((e + '').split('.')[1] || '').length)
      return function (t) {
        var n = Ve(Math.round(parseFloat(t) / e) * e * r)
        return (n - (n % 1)) / r + (mr(t) ? 0 : Qe(t))
      }
    },
    Hu = function (e, r) {
      var t = Ze(e),
        n,
        i
      return (
        !t &&
          rr(e) &&
          ((n = t = e.radius || tr),
          e.values
            ? ((e = Rt(e.values)), (i = !mr(e[0])) && (n *= n))
            : (e = zo(e.increment))),
        Mr(
          r,
          t
            ? Se(e)
              ? function (o) {
                  return (i = e(o)), Math.abs(i - o) <= n ? i : o
                }
              : function (o) {
                  for (
                    var a = parseFloat(i ? o.x : o),
                      u = parseFloat(i ? o.y : 0),
                      l = tr,
                      c = 0,
                      h = e.length,
                      f,
                      d;
                    h--;

                  )
                    i
                      ? ((f = e[h].x - a),
                        (d = e[h].y - u),
                        (f = f * f + d * d))
                      : (f = Math.abs(e[h] - a)),
                      f < l && ((l = f), (c = h))
                  return (
                    (c = !n || l <= n ? e[c] : o),
                    i || c === o || mr(o) ? c : c + Qe(o)
                  )
                }
            : zo(e)
        )
      )
    },
    Xu = function (e, r, t, n) {
      return Mr(Ze(e) ? !r : t === !0 ? !!(t = 0) : !n, function () {
        return Ze(e)
          ? e[~~(Math.random() * e.length)]
          : (t = t || 1e-5) &&
              (n = t < 1 ? Math.pow(10, (t + '').length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (e - t / 2 + Math.random() * (r - e + t * 0.99)) / t
                ) *
                  t *
                  n
              ) / n
      })
    },
    gh = function () {
      for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
        r[t] = arguments[t]
      return function (n) {
        return r.reduce(function (i, o) {
          return o(i)
        }, n)
      }
    },
    mh = function (e, r) {
      return function (t) {
        return e(parseFloat(t)) + (r || Qe(t))
      }
    },
    _h = function (e, r, t) {
      return ju(e, r, 0, 1, t)
    },
    Wu = function (e, r, t) {
      return Mr(t, function (n) {
        return e[~~r(n)]
      })
    },
    vh = function s(e, r, t) {
      var n = r - e
      return Ze(e)
        ? Wu(e, s(0, e.length), r)
        : Mr(t, function (i) {
            return ((n + ((i - e) % n)) % n) + e
          })
    },
    yh = function s(e, r, t) {
      var n = r - e,
        i = n * 2
      return Ze(e)
        ? Wu(e, s(0, e.length - 1), r)
        : Mr(t, function (o) {
            return (o = (i + ((o - e) % i)) % i || 0), e + (o > n ? i - o : o)
          })
    },
    gi = function (e) {
      for (var r = 0, t = '', n, i, o, a; ~(n = e.indexOf('random(', r)); )
        (o = e.indexOf(')', n)),
          (a = e.charAt(n + 7) === '['),
          (i = e.substr(n + 7, o - n - 7).match(a ? Su : To)),
          (t +=
            e.substr(r, n - r) +
            Xu(a ? i : +i[0], a ? 0 : +i[1], +i[2] || 1e-5)),
          (r = o + 1)
      return t + e.substr(r, e.length - r)
    },
    ju = function (e, r, t, n, i) {
      var o = r - e,
        a = n - t
      return Mr(i, function (u) {
        return t + (((u - e) / o) * a || 0)
      })
    },
    bh = function s(e, r, t, n) {
      var i = isNaN(e + r)
        ? 0
        : function (d) {
            return (1 - d) * e + d * r
          }
      if (!i) {
        var o = ze(e),
          a = {},
          u,
          l,
          c,
          h,
          f
        if ((t === !0 && (n = 1) && (t = null), o))
          (e = { p: e }), (r = { p: r })
        else if (Ze(e) && !Ze(r)) {
          for (c = [], h = e.length, f = h - 2, l = 1; l < h; l++)
            c.push(s(e[l - 1], e[l]))
          h--,
            (i = function (g) {
              g *= h
              var p = Math.min(f, ~~g)
              return c[p](g - p)
            }),
            (t = r)
        } else n || (e = Zr(Ze(e) ? [] : {}, e))
        if (!c) {
          for (u in r) qo.call(a, e, u, 'get', r[u])
          i = function (g) {
            return Wo(g, a) || (o ? e.p : e)
          }
        }
      }
      return Mr(t, i)
    },
    Uu = function (e, r, t) {
      var n = e.labels,
        i = tr,
        o,
        a,
        u
      for (o in n)
        (a = n[o] - r),
          a < 0 == !!t && a && i > (a = Math.abs(a)) && ((u = o), (i = a))
      return u
    },
    Ct = function (e, r, t) {
      var n = e.vars,
        i = n[r],
        o = ve,
        a = e._ctx,
        u,
        l,
        c
      if (i)
        return (
          (u = n[r + 'Params']),
          (l = n.callbackScope || e),
          t && Or.length && fs(),
          a && (ve = a),
          (c = u ? i.apply(l, u) : i.call(l)),
          (ve = o),
          c
        )
    },
    mi = function (e) {
      return (
        Ar(e),
        e.scrollTrigger && e.scrollTrigger.kill(!!Ge),
        e.progress() < 1 && Ct(e, 'onInterrupt'),
        e
      )
    },
    In,
    Gu = [],
    Ku = function (e) {
      if (e)
        if (((e = (!e.name && e.default) || e), xo() || e.headless)) {
          var r = e.name,
            t = Se(e),
            n =
              r && !t && e.init
                ? function () {
                    this._props = []
                  }
                : e,
            i = {
              init: fi,
              render: Wo,
              add: qo,
              kill: Fh,
              modifier: Ih,
              rawVars: 0,
            },
            o = {
              targetTest: 0,
              get: 0,
              getSetter: Xo,
              aliases: {},
              register: 0,
            }
          if ((Fn(), e !== n)) {
            if (St[r]) return
            Mt(n, Mt(hs(e, i), o)),
              Zr(n.prototype, Zr(i, hs(e, o))),
              (St[(n.prop = r)] = n),
              e.targetTest && (cs.push(n), (ko[r] = 1)),
              (r =
                (r === 'css'
                  ? 'CSS'
                  : r.charAt(0).toUpperCase() + r.substr(1)) + 'Plugin')
          }
          Pu(r, n), e.register && e.register(vt, n, _t)
        } else Gu.push(e)
    },
    de = 255,
    _i = {
      aqua: [0, de, de],
      lime: [0, de, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, de],
      navy: [0, 0, 128],
      white: [de, de, de],
      olive: [128, 128, 0],
      yellow: [de, de, 0],
      orange: [de, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [de, 0, 0],
      pink: [de, 192, 203],
      cyan: [0, de, de],
      transparent: [de, de, de, 0],
    },
    Vo = function (e, r, t) {
      return (
        (e += e < 0 ? 1 : e > 1 ? -1 : 0),
        ((e * 6 < 1
          ? r + (t - r) * e * 6
          : e < 0.5
          ? t
          : e * 3 < 2
          ? r + (t - r) * (2 / 3 - e) * 6
          : r) *
          de +
          0.5) |
          0
      )
    },
    Zu = function (e, r, t) {
      var n = e ? (mr(e) ? [e >> 16, (e >> 8) & de, e & de] : 0) : _i.black,
        i,
        o,
        a,
        u,
        l,
        c,
        h,
        f,
        d,
        g
      if (!n) {
        if ((e.substr(-1) === ',' && (e = e.substr(0, e.length - 1)), _i[e]))
          n = _i[e]
        else if (e.charAt(0) === '#') {
          if (
            (e.length < 6 &&
              ((i = e.charAt(1)),
              (o = e.charAt(2)),
              (a = e.charAt(3)),
              (e =
                '#' +
                i +
                i +
                o +
                o +
                a +
                a +
                (e.length === 5 ? e.charAt(4) + e.charAt(4) : ''))),
            e.length === 9)
          )
            return (
              (n = parseInt(e.substr(1, 6), 16)),
              [n >> 16, (n >> 8) & de, n & de, parseInt(e.substr(7), 16) / 255]
            )
          ;(e = parseInt(e.substr(1), 16)),
            (n = [e >> 16, (e >> 8) & de, e & de])
        } else if (e.substr(0, 3) === 'hsl') {
          if (((n = g = e.match(To)), !r))
            (u = (+n[0] % 360) / 360),
              (l = +n[1] / 100),
              (c = +n[2] / 100),
              (o = c <= 0.5 ? c * (l + 1) : c + l - c * l),
              (i = c * 2 - o),
              n.length > 3 && (n[3] *= 1),
              (n[0] = Vo(u + 1 / 3, i, o)),
              (n[1] = Vo(u, i, o)),
              (n[2] = Vo(u - 1 / 3, i, o))
          else if (~e.indexOf('='))
            return (n = e.match(xu)), t && n.length < 4 && (n[3] = 1), n
        } else n = e.match(To) || _i.transparent
        n = n.map(Number)
      }
      return (
        r &&
          !g &&
          ((i = n[0] / de),
          (o = n[1] / de),
          (a = n[2] / de),
          (h = Math.max(i, o, a)),
          (f = Math.min(i, o, a)),
          (c = (h + f) / 2),
          h === f
            ? (u = l = 0)
            : ((d = h - f),
              (l = c > 0.5 ? d / (2 - h - f) : d / (h + f)),
              (u =
                h === i
                  ? (o - a) / d + (o < a ? 6 : 0)
                  : h === o
                  ? (a - i) / d + 2
                  : (i - o) / d + 4),
              (u *= 60)),
          (n[0] = ~~(u + 0.5)),
          (n[1] = ~~(l * 100 + 0.5)),
          (n[2] = ~~(c * 100 + 0.5))),
        t && n.length < 4 && (n[3] = 1),
        n
      )
    },
    Qu = function (e) {
      var r = [],
        t = [],
        n = -1
      return (
        e.split(Dr).forEach(function (i) {
          var o = i.match(Mn) || []
          r.push.apply(r, o), t.push((n += o.length + 1))
        }),
        (r.c = t),
        r
      )
    },
    Ju = function (e, r, t) {
      var n = '',
        i = (e + n).match(Dr),
        o = r ? 'hsla(' : 'rgba(',
        a = 0,
        u,
        l,
        c,
        h
      if (!i) return e
      if (
        ((i = i.map(function (f) {
          return (
            (f = Zu(f, r, 1)) &&
            o +
              (r
                ? f[0] + ',' + f[1] + '%,' + f[2] + '%,' + f[3]
                : f.join(',')) +
              ')'
          )
        })),
        t && ((c = Qu(e)), (u = t.c), u.join(n) !== c.c.join(n)))
      )
        for (l = e.replace(Dr, '1').split(Mn), h = l.length - 1; a < h; a++)
          n +=
            l[a] +
            (~u.indexOf(a)
              ? i.shift() || o + '0,0,0,0)'
              : (c.length ? c : i.length ? i : t).shift())
      if (!l)
        for (l = e.split(Dr), h = l.length - 1; a < h; a++) n += l[a] + i[a]
      return n + l[h]
    },
    Dr = (function () {
      var s =
          '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b',
        e
      for (e in _i) s += '|' + e + '\\b'
      return new RegExp(s + ')', 'gi')
    })(),
    wh = /hsl[a]?\(/,
    el = function (e) {
      var r = e.join(' '),
        t
      if (((Dr.lastIndex = 0), Dr.test(r)))
        return (
          (t = wh.test(r)),
          (e[1] = Ju(e[1], t)),
          (e[0] = Ju(e[0], t, Qu(e[1]))),
          !0
        )
    },
    vi,
    Et = (function () {
      var s = Date.now,
        e = 500,
        r = 33,
        t = s(),
        n = t,
        i = 1e3 / 240,
        o = i,
        a = [],
        u,
        l,
        c,
        h,
        f,
        d,
        g = function p(m) {
          var _ = s() - n,
            v = m === !0,
            y,
            b,
            T,
            S
          if (
            ((_ > e || _ < 0) && (t += _ - r),
            (n += _),
            (T = n - t),
            (y = T - o),
            (y > 0 || v) &&
              ((S = ++h.frame),
              (f = T - h.time * 1e3),
              (h.time = T = T / 1e3),
              (o += y + (y >= i ? 4 : i - y)),
              (b = 1)),
            v || (u = l(p)),
            b)
          )
            for (d = 0; d < a.length; d++) a[d](T, f, S, m)
        }
      return (
        (h = {
          time: 0,
          frame: 0,
          tick: function () {
            g(!0)
          },
          deltaRatio: function (m) {
            return f / (1e3 / (m || 60))
          },
          wake: function () {
            Cu &&
              (!Co &&
                xo() &&
                ((nr = Co = window),
                (Eo = nr.document || {}),
                (Tt.gsap = vt),
                (nr.gsapVersions || (nr.gsapVersions = [])).push(vt.version),
                Eu(us || nr.GreenSockGlobals || (!nr.gsap && nr) || {}),
                Gu.forEach(Ku)),
              (c = typeof requestAnimationFrame < 'u' && requestAnimationFrame),
              u && h.sleep(),
              (l =
                c ||
                function (m) {
                  return setTimeout(m, (o - h.time * 1e3 + 1) | 0)
                }),
              (vi = 1),
              g(2))
          },
          sleep: function () {
            ;(c ? cancelAnimationFrame : clearTimeout)(u), (vi = 0), (l = fi)
          },
          lagSmoothing: function (m, _) {
            ;(e = m || 1 / 0), (r = Math.min(_ || 33, e))
          },
          fps: function (m) {
            ;(i = 1e3 / (m || 240)), (o = h.time * 1e3 + i)
          },
          add: function (m, _, v) {
            var y = _
              ? function (b, T, S, w) {
                  m(b, T, S, w), h.remove(y)
                }
              : m
            return h.remove(m), a[v ? 'unshift' : 'push'](y), Fn(), y
          },
          remove: function (m, _) {
            ~(_ = a.indexOf(m)) && a.splice(_, 1) && d >= _ && d--
          },
          _listeners: a,
        }),
        h
      )
    })(),
    Fn = function () {
      return !vi && Et.wake()
    },
    se = {},
    xh = /^[\d.\-M][\d.\-,\s]/,
    Th = /["']/g,
    Sh = function (e) {
      for (
        var r = {},
          t = e.substr(1, e.length - 3).split(':'),
          n = t[0],
          i = 1,
          o = t.length,
          a,
          u,
          l;
        i < o;
        i++
      )
        (u = t[i]),
          (a = i !== o - 1 ? u.lastIndexOf(',') : u.length),
          (l = u.substr(0, a)),
          (r[n] = isNaN(l) ? l.replace(Th, '').trim() : +l),
          (n = u.substr(a + 1).trim())
      return r
    },
    Ch = function (e) {
      var r = e.indexOf('(') + 1,
        t = e.indexOf(')'),
        n = e.indexOf('(', r)
      return e.substring(r, ~n && n < t ? e.indexOf(')', t + 1) : t)
    },
    Eh = function (e) {
      var r = (e + '').split('('),
        t = se[r[0]]
      return t && r.length > 1 && t.config
        ? t.config.apply(
            null,
            ~e.indexOf('{') ? [Sh(r[1])] : Ch(e).split(',').map(Du)
          )
        : se._CE && xh.test(e)
        ? se._CE('', e)
        : t
    },
    tl = function (e) {
      return function (r) {
        return 1 - e(1 - r)
      }
    },
    rl = function s(e, r) {
      for (var t = e._first, n; t; )
        t instanceof st
          ? s(t, r)
          : t.vars.yoyoEase &&
            (!t._yoyo || !t._repeat) &&
            t._yoyo !== r &&
            (t.timeline
              ? s(t.timeline, r)
              : ((n = t._ease),
                (t._ease = t._yEase),
                (t._yEase = n),
                (t._yoyo = r))),
          (t = t._next)
    },
    Jr = function (e, r) {
      return (e && (Se(e) ? e : se[e] || Eh(e))) || r
    },
    en = function (e, r, t, n) {
      t === void 0 &&
        (t = function (u) {
          return 1 - r(1 - u)
        }),
        n === void 0 &&
          (n = function (u) {
            return u < 0.5 ? r(u * 2) / 2 : 1 - r((1 - u) * 2) / 2
          })
      var i = { easeIn: r, easeOut: t, easeInOut: n },
        o
      return (
        mt(e, function (a) {
          ;(se[a] = Tt[a] = i), (se[(o = a.toLowerCase())] = t)
          for (var u in i)
            se[
              o + (u === 'easeIn' ? '.in' : u === 'easeOut' ? '.out' : '.inOut')
            ] = se[a + '.' + u] = i[u]
        }),
        i
      )
    },
    nl = function (e) {
      return function (r) {
        return r < 0.5 ? (1 - e(1 - r * 2)) / 2 : 0.5 + e((r - 0.5) * 2) / 2
      }
    },
    No = function s(e, r, t) {
      var n = r >= 1 ? r : 1,
        i = (t || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
        o = (i / bo) * (Math.asin(1 / n) || 0),
        a = function (c) {
          return c === 1 ? 1 : n * Math.pow(2, -10 * c) * eh((c - o) * i) + 1
        },
        u =
          e === 'out'
            ? a
            : e === 'in'
            ? function (l) {
                return 1 - a(1 - l)
              }
            : nl(a)
      return (
        (i = bo / i),
        (u.config = function (l, c) {
          return s(e, l, c)
        }),
        u
      )
    },
    Bo = function s(e, r) {
      r === void 0 && (r = 1.70158)
      var t = function (o) {
          return o ? --o * o * ((r + 1) * o + r) + 1 : 0
        },
        n =
          e === 'out'
            ? t
            : e === 'in'
            ? function (i) {
                return 1 - t(1 - i)
              }
            : nl(t)
      return (
        (n.config = function (i) {
          return s(e, i)
        }),
        n
      )
    }
  mt('Linear,Quad,Cubic,Quart,Quint,Strong', function (s, e) {
    var r = e < 5 ? e + 1 : e
    en(
      s + ',Power' + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r)
          }
        : function (t) {
            return t
          },
      function (t) {
        return 1 - Math.pow(1 - t, r)
      },
      function (t) {
        return t < 0.5
          ? Math.pow(t * 2, r) / 2
          : 1 - Math.pow((1 - t) * 2, r) / 2
      }
    )
  }),
    (se.Linear.easeNone = se.none = se.Linear.easeIn),
    en('Elastic', No('in'), No('out'), No()),
    (function (s, e) {
      var r = 1 / e,
        t = 2 * r,
        n = 2.5 * r,
        i = function (a) {
          return a < r
            ? s * a * a
            : a < t
            ? s * Math.pow(a - 1.5 / e, 2) + 0.75
            : a < n
            ? s * (a -= 2.25 / e) * a + 0.9375
            : s * Math.pow(a - 2.625 / e, 2) + 0.984375
        }
      en(
        'Bounce',
        function (o) {
          return 1 - i(1 - o)
        },
        i
      )
    })(7.5625, 2.75),
    en('Expo', function (s) {
      return s ? Math.pow(2, 10 * (s - 1)) : 0
    }),
    en('Circ', function (s) {
      return -(bu(1 - s * s) - 1)
    }),
    en('Sine', function (s) {
      return s === 1 ? 1 : -Jf(s * Zf) + 1
    }),
    en('Back', Bo('in'), Bo('out'), Bo()),
    (se.SteppedEase =
      se.steps =
      Tt.SteppedEase =
        {
          config: function (e, r) {
            e === void 0 && (e = 1)
            var t = 1 / e,
              n = e + (r ? 0 : 1),
              i = r ? 1 : 0,
              o = 1 - Ke
            return function (a) {
              return (((n * pi(0, o, a)) | 0) + i) * t
            }
          },
        }),
    (An.ease = se['quad.out']),
    mt(
      'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
      function (s) {
        return (Mo += s + ',' + s + 'Params,')
      }
    )
  var il = function (e, r) {
      ;(this.id = Qf++),
        (e._gsap = this),
        (this.target = e),
        (this.harness = r),
        (this.get = r ? r.get : Au),
        (this.set = r ? r.getSetter : Xo)
    },
    yi = (function () {
      function s(r) {
        ;(this.vars = r),
          (this._delay = +r.delay || 0),
          (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) &&
            ((this._rDelay = r.repeatDelay || 0),
            (this._yoyo = !!r.yoyo || !!r.yoyoEase)),
          (this._ts = 1),
          Ln(this, +r.duration, 1, 1),
          (this.data = r.data),
          ve && ((this._ctx = ve), ve.data.push(this)),
          vi || Et.wake()
      }
      var e = s.prototype
      return (
        (e.delay = function (t) {
          return t || t === 0
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
              )
            : this.totalDuration() && this._dur
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              Ln(
                this,
                this._repeat < 0
                  ? t
                  : (t - this._repeat * this._rDelay) / (this._repeat + 1)
              ))
            : this._tDur
        }),
        (e.totalTime = function (t, n) {
          if ((Fn(), !arguments.length)) return this._tTime
          var i = this._dp
          if (i && i.smoothChildTiming && this._ts) {
            for (
              ms(this, t), !i._dp || i.parent || zu(i, this);
              i && i.parent;

            )
              i.parent._time !==
                i._start +
                  (i._ts >= 0
                    ? i._tTime / i._ts
                    : (i.totalDuration() - i._tTime) / -i._ts) &&
                i.totalTime(i._tTime, !0),
                (i = i.parent)
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && t < this._tDur) ||
                (this._ts < 0 && t > 0) ||
                (!this._tDur && !t)) &&
              ir(this._dp, this, this._start - this._delay)
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !n) ||
              (this._initted && Math.abs(this._zTime) === Ke) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), Mu(this, t, n)),
            this
          )
        }),
        (e.time = function (t, n) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + Fu(this)) %
                  (this._dur + this._rDelay) || (t ? this._dur : 0),
                n
              )
            : this._time
        }),
        (e.totalProgress = function (t, n) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, n)
            : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.rawTime() > 0
            ? 1
            : 0
        }),
        (e.progress = function (t, n) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (this._yoyo && !(this.iteration() & 1) ? 1 - t : t) +
                  Fu(this),
                n
              )
            : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.rawTime() > 0
            ? 1
            : 0
        }),
        (e.iteration = function (t, n) {
          var i = this.duration() + this._rDelay
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * i, n)
            : this._repeat
            ? Rn(this._tTime, i) + 1
            : 1
        }),
        (e.timeScale = function (t, n) {
          if (!arguments.length) return this._rts === -1e-8 ? 0 : this._rts
          if (this._rts === t) return this
          var i =
            this.parent && this._ts ? ps(this.parent._time, this) : this._tTime
          return (
            (this._rts = +t || 0),
            (this._ts = this._ps || t === -1e-8 ? 0 : this._rts),
            this.totalTime(pi(-Math.abs(this._delay), this._tDur, i), n !== !1),
            gs(this),
            ah(this)
          )
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t),
                t
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (Fn(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      this.progress() === 1 &&
                        Math.abs(this._zTime) !== Ke &&
                        (this._tTime -= Ke)
                    ))),
              this)
            : this._ps
        }),
        (e.startTime = function (t) {
          if (arguments.length) {
            this._start = t
            var n = this.parent || this._dp
            return (
              n && (n._sort || !this.parent) && ir(n, this, t - this._delay),
              this
            )
          }
          return this._start
        }),
        (e.endTime = function (t) {
          return (
            this._start +
            (gt(t) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          )
        }),
        (e.rawTime = function (t) {
          var n = this.parent || this._dp
          return n
            ? t &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
              ? ps(n.rawTime(t), this)
              : this._tTime
            : this._tTime
        }),
        (e.revert = function (t) {
          t === void 0 && (t = nh)
          var n = Ge
          return (
            (Ge = t),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(t),
              this.totalTime(-0.01, t.suppressEvents)),
            this.data !== 'nested' && t.kill !== !1 && this.kill(),
            (Ge = n),
            this
          )
        }),
        (e.globalTime = function (t) {
          for (var n = this, i = arguments.length ? t : n.rawTime(); n; )
            (i = n._start + i / (Math.abs(n._ts) || 1)), (n = n._dp)
          return !this.parent && this._sat ? this._sat.globalTime(t) : i
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t === 1 / 0 ? -2 : t), Bu(this))
            : this._repeat === -2
            ? 1 / 0
            : this._repeat
        }),
        (e.repeatDelay = function (t) {
          if (arguments.length) {
            var n = this._time
            return (this._rDelay = t), Bu(this), n ? this.time(n) : this
          }
          return this._rDelay
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo
        }),
        (e.seek = function (t, n) {
          return this.totalTime(Dt(this, t), gt(n))
        }),
        (e.restart = function (t, n) {
          return this.play().totalTime(t ? -this._delay : 0, gt(n))
        }),
        (e.play = function (t, n) {
          return t != null && this.seek(t, n), this.reversed(!1).paused(!1)
        }),
        (e.reverse = function (t, n) {
          return (
            t != null && this.seek(t || this.totalDuration(), n),
            this.reversed(!0).paused(!1)
          )
        }),
        (e.pause = function (t, n) {
          return t != null && this.seek(t, n), this.paused(!0)
        }),
        (e.resume = function () {
          return this.paused(!1)
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() &&
                this.timeScale(-this._rts || (t ? -1e-8 : 0)),
              this)
            : this._rts < 0
        }),
        (e.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -1e-8), this
        }),
        (e.isActive = function () {
          var t = this.parent || this._dp,
            n = this._start,
            i
          return !!(
            !t ||
            (this._ts &&
              this._initted &&
              t.isActive() &&
              (i = t.rawTime(!0)) >= n &&
              i < this.endTime(!0) - Ke)
          )
        }),
        (e.eventCallback = function (t, n, i) {
          var o = this.vars
          return arguments.length > 1
            ? (n
                ? ((o[t] = n),
                  i && (o[t + 'Params'] = i),
                  t === 'onUpdate' && (this._onUpdate = n))
                : delete o[t],
              this)
            : o[t]
        }),
        (e.then = function (t) {
          var n = this
          return new Promise(function (i) {
            var o = Se(t) ? t : Ru,
              a = function () {
                var l = n.then
                ;(n.then = null),
                  Se(o) && (o = o(n)) && (o.then || o === n) && (n.then = l),
                  i(o),
                  (n.then = l)
              }
            ;(n._initted && n.totalProgress() === 1 && n._ts >= 0) ||
            (!n._tTime && n._ts < 0)
              ? a()
              : (n._prom = a)
          })
        }),
        (e.kill = function () {
          mi(this)
        }),
        s
      )
    })()
  Mt(yi.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  })
  var st = (function (s) {
    yu(e, s)
    function e(t, n) {
      var i
      return (
        t === void 0 && (t = {}),
        (i = s.call(this, t) || this),
        (i.labels = {}),
        (i.smoothChildTiming = !!t.smoothChildTiming),
        (i.autoRemoveChildren = !!t.autoRemoveChildren),
        (i._sort = gt(t.sortChildren)),
        be && ir(t.parent || be, gr(i), n),
        t.reversed && i.reverse(),
        t.paused && i.paused(!0),
        t.scrollTrigger && Vu(gr(i), t.scrollTrigger),
        i
      )
    }
    var r = e.prototype
    return (
      (r.to = function (n, i, o) {
        return di(0, arguments, this), this
      }),
      (r.from = function (n, i, o) {
        return di(1, arguments, this), this
      }),
      (r.fromTo = function (n, i, o, a) {
        return di(2, arguments, this), this
      }),
      (r.set = function (n, i, o) {
        return (
          (i.duration = 0),
          (i.parent = this),
          hi(i).repeatDelay || (i.repeat = 0),
          (i.immediateRender = !!i.immediateRender),
          new Me(n, i, Dt(this, o), 1),
          this
        )
      }),
      (r.call = function (n, i, o) {
        return ir(this, Me.delayedCall(0, n, i), o)
      }),
      (r.staggerTo = function (n, i, o, a, u, l, c) {
        return (
          (o.duration = i),
          (o.stagger = o.stagger || a),
          (o.onComplete = l),
          (o.onCompleteParams = c),
          (o.parent = this),
          new Me(n, o, Dt(this, u)),
          this
        )
      }),
      (r.staggerFrom = function (n, i, o, a, u, l, c) {
        return (
          (o.runBackwards = 1),
          (hi(o).immediateRender = gt(o.immediateRender)),
          this.staggerTo(n, i, o, a, u, l, c)
        )
      }),
      (r.staggerFromTo = function (n, i, o, a, u, l, c, h) {
        return (
          (a.startAt = o),
          (hi(a).immediateRender = gt(a.immediateRender)),
          this.staggerTo(n, i, a, u, l, c, h)
        )
      }),
      (r.render = function (n, i, o) {
        var a = this._time,
          u = this._dirty ? this.totalDuration() : this._tDur,
          l = this._dur,
          c = n <= 0 ? 0 : Ve(n),
          h = this._zTime < 0 != n < 0 && (this._initted || !l),
          f,
          d,
          g,
          p,
          m,
          _,
          v,
          y,
          b,
          T,
          S,
          w
        if (
          (this !== be && c > u && n >= 0 && (c = u),
          c !== this._tTime || o || h)
        ) {
          if (
            (a !== this._time &&
              l &&
              ((c += this._time - a), (n += this._time - a)),
            (f = c),
            (b = this._start),
            (y = this._ts),
            (_ = !y),
            h && (l || (a = this._zTime), (n || !i) && (this._zTime = n)),
            this._repeat)
          ) {
            if (
              ((S = this._yoyo),
              (m = l + this._rDelay),
              this._repeat < -1 && n < 0)
            )
              return this.totalTime(m * 100 + n, i, o)
            if (
              ((f = Ve(c % m)),
              c === u
                ? ((p = this._repeat), (f = l))
                : ((p = ~~(c / m)),
                  p && p === c / m && ((f = l), p--),
                  f > l && (f = l)),
              (T = Rn(this._tTime, m)),
              !a &&
                this._tTime &&
                T !== p &&
                this._tTime - T * m - this._dur <= 0 &&
                (T = p),
              S && p & 1 && ((f = l - f), (w = 1)),
              p !== T && !this._lock)
            ) {
              var P = S && T & 1,
                E = P === (S && p & 1)
              if (
                (p < T && (P = !P),
                (a = P ? 0 : c % l ? l : c),
                (this._lock = 1),
                (this.render(a || (w ? 0 : Ve(p * m)), i, !l)._lock = 0),
                (this._tTime = c),
                !i && this.parent && Ct(this, 'onRepeat'),
                this.vars.repeatRefresh && !w && (this.invalidate()._lock = 1),
                (a && a !== this._time) ||
                  _ !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this
              if (
                ((l = this._dur),
                (u = this._tDur),
                E &&
                  ((this._lock = 2),
                  (a = P ? l : -1e-4),
                  this.render(a, !0),
                  this.vars.repeatRefresh && !w && this.invalidate()),
                (this._lock = 0),
                !this._ts && !_)
              )
                return this
              rl(this, w)
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((v = fh(this, Ve(a), Ve(f))), v && (c -= f - (f = v._start))),
            (this._tTime = c),
            (this._time = f),
            (this._act = !y),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = n),
              (a = 0)),
            !a && f && !i && !p && (Ct(this, 'onStart'), this._tTime !== c))
          )
            return this
          if (f >= a && n >= 0)
            for (d = this._first; d; ) {
              if (
                ((g = d._next), (d._act || f >= d._start) && d._ts && v !== d)
              ) {
                if (d.parent !== this) return this.render(n, i, o)
                if (
                  (d.render(
                    d._ts > 0
                      ? (f - d._start) * d._ts
                      : (d._dirty ? d.totalDuration() : d._tDur) +
                          (f - d._start) * d._ts,
                    i,
                    o
                  ),
                  f !== this._time || (!this._ts && !_))
                ) {
                  ;(v = 0), g && (c += this._zTime = -1e-8)
                  break
                }
              }
              d = g
            }
          else {
            d = this._last
            for (var C = n < 0 ? n : f; d; ) {
              if (
                ((g = d._prev), (d._act || C <= d._end) && d._ts && v !== d)
              ) {
                if (d.parent !== this) return this.render(n, i, o)
                if (
                  (d.render(
                    d._ts > 0
                      ? (C - d._start) * d._ts
                      : (d._dirty ? d.totalDuration() : d._tDur) +
                          (C - d._start) * d._ts,
                    i,
                    o || (Ge && (d._initted || d._startAt))
                  ),
                  f !== this._time || (!this._ts && !_))
                ) {
                  ;(v = 0), g && (c += this._zTime = C ? -1e-8 : Ke)
                  break
                }
              }
              d = g
            }
          }
          if (
            v &&
            !i &&
            (this.pause(),
            (v.render(f >= a ? 0 : -1e-8)._zTime = f >= a ? 1 : -1),
            this._ts)
          )
            return (this._start = b), gs(this), this.render(n, i, o)
          this._onUpdate && !i && Ct(this, 'onUpdate', !0),
            ((c === u && this._tTime >= this.totalDuration()) || (!c && a)) &&
              (b === this._start || Math.abs(y) !== Math.abs(this._ts)) &&
              (this._lock ||
                ((n || !l) &&
                  ((c === u && this._ts > 0) || (!c && this._ts < 0)) &&
                  Ar(this, 1),
                !i &&
                  !(n < 0 && !a) &&
                  (c || a || !u) &&
                  (Ct(
                    this,
                    c === u && n >= 0 ? 'onComplete' : 'onReverseComplete',
                    !0
                  ),
                  this._prom &&
                    !(c < u && this.timeScale() > 0) &&
                    this._prom())))
        }
        return this
      }),
      (r.add = function (n, i) {
        var o = this
        if ((mr(i) || (i = Dt(this, i, n)), !(n instanceof yi))) {
          if (Ze(n))
            return (
              n.forEach(function (a) {
                return o.add(a, i)
              }),
              this
            )
          if (ze(n)) return this.addLabel(n, i)
          if (Se(n)) n = Me.delayedCall(0, n)
          else return this
        }
        return this !== n ? ir(this, n, i) : this
      }),
      (r.getChildren = function (n, i, o, a) {
        n === void 0 && (n = !0),
          i === void 0 && (i = !0),
          o === void 0 && (o = !0),
          a === void 0 && (a = -1e8)
        for (var u = [], l = this._first; l; )
          l._start >= a &&
            (l instanceof Me
              ? i && u.push(l)
              : (o && u.push(l),
                n && u.push.apply(u, l.getChildren(!0, i, o)))),
            (l = l._next)
        return u
      }),
      (r.getById = function (n) {
        for (var i = this.getChildren(1, 1, 1), o = i.length; o--; )
          if (i[o].vars.id === n) return i[o]
      }),
      (r.remove = function (n) {
        return ze(n)
          ? this.removeLabel(n)
          : Se(n)
          ? this.killTweensOf(n)
          : (ds(this, n),
            n === this._recent && (this._recent = this._last),
            Qr(this))
      }),
      (r.totalTime = function (n, i) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = Ve(
                Et.time -
                  (this._ts > 0
                    ? n / this._ts
                    : (this.totalDuration() - n) / -this._ts)
              )),
            s.prototype.totalTime.call(this, n, i),
            (this._forcing = 0),
            this)
          : this._tTime
      }),
      (r.addLabel = function (n, i) {
        return (this.labels[n] = Dt(this, i)), this
      }),
      (r.removeLabel = function (n) {
        return delete this.labels[n], this
      }),
      (r.addPause = function (n, i, o) {
        var a = Me.delayedCall(0, i || fi, o)
        return (
          (a.data = 'isPause'), (this._hasPause = 1), ir(this, a, Dt(this, n))
        )
      }),
      (r.removePause = function (n) {
        var i = this._first
        for (n = Dt(this, n); i; )
          i._start === n && i.data === 'isPause' && Ar(i), (i = i._next)
      }),
      (r.killTweensOf = function (n, i, o) {
        for (var a = this.getTweensOf(n, o), u = a.length; u--; )
          Rr !== a[u] && a[u].kill(n, i)
        return this
      }),
      (r.getTweensOf = function (n, i) {
        for (var o = [], a = Rt(n), u = this._first, l = mr(i), c; u; )
          u instanceof Me
            ? ih(u._targets, a) &&
              (l
                ? (!Rr || (u._initted && u._ts)) &&
                  u.globalTime(0) <= i &&
                  u.globalTime(u.totalDuration()) > i
                : !i || u.isActive()) &&
              o.push(u)
            : (c = u.getTweensOf(a, i)).length && o.push.apply(o, c),
            (u = u._next)
        return o
      }),
      (r.tweenTo = function (n, i) {
        i = i || {}
        var o = this,
          a = Dt(o, n),
          u = i,
          l = u.startAt,
          c = u.onStart,
          h = u.onStartParams,
          f = u.immediateRender,
          d,
          g = Me.to(
            o,
            Mt(
              {
                ease: i.ease || 'none',
                lazy: !1,
                immediateRender: !1,
                time: a,
                overwrite: 'auto',
                duration:
                  i.duration ||
                  Math.abs(
                    (a - (l && 'time' in l ? l.time : o._time)) / o.timeScale()
                  ) ||
                  Ke,
                onStart: function () {
                  if ((o.pause(), !d)) {
                    var m =
                      i.duration ||
                      Math.abs(
                        (a - (l && 'time' in l ? l.time : o._time)) /
                          o.timeScale()
                      )
                    g._dur !== m && Ln(g, m, 0, 1).render(g._time, !0, !0),
                      (d = 1)
                  }
                  c && c.apply(g, h || [])
                },
              },
              i
            )
          )
        return f ? g.render(0) : g
      }),
      (r.tweenFromTo = function (n, i, o) {
        return this.tweenTo(i, Mt({ startAt: { time: Dt(this, n) } }, o))
      }),
      (r.recent = function () {
        return this._recent
      }),
      (r.nextLabel = function (n) {
        return n === void 0 && (n = this._time), Uu(this, Dt(this, n))
      }),
      (r.previousLabel = function (n) {
        return n === void 0 && (n = this._time), Uu(this, Dt(this, n), 1)
      }),
      (r.currentLabel = function (n) {
        return arguments.length
          ? this.seek(n, !0)
          : this.previousLabel(this._time + Ke)
      }),
      (r.shiftChildren = function (n, i, o) {
        o === void 0 && (o = 0)
        for (var a = this._first, u = this.labels, l; a; )
          a._start >= o && ((a._start += n), (a._end += n)), (a = a._next)
        if (i) for (l in u) u[l] >= o && (u[l] += n)
        return Qr(this)
      }),
      (r.invalidate = function (n) {
        var i = this._first
        for (this._lock = 0; i; ) i.invalidate(n), (i = i._next)
        return s.prototype.invalidate.call(this, n)
      }),
      (r.clear = function (n) {
        n === void 0 && (n = !0)
        for (var i = this._first, o; i; ) (o = i._next), this.remove(i), (i = o)
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          n && (this.labels = {}),
          Qr(this)
        )
      }),
      (r.totalDuration = function (n) {
        var i = 0,
          o = this,
          a = o._last,
          u = tr,
          l,
          c,
          h
        if (arguments.length)
          return o.timeScale(
            (o._repeat < 0 ? o.duration() : o.totalDuration()) /
              (o.reversed() ? -n : n)
          )
        if (o._dirty) {
          for (h = o.parent; a; )
            (l = a._prev),
              a._dirty && a.totalDuration(),
              (c = a._start),
              c > u && o._sort && a._ts && !o._lock
                ? ((o._lock = 1), (ir(o, a, c - a._delay, 1)._lock = 0))
                : (u = c),
              c < 0 &&
                a._ts &&
                ((i -= c),
                ((!h && !o._dp) || (h && h.smoothChildTiming)) &&
                  ((o._start += c / o._ts), (o._time -= c), (o._tTime -= c)),
                o.shiftChildren(-c, !1, -1 / 0),
                (u = 0)),
              a._end > i && a._ts && (i = a._end),
              (a = l)
          Ln(o, o === be && o._time > i ? o._time : i, 1, 1), (o._dirty = 0)
        }
        return o._tDur
      }),
      (e.updateRoot = function (n) {
        if ((be._ts && (Mu(be, ps(n, be)), (ku = Et.frame)), Et.frame >= Ou)) {
          Ou += xt.autoSleep || 120
          var i = be._first
          if ((!i || !i._ts) && xt.autoSleep && Et._listeners.length < 2) {
            for (; i && !i._ts; ) i = i._next
            i || Et.sleep()
          }
        }
      }),
      e
    )
  })(yi)
  Mt(st.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 })
  var Ph = function (e, r, t, n, i, o, a) {
      var u = new _t(this._pt, e, r, 0, 1, cl, null, i),
        l = 0,
        c = 0,
        h,
        f,
        d,
        g,
        p,
        m,
        _,
        v
      for (
        u.b = t,
          u.e = n,
          t += '',
          n += '',
          (_ = ~n.indexOf('random(')) && (n = gi(n)),
          o && ((v = [t, n]), o(v, e, r), (t = v[0]), (n = v[1])),
          f = t.match(So) || [];
        (h = So.exec(n));

      )
        (g = h[0]),
          (p = n.substring(l, h.index)),
          d ? (d = (d + 1) % 5) : p.substr(-5) === 'rgba(' && (d = 1),
          g !== f[c++] &&
            ((m = parseFloat(f[c - 1]) || 0),
            (u._pt = {
              _next: u._pt,
              p: p || c === 1 ? p : ',',
              s: m,
              c: g.charAt(1) === '=' ? Dn(m, g) - m : parseFloat(g) - m,
              m: d && d < 4 ? Math.round : 0,
            }),
            (l = So.lastIndex))
      return (
        (u.c = l < n.length ? n.substring(l, n.length) : ''),
        (u.fp = a),
        (Tu.test(n) || _) && (u.e = 0),
        (this._pt = u),
        u
      )
    },
    qo = function (e, r, t, n, i, o, a, u, l, c) {
      Se(n) && (n = n(i || 0, e, o))
      var h = e[r],
        f =
          t !== 'get'
            ? t
            : Se(h)
            ? l
              ? e[
                  r.indexOf('set') || !Se(e['get' + r.substr(3)])
                    ? r
                    : 'get' + r.substr(3)
                ](l)
              : e[r]()
            : h,
        d = Se(h) ? (l ? Dh : ul) : Ho,
        g
      if (
        (ze(n) &&
          (~n.indexOf('random(') && (n = gi(n)),
          n.charAt(1) === '=' &&
            ((g = Dn(f, n) + (Qe(f) || 0)), (g || g === 0) && (n = g))),
        !c || f !== n || $o)
      )
        return !isNaN(f * n) && n !== ''
          ? ((g = new _t(
              this._pt,
              e,
              r,
              +f || 0,
              n - (f || 0),
              typeof h == 'boolean' ? Lh : ll,
              0,
              d
            )),
            l && (g.fp = l),
            a && g.modifier(a, this, e),
            (this._pt = g))
          : (!h && !(r in e) && Po(r, n),
            Ph.call(this, e, r, f, n, d, u || xt.stringFilter, l))
    },
    kh = function (e, r, t, n, i) {
      if (
        (Se(e) && (e = bi(e, i, r, t, n)),
        !rr(e) || (e.style && e.nodeType) || Ze(e) || wu(e))
      )
        return ze(e) ? bi(e, i, r, t, n) : e
      var o = {},
        a
      for (a in e) o[a] = bi(e[a], i, r, t, n)
      return o
    },
    sl = function (e, r, t, n, i, o) {
      var a, u, l, c
      if (
        St[e] &&
        (a = new St[e]()).init(
          i,
          a.rawVars ? r[e] : kh(r[e], n, i, o, t),
          t,
          n,
          o
        ) !== !1 &&
        ((t._pt = u = new _t(t._pt, i, e, 0, 1, a.render, a, 0, a.priority)),
        t !== In)
      )
        for (l = t._ptLookup[t._targets.indexOf(i)], c = a._props.length; c--; )
          l[a._props[c]] = u
      return a
    },
    Rr,
    $o,
    Yo = function s(e, r, t) {
      var n = e.vars,
        i = n.ease,
        o = n.startAt,
        a = n.immediateRender,
        u = n.lazy,
        l = n.onUpdate,
        c = n.runBackwards,
        h = n.yoyoEase,
        f = n.keyframes,
        d = n.autoRevert,
        g = e._dur,
        p = e._startAt,
        m = e._targets,
        _ = e.parent,
        v = _ && _.data === 'nested' ? _.vars.targets : m,
        y = e._overwrite === 'auto' && !yo,
        b = e.timeline,
        T,
        S,
        w,
        P,
        E,
        C,
        L,
        k,
        R,
        A,
        O,
        D,
        I
      if (
        (b && (!f || !i) && (i = 'none'),
        (e._ease = Jr(i, An.ease)),
        (e._yEase = h ? tl(Jr(h === !0 ? i : h, An.ease)) : 0),
        h &&
          e._yoyo &&
          !e._repeat &&
          ((h = e._yEase), (e._yEase = e._ease), (e._ease = h)),
        (e._from = !b && !!n.runBackwards),
        !b || (f && !n.stagger))
      ) {
        if (
          ((k = m[0] ? Kr(m[0]).harness : 0),
          (D = k && n[k.prop]),
          (T = hs(n, ko)),
          p &&
            (p._zTime < 0 && p.progress(1),
            r < 0 && c && a && !d
              ? p.render(-1, !0)
              : p.revert(c && g ? ls : rh),
            (p._lazy = 0)),
          o)
        ) {
          if (
            (Ar(
              (e._startAt = Me.set(
                m,
                Mt(
                  {
                    data: 'isStart',
                    overwrite: !1,
                    parent: _,
                    immediateRender: !0,
                    lazy: !p && gt(u),
                    startAt: null,
                    delay: 0,
                    onUpdate:
                      l &&
                      function () {
                        return Ct(e, 'onUpdate')
                      },
                    stagger: 0,
                  },
                  o
                )
              ))
            ),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (Ge || (!a && !d)) && e._startAt.revert(ls),
            a && g && r <= 0 && t <= 0)
          ) {
            r && (e._zTime = r)
            return
          }
        } else if (c && g && !p) {
          if (
            (r && (a = !1),
            (w = Mt(
              {
                overwrite: !1,
                data: 'isFromStart',
                lazy: a && !p && gt(u),
                immediateRender: a,
                stagger: 0,
                parent: _,
              },
              T
            )),
            D && (w[k.prop] = D),
            Ar((e._startAt = Me.set(m, w))),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            r < 0 && (Ge ? e._startAt.revert(ls) : e._startAt.render(-1, !0)),
            (e._zTime = r),
            !a)
          )
            s(e._startAt, Ke, Ke)
          else if (!r) return
        }
        for (
          e._pt = e._ptCache = 0, u = (g && gt(u)) || (u && !g), S = 0;
          S < m.length;
          S++
        ) {
          if (
            ((E = m[S]),
            (L = E._gsap || Do(m)[S]._gsap),
            (e._ptLookup[S] = A = {}),
            Oo[L.id] && Or.length && fs(),
            (O = v === m ? S : v.indexOf(E)),
            k &&
              (R = new k()).init(E, D || T, e, O, v) !== !1 &&
              ((e._pt = P =
                new _t(e._pt, E, R.name, 0, 1, R.render, R, 0, R.priority)),
              R._props.forEach(function (F) {
                A[F] = P
              }),
              R.priority && (C = 1)),
            !k || D)
          )
            for (w in T)
              St[w] && (R = sl(w, T, e, O, E, v))
                ? R.priority && (C = 1)
                : (A[w] = P =
                    qo.call(e, E, w, 'get', T[w], O, v, 0, n.stringFilter))
          e._op && e._op[S] && e.kill(E, e._op[S]),
            y &&
              e._pt &&
              ((Rr = e),
              be.killTweensOf(E, A, e.globalTime(r)),
              (I = !e.parent),
              (Rr = 0)),
            e._pt && u && (Oo[L.id] = 1)
        }
        C && fl(e), e._onInit && e._onInit(e)
      }
      ;(e._onUpdate = l),
        (e._initted = (!e._op || e._pt) && !I),
        f && r <= 0 && b.render(tr, !0, !0)
    },
    Oh = function (e, r, t, n, i, o, a, u) {
      var l = ((e._pt && e._ptCache) || (e._ptCache = {}))[r],
        c,
        h,
        f,
        d
      if (!l)
        for (
          l = e._ptCache[r] = [], f = e._ptLookup, d = e._targets.length;
          d--;

        ) {
          if (((c = f[d][r]), c && c.d && c.d._pt))
            for (c = c.d._pt; c && c.p !== r && c.fp !== r; ) c = c._next
          if (!c)
            return (
              ($o = 1),
              (e.vars[r] = '+=0'),
              Yo(e, a),
              ($o = 0),
              u ? ci(r + ' not eligible for reset') : 1
            )
          l.push(c)
        }
      for (d = l.length; d--; )
        (h = l[d]),
          (c = h._pt || h),
          (c.s = (n || n === 0) && !i ? n : c.s + (n || 0) + o * c.c),
          (c.c = t - c.s),
          h.e && (h.e = Ee(t) + Qe(h.e)),
          h.b && (h.b = c.s + Qe(h.b))
    },
    Ah = function (e, r) {
      var t = e[0] ? Kr(e[0]).harness : 0,
        n = t && t.aliases,
        i,
        o,
        a,
        u
      if (!n) return r
      i = Zr({}, r)
      for (o in n)
        if (o in i)
          for (u = n[o].split(','), a = u.length; a--; ) i[u[a]] = i[o]
      return i
    },
    Mh = function (e, r, t, n) {
      var i = r.ease || n || 'power1.inOut',
        o,
        a
      if (Ze(r))
        (a = t[e] || (t[e] = [])),
          r.forEach(function (u, l) {
            return a.push({ t: (l / (r.length - 1)) * 100, v: u, e: i })
          })
      else
        for (o in r)
          (a = t[o] || (t[o] = [])),
            o === 'ease' || a.push({ t: parseFloat(e), v: r[o], e: i })
    },
    bi = function (e, r, t, n, i) {
      return Se(e)
        ? e.call(r, t, n, i)
        : ze(e) && ~e.indexOf('random(')
        ? gi(e)
        : e
    },
    ol = Mo + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
    al = {}
  mt(ol + ',id,stagger,delay,duration,paused,scrollTrigger', function (s) {
    return (al[s] = 1)
  })
  var Me = (function (s) {
    yu(e, s)
    function e(t, n, i, o) {
      var a
      typeof n == 'number' && ((i.duration = n), (n = i), (i = null)),
        (a = s.call(this, o ? n : hi(n)) || this)
      var u = a.vars,
        l = u.duration,
        c = u.delay,
        h = u.immediateRender,
        f = u.stagger,
        d = u.overwrite,
        g = u.keyframes,
        p = u.defaults,
        m = u.scrollTrigger,
        _ = u.yoyoEase,
        v = n.parent || be,
        y = (Ze(t) || wu(t) ? mr(t[0]) : 'length' in n) ? [t] : Rt(t),
        b,
        T,
        S,
        w,
        P,
        E,
        C,
        L
      if (
        ((a._targets = y.length
          ? Do(y)
          : ci(
              'GSAP target ' + t + ' not found. https://gsap.com',
              !xt.nullTargetWarn
            ) || []),
        (a._ptLookup = []),
        (a._overwrite = d),
        g || f || as(l) || as(c))
      ) {
        if (
          ((n = a.vars),
          (b = a.timeline =
            new st({
              data: 'nested',
              defaults: p || {},
              targets: v && v.data === 'nested' ? v.vars.targets : y,
            })),
          b.kill(),
          (b.parent = b._dp = gr(a)),
          (b._start = 0),
          f || as(l) || as(c))
        ) {
          if (((w = y.length), (C = f && Yu(f)), rr(f)))
            for (P in f) ~ol.indexOf(P) && (L || (L = {}), (L[P] = f[P]))
          for (T = 0; T < w; T++)
            (S = hs(n, al)),
              (S.stagger = 0),
              _ && (S.yoyoEase = _),
              L && Zr(S, L),
              (E = y[T]),
              (S.duration = +bi(l, gr(a), T, E, y)),
              (S.delay = (+bi(c, gr(a), T, E, y) || 0) - a._delay),
              !f &&
                w === 1 &&
                S.delay &&
                ((a._delay = c = S.delay), (a._start += c), (S.delay = 0)),
              b.to(E, S, C ? C(T, E, y) : 0),
              (b._ease = se.none)
          b.duration() ? (l = c = 0) : (a.timeline = 0)
        } else if (g) {
          hi(Mt(b.vars.defaults, { ease: 'none' })),
            (b._ease = Jr(g.ease || n.ease || 'none'))
          var k = 0,
            R,
            A,
            O
          if (Ze(g))
            g.forEach(function (D) {
              return b.to(y, D, '>')
            }),
              b.duration()
          else {
            S = {}
            for (P in g)
              P === 'ease' || P === 'easeEach' || Mh(P, g[P], S, g.easeEach)
            for (P in S)
              for (
                R = S[P].sort(function (D, I) {
                  return D.t - I.t
                }),
                  k = 0,
                  T = 0;
                T < R.length;
                T++
              )
                (A = R[T]),
                  (O = {
                    ease: A.e,
                    duration: ((A.t - (T ? R[T - 1].t : 0)) / 100) * l,
                  }),
                  (O[P] = A.v),
                  b.to(y, O, k),
                  (k += O.duration)
            b.duration() < l && b.to({}, { duration: l - b.duration() })
          }
        }
        l || a.duration((l = b.duration()))
      } else a.timeline = 0
      return (
        d === !0 && !yo && ((Rr = gr(a)), be.killTweensOf(y), (Rr = 0)),
        ir(v, gr(a), i),
        n.reversed && a.reverse(),
        n.paused && a.paused(!0),
        (h ||
          (!l &&
            !g &&
            a._start === Ve(v._time) &&
            gt(h) &&
            uh(gr(a)) &&
            v.data !== 'nested')) &&
          ((a._tTime = -1e-8), a.render(Math.max(0, -c) || 0)),
        m && Vu(gr(a), m),
        a
      )
    }
    var r = e.prototype
    return (
      (r.render = function (n, i, o) {
        var a = this._time,
          u = this._tDur,
          l = this._dur,
          c = n < 0,
          h = n > u - Ke && !c ? u : n < Ke ? 0 : n,
          f,
          d,
          g,
          p,
          m,
          _,
          v,
          y,
          b
        if (!l) ch(this, n, i, o)
        else if (
          h !== this._tTime ||
          !n ||
          o ||
          (!this._initted && this._tTime) ||
          (this._startAt && this._zTime < 0 !== c)
        ) {
          if (((f = h), (y = this.timeline), this._repeat)) {
            if (((p = l + this._rDelay), this._repeat < -1 && c))
              return this.totalTime(p * 100 + n, i, o)
            if (
              ((f = Ve(h % p)),
              h === u
                ? ((g = this._repeat), (f = l))
                : ((g = ~~(h / p)),
                  g && g === Ve(h / p) && ((f = l), g--),
                  f > l && (f = l)),
              (_ = this._yoyo && g & 1),
              _ && ((b = this._yEase), (f = l - f)),
              (m = Rn(this._tTime, p)),
              f === a && !o && this._initted && g === m)
            )
              return (this._tTime = h), this
            g !== m &&
              (y && this._yEase && rl(y, _),
              this.vars.repeatRefresh &&
                !_ &&
                !this._lock &&
                this._time !== p &&
                this._initted &&
                ((this._lock = o = 1),
                (this.render(Ve(p * g), !0).invalidate()._lock = 0)))
          }
          if (!this._initted) {
            if (Nu(this, c ? n : f, o, i, h)) return (this._tTime = 0), this
            if (a !== this._time && !(o && this.vars.repeatRefresh && g !== m))
              return this
            if (l !== this._dur) return this.render(n, i, o)
          }
          if (
            ((this._tTime = h),
            (this._time = f),
            !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
            (this.ratio = v = (b || this._ease)(f / l)),
            this._from && (this.ratio = v = 1 - v),
            f && !a && !i && !g && (Ct(this, 'onStart'), this._tTime !== h))
          )
            return this
          for (d = this._pt; d; ) d.r(v, d.d), (d = d._next)
          ;(y && y.render(n < 0 ? n : y._dur * y._ease(f / this._dur), i, o)) ||
            (this._startAt && (this._zTime = n)),
            this._onUpdate &&
              !i &&
              (c && Ro(this, n, i, o), Ct(this, 'onUpdate')),
            this._repeat &&
              g !== m &&
              this.vars.onRepeat &&
              !i &&
              this.parent &&
              Ct(this, 'onRepeat'),
            (h === this._tDur || !h) &&
              this._tTime === h &&
              (c && !this._onUpdate && Ro(this, n, !0, !0),
              (n || !l) &&
                ((h === this._tDur && this._ts > 0) || (!h && this._ts < 0)) &&
                Ar(this, 1),
              !i &&
                !(c && !a) &&
                (h || a || _) &&
                (Ct(this, h === u ? 'onComplete' : 'onReverseComplete', !0),
                this._prom && !(h < u && this.timeScale() > 0) && this._prom()))
        }
        return this
      }),
      (r.targets = function () {
        return this._targets
      }),
      (r.invalidate = function (n) {
        return (
          (!n || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(n),
          s.prototype.invalidate.call(this, n)
        )
      }),
      (r.resetTo = function (n, i, o, a, u) {
        vi || Et.wake(), this._ts || this.play()
        var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
          c
        return (
          this._initted || Yo(this, l),
          (c = this._ease(l / this._dur)),
          Oh(this, n, i, o, a, c, l, u)
            ? this.resetTo(n, i, o, a, 1)
            : (ms(this, 0),
              this.parent ||
                Iu(
                  this._dp,
                  this,
                  '_first',
                  '_last',
                  this._dp._sort ? '_start' : 0
                ),
              this.render(0))
        )
      }),
      (r.kill = function (n, i) {
        if ((i === void 0 && (i = 'all'), !n && (!i || i === 'all')))
          return (this._lazy = this._pt = 0), this.parent ? mi(this) : this
        if (this.timeline) {
          var o = this.timeline.totalDuration()
          return (
            this.timeline.killTweensOf(n, i, Rr && Rr.vars.overwrite !== !0)
              ._first || mi(this),
            this.parent &&
              o !== this.timeline.totalDuration() &&
              Ln(this, (this._dur * this.timeline._tDur) / o, 0, 1),
            this
          )
        }
        var a = this._targets,
          u = n ? Rt(n) : a,
          l = this._ptLookup,
          c = this._pt,
          h,
          f,
          d,
          g,
          p,
          m,
          _
        if ((!i || i === 'all') && oh(a, u))
          return i === 'all' && (this._pt = 0), mi(this)
        for (
          h = this._op = this._op || [],
            i !== 'all' &&
              (ze(i) &&
                ((p = {}),
                mt(i, function (v) {
                  return (p[v] = 1)
                }),
                (i = p)),
              (i = Ah(a, i))),
            _ = a.length;
          _--;

        )
          if (~u.indexOf(a[_])) {
            ;(f = l[_]),
              i === 'all'
                ? ((h[_] = i), (g = f), (d = {}))
                : ((d = h[_] = h[_] || {}), (g = i))
            for (p in g)
              (m = f && f[p]),
                m &&
                  ((!('kill' in m.d) || m.d.kill(p) === !0) &&
                    ds(this, m, '_pt'),
                  delete f[p]),
                d !== 'all' && (d[p] = 1)
          }
        return this._initted && !this._pt && c && mi(this), this
      }),
      (e.to = function (n, i) {
        return new e(n, i, arguments[2])
      }),
      (e.from = function (n, i) {
        return di(1, arguments)
      }),
      (e.delayedCall = function (n, i, o, a) {
        return new e(i, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: n,
          onComplete: i,
          onReverseComplete: i,
          onCompleteParams: o,
          onReverseCompleteParams: o,
          callbackScope: a,
        })
      }),
      (e.fromTo = function (n, i, o) {
        return di(2, arguments)
      }),
      (e.set = function (n, i) {
        return (i.duration = 0), i.repeatDelay || (i.repeat = 0), new e(n, i)
      }),
      (e.killTweensOf = function (n, i, o) {
        return be.killTweensOf(n, i, o)
      }),
      e
    )
  })(yi)
  Mt(Me.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    mt('staggerTo,staggerFrom,staggerFromTo', function (s) {
      Me[s] = function () {
        var e = new st(),
          r = Io.call(arguments, 0)
        return r.splice(s === 'staggerFromTo' ? 5 : 4, 0, 0), e[s].apply(e, r)
      }
    })
  var Ho = function (e, r, t) {
      return (e[r] = t)
    },
    ul = function (e, r, t) {
      return e[r](t)
    },
    Dh = function (e, r, t, n) {
      return e[r](n.fp, t)
    },
    Rh = function (e, r, t) {
      return e.setAttribute(r, t)
    },
    Xo = function (e, r) {
      return Se(e[r]) ? ul : wo(e[r]) && e.setAttribute ? Rh : Ho
    },
    ll = function (e, r) {
      return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e6) / 1e6, r)
    },
    Lh = function (e, r) {
      return r.set(r.t, r.p, !!(r.s + r.c * e), r)
    },
    cl = function (e, r) {
      var t = r._pt,
        n = ''
      if (!e && r.b) n = r.b
      else if (e === 1 && r.e) n = r.e
      else {
        for (; t; )
          (n =
            t.p +
            (t.m
              ? t.m(t.s + t.c * e)
              : Math.round((t.s + t.c * e) * 1e4) / 1e4) +
            n),
            (t = t._next)
        n += r.c
      }
      r.set(r.t, r.p, n, r)
    },
    Wo = function (e, r) {
      for (var t = r._pt; t; ) t.r(e, t.d), (t = t._next)
    },
    Ih = function (e, r, t, n) {
      for (var i = this._pt, o; i; )
        (o = i._next), i.p === n && i.modifier(e, r, t), (i = o)
    },
    Fh = function (e) {
      for (var r = this._pt, t, n; r; )
        (n = r._next),
          (r.p === e && !r.op) || r.op === e
            ? ds(this, r, '_pt')
            : r.dep || (t = 1),
          (r = n)
      return !t
    },
    zh = function (e, r, t, n) {
      n.mSet(e, r, n.m.call(n.tween, t, n.mt), n)
    },
    fl = function (e) {
      for (var r = e._pt, t, n, i, o; r; ) {
        for (t = r._next, n = i; n && n.pr > r.pr; ) n = n._next
        ;(r._prev = n ? n._prev : o) ? (r._prev._next = r) : (i = r),
          (r._next = n) ? (n._prev = r) : (o = r),
          (r = t)
      }
      e._pt = i
    },
    _t = (function () {
      function s(r, t, n, i, o, a, u, l, c) {
        ;(this.t = t),
          (this.s = i),
          (this.c = o),
          (this.p = n),
          (this.r = a || ll),
          (this.d = u || this),
          (this.set = l || Ho),
          (this.pr = c || 0),
          (this._next = r),
          r && (r._prev = this)
      }
      var e = s.prototype
      return (
        (e.modifier = function (t, n, i) {
          ;(this.mSet = this.mSet || this.set),
            (this.set = zh),
            (this.m = t),
            (this.mt = i),
            (this.tween = n)
        }),
        s
      )
    })()
  mt(
    Mo +
      'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
    function (s) {
      return (ko[s] = 1)
    }
  ),
    (Tt.TweenMax = Tt.TweenLite = Me),
    (Tt.TimelineLite = Tt.TimelineMax = st),
    (be = new st({
      sortChildren: !1,
      defaults: An,
      autoRemoveChildren: !0,
      id: 'root',
      smoothChildTiming: !0,
    })),
    (xt.stringFilter = el)
  var tn = [],
    _s = {},
    Vh = [],
    hl = 0,
    Nh = 0,
    jo = function (e) {
      return (_s[e] || Vh).map(function (r) {
        return r()
      })
    },
    Uo = function () {
      var e = Date.now(),
        r = []
      e - hl > 2 &&
        (jo('matchMediaInit'),
        tn.forEach(function (t) {
          var n = t.queries,
            i = t.conditions,
            o,
            a,
            u,
            l
          for (a in n)
            (o = nr.matchMedia(n[a]).matches),
              o && (u = 1),
              o !== i[a] && ((i[a] = o), (l = 1))
          l && (t.revert(), u && r.push(t))
        }),
        jo('matchMediaRevert'),
        r.forEach(function (t) {
          return t.onMatch(t, function (n) {
            return t.add(null, n)
          })
        }),
        (hl = e),
        jo('matchMedia'))
    },
    dl = (function () {
      function s(r, t) {
        ;(this.selector = t && Fo(t)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          (this.id = Nh++),
          r && this.add(r)
      }
      var e = s.prototype
      return (
        (e.add = function (t, n, i) {
          Se(t) && ((i = n), (n = t), (t = Se))
          var o = this,
            a = function () {
              var l = ve,
                c = o.selector,
                h
              return (
                l && l !== o && l.data.push(o),
                i && (o.selector = Fo(i)),
                (ve = o),
                (h = n.apply(o, arguments)),
                Se(h) && o._r.push(h),
                (ve = l),
                (o.selector = c),
                (o.isReverted = !1),
                h
              )
            }
          return (
            (o.last = a),
            t === Se
              ? a(o, function (u) {
                  return o.add(null, u)
                })
              : t
              ? (o[t] = a)
              : a
          )
        }),
        (e.ignore = function (t) {
          var n = ve
          ;(ve = null), t(this), (ve = n)
        }),
        (e.getTweens = function () {
          var t = []
          return (
            this.data.forEach(function (n) {
              return n instanceof s
                ? t.push.apply(t, n.getTweens())
                : n instanceof Me &&
                    !(n.parent && n.parent.data === 'nested') &&
                    t.push(n)
            }),
            t
          )
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0
        }),
        (e.kill = function (t, n) {
          var i = this
          if (
            (t
              ? (function () {
                  for (var a = i.getTweens(), u = i.data.length, l; u--; )
                    (l = i.data[u]),
                      l.data === 'isFlip' &&
                        (l.revert(),
                        l.getChildren(!0, !0, !1).forEach(function (c) {
                          return a.splice(a.indexOf(c), 1)
                        }))
                  for (
                    a
                      .map(function (c) {
                        return {
                          g:
                            c._dur ||
                            c._delay ||
                            (c._sat && !c._sat.vars.immediateRender)
                              ? c.globalTime(0)
                              : -1 / 0,
                          t: c,
                        }
                      })
                      .sort(function (c, h) {
                        return h.g - c.g || -1 / 0
                      })
                      .forEach(function (c) {
                        return c.t.revert(t)
                      }),
                      u = i.data.length;
                    u--;

                  )
                    (l = i.data[u]),
                      l instanceof st
                        ? l.data !== 'nested' &&
                          (l.scrollTrigger && l.scrollTrigger.revert(),
                          l.kill())
                        : !(l instanceof Me) && l.revert && l.revert(t)
                  i._r.forEach(function (c) {
                    return c(t, i)
                  }),
                    (i.isReverted = !0)
                })()
              : this.data.forEach(function (a) {
                  return a.kill && a.kill()
                }),
            this.clear(),
            n)
          )
            for (var o = tn.length; o--; )
              tn[o].id === this.id && tn.splice(o, 1)
        }),
        (e.revert = function (t) {
          this.kill(t || {})
        }),
        s
      )
    })(),
    Bh = (function () {
      function s(r) {
        ;(this.contexts = []), (this.scope = r), ve && ve.data.push(this)
      }
      var e = s.prototype
      return (
        (e.add = function (t, n, i) {
          rr(t) || (t = { matches: t })
          var o = new dl(0, i || this.scope),
            a = (o.conditions = {}),
            u,
            l,
            c
          ve && !o.selector && (o.selector = ve.selector),
            this.contexts.push(o),
            (n = o.add('onMatch', n)),
            (o.queries = t)
          for (l in t)
            l === 'all'
              ? (c = 1)
              : ((u = nr.matchMedia(t[l])),
                u &&
                  (tn.indexOf(o) < 0 && tn.push(o),
                  (a[l] = u.matches) && (c = 1),
                  u.addListener
                    ? u.addListener(Uo)
                    : u.addEventListener('change', Uo)))
          return (
            c &&
              n(o, function (h) {
                return o.add(null, h)
              }),
            this
          )
        }),
        (e.revert = function (t) {
          this.kill(t || {})
        }),
        (e.kill = function (t) {
          this.contexts.forEach(function (n) {
            return n.kill(t, !0)
          })
        }),
        s
      )
    })(),
    vs = {
      registerPlugin: function () {
        for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
          r[t] = arguments[t]
        r.forEach(function (n) {
          return Ku(n)
        })
      },
      timeline: function (e) {
        return new st(e)
      },
      getTweensOf: function (e, r) {
        return be.getTweensOf(e, r)
      },
      getProperty: function (e, r, t, n) {
        ze(e) && (e = Rt(e)[0])
        var i = Kr(e || {}).get,
          o = t ? Ru : Du
        return (
          t === 'native' && (t = ''),
          e &&
            (r
              ? o(((St[r] && St[r].get) || i)(e, r, t, n))
              : function (a, u, l) {
                  return o(((St[a] && St[a].get) || i)(e, a, u, l))
                })
        )
      },
      quickSetter: function (e, r, t) {
        if (((e = Rt(e)), e.length > 1)) {
          var n = e.map(function (c) {
              return vt.quickSetter(c, r, t)
            }),
            i = n.length
          return function (c) {
            for (var h = i; h--; ) n[h](c)
          }
        }
        e = e[0] || {}
        var o = St[r],
          a = Kr(e),
          u = (a.harness && (a.harness.aliases || {})[r]) || r,
          l = o
            ? function (c) {
                var h = new o()
                ;(In._pt = 0),
                  h.init(e, t ? c + t : c, In, 0, [e]),
                  h.render(1, h),
                  In._pt && Wo(1, In)
              }
            : a.set(e, u)
        return o
          ? l
          : function (c) {
              return l(e, u, t ? c + t : c, a, 1)
            }
      },
      quickTo: function (e, r, t) {
        var n,
          i = vt.to(
            e,
            Zr(((n = {}), (n[r] = '+=0.1'), (n.paused = !0), n), t || {})
          ),
          o = function (u, l, c) {
            return i.resetTo(r, u, l, c)
          }
        return (o.tween = i), o
      },
      isTweening: function (e) {
        return be.getTweensOf(e, !0).length > 0
      },
      defaults: function (e) {
        return e && e.ease && (e.ease = Jr(e.ease, An.ease)), Lu(An, e || {})
      },
      config: function (e) {
        return Lu(xt, e || {})
      },
      registerEffect: function (e) {
        var r = e.name,
          t = e.effect,
          n = e.plugins,
          i = e.defaults,
          o = e.extendTimeline
        ;(n || '').split(',').forEach(function (a) {
          return (
            a &&
            !St[a] &&
            !Tt[a] &&
            ci(r + ' effect requires ' + a + ' plugin.')
          )
        }),
          (Ao[r] = function (a, u, l) {
            return t(Rt(a), Mt(u || {}, i), l)
          }),
          o &&
            (st.prototype[r] = function (a, u, l) {
              return this.add(Ao[r](a, rr(u) ? u : (l = u) && {}, this), l)
            })
      },
      registerEase: function (e, r) {
        se[e] = Jr(r)
      },
      parseEase: function (e, r) {
        return arguments.length ? Jr(e, r) : se
      },
      getById: function (e) {
        return be.getById(e)
      },
      exportRoot: function (e, r) {
        e === void 0 && (e = {})
        var t = new st(e),
          n,
          i
        for (
          t.smoothChildTiming = gt(e.smoothChildTiming),
            be.remove(t),
            t._dp = 0,
            t._time = t._tTime = be._time,
            n = be._first;
          n;

        )
          (i = n._next),
            (r ||
              !(
                !n._dur &&
                n instanceof Me &&
                n.vars.onComplete === n._targets[0]
              )) &&
              ir(t, n, n._start - n._delay),
            (n = i)
        return ir(be, t, 0), t
      },
      context: function (e, r) {
        return e ? new dl(e, r) : ve
      },
      matchMedia: function (e) {
        return new Bh(e)
      },
      matchMediaRefresh: function () {
        return (
          tn.forEach(function (e) {
            var r = e.conditions,
              t,
              n
            for (n in r) r[n] && ((r[n] = !1), (t = 1))
            t && e.revert()
          }) || Uo()
        )
      },
      addEventListener: function (e, r) {
        var t = _s[e] || (_s[e] = [])
        ~t.indexOf(r) || t.push(r)
      },
      removeEventListener: function (e, r) {
        var t = _s[e],
          n = t && t.indexOf(r)
        n >= 0 && t.splice(n, 1)
      },
      utils: {
        wrap: vh,
        wrapYoyo: yh,
        distribute: Yu,
        random: Xu,
        snap: Hu,
        normalize: _h,
        getUnit: Qe,
        clamp: dh,
        splitColor: Zu,
        toArray: Rt,
        selector: Fo,
        mapRange: ju,
        pipe: gh,
        unitize: mh,
        interpolate: bh,
        shuffle: $u,
      },
      install: Eu,
      effects: Ao,
      ticker: Et,
      updateRoot: st.updateRoot,
      plugins: St,
      globalTimeline: be,
      core: {
        PropTween: _t,
        globals: Pu,
        Tween: Me,
        Timeline: st,
        Animation: yi,
        getCache: Kr,
        _removeLinkedListItem: ds,
        reverting: function () {
          return Ge
        },
        context: function (e) {
          return e && ve && (ve.data.push(e), (e._ctx = ve)), ve
        },
        suppressOverwrites: function (e) {
          return (yo = e)
        },
      },
    }
  mt('to,from,fromTo,delayedCall,set,killTweensOf', function (s) {
    return (vs[s] = Me[s])
  }),
    Et.add(st.updateRoot),
    (In = vs.to({}, { duration: 0 }))
  var qh = function (e, r) {
      for (var t = e._pt; t && t.p !== r && t.op !== r && t.fp !== r; )
        t = t._next
      return t
    },
    $h = function (e, r) {
      var t = e._targets,
        n,
        i,
        o
      for (n in r)
        for (i = t.length; i--; )
          (o = e._ptLookup[i][n]),
            o &&
              (o = o.d) &&
              (o._pt && (o = qh(o, n)),
              o && o.modifier && o.modifier(r[n], e, t[i], n))
    },
    Go = function (e, r) {
      return {
        name: e,
        rawVars: 1,
        init: function (n, i, o) {
          o._onInit = function (a) {
            var u, l
            if (
              (ze(i) &&
                ((u = {}),
                mt(i, function (c) {
                  return (u[c] = 1)
                }),
                (i = u)),
              r)
            ) {
              u = {}
              for (l in i) u[l] = r(i[l])
              i = u
            }
            $h(a, i)
          }
        },
      }
    },
    vt =
      vs.registerPlugin(
        {
          name: 'attr',
          init: function (e, r, t, n, i) {
            var o, a, u
            this.tween = t
            for (o in r)
              (u = e.getAttribute(o) || ''),
                (a = this.add(
                  e,
                  'setAttribute',
                  (u || 0) + '',
                  r[o],
                  n,
                  i,
                  0,
                  0,
                  o
                )),
                (a.op = o),
                (a.b = u),
                this._props.push(o)
          },
          render: function (e, r) {
            for (var t = r._pt; t; )
              Ge ? t.set(t.t, t.p, t.b, t) : t.r(e, t.d), (t = t._next)
          },
        },
        {
          name: 'endArray',
          init: function (e, r) {
            for (var t = r.length; t--; )
              this.add(e, t, e[t] || 0, r[t], 0, 0, 0, 0, 0, 1)
          },
        },
        Go('roundProps', zo),
        Go('modifiers'),
        Go('snap', Hu)
      ) || vs
  ;(Me.version = st.version = vt.version = '3.12.5'),
    (Cu = 1),
    xo() && Fn(),
    se.Power0,
    se.Power1,
    se.Power2,
    se.Power3,
    se.Power4,
    se.Linear,
    se.Quad,
    se.Cubic,
    se.Quart,
    se.Quint,
    se.Strong,
    se.Elastic,
    se.Back,
    se.SteppedEase,
    se.Bounce,
    se.Sine,
    se.Expo,
    se.Circ
  /*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var pl,
    Lr,
    zn,
    Ko,
    rn,
    gl,
    Zo,
    Yh = function () {
      return typeof window < 'u'
    },
    _r = {},
    nn = 180 / Math.PI,
    Vn = Math.PI / 180,
    Nn = Math.atan2,
    ml = 1e8,
    Qo = /([A-Z])/g,
    Hh = /(left|right|width|margin|padding|x)/i,
    Xh = /[\s,\(]\S/,
    sr = {
      autoAlpha: 'opacity,visibility',
      scale: 'scaleX,scaleY',
      alpha: 'opacity',
    },
    Jo = function (e, r) {
      return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r)
    },
    Wh = function (e, r) {
      return r.set(
        r.t,
        r.p,
        e === 1 ? r.e : Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u,
        r
      )
    },
    jh = function (e, r) {
      return r.set(
        r.t,
        r.p,
        e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b,
        r
      )
    },
    Uh = function (e, r) {
      var t = r.s + r.c * e
      r.set(r.t, r.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + r.u, r)
    },
    _l = function (e, r) {
      return r.set(r.t, r.p, e ? r.e : r.b, r)
    },
    vl = function (e, r) {
      return r.set(r.t, r.p, e !== 1 ? r.b : r.e, r)
    },
    Gh = function (e, r, t) {
      return (e.style[r] = t)
    },
    Kh = function (e, r, t) {
      return e.style.setProperty(r, t)
    },
    Zh = function (e, r, t) {
      return (e._gsap[r] = t)
    },
    Qh = function (e, r, t) {
      return (e._gsap.scaleX = e._gsap.scaleY = t)
    },
    Jh = function (e, r, t, n, i) {
      var o = e._gsap
      ;(o.scaleX = o.scaleY = t), o.renderTransform(i, o)
    },
    ed = function (e, r, t, n, i) {
      var o = e._gsap
      ;(o[r] = t), o.renderTransform(i, o)
    },
    we = 'transform',
    yt = we + 'Origin',
    td = function s(e, r) {
      var t = this,
        n = this.target,
        i = n.style,
        o = n._gsap
      if (e in _r && i) {
        if (((this.tfm = this.tfm || {}), e !== 'transform'))
          (e = sr[e] || e),
            ~e.indexOf(',')
              ? e.split(',').forEach(function (a) {
                  return (t.tfm[a] = vr(n, a))
                })
              : (this.tfm[e] = o.x ? o[e] : vr(n, e)),
            e === yt && (this.tfm.zOrigin = o.zOrigin)
        else
          return sr.transform.split(',').forEach(function (a) {
            return s.call(t, a, r)
          })
        if (this.props.indexOf(we) >= 0) return
        o.svg &&
          ((this.svgo = n.getAttribute('data-svg-origin')),
          this.props.push(yt, r, '')),
          (e = we)
      }
      ;(i || r) && this.props.push(e, r, i[e])
    },
    yl = function (e) {
      e.translate &&
        (e.removeProperty('translate'),
        e.removeProperty('scale'),
        e.removeProperty('rotate'))
    },
    rd = function () {
      var e = this.props,
        r = this.target,
        t = r.style,
        n = r._gsap,
        i,
        o
      for (i = 0; i < e.length; i += 3)
        e[i + 1]
          ? (r[e[i]] = e[i + 2])
          : e[i + 2]
          ? (t[e[i]] = e[i + 2])
          : t.removeProperty(
              e[i].substr(0, 2) === '--'
                ? e[i]
                : e[i].replace(Qo, '-$1').toLowerCase()
            )
      if (this.tfm) {
        for (o in this.tfm) n[o] = this.tfm[o]
        n.svg &&
          (n.renderTransform(),
          r.setAttribute('data-svg-origin', this.svgo || '')),
          (i = Zo()),
          (!i || !i.isStart) &&
            !t[we] &&
            (yl(t),
            n.zOrigin &&
              t[yt] &&
              ((t[yt] += ' ' + n.zOrigin + 'px'),
              (n.zOrigin = 0),
              n.renderTransform()),
            (n.uncache = 1))
      }
    },
    bl = function (e, r) {
      var t = { target: e, props: [], revert: rd, save: td }
      return (
        e._gsap || vt.core.getCache(e),
        r &&
          r.split(',').forEach(function (n) {
            return t.save(n)
          }),
        t
      )
    },
    wl,
    ea = function (e, r) {
      var t = Lr.createElementNS
        ? Lr.createElementNS(
            (r || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
            e
          )
        : Lr.createElement(e)
      return t && t.style ? t : Lr.createElement(e)
    },
    or = function s(e, r, t) {
      var n = getComputedStyle(e)
      return (
        n[r] ||
        n.getPropertyValue(r.replace(Qo, '-$1').toLowerCase()) ||
        n.getPropertyValue(r) ||
        (!t && s(e, Bn(r) || r, 1)) ||
        ''
      )
    },
    xl = 'O,Moz,ms,Ms,Webkit'.split(','),
    Bn = function (e, r, t) {
      var n = r || rn,
        i = n.style,
        o = 5
      if (e in i && !t) return e
      for (
        e = e.charAt(0).toUpperCase() + e.substr(1);
        o-- && !(xl[o] + e in i);

      );
      return o < 0 ? null : (o === 3 ? 'ms' : o >= 0 ? xl[o] : '') + e
    },
    ta = function () {
      Yh() &&
        window.document &&
        ((pl = window),
        (Lr = pl.document),
        (zn = Lr.documentElement),
        (rn = ea('div') || { style: {} }),
        ea('div'),
        (we = Bn(we)),
        (yt = we + 'Origin'),
        (rn.style.cssText =
          'border-width:0;line-height:0;position:absolute;padding:0'),
        (wl = !!Bn('perspective')),
        (Zo = vt.core.reverting),
        (Ko = 1))
    },
    ra = function s(e) {
      var r = ea(
          'svg',
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute('xmlns')) ||
            'http://www.w3.org/2000/svg'
        ),
        t = this.parentNode,
        n = this.nextSibling,
        i = this.style.cssText,
        o
      if (
        (zn.appendChild(r),
        r.appendChild(this),
        (this.style.display = 'block'),
        e)
      )
        try {
          ;(o = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = s)
        } catch {}
      else this._gsapBBox && (o = this._gsapBBox())
      return (
        t && (n ? t.insertBefore(this, n) : t.appendChild(this)),
        zn.removeChild(r),
        (this.style.cssText = i),
        o
      )
    },
    Tl = function (e, r) {
      for (var t = r.length; t--; )
        if (e.hasAttribute(r[t])) return e.getAttribute(r[t])
    },
    Sl = function (e) {
      var r
      try {
        r = e.getBBox()
      } catch {
        r = ra.call(e, !0)
      }
      return (
        (r && (r.width || r.height)) ||
          e.getBBox === ra ||
          (r = ra.call(e, !0)),
        r && !r.width && !r.x && !r.y
          ? {
              x: +Tl(e, ['x', 'cx', 'x1']) || 0,
              y: +Tl(e, ['y', 'cy', 'y1']) || 0,
              width: 0,
              height: 0,
            }
          : r
      )
    },
    Cl = function (e) {
      return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Sl(e))
    },
    sn = function (e, r) {
      if (r) {
        var t = e.style,
          n
        r in _r && r !== yt && (r = we),
          t.removeProperty
            ? ((n = r.substr(0, 2)),
              (n === 'ms' || r.substr(0, 6) === 'webkit') && (r = '-' + r),
              t.removeProperty(
                n === '--' ? r : r.replace(Qo, '-$1').toLowerCase()
              ))
            : t.removeAttribute(r)
      }
    },
    Ir = function (e, r, t, n, i, o) {
      var a = new _t(e._pt, r, t, 0, 1, o ? vl : _l)
      return (e._pt = a), (a.b = n), (a.e = i), e._props.push(t), a
    },
    El = { deg: 1, rad: 1, turn: 1 },
    nd = { grid: 1, flex: 1 },
    Fr = function s(e, r, t, n) {
      var i = parseFloat(t) || 0,
        o = (t + '').trim().substr((i + '').length) || 'px',
        a = rn.style,
        u = Hh.test(r),
        l = e.tagName.toLowerCase() === 'svg',
        c = (l ? 'client' : 'offset') + (u ? 'Width' : 'Height'),
        h = 100,
        f = n === 'px',
        d = n === '%',
        g,
        p,
        m,
        _
      if (n === o || !i || El[n] || El[o]) return i
      if (
        (o !== 'px' && !f && (i = s(e, r, t, 'px')),
        (_ = e.getCTM && Cl(e)),
        (d || o === '%') && (_r[r] || ~r.indexOf('adius')))
      )
        return (
          (g = _ ? e.getBBox()[u ? 'width' : 'height'] : e[c]),
          Ee(d ? (i / g) * h : (i / 100) * g)
        )
      if (
        ((a[u ? 'width' : 'height'] = h + (f ? o : n)),
        (p =
          ~r.indexOf('adius') || (n === 'em' && e.appendChild && !l)
            ? e
            : e.parentNode),
        _ && (p = (e.ownerSVGElement || {}).parentNode),
        (!p || p === Lr || !p.appendChild) && (p = Lr.body),
        (m = p._gsap),
        m && d && m.width && u && m.time === Et.time && !m.uncache)
      )
        return Ee((i / m.width) * h)
      if (d && (r === 'height' || r === 'width')) {
        var v = e.style[r]
        ;(e.style[r] = h + n), (g = e[c]), v ? (e.style[r] = v) : sn(e, r)
      } else
        (d || o === '%') &&
          !nd[or(p, 'display')] &&
          (a.position = or(e, 'position')),
          p === e && (a.position = 'static'),
          p.appendChild(rn),
          (g = rn[c]),
          p.removeChild(rn),
          (a.position = 'absolute')
      return (
        u && d && ((m = Kr(p)), (m.time = Et.time), (m.width = p[c])),
        Ee(f ? (g * i) / h : g && i ? (h / g) * i : 0)
      )
    },
    vr = function (e, r, t, n) {
      var i
      return (
        Ko || ta(),
        r in sr &&
          r !== 'transform' &&
          ((r = sr[r]), ~r.indexOf(',') && (r = r.split(',')[0])),
        _r[r] && r !== 'transform'
          ? ((i = xi(e, n)),
            (i =
              r !== 'transformOrigin'
                ? i[r]
                : i.svg
                ? i.origin
                : bs(or(e, yt)) + ' ' + i.zOrigin + 'px'))
          : ((i = e.style[r]),
            (!i || i === 'auto' || n || ~(i + '').indexOf('calc(')) &&
              (i =
                (ys[r] && ys[r](e, r, t)) ||
                or(e, r) ||
                Au(e, r) ||
                (r === 'opacity' ? 1 : 0))),
        t && !~(i + '').trim().indexOf(' ') ? Fr(e, r, i, t) + t : i
      )
    },
    id = function (e, r, t, n) {
      if (!t || t === 'none') {
        var i = Bn(r, e, 1),
          o = i && or(e, i, 1)
        o && o !== t
          ? ((r = i), (t = o))
          : r === 'borderColor' && (t = or(e, 'borderTopColor'))
      }
      var a = new _t(this._pt, e.style, r, 0, 1, cl),
        u = 0,
        l = 0,
        c,
        h,
        f,
        d,
        g,
        p,
        m,
        _,
        v,
        y,
        b,
        T
      if (
        ((a.b = t),
        (a.e = n),
        (t += ''),
        (n += ''),
        n === 'auto' &&
          ((p = e.style[r]),
          (e.style[r] = n),
          (n = or(e, r) || n),
          p ? (e.style[r] = p) : sn(e, r)),
        (c = [t, n]),
        el(c),
        (t = c[0]),
        (n = c[1]),
        (f = t.match(Mn) || []),
        (T = n.match(Mn) || []),
        T.length)
      ) {
        for (; (h = Mn.exec(n)); )
          (m = h[0]),
            (v = n.substring(u, h.index)),
            g
              ? (g = (g + 1) % 5)
              : (v.substr(-5) === 'rgba(' || v.substr(-5) === 'hsla(') &&
                (g = 1),
            m !== (p = f[l++] || '') &&
              ((d = parseFloat(p) || 0),
              (b = p.substr((d + '').length)),
              m.charAt(1) === '=' && (m = Dn(d, m) + b),
              (_ = parseFloat(m)),
              (y = m.substr((_ + '').length)),
              (u = Mn.lastIndex - y.length),
              y ||
                ((y = y || xt.units[r] || b),
                u === n.length && ((n += y), (a.e += y))),
              b !== y && (d = Fr(e, r, p, y) || 0),
              (a._pt = {
                _next: a._pt,
                p: v || l === 1 ? v : ',',
                s: d,
                c: _ - d,
                m: (g && g < 4) || r === 'zIndex' ? Math.round : 0,
              }))
        a.c = u < n.length ? n.substring(u, n.length) : ''
      } else a.r = r === 'display' && n === 'none' ? vl : _l
      return Tu.test(n) && (a.e = 0), (this._pt = a), a
    },
    Pl = {
      top: '0%',
      bottom: '100%',
      left: '0%',
      right: '100%',
      center: '50%',
    },
    sd = function (e) {
      var r = e.split(' '),
        t = r[0],
        n = r[1] || '50%'
      return (
        (t === 'top' || t === 'bottom' || n === 'left' || n === 'right') &&
          ((e = t), (t = n), (n = e)),
        (r[0] = Pl[t] || t),
        (r[1] = Pl[n] || n),
        r.join(' ')
      )
    },
    od = function (e, r) {
      if (r.tween && r.tween._time === r.tween._dur) {
        var t = r.t,
          n = t.style,
          i = r.u,
          o = t._gsap,
          a,
          u,
          l
        if (i === 'all' || i === !0) (n.cssText = ''), (u = 1)
        else
          for (i = i.split(','), l = i.length; --l > -1; )
            (a = i[l]),
              _r[a] && ((u = 1), (a = a === 'transformOrigin' ? yt : we)),
              sn(t, a)
        u &&
          (sn(t, we),
          o &&
            (o.svg && t.removeAttribute('transform'),
            xi(t, 1),
            (o.uncache = 1),
            yl(n)))
      }
    },
    ys = {
      clearProps: function (e, r, t, n, i) {
        if (i.data !== 'isFromStart') {
          var o = (e._pt = new _t(e._pt, r, t, 0, 0, od))
          return (o.u = n), (o.pr = -10), (o.tween = i), e._props.push(t), 1
        }
      },
    },
    wi = [1, 0, 0, 1, 0, 0],
    kl = {},
    Ol = function (e) {
      return e === 'matrix(1, 0, 0, 1, 0, 0)' || e === 'none' || !e
    },
    Al = function (e) {
      var r = or(e, we)
      return Ol(r) ? wi : r.substr(7).match(xu).map(Ee)
    },
    na = function (e, r) {
      var t = e._gsap || Kr(e),
        n = e.style,
        i = Al(e),
        o,
        a,
        u,
        l
      return t.svg && e.getAttribute('transform')
        ? ((u = e.transform.baseVal.consolidate().matrix),
          (i = [u.a, u.b, u.c, u.d, u.e, u.f]),
          i.join(',') === '1,0,0,1,0,0' ? wi : i)
        : (i === wi &&
            !e.offsetParent &&
            e !== zn &&
            !t.svg &&
            ((u = n.display),
            (n.display = 'block'),
            (o = e.parentNode),
            (!o || !e.offsetParent) &&
              ((l = 1), (a = e.nextElementSibling), zn.appendChild(e)),
            (i = Al(e)),
            u ? (n.display = u) : sn(e, 'display'),
            l &&
              (a
                ? o.insertBefore(e, a)
                : o
                ? o.appendChild(e)
                : zn.removeChild(e))),
          r && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i)
    },
    ia = function (e, r, t, n, i, o) {
      var a = e._gsap,
        u = i || na(e, !0),
        l = a.xOrigin || 0,
        c = a.yOrigin || 0,
        h = a.xOffset || 0,
        f = a.yOffset || 0,
        d = u[0],
        g = u[1],
        p = u[2],
        m = u[3],
        _ = u[4],
        v = u[5],
        y = r.split(' '),
        b = parseFloat(y[0]) || 0,
        T = parseFloat(y[1]) || 0,
        S,
        w,
        P,
        E
      t
        ? u !== wi &&
          (w = d * m - g * p) &&
          ((P = b * (m / w) + T * (-p / w) + (p * v - m * _) / w),
          (E = b * (-g / w) + T * (d / w) - (d * v - g * _) / w),
          (b = P),
          (T = E))
        : ((S = Sl(e)),
          (b = S.x + (~y[0].indexOf('%') ? (b / 100) * S.width : b)),
          (T =
            S.y + (~(y[1] || y[0]).indexOf('%') ? (T / 100) * S.height : T))),
        n || (n !== !1 && a.smooth)
          ? ((_ = b - l),
            (v = T - c),
            (a.xOffset = h + (_ * d + v * p) - _),
            (a.yOffset = f + (_ * g + v * m) - v))
          : (a.xOffset = a.yOffset = 0),
        (a.xOrigin = b),
        (a.yOrigin = T),
        (a.smooth = !!n),
        (a.origin = r),
        (a.originIsAbsolute = !!t),
        (e.style[yt] = '0px 0px'),
        o &&
          (Ir(o, a, 'xOrigin', l, b),
          Ir(o, a, 'yOrigin', c, T),
          Ir(o, a, 'xOffset', h, a.xOffset),
          Ir(o, a, 'yOffset', f, a.yOffset)),
        e.setAttribute('data-svg-origin', b + ' ' + T)
    },
    xi = function (e, r) {
      var t = e._gsap || new il(e)
      if ('x' in t && !r && !t.uncache) return t
      var n = e.style,
        i = t.scaleX < 0,
        o = 'px',
        a = 'deg',
        u = getComputedStyle(e),
        l = or(e, yt) || '0',
        c,
        h,
        f,
        d,
        g,
        p,
        m,
        _,
        v,
        y,
        b,
        T,
        S,
        w,
        P,
        E,
        C,
        L,
        k,
        R,
        A,
        O,
        D,
        I,
        F,
        z,
        x,
        N,
        H,
        ae,
        ee,
        G
      return (
        (c = h = f = p = m = _ = v = y = b = 0),
        (d = g = 1),
        (t.svg = !!(e.getCTM && Cl(e))),
        u.translate &&
          ((u.translate !== 'none' ||
            u.scale !== 'none' ||
            u.rotate !== 'none') &&
            (n[we] =
              (u.translate !== 'none'
                ? 'translate3d(' +
                  (u.translate + ' 0 0').split(' ').slice(0, 3).join(', ') +
                  ') '
                : '') +
              (u.rotate !== 'none' ? 'rotate(' + u.rotate + ') ' : '') +
              (u.scale !== 'none'
                ? 'scale(' + u.scale.split(' ').join(',') + ') '
                : '') +
              (u[we] !== 'none' ? u[we] : '')),
          (n.scale = n.rotate = n.translate = 'none')),
        (w = na(e, t.svg)),
        t.svg &&
          (t.uncache
            ? ((F = e.getBBox()),
              (l = t.xOrigin - F.x + 'px ' + (t.yOrigin - F.y) + 'px'),
              (I = ''))
            : (I = !r && e.getAttribute('data-svg-origin')),
          ia(e, I || l, !!I || t.originIsAbsolute, t.smooth !== !1, w)),
        (T = t.xOrigin || 0),
        (S = t.yOrigin || 0),
        w !== wi &&
          ((L = w[0]),
          (k = w[1]),
          (R = w[2]),
          (A = w[3]),
          (c = O = w[4]),
          (h = D = w[5]),
          w.length === 6
            ? ((d = Math.sqrt(L * L + k * k)),
              (g = Math.sqrt(A * A + R * R)),
              (p = L || k ? Nn(k, L) * nn : 0),
              (v = R || A ? Nn(R, A) * nn + p : 0),
              v && (g *= Math.abs(Math.cos(v * Vn))),
              t.svg && ((c -= T - (T * L + S * R)), (h -= S - (T * k + S * A))))
            : ((G = w[6]),
              (ae = w[7]),
              (x = w[8]),
              (N = w[9]),
              (H = w[10]),
              (ee = w[11]),
              (c = w[12]),
              (h = w[13]),
              (f = w[14]),
              (P = Nn(G, H)),
              (m = P * nn),
              P &&
                ((E = Math.cos(-P)),
                (C = Math.sin(-P)),
                (I = O * E + x * C),
                (F = D * E + N * C),
                (z = G * E + H * C),
                (x = O * -C + x * E),
                (N = D * -C + N * E),
                (H = G * -C + H * E),
                (ee = ae * -C + ee * E),
                (O = I),
                (D = F),
                (G = z)),
              (P = Nn(-R, H)),
              (_ = P * nn),
              P &&
                ((E = Math.cos(-P)),
                (C = Math.sin(-P)),
                (I = L * E - x * C),
                (F = k * E - N * C),
                (z = R * E - H * C),
                (ee = A * C + ee * E),
                (L = I),
                (k = F),
                (R = z)),
              (P = Nn(k, L)),
              (p = P * nn),
              P &&
                ((E = Math.cos(P)),
                (C = Math.sin(P)),
                (I = L * E + k * C),
                (F = O * E + D * C),
                (k = k * E - L * C),
                (D = D * E - O * C),
                (L = I),
                (O = F)),
              m &&
                Math.abs(m) + Math.abs(p) > 359.9 &&
                ((m = p = 0), (_ = 180 - _)),
              (d = Ee(Math.sqrt(L * L + k * k + R * R))),
              (g = Ee(Math.sqrt(D * D + G * G))),
              (P = Nn(O, D)),
              (v = Math.abs(P) > 2e-4 ? P * nn : 0),
              (b = ee ? 1 / (ee < 0 ? -ee : ee) : 0)),
          t.svg &&
            ((I = e.getAttribute('transform')),
            (t.forceCSS = e.setAttribute('transform', '') || !Ol(or(e, we))),
            I && e.setAttribute('transform', I))),
        Math.abs(v) > 90 &&
          Math.abs(v) < 270 &&
          (i
            ? ((d *= -1),
              (v += p <= 0 ? 180 : -180),
              (p += p <= 0 ? 180 : -180))
            : ((g *= -1), (v += v <= 0 ? 180 : -180))),
        (r = r || t.uncache),
        (t.x =
          c -
          ((t.xPercent =
            c &&
            ((!r && t.xPercent) ||
              (Math.round(e.offsetWidth / 2) === Math.round(-c) ? -50 : 0)))
            ? (e.offsetWidth * t.xPercent) / 100
            : 0) +
          o),
        (t.y =
          h -
          ((t.yPercent =
            h &&
            ((!r && t.yPercent) ||
              (Math.round(e.offsetHeight / 2) === Math.round(-h) ? -50 : 0)))
            ? (e.offsetHeight * t.yPercent) / 100
            : 0) +
          o),
        (t.z = f + o),
        (t.scaleX = Ee(d)),
        (t.scaleY = Ee(g)),
        (t.rotation = Ee(p) + a),
        (t.rotationX = Ee(m) + a),
        (t.rotationY = Ee(_) + a),
        (t.skewX = v + a),
        (t.skewY = y + a),
        (t.transformPerspective = b + o),
        (t.zOrigin = parseFloat(l.split(' ')[2]) || (!r && t.zOrigin) || 0) &&
          (n[yt] = bs(l)),
        (t.xOffset = t.yOffset = 0),
        (t.force3D = xt.force3D),
        (t.renderTransform = t.svg ? ud : wl ? Ml : ad),
        (t.uncache = 0),
        t
      )
    },
    bs = function (e) {
      return (e = e.split(' '))[0] + ' ' + e[1]
    },
    sa = function (e, r, t) {
      var n = Qe(r)
      return Ee(parseFloat(r) + parseFloat(Fr(e, 'x', t + 'px', n))) + n
    },
    ad = function (e, r) {
      ;(r.z = '0px'),
        (r.rotationY = r.rotationX = '0deg'),
        (r.force3D = 0),
        Ml(e, r)
    },
    on = '0deg',
    Ti = '0px',
    an = ') ',
    Ml = function (e, r) {
      var t = r || this,
        n = t.xPercent,
        i = t.yPercent,
        o = t.x,
        a = t.y,
        u = t.z,
        l = t.rotation,
        c = t.rotationY,
        h = t.rotationX,
        f = t.skewX,
        d = t.skewY,
        g = t.scaleX,
        p = t.scaleY,
        m = t.transformPerspective,
        _ = t.force3D,
        v = t.target,
        y = t.zOrigin,
        b = '',
        T = (_ === 'auto' && e && e !== 1) || _ === !0
      if (y && (h !== on || c !== on)) {
        var S = parseFloat(c) * Vn,
          w = Math.sin(S),
          P = Math.cos(S),
          E
        ;(S = parseFloat(h) * Vn),
          (E = Math.cos(S)),
          (o = sa(v, o, w * E * -y)),
          (a = sa(v, a, -Math.sin(S) * -y)),
          (u = sa(v, u, P * E * -y + y))
      }
      m !== Ti && (b += 'perspective(' + m + an),
        (n || i) && (b += 'translate(' + n + '%, ' + i + '%) '),
        (T || o !== Ti || a !== Ti || u !== Ti) &&
          (b +=
            u !== Ti || T
              ? 'translate3d(' + o + ', ' + a + ', ' + u + ') '
              : 'translate(' + o + ', ' + a + an),
        l !== on && (b += 'rotate(' + l + an),
        c !== on && (b += 'rotateY(' + c + an),
        h !== on && (b += 'rotateX(' + h + an),
        (f !== on || d !== on) && (b += 'skew(' + f + ', ' + d + an),
        (g !== 1 || p !== 1) && (b += 'scale(' + g + ', ' + p + an),
        (v.style[we] = b || 'translate(0, 0)')
    },
    ud = function (e, r) {
      var t = r || this,
        n = t.xPercent,
        i = t.yPercent,
        o = t.x,
        a = t.y,
        u = t.rotation,
        l = t.skewX,
        c = t.skewY,
        h = t.scaleX,
        f = t.scaleY,
        d = t.target,
        g = t.xOrigin,
        p = t.yOrigin,
        m = t.xOffset,
        _ = t.yOffset,
        v = t.forceCSS,
        y = parseFloat(o),
        b = parseFloat(a),
        T,
        S,
        w,
        P,
        E
      ;(u = parseFloat(u)),
        (l = parseFloat(l)),
        (c = parseFloat(c)),
        c && ((c = parseFloat(c)), (l += c), (u += c)),
        u || l
          ? ((u *= Vn),
            (l *= Vn),
            (T = Math.cos(u) * h),
            (S = Math.sin(u) * h),
            (w = Math.sin(u - l) * -f),
            (P = Math.cos(u - l) * f),
            l &&
              ((c *= Vn),
              (E = Math.tan(l - c)),
              (E = Math.sqrt(1 + E * E)),
              (w *= E),
              (P *= E),
              c &&
                ((E = Math.tan(c)),
                (E = Math.sqrt(1 + E * E)),
                (T *= E),
                (S *= E))),
            (T = Ee(T)),
            (S = Ee(S)),
            (w = Ee(w)),
            (P = Ee(P)))
          : ((T = h), (P = f), (S = w = 0)),
        ((y && !~(o + '').indexOf('px')) || (b && !~(a + '').indexOf('px'))) &&
          ((y = Fr(d, 'x', o, 'px')), (b = Fr(d, 'y', a, 'px'))),
        (g || p || m || _) &&
          ((y = Ee(y + g - (g * T + p * w) + m)),
          (b = Ee(b + p - (g * S + p * P) + _))),
        (n || i) &&
          ((E = d.getBBox()),
          (y = Ee(y + (n / 100) * E.width)),
          (b = Ee(b + (i / 100) * E.height))),
        (E =
          'matrix(' +
          T +
          ',' +
          S +
          ',' +
          w +
          ',' +
          P +
          ',' +
          y +
          ',' +
          b +
          ')'),
        d.setAttribute('transform', E),
        v && (d.style[we] = E)
    },
    ld = function (e, r, t, n, i) {
      var o = 360,
        a = ze(i),
        u = parseFloat(i) * (a && ~i.indexOf('rad') ? nn : 1),
        l = u - n,
        c = n + l + 'deg',
        h,
        f
      return (
        a &&
          ((h = i.split('_')[1]),
          h === 'short' &&
            ((l %= o), l !== l % (o / 2) && (l += l < 0 ? o : -360)),
          h === 'cw' && l < 0
            ? (l = ((l + o * ml) % o) - ~~(l / o) * o)
            : h === 'ccw' && l > 0 && (l = ((l - o * ml) % o) - ~~(l / o) * o)),
        (e._pt = f = new _t(e._pt, r, t, n, l, Wh)),
        (f.e = c),
        (f.u = 'deg'),
        e._props.push(t),
        f
      )
    },
    Dl = function (e, r) {
      for (var t in r) e[t] = r[t]
      return e
    },
    cd = function (e, r, t) {
      var n = Dl({}, t._gsap),
        i = 'perspective,force3D,transformOrigin,svgOrigin',
        o = t.style,
        a,
        u,
        l,
        c,
        h,
        f,
        d,
        g
      n.svg
        ? ((l = t.getAttribute('transform')),
          t.setAttribute('transform', ''),
          (o[we] = r),
          (a = xi(t, 1)),
          sn(t, we),
          t.setAttribute('transform', l))
        : ((l = getComputedStyle(t)[we]),
          (o[we] = r),
          (a = xi(t, 1)),
          (o[we] = l))
      for (u in _r)
        (l = n[u]),
          (c = a[u]),
          l !== c &&
            i.indexOf(u) < 0 &&
            ((d = Qe(l)),
            (g = Qe(c)),
            (h = d !== g ? Fr(t, u, l, g) : parseFloat(l)),
            (f = parseFloat(c)),
            (e._pt = new _t(e._pt, a, u, h, f - h, Jo)),
            (e._pt.u = g || 0),
            e._props.push(u))
      Dl(a, n)
    }
  mt('padding,margin,Width,Radius', function (s, e) {
    var r = 'Top',
      t = 'Right',
      n = 'Bottom',
      i = 'Left',
      o = (e < 3 ? [r, t, n, i] : [r + i, r + t, n + t, n + i]).map(function (
        a
      ) {
        return e < 2 ? s + a : 'border' + a + s
      })
    ys[e > 1 ? 'border' + s : s] = function (a, u, l, c, h) {
      var f, d
      if (arguments.length < 4)
        return (
          (f = o.map(function (g) {
            return vr(a, g, l)
          })),
          (d = f.join(' ')),
          d.split(f[0]).length === 5 ? f[0] : d
        )
      ;(f = (c + '').split(' ')),
        (d = {}),
        o.forEach(function (g, p) {
          return (d[g] = f[p] = f[p] || f[((p - 1) / 2) | 0])
        }),
        a.init(u, d, h)
    }
  })
  var Rl = {
    name: 'css',
    register: ta,
    targetTest: function (e) {
      return e.style && e.nodeType
    },
    init: function (e, r, t, n, i) {
      var o = this._props,
        a = e.style,
        u = t.vars.startAt,
        l,
        c,
        h,
        f,
        d,
        g,
        p,
        m,
        _,
        v,
        y,
        b,
        T,
        S,
        w,
        P
      Ko || ta(),
        (this.styles = this.styles || bl(e)),
        (P = this.styles.props),
        (this.tween = t)
      for (p in r)
        if (
          p !== 'autoRound' &&
          ((c = r[p]), !(St[p] && sl(p, r, t, n, e, i)))
        ) {
          if (
            ((d = typeof c),
            (g = ys[p]),
            d === 'function' && ((c = c.call(t, n, e, i)), (d = typeof c)),
            d === 'string' && ~c.indexOf('random(') && (c = gi(c)),
            g)
          )
            g(this, e, p, c, t) && (w = 1)
          else if (p.substr(0, 2) === '--')
            (l = (getComputedStyle(e).getPropertyValue(p) + '').trim()),
              (c += ''),
              (Dr.lastIndex = 0),
              Dr.test(l) || ((m = Qe(l)), (_ = Qe(c))),
              _ ? m !== _ && (l = Fr(e, p, l, _) + _) : m && (c += m),
              this.add(a, 'setProperty', l, c, n, i, 0, 0, p),
              o.push(p),
              P.push(p, 0, a[p])
          else if (d !== 'undefined') {
            if (
              (u && p in u
                ? ((l =
                    typeof u[p] == 'function' ? u[p].call(t, n, e, i) : u[p]),
                  ze(l) && ~l.indexOf('random(') && (l = gi(l)),
                  Qe(l + '') ||
                    l === 'auto' ||
                    (l += xt.units[p] || Qe(vr(e, p)) || ''),
                  (l + '').charAt(1) === '=' && (l = vr(e, p)))
                : (l = vr(e, p)),
              (f = parseFloat(l)),
              (v = d === 'string' && c.charAt(1) === '=' && c.substr(0, 2)),
              v && (c = c.substr(2)),
              (h = parseFloat(c)),
              p in sr &&
                (p === 'autoAlpha' &&
                  (f === 1 && vr(e, 'visibility') === 'hidden' && h && (f = 0),
                  P.push('visibility', 0, a.visibility),
                  Ir(
                    this,
                    a,
                    'visibility',
                    f ? 'inherit' : 'hidden',
                    h ? 'inherit' : 'hidden',
                    !h
                  )),
                p !== 'scale' &&
                  p !== 'transform' &&
                  ((p = sr[p]), ~p.indexOf(',') && (p = p.split(',')[0]))),
              (y = p in _r),
              y)
            ) {
              if (
                (this.styles.save(p),
                b ||
                  ((T = e._gsap),
                  (T.renderTransform && !r.parseTransform) ||
                    xi(e, r.parseTransform),
                  (S = r.smoothOrigin !== !1 && T.smooth),
                  (b = this._pt =
                    new _t(this._pt, a, we, 0, 1, T.renderTransform, T, 0, -1)),
                  (b.dep = 1)),
                p === 'scale')
              )
                (this._pt = new _t(
                  this._pt,
                  T,
                  'scaleY',
                  T.scaleY,
                  (v ? Dn(T.scaleY, v + h) : h) - T.scaleY || 0,
                  Jo
                )),
                  (this._pt.u = 0),
                  o.push('scaleY', p),
                  (p += 'X')
              else if (p === 'transformOrigin') {
                P.push(yt, 0, a[yt]),
                  (c = sd(c)),
                  T.svg
                    ? ia(e, c, 0, S, 0, this)
                    : ((_ = parseFloat(c.split(' ')[2]) || 0),
                      _ !== T.zOrigin && Ir(this, T, 'zOrigin', T.zOrigin, _),
                      Ir(this, a, p, bs(l), bs(c)))
                continue
              } else if (p === 'svgOrigin') {
                ia(e, c, 1, S, 0, this)
                continue
              } else if (p in kl) {
                ld(this, T, p, f, v ? Dn(f, v + c) : c)
                continue
              } else if (p === 'smoothOrigin') {
                Ir(this, T, 'smooth', T.smooth, c)
                continue
              } else if (p === 'force3D') {
                T[p] = c
                continue
              } else if (p === 'transform') {
                cd(this, c, e)
                continue
              }
            } else p in a || (p = Bn(p) || p)
            if (
              y ||
              ((h || h === 0) && (f || f === 0) && !Xh.test(c) && p in a)
            )
              (m = (l + '').substr((f + '').length)),
                h || (h = 0),
                (_ = Qe(c) || (p in xt.units ? xt.units[p] : m)),
                m !== _ && (f = Fr(e, p, l, _)),
                (this._pt = new _t(
                  this._pt,
                  y ? T : a,
                  p,
                  f,
                  (v ? Dn(f, v + h) : h) - f,
                  !y && (_ === 'px' || p === 'zIndex') && r.autoRound !== !1
                    ? Uh
                    : Jo
                )),
                (this._pt.u = _ || 0),
                m !== _ && _ !== '%' && ((this._pt.b = l), (this._pt.r = jh))
            else if (p in a) id.call(this, e, p, l, v ? v + c : c)
            else if (p in e) this.add(e, p, l || e[p], v ? v + c : c, n, i)
            else if (p !== 'parseTransform') {
              Po(p, c)
              continue
            }
            y || (p in a ? P.push(p, 0, a[p]) : P.push(p, 1, l || e[p])),
              o.push(p)
          }
        }
      w && fl(this)
    },
    render: function (e, r) {
      if (r.tween._time || !Zo())
        for (var t = r._pt; t; ) t.r(e, t.d), (t = t._next)
      else r.styles.revert()
    },
    get: vr,
    aliases: sr,
    getSetter: function (e, r, t) {
      var n = sr[r]
      return (
        n && n.indexOf(',') < 0 && (r = n),
        r in _r && r !== yt && (e._gsap.x || vr(e, 'x'))
          ? t && gl === t
            ? r === 'scale'
              ? Qh
              : Zh
            : (gl = t || {}) && (r === 'scale' ? Jh : ed)
          : e.style && !wo(e.style[r])
          ? Gh
          : ~r.indexOf('-')
          ? Kh
          : Xo(e, r)
      )
    },
    core: { _removeProperty: sn, _getMatrix: na },
  }
  ;(vt.utils.checkPrefix = Bn),
    (vt.core.getStyleSaver = bl),
    (function (s, e, r, t) {
      var n = mt(s + ',' + e + ',' + r, function (i) {
        _r[i] = 1
      })
      mt(e, function (i) {
        ;(xt.units[i] = 'deg'), (kl[i] = 1)
      }),
        (sr[n[13]] = s + ',' + e),
        mt(t, function (i) {
          var o = i.split(':')
          sr[o[1]] = n[o[0]]
        })
    })(
      'x,y,z,scale,scaleX,scaleY,xPercent,yPercent',
      'rotation,rotationX,rotationY,skewX,skewY',
      'transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
      '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY'
    ),
    mt(
      'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
      function (s) {
        xt.units[s] = 'px'
      }
    ),
    vt.registerPlugin(Rl)
  var $ = vt.registerPlugin(Rl) || vt
  $.core.Tween
  function fd(s, e) {
    for (var r = 0; r < e.length; r++) {
      var t = e[r]
      ;(t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        'value' in t && (t.writable = !0),
        Object.defineProperty(s, t.key, t)
    }
  }
  function hd(s, e, r) {
    return fd(s.prototype, e), s
  }
  /*!
   * Observer 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var He,
    ws,
    Pt,
    zr,
    Vr,
    qn,
    Ll,
    un,
    Si,
    Il,
    yr,
    Bt,
    Fl,
    zl = function () {
      return (
        He ||
        (typeof window < 'u' && (He = window.gsap) && He.registerPlugin && He)
      )
    },
    Vl = 1,
    $n = [],
    re = [],
    ar = [],
    Ci = Date.now,
    oa = function (e, r) {
      return r
    },
    dd = function () {
      var e = Si.core,
        r = e.bridge || {},
        t = e._scrollers,
        n = e._proxies
      t.push.apply(t, re),
        n.push.apply(n, ar),
        (re = t),
        (ar = n),
        (oa = function (o, a) {
          return r[o](a)
        })
    },
    Nr = function (e, r) {
      return ~ar.indexOf(e) && ar[ar.indexOf(e) + 1][r]
    },
    Ei = function (e) {
      return !!~Il.indexOf(e)
    },
    ot = function (e, r, t, n, i) {
      return e.addEventListener(r, t, { passive: n !== !1, capture: !!i })
    },
    at = function (e, r, t, n) {
      return e.removeEventListener(r, t, !!n)
    },
    xs = 'scrollLeft',
    Ts = 'scrollTop',
    aa = function () {
      return (yr && yr.isPressed) || re.cache++
    },
    Ss = function (e, r) {
      var t = function n(i) {
        if (i || i === 0) {
          Vl && (Pt.history.scrollRestoration = 'manual')
          var o = yr && yr.isPressed
          ;(i = n.v = Math.round(i) || (yr && yr.iOS ? 1 : 0)),
            e(i),
            (n.cacheID = re.cache),
            o && oa('ss', i)
        } else
          (r || re.cache !== n.cacheID || oa('ref')) &&
            ((n.cacheID = re.cache), (n.v = e()))
        return n.v + n.offset
      }
      return (t.offset = 0), e && t
    },
    ut = {
      s: xs,
      p: 'left',
      p2: 'Left',
      os: 'right',
      os2: 'Right',
      d: 'width',
      d2: 'Width',
      a: 'x',
      sc: Ss(function (s) {
        return arguments.length
          ? Pt.scrollTo(s, Le.sc())
          : Pt.pageXOffset || zr[xs] || Vr[xs] || qn[xs] || 0
      }),
    },
    Le = {
      s: Ts,
      p: 'top',
      p2: 'Top',
      os: 'bottom',
      os2: 'Bottom',
      d: 'height',
      d2: 'Height',
      a: 'y',
      op: ut,
      sc: Ss(function (s) {
        return arguments.length
          ? Pt.scrollTo(ut.sc(), s)
          : Pt.pageYOffset || zr[Ts] || Vr[Ts] || qn[Ts] || 0
      }),
    },
    bt = function (e, r) {
      return (
        ((r && r._ctx && r._ctx.selector) || He.utils.toArray)(e)[0] ||
        (typeof e == 'string' && He.config().nullTargetWarn !== !1
          ? console.warn('Element not found:', e)
          : null)
      )
    },
    Br = function (e, r) {
      var t = r.s,
        n = r.sc
      Ei(e) && (e = zr.scrollingElement || Vr)
      var i = re.indexOf(e),
        o = n === Le.sc ? 1 : 2
      !~i && (i = re.push(e) - 1), re[i + o] || ot(e, 'scroll', aa)
      var a = re[i + o],
        u =
          a ||
          (re[i + o] =
            Ss(Nr(e, t), !0) ||
            (Ei(e)
              ? n
              : Ss(function (l) {
                  return arguments.length ? (e[t] = l) : e[t]
                })))
      return (
        (u.target = e),
        a || (u.smooth = He.getProperty(e, 'scrollBehavior') === 'smooth'),
        u
      )
    },
    ua = function (e, r, t) {
      var n = e,
        i = e,
        o = Ci(),
        a = o,
        u = r || 50,
        l = Math.max(500, u * 3),
        c = function (g, p) {
          var m = Ci()
          p || m - o > u
            ? ((i = n), (n = g), (a = o), (o = m))
            : t
            ? (n += g)
            : (n = i + ((g - i) / (m - a)) * (o - a))
        },
        h = function () {
          ;(i = n = t ? 0 : n), (a = o = 0)
        },
        f = function (g) {
          var p = a,
            m = i,
            _ = Ci()
          return (
            (g || g === 0) && g !== n && c(g),
            o === a || _ - a > l
              ? 0
              : ((n + (t ? m : -m)) / ((t ? _ : o) - p)) * 1e3
          )
        }
      return { update: c, reset: h, getVelocity: f }
    },
    Pi = function (e, r) {
      return (
        r && !e._gsapAllow && e.preventDefault(),
        e.changedTouches ? e.changedTouches[0] : e
      )
    },
    Nl = function (e) {
      var r = Math.max.apply(Math, e),
        t = Math.min.apply(Math, e)
      return Math.abs(r) >= Math.abs(t) ? r : t
    },
    Bl = function () {
      ;(Si = He.core.globals().ScrollTrigger), Si && Si.core && dd()
    },
    ql = function (e) {
      return (
        (He = e || zl()),
        !ws &&
          He &&
          typeof document < 'u' &&
          document.body &&
          ((Pt = window),
          (zr = document),
          (Vr = zr.documentElement),
          (qn = zr.body),
          (Il = [Pt, zr, Vr, qn]),
          He.utils.clamp,
          (Fl = He.core.context || function () {}),
          (un = 'onpointerenter' in qn ? 'pointer' : 'mouse'),
          (Ll = Pe.isTouch =
            Pt.matchMedia &&
            Pt.matchMedia('(hover: none), (pointer: coarse)').matches
              ? 1
              : 'ontouchstart' in Pt ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
              ? 2
              : 0),
          (Bt = Pe.eventTypes =
            (
              'ontouchstart' in Vr
                ? 'touchstart,touchmove,touchcancel,touchend'
                : 'onpointerdown' in Vr
                ? 'pointerdown,pointermove,pointercancel,pointerup'
                : 'mousedown,mousemove,mouseup,mouseup'
            ).split(',')),
          setTimeout(function () {
            return (Vl = 0)
          }, 500),
          Bl(),
          (ws = 1)),
        ws
      )
    }
  ;(ut.op = Le), (re.cache = 0)
  var Pe = (function () {
    function s(r) {
      this.init(r)
    }
    var e = s.prototype
    return (
      (e.init = function (t) {
        ws || ql(He) || console.warn('Please gsap.registerPlugin(Observer)'),
          Si || Bl()
        var n = t.tolerance,
          i = t.dragMinimum,
          o = t.type,
          a = t.target,
          u = t.lineHeight,
          l = t.debounce,
          c = t.preventDefault,
          h = t.onStop,
          f = t.onStopDelay,
          d = t.ignore,
          g = t.wheelSpeed,
          p = t.event,
          m = t.onDragStart,
          _ = t.onDragEnd,
          v = t.onDrag,
          y = t.onPress,
          b = t.onRelease,
          T = t.onRight,
          S = t.onLeft,
          w = t.onUp,
          P = t.onDown,
          E = t.onChangeX,
          C = t.onChangeY,
          L = t.onChange,
          k = t.onToggleX,
          R = t.onToggleY,
          A = t.onHover,
          O = t.onHoverEnd,
          D = t.onMove,
          I = t.ignoreCheck,
          F = t.isNormalizer,
          z = t.onGestureStart,
          x = t.onGestureEnd,
          N = t.onWheel,
          H = t.onEnable,
          ae = t.onDisable,
          ee = t.onClick,
          G = t.scrollSpeed,
          W = t.capture,
          ce = t.allowClicks,
          K = t.lockAxis,
          _e = t.onLockAxis
        ;(this.target = a = bt(a) || Vr),
          (this.vars = t),
          d && (d = He.utils.toArray(d)),
          (n = n || 1e-9),
          (i = i || 0),
          (g = g || 1),
          (G = G || 1),
          (o = o || 'wheel,touch,pointer'),
          (l = l !== !1),
          u || (u = parseFloat(Pt.getComputedStyle(qn).lineHeight) || 22)
        var ue,
          fe,
          qe,
          Y,
          ne,
          Xe,
          We,
          M = this,
          ke = 0,
          Wt = 0,
          Vt = t.passive || !c,
          q = Br(a, ut),
          jt = Br(a, Le),
          Tn = q(),
          ni = jt(),
          $e =
            ~o.indexOf('touch') &&
            !~o.indexOf('pointer') &&
            Bt[0] === 'pointerdown',
          Hr = Ei(a),
          Oe = a.ownerDocument || zr,
          Ut = [0, 0, 0],
          Nt = [0, 0, 0],
          Sr = 0,
          Ji = function () {
            return (Sr = Ci())
          },
          Re = function (U, he) {
            return (
              ((M.event = U) && d && ~d.indexOf(U.target)) ||
              (he && $e && U.pointerType !== 'touch') ||
              (I && I(U, he))
            )
          },
          lo = function () {
            M._vx.reset(), M._vy.reset(), fe.pause(), h && h(M)
          },
          Xr = function () {
            var U = (M.deltaX = Nl(Ut)),
              he = (M.deltaY = Nl(Nt)),
              V = Math.abs(U) >= n,
              J = Math.abs(he) >= n
            L && (V || J) && L(M, U, he, Ut, Nt),
              V &&
                (T && M.deltaX > 0 && T(M),
                S && M.deltaX < 0 && S(M),
                E && E(M),
                k && M.deltaX < 0 != ke < 0 && k(M),
                (ke = M.deltaX),
                (Ut[0] = Ut[1] = Ut[2] = 0)),
              J &&
                (P && M.deltaY > 0 && P(M),
                w && M.deltaY < 0 && w(M),
                C && C(M),
                R && M.deltaY < 0 != Wt < 0 && R(M),
                (Wt = M.deltaY),
                (Nt[0] = Nt[1] = Nt[2] = 0)),
              (Y || qe) && (D && D(M), qe && (v(M), (qe = !1)), (Y = !1)),
              Xe && !(Xe = !1) && _e && _e(M),
              ne && (N(M), (ne = !1)),
              (ue = 0)
          },
          ii = function (U, he, V) {
            ;(Ut[V] += U),
              (Nt[V] += he),
              M._vx.update(U),
              M._vy.update(he),
              l ? ue || (ue = requestAnimationFrame(Xr)) : Xr()
          },
          si = function (U, he) {
            K &&
              !We &&
              ((M.axis = We = Math.abs(U) > Math.abs(he) ? 'x' : 'y'),
              (Xe = !0)),
              We !== 'y' && ((Ut[2] += U), M._vx.update(U, !0)),
              We !== 'x' && ((Nt[2] += he), M._vy.update(he, !0)),
              l ? ue || (ue = requestAnimationFrame(Xr)) : Xr()
          },
          Wr = function (U) {
            if (!Re(U, 1)) {
              U = Pi(U, c)
              var he = U.clientX,
                V = U.clientY,
                J = he - M.x,
                j = V - M.y,
                Z = M.isDragging
              ;(M.x = he),
                (M.y = V),
                (Z ||
                  Math.abs(M.startX - he) >= i ||
                  Math.abs(M.startY - V) >= i) &&
                  (v && (qe = !0),
                  Z || (M.isDragging = !0),
                  si(J, j),
                  Z || (m && m(M)))
            }
          },
          Sn = (M.onPress = function (Q) {
            Re(Q, 1) ||
              (Q && Q.button) ||
              ((M.axis = We = null),
              fe.pause(),
              (M.isPressed = !0),
              (Q = Pi(Q)),
              (ke = Wt = 0),
              (M.startX = M.x = Q.clientX),
              (M.startY = M.y = Q.clientY),
              M._vx.reset(),
              M._vy.reset(),
              ot(F ? a : Oe, Bt[1], Wr, Vt, !0),
              (M.deltaX = M.deltaY = 0),
              y && y(M))
          }),
          ie = (M.onRelease = function (Q) {
            if (!Re(Q, 1)) {
              at(F ? a : Oe, Bt[1], Wr, !0)
              var U = !isNaN(M.y - M.startY),
                he = M.isDragging,
                V =
                  he &&
                  (Math.abs(M.x - M.startX) > 3 ||
                    Math.abs(M.y - M.startY) > 3),
                J = Pi(Q)
              !V &&
                U &&
                (M._vx.reset(),
                M._vy.reset(),
                c &&
                  ce &&
                  He.delayedCall(0.08, function () {
                    if (Ci() - Sr > 300 && !Q.defaultPrevented) {
                      if (Q.target.click) Q.target.click()
                      else if (Oe.createEvent) {
                        var j = Oe.createEvent('MouseEvents')
                        j.initMouseEvent(
                          'click',
                          !0,
                          !0,
                          Pt,
                          1,
                          J.screenX,
                          J.screenY,
                          J.clientX,
                          J.clientY,
                          !1,
                          !1,
                          !1,
                          !1,
                          0,
                          null
                        ),
                          Q.target.dispatchEvent(j)
                      }
                    }
                  })),
                (M.isDragging = M.isGesturing = M.isPressed = !1),
                h && he && !F && fe.restart(!0),
                _ && he && _(M),
                b && b(M, V)
            }
          }),
          Cn = function (U) {
            return (
              U.touches &&
              U.touches.length > 1 &&
              (M.isGesturing = !0) &&
              z(U, M.isDragging)
            )
          },
          Gt = function () {
            return (M.isGesturing = !1) || x(M)
          },
          Kt = function (U) {
            if (!Re(U)) {
              var he = q(),
                V = jt()
              ii((he - Tn) * G, (V - ni) * G, 1),
                (Tn = he),
                (ni = V),
                h && fe.restart(!0)
            }
          },
          Zt = function (U) {
            if (!Re(U)) {
              ;(U = Pi(U, c)), N && (ne = !0)
              var he =
                (U.deltaMode === 1
                  ? u
                  : U.deltaMode === 2
                  ? Pt.innerHeight
                  : 1) * g
              ii(U.deltaX * he, U.deltaY * he, 0), h && !F && fe.restart(!0)
            }
          },
          En = function (U) {
            if (!Re(U)) {
              var he = U.clientX,
                V = U.clientY,
                J = he - M.x,
                j = V - M.y
              ;(M.x = he),
                (M.y = V),
                (Y = !0),
                h && fe.restart(!0),
                (J || j) && si(J, j)
            }
          },
          oi = function (U) {
            ;(M.event = U), A(M)
          },
          Cr = function (U) {
            ;(M.event = U), O(M)
          },
          es = function (U) {
            return Re(U) || (Pi(U, c) && ee(M))
          }
        ;(fe = M._dc = He.delayedCall(f || 0.25, lo).pause()),
          (M.deltaX = M.deltaY = 0),
          (M._vx = ua(0, 50, !0)),
          (M._vy = ua(0, 50, !0)),
          (M.scrollX = q),
          (M.scrollY = jt),
          (M.isDragging = M.isGesturing = M.isPressed = !1),
          Fl(this),
          (M.enable = function (Q) {
            return (
              M.isEnabled ||
                (ot(Hr ? Oe : a, 'scroll', aa),
                o.indexOf('scroll') >= 0 &&
                  ot(Hr ? Oe : a, 'scroll', Kt, Vt, W),
                o.indexOf('wheel') >= 0 && ot(a, 'wheel', Zt, Vt, W),
                ((o.indexOf('touch') >= 0 && Ll) ||
                  o.indexOf('pointer') >= 0) &&
                  (ot(a, Bt[0], Sn, Vt, W),
                  ot(Oe, Bt[2], ie),
                  ot(Oe, Bt[3], ie),
                  ce && ot(a, 'click', Ji, !0, !0),
                  ee && ot(a, 'click', es),
                  z && ot(Oe, 'gesturestart', Cn),
                  x && ot(Oe, 'gestureend', Gt),
                  A && ot(a, un + 'enter', oi),
                  O && ot(a, un + 'leave', Cr),
                  D && ot(a, un + 'move', En)),
                (M.isEnabled = !0),
                Q && Q.type && Sn(Q),
                H && H(M)),
              M
            )
          }),
          (M.disable = function () {
            M.isEnabled &&
              ($n.filter(function (Q) {
                return Q !== M && Ei(Q.target)
              }).length || at(Hr ? Oe : a, 'scroll', aa),
              M.isPressed &&
                (M._vx.reset(), M._vy.reset(), at(F ? a : Oe, Bt[1], Wr, !0)),
              at(Hr ? Oe : a, 'scroll', Kt, W),
              at(a, 'wheel', Zt, W),
              at(a, Bt[0], Sn, W),
              at(Oe, Bt[2], ie),
              at(Oe, Bt[3], ie),
              at(a, 'click', Ji, !0),
              at(a, 'click', es),
              at(Oe, 'gesturestart', Cn),
              at(Oe, 'gestureend', Gt),
              at(a, un + 'enter', oi),
              at(a, un + 'leave', Cr),
              at(a, un + 'move', En),
              (M.isEnabled = M.isPressed = M.isDragging = !1),
              ae && ae(M))
          }),
          (M.kill = M.revert =
            function () {
              M.disable()
              var Q = $n.indexOf(M)
              Q >= 0 && $n.splice(Q, 1), yr === M && (yr = 0)
            }),
          $n.push(M),
          F && Ei(a) && (yr = M),
          M.enable(p)
      }),
      hd(s, [
        {
          key: 'velocityX',
          get: function () {
            return this._vx.getVelocity()
          },
        },
        {
          key: 'velocityY',
          get: function () {
            return this._vy.getVelocity()
          },
        },
      ]),
      s
    )
  })()
  ;(Pe.version = '3.12.5'),
    (Pe.create = function (s) {
      return new Pe(s)
    }),
    (Pe.register = ql),
    (Pe.getAll = function () {
      return $n.slice()
    }),
    (Pe.getById = function (s) {
      return $n.filter(function (e) {
        return e.vars.id === s
      })[0]
    }),
    zl() && He.registerPlugin(Pe)
  /*!
   * ScrollTrigger 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var B,
    Yn,
    oe,
    xe,
    qt,
    ge,
    $l,
    Cs,
    ki,
    Oi,
    Ai,
    Es,
    Je,
    Ps,
    la,
    lt,
    Yl,
    Hl,
    Hn,
    Xl,
    ca,
    Wl,
    ct,
    fa,
    jl,
    Ul,
    qr,
    ha,
    da,
    Xn,
    pa,
    ks,
    ga,
    ma,
    Os = 1,
    et = Date.now,
    _a = et(),
    Lt = 0,
    Mi = 0,
    Gl = function (e, r, t) {
      var n = kt(e) && (e.substr(0, 6) === 'clamp(' || e.indexOf('max') > -1)
      return (t['_' + r + 'Clamp'] = n), n ? e.substr(6, e.length - 7) : e
    },
    Kl = function (e, r) {
      return r && (!kt(e) || e.substr(0, 6) !== 'clamp(')
        ? 'clamp(' + e + ')'
        : e
    },
    pd = function s() {
      return Mi && requestAnimationFrame(s)
    },
    Zl = function () {
      return (Ps = 1)
    },
    Ql = function () {
      return (Ps = 0)
    },
    ur = function (e) {
      return e
    },
    Di = function (e) {
      return Math.round(e * 1e5) / 1e5 || 0
    },
    Jl = function () {
      return typeof window < 'u'
    },
    ec = function () {
      return B || (Jl() && (B = window.gsap) && B.registerPlugin && B)
    },
    ln = function (e) {
      return !!~$l.indexOf(e)
    },
    tc = function (e) {
      return (
        (e === 'Height' ? pa : oe['inner' + e]) ||
        qt['client' + e] ||
        ge['client' + e]
      )
    },
    rc = function (e) {
      return (
        Nr(e, 'getBoundingClientRect') ||
        (ln(e)
          ? function () {
              return ($s.width = oe.innerWidth), ($s.height = pa), $s
            }
          : function () {
              return br(e)
            })
      )
    },
    gd = function (e, r, t) {
      var n = t.d,
        i = t.d2,
        o = t.a
      return (o = Nr(e, 'getBoundingClientRect'))
        ? function () {
            return o()[n]
          }
        : function () {
            return (r ? tc(i) : e['client' + i]) || 0
          }
    },
    md = function (e, r) {
      return !r || ~ar.indexOf(e)
        ? rc(e)
        : function () {
            return $s
          }
    },
    lr = function (e, r) {
      var t = r.s,
        n = r.d2,
        i = r.d,
        o = r.a
      return Math.max(
        0,
        (t = 'scroll' + n) && (o = Nr(e, t))
          ? o() - rc(e)()[i]
          : ln(e)
          ? (qt[t] || ge[t]) - tc(n)
          : e[t] - e['offset' + n]
      )
    },
    As = function (e, r) {
      for (var t = 0; t < Hn.length; t += 3)
        (!r || ~r.indexOf(Hn[t + 1])) && e(Hn[t], Hn[t + 1], Hn[t + 2])
    },
    kt = function (e) {
      return typeof e == 'string'
    },
    ft = function (e) {
      return typeof e == 'function'
    },
    Ri = function (e) {
      return typeof e == 'number'
    },
    cn = function (e) {
      return typeof e == 'object'
    },
    Li = function (e, r, t) {
      return e && e.progress(r ? 0 : 1) && t && e.pause()
    },
    va = function (e, r) {
      if (e.enabled) {
        var t = e._ctx
          ? e._ctx.add(function () {
              return r(e)
            })
          : r(e)
        t && t.totalTime && (e.callbackAnimation = t)
      }
    },
    Wn = Math.abs,
    nc = 'left',
    ic = 'top',
    ya = 'right',
    ba = 'bottom',
    fn = 'width',
    hn = 'height',
    Ii = 'Right',
    Fi = 'Left',
    zi = 'Top',
    Vi = 'Bottom',
    De = 'padding',
    It = 'margin',
    jn = 'Width',
    wa = 'Height',
    Ie = 'px',
    Ft = function (e) {
      return oe.getComputedStyle(e)
    },
    _d = function (e) {
      var r = Ft(e).position
      e.style.position = r === 'absolute' || r === 'fixed' ? r : 'relative'
    },
    sc = function (e, r) {
      for (var t in r) t in e || (e[t] = r[t])
      return e
    },
    br = function (e, r) {
      var t =
          r &&
          Ft(e)[la] !== 'matrix(1, 0, 0, 1, 0, 0)' &&
          B.to(e, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
          }).progress(1),
        n = e.getBoundingClientRect()
      return t && t.progress(0).kill(), n
    },
    Ms = function (e, r) {
      var t = r.d2
      return e['offset' + t] || e['client' + t] || 0
    },
    oc = function (e) {
      var r = [],
        t = e.labels,
        n = e.duration(),
        i
      for (i in t) r.push(t[i] / n)
      return r
    },
    vd = function (e) {
      return function (r) {
        return B.utils.snap(oc(e), r)
      }
    },
    xa = function (e) {
      var r = B.utils.snap(e),
        t =
          Array.isArray(e) &&
          e.slice(0).sort(function (n, i) {
            return n - i
          })
      return t
        ? function (n, i, o) {
            o === void 0 && (o = 0.001)
            var a
            if (!i) return r(n)
            if (i > 0) {
              for (n -= o, a = 0; a < t.length; a++) if (t[a] >= n) return t[a]
              return t[a - 1]
            } else for (a = t.length, n += o; a--; ) if (t[a] <= n) return t[a]
            return t[0]
          }
        : function (n, i, o) {
            o === void 0 && (o = 0.001)
            var a = r(n)
            return !i || Math.abs(a - n) < o || a - n < 0 == i < 0
              ? a
              : r(i < 0 ? n - e : n + e)
          }
    },
    yd = function (e) {
      return function (r, t) {
        return xa(oc(e))(r, t.direction)
      }
    },
    Ds = function (e, r, t, n) {
      return t.split(',').forEach(function (i) {
        return e(r, i, n)
      })
    },
    Ne = function (e, r, t, n, i) {
      return e.addEventListener(r, t, { passive: !n, capture: !!i })
    },
    Be = function (e, r, t, n) {
      return e.removeEventListener(r, t, !!n)
    },
    Rs = function (e, r, t) {
      ;(t = t && t.wheelHandler), t && (e(r, 'wheel', t), e(r, 'touchmove', t))
    },
    ac = {
      startColor: 'green',
      endColor: 'red',
      indent: 0,
      fontSize: '16px',
      fontWeight: 'normal',
    },
    Ls = { toggleActions: 'play', anticipatePin: 0 },
    Is = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
    Fs = function (e, r) {
      if (kt(e)) {
        var t = e.indexOf('='),
          n = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0
        ~t && (e.indexOf('%') > t && (n *= r / 100), (e = e.substr(0, t - 1))),
          (e =
            n +
            (e in Is
              ? Is[e] * r
              : ~e.indexOf('%')
              ? (parseFloat(e) * r) / 100
              : parseFloat(e) || 0))
      }
      return e
    },
    zs = function (e, r, t, n, i, o, a, u) {
      var l = i.startColor,
        c = i.endColor,
        h = i.fontSize,
        f = i.indent,
        d = i.fontWeight,
        g = xe.createElement('div'),
        p = ln(t) || Nr(t, 'pinType') === 'fixed',
        m = e.indexOf('scroller') !== -1,
        _ = p ? ge : t,
        v = e.indexOf('start') !== -1,
        y = v ? l : c,
        b =
          'border-color:' +
          y +
          ';font-size:' +
          h +
          ';color:' +
          y +
          ';font-weight:' +
          d +
          ';pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;'
      return (
        (b += 'position:' + ((m || u) && p ? 'fixed;' : 'absolute;')),
        (m || u || !p) &&
          (b += (n === Le ? ya : ba) + ':' + (o + parseFloat(f)) + 'px;'),
        a &&
          (b +=
            'box-sizing:border-box;text-align:left;width:' +
            a.offsetWidth +
            'px;'),
        (g._isStart = v),
        g.setAttribute('class', 'gsap-marker-' + e + (r ? ' marker-' + r : '')),
        (g.style.cssText = b),
        (g.innerText = r || r === 0 ? e + '-' + r : e),
        _.children[0] ? _.insertBefore(g, _.children[0]) : _.appendChild(g),
        (g._offset = g['offset' + n.op.d2]),
        Vs(g, 0, n, v),
        g
      )
    },
    Vs = function (e, r, t, n) {
      var i = { display: 'block' },
        o = t[n ? 'os2' : 'p2'],
        a = t[n ? 'p2' : 'os2']
      ;(e._isFlipped = n),
        (i[t.a + 'Percent'] = n ? -100 : 0),
        (i[t.a] = n ? '1px' : 0),
        (i['border' + o + jn] = 1),
        (i['border' + a + jn] = 0),
        (i[t.p] = r + 'px'),
        B.set(e, i)
    },
    te = [],
    Ta = {},
    Ni,
    uc = function () {
      return et() - Lt > 34 && (Ni || (Ni = requestAnimationFrame(wr)))
    },
    Un = function () {
      ;(!ct || !ct.isPressed || ct.startX > ge.clientWidth) &&
        (re.cache++,
        ct ? Ni || (Ni = requestAnimationFrame(wr)) : wr(),
        Lt || pn('scrollStart'),
        (Lt = et()))
    },
    Sa = function () {
      ;(Ul = oe.innerWidth), (jl = oe.innerHeight)
    },
    Bi = function () {
      re.cache++,
        !Je &&
          !Wl &&
          !xe.fullscreenElement &&
          !xe.webkitFullscreenElement &&
          (!fa ||
            Ul !== oe.innerWidth ||
            Math.abs(oe.innerHeight - jl) > oe.innerHeight * 0.25) &&
          Cs.restart(!0)
    },
    dn = {},
    bd = [],
    lc = function s() {
      return Be(X, 'scrollEnd', s) || mn(!0)
    },
    pn = function (e) {
      return (
        (dn[e] &&
          dn[e].map(function (r) {
            return r()
          })) ||
        bd
      )
    },
    Ot = [],
    cc = function (e) {
      for (var r = 0; r < Ot.length; r += 5)
        (!e || (Ot[r + 4] && Ot[r + 4].query === e)) &&
          ((Ot[r].style.cssText = Ot[r + 1]),
          Ot[r].getBBox && Ot[r].setAttribute('transform', Ot[r + 2] || ''),
          (Ot[r + 3].uncache = 1))
    },
    Ca = function (e, r) {
      var t
      for (lt = 0; lt < te.length; lt++)
        (t = te[lt]),
          t && (!r || t._ctx === r) && (e ? t.kill(1) : t.revert(!0, !0))
      ;(ks = !0), r && cc(r), r || pn('revert')
    },
    fc = function (e, r) {
      re.cache++,
        (r || !ht) &&
          re.forEach(function (t) {
            return ft(t) && t.cacheID++ && (t.rec = 0)
          }),
        kt(e) && (oe.history.scrollRestoration = da = e)
    },
    ht,
    gn = 0,
    hc,
    wd = function () {
      if (hc !== gn) {
        var e = (hc = gn)
        requestAnimationFrame(function () {
          return e === gn && mn(!0)
        })
      }
    },
    dc = function () {
      ge.appendChild(Xn),
        (pa = (!ct && Xn.offsetHeight) || oe.innerHeight),
        ge.removeChild(Xn)
    },
    pc = function (e) {
      return ki(
        '.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end'
      ).forEach(function (r) {
        return (r.style.display = e ? 'none' : 'block')
      })
    },
    mn = function (e, r) {
      if (Lt && !e && !ks) {
        Ne(X, 'scrollEnd', lc)
        return
      }
      dc(),
        (ht = X.isRefreshing = !0),
        re.forEach(function (n) {
          return ft(n) && ++n.cacheID && (n.rec = n())
        })
      var t = pn('refreshInit')
      Xl && X.sort(),
        r || Ca(),
        re.forEach(function (n) {
          ft(n) && (n.smooth && (n.target.style.scrollBehavior = 'auto'), n(0))
        }),
        te.slice(0).forEach(function (n) {
          return n.refresh()
        }),
        (ks = !1),
        te.forEach(function (n) {
          if (n._subPinOffset && n.pin) {
            var i = n.vars.horizontal ? 'offsetWidth' : 'offsetHeight',
              o = n.pin[i]
            n.revert(!0, 1), n.adjustPinSpacing(n.pin[i] - o), n.refresh()
          }
        }),
        (ga = 1),
        pc(!0),
        te.forEach(function (n) {
          var i = lr(n.scroller, n._dir),
            o = n.vars.end === 'max' || (n._endClamp && n.end > i),
            a = n._startClamp && n.start >= i
          ;(o || a) &&
            n.setPositions(
              a ? i - 1 : n.start,
              o ? Math.max(a ? i : n.start + 1, i) : n.end,
              !0
            )
        }),
        pc(!1),
        (ga = 0),
        t.forEach(function (n) {
          return n && n.render && n.render(-1)
        }),
        re.forEach(function (n) {
          ft(n) &&
            (n.smooth &&
              requestAnimationFrame(function () {
                return (n.target.style.scrollBehavior = 'smooth')
              }),
            n.rec && n(n.rec))
        }),
        fc(da, 1),
        Cs.pause(),
        gn++,
        (ht = 2),
        wr(2),
        te.forEach(function (n) {
          return ft(n.vars.onRefresh) && n.vars.onRefresh(n)
        }),
        (ht = X.isRefreshing = !1),
        pn('refresh')
    },
    Ea = 0,
    Ns = 1,
    qi,
    wr = function (e) {
      if (e === 2 || (!ht && !ks)) {
        ;(X.isUpdating = !0), qi && qi.update(0)
        var r = te.length,
          t = et(),
          n = t - _a >= 50,
          i = r && te[0].scroll()
        if (
          ((Ns = Ea > i ? -1 : 1),
          ht || (Ea = i),
          n &&
            (Lt && !Ps && t - Lt > 200 && ((Lt = 0), pn('scrollEnd')),
            (Ai = _a),
            (_a = t)),
          Ns < 0)
        ) {
          for (lt = r; lt-- > 0; ) te[lt] && te[lt].update(0, n)
          Ns = 1
        } else for (lt = 0; lt < r; lt++) te[lt] && te[lt].update(0, n)
        X.isUpdating = !1
      }
      Ni = 0
    },
    Pa = [
      nc,
      ic,
      ba,
      ya,
      It + Vi,
      It + Ii,
      It + zi,
      It + Fi,
      'display',
      'flexShrink',
      'float',
      'zIndex',
      'gridColumnStart',
      'gridColumnEnd',
      'gridRowStart',
      'gridRowEnd',
      'gridArea',
      'justifySelf',
      'alignSelf',
      'placeSelf',
      'order',
    ],
    Bs = Pa.concat([
      fn,
      hn,
      'boxSizing',
      'max' + jn,
      'max' + wa,
      'position',
      It,
      De,
      De + zi,
      De + Ii,
      De + Vi,
      De + Fi,
    ]),
    xd = function (e, r, t) {
      Gn(t)
      var n = e._gsap
      if (n.spacerIsNative) Gn(n.spacerState)
      else if (e._gsap.swappedIn) {
        var i = r.parentNode
        i && (i.insertBefore(e, r), i.removeChild(r))
      }
      e._gsap.swappedIn = !1
    },
    ka = function (e, r, t, n) {
      if (!e._gsap.swappedIn) {
        for (var i = Pa.length, o = r.style, a = e.style, u; i--; )
          (u = Pa[i]), (o[u] = t[u])
        ;(o.position = t.position === 'absolute' ? 'absolute' : 'relative'),
          t.display === 'inline' && (o.display = 'inline-block'),
          (a[ba] = a[ya] = 'auto'),
          (o.flexBasis = t.flexBasis || 'auto'),
          (o.overflow = 'visible'),
          (o.boxSizing = 'border-box'),
          (o[fn] = Ms(e, ut) + Ie),
          (o[hn] = Ms(e, Le) + Ie),
          (o[De] = a[It] = a[ic] = a[nc] = '0'),
          Gn(n),
          (a[fn] = a['max' + jn] = t[fn]),
          (a[hn] = a['max' + wa] = t[hn]),
          (a[De] = t[De]),
          e.parentNode !== r &&
            (e.parentNode.insertBefore(r, e), r.appendChild(e)),
          (e._gsap.swappedIn = !0)
      }
    },
    Td = /([A-Z])/g,
    Gn = function (e) {
      if (e) {
        var r = e.t.style,
          t = e.length,
          n = 0,
          i,
          o
        for ((e.t._gsap || B.core.getCache(e.t)).uncache = 1; n < t; n += 2)
          (o = e[n + 1]),
            (i = e[n]),
            o
              ? (r[i] = o)
              : r[i] && r.removeProperty(i.replace(Td, '-$1').toLowerCase())
      }
    },
    qs = function (e) {
      for (var r = Bs.length, t = e.style, n = [], i = 0; i < r; i++)
        n.push(Bs[i], t[Bs[i]])
      return (n.t = e), n
    },
    Sd = function (e, r, t) {
      for (var n = [], i = e.length, o = t ? 8 : 0, a; o < i; o += 2)
        (a = e[o]), n.push(a, a in r ? r[a] : e[o + 1])
      return (n.t = e.t), n
    },
    $s = { left: 0, top: 0 },
    gc = function (e, r, t, n, i, o, a, u, l, c, h, f, d, g) {
      ft(e) && (e = e(u)),
        kt(e) &&
          e.substr(0, 3) === 'max' &&
          (e = f + (e.charAt(4) === '=' ? Fs('0' + e.substr(3), t) : 0))
      var p = d ? d.time() : 0,
        m,
        _,
        v
      if ((d && d.seek(0), isNaN(e) || (e = +e), Ri(e)))
        d &&
          (e = B.utils.mapRange(
            d.scrollTrigger.start,
            d.scrollTrigger.end,
            0,
            f,
            e
          )),
          a && Vs(a, t, n, !0)
      else {
        ft(r) && (r = r(u))
        var y = (e || '0').split(' '),
          b,
          T,
          S,
          w
        ;(v = bt(r, u) || ge),
          (b = br(v) || {}),
          (!b || (!b.left && !b.top)) &&
            Ft(v).display === 'none' &&
            ((w = v.style.display),
            (v.style.display = 'block'),
            (b = br(v)),
            w ? (v.style.display = w) : v.style.removeProperty('display')),
          (T = Fs(y[0], b[n.d])),
          (S = Fs(y[1] || '0', t)),
          (e = b[n.p] - l[n.p] - c + T + i - S),
          a && Vs(a, S, n, t - S < 20 || (a._isStart && S > 20)),
          (t -= t - S)
      }
      if ((g && ((u[g] = e || -0.001), e < 0 && (e = 0)), o)) {
        var P = e + t,
          E = o._isStart
        ;(m = 'scroll' + n.d2),
          Vs(
            o,
            P,
            n,
            (E && P > 20) ||
              (!E && (h ? Math.max(ge[m], qt[m]) : o.parentNode[m]) <= P + 1)
          ),
          h &&
            ((l = br(a)),
            h && (o.style[n.op.p] = l[n.op.p] - n.op.m - o._offset + Ie))
      }
      return (
        d &&
          v &&
          ((m = br(v)),
          d.seek(f),
          (_ = br(v)),
          (d._caScrollDist = m[n.p] - _[n.p]),
          (e = (e / d._caScrollDist) * f)),
        d && d.seek(p),
        d ? e : Math.round(e)
      )
    },
    Cd = /(webkit|moz|length|cssText|inset)/i,
    mc = function (e, r, t, n) {
      if (e.parentNode !== r) {
        var i = e.style,
          o,
          a
        if (r === ge) {
          ;(e._stOrig = i.cssText), (a = Ft(e))
          for (o in a)
            !+o &&
              !Cd.test(o) &&
              a[o] &&
              typeof i[o] == 'string' &&
              o !== '0' &&
              (i[o] = a[o])
          ;(i.top = t), (i.left = n)
        } else i.cssText = e._stOrig
        ;(B.core.getCache(e).uncache = 1), r.appendChild(e)
      }
    },
    _c = function (e, r, t) {
      var n = r,
        i = n
      return function (o) {
        var a = Math.round(e())
        return (
          a !== n &&
            a !== i &&
            Math.abs(a - n) > 3 &&
            Math.abs(a - i) > 3 &&
            ((o = a), t && t()),
          (i = n),
          (n = o),
          o
        )
      }
    },
    Ys = function (e, r, t) {
      var n = {}
      ;(n[r.p] = '+=' + t), B.set(e, n)
    },
    vc = function (e, r) {
      var t = Br(e, r),
        n = '_scroll' + r.p2,
        i = function o(a, u, l, c, h) {
          var f = o.tween,
            d = u.onComplete,
            g = {}
          l = l || t()
          var p = _c(t, l, function () {
            f.kill(), (o.tween = 0)
          })
          return (
            (h = (c && h) || 0),
            (c = c || a - l),
            f && f.kill(),
            (u[n] = a),
            (u.inherit = !1),
            (u.modifiers = g),
            (g[n] = function () {
              return p(l + c * f.ratio + h * f.ratio * f.ratio)
            }),
            (u.onUpdate = function () {
              re.cache++, o.tween && wr()
            }),
            (u.onComplete = function () {
              ;(o.tween = 0), d && d.call(f)
            }),
            (f = o.tween = B.to(e, u)),
            f
          )
        }
      return (
        (e[n] = t),
        (t.wheelHandler = function () {
          return i.tween && i.tween.kill() && (i.tween = 0)
        }),
        Ne(e, 'wheel', t.wheelHandler),
        X.isTouch && Ne(e, 'touchmove', t.wheelHandler),
        i
      )
    },
    X = (function () {
      function s(r, t) {
        Yn ||
          s.register(B) ||
          console.warn('Please gsap.registerPlugin(ScrollTrigger)'),
          ha(this),
          this.init(r, t)
      }
      var e = s.prototype
      return (
        (e.init = function (t, n) {
          if (
            ((this.progress = this.start = 0),
            this.vars && this.kill(!0, !0),
            !Mi)
          ) {
            this.update = this.refresh = this.kill = ur
            return
          }
          t = sc(kt(t) || Ri(t) || t.nodeType ? { trigger: t } : t, Ls)
          var i = t,
            o = i.onUpdate,
            a = i.toggleClass,
            u = i.id,
            l = i.onToggle,
            c = i.onRefresh,
            h = i.scrub,
            f = i.trigger,
            d = i.pin,
            g = i.pinSpacing,
            p = i.invalidateOnRefresh,
            m = i.anticipatePin,
            _ = i.onScrubComplete,
            v = i.onSnapComplete,
            y = i.once,
            b = i.snap,
            T = i.pinReparent,
            S = i.pinSpacer,
            w = i.containerAnimation,
            P = i.fastScrollEnd,
            E = i.preventOverlaps,
            C =
              t.horizontal || (t.containerAnimation && t.horizontal !== !1)
                ? ut
                : Le,
            L = !h && h !== 0,
            k = bt(t.scroller || oe),
            R = B.core.getCache(k),
            A = ln(k),
            O =
              ('pinType' in t
                ? t.pinType
                : Nr(k, 'pinType') || (A && 'fixed')) === 'fixed',
            D = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
            I = L && t.toggleActions.split(' '),
            F = 'markers' in t ? t.markers : Ls.markers,
            z = A ? 0 : parseFloat(Ft(k)['border' + C.p2 + jn]) || 0,
            x = this,
            N =
              t.onRefreshInit &&
              function () {
                return t.onRefreshInit(x)
              },
            H = gd(k, A, C),
            ae = md(k, A),
            ee = 0,
            G = 0,
            W = 0,
            ce = Br(k, C),
            K,
            _e,
            ue,
            fe,
            qe,
            Y,
            ne,
            Xe,
            We,
            M,
            ke,
            Wt,
            Vt,
            q,
            jt,
            Tn,
            ni,
            $e,
            Hr,
            Oe,
            Ut,
            Nt,
            Sr,
            Ji,
            Re,
            lo,
            Xr,
            ii,
            si,
            Wr,
            Sn,
            ie,
            Cn,
            Gt,
            Kt,
            Zt,
            En,
            oi,
            Cr
          if (
            ((x._startClamp = x._endClamp = !1),
            (x._dir = C),
            (m *= 45),
            (x.scroller = k),
            (x.scroll = w ? w.time.bind(w) : ce),
            (fe = ce()),
            (x.vars = t),
            (n = n || t.animation),
            'refreshPriority' in t &&
              ((Xl = 1), t.refreshPriority === -9999 && (qi = x)),
            (R.tweenScroll = R.tweenScroll || {
              top: vc(k, Le),
              left: vc(k, ut),
            }),
            (x.tweenTo = K = R.tweenScroll[C.p]),
            (x.scrubDuration = function (V) {
              ;(Cn = Ri(V) && V),
                Cn
                  ? ie
                    ? ie.duration(V)
                    : (ie = B.to(n, {
                        ease: 'expo',
                        totalProgress: '+=0',
                        inherit: !1,
                        duration: Cn,
                        paused: !0,
                        onComplete: function () {
                          return _ && _(x)
                        },
                      }))
                  : (ie && ie.progress(1).kill(), (ie = 0))
            }),
            n &&
              ((n.vars.lazy = !1),
              (n._initted && !x.isReverted) ||
                (n.vars.immediateRender !== !1 &&
                  t.immediateRender !== !1 &&
                  n.duration() &&
                  n.render(0, !0, !0)),
              (x.animation = n.pause()),
              (n.scrollTrigger = x),
              x.scrubDuration(h),
              (Wr = 0),
              u || (u = n.vars.id)),
            b &&
              ((!cn(b) || b.push) && (b = { snapTo: b }),
              'scrollBehavior' in ge.style &&
                B.set(A ? [ge, qt] : k, { scrollBehavior: 'auto' }),
              re.forEach(function (V) {
                return (
                  ft(V) &&
                  V.target === (A ? xe.scrollingElement || qt : k) &&
                  (V.smooth = !1)
                )
              }),
              (ue = ft(b.snapTo)
                ? b.snapTo
                : b.snapTo === 'labels'
                ? vd(n)
                : b.snapTo === 'labelsDirectional'
                ? yd(n)
                : b.directional !== !1
                ? function (V, J) {
                    return xa(b.snapTo)(V, et() - G < 500 ? 0 : J.direction)
                  }
                : B.utils.snap(b.snapTo)),
              (Gt = b.duration || { min: 0.1, max: 2 }),
              (Gt = cn(Gt) ? Oi(Gt.min, Gt.max) : Oi(Gt, Gt)),
              (Kt = B.delayedCall(b.delay || Cn / 2 || 0.1, function () {
                var V = ce(),
                  J = et() - G < 500,
                  j = K.tween
                if (
                  (J || Math.abs(x.getVelocity()) < 10) &&
                  !j &&
                  !Ps &&
                  ee !== V
                ) {
                  var Z = (V - Y) / q,
                    Ye = n && !L ? n.totalProgress() : Z,
                    le = J ? 0 : ((Ye - Sn) / (et() - Ai)) * 1e3 || 0,
                    Ae = B.utils.clamp(-Z, 1 - Z, (Wn(le / 2) * le) / 0.185),
                    rt = Z + (b.inertia === !1 ? 0 : Ae),
                    Ce,
                    ye,
                    pe = b,
                    Qt = pe.onStart,
                    Te = pe.onInterrupt,
                    At = pe.onComplete
                  if (
                    ((Ce = ue(rt, x)),
                    Ri(Ce) || (Ce = rt),
                    (ye = Math.round(Y + Ce * q)),
                    V <= ne && V >= Y && ye !== V)
                  ) {
                    if (j && !j._initted && j.data <= Wn(ye - V)) return
                    b.inertia === !1 && (Ae = Ce - Z),
                      K(
                        ye,
                        {
                          duration: Gt(
                            Wn(
                              (Math.max(Wn(rt - Ye), Wn(Ce - Ye)) * 0.185) /
                                le /
                                0.05 || 0
                            )
                          ),
                          ease: b.ease || 'power3',
                          data: Wn(ye - V),
                          onInterrupt: function () {
                            return Kt.restart(!0) && Te && Te(x)
                          },
                          onComplete: function () {
                            x.update(),
                              (ee = ce()),
                              n &&
                                (ie
                                  ? ie.resetTo(
                                      'totalProgress',
                                      Ce,
                                      n._tTime / n._tDur
                                    )
                                  : n.progress(Ce)),
                              (Wr = Sn =
                                n && !L ? n.totalProgress() : x.progress),
                              v && v(x),
                              At && At(x)
                          },
                        },
                        V,
                        Ae * q,
                        ye - V - Ae * q
                      ),
                      Qt && Qt(x, K.tween)
                  }
                } else x.isActive && ee !== V && Kt.restart(!0)
              }).pause())),
            u && (Ta[u] = x),
            (f = x.trigger = bt(f || (d !== !0 && d))),
            (Cr = f && f._gsap && f._gsap.stRevert),
            Cr && (Cr = Cr(x)),
            (d = d === !0 ? f : bt(d)),
            kt(a) && (a = { targets: f, className: a }),
            d &&
              (g === !1 ||
                g === It ||
                (g =
                  !g &&
                  d.parentNode &&
                  d.parentNode.style &&
                  Ft(d.parentNode).display === 'flex'
                    ? !1
                    : De),
              (x.pin = d),
              (_e = B.core.getCache(d)),
              _e.spacer
                ? (jt = _e.pinState)
                : (S &&
                    ((S = bt(S)),
                    S && !S.nodeType && (S = S.current || S.nativeElement),
                    (_e.spacerIsNative = !!S),
                    S && (_e.spacerState = qs(S))),
                  (_e.spacer = $e = S || xe.createElement('div')),
                  $e.classList.add('pin-spacer'),
                  u && $e.classList.add('pin-spacer-' + u),
                  (_e.pinState = jt = qs(d))),
              t.force3D !== !1 && B.set(d, { force3D: !0 }),
              (x.spacer = $e = _e.spacer),
              (si = Ft(d)),
              (Ji = si[g + C.os2]),
              (Oe = B.getProperty(d)),
              (Ut = B.quickSetter(d, C.a, Ie)),
              ka(d, $e, si),
              (ni = qs(d))),
            F)
          ) {
            ;(Wt = cn(F) ? sc(F, ac) : ac),
              (M = zs('scroller-start', u, k, C, Wt, 0)),
              (ke = zs('scroller-end', u, k, C, Wt, 0, M)),
              (Hr = M['offset' + C.op.d2])
            var es = bt(Nr(k, 'content') || k)
            ;(Xe = this.markerStart = zs('start', u, es, C, Wt, Hr, 0, w)),
              (We = this.markerEnd = zs('end', u, es, C, Wt, Hr, 0, w)),
              w && (oi = B.quickSetter([Xe, We], C.a, Ie)),
              !O &&
                !(ar.length && Nr(k, 'fixedMarkers') === !0) &&
                (_d(A ? ge : k),
                B.set([M, ke], { force3D: !0 }),
                (lo = B.quickSetter(M, C.a, Ie)),
                (ii = B.quickSetter(ke, C.a, Ie)))
          }
          if (w) {
            var Q = w.vars.onUpdate,
              U = w.vars.onUpdateParams
            w.eventCallback('onUpdate', function () {
              x.update(0, 0, 1), Q && Q.apply(w, U || [])
            })
          }
          if (
            ((x.previous = function () {
              return te[te.indexOf(x) - 1]
            }),
            (x.next = function () {
              return te[te.indexOf(x) + 1]
            }),
            (x.revert = function (V, J) {
              if (!J) return x.kill(!0)
              var j = V !== !1 || !x.enabled,
                Z = Je
              j !== x.isReverted &&
                (j &&
                  ((Zt = Math.max(ce(), x.scroll.rec || 0)),
                  (W = x.progress),
                  (En = n && n.progress())),
                Xe &&
                  [Xe, We, M, ke].forEach(function (Ye) {
                    return (Ye.style.display = j ? 'none' : 'block')
                  }),
                j && ((Je = x), x.update(j)),
                d &&
                  (!T || !x.isActive) &&
                  (j ? xd(d, $e, jt) : ka(d, $e, Ft(d), Re)),
                j || x.update(j),
                (Je = Z),
                (x.isReverted = j))
            }),
            (x.refresh = function (V, J, j, Z) {
              if (!((Je || !x.enabled) && !J)) {
                if (d && V && Lt) {
                  Ne(s, 'scrollEnd', lc)
                  return
                }
                !ht && N && N(x),
                  (Je = x),
                  K.tween && !j && (K.tween.kill(), (K.tween = 0)),
                  ie && ie.pause(),
                  p && n && n.revert({ kill: !1 }).invalidate(),
                  x.isReverted || x.revert(!0, !0),
                  (x._subPinOffset = !1)
                var Ye = H(),
                  le = ae(),
                  Ae = w ? w.duration() : lr(k, C),
                  rt = q <= 0.01,
                  Ce = 0,
                  ye = Z || 0,
                  pe = cn(j) ? j.end : t.end,
                  Qt = t.endTrigger || f,
                  Te = cn(j)
                    ? j.start
                    : t.start ||
                      (t.start === 0 || !f ? 0 : d ? '0 0' : '0 100%'),
                  At = (x.pinnedContainer =
                    t.pinnedContainer && bt(t.pinnedContainer, x)),
                  hr = (f && Math.max(0, te.indexOf(x))) || 0,
                  je = hr,
                  Ue,
                  nt,
                  Pn,
                  co,
                  it,
                  Fe,
                  dr,
                  fu,
                  Sf,
                  ts,
                  pr,
                  rs,
                  fo
                for (
                  F &&
                  cn(j) &&
                  ((rs = B.getProperty(M, C.p)), (fo = B.getProperty(ke, C.p)));
                  je--;

                )
                  (Fe = te[je]),
                    Fe.end || Fe.refresh(0, 1) || (Je = x),
                    (dr = Fe.pin),
                    dr &&
                      (dr === f || dr === d || dr === At) &&
                      !Fe.isReverted &&
                      (ts || (ts = []), ts.unshift(Fe), Fe.revert(!0, !0)),
                    Fe !== te[je] && (hr--, je--)
                for (
                  ft(Te) && (Te = Te(x)),
                    Te = Gl(Te, 'start', x),
                    Y =
                      gc(
                        Te,
                        f,
                        Ye,
                        C,
                        ce(),
                        Xe,
                        M,
                        x,
                        le,
                        z,
                        O,
                        Ae,
                        w,
                        x._startClamp && '_startClamp'
                      ) || (d ? -0.001 : 0),
                    ft(pe) && (pe = pe(x)),
                    kt(pe) &&
                      !pe.indexOf('+=') &&
                      (~pe.indexOf(' ')
                        ? (pe = (kt(Te) ? Te.split(' ')[0] : '') + pe)
                        : ((Ce = Fs(pe.substr(2), Ye)),
                          (pe = kt(Te)
                            ? Te
                            : (w
                                ? B.utils.mapRange(
                                    0,
                                    w.duration(),
                                    w.scrollTrigger.start,
                                    w.scrollTrigger.end,
                                    Y
                                  )
                                : Y) + Ce),
                          (Qt = f))),
                    pe = Gl(pe, 'end', x),
                    ne =
                      Math.max(
                        Y,
                        gc(
                          pe || (Qt ? '100% 0' : Ae),
                          Qt,
                          Ye,
                          C,
                          ce() + Ce,
                          We,
                          ke,
                          x,
                          le,
                          z,
                          O,
                          Ae,
                          w,
                          x._endClamp && '_endClamp'
                        )
                      ) || -0.001,
                    Ce = 0,
                    je = hr;
                  je--;

                )
                  (Fe = te[je]),
                    (dr = Fe.pin),
                    dr &&
                      Fe.start - Fe._pinPush <= Y &&
                      !w &&
                      Fe.end > 0 &&
                      ((Ue =
                        Fe.end -
                        (x._startClamp ? Math.max(0, Fe.start) : Fe.start)),
                      ((dr === f && Fe.start - Fe._pinPush < Y) || dr === At) &&
                        isNaN(Te) &&
                        (Ce += Ue * (1 - Fe.progress)),
                      dr === d && (ye += Ue))
                if (
                  ((Y += Ce),
                  (ne += Ce),
                  x._startClamp && (x._startClamp += Ce),
                  x._endClamp &&
                    !ht &&
                    ((x._endClamp = ne || -0.001),
                    (ne = Math.min(ne, lr(k, C)))),
                  (q = ne - Y || ((Y -= 0.01) && 0.001)),
                  rt && (W = B.utils.clamp(0, 1, B.utils.normalize(Y, ne, Zt))),
                  (x._pinPush = ye),
                  Xe &&
                    Ce &&
                    ((Ue = {}),
                    (Ue[C.a] = '+=' + Ce),
                    At && (Ue[C.p] = '-=' + ce()),
                    B.set([Xe, We], Ue)),
                  d && !(ga && x.end >= lr(k, C)))
                )
                  (Ue = Ft(d)),
                    (co = C === Le),
                    (Pn = ce()),
                    (Nt = parseFloat(Oe(C.a)) + ye),
                    !Ae &&
                      ne > 1 &&
                      ((pr = (A ? xe.scrollingElement || qt : k).style),
                      (pr = {
                        style: pr,
                        value: pr['overflow' + C.a.toUpperCase()],
                      }),
                      A &&
                        Ft(ge)['overflow' + C.a.toUpperCase()] !== 'scroll' &&
                        (pr.style['overflow' + C.a.toUpperCase()] = 'scroll')),
                    ka(d, $e, Ue),
                    (ni = qs(d)),
                    (nt = br(d, !0)),
                    (fu = O && Br(k, co ? ut : Le)()),
                    g
                      ? ((Re = [g + C.os2, q + ye + Ie]),
                        (Re.t = $e),
                        (je = g === De ? Ms(d, C) + q + ye : 0),
                        je &&
                          (Re.push(C.d, je + Ie),
                          $e.style.flexBasis !== 'auto' &&
                            ($e.style.flexBasis = je + Ie)),
                        Gn(Re),
                        At &&
                          te.forEach(function (ns) {
                            ns.pin === At &&
                              ns.vars.pinSpacing !== !1 &&
                              (ns._subPinOffset = !0)
                          }),
                        O && ce(Zt))
                      : ((je = Ms(d, C)),
                        je &&
                          $e.style.flexBasis !== 'auto' &&
                          ($e.style.flexBasis = je + Ie)),
                    O &&
                      ((it = {
                        top: nt.top + (co ? Pn - Y : fu) + Ie,
                        left: nt.left + (co ? fu : Pn - Y) + Ie,
                        boxSizing: 'border-box',
                        position: 'fixed',
                      }),
                      (it[fn] = it['max' + jn] = Math.ceil(nt.width) + Ie),
                      (it[hn] = it['max' + wa] = Math.ceil(nt.height) + Ie),
                      (it[It] =
                        it[It + zi] =
                        it[It + Ii] =
                        it[It + Vi] =
                        it[It + Fi] =
                          '0'),
                      (it[De] = Ue[De]),
                      (it[De + zi] = Ue[De + zi]),
                      (it[De + Ii] = Ue[De + Ii]),
                      (it[De + Vi] = Ue[De + Vi]),
                      (it[De + Fi] = Ue[De + Fi]),
                      (Tn = Sd(jt, it, T)),
                      ht && ce(0)),
                    n
                      ? ((Sf = n._initted),
                        ca(1),
                        n.render(n.duration(), !0, !0),
                        (Sr = Oe(C.a) - Nt + q + ye),
                        (Xr = Math.abs(q - Sr) > 1),
                        O && Xr && Tn.splice(Tn.length - 2, 2),
                        n.render(0, !0, !0),
                        Sf || n.invalidate(!0),
                        n.parent || n.totalTime(n.totalTime()),
                        ca(0))
                      : (Sr = q),
                    pr &&
                      (pr.value
                        ? (pr.style['overflow' + C.a.toUpperCase()] = pr.value)
                        : pr.style.removeProperty('overflow-' + C.a))
                else if (f && ce() && !w)
                  for (nt = f.parentNode; nt && nt !== ge; )
                    nt._pinOffset &&
                      ((Y -= nt._pinOffset), (ne -= nt._pinOffset)),
                      (nt = nt.parentNode)
                ts &&
                  ts.forEach(function (ns) {
                    return ns.revert(!1, !0)
                  }),
                  (x.start = Y),
                  (x.end = ne),
                  (fe = qe = ht ? Zt : ce()),
                  !w && !ht && (fe < Zt && ce(Zt), (x.scroll.rec = 0)),
                  x.revert(!1, !0),
                  (G = et()),
                  Kt && ((ee = -1), Kt.restart(!0)),
                  (Je = 0),
                  n &&
                    L &&
                    (n._initted || En) &&
                    n.progress() !== En &&
                    n.progress(En || 0, !0).render(n.time(), !0, !0),
                  (rt || W !== x.progress || w || p) &&
                    (n &&
                      !L &&
                      n.totalProgress(
                        w && Y < -0.001 && !W ? B.utils.normalize(Y, ne, 0) : W,
                        !0
                      ),
                    (x.progress = rt || (fe - Y) / q === W ? 0 : W)),
                  d && g && ($e._pinOffset = Math.round(x.progress * Sr)),
                  ie && ie.invalidate(),
                  isNaN(rs) ||
                    ((rs -= B.getProperty(M, C.p)),
                    (fo -= B.getProperty(ke, C.p)),
                    Ys(M, C, rs),
                    Ys(Xe, C, rs - (Z || 0)),
                    Ys(ke, C, fo),
                    Ys(We, C, fo - (Z || 0))),
                  rt && !ht && x.update(),
                  c && !ht && !Vt && ((Vt = !0), c(x), (Vt = !1))
              }
            }),
            (x.getVelocity = function () {
              return ((ce() - qe) / (et() - Ai)) * 1e3 || 0
            }),
            (x.endAnimation = function () {
              Li(x.callbackAnimation),
                n &&
                  (ie
                    ? ie.progress(1)
                    : n.paused()
                    ? L || Li(n, x.direction < 0, 1)
                    : Li(n, n.reversed()))
            }),
            (x.labelToScroll = function (V) {
              return (
                (n &&
                  n.labels &&
                  (Y || x.refresh() || Y) + (n.labels[V] / n.duration()) * q) ||
                0
              )
            }),
            (x.getTrailing = function (V) {
              var J = te.indexOf(x),
                j = x.direction > 0 ? te.slice(0, J).reverse() : te.slice(J + 1)
              return (
                kt(V)
                  ? j.filter(function (Z) {
                      return Z.vars.preventOverlaps === V
                    })
                  : j
              ).filter(function (Z) {
                return x.direction > 0 ? Z.end <= Y : Z.start >= ne
              })
            }),
            (x.update = function (V, J, j) {
              if (!(w && !j && !V)) {
                var Z = ht === !0 ? Zt : x.scroll(),
                  Ye = V ? 0 : (Z - Y) / q,
                  le = Ye < 0 ? 0 : Ye > 1 ? 1 : Ye || 0,
                  Ae = x.progress,
                  rt,
                  Ce,
                  ye,
                  pe,
                  Qt,
                  Te,
                  At,
                  hr
                if (
                  (J &&
                    ((qe = fe),
                    (fe = w ? ce() : Z),
                    b && ((Sn = Wr), (Wr = n && !L ? n.totalProgress() : le))),
                  m &&
                    d &&
                    !Je &&
                    !Os &&
                    Lt &&
                    (!le && Y < Z + ((Z - qe) / (et() - Ai)) * m
                      ? (le = 1e-4)
                      : le === 1 &&
                        ne > Z + ((Z - qe) / (et() - Ai)) * m &&
                        (le = 0.9999)),
                  le !== Ae && x.enabled)
                ) {
                  if (
                    ((rt = x.isActive = !!le && le < 1),
                    (Ce = !!Ae && Ae < 1),
                    (Te = rt !== Ce),
                    (Qt = Te || !!le != !!Ae),
                    (x.direction = le > Ae ? 1 : -1),
                    (x.progress = le),
                    Qt &&
                      !Je &&
                      ((ye = le && !Ae ? 0 : le === 1 ? 1 : Ae === 1 ? 2 : 3),
                      L &&
                        ((pe =
                          (!Te && I[ye + 1] !== 'none' && I[ye + 1]) || I[ye]),
                        (hr =
                          n &&
                          (pe === 'complete' || pe === 'reset' || pe in n)))),
                    E &&
                      (Te || hr) &&
                      (hr || h || !n) &&
                      (ft(E)
                        ? E(x)
                        : x.getTrailing(E).forEach(function (Pn) {
                            return Pn.endAnimation()
                          })),
                    L ||
                      (ie && !Je && !Os
                        ? (ie._dp._time - ie._start !== ie._time &&
                            ie.render(ie._dp._time - ie._start),
                          ie.resetTo
                            ? ie.resetTo(
                                'totalProgress',
                                le,
                                n._tTime / n._tDur
                              )
                            : ((ie.vars.totalProgress = le),
                              ie.invalidate().restart()))
                        : n && n.totalProgress(le, !!(Je && (G || V)))),
                    d)
                  ) {
                    if ((V && g && ($e.style[g + C.os2] = Ji), !O))
                      Ut(Di(Nt + Sr * le))
                    else if (Qt) {
                      if (
                        ((At =
                          !V && le > Ae && ne + 1 > Z && Z + 1 >= lr(k, C)),
                        T)
                      )
                        if (!V && (rt || At)) {
                          var je = br(d, !0),
                            Ue = Z - Y
                          mc(
                            d,
                            ge,
                            je.top + (C === Le ? Ue : 0) + Ie,
                            je.left + (C === Le ? 0 : Ue) + Ie
                          )
                        } else mc(d, $e)
                      Gn(rt || At ? Tn : ni),
                        (Xr && le < 1 && rt) ||
                          Ut(Nt + (le === 1 && !At ? Sr : 0))
                    }
                  }
                  b && !K.tween && !Je && !Os && Kt.restart(!0),
                    a &&
                      (Te || (y && le && (le < 1 || !ma))) &&
                      ki(a.targets).forEach(function (Pn) {
                        return Pn.classList[rt || y ? 'add' : 'remove'](
                          a.className
                        )
                      }),
                    o && !L && !V && o(x),
                    Qt && !Je
                      ? (L &&
                          (hr &&
                            (pe === 'complete'
                              ? n.pause().totalProgress(1)
                              : pe === 'reset'
                              ? n.restart(!0).pause()
                              : pe === 'restart'
                              ? n.restart(!0)
                              : n[pe]()),
                          o && o(x)),
                        (Te || !ma) &&
                          (l && Te && va(x, l),
                          D[ye] && va(x, D[ye]),
                          y && (le === 1 ? x.kill(!1, 1) : (D[ye] = 0)),
                          Te ||
                            ((ye = le === 1 ? 1 : 3), D[ye] && va(x, D[ye]))),
                        P &&
                          !rt &&
                          Math.abs(x.getVelocity()) > (Ri(P) ? P : 2500) &&
                          (Li(x.callbackAnimation),
                          ie
                            ? ie.progress(1)
                            : Li(n, pe === 'reverse' ? 1 : !le, 1)))
                      : L && o && !Je && o(x)
                }
                if (ii) {
                  var nt = w ? (Z / w.duration()) * (w._caScrollDist || 0) : Z
                  lo(nt + (M._isFlipped ? 1 : 0)), ii(nt)
                }
                oi && oi((-Z / w.duration()) * (w._caScrollDist || 0))
              }
            }),
            (x.enable = function (V, J) {
              x.enabled ||
                ((x.enabled = !0),
                Ne(k, 'resize', Bi),
                A || Ne(k, 'scroll', Un),
                N && Ne(s, 'refreshInit', N),
                V !== !1 && ((x.progress = W = 0), (fe = qe = ee = ce())),
                J !== !1 && x.refresh())
            }),
            (x.getTween = function (V) {
              return V && K ? K.tween : ie
            }),
            (x.setPositions = function (V, J, j, Z) {
              if (w) {
                var Ye = w.scrollTrigger,
                  le = w.duration(),
                  Ae = Ye.end - Ye.start
                ;(V = Ye.start + (Ae * V) / le), (J = Ye.start + (Ae * J) / le)
              }
              x.refresh(
                !1,
                !1,
                {
                  start: Kl(V, j && !!x._startClamp),
                  end: Kl(J, j && !!x._endClamp),
                },
                Z
              ),
                x.update()
            }),
            (x.adjustPinSpacing = function (V) {
              if (Re && V) {
                var J = Re.indexOf(C.d) + 1
                ;(Re[J] = parseFloat(Re[J]) + V + Ie),
                  (Re[1] = parseFloat(Re[1]) + V + Ie),
                  Gn(Re)
              }
            }),
            (x.disable = function (V, J) {
              if (
                x.enabled &&
                (V !== !1 && x.revert(!0, !0),
                (x.enabled = x.isActive = !1),
                J || (ie && ie.pause()),
                (Zt = 0),
                _e && (_e.uncache = 1),
                N && Be(s, 'refreshInit', N),
                Kt && (Kt.pause(), K.tween && K.tween.kill() && (K.tween = 0)),
                !A)
              ) {
                for (var j = te.length; j--; )
                  if (te[j].scroller === k && te[j] !== x) return
                Be(k, 'resize', Bi), A || Be(k, 'scroll', Un)
              }
            }),
            (x.kill = function (V, J) {
              x.disable(V, J), ie && !J && ie.kill(), u && delete Ta[u]
              var j = te.indexOf(x)
              j >= 0 && te.splice(j, 1),
                j === lt && Ns > 0 && lt--,
                (j = 0),
                te.forEach(function (Z) {
                  return Z.scroller === x.scroller && (j = 1)
                }),
                j || ht || (x.scroll.rec = 0),
                n &&
                  ((n.scrollTrigger = null),
                  V && n.revert({ kill: !1 }),
                  J || n.kill()),
                Xe &&
                  [Xe, We, M, ke].forEach(function (Z) {
                    return Z.parentNode && Z.parentNode.removeChild(Z)
                  }),
                qi === x && (qi = 0),
                d &&
                  (_e && (_e.uncache = 1),
                  (j = 0),
                  te.forEach(function (Z) {
                    return Z.pin === d && j++
                  }),
                  j || (_e.spacer = 0)),
                t.onKill && t.onKill(x)
            }),
            te.push(x),
            x.enable(!1, !1),
            Cr && Cr(x),
            n && n.add && !q)
          ) {
            var he = x.update
            ;(x.update = function () {
              ;(x.update = he), Y || ne || x.refresh()
            }),
              B.delayedCall(0.01, x.update),
              (q = 0.01),
              (Y = ne = 0)
          } else x.refresh()
          d && wd()
        }),
        (s.register = function (t) {
          return (
            Yn ||
              ((B = t || ec()),
              Jl() && window.document && s.enable(),
              (Yn = Mi)),
            Yn
          )
        }),
        (s.defaults = function (t) {
          if (t) for (var n in t) Ls[n] = t[n]
          return Ls
        }),
        (s.disable = function (t, n) {
          ;(Mi = 0),
            te.forEach(function (o) {
              return o[n ? 'kill' : 'disable'](t)
            }),
            Be(oe, 'wheel', Un),
            Be(xe, 'scroll', Un),
            clearInterval(Es),
            Be(xe, 'touchcancel', ur),
            Be(ge, 'touchstart', ur),
            Ds(Be, xe, 'pointerdown,touchstart,mousedown', Zl),
            Ds(Be, xe, 'pointerup,touchend,mouseup', Ql),
            Cs.kill(),
            As(Be)
          for (var i = 0; i < re.length; i += 3)
            Rs(Be, re[i], re[i + 1]), Rs(Be, re[i], re[i + 2])
        }),
        (s.enable = function () {
          if (
            ((oe = window),
            (xe = document),
            (qt = xe.documentElement),
            (ge = xe.body),
            B &&
              ((ki = B.utils.toArray),
              (Oi = B.utils.clamp),
              (ha = B.core.context || ur),
              (ca = B.core.suppressOverwrites || ur),
              (da = oe.history.scrollRestoration || 'auto'),
              (Ea = oe.pageYOffset),
              B.core.globals('ScrollTrigger', s),
              ge))
          ) {
            ;(Mi = 1),
              (Xn = document.createElement('div')),
              (Xn.style.height = '100vh'),
              (Xn.style.position = 'absolute'),
              dc(),
              pd(),
              Pe.register(B),
              (s.isTouch = Pe.isTouch),
              (qr =
                Pe.isTouch &&
                /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
              (fa = Pe.isTouch === 1),
              Ne(oe, 'wheel', Un),
              ($l = [oe, xe, qt, ge]),
              B.matchMedia
                ? ((s.matchMedia = function (u) {
                    var l = B.matchMedia(),
                      c
                    for (c in u) l.add(c, u[c])
                    return l
                  }),
                  B.addEventListener('matchMediaInit', function () {
                    return Ca()
                  }),
                  B.addEventListener('matchMediaRevert', function () {
                    return cc()
                  }),
                  B.addEventListener('matchMedia', function () {
                    mn(0, 1), pn('matchMedia')
                  }),
                  B.matchMedia('(orientation: portrait)', function () {
                    return Sa(), Sa
                  }))
                : console.warn('Requires GSAP 3.11.0 or later'),
              Sa(),
              Ne(xe, 'scroll', Un)
            var t = ge.style,
              n = t.borderTopStyle,
              i = B.core.Animation.prototype,
              o,
              a
            for (
              i.revert ||
                Object.defineProperty(i, 'revert', {
                  value: function () {
                    return this.time(-0.01, !0)
                  },
                }),
                t.borderTopStyle = 'solid',
                o = br(ge),
                Le.m = Math.round(o.top + Le.sc()) || 0,
                ut.m = Math.round(o.left + ut.sc()) || 0,
                n
                  ? (t.borderTopStyle = n)
                  : t.removeProperty('border-top-style'),
                Es = setInterval(uc, 250),
                B.delayedCall(0.5, function () {
                  return (Os = 0)
                }),
                Ne(xe, 'touchcancel', ur),
                Ne(ge, 'touchstart', ur),
                Ds(Ne, xe, 'pointerdown,touchstart,mousedown', Zl),
                Ds(Ne, xe, 'pointerup,touchend,mouseup', Ql),
                la = B.utils.checkPrefix('transform'),
                Bs.push(la),
                Yn = et(),
                Cs = B.delayedCall(0.2, mn).pause(),
                Hn = [
                  xe,
                  'visibilitychange',
                  function () {
                    var u = oe.innerWidth,
                      l = oe.innerHeight
                    xe.hidden
                      ? ((Yl = u), (Hl = l))
                      : (Yl !== u || Hl !== l) && Bi()
                  },
                  xe,
                  'DOMContentLoaded',
                  mn,
                  oe,
                  'load',
                  mn,
                  oe,
                  'resize',
                  Bi,
                ],
                As(Ne),
                te.forEach(function (u) {
                  return u.enable(0, 1)
                }),
                a = 0;
              a < re.length;
              a += 3
            )
              Rs(Be, re[a], re[a + 1]), Rs(Be, re[a], re[a + 2])
          }
        }),
        (s.config = function (t) {
          'limitCallbacks' in t && (ma = !!t.limitCallbacks)
          var n = t.syncInterval
          ;(n && clearInterval(Es)) || ((Es = n) && setInterval(uc, n)),
            'ignoreMobileResize' in t &&
              (fa = s.isTouch === 1 && t.ignoreMobileResize),
            'autoRefreshEvents' in t &&
              (As(Be) || As(Ne, t.autoRefreshEvents || 'none'),
              (Wl = (t.autoRefreshEvents + '').indexOf('resize') === -1))
        }),
        (s.scrollerProxy = function (t, n) {
          var i = bt(t),
            o = re.indexOf(i),
            a = ln(i)
          ~o && re.splice(o, a ? 6 : 2),
            n && (a ? ar.unshift(oe, n, ge, n, qt, n) : ar.unshift(i, n))
        }),
        (s.clearMatchMedia = function (t) {
          te.forEach(function (n) {
            return n._ctx && n._ctx.query === t && n._ctx.kill(!0, !0)
          })
        }),
        (s.isInViewport = function (t, n, i) {
          var o = (kt(t) ? bt(t) : t).getBoundingClientRect(),
            a = o[i ? fn : hn] * n || 0
          return i
            ? o.right - a > 0 && o.left + a < oe.innerWidth
            : o.bottom - a > 0 && o.top + a < oe.innerHeight
        }),
        (s.positionInViewport = function (t, n, i) {
          kt(t) && (t = bt(t))
          var o = t.getBoundingClientRect(),
            a = o[i ? fn : hn],
            u =
              n == null
                ? a / 2
                : n in Is
                ? Is[n] * a
                : ~n.indexOf('%')
                ? (parseFloat(n) * a) / 100
                : parseFloat(n) || 0
          return i ? (o.left + u) / oe.innerWidth : (o.top + u) / oe.innerHeight
        }),
        (s.killAll = function (t) {
          if (
            (te.slice(0).forEach(function (i) {
              return i.vars.id !== 'ScrollSmoother' && i.kill()
            }),
            t !== !0)
          ) {
            var n = dn.killAll || []
            ;(dn = {}),
              n.forEach(function (i) {
                return i()
              })
          }
        }),
        s
      )
    })()
  ;(X.version = '3.12.5'),
    (X.saveStyles = function (s) {
      return s
        ? ki(s).forEach(function (e) {
            if (e && e.style) {
              var r = Ot.indexOf(e)
              r >= 0 && Ot.splice(r, 5),
                Ot.push(
                  e,
                  e.style.cssText,
                  e.getBBox && e.getAttribute('transform'),
                  B.core.getCache(e),
                  ha()
                )
            }
          })
        : Ot
    }),
    (X.revert = function (s, e) {
      return Ca(!s, e)
    }),
    (X.create = function (s, e) {
      return new X(s, e)
    }),
    (X.refresh = function (s) {
      return s ? Bi() : (Yn || X.register()) && mn(!0)
    }),
    (X.update = function (s) {
      return ++re.cache && wr(s === !0 ? 2 : 0)
    }),
    (X.clearScrollMemory = fc),
    (X.maxScroll = function (s, e) {
      return lr(s, e ? ut : Le)
    }),
    (X.getScrollFunc = function (s, e) {
      return Br(bt(s), e ? ut : Le)
    }),
    (X.getById = function (s) {
      return Ta[s]
    }),
    (X.getAll = function () {
      return te.filter(function (s) {
        return s.vars.id !== 'ScrollSmoother'
      })
    }),
    (X.isScrolling = function () {
      return !!Lt
    }),
    (X.snapDirectional = xa),
    (X.addEventListener = function (s, e) {
      var r = dn[s] || (dn[s] = [])
      ~r.indexOf(e) || r.push(e)
    }),
    (X.removeEventListener = function (s, e) {
      var r = dn[s],
        t = r && r.indexOf(e)
      t >= 0 && r.splice(t, 1)
    }),
    (X.batch = function (s, e) {
      var r = [],
        t = {},
        n = e.interval || 0.016,
        i = e.batchMax || 1e9,
        o = function (l, c) {
          var h = [],
            f = [],
            d = B.delayedCall(n, function () {
              c(h, f), (h = []), (f = [])
            }).pause()
          return function (g) {
            h.length || d.restart(!0),
              h.push(g.trigger),
              f.push(g),
              i <= h.length && d.progress(1)
          }
        },
        a
      for (a in e)
        t[a] =
          a.substr(0, 2) === 'on' && ft(e[a]) && a !== 'onRefreshInit'
            ? o(a, e[a])
            : e[a]
      return (
        ft(i) &&
          ((i = i()),
          Ne(X, 'refresh', function () {
            return (i = e.batchMax())
          })),
        ki(s).forEach(function (u) {
          var l = {}
          for (a in t) l[a] = t[a]
          ;(l.trigger = u), r.push(X.create(l))
        }),
        r
      )
    })
  var yc = function (e, r, t, n) {
      return (
        r > n ? e(n) : r < 0 && e(0),
        t > n ? (n - r) / (t - r) : t < 0 ? r / (r - t) : 1
      )
    },
    Oa = function s(e, r) {
      r === !0
        ? e.style.removeProperty('touch-action')
        : (e.style.touchAction =
            r === !0
              ? 'auto'
              : r
              ? 'pan-' + r + (Pe.isTouch ? ' pinch-zoom' : '')
              : 'none'),
        e === qt && s(ge, r)
    },
    Hs = { auto: 1, scroll: 1 },
    Ed = function (e) {
      var r = e.event,
        t = e.target,
        n = e.axis,
        i = (r.changedTouches ? r.changedTouches[0] : r).target,
        o = i._gsap || B.core.getCache(i),
        a = et(),
        u
      if (!o._isScrollT || a - o._isScrollT > 2e3) {
        for (
          ;
          i &&
          i !== ge &&
          ((i.scrollHeight <= i.clientHeight &&
            i.scrollWidth <= i.clientWidth) ||
            !(Hs[(u = Ft(i)).overflowY] || Hs[u.overflowX]));

        )
          i = i.parentNode
        ;(o._isScroll =
          i &&
          i !== t &&
          !ln(i) &&
          (Hs[(u = Ft(i)).overflowY] || Hs[u.overflowX])),
          (o._isScrollT = a)
      }
      ;(o._isScroll || n === 'x') && (r.stopPropagation(), (r._gsapAllow = !0))
    },
    bc = function (e, r, t, n) {
      return Pe.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: r,
        onWheel: (n = n && Ed),
        onPress: n,
        onDrag: n,
        onScroll: n,
        onEnable: function () {
          return t && Ne(xe, Pe.eventTypes[0], xc, !1, !0)
        },
        onDisable: function () {
          return Be(xe, Pe.eventTypes[0], xc, !0)
        },
      })
    },
    Pd = /(input|label|select|textarea)/i,
    wc,
    xc = function (e) {
      var r = Pd.test(e.target.tagName)
      ;(r || wc) && ((e._gsapAllow = !0), (wc = r))
    },
    kd = function (e) {
      cn(e) || (e = {}),
        (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
        e.type || (e.type = 'wheel,touch'),
        (e.debounce = !!e.debounce),
        (e.id = e.id || 'normalizer')
      var r = e,
        t = r.normalizeScrollX,
        n = r.momentum,
        i = r.allowNestedScroll,
        o = r.onRelease,
        a,
        u,
        l = bt(e.target) || qt,
        c = B.core.globals().ScrollSmoother,
        h = c && c.get(),
        f =
          qr &&
          ((e.content && bt(e.content)) ||
            (h && e.content !== !1 && !h.smooth() && h.content())),
        d = Br(l, Le),
        g = Br(l, ut),
        p = 1,
        m =
          (Pe.isTouch && oe.visualViewport
            ? oe.visualViewport.scale * oe.visualViewport.width
            : oe.outerWidth) / oe.innerWidth,
        _ = 0,
        v = ft(n)
          ? function () {
              return n(a)
            }
          : function () {
              return n || 2.8
            },
        y,
        b,
        T = bc(l, e.type, !0, i),
        S = function () {
          return (b = !1)
        },
        w = ur,
        P = ur,
        E = function () {
          ;(u = lr(l, Le)),
            (P = Oi(qr ? 1 : 0, u)),
            t && (w = Oi(0, lr(l, ut))),
            (y = gn)
        },
        C = function () {
          ;(f._gsap.y = Di(parseFloat(f._gsap.y) + d.offset) + 'px'),
            (f.style.transform =
              'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
              parseFloat(f._gsap.y) +
              ', 0, 1)'),
            (d.offset = d.cacheID = 0)
        },
        L = function () {
          if (b) {
            requestAnimationFrame(S)
            var F = Di(a.deltaY / 2),
              z = P(d.v - F)
            if (f && z !== d.v + d.offset) {
              d.offset = z - d.v
              var x = Di((parseFloat(f && f._gsap.y) || 0) - d.offset)
              ;(f.style.transform =
                'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ' +
                x +
                ', 0, 1)'),
                (f._gsap.y = x + 'px'),
                (d.cacheID = re.cache),
                wr()
            }
            return !0
          }
          d.offset && C(), (b = !0)
        },
        k,
        R,
        A,
        O,
        D = function () {
          E(),
            k.isActive() &&
              k.vars.scrollY > u &&
              (d() > u ? k.progress(1) && d(u) : k.resetTo('scrollY', u))
        }
      return (
        f && B.set(f, { y: '+=0' }),
        (e.ignoreCheck = function (I) {
          return (
            (qr && I.type === 'touchmove' && L()) ||
            (p > 1.05 && I.type !== 'touchstart') ||
            a.isGesturing ||
            (I.touches && I.touches.length > 1)
          )
        }),
        (e.onPress = function () {
          b = !1
          var I = p
          ;(p = Di(((oe.visualViewport && oe.visualViewport.scale) || 1) / m)),
            k.pause(),
            I !== p && Oa(l, p > 1.01 ? !0 : t ? !1 : 'x'),
            (R = g()),
            (A = d()),
            E(),
            (y = gn)
        }),
        (e.onRelease = e.onGestureStart =
          function (I, F) {
            if ((d.offset && C(), !F)) O.restart(!0)
            else {
              re.cache++
              var z = v(),
                x,
                N
              t &&
                ((x = g()),
                (N = x + (z * 0.05 * -I.velocityX) / 0.227),
                (z *= yc(g, x, N, lr(l, ut))),
                (k.vars.scrollX = w(N))),
                (x = d()),
                (N = x + (z * 0.05 * -I.velocityY) / 0.227),
                (z *= yc(d, x, N, lr(l, Le))),
                (k.vars.scrollY = P(N)),
                k.invalidate().duration(z).play(0.01),
                ((qr && k.vars.scrollY >= u) || x >= u - 1) &&
                  B.to({}, { onUpdate: D, duration: z })
            }
            o && o(I)
          }),
        (e.onWheel = function () {
          k._ts && k.pause(), et() - _ > 1e3 && ((y = 0), (_ = et()))
        }),
        (e.onChange = function (I, F, z, x, N) {
          if (
            (gn !== y && E(),
            F && t && g(w(x[2] === F ? R + (I.startX - I.x) : g() + F - x[1])),
            z)
          ) {
            d.offset && C()
            var H = N[2] === z,
              ae = H ? A + I.startY - I.y : d() + z - N[1],
              ee = P(ae)
            H && ae !== ee && (A += ee - ae), d(ee)
          }
          ;(z || F) && wr()
        }),
        (e.onEnable = function () {
          Oa(l, t ? !1 : 'x'),
            X.addEventListener('refresh', D),
            Ne(oe, 'resize', D),
            d.smooth &&
              ((d.target.style.scrollBehavior = 'auto'),
              (d.smooth = g.smooth = !1)),
            T.enable()
        }),
        (e.onDisable = function () {
          Oa(l, !0),
            Be(oe, 'resize', D),
            X.removeEventListener('refresh', D),
            T.kill()
        }),
        (e.lockAxis = e.lockAxis !== !1),
        (a = new Pe(e)),
        (a.iOS = qr),
        qr && !d() && d(1),
        qr && B.ticker.add(ur),
        (O = a._dc),
        (k = B.to(a, {
          ease: 'power4',
          paused: !0,
          inherit: !1,
          scrollX: t ? '+=0.1' : '+=0',
          scrollY: '+=0.1',
          modifiers: {
            scrollY: _c(d, d(), function () {
              return k.pause()
            }),
          },
          onUpdate: wr,
          onComplete: O.vars.onComplete,
        })),
        a
      )
    }
  ;(X.sort = function (s) {
    return te.sort(
      s ||
        function (e, r) {
          return (
            (e.vars.refreshPriority || 0) * -1e6 +
            e.start -
            (r.start + (r.vars.refreshPriority || 0) * -1e6)
          )
        }
    )
  }),
    (X.observe = function (s) {
      return new Pe(s)
    }),
    (X.normalizeScroll = function (s) {
      if (typeof s > 'u') return ct
      if (s === !0 && ct) return ct.enable()
      if (s === !1) {
        ct && ct.kill(), (ct = s)
        return
      }
      var e = s instanceof Pe ? s : kd(s)
      return (
        ct && ct.target === e.target && ct.kill(), ln(e.target) && (ct = e), e
      )
    }),
    (X.core = {
      _getVelocityProp: ua,
      _inputObserver: bc,
      _scrollers: re,
      _proxies: ar,
      bridge: {
        ss: function () {
          Lt || pn('scrollStart'), (Lt = et())
        },
        ref: function () {
          return Je
        },
      },
    }),
    ec() && B.registerPlugin(X)
  /*!
   * paths 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var Od = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    Ad = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    Md = Math.PI / 180,
    Xs = Math.sin,
    Ws = Math.cos,
    $i = Math.abs,
    Yi = Math.sqrt,
    Dd = function (e) {
      return typeof e == 'number'
    },
    Tc = 1e5,
    $r = function (e) {
      return Math.round(e * Tc) / Tc || 0
    }
  function Rd(s, e, r, t, n, i, o) {
    for (var a = s.length, u, l, c, h, f; --a > -1; )
      for (u = s[a], l = u.length, c = 0; c < l; c += 2)
        (h = u[c]),
          (f = u[c + 1]),
          (u[c] = h * e + f * t + i),
          (u[c + 1] = h * r + f * n + o)
    return (s._dirty = 1), s
  }
  function Ld(s, e, r, t, n, i, o, a, u) {
    if (!(s === a && e === u)) {
      ;(r = $i(r)), (t = $i(t))
      var l = (n % 360) * Md,
        c = Ws(l),
        h = Xs(l),
        f = Math.PI,
        d = f * 2,
        g = (s - a) / 2,
        p = (e - u) / 2,
        m = c * g + h * p,
        _ = -h * g + c * p,
        v = m * m,
        y = _ * _,
        b = v / (r * r) + y / (t * t)
      b > 1 && ((r = Yi(b) * r), (t = Yi(b) * t))
      var T = r * r,
        S = t * t,
        w = (T * S - T * y - S * v) / (T * y + S * v)
      w < 0 && (w = 0)
      var P = (i === o ? -1 : 1) * Yi(w),
        E = P * ((r * _) / t),
        C = P * -((t * m) / r),
        L = (s + a) / 2,
        k = (e + u) / 2,
        R = L + (c * E - h * C),
        A = k + (h * E + c * C),
        O = (m - E) / r,
        D = (_ - C) / t,
        I = (-m - E) / r,
        F = (-_ - C) / t,
        z = O * O + D * D,
        x = (D < 0 ? -1 : 1) * Math.acos(O / Yi(z)),
        N =
          (O * F - D * I < 0 ? -1 : 1) *
          Math.acos((O * I + D * F) / Yi(z * (I * I + F * F)))
      isNaN(N) && (N = f),
        !o && N > 0 ? (N -= d) : o && N < 0 && (N += d),
        (x %= d),
        (N %= d)
      var H = Math.ceil($i(N) / (d / 4)),
        ae = [],
        ee = N / H,
        G = ((4 / 3) * Xs(ee / 2)) / (1 + Ws(ee / 2)),
        W = c * r,
        ce = h * r,
        K = h * -t,
        _e = c * t,
        ue
      for (ue = 0; ue < H; ue++)
        (n = x + ue * ee),
          (m = Ws(n)),
          (_ = Xs(n)),
          (O = Ws((n += ee))),
          (D = Xs(n)),
          ae.push(m - G * _, _ + G * m, O + G * D, D - G * O, O, D)
      for (ue = 0; ue < ae.length; ue += 2)
        (m = ae[ue]),
          (_ = ae[ue + 1]),
          (ae[ue] = m * W + _ * K + R),
          (ae[ue + 1] = m * ce + _ * _e + A)
      return (ae[ue - 2] = a), (ae[ue - 1] = u), ae
    }
  }
  function Id(s) {
    var e =
        (s + '')
          .replace(Ad, function (E) {
            var C = +E
            return C < 1e-4 && C > -1e-4 ? 0 : C
          })
          .match(Od) || [],
      r = [],
      t = 0,
      n = 0,
      i = 2 / 3,
      o = e.length,
      a = 0,
      u = 'ERROR: malformed path: ' + s,
      l,
      c,
      h,
      f,
      d,
      g,
      p,
      m,
      _,
      v,
      y,
      b,
      T,
      S,
      w,
      P = function (C, L, k, R) {
        ;(v = (k - C) / 3),
          (y = (R - L) / 3),
          p.push(C + v, L + y, k - v, R - y, k, R)
      }
    if (!s || !isNaN(e[0]) || isNaN(e[1])) return console.log(u), r
    for (l = 0; l < o; l++)
      if (
        ((T = d),
        isNaN(e[l]) ? ((d = e[l].toUpperCase()), (g = d !== e[l])) : l--,
        (h = +e[l + 1]),
        (f = +e[l + 2]),
        g && ((h += t), (f += n)),
        l || ((m = h), (_ = f)),
        d === 'M')
      )
        p && (p.length < 8 ? (r.length -= 1) : (a += p.length)),
          (t = m = h),
          (n = _ = f),
          (p = [h, f]),
          r.push(p),
          (l += 2),
          (d = 'L')
      else if (d === 'C')
        p || (p = [0, 0]),
          g || (t = n = 0),
          p.push(
            h,
            f,
            t + e[l + 3] * 1,
            n + e[l + 4] * 1,
            (t += e[l + 5] * 1),
            (n += e[l + 6] * 1)
          ),
          (l += 6)
      else if (d === 'S')
        (v = t),
          (y = n),
          (T === 'C' || T === 'S') &&
            ((v += t - p[p.length - 4]), (y += n - p[p.length - 3])),
          g || (t = n = 0),
          p.push(v, y, h, f, (t += e[l + 3] * 1), (n += e[l + 4] * 1)),
          (l += 4)
      else if (d === 'Q')
        (v = t + (h - t) * i),
          (y = n + (f - n) * i),
          g || (t = n = 0),
          (t += e[l + 3] * 1),
          (n += e[l + 4] * 1),
          p.push(v, y, t + (h - t) * i, n + (f - n) * i, t, n),
          (l += 4)
      else if (d === 'T')
        (v = t - p[p.length - 4]),
          (y = n - p[p.length - 3]),
          p.push(
            t + v,
            n + y,
            h + (t + v * 1.5 - h) * i,
            f + (n + y * 1.5 - f) * i,
            (t = h),
            (n = f)
          ),
          (l += 2)
      else if (d === 'H') P(t, n, (t = h), n), (l += 1)
      else if (d === 'V') P(t, n, t, (n = h + (g ? n - t : 0))), (l += 1)
      else if (d === 'L' || d === 'Z')
        d === 'Z' && ((h = m), (f = _), (p.closed = !0)),
          (d === 'L' || $i(t - h) > 0.5 || $i(n - f) > 0.5) &&
            (P(t, n, h, f), d === 'L' && (l += 2)),
          (t = h),
          (n = f)
      else if (d === 'A') {
        if (
          ((S = e[l + 4]),
          (w = e[l + 5]),
          (v = e[l + 6]),
          (y = e[l + 7]),
          (c = 7),
          S.length > 1 &&
            (S.length < 3
              ? ((y = v), (v = w), c--)
              : ((y = w), (v = S.substr(2)), (c -= 2)),
            (w = S.charAt(1)),
            (S = S.charAt(0))),
          (b = Ld(
            t,
            n,
            +e[l + 1],
            +e[l + 2],
            +e[l + 3],
            +S,
            +w,
            (g ? t : 0) + v * 1,
            (g ? n : 0) + y * 1
          )),
          (l += c),
          b)
        )
          for (c = 0; c < b.length; c++) p.push(b[c])
        ;(t = p[p.length - 2]), (n = p[p.length - 1])
      } else console.log(u)
    return (
      (l = p.length),
      l < 6
        ? (r.pop(), (l = 0))
        : p[0] === p[l - 2] && p[1] === p[l - 1] && (p.closed = !0),
      (r.totalPoints = a + l),
      r
    )
  }
  function Fd(s) {
    Dd(s[0]) && (s = [s])
    var e = '',
      r = s.length,
      t,
      n,
      i,
      o
    for (n = 0; n < r; n++) {
      for (
        o = s[n],
          e += 'M' + $r(o[0]) + ',' + $r(o[1]) + ' C',
          t = o.length,
          i = 2;
        i < t;
        i++
      )
        e +=
          $r(o[i++]) +
          ',' +
          $r(o[i++]) +
          ' ' +
          $r(o[i++]) +
          ',' +
          $r(o[i++]) +
          ' ' +
          $r(o[i++]) +
          ',' +
          $r(o[i]) +
          ' '
      o.closed && (e += 'z')
    }
    return e
  }
  /*!
   * CustomEase 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var wt,
    Sc,
    Cc = function () {
      return (
        wt ||
        (typeof window < 'u' && (wt = window.gsap) && wt.registerPlugin && wt)
      )
    },
    Ec = function () {
      ;(wt = Cc()),
        wt
          ? (wt.registerEase('_CE', Hi.create), (Sc = 1))
          : console.warn('Please gsap.registerPlugin(CustomEase)')
    },
    zd = 1e20,
    js = function (e) {
      return ~~(e * 1e3 + (e < 0 ? -0.5 : 0.5)) / 1e3
    },
    Vd = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,
    Nd = /[cLlsSaAhHvVtTqQ]/g,
    Bd = function (e) {
      var r = e.length,
        t = zd,
        n
      for (n = 1; n < r; n += 6) +e[n] < t && (t = +e[n])
      return t
    },
    qd = function (e, r, t) {
      !t && t !== 0 && (t = Math.max(+e[e.length - 1], +e[1]))
      var n = +e[0] * -1,
        i = -t,
        o = e.length,
        a = 1 / (+e[o - 2] + n),
        u =
          -r ||
          (Math.abs(+e[o - 1] - +e[1]) < 0.01 * (+e[o - 2] - +e[0])
            ? Bd(e) + i
            : +e[o - 1] + i),
        l
      for (u ? (u = 1 / u) : (u = -a), l = 0; l < o; l += 2)
        (e[l] = (+e[l] + n) * a), (e[l + 1] = (+e[l + 1] + i) * u)
    },
    $d = function s(e, r, t, n, i, o, a, u, l, c, h) {
      var f = (e + t) / 2,
        d = (r + n) / 2,
        g = (t + i) / 2,
        p = (n + o) / 2,
        m = (i + a) / 2,
        _ = (o + u) / 2,
        v = (f + g) / 2,
        y = (d + p) / 2,
        b = (g + m) / 2,
        T = (p + _) / 2,
        S = (v + b) / 2,
        w = (y + T) / 2,
        P = a - e,
        E = u - r,
        C = Math.abs((t - a) * E - (n - u) * P),
        L = Math.abs((i - a) * E - (o - u) * P),
        k
      return (
        c ||
          ((c = [
            { x: e, y: r },
            { x: a, y: u },
          ]),
          (h = 1)),
        c.splice(h || c.length - 1, 0, { x: S, y: w }),
        (C + L) * (C + L) > l * (P * P + E * E) &&
          ((k = c.length),
          s(e, r, f, d, v, y, S, w, l, c, h),
          s(S, w, b, T, m, _, a, u, l, c, h + 1 + (c.length - k))),
        c
      )
    },
    Hi = (function () {
      function s(r, t, n) {
        Sc || Ec(), (this.id = r), this.setData(t, n)
      }
      var e = s.prototype
      return (
        (e.setData = function (t, n) {
          ;(n = n || {}), (t = t || '0,0,1,1')
          var i = t.match(Vd),
            o = 1,
            a = [],
            u = [],
            l = n.precision || 1,
            c = l <= 1,
            h,
            f,
            d,
            g,
            p,
            m,
            _,
            v,
            y
          if (
            ((this.data = t),
            (Nd.test(t) || (~t.indexOf('M') && t.indexOf('C') < 0)) &&
              (i = Id(t)[0]),
            (h = i.length),
            h === 4)
          )
            i.unshift(0, 0), i.push(1, 1), (h = 8)
          else if ((h - 2) % 6) throw 'Invalid CustomEase'
          for (
            (+i[0] != 0 || +i[h - 2] != 1) && qd(i, n.height, n.originY),
              this.segment = i,
              g = 2;
            g < h;
            g += 6
          )
            (f = { x: +i[g - 2], y: +i[g - 1] }),
              (d = { x: +i[g + 4], y: +i[g + 5] }),
              a.push(f, d),
              $d(
                f.x,
                f.y,
                +i[g],
                +i[g + 1],
                +i[g + 2],
                +i[g + 3],
                d.x,
                d.y,
                1 / (l * 2e5),
                a,
                a.length - 1
              )
          for (h = a.length, g = 0; g < h; g++)
            (_ = a[g]),
              (v = a[g - 1] || _),
              (_.x > v.x || (v.y !== _.y && v.x === _.x) || _ === v) && _.x <= 1
                ? ((v.cx = _.x - v.x),
                  (v.cy = _.y - v.y),
                  (v.n = _),
                  (v.nx = _.x),
                  c &&
                    g > 1 &&
                    Math.abs(v.cy / v.cx - a[g - 2].cy / a[g - 2].cx) > 2 &&
                    (c = 0),
                  v.cx < o &&
                    (v.cx
                      ? (o = v.cx)
                      : ((v.cx = 0.001),
                        g === h - 1 &&
                          ((v.x -= 0.001), (o = Math.min(o, 0.001)), (c = 0)))))
                : (a.splice(g--, 1), h--)
          if (((h = (1 / o + 1) | 0), (p = 1 / h), (m = 0), (_ = a[0]), c)) {
            for (g = 0; g < h; g++)
              (y = g * p),
                _.nx < y && (_ = a[++m]),
                (f = _.y + ((y - _.x) / _.cx) * _.cy),
                (u[g] = { x: y, cx: p, y: f, cy: 0, nx: 9 }),
                g && (u[g - 1].cy = f - u[g - 1].y)
            u[h - 1].cy = a[a.length - 1].y - f
          } else {
            for (g = 0; g < h; g++) _.nx < g * p && (_ = a[++m]), (u[g] = _)
            m < a.length - 1 && (u[g - 1] = a[a.length - 2])
          }
          return (
            (this.ease = function (b) {
              var T = u[(b * h) | 0] || u[h - 1]
              return T.nx < b && (T = T.n), T.y + ((b - T.x) / T.cx) * T.cy
            }),
            (this.ease.custom = this),
            this.id && wt && wt.registerEase(this.id, this.ease),
            this
          )
        }),
        (e.getSVGData = function (t) {
          return s.getSVGData(this, t)
        }),
        (s.create = function (t, n, i) {
          return new s(t, n, i).ease
        }),
        (s.register = function (t) {
          ;(wt = t), Ec()
        }),
        (s.get = function (t) {
          return wt.parseEase(t)
        }),
        (s.getSVGData = function (t, n) {
          n = n || {}
          var i = n.width || 100,
            o = n.height || 100,
            a = n.x || 0,
            u = (n.y || 0) + o,
            l = wt.utils.toArray(n.path)[0],
            c,
            h,
            f,
            d,
            g,
            p,
            m,
            _,
            v,
            y
          if (
            (n.invert && ((o = -o), (u = 0)),
            typeof t == 'string' && (t = wt.parseEase(t)),
            t.custom && (t = t.custom),
            t instanceof s)
          )
            c = Fd(Rd([t.segment], i, 0, 0, -o, a, u))
          else {
            for (
              c = [a, u],
                m = Math.max(5, (n.precision || 1) * 200),
                d = 1 / m,
                m += 2,
                _ = 5 / m,
                v = js(a + d * i),
                y = js(u + t(d) * -o),
                h = (y - u) / (v - a),
                f = 2;
              f < m;
              f++
            )
              (g = js(a + f * d * i)),
                (p = js(u + t(f * d) * -o)),
                (Math.abs((p - y) / (g - v) - h) > _ || f === m - 1) &&
                  (c.push(v, y), (h = (p - y) / (g - v))),
                (v = g),
                (y = p)
            c = 'M' + c.join(',')
          }
          return l && l.setAttribute('d', c), c
        }),
        s
      )
    })()
  Cc() && wt.registerPlugin(Hi), (Hi.version = '3.12.5')
  const Yd = (s) => {
      const e = s.querySelector('.collage-animation_layout')
      $.registerPlugin(Hi)
      const r = Hi.create(
        'custom',
        'M0,0 C0.01,0.074 0.03,0.414 0.054,0.502 0.082,0.604 0.154,0.742 0.2,0.8 0.252,0.865 0.374,0.981 1,0.981 '
      )
      if (!e) return
      const t = window.matchMedia('(max-width: 479px)').matches
      $.set(e.parentElement, { transformPerspective: 2e3 })
      const n = $.timeline({ ease: 'none', onComplete: () => {} })
      n.to(e, { rotateY: 200, duration: 4, ease: r }),
        n.to(e, { z: 100, duration: 1, ease: 'expo.inOut' }, '<2.5'),
        n.to(e, { rotateY: 360, z: 0, duration: 1.5, ease: 'expo.in' })
      const i = [
          -200 * (t ? 0.5 : 1),
          -120 * (t ? 0.5 : 1),
          -150 * (t ? 0.5 : 1),
          -90 * (t ? 0.5 : 1),
          0,
          60 * (t ? 0.5 : 1),
          100 * (t ? 0.5 : 1),
          80 * (t ? 0.5 : 1),
          200 * (t ? 0.5 : 1),
        ],
        o = [-100, 0, 150, 70, 0, 200, 120, -80, 150],
        a = e.querySelectorAll('.collage-animation_image-wrapper'),
        u = $.timeline({ defaults: { ease: 'none' } }),
        l = $.timeline({ defaults: { ease: 'none' } }),
        c = Array.from(a).map((h, f) => {
          let d = f - a.length / 2 + 0.5,
            g = i[f],
            p = o[f]
          return { image: h, newIndex: d, xOffset: g, yOffset: p }
        })
      u.to(a, {
        z: (h) => c[h].newIndex * 40,
        x: (h) => c[h].xOffset,
        y: (h) => c[h].yOffset,
        duration: 4,
        ease: r,
      }),
        l.to(a, {
          z: (h) => c[h].newIndex,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'expo.inOut',
        }),
        l.to(a, { opacity: 0, duration: 1.5, ease: 'expo.inOut' }, '<0.7'),
        n.add(u, '0'),
        n.add(l, '-=1.8')
    },
    Hd = (s) => {
      if (!window.matchMedia('(hover: hover)').matches) return
      s.querySelectorAll('[animation="cta-link"]').forEach((t) => {
        const n = t.querySelector('.cta-button'),
          i = document.createElement('span')
        ;(i.innerHTML = '→'),
          (i.style.position = 'absolute'),
          (i.style.left = '-20px'),
          (i.style.opacity = '0'),
          (n.style.position = 'relative'),
          n.prepend(i)
        const o = document.createElement('span')
        ;(o.style.position = 'absolute'),
          (o.style.bottom = '0'),
          (o.style.left = '0'),
          (o.style.width = '0'),
          (o.style.height = '1px'),
          (o.style.backgroundColor = 'currentColor'),
          n.appendChild(o),
          t.addEventListener('mouseenter', () => {
            $.to(i, { opacity: 1, duration: 0.3 }),
              $.to(n, { x: 10, duration: 0.3 }),
              $.to(o, { width: '100%', duration: 0.3 })
          }),
          t.addEventListener('mouseleave', () => {
            $.to(i, { opacity: 0, duration: 0.3 }),
              $.to(n, { x: 0, duration: 0.3 }),
              $.to(o, { width: '0', duration: 0.3 })
          })
      })
    },
    Xd = (s) => {
      $.registerPlugin(X),
        s.querySelectorAll('.storydetail-image').forEach((r) => {
          const t = $.timeline({ paused: !0 })
          X.create({
            trigger: r.parentNode,
            start: 'top 100%',
            end: 'bottom bottom',
            animation: t,
          }),
            t.from(r, {
              scale: 0.8,
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut',
            })
        })
    },
    Wd = (s) => {
      $.registerPlugin(X),
        s.querySelectorAll('.projectcard_component').forEach((r) => {
          const t = $.timeline({ paused: !0 })
          X.create({
            trigger: r,
            start: 'top 100%',
            end: 'bottom bottom',
            animation: t,
          }),
            t.from(r, {
              scale: 0.8,
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut',
            })
        })
    },
    jd = () => {
      if (!window.matchMedia('(hover: hover)').matches) return
      document.querySelectorAll('.footer_link, [cta-link]').forEach((r) => {
        const t = document.createElement('span')
        ;(t.innerHTML = '→'),
          (t.style.position = 'absolute'),
          (t.style.left = '-20px'),
          (t.style.opacity = '0'),
          (r.style.position = 'relative'),
          r.prepend(t)
        const n = document.createElement('span')
        ;(n.style.position = 'absolute'),
          (n.style.bottom = '0'),
          (n.style.left = '0'),
          (n.style.width = '0'),
          (n.style.height = '1px'),
          (n.style.backgroundColor = 'currentColor'),
          r.appendChild(n),
          r.addEventListener('mouseenter', () => {
            $.to(t, { opacity: 1, duration: 0.3 }),
              $.to(r, { x: 10, duration: 0.3 }),
              $.to(n, { width: '100%', duration: 0.3 })
          }),
          r.addEventListener('mouseleave', () => {
            $.to(t, { opacity: 0, duration: 0.3 }),
              $.to(r, { x: 0, duration: 0.3 }),
              $.to(n, { width: '0', duration: 0.3 })
          })
      })
    },
    Ud = (s) => {
      s.querySelectorAll('.footertextscrolling_marquee').forEach((r) => {
        $.to(r, { x: '100%', duration: 25, ease: 'none', repeat: -1 })
      })
    },
    Gd = (s) => {
      $.registerPlugin(X)
      const e = s.querySelectorAll('[animation="hero-logo-slide"]'),
        r = matchMedia('(max-width: 767px)').matches
      e.forEach((t) => {
        const n = $.timeline({ paused: !0 })
        X.create({
          trigger: t.parentNode,
          start: 'top 100%',
          end: 'bottom bottom',
          animation: n,
        }),
          n.from(t, {
            y: r ? '-100%' : '100%',
            delay: 0.5,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
          })
      })
    }
  ;(function () {
    function s() {
      for (var t = arguments.length, n = 0; n < t; n++) {
        var i = n < 0 || arguments.length <= n ? void 0 : arguments[n]
        i.nodeType === 1 || i.nodeType === 11
          ? this.appendChild(i)
          : this.appendChild(document.createTextNode(String(i)))
      }
    }
    function e() {
      for (; this.lastChild; ) this.removeChild(this.lastChild)
      arguments.length && this.append.apply(this, arguments)
    }
    function r() {
      for (
        var t = this.parentNode, n = arguments.length, i = new Array(n), o = 0;
        o < n;
        o++
      )
        i[o] = arguments[o]
      var a = i.length
      if (t)
        for (a || t.removeChild(this); a--; ) {
          var u = i[a]
          typeof u != 'object'
            ? (u = this.ownerDocument.createTextNode(u))
            : u.parentNode && u.parentNode.removeChild(u),
            a
              ? t.insertBefore(this.previousSibling, u)
              : t.replaceChild(u, this)
        }
    }
    typeof Element < 'u' &&
      (Element.prototype.append ||
        ((Element.prototype.append = s),
        (DocumentFragment.prototype.append = s)),
      Element.prototype.replaceChildren ||
        ((Element.prototype.replaceChildren = e),
        (DocumentFragment.prototype.replaceChildren = e)),
      Element.prototype.replaceWith ||
        ((Element.prototype.replaceWith = r),
        (DocumentFragment.prototype.replaceWith = r)))
  })()
  function Kd(s, e) {
    if (!(s instanceof e))
      throw new TypeError('Cannot call a class as a function')
  }
  function Pc(s, e) {
    for (var r = 0; r < e.length; r++) {
      var t = e[r]
      ;(t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        'value' in t && (t.writable = !0),
        Object.defineProperty(s, t.key, t)
    }
  }
  function kc(s, e, r) {
    return e && Pc(s.prototype, e), r && Pc(s, r), s
  }
  function Zd(s, e, r) {
    return (
      e in s
        ? Object.defineProperty(s, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (s[e] = r),
      s
    )
  }
  function Oc(s, e) {
    var r = Object.keys(s)
    if (Object.getOwnPropertySymbols) {
      var t = Object.getOwnPropertySymbols(s)
      e &&
        (t = t.filter(function (n) {
          return Object.getOwnPropertyDescriptor(s, n).enumerable
        })),
        r.push.apply(r, t)
    }
    return r
  }
  function Ac(s) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e] != null ? arguments[e] : {}
      e % 2
        ? Oc(Object(r), !0).forEach(function (t) {
            Zd(s, t, r[t])
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(r))
        : Oc(Object(r)).forEach(function (t) {
            Object.defineProperty(s, t, Object.getOwnPropertyDescriptor(r, t))
          })
    }
    return s
  }
  function Mc(s, e) {
    return Jd(s) || tp(s, e) || Dc(s, e) || np()
  }
  function dt(s) {
    return Qd(s) || ep(s) || Dc(s) || rp()
  }
  function Qd(s) {
    if (Array.isArray(s)) return Aa(s)
  }
  function Jd(s) {
    if (Array.isArray(s)) return s
  }
  function ep(s) {
    if (typeof Symbol < 'u' && Symbol.iterator in Object(s))
      return Array.from(s)
  }
  function tp(s, e) {
    if (!(typeof Symbol > 'u' || !(Symbol.iterator in Object(s)))) {
      var r = [],
        t = !0,
        n = !1,
        i = void 0
      try {
        for (
          var o = s[Symbol.iterator](), a;
          !(t = (a = o.next()).done) &&
          (r.push(a.value), !(e && r.length === e));
          t = !0
        );
      } catch (u) {
        ;(n = !0), (i = u)
      } finally {
        try {
          !t && o.return != null && o.return()
        } finally {
          if (n) throw i
        }
      }
      return r
    }
  }
  function Dc(s, e) {
    if (s) {
      if (typeof s == 'string') return Aa(s, e)
      var r = Object.prototype.toString.call(s).slice(8, -1)
      if (
        (r === 'Object' && s.constructor && (r = s.constructor.name),
        r === 'Map' || r === 'Set')
      )
        return Array.from(s)
      if (
        r === 'Arguments' ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return Aa(s, e)
    }
  }
  function Aa(s, e) {
    ;(e == null || e > s.length) && (e = s.length)
    for (var r = 0, t = new Array(e); r < e; r++) t[r] = s[r]
    return t
  }
  function rp() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
  }
  function np() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
  }
  function _n(s, e) {
    return Object.getOwnPropertyNames(Object(s)).reduce(function (r, t) {
      var n = Object.getOwnPropertyDescriptor(Object(s), t),
        i = Object.getOwnPropertyDescriptor(Object(e), t)
      return Object.defineProperty(r, t, i || n)
    }, {})
  }
  function Xi(s) {
    return typeof s == 'string'
  }
  function Ma(s) {
    return Array.isArray(s)
  }
  function Us() {
    var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      e = _n(s),
      r
    return (
      e.types !== void 0 ? (r = e.types) : e.split !== void 0 && (r = e.split),
      r !== void 0 &&
        (e.types = (Xi(r) || Ma(r) ? String(r) : '')
          .split(',')
          .map(function (t) {
            return String(t).trim()
          })
          .filter(function (t) {
            return /((line)|(word)|(char))/i.test(t)
          })),
      (e.absolute || e.position) &&
        (e.absolute = e.absolute || /absolute/.test(s.position)),
      e
    )
  }
  function Da(s) {
    var e = Xi(s) || Ma(s) ? String(s) : ''
    return {
      none: !e,
      lines: /line/i.test(e),
      words: /word/i.test(e),
      chars: /char/i.test(e),
    }
  }
  function Gs(s) {
    return s !== null && typeof s == 'object'
  }
  function ip(s) {
    return Gs(s) && /^(1|3|11)$/.test(s.nodeType)
  }
  function sp(s) {
    return typeof s == 'number' && s > -1 && s % 1 === 0
  }
  function op(s) {
    return Gs(s) && sp(s.length)
  }
  function vn(s) {
    return Ma(s)
      ? s
      : s == null
      ? []
      : op(s)
      ? Array.prototype.slice.call(s)
      : [s]
  }
  function Rc(s) {
    var e = s
    return (
      Xi(s) &&
        (/^(#[a-z]\w+)$/.test(s.trim())
          ? (e = document.getElementById(s.trim().slice(1)))
          : (e = document.querySelectorAll(s))),
      vn(e).reduce(function (r, t) {
        return [].concat(dt(r), dt(vn(t).filter(ip)))
      }, [])
    )
  }
  var ap = Object.entries,
    Ks = '_splittype',
    $t = {},
    up = 0
  function cr(s, e, r) {
    if (!Gs(s)) return console.warn('[data.set] owner is not an object'), null
    var t = s[Ks] || (s[Ks] = ++up),
      n = $t[t] || ($t[t] = {})
    return (
      r === void 0
        ? e &&
          Object.getPrototypeOf(e) === Object.prototype &&
          ($t[t] = Ac(Ac({}, n), e))
        : e !== void 0 && (n[e] = r),
      r
    )
  }
  function yn(s, e) {
    var r = Gs(s) ? s[Ks] : null,
      t = (r && $t[r]) || {}
    return t
  }
  function Lc(s) {
    var e = s && s[Ks]
    e && (delete s[e], delete $t[e])
  }
  function lp() {
    Object.keys($t).forEach(function (s) {
      delete $t[s]
    })
  }
  function cp() {
    ap($t).forEach(function (s) {
      var e = Mc(s, 2),
        r = e[0],
        t = e[1],
        n = t.isRoot,
        i = t.isSplit
      ;(!n || !i) && (($t[r] = null), delete $t[r])
    })
  }
  function fp(s) {
    var e =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ' ',
      r = s ? String(s) : ''
    return r.trim().replace(/\s+/g, ' ').split(e)
  }
  var Ra = '\\ud800-\\udfff',
    Ic = '\\u0300-\\u036f\\ufe20-\\ufe23',
    Fc = '\\u20d0-\\u20f0',
    zc = '\\ufe0e\\ufe0f',
    hp = '['.concat(Ra, ']'),
    La = '['.concat(Ic).concat(Fc, ']'),
    Ia = '\\ud83c[\\udffb-\\udfff]',
    dp = '(?:'.concat(La, '|').concat(Ia, ')'),
    Vc = '[^'.concat(Ra, ']'),
    Nc = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    Bc = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    qc = '\\u200d',
    $c = ''.concat(dp, '?'),
    Yc = '['.concat(zc, ']?'),
    pp = '(?:' + qc + '(?:' + [Vc, Nc, Bc].join('|') + ')' + Yc + $c + ')*',
    gp = Yc + $c + pp,
    mp = '(?:'.concat(
      [''.concat(Vc).concat(La, '?'), La, Nc, Bc, hp].join('|'),
      `
)`
    ),
    _p = RegExp(
      ''.concat(Ia, '(?=').concat(Ia, ')|').concat(mp).concat(gp),
      'g'
    ),
    vp = [qc, Ra, Ic, Fc, zc],
    yp = RegExp('['.concat(vp.join(''), ']'))
  function bp(s) {
    return s.split('')
  }
  function Hc(s) {
    return yp.test(s)
  }
  function wp(s) {
    return s.match(_p) || []
  }
  function xp(s) {
    return Hc(s) ? wp(s) : bp(s)
  }
  function Tp(s) {
    return s == null ? '' : String(s)
  }
  function Sp(s) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ''
    return (s = Tp(s)), s && Xi(s) && !e && Hc(s) ? xp(s) : s.split(e)
  }
  function Fa(s, e) {
    var r = document.createElement(s)
    return (
      e &&
        Object.keys(e).forEach(function (t) {
          var n = e[t],
            i = Xi(n) ? n.trim() : n
          i === null ||
            i === '' ||
            (t === 'children'
              ? r.append.apply(r, dt(vn(i)))
              : r.setAttribute(t, i))
        }),
      r
    )
  }
  var za = {
    splitClass: '',
    lineClass: 'line',
    wordClass: 'word',
    charClass: 'char',
    types: ['lines', 'words', 'chars'],
    absolute: !1,
    tagName: 'div',
  }
  function Cp(s, e) {
    e = _n(za, e)
    var r = Da(e.types),
      t = e.tagName,
      n = s.nodeValue,
      i = document.createDocumentFragment(),
      o = [],
      a = []
    return (
      /^\s/.test(n) && i.append(' '),
      (o = fp(n).reduce(function (u, l, c, h) {
        var f, d
        return (
          r.chars &&
            (d = Sp(l).map(function (g) {
              var p = Fa(t, {
                class: ''.concat(e.splitClass, ' ').concat(e.charClass),
                style: 'display: inline-block;',
                children: g,
              })
              return cr(p, 'isChar', !0), (a = [].concat(dt(a), [p])), p
            })),
          r.words || r.lines
            ? ((f = Fa(t, {
                class: ''.concat(e.wordClass, ' ').concat(e.splitClass),
                style: 'display: inline-block; '.concat(
                  r.words && e.absolute ? 'position: relative;' : ''
                ),
                children: r.chars ? d : l,
              })),
              cr(f, { isWord: !0, isWordStart: !0, isWordEnd: !0 }),
              i.appendChild(f))
            : d.forEach(function (g) {
                i.appendChild(g)
              }),
          c < h.length - 1 && i.append(' '),
          r.words ? u.concat(f) : u
        )
      }, [])),
      /\s$/.test(n) && i.append(' '),
      s.replaceWith(i),
      { words: o, chars: a }
    )
  }
  function Xc(s, e) {
    var r = s.nodeType,
      t = { words: [], chars: [] }
    if (!/(1|3|11)/.test(r)) return t
    if (r === 3 && /\S/.test(s.nodeValue)) return Cp(s, e)
    var n = vn(s.childNodes)
    if (n.length && (cr(s, 'isSplit', !0), !yn(s).isRoot)) {
      ;(s.style.display = 'inline-block'), (s.style.position = 'relative')
      var i = s.nextSibling,
        o = s.previousSibling,
        a = s.textContent || '',
        u = i ? i.textContent : ' ',
        l = o ? o.textContent : ' '
      cr(s, {
        isWordEnd: /\s$/.test(a) || /^\s/.test(u),
        isWordStart: /^\s/.test(a) || /\s$/.test(l),
      })
    }
    return n.reduce(function (c, h) {
      var f = Xc(h, e),
        d = f.words,
        g = f.chars
      return {
        words: [].concat(dt(c.words), dt(d)),
        chars: [].concat(dt(c.chars), dt(g)),
      }
    }, t)
  }
  function Ep(s, e, r, t) {
    if (!r.absolute) return { top: e ? s.offsetTop : null }
    var n = s.offsetParent,
      i = Mc(t, 2),
      o = i[0],
      a = i[1],
      u = 0,
      l = 0
    if (n && n !== document.body) {
      var c = n.getBoundingClientRect()
      ;(u = c.x + o), (l = c.y + a)
    }
    var h = s.getBoundingClientRect(),
      f = h.width,
      d = h.height,
      g = h.x,
      p = h.y,
      m = p + a - l,
      _ = g + o - u
    return { width: f, height: d, top: m, left: _ }
  }
  function Wc(s) {
    yn(s).isWord
      ? (Lc(s), s.replaceWith.apply(s, dt(s.childNodes)))
      : vn(s.children).forEach(function (e) {
          return Wc(e)
        })
  }
  var Pp = function () {
    return document.createDocumentFragment()
  }
  function kp(s, e, r) {
    var t = Da(e.types),
      n = e.tagName,
      i = s.getElementsByTagName('*'),
      o = [],
      a = [],
      u = null,
      l,
      c,
      h,
      f = [],
      d = s.parentElement,
      g = s.nextElementSibling,
      p = Pp(),
      m = window.getComputedStyle(s),
      _ = m.textAlign,
      v = parseFloat(m.fontSize),
      y = v * 0.2
    return (
      e.absolute &&
        ((h = { left: s.offsetLeft, top: s.offsetTop, width: s.offsetWidth }),
        (c = s.offsetWidth),
        (l = s.offsetHeight),
        cr(s, { cssWidth: s.style.width, cssHeight: s.style.height })),
      vn(i).forEach(function (b) {
        var T = b.parentElement === s,
          S = Ep(b, T, e, r),
          w = S.width,
          P = S.height,
          E = S.top,
          C = S.left
        ;/^br$/i.test(b.nodeName) ||
          (t.lines &&
            T &&
            ((u === null || E - u >= y) && ((u = E), o.push((a = []))),
            a.push(b)),
          e.absolute && cr(b, { top: E, left: C, width: w, height: P }))
      }),
      d && d.removeChild(s),
      t.lines &&
        ((f = o.map(function (b) {
          var T = Fa(n, {
            class: ''.concat(e.splitClass, ' ').concat(e.lineClass),
            style: 'display: block; text-align: '.concat(_, '; width: 100%;'),
          })
          cr(T, 'isLine', !0)
          var S = { height: 0, top: 1e4 }
          return (
            p.appendChild(T),
            b.forEach(function (w, P, E) {
              var C = yn(w),
                L = C.isWordEnd,
                k = C.top,
                R = C.height,
                A = E[P + 1]
              ;(S.height = Math.max(S.height, R)),
                (S.top = Math.min(S.top, k)),
                T.appendChild(w),
                L && yn(A).isWordStart && T.append(' ')
            }),
            e.absolute && cr(T, { height: S.height, top: S.top }),
            T
          )
        })),
        t.words || Wc(p),
        s.replaceChildren(p)),
      e.absolute &&
        ((s.style.width = ''.concat(s.style.width || c, 'px')),
        (s.style.height = ''.concat(l, 'px')),
        vn(i).forEach(function (b) {
          var T = yn(b),
            S = T.isLine,
            w = T.top,
            P = T.left,
            E = T.width,
            C = T.height,
            L = yn(b.parentElement),
            k = !S && L.isLine
          ;(b.style.top = ''.concat(k ? w - L.top : w, 'px')),
            (b.style.left = S
              ? ''.concat(h.left, 'px')
              : ''.concat(P - (k ? h.left : 0), 'px')),
            (b.style.height = ''.concat(C, 'px')),
            (b.style.width = S ? ''.concat(h.width, 'px') : ''.concat(E, 'px')),
            (b.style.position = 'absolute')
        })),
      d && (g ? d.insertBefore(s, g) : d.appendChild(s)),
      f
    )
  }
  var Kn = _n(za, {}),
    jc = (function () {
      kc(s, null, [
        {
          key: 'clearData',
          value: function () {
            lp()
          },
        },
        {
          key: 'setDefaults',
          value: function (r) {
            return (Kn = _n(Kn, Us(r))), za
          },
        },
        {
          key: 'revert',
          value: function (r) {
            Rc(r).forEach(function (t) {
              var n = yn(t),
                i = n.isSplit,
                o = n.html,
                a = n.cssWidth,
                u = n.cssHeight
              i &&
                ((t.innerHTML = o),
                (t.style.width = a || ''),
                (t.style.height = u || ''),
                Lc(t))
            })
          },
        },
        {
          key: 'create',
          value: function (r, t) {
            return new s(r, t)
          },
        },
        {
          key: 'data',
          get: function () {
            return $t
          },
        },
        {
          key: 'defaults',
          get: function () {
            return Kn
          },
          set: function (r) {
            Kn = _n(Kn, Us(r))
          },
        },
      ])
      function s(e, r) {
        Kd(this, s),
          (this.isSplit = !1),
          (this.settings = _n(Kn, Us(r))),
          (this.elements = Rc(e)),
          this.split()
      }
      return (
        kc(s, [
          {
            key: 'split',
            value: function (r) {
              var t = this
              this.revert(),
                this.elements.forEach(function (o) {
                  cr(o, 'html', o.innerHTML)
                }),
                (this.lines = []),
                (this.words = []),
                (this.chars = [])
              var n = [window.pageXOffset, window.pageYOffset]
              r !== void 0 && (this.settings = _n(this.settings, Us(r)))
              var i = Da(this.settings.types)
              i.none ||
                (this.elements.forEach(function (o) {
                  cr(o, 'isRoot', !0)
                  var a = Xc(o, t.settings),
                    u = a.words,
                    l = a.chars
                  ;(t.words = [].concat(dt(t.words), dt(u))),
                    (t.chars = [].concat(dt(t.chars), dt(l)))
                }),
                this.elements.forEach(function (o) {
                  if (i.lines || t.settings.absolute) {
                    var a = kp(o, t.settings, n)
                    t.lines = [].concat(dt(t.lines), dt(a))
                  }
                }),
                (this.isSplit = !0),
                window.scrollTo(n[0], n[1]),
                cp())
            },
          },
          {
            key: 'revert',
            value: function () {
              this.isSplit &&
                ((this.lines = null),
                (this.words = null),
                (this.chars = null),
                (this.isSplit = !1)),
                s.revert(this.elements)
            },
          },
        ]),
        s
      )
    })()
  let Va = []
  const Op = () => {
      document.querySelectorAll('.navbar_link').forEach((e) => {
        const r = jc.create(e)
        Va.push(r)
        const t = document.createElement('div')
        t.classList.add('link_underline'),
          e.appendChild(t),
          e.addEventListener('mouseenter', () => {
            t.classList.add('is-hovered')
          }),
          e.addEventListener('mouseleave', () => {
            t.classList.remove('is-hovered')
          }),
          e.addEventListener('click', () => {
            t.classList.remove('is-hovered')
          })
      })
    },
    Ap = (s) => {
      const e = Array.from(Va).find((r) => {
        var t
        return (
          ((t = r.elements[0]) == null
            ? void 0
            : t.getAttribute('namespace')) == s.current.namespace
        )
      })
      $.to(e.chars, {
        color: '#a1a4a7',
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.inOut',
        onStart: () => {
          e.elements[0].classList.remove('skew')
        },
        onComplete: () => {
          e.elements[0].classList.remove('w--current')
        },
      })
    },
    Mp = (s) => {
      let e = []
      ;(e = Array.from(Va).find((r) => {
        var t
        return (
          ((t = r.elements[0]) == null
            ? void 0
            : t.getAttribute('namespace')) == s.next.namespace
        )
      })),
        $.to(e.chars, {
          color: '#ffffff',
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.inOut',
          onStart: () => {
            e.elements[0].classList.add('skew')
          },
          onComplete: () => {
            e.elements[0].classList.add('w--current')
          },
        })
    }
  function Uc() {
    const s = document.querySelectorAll('[animation="overlapping"]')
    s.length &&
      s.forEach((e) => {
        const r = e.querySelectorAll(
          '.overlapping-images-animation_image-wrapper'
        )
        let t = e.getAttribute('df-direction-mobile')
        if (!r.length) return
        const n = r.length,
          i = Math.floor(n / 2)
        $.set(e, { transformPerspective: 2e3 })
        function o() {
          const f = window.matchMedia('(max-width: 479px)').matches
          return (
            (t = f ? 'vertical' : ''),
            Array.from({ length: n }, (d, g) => {
              const p = f ? (g - i) * 0.3 : g - i
              return {
                x: t === 'vertical' ? 0 : 100 * p,
                y: t === 'vertical' ? 100 * p : 0,
                z: 100 - 50 * Math.abs(p),
              }
            })
          )
        }
        let a = o()
        const u = () => {
          ;(a = o()),
            $.set(r, { x: (f) => a[f].x, y: (f) => a[f].y, z: (f) => a[f].z })
        }
        window.addEventListener('resize', u),
          $.set(r, { x: (f) => a[f].x, y: (f) => a[f].y, z: (f) => a[f].z })
        function l(f) {
          return [f[f.length - 1]].concat(f.slice(0, f.length - 1))
        }
        let c = Array.from({ length: n }, (f, d) => d)
        function h() {
          const d = 'circ.inOut'
          c.forEach((g, p) => {
            const m = (p + 1) % a.length
            p === c.length - 1
              ? $.to(r[g], {
                  x: a[0].x,
                  y: a[0].y,
                  z: a[0].z,
                  delay: 1 / 2,
                  duration: 0,
                })
              : $.to(r[g], {
                  x: a[m].x,
                  y: a[m].y,
                  z: a[m].z,
                  duration: 1,
                  ease: d,
                  ...(p === c.length - 2 && {
                    onComplete: () => {
                      ;(c = l(c)), h()
                    },
                  }),
                })
          })
        }
        return (
          h(),
          () => {
            window.removeEventListener('resize', u)
          }
        )
      })
  }
  function Gc() {
    const s = document.querySelectorAll('[animation="overlapping-smooth"]')
    s.length &&
      s.forEach((e) => {
        const r = e.getAttribute('df-x-offset'),
          t = e.getAttribute('df-direction'),
          n = e.querySelectorAll('.overlapping-images-animation_image-wrapper')
        if (!n.length) return
        const i = n.length,
          o = Math.floor(i / 2)
        $.set(e, { transformPerspective: 2e3 })
        const a = Array.from({ length: i }, (h, f) => {
          const g = window.matchMedia('(max-width: 479px)').matches
            ? (f - o) * 0.3
            : f - o
          return {
            x: t === 'vertical' ? 0 : 120 * g * r,
            y: t === 'vertical' ? 120 * g * r : 0,
            z: 100 - 50 * Math.abs(g),
          }
        })
        $.set(n, { x: (h) => a[h].x, y: (h) => a[h].y, z: (h) => a[h].z })
        let u = Array.from({ length: i }, (h, f) => f)
        function l() {
          const f = 'expo.inOut'
          u.forEach((d, g) => {
            const p = (g + 1) % a.length
            g === u.length - 1
              ? $.to(n[d], {
                  x: a[0].x,
                  y: a[0].y,
                  z: a[0].z,
                  ease: f,
                  duration: 1,
                })
              : $.to(n[d], {
                  x: a[p].x,
                  y: a[p].y,
                  z: a[p].z,
                  duration: 1,
                  ease: f,
                  ...(g === u.length - 2 && {
                    onComplete: () => {
                      ;(u = c(u)), l()
                    },
                  }),
                })
          })
        }
        function c(h) {
          return [h[h.length - 1]].concat(h.slice(0, h.length - 1))
        }
        l()
      })
  }
  var Zn = function () {
    return (
      (Zn =
        Object.assign ||
        function (s) {
          for (var e, r = 1, t = arguments.length; r < t; r++)
            for (var n in (e = arguments[r]))
              Object.prototype.hasOwnProperty.call(e, n) && (s[n] = e[n])
          return s
        }),
      Zn.apply(this, arguments)
    )
  }
  function Kc(s, e, r) {
    for (var t, n = 0, i = e.length; n < i; n++)
      (!t && n in e) ||
        (t || (t = Array.prototype.slice.call(e, 0, n)), (t[n] = e[n]))
    return s.concat(t || Array.prototype.slice.call(e))
  }
  function Zc(s) {
    return Array.prototype.slice.call(s)
  }
  function Qc(s, e) {
    var r = Math.floor(s)
    return r === e || r + 1 === e ? s : e
  }
  function Jc() {
    return Date.now()
  }
  function Na(s, e, r) {
    if (((e = 'data-keen-slider-' + e), r === null)) return s.removeAttribute(e)
    s.setAttribute(e, r || '')
  }
  function Zs(s, e) {
    return (
      (e = e || document),
      typeof s == 'function' && (s = s(e)),
      Array.isArray(s)
        ? s
        : typeof s == 'string'
        ? Zc(e.querySelectorAll(s))
        : s instanceof HTMLElement
        ? [s]
        : s instanceof NodeList
        ? Zc(s)
        : []
    )
  }
  function Wi(s) {
    s.raw && (s = s.raw),
      s.cancelable && !s.defaultPrevented && s.preventDefault()
  }
  function ji(s) {
    s.raw && (s = s.raw), s.stopPropagation && s.stopPropagation()
  }
  function ef() {
    var s = []
    return {
      add: function (e, r, t, n) {
        e.addListener ? e.addListener(t) : e.addEventListener(r, t, n),
          s.push([e, r, t, n])
      },
      input: function (e, r, t, n) {
        this.add(
          e,
          r,
          (function (i) {
            return function (o) {
              o.nativeEvent && (o = o.nativeEvent)
              var a = o.changedTouches || [],
                u = o.targetTouches || [],
                l = o.detail && o.detail.x ? o.detail : null
              return i({
                id: l
                  ? l.identifier
                    ? l.identifier
                    : 'i'
                  : u[0]
                  ? u[0]
                    ? u[0].identifier
                    : 'e'
                  : 'd',
                idChanged: l
                  ? l.identifier
                    ? l.identifier
                    : 'i'
                  : a[0]
                  ? a[0]
                    ? a[0].identifier
                    : 'e'
                  : 'd',
                raw: o,
                x: l && l.x ? l.x : u[0] ? u[0].screenX : l ? l.x : o.pageX,
                y: l && l.y ? l.y : u[0] ? u[0].screenY : l ? l.y : o.pageY,
              })
            }
          })(t),
          n
        )
      },
      purge: function () {
        s.forEach(function (e) {
          e[0].removeListener
            ? e[0].removeListener(e[2])
            : e[0].removeEventListener(e[1], e[2], e[3])
        }),
          (s = [])
      },
    }
  }
  function Ba(s, e, r) {
    return Math.min(Math.max(s, e), r)
  }
  function Yt(s) {
    return (s > 0 ? 1 : 0) - (s < 0 ? 1 : 0) || +s
  }
  function tf(s) {
    var e = s.getBoundingClientRect()
    return {
      height: Qc(e.height, s.offsetHeight),
      width: Qc(e.width, s.offsetWidth),
    }
  }
  function pt(s, e, r, t) {
    var n = s && s[e]
    return n == null ? r : t && typeof n == 'function' ? n() : n
  }
  function zt(s) {
    return Math.round(1e6 * s) / 1e6
  }
  function Dp(s) {
    var e, r, t, n, i, o
    function a(f) {
      o || (o = f), u(!0)
      var d = f - o
      d > t && (d = t)
      var g = n[r]
      if (g[3] < d) return r++, a(f)
      var p = g[2],
        m = g[4],
        _ = g[0],
        v = g[1] * (0, g[5])(m === 0 ? 1 : (d - p) / m)
      if ((v && s.track.to(_ + v), d < t)) return c()
      ;(o = null), u(!1), l(null), s.emit('animationEnded')
    }
    function u(f) {
      e.active = f
    }
    function l(f) {
      e.targetIdx = f
    }
    function c() {
      var f
      ;(f = a), (i = window.requestAnimationFrame(f))
    }
    function h() {
      var f
      ;(f = i),
        window.cancelAnimationFrame(f),
        u(!1),
        l(null),
        o && s.emit('animationStopped'),
        (o = null)
    }
    return (e = {
      active: !1,
      start: function (f) {
        if ((h(), s.track.details)) {
          var d = 0,
            g = s.track.details.position
          ;(r = 0),
            (t = 0),
            (n = f.map(function (p) {
              var m,
                _ = Number(g),
                v = (m = p.earlyExit) !== null && m !== void 0 ? m : p.duration,
                y = p.easing,
                b = p.distance * y(v / p.duration) || 0
              g += b
              var T = t
              return (t += v), (d += b), [_, p.distance, T, t, p.duration, y]
            })),
            l(s.track.distToIdx(d)),
            c(),
            s.emit('animationStarted')
        }
      },
      stop: h,
      targetIdx: null,
    })
  }
  function Rp(s) {
    var e,
      r,
      t,
      n,
      i,
      o,
      a,
      u,
      l,
      c,
      h,
      f,
      d,
      g,
      p = 1 / 0,
      m = [],
      _ = null,
      v = 0
    function y(A) {
      k(v + A)
    }
    function b(A) {
      var O = T(v + A).abs
      return P(O) ? O : null
    }
    function T(A) {
      var O = Math.floor(Math.abs(zt(A / r))),
        D = zt(((A % r) + r) % r)
      D === r && (D = 0)
      var I = Yt(A),
        F = a.indexOf(
          Kc([], a).reduce(function (x, N) {
            return Math.abs(N - D) < Math.abs(x - D) ? N : x
          })
        ),
        z = F
      return (
        I < 0 && O++,
        F === o && ((z = 0), (O += I > 0 ? 1 : -1)),
        { abs: z + O * o * I, origin: F, rel: z }
      )
    }
    function S(A, O, D) {
      var I
      if (O || !C()) return w(A, D)
      if (!P(A)) return null
      var F = T(D ?? v),
        z = F.abs,
        x = A - F.rel,
        N = z + x
      I = w(N)
      var H = w(N - o * Yt(x))
      return (
        ((H !== null && Math.abs(H) < Math.abs(I)) || I === null) && (I = H),
        zt(I)
      )
    }
    function w(A, O) {
      if ((O == null && (O = zt(v)), !P(A) || A === null)) return null
      A = Math.round(A)
      var D = T(O),
        I = D.abs,
        F = D.rel,
        z = D.origin,
        x = L(A),
        N = ((O % r) + r) % r,
        H = a[z],
        ae = Math.floor((A - (I - F)) / o) * r
      return zt(H - N - H + a[x] + ae + (z === o ? r : 0))
    }
    function P(A) {
      return E(A) === A
    }
    function E(A) {
      return Ba(A, l, c)
    }
    function C() {
      return n.loop
    }
    function L(A) {
      return ((A % o) + o) % o
    }
    function k(A) {
      var O
      ;(O = A - v),
        m.push({ distance: O, timestamp: Jc() }),
        m.length > 6 && (m = m.slice(-6)),
        (v = zt(A))
      var D = R().abs
      if (D !== _) {
        var I = _ !== null
        ;(_ = D), I && s.emit('slideChanged')
      }
    }
    function R(A) {
      var O = A
        ? null
        : (function () {
            if (o) {
              var D = C(),
                I = D ? ((v % r) + r) % r : v,
                F = (D ? v % r : v) - i[0][2],
                z = 0 - (F < 0 && D ? r - Math.abs(F) : F),
                x = 0,
                N = T(v),
                H = N.abs,
                ae = N.rel,
                ee = i[ae][2],
                G = i.map(function (W, ce) {
                  var K = z + x
                  ;(K < 0 - W[0] || K > 1) &&
                    (K += (Math.abs(K) > r - 1 && D ? r : 0) * Yt(-K))
                  var _e = ce - ae,
                    ue = Yt(_e),
                    fe = _e + H
                  D &&
                    (ue === -1 && K > ee && (fe += o),
                    ue === 1 && K < ee && (fe -= o),
                    h !== null && fe < h && (K += r),
                    f !== null && fe > f && (K -= r))
                  var qe = K + W[0] + W[1],
                    Y = Math.max(
                      K >= 0 && qe <= 1
                        ? 1
                        : qe < 0 || K > 1
                        ? 0
                        : K < 0
                        ? Math.min(1, (W[0] + K) / W[0])
                        : (1 - K) / W[0],
                      0
                    )
                  return (
                    (x += W[0] + W[1]),
                    {
                      abs: fe,
                      distance: n.rtl ? -1 * K + 1 - W[0] : K,
                      portion: Y,
                      size: W[0],
                    }
                  )
                })
              return (
                (H = E(H)),
                (ae = L(H)),
                {
                  abs: E(H),
                  length: t,
                  max: g,
                  maxIdx: c,
                  min: d,
                  minIdx: l,
                  position: v,
                  progress: D ? I / r : v / t,
                  rel: ae,
                  slides: G,
                  slidesLength: r,
                }
              )
            }
          })()
      return (e.details = O), s.emit('detailsChanged'), O
    }
    return (e = {
      absToRel: L,
      add: y,
      details: null,
      distToIdx: b,
      idxToDist: S,
      init: function (A) {
        if (
          ((function () {
            if (
              ((n = s.options),
              (i = (n.trackConfig || []).map(function (F) {
                return [
                  pt(F, 'size', 1),
                  pt(F, 'spacing', 0),
                  pt(F, 'origin', 0),
                ]
              })),
              (o = i.length))
            ) {
              r = zt(
                i.reduce(function (F, z) {
                  return F + z[0] + z[1]
                }, 0)
              )
              var D,
                I = o - 1
              ;(t = zt(r + i[0][2] - i[I][0] - i[I][2] - i[I][1])),
                (a = i.reduce(function (F, z) {
                  if (!F) return [0]
                  var x = i[F.length - 1],
                    N = F[F.length - 1] + (x[0] + x[2]) + x[1]
                  return (
                    (N -= z[2]),
                    F[F.length - 1] > N && (N = F[F.length - 1]),
                    (N = zt(N)),
                    F.push(N),
                    (!D || D < N) && (u = F.length - 1),
                    (D = N),
                    F
                  )
                }, null)),
                t === 0 && (u = 0),
                a.push(zt(r))
            }
          })(),
          !o)
        )
          return R(!0)
        var O
        ;(function () {
          var D = s.options.range,
            I = s.options.loop
          ;(h = l = I ? pt(I, 'min', -1 / 0) : 0),
            (f = c = I ? pt(I, 'max', p) : u)
          var F = pt(D, 'min', null),
            z = pt(D, 'max', null)
          F !== null && (l = F),
            z !== null && (c = z),
            (d = l === -1 / 0 ? l : s.track.idxToDist(l || 0, !0, 0)),
            (g = c === p ? c : S(c, !0, 0)),
            z === null && (f = c),
            pt(D, 'align', !1) &&
              c !== p &&
              i[L(c)][2] === 0 &&
              ((g -= 1 - i[L(c)][0]), (c = b(g - v))),
            (d = zt(d)),
            (g = zt(g))
        })(),
          (O = A),
          Number(O) === O ? y(w(E(A))) : R()
      },
      to: k,
      velocity: function () {
        var A = Jc(),
          O = m.reduce(
            function (D, I) {
              var F = I.distance,
                z = I.timestamp
              return (
                A - z > 200 ||
                  (Yt(F) !== Yt(D.distance) &&
                    D.distance &&
                    (D = { distance: 0, lastTimestamp: 0, time: 0 }),
                  D.time && (D.distance += F),
                  D.lastTimestamp && (D.time += z - D.lastTimestamp),
                  (D.lastTimestamp = z)),
                D
              )
            },
            { distance: 0, lastTimestamp: 0, time: 0 }
          )
        return O.distance / O.time || 0
      },
    })
  }
  function Lp(s) {
    var e, r, t, n, i, o, a, u
    function l(_) {
      return 2 * _
    }
    function c(_) {
      return Ba(_, a, u)
    }
    function h(_) {
      return 1 - Math.pow(1 - _, 3)
    }
    function f() {
      return t ? s.track.velocity() : 0
    }
    function d() {
      m()
      var _ = s.options.mode === 'free-snap',
        v = s.track,
        y = f()
      n = Yt(y)
      var b = s.track.details,
        T = []
      if (y || !_) {
        var S = g(y),
          w = S.dist,
          P = S.dur
        if (((P = l(P)), (w *= n), _)) {
          var E = v.idxToDist(v.distToIdx(w), !0)
          E && (w = E)
        }
        T.push({ distance: w, duration: P, easing: h })
        var C = b.position,
          L = C + w
        if (L < i || L > o) {
          var k = L < i ? i - C : o - C,
            R = 0,
            A = y
          if (Yt(k) === n) {
            var O = Math.min(Math.abs(k) / Math.abs(w), 1),
              D =
                (function (z) {
                  return 1 - Math.pow(1 - z, 1 / 3)
                })(O) * P
            ;(T[0].earlyExit = D), (A = y * (1 - O))
          } else (T[0].earlyExit = 0), (R += k)
          var I = g(A, 100),
            F = I.dist * n
          s.options.rubberband &&
            (T.push({ distance: F, duration: l(I.dur), easing: h }),
            T.push({ distance: -F + R, duration: 500, easing: h }))
        }
        s.animator.start(T)
      } else
        s.moveToIdx(c(b.abs), !0, {
          duration: 500,
          easing: function (z) {
            return 1 + --z * z * z * z * z
          },
        })
    }
    function g(_, v) {
      v === void 0 && (v = 1e3)
      var y = 147e-9 + (_ = Math.abs(_)) / v
      return { dist: Math.pow(_, 2) / y, dur: _ / y }
    }
    function p() {
      var _ = s.track.details
      _ && ((i = _.min), (o = _.max), (a = _.minIdx), (u = _.maxIdx))
    }
    function m() {
      s.animator.stop()
    }
    s.on('updated', p),
      s.on('optionsChanged', p),
      s.on('created', p),
      s.on('dragStarted', function () {
        ;(t = !1), m(), (e = r = s.track.details.abs)
      }),
      s.on('dragChecked', function () {
        t = !0
      }),
      s.on('dragEnded', function () {
        var _ = s.options.mode
        _ === 'snap' &&
          (function () {
            var v = s.track,
              y = s.track.details,
              b = y.position,
              T = Yt(f())
            ;(b > o || b < i) && (T = 0)
            var S = e + T
            y.slides[v.absToRel(S)].portion === 0 && (S -= T),
              e !== r && (S = r),
              Yt(v.idxToDist(S, !0)) !== T && (S += T),
              (S = c(S))
            var w = v.idxToDist(S, !0)
            s.animator.start([
              {
                distance: w,
                duration: 500,
                easing: function (P) {
                  return 1 + --P * P * P * P * P
                },
              },
            ])
          })(),
          (_ !== 'free' && _ !== 'free-snap') || d()
      }),
      s.on('dragged', function () {
        r = s.track.details.abs
      })
  }
  function Ip(s) {
    var e,
      r,
      t,
      n,
      i,
      o,
      a,
      u,
      l,
      c,
      h,
      f,
      d,
      g,
      p,
      m,
      _,
      v,
      y = ef()
    function b(R) {
      if (o && u === R.id) {
        var A = P(R)
        if (l) {
          if (!w(R)) return S(R)
          ;(c = A), (l = !1), s.emit('dragChecked')
        }
        if (m) return (c = A)
        Wi(R)
        var O = (function (I) {
          if (_ === -1 / 0 && v === 1 / 0) return I
          var F = s.track.details,
            z = F.length,
            x = F.position,
            N = Ba(I, _ - x, v - x)
          if (z === 0) return 0
          if (!s.options.rubberband) return N
          if ((x <= v && x >= _) || (x < _ && r > 0) || (x > v && r < 0))
            return I
          var H = (x < _ ? x - _ : x - v) / z,
            ae = n * z,
            ee = Math.abs(H * ae),
            G = Math.max(0, 1 - (ee / i) * 2)
          return G * G * I
        })((a(c - A) / n) * t)
        r = Yt(O)
        var D = s.track.details.position
        ;((D > _ && D < v) || (D === _ && r > 0) || (D === v && r < 0)) &&
          ji(R),
          (h += O),
          !f && Math.abs(h * n) > 5 && (f = !0),
          s.track.add(O),
          (c = A),
          s.emit('dragged')
      }
    }
    function T(R) {
      !o &&
        s.track.details &&
        s.track.details.length &&
        ((h = 0),
        (o = !0),
        (f = !1),
        (l = !0),
        (u = R.id),
        w(R),
        (c = P(R)),
        s.emit('dragStarted'))
    }
    function S(R) {
      o && u === R.idChanged && ((o = !1), s.emit('dragEnded'))
    }
    function w(R) {
      var A = E(),
        O = A ? R.y : R.x,
        D = A ? R.x : R.y,
        I = d !== void 0 && g !== void 0 && Math.abs(g - D) <= Math.abs(d - O)
      return (d = O), (g = D), I
    }
    function P(R) {
      return E() ? R.y : R.x
    }
    function E() {
      return s.options.vertical
    }
    function C() {
      ;(n = s.size), (i = E() ? window.innerHeight : window.innerWidth)
      var R = s.track.details
      R && ((_ = R.min), (v = R.max))
    }
    function L(R) {
      f && (ji(R), Wi(R))
    }
    function k() {
      if ((y.purge(), s.options.drag && !s.options.disabled)) {
        var R
        ;(R = s.options.dragSpeed || 1),
          (a =
            typeof R == 'function'
              ? R
              : function (O) {
                  return O * R
                }),
          (t = s.options.rtl ? -1 : 1),
          C(),
          (e = s.container),
          (function () {
            var O = 'data-keen-slider-clickable'
            Zs('['.concat(O, ']:not([').concat(O, '=false])'), e).map(function (
              D
            ) {
              y.add(D, 'dragstart', ji),
                y.add(D, 'mousedown', ji),
                y.add(D, 'touchstart', ji)
            })
          })(),
          y.add(e, 'dragstart', function (O) {
            Wi(O)
          }),
          y.add(e, 'click', L, { capture: !0 }),
          y.input(e, 'ksDragStart', T),
          y.input(e, 'ksDrag', b),
          y.input(e, 'ksDragEnd', S),
          y.input(e, 'mousedown', T),
          y.input(e, 'mousemove', b),
          y.input(e, 'mouseleave', S),
          y.input(e, 'mouseup', S),
          y.input(e, 'touchstart', T, { passive: !0 }),
          y.input(e, 'touchmove', b, { passive: !1 }),
          y.input(e, 'touchend', S),
          y.input(e, 'touchcancel', S),
          y.add(window, 'wheel', function (O) {
            o && Wi(O)
          })
        var A = 'data-keen-slider-scrollable'
        Zs('['.concat(A, ']:not([').concat(A, '=false])'), s.container).map(
          function (O) {
            return (function (D) {
              var I
              y.input(
                D,
                'touchstart',
                function (F) {
                  ;(I = P(F)), (m = !0), (p = !0)
                },
                { passive: !0 }
              ),
                y.input(D, 'touchmove', function (F) {
                  var z = E(),
                    x = z
                      ? D.scrollHeight - D.clientHeight
                      : D.scrollWidth - D.clientWidth,
                    N = I - P(F),
                    H = z ? D.scrollTop : D.scrollLeft,
                    ae =
                      (z && D.style.overflowY === 'scroll') ||
                      (!z && D.style.overflowX === 'scroll')
                  if (
                    ((I = P(F)),
                    ((N < 0 && H > 0) || (N > 0 && H < x)) && p && ae)
                  )
                    return (m = !0)
                  ;(p = !1), Wi(F), (m = !1)
                }),
                y.input(D, 'touchend', function () {
                  m = !1
                })
            })(O)
          }
        )
      }
    }
    s.on('updated', C),
      s.on('optionsChanged', k),
      s.on('created', k),
      s.on('destroyed', y.purge)
  }
  function Fp(s) {
    var e,
      r,
      t = null
    function n(d, g, p) {
      s.animator.active
        ? o(d, g, p)
        : requestAnimationFrame(function () {
            return o(d, g, p)
          })
    }
    function i() {
      n(!1, !1, r)
    }
    function o(d, g, p) {
      var m = 0,
        _ = s.size,
        v = s.track.details
      if (v && e) {
        var y = v.slides
        e.forEach(function (b, T) {
          if (d) !t && g && u(b, null, p), l(b, null, p)
          else {
            if (!y[T]) return
            var S = y[T].size * _
            !t && g && u(b, S, p), l(b, y[T].distance * _ - m, p), (m += S)
          }
        })
      }
    }
    function a(d) {
      return s.options.renderMode === 'performance' ? Math.round(d) : d
    }
    function u(d, g, p) {
      var m = p ? 'height' : 'width'
      g !== null && (g = a(g) + 'px'),
        (d.style['min-' + m] = g),
        (d.style['max-' + m] = g)
    }
    function l(d, g, p) {
      if (g !== null) {
        g = a(g)
        var m = p ? g : 0
        g = 'translate3d('.concat(p ? 0 : g, 'px, ').concat(m, 'px, 0)')
      }
      ;(d.style.transform = g), (d.style['-webkit-transform'] = g)
    }
    function c() {
      e && (o(!0, !0, r), (e = null)), s.on('detailsChanged', i, !0)
    }
    function h() {
      n(!1, !0, r)
    }
    function f() {
      c(),
        (r = s.options.vertical),
        s.options.disabled ||
          s.options.renderMode === 'custom' ||
          ((t = pt(s.options.slides, 'perView', null) === 'auto'),
          s.on('detailsChanged', i),
          (e = s.slides).length && h())
    }
    s.on('created', f),
      s.on('optionsChanged', f),
      s.on('beforeOptionsChanged', function () {
        c()
      }),
      s.on('updated', h),
      s.on('destroyed', c)
  }
  function zp(s, e) {
    return function (r) {
      var t,
        n,
        i,
        o,
        a,
        u = ef()
      function l(w) {
        var P
        Na(
          r.container,
          'reverse',
          ((P = r.container),
          window.getComputedStyle(P, null).getPropertyValue('direction') !==
            'rtl' || w
            ? null
            : '')
        ),
          Na(r.container, 'v', r.options.vertical && !w ? '' : null),
          Na(r.container, 'disabled', r.options.disabled && !w ? '' : null)
      }
      function c() {
        h() && m()
      }
      function h() {
        var w = null
        if (
          (o.forEach(function (E) {
            E.matches && (w = E.__media)
          }),
          w === t)
        )
          return !1
        t || r.emit('beforeOptionsChanged'), (t = w)
        var P = w ? i.breakpoints[w] : i
        return (r.options = Zn(Zn({}, i), P)), l(), T(), S(), v(), !0
      }
      function f(w) {
        var P = tf(w)
        return (r.options.vertical ? P.height : P.width) / r.size || 1
      }
      function d() {
        return r.options.trackConfig.length
      }
      function g(w) {
        for (var P in ((t = !1),
        (i = Zn(Zn({}, e), w)),
        u.purge(),
        (n = r.size),
        (o = []),
        i.breakpoints || [])) {
          var E = window.matchMedia(P)
          ;(E.__media = P), o.push(E), u.add(E, 'change', c)
        }
        u.add(window, 'orientationchange', b), u.add(window, 'resize', y), h()
      }
      function p(w) {
        r.animator.stop()
        var P = r.track.details
        r.track.init(w ?? (P ? P.abs : 0))
      }
      function m(w) {
        p(w), r.emit('optionsChanged')
      }
      function _(w, P) {
        if (w) return g(w), void m(P)
        T(), S()
        var E = d()
        v(), d() !== E ? m(P) : p(P), r.emit('updated')
      }
      function v() {
        var w = r.options.slides
        if (typeof w == 'function')
          return (r.options.trackConfig = w(r.size, r.slides))
        for (
          var P = r.slides,
            E = P.length,
            C = typeof w == 'number' ? w : pt(w, 'number', E, !0),
            L = [],
            k = pt(w, 'perView', 1, !0),
            R = pt(w, 'spacing', 0, !0) / r.size || 0,
            A = k === 'auto' ? R : R / k,
            O = pt(w, 'origin', 'auto'),
            D = 0,
            I = 0;
          I < C;
          I++
        ) {
          var F = k === 'auto' ? f(P[I]) : 1 / k - R + A,
            z = O === 'center' ? 0.5 - F / 2 : O === 'auto' ? 0 : O
          L.push({ origin: z, size: F, spacing: R }), (D += F)
        }
        if (((D += R * (C - 1)), O === 'auto' && !r.options.loop && k !== 1)) {
          var x = 0
          L.map(function (N) {
            var H = D - x
            return (
              (x += N.size + R),
              H >= 1 || (N.origin = 1 - H - (D > 1 ? 0 : 1 - D)),
              N
            )
          })
        }
        r.options.trackConfig = L
      }
      function y() {
        T()
        var w = r.size
        r.options.disabled || w === n || ((n = w), _())
      }
      function b() {
        y(), setTimeout(y, 500), setTimeout(y, 2e3)
      }
      function T() {
        var w = tf(r.container)
        r.size = (r.options.vertical ? w.height : w.width) || 1
      }
      function S() {
        r.slides = Zs(r.options.selector, r.container)
      }
      ;(r.container = (a = Zs(s, document)).length ? a[0] : null),
        (r.destroy = function () {
          u.purge(), r.emit('destroyed'), l(!0)
        }),
        (r.prev = function () {
          r.moveToIdx(r.track.details.abs - 1, !0)
        }),
        (r.next = function () {
          r.moveToIdx(r.track.details.abs + 1, !0)
        }),
        (r.update = _),
        g(r.options)
    }
  }
  var Vp = function (s, e, r) {
    try {
      return (function (t, n) {
        var i,
          o = {}
        return (
          (i = {
            emit: function (a) {
              o[a] &&
                o[a].forEach(function (l) {
                  l(i)
                })
              var u = i.options && i.options[a]
              u && u(i)
            },
            moveToIdx: function (a, u, l) {
              var c = i.track.idxToDist(a, u)
              if (c) {
                var h = i.options.defaultAnimation
                i.animator.start([
                  {
                    distance: c,
                    duration: pt(l || h, 'duration', 500),
                    easing: pt(l || h, 'easing', function (f) {
                      return 1 + --f * f * f * f * f
                    }),
                  },
                ])
              }
            },
            on: function (a, u, l) {
              l === void 0 && (l = !1), o[a] || (o[a] = [])
              var c = o[a].indexOf(u)
              c > -1 ? l && delete o[a][c] : l || o[a].push(u)
            },
            options: t,
          }),
          (function () {
            if (((i.track = Rp(i)), (i.animator = Dp(i)), n))
              for (var a = 0, u = n; a < u.length; a++) (0, u[a])(i)
            i.track.init(i.options.initial || 0), i.emit('created')
          })(),
          i
        )
      })(
        e,
        Kc(
          [
            zp(s, {
              drag: !0,
              mode: 'snap',
              renderMode: 'precision',
              rubberband: !0,
              selector: '.keen-slider__slide',
            }),
            Fp,
            Ip,
            Lp,
          ],
          r || [],
          !0
        )
      )
    } catch (t) {
      console.error(t)
    }
  }
  const rf = (s) => {
      const e = s.querySelectorAll('.sliding-images')
      var r = { duration: 3e4, easing: (t) => t }
      e.forEach((t) => {
        new Vp(t, {
          selector: '.project-background-video',
          slides: { perView: () => (window.innerWidth <= 768 ? 0.5 : 2.1) },
          loop: !0,
          renderMode: 'performance',
          drag: !1,
          created(n) {
            n.moveToIdx(5, !0, r)
          },
          updated(n) {
            n.moveToIdx(n.track.details.abs + 5, !0, r)
          },
          animationEnded(n) {
            n.moveToIdx(n.track.details.abs + 5, !0, r)
          },
        })
      })
    },
    Np = (s) => {
      $.registerPlugin(X)
      const e = s.querySelector('.case-studies_collection-list')
      if (!e) return
      const r = e.querySelectorAll('.case-studies_collection-item'),
        t = s.querySelectorAll('.case-studies_collection-item_content-wrapper')
      r.forEach((n, i) => {
        $.from(n, {
          scrollTrigger: {
            trigger: n,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: !0,
            onEnter: () => {
              n.classList.add('is-visible'), t[i].classList.add('is-visible')
            },
            onLeave: () => {
              n.classList.remove('is-visible'),
                t[i].classList.remove('is-visible')
            },
            onEnterBack: () => {
              n.classList.add('is-visible'), t[i].classList.add('is-visible')
            },
            onLeaveBack: () => {
              n.classList.remove('is-visible'),
                t[i].classList.remove('is-visible')
            },
          },
        })
      })
    }
  var Qs = function () {
      return (
        (Qs =
          Object.assign ||
          function (s) {
            for (var e, r = 1, t = arguments.length; r < t; r++)
              for (var n in (e = arguments[r]))
                Object.prototype.hasOwnProperty.call(e, n) && (s[n] = e[n])
            return s
          }),
        Qs.apply(this, arguments)
      )
    },
    Bp = (function () {
      function s(e, r, t) {
        var n = this
        ;(this.endVal = r),
          (this.options = t),
          (this.version = '2.8.0'),
          (this.defaults = {
            startVal: 0,
            decimalPlaces: 0,
            duration: 2,
            useEasing: !0,
            useGrouping: !0,
            useIndianSeparators: !1,
            smartEasingThreshold: 999,
            smartEasingAmount: 333,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: '',
            enableScrollSpy: !1,
            scrollSpyDelay: 200,
            scrollSpyOnce: !1,
          }),
          (this.finalEndVal = null),
          (this.useEasing = !0),
          (this.countDown = !1),
          (this.error = ''),
          (this.startVal = 0),
          (this.paused = !0),
          (this.once = !1),
          (this.count = function (i) {
            n.startTime || (n.startTime = i)
            var o = i - n.startTime
            ;(n.remaining = n.duration - o),
              n.useEasing
                ? n.countDown
                  ? (n.frameVal =
                      n.startVal -
                      n.easingFn(o, 0, n.startVal - n.endVal, n.duration))
                  : (n.frameVal = n.easingFn(
                      o,
                      n.startVal,
                      n.endVal - n.startVal,
                      n.duration
                    ))
                : (n.frameVal =
                    n.startVal + (n.endVal - n.startVal) * (o / n.duration))
            var a = n.countDown ? n.frameVal < n.endVal : n.frameVal > n.endVal
            ;(n.frameVal = a ? n.endVal : n.frameVal),
              (n.frameVal = Number(
                n.frameVal.toFixed(n.options.decimalPlaces)
              )),
              n.printValue(n.frameVal),
              o < n.duration
                ? (n.rAF = requestAnimationFrame(n.count))
                : n.finalEndVal !== null
                ? n.update(n.finalEndVal)
                : n.options.onCompleteCallback && n.options.onCompleteCallback()
          }),
          (this.formatNumber = function (i) {
            var o,
              a,
              u,
              l,
              c = i < 0 ? '-' : ''
            o = Math.abs(i).toFixed(n.options.decimalPlaces)
            var h = (o += '').split('.')
            if (
              ((a = h[0]),
              (u = h.length > 1 ? n.options.decimal + h[1] : ''),
              n.options.useGrouping)
            ) {
              l = ''
              for (var f = 3, d = 0, g = 0, p = a.length; g < p; ++g)
                n.options.useIndianSeparators && g === 4 && ((f = 2), (d = 1)),
                  g !== 0 && d % f == 0 && (l = n.options.separator + l),
                  d++,
                  (l = a[p - g - 1] + l)
              a = l
            }
            return (
              n.options.numerals &&
                n.options.numerals.length &&
                ((a = a.replace(/[0-9]/g, function (m) {
                  return n.options.numerals[+m]
                })),
                (u = u.replace(/[0-9]/g, function (m) {
                  return n.options.numerals[+m]
                }))),
              c + n.options.prefix + a + u + n.options.suffix
            )
          }),
          (this.easeOutExpo = function (i, o, a, u) {
            return (a * (1 - Math.pow(2, (-10 * i) / u)) * 1024) / 1023 + o
          }),
          (this.options = Qs(Qs({}, this.defaults), t)),
          (this.formattingFn = this.options.formattingFn
            ? this.options.formattingFn
            : this.formatNumber),
          (this.easingFn = this.options.easingFn
            ? this.options.easingFn
            : this.easeOutExpo),
          (this.startVal = this.validateValue(this.options.startVal)),
          (this.frameVal = this.startVal),
          (this.endVal = this.validateValue(r)),
          (this.options.decimalPlaces = Math.max(this.options.decimalPlaces)),
          this.resetDuration(),
          (this.options.separator = String(this.options.separator)),
          (this.useEasing = this.options.useEasing),
          this.options.separator === '' && (this.options.useGrouping = !1),
          (this.el = typeof e == 'string' ? document.getElementById(e) : e),
          this.el
            ? this.printValue(this.startVal)
            : (this.error = '[CountUp] target is null or undefined'),
          typeof window < 'u' &&
            this.options.enableScrollSpy &&
            (this.error
              ? console.error(this.error, e)
              : ((window.onScrollFns = window.onScrollFns || []),
                window.onScrollFns.push(function () {
                  return n.handleScroll(n)
                }),
                (window.onscroll = function () {
                  window.onScrollFns.forEach(function (i) {
                    return i()
                  })
                }),
                this.handleScroll(this)))
      }
      return (
        (s.prototype.handleScroll = function (e) {
          if (e && window && !e.once) {
            var r = window.innerHeight + window.scrollY,
              t = e.el.getBoundingClientRect(),
              n = t.top + window.pageYOffset,
              i = t.top + t.height + window.pageYOffset
            i < r && i > window.scrollY && e.paused
              ? ((e.paused = !1),
                setTimeout(function () {
                  return e.start()
                }, e.options.scrollSpyDelay),
                e.options.scrollSpyOnce && (e.once = !0))
              : (window.scrollY > i || n > r) && !e.paused && e.reset()
          }
        }),
        (s.prototype.determineDirectionAndSmartEasing = function () {
          var e = this.finalEndVal ? this.finalEndVal : this.endVal
          this.countDown = this.startVal > e
          var r = e - this.startVal
          if (
            Math.abs(r) > this.options.smartEasingThreshold &&
            this.options.useEasing
          ) {
            this.finalEndVal = e
            var t = this.countDown ? 1 : -1
            ;(this.endVal = e + t * this.options.smartEasingAmount),
              (this.duration = this.duration / 2)
          } else (this.endVal = e), (this.finalEndVal = null)
          this.finalEndVal !== null
            ? (this.useEasing = !1)
            : (this.useEasing = this.options.useEasing)
        }),
        (s.prototype.start = function (e) {
          this.error ||
            (this.options.onStartCallback && this.options.onStartCallback(),
            e && (this.options.onCompleteCallback = e),
            this.duration > 0
              ? (this.determineDirectionAndSmartEasing(),
                (this.paused = !1),
                (this.rAF = requestAnimationFrame(this.count)))
              : this.printValue(this.endVal))
        }),
        (s.prototype.pauseResume = function () {
          this.paused
            ? ((this.startTime = null),
              (this.duration = this.remaining),
              (this.startVal = this.frameVal),
              this.determineDirectionAndSmartEasing(),
              (this.rAF = requestAnimationFrame(this.count)))
            : cancelAnimationFrame(this.rAF),
            (this.paused = !this.paused)
        }),
        (s.prototype.reset = function () {
          cancelAnimationFrame(this.rAF),
            (this.paused = !0),
            this.resetDuration(),
            (this.startVal = this.validateValue(this.options.startVal)),
            (this.frameVal = this.startVal),
            this.printValue(this.startVal)
        }),
        (s.prototype.update = function (e) {
          cancelAnimationFrame(this.rAF),
            (this.startTime = null),
            (this.endVal = this.validateValue(e)),
            this.endVal !== this.frameVal &&
              ((this.startVal = this.frameVal),
              this.finalEndVal == null && this.resetDuration(),
              (this.finalEndVal = null),
              this.determineDirectionAndSmartEasing(),
              (this.rAF = requestAnimationFrame(this.count)))
        }),
        (s.prototype.printValue = function (e) {
          var r
          if (this.el) {
            var t = this.formattingFn(e)
            !((r = this.options.plugin) === null || r === void 0) && r.render
              ? this.options.plugin.render(this.el, t)
              : this.el.tagName === 'INPUT'
              ? (this.el.value = t)
              : this.el.tagName === 'text' || this.el.tagName === 'tspan'
              ? (this.el.textContent = t)
              : (this.el.innerHTML = t)
          }
        }),
        (s.prototype.ensureNumber = function (e) {
          return typeof e == 'number' && !isNaN(e)
        }),
        (s.prototype.validateValue = function (e) {
          var r = Number(e)
          return this.ensureNumber(r)
            ? r
            : ((this.error = '[CountUp] invalid start or end value: '.concat(
                e
              )),
              null)
        }),
        (s.prototype.resetDuration = function () {
          ;(this.startTime = null),
            (this.duration = 1e3 * Number(this.options.duration)),
            (this.remaining = this.duration)
        }),
        s
      )
    })()
  /*!
   * matrix 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var xr,
    bn,
    qa,
    Js,
    Ui,
    eo,
    to,
    Gi,
    Ht = 'transform',
    $a = Ht + 'Origin',
    nf,
    Ya = function (e) {
      var r = e.ownerDocument || e
      for (
        !(Ht in e.style) &&
        ('msTransform' in e.style) &&
        ((Ht = 'msTransform'), ($a = Ht + 'Origin'));
        r.parentNode && (r = r.parentNode);

      );
      if (((bn = window), (to = new wn()), r)) {
        ;(xr = r),
          (qa = r.documentElement),
          (Js = r.body),
          (Gi = xr.createElementNS('http://www.w3.org/2000/svg', 'g')),
          (Gi.style.transform = 'none')
        var t = r.createElement('div'),
          n = r.createElement('div'),
          i = r && (r.body || r.firstElementChild)
        i &&
          i.appendChild &&
          (i.appendChild(t),
          t.appendChild(n),
          t.setAttribute(
            'style',
            'position:static;transform:translate3d(0,0,1px)'
          ),
          (nf = n.offsetParent !== t),
          i.removeChild(t))
      }
      return r
    },
    qp = function (e) {
      for (var r, t; e && e !== Js; )
        (t = e._gsap),
          t && t.uncache && t.get(e, 'x'),
          t &&
            !t.scaleX &&
            !t.scaleY &&
            t.renderTransform &&
            ((t.scaleX = t.scaleY = 1e-4),
            t.renderTransform(1, t),
            r ? r.push(t) : (r = [t])),
          (e = e.parentNode)
      return r
    },
    sf = [],
    of = [],
    Ha = function () {
      return bn.pageYOffset || xr.scrollTop || qa.scrollTop || Js.scrollTop || 0
    },
    Xa = function () {
      return (
        bn.pageXOffset || xr.scrollLeft || qa.scrollLeft || Js.scrollLeft || 0
      )
    },
    Wa = function (e) {
      return (
        e.ownerSVGElement ||
        ((e.tagName + '').toLowerCase() === 'svg' ? e : null)
      )
    },
    $p = function s(e) {
      if (bn.getComputedStyle(e).position === 'fixed') return !0
      if (((e = e.parentNode), e && e.nodeType === 1)) return s(e)
    },
    ja = function s(e, r) {
      if (e.parentNode && (xr || Ya(e))) {
        var t = Wa(e),
          n = t
            ? t.getAttribute('xmlns') || 'http://www.w3.org/2000/svg'
            : 'http://www.w3.org/1999/xhtml',
          i = t ? (r ? 'rect' : 'g') : 'div',
          o = r !== 2 ? 0 : 100,
          a = r === 3 ? 100 : 0,
          u =
            'position:absolute;display:block;pointer-events:none;margin:0;padding:0;',
          l = xr.createElementNS
            ? xr.createElementNS(n.replace(/^https/, 'http'), i)
            : xr.createElement(i)
        return (
          r &&
            (t
              ? (eo || (eo = s(e)),
                l.setAttribute('width', 0.01),
                l.setAttribute('height', 0.01),
                l.setAttribute('transform', 'translate(' + o + ',' + a + ')'),
                eo.appendChild(l))
              : (Ui || ((Ui = s(e)), (Ui.style.cssText = u)),
                (l.style.cssText =
                  u +
                  'width:0.1px;height:0.1px;top:' +
                  a +
                  'px;left:' +
                  o +
                  'px'),
                Ui.appendChild(l))),
          l
        )
      }
      throw 'Need document and parent.'
    },
    Yp = function (e) {
      for (var r = new wn(), t = 0; t < e.numberOfItems; t++)
        r.multiply(e.getItem(t).matrix)
      return r
    },
    af = function (e) {
      var r = e.getCTM(),
        t
      return (
        r ||
          ((t = e.style[Ht]),
          (e.style[Ht] = 'none'),
          e.appendChild(Gi),
          (r = Gi.getCTM()),
          e.removeChild(Gi),
          t
            ? (e.style[Ht] = t)
            : e.style.removeProperty(
                Ht.replace(/([A-Z])/g, '-$1').toLowerCase()
              )),
        r || to.clone()
      )
    },
    Hp = function (e, r) {
      var t = Wa(e),
        n = e === t,
        i = t ? sf : of,
        o = e.parentNode,
        a,
        u,
        l,
        c,
        h,
        f
      if (e === bn) return e
      if (
        (i.length || i.push(ja(e, 1), ja(e, 2), ja(e, 3)), (a = t ? eo : Ui), t)
      )
        n
          ? ((l = af(e)), (c = -l.e / l.a), (h = -l.f / l.d), (u = to))
          : e.getBBox
          ? ((l = e.getBBox()),
            (u = e.transform ? e.transform.baseVal : {}),
            (u = u.numberOfItems
              ? u.numberOfItems > 1
                ? Yp(u)
                : u.getItem(0).matrix
              : to),
            (c = u.a * l.x + u.c * l.y),
            (h = u.b * l.x + u.d * l.y))
          : ((u = new wn()), (c = h = 0)),
          r && e.tagName.toLowerCase() === 'g' && (c = h = 0),
          (n ? t : o).appendChild(a),
          a.setAttribute(
            'transform',
            'matrix(' +
              u.a +
              ',' +
              u.b +
              ',' +
              u.c +
              ',' +
              u.d +
              ',' +
              (u.e + c) +
              ',' +
              (u.f + h) +
              ')'
          )
      else {
        if (((c = h = 0), nf))
          for (
            u = e.offsetParent, l = e;
            l && (l = l.parentNode) && l !== u && l.parentNode;

          )
            (bn.getComputedStyle(l)[Ht] + '').length > 4 &&
              ((c = l.offsetLeft), (h = l.offsetTop), (l = 0))
        if (
          ((f = bn.getComputedStyle(e)),
          f.position !== 'absolute' && f.position !== 'fixed')
        )
          for (u = e.offsetParent; o && o !== u; )
            (c += o.scrollLeft || 0),
              (h += o.scrollTop || 0),
              (o = o.parentNode)
        ;(l = a.style),
          (l.top = e.offsetTop - h + 'px'),
          (l.left = e.offsetLeft - c + 'px'),
          (l[Ht] = f[Ht]),
          (l[$a] = f[$a]),
          (l.position = f.position === 'fixed' ? 'fixed' : 'absolute'),
          e.parentNode.appendChild(a)
      }
      return a
    },
    Ua = function (e, r, t, n, i, o, a) {
      return (e.a = r), (e.b = t), (e.c = n), (e.d = i), (e.e = o), (e.f = a), e
    },
    wn = (function () {
      function s(r, t, n, i, o, a) {
        r === void 0 && (r = 1),
          t === void 0 && (t = 0),
          n === void 0 && (n = 0),
          i === void 0 && (i = 1),
          o === void 0 && (o = 0),
          a === void 0 && (a = 0),
          Ua(this, r, t, n, i, o, a)
      }
      var e = s.prototype
      return (
        (e.inverse = function () {
          var t = this.a,
            n = this.b,
            i = this.c,
            o = this.d,
            a = this.e,
            u = this.f,
            l = t * o - n * i || 1e-10
          return Ua(
            this,
            o / l,
            -n / l,
            -i / l,
            t / l,
            (i * u - o * a) / l,
            -(t * u - n * a) / l
          )
        }),
        (e.multiply = function (t) {
          var n = this.a,
            i = this.b,
            o = this.c,
            a = this.d,
            u = this.e,
            l = this.f,
            c = t.a,
            h = t.c,
            f = t.b,
            d = t.d,
            g = t.e,
            p = t.f
          return Ua(
            this,
            c * n + f * o,
            c * i + f * a,
            h * n + d * o,
            h * i + d * a,
            u + g * n + p * o,
            l + g * i + p * a
          )
        }),
        (e.clone = function () {
          return new s(this.a, this.b, this.c, this.d, this.e, this.f)
        }),
        (e.equals = function (t) {
          var n = this.a,
            i = this.b,
            o = this.c,
            a = this.d,
            u = this.e,
            l = this.f
          return (
            n === t.a &&
            i === t.b &&
            o === t.c &&
            a === t.d &&
            u === t.e &&
            l === t.f
          )
        }),
        (e.apply = function (t, n) {
          n === void 0 && (n = {})
          var i = t.x,
            o = t.y,
            a = this.a,
            u = this.b,
            l = this.c,
            c = this.d,
            h = this.e,
            f = this.f
          return (
            (n.x = i * a + o * l + h || 0), (n.y = i * u + o * c + f || 0), n
          )
        }),
        s
      )
    })()
  function fr(s, e, r, t) {
    if (!s || !s.parentNode || (xr || Ya(s)).documentElement === s)
      return new wn()
    var n = qp(s),
      i = Wa(s),
      o = i ? sf : of,
      a = Hp(s, r),
      u = o[0].getBoundingClientRect(),
      l = o[1].getBoundingClientRect(),
      c = o[2].getBoundingClientRect(),
      h = a.parentNode,
      f = !t && $p(s),
      d = new wn(
        (l.left - u.left) / 100,
        (l.top - u.top) / 100,
        (c.left - u.left) / 100,
        (c.top - u.top) / 100,
        u.left + (f ? 0 : Xa()),
        u.top + (f ? 0 : Ha())
      )
    if ((h.removeChild(a), n))
      for (u = n.length; u--; )
        (l = n[u]), (l.scaleX = l.scaleY = 0), l.renderTransform(1, l)
    return e ? d.inverse() : d
  }
  /*!
   * Flip 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
   */ var Xp = 1,
    Qn,
    tt,
    me,
    Ki,
    Yr,
    Tr,
    Ga,
    uf = function (e, r) {
      return e.actions.forEach(function (t) {
        return t.vars[r] && t.vars[r](t)
      })
    },
    Ka = {},
    lf = 180 / Math.PI,
    Wp = Math.PI / 180,
    ro = {},
    cf = {},
    no = {},
    Za = function (e) {
      return typeof e == 'string' ? e.split(' ').join('').split(',') : e
    },
    jp = Za('onStart,onUpdate,onComplete,onReverseComplete,onInterrupt'),
    io = Za(
      'transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight'
    ),
    Zi = function (e) {
      return Qn(e)[0] || console.warn('Element not found:', e)
    },
    Jn = function (e) {
      return Math.round(e * 1e4) / 1e4 || 0
    },
    Qa = function (e, r, t) {
      return e.forEach(function (n) {
        return n.classList[t](r)
      })
    },
    ff = {
      zIndex: 1,
      kill: 1,
      simple: 1,
      spin: 1,
      clearProps: 1,
      targets: 1,
      toggleClass: 1,
      onComplete: 1,
      onUpdate: 1,
      onInterrupt: 1,
      onStart: 1,
      delay: 1,
      repeat: 1,
      repeatDelay: 1,
      yoyo: 1,
      scale: 1,
      fade: 1,
      absolute: 1,
      props: 1,
      onEnter: 1,
      onLeave: 1,
      custom: 1,
      paused: 1,
      nested: 1,
      prune: 1,
      absoluteOnLeave: 1,
    },
    hf = {
      zIndex: 1,
      simple: 1,
      clearProps: 1,
      scale: 1,
      absolute: 1,
      fitChild: 1,
      getVars: 1,
      props: 1,
    },
    df = function (e) {
      return e.replace(/([A-Z])/g, '-$1').toLowerCase()
    },
    ei = function (e, r) {
      var t = {},
        n
      for (n in e) r[n] || (t[n] = e[n])
      return t
    },
    Ja = {},
    pf = function (e) {
      var r = (Ja[e] = Za(e))
      return (no[e] = r.concat(io)), r
    },
    Up = function (e) {
      var r = e._gsap || tt.core.getCache(e)
      return r.gmCache === tt.ticker.frame
        ? r.gMatrix
        : ((r.gmCache = tt.ticker.frame), (r.gMatrix = fr(e, !0, !1, !0)))
    },
    Gp = function s(e, r, t) {
      t === void 0 && (t = 0)
      for (
        var n = e.parentNode,
          i = 1e3 * Math.pow(10, t) * (r ? -1 : 1),
          o = r ? -i * 900 : 0;
        e;

      )
        (o += i), (e = e.previousSibling)
      return n ? o + s(n, r, t + 1) : o
    },
    so = function (e, r, t) {
      return (
        e.forEach(function (n) {
          return (n.d = Gp(t ? n.element : n.t, r))
        }),
        e.sort(function (n, i) {
          return n.d - i.d
        }),
        e
      )
    },
    Qi = function (e, r) {
      for (
        var t = e.element.style, n = (e.css = e.css || []), i = r.length, o, a;
        i--;

      )
        (o = r[i]),
          (a = t[o] || t.getPropertyValue(o)),
          n.push(a ? o : cf[o] || (cf[o] = df(o)), a)
      return t
    },
    oo = function (e) {
      var r = e.css,
        t = e.element.style,
        n = 0
      for (e.cache.uncache = 1; n < r.length; n += 2)
        r[n + 1] ? (t[r[n]] = r[n + 1]) : t.removeProperty(r[n])
      !r[r.indexOf('transform') + 1] &&
        t.translate &&
        (t.removeProperty('translate'),
        t.removeProperty('scale'),
        t.removeProperty('rotate'))
    },
    gf = function (e, r) {
      e.forEach(function (t) {
        return (t.a.cache.uncache = 1)
      }),
        r || e.finalStates.forEach(oo)
    },
    eu =
      'paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition'.split(
        ','
      ),
    tu = function (e, r, t) {
      var n = e.element,
        i = e.width,
        o = e.height,
        a = e.uncache,
        u = e.getProp,
        l = n.style,
        c = 4,
        h,
        f,
        d
      if ((typeof r != 'object' && (r = e), me && t !== 1))
        return (
          me._abs.push({ t: n, b: e, a: e, sd: 0 }),
          me._final.push(function () {
            return (e.cache.uncache = 1) && oo(e)
          }),
          n
        )
      for (
        f = u('display') === 'none',
          (!e.isVisible || f) &&
            (f && (Qi(e, ['display']).display = r.display),
            (e.matrix = r.matrix),
            (e.width = i = e.width || r.width),
            (e.height = o = e.height || r.height)),
          Qi(e, eu),
          d = window.getComputedStyle(n);
        c--;

      )
        l[eu[c]] = d[eu[c]]
      if (
        ((l.gridArea = '1 / 1 / 1 / 1'),
        (l.transition = 'none'),
        (l.position = 'absolute'),
        (l.width = i + 'px'),
        (l.height = o + 'px'),
        l.top || (l.top = '0px'),
        l.left || (l.left = '0px'),
        a)
      )
        h = new xn(n)
      else if (((h = ei(e, ro)), (h.position = 'absolute'), e.simple)) {
        var g = n.getBoundingClientRect()
        h.matrix = new wn(1, 0, 0, 1, g.left + Xa(), g.top + Ha())
      } else h.matrix = fr(n, !1, !1, !0)
      return (h = ti(h, e, !0)), (e.x = Tr(h.x, 0.01)), (e.y = Tr(h.y, 0.01)), n
    },
    mf = function (e, r) {
      return (
        r !== !0 &&
          ((r = Qn(r)),
          (e = e.filter(function (t) {
            if (r.indexOf((t.sd < 0 ? t.b : t.a).element) !== -1) return !0
            t.t._gsap.renderTransform(1),
              t.b.isVisible &&
                ((t.t.style.width = t.b.width + 'px'),
                (t.t.style.height = t.b.height + 'px'))
          }))),
        e
      )
    },
    _f = function (e) {
      return so(e, !0).forEach(function (r) {
        return (
          (r.a.isVisible || r.b.isVisible) && tu(r.sd < 0 ? r.b : r.a, r.b, 1)
        )
      })
    },
    Kp = function (e, r) {
      return (r && e.idLookup[ru(r).id]) || e.elementStates[0]
    },
    ru = function (e, r, t, n) {
      return e instanceof xn
        ? e
        : e instanceof Xt
        ? Kp(e, n)
        : new xn(
            typeof e == 'string' ? Zi(e) || console.warn(e + ' not found') : e,
            r,
            t
          )
    },
    Zp = function (e, r) {
      for (
        var t = tt.getProperty(e.element, null, 'native'),
          n = (e.props = {}),
          i = r.length;
        i--;

      )
        n[r[i]] = (t(r[i]) + '').trim()
      return n.zIndex && (n.zIndex = parseFloat(n.zIndex) || 0), e
    },
    vf = function (e, r) {
      var t = e.style || e,
        n
      for (n in r) t[n] = r[n]
    },
    Qp = function (e) {
      var r = e.getAttribute('data-flip-id')
      return r || e.setAttribute('data-flip-id', (r = 'auto-' + Xp++)), r
    },
    yf = function (e) {
      return e.map(function (r) {
        return r.element
      })
    },
    bf = function (e, r, t) {
      return e && r.length && t.add(e(yf(r), t, new Xt(r, 0, !0)), 0)
    },
    ti = function (e, r, t, n, i, o) {
      var a = e.element,
        u = e.cache,
        l = e.parent,
        c = e.x,
        h = e.y,
        f = r.width,
        d = r.height,
        g = r.scaleX,
        p = r.scaleY,
        m = r.rotation,
        _ = r.bounds,
        v = o && Ga && Ga(a, 'transform'),
        y = e,
        b = r.matrix,
        T = b.e,
        S = b.f,
        w =
          e.bounds.width !== _.width ||
          e.bounds.height !== _.height ||
          e.scaleX !== g ||
          e.scaleY !== p ||
          e.rotation !== m,
        P = !w && e.simple && r.simple && !i,
        E,
        C,
        L,
        k,
        R,
        A,
        O
      return (
        P || !l
          ? ((g = p = 1), (m = E = 0))
          : ((R = Up(l)),
            (A = R.clone().multiply(
              r.ctm ? r.matrix.clone().multiply(r.ctm) : r.matrix
            )),
            (m = Jn(Math.atan2(A.b, A.a) * lf)),
            (E = Jn(Math.atan2(A.c, A.d) * lf + m) % 360),
            (g = Math.sqrt(Math.pow(A.a, 2) + Math.pow(A.b, 2))),
            (p =
              Math.sqrt(Math.pow(A.c, 2) + Math.pow(A.d, 2)) *
              Math.cos(E * Wp)),
            i &&
              ((i = Qn(i)[0]),
              (k = tt.getProperty(i)),
              (O = i.getBBox && typeof i.getBBox == 'function' && i.getBBox()),
              (y = {
                scaleX: k('scaleX'),
                scaleY: k('scaleY'),
                width: O ? O.width : Math.ceil(parseFloat(k('width', 'px'))),
                height: O ? O.height : parseFloat(k('height', 'px')),
              })),
            (u.rotation = m + 'deg'),
            (u.skewX = E + 'deg')),
        t
          ? ((g *= f === y.width || !y.width ? 1 : f / y.width),
            (p *= d === y.height || !y.height ? 1 : d / y.height),
            (u.scaleX = g),
            (u.scaleY = p))
          : ((f = Tr((f * g) / y.scaleX, 0)),
            (d = Tr((d * p) / y.scaleY, 0)),
            (a.style.width = f + 'px'),
            (a.style.height = d + 'px')),
        n && vf(a, r.props),
        P || !l
          ? ((c += T - e.matrix.e), (h += S - e.matrix.f))
          : w || l !== r.parent
          ? (u.renderTransform(1, u),
            (A = fr(i || a, !1, !1, !0)),
            (C = R.apply({ x: A.e, y: A.f })),
            (L = R.apply({ x: T, y: S })),
            (c += L.x - C.x),
            (h += L.y - C.y))
          : ((R.e = R.f = 0),
            (L = R.apply({ x: T - e.matrix.e, y: S - e.matrix.f })),
            (c += L.x),
            (h += L.y)),
        (c = Tr(c, 0.02)),
        (h = Tr(h, 0.02)),
        o && !(o instanceof xn)
          ? v && v.revert()
          : ((u.x = c + 'px'), (u.y = h + 'px'), u.renderTransform(1, u)),
        o &&
          ((o.x = c),
          (o.y = h),
          (o.rotation = m),
          (o.skewX = E),
          t
            ? ((o.scaleX = g), (o.scaleY = p))
            : ((o.width = f), (o.height = d))),
        o || u
      )
    },
    nu = function (e, r) {
      return e instanceof Xt ? e : new Xt(e, r)
    },
    wf = function (e, r, t) {
      var n = e.idLookup[t],
        i = e.alt[t]
      return i.isVisible &&
        (!(r.getElementState(i.element) || i).isVisible || !n.isVisible)
        ? i
        : n
    },
    iu = [],
    su = 'width,height,overflowX,overflowY'.split(','),
    ao,
    xf = function (e) {
      if (e !== ao) {
        var r = Yr.style,
          t = Yr.clientWidth === window.outerWidth,
          n = Yr.clientHeight === window.outerHeight,
          i = 4
        if (e && (t || n)) {
          for (; i--; ) iu[i] = r[su[i]]
          t && ((r.width = Yr.clientWidth + 'px'), (r.overflowY = 'hidden')),
            n &&
              ((r.height = Yr.clientHeight + 'px'), (r.overflowX = 'hidden')),
            (ao = e)
        } else if (ao) {
          for (; i--; ) iu[i] ? (r[su[i]] = iu[i]) : r.removeProperty(df(su[i]))
          ao = e
        }
      }
    },
    ou = function (e, r, t, n) {
      ;(e instanceof Xt && r instanceof Xt) ||
        console.warn('Not a valid state object.'),
        (t = t || {})
      var i = t,
        o = i.clearProps,
        a = i.onEnter,
        u = i.onLeave,
        l = i.absolute,
        c = i.absoluteOnLeave,
        h = i.custom,
        f = i.delay,
        d = i.paused,
        g = i.repeat,
        p = i.repeatDelay,
        m = i.yoyo,
        _ = i.toggleClass,
        v = i.nested,
        y = i.zIndex,
        b = i.scale,
        T = i.fade,
        S = i.stagger,
        w = i.spin,
        P = i.prune,
        E = ('props' in t ? t : e).props,
        C = ei(t, ff),
        L = tt.timeline({
          delay: f,
          paused: d,
          repeat: g,
          repeatDelay: p,
          yoyo: m,
          data: 'isFlip',
        }),
        k = C,
        R = [],
        A = [],
        O = [],
        D = [],
        I = w === !0 ? 1 : w || 0,
        F =
          typeof w == 'function'
            ? w
            : function () {
                return I
              },
        z = e.interrupted || r.interrupted,
        x = L[n !== 1 ? 'to' : 'from'],
        N,
        H,
        ae,
        ee,
        G,
        W,
        ce,
        K,
        _e,
        ue,
        fe,
        qe,
        Y,
        ne
      for (H in r.idLookup)
        (fe = r.alt[H] ? wf(r, e, H) : r.idLookup[H]),
          (G = fe.element),
          (ue = e.idLookup[H]),
          e.alt[H] &&
            G === ue.element &&
            (e.alt[H].isVisible || !fe.isVisible) &&
            (ue = e.alt[H]),
          ue
            ? ((W = {
                t: G,
                b: ue,
                a: fe,
                sd: ue.element === G ? 0 : fe.isVisible ? 1 : -1,
              }),
              O.push(W),
              W.sd &&
                (W.sd < 0 && ((W.b = fe), (W.a = ue)),
                z && Qi(W.b, E ? no[E] : io),
                T &&
                  O.push(
                    (W.swap = {
                      t: ue.element,
                      b: W.b,
                      a: W.a,
                      sd: -W.sd,
                      swap: W,
                    })
                  )),
              (G._flip = ue.element._flip = me ? me.timeline : L))
            : fe.isVisible &&
              (O.push({
                t: G,
                b: ei(fe, { isVisible: 1 }),
                a: fe,
                sd: 0,
                entering: 1,
              }),
              (G._flip = me ? me.timeline : L))
      if (
        (E &&
          (Ja[E] || pf(E)).forEach(function (M) {
            return (C[M] = function (ke) {
              return O[ke].a.props[M]
            })
          }),
        (O.finalStates = _e = []),
        (qe = function () {
          for (so(O), xf(!0), ee = 0; ee < O.length; ee++)
            (W = O[ee]),
              (Y = W.a),
              (ne = W.b),
              P && !Y.isDifferent(ne) && !W.entering
                ? O.splice(ee--, 1)
                : ((G = W.t),
                  v && !(W.sd < 0) && ee && (Y.matrix = fr(G, !1, !1, !0)),
                  ne.isVisible && Y.isVisible
                    ? (W.sd < 0
                        ? ((ce = new xn(G, E, e.simple)),
                          ti(ce, Y, b, 0, 0, ce),
                          (ce.matrix = fr(G, !1, !1, !0)),
                          (ce.css = W.b.css),
                          (W.a = Y = ce),
                          T && (G.style.opacity = z ? ne.opacity : Y.opacity),
                          S && D.push(G))
                        : W.sd > 0 &&
                          T &&
                          (G.style.opacity = z ? Y.opacity - ne.opacity : '0'),
                      ti(Y, ne, b, E))
                    : ne.isVisible !== Y.isVisible &&
                      (ne.isVisible
                        ? Y.isVisible ||
                          ((ne.css = Y.css),
                          A.push(ne),
                          O.splice(ee--, 1),
                          l && v && ti(Y, ne, b, E))
                        : (Y.isVisible && R.push(Y), O.splice(ee--, 1))),
                  b ||
                    ((G.style.maxWidth = Math.max(Y.width, ne.width) + 'px'),
                    (G.style.maxHeight = Math.max(Y.height, ne.height) + 'px'),
                    (G.style.minWidth = Math.min(Y.width, ne.width) + 'px'),
                    (G.style.minHeight = Math.min(Y.height, ne.height) + 'px')),
                  v && _ && G.classList.add(_)),
              _e.push(Y)
          var ke
          if (
            (_ &&
              ((ke = _e.map(function (q) {
                return q.element
              })),
              v &&
                ke.forEach(function (q) {
                  return q.classList.remove(_)
                })),
            xf(!1),
            b
              ? ((C.scaleX = function (q) {
                  return O[q].a.scaleX
                }),
                (C.scaleY = function (q) {
                  return O[q].a.scaleY
                }))
              : ((C.width = function (q) {
                  return O[q].a.width + 'px'
                }),
                (C.height = function (q) {
                  return O[q].a.height + 'px'
                }),
                (C.autoRound = t.autoRound || !1)),
            (C.x = function (q) {
              return O[q].a.x + 'px'
            }),
            (C.y = function (q) {
              return O[q].a.y + 'px'
            }),
            (C.rotation = function (q) {
              return O[q].a.rotation + (w ? F(q, K[q], K) * 360 : 0)
            }),
            (C.skewX = function (q) {
              return O[q].a.skewX
            }),
            (K = O.map(function (q) {
              return q.t
            })),
            (y || y === 0) &&
              ((C.modifiers = {
                zIndex: function () {
                  return y
                },
              }),
              (C.zIndex = y),
              (C.immediateRender = t.immediateRender !== !1)),
            T &&
              (C.opacity = function (q) {
                return O[q].sd < 0 ? 0 : O[q].sd > 0 ? O[q].a.opacity : '+=0'
              }),
            D.length)
          ) {
            S = tt.utils.distribute(S)
            var Wt = K.slice(D.length)
            C.stagger = function (q, jt) {
              return S(~D.indexOf(jt) ? K.indexOf(O[q].swap.t) : q, jt, Wt)
            }
          }
          if (
            (jp.forEach(function (q) {
              return t[q] && L.eventCallback(q, t[q], t[q + 'Params'])
            }),
            h && K.length)
          ) {
            ;(k = ei(C, ff)),
              'scale' in h && ((h.scaleX = h.scaleY = h.scale), delete h.scale)
            for (H in h)
              (N = ei(h[H], hf)),
                (N[H] = C[H]),
                !('duration' in N) &&
                  'duration' in C &&
                  (N.duration = C.duration),
                (N.stagger = C.stagger),
                x.call(L, K, N, 0),
                delete k[H]
          }
          ;(K.length || A.length || R.length) &&
            (_ &&
              L.add(function () {
                return Qa(ke, _, L._zTime < 0 ? 'remove' : 'add')
              }, 0) &&
              !d &&
              Qa(ke, _, 'add'),
            K.length && x.call(L, K, k, 0)),
            bf(a, R, L),
            bf(u, A, L)
          var Vt = me && me.timeline
          Vt &&
            (Vt.add(L, 0),
            me._final.push(function () {
              return gf(O, !o)
            })),
            (ae = L.duration()),
            L.call(function () {
              var q = L.time() >= ae
              q && !Vt && gf(O, !o), _ && Qa(ke, _, q ? 'remove' : 'add')
            })
        }),
        c &&
          (l = O.filter(function (M) {
            return !M.sd && !M.a.isVisible && M.b.isVisible
          }).map(function (M) {
            return M.a.element
          })),
        me)
      ) {
        var Xe
        l && (Xe = me._abs).push.apply(Xe, mf(O, l)), me._run.push(qe)
      } else l && _f(mf(O, l)), qe()
      var We = me ? me.timeline : L
      return (
        (We.revert = function () {
          return au(We, 1, 1)
        }),
        We
      )
    },
    Jp = function s(e) {
      e.vars.onInterrupt &&
        e.vars.onInterrupt.apply(e, e.vars.onInterruptParams || []),
        e.getChildren(!0, !1, !0).forEach(s)
    },
    au = function (e, r, t) {
      if (e && e.progress() < 1 && (!e.paused() || t))
        return r && (Jp(e), r < 2 && e.progress(1), e.kill()), !0
    },
    uo = function (e) {
      for (
        var r = (e.idLookup = {}),
          t = (e.alt = {}),
          n = e.elementStates,
          i = n.length,
          o;
        i--;

      )
        (o = n[i]), r[o.id] ? (t[o.id] = o) : (r[o.id] = o)
    },
    Xt = (function () {
      function s(r, t, n) {
        if (((this.props = t && t.props), (this.simple = !!(t && t.simple)), n))
          (this.targets = yf(r)), (this.elementStates = r), uo(this)
        else {
          this.targets = Qn(r)
          var i = t && (t.kill === !1 || (t.batch && !t.kill))
          me && !i && me._kill.push(this), this.update(i || !!me)
        }
      }
      var e = s.prototype
      return (
        (e.update = function (t) {
          var n = this
          return (
            (this.elementStates = this.targets.map(function (i) {
              return new xn(i, n.props, n.simple)
            })),
            uo(this),
            this.interrupt(t),
            this.recordInlineStyles(),
            this
          )
        }),
        (e.clear = function () {
          return (
            (this.targets.length = this.elementStates.length = 0),
            uo(this),
            this
          )
        }),
        (e.fit = function (t, n, i) {
          for (
            var o = so(this.elementStates.slice(0), !1, !0),
              a = (t || this).idLookup,
              u = 0,
              l,
              c;
            u < o.length;
            u++
          )
            (l = o[u]),
              i && (l.matrix = fr(l.element, !1, !1, !0)),
              (c = a[l.id]),
              c && ti(l, c, n, !0, 0, l),
              (l.matrix = fr(l.element, !1, !1, !0))
          return this
        }),
        (e.getProperty = function (t, n) {
          var i = this.getElementState(t) || ro
          return (n in i ? i : i.props || ro)[n]
        }),
        (e.add = function (t) {
          for (
            var n = t.targets.length, i = this.idLookup, o = this.alt, a, u, l;
            n--;

          )
            (u = t.elementStates[n]),
              (l = i[u.id]),
              l &&
              (u.element === l.element ||
                (o[u.id] && o[u.id].element === u.element))
                ? ((a = this.elementStates.indexOf(
                    u.element === l.element ? l : o[u.id]
                  )),
                  this.targets.splice(a, 1, t.targets[n]),
                  this.elementStates.splice(a, 1, u))
                : (this.targets.push(t.targets[n]), this.elementStates.push(u))
          return (
            t.interrupted && (this.interrupted = !0),
            t.simple || (this.simple = !1),
            uo(this),
            this
          )
        }),
        (e.compare = function (t) {
          var n = t.idLookup,
            i = this.idLookup,
            o = [],
            a = [],
            u = [],
            l = [],
            c = [],
            h = t.alt,
            f = this.alt,
            d = function (P, E, C) {
              return (
                (P.isVisible !== E.isVisible
                  ? P.isVisible
                    ? u
                    : l
                  : P.isVisible
                  ? a
                  : o
                ).push(C) && c.push(C)
              )
            },
            g = function (P, E, C) {
              return c.indexOf(C) < 0 && d(P, E, C)
            },
            p,
            m,
            _,
            v,
            y,
            b,
            T,
            S
          for (_ in n)
            (y = h[_]),
              (b = f[_]),
              (p = y ? wf(t, this, _) : n[_]),
              (v = p.element),
              (m = i[_]),
              b
                ? ((S =
                    m.isVisible || (!b.isVisible && v === m.element) ? m : b),
                  (T =
                    y && !p.isVisible && !y.isVisible && S.element === y.element
                      ? y
                      : p),
                  T.isVisible && S.isVisible && T.element !== S.element
                    ? ((T.isDifferent(S) ? a : o).push(T.element, S.element),
                      c.push(T.element, S.element))
                    : d(T, S, T.element),
                  y && T.element === y.element && (y = n[_]),
                  g(T.element !== m.element && y ? y : T, m, m.element),
                  g(y && y.element === b.element ? y : T, b, b.element),
                  y && g(y, b.element === y.element ? b : m, y.element))
                : (m ? (m.isDifferent(p) ? d(p, m, v) : o.push(v)) : u.push(v),
                  y && g(y, m, y.element))
          for (_ in i)
            n[_] || (l.push(i[_].element), f[_] && l.push(f[_].element))
          return { changed: a, unchanged: o, enter: u, leave: l }
        }),
        (e.recordInlineStyles = function () {
          for (
            var t = no[this.props] || io, n = this.elementStates.length;
            n--;

          )
            Qi(this.elementStates[n], t)
        }),
        (e.interrupt = function (t) {
          var n = this,
            i = []
          this.targets.forEach(function (o) {
            var a = o._flip,
              u = au(a, t ? 0 : 1)
            t &&
              u &&
              i.indexOf(a) < 0 &&
              a.add(function () {
                return n.updateVisibility()
              }),
              u && i.push(a)
          }),
            !t && i.length && this.updateVisibility(),
            this.interrupted || (this.interrupted = !!i.length)
        }),
        (e.updateVisibility = function () {
          this.elementStates.forEach(function (t) {
            var n = t.element.getBoundingClientRect()
            ;(t.isVisible = !!(n.width || n.height || n.top || n.left)),
              (t.uncache = 1)
          })
        }),
        (e.getElementState = function (t) {
          return this.elementStates[this.targets.indexOf(Zi(t))]
        }),
        (e.makeAbsolute = function () {
          return so(this.elementStates.slice(0), !0, !0).map(tu)
        }),
        s
      )
    })(),
    xn = (function () {
      function s(r, t, n) {
        ;(this.element = r), this.update(t, n)
      }
      var e = s.prototype
      return (
        (e.isDifferent = function (t) {
          var n = this.bounds,
            i = t.bounds
          return (
            n.top !== i.top ||
            n.left !== i.left ||
            n.width !== i.width ||
            n.height !== i.height ||
            !this.matrix.equals(t.matrix) ||
            this.opacity !== t.opacity ||
            (this.props &&
              t.props &&
              JSON.stringify(this.props) !== JSON.stringify(t.props))
          )
        }),
        (e.update = function (t, n) {
          var i = this,
            o = i.element,
            a = tt.getProperty(o),
            u = tt.core.getCache(o),
            l = o.getBoundingClientRect(),
            c =
              o.getBBox &&
              typeof o.getBBox == 'function' &&
              o.nodeName.toLowerCase() !== 'svg' &&
              o.getBBox(),
            h = n
              ? new wn(1, 0, 0, 1, l.left + Xa(), l.top + Ha())
              : fr(o, !1, !1, !0)
          ;(i.getProp = a),
            (i.element = o),
            (i.id = Qp(o)),
            (i.matrix = h),
            (i.cache = u),
            (i.bounds = l),
            (i.isVisible = !!(l.width || l.height || l.left || l.top)),
            (i.display = a('display')),
            (i.position = a('position')),
            (i.parent = o.parentNode),
            (i.x = a('x')),
            (i.y = a('y')),
            (i.scaleX = u.scaleX),
            (i.scaleY = u.scaleY),
            (i.rotation = a('rotation')),
            (i.skewX = a('skewX')),
            (i.opacity = a('opacity')),
            (i.width = c ? c.width : Tr(a('width', 'px'), 0.04)),
            (i.height = c ? c.height : Tr(a('height', 'px'), 0.04)),
            t && Zp(i, Ja[t] || pf(t)),
            (i.ctm =
              o.getCTM &&
              o.nodeName.toLowerCase() === 'svg' &&
              af(o).inverse()),
            (i.simple =
              n || (Jn(h.a) === 1 && !Jn(h.b) && !Jn(h.c) && Jn(h.d) === 1)),
            (i.uncache = 0)
        }),
        s
      )
    })(),
    eg = (function () {
      function s(r, t) {
        ;(this.vars = r),
          (this.batch = t),
          (this.states = []),
          (this.timeline = t.timeline)
      }
      var e = s.prototype
      return (
        (e.getStateById = function (t) {
          for (var n = this.states.length; n--; )
            if (this.states[n].idLookup[t]) return this.states[n]
        }),
        (e.kill = function () {
          this.batch.remove(this)
        }),
        s
      )
    })(),
    tg = (function () {
      function s(r) {
        ;(this.id = r),
          (this.actions = []),
          (this._kill = []),
          (this._final = []),
          (this._abs = []),
          (this._run = []),
          (this.data = {}),
          (this.state = new Xt()),
          (this.timeline = tt.timeline())
      }
      var e = s.prototype
      return (
        (e.add = function (t) {
          var n = this.actions.filter(function (i) {
            return i.vars === t
          })
          return n.length
            ? n[0]
            : ((n = new eg(typeof t == 'function' ? { animate: t } : t, this)),
              this.actions.push(n),
              n)
        }),
        (e.remove = function (t) {
          var n = this.actions.indexOf(t)
          return n >= 0 && this.actions.splice(n, 1), this
        }),
        (e.getState = function (t) {
          var n = this,
            i = me,
            o = Ki
          return (
            (me = this),
            this.state.clear(),
            (this._kill.length = 0),
            this.actions.forEach(function (a) {
              a.vars.getState &&
                ((a.states.length = 0),
                (Ki = a),
                (a.state = a.vars.getState(a))),
                t &&
                  a.states.forEach(function (u) {
                    return n.state.add(u)
                  })
            }),
            (Ki = o),
            (me = i),
            this.killConflicts(),
            this
          )
        }),
        (e.animate = function () {
          var t = this,
            n = me,
            i = this.timeline,
            o = this.actions.length,
            a,
            u
          for (
            me = this,
              i.clear(),
              this._abs.length = this._final.length = this._run.length = 0,
              this.actions.forEach(function (l) {
                l.vars.animate && l.vars.animate(l)
                var c = l.vars.onEnter,
                  h = l.vars.onLeave,
                  f = l.targets,
                  d,
                  g
                f &&
                  f.length &&
                  (c || h) &&
                  ((d = new Xt()),
                  l.states.forEach(function (p) {
                    return d.add(p)
                  }),
                  (g = d.compare(ri.getState(f))),
                  g.enter.length && c && c(g.enter),
                  g.leave.length && h && h(g.leave))
              }),
              _f(this._abs),
              this._run.forEach(function (l) {
                return l()
              }),
              u = i.duration(),
              a = this._final.slice(0),
              i.add(function () {
                u <= i.time() &&
                  (a.forEach(function (l) {
                    return l()
                  }),
                  uf(t, 'onComplete'))
              }),
              me = n;
            o--;

          )
            this.actions[o].vars.once && this.actions[o].kill()
          return uf(this, 'onStart'), i.restart(), this
        }),
        (e.loadState = function (t) {
          t ||
            (t = function () {
              return 0
            })
          var n = []
          return (
            this.actions.forEach(function (i) {
              if (i.vars.loadState) {
                var o,
                  a = function u(l) {
                    l && (i.targets = l),
                      (o = n.indexOf(u)),
                      ~o && (n.splice(o, 1), n.length || t())
                  }
                n.push(a), i.vars.loadState(a)
              }
            }),
            n.length || t(),
            this
          )
        }),
        (e.setState = function () {
          return (
            this.actions.forEach(function (t) {
              return (t.targets = t.vars.setState && t.vars.setState(t))
            }),
            this
          )
        }),
        (e.killConflicts = function (t) {
          return (
            this.state.interrupt(t),
            this._kill.forEach(function (n) {
              return n.interrupt(t)
            }),
            this
          )
        }),
        (e.run = function (t, n) {
          var i = this
          return (
            this !== me &&
              (t || this.getState(n),
              this.loadState(function () {
                i._killed || (i.setState(), i.animate())
              })),
            this
          )
        }),
        (e.clear = function (t) {
          this.state.clear(), t || (this.actions.length = 0)
        }),
        (e.getStateById = function (t) {
          for (var n = this.actions.length, i; n--; )
            if (((i = this.actions[n].getStateById(t)), i)) return i
          return this.state.idLookup[t] && this.state
        }),
        (e.kill = function () {
          ;(this._killed = 1), this.clear(), delete Ka[this.id]
        }),
        s
      )
    })(),
    ri = (function () {
      function s() {}
      return (
        (s.getState = function (r, t) {
          var n = nu(r, t)
          return (
            Ki && Ki.states.push(n),
            t && t.batch && s.batch(t.batch).state.add(n),
            n
          )
        }),
        (s.from = function (r, t) {
          return (
            (t = t || {}),
            'clearProps' in t || (t.clearProps = !0),
            ou(
              r,
              nu(t.targets || r.targets, {
                props: t.props || r.props,
                simple: t.simple,
                kill: !!t.kill,
              }),
              t,
              -1
            )
          )
        }),
        (s.to = function (r, t) {
          return ou(
            r,
            nu(t.targets || r.targets, {
              props: t.props || r.props,
              simple: t.simple,
              kill: !!t.kill,
            }),
            t,
            1
          )
        }),
        (s.fromTo = function (r, t, n) {
          return ou(r, t, n)
        }),
        (s.fit = function (r, t, n) {
          var i = n ? ei(n, hf) : {},
            o = n || i,
            a = o.absolute,
            u = o.scale,
            l = o.getVars,
            c = o.props,
            h = o.runBackwards,
            f = o.onComplete,
            d = o.simple,
            g = n && n.fitChild && Zi(n.fitChild),
            p = ru(t, c, d, r),
            m = ru(r, 0, d, p),
            _ = c ? no[c] : io,
            v = tt.context()
          return (
            c && vf(i, p.props),
            Qi(m, _),
            h &&
              ('immediateRender' in i || (i.immediateRender = !0),
              (i.onComplete = function () {
                oo(m), f && f.apply(this, arguments)
              })),
            a && tu(m, p),
            (i = ti(m, p, u || g, c, g, i.duration || l ? i : 0)),
            v &&
              !l &&
              v.add(function () {
                return function () {
                  return oo(m)
                }
              }),
            l ? i : i.duration ? tt.to(m.element, i) : null
          )
        }),
        (s.makeAbsolute = function (r, t) {
          return (r instanceof Xt ? r : new Xt(r, t)).makeAbsolute()
        }),
        (s.batch = function (r) {
          return r || (r = 'default'), Ka[r] || (Ka[r] = new tg(r))
        }),
        (s.killFlipsOf = function (r, t) {
          ;(r instanceof Xt ? r.targets : Qn(r)).forEach(function (n) {
            return n && au(n._flip, t !== !1 ? 1 : 2)
          })
        }),
        (s.isFlipping = function (r) {
          var t = s.getByTarget(r)
          return !!t && t.isActive()
        }),
        (s.getByTarget = function (r) {
          return (Zi(r) || ro)._flip
        }),
        (s.getElementState = function (r, t) {
          return new xn(Zi(r), t)
        }),
        (s.convertCoordinates = function (r, t, n) {
          var i = fr(t, !0, !0).multiply(fr(r))
          return n ? i.apply(n) : i
        }),
        (s.register = function (r) {
          if (((Yr = typeof document < 'u' && document.body), Yr)) {
            ;(tt = r),
              Ya(Yr),
              (Qn = tt.utils.toArray),
              (Ga = tt.core.getStyleSaver)
            var t = tt.utils.snap(0.1)
            Tr = function (i, o) {
              return t(parseFloat(i) + o)
            }
          }
        }),
        s
      )
    })()
  ;(ri.version = '3.12.5'),
    typeof window < 'u' && window.gsap && window.gsap.registerPlugin(ri)
  var uu = function () {
      return (uu =
        Object.assign ||
        function (s) {
          for (var e, r = 1, t = arguments.length; r < t; r++)
            for (var n in (e = arguments[r]))
              Object.prototype.hasOwnProperty.call(e, n) && (s[n] = e[n])
          return s
        }).apply(this, arguments)
    },
    lu =
      window.requestAnimationFrame ||
      function (s) {
        window.setTimeout(s, 1e3 / 60)
      },
    rg = (function () {
      function s(e) {
        ;(this.version = '1.0'),
          (this.defaults = { duration: 0.8, lastDigitDelay: 0.25 }),
          (this.cell_digits = null),
          (this.options = uu(uu({}, this.defaults), e)),
          (this.cell_digits = null)
      }
      return (
        (s.prototype.render = function (e, r) {
          for (
            var t,
              n = this.options,
              i = !1,
              o =
                (this.cell_digits ||
                  ((i = !0),
                  document.querySelector('style[odometer]') ||
                    ((t = document.createElement('style')).setAttribute(
                      'odometer',
                      'odometer'
                    ),
                    (t.innerHTML =
                      '.odometer-numbers{display:inline-flex;line-height:100%;overflow-y:hidden}.odometer-numbers>span{display:flex;flex-direction:column;justify-content:start;align-items:center;height:1em;will-change:transform;transform:translateY(0)}'),
                    document.head.appendChild(t)),
                  (e.innerHTML = '<div class="odometer-numbers"></div>'),
                  (this.cell_digits = [])),
                '<span style="color:transparent">0</span>'),
              a = 'transform '.concat(n.duration, 's ease-out'),
              u = this.cell_digits.length;
            u < r.length;
            u++
          ) {
            var l = document.createElement('span')
            ;(l.style.transition = a),
              (l.innerHTML = i ? '' : o),
              e.firstChild && e.firstChild.appendChild(l),
              this.cell_digits.push({
                container: l,
                current: void 0,
                position: i ? 1 : 0,
                new: !0,
              })
          }
          function c(m, _) {
            m.position--,
              m.container.appendChild(_),
              (m.lastTimeAdd = +new Date()),
              m.new
                ? ((m.new = !1),
                  lu(function () {
                    m.container.style.transform = 'translateY('.concat(
                      m.position,
                      'em)'
                    )
                  }))
                : (m.container.style.transform = 'translateY('.concat(
                    m.position,
                    'em)'
                  ))
          }
          function h() {
            f = u < r.length ? r.charAt(u) : null
            var m,
              _,
              v,
              y,
              b = p.cell_digits[u]
            b.current != f &&
              ((b.current = f),
              ((d = document.createElement('span')).innerHTML =
                f === null ? o : f),
              b.container.children.length < 4
                ? c(b, d)
                : ((_ = d),
                  (m = b).nextToAdd &&
                    (c(m, m.nextToAdd),
                    clearTimeout(m.lastTimer),
                    (m.nextToAdd = null)),
                  (v = +new Date()),
                  (y = 1e3 * n.lastDigitDelay - (v - m.lastTimeAdd)),
                  n.lastDigitDelay <= 0 || v - m.lastTimeAdd >= 1.05 * y
                    ? (c(m, _), (m.nextToAdd = null))
                    : ((m.nextToAdd = _),
                      (m.lastTimer = setTimeout(function () {
                        c(m, m.nextToAdd), (m.nextToAdd = null)
                      }, 1e3 * n.duration)))),
              clearTimeout(b.timerClean),
              (b.timerClean = setTimeout(function () {
                ;(b.timerClean = null),
                  b.container.children.length < 3 ||
                    ((b.container.style.transition = 'none'),
                    lu(function () {
                      for (b.position = -1; 1 < b.container.children.length; )
                        b.container.removeChild(b.container.firstChild)
                      var T = document.createElement('span')
                      ;(T.innerHTML = o),
                        b.container.insertBefore(T, b.container.firstChild),
                        (b.container.style.transform = 'translateY('.concat(
                          b.position,
                          'em)'
                        )),
                        lu(function () {
                          b.container.style.transition = a
                        })
                    }))
              }, 1e3 * ((n.duration || 0.8) + (n.duration || 0.25)) + 2500)))
          }
          for (
            var f,
              d,
              g = Math.max(r.length, this.cell_digits.length),
              p = this,
              u = 0;
            u < g;
            u++
          )
            h()
        }),
        s
      )
    })()
  const ng = () =>
      new Promise((s) => {
        const e = localStorage.getItem('lastVisit'),
          r = new Date().toDateString(),
          t = document.querySelector('.loader_wrapper')
        if (e === r) {
          const d = document.querySelectorAll('.loader_block'),
            g = document.querySelector('.loader_background'),
            p = document.querySelector('.loader-transition-stage_wrapper')
          $.set([d, g, p], { opacity: 0 }), t && (t.style.display = 'none'), s()
          return
        }
        localStorage.setItem('lastVisit', r)
        const n = new Bp('initial-odometer', 100, {
          startVal: 0,
          duration: 3,
          useGrouping: !1,
          decimalPlaces: 0,
          formattingFn: (d) => d.toString().padStart(3, '0'),
          plugin: new rg({ duration: 1, lastDigitDelay: 0 }),
          onComplete: () => {},
        })
        n.start()
        const i = $.timeline()
        $.registerPlugin(ri)
        const o = document.querySelectorAll('.loader_block'),
          a = document.querySelector('.loader_background'),
          u = o[0].parentElement,
          l = document.querySelector('.loader-transition-stage_wrapper'),
          c = document.querySelector('.nav_menu').offsetHeight,
          h = document.querySelector('.nav_menu').offsetWidth
        ;(l.style.height = `${c}px`),
          (l.style.width = `${h}px`),
          $.set(u, { transformPerspective: 2e4 })
        let f
        i.to(o, {
          z: (d) => (d - u.children.length / 2) * 10,
          duration: 0.5,
          ease: 'expo.inOut',
        }),
          i.to(
            o,
            { opacity: 1, duration: 0.25, stagger: 0.1, ease: 'expo.inOut' },
            '<0.5'
          ),
          i.to(n.el, { opacity: 1, duration: 0.25, ease: 'expo.inOut' }, '<'),
          i.to(
            u,
            {
              rotateY: 360,
              duration: 1.5,
              ease: 'none',
              onComplete: () => {
                f = ri.getState(o, { props: 'opacity, borderRadius' })
              },
            },
            '<0.25'
          ),
          i.to(
            o,
            {
              z: 0,
              duration: 1,
              ease: 'expo.inOut',
              onComplete: () => {
                o.forEach((d) => {
                  l.appendChild(d),
                    (d.style.width = '100%'),
                    (d.style.height = '100%')
                }),
                  ri.from(f, {
                    duration: 1,
                    ease: 'expo.inOut',
                    onStart: () => {
                      $.to(n.el, {
                        opacity: 0,
                        duration: 1,
                        ease: 'expo.inOut',
                      }),
                        $.to(a, {
                          delay: 0.5,
                          opacity: 0,
                          duration: 1,
                          ease: 'expo.inOut',
                        }),
                        $.to(o, {
                          delay: 0.5,
                          opacity: 0,
                          duration: 1,
                          ease: 'expo.inOut',
                          onStart: s,
                          onComplete: () => {
                            t && (t.style.display = 'none')
                          },
                        })
                    },
                  })
              },
            },
            '>-1'
          )
      }),
    ig = (s) => {
      $.registerPlugin(X),
        s.querySelectorAll('[animation="slide-down"]').forEach((r) => {
          const t = $.timeline({ paused: !0 })
          X.create({
            trigger: r.parentNode,
            start: 'top 100%',
            end: 'bottom bottom',
            animation: t,
          }),
            t.from(r, {
              y: '-100%',
              delay: 0.5,
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut',
            })
        })
    },
    Tf = (s) => {
      $.registerPlugin(X),
        s.querySelectorAll('[animation="slide-up"]').forEach((r) => {
          const t = $.timeline({ paused: !0 })
          X.create({
            trigger: r.parentNode,
            start: 'top 100%',
            end: 'bottom bottom',
            animation: t,
          }),
            t.from(r, {
              y: '100%',
              delay: 0.5,
              opacity: 0,
              duration: 1,
              ease: 'power2.inOut',
            })
        })
    },
    cu = (s) => {
      $.registerPlugin(X)
      const e = window.matchMedia('(max-width: 479px)').matches
      s.querySelectorAll(
        e
          ? '[element="split-text"]:not([disable-mobile])'
          : '[element="split-text"]'
      ).forEach((t) => {
        const n = jc.create(t)
        n.lines.forEach((a) => {
          a.style.overflow = 'hidden'
        })
        const i = n.elements[0].getAttribute('direction'),
          o = $.timeline({ paused: !0 })
        X.create({
          trigger: t,
          start: 'top 100%',
          end: 'bottom bottom',
          animation: o,
        }),
          o.from(n.words, {
            y: i == 'down' ? '-70%' : '70%',
            opacity: 0,
            stagger: n.words.length > 50 ? 0 : 0.01,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
              n.revert()
            },
          })
      })
    }
  history.scrollRestoration && (history.scrollRestoration = 'manual')
  function sg(s) {
    return (
      (s = s || 0),
      new Promise((e) => {
        setTimeout(() => {
          e()
        }, s)
      })
    )
  }
  const og = (s) => {
      $.to(s.querySelectorAll('img'), {
        opacity: 0,
        duration: 1,
        scale: 0.8,
        ease: 'power2.inOut',
      }),
        $.to('.section_footer, [animation="scale"]', {
          opacity: 0,
          duration: 1,
          scale: 1.2,
          ease: 'power2.inOut',
        }),
        $.to(
          '[animation="scale-down"], .background-image, .projecthero-image, video, img',
          {
            opacity: 0,
            filter: 'blur(50px)',
            duration: 1,
            scale: 0.8,
            ease: 'power2.inOut',
          }
        ),
        $.to(s.querySelectorAll('[animation="blur"]'), {
          opacity: 0,
          filter: 'blur(50px)',
          duration: 1.5,
          scale: 1.2,
          ease: 'power2.inOut',
          y: -100,
        })
    },
    ag = (s) => {
      console.log('test purge'),
        $.from(s.querySelectorAll('img, video'), {
          opacity: 0,
          duration: 1,
          scale: 0.8,
          ease: 'power2.inOut',
        }),
        $.from('.section_footer, [animation="scale"]', {
          opacity: 0,
          filter: 'blur(20px)',
          duration: 1,
          scale: 0.8,
          ease: 'power2.inOut',
        }),
        $.from('img', {
          filter: 'blur(50px)',
          duration: 1,
          ease: 'power2.inOut',
        }),
        $.from(s.querySelectorAll('[animation="blur"]'), {
          opacity: 0,
          filter: 'blur(20px)',
          duration: 1,
          scale: 1.2,
          ease: 'power2.inOut',
        })
    }
  ng().then(() => {
    os.init({
      transitions: [
        {
          name: 'default',
          async leave(s) {
            const e = this.async()
            og(s.current.container), await sg(1e3), e()
          },
          enter(s) {
            ag(s.next.container)
          },
          once(s) {
            Op(s.next.container)
          },
        },
      ],
      views: [
        {
          namespace: 'home',
          beforeEnter(s) {
            rf(s.next.container),
              ig(s.next.container),
              Tf(s.next.container),
              Gd(s.next.container)
          },
          afterEnter(s) {
            cu(s.next.container),
              Wd(s.next.container),
              requestAnimationFrame(() => {
                Np(s.next.container), jr(s.next.container)
              })
          },
        },
        {
          namespace: 'studio',
          beforeEnter(s) {
            Tf(s.next.container), Xd(s.next.container), Yd(s.next.container)
          },
          afterEnter(s) {
            cu(s.next.container),
              setTimeout(() => {
                X.refresh()
              }, 500)
          },
        },
        {
          namespace: 'contact',
          beforeEnter(s) {
            cu(s.next.container)
          },
        },
        {
          namespace: 'projects',
          beforeEnter(s) {
            rf(s.next.container), jr(s.next.container)
          },
        },
        {
          namespace: 'project',
          beforeEnter(s) {
            jr(s.next.container)
          },
        },
        {
          namespace: 'animation-test',
          beforeEnter() {
            Uc()
          },
        },
        {
          namespace: 'animation-test-2',
          beforeEnter() {
            Gc()
          },
        },
        {
          namespace: 'blue-star',
          beforeEnter(s) {
            Uc(), Gc(), jr(s.next.container)
          },
        },
      ],
    })
  }),
    os.hooks.beforeLeave((s) => {
      X.killAll(), Ap(s)
    }),
    os.hooks.enter(() => {
      window.scrollTo(0, 0), X.clearScrollMemory('manual')
    }),
    os.hooks.afterEnter((s) => {
      Hd(s.next.container), jd(), Ud(s.next.container), Mp(s)
    })
})
