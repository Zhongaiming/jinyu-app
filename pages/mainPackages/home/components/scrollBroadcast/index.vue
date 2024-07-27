<template>
	<view class="scrollBroadcast" v-if="noticeBar" @click="goPage">
		<view class="left-wrapper">
			<u-notice-bar :left-icon="leftIcon" :text="text" scrollable />
		</view>
		<view class="right-icon">
			<!-- <van-icon :name="rightIcon" size="18" color="rgb(255, 127, 1)" /> -->
			<u-icon name="error-circle"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: "scrollBroadcast",
		props: {
			leftIcon: {
				type: String,
				default: "volume-o",
			},
			text: {
				type: String,
				default: "系统将于4月22日(周五)凌晨1点30分-5点进行系统升级维护,届时系统可能受影响,带来的不便敬请谅解。",
			},
			rightIcon: {
				type: String,
				default: "arrow",
			},
		},
		data() {
			return {
				noticeBar: true,
			};
		},
		methods: {
			goPage() {
				if (this.rightIcon == "arrow") {
					this.$router.push({
						path: "/realNameattesta",
						query: {
							five: 5
						},
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.scrollBroadcast {
		width: 100%;
		height: 40px;
		position: relative;
		z-index: 99;
		display: flex;
		align-items: center;
		background: rgb(255, 240, 207) !important;

		.left-wrapper {
			flex: 1;
		}

		.right-icon {
			padding: 0 5px;
		}
	}

	.van-notice-bar {
		color: rgb(255, 127, 1) !important;
		background: rgb(255, 240, 207) !important;
	}
</style>