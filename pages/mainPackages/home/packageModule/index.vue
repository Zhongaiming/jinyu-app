<template>
	<z-paging ref="mealPaging" v-model="dataList" @query="queryList">
		<view slot="top">
			<jy-navbar title="套餐设置"></jy-navbar>
			<view class="headerBox">
				<view class="header-item" @click.stop="showRecomList" v-hasPermi="['app:meal:recommendMoney:read']">
					<view class="image-box">
						<image :src="`${$baseUrl}appV4/setImage/top-up.png`" alt="" class="image" mode="widthFix" />
					</view>
					<p class="header-title">
						<span>推荐充值金额</span>
						<span class="question" @click.stop="(mealNotice = !mealNotice), (noticeItem = 1)">
							<view class="introduce">?</view>
						</span>
					</p>
					<p class="header-tips">{{ recommendPrice }}元</p>
				</view>

				<view class="header-item" @click="goTo('currency')" v-hasPermi="['app:meal:currency:read']">
					<view class="image-box">
						<image :src="`${$baseUrl}appV4/setImage/currency.png`" alt="" class="image" mode="widthFix" />
					</view>
					<p class="header-title">
						<span>游戏币通用</span>
						<span class="question" @click.stop="(mealNotice = !mealNotice), (noticeItem = 2)">
							<view class="introduce">?</view>
						</span>
					</p>
					<p class="header-tips">已设置{{ groupNum }}组场地</p>
				</view>
				<view class="header-item" @click="goTo('balance')" v-hasPermi="['app:meal:balance:read']">
					<view class="image-box">
						<image :src="`${$baseUrl}appV4/setImage/balance.png`" alt="" class="image" mode="widthFix" />
					</view>
					<p class="header-title">
						<span>余额通用</span>
						<span class="question" @click.stop="(mealNotice = !mealNotice), (noticeItem = 3)">
							<view class="introduce">?</view>
						</span>
					</p>
					<p class="header-tips">已设置{{ balanceNum }}组场地</p>
				</view>
			</view>
		</view>

		<!-- 场地 -->
		<view class="body-box">
			<transition name="transitionUp" mode="out-in">
				<view class="title-box" v-show="!searchShow">
					<span class="text">服务/充值套餐</span>
					<view class="right-box">
						<span class="btn" @click="searchShow = !searchShow">
							<u-icon name="search" class="icon" size="36" />搜索
						</span>
						<span class="btn btn-batchSet">
							<span class="svg-icon">|</span>
							<span v-show="!showAllCheck" class="icon-style" @click="clickCheck()">
								<u-icon name="list-dot" size="36" class="icon" />
								批量设置
							</span>

							<span v-show="showAllCheck" class="icon-style" @click="clickCheck()">
								<u-icon name="close-circle" size="36" class="icon" />
								取消设置
							</span>
						</span>
					</view>
				</view>
			</transition>

			<transition name="transition" mode="out-in">
				<view class="search-box" v-show="searchShow">
					<view class="search-icon">
						<i class="iconfont icon-sousuo1" style="font-size: 15px"></i>
					</view>
					<input type="text" v-model="searchValue" placeholder="输入搜索场地名称" @blur="confirmSearch"
						@keyup.13="confirmSearch" />
					<view class="cancel" @click="cancelSearch">取消</view>
				</view>
			</transition>
		</view>

		<view class="place-content" :class="{'place-all': showAllCheck}">
			<u-checkbox-group v-model="checkPlaceGroup" placement="column">
				<view class="place-list" v-for="(place, index) in dataList" :key="index">
					<u-checkbox :name="place.placeId" activeColor="#5241FF" v-show="showAllCheck" shape="circle"
						iconSize="32" labelSize="36" size="38"></u-checkbox>
					<span class="name text-over">{{ place.placeName }}</span>
					<view class="count" @click="goToEdit(place)">
						<span class="deviceNum">{{ place.deviceNum }}台</span>
						<u-icon name="arrow-right" color="#a2a2a6" size="32" />
					</view>
				</view>
			</u-checkbox-group>
		</view>
		<xls-empty slot="empty" />
		<view class="all-check" v-show="showAllCheck" slot="bottom">
			<u-checkbox-group v-model="allCheckGroup" @change="allGroupChange">
				<u-checkbox activeColor="#5241FF" name="1" shape="circle" iconSize="32" labelSize="36" size="38">
					全选&nbsp;({{ `${checkPlaceGroup.length} 个` }})
				</u-checkbox>
			</u-checkbox-group>
			<view class="btn-comfrin" @click="goToEditMeal">确定</view>
		</view>
		<!-- 推荐金额 -->
		<u-popup :show="recommendMeal" mode="bottom" v-hasPermi="['app:meal:recommendMoney:read']">
			<view class="recommend-meal">
				<view class="header-box">
					<span @click="recommendMeal = !recommendMeal">取消</span>
					<span @click="setRecommendMeal" v-hasPermi="['app:meal:recommendMoney:edit']">确定</span>
				</view>
				<view class="picker">
					<view class="picker-items">
						<view class="picker-slot picker-slot-center" style="flex: 1 1 0%; -webkit-box-flex: 1">
							<view class="picker-slot-wrapper" style="height: 180px; transform: translateZ(0px)">
								<view class="picker-item" style="height: 36px; line-height: 36px"
									v-for="(item, index) in recommendMealList" :key="index"
									:class="{'picker-selected':pickerSelect == item}" @click="pickerSelect = item">
									{{ item }}
								</view>
							</view>
						</view>
						<view class="picker-center-highlight" style="height: 36px; margin-top: -18px"></view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 提示 -->
		<u-popup :show="mealNotice" round="20" mode="center">
			<view class="meal-notice">
				<view class="title">温馨提示</view>
				<view class="dialog-content" v-show="noticeItem == 1">
					<view class="tips-bg">
						<image :src="`${$baseUrl}appV4/setImage/suggest.png`" alt="" mode="widthFix" class="image" />
					</view>
					<p class="tips-text">
						用户充值时,推荐金额会出现标识,引导用户消费行为。10元和20元是充值高峰。
					</p>
				</view>
				<view class="dialog-content" v-show="noticeItem == 2">
					<view class="tips-texts">
						开启了“游戏币场地通用”的场地之间游戏币余币可以通用，用户的游戏币余币等于已开启的各场地余币之和。
						<span style="color: red">为了避免给用户造成困扰，请勿频繁开启/关闭场地通用。</span>
					</view>
				</view>
				<view class="dialog-content" v-show="noticeItem == 3">
					<view class="tips-texts">
						开启了“余额场地通用”的场地之间余额可以通用，用户的余额等于已开启的各场地余额之和。
						<span style="color: red">为了避免给用户造成困扰，请勿频繁开启/关闭场地通用。</span>
					</view>
				</view>
				<view class="btn-wrapper" @click="mealNotice = !mealNotice">
					我知道了
				</view>
			</view>
		</u-popup>
	</z-paging>
</template>

<script>
	import {
		packageController
	} from '@/api/index.js';

	export default {
		data() {
			return {
				searchShow: false,
				searchValue: "",
				dataList: [],
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
				//全选
				showAllCheck: false,
				checkPlaceGroup: [],
				allCheck: false,
				placeTotal: 0,
				// 
				allCheckGroup: [],
			};
		},
		async onLoad() {
			this.getList();
		},
		methods: {
			goTo(type) {
				return this.$toast("期待中~")
			},
			clickCheck() {
				this.showAllCheck = !this.showAllCheck
				this.allCheck = !this.allCheck
				this.checkPlaceGroup = []
			},
			
			async getList() {
				//推荐金额表
				let res = await packageController.getComboAmount();
				if (res.code == 200) {
					this.recommendMealList = res.data;
				}
				this.getRecommendMeal();
			},
			//推荐金额
			async getRecommendMeal() {
				let res = await packageController.getRecommendAmount();
				if (res.code == 200) {
					this.recommendPrice = res.data.recommendMoney;
				}
			},
			//设置推荐金额
			async setRecommendMeal() {
				let res = await packageController.editRecommendAmount({
					editAmount: Math.round(this.pickerSelect * 100), //推荐金额 单位角
				});
				if (res.code == 200) {
					this.recommendPrice = this.pickerSelect;
					this.recommendMeal = !this.recommendMeal;
					this.$toast("设置成功");
				}
			},
			showRecomList() {
				if (this.recommendMealList.length) {
					this.recommendMeal = !this.recommendMeal;
				} else {
					this.$modal("您还没有设置套餐，请设置后再设置推荐金额", {
						confirmText: "我知道了",
						showCancel: false
					});
				}
			},
			
			queryList(pageNo, pageSize) {
				packageController.getPlaceDeviceNum({
					page: pageNo,
					size: pageSize,
					placeName: this.searchValue ? encodeURIComponent(this.searchValue) : "",
				}).then(res => {
					this.$refs.mealPaging.complete(res.data);
				})
			},
			//场地搜索
			cancelSearch() {
				this.searchShow = !this.searchShow;
				this.searchValue = "";
				this.$refs.mealPaging.reload();
			},
			confirmSearch() {
				this.getdataList();
				this.$refs.mealPaging.reload();
			},
			allGroupChange(item) {
				if (item.length) {
					this.checkPlaceGroup = this.dataList.map(place => place.placeId)
				} else {
					this.checkPlaceGroup = [];
				}
			},
			goToEditMeal() {
				if (this.checkPlaceGroup.length) {
					this.$goTo("/pages/mainPackages/home/packageModule/packageOperate", "navigateTo", {
						placeId: String(this.checkPlaceGroup), //选中场地ID
						total: this.checkPlaceGroup.length, //场地数量
						deviceNum: this.checkPlaceGroup.length, //选中设备数量
					})
				} else {
					this.$toast("请至少选中一个场地~");
				}
			},
			goToEdit(place) {
				this.$goTo("/pages/mainPackages/home/packageModule/packageOperate", "navigateTo", {
					id: place.placeId,
					deviceNum: place.deviceNum
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
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

					.icon-style {
						display: flex;
						align-items: center;
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