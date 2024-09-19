<template>
	<view class="condition-screening-wrapper">
		<!-- 搜索 -->
		<xls-search @confirm="searchConfirm" placeholder="请输入设备编码" v-if="text == 'index'"></xls-search>
		<view class="condition-wrapper">
			<!-- 快捷时间 -->
			<view class="cond-item-content timer-wrapper">
				<view class="time-style" v-for="item in timeList" :key="item.id"
					:class="[{'active-time':pickerTime == item.id}]" @click="quickTime(item.id)">
					{{ item.time }}
				</view>
				<view class="header-btn" v-if="text == 'detail'" @click="getExcelUrl"
					v-hasPermi="['app:dbj:index:export']">
					想要导出数据
					<u-icon name="question-circle" size="32" class="icon" />
				</view>
			</view>
			<!-- 时间 -->
			<view class="cond-item-content" @click="showDate = !showDate">
				<view class="left-wrapper">时间</view>
				<view class="right-wrapper">
					<view class="time-section" :class="{'On-right':text == 'history'}">
						{{ date }}
					</view>
					<u-icon name="arrow-right" size="36" color="#c6c6c6" />
				</view>
			</view>
			<!-- 场地 -->
			<view class="cond-item-content" v-if="text == 'history' || text == 'index'">
				<view class="left-wrapper">场地</view>
				<view class="right-wrapper" @click="openPopup">
					<view class="time-section" :class="{'On-right':text == 'history'}">
						{{ placeName }}
					</view>
					<u-icon name="arrow-right" size="36" color="#c6c6c6" />
				</view>
			</view>
			<!-- 出币 -->
			<view class="cond-item-content" v-if="text == 'detail' && $parent.activeName == 2">
				<xls-dropdown-menu active-color="#5241FF">
					<xls-dropdown-item title="出币类型" ref="place" name="1">
						<view class="item-wrapper-list">
							<u-cell v-for="(item, index) in coinList" :key="index" :title="item.name"
								:value="payType == item.id ? '✔' : ''" @click="confirmCheck(item.id, 'left')" />
							<on-earth />
						</view>
					</xls-dropdown-item>
					<xls-dropdown-item title="出币结果" ref="pay" name="2">
						<view class="item-wrapper-list">
							<u-cell v-for="(item, index) in resultList" :key="index" :title="item.name"
								:value="payResult == item.id ? '✔' : ''" @click="confirmCheck(item.id, 'rigth')" />
						</view>
					</xls-dropdown-item>
				</xls-dropdown-menu>
			</view>
			<!-- 导出 -->
			<view class="cond-item-content" v-if="text == 'history'">
				<view class="Bleft-wrapper">
					温馨提示
					<u-icon name="info-circle" size="36" @click="$refs.explain.downExplain = true" />
				</view>
				<view class="right-wrapper" :class="{'On-right':text == 'history'}"
					v-hasPermi="['app:dbj:index:export']">
					<view class="export" @click="getExcelUrl">导出</view>
				</view>
			</view>
		</view>
		<!-- 导出数据 -->
		<DownData ref="data" />
		<DownEcexl ref="down" />
		<ExplainPage ref="explain" />
		<!-- 兑币机场地 -->
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId" :deviceType="5" ></xls-place-checkbox>
		<xls-calendar :show="showDate" @close="() => { showDate = false }" 
			@confirm="getCalender" :defaultDate="[startTime, endTime]">
		</xls-calendar>
	</view>
</template>

<script>
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import moment from "moment";
	import {
		deviceDataController
	} from "@/api/index.js";
	import DownEcexl from "./downExcel.vue";
	import DownData from "./downData.vue";
	import ExplainPage from "./explainPage.vue";
	export default {
		name: "conditionScreening",
		components: {
			DownEcexl,
			DownData,
			ExplainPage
		},
		props: {
			text: {
				type: String,
				default: "index", // detail history
			},
		},
		data() {
			return {
				/** 搜索 */
				searchValue: null,
				/** 快捷时间 */
				pickerTime: -1,
				timeList: [{
						id: 4,
						time: "今天"
					},
					{
						id: 0,
						time: "昨天"
					},
					{
						id: 1,
						time: "前天"
					},
					{
						id: 2,
						time: "本周"
					},
					{
						id: 3,
						time: "本月"
					},
				],
				/** 选择日期 */
				date: getDateAll(0) + "\u2002今天",
				showDate: false,
				startTime: getDateAll(0),
				endTime: getDateAll(0),
				/** 场地 */
				placeId: [],
				placeName: "全部场地",
				/** 出币类型 */
				payType: null,
				// 取币类型兑币类型：1、直接购买 2、会员取币，3远程启动，4美团核销，5口碑核销，6.抖音核销 7线下购买
				coinList: [{
						id: null,
						name: "全部类型"
					},
					{
						id: 1,
						name: "直接购买"
					},
					{
						id: 2,
						name: "会员取币"
					},
					{
						id: 3,
						name: "远程启动"
					},
					{
						id: 4,
						name: "美团核销"
					},
					{
						id: 5,
						name: "口碑核销"
					},
					{
						id: 6,
						name: "抖音核销"
					},
					{
						id: 7,
						name: "线下购买"
					},
				],
				/** 出币结果 */
				payResult: null,
				// 0正在出币，1出币成功，2出币失败
				resultList: [{
						id: null,
						name: "全部结果"
					},
					{
						id: 0,
						name: "正在出币"
					},
					{
						id: 1,
						name: "出币成功"
					},
					{
						id: 2,
						name: "出币失败"
					},
				],
				/** 导出 **/
				historyUrl: "",
				indexUrl: "",
			};
		},
		methods: {
			/** 输入搜索 */
			searchConfirm(search) {
				this.searchValue = search ? search : null;
				this.get();
			},
			/** 兑币机场地 */
			openPopup() {
				this.$refs.placelist.showPlacePopup(this.placeId)
			},
			getPlaceId(place) {
				if (place[1].length == 1) {
					this.placeName = `${place[0][0]}`;
				} else {
					this.placeName = place[1].length ?
						`已选中(${place[1].length})个场地` :
						"全部场地";
				}
				this.placeId = place[1].length?String(place[1]):"";
				this.get();
			},
			/** 快捷时间 */
			quickTime(id) {
			    const getRange = (startDate, endDate) => [
			        moment().startOf(startDate).format("YYYY-MM-DD"),
			        moment().endOf(endDate).format("YYYY-MM-DD")
			    ];
			
			    // 获取今天的日期
			    const today = moment().format("YYYY-MM-DD");
			    
			    // 处理时间范围
			    let date;
			    switch (id) {
			        case 0: // 今天
			        case 4: // 自定义范围，默认为今天
			            date = [today, today];
			            break;
			        case 1: // 昨天
			            date = [moment().subtract(1, "days").format("YYYY-MM-DD"), today];
			            break;
			        case 2: // 本周
			            date = getRange("week", "week");
			            break;
			        case 3: // 本月
			            date = getRange("month", "day");
			            break;
			        default:
			            date = [today, today];
			            break;
			    }
				this.pickerTime = id;
			    this.startTime = date[0];
			    this.endTime = date[1];
			    this.date = `${date[0]} 至 ${date[1]}`;
			    this.get();
			},
			/** 确定日期 */
			getCalender(date) {
				const [startTime, endTime] = date;
				this.showDate = false;
				this.pickerTime = -1;
				this.date = `${startTime} 至 ${endTime}`;
				this.startTime = startTime;
				this.endTime = endTime;
				this.get();
			},
			
			/** 出币类型 结果 */
			confirmCheck(id, type) {
				if (type == "left") {
					this.payType = id;
					this.$refs.place.toggle(false);
				} else {
					this.payResult = id;
					this.$refs.pay.toggle(false);
				}
				this.get();
			},
			/** 传参 */
			get() {
			    // 基础数据
			    const baseData = {
			        startTime: `${this.startTime} 00:00:00`,
			        endTime: `${this.endTime} 23:59:59`,
					pickerTime: this.pickerTime
			    };
			
			    // 处理特定类型的数据
			    let data;
			
			    if (this.text === "index") {
			        data = {
			            ...baseData,
			            placeId: this.placeId,
			            search: this.searchValue,
			        };
			    } else if (this.text === "detail") {
			        data = baseData;
			        if (this.$parent.activeName !== 1) {
			            data.result = this.payResult;
			            data.exchangeType = this.payType;
			        }
			    } else if (this.text === "history") {
			        data = {
			            startTime: this.startTime,
			            endTime: this.endTime,
			            placeIds: this.placeId.length ? String(this.placeId) : null,
			        };
			    }
			
			    // 触发事件
			    this.$emit("getParams", data);
			},
			
			/** 导出数据 */
			async getExcelUrl(data) {
				let params = {
					startTime: this.startTime,
					endTime: this.endTime,
					type: this.text == "detail" ?
						"DBJ_NEW_DAILY" :
						this.text == "history" ?
						"DBJ_HISTORY" :
						"DBJ_NEW", // DBJ_NEW_DAILY：详情  DBJ_NEW：不是详情
					deviceNumber: this.text == "detail" ?
						this.$route.query.deviceNumber :
						this.text == "index" ?
						this.searchValue :
						null, //详情时 必填！！！！
					placeId: this.placeId.length ? String(this.placeId) : null, // 只用于详情！！！！！
				};
				this.$loading();
				let res = await deviceDataController.createDownloadFilesUrl({param: params});
				this.$hideLoading();
				if (res.code == 200) {
					if (this.text == "history") {
						this.historyUrl = res.data;
						this.$refs.data.downloadData = true;
					} else {
						this.indexUrl = res.data;
						this.$refs.down.downloadEcexl = true;
					}
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.condition-screening-wrapper {
		width: 100%;

		.condition-wrapper {
			padding-left: 10px;
			background: #fff;

			.cond-item-content {
				height: 44px;
				width: 100%;
				display: flex;
				align-items: center;
			}

			.cond-item-content:not(:last-child) {
				border-bottom: 1px solid #ddd;
			}

			.time-style {
				font-size: 13px;
				background: #f2f2f2;
				border: 1px solid #f2f2f2;
				border-radius: 5px;
				color: rgba(0, 0, 0, 0.6);
				line-height: 28px;
				margin-right: 10px;
				max-width: 56px;
				flex: 1;
				text-align: center;
			}

			.active-time {
				color: #5241ff;
				border: 1px solid #5241ff;
				background: #fff;
			}

			.header-btn {
				flex: 3;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-right: 15px;
				color: #5241ff;
				font-size: 13px;

				.icon {
					margin-left: 5px;
				}
			}

			.left-wrapper {
				font-size: 16px;
				width: 20%;
				display: flex;
				align-items: center;
				color: rgba(0, 0, 0, 0.6);
			}

			.Bleft-wrapper {
				font-size: 16px;
				flex: 1;
				display: flex;
				align-items: center;
				color: rgba(0, 0, 0, 0.6);
			}

			.right-wrapper {
				flex: 1;
				padding-left: 5px;
				display: flex;
				align-items: center;

				.time-section {
					width: 92.5%;
					font-size: 16px;
					color: #5241ff;
				}

				.export {
					padding: 5px 20px;
					font-size: 13px;
					color: #5241ff;
					border: 1px solid #5241ff;
					border-radius: 4px;
					margin-right: 10px;
				}
			}

			.On-right {
				flex: 1;
				padding-left: 5px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}

			.item-wrapper-list {
				overflow-y: scroll;
			}
		}
	}

	::v-deep .u-dropdown-menu {
		flex: 1;

		.u-dropdown-menu__bar {
			height: 32px;
			box-shadow: 0 0 0 rgba(100, 101, 102, 0);
		}
	}

	::v-deep .u-cell__value {
		color: #5241ff;
	}
</style>