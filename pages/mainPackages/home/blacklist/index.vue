<template>
	<div class="black-list">
		<xls-jy-navbar title="黑名单管理"></xls-jy-navbar>
		<div class="input-content">
			<div class="input-wapper">
				<xls-search placeholder="输入用户ID/手机号" marLeft="-6em" @confirm="stratesSearch" />
			</div>
			<div class="add-black">
				<span class="opertation" v-hasPermi="['app:back:index:records']"
					@click="$router.push('/blackList/operateRecord')">操作记录>>
				</span>
				<span class="plus-circle" @click="blackMember = true" v-hasPermi="['app:back:index:add']">
					<u-icon name="plus-circle" size="40" color="#5241FF" class="icon" />添加黑名单
				</span>
			</div>
		</div>
		<div class="black-list-panel" v-show="blackList.length">
			<div class="black-item" v-for="(item, index) in blackList" :key="index">
				<div class="left"><img :src="item.img" alt="" class="avatar" /></div>
				<div class="middle">
					<p class="name text-over">{{ item.nickName }}</p>
					<p class="info">
						ID: {{ item.memberId
              }}<span class="gender" v-html="item.sex == 1 ? '男' : item.sex == 2 ? '女' : '未知'"></span>
					</p>
				</div>
				<div class="right">
					<button v-hasPermi="['app:back:index:detail']" @click="getMemberDetail(item.memberId)">
						详情
					</button>
					<button v-hasPermi="['app:back:index:delete']" @click="deleteBlackList(item.memberId)">
						剔除
					</button>
				</div>
			</div>
			<on-earth v-show="onEarth" />
		</div>
		<xls-empty v-show="!blackList.length" />
		<!-- add-black -->
		<u-popup v-model="blackMember" round position="bottom" :style="{ height: '60%' }">
			<div class="black-member">
				<div class="title-detail">
					添加黑名单
					<u-icon name="question-o" size="18" color="#cccccc" class="icon-o" @click="blackListTips" />
				</div>
				<search-input placeholder="输入会员ID" marLeft="-5em" @stratesSearch="stratesSearch" />
				<div class="black-list-panel black-detail-panel" v-show="memberList.length" @scroll="getMoreMember">
					<div class="black-item" v-for="(memberDetail, index) in memberList" :key="index">
						<div class="left">
							<img :src="memberDetail.url" alt="" class="avatar" />
						</div>
						<div class="middle">
							<p class="name text-over" :class="memberDetail.name ? '' : 'null-name'">
								{{ memberDetail.name ? memberDetail.name : "用户未提供" }}
							</p>
							<p class="info">
								ID: {{ memberDetail.memberNumber }}
								<span class="gender" v-html="
                      memberDetail.sex == 1
                        ? '男'
                        : memberDetail.sex == 2
                        ? '女'
                        : '未知'
                    "></span>
							</p>
						</div>
						<div class="right">
							<button @click="getMemberDetail(memberDetail.memberNumber)">
								详情
							</button>
							<button @click="
                    (pickerMember = memberDetail), (blackReason = !blackReason)
                  ">
								添加
							</button>
						</div>
					</div>
					<on-earth v-show="onEarthList" />
				</div>
				<no-data v-show="!memberList.length" text="输入会员ID - 查找会员" />
			</div>
		</u-popup>
		<!-- detail -->
		<u-popup v-model="blackDetail" round>
			<div class="black-member black-detail">
				<div class="title-detail">详情</div>
				<div class="info-wapper">
					<div class="detail-content">
						<div class="top-content">
							<img :src="memberDetail.img" alt="" class="img" />
							<div class="user-info">
								<p class="info-name">{{ memberDetail.nickName }}</p>
								<p class="info-id">
									<span>ID:{{ memberDetail.memberNumber }}-</span>
									<span v-html="
                        memberDetail.phone
                          ? `Tel:${memberDetail.phone}`
                          : 'Tel:用户未提供'
                      "></span>
								</p>
							</div>
						</div>

						<div class="center-container">
							<div class="item title-item">
								<!-- <span>累计消费</span>  -->
								<span>累计支付</span>
								<!-- <span>累计余额消费</span> -->
								<span>累计投币</span>
							</div>
							<div class="item value-text">
								<!-- <span>{{'--'}}元</span>  -->
								<span>{{ memberDetail.totalPay }}元</span>
								<span>{{ memberDetail.totalCoins }}个</span>
								<!-- <span>{{'--'}}元</span> -->
							</div>
							<div class="item title-item">
								<!-- <span>累计投币</span>  -->
								<span>余币</span>
								<span>余额</span>
								<!-- <span>积分</span> -->
							</div>
							<div class="item value-text">
								<span>{{ memberDetail.currency }}个</span>
								<span>{{ memberDetail.balance }}元</span>
								<!-- <span>{{'积分'}}</span> -->
							</div>
						</div>

						<div class="static-container" v-show="memberDetail.blackReason">
							<p>原因：</p>
							<p class="reason-value">
								{{ memberDetail.blackReason }}
							</p>
						</div>
					</div>
				</div>
				<div class="btn-wrapper">
					<div class="btn" @click="blackDetail = !blackDetail">我知道了</div>
				</div>
			</div>
		</u-popup>
		<!-- reason -->
		<u-popup v-model="blackReason" round :close-on-click-overlay="true">
			<div class="black-member black-detail black-reason">
				<div class="title-detail">加入黑名单</div>
				<div class="info-wapper">
					<div>
						<u-radio-group v-model="pickerReason" class="reason-group">
							<u-radio :name="item.id" checked-color="#5241FF" class="reason-radio-item"
								v-for="(item, index) in reasonList.slice(0, lengthAll)" :key="index"
								@click="remarks = item.resMsg">{{ item.resTitle }}</u-radio>
						</u-radio-group>
						<p class="show-more" @click="lengthAll = reasonList.length" v-show="lengthAll == 6">
							查看更多&gt;&gt;
						</p>
						<textarea placeholder="请输入加入黑名单原因,限30字" v-model="remarks" class="area-content"
							:disabled="pickerReason == 10 ? false : true"></textarea>
					</div>
				</div>
				<div class="btn-wrapper">
					<div class="btn" @click="blackReason = !blackReason">取消</div>
					<div class="btn comfirm-btn" @click="addBlackMember">确定</div>
				</div>
			</div>
		</u-popup>
	</div>

</template>

<script>
	// import {
	// 	getBlackPageList,
	// 	getMemberInfo,
	// 	addBlackInfo,
	// 	deleteBlackInfo,
	// 	getMemberList,
	// } from "@/utils/api/couple";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	// import {
	// 	getList
	// } from "@/utils/api/member";

	export default {
		data() {
			return {
				//get
				page: 0,
				onEarth: false,
				blackList: [],
				searchValue: "",
				blackMember: false,
				blackDetail: false,
				blackReason: false,
				pickerReason: 0,
				//add
				remarks: "",
				reasonList: [{
						id: 1,
						resTitle: "恶意损坏",
						resMsg: "暴力使用，敲打，搬弄设备，导致设备系统故障或者受损行为。",
					},
					{
						id: 2,
						resTitle: "刷单/刷分/偷分",
						resMsg: "通过系统漏洞，规则漏洞，非法外挂，恶意刷单/刷分/偷分获取不当利益的行为。",
					},
					{
						id: 3,
						resTitle: "偷盗",
						resMsg: "通过不当操作，设备漏洞对设备内物品进行多拿，偷拿，盗取的行为。",
					},
					{
						id: 4,
						resTitle: "恶意捣乱",
						resMsg: "对设备规则以及游戏玩法不满，通过语言和行为阻挠场地正常经营的行为。",
					},
					{
						id: 5,
						resTitle: "恶意投诉",
						resMsg: "对消费和服务不满，为达到利益或情绪目的的不当投诉行为。",
					},
					{
						id: 6,
						resTitle: "恶意退款",
						resMsg: "消费后对消费不满进行物理退款，或者多次购买后又多次退款的无效消费行为。",
					},
					{
						id: 7,
						resTitle: "恶意兑换",
						resMsg: "通过兑换漏洞，规则漏洞，或者活动漏洞，进行多次兑换，造成经济损失的行为。",
					},
					{
						id: 8,
						resTitle: "态度恶劣",
						resMsg: "顾客再消费交流期间，存在肢体或语言冲突，态度较为恶劣的行为。",
					},
					{
						id: 9,
						resTitle: "恶意获利",
						resMsg: "通过软件外挂，物理外挂，系统漏洞，活动漏洞，获取不当利益的的行为。",
					},
					{
						id: 10,
						resTitle: "其他",
						resMsg: ""
					},
				],
				lengthAll: 6,
				memberDetail: {
					memberNumber: 0,
				},
				pickerMember: {
					memberNumber: 0,
				},
				//check
				memberList: [],
				pageList: 0,
				onEarthList: false,
			};
		},
		// created() {
		// 	this.getBlackList();
		// 	this.getMemberById();
		// 	window.addEventListener("scroll", this.getMoretype);
		// },
		// beforeDestroy() {
		// 	window.removeEventListener("scroll", this.getMoretype);
		// },
		methods: {
			//search
			stratesSearch(search) {
				this.searchValue = search;
				if (this.blackMember) {
					//member-list
					// if(this.searchValue){
					this.pageList = 0;
					this.onEarthList = false;
					this.getMemberById();
					// }
				} else {
					//list
					this.page = 0;
					this.onEarth = false;
					this.getBlackList();
				}
			},
			//监听滚动
			getMoretype() {
				var scrollTop =
					document.documentElement.scrollTop ||
					window.pageYOffset ||
					document.body.scrollTop;
				var scrollHeight = document.documentElement.scrollHeight;
				var clientHeight = document.documentElement.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarth == false) {
						this.getBlackList();
					}
				}
			},
			//获取列表
			getBlackList: debounceFun(async function() {
				let res = await getBlackPageList({
					page: ++this.page,
					size: 10,
					search: this.searchValue, //搜索（会员id）
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data.records.length == 0) {
						this.onEarth = true;
					} else {
						this.onEarth = false;
					}
					if (res.data.data.records != null) {
						if (this.page > 1) {
							this.blackList = [...this.blackList, ...res.data.data.records];
						} else {
							this.blackList = res.data.data.records;
						}
						if (res.data.data.records.length < 10) {
							this.onEarth = true;
						} else {
							this.onEarth = false;
						}
					}
				}
			}, 500),
			//剔除黑名单
			deleteBlackList(memberId) {
				this.$dialog
					.confirm({
						title: "剔除黑名单",
						message: "是否将该客户剔除出黑名单列表，并恢复其支付权限？",
						width: "318",
						confirmButtonColor: "#5241FF",
					})
					.then(() => {
						deleteBlackInfo({
								memberId,
							})
							.then((res) => {
								if (res.data.code == 0 || res.data.msg == "ok") {
									this.$toast.success("剔除成功");
									this.blackList = this.blackList.filter((elm) => {
										return elm.memberId != memberId;
									});
								}
							})
							.catch((err) => {});
					});
			},
			//添加黑名单
			async addBlackMember() {
				if (!this.remarks) {
					return this.$toast("加入黑名单原因不能为空");
				}
				let res = await addBlackInfo({
					memberId: this.pickerMember.memberNumber, //会员ID
					remarks: this.remarks, //加入黑名单原因
					// memberId: 10000019,
					// remarks: '暴力使用，敲打，搬弄设备，导致设备系统故障或者受损行为。'
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.$toast.success("添加成功");
					this.blackMember = false;
					this.blackReason = false;
					this.blackDetail = false;
					this.pickerMember.memberId = this.pickerMember.memberNumber
					this.pickerMember['img'] = this.pickerMember.url
					this.pickerMember['nickName'] = this.pickerMember.name
					//img
					//nickName
					//sex
					this.blackList.push(this.pickerMember);

				}
			},
			//会员详情
			async getMemberDetail(memberId) {
				let res = await getMemberInfo({
					memberId,
				});
				this.blackDetail = true;
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.memberDetail = res.data.data;
				}
			},
			//黑名单规则
			blackListTips() {
				this.$dialog.alert({
					title: "黑名单规则说明",
					width: "270",
					message: "场景:\n 针对部分玩家有损害商家运营的行为而推出的限制体验手段，可拒绝玩家支付 \n\n 使用说明：\n 1、商家定位到异常玩家的ID \n 2、商家将该玩家(ID)加入黑名单做黑名单限制",
					messageAlign: "left",
					confirmButtonColor: "#5241FF",
				});
			},
			//查会员列表
			getMemberById: debounceFun(async function() {
				// let res = await getMemberList({
				let res = await getList({
					page: ++this.pageList,
					size: 20,
					search: encodeURIComponent(this.searchValue),
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					if (res.data.data != null) {
						if (res.data.data.length < 20) {
							this.onEarthList = true;
						} else {
							this.onEarthList = false;
						}
						if (this.pageList > 1) {
							this.memberList = [...this.memberList, ...res.data.data];
						} else {
							this.memberList = res.data.data;
						}
					}
				}
			}, 500),

			getMoreMember(elm) {
				var scrollTop = elm.target.scrollTop;
				var scrollHeight = elm.target.scrollHeight;
				var clientHeight = elm.target.clientHeight;
				if (scrollTop + clientHeight + 50 >= scrollHeight) {
					if (this.onEarthList == false) {
						this.getMemberById();
					}
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.black-list {
		width: 100%;
	}

	.input-content {
		height: 86px;

		.input-wapper {
			position: fixed;
			top: 48px;
			left: 0;
			width: 100%;
		}
	}

	.add-black {
		padding: 8px 12px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 15px;
		// justify-content: flex-end;
		// justify-content: space-between;
		color: #5241FF;
		position: fixed;
		width: 100%;
		left: 0;
		top: 98px;
		background: #f5f6f7;

		.icon {
			margin-right: 6px;
		}

		.opertation {
			flex: 1;
		}
		
		.plus-circle {
			display: flex;
			align-items: center;
		}
	}

	.black-list-panel {
		.black-item {
			display: flex;
			align-items: center;
			padding: 15px 12px;
			background: #fff;

			.left {
				.avatar {
					border-radius: 50%;
					display: block;
					height: 40px;
					width: 40px;
				}
			}

			.middle {
				flex: 1;
				overflow: hidden;
				padding: 0 7.5px;

				.name {
					color: #1e2021;
					font-size: 15px;
					font-weight: 400;
				}

				.null-name {
					color: #999;
					font-size: 13px;
				}

				.info {
					color: #999;
					font-size: 12px;
					font-weight: 500;
					line-height: 22px;

					.gender {
						margin-left: 5px;
					}
				}
			}

			.right {
				font-size: 14px;

				button {
					border: 1px solid #8d8d8d;
					border-radius: 4px;
					color: #8d8d8d;
					font-size: 14px;
					font-weight: 400;
					height: 28px;
					margin: 0 5px;
					width: 54px;
					background: #fff;
				}
			}
		}
	}

	.black-member {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title-detail {
			text-align: center;
			padding: 12px 0;
			font-size: 16px;
			font-weight: 600;

			.icon-o {
				margin-left: 6px;
			}
		}

		.black-detail-panel {
			flex: 1;
			overflow: scroll;
			box-sizing: border-box;
			padding: 10px 0;
			border-top: 1px solid #e6e6e6;
		}
	}

	.black-detail {
		width: 320px;

		.info-wapper {
			color: #262626;
			font-size: 14px;
			line-height: 21px;
			max-height: 355px;
			overflow-y: auto;
			padding: 16px 20px 20px;
			text-align: justify;

			.detail-content {
				padding: 0 10px;

				.top-content {
					border-bottom: 1px dashed #bdbdbd;
					padding-bottom: 5px;
					position: relative;
					display: flex;
					align-items: center;

					.img {
						border-radius: 50%;
						display: inline-block;
						height: 40px;
						width: 40px;
					}

					.user-info {
						margin-left: 10px;
						flex: 1;

						.info-id {
							color: #999;
							font-size: 12px;
						}
					}
				}

				.center-container {
					padding-bottom: 10px;

					.item {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						line-height: 27px;
					}

					.title-item {
						color: #333;
						font-size: 12px;
						margin-top: 8px;
					}

					span {
						flex: 1;
						text-align: left;
					}

					.value-text {
						color: #5241FF;
						font-size: 16px;
					}
				}

				.static-container {
					border-top: 1px dashed #bdbdbd;
					padding: 10px 0;

					.reason-value {
						color: #999;
						font-size: 13px;
					}
				}
			}
		}

		.btn-wrapper {
			display: flex;
			align-items: center;
		}

		.btn {
			background: #5241FF;
			border-radius: 5px;
			color: #fff;
			margin: 0 24px 16px;
			font-size: 18px;
			line-height: 50px;
			flex: 1;
			text-align: center;
		}
	}

	.black-reason {
		width: 320px;

		.reason-group {
			display: flex;
			flex-wrap: wrap;
			z-index: 2014;
		}

		.reason-radio-item {
			margin-bottom: 10px;
			width: 46%;
		}

		.show-more {
			color: #5241FF;
			font-size: 12px;
		}

		.area-content {
			background: #fafafa;
			border: 1px dashed #e6e6e6;
			border-radius: 9px;
			color: #666;
			font-size: 13px;
			height: 80px;
			margin-top: 10px;
			padding: 10px;
			width: 100%;
			box-sizing: border-box;
			resize: none;
		}

		.btn {
			margin: 0;
			background: #fff;
			color: #000;
			border-top: 1px solid #e6e6e6;
			border-radius: 0;
		}

		.comfirm-btn {
			color: #5241FF;
			border-left: 1px solid #e6e6e6;
		}
	}
</style>