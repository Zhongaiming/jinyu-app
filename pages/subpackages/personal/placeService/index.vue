<template>
	<z-paging ref="servicePaging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="客服设置" slot="top"></xls-jy-navbar>
		<view class="tab-wrapper">
			<ul>
				<li class="li" :class="{'active-li': modulSwitch}" @click="modulSwitch = true">
					场地客服
				</li>
				<li class="li" :class="{'active-li': !modulSwitch}" @click="modulSwitch = false">
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
		
		<service-vue v-show="!modulSwitch"></service-vue>
		
		<view slot="bottom" class="footer-btn" v-show="modulSwitch">
			<view class="footer footer-two" v-show="multiSelect">
				<u-checkbox-group v-model="placeAllCheck" @change="allGroupChange">
					<u-checkbox activeColor="#5241FF" name="1" shape="circle" iconSize="32" labelSize="36"
						size="38">全选</u-checkbox>
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
	import serviceVue from "./components/service.vue";
	export default {
		components: {
			serviceVue,
		},
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
		methods: {
			queryList(pageNo, pageSize) {
				placeController.getPlaceStaffCount({
					page: pageNo,
					size: pageSize,
					placeName: this.searchValue
				}).then(res => {
					this.$refs.servicePaging.complete(res.data);
				})
			},
			goTo(type, params) {
				if (this.multiSelect) {
					return
				}
				this.$goTo("")
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
</style>