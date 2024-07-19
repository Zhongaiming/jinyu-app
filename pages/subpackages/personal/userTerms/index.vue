<template>
	<view>
		<jy-navbar :title="$t('personal.userTerms')" bgColor="transparent"></jy-navbar>
		<jy-scroll>
			<u-cell-group :customStyle="{width: '92%', margin: '40rpx auto'}" :border="false">
				<u-cell v-for="item in termList" :key="item.id"
					:title="item.title" :isLink="true" size="large" :border="false"
					:rightIconStyle="{fontSize: '30rpx'}" @click="goTo(item)"
					>
				</u-cell>
			</u-cell-group>
	</jy-scroll>
	</view>
</template>

<script>
	import { commonController } from '@/api/index.js'
	export default {
		data() {
			return {
				termList: []
			}
		},
		onLoad() {
			this.getUserTermList()
		},
		methods: {
			getUserTermList() {
				let params = {
					appUserItemDtoFilter: {
					  content: "",
					  state: 0,
					  title: ""
					},
					orderParam: [
					  {
					    asc: true,
					    dateAggregateBy: "",
					    fieldName: ""
					  }
					],
					pageParam: {
					  pageNum: 0,
					  pageSize: 0
					}
					  
				}
				commonController.getUserTermList(params).then(res => {
					if(res.code === 200) {
						this.termList = res.data.dataList
					}
				})
			},
			goTo(item) {
				this.$goTo('/pages/subpackages/personal/userTerms/termDetail', 'navigateTo', {id: item.id})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
