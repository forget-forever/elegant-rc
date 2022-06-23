npm run docs:build
if [ $? -eq 0 ]; then
  
else
  echo "文档编译失败，文档无法发布"
fi