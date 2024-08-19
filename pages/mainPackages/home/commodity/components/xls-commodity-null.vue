<template>
	<view class="xls-commodity">
		<image :src="`${$baseUrl}appV4/commodity/undefine.png`" alt="" class="xls-commodity-image-null"
			mode="widthFix" />
		<view class="text">你还没有添加商品，快来添加一次吧</view>
		<view class="btn" @click="goTo()" v-hasPermi="['app:shj:commodity:add']">
			<image :src="`${$baseUrl}appV4/common/add-icon.png`" alt="" mode="widthFix" class="image" />
			<view>添加商品</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goTo() {
				this.$emit('goTo');
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-commodity {
		width: 100%;
		background: #f6f6f6;
		text-align: center;

		&-image-null {
			width: 440rpx;
		}

		.text {
			font-size: 26rpx;
			color: rgb(175, 166, 166);
			padding-top: 16rpx;
			padding-bottom: 24rpx;
		}

		.btn {
			background: #5241ff;
			width: 440rpx;
			border-radius: 50rpx;
			line-height: 72rpx;
			font-size: 28rpx;
			@include center-flex();
			color: #fff;
			margin: 0 auto;

			.image {
				width: 40rpx;
				margin-right: 12rpx;
			}
		}
	}
</style>