<template>
	<z-paging ref="servicePaging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="客服设置" slot="top"></xls-jy-navbar>
		<view class="tab-wrapper">
			<ul>
				<li class="li" :class="{'active-li': modulSwitch}" @click="changeTab(true)">
					场地客服
				</li>
				<li class="li" :class="{'active-li': !modulSwitch}" @click="changeTab(false)">
					客服管理
				</li>
			</ul>
		</view>

		<view v-show="modulSwitch">
			<view v-show="!multiSelect">
				<view class="hint-info-wrap-panel" @click="examplePopup = !examplePopup">
					<view class="hint-info">
						上传微信二维码，便于顾客在有问题时找到客服。
					</view>
					<view class="check-btn">
						查看样例
						<view class="right-arrow"></view>
					</view>
				</view>
				<view class="title-wrap-panel">
					<view class="title-name">
						您可以批量设置多个场地，也可在下方逐个设置
					</view>
					<span class="batch-set-btn" @click="multiSelect = !multiSelect">批量设置</span>
				</view>
			</view>
			<view class="header title-wrap-panel" v-show="multiSelect">
				<p class="title-name">您可以批量设置多个场地，也可在下方逐个设置</p>
				<span class="batch-set-btn cancel-btn" @click="multiSelect = !multiSelect">取消批量</span>
			</view>
			<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @confirm="searchMethod"></xls-search>


			<view class="site-list-panel">
				<u-checkbox-group v-model="checkboxGroup" placement="column">
					<li class="site-list-item" v-for="(item, index) in dataList" :key="index"
						@click="goTo('radio',item)">
						<view class="place-wrapper">
							<u-checkbox shape="circle" :name="item.placeId" activeColor="#5241FF" iconSize="32"
								labelSize="36" size="38" v-show="multiSelect"></u-checkbox>
							<span class="place-name text-over">{{ item.placeName }}</span>
							<view class="item-right">
								<span class="info no-set-status">
									{{item.placeStaffCount?item.placeStaffCount+ "个客服":"未设置"}}
								</span>
							</view>
						</view>
					</li>
				</u-checkbox-group>
			</view>

			<transition name="transition" mode="out-in">
				<view class="example-popup" v-show="examplePopup">
					<image :src="`${$baseUrl}appV4/service/tips-service.png`" alt="" class="img" mode="widthFix" />
					<u-icon name="close" color="#fff" size="38" class="close-icon"
						@click="examplePopup = !examplePopup" />
				</view>
			</transition>
		</view>

		<view v-show="!modulSwitch">
			<xls-search placeholder="输入搜索的客服名称" marLeft="-6.5em" @confirm="searchMethod"></xls-search>
			<view class="wechat-manage">
				<view class="select-options">
					<view class="left"></view>
					<view class="add-cs" @click="goToEdit('add')">
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
								@click="goToEdit(item)" />
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

		<view slot="bottom" class="footer-btn" v-show="modulSwitch">
			<view class="footer footer-two" v-show="multiSelect">
				<u-checkbox-group v-model="placeAllCheck" @change="allGroupChange">
					<u-checkbox activeColor="#5241FF" name="1" shape="circle" iconSize="32" labelSize="36"
						size="38"></u-checkbox>
				</u-checkbox-group>
				<span class="all-txt">全选</span>
			</view>
			<view class="footer" v-show="multiSelect" @click="goTo('checkbox')">
				下一步({{ checkboxGroup.length }}个)
			</view>
			<view class="footer" v-show="!multiSelect" @click="goTo('back')">
				返回首页
			</view>
		</view>
	</z-paging>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				dataList: [],
				modulSwitch: true,
				checkboxGroup: [],
				placeAllCheck: [],
				multiSelect: false,
				examplePopup: false,
				searchValue: "",
			};
		},
		onShow() {
			this.$nextTick(() => {
				this.$refs.servicePaging.reload();
			})
		},
		methods: {
			changeTab(params) {
				this.modulSwitch = params
				this.$refs.servicePaging.reload();
			},
			queryList(pageNo, pageSize) {
				this.$loading();
				if (this.modulSwitch) {
					placeController.getPlaceStaffCount({
						page: pageNo,
						size: pageSize,
						placeName: encodeURIComponent(this.searchValue)
					}).then(res => {
						this.$hideLoading();
						this.$refs.servicePaging.complete(res.data);
					})
				} else {
					placeController.getStaffList({
						page: pageNo,
						size: pageSize,
						name: encodeURIComponent(this.searchValue),
					}).then(res => {
						if (res.code == 200) {
							this.$hideLoading();
							this.$refs.servicePaging.complete(res.data);
						}
					})
				}
			},
			goTo(type, params) {
				if (type == 'back') {
					this.$goTab();
					return
				}
				if (type == 'checkbox' && !this.checkboxGroup.length) {
					return this.$toast('请至少选择一个场地')
				}
				const placeId = type == 'checkbox' ? String(this.checkboxGroup) : params.placeId;
				this.$goTo("/pages/subpackages/personal/placeService/batch", "navigateTo", {
					placeId
				})
			},
			allGroupChange(item) {
				if (item.length) {
					this.checkboxGroup = this.dataList.map(place => place.placeId)
				} else {
					this.checkboxGroup = [];
				}
			},
			searchMethod(search) {
				this.searchValue = search;
				this.$refs.servicePaging.reload();
			},
			// 客服
			//客服 list
			//delete
			deleteService(id) {
				this.$modal("确定要删除该场地客服吗？", {
						confirmText: "删除",
						confirmColor: "#f73e3e",
					})
					.then(() => {
						placeController.deleteStaff({
								id
							})
							.then((res) => {
								if (res.code == 200) {
									this.$toast("删除成功");
									this.$refs.servicePaging.reload();
								}
							})
							.catch((err) => {});
					})
					.catch(() => {});
			},
			//navigateTo
			goToEdit(item) {
				this.$goTo("/pages/subpackages/personal/placeService/operate", "navigateTo", {
					...item
				});
			},


		},
	};
</script>

<style lang="scss" scoped>
	.tab-wrapper {
		background: #fff;
		padding: 16rpx 24rpx;

		ul {
			background: #f0f3f5;
			border-radius: 16rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			height: 64rpx;
			padding: 4rpx;

			.li {
				align-items: center;
				background: #f0f3f5;
				border-radius: 13rpx;
				color: #333;
				display: inline-flex;
				flex: 1;
				font-size: 26rpx;
				height: 56rpx;
				justify-content: center;
			}

			.active-li {
				background: #fff;
				color: #5241ff;
				font-weight: 700;
			}
		}
	}

	.hint-info-wrap-panel {
		align-items: center;
		background: #f5f6f7;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		font-size: 26rpx;
		height: 74rpx;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;

		.hint-info {
			color: #525975;
		}

		.check-btn {
			color: #5241ff;
			padding-right: 20rpx;
			position: relative;

			.right-arrow {
				border-right: 1rpx solid #5241ff;
				border-top: 1rpx solid #5241ff;
				bottom: 0;
				height: 16rpx;
				margin: auto;
				position: absolute;
				right: 0;
				top: 0;
				transform: rotate(45deg);
				width: 16rpx;
				box-sizing: border-box;
			}
		}
	}

	.title-wrap-panel {
		align-items: center;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 34rpx 20rpx 24rpx;
		box-sizing: border-box;

		.title-name {
			color: #666;
			font-size: 26rpx;
		}

		.batch-set-btn {
			background: #5241ff;
			border-radius: 6rpx;
			color: #fff;
			font-size: 24rpx;
			padding: 10rpx 0;
			text-align: center;
			width: 122rpx;
		}

		.cancel-btn {
			color: #5241ff;
			background: #f5f6f7;
			border: 1rpx solid #5241ff;
			box-sizing: border-box;
		}
	}

	.site-list-panel {
		font-size: 30rpx;
		padding: 0 20rpx 100rpx;

		.site-list-item {
			background: #fff;
			color: #000;
			list-style: none;

			.place-wrapper {
				align-items: center;
				border-bottom: 1rpx solid #e5e5e5;
				display: flex;
				margin-left: 18rpx;
				padding: 28rpx 0 26rpx;

				.place-name {
					flex: 1;
					display: inline-block;
					margin-right: 16rpx;
				}

				.status {
					align-items: center;
					border-radius: 4rpx;
					color: #fff;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					font-size: 24px;
					justify-content: center;
					padding: 5rpx 10rpx;
				}

				.status-null {
					color: #999;
				}

				.item-right {
					padding-right: 40rpx;

					.info {
						position: relative;
					}

					.no-set-status {
						color: #999;
					}

					.info::after {
						border-right: 1rpx solid #999;
						border-top: 1rpx solid #999;
						content: "";
						height: 16rpx;
						opacity: 0.6;
						position: absolute;
						right: unset;
						top: 50%;
						transform: translateY(-50%) rotate(45deg);
						width: 16rpx;
						box-sizing: border-box;
					}
				}
			}
		}

		.site-list-item:nth-child(2) {
			border-top-left-radius: 8rpx;
			border-top-right-radius: 8rpx;
		}

		.site-list-item:last-child {
			border-bottom-left-radius: 8rpx;
			border-bottom-right-radius: 8rpx;

			.wrap {
				border-bottom: none;
			}
		}
	}

	.footer {
		background: #5241ff;
		bottom: 0;
		color: #fff;
		font-size: 30rpx;
		height: 80rpx;
		left: 0;
		line-height: 80rpx;
		position: fixed;
		text-align: center;
		width: 100%;
	}

	.footer-btn {
		width: 100%;
		height: 100rpx;
	}

	.footer-two {
		bottom: 80rpx;
		left: 0;
		background: #fff;
		color: #333;
		padding: 0 24rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.all-txt {
			margin-left: 12rpx;
		}
	}

	.example-popup {
		height: 100vh;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		@include center-flex();

		.img {
			width: 640rpx;
		}

		.close-icon {
			position: absolute;
			bottom: 120rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.transition-enter-active,
	.transition-leave-active {
		transition: all 0.3s linear;
	}

	.transition-enter,
	.transition-leave-active {
		transform: translate3d(0, 100%, 0);
		opacity: 0;
	}

	// 客服
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