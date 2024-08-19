<template>
	<view class="xls-p-botn" v-hasPermi="['app:shopType:index:add']">
		<view class="xls-p-botn-main" @click="goTo">
			<view class="btn">
				<image :src="`${$baseUrl}appV4/common/add-icon.png`" alt="" mode="widthFix" class="image">
				<text>{{ text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "xlsPBotn",
		props: {
			text: {
				type: String,
				default: '新建类型'
			}
		},
		methods: {
			//去添加
			goTo() {
				this.$emit("operateMethod", "add")
			},
		}
	};
</script>

<style lang="scss" scoped>
	.xls-p-botn {
		height: 120rpx;
		width: 100%;
		background: $xls-page-bg;

		&-main {
			height: 120rpx;
			background: $xls-page-white;
			position: fixed;
			padding: 16rpx 20rpx;
			bottom: 0;
			left: 0;
			right: 0;

			.btn {
				height: 88rpx;
				background: $xls-color-primary;
				font-size: 32rpx;
				text-align: center;
				line-height: 88rpx;
				border-radius: 8rpx;
				color: $xls-page-white;
				@include center-flex();
			}
			
			.image {
				width: 44rpx;
				margin-right: 12rpx;
			}
		}
	}
</style>