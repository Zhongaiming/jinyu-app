<template>
	<view>
		<home-header></home-header>
		<three-options></three-options>
		<home-options></home-options>
		<!-- <return-top></return-top> -->
		<jy-tabbar :selected="0"></jy-tabbar>
	</view>
</template>

<script>
	import HomeHeader from "./components/homeHeader/index.vue"
	import ThreeOptions from "./components/threeOptions/index.vue"
	import HomeOptions from "./components/homeOptions/index.vue"
	import ReturnTop from "./components/homeTools/returnTop.vue"
	export default {
		components: {
			HomeHeader,
			ThreeOptions,
			HomeOptions,
			ReturnTop,
		},
		data() {
			return {

			}
		},
		computed: {

		},
		methods: {
			goTo() {
				this.$goTo('/pages/loginAndReg/index')
			},
		},
		mounted() {

		}
	}
</script>

<style>
</style>