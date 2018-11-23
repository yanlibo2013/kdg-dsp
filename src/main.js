import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {
    routerMode
} from './config/env'
import './config/rem'

import "./style/flexgird/css/index"
// import FastClick from 'fastclick'

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';

import 'video.js/dist/video-js.css';
import axios from "./common/axios";
import storejs from "store"

// import JsEncrypt from 'jsencrypt'
import JsEncrypt from './common/jsencrypt'


//RSA encrypt
Vue.prototype.$jsEncrypt = JsEncrypt;


import 'vue-tree-halower/dist/halower-tree.min.css' 
import VTree from 'vue-tree-halower'
Vue.use(VTree)


import "./style/hover/index"
import "./style/animate/index"
// import "./style/animate/vue-animate-transitions.min"

Vue.use(Element)
Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savedPosition) {
        // console.log("scrollBehavior");
        window.scrollTo(0, 0);

    },
    afterEach() {
        // console.log("afterEach");
        // window.scrollTo(0, 0);
    }
})


if (storejs.get("token")) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + storejs.get("token");
}

new Vue({
    router,
    store,
}).$mount('#app')