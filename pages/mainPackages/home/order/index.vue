<template>
	<view class="xls-order">
		<jy-navbar title="订单列表"></jy-navbar>
		<u-list @scrolltolower="scrolltolower" class="xls-order-list">
			<u-list-item v-for="(item, index) in dataList" :key="index" class="xls-order-list-item">
				<view class="xls-order-place">
					<u-icon name="map" color="#5241ff" size="24"></u-icon>
					<span class="place">{{item.placeName}}</span>
					<span>|</span>
					<span class="time">{{item.createTime}}</span>
				</view>

				<view class="xls-order-style">
					<view class="xls-order-style-header">
						<image class="icon-image"
							:src="`${$baseUrl}appV4/common/${item.payType == 0 ? 'wechat':'pay'}.png`" mode="widthFix">
						</image>
						<view class="right-wrapper">
							<view class="device-style">
								<span> {{ item.deviceTypeName }}{{ item.deviceNumber }}</span>
								<span class="state">已支付</span>
							</view>
							<view class="order-number">
								<span>{{ item.orderNo }}</span>
								<view class="base-copy">
									<svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
										<path
											d="M810.667 85.333a128 128 0 0 1 127.786 120.491l.214 7.51V640a128 128 0 0 1-120.491 127.787l-7.51.213H768v42.667a128 128 0 0 1-120.49 127.786l-7.51.214H213.333a128 128 0 0 1-128-128V384a128 128 0 0 1 128-128H256v-42.667A128 128 0 0 1 376.49 85.547l7.51-.214h426.667zM640 341.333H213.333A42.667 42.667 0 0 0 170.667 384v426.667a42.667 42.667 0 0 0 42.666 42.666H640a42.667 42.667 0 0 0 42.667-42.666V384A42.667 42.667 0 0 0 640 341.333zm170.667-170.666H384a42.667 42.667 0 0 0-42.368 37.674l-.299 4.992V256H640a128 128 0 0 1 127.787 120.49L768 384v298.667h42.667a42.667 42.667 0 0 0 42.368-37.675l.298-4.992V213.333a42.667 42.667 0 0 0-37.674-42.368l-4.992-.298z">
										</path>
									</svg>
								</view>
							</view>
							<view class="label-style">
								<view class="label">
									{{typeDict[item.type]}}
								</view>
								<!-- <view class="label">
									设备启动
								</view>
								<view class="label">
									设备启动
								</view> -->
							</view>
						</view>
					</view>
					<view class="order_line"></view>

					<view class="xls-order-style-member">
						<image class="icon-image" :src="`${$baseUrl}appV4/common/wechat.png`" mode="widthFix"></image>
						<span class="member-name">{{ item.memberName || "***" }}</span>
						<span class="member-number">ID:{{ item.memberNumber }}</span>
						<view class="base-copy">
							<svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
								<path
									d="M810.667 85.333a128 128 0 0 1 127.786 120.491l.214 7.51V640a128 128 0 0 1-120.491 127.787l-7.51.213H768v42.667a128 128 0 0 1-120.49 127.786l-7.51.214H213.333a128 128 0 0 1-128-128V384a128 128 0 0 1 128-128H256v-42.667A128 128 0 0 1 376.49 85.547l7.51-.214h426.667zM640 341.333H213.333A42.667 42.667 0 0 0 170.667 384v426.667a42.667 42.667 0 0 0 42.666 42.666H640a42.667 42.667 0 0 0 42.667-42.666V384A42.667 42.667 0 0 0 640 341.333zm170.667-170.666H384a42.667 42.667 0 0 0-42.368 37.674l-.299 4.992V256H640a128 128 0 0 1 127.787 120.49L768 384v298.667h42.667a42.667 42.667 0 0 0 42.368-37.675l.298-4.992V213.333a42.667 42.667 0 0 0-37.674-42.368l-4.992-.298z">
								</path>
							</svg>
						</view>
					</view>

					<view class="xls-order-style-price" @click="goTo()">
						<image class="icon-image"
							src="https://asset.leyaoyao.com/merchant-order-center/static/d0da3593648b2c25b3ca.png"
							mode="widthFix"></image>
						<view class="price-center">
							{{ item.shopPrice }}元1局
						</view>
						<view class="price-right">
							¥{{ item.shopPrice }}
						</view>
					</view>

					<view class="xls-order-style-quantity">
						<view class="number">
							共1件商品
						</view>
						<view class="accout">
							实收款：¥{{ item.bankCardAmount }}
						</view>
					</view>

					<u-line hairline></u-line>

					<view class="xls-order-style-button">
						<view class="button">
							退款
						</view>
						<view class="button">
							远程启动
						</view>
						<view class="button" @click="goTo()">
							查看详情
						</view>
					</view>
				</view>
			</u-list-item>
			<u-divider text="已经到底啦~" :dashed="true" text-size="28"></u-divider>
		</u-list>
	</view>
</template>

<script>
	import {
		orderController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				typeDict: {
					1: "充值余币",
					2: "设备启动",
					3: "余币购买",
					4: "余额购买",
					5: "充值余额",
					null: "其他类型"
				},
				dataList: [],
			}
		},
		onLoad(option) {
			// JSON.parse(option.params)
			console.log("传参", option)
			this.getList();
		},
		methods: {
			async getList() {
				let res = await orderController.getOrderList({
					pageParam: {
						pageNum: 1,
						pageSize: 10
					},
					orderFormDtoFilter: {

					},
					orderParam: []
				})
				this.dataList = res.data.dataList;
			},
			scrolltolower() {},
			goTo(item) {
				this.$goTo('/pages/mainPackages/home/order/orderDetail', 'navigateTo', {
					id: 'item.id'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';

	.xls-order {

		&-list {
			padding: 20rpx 24rpx;

			&-item {
				margin-bottom: 24rpx;
			}
		}

		&-place {
			width: 450rpx;
			font-size: 18rpx;
			color: #5241ff;
			display: flex;
			align-items: center;
			padding: 5rpx 16rpx;
			background-color: rgba(82, 65, 225, 0.2);
			border-radius: 40rpx;
			margin-bottom: 10rpx;

			.place {
				display: inline-block;
				max-width: 160rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 12rpx;
				margin-left: 8rpx;
			}

			.time {
				margin-left: 12rpx;
			}
		}

		&-style {
			padding: 18rpx;
			background-color: #fff;
			border-radius: 20rpx;
			position: relative;

			&-header {
				display: flex;
				align-items: center;
				padding-bottom: 16rpx;

				.icon-image {
					width: 80rpx;
				}

				.right-wrapper {
					flex: 1;
					margin-left: 20rpx;
					overflow: hidden;

					.order-number {
						display: flex;
						align-items: center;
						margin-top: 10rpx;
						color: rgba(0, 0, 0, .45);
						font-size: 24rpx;

						.base-copy {
							line-height: 40rpx;
							padding: 0 10rpx;
						}
					}
				}
			}

			&-member {
				color: rgba(0, 0, 0, .45);
				display: flex;
				align-items: center;
				padding: 18rpx 0;
				line-height: 36rpx;

				.icon-image {
					width: 36rpx;
					border-radius: 50%;
				}

				.member-name {
					font-size: 24rpx;
					padding: 0 12rpx;
					max-width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.member-number {
					padding: 0 12rpx 0 26rpx;
					font-size: 24rpx;
					position: relative;
				}

				.member-number::before {
					background: rgba(0, 0, 0, .15);
					position: absolute;
					left: 0rpx;
					top: 50%;
					transform: translateY(-50%);
					content: "";
					display: inline-block;
					height: 28rpx;
					margin: 0 12rpx;
					width: 2rpx;
				}

				.base-copy {
					padding: 0 12rpx;
				}
			}

			&-quantity {
				line-height: 66rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				color: rgba(0, 0, 0, .65);
				font-size: 24rpx;

				.accout {
					color: rgba(0, 0, 0, .85);
					font-size: 30rpx;
					margin-left: 20rpx;
				}
			}

			&-button {
				align-items: center;
				display: flex;
				flex-direction: row-reverse;
				margin-top: 20rpx;
				font-size: 26rpx;
			}
		}

	}
</style>