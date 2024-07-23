<template>
	<view class="xls-today-earn-detail">
		<view class="xls-td-tab-content">
			<view class="tab-item" v-for="tab in tabList" :key="tab.id" @click="changeTabValue(tab.id)">
				<view class="name" :class="tabActive == tab.id ? 'active' : ''">
					{{ tab.name }}
				</view>
			</view>
		</view>

		<view class="xls-td-status-label" v-show="tabActive == 1">
			<view class="status-item" v-for="state in statusList" :key="state.id"
				:class="stateActive == state.id ? 'active-status' : ''" @click="changeStateValue(state.id)">
				{{ state.name }}
			</view>
		</view>

		<u-list @scrolltolower="scrolltolower" class="xls-list">
			<u-list-item v-for="(item, index) in dataList" :key="index" class="xls-list-item">
				<view class="entry-hd" v-show="tabActive != 3">
					<view class="title-info">
						<p class="top" v-if="item.payType == 0">微信付款</p>
						<p class="top" v-else-if="item.payType == 1">支付宝付款</p>
						<p class="top" v-else>线上余额</p>
						<p class="middle">{{ item.createTime }}</p>
					</view>
					<view class="num-info">
						{{ item.amountTotal }}<span class="small">元</span><br />
						<span class="has-refund back" v-show="item.state == -1">有退款</span>
						<span class="has-refund stay" v-show="item.state == 0">待支付</span>
						<span class="has-refund" v-show="item.state == 1">交易完成</span>
						<span class="trade-detail" v-hasPermi="['app:order:index']" @click="goTo(item)">订单详情</span>
					</view>
				</view>
				<view class="entry-bd" v-show="tabActive != 3">
					<view class="info-row">
						<span class="field">设备类型</span>
						<span class="value text-over">{{ item.deviceTypeName }}_{{ item.deviceNumber }}</span>
					</view>
					<view class="info-row">
						<span class="field">交易单号</span>
						<span class="value text-over">{{ item.transactionId }}</span>
					</view>
					<view class="info-row">
						<span class="field">商户单号</span>
						<span class="value text-over">{{ item.transactionNo }}</span>
					</view>
				</view>
				<view class="entry-hd" v-show="tabActive == 3">
					<view class="title-info cash-wrapper">
						<view class="place-text">
							{{ item.placeName }}
							<span v-show="item.deviceNumber">_{{ item.deviceNumber }}</span>
							<span v-show="item.deviceNumber">-{{ "1" }}</span>
							<span v-show="item.railNumber">-{{ item.railNumbe || "1" }}</span>
						</view>
						<view>{{ item.createTime }}</view>
					</view>
					<view class="num-info">
						{{ item.amountTotal }}<span class="small">元</span>
					</view>
				</view>
			</u-list-item>
			<u-divider text="已经到底啦~" :dashed="true" text-size="28"></u-divider>
		</u-list>

		<xls-empty v-if="!dataList.length" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
					payType: 0
				}, {
					payType: 1
				}, {
					payType: 2
				}],
				//支付方式
				tabList: [{
						id: 1,
						name: "在线支付"
					},
					{
						id: 2,
						name: "平台补贴"
					},
					{
						id: 3,
						name: "现金支付"
					},
				],
				tabActive: 1,
				//在线支付状态
				statusList: [{
						id: -2,
						name: "全部"
					},
					{
						id: -1,
						name: "已退款"
					},
					{
						id: 1,
						name: "交易成功"
					},
				],
				stateActive: -2,
			}
		},
		onLoad(option) {
			console.log("传参", JSON.parse(option.params).id)
		},
		methods: {
			scrolltolower() {},
			//在线-平台-现金
			changeTabValue(id) {
				this.tabActive = id;
			},
			//在线支付状态
			changeStateValue(id) {
				this.stateActive = id;
			},
			goTo(params) {
				this.$goTo('/pages/mainPackages/home/order/index', 'navigateTo', {
					transactionId: params.transactionId ?
						params.transactionId :
						params.transactionNo
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-today-earn-detail {
		.xls-td-tab-content {
			height: 88rpx;
			background: #fff;
			width: 100%;
			display: flex;

			.tab-item {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.name {
					font-size: 32rpx;
					color: rgba(0, 0, 0, 0.6);
					text-align: center;
					height: 88rpx;
					line-height: 88rpx;
					padding: 0 10rpx;
				}

				.active {
					color: #5241ff;
					border-bottom: 4rpx solid #5241ff;
				}
			}
		}

		.xls-td-status-label {
			height: 100rpx;
			padding: 10rpx 30rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;

			.status-item {
				padding: 10rpx 20rpx;
				border: 2rpx solid #7c7c7c;
				color: #333;
				border-radius: 10rpx;
				margin-right: 30rpx;
			}

			.active-status {
				border: 2rpx solid #5241ff;
				color: #5241ff;
			}
		}

		.xls-list {
			padding-bottom: 120rpx;
			box-sizing: border-box;
			font-family: "Microsoft JhengHei", "Microsoft YaHei";

			.xls-list-item {
				background: #fff;
				padding: 0 30rpx;
				margin-bottom: 30rpx;

				.entry-hd {
					padding: 32rpx 0 12.5px;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.title-info {
						.top {
							font-size: 34rpx;
							color: #000;
							font-weight: 700;
						}

						font-size: 24rpx;
						color: rgba(0, 0, 0, 0.7);
						width: 280rpx;

						.middle {
							margin-top: 5rpx;
							color: #666;
						}
					}

					.cash-wrapper {
						flex: 1;

						.place-text {
							font-size: 28rpx;
							font-weight: 600;
							margin-bottom: 16rpx;
						}
					}
				}

				.num-info {
					max-width: 300rpx;
					text-align: right;
					color: #333;
					line-height: 1.1;
					font-size: 40rpx;
					font-weight: 700;

					.small {
						font-weight: 400;
						font-size: 32rpx;
					}

					.has-refund {
						font-size: 28rpx;
						margin-right: 10rpx;
					}

					.back {
						color: red;
					}

					.stay {
						color: #5241ff;
					}

					.trade-detail {
						font-weight: 400;
						font-size: 28rpx;
						color: #5241ff;
					}
				}

				.entry-bd {
					padding-top: 10;
					padding-bottom: 35rpx;
					line-height: 1.1;
					border-top: 2rpx dashed #ddd;

					.info-row {
						display: flex;
						justify-content: space-between;
						line-height: 1.1;
						padding-top: 15rpx;
						white-space: nowrap;
						font-size: 26rpx;
						color: #7c7c7c;

						.value {
							max-width: 75%;
						}
					}
				}
			}
		}
	}
</style>