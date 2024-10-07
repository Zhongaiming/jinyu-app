<template>
	<z-paging ref="memberPaging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="用户详情" bgColor="#5241ff" titleStyle="color: #fff" slot="top"></xls-jy-navbar>

		<header-vue></header-vue>
		
		<view class="record-btn" @click="showRecord = !showRecord" v-show="!showRecord">
			<span>会员消费记录
				<!-- <van-icon name="arrow-up" size="18" color="#999"/> -->
			</span>
		</view>
		<!-- 会员消费记录 -->
		<view class="record-container-hidden" :class="{'main-record':showRecord}">
			<view class="record-btn" @click="showRecord = !showRecord">
				<span>会员消费记录
					<!-- <van-icon name="arrow-down" size="18" color="#999" -->
					/></span>
			</view>
			<view class="record-container">
				<view class="tab-wrapper">
					<view class="tab tab1" :class="{'active-tab':payType}" @click="cutType('pay')">
						支付订单
					</view>
					<view class="tab tab2" :class="{'active-tab':!payType}" @click="cutType('coin')">
						余额余币明细
					</view>
				</view>
				<!-- 支付订单 -->
				<view class="payment-record-container" v-if="payType">
					<view class="payment-record-wrapper">
						<!-- 搜索 -->
						<view class="search-con">
							<view class="left">
								<!-- <van-dropdown-menu active-color="#5241FF">
                    <van-dropdown-item
                      v-model="value1"
                      :options="option1"
                      @change="beOndutyState"
                    />
                  </van-dropdown-menu> -->
							</view>
							<image :src="`${$baseUrl}appV4/img/icons/search.png`" alt="" style="padding-right: 10px"
								@click="orderSearch" />
							<input type="text" :placeholder="'输入' + typeName" v-model="searchValue"
								@keyup.13="orderSearch" @blur="orderSearch" />
						</view>
						<!-- 条件筛选 -->
						<view class="fliter-condition">
							<!-- <van-dropdown-menu active-color="#5241FF">
                  <van-dropdown-item title="场地名称" ref="itemPlace">
                    <view class="consume-place">
                      <search-input
                        placeholder="请输入场地名称"
                        marLeft="-5.5em"
                        @stratesSearch="stratesSearch"
                      ></search-input>
                      <view class="cell-container">
                        <view class="cell-item">
                          <view class="cell-title"><span>全部</span></view>
                          <van-checkbox
                            v-model="allCheck"
                            icon-size="20px"
                            checked-color="#5241FF"
                            @click="$refs.placeCheckGroup.toggleAll(allCheck)"
                            style="margin: 0"
                          >
                          </van-checkbox>
                        </view>
                        <van-checkbox-group
                          v-model="placeCheckGroup"
                          direction="horizontal"
                          ref="placeCheckGroup"
                        >
                          <view
                            class="cell-item"
                            v-for="(item, index) in placeList"
                            :key="index"
                          >
                            <view class="cell-title">
                              <span>{{ item.placeName }}</span>
                            </view>
                            <van-checkbox
                              :name="item.placeId"
                              icon-size="18px"
                              style="margin: 0"
                              checked-color="#5241FF"
                              @click="
                                allCheck =
                                  placeCheckGroup.length == placeList.length
                              "
                            ></van-checkbox>
                          </view>
                          <on-earth />
                        </van-checkbox-group>
                      </view>
                      <view class="btn-content">
                        <view
                          class="btn"
                          @click="
                            $refs.placeCheckGroup.toggleAll(false),
                              (allCheck = false)
                          "
                        >
                          重置
                        </view>
                        <view class="btn comfrim" @click="confirmBtn('place')">
                          确定<span style="margin-left: 6px"
                            >(
                            {{ placeCheckGroup.length }}
                            )</span
                          >
                        </view>
                      </view>
                    </view>
                  </van-dropdown-item>
                  <van-dropdown-item title="设备类型" ref="itemDevice">
                    <view class="consume-place">
                      <view class="cell-container">
                        <van-radio-group v-model="screenCondition.deviceTypeId">
                          <view
                            class="cell-item"
                            v-for="(item, index) in deviceType"
                            :key="index"
                            style="padding: 0"
                          >
                            <view class="cell-title">
                              <van-cell
                                :title="item.name"
                                style="padding-left: 0"
                              />
                            </view>
                            <van-radio
                              checked-color="#5241FF"
                              :name="item.id"
                            ></van-radio>
                          </view>
                        </van-radio-group>
                      </view>
                      <view class="btn-content">
                        <view
                          class="btn"
                          @click="screenCondition.deviceTypeId = ''"
                        >
                          重置
                        </view>
                        <view class="btn comfrim" @click="confirmBtn">确定</view>
                      </view>
                    </view>
                  </van-dropdown-item>
                  <van-dropdown-item title="交易类型" ref="itemType">
                    <view class="consume-place">
                      <view class="cell-container-no">
                        <van-cell
                          v-for="(item, index) in payTypeList"
                          :key="index"
                          :title="item.name"
                          :value="screenCondition.payType == item.id ? '✔' : ''"
                          @click="screenCondition.payType = item.id"
                        />
                      </view>
                      <view class="btn-content">
                        <view class="btn" @click="screenCondition.payType = ''">
                          重置
                        </view>
                        <view class="btn comfrim" @click="confirmBtn">确定</view>
                      </view>
                    </view>
                  </van-dropdown-item>
                  <van-dropdown-item title="交易状态" ref="itemState">
                    <view class="consume-place">
                      <view class="cell-container-no">
                        <van-cell
                          v-for="(item, index) in stateList"
                          :key="index"
                          :title="item.name"
                          :value="screenCondition.state == item.id ? '✔' : ''"
                          @click="screenCondition.state = item.id"
                        />
                      </view>
                      <view class="btn-content">
                        <view class="btn" @click="screenCondition.state = ''">
                          重置
                        </view>
                        <view class="btn comfrim" @click="confirmBtn">确定</view>
                      </view>
                    </view>
                  </van-dropdown-item>
                </van-dropdown-menu> -->
						</view>
						<view class="dateSelector-container">
							<view class="item" v-for="(item, index) in fastTimer" :key="index"
								:class="{'active-btn':activeFastimer == item.id}" @click="pickerTime(item.id)">
								{{ item.timer }}
							</view>
						</view>
					</view>
				</view>
				<!-- 余额余币 -->
				<view class="payment-record-container record-module-wrapper" v-else>
					<view class="payment-record-wrapper">
						<view class="fliter-condition">
							<!-- <van-dropdown-menu active-color="#5241FF" v-if="0">
                  <van-dropdown-item title="场地名称" ref="itemPlace">
                    <view class="consume-place">
                      <search-input
                        placeholder="请输入场地名称"
                        marLeft="-5.5em"
                        @stratesSearch="stratesSearch"
                      ></search-input>
                      <view class="cell-container">
                        <view class="cell-item">
                          <view class="cell-title"><span>全部</span></view>
                          <van-checkbox
                            v-model="allCheck"
                            icon-size="20px"
                            @click="$refs.placeCheckGroup.toggleAll(allCheck)"
                            style="margin: 0"
                            checked-color="#5241FF"
                          >
                          </van-checkbox>
                        </view>
                        <van-checkbox-group
                          v-model="placeCheckGroup"
                          direction="horizontal"
                          ref="placeCheckGroup"
                        >
                          <view
                            class="cell-item"
                            v-for="(item, index) in placeList"
                            :key="index"
                          >
                            <view class="cell-title">
                              <span>{{ item.placeName }}</span>
                            </view>
                            <van-checkbox
                              :name="item.placeId"
                              icon-size="18px"
                              style="margin: 0"
                              checked-color="#5241FF"
                              @click="
                                allCheck =
                                  placeCheckGroup.length == placeList.length
                              "
                            ></van-checkbox>
                          </view>
                          <on-earth />
                        </van-checkbox-group>
                      </view>
                      <view class="btn-content">
                        <view
                          class="btn"
                          @click="
                            $refs.placeCheckGroup.toggleAll(false),
                              (allCheck = false)
                          "
                        >
                          重置
                        </view>
                        <view class="btn comfrim" @click="confirmBtn('place')">
                          确定<span style="margin-left: 6px"
                            >(
                            {{ placeCheckGroup.length }}
                            )</span
                          >
                        </view>
                      </view>
                    </view>
                  </van-dropdown-item>
                  <van-dropdown-item title="设备类型" ref="itemDevice">
                    <view class="consume-place">
                      <view class="cell-container">
                        <van-radio-group v-model="screenCondition.deviceTypeId">
                          <view
                            class="cell-item"
                            v-for="(item, index) in deviceType"
                            :key="index"
                            style="padding: 0"
                          >
                            <view class="cell-title">
                              <van-cell
                                :title="item.name"
                                style="padding-left: 0"
                              />
                            </view>
                            <van-radio
                              checked-color="#5241FF"
                              :name="item.id"
                            ></van-radio>
                          </view>
                        </van-radio-group>
                      </view>
                      <view class="btn-content">
                        <view
                          class="btn"
                          @click="screenCondition.deviceTypeId = ''"
                        >
                          重置
                        </view>
                        <view class="btn comfrim" @click="confirmBtn">确定</view>
                      </view>
                    </view>
                  </van-dropdown-item>
                </van-dropdown-menu> -->
						</view>
						<view class="dateSelector-container">
							<view class="item" v-for="(item, index) in fastTimer" :key="index"
								:class="{'active-btn':activeFastimer == item.id}" @click="pickerTime(item.id)">
								{{ item.timer }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单列表 -->
			<view class="cell-container-list" @scroll="scrollRecord">
				<view class="order-item" v-for="(item, index) in memberList" :key="index" @click="
              payType
                ? $router.push({
                    name: 'orderDetail',
                    query: { detail: JSON.stringify(item) },
                  })
                : ''
            ">
					<view class="text-main">
						<view class="top-list">
							<view class="left">
								<span v-show="payType">{{
                    item.type == 1
                      ? "充值订单"
                      : item.type == 2
                      ? "设备启动"
                      : item.type == 3
                      ? "余币购买"
                      : item.type == 4
                      ? "余额购买"
                      : "其他类型"
                  }}</span>
								<span v-show="!payType">{{
                    item.operationType == 1
                      ? "设备启动"
                      : item.operationType == 2
                      ? "启动失败退回"
                      : item.operationType == 3
                      ? "商家操作"
                      : item.operationType == 4
                      ? "会员充值"
                      : "活动"
                  }}</span>
							</view>
							<view class="right" v-show="payType">
								<span class="error" v-if="item.refundState">
									{{
                      item.refundState == -1
                        ? "异常"
                        : item.refundState == 0
                        ? "失败"
                        : item.refundState == 1
                        ? "退款成功"
                        : item.refundState == 2
                        ? "退款中"
                        : "(其他)"
                    }}
									{{
                      item.refundType == 0
                        ? "(出货失败退款)"
                        : item.refundType == 1
                        ? "(部分退款)"
                        : item.refundType == 2
                        ? "(人工退款)"
                        : item.refundType == 3
                        ? "(通讯失败退款)"
                        : "(其他)"
                    }}
								</span>
								<span class="success" v-else>{{
                    item.state == 0 ? "待支付" : "交易成功"
                  }}</span>
							</view>
							<view class="right" v-show="!payType">
								{{
                    item.operationDataType == 1
                      ? "余额"
                      : item.operationDataType == 2
                      ? "余币"
                      : "积分"
                  }}
							</view>
						</view>
						<view class="info-list">
							<view class="left">
								<span class="item" v-show="payType"
									v-html="item.payType == 0 ? '微信付款' : '支付宝付款'"></span>
								<span class="item">{{ item.createTime }}</span>
							</view>
							<view class="right">
								<span class="price" v-if="payType">{{ item.amountTotal }}元</span>
								<span class="price" v-show="!payType && item.operationCurrency != null"
									:style="{color:item.operationCurrency<0?'red':''}">
									{{
                      item.operationCurrency > 0
                        ? "+" + item.operationCurrency
                        : item.operationCurrency
                    }}
								</span>
								<span class="price" v-show="!payType && item.operationBalance != null"
									:style=" {color:item.operationBalance<0?'red':''}">
									{{
                      item.operationBalance > 0
                        ? "+" + item.operationBalance
                        : item.operationBalance
                    }}
								</span>
								{{
                    item.operationDataType == 1
                      ? "元"
                      : item.operationDataType == 2
                      ? "币"
                      : ""
                  }}
							</view>
						</view>
						<view class="info-list" v-show="item.deviceNumber">
							<span class="store-name">
								{{
                    item.placeName ? item.placeName : item.transactionPlaceName
                  }}-<span>
									{{
                      item.deviceTypeName ? item.deviceTypeName : item.typeName
                    }}</span>
								<span>{{ item.deviceNumber }}-{{
                      item.railSpace
                        ? item.railSpace
                        : item.shippingSpace || "1"
                    }}-{{ item.railNumber }}</span>
							</span>
						</view>
						<view class="info-list" v-show="item.operationRemark">
							<span class="store-name">
								备注：{{ item.operationRemark }}
							</span>
						</view>
					</view>
					<!-- <van-icon
              name="arrow"
              size="16"
              color="#969799"
              style="padding: 3px 0 0 6px"
              v-show="payType"
            /> -->
				</view>
				<on-earth v-if="
              (payType && memberList.length) ||
              (onEarth && !payType && memberList.length)
            " />
				<!-- <no-data v-if="!memberList.length" /> -->
			</view>
		</view>
		<!-- 时间选择器 -->
		<!-- <van-calendar
        v-model="showDate"
        type="range"
        @confirm="onConfirm"
        :max-range="180"
        allow-same-day
        range-prompt="只能查询半年的数据"
        :min-date="minDate"
        :max-date="maxDate"
        :round="false"
        color="#5241FF"
      /> -->
	</z-paging>
</template>

<script>
	import {
		memberController
	} from '@/api/index.js';
	import headerVue from './components/xls-detail/header.vue';
	// import { getPlaceDeviceList } from "@/utils/api/place"
	// import { getDateAll } from "@/plugins/utilityClass"
	// import storage from "@/plugins/storage"

	export default {
		components: { headerVue },
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
		// async created() {
		//   this.getPlaceList();
		//   let member = storage.getSion("member");
		//   this.userMsg = member;
		//   //会员订单
		//   this.getMemberList();
		//   //会员详情
		//   let res = await getMemberById({
		//     memberNumber: this.userMsg.memberNumber,
		//     memberOpenid: this.userMsg.memberOpenid,
		//   })
		//   if (res.data.data) {
		//     this.orderDetail = res.data.data;
		//   }
		// },
		methods: {
			
			queryList() {

			},
			//会员订单列表
			// scrollRecord(event) {
			// 	var scrollTop = event.target.scrollTop;
			// 	var scrollHeight = event.target.scrollHeight;
			// 	var clientHeight = event.target.clientHeight;
			// 	if (
			// 		scrollTop + clientHeight + 50 >= scrollHeight &&
			// 		!this.onEarth &&
			// 		!this.payType
			// 	) {
			// 		this.getCoinList();
			// 	}
			// },
			// getMemberList: debounceFun(async function() {
			// 	let res = await getMemberOrderForm({
			// 		memberOpenid: this.userMsg.memberOpenid,
			// 		startTime: this.screenCondition.startTime,
			// 		endTime: this.screenCondition.endTime,
			// 		placeId: this.screenCondition.placeIds,
			// 		deviceType: this.screenCondition.deviceTypeId,
			// 		state: this.screenCondition.state, //状态 -1退单 1交易完成
			// 	});
			// 	if (res.code == 200 || res.data.msg == "ok") {
			// 		if (res.data.data != null) {
			// 			if (res.data.data.length < 50) {
			// 				this.onEarth = true;
			// 			} else {
			// 				this.onEarth = false;
			// 			}
			// 			if (this.page > 1) {
			// 				this.memberList = [...this.memberList, ...res.data.data];
			// 			} else {
			// 				this.memberList = res.data.data;
			// 			}
			// 		}
			// 	}
			// }, 500),
			//确定
			confirmBtn(params) {
				if (params == "place") {
					this.screenCondition.placeIds = this.allCheck ?
						"" :
						this.placeCheckGroup.length ?
						String(this.placeCheckGroup) :
						"";
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