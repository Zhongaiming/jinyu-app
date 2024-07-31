<template>
	<view class="xls-merchat-ca">
		<xls-jy-navbar title="审核进度" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>
		<xls-enter-inquiry></xls-enter-inquiry>
		<xls-steps :current="merchant.current"></xls-steps>
		<xls-side :current="merchant.current"></xls-side>
		<xls-organization :current="merchant.current" :merchantType="merchant.merchantType"
			@changeMerchantType="changeMerchant"></xls-organization>
		<xls-first-step :current="merchant.current" :merchantType="merchant.merchantType"
			@changeIdType="changeMerchant"></xls-first-step>
		<xls-second-step :current="merchant.current"></xls-second-step>
		<xls-three-step :current="merchant.current"></xls-three-step>
		<xls-four-step :current="merchant.current"></xls-four-step>
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
		},
		data() {
			return {
				merchant: {
					current: 1,
					merchantType: 'PERSON',
					idType: '',
				},
			}
		},
		methods: {
			changeMerchant(type, params) {
				this.merchant[type] = params;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.xls-merchat-ca {}
</style>