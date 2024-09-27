<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList" @scroll="scrollXls" :scrollX="true">
		<view ref="choose">
			<xls-jy-navbar title="兑币机表格显示" bgColor="#f5f6f7"></xls-jy-navbar>
			<view :style="{height}"></view>
			<ConditionScreening text="history" @getParams="getParams" ref="screen" class="select-content" />
		</view>
		<table border="0" class="table-gash" :class="{'zIndex': topTitle}">
			<thead :class="{'sticky': topTitle}">
				<tr>
					<th class="tex-center">
						<p style="width: 85px">设备编号</p>
					</th>

					<th class="tex-center">
						<p style="width: 80px">在线收益</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">充值支付</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">线上启动</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">现金收益</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">美团核销</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">抖音核销</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">口碑核销</p>
					</th>

					<th class="tex-center">
						<p style="width: 80px">取币总数</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">实际出币</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">充值币数</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">线上启动取币</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">会员取币</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">美团核销取币</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">抖音核销取币</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">口碑核销取币</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">现金购币</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">远程启动取币</p>
					</th>


					<th style="text-align: left">
						<p style="width: 150px">场地</p>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in dataList" :key="index">
					<th class="tex-center">
						<p style="width: 85px">{{ item.deviceNumber }}</p>
					</th>

					<th class="tex-center">
						<p style="width: 80px">{{ $formatAmount(item.onlineIncome) }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ $formatAmount(item.rechargePayIncome) }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ $formatAmount(item.onlineStartUpIncome) }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ $formatAmount(item.cashIncome) }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ $formatAmount(item.mtIncome) }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ $formatAmount(item.dyIncome) }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ $formatAmount(item.kbIncome) }}</p>
					</th>

					<th class="tex-center">
						<p style="width: 80px">{{ item.exchangeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ item.outPresentNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ item.rechargeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">{{ item.onlineStartUpExchangeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ item.memberExchangeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">{{ item.mtExchangeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">{{ item.dyExchangeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">{{ item.kbExchangeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 80px">{{ item.cashExchangeNumber }}</p>
					</th>
					<th class="tex-center">
						<p style="width: 120px">{{ item.remoteStartExchangeNumber }}</p>
					</th>

					<th style="text-align: left" class="flex text-over">
						<p style="width: 150px">{{ item.placeName }}</p>
					</th>
				</tr>
			</tbody>
		</table>
		<xls-empty slot="empty"></xls-empty>
	</z-paging>
</template>

<script>
	import ConditionScreening from "../components/conditionScreening.vue";
	import {
		deviceDataController
	} from "@/api/index.js";

	export default {
		components: {
			ConditionScreening
		},
		data() {
			return {
				topTitle: false,
				dataList: [],
				params: {
					sort: null, // 排序的变量名
					sortDirection: null, //asc 正序，desc 反序
				},
				height: '132px',
				chooseHeight: 0
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.$refs.screen.quickTime(4)
				this.height = this.$refs.screen.$el.clientHeight + 'px'
				this.chooseHeight = this.$refs.choose.$el.clientHeight // 或者使用 offsetHeight
			});
		},
		methods: {
			//纵向
			scrollXls(e) {
				const scrollTop = e.detail.scrollTop
				if (this.$refs.choose) {
					this.topTitle = scrollTop >= this.chooseHeight
				}
			},
			getParams(data) {
				this.params = Object.assign(this.params, data)
				this.$refs.paging.reload()
			},
			queryList(pageNo, pageSize) {
				this.$loading();
				deviceDataController.getDbjData({
					ndjDataVo: {
						page: pageNo,
						size: pageSize,
						...this.params
					}
				}).then(res => {
					this.$hideLoading();
					if (res.code == 200) {
						this.$refs.paging.complete(res.data.dataList)
					}
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.select-content {
		position: fixed;
		left: 0;
		right: 0;
		top: 44px;
		z-index: 99;
	}

	.sticky {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	
	.zIndex {
		z-index: 999;
		position: relative;
	}

	.table-gash {
		font-size: 14px;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		border-collapse: collapse;
		border-spacing: 0;
		text-indent: initial;
		background: #fff;
		transition: all 0.5s ease-in-out;

		thead {
			background: #e6e4fe;
			font-size: 11px;

			th {
				height: 40px;
				margin-left: 20px;
				padding: 0 2px;
			}

			p {
				box-sizing: content-box;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.desc {
				color: #ccc;
				font-size: 10px;
				text-align: center;
			}

			.txt-center {
				text-align: center;
			}
		}

		tbody {
			background: #fff;

			tr {
				border-bottom: 1px solid #e6e6e6;
				height: 40px;

				td {
					padding: 0 2px;

					span {
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 14px;
					}

					.text-history {
						color: #f60;
						display: block !important;
						font-size: 10px;
						margin-top: -5px;
						text-align: center;
					}
				}
			}
		}
	}

	.DBJ-triangle {
		display: inline-block;
		padding-left: 5px;
		vertical-align: middle;

		.DBJ-triangleT {
			border: 6px solid transparent;
			border-bottom-color: rgba(0, 0, 0, 0.2);
			height: 0;
			margin-bottom: 5px;
			position: relative;
			top: 1px;
			width: 0;
		}

		.DBJ-triangleB {
			border: 6px solid transparent;
			border-top-color: rgba(0, 0, 0, 0.2);
			height: 0;
			position: relative;
			top: -1px;
			width: 0;
		}

		.activeT {
			border-top-color: #5241ff;
		}

		.activeB {
			border-bottom-color: #5241ff;
		}
	}

	.table-container::-webkit-scrollbar {
		display: none;
	}

	.flex {
		display: flex;
		align-items: center;
		height: 40px;
	}

	.span-style {
		padding: 1px 5px;
		border-radius: 2px;
		font-size: 12px;
		background: rgb(250, 50, 50);
		color: #fff;
		display: inline-block;
		margin-right: 10px;
	}
</style>