<template>
	<!-- 分账人管理场地 -->
	<u-popup :show="personPlace" mode="bottom">
		<view class="place-warpper">
			<view class="title">
				分账场地
				<span style="float: right" @click="personPlace = false">关闭</span>
			</view>
			<view class="place-content">
				<u-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getPersonPlace"
					v-if="placeList.length">
					<u-cell v-for="(item, index) in placeList" :key="index" :title="item.placeName"
						:value="`${item.proportion} %`" />
				</u-list>
				<no-data v-else />
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				personPlace: false,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.place-warpper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title {
			line-height: 100rpx;
			text-align: center;
			border-bottom: 2rpx solid rgb(228, 225, 225);
			padding: 0 24rpx;
		}

		.place-content {
			flex: 1;
			overflow-y: auto;
		}
	}
</style>