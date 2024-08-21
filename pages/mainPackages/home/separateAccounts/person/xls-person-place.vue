<template>
	<u-popup :show="personPlace" mode="bottom" round="20">
		<view class="place-warpper">
			<!-- <z-paging ref="sPersonPaging" v-model="dataList" @query="queryList"> -->
			<view class="title">
				分账场地
				<span style="float: right" @click="personPlace = false">关闭</span>
			</view>
			<xls-empty v-if="!dataList.length"></xls-empty>
			<u-cell-group v-else>
				<u-cell v-for="(item, index) in dataList" :key="index" :title="item.placeName"
					:value="`${item.proportion} %`" />
				<xls-bottom></xls-bottom>
			</u-cell-group>

			<!-- </z-paging> -->
		</view>
	</u-popup>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				personPlace: false,
				dataList: [],
			}
		},
		methods: {
			queryList(id) {
				separateController.getBilsPlaceList({
					id
				}).then(res => {
					// this.$refs.sPersonPaging.complete(res.data);
					this.dataList = res.data;
				})
			},
			openPopup(id) {
				this.personPlace = !this.personPlace;
				this.queryList(id);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.place-warpper {
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;
		display: flex;
		flex-direction: column;
		overflow-y: auto;

		.title {
			line-height: 100rpx;
			height: 100rpx;
			text-align: center;
			border-bottom: 1px solid rgb(228, 225, 225);
			padding: 0 24rpx;
		}
	}
</style>