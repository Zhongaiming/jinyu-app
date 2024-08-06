<template>
	<div class="condition-screening-wrapper">
		<!-- 搜索 -->
		<xls-search @confirm="searchConfirm" placeholder="请输入设备编码" v-if="text == 'index'"></xls-search>
		<div class="condition-wrapper">
			<!-- 快捷时间 -->
			<div class="cond-item-content timer-wrapper">
				<div class="time-style" v-for="item in timeList" :key="item.id"
					:class="pickerTime == item.id ? 'active-time' : ''" @click="quickTime(item.id)">
					{{ item.time }}
				</div>
				<div class="header-btn" v-if="text == 'detail'" @click="getExcelUrl"
					v-hasPermi="['app:dbj:index:export']">
					想要导出数据
					<van-icon name="question-o" size="16" class="icon" />
				</div>
			</div>
			<!-- 时间 -->
			<div class="cond-item-content" @click="showDate = !showDate">
				<div class="left-wrapper">时间</div>
				<div class="right-wrapper">
					<div class="time-section" :class="text == 'history' ? 'On-right' : ''">
						{{ date }}
					</div>
					<van-icon name="arrow" size="18" color="#c6c6c6" />
				</div>
			</div>
			<!-- 场地 -->
			<div class="cond-item-content" v-if="text == 'history' || text == 'index'">
				<div class="left-wrapper">场地</div>
				<div class="right-wrapper" @click="$refs.placelist.showPlacePopup()">
					<div class="time-section" :class="text == 'history' ? 'On-right' : ''">
						{{ placeName }}
					</div>
					<van-icon name="arrow" size="18" color="#c6c6c6" />
				</div>
			</div>
			<van-calendar v-model="showDate" type="range" allow-same-day @confirm="confirmMethod" :max-range="180"
				range-prompt="只能查询半年的数据" :min-date="minDate" :max-date="maxDate" :round="false" color="#5241FF" />
			<!-- 出币 -->
			<div class="cond-item-content" v-if="text == 'detail' && $parent.activeName == 2">
				<van-dropdown-menu active-color="#5241FF">
					<van-dropdown-item title="出币类型" ref="place">
						<div class="item-wrapper-list">
							<van-cell v-for="(item, index) in coinList" :key="index" :title="item.name"
								:value="payType == item.id ? '✔' : ''" @click="confirmCheck(item.id, 'left')" />
							<on-earth />
						</div>
					</van-dropdown-item>
					<van-dropdown-item title="出币结果" ref="pay">
						<div class="item-wrapper-list">
							<van-cell v-for="(item, index) in resultList" :key="index" :title="item.name"
								:value="payResult == item.id ? '✔' : ''" @click="confirmCheck(item.id, 'rigth')" />
						</div>
					</van-dropdown-item>
				</van-dropdown-menu>
			</div>
			<!-- 导出 -->
			<div class="cond-item-content" v-if="text == 'history'">
				<div class="Bleft-wrapper">
					温馨提示
					<van-icon name="warning-o" size="18" @click="$refs.explain.downExplain = true" />
				</div>
				<div class="right-wrapper" :class="text == 'history' ? 'On-right' : ''"
					v-hasPermi="['app:dbj:index:export']">
					<div class="export" @click="getExcelUrl">导出</div>
				</div>
			</div>
		</div>
		<!-- 导出数据 -->
		<DownData ref="data" />
		<DownEcexl ref="down" />
		<!-- 兑币机场地 -->
		<CustomList ref="placelist" @getPlaceId="getPlaceId" :deviceType="5" />
		<ExplainPage ref="explain" />
	</div>
</template>

<script>
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import DownEcexl from "./downExcel.vue";
	import DownData from "./downData.vue";
	import ExplainPage from "./explainPage.vue";
	import moment from "moment";
	import CustomList from "@/components/shj/customShjList.vue";
	import api from "@/utils/dbjApi";
	export default {
		name: "conditionScreening",
		components: {
			DownEcexl,
			DownData,
			CustomList,
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
				minDate: new Date(
					new Date().getFullYear() - 1,
					new Date().getMonth(),
					new Date().getDate()
				),
				maxDate: new Date(getDateAll(0)),
				/** 开始结束时间 */
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
				/** 搜索 */
				searchValue: null,
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
			/** 快捷时间 */
			quickTime(id) {
				this.pickerTime = id;
				var date = [];
				switch (id) {
					case 0:
						date = [getDateAll(1), getDateAll(1)];
						break;
					case 1:
						date = [getDateAll(2), getDateAll(2)];
						break;
					case 2:
						date = [
							moment().startOf("week").add(1, "days").format("YYYY-MM-DD"),
							moment().endOf("week").add(1, "days").format("YYYY-MM-DD"),
						];
						break;
					case 3:
						date = [
							moment().startOf("month").format("YYYY-MM-DD"),
							moment().startOf("day").format("YYYY-MM-DD"),
						];
						break;
					case 4:
						date = [getDateAll(0), getDateAll(0)];
						break;
					default:
						date = [getDateAll(0), getDateAll(0)];
						break;
				}
				this.startTime = date[0];
				this.endTime = date[1];
				this.date = date[0] + " 至 " + date[1];
				this.get();
			},
			/** 选择日期 */
			formatDate(date) {
				return `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
			},
			/** 确定日期 */
			confirmMethod(date) {
				const [start, end] = date;
				this.showDate = false;
				this.pickerTime = -1;
				this.date = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
				this.startTime = this.formatDate(start);
				this.endTime = this.formatDate(end);
				this.get();
			},
			/** 兑币机场地 */
			getPlaceId(place) {
				this.placeName = place[1].length ?
					"已选(" + place[1].length + ")个场地" :
					"全部场地";

				this.placeId = place[1].length ? place[1] : [];
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
				let data;
				if (this.text == "index") {
					data = {
						startTime: `${this.startTime} 00:00:00`,
						endTime: `${this.endTime} 23:59:59`,
						placeId: this.placeId,
						search: this.searchValue,
					};
				} else if (this.text == "detail") {
					//result 出币结果 exchangeType 取币类型
					if (this.$parent.activeName == 1) {
						data = {
							startTime: `${this.startTime} 00:00:00`,
							endTime: `${this.endTime} 23:59:59`,
						};
					} else {
						data = {
							startTime: `${this.startTime} 00:00:00`,
							endTime: `${this.endTime} 23:59:59`,
							result: this.payResult,
							exchangeType: this.payType,
						};
					}
				} else if (this.text == "history") {
					data = {
						startTime: `${this.startTime}`,
						endTime: `${this.endTime}`,
						placeIds: this.placeId.length ? String(this.placeId) : null,
					};
				}

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
				this.loading();
				let res = await api.createDownloadFilesUrl(params);
				this.clearing();
				if (res.data.code == 0) {
					if (this.text == "history") {
						this.historyUrl = res.data.data;
						this.$refs.data.downloadData = true;
					} else {
						this.indexUrl = res.data.data;
						this.$refs.down.downloadEcexl = true;
					}
				}
			},
		},
	};
</script>

<style lang="less" scoped>
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

	::v-deep .van-dropdown-menu {
		flex: 1;

		.van-dropdown-menu__bar {
			height: 32px;
			box-shadow: 0 0 0 rgba(100, 101, 102, 0);
		}
	}

	::v-deep .van-cell__value {
		color: #5241ff;
	}
</style>