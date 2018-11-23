import axios from 'axios'
import {
    baseUrl
} from '../config/env'
import store from 'store';

export default axios.create({
    baseURL: baseUrl,
    // headers: {
    //     'Authorization': 'Bearer ' + store.get("token")
    // }
})

