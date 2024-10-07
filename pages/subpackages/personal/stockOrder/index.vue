<template>
	<view class="myPickingList">
		<xls-jy-navbar title="我的备货单" bgColor="#f5f6f7"></xls-jy-navbar>
		<xls-search placeholder="输入单号查询" marLeft="-5em" @comfirn="stratesSearch"></xls-search>
		<!-- 日历 -->
		<xls-calendar :show="showDate" @close="() => { showDate = false }" @confirm="onConfirm"
			:defaultDate="[params.startTime, params.endTime]"></xls-calendar>
			
		<view class="state-filter-panel">
			<view class="state-item" v-for="item in stateList" :key="item.id"
				:class="{'active-item':params.state == item.id}" @click="changeState(item.id)">
				{{ item.stateValue }}
			</view>
		</view>
		<!-- 备货单 -->
		<view class="picking-list-wrapper">
			<view class="list-cell-item" v-for="(item, index) in stockList" :key="index">
				<view class="cell-head">
					<span class="order-no">备货单号: {{ item.stockNo }}</span>
					<span class="date-text"> {{ item.createTime }} </span>
				</view>
				<view class="cell-content" @click="goTo(item.stockNo)">
					<view class="cell-info">
						<p class="count">
							<span class="count-value">{{ item.choiceTotal }} 个</span>
							<span class="count-label">备货总数</span>
						</p>
						<p class="place count">
							<span class="place-value">{{ item.placeTotal }} 个</span>
							<span class="place-label count-label">补货场地</span>
						</p>
					</view>
					<p class="arrow">
						<u-icon name="arrow-right" size="36" color="#999" />
					</p>
				</view>
			</view>
			<xls-bottom v-if="stockList.length" />
			<xls-empty v-else></xls-empty>
		</view>
		<!-- 生成二维码 -->
		<view class="bottom-wrapper">
			
			<view class="btn-wrapper" @click="showPickQs = !showPickQs">
				生成备货二维码
			</view>
		</view>
		
		<u-popup :show="showPickQs" mode="bottom" @close="() => {
			showPickQs = !showPickQs
		}">
			<view class="showPickQs">
				<view class="title-wrapper">备货二维码</view>
				<view class="qrcode-content">
					
				</view>
				<view class="qrcode-desc">长按二维码，保存或发送给朋友</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js'

	export default {
		data() {
			return {
				stateList: [{
						id: 0,
						stateValue: "未处理"
					},
					{
						id: 1,
						stateValue: "部分出库"
					},
					{
						id: 2,
						stateValue: "已出库"
					},
					{
						id: 3,
						stateValue: "已完成"
					},
					{
						id: 4,
						stateValue: "已拒绝"
					},
				],
				showPickQs: false,
				params: {
					search: null,
					state: 0, //状态 0：未处理，1：部分出货 ，2：已出货，3：已完成，4：已拒绝
					startTime: null,
					endTime: null,
				},
				stockList: [],
				showDate: false,
			};
		},
		onLoad() {
			this.getStock()
		},
		methods: {
			async getStock() {
				let res = await shjController.getMyStock(this.params)
				if (res.code == 200) {
					this.stockList = res.data
				}
			},
			changeState(id) {
				this.params.state = id
				this.getStock()
			},
			//选择日期
			onConfirm(date) {
				const [startTime, endTime] = date
				this.showDate = false
				this.params.startTime = startTime
				this.params.endTime = endTime
				this.getStock()
			},
			stratesSearch(value) {
				this.params.search = value
				this.getStock()
			},
			goTo(stockNo) {
				this.$goTo("/pages/subpackages/personal/stockOrder/detail", "navigateTo", {
					stockNo
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.myPickingList {
		width: 100%;
		padding-bottom: 60px;
	}

	.state-filter-panel {
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 0 10px;
		font-size: 14px;

		.state-item {
			border-bottom: 2.5px solid #fff;
			flex: 1;
			line-height: 15px;
			padding: 14px 0;
			text-align: center;
		}

		.active-item {
			border-color: #5241FF;
			color: #5241FF;
		}
	}

	.picking-list-wrapper {
		padding: 10px;

		.list-cell-item {
			background-color: #fff;
			border-radius: 5px;
			margin-bottom: 10px;
			padding: 0 15px;

			.cell-head {
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				line-height: 15px;
				padding: 17.5px 0;

				.order-no {
					flex: 1;
					font-size: 14px;
				}

				.date-text {
					font-size: 12px;
					color: #999;
				}
			}

			.cell-content {
				display: flex;
				align-items: center;
				padding: 10px 0;

				.cell-info {
					flex: 1;
					display: flex;
					align-items: center;

					.count {
						display: flex;
						flex-direction: column;
						margin-right: 50px;
						text-align: center;

						.count-value {
							color: #5241FF;
							font-size: 16px;
							line-height: 20px;
						}

						.count-label {
							color: #999;
							font-size: 14px;
							line-height: 16px;
						}

						.place-value {
							font-size: 16px;
						}
					}
				}
			}
		}
	}

	.bottom-wrapper {
		bottom: 0;
		left: 0;
		padding: 5px 10px;
		position: fixed;
		width: 100%;
		box-sizing: border-box;

		.btn-wrapper {
			font-size: 17px;
			width: 100%;
			height: 45px;
			text-align: center;
			line-height: 45px;
			border-radius: 6px;
			background: #5241FF;
			color: #fff;
		}
	}

	.showPickQs {
		width: 100%;

		.title-wrapper {
			line-height: 50px;
			border-bottom: 1px solid #e5e5e5;
			font-size: 17px;
			text-align: center;
		}

		.qrcode-content {
			background: #fff;
			margin: 20px auto 0;
			overflow: hidden;
		}

		.qrcode-desc {
			color: #000;
			text-align: center;
			font-size: 14px;
			line-height: 15px;
			margin-bottom: 25px;
		}
	}
</style>