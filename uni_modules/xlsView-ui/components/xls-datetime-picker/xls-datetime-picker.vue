<template>
	<u-datetime-picker 
		:show="show" 
		v-model="val" 
		:mode="mode"
		:itemHeight="itemHeight"
		:maxDate="maxDate"
		:minDate="minDate"
		:confirmColor="confirmColor"
		:title="title"
		:closeOnClickOverlay="closeOnClickOverlay"
		@confirm="confirm"
		@change="change"
		@cancel="cancel"
		@close="close"
	></u-datetime-picker>
</template>

<script>
	export default {
		name: "xls-datetime-picker",
		emits: ['input', 'update:modelValue'],
		props: {
		    // 是否打开组件
		    show: {
		        type: Boolean,
		        default: false
		    },
		    // 是否展示顶部的操作栏
		    showToolbar: {
		        type: Boolean,
		        default: true
		    },
		    // 绑定值
		    value: {
		        type: [String, Number],
		        default: ''
		    },
			// #ifdef VUE3
			//输入框值
			modelValue: {
				type: [Number, String],
				default: ''
			},
			// #endif
		    // 顶部标题
		    title: {
		        type: String,
		        default: ''
		    },
		    // 展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
		    mode: {
		        type: String,
		        default: 'date'
		    },
		    // 可选的最大时间
		    maxDate: {
		        type: Number,
		        // 最大默认值为后10年
		        // default: new Date(new Date().getFullYear() + 10, 0, 1).getTime()
				default: new Date(new Date().getFullYear() + 1, 0, 1).getTime()
		    },
		    // 可选的最小时间
		    minDate: {
		        type: Number,
		        // 最小默认值为前10年
		        // default: new Date(new Date().getFullYear() - 10, 0, 1).getTime()
				default: new Date().getTime()
		    },
		    // 可选的最小小时，仅mode=time有效
		    minHour: {
		        type: Number,
		        default: 0
		    },
		    // 可选的最大小时，仅mode=time有效
		    maxHour: {
		        type: Number,
		        default: 23
		    },
		    // 可选的最小分钟，仅mode=time有效
		    minMinute: {
		        type: Number,
		        default: 0
		    },
		    // 可选的最大分钟，仅mode=time有效
		    maxMinute: {
		        type: Number,
		        default: 59
		    },
		    // 选项过滤函数
		    filter: {
		        type: [Function, null],
		        default: null
		    },
		    // 选项格式化函数
		    formatter: {
		        type: [Function, null],
		        default: null
		    },
		    // 是否显示加载中状态
		    loading: {
		        type: Boolean,
		        default: false
		    },
		    // 各列中，单个选项的高度
		    itemHeight: {
		        type: [String, Number],
		        default: 88
		    },
		    // 取消按钮的文字
		    cancelText: {
		        type: String,
		        default: '取消'
		    },
		    // 确认按钮的文字
		    confirmText: {
		        type: String,
		        default: '确认'
		    },
		    // 取消按钮的颜色
		    cancelColor: {
		        type: String,
		        default: '#909193'
		    },
		    // 确认按钮的颜色
		    confirmColor: {
		        type: String,
		        default: '#5241ff'
		    },
		    // 每列中可见选项的数量
		    visibleItemCount: {
		        type: [String, Number],
		        default: 5
		    },
		    // 是否允许点击遮罩关闭选择器
		    closeOnClickOverlay: {
		        type: Boolean,
		        default: true
		    },
		    // 各列的默认索引
		    defaultIndex: {
		        type: Array,
		        default: () => []
		    }
		},
		watch: {
			// #ifdef VUE3
			modelValue(newVal) {
				this.val = newVal
			},
			// #endif
			value(newVal) {
				this.val = newVal
			}
		},
		created() {
			setTimeout(() => {
				// #ifndef VUE3
				this.val = this.value
				// #endif
		
				// #ifdef VUE3
				if (this.value && !this.modelValue) {
					this.val = this.value
				} else {
					this.val = this.modelValue
				}
				// #endif
				
			}, 50)
		},
		data() {
			return {
				val: ''
			}
		},
		methods: {
			change() {
				this.$emit('input', this.val)
				// #ifdef VUE3
				this.$emit('update:modelValue', this.val)
				// #endif
			},
			confirm({value, mode}) {
				const date = new Date(value);
				this.$emit('confirm', date)
			},
			cancel() {
				this.$emit('cancel')
			},
			close() {
				this.$emit('close')
			},
		}
	}
</script>

<style>
</style>