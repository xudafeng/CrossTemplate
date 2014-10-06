install:
	@npm install --registry=http://r.cnpmjs.org --disturl=http://dist.cnpmjs.org
server:
	@./node_modules/startserver/bin/startserver 9876
