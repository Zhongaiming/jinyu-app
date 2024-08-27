<template>
	<z-paging ref="dataPaging" v-model="dataList" @query="queryList">
		<!-- <gift-setting v-if="deviceType != 4" v-hasPermi="['app:shop:index']" v-movable />
		<gift-setting v-else v-hasPermi="['app:shj:commodity:read']" v-movable /> -->
		<xls-list-vue :dataList="dataList" :giftCount="giftCount"></xls-list-vue>
		<view class="btn" @click="goTo" v-if="deviceType != 4" slot="bottom">
			<span>商品设置</span>
		</view>
	</z-paging>
</template>

<script>
	// import TimeHeader from "./giftComps/timeHeader";
	// import GiftSetting from "./giftComps/giftSetting";
	import xlsListVue from "./components/xls-list.vue";
	import {
		deviceDataController
	} from "@/api/index.js";
	export default {
		components: {
			xlsListVue,
			// TimeHeader,
			// GiftSetting
		},
		data() {
			return {
				deviceType: null,
				dataList: [],
				giftCount: {},
			}
		},
		onLoad(option) {
			// shj 传4
			if (JSON.parse(option.params)) {
				this.deviceType = JSON.parse(option.params).deviceType
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				deviceDataController.getPresentList({
					page: pageNo,
					size: pageSize,
					startTime: '2024-08-27',
					endTime: '2024-08-27',
				}).then(res => {
					this.giftCount = res.data.outPresentData;
					this.$refs.dataPaging.complete(res.data.outPresentPlaceList);
				})
			},
			goTo() {
				return
				this.$goTo();
			},
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
	.btn {
		width: 100%;
		height: 50px;
		font-size: 17px;
		color: #fff;
		background: #5241ff;
		@include center-flex();
	}
</style>