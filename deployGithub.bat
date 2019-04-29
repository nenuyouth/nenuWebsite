::当发生错误时中止脚本
set -e

::构建
npm run deploy

::cd 到构建输出的目录下 
cd dist

git init
git add -A
git commit -m '网站部署'

::部署到 https://<USERNAME>.github.io
# git push -f git@github.com:nenuyouth/nenuyouth.github.io.git master
# git push -f git@gitee.com:nenuStudentUnion/nenuStudentUnion.git master

cd -