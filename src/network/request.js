import axios from 'axios'
//全局配置，告诉浏览器无论如何都要携带cookie去请求资源
axios.defaults.withCredentials=true

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3710/blog',
        settimeout: 5000,
        withCredentials: true//
    })
    // instance.interceptors.request.use(config =>{
    //     console.log(config);
    //     return config
    // },error =>{

    // })
    // instance.interceptors.response.use(res =>{
    //     // console.log(res);
    //     return res;
    // },err =>{
    //     console.log(err);

    // })
    return instance(config)
}