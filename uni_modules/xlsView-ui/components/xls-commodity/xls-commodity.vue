<template>
	<!-- 商品列表 -->
	<u-popup :show="commodityPopup" mode="bottom" round="20">
		<view class="commodity-content">
			<z-paging v-if="commodityPopup" :fixed="false" ref="commodityPaging" v-model="dataList" @query="queryList">
				<view slot="top">
					<view class="top">
						<view class="sides" @click="closeMethod">返回</view>
						<view class="title">商品列表</view>
						<view class="sides right-side" @click="goToAdd">添加商品</view>
					</view>
					
					<view class="content">
						<xls-search marLeft="-5.5em" placeholder="请输入商品名称" @confirm="searchMethod"></xls-search>
					</view>
				</view>

				<view class="commodity-item" v-for="item in dataList" :key="item.commodityId" @click="pitchCommodity(item)">
					<view class="image-wrapper">
						<image :src="item.commodityImg" alt="" v-if="item.commodityImg" mode="widthFix" class="image"/>
						<xls-image :src="`${$baseUrl}appV4/img/goods.png`" alt="" v-else mode="widthFix" class="image"/>
					</view>
					<view class="info" :style="{color:item.commodityId==commodityId?'#5241FF':''}">
						<view class="name">
							<span class="maxWidth text-over">
								<span v-if="item.barCode">{{ item.barCode }}-</span>
								{{ item.commodityName }}
							</span>
						</view>
						<view class="price" :style="{color:item.commodityId==commodityId?'#5241FF':''}">
							￥{{ item.suggestRetailPrice }}
						</view>
					</view>
					<!-- <view class="edit-btn" @click.stop="goEdit(item)">编辑</view> -->
				</view>
				<xls-empty slot="empty"></xls-empty>
			</z-paging>
		</view>
	</u-popup>
</template>

<script>
	import {
		commodityController
	} from "@/api/index.js";
	export default {
		props: {
			commodityId: {
				type: Number | String,
				default: 0
			}
		},
		data() {
			return {
				commodityPopup: false,
				dataList: [],
				searchValue: "",
			}
		},
		methods: {
			searchMethod(value) {
				this.searchValue = value;
				this.getComlist();
			},
			//获取列表
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
			openMethod() {
				this.commodityPopup = !this.commodityPopup;
			},
			closeMethod() {
				this.commodityPopup = !this.commodityPopup;
				// showSetting = !showSetting
			},
			
			//前往添加商品
			goToAdd() {
				this.$goTo("/pages/mainPackages/home/commodity/operate");
				return
				this.$modal("确认要前往添加商品版块吗？这可能会导致您当前输入丢失。", {
						confirmText: "前往",
					})
					.then(() => {
						
					})
					.catch(() => {});
			},
			//编辑商品
			goEdit(editshop) {
				this.commodityPopup = !this.commodityPopup;
				this.addCommodity = !this.addCommodity;
				this.commodityList = editshop;
				let imgUrl = {
					url: editshop.commodityImg
				};
				this.fileList = [];
				this.fileList.unshift(imgUrl);
			},
			//选中商品
			pitchCommodity(commodity) {
				this.$emit('confirm', commodity)
				this.commodityPopup = !this.commodityPopup;
			},
		},

	}
</script>

<style lang="scss" scoped>
	.commodity-content {
		height: 60vh;
		max-height: 1000rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #f5f6f7;

		.top {
			display: flex;
			height: 44px;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
			line-height: 44px;
			position: sticky;
			padding: 0 2.5%;
			top: 0;
			z-index: 999;

			.sides {
				color: #5241ff;
				font-size: 15px;
				height: 44px;
				width: 20%;
			}

			.right-side {
				text-align: right;
			}

			.title {
				width: 60%;
				font-size: 16px;
				text-align: center;
			}
		}

	}

	.commodity-item {
		align-items: center;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		height: 70px;
		padding: 0 2.5%;
		font-size: 14px;
		background-color: #fff;

		.image-wrapper {
			width: 50px;
			height: 50px;
			overflow: hidden;

			.image {
				width: 50px;
				height: 50px;
			}
		}

		.info {
			width: 72%;
			margin: 0 10px;

			.name {
				margin-bottom: 5px;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.price {
				color: #8d8d8d;
				font-size: 12px;
			}
		}

		.edit-btn {
			align-items: center;
			border: 1px solid #ccc;
			border-radius: 3px;
			color: #8d8d8d;
			display: flex;
			height: 28px;
			justify-content: center;
			padding: 0;
			width: 50px;
		}
	}

	.comDetail {
		font-size: 15px;

		.edit-list {
			align-items: center;
			border-bottom: 1px solid #e5e5e5;
			display: flex;
			height: 50px;
			overflow: hidden;
			padding: 0 2.5%;
			font-family: PingFangSC-Regular, PingFang SC;

			.name {
				width: 38%;
			}

			.enter {
				width: 56%;
				text-align: right;
			}

			.back-icon {
				width: 6%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}

		.image {
			padding: 2.5% 0 0 2.5%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #e5e5e5;

			.name {
				flex: 1;
			}

			.img {
				box-sizing: border-box;
			}
		}

		.text-con {
			padding: 10px 2.5%;

			.name {
				margin-bottom: 5px;
			}

			textarea {
				width: 100%;
				height: 80px;
				border: 0;
				box-sizing: border-box;
				padding: 6px;
				background: #f5f6f7;
				font-size: 15px;
				resize: none;
			}
		}
	}

	.maxWidth {
		max-width: 220px;
		display: inline-block;
	}
</style>