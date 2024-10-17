<template>
	<z-paging ref="paging" v-model="commodityList" @query="queryList">
		<xls-jy-navbar title="缺货备货" bgColor="#f5f6f7" slot="top"></xls-jy-navbar>

		<xls-search @confirm="stratesSearch" placeholder="输入设备编号或场地" marLeft="-6.5em"></xls-search>

		<view class="places-select-wrapper" @click="$refs.place.showPlacePopup(placeId)">
			<view class="select-label">场地</view>
			<view class="select-value">{{ placeName }}</view>
			<u-icon name="arrow-right" size="36" color="#ccc" />
		</view>

		<xls-place-radio ref="place" @getPlaceId="getPlaceId" deviceType="4" />

		<view class="main-content-wrapper">
			<u-checkbox-group v-model="checkboxGroup" placement="column">
				<view class="li-item-wrapper" v-for="(item, index) in commodityList" :key="index">
					<view class="title-style">{{ item.placeName }}</view>
					<view class="device-message" v-for="(rail, index) in item.railList" :key="index">
						<view class="item-top">
							<view class="device-wrapper">
								<u-checkbox :name="rail.deviceNumber" activeColor="#5241FF" shape="circle" iconSize="32"
									labelSize="36" size="38" v-hasPermi="['app:shj:stockUp:create']"></u-checkbox>
								<span class="name">售货机{{ rail.deviceNumber }}</span>
								<span class="status-icon online" v-if="rail.onlineState">在线</span>
								<span class="status-icon offline" v-else>离线</span>
							</view>
							<view class="lack-count" @click="goStockDetail(item.placeName, rail.deviceNumber)">
								缺货({{ rail.shortSupply }}个)
							</view>
						</view>
						<view class="data-list">
							<view class="data-list_item">
								<view class="item-value">{{ rail.railCount }}条</view>
								<view class="item-label">货道总数</view>
							</view>
							<view class="data-list_item">
								<view class="item-value">{{ rail.total }}个</view>
								<view class="item-label">总库存</view>
							</view>
							<view class="data-list_item">
								<view class="item-value">{{ rail.stock }}个</view>
								<view class="item-label">现有库存</view>
							</view>
						</view>
					</view>
				</view>
			</u-checkbox-group>

		</view>
		<xls-empty slot="empty" />

		<view class="footer-button-wrapper" v-hasPermi="['app:shj:stockUp:create']" slot="bottom">
			<view class="select-all">
				<u-checkbox-group v-model="allCheckGroup" @change="allGroupChange">
					<u-checkbox name="1" activeColor="#5241FF" shape="circle" iconSize="32" labelSize="36"
						size="38"></u-checkbox>
				</u-checkbox-group>
				<span class="all-text">全选</span>
			</view>
			<view class="generated-records-btn" @click="createStock">生成备货单</view>
		</view>

		<u-popup :show="stockPopup" mode="center" round="20" @close="stockPopup=!stockPopup" v-hasPermi="['app:shj:stockUp:create']">
			<view class="stock-popup-wrapper">
				<u-icon name="file-text" size="100" color="#09bb07" />
				<p class="title">提交成功</p>
				<p class="main">详情到我的备货单中查询、转发</p>
				<view class="read-stock" @click="goTo">
					查看备货单
				</view>
			</view>
		</u-popup>

	</z-paging>
</template>

<script>
	import {
		shjController
	} from '@/api/index.js'

	export default {
		data() {
			return {
				searchValue: "",
				placeName: "全部场地",
				checkboxGroup: [],
				allCheckGroup: [],
				placeId: null,
				//备货单
				stockPopup: false,
				commodityList: [],
			};
		},
		methods: {
			queryList(pageNo, pageSize) {
				shjController.venueVendingMachine({
					page: pageNo,
					size: pageSize,
					...(this.searchValue && {
						search: encodeURIComponent(this.searchValue)
					}),
					...(this.placeId && {
						placeId: this.placeId
					}),
				}).then(res => {
					// res.data = res.data.filter(item => item.railList.length)
					this.$refs.paging.complete(res.data)
				})
			},
			goTo() {
				this.$goTo("/pages/subpackages/personal/stockOrder/index")
			},
			allGroupChange(item) {
				if (item.length) {
					let railList = this.commodityList.reduce((before, item) => {
						return [...before, ...item.railList]
					}, [])
					this.checkboxGroup = railList.map(item => item.deviceNumber)
				} else {
					this.checkboxGroup = []
				}
			},
			getPlaceId(place) {
				if (place == -1) {
					this.placeId = null
					this.placeName = "全部场地"
				} else {
					this.placeId = place.id
					this.placeName = place.placeName
				}
				this.$refs.paging.reload()
			},
			stratesSearch(search) {
				this.searchValue = search
				this.$refs.paging.reload()
			},
			goStockDetail(placeName, deviceNumber) {
				this.$goTo("/pages/subpackages/home/shjModule/shjStock/detail", "navigateTo", {
					placeName,
					deviceNumber
				})
			},
			// 生成备货单
			createStock() {
				if (!this.checkboxGroup.length) {
					return this.$toast("请选择设备~")
				}
				this.$modal("确定生成备货单？",{
						title: "温馨提示"
					}).then(() => {
						console.log(this.checkboxGroup)
						let placeTotal = 1
						let allList = JSON.parse(JSON.stringify(this.commodityList))
						
						// this.checkboxGroup.forEach((item) => {
						// 	allList.forEach((place) => {
						// 		if (place.railIds.includes(item)) {
						// 			placeTotal += 1
						// 			allList = allList.filter(arr => arr.placeId != place.placeId)
						// 		}
						// 	})
						// })
						console.log(this.checkboxGroup, placeTotal)

						shjController.addStockOut({
							deviceNumber: this.checkboxGroup,
							choiceTotal: this.checkboxGroup.length,
							placeTotal,
						}).then((res) => {
							if (res.code == 200) {
								this.stockPopup = true
							}
						})
						
					}).catch(() => {})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.places-select-wrapper {
		padding: 12px 10px;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-top: 1px solid #e5e5e5;
		font-size: 15px;

		.select-label {
			width: 87.5px;
			color: #666;
		}

		.select-value {
			flex: 1;
			color: #5241ff;
			text-align: right;
		}
	}

	.main-content-wrapper {
		margin-top: 8px;
		padding: 0 12px 0px;

		.li-item-wrapper {
			margin-top: 6px;
			width: 100%;

			.title-style {
				padding: 10px;
				font-size: 17px;
				font-weight: 700;
			}

			.device-message {
				padding: 0 12px;
				background: #fff;
				border-radius: 2px;
				margin-bottom: 12px;

				.item-top {
					border-bottom: 1px solid #f0f0f0;
					padding: 10px 0;
					font-size: 15px;
					font-weight: 700;
					display: flex;
					align-items: center;
					position: relative;

					.device-wrapper {
						flex: 1;
						display: flex;
						align-items: center;
					}

					.name {
						color: #262626;
						margin-right: 8px;
						vertical-align: middle;
					}

					.status-icon {
						border: 1px solid #969799;
						border-radius: 5px;
						display: inline-block;
						font-size: 12px;
						padding: 0 5px;
						margin-right: 10px;
					}

					.offline {
						border-color: #969799;
						color: #969799;
					}

					.online {
						border-color: #15d193;
						color: #15d193;
					}

					.lack-count {
						color: #5241ff;
						margin-right: 12px;
						font-size: 13px;
					}
				}

				.item-top:after {
					border-right: 1px solid #999;
					border-top: 1px solid #999;
					content: "";
					height: 9px;
					opacity: 0.6;
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%) rotate(45deg);
					width: 9px;
				}

				.data-list {
					align-items: center;
					display: flex;
					height: 70px;
					justify-content: space-between;
					width: 100%;

					.data-list_item {
						color: #999;
						text-align: center;

						.item-label {
							color: #595959;
							font-size: 13px;
							margin-top: 4px;
						}

						.item-value {
							color: #262626;
							font-size: 15px;
							font-weight: 500;
						}

						.color-blue {
							color: #5241ff;
						}
					}
				}
			}
		}
	}

	.footer-button-wrapper {
		align-items: center;
		background-color: #fff;
		border-top: 1px solid #e6e6e6;
		bottom: 0;
		display: flex;
		height: 50px;
		justify-content: space-between;
		padding: 0 0 0 10px;
		width: 100%;
		box-sizing: border-box;

		.select-all {
			flex: 1;
			font-size: 15px;
			font-weight: 700;
			display: flex;
			align-items: center;
		}

		.all-text {
			margin-left: 10px;
		}

		.generated-records-btn {
			background: #5241ff;
			color: #fff;
			font-size: 16px;
			height: 100%;
			vertical-align: middle;
			width: 130px;
			line-height: 50px;
			text-align: center;
		}
	}

	//备货单
	.stock-popup-wrapper {
		width: 280px;
		padding: 20px 0 0px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #333;
		font-size: 18px;

		.title {
			font-weight: 700;
			line-height: 25px;
			margin-bottom: 10px;
			margin-top: 20px;
		}

		.main {
			font-size: 13px;
			line-height: 20px;
			margin-bottom: 25px;
		}

		.read-stock {
			border-top: 1px solid #e5e5e5;
			width: 100%;
			line-height: 50px;
			height: 50px;
			color: #5241ff;
			text-align: center;
		}
	}
</style>