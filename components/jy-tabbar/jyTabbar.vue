<template>
	<view>
		<view :style="{height: tabBarConfig.tabBarHeight + 'px'}"></view>
		<view class="tab-bar"
			:style="{height: tabBarConfig.tabBarHeight + 'px', backgroundColor: tabBarConfig.backgroundColor}">
			<view v-for="(item,index) in tabBarList" :key="index"
				:class="{'tab-bar-item': true,currentTar: selected == item.id}" @click="switchTab(item, index)">
				<view class="tab_text"
					:style="{color: selected == index ? tabBarConfig.selectTextColor : tabBarConfig.textColor, fontSize: tabBarConfig.textFontSize}">
					<u-icon v-if="tabBarConfig.isUseUicon" :name="item.uiconName"
						:color="selected == index ? tabBarConfig.uiconSelectColor : ''"
						:size="tabBarConfig.uiconSize"></u-icon>
					<image v-else :src="selected == index ? item.selectedIconPath : item.iconPath"
						:style="{width: tabBarConfig.imgWidth, height: tabBarConfig.imgHeight}"></image>
					<view>{{ $t(item.text) }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		adminTabBar,
		commonUserTabBar
	} from '@/core/config/tabBarListConfig.js'
	const globalConfig = require('../../core/config/globalConfig.js')
	export default {
		props: {
			selected: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabBarList: [],
				tabBarConfig: globalConfig.tabBar
			}
		},
		mounted() {
			if (this.info.permission === 1) {
				this.tabBarList = adminTabBar
			} else if (this.info.permission === 0) {
				this.tabBarList = commonUserTabBar
			}
			this.tabBarList = adminTabBar
		},
		methods: {
			switchTab(item) {
				let url = item.pagePath
				this.$goTo(url, 'switchTab')
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 外部装修
	.tab-bar {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83) !important;

		// 当前点击的
		.currentTar {
			transition: all 0.5s ease-in-out;
		}

		// 给每个 item 设置样式
		.tab-bar-item {
			//flex: 0.5;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 10rpx;
			background-color: transparent;
			transition: all 0.5s ease-in-out;
			margin: auto;

			// 限制文字大小
			.tab_text {
				// font-size: 20rpx;
				// margin-top: 5rpx;
				flex: 1;
			}
		}
	}

	::v-deep .u-icon--right {
		flex-direction: column;
	}
</style>