<template>
	<!-- 设备绑定 合法规范 -->
	<u-popup :show="downloadNorm" mode="center">
		<view class="container-wrapper">
			<view class="legal-wrapper">
				<image :src="`${$baseUrl}appV4/remoteBoot/legal-norm.png`" alt="" class="legal" mode="widthFix" />
			</view>
			<view class="confirm">
				<image :src="`${$baseUrl}appV4/remoteBoot/confirm-btn.png`" alt="" class="image" mode="widthFix"
					@click="goTo" />
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				downloadNorm: false,
			};
		},
		methods: {
			goTo() {
				this.$emit('getDeviceInfoTwo')
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container-wrapper {
		width: 100vw;
		height: 100vh;
		background: #fff;
		padding: 24rpx 40rpx;
		box-sizing: border-box;
		max-width: 750rpx;
		display: flex;
		flex-direction: column;
		position: relative;

		.legal-wrapper {
			flex: 1;

			.legal {
				width: 100%;
			}
		}

		.confirm {
			position: absolute;
			bottom: 24rpx;
			left: 0;
			padding: 0rpx 40rpx;
			width: 100%;
			
			.image {
				width: 100%;
			}
		}
	}
</style>