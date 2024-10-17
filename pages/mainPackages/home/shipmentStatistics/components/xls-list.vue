<template>
	<view class="gift-content">
		<!-- 统计栏 -->
		<view class="giftCount">
			<view class="count-item">
				<p class="name">
					{{deviceType!= 4?"出礼数":"出货总计"}}
				</p>
				<p class="num">{{ giftCount.outPresentCount }}个</p>
			</view>
			<view class="count-item count" v-if="deviceType != 4">
				<p class="name">出礼比例</p>
				<p class="num">{{giftCount.outPresentRate?giftCount.outPresentRate+'/1':'0/0'}}</p>
			</view>
		</view>

		<!-- 列表栏 -->
		<view class="block-list" v-for="(place, dataIndex) in dataList" :key="dataIndex"
			v-if="place.deviceRailTypeVos.length">
			<view class="entry-block">
				<view class="block-hd">
					{{ $placeNameRule(place.placeName, place.placeNumber) }}
					<span class="font-size-30">(出礼{{ place.placeOutPresentCount }}个)</span>
				</view>
			</view>
			<view class="entry-list" v-for="(device, itemIndex) in place.deviceRailTypeVos"
				:key="$getUniqueKey(dataIndex, itemIndex)" :style="{margin:itemIndex>0?'10px 0 0 0':''}">
				<view class="dj-container">
					<view class="ndj-header" @click="changeNum(device, place.placeId)">
						<view class="info-row">
							<view class="field">
								{{ device.typeName }}{{ device.deviceNumber }}
								<span style="font-size: 14px"
									v-show="device.deviceOutPresentNum >= 0">(出礼{{ device.deviceOutPresentNum }}个)</span>
								<span v-if="device.moveState == 0" class="moveState">已转移</span>
							</view>
							<view class="sub-info" v-show="device.remark">
								备注：{{ device.remark }}
							</view>
						</view>

						<view class="arrow">
							<u-icon name="arrow-up" size="36" color="#d1d1d1" v-show="!device.closeOrshow" />
							<u-icon name="arrow-down" size="36" color="#d1d1d1" v-show="device.closeOrshow" />
						</view>
					</view>
					<view class="ndj-entry" v-for="(gift, giftIndex) in device.deviceRails"
						:key="$getUniqueKey(itemIndex, giftIndex)" v-show="device.closeOrshow">
						<view class="gift-setting-a" @click="goDetail(device, gift)">
							<view class="info-row">
								<view class="field">
									{{ gift.deviceNumber }}-{{ gift.shippingSpace }}/{{gift.railNumber}}
								</view>
								<view class="sub-info">
									商品：{{ gift.commodityName }}&nbsp;{{gift.price || "-"}}元
								</view>
							</view>
							<view class="arrow Center">
								<span style="color: #999" v-if="device.deviceType == 4">详情</span>
								<u-icon name="arrow-right" size="36" color="#d1d1d1" />
							</view>
						</view>
						<view class="detail-box">
							<view class="info-item">
								<view class="field-stat">合计投币</view>
								<view class="value-price">{{ gift.deviceCoinsCount }}个</view>
							</view>
							<view class="info-item">
								<view class="field-stat">商品价格</view>
								<view class="value-price">{{ gift.price || "-" }}元</view>
							</view>
							<view class="info-item">
								<view class="field-stat">出礼</view>
								<view class="value-price value-color">
									{{ gift.railOutPresentCount }}个
								</view>
							</view>
							<view class="info-item">
								<view class="field-stat">现有库存</view>
								<view class="value-price value-color">
									{{ gift.railRepertory }}个
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 售货机或出货详情 -->
		<u-popup :show="shjDetail" mode="bottom" @close="() => {
				shjDetail = false
			}">
			<view class="shj-detail-wrapper">
				<view class="shj-title">售货机出货详情</view>
				<view class="shj-entry" v-for="(item, index) in shjDetailList" :key="index">
					<view class="header">
						<view class="device-rail">
							{{ item.deviceNumber }}-1/{{ item.serialNumber }}
						</view>
						<view class="time-wrapper margin0">
							<view class="key">商品：</view>
							<view class="value">
								{{ item.commodityName }} &nbsp; {{ item.payPrice }}元
							</view>
						</view>
						<view class="time-wrapper margin0">
							<view class="key">订单号：</view>
							<view class="value">{{ item.orderNo }}</view>
						</view>
					</view>
					<view class="detail-box">
						<view class="info-item">
							<view class="field-stat">支付总额</view>
							<view class="value-price">{{ item.paySumPrice || "0.00" }}元</view>
						</view>
						<!-- <view class="info-item">
							<view class="field-stat">退款总额</view>
							<view class="value-price value-color">
								{{ item.refundSumPrice || "0.00" }}
							</view>
						</view> -->
						<view class="info-item">
							<view class="field-stat">购买数量</view>
							<view class="value-price">{{ item.payCount || "0" }}个</view>
						</view>
						<view class="info-item">
							<view class="field-stat">出货数量</view>
							<view class="value-price">{{ item.outPresentCount || "0" }}个</view>
						</view>
					</view>

					<view class="time-wrapper">
						<view class="key">购买时间：</view>
						<view class="value">{{ item.createTime }}</view>
					</view>
				</view>
				<xls-bottom v-if="shjDetailList.length" />
				<xls-empty v-else />
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		deviceDataController,
		shjController
	} from "@/api/index.js";
	export default {
		props: {
			deviceType: {
				type: String | Number,
				default: null
			},
			dataList: {
				type: Array,
				default: () => {
					return []
				}
			},
			giftCount: {
				type: Object,
				default: () => {
					return {}
				}
			},
			params: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				/** 售货机详情 */
				shjDetailList: [],
				shjDetail: false,
			}
		},
		methods: {
			goDetail(device, gift) {
				const params = {
					typeName: device.typeName,
					deviceNumber: gift.deviceNumber,
					shippingSpace: gift.shippingSpace,
					railNumber: gift.railNumber,
				}
				if (this.deviceType != 4 && device.deviceType != 4) {
					this.$goTo();
				} else {
					this.getShjDetail(gift.deviceNumber, gift.railNumber)
				}
			},
			/** 售货机货道详情 */
			async getShjDetail(deviceNumber, railNumber) {
				let res = await shjController.SHJRailDetails({
					startTime: `${this.params.startTime}`,
					endTime: `${this.params.endTime}`,
					railNumber,
					deviceNumber,
				});
				if (res.code == 200) {
					this.shjDetailList = res.data.reverse();
					this.shjDetail = true;
				}
			},
			//折叠或展示
			async changeNum(dev, placeId) {
				if (dev.closeOrshow) {
					this.$set(dev, "closeOrshow", false);
				} else {
					this.$set(dev, "closeOrshow", true);
				}
				if (!dev.deviceRails) {

					let res = await deviceDataController.outPresentDeviceList({
						startTime: this.params.startTime,
						endTime: this.params.endTime,
						placeId: placeId,
						deviceNumber: dev.deviceNumber,
						type: this.deviceType == 4 ? 2 : null,
					});
					if (res.code == 200) {
						if (res.data.length) {
							this.$set(dev, "deviceRails", res.data);
						} else {
							this.$toast("该设备暂无数据~");
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.gift-content {
		margin-top: 10px;
		padding: 0 10px;
		padding-top: 406rpx;

		.giftCount {
			padding: 21px 0;
			height: 98px;
			box-sizing: border-box;
			background: #5241ff;
			border-radius: 4px;
			display: flex;
			align-items: center;

			.count {
				border-left: 1px solid #fff;
			}

			.count-item {
				flex: 1;

				.name {
					font-size: 14px;
					color: #fff;
					text-align: center;
				}

				.num {
					margin-top: 7px;
					font-size: 20px;
					color: #fff;
					text-align: center;
					font-weight: 700;
				}
			}

			p {
				padding: 0;
				margin: 0;
			}
		}

		.block-list {
			margin-top: 7px;

			.entry-block {
				.block-hd {
					padding: 11px 10px 7px 0;
					font-size: 19px;
					color: rgba(0, 0, 0, 0.8);
					font-weight: 700;
					line-height: 1.1;

					.font-size-30 {
						font-size: 15px;
					}
				}
			}

			.entry-list {
				.dj-container {
					padding-bottom: 15px;
					background: #fff;
					border-radius: 4px;

					.ndj-header {
						padding: 10px 0px 10px 0px;
						margin: 0 10px 10px 10px;
						border-bottom: 1px solid #e5e5e5;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}

					.info-row {
						.field {
							font-size: 17px;
							color: #000;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.sub-info {
							font-size: 13px;
							color: #666;
						}
					}

					.ndj-entry {
						margin: 5px 10px 15px 10px;
						border: 1px solid #e5e5e5;
						border-radius: 4px;

						.gift-setting-a {
							padding: 10px;
							display: flex;
							align-items: center;
							justify-content: space-between;
						}

						.detail-box {
							margin: 0 10px;
							border-top: 1px solid #e5e5e5;
							display: flex;
							flex-wrap: wrap;
							padding: 10px 0;

							.info-item {
								padding: 0 4px;
								text-align: center;
								width: 25%;
								margin-bottom: 10px;
								box-sizing: border-box;

								.field-stat {
									font-size: 13px;
									color: rgba(0, 0, 0, 0.6);
								}

								.value-price {
									padding-top: 2px;
									font-size: 15px;
								}

								.value-color {
									color: #5241ff;
								}
							}

							.info-item:not(:last-child) {
								border-right: 1px solid #e5e5e5;
							}
						}
					}
				}
			}
		}
	}

	.moveState {
		padding: 2px 5px;
		display: inline-block;
		border-radius: 4px;
		background: #ff4343;
		font-size: 13px;
		color: #fff;
		margin: 0 10px;
	}

	/** 售货机详情 */
	.shj-detail-wrapper {
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;
		position: relative;
		overflow-y: auto;

		.shj-title {
			line-height: 44px;
			text-align: center;
			font-size: 16px;
			font-weight: 700;
			position: sticky;
			top: 0;
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
		}

		.shj-entry {
			margin: 5px 10px 15px 10px;
			border: 1px solid #e5e5e5;
			border-radius: 4px;

			.header {
				margin: 0 10px;
				padding: 6px 0;

				.device-rail {
					color: #000;
					font-size: 15px;
				}
			}

			.detail-box {
				margin: 0 10px 5px;
				border-top: 1px solid #e5e5e5;
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				flex-wrap: wrap;
				padding: 10px 0;

				.info-item {
					padding: 0 4px;
					text-align: center;
					// width: 25%;
					flex: 1;
					box-sizing: border-box;

					.field-stat {
						font-size: 12px;
						color: rgba(0, 0, 0, 0.6);
					}

					.value-price {
						padding-top: 2px;
						font-size: 14px;
					}

					.value-color {
						color: #ff4343;
					}
				}

				.info-item:not(:last-child) {
					border-right: 1px solid #e5e5e5;
				}
			}

			.time-wrapper {
				font-size: 12px;
				color: #666;
				margin: 0 10px;
				display: flex;
				align-items: center;
				margin-bottom: 5px;

				.key {
					width: 62px;
				}

				.value {
					flex: 1;
				}
			}

			.margin0 {
				margin: 0;
			}
		}
	}
</style>