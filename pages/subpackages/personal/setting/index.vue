<template>
	<view>
		<jy-navbar :title="$t('personal.setUp')"></jy-navbar>
		<jy-scroll>
			<u-cell-group>
				<u-cell size="large" @click="$goTo('/pages/subpackages/personal/setting/accountSecurity/index')" :rightIconStyle="{fontSize: '32rpx'}" :title="$t('personal.setUp.AccountAndSecurity')" :isLink="true"></u-cell>
				<u-cell size="large" @click="$goTo('/pages/subpackages/personal/setting/lang/index')" :rightIconStyle="{fontSize: '32rpx'}" :title="$t('common.multilingual')" :isLink="true"></u-cell>
			</u-cell-group>
			<view @click="layout" class="logout">{{ $t('personal.layout') }}</view>
		</jy-scroll>
	</view>
</template>

<script>
	import { removeInfo, removeToken } from '@/common/auth'
export default {
	components: {
		
	},
	data() {
		return {
			
		}
	},
	methods: {
		layout() {
			this.$modal(this.$t('common.confirmLogout')).then(res => {
				removeToken()
				removeInfo()
				this.$goTo('/pages/loginAndReg/login', 'reLaunch')
			})
		},
	}
}
</script>

<style lang="scss" scoped>
	.logout {
		line-height: 48px;
		text-align: center;
		background-color: #ffffff;
		margin-top: 20rpx;
	}
</style>
