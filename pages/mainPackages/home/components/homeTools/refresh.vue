<template>
	<view class="drag-wrapper Center" @click="refresh">
		<view class="img-wrapper Center">
			<img src="@/assets/img/icons/refresh.png" alt="" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "service",
		methods: {
			refresh() {
				this.$parent.refreshData();
			},
		},
	};
</script>

<style lang="less" scoped>
	.drag-wrapper {
		width: 80px;
		height: 80px;
		bottom: 65px;
		position: fixed;
		right: 0;
		z-index: 999;

		.img-wrapper {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			overflow: hidden;
			opacity: 0.85;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>