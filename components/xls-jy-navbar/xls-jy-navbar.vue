<template>
	<jy-navbar :title="title" :bgColor="bgColor" slotLeft slotRight :titleStyle="titleStyle">
		<template v-slot:left>
			<view class="left-icon-style" @click.stop="leftClick">
				<u-icon name="arrow-left" :color="leftIconColor" :size="leftIconSize"></u-icon>
			</view>
		</template>
		<template v-slot:right>
			<view class="left-icon-style" @click.stop="rightClick">
				<u-icon name="home" :color="rightIconColor" :size="rightIconSize"></u-icon>
			</view>
		</template>
	</jy-navbar>
</template>

<script>
	export default {
		name: "xls-jy-navbar",
		props: {
			title: {
				type: String,
				default: ''
			},
			bgColor: { // 导航栏背景设置
				type: String
			},
			leftIconSize: { // 左侧返回图标的大小
				type: String | Number,
				default: '17px'
			},
			leftIconColor: { // 左侧返回图标的颜色
				type: String,
				default: '#303133'
			},
			rightIconSize: { // 右侧返回图标的大小
				type: String | Number,
				default: '24px'
			},
			rightIconColor: { // 右侧返回图标的颜色
				type: String,
				default: '#303133'
			},
			titleStyle: {  // 标题的样式，对象或字符串形式
				type: String | Object,
			},
		},
		methods: {
			leftClick() {
				uni.navigateBack();
			},
			rightClick() {
				uni.switchTab({
					url: '/pages/mainPackages/home/index'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.left-icon-style {
		border-radius: 50%;
		width: 56rpx;
		height: 56rpx;
		background-color: #fff;
		@include center-flex();
	}
</style>