<template>
	<view>
		<home-header :total="total"></home-header>
		<three-options :device="device"></three-options>
		<home-options :coupleNum="coupleNum"></home-options>
		<!-- <return-top></return-top> -->
		<jy-tabbar :selected="0"></jy-tabbar>
	</view>
</template>

<script>
	import HomeHeader from "./components/homeHeader/index.vue"
	import ThreeOptions from "./components/threeOptions/index.vue"
	import HomeOptions from "./components/homeOptions/index.vue"
	import ReturnTop from "./components/homeTools/returnTop.vue"
	import {
		appealController,
		orderController,
		deviceController
	} from '@/api/index.js';
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	export default {
		components: {
			HomeHeader,
			ThreeOptions,
			HomeOptions,
			ReturnTop,
		},
		data() {
			return {
				coupleNum: 0,
				total: {},
				device: {}
			}
		},
		onShow() {
			this.getCoupleNum();
			this.getTotalTodayIncome();
			this.getDeviceNum();
		},
		methods: {
			goTo() {
				this.$goTo('/pages/loginAndReg/index')
			},
			getCoupleNum() {
				appealController.appealNotHandleNum({
					startTime: getDateAll(30),
					endTime: getDateAll(0),
				}).then(res => {
					this.coupleNum = res.data;
				})
			},
			//总收益
			async getTotalTodayIncome() {
				orderController.getTotalTodayIncome({
					startTime: getDateAll(0),
					endTime: getDateAll(0)
				}).then(res => {
					if(res.code === 200) {
						this.total = res.data
					}
				})
			},
			//设备
			getDeviceNum() {
				deviceController.getDeviceNum().then(res => {
					const {
						deviceOnlineNum,
						deviceNum
					} = res.data;
					this.device = {
						deviceOnlineNum: (deviceOnlineNum ?? 0),
						deviceNum: (deviceNum ?? 0)
					}
				})
			},
		},
		
	}
</script>

<style>
</style>