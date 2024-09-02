<template>
	<view class="changePassword">
		<view class="content">
			<view class="title">修改登录密码</view>
			<view class="enter">
				<form action="" style="width: 100%">
					<u--input v-model="wordList.oldPassword" placeholder="请输入旧密码" type="password"
						autocomplete border="none" :customStyle="{height: '100rpx'}"/>
				</form>
			</view>

			<view class="enter">
				<form action="" style="width: 100%">
					<u--input v-model="wordList.userPassword" placeholder="请输入新密码" type="password"
						autocomplete border="none" :customStyle="{height: '100rpx'}"/>
				</form>
			</view>
			<view class="enter">
				<form action="" style="width: 100%">
					<u--input v-model="wordList.password" placeholder="请确认新密码" type="password"
						autocomplete border="none" :customStyle="{height: '100rpx'}"/>
				</form>
			</view>

			<view class="enter">
				<u--input v-model="wordList.ranCode" placeholder="请输入图形验证码"
					@input="isShade=wordList.ranCode?false:true" maxlength="5" 
					border="none" :customStyle="{height: '100rpx'}" />
				<view>
					<xls-ran-code @getRancode="getRancode" ref="ranCode" />
				</view>
			</view>

			<view class="btn-box">
				<view class="btn" @click="changPassword">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from "js-md5";
	import { getInfo } from "@/common/auth";
	import {
		loginAndRegController
	} from "@/api/index.js";
	export default {
		data() {
			return {
				wordList: {
					username: "",
					oldPassword: "",
					password: "",
					userPassword: "",
					ranCode: "",
					phone: "",
					ranCodeNumber: "",
				},
				ranCode: "",
			};
		},
		onLoad() {
			const {userPhone,username} = getInfo();
			this.wordList.username = username;
			this.wordList.phone = userPhone;
		},
		methods: {
			getRancode(code) {
				this.ranCode = code;
			},
			async changPassword() {
				if (!this.wordList.oldPassword) {
					return this.$toast("请输入旧密码~");
				}
				if (!this.wordList.password || !this.wordList.userPassword) {
					return this.$toast("请输入新密码~");
				}
				if (this.wordList.password !== this.wordList.userPassword) {
					return this.$toast("前后输入密码不一致~");
				}
				if (this.wordList.password === this.wordList.oldPassword) {
					return this.$toast("新密码与旧密码一样~");
				}
				if (this.ranCode.toLowerCase() != this.wordList.ranCode.toLowerCase()) {
					this.$refs.ranCode.refreshCode();
					return this.$toast("图形验证码有误！！");
				}
				const params = {
					username: this.wordList.username,
					oldPassword: md5(this.wordList.oldPassword),
					password: md5(this.wordList.password),
					code: this.wordList.ranCode,
				}
				let res = await loginAndRegController.updateUser(params);
				if (res.code == 200) {
					this.$toast("修改成功,请重新登录~");
					uni.reLaunch({
						url: '/'
					});
				} else if (res.data.msg) {
					return this.$toast(res.data.msg);
				} else {
					return this.$toast("修改失败~");
				}
			},
			
		},
	};
</script>

<style lang="scss" scoped>
	.changePassword {
		height: 100vh;
		width: 100%;
	}

	.van-cell {
		font-size: 16px;
		padding: 13px 12px;
	}

	.btn-box {
		margin: 20px 10px;

		.btn {
			background: #5241FF;
			color: #fff;
			font-size: 18px;
			font-weight: 400;
			border-radius: 6px;
			line-height: 44px;
			text-align: center;
		}
	}

	.content {
		width: 90%;
		margin: 0 auto;

		.title {
			font-size: 24px;
			font-weight: 700;
			padding: 50px 0 30px 0;
		}

		.enter {
			border-bottom: 1px solid rgb(240, 233, 233);
			display: flex;
			align-items: center;
		}
	}

	.btnStyle {
		margin-left: 2%;
		position: relative;
		height: 30px;
		width: 94px;
		border-radius: 8px;
		background: #5241FF;
		font-size: 14px;
		font-weight: 400;
		line-height: 30px;
		color: #fff;
		text-align: center;
	}

	.shade {
		// pointer-events: none;
		opacity: 0.5;
	}
</style>