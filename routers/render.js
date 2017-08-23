
const Router=require('koa-router');
const router = new Router();

module.exports=function(app){
	router.get('/', async (ctx) =>{
	    await ctx.redirect('/index');
	});


	router.get('/index', async (ctx) =>{
	    await ctx.render('/index');
	});

	router.get('*', async (ctx) =>{
	    await ctx.render('/index');
	});


	app
	  .use(router.routes())
	  .use(router.allowedMethods());
}





