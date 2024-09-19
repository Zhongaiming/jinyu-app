<template>
	<view class="meal-tuan-wrapper">
		<xls-jy-navbar title="创建团购套餐" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="top">
			<view class="left">创建套餐前要复制抖音门店团购ID关联到平台</view>
			<view class="right">查看案例</view>
		</view>
		<view class="row-cell">
			<view class="left">
				<span>选择门店</span>
				<u-icon name="question-circle" class="question" @click="tipMethod(1)" />
			</view>
			<view class="right" @click="$refs.storelist.showPlacePopup()">
				<span :class="{'color': storeNum != '请选择抖音门店'}">
					{{storeNum}}
				</span>
				<u-icon name="arrow-right" class="arrow" />
			</view>
		</view>
		<view class="row-cell">
			<view class="left">
				<span>选择场地</span>
				<u-icon name="question-circle" class="question" @click="tipMethod(2)" />
			</view>
			<view class="right" @click="$refs.placelist.showPlacePopup()">
				<span :class="{'color': placeNum != '请选择适用场地'}">
					{{placeNum}}
				</span>
				<u-icon name="arrow-right" class="arrow" />
			</view>
		</view>
		<view class="row-cell marginT20">
			<view class="left">
				<span>团购套餐</span>
			</view>
			<view class="right color" @click="addMethod">
				<u-icon name="plus" />
				<span>添加套餐</span>
			</view>
		</view>
		<view class="coupon-wrapper">
			<view class="coupon-item" v-for="(item, index) in params.dySetMealList" :key="index">
				<view class="left">
					<view class="coupon-title">
						套餐: {{ item.amountTotal }}元{{ item.tokens }}币
					</view>
					<view class="coupon-skuid">抖音团购ID: {{ item.dyPurchaseId }}</view>
				</view>
				<view class="right">
					<button @click="editMethod(item, index)">编辑</button>
					<button @click="deleteMethod(index)">删除</button>
				</view>
			</view>
		</view>
		<view class="create">
			<view class="tips">注意：这里的团购套餐要和抖音的套餐金额、币数一样喔</view>
			<view class="create-btn" @click="addDySetMeal">完成创建</view>
		</view>
		<u-popup :show="mealPopup" round="20" @close="mealPopup = false" mode="center">
			<view class="meal-popup-wrapper">
				<view class="title">套餐设置</view>
				<u-cell-group>
					<xls-field v-model="mealObj.amountTotal" label="价格/元" placeholder="请输入单价" />
					<xls-field v-model="mealObj.tokens" label="币数/币" placeholder="请输入币数" />
					<xls-field v-model="mealObj.dyPurchaseId" label="抖音团购ID" placeholder="复制抖音门店团购ID" />
				</u-cell-group>
				<view class="tips-text">
					<p>团购ID如何获取?</p>
					<p>
						<span class="point"></span>
						集合号商家请联系平台运营人员提供
					</p>
					<p>
						<span class="point"></span>
						自有抖音号需自行去抖音复制
						<span class="color"> 查看案例 </span>
					</p>
				</view>
				<view class="footer-wrapper">
					<view class="button" @click="mealPopup = false">取消</view>
					<view class="button comfrim" @click="comfrimMethod">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 选择场地 -->
		<!-- <CustomList ref="placelist" @getPlaceId="getPlaceId" /> -->
		<!-- 选择门店 -->
		<!-- <StoreList ref="storelist" @getStoreObj="getStoreObj" /> -->
	</view>
</template>

<script>
	// import CustomList from "@/components/commonComps/customList.vue";
	// import StoreList from "./storeList.vue";
	// import api from "@/utils/meituan";
	export default {
		name: "douyin_meal---",
		// components: {
		// 	CustomList,
		// 	StoreList
		// },
		data() {
			return {
				mealPopup: false,
				indexMeal: 0,
				placeIdlist: [],
				placeNum: "请选择适用场地",
				storeNum: "请选择抖音门店",
				// 套餐
				mealObj: {
					dyPurchaseId: "", //抖音团购id
					amountTotal: "", // 价格
					tokens: "", //币数
				},
				params: {
					dyShopId: "",
					placeIds: "", //场地id，根据逗号分隔
					dySetMealList: [],
				},
			};
		},
		methods: {
			tipMethod(type) {
				let message =
					type == 1 ?
					"选择您账号上的门店进行绑定团购套餐核销" :
					"选择适用场地进行核销，不在选择场地区间的无法核销";
				this.$dialog.alert({
					title: "温馨提示",
					message,
					width: 320,
					confirmButtonText: "我知道了",
					confirmButtonColor: "#5241ff",
				});
			},
			// 场地
			getPlaceId(place) {
				this.placeNum = place[1].length ?
					"已选(" + place[1].length + ")个场地" :
					"全部场地";
				this.placeIdlist = place[1].length ? place[1] : [];
				this.params.placeIds = String(this.placeIdlist);
			},
			// 门店
			getStoreObj(item) {
				this.storeNum = item.poiName;
				this.params.dyShopId = item.id;
			},
			addMethod() {
				if (this.params.dySetMealList.length >= 5) {
					return this.$toast("套餐最多设置5个哦~");
				}
				this.indexMeal = -1;
				this.mealObj = {
					dyPurchaseId: "", //抖音团购id
					amountTotal: "", // 价格
					tokens: "", //币数
				};
				this.mealPopup = true;
			},
			editMethod(item, index) {
				this.indexMeal = index;
				// this.mealObj = Object.assign({}, item);
				this.mealObj = {
					...item
				};
				this.mealPopup = true;
			},
			deleteMethod(index) {
				this.params.dySetMealList.splice(index, 1);
			},
			comfrimMethod() {
				if (this.indexMeal != -1) {
					this.params.dySetMealList[this.indexMeal] = this.mealObj;
				} else {
					this.params.dySetMealList.push(this.mealObj);
				}
				this.mealPopup = false;
			},
			// 添加团购套餐
			async addDySetMeal() {
				let res = await api.addDySetMeal(this.params);
				if (res.data.code == 0) {
					this.$toast("添加成功~");
					this.$router.back();
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.meal-tuan-wrapper {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.top {
			align-items: center;
			background: #fff7e6;
			display: flex;
			font-size: 12px;
			height: 32px;
			justify-content: space-between;
			line-height: 17px;
			padding: 0 12px;

			.left {
				color: #ff8d1a;
			}

			.right {
				color: #5241ff;
			}
		}

		.row-cell {
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
			display: flex;
			height: 48px;
			justify-content: space-between;
			padding: 0 12px;

			.left {
				color: #333;
				font-size: 15px;
				line-height: 21px;
				display: flex;
				align-items: center;

				.question {
					font-size: 20px;
					margin-left: 5px;
					color: #cfcfcf;
				}
			}

			.right {
				color: #999;
				font-size: 14px;
				line-height: 20px;
				display: flex;
				align-items: center;

				.arrow {
					margin-left: 5px;
					font-size: 16px;
				}
			}

			.color {
				color: #5241ff;
			}
		}

		.marginT20 {
			margin-top: 12px;
		}

		.coupon-item {
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
			display: flex;
			height: 68px;
			justify-content: space-between;
			padding: 0 12px;

			.left {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;

				.coupon-title {
					color: #333;
					font-size: 15px;
				}

				.coupon-skuid {
					color: #999;
					font-size: 13px;
				}
			}

			.right {
				align-items: center;
				display: flex;

				button {
					border: 1px solid #ddd;
					border-radius: 4px;
					color: #666;
					font-family: PingFangSC-Regular, PingFang SC;
					font-size: 12.5px;
					height: 25px;
					margin-left: 8px;
					width: 45px;
					background-color: #fff;
				}
			}
		}

		.meal-popup-wrapper {
			width: 320px;

			.title {
				padding-top: 6.93333vw;
				font-weight: 500;
				line-height: 6.4vw;
				text-align: center;
				font-size: 4.26667vw;
			}

			.footer-wrapper {
				display: flex;
				align-items: center;
				border-top: 1px solid #ebedf0;

				.button {
					line-height: 50px;
					flex: 1;
					text-align: center;
					font-size: 4.26667vw;
				}

				.comfrim {
					border-left: 1px solid #ebedf0;
					color: #5241ff;
				}
			}

			.tips-text {
				padding: 14px;

				p {
					align-items: center;
					color: #999;
					display: flex;
					font-size: 12px;
					line-height: 17px;
					min-height: 17px;
				}

				.point {
					background: #999;
					border-radius: 50%;
					display: inline-block;
					height: 4px;
					margin-right: 4px;
					width: 4px;
				}

				.color {
					color: #5241ff;
				}
			}
		}

		.create {
			padding: 0 12px 6px;
			text-align: center;

			.tips {
				color: #999;
				font-size: 12px;
				line-height: 17px;
				margin-bottom: 12px;
			}

			.create-btn {
				background: #5241ff;
				border-radius: 8px;
				color: #fff;
				font-family: Helvetica;
				font-size: 16px;
				height: 44px;
				line-height: 44px;
				margin: 0 auto;
			}
		}

		.coupon-wrapper {
			flex: 1;
			overflow: auto;
		}
	}
</style>