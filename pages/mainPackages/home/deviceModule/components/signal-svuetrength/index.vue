<template>
	<view id="signalStrength">
		<ul :style="{ width: sigWidth, height: sigHeight }">
			<li :style="{ width: gridSize }" :class="{'signalValue':signalValue>0}"></li>
			<li :style="{ width: gridSize }" :class="{'signalValue':signalValue>15}"></li>
			<li :style="{ width: gridSize }" :class="{'signalValue':signalValue>19}"></li>
			<li :style="{ width: gridSize }" :class="{'signalValue':signalValue>23}"></li>
			<li :style="{ width: gridSize }" :class="{'signalValue':signalValue>27}"></li>
		</ul>
	</view>
</template>

<script>
	//signalValue 信号值  sigWidth宽   sigHeight高
	//gridSize信号格子的宽 它的高度相对于sigHeight
	export default {
		name: "signalStrength",
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
			signalValue: {
				type: Number,
				required: true,
			},
		},
	};
</script>

<style lang="less" scoped>
	#signalStrength {
		width: 100%;
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
		background: #b8b7b7;
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

	.signalValue {
		background: limegreen !important;
	}
</style>