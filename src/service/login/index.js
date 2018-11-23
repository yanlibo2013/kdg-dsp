import axios from '../../common/axios'

let baseUrl=""



export const doLogin = (data) =>axios({
    method: 'post',
    url: baseUrl + '/dologin',
    data: data
});


//退出按钮
export const doLoginOut = (data) =>axios({
    method: 'post',
    url: baseUrl + '/logout',
    data: data
});




export const getPublickKey = (data) =>axios({
    method: 'post',
    url: baseUrl + '/getkeys',
    data: data
});

export const getTest = (data) =>axios({
    method: 'post',
    url: baseUrl + '/tesss',
    data: data
});