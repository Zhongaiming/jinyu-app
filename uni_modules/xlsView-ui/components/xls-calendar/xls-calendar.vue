<template>
	<view>
		<u-calendar :show="show" :mode="mode" @confirm="confirm" startText="开始" endText="结束" confirmDisabledText="请选择日期"
			:defaultDate="defaultDate" color="#5241ff" round="20" rowHeight="112" :maxDate="maxDate" :minDate="minDate"
			:maxRange="maxRange" monthNum="15" allowSameDay @close="close">
		</u-calendar>
	</view>
</template>

<script>
	import {
		getDateAll
	} from '@/plugins/utilityClass';
	export default {
		props: {
			// single只能选择单个日期
			// multiple可以选择多个日期
			// range可以选择日期范围
			mode: {
				type: String,
				default: 'range'
			},
			show: {
				type: Boolean,
				require: true
			},
			maxRange: {
				type: Number | String,
				default: '60'
			},
			minDate: {
				type: Number | String,
				default: () => {
					return getDateAll(365);
				}
			},
			maxDate: {
				type: Number | String,
				default: () => {
					return getDateAll(0);
				}
			},
			defaultDate: {
				type: Number | String,
				default: () => {
					return getDateAll(0);
				}
			}
		},
		methods: {
			confirm(params) {
				const time = this.getResult(params);
				this.$emit("confirm", time);
			},
			getResult(arr) {
				if (arr.length === 0) {
					return {
						startTime: "",
						endTime: ""
					};
				}
				const startTime = arr[0];
				const endTime = arr[arr.length - 1];
				return [startTime, endTime];
			},
			close() {
				this.$emit("close");
			},
		}
	}
</script>