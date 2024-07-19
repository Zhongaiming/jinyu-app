<template>
	<view>
		<jy-navbar :title="$t('personal.version')"></jy-navbar>
		<view :style="{height: excludeTabbarHeight + 'px'}" class="content-area">
			<view class="logo-version">
				<u-image src="https://cdn.uviewui.com/uview/album/1.jpg" width="80px" height="80px" radius="10"></u-image>
				<text class="sys-name">{{ $t('common.appName') }}</text>
				<text class="version">
					<text style="margin-right: 10rpx;">Version</text>
					<text>{{version.versionName}}</text>
				</text>
			</view>
			<view class="cell-list">
				<u-cell :title="$t('personal.version.updateLogs')" :isLink="true" :rightIconStyle="{fontSize: '30rpx'}" @click="goTo"></u-cell>
				<u-cell @click="checkVersionEvent" :title="$t('personal.version.checkNewVersion')" :isLink="true" :rightIconStyle="{fontSize: '30rpx'}"></u-cell>
			</view>  
		</view>
		
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import APPUpdate, { getCurrentNo } from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	
	export default {
		data() {
			return {
				version: ''
			}
		},
		methods: {
			goTo() {
				this.$goTo('/pages/subpackages/personal/version/updateLogs')
			},
			checkVersionEvent() {
				// #ifdef APP-PLUS
					APPUpdate(true);
				// #endif
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			getCurrentNo(res => {
				// 进页面获取当前APP版本号（用于页面显示）
				this.version = res;
			});
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
.content-area {
	width: 100%;
	background-color: #ffffff;
	// border: 1px solid red;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.logo-version {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 80rpx;
		.sys-name {
			margin-top: 50rpx;
			font-weight: bold;
			font-size: 35rpx;
			margin-bottom: 10rpx;
		}
	}
	.cell-list {
		margin-top: 80rpx;
		width: 80%;
	}
}

::v-deep .u-cell__body {
	padding: 15px;
}
</style>
