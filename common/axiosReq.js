import axios from 'axios'
import {
	getToken
} from '@/common/auth.js'
import reqConfig from '@/core/config/reqConfig.js'

let URL = reqConfig.proxyUrl
const token = getToken();
const service = axios.create({
	baseURL: URL,
	timeout: 5000,
	headers: {
		"Authorization": token,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
})

// 提交
service.interceptors.request.use(
	config => {
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

// 请求
service.interceptors.response.use(
	response => {
		const res = response.data
		// console.log(res)
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数
		if (response.status === 200) {
			return Promise.resolve(res)
		} else {
			return Promise.reject(res)
		}
	},

	error => {
		console.log('err' + error) // for debug
		return Promise.reject(error)
	}
)

export default service



export function UploadRent(params) {
	return service({
		url: '/upms/api/v1/common/upload/upload',
		method: 'POST',
		data: params
	})
}