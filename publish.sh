###
 # @Author: zml
 # @Date: 2022-06-06 15:51:19
 # @LastEditTime: 2022-06-23 14:46:30
### 
if [ -z "$(git status --porcelain)" ]; then 
  npm run build

  if [ $? -eq 0 ]; then

    br=`git branch | grep "*"`

    cmd_res=`git rev-list origin/master --not ${br/* /}`
    if [ -z ${cmd_res} ]; then
      npm publish --registry http://npm.sfjswl.com
      echo '版本发布成功'
      echo '---------------------------------------------------------------'
      echo '开始将代码合并到master'
      git pull
      git checkout master
      `git merge ${br/* /}`
      git push
      `git checkout ${br/* /}`
    else
      echo '当前分支落后master分支, 禁止发布'
    fi
  else
    echo "tsc编译失败，禁止发布"
  fi

else 
  echo '工作区有代码未提交，请先提交代码'
fi