import axios,{AxiosRequestConfig,AxiosResponse} from 'axios'

const service = axios.create({
    baseURL: "https://api.virapi.com/vir_gitee45151begdfe43/demo/",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'app-token': '$2a$10$z8R.GXUwZ9c6CsPhse01y.8OmUHXw8c5XmWZkF785vj618c.6.Ieq'
    }, // 设置传输内容的类型和编码
    timeout: 60000 // request timeout
})
service.interceptors.request.use((config:AxiosRequestConfig)=>{
    return config
})

service.interceptors.response.use((response:AxiosResponse) => {
    if(response.data.code == 0){
        return Promise.reject(response.data)
    }
    return  response.data.data
},err=> {
    return Promise.reject(err)
})


export default service