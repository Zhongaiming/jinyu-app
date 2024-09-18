<template>
	<view class="dbj-data-wrapper">
		<xls-jy-navbar title="兑币机数据详情" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="header-wrapper">
			<view class="main-title">兑币机 {{ $route.query.deviceNumber }}</view>
			<view class="sub-title">{{ $route.query.placeName }}</view>
		</view>
		<!-- <van-tabs v-model="activeName" color="#5241ff" class="tab-style" @change="changeActiveName">
			<van-tab title="分日数据" :name="1"></van-tab>
			<van-tab title="取币明细" :name="2"></van-tab>
		</van-tabs> -->
		<ConditionScreening text="detail" @getParams="getParams" ref="screen" />

		<view class="list-content" v-show="activeName == 1">
			<view class="list-block margin10" v-for="(item, key, index) of dataObj" :key="index">
				<view class="block-title">
					<view class="main-title">{{ key }}</view>
				</view>
				<view class="block-row-box">
					<view class="block-row" v-for="(list, index) in item" :key="index">
						<view class="block-cell">
							<view class="cell-top">
								兑币类型
								<van-icon name="question-o" size="15" class="icon" v-if="0" />
							</view>
							<view class="cell-bottom">{{ exchangeTypeDict[list.exchangeType] }}</view>
						</view>
						<view class="block-cell">
							<view class="cell-top">取币总数</view>
							<view class="cell-bottom">{{ list.exchangeNumber }}</view>
						</view>
						<view class="block-cell">
							<view class="cell-top">出币总数</view>
							<view class="cell-bottom">{{ list.outPresentNumber }}</view>
						</view>
						<view class="block-cell">
							<view class="cell-top">启动金额</view>
							<view class="cell-bottom">{{ list.exchangeBalance }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <van-list v-model="load" :finished="onEarth" finished-text="没有更多了" @load="getInfo(params)"
			v-show="activeName == 2">
			<view class="list-wrapper">
				<view class="list-block" v-for="(item, index) in dataList" :key="index">
					<view class="block-left">
						<view class="type-name">{{ exchangeTypeDict[list.exchangeType] }}</view>
						<view class="coins-detail">
							取币:{{ item.exchangeNumber }} | 实出:{{ item.outPresentNumber }}
						</view>
					</view>
					<view class="block-right">
						<view class="status-text">{{ exchangeResultDict[item.exchangeResult] }}</view>
						<view class="time">{{ item.exchangeTime }}</view>
					</view>
				</view>
			</view>
		</van-list> -->
		
		<xls-bottom v-if="JSON.stringify(dataObj) != '{}' && activeName == 1" />
		<xls-empty v-if="(JSON.stringify(dataObj) == '{}' && activeName == 1)||(!dataList.length && activeName == 2)" />
	</view>
</template>

<script>
	import ConditionScreening from "../components/conditionScreening.vue";
	import {
		deviceDataController
	} from "@/api/index.js";
	export default {
		name: "dbjDetail",
		components: {
			ConditionScreening
		},
		data() {
			return {
				activeName: 1,
				dataObj: {},
				dataList: [],
				load: false,
				onEarth: false,
				page: 0,
				params: {},
				paramsReceived: {},
				exchangeTypeDict: {
					1: "直接购买",
					2: "会员取币",
					3: "远程启动",
					4: "美团核销",
					5: "口碑核销",
					6: "抖音核销",
					7: "线下购买",
					undefined: "其他类型"
				},
				exchangeResultDict: {
					0: "正在出币",
					1: "成功",
					2: "失败",
					undefined: "其他"
				},
			};
		},
		onLoad(option) {
			this.paramsReceived = JSON.parse(option.params);
			this.$nextTick(() => {
				if (this.paramsReceived.pickerTime > -1) {
					this.$refs.screen.quickTime(this.paramsReceived.pickerTime * 1);
				} else {
					this.$refs.screen.startTime = this.paramsReceived.startTime;
					this.$refs.screen.endTime = this.paramsReceived.endTime;
					this.$refs.screen.date = `${this.paramsReceived.startTime} 至 ${this.paramsReceived.endTime}`;
					this.$refs.screen.get();
				}
			});
		},
		methods: {
			changeActiveName() {
				this.$nextTick(() => {
					this.$refs.screen.get();
				});
			},
			getParams(data) {
				this.params = Object.assign({
						deviceNumber: this.$route.query.deviceNumber
					},
					data
				);
				if (this.activeName == 1) {
					this.getData(this.params);
				} else {
					this.page = 0;
					this.getInfo(this.params);
				}
			},
			async getInfo(data) {
				let page = {
					page: ++this.page,
					size: 20,
				};
				let params = Object.assign(page, data);
				this.load = true;
				this.$loading();
				let res = await deviceDataController.getDbjInfo(params);
				this.$hideLoading();
				this.load = false;
				if (res.code == 200) {
					// this.onEarth = res.data.data.records.length < 20;
					this.onEarth = res.data.length < 20;
					if (this.page > 1) {
						this.dataList = [...this.dataList, ...res.data];
					} else {
						this.dataList = res.data;
					}
				}
			},
			async getData(data) {
				this.$loading();
				let res = await deviceDataController.getDbjData({
					ndjDataVo: data
				});
				this.$hideLoading();
				if (res.code == 200) {
					this.dataObj = res.data;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '../index.scss';
	
	.dbj-data-wrapper {
		width: 100%;
		position: relative;

		.tab-style {
			position: sticky;
			top: 48px;
			z-index: 1000;
		}

		.header-wrapper {
			padding: 16px;
			vertical-align: middle;

			.main-title {
				font-size: 16px;
				font-weight: 700;
			}

			.sub-title {
				color: #81909a;
				font-family: AppleSystemUIFont;
				font-size: 12px;
				margin-top: 2px;
			}
		}

		.list-wrapper {
			padding: 10px 16px;

			.list-block {
				padding: 10px;
				background: #fff;
				border-radius: 8px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.block-left {
					flex: 1;

					.type-name {
						font-size: 14px;
						font-weight: 700;
					}

					.coins-detail {
						color: #7d919b;
						font-size: 12px;
						margin-top: 2px;
					}
				}

				.block-right {
					flex: 1;
					font-size: 14px;
					text-align: right;

					.time {
						color: #7d919b;
						font-size: 12px;
						margin-top: 2px;
					}
				}
			}
		}
	}
</style>