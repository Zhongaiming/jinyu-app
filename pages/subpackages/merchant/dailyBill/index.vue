<template>
	<view class="everydayBill">
		<xls-jy-navbar title="钱包" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="list-wrapper home-family">
			<view class="header">
				<view class="header-left">
					<p class="day">{{ dataTxt }}</p>
					<p class="income" v-html="'总收益:' + (monthInfo ? monthInfo : '0.00') + '元'"></p>
				</view>
				<view class="header-right" @click="personDatetime = !personDatetime">
					<xls-image :src="`${$baseUrl}appV4/authentications/week.png`" alt="" class="btn-icon" />
				</view>
			</view>
			<view class="content">
				<view class="content-panel">
					<view class="list">
						<view class="left-table" @click="isClose = false">
							<ul class="content-title">
								<li class="talbe-column-title talbe-column table-date table-test">
									日期
								</li>
							</ul>
							<view class="list-item content-title left-table"
								v-for="(item, index) in dataList.slice(0, lengthAll)" :key="index">
								<span class="talbe-column table-date">{{ item.date }}</span>
							</view>
						</view>

						<view class="right-table" @click="isClose = true">
							<ul class="content-title" :class="{'table-open-line':isClose}">
								<li class="talbe-column-title talbe-column table-total" :class="{'table-open':isClose}">
									总收益
								</li>
								<li class="talbe-column-title talbe-column table-pay-income"
									:class="{'table-open':isClose}">
									线上交易总额
									<view class="linear" v-show="!isClose"></view>
								</li>
								<li class="talbe-column-title talbe-column table-open" v-show="isClose">
									补贴总额
								</li>
								<li class="talbe-column-title talbe-column table-open" v-show="isClose">
									现金交易总额
								</li>
								<li class="talbe-column-title talbe-column table-detail"
									v-hasPermi="['app:payBag:index:bill:resvied']">
									结算到账情况
								</li>
							</ul>
							<view class="list-item content-title" :class="{'table-open-line':isClose}"
								v-for="(item, index) in dataList.slice(0, lengthAll)" :key="index">
								<span class="talbe-column table-total"
									:class="{'table-open':isClose}">{{ item.totalIncome }}</span>
								<span class="talbe-column table-pay-income"
									:class="{'table-open':isClose}">{{ item.onlineIncome }}
									<view class="linear" v-show="!isClose"></view>
								</span>
								<span class="talbe-column table-open" v-show="isClose">{{item.subsidyIncome}}</span>
								<span class="talbe-column table-open" v-show="isClose">{{item.cashIncome}}</span>
								<span class="talbe-column table-detail" v-hasPermi="['app:payBag:index:bill:resvied']"
									@click="getEarn(item.date, item.onlineIncome)"><span
										class="earn-info">查看</span></span>
							</view>
						</view>
					</view>
				</view>
				<p class="list-more" @click="
              dataList.length > 10 && lengthAll == 10
                ? (lengthAll = dataList.length + 1)
                : dataList.length == lengthAll - 1
                ? $toast('本月已全部加载~')
                : ''">
					查看更多
				</p>
			</view>
		</view>
		<!--日期 -->
		<u-datetime-picker :show="personDatetime" v-model="currentDate" mode="year-month" itemHeight="88"
			:maxDate="maxDate" :minDate="minDate" confirmColor="#5241ff" @cancel="() => {
			personDatetime = false
		}" @confirm="formatDate"></u-datetime-picker>
	</view>
</template>

<script>
	import {
		orderController
	} from "@/api/index.js";
	import suan from "@/plugins/floastCalculate";
	import {
		getDateAll
	} from '@/plugins/utilityClass';
	export default {
		name: "everydayBill",
		data() {
			return {
				isClose: false,
				personDatetime: false,
				minDate: new Date(getDateAll(365)).getTime(),
				maxDate: new Date(getDateAll(0)).getTime(),
				currentDate: getDateAll(0),
				// currentDate: new Date(),
				dataTxt: new Date().getFullYear() +
					"年" +
					(new Date().getMonth() + 1 > 9 ?
						new Date().getMonth() + 1 :
						"0" + (new Date().getMonth() + 1) + "月"),
				pickTime: new Date().getFullYear() +
					"-" +
					(new Date().getMonth() + 1 > 9 ?
						new Date().getMonth() + 1 :
						"0" + (new Date().getMonth() + 1)),
				dataList: [],
				monthInfo: "0.00",
				lengthAll: 10,
			};
		},
		created() {
			this.getWalletInfo();
		},
		methods: {
			formatDate(result) {
				const {
					value
				} = result
				const date = new Date(value);
				const year = date.getFullYear();
				const month = ('0' + (date.getMonth() + 1)).slice(-2);
				this.personDatetime = false;
				this.pickTime = `${year}-${month}`;
				this.dataTxt = `${year}年${month}月`;
				this.getWalletInfo();
			},
			async getWalletInfo() {
				let dataIncome = await orderController.getDateIncome({
					date: this.pickTime
				});

				if (dataIncome.code == 200) {
					this.dataList = dataIncome.data;
				}
				this.monthInfo = this.dataList.reduce(
					(accumulator, currentValue) =>
					this.viewideMethod(accumulator, currentValue.totalIncome),
					0
				);
			},
			viewideMethod(a, b) {
				return suan.addFloast(a, b);
			},
			//分账到账
			async getEarn(data, income) {
				if (!income * 1) {
					return this.$toast("该天无线上收益~");
				}
				var reg1 = new RegExp("-", "g"); // 加'g'，删除字符串里所有的"-"
				var settleDate = data.replace(reg1, "");
				this.$goTo("/pages/subpackages/merchant/dailyBill/detail", "navigateTo", {
					settleDate
				})
			},
		},
	};
</script>

<style lang="less" scoped>
	.everydayBill {
		width: 100%;
		overflow: auto;
	}

	.list-wrapper {
		font-size: 14px;

		.header {
			align-items: center;
			background: #fff;
			display: flex;
			height: 66px;
			justify-content: space-between;
			margin-bottom: 10px;
			padding: 0 15px;

			.header-left {
				.day {
					color: #000;
					font-size: 16px;
				}

				.income {
					color: #999;
					padding-top: 2px;
				}
			}

			.btn-icon {
				width: 30px;
			}

			.header-right-icon {
				// background: url(@/assets/authentications/bill-icon.png) no-repeat;
				display: inline-block;
				height: 30px;
				width: 32px;
				background-size: 100% 100%;
			}
		}

		.content {
			overflow-x: auto;

			.content-panel {
				margin-bottom: 50px;

				.list {
					display: flex;
					overflow: hidden;

					.talbe-column-title {
						border-top: 1px solid #d9d9d9;
					}

					.talbe-column {
						border-bottom: 1px solid #d9d9d9;
						border-right: 1px solid #d9d9d9;
						font-size: 14px;
						height: 44px;
						overflow: hidden;
						box-sizing: border-box;
						padding: 12px;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.left-table {
						.content-title {
							align-items: center;
							background: #fff;
							display: flex;
							font-size: 15px;
						}

						.table-date {
							flex-grow: 1;
							text-align: center;
							width: 111px;
						}

						.content-title {
							align-items: center;
							background: #fff;
							display: flex;
							font-size: 15px;
						}

						.left-table {
							width: 111px;
						}
					}

					.right-table {
						overflow: auto;

						.linear {
							background-image: linear-gradient(90deg,
									hsla(0, 0%, 100%, 0.3),
									#fff);
							bottom: 0;
							left: 0;
							position: absolute;
							right: 0;
							top: 0;
						}

						.content-title {
							align-items: center;
							background: #fff;
							display: flex;
							font-size: 15px;
						}

						.table-open-line {
							width: 567px;
						}

						.table-total {
							text-align: center;
							width: 78px;
							transition: width linear 0.3s;
						}

						.table-pay-income {
							position: relative;
							text-align: center;
							width: 65px;
							transition: width linear 0.3s;
						}

						.table-detail {
							text-align: center;
							width: 123px;
						}

						.table-open {
							text-align: center;
							width: 111px;
						}

						.earn-info {
							color: #5241ff;
						}
					}
				}
			}

			.list-more {
				color: #5241ff;
				font-size: 16px;
				text-align: center;
				margin-top: -20px;
			}
		}
	}
</style>