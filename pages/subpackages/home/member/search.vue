<template>
	<view class="xls-search-member-page">
		<view class="xls-search-input">
			<u-icon name="arrow-left" size="36" color="#999" @click="goTo"></u-icon>
			<view class="xls-search" :class="{'xls-search--show-action': isButtonVisible}">
				<view class="xls-search__content">
					<u-icon name="search" size="40" color="#323233"></u-icon>
					<input type="search" placeholder="搜索昵称/会员ID" class="xls-field__control" ref="searchInput"
						@focus="showButton" @blur="hideButton" v-model="inputValue">
				</view>
			</view>
			<view v-if="isButtonVisible" class="xls-search__button">取消</view>
		</view>
		<div class="history-wrapper" v-if="!cancelAction">
			<div class="title-wrapper">
				<div class="title">搜索历史</div>
				<div class="btn" @click="deleteHistory">清空</div>
			</div>
			<div class="history-list">
				<span v-show="!historyList.length" class="null-history">---暂无搜索历史---</span>
				<div class="item" v-show="historyList.length" v-for="(value, index) in historyList" :key="index"
					@click="quicklySearch(value)">
					{{ value }}
				</div>
			</div>
		</div>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				isButtonVisible: false,
				historyList: ['小米', '晚上加班', '五点'],
				cancelAction: false,
			}
		},
		methods: {
			showButton() {
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
				this.searchEnter = value;
				this.searchMember();
			},
			//存取搜索记录
			setHistory() {
				let arr = local.get("historyList") || [];
				if (!arr.includes(this.searchEnter) && this.searchEnter) {
					//不为空且不重复
					arr.unshift(this.searchEnter);
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
		}
	}
</script>

<style lang="scss" scoped>
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