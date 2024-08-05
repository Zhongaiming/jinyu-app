<template>
	<div class="xls-gift-Statis-page">

		<!-- <time-header ref="topBav"></time-header> -->
		<!-- <gift-setting v-if="$route.query.deviceType != 4" v-hasPermi="['app:shop:index']" v-movable />
		<gift-setting v-else v-hasPermi="['app:shj:commodity:read']" v-movable /> -->
		<div class="btn" @click="$router.push('/comeGift/GoodsSet')" v-if="$route.query.deviceType != 4">
			<span>商品设置</span>
		</div>
	</div>
</template>

<script>
	// import TimeHeader from "./giftComps/timeHeader";
	// import GiftSetting from "./giftComps/giftSetting";
	// import {
	// 	drag,
	// 	movable
	// } from "@/plugins/order/index";
	export default {
		components: {
			// TimeHeader,
			// GiftSetting
		},
		data() {
			return {
				deviceType: null,
			}
		},
		// directives: {
		// 	drag,
		// 	movable
		// },
		// created() {
		// 	window.addEventListener("scroll", this.screenSlide);
		// },
		// beforeDestroy() {
		// 	window.removeEventListener("scroll", this.screenSlide);
		// },
		onLoad(option) {
			console.log("传参", JSON.parse(option.params).deviceType)
		},
		methods: {
			screenSlide() {
				var scrollTop =
					document.documentElement.scrollTop ||
					window.pageYOffset ||
					document.body.scrollTop;
				var scrollHeight = document.documentElement.scrollHeight;
				var clientHeight = document.documentElement.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					this.$refs.topBav.getGiftList();
				}
				if (scrollTop > 100) {
					this.$refs.topBav.showSptop();
				}
				if (scrollTop <= 0) {
					this.$refs.topBav.hideSptop();
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-gift-Statis-page {
		width: 100%;
		background: #f5f6f7;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";
		overflow-y: scroll;
		padding-top: 190px;
	}

	.btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		font-size: 17px;
		color: #fff;
		background: #5241ff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>