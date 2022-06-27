npm run docs:build
if [ $? -eq 0 ]; then
  mkdir docs-output
  cp -r ./docs-dist/* ./docs-output
  echo '文档编译完成，准备上传文档代码'
  cd docs-output
  tar -zcvf output.tar.gz *
  curl -H "Expect:" -F 'file=@output.tar.gz' -F 'path=/opt/web/rc-docs' http://10.210.40.60:8999/upload
  rm -rf ../docs-output
else
  echo "文档编译失败，文档无法发布"
fi
