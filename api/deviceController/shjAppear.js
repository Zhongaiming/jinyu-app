import {
	shjController
} from "@/api/index.js"

var urlList = [
	'/device/api/v1/admin/device/deviceRail/goodsOnTheShelf',
	'/device/api/v1/admin/device/deviceRail/goodsOnTheShelfList',
	'/device/api/v1/admin/device/deviceRail/clearingOrReplenishment',
	// '/device/api/v1/admin/device/deviceRail/oneKey', // 一键补满
	'/device/api/v1/admin/device/deviceRail/updCargoLane',
	'/device/api/v1/admin/device/deviceRail/updCargoLaneList',
];

export function seadAppear(res) {
	if (res.data.code == 200 && urlList.includes(res.config.url)) {
		let data = res.config.data
		let params
		if (res.config.url == '/device/api/v1/admin/device/deviceRail/clearingOrReplenishment') {
			if (data.type == 1) {
				params = {
					railId: [String(data.railId)], // 货道
					sellingPrice: null, // 货道价格
					railGoodsCapacity: null, //货道容量
					railGoodsNum: 0, //货道库存
					cargoLaneNumber: null, //货道名字
				};
			} else {
				params = {
					railId: String(data.railId).split(','), // 货道
					sellingPrice: null, // 货道价格
					railGoodsCapacity: data.railCapacity, //货道容量
					railGoodsNum: data.railRepertory, //货道库存
					cargoLaneNumber: null, //货道名字
				};
			}
		} else if (res.config.url == '/device/api/v1/admin/device/deviceRail/updCargoLane') {
			params = {
				railId: [String(data.id)], // 货道
				sellingPrice: data.price*1, // 货道价格
				railGoodsCapacity: data.railCapacity, //货道容量
				railGoodsNum: null, //货道库存
				cargoLaneNumber: data.cargoLaneNumber ? data.cargoLaneNumber : null, //货道名字
			}
		} else if (res.config.url == '/device/api/v1/admin/device/deviceRail/updCargoLaneList') {
			params = {
				railId: data.railCapacity == null ? data.railIds : null, // 货道
				sellingPrice: null, // 货道价格
				railGoodsCapacity: data.railCapacity, //货道容量
				railGoodsNum: null, //货道库存
				cargoLaneNumber: null, //货道名字
			}
		} else {
			params = {
				railId: data.railIds ? data.railIds : data.railId ? [data.railId] : null, // 货道
				sellingPrice: data.price*1, // 货道价格
				railGoodsCapacity: data.railCapacity, //货道容量
				railGoodsNum: data.railRepertory, //货道库存
				cargoLaneNumber: data.cargoLaneNumber ? data.cargoLaneNumber : null, //货道名字
			}
		}

		if (params.railId) {
			shjController.setShjRepertoryBatch(params)
		}
	}
}