import http from '../../core/http/index.js'

export default class appealController {
	// 查询申述列表
	static getRepresentationList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/complaintFeedback/getRepresentationList',
			method: 'GET',
			data
		})
	}
	// 申述详情
	static getRepresentationDetail(data) {
		return http.request({
			url: '/merchant/api/v1/admin/complaintFeedback/getRepresentationDetail',
			method: 'GET',
			data
		})
	}
	// 申述未处理个数
	static appealNotHandleNum(data) {
		return http.request({
			url: '/merchant/api/v1/admin/complaintFeedback/appealNotHandleNum',
			method: 'GET',
			data
		})
	}
	// 处理申诉问题
	static handleRepresentation(data) {
		return http.request({
			url: '/merchant/api/v1/admin/complaintFeedback/handleRepresentation',
			method: 'POST',
			data
		})
	}
	
	// 商家处理
	static completeComplaints(data) {
		return http.request({
			url: '/merchant/api/v1/admin/complaintFeedback/completeComplaints',
			method: 'POST',
			data
		})
	}
	// replyInfo
	static replyFeed(data) {
		return http.request({
			url: '/merchant/api/v1/admin/complaintFeedback/replyInfo',
			method: 'POST',
			data,
			custom: {
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		})
	}
	// 微信图片
	static setComplaintsImg(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/wechatapi/setComplaintsImg',
			method: 'POST',
			data,
			// custom: {
			// 	header: {
			// 		'Content-Type': 'application/x-www-form-urlencoded'
			// 	}
			// }
		})
	}
	
}