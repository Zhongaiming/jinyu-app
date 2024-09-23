<template>
	<view>
		<xls-jy-navbar :title="params.poiName" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="coupon-wrapper">
			<view v-for="(item, index) in mealList" :key="index">
				<view class="coupon-item">
					<view class="left">
						<view class="coupon-title">
							套餐: {{ item.amountTotal }}元{{ item.tokens }}币
						</view>
						<view class="coupon-skuid">抖音团购ID: {{ item.dyPurchaseId }}</view>
						<view class="coupon-skuid">创建时间: {{ item.createTime }}</view>
					</view>
					<view class="right">
						<view class="button" @click="editMethod(item)">编辑</view>
						<view class="button" @click="deleteMethod(item)">删除</view>
					</view>
				</view>
				<view class="card-content-wrap" v-if="item.placeName.length">
					<view class="card_item_style" @click="changeSwitch(item)">
						<view class="key_text">活动场地</view>
						<view class="card-item__right">{{ item.placeName.length }}个
							<u-icon name="arrow-up" size="20px" color="#8d8d8d" v-show="item.switch" />
							<u-icon name="arrow-down" size="20px" color="#8d8d8d" v-show="!item.switch" />
						</view>
					</view>
					<view class="card_item_style" v-for="(text, index) in item.placeName" :key="`a${index}`"
						v-show="item.switch">
						<view class="key_text"></view>
						<view class="value-box">{{ text }}</view>
					</view>
				</view>
			</view>
			<xls-bottom v-if="mealList.length"></xls-bottom>
			<xls-empty v-else></xls-empty>
		</view>

		<u-popup :show="mealPopup" round="20" mode="center">
			<view class="meal-popup-wrapper">
				<view class="title">套餐设置</view>
				<u-cell-group>
					<xls-field v-model="mealObj.amountTotal" label="价格/元" placeholder="请输入单价" />
					<xls-field v-model="mealObj.tokens" label="币数/币" placeholder="请输入币数" />
					<xls-field v-model="mealObj.dyPurchaseId" label="抖音团购ID" placeholder="复制抖音门店团购ID" />
					<xls-field v-model="placeNum" label="选择场地" @click="openPlace" placeholder="请选择适用场地"
						@focus="stopKeyborad" />
				</u-cell-group>
				<!-- <view class="tips-text">
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
				</view> -->
				<view class="footer-wrapper">
					<view class="button" @click="mealPopup = false">取消</view>
					<view class="button comfrim" @click="comfrimMethod">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 选择场地 -->
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId"></xls-place-checkbox>
	</view>
</template>

<script>
	import {
		writeOffController
	} from "@/api/index.js"
	export default {
		data() {
			return {
				params: {
					poiName: "",
					id: "",
				},
				// 套餐
				mealPopup: false,
				mealObj: {
					dyPurchaseId: "", //抖音团购id
					amountTotal: "", // 价格
					tokens: "", //币数
					placeId: []
				},
				placeIdlist: [],
				placeNum: "",
				mealList: [],
			};
		},
		onLoad(option) {
			if(option.params) {
				const {
					poiName,
					id
				} = JSON.parse(option.params);
				this.params = {
					poiName,
					id
				};
				this.getDyShopMealById();
			}
		},
		methods: {
			stopKeyborad() {
				uni.hideKeyboard();
			},
			openPlace() {
				this.$refs.placelist.showPlacePopup(this.placeIdlist)
			},
			// 场地
			getPlaceId(place) {
				this.placeNum = place[1].length ?
					"已选(" + place[1].length + ")个场地" :
					"全部场地";
				this.placeIdlist = place[1].length ? place[1] : [];
			},
			/**
			 * @description: 套餐
			 * @return {*}
			 * @Date: 2024-01-18 17:26:59
			 */
			// 查询门店的套餐
			async getDyShopMealById() {
				let res = await writeOffController.getDyShopMealById({
					shopId: this.params.id,
				});
				if (res.code == 200) {
					this.mealList = res.data;
				}
			},
			changeSwitch(item) {
				this.$set(item, "switch", !item.switch);
			},
			deleteMethod(item) {
				let {
					id: setMealId
				} = item
				this.$modal(`确定删除选择套餐吗？`,{
						title: "温馨提示",
						confirmColor: "#5241ff"
					})
					.then(() => {
						writeOffController.deleteDyShopMealById({
							setMealId
						}).then((res) => {
							if (res.code == 200) {
								this.getDyShopMealById();
								this.$toast("删除成功~");
							}
						});
					})
					.catch(() => {});
			},
			editMethod(params) {
				this.mealPopup = true
				this.mealObj = Object.assign({}, params)
				this.placeNum = `已选( ${this.mealObj.placeIds.length} )个场地`;
				this.placeIdlist = this.mealObj.placeIds
			},
			
			comfrimMethod() {
				if (!this.placeIdlist.length) {
					return this.$toast("请选择场地~")
				}
				writeOffController.updateDySetMeal({
					dyShopId: this.mealObj.dyShopId,
					dySetMealList: [{
						id: this.mealObj.id,
						dyPurchaseId: this.mealObj.dyPurchaseId,
						amountTotal: this.mealObj.amountTotal,
						tokens: this.mealObj.tokens
					}],
					placeIds: String(this.placeIdlist)
				}).then((res) => {
					if (res.code == 200) {
						this.getDyShopMealById();
						this.$toast("编辑成功~");
					}
				});
				this.mealPopup = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
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

			.button {
				border: 1px solid #ddd;
				border-radius: 4px;
				color: #666;
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 12.5px;
				height: 25px;
				line-height: 25px;
				margin-left: 8px;
				width: 45px;
				background-color: #fff;
				text-align: center;
			}
		}
	}

	.card-content-wrap {
		background: #fff;
		margin-bottom: 10px;
		position: relative;
		padding: 0 12px;

		.card_item_style {
			display: flex;
			align-items: center;
			justify-content: space-between;
			min-height: 40px;
			font-size: 14px;
			
			.card-item__right {
				display: flex;
				align-items: center;
			}

			.key_text {
				padding-right: 12px;
				font-size: 14px;
				font-family: PingFangSC, PingFangSC-Regular;
				color: #333;
			}

			.required {
				position: relative;
				padding-left: 12px;
			}

			.required:before {
				position: absolute;
				top: -5px;
				left: 2px;
				display: flex;
				height: 20px;
				align-items: center;
				content: "*";
				font-size: 14px;
				font-family: PingFangSC, PingFangSC-Regular;
				color: #ff4747;
			}

			.question {
				font-size: 17px;
				margin-left: 5px;
			}

			.value-box {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 14px;

				input {
					font-size: 14px;
					border: none;
					text-align: right;
				}
			}

			.unit {
				font-size: 14px;
				margin-left: 5px;
			}

			.user {
				font-size: 14px;
				margin-left: 5px;

				.text {
					margin-left: 5px;
					color: #5241ff;
				}
			}

			.icon {
				font-size: 18px;
				color: #868686;
			}
		}

		.card_item_style:not(:last-child) {
			border-bottom: 1px solid #eee;
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
</style>