import axios from '../../common/axios'

let baseUrl=""


//媒体管理 列表
export const getMeadiaList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-getplatall',
    data: data
});
//媒体管理 开启
export const openMeadia = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-flagOpenajax',
    data: data
});
//媒体管理  关闭
export const closeMeadia = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-flagCloseajax',
    data: data
});
//媒体管理 删除
export const delMeadia = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-campDelect',
    data: data
});

//修改或添加媒体信息
export const editMeadia = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-doEditPlat',
    data: data
});

//获取单条媒体信息
export const getMeadiaInfo = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-getInfo',
    data: data
});

//所有媒体列表
export const getPlatAll = (data) =>axios({
    method: 'post',
    url: baseUrl + '/public-getPlatAll',
    data: data
});


//资源列表
export const getResourceList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/media-getlistPage',
    data: data
});



//获得所有媒体列表
export const meadiaType = (data) =>axios({
    method: 'post',
    url: baseUrl + '/public-getPlatAll',
    data: data
});


//获得资源列表
export const meadiaResourcePage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/media-getlistPage',
    data: data
});

export const meadiaResourcePageBACK = (data) =>axios({
    method: 'get',
    url: 'https://www.easy-mock.com/mock/5aa8cb6eed660354c14569c0/getData_copy/media-getlistPage',
    data: data
});


//修改Appid 广告位ID
export const changeMeadiaResourcePage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/media-UpMediaAppidAdpid',
    data: data
});

//资源列表单项配置
export const getMediaRuleConfig = (data) =>axios({
    method: 'post',
    url: baseUrl + '/media-getMediaRuleConfig',
    data: data
});

export const getMediaRuleConfigBACK = (data) =>axios({
    method: 'post',
    url: 'https://www.easy-mock.com/mock/5aa8cb6eed660354c14569c0/getData_copy/media-getMediaRuleConfig',
    data: data
});



//资源列表单项配置项保存
export const doEditMediaRuleConfig = (data) =>axios({
    method: 'post',
    url: baseUrl + '/media-doEditMediaRuleConfig',
    data: data
});


//获得媒体的列表数据
export const platGetplatall = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-getplatall',
    data: data
});

//开启媒体信息
export const flagOpenajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-flagOpenajax',
    data: data
});

//关闭媒体信息
export const flagCloseajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-flagCloseajax',
    data: data
});

//删除媒体信息
export const platCampDelect = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-campDelect',
    data: data
});

//添加或者修改媒体信息
export const platDoEditPlat = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-doEditPlat',
    data: data
});

//媒体分类列表
export const platGetMediaList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plat-getMediaList',
    data: data
});


//竞价媒体列表
export const meadiaListbid = (data) =>axios({
    method: 'post',
    url: baseUrl + '/medias-getMediaList',
    data: data
});

//竞价媒体开启
export const bidMeadiaOpen = (data) =>axios({
    method: 'post',
    url: baseUrl + '/medias-flagOpenajax',
    data: data
});
//竞价媒体关闭
export const bidMeadiaClose = (data) =>axios({
    method: 'post',
    url: baseUrl + '/medias-flagCloseajax',
    data: data
});
//竞价媒体删除
export const bidMeadiaDel = (data) =>axios({
    method: 'post',
    url: baseUrl + '/medias-flagDelect',
    data: data
});

//竞价 添加 编辑
export const bidMeadiaEdit = (data) =>axios({
    method: 'post',
    url: baseUrl + '/medias-editadd',
    data: data
});

//获取竞价单条媒体信息
export const getMeadiaInfobid = (data) =>axios({
    method: 'post',
    url: baseUrl + '/medias-getMediaOne',
    data: data
});





//竞价广告位列表
export const mediaAdlistNew_mediaAdlitlist = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-mediaAdlitlist',
    data: data
});

//获取广告位列表对应的广告样式
export const mediaAdlistNew_mediaAdAttr = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-adAttr',
    data: data
});


//竞价广告位的创建和修改
export const mediaAdlistNew_mediaAdlitEdit = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-mediaAdlitEdit',
    data: data
});

//18.06.19改版后竞价广告位的创建和修改 
export const mediaAdlistNew_mediaAdlitEditNew = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-mediaAdlitEditNew',
    data: data
});

//竞价广告位的修改默认数据
export const mediaAdlistNew_mediaAdlitDefault = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-mediaAdlitDefault',
    data: data
});

//竞价广告位的删除
export const mediaAdlistNew_mediaAdlitDel = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-mediaAdlitDel',
    data: data
});

//竞价广告位的开启
export const mediaAdlistNew_flagOpenajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-flagOpenajax',
    data: data
});

//竞价广告位的关闭
export const mediaAdlistNew_flagCloseajax = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-flagCloseajax',
    data: data
});









//获取媒体下面对应广告位
export const getAdByMeadia = (data) =>axios({
    method: 'post',
    url: baseUrl + '/mediaAdlistNew-getMediaAdlist',
    data: data
});


//渠道列表
export const getPlatformLiist = (data) =>axios({
    method: 'post',
    url: baseUrl + '/plantform-getalllog',
    data: data
});