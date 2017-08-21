
import Vue from 'vue'
import VueRouter from 'vue-router'
import {setWechatTitleFun} from '../public/js/model'

// 实例化VueRouter
Vue.use(VueRouter);

// 路由表
const routes = [{ //首页
    path: '/',
    name: '/',
    meta: {
        title: '首页'
    },
    redirect: '/trainClass'
},{
    path: '/trainClass',
    name: 'trainClass',
    meta: {
        title: '训练'
    },
    component:(resolve)=>{
        require(['../vue/trainClass/trainClass.vue'], resolve);
    }
},{
    path: '/freeBicycle',
    name: 'freeBicycle',
    meta: {
        title: '自由骑行'
    },
    component:(resolve)=>{
        require(['../vue/freeBicycle/freeBicycle.vue'], resolve);
    }
},{
    path: '/trainBicycle',
    name: 'trainBicycle',
    meta: {
        title: '训练'
    },
    component:(resolve)=>{
        require(['../vue/trainBicycle/trainBicycle.vue'], resolve);
    }
},{
    path: '/friendsList',
    name: 'friendsList',
    meta: {
        title: '秀圈'
    },
    component:(resolve)=>{
        require(['../vue/friendsList/friendsList.vue'], resolve);
    }
},{
    path: '/friendsDetail',
    name: 'friendsDetail',
    meta: {
        title: '秀圈详情'
    },
    component:(resolve)=>{
        require(['../vue/friendsDetail/friendsDetail.vue'], resolve);
    }
},{
    path: '*',
    redirect: '/friendsList'
}]




var router = new VueRouter({
    routes,
// 当hashbang的值为true时，所有的路径都会被格式化已#!开头，
    // hashbang: false,
//     history: false,
//     saveScrollPosition: true,
//     transitionOnLoad: true
})

// router.beforeEach((to, from, next) => {
//     setWechatTitleFun(to.meta.title);
//     if(to.meta.isLogin==1){
//         var fundAccount=getCookie('zlhIsLogin');
//         if(!fundAccount){
//            next('/login')
//         }else{
//            next();
//         }
//     }else{
//         next();
//     }
// })

const getCookie=(name)=>{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return false;
    }  
}

export {
    router
}
