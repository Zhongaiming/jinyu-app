<template>
	<view>
		<u-popup :show="detailPopup" mode="bottom" :round="20">
			<!-- 身份证信息 -->
			<view class="xls-person-content">
				<view class="title-text">
					<p>{{ titleDict[merchantType] }}</p>
					<u-icon name="close" size="40" class="close-icon" @click="detailPopup = false" color="#ff9d47" />
				</view>

				<view class="xls-form-wrapper">
					<u--form :model="first" labelWidth="180" ref="firstForm" :rules="rules">
						<view class="left-style">
							<span class="block"></span>
							<view class="title">{{ `${textByMerchantTypeDict[merchantType]}人证件信息`  }}</view>
						</view>
						<u-form-item label="姓名" prop="legalPerson" borderBottom>
							<u--input placeholder="请输入姓名" v-model="first.legalPerson" border="none"
								:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
						</u-form-item>
						<u-form-item label="身份证号" prop="legalPersonId" borderBottom>
							<u--input placeholder="请输入身份证号" v-model="first.legalPersonId" border="none"
								:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
						</u-form-item>
						<u-form-item label="有效期限" borderBottom>
							<view class="value">
								<p class="value-item" @click="datetimePicker('idCardStartDate')">
									{{ first.idCardStartDate }}
								</p>
								<p class="viewider">至</p>
								<p class="value-item" @click="datetimePicker('idCardEndDate')">
									{{ first.idCardEndDate }}
								</p>
								<view class="arrow-right-outside">
									<image :src="`${$baseUrl}appV4/image/wallet/nextPress/arrow-right.png`" alt=""
										class="arrow-right" mode="widthFix" />
								</view>
							</view>
						</u-form-item>
						<u-form-item label="邮箱" prop="email" borderBottom>
							<u--input placeholder="请输入邮箱" v-model="first.email" border="none"
								:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
						</u-form-item>

						<view v-if="!['PERSON'].includes(merchantType)">
							<view class="left-style">
								<span class="block"></span>
								<view class="title">联系人证件信息</view>
							</view>
							<u-form-item label="姓名" prop="linkman" borderBottom>
								<u--input placeholder="请输入姓名" v-model="first.linkman" border="none"
									:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
							</u-form-item>
							<u-form-item label="身份证号" prop="linkManId" borderBottom>
								<u--input placeholder="请输入身份证号" v-model="first.linkManId" border="none"
									:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
							</u-form-item>
							<u-form-item label="手机号码" prop="linkPhone" borderBottom>
								<u--input placeholder="请输入手机号码" v-model="first.linkPhone" border="none"
									:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
							</u-form-item>

							<view class="left-style">
								<span class="block"></span>
								<view class="title">营业执照信息</view>
							</view>
							<u-form-item label="信用代码" prop="businessLicense" borderBottom>
								<u--input placeholder="请输入统一社会信用代码" v-model="first.businessLicense" border="none"
									:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
							</u-form-item>
							<u-form-item label="企业名称" prop="accountName" borderBottom>
								<u--input placeholder="请输入企业名称" v-model="first.accountName" border="none"
									:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
							</u-form-item>
							<u-form-item label="有效期限" borderBottom>
								<view class="value">
									<p class="value-item" @click="datetimePicker('businessDateStart')">
										{{ first.businessDateStart }}
									</p>
									<p class="viewider">至</p>
									<p class="value-item" @click="datetimePicker('businessDateLimit')">
										{{ first.businessDateLimit }}
									</p>
									<view class="arrow-right-outside">
										<image :src="`${$baseUrl}appV4/image/wallet/nextPress/arrow-right.png`" alt=""
											class="arrow-right" mode="widthFix" />
									</view>
								</view>
							</u-form-item>
							<u-form-item label="所在地区" prop="commercialAddress" borderBottom @click="pickerAddressItem">
								<view class="value">
									<u--input placeholder="请选择所在地区" v-model="first.commercialAddress" border="none"
										:placeholderStyle="placeholderStyle" @focus="stopKeyborad"
										:prefixIconStyle="prefixIconStyle"></u--input>
									<view class="arrow-right-outside">
										<image :src="`${$baseUrl}appV4/image/wallet/nextPress/address-icon.png`" alt=""
											class="position" mode="widthFix" />
										<view class="viewider-line"></view>
										<image :src="`${$baseUrl}appV4/image/wallet/nextPress/arrow-right.png`" alt=""
											class="arrow-right" mode="widthFix" />
									</view>
								</view>
							</u-form-item>
							<u-form-item label="详细地址" prop="address" borderBottom>
								<u--input placeholder="请输入详细地址(5~20个字)" v-model="first.address" border="none"
									:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
							</u-form-item>
							<view class="icon-tips">
								<u-icon name="info-circle" size="32" color="#999" />
								详细地址请勿重复填写省市区信息
							</view>
						</view>
						<view class="bottom-btn-box">
							<view class="notice-bar">
								<u-icon name="info-circle" size="32" color="#ff8d1a" />
								<span>请确认上传{{textByMerchantTypeDict[merchantType]}}人证件与营业执照主体一致的资料信息</span>
							</view>
							<view class="btn-wrapper" @click="nextStepMethod">
								<span>下一步</span>
							</view>
						</view>
					</u--form>
				</view>

				<u-datetime-picker :show="personDatetime" v-model="currentDate" :minDate="minDate" :maxDate="maxDate"
					mode="date" itemHeight="88" title="选择年月日" confirmColor="#5241ff" @cancel="personDatetime=false"
					@confirm="formatDate"></u-datetime-picker>
				<u-action-sheet :show="idDatetime" :actions="actions" title="有效期限选择" @close="idDatetime = false"
					@select="onSelectaction" round="20">
				</u-action-sheet>
				<xls-area-vue @getAreaMethod="getAreaMethod" ref="xlsArea"></xls-area-vue>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import xlsAreaVue from './xls-area.vue';
	import {
		getDateAll,
		format
	} from "@/plugins/utilityClass";
	import {
		merchantController
	} from '@/api/index.js';

	export default {
		components: {
			xlsAreaVue
		},
		props: {
			merchantType: {
				type: String,
				require: true
			}
		},
		data() {
			return {
				detailPopup: false,
				rules: {
					'legalPerson': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'legalPersonId': {
						type: 'string',
						required: true,
						message: '请填写',
						// 'change'
						trigger: ['blur']
					},
					'email': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'linkman': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'linkManId': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'linkPhone': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'businessLicense': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'accountName': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'commercialAddress': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['change']
					},
					'address': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
				},
				first: {
					// 法人
					legalPerson: "",
					legalPersonId: "",
					idCardStartDate: getDateAll(0),
					idCardEndDate: getDateAll(0),
					email: "",
					// 联系人
					linkman: "",
					linkManId: "",
					linkPhone: "",
					// 营业执照
					businessLicense: "",
					accountName: "",
					businessDateStart: "",
					businessDateLimit: "",
					regionCode: "", //区县编码 必传
					commercialAddress: "", // 后加的
					address: "",
				},
				titleDict: {
					PERSON: '核对个人信息', // 个人商户
					INDIVIDUALBISS: '核对个体工商户信息', //个体工商户
					ENTERPRISE: '核对企业商户信息', //企业商户
					INSTITUTION: '核对事业单位商户信息', //事业单位商户
					SUBJECT_TYPE_OTHERS: '核对其他组织商户信息', //其他组织
				},
				textByMerchantTypeDict: {
					PERSON: '收款', // 个人商户
					INDIVIDUALBISS: '收款', //个体工商户
					ENTERPRISE: '法', //企业商户
					INSTITUTION: '负责', //事业单位商户
					SUBJECT_TYPE_OTHERS: '负责', //其他组织
				},
				placeholderStyle: "fontSize: 28rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},

				//日期选择
				personDatetime: false,
				pickerCenterKey: "",
				currentDate: new Date().getTime(),
				minDate: new Date(new Date().getFullYear() - 100, 0, 1).getTime(),
				maxDate: new Date(new Date().getFullYear() + 100, 0, 1).getTime(),
				//日期-长期
				idDatetime: false,
				actions: [{
					key: 1,
					name: "长期有效"
				}, {
					key: 2,
					name: "自定义日期"
				}],
				//按钮禁用
				btnShade: false,
			};
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// #ifdef MP
			this.$refs.firstForm.setRules(this.rules);
			// #endif
		},
		methods: {
			stopKeyborad() {
				uni.hideKeyboard();
			},
			//选择时间
			datetimePicker(type) {
				this.pickerCenterKey = type;
				if (['idCardEndDate', 'businessDateLimit'].includes(this.pickerCenterKey)) {
					return this.idDatetime = true
				}
				this.personDatetime = true;
			},
			//时间格式
			formatDate(date) {
				let result = format(date.value);
				this.first[this.pickerCenterKey] = result;
				this.personDatetime = false;
			},
			//长期
			onSelectaction(item) {
				if (item.key === 1) {
					// 长期
					this.first[this.pickerCenterKey] = "长期有效";
				} else {
					// 自定义
					this.personDatetime = true;
				}
				this.idDatetime = false;
			},
			getAreaMethod(params) {
				const {
					columnIndex,
					value,
					values
				} = params
				this.first.regionCode = value[2].addressCode;
				this.first.commercialAddress = value
					.map((option) => option.addressNames)
					.join(" ");
			},
			pickerAddressItem() {
				this.$refs.xlsArea.pickerAddressItem();
			},
			openPopup(updateParams) {
				if (updateParams) {
					// 只提取需要的属性
					const requiredParams = {
						legalPerson: updateParams.legalPerson,
						legalPersonId: updateParams.legalPersonId,
						idCardStartDate: updateParams.idCardStartDate,
						idCardEndDate: updateParams.idCardEndDate,
						email: updateParams.email,
						linkman: updateParams.linkman,
						linkManId: updateParams.linkManId,
						linkPhone: updateParams.linkPhone,
						// 营业执照
						businessLicense: updateParams.businessLicense,
						accountName: updateParams.accountName,
						businessDateStart: updateParams.businessDateStart,
						businessDateLimit: updateParams.businessDateLimit,
						regionCode: updateParams.regionCode, //区县编码 必传
						commercialAddress: updateParams.commercialAddress,
						address: updateParams.address,
					};
					Object.assign(this.first, requiredParams);
					this.detailPopup = !this.detailPopup;
				}
			},
			nextStepMethod() {
				this.$refs.firstForm.validate().then(res => {
					this.$emit('nextStepMethod', {
						step: 'firstDetailStep',
						params: this.first
					})
					this.detailPopup = !this.detailPopup;
				}).catch(errors => {
					uni.$u.toast('校验失败，请检查！')
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import 'index.scss'
</style>