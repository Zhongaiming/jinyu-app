<template>
	<view class="tips-error">
		<view class="mui-ellipsis">
			<image :src="`${$baseUrl}appV4/remoteBoot/tips-error.png`" alt="" mode="widthFix" class="img"/>
			<span>该设备已注册！</span>
		</view>
		<view class="info-content">
			<view class="item-cell">
				<view>商户账号</view>
				<view class="right-value">
					{{ deviceInfo.userPhone }}({{ deviceInfo.nickName }})
				</view>
			</view>
			<view class="item-cell">
				<view>设备类型</view>
				<view class="right-value">{{ deviceInfo.typeName }}</view>
			</view>
			<view class="item-cell">
				<view>设备唯一码</view>
				<view class="right-value">{{ deviceInfo.uuid }}</view>
			</view>
			<view class="item-cell">
				<view>编号</view>
				<view class="right-value">{{ deviceInfo.deviceNumber }}</view>
			</view>
			<view class="item-cell">
				<view>场地</view>
				<view class="right-value">{{ deviceInfo.placeName }}</view>
			</view>
			<view class="item-cell">
				<view>详细地址</view>
				<view class="right-value">
					{{ deviceInfo.city }}{{ deviceInfo.placeDetails }}
				</view>
			</view>
		</view>
		<view class="btn-content">
			<view class="btn primary" @click="$router.back()">添加注册设备</view>
			<view class="btn default" @click="$router.replace('/home')">返回首页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deviceInfo: {},
			};
		},
		onLoad(option) {
			if (option.params) {
				this.deviceInfo = JSON.parse(option.params).deviceInfo;
			}
		},
	};
</script>

<style lang="scss" scoped>
	.tips-error {
		font-size: 32rpx;

		.mui-ellipsis {
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;

			.img {
				width: 107rpx;
				margin-right: 20rpx;
			}
		}

		.info-content {
			background-color: #fff;
			border-top: 1rpx solid #e1e0e6;
			border-bottom: 1rpx solid #e1e0e6;
			padding-left: 24rpx;

			.item-cell {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 24rpx 20rpx 0;

				.right-value {
					flex: 1;
					text-align: right;
					color: rgba(0, 0, 0, 0.4);
					font-size: 28rpx;
				}
			}

			.item-cell:not(:last-child) {
				border-bottom: 1rpx solid #e1e0e6;
			}
		}

		.btn-content {
			padding: 40rpx 30rpx;

			.btn {
				padding-top: 22rpx;
				padding-bottom: 22rpx;
				text-align: center;
				border-radius: 10rpx;
			}

			.primary {
				color: #fff;
				background-color: #04be02;
			}

			.default {
				color: #000;
				background-color: #fff;
				margin-top: 30rpx;
			}
		}
	}
</style>