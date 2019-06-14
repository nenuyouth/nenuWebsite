npm run deploy
cd dist
git init
git add -A
git commit -m 'website deploy'
git push -f git@github.com:nenuyouth/nenuyouth.github.io.git master
git push -f git@gitee.com:nenuStudentUnion/nenuStudentUnion.git master
cd -