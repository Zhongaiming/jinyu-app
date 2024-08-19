<template>
	<view class="select-wrap" :class="{disabled:disabled}" @click="dropdown = !dropdown"
		:style="{height:`${height}rpx`,borderColor:'#dcdfe6',borderRadius:`${borderRadius}rpx`}">
		<view class="select-content">
			<slot :select="select" :selects="selects">
				<scroll-view scroll-x="true" v-if="multiple" class="scroll-view">
					<view class="tag-list">
						<view class="tag" v-for="(item,index) in selects" :key="item.value">
							<text>{{item.label}}</text>
							<text  class="clear iconfont icon-shanchu" @click.stop="handlerClearItem(index)"></text>
						</view>
					</view>
				</scroll-view>
				<text v-else>{{select}}</text>
			</slot>
			<text v-if="!multiple && !select " class="placeholder">{{placeHolder}}</text>
			<text v-if="multiple && !selects.length " class="placeholder">{{placeHolder}}</text>
		</view>
		<view class="icon">
			<text v-if="clearble && select" class="clear iconfont icon-shanchu" @click.stop="handlerClear"></text>
			<view class="">
				<text v-if="dropdown" class="iconfont icon-shang"></text>
				<text v-else class="iconfont icon-xia"></text>
			</view>
		</view>
		<view class="list" :class="{show:dropdown}" :style="{top:`${top}rpx`}">
			<view class="search" v-if="search" @click.stop>
				<view class="search-box" >
					<input class="input" v-model="searchKey" @input="handlerSearch" placeholderStyle="color:#85888d" placeholder="请输入" type="text" />
					<text  class="clear  iconfont icon-shanchu" v-if="searchKey" @click.stop="handlerClearSearch"></text>
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll-view">
				<view v-if="filterList.length > 0">
					<view v-if="multiple">
						<view class="option-item" v-for="(item,index) in filterList" :key="index" @click.stop="handlerSelectMutiple(item)">
							<text class="item-content" :class="{'item-active':selectValues.includes(item.value)}">{{item.label}}</text>
						</view>
					</view>
					<view  v-else>
						<view class="option-item" v-for="(item,index) in filterList" :key="index" @click="handlerSelect(item)">
							<!-- #ifdef VUE2 -->
							<text class="item-content" :class="{'item-active':item.value === value}">{{item.label}}</text>
							<!-- #endif -->
							<!-- #ifdef VUE3 -->
							<text class="item-content" :class="{'item-active':item.value === modelValue}">{{item.label}}</text>
							<!-- #endif -->
						</view>
					</view>
				</view>
				<view class="empty" v-else>
					<view class="empty-content">
						<text  class="empty-icon iconfont icon-kongshuju" ></text>
						<view class="empty-text">暂无数据</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="mask" v-if="dropdown"></view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: () => []
			},
			// #ifdef VUE2
			value: {
				type: [String, Number,Array],
				default: ""
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: [String, Number,Array],
				default: ""
			},
			// #endif
			search:{
				type:Boolean,
				default:false
			},
			multiple:{
				type:Boolean,
				default:false
			},
			height: {
				type: Number,
				default: 60
			},
			top: {
				type: Number,
				default: 70
			},
			borderRadius: {
				type: Number,
				default: 8
			},
			borderColor: {
				type: String,
				default: '#dcdfe6'
			},
			placeHolder: {
				type: String,
				default: '请选择'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			clearble: {
				type: Boolean,
				default: false
			},
			format: {
				type: Object,
				default: () => {
					return {
						label: "label",
						value: "value"
					}
				}
			}
		},
		// #ifdef VUE3
		emits: ['update:modelValue'],
		// #endif
		data() {
			return {
				dropdown: false,
				searchKey:"",
				select: "",
				selects:[],
				selectValues:[],
				list: [],//所有数据
				filterList:[],//过滤后的数据
			}
		},
		watch: {
			// #ifdef VUE2
			value:
			// #endif
			// #ifdef VUE3
			modelValue:
			// #endif  
			{
				handler(v) {
					if(this.multiple){
						this.selects = []
						v.forEach(val=>{
							this.list.forEach(e=>{
								if(e.value === val){
									this.selects.push({
										label:e.label,
										value:e.value
									})
								}
							})
						})
						this.selectValues = v
					}else{
						const item = this.list.find(e => e.value === v)
						if (item) {
							this.select = item.label
						} else {
							this.select = ""
						}
					}
				},
				immediate: true
			},
		},
		mounted() {
			const label = this.format.label
			const value = this.format.value
			this.list = this.data.map(e => {
				return {
					label: e[label],
					value: e[value]
				}
			})
			this.filterList = [...this.list]
		},
		methods: {
			handlerSelect(item) {
				// #ifdef VUE2
				this.$emit('input', item.value)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', item.value)
				// #endif
			},
			handlerSelectMutiple(item){
				const index = this.selects.findIndex(e=> e.value === item.value)
				if(index < 0){
					this.selects.push(item)
				}else{
					this.selects.splice(index,1)
				}
				this.selectValues = this.selects.map(e=>e.value)
				// #ifdef VUE2
				this.$emit('input', this.selectValues)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', this.selectValues)
				// #endif
				
			},
			handlerClear() {
				// #ifdef VUE2
				this.$emit('input', "")
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', "")
				// #endif
			},
			handlerClearItem(index){
				this.selects.splice(index,1)
				this.selectValues = this.selects.map(e=>e.value)
				// #ifdef VUE2
				this.$emit('input', this.selectValues)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue', this.selectValues)
				// #endif
			},
			//清空搜索
			handlerClearSearch(){
				this.searchKey = ""
				this.handlerSearch()
			},
			//过滤
			handlerSearch(){
				this.filterList = this.list.filter(v=>v.label.indexOf(this.searchKey) > -1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './iconfont/iconfonts.scss';
	$color: #409eff;

	.select-wrap {
		padding: 0 24rpx;
		min-width: 0;
		border: 1rpx solid;
		position: relative;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.select-content {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 24rpx;
			.scroll-view{
				width: 100%;
				height: 100%;
				.tag-list{
					display: flex;
					height: 100%;
					align-items: center;
					.tag{
						display: flex;
						align-items: center;
						flex-shrink: 0;
					    margin-right: 10rpx;
						padding: 8rpx;
						background: #f4f4f5;;
						border-radius: 8rpx;
						.clear{
							margin-left: 10rpx;
						}
					}
				}
			}
			
           
			.placeholder {
				color: #a8abb2;
			}
		}

		.icon {
			padding: 0 10rpx;
			display: flex;
			align-items: center;

			.clear {
				margin: 0 10rpx;
			}
		}

		&.disabled {
			pointer-events: none;
			background: #f5f7fa;
		}

		.list {
			position: absolute;
			left: 0;
			height: 0;
			border-radius: 8rpx;
			background: #fff;
			width: 100%;
			height: auto;
			visibility: hidden;
			z-index: 99;
			padding: 10rpx 0;
			box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
			.search{
				padding: 10rpx ;
				.search-box{
					display: flex;
					align-items: center;
					padding:0 24rpx;
					border-radius: 30rpx;
					// border: 1rpx solid #dadbde;
					background: #f5f5f5;
					.input{
						font-size: 24rpx;
						height: 60rpx;
						flex: 1;
					}
				}
			}
			.scroll-view {
				height: 280rpx;
				.option-item {
					height: 68rpx;
					display: flex;
					align-items: center;
					padding: 0 24rpx;
					.item-active {
						color: $color;
					}
					.item-content {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				.empty{
					height: 100%;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.empty-content{
						display: flex;
						flex-direction: column;
						align-items: center;
						.empty-icon{
							font-size: 70rpx;
						}
						.empty-text{
							padding-top: 30rpx;
							font-size: 24rpx;
						}
					}
				}
			}
			&.show {
				visibility: visible;
			}
		}
		.mask {
			height: 100%;
			width: 100%;
			z-index: 88;
			position: fixed;
			top: 0;
			left: 0;
		}
	}
</style>