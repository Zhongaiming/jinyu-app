import http from '../../core/http/index.js'
import reqConfig from '@/core/config/reqConfig.js'
export default class commonController {
	
	/**
	 * 获取更新日志
	 */
	static getVersionLogList(data) {
		return http.request({
			url: "/api/v1/app/common/version/list",
			method: 'POST',
			data
		})
	}
	
	/**
	 * 根据id获取更新日志详情
	 */
	static getLogDetail(data) {
		return http.request({
			url: '/api/v1/app/common/version/get',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 获取用户条款列表
	 */
	static getUserTermList(data) {
		return http.request({
			url: '/api/v1/app/common/item/list',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 获取条款详情
	 */
	static getTermDetail(data) {
		return http.request({
			url: '/api/v1/app/common/item/get',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 公共上传文件
	 */
	static uploadFile(data) {
		return http.request({
			url: '/upms/api/v1/common/upload/upload',
			method: 'POST',
			data,
			custom: {
				ContentType: true
			}
		})
	}
	
	static downloadOSS(data) {
		return http.request({
			url: reqConfig.proxyUrl + '/upms/api/v1/common/upload/downloadOSS',
			method: 'GET',
			data
		})
	}
		
}