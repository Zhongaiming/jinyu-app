<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<xls-jy-navbar title="兑币机数据" bgColor="#f5f6f7" slot="top"></xls-jy-navbar>
		<ConditionScreening @getParams="getParams" ref="screen" />
		<view class="list-header">
			<view class="header-title">兑币机数据</view>
			<view class="header-right">
				<!-- <view @click="goTo('dbjHistory', {})">历史数据</view> -->
				<view @click="goTo('dbjHistory', {})">表格显示</view>
				<view class="header-btn" @click="getExcelUrl" v-hasPermi="['app:dbj:index:export']">
					想要导出数据
					<u-icon name="question-circle" size="30" color="#5241ff" />
				</view>
			</view>
		</view>
		<!-- 数据列表 -->
		<view class="list-content">
			<view class="list-block" v-for="(item, dataIndex) in dataList" :key="dataIndex"
				@click="goTo('dbjDataDetail', item)">
				<view class="block-title">
					<view class="main-title">兑币机 {{ item.deviceNumber }}</view>
					<view class="sub-title">
						{{ item.placeName }}
					</view>
				</view>
				<data-details-vue :item="item" @illustrateMethod="illustrateMethod"></data-details-vue>
			</view>	
		</view>
		<xls-empty slot="empty" />
		<data-illustrate-vue ref="illustrate"></data-illustrate-vue>
	</z-paging>
</template>

<script>
	import ConditionScreening from "./components/conditionScreening.vue";
	import dataDetailsVue from "./components/dataDetails.vue";
	import dataIllustrateVue from "./components/dataIllustrate.vue";
	import {
		deviceDataController
	} from "@/api/index.js";
	export default {
		name: "dataDbj",
		components: {
			ConditionScreening,
			dataDetailsVue,
			dataIllustrateVue
		},
		data() {
			return {
				typeDict: {
					1: "直接购买",
					2: "会员取币",
					3: "远程启动",
					4: "美团核销",
					5: "口碑核销",
					6: "抖音核销",
				},
				dataList: [],
				params: {},
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.$refs.screen.quickTime(4);
			});
		},
		methods: {
			queryList(pageNo, pageSize) {
				this.$loading();
				deviceDataController.getDbjData({
					ndjDataVo: {
						page: pageNo,
						size: pageSize,
						...this.params
					}
				}).then(res => {
					this.$hideLoading();
					if (res.code == 200) {
						this.$refs.paging.complete(res.data.dataList);
					}
				})
			},
			getParams(data) {
				Object.assign(this.params, data)
				this.$refs.paging.reload();
			},
			goTo(route, item) {
				let params = {};
				if (item.hasOwnProperty('placeName')) {
					params = {
						deviceNumber: item.deviceNumber,
						placeName: item.placeName,
						pickerTime: this.params.pickerTime,
						startTime: this.params.startTime,
						endTime: this.params.endTime,
					}
				}
				this.$goTo(`/pages/mainPackages/home/dbjData/children/${route}`, "navigateTo", params)
			},
			getExcelUrl() {
				this.$refs.screen.getExcelUrl();
			},
			illustrateMethod(type) {
				this.$refs.illustrate.showMethod(type)
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'index.scss';

	.list-header {
		align-items: center;
		background: #f5f5f5;
		display: flex;
		justify-content: space-between;
		padding: 16px 16px 13px;

		.header-title {
			color: #041b2a;
			font-size: 16px;
			font-weight: 700;
			line-height: 22px;
		}

		.header-right {
			align-items: center;
			display: flex;
			justify-content: flex-end;
			vertical-align: middle;
			color: #5241ff;
			font-size: 12px;
			font-weight: 400;
			line-height: 17px;

			.header-btn {
				margin-left: 15px;
				display: flex;
				align-items: center;

				.icon {
					margin-left: 5px;
				}
			}
		}
	}

	/** 导出数据 */
	.container-wrapper {
		width: 280px;
		padding: 16px;

		.title {
			font-size: 16px;
			font-weight: 700;
			line-height: 40px;
			text-align: center;
		}

		.share-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn {
				flex: 1;
				line-height: 42px;
				border: 1px solid #5241ff;
				border-radius: 8px;
				text-align: center;
				font-size: 15px;
				font-weight: 700;
			}

			.left {
				margin-right: 15px;
				color: #5241ff;
			}

			.right {
				background: #5241ff;
				color: #fff;
			}
		}

		.text-content {
			padding: 8px 0 24px;
			color: #848f99;
			font-size: 14px;
			line-height: 20px;
			text-align: justify;

			.p-text {
				padding-left: 20px;
				position: relative;

				.serial-number {
					position: absolute;
					top: 0;
					left: 0;
				}
			}
		}
	}
</style>