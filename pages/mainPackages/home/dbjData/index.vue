<template>
	<div class="data-dbj-wrapper">
		<xls-jy-navbar title="兑币机数据" bgColor="#f5f6f7"></xls-jy-navbar>
		<!-- <ConditionScreening @getParams="getParams" ref="screen" /> -->
		<div class="list-header">
			<div class="header-title">兑币机数据</div>
			<div class="header-right">
				<div @click="$router.push('/dataDbj/DbjHistory')">历史数据</div>
				<div class="header-btn" @click="$refs.screen.getExcelUrl()" v-hasPermi="['app:dbj:index:export']">
					想要导出数据
					<u-icon name="question-circle" size="30" color="#5241ff" />
				</div>
			</div>
		</div>
		<!-- 数据列表 -->
		<div class="list-content">
			<div class="list-block" v-for="(item, key, index) of dataList" :key="index" @click="
            $router.push({
              path: '/dataDbj/DbjDataDetail',
              query: {
                deviceNumber: key,
                placeName: item[0].placeName,
                index: $refs.screen.pickerTime,
                startTime: $refs.screen.startTime,
                endTime: $refs.screen.endTime,
              },
            })
          ">
				<div class="block-title">
					<div class="main-title">兑币机 {{ key }}</div>
					<div class="sub-title">
						{{ item[0].placeName }}
					</div>
				</div>
				<div class="block-row-box">
					<div class="block-row" v-for="(list, index) in item" :key="index">
						<div class="block-cell">
							<div class="cell-top">
								兑币类型
								<u-icon name="question-circle" size="30" color="#5241ff" v-if="0" />
							</div>
							<div class="cell-bottom">{{ typeDict[list.exchangeType] || "其他类型" }}</div>
						</div>
						<div class="block-cell">
							<div class="cell-top">取币总数</div>
							<div class="cell-bottom">{{ list.exchangeNumber }}</div>
						</div>
						<div class="block-cell">
							<div class="cell-top">出币总数</div>
							<div class="cell-bottom">{{ list.outPresentNumber }}</div>
						</div>
						<div class="block-cell">
							<div class="cell-top">启动金额</div>
							<div class="cell-bottom">{{ list.exchangeBalance }}</div>
						</div>
					</div>
				</div>
			</div>
			<xls-bottom v-if="JSON.stringify(dataList) != '{}'" />
			<xls-empty v-else />
		</div>
	</div>

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
				dataList: {
					"30001102": [{
						"exchangeType": 1,
						"exchangeNumber": 3,
						"outPresentNumber": 0,
						"exchangeBalance": 3,
						"placeId": 1082,
						"placeName": "中土物联-513"
					}],
					"30001103": [{
							"exchangeType": 1,
							"exchangeNumber": 2,
							"outPresentNumber": 1,
							"exchangeBalance": 2,
							"placeId": 1082,
							"placeName": "中土物联-513"
						},
						{
							"exchangeType": 7,
							"exchangeNumber": 50,
							"outPresentNumber": 50,
							"exchangeBalance": 194,
							"placeId": 1082,
							"placeName": "中土物联-513"
						}
					],
					"30001111": [{
						"exchangeType": 7,
						"exchangeNumber": 52,
						"outPresentNumber": 52,
						"exchangeBalance": 52,
						"placeId": 1082,
						"placeName": "中土物联-513"
					}],
					"30001118": [{
							"exchangeType": 1,
							"exchangeNumber": 11,
							"outPresentNumber": 0,
							"exchangeBalance": 11,
							"placeId": 1082,
							"placeName": "中土物联-513"
						},
						{
							"exchangeType": 7,
							"exchangeNumber": 22,
							"outPresentNumber": 22,
							"exchangeBalance": 23,
							"placeId": 1082,
							"placeName": "中土物联-513"
						}
					],
					"30001120": [{
							"exchangeType": 1,
							"exchangeNumber": 4,
							"outPresentNumber": 2,
							"exchangeBalance": 4,
							"placeId": 1082,
							"placeName": "中土物联-513"
						},
						{
							"exchangeType": 7,
							"exchangeNumber": 52,
							"outPresentNumber": 52,
							"exchangeBalance": 52,
							"placeId": 1082,
							"placeName": "中土物联-513"
						}
					],
					"30001303": [{
						"exchangeType": 1,
						"exchangeNumber": 3,
						"outPresentNumber": 0,
						"exchangeBalance": 3,
						"placeId": 1082,
						"placeName": "中土物联-513"
					}],
					"30001448": [{
							"exchangeType": 1,
							"exchangeNumber": 21,
							"outPresentNumber": 20,
							"exchangeBalance": 13.03,
							"placeId": 1082,
							"placeName": "中土物联-513"
						},
						{
							"exchangeType": 7,
							"exchangeNumber": 19,
							"outPresentNumber": 19,
							"exchangeBalance": 19,
							"placeId": 1082,
							"placeName": "中土物联-513"
						}
					],
					"30003160": [{
						"exchangeType": 1,
						"exchangeNumber": 2,
						"outPresentNumber": 0,
						"exchangeBalance": 2,
						"placeId": 1082,
						"placeName": "中土物联-513"
					}],
					"30003161": [{
							"exchangeType": 1,
							"exchangeNumber": 4,
							"outPresentNumber": 1,
							"exchangeBalance": 4,
							"placeId": 1082,
							"placeName": "中土物联-513"
						},
						{
							"exchangeType": 7,
							"exchangeNumber": 5,
							"outPresentNumber": 5,
							"exchangeBalance": 6,
							"placeId": 1082,
							"placeName": "中土物联-513"
						}
					],
					"30003162": [{
						"exchangeType": 1,
						"exchangeNumber": 1,
						"outPresentNumber": 1,
						"exchangeBalance": 1,
						"placeId": 1082,
						"placeName": "中土物联-513"
					}]
				},
			};
		},
		// created() {
		// 	this.$nextTick(() => {
		// 		this.$refs.screen.quickTime(4);
		// 	});
		// },
		methods: {
			getParams(data) {
				this.getList(data);
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