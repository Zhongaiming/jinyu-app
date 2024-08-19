<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<device-condition :deviceNum="deviceNum" :onlineNum="onlineNum"></device-condition>
		<device-list :dataList="dataList"></device-list>

		<!-- <no-data v-show="!dataList.length" /> -->
		<!-- 批量 -->
		<!-- <place-popup ref="placePopup"></place-popup> -->
		<!-- 设备详情 -->
		<!-- <device-detail ref="deviceDetailpopup" @updatedDevice="updatedDevice"></device-detail> -->
		<!-- 蛋仓详情 -->
		<!-- <com-set ref="setting" @updatedEgg="updatedEgg"></com-set> -->

		<!-- <Tabbar v-show="$route.meta.showDeviceTabbar" /> -->
	</z-paging>
</template>

<script>
	import deviceCondition from "./components/device-condition/index.vue";
	import deviceList from "./components/device-list/index.vue";
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		components: {
			deviceCondition,
			deviceList,
		},
		data() {
			return {
				//设备列表
				dataList: [],
				//筛选条件
				screenList: {
					onlineState: "",
					placeId: "",
					deviceType: "",
					search: "",
				},
				//设备总数
				deviceNum: 0,
				//在线总数
				onlineNum: 0,
				//egg-updata
				editEggMsg: "",
				deviceMsg: {},
				// 待处理故障总数
				dealWithNum: 0,
			};
		},
		methods: {
			queryList(pageNo, pageSize) {
				deviceController.getListTwo({
					page: pageNo,
					size: pageSize,
					// search: this.searchValue
				}).then(res => {
					this.$refs.paging.complete(res.data.List);
				})
			},
		},
	}
</script>

