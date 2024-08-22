<template>
	<u-popup :show="showServcielist" mode="bottom" round="20">
		<view class="dev-content">
			<z-paging v-if="showServcielist" :fixed="false" ref="servicePopup" v-model="serviceList" @query="queryList">
				<view class="modal-header box-sizing">
					<span class="handle-btn" @click="showServcielist = false">取消</span>
					<span class="handle-btn ok-btn" @click="comfirmChoose">
						确定
						<span class="sub-text">({{ checkboxGroup.length }}/{{ serviceList.length }})</span>
					</span>
				</view>
				<xls-search placeholder="请输入客服名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>
				<view class="device-body">
					<view class="dev-list">
						<view class="list-hd item" v-show="serviceList.length">
							<span class="value">全部</span>
							<view class="handle-list">
								<u-checkbox-group v-model="allCheck" @change="allGroupChange">
									<u-checkbox activeColor="#5241FF" name="1" shape="circle" iconSize="32"
										labelSize="36" size="38"></u-checkbox>
								</u-checkbox-group>
							</view>
						</view>
						<view class="list-bd" v-show="serviceList.length">
							<u-checkbox-group v-model="checkboxGroup" placement="column">
								<view class="item dev-item" v-for="(item, index) in serviceList" :key="index">
									<span class="value">
										{{ item.name}}
										<span class="phone">({{ item.phone }})
										</span>
										<view class="isDefault" v-show="item.defaultCustomerService == 1">
											默认
										</view>
									</span>
									<view class="handle-list">
										<u-checkbox :name="item.id" shape="circle" activeColor="#5241FF" iconSize="32"
											labelSize="36" size="38"></u-checkbox>
									</view>
								</view>
							</u-checkbox-group>
						</view>
					</view>
				</view>
				<xls-empty slot="empty"></xls-empty>
			</z-paging>
		</view>
	</u-popup>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";

	export default {
		name: "serviceMultiSelect",
		data() {
			return {
				showServcielist: false,
				serviceList: [],
				allCheck: [],
				checkboxGroup: [],
				searchValue: "",
			};
		},
		methods: {
			//获取列表
			queryList(pageNo, pageSize) {
				placeController.getStaffList({
					page: pageNo,
					size: pageSize,
					name: encodeURIComponent(this.searchValue),
				}).then(res => {
					if (res.code == 200) {
						this.$refs.servicePopup.complete(res.data);
					}
				})
			},
			stratesSearch(search) {
				this.searchValue = search;
				this.$refs.servicePopup.reload();
			},
			allGroupChange(item) {
				if (item.length) {
					this.checkboxGroup = this.serviceList.map(place => place.id)
				} else {
					this.checkboxGroup = [];
				}
			},
			//展示
			showService() {
				this.showServcielist = !this.showServcielist;
			},
			//确认
			comfirmChoose() {
				this.$emit("getServiceId", this.checkboxGroup);
				this.showServcielist = !this.showServcielist;
			},
			//回填
			defaultChecked(arr) {
				if (arr) {
					arr.split(",").forEach((item) => {
						this.checkboxGroup.push(parseInt(item));
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.dev-content {
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;
		display: flex;
		flex-direction: column;
		background-color: #f5f6f7;

		.modal-header {
			width: 100%;
			padding: 0 20rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: #fafafa;
			border-bottom: 1rpx solid #e5e5e5;

			.handle-btn {
				display: inline-block;
				height: 100%;
				font-size: 32rpx;
				color: #5241FF;
			}

			.ok-btn {
				float: right;
			}

			.disabled {
				opacity: 0.5;
				pointer-events: none;
			}
		}

		.device-body {
			.list-hd {
				padding: 0 30rpx;
			}
			
			.item {
				position: relative;
				height: 92rpx;
				line-height: 92rpx;
				font-size: 32rpx;
				color: #000;
				background: #fff;
				width: 100%;
				box-sizing: border-box;
			}

			.value {
				display: inline-block;
				max-width: 80%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				.phone {
					color: #999;
					font-size: 22rpx;
					margin-left: 10rpx;
				}

				.isDefault {
					margin-left: 12rpx;
					padding: 2rpx 16rpx;
					line-height: 24rpx;
					height: 24rpx;
					border-radius: 8rpx;
					background: #F5F6F7;
					color: #5241FF;
					font-size: 20rpx;
					display: inline-block;
					font-family: PingFangSC;
					position: relative;
					top: -20rpx;
				}
			}

			.handle-list {
				float: right;
				height: 100%;
				justify-content: flex-end;
				display: flex;
				align-items: center;
			}

			.u-checkbox--horizontal {
				margin-right: 0;
			}

			.list-bd {
				margin-top: 30rpx;
				padding-left: 30rpx;
				background: #fff;
			}

			.dev-item {
				padding-right: 30rpx;
				border-bottom: 1rpx solid #ebe9e9;
			}
		}
	}
</style>