<template>
	<scroll-view
		:style="{height: scrollHeight + 'px', whiteSpace: scrollX ? 'nowrap' : ''}"
		:show-scrollbar="showScrollbar"
		:scroll-y="scrollY"  :scroll-x="scrollX" 
		:upper-threshold="upperThreshold" :lower-threshold="lowerThreshold"
		:refresher-enabled="refresherEnabled" :refresher-threshold="refresherThreshold"
		:refresher-default-style="refresherStyle" :refresher-background="refresherBg"
		:refresher-triggered="refresherTriggered"
		@scrolltoupper="scrolltoupper"
		@scrolltolower="scrolltolower"
		@scroll="scroll"
		@refresherpulling="refresherpulling"
		@refresherrefresh="refresherrefresh"
		@refresherrestore="refresherrestore"
		@refresherabort="refresherabort"
	>
		<slot></slot>
	</scroll-view>
</template>

<script>
	import allMixins from '@/mixins/index.js'
	import cache from '@/common/cache.js'
	export default {
		mixins: [allMixins],
		props: {
			scrollY: {
				type: Boolean,
				default: true
			},
			scrollX: {
				type: Boolean,
				default: false
			},
			height: {
				type: Number
			},
			showScrollbar: {
				type: Boolean,
				default: false
			},
			upperThreshold: { // 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
				type: [Number, String],
				default: 50
			},
			lowerThreshold: { // 距底部/右边多远时（单位px），触发 scrolltolower 事件
				type: [Number, String],
				default: 50
			},
			refresherEnabled: { // 是否开启自定义下拉刷新
				type: Boolean,
				default: false
			},
			refresherThreshold: { // 设置自定义下拉刷新阈值
				type: Number,
				default: 45
			},
			refresherStyle: { // 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
				type: String,
				default: 'black'
			},
			refresherBg: { // 设置自定义下拉刷新区域背景颜色
				type: String,
				default: '#FFF'
			},
			refresherTriggered: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scrollHeight: 0
			}
		},
		mounted() {
			if(this.height) {
				this.scrollHeight = this.height
			} else {
				this.scrollHeight = cache.getCache('excludeTabbarHeight')
			}
		},
		methods: {
			// 滚动到顶部/左边
			scrolltoupper() {
				this.$emit('scrolltoupper')
			},
			// 滚动到底部/右边
			scrolltolower() {
				this.$emit('scrolltolower')
			},
			// 滚动时触发
			scroll(e) {
				this.$emit('scroll',e)
			},
			// 自定义下拉刷新控件被下拉
			refresherpulling() {
				this.$emit('refresherpulling')
			},
			// 自定义下拉刷新被触发
			refresherrefresh() {
				this.$emit('refresherrefresh')
			},
			// 自定义下拉刷新被复位
			refresherrestore() {
				this.$emit('refresherrestore')
			},
			// 自定义下拉刷新被中止
			refresherabort() {
				this.$emit('refresherabort')
			},
		}
	}
</script>

<style>
</style>