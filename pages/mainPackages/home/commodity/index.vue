<template>
	<z-paging ref="commodityPaging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="商品管理"></xls-jy-navbar>
			<xls-search placeholder="搜索商品名称" marLeft="-5.0em" bgColor="#f5f6f7" inputColor="#fff"
				@confirm="searchMethod"></xls-search>
		</view>

		<view class="commodity-list-wrapper">
			<view class="outSides-center-wrapper" v-for="item in dataList" :key="item.commodityId">
				<image :src="item.commodityImg" alt="" v-if="item.commodityImg" class="left-img" />
				<image :src="`${$baseUrl}appV4/commodity/goods.png`" alt="" v-else class="left-img" />
				<view class="right-main-wrapper">
					<view class="titleB text-over">
						{{ item.commodityName }}
					</view>
					<view class="main-wrapper">
						<view class="centerT">
							<view class="countB">
								￥ <span>{{ item.suggestRetailPrice }}</span>
							</view>
							<view class="centerB">
								编码: <span>{{ item.commodityCode }}</span>
							</view>
						</view>
						<view class="right-wapper">
							<view class="right" v-hasPermi="['app:shj:commodity:delete']">
								<view @click="deleteCommodity(item.commodityId)" class="button-view">删除</view>
							</view>
							<view class="right" v-hasPermi="['app:shj:commodity:edit']">
								<view @click="handleUpdate(item.commodityId)" class="button-view">编辑</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<xls-commodity-null slot="empty" @goTo="goTo"></xls-commodity-null>
		<view class="xls-add-btn" v-hasPermi="['app:shj:commodity:add']" v-if="dataList.length">
			<view class="add-btn" @click="goTo">
				<image :src="`${$baseUrl}appV4/common/add-icon.png`" alt="" class="image" mode="widthFix" />
				<view>添加商品</view>
			</view>
		</view>

	</z-paging>
</template>

<script>
	import {
		commodityController
	} from "@/api/index.js";
	import xlsCommodityNull from "./components/xls-commodity-null.vue";
	export default {
		components: {
			xlsCommodityNull
		},
		data() {
			return {
				searchValue: null,
				dataList: [],
			};
		},
		onShow() {
			this.$nextTick(() => {
				if (this.$refs.commodityPaging) {
					this.$refs.commodityPaging.refresh();
				}
			})
		},
		methods: {
			goTo() {
				this.$goTo('/pages/mainPackages/home/commodity/operate')
			},
			queryList(pageNo, pageSize) {
				commodityController.getCommodity({
					commodityDtoFilter: {},
					pageParam: {
						pageNum: pageNo,
						pageSize: pageSize
					}
				}).then(res => {
					this.$refs.commodityPaging.complete(res.data.dataList);
				})
			},

			searchMethod(value) {
				this.searchValue = value;
				this.$refs.commodityPaging.reload();
			},

			handleUpdate(id) {
				this.$goTo('/pages/mainPackages/home/commodity/operate', 'navigateTo', {
					id
				})
			},
			//删除
			deleteCommodity(id) {
				this.$modal("如果该商品有正在关联的设备，那么，在此处删除该商品后，对于正在关联该商品的设备仍然可以正常使用；只是今后将无法在商品列表中选择使用该商品。确定要删除该商品吗？", {
					confirmText: "删除"
				}).then(() => {
					commodityController.deleteCommodity({
						id
					}).then(res => {
						if (res.code === 200) {
							this.$refs.commodityPaging.reload();
						}
					})
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.commodity-list-wrapper {
		padding: 0 24rpx;
	}
	.outSides-center-wrapper {
		padding: 0 24rpx;
		background: #fff;
		padding: 16rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		margin-bottom: 16rpx;
		display: flex;

		.left-img {
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
		}

		.right-main-wrapper {
			flex: 1;

			.titleB {
				max-width: 520rpx;
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}

			.main-wrapper {
				display: flex;
			}
		}

		.centerT {
			flex: 1;
			white-space: nowrap; //不换行
			overflow: hidden;
			text-overflow: ellipsis;

			.centerB {
				font-size: 26rpx;
				color: #999;
			}

			.countB {
				font-size: 26rpx;
				color: red;
				line-height: 44rpx;
			}
		}

		.right-wapper {
			margin-left: 20rpx;
			display: flex;
			justify-content: flex-end;
			@include center-flex();
		}

		.right {
			width: 124rpx;

			.button-view {
				width: 100rpx;
				border: 2rpx solid #999;
				border-radius: 10rpx;
				font-size: 26rpx;
				text-align: center;
				height: 50rpx;
				line-height: 50rpx;
				background: #fff;
				color: #999;
			}
		}
	}

	.xls-add-btn {
		width: 100%;
		display: flex;
		justify-content: center;

		.add-btn {
			width: 252rpx;
			height: 80rpx;
			background: #5241ff;
			border-radius: 50rpx;
			font-size: 28rpx;
			color: #fff;
			position: fixed;
			bottom: 100rpx;
			@include center-flex();

			.image {
				width: 40rpx;
			}

			:nth-child(2) {
				padding-left: 12rpx;
			}
		}
	}
</style>