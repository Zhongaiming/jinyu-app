<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList" :refresher-enabled="false">
		<device-condition :count="count" @confirm="getScreen"></device-condition>
		<device-list :dataList="dataList" :screen="screen" @bingClearDevice="bingClearDevice"></device-list>
		<xls-empty slot="empty"></xls-empty>
		<!-- <xls-tabbar-vue slot="bottom"></xls-tabbar-vue> -->
	</z-paging>
</template>

<script>
	import deviceCondition from "./components/device-condition/index.vue";
	import xlsTabbarVue from "./components/xls-tabbar/xls-tabbar.vue";
	import deviceList from "./components/device-list/index.vue";
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		components: {
			deviceCondition,
			deviceList,
			xlsTabbarVue
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
		onShow() {
			this.$nextTick(() => {
				this.$refs.paging.refresh();
			})
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
					if(pageNo == 1&&res.data.List.length>0&&res.data.List.length<10) {
						res.data.List.forEach(item => {
							if(item.deviceList&&item.deviceList.length) {
								item['deviceSwitch'] = true
							}
						})
					}
					this.$refs.paging.complete(res.data.List);
					this.count = {
						online: res.data.online.onlineNums??0,
						offline: res.data.offline.offlineNums??0
					}
				}).catch(error => {
					this.$hideLoading();
					console.error('查询失败:', error);
				});
			},
			bingClearDevice(type, params) {
				this.$refs.paging.refresh();
			},
		},
	}
</script>