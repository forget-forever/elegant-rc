###
 # @Author: zml
 # @Date: 2022-06-06 15:51:19
 # @LastEditTime: 2022-06-20 10:21:51
### 

npm run build

if [ $? -eq 0 ]; then
  npm publish --registry http://npm.sfjswl.com
else
  echo "tsc编译异常, 请检查是否符合ts语法规范"
fi