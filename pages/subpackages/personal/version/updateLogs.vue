<template>
	<view>
		<jy-navbar :title="$t('personal.version.updateLogs')" border></jy-navbar>
		<jy-scroll>
			<u-cell
				v-for="(item, index) in versionList" :key="item.id"
				:label="item.createTime" :isLink="true"
				:title=" '版本:' + item.versionCode + '  ' +  $t('personal.version.mainUpdate')"
				:rightIconStyle="{fontSize: '30rpx'}" @click="goTo(item)"
			></u-cell>
		</jy-scroll>
	</view>
</template>

<script>
	import { commonController } from '@/api/index.js'
	export default {
		data() {
			return {
				versionList: []
			}
		},
		onLoad() {
			this.getVersionList()
		},
		methods: {
			getVersionList() {
				commonController.getVersionLogList({}).then(res => {
					if(res.code === 200) {
						this.versionList = res.data
					}
				})
			},
			goTo(item) {
				this.$goTo('/pages/subpackages/personal/version/logsDetail', 'navigateTo', {id: item.id})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background-color: #ffffff;
}
</style>
