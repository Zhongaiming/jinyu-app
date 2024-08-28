<template>
	<view class="condition-wrapper">
		<view class="item-wrapper">
			<view class="btnList">
				<view class="btn" v-for="item in btnList" :key="item.id" :class="{'activeBtn':activeBtn == item.id}"
					@click="onChange(item.id)">
					{{ item.title }}
				</view>
			</view>
		</view>

		<view class="item-wrapper">
			<view class="date-wrapper" @click="pickerTime = !pickerTime">
				<view><span>时间</span></view>
				<view class="date-value">
					<span class="date">{{ params.date }}</span><u-icon name="arrow-right" size="36" color="#666" />
				</view>
			</view>
		</view>
		
		<view class="item-wrapper">
			<view class="date-wrapper" @click="openPopup">
				<view><span>场地</span></view>
				<view class="date-value">
					<span class="date">{{ params.pickerPlace }}</span><u-icon name="arrow-right" size="36" color="#666" />
				</view>
			</view>
		</view>
		
		<!-- place -->
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId" v-if="placeCheck === 'checkbox'"></xls-place-checkbox>
		<xls-place-radio ref="placelist" @getPlaceId="getPlaceId" v-else showAllCheck></xls-place-radio>
		<!-- calendar -->
		<xls-calendar :show="pickerTime" @close="() => { pickerTime = false }" @confirm="getCalender"></xls-calendar>
	</view>
</template>

<script>
	import { getDateAll, getTime } from "@/plugins/utilityClass";
	export default {
		props: {
			placeCheck: {
				type: String,
				default: 'checkbox'
			}
		},
		data() {
			return {
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
				pickerTime: false,
				params: {
					startTime: getDateAll(0),
					endTime: getDateAll(0),
					date: `${getDateAll(0)} 今天`,
					placeIdList: "",
					pickerPlace: "全部场地",
				}
			}
		},
		mounted() {
			this.$emit("getCondition", this.params);
		},
		methods: {
			//选择日期
			getCalender(date) {
				const [startTime, endTime] = date;
				this.pickerTime = false;
				this.params.date = `${startTime} 至 ${endTime}`;
				this.params.startTime = startTime;
				this.params.endTime = endTime;
				this.$emit("getCondition", this.params);
			},
			//快捷时间
			onChange(index) {
				let dateRange;
				let startTime;
				let endTime;
			
				const getDateRange = (daysOffset, label) => {
				  const date = getDateAll(daysOffset);
				  return {
					dateRange: `${date} ${label}`,
					startTime: date,
					endTime: date,
				  };
				};
			
				const getWeekRange = () => {
				  return {
					dateRange: `${getTime(0)} 至 ${getTime(-6)}`,
					startTime: getTime(0),
					endTime: getTime(-6),
				  };
				};
			
				const getMonthRange = () => {
				  const year = new Date().getFullYear();
				  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
				  const start = `${year}-${month}-01`;
				  const end = getDateAll(0);
				  return {
					dateRange: `${start} 至 ${end}`,
					startTime: start,
					endTime: end,
				  };
				};
			
				switch (index) {
				  case -1:
					({ dateRange, startTime, endTime } = getDateRange(0, '今天'));
					break;
				  case 0:
					({ dateRange, startTime, endTime } = getDateRange(1, '昨天'));
					break;
				  case 1:
					({ dateRange, startTime, endTime } = getDateRange(2, '前天'));
					break;
				  case 2:
					({ dateRange, startTime, endTime } = getWeekRange());
					break;
				  case 3:
					({ dateRange, startTime, endTime } = getMonthRange());
					break;
				  default:
					// Handle invalid index or default case if necessary
					break;
				}
				this.activeBtn = index;
				this.params.date = dateRange;
				this.params.startTime = startTime;
				this.params.endTime = endTime;
				this.$emit("getCondition", this.params)
			},
			//选择场地
			openPopup() {
				this.$refs.placelist.showPlacePopup(this.params.placeIdList)
			},
			getPlaceId(place) {
				if(this.placeCheck === 'checkbox') {
					if (place[1].length == 1) {
						this.params.pickerPlace = `${place[0][0]}`;
					} else {
						this.params.pickerPlace = place[1].length ?
							`已选中(${place[1].length})个场地` :
							"全部场地";
					}
					this.params.placeIdList = place[1].length?String(place[1]):"";
				} else {
					this.params.pickerPlace = place.placeName;
					this.params.placeIdList = place.placeId;
				}
				this.$emit("getCondition", this.params)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.condition-wrapper {
		background: #fff;
		padding: 0 20rpx;
	}

	.item-wrapper {
		border-bottom: 1rpx solid #e5e5e5;
	}

	.btnList {
		height: 100rpx;
		display: flex;
		align-items: center;

		.btn {
			height: 60rpx;
			background: #f5f5f5;
			width: 96rpx;
			border-radius: 6rpx;
			font-size: 26rpx;
			color: #656565;
			text-align: center;
			line-height: 60rpx;
			margin-right: 30rpx;
		}

		.activeBtn {
			background-color: #E6E4FE;
			color: #5241FF;
		}
	}

	.date-wrapper {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
		color: #666;

		.date {
			margin-right: 16rpx;
			color: #5241FF;
			font-size: 30rpx;
		}
		
		.date-value {
			 display: flex;
			 align-items: center;
		}
	}
</style>