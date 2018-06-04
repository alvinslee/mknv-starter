import axios from 'axios'
import Config from '../config'

const instance = axios.create({
  baseURL: Config.api.root + Config.api.path,
  headers: {
    get: { 'Accepts': 'application/json' },
    post: { 'Accepts': 'application/json' },
    put: { 'Accepts': 'application/json' },
    patch: { 'Accepts': 'application/json' },
    delete: { 'Accepts': 'application/json' }
  }
})

const requestInt = instance.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const responseInt = instance.interceptors.response.use(config => {
  console.log('Response Interceptor', config)
  return config
})

instance.interceptors.request.eject(requestInt)
instance.interceptors.response.eject(responseInt)

export default instance
