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

			<view class="btn-outside home-family">
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
				<view class="card-list" v-hasPermi="['app:payBag:index:bank']">
					<image :src="`${$baseUrl}appV4/authentications/card.png`" alt="" class="card-icon"
						mode="widthFix" />
					<p class="card-text card-con">银行卡</p>
					<van-popover v-model="showBankcard" trigger="click" placement="top-end" v-if="0">
						<view class="bank-list">
							<view class="title-txt">选择银行卡</view>
							<view class="list-content">
								<view class="list-item" v-for="(bank, index) in bankList" :key="index" @click="
                      (showBankcard = false),
                        $router.push({
                          path: '/moneyBag/bankCard',
                          query: { orderNo: bank.orderNo },
                        })
                    ">
									<view class="bank-name text-over">
										卡{{ index + 1 }}:{{ bank.bankName }}
									</view>
									<!-- INIT:待审核, OVERRULE:申请驳回, AUDITED:审核通过, DOING:审核中 -->
									<view class="bank-num text-over" :class="
                        bank.entryStatus === 'AUDITED'
                          ? 'success'
                          : bank.entryStatus === 'OVERRULE'
                          ? 'bad'
                          : 'info'
                      ">
										{{
											bank.entryStatus === "INIT"
											  ? "待审核"
											  : bank.entryStatus === "OVERRULE"
											  ? "申请驳回"
											  : bank.entryStatus === "AUDITED"
											  ? "审核通过"
											  : bank.entryStatus === "DOING"
											  ? "审核中"
											  : "未知状态"
												}}
									</view>
									<p class="back">&gt;</p>
								</view>
								<view class="earth">到底了~</view>
							</view>
						</view>
						<template #reference>
							<p class="card-text bank-card bank-info" v-show="bankList.length">
								{{ bankList.length }}张
							</p>
						</template>
					</van-popover>

					<p class="card-text bank-card bad bank-info" v-show="!bankList.length" @click="$toast('您还未绑卡~')">
						未绑卡
					</p>
					<p class="right-sign">&gt;</p>
				</view>
				<!-- 实名认证 @click="goResigter" merchantCA-->
				<view class="card-list" v-hasPermi="['app:payBag:index:authenticate']" @click="goTo('authentication')"
					v-if="!bankList.length">
					<image :src="`${$baseUrl}appV4/authentications/check.png`" alt="" class="card-icon"
						mode="widthFix" />
					<p class="card-text card-con">实名认证</p>
					<p class="card-text success" v-if="bankList.length">已认证</p>
					<p class="card-text bad" v-else>未认证</p>
					<p class="right-sign">&gt;</p>
				</view>
				<!-- 认证记录 -->
				<view class="card-list" @click="
              bankList.length
                ? $router.push({
                    path: '/realNameattesta',
                    query: { five: 5 },
                  })
                : $toast('您还未绑卡~')
            ">
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
	// import { getWalletIncome } from "@/utils/api/wallet";
	// import { getListHlbEntry } from "@/utils/otherRequest/modules";
	// import local from "@/plugins/storage";
	// import { getDateAll } from "@/plugins/utilityClass";

	export default {
		name: "moneyBag",
		data() {
			return {
				userType: 0,
				walletBagInfo: [],
				merberInfo: [],
				showBankcard: false,
				bankList: [],
			};
		},
		beforeCreate() {
			let image = new Image();
			image.src = `${this.$baseUrl}appV4/example/bing-card.png`;
			image.onload = () => {};
		},
		// async created() {
		//   this.getHlbEntryList();
		// },
		methods: {
			goTo(item) {
				this.$goTo(`/pages/subpackages/merchant/${item}/index`)
			},
			async getHlbEntryList() {
				this.loading();
				let res = await getListHlbEntry();
				// 查询钱包余额和收益信息
				var wallet = await getWalletIncome();
				this.clearing();
				if (wallet.data.code == 0 || wallet.data.msg == "ok") {
					this.walletBagInfo = wallet.data.data;
				}
				this.userType = local.get("userType");
				if (res.data.data) {
					this.bankList = res.data.data;
				} else {
					this.bankList = [];
				}
				local.setSion("bankList", this.bankList);
			},
			goResigter() {
				//最多五次
				if (this.bankList.length >= 5) {
					return this.$dialog.alert({
						title: "温馨提示",
						message: "每个账户仅支持最多5次认证~",
						confirmButtonText: "我知道了",
						width: "270",
					});
				}
				let passOrForbidden = true;
				this.bankList.forEach((item) => {
					if (item.entryStatus != "AUDITED") {
						passOrForbidden = false;
					}
				});
				if (!passOrForbidden) {
					return this.$dialog.alert({
						title: "温馨提示",
						message: "检测到您的账号存在认证不通过记录，请您联系管理员解决后再进行认证~",
						confirmButtonText: "我知道了",
						width: "270",
					});
				}
				let today = getDateAll(0); //今天
				local.set("todayCreated", false);
				this.bankList.forEach((element) => {
					if (element.hlbOpenThePublicRecord) {
						let pickerDate =
							element.hlbOpenThePublicRecord.createTime.split("T")[0];
						if (today == pickerDate) {
							local.set("todayCreated", true);
						}
					}
				});
				//每天一次
				let isToday = local.get("todayCreated");
				if (isToday) {
					return this.$dialog.alert({
						title: "温馨提示",
						message: "检测到您的账号今天已存在注册记录，如果您仍需注册请于明天进行~",
						confirmButtonText: "我知道了",
						width: "270",
					});
				} else {
					this.$router.push("/realNameattesta");
				}
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