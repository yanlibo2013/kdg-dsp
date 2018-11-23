import axios from '../../common/axios'

let baseUrl="";

//创意列表
export const creativeListPage = (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-listPage',
    data: data
});


//效果分析获取计划对应的创意
export const publicCreativeAll = (data) =>axios({
    method: 'post',
    url: baseUrl + '/public-creativeAll',
    data: data
});



//创意尺寸列表
export const creativeSizeList = (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-sizelist',
    data: data
});
//创意开启
export const creativeFlagOpenajax= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-flagOpenajax',
    data: data
});
//创意关闭
export const creativeflagCloseajax= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-flagCloseajax',
    data: data
});
//创意复制
export const creativeCooy= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-copy',
    data: data
});
//创意删除
export const creativeDel= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-Delect',
    data: data
});
//创意修改到达地址
export const creativeEditlanding= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-editlanding',
    data: data
});
//创意修改打开类型
export const creativeFlagEditlink= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-editlink',
    data: data
});
//添加banner创意
export const creativeBanner= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-banner',
    data: data
});


//添加native创意
// export const creativeNative= (data) =>axios({
//     method: 'post',
//     url: baseUrl + '/creative-native',
//     data: data
// });

//添加native创意  
export const creativeNative= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-doNativeNew',
    data: data
});

//创意模板尺寸列表
export const creativeTemplateSizeList= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-tempsizelist',
    data: data
});
//创意模板列表
export const creativeTempListPage= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-tempListPage',
    data: data
});
//获取创意模板信息
export const creativeTempInfo= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-tempOne',
    data: data
});
//添加video
export const creativeVideo= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-doVideo',
    data: data
});
//修改创意名称
export const creativeFlagEditName= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-editname',
    data: data
});

//修改类型 与到达地址 creative-editTypeLink 旧版和新版 creative-editTypeLinkNew  
export const creativeeditTypeLink= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-editTypeLink',
    data: data
});

//获取当前登录这下的所有的客户
export const getAcountInformation= (data) =>axios({
    method: 'post',
    url: baseUrl + '/admin-accountInformation',
    data: data
});



//修改创意名称
export const creativeEditname= (data) =>axios({
    method: 'post',
    url: baseUrl + '/creative-editname',
    data: data
});

//
export const creativeCooy1= (data) =>axios({
    method: 'post',
    url: baseUrl + '/camp-campCopy',
    data: data
});

//上传native中的获得标签
export const creativeEditLabel= (data) =>axios({
    method: 'post',
    url: baseUrl + '/ad-industryType',
    data: data
});

//上传native中的获取图片的大小
export const mediaAdlistNewgetadSize= (data) =>axios({
    method: 'post',
    url: baseUrl + 'mediaAdlistNew-getadSize',
    data: data
});



