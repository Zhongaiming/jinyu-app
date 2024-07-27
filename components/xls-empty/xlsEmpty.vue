<template>
	<view class="xls-empty">
		<view class="image-wrapper" :style="{ 'margin-top': marginTop }">
			<image class="image" :src="`${$baseUrl}appV4/common/null-data.png`" alt="" mode="widthFix" />
		</view>
		<view class="text" v-if="hiddenText">{{ text }}</view>
	</view>
</template>

<script>
	export default {
		name: "xlsEmpty",
		props: {
			marginTop: {
				type: String,
				default: "160rpx",
			},
			text: {
				type: String,
				default: "暂无数据",
			},
			hiddenText: {
				type: Boolean,
				default: true,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-empty {
		width: 100%;
		background: #00000000;

		.image-wrapper {
			width: 100%;
			text-align: center;

			.image {
				width: 360rpx;
			}
		}

		.text {
			font-size: 28rpx;
			margin-top: 40rpx;
			color: #666;
			text-align: center;
		}
	}
</style>