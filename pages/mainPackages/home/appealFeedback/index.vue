<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="申诉列表"></xls-jy-navbar>
			<view class="top-tips">
				<view class="left">
					<span class="complaint-num">申诉处理({{ coupleNum }})</span>
				</view>
				<view class="right">
					<!-- <image :src="`${$baseUrl}appV4/image/couple/search-icon.png`" alt="" class="image" /> -->
					<image :src="`${$baseUrl}appV4/image/couple/sides-icon.png`" alt="" class="image"
						@click="showState = !showState" />
				</view>
			</view>
			<view class="list-content-title" @click="playDetail">
				请商家及时处理投诉。若超时未处理的，则系统将会自动处理 &gt;
			</view>
		</view>
		<view class="list-content">
			<view class="items" v-for="(item, index) in dataList" :key="index" @click="goCoupleDetail(item)">
				<view class="item-top">
					<view class="left">
						<image :src="`${$baseUrl}appV4/remoteBoot/pay.jpg`" alt="" class="image"
							v-show="item.sourceType == 3" />
						<image :src="`${$baseUrl}appV4/image/couple/phone-icon.png`" alt="" class="image"
							v-show="item.sourceType == 2" />
						<image :src="`${$baseUrl}appV4/image/couple/wx.png`" alt="" class="image"
							v-show="item.sourceType == 1" />
						<span>
							<span class="phone">{{ item.phone }}</span>
							<view class="equipment-info">
								{{ item.deviceTypeName }}{{ item.deviceNumber }}
							</view>
						</span>
					</view>
					<view class="right">{{ item.complaintTime }}</view>
				</view>
				<view class="item-middle">{{ item.problemDescription }}</view>
				<view class="item-bottom">
					<span class="btn" v-show="item.conductorState == 1"><span>立即处理</span></span>
					<span class="btn btn-other" v-show="item.conductorState == 2"><span>已处理</span></span>
					<span class="btn btn-other" v-show="item.conductorState == 3"><span>已回复</span></span>
					<span class="btn btn-other" v-show="item.conductorState == 4"><span>已关闭</span></span>
				</view>
			</view>
		</view>
		<xls-empty slot="empty" />
		<!-- 筛选 -->
		<u-popup :show="showState" mode="top" @close="() => showState=false">
			<view class="filter-popup">
				<view class="status-title">处理状态</view>
				<view class="status-content">
					<span class="border" v-for="(item, index) in conductorStateList" :key="index"
						:class="{'checked':conductorState == item.id}" @click="conductorState = item.id">{{ item.name
              }}<span class="no-handler-status" v-show="index == 1">{{coupleNum}}</span></span>
				</view>
				<view class="status-title">反馈类型</view>
				<view class="status-content">
					<span class="border" v-for="(item, index) in feedbackTypeList" :key="index"
						:class="{'checked':feedbackType == item.id}" @click="feedbackType = item.id">{{ item.name }}
					</span>
				</view>

				<view class="status-title status">来源渠道</view>
				<view class="status-content">
					<span class="border" v-for="(item, index) in sourceTypeList" :key="index"
						:class="{'checked':sourceType == item.id}" @click="sourceType = item.id">{{ item.name }}</span>
				</view>

				<view class="status-title status">申诉时间</view>
				<view class="status-content-status">
					<span class="start-time time" @click="showDate = !showDate">
						<span class="tips-icon">start</span>{{ startTime }}</span>
					<span class="line">-</span>
					<span class="end-time time" @click="showDate = !showDate">
						<span class="tips-icon end">end</span>{{ endTime }}</span>
				</view>

				<view class="footer-btn">
					<view class="btn" @click="resetState">重置</view>
					<view class="btn success" @click="screenSearch">完成</view>
				</view>
			</view>
		</u-popup>
		<!-- 日历 -->
		<xls-calendar :show="showDate" @close="() => { showDate = false }" @confirm="onConfirm"></xls-calendar>
	</z-paging>
</template>

<script>
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import {
		appealController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				dataList: [],
				coupleNum: 0,
				showState: false,
				conductorState: 0,
				//处理状态;1. 待处理，2：已处理，3：已回复，4：已关闭
				conductorStateList: [{
						id: 0,
						name: "不限",
						conductorStateNum: 0
					},
					{
						id: 1,
						name: "待处理",
						conductorStateNum: 0
					},
					{
						id: 2,
						name: "已处理",
						conductorStateNum: 0
					},
					{
						id: 3,
						name: "已回复",
						conductorStateNum: 0
					},
					{
						id: 4,
						name: "已关闭投诉",
						conductorStateNum: 0
					},
				],
				//反馈类型;（1：问题，2：意见，3：投诉）
				feedbackType: 0,
				feedbackTypeList: [{
						id: 0,
						name: "不限",
						feedbackTypeNum: 0
					},
					{
						id: 1,
						name: "问题",
						feedbackTypeNum: 0
					},
					{
						id: 2,
						name: "意见",
						feedbackTypeNum: 0
					},
					{
						id: 3,
						name: "投诉",
						feedbackTypeNum: 3
					},
				],
				//来源渠道：1：支付渠道，2：用户端
				sourceType: 0,
				sourceTypeList: [{
						id: 0,
						name: "不限"
					},
					{
						id: 1,
						name: "支付渠道"
					},
					{
						id: 2,
						name: "用户端"
					},
				],
				startTime: getDateAll(30),
				endTime: getDateAll(0),
				showDate: false,
				detailItem: {
					conductorState: "",
				},
			};
		},
		onLoad() {
			this.getCoupleNum();
		},
		methods: {
			getCoupleNum() {
				appealController.appealNotHandleNum().then(res => {
					this.coupleNum = res.data
				})
			},
			//说明
			playDetail() {
				this.$modal(
						"为避免商家受到微信处罚、影响支付功能的使用，从微信渠道反馈的投诉内容，若超时未处理的，则系统将会自动处理。\n（1）若超过23小时，商家未主动回复的，则系统将自动回复消息给投诉者。\n（2）若超过65小时，商家未主动关闭投诉的，则系统将自动回复并关闭投诉。\n请商家及时处理投诉内容，否则系统将会自动处理。", {
							title: "系统自动处理说明",
							confirmText: "我知道了",
							confirmColor: "#5241FF",
							showCancel: false,
						})
					.then(() => {});
			},
			//选择日期
			onConfirm(date) {
				const [startTime, endTime] = date;
				this.showDate = false;
				this.startTime = startTime;
				this.endTime = endTime;
			},
			//重置条件
			resetState() {
				this.conductorState = 0;
				this.feedbackType = 0;
				this.sourceType = 0;
				this.startTime = getDateAll(30);
				this.endTime = getDateAll(0);
			},
			//条件筛选
			screenSearch() {
				this.showState = false;
				this.dataList = [];
				this.$refs.paging.reload();
			},
			// conductorState  处理状态;1. 待处理，2：已处理，3：已回复，4：已关闭
			queryList(pageNo, pageSize) {
				let conductorState = this.conductorState == 0 ? "" : this.conductorState;
				let feedbackType = this.feedbackType == 0 ? "" : this.feedbackType;
				let sourceType = this.sourceType == 0 ? "" : this.sourceType;
				appealController.getRepresentationList({
					page: pageNo,
					size: pageSize,
					startTime: this.startTime,
					endTime: this.endTime,
					conductorState: conductorState, //处理状态
					feedbackType: feedbackType, //反馈类型
					sourceType: sourceType, //来源渠道
				}).then(res => {
					this.$refs.paging.complete(res.data);
				})
			},
			//详情
			goCoupleDetail(item) {
				this.detailItem = item;
				const {id} = item
				this.$goTo("/pages/mainPackages/home/appealFeedback/detail", "navigateTo", {id})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.top-tips {
		padding: 12px;
		display: flex;
		align-items: center;
		font-size: 14px;

		.left {
			flex: 1;
			color: #262626;
			font-size: 16px;
			font-weight: 500;
		}

		.image {
			width: 20px;
			height: 20px;
			margin-left: 20px;
		}
	}

	.list-content-title {
		color: #ff4747;
		padding: 12px 24px;
		font-size: 14px;
	}

	.list-content {
		font-size: 14px;

		.items {
			background: #fff;
			border-radius: 8px;
			margin: 8px 12px 0;
			padding: 12px;

			.item-top {
				display: flex;

				.left {
					display: flex;
					flex: 1;
					align-items: center;

					image {
						width: 32px;
						height: 32px;
						margin-right: 8px;
					}

					.phone {
						font-size: 13px;
						font-weight: 500;
					}

					.equipment-info {
						color: #a6a6a6;
						font-size: 10px;
						font-weight: 400;
					}
				}

				.right {
					color: #a4a5a6;
					font-size: 11px;
					font-weight: 400;
					text-align: right;
				}
			}

			.item-middle {
				font-size: 13px;
				font-weight: 400;
				margin-left: 40px;
				margin-top: 12px;
			}

			.item-bottom {
				margin-top: 12px;
				text-align: right;

				.btn {
					background: #ffeff0;
					border-radius: 4px;
					color: #ff4747;
					display: inline-block;
					font-size: 13px;
					font-weight: 500;
					height: 32px;
					line-height: 32px;
					text-align: center;
					width: 84px;
				}

				.btn-other {
					color: rgb(164, 165, 166);
					border: 1px solid rgb(234, 235, 236);
					background: rgb(255, 255, 255);
				}
			}
		}
	}

	.filter-popup {
		width: 100%;
		color: #262626;

		.status-title {
			font-size: 14px;
			font-weight: 500;
			padding: 10px 12px;
		}

		.status {
			margin-top: 12px;
		}

		.status-content {
			// align-items: center;
			// display: flex;
			padding: 0 12px;
			overflow-x: scroll;
			white-space: nowrap;
			overflow-y: hidden;

			.border {
				background: #f5f6f7;
				border-radius: 4px;
				color: #404040;
				display: inline-block;
				font-size: 13px;
				font-weight: 400;
				height: 32px;
				line-height: 32px;
				position: relative;
				text-align: center;
				width: 82px;
			}

			.border:not(:last-child) {
				margin-right: 8px;
			}

			.no-handler-status {
				background: #ff4747;
				border-radius: 7px 7px 7px 4px;
				box-sizing: content-box;
				color: #fff;
				font-size: 10px;
				font-weight: 400;
				height: 14px;
				line-height: 14px;
				min-width: 14px;
				padding: 0 2.5px;
				position: absolute;
				text-align: center;
				top: 2px;
			}

			.checked {
				background: #5241FF1a;
				color: #5241FF;
			}
		}

		.status-content-status {
			padding: 0 12px;
			display: flex;
			align-items: center;

			.time {
				background: #f4f6f7;
				border-radius: 4px;
				color: #404040;
				display: inline-block;
				font-size: 13px;
				font-weight: 400;
				line-height: 40px;
				text-align: center;
				flex: 1;
				position: relative;

				.tips-icon {
					position: absolute;
					top: 0;
					left: 0;
					width: 35px;
					text-align: center;
					display: inline-block;
					// background: rgba(76, 136, 255 ,0.5);
					background: rgba(160, 192, 253, 0.3);
					line-height: 13px;
					height: 13px;
					font-size: 10px;
					border-radius: 2px;
					color: #5241FF;
					font-style: italic;
				}

				.end {
					background: #ffeff0;
					color: #ff4747;
				}
			}

			.line {
				padding: 0 8px;
			}
		}

		.footer-btn {
			display: flex;
			margin: 36px 12px 12px;

			.btn {
				border-radius: 4px;
				display: inline-block;
				font-size: 16px;
				font-weight: 400;
				height: 40px;
				line-height: 40px;
				text-align: center;
				flex: 1;
				background: #f5f6f7;
				color: #404040;
			}

			.success {
				background: #5241FF;
				color: #fff;
				margin-left: 12px;
			}
		}

		::-webkit-scrollbar {
			display: none // 去掉滚动条;
		}
	}
</style>