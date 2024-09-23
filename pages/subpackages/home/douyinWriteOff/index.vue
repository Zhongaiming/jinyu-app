<template>
	<view class="douyin-wrapper">
		<xls-jy-navbar title="抖音核销"></xls-jy-navbar>
		<!-- 顶部导航 -->
		<xls-tabs :options="tabList" v-model="tabIndex"></xls-tabs>
		<button @click="hexiao()">核销</button>
		<!-- 门店管理 -->
		<view v-show="tabIndex == 1">
			<xls-search @confirm="stratesSearch" placeholder="搜索抖音门店名称" marLeft="-6.0em"></xls-search>
			<view class="store-wrapper">
				<xls-dropdown-menu active-color="#5241FF" style="flex: 1" ref="dropdown">
					<xls-dropdown-item title="抖音商户" name="1">
						<view class="consume-wrapper">
							<view class="cell-container">
								<u-checkbox-group v-model="storeCheckGroup" placement="column">
									<view class="cell-item" v-for="(item, index) in MerchantList" :key="index">
										<view class="cell-title">
											<span>{{ item.accountName }}</span>
										</view>
										<u-checkbox activeColor="#5241FF" :name="item.id" shape="circle" iconSize="32"
											labelSize="36" size="38">
										</u-checkbox>
									</view>
									<xls-bottom v-show="MerchantList.length" />
									<xls-empty v-show="!MerchantList.length" />
								</u-checkbox-group>
							</view>

							<view class="btn-content">
								<u-checkbox-group v-model="allCheckStore">
									<u-checkbox name="1" activeColor="#5241FF" shape="circle" iconSize="32"
										labelSize="36" size="38">
										<span>全部 ({{ storeCheckGroup.length }} /
											{{ MerchantList.length }})</span>
									</u-checkbox>
								</u-checkbox-group>
								<view class="btn" @click="reset('allCheckStore')">
									重置
								</view>
								<view class="btn comfrim" @click="confirmBtn()">确定</view>
							</view>
						</view>
					</xls-dropdown-item>
				</xls-dropdown-menu>

				<view class="right-wrapper">
					<view @click="storePopup = true">关联门店</view>
					<view class="marginl20" @click="goTo('meal', {})">新建团购套餐</view>
				</view>
			</view>

			<!-- 门店管理 -->
			<view class="store-list-wrapper">
				<view class="store-style" v-for="item in storeList" :key="item.id" @click="goTo('mealDetail', item)">
					<view class="name">{{ item.poiName }}</view>
					<view class="address">
						<span class="state" v-if="item.status == 0">停用</span>
						<span class="state bad" v-else>正常</span>
						<span>{{ item.address }}</span>
					</view>
					<view class="item">
						<span class="key">所属商户:</span><span class="value">{{ item.accountName }}</span>
					</view>
					<view class="item">
						<span class="key">门店手机:</span><span class="value">{{ item.contactPhone }}</span>
					</view>
					<view class="item">
						<span class="key">关联时间:</span><span class="value">{{ item.createTime }}</span>
					</view>
					<view class="type">门店套餐</view>
				</view>

			</view>
			<xls-bottom v-show="storeList.length" />
			<xls-empty v-show="!storeList.length"></xls-empty>
		</view>

		<!-- 核销统计 -->
		<view v-show="tabIndex != 1">
			<view class="btnList">
				<view class="btn" v-for="item in btnList" :key="item.id" :class="{'activeBtn': activeBtn == item.id}"
					@click="onChange(item.id)">
					{{ item.title }}
				</view>
			</view>

			<view class="outSide">
				<view class="data" @click="showDate = !showDate">
					<view><span>时间</span></view>
					<view class="value">
						<span class="date">{{ date }}</span>
						<u-icon name="arrow-right" size="36" color="#a0a0a0" />
					</view>
				</view>
			</view>

			<!-- 日历 -->
			<xls-calendar :show="showDate" @close="() => { showDate = false }" @confirm="onConfirm"
				:defaultDate="[startTime, endTime]">
			</xls-calendar>

			<view class="outSide">
				<view class="data" @click="MerchantPopup = true">
					<view><span>抖音商户</span></view>
					<view class="value">
						<span class="date">{{ Merchant }}</span>
						<u-icon name="arrow-right" size="36" color="#a0a0a0" />
					</view>
				</view>
			</view>

			<view class="outSide" v-show="tabIndex == 3">
				<view class="data" @click="coinPopup = true">
					<view><span>出币结果</span></view>
					<view class="value">
						<span class="date">{{ coinResult }}</span>
						<u-icon name="arrow-right" size="36" color="#a0a0a0" />
					</view>
				</view>
			</view>

			<xls-search @confirm="stratesSearch" placeholder="搜索抖音门店名称、场地名称、设备编号" marLeft="-11.0em"></xls-search>

			<view class="total-wrapper" v-show="tabIndex == 2">
				<view class="title">合计</view>
				<view class="item-wrapper">
					<view class="item">
						<view class="key">订单数量(笔)</view>
						<view class="value">{{ count.total || 0 }}</view>
					</view>
					<view class="item">
						<view class="key">订单金额(元)</view>
						<view class="value">{{ count.originalAmount || 0 }}</view>
					</view>
					<view class="item">
						<view class="key">实付金额(元)</view>
						<view class="value">{{ count.orderAmount || 0 }}</view>
					</view>
					<view class="item item2">
						<view class="key">应出币数(个)</view>
						<!-- 实出/{{ count.realityTokens || 0 }}/ -->
						<view class="value">
							{{ count.shouldToken || 0 }}
						</view>
					</view>
				</view>
			</view>

			<!-- 核销记录 -->
			<view v-show="tabIndex == 3">
				<view class="total-record-wrapper" v-for="item in count.list" :key="item.id">
					<view class="title">{{ item.typeName }}{{ item.deviceNumber }}</view>
					<view class="time">{{ item.createTime }}</view>
					<view class="place">
						<span class="state bad" v-if="item.status == 0">成功</span>
						<span class="state load" v-else-if="item.status == 1">支付中</span>
						<span class="state" v-else-if="item.status == 2">失败</span>
						<span class="state" v-else-if="item.status == 3">退款</span>
						{{ item.placeName }}
					</view>

					<view class="block-row-box">
						<view class="block-row">
							<view class="block-cell">
								<view class="cell-top">应付金额</view>
								<view class="cell-bottom">{{ item.originalAmount }}</view>
							</view>
							<view class="block-cell">
								<view class="cell-top">实付金额</view>
								<view class="cell-bottom">{{ item.amountTotal }}</view>
							</view>
							<view class="block-cell">
								<view class="cell-top">应出币数</view>
								<view class="cell-bottom">{{ item.shouldTokens }}</view>
							</view>
							<view class="block-cell">
								<view class="cell-top">实出币数</view>
								<view class="cell-bottom">{{ item.realityTokens }}</view>
							</view>
						</view>

						<view class="block-row">
							<view class="block-cell">
								<view class="cell-top">会员编号</view>
								<view class="cell-bottom">{{ item.originalAmount }}</view>
							</view>
							<view class="block-cell">
								<view class="cell-top">会员昵称</view>
								<view class="cell-bottom">{{ item.amountTotal }}</view>
							</view>
						</view>
					</view>
				</view>
				<xls-bottom v-show="count.list.length" />
			</view>

			<xls-empty v-show="!count.list.length"></xls-empty>
			
		</view>
		<!-- 关联门店 -->
		<u-popup :show="storePopup" mode="bottom" round="20" @close="storePopup = false">
			<view class="field-hd">
				<view class="cross field">
					<u-icon name="close" @click="storePopup = false" size="40" />
				</view>
				<view class="title field">关联门店</view>
				<view class="btn-confirm field" @click="addDYStore">确定</view>
			</view>
			<u-cell-group>
				<u-cell title="关联类型">
					<template #right-icon>
						<u-button type="primary" size="small" color="#5241ff">集合号</u-button>
					</template>
				</u-cell>

				<u-cell title="门店编号">
					<template #right-icon>
						<input type="text" v-model="poiId" placeholder="请输入" class="input-style" />
					</template>
				</u-cell>
			</u-cell-group>
			<view class="tips-text">
				<!-- 门店编号请联系平台运营/客服获取
				<span>集合号操作指引</span> -->
			</view>
		</u-popup>
		<!-- 出币结果 -->
		<u-popup :show="coinPopup" mode="bottom" round="20" @close="coinPopup = false">
			<view class="field-hd">
				<view class="title field">出币结果</view>
			</view>
			<u-radio-group v-model="params.status">
				<u-cell-group>
					<u-cell v-for="(item, index) in coinList" :key="index" :title="item.text" clickable
						@click="radio = item.id">
						<template #right-icon>
							<u-radio :name="item.id" activeColor="#5241FF" iconSize="32" labelSize="36" size="38" />
						</template>
					</u-cell>
				</u-cell-group>
			</u-radio-group>
			<view class="btn-wrapper">
				<view class="button" @click="params.status = null">重置</view>
				<view class="button comfrim" @click="coinMethod">确定</view>
			</view>
		</u-popup>
		<!-- 抖音商户 -->
		<u-popup :show="MerchantPopup" mode="bottom" round="20" @close="MerchantPopup = false">
			<view class="merchat-popup-wrapper">
				<view class="title">抖音商户</view>
				<view class="consume-wrapper">
					<view class="cell-container">
						<u-checkbox-group v-model="storeCheckCountGroup" placement="column">
							<view class="cell-item" v-for="(item, index) in MerchantList" :key="index">
								<view class="cell-title">
									<span>{{ item.accountName }}</span>
								</view>
								<u-checkbox activeColor="#5241FF" :name="item.id" shape="circle" iconSize="32"
									labelSize="36" size="38">
								</u-checkbox>
							</view>
							<xls-bottom v-show="MerchantList.length" />
							<xls-empty v-show="!MerchantList.length" />
						</u-checkbox-group>
					</view>

					<view class="btn-content">
						<u-checkbox-group v-model="allCheckCount">
							<u-checkbox name="1" activeColor="#5241FF" shape="circle" iconSize="32" labelSize="36"
								size="38">
							</u-checkbox>
						</u-checkbox-group>
						全部 ({{ storeCheckCountGroup.length }} /
						{{ MerchantList.length }})
						<view class="btn" @click="reset('allCheckCount')">
							重置
						</view>
						<view class="btn comfrim" @click="confirmBtn()">确定</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getTime,
		getDateAll
	} from "@/plugins/utilityClass";
	import moment from "moment";
	import {
		writeOffController
	} from "@/api/index.js"

	export default {
		data() {
			return {
				// tabs
				tabIndex: 1,
				tabList: [{
						key: 1,
						value: "门店管理"
					},
					{
						key: 2,
						value: "核销统计"
					},
					{
						key: 3,
						value: "核销记录"
					},
				],
				// 门店
				allCheckStore: [],
				storeCheckGroup: [],
				MerchantList: [],
				storeList: [],

				// 统计 记录
				allCheckCount: [],
				storeCheckCountGroup: [],
				storePopup: false,
				MerchantPopup: false,
				// 时间
				date: "",
				showDate: false,
				startTime: getDateAll(0),
				endTime: getDateAll(0),
				// 商户
				activeBtn: 3,
				btnList: [{
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
				defaultDate: [],
				// 出币结果
				coinPopup: false,
				Merchant: "全部",
				coinResult: "全部",
				coinList: [{
						id: null,
						text: "全部"
					},
					{
						id: 1,
						text: "使用中"
					},
					{
						id: 2,
						text: "失败"
					},
					{
						id: 3,
						text: "已退款"
					},
				],
				/**
				 * @description: 门店
				 * @return {*}
				 * @Date: 2024-01-18 17:18:27
				 */
				poiId: "", // 抖音商家id
				searchValue: "",
				params: {
					startTime: "",
					endTime: "",
					status: null, //状态，0：成功，1：支付中，2：失败，3退款
					search: null, //模糊搜索 加密
					shopIds: null, //抖音商户id
				},
				count: {
					list: [],
				},
			};
		},
		onLoad() {
			this.onChange(3);
			this.getDyShopInfo();
			this.getDyAccountInfo();
		},
		methods: {
			// 核销统计、核销记录
			async summaryDouyin() {
				let res = await writeOffController.summaryDouyin(this.params);
				if (res.code == 200) {
					this.count = res.data;
				}
			},
			// 查询所有门店
			async getDyShopInfo() {
				let {
					searchValue,
					storeCheckGroup
				} = this;
				let res = await writeOffController.getDyShopInfo({
					search: searchValue ? encodeURIComponent(searchValue) : null,
					shopIds: storeCheckGroup.length ? String(storeCheckGroup) : null
				});
				if (res.code == 200) {
					this.storeList = res.data;
				}
			},
			// 抖音商户
			async getDyAccountInfo() {
				let res = await writeOffController.getDyAccountInfo({
					search: null
				});
				if (res.code == 200) {
					this.MerchantList = res.data;
				}
			},
			/** 输入搜索 */
			stratesSearch(search) {
				this.searchValue = search ? search : null;
				if (this.tabIndex == 1) {
					this.getDyShopInfo();
				} else {
					this.params.search = this.searchValue ?
						encodeURIComponent(this.searchValue) :
						null;
					this.summaryDouyin();
				}
			},
			// 重置
			reset() {
				this.storeCheckGroup = []
				this.allCheckStore = []

				this.allCheckCount = []
				this.storeCheckCountGroup = []
			},
			confirmBtn() {
				if (this.tabIndex == 1) {
					this.$refs.dropdown.close();
					this.getDyShopInfo();
				} else {
					this.params.shopIds = this.storeCheckCountGroup.length ?
						String(this.storeCheckCountGroup) :
						null;
					this.summaryDouyin();
					this.Merchant = "已选(" + this.storeCheckCountGroup.length + ")个商户";
					this.MerchantPopup = false;
				}
			},
			// 套餐
			goTo(route, item) {
				const params = (({
					poiName,
					id
				}) => ({
					poiName,
					id
				}))(item);
				this.$goTo(`/pages/subpackages/home/douyinWriteOff/children/${route}`, "navigateTo", params)
			},
			//选择日期
			onConfirm(date) {
				const [startTime, endTime] = date;
				this.showDate = false;
				this.startTime = startTime;
				this.endTime = endTime;
				this.activeBtn = null;
				this.date = `${startTime} 至 ${endTime}`;
				this.params = {
					...this.params,
					startTime,
					endTime
				};
				this.summaryDouyin();
			},
			//快捷时间
			onChange(index) {
				this.activeBtn = index;
				let startTime, endTime, date;

				const setDateRange = (start, end) => {
					startTime = start;
					endTime = end;
					this.date = endTime + (index === 0 ? '\u2002昨天' : index === 1 ? '\u2002前天' : '');
					this.defaultDate = [new Date(startTime), new Date(endTime)];
				};

				switch (index) {
					case 0:
						setDateRange(getDateAll(1), getDateAll(1)); // 昨天
						break;
					case 1:
						setDateRange(getDateAll(2), getDateAll(2)); // 前天
						break;
					case 2:
						startTime = getTime(0);
						endTime = getTime(-6);
						this.date = `${startTime} 至 ${endTime}`;
						break;
					case 3:
						startTime = moment().startOf("month").format("YYYY-MM-DD");
						endTime = getDateAll(0);
						this.date = `${startTime} 至 ${endTime}`;
						break;
					default:
						startTime = moment().startOf("month").format("YYYY-MM-DD");
						endTime = getDateAll(0);
						this.date = `${startTime} 至 ${endTime}`;
				}

				// 更新 params
				this.params = {
					...this.params,
					startTime,
					endTime
				};

				this.summaryDouyin();
			},
			// 出币结果
			coinMethod() {
				this.coinPopup = false
				const {
					text
				} = this.coinList.find(item => item.id === this.params.status)
				this.coinResult = text
				this.summaryDouyin()
			},
			// 关联门店
			async addDYStore() {
				const poiId = this.poiId
				if (poiId == "") {
					return this.$toast("请输入门店编号")
				}
				this.$loading();
				let res = await writeOffController.taskSubmit({
					poiId,
					type: 1, // 类型 1是集合号 2是私营
				});
				this.$hideLoading();
				if (res.code == 200) {
					this.storePopup = false
					this.$toast("添加成功~")
					this.poiId = ""
				}
			},
			// 核销
			hexiao() {
				writeOffController.writeOff({
					"deviceNumber": "30003300",
					"memberNumber": "5",
					"placeId": 2376,
					"receiptCode": "123456"
				}).then(res => {
					
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.douyin-wrapper {
		width: 100%;

		.store-wrapper {
			background: #f5f6f7;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 12px;

			.right-wrapper {
				flex: 3;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 12px;
				color: #5241ff;
			}
		}

		.consume-wrapper {
			.cell-container {
				min-height: 200px;

				.cell-item {
					padding: 10px 12px;
					display: flex;
					width: 100%;
					box-sizing: border-box;
					align-items: center;

					.cell-title {
						flex: 1;
						font-size: 15px;
					}
				}
			}

			.btn-content {
				display: flex;
				padding: 6px 12px 8px;
				background: #fff;
				display: flex;
				align-items: center;
				font-size: 15px;

				.btn {
					flex: 1;
					height: 40px;
					border-radius: 6px;
					text-align: center;
					line-height: 40px;
					border: 1px solid #5241ff;
					background: #fff;
					color: #323233;
					font-size: 14px;
					margin-left: 20px;
				}

				.comfrim {
					color: #fff;
					background: #5241ff;
				}
			}
		}

		.store-list-wrapper {
			padding: 12px;

			.store-style {
				padding: 12px;
				background-color: #fff;
				border-radius: 12px;
				margin-bottom: 12px;
				position: relative;


				.name {
					font-size: 16px;
					font-weight: 700;
					margin-bottom: 8px;
				}

				.address {
					font-size: 14px;
					color: #333333;
					margin-bottom: 5px;
				}

				.item {
					display: flex;
					margin-bottom: 5px;

					.key {
						font-size: 12px;
						color: #7e7e7e;
						margin-right: 10px;
					}

					.value {
						font-size: 14px;
					}
				}

				.type {
					border-bottom-left-radius: 7px;
					border-top-right-radius: 7px;
					color: #fff;
					display: inline-block;
					font-size: 12px;
					line-height: 20px;
					padding: 2px 5px;
					position: absolute;
					right: 0;
					text-align: center;
					top: 0;
					background-color: #4d7ae1;
				}
			}
		}

		.field-hd {
			display: flex;
			align-items: center;
			padding: 0 12px;
			line-height: 60px;
			box-sizing: border-box;

			.cross {
				font-size: 24px;
			}

			.field {
				flex: 1;
			}

			.title {
				font-size: 17px;
				text-align: center;
			}

			.btn-confirm {
				font-size: 15px;
				text-align: right;
				color: #5241ff;
			}
		}

		.input-style {
			border: 0;
			text-align: right;
		}

		.tips-text {
			color: #999;
			padding: 0 12px 20px 12px;
			font-size: 14px;

			span {
				color: #5241ff;
			}
		}

		.outSide {
			padding: 0 12px;
			background-color: #fff;

			.data {
				border-bottom: 1px solid #eee;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 16px;
				color: #666;

				.value {
					display: flex;
					align-items: center;
				}

				.date {
					margin-right: 8px;
					color: #5241ff;
					font-size: 15px;
				}
			}
		}

		.btnList {
			height: 50px;
			display: flex;
			align-items: center;
			padding: 0 12px;
			background-color: #fff;

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
			}
		}

		.btn-wrapper {
			display: flex;
			justify-content: space-around;
			padding: 2.13333vw 4.26667vw;
			margin-top: 120px;

			.button {
				flex: 1;
				margin: 0 10px;
				border-radius: 10px;
				line-height: 44px;
				height: 44px;
				text-align: center;
				font-size: 15px;
				border: 1px solid #5241ff;
				color: #5241ff;
				background: #fff;
				position: relative;
			}

			.button:active {
				box-shadow: inset 5px 5px 10px 5px rgba(0, 0, 0, 0.1),
					inset -5px -5px 10px 5px rgba(0, 0, 0, 0.1);
			}

			.comfrim {
				color: #fff;
				background: #5241ff;
			}
		}

		// 商户
		.merchat-popup-wrapper {
			.title {
				font-size: 17px;
				font-weight: 700;
				padding: 20px 16px;
				text-align: center;
				border-bottom: 1px solid #ebedf0;
			}
		}

		// 合计
		.total-wrapper {
			margin: 0 12px;
			padding: 12px;
			background-color: #5241ff;
			border-radius: 12px;
			color: #fff;

			.title {
				font-size: 17px;
				font-weight: 700;
				margin: 12px 0;
			}

			.item-wrapper {
				display: flex;
				align-items: center;

				.item {
					flex: 1;

					.key {
						font-size: 12px;
					}

					.value {
						margin-top: 5px;
						font-size: 16px;
					}
				}

				.item2 {
					flex: 1.5;
				}
			}
		}

		// 核销记录
		.total-record-wrapper {
			margin: 0 12px;
			padding: 12px;
			background-color: #fff;
			border-radius: 12px;
			margin-top: 10px;

			.title {
				font-size: 16px;
				font-weight: 700;
			}

			.time {
				font-size: 12px;
				color: #c0c0c0;
			}

			.place {
				font-size: 12px;
				color: #c0c0c0;
				padding-bottom: 5px;
			}

			.block-row-box::before {
				border-bottom: 1px solid #ebedf0;
				box-sizing: border-box;
				content: " ";
				left: -50%;
				pointer-events: none;
				position: absolute;
				right: -50%;
				top: 0;
				transform: scale(0.5);
			}

			.block-row-box {
				padding-top: 10px;
				position: relative;

				.block-row {
					display: flex;

					.block-cell {
						flex: 1;

						.cell-top {
							color: #81909a;
							font-family: AppleSystemUIFont;
							font-size: 12px;
							line-height: 16px;
							display: flex;
							align-items: center;

							.icon {
								margin-left: 4px;
							}
						}

						.cell-bottom {
							color: #001c2b;
							font-size: 16px;
							font-weight: 700;
							line-height: 17px;
							margin-top: 4px;
						}
					}
				}
			}
		}

		.state {
			padding: 1px 6px;
			font-size: 12px;
			background: #ffeded;
			color: #ff4949;
			display: inline-block;
			border-radius: 20px;
			margin-right: 12px;
		}

		.bad {
			background: #e7faf0;
			color: #13ce66;
		}

		.load {
			color: #e6a23c;
			background: #fdf6ec;
		}
	}

	.marginl20 {
		margin-left: 20px;
	}
</style>