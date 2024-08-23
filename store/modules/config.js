import {
	deviceController
} from '@/api/index.js';

const getDefaultState = () => {
	return {
		deviceTypeList: [],
		deviceTypeDict: {},
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
					data.forEach(item => {
						dict[item.id] = item.typeName;
					});
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