<template>
	<u-popup :show="coinState" round="20" mode="center">
		<div class="coinState">
			<div class="modal-header">修改套餐展示状态</div>
			<div class="con">
				<div class="item" v-for="item in deviceState" :key="item.id" @click="activeCheck(item)" v-show="
            mealInfo.setMealType == 2 ? (item.id != 2 ? true : false) : true
          ">
					<div class="left-icon" v-show="setMealState != item.id"></div>
					<div class="left-icon active-icon" v-show="setMealState == item.id">
						<div class="min-icon"></div>
					</div>
					<div class="right txt">
						<p class="label-tit" :class="setMealState == item.id ? 'active' : ''">
							{{ item.title }}
						</p>
						<p class="desc-info">{{ item.info }}</p>
					</div>
				</div>
				<div class="info-txt" v-show="mealInfo.moneyType == 1">
					(活动专用：此功能主要用于商户使用营销工具搞活动时,系统可发送指令,执行送币。如抽奖送币,升单送币。适用于原本禁闭1元1币、5元5币的商户)
				</div>
				<div class="del-btn-box" v-show="mealInfo.setMealType == 2" @click="
            (coinState = !coinState), $emit('deleteMealItem', mealInfo.id)
          ">
					<span class="del-btn">删除自定义套餐</span>
				</div>
			</div>
			<div class="btn-box">
				<div class="btn cancel" @click="coinState = !coinState">取消</div>
				<div class="btn confirm" @click="confirmOper">确认</div>
			</div>
		</div>
	</u-popup>
</template>

<script>
	import {
		packageController
	} from '@/api/index.js';

	export default {
		data() {
			return {
				coinState: false,
				setMealState: 1,
				deviceState: [{
						id: 1,
						title: "已启用",
						info: "设备已设置套餐,用户扫码可见，能买"
					},
					{
						id: 2,
						title: "禁止",
						info: "设备未设置套餐，用户扫码不可见，买不到",
					},
					// {id:3,title:'活动专属',info:'设备已设置套餐，但用户不可见，不能买'},
				],
				mealInfo: {
					setMealType: 1,
					moneyType: 2,
					id: 0,
					price: 0,
					currencyQuantity: 0,
					weight: 0,
				},
			};
		},
		methods: {
			showcoinState(meal) {
				// console.log('state',meal)
				// <!-- moneyType 1、兑币  2、储  -->
				// <!-- setMealType 套餐类型;（1：标准，2：自定义） -->
				// <!-- setMealState 套餐状态;（1：启用，2：停用）-->
				this.coinState = !this.coinState;
				this.mealInfo = meal;
				this.setMealState = meal.setMealState;
			},
			activeCheck(item) {
				this.setMealState = item.id;
			},
			async confirmOper() {
				let res = await packageController.editSetMeal({
					id: this.mealInfo.id,
					price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					currencyQuantity: this.mealInfo.currencyQuantity, //兑币数量
					setMealState: this.setMealState, //套餐状态;（1：启用，2：停用）
					weight: this.mealInfo.weight, //权重
				});
				if (res.code == 200) {
					this.coinState = !this.coinState;
					if (this.mealInfo.moneyType == 2) {
						this.$emit("getComboMealList");
					} else if (this.mealInfo.moneyType == 1) {
						this.$emit("getConverList");
					}
					setTimeout(() => {
						this.$toast("编辑成功");
					}, 300);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.coinState {
		width: 320px;
		font-family: PingFangSC, PingFangSC-Regular;

		p {
			padding: 0;
			margin: 0;
		}

		.modal-header {
			background: linear-gradient(90deg, #E6E4FE, #5241FF 67%);
			color: #fff;
			font-size: 18px;
			font-weight: 400;
			height: 60px;
			line-height: 60px;
			text-align: center;
		}

		.con {
			padding: 15px;

			.item {
				border-bottom: 1px solid #e6e6e6;
				display: flex;
				padding: 15px 0;

				.left-icon {
					border: 1px solid #888;
					border-radius: 50%;
					height: 14px;
					margin-right: 10px;
					margin-top: 4px;
					width: 14px;
				}

				.active-icon {
					border: 1px solid #5241FF;
					display: flex;
					align-items: center;
					justify-content: center;

					.min-icon {
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background: #5241FF;
					}
				}

				.label-tit {
					font-size: 16px;
					font-weight: 500;
				}

				.active {
					color: #5241FF;
				}

				.desc-info {
					color: #888;
					font-size: 13px;
					font-weight: 400;
				}
			}

			.info-txt {
				color: #888;
				font-size: 12px;
				font-weight: 400;
				padding-top: 5px;
			}
		}

		.btn-box {
			align-items: center;
			border-top: 1px solid #f5f6f7;
			display: flex;
			height: 60px;

			.btn {
				font-size: 18px;
				font-weight: 400;
				height: 100%;
				line-height: 60px;
				text-align: center;
				width: 50%;
				color: #5241FF;
			}

			.cancel {
				border-right: 1px solid #f5f6f7;
				color: #888;
			}
		}

		.del-btn-box {
			padding: 15px 0;
			text-align: center;

			.del-btn {
				background: #fbe7e7;
				border-radius: 5px;
				color: #f84e57;
				display: inline-block;
				font-family: PingFangSC, PingFangSC-Regular;
				font-size: 12px;
				font-weight: 400;
				padding: 5px;
				text-align: justify;
			}
		}
	}
</style>