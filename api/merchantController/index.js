import http from '../../core/http/index.js'

export default class merchantController {

	// 获取进件信息
	static getEntryAction(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/getEntryAction',
			method: 'GET',
			data
		})
	}

	// 保存进件信息
	static saveEntryAction(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/saveEntryAction',
			method: 'POST',
			data
		})
	}

	// 支行
	static getBankList(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/bank/bankList',
			method: 'GET',
			data
		})
	}

	// 银行
	static getSimplifyList(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/bank/simplifyList',
			method: 'GET',
			data
		})
	}


	// 银行开户许可证识别
	static recognizeBankAccountLicense(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/sample/recognizeBankAccountLicense',
			method: 'POST',
			data
		})
	}
	
	// 银行卡识别
	static recognizeBankCard(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/sample/recognizeBankCard',
			method: 'POST',
			data
		})
	}
	// 营业执照识别
	static recognizeBusinessLicense(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/sample/recognizeBusinessLicense',
			method: 'POST',
			data
		})
	}
	// 身份证文字识别
	static recognizeIdCard(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/sample/recognizeIdCard',
			method: 'POST',
			data
		})
	}

	// 省市区
	static getAreaNumber(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/getAreaNumber',
			method: 'GET',
			data
		})
	}

	// 进件
	static hlbEntryApply(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/hlbEntryApply',
			method: 'POST',
			data
		})
	}
	// 进件列表
	static getListHlbEntryAction(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/getListHlbEntryAction',
			method: 'GET',
			data
		})
	}
	// 进件详情
	static getHlbEntryAction(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/getHlbEntryAction',
			method: 'GET',
			data
		})
	}
	
	// 认证记录
	static authorizeQuery(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/authorizeQuery',
			method: 'POST',
			data
		})
	}
}