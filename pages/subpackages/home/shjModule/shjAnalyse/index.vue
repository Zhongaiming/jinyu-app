<template>
	<!-- 数据分析 -->
	<view class="shj-analyse-wrapper">
		<xls-jy-navbar :title="title" bgColor="#f5f6f7"></xls-jy-navbar>
		<!-- 条件 -->
		<ConditionScreening @getEarndata="getEarndata" />
		<!-- 订单分析 -->
		<OrderAnalyse ref="Order" v-if="activeType == 1" />
		<!-- 商品分析 -->
		<CommodityAnalyse ref="commodity" v-if="activeType == 2" />

		<u-tabbar v-model="activeType" active-color="#5241FF" @change="changeType">
			<u-tabbar-item :name="1">
				<span>订单分析</span>
				<template #icon="props">
					<img :src="props.active ? device.active : device.inactive" />
				</template>
			</u-tabbar-item>
			<u-tabbar-item :name="2">
				<span>商品分析</span>
				<template #icon="props">
					<img :src="props.active ? shop.active : shop.inactive" />
				</template>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import ConditionScreening from "./components/conditionScreening.vue";
	import OrderAnalyse from "./components/orderAnalyse.vue";
	import CommodityAnalyse from "./components/commodityAnalyse.vue";
	import {
		getTime,
		getDateAll
	} from "@/plugins/utilityClass";
	export default {
		name: "shjAnalyse",
		components: {
			ConditionScreening,
			OrderAnalyse,
			CommodityAnalyse,
		},
		data() {
			return {
				activeType: 1,
				title: "订单分析",
				params: {},
				device: {
					// active: require("@/assets/common/order_active.png"),
					// inactive: require("@/assets/common/order.png"),
				},
				shop: {
					// active: require("@/assets/common/analyse_active.png"),
					// inactive: require("@/assets/common/analyse.png"),
				},
			};
		},
		// created() {
		// 	this.params = {
		// 		startTime: getDateAll(0),
		// 		endTime: getDateAll(0),
		// 		placeId: [],
		// 	};
		// 	this.$nextTick(() => {
		// 		this.$refs.Order.getOrder(this.params);
		// 	});
		// },
		methods: {
			//tabbar
			changeType() {
				this.title = this.activeType == 1 ? "订单分析" : "商品销售分析";
				this.getEarndata();
			},
			//条件
			getEarndata(params = this.params) {
				this.params = params;
				this.$nextTick(() => {
					if (this.activeType == 1) {
						this.$refs.Order.getOrder(params);
					} else {
						this.$refs.commodity.getAnalysis(params);
					}
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.shj-analyse-wrapper {
		width: 100%;
	}
</style>