'use strict';

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var jsx_runtime_1 = require('react/jsx-runtime');

var react_1 = require('react');

var antd_1 = require('antd');

var MAX_SECOND_NUM = 60;

function CountdownButton(_a) {
  var _a$maxSecondNum = _a.maxSecondNum,
    maxSecondNum =
      _a$maxSecondNum === void 0 ? MAX_SECOND_NUM : _a$maxSecondNum,
    _a$txt = _a.txt,
    txt = _a$txt === void 0 ? '获取验证码' : _a$txt,
    _a$loadingTxt = _a.loadingTxt,
    loadingTxt = _a$loadingTxt === void 0 ? '发送中' : _a$loadingTxt,
    _a$disabledTxt = _a.disabledTxt,
    disabledTxt =
      _a$disabledTxt === void 0
        ? function (s) {
            return ''.concat(s, ' \u79D2\u540E\u91CD\u8BD5');
          }
        : _a$disabledTxt,
    _a$onClick = _a.onClick,
    _onClick =
      _a$onClick === void 0
        ? function (completeCallback) {
            completeCallback();
          }
        : _a$onClick,
    rest = __rest(_a, [
      'maxSecondNum',
      'txt',
      'loadingTxt',
      'disabledTxt',
      'onClick',
    ]);

  var _ref = (0, react_1.useState)({
      timing: false,
      count: maxSecondNum,
    }),
    _ref2 = _slicedToArray(_ref, 2),
    authCodeArgs = _ref2[0],
    setAuthCodeArgs = _ref2[1];

  (0, react_1.useEffect)(
    function () {
      var timer = undefined;

      if (authCodeArgs.timing) {
        timer = window.setInterval(function () {
          setAuthCodeArgs(function (pre) {
            var count = pre.count,
              timing = pre.timing;

            if (count === 1) {
              window.clearInterval(timer);
              return {
                timing: false,
                count: maxSecondNum,
              };
            }

            return {
              timing: timing,
              count: count - 1,
            };
          });
        }, 1000);
      }

      return function () {
        return window.clearInterval(timer);
      };
    },
    [authCodeArgs.timing],
  );

  var completeCallback = function completeCallback() {
    setAuthCodeArgs(
      Object.assign(Object.assign({}, authCodeArgs), {
        timing: true,
      }),
    );
  };

  var buttonText;

  if (rest.loading) {
    buttonText = loadingTxt;
  } else if (authCodeArgs.timing) {
    buttonText = disabledTxt(authCodeArgs.count);
  } else {
    buttonText = txt;
  }

  return (0, jsx_runtime_1.jsx)(
    antd_1.Button,
    Object.assign(
      {
        disabled: authCodeArgs.timing,
        style: Object.assign(
          {
            minWidth: 100,
          },
          rest.style || {},
        ),
        onClick: function onClick() {
          _onClick && _onClick(completeCallback);
        },
      },
      rest,
      {
        children: buttonText,
      },
    ),
  );
}

exports.default = CountdownButton;
