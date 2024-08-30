<template>
	<u-popup :show="showDviceTypeCheckbox" mode="bottom" round="20">
		<view class="place-wrapper-style">
			<view class="title-wrapper">
				<view @click="showDviceTypeCheckbox = false">取消</view>
				<view @click="comfirnBtn">确定（{{ checkboxGroup.length }}个）</view>
			</view>
			
			<view class="place-content-style" v-if="deviceTypeList.length">
				<view class="place-item-style">
					<view class="text-name all-check">全选</view>
					<view class="radio-style" @click="checkAllPlace">
						<u-icon name="checkmark-circle-fill" size="46" color="#5241FF" v-if="allCheck" />
						<u-icon name="checkmark-circle" size="46" color="#CECFD2" v-else />
					</view>
				</view>
				<view class="place-item-style" v-for="(item, index) in deviceTypeList" :key="index">
					<view class="text-name">
						<span>{{ item.typeName }}</span>
					</view>
					<view class="radio-style" @click="checkPlaceItem(item.id)">
						<u-icon name="checkmark-circle-fill" size="46" color="#5241FF"
							v-if="checkboxGroup.includes(item.id)" />
						<u-icon name="checkmark-circle" size="46" color="#CECFD2" v-else />
					</view>
				</view>
				<xls-bottom></xls-bottom>
			</view>
			<xls-empty v-else></xls-empty>
		</view>
	</u-popup>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				showDviceTypeCheckbox: false,
				checkboxGroup: [],
				allCheck: false,
			};
		},
		computed: {
			...mapGetters([
				'deviceTypeList',
				'deviceTypeDict'
			])
		},
		async mounted() {
			this.$store.dispatch('config/getList');
		},
		methods: {
			//普通打开
			showDviceType(params) {
				if(params.length) {
					this.checkboxGroup = params;
				}
				this.showDviceTypeCheckbox = !this.showDviceTypeCheckbox;
			},
			//单项反选
			checkPlaceItem(id) {
				if (this.checkboxGroup.includes(id)) {
					this.checkboxGroup.splice(this.checkboxGroup.indexOf(id), 1);
				} else {
					this.checkboxGroup.push(id);
				}
				this.allCheck = this.checkboxGroup.length == this.deviceTypeList.length;
			},
			//全选、全不选
			checkAllPlace() {
				this.allCheck = !this.allCheck;
				this.checkboxGroup = [];
				if (this.allCheck) {
					this.checkboxGroup = this.deviceTypeList.map(item => item.id);
				}
			},
			comfirnBtn() {
				const typeText = `已选${this.checkboxGroup.length}种设备类型`;
				const params = {
					deviceTypeText: typeText,
					deviceTypeCheckList: this.checkboxGroup
				};
				this.$emit("getDeviceType", params);
				this.showDviceTypeCheckbox = !this.showDviceTypeCheckbox;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.place-wrapper-style {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 60vh;
		max-height: 1000rpx;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";
		background: #fff;

		.title-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 4px 0 12px;
			line-height: 46px;
			font-size: 16px;
			color: #5241ff;
			background: #f5f6f7;
		}

		.place-content-style {
			flex: 1;
			padding: 0 10px;
			overflow-y: scroll;

			.place-item-style {
				border-top: 1px solid #e5e5e5;
				line-height: 45px;
				font-size: 16px;
				display: flex;
				align-items: center;

				.text-name {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.all-check {
					margin-left: 16px;
					font-weight: 700;
				}

				.serial-number {
					font-size: 12px;
					color: #999;
					margin-right: 8px;
				}

				.radio-style {
					padding: 0px 2px 0px 20px;
				}
			}
		}
	}
</style>