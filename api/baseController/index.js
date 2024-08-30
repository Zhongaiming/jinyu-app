import http from '../../core/http/index.js'

export default class baseController {
	
	// 消息推送设置信息
	static messagePushSet(data) {
		return http.request({
			url: '/member/api/v1/receiptNotificationSet/messagePushSet',
			method: 'GET',
			data
		})
	}
	
	// 修改消息推送设置
	static editMessagePushSet(data) {
		return http.request({
			url: '/member/api/v1/receiptNotificationSet/editMessagePushSet',
			method: 'POST',
			data
		})
	}
	
	// 修改消息推送设置
	static getWechatInform(data) {
		return http.request({
			url: '/member/api/v1/admin/merchant/wechatInform/getWechatInform',
			method: 'GET',
			data
		})
	}
}