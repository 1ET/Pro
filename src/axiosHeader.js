import axios from 'axios'
import {
    Message
} from 'element-ui';
const HttpServer = {};


HttpServer.install = function (Vue) {
    // 4. 添加实例方法
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if (config.url !== "login") {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers["Authorization"] = AUTH_TOKEN;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        const {
            meta: {
                msg,
                status
            }
        } = response.data;
        // 统一处理status非200和201的情况->提示框
        if (status !== 200 && status !== 201) {
            Message.warning(msg);

        }

        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    Vue.prototype.$http = axios
}
export default HttpServer