<template>
	<view>
		<!-- 售货机 批量设置 -->
		<u-popup v-model="batchSet" position="bottom">
			<view class="edit-cargoroad">
				<view class="popup-header">
					<span @click="batchSet = false">取消</span>
					<span class="popup-title">货道批量设置</span>
					<span></span>
				</view>
				<!-- 商品上架 -->
				<view class="popup-content" v-if="optionType == 1">
					<view class="menu-item" v-for="(item, index) in commodity" :key="index"
						@click="commodityClick(item)">
						<u-icon :name="item.name" size="30" :color="item.color" />
						<span>{{ item.title }}</span>
					</view>
				</view>
				<!-- 货道管理 -->
				<view class="popup-content" v-else>
					<view class="menu-item" v-for="(item, index) in rail" :key="index" @click="railClick(item)">
						<u-icon :name="item.name" size="30" :color="item.color" />
						<span>{{ item.title }}</span>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 批量商品上架 -->
		<batch-change ref="change" />
	</view>
</template>

<script>
	import BatchChange from "./batchChange.vue";
	import local from "@/plugins/storage";
	export default {
		name: "batchSetting",
		components: {
			BatchChange
		},
		data() {
			return {
				batchSet: false,
				//1=批量修改商品   2=批量修改价格   3=批量修改库存
				commodity: [{
						type: 1,
						title: "批量修改商品",
						name: "gift-o",
						color: "#0070ff"
					},
					{
						type: 2,
						title: "批量修改价格",
						name: "gold-coin-o",
						color: "#ff8636",
					},
					{
						type: 3,
						title: "批量修改库存",
						name: "logistics",
						color: "#8463f4"
					},
				],
				//1=货道测试 2=货道容量设置 3=货道状态设置
				rail: [{
						type: 1,
						title: "货道测试",
						name: "gift-o",
						color: "#0070ff"
					},
					{
						type: 2,
						title: "货道容量设置",
						name: "gold-coin-o",
						color: "#ff8636",
					},
					{
						type: 3,
						title: "货道状态设置",
						name: "logistics",
						color: "#8463f4"
					},
				],
				//上架 --- 货道
				optionType: 1,
				railList: [],
			};
		},
		methods: {
			//打开
			openModule(type) {
				this.optionType = type;
				local.setSion("shjRailList", this.$parent.railList);
				this.batchSet = true;
			},
			//商品上架
			commodityClick(item) {
				this.$refs.change.handleEdit(item);
			},
			//货道管理
			railClick(rail) {
				if (rail.type == 1) {
					// return this.$toast("火速开发中~");
					this.batchSet = false;
					this.$parent.stratTest();
				} else {
					this.$refs.change.handleRail(rail);
				}
			},
			getDetail() {
				this.$parent.getDetail();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.edit-cargoroad {
		background: #fff;
		width: 100%;

		.popup-header {
			align-items: center;
			background: #f4f5f7;
			color: #5241FF;
			display: flex;
			font-size: 16px;
			height: 45px;
			justify-content: space-between;
			padding: 0 10px;

			.popup-title {
				color: #000;
			}
		}

		.popup-content {
			font-size: 15px;
			padding: 20px 5px;
			display: flex;
			justify-content: space-around;

			.menu-item {
				align-items: center;
				background: #E6E4FE;
				display: flex;
				flex-direction: column;
				height: 115px;
				justify-content: center;
				flex: 1;
				margin: 0 5px;
				border-radius: 5px;

				span {
					margin-top: 6px;
				}
			}
		}
	}
</style>