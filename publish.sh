###
 # @Author: zml
 # @Date: 2022-06-06 15:51:19
<<<<<<< HEAD
 # @LastEditTime: 2022-06-20 20:52:43
=======
 # @LastEditTime: 2022-06-20 10:21:51
>>>>>>> origin/master
### 

npm run build

if [ $? -eq 0 ]; then
  cp ts-path.txt ./es/tsconfig.json
  cp ts-path.txt ./lib/tsconfig.json
  br=`git branch | grep "*"`

  cmd_res=`git rev-list origin/master --not ${br/* /}`
  if [ -z ${cmd_res} ]; then
    
    npm publish --registry http://npm.sfjswl.com
  else
    echo '当前分支落后master分支, 禁止发布'
  fi
else
  echo "tsc compile error, publish was forbade!"
fi