<template>
	<view class="user">
		<jy-scroll :height="excludeNavbarHeight">
			<view class="user_bg">
				<view class="user_content">
					<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="70px" height="70px" shape="circle"></u--image>
					<view class="right">
						<view style="flex: 1;display: flex;flex-direction: column;justify-content: space-between">
							<view>我是账号</view>
							<u-text size="23" :lines="2" text="我还不知道这里要放什么东西" style="margin-top: 15rpx;"></u-text>
						</view>
					</view>
				</view>
			</view>
			<view class="personal_cell">
				<u-cell-group :customStyle="{backgroundColor: '#ffffff',marginTop: '20rpx'}">
					<u-cell @click="goTo('aboutUs')":rightIconStyle="{fontSize: iconFontSize}" :isLink="true" size="large">
						<view slot="title" style="display: flex;align-items: center;">
							<u-image :src="require('../../../static/personal/aboutUs.png')" :height="iconFontSize" :width="iconFontSize"></u-image>
							<text class="u-cell-text">{{$t("personal.aboutUs")}}</text>
						</view>
					</u-cell>
					<u-cell @click="goTo('userTerms')" :rightIconStyle="{fontSize: iconFontSize}" :isLink="true" size="large">
						<view slot="title" style="display: flex;align-items: center;">
							<u-image :src="require('../../../static/personal/userTerms.png')" :height="iconFontSize" :width="iconFontSize"></u-image>
							<text class="u-cell-text">{{$t("personal.userTerms")}}</text>
						</view>
					</u-cell>
					<u-cell @click="goTo('version')" :rightIconStyle="{fontSize: iconFontSize}" :isLink="true" size="large">
						<view slot="title" style="display: flex;align-items: center;">
							<u-image :src="require('../../../static/personal/version.png')" :height="iconFontSize" :width="iconFontSize"></u-image>
							<text class="u-cell-text">{{$t("personal.version")}}</text>
						</view>
					</u-cell>
				</u-cell-group>
			
				<u-cell-group :customStyle="{backgroundColor: '#ffffff',marginTop: '20rpx'}">
					<u-cell @click="goTo('setting')" icon="setting" :rightIconStyle="{fontSize: iconFontSize}" size="large"
					:iconStyle="{color: '#78CDFF', fontSize: iconFontSize}" :title="$t('personal.setUp')" :isLink="true"></u-cell>
				</u-cell-group>
			</view>
		</jy-scroll>
	
		<jy-tabbar :selected="1"></jy-tabbar>
	</view>
</template>

<script>

	export default {
		components: {
		},
		data() {
			return {
				iconFontSize: '32rpx'
			}
		},
		methods: {
			layout() {
				this.$modal('确定要退出登录吗？').then(res => {
					removeToken()
					removeInfo()
					this.$goTo('/pages/loginAndReg/login', 'reLaunch')
				})
				
			},
			goTo(item) {
				console.log('点击', `/pages/subpackages/personal/${item}/index`)
				this.$goTo(`/pages/subpackages/personal/${item}/index`)
			}
		}
	}
</script>

<style scoped lang="scss">
.user_bg {
	background-color: #ffffff;
	height: 300rpx;
	position: relative;
	.user_content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 40rpx;
		left: 20rpx;
		right: 10rpx;
		.right {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 30rpx;
			.layout_btn {
				width: 150rpx;
				margin-right: 40rpx;
				margin-left: 6rpx;
				font-size: 20rpx;
				// position: absolute;
				// right: 50rpx;
			}
		}
	}
}
.personal_cell {
	.u-cell-text {
		margin-left: 10rpx;
	}
}

</style>
