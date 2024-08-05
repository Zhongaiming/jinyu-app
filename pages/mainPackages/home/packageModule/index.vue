<template>
	<div class="setMeal">
		<jy-navbar title="套餐设置"></jy-navbar>
		<div class="headerBox">
			<div class="header-item" @click.stop="showRecomList" v-hasPermi="['app:meal:recommendMoney:read']">
				<div class="image-box">
					<image :src="`${$baseUrl}appV4/setImage/top-up.png`" alt="" class="image" mode="widthFix"/>
				</div>
				<p class="header-title">
					<span>推荐充值金额</span>
					<span class="question" @click.stop="(mealNotice = !mealNotice), (noticeItem = 1)">
						<div class="introduce">?</div>
					</span>
				</p>
				<p class="header-tips">{{ recommendPrice }}元</p>
			</div>

			<div class="header-item" @click="
            $router.push({
              path: '/setMeal/moreMoney',
              query: { opition: '余币' },
            })
          " v-hasPermi="['app:meal:currency:read']">
				<!-- <div class="header-item" @click="$refs.development.inDevelopment()"> -->
				<div class="image-box">
					<image :src="`${$baseUrl}appV4/setImage/currency.png`" alt="" class="image" mode="widthFix"/>
				</div>
				<p class="header-title">
					<span>游戏币通用</span>
					<span class="question" @click.stop="(mealNotice = !mealNotice), (noticeItem = 2)">
						<div class="introduce">?</div>
					</span>
				</p>
				<p class="header-tips">已设置{{ groupNum }}组场地</p>
			</div>
			<div class="header-item" @click="
            $router.push({
              path: '/setMeal/moreMoney',
              query: { opition: '余额' },
            })
          " v-hasPermi="['app:meal:balance:read']">
				<!-- <div class="header-item" @click="$refs.development.inDevelopment()"> -->
				<div class="image-box">
					<image :src="`${$baseUrl}appV4/setImage/balance.png`" alt="" class="image" mode="widthFix"/>
				</div>
				<p class="header-title">
					<span>余额通用</span>
					<span class="question" @click.stop="(mealNotice = !mealNotice), (noticeItem = 3)">
						<div class="introduce">?</div>
					</span>
				</p>
				<p class="header-tips">已设置{{ balanceNum }}组场地</p>
			</div>
		</div>

		<!-- 场地 -->
		<div class="body-box">
			<transition name="transitionUp" mode="out-in">
				<div class="title-box" v-show="!searchShow">
					<span class="text">服务/充值套餐</span>
					<div class="right-box">
						<span class="btn" @click="searchShow = !searchShow"><u-icon name="search" class="icon"
								size="36" />搜索</span>
						<span class="btn btn-batchSet">
							<!-- @click="$router.push('/setMeal/editSetmeal')" @click="$refs.develop.inDevelopment()"-->
							<span class="svg-icon">|</span>
							<span v-show="!showAllCheck" @click="
                    (showAllCheck = true),
                      (allCheck = false),
                      (checkPlaceGroup = [])
                  "><u-icon name="list-dot" size="36" class="icon" />批量设置</span>
							<span v-show="showAllCheck" @click="
                    (showAllCheck = false),
                      (allCheck = false),
                      (checkPlaceGroup = [])
                  "><u-icon name="close-circle" size="36" class="icon" />取消设置</span>
						</span>
					</div>
				</div>
			</transition>

			<transition name="transition" mode="out-in">
				<div class="search-box" v-show="searchShow">
					<div class="search-icon">
						<i class="iconfont icon-sousuo1" style="font-size: 15px"></i>
					</div>
					<!-- <form action="javascript:void 0" style="flex:1"> -->
					<input type="text" v-model="searchEnter" placeholder="输入搜索场地名称" @blur="confirmSearch"
						@keyup.13="confirmSearch" />
					<!-- </form> -->
					<div class="cancel" @click="cancelSearch">取消</div>
				</div>
			</transition>
		</div>
		<div class="place-content" :class="showAllCheck ? 'place-all' : ''" v-if="placeList.length"
			@scroll="scorllEvent">
			<u-checkbox-group v-model="checkPlaceGroup" direction="horizontal" ref="checkboxGroup">
				<div class="place-list" v-for="(place, index) in placeList" :key="index">
					<u-checkbox :name="place.placeId" shape="square" v-show="showAllCheck" checked-color="#5241FF"
						@click="checkPlace"></u-checkbox>
					<span class="name text-over">{{ place.placeName }}</span>
					<div class="count" @click="
                $router.push({
                  path: '/setMeal/editSetmeal',
                  query: { id: place.placeId, deviceNum: place.deviceNum },
                })
              ">
						<span class="deviceNum">{{ place.deviceNum }}台</span>
						<u-icon name="arrow" color="#a2a2a6" size="16" />
					</div>
				</div>
				<!-- <on-earth v-show="onEarth" /> -->
			</u-checkbox-group>
		</div>
		<xls-empty v-else />
		<div class="all-check" v-show="showAllCheck">
			<!-- <u-checkbox v-model="allCheck" checked-color="#5241FF" shape="square"
				@click="$refs.checkboxGroup.toggleAll(allCheck)"> -->
				<!-- 全选&nbsp;({{ `${checkPlaceGroup.length}/${placeTotal}` }}) -->
			<!-- </u-checkbox> -->
			<div class="btn-comfrin" @click="goGroupPlace">确定</div>
		</div>
		<!-- 推荐金额 -->
		<u-popup v-model="recommendMeal" position="bottom" v-hasPermi="['app:meal:recommendMoney:read']">
			<div class="recommend-meal">
				<div class="header-box">
					<span @click="recommendMeal = !recommendMeal">取消</span>
					<span @click="setRecommendMeal" v-hasPermi="['app:meal:recommendMoney:edit']">确定</span>
				</div>
				<div class="picker">
					<div class="picker-items">
						<div class="picker-slot picker-slot-center" style="flex: 1 1 0%; -webkit-box-flex: 1">
							<div class="picker-slot-wrapper" style="height: 180px; transform: translateZ(0px)">
								<div class="picker-item" style="height: 36px; line-height: 36px"
									v-for="(item, index) in recommendMealList" :key="index"
									:class="pickerSelect == item ? 'picker-selected' : ''" @click="pickerSelect = item">
									{{ item }}
								</div>
							</div>
						</div>
						<div class="picker-center-highlight" style="height: 36px; margin-top: -18px"></div>
					</div>
				</div>
			</div>
		</u-popup>
		<!-- 提示 -->
		<u-popup v-model="mealNotice" round>
			<div class="meal-notice home-family">
				<div class="title">温馨提示</div>
				<div class="dialog-content" v-show="noticeItem == 1">
					<div class="tips-bg">
						<image :src="`${$baseUrl}appV4/setImage/suggest.png`" alt="" />
					</div>
					<p class="tips-text">
						用户充值时,推荐金额会出现标识,引导用户消费行为。10元和20元是充值高峰。
					</p>
				</div>
				<div class="dialog-content" v-show="noticeItem == 2">
					<div class="tips-texts">
						开启了“游戏币场地通用”的场地之间游戏币余币可以通用，用户的游戏币余币等于已开启的各场地余币之和。
						<span style="color: red">为了避免给用户造成困扰，请勿频繁开启/关闭场地通用。</span>
					</div>
				</div>
				<div class="dialog-content" v-show="noticeItem == 3">
					<div class="tips-texts">
						开启了“余额场地通用”的场地之间余额可以通用，用户的余额等于已开启的各场地余额之和。
						<span style="color: red">为了避免给用户造成困扰，请勿频繁开启/关闭场地通用。</span>
					</div>
				</div>
				<div class="btn-wrapper" @click="mealNotice = !mealNotice">
					我知道了
				</div>
			</div>
		</u-popup>
	</div>
</template>

<script>
	// import {
	// 	getPlaceDeviceNum,
	// 	getPlaceDeviceList
	// } from "@/utils/api/place";
	// import {
	// 	getComboAmount,
	// 	editRecommendAmount,
	// 	getRecommendAmount,
	// } from "@/utils/api/setMeal/udated";
	// import TopTab from "./setmealComps/topTab";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	// import local from "@/plugins/storage";

	export default {
		name: "setMeal",
		components: {
			// TopTab
		},
		data() {
			return {
				searchShow: false,
				searchEnter: "",
				placeList: [],
				//组数
				groupNum: 0,
				balanceNum: 0,
				//推荐金额列表
				recommendMeal: false,
				recommendMealList: [],
				pickerSelect: 20,
				//推荐金额
				recommendPrice: 0,
				//提示
				mealNotice: false,
				noticeItem: 1,
				//
				page: 0,
				onEarth: false,
				//全选
				showAllCheck: false,
				checkPlaceGroup: [],
				allCheck: false,
				placeTotal: 0,
			};
		},
		// async created() {
		// 	//推荐金额表
		// 	let res = await getComboAmount({});
		// 	if (res.data.data) {
		// 		this.recommendMealList = res.data.data;
		// 	}
		// 	this.getRecommendMeal();

		// 	getPlaceDeviceList().then((res) => {
		// 		this.placeTotal = res.data.data.length;
		// 	});
		// 	this.getPlacelist();
		// 	// this.groupNum = res.data.data.comboNum;
		// 	// this.balanceNum = res.data.data.comboNum;
		// },
		methods: {
			scorllEvent(event) {
				var scrollTop = event.target.scrollTop;
				var scrollHeight = event.target.scrollHeight;
				var clientHeight = event.target.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getPlacelist();
					}
				}
			},
			getPlacelist: debounceFun(async function() {
				let res = await getPlaceDeviceNum({
					page: ++this.page,
					size: 50,
					placeName: this.searchEnter ? encodeURIComponent(this.searchEnter) : "",
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data != null) {
						if (res.data.data.length < 50) {
							this.onEarth = true;
						} else {
							this.onEarth = false;
						}
						if (this.page > 1) {
							this.placeList = [...this.placeList, ...res.data.data];
						} else {
							this.placeList = res.data.data;
						}
						if (this.allCheck) {
							this.checkPlaceGroup = [];
							this.placeList.forEach((item) => {
								this.checkPlaceGroup.push(item.placeId);
							});
						}
					}
				}
			}, 500),

			//场地搜索
			cancelSearch() {
				this.searchShow = !this.searchShow;
				this.searchEnter = "";
				this.page = 0;
				this.onEarth = false;
				this.getPlacelist();
			},
			confirmSearch() {
				this.page = 0;
				this.onEarth = false;
				this.getPlacelist();
			},

			goGroupPlace() {
				if (this.checkPlaceGroup.length) {
					let deviceNum = 0;
					if (this.allCheck) {
						let device = local.get("device");
						deviceNum = device.deviceNum;
					} else {
						this.placeList.forEach((item) => {
							this.checkPlaceGroup.forEach((placeId) => {
								if (item.placeId == placeId) {
									deviceNum += item.deviceNum;
								}
							});
						});
					}
					this.$router.push({
						path: "/setMeal/editSetmeal",
						query: {
							placeId: this.allCheck && this.checkPlaceGroup.length == this.placeTotal ?
								"All" : String(this.checkPlaceGroup), //选中场地ID
							total: this.allCheck ?
								this.placeTotal : this.checkPlaceGroup.length, //场地数量
							deviceNum: deviceNum, //选中设备数量
						},
					});
				} else {
					this.$toast("请至少选中一个场地~");
				}
			},
			checkPlace() {
				if (this.checkPlaceGroup.length >= this.placeTotal) {
					this.allCheck = true;
				} else {
					this.allCheck = false;
				}
			},

			//推荐金额
			async getRecommendMeal() {
				let res = await getRecommendAmount({});
				if (res.data.code == 0 || res.data.msg) {
					this.recommendPrice = res.data.data.recommendMoney;
				}
			},
			//设置推荐金额
			async setRecommendMeal() {
				let res = await editRecommendAmount({
					editAmount: Math.round(this.pickerSelect * 100), //推荐金额 单位角
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.recommendPrice = this.pickerSelect;
					this.recommendMeal = !this.recommendMeal;
					this.$toast.success("设置成功");
				}
			},
			showRecomList() {
				if (this.recommendMealList.length) {
					this.recommendMeal = !this.recommendMeal;
				} else {
					this.$dialog.alert({
						title: "温馨提示",
						width: "270",
						message: "您还没有设置套餐，请设置后再设置推荐金额",
						confirmButtonText: "我知道了",
						confirmButtonColor: "1a87ff",
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.setMeal {
		width: 100%;
		height: 100vh;
		background: #f5f6f7;
		display: flex;
		flex-direction: column;
	}

	.headerBox {
		display: flex;
		justify-content: space-around;
		padding: 12px 0 20px 0;

		.header-item {
			flex: 1;
			text-align: center;

			.image-box {
				width: 70px;
				margin: 0 auto;

				.image {
					width: 70px;
				}
			}

			.header-title {
				align-items: center;
				color: #3d3d40;
				display: flex;
				font-size: 14px;
				font-weight: 700;
				justify-content: center;
				text-align: center;
			}

			.header-tips {
				color: #89898c;
				font-size: 11px;
				font-weight: 400;
				line-height: 16px;
				margin-top: 2px;
				text-align: center;
			}

			p {
				padding: 0;
				margin: 0;
			}

			.introduce {
				align-items: center;
				border: 1px solid #efeff4;
				border-radius: 50%;
				box-sizing: border-box;
				color: #fff;
				background: #d1d3de;
				display: flex;
				font-size: 12px;
				font-weight: 500;
				height: 16px;
				justify-content: center;
				margin-left: 5px;
				width: 16px;
			}
		}
	}

	.body-box {
		background: #fff;
		border-radius: 12px 12px 0 0;
		overflow-x: scroll;
		white-space: nowrap;
		height: 44px;
		overflow-y: hidden;
		border-bottom: 1px solid #f5f6f7;

		.title-box {
			display: flex;
			margin: 0 2.5%;
			border-bottom: 1px solid #f5f6f7;

			.text {
				color: #3d3d40;
				flex: 1;
				font-size: 16px;
				font-weight: 700;
				line-height: 44px;
			}

			.right-box {
				flex: 1;
				display: flex;
				align-items: center;
				height: 44px;
				justify-content: flex-end;

				.btn {
					color: #3d3d40;
					font-size: 13px;
					font-weight: 400;
					height: 100%;
					display: flex;
					align-items: center;
				}

				.icon {
					margin-right: 6px;
				}

				.btn-batchSet {
					margin-left: 12px;

					.svg-icon {
						color: #8c8c8f;
						font-weight: 700;
						margin-right: 12px;
					}
				}
			}
		}

		.search-box {
			padding: 6px 12px;
			position: relative;
			overflow: hidden;
			display: flex;
			align-items: center;

			input {
				flex: 1;
				border: 0;
				padding: 0 13px 0 35px;
				box-sizing: border-box;
				line-height: 32px;
				font-size: 14px;
				background: #f5f6f7;
				border-radius: 8px;
			}

			input::-webkit-input-placeholder {
				/* placeholder颜色  */
				color: #bebec3;
				/* placeholder字号  */
				font-size: 14px;
			}

			.cancel {
				padding-left: 12px;
				font-size: 14px;
				color: #3d3d40;
			}

			.search-icon {
				position: absolute;
				top: 50%;
				left: 24px;
				color: #bebec3;
				transform: translateY(-50%);
			}
		}
	}

	::-webkit-scrollbar {
		display: none;
	}

	.transition-enter-active,
	.transition-leave-active {
		transition: all 0.3s linear;
	}

	.transition-enter,
	.transition-leave-active {
		transform: translate3d(100%, 0, 0);
		opacity: 0;
	}

	.transitionUp-enter-active,
	.transitionUp-leave-active {
		transition: all 0.3s linear;
	}

	.transitionUp-enter,
	.transitionUp-leave-active {
		transform: translate3d(-100%, 0, 0);
		opacity: 0;
	}

	.place-content {
		flex: 1;
		overflow: scroll;
		padding: 0 10px;
		background: #fff;
	}

	.place-all {
		padding-bottom: 50px;
	}

	.place-list {
		border-bottom: 1px solid #f5f6f7;
		display: flex;
		width: 100%;
		height: 44px;
		line-height: 44px;

		.name {
			color: #3d3d40;
			flex: 1;
			font-weight: 400;
			font-size: 14px;
			margin-right: 12px;
		}

		.count {
			align-items: center;
			display: flex;
			color: #a2a2a6;
			font-size: 14px;
			font-weight: 400;

			.deviceNum {
				margin-right: 6px;
			}
		}
	}

	.recommend-meal {
		width: 100%;

		.header-box {
			align-items: center;
			color: #5241ff;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			font-size: 16px;
			justify-content: space-between;
			padding: 12px 15px;
			position: relative;
			border-bottom: 1px solid #e5e5e5;
		}

		.picker {
			overflow: hidden;
		}

		.picker-items {
			display: flex;
			font-size: 24px;
			justify-content: center;
			padding: 0;
			position: relative;
			text-align: right;

			.picker-slot.picker-slot-center {
				text-align: center;
			}

			.picker-slot {
				font-size: 18px;
				max-height: 100%;
				overflow: hidden;
				position: relative;
			}

			.picker-slot-wrapper {
				// backface-visibility: hidden;
				overflow: scroll;
				transition-duration: 0.3s;
				transition-timing-function: ease-out;
			}

			.picker-item {
				backface-visibility: hidden;
				box-sizing: border-box;
				color: #707274;
				height: 36px;
				left: 0;
				overflow: hidden;
				padding: 0 10px;
				position: relative;
				text-overflow: ellipsis;
				top: 0;
				transition-duration: 0.3s;
				white-space: nowrap;
				width: 100%;
			}

			// .picker-center-highlight{
			//     box-sizing: border-box;
			//     left: 0;
			//     pointer-events: none;
			//     position: absolute;
			//     top: 50%;
			//     width: 100%;
			//     color: #000;
			//     border-top: 1px solid #eaeaea;
			//     border-bottom: 1px solid #eaeaea;
			// }
			.picker-item.picker-selected {
				color: #5241ff;
				font-weight: 700;
				transform: translateZ(0) rotateX(0);
			}
		}
	}

	.meal-notice {
		width: 325px;

		.title {
			color: #262626;
			font-size: 19px;
			font-weight: 700;
			margin-top: 20px;
			text-align: center;
		}

		.btn-wrapper {
			border-top: 1px solid #e6e6e6;
			color: #5241ff;
			font-size: 18px;
			line-height: 49px;
			text-align: center;
		}

		.dialog-content {
			color: #262626;
			font-size: 14px;
			line-height: 20px;
			padding: 16px 20px 20px;
			text-align: justify;

			.image {
				width: 100%;
			}

			.tips-text {
				color: #666;
				font-size: 14px;
				line-height: 15px;
			}

			.tips-texts {
				color: #666;
				font-size: 14px;
				line-height: 22px;
			}
		}
	}

	//
	.all-check {
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 12px 20px 12px 10px;
		box-sizing: border-box;
		background: #fff;
		border-top: 1px solid #f0eeee;

		.btn-comfrin {
			font-size: 15px;
			background: #5241ff;
			padding: 3px 10px;
			border-radius: 6px;
			color: #fff;
		}
	}
</style>