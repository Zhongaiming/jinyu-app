<template>
	<view class="condition-screen-wrapper">
		<!-- 搜索框 -->
		<u-row class="search-wrapper">
			<u-col :span="1.5">
				<view class="back-style" @click="goTo()">
					<u-icon name="arrow-left" size="40" color="#999"></u-icon>
				</view>
			</u-col>
			<u-col :span="10">
				<view class="input-wrapper">
					<view class="main-input-wrapper">
						<u-icon name="search" size="40"></u-icon>
						<input v-model="enterValue" placeholder="输入设备编码或场地名称" @search="confirmSearch"
							@focus="focusSearch" class="input-style" />
					</view>
					<view class="text" v-show="searchType" @click="cancelSearch">
						取消
					</view>
				</view>
			</u-col>
			<u-col :span="0.5"></u-col>
		</u-row>
		<!-- 线上/线下 -->
		<view class="button-wrapper">
			<view v-for="(state, index) in stateList" :key="index" class="button-style"
				:class="{'active-button-style': onlineState == state.id}" @click="changeState(state)">
				{{ state.title }} {{getStateCount(state)}}
			</view>
		</view>
		<!-- 场地/设备类型 -->
		<view class="place-type-wrapper">
			<view class="item-style" v-hasPermi="['app:place:index']" @click="showPlace = true">
				<span>{{ placeName }}</span>
				<u-icon name="arrow-down-fill" color="#5c5858" size="26" class="icons" />
			</view>
			<view class="line" v-hasPermi="['app:place:index']"></view>
			<view class="item-style" @click="showType = true">
				<span>{{ deviceTypeName }}</span>
				<u-icon name="arrow-down-fill" color="#5c5858" size="26" class="icons" />
			</view>
		</view>
		<!-- 说明 -->
		<view class="state-wrapper">
			<view class="left">
				<view>离线说明</view>
				<view class="icons" @click="showQuestion = !showQuestion">
					<u-icon name="question-circle" color="#8c8c8c" size="36" />
				</view>
				<view class="center" @click="showAscending = !showAscending">
					<u-icon name="arrow-upward" v-show="!showAscending" color="#8c8c8c" size="36" />
					<u-icon name="arrow-downward" v-show="showAscending" color="#8c8c8c" size="36" />
				</view>
			</view>
			<view>点击信号值刷新</view>
		</view>

		<!-- 场地 -->
		<u-popup :show="showPlace" mode="bottom">
			<view class="popup-wrapper">
				<view class="search-top-wrapper">
					<view class="title-wrapper">
						<view class="side-style" @click="showPlace = false">返回</view>
						<view class="title">选择场地</view>
						<view class="side-style"></view>
					</view>
					<search-input placeholder="请输入场地名称" marLeft="-5.5em" @stratesSearch="stratesSearch"></search-input>
				</view>

				<view class="place-list-wrapper">
					<view class="place-style" @click="checkPlace('全部')">
						<view>全部场地</view>
						<view class="right">
							<view class="success">
								<u-icon name="success" color="#5241FF" size="18" v-show="!placeId" />
							</view>
						</view>
					</view>
					<u-list v-model="loading" :finished="onEarth" finished-text="没有更多了" @load="getList">
						<view class="place-style" v-for="item in placeList" :key="item.placeId"
							:style="!item.deviceNum ? { opacity: ' 0.5' } : ''" @click="checkPlace(item)">
							<view>{{ item.placeName }}</view>
							<view class="right">
								<view>{{ item.deviceNum }}台</view>
								<view class="success">
									<u-icon name="success" color="#5241FF" size="18" v-show="placeId == item.placeId" />
								</view>
							</view>
						</view>
					</u-list>
					<no-data v-show="!placeList.length"></no-data>
				</view>
			</view>
		</u-popup>
		<!-- 类型 -->
		<u-popup :show="showType" mode="bottom">
			<view class="popup-wrapper">
				<view class="search-top-wrapper">
					<view class="title-wrapper">
						<view class="side-style" @click="showType = false">返回</view>
						<view class="title">选择设备类型</view>
						<view class="side-style"></view>
					</view>
				</view>
				<view class="place-list-wrapper">
					<view class="place-style" @click="checkType('设备')">
						<view>全部类型</view>
						<view>
							<u-icon name="success" color="#5241FF" size="18" v-show="!deviceType" />
						</view>
					</view>

					<view class="place-style" v-for="item in deviceTypeList" :key="item.id" @click="checkType(item)">
						<view>{{ item.typeName }}</view>
						<view>
							<u-icon name="success" color="#5241FF" size="18" v-show="deviceType == item.id" />
						</view>
					</view>

					<!-- <on-earth /> -->
				</view>
			</view>
		</u-popup>
		<!-- 疑问弹出层 -->
		<u-popup :show="showQuestion" mode="center" round="20">
			<view class="popup">
				<view class="titB"><span>离线说明</span></view>
				<view class="contB">
					<view class="textB">
						<p>
							如遇设备离线，可根据以下情况进行排查，如需协助，请联系平台客服
						</p>
						<p class="title">可能导致设备离线、信号弱的原因：</p>
						<p>1、场地移动信号质量差(盒子使用手机GPRS信号通讯)</p>
						<p>2、场地移动基站容量不够(需联系移动运营商解决)</p>
						<p>
							3、天线摆放位置不佳(如在密封机台内、金属容器内等)或天线接头松动(重新拧紧即可)
						</p>
						<p>4、设备故障(请联系客服更换)</p>
						<p>5、无线信号的干扰源(如电磁波等)</p>
						<p class="title">可优化方案：</p>
						<p>1、把天线从密封的机台里面拉上来,或放到设备的玻璃柜里面</p>
						<p>2、不要将天线放在四周均为金属的地方(金属会严重干扰移动信号)</p>
						<p>3、更换长天线</p>
						<p class="finish">4、更换WIFI版本设备</p>
					</view>
				</view>
				<view class="filter"></view>
				<view class="footerB" @click="showQuestion = !showQuestion">
					<span>我知道了</span>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import {
	// 	getPlaceDeviceNum
	// } from "@/utils/api/place";
	// import {
	// 	getDevicetype
	// } from "@/utils/api/device";
	export default {
		props: {
			deviceNum: {
				type: Number | String,
				default: 0
			},
			onlineNum: {
				type: Number | String,
				default: 0
			},
		},
		data() {
			return {
				enterValue: "",
				searchType: false,
				// 在线/离线
				onlineState: null,
				stateList: [{
						id: null,
						title: "全部"
					},
					{
						id: 0,
						title: "离线"
					},
					{
						id: 1,
						title: "在线"
					},
				],
				// 场地/类型
				placeName: "全部场地",
				placeId: null,
				showPlace: false,
				page: 0,
				loading: false,
				onEarth: false,
				searchValue: "",
				placeList: [],

				showType: false,
				deviceType: null,
				deviceTypeName: "设备类型",
				deviceTypeList: [],
				showQuestion: false,
				showAscending: false,
			};
		},
		// created() {
		// 	this.getType();
		// },
		methods: {
			goTo() {
				uni.navigateBack();
			},
			getStateCount(state) {
				return state.id == null ?
					this.deviceNum :
					state.id == 0 ?
					this.deviceNum - this.onlineNum :
					this.onlineNum;
			},
			focusSearch() {
				this.searchType = true;
				this.$nextTick(() => {
					try {
						const input =
							document.getElementsByClassName("u-field__control")[0];
						input.focus();
					} catch (params) {}
				});
			},
			confirmSearch() {
				this.getParams();
			},
			cancelSearch() {
				this.searchType = false;
				this.enterValue = "";
				this.getParams();
			},
			// 离线/在线
			changeState(state) {
				if (state.id == this.onlineState) {
					return;
				}
				this.onlineState = state.id;
				this.getParams();
			},
			// 场地
			stratesSearch(search) {
				this.searchValue = search;
				this.page = 0;
				this.onEarth = false;
				this.getList();
			},
			async getList() {
				this.loading = true;
				let res = await getPlaceDeviceNum({
					page: ++this.page,
					size: 20,
					placeName: encodeURIComponent(this.searchValue),
				});
				this.loading = false;
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data != null) {
						if (res.data.data.length < 20) {
							this.onEarth = true;
						} else {
							this.onEarth = false;
						}
						if (this.page > 1) {
							this.placeList = [...this.placeList, ...res.data.data];
						} else {
							this.placeList = res.data.data;
						}
					}
				}
			},
			checkPlace(params) {
				if (params == "全部") {
					this.placeId = null;
					this.placeName = "全部场地";
				} else {
					this.placeId = params.placeId;
					this.placeName = params.placeName;
				}
				this.showPlace = false;
				this.getParams();
			},
			// 类型
			async getType() {
				let res = await getDevicetype({
					page: 1,
					size: 1000
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.deviceTypeList = res.data.data;
				}
			},
			checkType(params) {
				if (params == "设备") {
					this.deviceType = null;
					this.deviceTypeName = "设备类型";
				} else {
					this.deviceType = params.id;
					this.deviceTypeName = params.typeName;
				}
				this.showType = false;
				this.getParams();
			},
			getParams() {
				let params = {
					onlineState: this.onlineState,
					placeId: this.placeId,
					deviceType: this.deviceType,
					search: this.enterValue ? encodeURIComponent(this.enterValue) : null,
				};
				this.$parent.searchParams(params);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.condition-screen-wrapper {
		width: 100%;

		.search-wrapper {
			width: 100%;
			height: 50px;
			background: #fff;

			.input-wrapper {
				height: 34px;
				width: 100%;
				display: flex;
				align-items: center;


				.main-input-wrapper {
					height: 34px;
					flex: 1;
					display: flex;
					align-items: center;
					padding: 5px 5px 5px 12px;
					background-color: #f7f8fa;
					border-radius: 5px;

					.input-style {
						flex: 1;
						padding-left: 5px;
						font-size: 14px;
					}
				}

				.text {
					min-height: 50px;
					width: 12%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 16px;
					font-weight: 350;
					color: #5241ff;
				}
			}

			.back-style {
				min-height: 50px;
				width: 100%;
				background: #fff;
				@include center-flex();
			}
		}

		//在线/离线
		.button-wrapper {
			width: 100%;
			height: 49px;
			display: flex;
			background: #fff;
			border-bottom: 0.1px #e6e3e3 solid;
			justify-content: space-around;
			align-items: center;
			font-size: 12px;

			/*按钮样式*/
			/*未选中时*/
			.button-style {
				width: 28%;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border: 1px #8c8c8c solid;
				border-radius: 5px;
				color: #8c8c8c;
				background: #fff;
			}

			/*选中时*/
			.active-button-style {
				width: 28%;
				height: 30px;
				border: 1px #5241ff solid;
				border-radius: 5px;
				color: #5241ff;
				background: #fff;
			}
		}

		//场地/类型
		.place-type-wrapper {
			width: 100%;
			height: 45px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;

			.item-style {
				width: 100px;
				height: 45px;
				font-size: 14px;
				color: rgb(92, 88, 88);
				text-align: center;
				display: flex;
				align-items: center;
				line-height: 45px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.icons {
					// transform: rotate(90deg);
					margin-left: 3px;
				}
			}

			.line {
				height: 30px;
				width: 1px;
				background: #e6e3e3;
			}
		}

		//场地弹出
		.popup-wrapper {
			width: 100%;
			position: relative;
			display: flex;
			flex-direction: column;

			.search-top-wrapper {
				background: #fff;
				position: sticky;
				top: 0;
				z-index: 99;
			}

			.title-wrapper {
				height: 48px;
				padding: 0 2.5%;
				display: flex;
				line-height: 48px;
				border-bottom: 1px solid #f0eff1;

				.side-style {
					width: 50px;
					color: #5241ff;
					font-size: 16px;
					font-weight: 400;
				}

				.title {
					color: #262626;
					flex: 1;
					font-size: 16px;
					text-align: center;
				}
			}

			.place-list-wrapper {
				.place-style {
					min-height: 50px;
					border-bottom: 1px solid #f0eff1;
					display: flex;
					justify-content: space-between;
					padding: 0 2.5%;
					color: #262626;
					font-size: 16px;
					font-weight: 400;
					align-items: center;

					.right {
						display: flex;
						align-items: center;
						text-align: right;
						white-space: nowrap;
					}

					.success {
						width: 30px;
					}
				}

				span {
					margin: 0 8px;
				}
			}
		}

		//说明
		.state-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #f5f6f7;
			color: #8c8c8c;
			font-size: 14px;
			padding: 12px 12px 6px;

			.left {
				display: flex;
				align-items: center;

				.icons {
					padding-left: 3px;
				}

				.center {
					padding-left: 8px;
				}
			}
		}

		//question弹出层
		.popup {
			width: 320px;
			height: 400px;
			background: #fff;

			.titB {
				height: 50px;
				width: 100%;
				font-size: 19px;
				font-weight: 700;
				line-height: 50px;
				color: #262626;
				text-align: center;
			}

			.contB {
				height: 300px;
				width: 100%;

				.textB {
					overflow-y: auto;
					height: 300px;
					width: 90%;
					margin: 0 auto;
					color: #999;
					font-size: 14px;

					p {
						margin: 0;
						line-height: 21px;
					}

					.title {
						color: #000;
						padding: 5px 0;
					}

					.finish {
						margin-bottom: 20px;
					}
				}
			}

			.footerB {
				height: 50px;
				width: 100%;
				text-align: center;
				font-size: 18px;
				color: #5241ff;
				line-height: 50px;
			}

			.filter {
				background: #fff;
				bottom: 50px;
				height: 20px;
				left: 0;
				opacity: 0.8;
				position: absolute;
				width: 100%;
			}
		}
	}

	.u-search {
		padding: 0;
	}
	
	
	//场地弹出
	.placeContent {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	
		.place-content {
			flex: 1;
			overflow-y: scroll;
		}
	
		.top {
			height: 48px;
			padding: 0 2.5%;
			display: flex;
			line-height: 48px;
			border-bottom: 1px solid #f0eff1;
	
			view {
				width: 33%;
				height: 48px;
			}
	
			.back {
				color: #5241ff;
				font-size: 16px;
				font-weight: 400;
			}
	
			.title {
				color: #262626;
				font-size: 16px;
				text-align: center;
			}
		}
	
		.positionTop {
			position: sticky;
			top: 0px;
			background: #fff;
			z-index: 6666;
		}
	
		.position {
			position: sticky;
			top: 50px;
			background: #fff;
			z-index: 6666;
		}
	
		.placeList {
			min-height: 50px;
			border-bottom: 1px solid #f0eff1;
			display: flex;
			justify-content: space-between;
			padding: 0 2.5%;
			color: #262626;
			font-size: 16px;
			font-weight: 400;
			align-items: center;
	
			.right {
				display: flex;
				align-items: center;
				text-align: right;
				white-space: nowrap;
			}
	
			.success {
				width: 30px;
			}
		}
	
		span {
			margin: 0 8px;
		}
	}
</style>