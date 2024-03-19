rm -rf transform

mkdir transform

cp -rf dist/*  transform/

cp -rf dist/transform/*  transform/

rm -rf transform/transform


# 防止不更新
ssh root@43.139.47.204 "rm -rf /www/server/web/transform/*"

scp -P 22 -r transform/* root@43.139.47.204:/www/server/web/transform/



