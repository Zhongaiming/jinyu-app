<template>
	<view class="finished-text">{{text}}</view>
</template>

<script>
	export default {
		name: 'xlsBottom',
		props: {
			text: {
				type: String,
				default: '— - 已经到底了 - —'
			}
		}
	}
</script>

<style scoped>
	.finished-text {
		text-align: center;
		color: #ccc;
		font-size: 24rpx;
		line-height: 56rpx;
		width: 100%;
	}
</style>