<template>
	<view class="xls-cell xls-field" @click="clickMethod">
		<view class="xls-cell__title xls-field__label" v-if="label">
			<text>{{label}}</text>
		</view>
		<view class="xls-cell__value xls-field__value">
			<view class="xls-field__body">
				<input :name="name" :value="val" :type="type" @focus="onFocus" @blur="onBlur" @input="onInput"
					@confirm="onConfirm" :placeholder="placeholder" :placeholder-style="placeholderStyle"
					:disabled="disabled || readonly" class="xls-field__control" :style="{'text-align': `${inputAlign}`}"/>
			</view>
		</view>
		<slot name="extra"></slot>
	</view>
</template>

<script>
	export default {
		name: 'xls-field',
		emits: ['input', 'update:modelValue', 'focus', 'blur', 'confirm'],
		props: {
			//title 文字
			label: {
				type: String,
				default: ''
			},
			//输入框值 vue2
			value: {
				type: [Number, String],
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			placeholderStyle: {
				type: String,
				default: "fontSize: 26rpx;opacity: .7"
			},
			// #ifdef VUE3
			//输入框值
			modelValue: {
				type: [Number, String],
				default: ''
			},
			// #endif
			//vue3
			modelModifiers: {
				default: () => ({})
			},
			//兼容写法，type为text时也做Number处理，NaN时返回原值
			number: {
				type: Boolean,
				default: false
			},
			//与官方input type属性一致
			type: {
				type: String,
				default: 'text'
			},
			//输入框名称
			name: {
				type: String,
				default: ''
			},
			trim: {
				type: Boolean,
				default: true
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false
			},
			inputAlign: {
				type: String,
				default: 'left'
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
			onInput(event) {
				let value = event.detail.value;
				if (this.trim) value = this.trimStr(value);
				this.val = value;
				// const currentVal = Number(value)
				// if ((this.modelModifiers.number || this.number || this.type === 'digit' || this.type === 'number') && !
				// 	isNaN(currentVal) && Number.isSafeInteger(currentVal)) {
				// 	let eVal = this.type === 'digit' ? value : currentVal
				// 	if (typeof eVal === 'number') {
				// 		const min = Number(this.min)
				// 		const max = Number(this.max)
				// 		if (typeof min === 'number' && currentVal < min) {
				// 			eVal = min
				// 		} else if (typeof max === 'number' && max < currentVal) {
				// 			eVal = max
				// 		}
				// 	}
				// 	value = isNaN(eVal) ? value : eVal
				// }
				this.$nextTick(() => {
					//当输入框为空时，输入框显示不赋值为0
					event.detail.value !== '' && (this.val = String(value));
				})
				//如果为空时返回0 ，当双向绑定会将输入框赋值0
				const inputValue = event.detail.value !== '' ? value : ''
				// TODO　兼容　vue2
				this.$emit('input', inputValue);
				// TODO　兼容　vue3
				// #ifdef VUE3
				this.$emit('update:modelValue', inputValue)
				// #endif
			},
			onFocus(event) {
				this.$emit('focus', event);
			},
			onBlur(event) {
				this.$emit('blur', event);
			},
			onConfirm(e) {
				this.$emit('confirm', e);
			},
			trimStr(str) {
				return str.replace(/^\s+|\s+$/g, '');
			},
			clickMethod() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xls-cell {
	    position: relative;
	    display: flex;
	    box-sizing: border-box;
	    width: 100%;
	    padding: 20rpx 24rpx;
	    overflow: hidden;
	    color: #323233;
	    font-size: 24rpx;
	    line-height: 48rpx;
	    background-color: #fff;
	}
	
	.xls-cell::after {
	    position: absolute;
	    box-sizing: border-box;
	    content: ' ';
	    pointer-events: none;
	    right: 10rpx;
	    bottom: 0;
	    left: 10rpx;
	    border-bottom: 1rpx solid #ebedf0;
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	}
	
	.xls-field__label {
		font-weight: 700;
		color: #333;
		font-size: 28rpx;
	}
	
	.xls-cell__title {
		-webkit-box-flex: 0;
		-webkit-flex: none;
		flex: none;
		box-sizing: border-box;
		width: 160rpx;
		margin-right: 32rpx;
		color: #646566;
		text-align: left;
		word-wrap: break-word;
	}
	
	.xls-cell__value {
	    position: relative;
	    overflow: hidden;
	    color: #969799;
	    text-align: right;
	    vertical-align: middle;
	    word-wrap: break-word;
		flex: 1;
	}
	
	.xls-field__value {
	    overflow: visible;
	}
	
	.xls-field__body {
		display: flex;
		align-items: center;
	}
	
	.xls-field__control {
	    display: block;
	    box-sizing: border-box;
	    width: 100%;
	    min-width: 0;
	    margin: 0;
	    padding: 0;
	    color: #323233;
	    line-height: inherit;
	    text-align: left;
	    background-color: transparent;
	    border: 0;
	    resize: none;
	}
</style>