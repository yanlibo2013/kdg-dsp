
import axios from '../../common/axios'

///获取登录者下的所有的广告主
export const publicAdvertiserInfo = (data) => axios({
    method: 'post',
    url: '/public-advertiserInfo',
    data: data
});

//获取广告主的计划
export const publicCampaignAll = (data) => axios({
    method: 'post',
    url: '/public-campaignAll',
    data: data
});

//获取广告主的总点击次数
export const homeGetclickviewajax = (data) => axios({
    method: 'post',
    url: '/home-getclickviewajax',
    data: data
});

//广告主的所有的曝光次数
export const publicAccountClickView = (data) => axios({
    method: 'post',
    url: '/public-accountClickView',
    data: data
});

//获取指定客户的消耗  可用余额    定投个数  在投创意   覆盖媒体
export const getindexinfo = (data) => axios({
    method: 'post',
    url: '/home-getindexinfo',
    data: data
});


