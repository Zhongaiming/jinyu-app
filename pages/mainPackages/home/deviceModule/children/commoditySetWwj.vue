<template>
	<view class="goods-set-wrapper">
		<xls-jy-navbar title="商品设置" :class="{'fixed-header':showRight}"></xls-jy-navbar>
		<view class="main-content">
			
			<view class="picker-item-wrapper">
				<view class="body-main-wrapper">
					<view class="body-main" @click="showBottom = !showBottom">
						<view class="main-title">选择设备</view>
						<view class="main-text">
							<xls-field v-model="commodityInfo.typeName" placeholder="请选择设备" @focus="stopKeyborad" />
						</view>
						<view class="main-icon">
							<u-icon name="arrow-right" size="36" color="#999"></u-icon>
						</view>
					</view>
				</view>
				<view class="body-main-wrapper">
					<view class="body-main" @click="showRight = !showRight">
						<view class="main-title">商品名称</view>
						<view class="main-text">
							<xls-field v-model="commodityInfo.commodityName" placeholder="请选择商品"
								@focus="stopKeyborad" />
						</view>
						<view class="main-icon">
							<u-icon name="arrow-right" size="36" color="#999"></u-icon>
						</view>
					</view>
				</view>
				<view class="body-main-wrapper">
					<view class="body-main" @click="(showFina = !showFina), (reperValue = railRepertory)"
						style="border: 0">
						<view class="main-title">现有库存</view>
						<view class="main-text">
							<xls-field v-model="railRepertory" placeholder="请输入库存" @focus="stopKeyborad" />
						</view>
						<view class="main-icon">
							<u-icon name="arrow-right" size="36" color="#999"></u-icon>
						</view>
					</view>
				</view>
			</view>

			<view class="link-list-wrapper" v-show="deviceNumber">
				<view @click="getRecordList">查看此设备库存操作记录</view>
				<view :class="{'disable': railRepertory == 0}" @click="clearRailRepertory">
					清除此设备库存
				</view>
			</view>

			<view class="btn-wrap-content" @click="confirmEdit">
				<view class="btn-style">保存</view>
			</view>

			<!-- 设备列表 -->
			<u-popup :show="showBottom" mode="bottom" @close="showBottom=false">
				<view class="title-wrapper">选择设备</view>
				<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @comfirn="stratesSearch"></xls-search>
				<view class="device-main-wrapper">
					<view class="left-wrapper" @scroll="scorllEvent">
						<view class="smallItem" v-for="(place, index) in placeList" :key="index"
							:class="{'activeBtn': activePlace == place.placeId}" @click="getDevice(place.placeId)">
							{{ place.placeName }}
						</view>
						<xls-bottom v-show="onEarth" text="- 到底了 -" />
					</view>
					<view class="right-wrapper">
						<view v-for="(device, index) in placeDevice" :key="index">
							<view class="item-content" v-if="device.typeName != '售货机'"
								:class="{'actvice-item': deviceNumber == device.deviceNumber}"
								@click="pitchDevice(device)">
								<view class="item">
									<span v-show="device.railType">{{ device.railType }}号机_</span>
									{{ device.deviceNumber }}_{{ device.typeName }}
								</view>
							</view>
						</view>
						<xls-bottom v-show="placeDevice.length" />
						<view class="item-content">
							<view class="item" style="color: #8f8f94" v-show="!placeDevice.length">
								该场地暂无设备~
							</view>
						</view>
					</view>
				</view>
			</u-popup>

			<!-- 设备货道 -->
			<u-popup :show="showRail" mode="bottom" @close="(showRail = !showRail), (showBottom = !showBottom)">
				<view class="title-wrapper">选择设备货道</view>
				<view class="rail-wrapper">
					<view class="rail-i-wrapper" :class="{'rail-a-style': railNumber == rail.railNumber}"
						v-for="(rail, index) in railList" :key="index" @click="pickerRail(rail)">
						<view class="rail">
							<xls-image :src="rail.commodityImg" alt="" />
							<span class="text">{{ rail.shippingSpace }}/{{ rail.railNumber }}</span>
						</view>
					</view>
					<xls-empty v-show="!railList.length" />
				</view>
			</u-popup>

			<!-- 商品列表 -->
			<u-popup :show="showRight" mode="right">
				<z-paging v-if="showRight" :fixed="false" ref="commodityPaging" v-model="commodity" @query="queryList"
					class="right-wrapper-commodity">

					<view class="search-wrapper" slot="top">
						<xls-search placeholder="请输入" marLeft="-5em" bgColor="#EFEFF4" inputColor="#fff"
							@comfirn="stratesSearch" />

						<view class="add-commodity">
							<u-icon name="plus-circle" color="#5241FF" size="40" />
							<view @click="goTo('commodity')">
								<span style="color: #5241FF; padding-left: 12px">添加商品</span>
							</view>
						</view>
					</view>

					<view class="xls-commodity__item" v-for="(item, index) in commodity" :key="index"
						@click="pitchCommodity(item)" :class="{'actvice-item':commodityId == item.commodityId}">
						<image :src="item.commodityImg" alt="" v-if="item.commodityImg"  class="left-img" />
						<image :src="`${$baseUrl}appV4/commodity/goods.png`" alt="" v-else class="left-img" />
						<view class="rightdetail">
							<view class="field">{{ item.commodityName }}</view>
							<view class="value">{{ item.suggestRetailPrice }}元</view>
						</view>
					</view>

					<xls-empty slot="empty" />

					<view class="cancel-btn-content" @click="showRight = !showRight" slot="bottom">
						取消
					</view>
				</z-paging>
			</u-popup>

			<!-- 库存 -->
			<u-popup :show="showFina" round="20" mode="center">
				<view class="fire-wrapper-r">
					<view class="fire-title">现有库存</view>
					<view class="fire-step">
						<u-number-box v-model="reperValue" input-width="75px" button-size="40px" min="0"
							iconStyle="fontSize: 17px" />
					</view>
					<view class="fire-step-btn">
						<view @click="showFina = false">取消</view>
						<view @click="(showFina = false), (railRepertory = reperValue)">
							确定
						</view>
					</view>
				</view>
			</u-popup>

			<!-- 补货记录 -->
			<u-popup :show="showRecords" closeable @close="showRecords=false">
				<view class="records-wrapper">
					<view class="header-wrapper">补货记录</view>
					
					<view class="main-explain-text">
						<view class="text">
							仅显示近30条补货记录,具体请前往
							<span class="records" @click="goTo('replenishmentRecord')">补货记录>></span>
						</view>
						<view class="device-rail">
							<span>
								当前设备：{{ deviceNumber }}-{{ shippingSpace }}-{{railNumber}}</span>
						</view>
					</view>

					<view v-if="recordsList.length" class="list-wrapper">
						<view v-for="(item, index) in recordsList" :key="index" class="list-item">
							<view class="entry-bd">
								<span class="right-wrapper">
									{{ item.placeName }}_{{ item.deviceNumber }}-{{item.shippingSpace}}-{{ item.railNumber }}
								</span>
								<span class="left-wrapper">
									<span v-show="item.nowQuantity>0">+</span>
									<span :style="{color:item.nowQuantity<0?'red':''}">
										{{item.nowQuantity}}
									</span>
									库存
								</span>
							</view>
							<view class="entry-bd-bottom">
								<span class="right-wrapper">操作人：{{ item.nickName }}</span>
								<span class="left-wrapper">{{ item.time }}</span>
							</view>
						</view>
					</view>
					<xls-empty v-else />
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		getDateAll
	} from "@/plugins/utilityClass";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	import {
		commodityController,
		deviceController,
		packageController
	} from "@/api/index.js";

	export default {
		data() {
			return {
				//搜索商品
				searchEnter: "",
				showRight: false,
				reperValue: "",
				//改库存
				showFina: false,
				//礼品信息
				commodityInfo: [],
				//商品列表
				commodity: [],
				loading: false,
				finished: false,
				page: 0,
				searchCommodity: "",
				//补货记录
				recordsList: [],
				paged: 0,
				finish: false,
				loadinged: false,
				showRecords: false,
				//场地设备表
				activePlace: 0,
				placeList: [],
				pagePlace: 0,
				onEarth: false,
				searchValue: "",
				pageDevice: 0,
				finishDevice: false,
				placeDevice: [],
				showBottom: false,
				showRail: false,
				railList: [],
				deviceNumber: "",
				shippingSpace: "",
				railNumber: "",
				typeName: "",
				railRepertory: "", //现有库存
				commodityId: "",
				commodityName: "",
				eggDetail: {
					price: "",
					currency: "",
					railEnable: "",
					gameTime: "",
					railSpareRepertory: "",
				},
				radioDevice: "1",
			};
		},
		onLoad(option) {
			if (option.params) {
				const {deviceNumber,shippingSpace,railNumber,typeName,commodityName} = JSON.parse(option.params)
				this.deviceNumber = deviceNumber;
				this.shippingSpace = shippingSpace;
				this.railNumber = railNumber;
				this.typeName = typeName;
				this.commodityName = commodityName;
				this.getMsg();
			}
			//场地
			this.getPlaceList();
		},
		methods: {
			stopKeyborad() {
				uni.hideKeyboard();
			},
			queryList(pageNo, pageSize) {
				commodityController.getCommodity({
					commodityDtoFilter: {
						commodityName: this.searchValue
					},
					pageParam: {
						pageNum: pageNo,
						pageSize: pageSize
					}
				}).then(res => {
					this.$refs.commodityPaging.complete(res.data.dataList);
				})
			},
			goTo(route) {
				if(route == 'replenishmentRecord') {
					this.$goTo("/pages/mainPackages/personal/replenishmentRecord/index")
					return
				}
				if(route == 'commodity') {
					this.$goTo("/pages/mainPackages/home/commodity/operate")
				}
			},
			
			//货道详情
			async getMsg() {
				//扭蛋机  娃娃机也能查好像
				let res = await deviceController.getEggDeviceRailInfo({
					deviceNumber: this.deviceNumber,
					shippingSpace: this.shippingSpace||1,
					railNumber: this.railNumber||1,
				});
				if (res.code == 200) {
					res.data['commodityName'] = this.commodityName;
					this.pickerRail(res.data);
				}
			},
			//选择货道
			pickerRail(rail) {
				this.eggDetail = {
					price: rail.price,
					currency: rail.currency,
					railEnable: rail.railEnable,
					gameTime: rail.gameTime,
					railSpareRepertory: rail.railSpareRepertory,
				};
				this.commodityId = rail.commodityId;
				this.commodityName = rail.commodityName;
				this.railRepertory = rail.railRepertory;
				this.deviceNumber = rail.deviceNumber;
				this.shippingSpace = rail.shippingSpace;
				this.railNumber = rail.railNumber;
				this.commodityInfo.typeName =
					`${this.typeName}_${this.deviceNumber}-${this.shippingSpace}-${this.railNumber}`;
				this.commodityInfo.deviceNumber = this.deviceNumber;
				this.commodityInfo.railNumber = this.railNumber;
				this.commodityInfo.commodityName = this.commodityName;
				this.commodityInfo.commodityId = this.commodityId;
				this.showRail = false;
			},
			
			//清空库存
			clearRailRepertory() {
				if (this.railRepertory == 0) {
					this.$toast("该库存不大于0,不能点击清除此库存");
				} else {
					this.$modal("确定要清空此设备库存,清空后库存数将成为0?",{
							title: "温馨提示",
							confirmColor: "#f73e3e",
							confirmText: "清空",
						})
						.then(() => {
							this.railRepertory = 0;
						})
						.catch(() => {});
				}
			},
			
			//场地
			scorllEvent(event) {
				var scrollTop = event.target.scrollTop;
				var scrollHeight = event.target.scrollHeight;
				var clientHeight = event.target.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getPlaceList();
					}
				}
			},
			
			//场地
			getPlaceList: debounceFun(async function() {
				let res = await packageController.getPlaceDeviceNum({
					page: ++this.pagePlace,
					size: 20,
					placeName: encodeURIComponent(this.searchValue),
				});
				if (res.code == 200) {
					if (res.data != null) {
						if (res.data.length < 20) {
							this.onEarth = true;
						} else {
							this.onEarth = false;
						}
						if (this.pagePlace > 1) {
							this.placeList = [...this.placeList, ...res.data];
						} else {
							this.placeList = res.data;
							// if (!this.$route.query.deviceNumber) {
							// 	this.getDevice(this.placeList[0].placeId);
							// }
						}
					}
				}
			}, 500),
			
			//场地设备列表
			async getDevice(placeId) {
				this.activePlace = placeId;
				let res = await deviceController.getList({
					page: 1,
					size: 100,
					placeId: this.activePlace,
					search: ""
				});
				if (res.code == 200) {
					this.placeDevice = [];
					res.data.List.forEach((element) => {
						if (element.deviceList) {
							element.deviceList.forEach((item) => {
								item["placeName"] = element.placeName;
								item["placeId"] = element.placeId;
								this.placeDevice.push(item);
							});
						}
					});
				}
			},
			
			stratesSearch(search) {
				if (this.showRight) {
					this.searchCommodity = search;
					this.$refs.commodityPaging.reload();
				} else if (this.showBottom) {
					this.searchValue = search;
					this.pagePlace = 0;
					this.onEarth = false;
					this.getPlaceList();
				}
			},
			
			//选择设备
			pitchDevice(device) {
				this.deviceNumber = device.deviceNumber;
				this.typeName = device.typeName;
				
				deviceController.getDeviceRailList({
					deviceNumber: device.deviceNumber,
				}).then((res) => {
					if (res.code == 200) {
						this.railList = res.data;
						this.showBottom = false;
						this.showRail = true;
					}
				});
			},
			
			//选择商品
			pitchCommodity(params) {
				this.commodityInfo.commodityName = params.commodityName;
				this.commodityName = params.commodityName;
				this.commodityInfo.commodityId = params.commodityId;
				this.commodityId = params.commodityId;
				this.showRight = !this.showRight;
			},
			
			//保存修改
			confirmEdit() {
				if (!this.commodityInfo.typeName) {
					return this.$toast("请选择设备");
				} else if (!this.commodityInfo.commodityName) {
					return this.$toast("请选择商品");
				} else if (!this.railRepertory) {
					return this.$toast("请选择库存");
				}
				
				deviceController.editEggDeviceRailInfo({
						deviceNumber: this.deviceNumber,
						railNumber: this.railNumber,
						shippingSpace: this.shippingSpace,
						commodityId: this.commodityId,
						railRepertory: this.railRepertory,
						price: Math.round(this.eggDetail.price * 100),
						currency: this.eggDetail.currency,
						railEnable: this.eggDetail.railEnable,
						gameTime: this.eggDetail.gameTime ? this.eggDetail.gameTime : 0,
						railSpareRepertory: this.eggDetail.railSpareRepertory,
					})
					.then((res) => {
						if (res.code == 200) {
							this.$toast("修改成功");
						}
					})
					.catch((res) => {});
			},
			
			
			//补货记录
			async getRecordList() {
				this.showRecords = !this.showRecords;
				let res = await deviceController.replenishmentList({
					page: 1,
					size: 50,
					startTime: getDateAll(0),
					endTime: getDateAll(0),
					search: this.deviceNumber,
				});
				if (res.code == 200) {
					this.recordsList = res.data.dataList;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	//定位 层叠
	.fixed-header {
		width: 100%;
		height: 48px;
		position: relative;
		top: 0;
		z-index: 9999999;
	}

	//占位盒子 方案二：给header 加相对定位 position: relative;top: 50px;
	.main-content {
		width: 100%;
		
		.picker-item-wrapper {
			margin-top: 14px;
		}

		.body-main-wrapper {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			background: #fff;

			.body-main {
				width: 95%;
				height: 50px;
				display: flex;

				.main-title {
					width: 25%;
					height: 50px;
					font-size: 16px;
					display: flex;
					align-items: center;
				}

				.main-text {
					width: 69%;
					height: 50px;
					font-size: 16px;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}

				.main-icon {
					width: 6%;
					height: 50px;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					img {
						width: 14px;
						opacity: 0.5;
					}
				}
			}
		}
	}

	//弹出-商品
	.right-wrapper-commodity {
		width: 80vw;
		max-width: 1200rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

		.xls-commodity__item {
			padding: 0 10px;
			display: flex;
			box-sizing: border-box;
			border-bottom: 1px solid #e5e5e5;

			.left-img {
				width: 88rpx;
				height: 88rpx;
				margin: 20rpx;
			}

			.rightdetail {
				font-size: 15px;
				padding: 10px 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				box-sizing: border-box;
			}
		}

		.add-commodity {
			padding: 0 10px;
			background: #fff;
			font-weight: 700;
			font-size: 16px;
			height: 44px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #e5e5e5;
		}

		.cancel-btn-content {
			width: 100%;
			height: 44px;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 16px;
			color: #010101;
			border-top: 1px solid #e5e5e5;
		}
	}

	//库存
	.fire-wrapper-r {
		width: 270px;
		background: #fff;
		border-radius: 12px;

		.fire-title {
			width: 100%;
			margin-top: 20px;
			height: 35px;
			display: flex;
			justify-content: center;
			font-size: 17px;
			font-weight: 800;
		}

		.fire-step {
			width: 100%;
			height: 68px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid #e5e5e5;
		}

		.fire-step-btn {
			width: 100%;
			height: 50px;
			display: flex;
			font-size: 15px;
			text-align: center;
			line-height: 50px;

			:nth-child(1) {
				width: 50%;
				height: 50px;
			}

			:nth-child(2) {
				width: 50%;
				height: 50px;
				border-left: 1px solid #e5e5e5;
				color: #5241FF;
			}
		}
	}

	//设备
	.title-wrapper {
		font-size: 16px;
		text-align: center;
		line-height: 45px;
		border-bottom: 1px solid #f5f6f7;
	}

	.device-main-wrapper {
		height: 420px;
		width: 100%;
		display: flex;
		border-top: 1px solid #f5f6f7;
		box-sizing: border-box;

		.left-wrapper {
			max-width: 150px;
			min-width: 100px;
			background: #efeff5;
			border: #e5e5e5 1px solid;
			box-sizing: border-box;
			overflow-y: scroll;

			.smallItem {
				color: #8f8f94;
				box-sizing: border-box;
				border-bottom: 1px solid #e1e1e7;
				border-left: #efeff5 4px solid;
				height: 50px;
				line-height: 50px;
				font-size: 17px;
				padding: 0 10px 0 15px;
				text-overflow: ellipsis;
				/* ellipsis:显示省略符号来代表被修剪的文本  string:使用给定的字符串来代表被修剪的文本*/
				white-space: nowrap;
				/* nowrap:规定段落中的文本不进行换行   */
				overflow: hidden;
				/*超出部分隐藏*/
			}

			.activeBtn {
				border-left: #5241FF 4px solid;
				color: #5241FF;
				background: #fff;
				border-bottom: 1px solid #fff;
				box-sizing: border-box;
			}
		}

		.right-wrapper {
			flex: 1;
			box-sizing: border-box;
			overflow-y: scroll;

			.item-content {
				height: 50px;
				width: 100%;

				.item {
					height: 50px;
					width: 92%;
					margin: 0 auto;
					font-size: 15px;
					line-height: 50px;
					border-bottom: #e5e5e5 1px solid;
				}
			}
		}
	}

	.actvice-item {
		color: #5241FF;
		background: #f5f6f7;
	}

	.rail-wrapper {
		padding: 12px;
		height: 320px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		.rail-i-wrapper {
			width: 26%;
			border: 1px solid rgb(233, 229, 229);
			padding: 10px;
			height: 70px;
			margin-bottom: 12px;
			border-radius: 6px;
		}

		.rail-a-style {
			border: 1px solid #5241FF;
			color: #5241FF;
		}

		.rail {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			img {
				width: 50px;
				height: 50px;
			}

			.text {
				font-size: 15px;
				line-height: 25px;
			}
		}
	}

	.link-list-wrapper {
		margin-top: 10px;
		overflow: hidden;
		padding: 0 2.5%;
		color: #5241FF;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.disable {
			pointer-events: none;
			color: #d9d9d9;
		}
	}

	.btn-wrap-content {
		margin-top: 25px;
		padding: 0 2.5%;

		.btn-style {
			background: #5241FF;
			border-radius: 4px;
			color: #fff;
			font-size: 17px;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.records-wrapper {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #fff;

		.header-wrapper {
			line-height: 50px;
			font-size: 16px;
			text-align: center;
		}

		.main-explain-text {
			font-size: 12px;
			padding: 0px 12px 8px;

			.text {
				color: #999;
				margin-bottom: 6px;
				text-align: right;

				.records {
					margin-left: 5px;
					color: #5241FF;
				}
			}

			.device-rail {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}

		.list-wrapper {
			flex: 1;
			padding-left: 10px;
			overflow-y: scroll;

			.list-item {
				padding: 15px 10px 15px 0;
				border-top: 1px solid #e5e5e5;
			}

			.entry-bd {
				display: flex;
				align-items: center;
				font-size: 15px;
			}

			.entry-bd-bottom {
				color: #9f9f9f;
				font-size: 13px;
				padding-top: 6px;
				display: flex;
				align-items: center;
			}

			.right-wrapper {
				flex: 1;
				padding-right: 12px;
			}
		}
	}

	.u-cell {
		padding-left: 0;
		padding-right: 0;
	}

	::v-deep .xls-field__control {
		text-align: right !important;
		font-size: 15px;
	}
</style>