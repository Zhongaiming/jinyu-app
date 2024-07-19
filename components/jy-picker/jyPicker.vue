<template>
	<view>
		<slot></slot>
		<u-picker
			v-if="type != 'dateTime'"
			:show="value" :itemHeight="itemHeight" :title="title"
			ref="uPicker" :columns="columns" @confirm="changeEvent"
			:keyName="keyName" :defaultIndex="modal" @cancel="cancelEvent"
		>
		</u-picker>
		
		 <u-datetime-picker
		  ref="dateTimePicker"
			v-if="type == 'dateTime'" 
			:show="value" :title="title" :formatter="formatter"
			:mode="mode" :itemHeight="itemHeight"
			@cancel="cancelEvent" @confirm="changeEvent"
		></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		/**
		 * 只使用了部分属性： 若需要增加，可参考uview官方文档
		 */
		props: {
			value: {  // 是否显示picker弹框
				type: Boolean,
				default: false
			},
			defaultValue: {  // 默认选中的值
				type: Number | String | Array,
			},
			type: { // 类型 普通选择器（selector）； 多列选择器（multiSelector）； 时间日期选择器(dateTime)
				type: String,
				default: 'selector'
			},
			columns: { // type 为selector | multiSelector 时生效选 （使用数组对象的形式，因为默认选中value传选中数组下标不合理）
				type: Array,
				default: () => []
			},
			keyName: {  // type 为selector | multiSelector 时生效 (通过 range-key 来指定 Object 中 key 的值作为选择器显示内容)
				type: String,
				default: 'label'
			},
			
			mode: { // type 为 dateTime 时生效（配置选择何种日期格式 datetime为完整日期时间, date为日期选择，time为时间选择，year-month为年月选择）
				type: String,
				default: 'date'
			},
			fieldKey: { // range 中对应的对象的主键
				type: String,
				default: 'id'
			},
			title: { // 顶部中间标题
				type: String,
				defualt: ''
			},
			itemHeight: {  // 各列中，单个选项的高度
				type: [String, Number],
				default: 80
			}
		},
		data() {
			return {
				modal: undefined,
			}
		},
		methods: {
			changeEvent(e) {
				console.log('34444', e, this.range)
				if(this.type === 'selector') {
					this.columns[0].forEach((item, index) => {
						console.log(e.indexs[index], index)
						if(e.indexs[0] === index) {
							this.$emit('pickerChange', item)
						}
					})
				} else if(this.type === 'multiSelector'){
					let data = []
				
					this.columns.forEach((item, index) => {
						item.forEach((item2, index2) => {
							if(e.indexs[index] === index2) {
								data.push(item2)
							}
						})
					})
					this.$emit('pickerChange', data)
				} else {
					console.log('时间格式是', e)
					this.$emit('pickerChange', e.value)
				}
				this.$emit('input', false)
				
			},
			cancelEvent(e) {
				this.$emit('input', false)
			},
			
			getDefaultSelcet() {
				if(this.defaultValue) {
					if(this.type === 'selector') {
						this.columns[0].forEach((item,index) => {
							if(Number(this.defaultValue) === item[this.fieldKey]) {
								this.modal = [index]
							}
						})
					} else if(this.type === 'multiSelector'){
						let data = []
						this.columns.forEach((item, index) => {
							item.forEach((item2, index2) => {
								if(item2[this.fieldKey] === this.defaultValue[index]) {
									data.push(index2)
								}
							})
						})
						this.modal = data
					} else {
						this.$refs.dateTimePicker.innerValue = this.defaultValue
					}
				}
			},
			formatter(type, value) {
				if (type === 'year') {
						return `${value}年`
				}
				if (type === 'month') {
						return `${value}月`
				}
				if (type === 'day') {
						return `${value}日`
				}
				return value
			},
		},
		watch: {
			value(newValue) {  // 监听是否显示，完成初始化值渲染
			console.log('Jinlai l ', newValue)
				this.getDefaultSelcet()
			}
		},
		onReady() {
			// #ifdef MP
			this.$refs.datetimePicker.setFormatter(this.formatter)
			// #endif
			
		},
		mounted() {
			
		}	
	}
</script>

<style>
</style>