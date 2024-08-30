<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="子账号管理"></xls-jy-navbar>
			<view class="tabs-item">
				<view class="tab-box">
					<view class="tab" v-hasPermi="['app:account:index']" :class="{active: 1 == activeItem}"
						@click="activeItem = 1">
						子账号
					</view>
					<view class="tab" v-hasPermi="['app:account:index:read']" :class="{active: 2 == activeItem}"
						@click="activeItem = 2">
						岗位角色
					</view>
				</view>
			</view>
		</view>
		<xls-search placeholder="输入子账号名称/账号" marLeft="-6.5em" @confirm="stratesSearch" bgColor="#f5f6f7"
			inputColor="#fff" v-show="activeItem == 1">
		</xls-search>
		<!-- 子账号 -->
		<view class="sub-account box-sizing" v-show="activeItem == 1">
			<view class="child-list">
				<view class="child-item" v-for="(item, index) in dataList" :key="index">
					<view class="top-info">
						<view class="role-info">
							<view class="title">
								<text class="name">{{ item.nickName }}</text>
								<text class="post">({{ item.roleName ? item.roleName : "未设置" }})</text>
							</view>
							<view class="phone-group">
								<text class="phone">{{ item.username }}</text>
								<view class="line"></view>
								<text class="group-num">管理场地({{item.placeIdList || 0}})个</text>
							</view>
						</view>
						<view class="right-switch">
							<!-- <u-switch size="50" v-model="item.userState" @change="editState(item.id, item.userState)"
								active-color="#5241FF" /> -->
						</view>
					</view>
					<view class="handle-btn">
						<!-- 新 -->
						<view v-hasPermi="['app:account:index:deleteson']" @click="deleteItem(item.id)">
							删除
						</view>
						<view v-hasPermi="['app:account:index:editson']" @click="goTo">
							编辑
						</view>
					</view>
				</view>
				<xls-bottom v-show="dataList.length" />
			</view>
			<view class="btn-bottom" v-hasPermi="[
				'app:subacounts:index:person',
				'app:subaccounts:index:earn',
				'app:subacounts:index:ratio',
				'app:account:index:addson',
			  ]">
				<view class="share-money" v-hasPermi="[
				  'app:subacounts:index:person',
				  'app:subaccounts:index:earn',
				  'app:subacounts:index:ratio',
				]" @click="goTo">
					<u-icon name="order" size="58" color="#5241ff" />
					<text class="txt">分账设置</text>
				</view>
				<view class="create-btn" v-hasPermi="['app:account:index:addson']" @click="goTo">
					创建子账号
				</view>
			</view>
		</view>
		<!-- 岗位角色 -->
		<view class="sub-account box-sizing" v-show="activeItem == 2">
			<view class="role-list">
				<view class="role-item" v-for="(role, index) in roleList" :key="index">
					<p class="name">{{ role.roleName }}</p>
					<view class="right">
						<text class="one" v-hasPermi="['app:account:index:editjob']" @click="goTo">权限查看</text>

						<text class="one next" @click="goTo">子账号查看</text>
					</view>
				</view>
			</view>
			<view class="btn-bottom" v-hasPermi="['app:account:index:addjob']">
				<view class="create-btn" @click="goTo">
					创建岗位
				</view>
			</view>
		</view>
	</z-paging>
</template>

<script>
	// import auth from "@/plugins/premission";
	// import {
	// 	getSysReleuceList,
	// 	delSonUser,
	// 	updateReleuceState,
	// } from "@/utils/otherRequest/modules";
	// import {
	// 	getSysRoles
	// } from "@/utils/otherRequest/modules";
	export default {
		data() {
			return {
				activeItem: 1,
				topTab: [{
						id: 1,
						title: "子账号"
					},
					{
						id: 2,
						title: "岗位角色"
					},
				],
				checked: false,
				focusInput: false,
				inputEnter: "",
				showClear: false,
				//子账号
				dataList: [],
				roleList: [{
						"roleId": 150,
						"roleName": "全部权限",
						"roleKey": "ztwl",
						"roleSort": 2,
						"dataScope": 1,
						"menuCheckStrictly": 1,
						"deptCheckStrictly": 1,
						"status": 0,
						"delFlag": 0,
						"createBy": "18144999904",
						"createTime": "2022-12-12 11:26:09",
						"updateBy": "18144999904",
						"updateTime": "2023-10-23 15:18:13"
					},
					{
						"roleId": 154,
						"roleName": "部分权限",
						"roleKey": "ztwl",
						"roleSort": 2,
						"dataScope": 1,
						"menuCheckStrictly": 1,
						"deptCheckStrictly": 1,
						"status": 0,
						"delFlag": 0,
						"createBy": "18144999904",
						"createTime": "2023-02-17 08:47:16",
						"updateBy": "18144999904",
						"updateTime": "2023-09-21 15:23:57"
					},
					{
						"roleId": 247,
						"roleName": "体验",
						"roleKey": "ztwl",
						"roleSort": 2,
						"dataScope": 1,
						"menuCheckStrictly": 1,
						"deptCheckStrictly": 1,
						"status": 0,
						"delFlag": 0,
						"createBy": "18144999904",
						"createTime": "2023-12-19 09:47:03",
						"updateBy": "18144999904",
						"updateTime": "2023-12-19 09:47:03"
					},
					{
						"roleId": 397,
						"roleName": "前端",
						"roleKey": "ztwl",
						"roleSort": 2,
						"dataScope": 1,
						"menuCheckStrictly": 1,
						"deptCheckStrictly": 1,
						"status": 0,
						"delFlag": 0,
						"createBy": "18144999904",
						"createTime": "2024-04-02 09:49:12",
						"updateBy": "18144999904",
						"updateTime": "2024-04-03 10:32:27"
					},
					{
						"roleId": 413,
						"roleName": "合作商",
						"roleKey": "ztwl",
						"roleSort": 2,
						"dataScope": 1,
						"menuCheckStrictly": 1,
						"deptCheckStrictly": 1,
						"status": 0,
						"delFlag": 0,
						"createBy": "18144999904",
						"createTime": "2024-04-08 17:47:39",
						"updateBy": "18144999904",
						"updateTime": "2024-04-08 17:47:39"
					}
				],
				searchValue: "",
				loading: false,
				finished: false,
				page: 0,
			};
		},
		async created() {
			// this.activeItem = auth.hasPermi("app:account:index") ? 1 : 2;
			// this.getAcountList();
			// this.getRoleList();
			// this.dataList.forEach((item) => {
			// 	item.userState = item.userState == 1;
			// });
		},
		methods: {
			queryList(pageNo, pageSize) {
				const list = [{
						"id": 1081,
						"username": "zt15089452840",
						"nickName": "地心体验",
						"userType": 5,
						"userState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 18,
						"createTime": "2023-12-19 09:44:39",
						"delFlag": 0,
						"roleId": 247,
						"roleName": "体验",
						"subUserId": 1081,
						"placeIdList": "0",
						"synchronizationPlace": 0,
						"ledger": 0,
						"rate": 0
					},
					{
						"id": 661,
						"username": "zt18237419564",
						"nickName": "体验",
						"userType": 5,
						"userState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 18,
						"createTime": "2023-06-15 09:43:34",
						"delFlag": 0,
						"roleId": 150,
						"roleName": "全部权限",
						"subUserId": 661,
						"placeIdList": "0",
						"synchronizationPlace": 0,
						"ledger": 0,
						"rate": 0
					},
					{
						"id": 574,
						"username": "zt18144999908",
						"nickName": "体验",
						"userType": 5,
						"userState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 18,
						"createTime": "2023-04-20 17:29:08",
						"delFlag": 0,
						"roleId": 150,
						"roleName": "全部权限",
						"subUserId": 574,
						"placeIdList": "7",
						"synchronizationPlace": 0,
						"ledger": 0,
						"rate": 0
					},
					{
						"id": 506,
						"username": "zt18402059455",
						"nickName": "前端测试",
						"userType": 5,
						"userState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 18,
						"createTime": "2023-03-21 17:38:23",
						"delFlag": 0,
						"roleId": 397,
						"roleName": "前端",
						"subUserId": 506,
						"placeIdList": "14",
						"synchronizationPlace": 1,
						"ledger": 1,
						"rate": 0
					},
					{
						"id": 426,
						"username": "zt18144999900",
						"nickName": "中土物联",
						"userType": 5,
						"userState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 18,
						"createTime": "2022-12-13 09:34:56",
						"delFlag": 0,
						"roleId": 150,
						"roleName": "全部权限",
						"subUserId": 426,
						"placeIdList": "14",
						"synchronizationPlace": 1,
						"ledger": 1,
						"rate": 0
					},
					{
						"id": 58,
						"username": "19854573700",
						"nickName": "测试三",
						"userPhone": "19854573700",
						"userType": 5,
						"userState": 1,
						"commercialNumber": "ZTWL_20220617111542006",
						"createId": 18,
						"createTime": "2022-06-21 15:26:00",
						"roleId": 150,
						"roleName": "全部权限",
						"subUserId": 58,
						"placeIdList": "5",
						"synchronizationPlace": 0,
						"ledger": 0,
						"rate": 0
					}
				]
				this.$refs.paging.complete(list);
			},




			async getRoleList() {
				let role = await getSysRoles();
				if (role.data.data.length) {
					this.roleList = role.data.data;
				}
			},
			async getAcountList() {
				//子账号列表
				this.loading = true;
				let res = await getSysReleuceList({
					search: encodeURIComponent(this.searchValue), //新
					page: ++this.page,
					size: 20,
				});
				this.loading = false;
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data.records != null) {
						if (res.data.data.records.length < 20) {
							this.finished = true;
						} else {
							this.finished = false;
						}
						if (this.page > 1) {
							this.dataList = [
								...this.dataList,
								...res.data.data.records,
							];
						} else {
							this.dataList = res.data.data.records;
						}
						this.dataList.forEach((item) => {
							item.userState = item.userState == 1;
						});
					}
				}
			},
			//搜索
			stratesSearch(search) {
				this.page = 0;
				this.searchValue = search;
				this.getAcountList();
			},
			//修改子用户状态
			async editState(userId, userState) {
				let res = await updateReleuceState({
					id: userId, //子账户id
					userState: userState ? 1 : 2, //用户状态（-1冻结/锁定 0弃用 1正常，2停用）
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.$toast.success("修改成功");
				}
			},
			//删除
			deleteItem(id) {
				this.$dialog
					.confirm({
						title: "确定要删除账号？",
						message: "删除该账号将无法登录后台",
						width: "270",
						confirmButtonText: "删除",
					})
					.then(() => {
						//删除子账号
						delSonUser({
								subUserId: id,
							})
							.then((res) => {
								if (res.data.code == 0 || res.data.msg == "ok") {
									this.$toast("删除成功~");
									this.dataList = this.dataList.filter((item) => {
										return item.id != id;
									});
								}
							})
							.catch((err) => {});
					})
					.catch(() => {});
			},
			calculatePlaceNum(placeIds) {
				if (placeIds.charAt(placeIds.length - 1) == ",") {
					placeIds = placeIds.substr(0, placeIds.length - 1);
				}
				return placeIds.split(",").length;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.accountManagement {
		width: 100%;
		height: 100vh;
		background: #f5f6f7;
		display: flex;
		flex-direction: column;
	}

	.tabs-item {
		padding: 16px 12px 14px;
		text-align: center;

		.tab-box {
			width: 100%;
			border: 1px solid #5241ff;
			border-radius: 5px;
			background-color: transparent;
			display: flex;
		}

		.tab {
			flex: 1;
			overflow: auto;
			color: #5241ff;
			font-size: 14px;
			font-weight: 400;
			height: 32px;
			letter-spacing: -0.36px;
			line-height: 32px;
			padding: 0 5px;
			text-align: center;
		}

		.active {
			background-color: #5241ff;
			color: #fff;
		}
	}

	.sub-account {
		width: 100%;
		flex: 1;
		padding-bottom: 64px;
		overflow-y: auto;

		.searchBox-wrapper {
			height: 32px;
			margin: 0 12px 14px;

			.searchBox-input-wrapper {
				display: flex;
				position: relative;
				width: 100%;

				.search-input {
					flex: 1;
					height: 100%;
					position: relative;
					transition: width 0.3s;

					.input {
						background-color: #fff;
						height: 32px;
						border-radius: 4px;
						color: #343434;
						font-size: 15px;
						line-height: 32px;
						margin: 0;
						text-align: center;
						width: 100%;
						z-index: 2;
						border: 0;
					}

					input[type="search"]::-webkit-search-cancel-button {
						-webkit-appearance: none;
					}

					.input-focus {
						text-align: left;
						padding-left: 30px;
					}

					.clear-btn {
						align-items: center;
						display: flex;
						height: 100%;
						position: absolute;
						right: 10px;
						top: 0;
						z-index: 3;
					}
				}

				.search-icon {
					align-items: center;
					color: #8e8e93;
					display: flex;
					font-size: 15px;
					height: 100%;
					left: 40px;
					padding: 0 5px 0 10px;
					position: absolute;
					top: 0;
					transition: left 0.3s;
					z-index: 3;
					left: 48%;
					margin-left: -6.75em;
				}

				.search-focus {
					left: 0;
					margin-left: 0;
				}

				.cancel-btn {
					color: #5241ff;
					display: none;
					font-size: 15px;
					height: 30px;
					line-height: 30px;
					padding-left: 10px;
					transition: width 0.3s;
					width: 0;
				}

				.focus {
					width: auto;
					display: block;
				}
			}
		}

		.child-list {
			padding: 0 12px 10px;

			.child-item {
				background-color: #fff;
				border-radius: 4px;
				margin-bottom: 12px;

				.top-info {
					display: flex;
					justify-content: space-between;
					padding: 12px;

					.role-info {
						flex: 1;

						.title {
							font-size: 14px;
							font-weight: 400;
							line-height: 22px;
							color: #000;
							letter-spacing: -0.43px;

							.name {
								font-size: 18px;
								font-weight: 700;
							}
						}

						.phone-group {
							color: #8c8c8c;
							font-size: 14px;
							height: 18px;
							letter-spacing: -0.34px;
							line-height: 1.1;
							margin-top: 4px;
							display: flex;
							align-items: center;

							.line {
								height: 16px;
								width: 1px;
								background: #e6e6e6;
								margin: 0 12px;
							}
						}
					}
				}

				.handle-btn {
					align-items: center;
					border-top: 1px solid #e6e6e6;
					display: flex;
					height: 45px;
					line-height: 45px;
					position: relative;
					text-align: center;

					view {
						flex: 1;
						font-size: 14px;
						font-weight: 400;
					}

					:nth-child(2) {
						border-left: 1px solid #e6e6e6;
						color: #5241ff;
					}
				}
			}
		}

		.btn-bottom {
			align-items: center;
			background: #fff;
			bottom: 0;
			display: flex;
			justify-content: center;
			padding: 8px 12px;
			position: fixed;
			box-sizing: border-box;
			width: 100%;
			z-index: 1;

			.share-money {
				align-items: center;
				color: #5241ff;
				display: flex;
				flex-direction: column;
				font-size: 13px;
				justify-content: center;
				width: 100px;

				img {
					width: 20px;
					height: 17.5px;
				}
			}

			.create-btn {
				background-color: #5241ff;
				border-radius: 4px;
				color: #fff;
				font-size: 16px;
				font-weight: 400;
				height: 48px;
				letter-spacing: -0.36px;
				line-height: 48px;
				text-align: center;
				flex: 1;
			}
		}

		// 岗位
		.role-list {
			background: #fff;

			.role-item {
				align-items: center;
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				height: 50px;
				justify-content: space-between;
				padding: 0 12px;

				.name {
					color: #262626;
					display: block;
					font-size: 16px;
					font-weight: 400;
					height: 22px;
					letter-spacing: -0.39px;
					line-height: 22px;
					text-align: left;
					width: 150px;
				}

				.right {
					align-items: center;
					display: flex;
					justify-content: space-between;
					width: 150px;

					.one {
						border-right: 1px solid #e6e6e6;
						color: #5241ff;
						font-size: 14px;
						font-weight: 400;
						height: 20px;
						line-height: 20px;
						text-align: left;
						width: 68px;
					}

					.next {
						border: transparent;
						flex: 1;
						margin-right: 0;
						text-align: right;
					}
				}
			}
		}
	}
</style>