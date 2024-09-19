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

			<!-- <u-calendar v-model="showDate" type="range" @confirm="onConfirm" :max-range="31" allow-same-day
				range-prompt="单次跨度不超31天" :min-date="minDate" :max-date="maxDate" :round="false" color="#5241FF" /> -->
			<view class="outSide" v-hasPermi="['app:place:index']" @click="$refs.placelist.showPlacePopup()">
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
		<!-- <CustomList ref="placelist" @getPlaceId="getPlaceId" /> -->
	</view>
</template>

<script>
	import {
		getTime,
		getDateAll
	} from "@/plugins/utilityClass";
	// import CustomList from "@/components/shj/customShjList.vue";

	export default {
		name: "ConditionScreening",
		// components: {
		// 	CustomList
		// },
		data() {
			return {
				//选择日期
				date: "",
				showDate: false,
				minDate: new Date(
					new Date().getFullYear() - 1,
					new Date().getMonth(),
					new Date().getDate()
				),
				maxDate: new Date(getDateAll(0)),
				//参数
				startTime: getDateAll(0),
				endTime: getDateAll(0),
				placeNum: "全部场地",
				placeId: [],
				listType: 1,
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
					// { id: 2, title: "本周" },
					{
						id: 3,
						title: "本月"
					},
				],
			};
		},
		created() {
			this.date = this.startTime + "\u2002今天";
		},
		methods: {
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
				this.activeBtn = 999;
				this.startTime = this.formatDate(start);
				this.endTime = this.formatDate(end);
				this.date = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
				let info = {
					startTime: this.startTime,
					endTime: this.endTime,
					placeId: this.placeId,
				};
				this.$emit("getEarndata", info);
			},

			//快捷时间
			onChange(index) {
				this.activeBtn = index;
				if (index == -1) {
					let yesterday = getDateAll(0);
					this.date = yesterday + "\u2002今天";
					this.startTime = yesterday;
					this.endTime = yesterday;
					let info = {
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.placeId,
					};
					this.$emit("getEarndata", info);
				}
				if (index == 0) {
					let yesterday = getDateAll(1);
					this.date = yesterday + "\u2002昨天";
					this.startTime = yesterday;
					this.endTime = yesterday;
					let info = {
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.placeId,
					};
					this.$emit("getEarndata", info);
				}
				if (index == 1) {
					let beforeYesterday = getDateAll(2);
					this.date = beforeYesterday + "\u2002前天";
					this.startTime = beforeYesterday;
					this.endTime = beforeYesterday;
					let info = {
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.placeId,
					};
					this.$emit("getEarndata", info);
				}
				if (index == 2) {
					//本周
					this.date = `${getTime(0)} 至 ${getTime(-6)}`;
					this.startTime = getTime(0);
					this.endTime = getTime(-6);
					let info = {
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.placeId,
					};
					this.$emit("getEarndata", info);
				}
				if (index == 3) {
					//本月
					let monStrat =
						new Date().getFullYear() +
						"-" +
						(new Date().getMonth() + 1 < 10 ?
							"0" + (new Date().getMonth() + 1) :
							new Date().getMonth() + 1) +
						"-" +
						"01";
					this.startTime = monStrat;
					this.endTime = getDateAll(0);
					this.date = monStrat + "至" + this.endTime;
					let info = {
						startTime: this.startTime,
						endTime: this.endTime,
						placeId: this.placeId,
					};
					this.$emit("getEarndata", info);
				}
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

<style lang="less" scoped>
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