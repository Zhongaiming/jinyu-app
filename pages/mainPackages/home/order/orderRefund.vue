<template>
	<view class="xls-order-refund">
		<jy-navbar title="售后处理" bgColor="#f5f5f5"></jy-navbar>
		<view class="xls-box-style">
			<view class="refund-content-title">
				全选退款商品
			</view>
			<view class="xls-order-style-price xls-pay-detail">
				<image class="icon-image"
					src="https://asset.leyaoyao.com/merchant-order-center/static/d0da3593648b2c25b3ca.png"
					mode="widthFix"></image>
				<view class="price-center">
					<view class="">
						{{ $formatAmount(order.shopPrice) }}元1局
					</view>
					<view class="">
						x1
					</view>
				</view>
				<view class="price-right">
					<view class="backColor">
						¥{{ $formatAmount(order.amount) }}
					</view>
					<view class="redColor">
						实付：¥{{ $formatAmount(order.amountTotal) }}
					</view>
				</view>
			</view>
		</view>
		<view class="xls-box-style">
			<view class="refund-content-title">
				退款金额
				<view class="refund-content-titleTips">
					（不超过{{ $formatAmount(order.amountTotal) }}元）
				</view>
			</view>
			<view class="refund-content">
				<view class="refund-content_input">
					<view class="refund-content_prefix">￥</view>
					<input v-model="refundAmount" placeholder="输入退款金额" type="number" class="refund-content_input_qV_cV">
				</view>
				<view class="refund-content_btn_ZFgj" @click="() => {
					refundAmount = order.amountTotal/100
				}">全额退</view>
			</view>
			<view class="order_line"></view>
			<view class="refund-content_tips_b1qpJ" v-if="0">
				<svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em"
					class="refund-content_icon_a8Exy">
					<path
						d="M512 0c282.767 0 512 229.233 512 512s-229.233 512-512 512S0 794.767 0 512 229.233 0 512 0zm0 711.68c-25.446 0-46.08 19.487-46.08 43.52s20.634 43.52 46.08 43.52 46.08-19.487 46.08-43.52-20.634-43.52-46.08-43.52zm0-486.4a44.892 44.892 0 0 0-44.877 46.065l9.41 359.705a35.476 35.476 0 0 0 70.933 0l9.41-359.705A44.892 44.892 0 0 0 512 225.28z">
					</path>
				</svg>
				超出可退金额上限
			</view>
		</view>

		<view class="xls-box-style">
			<view class="refund-content-title">
				申请退款原因
			</view>
			<view class="refund-reason-wrapper">
				<u-radio-group v-model="reason" placement="column">
					<u-radio :customStyle="{marginBottom: '24rpx'}" v-for="(item, index) in reasonList" :key="index"
						:label="item.label" :name="item.id" size="40" iconSize="32" activeColor="#5241FF"
						labelSize="28">
					</u-radio>
				</u-radio-group>
			</view>

			<view class="refund-reason-wrapper">
				<u--textarea v-model="reasonValue" placeholder="补充详细退款原因，有利于后期账单处理" count maxlength="200" height="120"
					:customStyle="{'background-color': '#f3f4f5'}"></u--textarea>
			</view>
		</view>

		<xls-bottom-btn @confirm="confirmMethod" text="原路退款"></xls-bottom-btn>
	</view>
</template>

<script>
	import {
		orderController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				order: {},
				reason: 1,
				reasonValue: "",
				refundAmount: "",
				reasonList: [{
						id: 1,
						label: '无原因'
					},
					{
						id: 2,
						label: '缺货'
					},
					{
						id: 3,
						label: '设备故障'
					},
					{
						id: 4,
						label: '规格/款式/数量 错误'
					},
					{
						id: 5,
						label: '不想要了'
					},
					{
						id: 6,
						label: '其他'
					},
				],
			}
		},
		onLoad(option) {
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
						if (res.data.rails) {
							res.data.rails = JSON.parse(res.data.rails)
						}
						this.order = res.data;
					}
				})
			},
			confirmMethod() {
				if(!this.refundAmount) {
					return this.$toast("请先输入退款金额");
				}
				if (this.refundAmount * 100 > this.order.amountTotal * 100) {
					return this.$toast("退款金额不能超过实付金额！！")
				}
				if (this.refundAmount == this.order.amountTotal) {
					return this.allRefund();
				}
				this.$modal(`确定要退款 ¥${this.refundAmount} 吗？`, {
					title: "退款提示"
				}).then(() => {
					const reason = `${this.reasonList[this.reason-1].label}${this.reasonValue}`
					orderController.amountRefund({
						amountRefundDto: {
							orderNo: this.order.orderNo,
							refundAmount: this.refundAmount * 100,
							refundReason: reason,
						}
					}).then(res => {
						if (res.code == 200) {
							this.$toast("退款成功！");
							this.$goBack();
						}
					})

				})
			},
			async allRefund() {
				// "确定要“全额退款”吗？"
				this.$modal(`确定要退款 ¥${this.refundAmount} 吗？`, {
					title: "退款提示"
				}).then(() => {
					const reason = `${this.reasonList[this.reason-1].label}${this.reasonValue}`
					orderController.allRefund({
						amountRefundDto: {
							orderNo: this.order.orderNo,
							refundAmount: this.order.amountTotal * 100,
							refundReason: reason,
						}
					}).then(res => {
						if (res.code == 200) {
							this.$toast("退款成功！");
							this.$goBack();
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';

	.xls-order-refund {
		padding: 0rpx 24rpx 20rpx;

		.refund-content-title {
			align-items: center;
			color: rgba(0, 0, 0, .85);
			display: flex;
			font-family: PingFangSC-Medium, PingFang SC;
			font-size: 28rpx;
			height: 40rpx;
			line-height: 40rpx;

			.refund-content-titleTips {
				color: rgba(0, 0, 0, .45);
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 3.2vw;
				font-weight: 400;
				height: 4.53333vw;
				line-height: 4.53333vw;
			}
		}
	}

	.refund-content {
		align-items: center;
		box-sizing: border-box;
		display: flex;
		margin-top: 10rpx;
		padding: 24rpx 0;
	}

	.refund-content .refund-content_input {
		align-items: baseline;
		display: flex;
		flex: 1;
	}

	.refund-content .refund-content_input .refund-content_prefix {
		color: rgba(0, 0, 0, .85);
		font-family: D-DIN-Bold, D-DIN;
		font-size: 32rpx;
		font-weight: 700;
		height: 32rpx;
		line-height: 32rpx;
	}

	.refund-content .refund-content_btn_ZFgj {
		font-size: 28rpx;
		height: 42rpx;
		line-height: 42rpx;
		color: $xls-color-primary;
	}

	.refund-content .refund-content_input .refund-content_input_qV_cV {
		flex: 1;
		font-family: D-DIN-Bold, D-DIN;
		font-size: 5.4vw;
		font-weight: 700;
		height: 6.4vw;
		line-height: 6.4vw;
		margin-left: 20rpx;
		width: 0;
		color: rgba(0, 0, 0, .85);
		opacity: 1;
	}

	.refund-reason-wrapper {
		margin-top: 40rpx;
	}
</style>