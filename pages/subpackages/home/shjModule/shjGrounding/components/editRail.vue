<template>
	<view>
		<!-- 货道编辑 -->
		<u-popup :show="railEdit" mode="bottom" @close="railEdit=false">
			<view class="edit-cargoroad">
				<view class="popup-header">
					<span @click="railEdit = false">取消</span>
					<span class="popup-title">货道设置</span>
					<span @click="confirmSet">保存</span>
				</view>
				<view class="popup-content">
					<view class="edit-panel" @click="pickerCommodity">
						<span>商品名称</span>
						<span class="product-name">{{ commodityName }}</span>
					</view>
					<view class="edit-panel">
						<span>商品售卖价格12</span>
						<view class="input-wrapper">
							<xls-field placeholder="请输入商品售卖价格" v-model="railMsg.price" type="number"
								input-align="right" />
						</view>
						<span>元/个</span>
					</view>
					<view class="edit-panel">
						<span>现有库存</span>
						<u-number-box v-model="railMsg.railRepertory" input-width="75px" button-size="40px" min="0"
							iconStyle="fontSize: 17px" />
					</view>
					<view class="edit-panel">
						<span>货道容量</span>
						<view class="input-wrapper">
							<xls-field v-model="railMsg.railCapacity" type="digit" placeholder="请输入货道容量"
								input-align="right" />
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<xls-commodity :commodityId="railMsg.commodityId" @confirm="getShjCommodity" ref="commodity"></xls-commodity>
	</view>
</template>

<script>
	import {
		shjController
	} from "@/api/index.js";
	export default {
		name: "editRail",
		data() {
			return {
				railEdit: false,
				railMsg: {
					railId: null,
					commodityId: null,
					price: null, //价格
					railRepertory: null, //现有库存
					railCapacity: null, //货道容量
				},
				commodityName: "",
			};
		},
		methods: {
			handleEdit(item) {
				this.commodityName = item.commodityName ? item.commodityName : "未设置";
				this.railMsg = {
					railId: item.id,
					commodityId: item.commodityId,
					price: item.price, //价格
					railRepertory: item.railRepertory, //现有库存
					railCapacity: item.railCapacity, //货道容量
				}
				this.railEdit = true;
			},
			pickerCommodity() {
				this.railEdit = false
				this.$refs.commodity.openMethod()
			},
			getShjCommodity(commodity) {
				this.railMsg.commodityId = commodity.commodityId
				this.railMsg.price = commodity.suggestRetailPrice
				this.commodityName = commodity.commodityName
				this.railEdit = true
			},
			async confirmSet() {
				let res = await shjController.goodsOnTheShelf(this.railMsg);
				if (res.code == 200) {
					this.$emit('getDetail')
					this.$toast("修改成功~")
					this.railEdit = false
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.edit-cargoroad {
		background: #fff;
		width: 100%;
		padding-bottom: 80px;

		.popup-header {
			align-items: center;
			background: #f4f5f7;
			color: #5241ff;
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

			.edit-panel {
				align-items: center;
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				height: 50px;
				justify-content: space-between;
				padding: 0 10px;

				.input-wrapper {
					flex: 1;
				}
			}

			.product-name {
				padding-right: 20px;
			}

			.product-name:after {
				border-right: 1px solid #4c4c4c;
				border-top: 1px solid #4c4c4c;
				content: "";
				height: 9px;
				margin-top: 5px;
				opacity: 0.6;
				position: absolute;
				right: 13px;
				transform: rotate(45deg);
				width: 9px;
			}
		}
	}
</style>