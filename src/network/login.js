import {request} from './fetch.js'
export const loginRequest = (params) => {
   return request('login?' + params)
}