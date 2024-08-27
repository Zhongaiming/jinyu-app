<template>
	<z-paging ref="paging" v-model="blackList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="黑名单管理"></xls-jy-navbar>
			<view class="input-content">
				<view class="input-wapper">
					<xls-search placeholder="输入用户ID/手机号" marLeft="-6em" @confirm="stratesSearch" />
				</view>
				<view class="add-black">
					<span class="opertation" v-hasPermi="['app:back:index:records']" @click="goTo()">操作记录>>
					</span>
					<span class="plus-circle" @click="blackMember = true" v-hasPermi="['app:back:index:add']">
						<u-icon name="plus-circle" size="40" color="#5241FF" class="icon" />添加黑名单
					</span>
				</view>
			</view>
		</view>


		<view class="black-list-panel">
			<view class="black-item" v-for="(item, index) in blackList" :key="index">
				<view class="left">
					<image :src="item.img" alt="" class="avatar" mode="widthFix" />
				</view>
				<view class="middle">
					<p class="name">{{ item.nickName }}</p>
					<p class="info">
						ID: {{ item.memberId
					}}<span class="gender">
							{{sexDict[item.sex]}}
						</span>
					</p>
				</view>
				<view class="right">
					<view class="button" v-hasPermi="['app:back:index:detail']" @click="getMemberDetail(item.memberId)">
						详情
					</view>
					<view class="button" v-hasPermi="['app:back:index:delete']" @click="deleteBlackList(item.memberId)">
						剔除
					</view>
				</view>
			</view>
		</view>

		<xls-empty slot="empty" />

		<!-- add-black -->
		<u-popup :show="blackMember" round="20" mode="bottom">
			<view class="black-member">
				<view class="title-detail">
					添加黑名单
					<u-icon name="question-o" size="36" color="#cccccc" class="icon-o" @click="blackListTips" />
				</view>
				<xls-search placeholder="输入用户ID/手机号" marLeft="-6em" @confirm="stratesSearch" />
				<search-input placeholder="输入会员ID" marLeft="-5em" @stratesSearch="stratesSearch" />
				<view class="black-list-panel black-detail-panel" v-show="memberList.length" @scroll="getMoreMember">
					<view class="black-item" v-for="(memberDetail, index) in memberList" :key="index">
						<view class="left">
							<img :src="memberDetail.url" alt="" class="avatar" />
						</view>
						<view class="middle">
							<p class="name text-over" :class="{'null-name':memberDetail.name}">
								{{ memberDetail.name ? memberDetail.name : "用户未提供" }}
							</p>
							<p class="info">
								ID: {{ memberDetail.memberNumber }}
								<span class="gender">{{sexDict[memberDetail.sex]}}</span>
							</p>
						</view>
						<view class="right">
							<view class="button" @click="getMemberDetail(memberDetail.memberNumber)">
								详情
							</view>
							<view class="button" @click="addBlackMethod(memberDetail)">
								添加
							</view>
						</view>
					</view>
					<on-earth v-show="onEarthList" />
				</view>
				<no-data v-show="!memberList.length" text="输入会员ID - 查找会员" />
			</view>
		</u-popup>
		<!-- detail -->
		<u-popup :show="blackDetail" round="20">
			<view class="black-member black-detail">
				<view class="title-detail">详情</view>
				<view class="info-wapper">
					<view class="detail-content">
						<view class="top-content">
							<img :src="memberDetail.img" alt="" class="img" />
							<view class="user-info">
								<p class="info-name">{{ memberDetail.nickName }}</p>
								<p class="info-id">
									<span>ID:{{ memberDetail.memberNumber }}-</span>
									<span v-html="
                        memberDetail.phone
                          ? `Tel:${memberDetail.phone}`
                          : 'Tel:用户未提供'
                      "></span>
								</p>
							</view>
						</view>

						<view class="center-container">
							<view class="item title-item">
								<!-- <span>累计消费</span>  -->
								<span>累计支付</span>
								<!-- <span>累计余额消费</span> -->
								<span>累计投币</span>
							</view>
							<view class="item value-text">
								<!-- <span>{{'--'}}元</span>  -->
								<span>{{ memberDetail.totalPay }}元</span>
								<span>{{ memberDetail.totalCoins }}个</span>
								<!-- <span>{{'--'}}元</span> -->
							</view>
							<view class="item title-item">
								<!-- <span>累计投币</span>  -->
								<span>余币</span>
								<span>余额</span>
								<!-- <span>积分</span> -->
							</view>
							<view class="item value-text">
								<span>{{ memberDetail.currency }}个</span>
								<span>{{ memberDetail.balance }}元</span>
								<!-- <span>{{'积分'}}</span> -->
							</view>
						</view>

						<view class="static-container" v-show="memberDetail.blackReason">
							<p>原因：</p>
							<p class="reason-value">
								{{ memberDetail.blackReason }}
							</p>
						</view>
					</view>
				</view>
				<view class="btn-wrapper">
					<view class="btn" @click="blackDetail = !blackDetail">我知道了</view>
				</view>
			</view>
		</u-popup>
		<!-- reason -->
		<u-popup :show="blackReason" round="20">
			<view class="black-member black-detail black-reason">
				<view class="title-detail">加入黑名单</view>
				<view class="info-wapper">
					<view>
						<u-radio-group v-model="pickerReason" class="reason-group">
							<u-radio :name="item.id" checked-color="#5241FF" class="reason-radio-item"
								v-for="(item, index) in reasonList.slice(0, lengthAll)" :key="index"
								@click="remarks = item.resMsg">{{ item.resTitle }}</u-radio>
						</u-radio-group>
						<p class="show-more" @click="lengthAll = reasonList.length" v-show="lengthAll == 6">
							查看更多&gt;&gt;
						</p>
						<textarea placeholder="请输入加入黑名单原因,限30字" v-model="remarks" class="area-content"
							:disabled="pickerReason != 10 "></textarea>
					</view>
				</view>
				<view class="btn-wrapper">
					<view class="btn" @click="blackReason = false">取消</view>
					<view class="btn comfirm-btn" @click="addBlackMember">确定</view>
				</view>
			</view>
		</u-popup>

	</z-paging>
</template>

<script>
	import {
		memberController
	} from '@/api/index.js';

	export default {
		data() {
			return {
				blackList: [],
				sexDict: {
					1: '男',
					2: '女',
					undefined: ''
				},
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

		methods: {
			queryList(pageNo, pageSize) {
				memberController.getBlackPageList({
					page: pageNo,
					size: pageSize,
					search: null
				}).then(res => {
					if (res.code === 200 || res.code === 0) {
						console.log(res.data.records)
						const list = [{
							"memberId": 10726488,
							"nickName": "钅·䖝",
							"img": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbmyO6JLFcUtiaGjmuLY5yWIib88z8iacVd3Ric9OAW9MbIX3oENiaLLSaZyQhJ19fzGEUNDdpE9PLKWA/132",
							"sex": 0
						}]
						this.$refs.paging.complete(list);
					}
				})
			},
			addBlackMethod(memberDetail) {
				this.pickerMember = memberDetail
				this.blackReason = !this.blackReason
			},

			goTo() {
				this.$goTo("/pages/mainPackages/home/blacklist/record")
			},
			//search
			stratesSearch(search) {
				this.searchValue = search;
				if (this.blackMember) {

				} else {

				}
			},

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
		},
	};
</script>

<style lang="scss" scoped>
	.input-content {
		height: 172rpx;

		.input-wapper {
			position: fixed;
			top: 96rpx;
			left: 0;
			width: 100%;
		}
	}

	.add-black {
		padding: 16rpx 24rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #5241FF;
		position: fixed;
		width: 100%;
		left: 0;
		top: 196rpx;
		background: #f5f6f7;

		.icon {
			margin-right: 12rpx;
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
			padding: 30rpx 24rpx;
			background: #fff;

			.left {
				.avatar {
					border-radius: 50%;
					display: block;
					height: 80rpx;
					width: 80rpx;
				}
			}

			.middle {
				flex: 1;
				overflow: hidden;
				padding: 0 15rpx;

				.name {
					color: #1e2021;
					font-size: 30rpx;
				}

				.null-name {
					color: #999;
					font-size: 26rpx;
				}

				.info {
					color: #999;
					font-size: 24rpx;
					line-height: 44rpx;

					.gender {
						margin-left: 10rpx;
					}
				}
			}

			.right {
				font-size: 28rpx;
				@include center-flex();

				.button {
					border: 2rpx solid #8d8d8d;
					border-radius: 8rpx;
					color: #8d8d8d;
					font-size: 28rpx;
					height: 56rpx;
					line-height: 56rpx;
					margin: 0 10rpx;
					width: 108rpx;
					background: #fff;
					text-align: center;
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
			padding: 24rpx 0;
			font-size: 32rpx;
			font-weight: 600;

			.icon-o {
				margin-left: 12rpx;
			}
		}

		.black-detail-panel {
			flex: 1;
			overflow: scroll;
			box-sizing: border-box;
			padding: 20rpx 0;
			border-top: 2rpx solid #e6e6e6;
		}
	}

	.black-detail {
		width: 640rpx;

		.info-wapper {
			color: #262626;
			font-size: 28rpx;
			line-height: 42rpx;
			max-height: 710rpx;
			overflow-y: auto;
			padding: 32rpx 40rpx 40rpx;
			text-align: justify;

			.detail-content {
				padding: 0 20rpx;

				.top-content {
					border-bottom: 2rpx dashed #bdbdbd;
					padding-bottom: 10rpx;
					position: relative;
					display: flex;
					align-items: center;

					.img {
						border-radius: 50%;
						display: inline-block;
						height: 80rpx;
						width: 80rpx;
					}

					.user-info {
						margin-left: 20rpx;
						flex: 1;

						.info-id {
							color: #999;
							font-size: 24rpx;
						}
					}
				}

				.center-container {
					padding-bottom: 20rpx;

					.item {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						line-height: 54rpx;
					}

					.title-item {
						color: #333;
						font-size: 24rpx;
						margin-top: 16rpx;
					}

					span {
						flex: 1;
						text-align: left;
					}

					.value-text {
						color: #5241FF;
						font-size: 32rpx;
					}
				}

				.static-container {
					border-top: 2rpx dashed #bdbdbd;
					padding: 20rpx 0;

					.reason-value {
						color: #999;
						font-size: 26rpx;
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
			border-radius: 10rpx;
			color: #fff;
			margin: 0 48rpx 32rpx;
			font-size: 36rpx;
			line-height: 100rpx;
			flex: 1;
			text-align: center;
		}
	}

	.black-reason {
		width: 640rpx;

		.reason-group {
			display: flex;
			flex-wrap: wrap;
			z-index: 2014;
		}

		.reason-radio-item {
			margin-bottom: 20rpx;
			width: 46%;
		}

		.show-more {
			color: #5241FF;
			font-size: 24rpx;
		}

		.area-content {
			background: #fafafa;
			border: 2rpx dashed #e6e6e6;
			border-radius: 18rpx;
			color: #666;
			font-size: 26rpx;
			height: 160rpx;
			margin-top: 20rpx;
			padding: 20rpx;
			width: 100%;
			box-sizing: border-box;
			resize: none;
		}

		.btn {
			margin: 0;
			background: #fff;
			color: #000;
			border-top: 2rpx solid #e6e6e6;
			border-radius: 0;
		}

		.comfirm-btn {
			color: #5241FF;
			border-left: 2rpx solid #e6e6e6;
		}
	}
</style>