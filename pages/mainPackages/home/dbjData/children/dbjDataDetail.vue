<template>
	<z-paging ref="detailPaging" v-model="dataList" @query="queryList" auto-show-back-to-top back-to-top-img="/static/back.png">
		<xls-jy-navbar title="兑币机数据详情" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="header-wrapper">
			<view class="main-title">兑币机 {{ paramsReceived.deviceNumber }}</view>
			<view class="sub-title">{{ paramsReceived.placeName }}</view>
		</view>

		<xls-tabs :options="options" v-model="activeName" class="tab-style" @change="changeActiveName"></xls-tabs>

		<ConditionScreening text="detail" @getParams="getParams" ref="screen" :activeName="activeName"
			:deviceNumber="paramsReceived.deviceNumber" />

		<view class="list-content" v-if="activeName == 1">
			<view class="list-block margin10" v-for="(item, dataIndex) in dataList" :key="dataIndex">
				<view class="block-title">
					<view class="main-title">{{ item.exchangeDate }}</view>
				</view>
				<data-details-vue :item="item" @illustrateMethod="illustrateMethod"></data-details-vue>
			</view>
		</view>

		<view class="list-wrapper" v-else>
			<view class="list-block" v-for="(item, index) in dataList" :key="index">
				<view class="block-left">
					<view class="type-name">{{ exchangeTypeDict[item.exchangeType] }}</view>
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
		<data-illustrate-vue ref="illustrate" text="detail"></data-illustrate-vue>
		<xls-empty slot="empty" />
	</z-paging>
</template>

<script>
	import ConditionScreening from "../components/conditionScreening.vue";
	import dataDetailsVue from "../components/dataDetails.vue";
	import dataIllustrateVue from "../components/dataIllustrate.vue";
	import {
		deviceDataController
	} from "@/api/index.js";
	export default {
		name: "dbjDetail",
		components: {
			ConditionScreening,
			dataDetailsVue,
			dataIllustrateVue
		},
		data() {
			return {
				// tabs
				activeName: 2,
				options: [{
						key: 2,
						value: "取币明细",
					}, {
						key: 1,
						value: "分日数据",
					}, {
						key: 3,
						value: "现金购买",
					},
				],
				dataList: [],
				params: {},
				paramsReceived: {},
				exchangeTypeDict: {
					1: "直接购买",
					2: "会员取币",
					3: "远程启动",
					4: "美团核销",
					5: "口碑核销",
					6: "抖音核销",
					7: "现金购买",
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
				const obj = {
					deviceNumber: this.paramsReceived.deviceNumber
				}
				Object.assign(this.params, obj);
				Object.assign(this.params, data);
				if(this.activeName == 3) {
					this.params.exchangeType = 7
				}
				this.$refs.detailPaging.reload();
			},
			queryList(pageNo, pageSize) {
				this.$loading();
				if (this.activeName == 1) {
					deviceDataController.getDbjData({
						ndjDataVo: {
							page: pageNo,
							size: pageSize,
							...this.params
						}
					}).then(res => {
						this.$hideLoading();
						if (res.code == 200) {
							this.$refs.detailPaging.complete(res.data.dataList);
						}
					})
				} else {
					deviceDataController.getDbjInfo({
						dataVo: {
							page: pageNo,
							size: pageSize,
							...this.params
						}
					}).then(res => {
						this.$hideLoading();
						if (res.code == 200) {
							this.$refs.detailPaging.complete(res.data.dataList);
						}
					})
				}
			},
			illustrateMethod(type) {
				this.$refs.illustrate.showMethod(type)
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '../index.scss';

	.tab-style {
		position: sticky;
		top: 44px;
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
</style>