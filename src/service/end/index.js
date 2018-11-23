import axios from '../../common/axios'

let baseUrl=""

//账户添加入库
export const accountadd = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-accountadd',
    data: data
});
//客户添加   重构
export const DoEditAd = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-DoEditAd',
    data: data
});
//系统错误日志查询
export const getErrorLogListPage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/log-getErrorLogListPage',
    data: data
});
//用户操作日志查询
export const getUserOperateLogListPage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/log-getUserOperateLogListPage',
    data: data
});
//角色列表
export const getlistPage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-getlistPage',
    data: data
});

//角色列表  开启
export const flagOpenajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-flagOpenajax',
    data: data
});

//角色列表 关闭
export const flagCloseajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-flagCloseajax',
    data: data
});

//角色列表 删除
export const roleDelect = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-roleDelect',
    data: data
});

//角色修改默认页面
export const roleDefault = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-roleDefault',
    data: data
});

//角色添加修改
export const roleAdd = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-roleAdd',
    data: data
});

//获取所有权限
export const publicPrivilege = (data) =>axios({
    method: 'post',
    url: baseUrl + '/public-privilege',
    data: data
});


//角色列表 帐户数量
export const roleAccountNum = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-getAllRoleAccount',
    data: data
});

//获取所有的角色信息role-roleAll
export const roleAll = (data)=>axios({
    method: 'post',
    url: baseUrl + '/role-roleAll',
    data: data
})


//角色列表 权限信息
export const roleHave = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-roleHave',
    data: data
});


//账户列表 
export const adminGetlistPage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-getlistPage',
    data: data
});

//账户列表 开启
export const adminFlagOpenajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-flagOpenajax',
    data: data
});

//账户列表 关闭
export const adminFlagCloseajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-flagCloseajax',
    data: data
});

//账户列表 删除
export const adDelect = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-adDelect',
    data: data
});

//账户编辑 提交
export const adEdit = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-accountEdit',
    data: data
});


//客户列表 
export const customeList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-adListPage',
    data: data
});
//客户列表 开启
export const customeOpen = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-flagOpenajax',
    data: data
});
//客户列表 关闭
export const customeClose = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-flagCloseajax',
    data: data
});
//客户列表 删除
export const customeDel = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-adDelect',
    data: data
});

//单个客户详细信息
export const customInfo = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-defaultAdEdit',
    data: data
});
//获取账户默认页面的数据(帐户编辑)
export const adminInfo = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-userDefault',
    data: data
});

//获取指定账户下的客户
export const personInfo = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-accountIdInformation',
    data: data
});
//当前登录账户下面的客户信息  list
export const customList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-accountInformation',
    data: data
});

//获取除自己本身的所有的客户
export const industryType = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-industryType',
    data: data
});

//基础报表页面 获得媒体类型
export const platgetMediaList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-getMediaList',
    data: data
});


//获取除自己本身的所有的客户
export const getAdAcount = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-account',
    data: data
});


//移除单个广告主资质图片
export const delFile = (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-DelAptitude',
    data: data
});


// 客户审核 列表
export const getCustomeList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audi-auListpage',
    data: data
});



// 获取广告主图片及详情和平台
export const getPlatformInfo = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audi-advertiserInfoImg',
    data: data
});

// 对外审核提交
export const addReview = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audi-auditExternal',
    data: data
});


// 查询广告主对应的外审的信息
export const adverExternalAudit = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audi-adverExternalAudit',
    data: data
});


// 素材审核
export const materialList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audicre-creListpage',
    data: data
});


// 查询计划对应的外审的信息
export const materialInfo = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audicre-CreativeExternalAudit',
    data: data
});





//渠道添加
export const addPlatform = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-doEditNew',
    data: data
});


//渠道列表
export const platformList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-getlist',
    data: data
});

//获取单个记录
export const getPlatformItem = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-getOne',
    data: data
});
//渠道开启
export const openPlatform = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-flagOpenajax',
    data: data
});
//渠道关闭
export const closePlatform = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-flagCloseajax',
    data: data
});
//渠道删除
export const delPlatform = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-platDelect',
    data: data
});

//
export const getSizeList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-getadSize',
    data: data
});

export const getTagList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-label',
    data: data
});


// 广告主批量审核
export const adBatch = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audi-adoptAudi',
    data: data
});


// 素材批量审核
export const materialBatch = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audicre-upAudiStatus',
    data: data
});

// 获取广告主下面所有资质文件图片
export const adFileImage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audi-advertiserImg',
    data: data
});


// 平台尺寸获取
export const getPlatformSize = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantsize-getAll',
    data: data
});


// 平台尺寸添加
export const addSizeItem = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantsize-add',
    data: data
});

// 素材点击选择平台
export const materialGetPlatformInfo = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audicre-creativeInfo',
    data: data
});

// 素材提交平台审核
export const materialAddReview = (data) =>axios({
    method: 'post',
    url: baseUrl + '/audicre-CreativeAuditExternal',
    data: data
});

//获取角色对应的所有的登录者
export const getAllRoleAccount = (data) =>axios({
    method: 'post',
    url: baseUrl + '/role-getAllRoleAccount',
    data: data
});

//获得其他，其他，行业资质
export const getAllAptitude = (data) =>axios({
    method: 'post',
    url: baseUrl + '/aptitude-getAll',
    data: data
});


