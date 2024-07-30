<template>
	<view class="xls-merchat-ca">
		<xls-jy-navbar title="审核进度" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>
		<xls-enter-inquiry></xls-enter-inquiry>
		<xls-steps :current="current"></xls-steps>
		<xls-side :current="current"></xls-side>
		<xls-organization :current="current" :merchantType="merchant.merchantType"
			@changeMerchantType="changeMerchant"></xls-organization>
		<xls-first-step :current="current" :merchantType="merchant.merchantType"
			@changeIdType="changeMerchant"></xls-first-step>
	</view>
</template>

<script>
	import xlsEnterInquiry from "./components/xls-enter-inquiry/index.vue";
	import xlsSteps from "./components/xls-steps/index.vue";
	import xlsSide from "./components/xls-side/index.vue";
	import xlsOrganization from "./components/xls-organization/index.vue";
	import xlsFirstStep from "./components/xls-first-step/index.vue";

	export default {
		components: {
			xlsEnterInquiry,
			xlsSteps,
			xlsSide,
			xlsOrganization,
			xlsFirstStep,
		},
		data() {
			return {
				current: 2,
				merchant: {
					merchantType: 'PERSON',
					idType: '',
				}

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