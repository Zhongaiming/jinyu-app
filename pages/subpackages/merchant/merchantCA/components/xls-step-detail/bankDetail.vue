<template>
	<u-popup :show="detailPopup" mode="bottom" :round="20" :overlayStyle="{'touch-action':'none'}">
		<view class="xls-person-content">
			<view class="title-text">
				<p>请核对填写信息</p>
				<u-icon name="close" size="40" class="close-icon" @click="detailPopup = false" color="#ff9d47" />
			</view>

			<view class="xls-form-wrapper">
				<u--form :model="second" labelWidth="180" ref="secondForm" :rules="rules">
					<view class="left-style">
						<span class="block"></span>
						<view class="title">{{merchantType === 'ENTERPRISE' ? '开户许可证信息':'收款银行卡信息'}}</view>
					</view>
					<u-form-item label="开户账号" prop="accountNo" borderBottom>
						<u--input placeholder="请输入开户账号" v-model="second.accountNo" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="开户地区" prop="accountAddress" borderBottom @click="pickerAddressItem">
						<view class="value">
							<u--input placeholder="请选择开户地区" v-model="second.accountAddress" border="none"
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
					<u-form-item label="开户银行" prop="bankName" borderBottom @click="pickerBank('Simplify')">
						<u--input placeholder="请输入开户银行" v-model="second.bankName" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
							@focus="stopKeyborad"></u--input>
					</u-form-item>
					<u-form-item label="开户支行" prop="bankBranch" borderBottom @click="pickerBank('Bank')">
						<u--input placeholder="请输入开户支行" v-model="second.bankBranch" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
							@focus="stopKeyborad"></u--input>
					</u-form-item>
					<u-form-item label="手机号" prop="linkPhone" borderBottom>
						<u--input placeholder="结算银行卡绑定手机号" v-model="second.linkPhone" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="公私标识" prop="priatePublic" borderBottom v-if="merchantType === 'INDIVIDUALBISS'">
						<u-radio-group v-model="second.priatePublic" placement="row">
							<u-radio name="TOPRIVATE" activeColor="#5241FF" size="40" iconSize="32" label="对私(个人银行卡)"
								labelSize="28"></u-radio>
							<u-radio name="TOPUBLIC" activeColor="#5241FF" size="40" iconSize="32" label="对公(企业公户)"
								labelSize="28"></u-radio>
						</u-radio-group>
					</u-form-item>

					<view class="bottom-btn-box">
						<view class="btn-wrapper" @click="nextStepMethod">
							<span>确认，下一步</span>
						</view>
					</view>
				</u--form>
				<xls-area-vue @getAreaMethod="getAreaMethod" ref="xlsArea"></xls-area-vue>
			</view>
		</view>
		<xls-bank-vue ref="simplifyBank" @getSimplifyBank="getSimplifyBank"></xls-bank-vue>
	</u-popup>
</template>

<script>
	import xlsAreaVue from './xls-area2.vue';
	import xlsBankVue from './xls-bank.vue';
	export default {
		props: {
			merchantType: {
				type: String,
				require: true
			}
		},
		components: {
			xlsAreaVue,
			xlsBankVue
		},
		data() {
			return {
				detailPopup: false,
				second: {
					accountNo: "", //结算银行卡账号 说明(必传
					bankName: "", //银行名称
					bankProv: "", //银行所属省
					bankCity: "", //银行所属市
					bankBranch: "", //支行名称
					bankCode: "", //结算银行支行联行号 说明(必传
					priatePublic: "TOPRIVATE", //// TOPRIVATE 对私 TOPUBLIC 对公
					accountAddress: "",
					linkPhone: "", //联系人号码 结算银行卡绑定手机号
					
					bankProvCode: '', // 选中开户银行编号
					cityCode: '' // 选中开户地址市级编号
				},
				placeholderStyle: "fontSize: 28rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},
				rules: {
					'accountNo': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'accountAddress': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['change']
					},
					'bankName': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['change']
					},
					'bankBranch': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['change']
					},
					'linkPhone': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'priatePublic': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur']
					},
				},
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// #ifdef MP
			this.$refs.secondForm.setRules(this.rules);
			// #endif
		},
		methods: {
			stopKeyborad() {
				uni.hideKeyboard();
			},
			pickerAddressItem() {
				this.$refs.xlsArea.pickerAddressItem();
			},
			getAreaMethod(params) {
				const {
					indexs,
					columnIndex,
					value,
					values
				} = params
				this.second.cityCode = value[1].addressCode;
				this.second.bankProv = value[0].addressNames;
				this.second.bankCity = value[1].addressNames;
				this.second.accountAddress = value
					.map((option) => option.addressNames)
					.join(" ");
					
				this.second.bankBranch = ''
				this.second.bankCode = ''
			},
			pickerBank(type) {
				if(type == 'Bank') {
					console.log(111, this.second.cityCode)
					console.log(222, this.second.bankProvCode)
					if(this.second.cityCode && this.second.bankProvCode) {
						let params = {
							cityCode: this.second.cityCode,
							bankProvCode: this.second.bankProvCode,
						}
						this.$refs.simplifyBank.openSimplifyBank(type, params);
					} else {
						this.$toast("请先填写完整开户地区和开户银行！")
					}
				} else {
					this.$refs.simplifyBank.openSimplifyBank(type);
				}
			},
			getSimplifyBank(params) {
				if (params.type === 'Simplify') {
					this.second.bankBranch = '';
					this.second.bankCode = '';
					this.second.bankProvCode = params.bank_code;
					this.second.bankName = params.bankName;
					return;
				}
				this.second.bankBranch = params.bankName;
				this.second.bankCode = params.subBankCode;
			},
			openPopup(updateParams) {
				if (updateParams) {
					// 只提取需要的属性
					const requiredParams = {
						accountNo: updateParams.accountNo, //结算银行卡账号 说明(必传
						bankName: updateParams.bankName, //银行名称
						bankProv: updateParams.bankProv, //银行所属省
						bankCity: updateParams.bankCity, //银行所属市
						bankBranch: updateParams.bankBranch, //支行名称
						bankCode: updateParams.bankCode, //结算银行支行联行号 说明(必传
						priatePublic: updateParams.priatePublic || "TOPRIVATE", //// TOPRIVATE 对私 TOPUBLIC 对公
						accountAddress: updateParams.bankProv && updateParams.bankCity ? `${updateParams.bankProv} ${updateParams.bankCity}` : '',
						linkPhone: updateParams.linkPhone, //联系人号码 结算银行卡绑定手机号
					};
					Object.assign(this.second, requiredParams);
					this.detailPopup = !this.detailPopup;
				}
			},
			nextStepMethod() {
				this.$refs.secondForm.validate().then(res => {
					this.$emit('nextStepMethod', {
						step: 'secondDetailStep',
						params: this.second
					})
					this.detailPopup = !this.detailPopup;
				}).catch(errors => {
					uni.$u.toast('校验失败，请检查！！')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss'
</style>