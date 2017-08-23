'use strict';

/*
module dependencies
*/
const koa = require('koa');
const views = require('koa-views');
const statics=require('koa-static');
const bodyParser=require('koa-bodyparser')
const path = require('path');

const dbConnect = require('./server/db/connect');
const renderRouters=require('./routers/render')
const sendRouters=require('./routers/send')


const app =new koa();

/*
middleware 3600
*/

app.use(views(path.join(__dirname, './views'),{default:'ejs'}))
app.use(statics(path.join(__dirname,'./')))
app.use(bodyParser({ "formLimit": "5mb", "jsonLimit": "5mb", "textLimit": "5mb" }))
app.use(async (ctx, next) => {
    ctx.body = ctx.request.body;
    await next();
})


renderRouters(app)
sendRouters(app)

app.listen('3600', function() {
    // logger.info('server start listening on 3600');
    // logger.log('info',' server start listening on 3600');
    console.log('check server listening on port 3600');
});


