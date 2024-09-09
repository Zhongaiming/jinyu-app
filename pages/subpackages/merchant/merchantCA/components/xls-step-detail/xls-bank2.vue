<template>
	<u-popup :show="bankPopup" position="bottom" :overlayStyle="{'touch-action':'none'}">
		<view class="bank-main-popup">
			<z-paging ref="bankPaging" v-model="dataList" @query="queryList">
				<view slot="top">
					<view class="header">
						<view class="sides" @click.stop="bankPopup = false">
							<image :src="`${$baseUrl}appV4/img/back-small.png`" class="image" />
						</view>
						<view class="title">开户银行</view>
						<view class="null-sides">
							<!-- <image :src="`${$baseUrl}appV4/img/icons/home.png`" class="Img" /> -->
						</view>
					</view>

					<view class="input-box-wrapper">
						<view class="input-content">
							<image :src="`${$baseUrl}appV4/common/search.png`" alt="" class="search-icon" />
							<input type="text" v-model="searchValue" @keyup.13="searchMethod" placeholder="请输入关键词"
								class="search-input" />
							<view class="confirm-btn" @click="searchMethod">确定</view>
						</view>
					</view>
				</view>

				<view class="bank-list">
					<view class="mint-bank" @click="pickSimplify(bank)" v-for="(bank, index) in dataList" :key="index">
						<view class="serial-number">{{ index + 1 }}</view>
						<view>{{ bank.bankName }}</view>
					</view>
				</view>

				<xls-empty slot="empty"></xls-empty>
			</z-paging>
		</view>
	</u-popup>
</template>

<script>
	import {
		merchantController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				bankPopup: false,
				dataList: [],
				type: "Simplify", // Simplify Bank
				searchValue: "",
			};
		},
		methods: {
			queryList(pageNo, pageSize) {
				const value = encodeURIComponent(this.searchValue);
				merchantController[`get${this.type}List`]({
					pageNo: pageNo,
					pageSize: pageSize,
					bankName: value,
					simplify: value,
					city: ""
				}).then(res => {
					this.$refs.bankPaging.complete(res.data.dataList);
				})
			},
			searchMethod() {
				if (!this.searchValue) {
					return this.$toast("请输入关键词搜索~");
				}
				this.$nextTick(() => {
					if (this.$refs.bankPaging) {
						this.$refs.bankPaging.reload();
					}
				})
			},
			openSimplifyBank(type) {
				this.type = type;
				this.bankPopup = true;
			},
			pickSimplify(bank) {
				bank['type'] = this.type;
				this.bankPopup = false;
				this.$emit('getSimplifyBank', bank);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.bank-main-popup {
		width: 100%;
		height: 100vh;
		background: #fff;
	}

	.header {
		height: 48px;
		padding: 0 12px;
		display: flex;
		align-items: center;
		background: #f5f6f7;
		justify-content: space-between;
		font-size: 16px;

		.sides {
			width: 31px;
			height: 31px;
			border-radius: 50%;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;

			.image {
				width: 17px;
				height: 17px;
			}
		}

		.null-sides {
			width: 31px;
		}
	}

	.input-box-wrapper {
		padding: 8px 12px;
		background: #fff;

		.input-content {
			border: 3px solid #5241ff;
			height: 46px;
			border-radius: 46px;
			padding: 5px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			overflow: hidden;

			.search-icon {
				width: 18px;
				height: 16px;
				margin-right: 10px;
				margin-left: 5px;
			}

			.search-input {
				flex: 1;
				height: 100%;
				border: none;
				margin: 0;
				padding: 0;
				font-size: 15px;
				box-sizing: border-box;
			}

			.confirm-btn {
				padding: 0 15px;
				margin-left: 10px;
				color: #fff;
				font-size: 13px;
				height: 100%;
				background: #5241ff;
				border-radius: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s;
			}

			.confirm-btn:active {
				color: #000;
				background: #f0eff5;
				transition: all 0s;
			}
		}
	}

	.bank-list {
		padding: 0 12px;
		background: #fff;

		.mint-bank {
			min-height: 48px;
			box-sizing: border-box;
			padding: 10px;
			border-bottom: 1px solid rgb(240, 237, 237);
			font-size: 16px;
			display: flex;
			align-items: center;

			.serial-number {
				margin-right: 12px;
				font-size: 13px;
			}
		}

		.mint-bank:active {
			background: #f5f6f7;
			border-radius: 48px;
		}

	}
</style>