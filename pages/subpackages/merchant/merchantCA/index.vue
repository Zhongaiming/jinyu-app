<template>
	<view class="xls-merchat-ca">
		<xls-jy-navbar title="审核进度" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>
		<xls-enter-inquiry ref="enterInquiry"></xls-enter-inquiry>
		<xls-steps :current="current"></xls-steps>
		<xls-side :current="current"></xls-side>
		<!-- 商户类型 -->
		<xls-organization :current="current" :merchantType="merchant.merchantType"
			@changeMerchantType="changeMerchant"></xls-organization>
		<xls-first-step :current="current" :merchantType="merchant.merchantType" @changeIdType="changeMerchant"
			@nextStepMethod="nextStepMethod" ref="firstStep"></xls-first-step>
		<xls-step-detail :merchantType="merchant.merchantType" @nextStepMethod="nextStepMethod"
			ref="stepDetail"></xls-step-detail>
		<xls-second-step :current="current" :merchantType="merchant.merchantType" @nextStepMethod="nextStepMethod"
			@lastStep="lastStep" ref="secondStep"></xls-second-step>
		<xls-Bank-detail :merchantType="merchant.merchantType" @nextStepMethod="nextStepMethod"
			ref="secondDetail"></xls-Bank-detail>
		<xls-three-step :current="current" :merchantType="merchant.merchantType" @nextStepMethod="nextStepMethod"
			@lastStep="lastStep" ref="threeStep"></xls-three-step>
		<xls-four-step :current="current"></xls-four-step>

	</view>
</template>

<script>
	import xlsEnterInquiry from "./components/xls-enter-inquiry/index.vue";
	import xlsSteps from "./components/xls-steps/index.vue";
	import xlsSide from "./components/xls-side/index.vue";
	import xlsOrganization from "./components/xls-organization/index.vue";
	import xlsFirstStep from "./components/xls-first-step/index.vue";
	import xlsSecondStep from "./components/xls-second-step/index.vue";
	import xlsThreeStep from "./components/xls-three-step/index.vue";
	import xlsFourStep from "./components/xls-four-step/index.vue";
	import xlsStepDetail from "./components/xls-step-detail/index.vue";
	import xlsBankDetail from "./components/xls-step-detail/bankDetail.vue";
	import {
		merchantController
	} from '@/api/index.js';
	import {
		getInfo
	} from '@/common/auth.js'
	export default {
		components: {
			xlsEnterInquiry,
			xlsSteps,
			xlsSide,
			xlsOrganization,
			xlsFirstStep,
			xlsSecondStep,
			xlsThreeStep,
			xlsFourStep,
			xlsStepDetail,
			xlsBankDetail,
		},
		data() {
			return {
				current: 1,
				merchant: {
					//商户类型：ENTERPRISE：企业商户，INSTITUTION：事业单位商户，INDIVIDUALBISS：个体工商户，PERSON：个人商户，SUBJECT_TYPE_OTHERS：其他组织
					merchantType: 'PERSON',
					// 身份证 IDCARD  港通港澳 GATXCERTIFICATE TWNDCERTIFICATE台湾
					idType: "IDCARD",
					// 法人
					legalPerson: "",
					legalPersonId: "",
					idCardStartDate: "",
					idCardEndDate: "",
					email: "",
					// 联系人
					linkman: "",
					linkManId: "",
					linkPhone: "",
					// 营业执照
					commercialAddress: "", // 后加的
					businessLicense: "",
					accountName: "",
					businessDateStart: "",
					businessDateLimit: "",
					regionCode: "", //区县编码 必传
					address: "",
					images: {
						lepUrla: "", //法人身份证信息正面图片 说明
						lepUrlb: "", //法人身份证信息背面图片 说明
						blicUrla: "", //营业执照照片
					},
				},
			}
		},
		created() {
			this.getMethod("step1");
		},
		methods: {
			changeMerchant(type, params) {
				this.merchant[type] = params;
				if(type == 'merchantType') {
					this.current = 1
				}
			},
			getMethod(type) {
				return new Promise((resolve) => {
					const userInfo = getInfo();
					merchantController.getEntryAction({
						commercialNumber: userInfo.commercialNumber
					}).then(res => {
						if (res.data) {
							Object.assign(this.merchant, res.data);
							// 初始化
							if (type === "step1") {
								this.$refs.firstStep.updateMethod(this.merchant);
								if(!res.data.merchantType) {
									this.$refs.enterInquiry.buttonSwitch = true;
								}
							}
						}
						resolve('ok')
					})
				})
			},
			saveMethod(params) {
				return new Promise((resolve) => {
					merchantController.saveEntryAction(params).then(res => {
						resolve('ok')
					})
				})
			},
			async nextStepMethod({
				step,
				params
			}) {
				await this.saveMethod(params)
				await this.getMethod()
				if (step === 'firstStep') {
					// 第一层弹出层填写信息
					this.$refs.stepDetail.openPopup(this.merchant);
				} else if (step === 'firstDetailStep') {
					// 第二层填写信息
					this.current += 1;
					this.$nextTick(() => {
						if (this.$refs.secondStep) {
							this.$refs.secondStep.updateMethod(this.merchant);
						}
					})
				} else if (step === 'secondStep') {
					this.$refs.secondDetail.openPopup(this.merchant);
				} else if (step === 'secondDetailStep') {
					// 第三层填写信息
					this.current += 1;
					this.$refs.threeStep.updateMethod(this.merchant);
				} else if (step === 'threeStep') {
					this.hlbEntryApply();
				}
			},
			lastStep() {
				let _this = this;
				uni.$u.debounce(async function() {
					_this.current -= 1;
				}, 500)
			},
			async hlbEntryApply() {
				var dateInfo = this.merchant;
				const orgNum = dateInfo.merchantType === 'PERSON' ? dateInfo.legalPersonId : dateInfo.businessLicense;
				const idCardStartDate = dateInfo.idCardStartDate.replace(/-/g, "");
				if (dateInfo.idCardEndDate !== "长期有效") {
					dateInfo.idCardEndDate = dateInfo.idCardEndDate.replace(/-/g, "");
				}
				const idCardEndDate = dateInfo.idCardEndDate;
				const linkman = dateInfo.merchantType === 'PERSON' ? dateInfo.legalPerson : dateInfo.linkman;
				const linkManId = dateInfo.merchantType === 'PERSON' ? dateInfo.legalPersonId : dateInfo.linkManId;
				const signName = dateInfo.merchantType === 'PERSON' ? `商户_${dateInfo.legalPerson}` : dateInfo
					.accountName;
				let accountName;
				if (dateInfo.merchantType === 'PERSON') {
					accountName = dateInfo.legalPerson;
				} else if (dateInfo.merchantType === 'ENTERPRISE') {
					accountName = dateInfo.accountName;
				} else if (dateInfo.merchantType === 'INDIVIDUALBISS') {
					// TOPRIVATE 对私 TOPUBLIC 对公
					accountName = dateInfo.priatePublic === 'TOPRIVATE' ? dateInfo.legalPerson : dateInfo.accountName;
				}
				let newDate = {
					idType: dateInfo.merchantType,
					merchantType: dateInfo.merchantType,
					// 组织机构代码 说明(个人商户填身份证，其他，填统一社会信用代码)
					orgNum: orgNum,
					// 营业执照号 说明(个人商户填身份证，其他，填统一社会信用代码)
					businessLicense: orgNum,
					// 法人证件中姓名 说明(若商户类型为个人商户时，则法人姓名填商户姓名，其他，填法人证件姓名)
					legalPerson: dateInfo.legalPerson,
					// 法人证件中号码 说明(若商户类型为个人商户时，则填商户身份证号，其他，填法人身份证)
					legalPersonId: dateInfo.legalPersonId,
					// 法人证件起始日 说明(日期格式yyyy-mm-dd
					idCardStartDate: idCardStartDate,
					// 法人证件到期日 说明(长期直接写长期 ，不是写日期格式yyyy-mm-dd
					idCardEndDate: idCardEndDate,
					// 联系人姓名 说明(必传
					linkman: linkman,
					// 联系人号码--settleCardPhone=>结算银行卡绑定手机号 contactPhone=>联系人手机号
					linkPhone: dateInfo.linkPhone,
					// 联系人身份证 说明(个人商户：个人身份   个体，企业：联系人身份证)
					linkManId: linkManId,
					email: dateInfo.email, //联系人电子邮箱 说明(必传
					address: dateInfo.address, //通讯地址 说明(必传
					bankCode: dateInfo.bankCode, //结算银行支行联行号 说明(必传
					accountNo: dateInfo.accountNo, //结算银行卡账号 说明(必传
					bankName: dateInfo.bankName, //银行名称
					bankProv: dateInfo.bankProv, //银行所属省
					bankCity: dateInfo.bankCity, //银行所属市
					bankBranch: dateInfo.bankBranch, //支行名称
					regionCode: String(dateInfo.regionCode), //区县编码 必传
					// 展示名 - 就是商户简称  测试传“测试_名字” 必传
					showName: dateInfo.showName,
					// 签约名 个人商户请传“商户_个人姓名” 其他：营业执照上的工商注册名称
					signName: signName,
					// 开户名 必传 结算账户名 说明(必传个人--身份证名字，企业--营业执照上的工商注册名称)
					accountName: accountName,
					images: {
						// 结算银行卡正面照图片 对公标识为 对私(0)和非法人(3)时必传
						cardPhoto: dateInfo.images.cardPhoto,
						occUrla: dateInfo.images.cardPhoto,
						//营业执照图片 必传(是) 营业执照照片 说明(企业和个体工商户传营业执照照片，自然人传租赁合同照片，个人前端传身份证正面照
						blicUrla: dateInfo.merchantType === 'PERSON' ?
							dateInfo.images.lepUrla : dateInfo.images.blicUrla,
						lepUrla: dateInfo.images.lepUrla, //法人身份证信息正面图片 说明
						lepUrlb: dateInfo.images.lepUrlb, //法人身份证信息背面图片 说明
						img: dateInfo.images.img, //经营门店门头照片
						enterimg: dateInfo.images.enterimg, //经营门店出入口照片
						innerimg: dateInfo.images.innerimg, //经营门店店内照片
					},
					// TOPRIVATE 对私 TOPUBLIC 对公
					priatePublic: dateInfo.priatePublic,
				};

				if (dateInfo.merchantType != 'PERSON') {
					// 营业证件到期日是否为长期  说明(true为长期，false不是长期，自然人按身份证件填写
					// 营业证件起始日 说明(日期格式yyyy-mm-dd，个体工商户，企业必须传
					newDate["businessDateStart"] = dateInfo.businessDateStart.replace(/-/g, "");
					//营业证件到期日 说明(长期直接写长期 ，不是写日期格式yyyy-mm-dd，个体工商户，企业必须传
					if (dateInfo.businessDateLimit !== "长期有效") {
						newDate["businessDateLimit"] = dateInfo.businessDateLimit.replace(/-/g, "");
					} else {
						newDate["businessDateLimit"] = "50000101";
					}
				}
				this.$modal("您确保已经输入正确信息了吗？",{
					confirmText: '确定',
				}).then(() => {
					this.$loading();
					merchantController.hlbEntryApply(newDate).then(res => {
						this.$hideLoading();
						if (res.code == 200) {
							this.current = 4;
						}
					}).catch(() =>{
						this.$hideLoading();
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-merchat-ca {}
</style>