<template>
	<view class="xls-order-detail">
		<jy-navbar :title="order.refundMoney?'退款详情':'交易详情'" bgColor="#f5f5f5"></jy-navbar>
		<view class="xls-main-wrapper">
			<view class="xls-header-style"></view>
			<view class="xls-content-style">
				<view class="xls-order-detail-refund-state" v-if="order.hasOwnProperty('refundState')">
					{{refundStateDict[order.refundState]}}
				</view>
				<view class="xls-order-detail-refund-state" v-else>
					{{stateDict[order.state]}}
				</view>
				<view class="order_line" v-if="order.hasOwnProperty('refundState')"></view>
				<view class="xls-order-detail-refund-price" v-if="order.hasOwnProperty('refundState')">
					<view class="refund-price">
						<view class="left">
							退款金额
						</view>
						<view class="right">
							￥ {{order.refundMoney}} 元
						</view>
					</view>
					<view class="text">
						{{refundStateDesDict[order.refundState]}}
					</view>
				</view>
				<view class="order_line"></view>

				<view class="xls-order-detail-text-step">
					交易流程
				</view>

				<view class="xls-steps">
					<view class="xls-steps-item" v-for="(item,index) in order.orderFlowLogVoList" :key="index">
						<view class="xls-steps-content">
							<view class="title">{{item.name}}</view>
							<view class="time" v-if="item.orderDesc">{{item.orderDesc}}</view>
							<view class="time">{{item.createTime}}</view>
						</view>
						<view class="xls-steps-circle" :class="{'active': index==0}"></view>
						<view class="xls-steps-line" v-if="index+1 !== order.orderFlowLogVoList.length"></view>
					</view>
				</view>
				<view class="order_line"></view>
				
				<view class="xls-order-detail-text-step">
					交易信息
				</view>
				<view class="xls-order-style-price xls-pay-detail">
					<image class="icon-image"
						src="https://asset.leyaoyao.com/merchant-order-center/static/d0da3593648b2c25b3ca.png"
						mode="widthFix"></image>
					<view class="price-center">
						<view class="">
							{{ order.amountTotal }}元1局
						</view>
						<view class="">
							x1
						</view>
					</view>
					<view class="price-right">
						<view class="backColor">
							¥{{ order.amountTotal }}
						</view>
						<view class="redColor" v-if="order.hasOwnProperty('refundMoney')">
							实退：¥{{ order.refundMoney }}
						</view>
					</view>
				</view>

				<view class="xls-order-detail-refund-price" v-if="order.hasOwnProperty('refundState')">
					<view class="refund-price">
						<view class="left">
							订单编号
						</view>
						<view class="right">
							{{order.orderNo}}
						</view>
					</view>
					<view class="refund-price">
						<view class="left">
							退款方式
						</view>
						<view class="right">
							{{refundDict[order.refundType]}}
						</view>
					</view>

					<view class="refund-price">
						<view class="left">
							退款人
						</view>
						<view class="right">
							{{order.refundCommercialUserName}}
						</view>
					</view>

					<view class="refund-price" v-if="order.refundReason">
						<view class="left">
							退款原因
						</view>
						<view class="right">
							{{order.refundReason}}
						</view>
					</view>
				</view>

				<view class="index_footer_Rrm8T">
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
					<view class="index_semicircle_M0lxi"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderController
	} from '@/api/index.js';
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				order: {},	
			}
		},
		computed: {
			...mapState('config', [
				'refundStateDict',
				'refundStateDesDict',
				'refundDict',
				'stateDict',
			])
		},
		onLoad(option) {
			if (option.params) {
				const params = JSON.parse(option.params);
				this.getView(params.orderId)
			}
		},
		methods: {
			async getView(orderId) {
				let res = await orderController.refundQuery({
					orderId
				})
				let data = await orderController.getOrderView({
					id: orderId
				})
				if (res.code = 200) {
					this.order = res.data;
					if (this.order.orderFlowLogVoList) {
						this.order.orderFlowLogVoList.reverse();
					}
				}
				if (data.code = 200) {
					const name = data.data.refundCommercialUserName ? data.data.refundCommercialUserName : '系统退款';
					this.order['refundCommercialUserName'] = name;
					this.order['state'] = data.data.state;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'index.scss';

	.xls-order-detail {
		font-family: PingFangSC-Medium, PingFang SC;
		padding: 20rpx 24rpx;
		overflow: auto;

		.xls-header-style {
			height: 16rpx;
			background: $xls-color-primary;
			border-radius: 2.13333vw 2.13333vw 0 0;
		}

		.xls-content-style {
			background-color: #fff;
			padding: 18rpx;
			padding-bottom: 0;
			position: relative;
		}

		&-refund-state {
			color: rgba(0, 0, 0, .85);
			font-family: PingFangSC-Medium, PingFang SC;
			font-size: 4.8vw;
			font-weight: 500;
			height: 6.66667vw;
			line-height: 6.66667vw;
			margin-bottom: 3.2vw;
		}

		&-refund-price {
			margin: 4.26667vw 0;

			.refund-price {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 1.06667vw;

				.left {
					color: rgba(0, 0, 0, .45);
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 3.46667vw;
					font-weight: 500;
					height: 4.8vw;
					line-height: 4.8vw;
				}

				.right {
					color: rgba(0, 0, 0, .85);
					font-family: PingFangSC-Medium, PingFang SC;
					font-size: 3.46667vw;
					font-weight: 500;
					height: 4.8vw;
					line-height: 4.8vw;
				}
			}

			.text {
				color: rgba(0, 0, 0, .45);
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 3.2vw;
				font-weight: 400;
				height: 4.53333vw;
				line-height: 4.53333vw;
			}
		}

		&-text-step {
			color: rgba(0, 0, 0, .85);
			font-family: PingFangSC-Medium, PingFang SC;
			font-size: 3.73333vw;
			font-weight: 500;
			height: 5.33333vw;
			line-height: 5.33333vw;
			margin: 3.2vw 0;
		}
	}

	.xls-steps {
		padding: 0 0 0 5.06667vw;

		&-item {
			padding: 2.13333vw 0;
			position: relative;
		}

		&-content {
			.title {
				color: rgba(0, 0, 0, .85);
				font-family: PingFangSC-Medium, PingFang SC;
				font-size: 3.73333vw;
				font-weight: 500;
				height: 5.33333vw;
				line-height: 5.33333vw;
			}

			.description {
				color: rgba(0, 0, 0, .45);
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 3.2vw;
				font-weight: 400;
				line-height: 4.53333vw;
				margin-top: 1.06667vw;
			}

			.time {
				color: rgba(0, 0, 0, .25);
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 3.2vw;
				font-weight: 400;
				height: 4.53333vw;
				line-height: 4.53333vw;
				margin-top: 1.06667vw;
			}
		}

		&-circle {
			border-radius: 50%;
			height: 2.66667vw;
			left: -5.33333vw;
			position: absolute;
			top: 3.73333vw;
			width: 2.66667vw;
			z-index: 2;
			background: #d9d9d9;
			border: .53333vw solid #fff;
		}

		.active {
			background: $xls-color-primary;
			border: .53333vw solid $xls-color-primary;
		}

		&-line {
			background: #d9d9d9;
			height: 100%;
			left: -4vw;
			position: absolute;
			top: 3.73333vw;
			width: 2rpx;
		}
	}

	.index_footer_Rrm8T {
		align-items: flex-end;
		background: #fff;
		display: flex;
		height: 2.13333vw;
		justify-content: space-around;

		.index_semicircle_M0lxi {
			background: #f5f5f5;
			border-radius: 1.06667vw 1.06667vw 0 0;
			height: 1.06667vw;
			width: 2.13333vw;
		}
	}
</style>