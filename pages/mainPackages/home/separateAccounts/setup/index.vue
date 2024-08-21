<template>
	<z-paging ref="setupPaging" v-model="dataList" @query="queryList">
		<view class="header-main" slot="top">
			<view class="text-tips">
				声明：平台仅提供平台服务,您与合作方之间的所发生的一切财务关系(如收益分成结算、财务纠纷等),均与平台无关
			</view>
			<view class="flexbox">
				<view class="info">请选择需要设置收益分成的场地</view>
				<view class="handle" @click="goTo">
					<span>操作记录 &gt;</span>
				</view>
			</view>
			<xls-search marLeft="-5.5em" placeholder="请输入场地名称" @confirm="searchMethod"></xls-search>
		</view>

		<u-checkbox-group v-model="checkboxGroup" placement="column" @change="placeGroupChange">
			<view class="place-item" v-for="(item, index) in dataList" :key="index">
				<view class="label-content">
					<view class="handle-list">
						<u-checkbox shape="circle" :name="item.placeId" activeColor="#5241FF" iconSize="32"
							labelSize="36" size="38"></u-checkbox>
					</view>
					<span class="place-name">{{ item.placeName }}</span>
					<span class="device-num">{{ item.deviceNum || 0 }}台</span>
				</view>
				<view class="detail" v-show="item.divideSetting == 0">
					<span @click="goTo(item.placeId)">未设置分成</span>
				</view>
				<view class="detail" style="color: #5241FF" v-show="item.divideSetting > 0">
					<span @click="goTo(item.placeId)">已设置分成>></span>
				</view>
			</view>
		</u-checkbox-group>

		<xls-empty slot="empty"></xls-empty>

		<view class="footer-main" slot="bottom">
			<view class="left-all">
				<u-checkbox-group v-model="allCheckGroup" @change="allGroupChange">
					<u-checkbox activeColor="#5241FF" name="1" shape="circle" iconSize="32" labelSize="36"
						size="38">全选</u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="next-step" :class="{'active':checkboxGroup.length}" @click="nextStep">
				下一步({{ checkboxGroup.length }}个)
			</view>
		</view>
	</z-paging>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				dataList: [],
				allCheckGroup: [],
				checkboxGroup: [],
				searchValue: "",
			};
		},
		methods: {
			goTo(placeId) {
				this.$goTo('/pages/mainPackages/home/separateAccounts/setup/detail', 'navigateTo', {
					placeId: placeId,
					type: "radio"
				})
			},
			queryList(pageNo, pageSize) {
				separateController.getSeparateSetup({
					page: pageNo,
					size: pageSize,
					placeName: this.searchValue
				}).then(res => {
					this.$refs.setupPaging.complete(res.data);
				})
			},
			nextStep() {
				if (this.checkboxGroup.length) {
					this.$goTo('/pages/mainPackages/home/separateAccounts/setup/detail', 'navigateTo', {
						placeId: this.checkboxGroup,
						type: "checkbox"
					})
				} else {
					this.$toast("请先选择分账场地~");
				}
			},
			searchMethod(search) {
				this.searchValue = search;
				this.$refs.setupPaging.reload();
			},
			placeGroupChange(item) {
				
			},
			allGroupChange(item) {
				if (item.length) {
					this.checkboxGroup = this.dataList.map(place => place.placeId)
				} else {
					this.checkboxGroup = [];
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.header-main {
		font-size: 30rpx;
		color: #999;
		background: rgba(245, 246, 247, 1);

		.text-tips {
			background: #ffe2e2;
			font-size: 26rpx;
			padding: 20rpx;
			color: rgba(186, 77, 100, 1);
			line-height: 36rpx;
		}

		.flexbox {
			margin: 0rpx auto 20rpx;
			padding: 20rpx;
			padding-bottom: 0;
			display: flex;
			align-items: center;

			.info {
				flex: 1;
				color: rgba(102, 102, 102, 1);
			}

			.handle {
				color: #5241FF;
			}
		}
	}


	.place-item {
		width: 100%;
		padding: 24rpx 20rpx;
		background: #fff;
		border-top: 2rpx solid #ddd;

		.label-content {
			display: flex;
			align-items: center;

			.handle-list {
				width: 80rpx;
			}

			.place-name {
				color: rgba(26, 26, 26, 1);
				font-size: 32rpx;
				font-weight: 700;
				display: inline-block;
				max-width: 500rpx;
				@include text-ellipsis();
			}

			.device-num {
				padding: 2rpx 10rpx;
				margin-left: 16rpx;
				border-radius: 6rpx;
				border: 2rpx solid rgba(151, 151, 151, 1);
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFangSC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}
		}

		.detail {
			margin-top: 12rpx;
			color: #666666;
			font-size: 26rpx;
			padding-left: 80rpx;
		}
	}

	.footer-main {
		display: flex;
		align-items: center;
		font-size: 30rpx;

		.left-all {
			flex: 1;
			display: flex;
			align-items: center;
			padding-left: 24rpx;
			border-top: 2rpx solid #ddd;
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;
		}

		.next-step {
			width: 500rpx;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #fff;
			background-color: #ccc;
		}

		.active {
			background-color: #5241FF;
		}

		.paddingLeft {
			padding-left: 16rpx;
		}
	}
</style>