import Vue from 'vue'

import App from './App.vue'
import {router} from './router/router.js'
import {store} from './store/store.js'

import Mint from 'mint-ui'
import {Lazyload} from 'mint-ui'
import 'mint-ui/lib/style.css'

import './public/css/reset.scss'

// 引入px与rem的换算
import {remToPxFun} from './public/js/model'
remToPxFun()


Vue.use(Mint);
Vue.use(Lazyload);

// 创建一个空组件
Vue.extend({});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

