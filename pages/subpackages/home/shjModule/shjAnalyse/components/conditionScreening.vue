<template>
	<view class="condition-screening">
		<view class="content">
			<view class="outSide">
				<view class="btnList">
					<view class="btn" v-for="item in btnList" :key="item.id"
						:class="{'activeBtn': activeBtn == item.id}" @click="onChange(item.id)">
						{{ item.title }}
					</view>
				</view>
			</view>

			<view class="outSide">
				<view class="data" @click="showDate = !showDate">
					<view>
						<span>时间</span>
					</view>
					<view class="right-wrapper">
						<span class="date">{{ date }}</span>
						<u-icon name="arrow-right" size="36" color="#666" />
					</view>
				</view>
			</view>


			<view class="outSide" v-hasPermi="['app:place:index']" @click="$refs.placelist.showPlacePopup(placeId)">
				<view class="data">
					<view>
						<span>场地</span>
					</view>
					<view class="right-wrapper">
						<span class="date">{{ placeNum }}</span>
						<u-icon name="arrow-right" size="36" color="#666" />
					</view>
				</view>
			</view>
		</view>
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId" :deviceType="4"></xls-place-checkbox>
		<xls-calendar :show="showDate" @close="() => { showDate = false }" @confirm="getCalender"
			:defaultDate="[startTime, endTime]">
		</xls-calendar>
	</view>
</template>

<script>
	import {
		getTime,
		getDateAll
	} from "@/plugins/utilityClass"
	import moment from "moment"
	
	export default {
		name: "ConditionScreening",
		data() {
			return {
				//选择日期
				date: "",
				showDate: false,
				startTime: getDateAll(0),
				endTime: getDateAll(0),
				//快捷时间
				activeBtn: -1,
				btnList: [{
						id: -1,
						title: "今天"
					},
					{
						id: 0,
						title: "昨天"
					},
					{
						id: 1,
						title: "前天"
					},
					{
						id: 2,
						title: "本周"
					},
					{
						id: 3,
						title: "本月"
					},
				],
				// 场地
				placeNum: "全部场地",
				placeId: [],
				listType: 1,
			};
		},
		mounted() {
			this.date = this.startTime + "\u2002今天";
		},
		methods: {
			/** 确定日期 */
			getCalender(date) {
				const [startTime, endTime] = date;
				this.showDate = false;
				this.activeBtn = 999;
				this.date = `${startTime} 至 ${endTime}`;
				this.startTime = startTime;
				this.endTime = endTime;
				let info = {
					startTime: this.startTime,
					endTime: this.endTime,
					placeId: this.placeId,
				};
				this.$emit("getEarndata", info);
			},

			/** 快捷时间 */
			onChange(id) {
				const getRange = (startDate, endDate) => [
					moment().startOf(startDate).format("YYYY-MM-DD"),
					moment().endOf(endDate).format("YYYY-MM-DD")
				];

				// 获取今天的日期
				const today = moment().format("YYYY-MM-DD");

				// 处理时间范围
				let date;
				switch (id) {
					case 0: // 昨天
						date = [moment().subtract(1, "days").format("YYYY-MM-DD"), moment().subtract(1, "days").format(
							"YYYY-MM-DD")];
						break;
					case -1: // 自定义范围，默认为今天
						date = [today, today];
						break;
					case 1: // 前天
						date = [moment().subtract(2, "days").format("YYYY-MM-DD"), moment().subtract(2, "days").format(
							"YYYY-MM-DD")];
						break;
					case 2: // 本周
						date = getRange("week", "day");
						break;
					case 3: // 本月
						date = getRange("month", "day");
						break;
					default:
						date = [today, today];
						break;
				}
				this.activeBtn = id
				this.startTime = date[0]
				this.endTime = date[1]
				this.date = `${date[0]} 至 ${date[1]}`
				let info = {
					startTime: this.startTime,
					endTime: this.endTime,
					placeId: this.placeId,
				}
				this.$emit("getEarndata", info)
			},

			//按场地
			getPlaceId(place) {
				this.placeNum = place[1].length ?
					"已选(" + place[1].length + ")个场地" :
					"全部场地";
				this.placeId = place[1].length ? place[1] : [];

				let info = {
					startTime: this.startTime,
					endTime: this.endTime,
					placeId: this.placeId,
				};
				this.$emit("getEarndata", info);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.condition-screening {
		width: 100%;
		background: #fff;
		margin-bottom: 10px;

		.content {
			padding: 0 10px;

			.outSide {
				border-bottom: 1px solid #e5e5e5;

				.right-wrapper {
					display: flex;
					align-items: center;
				}
			}

			.btnList {
				height: 50px;
				display: flex;
				align-items: center;

				.btn {
					height: 30px;
					background: #f5f5f5;
					width: 48px;
					border-radius: 3px;
					font-size: 13px;
					color: #656565;
					text-align: center;
					line-height: 30px;
					margin-right: 15px;
				}

				.activeBtn {
					background-color: #e6e4fe;
					color: #5241ff;
					font-weight: 700;
				}
			}

			.data {
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 16px;
				color: #666;

				.date {
					margin-right: 8px;
					color: #5241ff;
					font-size: 15px;
				}
			}
		}
	}
</style>