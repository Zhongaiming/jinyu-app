<template>
	<view>
		<xls-jy-navbar title="近30次上线、离线时间点" bgColor="#5241FF" :titleStyle="{color: '#fff'}"></xls-jy-navbar>
		<view class="blue-bg"></view>
		<view class="xls-online-record-content">
			<view class="device-current-status">
				<view class="top-floor">设备当前运行状态</view>
				<view class="bottom-content">
					<view class="device-name">
						<text>{{ deviceTypeInfo.typeName }}</text>
						<text>{{ deviceTypeInfo.deviceNumber }}</text>
					</view>
					<view class="status-content" v-if="!deviceTypeInfo.onlineState">
						<text>离线</text>
						<view class="state-icon">
							<u-icon name="wifi-off" color="#ff4747" size="50"></u-icon>
						</view>
					</view>
					<view class="status-content" v-else>
						<text style="color: #15d193" class="state-txt">在线</text>
						<view class="state-icon">
							<u-icon name="wifi" color="#15d193" size="50"></u-icon>
						</view>
					</view>
					<view class="replay" @click="getLinestate">
						<u-icon name="reload" color="#5241FF" size="50"></u-icon>
					</view>
				</view>
			</view>
			
			<view class="record">
				<view class="title">设备运行记录</view>
				<view v-if="deviceInfo.onlineList && deviceInfo.onlineList.length != 0">
					<view class="record-item" v-for="line in deviceInfo.onlineList" :key="line.id">
						<view class="top-detail" v-if="!line.type">
							<view class="left">离线时长--{{ line.dateLong }}</view>
							<!-- (截至当前时间) -->
							<view class="right">
								<text class="offLine">离线</text>
								<u-icon name="wifi-off" color="#ff4747" size="50"></u-icon>
							</view>
						</view>
						<view class="top-detail" v-else>
							<view class="left">在线时长--{{ line.dateLong }}</view>
							<view class="right">
								<text class="onLine">在线</text>
								<u-icon name="wifi" color="#15d193" size="50"></u-icon>
							</view>
						</view>
						<view class="bottom-time">{{ line.createTime }}</view>
					</view>
				</view>
				
				<view class="nothing" v-else>
					<xls-image :src="`${$baseUrl}appV4/img/null-data.png`" alt="" class="img"/>
					<text class="text">“尬”无数据</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDuring
	} from "@/plugins/formUtils";
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				deviceTypeInfo: [],
				deviceInfo: [],
			};
		},
		onLoad(option) {
			if(option.params) {
				const {deviceInfo} = JSON.parse(option.params)
				this.deviceTypeInfo = deviceInfo;
				this.getList();
			}
		},
		methods: {
			getList() {
				this.$loading();
				deviceController.getOnlineList({
						page: 1,
						size: 30,
						deviceNumber: this.deviceTypeInfo.deviceNumber,
					})
					.then((res) => {
						this.$hideLoading();
						if (res.code == 200) {
							this.deviceInfo = res.data;
							this.deviceInfo.onlineList.forEach((element) => {
								this.$set(element, "dateLong", formatDuring(element.duration));
							});
						}
					})
					.catch((err) => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.blue-bg {
		height: 48px;
		background: #5241FF;
	}
	.device-current-status {
		padding: 24rpx;
		background: #fff;
		border-radius: 8px;
		
	
		.top-floor {
			color: #333;
			font-size: 14px;
			font-weight: 700;
		}
	
		.bottom-content {
			display: flex;
			align-items: center;
			margin-top: 12px;
	
			.device-name {
				color: #333;
				font-size: 15px;
			}
	
			.status-content {
				flex: 1;
				align-items: center;
				display: flex;
				font-size: 14px;
				color: #ff4747;
				justify-content: flex-end;
	
				.state-icon {
					padding-left: 8px;
				}
			}
	
			.replay {
				padding-left: 12px;
				display: inline-block;
			}
		}
	}

	.xls-online-record-content {
		padding: 0 24rpx;
		position: relative;
		top: -28px;

		.record {
			margin-top: 24rpx;
			background: #fff;
			border-radius: 8px;

			.title {
				padding: 12px;
				font-size: 14px;
				font-weight: 700;
			}

			.record-item {
				font-size: 13px;
				font-weight: 400;
				padding: 12px;

				.top-detail {
					align-items: center;
					color: #333;
					display: flex;
					justify-content: space-between;

					.left {
						display: flex;
						justify-content: space-between;
					}

					.right {
						color: #ff4747;
						display: flex;
						align-items: center;

						.offLine {
							padding-right: 8px;
						}

						.onLine {
							color: #15d193;
							padding-right: 8px;
						}
					}
				}

				.bottom-time {
					color: #999;
					font-size: 11px;
					font-weight: 400;
					margin-top: 4px;
				}
			}

			.record-item:not(:last-child) {
				border-bottom: 1px solid #f5f5f5;
			}

			.nothing {
				margin: 0 auto;
				text-align: center;
				margin-top: 58px;
				padding-bottom: 58px;

				.img {
					width: 158px;
				}

				.text {
					font-size: 14px;
					padding-top: 15px;
					display: block;
				}
			}
		}
	}

	
</style>