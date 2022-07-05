/*
 * @Author: zml
 * @Date: 2022-06-06 10:44:43
 * @LastEditTime: 2022-07-03 11:01:41
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  title: '同城rc组件库',
  favicon:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABpCAMAAAAOXP0IAAACu1BMVEVHcEz////n5+fl5eXo6Oj////o6Oj////p6eno6Ojn5+fp6enp6enq6uro6Ojq6ur///8EAADlAADo6Oj29va/vb3U09Pw7+/a2dnq6en19fXx8PAFAQEIBAT9/Pzz8vLs6+v//v7z8/P6+vr+/f0LBwcSDg76+fnmAgJNSko3MzMsKCjg398PCwv8+/v/+voNCQmnpaUWEhL7+vrv7u7My8v//Pzy8fEUEBAvKyuSkJCbmZm5t7dFQkLyeHiwrq7nDg75+Pjxbm7j4uLPzs7c29s6NjZaV1f4tLSenJxsaWn19PRAPDz29fXr6upIRUUoJCQYFBSVk5Nyb2/uTU3qLCz+7u71lZUzLy9XU1OFg4MmIiL/+/vT0tLnEhKOjIz83d0kICD71dUeGhr94+ONi4tRTk7mBgZoZWX/9/fmBASJh4dKR0d5dnZ1cnK1s7PJyMggHByBfn4xLS3Qz8/oGBj96Oj49/e9u7tcWVnX1tb6xcXvYmI9OTnd3NzBv7+koqKtq6voFBRvbGxmY2Pu7e2+vLxfXFzzf3/qKip+e3vEw8NTUFDvWVnHxsYbFxdCPj7OAgIiHh7sPDzLysrsRERjYGCIhob0ioro5+fnCgr6ysrW1dXpHR33qKhGQ0P5vb3BwMDtRkbpJCT0jY37z8/0kZGopqb+7+/eGRmYlpbp6Oj2np7tSUn84ODpJiYcGBj6zMzrNTW+amr+8vL4urqgnp6dm5vye3vZ2NiGAADDwsLasbGGhITpIyPGXFzwZWXZtLT+8/P71tb2oaHuUVHS0dHzgoLwa2v4sbH83NzsPz+rqam2tLT96uqXlZX0k5Pl5OTrMzP2n5/vXFzk4+MqJibwY2MpAADiAAD96enelpaoAAATAADBc3O/AACyAADHBATbAAAwAADozs43AABjAADVxcXVAABCIJ1kAAAAEHRSTlMAAuNH+AiTAaZl+/30rs2ttrd1HAAABJRJREFUeNrt2udXFGcUx/GlihTzu7Ng2MIWWAi9JoQiVYlgCZYIiohCUAFrokaN0URjYovYMBqNPab33nvvvff+ZwQ4sOxd2Jzn2Z2ZN/J5y4vv2TO7cw73XoNbUEhMcHSUUT1R0cExIUEGb2HhkUaHJdEcqx5zosVhjAwP46GxoSZ7EtSXZDeFjvXojIkwWmzQhs1ijBjjDo0zmaEds2ncYCrCVAUtVZkiBp6R0QxtmY39zyos1AKtWULDekvhJhu0ZjOF9/5gI+3Qnj0yyBBiTIL2kowhhhgH9OCIMQRboAdLsCE6EXJcefUZaRWQlBhtiDJDygvp1GfaJEgxRxmMsZAwcTINsG5/ABJijVKl6dfm0pCUxZdoVcq7hrgZqzQp9Wym4erHq16643YrjSTh5ltULVUtyyJf8mdlq1eqmE8cV7xBpdKCMmKsO7pvI25JjQolx5QEYq5YDSBuDTHJeYGWskuKiLn6Jif62O7P5x80LrDShAxikndPxaBLZ7MPuzyQUnwacfMy4en65TSk1f+SZaXXA5p7Bt4++poGrfG35CqdSczMUheGK1iYMvD3I36WzswlJmGlBSO7ssNKvU4V+FXKnEdcWjx8e3t2+qnSode67cXXOkVLi5OJyZgAYTmvHFCUA0+IlRYSU1SSDWG19yn9fhYpTU9hD2iKA8LazioDfhMp9ZCHsgUQ1lDdpbj9KVCKI7f5FRBW2NiiePhHppS1rArCTs9RPP06XqZUA2HvX6Uwv/8lVboYgp4sX8pDv/xB/pWcx2vb4ZPzwXW88+/fVvKvdHyXoqQePo+Rbfqcd757/ici/0oPb1P6pL76MYZr36twP35L5G/pWWVA5V054Dp3HuOdcz8Q+V/6QHF7pBaeTp7gncqjOfGBlNgX+OwbGPTYId5J/eZ7IKDSm4qnruoG9LnuhlQeOnQeCLDU/JDCtDQWIudopcKcOAkEXEKz9w9zzt0vK8yxdzoRUIm/bHzb2w6oVAKe2uWz8/gmQMUSmj9tGbGz7gsnVCgxDe+mKt6Wlr8OqFLi2g4r3FuLANVK3HvnPL+CpwHNSh4/pG2NhdCuNPRy6Kq+F9CgxLWVf7lzEaBdiRstjZZGSxd8KRPyVvtVKiopgJz1TVlSJfZPu4ytB4lkSj1sEPEcRK3dTx4yBUpTU8SGK5ypw8qGcy6BEo6IDIyGj4+YOoiUnE3eQ7Ab8f9WzSAmdxYESiKDPXiP+bjJE+GjJDisZNjokknfA4aVZAawnO2TfGL21bngsyQ8VO6Gt1uLiUleYQfDSxKD8s/gacuwsfkWQKAkMvzPemk9BtlXJAusAlhJaqHRuhX9nE8/6r3esEGgJLOk2b8WQHe6wMpGoMRdtpkYa8ekjcTV3wkIlOSXaeKrNV6SWhByfF0YeIkvPTnrdpPqe8I96cSwta6qJbjq9hF38EOt9rmXsx9rblMs1CxxNUvcD2jjV4BMSXrvvqGYvW7F9+7ytwTZz0xrLbvHKX1LoN99hG43Hxfpd8ei322ObvdG+t1Q6XYXptutm373e7rdJOp1Z6n37ah+97D/AWOpW6eIJ7MmAAAAAElFTkSuQmCC',
  logo: 'data:image/png;base64,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',
  outputPath: 'docs-dist',
  mode: 'site',
  scripts: [
    'https://codepush-1258916733.cos.ap-shanghai.myqcloud.com/sfsdk/lineAnimation.js',
    // 'https://cdn.jsdelivr.net/npm/live2d-widget@3.0.4/lib/L2Dwidget.min.js'
  ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: true,
      skipPropsWithoutDoc: false,
    },
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  locales: [['zh-CN', '中文']],
  // base: '/tc-rc/docs-dist/',
  // publicPath: '/tc-rc/docs-dist/',
  history: {
    type: 'hash', // 设置路由模式为 hash 模式，防止部署至 GitHub Pages 后刷新网页后出现 404 的情况发生.
  },
  // more config: https://d.umijs.org/config
  terserOptions: {
    minimal: true,
  },
  lessLoader: {
    javascriptEnabled: true,
  },
});
