<template>
	<view class="searchBox-wrapper" :style="{background:bgColor}">
		<view class="searchBox-input-wrapper">
			<view class="search-input" :class="{'search-focus':inputFocus}">
				<form action="javascript:void 0">
					<input type="search" :placeholder="placeholder" v-model="inputEnter" class="input"
						:class="{'input-focus':inputFocus}" @focus="inputFocus = true" @input="userInputing"
						@blur="inputBlur" @keyup.13="tapToSearch" @confirm="tapToSearch" :style="{background:inputColor}" />
				</form>
				<view class="clear-btn" v-show="showClear" @click="inputEnter = ''">
					<u-icon name="close-circle-fill" color="#c6c7cb" size="38"></u-icon>
				</view>
			</view>
			<view class="search-icon" :style="[inputFocus?{ left: 0, margin: 0 }:{ left: '48%', 'margin-left': marLeft }]">
				<u-icon name="search" color="#8e8e93" size="48"></u-icon>
			</view>
			<view class="cancel-btn" :class="{'cancel-focus':inputFocus}" @click.stop="cancelOrcomfirm"
				v-html="inputEnter ? '确定' : '取消'"></view>
		</view>
	</view>
</template>

<script>
	import {
		debounceFun
	} from "@/plugins/debounceOrthrottle";
	export default {
		name: "xls-search",
		props: {
			marLeft: {
				type: String,
				default: "-5.5em",
			},
			placeholder: {
				type: String,
				default: "输入搜索关键词",
			},
			bgColor: {
				type: String,
				default: "#fff",
			},
			inputColor: {
				type: String,
				default: "#f2f2f2",
			},
		},
		data() {
			return {
				//焦点
				inputFocus: false,
				//输入
				inputEnter: "",
				//清空输入
				showClear: false,
			};
		},
		methods: {
			// 输入
			userInputing() {
				this.showClear = this.inputEnter != "";
				this.inputMethod();
			},
			inputMethod: debounceFun(async function() {
				if (this.inputEnter) {
					this.$emit("input", this.inputEnter);
				}
			}, 600),

			inputBlur() {
				this.inputEnter ?
					(this.showClear = true) :
					((this.inputFocus = false), (this.showClear = false));
				if (!this.inputEnter) {
					this.$emit("confirm", "");
				}
			},
			cancelOrcomfirm() {
				if (!this.inputEnter) {
					this.inputFocus = false;
					this.showClear = false;
					this.inputEnter = "";
					this.$emit("confirm", this.inputEnter);
				} else {
					this.$emit("confirm", this.inputEnter);
				}
			},
			tapToSearch() {
				this.$emit("confirm", this.inputEnter);
				uni.hideKeyboard();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.searchBox-wrapper {
		height: 100rpx;
		box-sizing: border-box;
		padding: 20rpx 24rpx;

		.searchBox-input-wrapper {
			display: flex;
			position: relative;
			width: 100%;
			font-size: 28rpx;

			.search-input {
				flex: 1;
				height: 100%;
				padding-left: 10rpx;
				position: relative;
				transition: width 0.3s;

				.input {
					border-radius: 8rpx;
					color: #343434;
					font-size: 30rpx;
					border: 0;
					height: 60rpx;
					line-height: 60rpx;
					margin: 0;
					text-align: center;
					width: 100%;
					z-index: 2;
				}

				input[type="search"]::-webkit-search-cancel-button {
					-webkit-appearance: none;
				}

				.input-focus {
					text-align: left;
					padding: 0 60rpx 0 62rpx;
				}

				.clear-btn {
					align-items: center;
					display: flex;
					height: 100%;
					position: absolute;
					right: 20rpx;
					top: 0;
					z-index: 3;
				}
			}

			.search-focus {
				width: 100%;
			}

			.search-icon {
				align-items: center;
				color: #8e8e93;
				display: flex;
				font-size: 30rpx;
				height: 100%;
				padding: 0 10rpx 0 20rpx;
				position: absolute;
				top: 0;
				transition: left 0.3s;
				z-index: 3;
			}

			.icon-focus {
				left: 0;
				margin-left: 0;
			}

			.cancel-btn {
				color: #5241ff;
				display: none;
				font-size: 30rpx;
				height: 60rpx;
				line-height: 60rpx;
				padding-left: 20rpx;
				transition: width 0.3s;
				width: 0;
			}

			.cancel-focus {
				display: block;
				width: auto;
			}
		}
	}
</style>