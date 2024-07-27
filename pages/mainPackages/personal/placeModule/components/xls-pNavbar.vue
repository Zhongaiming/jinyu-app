<template>
	<view class="xls-p-navbar">
		<view class="xls-p-navbar-main">
			<view class="left" @click="goBack">
				<image :src="`${$baseUrl}appV4/img/icons/back.png`" alt="" class="image" mode="widthFix" />
			</view>
			<view class="center">
				<view class="center-input-box">
					<image :src="`${$baseUrl}appV4/img/icons/search.png`" alt="" class="image" mode="widthFix" />
					<input type="text" v-model="inputEnter" placeholder="请输入场地关键词" @blur="inputBlur"
						@keyup.13="inputSearch" />
				</view>
			</view>
			<view class="right" @click="goTo">操作记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "xlsPNavbar",
		data() {
			return {
				inputEnter: "",
			};
		},
		methods: {
			inputBlur() {
				this.inputEnter ?
					(this.showClear = true) :
					((this.inputFocus = false), (this.showClear = false));
				if (!this.inputEnter) {
					this.$emit("stratesSearch", "");
				}
			},
			inputSearch() {
				this.$emit("stratesSearch", this.inputEnter);
				document.activeElement.blur();
			},
			goBack() {
				uni.navigateBack()
			},
			goTo() {
				this.$goTo('/pages/mainPackages/personal/placeModule/placeOperateRecord', 'navigateTo', {

				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.xls-p-navbar {
		height: 88rpx;
		width: 100%;

		&-main {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 99;
			height: 88rpx;
			background: #f5f6f7;
			@include center-flex();
		}

		.left {
			width: 12%;
			@include center-flex();

			.image {
				width: 30rpx;
			}
		}

		.center {
			width: 67.4%;
			height: 88rpx;
			@include center-flex();

			.center-input-box {
				flex: 1;
				height: 60rpx;
				display: flex;
				background: #edeef0;
				border-radius: 30rpx;
				@include center-flex();

				.image {
					width: 30rpx;
				}

				input {
					height: 19rpx;
					width: 85%;
					margin-left: 3%;
					border: 0;
					padding: 0;
					outline: none;
					font-size: 26rpx;
					background: none;
					appearance: none;
					color: #000;
					font-family: PingFangSC-Regular, Helvetica Neue, Microsoft JhengHei,
						Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC,
						WenQuanYi Micro Hei, sans-serif;
				}
			}
		}

		.right {
			flex: 1;
			margin-left: 32rpx;
			color: #5241FF;
			font-size: 26rpx;
			text-align: center;
			font-family: PingFangSC, PingFangSC-Regular;
		}
	}
</style>