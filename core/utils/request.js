import axios from 'axios'

const service = axios.create({
  baseURL: 'http://10.101.41.198:3030',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
})

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status && res.status !== 200) {
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  (error) => {
    console.log('接口请求失败：' + error) // for debug
    return Promise.reject(error)
  },
)

export default service
