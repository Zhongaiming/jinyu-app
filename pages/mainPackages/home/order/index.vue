<template>
	<z-paging ref="orderPaging" v-model="dataList" @query="queryList" auto-show-back-to-top
		back-to-top-img="/static/back.png">
		<view slot="top">
			<xls-order-screen-vue @getCondition="getCondition" :screen="params"></xls-order-screen-vue>
		</view>
		<view class="xls-order-list">
			<view v-for="(item, index) in dataList" :key="index" class="xls-order-list-item">
				<view class="xls-order-header">
					<view class="xls-order-place text-over">
						<u-icon name="map" color="#5241ff" size="24"></u-icon>
						<text class="place">{{item.placeName}}</text>
						<text>|</text>
						<text class="time">{{item.createTime}}</text>
					</view>

					<view class="xls-order-place refund-price text-over"
						v-if="item.amountRefund && item.refundState == 1">
						<text class="time">已退 ¥{{$formatAmount(item.amountRefund)}}</text>
					</view>
				</view>

				<view class="xls-order-style">
					<view class="xls-order-style-header">
						<xls-image class="icon-image"
							:src="`${$baseUrl}appV4/common/${item.payType==0?'wechat':'pay'}.png`" mode="widthFix">
						</xls-image>
						<view class="right-wrapper">
							<view class="device-style">
								<text> {{ deviceTypeDict[item.deviceType] }}{{ item.deviceNumber }}</text>
								<!-- 交易状态 -->
								<text class="state"
									:style="[{color: stateColorDict[item.state]}]">{{stateDict[item.state]}}</text>
							</view>
							<view class="order-number">
								<text>{{ item.orderNo }}</text>
								<view class="base-copy" @click="copyEvent(item.orderNo)">
									<svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
										<path
											d="M810.667 85.333a128 128 0 0 1 127.786 120.491l.214 7.51V640a128 128 0 0 1-120.491 127.787l-7.51.213H768v42.667a128 128 0 0 1-120.49 127.786l-7.51.214H213.333a128 128 0 0 1-128-128V384a128 128 0 0 1 128-128H256v-42.667A128 128 0 0 1 376.49 85.547l7.51-.214h426.667zM640 341.333H213.333A42.667 42.667 0 0 0 170.667 384v426.667a42.667 42.667 0 0 0 42.666 42.666H640a42.667 42.667 0 0 0 42.667-42.666V384A42.667 42.667 0 0 0 640 341.333zm170.667-170.666H384a42.667 42.667 0 0 0-42.368 37.674l-.299 4.992V256H640a128 128 0 0 1 127.787 120.49L768 384v298.667h42.667a42.667 42.667 0 0 0 42.368-37.675l.298-4.992V213.333a42.667 42.667 0 0 0-37.674-42.368l-4.992-.298z">
										</path>
									</svg>
								</view>
							</view>
							<view class="label-style">
								<!-- 交易类型 -->
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
						<image class="icon-image" :src="item.url" mode="widthFix" v-if="item.url"></image>
						<image class="icon-image" :src="`${$baseUrl}appV4/common/wechat.png`" mode="widthFix" v-else>
						</image>
						<text class="member-name">{{ item.memberName || "***" }}</text>
						<text class="member-number">ID:{{ item.memberNumber }}</text>
						<view class="base-copy" @click="copyEvent(item.memberNumber)">
							<svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
								<path
									d="M810.667 85.333a128 128 0 0 1 127.786 120.491l.214 7.51V640a128 128 0 0 1-120.491 127.787l-7.51.213H768v42.667a128 128 0 0 1-120.49 127.786l-7.51.214H213.333a128 128 0 0 1-128-128V384a128 128 0 0 1 128-128H256v-42.667A128 128 0 0 1 376.49 85.547l7.51-.214h426.667zM640 341.333H213.333A42.667 42.667 0 0 0 170.667 384v426.667a42.667 42.667 0 0 0 42.666 42.666H640a42.667 42.667 0 0 0 42.667-42.666V384A42.667 42.667 0 0 0 640 341.333zm170.667-170.666H384a42.667 42.667 0 0 0-42.368 37.674l-.299 4.992V256H640a128 128 0 0 1 127.787 120.49L768 384v298.667h42.667a42.667 42.667 0 0 0 42.368-37.675l.298-4.992V213.333a42.667 42.667 0 0 0-37.674-42.368l-4.992-.298z">
								</path>
							</svg>
						</view>
					</view>

					<view class="xls-order-style-price" @click="goTo(item, 'orderDetail')">
						<xls-image class="order-icon-image" :src="`${$baseUrl}appV4/common/orderlist.png`"
							mode="widthFix"></xls-image>
						<view class="price-center">
							{{ $formatAmount(item.shopPrice) }}元 {{ item.commodityName }}
						</view>
						<view class="price-right">
							¥{{ $formatAmount(item.totalReceivables) }}
						</view>
					</view>

					<view class="xls-order-style-quantity">
						<view class="number">
							共1件商品
						</view>
						<view class="accout">
							付款：¥{{ $formatAmount(item.bankCardAmount) }}
						</view>
					</view>

					<u-line hairline></u-line>

					<view class="xls-order-style-refund-reason" v-if="item.hasOwnProperty('refundType')">
						{{refundDict[item.refundType]}}
					</view>

					<view class="xls-order-style-refund-reason" v-if="item.hasOwnProperty('remark')">
						<text class="text">{{item.remark}}</text>
					</view>

					<view class="xls-order-style-refund-reason" v-if="item.hasOwnProperty('amountCoupon')">
						<!-- {{amountCouponTypeDict[item.amountCouponType]}} -->
						<text class="text">活动：{{item.couponName}}，优惠：¥{{$formatAmount(item.amountCoupon)}}</text>
					</view>

					<view class="xls-order-style-button">
						<!-- <view class="button">
							派发福利
						</view> -->
						<view class="button" @click="goTo(item, 'orderDetail')">
							查看详情
						</view>
						<view class="button" @click="goTo(item, 'remote')">
							远程启动
						</view>
						<view class="button" @click="goTo(item, 'orderRefund')" v-if="!item.amountRefund">
							退款
						</view>
					</view>
				</view>
			</view>
		</view>
		<xls-empty slot="empty"></xls-empty>
	</z-paging>
</template>

<script>
	import {
		orderController,
		deviceController
	} from '@/api/index.js';
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import xlsOrderScreenVue from './components/xls-order-screen.vue';
	import {
		mapState
	} from "vuex";
	export default {
		components: {
			xlsOrderScreenVue
		},
		computed: {
			...mapState('config', [
				'typeDict',
				'stateDict',
				'stateColorDict',
				'refundDict',
				'amountCouponTypeDict',
			])
		},
		data() {
			return {
				deviceTypeDict: {},
				dataList: [],
				params: {
					startTime: getDateAll(0),
					endTime: getDateAll(0),
				},
				payTypeDict: {
					0: 'wechat',
					1: 'pay',
				},
				type: {
					1: '充值余币',
					2: '设备启动',
					3: '余币购买',
					4: '余额购买',
					5: '充值余额',
				},
			}
		},
		onLoad(option) {
			this.getDeviceTypeList();
		},
		onShow() {
			this.$nextTick(() => {
				if (this.$refs.orderPaging) {
					this.$refs.orderPaging.refresh();
				}
			})
		},
		methods: {
			getCondition(params) {
				this.params = params;
				this.$refs.orderPaging.reload(true);
			},
			getDeviceTypeList() {
				deviceController.getDeviceTypeLists().then(res => {
					res.data.forEach(item => {
						this.deviceTypeDict[item.id] = item.typeName
					})
				})
			},
			queryList(pageNo, pageSize) {
				this.$loading();
				orderController.getOrderList({
					page: pageNo,
					size: pageSize,
					...this.params
				}).then(res => {
					this.$hideLoading();
					this.$refs.orderPaging.complete(res.data.dataList);
				})
			},
			goTo(order, route) {
				if (route === 'remote') {
					this.$goTo("/pages/mainPackages/home/remote/operate", "navigateTo", {
						railNumber: order.railNumber,
						shippingSpace: order.shippingSpace,
						deviceNumber: order.deviceNumber,
						deviceTypeId: order.deviceType
					})
					return
				}
				this.$goTo(`/pages/mainPackages/home/order/${route}`, 'navigateTo', {
					orderId: order.orderId
				})
			},
			copyEvent(copyValue) {
				// 手动创建 textarea 标签
				const textarea = document.createElement("textarea");
				// 将该 textarea 设为 readonly禁止输入 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
				textarea.readOnly = "readonly";
				textarea.style.position = "absolute";
				textarea.style.left = "-9999px";
				// 将要 copy 的值赋给 textarea 标签的 value 属性
				textarea.value = copyValue;
				// 将 textarea 插入到 body 中
				document.body.appendChild(textarea);
				// 选中值并复制
				textarea.select();
				document.execCommand("Copy");
				document.body.removeChild(textarea);
				this.$toast("复制成功");
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';


	.xls-order-list {
		padding: 20rpx 24rpx;

		&-item {
			margin-bottom: 24rpx;
		}
	}

	.xls-order-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.xls-order-place {
		font-size: 18rpx;
		color: #5241ff;
		display: flex;
		align-items: center;
		padding: 5rpx 16rpx;
		background-color: rgba(131, 120, 255, 0.2);
		border-radius: 40rpx;

		.place {
			display: inline-block;
			max-width: 140rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-right: 12rpx;
			margin-left: 8rpx;
		}

		.time {
			width: 180rpx;
			margin-left: 12rpx;
		}
	}

	.refund-price {
		width: 140rpx;
		color: #f5222d;
		background-color: #ffe8ea;
	}

	.xls-order-style {
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

		&-refund-reason {
			margin-top: 24rpx;
			color: #ff8c19;
			font-size: 28rpx;
			height: 64rpx;
			line-height: 64rpx;
			background: #fff7e6;
			border-radius: 4rpx;
			text-align: center;

			.text {
				display: inline-block;
				max-width: 600rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>