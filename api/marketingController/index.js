import http from '../../core/http/index.js'

export default class marketingController {
	
	// 新用户特惠
	static getCouponList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReductionMember/list',
			method: 'POST', 
			data
		})
	}
	// 活动详情
	static getCouponById(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReductionMember/view',
			method: 'GET', 
			data
		})
	}
	// 活动添加
	static addCoupon(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReductionMember/add',
			method: 'POST', 
			data
		})
	}
	// 活动修改
	static updateCoupon(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReductionMember/update',
			method: 'POST', 
			data
		})
	}
	
	
	// 支付立减券
	// 查询
	static getReductionList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReduction/list',
			method: 'POST', 
			data
		})
	}
	// 根据id查询 
	static getReductionById(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReduction/view',
			method: 'GET', 
			data
		})
	}
	// 修改
	static updateReductionById(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReduction/update',
			method: 'POST', 
			data
		})
	}
	//添加
	static addReduction(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponReduction/add',
			method: 'POST', 
			data
		})
	}
	
	
	
	// 随机立减
	//查询随机立减数据
	static getCouponRandomList(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponRandom/getCouponRandomList',
			method: 'GET', 
			data
		})
	}
	//根据活动去查询已经绑定的场地
	static getCouponPlaceByIdInfo(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponRandom/getCouponPlaceByIdInfo',
			method: 'GET', 
			data
		})
	}
	//详情
	static getCouponRandomById(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponRandom/view',
			method: 'GET', 
			data
		})
	}
	//修改
	static updateCouponRandom(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponRandom/update',
			method: 'POST', 
			data
		})
	}
	//添加
	static addCouponRandom(data) {
		return http.request({
			url: '/order/api/v1/admin/order/couponRandom/add',
			method: 'POST', 
			data
		})
	}
}