<template>
	<view class="data-dbj-wrapper">
		<xls-jy-navbar title="兑币机数据" bgColor="#f5f6f7"></xls-jy-navbar>
		<!-- <ConditionScreening @getParams="getParams" ref="screen" /> -->
		<!-- <xls-quick-date @getCondition="getCondition"></xls-quick-date> -->
		<view class="list-header">
			<view class="header-title">兑币机数据</view>
			<view class="header-right">
				<view @click="$router.push('/dataDbj/DbjHistory')">历史数据</view>
				<view class="header-btn" @click="$refs.screen.getExcelUrl()" v-hasPermi="['app:dbj:index:export']">
					想要导出数据
					<u-icon name="question-circle" size="30" color="#5241ff" />
				</view>
			</view>
		</view>

		<!-- 数据列表 -->
		<view class="list-content">
			<view class="list-block" v-for="(item, key, dataIndex) of dataList" :key="dataIndex" @click="goTo">
				<view class="block-title">
					<view class="main-title">兑币机 {{ key }}</view>
					<view class="sub-title">
						{{ item[0].placeName }}
					</view>
				</view>
				<view class="block-row-box">
					<view class="block-row" v-for="(list, itemIndex) in item"
						:key="$getUniqueKey(dataIndex, itemIndex)">
						<view class="block-cell">
							<view class="cell-top">
								兑币类型
								<u-icon name="question-circle" size="30" color="#5241ff" v-if="0" />
							</view>
							<view class="cell-bottom">{{ typeDict[list.exchangeType] || "其他类型" }}</view>
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
			<xls-bottom v-if="JSON.stringify(dataList) != '{}'" />
			<xls-empty v-else />
		</view>
	</view>

</template>

<script>
	// import ConditionScreening from "./conditionScreening.vue";
	// import api from "@/utils/dbjApi";
	export default {
		name: "dataDbj",
		components: {
			// ConditionScreening
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
				dataList: {},
			};
		},
		// created() {
		// 	this.$nextTick(() => {
		// 		this.$refs.screen.quickTime(4);
		// 	});
		// },
		methods: {
			getCondition(result) {
				const {
					startTime,
					endTime,
					placeIdList
				} = result;
				this.startTime = startTime;
				this.endTime = endTime;
				this.placeId = placeIdList;
				this.$refs.ndjPaging.reload();
			},
			getParams(data) {
				this.getList(data);
			},
			goTo() {
				this.$router.push({
					path: '/dataDbj/DbjDataDetail',
					query: {
						deviceNumber: key,
						placeName: item[0].placeName,
						index: $refs.screen.pickerTime,
						startTime: $refs.screen.startTime,
						endTime: $refs.screen.endTime,
					}
				})
			},
			async getList(data) {
				this.loading();
				let res = await api.getDbjData(data);
				this.clearing();
				if (res.data.code == 200) {
					this.dataList = res.data.data;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'index.scss';

	.data-dbj-wrapper {
		width: 100%;

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
	}
</style>