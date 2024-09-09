<template>
    <div class="xls-member-detail-page">
      <xls-jy-navbar title="用户详情" bgColor="#5241ff" titleStyle="color: #fff"></xls-jy-navbar>
	  
      <div class="top-container" v-show="!showRecord">
        <div class="info-container">
          <div class="info-content">
            <div class="avatar">
              <img :src="userMsg.url" alt="" class="header" />
            </div>
            <div class="info">
              <div class="nickname">
                <span class="name van-ellipsis">{{ userMsg.name }}</span>
              </div>
              <div class="other-info">
                <div class="id">ID:{{ userMsg.id }}</div>
                <div class="copy" @click.stop="copyMemberId(userMsg.id)">
                  <span class="text">复制</span>
                </div>
              </div>
            </div>
            <div class="declaration" @click="$refs.notice.showTips(1)">
              <p class="text">数据说明</p>
            </div>
            <!-- <notice-tips ref="notice" /> -->
          </div>
          <div class="total-container">
            <div class="total-list">
              <div class="number">
                <div>{{ userMsg.totalPay }}</div>
              </div>
              <div class="name"><div class="text">累计支付(元)</div></div>
            </div>
            <div
              class="total-list"
              @click="
                $router.push({
                  name: 'accountDetail',
                  query: { type: 'balance' },
                })
              "
            >
              <div class="number">
                <div>{{ userMsg.balance }}</div>
              </div>
              <div class="name">
                <div class="text">余额(元)</div>
                <div class="arrow-icon"></div>
              </div>
            </div>
            <div
              class="total-list"
              @click="
                $router.push({
                  name: 'accountDetail',
                  query: { type: 'currency' },
                })
              "
            >
              <div class="number">
                <div>{{ userMsg.currency }}</div>
              </div>
              <div class="name">
                <div class="text">余币(个)</div>
                <div class="arrow-icon"></div>
              </div>
            </div>
          </div>
          <div class="rights-container">
            <div class="rights-list">
              <div class="name"><span>会员卡</span></div>
              <div class="number">0</div>
            </div>
            <div class="line"></div>
            <div class="rights-list">
              <div class="name"><span>优惠卷</span></div>
              <div class="number">0</div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-content" v-show="!showRecord">
        <div class="menu-container">
          <div class="menu-list" @click="partWelfare = true">
            <!-- <van-icon
              name="gold-coin-o"
              color="#5241FF"
              size="24"
              class="icon-tab"
            /> -->
            <div class="name">派发福利</div>
          </div>
          <div
            class="menu-list"
            @click="
              $router.push({
                name: 'userInfo',
              })
            "
          >
            <!-- <van-icon name="bars" color="#5241FF" size="24" class="icon-tab" /> -->
            <div class="name">更多资料</div>
          </div>
        </div>

        <div class="statis-statistics">
          <div class="statis-item">
            <div class="statis-money">{{ $formatAmount(orderDetail.cumulativeRecharge) }}</div>
            <div class="statis-title">累计充值(元)</div>
          </div>
          <div class="statis-item">
            <div class="statis-money">{{ $formatAmount(orderDetail.startPayment) }}</div>
            <div class="statis-title">启动支付(元)</div>
          </div>
          <div class="statis-item">
            <div class="statis-money">{{ $formatAmount(orderDetail.balancePayment) }}</div>
            <div class="statis-title">余额支付(元)</div>
          </div>
          <div class="statis-item">
            <div class="statis-money">{{ orderDetail.cumulativeCoin }}</div>
            <div class="statis-title">累计投币(个)</div>
          </div>
        </div>
      </div>
	  
      
      <div
        class="record-btn"
        @click="showRecord = !showRecord"
        v-show="!showRecord"
      >
        <span
          >会员消费记录 
		  <!-- <van-icon name="arrow-up" size="18" color="#999"/> -->
		  </span>
      </div>
      <!-- 会员消费记录 -->
      <div
        class="record-container-hidden"
        :class="{'main-record':showRecord}"
      >
        <div class="record-btn" @click="showRecord = !showRecord">
          <span
            >会员消费记录 
			<!-- <van-icon name="arrow-down" size="18" color="#999" -->
          /></span>
        </div>
        <div class="record-container">
          <div class="tab-wrapper">
            <div
              class="tab tab1"
              :class="{'active-tab':payType}"
              @click="cutType('pay')"
            >
              支付订单
            </div>
            <div
              class="tab tab2"
              :class="{'active-tab':!payType}"
              @click="cutType('coin')"
            >
              余额余币明细
            </div>
          </div>
          <!-- 支付订单 -->
          <div class="payment-record-container" v-if="payType">
            <div class="payment-record-wrapper">
              <!-- 搜索 -->
              <div class="search-con">
                <div class="left">
                  <!-- <van-dropdown-menu active-color="#5241FF">
                    <van-dropdown-item
                      v-model="value1"
                      :options="option1"
                      @change="beOndutyState"
                    />
                  </van-dropdown-menu> -->
                </div>
                <image
                  :src="`${$baseUrl}appV4/img/icons/search.png`"
                  alt=""
                  style="padding-right: 10px"
                  @click="orderSearch"
                />
                <input
                  type="text"
                  :placeholder="'输入' + typeName"
                  v-model="searchValue"
                  @keyup.13="orderSearch"
                  @blur="orderSearch"
                />
              </div>
              <!-- 条件筛选 -->
              <div class="fliter-condition">
                <!-- <van-dropdown-menu active-color="#5241FF">
                  <van-dropdown-item title="场地名称" ref="itemPlace">
                    <div class="consume-place">
                      <search-input
                        placeholder="请输入场地名称"
                        marLeft="-5.5em"
                        @stratesSearch="stratesSearch"
                      ></search-input>
                      <div class="cell-container">
                        <div class="cell-item">
                          <div class="cell-title"><span>全部</span></div>
                          <van-checkbox
                            v-model="allCheck"
                            icon-size="20px"
                            checked-color="#5241FF"
                            @click="$refs.placeCheckGroup.toggleAll(allCheck)"
                            style="margin: 0"
                          >
                          </van-checkbox>
                        </div>
                        <van-checkbox-group
                          v-model="placeCheckGroup"
                          direction="horizontal"
                          ref="placeCheckGroup"
                        >
                          <div
                            class="cell-item"
                            v-for="(item, index) in placeList"
                            :key="index"
                          >
                            <div class="cell-title">
                              <span>{{ item.placeName }}</span>
                            </div>
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
                          </div>
                          <on-earth />
                        </van-checkbox-group>
                      </div>
                      <div class="btn-content">
                        <div
                          class="btn"
                          @click="
                            $refs.placeCheckGroup.toggleAll(false),
                              (allCheck = false)
                          "
                        >
                          重置
                        </div>
                        <div class="btn comfrim" @click="confirmBtn('place')">
                          确定<span style="margin-left: 6px"
                            >(
                            {{ placeCheckGroup.length }}
                            )</span
                          >
                        </div>
                      </div>
                    </div>
                  </van-dropdown-item>
                  <van-dropdown-item title="设备类型" ref="itemDevice">
                    <div class="consume-place">
                      <div class="cell-container">
                        <van-radio-group v-model="screenCondition.deviceTypeId">
                          <div
                            class="cell-item"
                            v-for="(item, index) in deviceType"
                            :key="index"
                            style="padding: 0"
                          >
                            <div class="cell-title">
                              <van-cell
                                :title="item.name"
                                style="padding-left: 0"
                              />
                            </div>
                            <van-radio
                              checked-color="#5241FF"
                              :name="item.id"
                            ></van-radio>
                          </div>
                        </van-radio-group>
                      </div>
                      <div class="btn-content">
                        <div
                          class="btn"
                          @click="screenCondition.deviceTypeId = ''"
                        >
                          重置
                        </div>
                        <div class="btn comfrim" @click="confirmBtn">确定</div>
                      </div>
                    </div>
                  </van-dropdown-item>
                  <van-dropdown-item title="交易类型" ref="itemType">
                    <div class="consume-place">
                      <div class="cell-container-no">
                        <van-cell
                          v-for="(item, index) in payTypeList"
                          :key="index"
                          :title="item.name"
                          :value="screenCondition.payType == item.id ? '✔' : ''"
                          @click="screenCondition.payType = item.id"
                        />
                      </div>
                      <div class="btn-content">
                        <div class="btn" @click="screenCondition.payType = ''">
                          重置
                        </div>
                        <div class="btn comfrim" @click="confirmBtn">确定</div>
                      </div>
                    </div>
                  </van-dropdown-item>
                  <van-dropdown-item title="交易状态" ref="itemState">
                    <div class="consume-place">
                      <div class="cell-container-no">
                        <van-cell
                          v-for="(item, index) in stateList"
                          :key="index"
                          :title="item.name"
                          :value="screenCondition.state == item.id ? '✔' : ''"
                          @click="screenCondition.state = item.id"
                        />
                      </div>
                      <div class="btn-content">
                        <div class="btn" @click="screenCondition.state = ''">
                          重置
                        </div>
                        <div class="btn comfrim" @click="confirmBtn">确定</div>
                      </div>
                    </div>
                  </van-dropdown-item>
                </van-dropdown-menu> -->
              </div>
              <div class="dateSelector-container">
                <div
                  class="item"
                  v-for="(item, index) in fastTimer"
                  :key="index"
                  :class="{'active-btn':activeFastimer == item.id}"
                  @click="pickerTime(item.id)"
                >
                  {{ item.timer }}
                </div>
              </div>
            </div>
          </div>
          <!-- 余额余币 -->
          <div class="payment-record-container record-module-wrapper" v-else>
            <div class="payment-record-wrapper">
              <div class="fliter-condition">
                <!-- <van-dropdown-menu active-color="#5241FF" v-if="0">
                  <van-dropdown-item title="场地名称" ref="itemPlace">
                    <div class="consume-place">
                      <search-input
                        placeholder="请输入场地名称"
                        marLeft="-5.5em"
                        @stratesSearch="stratesSearch"
                      ></search-input>
                      <div class="cell-container">
                        <div class="cell-item">
                          <div class="cell-title"><span>全部</span></div>
                          <van-checkbox
                            v-model="allCheck"
                            icon-size="20px"
                            @click="$refs.placeCheckGroup.toggleAll(allCheck)"
                            style="margin: 0"
                            checked-color="#5241FF"
                          >
                          </van-checkbox>
                        </div>
                        <van-checkbox-group
                          v-model="placeCheckGroup"
                          direction="horizontal"
                          ref="placeCheckGroup"
                        >
                          <div
                            class="cell-item"
                            v-for="(item, index) in placeList"
                            :key="index"
                          >
                            <div class="cell-title">
                              <span>{{ item.placeName }}</span>
                            </div>
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
                          </div>
                          <on-earth />
                        </van-checkbox-group>
                      </div>
                      <div class="btn-content">
                        <div
                          class="btn"
                          @click="
                            $refs.placeCheckGroup.toggleAll(false),
                              (allCheck = false)
                          "
                        >
                          重置
                        </div>
                        <div class="btn comfrim" @click="confirmBtn('place')">
                          确定<span style="margin-left: 6px"
                            >(
                            {{ placeCheckGroup.length }}
                            )</span
                          >
                        </div>
                      </div>
                    </div>
                  </van-dropdown-item>
                  <van-dropdown-item title="设备类型" ref="itemDevice">
                    <div class="consume-place">
                      <div class="cell-container">
                        <van-radio-group v-model="screenCondition.deviceTypeId">
                          <div
                            class="cell-item"
                            v-for="(item, index) in deviceType"
                            :key="index"
                            style="padding: 0"
                          >
                            <div class="cell-title">
                              <van-cell
                                :title="item.name"
                                style="padding-left: 0"
                              />
                            </div>
                            <van-radio
                              checked-color="#5241FF"
                              :name="item.id"
                            ></van-radio>
                          </div>
                        </van-radio-group>
                      </div>
                      <div class="btn-content">
                        <div
                          class="btn"
                          @click="screenCondition.deviceTypeId = ''"
                        >
                          重置
                        </div>
                        <div class="btn comfrim" @click="confirmBtn">确定</div>
                      </div>
                    </div>
                  </van-dropdown-item>
                </van-dropdown-menu> -->
              </div>
              <div class="dateSelector-container">
                <div
                  class="item"
                  v-for="(item, index) in fastTimer"
                  :key="index"
                  :class="{'active-btn':activeFastimer == item.id}"
                  @click="pickerTime(item.id)"
                >
                  {{ item.timer }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 订单列表 -->
        <div class="cell-container-list" @scroll="scrollRecord">
          <div
            class="order-item"
            v-for="(item, index) in memberList"
            :key="index"
            @click="
              payType
                ? $router.push({
                    name: 'orderDetail',
                    query: { detail: JSON.stringify(item) },
                  })
                : ''
            "
          >
            <div class="text-main">
              <div class="top-list">
                <div class="left">
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
                </div>
                <div class="right" v-show="payType">
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
                </div>
                <div class="right" v-show="!payType">
                  {{
                    item.operationDataType == 1
                      ? "余额"
                      : item.operationDataType == 2
                      ? "余币"
                      : "积分"
                  }}
                </div>
              </div>
              <div class="info-list">
                <div class="left">
                  <span
                    class="item"
                    v-show="payType"
                    v-html="item.payType == 0 ? '微信付款' : '支付宝付款'"
                  ></span>
                  <span class="item">{{ item.createTime }}</span>
                </div>
                <div class="right">
                  <span class="price" v-if="payType"
                    >{{ item.amountTotal }}元</span
                  >
                  <span
                    class="price"
                    v-show="!payType && item.operationCurrency != null"
                    :style="{color:item.operationCurrency<0?'red':''}"
                  >
                    {{
                      item.operationCurrency > 0
                        ? "+" + item.operationCurrency
                        : item.operationCurrency
                    }}
                  </span>
                  <span
                    class="price"
                    v-show="!payType && item.operationBalance != null"
                    :style=" {color:item.operationBalance<0?'red':''}"
                  >
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
                </div>
              </div>
              <div class="info-list" v-show="item.deviceNumber">
                <span class="store-name">
                  {{
                    item.placeName ? item.placeName : item.transactionPlaceName
                  }}-<span>
                    {{
                      item.deviceTypeName ? item.deviceTypeName : item.typeName
                    }}</span
                  >
                  <span
                    >{{ item.deviceNumber }}-{{
                      item.railSpace
                        ? item.railSpace
                        : item.shippingSpace || "1"
                    }}-{{ item.railNumber }}</span
                  >
                </span>
              </div>
              <div class="info-list" v-show="item.operationRemark">
                <span class="store-name">
                  备注：{{ item.operationRemark }}
                </span>
              </div>
            </div>
            <!-- <van-icon
              name="arrow"
              size="16"
              color="#969799"
              style="padding: 3px 0 0 6px"
              v-show="payType"
            /> -->
          </div>
          <on-earth
            v-if="
              (payType && memberList.length) ||
              (onEarth && !payType && memberList.length)
            "
          />
          <!-- <no-data v-if="!memberList.length" /> -->
        </div>
      </div>
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
    </div>
</template>

<script>
// import NoticeTips from "../../manComps/noticeTips";
// import {
//   getMemberById,
//   getMemberOrderForm,
//   getCoinFlowingList,
//   welfare,
// } from "@/utils/api/member";
// import { copyEvent } from "@/plugins/formUtils";
import { debounceFun, throttleFun } from "@/plugins/debounceOrthrottle";
// import { getPlaceDeviceList } from "@/utils/api/place";
// import { getDateAll } from "@/plugins/utilityClass";
// import storage from "@/plugins/storage";

export default {
  // name: "xls-member-detail-page",
  // components: { NoticeTips },
  data() {
    return {
      payType: true,
      //搜索
      value1: 0,
      option1: [
        { text: "交易订单", value: 0 },
        { text: "设备编号", value: 1 },
      ],
      typeName: "交易订单",
      searchValue: "",
      //场地
      allCheck: false,
      placeCheckGroup: [],
      placeList: [],
      searchPlace: "",
      //时间
      fastTimer: [
        { id: 1, timer: "今天" },
        { id: 2, timer: "昨天" },
        { id: 3, timer: "近7天" },
        { id: 4, timer: "近30天" },
        { id: 5, timer: "近90天" },
        { id: 6, timer: "自定义" },
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
      deviceType: [
        { id: "", name: "全部" },
        { id: 1, name: "兑币机" },
        { id: 2, name: "扭蛋机" },
        { id: 3, name: "售货机" },
        { id: 4, name: "娃娃机" },
        { id: 5, name: "游乐车" },
      ],
      payTypeList: [
        { id: "", name: "全部" },
        { id: 1, name: "设备启动" },
        { id: 2, name: "账户充值" },
        { id: 3, name: "会员卡购买" },
        { id: 4, name: "微信支付分" },
      ],
      stateList: [
        { id: "", name: "全部" },
        { id: 1, name: "交易成功" },
        { id: -1, name: "退款" },
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
  //   });
  //   if (res.data.data) {
  //     this.orderDetail = res.data.data;
  //   }
  // },
  methods: {
    //copy
    copyMemberId(memberId) {
      copyEvent(memberId);
    },
    //会员订单列表
    scrollRecord(event) {
      var scrollTop = event.target.scrollTop;
      var scrollHeight = event.target.scrollHeight;
      var clientHeight = event.target.clientHeight;
      if (
        scrollTop + clientHeight + 50 >= scrollHeight &&
        !this.onEarth &&
        !this.payType
      ) {
        this.getCoinList();
      }
    },
    getMemberList: debounceFun(async function () {
      let res = await getMemberOrderForm({
        memberOpenid: this.userMsg.memberOpenid,
        startTime: this.screenCondition.startTime,
        endTime: this.screenCondition.endTime,
        placeId: this.screenCondition.placeIds,
        deviceType: this.screenCondition.deviceTypeId,
        state: this.screenCondition.state, //状态 -1退单 1交易完成
      });
      if (res.data.code == 0 || res.data.msg == "ok") {
        if (res.data.data != null) {
          if (res.data.data.length < 50) {
            this.onEarth = true;
          } else {
            this.onEarth = false;
          }
          if (this.page > 1) {
            this.memberList = [...this.memberList, ...res.data.data];
          } else {
            this.memberList = res.data.data;
          }
        }
      }
    }, 500),
    //确定
    confirmBtn(params) {
      if (params == "place") {
        this.screenCondition.placeIds = this.allCheck
          ? ""
          : this.placeCheckGroup.length
          ? String(this.placeCheckGroup)
          : "";
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
    getPlaceList: debounceFun(async function () {
      let res = await getPlaceDeviceList({
        placeName: encodeURIComponent(this.searchPlace),
      });
      if (res.data.data != null) {
        this.placeList = res.data.data;
      }
    }, 500),
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
    getCoinList: debounceFun(async function () {
      let res = await getCoinFlowingList({
        page: ++this.pageCoin,
        size: 50,
        memberNumber: this.userMsg.memberNumber, //用户编码
        placeIds: this.screenCondition.placeIds
          ? this.screenCondition.placeIds
          : null,
        deviceType: this.screenCondition.deviceTypeId
          ? this.screenCondition.deviceTypeId
          : null,
        startTime: this.screenCondition.startTime
          ? this.screenCondition.startTime + " " + "00:00:00"
          : null,
        endTime: this.screenCondition.endTime
          ? this.screenCondition.endTime + " " + "23:59:59"
          : null,
      });
      if (res.data.data != null) {
        if (res.data.data.records.length < 50) {
          this.onEarth = true;
        } else {
          this.onEarth = false;
        }
        if (this.pageCoin > 1) {
          this.memberList = [...this.memberList, ...res.data.data.records];
        } else {
          this.memberList = res.data.data.records;
        }
      }
    }, 500),
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
        operationCurrency:
          this.welfareForm.operationCurrency != "" &&
          this.welfareForm.operationCurrency * 1 > 0
            ? this.welfareForm.operationCurrency
            : null,
        operationBalance:
          this.welfareForm.operationBalance != "" &&
          this.welfareForm.operationBalance * 1 > 0
            ? this.welfareForm.operationBalance
            : null,
        operationRemark:
          this.welfareForm.operationRemark != ""
            ? this.welfareForm.operationRemark
            : null,
        type: 1,
      };
      if (!this.welfareForm.operationCurrency) {
        delete params.operationCurrency;
      }
      if (!this.welfareForm.operationBalance) {
        delete params.operationBalance;
      }
      let res = await welfare(params);
      if (res.data.msg == "ok" || res.data.code == 0) {
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
.xls-member-detail-page {
  width: 100%;
  overflow: scroll;
}
.top-container {
  width: 100%;
  .info-container {
    position: relative;
    .info-content {
      display: flex;
      padding-left: 18px;
      padding-right: 13px;
      align-items: center;
      height: 65px;
      background: #5241ff;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 12px;
        overflow: hidden;
        position: relative;
        .header {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        overflow: hidden;
        .nickname {
          height: 21px;
          font-size: 15px;
          font-weight: 400;
          color: #fff;
          display: flex;
          align-items: center;
        }
        .other-info {
          display: flex;
          align-items: center;
          .id {
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: #fff;
            display: flex;
            align-items: center;
            margin-right: 5px;
          }
          .copy {
            width: 28px;
            height: 16px;
            border: 1px solid #9389ff;
            border-radius: 4px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            .text {
              font-size: 12px;
              transform: scale(0.83333333);
            }
          }
        }
      }
      .declaration {
        width: 20px;
        background: #9389ff;
        border-radius: 8px 0 0 8px;
        position: absolute;
        right: 0;
        display: flex;
        align-content: center;
        justify-content: center;
        .text {
          font-size: 12px;
          color: #fff;
          writing-mode: vertical-rl;
          text-align: center;
          transform: scale(0.83333333);
          letter-spacing: 2px;
        }
      }
    }
    .total-container {
      display: flex;
      justify-content: center;
      text-align: center;
      height: 53px;
      background: #5241ff;
      .total-list {
        flex: 1;
        text-align: center;
        .number {
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          color: #fff;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .name {
          display: flex;
          align-items: center;
          color: #fff;
          text-align: center;
          justify-content: center;
          height: 17px;
          font-size: 12px;
        }
        .arrow-icon {
          width: 12px;
          height: 12px;
          margin-left: 4px;
          background: url(#{$baseUrl}appV4/member/back.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .rights-container {
      display: flex;
      width: 100%;
      height: 105px;
      text-align: center;
      background: url(#{$baseUrl}appV4/altered/bg.png) no-repeat;
      background-size: 100%;
      background-position: bottom;
      .rights-list {
        flex: 1;
        display: flex;
        justify-content: center;
        height: 42px;
        align-items: center;
        background: #5241ff;
        .name {
          color: #fff;
          margin-right: 4px;
        }
        .number {
          color: #fff;
          font-size: 14px;
          margin-top: 4px;
        }
      }
      .line {
        width: 1px;
        height: 16px;
        background: #9389ff;
        margin-top: 14px;
      }
    }
  }
}
.detail-content {
  margin-top: -63px;
  position: relative;
  z-index: 2;
  .menu-container {
    display: flex;
    height: 65px;
    margin: 0 12px;
    background: #fff;
    border-radius: 12px;
    justify-content: space-around;
    .menu-list {
      width: 80px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon-tab {
        margin-bottom: 6px;
      }
      .name {
        font-size: 12px;
        color: #333;
      }
    }
  }
  .opened {
    width: 120px;
    margin: 0 auto;
    border-radius: 20px;
  }

  .statis-statistics {
    margin: 8px 12px 12px;
    display: flex;
    height: 64px;
    background: #fff;
    border-radius: 12px;
    .statis-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .statis-money {
        font-size: 17px;
        color: #333;
      }
      .statis-title {
        font-size: 11px;
        color: #999;
        margin-top: 4px;
      }
    }
  }
}
//---
.record-container-hidden {
  height: 0;
  overflow: hidden;
  transition: height 0.5s;
  -webkit-transition: height 0.5s;
}
.main-record {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  .cell-container-list {
    margin: 0 12px 10px;
    border-radius: 0 0 12px 12px;
    border-top: 1px dashed rgb(207, 207, 207);
    flex: 1;
    overflow: scroll;
    padding: 0 12px;
    background: #fff;
    box-sizing: border-box;
    .order-item {
      padding: 16px 0;
      display: flex;
      border-bottom: 1px solid #ebedf0;
      .text-main {
        flex: 1;
        .top-list {
          display: flex;
          font-size: 14px;
          font-weight: 400;
          color: #333;
          height: 20px;
          align-items: center;
          .left {
            flex: 1;
          }
          .right {
            font-size: 12px;
            color: #5241ff;
            .error {
              color: #ff4747;
            }
          }
        }
        .info-list {
          margin-top: 4px;
          height: 17px;
          display: flex;
          align-items: center;
          color: #999;
          font-size: 12px;
          .store-name {
            padding-top: 6px;
          }
          .left {
            flex: 1;
            display: flex;
            align-items: center;
            .item {
              margin-right: 10px;
            }
          }
          .right {
            .price {
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
.record-container {
  margin: 0 12px 0;
  border-radius: 8px 8px 0 0;
  height: auto;
  .tab-wrapper {
    background: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    .tab {
      flex: 1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 14px;
      background: #f5f5f5;
      font-weight: 400;
    }
    .tab1 {
      border-radius: 8px 0 8px 0;
    }
    .tab2 {
      border-radius: 0 8px 0 8px;
    }
    .active-tab {
      background: #fff;
      color: #5241ff;
    }
  }
  .payment-record-container {
    // padding-bottom: 400px;
    .payment-record-wrapper {
      padding: 5px 12px 12px;
      background: #fff;
      // border-radius: 0 0 12px 12px;
      .search-con {
        align-items: center;
        background: #f5f5f5;
        border-radius: 8px;
        display: inline-flex;
        height: 28px;
        margin: 6px 0;
        width: 100%;
        .left {
          color: #333;
          font-size: 13px;
          font-weight: 400;
          span {
            padding: 0 5px 0 10px;
          }
          .icons {
            transform: rotate(90deg);
          }
        }
        img {
          height: 16px;
          width: 16px;
          margin: 0 0 0 10px;
        }
        input {
          color: #333;
          font-size: 13px;
          width: 100%;
          padding-right: 12px;
          box-sizing: border-box;
          font-weight: 400;
          text-align: left;
          appearance: none;
          background: none;
          border: none;
          outline: none;
          margin: 0;
          padding: 0;
        }
        input[type="text"]::-webkit-input-placeholder {
          color: #c5c5c5;
          font-size: 13px;
        }
        ::v-deep .van-dropdown-menu__bar {
          height: 28px;
          background: #f5f5f5;
          box-shadow: 0 0 0 #fff;
          border-radius: 8px 0 0 8px;
        }
      }
      .consume-place {
        width: 100%;
        max-height: 320px;
        display: flex;
        flex-direction: column;
      }
      .btn-content {
        display: flex;
        padding: 12px;
        background: #fff;
        .btn {
          flex: 1;
          height: 40px;
          border-radius: 6px;
          text-align: center;
          line-height: 40px;
          border: 1px solid #ebedf0;
          background: #fff;
          color: #323233;
          font-size: 14px;
        }
        .comfrim {
          color: #fff;
          background: #5241ff;
          margin-left: 8px;
        }
      }
      .cell-container {
        flex: 1;
        padding: 0 12px;
        box-sizing: border-box;
        overflow: scroll;
        .cell-item {
          width: 100%;
          padding: 10px 0;
          display: flex;
          font-size: 14px;
          border-bottom: 1px solid #ebedf0;
          .cell-title {
            flex: 1;
          }
        }
      }
      .cell-container-no {
        flex: 1;
        overflow: scroll;
        .van-cell__value {
          color: #5241ff;
          font-size: 18px;
        }
      }
      .fliter-condition {
        ::v-deep .van-dropdown-menu__bar {
          background: #fff;
          box-shadow: 0 0 0 #fff;
        }
      }
      .dateSelector-container {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        white-space: nowrap;
        overflow-x: auto;
        padding-bottom: 10px;
        .item {
          height: 28px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #666;
          background: #f5f5f5;
          border-radius: 8px;
        }
        .item:not(:last-child) {
          margin-right: 4px;
        }
        .active-btn {
          color: #fff;
          background: #5241ff;
        }
      }
    }
  }
  .record-module-wrapper {
    width: 100%;
  }
}
.record-btn {
  margin: 8px 12px 12px;
  height: 48px;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
}

</style>