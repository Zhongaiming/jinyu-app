<template>
	<view>
		<u-navbar
			@rightClick="rightClick"
			@leftClick="leftClick"
			:title="title"
			:leftText="leftText"
			:leftIcon="leftIcon"
			:rightText="rightText"
			:rightIcon="rightIcon"
			:border="border"
			:bgColor="backgroundColor"
			:titleWidth="titleWidth"
			:height="navigatorHeight"
			:leftIconSize="leftIconSize"
			:leftIconColor="leftIconColor"
			:autoBack="autoBack"
			:titleStyle="titleStyle"
			:fixed="fixed"
			:placeholder="placeholder"
			:safeAreaInsetTop="safeAreaInsetTop"
			>
				<view v-if="slotLeft" slot="left">
					<slot name="left"></slot>
				</view>
				<view v-if="slotRight" slot="right">
					<slot name="right"></slot>
				</view>
				<view v-if="slotCenter" slot="center">
					<slot name="center"></slot>
				</view>
			</u-navbar>
	</view>
</template>

<script>
	const globalConfig  = require('../../core/config/globalConfig.js')
	import { mapGetters } from 'vuex'
	export default {
		props: {
			title: {  // 导航栏标题，如设置为空字符，将会隐藏标题占位区域
				type: String,
				default: ''
			},
			leftText: {  // 左边的提示文字
				type: String,
				default: ''
			},
			leftIcon: {  // 左边返回图标的名称，只能为uView自带的图标
				type: String,
				default: 'arrow-left'
			},
			rightText: { // 右边的提示文字
				type: String,
				default: ''
			},
			rightIcon: {  // 右边返回图标的名称，只能为uView自带的图标
				type: String,
				default: ''
			},
			border: {  // 导航栏底部是否显示下边框
				type: Boolean,
				default: false
			},
			bgColor: {  // 导航栏背景设置
				type: String
			},
			titleWidth: { // 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx
				type: Number | String,
				default: '400rpx'
			},
			leftIconSize: {  // 左侧返回图标的大小
				type: String | Number,
				default: '20px'
			},
			leftIconColor: {  // 左侧返回图标的颜色
				type: String,
				default: '#303133'
			},
			autoBack: {  // 点击左侧区域(返回图标)，是否自动返回上一页
				type: Boolean,
				default: true
			},
			titleStyle: {  // 标题的样式，对象或字符串形式
				type: String | Object,
			},
			fixed: {  // 导航栏是否固定在顶部
				type: Boolean,
				default: true
			},
			placeholder: { // 固定在顶部时，是否生成一个等高元素，以防止塌陷
				type: Boolean,
				default: true
			},
			safeAreaInsetTop: { // 是否开启顶部安全区适配
				type: Boolean,
				default: true
			},
			slotLeft: {
				type: Boolean,
				default: false
			},
			slotRight: {
				type: Boolean,
				default: false
			},
			slotCenter: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				navigatorHeight: '0px',
				backgroundColor: '#f5f6f7',
			}
		},
		mounted() {
			this.navigatorHeight = globalConfig.navigatorHeight + 'px'
			this.backgroundColor = this.bgColor ? this.bgColor : globalConfig.navigatorBgColor //　若没有传 bgColor, 则使用全局的导航栏背景色
		},
		methods: {
			rightClick() {
				this.$emit("rightClick")
			},
			leftClick() {
				this.$emit("leftClick")
			}
		}
		
	}
</script>

<style>
</style>