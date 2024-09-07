<template>
	<view class="xls-today-earning">
		<u-row type="flex">
			<u-col :span="3">
				<view class="grid-content">
					收益构成
				</view>
			</u-col>
			<u-col :span="4">
				<view class="grid-content">
					收益
				</view>
			</u-col>
			<u-col :span="4">
				<view class="grid-content">
					兑币
				</view>
			</u-col>
		</u-row>

		<!-- 在线支付 -->
		<u-row class="xls-today-item-wrapper" @click="goToDetail(1)">
			<u-col :span="3">
				<view class="item-main-style">
					<view class="main-T-box">
						<view class="main-text-style">在线支付</view>
					</view>
				</view>
			</u-col>
			<u-col :span="4">
				<view class="item-main-style">
					<view class="main-t-box border">
						<view class="main-text-style text-price">
							{{ $formatAmount(onlineIncome.onlinePayIncome) }}<span class="unit">元</span>
						</view>
					</view>
					<view class="main-t-box">
						<view class="main-text-style unit border-right">
							笔单价
							<p>{{ $formatAmount(onlineIncome.onlinePaySinglePayAmount) }}元</p>
						</view>
					</view>
				</view>
			</u-col>
			<u-col :span="4">
				<view class="item-main-style">
					<view class="main-t-box border">
						<view class="main-text-style text-price">
							{{ onlineIncome.onlinePayCoinsNum || 0 }}<span class="unit">个</span>
						</view>
					</view>
					<view class="main-t-box">
						<view class="main-text-style unit">
							交易笔数
							<p>{{ onlineIncome.onlinePayOrderNum || 0 }}笔</p>
						</view>
					</view>
				</view>
			</u-col>
			<u-col :span="1">
				<view class="item-main-style center-content">
					<u-icon name="arrow-right" color="#fff" class="right-icons" size="32" />
				</view>
			</u-col>
		</u-row>

		<!-- 平台补贴 -->
		<u-row type="flex" class="xls-today-item-wrapper" @click="goToDetail(2)" v-if="0">
			<u-col :span="3">
				<view class="item-main-style">
					<view class="main-T-box">
						<view class="main-text-style">平台补贴</view>
					</view>
				</view>
			</u-col>
			<u-col :span="4">
				<view class="item-main-style">
					<view class="main-T-box">
						<view class="main-text-style text-price">
							{{subsidyInfo.subsidyIncome || "0.00"}}<span class="unit">元</span>
						</view>
					</view>
				</view>
			</u-col>
			<u-col :span="4">
				<view class="item-main-style">
					<view class="main-T-box">
						<view class="main-text-style txt-price">
							{{ subsidyInfo.subsidyCoinsNum || 0 }}<span class="unit">个</span>
						</view>
					</view>
				</view>
			</u-col>
			<u-col :span="1">
				<view class="item-main-style center-content">
					<u-icon name="arrow-right" color="#fff" class="right-icons" size="32" />
				</view>
			</u-col>
		</u-row>
		<!-- 现金支付 -->
		<u-row class="xls-today-item-wrapper" @click="goToDetail(3)">
			<u-col :span="3">
				<view class="item-main-style">
					<view class="main-T-box">
						<view class="main-text-style">现金支付</view>
					</view>
				</view>
			</u-col>
			<u-col :span="4">
				<view class="item-main-style">
					<view class="main-t-box border">
						<view class="main-text-style text-price">
							{{ $formatAmount(cashIncome.cashPayIncome) }}<span class="unit">元</span>
						</view>
					</view>
					<view class="main-t-box">
						<view class="main-text-style unit border-right">
							笔单价
							<p>{{ $formatAmount(cashIncome.cashPaySinglePayAmount || 0) }}元</p>
						</view>
					</view>
				</view>
			</u-col>
			<u-col :span="4">
				<view class="item-main-style">
					<view class="main-t-box border">
						<view class="main-text-style text-price">
							{{ cashIncome.cashPayCoinsNum || 0 }}<span class="unit">个</span>
						</view>
					</view>
					<view class="main-t-box">
						<view class="main-text-style unit">
							交易笔数
							<p>{{ cashIncome.cashPayOrderNum || 0 }}笔</p>
						</view>
					</view>
				</view>
			</u-col>
			<u-col :span="1">
				<view class="item-main-style center-content">
					<u-icon name="arrow-right" color="#fff" class="right-icons" size="32" />
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import {
		orderController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				cashIncome: {},
				onlineIncome: {},
				subsidyInfo: {},
			}
		},
		onLoad() {
			this.getEarnInfo()
		},
		methods: {
			goToDetail(params) {
				this.$goTo('/pages/mainPackages/home/todayEarning/earnDetail', 'navigateTo', {
					params
				})
			},
			getEarnInfo() {
				orderController.getTodayCashIncome({})
					.then((res) => {
						this.cashIncome = res.data;
					})
					.catch((err) => {
						console.log(err);
					});
				orderController.getTodayOnlineIncome({})
					.then((res) => {
						this.onlineIncome = res.data;
					})
					.catch((err) => {
						console.log(err);
					});
				orderController.subsidyIncomeInfo({})
					.then((res) => {
						this.subsidyInfo = res.data;
					})
					.catch((err) => {});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-today-earning {
		font-family: "Microsoft JhengHei", "Microsoft YaHei";
		padding: 0 20rpx 24rpx;
		background: #fff;

		.grid-content {
			line-height: 90rpx;
			background: #fff;
			text-align: center;
			font-size: 28rpx;
		}

		.xls-today-item-wrapper {
			margin-bottom: 20rpx;
			border-radius: 4rpx;
			overflow: hidden;

			.item-main-style {
				min-height: 240rpx;
				background: linear-gradient(#5241ff, #b1aaff);

				.main-T-box {
					min-height: 120px;
					width: 100%;
					display: flex;
					align-items: center;
				}

				.main-t-box {
					min-height: 120rpx;
					width: 100%;
					display: flex;
					align-items: center;
				}

				.main-text-style {
					height: 33%;
					width: 100%;
					text-align: center;
					color: #fff;
					font-size: 30rpx;
				}

				.text-price {
					font-size: 40rpx;
					font-weight: 700;
				}

				.txt-price {
					font-size: 40rpx;
				}

				.unit {
					font-size: 24rpx;
				}

				.right-icons {
					opacity: 0.4;
				}
			}
		}

		.border {
			border-bottom: 2rpx solid rgba(255, 252, 252, 0.2);
			box-sizing: border-box;
		}

		.border-right {
			border-right: 2rpx solid rgba(255, 252, 252, 0.2);
			box-sizing: border-box;
		}

		.center-content {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>