###
 # @Author: zml
 # @Date: 2022-06-06 15:51:19
 # @LastEditTime: 2022-06-28 17:02:34
### 

if [ -z "$(git status --porcelain)" ]; then 
  registry="https://registry.npmjs.org"
  currentVersion=`npm -s run env echo '$npm_package_version'`
  lastVersion=`npm view elegant-rc@${currentVersion} version --registry ${registry}`

  if [ $lastVersion ]
  then
    echo `仓库中已有${currentVersion}版本号，禁止发布，请修改版本号！`
  else
    npm run docs:build
    npm run build

    if [ $? -eq 0 ]; then

      br=`git branch | grep "*"`

      cmd_res=`git rev-list origin/master --not ${br/* /}`
      if [ -z ${cmd_res} ]; then
        `npm publish --registry ${registry}`
        echo '版本发布成功'
        echo '---------------------------------------------------------------'
        echo '开始将代码合并到master'
        git pull
        git checkout master
        `git merge ${br/* /}`
        git push
        `git checkout ${br/* /}`
        echo '发布成功'
      else
        echo '当前分支落后master分支, 禁止发布'
      fi
    else
      echo "tsc编译失败，禁止发布"
    fi
  fi

else 
  echo '工作区有代码未提交，请先提交代码'
fi