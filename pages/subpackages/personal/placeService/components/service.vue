<template>
	<view>
		<xls-search placeholder="输入搜索的客服名称" marLeft="-6.5em" @confirm="searchMethod"></xls-search>
		<view class="wechat-manage">
			<view class="select-options">
				<view class="left"></view>
				<view class="add-cs" @click="goTo">
					<image :src="`${$baseUrl}appV4/service/add.png`" alt="" class="img-icon" mode="widthFix" />
					<span class="text">创建客服</span>
				</view>
			</view>
			<view class="cs-list">
				<view class="list-item" v-for="(item, index) in dataList" :key="index">
					<view class="center">
						<view class="cs-name">
							<span class="name">{{ item.name }}</span>
						</view>
						<view class="remark">{{ item.phone }}</view>
						<view class="group-num" v-show="item.defaultCustomerService == 1">
							<image :src="`${$baseUrl}appV4/service/service.png`" alt="" class="img-style"
								mode="widthFix" />
							<view class="isDefault">默认</view>
						</view>
					</view>
					<view class="right">
						<image :src="`${$baseUrl}appV4/service/edit.png`" alt="" class="img-icon" mode="widthFix"
							@click="goEdit(item)" />
						<view class="work-status">
							<view class="delete-btn" @click="deleteService(item.id)">
								删除
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				dataList: [{
						"id": 29,
						"name": "中土客服1",
						"phone": "18126642666",
						"qrCode": "http://xls-app-file.oss-cn-shanghai.aliyuncs.com/user/user_service/2022-12-16_eHiqOPBlw_NpWpTYG-GXF.jpg",
						"weight": 0,
						"defaultCustomerService": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 426,
						"createTime": "2022-12-16 15:58:43"
					},
					{
						"id": 46,
						"name": "步行街兑币机客服",
						"phone": "18939797990",
						"qrCode": "https://xls-app-file.oss-cn-shanghai.aliyuncs.com/user/user_service/2023-06-15_dt5mQeYjYoU5y_y5BcADg.jpg",
						"weight": 0,
						"defaultCustomerService": 0,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 661,
						"createTime": "2023-06-15 10:59:13"
					}
				],
				editMsg: {},
				placedataList: [],
			}
		},
		created() {
			this.getService()
		},
		methods: {
			//客服 list
			async getService() {
				let res = await placeController.getStaffList({
					name: encodeURIComponent(this.searchValue),
				});
				if (res.code == 200) {
					this.dataList = res.data.data;
				}
			},
			searchMethod() {

			},
			//delete
			deleteService(id) {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: "确定要删除该场地客服吗？",
						width: "270",
						confirmButtonText: "删除",
						confirmButtonColor: "#f73e3e",
					})
					.then(() => {
						deleteStaff({
								id
							})
							.then((res) => {
								if (res.data.code == 0 || res.data.msg == "ok") {
									this.$toast.success("删除成功");
									this.dataList = this.dataList.filter((item) => {
										return item.id != id;
									});
								}
							})
							.catch((err) => {});
					})
					.catch(() => {});
			},
			//edit
			goEdit(item) {
				this.editMsg = item;
				this.$router.push({
					name: "setServiceDetail",
					query: {
						operTypeName: "编辑",
						serviceMsg: JSON.stringify(item)
					},
				});
			},
			editItemService(item) {
				this.editMsg = Object.assign(this.editMsg, item);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wechat-manage {
		margin: 0rpx 24rpx 0;

		.select-options {
			align-items: center;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;

			.left {
				padding: 24rpx 0;
				display: flex;
				align-items: center;

				.option {
					margin-right: 24px;
					display: flex;
					align-items: center;

					.label {
						color: #333;
						font-size: 26rpx;
						line-height: 44rpx;
					}
				}
			}

			.add-cs {
				display: flex;
				align-items: center;
				color: #5241ff;
				padding-top: 20rpx;

				.text {
					font-size: 28rpx;
					padding-left: 10rpx;
				}
			}
		}

		.cs-list {
			height: 100%;
			width: 100%;
			overflow-y: auto;

			.list-item {
				background: #fff;
				border-radius: 16rpx;
				display: flex;
				margin-top: 16rpx;
				padding: 24rpx;
				width: 100%;
				box-sizing: border-box;
				position: relative;

				.center {
					.cs-name {
						align-items: center;
						display: flex;
						height: 44rpx;
						line-height: 44rpx;

						.name {
							color: #333;
							font-size: 32rpx;
						}

						.status {
							align-items: center;
							background: #5ad11d;
							border-radius: 18rpx 18rpx 18rpx 4rpx;
							color: #fff;
							display: inline-block;
							font-size: 24rpx;
							height: 36rpx;
							line-height: 36rpx;
							justify-content: center;
							margin-left: 8rpx;
							text-align: center;
							width: 84rpx;
						}
					}

					.remark {
						color: #999;
						font-size: 24rpx;
						margin-top: 8rpx;
					}

					.group-num {
						margin-top: 12rpx;
						color: #999;
						display: flex;
						align-items: center;

						.num {
							font-size: 26rpx;
						}

						.isDefault {
							margin-left: 12rpx;
							padding: 2rpx 16rpx;
							border-radius: 8rpx;
							background: #f5f6f7;
							color: #5241ff;
							font-size: 24rpx;
						}
					}
				}

				.right {
					align-items: flex-end;
					display: flex;
					flex-direction: column;
					flex: 1;

					.work-status {
						flex: 1;
						font-size: 32rpx;
						line-height: 44rpx;
						text-align: right;
						display: flex;
						align-items: flex-end;

						.delete-btn {
							margin-top: 20rpx;
							padding: 2rpx 16rpx;
							color: rgb(49, 48, 48);
							font-size: 28rpx;
							border: 1rpx solid #d0d0d0;
							border-radius: 8rpx;
						}
					}
				}
			}
		}

		.ft-content {
			display: flex;
			align-items: center;
			padding: 20rpx 24rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;

			.left-all {
				display: flex;
				align-items: center;

				.all {
					color: #333;
					font-family: PingFang SC;
					font-size: 28rpx;
					margin-left: 16rpx;
				}
			}

			.right-btn {
				display: flex;
				flex: 1;
				justify-content: flex-end;
				align-items: center;

				.btn {
					align-items: center;
					background: #f5f5f5;
					border-radius: 16rpx;
					color: #333;
					display: inline-block;
					font-size: 32px;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					width: 208rpx;
				}

				.set {
					background: #5241ff;
					color: #fff;
					margin-left: 16rpx;
				}
			}
		}
	}

	.img-style {
		width: 60rpx;
	}

	.img-icon {
		width: 40rpx;
	}
</style>