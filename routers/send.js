const convert = require('koa-convert')
const Router=require('koa-router');
const router = new Router();

const userApi=require('../server/api/user');

module.exports=function(app){
	router.post('/createUser', async (ctx) =>{
		const thisQuery=ctx.body;
	    ctx.body = await userApi.createUser(thisQuery)
	});

	app
	  .use(router.routes())
	  .use(router.allowedMethods());
}





