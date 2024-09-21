<template>
	<view class="MeituanCAVerification">
		<xls-jy-navbar title="美团店信息填写"></xls-jy-navbar>
		<!-- 店铺 -->
		<view class="main-wrapper-mt" v-for="(obj, index) in storeList" :key="index">
			<view class="shop-title" v-if="storeList.length < 2">美团店信息填写</view>
			<view class="shop-title" v-else>
				第{{ toChinese(index + 1) }}间美团店信息填写<span class="delete-shop" @click="deleteStore(index)">
					删除
				</span>
			</view>
			<!-- 美团店铺名称 -->
			<view class="shop-item">
				<span class="label required">美团店铺名称</span>
				<span class="field-wrapper">
					<xls-field placeholder="请输入美团店铺名称" input-align="right" v-model="obj.shopName" />
				</span>
			</view>
			<view class="red-tips">
				提示: 查看店铺名称<span class="meituanStore" @click="nameStandard">命名规范</span>
			</view>
			<!-- 分店名 -->
			<view class="shop-item">
				<span class="label">分店名</span>
				<span class="field-wrapper">
					<xls-field placeholder="请输入分店名称（非必填）" input-align="right" v-model="obj.anotherName" />
				</span>
			</view>
			<view class="red-tips">
				提示: 此项为非必填项，查看分店<span class="meituanStore" @click="nameStandard('shop')">命名规范</span>
			</view>
			<!-- 投放地址 -->
			<view class="shop-item">
				<span class="label required">投放地址</span>
				<span class="field-wrapper" @click="selectPlace(index, obj.placeId)">
					<xls-field placeholder="请选择投放地址" input-align="right" @focus="stopKeyborad"
						v-model="obj.placeName" />
					<u-icon name="arrow-right" size="36" class="arrow-style" />
				</span>
			</view>
			<view class="red-tips">提示：投放地址与美团店铺绑定，请谨慎选择！</view>
			<!-- 所在地区 -->
			<view class="shop-item shop-style">
				<span class="label required">所在地区</span>
				<span class="field-wrapper">
					<xls-field placeholder="请选择省市区" input-align="right" @focus="stopKeyborad" @click="
              (activeIndex = index),
                (regionCode = obj.regionCode),
                (addressPopup = true)
            " v-model="obj.region" />
					<u-icon name="arrow-right" size="36" class="arrow-style" />
				</span>
			</view>
			<view class="shop-item">
				<span class="label required">详细地址</span>
				<span class="field-wrapper">
					<xls-field placeholder="请填写详细的具体地址" input-align="right" v-model="obj.address" />
				</span>
			</view>
			<view class="red-tips">示例：广州市番禺区中二横路1号gogo新天地三楼</view>
			<!-- 套餐 -->
			<view class="shop-discount-group" v-show="obj.mealList.length">
				<view class="discount-item" v-for="(meal, serial) in obj.mealList" :key="serial">
					<view class="discount-title">
						<p class="label required">美团套餐{{ serial + 1 }}</p>
						<view class="handle-btn">
							<p class="editDiscount" @click="editMeal(index, serial, meal)">
								编辑
							</p>
							<p class="deleteDiscount" @click="deleteMeal(index, serial)">
								删除
							</p>
						</view>
					</view>
					<view class="commodityPrice">
						<span class="label">商品原价</span>
						<span class="value">{{ meal.commodityPrice }}元{{ meal.token }}币</span>
					</view>
					<view class="commodityPrice">
						<span class="label">美团价</span>
						<span class="value">{{ meal.balance }}元</span>
					</view>
				</view>
			</view>
			<!-- 套餐类型 -->
			<view class="shop-item mb10" v-show="obj.mealList.length < 2">
				<span class="label required">套餐类型</span>
				<span class="field-wrapper">
					<u-icon name="plus-circle" size="38" color="#5241ff" class="arrow-style add-o" />
					<span class="add-text" @click="addMeal(index)">添加美团套餐</span>
				</span>
			</view>
			<!-- 营业时间 -->
			<view class="shop-item shop-style">
				<span class="label required">营业时间</span>
				<span class="field-wrapper">
					<span class="time-wrapper" @click="selectTime(index, 'start', obj.startTime)">
						<xls-field placeholder="开始时间" @focus="stopKeyborad" v-model="obj.startTime" /></span>
					<span>至</span>
					<span class="time-wrapper" @click="selectTime(index, 'end', obj.endTime)">
						<xls-field placeholder="结束时间" @focus="stopKeyborad" v-model="obj.endTime" /></span>
				</span>
			</view>
			<!-- 门头照 -->
			<view class="shop-upload-img mb10">
				<view class="upload-txt">
					上传门头照
					<span class="text-over" @click="imgView(1)">查看示例</span>
				</view>
				<u-uploader v-model="obj.imgList" :before-read="beforeRead" :after-read="afterRead" :max-count="1"
					@delete="storeList[0].doorHeadPhoto = ''" />
			</view>
			<view class="shop-upload-img mb10">
				<view class="upload-txt">
					上传店铺照片
					<span class="text-over" @click="imgView(2)">查看示例</span>
				</view>
				<u-uploader v-model="obj.imgLists" :before-read="beforeRead" :after-read="afterReads" :max-count="1"
					@delete="storeList[0].storePhoto = ''" />
			</view>
		</view>
		<!-- 添加美团店 -->
		<view class="add-shop-btn" v-if="0">
			<u-icon name="add-o" class="arrow-style add-o" />
			<span class="add-text" @click="addStore">继续添加美团店铺</span>
		</view>
		<!-- 确定按钮 -->
		<view class="confirm-btn-wrapper">
			<view class="fixed-confirm-btn" @click="comfireMethod">提交审核</view>
			<view class="text-style">
				提交审核即代表你同意<span style="color: #5241ff" @click="$refs.chant.merchantPopup = true">《商家合作协议》</span>
			</view>
		</view>
		<!-- 省市区选择 -->
		<u-popup :show="addressPopup" round position="bottom">
			<u-cascader title="请选择所在省市区" :options="addressOptionList" @close="addressPopup = false"
				@finish="finishAddress" active-color="#5241FF" :field-names="fieldName" :value="regionCode" />
		</u-popup>
		<!-- 添加美团套餐 -->
		<u-popup :show="mealPopup" round :close-on-click-overlay="false">
			<view class="meituan-meal-wrapper">
				<view class="title-style">新增美团团购套餐</view>
				<view class="main-wrapper">
					<u-cell-group>
						<xls-field v-model="meal.commodityPrice" required type="number" label="商品原价/元"
							input-align="right" placeholder="请输入商品原价" />
						<xls-field v-model="meal.balance" required type="number" input-align="right" label="美团价格/元"
							placeholder="请输入美团价格" />
						<u-cell title="兑币数量/个" required>
							<template #default>
								<u-stepper v-model="meal.token" input-width="50px" button-size="32px" />
							</template>
						</u-cell>
					</u-cell-group>
				</view>
				<view class="bottom-btn">
					<view class="btn-style" @click="mealPopup = false">取消</view>
					<view class="btn-style right-btn" @click="mealConfirm">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 选择时间 -->
		<u-popup :show="timePopup" round position="bottom">
			<u-datetime-picker type="time" title="选择营业时间" @cancel="timePopup = false" @confirm="timerConfirm"
				v-model="currentDate" />
		</u-popup>
		<!-- 商家协议 -->
		<!-- <MerchantAgreement ref="chant" /> -->
		<!-- <PlaceList @pitchonPlace="pitchonPlace" ref="placelist" :showAllCheck="false" :showRight="false" /> -->
	</view>
</template>

<script>
	// import PlaceList from "@/components/commonComps/placeList.vue";
	// import MerchantAgreement from "./components/merchantAgreement.vue";
	// import fileApi from "@/plugins/fileUpload";
	// import {
	// 	ImagePreview
	// } from "vant";
	// import tool from "@/plugins/floastCalculate";
	// import api from "@/utils/meituan";
	// import {
	// 	compress
	// } from "@/plugins/imageZip";
	// import local from "@/plugins/storage";

	export default {
		// components: {
		// 	PlaceList,
		// 	MerchantAgreement
		// },
		data() {
			return {
				//省市区
				regionCode: "",
				addressPopup: false,
				addressOptionList: [],
				fieldName: {
					text: "label",
					value: "code",
					children: "list",
				},
				//美团套餐
				mealPopup: false,
				meal: {
					commodityPrice: "",
					balance: "",
					token: 1,
				},
				mealType: "add",
				//营业时间
				timePopup: false,
				currentType: "start",
				currentDate: "",
				//参数
				activeIndex: 0,
				storeList: [{
					shopName: "", //店铺名称
					anotherName: "", //别名
					placeName: "", //场地
					placeId: "",
					region: "", //地区
					regionCode: "",
					address: "", //详细地址
					mealList: [], //美团套餐
					startTime: "", //营业时间
					endTime: "",
					imgList: [], //门头照
					imgLists: [],
					doorHeadPhoto: "", //门头照url
					storePhoto: "", //门店照url
				}, ],
			};
		},
		methods: {
			//收起输入键盘
			stopKeyborad() {
				uni.hideKeyboard();
			},
			//转中
			toChinese(value) {
				return tool.changeNumToHan(value);
			},
			//图片示例
			imgView(params) {
				let url = this.$baseUrl +
					params == 1 ? '/image/Meituan/example_two.jpg' :
					'/image/Meituan/example.jpg';
				ImagePreview([url]);
			},
			//上传图片
			beforeRead(file) {
				return compress(file, 1);
			},
			//上传图片后
			async afterRead(file) {
				file.status = "uploading";
				file.message = "上传中...";
				let res = await fileApi.uploadFile(file.file, "Meituan/store");
				file.status = "done";
				file.message = "上传成功";
				this.storeList[0].doorHeadPhoto = res ?
					res.res.requestUrls[0].split("?")[0] :
					"";
			},
			async afterReads(file) {
				file.status = "uploading";
				file.message = "上传中...";
				let res = await fileApi.uploadFile(file.file, "Meituan/store");
				file.status = "done";
				file.message = "上传成功";
				this.storeList[0].storePhoto = res ?
					res.res.requestUrls[0].split("?")[0] :
					"";
			},
			//命名规范
			nameStandard(type) {
				let message =
					"1、是纯商户名字,不能包含地址名称和所在商场名称(美团注册的一致)；\n2、该店的商户名,以门头图为准,不要含明显的广告词和涉黄词。";
				if (type == "shop") {
					message =
						"1、有明确地址指向(最好以商场、路名、地标作为标识)(美团注册的一致);\n2、字数10个字以内;\n3、以'店'结尾;\n4、不包含城市名;";
				}
				this.$dialog
					.alert({
						title: "命名规范",
						message: message,
						width: 280,
						confirmButtonColor: "#5241ff",
						confirmButtonText: "我知道了",
						messageAlign: "left",
					})
					.then(() => {});
			},
			//投放场地
			selectPlace(index, placeId) {
				this.activeIndex = index;
				this.$refs.placelist.showPlacelist(placeId);
			},
			pitchonPlace(params) {
				this.storeList[this.activeIndex].placeName = params.placeName;
				this.storeList[this.activeIndex].placeId = params.placeId;
			},
			//确定省市区选择
			finishAddress({
				selectedOptions
			}) {
				let address = selectedOptions.map((option) => option.label).join(" ");
				this.storeList[this.activeIndex].region = address;
				this.storeList[this.activeIndex].regionCode = selectedOptions[2].code;
				this.addressPopup = false;
			},
			//时间
			selectTime(index, type, value) {
				this.activeIndex = index;
				this.currentDate = value;
				this.currentType = type;
				this.timePopup = true;
			},
			timerConfirm(value) {
				if (this.currentType == "start") {
					this.storeList[this.activeIndex].startTime = value;
				} else {
					this.storeList[this.activeIndex].endTime = value;
				}
				this.timePopup = false;
			},
			//美团套餐
			deleteMeal(index, serial) {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: `确定要删除第 ${tool.changeNumToHan(
            index + 1
          )} 间店铺的美团套餐 ${serial + 1} 吗？`,
						confirmButtonText: "删除",
						width: 280,
					})
					.then(() => {
						this.storeList[this.activeIndex].mealList = this.storeList[
							this.activeIndex
						].mealList.filter((obj, tab) => {
							return tab != serial;
						});
					})
					.catch(() => {});
			},
			addMeal(index) {
				this.activeIndex = index;
				this.meal = {
					commodityPrice: "",
					balance: "",
					token: 1,
				};
				this.mealType = "add";
				this.mealPopup = true;
			},
			editMeal(index, serial, meal) {
				this.activeIndex = index;
				this.meal = {
					commodityPrice: meal.commodityPrice,
					balance: meal.balance,
					token: meal.token,
				};
				this.mealType = serial;
				this.mealPopup = true;
			},
			mealConfirm() {
				if (!this.meal.commodityPrice) {
					return this.$toast("请输入商品原价~");
				}
				if (!this.meal.balance) {
					return this.$toast("请输入美团价格~");
				}
				if (!this.meal.token) {
					return this.$toast("请输入兑币数量~");
				}
				if (this.meal.commodityPrice * 1 < this.meal.balance * 1) {
					return this.$toast("美团价格必须低于商品原价~");
				}
				if (this.mealType == "add") {
					if (this.storeList[this.activeIndex].mealList.length) {
						let nowMeal = this.storeList[this.activeIndex].mealList[0];
						if (nowMeal.commodityPrice == this.meal.commodityPrice) {
							return this.$toast("商品原价与第一个套餐一样~");
						}
						if (nowMeal.balance == this.meal.balance) {
							return this.$toast("美团价格与第一个套餐一样~");
						}
						if (nowMeal.token == this.meal.token) {
							return this.$toast("兑币数量与第一个套餐一样~");
						}
					}
					this.storeList[this.activeIndex].mealList.push(this.meal);
				} else {
					//编辑
					if (this.storeList[this.activeIndex].mealList.length > 1) {
						let index = this.mealType == 0 ? 1 : 0;
						let nowMeal = this.storeList[this.activeIndex].mealList[index];
						if (nowMeal.commodityPrice == this.meal.commodityPrice) {
							return this.$toast("商品原价与另一个套餐一样~");
						}
						if (nowMeal.balance == this.meal.balance) {
							return this.$toast("美团价格与另一个套餐一样~");
						}
						if (nowMeal.token == this.meal.token) {
							return this.$toast("兑币数量与另一个套餐一样~");
						}
					}
					this.storeList[this.activeIndex].mealList[this.mealType] = this.meal;
				}
				this.mealPopup = false;
			},
			//添加美团店铺
			addStore() {
				let obj = {
					shopName: "", //店铺名称
					anotherName: "", //别名
					placeName: "", //场地
					placeId: "",
					region: "", //地区
					address: "", //详细地址
					mealList: [], //美团套餐
					startTime: "", //营业时间
					endTime: "",
					imgList: [], //门头照
					imgLists: [],
					doorHeadPhoto: "", //门头照url
					storePhoto: "", //门店照url
				};
				this.storeList.push(obj);
			},
			//删除美团店铺
			deleteStore(params) {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: `确定要删除第 ${tool.changeNumToHan(params + 1)} 间店铺吗？`,
						confirmButtonText: "删除",
						width: 280,
					})
					.then(() => {
						this.storeList = this.storeList.filter((obj, index) => {
							return index != params;
						});
					})
					.catch(() => {});
			},
			// 提交审核
			async comfireMethod() {
				this.loading();
				let params = this.storeList[0];
				let commercialNumber = local.get("commercialNumber");
				let res = await api.getInsertShop({
					storeName: params.shopName, //店铺名字（与美团注册的一致）
					branchStoreName: params.anotherName, //分店名字（与美团注册的一致）
					dropAddress: params.placeName, //投放场地名字（与美团注册的一致）0
					localArea: params.region, //所在地区
					fullAddress: params.address, //详细地址
					openingDate: params.startTime, //营业开始时间
					endingDate: params.endTime, //营业结束时间
					doorHeadPhoto: params.doorHeadPhoto, //门头照url
					storePhoto: params.storePhoto, //门店照url
					commercialNumber: commercialNumber, //商户号
					placeId: params.placeId, //投放场地id
					setMeal: JSON.stringify(params
						.mealList), //美团套餐（Json形式的数组字符串 token币数，balance美团价格，commodityPrice商品价格）
				});
				this.clearing();
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.$toast("店铺审核中，请您耐心等待~");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.MeituanCAVerification {
		width: 100%;
		padding-bottom: 90px;

		.main-wrapper-mt {
			margin-bottom: 20px;

			.shop-title {
				color: #1a1a1a;
				font-size: 16px;
				height: 50px;
				line-height: 50px;
				padding-left: 10px;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.delete-shop {
					border: 1px solid #5241ff;
					border-radius: 5px;
					color: #5241ff;
					display: inline-block;
					font-size: 14px;
					line-height: 28px;
					text-align: center;
					width: 60px;
					margin-right: 10px;
				}
			}

			.shop-title:before {
				background: #5241ff;
				content: "";
				display: inline-block;
				height: 23px;
				left: 0;
				margin-top: -11.5px;
				position: absolute;
				top: 50%;
				width: 5px;
			}

			.shop-item {
				align-items: center;
				background: #fff;
				color: #666;
				display: flex;
				font-size: 16px;
				height: 50px;
				justify-content: space-between;
				overflow: hidden;
				padding-left: 10px;
				position: relative;

				.label {
					display: inline-block;
					height: 50px;
					line-height: 50px;
					position: relative;
					margin-right: 20px;
				}

				.field-wrapper {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: #000;

					.time-wrapper {
						width: 100px;
						display: inline-block;
					}
				}
			}

			.shop-discount-group {
				background: #fff;
				font-size: 16px;
				margin-bottom: 10px;
				padding: 0 10px 10px;

				.discount-item {
					position: relative;

					.discount-title {
						align-items: center;
						display: flex;
						height: 50px;
						justify-content: space-between;
					}

					.commodityPrice {
						align-items: center;
						background: #f5f6f7;
						border-radius: 5px;
						display: flex;
						height: 40px;
						justify-content: space-between;
						line-height: 40px;
						margin-bottom: 10px;
						padding: 0 10px;

						.label {
							color: #666;
						}
					}

					.label {
						position: relative;
					}

					.handle-btn {
						align-items: center;
						color: #5241ff;
						display: flex;
						font-size: 16px;
						justify-content: space-between;
						position: relative;
						width: 100px;
					}

					.handle-btn:after {
						background: #5241ff;
						content: "";
						display: inline-block;
						height: 60%;
						position: absolute;
						right: 50%;
						top: 20%;
						width: 1px;
					}
				}
			}

			.red-tips {
				color: #999;
				font-size: 13px;
				padding: 5px 10px 15px;

				.meituanStore {
					color: #5241ff;
					display: inline-block;
					margin-left: 5px;
				}
			}

			.shop-style:after {
				background: #e5e5e5;
				bottom: 0;
				content: "";
				display: inline-block;
				height: 1px;
				left: 10px;
				position: absolute;
				width: 100%;
			}

			.mb10 {
				margin-bottom: 10px;
			}

			.shop-upload-img {
				background: #fff;
				padding: 0 10px 20px;

				.upload-txt {
					color: #1a1a1a;
					font-size: 16px;
					height: 50px;
					line-height: 50px;

					.text-over {
						padding-left: 10px;
						color: #5241ff;
						position: relative;
					}

					.text-over:after {
						color: red;
						content: "*";
						line-height: 10px;
						display: inline-block;
						position: absolute;
						right: -10px;
						top: 0;
					}
				}
			}
		}

		.add-shop-btn {
			font-size: 16px;
			padding: 15px 10px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.arrow-style {
			color: #d9d9d9;
			font-size: 20px;
			margin-right: 8px;
		}

		.add-o {
			color: #5241ff;
			margin-right: 6px;
		}

		.add-text {
			font-size: 16px;
			color: #5241ff;
			vertical-align: middle;
			padding-right: 10px;
		}

		.confirm-btn-wrapper {
			background: #f5f6f7;
			bottom: 0;
			left: 0;
			position: fixed;
			width: 100%;

			.fixed-confirm-btn {
				align-items: center;
				background: #5241ff;
				color: #fff;
				display: flex;
				font-size: 17px;
				height: 50px;
				justify-content: center;
				width: 100%;
			}

			.text-style {
				font-size: 13px;
				padding: 10px 0;
				text-align: center;
			}
		}

		.required:after {
			color: red;
			content: "*";
			display: inline-block;
			position: absolute;
			right: -10px;
			top: 0;
		}
	}

	// 美团套餐
	.meituan-meal-wrapper {
		width: 280px;

		.title-style {
			line-height: 50px;
			font-size: 18px;
			text-align: center;
		}

		.main-wrapper {
			padding: 0 5px 20px;
		}

		.bottom-btn {
			border-top: 1px solid #e5e5e5;
			display: flex;
			align-items: center;

			.btn-style {
				flex: 1;
				line-height: 50px;
				font-size: 16px;
				text-align: center;
			}

			.right-btn {
				border-left: 1px solid #e5e5e5;
				color: #5241ff;
			}
		}
	}
</style>