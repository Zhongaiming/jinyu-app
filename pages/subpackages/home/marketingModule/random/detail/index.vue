<template>
	<view class="random_detail_wrapper">
		<xls-jy-navbar title="创建随机立减" bgColor="#f5f6f7"></xls-jy-navbar>
		<!-- 添加 -->
		<view v-if="handleType === 'add'">
			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动类型</view>
					<view class="cell-value">随即立减</view>
					<view class="rule" @click="rule">规则</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">开展活动的设备类型</view>
					<view class="cell-value has-arrow" @click="$refs.deviceType.showDeviceTypelist()">
						<input type="text" placeholder="请选择" v-model="coupon.deviceTypeName" @focus="stopKeyborad"
							class="input" />
					</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动参与门槛</view>
					<view class="cell-value">
						订单金额满
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.threshold" />
					</view>
					<view class="unit">元</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">随机扣减范围</view>
					<view class="cell-value flex">
						减
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.startReduction" />
						至
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.endReduction" />
						元
					</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">每人参与次数</view>
					<view class="cell-value">
						共
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.memberCount" />
					</view>
					<view class="unit">次</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">活动优惠总次数</view>
					<view class="cell-value">
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.couponNumber" />
					</view>
					<view class="unit">次</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动开始日期</view>
					<view class="cell-value has-arrow" @click="pickerTime('start')">
						<input type="text" placeholder="请选择" @focus="stopKeyborad" class="input"
							v-model="coupon.startTime" />
					</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">活动结束日期</view>
					<view class="cell-value has-arrow" @click="pickerTime('end')">
						<input type="text" placeholder="请选择" @focus="stopKeyborad" class="input"
							v-model="coupon.endTime" />
					</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">开展活动场地</view>
					<view class="cell-value has-arrow" @click="$refs.placelist.showPlacePopup()">
						<input type="text" placeholder="请选择" @focus="stopKeyborad" class="input"
							v-model="coupon.placeText" />
					</view>
				</view>
			</view>

			<view class="btn-bottom">
				<view class="btn" :class="!coupon.placeText || !coupon.deviceTypeName ? 'disabled' : ''"
					@click="confirmMethod">
					完成创建
				</view>
			</view>
		</view>
		<!-- 编辑、详情 -->
		<view v-else>
			<view class="detail-random-wrapper">
				<view class="cell">
					<span class="label">创建账号</span>
					<span class="value">{{ coupon.username }}</span>
				</view>
				<view class="cell">
					<span class="label">创建时间</span>
					<span class="value">{{ coupon.createTime }}</span>
				</view>
				<view class="cell">
					<span class="label">活动状态</span>
					<span class="value">{{ coupon.state == 1 ? "投放中" : "已终止" }}</span>
					<view class="stopbtn" v-if="handleType === 'detail' && coupon.state == 1"
						@click="handleType = 'edit'">
						修改
					</view>
					<view class="stopbtn" v-if="coupon.state == 1" @click="changeMethod">
						终止活动
					</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动参与门槛</view>
					<view class="cell-value">订单金额满 {{ coupon.threshold }} 元</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">随机扣减范围</view>
					<view class="cell-value">
						减 {{ coupon.startReduction }} 至 {{ coupon.endReduction }} 元
					</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">每人参与次数</view>
					<view class="cell-value">{{ coupon.memberCount }} 次</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">活动优惠总次数</view>
					<view class="cell-value has-arrow">
						共 {{ coupon.couponNumber }} 次，已优惠 0 次
					</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动起止日期</view>
					<view class="cell-value">
						{{ coupon.startTime }} 至 {{ coupon.endTime }}
					</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">参与活动设备类型</view>
					<view class="cell-value">
						{{ coupon.deviceTypeName }}
					</view>
				</view>
			</view>

			<view class="cell-group mb10" v-if="handleType === 'detail' || coupon.state == 2">
				<view class="cell-item-title">
					开展活动的场地共 {{ coupon.couponPlaces.length }} 个, 如下列表
				</view>
				<view class="cell-item" v-for="item in coupon.couponPlaces" :key="item.id">
					<view class="cell-label">
						{{ item.placeName }}
					</view>
				</view>
			</view>

			<view class="cell-group" v-else>
				<view class="cell-item">
					<view class="cell-label">开展活动场地</view>
					<view class="cell-value has-arrow" @click="$refs.placelist.showPlacePopup()">
						<input type="text" placeholder="请选择" @focus="stopKeyborad" class="input"
							v-model="coupon.placeText" />
					</view>
				</view>
			</view>

			<view class="btn-bottom-wrapper">
				<!-- <view class="left" v-if="handleType === 'detail'" @click="$router.back()">活动效果</view> -->
				<view class="btn" v-if="handleType === 'detail'" @click="$router.back()">返回列表</view>
				<view class="btn" v-if="handleType === 'edit'" @click="changeActivity">确定</view>
			</view>
		</view>

		<!-- 时间选择器 -->
		<xls-datetime-picker :show="timePopup" v-model="currentDate" :title="timeTitle" 
			@cancel="timePopup = false"
			@close="timePopup = false"
			@confirm="confirmTimeMethod"></xls-datetime-picker>
		<!-- 设备类型 -->
		<xls-device-type-radio ref="deviceType" :optionAll="false"
			@changDeviceType="changDeviceType"></xls-device-type-radio>
		<!-- 活动场地 -->
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId"></xls-place-checkbox>
	</view>
</template>

<script>
	import {
		marketingController
	} from "@/api/index.js"
	import moment from "moment";
	import {
		copyEvent
	} from "@/plugins/formUtils";
	export default {
		name: "random_list",
		data() {
			return {
				coupon: {
					id: null,
					state: null, // 状态，1：投放，2：停止
					deviceType: "", // 设备类型
					deviceTypeName: "",
					threshold: 20, // 门槛金额
					startReduction: 0.0, // 开始随机立减价格
					endReduction: 1.0, // 结束随机立减价格
					memberCount: 1, // 用户每人参与次数
					couponNumber: 2000, // 优惠总次数
					startTime: moment().format("YYYY-MM-DD"), //开始时间
					endTime: moment().subtract(-1, "month").format("YYYY-MM-DD"), //结束时间
					placeIds: "", //场地 ，String类型 用逗号分割
					placeText: "",
					couponPlaces: [],
				},
				// 时间
				timePopup: false,
				timeType: "start",
				timeTitle: "请选择开始时间",
				currentDate: Number(new Date()),
				handleType: "add",
			};
		},
		onLoad(option) {
			if (option.params) {
				const params = JSON.parse(option.params)
				this.handleType = params.handle
				Object.assign(this.coupon, params)
				if (this.coupon.id) {
					this.getClassById(this.coupon.id)
				}
			}
		},
		methods: {
			stopKeyborad() {
				uni.hideKeyboard()
			},
			// 获取详情
			async getClassById(id) {
				let res = await marketingController.getCouponRandomById({
					id
				});
				if (res.code == 200) {
					Object.assign(this.coupon, res.data)

					if (res.data.couponPlaces != null) {
						this.coupon.placeText = `已选${res.data.couponPlaces.length}个场地`
						let arr = res.data.couponPlaces.map((item) => {
							return item.placeId
						})
						this.$nextTick(() => {
							this.coupon.placeIds = String(arr)
							this.$refs.placelist.checkboxGroup = arr
						})
					}
				}
			},
			// 时间
			pickerTime(type) {
				if (type == "start") {
					this.timeType = "start"
					this.timeTitle = "请选择开始时间"
					this.currentDate = new Date(this.coupon.startTime).getTime()
				} else {
					this.timeType = "end"
					this.timeTitle = "请选择结束时间"
					this.currentDate = new Date(this.coupon.endTime).getTime()
				}
				this.timePopup = true
			},
			confirmTimeMethod(value) {
				let date = moment(value).format("YYYY-MM-DD")
				if (this.timeType == "start") {
					this.coupon.startTime = date
				} else {
					this.coupon.endTime = date
				}
				this.timePopup = false
			},
			//按场地
			getPlaceId(place) {
				this.coupon.placeText = `已选${place[1].length}个场地`
				this.coupon.placeIds = String(place[1])
			},
			//设备类型
			changDeviceType(coupon) {
				this.coupon.deviceTypeName = coupon.typeName
				this.coupon.deviceType = coupon.deviceTypeId
			},
			rule() {
				const route = "/pages/subpackages/home/marketingModule/coupon/rule/index"
				this.$goTo(route, "navigateTo", {
					type: this.coupon.type * 1 + 1
				})
			},
			async confirmMethod() {
				let res = await marketingController.addCouponRandom({dto: this.coupon});
				if (res.code == 200) {
					this.$toast("添加成功~")
					this.$goBack()
				}
			},
			// 终止活动
			changeMethod() {
				this.$modal("你确定终止营销活动吗？",{
						title: "温馨提示",
						confirmText: "终止",
					})
					.then(() => {
						this.coupon.state = 2
						marketingController.updateCouponRandom({
								dto: this.coupon
							})
							.then((res) => {
								if (res.code == 200) {
									this.$toast("终止成功~");
									if (this.coupon.id) {
										this.getClassById(this.coupon.id);
									}
								}
							})
							.catch(() => {});
					})
					.catch(() => {});
			},
			// 修改活动
			changeActivity() {
				if (!this.coupon.placeIds) {
					return this.$toast("场地不能为空~");
				}
				marketingController.updateCouponRandom({
						dto: this.coupon
					})
					.then((res) => {
						if (res.code == 200) {
							this.$toast("修改成功~");
							this.$goBack()
						}
					})
					.catch(() => {});

			}
		},
	};
</script>

<style lang="scss" scoped>
	.random_detail_wrapper {
		width: 100%;
		padding-bottom: 70px;

		.detail-random-wrapper {
			background-color: #fff;
			padding: 14px 10px;
			margin-bottom: 10px;

			.cell {
				font-size: 14px;
				line-height: 20px;
				margin-bottom: 12px;
				padding-right: 10px;
				color: #1b1b1b;
				display: flex;
				align-items: center;

				.label {
					display: inline-block;
					width: 60px;
					text-align: right;
					margin-right: 9px;
					color: #666;
				}

				.stopbtn {
					padding: 0px 12px;
					line-height: 20px;
					text-align: center;
					background: #5241ff;
					color: #fff;
					border-radius: 10px;
					margin-left: 5px;
					cursor: pointer;
					outline: 0;
				}
			}
		}

		.cell-group {
			background: #fff;

			.cell-item-title {
				padding: 0 10px;
				line-height: 50px;
				display: flex;
				align-items: center;
				background-color: #f5f5f5;
				color: #666;
				font-size: 14px;
			}

			.cell-item {
				padding: 0 10px;
				line-height: 50px;
				display: flex;
				align-items: center;

				.cell-label {
					font-size: 15px;
				}

				.cell-value {
					flex: 1;
					padding-left: 10px;
					text-align: right;
					font-size: 15px;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.input {
						border: 0;
						text-align: right;
						line-height: 30px;
						height: 30px;
						width: 100%;
						box-sizing: border-box;
					}

					.unit_input {
						border: 1px solid #d8d8d8;
						line-height: 28px;
						height: 28px;
						border-radius: 3px;
						box-sizing: border-box;
						margin: 0 5px;
						width: 48px;
						text-align: center;
						color: #5241ff;
					}

					.mint-field-core {
						font-size: 15px;
						appearance: none;
						text-align: right;
						border: 0;
						border-radius: 0;
						flex: 1;
						line-height: 1.2;
						outline: 0;
						width: 100%;
					}
				}

				.rule {
					background-color: #f0f1f2;
					color: #989899;
					font-size: 12px;
					padding: 0 5px;
					line-height: 20px;
				}

				.unit {
					font-size: 15px;
				}

				.has-arrow {
					padding-right: 20px;
					position: relative;
				}

				.has-arrow:after {
					border-right: 1px solid #4c4c4c;
					border-top: 1px solid #4c4c4c;
					content: "";
					height: 10px;
					opacity: 0.6;
					position: absolute;
					right: 5px;
					top: 50%;
					transform: translateY(-50%) rotate(45deg);
					width: 10px;
				}

				.flex {
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}

			.cell-item:not(:last-child) {
				border-bottom: 1px solid #e5e5e5;
			}
		}

		.mb10 {
			margin-bottom: 10px;
		}

		// 完成创建
		.btn-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 10px;
			background: #fff;

			.btn {
				background-color: #5241ff;
				color: #fff;
				flex: 1;
				font-size: 17px;
				line-height: 50px;
				border-radius: 6px;
				text-align: center;
			}

			.disabled {
				opacity: 0.5;
				pointer-events: none;
			}
		}

		// 底部栏
		.btn-bottom-wrapper {
			background: #fff;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			font-size: 17px;
			line-height: 50px;
			text-align: center;
			background-color: #5241ff;
			color: #fff;

			.left {
				flex: 1;
				border-right: 1px solid #fff;
			}

			.btn {
				flex: 1;
			}
		}
	}

	.state-style {
		position: absolute;
		top: 98px;
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

	//
	.content-popup {
		padding: 19px 16px;
		width: 261px;

		.title {
			color: #1a1a1a;
			font-size: 18px;
			font-weight: 500;
			line-height: 25px;
			text-align: center;
		}

		.content {
			background: #f5f5f5;
			border-radius: 5px;
			padding: 15px 8px;
			word-wrap: break-word;
			margin: 40px 0;
			font-size: 14px;
		}

		.btn {
			background: #5241ff;
			border-radius: 5px;
			color: #fff;
			font-size: 17px;
			text-align: center;
			font-weight: 500;
			height: 45px;
			line-height: 45px;
			width: 100%;
		}

		.tips {
			text-align: center;
			font-size: 14px;
		}

		.tips-panel {
			margin-top: 30px;
			padding-bottom: 20px;
			align-items: center;
			color: grey;
			display: flex;
			font-size: 14px;
			flex-direction: column;
			justify-content: center;
		}
	}
</style>