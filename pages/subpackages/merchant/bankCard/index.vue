<template>
	<view class="xls-merchat-ca">
		<xls-jy-navbar title="绑定银行卡"></xls-jy-navbar>
		<div class="person-content">
			<div class="panel">
				<div class="panel-hd enter-state">
					<span>商户信息</span>
					<span class="state" :class="
		          bankCardInfo.entryStatus === 'AUDITED'
		            ? 'success'
		            : bankCardInfo.entryStatus === 'OVERRULE'
		            ? 'bad'
		            : 'info'
		        ">
						{{
		          bankCardInfo.entryStatus === "INIT"
		            ? "待审核"
		            : bankCardInfo.entryStatus === "OVERRULE"
		            ? "申请驳回"
		            : bankCardInfo.entryStatus === "AUDITED"
		            ? "审核通过"
		            : bankCardInfo.entryStatus === "DOING"
		            ? "审核中"
		            : "未知状态"
		        }}
					</span>
				</div>
				<div class="panel-bd">
					<div class="cm-input-row">
						<span class="field">商户E码</span>
						{{ bankCardInfo.appMerchantCode }}
						<div class="copy" @click.stop="copyMemberId(bankCardInfo.appMerchantCode || '---')">
							<span class="text">复制</span>
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">商户类型</span>
						<div class="value">
							<input type="text" name="type" class="text-over" placeholder="请选择"
								:class="!canEnter ? 'cm-unclickable' : ''" v-model="companyType" />
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">证件类型</span>
						<div class="value">
							<input type="text" name="type" class="text-over" placeholder="请选择"
								:class="!canEnter ? 'cm-unclickable' : ''" v-model="lepCardType" />
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">有效期限</span>
						<div class="value" v-if="bankCardInfo.merchantType == 'PERSON'">
							{{
		            `${strString(bankCardInfo.idCardStartDate)} 至 ${strString(
		              bankCardInfo.idCardEndDate
		            )}`
		          }}
						</div>
						<div class="value" v-else>
							{{
		            `${strString(bankCardInfo.businessDateStart)} 至 ${strString(
		              bankCardInfo.businessDateLimit
		            )}`
		          }}
						</div>
					</div>
					<div class="cm-input-row" v-show="bankCardInfo.merchantType == 'ENTERPRISE'">
						<span class="field">信用代码</span>
						<div class="value">
							{{ bankCardInfo.businessLicense }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">商户名称</span>
						<div class="value">
							{{ bankCardInfo.signName }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">商户简称</span>
						<div class="value">
							{{ bankCardInfo.showName }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">地区</span>
						<div class="value">
							<!-- {{region}} -->
							{{ `${bankCardInfo.bankProv} ${bankCardInfo.bankCity}` }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">详细地址</span>
						<div class="value">
							{{ bankCardInfo.address }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">认证时间</span>
						<div class="value">
							{{ pickerTime(bankCardInfo.createTime) }}
						</div>
					</div>
				</div>
				<div class="panel-hd">结算信息</div>
				<div class="panel-bd">
					<div class="cm-input-row">
						<span class="field" v-html="
		            bankCardInfo.merchantType == 'ENTERPRISE'
		              ? '法人姓名'
		              : '持卡人姓名'
		          "></span>
						<div class="value">
							<input type="text" name="type" class="text-over" placeholder="请选择"
								:class="!canEnter ? 'cm-unclickable' : ''" v-model="bankCardInfo.legalPerson" />
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field" v-html="
		            bankCardInfo.merchantType == 'ENTERPRISE'
		              ? '法人证件号'
		              : '身份证号'
		          "></span>
						<div class="value">
							{{ bankCardInfo.legalPersonId }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field" v-html="
		            bankCardInfo.merchantType == 'ENTERPRISE'
		              ? '法人证件期限'
		              : '证件期限'
		          "></span>
						<div class="value">
							{{
		            `${strString(bankCardInfo.idCardStartDate)} 至 ${strString(
		              bankCardInfo.idCardEndDate
		            )}`
		          }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field" v-html="
		            bankCardInfo.merchantType == 'ENTERPRISE'
		              ? '许可证账号'
		              : '银行卡账号'
		          "></span>
						<div class="value">
							{{ bankCardInfo.accountNo }}
						</div>
					</div>
					<div class="cm-input-row" v-if="bankCardInfo.merchantType == 'INDIVIDUALBISS'">
						<span class="field">结算类型</span>
						<div class="value">
							{{ bankCardInfo.settleBankType == "TOPRIVATE" ? "对私" : "对公" }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">开户银行</span>
						<div class="value">
							{{ bankCardInfo.bankName }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">开户地区</span>
						<div class="value">
							{{ `${bankCardInfo.bankProv} ${bankCardInfo.bankCity}` }}
						</div>
					</div>
					<div class="cm-input-row">
						<span class="field">开户支行</span>
						<div class="value">
							{{ bankCardInfo.bankBranch }}
						</div>
					</div>
					<div class="cm-input-row" v-show="bankCardInfo.merchantType == 'PERSON'">
						<span class="field">邮箱</span>
						<div class="value">
							{{ bankCardInfo.email }}
						</div>
					</div>
					<div class="cm-input-row" v-show="bankCardInfo.merchantType == 'PERSON'">
						<span class="field">预留手机号</span>
						<div class="value">
							{{ bankCardInfo.linkPhone }}
						</div>
					</div>
					<div class="cm-input-row" v-show="bankCardInfo.merchantType != 'PERSON'">
						<span class="field">联系人姓名</span>
						<div class="value">
							{{ bankCardInfo.linkman }}
						</div>
					</div>
					<div class="cm-input-row" v-show="bankCardInfo.merchantType != 'PERSON'">
						<span class="field">联系人证件号</span>
						<div class="value">
							{{ bankCardInfo.linkManId }}
						</div>
					</div>
					<div class="cm-input-row" v-show="bankCardInfo.merchantType != 'PERSON'">
						<span class="field">联系人手机号</span>
						<div class="value">
							{{ bankCardInfo.linkPhone }}
						</div>
					</div>
					<div class="cm-input-row" v-show="bankCardInfo.merchantType != 'PERSON'">
						<span class="field">联系人邮箱</span>
						<div class="value">
							{{ bankCardInfo.email }}
						</div>
					</div>
				</div>
				<div class="panel-hd">证件信息</div>
				<div class="upload-panel">
					<div class="one-content">
						<div class="cm-upload-handle">
							<div class="handle-wrap" @click="imgView(images.lepUrla)">
								<img :src="images.lepUrla" alt="" />
							</div>
							<p v-html="
		              bankCardInfo.merchantType == 'ENTERPRISE'
		                ? '法人证件正面'
		                : '身份证正面'
		            "></p>
						</div>
						<div class="cm-upload-handle">
							<div class="handle-wrap" @click="imgView(images.lepUrlb)">
								<img :src="images.lepUrlb" alt="" />
							</div>
							<p v-html="
		              bankCardInfo.merchantType == 'ENTERPRISE'
		                ? '法人证件背面'
		                : '身份证背面'
		            "></p>
						</div>
						<div class="cm-upload-handle">
							<div class="handle-wrap" @click="imgView(images.cardPhoto)">
								<img :src="images.cardPhoto" alt="" />
							</div>
							<p v-html="
		              bankCardInfo.merchantType == 'ENTERPRISE'
		                ? '开户许可证'
		                : '银行卡正面'
		            "></p>
						</div>
					</div>
					<div class="one-content second-content">
						<div class="cm-upload-handle" v-show="bankCardInfo.merchantType != 'PERSON'">
							<div class="handle-wrap" @click="imgView(images.blicUrla)">
								<img :src="images.blicUrla" alt="" />
							</div>
							<p>营业执照</p>
						</div>
						<div class="cm-upload-handle">
							<div class="handle-wrap" @click="imgView(images.img)">
								<img :src="images.img" alt="" />
							</div>
							<p>门头照片</p>
							<p class="link-btn" @click="
		              $router.push({
		                path: '/realNameattesta/identityExample',
		                query: { item: 1 },
		              })
		            ">
								查看示例
							</p>
						</div>
						<div class="cm-upload-handle">
							<div class="handle-wrap" @click="imgView(images.innerimg)">
								<img :src="images.innerimg" alt="" />
							</div>
							<p>设备照片</p>
							<p class="link-btn" @click="
		              $router.push({
		                path: '/realNameattesta/identityExample',
		                query: { item: 1 },
		              })
		            ">
								查看示例
							</p>
						</div>
						<div class="cm-upload-handle">
							<div class="handle-wrap" @click="imgView(images.enterimg)">
								<img :src="images.enterimg" alt="" />
							</div>
							<p>设备周边环境（含设备）照片</p>
							<p class="link-btn" @click="
		              $router.push({
		                path: '/realNameattesta/identityExample',
		                query: { item: 1 },
		              })
		            ">
								查看示例
							</p>
						</div>
					</div>
				</div>
				<div class="matchant-info-change" @click="dialoguePopup = !dialoguePopup">
					<p class="text">变更商户资料</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		merchantController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				canEnter: false,
				dialoguePopup: false,
				bankCardInfo: [],
				//商户E码 类型
				companyType: "",
				//证件类型
				lepCardType: "",
				//地区
				region: "",
				enterCode: "",
				verificationCode: "",
				value: "",
				images: {},
			}
		},
		async created() {
			// if(this.$route.query.bankAccountNo){
			// if (this.$route.query.orderNo) {
			// let bankAccountNo = this.$route.query.bankAccountNo
			// let res = await getUserBindingBankCardInfo({bankCardCode:bankAccountNo})
			// let orderNo = this.$route.query.orderNo;
			// let res = await getHlbEntry({
			// 	orderNo
			// });
			// if (res.data.code == 0 || res.data.msg == "ok") {
			let res = await merchantController.getHlbEntryAction({
				orderNo: "ZT_20221209174310775618"
			})
			this.bankCardInfo = res.data;
			this.images = res.data.images;
			let type = this.bankCardInfo.merchantType;
			let com;
			//商户类型：ENTERPRISE：企业商户，INDIVIDUALBISS：个体工商户，PERSON：个人商户
			type == "ENTERPRISE" ?
				(com = "企业商户") :
				type == "PERSON" ?
				(com = "个人商户") :
				type == "INDIVIDUALBISS" ?
				(com = "个体工商户") :
				"未设置";
			// type=='E' ? com='企业' :type=='N' ? com='自然人':type=='P'? com='个体工商户':'未设置'
			this.companyType = `${com}`;
			// com + "(" + this.bankCardInfo.appMerchantCode
			//   ? this.bankCardInfo.appMerchantCode
			//   : "---" + ")";
			//  法人证件类型 ID身份证 PAS护照 PASTW台胞证 PASHK港澳通行证  身份证类型
			let ID = this.bankCardInfo.lepCardType ?
				this.bankCardInfo.lepCardType :
				"ID";
			let car;
			ID == "ID" ?
				(car = "身份证") :
				ID == "PAS" ?
				(car = "护照") :
				ID == "PASTW" ?
				(car = "台胞证") :
				ID == "PASHK" ?
				(car = "台胞证") :
				"未设置";
			this.lepCardType =
				this.bankCardInfo.merchantType == "PERSON" ?
				"居民身份证" :
				"营业执照";
			//  地区
			this.region = this.bankCardInfo.bankProv + this.bankCardInfo.bankCity;
			// this.region = this.bankCardInfo.contactProvince + this.bankCardInfo.contactCity + this.bankCardInfo.contactDistrict
			// }
		},
		methods: {
			strString(strs) {
				//20220312
				let str = strs ? strs : "";
				let string;
				if (str.length > 4) {
					let year = str.slice(0, 4);
					let mouth = str.slice(4, 6);
					let day = str.slice(6, 8);
					string = `${year}-${mouth}-${day}`;
				} else {
					string = str;
				}
				return string;
			},
			//加8小时
			pickerTime(timeString) {
				if (!timeString) return null;
				let date = new Date(new Date(timeString).getTime() + 8 * 60 * 60 * 1000);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? "0" + m : m;
				var d = date.getDate();
				d = d < 10 ? "0" + d : d;
				var h = date.getHours();
				h = h < 10 ? "0" + h : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? "0" + minute : minute;
				second = second < 10 ? "0" + second : second;
				return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-merchat-ca {}

	.bankCard {
		width: 100%;
		height: 100vh;
		background: #f5f6f7;
		overflow: auto;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";
	}

	.person-content {
		width: 100%;
		padding-bottom: 70px;

		.panel {
			.panel-hd {
				color: #999;
				padding: 10px;
				font-size: 14px;
				margin-top: 10px;
				white-space: nowrap;
			}

			.panel-bd {
				position: relative;
				background: #fff;

				.cm-input-row {
					padding-left: 10px;
					min-height: 44px;
					display: flex;
					align-items: center;
					color: #3d4245;
					font-size: 15px;
					width: 100%;
					box-sizing: border-box;

					.field {
						min-width: 27%;
						padding-right: 10px;
						box-sizing: border-box;
					}

					.value {
						flex: 1;
						padding: 5px 0;

						input {
							box-sizing: border-box;
							padding: 0 25px 0 5px;
							margin: 0;
							line-height: 38px;
							width: 100%;
							border: 0;
							border-radius: 0;
							overflow-x: scroll;
							font-size: 14px !important;
							color: #333 !important;
							outline: 0;
							background-color: #fff;
							appearance: none;
						}

						.cm-unclickable {
							pointer-events: none;
						}
					}
				}

				.cm-input-row:not(:first-child) {
					border-top: 1px solid #e5e5e5;
				}
			}

			.upload-panel {
				padding: 17.5px 10px;
				position: relative;
				background: #fff;

				.one-content {
					.cm-upload-handle {
						vertical-align: top;
						display: inline-block;
						margin-bottom: 10px;

						.handle-wrap {
							position: relative;
							width: 80px;
							height: 80px;
							border: 1px dashed #bbb;
							border-radius: 3px;

							img {
								width: 100%;
								height: 100%;
								display: inline-block;
							}
						}

						p {
							padding-top: 8px;
							text-align: center;
							font-size: 14px;
							color: #3d4245;
						}
					}

					.cm-upload-handle:not(:last-child) {
						padding-right: 40px;
					}
				}

				.second-content {
					padding-bottom: 30px;
					margin-top: 10px;

					.link-btn {
						padding-top: 0;
						font-size: 12px;
						color: #5241ff !important;
						text-decoration: underline;
					}
				}
			}

			.matchant-info-change {
				text-align: center;
				margin: 23px 14px;
				border: 1px solid #5241ff;
				border-radius: 5px;
				color: #5241ff;

				.text {
					width: 100%;
					font-size: 17px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #5241ff;
					line-height: 24px;
					letter-spacing: 1px;
					padding: 13px 0;
				}
			}
		}
	}

	.dialoguePopup {
		width: 270px;
		text-align: center;
		font-size: 18px;

		.content-header {
			color: #1b1b1b;
			font-weight: 500;
			line-height: 25px;
			margin-top: 15px;
		}

		.content-body {
			width: 230px;
			margin: 0 auto;
			margin-top: 10px;
			margin-bottom: 20px;
			overflow: hidden;

			.text-tips {
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #1b1b1b;
				line-height: 20px;
			}

			.img-code-box {
				position: relative;
				margin-top: 10px;
				border: 1px solid rgba(0, 0, 0, 0.2);
				border-radius: 3px;
				display: flex;
				align-items: center;

				.left-con {
					flex: 1;
				}

				.right-con {
					padding-right: 10px;

					.sendcode {
						font-size: 15px;
						color: #5241ff;
					}
				}
			}
		}

		.flexbox-buttons {
			border-top: 1px solid #e5e5e5;
			display: flex;

			.btn {
				flex: 1;
				line-height: 50px;
				color: #595959;
			}

			.confirm {
				color: #5241ff;
				border-left: 1px solid #e5e5e5;
			}
		}
	}

	.enter-state {
		display: flex;
		align-items: center;

		.state {
			flex: 1;
			display: inline-block;
			text-align: right;
			font-size: 16px;
			font-weight: 700;
		}

		.success {
			color: #50cb4f;
		}

		.bad {
			color: red;
		}

		.info {
			color: #999;
		}
	}

	.copy {
		margin-left: 12px;
		width: 28px;
		height: 16px;
		border: 1px solid #9389ff;
		border-radius: 4px;
		color: #5241ff;
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			font-size: 12px;
			transform: scale(0.83333);
		}
	}
</style>