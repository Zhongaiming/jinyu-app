import http from '../../core/http/index.js'

export default class orderController {
	// 获取订单列表
	static getOrderList(data) {
		return http.request({
			// url: '/order/api/v1/admin/order/orderForm/list',
			// method: 'POST',
			url: '/order/api/v1/admin/order/orderForm/getOrderFormInfoList',
			method: 'GET',
			data
		})
	}
	// 获取订单详情
	static getOrderView(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/view',
			method: 'GET',
			data
		})
	}
	// 全额退款
	static allRefund(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/allRefund',
			method: 'POST',
			data
		})
	}
	// 部分退款（指定金额退款）
	static amountRefund(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/amountRefund',
			method: 'POST',
			data
		})
	}
	// 部分退款（按分账比例分配退款）
	static partRefund(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/partRefund',
			method: 'POST',
			data
		})
	}
	// 订单退款查询
	static refundQuery(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/refundQuery',
			method: 'GET',
			data
		})
	}


	// 收益
	static getTotalTodayIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTotalTodayIncome',
			method: 'GET',
			data
		})
	}
	static subsidyIncomeInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/subsidyIncomeInfo',
			method: 'GET',
			data
		})
	}
	static getTodayOnlineIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayOnlineIncome',
			method: 'GET',
			data
		})
	}
	static getTodayCashIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayCashIncome',
			method: 'GET',
			data
		})
	}
	// === 收益
	static getTodayOnlineOrderList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayOnlineOrderList',
			method: 'GET',
			data
		})
	}
	static getTodayCashOrderList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getTodayCashOrderList',
			method: 'GET',
			data
		})
	}
	// 投币记录表操作管理接口
	static getDeviceInsertCoins(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderInsertCoins/getDeviceInsertCoins',
			method: 'GET',
			data
		})
	}
	static getInsertCoinsInfoList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/place/getInsertCoinsInfoList',
			method: 'GET',
			data
		})
	}
	static getInsertCoinsPlaceNum(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderInsertCoins/getInsertCoinsPlaceNum',
			method: 'GET',
			data
		})
	}

	// 出礼流水表操作管理接口
	static presentConsume(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/outPresentWater/presentConsume',
			method: 'GET',
			data
		})
	}

	// ===== 经营统计 =====
	// 查询场地收益
	static getPlaceIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getPlaceIncome',
			method: 'GET',
			data
		})
	}

	// 收益分类统计
	static benefitNew(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/benefitNew',
			method: 'GET',
			data
		})
	}
	// 收益趋势
	static isExistGDX(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/isExistGDX',
			method: 'GET',
			data
		})
	}

	// 查询场地收益详情
	static getPlaceIncomeDetail(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getPlaceIncomeDetail',
			method: 'GET',
			data
		})
	}
	// 货道收益详情
	static getPlaceDeviceByTypeInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getPlaceDeviceByTypeInfo',
			method: 'GET',
			data
		})
	}
	
	
	// 钱包
	// 日期收益信息
	static getDateIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getDateIncome',
			method: 'GET',
			data
		})
	}
	
	// 目标月份的收益
	static getMonthIncome(data) {
		return http.request({
			url: '/order/api/v1/admin/order/orderForm/getMonthIncome',
			method: 'GET',
			data
		})
	}
	// ==
	static getCommonDetailBill(data) {
		return http.request({
			url: '/pay/api/v1/admin/pay/merchant/getCommonDetailBill',
			method: 'POST',
			data
		})
	}
}