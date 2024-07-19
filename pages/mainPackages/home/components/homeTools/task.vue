<template>
	<!-- 经营任务 -->
	<view class="drag-wrapper Center" @click="taskFinish">
		<view class="img-wrapper Center">
			<img src="@/assets/businessGuide/guidance.png" alt="" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "service",
		methods: {
			taskFinish() {
				this.$router.push("/businessGuide");
			},
		},
	};
</script>

<style lang="less" scoped>
	.drag-wrapper {
		width: 80px;
		height: 30.64px;
		bottom: 225px;
		position: fixed;
		right: 0;
		z-index: 999;
		border-top-left-radius: 30.64px;
		border-bottom-left-radius: 30.64px;
		overflow: hidden;
		box-shadow: 0px 2px 6px 2px #bab2fe;

		.img-wrapper {
			width: 80px;
			height: 30.64px;
			overflow: hidden;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>