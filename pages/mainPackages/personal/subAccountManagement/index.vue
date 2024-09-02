<template>
	<z-paging ref="paging" v-model="dataList" @query="queryList">
		<template slot="top">
			<xls-jy-navbar title="子账号管理"></xls-jy-navbar>
			<view class="tabs-item">
				<view class="tab-box">
					<view class="tab" v-hasPermi="['app:account:index']" :class="{active: 1 == activeItem}"
						@click="tabEvent(1)">
						子账号
					</view>
					<view class="tab" v-hasPermi="['app:account:index:read']" :class="{active: 2 == activeItem}"
						@click="tabEvent(2)">
						岗位角色
					</view>
				</view>
			</view>
			<xls-search 
				placeholder="输入子账号名称/账号" 
				marLeft="-6.5em" 
				@confirm="stratesSearch" bgColor="#f5f6f7"
				inputColor="#fff" v-show="activeItem == 1">
			</xls-search>
		</template>
		<!-- 子账号 -->
		<view class="sub-account box-sizing" v-show="activeItem == 1">
			<view v-if="dataList.length" class="child-list">
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
								<text class="group-num">管理场地({{
											item.placeIdList || 0
										}})个</text>
							</view>
						</view>
						<view class="right-switch">
							<u-switch size="50" :value="item.userState == 1 ? true : false"
								@change="editState(item.id, item.userState)" active-color="#5241FF" />
						</view>
					</view>
					<view class="handle-btn">
						<!-- 新 -->
						<view v-hasPermi="['app:account:index:deleteson']" @click="deleteItem(item.id)">
							删除
						</view>
						<view v-hasPermi="['app:account:index:editson']" @click="goTo('account', {sonAccount: item})">
							编辑
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 岗位角色 -->
		<view class="sub-account" v-show="activeItem == 2">
			<view class="role-list">
				<view class="role-item" v-for="(role, index) in dataList" :key="index">
					<p class="name">{{ role.roleName }}</p>
					<view class="right">
						<text class="one" v-hasPermi="['app:account:index:editjob']" @click="goTo('role', {jobs: role.roleName, roleId: role.roleId})">权限查看</text>
						<text style="color: red;margin-right: 25rpx;" @click="deleteJob(role.roleId)">删除</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 底部按钮 -->
		<template slot="bottom">
			<view v-show="activeItem == 1">
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
							]" @click="goTo('subAccount')">
						<!-- <img src="./image/account.png" /> -->
						<u-icon name="order" size="58" color="#5241ff" />
						<text class="txt">分账设置</text>
					</view>
					<view class="create-btn" v-hasPermi="['app:account:index:addson']" @click="roleList.length ? goTo('account') : $toast('请先创建角色~')">
						创建子账号
					</view>
				</view>
			</view>
			<view v-show="activeItem == 2">
				<view class="btn-bottom" v-hasPermi="['app:account:index:addjob']">
					<view class="create-btn" @click="goTo('role')">
						创建岗位
					</view>
				</view>
			</view>
		</template>
	</z-paging>
</template>

<script>
	import { subAccountController } from '@/api/index.js'
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
				roleList: [],
				searchValue: "",
				loading: false,
				finished: false,
				dataList: []
			};
		},
		onShow() {
			this.$nextTick(() => {
				this.$refs.paging.reload();
				if(this.activeItem == 1) { // 第一次进来处于子账号的时候调用一次（因为创建子账号的时候需要判断是否有角色）
					this.getRoleList() 
				}
				
			})
			
		},
		methods: {
			/**
			 * 顶部tab切换
			 */
			tabEvent(value) {
				this.activeItem = value
				this.$refs.paging.reload();
			},
			/**
			 * 获取数据事件
			 * @param {Object} pageNo
			 * @param {Object} pageSize
			 */
			queryList(pageNo, pageSize) {
				if(this.activeItem == 1) {
					subAccountController.getSysReleuceList({
						page: pageNo,
						size: pageSize,
						search: this.searchValue
					}).then(res => {
						if(res.code == 200) {
							this.$refs.paging.complete(res.data.dataList);
						}
					})
				} else {
					subAccountController.getSysRoles().then(res => {
						if(res.code == 200) {
							this.$refs.paging.complete(res.data);
							this.roleList = res.data
						}
					})
				}
			},
			getRoleList() {
				subAccountController.getSysRoles().then(res => {
					if(res.code == 200) {
						this.roleList = res.data;
					}
				})
			},
			
			//搜索
			stratesSearch(search) {
				this.searchValue = search;
				this.$refs.paging.reload();
			},
			//修改子用户状态
			editState(userId, userState) {
				subAccountController.updateReleuceState({
					id: userId, //子账户id
					userState: userState == 1 ? 2 : 1, //用户状态（-1冻结/锁定 0弃用 1正常，2停用）
				}).then(res => {
					if (res.code == 200) {
						this.$toast("修改成功");
						this.$refs.paging.reload();
					}
				})
			
			},
			//删除
			deleteItem(id) {
				this.$modal("删除该账号将无法登录后台", {title: '确定要删除账号？'}).then(() => {
					//删除子账号
					subAccountController.delSonUser({ subUserId: id}).then((res) => {
						if (res.code == 200) {
							this.$toast("删除成功~");
							this.$refs.paging.reload();
						}
					})
				})
			},
			//删除岗位角色
			deleteJob(value) {
				this.$modal("确定要删除岗位角色?").then(() => {
					subAccountController.deleteSysRole({roleId: value}).then(res => {
						if(res.code == 200) {
							this.$toast("删除成功!")
							this.$refs.paging.reload();
						}
					})
				})
			},
			
			calculatePlaceNum(placeIds) {
				if (placeIds.charAt(placeIds.length - 1) == ",") {
					placeIds = placeIds.substr(0, placeIds.length - 1);
				}
				return placeIds.split(",").length;
			},
			
			goTo(type, params = {}) {
				switch(type) {
					case 'role':
						this.$goTo("/pages/mainPackages/personal/subAccountManagement/children/createJobs", 'navigateTo', params);
						break;
					case 'account':
						this.$goTo("/pages/mainPackages/personal/subAccountManagement/children/addAccount", 'navigateTo', params);
						break;
					case 'subAccount':
						this.$goTo('/pages/mainPackages/home/separateAccounts/index');
						break;
				}
			}
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
		// flex: 1;
		// padding-bottom: 64px;
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
	
	.btn-bottom {
		align-items: center;
		background: #fff;
		bottom: 0;
		display: flex;
		justify-content: center;
		padding: 8px 12px;
		// position: fixed;
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
</style>