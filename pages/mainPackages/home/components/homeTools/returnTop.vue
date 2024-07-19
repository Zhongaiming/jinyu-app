<template>
	<view class="return-top" v-show="scrollpageTop" @click.stop="backTop" :style="{ bottom: bottomTop + 'px' }">
		<view class="top-content">
			<u-icon name="arrow-upward"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: "returnTop",
		props: {
			bottomTop: {
				type: String,
				default: "60",
			},
		},
		data() {
			return {
				scrollTop: "",
				scrollpageTop: true,
			};
		},
		created() {
			window.addEventListener("scroll", this.getScorll);
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.getScorll);
		},
		methods: {
			getScorll() {
				this.scrollTop =
					document.documentElement.scrollTop ||
					document.body.scrollTop ||
					window.pageYOffset;
				if (this.scrollTop > 100) {
					this.scrollpageTop = true;
				} else {
					this.scrollpageTop = false;
				}
			},
			backTop() {
				const that = this;
				this.$nextTick(() => {
					let timer = setInterval(() => {
						let ispeed = Math.floor(-that.scrollTop / 5);
						document.documentElement.scrollTop = document.body.scrollTop =
							that.scrollTop + ispeed;
						if (that.scrollTop === 0) {
							clearInterval(timer);
						}
					}, 32);
				});
			},
		},
	};
</script>

<style lang="less" scoped>
	.return-top {
		position: fixed;
		right: 24rpx;
		z-index: 9999;

		.top-content {
			align-items: center;
			background: hsla(0, 0%, 100%, 0.7);
			border: 2rpx solid #5241ff;
			border-radius: 50%;
			color: #5241ff;
			display: flex;
			font-size: 44rpx;
			height: 80rpx;
			justify-content: center;
			width: 80rpx;
		}
	}
</style>