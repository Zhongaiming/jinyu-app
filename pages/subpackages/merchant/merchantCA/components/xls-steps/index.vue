<template>
	<view class="xls-steps">
		<view class="steps-item" v-for="item in stepsList" :key="item.id">
			<view class="viewider-line">
				<p class="viewider-line-left" v-if="item.id != 1" :class="{ color: current < item.current }"></p>
				<p class="viewider-line-right" v-if="item.id != 5" :class="{ color: current <= item.current }"></p>
				<image :src="`${$baseUrl}appV4/authentications/sus.png`" alt="" class="select-icon" mode="widthFix"
					v-if="current > item.current" />
				<p class="select-text" v-else :class="{ opacity: current < item.current }">{{item.current}}</p>
			</view>
			<p class="text">{{item.text}}</p>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				stepsList: [{
					id: 1,
					text: '证件信息',
					current: 1,
				}, {
					id: 2,
					text: '开户行信息',
					current: 2,
				}, {
					id: 3,
					text: '经营信息',
					current: 3,
				}, {
					id: 4,
					text: '信息审核',
					current: 4,
				}, {
					id: 5,
					text: '微信实名认证',
					current: 5,
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.xls-steps {
		background-color: #5241ff;
		padding: 24rpx 28rpx 64rpx;
		color: #fff;
		display: flex;
		font-size: 24rpx;
		justify-content: space-between;

		.steps-item {

			.viewider-line {
				display: block;
				height: 40rpx;
				margin: 0 auto;
				position: relative;
				width: 40rpx;

				.viewider-line-left {
					background-color: #fff;
					height: 4rpx;
					left: -80rpx;
					position: absolute;
					right: 48rpx;
					top: 20rpx;
					transform: translateY(-50%);
				}

				.viewider-line-right {
					background-color: #fff;
					height: 4rpx;
					left: 48rpx;
					position: absolute;
					right: -80rpx;
					top: 20rpx;
					transform: translateY(-50%);
				}

				.color {
					background-color: rgba(138, 126, 255, 1);
				}

				.select-icon {
					display: block;
					height: 100%;
					width: 100%;
					border: 0;
				}

				.select-text {
					align-items: center;
					background-color: #fff;
					border-radius: 50%;
					color: #5241ff;
					display: flex;
					height: 100%;
					justify-content: center;
					width: 100%;
					box-sizing: border-box;
				}

				.opacity {
					opacity: 0.32;
				}
			}

			.text {
				margin-top: 12rpx;
				text-align: center;
			}
		}
	}
</style>