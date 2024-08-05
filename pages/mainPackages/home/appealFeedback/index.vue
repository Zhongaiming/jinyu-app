<template>
	<div class="couple-content">
		<xls-jy-navbar title="申诉列表"></xls-jy-navbar>
		<div class="top-tips">
			<div class="left">
				<span class="complaint-num">申诉处理({{ $store.state.coupleNum }})</span>
			</div>
			<div class="right">
				<image :src="`${$baseUrl}appV4/image/couple/search-icon.png`" alt="" class="image" />
				<image :src="`${$baseUrl}appV4/image/couple/sides-icon.png`" alt="" class="image"
					@click="showState = !showState" />
			</div>
		</div>
		<div class="list-content-title" @click="playDetail">
			请商家及时处理投诉。若超时未处理的，则系统将会自动处理 &gt;
		</div>
		<u-list v-model="loading" :finished="onEarth" finished-text="没有更多了" @load="getRepresent"
			v-if="dataList.length">
			<div class="list-content">
				<div class="items" v-for="(item, index) in dataList" :key="index" @click="goCoupleDetail(item)">
					<div class="item-top">
						<div class="left">
							<image :src="`${$baseUrl}appV4/image/couple/phone-icon.png`" alt="" class="image"
								v-show="item.sourceType == 2" />
							<image :src="`${$baseUrl}appV4/image/couple/wx.png`" alt="" class="image"
								v-show="item.sourceType == 1" />
							<span>
								<span class="phone">{{ item.phone }}</span>
								<div class="equipment-info">
									{{ item.deviceTypeName }}{{ item.deviceNumber }}
								</div>
							</span>
						</div>
						<div class="right">{{ item.complaintTime }}</div>
					</div>
					<div class="item-middle">{{ item.problemDescription }}</div>
					<div class="item-bottom">
						<span class="btn" v-show="item.conductorState == 1"><span>立即处理</span></span>
						<span class="btn btn-other" v-show="item.conductorState == 2"><span>已处理</span></span>
						<span class="btn btn-other" v-show="item.conductorState == 3"><span>已回复</span></span>
						<span class="btn btn-other" v-show="item.conductorState == 4"><span>已关闭</span></span>
					</div>
				</div>
			</div>
		</u-list>
		<xls-empty v-else />
		<!-- 筛选 -->
		<u-popup v-model="showState" position="top">
			<div class="filter-popup">
				<div class="status-title">处理状态</div>
				<div class="status-content">
					<span class="border" v-for="(item, index) in conductorStateList" :key="index"
						:class="conductorState == item.id ? 'checked' : ''" @click="conductorState = item.id">{{ item.name
              }}<span class="no-handler-status" v-show="index == 1">{{
                $route.query.coupleNum
              }}</span></span>
				</div>
				<div class="status-title">反馈类型</div>
				<div class="status-content">
					<span class="border" v-for="(item, index) in feedbackTypeList" :key="index"
						:class="feedbackType == item.id ? 'checked' : ''"
						@click="feedbackType = item.id">{{ item.name }}
					</span>
				</div>

				<div class="status-title status">来源渠道</div>
				<div class="status-content">
					<span class="border" v-for="(item, index) in sourceTypeList" :key="index"
						:class="sourceType == item.id ? 'checked' : ''"
						@click="sourceType = item.id">{{ item.name }}</span>
				</div>

				<div class="status-title status">申诉时间</div>
				<div class="status-content-status">
					<span class="start-time time" @click="showDate = !showDate">
						<span class="tips-icon">start</span>{{ startTime }}</span>
					<span class="line">-</span>
					<span class="end-time time" @click="showDate = !showDate">
						<span class="tips-icon end">end</span>{{ endTime }}</span>
				</div>

				<div class="footer-btn">
					<div class="btn" @click="resetState">重置</div>
					<div class="btn success" @click="screenSearch">完成</div>
				</div>
			</div>
		</u-popup>
		<u-calendar v-model="showDate" type="range" @confirm="onConfirm" :max-range="180" allow-same-day
			range-prompt="只能查询半年的数据" :min-date="minDate" :max-date="maxDate" :round="false" color="#5241FF" />
	</div>

</template>

<script>
	// import {
	// 	getRepresentationList
	// } from "@/utils/api/couple";
	// import {
	// 	getTime,
	// 	getDateAll
	// } from "@/plugins/utilityClass";
	export default {
		data() {
			return {
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
				startTime: 'getDateAll(29)',
				endTime: 'getDateAll(0)',
				page: 0,
				onEarth: false,
				loading: false,
				dataList: [{
						"id": 3171,
						"claimantName": "钅·䖝",
						"claimantId": 10000021,
						"phone": "12345678908",
						"feedbackType": 1,
						"sourceType": 2,
						"orderNo": "10000021-300000282023120408440048",
						"problemDescription": "测试提交 问题 反馈",
						"problemImg": "",
						"deviceNumber": "30000033",
						"commercialNumber": "ZTWL_20220617111542006",
						"placeId": 402,
						"placeName": "V0007中土512(测试)",
						"complaintTime": "2024-01-31 08:44:20",
						"conductorId": 18,
						"conductorName": "商户_18144999904",
						"conductorTime": "2024-02-12 20:22:14",
						"conductorState": 2,
						"deviceTypeName": "游戏类"
					},
					{
						"id": 2631,
						"claimantName": "钅·䖝",
						"claimantId": 10000021,
						"phone": "12345678974",
						"feedbackType": 3,
						"sourceType": 2,
						"orderNo": "10000021-300000282023100710201624",
						"problemDescription": "测试",
						"problemImg": "",
						"deviceNumber": "30000028",
						"commercialNumber": "ZTWL_20220617111542006",
						"placeId": 402,
						"placeName": "V0007中土512(测试)",
						"complaintTime": "2023-10-07 10:22:09",
						"conductorId": 506,
						"conductorName": "前端测试",
						"conductorTime": "2023-10-07 16:11:03",
						"conductorState": 2,
						"deviceTypeName": "扭蛋机"
					},
					{
						"id": 2611,
						"complaintId": "200000020231005100119178987",
						"claimantName": "阿燊",
						"claimantId": 10000740,
						"phone": "13794469414",
						"feedbackType": 3,
						"sourceType": 1,
						"orderNo": "10000740-300000282023100509365362",
						"problemDescription": "1111111111111",
						"deviceNumber": "30000028",
						"commercialNumber": "ZTWL_20220617111542006",
						"placeId": 402,
						"placeName": "V0007V0007中土512(测试)",
						"complaintTime": "2023-10-05 10:03:27",
						"conductorId": 18,
						"conductorName": "商户_18144999904",
						"conductorTime": "2023-10-05 10:03:36",
						"conductorState": 2,
						"deviceTypeName": "扭蛋机"
					}
				],
				showDate: false,
				minDate: 'new Date(getDateAll(360))',
				maxDate: 'new Date(getDateAll(0))',
				detailItem: {
					conductorState: "",
				},
			};
		},
		// created() {
		// 	this.getRepresent();
		// },
		methods: {
			//说明
			playDetail() {
				this.$dialog
					.alert({
						title: "系统自动处理说明",
						message: "为避免商家受到微信处罚、影响支付功能的使用，从微信渠道反馈的投诉内容，若超时未处理的，则系统将会自动处理。\n（1）若超过23小时，商家未主动回复的，则系统将自动回复消息给投诉者。\n（2）若超过65小时，商家未主动关闭投诉的，则系统将自动回复并关闭投诉。\n请商家及时处理投诉内容，否则系统将会自动处理。",
						width: "275",
						messageAlign: "left",
						confirmButtonText: "我知道了",
						confirmButtonColor: "#5241FF",
					})
					.then(() => {});
			},
			//日期格式
			formatDate(date) {
				return `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
			},
			//选择日期
			onConfirm(date) {
				const [start, end] = date;
				this.showDate = false;
				this.startTime = this.formatDate(start);
				this.endTime = this.formatDate(end);
			},
			//重置条件
			resetState() {
				this.conductorState = 0;
				this.feedbackType = 0;
				this.sourceType = 0;
				this.startTime = getDateAll(29);
				this.endTime = getDateAll(0);
			},
			//条件筛选
			screenSearch() {
				this.showState = false;
				this.page = 0;
				this.onEarth = false;
				this.dataList = [];
				this.getRepresent();
			},
			//监听滚动
			// conductorState  处理状态;1. 待处理，2：已处理，3：已回复，4：已关闭
			async getRepresent() {
				this.conductorStateList = [{
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
				];
				let conductorState = this.conductorState == 0 ? "" : this.conductorState;
				let feedbackType = this.feedbackType == 0 ? "" : this.feedbackType;
				let sourceType = this.sourceType == 0 ? "" : this.sourceType;
				this.loading = true;
				let res = await getRepresentationList({
					page: ++this.page,
					size: 30,
					startTime: this.startTime,
					endTime: this.endTime,
					conductorState: conductorState, //处理状态
					feedbackType: feedbackType, //反馈类型
					sourceType: sourceType, //来源渠道
				});
				this.loading = false;
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data.records.length == 0) {
						this.onEarth = true;
					} else {
						this.onEarth = false;
					}
					if (res.data.data.records != null) {
						if (this.page > 1) {
							this.dataList = [...this.dataList, ...res.data.data.records];
						} else {
							this.dataList = [];
							this.dataList = res.data.data.records;
							if (res.data.data.records.length < 30) {
								this.onEarth = true;
							} else {
								this.onEarth = false;
							}
						}
					}
				}
			},
			//详情
			goCoupleDetail(item) {
				this.detailItem = item;
				this.$router.push({
					path: "/coupleBack/coupleDetail",
					query: {
						id: item.id
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.couple-content {
		font-family: PingFangSC, PingFangSC-Medium;
		width: 100%;
		font-size: 14px;
		color: #262626;

		.top-tips {
			padding: 12px;
			display: flex;
			align-items: center;

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
		}

		.list-content {
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