/* Generated from src/main.ts. See the repository for source. */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/color-classifier/color-classifier.js
var require_color_classifier = __commonJS({
  "node_modules/color-classifier/color-classifier.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.ColorClassifier = factory();
    })(exports, function() {
      "use strict";
      var babelHelpers = {};
      babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      babelHelpers.classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      babelHelpers.createClass = /* @__PURE__ */ (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      babelHelpers.defineProperty = function(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      };
      babelHelpers.slicedToArray = /* @__PURE__ */ (function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      })();
      babelHelpers.toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      babelHelpers;
      function minBy(array, key) {
        var sortedArray = [].concat(babelHelpers.toConsumableArray(array));
        sortedArray.sort(function(a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
        return sortedArray.shift();
      }
      var HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
      var HEX = /^#([a-fA-F0-9]{6})$/;
      function roundColors(obj, round) {
        if (!round) return obj;
        var o = {};
        for (var k in obj) {
          o[k] = Math.round(obj[k]);
        }
        return o;
      }
      function hasProp(obj, key) {
        return obj.hasOwnProperty(key);
      }
      function isRgb(obj) {
        return hasProp(obj, "r") && hasProp(obj, "g") && hasProp(obj, "b");
      }
      var Color = (function() {
        babelHelpers.createClass(Color2, null, [{
          key: "normalizeHex",
          value: function normalizeHex(hex) {
            if (HEX.test(hex)) {
              return hex;
            } else if (HEX_SHORT.test(hex)) {
              var r = hex.slice(1, 2);
              var g = hex.slice(2, 3);
              var b = hex.slice(3, 4);
              return "#" + (r + r) + (g + g) + (b + b);
            }
            return null;
          }
        }, {
          key: "hexToRgb",
          value: function hexToRgb(hex) {
            var normalizedHex = this.normalizeHex(hex);
            if (normalizedHex == null) {
              return null;
            }
            var m = normalizedHex.match(HEX);
            var i = parseInt(m[1], 16);
            var r = i >> 16 & 255;
            var g = i >> 8 & 255;
            var b = i & 255;
            return { r, g, b };
          }
        }, {
          key: "rgbToHex",
          value: function rgbToHex(rgb) {
            var r = rgb.r;
            var g = rgb.g;
            var b = rgb.b;
            var i = ((Math.round(r) & 255) << 16) + ((Math.round(g) & 255) << 8) + (Math.round(b) & 255);
            var s = i.toString(16).toLowerCase();
            return "#" + ("000000".substring(s.length) + s);
          }
        }, {
          key: "rgbToHsv",
          value: function rgbToHsv(rgb) {
            var round = arguments.length <= 1 || arguments[1] === void 0 ? true : arguments[1];
            var r = rgb.r;
            var g = rgb.g;
            var b = rgb.b;
            var min2 = Math.min(r, g, b);
            var max = Math.max(r, g, b);
            var delta = max - min2;
            var hsv = {};
            if (max === 0) {
              hsv.s = 0;
            } else {
              hsv.s = delta / max * 1e3 / 10;
            }
            if (max === min2) {
              hsv.h = 0;
            } else if (r === max) {
              hsv.h = (g - b) / delta;
            } else if (g === max) {
              hsv.h = 2 + (b - r) / delta;
            } else {
              hsv.h = 4 + (r - g) / delta;
            }
            hsv.h = Math.min(hsv.h * 60, 360);
            hsv.h = hsv.h < 0 ? hsv.h + 360 : hsv.h;
            hsv.v = max / 255 * 1e3 / 10;
            return roundColors(hsv, round);
          }
        }, {
          key: "rgbToXyz",
          value: function rgbToXyz(rgb) {
            var round = arguments.length <= 1 || arguments[1] === void 0 ? true : arguments[1];
            var r = rgb.r / 255;
            var g = rgb.g / 255;
            var b = rgb.b / 255;
            var rr = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
            var gg = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
            var bb = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
            var x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) * 100;
            var y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) * 100;
            var z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) * 100;
            return roundColors({ x, y, z }, round);
          }
        }, {
          key: "rgbToLab",
          value: function rgbToLab(rgb) {
            var round = arguments.length <= 1 || arguments[1] === void 0 ? true : arguments[1];
            var xyz = Color2.rgbToXyz(rgb, false);
            var x = xyz.x;
            var y = xyz.y;
            var z = xyz.z;
            x /= 95.047;
            y /= 100;
            z /= 108.883;
            x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
            y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
            z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
            var l = 116 * y - 16;
            var a = 500 * (x - y);
            var b = 200 * (y - z);
            return roundColors({ l, a, b }, round);
          }
        }]);
        function Color2(value) {
          babelHelpers.classCallCheck(this, Color2);
          this.original = value;
          if (isRgb(value)) {
            this.rgb = value;
            this.hex = Color2.rgbToHex(value);
          } else {
            this.hex = Color2.normalizeHex(value);
            this.rgb = Color2.hexToRgb(this.hex);
          }
          this.hsv = Color2.rgbToHsv(this.rgb);
        }
        return Color2;
      })();
      function radians(n) {
        return n * Math.PI / 180;
      }
      function degrees(n) {
        return n * (180 / Math.PI);
      }
      function hypot(a, b) {
        return Math.sqrt(a * a + b * b);
      }
      function pow2(n) {
        return n * n;
      }
      function pow7(n) {
        return n * n * n * n * n * n * n;
      }
      var _diffMethodMap;
      var abs = Math.abs;
      var atan2 = Math.atan2;
      var cos = Math.cos;
      var min = Math.min;
      var exp = Math.exp;
      var sqrt = Math.sqrt;
      var sin = Math.sin;
      var AlgorithmTypes2 = {
        CIEDE2000: "CIEDE2000",
        HSV: "HSV",
        RGB: "RGB"
      };
      var diffMethodMap = (_diffMethodMap = {}, babelHelpers.defineProperty(_diffMethodMap, AlgorithmTypes2.CIEDE2000, "ciede2000"), babelHelpers.defineProperty(_diffMethodMap, AlgorithmTypes2.HSV, "hsv"), babelHelpers.defineProperty(_diffMethodMap, AlgorithmTypes2.RGB, "rgb"), _diffMethodMap);
      var kl = 1;
      var kc = 1;
      var kh = 1;
      var pow7_25 = pow7(25);
      var ColorDiff = (function() {
        function ColorDiff2() {
          babelHelpers.classCallCheck(this, ColorDiff2);
        }
        babelHelpers.createClass(ColorDiff2, null, [{
          key: "diff",
          value: function diff(algorithmType, color1, color2) {
            var method = diffMethodMap[algorithmType];
            return ColorDiff2[method](color1, color2);
          }
        }, {
          key: "ciede2000",
          value: function ciede2000(color1, color2) {
            var a = Color.rgbToLab(color1.rgb);
            var b = Color.rgbToLab(color2.rgb);
            return ColorDiff2._ciede2000(a.l, a.a, a.b, b.l, b.a, b.b);
          }
        }, {
          key: "_ciede2000",
          value: function _ciede2000(l1, a1, b1, l2, a2, b2) {
            var c1 = hypot(a1, b1);
            var c2 = hypot(a2, b2);
            var ac1c2 = (c1 + c2) / 2;
            var g = 0.5 * (1 - sqrt(pow7(ac1c2) / (pow7(ac1c2) + pow7_25)));
            var a1p = (1 + g) * a1;
            var a2p = (1 + g) * a2;
            var c1p = sqrt(pow2(a1p) + pow2(b1));
            var c2p = sqrt(pow2(a2p) + pow2(b2));
            var h1pd = degrees(atan2(b1, a1p));
            var h1p = b1 === 0 && a1p === 0 ? 0 : h1pd > 0 ? h1pd : h1pd + 360;
            var h2pd = degrees(atan2(b2, a2p));
            var h2p = b2 === 0 && a2p === 0 ? 0 : h2pd > 0 ? h2pd : h2pd + 360;
            var dlp = l2 - l1;
            var dcp = c2p - c1p;
            var dhp = 2 * sqrt(c1p * c2p) * sin(radians(c1 * c2 === 0 ? 0 : abs(h2p - h1p) <= 180 ? h2p - h1p : h2p - h1p > 180 ? h2p - h1p - 360 : h2p - h1p + 360) / 2);
            var al = (l1 + l2) / 2;
            var acp = (c1p + c2p) / 2;
            var ahp = void 0;
            if (c1 * c2 === 0) {
              ahp = h1p + h2p;
            } else if (abs(h1p - h2p) <= 180) {
              ahp = (h1p + h2p) / 2;
            } else if (abs(h1p - h2p) > 180 && h1p + h2p < 360) {
              ahp = (h1p + h2p + 360) / 2;
            } else {
              ahp = (h1p + h2p - 360) / 2;
            }
            var t = 1 - 0.17 * cos(radians(ahp - 30)) + 0.24 * cos(radians(2 * ahp)) + 0.32 * cos(radians(3 * ahp + 6)) - 0.2 * cos(radians(4 * ahp - 63));
            var dro = 30 * exp(-pow2((ahp - 275) / 25));
            var rc = sqrt(pow7(acp) / (pow7(acp) + pow7_25));
            var sl = 1 + 0.015 * pow2(al - 50) / sqrt(20 + pow2(al - 50));
            var sc = 1 + 0.045 * acp;
            var sh = 1 + 0.015 * acp * t;
            var rt = -2 * rc * sin(radians(2 * dro));
            return sqrt(pow2(dlp / (sl * kl)) + pow2(dcp / (sc * kc)) + pow2(dhp / (sh * kh)) + rt * (dcp / (sc * kc)) * (dhp / (sh * kh)));
          }
        }, {
          key: "hsv",
          value: function hsv(color1, color2) {
            var a = color1.hsv;
            var b = color2.hsv;
            var h = 0;
            if (a.h > b.h) {
              h = min(a.h - b.h, b.h - a.h + 360);
            } else {
              h = min(b.h - a.h, a.h - b.h + 360);
            }
            return sqrt(pow2(h) + pow2(a.s - b.s) + pow2(a.v - b.v));
          }
        }, {
          key: "rgb",
          value: function rgb(color1, color2) {
            var a = color1.rgb;
            var b = color2.rgb;
            return sqrt(pow2(a.r - b.r) + pow2(a.g - b.g) + pow2(a.b - b.b));
          }
        }]);
        return ColorDiff2;
      })();
      var W3C = ["#000000", "#808080", "#c0c0c0", "#ffffff", "#800000", "#ff0000", "#008000", "#00ff00", "#808000", "#ffff00", "#008080", "#00ffff", "#000080", "#0000ff", "#800080", "#ff00ff"];
      var RAINBOW = ["#000000", "#808080", "#ffffff", "#ff0000", "#ffa500", "#ffff00", "#008000", "#00ffff", "#0000ff", "#800080"];
      var Palette2 = Object.freeze({
        W3C,
        RAINBOW
      });
      function equal(a, b) {
        if (a === b) return true;
        var ka = void 0;
        var kb = void 0;
        try {
          ka = Object.keys(a);
          kb = Object.keys(b);
        } catch (e) {
          return false;
        }
        if (ka.length !== kb.length) return false;
        for (var i = 0; ka.length - 1; i++) {
          var key = ka[i];
          if (a[key] !== b[key]) return false;
        }
        return (typeof a === "undefined" ? "undefined" : babelHelpers.typeof(a)) === (typeof b === "undefined" ? "undefined" : babelHelpers.typeof(b));
      }
      var ColorClassifier2 = (function() {
        babelHelpers.createClass(ColorClassifier3, null, [{
          key: "throwError",
          value: function throwError(msg) {
            throw new Error("[ColorClassifier] " + msg);
          }
        }]);
        function ColorClassifier3() {
          var palette = arguments.length <= 0 || arguments[0] === void 0 ? W3C : arguments[0];
          var algorithmType = arguments.length <= 1 || arguments[1] === void 0 ? AlgorithmTypes2.CIEDE2000 : arguments[1];
          babelHelpers.classCallCheck(this, ColorClassifier3);
          this.setPalette(palette);
          this.setAlgorithmType(algorithmType);
        }
        babelHelpers.createClass(ColorClassifier3, [{
          key: "setPalette",
          value: function setPalette(palette) {
            if (!Array.isArray(palette)) {
              ColorClassifier3.throwError("palette is should be a Array.");
            }
            this.palette = palette.map(function(c) {
              return new Color(c);
            });
          }
        }, {
          key: "getPalette",
          value: function getPalette() {
            return this.palette;
          }
        }, {
          key: "setAlgorithmType",
          value: function setAlgorithmType(algorithmType) {
            if (!AlgorithmTypes2.hasOwnProperty(algorithmType)) {
              ColorClassifier3.throwError(algorithmType + " is an undefined algorithm type.");
            }
            this.algorithmType = algorithmType;
          }
        }, {
          key: "getAlgorithmType",
          value: function getAlgorithmType() {
            return this.algorithmType;
          }
        }, {
          key: "classify",
          value: function classify(value) {
            var format = arguments.length <= 1 || arguments[1] === void 0 ? "rgb" : arguments[1];
            var palette = this.palette;
            var algorithmType = this.algorithmType;
            var color = new Color(value);
            var array = [];
            palette.forEach(function(paletteColor) {
              array.push({
                distance: ColorDiff.diff(algorithmType, paletteColor, color),
                color: format === "raw" ? paletteColor : paletteColor[format]
              });
            });
            return minBy(array, "distance").color;
          }
        }, {
          key: "classifyFromArray",
          value: function classifyFromArray(colors) {
            var _this = this;
            var format = arguments.length <= 1 || arguments[1] === void 0 ? "rgb" : arguments[1];
            var results = [];
            var array = [];
            colors.forEach(function(value) {
              var color = new Color(value);
              var palette = _this.classify(color.rgb, "raw");
              array.push({ palette, color });
            });
            array.forEach(function(obj) {
              var palette = obj.palette;
              var color = obj.color;
              var _results$filter = results.filter(function(o) {
                return equal(o.palette, palette[format]);
              });
              var _results$filter2 = babelHelpers.slicedToArray(_results$filter, 1);
              var paletteColor = _results$filter2[0];
              if (!paletteColor) {
                results.push({
                  palette: palette[format],
                  colors: [color[format]]
                });
              } else {
                paletteColor.colors.push(color[format]);
              }
            });
            return results;
          }
        }]);
        return ColorClassifier3;
      })();
      ColorClassifier2.Palette = Palette2;
      ColorClassifier2.AlgorithmTypes = AlgorithmTypes2;
      return ColorClassifier2;
    });
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ZoteroLibraryPlugin
});
module.exports = __toCommonJS(main_exports);

// src/debug-log.ts
var DebugLog = class {
  constructor(enabled) {
    this.enabled = enabled;
    this.lines = [];
  }
  log(value) {
    if (this.enabled) this.lines.push(typeof value === "string" ? value : JSON.stringify(value));
  }
  downloadLog() {
    if (!this.enabled) return;
    const url = URL.createObjectURL(new Blob([this.lines.join("\n")], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "zotero-library-debug.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
};

// src/bib-data.ts
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function text(value) {
  return typeof value === "string" ? value : "";
}
function numeric(value) {
  return typeof value === "number" ? value : Number(value) || 0;
}
function records(value) {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}
function strings(value) {
  return Array.isArray(value) ? value.map((value2) => String(value2)) : [];
}
function createReference(value = {}) {
  var _a;
  const creators = records(value.creators).map((creator) => ({
    creatorType: text(creator.creatorType),
    ...typeof creator.firstName === "string" ? { firstName: creator.firstName } : {},
    ...typeof creator.lastName === "string" ? { lastName: creator.lastName } : {},
    ...typeof creator.name === "string" ? { name: creator.name } : {}
  }));
  const tags = Array.isArray(value.tags) ? value.tags.map((tag) => ({ tag: typeof tag === "string" ? tag : isRecord(tag) ? text(tag.tag) : "" })).filter((tag) => tag.tag) : [];
  return {
    ...value,
    authorKey: text(value.authorKey),
    authorKeyInitials: text(value.authorKeyInitials),
    authorKeyFullName: text(value.authorKeyFullName),
    id: numeric(value.id),
    itemID: typeof value.itemID === "string" ? value.itemID : numeric((_a = value.itemID) != null ? _a : value.id),
    citationKey: text(value.citationKey),
    citeKey: text(value.citeKey),
    year: text(value.year),
    citationInLine: text(value.citationInLine),
    citationInLineInitials: text(value.citationInLineInitials),
    citationInLineFullName: text(value.citationInLineFullName),
    citationShort: text(value.citationShort),
    citationFull: text(value.citationFull),
    itemType: text(value.itemType),
    inlineReference: text(value.inlineReference),
    date: text(value.date),
    dateModified: text(value.dateModified),
    dateAdded: text(value.dateAdded),
    itemKey: text(value.itemKey),
    title: text(value.title),
    publicationTitle: text(value.publicationTitle),
    volume: typeof value.volume === "number" ? value.volume : text(value.volume),
    issue: typeof value.issue === "number" ? value.issue : text(value.issue),
    pages: text(value.pages),
    creators,
    file: text(value.file),
    filePath: text(value.filePath),
    zoteroReaderLink: text(value.zoteroReaderLink),
    localLibrary: text(value.localLibrary),
    localLibraryLink: text(value.localLibraryLink),
    select: text(value.select),
    uri: text(value.uri),
    url: text(value.url),
    attachments: records(value.attachments).map((attachment) => ({
      dateAdded: text(attachment.dateAdded),
      dateModified: text(attachment.dateModified),
      itemType: text(attachment.itemType),
      path: text(attachment.path),
      relations: strings(attachment.relations),
      select: text(attachment.select),
      tags: strings(attachment.tags),
      title: text(attachment.title),
      uri: text(attachment.uri),
      contentType: text(attachment.contentType)
    })),
    notes: records(value.notes).map((note) => ({
      dateAdded: text(note.dateAdded),
      dateModified: text(note.dateModified),
      itemType: text(note.itemType),
      key: text(note.key),
      note: text(note.note),
      parentItem: text(note.parentItem),
      relations: strings(note.relations),
      tags: strings(note.tags),
      uri: text(note.uri),
      version: numeric(note.version)
    })),
    tags,
    zoteroTags: strings(value.zoteroTags)
  };
}
function parseBibData(json) {
  const value = JSON.parse(json);
  if (!isRecord(value) || !Array.isArray(value.items)) throw new Error("Expected a Better BibTeX library with an items array");
  const items = value.items.filter(isRecord).filter((item) => typeof item.citationKey === "string" && !!item.citationKey).map(createReference);
  const collections = {};
  if (isRecord(value.collections) || Array.isArray(value.collections)) {
    for (const [key, collection] of Object.entries(value.collections)) {
      if (!isRecord(collection)) continue;
      const parsed = { key: text(collection.key) || key, name: text(collection.name), parent: text(collection.parent), items: strings(collection.items), collections: strings(collection.collections) };
      Object.defineProperty(collections, key, { value: parsed, enumerable: true });
    }
  }
  return { items, collections, config: isRecord(value.config) ? value.config : void 0, version: text(value.version) };
}
function createAnnotationElements(values) {
  return {
    annotationType: "",
    citeKey: "",
    commentText: "",
    commentFormatted: "",
    commentFormattedNoPrepend: "",
    highlightText: "",
    highlightColour: "",
    highlightFormatted: "",
    highlightFormattedNoPrepend: "",
    inlineTagsText: "",
    inlineTagsArray: [],
    inlineTagsFormatted: "",
    inlineTagsFormattedNoPrepend: "",
    indexNote: void 0,
    rowOriginal: "",
    rowEdited: "",
    foundOld: false,
    positionOld: void 0,
    extractionSource: "",
    colourTemplate: "",
    colourTemplateFormatted: "",
    colourTemplateNoPrepend: "",
    colourTextBefore: "",
    colourTextAfter: "",
    imagePath: "",
    pagePDF: 0,
    pageLabel: 0,
    attachmentURI: "",
    zoteroBackLink: "",
    annotationKey: "",
    ...values
  };
}

// src/desktop-files.ts
var import_obsidian2 = require("obsidian");

// src/utils.ts
var import_obsidian = require("obsidian");

// src/constants.ts
var templatePlain = "# {{title}}\n\n## Metadata\n- **CiteKey**: {{citekey}}\n - **Type**: {{itemType}}\n - **Title**: {{title}}, \n - **Author**: {{author}};  \n- **Editor**: {{editor}};  \n- **Translator**: {{translator}}\n- **Publisher**: {{publisher}},\n- **Location**: {{place}},\n- **Series**: {{series}}\n- **Series Number**: {{seriesNumber}}\n- **Journal**: {{publicationTitle}}, \n- **Volume**: {{volume}},\n- **Issue**: {{issue}}\n- **Pages**: {{pages}}\n- **Year**: {{year}} \n- **DOI**: {{DOI}}\n- **ISSN**: {{ISSN}}\n- **ISBN**: {{ISBN}}\n\n## Abstract\n{{abstractNote}}\n## Files and Links\n- **Url**: {{url}}\n- **Uri**: {{uri}}\n- **Eprint**: {{eprint}}\n- **File**: {{file}}\n- **Local Library**: [Zotero]({{localLibraryLink}})\n\n## Tags and Collections\n- **Keywords**: {{keywordsAll}}\n- **Collections**: {{collectionsParent}}\n\n\n----\n\n## Comments\n{{UserNotes}}\n\n\n----\n\n## Extracted Annotations\n{{PDFNotes}}";
var templateAdmonition = "# {{title}}\n\n``` ad-info\ntitle: Metadata\n- **CiteKey**: {{citekey}}\n- **Type**: {{itemType}}\n- **Author**: {{author}}\n- **Editor**: {{editor}}\n- **Translator**: {{translator}}\n- **Publisher**: {{publisher}}\n- **Location**: {{place}}\n- **Series**: {{series}}\n- **Series Number**: {{seriesNumber}}\n- **Journal**: {{publicationTitle}}\n- **Volume**: {{volume}}\n- **Issue**: {{issue}}\n- **Pages**: {{pages}}\n- **Year**: {{year}} \n- **DOI**: {{DOI}}\n- **ISSN**: {{ISSN}}\n- **ISBN**: {{ISBN}}\n```\n```ad-quote\ntitle: Abstract\n{{abstractNote}}\n```\n```ad-abstract\ntitle: Files and Links\n- **Url**: {{url}}\n- **Uri**: {{uri}}\n- **Eprint**: {{eprint}}\n- **File**: {{file}}\n- **Local Library**: [Zotero]({{localLibraryLink}})\n```\n```ad-note\ntitle: Tags and Collections\n- **Keywords**: {{keywordsAll}}\n- **Collections**: {{collectionsParent}}\n```\n\n----\n\n## Comments\n{{UserNotes}}\n\n\n----\n\n## Extracted Annotations\n{{PDFNotes}}";
var ZOTERO_LIBRARY_VIEW_TYPE = "zotero-lib-view";
var ZOTERO_LIBRARY_HEADER_BUTTON_ID = "zotero-library-header-button";
var BUILT_IN_LIBRARY_COLUMNS = ["Obsidian Notes", "Year", "Type", "Title", "Authors", "Publication", "Tags", "Collections", "Parent Collections", "Added", "Actions"];
var DEFAULT_LIBRARY_VIEW_COLUMNS = ["Obsidian Notes", "Year", "Title", "Publication", "Tags", "Added", "Action|Actions"];
var EXCLUDED_DYNAMIC_LIBRARY_FIELDS = /* @__PURE__ */ new Set(["citationKey", "date", "itemType", "title", "creators", "publicationTitle", "tags", "dateAdded", "url", "select", "uri"]);
var DEFAULT_SETTINGS = {
  bibPath: "",
  autoImportOnBibChange: false,
  libraryViewColumns: DEFAULT_LIBRARY_VIEW_COLUMNS.slice(),
  libraryViewSortColumn: "Added",
  libraryViewSortDirection: "desc",
  templateContent: templatePlain,
  templatePath: "",
  templateType: "Admonition",
  lastUpdateDate: /* @__PURE__ */ new Date("1995-12-17T03:24:00"),
  updateLibrary: "Only update existing notes",
  exportPath: "",
  exportTitle: "{{citeKey}}",
  missingfield: "Leave placeholder",
  saveManualEdits: "Save Entire Note",
  saveManualEditsStart: "",
  saveManualEditsEnd: "",
  imagesImport: true,
  imagesCopy: false,
  imagesPath: "",
  imagesCommentPosition: "Above the image",
  keyMergeAbove: "+",
  keyCommentPrepend: "%",
  commentPrependDefault: false,
  TagBeginningConfig: "Tag: ",
  TagEndConfig: "",
  TagDividerConfig: "; ",
  keyH1: "#",
  keyH2: "##",
  keyH3: "###",
  keyH4: "####",
  keyH5: "#####",
  keyH6: "######",
  keyKeyword: "=",
  keyTask: "todo",
  isHighlightItalic: true,
  isHighlightBold: false,
  isHighlightHighlighted: false,
  isHighlightColoured: false,
  isHighlightBullet: true,
  isHighlightBlockquote: false,
  isHighlightQuote: true,
  highlightCustomTextBefore: "",
  highlightCustomTextAfter: "",
  isCommentItalic: false,
  isCommentBold: true,
  isCommentHighlighted: false,
  isCommentColoured: false,
  isCommentBullet: false,
  isCommentBlockquote: true,
  isCommentQuote: false,
  commentCustomTextBefore: "",
  commentCustomTextAfter: "",
  isTagItalic: false,
  isTagBold: false,
  isTagHighlighted: false,
  isTagColoured: false,
  isTagBullet: false,
  isTagBlockquote: false,
  isTagQuote: false,
  isTagHash: true,
  tagCustomTextBefore: "#",
  tagCustomTextAfter: "",
  tagCustomTextBeforeFirst: "",
  tagCustomTextAfterLast: "",
  isDoubleSpaced: true,
  highlightExportTemplate: "{{highlight}} {{comment}} {{tag}}",
  colourYellowText: "{{highlight}}",
  colourPurpleText: "{{highlight}}",
  colourRedText: "{{highlight}}",
  colourGreenText: "{{highlight}}",
  colourBlueText: "{{highlight}}",
  colourBlackText: "{{highlight}}",
  colourWhiteText: "{{highlight}}",
  colourGrayText: "{{highlight}}",
  colourOrangeText: "{{highlight}}",
  colourCyanText: "{{highlight}}",
  colourMagentaText: "{{highlight}}",
  colourCustomHexValue: "#999999",
  colourCustomHexText: "{{highlight}}",
  multipleFieldsDivider: ";",
  nameFormat: "{{lastName}}, {{firstName}}",
  highlightCitationsFormat: "Author, year, page number",
  highlightCitationsLink: true,
  debugMode: false,
  zoteroStoragePathManual: "",
  missingfieldreplacement: "NA"
};
var TEMPLATE_REG = /\{\{[^}]+\}\}/g;
var TEMPLATE_BRACKET_REG = /\[\[\{\{[^}]+\}\}\]\]/g;

// src/utils.ts
function replaceAllTemplates(entriesArray, note, selectedEntry) {
  let copy = note.slice();
  for (let z = 0; z < entriesArray.length; z++) {
    const KW = entriesArray[z];
    const KW_Brackets = "{{" + KW + "}}";
    copy = replaceTemplate(
      copy,
      KW_Brackets,
      `${selectedEntry[KW]}`
    );
  }
  return copy;
}
function escapeRegExp(stringAdd) {
  return stringAdd.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}
function replaceTemplate(stringAdd, find, replace) {
  return stringAdd.replace(new RegExp(escapeRegExp(find), "g"), () => replace);
}
var makeWiki = (str) => "[[" + str + "]]";
var makeQuotes = (str) => '"' + str + '"';
var makeTags = (str) => "#" + str;
var createAuthorKey = (creators) => {
  const authorKey = [];
  const editorKey = [];
  let authorKeyFixed = "";
  let editorKeyFixed = "";
  for (let creatorindex = 0; creatorindex < creators.length; creatorindex++) {
    const creator = creators[creatorindex];
    if (creator.creatorType === "author") {
      if (Object.prototype.hasOwnProperty.call(creator, "name")) {
        authorKey.push(creator.name);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.lastName);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && !Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.lastName);
      } else if (!Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.firstName);
      }
    } else if (creator.creatorType === "editor") {
      if (Object.prototype.hasOwnProperty.call(creator, "name")) {
        editorKey.push(creator.name);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.lastName);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && !Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.lastName);
      } else if (!Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.firstName);
      }
    }
  }
  if (authorKey.length == 1) {
    authorKeyFixed = authorKey[0];
  }
  if (authorKey.length == 2) {
    authorKeyFixed = authorKey[0] + " and " + authorKey[1];
  }
  if (authorKey.length == 3) {
    authorKeyFixed = authorKey[0] + ", " + authorKey[1] + " and " + authorKey[2];
  }
  if (authorKey.length > 3) {
    authorKeyFixed = authorKey[0] + " et al.";
  }
  if (authorKey.length > 0) {
    return authorKeyFixed;
  }
  if (editorKey.length == 1) {
    editorKeyFixed = editorKey[0];
  }
  if (editorKey.length == 2) {
    editorKeyFixed = editorKey[0] + " and " + editorKey[1];
  }
  if (editorKey.length == 3) {
    editorKeyFixed = editorKey[0] + ", " + editorKey[1] + " and " + editorKey[2];
  }
  if (authorKey.length > 3) {
    editorKeyFixed = editorKey[0] + " et al.";
  }
  if (editorKey.length > 0) {
    return editorKeyFixed;
  }
};
var createAuthorKeyFullName = (creators) => {
  const authorKey = [];
  const authorKeyReverse = [];
  const editorKey = [];
  const editorKeyReverse = [];
  let authorKeyFixed = "";
  let editorKeyFixed = "";
  for (let creatorindex = 0; creatorindex < creators.length; creatorindex++) {
    const creator = creators[creatorindex];
    if (creator.creatorType === "author") {
      if (Object.prototype.hasOwnProperty.call(creator, "name")) {
        authorKey.push(creator.name);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.lastName + ", " + creator.firstName);
        authorKeyReverse.push(creator.firstName + " " + creator.lastName);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && !Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.lastName);
      } else if (!Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.firstName);
      }
    } else if (creator.creatorType === "editor") {
      if (Object.prototype.hasOwnProperty.call(creator, "name")) {
        editorKey.push(creator.name);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.lastName + ", " + creator.firstName);
        editorKeyReverse.push(creator.firstName + " " + creator.lastName);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && !Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.lastName);
      } else if (!Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.firstName);
      }
    }
  }
  if (authorKey.length == 1) {
    authorKeyFixed = authorKey[0];
  }
  if (authorKey.length == 2) {
    authorKeyFixed = authorKey[0] + " and " + authorKeyReverse[1];
  }
  if (authorKey.length == 3) {
    authorKeyFixed = authorKey[0] + ", " + authorKeyReverse[1] + " and " + authorKeyReverse[2];
  }
  if (authorKey.length > 3) {
    authorKeyFixed = authorKey[0] + " et al.";
  }
  if (authorKey.length > 0) {
    return authorKeyFixed;
  }
  if (editorKey.length == 1) {
    editorKeyFixed = editorKey[0];
  }
  if (editorKey.length == 2) {
    editorKeyFixed = editorKey[0] + " and " + editorKeyReverse[1];
  }
  if (editorKey.length == 3) {
    editorKeyFixed = editorKey[0] + ", " + editorKeyReverse[1] + " and " + editorKeyReverse[2];
  }
  if (authorKey.length > 3) {
    editorKeyFixed = editorKey[0] + " et al.";
  }
  if (editorKey.length > 0) {
    return editorKeyFixed;
  }
};
var createAuthorKeyInitials = (creators) => {
  const authorKey = [];
  const editorKey = [];
  let authorKeyFixed = "";
  let editorKeyFixed = "";
  for (let creatorindex = 0; creatorindex < creators.length; creatorindex++) {
    const creator = creators[creatorindex];
    if (creator.creatorType === "author") {
      if (Object.prototype.hasOwnProperty.call(creator, "name")) {
        authorKey.push(creator.name);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.lastName + ", " + creator.firstName.substring(0, 1) + ".");
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && !Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.lastName);
      } else if (!Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        authorKey.push(creator.firstName);
      }
    } else if (creator.creatorType === "editor") {
      if (Object.prototype.hasOwnProperty.call(creator, "name")) {
        editorKey.push(creator.name);
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.lastName + ", " + creator.firstName.substring(0, 1) + ".");
      } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && !Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.lastName);
      } else if (!Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
        editorKey.push(creator.firstName);
      }
    }
  }
  if (authorKey.length == 1) {
    authorKeyFixed = authorKey[0];
  }
  if (authorKey.length == 2) {
    authorKeyFixed = authorKey[0] + " and " + authorKey[1];
  }
  if (authorKey.length == 3) {
    authorKeyFixed = authorKey[0] + ", " + authorKey[1] + " and " + authorKey[2];
  }
  if (authorKey.length > 3) {
    authorKeyFixed = authorKey[0] + " et al.";
  }
  if (authorKey.length > 0) {
    return authorKeyFixed;
  }
  if (editorKey.length == 1) {
    editorKeyFixed = editorKey[0];
  }
  if (editorKey.length == 2) {
    editorKeyFixed = editorKey[0] + " and " + editorKey[1];
  }
  if (editorKey.length == 3) {
    editorKeyFixed = editorKey[0] + ", " + editorKey[1] + " and " + editorKey[2];
  }
  if (authorKey.length > 3) {
    editorKeyFixed = editorKey[0] + " et al.";
  }
  if (editorKey.length > 0) {
    return editorKeyFixed;
  }
};
function removeQuoteFromStart(quote, annotation) {
  let copy = annotation.slice();
  while (copy.charAt(0) === quote) copy = copy.substring(1);
  return copy;
}
function removeQuoteFromEnd(quote, annotation) {
  let copy = annotation.slice();
  while (copy[copy.length - 1] === quote)
    copy = copy.substring(0, copy.length - 1);
  return copy;
}
function orderByDateModified(a, b) {
  if (a.dateModified > b.dateModified) {
    return -1;
  }
  if (a.dateModified < b.dateModified) {
    return 1;
  }
  return 0;
}
function formatCreatorsName(creator, nameCustom) {
  if (Object.prototype.hasOwnProperty.call(creator, "name")) {
    nameCustom = creator.name;
    nameCustom = nameCustom.trim();
    return nameCustom;
  } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
    nameCustom = nameCustom.replace("{{lastName}}", creator.lastName);
    nameCustom = nameCustom.replace("{{firstName}}", creator.firstName);
    const getInitials = function(string) {
      const names = string.split(" ");
      let initials = names[0].substring(0, 1).toUpperCase() + ".";
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase() + ".";
      }
      return initials;
    };
    nameCustom = nameCustom.replace("{{firstNameInitials}}", getInitials(creator.firstName));
    nameCustom = nameCustom.trim();
    return nameCustom;
  } else if (Object.prototype.hasOwnProperty.call(creator, "lastName") && !Object.prototype.hasOwnProperty.call(creator, "firstName")) {
    nameCustom = nameCustom.replace("{{lastName}}", creator.lastName);
    nameCustom = nameCustom.replace("; {{firstName}}", creator.firstName);
    nameCustom = nameCustom.replace(", {{firstName}}", creator.firstName);
    nameCustom = nameCustom.replace("{{firstName}}", "");
    nameCustom = nameCustom.trim();
    return nameCustom;
  } else if (!Object.prototype.hasOwnProperty.call(creator, "lastName") && Object.prototype.hasOwnProperty.call(creator, "firstName")) {
    nameCustom = nameCustom.replace("; {{lastName}}", creator.firstName);
    nameCustom = nameCustom.replace(", {{lastName}}", creator.firstName);
    nameCustom = nameCustom.replace("{{lastName}}", "");
    nameCustom = nameCustom.replace("{{firstName}}", creator.firstName);
    nameCustom = nameCustom.trim();
    return nameCustom;
  }
}
var createCreatorList = (creators, typeCreator, note, divider, nameFormat) => {
  const creatorList = [];
  for (let creatorindex = 0; creatorindex < creators.length; creatorindex++) {
    const creator = creators[creatorindex];
    if (creator.creatorType === typeCreator) {
      creatorList.push(formatCreatorsName(creator, nameFormat));
    }
  }
  const creatorListBracket = creatorList.map(makeWiki);
  const creatorListQuotes = creatorList.map(makeQuotes);
  if (divider.slice(-1) !== " ") {
    divider = divider + " ";
  }
  if (creatorList.length == 0) {
    return note;
  } else {
    note = replaceTemplate(
      note,
      `[[{{${typeCreator}}}]]`,
      creatorListBracket.join(divider)
    );
    note = replaceTemplate(
      note,
      `"{{${typeCreator}}}"`,
      creatorListQuotes.join(divider)
    );
    note = replaceTemplate(
      note,
      `{{${typeCreator}}}`,
      creatorList.join(divider)
    );
    return note;
  }
};
var createCreatorAllList = (creators, note, divider, nameFormat) => {
  const creatorList = [];
  for (let creatorindex = 0; creatorindex < creators.length; creatorindex++) {
    const creator = creators[creatorindex];
    creatorList.push(formatCreatorsName(creator, nameFormat));
  }
  const creatorListBracket = creatorList.map(makeWiki);
  const creatorListQuotes = creatorList.map(makeQuotes);
  if (divider.slice(-1) !== " ") {
    divider = divider + " ";
  }
  if (creatorList.length == 0) {
    return note;
  } else {
    note = replaceTemplate(
      note,
      `[[{{creator}}]]`,
      creatorListBracket.join(divider)
    );
    note = replaceTemplate(
      note,
      `"{{creator}}"`,
      creatorListQuotes.join(divider)
    );
    note = replaceTemplate(note, `{{creator}}`, creatorList.join(divider));
    note = replaceTemplate(note, `{{Creator}}`, creatorList.join(divider));
    return note;
  }
};
function replaceMissingFields(note, missingfield, missingfieldreplacement) {
  let copy = note.slice();
  if (missingfield === "Replace with custom text") {
    copy = copy.replace(TEMPLATE_BRACKET_REG, missingfieldreplacement).trim();
    copy = copy.replace(TEMPLATE_REG, missingfieldreplacement).trim();
  } else if (missingfield === "Remove (entire row)") {
    const lines = copy.split(/\r?\n/);
    for (let j = 0; j < lines.length; j++) {
      if (lines[j].match(TEMPLATE_REG)) {
        lines.splice(j, 1);
        j--;
      }
    }
    copy = lines.join("\n");
  }
  copy = copy.replace("```ad-quote\ntitle: Abstract\n```\n", "");
  copy = copy.replace(
    "```ad-abstract\ntitle: Files and Links\n```\n",
    ""
  );
  copy = copy.replace(
    "```ad-note\ntitle: Tags and Collections\n```\n",
    ""
  );
  copy = copy.replace(
    "## Abstract\n\n## Files and Links\n",
    "## Files and Links\n"
  );
  copy = copy.replace(
    "## Files and Links\n\n## Tags and Collections\n",
    "## Tags and Collections\n"
  );
  copy = copy.replace("## Tags and Collections\n\n", "\n");
  return copy;
}
function localFileURL(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  if (/^file:\/\//i.test(normalized)) {
    try {
      return new URL(normalized).href.replace(/[()]/g, (c) => c === "(" ? "%28" : "%29");
    } catch (e) {
      return "";
    }
  }
  const encode = (value) => encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
  const encoded = normalized.split("/").map((part, index) => index === 0 && /^[A-Za-z]:$/.test(part) ? part : encode(part)).join("/");
  if (normalized.startsWith("//")) return "file:" + encoded;
  if (normalized.startsWith("/")) return "file://" + encoded;
  if (/^[A-Za-z]:\//.test(normalized)) return "file:///" + encoded;
  return encoded;
}
function attachmentLinks(reference, usePathLabel) {
  const links = [];
  for (const attachment of reference.attachments || []) {
    if (attachment.itemType && attachment.itemType !== "attachment") continue;
    if (typeof attachment.path !== "string" || !attachment.path.trim()) continue;
    const target = localFileURL(attachment.path);
    if (!target) continue;
    const label = (usePathLabel ? attachment.path : attachment.title || attachment.path.split(/[\\/]/).pop() || "Attachment").replace(/\\/g, "\\\\").replace(/([[\]])/g, "\\$1").replace(/[\r\n]+/g, " ");
    links.push(`[${label}](${target})`);
  }
  return links.join("; ");
}
function createLocalFileLink(reference) {
  return attachmentLinks(reference, false) || "{{localFile}}";
}
function createLocalFilePathLink(reference) {
  return attachmentLinks(reference, true) || "{{localFilePathLink}}";
}
function createAttachmentSelectLink(reference) {
  return (reference.attachments || []).filter((a) => (!a.itemType || a.itemType === "attachment") && a.select).map((a) => `[${(a.title || "Attachment").replace(/([[\]])/g, "\\$1")}](${encodeURI(a.select)})`).join("; ") || "{{filePath}}";
}
function attachmentTemplateFields(reference) {
  const localFile = createLocalFileLink(reference);
  return {
    ...reference,
    file: reference.file || (localFile === "{{localFile}}" ? "{{file}}" : localFile),
    localFile,
    localFilePathLink: createLocalFilePathLink(reference),
    filePath: createAttachmentSelectLink(reference),
    zoteroReaderLink: createZoteroReaderPathLink(reference),
    zoteroReaderLinkYamlList: createZoteroReaderPathLinkYamlList(reference)
  };
}
function createZoteroReaderPathLink(reference) {
  const selected = createAttachmentSelectLink(reference);
  return selected === "{{filePath}}" ? "{{zoteroReaderLink}}" : selected.replace(/zotero:\/\/select\//g, "zotero://open-pdf/");
}
function createZoteroReaderPathLinkYamlList(reference) {
  const readerURIs = /* @__PURE__ */ new Set();
  for (const attachment of reference.attachments || []) {
    if (!attachment || attachment.itemType && attachment.itemType !== "attachment") continue;
    if (typeof attachment.select !== "string" || !attachment.select.trim()) continue;
    try {
      const uri = new URL(attachment.select.trim());
      if (uri.protocol !== "zotero:" || !["select", "open-pdf"].includes(uri.host)) continue;
      if (uri.username || uri.password) continue;
      if (!/^\/(?:library|groups\/\d+)\/items\/[A-Za-z0-9]+$/.test(uri.pathname)) continue;
      readerURIs.add(uri.href.replace(/^zotero:\/\/select\//, "zotero://open-pdf/"));
    } catch (e) {
    }
  }
  return readerURIs.size ? Array.from(readerURIs, (uri) => `  - ${JSON.stringify(uri)}`).join("\n") : "  []";
}
function createNoteTitle(selectedEntry, exportTitle, exportPath) {
  exportTitle = exportTitle.replace("{{citeKey}}", selectedEntry.citationKey);
  exportTitle = exportTitle.replace("{{citationKey}}", selectedEntry.citationKey);
  exportTitle = exportTitle.replace("{{citationkey}}", selectedEntry.citationKey);
  exportTitle = exportTitle.replace("{{citekey}}", selectedEntry.citationKey);
  exportTitle = exportTitle.replace("{{citekey}}", selectedEntry.citationKey);
  exportTitle = exportTitle.replace("{{title}}", selectedEntry.title);
  exportTitle = exportTitle.replace("{{author}}", selectedEntry.authorKey);
  exportTitle = exportTitle.replace("{{authors}}", selectedEntry.authorKey);
  exportTitle = exportTitle.replace("{{authorInitials}}", selectedEntry.authorKeyInitials);
  exportTitle = exportTitle.replace("{{authorsInitials}}", selectedEntry.authorKeyInitials);
  exportTitle = exportTitle.replace("{{authorFullName}}", selectedEntry.authorKeyFullName);
  exportTitle = exportTitle.replace("{{authorsFullName}}", selectedEntry.authorKeyFullName);
  exportTitle = exportTitle.replace("{{year}}", selectedEntry.year);
  exportTitle = exportTitle.replace("{{date}}", selectedEntry.year);
  exportTitle = exportTitle.replace(/[/\\?%*:|"<>]/g, "");
  return vaultRelativePath(`${exportPath}/${exportTitle}.md`);
}
function replaceTagList(selectedEntry, arrayExtractedKeywords, metadata, divider) {
  selectedEntry.zoteroTags = [];
  if (selectedEntry.tags.length > 0) {
    for (let indexTag = 0; indexTag < selectedEntry.tags.length; indexTag++) {
      selectedEntry.zoteroTags.push(selectedEntry.tags[indexTag].tag);
    }
  }
  if (divider.slice(-1) !== " ") {
    divider = divider + " ";
  }
  const tagsZotero = selectedEntry.zoteroTags.sort();
  const tagsPDF = arrayExtractedKeywords.sort();
  const tagsCombined = tagsZotero.concat(tagsPDF).sort();
  if (tagsZotero.length > 0) {
    const tagsZoteroBracket = tagsZotero.map(makeWiki);
    metadata = replaceTemplate(
      metadata,
      `[[{{keywordsZotero}}]]`,
      String(tagsZoteroBracket.join(divider))
    );
    const tagsZoteroQuotes = tagsZotero.map(makeQuotes);
    metadata = replaceTemplate(
      metadata,
      `"{{keywordsZotero}}"`,
      String(tagsZoteroQuotes.join(divider))
    );
    const tagsZoteroTags = tagsZotero.map(makeTags);
    metadata = replaceTemplate(
      metadata,
      `#{{keywordsZotero}}`,
      String(tagsZoteroTags.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `{{keywordsZotero}}`,
      String(tagsZotero.join(divider))
    );
  }
  if (tagsPDF.length > 0) {
    const tagsPDFBracket = tagsPDF.map(makeWiki);
    metadata = replaceTemplate(
      metadata,
      `[[{{keywordsPDF}}]]`,
      String(tagsPDFBracket.join(divider))
    );
    const tagsPDFQuotes = tagsPDF.map(makeQuotes);
    metadata = replaceTemplate(
      metadata,
      `"{{keywordsPDF}}"`,
      String(tagsPDFQuotes.join(divider))
    );
    const tagsPDFTags = tagsPDF.map(makeTags);
    metadata = replaceTemplate(
      metadata,
      `#{{keywordsPDF}}`,
      String(tagsPDFTags.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `{{keywordsPDF}}`,
      String(tagsPDF.join(divider))
    );
  }
  if (tagsCombined.length > 0) {
    const tagsCombinedBracket = tagsCombined.map(makeWiki);
    metadata = replaceTemplate(
      metadata,
      `[[{{keywords}}]]`,
      String(tagsCombinedBracket.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `[[{{keywordsAll}}]]`,
      String(tagsCombinedBracket.join(divider))
    );
    const tagsCombinedQuotes = tagsCombined.map(makeQuotes);
    metadata = replaceTemplate(
      metadata,
      `"{{keywordsAll}}"`,
      String(tagsCombinedQuotes.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `"{{keywords}}"`,
      String(tagsCombinedQuotes.join(divider))
    );
    const tagsCombinedTags = tagsCombined.map(makeTags);
    metadata = replaceTemplate(
      metadata,
      `#{{keywordsAll}}`,
      String(tagsCombinedTags.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `#{{keywords}}`,
      String(tagsCombinedTags.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `{{keywordsAll}}`,
      String(tagsCombined.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `{{keywords}}`,
      String(tagsCombined.join(divider))
    );
    metadata = replaceTemplate(
      metadata,
      `{{keywordsYamlWikiList}}`,
      String(tagsCombined.map((tag) => `- "${makeWiki(tag)}"`).join("\n"))
    );
  }
  if (selectedEntry.zoteroTags.length == 0) {
    metadata = metadata.replace("# Tags\n", "");
    metadata = metadata.replace("## Tags\n", "");
    metadata = metadata.replace("### Tags\n", "");
  }
  return metadata;
}
async function openSelectedNote(app, selectedEntry, exportTitle, exportPath) {
  const file = app.vault.getAbstractFileByPath(createNoteTitle(selectedEntry, exportTitle, exportPath));
  if (file instanceof import_obsidian.TFile) await app.workspace.getLeaf(false).openFile(file);
}
function parseCiteKeyFromNoteName(noteName, format) {
  var _a, _b;
  const token = /\{\{(?:citekey|citationkey)\}\}/i.exec(format);
  if (!token) return null;
  const surroundingPattern = (part) => part.split(/\{\{[^}]+\}\}/).map(escapeRegExp).join(".*?");
  const before = surroundingPattern(format.slice(0, token.index));
  const after = surroundingPattern(format.slice(token.index + token[0].length));
  return (_b = (_a = new RegExp(`^${before}(.+?)${after}$`).exec(noteName)) == null ? void 0 : _a[1]) != null ? _b : null;
}
function vaultRelativePath(path) {
  const relative = path.replace(/\\/g, "/").replace(/^\/+/, "");
  if (/^[A-Za-z]:/.test(relative) || relative.split("/").includes("..")) throw new Error("Path must stay inside the vault");
  return (0, import_obsidian.normalizePath)(relative);
}
function decodeLegacyEscapes(value) {
  return value.replace(/%u([0-9a-f]{4})|%([0-9a-f]{2})/gi, (_match, unicode, byte) => {
    var _a;
    return String.fromCharCode(parseInt((_a = unicode != null ? unicode : byte) != null ? _a : "0", 16));
  });
}

// src/desktop-files.ts
async function copyExternalImage(app, source, destination) {
  if (!import_obsidian2.Platform.isDesktopApp) {
    new import_obsidian2.Notice("Copying images from Zotero storage requires the desktop app");
    return false;
  }
  const path = vaultRelativePath(destination);
  if (await app.vault.adapter.exists(path)) return true;
  const fs = await Promise.resolve().then(() => __toESM(require("fs")));
  const bytes = await fs.promises.readFile(source);
  const folder = path.slice(0, path.lastIndexOf("/"));
  if (folder && !await app.vault.adapter.exists(folder)) await app.vault.adapter.mkdir(folder);
  await app.vault.adapter.writeBinary(path, Uint8Array.from(bytes).buffer);
  return true;
}

// src/main.ts
var import_color_classifier = __toESM(require_color_classifier());
var import_obsidian5 = require("obsidian");

// node_modules/turndown/lib/turndown.browser.es.js
function extend(destination) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) destination[key] = source[key];
    }
  }
  return destination;
}
function repeat(character, count) {
  return Array(count + 1).join(character);
}
function trimLeadingNewlines(string) {
  return string.replace(/^\n*/, "");
}
function trimTrailingNewlines(string) {
  var indexEnd = string.length;
  while (indexEnd > 0 && string[indexEnd - 1] === "\n") indexEnd--;
  return string.substring(0, indexEnd);
}
function trimNewlines(string) {
  return trimTrailingNewlines(trimLeadingNewlines(string));
}
var blockElements = [
  "ADDRESS",
  "ARTICLE",
  "ASIDE",
  "AUDIO",
  "BLOCKQUOTE",
  "BODY",
  "CANVAS",
  "CENTER",
  "DD",
  "DIR",
  "DIV",
  "DL",
  "DT",
  "FIELDSET",
  "FIGCAPTION",
  "FIGURE",
  "FOOTER",
  "FORM",
  "FRAMESET",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "HEADER",
  "HGROUP",
  "HR",
  "HTML",
  "ISINDEX",
  "LI",
  "MAIN",
  "MENU",
  "NAV",
  "NOFRAMES",
  "NOSCRIPT",
  "OL",
  "OUTPUT",
  "P",
  "PRE",
  "SECTION",
  "TABLE",
  "TBODY",
  "TD",
  "TFOOT",
  "TH",
  "THEAD",
  "TR",
  "UL"
];
function isBlock(node) {
  return is(node, blockElements);
}
var voidElements = [
  "AREA",
  "BASE",
  "BR",
  "COL",
  "COMMAND",
  "EMBED",
  "HR",
  "IMG",
  "INPUT",
  "KEYGEN",
  "LINK",
  "META",
  "PARAM",
  "SOURCE",
  "TRACK",
  "WBR"
];
function isVoid(node) {
  return is(node, voidElements);
}
function hasVoid(node) {
  return has(node, voidElements);
}
var meaningfulWhenBlankElements = [
  "A",
  "TABLE",
  "THEAD",
  "TBODY",
  "TFOOT",
  "TH",
  "TD",
  "IFRAME",
  "SCRIPT",
  "AUDIO",
  "VIDEO"
];
function isMeaningfulWhenBlank(node) {
  return is(node, meaningfulWhenBlankElements);
}
function hasMeaningfulWhenBlank(node) {
  return has(node, meaningfulWhenBlankElements);
}
function is(node, tagNames) {
  return tagNames.indexOf(node.nodeName) >= 0;
}
function has(node, tagNames) {
  return node.getElementsByTagName && tagNames.some(function(tagName) {
    return node.getElementsByTagName(tagName).length;
  });
}
var rules = {};
rules.paragraph = {
  filter: "p",
  replacement: function(content) {
    return "\n\n" + content + "\n\n";
  }
};
rules.lineBreak = {
  filter: "br",
  replacement: function(content, node, options) {
    return options.br + "\n";
  }
};
rules.heading = {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: function(content, node, options) {
    var hLevel = Number(node.nodeName.charAt(1));
    if (options.headingStyle === "setext" && hLevel < 3) {
      var underline = repeat(hLevel === 1 ? "=" : "-", content.length);
      return "\n\n" + content + "\n" + underline + "\n\n";
    } else {
      return "\n\n" + repeat("#", hLevel) + " " + content + "\n\n";
    }
  }
};
rules.blockquote = {
  filter: "blockquote",
  replacement: function(content) {
    content = trimNewlines(content).replace(/^/gm, "> ");
    return "\n\n" + content + "\n\n";
  }
};
rules.list = {
  filter: ["ul", "ol"],
  replacement: function(content, node) {
    var parent = node.parentNode;
    if (parent.nodeName === "LI" && parent.lastElementChild === node) {
      return "\n" + content;
    } else {
      return "\n\n" + content + "\n\n";
    }
  }
};
rules.listItem = {
  filter: "li",
  replacement: function(content, node, options) {
    var prefix = options.bulletListMarker + "   ";
    var parent = node.parentNode;
    if (parent.nodeName === "OL") {
      var start = parent.getAttribute("start");
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + ".  ";
    }
    var isParagraph = /\n$/.test(content);
    content = trimNewlines(content) + (isParagraph ? "\n" : "");
    content = content.replace(/\n/gm, "\n" + " ".repeat(prefix.length));
    return prefix + content + (node.nextSibling ? "\n" : "");
  }
};
rules.indentedCodeBlock = {
  filter: function(node, options) {
    return options.codeBlockStyle === "indented" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
  },
  replacement: function(content, node, options) {
    return "\n\n    " + node.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
  }
};
rules.fencedCodeBlock = {
  filter: function(node, options) {
    return options.codeBlockStyle === "fenced" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
  },
  replacement: function(content, node, options) {
    var className = node.firstChild.getAttribute("class") || "";
    var language = (className.match(/language-(\S+)/) || [null, ""])[1];
    var code = node.firstChild.textContent;
    var fenceChar = options.fence.charAt(0);
    var fenceSize = 3;
    var fenceInCodeRegex = new RegExp("^" + fenceChar + "{3,}", "gm");
    var match;
    while (match = fenceInCodeRegex.exec(code)) {
      if (match[0].length >= fenceSize) {
        fenceSize = match[0].length + 1;
      }
    }
    var fence = repeat(fenceChar, fenceSize);
    return "\n\n" + fence + language + "\n" + code.replace(/\n$/, "") + "\n" + fence + "\n\n";
  }
};
rules.horizontalRule = {
  filter: "hr",
  replacement: function(content, node, options) {
    return "\n\n" + options.hr + "\n\n";
  }
};
rules.inlineLink = {
  filter: function(node, options) {
    return options.linkStyle === "inlined" && node.nodeName === "A" && node.getAttribute("href");
  },
  replacement: function(content, node) {
    var href = node.getAttribute("href");
    if (href) href = href.replace(/([()])/g, "\\$1");
    var title = cleanAttribute(node.getAttribute("title"));
    if (title) title = ' "' + title.replace(/"/g, '\\"') + '"';
    return "[" + content + "](" + href + title + ")";
  }
};
rules.referenceLink = {
  filter: function(node, options) {
    return options.linkStyle === "referenced" && node.nodeName === "A" && node.getAttribute("href");
  },
  replacement: function(content, node, options) {
    var href = node.getAttribute("href");
    var title = cleanAttribute(node.getAttribute("title"));
    if (title) title = ' "' + title + '"';
    var replacement;
    var reference;
    switch (options.linkReferenceStyle) {
      case "collapsed":
        replacement = "[" + content + "][]";
        reference = "[" + content + "]: " + href + title;
        break;
      case "shortcut":
        replacement = "[" + content + "]";
        reference = "[" + content + "]: " + href + title;
        break;
      default:
        var id = this.references.length + 1;
        replacement = "[" + content + "][" + id + "]";
        reference = "[" + id + "]: " + href + title;
    }
    this.references.push(reference);
    return replacement;
  },
  references: [],
  append: function(options) {
    var references = "";
    if (this.references.length) {
      references = "\n\n" + this.references.join("\n") + "\n\n";
      this.references = [];
    }
    return references;
  }
};
rules.emphasis = {
  filter: ["em", "i"],
  replacement: function(content, node, options) {
    if (!content.trim()) return "";
    return options.emDelimiter + content + options.emDelimiter;
  }
};
rules.strong = {
  filter: ["strong", "b"],
  replacement: function(content, node, options) {
    if (!content.trim()) return "";
    return options.strongDelimiter + content + options.strongDelimiter;
  }
};
rules.code = {
  filter: function(node) {
    var hasSiblings = node.previousSibling || node.nextSibling;
    var isCodeBlock = node.parentNode.nodeName === "PRE" && !hasSiblings;
    return node.nodeName === "CODE" && !isCodeBlock;
  },
  replacement: function(content) {
    if (!content) return "";
    content = content.replace(/\r?\n|\r/g, " ");
    var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? " " : "";
    var delimiter = "`";
    var matches = content.match(/`+/gm) || [];
    while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + "`";
    return delimiter + extraSpace + content + extraSpace + delimiter;
  }
};
rules.image = {
  filter: "img",
  replacement: function(content, node) {
    var alt = cleanAttribute(node.getAttribute("alt"));
    var src = node.getAttribute("src") || "";
    var title = cleanAttribute(node.getAttribute("title"));
    var titlePart = title ? ' "' + title + '"' : "";
    return src ? "![" + alt + "](" + src + titlePart + ")" : "";
  }
};
function cleanAttribute(attribute) {
  return attribute ? attribute.replace(/(\n+\s*)+/g, "\n") : "";
}
function Rules(options) {
  this.options = options;
  this._keep = [];
  this._remove = [];
  this.blankRule = {
    replacement: options.blankReplacement
  };
  this.keepReplacement = options.keepReplacement;
  this.defaultRule = {
    replacement: options.defaultReplacement
  };
  this.array = [];
  for (var key in options.rules) this.array.push(options.rules[key]);
}
Rules.prototype = {
  add: function(key, rule) {
    this.array.unshift(rule);
  },
  keep: function(filter) {
    this._keep.unshift({
      filter,
      replacement: this.keepReplacement
    });
  },
  remove: function(filter) {
    this._remove.unshift({
      filter,
      replacement: function() {
        return "";
      }
    });
  },
  forNode: function(node) {
    if (node.isBlank) return this.blankRule;
    var rule;
    if (rule = findRule(this.array, node, this.options)) return rule;
    if (rule = findRule(this._keep, node, this.options)) return rule;
    if (rule = findRule(this._remove, node, this.options)) return rule;
    return this.defaultRule;
  },
  forEach: function(fn) {
    for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
  }
};
function findRule(rules2, node, options) {
  for (var i = 0; i < rules2.length; i++) {
    var rule = rules2[i];
    if (filterValue(rule, node, options)) return rule;
  }
  return void 0;
}
function filterValue(rule, node, options) {
  var filter = rule.filter;
  if (typeof filter === "string") {
    if (filter === node.nodeName.toLowerCase()) return true;
  } else if (Array.isArray(filter)) {
    if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true;
  } else if (typeof filter === "function") {
    if (filter.call(rule, node, options)) return true;
  } else {
    throw new TypeError("`filter` needs to be a string, array, or function");
  }
}
function collapseWhitespace(options) {
  var element = options.element;
  var isBlock2 = options.isBlock;
  var isVoid2 = options.isVoid;
  var isPre = options.isPre || function(node2) {
    return node2.nodeName === "PRE";
  };
  if (!element.firstChild || isPre(element)) return;
  var prevText = null;
  var keepLeadingWs = false;
  var prev = null;
  var node = next(prev, element, isPre);
  while (node !== element) {
    if (node.nodeType === 3 || node.nodeType === 4) {
      var text2 = node.data.replace(/[ \r\n\t]+/g, " ");
      if ((!prevText || / $/.test(prevText.data)) && !keepLeadingWs && text2[0] === " ") {
        text2 = text2.substr(1);
      }
      if (!text2) {
        node = remove(node);
        continue;
      }
      node.data = text2;
      prevText = node;
    } else if (node.nodeType === 1) {
      if (isBlock2(node) || node.nodeName === "BR") {
        if (prevText) {
          prevText.data = prevText.data.replace(/ $/, "");
        }
        prevText = null;
        keepLeadingWs = false;
      } else if (isVoid2(node) || isPre(node)) {
        prevText = null;
        keepLeadingWs = true;
      } else if (prevText) {
        keepLeadingWs = false;
      }
    } else {
      node = remove(node);
      continue;
    }
    var nextNode = next(prev, node, isPre);
    prev = node;
    node = nextNode;
  }
  if (prevText) {
    prevText.data = prevText.data.replace(/ $/, "");
    if (!prevText.data) {
      remove(prevText);
    }
  }
}
function remove(node) {
  var next2 = node.nextSibling || node.parentNode;
  node.parentNode.removeChild(node);
  return next2;
}
function next(prev, current, isPre) {
  if (prev && prev.parentNode === current || isPre(current)) {
    return current.nextSibling || current.parentNode;
  }
  return current.firstChild || current.nextSibling || current.parentNode;
}
var root = typeof window !== "undefined" ? window : {};
function canParseHTMLNatively() {
  var Parser = root.DOMParser;
  var canParse = false;
  try {
    if (new Parser().parseFromString("", "text/html")) {
      canParse = true;
    }
  } catch (e) {
  }
  return canParse;
}
function createHTMLParser() {
  var Parser = function() {
  };
  {
    if (shouldUseActiveX()) {
      Parser.prototype.parseFromString = function(string) {
        var doc = new window.ActiveXObject("htmlfile");
        doc.designMode = "on";
        doc.open();
        doc.write(string);
        doc.close();
        return doc;
      };
    } else {
      Parser.prototype.parseFromString = function(string) {
        var doc = document.implementation.createHTMLDocument("");
        doc.open();
        doc.write(string);
        doc.close();
        return doc;
      };
    }
  }
  return Parser;
}
function shouldUseActiveX() {
  var useActiveX = false;
  try {
    document.implementation.createHTMLDocument("").open();
  } catch (e) {
    if (root.ActiveXObject) useActiveX = true;
  }
  return useActiveX;
}
var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();
function RootNode(input, options) {
  var root2;
  if (typeof input === "string") {
    var doc = htmlParser().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + input + "</x-turndown>",
      "text/html"
    );
    root2 = doc.getElementById("turndown-root");
  } else {
    root2 = input.cloneNode(true);
  }
  collapseWhitespace({
    element: root2,
    isBlock,
    isVoid,
    isPre: options.preformattedCode ? isPreOrCode : null
  });
  return root2;
}
var _htmlParser;
function htmlParser() {
  _htmlParser = _htmlParser || new HTMLParser();
  return _htmlParser;
}
function isPreOrCode(node) {
  return node.nodeName === "PRE" || node.nodeName === "CODE";
}
function Node(node, options) {
  node.isBlock = isBlock(node);
  node.isCode = node.nodeName === "CODE" || node.parentNode.isCode;
  node.isBlank = isBlank(node);
  node.flankingWhitespace = flankingWhitespace(node, options);
  return node;
}
function isBlank(node) {
  return !isVoid(node) && !isMeaningfulWhenBlank(node) && /^\s*$/i.test(node.textContent) && !hasVoid(node) && !hasMeaningfulWhenBlank(node);
}
function flankingWhitespace(node, options) {
  if (node.isBlock || options.preformattedCode && node.isCode) {
    return { leading: "", trailing: "" };
  }
  var edges = edgeWhitespace(node.textContent);
  if (edges.leadingAscii && isFlankedByWhitespace("left", node, options)) {
    edges.leading = edges.leadingNonAscii;
  }
  if (edges.trailingAscii && isFlankedByWhitespace("right", node, options)) {
    edges.trailing = edges.trailingNonAscii;
  }
  return { leading: edges.leading, trailing: edges.trailing };
}
function edgeWhitespace(string) {
  var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return {
    leading: m[1],
    // whole string for whitespace-only strings
    leadingAscii: m[2],
    leadingNonAscii: m[3],
    trailing: m[4],
    // empty for whitespace-only strings
    trailingNonAscii: m[5],
    trailingAscii: m[6]
  };
}
function isFlankedByWhitespace(side, node, options) {
  var sibling;
  var regExp;
  var isFlanked;
  if (side === "left") {
    sibling = node.previousSibling;
    regExp = / $/;
  } else {
    sibling = node.nextSibling;
    regExp = /^ /;
  }
  if (sibling) {
    if (sibling.nodeType === 3) {
      isFlanked = regExp.test(sibling.nodeValue);
    } else if (options.preformattedCode && sibling.nodeName === "CODE") {
      isFlanked = false;
    } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
      isFlanked = regExp.test(sibling.textContent);
    }
  }
  return isFlanked;
}
var reduce = Array.prototype.reduce;
var escapes = [
  [/\\/g, "\\\\"],
  [/\*/g, "\\*"],
  [/^-/g, "\\-"],
  [/^\+ /g, "\\+ "],
  [/^(=+)/g, "\\$1"],
  [/^(#{1,6}) /g, "\\$1 "],
  [/`/g, "\\`"],
  [/^~~~/g, "\\~~~"],
  [/\[/g, "\\["],
  [/\]/g, "\\]"],
  [/^>/g, "\\>"],
  [/_/g, "\\_"],
  [/^(\d+)\. /g, "$1\\. "]
];
function TurndownService(options) {
  if (!(this instanceof TurndownService)) return new TurndownService(options);
  var defaults = {
    rules,
    headingStyle: "setext",
    hr: "* * *",
    bulletListMarker: "*",
    codeBlockStyle: "indented",
    fence: "```",
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
    br: "  ",
    preformattedCode: false,
    blankReplacement: function(content, node) {
      return node.isBlock ? "\n\n" : "";
    },
    keepReplacement: function(content, node) {
      return node.isBlock ? "\n\n" + node.outerHTML + "\n\n" : node.outerHTML;
    },
    defaultReplacement: function(content, node) {
      return node.isBlock ? "\n\n" + content + "\n\n" : content;
    }
  };
  this.options = extend({}, defaults, options);
  this.rules = new Rules(this.options);
}
TurndownService.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */
  turndown: function(input) {
    if (!canConvert(input)) {
      throw new TypeError(
        input + " is not a string, or an element/document/fragment node."
      );
    }
    if (input === "") return "";
    var output = process.call(this, new RootNode(input, this.options));
    return postProcess.call(this, output);
  },
  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array} plugin The plugin or array of plugins to add
   * @returns The Turndown instance for chaining
   * @type Object
   */
  use: function(plugin) {
    if (Array.isArray(plugin)) {
      for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
    } else if (typeof plugin === "function") {
      plugin(this);
    } else {
      throw new TypeError("plugin must be a Function or an Array of Functions");
    }
    return this;
  },
  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  addRule: function(key, rule) {
    this.rules.add(key, rule);
    return this;
  },
  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  keep: function(filter) {
    this.rules.keep(filter);
    return this;
  },
  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */
  remove: function(filter) {
    this.rules.remove(filter);
    return this;
  },
  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns A string with Markdown syntax escaped
   * @type String
   */
  escape: function(string) {
    return escapes.reduce(function(accumulator, escape) {
      return accumulator.replace(escape[0], escape[1]);
    }, string);
  }
};
function process(parentNode) {
  var self = this;
  return reduce.call(parentNode.childNodes, function(output, node) {
    node = new Node(node, self.options);
    var replacement = "";
    if (node.nodeType === 3) {
      replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue);
    } else if (node.nodeType === 1) {
      replacement = replacementForNode.call(self, node);
    }
    return join(output, replacement);
  }, "");
}
function postProcess(output) {
  var self = this;
  this.rules.forEach(function(rule) {
    if (typeof rule.append === "function") {
      output = join(output, rule.append(self.options));
    }
  });
  return output.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function replacementForNode(node) {
  var rule = this.rules.forNode(node);
  var content = process.call(this, node);
  var whitespace = node.flankingWhitespace;
  if (whitespace.leading || whitespace.trailing) content = content.trim();
  return whitespace.leading + rule.replacement(content, node, this.options) + whitespace.trailing;
}
function join(output, replacement) {
  var s1 = trimTrailingNewlines(output);
  var s2 = trimLeadingNewlines(replacement);
  var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
  var separator = "\n\n".substring(0, nls);
  return s1 + separator + s2;
}
function canConvert(input) {
  return input != null && (typeof input === "string" || input.nodeType && (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11));
}
var turndown_browser_es_default = TurndownService;

// src/modal.ts
var import_obsidian3 = require("obsidian");
var ReferenceSuggestModal = class extends import_obsidian3.FuzzySuggestModal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.entries = [];
  }
  onOpen() {
    this.plugin.runTask(this.loadEntries());
  }
  async loadEntries() {
    const data = await this.plugin.loadBibData();
    if (!data) {
      this.close();
      return;
    }
    this.data = data;
    this.entries = data.items.map((entry) => {
      var _a;
      const year = ((_a = entry.date.match(/\d{4}/)) == null ? void 0 : _a[0]) || "";
      return { ...entry, inlineReference: `${createAuthorKey(entry.creators)}, (${year}), '${entry.title}'
${entry.citationKey}` };
    }).sort(orderByDateModified);
    this.entries.unshift(createReference({ citationKey: "Entire Library", inlineReference: "Entire Library: " + this.plugin.settings.bibPath }));
    this.inputEl.dispatchEvent(new Event("input"));
  }
  getItems() {
    return this.entries;
  }
  getItemText(entry) {
    return entry.inlineReference;
  }
  onChooseItem(entry) {
    this.plugin.runTask(this.importEntries(entry));
  }
  async importEntries(selected) {
    const entries = selected.citationKey === "Entire Library" ? this.data.items : this.data.items.filter((entry) => entry.citationKey === selected.citationKey);
    for (const entry of entries) await this.plugin.createNote(entry, this.data);
    const last = entries[entries.length - 1];
    if (last) await openSelectedNote(this.app, last, this.plugin.settings.exportTitle, this.plugin.settings.exportPath);
  }
};
var UpdateLibraryModal = class extends import_obsidian3.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    this.plugin.runTask(this.updateLibrary());
  }
  async updateLibrary() {
    try {
      const data = await this.plugin.loadBibData();
      if (!data) return;
      const entries = await this.plugin.updateLibraryEntries(data);
      new import_obsidian3.Notice(`Updated ${entries.length} entries`);
    } finally {
      this.close();
    }
  }
};

// src/settings.ts
var import_obsidian4 = require("obsidian");
var TRANSFORMATION_KEYS = [
  "keyH1",
  "keyH2",
  "keyH3",
  "keyH4",
  "keyH5",
  "keyH6",
  "keyMergeAbove",
  "keyCommentPrepend",
  "keyTask",
  "keyKeyword"
];
var SettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  // Native controls persist existing keys; changing the JSON source also refreshes field discovery.
  async setControlValue(key, value) {
    await super.setControlValue(key, value);
    if (key === "bibPath") {
      await this.plugin.refreshDiscoveredLibraryFields(true);
      await this.plugin.refreshLibraryViews();
    }
  }
  validateTransformation(key, value) {
    if (value && TRANSFORMATION_KEYS.some((other) => other !== key && this.plugin.settings[other] === value)) {
      return "This value is already assigned to another transformation. Choose a different value.";
    }
  }
  getSettingDefinitions() {
    return [
      {
        type: "group",
        heading: "Import Library",
        items: [
          {
            name: "BetterBibTex Json File",
            desc: "Add relative path from the vault folder to the *BetterBibTex Json* file to be imported. For instance, add `library.json` if the file (library.json) is in the root folder. Instead, if the file is in a subfolder, specify first the subfolder followed by the name of the file (e.g. 'zotero/library.json' if the json file is located in a subfolder of your vault called 'zotero') ",
            control: {
              type: "file",
              key: "bibPath",
              placeholder: "/path/to/BetterBibTex.json",
              filter: (file) => file.extension.toLowerCase() === "json"
            }
          },
          {
            name: "Auto Import on Json Change",
            desc: "Automatically update related notes when the BetterBibTex JSON file changes.",
            control: {
              type: "toggle",
              key: "autoImportOnBibChange"
            }
          }
        ]
      },
      this.libraryColumnsDefinition(),
      {
        type: "group",
        heading: "Export Notes",
        items: [
          {
            name: "Export Path",
            desc: "Add the relative path to the folder inside your vault where the notes will be exported",
            control: {
              type: "folder",
              key: "exportPath",
              placeholder: "Example: folder1/folder2",
              includeRoot: true
            }
          },
          {
            name: "Note Title",
            desc: "Select the format of the title of the note. Possible values include: {{citeKey}}, {{title}}, {{author}},{{authorInitials}}, {{authorFullName}} {{year}}",
            control: {
              type: "text",
              key: "exportTitle",
              placeholder: "{{citeKey}}"
            }
          },
          {
            name: "Select Template",
            desc: "Select one of the default templates or provide a custom one.",
            control: {
              type: "dropdown",
              key: "templateType",
              options: { "Plain": "Plain", "Admonition": "Admonition", "Custom": "Custom Template" }
            }
          },
          {
            name: "Custom Template",
            visible: () => this.plugin.settings.templateType === "Custom",
            control: {
              type: "textarea",
              key: "templateContent",
              rows: 10
            }
          },
          {
            name: "Missing Fields",
            desc: "Fields that are present in the template but missing from the selected field.",
            control: {
              type: "dropdown",
              key: "missingfield",
              options: { "Leave placeholder": "Leave placeholder", "Remove (entire row)": "Remove (entire row)", "Replace with custom text": "Replace with custom text" }
            }
          },
          {
            name: "Replacement for missing fields",
            visible: () => this.plugin.settings.missingfield === "Replace with custom text",
            control: {
              type: "text",
              key: "missingfieldreplacement"
            }
          },
          {
            name: "Multiple Entries Divider",
            desc: "Type the character or expression that should separate multiple values when found in the same field (e.g. authors, editors, tags, collections).",
            control: {
              type: "textarea",
              key: "multipleFieldsDivider"
            }
          },
          {
            name: "Format Names",
            desc: "Specify how the names of the authors/editors should be exported. Accepted values are {{firstName}}, {{lastName}} and {{firstNameInitials}}",
            control: {
              type: "textarea",
              key: "nameFormat"
            }
          },
          {
            name: "Save Manual Edits",
            desc: 'Select "Yes" to preserve the manual edits made to the previously extracted note (e.g. block references, comments added manually, fixed typos) when this is updated. Select "No" to overwrite any manual change to the extracted annotation when this is updated.',
            control: {
              type: "dropdown",
              key: "saveManualEdits",
              options: { "Save Entire Note": "Save Entire Note", "Select Section": "Select Section", "Overwrite Entire Note": "Overwrite Entire Note" }
            }
          },
          {
            name: "Start - Save Manual Edits",
            desc: "Define string (e.g. '## Notes') in the template starting from where updating the note will not overwrite the existing text. If field is left empty, the value will be set to the beginning of the note",
            visible: () => this.plugin.settings.saveManualEdits == "Select Section",
            control: {
              type: "text",
              key: "saveManualEditsStart"
            }
          },
          {
            name: "End - Save Manual Edits",
            desc: "Define string (e.g. '## Notes') in the template until where updating the note will not overwrite the existing text. If field is left empty, the value will be set to the end of the note",
            visible: () => this.plugin.settings.saveManualEdits == "Select Section",
            control: {
              type: "text",
              key: "saveManualEditsEnd"
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Update Library",
        items: [
          {
            name: "Update Existing/All Notes",
            desc: "Select whether to create new notes that are missing from Obsidian but present/modified within Zotero when runing the Update Library command",
            control: {
              type: "dropdown",
              key: "updateLibrary",
              options: { "Only update existing notes": "Only existing notes", "Create new notes when missing": "Create new notes when missing" }
            }
          }
        ]
      },
      {
        type: "group",
        heading: "In-text Citations",
        items: [
          {
            name: "End of Highlight Citation Format",
            desc: "Select the style of the reference added next to the highlights and figures extracted from the PDF. This feature is for now available only for sources extracted from Zotero",
            control: {
              type: "dropdown",
              key: "highlightCitationsFormat",
              options: { "Author, year, page number": "Author, year, page number", "Only page number": "Only page number", "Pandoc": "Pandoc", "Empty": "Empty" }
            }
          },
          {
            name: "Create Link to the Highlight Page in the PDF",
            desc: "If enabled, a link will be created at the end of the extracted highlights or figures to the original page of the PDF in the Zotero reader",
            control: {
              type: "toggle",
              key: "highlightCitationsLink"
            }
          },
          {
            name: "Structure of the extracted highlights/comments/tag",
            desc: "Placeholder include {{highlight}}, {{comment}}, {{tag}}",
            control: {
              type: "textarea",
              key: "highlightExportTemplate"
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Highlights",
        items: [
          {
            name: "Double Spaced",
            desc: "Set toggle to on to add an empty space between different highlights",
            control: {
              type: "toggle",
              key: "isDoubleSpaced"
            }
          },
          {
            name: "Quotation Marks",
            control: {
              type: "toggle",
              key: "isHighlightQuote"
            }
          },
          {
            name: "Bold",
            control: {
              type: "toggle",
              key: "isHighlightBold"
            }
          },
          {
            name: "Italic",
            control: {
              type: "toggle",
              key: "isHighlightItalic"
            }
          },
          {
            name: "Highlighted (markdown)",
            control: {
              type: "toggle",
              key: "isHighlightHighlighted"
            }
          },
          {
            name: "Highlighted (original colour)",
            control: {
              type: "toggle",
              key: "isHighlightColoured"
            }
          },
          {
            name: "Bullet Points",
            control: {
              type: "toggle",
              key: "isHighlightBullet"
            }
          },
          {
            name: "Blockquote",
            control: {
              type: "toggle",
              key: "isHighlightBlockquote"
            }
          },
          {
            name: "Custom text before all highlights",
            control: {
              type: "textarea",
              key: "highlightCustomTextBefore"
            }
          },
          {
            name: "Custom text after all highlights",
            control: {
              type: "textarea",
              key: "highlightCustomTextAfter"
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Comments",
        items: [
          {
            name: "Quotation Marks",
            control: {
              type: "toggle",
              key: "isCommentQuote"
            }
          },
          {
            name: "Bold",
            control: {
              type: "toggle",
              key: "isCommentBold"
            }
          },
          {
            name: "Italic",
            control: {
              type: "toggle",
              key: "isCommentItalic"
            }
          },
          {
            name: "Highlighted (markdown)",
            control: {
              type: "toggle",
              key: "isCommentHighlighted"
            }
          },
          {
            name: "Highlighted (original colour)",
            control: {
              type: "toggle",
              key: "isCommentColoured"
            }
          },
          {
            name: "Bullet Points",
            control: {
              type: "toggle",
              key: "isCommentBullet"
            }
          },
          {
            name: "Blockquote",
            control: {
              type: "toggle",
              key: "isCommentBlockquote"
            }
          },
          {
            name: "Custom text before all comments",
            control: {
              type: "textarea",
              key: "commentCustomTextBefore"
            }
          },
          {
            name: "Custom text after all comments",
            control: {
              type: "textarea",
              key: "commentCustomTextAfter"
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Tags",
        items: [
          {
            name: "Hash sign (#)",
            control: {
              type: "toggle",
              key: "isTagHash"
            }
          },
          {
            name: "Quotation Marks",
            control: {
              type: "toggle",
              key: "isTagQuote"
            }
          },
          {
            name: "Bold",
            control: {
              type: "toggle",
              key: "isTagBold"
            }
          },
          {
            name: "Italic",
            control: {
              type: "toggle",
              key: "isTagItalic"
            }
          },
          {
            name: "Highlighted (markdown)",
            control: {
              type: "toggle",
              key: "isTagHighlighted"
            }
          },
          {
            name: "Highlighted (original colour)",
            control: {
              type: "toggle",
              key: "isTagColoured"
            }
          },
          {
            name: "Bullet Points",
            control: {
              type: "toggle",
              key: "isTagBullet"
            }
          },
          {
            name: "Blockquote",
            control: {
              type: "toggle",
              key: "isTagBlockquote"
            }
          },
          {
            name: "Custom text before each individual tag",
            control: {
              type: "textarea",
              key: "tagCustomTextBefore"
            }
          },
          {
            name: "Custom text after each individual tag",
            control: {
              type: "textarea",
              key: "tagCustomTextAfter"
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Additional Transformations",
        items: [
          { name: "Transformation triggers", desc: "Enter a character or word to recognize at the beginning of a comment. Matching comments or highlights receive the selected transformation." },
          {
            name: "Heading Level 1",
            control: {
              type: "text",
              key: "keyH1",
              validate: (value) => this.validateTransformation("keyH1", value)
            }
          },
          {
            name: "Heading Level 2",
            control: {
              type: "text",
              key: "keyH2",
              validate: (value) => this.validateTransformation("keyH2", value)
            }
          },
          {
            name: "Heading Level 3",
            control: {
              type: "text",
              key: "keyH3",
              placeholder: "###",
              validate: (value) => this.validateTransformation("keyH3", value)
            }
          },
          {
            name: "Heading Level 4",
            control: {
              type: "text",
              key: "keyH4",
              validate: (value) => this.validateTransformation("keyH4", value)
            }
          },
          {
            name: "Heading Level 5",
            control: {
              type: "text",
              key: "keyH5",
              validate: (value) => this.validateTransformation("keyH5", value)
            }
          },
          {
            name: "Heading Level 6",
            control: {
              type: "text",
              key: "keyH6",
              validate: (value) => this.validateTransformation("keyH6", value)
            }
          },
          {
            name: "Append highlight to the end of the previous one",
            control: {
              type: "text",
              key: "keyMergeAbove",
              validate: (value) => this.validateTransformation("keyMergeAbove", value)
            }
          },
          {
            name: "Place comment before the highlight",
            control: {
              type: "text",
              key: "keyCommentPrepend",
              validate: (value) => this.validateTransformation("keyCommentPrepend", value)
            }
          },
          {
            name: "Always place comments before highlights",
            desc: "Always place the comment made to an highlight before the text of the highlight",
            control: {
              type: "toggle",
              key: "commentPrependDefault"
            }
          },
          {
            name: "Transform the highlight/comment into a task",
            control: {
              type: "text",
              key: "keyTask",
              validate: (value) => this.validateTransformation("keyTask", value)
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Highlight Color",
        items: [
          { name: "Color transformations", desc: "Use {{highlight}} with custom text, H1\u2013H6 for headings, AddToAbove to append, Keyword to collect keywords, or Todo to create a task." },
          {
            name: "Yellow",
            control: {
              type: "text",
              key: "colourYellowText"
            }
          },
          {
            name: "Red",
            control: {
              type: "text",
              key: "colourRedText"
            }
          },
          {
            name: "Green",
            control: {
              type: "text",
              key: "colourGreenText"
            }
          },
          {
            name: "Blue",
            control: {
              type: "text",
              key: "colourBlueText"
            }
          },
          {
            name: "Purple",
            control: {
              type: "text",
              key: "colourPurpleText"
            }
          },
          {
            name: "Black",
            control: {
              type: "text",
              key: "colourBlackText"
            }
          },
          {
            name: "White",
            control: {
              type: "text",
              key: "colourWhiteText"
            }
          },
          {
            name: "Gray",
            control: {
              type: "text",
              key: "colourGrayText"
            }
          },
          {
            name: "Orange",
            control: {
              type: "text",
              key: "colourOrangeText"
            }
          },
          {
            name: "Cyan",
            control: {
              type: "text",
              key: "colourCyanText"
            }
          },
          {
            name: "Magenta",
            control: {
              type: "text",
              key: "colourMagentaText"
            }
          },
          {
            name: "Custom Hex Value",
            control: {
              type: "text",
              key: "colourCustomHexValue"
            }
          },
          {
            name: "Custom Hex Transformation",
            control: {
              type: "text",
              key: "colourCustomHexText"
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Import Images",
        items: [
          {
            name: "Import Images",
            desc: "This option is available only for notes extracted using the Zotero native PDF reader",
            control: {
              type: "toggle",
              key: "imagesImport"
            }
          },
          {
            name: "Zotero Local Folder",
            desc: `Add the path on your computer where Zotero's data is stored (e.g. "/Users/yourusername/Zotero/storage"). This field is required only when this is different from the folder where the PDF files are stored. To retrieve this information, open Zotero --> Preferences --> Advanced --> Files and Folder, and copy the "data directory location", followed by the subdirectory "/storage"`,
            control: {
              type: "text",
              key: "zoteroStoragePathManual"
            }
          },
          {
            name: "Copy the Image into the Obsidian Vault",
            desc: "If this option is selected, images selected through the Zotero reader will be copied into the Vault. If this option is not selected, the note will link to the file stored in Zotero/storage",
            visible: () => this.plugin.settings.imagesImport,
            control: {
              type: "toggle",
              key: "imagesCopy"
            }
          },
          {
            name: "Image Import Path",
            desc: "Add the relative path to the folder inside your vault where the image will be copied",
            visible: () => this.plugin.settings.imagesImport && this.plugin.settings.imagesCopy,
            control: {
              type: "folder",
              key: "imagesPath",
              placeholder: "Example: folder1/folder2",
              includeRoot: true
            }
          },
          {
            name: "Position of Comment to an Image",
            visible: () => this.plugin.settings.imagesImport,
            control: {
              type: "dropdown",
              key: "imagesCommentPosition",
              options: { "Above the image": "Above the image", "Below the image": "Below the image" }
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Debugging",
        items: [
          {
            name: "Activate Debug Mode",
            desc: "Activating this option will print the console logs of each entry exported in a text file to faciliate debugging.",
            control: {
              type: "toggle",
              key: "debugMode"
            }
          }
        ]
      }
    ];
  }
  async saveColumns(columns, rebuild = true) {
    this.plugin.settings.libraryViewColumns = this.plugin.parseLibraryViewColumns(columns.join(","));
    await this.plugin.saveSettings();
    await this.plugin.refreshLibraryViews();
    if (rebuild) this.update();
  }
  libraryColumnsDefinition() {
    const plugin = this.plugin;
    return {
      type: "list",
      heading: "Library View Columns",
      items: plugin.getLibraryViewColumns().map((column, index) => ({
        name: `Column ${index + 1}`,
        desc: "Title, source field, and optional sub-property.",
        render: (setting) => {
          const parts = column.split("|");
          const field = plugin.resolveLibraryColumnField(column);
          const savePart = async (part, value, rebuild) => {
            const columns = plugin.getLibraryViewColumns().slice();
            const current = columns[index].split("|");
            current[1] = current[1] || plugin.resolveLibraryColumnField(columns[index]);
            current[part] = value;
            if (part === 1) current[2] = "";
            columns[index] = [current[0], current[1], current[2] || ""].join("|");
            await this.saveColumns(columns, rebuild);
          };
          setting.addText((text2) => text2.setPlaceholder("Title").setValue(parts[0]).onChange((value) => {
            void savePart(0, value, false).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : "Failed to save settings"));
          }));
          setting.addDropdown((dropdown) => {
            const populate = () => {
              const selected = dropdown.getValue() || field;
              dropdown.selectEl.empty();
              const fields = /* @__PURE__ */ new Set([...plugin.getAvailableLibrarySourceFields(), selected]);
              fields.forEach((value) => {
                dropdown.addOption(value, value);
              });
              dropdown.setValue(selected);
            };
            populate();
            dropdown.selectEl.addEventListener("focus", populate);
            dropdown.setValue(field).onChange((value) => {
              void savePart(1, value, true).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : "Failed to save settings"));
            });
          });
          setting.addDropdown((dropdown) => {
            const populate = () => {
              const selected = dropdown.getValue();
              dropdown.selectEl.empty();
              dropdown.addOption("", "- none -");
              const fields = /* @__PURE__ */ new Set([...plugin.discoveredSubFields[field] || [], selected]);
              fields.forEach((value) => {
                if (value) dropdown.addOption(value, value);
              });
              dropdown.setValue(selected);
            };
            populate();
            dropdown.selectEl.addEventListener("focus", populate);
            dropdown.setValue(parts[2] || "").onChange((value) => {
              void savePart(2, value, false).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : "Failed to save settings"));
            });
          });
        }
      })),
      addItem: {
        name: "Add column",
        action: () => {
          void this.saveColumns([...plugin.getLibraryViewColumns(), "New Column"]).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : "Failed to save settings"));
        }
      },
      onDelete: (index) => {
        const columns = plugin.getLibraryViewColumns().slice();
        if (columns.length <= 1) return;
        columns.splice(index, 1);
        void this.saveColumns(columns).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : "Failed to save settings"));
      },
      onReorder: (from, to) => {
        const columns = plugin.getLibraryViewColumns().slice();
        const [column] = columns.splice(from, 1);
        columns.splice(to, 0, column);
        void this.saveColumns(columns).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : "Failed to save settings"));
      },
      extraButtons: [(button) => button.setIcon("reset").setTooltip("Reset default columns").onClick(() => {
        void this.saveColumns(DEFAULT_SETTINGS.libraryViewColumns.slice()).catch((error) => new import_obsidian4.Notice(error instanceof Error ? error.message : "Failed to save settings"));
      })]
    };
  }
};

// src/main.ts
var BUILT_IN_LIBRARY_FIELD_MAP = {
  "Obsidian Notes": "Obsidian Notes",
  "citationKey": "citationKey",
  "Year": "date",
  "Type": "itemType",
  "Title": "title",
  "Authors": "creators",
  "Publication": "publicationTitle",
  "Tags": "tags",
  "Collections": "collections",
  "Parent Collections": "parentCollections",
  "Added": "dateAdded",
  "Action": "Actions",
  "Actions": "Actions"
};
var LEGACY_LIBRARY_COLUMN_MAP = {
  "citationKey|Obsidian Notes": "Obsidian Notes",
  "date|Year": "Year",
  "itemType|Type": "Type",
  "title|Title": "Title",
  "creators|Authors": "Authors",
  "publicationTitle|Publication": "Publication",
  "tags|Tags": "Tags",
  "dateAdded|Added": "Added"
};
var ZoteroLibraryView = class extends import_obsidian5.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.sortColumn = this.plugin.normalizeLibraryColumn(this.plugin.settings.libraryViewSortColumn || "Added");
    this.sortDirection = this.plugin.settings.libraryViewSortDirection || "desc";
  }
  getViewType() {
    return ZOTERO_LIBRARY_VIEW_TYPE;
  }
  getDisplayText() {
    return "Zotero Lib View";
  }
  getIcon() {
    return "library";
  }
  async onOpen() {
    await this.renderLibrary();
  }
  async onClose() {
  }
  async renderLibrary() {
    const container = this.contentEl;
    container.empty();
    container.addClass("zotero-lib-view");
    const data = await this.plugin.loadBibData(true);
    if (data == null) {
      container.createEl("p", { text: "No BetterBibTex JSON file found. Please check the Zotero Lib View settings." });
      return;
    }
    const entries = this.plugin.buildLibraryEntries(data);
    const header = container.createDiv({ cls: "zotero-library-header" });
    const titleWrap = header.createDiv({ cls: "zotero-library-title-wrap" });
    titleWrap.createEl("h2", { text: "Zotero Lib View" });
    titleWrap.createEl("p", {
      text: `Source: ${this.plugin.settings.bibPath || "My Library.json"}`
    });
    const controls = header.createDiv({ cls: "zotero-library-controls" });
    const searchInput = controls.createEl("input");
    searchInput.type = "search";
    searchInput.placeholder = "Search cite key, title, authors, tags...";
    searchInput.oninput = () => {
      renderRows(searchInput.value);
    };
    const stats = container.createDiv({ cls: "zotero-library-stats" });
    const years = entries.map((entry) => Number(entry.year)).filter((year) => Number.isFinite(year));
    const tags = [...new Set(entries.flatMap((entry) => entry.tagsArray))];
    const publications = [...new Set(entries.map((entry) => entry.publication).filter((value) => value !== ""))];
    const yearSummary = years.length > 0 ? `${Math.min(...years)}-${Math.max(...years)}` : "N/A";
    [
      ["References", String(entries.length)],
      ["Years", yearSummary],
      ["Tags", String(tags.length)],
      ["Publications", String(publications.length)]
    ].forEach(([label, value]) => {
      const statCard = stats.createDiv({ cls: "zotero-library-stat" });
      statCard.createDiv({ cls: "zotero-library-stat-label", text: label });
      statCard.createDiv({ cls: "zotero-library-stat-value", text: value });
    });
    const tableWrap = container.createDiv({ cls: "zotero-library-table-wrap" });
    const table = tableWrap.createEl("table", { cls: "zotero-library-table" });
    const thead = table.createTHead();
    const headRow = thead.insertRow();
    const visibleColumns = this.plugin.getLibraryViewColumns();
    const sortIndicators = {};
    const updateSortIndicators = () => {
      Object.entries(sortIndicators).forEach(([column, indicator]) => {
        indicator.setText(this.sortColumn === column ? this.sortDirection === "asc" ? "\u2191" : "\u2193" : "");
      });
    };
    visibleColumns.forEach((columnString) => {
      const normalizedColumn = this.plugin.normalizeLibraryColumn(columnString);
      const parts = normalizedColumn.split("|");
      const label = parts[0];
      const th = headRow.createEl("th");
      th.addClass("zotero-library-sortable");
      const headerLabel = th.createDiv({ cls: "zotero-library-sort-label" });
      headerLabel.createSpan({ cls: "zotero-library-sort-text", text: label });
      const indicator = headerLabel.createSpan({
        cls: "zotero-library-sort-indicator",
        text: this.sortColumn === normalizedColumn ? this.sortDirection === "asc" ? "\u2191" : "\u2193" : ""
      });
      sortIndicators[normalizedColumn] = indicator;
      th.setAttr("role", "button");
      th.setAttr("tabindex", "0");
      const sortHandler = () => {
        if (this.sortColumn === normalizedColumn) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.sortColumn = normalizedColumn;
          this.sortDirection = this.plugin.resolveLibraryColumnField(normalizedColumn) === "dateAdded" ? "desc" : "asc";
        }
        this.plugin.settings.libraryViewSortColumn = this.sortColumn;
        this.plugin.settings.libraryViewSortDirection = this.sortDirection;
        this.plugin.runTask(this.plugin.saveSettings());
        updateSortIndicators();
        renderRows(searchInput.value);
      };
      th.addEventListener("click", sortHandler);
      th.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          sortHandler();
        }
      });
    });
    const tbody = table.createTBody();
    const openEntryPdf = (entry) => {
      const pdfFile = entry.pdfName && this.plugin.app.metadataCache.getFirstLinkpathDest(entry.pdfName, "") || this.plugin.app.metadataCache.getFirstLinkpathDest(entry.citeKey + ".pdf", "");
      if (pdfFile instanceof import_obsidian5.TFile) {
        this.plugin.runTask(this.plugin.openFileReusingLeaf(pdfFile));
      } else if (entry.pdfLink !== "") {
        window.open(entry.pdfLink, "_blank");
      }
    };
    const renderRows = (query) => {
      tbody.empty();
      const normalizedQuery = query.trim().toLowerCase();
      const filteredEntries = normalizedQuery === "" ? entries.slice() : entries.filter((entry) => entry.searchText.includes(normalizedQuery));
      filteredEntries.sort((firstEntry, secondEntry) => this.plugin.compareLibraryEntries(firstEntry, secondEntry, this.sortColumn, this.sortDirection));
      filteredEntries.forEach((entry) => {
        const row = tbody.insertRow();
        visibleColumns.forEach((columnString) => {
          var _a, _b;
          const normalizedColumn = this.plugin.normalizeLibraryColumn(columnString);
          const field = this.plugin.resolveLibraryColumnField(normalizedColumn);
          const noteTitle = ((_a = entry.noteFile) == null ? void 0 : _a.basename) || ((_b = entry.notePathShort.split("/").pop()) == null ? void 0 : _b.replace(/\.md$/i, "")) || entry.citeKey;
          if (field === "Obsidian Notes") {
            const citeCell = row.insertCell();
            const noteLink = citeCell.createEl("a", { text: noteTitle, href: "#" });
            noteLink.addEventListener("click", (event) => {
              event.preventDefault();
              this.plugin.runTask(this.plugin.openOrCreateLibraryEntryNote(entry));
            });
            return;
          }
          if (field === "citationKey") {
            row.insertCell().setText(entry.citeKey);
            return;
          }
          if (field === "date" || field === "Year") {
            row.insertCell().setText(entry.year);
            return;
          }
          if (field === "itemType" || field === "Type") {
            row.insertCell().setText(entry.itemType);
            return;
          }
          if (field === "title" || field === "Title") {
            const titleCell = row.insertCell();
            if (entry.pdfLink !== "") {
              const titleLink = titleCell.createEl("a", { text: entry.title, href: "#" });
              titleLink.addEventListener("click", (event) => {
                event.preventDefault();
                openEntryPdf(entry);
              });
            } else {
              titleCell.setText(entry.title);
            }
            return;
          }
          if (field === "creators" || field === "Authors") {
            row.insertCell().setText(entry.authors);
            return;
          }
          if (field === "publicationTitle" || field === "Publication") {
            row.insertCell().setText(entry.publication);
            return;
          }
          if (field === "tags" || field === "Tags") {
            row.insertCell().setText(entry.tags);
            return;
          }
          if (field === "collections" || field === "Collections") {
            row.insertCell().setText(entry.collections);
            return;
          }
          if (field === "parentCollections" || field === "Parent Collections") {
            row.insertCell().setText(entry.parentCollections);
            return;
          }
          if (field === "dateAdded" || field === "Added") {
            row.insertCell().setText(entry.dateAddedShort);
            return;
          }
          if (field === "Actions") {
            const actionsCell = row.insertCell();
            actionsCell.addClass("zotero-library-actions");
            if (entry.pdfLink !== "") {
              const pdfButton = actionsCell.createEl("button", { text: "PDF" });
              pdfButton.addEventListener("click", () => {
                openEntryPdf(entry);
              });
            }
            if (entry.url !== "") {
              const webButton = actionsCell.createEl("button", { text: "Web" });
              webButton.addEventListener("click", () => {
                window.open(entry.url, "_blank");
              });
            }
            if (entry.zoteroLink !== "") {
              const zoteroButton = actionsCell.createEl("button", { text: "Zotero" });
              zoteroButton.addEventListener("click", () => {
                window.open(entry.zoteroLink, "_blank");
              });
            }
            const noteButton = actionsCell.createEl("button", { text: entry.noteFile != void 0 ? "Note" : "Create" });
            noteButton.addEventListener("click", () => {
              this.plugin.runTask(this.plugin.openOrCreateLibraryEntryNote(entry));
            });
            return;
          }
          row.insertCell().setText((entry.customFieldValues || {})[field] || "");
        });
      });
    };
    searchInput.oninput = () => {
      renderRows(searchInput.value);
    };
    updateSortIndicators();
    renderRows("");
  }
};
var ZoteroLibraryPlugin = class extends import_obsidian5.Plugin {
  async onload() {
    await this.loadSettings();
    await this.refreshDiscoveredLibraryFields(true);
    this.autoImportDebounce = void 0;
    this.libraryViewRefreshDebounce = void 0;
    this.isAutoImportRunning = false;
    this.registerView(ZOTERO_LIBRARY_VIEW_TYPE, (leaf) => new ZoteroLibraryView(leaf, this));
    this.addSettingTab(new SettingTab(this.app, this));
    this.addCommand({
      id: "importSelectedJson-modal",
      name: "Create/Update Literature Note",
      callback: () => {
        new ReferenceSuggestModal(this.app, this).open();
      }
    });
    this.addCommand({
      id: "updateLibrary-modal",
      name: "Update Library",
      callback: () => {
        new UpdateLibraryModal(this.app, this).open();
      }
    });
    this.addCommand({
      id: "update-current-note",
      name: "Update Current Literature Note",
      callback: () => {
        this.runTask(this.updateCurrentNote());
      }
    });
    this.addCommand({
      id: "open-library-view",
      name: "Open Library in Sidebar",
      callback: () => {
        this.runTask(this.activateLibraryViewInSidebar());
      }
    });
    this.addCommand({
      id: "open-library-view-tab",
      name: "Open Library in Tab",
      callback: () => {
        this.runTask(this.activateLibraryViewInTab());
      }
    });
    this.addRibbonIcon("library", "Open Library", () => {
      this.runTask(this.activateLibraryViewInTab());
    });
    this.registerObsidianProtocolHandler("zotero-library", async (params) => {
      const view = typeof params.view === "string" ? params.view.toLowerCase() : "tab";
      if (view === "sidebar") {
        await this.activateLibraryViewInSidebar();
        return;
      }
      await this.activateLibraryViewInTab();
    });
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => {
      this.initHeaderLibraryButton();
    }));
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      this.initHeaderLibraryButton();
    }));
    this.registerEvent(this.app.workspace.on("file-open", () => {
      this.initHeaderLibraryButton();
    }));
    this.registerBibFileWatcher();
    this.initHeaderLibraryButton();
  }
  onunload() {
    if (this.autoImportDebounce != void 0) {
      window.clearTimeout(this.autoImportDebounce);
      this.autoImportDebounce = void 0;
    }
    if (this.libraryViewRefreshDebounce != void 0) {
      window.clearTimeout(this.libraryViewRefreshDebounce);
      this.libraryViewRefreshDebounce = void 0;
    }
    this.removeHeaderLibraryButtons();
  }
  async loadSettings() {
    const saved = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, libraryViewColumns: [...DEFAULT_SETTINGS.libraryViewColumns] };
    if (isRecord(saved)) {
      for (const key of Object.keys(DEFAULT_SETTINGS)) {
        const defaultValue = DEFAULT_SETTINGS[key];
        const value = saved[key];
        if (key === "lastUpdateDate" && typeof value === "string") {
          const date = new Date(value);
          if (!Number.isNaN(date.getTime())) this.settings.lastUpdateDate = date;
        } else if (Array.isArray(defaultValue)) {
          if (Array.isArray(value) && value.every((item) => typeof item === "string"))
            Object.defineProperty(this.settings, key, { value: [...value], writable: true, enumerable: true, configurable: true });
        } else if (value !== void 0 && typeof value === typeof defaultValue) {
          Object.defineProperty(this.settings, key, { value, writable: true, enumerable: true, configurable: true });
        }
      }
      if (isRecord(saved.fieldPropertyMapping)) {
        this.settings.fieldPropertyMapping = Object.fromEntries(Object.entries(saved.fieldPropertyMapping).filter((entry) => typeof entry[1] === "string"));
      }
    }
    this.discoveredLibraryFields = [];
    this.discoveredSubFields = {};
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  removeHeaderLibraryButtons() {
    const markdownLeaves = this.app.workspace.getLeavesOfType("markdown");
    markdownLeaves.forEach((leaf) => {
      const actionsEl = leaf.view.containerEl.querySelector(".view-actions");
      if (!actionsEl) return;
      actionsEl.querySelectorAll(`#${ZOTERO_LIBRARY_HEADER_BUTTON_ID}`).forEach((element) => {
        element.remove();
      });
    });
  }
  initHeaderLibraryButton() {
    const activeView = this.app.workspace.getActiveViewOfType(import_obsidian5.MarkdownView);
    this.removeHeaderLibraryButtons();
    if (!activeView || !activeView.file) return;
    const fileCache = this.app.metadataCache.getFileCache(activeView.file);
    const frontmatter = fileCache == null ? void 0 : fileCache.frontmatter;
    if (!frontmatter || !Object.prototype.hasOwnProperty.call(frontmatter, "Zotero Library")) return;
    const actionsEl = activeView.containerEl.querySelector(".view-actions");
    if (!actionsEl) return;
    const buttonContainer = actionsEl.createDiv();
    buttonContainer.id = ZOTERO_LIBRARY_HEADER_BUTTON_ID;
    buttonContainer.addClass("clickable-icon");
    buttonContainer.addClass("view-action");
    buttonContainer.setAttribute("aria-label", "Open Zotero Lib View");
    (0, import_obsidian5.setIcon)(buttonContainer, "library");
    buttonContainer.addEventListener("click", () => {
      this.runTask(this.activateLibraryViewInTab());
    });
    if (actionsEl.firstChild) {
      actionsEl.insertBefore(buttonContainer, actionsEl.firstChild);
    } else {
      actionsEl.appendChild(buttonContainer);
    }
  }
  async activateLibraryViewInSidebar() {
    const existingLeaf = this.app.workspace.getLeavesOfType(ZOTERO_LIBRARY_VIEW_TYPE).find((leaf2) => leaf2.getRoot() === this.app.workspace.rightSplit);
    if (existingLeaf) {
      await this.app.workspace.revealLeaf(existingLeaf);
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    await leaf.setViewState({
      type: ZOTERO_LIBRARY_VIEW_TYPE,
      active: true
    });
    await this.app.workspace.revealLeaf(leaf);
  }
  async activateLibraryViewInTab() {
    const existingLeaf = this.app.workspace.getLeavesOfType(ZOTERO_LIBRARY_VIEW_TYPE).find((leaf2) => leaf2.getRoot() !== this.app.workspace.rightSplit && leaf2.getRoot() !== this.app.workspace.leftSplit);
    if (existingLeaf) {
      await this.app.workspace.revealLeaf(existingLeaf);
      return;
    }
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.setViewState({
      type: ZOTERO_LIBRARY_VIEW_TYPE,
      active: true
    });
    await this.app.workspace.revealLeaf(leaf);
  }
  findOpenLeafForFile(file) {
    var _a, _b;
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (((_a = view.file) == null ? void 0 : _a.path) === file.path) {
        return leaf;
      }
    }
    for (const leaf of this.app.workspace.getLeavesOfType("pdf")) {
      const state = leaf.getViewState();
      if (((_b = state.state) == null ? void 0 : _b.file) === file.path) {
        return leaf;
      }
    }
    return null;
  }
  async openFileReusingLeaf(file) {
    const existingLeaf = this.findOpenLeafForFile(file);
    if (existingLeaf) {
      await this.app.workspace.revealLeaf(existingLeaf);
      this.app.workspace.setActiveLeaf(existingLeaf, { focus: true });
      return;
    }
    await this.app.workspace.getLeaf(true).openFile(file);
  }
  async openOrCreateLibraryEntryNote(entry) {
    if (entry.noteFile) {
      await this.openFileReusingLeaf(entry.noteFile);
    } else {
      await this.createNote(entry.rawEntry, entry.rawData);
      await this.refreshLibraryViews();
    }
  }
  async refreshLibraryViews() {
    const leaves = this.app.workspace.getLeavesOfType(ZOTERO_LIBRARY_VIEW_TYPE);
    for (const leaf of leaves) {
      if (leaf.view instanceof ZoteroLibraryView) {
        await leaf.view.renderLibrary();
      }
    }
  }
  parseLibraryViewColumns(value) {
    const parsed = String(value || "").split(",").map((column) => this.normalizeLibraryColumn(column.trim())).filter((column) => column !== "");
    if (parsed.length > 0) {
      return parsed;
    }
    return BUILT_IN_LIBRARY_COLUMNS.slice();
  }
  normalizeLibraryColumn(column) {
    return LEGACY_LIBRARY_COLUMN_MAP[column] || column;
  }
  resolveLibraryColumnField(column) {
    const normalizedColumn = this.normalizeLibraryColumn(column);
    const parts = normalizedColumn.split("|");
    if (parts.length >= 2) {
      return parts[1] || parts[0];
    }
    return BUILT_IN_LIBRARY_FIELD_MAP[normalizedColumn] || normalizedColumn;
  }
  getAvailableLibraryViewColumns() {
    return Array.from(new Set(BUILT_IN_LIBRARY_COLUMNS.concat(this.discoveredLibraryFields || [])));
  }
  getAvailableLibrarySourceFields() {
    return Array.from(new Set(Object.values(BUILT_IN_LIBRARY_FIELD_MAP).concat(this.discoveredLibraryFields || [])));
  }
  getLibraryViewColumns() {
    const configuredColumns = this.settings.libraryViewColumns;
    if (Array.isArray(configuredColumns) && configuredColumns.length > 0) {
      return this.parseLibraryViewColumns(configuredColumns.join(","));
    }
    if (typeof configuredColumns === "string" && configuredColumns.trim() !== "") {
      return this.parseLibraryViewColumns(configuredColumns);
    }
    return this.getAvailableLibraryViewColumns();
  }
  compareLibraryEntries(firstEntry, secondEntry, column, direction) {
    const normalizedColumn = this.normalizeLibraryColumn(column);
    const field = this.resolveLibraryColumnField(normalizedColumn);
    const directionFactor = direction === "desc" ? -1 : 1;
    const getLibraryEntryNoteTitle = (entry) => {
      var _a, _b;
      return ((_a = entry.noteFile) == null ? void 0 : _a.basename) || ((_b = entry.notePathShort.split("/").pop()) == null ? void 0 : _b.replace(/\.md$/i, "")) || entry.citeKey;
    };
    let firstValue = "";
    let secondValue = "";
    if (field === "Obsidian Notes") {
      firstValue = getLibraryEntryNoteTitle(firstEntry);
      secondValue = getLibraryEntryNoteTitle(secondEntry);
    } else if (field === "citationKey") {
      firstValue = firstEntry.citeKey;
      secondValue = secondEntry.citeKey;
    } else if (field === "date" || field === "Year") {
      firstValue = firstEntry.year;
      secondValue = secondEntry.year;
    } else if (field === "itemType" || field === "Type") {
      firstValue = firstEntry.itemType;
      secondValue = secondEntry.itemType;
    } else if (field === "title" || field === "Title") {
      firstValue = firstEntry.title;
      secondValue = secondEntry.title;
    } else if (field === "creators" || field === "Authors") {
      firstValue = firstEntry.authors;
      secondValue = secondEntry.authors;
    } else if (field === "publicationTitle" || field === "Publication") {
      firstValue = firstEntry.publication;
      secondValue = secondEntry.publication;
    } else if (field === "tags" || field === "Tags") {
      firstValue = firstEntry.tags;
      secondValue = secondEntry.tags;
    } else if (field === "collections" || field === "Collections") {
      firstValue = firstEntry.collections;
      secondValue = secondEntry.collections;
    } else if (field === "parentCollections" || field === "Parent Collections") {
      firstValue = firstEntry.parentCollections;
      secondValue = secondEntry.parentCollections;
    } else if (field === "dateAdded" || field === "Added") {
      firstValue = firstEntry.dateAdded;
      secondValue = secondEntry.dateAdded;
    } else if (field === "Actions") {
      firstValue = firstEntry.noteFile != null ? "0" : "1";
      secondValue = secondEntry.noteFile != null ? "0" : "1";
    } else {
      firstValue = (firstEntry.customFieldValues || {})[field] || "";
      secondValue = (secondEntry.customFieldValues || {})[field] || "";
    }
    const normalizedFirst = String(firstValue || "").toLowerCase();
    const normalizedSecond = String(secondValue || "").toLowerCase();
    if (normalizedFirst < normalizedSecond) return -1 * directionFactor;
    if (normalizedFirst > normalizedSecond) return 1 * directionFactor;
    return firstEntry.citeKey.localeCompare(secondEntry.citeKey) * directionFactor;
  }
  registerBibFileWatcher() {
    const scheduleImport = (file) => {
      const bibPath = (0, import_obsidian5.normalizePath)(this.settings.bibPath || "");
      if (bibPath === "" || file.path !== bibPath) return;
      this.scheduleLibraryViewRefresh();
      if (this.settings.autoImportOnBibChange === true) {
        this.scheduleAutoImport();
      }
    };
    const scheduleRefreshForReferenceNote = (file) => {
      const exportPath = (0, import_obsidian5.normalizePath)(this.settings.exportPath || "");
      if (exportPath === "") return;
      if (file.path.startsWith(exportPath + "/") && file.path.endsWith(".md")) {
        this.scheduleLibraryViewRefresh();
      }
    };
    this.registerEvent(this.app.vault.on("modify", (file) => {
      scheduleImport(file);
      scheduleRefreshForReferenceNote(file);
    }));
    this.registerEvent(this.app.vault.on("create", (file) => {
      scheduleImport(file);
      scheduleRefreshForReferenceNote(file);
    }));
    this.registerEvent(this.app.vault.on("delete", (file) => {
      scheduleRefreshForReferenceNote(file);
    }));
    this.registerEvent(this.app.vault.on("rename", (file) => {
      scheduleRefreshForReferenceNote(file);
    }));
  }
  scheduleAutoImport() {
    if (this.autoImportDebounce != void 0) {
      window.clearTimeout(this.autoImportDebounce);
    }
    this.autoImportDebounce = window.setTimeout(() => {
      this.autoImportDebounce = void 0;
      this.runTask(this.runAutoImport());
    }, 1500);
  }
  scheduleLibraryViewRefresh() {
    if (this.libraryViewRefreshDebounce != void 0) {
      window.clearTimeout(this.libraryViewRefreshDebounce);
    }
    this.libraryViewRefreshDebounce = window.setTimeout(() => {
      this.libraryViewRefreshDebounce = void 0;
      this.runTask(this.refreshLibraryViews());
    }, 1500);
  }
  async runAutoImport() {
    if (this.isAutoImportRunning) return;
    this.isAutoImportRunning = true;
    try {
      const data = await this.loadBibData();
      if (data == null) return;
      const updatedEntries = await this.updateLibraryEntries(data);
      if (updatedEntries.length > 0) {
        new import_obsidian5.Notice(`Zotero Lib View auto-imported ${updatedEntries.length} updated reference(s)`);
      }
    } catch (e) {
      new import_obsidian5.Notice("Zotero Lib View auto-import failed");
    } finally {
      this.isAutoImportRunning = false;
    }
  }
  async loadBibData(silent = false) {
    try {
      const bibPath = vaultRelativePath(this.settings.bibPath);
      const exists = await this.app.vault.adapter.exists(bibPath);
      if (!exists) {
        if (!silent) new import_obsidian5.Notice("No BetterBibTex Json file found at " + bibPath);
        this.discoveredLibraryFields = [];
        this.discoveredSubFields = {};
        return void 0;
      }
      const rawdata = await this.app.vault.adapter.read(bibPath);
      const data = parseBibData(rawdata);
      this.discoveredLibraryFields = discoverLibraryFieldNames(data);
      this.discoveredSubFields = discoverLibrarySubFields(data);
      return data;
    } catch (e) {
      if (!silent) new import_obsidian5.Notice("Failed to read BetterBibTex Json file");
      this.discoveredLibraryFields = [];
      this.discoveredSubFields = {};
      return void 0;
    }
  }
  async refreshDiscoveredLibraryFields(silent = false) {
    await this.loadBibData(silent);
  }
  resolveLibraryEntryNoteFile(selectedEntry, notePathShort) {
    const normalizedPath = (0, import_obsidian5.normalizePath)(notePathShort).replace(/^\/+/, "");
    const directMatch = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (directMatch instanceof import_obsidian5.TFile) return directMatch;
    return null;
  }
  buildLibraryEntries(data) {
    const divider = normalizeDivider(this.settings.multipleFieldsDivider);
    const entries = [];
    for (let index = 0; index < data.items.length; index++) {
      const selectedEntry = data.items[index];
      if (Object.prototype.hasOwnProperty.call(selectedEntry, "citationKey") == false) continue;
      selectedEntry.authorKey = createAuthorKey(selectedEntry.creators);
      selectedEntry.authorKeyInitials = createAuthorKeyInitials(selectedEntry.creators);
      selectedEntry.authorKeyFullName = createAuthorKeyFullName(selectedEntry.creators);
      if (Object.prototype.hasOwnProperty.call(selectedEntry, "date")) {
        selectedEntry.year = (selectedEntry.date.match(/\d{4}/g) || []).join(",");
      }
      const notePathShort = createNoteTitle(selectedEntry, this.settings.exportTitle, this.settings.exportPath).replace(/^\/+/, "");
      const noteFile = this.resolveLibraryEntryNoteFile(selectedEntry, notePathShort);
      const tagsArray = getTagsForLibraryEntry(selectedEntry);
      const authors = formatPrimaryCreatorListForLibrary(selectedEntry.creators || [], divider, this.settings.nameFormat);
      const year = normalizeYearForLibrary(selectedEntry.date);
      const publication = selectedEntry.publicationTitle || "";
      const title = selectedEntry.title || "";
      const collections = getCollectionsForLibraryEntry(selectedEntry, data, divider);
      const parentCollections = getParentCollectionsForLibraryEntry(selectedEntry, data, divider);
      const customFieldValues = {};
      const searchValues = [];
      collectLibrarySearchValues(selectedEntry, searchValues);
      if (collections !== "") searchValues.push(collections);
      if (parentCollections !== "") searchValues.push(parentCollections);
      const fieldMappings = {};
      this.getLibraryViewColumns().forEach((col) => {
        const parts = col.split("|");
        if (parts.length >= 3 && parts[2]) {
          fieldMappings[parts[1] || parts[0]] = parts[2];
        }
      });
      (this.discoveredLibraryFields || []).forEach((field) => {
        const mappingProperty = fieldMappings[field] || (this.settings.fieldPropertyMapping || {})[field];
        customFieldValues[field] = formatLibraryFieldValue(selectedEntry[field], divider, mappingProperty);
      });
      const pdfAttachment = selectedEntry.attachments.find((a) => a.contentType === "application/pdf" || a.path.toLowerCase().endsWith(".pdf"));
      entries.push({
        citeKey: selectedEntry.citationKey,
        year,
        itemType: normalizeItemTypeForLibrary(selectedEntry.itemType),
        title,
        authors,
        publication,
        tags: tagsArray.join(divider),
        tagsArray,
        collections,
        parentCollections,
        dateAdded: selectedEntry.dateAdded || "",
        dateAddedShort: selectedEntry.dateAdded ? String(selectedEntry.dateAdded).slice(0, 10) : "",
        url: selectedEntry.url || "",
        zoteroLink: selectedEntry.select || selectedEntry.uri || "",
        pdfLink: ((pdfAttachment == null ? void 0 : pdfAttachment.select) || "").replace("select", "open-pdf"),
        pdfName: ((pdfAttachment == null ? void 0 : pdfAttachment.path) || "").split(/[\\/]/).pop() || "",
        rawEntry: selectedEntry,
        rawData: data,
        notePathShort,
        noteFile,
        customFieldValues,
        searchText: searchValues.join(" ").toLowerCase()
      });
    }
    entries.sort((firstEntry, secondEntry) => secondEntry.dateAdded.localeCompare(firstEntry.dateAdded) || firstEntry.citeKey.localeCompare(secondEntry.citeKey));
    return entries;
  }
  async updateLibraryEntries(data) {
    const bibtexArray = [];
    const lastUpdate = new Date(this.settings.lastUpdateDate);
    for (let index = 0; index < data.items.length; index++) {
      const selectedEntry = data.items[index];
      if (Object.prototype.hasOwnProperty.call(selectedEntry, "citationKey") == false) continue;
      const noteDateModifiedArray = [];
      noteDateModifiedArray.push(selectedEntry.dateModified);
      if (selectedEntry.notes) {
        for (let index2 = 0; index2 < selectedEntry.notes.length; index2++) {
          noteDateModifiedArray.push(selectedEntry.notes[index2].dateModified);
        }
      }
      noteDateModifiedArray.sort((firstElement, secondElement) => {
        if (firstElement > secondElement) return -1;
        if (firstElement < secondElement) return 1;
        return 0;
      });
      const datemodified = new Date(noteDateModifiedArray[0]);
      if (datemodified < lastUpdate) continue;
      if (this.settings.updateLibrary === "Only update existing notes" && !await this.app.vault.adapter.exists(createNoteTitle(selectedEntry, this.settings.exportTitle, this.settings.exportPath))) {
        continue;
      }
      await this.createNote(selectedEntry, data);
      bibtexArray.push(selectedEntry.citationKey);
    }
    this.settings.lastUpdateDate = /* @__PURE__ */ new Date();
    await this.saveSettings();
    await this.refreshLibraryViews();
    return bibtexArray;
  }
  createFormatting() {
    const {
      highlightCustomTextAfter,
      highlightCustomTextBefore,
      isCommentItalic,
      isCommentBold,
      isCommentHighlighted,
      isCommentColoured,
      isCommentBullet,
      isCommentBlockquote,
      isCommentQuote,
      commentCustomTextAfter,
      commentCustomTextBefore,
      isHighlightItalic,
      isHighlightBold,
      isHighlightHighlighted,
      isHighlightColoured,
      isHighlightBullet,
      isHighlightBlockquote,
      isHighlightQuote,
      tagCustomTextAfter,
      tagCustomTextBefore,
      isTagItalic,
      isTagBold,
      isTagHighlighted,
      isTagColoured,
      isTagBullet,
      isTagBlockquote,
      isTagQuote,
      isTagHash
    } = this.settings;
    const [
      highlightItalic,
      highlightBold,
      highlightHighlighted,
      highlightBullet,
      highlightBlockquote,
      highlightQuoteOpen,
      highlightQuoteClose
    ] = [
      isHighlightItalic ? "*" : "",
      isHighlightBold ? "**" : "",
      isHighlightHighlighted == true && isHighlightColoured == false ? "==" : "",
      isHighlightBullet ? "- " : "",
      isHighlightBlockquote ? "> " : "",
      isHighlightQuote ? "\u201C" : "",
      isHighlightQuote ? "\u201D" : ""
    ];
    let highlightColouredBefore = "";
    let highlightColouredAfter = "";
    if (isHighlightColoured == true) {
      highlightColouredBefore = '<mark style="background: SELECTED_COLOUR">';
      highlightColouredAfter = "</mark>";
    }
    const highlightFormatBefore = highlightHighlighted + highlightColouredBefore + highlightBold + highlightItalic + highlightQuoteOpen;
    const highlightFormatAfter = highlightQuoteClose + highlightItalic + highlightBold + highlightColouredAfter + highlightHighlighted + highlightCustomTextAfter;
    let highlightPrepend = "";
    if (highlightBullet != "" || highlightBlockquote != "") {
      highlightPrepend = "\n" + highlightBullet + highlightBlockquote + highlightCustomTextBefore;
    }
    const commentItalic = isCommentItalic ? "*" : "";
    const commentBold = isCommentBold ? "**" : "";
    const commentHighlighted = isCommentHighlighted == true && isCommentColoured == false ? "==" : "";
    const commentBullet = isCommentBullet ? "- " : "";
    const commentBlockquote = isCommentBlockquote ? "> " : "";
    const commentQuoteOpen = isCommentQuote ? "\u201C" : "";
    const commentQuoteClose = isCommentQuote ? "\u201D" : "";
    let commentColouredBefore = "";
    let commentColouredAfter = "";
    if (isCommentColoured == true) {
      commentColouredBefore = '<mark style="background: SELECTED_COLOUR">';
      commentColouredAfter = "</mark>";
    }
    const commentFormatBefore = commentHighlighted + commentColouredBefore + commentBold + commentItalic + commentQuoteOpen;
    const commentFormatAfter = commentQuoteClose + commentItalic + commentBold + commentColouredAfter + commentHighlighted + commentCustomTextAfter;
    let commentPrepend = "";
    if (commentBullet != "" || commentBlockquote != "") {
      commentPrepend = "\n" + commentBullet + commentBlockquote + commentCustomTextBefore;
    }
    const [
      tagHash,
      tagItalic,
      tagBold,
      tagHighlighted,
      tagBullet,
      tagBlockquote,
      tagQuoteOpen,
      tagQuoteClose
    ] = [
      isTagHash ? "#" : "",
      isTagItalic ? "*" : "",
      isTagBold ? "**" : "",
      isTagHighlighted == true && isTagColoured == false ? "==" : "",
      isTagBullet ? "- " : "",
      isTagBlockquote ? "> " : "",
      isTagQuote ? "\u201C" : "",
      isTagQuote ? "\u201D" : ""
    ];
    let tagColouredBefore = "";
    let tagColouredAfter = "";
    if (isTagColoured == true) {
      tagColouredBefore = '<mark style="background: SELECTED_COLOUR">';
      tagColouredAfter = "</mark>";
    }
    const tagFormatBefore = tagHash + tagHighlighted + tagColouredBefore + tagBold + tagItalic + tagQuoteOpen;
    const tagFormatAfter = tagQuoteClose + tagItalic + tagBold + tagColouredAfter + tagHighlighted + tagCustomTextAfter;
    let tagPrepend = "";
    if (tagBullet != "" || tagBlockquote != "") {
      tagPrepend = "\n" + tagBullet + tagBlockquote + tagCustomTextBefore;
    } else {
      tagPrepend = tagBullet + tagBlockquote + tagCustomTextBefore;
    }
    return {
      highlightFormatBefore,
      highlightFormatAfter,
      highlightPrepend,
      commentFormatBefore,
      commentFormatAfter,
      commentPrepend,
      tagFormatBefore,
      tagFormatAfter,
      tagPrepend
    };
  }
  parseMetadata(selectedEntry, templateOriginal) {
    const template = templateOriginal;
    let note = template;
    note = createCreatorList(
      selectedEntry.creators,
      "author",
      note,
      this.settings.multipleFieldsDivider,
      this.settings.nameFormat
    );
    note = createCreatorList(
      selectedEntry.creators,
      "editor",
      note,
      this.settings.multipleFieldsDivider,
      this.settings.nameFormat
    );
    note = createCreatorAllList(
      selectedEntry.creators,
      note,
      this.settings.multipleFieldsDivider,
      this.settings.nameFormat
    );
    if (Object.prototype.hasOwnProperty.call(selectedEntry, "date")) {
      selectedEntry.year = (selectedEntry.date.match(/\d{4}/g) || []).join(",");
    }
    if (Object.prototype.hasOwnProperty.call(selectedEntry, "select")) {
      selectedEntry.localLibrary = "[Zotero](" + selectedEntry.select + ")";
      selectedEntry.localLibraryLink = selectedEntry.select;
    }
    selectedEntry.citeKey = selectedEntry.citationKey;
    if (selectedEntry.itemType == "journalArticle") {
      selectedEntry.itemType = "Journal Article";
    }
    if (selectedEntry.itemType == "report") {
      selectedEntry.itemType = "Report";
    }
    if (selectedEntry.itemType == "bookSection") {
      selectedEntry.itemType = "Book Section";
    }
    if (selectedEntry.itemType == "newspaperArticle") {
      selectedEntry.itemType = "Newspaper Article";
    }
    if (selectedEntry.itemType == "book") {
      selectedEntry.itemType = "Book";
    }
    selectedEntry.itemType = selectedEntry.itemType.charAt(0).toUpperCase() + selectedEntry.itemType.slice(1);
    selectedEntry.citationInLine = createAuthorKey(selectedEntry.creators) + " (" + selectedEntry.year + ")";
    selectedEntry.citationInLine = selectedEntry.citationInLine.replace("()", "");
    selectedEntry.citationInLineInitials = createAuthorKeyInitials(selectedEntry.creators) + " (" + selectedEntry.year + ")";
    selectedEntry.citationInLineInitials = selectedEntry.citationInLineInitials.replace("()", "");
    selectedEntry.citationInLineFullName = createAuthorKeyFullName(selectedEntry.creators) + " (" + selectedEntry.year + ")";
    selectedEntry.citationInLineFullName = selectedEntry.citationInLineFullName.replace("()", "");
    if (selectedEntry.itemType == "Journal Article") {
      selectedEntry.citationShort = selectedEntry.citationInLine + " '" + selectedEntry.title + "'";
      selectedEntry.citationFull = selectedEntry.citationShort + ", *" + selectedEntry.publicationTitle + "*, " + selectedEntry.volume + "(" + selectedEntry.issue + "), pp. " + selectedEntry.pages + ".";
      selectedEntry.citationFull = selectedEntry.citationFull.replace("() ", "");
      selectedEntry.citationShort = selectedEntry.citationShort.replace("** ", "");
      selectedEntry.citationFull = selectedEntry.citationFull.replace("** ", "");
      selectedEntry.citationFull = selectedEntry.citationFull.replace("pp. ", "");
    }
    const templateEntry = attachmentTemplateFields(selectedEntry);
    note = replaceAllTemplates(Object.keys(templateEntry), note, templateEntry);
    note = note.replace(/```/g, "HEREISAPLACEHOLDERFORBACKTICK");
    note = note.replace(/`/g, "'");
    note = note.replace(/HEREISAPLACEHOLDERFORBACKTICK/g, "```");
    note = note.replace(
      "```ad-quote\ntitle: Abstract\n```\n",
      ""
    );
    note = note.replace(
      "```ad-abstract\ntitle: Files and Links\n```\n",
      ""
    );
    note = note.replace(
      "```ad-note\ntitle: Tags and Collections\n```",
      ""
    );
    return note;
  }
  // FUNCTION TO PARSE ANNOTATION
  parseAnnotationLinesintoElementsZotfile(note) {
    const lines = note.split(/<p>/gm);
    const noteElements = [];
    for (let indexLines = 0; indexLines < lines.length; indexLines++) {
      const selectedLineOriginal = lines[indexLines];
      const selectedLine = selectedLineOriginal.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      );
      if (selectedLine === "") {
        continue;
      }
      const lineElements = createAnnotationElements({
        highlightText: "",
        highlightColour: "",
        annotationType: "",
        citeKey: "",
        commentText: "",
        rowOriginal: selectedLine,
        rowEdited: selectedLine,
        indexNote: void 0,
        foundOld: void 0,
        positionOld: void 0,
        extractionSource: "zotfile",
        colourTextAfter: "",
        colourTextBefore: "",
        // added missing properties
        imagePath: "",
        pagePDF: 0,
        pageLabel: 0,
        attachmentURI: "",
        zoteroBackLink: "",
        annotationKey: ""
      });
      lineElements.citeKey = String(selectedLine.match(/\(([^)]+)\)+$/g));
      if (lineElements.citeKey == `null`) {
        lineElements.citeKey = String(selectedLine.match(/\(([^D+]+) \d+\S+\)/g));
      }
      const posCiteKeyBegins = selectedLine.indexOf(lineElements.citeKey);
      let extractedText = "";
      if (posCiteKeyBegins !== -1) {
        extractedText = selectedLine.substring(0, posCiteKeyBegins - 1).trim();
        ["\u201C", '"', "`", "'"].forEach(
          (quote) => extractedText = removeQuoteFromStart(
            quote,
            extractedText
          )
        );
        ["\u201D", '"', "`", "'"].forEach(
          (quote) => extractedText = removeQuoteFromEnd(
            quote,
            extractedText
          )
        );
      }
      if (extractedText.startsWith("(Yellow) - ")) {
        lineElements.highlightColour = "yellow";
        extractedText = extractedText.replace("(Yellow) - ", "");
      }
      if (extractedText.startsWith("(Black) - ")) {
        lineElements.highlightColour = "black";
        extractedText = extractedText.replace("(Black) - ", "");
      }
      if (extractedText.startsWith("(White) - ")) {
        lineElements.highlightColour = "white";
        extractedText = extractedText.replace("(White) - ", "");
      }
      if (extractedText.startsWith("(Gray) - ")) {
        lineElements.highlightColour = "gray";
        extractedText = extractedText.replace("(Gray) - ", "");
      }
      if (extractedText.startsWith("(Red) - ")) {
        lineElements.highlightColour = "red";
        extractedText = extractedText.replace("(Red) - ", "");
      }
      if (extractedText.startsWith("(Orange) - ")) {
        lineElements.highlightColour = "orange";
        extractedText = extractedText.replace("(Orange) - ", "");
      }
      if (extractedText.startsWith("(Green) - ")) {
        lineElements.highlightColour = "green";
        extractedText = extractedText.replace("(Green) - ", "");
      }
      if (extractedText.startsWith("(Cyan) - ")) {
        lineElements.highlightColour = "cyan";
        extractedText = extractedText.replace("(Cyan) - ", "");
      }
      if (extractedText.startsWith("(Blue) - ")) {
        lineElements.highlightColour = "blue";
        extractedText = extractedText.replace("(Blue) - ", "");
      }
      if (extractedText.startsWith("(Magenta) - ")) {
        lineElements.highlightColour = "magenta";
        extractedText = extractedText.replace("(Magenta) - ", "");
      }
      lineElements.zoteroBackLink = "";
      if (/zotero:\/\/open-pdf\/library\/items\/\S+page=\d+/g.test(
        selectedLineOriginal
      )) {
        const zoteroBackLink = String(
          selectedLineOriginal.match(
            /zotero:\/\/open-pdf\/library\/items\/\S+page=\d+/g
          )
        );
        lineElements.zoteroBackLink = zoteroBackLink;
      }
      if (/(\d+)(?!.*\d)/g.test(selectedLineOriginal)) {
        const pageLabel = String(
          selectedLineOriginal.match(/(\d+)(?!.*\d)/g)
        );
        if (pageLabel == null) {
          lineElements.pageLabel = null;
        } else {
          lineElements.pageLabel = Number(pageLabel);
        }
      }
      const annotationCommentAll = "";
      if (lineElements.citeKey.includes("(note on p.")) {
        lineElements.commentText = extractedText;
        lineElements.citeKey = "";
      } else {
        lineElements.highlightText = extractedText;
      }
      let firstBlank = -1;
      let annotationCommentFirstWord = "";
      if (lineElements.commentText.length > 0) {
        firstBlank = lineElements.commentText.indexOf(" ");
        if (firstBlank === -1) {
          firstBlank = lineElements.commentText.length;
        }
        annotationCommentFirstWord = lineElements.commentText.substring(
          0,
          firstBlank
        );
      }
      lineElements.annotationType = this.getAnnotationType(
        annotationCommentFirstWord,
        lineElements.commentText
      );
      if (firstBlank == -1) {
        firstBlank = annotationCommentAll.length;
      }
      lineElements.commentText = lineElements.annotationType === "noKey" ? lineElements.commentText : lineElements.commentText.substring(
        firstBlank,
        lineElements.commentText.length
      ).trim();
      if (noteElements.length > 1) {
        if (lineElements.annotationType != "noKey" && noteElements[noteElements.length - 1].annotationType === "noKey" && noteElements[noteElements.length - 1].commentText === "") {
          noteElements[noteElements.length - 1].annotationType = lineElements.annotationType;
          noteElements[noteElements.length - 1].commentText = lineElements.commentText;
          continue;
        }
      }
      noteElements.push(lineElements);
    }
    return noteElements;
  }
  parseAnnotationLinesintoElementsUserNote(note) {
    const turndownService = new turndown_browser_es_default();
    note = turndownService.turndown(note);
    note = note.replace(/`/g, "'").replace(/, p. p. /g, ", p. ").trim();
    const lines = note.split(/<\/h1>|\n\n|<\/p>/gm);
    const noteElements = [];
    const lengthLines = Object.keys(lines).length;
    for (let indexLines = 0; indexLines < lengthLines; indexLines++) {
      const selectedLineOriginal = decodeLegacyEscapes(lines[indexLines]);
      let selectedLine = replaceTemplate(selectedLineOriginal, "`", "'");
      selectedLine = replaceTemplate(selectedLine, "&amp;", "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
      const lineElements = createAnnotationElements({
        highlightText: "",
        highlightColour: "",
        annotationType: "",
        citeKey: "",
        commentText: "",
        rowOriginal: selectedLine,
        rowEdited: selectedLine,
        indexNote: void 0,
        foundOld: void 0,
        positionOld: void 0,
        extractionSource: "UserNote",
        colourTextBefore: "",
        colourTextAfter: "",
        imagePath: "",
        pagePDF: 0,
        pageLabel: 0,
        attachmentURI: "",
        zoteroBackLink: "",
        annotationKey: ""
      });
      lineElements.rowEdited = selectedLine;
      noteElements.push(lineElements);
    }
    return noteElements;
  }
  parseAnnotationLinesintoElementsZotero(note) {
    note = note.replace(/`/g, "'").replace(/, p. p. /g, ", p. ").trim();
    const lines = note.split(/<\/h1>|<\/p>|<h1>/gm);
    const noteElements = [];
    const lengthLines = Object.keys(lines).length;
    for (let indexLines = 1; indexLines < lengthLines; indexLines++) {
      const selectedLineOriginal = decodeLegacyEscapes(lines[indexLines]);
      let selectedLine = String(
        selectedLineOriginal.replace(/<\/?[^>]+(>|$)/g, "")
      );
      selectedLine = replaceTemplate(selectedLine, "`", "'");
      selectedLine = replaceTemplate(selectedLine, "&amp;", "&");
      const lineElements = createAnnotationElements({
        highlightText: "",
        highlightColour: "",
        annotationType: "",
        citeKey: "",
        commentText: "",
        inlineTagsText: "",
        inlineTagsArray: [],
        rowOriginal: selectedLine,
        rowEdited: selectedLine,
        indexNote: void 0,
        foundOld: void 0,
        positionOld: void 0,
        extractionSource: "zotero",
        colourTextBefore: "",
        colourTextAfter: "",
        imagePath: "",
        pagePDF: void 0,
        pageLabel: void 0,
        zoteroBackLink: "",
        attachmentURI: "",
        annotationKey: ""
      });
      lineElements.extractionSource = "zotero";
      if (/data-attachment-key=/gm.test(selectedLineOriginal)) {
        lineElements.annotationType = "typeImage";
        lineElements.imagePath = String(
          selectedLineOriginal.match(/key="([^"]*)"/g)[0]
        ).replaceAll('"', "").replace("key=", "");
      }
      if (/"color":"#......"/gm.test(selectedLineOriginal)) {
        let highlightColour = String(
          selectedLineOriginal.match(/"color":"#......"/gm)
        );
        if (highlightColour == null) {
          highlightColour = "";
        }
        highlightColour = highlightColour.replace('color":', "");
        highlightColour = highlightColour.replace('"', "");
        lineElements.highlightColour = highlightColour;
      }
      if (/"pageIndex":\d+/gm.test(selectedLineOriginal)) {
        let pagePDF = String(
          selectedLineOriginal.match(/"pageIndex":\d+/gm)
        );
        if (pagePDF == null) {
          lineElements.pagePDF = null;
        } else {
          pagePDF = pagePDF.replace('"pageIndex":', "");
          lineElements.pagePDF = Number(pagePDF) + 1;
        }
      }
      if (/"pageLabel":"\d+/g.test(selectedLineOriginal)) {
        let pageLabel = String(
          selectedLineOriginal.match(/"pageLabel":"\d+/g)
        );
        if (pageLabel == null) {
          lineElements.pageLabel = null;
        } else {
          pageLabel = pageLabel.replace('"pageLabel":"', "");
          lineElements.pageLabel = Number(pageLabel);
        }
      }
      if (/attachmentURI":"http:\/\/zotero\.org\/users\/\d+\/items\/\w+/gm.test(
        selectedLineOriginal
      )) {
        let attachmentURI = String(
          selectedLineOriginal.match(
            /attachmentURI":"http:\/\/zotero\.org\/users\/\d+\/items\/\w+/gm
          )
        );
        if (attachmentURI === null) {
          lineElements.attachmentURI = null;
        } else {
          attachmentURI = attachmentURI.replace(
            /attachmentURI":"http:\/\/zotero\.org\/users\/\d+\/items\//gm,
            ""
          );
          lineElements.attachmentURI = attachmentURI;
        }
      }
      if (/"attachmentURI":"http:\/\/zotero.org\/users\/local\/[a-zA-Z0-9]*\/items\/[a-zA-Z0-9]*/gm.test(
        selectedLineOriginal
      )) {
        let attachmentURI = String(
          selectedLineOriginal.match(
            /"attachmentURI":"http:\/\/zotero.org\/users\/local\/[a-zA-Z0-9]*\/items\/[a-zA-Z0-9]*/gm
          )
        );
        if (attachmentURI === null) {
          lineElements.attachmentURI = null;
        } else {
          attachmentURI = attachmentURI.replace(
            /"attachmentURI":"http:\/\/zotero.org\/users\/local\/[a-zA-Z0-9]*\/items\//gm,
            ""
          );
          lineElements.attachmentURI = attachmentURI;
        }
      }
      if (/"uris":\["http:\/\/zotero\.org\/users\/\d+\/items\/\w+/gm.test(
        selectedLineOriginal
      ) && lineElements.attachmentURI == "") {
        let attachmentURI = String(
          selectedLineOriginal.match(
            /"uris":\["http:\/\/zotero\.org\/users\/\d+\/items\/\w+/g
          )
        );
        if (attachmentURI === null) {
          lineElements.attachmentURI = null;
        } else {
          attachmentURI = attachmentURI.replace(
            /"uris":\["http:\/\/zotero\.org\/users\/\d+\/items\//g,
            ""
          );
          lineElements.attachmentURI = attachmentURI;
        }
      }
      if (/"annotationKey":"[a-zA-Z0-9]+/gm.test(selectedLineOriginal)) {
        let annotationKey = String(selectedLineOriginal.match(/"annotationKey":"[a-zA-Z0-9]+/gm));
        if (annotationKey === null) {
          lineElements.annotationKey = null;
        } else {
          annotationKey = annotationKey.replace(/"annotationKey":"/gm, "");
          lineElements.annotationKey = annotationKey;
        }
      }
      if (lineElements.attachmentURI !== null && lineElements.pagePDF !== null && lineElements.annotationKey !== null) {
        lineElements.zoteroBackLink = "zotero://open-pdf/library/items/" + lineElements.attachmentURI + "?page=" + lineElements.pagePDF + "&annotation=" + lineElements.annotationKey;
      }
      if (/\(<span class="citation-item">.*<\/span>\)<\/span>/gm.test(
        selectedLineOriginal
      )) {
        lineElements.citeKey = String(
          selectedLineOriginal.match(
            /\(<span class="citation-item">.*<\/span>\)<\/span>/gm
          )
        );
        lineElements.citeKey = lineElements.citeKey.replace(
          '(<span class="citation-item">',
          ""
        );
        lineElements.citeKey = lineElements.citeKey.replace(
          "</span>)</span>",
          ""
        );
        lineElements.citeKey = "(" + lineElements.citeKey + ")";
      }
      const beginningCiteKey = selectedLine.indexOf(lineElements.citeKey);
      const endCiteKey = selectedLine.indexOf(lineElements.citeKey) + lineElements.citeKey.length;
      if (endCiteKey !== 0) {
        lineElements.highlightText = selectedLine.substring(0, beginningCiteKey - 1).trim();
        lineElements.highlightText = lineElements.highlightText.replace(/(\p{Unified_Ideograph})\s+(?=\p{Unified_Ideograph})/ug, "$1");
        ["\u201C", '"', "`", "'"].forEach(
          (quote) => lineElements.highlightText = removeQuoteFromStart(
            quote,
            lineElements.highlightText
          )
        );
        ["\u201D", '"', "`", "'"].forEach(
          (quote) => lineElements.highlightText = removeQuoteFromEnd(
            quote,
            lineElements.highlightText
          )
        );
      }
      if (endCiteKey > 0) {
        const annotationCommentAll = selectedLine.substring(endCiteKey + 1).trim();
        let firstBlank = annotationCommentAll.indexOf(" ");
        const annotationCommentFirstWord = annotationCommentAll.substring(0, firstBlank);
        if (lineElements.annotationType !== "typeImage") {
          lineElements.annotationType = this.getAnnotationType(
            annotationCommentFirstWord,
            annotationCommentAll
          );
        }
        lineElements.commentText = "";
        if (firstBlank == -1) {
          firstBlank = annotationCommentAll.length;
        }
        lineElements.commentText = lineElements.annotationType === "noKey" || lineElements.annotationType === "typeImage" ? annotationCommentAll : annotationCommentAll.substring(
          firstBlank,
          annotationCommentAll.length
        ).trim();
        if (lineElements.commentText.includes(this.settings.TagBeginningConfig)) {
          if (this.settings.TagEndConfig.length == 0) {
            lineElements.inlineTagsText = lineElements.commentText.slice(
              lineElements.commentText.indexOf(this.settings.TagBeginningConfig),
              lineElements.commentText.length
            );
          } else {
            lineElements.inlineTagsText = lineElements.commentText.slice(
              lineElements.commentText.indexOf(this.settings.TagBeginningConfig),
              lineElements.commentText.lastIndexOf(this.settings.TagEndConfig)
            );
          }
          lineElements.commentText = lineElements.commentText.replace(lineElements.inlineTagsText, "").trim();
        }
        if (typeof lineElements.inlineTagsText !== `undefined`) {
          lineElements.inlineTagsText = lineElements.inlineTagsText.replace(this.settings.TagBeginningConfig, "");
          if (this.settings.TagEndConfig.length != 0) {
            lineElements.inlineTagsText = lineElements.inlineTagsText.replace(this.settings.TagEndConfig, "");
          }
          lineElements.inlineTagsArray = lineElements.inlineTagsText.split(this.settings.TagDividerConfig);
          if (lineElements.annotationType !== "typeImage") {
            for (let indexTag = 0; indexTag < lineElements.inlineTagsArray.length; indexTag++) {
              const tempAnnotationType = this.getAnnotationType(
                lineElements.inlineTagsArray[indexTag],
                annotationCommentAll
              );
              if (tempAnnotationType != "noKey") {
                lineElements.annotationType = tempAnnotationType;
                lineElements.inlineTagsArray.splice(indexTag, 1);
                break;
              }
            }
          }
        }
      } else {
        lineElements.rowEdited = selectedLine;
      }
      noteElements.push(lineElements);
    }
    return noteElements;
  }
  formatColourHighlight(lineElements) {
    if (lineElements.annotationType === "typeImage") {
      return lineElements;
    }
    if (lineElements.highlightColour.includes("#ffd400")) {
      lineElements.highlightColour = "yellow";
    } else if (lineElements.highlightColour.includes("#ff6666")) {
      lineElements.highlightColour = "red";
    } else if (lineElements.highlightColour.includes("#5fb236")) {
      lineElements.highlightColour = "green";
    } else if (lineElements.highlightColour.includes("#2ea8e5")) {
      lineElements.highlightColour = "blue";
    } else if (lineElements.highlightColour.includes("#a28ae5")) {
      lineElements.highlightColour = "purple";
    } else if (lineElements.highlightColour.includes(this.settings.colourCustomHexValue)) {
      lineElements.highlightColour = "customHex";
    } else {
      const HexRegex = new RegExp(/#([a-fA-F0-9]{6})/g);
      if (HexRegex.test(lineElements.highlightColour)) {
        const colorClassifier = new import_color_classifier.default(import_color_classifier.Palette.RAINBOW, import_color_classifier.AlgorithmTypes.HSV);
        lineElements.highlightColour = colorClassifier.classify(String(lineElements.highlightColour.match(HexRegex)), "hex");
      }
      if (["##000000", "#000000"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "black";
      } else if (["##FFFFFF", "#ffffff"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "white";
      } else if (["##808080", "#808080"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "gray";
      } else if (["##FF0000", "#ff0000"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "red";
      } else if (["##FFA500", "#ffa500"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "orange";
      } else if (["##FFFF00", "#ffff00"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "yellow";
      } else if (["##00FF00", "#008000", "#00ff00"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "green";
      } else if (["##00FFFF", "#00ffff"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "cyan";
      } else if (["##0000FF", "#0000ff"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "blue";
      } else if (["##FF00FF", "#800080", "#ff00ff"].some((colorStr) => lineElements.highlightColour.includes(colorStr))) {
        lineElements.highlightColour = "magenta";
      }
    }
    let colourTransformation = "";
    if (lineElements.highlightColour == "yellow") {
      colourTransformation = this.settings.colourYellowText;
    } else if (lineElements.highlightColour == "red") {
      colourTransformation = this.settings.colourRedText;
    } else if (lineElements.highlightColour == "green") {
      colourTransformation = this.settings.colourGreenText;
    } else if (lineElements.highlightColour == "blue") {
      colourTransformation = this.settings.colourBlueText;
    } else if (lineElements.highlightColour == "purple") {
      colourTransformation = this.settings.colourPurpleText;
    } else if (lineElements.highlightColour == "black") {
      colourTransformation = this.settings.colourBlackText;
    } else if (lineElements.highlightColour == "white") {
      colourTransformation = this.settings.colourWhiteText;
    } else if (lineElements.highlightColour == "gray") {
      colourTransformation = this.settings.colourGrayText;
    } else if (lineElements.highlightColour == "orange") {
      colourTransformation = this.settings.colourOrangeText;
    } else if (lineElements.highlightColour == "cyan") {
      colourTransformation = this.settings.colourCyanText;
    } else if (lineElements.highlightColour == "magenta") {
      colourTransformation = this.settings.colourMagentaText;
    } else if (lineElements.highlightColour == "customHex") {
      colourTransformation = this.settings.colourCustomHexText;
    }
    if (lineElements.annotationType == "noKey") {
      if (colourTransformation.toLowerCase() === "h1") {
        lineElements.annotationType = "typeH1";
      } else if (colourTransformation.toLowerCase() === "h2") {
        lineElements.annotationType = "typeH2";
      } else if (colourTransformation.toLowerCase() === "h3") {
        lineElements.annotationType = "typeH3";
      } else if (colourTransformation.toLowerCase() === "h4") {
        lineElements.annotationType = "typeH4";
      } else if (colourTransformation.toLowerCase() === "h5") {
        lineElements.annotationType = "typeH5";
      } else if (colourTransformation.toLowerCase() === "h6") {
        lineElements.annotationType = "typeH6";
      } else if (colourTransformation.toLowerCase() === "addtoabove") {
        lineElements.annotationType = "typeMergeAbove";
      } else if (colourTransformation.toLowerCase() === "keyword") {
        lineElements.annotationType = "typeKeyword";
      } else if (colourTransformation.toLowerCase() === "todo") {
        lineElements.annotationType = "typeTask";
      } else if (colourTransformation.toLowerCase() === "task") {
        lineElements.annotationType = "typeTask";
      }
    }
    const arr = ["{{highlight}}", "{{comment}}", "{{tag}}"];
    const containsHighlightCommentTag = arr.some((element) => {
      if (colourTransformation.includes(element)) {
        return true;
      }
      return false;
    });
    if (containsHighlightCommentTag == true) {
      lineElements.colourTemplate = colourTransformation;
    } else {
      lineElements.colourTemplate = this.settings.highlightExportTemplate;
    }
    if (colourTransformation.includes("{{highlight}}")) {
      lineElements.colourTextBefore = String(
        colourTransformation.match(/.+?(?={{highlight}})/)
      );
      if (lineElements.colourTextBefore == "null") {
        lineElements.colourTextBefore = "";
      }
      lineElements.colourTextAfter = String(
        colourTransformation.slice(colourTransformation.indexOf("{{highlight}}") + "{{highlight}}".length)
      );
      if (lineElements.colourTextAfter == "null") {
        lineElements.colourTextAfter = "";
      }
    }
    return lineElements;
  }
  async formatNoteElements(noteElements, citeKey) {
    const { isDoubleSpaced } = this.settings;
    const {
      commentFormatAfter,
      commentFormatBefore,
      commentPrepend,
      highlightFormatAfter,
      highlightFormatBefore,
      highlightPrepend,
      tagFormatBefore,
      tagFormatAfter,
      tagPrepend
    } = this.createFormatting();
    const indexRowsToBeRemoved = [];
    const noteElementsArray = [];
    const keywordArray = [];
    const rowEditedArray = [];
    const highlightsYellow = [];
    const highlightsRed = [];
    const highlightsGreen = [];
    const highlightsPurple = [];
    const highlightsBlack = [];
    const highlightsWhite = [];
    const highlightsGray = [];
    const highlightsCyan = [];
    const highlightsOrange = [];
    const highlightsBlue = [];
    const highlightsMagenta = [];
    const highlightsCustomHex = [];
    const imagesArray = [];
    noteElements = noteElements.filter((x) => x !== void 0);
    for (let i = 0; i < noteElements.length; i++) {
      let lineElements = noteElements[i];
      lineElements = this.formatColourHighlight(lineElements);
      if (lineElements.extractionSource === "zotero" || lineElements.extractionSource === "zotfile") {
        if (this.settings.highlightCitationsFormat === "Only page number" && lineElements.pageLabel !== void 0) {
          lineElements.citeKey = "(p. " + lineElements.pageLabel + ")";
        } else if (this.settings.highlightCitationsFormat === "Pandoc" && lineElements.pageLabel !== void 0) {
          lineElements.citeKey = "[@" + citeKey + ", p. " + lineElements.pageLabel + "]";
        } else if (this.settings.highlightCitationsFormat === "Pandoc" && lineElements.pageLabel === void 0) {
          lineElements.citeKey = "[@" + citeKey + "]";
        } else if (this.settings.highlightCitationsFormat === "Empty" && lineElements.pageLabel !== void 0) {
          lineElements.citeKey = " ";
        }
      }
      if (this.settings.highlightCitationsLink === true && lineElements.zoteroBackLink.length > 0) {
        if (this.settings.highlightCitationsFormat !== "Pandoc") {
          lineElements.citeKey = "[" + lineElements.citeKey + "](" + lineElements.zoteroBackLink + ")";
          lineElements.zoteroBackLink = "[ ](" + lineElements.zoteroBackLink + ")";
        } else {
          lineElements.citeKey = lineElements.citeKey + " [](" + lineElements.zoteroBackLink + ")";
          lineElements.zoteroBackLink = "[ ](" + lineElements.zoteroBackLink + ")";
        }
      } else {
        lineElements.zoteroBackLink = "";
      }
      let colourTextBefore = lineElements.colourTextBefore;
      if (colourTextBefore == void 0) {
        colourTextBefore = "";
      }
      let colourTextAfter = lineElements.colourTextAfter;
      if (colourTextAfter == void 0) {
        colourTextAfter = "";
      }
      if (lineElements.highlightText === "Extracted Annotations") {
        lineElements.annotationType = "typeExtractedHeading";
      }
      const highlightFormatBeforeColoured = highlightFormatBefore.replace("SELECTED_COLOUR", lineElements.highlightColour + ";");
      const commentFormatBeforeColoured = commentFormatBefore.replace("SELECTED_COLOUR", lineElements.highlightColour + ";");
      const tagFormatBeforeColoured = tagFormatBefore.replace("SELECTED_COLOUR", lineElements.highlightColour + ";");
      if (lineElements.annotationType === "typeExtractedHeading") {
        lineElements.rowEdited = "**" + lineElements.rowOriginal.toUpperCase() + "**";
      }
      if (lineElements.highlightText != "") {
        lineElements.highlightFormatted = highlightPrepend + highlightFormatBeforeColoured + lineElements.highlightText + highlightFormatAfter + " " + lineElements.citeKey + " ";
        lineElements.highlightFormattedNoPrepend = highlightFormatBeforeColoured + lineElements.highlightText + highlightFormatAfter + " " + lineElements.citeKey + " ";
      } else {
        lineElements.highlightFormatted = "";
        lineElements.highlightFormattedNoPrepend = "";
      }
      if (lineElements.commentText != "" && lineElements.highlightText != "") {
        lineElements.commentFormatted = commentPrepend + commentFormatBeforeColoured + lineElements.commentText + commentFormatAfter + " ";
        lineElements.commentFormattedNoPrepend = commentFormatBeforeColoured + lineElements.commentText + commentFormatAfter + " ";
      } else if (lineElements.commentText != "" && lineElements.highlightText == "") {
        lineElements.commentFormatted = commentPrepend + commentFormatBeforeColoured + lineElements.commentText + commentFormatAfter + " " + lineElements.zoteroBackLink + " ";
        lineElements.commentFormattedNoPrepend = commentFormatBeforeColoured + lineElements.commentText + commentFormatAfter + " " + lineElements.zoteroBackLink + " ";
      } else {
        lineElements.commentFormatted = "";
        lineElements.commentFormattedNoPrepend = "";
      }
      if (typeof lineElements.inlineTagsArray == "undefined") {
        lineElements.inlineTagsArray = [];
      }
      if (this.settings.isTagHash == true) {
        for (let index = 0; index < lineElements.inlineTagsArray.length; index++) {
          lineElements.inlineTagsArray[index] = lineElements.inlineTagsArray[index].replace(/ /g, "");
        }
      }
      const TempTag = lineElements.inlineTagsArray.map((i2) => tagPrepend + tagFormatBeforeColoured + i2 + tagFormatAfter);
      for (let index = 0; index < TempTag.length; index++) {
        TempTag[index] = TempTag[index].replace("##", "#");
      }
      const TempTagNoPrepend = lineElements.inlineTagsArray.map((i2) => tagFormatBeforeColoured + i2 + tagFormatAfter);
      for (let index = 0; index < TempTagNoPrepend.length; index++) {
        TempTagNoPrepend[index] = TempTagNoPrepend[index].replace("##", "#");
      }
      const allAreEmpty = (arr) => arr.every((element) => element === "");
      if (allAreEmpty(lineElements.inlineTagsArray) == false) {
        lineElements.inlineTagsFormatted = TempTag.join(" ");
        lineElements.inlineTagsFormattedNoPrepend = TempTagNoPrepend.join(" ");
      } else {
        lineElements.inlineTagsFormatted = "";
        lineElements.inlineTagsFormattedNoPrepend = "";
      }
      if (typeof lineElements.colourTemplate == "undefined") {
        lineElements.colourTemplate = this.settings.highlightExportTemplate;
      }
      if (lineElements.colourTemplate.length == 0) {
        lineElements.colourTemplate = "";
      }
      lineElements.colourTemplateFormatted = lineElements.colourTemplate.replace("{{highlight}}", lineElements.highlightFormatted);
      lineElements.colourTemplateFormatted = lineElements.colourTemplateFormatted.replace("{{comment}}", lineElements.commentFormatted);
      lineElements.colourTemplateFormatted = lineElements.colourTemplateFormatted.replace("{{tag}}", lineElements.inlineTagsFormatted);
      lineElements.colourTemplateFormatted = lineElements.colourTemplateFormatted.replace(/^\s+/g, "");
      lineElements.colourTemplateNoPrepend = lineElements.colourTemplate.replace("{{highlight}}", lineElements.highlightFormattedNoPrepend);
      lineElements.colourTemplateNoPrepend = lineElements.colourTemplateNoPrepend.replace("{{comment}}", lineElements.commentFormattedNoPrepend);
      lineElements.colourTemplateNoPrepend = lineElements.colourTemplateNoPrepend.replace("{{tag}}", lineElements.inlineTagsFormattedNoPrepend);
      lineElements.colourTemplateNoPrepend = lineElements.colourTemplateNoPrepend.replace(/^\s+/g, "");
      if (lineElements.annotationType === "noKey") {
        lineElements.rowEdited = lineElements.colourTemplateFormatted;
      }
      if (lineElements.annotationType === "typeImage") {
        lineElements.rowEdited = "";
        let pathImageOld = "";
        let pathImageNew = "";
        if (this.settings.imagesImport) {
          const sourceFolder = this.settings.zoteroStoragePathManual || this.pathZoteroStorage;
          if (!/^[A-Za-z0-9]+$/.test(lineElements.imagePath)) throw new Error("Invalid Zotero image key");
          pathImageOld = sourceFolder.replace(/[\\/]$/, "") + "/" + lineElements.imagePath + "/image.png";
          pathImageNew = vaultRelativePath(`${this.settings.imagesPath}/${citeKey}_${lineElements.imagePath}.png`);
          if (this.settings.imagesCopy) {
            if (await copyExternalImage(this.app, pathImageOld, pathImageNew))
              lineElements.rowEdited = `![[${citeKey}_${lineElements.imagePath}.png]] ${lineElements.citeKey}`;
          } else {
            lineElements.rowEdited = "![](file://" + encodeURI(pathImageOld) + ")" + lineElements.zoteroBackLink;
          }
        }
        if (lineElements.commentText.length > 0) {
          if (this.settings.imagesCommentPosition == "Below the image") {
            lineElements.rowEdited = lineElements.rowEdited + "\n\n" + lineElements.commentFormatted + lineElements.inlineTagsFormatted;
          } else {
            lineElements.rowEdited = lineElements.commentFormatted + lineElements.inlineTagsFormatted + "\n\n" + lineElements.rowEdited;
          }
        }
      }
      if (lineElements.annotationType === "typeMergeAbove") {
        noteElements[i].rowEdited = noteElements[i - 1].rowEdited.replace(/\[.*\)/, "").replace(/\s+$/g, "") + " " + lineElements.highlightFormattedNoPrepend.replace(/^\s+/g, "") + lineElements.commentFormatted + lineElements.inlineTagsFormatted;
        indexRowsToBeRemoved.push(i - 1);
      }
      if (this.settings.commentPrependDefault === true && lineElements.highlightText !== "" && lineElements.commentText !== "") {
        lineElements.annotationType = "typeCommentPrepend";
      }
      if (lineElements.annotationType === "typeCommentPrepend") {
        lineElements.rowEdited = highlightPrepend + lineElements.commentFormattedNoPrepend + lineElements.highlightFormattedNoPrepend + lineElements.inlineTagsFormatted;
      }
      if (/typeH\d/.test(lineElements.annotationType)) {
        const lastChar = lineElements.annotationType[lineElements.annotationType.length - 1];
        const level = parseInt(lastChar);
        const hashes = "#".repeat(level);
        lineElements.rowEdited = `${hashes} ` + lineElements.highlightText + lineElements.commentText + lineElements.zoteroBackLink + lineElements.inlineTagsFormatted;
      }
      if (lineElements.annotationType == "typeTask") {
        lineElements.rowEdited = `- [ ] ` + lineElements.colourTemplateNoPrepend;
      }
      if (lineElements.annotationType === "typeKeyword") {
        keywordArray.push(lineElements.highlightText);
        lineElements.rowEdited = "";
        indexRowsToBeRemoved.push(i);
      }
      noteElementsArray.push(lineElements);
    }
    if (indexRowsToBeRemoved.length) {
      for (let index = indexRowsToBeRemoved.length - 1; index >= 0; index--) {
        noteElementsArray.splice(indexRowsToBeRemoved[index], 1);
      }
    }
    for (let index = 0; index < noteElementsArray.length; index++) {
      const selectedLine = noteElementsArray[index];
      rowEditedArray.push(selectedLine.rowEdited);
      if (selectedLine.highlightColour === "yellow") {
        highlightsYellow.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "red") {
        highlightsRed.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "green") {
        highlightsGreen.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "purple") {
        highlightsPurple.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "black") {
        highlightsBlack.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "white") {
        highlightsWhite.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "gray") {
        highlightsGray.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "cyan") {
        highlightsCyan.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "orange") {
        highlightsOrange.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "blue") {
        highlightsBlue.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "magenta") {
        highlightsMagenta.push(selectedLine.rowEdited);
      } else if (selectedLine.highlightColour === "customHex") {
        highlightsCustomHex.push(selectedLine.rowEdited);
      }
      if (selectedLine.annotationType === "typeImage") {
        imagesArray.push(selectedLine.rowEdited);
      }
    }
    if (isDoubleSpaced) {
      for (let index = rowEditedArray.length - 1; index >= 0; index--) {
        rowEditedArray.splice(index, 0, "");
      }
    }
    const resultsLineElements = {
      rowEditedArray,
      keywordArray,
      highlightsYellow,
      highlightsRed,
      highlightsGreen,
      highlightsPurple,
      highlightsBlack,
      highlightsWhite,
      highlightsGray,
      highlightsCyan,
      highlightsOrange,
      highlightsBlue,
      highlightsMagenta,
      highlightsCustomHex,
      imagesArray,
      noteElements
    };
    return resultsLineElements;
  }
  getAnnotationType(annotationCommentFirstWord, annotationCommentAll) {
    const {
      keyMergeAbove,
      keyCommentPrepend,
      keyH1,
      keyH2,
      keyH3,
      keyH4,
      keyH5,
      keyH6,
      keyKeyword,
      keyTask
    } = this.settings;
    annotationCommentFirstWord = annotationCommentFirstWord.toLowerCase();
    let annotationType = "noKey";
    if (annotationCommentFirstWord === keyMergeAbove.toLowerCase() || annotationCommentAll === keyMergeAbove) {
      annotationType = "typeMergeAbove";
    } else if (annotationCommentFirstWord === keyCommentPrepend.toLowerCase()) {
      annotationType = "typeCommentPrepend";
    } else if (annotationCommentFirstWord === keyH1.toLowerCase()) {
      annotationType = "typeH1";
    } else if (annotationCommentFirstWord === keyH2.toLowerCase()) {
      annotationType = "typeH2";
    } else if (annotationCommentFirstWord === keyH3.toLowerCase()) {
      annotationType = "typeH3";
    } else if (annotationCommentFirstWord === keyH4.toLowerCase()) {
      annotationType = "typeH4";
    } else if (annotationCommentFirstWord === keyH5.toLowerCase()) {
      annotationType = "typeH5";
    } else if (annotationCommentFirstWord === keyH6.toLowerCase()) {
      annotationType = "typeH6";
    }
    if (annotationCommentAll === keyH1.toLowerCase()) {
      annotationType = "typeH1";
    } else if (annotationCommentAll === keyH2.toLowerCase()) {
      annotationType = "typeH2";
    } else if (annotationCommentAll === keyH3.toLowerCase()) {
      annotationType = "typeH3";
    } else if (annotationCommentAll === keyH4.toLowerCase()) {
      annotationType = "typeH4";
    } else if (annotationCommentAll === keyH5.toLowerCase()) {
      annotationType = "typeH5";
    } else if (annotationCommentAll === keyH6.toLowerCase()) {
      annotationType = "typeH6";
    } else if (annotationCommentAll === keyKeyword.toLowerCase() || annotationCommentFirstWord === keyKeyword.toLowerCase()) {
      annotationType = "typeKeyword";
    } else if (annotationCommentAll === keyTask.toLowerCase() || annotationCommentFirstWord === keyTask.toLowerCase()) {
      annotationType = "typeTask";
    }
    return annotationType;
  }
  async extractAnnotation(selectedEntry, noteTitleFull) {
    this.noteElements = [];
    this.userNoteElements = [];
    this.keyWordArray = [];
    let extractedAnnotations = "";
    let extractedAnnotationsYellow = "";
    let extractedAnnotationsRed = "";
    let extractedAnnotationsGreen = "";
    let extractedAnnotationsBlue = "";
    let extractedAnnotationsPurple = "";
    let extractedAnnotationsBlack = "";
    let extractedAnnotationsWhite = "";
    let extractedAnnotationsGray = "";
    let extractedAnnotationsCyan = "";
    let extractedAnnotationsOrange = "";
    let extractedAnnotationsMagenta = "";
    let extractedAnnotationsCustomHex = "";
    let extractedImages = "";
    let extractedUserNote = "";
    if (selectedEntry.attachments[0] !== void 0) {
      let pathZoteroStorage = "";
      let zoteroBuildWindows = void 0;
      const zoteroStorageMac = new RegExp(
        /.+?(?=Zotero\/storage)Zotero\/storage\//gm
      );
      if (zoteroStorageMac.test(selectedEntry.attachments[0].path)) {
        pathZoteroStorage = String(
          selectedEntry.attachments[0].path.match(zoteroStorageMac)
        );
        zoteroBuildWindows = false;
      }
      const zoteroStorageWindows = new RegExp(
        /.+?(?=Zotero\\storage\\)Zotero\\storage\\/gm
      );
      if (zoteroStorageWindows.test(selectedEntry.attachments[0].path)) {
        pathZoteroStorage = String(
          selectedEntry.attachments[0].path.match(
            zoteroStorageWindows
          )
        );
        zoteroBuildWindows = true;
      }
      if (pathZoteroStorage.length == 0 && this.settings.zoteroStoragePathManual.length > 0) {
        pathZoteroStorage = this.settings.zoteroStoragePathManual;
        if (pathZoteroStorage.toLowerCase().endsWith("\\zotero")) {
          pathZoteroStorage = pathZoteroStorage + "\\storage\\";
        }
        if (pathZoteroStorage.toLowerCase().endsWith("\\zotero\\")) {
          pathZoteroStorage = pathZoteroStorage + "storage\\";
        }
        if (pathZoteroStorage.toLowerCase().endsWith("/zotero")) {
          pathZoteroStorage = pathZoteroStorage + "/storage/";
        }
        if (pathZoteroStorage.toLowerCase().endsWith("/zotero/")) {
          pathZoteroStorage = pathZoteroStorage + "storage/";
        }
      }
      this.pathZoteroStorage = pathZoteroStorage;
      this.zoteroBuildWindows = zoteroBuildWindows;
    }
    let noteElements = [];
    let userNoteElements = [];
    if (selectedEntry.notes.length > 0) {
      for (let indexNote = 0; indexNote < selectedEntry.notes.length; indexNote++) {
        let note = selectedEntry.notes[indexNote].note;
        note = note.replaceAll("$&", "$ &");
        let extractionType = void 0;
        if (decodeLegacyEscapes(note).includes("<span class=")) {
          extractionType = "Zotero";
        } else if (decodeLegacyEscapes(note).includes(
          '<a href="zotero://open-pdf/library/'
        )) {
          extractionType = "Zotfile";
        } else if (decodeLegacyEscapes(note).includes("div data-schema-version")) {
          extractionType = "UserNote";
        } else {
          extractionType = "Other";
        }
        let noteElementsSingle = [];
        if (extractionType === "Zotero") {
          noteElementsSingle = this.parseAnnotationLinesintoElementsZotero(note);
          noteElements = noteElements.concat(noteElementsSingle);
        }
        if (extractionType === "Zotfile") {
          noteElementsSingle = this.parseAnnotationLinesintoElementsZotfile(note);
          noteElements = noteElements.concat(noteElementsSingle);
        }
        if (extractionType === "UserNote" || extractionType === "Other") {
          noteElementsSingle = this.parseAnnotationLinesintoElementsUserNote(note);
          userNoteElements = userNoteElements.concat(noteElementsSingle);
        }
        this.noteElements = noteElements;
        this.userNoteElements = userNoteElements;
      }
      const resultsLineElements = await this.formatNoteElements(
        this.noteElements,
        selectedEntry.citationKey
      );
      this.keyWordArray = resultsLineElements.keywordArray;
      extractedAnnotations = resultsLineElements.rowEditedArray.join("\n");
      extractedAnnotationsYellow = resultsLineElements.highlightsYellow.join("\n");
      extractedAnnotationsRed = resultsLineElements.highlightsRed.join("\n");
      extractedAnnotationsGreen = resultsLineElements.highlightsGreen.join("\n");
      extractedAnnotationsBlue = resultsLineElements.highlightsBlue.join("\n");
      extractedAnnotationsPurple = resultsLineElements.highlightsPurple.join("\n");
      extractedAnnotationsBlack = resultsLineElements.highlightsBlack.join("\n");
      extractedAnnotationsWhite = resultsLineElements.highlightsWhite.join("\n");
      extractedAnnotationsGray = resultsLineElements.highlightsGray.join("\n");
      extractedAnnotationsCyan = resultsLineElements.highlightsCyan.join("\n");
      extractedAnnotationsOrange = resultsLineElements.highlightsOrange.join("\n");
      extractedAnnotationsMagenta = resultsLineElements.highlightsMagenta.join("\n");
      extractedAnnotationsCustomHex = resultsLineElements.highlightsCustomHex.join("\n");
      extractedImages = resultsLineElements.imagesArray.join("\n");
      const extractedUserNoteArray = Array.from(
        Object.values(this.userNoteElements),
        (note) => note.rowEdited
      );
      extractedUserNote = extractedUserNoteArray.join("\n");
    }
    const extractedNote = {
      extractedAnnotations,
      extractedUserNote,
      extractedKeywords: this.keyWordArray,
      extractedAnnotationsYellow,
      extractedAnnotationsRed,
      extractedAnnotationsGreen,
      extractedAnnotationsBlue,
      extractedAnnotationsPurple,
      extractedAnnotationsBlack,
      extractedAnnotationsWhite,
      extractedAnnotationsGray,
      extractedAnnotationsCyan,
      extractedAnnotationsOrange,
      extractedAnnotationsMagenta,
      extractedAnnotationsCustomHex,
      extractedImages,
      noteElements: this.noteElements
    };
    return extractedNote;
  }
  parseCollection(selectedEntry, data, metadata) {
    const exportedCollections = data.collections;
    const selectedID = selectedEntry.itemID;
    let collectionArray = [];
    const collectionParentCode = [];
    let collectionParentArray = [];
    const collectionParentParent = [];
    const collectionKeys = Object.keys(exportedCollections);
    for (let indexCollection = 0; indexCollection < collectionKeys.length; indexCollection++) {
      const collectionName = exportedCollections[collectionKeys[indexCollection]].name;
      const collectionItem = exportedCollections[collectionKeys[indexCollection]].items;
      const collectionParent = exportedCollections[collectionKeys[indexCollection]].parent;
      if (collectionItem.includes(String(selectedID))) {
        collectionArray.push(collectionName);
        collectionParentCode.push(collectionParent);
      }
    }
    if (collectionParentCode.length > 0) {
      for (let indexCollection = 0; indexCollection < collectionKeys.length; indexCollection++) {
        if (collectionParentCode.includes(
          exportedCollections[collectionKeys[indexCollection]].key
        )) {
          collectionParentArray.push(
            exportedCollections[collectionKeys[indexCollection]].name
          );
        }
      }
    }
    if (collectionParentParent.length > 0) {
      for (let indexCollection = 0; indexCollection < collectionKeys.length; indexCollection++) {
        if (collectionParentParent.includes(
          exportedCollections[collectionKeys[indexCollection]].key
        )) {
          collectionParentArray.push(
            exportedCollections[collectionKeys[indexCollection]].name
          );
        }
      }
    }
    collectionParentArray = collectionParentArray.concat(collectionArray);
    collectionArray = collectionArray.sort();
    collectionParentArray = collectionParentArray.sort();
    let divider = this.settings.multipleFieldsDivider;
    if (divider.slice(-1) !== " ") {
      divider = divider + " ";
    }
    if (collectionArray.length > 0) {
      const collectionArrayBraket = collectionArray.map(makeWiki);
      metadata = replaceTemplate(
        metadata,
        `[[{{collections}}]]`,
        String(collectionArrayBraket.join(divider))
      );
      const collectionArrayQuotes = collectionArray.map(makeQuotes);
      metadata = replaceTemplate(
        metadata,
        `"{{collections}}"`,
        String(collectionArrayQuotes.join(divider))
      );
      const collectionArrayTags = collectionArray.map(makeTags);
      metadata = replaceTemplate(
        metadata,
        `#{{collections}}`,
        String(collectionArrayTags.join(divider))
      );
      metadata = replaceTemplate(
        metadata,
        `{{collections}}`,
        String(collectionArray.join(divider))
      );
      metadata = replaceTemplate(
        metadata,
        `{{collectionsYamlWikiList}}`,
        String(
          collectionArray.map((collection) => `- "${makeWiki(collection)}"`).join("\n")
        )
      );
    }
    if (collectionParentArray.length > 0) {
      const collectionParentArrayBraket = collectionParentArray.map(makeWiki);
      metadata = replaceTemplate(
        metadata,
        `[[{{collectionsParent}}]]`,
        String(collectionParentArrayBraket.join(divider))
      );
      const collectionParentArrayQuotes = collectionParentArray.map(makeQuotes);
      metadata = replaceTemplate(
        metadata,
        `"{{collectionsParent}}"`,
        String(collectionParentArrayQuotes.join(divider))
      );
      const collectionParentArrayTags = collectionParentArray.map(makeTags);
      metadata = replaceTemplate(
        metadata,
        `#{{collectionsParent}}`,
        String(collectionParentArrayTags.join(divider))
      );
      metadata = replaceTemplate(
        metadata,
        `{{collectionsParent}}`,
        String(collectionParentArray.join(divider))
      );
    }
    return metadata;
  }
  // Function to extract the notes added manually
  // Function to import the right template
  importTemplate() {
    let template = templatePlain;
    if (this.settings.templateType === "Plain") {
      template = templatePlain;
    } else if (this.settings.templateType === "Admonition") {
      template = templateAdmonition;
    } else if (this.settings.templateType === "Custom") {
      template = this.settings.templateContent;
    }
    return template;
  }
  compareOldNewNote(existingNote, newNote, authorKey) {
    const newLineRegex = RegExp(/\n/gm);
    const positionNewLine = [];
    let match = void 0;
    while (match = newLineRegex.exec(existingNote)) {
      positionNewLine.push(match.index);
    }
    const positionOldNote = [0];
    const newNoteInsertText = [];
    const newNoteInsertPosition = [];
    const newNoteArray = newNote.split("\n");
    for (let indexLines = 0; indexLines < newNoteArray.length; indexLines++) {
      let segmentWhole = "";
      let segmentFirstHalf = "";
      let segmentSecondHalf = "";
      let segmentFirstQuarter = "";
      let segmentSecondQuarter = "";
      let segmentThirdQuarter = "";
      let segmentFourthQuarter = "";
      const positionArray = [-1];
      let selectedNewLine = newNoteArray[indexLines];
      selectedNewLine = selectedNewLine.trim();
      selectedNewLine = selectedNewLine.replace(/^- /gm, "");
      selectedNewLine = selectedNewLine.replace(/^> /gm, "");
      selectedNewLine = selectedNewLine.replace(/^=/gm, "");
      selectedNewLine = selectedNewLine.replace(/^\**/gm, "");
      selectedNewLine = selectedNewLine.replace(/^\*/gm, "");
      selectedNewLine = selectedNewLine.replace(/^"/gm, "");
      const authorKey_Zotero = new RegExp(
        "\\(" + authorKey + ", \\d+, p. \\d+\\)$"
      );
      const authorKey_Zotfile = new RegExp(
        "\\(" + authorKey + " \\d+:\\d+\\)$"
      );
      selectedNewLine = selectedNewLine.replace(authorKey_Zotero, "");
      selectedNewLine = selectedNewLine.replace(authorKey_Zotfile, "");
      selectedNewLine = selectedNewLine.replace(/=$/gm, "");
      selectedNewLine = selectedNewLine.replace(/\**$/gm, "");
      selectedNewLine = selectedNewLine.replace(/\*$/gm, "");
      selectedNewLine = selectedNewLine.replace(/"$/gm, "");
      if (selectedNewLine == void 0) {
        continue;
      }
      const lengthExistingLine = selectedNewLine.length;
      if (lengthExistingLine === 0) {
        continue;
      }
      if (lengthExistingLine > 1 && lengthExistingLine < 30) {
        segmentWhole = selectedNewLine;
        positionArray.push(existingNote.indexOf(segmentWhole));
      } else if (lengthExistingLine >= 30 && lengthExistingLine < 150) {
        segmentFirstHalf = selectedNewLine.substring(
          0,
          lengthExistingLine / 2
        );
        positionArray.push(existingNote.indexOf(segmentFirstHalf));
        segmentSecondHalf = selectedNewLine.substring(
          lengthExistingLine / 2 + 1,
          lengthExistingLine
        );
        positionArray.push(existingNote.indexOf(segmentSecondHalf));
      } else if (lengthExistingLine >= 150) {
        segmentFirstQuarter = selectedNewLine.substring(
          0,
          lengthExistingLine / 4
        );
        positionArray.push(existingNote.indexOf(segmentFirstQuarter));
        segmentSecondQuarter = selectedNewLine.substring(
          lengthExistingLine / 4 + 1,
          lengthExistingLine / 2
        );
        positionArray.push(existingNote.indexOf(segmentSecondQuarter));
        segmentThirdQuarter = selectedNewLine.substring(
          lengthExistingLine / 2 + 1,
          3 * lengthExistingLine / 4
        );
        positionArray.push(existingNote.indexOf(segmentThirdQuarter));
        segmentFourthQuarter = selectedNewLine.substring(
          3 * lengthExistingLine / 4 + 1,
          lengthExistingLine
        );
        positionArray.push(existingNote.indexOf(segmentFourthQuarter));
      }
      if (Math.max(...positionArray) > -1) {
        const positionOldNoteMax = Math.max(...positionArray);
        positionOldNote.push(positionOldNoteMax);
      }
      if (Math.max(...positionArray) === -1) {
        const positionOldNoteMax = Math.max(...positionOldNote);
        newNoteInsertText.push(newNoteArray[indexLines]);
        newNoteInsertPosition.push(
          positionNewLine.filter((pos) => pos > positionOldNoteMax)[0]
        );
      }
    }
    let doubleSpaceAdd = "";
    if (this.settings.isDoubleSpaced) {
      doubleSpaceAdd = "\n";
    }
    for (let indexNoteElements = newNoteInsertText.length - 1; indexNoteElements >= 0; indexNoteElements--) {
      const insertText = newNoteInsertText[indexNoteElements];
      const insertPosition = newNoteInsertPosition[indexNoteElements];
      existingNote = existingNote.slice(0, insertPosition) + doubleSpaceAdd + "\n" + insertText + existingNote.slice(insertPosition);
    }
    if (this.settings.saveManualEdits == "Save Entire Note") {
      return existingNote;
    }
    if (this.settings.saveManualEdits == "Select Section") {
      const startSave = this.settings.saveManualEditsStart;
      const endSave = this.settings.saveManualEditsEnd;
      let startSaveOld = 0;
      if (startSave !== "") {
        startSaveOld = existingNote.indexOf(startSave);
      }
      if (startSaveOld < 0) {
        startSaveOld = 0;
      }
      let endSaveOld = existingNote.length;
      if (endSave !== "") {
        endSaveOld = existingNote.indexOf(endSave) + endSave.length;
      }
      if (endSaveOld < 0) {
        endSaveOld = existingNote.length;
      }
      const existingNotePreserved = existingNote.substring(
        startSaveOld,
        endSaveOld
      );
      let startSaveNew = 0;
      if (startSave !== "") {
        startSaveNew = newNote.indexOf(startSave);
      }
      if (startSaveNew < 0) {
        startSaveNew = 0;
      }
      let endSaveNew = newNote.length;
      if (endSave !== "") {
        endSaveNew = newNote.indexOf(endSave) + endSave.length;
      }
      if (endSaveNew < 0) {
        endSaveNew = newNote.length;
      }
      const newNotePreservedBefore = newNote.substring(0, startSaveNew);
      const newNotePreservedAfter = newNote.substring(
        endSaveNew,
        newNote.length
      );
      const newNoteCombined = newNotePreservedBefore + existingNotePreserved + newNotePreservedAfter;
      return newNoteCombined;
    }
  }
  async createNote(selectedEntry, data) {
    const authorKey = createAuthorKey(selectedEntry.creators);
    selectedEntry.authorKey = authorKey;
    selectedEntry.authorKeyInitials = createAuthorKeyInitials(selectedEntry.creators);
    selectedEntry.authorKeyFullName = createAuthorKeyFullName(selectedEntry.creators);
    const bugout = new DebugLog(this.settings.debugMode);
    const templateNote = this.importTemplate();
    bugout.log("Template: \n" + templateNote);
    let litnote = this.parseMetadata(selectedEntry, templateNote);
    bugout.log(selectedEntry);
    litnote = this.parseCollection(selectedEntry, data, litnote);
    const noteTitleFull = createNoteTitle(
      selectedEntry,
      this.settings.exportTitle,
      this.settings.exportPath
    );
    const resultAnnotations = await this.extractAnnotation(
      selectedEntry,
      noteTitleFull
    );
    bugout.log(resultAnnotations.noteElements);
    litnote = litnote.replace(
      "{{PDFNotes}}",
      resultAnnotations.extractedAnnotations
    );
    litnote = litnote.replace(
      "{{UserNotes}}",
      resultAnnotations.extractedUserNote
    );
    litnote = litnote.replace(
      "{{Yellow}}",
      resultAnnotations.extractedAnnotationsYellow
    );
    litnote = litnote.replace(
      "{{Red}}",
      resultAnnotations.extractedAnnotationsRed
    );
    litnote = litnote.replace(
      "{{Green}}",
      resultAnnotations.extractedAnnotationsGreen
    );
    litnote = litnote.replace(
      "{{Blue}}",
      resultAnnotations.extractedAnnotationsBlue
    );
    litnote = litnote.replace(
      "{{Purple}}",
      resultAnnotations.extractedAnnotationsPurple
    );
    litnote = litnote.replace(
      "{{Black}}",
      resultAnnotations.extractedAnnotationsBlack
    );
    litnote = litnote.replace(
      "{{White}}",
      resultAnnotations.extractedAnnotationsWhite
    );
    litnote = litnote.replace(
      "{{Gray}}",
      resultAnnotations.extractedAnnotationsGray
    );
    litnote = litnote.replace(
      "{{Cyan}}",
      resultAnnotations.extractedAnnotationsCyan
    );
    litnote = litnote.replace(
      "{{Orange}}",
      resultAnnotations.extractedAnnotationsOrange
    );
    litnote = litnote.replace(
      "{{Magenta}}",
      resultAnnotations.extractedAnnotationsMagenta
    );
    litnote = litnote.replace(
      "{{CustomHex}}",
      resultAnnotations.extractedAnnotationsCustomHex
    );
    litnote = litnote.replace(
      "{{Images}}",
      resultAnnotations.extractedImages
    );
    let extractedKeywords = resultAnnotations.extractedKeywords;
    if (extractedKeywords == void 0) {
      extractedKeywords = [];
    }
    litnote = replaceTagList(
      selectedEntry,
      extractedKeywords,
      litnote,
      this.settings.multipleFieldsDivider
    );
    const missingFieldSetting = this.settings.missingfield;
    litnote = replaceMissingFields(
      litnote,
      missingFieldSetting,
      this.settings.missingfieldreplacement
    );
    if (this.settings.saveManualEdits !== "Overwrite Entire Note" && await this.app.vault.adapter.exists(noteTitleFull)) {
      const existingNoteAll = await this.app.vault.adapter.read(noteTitleFull);
      litnote = this.compareOldNewNote(
        existingNoteAll,
        litnote,
        authorKey
      );
    }
    bugout.log("NoteTitleFull: " + noteTitleFull);
    bugout.log("Final Note: " + litnote);
    bugout.log(this.settings);
    if (this.settings.debugMode === true) {
      bugout.downloadLog();
    }
    await this.writeNote(noteTitleFull, litnote);
    new import_obsidian5.Notice(`Imported ${selectedEntry.citationKey}!`);
  }
  async writeNote(path, content) {
    const notePath = vaultRelativePath(path);
    const folder = notePath.slice(0, notePath.lastIndexOf("/"));
    if (folder && !await this.app.vault.adapter.exists(folder)) await this.app.vault.adapter.mkdir(folder);
    const existing = this.app.vault.getAbstractFileByPath(notePath);
    if (existing instanceof import_obsidian5.TFile) await this.app.vault.modify(existing, content);
    else await this.app.vault.create(notePath, content);
  }
  async updateCurrentNote() {
    const currentFile = this.app.workspace.getActiveFile();
    if (!currentFile) {
      new import_obsidian5.Notice("Open a literature note first");
      return;
    }
    const data = await this.loadBibData();
    if (!data) return;
    const citeKey = parseCiteKeyFromNoteName(currentFile.name, this.settings.exportTitle + ".md");
    const exactEntry = this.buildLibraryEntries(data).find((entry2) => entry2.notePathShort === currentFile.path);
    const entry = (exactEntry == null ? void 0 : exactEntry.rawEntry) || data.items.find((item) => item.citationKey === citeKey);
    if (!entry) {
      new import_obsidian5.Notice("Cannot find this note in the library");
      return;
    }
    await this.createNote(entry, data);
  }
  runTask(task) {
    void task.catch((error) => new import_obsidian5.Notice(error instanceof Error ? error.message : "Operation failed"));
  }
};
function discoverLibraryFieldNames(data) {
  if (data == null || !Array.isArray(data.items)) return [];
  const fields = /* @__PURE__ */ new Set();
  for (const item of data.items) {
    if (item == null || typeof item !== "object") continue;
    for (const key of Object.keys(item)) {
      if (EXCLUDED_DYNAMIC_LIBRARY_FIELDS.has(key)) continue;
      fields.add(key);
    }
  }
  return Array.from(fields).sort((a, b) => a.localeCompare(b));
}
function discoverLibrarySubFields(data) {
  const result = /* @__PURE__ */ new Map();
  for (const item of data.items) {
    for (const [key, value] of Object.entries(item)) {
      const candidate = Array.isArray(value) ? value[0] : value;
      if (!isRecord(candidate)) continue;
      const fields = result.get(key) || /* @__PURE__ */ new Set();
      Object.keys(candidate).forEach((field) => fields.add(field));
      result.set(key, fields);
    }
  }
  return Object.fromEntries(Array.from(result, ([key, fields]) => [key, Array.from(fields).sort()]));
}
function collectLibrarySearchValues(value, results) {
  if (value == null) return;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    results.push(String(value));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectLibrarySearchValues(item, results));
    return;
  }
  if (isRecord(value)) {
    Object.values(value).forEach((item) => collectLibrarySearchValues(item, results));
  }
}
function normalizeDivider(divider) {
  if (divider && divider.slice(-1) !== " ") return divider + " ";
  return divider || "; ";
}
function normalizeItemTypeForLibrary(itemType) {
  switch (itemType) {
    case "journalArticle":
      return "Article";
    case "book":
      return "Book";
    case "bookSection":
      return "Chapter";
    case "conferencePaper":
      return "Conference";
    case "thesis":
      return "Thesis";
    case "webpage":
      return "Web";
    case "report":
      return "Report";
    default:
      return itemType ? itemType.charAt(0).toUpperCase() + itemType.slice(1) : "";
  }
}
function normalizeYearForLibrary(date) {
  if (!date) return "";
  const match = date.match(/\d{4}/);
  return match ? match[0] : "";
}
function getTagsForLibraryEntry(entry) {
  if (!entry.tags || !Array.isArray(entry.tags)) return [];
  return entry.tags.map((t) => t.tag).filter((t) => !!t);
}
function getCollectionsForLibraryEntry(entry, data, divider) {
  return getCollectionNamesForLibraryEntry(entry, data, divider, false);
}
function getParentCollectionsForLibraryEntry(entry, data, divider) {
  return getCollectionNamesForLibraryEntry(entry, data, divider, true);
}
function getCollectionNamesForLibraryEntry(entry, data, divider, parentsOnly) {
  const selectedID = entry.itemID == null ? "" : String(entry.itemID);
  const exportedCollections = data == null ? void 0 : data.collections;
  const directCollections = formatLibraryFieldValue(entry.collections, divider);
  if (selectedID === "" || exportedCollections == null) return parentsOnly ? "" : directCollections;
  const collections = Object.values(exportedCollections);
  const collectionsByKey = /* @__PURE__ */ new Map();
  collections.forEach((collection) => {
    if ((collection == null ? void 0 : collection.key) != null) collectionsByKey.set(String(collection.key), collection);
  });
  const matchedCollections = collections.filter((collection) => Array.isArray(collection == null ? void 0 : collection.items) && collection.items.map((item) => String(item)).includes(selectedID));
  const selectedCollections = /* @__PURE__ */ new Map();
  const addCollection = (collection) => {
    if (collection == null) return;
    const key = collection.key != null ? String(collection.key) : String(collection.name || "");
    if (key !== "") selectedCollections.set(key, collection);
  };
  matchedCollections.forEach((collection) => {
    if (!parentsOnly) addCollection(collection);
    let parentKey = (collection == null ? void 0 : collection.parent) == null ? "" : String(collection.parent);
    const seenParentKeys = /* @__PURE__ */ new Set();
    while (parentKey !== "") {
      if (seenParentKeys.has(parentKey)) break;
      seenParentKeys.add(parentKey);
      const parentCollection = collectionsByKey.get(parentKey);
      if (parentCollection == null) break;
      addCollection(parentCollection);
      parentKey = parentCollection.parent == null ? "" : String(parentCollection.parent);
    }
  });
  const collectionNames = Array.from(selectedCollections.values()).map((collection) => collection == null ? void 0 : collection.name).filter((name) => typeof name === "string" && name.trim() !== "").sort((first, second) => first.localeCompare(second));
  return collectionNames.length > 0 ? collectionNames.join(divider) : parentsOnly ? "" : directCollections;
}
function formatPrimaryCreatorListForLibrary(creators, divider, nameFormat) {
  if (!creators || creators.length === 0) return "";
  const list = creators.filter((c) => c.creatorType === "author" || c.creatorType === "editor").map((c) => {
    if (c.name) return c.name;
    let name = nameFormat;
    name = name.replace("{{lastName}}", c.lastName || "");
    name = name.replace("{{firstName}}", c.firstName || "");
    return name.trim();
  });
  if (list.length === 0) return "";
  if (list.length === 1) return list[0];
  if (list.length === 2) return list[0] + divider + list[1];
  return list[0] + " et al.";
}
function formatLibraryFieldValue(value, divider, mappingProperty) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    let str = String(value);
    if (typeof value === "string") {
      str = str.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    }
    return str.trim();
  }
  if (Array.isArray(value)) {
    return value.map((item) => formatLibraryFieldValue(item, divider, mappingProperty)).filter((item) => item !== "").join(divider);
  }
  if (isRecord(value)) {
    if (typeof value.firstName === "string" || typeof value.lastName === "string") {
      return [value.firstName || "", value.lastName || ""].join(" ").trim();
    }
    if (mappingProperty && (typeof value[mappingProperty] === "string" || typeof value[mappingProperty] === "number")) {
      return formatLibraryFieldValue(value[mappingProperty], divider, mappingProperty);
    }
    const candidateKeys = ["note", "path", "tag", "name", "title", "label", "key", "citationKey", "itemKey", "uri", "url"];
    for (const key of candidateKeys) {
      if (typeof value[key] === "string" || typeof value[key] === "number") {
        return formatLibraryFieldValue(value[key], divider, mappingProperty);
      }
    }
    try {
      return JSON.stringify(value);
    } catch (e) {
      return "";
    }
  }
  return "";
}
/*! Bundled license information:

color-classifier/color-classifier.js:
  (*!
   * color-classifier
   * Classify the color along the reference color.
   *
   * @author tsuyoshiwada
   * @license MIT
   * @version 0.0.1
   *)
*/
