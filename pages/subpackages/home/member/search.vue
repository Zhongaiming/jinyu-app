<template>
	<view class="xls-search-member-page">
		<view class="xls-search-input">
			<u-icon name="arrow-left" size="36" color="#999" @click="goTo"></u-icon>
			<view class="xls-search" :class="{'xls-search--show-action': isButtonVisible}">
				<view class="xls-search__content">
					<u-icon name="search" size="40" color="#323233"></u-icon>
					<input type="search" placeholder="搜索昵称/会员ID" class="xls-field__control" ref="searchInput"
						@focus="showButton" @blur="hideButton" v-model="inputValue" @confirm="getList">
				</view>
			</view>
			<view v-if="isButtonVisible" class="xls-search__button">取消</view>
		</view>
		<view class="history-wrapper" v-if="!cancelAction">
			<view class="title-wrapper">
				<view class="title">搜索历史</view>
				<view class="btn" @click="deleteHistory">清空</view>
			</view>
			<view class="history-list">
				<span v-show="!historyList.length" class="null-history">---暂无搜索历史---</span>
				<view class="item" v-show="historyList.length" v-for="(value, index) in historyList" :key="index"
					@click="quicklySearch(value)">
					{{ value }}
				</view>
			</view>
		</view>
		
		<view class="xls-list" v-if="dataList.length && cancelAction">
			<view v-for="(item, index) in dataList" :key="index" class="xls-list-item">
				<view class="list-item">
					<view class="user-list">
						
						<view class="content">
							<view class="info-container">
								<view class="avatar">
									<xls-image :src="item.url" alt="" class="img" v-if="item.url" />
								</view>
								<view class="info">
									<view class="name-wrapper">
										<view class="top">
											<view class="icon-image icon">
												<!-- item.platformState  1 微信  2 支付宝 -->
												<image :src="`${$baseUrl}appV4/member/Alipay.png`" alt=""
													class="img" v-if="item.memberOpenid * 1 > 0" />
												<image :src="`${$baseUrl}appV4/member/WeChat2.png`" alt=""
													class="img" v-else />
											</view>
											<view class="nickname">{{ item.name }}</view>
										</view>
										<view class="desc">
											<span>最近消费:
												{{ item.recentConsumption * 1? item.recentConsumption + "天前": "今天"}}</span>
										</view>
									</view>
									<view class="other-info">
										<view class="id">ID:{{ item.id }}</view>
										<view class="copy" @click.stop="copyMemberId(item.id)">
											<span class="text">复制</span>
										</view>
									</view>
								</view>
							</view>
							<view class="data-container">
								<view class="data-list">
									<view class="number">{{ $formatAmount(item.totalPay) }}</view>
									<view class="name"><span>累计支付(元)</span></view>
								</view>
								<view class="data-list">
									<view class="number">{{ $formatAmount(item.balance) }}</view>
									<view class="name"><span>余额(元)</span></view>
								</view>
								<view class="data-list">
									<view class="number">{{ item.currency }}</view>
									<view class="name"><span>余币(个)</span></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<xls-bottom></xls-bottom>
		</view>
		<xls-empty v-if="!dataList.length && cancelAction" />
	</view>
</template>

<script>
	import {
		copyEvent
	} from "@/plugins/formUtils";
	import {
		memberController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				inputValue: '',
				isButtonVisible: false,
				historyList: [],
				cancelAction: false,
				dataList: [],
			}
		},
		methods: {
			//copy-会员ID
			copyMemberId(memberId) {
				copyEvent(memberId);
			},
			showButton() {
				this.cancelAction = true
				this.isButtonVisible = true; // 获取焦点时显示按钮
			},
			hideButton() {
				this.isButtonVisible = false; // 失去焦点时隐藏按钮
			},
			handleClick() {
				this.$refs.searchInput.blur(); // 点击按钮时使 input 失去焦点
			},
			//历史搜索
			quicklySearch(value) {
				this.inputValue = value;
			},
			//存取搜索记录
			setHistory() {
				let arr = local.get("historyList") || [];
				if (!arr.includes(this.inputValue) && this.inputValue) {
					//不为空且不重复
					arr.unshift(this.inputValue);
				}
				if (arr.length > 10) {
					arr.pop(); //删除最后一位 shift() 删除第一位
				}
				// local.set("historyList", arr);
				// this.historyList = local.get("historyList");
			},
			//清空搜索记录
			deleteHistory() {
				this.$modal("确定要清空搜索历史记录吗？", {
						title: "温馨提示",
						width: "270",
						confirmButtonText: "清空",
					})
					.then(() => {
						// local.remove("historyList");
						this.historyList = [];
					})
					.catch(() => {});
			},
			goTo() {
				uni.navigateBack();
			},
			getList() {
				this.$loading()
				memberController.getList({
					page: 1,
					size: 50,
					search: this.inputValue,
				}).then(res => {
					this.$hideLoading()
					if (res.code === 200) {
						this.dataList = res.data;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';
	
	.xls-search-input {
		padding-left: 10px;
		display: flex;
		align-items: center;
		background: #fff;
	}

	.xls-search {
		padding: 10rpx 32rpx;
		flex: 1;

		.xls-search__content {
			background: #edeef0;
			border-radius: 16rpx;
			padding-left: 24rpx;
			padding-right: 20rpx;
			display: flex;
			align-items: center;

			.xls-field__control {
				margin-left: 10rpx !important;
				display: block;
				box-sizing: border-box;
				width: 100%;
				min-width: 0;
				margin: 0;
				padding: 0;
				color: #323233;
				line-height: 56rpx;
				height: 56rpx;
				text-align: left;
				background-color: transparent;
				border: 0;
				resize: none;
				font-size: 28rpx;
			}
		}
	}

	.xls-search--show-action {
		padding: 10rpx 0 10rpx 32rpx;
	}

	.xls-search__button {
		padding: 0 24rpx;
		color: #323233;
		font-size: 28rpx;
		cursor: pointer;
		line-height: 56rpx;
		height: 56rpx;
		-webkit-user-select: none;
		user-select: none;
	}

	.history-wrapper {
		background: #fff;
		padding-bottom: 24rpx;

		.title-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 24rpx;
			font-size: 24rpx;
			color: #999;

			.btn {
				color: #5241ff;
			}
		}

		.history-list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 0 24rpx;

			.null-history {
				color: #999;
				width: 100%;
				text-align: center;
				font-size: 24rpx;
			}

			.item {
				margin-right: 16rpx;
				padding: 8rpx;
				display: flex;
				align-items: center;
				white-space: nowrap;
				color: #666;
				background: #f5f5f5;
				font-size: 24rpx;
				border-radius: 16rpx;
				margin-bottom: 16rpx;
			}
		}
	}
</style>