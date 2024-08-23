<template>
	<z-paging ref="operatePaging" v-model="dataList" @query="queryList" @scrollXls="scrollXls">
		<view slot="top" :style="{'height':!changeToptitle?'380rpx':''}" class="header-style">
			<view class="arrows-bottom text-over" :class="{'hidden-header': !changeToptitle}">
				<view class="value-wrap Center">
					<span class="date-con">{{ date }}</span>
					<span class="point"></span>
					<span class="place-con text-over">{{ placeName }}</span>
				</view>
				<view class="arrow-down Center">
					<u-icon name="arrow-down" size="36" color="#c6c6c6" style="z-index: 9999" />
				</view>
				<view class="line"></view>
			</view>
			<jy-navbar title="场地收益统计" bgColor="#f5f6f7"></jy-navbar>
			<view class="header-content" :class="{'hidden-header': changeToptitle}">
				<view class="header-notice" v-show="showDate">
					<view class="header-bg"></view>
					<view class="main-con box-sizing">
						注：为腾出数据空间加速查询性能，系统今后仅支持查询最近半年的历史数据（当前时间可查询
						<span class="mark">2021-10</span>月起的数据),
						请您定时记录数据到本地,以免超期无法查询。您还可以用电脑登录https
					</view>
				</view>
				<view class="condition-panel">
					<view class="condition-main">
						<view class="time-list box-sizing">
							<view class="label-btn box-sizing man-left" :style="index == 0 ? { margin: 0 } : ''"
								:class="{active: activeTime == item.id}" @click="quickTime(item.id)"
								v-for="(item, index) in timeList" :key="item.id">
								{{ item.time }}
							</view>
						</view>
						<view class="time-list box-sizing" @click="showDate = !showDate">
							<view class="left-title">时间</view>
							<view class="right-info">
								<view class="time-section">{{ date }}</view>
								<u-icon name="arrow-right" size="36" color="#c6c6c6" />
							</view>
						</view>
						<!-- <u-calendar v-model="showDate" type="range" allow-same-day @confirm="onConfirm"
								:max-range="180" range-prompt="只能查询半年的数据" :min-date="minDate" :max-date="maxDate"
								:round="false" color="#5241FF" /> -->

						<view class="selectbar box-sizing">
							<view class="site-con border-right" v-hasPermi="['app:place:index']"
								@click="$refs.placelist.showPlacePopup()">
								<span class="text-over label-text">{{ placeName }}</span>
								<span><u-icon name="arrow-down" /></span>
							</view>
							<view class="site-con" @click="$refs.devicelist.showDevice()">
								<span class="text-over label-text">{{ typeName }}</span><span><u-icon
										name="arrow-down" /></span>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<!-- 精简版 -->
		<view class="simple-list-panel text-over" v-show="switchMode">
			<view class="panel-hd">
				<view class="place">{{typeName == '设备类型' ? '场地' : '设备类型'}}</view>
				<view class="count" @click="iconDown = true">
					<view class="title">设备数</view>
					<view class="icon-play">
						<view class="icon-up"></view>
						<view class="icon-down" :class="{'active':iconDown}"></view>
					</view>
				</view>
				<view class="orderNumber">笔数</view>
				<view class="income Center" @click="iconDown = false">
					<span>合计收益</span>
					<view class="icon-play">
						<view class="icon-up"></view>
						<view class="icon-down" :class="{'active':!iconDown}"></view>
					</view>
				</view>
			</view>
			<view>
				<view class="site-analysis" v-for="(item, index) in dataList" :key="index"
					@click="sliderModalDetail(index)">
					<view class="arrows-right">
						<view class="place" v-html="item.placeName ? item.placeName : item.deviceTypeName"></view>
						<view class="count">{{ item.deviceNum }}台</view>
						<view class="orderNumber" v-html="item.transactionsNum ? item.transactionsNum : '0'"></view>
						<view class="income">{{ item.totalIncome }}元</view>
						<u-icon name="arrow-right" size="36" color="#c6c6c6" class="icon-arrow" />
					</view>
				</view>
			</view>
		</view>
		<!-- 精简详情 -->
		<u-popup :show="sliderModal" round="20" mode="center" :customStyle="{'background-color': 'transparent'}"
			@close="() => sliderModal = false">
			<view class="modal-content">
				<view class="test-wrapper" v-for="(item, index) in dataList" :key="index" :id="[`notice${index}`]">
					<place-infocard :item="item"></place-infocard>
				</view>
			</view>
		</u-popup>
		<!-- 详细版 -->
		<view v-show="!switchMode">
			<view class="survey-panel">
				<view class="panel-bd">
					<view class="total-income">
						<p class="label-text">
							<span class="top">
								<span>合计</span>:&nbsp;
								<!-- <span>
									{{ earnStar.totalIncome}}
									<span class="unit">元</span>&nbsp;
									<span class="service-charge">
										(含服务费{{earnStar.onlinePayTotalCommission? "¥" + earnStar.onlinePayTotalCommission: "¥0.00"}}元)
									</span>
								</span> -->
							</span>
						</p>
						<view class="desc">
							预计{{ earnStar.cashPayIncome }}<span class="unit">元</span>在机器钱箱中，现金支付请以实际线下统计为准
						</view>
					</view>
					<view class="income-list text-over">
						<view class="item-wrap">
							<view class="label">在线支付</view>
							<view class="price">
								{{ earnStar.onlinePayIncome }}<span class="nit">元</span>
							</view>
						</view>
						<view class="item-wrap side-border">
							<view class="label">现金支付</view>
							<view class="price">
								{{ earnStar.cashPayIncome }}<span class="nit">元</span>
							</view>
						</view>
						<view class="item-wrap">
							<view class="label">补贴总额</view>
							<view class="price">
								{{ earnStar.subsidyIncome }}<span class="nit">元</span>
							</view>
						</view>
					</view>
					<view class="count-list">
						<view class="total-coin">
							<view class="label-text">
								<span>合计投币</span>
								<span>{{ earnStar.totalInsertCoins }}</span>
								<span class="icon-question" @click="answerQuest = !answerQuest">
									<u-icon name="question-circle-fill" size="36" /></span>
							</view>
							<view class="value">
								线上{{ earnStar.onlineInsertCoins }}个+线下{{earnStar.offlineInsertCoins}}个
							</view>
						</view>
						<view class="total-coin left-border">
							<view class="label-text">
								<span>出礼比例</span>
								<span>{{earnStar.outPresentProportion? earnStar.outPresentProportion + '/1': '0/0'}}</span>
								<span class="icon-question" @click="answerQuest = !answerQuest">
									<u-icon name="question-circle-fill" size="36" />
								</span>
							</view>
							<view class="value">
								{{ earnStar.outPresentNum }}个/{{earnStar.outPresentTotalPrice}}元
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="detail-list-panel">
				<view class="entry" v-for="(item, index) in dataList" :key="index">
					<view class="site-detail-link"
						@click="goEarnDetail(item.placeName ? item.placeId : item.deviceTypeId)">
						<view class="entry-hd">
							<view class="place-name">
								<span class="place-name-style">
									{{item.placeName? $placeNameRule(item.placeName, item.placeNumber): item.deviceTypeName}}
								</span>
								<span class="count" v-show="item.placeName">{{ item.deviceNum }}台</span>
							</view>
							<span class="money text-over">
								<span class="text">合计：</span>{{ item.totalIncome }}
								<span class="unit">元</span>
							</span>
						</view>
						<view class="entry-bd text-over">
							<view>
								<view class="info-row">
									<span class="field">在线支付</span>
									<span class="value">
										<span class="num">出币{{ item.onlinePayInsertCoins }}个,</span>
										{{ item.onlinePayIncome}}<span class="unit">元</span></span>
								</view>
								<view class="info-row">
									<span class="field">平台补贴</span>
									<span class="value">{{ item.subsidyIncome }}<span class="unit">元</span><u-icon
											name="arrow-right" size="36" color="#c6c6c6" class="arrows" /></span>
								</view>
								<view class="info-row">
									<span class="field">现金支付</span>
									<span class="value">{{ item.cashPayIncome}}<span class="unit">元</span></span>
								</view>
							</view>
							<view class="info-part">
								<view class="one-footer">
									<span class="field">合计投币</span>
									<span class="right-txt">{{ item.totalInsertCoins}}<span class="unit">个</span></span>
								</view>
								<view class="count">
									线上{{ item.onlinePayInsertCoins }}个,线下{{item.offlineInsertCoins}}个
								</view>
							</view>
							<view class="info-part">
								<view class="one-footer">
									<span class="field">商品消耗</span>
									<span class="right-txt">{{ item.commodityCount }}<span
											class="unit">个</span>{{ item.commodityTotalAmount}}<span
											class="unit">元</span></span>
								</view>
								<view class="count">
									出礼比例<span>{{item.outPresentProportion? item.outPresentProportion + '/1': '0/0'}}</span>
								</view>
							</view>
						</view>
					</view>
					<view class="link" v-show="item.placeName">
						<view class="tendency-link" @click="goTo(item, 'trend')">
							场地收益趋势
						</view>
						<view class="tendency-link border-left" @click="goTo(item, 'classify')">
							查看收益分类
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 为空 -->
		<xls-empty slot="empty"></xls-empty>
		<!-- 展示切换 -->
		<view class="switch-mode-btn" @click="changeswitchMode">
			<span class="text detail-modal-text" v-show="switchMode">详细版</span>
			<span class="text simple-modal-text" v-show="!switchMode">精简版</span>
			<span class="icon-wrap detail" v-show="switchMode">
				<span class="icon"><u-icon name="arrow-downward" size="24" /></span>
			</span>
			<span class="icon-wrap" v-show="!switchMode">
				<span class="icon"><u-icon name="arrow-downward" size="24" /></span>
			</span>
		</view>
		<!-- 说明 -->
		<u-popup :show="answerQuest" round="20" mode="center">
			<view class="quest-con">
				<image :src="`${$baseUrl}appV4/altered/explain-pic.png`" alt="" mode="widthFix" />
				<view class="btn" @click="answerQuest = !answerQuest"></view>
			</view>
		</u-popup>
		<!-- place -->
		<!-- <CustomList ref="placelist" @getPlaceId="getPlaceId" /> -->
		<!-- 设备类型 -->
		<!-- <device-list ref="devicelist" @getTypeId="getTypeId"></device-list> -->
	</z-paging>
</template>

<script>
	import PlaceInfocard from "./component/placeInfocard.vue";
	// import {
	// 	getPlaceIncome,
	// 	getDeviceTypeIncome
	// } from "@/utils/api/earningStat";
	// import {
	// 	getTime,
	// 	getDateAll
	// } from "@/plugins/utilityClass";
	// import PlaceidList from "@/components/commonComps/placeidList";
	// import DeviceList from "@/components/commonComps/deviceList";
	// import CustomList from "@/components/commonComps/customList.vue";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";


	import {
		orderController
	} from "@/api/index.js";
	export default {
		components: {
			PlaceInfocard,
			// PlaceidList,
			// DeviceList,
			// CustomList
		},
		data() {
			return {
				//头部折叠
				changeToptitle: false,
				//详细与精简
				switchMode: false,
				//精简排序
				iconDown: false,
				//精简详情
				sliderModal: false,
				//疑问开关
				answerQuest: false,
				//快捷时间
				activeTime: 0,
				timeList: [{
						id: 0,
						time: "今日"
					},
					{
						id: 1,
						time: "昨天"
					},
					{
						id: 2,
						time: "本周"
					},
					{
						id: 3,
						time: "本月"
					},
					{
						id: 4,
						time: "半年"
					},
				],
				//选择日期
				showDate: false,
				// minDate: new Date(
				// 	new Date().getFullYear() - 1,
				// 	new Date().getMonth(),
				// 	new Date().getDate()
				// ),
				// maxDate: new Date(getDateAll(0)),
				// date: getDateAll(0) + "\u2002今天",
				date: "xxx",
				// //开始结束时间
				// startTime: getDateAll(0),
				// endTime: getDateAll(0),
				//数据
				earnStar: {},
				//placeid
				placeId: [],
				placeName: "全部场地",
				//选中场地数
				placeNum: "",
				deviceTypeId: [],
				typeName: "设备类型",
				//获取
				page: 0,
				onEarth: false,
				// 
				dataList: [],
			};
		},
		// created() {
		// 	if (this.$route.query.place) {
		// 		let place = JSON.parse(this.$route.query.place);
		// 		this.placeId = place.placeId;
		// 		this.placeName = place.placeName;
		// 	}
		// 	this.getDetaildata();
		// 	window.addEventListener("scroll", this.screenSlide);
		// },
		// beforeDestroy() {
		// 	window.removeEventListener("scroll", this.screenSlide);
		// },
		methods: {
			queryList(pageNo, pageSize) {
				orderController.getPlaceIncome({
					page: pageNo,
					size: pageSize,
					startTime: '2024-08-23',
					endTime: '2024-08-23'
				}).then(res => {
					this.earnStar = res.data
					this.$refs.operatePaging.complete(res.data.placeDeviceTypeIncomeVos);
				})
			},
			goTo(item, route) {
				let params = {}
				if (route === 'trend') {
					params = {
						placeId: item.placeId,
						placeName: item.placeName,
					}
				} else {
					params = {
						placeId: item.placeId,
						startTime: this.startTime,
						endTime: this.endTime,
						placeName: item.placeName,
						deviceNum: item.deviceNum,
						totalIncome: item.totalIncome,
					}
				}
				this.$goTo(`/pages/mainPackages/home/operateModule/${route}`, "navigateTo", params)
			},
			// js 触发的函数:置空即可
			changeswitchMode() {
				this.switchMode = !this.switchMode;
				// document.body.scrollTop = 0;
				// document.documentElement.scrollTop = 0;
			},
			scrollXls(e) {
				const scrollTop = e.detail.scrollTop
				if (scrollTop > 70) {
					this.changeToptitle = true;
				}
				if (scrollTop <= 0) {
					this.changeToptitle = false;
				}
			},
			//精简详情
			sliderModalDetail(index) {
				this.sliderModal = !this.sliderModal;
				this.$nextTick(() => {
					this.$el.querySelector(`#notice${index}`).scrollIntoView({
						behavior: "smooth", //定义动画过渡效果，"auto"或 “smooth” 之一。默认为 “auto”。
						block: "center", //垂直方向的对齐
						inline: "center", //inline:定义水平方向的对齐， “start”, “center”, “end”, 或 "nearest"之一。默认为 “nearest”。
					});
				});
			},




			//选择日期
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
				this.activeTime = -1;
				this.date = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
				this.startTime = this.formatDate(start);
				this.endTime = this.formatDate(end);
				this.page = 0;
				this.onEarth = false;
				this.getDetaildata();
			},
			//判断滚动
			screenSlide() {
				var scrollTop =
					document.documentElement.scrollTop ||
					document.body.scrollTop ||
					window.pageYOffset;
				this.scrollTop = scrollTop;
				var scrollHeight = document.documentElement.scrollHeight;
				var clientHeight = document.documentElement.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (
						this.onEarth == false &&
						this.typeName == "设备类型" &&
						this.$route.path == "/earningStat/placeEarning"
					) {
						this.getDetaildata();
					}
				}
				if (scrollTop > 70) {
					this.changeToptitle = true;
				}
				if (scrollTop <= 0) {
					this.changeToptitle = false;
				}
			},
			//获取场地收益数据
			getDetaildata: debounceFun(async function() {
				let res = await getPlaceIncome({
					page: ++this.page,
					size: 10,
					startTime: this.startTime,
					endTime: this.endTime,
					placeIds: this.placeId,
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data.placeDeviceTypeIncomeVos < 10) {
						this.onEarth = true;
					} else {
						this.onEarth = false;
					}
					if (this.page > 1) {
						this.dataList = [
							...this.dataList,
							...res.data.data.placeDeviceTypeIncomeVos,
						];
					} else {
						this.earnStar = res.data.data;
					}
				}
			}, 500),
			//获取设备类型（场地）收益数据
			getDevicedata() {
				getDeviceTypeIncome({
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.placeId,
						deviceTypeId: this.deviceTypeId,
					})
					.then((res) => {
						this.earnStar = res.data.data;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			//按设备类型
			getTypeId(id) {
				let array = id[1].toString();
				this.deviceTypeId = array;
				if (id[0].length == 1) {
					this.typeName = id[0][0];
				} else {
					this.typeName = id[0][0] + "、" + id[0][1] + "、" + id[0][2];
				}
				this.getDevicedata();
			},
			//按场地
			getPlaceId(place) {
				if (place[1].length == 1) {
					this.pickerPlace = `${place[0][0]}`;
				} else {
					this.placeName = place[1].length ?
						place[0][0] + "、" + place[0][1] + "、" + place[0][2] :
						"全部场地";
				}
				this.placeNum = place[1].length;
				this.placeId = place[1].length ? String(place[1]) : [];

				if (!this.deviceTypeId.length) {
					this.page = 0;
					this.onEarth = false;
					this.getDetaildata();
				} else {
					this.getDevicedata();
				}
			},
			//快捷时间
			quickTime(id) {
				this.activeTime = id;
				this.page = 0;
				this.onEarth = false;
				if (id == 0) {
					let today = getDateAll(0);
					this.date = today + "\u2002今天";
					this.startTime = today;
					this.endTime = today;
				}
				if (id == 1) {
					let yesterday = getDateAll(1);
					this.date = yesterday + "\u2002昨天";
					this.startTime = yesterday;
					this.endTime = yesterday;
				}
				if (id == 2) {
					//本周
					this.date = `${getTime(0)} 至 ${getTime(-6)}`;
					this.startTime = getTime(0);
					this.endTime = getTime(-6);
				}
				if (id == 3) {
					//本月
					let monStrat =
						new Date().getFullYear() +
						"-" +
						(new Date().getMonth() + 1 < 10 ?
							"0" + (new Date().getMonth() + 1) :
							new Date().getMonth() + 1) +
						"-" +
						"01";
					this.date = monStrat + "至" + getDateAll(0);
					this.startTime = monStrat;
					this.endTime = getDateAll(0);
				}
				if (id == 4) {
					//本年
					let halfYear = getDateAll(180);
					this.date = halfYear + "至" + `${getDateAll(0)}`;
					this.startTime = halfYear;
					this.endTime = getDateAll(0);
				}
				if (!this.deviceTypeId.length) {
					this.getDetaildata();
				} else {
					this.getDevicedata();
				}
			},
			//跳转详情页
			goEarnDetail(epl) {
				if (this.typeName == "设备类型") {
					let placeId = "place";
					this.$router.push({
						name: "placeEarndetail",
						query: {
							detailArguments: [epl, this.startTime, this.endTime, placeId],
						},
					});
				} else {
					let deviceTypeId = "type";
					this.$router.push({
						name: "placeEarndetail",
						query: {
							detailArguments: [
								epl,
								this.startTime,
								this.endTime,
								deviceTypeId,
								this.placeId,
							],
						},
					});
				}
			},
			

		},
	};
</script>

<style lang="scss" scoped>
	.header-style {
		position: relative;
	}
	//simple-header
	.arrows-bottom {
		position: absolute;
		top: 100%;
		width: 100%;
		max-width: 375px;
		box-sizing: border-box;
		height: 44px;
		transition: height 0.2s;
		-webkit-transition: height 0.2s;
		padding-right: 40px;
		font-size: 16px;
		color: #5241ff;
		background: #fff;
		z-index: 99;

		.line {
			width: 100%;
			height: 1px;
			background: #ddd;
			position: absolute;
			bottom: 0;
			left: 0;
		}

		.value-wrap {
			width: 100%;
			height: 100%;
			padding: 0 10px;
			box-sizing: border-box;
			text-align: center;

			.date-con {
				max-width: 75%;
				display: inline-block;
			}

			.place-con {
				min-width: 18%;
				display: inline-block;
			}

			.point {
				margin: 0 5px;
				display: inline-block;
				width: 4px;
				height: 4px;
				background: #5241ff;
				border-radius: 50%;
			}
		}

		.arrow-down {
			width: 40px;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
		}
	}

	//header
	.header-content {
		height: 138px;
		width: 100%;
		transition: height 0.5s;
		-webkit-transition: height 0.5s;
		overflow: hidden;
		position: absolute;
		top: 48px;
		left: 0;
	}

	.hidden-header {
		height: 0;
		overflow: hidden;
	}

	.header-notice {
		position: fixed;
		top: 0;
		width: 100%;
		height: 20%;
		z-index: 9999;

		.header-bg {
			width: 100%;
			height: 40%;
			background: transparent;
		}

		.main-con {
			width: 100%;
			height: 60%;
			background: #e4ecff;
			padding: 12px;
			font-size: 12px 17px 12px 13px;
			color: #404d6c;
			line-height: 16px;
			text-align: justify;

			.mark {
				color: #e12938;
			}
		}
	}

	.condition-panel {
		background: #fff;
		border-bottom: 1px solid #ddd;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";

		.condition-main {
			padding-left: 10px;

			.time-list {
				height: 44px;
				width: 100%;
				border-bottom: 1px solid #ddd;
				display: flex;
				align-items: center;

				.label-btn {
					display: inline-block;
					font-size: 15px;
					background: #f2f2f2;
					border-radius: 5px;
					color: rgba(0, 0, 0, 0.6);
					height: 31px;
					line-height: 31px;
					padding: 0 12px;
					border: 1px solid #f2f2f2;
				}

				.man-left {
					margin-left: 8px;
				}

				.active {
					color: #5241ff;
					border: 1px solid #5241ff;
					background: #fff;
				}

				.left-title {
					font-size: 16px;
					width: 20%;
					color: rgba(0, 0, 0, 0.6);
				}

				.right-info {
					flex: 1;
					padding-left: 5px;
					display: flex;
					align-items: center;

					.time-section {
						width: 92.5%;
						font-size: 16px;
						color: #5241ff;
					}
				}
			}

			.selectbar {
				height: 50px;
				padding: 10px 0;
				text-align: center;
				font-weight: 500;
				font-size: 16px;
				display: flex;

				.site-con {
					flex: 1;
					width: 33.33%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.label-text {
						width: 80px;
						color: #1a1a1a;
					}
				}

				.border-right {
					border-right: 1px solid #e6e6e6;
				}
			}
		}
	}

	.service-charge {
		font-size: 8px !important;
		color: #fff;
	}

	.survey-panel {
		padding: 10px 2.5% 0;

		.panel-bd {
			border-radius: 5px;
			background: linear-gradient(#5241ff, #e6e4fe);

			.total-income {
				padding: 16px 10px 10px;
				color: #fff;

				.label-text {
					font-size: 18px;
					padding: 0;
					color: #fff;
					font-weight: 700;
					margin: 0 0 7px;

					.bottom {
						font-size: 12px;
					}
				}

				.desc {
					font-size: 15px;
				}

				.unit {
					font-size: 16px;
				}
			}

			.income-list {
				height: 66px;
				text-align: center;
				background: #e6e4fe;
				display: flex;
				align-items: center;

				.item-wrap {
					width: 33.33%;
					flex: 1;
					color: #000;

					.label {
						font-size: 14px;
					}

					.price {
						font-size: 15px;
						padding-top: 2px;

						.nit {
							font-size: 12px;
						}
					}
				}

				.side-border {
					border-left: 1px solid #5241ff;
					border-right: 1px solid #5241ff;
				}
			}

			.count-list {
				display: flex;
				background: #fff;
				height: 66px;

				.total-coin {
					flex: 1;
					padding: 12px 10px;
					box-sizing: border-box;

					.label-text {
						font-size: 12px;
						color: rgba(0, 0, 0, 0.6);
						display: flex;
						align-items: center;
					}

					.icon-question {
						color: #babecc;
						margin-left: 10px;
					}

					.value {
						padding-top: 5px;
						font-size: 13px;
						color: #000;
					}
				}
			}

			.left-border {
				border-left: 1px solid #ddd;
				box-sizing: border-box;
			}
		}
	}

	.detail-list-panel {
		margin-top: 10px;

		.entry {
			margin-bottom: 15px;

			.site-detail-link {
				.entry-hd {
					padding: 5px 10px;
					min-height: 40px;
					background: #e6e4fe;
					border-top: 1px solid #c5cdd9;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					display: flex;
					align-items: center;

					.place-name {
						flex: 1;
						display: flex;
					}

					.place-name-style {
						padding-top: 2.5px;
						font-size: 15px;
						font-weight: 600;
						color: #000;
						word-break: break-all;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						line-height: 20px;
					}

					.count {
						margin: 0 5px;
						display: inline-block;
						font-size: 13px;
						height: 20px;
						color: #fff;
						border-radius: 4px;
						text-align: center;
						overflow: hidden;
						white-space: nowrap;
						padding-left: 5px;
						text-overflow: ellipsis;
						background-image: url(#{$baseUrl}appV4/altered/label-bg.png);
						line-height: normal;
						background-repeat: no-repeat;
						background-size: auto 100%;
						min-width: 36px;
					}

					.money {
						text-align: right;
						font-size: 17px;
						color: #000;
						font-weight: 700;

						.text {
							font-weight: 600;
						}

						.unit {
							font-size: 14px;
						}
					}
				}

				.entry-bd {
					padding: 7.5px 15px 0 10px;
					background: #fff;
					border-bottom: 1px solid #e6e6e6;

					.info-part {
						border-top: 1px solid #e6e6e6;
						padding: 10px 0;

						.one-footer {
							display: flex;
							justify-content: space-between;
							font-size: 15px;

							.right-txt {
								text-align: right;
								display: inline-block;
								max-width: 60%;
								color: rgba(0, 0, 0, 0.8);
								padding-right: 10px;

								.unit {
									font-size: 12px;
								}
							}
						}

						.count {
							padding-right: 10px;
							padding-top: 3px;
							text-align: right;
							font-size: 12px;
							color: rgba(138, 138, 138, 0.8);
						}
					}

					.info-row {
						padding: 10px 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}

					.field {
						display: inline-block;
						max-width: 38%;
						font-size: 15px;
						color: #000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.value {
						padding-right: 10px;
						display: inline-block;
						font-size: 15px;
						max-width: 60%;
						color: rgba(0, 0, 0, 0.8);
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						text-align: right;
						display: flex;
						align-items: center;

						.num {
							font-size: 12px;
							color: rgba(138, 138, 138, 0.8);
						}

						.unit {
							font-size: 12px;
						}

						.icon-arrow {
							display: inline-block;
							position: relative;
							top: 2px;
							right: -5px;
						}
					}
				}
			}

			.link {
				height: 44px;
				display: flex;
				background: #fff;

				.tendency-link {
					flex: 1;
					height: 44px;
					color: #5241ff;
					font-size: 15px;
					line-height: 44px;
					text-align: center;
				}

				.border-left {
					border-left: 1px solid #ddd;
					box-sizing: border-box;
				}
			}
		}
	}

	.simple-list-panel {
		padding-top: 10px;

		.panel-hd {
			padding: 0 10px;
			border-bottom: 1px solid #e6e6e6;
			background: #fff;
			color: rgba(0, 0, 0, 0.6);
			height: 44px;
			font-size: 14px;
			display: flex;
			align-items: center;

			.icon-play {
				height: 22.5px;
				position: relative;
				left: 2.5px;

				.icon-up {
					width: 0;
					height: 0;
					border-width: 5px;
					border-style: solid;
					border-color: transparent transparent #b1b5c0;
				}

				.icon-down {
					margin-top: 2px;
					width: 0;
					height: 0;
					border-width: 5px;
					border-style: solid;
					border-color: #b1b5c0 transparent transparent;
				}

				.active {
					border-color: #5241ff transparent transparent;
				}
			}
		}

		.site-analysis {
			padding-left: 10px;
			background: #fff;
			color: #000;

			.arrows-right {
				height: 50px;
				display: flex;
				align-items: center;
				font-size: 14px;

				.icon-arrow {
					position: relative;
					top: 0;
					right: 5px;
				}
			}
		}

		.top-bor {
			border-top: 1px solid #e6e6e6;
		}

		.place {
			flex: 3;
			max-width: 140px;
			padding-right: 4px;
			text-overflow: ellipsis;
			line-clamp: 2;
			overflow: hidden;
		}

		.count {
			min-width: 85px;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.orderNumber {
			flex: 1;
			text-align: center;
		}

		.income {
			padding-right: 15px;
			flex: 1.5;
			text-align: center;
		}
	}

	// 精简详情
	.modal-content {
		width: 100vw;
		overflow-x: scroll;
		box-sizing: border-box;
		white-space: nowrap;

		.test-wrapper {
			width: 345px;
			margin: 0 8px;
			display: inline-block;
			border-radius: 12px;
			white-space: normal;
		}
	}

	.modal-content::-webkit-scrollbar {
		display: none;
	}

	.u-popup {
		background-color: transparent;
	}

	//switchMode
	.switch-mode-btn {
		padding: 10px 0;
		position: fixed;
		right: 0;
		bottom: 34%;
		width: 24px;
		min-height: 70px;
		box-sizing: border-box;
		text-align: center;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		background: linear-gradient(#5241ff, #e6e4fe);

		.text {
			writing-mode: vertical-rl;
			font-size: 12px;
			color: #fff;
			letter-spacing: 2px;
		}

		.icon-wrap {
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background: #fff;
			color: #5241ff;
			display: inline-block;

			.icon {
				width: 14px;
				height: 14px;
				border-radius: 50%;
				display: inline-block;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.detail {
			transform: rotate(-180deg);
		}
	}

	.quest-con {
		width: 305px;
		height: 390px;
		position: relative;
		overflow: hidden;

		img {
			width: 100%;
			height: auto;
		}

		.btn {
			width: 100%;
			height: 45px;
			position: absolute;
			bottom: 0;
		}
	}
</style>