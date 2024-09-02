<template>
	<view class="codeSafe">
		<xls-jy-navbar title="账号与安全"></xls-jy-navbar>
		<view class="chooseItem" @click="goTo('changePassword')">
			<view class="main">
				<span>更改登录密码</span>
				<view>
					<u-icon name="arrow-right" size="36" color="#bebaba" />
				</view>
			</view>
		</view>
		<!-- <view class="chooseItem position" @click="$toast('敬请期待~')">
			<view class="main">
				<span>注销账号</span>
				<view>
					<u-icon name="arrow-right" size="36" color="#bebaba" />
				</view>
			</view>
			<view class="text"><span>操作后信息不可恢复，请谨慎考虑</span></view>
		</view> -->
		<view class="chooseItem position" @click="goTo('changePhone')" v-if="!phone">
			<view class="main">
				<span>修改登录手机号</span>
				<view>
					<u-icon name="arrow-right" size="36" color="#bebaba" />
				</view>
			</view>
			<view class="text"><span>修改后，您当前账号中的信息、资产不变</span></view>
		</view>
	</view>
</template>

<script>
	import { getInfo } from "@/common/auth";
	export default {
		name: "codeSafe",
		data() {
			return {
				phone: false,
			};
		},
		onLoad() {
			const {userType} = getInfo();
			this.phone = userType == 5; // 子账号不能修改
		},
		methods: {
			goTo(route) {
				this.$goTo(`/pages/loginAndReg/children/${route}`)
			},
		},
	};
</script>

<style lang="scss" scoped>
	.codeSafe {
		height: 100vh;
		width: 100%;
		background: #efeff4;

		.position {
			padding-bottom: 10px;
		}

		.chooseItem {
			height: 50px;
			width: 100%;
			border-bottom: 1px solid rgb(236, 233, 233);
			background: #fff;
			box-sizing: content-box;

			.main {
				margin: 0 auto;
				width: 95%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 15px;
			}

			.text {
				position: relative;
				bottom: 12px;
				margin: 0 auto;
				width: 95%;
				font-size: 12px;
				color: rgb(189, 186, 186);
			}
		}
	}
</style>