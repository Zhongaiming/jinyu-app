<template>
	<div id="craneMachine">
		<div class="mui-input-group">
			<div class="mui-input-row">
				<div class="panel-hd">
					<span>设备编号</span>
					<span class="sub-text">（用于启动设备，同一个投放场地编号不可重复）</span>
				</div>
				<div class="mui-row">
					<div class="mui-col">
						<span class="mui-inline done"></span>
						<span i18n-html="cs_other">已注册</span>
					</div>
					<div class="mui-col">
						<span class="mui-inline option"></span>
						<span i18n-html="cs_other">可选</span>
					</div>
					<div class="mui-col">
						<span class="mui-inline active"></span>
						<span i18n-html="cs_other">选中</span>
					</div>
				</div>
			</div>
			<div class="reg-list">
				<div class="option-list">
					<div class="option-list-item" v-for="index of 32" :key="index">
						<div class="item-con" :class="getClass(index)" @click="chooseOption(index)">
							{{ index == 32 ? "其他" : index }}
						</div>
					</div>
					<div class="option-list-item float" v-if="activeItem == 32">
						<div class="item-con">
							<input type="text" class="other_inp" ref="input" maxlength="4" v-model="railNumber"
								@blur="getRail" :focus="focusInput" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "craneMachine",
		props: {
			disableList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				activeItem: "", //选中编号
				railNumber: "", //机器编号
				focusInput: false,
			};
		},
		methods: {
			getClass(index) {
				return this.disableList.includes(index) ?
					'item-done' :
					index == this.activeItem ?
					'item-active' :
					'item-option'
			},
			chooseOption(params) {
				this.activeItem = params;
				if (params == 32) {
					this.goSearch();
				} else {
					this.$emit("getRailNumber", params);
				}
			},
			getRail() {
				if (!this.disableList.includes(this.railNumber * 1)) {
					let params = this.railNumber ? this.railNumber : "";
					this.$emit("getRailNumber", params);
				} else {
					this.railNumber = "";
					this.$toast("场地已存在改机台号~");
					this.focusInput = true
				}
			},
			goSearch() {
				this.isShowsearch = !this.isShowsearch;
				this.focusInput = true
			},
		},
	};
</script>

<style lang="scss" scoped>
	#craneMachine {
		width: 100%;
		padding-bottom: 90px;

		.position {
			margin-bottom: 12px;
		}

		.top-title {
			height: 44px;
			background: #fff;
			box-sizing: border-box;
			border-bottom: 1px solid #e6e6e6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 16px;

			.left {
				width: 40%;
				padding-left: 12px;
			}

			.right {
				width: 50%;
				padding-right: 15px;
				color: #8d8d8d;
				text-align: right;
				font-size: 14px;
			}
		}

		.mui-input-group {
			background: #fff;
			box-sizing: border-box;

			.mui-input-row {
				padding: 15px;
				font-size: 16px;
				border-bottom: 1px solid #e6e6e6;

				.panel-hd {
					padding-bottom: 10px;

					.sub-text {
						font-size: 12px;
						color: #666;
					}
				}

				.mui-row {
					display: flex;

					.mui-col {
						width: 33.33%;
						padding: 8px 0;
						display: flex;
						align-items: center;

						.cs_other {
							font-weight: normal;
							color: #000;
						}

						.mui-inline {
							display: inline-block;
							width: 20px;
							height: 20px;
							margin-right: 10px;
							border-radius: 2px;
						}

						.done {
							background-color: #cecece;
						}

						.option {
							border: 1px solid #5241ff;
						}

						.active {
							background: #5241ff;
						}
					}
				}
			}

			.reg-list {
				font-size: 16px;

				.option-list {
					margin: 10px;
					display: flex;
					flex-wrap: wrap;
					position: relative;

					.option-list-item {
						box-sizing: border-box;
						width: 25%;
						padding: 5px;

						.item-con {
							text-align: center;
							height: 60px;
							line-height: 60px;
							font-size: 18px;
							border-radius: 6px;
						}

						.item-done {
							color: #fff;
							background: #cecece;
							pointer-events: none;
						}

						.item-active {
							background: #5241ff;
							color: #fff;
						}

						.item-option {
							color: #5241ff;
							background-size: contain;
							box-sizing: border-box;
							border: 1px solid #5241ff;
						}

						.other_inp {
							height: 100%;
							width: 100%;
							box-sizing: border-box;
							font-size: 18px;
							text-align: center;
							border-radius: 6px;
							border: 0;
							background: #5241ff;
							color: #fff;
						}
					}

					.float {
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
			}
		}
	}
</style>