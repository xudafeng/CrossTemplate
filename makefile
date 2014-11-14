install:
	@npm install --registry=http://r.cnpmjs.org --disturl=http://dist.cnpmjs.org
server:
	@./node_modules/startserver/bin/startserver -n
build:
	@node ./node_modules/browserify/bin/cmd ./static/init.js > ./static/index.js
