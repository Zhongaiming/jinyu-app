<template>
	<view class="xls-order-detail">
		<jy-navbar title="订单详情" bgColor="#f5f5f5"></jy-navbar>
		<view class="xls-box-style" @click="goTo()" v-if="order.amountRefund && order.refundState == 1">
			<view class="device-style">
				<span>已退 ¥{{order.amountRefund}}</span>
				<span class="state arrow">{{stateDict[order.state]}}</span>
			</view>
			<view class="text-style">
				{{order.refundTime}}
			</view>
		</view>

		<view class="xls-box-style">
			<view class="xls-order-detail-text">
				{{order.placeName}}
			</view>
			<!-- <view class="xls-order-detail-addressDetail">
				6064-山东德州大学路银座三楼东电梯口
			</view> -->
			<view class="label-style">
				<view class="label-device-type">
					{{ deviceTypeDict[order.deviceType] }}
				</view>
				<view class="label border-left-none">
					{{ order.deviceNumber }}
				</view>
				<view class="label">
					{{typeDict[order.type]}}
				</view>
				<!-- <view class="label">
					主板ID编号:01
				</view> -->
			</view>

			<view class="xls-order-style-price xls-pay-detail">
				<image class="icon-image"
					src="https://asset.leyaoyao.com/merchant-order-center/static/d0da3593648b2c25b3ca.png"
					mode="widthFix"></image>
				<view class="price-center">
					<view class="">
						{{ order.shopPrice }}元1局
					</view>
					<view class="">
						x1
					</view>
				</view>
				<view class="price-right">
					<view class="backColor">
						¥{{ order.amount }}
					</view>
					<view class="redColor">
						实付：¥{{ order.amountTotal }}
					</view>
				</view>
			</view>

			<view class="order_line"></view>

			<view class="price-list">
				<view class="list">
					<span>需付款：</span>
					<span class="text">¥{{ order.amount }}</span>
				</view>
				<view class="list">
					<span>实付款：</span>
					<span class="text">¥{{ order.amountTotal }}</span>
				</view>
				<view class="list">
					<span>商户实收款：</span>
					<span class="main-text">¥{{ order.bankCardAmount }}</span>
				</view>
			</view>
		</view>

		<view class="xls-box-style">
			<view class="record-detail-list">
				<view class="title">
					订单编号
				</view>
				<view class="value">
					<view class="">
						{{ order.orderNo }}
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
			
			<view class="record-detail-list" v-if="order.amountCoupon">
				<view class="title">
					营销活动
				</view>
				<view class="value">
					<view class="">
						-{{ order.amountCoupon }}元({{ order.couponName|| "优惠券" }})
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					创建时间
				</view>
				<view class="value">
					<view class="">
						{{order.createTime}}
					</view>
				</view>
			</view>

			<view class="order_line margin10"></view>

			<view class="record-detail-list">
				<view class="title">
					支付方式
				</view>
				<view class="value">
					<view class="">
						{{ payTypeDict[order.payType] }}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					支付金额
				</view>
				<view class="value">
					<view class="">
						¥{{ order.amount }}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					支付时间
				</view>
				<view class="value">
					<view class="">
						{{order.updateTime}}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					交易单号
				</view>
				<view class="value">
					<view class="">
						{{ order.transactionId }}
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					平台单号
				</view>
				<view class="value">
					<view class="">
						{{ order.orderNo }}
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					商户单号
				</view>
				<view class="value">
					<view class="">
						{{ order.transactionNo }}
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
		</view>

		<view class="xls-box-style">
			<view class="record-detail-list">
				<view class="title-text">
					会员信息
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					会员昵称
				</view>
				<view class="value">
					<view class="">
						{{order.memberName}}
					</view>
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					会员id
				</view>
				<view class="value">
					<view class="">
						{{order.memberNumber}}
					</view>
				</view>
				<view class="copy">
					复制
				</view>
			</view>
		</view>

		<view class="xls-box-style">
			<!-- <view class="record-detail-list">
				<view class="title">
					主板ID编号
				</view>
				<view class="value-text">
					001
				</view>
			</view> -->

			<view class="record-detail-list">
				<view class="title">
					蛋仓号
				</view>
				<view class="value-text">
					{{ order.shippingSpace }}/{{ order.railNumber }}
				</view>
			</view>

			<view class="record-detail-list">
				<view class="title">
					出礼名称
				</view>
				<view class="value-text">
					<span v-if="order.barCode">{{ order.barCode }}-</span>
					{{ order.commodityName }}
				</view>
			</view>
		</view>

		<xls-bottom></xls-bottom>

		<view class="fixed-box">
			<view class="fixed-box-wrapper">
				<view class="button">
					退款
				</view>
				<view class="button">
					远程启动
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
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				order: {},
				typeDict: {
					1: "充值余币",
					2: "设备启动",
					3: "余币购买",
					4: "余额购买",
					5: "充值余额",
					null: "其他类型"
				},
				stateDict: {
					'-1': "已退款",
					0: "待支付",
					1: "已完成",
					2: "退款中",
					3: "退款成功",
					4: "退款失败",
					5: "已取消",
					6: "已关闭",
					7: "待结算",
					null: "其他"
				},
				refundDict: {
					0: '(出货失败退款)',
					1: '(出货失败部分退款)',
					2: '(人工退款)',
					3: '(通讯失败退款)',
					4: '(人工部分退款)',
					null: "其他"
				},
				payTypeDict: {
					0: '微信支付',
					1: '支付宝支付',
					2: '余额支付',
					null: "其他"
				},
			}
		},
		computed: {
			...mapGetters([
				'deviceTypeList',
				'deviceTypeDict'
			])
		},
		onLoad(option) {
			this.$store.dispatch('config/getList');
			if (option.params) {
				const params = JSON.parse(option.params);
				this.getView(params.orderId)
			}
		},
		methods: {
			getView(id) {
				orderController.getOrderView({
					id
				}).then(res => {
					if (res.code = 200) {
						if(res.data.rails) {
							res.data.rails = JSON.parse(res.data.rails)
						}
						this.order = res.data
					}
				})
			},
			goTo(order) {
				console.log(this.order)
				this.$goTo('/pages/mainPackages/home/order/refundDetail', 'navigateTo', {
					orderId: this.order.id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'index.scss';

	.xls-order-detail {
		font-family: PingFangSC-Medium, PingFang SC;
		padding: 20rpx 24rpx;

		.arrow {
			position: relative;
			padding-right: 32rpx;
		}

		.arrow::after {
			content: "";
			position: absolute;
			right: 10rpx;
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
			border-right: 2rpx solid #52c41a;
			border-top: 2rpx solid #52c41a;
			width: 12rpx;
			height: 12rpx;
		}

		.text-style {
			color: rgba(0, 0, 0, .25);
			font-size: 26rpx;
			margin-top: 12rpx;
		}

		&-text {
			color: rgba(0, 0, 0, .85);

			font-size: 30rpx;
			font-weight: 500;
		}

		&-addressDetail {
			color: rgba(0, 0, 0, .45);
			font-size: 24rpx;
			margin-top: 8rpx;
		}

		.label-device-type {
			line-height: 32rpx;
			margin-top: 10rpx;
			font-size: 20rpx;
			background-color: #5241ff;
			border: 2rpx solid #5241ff;
			border-radius: 8rpx 0 0 8rpx;
			border-right: none;
			color: #fff;
			padding: 0 10rpx;
			position: relative;
		}

		.label-device-type::after {
			border-left: .8vw solid transparent;
			border-right: .8vw solid transparent;
			border-top: .8vw solid #fff;
			content: "";
			height: 0;
			position: absolute;
			right: -2rpx;
			top: 50%;
			transform: rotate(90deg) translateY(-50%) translateX(-25%);
			width: 0;
		}

		.border-left-none {
			border-left: none;
			border-radius: 0 8rpx 8rpx 0;
		}

		.xls-pay-detail {
			height: 132rpx;
		}

		.price-list {
			padding-top: 20rpx;
			text-align: right;
			color: rgba(0, 0, 0, .45);
			font-size: 26rpx;

			.text {
				color: rgba(0, 0, 0, 0.85);
			}

			.list {
				margin-bottom: 12rpx;
			}

			.main-text {
				color: rgba(0, 0, 0, .85);
				font-size: 28rpx;
				font-weight: 700;
			}
		}
	}

	.record-detail-list {
		display: flex;
		font-size: 26rpx;
		margin-bottom: 20rpx;

		.title {
			width: 156rpx;
			color: rgba(0, 0, 0, .45);
			white-space: nowrap;
		}

		.title-text {
			color: rgba(0, 0, 0, .85);
			white-space: nowrap;
			position: relative;
			padding-right: 30rpx;
		}

		.title-text::after {
			content: "";
			position: absolute;
			right: 10rpx;
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
			border-right: 2rpx solid rgba(0, 0, 0, .6);
			border-top: 2rpx solid rgba(0, 0, 0, .6);
			width: 12rpx;
			height: 12rpx;
		}

		.value {
			color: rgba(0, 0, 0, .85);
			flex: 1;
			text-size-adjust: 100% !important;
			text-align: right;
			word-break: break-all;
			margin-left: 40rpx;
		}

		.value-text {
			color: rgba(0, 0, 0, .85);
			flex: 1;
			text-size-adjust: 100% !important;
			word-break: break-all;
			margin-left: 40rpx;
		}

		.copy {
			width: 80rpx;
			padding-left: 20rpx;
			position: relative;
			color: #5241ff;
		}

		.copy::before {
			content: "";
			position: absolute;
			top: 4rpx;
			left: 10rpx;
			width: 2rpx;
			height: 26rpx;
			background-color: rgba(0, 0, 0, .2);
		}
	}

	.fixed-box {
		height: 104rpx;
		width: 100%;

		&-wrapper {
			padding: 20rpx 24rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			display: flex;
			justify-content: flex-end;
		}
	}
</style>