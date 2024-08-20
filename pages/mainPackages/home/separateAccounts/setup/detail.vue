<template>
	<view class="xls-setup-page">
		<view class="mui-input-group">
			<view class="mui-input-row">
				<label class="label">分成场地</label>
				<view class="left-text">已选择{{ acountPlaceNum(placeId) }}个场地</view>
			</view>

			<view class="explanation">
				开启即代表您已阅读并同意
				<span class="serviceBtn" @click="protocolMask('protocol')">《支付服务协议》</span>
			</view>
		</view>

		<view class="mui-input-group status">
			<view class="mui-input-row">
				<label class="label">分成方设置</label>
				<view class="add-member" @click="estimateAdd('add')">+添加分成方</view>
			</view>
		</view>

		<view class="list-wrapper" v-for="(item, index) in dataList" :key="index">
			<view class="person-item">
				<view class="name">
					<text class="text">
						{{ item.nickName}}
						<view class="tips-icon" v-show="item.masterNo == 1">主</view>
					</text>
				</view>
				<view class="phone">{{item.username ? '(' + item.username + ')' : ''}}</view>
				<view class="right" v-show="acountPlaceNum(placeId) <= 1">
					{{item.proportion ? item.proportion + '%' : ''}}
				</view>
			</view>

			<view class="right-box">
				<view class="btn" @click="estimateEdit(item)">编辑</view>
				<view class="btn" @click="deletePersonItem(item)">删除</view>
			</view>
		</view>


		<view class="footer">
			<view class="text-tips">
				<view>注意事项：</view>
				<!-- 于第二天0时生效 -->
				<view>1.分成设置成功后,将立即生效。</view>
				<view>
					2.开启“自动结算到账”，并绑定银行卡后，当天的“在线支付” 分成收益
					,扣除手续费0.6%后,第二天24:00前将直接自动结算打款到各分成方的银行卡(D+1结算)。
				</view>
				<view>
					3.如果您上游有代理商参与设备分账，且您场地添加了其他分成方和分成比例，那么您添加的分成方所分得的金额为剔除代理商分成金额以后剩下的金额再乘以您设置的分成比例。代理商分账只对代理商专属的设备生效，非代理商设备是不会发生代理商分账的。
				</view>
				<a class="checkALLBtn" @click="protocolMask('mask')">查看全部&gt;&gt;</a>
			</view>
		</view>
		<view class="footer-save" @click="goBack()">
			<view class="footer-next-step">返回分账首页</view>
		</view>

		<xls-setup-protocol-vue ref="protocol"></xls-setup-protocol-vue>
	</view>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	import xlsSetupProtocolVue from './xls-setup-protocol.vue';

	export default {
		components: {
			xlsSetupProtocolVue
		},
		data() {
			return {
				dataList: [{
						"username": "18144999904",
						"nickName": "商户_18144999904",
						"separateBillsId": 142,
						"masterNo": 1,
						"proportion": 75,
						"accountNumber": "E1807612600",
						"id": 1292
					},
					{
						"username": "18402059455",
						"nickName": "前端",
						"separateBillsId": 883,
						"masterNo": 0,
						"proportion": 10,
						"accountNumber": "E1807517363",
						"id": 2795
					},
					{
						"username": "18126642646",
						"nickName": "张捷02",
						"separateBillsId": 885,
						"masterNo": 0,
						"proportion": 15,
						"accountNumber": "E1807550146",
						"id": 2797
					}
				],

				checked: false,
				noPersontips: false,
				havePersontips: false,
				//
				element: {
					target: {
						scrollLeft: 0,
						scrollWidth: 0,
					},
				},
				lastIndex: -1,
				//
				placeId: "",

				editOradd: false,
				proportion: "",
				editInfo: {
					proportion: "",
					masterNo: "",
					id: "",
					separateBillsId: "",
				},
				//
				billsPeople: "请选择分成人员",
				showPeople: false,
				separateBillsList: [],
				searchBillList: [],
				separateBillsId: "",
			};
		},
		async onLoad(option) {
			const params = JSON.parse(option.params);
			console.log(params)
			// if (this.$route.query.placeId) {
			// 	this.placeId = this.$route.query.placeId;
			// 	this.getPeopleList();
			// }
		},
		methods: {
			protocolMask(type) {
				this.$refs.protocol.openPupop(type);
			},
			goBack() {

			},
			acountPlaceNum(place) {
				let placeNum = 0;
				for (let len = 0; len < place.length; len++) {
					if (place[len] == ",") {
						++placeNum;
					}
				}
				return placeNum + 1;
			},

			//删除
			async deletePersonItem(separateBillsId, masterNo) {
				if (masterNo == 1) {
					this.$toast("主分账人不可删除！！");
					return
				}
				this.$model("确定要删除该合作人分成比例设置吗？", {
						confirmText: "删除",
						confirmColor: "#f73e3e",
					})
					.then(() => {
						deleteSeparateBillsInfo({
								separateBillsId,
								placeIdList: this.placeId,
							})
							.then((res) => {
								if (res.data.code == 0 || res.data.msg == "ok") {
									this.$toast.success("删除成功");
									this.getPeopleList();
								}
							})
							.catch((err) => {});
					})
					.catch(() => {});
			},
			//获取
			async getPeopleList() {
				let res = await getviewidePersonList({
					placeId: String(this.placeId)
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.dataList = res.data.data;
				}
			},

			//添加
			estimateAdd(type) {
				if (type == "add") {
					this.billsPeople = "请选择分成人员";
					this.separateBillsId = "";
					this.proportion = "";
				}
				if (!this.separateBillsList.length) {
					//无分成人
					this.noPersontips = !this.noPersontips;
				} else {
					this.havePersontips = !this.havePersontips;
					this.editOradd = false;
				}
			},
			async addBillsPeople() {
				if (!this.proportion) {
					return this.$toast("请确保信息完整后再添加~");
				}
				if (this.proportion > 100) {
					return this.$toast("比例不能大于100~");
				}
				let res = await addSeparateBillsInfo({
					separateBillsId: this.separateBillsId, //分账人员ID
					masterNo: this.checked ? 1 : 0, //是否主分账人员;（1：是，0：否）
					proportion: this.proportion, //分账比例;100% = 100
					placeIdList: this.placeId, //场地ID
				});
				console.log("加", res);
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.getPeopleList();
					this.havePersontips = !this.havePersontips;
					this.billsPeople = "请选择分成人员";
					this.separateBillsId = "";
					this.proportion = "";
					this.$toast.success("添加成功");
				} else {
					return;
				}
			},
			//编辑
			async estimateEdit(item) {
				// console.log('bianj',item)
				if (item.masterNo == 1) {
					return this.$dialog
						.alert({
							title: "温馨提示",
							message: "注意！！主分账人不可编辑~",
							width: "270",
						})
						.then(() => {
							this.element.target.scrollLeft = 0;
						});
				}
				this.havePersontips = !this.havePersontips;
				this.editOradd = true;
				this.editInfo = item;
				this.proportion = item.proportion;
				this.billsPeople = item.nickName;
				item.masterNo ? (this.checked = true) : (this.checked = false);
			},
			async editBillsPeople() {
				if (!this.proportion) {
					return this.$toast("请确保信息完整后再修改~");
				}
				if (this.proportion > 100) {
					return this.$toast("比例不能大于100~");
				}
				let res = await editSeparateBillsInfo({
					separateBillsId: this.editInfo.separateBillsId,
					masterNo: this.checked ? 1 : 0, //是否主分账人员;（1：是，0：否）
					proportion: this.proportion, //分账比例;100% = 100
					placeIdList: this.placeId, //场地ID
				});
				console.log("改", res);
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.havePersontips = !this.havePersontips;
					this.getPeopleList();
					this.element.target.scrollLeft = 0;
					this.$toast.success("修改成功");
				}
			},
			//确定--添加或编辑
			addOreditPeople() {
				if (this.editOradd) {
					//编辑
					this.editBillsPeople();
				} else {
					//添加
					this.addBillsPeople();
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	.xls-setup-page {
		width: 100%;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";

		.mui-input-group {
			background: #fff;
			padding: 0 20rpx 16rpx;

			.mui-input-row {
				line-height: 90rpx;
				width: 100%;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				.label {
					padding: 0 0 0 20rpx;
					line-height: 90rpx;
					color: #999;
					font-size: 30rpx;
					width: 190rpx;
				}

				.left-text {
					flex: 1;
					padding-right: 50rpx;
					color: #3a3d44;
					font-size: 30rpx;
					line-height: 90rpx;
				}
			}

			.mui-input-row:not(:last-child) {
				border-bottom: 2rpx solid #e3e2e7;
			}

			.explanation {
				line-height: 30rpx;
				font-size: 26rpx;
				color: #999;
				padding: 10rpx 20rpx;
				height: 88rpx;
				box-sizing: border-box;
				background: #f5f6f7;
				border-radius: 0 0 10rpx 10rpx;
				display: flex;
				align-items: center;
				margin-top: 26rpx;
				flex-wrap: wrap;

				.serviceBtn {
					color: #5241ff;
				}
			}
		}

		.status {
			margin-top: 20rpx;
			padding-bottom: 0;
			border-bottom: 2rpx solid #e3e2e7;

			.add-member {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				color: #5241ff;
				font-size: 28rpx;
			}
		}

		.footer {
			overflow: hidden;
			padding: 50rpx 30rpx 0;
			background: unset;
			margin-bottom: 150rpx;
			font-size: 28rpx;

			.text-tips {
				color: #999;
				line-height: 40rpx;
			}

			.checkALLBtn {
				color: #5241ff;
				margin: 12rpx 0 20rpx 0;
			}
		}

		.footer-save {
			padding: 24rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.footer-next-step {
				width: 100%;
				line-height: 88rpx;
				text-align: center;
				color: #fff;
				background: #ccc;
				font-size: 32rpx;
				border-radius: 12rpx;
			}
		}

		.list-wrapper {
			box-sizing: border-box;
			white-space: nowrap;
			padding: 10rpx 20rpx;
			background: #fff;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #e3e2e7;

			.person-item {
				flex: 1;
				box-sizing: border-box;
				font-size: 30rpx;
				display: inline-block;
				position: relative;

				.name {
					padding: 0 0rpx 8rpx;

					.text {
						position: relative;

						.tips-icon {
							position: absolute;
							right: -50rpx;
							top: 22rpx;
							line-height: 44rpx;
							text-align: center;
							font-size: 20rpx;
							width: 44rpx;
							height: 44rpx;
							border-radius: 50%;
							display: inline-block;
							color: #5241ff;
							background: #f5f6f7;
							margin-top: -30rpx;
							font-style: italic;
						}
					}
				}

				.phone {
					font-size: 24rpx;
					font-weight: normal;
					color: #999;
				}

				.right {
					position: absolute;
					right: 0;
					top: 0;
				}


			}

			.right-box {
				display: flex;
				align-items: center;

				.btn {
					margin-left: 24rpx;
					padding: 6rpx 20rpx;
					font-size: 20rpx;
					border: 1px solid #e6e6e6;
					border-radius: 12rpx;
				}
			}
		}
	}
</style>