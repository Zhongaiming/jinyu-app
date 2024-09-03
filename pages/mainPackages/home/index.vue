<template>
	<view>
		<home-header></home-header>
		<three-options></three-options>
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
		appealController
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
			}
		},
		onShow() {
			this.getCoupleNum();
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
		},
		
	}
</script>

<style>
</style>