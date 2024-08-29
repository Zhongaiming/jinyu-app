<template>
	<view>
		<xls-dropdown-menu class="xls-dropdown-menu-wrapper">
			<xls-dropdown-item name="1" title="今天">
				<view>
					<view class="index_pullDownPad_vynxu">
						<view class="tabs_warp_VABLU">
							<view class="tabs_item_OrJCs" @click="clickTime(item.id)"
								:class="{'tabs_activated_AkZUz': timeActive==item.id}" v-for="item in timeList"
								:key="item.id">
								{{item.text}}
							</view>
						</view>
						<view class="input-range_wrap_MZEPB" @click="pickerTime = true">
							<view class="input-range_box_MeIbz">
								<input type="text" v-model="watch.startTime" @focus="foucusInput" placeholder="自定义起始日期"
									inputmode="text" class="input-range_input_7Rvtz">
							</view>
							<view class="input-range_interval_Lczk_"></view>
							<view class="input-range_box_MeIbz">
								<input type="text" v-model="watch.endTime" @focus="foucusInput" placeholder="自定义截止日期"
									inputmode="text" class="input-range_input_7Rvtz">
							</view>
						</view>
					</view>

					<view class="reset-or-confirm_wrap">
						<view class="reset-or-confirm">重置</view>
						<view class="reset-or-confirm confirm">确定</view>
					</view>
				</view>
			</xls-dropdown-item>
			<xls-dropdown-item name="2" title="交易类型">
				<view>
					<view class="index_pullDownPad_vynxu">
						<view class="tabs_warp_VABLU">
							<view class="tabs_item_OrJCs" @click="clickPayType(item.id)"
								:class="{'tabs_activated_AkZUz': payType.includes(item.id)}" v-for="item in payTypeList"
								:key="item.id">
								{{item.text}}
							</view>
						</view>
					</view>

					<view class="reset-or-confirm_wrap">
						<view class="reset-or-confirm">重置</view>
						<view class="reset-or-confirm confirm">确定</view>
					</view>
				</view>
			</xls-dropdown-item>
			<xls-dropdown-item name="3" title="场地信息">

			</xls-dropdown-item>
			<xls-dropdown-item name="4" title="更多筛选">
				<view>
					<view class="index_pullDownPad_vynxu">
						<view class="more-item_header_Y38BZ">
							交易状态
						</view>
						<view class="tabs_warp_VABLU">
							<view class="tabs_item_OrJCs" @click="clickPayType(item.id)"
								:class="{'tabs_activated_AkZUz': payType.includes(item.id)}" v-for="item in payTypeList"
								:key="item.id">
								{{item.text}}
							</view>
						</view>
					</view>

					<view class="reset-or-confirm_wrap">
						<view class="reset-or-confirm">重置</view>
						<view class="reset-or-confirm confirm">确定</view>
					</view>
				</view>
			</xls-dropdown-item>
		</xls-dropdown-menu>
		<!-- calendar -->
		<xls-calendar :show="pickerTime" @close="() => { pickerTime = false }" @confirm="getCalender"></xls-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeActive: 1,
				timeList: [{
						id: 1,
						text: '今天'
					},
					{
						id: 2,
						text: '昨天'
					},
					{
						id: 3,
						text: '近3天内'
					},
					{
						id: 4,
						text: '近7天内'
					},
					{
						id: 5,
						text: '近1个月内'
					},
				],
				pickerTime: false,
				watch: {
					startTime: "",
					endTime: "",
				},
				// 交易类型
				payType: [],
				payTypeList: [
					{
						id: "",
						text: "全部"
					},
					{
						id: 1,
						text: "充值余币"
					},
					{
						id: 2,
						text: "设备启动"
					},
					{
						id: 3,
						text: "余币购买"
					},
					{
						id: 4,
						text: "余额购买"
					},
					{
						id: 5,
						text: "充值余额"
					},
				],
				// 交易状态
				
				// 更多筛选
				params: {
					// memberNumber: "",
					phone: "",
					// transactionId: "",
					deviceNumber: "",
					placeId: "",
					deviceType: "",
					state: "",
					startTime: "",
					endTime: "",
				},
			}
		},
		methods: {
			//选择日期
			getCalender(date) {
				const [startTime, endTime] = date;
				this.pickerTime = false;
				this.params.startTime = startTime;
				this.params.endTime = endTime;
				this.watch.startTime = startTime;
				this.watch.endTime = endTime;
				this.timeActive = null;
				this.getParams();
			},
			formatDate(date) {
				const year = date.getFullYear();
				const month = ('0' + (date.getMonth() + 1)).slice(-2);
				const day = ('0' + date.getDate()).slice(-2);
				return `${year}-${month}-${day}`;
			},
			clickTime(selectedId) {
				this.timeActive = selectedId;
				const now = new Date();
				let startDate;
				switch (selectedId) {
					case 1: // 今天
						startDate = new Date(now.setHours(0, 0, 0, 0));
						break;
					case 2: // 昨天
						startDate = new Date(now.setDate(now.getDate() - 1));
						startDate.setHours(0, 0, 0, 0);
						break;
					case 3: // 近3天内
						startDate = new Date(now.setDate(now.getDate() - 3));
						startDate.setHours(0, 0, 0, 0);
						break;
					case 4: // 近7天内
						startDate = new Date(now.setDate(now.getDate() - 7));
						startDate.setHours(0, 0, 0, 0);
						break;
					case 5: // 近1个月内
						startDate = new Date(now.setMonth(now.getMonth() - 1));
						startDate.setDate(1);
						startDate.setHours(0, 0, 0, 0);
						break;
					default:
						startDate = now;
				}
				const endDate = new Date();
				this.params.startTime = this.formatDate(startDate);
				this.params.endTime = this.formatDate(endDate);
				this.watch.startTime = "";
				this.watch.endTime = "";
				this.getParams();
				console.log(`从 ${this.formatDate(startDate)} 到 ${this.formatDate(endDate)}`)
			},
			foucusInput() {
				uni.hideKeyboard();
			},
			// 交易类型
			clickPayType(id) {
				if(id === "") {
					this.payType = this.payTypeList.map(item => item.id)
					console.log("??", String(this.payType))
					return
				}
				if (this.payType.includes(id)) {
					this.payType = this.payType.filter(item => item != id)
				} else {
					this.payType.push(id);
				}
			},
			getParams() {
				// 去除无效值
				// const filteredArray = array.filter(value => value !== null && value !== undefined && value !== '');
				this.$emit("getCondition", this.params);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-dropdown-menu-wrapper {
		width: 100%;
		padding: 0 24rpx;
	}

	.index_pullDownPad_vynxu {
		padding: 3.2vw 0 5.33333vw;
		padding-left: 4.26667vw;
		padding-right: 4vw;

		.tabs_warp_VABLU {
			display: flex;
			flex-wrap: wrap;
			margin-left: -2.13333vw;
			margin-top: -2.13333vw;
		}

		.tabs_item_OrJCs {
			background: #f3f4f5;
			border-radius: 2.13333vw;
			color: rgba(0, 0, 0, .65);
			font-size: 3.2vw;
			line-height: 8.53333vw;
			margin-left: 2.13333vw;
			margin-top: 2.13333vw;
			overflow: hidden;
			padding: 0 1.06667vw;
			text-align: center;
			text-overflow: ellipsis;
			vertical-align: baseline;
			white-space: nowrap;
			width: 21.33333vw;
		}

		.tabs_activated_AkZUz {
			background: #e1e3ff;
			color: #5241ff;
			font-weight: 500;
		}

		.more-item_header_Y38BZ {
			align-items: center;
			display: flex;
			padding: 3.2vw 0;
			position: relative;
			color: rgba(0, 0, 0, .85);
			font-size: 3.46667vw;
			font-weight: 500;
		}
	}

	.input-range_wrap_MZEPB {
		margin-top: 3.2vw;
		align-items: center;
		display: flex;

		.input-range_box_MeIbz {
			flex: 1;
			overflow: hidden;
			position: relative;
			line-height: 100rpx;
			height: 100rpx;

			.input-range_input_7Rvtz {
				background: transparent;
				color: #000;
				font-size: 2.03333vw;
				height: 13.06667vw;
				width: 100%;
				font: inherit;
			}
		}

		.input-range_interval_Lczk_ {
			background: #bfbfbf;
			height: .53333vw;
			margin: 0 4.26667vw;
			width: 2.13333vw;
		}
	}





	.reset-or-confirm_wrap {
		box-shadow: 0 -.8vw 1.6vw 0 rgba(0, 0, 0, .04);
		display: flex;
		padding: 2.13333vw 4.26667vw;

		.reset-or-confirm {
			align-items: center;
			border: 1rpx solid #5241ff;
			border-radius: 2.13333vw;
			color: #5241ff;
			display: flex;
			flex: 1;
			font-size: 4.26667vw;
			font-weight: 600;
			height: 11.73333vw;
			justify-content: center;
		}

		.confirm {
			background-color: #5241ff;
			color: #fff;
			margin-left: 2.13333vw;
		}
	}
</style>