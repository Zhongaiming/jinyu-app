<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<xls-p-navbar @stratesSearch="searchMethod" slot="top"></xls-p-navbar>
		<view class="xls-list-place">
			<!-- <u-radio-group v-model="defaultPlace" placement="column"> -->
			<view class="xls-list-place-item" v-for="(item, index) in dataList" :key="index">
				<view class="header">
					<span class="group-name text-clamp">
						{{ $placeNameRule(item.placeName, item.placeNumber) }}
					</span>

					<span class="equipmentCount">{{ item.deviceNum }}台</span>
				</view>
				<view class="body">
					<view class="itemText">
						<span class="base-tips isDefault" v-show="item.id == defaultPlace">默认</span>
						<span class="base-tips addressType">{{item.placeTypeName}}</span>
						<span
							class="item-place">{{ item.province }}{{ item.city }}{{ item.region}}{{ item.placeDetail }}</span>
					</view>
					<view class="edit-btn" v-hasPermi="['app:place:index:edit']" @click="goTo(item.id)">
						<u-icon name="edit-pen" size="40" color="#999"></u-icon>
					</view>
				</view>
				<view class="footer">
					<view class="default-set">
						<view class="default-set-btn">
							<view class="radio" @click="setWeight(item)">
								<!-- <u-radio :name="item.id" activeColor="#5241FF" @click="setDefaultplace(item.id)"
										size="36" iconSize="30"></u-radio> -->
								<u-icon name="checkmark-circle-fill" color="#5241FF" size="40"
									v-if="item.wight === 1"></u-icon>
								<u-icon name="checkmark-circle" size="40" color="#999" v-else></u-icon>
							</view>
							<span class="text">默认场地</span>
						</view>
					</view>
					<span v-hasPermi="['app:place:index:delete']" class="dele-btn" @click="deleteType(item)">删除</span>
				</view>
			</view>
			<!-- </u-radio-group> -->
		</view>
		<xls-empty slot="empty" />
		<xls-p-botn slot="bottom" @goTo="goTo" v-hasPermi="['app:place:index:add']"></xls-p-botn>
	</z-paging>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";
	import xlsPBotn from "./components/xls-pBotn";
	import xlsPNavbar from "./components/xls-pNavbar";

	export default {
		components: {
			xlsPBotn,
			xlsPNavbar
		},
		data() {
			return {
				searchValue: "",
				dataList: [],
				//默认值
				defaultPlace: 0,
				//查场地
				placeInfo: [],
				// 操作的场地
				place: {},
			};
		},
		onShow() {
			this.$nextTick(() => {
				if (this.$refs.paging) {
					this.$refs.paging.refresh();			
				}
			})
		},
		methods: {
			searchMethod(search) {
				this.searchValue = search;
				this.$refs.paging.reload();
			},
			// 去编辑
			goTo(placeId = '') {
				this.$goTo('/pages/mainPackages/personal/placeModule/placeOperate', 'navigateTo', {
					placeId
				})
			},
			queryList(pageNo, pageSize) {
				placeController.getPage({
					page: pageNo,
					size: pageSize,
					search: this.searchValue
				}).then(res => {
					if (pageNo === 1 && res.data.length) {
						const wight = res.data[0].wight;
						this.defaultPlace = wight
					}
					this.$refs.paging.complete(res.data);
				})
			},
			//删除
			deleteType(item) {
				if (item.deviceNum) {
					this.$modal("该场地有" + item.deviceNum + "台设备需要解绑后才能删除该场地", {
							title: "温馨提示",
							confirmText: "我知道了",
							confirmColor: "#5241FF",
							showCancel: false,
						})
						.then(() => {})
					return
				}
				var _that = this;
				this.$modal("确定删除投放场地？", {
						title: "温馨提示",
						confirmText: '删除',
						confirmColor: "rgb(247, 62, 62)",
					})
					.then(() => {
						placeController.deletePlace({
								id: item.id
							})
							.then((res) => {
								if (res.code == 200) {
									_that.$refs.paging.reload();
									_that.$toast("删除成功~");
								}
							})
							.catch((err) => {});
					})
					.catch(() => {});
			},

			// 设为默认值
			async setWeight(placeId) {
				placeId.wight = 1;
				placeController.setWeight(placeId).then((res) => {
					this.$refs.paging.refresh();
				}).catch((res) => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-list-place {
		padding: 20rpx;

		&-item {
			width: 100%;
			background: #fff;
			border-radius: 24rpx;
			margin-bottom: 16rpx;
			padding: 32rpx 24rpx 24rpx;

			.header {
				min-height: 44rpx;
				display: flex;
				align-items: center;
				width: 100%;

				.group-name {
					color: #333;
					font-size: 32rpx;
					font-weight: 600;
				}

				.equipmentCount {
					background: #5241ff;
					border-radius: 22rpx;
					color: #fff;
					display: flex;
					font-size: 22rpx;
					font-weight: 400;
					height: 32rpx;
					line-height: 32rpx;
					margin-left: 8rpx;
					padding: 0 16rpx;
					text-align: left;
					white-space: nowrap;
				}
			}

			.body {
				align-items: center;
				border-bottom: 2rpx solid #e5e5e5;
				display: flex;
				margin-top: 20rpx;
				min-height: 36rpx;
				padding-bottom: 24rpx;

				.itemText {
					flex: 1;

					.base-tips {
						border-radius: 22rpx;
						font-size: 22rpx;
						font-weight: 400;
						height: 32rpx;
						margin-right: 8rpx;
						padding: 0 18rpx;
					}

					.isDefault {
						background: #f5f6f7;
						color: #5241ff;
					}

					.addressType {
						background: #fff7e6;
						color: #ff8d1a;
					}

					.item-place {
						color: #333;
						font-size: 26rpx;
						font-weight: 400;
						margin-left: 8rpx;
						text-align: left;
					}
				}

				.edit-btn {
					height: 40rpx;
					margin-left: 26rpx;
					width: 40rpx;
				}
			}

			.footer {
				align-items: center;
				display: flex;
				height: 36rpx;
				margin-top: 23rpx;

				.default-set {
					align-items: center;
					display: flex;
					flex: 1;
					height: 100%;

					.default-set-btn {
						align-items: center;
						display: flex;
						height: 100%;

						.radio {
							font-size: 42rpx;
							margin-right: 36rpx;
						}

						.unclick {
							pointer-events: none;
						}

						.text {
							color: #999;
							font-size: 26rpx;
							font-weight: 400;
						}
					}
				}

				.dele-btn {
					color: #999;
					font-size: 24rpx;
					font-weight: 400;
					text-align: right;
				}
			}
		}
	}
</style>