import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations/index'
import actions from './action/index'
import getters from './getters/index'

Vue.use(Vuex)

const state = {
    publickKey:"",
    defaultOpeneds: [],
    homeBaseInfo: "",
    currentCheckedAd: "", //:""
    currentCheckedName:"",
    planid: false,
    planOptions: [], //投放计划列表
    login: "", //登录之后基本信息
    currentuser: "", //当前用户
    currentAd: "",
    sidebar: [], //侧边栏
    activemenu: "",
    breadcrumblist: [{
            home: [{
                title: "首页",
                last: true,
                key: 0
            }]
        },
        {
            plantable: [{
                    title: "投放管理",
                    path: "",
                    key: 1

                },
                {
                    title: "首页",
                    path: "/home",
                    key: 2

                },
                {
                    title: "投放计划",
                    path: "",
                    last: true,
                    key: 3
                }
            ]
        },
        {
            createplan: [{
                    title: "投放管理",
                    path: '/plantable/5',
                    key: 4
                },
                {
                    title: "首页",
                    path: "/home",
                    key: 5

                },
                {
                    title: "投放计划",
                    path: "",
                    key: 7
                },
                {
                    title: "创建投放计划",
                    path: "",
                    last: true,
                    key: 6
                }
            ]
        },
        {
            editplan: [{
                    title: "投放管理",
                    path: "",
                    key: 7
                },
                {
                    title: "首页",
                    path: "/home",
                    key: 5

                },
                {
                    title: "投放计划",
                    path: "",
                    key: 6
                },
                {
                    title: "编辑投放计划",
                    path: "",
                    last: true,
                    key: 9
                }
            ]
        },
        {
            relation: [{
                    title: "投放管理",
                    path: "",
                    key: 10
                },
                {
                    title: "首页",
                    path: "/home",
                    key: 5

                },
                {
                    title: "投放计划",
                    path: "",
                    key: 6
                },
                {
                    title: "创意关联列表",
                    path: "",
                    last: true,
                    key: 12
                }
            ]
        },
        {
            list: [{
                    title: "创意中心",
                    path: "",
                    key: 13
                },
                {
                    title: "创意列表",
                    path: "",
                    last: true,
                    key: 14
                }
            ]
        },
        {
            banner: [{
                    title: "创意中心",
                    path: "",
                    key: 15
                },
                {
                    title: "创意列表",
                    path: "/list",
                    // last: true,
                    key: 14
                },
                {
                    title: "上传Banner",
                    path: "",
                    last: true,
                    key: 16
                }
            ]
        },
        {
            native: [{
                    title: "创意中心",
                    path: "",
                    key: 17
                },
                {
                    title: "创意列表",
                    path: "/list",
                    key: 14
                },
                {
                    title: "上传Native",
                    path: "",
                    last: true,
                    key: 18
                }
            ]
        },
        {
            pretemplate: [{
                    title: "创意中心",
                    path: "",
                    key: 19
                },
                {
                    title: "创意列表",
                    path: "/list",
                    key: 14
                },
                {
                    title: "原生模板列表",
                    path: "",
                    key: 18
                },
                {
                    title: "模版展示",
                    path: "",
                    last: true,
                    key: 21
                }
            ]
        },
        {
            video: [{
                    title: "创意中心",
                    path: "",

                    key: 22
                },
                {
                    title: "创意列表",
                    path: "/list",

                    key: 14
                },
                {
                    title: "上传Video",
                    path: "",
                    last: true,
                    key: 23
                }
            ]
        },
        {
            base: [{
                    title: "报表中心",
                    path: "",
                    key: 24
                },
                {
                    title: "基础数据报表",
                    path: "",
                    last: true,
                    key: 25
                }
            ]
        },
        {
            effect: [{
                    title: "报表中心",
                    path: "",
                    key: 26
                },
                {
                    title: "投放效果分析",
                    path: "",
                    last: true,
                    key: 27
                }
            ]
        },
        {
            role: [{
                    title: "后台管理",
                    path: "",
                    key: 28
                }, {
                    title: "权限管理",
                    path: "",
                    key: 29
                },
                {
                    title: "角色列表",
                    path: "",
                    last: true,
                    key: 30
                }
            ]
        },
        {
            account: [{
                    title: "后台管理",
                    path: "",
                    key: 31
                }, {
                    title: "权限管理",
                    path: "",
                    key: 32
                },
                {
                    title: "账户列表",
                    path: "",
                    last: true,
                    key: 33
                }
            ]
        },
        {
            accountcreate: [{
                    title: "后台管理",
                    path: "",
                    key: 34
                }, {
                    title: "权限管理",
                    path: "",
                    key: 35
                },
                {
                    title: "账户创建",
                    path: "",
                    last: true,
                    key: 36
                }
            ]
        },
        {
            accountedit: [{
                    title: "后台管理",
                    path: "",
                    key: 37
                }, {
                    title: "权限管理",
                    path: "",
                    key: 38
                },
                {
                    title: "账户编辑",
                    path: "",
                    last: true,
                    key: 39
                }
            ]
        },
        {
            custome: [{
                    title: "后台管理",
                    path: "",
                    key: 40
                },
                {
                    title: "客户管理",
                    path: "",
                    last: true,
                    key: 41
                }
            ]
        },
        {
            meadia: [{
                title: "媒体管理",
                path: "",
                key: 42
            }, {
                title: "媒体列表",
                path: "",
                last: true,
                key: 43
            }]
        },
        {
            meadiaedit: [{
                title: "媒体管理",
                path: "",
                key: 44
            }, {
                title: "媒体编辑",
                path: "",
                last: true,
                key: 45
            }]
        },
        //竞价媒体
        {
            meadiabid: [{
                title: "媒体管理",
                path: "",
                key: 46
            }, {
                title: "媒体列表",
                path: "",
                last: true,
                key: 47
            }]
        },
        {
            meadiaeditbid: [{
                title: "媒体管理",
                path: "",
                key: 48
            }, {
                title: "媒体编辑",
                path: "",
                last: true,
                key: 49
            }]
        },
        //媒体管理 广告位
        {
            advertise: [{
                title: "媒体管理",
                path: "",
                key: 50
            }, {
                title: "广告位列表",
                path: "",
                last: true,
                key: 51
            }]
        },
        {
            advertiseedit: [{
                title: "媒体管理",
                path: "",
                key: 52
            },  {
                title: "广告位列表",
                path: "/advertise",
                key: 53
            },{
                title: "广告位编辑",
                path: "",
                last: true,
                key: 54
            }]
        },
        {
            resourse: [{
                    title: "媒体管理",
                    path: "",
                    key: 55
                },
                {
                    title: "资源列表",

                    path: "",
                    last: true,
                    key: 56
                }
                // , {
                //     title: "优选资源配置列表",
                //     path: "",
                //     last: true,
                //     key: 43
                // }
            ]
        },
        {
            resourseSet: [{
                    title: "媒体管理",
                    path: "",
                    key: 57
                },
                {
                    title: "资源列表",
                    path: "/resourse",
                    key: 58
                }, {
                    title: "优选资源配置",
                    path: "",
                    last: true,
                    key: 59
                }
            ]
        },
        {
            space: [{
                title: "后台管理",
                path: "",
                key: 60
            }, {
                title: "个人信息",
                path: "",
                last: true,
                key: 61
            }]
        },
        {
            customeedit: [{
                title: "后台管理",
                path: "",
                key: 62
            }, {
                title: "客户管理",
                path: "/custome",
                key: 63
            }, {

                title: "编辑客户",
                last: true,
                key: 64
            }]
        },
        {
            customecreate: [{
                title: "后台管理",
                path: "",
            }, {
                title: "客户管理",
                path: "/custome",
            }, {
                title: "创建客户",
                last: true
            }]
        },
        {
            platformlist: [{
                title: "后台管理",
                path: "",
            }, {
                title: "平台接入配置",
                path: "",
                last: true
            }]
        },
        {
            platformadd: [{
                title: "后台管理",
                path: "",
            }, {
                title: "平台接入配置",
                path: "/platformlist",
            }, {
                title: "平台接入配置新建",
                path: "",
                last: true
            }]
        },
        {
            platformedit: [{
                title: "后台管理",
                path: "",
            }, {
                title: "平台接入配置",
                path: "/platformlist",
            }, {
                title: "平台接入配置编辑",
                path: "",
                last: true
            }]
        },
        {
            advertiserAudit: [{
                title: "后台管理",
                path: "",
            }, {
                title: "广告主审核",
                path: "",
                last: true
            }]
        },
        {
            materialAudit: [{
                title: "后台管理",
                path: "",
            }, {
                title: "素材审核",
                path: "",
                last: true
            }]
        }
    ],
    currentbreadcrumb: [],
    //投放管理
    advertiser: "", //存放登录者下的所有的客户
    plan: "", //存放客户的计划
    allclick: "", //存放客户的总点击次数
    allview: "", //存放客户的所有的曝光次数
    planlist: [],
    result: "",
    tempnetwork: "", //网络类型 显示隐藏
    tempdevice: "", //设备定向 显示隐藏
    parnetMenu: "", //父及菜单

    tempmeadia: [], //媒体  显示 隐藏
    tempadposition: [], //广告位 显示 隐藏

    networktype: [], //网络类型被选中元素
    device: [], //设备定向被选中元素
    meadia: [], //媒体被选中元素
    adposition: [], //广告位被选中元素

    adList: [],

    meadialist: [],
    dpositionlist: [],
    //地域
    terrainResult: [],
    province: [],
    terrainSourceData: [],

    //时段
    // monday: [{
    //     key: "0",
    //     value: "0"
    // }, {
    //     key: "1",
    //     value: "0"
    // }, {
    //     key: "2",
    //     value: "0"
    // }, {
    //     key: "3",
    //     value: "0"
    // }, {
    //     key: "4",
    //     value: "0"
    // }, {
    //     key: "5",
    //     value: "0"
    // }, {
    //     key: "6",
    //     value: "0"
    // }, {
    //     key: "7",
    //     value: "0"
    // }, {
    //     key: "8",
    //     value: "0"
    // }, {
    //     key: "9",
    //     value: "0"
    // }, {
    //     key: "10",
    //     value: "0"
    // }, {
    //     key: "11",
    //     value: "0"
    // }, {
    //     key: "12",
    //     value: "0"
    // }, {
    //     key: "13",
    //     value: "0"
    // }, {
    //     key: "14",
    //     value: "0"
    // }, {
    //     key: "15",
    //     value: "0"
    // }, {
    //     key: "16",
    //     value: "0"
    // }, {
    //     key: "17",
    //     value: "0"
    // }, {
    //     key: "18",
    //     value: "0"
    // }, {
    //     key: "19",
    //     value: "0"
    // }, {
    //     key: "20",
    //     value: "0"
    // }, {
    //     key: "21",
    //     value: "0"
    // }, {
    //     key: "22",
    //     value: "0"
    // }, {
    //     key: "23",
    //     value: "0"
    // }],
    //时段
    monday: [{
        key: "0",
        value: "1"
    }, {
        key: "1",
        value: "1"
    }, {
        key: "2",
        value: "1"
    }, {
        key: "3",
        value: "1"
    }, {
        key: "4",
        value: "1"
    }, {
        key: "5",
        value: "1"
    }, {
        key: "6",
        value: "1"
    }, {
        key: "7",
        value: "1"
    }, {
        key: "8",
        value: "1"
    }, {
        key: "9",
        value: "1"
    }, {
        key: "10",
        value: "1"
    }, {
        key: "11",
        value: "1"
    }, {
        key: "12",
        value: "1"
    }, {
        key: "13",
        value: "1"
    }, {
        key: "14",
        value: "1"
    }, {
        key: "15",
        value: "1"
    }, {
        key: "16",
        value: "1"
    }, {
        key: "17",
        value: "1"
    }, {
        key: "18",
        value: "1"
    }, {
        key: "19",
        value: "1"
    }, {
        key: "20",
        value: "1"
    }, {
        key: "21",
        value: "1"
    }, {
        key: "22",
        value: "1"
    }, {
        key: "23",
        value: "1"
    }],
    tuesday: [{
        key: "0",
        value: "1"
    }, {
        key: "1",
        value: "1"
    }, {
        key: "2",
        value: "1"
    }, {
        key: "3",
        value: "1"
    }, {
        key: "4",
        value: "1"
    }, {
        key: "5",
        value: "1"
    }, {
        key: "6",
        value: "1"
    }, {
        key: "7",
        value: "1"
    }, {
        key: "8",
        value: "1"
    }, {
        key: "9",
        value: "1"
    }, {
        key: "10",
        value: "1"
    }, {
        key: "11",
        value: "1"
    }, {
        key: "12",
        value: "1"
    }, {
        key: "13",
        value: "1"
    }, {
        key: "14",
        value: "1"
    }, {
        key: "15",
        value: "1"
    }, {
        key: "16",
        value: "1"
    }, {
        key: "17",
        value: "1"
    }, {
        key: "18",
        value: "1"
    }, {
        key: "19",
        value: "1"
    }, {
        key: "20",
        value: "1"
    }, {
        key: "21",
        value: "1"
    }, {
        key: "22",
        value: "1"
    }, {
        key: "23",
        value: "1"
    }],
    wendesday: [{
        key: "0",
        value: "1"
    }, {
        key: "1",
        value: "1"
    }, {
        key: "2",
        value: "1"
    }, {
        key: "3",
        value: "1"
    }, {
        key: "4",
        value: "1"
    }, {
        key: "5",
        value: "1"
    }, {
        key: "6",
        value: "1"
    }, {
        key: "7",
        value: "1"
    }, {
        key: "8",
        value: "1"
    }, {
        key: "9",
        value: "1"
    }, {
        key: "10",
        value: "1"
    }, {
        key: "11",
        value: "1"
    }, {
        key: "12",
        value: "1"
    }, {
        key: "13",
        value: "1"
    }, {
        key: "14",
        value: "1"
    }, {
        key: "15",
        value: "1"
    }, {
        key: "16",
        value: "1"
    }, {
        key: "17",
        value: "1"
    }, {
        key: "18",
        value: "1"
    }, {
        key: "19",
        value: "1"
    }, {
        key: "20",
        value: "1"
    }, {
        key: "21",
        value: "1"
    }, {
        key: "22",
        value: "1"
    }, {
        key: "23",
        value: "1"
    }],
    tursday: [{
        key: "0",
        value: "1"
    }, {
        key: "1",
        value: "1"
    }, {
        key: "2",
        value: "1"
    }, {
        key: "3",
        value: "1"
    }, {
        key: "4",
        value: "1"
    }, {
        key: "5",
        value: "1"
    }, {
        key: "6",
        value: "1"
    }, {
        key: "7",
        value: "1"
    }, {
        key: "8",
        value: "1"
    }, {
        key: "9",
        value: "1"
    }, {
        key: "10",
        value: "1"
    }, {
        key: "11",
        value: "1"
    }, {
        key: "12",
        value: "1"
    }, {
        key: "13",
        value: "1"
    }, {
        key: "14",
        value: "1"
    }, {
        key: "15",
        value: "1"
    }, {
        key: "16",
        value: "1"
    }, {
        key: "17",
        value: "1"
    }, {
        key: "18",
        value: "1"
    }, {
        key: "19",
        value: "1"
    }, {
        key: "20",
        value: "1"
    }, {
        key: "21",
        value: "1"
    }, {
        key: "22",
        value: "1"
    }, {
        key: "23",
        value: "1"
    }],
    friday: [{
        key: "0",
        value: "1"
    }, {
        key: "1",
        value: "1"
    }, {
        key: "2",
        value: "1"
    }, {
        key: "3",
        value: "1"
    }, {
        key: "4",
        value: "1"
    }, {
        key: "5",
        value: "1"
    }, {
        key: "6",
        value: "1"
    }, {
        key: "7",
        value: "1"
    }, {
        key: "8",
        value: "1"
    }, {
        key: "9",
        value: "1"
    }, {
        key: "10",
        value: "1"
    }, {
        key: "11",
        value: "1"
    }, {
        key: "12",
        value: "1"
    }, {
        key: "13",
        value: "1"
    }, {
        key: "14",
        value: "1"
    }, {
        key: "15",
        value: "1"
    }, {
        key: "16",
        value: "1"
    }, {
        key: "17",
        value: "1"
    }, {
        key: "18",
        value: "1"
    }, {
        key: "19",
        value: "1"
    }, {
        key: "20",
        value: "1"
    }, {
        key: "21",
        value: "1"
    }, {
        key: "22",
        value: "1"
    }, {
        key: "23",
        value: "1"
    }],
    saturday: [{
        key: "0",
        value: "1"
    }, {
        key: "1",
        value: "1"
    }, {
        key: "2",
        value: "1"
    }, {
        key: "3",
        value: "1"
    }, {
        key: "4",
        value: "1"
    }, {
        key: "5",
        value: "1"
    }, {
        key: "6",
        value: "1"
    }, {
        key: "7",
        value: "1"
    }, {
        key: "8",
        value: "1"
    }, {
        key: "9",
        value: "1"
    }, {
        key: "10",
        value: "1"
    }, {
        key: "11",
        value: "1"
    }, {
        key: "12",
        value: "1"
    }, {
        key: "13",
        value: "1"
    }, {
        key: "14",
        value: "1"
    }, {
        key: "15",
        value: "1"
    }, {
        key: "16",
        value: "1"
    }, {
        key: "17",
        value: "1"
    }, {
        key: "18",
        value: "1"
    }, {
        key: "19",
        value: "1"
    }, {
        key: "20",
        value: "1"
    }, {
        key: "21",
        value: "1"
    }, {
        key: "22",
        value: "1"
    }, {
        key: "23",
        value: "1"
    }],
    weekday: [{
        key: "0",
        value: "1"
    }, {
        key: "1",
        value: "1"
    }, {
        key: "2",
        value: "1"
    }, {
        key: "3",
        value: "1"
    }, {
        key: "4",
        value: "1"
    }, {
        key: "5",
        value: "1"
    }, {
        key: "6",
        value: "1"
    }, {
        key: "7",
        value: "1"
    }, {
        key: "8",
        value: "1"
    }, {
        key: "9",
        value: "1"
    }, {
        key: "10",
        value: "1"
    }, {
        key: "11",
        value: "1"
    }, {
        key: "12",
        value: "1"
    }, {
        key: "13",
        value: "1"
    }, {
        key: "14",
        value: "1"
    }, {
        key: "15",
        value: "1"
    }, {
        key: "16",
        value: "1"
    }, {
        key: "17",
        value: "1"
    }, {
        key: "18",
        value: "1"
    }, {
        key: "19",
        value: "1"
    }, {
        key: "20",
        value: "1"
    }, {
        key: "21",
        value: "1"
    }, {
        key: "22",
        value: "1"
    }, {
        key: "23",
        value: "1"
    }],

    reportList: [],

    //后台管理
    secIndustry: "",
    companydata: [],
    otherdata: [],
    businessdata: [],
    isEditcity: "",


    //
    height: "",
    checkeedMeadiaItem: [],
    checkedAdItem: [],
    adclick: "正在获取数据...", //点击率
    adview: "正在获取数据...", //曝光率



}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
