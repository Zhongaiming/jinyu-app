import api from "./serve.js";
const baseURL = api.baseURL;
import Vue from 'vue'
import reqConfig from '@/core/config/reqConfig.js'
import {getToken} from '@/common/auth.js'

const request = (url, data, method = 'GET', customHeader, isToken = true) => {
	return new Promise((resolve, reject) => {

		let header = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
		
		if (customHeader) {
			header = customHeader
		}

		if (isToken) {
			header['token'] = uni.getStorageSync("at_token")
		}
		
		uni.request({
			url: baseURL + url,
			data: data,
			method: method,
			header: header,
			success: res => {
				if (res.data.code == 0 || res.statusCode == 200) {
					resolve(res.data)
				} else if (res.data.msg != undefined) {
					Vue.prototype.$toast(res.data.msg)
				}
				reject(res)
			},
			fail: res => {
				Vue.prototype.$toast("系统繁忙！")
				reject(res)
			}
		})
	});
}


module.exports = {
	request
}