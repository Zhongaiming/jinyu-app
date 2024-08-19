import http from '../../core/http/index.js'

export default class commodityController {
	
	// 商品
	static getCommodity(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodity/list',
			method: 'POST',
			data
		})
	}
	// 更新
	static updateCommodity(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodity/update',
			method: 'POST',
			data
		})
	}
	// 详情
	static getCommodityView(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodity/view',
			method: 'GET',
			data
		})
	}
	// 删除
	static deleteCommodity(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodity/delete',
			method: 'POST',
			data
		})
	}
	// 添加
	static addCommodity(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodity/add',
			method: 'POST',
			data
		})
	}
	
	
	// 商品规格
	static getSpecification(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commoditySpecifications/list',
			method: 'POST',
			data
		})
	}
	// 更新
	static updateSpecification(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commoditySpecifications/update',
			method: 'POST',
			data
		})
	}
	// 详情
	static getSpecificationView(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commoditySpecifications/view',
			method: 'GET',
			data
		})
	}
	// 删除
	static deleteSpecification(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commoditySpecifications/delete',
			method: 'POST',
			data
		})
	}
	// 添加
	static addSpecification(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commoditySpecifications/add',
			method: 'POST',
			data
		})
	}
	
	// 商品类型
	static getCommodityType(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodityType/list',
			method: 'POST',
			data
		})
	}
	// 更新
	static updateCommodityType(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodityType/update',
			method: 'POST',
			data
		})
	}
	// 详情
	static getCommodityTypeView(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodityType/view',
			method: 'GET',
			data
		})
	}
	// 删除
	static deleteCommodityType(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodityType/delete',
			method: 'POST',
			data
		})
	}
	// 添加
	static addCommodityType(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/commodityType/add',
			method: 'POST',
			data
		})
	}
	
	// 商品品牌
	static getBrand(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/brand/list',
			method: 'POST',
			data
		})
	}
	// 更新
	static updateBrand(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/brand/update',
			method: 'POST',
			data
		})
	}
	// 详情
	static getBrandView(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/brand/view',
			method: 'GET',
			data
		})
	}
	// 删除
	static deleteBrand(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/brand/delete',
			method: 'POST',
			data
		})
	}
	// 添加
	static addBrand(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/brand/add',
			method: 'POST',
			data
		})
	}
	
	// 商品ip
	static getIp(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/ip/list',
			method: 'POST',
			data
		})
	}
	// 更新
	static updateIp(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/ip/update',
			method: 'POST',
			data
		})
	}
	// 详情
	static getIpView(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/ip/view',
			method: 'GET',
			data
		})
	}
	// 删除
	static deleteIp(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/ip/delete',
			method: 'POST',
			data
		})
	}
	// 添加
	static addIp(data) {
		return http.request({
			url: '/order/api/v1/admin/commodity/ip/add',
			method: 'POST',
			data
		})
	} 
	
}