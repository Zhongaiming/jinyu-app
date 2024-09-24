<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="支付立减券" bgColor="#f5f6f7" slot="top"></xls-jy-navbar>
		<view class="tabs">
			<view class="tab" :class="{'active_tab':tab == item.id}" v-for="item in tabList" :key="item.id"
				@click="paramsMethod('tab', item.id)">
				{{ item.text }}
			</view>
			<view class="icon" @click="explainPopup = !explainPopup">
				<u-icon name="question-circle" size="36" color="#cfcfcf" />
			</view>
		</view>

		<view class="cell">
			<span class="cell-label">状态：</span>
			<view class="cell-switch_wp">
				<view class="switch" :class="{'active':cell == item.id}" v-for="item in cellList" :key="item.id"
					@click="paramsMethod('cell', item.id)">
					{{ item.text }}
				</view>
			</view>
		</view>

		<view class="entry" v-for="item in dataList" :key="item.id">
			<view class="entry-body">
				<view class="item">
					<span class="item-label">活动名称</span>
					<span class="item-value">{{ item.activityName }}</span>
				</view>
				<view class="item">
					<span class="item-label">设备类型</span>
					<span class="item-value">{{ item.typeName }}</span>
				</view>
				<view class="item">
					<span class="item-label">使用门槛</span>
					<span class="item-value">≥{{ item.fullAmount }}元</span>
				</view>
				<view class="item">
					<span class="item-label">优惠金额</span>
					<span class="item-value">{{ item.reduceMoney }}元</span>
				</view>
				<view class="item">
					<span class="item-label">活动效果</span>
					<span class="item-value">
						已赠送{{ item.totalUsage }}张,
						<span class="blue">使用{{ item.usageQuantity || 0 }}张</span></span>
				</view>
				<view class="item">
					<span class="item-label">开启和结束日期</span>
					<span class="item-value">{{ str(item.startTime) }}至{{ str(item.endTime) }}</span>
				</view>
			</view>

			<view class="entry-footer" v-hasPermi="['app:marketing:coupon:detail']">
				<view class="btn" @click="addMethod(1, item.id, 'detail')">
					查看详情
				</view>
				<!-- <view
						class="btn"
						v-if="tab == 2"
						@click="addMethod(1, item.id, 'edit')"
					  >
						修改
					  </view> -->
			</view>
		</view>

		<xls-empty slot="empty"></xls-empty>
		<view class="btn-bottom" slot="bottom">
			<view class="left" @click="addMethod(tab + 1)">
				<u-icon name="file-text" size="56" color="#5241ff" />
				<view class="description">规则说明</view>
			</view>
			<view class="btn" @click="addMethod(1, null, 'add')" v-hasPermi="['app:marketing:coupon:add']">
				新建活动
			</view>
		</view>

		<!-- 说明 -->
		<u-popup :show="explainPopup" round="20" mode="center" @close="explainPopup=false">
			<view class="explain_wrapper">
				<view class="title">说明</view>
				<view class="text_wrapper">
					<view class="text">
						(1)“支付前派发”是指，用户在支付消费前，可无条件获赠优惠券。<span @click="addMethod(2)">详细介绍></span>
					</view>
					<view class="text">
						(2)“支付后派发”是指，用户需支付消费满足条件金额后，才可获赠优惠券。<span @click="addMethod(3)">详细介绍></span>
					</view>
				</view>
				<view class="btn" @click="explainPopup = !explainPopup">确定</view>
			</view>
		</u-popup>

	</z-paging>
</template>

<script>
	import {
		marketingController
	} from "@/api/index.js"
	export default {
		data() {
			return {
				tab: 1,
				tabList: [{
						id: 1,
						text: "支付前派发"
					},
					{
						id: 2,
						text: "支付后派发"
					},
				],
				cell: 1,
				// 活动状态，1：启用，2：停用，3：完成
				cellList: [{
						id: null,
						text: "全部"
					},
					{
						id: 1,
						text: "投放中"
					},
					{
						id: 2,
						text: "已终止"
					},
					{
						id: 3,
						text: "已完成"
					},
				],
				dataList: [],
				// 说明
				explainPopup: false,
			};
		},
		methods: {
			async queryList(pageNo, pageSize) {
				let res = await marketingController.getReductionList({
					dtoFilter: {
						// type: this.tab, //活动类型，1：支付前发  ，2：支付后发
						// state: this.cell, //活动状态，1：启用，2：停用，3：完成
					},
					pageParam: {
						pageNum: pageNo,
						pageSize: pageSize
					},
				});
				if (res.code == 200) {
					this.$refs.paging.complete(res.data.dataList);
				}
			},
			str(str) {
				return str.split(" ")[0];
			},
			paramsMethod(type, value) {
				if (type == "tab") {
					this.tab = value
				} else {
					this.cell = value
				}
				this.$refs.paging.reload()
			},
			addMethod(type, id, handle) {
				let route
				let params
				if (type == 1) {
					params = {
						type: this.tab,
						id: id,
						handle,
					}
					route = "/pages/subpackages/home/marketingModule/coupon/add/index"
				} else {
					params = {
						type
					}
					route = "/pages/subpackages/home/marketingModule/coupon/rule/index"
				}
				this.$goTo(route, "navigateTo", params)
			},
		},
	};
</script>

<style lang="scss" scoped>
	.tabs {
		display: flex;
		background: #fff;

		.tab {
			padding: 10px 0;
			flex: 1;
			text-align: center;
			font-size: 14px;
		}

		.active_tab {
			box-sizing: border-box;
			color: #5241ff;
			border-bottom: 3px solid #5241ff;
		}

		.icon {
			padding: 10px 10px 0 0;
		}
	}

	.cell {
		align-items: center;
		display: flex;
		font-size: 16px;
		height: 50px;
		margin-left: 10px;
		padding-right: 10px;

		.cell-label {
			color: #656565;
			font-size: 13px;
			margin-right: 5px;
		}

		.cell-switch_wp {
			flex: 1;
			display: flex;

			.switch {
				background-color: #ebebeb;
				border-radius: 3px;
				color: #656565;
				font-size: 13px;
				line-height: 30px;
				margin-right: 15px;
				padding: 0 6px;
				text-align: center;
			}

			.active {
				background-color: #eceaff;
				color: #5241ff;
			}
		}
	}

	.entry {
		background-color: #fff;
		border-radius: 5px;
		margin: 0 10px 10px;

		.entry-body {
			padding: 6.5px 10px;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 6.5px 0;

				.item-label {
					color: #666;
					font-size: 14px;
					line-height: 20px;
					padding-right: 15px;
				}

				.item-value {
					color: #191919;
					flex: 1;
					font-size: 14px;
					line-height: 20px;
					text-align: right;

					.blue {
						color: #5241ff;
					}
				}
			}
		}

		.entry-footer {
			border-top: 1px solid #e5e5e5;
			display: flex;
			align-items: center;

			.btn {
				flex: 1;
				height: 45px;
				padding: 0 6px;
				line-height: 45px;
				color: #5241ff;
				text-align: center;
				font-size: 15px;
			}

			.btn:not(:first-child) {
				border-left: 1px solid #e5e5e5;
			}
		}
	}

	.btn-bottom {
		background: #fff;
		padding: 10px;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		.left {
			width: 100px;
			display: flex;
			flex-direction: column;
			color: #5241ff;
			align-items: center;
			justify-content: space-between;
		}

		.btn {
			background-color: #5241ff;
			color: #fff;
			flex: 1;
			font-size: 17px;
			line-height: 50px;
			text-align: center;
			border-radius: 3px;
		}
	}

	// 说明
	.explain_wrapper {
		width: 280px;

		.title {
			color: #262626;
			font-size: 19px;
			font-weight: 700;
			margin-top: 20px;
			text-align: center;
		}

		.text_wrapper {
			color: #262626;
			font-size: 14px;
			line-height: 21px;
			overflow-y: auto;
			padding: 16px 20px 20px;
			text-align: justify;

			.text {
				padding-bottom: 8px;

				span {
					color: #5241ff;
				}
			}
		}

		.btn {
			border-top: 1px solid #e6e6e6;
			color: #5241ff;
			font-size: 18px;
			line-height: 50px;
			text-align: center;
		}
	}
</style>