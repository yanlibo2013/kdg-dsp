import axios from '../../common/axios'

let baseUrl=""


//报表中心-效果分析
export const centerlist = (data) =>axios({
    method: 'post',
    url: baseUrl + '/camp-centerlist',
    data: data
});


//报表中心-基础数据报表
export const centerbaselist = (data) =>axios({
    method: 'post',
    url: baseUrl + '/camp-centerbaselist',
    data: data
});


//导出基础报表
export const campbasedown = (data) =>axios({
    method: 'post',
    url: baseUrl + '/camp-basedown',
    data: data
});


//报表中心-基础数据报表
export const downfile = (data) =>axios({
    method: 'post',
    url: baseUrl + '/camp-down',
    data: data
});
