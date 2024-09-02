<template>
	<view class="account-mana">
		<xls-jy-navbar title="账号管理"></xls-jy-navbar>
		<view class="user-wrapper">
			<!-- <view class="item-wrapper" v-for="(item, index) in userList" :key="index"
				@click="loginThisUser(item.username, item.password)">
				<view class="main">
					<img src="@/assets/img/user-header.png" alt="" />
					<view class="text user-info">
						<view>{{ item.nickName }}</view>
						<view>{{ item.username }}</view>
					</view>
				</view>
				<view class="icon">
					<u-icon name="success" size="24" color="#5241FF" v-show="null == item.id" />
				</view>
			</view> -->

			<!-- <view class="bottom">
				<view class="delete" @click="deleteUser = !deleteUser">删除账号</view>
				<view class="addCount">
					<view class="addIcon Center box-sizing">
						<u-icon name="plus" size="19" color="#5241FF" />
					</view>
					<view class="rightB" @click="addUser = !addUser">
						<span class="addCount-txt">添加账号</span><u-icon name="arrow-right" size="32" color="#999" />
					</view>
				</view>
			</view> -->
		</view>
		<view class="user-wrapper">
			<view class="countSafe position" @click="goTo">
				<span>账号安全</span><u-icon name="arrow-right" size="32" color="#999" />
			</view>
		</view>
		<view class="user-wrapper" @click="loginOut">
			<view class="countSafe exit-text"><span>退出账号</span></view>
		</view>
		<!-- 删除账户 -->
		<!-- <u-popup v-model="deleteUser" position="bottom">
			<view class="delete-user-wrapper">
				<view class="title-wrapper">
					<view class="close-btn"></view>
					<view class="main-title">帐号管理</view>
					<view class="close-btn" @click="deleteUser = !deleteUser">关闭</view>
				</view>
				<view class="user-show-wrppaer">
					<view class="item-style" v-for="(item, index) in userList" :key="index">
						<view class="main-wrapper">
							<img src="@/assets/img/user-header.png" alt="" />
							<view class="text">
								<view>{{ item.nickName }}</view>
								<view>{{ item.username }}</view>
							</view>
						</view>
						<view class="btn-delete" v-if="item.id" @click="delUser(item.id, item.nickName)">
							删除
						</view>
					</view>
				</view>
			</view>
		</u-popup> -->
		<!-- 添加用户 -->
		<!-- <view class="add-user-wrapper" v-show="addUser" @click.stop="addUser = !addUser">
			<view class="header-text-wrapper" @click.stop="">
				<view class="tit">用户须知</view>
				<p>
					1.本功能仅适用于同一个商户多个登陆账号的切换。举例:用户登陆A账号时,添加关联B账号后,可以从A账户切换到B账号,无需输入账号密码。但为了保障信息安全,登陆B账号时,必须由B再添加关联A账号,才能做到今后的互相切换。
				</p>
				<p>
					2.请妥善保管账号密码。如需临时添加他人账号，请务必退出账号后再登陆。
				</p>
			</view>

			<view class="footer-enter-wrapper" @click.stop="">
				<view class="title-header">添加账号</view>
				<view class="input-content">
					<view class="input-style-text">账号:</view>
					<view class="input-style">
						<input type="text" placeholder="请输入账号" v-model="userInfo.username" />
					</view>

					<view class="input-style-text">密码:</view>
					<view class="input-style">
						<form>
							<input type="password" placeholder="请输入密码" v-model="userInfo.password" autocomplete />
						</form>
					</view>
				</view>
				<view class="btn-wrapper">
					<view @click.stop="addUser = !addUser" class="btn-style">取消</view>
					<view class="btn-style login-btn" @click="addUserMethods">登录</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	// import local from "@/plugins/storage";
	// import api from "@/utils/login";
	// import md5 from "js-md5";
	// import qs from "qs";
	// import {
	// 	addRoutes
	// } from "@/addRoutes";
	// import Cookies from "js-cookie";

	export default {
		// name: "accountMana",
		data() {
			return {
				deleteUser: false,
				addUser: false,
				userList: [],
				userInfo: {
					username: "",
					password: "",
				},
			};
		},
		// created() {
		// 	this.getUser();
		// },
		methods: {
			//获取
			async getUser() {
				let res = await api.getBingUser();
				if (res.data.code == 0 || res.data.msg == "ok") {
					let nowUser = {
						id: null,
						nickName: local.get("userName"),
						username: local.get("userShowPhone"),
						password: null,
					};
					this.userList = res.data.data;
					this.userList.unshift(nowUser);
				}
			},
			//添加
			async addUserMethods() {
				let data = {
					username: this.userInfo.username,
					password: md5(this.userInfo.password),
				};
				let login = await api.loginXls(qs.stringify(data));
				if (login.data.code != 0 || login.data.msg != "ok")
					return this.$toast(res.data.login);
				let res = await api.addUser({
					username: this.userInfo.username,
					password: md5(this.userInfo.password),
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.addUser = false;
					this.getUser();
					this.userInfo = {
						username: "",
						password: "",
					};
					this.$toast("添加成功~");
				}
			},
			//删除
			async delUser(id, name) {
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: `确定删除账号${name}吗？`,
						width: "280",
					})
					.then(() => {
						api.delUser({
							id
						}).then((res) => {
							if (res.data.code == 0 || res.data.msg == "ok") {
								this.getUser();
								this.$toast("删除成功~");
							}
						});
					})
					.catch(() => {});
			},
			//登录
			async loginThisUser(username, password) {
				if (!password) {
					return this.$toast("当前账号已登录~");
				}
				let data = qs.stringify({
					username: username,
					password: password,
				});
				let res = await api.loginXls(data);
				if (res.data.code == 0 || res.data.msg == "ok") {
					local.set("userName", res.data.data.nickName);
					local.set("useMerName", res.data.data.username);
					local.set("userPhone", res.data.data.username);
					local.set("userShowPhone", res.data.data.username);
					local.set("token", res.headers.token);
					local.set("commercialNumber", res.data.data.commercialNumber);
					local.set("userWechatOpenid", res.data.data.userWechatOpenid);
					local.set("userId", res.data.data.id);
					let userType = res.data.data.userType;
					local.set("userType", userType);
					let permissions = res.data.data.permissions;
					if (userType == 5) {
						//子账号不能认证、不能操作子账号
						let filterList = ['app:payBag:index:authenticate', 'app:account:index',
							'app:account:index:read'
						]
						permissions = permissions.filter(item => !filterList.includes(item))
					}
					local.set("permissions", permissions);
					local.set("loadTimes", 0);
					this.$toast("登录成功");
					this.$parent.getData();
					addRoutes();
					this.getUser();
				} else {
					this.$toast(res.data.msg);
				}
			},
			loginOut() {
				this.$modal("确定要退出登录吗？",{
						title: "温馨提示",
					})
					.then(() => {
						this.$goTo("/", "reLaunch", {})
					})
					.catch(() => {});
			},
			goTo() {
				this.$goTo("/pages/loginAndReg/children/codeSafe")
			},
		},
	};
</script>

<style lang="scss" scoped>
	.account-mana {
		height: 100vh;
		width: 100%;
		background: #f5f6f7;
		position: relative;
	}

	.user-wrapper {
		width: 95%;
		margin: 0 auto;
		border-radius: 8px;
		margin-top: 8px;
		background: #fff;

		.item-wrapper {
			margin-left: 4%;
			height: 65px;
			width: 96%;
			border-bottom: 1px solid #cccccc4d;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.main {
				display: flex;
				align-items: center;

				img {
					height: 45px;
					width: 45px;
					margin-right: 15px;
					border-radius: 10px;
					border: 1px solid #e0e0e0;
				}

				.text {
					:nth-child(1) {
						font-size: 15px;
						font-weight: 500;
						margin-bottom: 3%;
					}

					:nth-child(2) {
						font-size: 13px;
						color: rgb(131, 127, 127);
					}
				}
			}

			.icon {
				width: 10%;
			}

			.user-info {
				max-width: 200px;
			}
		}

		.bottom {
			height: 50px;
			width: 96%;
			margin-left: 4%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.delete {
				width: 68px;
				height: 26px;
				line-height: 26px;
				text-align: center;
				font-size: 13px;
				background: #f2f2f2;
				border-radius: 8px;
			}

			.addCount {
				display: flex;
				justify-content: space-around;
				align-items: center;
				width: 40%;
				color: #5241ff;

				.addIcon {
					height: 24px;
					width: 24px;
					border: 1px solid #5241ff;
					border-radius: 50%;
				}

				.rightB {
					display: flex;
					align-items: center;
					font-size: 16px;

					.addCount-txt {
						color: #5241ff;
						margin-right: 6px;
					}
				}
			}
		}
	}

	.countSafe {
		width: 92%;
		height: 50px;
		margin: 4%;
		font-size: 16px;
	}

	.position {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.exit-text {
		text-align: center;
		color: red;
		line-height: 50px;
	}

	.delete-user-wrapper {
		max-height: 55vh;
		display: flex;
		flex-direction: column;

		.title-wrapper {
			padding: 0 12px;
			line-height: 44px;
			background: #fafafa;
			font-size: 17px;
			display: flex;

			.close-btn {
				text-align: right;
				width: 50px;
				color: #5241ff;
			}

			.main-title {
				flex: 1;
				text-align: center;
			}
		}

		.user-show-wrppaer {
			flex: 1;
			padding: 0 12px;
			padding-bottom: 50px;
			overflow-y: scroll;

			.item-style {
				height: 66px;
				border-bottom: 1px solid rgb(228, 225, 225);
				display: flex;
				align-items: center;
				justify-content: space-between;

				.main-wrapper {
					display: flex;
					align-items: center;

					img {
						height: 45px;
						width: 45px;
						margin-right: 8%;
					}

					.text {
						:nth-child(1) {
							font-size: 14px;
							font-weight: 500;
							margin-bottom: 3%;
						}

						:nth-child(2) {
							font-size: 12px;
							color: rgb(131, 127, 127);
						}
					}
				}

				.btn-delete {
					height: 27px;
					width: 50px;
					border: 1px solid #ea3323;
					color: #ea3323;
					text-align: center;
					line-height: 27px;
					font-size: 14px;
					border-radius: 3px;
				}
			}
		}
	}

	.add-user-wrapper {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0;
		left: 0;

		.header-text-wrapper {
			width: 80%;
			background: #ffe665;
			border-radius: 3px;
			margin: 15% auto 12px;
			font-size: 14px;
			line-height: 20px;
			color: #333;
			text-align: justify;
			padding: 10px;

			p {
				margin: 0;
			}

			.tit {
				text-align: center;
				font-weight: 500;
				font-size: 15px;
				line-height: 25px;
			}
		}

		.footer-enter-wrapper {
			width: 72%;
			background: #fff;
			margin: 0 auto;
			border-radius: 10px;
			display: flex;
			flex-direction: column;

			.title-header {
				text-align: center;
				line-height: 50px;
				font-weight: 500;
				font-size: 17px;
			}

			.input-content {
				padding: 8px;

				.input-style-text {
					font-size: 14px;
					margin-bottom: 3px;
				}

				.input-style {
					height: 44px;
					width: 100%;
					border: rgb(226, 222, 222) 1px solid;
					border-radius: 6px;
					margin-bottom: 12px;

					input {
						padding: 5px 10px;
						box-sizing: border-box;
						font-size: 15px;
						height: 42px;
						width: 100%;
						border-radius: 6px;
						border: 0;
						appearance: none;
						-moz-appearance: none;
						outline: 0; //镂空
						text-decoration: none;
					}
				}
			}

			.btn-wrapper {
				width: 100%;
				display: flex;
				text-align: center;
				font-size: 17px;
				line-height: 50px;
				border-top: 1px solid rgb(233, 229, 229);
			}

			.btn-style {
				flex: 1;
				height: 50px;
			}

			.login-btn {
				color: #5241ff;
				border-left: 1px solid rgb(233, 229, 229);
			}
		}
	}
</style>