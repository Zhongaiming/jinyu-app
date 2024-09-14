<template>
	<view class="sub-detail">
		<view class="title-name-wrapper">{{ date }} 分成金额明细：</view>
		<xls-search placeholder="输入场地搜索" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>
		<view class="table-content-panel">
			<view class="cell">场地</view>
			<view class="cell">
				<view>
					<view>总收益</view>
					<view>(在线支付)</view>
				</view>
				<u-icon name="question-circle" size="32" color="#999" @click="explainMetheds(1)" />
			</view>
			<view class="cell">
				分成金额(元)<u-icon name="question-circle" size="32" color="#999" @click="explainMetheds" />
			</view>
			<view class="cell">
				分成比例<u-icon name="question-circle" size="32" color="#999" @click="explainMetheds" />
			</view>
		</view>
		<view class="detail-wrapper-list">
			<view class="table-content-panel p-text" v-for="(item, index) in detailList" :key="index">
				<view class="cell w-table">{{ item.placeName }}</view>
				<view class="cell">{{ $formatAmount(item.amountTotal) }}</view>
				<view class="cell">{{ $formatAmount(item.separateMoney) }}</view>
				<view class="cell">{{ item.proportion }}%</view>
			</view>
			<xls-bottom v-if="detailList.length" />
			<xls-empty v-else />
		</view>
		<view class="table-content-panel s-table-bom-panel">
			<view class="cell">合计</view>
			<view class="cell">{{ $formatAmount(amountTotal) }}</view>
			<view class="cell">{{ $formatAmount(separateMoney) }}</view>
			<view class="cell"></view>
		</view>
	</view>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	import suan from "@/plugins/floastCalculate";

	export default {
		name: "subDetail",
		data() {
			return {
				appMerchantCode: null,
				date: null,
				detailList: [],
				searchValue: null,
				amountTotal: 0,
				separateMoney: 0,
			};
		},
		onLoad(option) {
			let params = {};
			if (option.params) {
				params = JSON.parse(option.params);
				this.date = params.date;
				this.appMerchantCode = params.appMerchantCode;
				this.getDetail();
			}
		},
		methods: {
			async getDetail() {
				let res = await separateController.getPlaceMoney({
					appMerchantCode: this.appMerchantCode,
					startTime: this.date,
					endTime: this.date,
					search: this.searchValue ? encodeURIComponent(this.searchValue) : null,
				});
				if (res.data) {
					this.detailList = res.data;
					this.amountTotal = 0;
					this.separateMoney = 0;
					this.detailList.forEach((element) => {
						this.amountTotal = suan.add(element.amountTotal * 1, this.amountTotal);
						this.separateMoney = suan.add(
							element.separateMoney * 1,
							this.separateMoney
						);
					});
				}
			},
			//搜索
			stratesSearch(search) {
				this.searchValue = search;
				this.getDetail();
			},
			explainMetheds(type) {
				let title = type == 1 ? "总收益" : "温馨提示";
				let message =
					type == 1 ?
					"这里的“总收益”，是指设置了收益分成的场地的在线支付总收益。" :
					"如果您的上游代理商（或品牌商）设置了分成比例，那么代理商关联的设备会扣除掉代理商的分账金额，剩余的金额再交由您进行分账处理。即此处显示的【分成比例】只对设备上扣除代理商分账金额后的剩余金额生效。";
				this.$modal(message, {
						showCancel: false,
						confirmText: "我知道了",
						confirmColor: "#5241FF",
					})
					.then(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.sub-detail {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #F5F6F7;

		.title-name-wrapper {
			margin-top: 24rpx;
			padding: 14rpx 20rpx;
			background: #fff;
			color: #8994a7;
			font-size: 26rpx;
		}

		.table-content-panel {
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #ebeceb;
			text-align: center;
			padding: 20rpx 0;
			color: #8994a7;
			font-size: 26rpx;

			.cell {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.s-table-bom-panel {
			background: #F5F6F7;
			color: #000;
			font-size: 30rpx;
		}

		.w-table {
			color: #8f8f94;
		}

		.p-text {
			color: #000;
		}

		.detail-wrapper-list {
			flex: 1;
			overflow-y: scroll;
			background: #fff;
			padding: 0 20rpx;
		}
	}
</style>