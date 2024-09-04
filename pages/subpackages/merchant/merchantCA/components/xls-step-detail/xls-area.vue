<template>
	<view>
		<u-picker :show="pickerAddress" :columns="optionList" @confirm="pickerFinish" ref="uPicker" :loading="loading"
			@cancel="pickerAddress = false" itemHeight="88" confirmColor="#5241ff" title="请选择地区" keyName="addressNames"
			@change="changeHandler"></u-picker>
	</view>
</template>

<script>
	import {
		merchantController
	} from '@/api/index.js';
	export default {
		props: {
			length: {
				type: Number | String,
				default: 3
			}
		},
		data() {
			return {
				pickerAddress: false,
				optionList: [],
				loading: false,
			}
		},
		created() {
			this.getAreaNumber();
		},
		methods: {
			async getAreaNumber() {
				let res = await merchantController.getAreaNumber();
				let city = await merchantController.getAreaNumber({
					theSuperiorAddressCode: res.data[0].addressCode
				});
				let three = await merchantController.getAreaNumber({
					theSuperiorAddressCode: city.data[0].addressCode
				});
				if (res.code === 200) {
					this.optionList = [res.data, city.data, three.data]
				}
			},
			changeHandler(params) {
				let _this = this;
				uni.$u.debounce(async function() {
					const {
						columnIndex,
						index,
						value,
						// 微信小程序无法将picker实例传出来，只能通过ref操作
						picker = _this.$refs.uPicker
					} = params

					if (columnIndex === 0) {
						// 滚动第一第二列
						let city = await merchantController.getAreaNumber({
							theSuperiorAddressCode: value[0].addressCode
						})
						picker.setColumnValues(1, city.data)
						merchantController.getAreaNumber({
							theSuperiorAddressCode: city.data[0].addressCode
						}).then(three => {
							picker.setColumnValues(2, three.data)
						})
					}
					if (columnIndex === 1) {
						merchantController.getAreaNumber({
							theSuperiorAddressCode: value[1].addressCode
						}).then(three => {
							picker.setColumnValues(2, three.data)
						})
					}
				}, 500)
			},
			//确定地区
			pickerFinish(params) {
				const {
					columnIndex,
					value,
					values
				} = params
				this.$emit('getAreaMethod', params)
				this.pickerAddress = false;
			},
			//地区选择
			pickerAddressItem() {
				this.pickerAddress = true;
			},
		}
	}
</script>

<style>
</style>