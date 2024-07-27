<template>
	<div class="everydayBill">
		<xls-jy-navbar title="钱包" bgColor="#f5f6f7"></xls-jy-navbar>
		<div class="list-wrapper home-family">
			<div class="header">
				<div class="header-left">
					<p class="day">{{ dataTxt }}</p>
					<p class="income" v-html="'总收益:' + (monthInfo ? monthInfo : '0.00') + '元'"></p>
				</div>
				<div class="header-right" @click="personDatetime = !personDatetime">
					<!-- <img src="@/assets/authentications/week.png" alt="" class="btn-icon" /> -->
				</div>
			</div>
			<div class="content">
				<div class="content-panel">
					<div class="list">
						<div class="left-table" @click="isClose = false">
							<ul class="content-title">
								<li class="talbe-column-title talbe-column table-date table-test">
									日期
								</li>
							</ul>
							<div class="list-item content-title left-table"
								v-for="(item, index) in dataList.slice(0, lengthAll)" :key="index">
								<span class="talbe-column table-date">{{ item.date }}</span>
							</div>
						</div>

						<div class="right-table" @click="isClose = true">
							<ul class="content-title" :class="isClose ? 'table-open-line' : ''">
								<li class="talbe-column-title talbe-column table-total"
									:class="isClose ? 'table-open' : ''">
									总收益
								</li>
								<li class="talbe-column-title talbe-column table-pay-income"
									:class="isClose ? 'table-open' : ''">
									线上交易总额
									<div class="linear" v-show="!isClose"></div>
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
							<div class="list-item content-title" :class="isClose ? 'table-open-line' : ''"
								v-for="(item, index) in dataList.slice(0, lengthAll)" :key="index">
								<span class="talbe-column table-total"
									:class="isClose ? 'table-open' : ''">{{ item.totalIncome }}</span>
								<span class="talbe-column table-pay-income"
									:class="isClose ? 'table-open' : ''">{{ item.onlineIncome }}
									<div class="linear" v-show="!isClose"></div>
								</span>
								<span class="talbe-column table-open" v-show="isClose">{{
                    item.subsidyIncome
                  }}</span>
								<span class="talbe-column table-open" v-show="isClose">{{
                    item.cashIncome
                  }}</span>
								<span class="talbe-column table-detail" v-hasPermi="['app:payBag:index:bill:resvied']"
									@click="getEarn(item.date, item.onlineIncome)"><span
										class="earn-info">查看</span></span>
							</div>
						</div>
					</div>
				</div>
				<p class="list-more" @click="
              dataList.length > 10 && lengthAll == 10
                ? (lengthAll = dataList.length + 1)
                : dataList.length == lengthAll - 1
                ? $toast('本月已全部加载~')
                : ''
            ">
					查看更多
				</p>
			</div>
		</div>
		<!--日期 -->
		<!-- <van-popup v-model="personDatetime" position="bottom" round>
				<van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate"
					:max-date="maxDate" @confirm="formatDate" @cancel="personDatetime = !personDatetime" />
			</van-popup> -->
	</div>
</template>

<script>
	// import {
	// 	getMonthIncome,
	// 	getDateIncome
	// } from "@/utils/api/wallet";
	// import suan from "@/plugins/floastCalculate";
	export default {
		name: "everydayBill",
		data() {
			return {
				isClose: false,
				personDatetime: false,
				minDate: new Date(new Date().getFullYear() - 1, 0, 1),
				maxDate: new Date(),
				currentDate: new Date(),
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
				dataList: [{
						"date": "2024-07-26",
						"totalIncome": 62,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 62
					},
					{
						"date": "2024-07-25",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-24",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-23",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-22",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-21",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-20",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-19",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-18",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-17",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-16",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-15",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-14",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-13",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-12",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-11",
						"totalIncome": 9,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 9
					},
					{
						"date": "2024-07-10",
						"totalIncome": 18,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 18
					},
					{
						"date": "2024-07-09",
						"totalIncome": 0.11,
						"onlineIncome": 0.11,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-08",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-07",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-06",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-05",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-04",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-03",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-02",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					},
					{
						"date": "2024-07-01",
						"totalIncome": 0,
						"onlineIncome": 0,
						"subsidyIncome": 0,
						"cashIncome": 0
					}
				],
				monthInfo: "0.00",
				lengthAll: 10,
			};
		},
		// created() {
		// 	this.getWalletInfo();
		// },
		methods: {
			formatDate(date) {
				this.pickTime = `${date.getFullYear()}-${
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      }`;
				this.dataTxt = `${date.getFullYear()}年${
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      }月`;
				this.personDatetime = !this.personDatetime;
				this.getWalletInfo();
			},
			async getWalletInfo() {
				this.loading();
				let dataIncome = await getDateIncome({
					date: this.pickTime
				});
				let monthIncome = await getMonthIncome({
					date: this.pickTime
				});
				this.clearing();
				if (dataIncome.data.code == 0 || dataIncome.data.msg == "ok") {
					this.dataList = dataIncome.data.data;
				}
				// if (monthIncome.data.code == 0 || monthIncome.data.msg == "ok") {
				//   this.monthInfo = monthIncome.data.data;
				// }
				this.monthInfo = this.dataList.reduce(
					(accumulator, currentValue) =>
					this.divideMethod(accumulator, currentValue.totalIncome),
					0
				);
			},
			divideMethod(a, b) {
				return suan.addFloast(a, b);
			},
			//分账到账
			async getEarn(data, income) {
				if (!income * 1) {
					return this.$toast("该天无线上收益~");
				}
				var reg1 = new RegExp("-", "g"); // 加'g'，删除字符串里所有的"-"
				var settleDate = data.replace(reg1, "");
				this.$router.push({
					name: "dayBillState",
					query: {
						settleDate
					},
				});
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