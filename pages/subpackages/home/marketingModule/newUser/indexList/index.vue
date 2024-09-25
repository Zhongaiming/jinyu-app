<template>
	<view class="page_mark_wrapper">
		<xls-jy-navbar title="新手特惠活动列表" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="select_wrapper">
			<view class="select" v-for="item in selectList" :key="item.id"
				:class="{'is-selected':item.id == select}" @click="(select = item.id), getList()">
				<span>{{ item.text }}</span>
			</view>
		</view>

		<view class="list_wrapper">
			<view class="member-card" v-for="(item, index) in list" :key="index"
				@click="goNextPage(item.id, item.type)">
				<view class="header">
					<p class="title-wrap flex-wrap">
						<span class="card-name">
							{{item.type == 1 ?"首单享优惠":"首单享折扣"}}
						</span>
						<span class="card-status" v-if="item.state == 2">已终止</span>
						<span class="card-status card-loading" v-else>投放中</span>
					</p>
					<p class="time">
						{{ dateString(item.startTime) }} 至 {{ dateString(item.endTime) }}
					</p>
				</view>

				<view class="body">
					<view class="flex-between" v-if="item.type == 1">
						<span>套餐类型</span>
						<span>{{packageTypeDict[item.packageType]}}</span>
					</view>
					<view class="flex-between" v-if="item.type == 1">
						<span>自定义套餐</span> <span>{{ item.packageCount }}个</span>
					</view>
					<view class="flex-between" v-if="item.type == 1 && item.experience">
						<span>每人体验次数</span> <span>{{ item.experience }}次</span>
					</view>

					<view class="flex-between" v-if="item.type == 2">
						<span>首单折扣</span> <span>{{ item.firstDiscount }}折</span>
					</view>

					<view class="flex-between">
						<span>设备类型</span> <span>{{ item.typeName }}</span>
					</view>

					<view class="flex-between">
						<span>适用场地</span> <span>{{ item.placeCount }}个</span>
					</view>

					<view class="flex-between">
						<span>参与新用户</span> <span>{{ item.memberCount }}</span>
					</view>
				</view>
			</view>
			<xls-bottom v-if="list.length" />
			<xls-empty v-else></xls-empty>
		</view>
		<view class="bottom_wrapper" @click="typePopup = true">创建</view>
		<u-popup :show="typePopup" mode="bottom" @close="typePopup=false">
			<view class="activity_popup_wrapper">
				<view class="header_wrapper">
					<view class="sider" @click="typePopup = false">取消</view>
					<view class="title">请选择优惠类型</view>
					<view class="sider" @click="goNextPage(null, activityType)">确定</view>
				</view>
				<view class="body_wrapper">
					<view class="select_wrapper_popup" @click="activityType = 1"
						:class="{'select_active':activityType == 1}">
						<view class="left">
							<u-icon name="checkmark-circle-fill" size="42" :color="activityType==1?'#5241ff':'#999'"/>
						</view>
						<view class="right">
							<p class="title">新用户首单享优惠</p>
							<p class="desc-info">自定义设置首单价格，例如首单0.01元</p>
						</view>
					</view>
					<view class="select_wrapper_popup" @click="activityType = 2"
						:class="{'select_active':activityType == 2}">
						<view class="left">
							<u-icon name="checkmark-circle-fill" size="42" :color="activityType==2?'#5241ff':'#999'"/>
						</view>
						<view class="right">
							<p class="title">新用户首单享折扣</p>
							<p class="desc-info">设置折扣比例，用户购买套餐可享受折扣价</p>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		marketingController
	} from "@/api/index.js"
	export default {
		data() {
			return {
				select: null,
				// 1.首单优惠，2.首单折扣
				selectList: [{
						id: null,
						text: "全部活动"
					},
					{
						id: 1,
						text: "首单享优惠"
					},
					{
						id: 2,
						text: "首单享折扣"
					},
				], 
				packageTypeDict: {
					1: "任意套餐",
					2: "自定义新用户专享套餐",
					3: "免费体验套餐",
					undefined: "其他"
				},
				typePopup: false,
				activityType: 1,
				list: [],
			};
		},
		mounted() {
			this.getList();
		},
		methods: {
			dateString(string) {
				if(typeof string != 'string') {
					return
				}
				return string.split(" ")[0]
			},
			async getList() {
				let res = await marketingController.getCouponList({
					dtoFilter: {},
					pageParam: {
						pageNum: 1,
						pageSize: 10
					},
					// type: this.select
				});
				if (res.code == 200) {
					this.list = res.data.dataList
				}
			},
			goNextPage(id, type) {
				this.typePopup = false
				this.$goTo("/pages/subpackages/home/marketingModule/newUser/activityDetail/index", "navigateTo", {
					id,
					type,
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.select_wrapper {
		display: flex;
		align-items: center;
		background: #fff;
		position: sticky;
		top: 48px;
		z-index: 99;

		.select {
			line-height: 50px;
			text-align: center;
			flex: 1;
			font-size: 15px;
		}

		.is-selected {
			border-bottom: 3px solid #5241ff;
			color: #5241ff;
		}
	}

	.list_wrapper {
		padding: 12px 0 50px;

		.member-card {
			margin: 0 15px 10px;
			position: relative;
			border-radius: 8px;
			background: #fff;
			padding: 15px;
			box-shadow: 0 0 12px #21212129;

			.header {
				border-bottom: 1px dashed #cccccc;

				.title-wrap {
					display: flex;
					align-items: center;

					.card-name {
						font-size: 17px;
						font-family: PingFangSC-Semibold;
						font-weight: 600;
						margin-right: 10px;
					}

					.card-status {
						width: 58px;
						height: 25px;
						background: #cccccc;
						border-radius: 3px;
						text-align: center;
						color: #fff;
						font-size: 14px;
						line-height: 25px;
					}

					.card-loading {
						background: #ecebff;
						color: #5241ff;
					}
				}

				.time {
					font-size: 14px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #333;
					margin-top: 12px;
					padding-bottom: 12px;
				}
			}

			.body {
				.flex-between {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 10px;
					color: #333;
					font-size: 14px;
				}
			}
		}
	}

	.bottom_wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 1;
		line-height: 50px;
		color: #fff;
		background: #5241ff;
		text-align: center;
		font-size: 15px;
	}

	// 活动类型选择
	.activity_popup_wrapper {
		.header_wrapper {
			display: flex;
			align-items: center;
			line-height: 48px;
			text-align: center;
			border-bottom: 1px solid #f0f0f0;

			.sider {
				padding: 0 12px;
				font-size: 14px;
			}

			.title {
				flex: 1;
				font-size: 16px;
				font-weight: 700;
			}
		}

		.body_wrapper {
			padding-bottom: 50px;

			.select_wrapper_popup {
				padding: 15px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #f0f0f0;

				.left {
					margin-right: 10px;
					color: #d1cfcf;
				}

				.right {
					flex: 1;
					color: #999;
					font-size: 14px;

					.title {
						margin-bottom: 5px;
						font-size: 14px;
						font-family: PingFangSC-Semibold;
						font-weight: 700;
						color: #333;
					}
				}
			}

			.select_active {
				.left {
					color: #5241ff;
				}

				.right {
					.title {
						color: #5241ff;
					}
				}
			}
		}
	}
</style>