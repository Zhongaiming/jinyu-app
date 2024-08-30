<template>
	<view>
		<view class="xls-order-header">
			<view class="top_icon_mU5j7" @click="goTo('Back')">
				<u-icon name="arrow-left" color="#303133" :size="40"></u-icon>
			</view>
			<view class="top_inputWrap_T3_cr">
				<xls-dropdown-menu ref="searchDropdown" class="dropdown-style" @toggleItem="clickSearchDropdown">
					<xls-dropdown-item name="1-1" :title="searchTitle">
						<view class="xls-select-dropdown">
							<view class="select-list_item_lgfdT" v-for="item,index in options" :key="index"
								@click.stop="clickCell(item)">
								<view class="title" :style="[{color:mValue===item.id?'#5241ff':''}]">
									<text>{{item.text}}</text>
								</view>
								<view class="value" v-if="mValue===item.id">
									<u-icon name="checkbox-mark" color="#5241ff" size="44"></u-icon>
								</view>
							</view>
						</view>
					</xls-dropdown-item>
				</xls-dropdown-menu>
				<view class="top_inputLine__InQS"></view>
				<u-search searchIconSize="44" :actionStyle="{color:'#5241ff'}" :placeholder="`输入${searchTitle}`"
					v-model="keyword" @search="confirmSearch" :showAction="false" :clearabled="false"></u-search>
			</view>
			<view class="top_icon_mU5j7" @click="goTo('Tab')">
				<u-icon name="home" color="#303133" :size="40"></u-icon>
			</view>
		</view>
		<xls-dropdown-menu class="xls-dropdown-menu-wrapper" ref="dropdown" zIndex="9">
			<xls-dropdown-item name="1" :title="timeTitle">
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
						<view class="reset-or-confirm" @click="resetParams('time')">重置</view>
						<view class="reset-or-confirm confirm" @click="getParams('time')">确定</view>
					</view>
				</view>
			</xls-dropdown-item>
			<xls-dropdown-item name="2" title="交易类型" :Badge="screen.payType&&true">
				<view>
					<view class="index_pullDownPad_vynxu">
						<view class="tabs_warp_VABLU">
							<view class="tabs_item_OrJCs" @click="clickPayScreen(item.id, 'payType')"
								:class="{'tabs_activated_AkZUz': payType.includes(item.id)}" v-for="item in payTypeList"
								:key="item.id">
								{{item.text}}
							</view>
						</view>
					</view>

					<view class="reset-or-confirm_wrap">
						<view class="reset-or-confirm" @click="resetParams('payType')">重置</view>
						<view class="reset-or-confirm confirm" @click="getParams('payType')">确定</view>
					</view>
				</view>
			</xls-dropdown-item>
			<xls-dropdown-item name="3" title="场地信息"  :Badge="screen.placeId&&true">
				<view>
					<view class="place-wrapper-style">
						<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>

						<view class="place-content-style" v-if="placeList.length">
							<view class="place-item-style">
								<view class="text-name all-check">全选</view>
								<view class="radio-style" @click="checkAllPlace">
									<u-icon name="checkmark-circle-fill" size="46" color="#5241FF" v-if="allCheck" />
									<u-icon name="checkmark-circle" size="46" color="#CECFD2" v-else />
								</view>
							</view>
							<view class="place-item-style" v-for="(place, index) in placeList" :key="index"
								v-show="searchShow(place)">
								<view class="text-name">
									<span class="serial-number">{{ index + 1 }}_</span>
									<span>{{ place.placeName }}</span>
								</view>
								<view class="radio-style" @click="checkPlaceItem(place.placeId)">
									<u-icon name="checkmark-circle-fill" size="46" color="#5241FF"
										v-if="checkboxGroup.includes(place.placeId)" />
									<u-icon name="checkmark-circle" size="46" color="#CECFD2" v-else />
								</view>
							</view>
							<xls-bottom></xls-bottom>
						</view>
						<xls-empty v-else></xls-empty>
					</view>

					<view class="reset-or-confirm_wrap">
						<view class="reset-or-confirm" @click="resetParams('place')">重置</view>
						<view class="reset-or-confirm confirm" @click="getParams('place')">
							确定（{{ checkboxGroup.length }}个）</view>
					</view>
				</view>
			</xls-dropdown-item>
			<xls-dropdown-item name="4" title="更多筛选" :Badge="(screen.deviceType&&true)||(screen.state&&true)">
				<view>
					<view class="index_pullDownPad_vynxu">
						<view class="more-item_header_Y38BZ">
							交易状态
						</view>
						<view class="tabs_warp_VABLU">
							<view class="tabs_item_OrJCs" @click="clickPayScreen(item.id, 'payState')"
								:class="{'tabs_activated_AkZUz': payState.includes(item.id)}"
								v-for="item in payStateList" :key="item.id">
								{{item.text}}
							</view>
						</view>
						<!-- <view class="more-item_header_Y38BZ">
							支付方式
						</view> -->
						<view class="more-item_header_Y38BZ more-device-type_Y38BZ" @click="openDeviceType">
							<view class="more-item_title_zKTZt">设备类型</view>
							<view class="more-item_right_cvZRu">
								<view>{{ deviceTypeText }}</view>
								<view class="more-item_rightIcon_ERKAO">
									<u-icon name="arrow-right" size="32" color="#999"></u-icon>
								</view>
							</view>
						</view>
					</view>

					<view class="reset-or-confirm_wrap">
						<view class="reset-or-confirm" @click="resetParams('payState')">重置</view>
						<view class="reset-or-confirm confirm" @click="getParams('payState')">确定</view>
					</view>
				</view>
			</xls-dropdown-item>
		</xls-dropdown-menu>
		<xls-device-type-checkbox ref="deviceType" @getDeviceType="getDeviceType"></xls-device-type-checkbox>
		<!-- calendar -->
		<xls-calendar :show="pickerTime" @close="() => { pickerTime = false }" @confirm="getCalender"></xls-calendar>
	</view>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";
	export default {
		props: {
			screen: {
				type: Object,
				default: ()=>{}
			}
		},
		data() {
			return {
				// 搜索
				keyword: "",
				mValue: 3,
				searchTitle: "平台单号",
				options: [{
						id: 1,
						text: '设备编号'
					},
					{
						id: 2,
						text: '用户ID'
					},
					{
						id: 3,
						text: '平台单号'
					},
					{
						id: 4,
						text: '商户单号'
					},
					{
						id: 5,
						text: '交易单号'
					},
				],
				//===
				timeActive: 1,
				timeTitle: "今天",
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
				payTypeList: [{
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
				// 更多筛选
				// 交易状态
				payState: [],
				payStateList: [{
						id: "",
						text: "全部"
					},
					{
						id: 1,
						text: "已支付"
					},
					{
						id: 2,
						text: "退款中"
					},
					{
						id: 3,
						text: "退款成功"
					},
					{
						id: 4,
						text: "退款失败"
					},
					{
						id: 6,
						text: "已关闭"
					},
				],
				// 支付方式
				// 设备类型
				deviceTypeText: "选择设备类型",
				deviceTypeCheckList: [],
				// 场地
				searchValue: "",
				placeList: [],
				checkboxGroup: [],
				allCheck: false,
				params: {
					memberNumber: "",
					transactionId: "",
					deviceNumber: "",
					placeId: "",
					deviceType: "",
					state: "",
					startTime: "",
					endTime: "",
					phone: "",
				},
			}
		},
		mounted() {
			this.getPlace();
			this.clickTime(1);
		},
		methods: {
			goTo(route) {
				this[`$go${route}`]();
			},
			clickSearchDropdown() {
				this.$refs.dropdown.close();
			},
			clickCell(item) {
				this.mValue = item.id;
				this.searchTitle = item.text;
				this.$refs.searchDropdown.close();
			},
			confirmSearch() {
				this.params.deviceNumber = '';
				this.params.memberNumber = '';
				this.params.transactionId = '';
				switch (this.mValue) {
					case 1:
						this.params.deviceNumber = this.keyword;
						break;
					case 2:
						this.params.memberNumber = this.keyword;
						break;
					default:
						this.params.transactionId = this.keyword;
				}
				this.getParams('search')
			},
			//选择日期
			getCalender(date) {
				const [startTime, endTime] = date;
				this.pickerTime = false;
				this.params.startTime = startTime;
				this.params.endTime = endTime;
				this.watch.startTime = startTime;
				this.watch.endTime = endTime;
				this.timeActive = null;
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
				this.params.endTime = selectedId==2?this.formatDate(startDate):this.formatDate(endDate);
				this.watch.startTime = "";
				this.watch.endTime = "";
			},
			foucusInput() {
				uni.hideKeyboard();
			},
			// 交易类型 + pay screen
			clickPayScreen(id, type) {
				if (id === "") {
					if (this[type].length === this[`${type}List`].length) {
						this[type] = [];
					} else {
						this[type] = this[`${type}List`].map(item => item.id)
					}
					return
				}
				if (this[type].includes(id)) {
					this[type] = this[type].filter(item => item != id)
				} else {
					this[type].push(id);
					if (this[type].length === this[`${type}List`].length - 1) {
						this[type].push("");
					}
				}
			},
			// 设备类型
			openDeviceType() {
				this.$refs.deviceType.showDviceType(this.deviceTypeCheckList);
			},
			getDeviceType(params) {
				const {
					deviceTypeText,
					deviceTypeCheckList
				} = params;
				this.deviceTypeText = deviceTypeText;
				this.deviceTypeCheckList = deviceTypeCheckList;
			},
			// 场地
			async getPlace() {
				let res = await placeController.getPlaceDeviceList();
				if (res.code == 200) {
					this.placeList = res.data;
				}
			},
			//搜索
			stratesSearch(search) {
				this.searchValue = search;
			},
			searchShow(place) {
				return !this.searchValue || (place.placeName.indexOf(this.searchValue) > -1 || place.placeNumber.indexOf(
					this.searchValue) > -1)
			},
			//全选、全不选
			checkAllPlace() {
				this.allCheck = !this.allCheck;
				this.checkboxGroup = [];
				if (this.allCheck) {
					this.checkboxGroup = this.placeList.map(item => item.placeId);
				}
			},
			//单项反选
			checkPlaceItem(placeId) {
				if (this.checkboxGroup.includes(placeId)) {
					this.checkboxGroup.splice(this.checkboxGroup.indexOf(placeId), 1);
				} else {
					this.checkboxGroup.push(placeId);
				}
				this.allCheck = this.checkboxGroup.length == this.placeList.length;
			},
			// 汇总参数
			resetParams(params) {
				const actions = {
					'time': () => this.clickTime(1),
					'payType': () => this[params] = [],
					'place': () => {
						this.checkboxGroup = [];
						this.allCheck = false;
					},
					'payState': () => {
						this[params] = [];
						this.deviceTypeText = "选择设备类型";
						this.deviceTypeCheckList = [];
					}
				};

				if (actions[params]) {
					actions[params]();
				}
			},
			getParams(type) {
				if (type === 'time') {
					this.timeTitle = this.timeActive ?
						this.timeList[this.timeActive - 1].text :
						`${this.params.startTime} 至 ${this.params.endTime}`;
				}

				const filterNonEmpty = arr => arr.filter(value => value != null && value !== '');

				const params = {
					startTime: this.params.startTime,
					endTime: this.params.endTime,
					...(filterNonEmpty(this.payState).length && {
						state: String(filterNonEmpty(this.payState))
					}),
					...(filterNonEmpty(this.payType).length && {
						payType: String(filterNonEmpty(this.payType))
					}),
					...(this.checkboxGroup.length && {
						placeId: String(this.checkboxGroup)
					}),
					...(this.deviceTypeCheckList.length && {
						deviceType: String(this.deviceTypeCheckList)
					}),
					...(this.params.deviceNumber && {
						deviceNumber: this.params.deviceNumber
					}),
					...(this.params.memberNumber && {
						memberNumber: this.params.memberNumber
					}),
					...(this.params.transactionId && {
						transactionId: this.params.transactionId
					})
				};
				this.$refs.dropdown.close();
				this.$emit("getCondition", params);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';

	.xls-order-header {
		padding: 0 3.2vw;
		height: 11.73333vw;
		@include center-flex();

		.top_icon_mU5j7 {
			color: #242424;
			margin: -2.66667vw;
			padding: 2.66667vw;
		}

		.top_inputWrap_T3_cr {
			flex: 1;
			padding: 0 3.2vw;
			box-sizing: border-box;
			background: #f0f0f0;
			border-radius: 4.26667vw;
			color: rgba(0, 0, 0, .65);
			display: flex;
			align-items: center;
			font-size: 3.46667vw;
			font-weight: 400;
			height: 7.46667vw;
			// line-height: 7.46667vw;
			margin-left: 4.26667vw;
			margin-right: 4.26667vw;
			overflow: hidden;

			.dropdown-style {
				width: 120rpx;
			}

			.top_inputLine__InQS {
				background: #d9d9d9;
				height: 4.26667vw;
				margin-left: 3.2vw;
				width: 1px;
			}
		}
	}

	.xls-select-dropdown {
		position: relative;
		z-index: 9999;
		background-color: #fff;
		padding-left: 4.26667vw;
		padding-right: 4vw;

		.select-list_item_lgfdT {
			align-items: center;
			display: flex;
			height: 12.8vw;
			justify-content: space-between;
			overflow: hidden;
			position: relative;
		}
	}


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

		.more-device-type_Y38BZ {
			margin-top: 3.2vw;
			align-items: center;
			display: flex;
			justify-content: space-between;

			.more-item_title_zKTZt {
				color: rgba(0, 0, 0, .85);
				font-size: 3.46667vw;
				font-weight: 500;
				line-height: 4.8vw;
			}

			.more-item_right_cvZRu {
				align-items: center;
				color: rgba(0, 0, 0, .45);
				display: flex;
				font-size: 3.46667vw;
				font-weight: 400;
				line-height: 4.8vw;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}

			.more-item_rightIcon_ERKAO {
				margin-left: .53333vw;
				overflow: hidden;
				transform-origin: 50%;
			}
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