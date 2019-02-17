import axios from 'axios'
import { url } from 'inspector';
const HttpServer = {}

HttpServer.install = function (Vue) {
    // 4. 添加实例方法
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if (url !== "login") {
            const AUTH_TOKEN = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    Vue.prototype.$http = axios
}
export default HttpServer