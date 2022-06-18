###
 # @Author: zml
 # @Date: 2022-06-06 15:51:19
 # @LastEditTime: 2022-06-18 16:54:41
### 

# npm run build

if [ $? -eq 0 ]; then
  cp ts-path.txt ./es/tsconfig.json
  cp ts-path.txt ./lib/tsconfig.json
  br=`git branch | grep "*"`

  cmd_res=`git rev-list ${br/* /} --not origin/master`
  echo $cmd_res
  if [ $cmd_res == '' ]; then
    echo 'ok!!'
    # npm publish --registry http://npm.sfjswl.com
  else
    echo '当前分支落后master分支, 禁止发布'
  fi
else
  echo "tsc compile error"
fi