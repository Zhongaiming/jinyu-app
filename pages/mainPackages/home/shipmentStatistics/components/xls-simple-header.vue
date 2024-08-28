<template>
	<view class="simple-header-wrapper">
		<view class="arrows-bottom text-over">
			<view class="value-wrap">
				<span>{{ params.date }}</span>
				<span class="point"></span>
				<span class="text-over">{{ params.pickerPlace }}&nbsp;</span>
			</view>
			<view class="arrow-down">
				<u-icon name="arrow-down" size="36" color="#c6c6c6" style="z-index: 9999" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			params: {
				type: Object,
				default: () => {
					return {}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.simple-header-wrapper {
		width: 100%;
		position: sticky;
		top: 0;
	}

	.allFixed {
		position: fixed;
		top: 48px;
		z-index: 9999;
	}

	.arrows-bottom {
		width: 100%;
		box-sizing: border-box;
		height: 88rpx;
		padding-left: 80rpx;
		font-size: 32rpx;
		color: #5241FF;
		@include center-flex();
		background: #fff;
		border-bottom: 1rpx solid #ddd;

		.value-wrap {
			flex: 1;
			@include center-flex();
			
			.point {
				margin: 0 10rpx;
				display: inline-block;
				width: 8rpx;
				height: 8rpx;
				background: #5241FF;
				border-radius: 50%;
			}
		}

		.arrow-down {
			width: 80rpx;
			@include center-flex();
		}
	}
</style>