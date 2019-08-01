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
})({"js/helper/waitImg.js":[function(require,module,exports) {
'use strict';

module.exports = function (element, callback) {
  var allImgsLength = 0;
  var allImgsLoaded = 0;
  var allImgs = [];
  var filtered = Array.prototype.filter.call(element.querySelectorAll('img'), function (item) {
    if (item.src === '') {
      return false;
    } // Firefox's `complete` property will always be `true` even if the image has not been downloaded.
    // Doing it this way works in Firefox.


    var img = new Image();
    img.src = item.src;
    return !img.complete;
  });
  filtered.forEach(function (item) {
    allImgs.push({
      src: item.src,
      element: item
    });
  });
  allImgsLength = allImgs.length;
  allImgsLoaded = 0; // If no images found, don't bother.

  if (allImgsLength === 0) {
    callback.call(element);
  }

  allImgs.forEach(function (img) {
    var image = new Image(); // Handle the image loading and error with the same callback.

    image.addEventListener('load', function () {
      allImgsLoaded++;

      if (allImgsLoaded === allImgsLength) {
        callback.call(element);
        return false;
      }
    });
    image.src = img.src;
  });
};
},{}],"index.js":[function(require,module,exports) {
"use strict";

var TWEEN = _interopRequireWildcard(require("Tween"));

var _waitImg = _interopRequireDefault(require("./js/helper/waitImg"));

var _cameraControls = _interopRequireDefault(require("camera-controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import data from './final.json'
// console.log('Dataloading ... OK')
// import TA from 'text-animate'
// const anim = TA.controller()
// const seed = Math.random()
// const eTextAni = {
// 	etchSpeed: 10 + Math.round(Math.random() * 4),
// 	targetBGColor: 'rgba(0,255,0,0)',
// 	targetFGColor: 'rgba(0,255,0,1)',
// 	etchBGColor: 'rgb(0,255,0)',
// 	etchFGColor: 'rgb(0,255,0)',
// 	seed
// }
var data;
var objects = [];
var btns = document.getElementsByTagName('button');
var checks = document.getElementsByClassName('box');
var searchInput = document.getElementsByTagName('input')[0];
var currentKeyword = '';
var currentCheckedGrades = [];
var currentPos = '';
var shiftDown = false; //material colors

var colors = ['#9E9E9E', '#2196F3', '#9C27B0', '#E91E63', '#FF9800'];
var words = ['冰属性强化', '火属性强化', '暗属性强化', '光属性强化', '所有属性强化', '力量', '智力', '体力', '精神', '物理攻击力', '魔法攻击力', '独立攻击力'];
var posOpr = {
  49: '头肩',
  50: '上衣',
  81: '下装',
  87: '腰带',
  65: '鞋',
  83: '全',
  51: '武器',
  52: '称号',
  69: '手镯',
  82: '项链',
  68: '辅助装备',
  70: '戒指',
  67: '耳环',
  86: '魔法石'
};
var posSimplifedMap = {
  肩: '头肩',
  上: '上衣',
  下: '下装',
  腰: '腰带',
  鞋: '鞋',
  全: '部位',
  部位: '',
  武: '武器',
  称: '称号',
  镯: '手镯',
  链: '项链',
  左: '辅助装备',
  戒: '戒指',
  耳: '耳环',
  右: '魔法石'
};
var btnOpr = {
  冰: words[0],
  火: words[1],
  暗: words[2],
  光: words[3],
  全: words[4],
  力: words[5],
  智: words[6],
  体: words[7],
  精: words[8],
  物: words[9],
  魔: words[10],
  独: words[11]
};
var keyOpr = {
  b: words[0],
  h: words[1],
  a: words[2],
  g: words[3],
  q: words[4],
  l: words[5],
  z: words[6],
  t: words[7],
  j: words[8],
  w: words[9],
  m: words[10],
  d: words[11]
};
var colorTem = {
  white: colors[0],
  blue: colors[1],
  purples: colors[2],
  pink: colors[3],
  orange: colors[4]
};
var colorOpr = {
  白: colors[0],
  蓝: colors[1],
  紫: colors[2],
  粉: colors[3],
  橙: colors[4]
};
var targets = {
  cards: [] //setup cameracontrols

};

_cameraControls.default.install({
  THREE: THREE
});

var width = window.innerWidth;
var height = window.innerHeight;
var clock = new THREE.Clock();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 100);
var renderer = new THREE.CSS3DRenderer();
camera.position.z = 6000;
renderer.setSize(width, height);
document.getElementById('container').appendChild(renderer.domElement); // renderer.setClearColor( 0xffaa00, 1);

var cameraControls = new _cameraControls.default(camera, renderer.domElement); // cameraControls.addEventListener('change', render)
// cameraControls = new OrbitControls(camera, renderer.domElement)

cameraControls.minDistance = 10;
cameraControls.maxDistance = 6000; // cameraControls.keyPanSpeed = 100
// cameraControls.zoomSpeed = 1

cameraControls.enableDamping = true;
cameraControls.dollyToCursor = true;
cameraControls.verticalDragToForward = true;
cameraControls.azimuthRotateSpeed = 1;
cameraControls.polarRotateSpeed = 1;
cameraControls.dollySpeed = 1;
cameraControls.truckSpeed = 1; // cameraControls.rotateSpeed = 0.2

cameraControls.dampingFactor = 0.1;

function initCard() {
  var _loop = function _loop(i) {
    img = document.createElement('img');
    img.className = 'img';
    img.src = data[i]['url'];
    element = document.createElement('div');
    element.className = 'element';
    element.appendChild(img);
    title = document.createElement('div');
    title.className = 'title';
    title.textContent = data[i]['name'];
    title.style.color = colorTem[data[i]['grade']];
    element.appendChild(title); // var symbol = document.createElement('div')
    // symbol.className = 'symbol'
    // symbol.textContent = table[i]
    // element.appendChild(symbol)

    details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = data[i]['position'] + '<br>' + data[i]['p_type'] + '<br>' + data[i]['min_p'] + ' ===> ' + data[i]['max_p'];
    element.appendChild(details);

    element.onmouseenter = function (e) {
      document.querySelectorAll('h3').forEach(function (e, d) {
        e.innerText = data[i][['upgradable', 'e_pkc', 'hechengqi', 'hecheng', 'extra'][d]]; // anim.add(TA.text(e, eTextAni))
      });
    };

    element.onmouseleave = function (e) {
      document.querySelectorAll('h3').forEach(function (e) {
        e.innerText = '';
      });
    };

    object = new THREE.CSS3DObject(element);
    object.position.x = Math.random() * 10000 - 1582 * 4;
    object.position.y = Math.random() * 10000 - 990 * 4;
    object.position.z = Math.random() * 10000;
    scene.add(object);
    objects.push(object); //

    object = new THREE.Object3D(); // object.position.x = (table[i + 3] * 226) - 1330

    object.position.x = i % 30 * 226 - 1582 * 2; // object.position.y = - (table[i + 4] * 288) + 990

    object.position.y = -(Math.floor(i / 30) * 288) + 990 * 2;
    object.userData = data[i];
    targets.cards.push(object);
    element.addEventListener('click', function (e, i) {
      console.log(e, i);
    }, false);
  };

  // cards init
  for (var i in data) {
    var img;
    var element;
    var title;
    var details;
    var object;
    var object;

    _loop(i);
  } // transform(targets.cards, 1000)


  console.log('Card img url set... OK');
}

function setupEvent() {
  var _loop2 = function _loop2(i) {
    if (btns.hasOwnProperty(i)) {
      var _e = btns[i];

      _e.addEventListener('click', function () {
        if (i == 0) {
          reset();
          return;
        }

        searchInput.value = btnOpr[_e.innerText];
        filter();
      });
    }
  };

  for (var i in btns) {
    _loop2(i);
  }

  document.getElementsByClassName('pos')[0].addEventListener('click', function () {
    togglePosPick();
  }, false); //fix focus

  document.getElementById('container').addEventListener('click', function () {
    return document.activeElement.blur();
  }, false); // toggle backgroundColor

  for (var i in checks) {
    if (checks.hasOwnProperty(i)) {
      var e = checks[i];
      checks[i].style.backgroundColor = checks[i].style.backgroundColor === '' ? colorOpr[e.innerText] : '';
      e.addEventListener('click', function (m) {
        m.target.style.backgroundColor = m.target.style.backgroundColor === '' ? colorOpr[m.target.innerText] : '';
        filter();
      }, false);
    }
  }

  document.body.onselectstart = function () {
    return false;
  };

  document.querySelectorAll('a').forEach(function (e, i) {
    //skip last one
    if (i === 14) return;
    e.addEventListener('click', function () {
      document.querySelectorAll('a')[14].innerText = posSimplifedMap[e.innerText];
      togglePosPick();
      filter();
    }, false);
  }); //key bind

  document.onkeydown = function (e) {
    //prevent filter when input focused
    if (document.activeElement === searchInput) {
      if (e.key === 'Enter') {
        searchInput.blur();
      }

      return;
    } //key event


    if (e.key in keyOpr && !shiftDown) {
      searchInput.value = keyOpr[e.key];
      filter();
    } else if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5') {
      checks[e.key - 1].click();
    } else if (e.key === 'Enter') {
      searchInput.focus();
    } else if (e.key === 'Shift') {
      if (!shiftDown) {
        shiftDown = true;
        togglePosPick();
      }
    } else if (e.keyCode in posOpr && shiftDown) {
      document.getElementsByClassName('pos')[0].children[0].innerText = posOpr[e.keyCode];
      filter();
    } else if (e.code === 'Space') {
      reset();
    }
  };

  document.onkeyup = function (e) {
    //prevent filter when input focused
    if (document.activeElement === searchInput) return;

    if (e.key === 'Shift') {
      shiftDown = false;
      togglePosPick();
    }
  };

  searchInput.addEventListener('change', function () {
    filter();
  });
  window.addEventListener('resize', onWindowResize, false);
  console.log('Event setup ... OK');
}

function togglePosPick() {
  var s = document.getElementsByClassName('whole-p')[0];

  if (s.classList.length > 1) {
    s.classList.remove('hidden');
  } else {
    s.classList.add('hidden');
  }
}

function getCurrentPos() {
  return document.getElementsByClassName('pos')[0].children[0].innerText;
}

function getCurrentSearchWords() {
  return searchInput.value;
}

function filter() {
  cameraControls.reset(true);
  currentKeyword = getCurrentSearchWords();
  currentCheckedGrades = getCheckedColors();
  var cp = getCurrentPos();
  currentPos = cp === '全' || cp === '部位' ? '' : cp;
  console.log(currentKeyword, currentCheckedGrades, currentPos);
  var offset = 0;

  for (var i = 0; i < targets.cards.length; i++) {
    var e = targets.cards[i];
    var pos = e.userData['position'] === undefined ? '' : e.userData['position'];

    if (e.userData['p_type'].search(currentKeyword) > -1 && currentCheckedGrades.includes(e.userData['grade']) && pos.search(currentPos) > -1) {
      targets.cards[i].position.x = (i - offset) % 30 * 226 - 1582 * 2;
      targets.cards[i].position.y = -(Math.floor((i - offset) / 30) * 288) + 990 * 2;
      targets.cards[i].position.z = 0;
    } else {
      targets.cards[i].position.x = 30 * 226 - 1582 * 2 - offset / 5;
      targets.cards[i].position.y = -data.length / 30 * 288 + 990 * 2 - offset / 10;
      targets.cards[i].position.z = offset / 5;
      offset++;
    }
  }

  transform(targets.cards, 500);
}

function reset() {
  //data
  currentKeyword = ''; //ui

  searchInput.value = ''; //data

  for (var i in checks) {
    if (checks.hasOwnProperty(i)) {
      var e = checks[i];
      checks[i].style.backgroundColor = colorOpr[e.innerText];
    }
  } //ui


  currentCheckedGrades = ['white', 'blue', 'purples', 'pink', 'orange']; //data

  currentPos = ''; //ui

  document.getElementsByClassName('pos')[0].children[0].innerText = '部位';
  filter(); // for (let i = 0; i < targets.cards.length; i++) {
  // 	targets.cards[i].position.x = (i % 30) * 226 - 1582 * 2
  // 	targets.cards[i].position.y = -(Math.floor(i / 30) * 288) + 990 * 2
  // }
  // transform(targets.cards, 500)
}

function transform(targets, duration) {
  TWEEN.removeAll();

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var target = targets[i];
    new TWEEN.Tween(object.position).to({
      x: target.position.x,
      y: target.position.y,
      z: target.position.z
    }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();
    new TWEEN.Tween(object.rotation).to({
      x: target.rotation.x,
      y: target.rotation.y,
      z: target.rotation.z
    }, Math.random() * duration + duration).easing(TWEEN.Easing.Exponential.InOut).start();
  }

  new TWEEN.Tween(this).to({}, duration * 2).onUpdate(render).start();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function getCheckedColors() {
  var r = [];

  for (var i in checks) {
    if (checks.hasOwnProperty(i)) {
      var e = checks[i];

      if (e.style.backgroundColor !== '') {
        r.push(Object.keys(colorTem)[i]);
      }
    }
  }

  return r;
}

function getCurrentKeywords() {
  return currentKeyword;
}

function animate() {
  var delta = clock.getDelta();
  var elapsed = clock.getElapsedTime();
  var updated = cameraControls.update(delta);
  requestAnimationFrame(animate);
  TWEEN.update();

  if (updated) {
    renderer.render(scene, camera);
    console.log('rendered');
  } // cameraControls.update()

}

function render() {
  renderer.render(scene, camera);
}

function initBackground() {
  VANTA.CLOUDS({
    el: '#container'
  });
  console.log('Background ... OK');
} // https://obs-e263.obs.ap-southeast-1.myhuaweicloud.com/final.json


document.addEventListener('DOMContentLoaded', function () {
  // TODO: use svg or simple ascii animation as loading effect.
  // consider use full site cdn
  fetch('https://obs-e263.obs.ap-southeast-1.myhuaweicloud.com/final.json', {
    mode: 'cors'
  }).then(function (r) {
    return r.json();
  }).then(function (d) {
    console.log('data ... OK');
    data = d;
    initBackground();
    initCard();
    setupEvent();
    console.log('gpu resources ... OK');
    transform(targets.cards, 1000);
    TWEEN.update();
    console.log('image load ... OK');
    (0, _waitImg.default)(document, function () {
      transform(targets.cards, 1000);
      animate();
      var s = '-'.repeat(129) + '\n' + '|' + '	沙雕百度ocr api识别，有一定误差，报告数据错误或BUG可以mail给我：cc@ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc.cc	|\n' + '|' + '	立即修复！(如果我还没脱坑的话...)' + ' '.repeat(95) + '|\n' + '-'.repeat(129);
      console.log(s);
    });
  });
});
},{"./js/helper/waitImg":"js/helper/waitImg.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], "moduleName")
//# sourceMappingURL=gh-pages.e31bb0bc.js.map