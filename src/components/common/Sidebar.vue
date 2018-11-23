<template>
    <div class="sidebar">
        <el-aside>
            <div class="logo_box">
                <div class="logo">
                </div>
            </div>
            <el-menu :default-active="onRoutes" :router="true" :default-openeds="defaultOpeneds" @select="selectMenu">
                <template v-for="item in items">
                    <template v-if="item.chiled">
                        <el-submenu :index="item.id.toString()" :key="item.id.toString()">
                            <template slot="title">
                                <i :class="item.icon"></i>{{ item.name }}
                            </template>
                            <el-menu-item v-for="(subItem,i) in item.chiled" :key="i" :index="subItem.path" :route='{ path: "/"+subItem.path }' @click="activeMenu">{{ subItem.name }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.path" :route='{ path: "/"+subItem.path }' :key="item.id.toString()">
                            <i :class="item.icon"></i>{{ item.n }}
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>

        </el-aside>
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import {
    setCookie,
    getCookie,
    delCookie
} from "../../common/utils";
import store from 'store';
export default {
    mounted () {
        // if (getCookie("sidebar")) {
        //     this.getSideBar(JSON.parse(getCookie("sidebar")));
        // }
        // this.items=this.$store.state.sidebar;
        this.items = store.get("sidebar");
    },
    data: function () {
        return {
            items: [],
            // items: [{
            //     "name": "投放管理",
            //     "icon": "el-icon-output",
            //     "id": 1,
            //     "chiled": [{
            //         "name": "首页",
            //         "path": "home"
            //     }]
            // }, {
            //     "name": "创意中心",
            //     "icon": "el-icon-creative",
            //     "id": 2,
            //     "chiled": [{
            //         "name": "创意列表",
            //         "path": "list"
            //     }]
            // }, {
            //     "name": "媒体管理",
            //     "icon": "el-icon-media",
            //     "id": 3,
            //     "chiled": [{
            //             "name": "资源列表",
            //             "path": "resourse"
            //         },
            //         //竞价媒体
            //         {
            //             "name": "媒体列表",
            //             "path": "meadiabid"
            //         },
            //     ]
            // }, {
            //     "name": "报表中心",
            //     "icon": "el-icon-report",
            //     "id": 4,
            //     "chiled": [{
            //         "name": "效果分析",
            //         "path": "effect",
            //     },
            //      {
            //         "name": "基础数据报表",
            //         "path": "base",
            //     }
            //     ]
            // }, {
            //     "name": "后台管理",
            //     "icon": "el-icon-backstage",
            //     "id": 5,
            //     "chiled": [{
            //             "name": "客户管理",
            //             "path": "custome",

            //         }, {
            //             "name": "个人信息",
            //             "path": "space",
            //         },
            //         {
            //             "name": "平台接入配置",
            //             "path": "platformlist",
            //         },
            //           {
            //             "name": "广告主审核",
            //             "path": "advertiserAudit",
            //         },

            //          {
            //             "name": "素材审核",
            //             "path": "materialAudit",
            //         },
            //     ]
            // }],

            // items: [{
            //     "name": "投放管理",
            //     "icon": "el-icon-output",
            //     "path": null,
            //     "id": 1,
            //     "pid": 0,
            //     "chiled": [{
            //         "name": "首页",
            //         "icon": "",
            //         "path": "home",
            //         "id": 60,
            //         "pid": 1,
            //         "chiled": [],


            //     }]
            // }, {
            //     "name": "创意中心",
            //     "icon": "el-icon-creative",
            //     "path": null,
            //     "id": 2,
            //     "pid": 0,
            //     "chiled": [{
            //         "name": "创意列表",
            //         "icon": null,
            //         "path": "list",
            //         "id": 14,
            //         "pid": 2,
            //         "chiled": []
            //     }]
            // }, {
            //     "name": "媒体管理",
            //     "icon": "el-icon-media",
            //     "path": null,
            //     "id": 3,
            //     "pid": 0,
            //     "chiled": [{
            //             "name": "资源列表",
            //             "icon": null,
            //             "path": "resourse",
            //             "id": 21,
            //             "pid": 3,
            //             "chiled": []

            //         },
            //         //竞价媒体
            //         {
            //             "name": "媒体列表",
            //             "icon": null,
            //             "path": "meadiabid",
            //             "id": 23,
            //             "pid": 3,
            //             "chiled": []
            //         },
            //     ]
            // }, {
            //     "name": "报表中心",
            //     "icon": "el-icon-report",
            //     "path": "",
            //     "id": 4,
            //     "pid": 0,
            //     "chiled": [{
            //         "name": "效果分析",
            //         "icon": null,
            //         "path": "effect",
            //         "id": 36,
            //         "pid": 4,
            //         "chiled": []
            //     }, {
            //         "name": "基础数据报表",
            //         "icon": null,
            //         "path": "base",
            //         "id": 37,
            //         "pid": 4,
            //         "chiled": []
            //     }]
            // }, {
            //     "name": "后台管理",
            //     "icon": "el-icon-backstage",
            //     "path": null,
            //     "id": 5,
            //     "pid": 0,
            //     "chiled": [{
            //             "name": "客户管理",
            //             "icon": null,
            //             "path": "custome",
            //             "id": 40,
            //             "pid": 5,
            //             "chiled": []
            //         }, {
            //             "name": "个人信息",
            //             "icon": null,
            //             "path": "space",
            //             "id": 61,
            //             "pid": 5,
            //             "chiled": []
            //         },
            //         {
            //             "name": "平台接入配置",
            //             "icon": null,
            //             "path": "platformlist",
            //             "id": 62,
            //             "pid": 5,
            //             "chiled": []
            //         },
            //     ]
            // }]
        }
    },
    methods: {
        ...mapActions(["getSideBar"]),
        activeMenu () {
            console.log("当前激活菜单项");
            console.log(this.$route.path.replace("/", ""));
        },
        selectMenu (key, keyPath) {
            //this.defaultOpeneds(keyPath[0]);
            //store.set("defaultOpends", keyPath[0]);
        }
    },
    computed: {
        onRoutes () {
            return this.$route.path.replace("/", "");
        },
        ...mapState({
            sidebar: "sidebar",
            currentbreadcrumb: "currentbreadcrumb",
            defaultOpeneds: "defaultOpeneds"
        })
    }
}
</script>

<style lang="scss">
    @import "../../style/mixin";
    @import "../../style/common"; // content background color
    .container-wrap {
        overflow: hidden;
        background-color: #fbfbfb;
        height: auto!important;
        .el-aside,
        .main-container {
            min-height: 200px;
            height: auto !important;
            height: 200px;
        }
        .main-container {
            // margin-bottom: -99999px;
            // padding-bottom: 99999px;
            margin-left: 220px;
            // padding: 0 30px;
            background-color: #fbfbfb;
            min-height: 100%;
            overflow-y: hidden;
            padding-top: 72px;
        } // left large container
        .sidebar {
            background-color: #1b2133;
            // position: fixed;
            // z-index: 301;
            //float: left;
            // width: 220px !important;
            // margin-bottom: -99999px;
            // padding-bottom: 99999px;

            z-index: 1001;
            position: fixed;
            left: 0;
            top: 0;
            width: 220px;
            line-height: 1;
            height: 100%;
            box-sizing: border-box;
            overflow: auto;
        }


        .el-aside {
            width: 220px !important;
            .menubar {
                border-right: 0 none;
            }
            .logo_box {
                background-color: #1b2133;
                padding: 14px 0 14px 20px;
                border-bottom: 2px solid #0c1224;
            }
            .logo {
                @include svgbg("../../style/image/role/logo.svg");
                width: 100px;
                height: 42px;
            } // siderbar menu
            .el-menu {
                background-color: #1b2133 !important;
                border-right: 0 none;
            } // menu small icon
            .el-icon-media,
            .el-icon-report,
            .el-icon-backstage,
            .el-icon-output {
                width: 14px !important;
                height: 14px;
            }
            .el-submenu [class^="el-icon-"] {
                margin-right: 20px !important;
                vertical-align: -2px !important;
            }
            .el-icon-output {
                background: url("../../style/image/common/output.svg") 0 0 no-repeat;
            }
            .el-icon-media {
                background: url("../../style/image/common/media.svg") 0 0 no-repeat;
            }
            .el-icon-report {
                background: url("../../style/image/common/report.svg") 0 0 no-repeat;
            }
            .el-icon-backstage {
                background: url("../../style/image/common/backstage.svg") 0 0 no-repeat;
            }
            .el-submenu__title {
                padding-left: 15px!important;
                color: #515974!important;
                &:hover {
                    color: #0c1224!important;
                }
                .el-icon-creative {
                    background: url("../../style/image/common/creative.svg") 0 0 no-repeat;
                    width: 15px !important;
                    margin-right: 19px!important;
                    height: 17px;
                }
            } // authority msg num
            .authority {
                padding-left: 14px;
            }
            .authority-item {
                padding-left: 20px;
                .num {
                    @include xx(30px,
                    30px,
                    14px)
                }
            }
            .el-menu-item-group {
                position: relative;
            }
            .el-stencil {
                position: relative;
                .num {
                    position: absolute;
                    top: 13px;
                    right: 21px;
                }
            } // open menu style
            .is-opened {
                .el-menu-item {
                    color: #e4ebf7;
                }
                .el-submenu__title {
                    color: #e4ebf7!important;
                }
            }
            .el-menu-item,
            .el-submenu__title {
                height: 54px;
                line-height: 54px;
                border-left: 5px solid #1b2133;
                &:focus,
                &:hover {
                    background-color: #0c1124;
                    border-color: #ff6870;
                    color: #e4ebf7!important;
                }
            }
            .el-submenu {
                &:focus,
                &:hover {
                    color: #e4ebf7;
                }
            }
            .el-menu-item.is-active {
                background-color: #0c1224;
                border-left: 5px solid #ff6870;
                color: #e4ebf7;
            }
            .el-menu-item {
                padding-left: 48px!important;
                &:focus,
                &:hover {
                    border-left: 5px solid #ff6870!important;
                    color: #e4ebf7!important;
                }
            }
            .el-menu-item-group__title {
                padding: 0 0 0 20px;
            }
        } // main content
        .el-main {
            // padding: 102px 30px 30px;
            padding: 30px;
            font-size: 14px;
            display: block;
        }
        .el-container:first-child {
            // min-width: 1200px;
        }
    }
    @media screen and (max-width:1920px) {
        .container-wrap {
            min-height: 1080px;
        }
    }
    @media screen and (max-width:1680px) {
        .container-wrap {
            min-height: 1050px;
        }
    }
    @media screen and (max-width:1366px) {
        .container-wrap {
            // min-height: 768px;
            min-height: 680px;
        }
    }
</style>