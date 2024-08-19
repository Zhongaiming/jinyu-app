<template>
	<view class="money-content">
		<xls-jy-navbar title="钱包" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>
		<view class="wallet">
			<view class="money-box">
				<view class="balance-box">
					<p class="balance-label">余额(元)</p>
					<p class="balance-text">
						{{walletBagInfo.walletBalance || "0.00"}}
						<image :src="`${$baseUrl}appV4/authentications/money-back.png`" alt="" class="balance-sign"
							mode="widthFix" />
					</p>
				</view>
				<view class="ad-income-box">
					<view class="ad-income-list">
						<p class="ad-income-label">今日总收入(元)</p>
						<p class="ad-income-text">{{walletBagInfo.todayIncome || '0.00'}}</p>
					</view>
					<view class="ad-income-list">
						<p class="ad-income-label">昨日总收入(元)</p>
						<p class="ad-income-text">{{walletBagInfo.yesterdayIncome || '0.00'}}</p>
					</view>
				</view>
			</view>

			<view class="btn-outside">
				<view class="btn-bg"></view>
				<view class="btn-wrapper">
					<view class="btn-list" v-hasPermi="['app:payBag:index:bill']" @click="goTo('dailyBill')">
						<image :src="`${$baseUrl}appV4/authentications/bill.png`" alt="" class="btn-icon"
							mode="widthFix" />
						<p class="btn-text">每日账单</p>
					</view>
					<view class="btn-list" @click="$toast('敬请期待~')">
						<image :src="`${$baseUrl}appV4/authentications/subsidy.png`" alt="" class="btn-icon"
							mode="widthFix" />
						<p class="btn-text">平台补贴</p>
					</view>
					<view class="btn-list" @click="$toast('敬请期待~')">
						<!--  @click="$router.push('/moneyBag/withdrawRecord')" -->
						<image :src="`${$baseUrl}appV4/authentications/record.png`" alt="" class="btn-icon"
							mode="widthFix" />
						<p class="btn-text">提现记录</p>
					</view>
				</view>
			</view>

			<view class="card-box" v-if="userType != 5">
				<!-- 银行卡 -->
				<view class="card-list" v-hasPermi="['app:payBag:index:bank']" v-if="bankList.length" @click="goTo('bankCard')">
					<image :src="`${$baseUrl}appV4/authentications/card.png`" alt="" class="card-icon"
						mode="widthFix" />
					<p class="card-text card-con">银行卡</p>
					<p class="card-text bank-card bad bank-info">{{bankList.length}} 张</p>
					<p class="right-sign">&gt;</p>
				</view>
				<!-- 实名认证 -->
				<view class="card-list" v-hasPermi="['app:payBag:index:authenticate']" @click="goTo('merchantCA')"
					v-else>
					<image :src="`${$baseUrl}appV4/authentications/check.png`" alt="" class="card-icon"
						mode="widthFix" />
					<p class="card-text card-con">实名认证</p>
					<p class="card-text success" v-if="bankList.length">已认证</p>
					<p class="card-text bad" v-else>未认证</p>
					<p class="right-sign">&gt;</p>
				</view>
				<!-- 认证记录 -->
				<view class="card-list" @click="goTo('authentication')">
					<image :src="`${$baseUrl}appV4/authentications/card.png`" alt="" class="card-icon"
						mode="widthFix" />
					<p class="card-text card-con">认证记录</p>
					<p class="card-text success" v-if="bankList.length">已认证</p>
					<p class="card-text bad" v-else>未认证</p>
					<p class="right-sign">&gt;</p>
				</view>
			</view>

			<view class="question-box" @click="goTo('walletQuestion')">
				<p class="question-text">钱包常见问题</p>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		merchantController
	} from '@/api/index.js';

	export default {
		name: "moneyBag",
		data() {
			return {
				userType: 0,
				bankList: [],
				walletBagInfo: [],

			};
		},
		beforeCreate() {
			let image = new Image();
			image.src = `${this.$baseUrl}appV4/example/bing-card.png`;
			image.onload = () => {};
		},
		async created() {
			this.getHlbEntryList();
		},
		methods: {
			goTo(item) {
				if(item === 'authentication' && !this.bankList.length) {
					return this.$toast("您还没有认证记录~")
				}
				this.$goTo(`/pages/subpackages/merchant/${item}/index`)
			},
			async getHlbEntryList() {

				merchantController.getListHlbEntryAction().then(res => {
					if (res.code === 200) {
						this.bankList = res.data;
					}
				})
				// 查询钱包余额和收益信息
				// var wallet = await getWalletIncome();
				// if (wallet.data.code == 0 || wallet.data.msg == "ok") {
				// 	this.walletBagInfo = wallet.data.data;
				// }
			},
		},
	};
</script>

<style lang="scss" scoped>
	.money-content {
		background: #f5f5f5;
		height: 100vh;
		width: 100%;
		overflow: auto;
	}

	.wallet {
		.money-box {
			background-color: #5241ff;
			height: 174px;

			.balance-box {
				padding-top: 20px;
				text-align: center;

				.balance-label {
					color: #fff;
					font-family: PingFang SC;
					font-size: 14px;
					font-weight: 400;
					height: 20px;
					line-height: 20px;
					opacity: 0.56;
				}

				.balance-text {
					align-items: center;
					color: #fff;
					display: flex;
					font-family: DIN Alternate;
					font-size: 28px;
					font-weight: 700;
					height: 32px;
					justify-content: center;
					line-height: 32px;
					margin-top: 8px;
					opacity: 1;
					overflow: hidden;
					white-space: nowrap;

					.balance-sign {
						display: inline-block;
						height: 16px;
						margin-left: 4px;
						width: 16px;
					}
				}
			}

			.ad-income-box {
				display: flex;
				margin-top: 23px;
				box-sizing: border-box;

				.ad-income-list {
					flex: 1;
					text-align: center;

					.ad-income-label {
						color: #fff;
						font-family: PingFang SC;
						font-size: 13px;
						font-weight: 400;
						height: 18px;
						line-height: 18px;
						opacity: 0.56;
					}

					.ad-income-text {
						color: #fff;
						font-family: DIN Alternate;
						font-size: 18px;
						font-weight: 700;
						height: 21px;
						line-height: 21px;
						margin-top: 4px;
						opacity: 1;
						overflow: hidden;
						white-space: nowrap;
					}
				}
			}
		}

		.btn-outside {
			.btn-bg {
				background-color: #5241ff;
				height: 26px;
			}

			.btn-wrapper {
				align-items: center;
				background-color: #fff;
				border-radius: 12px;
				display: flex;
				height: 72px;
				margin: -26px 12px 0;

				.btn-list {
					flex: 1;
					text-align: center;

					.btn-icon {
						display: block;
						margin: 0 auto;
						width: 26px;
					}

					.btn-text {
						color: #333;
						font-family: PingFang SC;
						font-size: 14px;
						font-weight: 400;
						height: 20px;
						line-height: 20px;
						margin-top: 8px;
					}
				}
			}
		}

		.card-box {
			background-color: #fff;
			border-radius: 12px;
			margin: 12px;
			padding: 0 12px;

			.card-list {
				align-items: center;
				display: flex;
				flex-wrap: nowrap;
				padding: 12px 0;

				.card-icon {
					width: 22px;
				}

				.card-con {
					color: #333;
					flex: 1;
					margin-left: 8px;
				}

				.card-text {
					font-family: PingFang SC;
					font-size: 14px;
					font-weight: 400;
					height: 20px;
					line-height: 20px;
				}

				.bank-card {
					color: #999;
				}

				.bank-info {
					min-width: 120px;
					text-align: right;
				}

				.right-sign {
					color: #666;
					font-size: 16px;
					margin-left: 8px;
				}
			}

			.card-list:not(:first-child) {
				border-top: 1px solid #ebebeb;
			}
		}

		.question-box {
			bottom: 32px;
			left: 50%;
			position: fixed;
			transform: translateX(-50%);

			.question-text {
				color: #5241ff;
				font-family: PingFang SC;
				font-size: 13px;
				font-weight: 400;
				height: 20px;
				line-height: 20px;
			}
		}
	}

	.bank-list {
		width: 230px;
		max-height: 380px;
		background: #fff;
		border-radius: 12px;
		padding-left: 12px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.title-txt {
			font-size: 15px;
			text-align: center;
			padding: 5px 0;
			font-weight: 700;
		}

		.list-content {
			flex: 1;
			padding: 5px 0;
			box-sizing: border-box;
			overflow-y: scroll;

			.list-item {
				display: flex;
				line-height: 40px;
				border-bottom: 1px solid rgb(233, 230, 230);
				padding-left: 5px;
				margin-right: 5px;
				box-sizing: border-box;
				font-size: 13px;

				.bank-name {
					flex: 1;
				}

				.bank-num {
					padding: 0 5px;
				}

				.back {
					padding-left: 5px;
					line-height: 40px;
					font-size: 15px;
				}
			}
		}

		.earth {
			text-align: center;
			font-size: 10px;
			color: #999;
			width: 100%;
		}
	}

	.success {
		color: #50cb4f;
	}

	.bad {
		color: red;
	}

	.info {
		color: #999;
	}
</style>