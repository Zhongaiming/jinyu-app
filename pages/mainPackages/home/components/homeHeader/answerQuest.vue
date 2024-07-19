<template>
	<!-- 收益说明 -->
	<u-popup :show="answerQuest" :round="10" mode="center">
		<view class="xls-hometips-tips">
			<image :src="`${$baseUrl}homeImages/fristList/home-header.png`" alt="" class="xls-hometips-tips-image" />
			</image>
			<view class="xls-hometips-tips-btn" @click="closeOrshow"></view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "answerQuest",
		data() {
			return {
				answerQuest: false,
			};
		},
		methods: {
			closeOrshow() {
				this.answerQuest = !this.answerQuest;
			},
		},
	};
</script>

<style lang="less" scoped>
	.xls-hometips-tips {
		width: 610rpx;
		height: 1060rpx;
		position: relative;
		overflow: hidden;

		&-image {
			width: 100%;
			height: 100%;
		}

		&-btn {
			width: 100%;
			height: 90rpx;
			position: absolute;
			bottom: 26rpx;
		}
	}
</style>