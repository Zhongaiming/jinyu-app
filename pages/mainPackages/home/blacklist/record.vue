<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="黑名单操作记录"></xls-jy-navbar>
			<xls-search placeholder="输入会员名字" marLeft="-5em" @confirm="stratesSearch" />
		</view>
		<view class="record-content">
			<view class="record-item" v-for="(item, index) in dataList" :key="index">
				<span class="type type-5" v-show="item.blackType == 0">加入</span>
				<span class="type type-4" v-show="item.blackType == 1">剔除</span>
				<!-- blackType 0增加 1删除 -->
				<p class="line-item">
					<span class="title">会员名</span>
					<span class="main">{{ item.memberName }}</span>
				</p>
				<p class="line-item">
					<span class="title">会员ID</span>
					<span class="main">{{ item.memberId }}</span>
				</p>
				<p class="line-item">
					<span class="title">操作人</span>
					<span class="main">{{ item.operationName }}</span>
				</p>
				<p class="line-item">
					<span class="title">操作时间</span>
					<span class="main">{{renderTime(item.operationTime)}}</span>
				</p>
			</view>
		</view>
		<xls-empty slot="empty" />
	</z-paging>
</template>

<script>
	import {
		memberController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				dataList: [],
				searchValue: "",
			};
		},

		methods: {
			stratesSearch(value) {
				this.searchValue = value;
			},

			queryList(pageNo, pageSize) {
				memberController.getBlackLogList({
					page: pageNo,
					size: pageSize,
					search: this.searchValue
				}).then(res => {
					if (res.code === 200) {
						setTimeout(() => {
							this.$refs.paging.complete(res.data);
						}, 2000)
					}
				})
			},
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000)
					.toISOString()
					.replace(/T/g, " ")
					.replace(/\.[\d]{3}Z/, "");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.record-content {
		padding: 20rpx 24rpx 0rpx;

		.record-item {
			padding: 20rpx;
			background: #fff;
			border-radius: 12rpx;
			font-size: 28rpx;
			position: relative;
			margin-bottom: 20rpx;

			.line-item {
				display: flex;
				align-items: center;
			}

			.title {
				flex: 0.8;
			}

			.main {
				flex: 2;
			}

			.type {
				border-bottom-left-radius: 7rpx;
				border-top-right-radius: 7rpx;
				color: #fff;
				display: inline-block;
				font-size: 24rpx;
				padding: 2rpx 5rpx;
				position: absolute;
				right: 0;
				text-align: center;
				top: 0;
			}

			.type-5 {
				background-color: #ec6a6a;
			}

			.type-4 {
				background-color: #4ab0ff;
			}
		}
	}
</style>