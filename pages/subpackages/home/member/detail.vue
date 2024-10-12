<template>
	<z-paging ref="memberPaging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="用户详情" bgColor="#5241ff" titleStyle="color: #fff" slot="top"></xls-jy-navbar>

		<header-vue :userMsg="userMsg" :orderDetail="orderDetail"></header-vue>

		<!-- 会员消费记录 -->
		<view class="record-container-hidden main-record">
			<view class="record-container">
				<view class="tab-wrapper">
					<view class="tab tab1" :class="{'active-tab':payType}" @click="cutType('pay')">
						支付订单
					</view>
					<view class="tab tab2" :class="{'active-tab':!payType}" @click="cutType('coin')">
						余额余币明细
					</view>
				</view>
			</view>
			
			
		</view>
		
	</z-paging>
</template>

<script>
	import {
		memberController
	} from '@/api/index.js';
	import headerVue from './components/xls-detail/header.vue';
	import xlsMemberOrderList from './components/xls-member-order-list/index.vue';
	import { getDateAll } from "@/plugins/utilityClass";
	import storage from "@/plugins/storage"

	export default {
		components: {
			headerVue
		},
		data() {
			return {
				dataList: [],
				payType: true,
				//搜索
				value1: 0,
				option1: [{
						text: "交易订单",
						value: 0
					},
					{
						text: "设备编号",
						value: 1
					},
				],
				typeName: "交易订单",
				searchValue: "",
				//场地
				allCheck: false,
				placeCheckGroup: [],
				placeList: [],
				searchPlace: "",
				//时间
				fastTimer: [{
						id: 1,
						timer: "今天"
					},
					{
						id: 2,
						timer: "昨天"
					},
					{
						id: 3,
						timer: "近7天"
					},
					{
						id: 4,
						timer: "近30天"
					},
					{
						id: 5,
						timer: "近90天"
					},
					{
						id: 6,
						timer: "自定义"
					},
				],
				activeFastimer: 1,
				showDate: false,
				// minDate: new Date(getDateAll(360)),
				// maxDate: new Date(getDateAll(0)),
				//会员详情
				showRecord: false,
				userMsg: {},
				orderDetail: {},
				//订单
				memberList: [],
				onEarth: false,
				// 筛选条件
				screenCondition: {
					placeIds: "",
					deviceTypeId: "",
					state: "",
					// startTime: getDateAll(0),
					// endTime: getDateAll(0),
					payType: "",
				},
				deviceType: [{
						id: "",
						name: "全部"
					},
					{
						id: 1,
						name: "兑币机"
					},
					{
						id: 2,
						name: "扭蛋机"
					},
					{
						id: 3,
						name: "售货机"
					},
					{
						id: 4,
						name: "娃娃机"
					},
					{
						id: 5,
						name: "游乐车"
					},
				],
				payTypeList: [{
						id: "",
						name: "全部"
					},
					{
						id: 1,
						name: "设备启动"
					},
					{
						id: 2,
						name: "账户充值"
					},
					{
						id: 3,
						name: "会员卡购买"
					},
					{
						id: 4,
						name: "微信支付分"
					},
				],
				stateList: [{
						id: "",
						name: "全部"
					},
					{
						id: 1,
						name: "交易成功"
					},
					{
						id: -1,
						name: "退款"
					},
				],
				//派发福利
				partWelfare: false,
				welfareForm: {
					operationCurrency: null,
					operationBalance: null,
					operationRemark: null,
				},
				pageCoin: 0,
			};
		},
		onLoad(option) {
			if (option.params) {
				const member = JSON.parse(option.params)
				this.userMsg = member
				this.getMemberDetail()
			}
		},
		methods: {
			async getMemberDetail() {
				let res = await memberController.getMemberById({
					memberNumber: this.userMsg.memberId,
					memberOpenid: this.userMsg.memberOpenid,
				})
				if (res.code == 200) {
					this.orderDetail = res.data
				}
			},
			//会员订单列表
			queryList(pageNo, pageSize) {
				memberController.getMemberOrderForm({
					memberOpenid: this.userMsg.memberOpenid,
					startTime: this.screenCondition.startTime,
					endTime: this.screenCondition.endTime,
					placeId: this.screenCondition.placeIds,
					deviceType: this.screenCondition.deviceTypeId,
					state: this.screenCondition.state, //状态 -1退单 1交易完成
				}).then(res => {
					if(res.code == 200) {
						this.$refs.memberPaging.complete(res.data)
					}
				})
			},
			
			//确定
			confirmBtn(params) {
				if (params == "place") {
					this.screenCondition.placeIds = this.allCheck ?"" :
						this.placeCheckGroup.length ?String(this.placeCheckGroup) :"";
				}

				this.$refs.itemPlace.toggle(false);
				this.$refs.itemDevice.toggle(false);

				if (this.payType) {
					this.$refs.itemType.toggle(false);
					this.$refs.itemState.toggle(false);
					this.getMemberList();
				} else {
					this.pageCoin = 0;
					this.onEarth = false;
					this.getCoinList();
				}
			},

			//场地设备数量列表
			// getPlaceList: debounceFun(async function() {
			// 	let res = await getPlaceDeviceList({
			// 		placeName: encodeURIComponent(this.searchPlace),
			// 	});
			// 	if (res.data.data != null) {
			// 		this.placeList = res.data.data;
			// 	}
			// }, 500),
			//search-place
			stratesSearch(search) {
				this.searchPlace = search;
				this.getPlaceList();
			},
			//搜索
			beOndutyState(text) {
				this.searchValue = "";
				if (text) {
					this.typeName = "设备编号";
				} else {
					this.typeName = "交易订单";
				}
			},
			//会员消费记录支付订单
			orderSearch() {},
			cutType(type) {
				this.memberList = [];
				if (type == "pay") {
					this.payType = true;
					this.getMemberList();
				} else {
					this.payType = false;
					this.pageCoin = 0;
					this.onEarth = false;
					this.getCoinList();
				}
			},
			//时间
			pickerTime(id) {
				this.activeFastimer = id;
				if (this.selecTime(id)[0] != 6) {
					this.screenCondition.startTime = this.selecTime(id)[0];
					this.screenCondition.endTime = this.selecTime(id)[1];
					if (this.payType) {
						this.getMemberList();
					} else {
						this.pageCoin = 0;
						this.onEarth = false;
						this.getCoinList();
					}
				} else {
					this.showDate = true;
				}
			},
			selecTime(id) {
				let today = getDateAll(0);
				let yestoday = getDateAll(1);
				let seven = getDateAll(7);
				let three = getDateAll(30);
				let nine = getDateAll(90);
				switch (id) {
					case 1:
						return [today, today];
						break;
					case 2:
						return [yestoday, yestoday];
						break;
					case 3:
						return [seven, today];
						break;
					case 4:
						return [three, today];
						break;
					case 5:
						return [nine, today];
						break;
					case 6:
						return [6, 6];
						break;
					default:
						return ["", ""];
						break;
				}
			},
			//余额余币
			// getCoinList: debounceFun(async function() {
			// 	let res = await getCoinFlowingList({
			// 		page: ++this.pageCoin,
			// 		size: 50,
			// 		memberNumber: this.userMsg.memberNumber, //用户编码
			// 		placeIds: this.screenCondition.placeIds ?
			// 			this.screenCondition.placeIds :
			// 			null,
			// 		deviceType: this.screenCondition.deviceTypeId ?
			// 			this.screenCondition.deviceTypeId :
			// 			null,
			// 		startTime: this.screenCondition.startTime ?
			// 			this.screenCondition.startTime + " " + "00:00:00" :
			// 			null,
			// 		endTime: this.screenCondition.endTime ?
			// 			this.screenCondition.endTime + " " + "23:59:59" :
			// 			null,
			// 	});
			// 	if (res.data.data != null) {
			// 		if (res.data.data.records.length < 50) {
			// 			this.onEarth = true;
			// 		} else {
			// 			this.onEarth = false;
			// 		}
			// 		if (this.pageCoin > 1) {
			// 			this.memberList = [...this.memberList, ...res.data.data.records];
			// 		} else {
			// 			this.memberList = res.data.data.records;
			// 		}
			// 	}
			// }, 500),
			
			//选择日期
			onConfirm(date) {
				const [start, end] = date;
				this.showDate = false;
				this.screenCondition.startTime = this.formatDate(start);
				this.screenCondition.endTime = this.formatDate(end);
				if (this.payType) {
					this.getMemberList();
				} else {
					this.pageCoin = 0;
					this.onEarth = false;
					this.getCoinList();
				}
			},
			//派发福利
			async confirmWelfare() {
				let params = {
					memberNumber: String(this.userMsg.id),
					operationCurrency: this.welfareForm.operationCurrency != "" &&
						this.welfareForm.operationCurrency * 1 > 0 ?
						this.welfareForm.operationCurrency : null,
					operationBalance: this.welfareForm.operationBalance != "" &&
						this.welfareForm.operationBalance * 1 > 0 ?
						this.welfareForm.operationBalance : null,
					operationRemark: this.welfareForm.operationRemark != "" ?
						this.welfareForm.operationRemark : null,
					type: 1,
				};
				if (!this.welfareForm.operationCurrency) {
					delete params.operationCurrency;
				}
				if (!this.welfareForm.operationBalance) {
					delete params.operationBalance;
				}
				let res = await welfare(params);
				if (res.data.msg == "ok" || res.code == 200) {
					this.$toast("派发成功~");
					if (this.welfareForm.operationCurrency != null) {
						this.userMsg.currency =
							this.userMsg.currency * 1 + this.welfareForm.operationCurrency * 1;
					}
					if (this.welfareForm.operationBalance != null) {
						this.userMsg.balance =
							this.userMsg.balance * 1 + this.welfareForm.operationBalance * 1;
					}
					this.welfareForm = {
						operationCurrency: null,
						operationBalance: null,
						operationRemark: null,
					};
					this.parentBalance(this.userMsg.balance);
					this.parentCurrency(this.userMsg.currency);
					storage.setSion("member", this.userMsg);
					this.partWelfare = false;
				}
			},
			parentBalance(balance) {
				this.$parent.member.balance = balance;
				this.userMsg.balance = balance;
			},
			parentCurrency(currency) {
				this.$parent.member.currency = currency;
				this.userMsg.currency = currency;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'detail.scss';
</style>