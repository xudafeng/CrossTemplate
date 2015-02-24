install:
	@npm install
server:
	@./node_modules/startserver/bin/startserver
build:
	@node ./node_modules/browserify/bin/cmd ./static/init.js > ./static/index.js
