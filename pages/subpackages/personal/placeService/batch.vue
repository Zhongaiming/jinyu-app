<template>
	<view class="place-set-service">
		<xls-jy-navbar title="场地客服设置"></xls-jy-navbar>
		<view class="cs-wechat-select">
			<view class="select-btn" v-show="serviceList.length">
				<span class="title">目前正在使用的客服微信</span>
				<u-icon name="plus-circle" color="#5241FF" size="40" @click="chilrenServcielist" />
				<span class="text" @click="chilrenServcielist">选择客服</span>
			</view>
			<view class="cs-list" v-show="serviceList.length">
				<view class="cs-item" v-for="(item, index) in serviceList" :key="index">
					<view class="left-txt">
						<view class="cs-name">
							{{ item.name }}
							<view class="isDefault" v-show="item.defaultCustomerService == 1">
								默认
							</view>
						</view>
						<view class="cs-phone">{{ item.phone }}</view>
					</view>
					<view class="right-icon">
					</view>
				</view>
				<xls-bottom></xls-bottom>
			</view>
			<view v-show="!serviceList.length">
				<xls-empty></xls-empty>
				<view class="no-data-btn Center" @click="chilrenServcielist">
					<u-icon name="plus-circle" color="#5241FF" size="40" />
					<span class="text">选择客服</span>
				</view>
			</view>
		</view>
		<service-multi-select ref="service" @getServiceId="getServiceId" />
	</view>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";
	import ServiceMultiSelect from "./components/ServiceMultiSelect.vue";
	export default {
		components: {
			ServiceMultiSelect
		},
		data() {
			return {
				serviceList: [],
				staffIdList: [],
				params: {},
			};
		},
		onLoad(option) {
			this.params = {};
			if (option.params) {
				this.params = JSON.parse(option.params);
			}
			this.getPlaceService();
		},
		methods: {
			async getPlaceService() {
				let res = await placeController.getPlaceStaffInfoList({
					placeId: this.params.placeId,
				});
				if (res.code == 200) {
					this.serviceList = res.data;
					let arr = res.data.map((item) => item.id).join(",");
					this.$refs.service.defaultChecked(arr);
				}
			},
			//set
			async setService() {
				let res = await placeController.updatePlaceStaffList({
					placeId: this.params.placeId,
					staffIdList: this.staffIdList,
				});
				if (res.code == 200) {
					this.$toast("添加成功");
					this.$goBack();
				}
			},
			//展示
			chilrenServcielist() {
				this.$refs.service.showService();
			},
			//选中
			async getServiceId(arrId) {
				this.staffIdList = arrId;
				if (this.staffIdList.length) {
					this.$modal(`您已选中${this.staffIdList.length}个客服，请按确定按钮完成设置~`, {
							confirmText: "确定",
						})
						.then(() => {
							this.setService();
						})
						.catch(() => {});
				} else {
					this.$modal(`您确定要删除该场地的所有客服吗？`, {
							confirmText: "删除",
							confirmColor: "#e94545",
						})
						.then(() => {
							this.setService();
						})
						.catch(() => {});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.place-set-service {
		width: 100%;
		font-family: PingFang SC;
	}

	.footer {
		background: #fff;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		position: fixed;
		box-sizing: border-box;
		padding: 12rpx 24rpx 16rpx;

		.bottom-btn {
			align-items: center;
			background: #5241FF;
			border-radius: 16rpx;
			color: #fff;
			display: inline-flex;
			font-size: 32rpx;
			height: 88rpx;
			justify-content: center;
			width: 100%;
		}
	}

	.cs-wechat-select {
		padding: 0 24rpx 160rpx;

		.select-btn {
			display: flex;
			align-items: center;
			padding: 24rpx 0;
			font-size: 28rpx;
			line-height: 36rpx;

			.title {
				flex: 1;
			}

			.text {
				margin-left: 12rpx;
				color: #5241FF;
			}
		}

		.cs-list {
			.cs-item {
				background: #fff;
				border-radius: 16rpx;
				display: flex;
				align-items: center;
				margin-top: 16rpx;
				padding: 24rpx;
				position: relative;

				.left-txt {
					flex: 1;

					.cs-name {
						font-size: 32rpx;
						font-weight: 700;
						color: #333;
						display: flex;
						align-items: center;

						.isDefault {
							margin-left: 12rpx;
							padding: 2rpx 16rpx;
							border-radius: 8rpx;
							background: #F5F6F7;
							color: #5241FF;
							font-size: 24rpx;
							font-family: PingFangSC;
						}
					}

					.cs-phone {
						color: #999;
						font-size: 24rpx;
						margin-top: 12rpx;
					}
				}

				.right-icon {
					display: flex;
					align-items: center;
					padding-left: 24rpx;

					.down-icon {
						transform: rotate(180deg);
					}

					.line {
						background: #e6e6e6;
						display: inline-block;
						height: 32rpx;
						margin: 0 20rpx;
						width: 2rpx;
					}
				}

				.disable {
					pointer-events: none;
					opacity: 0.5;
				}
			}
		}
	}

	.no-data-btn {
		border: 1rpx solid #5241FF;
		border-radius: 16rpx;
		padding: 16rpx 0;
		width: 296rpx;
		margin: 40rpx auto;

		.text {
			color: #5241FF;
			font-family: PingFangSC;
			font-size: 28rpx;
			margin-left: 16rpx;
		}
	}
</style>