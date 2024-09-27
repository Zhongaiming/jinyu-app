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

		<u-tabbar :value="activeType" active-color="#5241FF" @change="changeType">
			<u-tabbar-item :name="1" text="订单分析">
				<image slot="active-icon" :src="device.active" class="item__slot-icon" mode="heightFix" />
				<image slot="inactive-icon" :src="device.inactive" class="item__slot-icon" mode="heightFix" />
			</u-tabbar-item>
			<u-tabbar-item :name="2" text="商品分析">
				<image slot="active-icon" :src="shop.active" class="item__slot-icon" mode="heightFix" />
				<image slot="inactive-icon" :src="shop.inactive" class="item__slot-icon" mode="heightFix" />
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
					active: this.$baseUrl + "appV4/common/order_active.png",
					inactive: this.$baseUrl + "appV4/common/order.png",
				},
				shop: {
					active: this.$baseUrl + "appV4/common/analyse_active.png",
					inactive: this.$baseUrl + "appV4/common/analyse.png",
				},
			};
		},
		onLoad() {
			this.params = {
				startTime: getDateAll(0),
				endTime: getDateAll(0),
				placeId: [],
			};
			this.$nextTick(() => {
				// this.$refs.Order.getOrder(this.params);
			});
		},
		methods: {
			//tabbar
			changeType(name) {
				if (name === this.activeType) return 
				else this.activeType = name
				this.title = this.activeType == 1 ? "订单分析" : "商品销售分析";
				this.getEarndata();
			},
			//条件
			getEarndata(params = this.params) {
				this.params = params;
				this.$nextTick(() => {
					if (this.activeType == 1) {
						// this.$refs.Order.getOrder(params);
					} else {
						// this.$refs.commodity.getAnalysis(params);
					}
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.shj-analyse-wrapper {
		width: 100%;
	}
	
	.item__slot-icon {
		height: 20px;
	}
</style>