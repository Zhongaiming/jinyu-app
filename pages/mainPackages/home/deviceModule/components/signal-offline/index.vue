<template>
	<view id="signalOffline" :style="{ width: sigWidth, height: 2 * sigHeight }">
		<view class="bad">x</view>
		<ul :style="{ width: sigWidth, height: sigHeight }">
			<li :style="{ width: gridSize }"></li>
			<li :style="{ width: gridSize }"></li>
			<li :style="{ width: gridSize }"></li>
			<li :style="{ width: gridSize }"></li>
			<li :style="{ width: gridSize }"></li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: "signalOffline",
		props: {
			sigWidth: {
				type: String,
				default: "36rpx",
			},
			sigHeight: {
				type: String,
				default: "24rpx",
			},
			gridSize: {
				type: String,
				default: "4rpx",
			},
		},
	};
</script>

<style lang="less" scoped>
	#signalOffline {
		position: relative;
	}

	* {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	ul {
		position: relative;
	}

	li {
		position: absolute;
		bottom: 0;
		border-radius: 20rpx;
		background: #ff4747;
	}

	ul li:nth-child(1) {
		height: 20%;
		left: 0px;
	}

	ul li:nth-child(2) {
		height: 40%;
		left: 20%;
	}

	ul li:nth-child(3) {
		height: 60%;
		left: 40%;
	}

	ul li:nth-child(4) {
		height: 80%;
		left: 60%;
	}

	ul li:nth-child(5) {
		height: 100%;
		left: 80%;
	}

	.bad {
		color: #ff4747;
		position: absolute;
		top: -30%;
		left: 0;
	}
</style>