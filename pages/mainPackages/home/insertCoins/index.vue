<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<view slot="top">
			<jy-navbar title="合计投币"></jy-navbar>
			<view class="text-place">
				<span>共{{ allCount.placeNum || 0 }}个场地</span>,
				<span>{{ allCount.insertedCoinsPlaceNum || 0 }}个产生投币记录</span>
			</view>
		</view>
		
		<view v-for="(item, index) in dataList" :key="index" class="xls-list-item">
			<view class="body-wrapper" @click="closeOrshow(item.placeId)">
				<view class="body-main">
					<view class="main-place-name">{{ item.placeName }}</view>
					<view class="main-device-num">{{ item.deviceNum }}台</view>
					<view class="main-icon">
						<u-icon name="arrow-right" size="32" color="#5241FF" />
					</view>
				</view>
			</view>

			<view class="body-bottom">
				<view class="coins-num">
					合计投币
					<span class="count-txt text-over">{{ item.insertCoinsNum }}</span>
					个
				</view>
				<view class="online-coins">
					<view class="coins-num">
						<span class="online-txt">线上</span>
						<span class="count-txt text-over">{{
				        item.onlineInsertCoinsNum
				      }}</span>
					</view>
					<view class="line"></view>
					<view class="coins-num">
						<span class="online-txt">线下</span>
						<span class="count-txt text-over">{{
				        item.offlineInsertCoinsNum
				      }}</span>
					</view>
				</view>
			</view>
		</view>

		<xls-empty slot="empty" />

		<!-- 弹出层 -->
		<u-popup :show="detailPopup" mode="bottom" @close="detailPopup = !detailPopup">
			<view class="detail-content">
				<view class="place-coin-wrapper">
					<view class="main-text-box">
						<view @click="detailPopup = !detailPopup">返回</view>
						<view>场地投币情况</view>
					</view>
				</view>
				<view class="body-place-name">{{ placeInfoDetail.placeName }}</view>
				<view class="item-text-title">
					<view class="item-content-wrapper">
						<view class="device-t-w">设备</view>
						<view class="three-title-wrapper">线上投币</view>
						<view class="three-title-wrapper">线下投币</view>
						<view class="three-title-wrapper">合计</view>
					</view>
				</view>

				<view class="item-content">
					<view class="item" v-for="(item, index) in placeInfoDetail.deviceInsertCoinsInfoList" :key="index">
						<view class="item-c-text-w">
							<view class="box-top-text">
								<view>
									<!-- <view>-号机</view> -->
									<view>{{ item.typeName }}{{ item.deviceNumber }}</view>
								</view>
							</view>
							<view class="box-one-style">{{ item.onlineInsertCoinsNum }}</view>
							<view class="box-one-style">
								{{ item.offlineInsertCoinsNum }}
							</view>
							<view class="box-one-style">{{ item.insertCoinsNum }}</view>
						</view>
					</view>
					<xls-empty v-if="!placeInfoDetail.deviceInsertCoinsInfoList" />
				</view>
			</view>
		</u-popup>

	</z-paging>
</template>

<script>
	import {
		orderController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				dataList: [],
				allCount: {},
				detailPopup: false,
				placeInfoDetail: [{}],
			}
		},
		onLoad() {
			this.getCoinsPlaceNum();
		},
		methods: {
			getCoinsPlaceNum() {
				orderController.getInsertCoinsPlaceNum().then(res => {
					this.allCount = res.data;
				})
			},
			// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用this.$refs.paging.reload()即可
			queryList(pageNo, pageSize) {
				orderController.getInsertCoinsInfoList({
					page: pageNo,
					size: pageSize,
				}).then(res => {
					this.$refs.paging.complete(res.data.dataList);
				})
			},
			closeOrshow(placeId) {
				orderController.getDeviceInsertCoins({ placeId }).then((res) => {
				  this.placeInfoDetail = res.data;
				  this.detailPopup = !this.detailPopup;
				})
				.catch((err) => {});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.text-place {
		padding: 24rpx 24rpx 20rpx;
		font-size: 26rpx;
		opacity: 0.8;
	}


	.xls-list-item:not(:last-child) {
		margin-bottom: 24rpx;
	}

	.xls-list-item {
		.body-wrapper {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			background: #fff;
			border-bottom: 2rpx solid rgba(216, 212, 212, 0.5);

			.body-main {
				width: 95%;
				height: 100rpx;
				display: flex;
				align-items: center;

				.main-place-name {
					flex: 1;
					height: 100rpx;
					font-size: 32rpx;
					display: flex;
					align-items: center;
					padding-right: 16rpx;
				}

				.main-device-num {
					height: 100rpx;
					font-size: 32rpx;
					color: #5241FF;
					line-height: 100rpx;
				}

				.main-icon {
					margin-left: 12rpx;
					height: 100rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					img {
						width: 28rpx;
						opacity: 0.7;
					}
				}
			}
		}

		.body-bottom {
			padding-left: 20rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			background: #fff;
			font-size: 26rpx;

			.online-coins {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.line {
					height: 36rpx;
					width: 2rpx;
					background: #e6e6e6;
					margin-right: 10rpx;
				}
			}

			.coins-num {
				line-height: 80rpx;
				display: flex;
				align-items: center;
			}

			.online-txt {
				color: #8c8c8c;
				font-size: 26rpx;
				font-weight: 400;
			}

			.count-txt {
				display: inline-block;
				max-width: 124rpx;
				padding: 0 12rpx;
			}
		}
	}


	.detail-content {
		width: 100%;
		max-height: 1000rpx;
		height: 60vh;
		overflow-y: auto;
		display: flex;
		flex-direction: column;

		.place-coin-wrapper {
			height: 100rpx;
			width: 100%;
			border-bottom: 2rpx solid rgba(216, 212, 212, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;

			.main-text-box {
				height: 50rpx;
				width: 95%;
				display: flex;

				:nth-child(1) {
					width: 25%;
					height: 50rpx;
					color: #5241FF;
					font-size: 32rpx;

					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

				:nth-child(2) {
					width: 50%;
					height: 25%;
					font-size: 32rpx;

					justify-content: center;
					align-items: center;
					text-align: center;
				}
			}
		}

		.body-place-name {
			color: #262626;
			font-size: 32rpx;
			font-weight: 700;
			line-height: 44rpx;
			padding: 28rpx 24rpx 0;
			word-break: break-word;
		}

		.item-text-title {
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: center;
			background: #F5F6F7;
			font-size: 28rpx;

			.item-content-wrapper {
				width: 95%;
				height: 90rpx;
				display: flex;

				.device-t-w {
					width: 40%;
					height: 90rpx;
					display: flex;
					align-items: center;
					justify-content: flex-start;
				}

				.three-title-wrapper {
					width: 20%;
					height: 90rpx;
					display: flex;
					align-items: center;
					justify-content: flex-start;
				}
			}
		}

		.item-content {
			flex: 1;
			overflow-y: auto;
		}

		.item {
			width: 100%;
			height: 130rpx;
			display: flex;
			justify-content: center;
			font-size: 28rpx;
			border-bottom: 2rpx solid rgba(216, 212, 212, 0.5);

			.item-c-text-w {
				width: 95%;
				height: 130rpx;
				display: flex;

				.box-top-text {
					width: 40%;
					height: 130rpx;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					font-size: 30rpx;
					font-weight: 500;
				}

				.box-one-style {
					width: 20%;
					height: 130rpx;
					display: flex;
					align-items: center;
					justify-content: flex-start;
				}
			}
		}
	}
</style>