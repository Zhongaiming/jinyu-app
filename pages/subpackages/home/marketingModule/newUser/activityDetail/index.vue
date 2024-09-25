<template>
	<view class="page_mark_wrapper wrapper">
		<xls-jy-navbar title="活动详情" bgColor="#f5f6f7"></xls-jy-navbar>
		<view class="card-content-wrap">
			<view class="state-style" :class="{'un-state':params.state == 2}" v-if="params.id">
				{{ params.state == 1 ? "投放中" : "已终止" }}
			</view>
			<view class="card_item_style" v-if="params.id">
				<view class="key_text">优惠类型</view>
				<view class="value-box">
					{{ params.type == 1 ? "首单享优惠" : "首单享折扣" }}
				</view>
			</view>
			<view class="card_item_style" @click="$refs.deviceType.showDeviceTypelist()">
				<view class="key_text" :class="{'required':!params.id}">
					设备类型
				</view>
				<view class="value-box">
					<input type="text" v-model="params.typeName" placeholder="请输入" @focus="stopKeyborad" />
				</view>
				<u-icon name="arrow-right" size="36" class="icon" v-if="!params.id" />
			</view>
			<view class="card_item_style" @click="$refs.placelist.showPlacePopup()" v-if="!params.id">
				<view class="key_text required">适用场地</view>
				<view class="value-box">
					<input type="text" v-model="params.placeText" placeholder="请输入" @focus="stopKeyborad" />
				</view>
				<u-icon name="arrow-right" size="36" class="icon" />
			</view>
			<view class="card_item_style" @click="pickerTime('start')">
				<view class="key_text" :class="{'required':!params.id}">
					开始时间
				</view>
				<view class="value-box">
					<input type="text" v-model="params.startTime" placeholder="请输入" @focus="stopKeyborad" />
				</view>
				<u-icon name="arrow-right" size="36" class="icon" v-if="!params.id" />
			</view>
			<view class="card_item_style" @click="pickerTime('end')">
				<view class="key_text" :class="{'required':!params.id}">
					结束时间
				</view>
				<view class="value-box">
					<input type="text" v-model="params.endTime" placeholder="请输入" @focus="stopKeyborad" />
				</view>
				<u-icon name="arrow-right" size="36" class="icon" v-if="!params.id" />
			</view>
			<!-- 首单折扣 -->
			<view class="card_item_style" v-if="params.type == 2">
				<view class="key_text" :class="{'required':!params.id}">
					{{ !params.id ? "首单折扣(限正整数)" : "首单折扣价" }}
				</view>
				<view class="value-box">
					<input type="text" v-model="params.firstDiscount" placeholder="请输入" v-if="!params.id" />
					<span v-else>{{ params.firstDiscount }}</span>
				</view>
				<view class="unit">折</view>
			</view>
			<view class="card_item_style" v-if="params.id">
				<view class="key_text">参与用户数</view>
				<view class="value-box">{{ params.couponMembers.length }}</view>
				<view class="user">
					<span>|</span>
					<span class="text" @click="goNextPage()">查看明细</span>
				</view>
			</view>
		</view>

		<!-- 套餐类型 -->
		<view class="card-content-wrap">
			<view class="card_item_style" v-if="params.type == 1">
				<view class="key_text" :class="{'required':!params.id}">
					套餐类型<u-icon name="question-circle" size="36" class="question" @click="questionTip" />
				</view>
				<view class="value-box">
					<input type="text" v-model="params.packageName" placeholder="请输入" @click="mealPopup = true"
						@focus="stopKeyborad" v-if="!params.id" />
					<span v-else>{{ params.packageName }}</span>
				</view>
				<u-icon name="arrow-right" size="36" class="icon" v-if="!params.id" />
			</view>

			<view class="card_item_style" v-if="params.type == 1 && params.id && mealType == 3">
				<view class="key_text" :class="{'required':!params.id}">
					每人体验次数
				</view>
				<view class="value-box">
					{{ params.experience }}
				</view>
				<view class="unit">次</view>
			</view>

			<view class="text-tip" v-if="!$route.query.id">
				温馨提示：
				<view>
					(1)新用户将获得
					“全场首单N折”特权，选择任意一个服务套餐，即可享受首单优惠。
				</view>
				<view>(2)“新用户”指活动场地下，从未享受过首单优惠的用户。</view>
			</view>

			<view class="card_item_style" v-if="mealType == 1 && params.type == 1">
				<view class="key_text" :class="{'required':!params.id}">
					首单价格
				</view>
				<view class="value-box">
					<input type="text" v-model="meal.firstAmount" placeholder="请输入" v-if="!params.id" />
					<span v-else>{{ meal.firstAmount }}</span>
				</view>
				<view class="unit">元</view>
			</view>

			<view class="text-tip" v-if="mealType == 2">
				温馨提示：
				<view>(1)商家可以自定义新用户专享套餐，仅新用户可见。</view>
				<view>(2)“新用户”指活动场地下，从未享受过首单优惠的用户</view>
			</view>

			<view class="meal-edit-wrapper" v-if="mealType == 2 && params.id">
				<view class="style" v-for="item in params.packageList" :key="item.id">
					【{{ item.packageName }}】{{ item.amount }}元/{{ item.time }}分钟
				</view>
			</view>

			<view class="add-server" @click="setMealMethod('add')"
				v-if="mealType == 2 && !params.id && setList.length < 5">
				<span>+ 添加套餐（新用户专享）</span>
			</view>
			<!-- 失效 -->
			<view class="item-list" v-if="mealType == 2 && !params.id">
				<view class="list-content" v-for="(item, index) in setList" :key="index">
					<view class="list-content_left">
						<view class="name">{{ item.packageName }}</view>
						<view class="icon">{{ item.amount }}元/{{ item.time }}分钟</view>
					</view>
					<view class="handle-list">
						<span class="handle-btn edit-btn" @click="editSetMeal(index, item)">编辑</span>
						<span class="handle-btn del-btn" @click="deleteSetMeal(index)">删除</span>
					</view>
				</view>
			</view>
			<!-- 免费体验套餐 -->
			<view class="card_item_style" v-if="mealType == 3 && !params.id">
				<view class="key_text required">每人体验次数</view>
				<view class="value-box">
					<input type="text" v-model="meal.experience" placeholder="请输入" />
				</view>
				<view class="unit">次</view>
			</view>
			<view class="card_item_style" v-if="mealType == 3 && !params.id">
				<view class="key_text required">套餐名称</view>
				<view class="value-box">
					<input type="text" v-model="meal.packageName" placeholder="请输入" />
				</view>
			</view>
			<view class="card_item_style" v-if="mealType == 3 && !params.id">
				<view class="key_text required">时长</view>
				<view class="value-box">
					<input type="text" v-model="meal.time" placeholder="请输入" />
				</view>
				<view class="unit">分钟</view>
			</view>
		</view>
		<!-- 关注公众号 -->
		<!-- <view class="card-content-wrap" v-if="mealType == 3 && !params.id">
      <view class="card_item_style">
        <view class="key_text">关注公众号</view>
        <view class="value-box">
          <u-switch v-model="checked" active-color="#5421ff" />
        </view>
      </view>
      <view class="text-tip no-padding-top">
        提示：开启后要检查下该账号有没有绑定公众号，用户关注公众号即可免费体验（用户获得免费体验后，当天有效）
      </view>
    </view> -->
		<!-- 活动场地 -->
		<view class="card-content-wrap" v-if="params.id">
			<view class="card_item_style">
				<view class="key_text">活动场地</view>
				<view class="value-box" @click="editState ? $refs.placelist.showPlacePopup() : ''">
					{{ params.placeId.length }}个
				</view>
				<u-icon name="arrow-right" size="36" class="icon" v-show="editState" />
			</view>
			<view class="card_item_style" v-for="item in params.placeList" :key="item.id" v-show="!editState">
				<view class="key_text"></view>
				<view class="value-box">{{ item.placeName }}</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="btn-footer-wrapper">
			<view class="button-wrapper" v-if="params.id">
				<view class="btn" @click="termination" v-if="!editState && params.state == 1">
					终止
				</view>
				<view class="btn" @click="editState = true" v-if="!editState && params.state == 1">
					修改
				</view>
				<view class="btn" @click="$router.back()" v-if="!editState">
					返回列表
				</view>
				<view class="btn" v-else @click="edit()">确定</view>
			</view>
			<view class="btn-footer" v-else>
				<view class="btn" @click="operation">保存</view>
			</view>
		</view>
		<!-- 设备类型 -->
		<xls-device-type-radio ref="deviceType" :optionAll="false"
			@changDeviceType="changDeviceType"></xls-device-type-radio>
		<!-- 活动场地 -->
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId"></xls-place-checkbox>
		<!-- 时间选择器 -->
		<xls-datetime-picker :show="timePopup" v-model="currentDate" :title="timeTitle" 
			@cancel="timePopup = false"
			@close="timePopup = false"
			@confirm="confirmTimeMethod"></xls-datetime-picker>
			
		
		<!-- 套餐选择 -->
		<u-popup :show="mealPopup" mode="bottom" @close="mealPopup=false">
			<view class="meal-wrapper-popup">
				<view class="title-wrapper">
					<view class="side" @click="mealPopup = false">取消</view>
					<view class="text">请选择套餐类型</view>
					<view class="side" @click="confirmMeal">确定</view>
				</view>
				<u-radio-group v-model="mealType">
					<view class="meal-body">
						<view class="item-style" v-for="item in mealList" :key="item.id">
							<view class="left">{{ item.text }}</view>
							<u-radio icon-size="24px" checked-color="#5421ff" :name="item.id"></u-radio>
						</view>
					</view>
				</u-radio-group>
			</view>
		</u-popup>
		<!-- 自定义套餐 -->
		<u-popup :show="mealSetPopup" round @close="mealSetPopup=false">
			<view class="meal_set_popup">
				<view class="title">套餐{{ setMealType }}</view>
				<u-cell-group>
					<u-field v-model="setParams.packageName" required label="套餐名称" placeholder="不可超8个字" />
					<u-field v-model="setParams.amount" required label="价格(元)" placeholder="请输入" type="number" />
					<u-field v-model="setParams.time" required label="时长(分钟)" placeholder="请输入" type="number" />
				</u-cell-group>
				<view class="bottom_wrapper">
					<view class="btn" @click="mealSetPopup = false">取消</view>
					<view class="btn confirm" @click="mealSetConfirm">保存</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import moment from "moment";
	import {
		marketingController
	} from "@/api/index.js"
	export default {
		data() {
			return {
				activityType: 1,
				operationType: "add",
				checked: false,
				params: {
					id: null,
					type: 1, //1.首单优惠，2.首单折扣
					startTime: moment().format("YYYY-MM-DD"),
					endTime: moment().subtract(-1, "month").format("YYYY-MM-DD"),
					deviceType: null,
					firstDiscount: null, //首单折扣
					association: 2, //是否关联公众号 1关联 2no
					packageId: null, //套餐id
					packageIds: "", // 所有套餐id，string类型
					placeIds: "", //场地id String
					// 修改
					state: 1, //状态，1：投放，2：停止
					// -----
					// 套餐
					packageName: "任意套餐",
					experience: "",
					typeName: null,
					placeId: [],
					placeText: "",
					couponMembers: [], // 参与人数
				},
				timePopup: false,
				timeType: "start",
				timeTitle: "请选择开始时间",
				currentDate: Number(new Date()),
				
				// 套餐选择
				mealPopup: false,
				mealType: 1, // 套餐类型
				mealList: [{
						id: 1,
						text: "任意套餐"
					},
					// { id: 2, text: "自定义新用户专享套餐" },
					// { id: 3, text: "免费体验套餐" },
				],
				meal: {
					packageName: "", //套餐名称
					type: 1, //1、任意套餐，2、自定义套餐 3、免费体验
					firstAmount: "", //首单价格
					amount: "", //价格
					time: "", //时间 分钟
					experience: "", //体验次数
				},
				mealSetPopup: false,
				setMealType: "添加",
				setParams: {
					packageName: "",
					amount: "",
					time: "",
					type: 2,
					// type 1、系统套餐，2、自定义套餐
					// firstAmount 首单价格
					// experience 体验次数
				},
				index: -1,
				setList: [],
				// ---
				editState: false,
			};
		},
		onLoad(option) {
			if (option.params) {
				const params = JSON.parse(option.params)
				this.params.type = params.type
				if (params.id) {
					this.getDetail(params.id)
				}
			}
		},
		methods: {
			// 查详情
			async getDetail(id) {
				let res = await marketingController.getCouponById({
					id
				});
				if (res.code == 200) {
					this.editState = false;
					let result = res.data;
					this.params.couponMembers = result.couponMembers;
					result.startTime = result.startTime.split(" ")[0];
					result.endTime = result.endTime.split(" ")[0];
					this.params.experience = result.packageList.length ?
						result.packageList[0].experience :
						"";
					this.mealType = result.packageList.length ?
						result.packageList[0].type :
						1;
					if (this.mealType == 2) {
						result.packageName = "自定义新用户专享套餐";
					} else if (this.mealType == 1) {
						result.packageName = "任意套餐";
					} else {
						result.packageName = "免费体验套餐";
					}
					this.meal.firstAmount = result.packageList.length ?
						result.packageList[0].firstAmount :
						"";
					let placeId = result.placeList.map((item) => item.id);
					this.params.placeId = placeId;
					this.params.placeText = `已选${placeId.length}个场地`;
					this.params.placeIds = String(placeId);
					this.$refs.placelist.defaultChecked(this.params.placeIds);
					this.params = Object.assign(this.params, result);
				}
			},
			// 终止
			termination() {
				this.$modal("活动正在进行，确定要终止吗？",{
						title: "温馨提示",
						confirmText: "终止",
						confirmColor: "#5241ff",
					})
					.then(() => {
						this.params.state = 2;
						marketingController.updateCoupon(this.params).then((des) => {
							if (des.code == 200) {
								this.$toast("终止成功");
								if (this.$route.query.id) {
									this.getDetail(this.$route.query.id);
								}
							}
						});
					})
					.catch(() => {});
			},
			// 修改
			edit() {
				if (!this.params.placeId.length) {
					return this.$toast("请选择场地");
				}
				marketingController.updateCoupon(this.params).then((des) => {
					if (des.code == 200) {
						this.$toast("场地更新成功");
						if (this.$route.query.id) {
							this.getDetail(this.$route.query.id);
						}
					}
				});
			},
			// 添加
			async operation() {
				if (!this.params.deviceType) {
					return this.$toast("请选择设备类型~");
				}
				if (!this.params.placeIds) {
					return this.$toast("请选择场地~");
				}
				// 折扣
				if (!this.params.firstDiscount && this.params.type == 2) {
					return this.$toast("请输入折扣~");
				}
				if (
					(0 == this.params.firstDiscount * 1 ||
						10 < this.params.firstDiscount * 1) &&
					this.params.type == 2
				) {
					return this.$toast("折扣输入范围为0到10~");
				}
				// 优惠价格必须大于0
				if (this.meal.firstAmount * 1 == 0 && this.params.type == 1) {
					return this.$toast("优惠价格必须大于0~");
				}
				let params;
				if (this.mealType == 1) {
					params = [{
						packageName: "任意套餐",
						type: 1,
						firstAmount: this.meal.firstAmount,
					}, ];
				} else if (this.mealType == 2) {
					params = this.setList;
				} else if (this.mealType == 3) {
					params = [{
						packageName: this.meal.packageName,
						type: 3,
						experience: this.meal.experience,
						time: this.meal.time,
					}, ];
				}

				if (this.params.type == 2) {
					// 享折扣
					marketingController.addCoupon({dto: this.params}).then((des) => {
						if (des.code == 200) {
							this.$toast("添加成功");
							this.$router.back();
						}
					});
					return;
				}

				// 添加套餐，返回添加的数据
				marketingController.addPackage(params)
					.then((res) => {
						if (res.code == 200) {
							let arr = [];
							res.data.forEach((item) => {
								arr.push(item.id);
							});
							this.params.packageId = arr[0];
							this.params.packageIds = String(arr);
							this.params.association = this.checked ? 1 : 2;
							// 活动添加
							marketingController.addCoupon(this.params).then((des) => {
								if (des.code == 200) {
									this.$toast("添加成功");
									this.$router.back();
								}
							});
						}
					})
					.catch((err) => {});
			},
			pickerTime(type) {
				if (type == "start") {
					this.timeType = "start"
					this.timeTitle = "请选择开始时间"
					this.currentDate = new Date(this.params.startTime).getTime()
				} else {
					this.timeType = "end"
					this.timeTitle = "请选择结束时间"
					this.currentDate = new Date(this.params.endTime).getTime()
				}
				this.timePopup = true;
			},
			// 时间
			confirmMethod(value) {
				let date = moment(value).format("YYYY-MM-DD")
				if (this.timeType == "start") {
					this.params.startTime = date
				} else {
					this.params.endTime = date
				}
				this.timePopup = false
			},
			// 套餐
			confirmMeal() {
				this.params.packageName = this.mealList.filter(
					(item) => item.id === this.mealType
				)[0].text;
				this.mealPopup = false
			},
			// 自定义套餐
			setMealMethod(type) {
				this.index = -1;
				this.setParams = {
					packageName: "",
					amount: "",
					time: "",
					type: 2,
				};
				this.setMealType = "添加";
				this.mealSetPopup = true;
			},
			mealSetConfirm() {
				if (!this.setParams.packageName) {
					return this.$toast("请输入套餐名称");
				}
				if (!this.setParams.amount) {
					return this.$toast("请输入套餐价格");
				}
				if (!this.setParams.time) {
					return this.$toast("请输入套餐时长");
				}
				let result = false;
				this.setList.forEach((item, index) => {
					if (item.time == this.setParams.time && this.index != index) {
						return (result = true);
					}
				});
				if (result) {
					return this.$toast("时长不能重复");
				}
				let item = Object.assign({}, this.setParams);
				if (this.setMealType == "添加") {
					this.setList.push(item);
				} else {
					this.setList[this.index] = item;
				}
				this.mealSetPopup = false;
			},
			editSetMeal(index, item) {
				this.index = index;
				this.setParams = Object.assign(this.setParams, item);
				this.setMealType = "编辑";
				this.mealSetPopup = true;
			},
			deleteSetMeal(index) {
				this.$modal({
						title: "温馨提示",
						message: "确定要删除套餐吗？",
						width: 280,
						confirmButtonText: "确定",
					})
					.then(() => {
						this.setList.splice(index, 1);
					})
					.catch(() => {});
			},
			stopKeyborad() {
				uni.hideKeyboard()
			},
			questionTip() {
				this.$modal("1、新用户将获得“全场首单权益”，仅限于活动下的场地\n2、适用于仅是未享受过权益的用户",{
					title: "套餐类型说明",
					confirmText: "我知道了",
					showCancel: false
				});
			},
			goNextPage() {
				if (!this.params.couponMembers.length) {
					return this.$toast("暂无参与用户~");
				}
				this.$router.push({
					path: "/marketing/user_user",
					query: {
						list: JSON.stringify(this.params.couponMembers)
					},
				});
			},
			//按场地
			getPlaceId(place) {
				this.params.placeId = place[1];
				this.params.placeText = `已选${place[1].length}个场地`;
				this.params.placeIds = String(place[1]);
			},
			//设备类型
			changDeviceType(params) {
				this.params.typeName = params.typeName;
				this.params.deviceType = params.deviceTypeId;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.wrapper {
		padding-bottom: 120px;
	}

	.card-content-wrap {
		background: #fff;
		margin-bottom: 10px;
		position: relative;
		padding: 0 12px;

		.card_item_style {
			display: flex;
			align-items: center;
			min-height: 50px;

			.key_text {
				padding-right: 12px;
				font-size: 14px;
				font-family: PingFangSC, PingFangSC-Regular;
				color: #333;
				display: flex;
				align-items: center;
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

		.add-server {
			color: #5421ff;
			font-size: 15px;
			text-align: center;
			padding: 10px 0;
			border-top: 1px solid #eee;
		}

		.text-tip {
			padding: 12px 0;
			font-size: 12px;
			color: #999;
			text-align: justify;
		}

		.item-list {
			.list-content {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #333;
				min-height: 45px;
				margin-left: 12px;
				border-top: 1px solid #eee;

				.list-content_left {
					display: flex;
					flex-direction: column;
					flex-wrap: nowrap;
					justify-content: center;
					align-items: flex-start;
					flex: 1;
				}

				.handle-list {
					.handle-btn {
						display: inline-block;
						padding: 0 12px;
						height: 28px;
						line-height: 28px;
						border-radius: 3px;
						border: 1px solid #d0d0d0;
						font-size: 14px;
						color: #41414199;
					}

					.del-btn {
						margin-left: 15px;
					}
				}
			}
		}
	}

	.btn-footer-wrapper {
		background: #fff;
		z-index: 1;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;

		.button-wrapper {
			display: flex;
			align-items: center;

			.btn {
				flex: 1;
				line-height: 50px;
				text-align: center;
				font-size: 17px;
				color: #fff;
				background: #5241ff;
			}

			.btn:not(:last-child) {
				border-right: 1px solid #fff;
			}
		}

		.btn-footer {
			padding: 15px;

			.btn {
				color: #fff;
				text-align: center;
				line-height: 46px;
				border-radius: 6px;
				background: #5241ff;
				font-size: 15px;
			}
		}
	}

	.state-style {
		position: absolute;
		top: 58px;
		left: 50%;
		transform: translateX(-50%) rotate(25deg);
		font-size: 18px;
		font-weight: 700;
		width: 75px;
		height: 75px;
		border-radius: 50%;
		text-align: center;
		line-height: 75px;
		background: rgba(237, 235, 247, 0.5);
		border: 1px solid #b5aff8;
		color: #5241ff;
	}

	.un-state {
		background: rgba(241, 241, 241, 0.5);
		border: 1px solid #c8cbce;
		color: #b0b5bb;
	}

	.meal-edit-wrapper {
		padding: 5px;

		.style {
			margin-bottom: 10px;
			font-size: 14px;
		}
	}

	// 套餐
	.meal-wrapper-popup {
		width: 100%;

		.title-wrapper {
			line-height: 50px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f0f0f0;

			.side {
				padding: 0 12px;
				font-size: 13px;
			}

			.text {
				text-align: center;
				flex: 1;
				font-size: 16px;
				font-weight: 700;
			}
		}

		.meal-body {
			width: 100vw;
			margin-bottom: 120px;

			.item-style {
				padding: 12px 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 15px;
			}
		}
	}

	.meal_set_popup {
		width: 78vw;

		.title {
			line-height: 46px;
			text-align: center;
			font-size: 17px;
			font-weight: 700;
		}

		.bottom_wrapper {
			display: flex;
			align-items: center;
			border-top: 1px solid #f0f0f0;
			line-height: 45px;
			font-size: 15px;
			text-align: center;

			.btn {
				flex: 1;
			}

			.confirm {
				color: #5421ff;
				border-left: 1px solid #f0f0f0;
			}
		}
	}
</style>