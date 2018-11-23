import App from '../App'

const container = r => require.ensure([], () => r(require('../page/container')), 'container') // 父及容器
const home = r => require.ensure([], () => r(require('../page/home/index')), 'home') //首页
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login') //登录页面
const list = r => require.ensure([], () => r(require('../page/creative/list/index')), 'list') //创意列表
const templatect = r => require.ensure([], () => r(require('../page/creative/template/index')), 'templatect') //创意模板
const resourse = r => require.ensure([], () => r(require('../page/meadia/resource/index')), 'resourse') //资源列表
const meadia = r => require.ensure([], () => r(require('../page/meadia/meadia/index')), 'meadia') //媒体列表
const meadiaedit = r => require.ensure([], () => r(require('../page/meadia/meadia/edit')), 'meadiaedit') //媒体编辑
const meadiabid = r => require.ensure([], () => r(require('../page/meadia/meadiabid/index')), 'meadia') //竞价媒体
const meadiaeditbid = r => require.ensure([], () => r(require('../page/meadia/meadiabid/edit')), 'meadiaeditbid') //竞价媒体编辑
const pmp = r => require.ensure([], () => r(require('../page/meadia/config/index')), 'pmp') //pmp配置

const effect = r => require.ensure([], () => r(require('../page/report/analysis/index')), 'effect') //效果分析
const base = r => require.ensure([], () => r(require('../page/report/base/index')), 'base') //基础数据报表
const graph = r => require.ensure([], () => r(require('../page/report/graph/index')), 'graph') //可视化图表

const space = r => require.ensure([], () => r(require('../page/end/person/index')), 'space') //个人信息
const account = r => require.ensure([], () => r(require('../page/end/permission/account/index')), 'account') //账户管理
const accountedit = r => require.ensure([], () => r(require('../page/end/permission/account/space')), 'accountedit') //账户创建
const role = r => require.ensure([], () => r(require('../page/end/permission/role/index')), 'role') //角色管理
const roleEdit = r => require.ensure([], () => r(require('../page/end/permission/role/edit')), 'roleEdit') //角色创建编辑

const custome = r => require.ensure([], () => r(require('../page/end/custome/index')), 'custome') //客户管理
const customeedit = r => require.ensure([], () => r(require('../page/end/custome/edit')), 'customeedit') //客户管理 编辑
const templatemg = r => require.ensure([], () => r(require('../page/end/template/index')), 'templatemg') //模板管理
const message = r => require.ensure([], () => r(require('../page/end/message/index')), 'message') //消息管理
const plantable = r => require.ensure([], () => r(require('../page/put/list')), 'plantable') //计划列表
const createplan = r => require.ensure([], () => r(require('../page/put/create')), 'createplan') //创建计划
const relation = r => require.ensure([], () => r(require('../page/put/relation/index')), 'relation') //关联创意列表
const banner = r => require.ensure([], () => r(require('../page/creative/upload/banner')), 'banner') //创意中心 上传Banner
const video = r => require.ensure([], () => r(require('../page/creative/upload/video')), 'video') //创意中心 上传Banner
const native = r => require.ensure([], () => r(require('../page/creative/template/index')), 'native') //创意中心 上传Native
const pretemplate = r => require.ensure([], () => r(require('../page/creative/template/template')), 'pretemplate') //创意中心 模板展示
const resourseSet = r => require.ensure([], () => r(require('../page/meadia/resource/set')), 'resourseSet') //资源列表配置

const advertise = r => require.ensure([], () => r(require('../page/meadia/advertise/index')), 'ad') //广告位列表
const advertiseedit = r => require.ensure([], () => r(require('../page/meadia/advertise/set')), 'advertiseedit') //广告位创建编辑


//后台管理
const platformlist = r => require.ensure([], () => r(require('../page/end/platform/list')), 'platformlist') //后台管理 平台接入配置
const platformedit = r => require.ensure([], () => r(require('../page/end/platform/edit')), 'platformedit') 
//后台审核管理
const advertiserAudit = r => require.ensure([], () => r(require('../page/end/audit/advertise')), 'advertiserAudit') //广告主审核
const materialAudit = r => require.ensure([], () => r(require('../page/end/audit/material')), 'materialAudit') //素材审核


//测试
const drag  = r => require.ensure([], () => r(require('../../src/test/checkbox')), 'drag')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/login'
        },
        // {
        //     path: '/drag',
        //     component: drag
        // },

        //容器
        {
            path: '/container',
            component: container,
            children: [
                //首页城市列表页
                {
                    path: '/home',
                    component: home
                },
                //后台角色页
                {
                    path: '/role',
                    component: role

                },
                //后台角色创建页
                {
                    path: '/roleEdit',
                    component: roleEdit

                },
                 //后台角色编辑页面
                {
                    path: '/roleEdit/:id',
                    component: roleEdit

                },
                //创意列表
                {
                    path: '/list',
                    component: list

                },
                //创意模板
                {
                    path: '/templatect',
                    component: templatect

                },
                //资源列表
                {
                    path: '/resourse',
                    component: resourse

                },

                //媒体列表
                {
                    path: '/meadia',
                    component: meadia

                },
                {
                    path: '/meadiaedit',
                    component: meadiaedit

                },
                {
                    path: '/meadiaedit/:id',
                    component: meadiaedit
                },
                //竞价媒体
                {
                    path: '/meadiabid',
                    component: meadiabid

                },
                {
                    path: '/meadiaeditbid',
                    component: meadiaeditbid

                },
                {
                    path: '/meadiaeditbid/:id',
                    component: meadiaeditbid
                },

                 //广告位列表
                {
                    path: '/advertise/:id?',
                    component: advertise

                },
                {
                    path: '/advertiseedit',
                    component: advertiseedit

                },
                {
                    path: '/advertiseedit/:id',
                    component: advertiseedit
                },
                //资源列表配置
                {
                    path: '/resourseSet/:id',
                    component: resourseSet

                },
                //pmp配置
                {
                    path: '/pmp',
                    component: pmp

                },
                //效果分析
                {
                    path: '/effect',
                    component: effect

                },
                //基础数据报表
                {
                    path: '/base',
                    component: base

                },
                //可视化图表
                {
                    path: '/graph',
                    component: graph

                },
                //个人信息
                {
                    path: '/space',
                    component: space

                },
                //账户管理
                {
                    path: '/account',
                    component: account

                },
                //账户创建
                {
                    path: '/accountcreate',
                    component: accountedit

                },
                //账户编辑
                {
                    path: '/accountedit/:id',
                    component: accountedit

                },
                //客户管理
                {
                    path: '/custome',
                    component: custome

                },
				//创建客户
                {
                    path: '/customecreate',
                    component: customeedit

                },
				//编辑客户
                {
                    path: '/customeedit/:id',
                    component: customeedit

                },
                //模板管理
                {
                    path: '/templatemg',
                    component: templatemg

                },
                //消息管理
                {
                    path: '/message',
                    component: message
                },
                //计划列表
                {
                    path: '/plantable/:id',
                    component: plantable
                },
                //创建计划
                {
                    path: '/createplan/:id',
                    component: createplan
                },
                //编辑创建计划
                {
                    path: '/editplan/:id/:planid',
                    component: createplan
                },
                //关联创意列表
                {
                    path: '/relation/:adId/:planId',
                    name:'relation',
                    component: relation
                },
                //创意中心
                {
                    path: '/banner/:id',
                    component: banner
                },
                {
                    path: '/video/:id',
                    component: video
                }, {
                    path: '/native/:id',
                    component: native
                },
                //pretemplate
                {
                    path: '/pretemplate/:id',
                    component: pretemplate
                },
                
                {
                    path: '/platformlist',
                    component: platformlist
                },

                {
                    path: '/platformadd',
                    component: platformedit
                },
                {
                    path: '/platformedit/:id',
                    component: platformedit
                },
                
                // 后台广告主审核
                {
                    path: '/advertiserAudit',
                    component: advertiserAudit
                },
                // 后台素材审核
                {
                    path: '/materialAudit',
                    component: materialAudit
                },

            ]
        },
        //首页登录页
        {
            path: '/login',
            component: login
        }
    ]
}]
