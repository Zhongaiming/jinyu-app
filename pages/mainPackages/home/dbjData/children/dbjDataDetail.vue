<template>
	<div class="dbj-data-wrapper">
		<nav-bar>兑币机数据详情</nav-bar>
		<div class="header-wrapper">
			<div class="main-title">兑币机 {{ $route.query.deviceNumber }}</div>
			<div class="sub-title">{{ $route.query.placeName }}</div>
		</div>
		<van-tabs v-model="activeName" color="#5241ff" class="tab-style" @change="changeActiveName">
			<van-tab title="分日数据" :name="1"></van-tab>
			<van-tab title="取币明细" :name="2"></van-tab>
		</van-tabs>
		<ConditionScreening text="detail" @getParams="getParams" ref="screen" />

		<div class="list-content" v-show="activeName == 1">
			<div class="list-block margin10" v-for="(item, key, index) of dataObj" :key="index">
				<div class="block-title">
					<div class="main-title">{{ key }}</div>
				</div>
				<div class="block-row-box">
					<div class="block-row" v-for="(list, index) in item" :key="index">
						<div class="block-cell">
							<div class="cell-top">
								兑币类型
								<van-icon name="question-o" size="15" class="icon" v-if="0" />
							</div>
							<div class="cell-bottom">{{ getType(list.exchangeType) }}</div>
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
		</div>

		<van-list v-model="load" :finished="onEarth" finished-text="没有更多了" @load="getInfo(params)"
			v-show="activeName == 2">
			<div class="list-wrapper">
				<div class="list-block" v-for="(item, index) in dataList" :key="index">
					<div class="block-left">
						<div class="type-name">{{ getType(item.exchangeType) }}</div>
						<div class="coins-detail">
							取币:{{ item.exchangeNumber }} | 实出:{{ item.outPresentNumber }}
						</div>
					</div>
					<div class="block-right">
						<div class="status-text">{{ getResult(item.exchangeResult) }}</div>
						<div class="time">{{ item.exchangeTime }}</div>
					</div>
				</div>
			</div>
		</van-list>
		<on-earth v-if="JSON.stringify(dataObj) != '{}' && activeName == 1" />
		<no-data v-if="
        (JSON.stringify(dataObj) == '{}' && activeName == 1) ||
        (!dataList.length && activeName == 2)
      " />
	</div>
</template>

<script>
	import ConditionScreening from "./conditionScreening.vue";
	import api from "@/utils/dbjApi";
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
			};
		},
		created() {
			this.$nextTick(() => {
				if (this.$route.query.index > -1) {
					this.$refs.screen.quickTime(this.$route.query.index * 1);
				} else {
					this.$refs.screen.startTime = this.$route.query.startTime;
					this.$refs.screen.endTime = this.$route.query.endTime;
					this.$refs.screen.date = `${this.$route.query.startTime} 至 ${this.$route.query.endTime}`;
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
				this.loading();
				let res = await api.getDbjInfo(params);
				this.clearing();
				this.load = false;
				if (res.data.code == 200) {
					// this.onEarth = res.data.data.records.length < 20;
					this.onEarth = res.data.data.length < 20;
					if (this.page > 1) {
						this.dataList = [...this.dataList, ...res.data.data];
					} else {
						this.dataList = res.data.data;
					}
				}
			},
			async getData(data) {
				this.loading();
				let res = await api.getDbjData(data);
				this.clearing();
				if (res.data.code == 200) {
					this.dataObj = res.data.data;
				}
			},
			getType(type) {
				let value;
				switch (type) {
					case 1:
						value = "直接购买";
						break;
					case 2:
						value = "会员取币";
						break;
					case 3:
						value = "远程启动";
						break;
					case 4:
						value = "美团核销";
						break;
					case 5:
						value = "口碑核销";
						break;
					case 6:
						value = "抖音核销";
						break;
					case 7:
						value = "线下购买";
						break;
					default:
						value = "其他类型";
						break;
				}
				return value;
			},
			getResult(type) {
				let value;
				switch (type) {
					case 0:
						value = "正在出币";
						break;
					case 1:
						value = "成功";
						break;
					case 2:
						value = "失败";
						break;
					default:
						value = "其他";
						break;
				}
				return value;
			},
		},
	};
</script>

<style lang="scss" scoped>
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