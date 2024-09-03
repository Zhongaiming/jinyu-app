<template>
	<!-- 参数设置 -->
	<view class="amend-parameter">
		<!-- 4/5 枚举型 字符型-->
		<u-popup :show="showBoolen" mode="bottom">
			<view class="main-content-set" v-if="params.dataType == 4">
				<u-picker :columns="paramsList" title="" show-toolbar @confirm="confirmMethed"
					@cancel="showBoolen = false" :default-index="defaultIndex" />
			</view>
			<view class="main-content-set" v-if="params.dataType == 5">
				<u-picker :columns="paramsList" title="" show-toolbar @confirm="confirmMethed"
					@cancel="showBoolen = false" :default-index="defaultIndex" />
			</view>
		</u-popup>
		<!-- 2/3 整数型 浮点型-->
		<u-popup :show="showNumber" mode="center" round>
			<view class="number-wrapper" v-if="showNumber">
				<view class="mui-popup-inner">
					<view class="mui-popup-text">{{ params.functionName }}</view>
					<view class="mui-numbox-input Center">
						<u-stepper v-if="params.dataType == 2" v-model="activeValue" input-width="134px"
							button-size="36px" :integer="params.dataType == 2" :min="params.ints.valueRangeStart"
							:max="params.ints.valueRangeEnd" />
						<u-stepper v-if="params.dataType == 3" v-model="activeValue" input-width="134px"
							button-size="36px" step="0.1" :min="params.floats.valueRangeStart"
							:max="params.floats.valueRangeEnd" />
					</view>
					<view class="mui-popup-text" v-if="params.dataType == 2">
						输入范围为{{ params.ints.valueRangeStart }}-{{params.ints.valueRangeEnd}}
					</view>
					<view class="mui-popup-text" v-else>
						输入范围为{{ params.floats.valueRangeStart }}-{{params.floats.valueRangeEnd}}
					</view>
				</view>
				<view class="mui-popup-buttons">
					<view class="text-button" @click="showNumber = false">取消</view>
					<view class="text-button" @click="confrimSet">确定</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "amend-param",
		data() {
			return {
				activeValue: 0,
				paramsList: [],
				params: {
					arr: 0,
					ints: {
						valueRangeStart: 0,
						valueRangeEnd: 0,
					},
					floats: {
						valueRangeStart: 0,
						valueRangeEnd: 0,
					},
				},
				showBoolen: false,
				showNumber: false,
				defaultIndex: 0,
			};
		},
		methods: {
			// dataType 数据类型：1:布尔类型，2:整数型，3:浮点型，4:枚举型，5字符型
			openSet(item) {
				if (item.disabled == 1) {
					return this.$toast("禁止修改~");
				}
				this.paramsList = [];
				this.params = item;
				this.activeValue = item.arr;
				this.showBoolen = false;
				this.showNumber = false;
				if (item.dataType == 4) {
					item.openParameterSetEnum.forEach((items, index) => {
						if (items.enumValueNumerical == item.arr) this.defaultIndex = index;
						let obj = {
							text: `${items.enumValueDescribe}`,
							id: items.enumValueNumerical,
						};
						this.paramsList.push(obj);
					});
					this.showBoolen = true;
				} else if (item.dataType == 5) {
					// 字符型 0 GBK; 1 GB2312; 2 UTF-8; item.chars.encodingType
					this.paramsList = [{
							id: 0,
							text: "GBK"
						},
						{
							id: 1,
							text: "GB2312"
						},
						{
							id: 2,
							text: "UTF-8"
						},
					];
					this.defaultIndex = item.arr;
					this.showBoolen = true;
				} else {
					// 2/3
					this.showNumber = true;
				}
			},
			//4/5
			confirmMethed(picker, value) {
				this.activeValue = this.paramsList[value].id;
				this.confrimSet();
			},
			//2/3/4/5
			confrimSet() {
				if (
					this.params.dataType == 2 &&
					(this.activeValue > this.params.ints.valueRangeEnd ||
						this.activeValue < this.params.ints.valueRangeStart)
				) {
					return this.$toast("请输入范围内的值~");
				} else if (
					this.params.dataType == 3 &&
					(this.activeValue > this.params.floats.valueRangeEnd ||
						this.activeValue < this.params.floats.valueRangeStart)
				) {
					return this.$toast("请输入范围内的值~");
				}
				this.params.arr = this.activeValue; // 浅拷贝 值改变
				this.showBoolen = false;
				this.showNumber = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.amend-parameter {
		width: 100%;

		.mui-poppicker-header {
			padding: 6px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #e5e5e5;

			.text-button {
				color: #5241ff;
				padding: 5px 10px;
				font-size: 16px;
			}
		}

		.main-content-set {
			overflow-y: scroll;
			padding: 0px 0 20px;
		}

		.number-wrapper {
			width: 270px;

			.mui-popup-inner {
				padding: 20px 0;

				.mui-popup-text {
					padding: 16px 20px 0;
					font-size: 14px;
					line-height: 21px;
					color: #666;
					text-align: center;
				}

				.mui-numbox-input {
					margin: 20px auto 0;
				}
			}

			.mui-popup-buttons {
				display: flex;
				align-items: center;
				line-height: 50px;
				font-size: 16px;
				text-align: center;
				border-top: 1px solid #e5e5e5;

				.text-button {
					flex: 1;
				}

				.text-button:not(:last-child) {
					border-right: 1px solid #e5e5e5;
				}
			}
		}
	}
</style>