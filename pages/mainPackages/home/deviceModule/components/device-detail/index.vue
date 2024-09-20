<template>
	<!-- 设备详情 -->
	<view>
		<u-popup :show="showDetail" mode="bottom" @close="showDetail = !showDetail">
			<view class="detail-content">
				<view class="top">
					<view class="back" @click="showDetail = !showDetail">返回</view>
					<view class="title">设备详情</view>
				</view>
				<!-- 设备详情 -->
				<view class="header-wrapper">
					<view class="left-main-wrapper">
						<view class="one">
							<view>
								<span v-if="placeDeviceNum.dollNumber">{{ placeDeviceNum.dollNumber }}号机_</span>
								{{ placeDeviceNum.typeName }}{{ placeDeviceNum.deviceNumber }}
							</view>
							<view class="price" v-show="decideType == '娃娃机' || decideType == '儿童类'">
								(<span
									v-show="decideType == '儿童类'">{{ placeDeviceNum.price }}元/次_</span>{{ placeDeviceNum.currency }}币/次)
							</view>
						</view>
						<view class="remarks">备注:{{ placeDeviceNum.remark }}</view>
						<view class="address">
							地址:
							<span v-show="
							  placeDeviceNum.placeDetails &&
							  placeDeviceNum.placeDetails.length < 10
							">
								{{ placeDeviceNum.province }}{{ placeDeviceNum.city }}
							</span>
							{{ placeDeviceNum.region }}{{ placeDeviceNum.placeDetails }}【{{placeDeviceNum.placeName}}】
						</view>
					</view>
					<view class="record-wrapper" v-show="decideType == '售货机'" @click="
					  (dollNumber = placeDeviceNum.dollNumber),
						(showRemark = !showRemark),
						(showDetail = !showDetail)
					">
						<image :src="`${$baseUrl}appV4/device/remark.png`" alt="" mode="widthFix" />
						<span>备注</span>
					</view>
				</view>
				<view class="footer">
					<!-- 导航栏 -->
					<view class="three-btn-wrapper">
						<view @click="(showQs = !showQs), (showDetail = !showDetail)">
							<view class="icons-wrapper">
								<image :src="`${$baseUrl}appV4/device/qs.png`" alt="" mode="widthFix" />
							</view>
							<view class="name">生成二维码</view>
						</view>
						<view @click="
							(currency = placeDeviceNum.currency),
							  (price = placeDeviceNum.price),
							  (unitPrice = !unitPrice),
							  (showDetail = !showDetail)
						  " v-show="decideType == '娃娃机' || decideType == '儿童类'">
							<view class="icons-wrapper">
								<image :src="`${$baseUrl}appV4/device/price.png`" alt="" mode="widthFix" />
							</view>
							<view class="name">单价</view>
						</view>

						<view @click="
							(dollNumber = placeDeviceNum.dollNumber),
							  (showRemark = !showRemark),
							  (showDetail = !showDetail)
						  " v-show="decideType != '售货机'">
							<view class="icons-wrapper">
								<!-- <u-icon name="records" size="28" /> -->
								<image :src="`${$baseUrl}appV4/device/label.png`" alt="" mode="widthFix" />
							</view>
							<view class="name">备注和编号</view>
						</view>

						<view v-if="decideType == '扭蛋机'" @click="railReset()">
							<view class="icons-wrapper">
								<xls-image style="width: 25px;" :src="`${$baseUrl}appV4/device/reset.png`" alt=""
									mode="widthFix" />
							</view>
							<view class="name">仓位重置</view>
						</view>

						<view v-show="decideType == '售货机'" @click="goToShj('shjGrounding')"
							v-hasPermi="['app:shj:grounding:read']">
							<view class="icons-wrapper">
								<!-- <u-icon name="shop-collect-o" size="28" /> -->
								<image :src="`${$baseUrl}appV4/device/re_shop.png`" alt="" mode="widthFix" />
							</view>
							<view class="name">商品上架</view>
						</view>

						<view v-show="decideType == '售货机'" @click="goToShj('shjClassify')">
							<view class="icons-wrapper">
								<!-- <u-icon name="apps-o" size="28" /> -->
								<image :src="`${$baseUrl}appV4/device/classify.png`" alt="" mode="widthFix" />
							</view>
							<view class="name">商品分类</view>
						</view>
					</view>
					<!-- 参数设置 -->
					<view class="choose" @click="parameterSet"
						v-hasPermi="['app:device:index:parameter', 'app:shj:params:read']">
						<view class="left">参数设置</view>
						<view class="right">
							<view class="port">接口板</view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>


					<!-- 礼品 -->
					<view @click="goTo('commoditySetWwj')">
						<view class="choose" v-show="
							decideType == '娃娃机' ||
							decideType == '儿童类'
						  ">
							<view class="left">礼品</view>
							<view class="right">
								<view class="text">
									<view class="gift-info__style">
										<span class="text-over maxWidth">
											{{ giftInfo.commodityName }}
										</span>-{{ giftInfo.price }}元/个
									</view>
									<view>剩余{{ giftInfo.railRepertory }}个</view>
								</view>
								<view class="arrow">
									<u-icon name="arrow-right" size="36" color="#bbb8b8" />
								</view>
							</view>
						</view>
					</view>
					<!-- 补货管理 shj -->
					<view class="choose" @click="goToShj('shjReplenishment')" v-hasPermi="['app:shj:replenish:read']"
						v-if="decideType == '售货机'">
						<view class="left">补货管理</view>
						<view class="right">
							<view class="text"></view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>
					<!-- 货道管理 shj -->
					<view class="choose" @click="goToShj('shjCargoWay')" v-show="decideType == '售货机'"
						v-hasPermi="['app:shj:rail:read']">
						<view class="left">货道管理</view>
						<view class="right">
							<view class="text"></view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>
					<!-- 数据更新到设备 shj -->
					<view class="choose" @click="deviceDisable(2)" v-show="decideType == '售货机'" v-if="0">
						<view class="left">数据更新到设备</view>
						<view class="right">
							<view class="text"></view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>
					<!-- 批量复制 shj -->
					<view class="choose" v-show="decideType == '售货机'" v-hasPermi="['app:shj:copy:oper']"
						@click="goToShj('shjBatchCopy')">
						<view class="left">批量复制</view>
						<view class="right">
							<view class="text"></view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>
					<!-- 转移设备 -->
					<view class="choose" @click="goTo('shift')" v-hasPermi="['app:device:index:shift']">
						<view class="left">转移设备</view>
						<view class="right">
							<view class="text"></view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>

					<!-- 解绑设备 -->
					<!-- 大于 10 并且 售货机，隐藏解绑 -->
					<view class="choose" v-if="!(longUntie > 10 && decideType == '售货机')" @click="deviceUntie"
						v-hasPermi="['app:device:index:untie']">
						<view class="left">解绑设备</view>
						<view class="right">
							<view class="text"></view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>

					<!-- 禁用启用 -->
					<view class="choose" @click="deviceDisable(1, placeDeviceNum.state)">
						<view class="left">{{placeDeviceNum.state ? '禁用设备' : '启用设备'}}</view>
						<view class="right">
							<view class="port disable" v-if="!placeDeviceNum.state">
								{{!placeDeviceNum.state ? '已禁用' : ''}}
							</view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>

					<!-- 重启设备 -->
					<view class="choose" @click="restartDeviceMethod()" v-show="decideType == '售货机'">
						<view class="left" v-html="'重启设备'"></view>
						<view class="right">
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>

					<!--上线离线时点 -->
					<view @click="goTo('deviceOnlineRecord')" v-hasPermi="['app:device:index:records']" class="choose">
						<view class="left">上线离线时间点</view>
						<view class="right">
							<view class="text"></view>
							<view class="arrow">
								<u-icon name="arrow-right" size="36" color="#bbb8b8" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 备注 机台编号-->
		<u-popup :show="showRemark" mode="bottom" @close="() => {
			(showRemark = !showRemark), (showDetail = !showDetail)
		}">
			<view class="remark-content">
				<view class="title-box">
					<view class="title">
						{{ placeDeviceNum.typeName }}{{ placeDeviceNum.deviceNumber }}
					</view>
				</view>

				<view class="center-box">
					<view class="header-box"><span class="remark">备注</span>选填</view>
					<view class="text-box">
						<textarea placeholder="请输入备注" v-model="remark"></textarea>
					</view>
				</view>

				<view class="bottom-box">
					<view class="bottom-name" @click="beforeDoll">
						<view class="name-left">
							<span class="remark">机台编号</span>选填
						</view>
						<view class="name-right">
							<input v-model="dollNumber" type="number" placeholder="请输入机台编号" maxlength="4"
								@focus="stopKeyborad" class="input" @click.native="beforeDoll" />
							<u-icon name="arrow-right" color="#5241FF" size="36" />
						</view>
					</view>
					<view class="bottom-name" @click="clearDollNumber">
						<view class="name-left">
							<span class="remark">清除机台编号</span>
						</view>
						<view class="name-right">
							<input disabled class="input" />
							<u-icon name="trash" color="red" size="44" />
						</view>
					</view>

					<view class="line"></view>

					<view class="btn-box">
						<view class="cancel" @click="(showRemark = !showRemark), (showDetail = !showDetail)">
							取消
						</view>
						<view class="confirm" @click="remarkConfirm">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 机台编号选择 -->
		<u-popup :show="showDollNumber" mode="bottom" @close="() => {
			(showDollNumber = !showDollNumber), (showRemark = !showRemark)
		}">
			<view class="remark-content doll-number-wrapper">
				<view class="mui-input-row">
					<view class="panel-hd">
						<span>设备机台编号</span>
						<span class="sub-text">（用于启动设备，同一个投放场地编号不可重复）</span>
					</view>
					<view class="mui-row">
						<view class="mui-col">
							<span class="mui-inline done"></span>
							<span i18n-html="cs_other">已注册</span>
						</view>
						<view class="mui-col">
							<span class="mui-inline option"></span>
							<span i18n-html="cs_other">可选</span>
						</view>
						<view class="mui-col">
							<span class="mui-inline active"></span>
							<span i18n-html="cs_other">选中</span>
						</view>
					</view>
				</view>

				<view class="reg-list doll-number-list">
					<view class="option-list">
						<view class="option-list-item" v-for="index of 32" :key="index">
							<view class="item-con" :class="[getClass(index)]" @click="chooseOption(index)">
								{{ index == 32 ? "其他" : index }}
							</view>
						</view>
						<view class="option-list-item float" v-if="activeItem == 32">
							<view class="item-con">
								<input type="text" class="other_inp" ref="input" maxlength="4"
									v-model="dollEnterValue" />
							</view>
						</view>
					</view>
				</view>

				<view class="btn-box-wrapper">
					<view class="btn"
						@click="(dollEnterValue = ''),(showDollNumber = !showDollNumber),(showRemark = !showRemark)">
						取消
					</view>
					<view class="btn confirm" @click="comfirmMethedRoll">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 娃娃机单价 -->
		<u-popup :show="unitPrice" round="20" mode="center"
			@close="() => {(unitPrice = !unitPrice), (showDetail = !showDetail)}">
			<view class="unitPrice">
				<view class="top-title">单价设置</view>
				<view class="info">
					<view class="set-price-modal">
						<input placeholder="请输入" oninput="this.value=this.value.replace(/[^0-9]+/,'')" maxlength="4"
							class="input" v-model="currency" />
						<span class="unit">币/次</span>
					</view>
					<view class="set-price-modal" v-if="decideType == '儿童类'">
						<input placeholder="请输入" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
							maxlength="10" class="input" v-model="price" />
						<span class="unit">元/次</span>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="unit-cancel" @click="(unitPrice = !unitPrice), (showDetail = !showDetail)">
						取消
					</view>
					<view class="unit-confirm" @click="eidtPrice">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 二维码 -->
		<u-popup :show="showQs" mode="bottom" @close="() => {
			(showQs = !showQs), (showDetail = !showDetail)
		}">
			<view class="qs-content">
				<view class="qs-top">
					<view class="top-left" @click="(showQs = !showQs), (showDetail = !showDetail)">
						<u-icon name="arrow-left" size="36" />
					</view>
					<view class="qs-title">
						{{ placeDeviceNum.typeName }}_{{ deviceNumber }}
					</view>
				</view>

				<view class="title-qs-wrapper">
					<!-- <view class="title-txt" @click="qsType = true" :class="{'active-txt': qsType}">
						H5码
					</view> -->
					<!-- <view class="title-txt" @click="qsType = false" :class="{'active-txt': !qsType}">
						小程序码
					</view> -->
				</view>

				<view class="qs-body" v-show="qsType">
					<qr-canvas-rail :deviceNumber="deviceNumber" :railNumber="railNumber" :shippingSpace="shippingSpace"
						:decideType="decideType" v-if="showQs" />
					<view class="desc">长按二维码，保存或发送给朋友</view>
				</view>

				<!-- <view class="qs-body" v-show="!qsType">
					<qr-canvas-rail-mini :deviceNumber="deviceNumber" :railNumber="railNumber"
						:shippingSpace="shippingSpace" :decideType="decideType" v-if="showQs" />
					<view class="desc">长按二维码，保存或发送给朋友</view>
				</view> -->

			</view>
		</u-popup>
		<!-- 解绑 -->
		<u-popup :show="deviceState" mode="bottom" @close="cancelMethed">
			<view class="qs-content deviceState">
				<view class="qs-top pad">
					<view class="top-left right" @click="cancelMethed">取消</view>
					<view class="qs-title">设备解绑原因</view>
				</view>
				<view class="state-content">
					<view class="reason-wrapper">
						<view class="list" v-for="reason in untieReason" :key="reason.id"
							:class="{'otherStyle':reason.state}" @click="reason.state = !reason.state">
							{{ reason.reason }}
						</view>
					</view>
					<view class="other-wrapper">
						<view class="title">其他原因</view>
						<textarea placeholder="请您告诉我其他原因或优化建议" v-model="otherReason"></textarea>
					</view>
					<view class="btn-wraper">
						<view class="desc">
							设备损坏、频繁离线、信号问题等设备问题，平台提供最优
							的设备升级方案，升级热线服务时间：每天 9:00-21:00。
						</view>
						<view class="btn-content">
							<view class="btn cancel">拨打设备升级热线</view>
							<view class="btn comfirm" @click="comfirmBinding">确定解绑</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import QrCanvas from "./qrCanvas.vue";
	// import qrCanvasRailMini from "./qrCanvasRailMini.vue";
	// import {
	// 	deviceDetail,
	// 	editRemark,
	// 	updateMachineNumber,
	// 	editCurrency,
	// 	editState,
	// 	editBinding,
	// 	editBindingList,
	// 	getDeviceCommodityInfo,
	// 	getEggDeviceRailInfo,
	// } from "@/utils/api/device";
	// import {
	// 	getRailCommodityList
	// } from "@/utils/api/remoteBoot";
	// import {
	// 	getMachineNumber
	// } from "@/utils/api/addDevice";
	// import api from "@/utils/api/addDevice";
	// import qs from "qs";
	import {
		deviceController
	} from "@/api/index.js";
	import QrCanvasRail from "../qr-canvas-rail/index.vue";
	import cache from '@/common/cache.js';

	export default {
		components: {
			QrCanvasRail,
			// QrCanvas,
			// qrCanvasRailMini
		},
		data() {
			return {
				//设备类型
				decideType: "",
				//设备编码
				deviceNumber: "",
				//设备详情开关
				showDetail: false,
				//设备详情
				placeDeviceNum: {
					placeId: 0,
					placeName: "",
				},
				//修改备注
				showRemark: false,
				showDollNumber: false,
				dollNumber: "",
				activeItem: "",
				dollEnterValue: "",
				remark: "",
				disableList: [],
				//单价
				unitPrice: false,
				//二维码
				showQs: false,
				railNumber: "",
				shippingSpace: "",
				//解绑开关
				deviceState: false,
				//解绑原因
				untieReason: [{
						id: 1,
						reason: "频繁离线",
						state: false
					},
					{
						id: 2,
						reason: "场地信号不好",
						state: false
					},
					{
						id: 3,
						reason: "机器转手",
						state: false
					},
					{
						id: 4,
						reason: "撤场调整",
						state: false
					},
					{
						id: 5,
						reason: "支付设备坏了",
						state: false
					},
					{
						id: 6,
						reason: "系统不好用",
						state: false
					},
					{
						id: 7,
						reason: "更换WIFI版本",
						state: false
					},
					{
						id: 8,
						reason: "更换4G版本",
						state: false
					},
					{
						id: 9,
						reason: "更换M+N神器",
						state: false
					},
					{
						id: 10,
						reason: "测试设备",
						state: false
					},
					{
						id: 11,
						reason: "更换绑定账号",
						state: false
					},
				],
				//解绑其他原因
				otherReason: "",
				//礼品信息
				giftInfo: {
					commodityName: "",
					railRepertory: "",
					price: "",
				},
				fromType: "来自本身",
				currency: 1,
				price: null,
				qsType: true,
				/**
				 * @description: 解绑吗 小于 10 可以解绑
				 * @return {*}
				 * @Date: 2024-05-05 11:42:50
				 */
				longUntie: 0,
			};
		},
		methods: {
			//设备详情
			async isShowdetail(deviceNumber) {
				this.deviceNumber = deviceNumber;
				this.fromType = "来自本身";
				let devDetail = await deviceController.deviceDetail({
					deviceNumber: this.deviceNumber
				});
				if (devDetail.code == 200) {
					this.placeDeviceNum = devDetail.data;
					this.remark = devDetail.data.remark;
					this.dollNumber = devDetail.data.dollNumber ?
						devDetail.dollNumber :
						"";
					this.dollNumber * 1 > 32 ?
						(this.dollEnterValue = this.dollNumber) :
						(this.activeItem = this.dollNumber);
					this.decideType = this.placeDeviceNum.typeName;
					if (
						this.decideType == "娃娃机" ||
						this.decideType == "兑币机" ||
						this.decideType == "儿童类"
					) {
						this.getGiftinfo();
					}
				} else {
					this.$toast(devDetail.message);
					this.placeDeviceNum = [];
				}
				this.showDetail = !this.showDetail;
				this.wwjByPlace();
				//设备货道
				// let gash = await deviceController.getRailCommodityList({
				// 	deviceNumber: this.deviceNumber,
				// });
				// if (gash.code == 200) {
				// 	let railEgg = gash.data[0];
				// 	this.railNumber = railEgg.railNumber;
				// 	this.shippingSpace = railEgg.shippingSpace;
				// } else {
				// 	this.railNumber = "";
				// 	this.shippingSpace = "";
				// }

				// let res = await api.agentUnbind({
				// 	deviceNumber: this.deviceNumber
				// });
				// if (res.code == 200) {
				// 	this.longUntie = res.data;
				// }
			},
			goTo(route) {
				if (route == 'commoditySetWwj') {
					this.showDetail = false;
					this.$goTo("/pages/mainPackages/home/deviceModule/children/commoditySetWwj", "navigateTo", {
						deviceNumber: this.deviceNumber,
						typeName: this.decideType,
						shippingSpace: this.shippingSpace,
						railNumber: this.railNumber,
						commodityName: this.giftInfo.commodityName
					})
					return
				}
				if (route == 'shift') {
					this.$goTo("/pages/mainPackages/home/deviceModule/children/deviceShiftPage", "navigateTo", {
						deviceNumber: this.deviceNumber,
						decideType: this.decideType,
						placeId: this.placeDeviceNum.placeId,
						placeName: this.placeDeviceNum.placeName,
					})
					this.showDetail = !this.showDetail;
					return
				}
				// 在线离线记录
				this.$goTo("/pages/mainPackages/home/deviceModule/children/deviceOnlineRecord", "navigateTo", {
					deviceInfo: this.placeDeviceNum
				})
			},
			getClass(index) {
				return this.disableList.includes(index) ?
					'item-done' :
					index == this.activeItem ?
					'item-active' :
					'item-option'
			},
			//禁用及同步提示
			deviceDisable(params, state) {
				if (params == 1) {
					if (state) {
						this.$modal("禁用设备后，用户将无法付款启动该设备。你可以通过“启用设备”来恢复使用，确定要禁用设备吗？", {
								title: "温馨提示",
							})
							.then(() => {
								this.startUsing();
							})
							.catch(() => {});
					} else {
						this.$modal("确定要启用该设备吗？", {
								title: "温馨提示",
							})
							.then(() => {
								this.startUsing();
							})
							.catch(() => {});
					}
				} else if (params == 2) {
					this.$modal("请保持设备通电及网络连接正常，确认后将同步改设备货道和商品信息至机台?", {
							title: "温馨提示",
						})
						.then(() => {})
						.catch(() => {});
				}
			},
			//禁用和启用设备
			async startUsing() {
				let res = await deviceController.editState({
					deviceNumber: this.deviceNumber
				});
				if (res.code == 200) {
					this.placeDeviceNum.state = !this.placeDeviceNum.state;
					this.$emit("updatedDevice", "forbidden");
				}
			},
			//解绑提示
			deviceUntie() {
				this.showDetail = !this.showDetail;
				this.fromType = "来自本身";
				this.$modal("您确定要解绑该设备吗？解绑后， 它将无法使用在线支付/启动等。", {
						title: "温馨提示",
						confirmColor: "#f73e3e",
						confirmText: "解绑",
					})
					.then(() => {
						this.deviceState = !this.deviceState;
					})
					.catch(() => {
						this.showDetail = !this.showDetail;
					});
			},
			//解绑方法
			cancelMethed() {
				this.deviceState = !this.deviceState;
				if (this.fromType == "来自本身") {
					this.showDetail = !this.showDetail;
				} else if (this.fromType == "来自批量") {
					this.$parent.manyBind();
				}
			},
			pickerUntieReason() {
				let reasonList = "";
				this.untieReason.forEach((res) => {
					if (res.state) {
						reasonList += res.reason + ",";
					}
				});
				return reasonList + this.otherReason;
			},
			//解绑设备
			async comfirmBinding() {
				let reason = this.pickerUntieReason();
				if (!reason) {
					return this.$toast("请您务必要告诉我们您解绑的原因~");
				}
				if (this.fromType == "来自本身") {
					deviceController.editBinding({
						deviceNumber: this.deviceNumber,
						unbindingReason: reason,
					}).then((res) => {
						if (res.code == 200) {
							this.deviceState = !this.deviceState;
							this.$emit("updatedDevice", "unbundle");
							this.$toast("解绑成功");
						}
					});
				} else if (this.fromType == "来自批量") {
					editBindingList({
						deviceNumber: this.deviceNumber,
						unbindingReason: reason,
					}).then((res) => {
						if (res.code == 200) {
							this.deviceState = false;
							this.$parent.page = 0;
							this.$parent.onEarth = false;
							this.$parent.getDevicelist();
							this.$toast("解绑成功");
						}
					});
				}
			},
			/**
			 * @description: 仓位重置
			 * @return {*}
			 * @Date: 2024-05-06 17:20:27
			 */
			async railReset() {
				this.$modal("确定要重置仓位吗？", {
						confirmColor: "#5241FF",
					})
					.then(() => {
						deviceController.resetting({
							deviceNumber: this.deviceNumber
						}).then((res) => {
							if (res.code == 200) {
								this.$toast("重置成功~");
								this.$emit("updatedDevice", "unbundle");
							}
						});
					})
					.catch(() => {});
			},
			// === 备注 和 机台编号
			// 已注册机台编号
			stopKeyborad() {
				uni.hideKeyboard();
			},
			wwjByPlace() {
				deviceController.getMachineNumber({
					placeId: this.placeDeviceNum.placeId
				}).then((res) => {
					if (res.code == 200) {
						this.disableList = [];
						res.data.map((item) => {
							if (this.placeDeviceNum.dollNumber != item && item) {
								this.disableList.push(item * 1);
							}
						});
					}
				});
			},
			//机台编号
			chooseOption(params) {
				this.activeItem = params;
				if (params == 32) {
					this.$nextTick(() => {
						this.$refs.input.focus();
					});
				} else {
					this.dollNumber = params;
				}
			},
			beforeDoll() {
				if (this.dollNumber * 1 > 31) {
					this.activeItem = 32;
					this.dollEnterValue = this.dollNumber;
					this.$nextTick(() => {
						this.$refs.input.focus();
					});
				} else {
					this.activeItem = this.dollNumber;
				}
				this.showRemark = !this.showRemark;
				this.showDollNumber = !this.showDollNumber;
			},
			comfirmMethedRoll() {
				if (this.activeItem == 32 && this.dollEnterValue == "") {
					this.$nextTick(() => {
						this.$refs.input.focus();
					});
					return this.$toast("机台编号不能为空~");
				}
				if (
					this.activeItem == 32 &&
					this.disableList.includes(this.dollEnterValue * 1)
				) {
					this.dollEnterValue = "";
					this.$toast("场地已存在该机台号~");
					this.$nextTick(() => {
						this.$refs.input.focus();
					});
					return;
				}
				if (this.activeItem == 32) {
					let params = this.dollEnterValue ? this.dollEnterValue : "";
					this.dollNumber = params;
				} else {
					this.dollNumber = this.activeItem;
				}
				this.showDollNumber = !this.showDollNumber;
				this.showRemark = !this.showRemark;
			},
			//清除机台编号
			clearDollNumber() {
				this.$modal("您确定要清除当前设备的机台编号吗？", {
						title: "温馨提示",
					})
					.then(() => {
						deviceController.updateMachineNumber({
							placeId: this.placeDeviceNum.placeId,
							deviceNumber: this.placeDeviceNum.deviceNumber,
							dollNumber: "",
						}).then((res) => {
							if (res.code == 200) {
								this.placeDeviceNum.dollNumber = "";
								this.dollNumber = "";
								this.$emit("updatedDevice", {
									dollNumber: ""
								});
								this.$nextTick(() => {
									this.$toast("清除成功~");
								});
								this.showDetail = !this.showDetail;
								this.showRemark = !this.showRemark;
							}
						});
					})
					.catch(() => {});
			},
			//编辑备注
			async remarkConfirm() {
				if (this.dollNumber == "") {
					this.$toast("机台编号不能为空~");
				}
				let res = await deviceController.editRemark({
					deviceNumber: this.placeDeviceNum.deviceNumber,
					remark: this.remark,
				});
				let doll = await deviceController.updateMachineNumber({
					placeId: this.placeDeviceNum.placeId,
					deviceNumber: this.placeDeviceNum.deviceNumber,
					dollNumber: this.dollNumber,
				});
				if (res.code == 200 && doll.code == 200) {
					let remark = {
						remark: this.remark,
						dollNumber: this.dollNumber
					};
					this.placeDeviceNum.remark = this.remark;
					this.placeDeviceNum.dollNumber = this.dollNumber;
					this.$emit("updatedDevice", remark);
					this.$nextTick(() => {
						this.$toast("修改成功");
					});
					this.showDetail = !this.showDetail;
					this.showRemark = !this.showRemark;
				}
			},
			//shj 参数设置
			async parameterSet() {
				let deviceLogin = {
					uuid: this.placeDeviceNum.uuid,
					loginId: this.placeDeviceNum.deviceLoginId,
					onlineState: this.placeDeviceNum.onlineState,
				};
				cache.setCache("deviceLogin", deviceLogin);
				if (this.decideType == "售货机") {
					this.goToShj('shjParameter')
					return
				}
				if (!this.placeDeviceNum.deviceLoginId)
					return this.$modal("设备上报信息不全，请尝试断电重启设备！", {
						title: "温馨提示",
						confirmColor: "#5241FF",
						showCancel: false
					}).then(() => {});

				if (this.placeDeviceNum.onlineState) {
					this.$goTo("/pages/mainPackages/home/deviceModule/children/deviceParamSet");
				} else {
					this.$modal("设备处于离线状态无法设置，请确保设备在线", {
						title: "设置失败",
						confirmColor: "#5241FF",
						showCancel: false
					}).then(() => {});
				}
			},
			//娃娃机修改单价
			eidtPrice() {
				if (this.currency == "") {
					return this.$toast("币数不能为空或者零~");
				}
				if (this.price == "") {
					return this.$toast("单价不能为空或者零~");
				}
				deviceController.editCurrency({
						deviceNumber: this.deviceNumber,
						currency: this.currency * 1,
						price: this.price ? this.price : null,
					})
					.then((res) => {
						if (res.code == 200) {
							this.unitPrice = !this.unitPrice;
							this.showDetail = !this.showDetail;
							this.placeDeviceNum.currency = this.currency;
							this.placeDeviceNum.price = this.price;
							this.$toast("修改成功");
						}
					})
					.catch((err) => {});
			},
			//wwj
			clearGiftInfo() {
				this.giftInfo.commodityName = "";
				this.giftInfo.railRepertory = "";
				this.giftInfo.price = "";
			},
			//礼品信息--娃娃机 /兑币机 / 儿童类
			getGiftinfo() {
				if (this.decideType == "娃娃机") {
					deviceController.getDeviceCommodityInfo({
							deviceNumber: this.deviceNumber,
						})
						.then((res) => {
							this.clearGiftInfo();
							if (res.data) {
								this.giftInfo = res.data;
							}
						})
						.catch((err) => {});
				} else {
					deviceController.getEggDeviceRailInfo({
							deviceNumber: this.deviceNumber,
							shippingSpace: 1,
							railNumber: 1,
						})
						.then((res) => {
							this.clearGiftInfo();
							if (res.code == 200) {
								Object.assign(this.giftInfo, res.data)
							}
						})
						.catch((err) => {});
				}
			},
			/**
			 * @description: 重启设备
			 * @return {*}
			 * @Date: 2024-03-04 14:20:47
			 */
			async restartDeviceMethod() {
				if (this.placeDeviceNum.onlineState === 0) {
					return this.$toast("设备离线~");
				}
				this.$modal(`您确定要重启编号为： ${this.placeDeviceNum.deviceNumber}的设备吗？这可能需要一点儿时间~`, {
						title: "温馨提示",
						confirmColor: "#5241ff",
					})
					.then(() => {
						let data = qs.stringify({
							productKey: "a1eUldLZaNe",
							imei: this.placeDeviceNum.uuid,
						});
						api
							.restartDevice(data)
							.then((res) => {
								if (res.code == 200) {
									this.$toast("重启成功~");
								}
							})
							.catch(() => {});
					})
					.catch(() => {});
			},
			/**
			 * shj
			 */
			goToShj(route) {
				let routeUrl = `/pages/subpackages/home/shjModule/${route}/index`
				if (route === 'shjReplenishment') {
					routeUrl = `/pages/subpackages/home/shjModule/${route}/replenishment`
				}
				this.$goTo(routeUrl, "navigateTo", {
					deviceNumber: this.deviceNumber,
					placeId: this.placeDeviceNum.placeId
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.detail-content {
		width: 100%;
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.maxWidth {
		max-width: 180px;
		display: inline-block;
	}

	.top {
		height: 48px;
		padding: 0 2.5%;
		border-bottom: 1px solid #e6e6e6;
		background: #fff;
		display: flex;
		line-height: 48px;
		font-size: 16px;

		.back {
			color: #5241ff;
			font-weight: 400;
			width: 25%;
			height: 48px;
		}

		.title {
			width: 50%;
			color: #262626;
			height: 48px;
			font-weight: 500;
			text-align: center;
		}
	}

	.header-wrapper {
		display: flex;
		align-items: center;
		background: #f5f6f7;
		border-bottom: 1px solid #f0eff1;
		padding: 10px;
		box-sizing: border-box;

		.left-main-wrapper {
			align-items: center;
			vertical-align: middle;
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			.one {
				color: #1a1a1a;
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 16px;
				font-weight: 400;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: flex;

				.online {
					color: #fff;
					padding: 1px 5px;
					margin: 0 5px;
					font-size: 8px;
					display: flex;
					align-items: center;
				}

				.price {
					font-weight: 600;
				}

				.live {
					background: #ff524c;
				}

				.on {
					background: rgb(83, 230, 70);
				}
			}

			.remarks {
				color: #8c8c8c;
				font-size: 13px;
				margin-bottom: 4px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.address {
				box-sizing: border-box;
				color: #8c8c8c;
				font-size: 13px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.record-wrapper {
			padding: 0 5px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 15px;

			image {
				width: 18px;
				margin-bottom: 5px;
			}

			span {
				white-space: nowrap;
			}
		}
	}

	.footer {
		max-height: 380px;
		width: 100%;
		overflow-y: scroll;

		.three-btn-wrapper {
			display: flex;

			view {
				padding: 15px 0;
				width: 33.33333%;
			}

			.icons-wrapper {
				align-items: center;
				background: #e9e9e9;
				border-radius: 12px;
				display: flex;
				height: 56px;
				justify-content: center;
				margin: 0 auto 5px;
				padding: 0;
				width: 56px;

				image {
					width: 22px;
				}
			}

			.name {
				color: #4d4d4d;
				font-size: 14px;
				text-align: center;
				padding: 0;
				white-space: nowrap;
				width: 100%;
			}
		}

		.choose {
			align-items: center;
			border-top: 1px solid #f0eff1;
			display: flex;
			min-height: 50px;
			padding: 0 2.5%;
			justify-content: space-between;

			.left {
				color: #262626;
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 16px;
				font-weight: 400;
			}

			.right {
				display: flex;
				align-items: center;

				.gift-info__style {
					display: flex;
					align-items: center;
				}

				.arrow {
					margin: 0 0 0 8px;
				}

				.port {
					background: #04be01;
					border-radius: 3px;
					color: #fff;
					font-size: 12px;
					padding: 2px 5px;
				}

				.disable {
					background: red;
				}

				.text {
					color: #000;
					font-size: 14px;
					text-align: right;
					font-family: PingFangSC-Regular, PingFang SC;
				}
			}
		}
	}

	// 备注与机台号
	.remark-content {
		height: 80vh;
		width: 100%;
		background-color: #f3f4f5;
		overflow-y: auto;

		.title-box {
			height: 10%;
			width: 100%;

			.title {
				height: 50px;
				box-sizing: border-box;
				background-color: #fff;
				font-size: 14px;
				line-height: 50px;
				color: #1a1a1a;
				padding: 0 2.5%;
			}
		}

		.center-box {
			height: 40%;
			width: 100%;
			background: #fff;
			overflow: hidden;

			.header-box {
				height: 44px;
				padding: 0 2.5%;
				line-height: 44px;
				color: #999;
				font-size: 12px;

				.remark {
					color: #000;
					font-size: 14px;
				}
			}

			.text-box {
				margin: 0 2.5%;
				height: 78%;

				textarea {
					width: 100%;
					height: 100%;
					padding: 12px;
					box-sizing: border-box;
					border-radius: 8px;
					border: 1px solid rgb(207, 201, 201);
					resize: none;
					font-size: inherit;
					appearance: none;
					font-size: 16px;
					font-family: PingFangSC-Regular;
					outline: 0;
				}
			}
		}

		.bottom-box {
			height: 40%;
			width: 100%;
			box-sizing: border-box;

			.bottom-name {
				display: flex;
				align-items: center;
				margin-top: 12px;
				background: #fff;
				padding: 0 2.5%;

				.name-left {
					color: #999;
					font-size: 12px;
					line-height: 44px;

					.remark {
						color: #000;
						font-size: 14px;
					}
				}

				.name-right {
					flex: 1;
					font-size: 14px;
					color: #5241ff;
					display: flex;
					align-items: center;

					.input {
						width: 100%;
						text-align: right;
					}
				}
			}

			.line {
				height: 12px;
				background: #fff;
				border-top: 1px dashed #dfe0e0;
			}

			.btn-box {
				padding: 10px;
				box-sizing: border-box;
				position: fixed;
				bottom: 0;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				text-align: center;
				line-height: 50px;
				width: 100%;

				.cancel {
					height: 50px;
					width: 35%;
					border: 1px solid #5241ff;
					color: #5241ff;
					box-sizing: border-box;
					border-radius: 4px;
				}

				.confirm {
					width: 60%;
					height: 50px;
					color: #fff;
					background: #5241ff;
					box-sizing: border-box;
					border-radius: 4px;
				}
			}
		}

		.mui-input-row {
			padding: 15px;
			font-size: 16px;
			border-bottom: 1px solid #e6e6e6;
			background: #fff;

			.panel-hd {
				padding-bottom: 10px;

				.sub-text {
					font-size: 12px;
					color: #666;
				}
			}

			.mui-row {
				display: flex;

				.mui-col {
					width: 33.33%;
					padding: 8px 0;
					display: flex;
					align-items: center;

					.cs_other {
						font-weight: normal;
						color: #000;
					}

					.mui-inline {
						display: inline-block;
						width: 20px;
						height: 20px;
						margin-right: 10px;
						border-radius: 2px;
					}

					.done {
						background-color: #cecece;
					}

					.option {
						border: 1px solid #5241ff;
					}

					.active {
						background: #5241ff;
					}
				}
			}
		}

		.reg-list {
			font-size: 16px;

			.option-list {
				margin: 10px;
				display: flex;
				flex-wrap: wrap;
				position: relative;

				.option-list-item {
					box-sizing: border-box;
					width: 25%;
					padding: 5px;

					.item-con {
						text-align: center;
						height: 60px;
						line-height: 60px;
						font-size: 18px;
						border-radius: 6px;
					}

					.item-done {
						color: #fff;
						background: #cecece;
						pointer-events: none;
					}

					.item-active {
						background: #5241ff;
						color: #fff;
					}

					.item-option {
						color: #5241ff;
						background-size: contain;
						box-sizing: border-box;
						border: 1px solid #5241ff;
					}

					.other_inp {
						height: 100%;
						width: 100%;
						box-sizing: border-box;
						font-size: 18px;
						text-align: center;
						border-radius: 6px;
						border: 0;
						background: #5241ff;
						color: #fff;
					}
				}

				.float {
					position: absolute;
					right: 0;
					bottom: 0;
				}
			}
		}
	}

	.doll-number-wrapper {
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.doll-number-list {
			flex: 1;
			overflow-y: scroll;
		}

		.btn-box-wrapper {
			padding: 5px 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn {
				width: 45%;
				text-align: center;
				line-height: 40px;
				background: #fff;
				border-radius: 5px;
				font-size: 15px;
			}

			.confirm {
				color: #fff;
				background: #5241ff;
			}
		}
	}

	.unitPrice {
		width: 270px;
		background: #fff;
		overflow: hidden;

		.top-title {
			color: #262626;
			font-size: 19px;
			font-weight: 700;
			margin-top: 20px;
			text-align: center;
		}

		.info {
			padding: 16px 20px 20px;

			.set-price-modal {
				border: 1px solid #d9d9d9;
				border-radius: 4px;
				height: 44px;
				margin: auto;
				width: 150px;
				line-height: 44px;
				text-align: right;
				margin-bottom: 12px;
				display: flex;
				align-items: center;

				.input {
					color: #262626;
					font-size: 16px;
					height: 30px;
					margin: 0;
					border: 0;
					text-align: center;
					width: 80px;
					flex: 1;
				}

				.unit {
					display: inline-block;
					color: #262626;
					font-size: 16px;
					padding-right: 6px;
				}
			}
		}

		.bottom-btn {
			height: 50px;
			width: 100%;
			border-top: 1px solid #e6e6e6;
			box-sizing: border-box;
			font-size: 16px;
			text-align: center;
			line-height: 50px;
			display: flex;

			.unit-cancel {
				width: 50%;
				box-sizing: border-box;
				border-right: 1px solid #e6e6e6;
			}

			.unit-confirm {
				width: 50%;
				color: #5241ff;
			}
		}
	}

	.qs-content {
		height: auto;
		width: 100%;
		font-family: PingFangSC-Regular, PingFang SC;

		.title-qs-wrapper {
			display: flex;
			align-items: center;
			line-height: 50px;
			border-bottom: 1px solid #e5e5e5;

			.title-txt {
				flex: 1;
				text-align: center;
				color: #8c8c8c;
				box-sizing: border-box;
				font-size: 15px;
				font-weight: 700;
				border-bottom: 3px solid #ffffff;
			}

			.active-txt {
				color: #262626;
				border-bottom: 3px solid #262626;
			}
		}

		.qs-top {
			display: flex;
			width: 100%;
			height: 44px;
			line-height: 44px;
			text-align: center;
			font-size: 16px;
			background: #f5f5f5;
			border-bottom: 1px solid #e5e5e5;

			.top-left {
				width: 10%;
				@include center-flex();
				color: rgb(177, 175, 175);
			}

			.qs-title {
				width: 80%;
			}
		}

		.qs-body {
			padding: 10px;

			.desc {
				color: #8f8f8f;
				font-size: 12px;
				margin-bottom: 20px;
				text-align: center;
			}
		}
	}

	.deviceState {
		width: 100%;
		height: 100%;
		overflow-y: auto;

		.pad {
			padding: 0 2.5%;
			box-sizing: border-box;

			.right {
				color: #5241ff;
			}
		}

		.state-content {
			padding: 0 10px;
			box-sizing: border-box;

			.reason-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 10px;
				font-size: 13px;

				.list {
					background: #efeff4;
					border-radius: 5px;
					color: #777;
					line-height: 30px;
					margin-bottom: 10px;
					text-align: center;
					width: 31%;
				}

				.otherStyle {
					background: #5241FF;
					color: #fff;
				}
			}

			.other-wrapper {
				margin-top: 10px;

				.title {
					color: #333;
					font-size: 16px;
					margin-bottom: 5px;
				}

				textarea {
					width: 100%;
					height: 80px;
					border: 0;
					box-sizing: border-box;
					padding: 6px;
					background: #f5f6f7;
					font-size: 15px;
					resize: none;
				}
			}

			.btn-wraper {
				margin-top: 10px;

				.desc {
					color: #e76a6a;
					font-size: 13px;
					text-align: justify; //两端对齐
				}

				.btn-content {
					display: flex;
					justify-content: space-between;
					margin: 10px 0;
					width: 100%;

					.cancel {
						background: #5241ff;
						color: #fff;
					}

					.btn {
						border-radius: 5px;
						font-size: 15px;
						line-height: 44px;
						text-align: center;
						width: 45%;
					}

					.comfirm {
						border: 1px solid #5241ff;
						box-sizing: border-box;
						color: #5241ff;
					}
				}
			}
		}
	}
</style>