'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var jsx_runtime_1 = require('react/jsx-runtime');
/*
 * @Author: zml
 * @Date: 2022-06-06 10:44:43
 * @LastEditTime: 2022-06-06 12:39:37
 */

require('./index.less');

function RankList(_ref) {
  var data = _ref.data;
  return (0, jsx_runtime_1.jsx)(
    'div',
    Object.assign(
      {
        className: 'rank-list',
      },
      {
        children: data.length
          ? (0, jsx_runtime_1.jsx)('ul', {
              children: data
                .filter(function (_, index) {
                  return index < 10;
                })
                .map(function (_ref2, index) {
                  var label = _ref2.label,
                    value = _ref2.value;
                  return (0, jsx_runtime_1.jsxs)(
                    'li',
                    {
                      children: [
                        (0, jsx_runtime_1.jsx)(
                          'div',
                          Object.assign(
                            {
                              className: 'rank',
                              style: {
                                backgroundColor:
                                  index + 1 < 4 ? '#27478d' : '#fafafa',
                                color:
                                  index + 1 < 4
                                    ? '#fff'
                                    : 'rgba(0, 0, 0, 0.65)',
                              },
                            },
                            {
                              children: index + 1,
                            },
                          ),
                        ),
                        (0, jsx_runtime_1.jsx)(
                          'div',
                          Object.assign(
                            {
                              className: 'name',
                            },
                            {
                              children: (0, jsx_runtime_1.jsx)(
                                'span',
                                Object.assign(
                                  {
                                    title: label || '--',
                                  },
                                  {
                                    children: label || '--',
                                  },
                                ),
                              ),
                            },
                          ),
                        ),
                        (0, jsx_runtime_1.jsx)(
                          'div',
                          Object.assign(
                            {
                              className: 'num',
                            },
                            {
                              children: value,
                            },
                          ),
                        ),
                      ],
                    },
                    label,
                  );
                }),
            })
          : (0, jsx_runtime_1.jsx)(
              'div',
              Object.assign(
                {
                  className: 'empty',
                },
                {
                  children: '\u6682\u65E0\u6570\u636E',
                },
              ),
            ),
      },
    ),
  );
}

exports.default = RankList;
