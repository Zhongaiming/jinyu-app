<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="随机立减" bgColor="#f5f6f7" slot="top"></xls-jy-navbar>
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
					<span class="item-label">活动参与门槛</span>
					<span class="item-value">订单金额 ≥{{ item.threshold }}元</span>
				</view>
				<view class="item">
					<span class="item-label">随机扣减范围</span>
					<span class="item-value">减 {{ item.startReduction }} 至 {{ item.endReduction }}元</span>
				</view>
				<view class="item">
					<span class="item-label">每人参与次数</span>
					<span class="item-value">{{ item.memberCount }}次</span>
				</view>
				<view class="item">
					<span class="item-label">活动优惠总次数</span>
					<span class="item-value">
						共{{ item.couponNumber }}次,
						<span class="blue">已优惠{{ item.couponMemberTotal || 0 }}次</span></span>
				</view>

				<view class="item">
					<span class="item-label">开启和结束日期</span>
					<span class="item-value">{{ str(item.startTime) }} 至 {{ str(item.endTime) }}</span>
				</view>

				<view class="item">
					<span class="item-label">设备类型及场地</span>
					<span class="item-value">{{ item.deviceTypeName }}( {{ item.placeCount }} 个场地)</span>
				</view>
			</view>
			<view class="entry-footer" v-hasPermi="['app:marketing:coupon:detail']">
				<view class="btn" @click="addMethod(1, item.id, 'detail')">
					查看详情
				</view>
				<view class="btn" @click="addMethod(1, item.id, 'edit')">修改</view>
			</view>
		</view>

		<xls-empty slot="empty"></xls-empty>
		<view class="btn-bottom" slot="bottom">
			<view class="left" @click="addMethod(tab + 1)">规则说明</view>
			<view class="btn" @click="addMethod(1, null, 'add')" v-hasPermi="['app:marketing:coupon:add']">
				新建活动
			</view>
		</view>
	</z-paging>
</template>

<script>
	import {
		marketingController
	} from "@/api/index.js"
	export default {
		data() {
			return {
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
				],
				dataList: [],
			};
		},
		methods: {
			str(str) {
				return str.split(" ")[0];
			},
			paramsMethod(type, value) {
				this.cell = value;
				this.getList();
			},
			async queryList(pageNo, pageSize) {
				let res = await marketingController.getCouponRandomList({
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
					this.$refs.paging.complete(res.data);
				}
			},
			addMethod(type, id, handle) {
				let route
				let params
				if (type == 1) {
					params = {
						id: id,
						handle,
					}
					route = "/pages/subpackages/home/marketingModule/random/detail/index"
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
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		font-size: 17px;
		line-height: 50px;
		text-align: center;
		background-color: #5241ff;
		color: #fff;

		.left {
			flex: 1;
			border-right: 1px solid #fff;
		}

		.btn {
			flex: 1;
		}
	}
</style>