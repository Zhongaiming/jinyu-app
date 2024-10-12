<template>
	<!--售货机订单详情 -->
	<u-popup :show="orderDetail" mode="bottom" @close="() => {
		orderDetail = false
	}">
		<view class="orderDetail-wrapper">
			<view class="modal-header">
				<span class="header">订单明细</span>
				<span class="status-btn success" v-show="orderDetailCon.state == 1 && shjType == 1">已完成</span>
				<span class="status-btn success" style="color: #5241ff"
					v-show="orderDetailCon.state == 0 && shjType == 1">待支付</span>
				<span class="status-btn success" style="color: red"
					v-show="orderDetailCon.state == -1 && shjType == 1">已退款</span>
				<span class="view-close" @click="orderDetail = false">x</span>
			</view>
			<view class="order-info-panel">
				<span class="machine-info">{{ orderDetailCon.deviceTypeName
	              }}{{ orderDetailCon.deviceNumber }}</span>
				<span class="origin-order-button" style="color: #5241ff"
					v-if="orderDetailCon.state != 1 && shjType == 1">原订单详情</span>
				<span v-if="orderDetailCon.state != 1 && shjType == 2">返回</span>
			</view>
			<view class="order-list-head">
				<span>商品</span>
				<span>货道</span>
				<span>单价</span>
				<span v-if="orderDetailCon.state == 1 || shjType == 2">购买/出礼</span>
				<span v-if="orderDetailCon.state == 1 || shjType == 2">合计</span>
				<span v-if="orderDetailCon.state != 1 && shjType == 1">退款/出礼</span>
				<span v-if="orderDetailCon.state != 1 && shjType == 1">退款金额</span>
			</view>
			<ul class="order-goods-list">
				<li class="row" v-for="(item, index) in shjDetailList" :key="index">
					<span>{{ item.commodityName }}</span>
					<span>{{ item.serialNumber }}</span>
					<span>{{ item.payPrice }}</span>
					<span v-if="orderDetailCon.state == 1 || shjType == 2">{{
	                item.payCount + "/" + item.outPresentCount
	              }}</span>
					<span v-if="orderDetailCon.state == 1 || shjType == 2">{{
	                item.paySumPrice
	              }}</span>
					<span v-if="orderDetailCon.state != 1 && shjType == 1">{{
	                viewFloastMethod(item.refundSumPrice || 0, item.payPrice || 0) +
	                "/" +
	                item.outPresentCount
	              }}</span>
					<span v-if="orderDetailCon.state != 1 && shjType == 1"
						style="color: red">{{ item.refundSumPrice || 0 }}</span>
				</li>
			</ul>
		</view>
	</u-popup>
</template>

<script>
	import {
		orderController
	} from '@/api/index.js';
	export default {
		name: 'xlsShjOrderDetail',
		data() {
			return {
				shjType: 2,
				orderDetailCon: {},
				shjDetailList: [],
				orderDetail: false
			}
		},
		methods: {
			getShjList(order) {
				const {orderNo} = order
				Object.assign(this.orderDetailCon, order)
				orderController.getShjOrderDetail({
					orderNo,
					type: 1, //1=全部支付的  2=退款的
				}).then((res) => {
					if (res.code == 200) {
						this.shjDetailList = res.data
						if (this.shjDetailList.length) {
							this.orderDetail = true
						} else {
							this.$modal("出货数据未上传，请稍后再试~", {
								title: "温馨提示",
								confirmText: "我知道了",
								showCancel: false
							}).then(() => {})
						}
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.orderDetail-wrapper {
		max-height: 1000rpx;
		height: 60vh;
		width: 100%;
		display: flex;
		flex-direction: column;

		.modal-header {
			height: 48px;
			align-items: center;
			display: flex;
			position: relative;
			justify-content: space-between;
			padding: 0 10px;
			background: #fafafa;
			border-bottom: 1px solid #eee;

			.header {
				font-size: 18px;
				font-weight: 500;
			}

			.status-btn {
				display: block;
				font-size: 15px;
				border-radius: 3px;
				margin-right: 40px;
				padding: 0 8px;
			}

			.success {
				background-color: #e6e4fe;
				color: #999;
				font-weight: 700;
			}

			.view-close {
				line-height: 25px;
				position: absolute;
				top: 50%;
				margin-top: -15px;
				vertical-align: middle;
				padding: 0 10px;
				font-size: 29px;
				color: #cacaca;
				right: 10px;
			}

			.sides-style {
				padding: 0 12px;
				color: #5241ff;
				font-size: 15px;
			}

			.title-c-style {
				text-align: center;
				flex: 1;
				font-size: 15px;
			}
		}

		.order-info-panel {
			justify-content: space-between;
			font-size: 14px;
			line-height: 20px;
			border-bottom: 1px solid #eee;
			display: flex;
			padding: 10px;
			-webkit-box-pack: justify;
			color: #1a1a1a;

			.refuse-button-style {
				padding: 5px 8px;
				background: #5241ff;
				color: #fff;
				border-radius: 6px;
			}

			.machine-info-style {
				display: flex;
				align-items: center;
			}
		}

		.order-list-head {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			color: #1a1a1a;
			padding: 10px 5px;
			line-height: 20px;
			font-weight: 400;

			span {
				flex: 2;
				text-align: center;
				font-size: 12px;
				margin: 0 5px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.order-goods-list {
			flex: 1;
			overflow-y: scroll;
			padding-bottom: 20px;
			box-sizing: border-box;
			background: #000;
			background: #f5f6f7;

			.row {
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;
				line-height: 20px;
				padding: 10px 5px;
				font-size: 12px;
				font-weight: 400;
				background: #fff;
				color: #353535;

				span {
					flex: 2;
					margin: 0 5px;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.span {
			flex: 3 !important;
		}

		.min-span {
			flex: 1 !important;
		}
	}
</style>