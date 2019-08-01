// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/vanta.clouds.min.js":[function(require,module,exports) {
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e) {
  var n = {};

  function t(i) {
    if (n[i]) return n[i].exports;
    var o = n[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
  }

  t.m = e, t.c = n, t.d = function (e, n, i) {
    t.o(e, n) || Object.defineProperty(e, n, {
      enumerable: !0,
      get: i
    });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, t.t = function (e, n) {
    if (1 & n && (e = t(e)), 8 & n) return e;
    if (4 & n && "object" == _typeof(e) && e && e.__esModule) return e;
    var i = Object.create(null);
    if (t.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: e
    }), 2 & n && "string" != typeof e) for (var o in e) {
      t.d(i, o, function (n) {
        return e[n];
      }.bind(null, o));
    }
    return i;
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return t.d(n, "a", n), n;
  }, t.o = function (e, n) {
    return Object.prototype.hasOwnProperty.call(e, n);
  }, t.p = "", t(t.s = 6);
}([function (e, n, t) {
  "use strict";

  function i(e, n) {
    for (var t in n) {
      n.hasOwnProperty(t) && (e[t] = n[t]);
    }

    return e;
  }

  function o() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600;
  }

  t.d(n, "c", function () {
    return i;
  }), t.d(n, "d", function () {
    return o;
  }), t.d(n, "h", function () {
    return s;
  }), t.d(n, "g", function () {
    return r;
  }), t.d(n, "f", function () {
    return a;
  }), t.d(n, "e", function () {
    return u;
  }), t.d(n, "a", function () {
    return c;
  }), t.d(n, "b", function () {
    return l;
  }), Number.prototype.clamp = function (e, n) {
    return Math.min(Math.max(this, e), n);
  };

  var s = function s(e) {
    return e[Math.floor(Math.random() * e.length)];
  };

  function r(e, n) {
    return null == e && (e = 0), null == n && (n = 1), e + Math.random() * (n - e);
  }

  function a(e, n) {
    return null == e && (e = 0), null == n && (n = 1), Math.floor(e + Math.random() * (n - e + 1));
  }

  var u = function u(e) {
    return document.querySelector(e);
  };

  var c = function c(e) {
    return "number" == typeof e ? "#" + ("00000" + e.toString(16)).slice(-6) : e;
  },
      l = function l(e) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var t = c(e),
        i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),
        o = i ? {
      r: parseInt(i[1], 16),
      g: parseInt(i[2], 16),
      b: parseInt(i[3], 16)
    } : null;
    return "rgba(" + o.r + "," + o.g + "," + o.b + "," + n + ")";
  };
}, function (e, n, t) {
  "use strict";

  t.d(n, "a", function () {
    return o;
  });
  var i = t(0);
  window && !window.VANTA && (window.VANTA = {
    version: "0.3.1"
  });
  var o = window.VANTA || {};
  o.register || (o.register = function (e, n) {
    o[e] = function (e) {
      return new n(e);
    };
  });

  var s = function s() {
    return Array.prototype.unshift.call(arguments, "[VANTA]"), console.error.apply(this, arguments);
  };

  o.VantaBase =
  /*#__PURE__*/
  function () {
    function _class() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, _class);

      var n, t, r, a;
      if (o.current = this, this.onMouseMoveWrapper = this.onMouseMoveWrapper.bind(this), this.resize = this.resize.bind(this), this.animationLoop = this.animationLoop.bind(this), this.restart = this.restart.bind(this), this.options = Object(i.c)({}, this.defaultOptions), e instanceof HTMLElement || "string" == typeof e ? Object(i.c)(this.options, {
        el: e
      }) : Object(i.c)(this.options, e), this.el = this.options.el, null == this.el) s('Instance needs "el" param!');else if (!(this.options.el instanceof HTMLElement || (a = this.el, this.el = Object(i.e)(a), this.el))) return void s("Cannot find element", a);

      for (r = 0; r < this.el.children.length; r++) {
        n = this.el.children[r], "static" === getComputedStyle(n).position && (n.style.position = "relative"), "auto" === getComputedStyle(n).zIndex && (n.style.zIndex = 1);
      }

      "static" === getComputedStyle(this.el).position && (this.el.style.position = "relative"), "object" == (typeof THREE === "undefined" ? "undefined" : _typeof(THREE)) && this.initThree(), this.setSize(), this.uniforms = {
        u_time: {
          type: "f",
          value: 1
        },
        u_resolution: {
          type: "v2",
          value: new THREE.Vector2(1, 1)
        },
        u_mouse: {
          type: "v2",
          value: new THREE.Vector2(0, 0)
        }
      };

      try {
        this.init();
      } catch (e) {
        return t = e, s("Init error"), s(t), this.el.removeChild(this.renderer.domElement), void (this.options.backgroundColor && (console.log("[VANTA] Falling back to backgroundColor"), this.el.style.background = Object(i.a)(this.options.backgroundColor)));
      }

      window.addEventListener("resize", this.resize), this.resize(), this.animationLoop(), this.el.addEventListener("mousemove", this.onMouseMoveWrapper, !1), window.addEventListener("scroll", this.onMouseMoveWrapper);
    }

    _createClass(_class, [{
      key: "applyCanvasStyles",
      value: function applyCanvasStyles(e) {
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        Object(i.c)(e.style, {
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          background: ""
        }), Object(i.c)(e.style, n), e.classList.add("vanta-canvas");
      }
    }, {
      key: "initThree",
      value: function initThree() {
        this.renderer = new THREE.WebGLRenderer({
          alpha: !0,
          antialias: !0
        }), this.el.appendChild(this.renderer.domElement), this.applyCanvasStyles(this.renderer.domElement), isNaN(this.options.backgroundAlpha) && (this.options.backgroundAlpha = 1), this.scene = new THREE.Scene();
      }
    }, {
      key: "onMouseMoveWrapper",
      value: function onMouseMoveWrapper(e) {
        var n, t, i;
        n = this.renderer.domElement.getBoundingClientRect(), t = this.mouseX = e.clientX - n.left, i = this.mouseY = e.clientY - n.top, t >= 0 && i >= 0 && !this.options.mouseEase && this.triggerMouseMove(t, i);
      }
    }, {
      key: "triggerMouseMove",
      value: function triggerMouseMove(e, n) {
        this.uniforms && (this.uniforms.u_mouse.value.x = e / this.scale, this.uniforms.u_mouse.value.y = n / this.scale);
        var t = e / this.width,
            i = n / this.height;
        "function" == typeof this.onMouseMove && this.onMouseMove(t, i);
      }
    }, {
      key: "setSize",
      value: function setSize() {
        this.scale || (this.scale = 1), Object(i.d)() && this.options.scaleMobile ? this.scale = this.options.scaleMobile : this.options.scale && (this.scale = this.options.scale), this.width = this.el.offsetWidth || window.innerWidth, this.height = this.el.offsetHeight || window.innerHeight;
      }
    }, {
      key: "resize",
      value: function resize() {
        var e, n;
        this.setSize(), null != (e = this.camera) && (e.aspect = this.width / this.height), null != (n = this.camera) && "function" == typeof n.updateProjectionMatrix && n.updateProjectionMatrix(), this.renderer && (this.renderer.setSize(this.width, this.height), this.renderer.setPixelRatio(window.devicePixelRatio / this.scale)), "function" == typeof this.onResize && this.onResize();
      }
    }, {
      key: "animationLoop",
      value: function animationLoop() {
        var e, n, t, i, o, s, r, a;
        return this.t || (this.t = 0), this.t += 1, this.t2 || (this.t2 = 0), this.t2 += null != (s = this.options.speed) ? s : 1, this.uniforms && (this.uniforms.u_time.value = .016667 * this.t2), e = this.el.offsetHeight, n = this.el.getBoundingClientRect(), a = null != (r = window.pageYOffset) ? r : (document.documentElement || document.body.parentNode || document.body).scrollTop, i = (o = n.top + a) - window.innerHeight, t = o + e, this.options.mouseEase && (this.mouseEaseX = this.mouseEaseX || this.mouseX || 0, this.mouseEaseY = this.mouseEaseY || this.mouseY || 0, Math.abs(this.mouseEaseX - this.mouseX) + Math.abs(this.mouseEaseY - this.mouseY) > .1 && (this.mouseEaseX = this.mouseEaseX + .05 * (this.mouseX - this.mouseEaseX), this.mouseEaseY = this.mouseEaseY + .05 * (this.mouseY - this.mouseEaseY), this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY))), i <= a && a <= t && ("function" == typeof this.onUpdate && this.onUpdate(), this.scene && this.camera && (this.renderer.render(this.scene, this.camera), this.renderer.setClearColor(this.options.backgroundColor, this.options.backgroundAlpha)), this.fps && this.fps.update && this.fps.update()), this.req = window.requestAnimationFrame(this.animationLoop);
      }
    }, {
      key: "restart",
      value: function restart() {
        if (this.scene) for (; this.scene.children.length;) {
          this.scene.remove(this.scene.children[0]);
        }
        "function" == typeof this.onRestart && this.onRestart(), this.init();
      }
    }, {
      key: "init",
      value: function init() {
        "function" == typeof this.onInit && this.onInit();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        "function" == typeof this.onDestroy && this.onDestroy(), this.el.removeEventListener("mousemove", this.onMouseMoveWrapper), window.removeEventListener("scroll", this.onMouseMoveWrapper), window.removeEventListener("resize", this.resize), window.cancelAnimationFrame(this.req), this.renderer && (this.el.removeChild(this.renderer.domElement), this.renderer = null, this.scene = null);
      }
    }]);

    return _class;
  }(), n.b = o.VantaBase;
}, function (e, n, t) {
  "use strict";

  t.d(n, "b", function () {
    return s;
  });
  var i = t(1),
      o = t(0);
  t.d(n, "a", function () {
    return i.a;
  }), "object" == (typeof THREE === "undefined" ? "undefined" : _typeof(THREE)) && (THREE.Color.prototype.toVector = function () {
    return new THREE.Vector3(this.r, this.g, this.b);
  });

  var s =
  /*#__PURE__*/
  function (_i$b) {
    _inherits(s, _i$b);

    function s(e) {
      var _this;

      _classCallCheck(this, s);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(s).call(this, e)), _this.mode = "shader", _this.updateUniforms = _this.updateUniforms.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(s, [{
      key: "initBasicShader",
      value: function initBasicShader() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fragmentShader;
        var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.vertexShader;
        var t, i, o;
        return n || (n = "uniform float u_time;\nuniform vec2 u_resolution;\nvoid main() {\n  gl_Position = vec4( position, 1.0 );\n}"), this.updateUniforms(), "function" == typeof this.valuesChanger && this.valuesChanger(), t = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: n,
          fragmentShader: e
        }), (o = this.options.texturePath) && (this.uniforms.u_tex = {
          type: "t",
          value: new THREE.TextureLoader().load(o)
        }), i = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), t), this.scene.add(i), this.camera = new THREE.Camera(), this.camera.position.z = 1;
      }
    }, {
      key: "updateUniforms",
      value: function updateUniforms() {
        var e, n, t, i;

        for (e in n = {}, t = this.options) {
          i = t[e], -1 !== e.toLowerCase().indexOf("color") ? n[e] = {
            type: "v3",
            value: new THREE.Color(i).toVector()
          } : "number" == typeof i && (n[e] = {
            type: "f",
            value: i
          });
        }

        return Object(o.c)(this.uniforms, n);
      }
    }, {
      key: "init",
      value: function init() {
        _get(_getPrototypeOf(s.prototype), "init", this).call(this), this.fragmentShader && this.initBasicShader();
      }
    }, {
      key: "resize",
      value: function resize() {
        _get(_getPrototypeOf(s.prototype), "resize", this).call(this), this.uniforms.u_resolution.value.x = this.width / this.scale, this.uniforms.u_resolution.value.y = this.height / this.scale;
      }
    }]);

    return s;
  }(i.b);
},,,, function (e, n, t) {
  "use strict";

  t.r(n);
  var i = t(2);

  var o =
  /*#__PURE__*/
  function (_i$b2) {
    _inherits(o, _i$b2);

    function o() {
      _classCallCheck(this, o);

      return _possibleConstructorReturn(this, _getPrototypeOf(o).apply(this, arguments));
    }

    return o;
  }(i.b);

  i.a.register("CLOUDS", o), o.prototype.defaultOptions = {
    backgroundColor: 16777215,
    skyColor: 6863063,
    cloudColor: 11387358,
    cloudShadowColor: 1586512,
    sunColor: 16750873,
    sunGlareColor: 16737843,
    sunlightColor: 16750899,
    scale: 3,
    scaleMobile: 12,
    mouseEase: !0
  }, o.prototype.fragmentShader = "uniform vec2 u_resolution;\nuniform vec2 u_mouse;\nuniform float u_time;\nuniform sampler2D u_tex;\n\nuniform vec3 skyColor;\nuniform vec3 cloudColor;\nuniform vec3 cloudShadowColor;\nuniform vec3 sunColor;\nuniform vec3 sunlightColor;\nuniform vec3 sunGlareColor;\nuniform vec3 backgroundColor;\n\n// uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click\n// uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube\n\n\n// Volumetric clouds. It performs level of detail (LOD) for faster rendering\nfloat iqhash( float n ){\n    return fract(sin(n)*3758.5453);\n    // return fract(n * (n-1.203) * (n-2.3) / 43758.5453);\n}\n\nfloat noise( vec3 x ){\n    // The noise function returns a value in the range -1.0f -> 1.0f\n    vec3 p = floor(x);\n    vec3 f = fract(x);\n    f       = f*f*(3.0-2.0*f);\n    float n = p.x + p.y*57.0 + 113.0*p.z;\n    return mix(mix(mix( iqhash(n+0.0  ), iqhash(n+1.0  ),f.x),\n                   mix( iqhash(n+57.0 ), iqhash(n+58.0 ),f.x),f.y),\n               mix(mix( iqhash(n+113.0), iqhash(n+114.0),f.x),\n                   mix( iqhash(n+170.0), iqhash(n+171.0),f.x),f.y),f.z);\n}\n\nvec3 speed = vec3(0.5,0.01,1.0) * 0.5;\nfloat constantTime = 1000.;\nfloat map5( in vec3 p ){\n    vec3 q = p - speed*(u_time + constantTime);\n    float f;\n    f  = 0.50000*noise( q ); q = q*2.02;\n    f += 0.25000*noise( q ); q = q*2.03;\n    f += 0.12500*noise( q ); q = q*2.01;\n    f += 0.06250*noise( q ); q = q*2.02;\n    f += 0.03125*noise( q );\n    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );\n}\nfloat map4( in vec3 p ){\n    vec3 q = p - speed*(u_time + constantTime);\n    float f;\n    f  = 0.50000*noise( q ); q = q*2.02;\n    f += 0.25000*noise( q ); q = q*2.03;\n    f += 0.12500*noise( q ); q = q*2.01;\n    f += 0.06250*noise( q );\n    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );\n}\nfloat map3( in vec3 p ){\n    vec3 q = p - speed*(u_time + constantTime);\n    float f;\n    f  = 0.50000*noise( q ); q = q*2.02;\n    f += 0.25000*noise( q ); q = q*2.03;\n    f += 0.12500*noise( q );\n    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );\n}\nfloat map2( in vec3 p ){\n    vec3 q = p - speed*(u_time + constantTime);\n    float f;\n    f  = 0.50000*noise( q ); q = q*2.02;\n    f += 0.25000*noise( q );\n    return clamp( 1.5 - p.y - 2.0 + 1.75*f, 0.0, 1.0 );\n}\n\nvec3 sundir = normalize( vec3(-1.0,0.0,-1.0) );\n\nvec4 integrate( in vec4 sum, in float dif, in float den, in vec3 bgcol, in float t ){\n    // lighting\n    vec3 lin = cloudColor*1.4 + sunlightColor*dif;\n    vec4 col = vec4( mix( vec3(1.0,0.95,0.8), cloudShadowColor, den ), den );\n    col.xyz *= lin;\n    col.xyz = mix( col.xyz, bgcol, 1.0-exp(-0.003*t*t) );\n    // front to back blending\n    col.a *= 0.4;\n    col.rgb *= col.a;\n    return sum + col*(1.0-sum.a);\n}\n\n#define MARCH(STEPS,MAPLOD) for(int i=0; i<STEPS; i++) { vec3  pos = ro + t*rd; if( pos.y<-3.0 || pos.y>2.0 || sum.a > 0.99 ) break; float den = MAPLOD( pos ); if( den>0.01 ) { float dif = clamp((den - MAPLOD(pos+0.3*sundir))/0.6, 0.0, 1.0 ); sum = integrate( sum, dif, den, bgcol, t ); } t += max(0.075,0.02*t); }\n\nvec4 raymarch( in vec3 ro, in vec3 rd, in vec3 bgcol, in ivec2 px ){\n    vec4 sum = vec4(0.0);\n\n    float t = 0.0;\n\n    MARCH(20,map5);\n    MARCH(25,map4);\n    MARCH(30,map3);\n    MARCH(40,map2);\n\n    return clamp( sum, 0.0, 1.0 );\n}\n\nmat3 setCamera( in vec3 ro, in vec3 ta, float cr ){\n    vec3 cw = normalize(ta-ro);\n    vec3 cp = vec3(sin(cr), cos(cr),0.0);\n    vec3 cu = normalize( cross(cw,cp) );\n    vec3 cv = normalize( cross(cu,cw) );\n    return mat3( cu, cv, cw );\n}\n\nvec4 render( in vec3 ro, in vec3 rd, in ivec2 px ){\n    // background sky\n    float sun = clamp( dot(sundir,rd), 0.0, 1.0 );\n    vec3 col = skyColor - rd.y*0.2*vec3(1.0,0.5,1.0) + 0.15*0.5;\n    col += 0.2*sunColor*pow( sun, 8.0 );\n\n    // clouds\n    vec4 res = raymarch( ro, rd, col, px );\n    col = col*(1.0-res.w) + res.xyz;\n\n    // sun glare\n    col += 0.2*sunGlareColor*pow( sun, 3.0 );\n\n    return vec4( col, 1.0 );\n}\n\nvoid main(){\n    vec2 p = (-u_resolution.xy + 2.0*gl_FragCoord.xy)/ u_resolution.y;\n\n    vec2 m = u_mouse.xy/u_resolution.xy;\n    m.y = (1.0 - m.y) * 0.3 + 0.25; // camera height\n\n    m.x *= 0.25;\n    m.x += sin(u_time * 0.1 + 3.1415) * 0.25 + 0.25;\n\n    // camera\n    vec3 ro = 4.0*normalize(vec3(sin(3.0*m.x), 0.4*m.y, cos(3.0*m.x))); // origin\n    vec3 ta = vec3(0.0, -1.0, 0.0);\n    mat3 ca = setCamera( ro, ta, 0.0 );\n    // ray\n    vec3 rd = ca * normalize( vec3(p.xy,1.5));\n\n    gl_FragColor = render( ro, rd, ivec2(gl_FragCoord-0.5) );\n}\n";
}]);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14630" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/vanta.clouds.min.js"], "moduleName")
//# sourceMappingURL=vanta.clouds.min.075ac202.js.map