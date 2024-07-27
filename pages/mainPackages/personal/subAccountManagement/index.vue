<template>
	<div class="home-family">
		<div class="accountManagement" v-show="$route.meta.showAccount">
			<nav-bar>子账号管理</nav-bar>
			<div class="tabs-item">
				<div class="tab-box">
					<div class="tab" v-hasPermi="['app:account:index']" :class="1 == activeItem ? 'active' : ''"
						@click="activeItem = 1">
						子账号
					</div>
					<div class="tab" v-hasPermi="['app:account:index:read']" :class="2 == activeItem ? 'active' : ''"
						@click="activeItem = 2">
						岗位角色
					</div>
				</div>
			</div>
			<search-input placeholder="输入子账号名称/账号" marLeft="-6.5em" @stratesSearch="stratesSearch" bgColor="#f5f6f7"
				inputColor="#fff" v-show="activeItem == 1"></search-input>
			<!-- 子账号 -->
			<div class="sub-account box-sizing" v-show="activeItem == 1">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getAcountList"
					v-if="sonAccountList.length">
					<div class="child-list">
						<div class="child-item" v-for="(item, index) in sonAccountList" :key="index">
							<div class="top-info">
								<div class="role-info">
									<div class="title">
										<span class="name">{{ item.nickName }}</span>
										<span class="post">({{ item.roleName ? item.roleName : "未设置" }})</span>
									</div>
									<div class="phone-group">
										<span class="phone">{{ item.username }}</span>
										<div class="line"></div>
										<span class="group-num">管理场地({{
                        item.placeIdList ? item.placeIdList : 0
                      }})个</span>
										<!-- <span class="group-num">管理场地{{ item.placeIds == undefined ? 0 : calculatePlaceNum(item.placeIds) }}个</span> -->
									</div>
								</div>
								<div class="right-switch">
									<van-switch size="25" v-model="item.userState"
										@change="editState(item.id, item.userState)" active-color="#5241FF" />
								</div>
							</div>
							<div class="handle-btn">
								<!-- 新 -->
								<div v-hasPermi="['app:account:index:deleteson']" @click="deleteItem(item.id)">
									删除
								</div>
								<div v-hasPermi="['app:account:index:editson']" @click="
                    $router.push({
                      path: '/accountManagement/addAccount',
                      query: { sonAccount: JSON.stringify(item) },
                    })
                  ">
									编辑
								</div>
							</div>
						</div>
						<!-- <on-earth v-show="sonAccountList.length"/> -->
					</div>
				</van-list>
				<no-data v-else />
				<div class="btn-bottom" v-hasPermi="[
            'app:subacounts:index:person',
            'app:subaccounts:index:earn',
            'app:subacounts:index:ratio',
            'app:account:index:addson',
          ]">
					<div class="share-money" v-hasPermi="[
              'app:subacounts:index:person',
              'app:subaccounts:index:earn',
              'app:subacounts:index:ratio',
            ]" @click="$router.push('/subAccount')">
						<!-- <img src="./image/account.png" /> -->
						<van-icon name="balance-list-o" size="24" />
						<span class="txt">分账设置</span>
					</div>
					<div class="create-btn" v-hasPermi="['app:account:index:addson']" @click="
              roleList.length
                ? $router.push('/accountManagement/addAccount')
                : $toast('请先创建角色~')
            ">
						创建子账号
					</div>
				</div>
				<!-- <no-data v-show="!sonAccountList.length"/> -->
			</div>
			<!-- 岗位角色 -->
			<div class="sub-account box-sizing" v-show="activeItem == 2">
				<div class="role-list">
					<div class="role-item" v-for="(role, index) in roleList" :key="index">
						<p class="name">{{ role.roleName }}</p>
						<div class="right">
							<span class="one" v-hasPermi="['app:account:index:editjob']" @click="
                  $router.push({
                    path: '/accountManagement/createJobs',
                    query: {
                      jobs: JSON.stringify(role.roleName),
                      roleId: role.roleId,
                    },
                  })
                ">权限查看</span>
							<!-- <span class="one"
                        v-hasPermi="['app:account:index:editjob']"
                        @click="$router.push({
                            path:'/accountManagement/createJobs',
                            query:{jobs:JSON.stringify(role)}
                        })">权限查看</span> -->
							<span class="one next" @click="
                  $router.push({
                    path: '/accountManagement/sonAccount',
                    query: {
                      roleName: role.roleName,
                    },
                  })
                ">子账号查看</span>
						</div>
					</div>
				</div>
				<div class="btn-bottom" v-hasPermi="['app:account:index:addjob']">
					<div class="create-btn" @click="$router.push('/accountManagement/createJobs')">
						创建岗位
					</div>
				</div>
			</div>
		</div>
		<router-view ref="addChild"></router-view>
	</div>
</template>

<script>
	import auth from "@/plugins/premission";
	import {
		getSysRelevanceList,
		delSonUser,
		updateRelevanceState,
	} from "@/utils/otherRequest/modules";
	import {
		getSysRoles
	} from "@/utils/otherRequest/modules";
	export default {
		name: "accountManagement",
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
				sonAccountList: [],
				roleList: [],
				searchValue: "",
				loading: false,
				finished: false,
				page: 0,
			};
		},
		async created() {
			this.activeItem = auth.hasPermi("app:account:index") ? 1 : 2;
			this.getAcountList();
			this.getRoleList();
		},
		methods: {
			async getRoleList() {
				let role = await getSysRoles();
				if (role.data.data.length) {
					this.roleList = role.data.data;
				}
			},
			async getAcountList() {
				//子账号列表
				this.loading = true;
				let res = await getSysRelevanceList({
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
							this.sonAccountList = [
								...this.sonAccountList,
								...res.data.data.records,
							];
						} else {
							this.sonAccountList = res.data.data.records;
						}
						this.sonAccountList.forEach((item) => {
							item.userState = item.userState == 1 ? true : false;
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
				let res = await updateRelevanceState({
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
									this.sonAccountList = this.sonAccountList.filter((item) => {
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

<style lang="less" scoped>
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

					div {
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