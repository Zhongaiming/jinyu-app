<template>
	<view class="coupon_wrapper">
		<xls-jy-navbar title="创建满减卷活动" bgColor="#f5f6f7"></xls-jy-navbar>
		<!-- 添加 -->
		<view v-if="handle == 'add'">
			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动类型</view>
					<view class="cell-value">
						支付立减券（支付{{ coupon.type == 1 ? "前" : "后" }}派发）
					</view>
					<view class="rule" @click="rule">规则</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">活动类型</view>
					<view class="cell-value has-arrow" @click="$refs.deviceType.showDeviceTypelist()">
						<input type="text" placeholder="请选择" v-model="coupon.deviceTypeName" @focus="stopKeyborad"
							class="input" />
					</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动名称</view>
					<view class="cell-value">
						<input type="text" placeholder="请输入活动名称（不能超过8个字）" v-model="coupon.activityName" maxlength="8"
							class="input" />
					</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">发放总张数</view>
					<view class="cell-value">
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.certificateTotal" />
					</view>
					<view class="unit">张</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">赠送一张满减券</view>
					<view class="cell-value flex">
						满
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.fullAmount" />
						元减
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.reduceMoney" />
						元券
					</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">券有效期</view>
					<view class="cell-value flex">
						领取后
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.term" />
						天内有效
					</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">
						是否一次性领取<u-icon name="question-circle" size="40" @click="tips" />
					</view>
					<view class="cell-value flex">
						<u-switch v-model="coupon.disposableChecked" size="50" active-color="#5241ff" />
					</view>
				</view>

				<view class="cell-item" v-if="!coupon.disposableChecked">
					<view class="cell-label">赠券规则</view>
					<view class="cell-value flex">
						每人每
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.day" />
						天，可领
						<input type="text" maxlength="8" class="unit_input" v-model="coupon.sheetsTotal" />
						张券
					</view>
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
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">开展活动场地</view>
					<view class="cell-value has-arrow" @click="$refs.placelist.showPlacePopup()">
						<input type="text" placeholder="请选择" @focus="stopKeyborad" class="input"
							v-model="coupon.placeText" />
					</view>
				</view>
			</view>

			<view class="cell-group mb10" v-if="coupon.type == 1">
				<view class="cell-item">
					<view class="cell-label">备注</view>
					<view class="cell-value flex">
						<textarea placeholder="选填项，最多20个字（备注信息仅供你自己查看，方便记录）" rows="2" class="mint-field-core"
							v-model="coupon.remark"></textarea>
					</view>
				</view>
			</view>

			<view class="btn-bottom">
				<view class="btn" :class="{'disabled':!coupon.activityName||!coupon.deviceTypeName}"
					@click="confirmMethod">
					完成创建
				</view>
			</view>
		</view>

		<!-- 详情 -->
		<view v-if="handle == 'detail'">
			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">活动类型</view>
					<view class="cell-value">
						支付立减券（支付{{ coupon.type == 1 ? "前" : "后" }}派发）
					</view>
					<view class="rule" @click="rule">规则</view>
				</view>
			</view>
			<!-- 前 -->
			<view class="cell-group mb10" v-if="coupon.type == 1">
				<view class="cell-item">
					<view class="cell-label">活动名称</view>
					<view class="cell-value">
						{{ coupon.activityName }}
					</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">设备类型</view>
					<view class="cell-value">
						{{ coupon.deviceTypeName }}
					</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">优惠金额</view>
					<view class="cell-value">{{ coupon.reduceMoney }} 元</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">使用门槛</view>
					<view class="cell-value">≥{{ coupon.fullAmount }} 元</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">发放总张数</view>
					<view class="cell-value">{{ coupon.certificateTotal }} 张</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">券有效期</view>
					<view class="cell-value">领取后{{ coupon.term }}天内有效</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">是否一次性领取</view>
					<view class="cell-value">
						{{ coupon.disposableType == 1 ? "否" : "是" }}
					</view>
				</view>
				<view class="cell-item" v-if="coupon.disposableType == 1">
					<view class="cell-label">赠券规则</view>
					<view class="cell-value">
						每人每{{ coupon.day }}天，可领{{ coupon.sheetsTotal }}张券
					</view>
				</view>
				<view class="cell-item" v-else>
					<view class="cell-label">每人可领取张数</view>
					<view class="cell-value">{{ coupon.sheetsTotal }} 张</view>
				</view>
			</view>

			<!-- 后 -->
			<view class="cell-group mb10" v-else>
				<view class="cell-item">
					<view class="cell-label">活动名称</view>
					<view class="cell-value">
						{{ coupon.activityName }}
					</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">设备类型</view>
					<view class="cell-value">
						{{ coupon.deviceTypeName }}
					</view>
				</view>
				<view class="cell-item">
					<view class="cell-label">赠送一张券（下次使用）</view>
					<view class="cell-value">
						满 {{ coupon.fullAmount }} 减 {{ coupon.reduceMoney }} 元券
					</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">券有效期</view>
					<view class="cell-value">领取后{{ coupon.term }}天内有效</view>
				</view>

				<view class="cell-item">
					<view class="cell-label">是否一次性领取</view>
					<view class="cell-value">
						{{ coupon.disposableType == 1 ? "否" : "是" }}
					</view>
				</view>
				<view class="cell-item" v-if="coupon.disposableType == 1">
					<view class="cell-label">赠券规则</view>
					<view class="cell-value">
						每人每{{ coupon.day }}天，可获赠{{ coupon.sheetsTotal }}张券
					</view>
				</view>
				<view class="cell-item" v-else>
					<view class="cell-label">每人可领取张数</view>
					<view class="cell-value">{{ coupon.sheetsTotal }} 张</view>
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
					<view class="cell-label">备注</view>
					<view class="cell-value">{{ coupon.remark }}</view>
				</view>
			</view>

			<view class="cell-group mb10">
				<view class="cell-item">
					<view class="cell-label">开展活动场地</view>
					<view class="cell-value has-arrow" @click="$refs.placelist.showPlacePopup()">
						<input type="text" placeholder="请选择" @focus="stopKeyborad" class="input"
							v-model="coupon.placeText" />
					</view>
				</view>
			</view>

			<!-- 底部操作栏 -->
			<view class="btn-bottom-wrapper" v-if="coupon.state == 1">
				<view class="btn" @click="(linkMessage = true), (linkQsPopup = true)" v-if="coupon.type == 1">
					生成链接
				</view>
				<view class="btn" @click="(linkMessage = false), (linkQsPopup = true)" v-if="coupon.type == 1">
					生成二维码
				</view>
				<view class="btn" @click="editMethod" v-hasPermi="['app:marketing:coupon:edit']">
					<!-- v-if="coupon.type == 2" -->
					确定修改
				</view>
				<view class="btn warn" @click="editMethod(1)" v-hasPermi="['app:marketing:coupon:terminated']">
					终止活动
				</view>
			</view>
			<view class="state-style" :class="{'un-state':coupon.state == 2}">
				{{coupon.state == 1 ? "投放中" : coupon.state == 2 ? "已终止" : "已停用"}}
			</view>
		</view>
		
		<!-- 时间选择器 -->
		<xls-datetime-picker :show="timePopup" v-model="currentDate" :title="timeTitle" @cancel="timePopup = false"
			@close="timePopup = false" @confirm="confirmTimeMethod"></xls-datetime-picker>
		<!-- 设备类型 -->
		<xls-device-type-radio ref="deviceType" :optionAll="false"
			@changDeviceType="changDeviceType"></xls-device-type-radio>
		<!-- 活动场地 -->
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId"></xls-place-checkbox>
		<!-- 链接 二维码 -->
		<u-popup :show="linkQsPopup" round="20" mode="center" @close="linkQsPopup=false">
			<view class="content-popup" v-if="linkMessage">
				<view class="title">领券链接</view>
				<view class="content">
					{{ `https://mv3.ztuwl.com/g/?key=31000001-1-1&reductionId=${coupon.id}` }}
				</view>
				<view class="btn" @click="
				  copyMemberId(`https://mv3.ztuwl.com/g/?key=31000001-1-1&reductionId=${coupon.id}`)
				  ">
					复制链接
				</view>
			</view>
			<view class="content-popup" v-else>
				<xls-qr-code v-if="linkQsPopup"
					:qsUrl="`https://mv3.ztuwl.com/g/?key=31000001-1-1&reductionId=${coupon.id}`">
				</xls-qr-code>
				<view class="tips">长按可保存到手机</view>
				<view class="tips-panel">
					<p>温馨提示</p>
					<p>
						二维码可投放到线下或者微信公众号进行引流，用户用微信扫码即可领取
					</p>
				</view>
			</view>
		</u-popup>
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
		data() {
			return {
				handle: "",
				coupon: {
					id: null,
					type: 1, // 活动类型，1：支付前发，2：支付后发
					activityName: "", // 活动名称
					deviceType: "", // 设备类型
					deviceTypeName: "",
					certificateTotal: 1000, // 发放总数
					disposableType: 1, //是否一次性领取 1:不可以，2：可以
					disposableChecked: false,
					day: 1, //天数
					sheetsTotal: 1, //每人可以领取张数
					fullAmount: 20, // 使用门槛（多少元）
					reduceMoney: 2, // 优惠金额
					term: 7, //有效期几天
					startTime: moment().format("YYYY-MM-DD"), //开始时间
					endTime: moment().subtract(-1, "month").format("YYYY-MM-DD"), //结束时间
					remark: "", //备注
					receiveState: 1, //领取状态，1：只能领取多少，2：可以领取多少 暂不用
					placeIds: "", //场地 ，String类型 用逗号分割
					placeText: "",
					state: 1,
					couponPlaceType: 2, // 2支付立减券
				},
				// 时间
				timePopup: false,
				timeType: "start",
				timeTitle: "请选择开始时间",
				currentDate: Number(new Date()),
				// 链接 二维码
				linkQsPopup: false,
				linkMessage: false,
			};
		},
		onLoad(option) {
			if (option.params) {
				const params = JSON.parse(option.params)
				this.handle = params.handle
				Object.assign(this.coupon, params)
				if (this.coupon.id) {
					this.getClassById(this.coupon.id)
				}
			}
		},
		methods: {
			// 获取详情
			async getClassById(id) {
				let res = await marketingController.getReductionById({
					id
				});
				if (res.code == 200) {
					Object.assign(this.coupon, res.data)
					this.coupon.disposableChecked = res.data.disposableType == 2
					this.coupon.deviceTypeName = res.data.typeName
					this.coupon.startTime = res.data.startTime.split(" ")[0]
					this.coupon.endTime = res.data.endTime.split(" ")[0]
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
			stopKeyborad() {
				uni.hideKeyboard()
			},
			rule() {
				const route = "/pages/subpackages/home/marketingModule/coupon/rule/index"
				this.$goTo(route, "navigateTo", {
					type: this.coupon.type * 1 + 1
				})
			},
			//copy-会员ID
			copyMemberId(value) {
				copyEvent(value)
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

			//规则说明
			tips() {
				const message =
					"1、开启一次性领取，活动为单次优惠活动。活动期间，每个顾客能且只能领取一张满减券。\n2、关闭一次性领取，活动为周期优惠活动。设置的间隔天数内，顾客可以领取最多不超过“设置张数”的满减券，直至活动结束或券数量派发完毕。"
				this.$modal(message, {
					title: "规则说明",
					confirmText: "我知道了",
					confirmColor: "#5241ff",
					showCancel: false
				});
			},

			async confirmMethod() {
				let res = await marketingController.addReduction({
					dto: this.coupon
				})
				if (res.code == 200) {
					this.$toast("添加成功~")
					this.$goBack()
				}
			},
			// 终止或修改
			async editMethod(type) {
				// 活动状态，1：启用，2：停用，3：完成
				let params
				if (type != 1 && !this.coupon.placeIds) {
					return this.$toast("场地不能为空~")
				}
				if (type == 1) {
					this.coupon.state = 2
				} else {
				}
				let res = await marketingController.updateReductionById({
					dto: this.coupon
				})
				if (res.code == 200) {
					this.$toast("修改成功~")
					this.$goBack()
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.coupon_wrapper {
		width: 100%;
		padding-bottom: 70px;

		.cell-group {
			background: #fff;

			.cell-item {
				padding: 0 10px;
				line-height: 50px;
				display: flex;
				align-items: center;

				.cell-label {
					font-size: 15px;
					display: flex;
					align-items: center;
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
						height: 50px;
						outline: 0;
						width: 100%;
						padding: 5px 0;
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

		.btn-bottom-wrapper {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;

			.btn {
				background-color: #5241ff;
				color: #fff;
				flex: 1;
				font-size: 17px;
				line-height: 50px;
				text-align: center;
			}

			.btn:not(:first-child) {
				border-left: 1px solid #fff;
			}

			.warn {
				background-color: #f56c6c;
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