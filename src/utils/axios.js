import axios from 'axios'

// 创建实例
const service = axios.create({

});

// axios拦截器
axios.interceptors.request.use(request => {
    request.headers['Content-Type'] = 'application/json';
    console.log('请求拦截器',request)
    return request;
});
axios.default.baseURL = process.env.baseURL
console.log('process.env.baseURL环境变量',process.env.baseURL)
// 拦截响应
axios.interceptors.response.use((response) => {
    // token 已过期，重定向到登录页面
    let newRes = response.data;
    console.log('响应拦截器',newRes)
    if(newRes.code == -1 ){
        // 系统异常
        console.log(newRes.data.msg);
        this.$router.push("/")
        return;
    }else if (newRes.code == 1 ) {
        // 业务异常
        if ( newRes.data.enCode !== 1000 ) {
            console.log(newRes.data.msg);
            this.$router.push("/")
        }
        return;
    }else if (newRes.code == 0 ) {
        // 成功   1000
        if (newRes.data.enCode !== 1000 ) {
        // 失败  1001
            console.log(newRes.data.msg);
            return;
        }
    }
    return newRes.data
}, 
error => {
    return Promise.reject(error.message);   // 返回接口返回的错误信息
});

export default service;