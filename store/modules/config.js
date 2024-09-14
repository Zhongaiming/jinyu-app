import {
	deviceController
} from '@/api/index.js';

const getDefaultState = () => {
	return {
		deviceTypeList: [],
		deviceTypeIdList: [],
		deviceTypeDict: {},
		// 订单相关字典
		typeDict: {
			1: "充值余币",
			2: "设备启动",
			3: "余币购买",
			4: "余额购买",
			5: "充值余额",
			undefined: "其他类型"
		},
		stateDict: {
			'-1': "已退款",
			0: "待支付",
			1: "已支付",
			2: "退款中",
			3: "退款成功",
			4: "退款失败",
			5: "已取消",
			6: "已关闭",
			7: "待结算",
			undefined: "其他"
		},
		stateColorDict: {
			'-1': "#f5222d",
			0: "#5241ff",
			1: "#52c41a",
			2: "#f5222d",
			3: "#f5222d",
			4: "#f5222d",
			5: "#f5222d",
			6: "#8c8c8c",
			7: "#8c8c8c",
			undefined: "#8c8c8c"
		},
		refundDict: {
			0: '出货失败，自动退款',
			1: '出货失败，部分退款',
			2: '人工退款（全额）',
			3: '通讯失败，自动退款',
			4: '人工退款（部分商品）',
			5: '人工退款（指定金额）',
			undefined: "其他"
		},
		refundStateDict: {
			'-1': "退款异常",
			0: "退款失败",
			1: "退款成功",
			2: "退款中",
			undefined: "其他"
		},
		refundStateDesDict: {
			'-1': "退款异常，详情查看下方交易流程",
			0: "退款失败，详情查看下方交易流程",
			1: "已退还至您的账户",
			2: "退款中，成功后将会退回您的账户",
			undefined: "其他"
		},
		// 套餐方案类型;1：推荐充值金额表，2：优惠券，3，任意套餐，4，免费体验套餐，5，首单折扣
		amountCouponTypeDict: {
			1: '推荐充值金额',
			2: '优惠券',
			3: '任意套餐',
			4: '免费体验套餐',
			5: '首单折扣',
			undefined: "其他优惠"
		},
		payTypeDict: {
			0: '微信支付',
			1: '支付宝支付',
			2: '余额支付',
			undefined: "其他方式"
		},
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState());
	},
	SET_TYPE: (state, list) => {
		state.deviceTypeList = list;
	},
	SET_TYPE_ID: (state, list) => {
		state.deviceTypeIdList = list;
	},
	SET_DICT: (state, dict) => {
		state.deviceTypeDict = dict;
	}
};

const actions = {
	getList({
		commit,
		state
	}, params) {
		// 检查 deviceTypeList 是否已存在数据
		if (state.deviceTypeList.length > 0) {
			return Promise.resolve(); // 返回一个已解决的 Promise，不再发起请求
		}
		return new Promise((resolve, reject) => {
			deviceController.getDeviceTypeLists().then(res => {
				const {
					data,
					code
				} = res;
				if (code === 200) {
					commit('SET_TYPE', data);
					let dict = {};
					let typeId = [];
					data.forEach(item => {
						dict[item.id] = item.typeName;
						typeId.push(item.id);
					});
					commit('SET_TYPE_ID', typeId);
					commit('SET_DICT', dict);
					resolve(res);
				} else {
					reject(new Error('Failed to fetch device types'));
				}
			}).catch(error => {
				reject(error);
			});
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};