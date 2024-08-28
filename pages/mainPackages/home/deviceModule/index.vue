<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<device-condition :count="count" @confirm="getScreen"></device-condition>
		<device-list :dataList="dataList"></device-list>
		<xls-empty slot="empty"></xls-empty>
		<!-- 批量 -->
		<!-- <place-popup ref="placePopup"></place-popup> -->
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
					onlineState: "",
					placeId: "",
					deviceType: "",
					search: "",
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
			getScreen(params) {
				Object.assign(this.screen, params);
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				this.$loading();
				const screen = Object.fromEntries(
					Object.entries(this.screen).filter(([key, value]) => value !== null && value !== undefined && value !== '')
				);
				deviceController.getListTwo({
					page: pageNo,
					size: pageSize,
					...screen
				}).then(res => {
					this.$hideLoading();
					this.$refs.paging.complete(res.data.List);
					this.count = {
						online: res.data.online.onlineNums,
						offline: res.data.offline.offlineNums
					}
				}).catch(error => {
					this.$hideLoading();
					console.error('查询失败:', error);
				});
			},
		},
	}
</script>