<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<device-condition :count="count"></device-condition>
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
				dataList: [],
				//筛选条件
				screen: {
					onlineState: null,
					placeId: null,
					deviceType: null,
					search: null,
				},
				//设备数
				count: {
					online: 0,
					offline: 0
				},
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
					// ...this.screen
				}).then(res => {
					this.$refs.paging.complete(res.data.List);
					this.count = {
						online: res.data.online.onlineNums,
						offline: res.data.offline.offlineNums
					}
				})
			},
		},
	}
</script>