<template>
	<view class="xls-notice-setting-page">
		<jy-navbar title="通知设置"></jy-navbar>
		<view class="notice-content">
			<view class="message-title">消息通知设置</view>
			<view class="receive-msg">
				<text class="main-txt">接收消息的微信</text>
				<view class="right-set">
					<text class="sm-text" @click="goTo()">{{wechatSet ? '已设置' : '未设置'}}</text>
					<u-icon name="arrow-right" color="#999" size="32" />
				</view>
			</view>
			<view class="set-list" v-for="(set, dataIndex) in setInfolist" :key="dataIndex">
				<view class="message-title">{{ set.classTitle }}</view>
				<view class="receive-msg" v-for="(det, itemIndex) in set.summarizingList" :key="$getUniqueKey(dataIndex, itemIndex)">
					<view class="main-txt">
						{{ det.title }}
						<view class="sm-text">
							<text>{{ det.detail }}</text>
							<text v-show="det.inventory">每台设备库存少于 {{ det.inventory }} 推送消息</text>
							<text class="edit-btn" v-show="det.inventory" @click="setInvent(det)">设置</text>
						</view>
					</view>
					<view class="sm-text"><u-switch v-model="det.switch" size="50" active-color="#5241FF"
							@change="setPushMsg(det.id)"></u-switch></view>
				</view>
			</view>
		</view>
		<!-- 库存设置 -->
		<u-popup :show="setInventory" round="20" mode="center">
			<view class="setInventory-con home-family">
				<view class="title">请输入库存</view>
				<view class="info">
					<view class="other-box" v-show="isShowOtherset">
						<u-radio-group v-model="shjRadio">
							<view class="mint-radiolist">
								<view class="radio-item">
									<u-radio :name="1" active-color="#5241FF" icon-size="28" size="36" label-size="28"
										label="整机缺货通知"></u-radio>
								</view>
								<view class="radio-item label-right">
									<u-radio :name="2" active-color="#5241FF" icon-size="28" size="36" label-size="28"
										label="单货道缺货通知"></u-radio>
								</view>
							</view>
						</u-radio-group>
						<view class="popup-tips">缺货通知阈值：</view>
					</view>
					<u-number-box v-model="inventoryNum" button-size="72" input-width="70"
						iconStyle="font-size: 32rpx" />
				</view>
				<view class="btn-wrapper">
					<view class="btn cancel-btn" @click="setInventory = false">取消</view>
					<view class="btn" @click="setRepertory">确定</view>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import {
		baseController
	} from "@/api/index.js";
	import { getInfo } from "@/common/auth";
	export default {
		data() {
			return {
				setInventory: false,
				inventoryNum: 1,
				isShowOtherset: false,
				shjRadio: 1, //1：整机缺货通知，2：单货道 默认1
				setInfolist: [{
						classTitle: "汇总推送",
						summarizingList: [{
								id: 1,
								title: "每日收益概况",
								detail: "次日9:00推送",
								switch: false,
							},
							{
								id: 2,
								title: "时段收益概况",
								detail: "9:00 ~ 21:00,每隔3小时推送一次",
								switch: false,
							},
							{
								id: 3,
								title: "设备离线汇总",
								detail: "9:00 ~ 21:00,每隔3小时推送一次",
								switch: true,
							},
							{
								id: 4,
								title: "设备故障汇总",
								detail: "9:00 ~ 21:00,每隔3小时推送一次",
								switch: false,
							},
						],
					},
					{
						classTitle: "即时推送",
						summarizingList: [{
								id: 5,
								title: "订单消息",
								detail: "订单相关消息",
								switch: false
							},
							//补
							{
								id: 14,
								title: "订单退款消息",
								detail: "订单退款相关消息",
								switch: false,
							},
							{
								id: 6,
								title: "提现申请消息",
								detail: "提现申请相关消息",
								switch: false,
							},
							{
								id: 7,
								title: "服务消息通知",
								detail: "服务相关消息",
								switch: true,
							},
						],
					},
					{
						classTitle: "预警/报警通知",
						summarizingList: [{
								id: 8,
								title: "设备离线消息",
								detail: "00:00-24:00,设备离线即推送",
								switch: false,
							},
							/**
							 * @description:
							 * @return {*}
							 * @Date: 2023-12-06 09:55:05
							 */
							{
								id: 17,
								title: "设备在线消息",
								detail: "00:00-24:00,设备离线即推送",
								switch: false,
							},
							{
								id: 9,
								title: "设备故障消息",
								detail: "00:00-24:00,设备故障即推送",
								switch: false,
							},
							{
								id: 10,
								title: "设备流控消息",
								detail: "00:00-24:00,设备流控即推送",
								switch: true,
							},
							{
								id: 11,
								title: "娃娃机商品库存通知",
								inventory: 10,
								inventType: "wwj",
								switch: false,
							},
							{
								id: 12,
								title: "扭蛋机商品库存通知",
								inventory: 10,
								inventType: "ndj",
								switch: false,
							},
							{
								id: 13,
								title: "售货机商品库存通知",
								inventory: 10,
								inventType: "shj",
								switch: true,
							},
							{
								id: 15,
								title: "兑币机库存通知",
								inventory: 10,
								inventType: "dbj",
								switch: true,
							},
							{
								id: 16,
								title: "游戏类库存通知",
								inventory: 10,
								inventType: "yxl",
								switch: true,
							},
						],
					},
				],
				pushSetObj: {
					id: "",
					incomeSituationDay: 0, //每日收益概况;（1：启用，0：停用）默认：0
					incomeSituationTime: 0, //时段收益概况;（1：启用，0：停用）默认：0
					deviceOfflineCollect: 0, //设备离线汇总;（1：启用，0：停用）默认：0
					deviceMalfunctionCollect: 0, //设备故障汇总;（1：启用，0：停用）默认：0
					orderMsg: 0, //订单消息;（1：启用，0：停用）默认：0
					orderRefundMsg: 1, //订单退款消息;（1：启用，0：停用）默认：1
					applicationWithdrawal: 0, //提现申请消息;（1：启用，0：停用）默认：0
					serveMsg: 1, //服务消息通知;（1：启用，0：停用）默认：1
					deviceOfflineMsg: 1, //设备离线消息;（1：启用，0：停用）默认：1
					/**
					 * @description: 设备在线通知 默认 关闭
					 * @return {*}
					 * @Date: 2023-12-06 09:52:32
					 */
					deviceOnlineMsg: 0, //设备在线消息;（1：启用，0：停用）默认：0
					deviceMalfunctionMsg: 1, //设备故障消息;（1：启用，0：停用）默认：1
					deviceFluidControlMsg: 1, //设备流控消息;（1：启用，0：停用）默认：1
					craneMachineRepertoryMsg: 1, //娃娃机商品库存通知;（1：启用，0：停用）默认：1
					craneMachineRepertory: 10, //娃娃机商品库存;int，默认10
					eggRepertoryMsg: 1, //扭蛋机商品库存通知;（1：启用，0：停用）默认：1
					eggRepertory: 10, //扭蛋机商品库存;int，默认10
					vendingMachineRepertoryMsg: 1, //售货机商品库存通知;（1：启用，0：停用）默认：1
					vendingMachineRepertory: 10, //售货机商品库存;int，默认10
					commercialNumber: "ZTWL_20220617111542006", //商户号
					updateId: 18, //更新人id
					updateTime: "2022-07-11 09:59:28", //更新时间
					coinInventoryWarning: 1, // 兑币机库存通知; (1：启用，0：停用) 默认：1
					coinInventoryRepertory: 500, // 兑币机商品库存；int，默认500
					vendingMachineType: 1, //1：整机缺货通知，2：单货道 默认1
					gamingRepertoryMsg: 1, //游戏类商品库存通知;（1：启用，0：停用）默认：1
					gamingRepertory: 10, //游戏类商品库存;int，默认10
				},
				repertoryType: "",
				wechatSet: 0,
				// 映射 ID 到 pushSetObj 属性的对象
				idToProperty: {
					1: 'incomeSituationDay',
					2: 'incomeSituationTime',
					3: 'deviceOfflineCollect',
					4: 'deviceMalfunctionCollect',
					5: 'orderMsg',
					6: 'applicationWithdrawal',
					7: 'serveMsg',
					8: 'deviceOfflineMsg',
					9: 'deviceMalfunctionMsg',
					10: 'deviceFluidControlMsg',
					11: 'craneMachineRepertoryMsg',
					12: 'eggRepertoryMsg',
					13: 'vendingMachineRepertoryMsg',
					14: 'orderRefundMsg',
					15: 'coinInventoryWarning',
					16: 'gamingRepertoryMsg',
					17: 'deviceOnlineMsg'
				},
			};
		},
		async created() {
			this.getMessagePushSet();
			this.getWxSet();
		},
		methods: {
			goTo() {
				this.$goTo('/pages/subpackages/personal/noticeSet/detail');
			},
			// 微信设置
			async getWxSet() {
				const {commercialNumber} = getInfo();
				let res = await baseController.getWechatInform({commercialNumber});
				this.wechatSet = res.data.length;
			},
			async getMessagePushSet() {
				let res = await baseController.messagePushSet();
				if (res.code == 200) {
					this.pushSetObj = Object.assign(this.pushSetObj, res.data);
					this.shjRadio = this.pushSetObj.vendingMachineType == 1 ? 1 : 2;
					this.fristPushSet();
				}
			},

			// 赋值
			fristPushSet() {
				// 遍历 setInfolist
				this.setInfolist.forEach((item) => {
					item.summarizingList.forEach((params) => {
						// 根据 ID 查找对应的属性
						const property = this.idToProperty[params.id];
						if (property !== undefined) {
							params.switch = this.pushSetObj[property] == 1;

							// 处理 inventory 的情况
							if ([11, 12, 13, 16].includes(params.id)) {
								params.inventory = this.pushSetObj[property.replace('Msg', '')];
							}
							if ([15].includes(params.id)) {
								params.inventory = this.pushSetObj.coinInventoryRepertory;
							}
						}
					});
				});
			},

			// 传值
			setPushMsg(id) {
				let updated = false; // 用于标记是否已找到并更新
				this.setInfolist.some((item) => {
					return item.summarizingList.some((params) => {
						if (params.id == id) {
							const property = this.idToProperty[params.id];
							if (property) {
								this.pushSetObj[property] = params.switch ? 1 : 0;
								updated = true;
								return true; // 找到匹配项，退出 inner some
							}
						}
						return false; // 继续遍历
					});
				});

				if (updated) {
					this.setMessagePush();
				}
			},

			setMessagePush() {
				let _this = this;
				uni.$u.debounce(async function() {
					baseController.editMessagePushSet(_this.pushSetObj).then(res => {
						if (res.code == 200) {
							_this.setInventory = false;
							_this.getMessagePushSet();
						}
					})

				}, 200)
			},

			//设备库存设置
			setInvent(det) {
				this.inventoryNum = det.inventory;
				this.isShowOtherset = false;
				this.repertoryType = det.inventType;
				if (det.inventType == "shj") {
					this.isShowOtherset = true;
				}
				this.setInventory = true;
			},

			setRepertory() {
				const typeToProperty = {
					"wwj": 'craneMachineRepertory',
					"ndj": 'eggRepertory',
					"shj": 'vendingMachineRepertory',
					"dbj": 'coinInventoryRepertory',
					"yxl": 'gamingRepertory'
				};

				const property = typeToProperty[this.repertoryType];
				// 如果 repertoryType 不匹配任何类型，直接返回
				// if (!property) {
				// 	return;
				// }

				this.pushSetObj[property] = this.inventoryNum;

				if (this.repertoryType === "shj") {
					this.pushSetObj.vendingMachineType = this.shjRadio;
				}

				this.setMessagePush();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-notice-setting-page {
		width: 100%;
		font-family: PingFangSC, PingFangSC-Regular;
	}

	.notice-content {
		width: 100%;
		padding-bottom: 30px;

		.message-title {
			align-items: center;
			color: #999;
			display: flex;
			font-size: 14px;
			font-weight: 400;
			height: 45px;
			padding-left: 15px;
		}

		.receive-msg {
			align-items: center;
			background: #fff;
			border-bottom: 1px solid hsla(0, 0%, 80%, 0.3);
			display: flex;
			height: 60px;
			justify-content: space-between;
			padding: 0 15px;
			box-sizing: border-box;
		}

		.main-txt {
			color: #131313;
			font-size: 15px;
			font-weight: 400;
			line-height: 24px;
		}

		.right-set {
			display: flex;
			align-items: center;
		}

		.sm-text {
			color: #999;
			font-size: 13px;
			font-weight: 400;
			display: inline-block;
			display: flex;
			align-items: center;
			height: 100%;
			line-height: 19px;
		}

		.icons {
			padding-left: 8px;
		}

		.edit-btn {
			color: #5241ff;
			padding-left: 10px;
		}
	}

	// popup
	.setInventory-con {
		min-width: 270px;
		min-height: 185px;
		display: flex;
		flex-direction: column;

		.title {
			color: #262626;
			font-size: 19px;
			font-weight: 700;
			margin-top: 20px;
			text-align: center;
		}

		.info {
			flex: 1;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 16px 20px 20px;

			.other-box {
				margin-bottom: 15px;

				.mint-radiolist {
					display: flex;
					height: 50px;
					align-items: center;

					.radio-item {
						flex: 1;
						font-size: 16px;
						line-height: 50px;
						white-space: nowrap;
					}

					.label-right {
						margin-left: 12px;
					}
				}

				.popup-tips {
					font-size: 16px;
					color: #8c8c8c;
				}
			}
		}

		.btn-wrapper {
			border-top: 1px solid #e6e6e6;
			display: flex;

			.btn {
				flex: 1;
				color: #5241ff;
				font-size: 18px;
				line-height: 50px;
				text-align: center;
				user-select: none;
			}

			.cancel-btn {
				border-right: 1px solid #e6e6e6;
				color: #595959;
			}
		}
	}
</style>