<template>
	<!-- shj 业务类型 -->
	<u-popup :show="businessType" mode="bottom" @close="businessType=false">
		<view class="popup-content">
			<view class="top">
				<view class="sides" @click="businessType=false">返回</view>
				<view class="title">请选择业务类型</view>
				<view class="sides right-side"></view>
			</view>
			<xls-search placeholder="请输入类型名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>
			<view class="content" v-if="typeList.length">
				<view class="typeItem" v-for="item in typeList" :key="item.id" @click="confirm(item)">
					<view class="text">{{ item.businessTypeName }}</view>
					<view class="check-icon">
						<u-icon name="checkmark-circle-fill" v-if="typeId == item.id" color="#5241FF" size="44" />
						<u-icon name="checkmark-circle" v-else color="#cbcbcb" size="44" />
					</view>
				</view>
				<xls-bottom></xls-bottom>
			</view>
			<xls-empty v-else />
		</view>
	</u-popup>
</template>

<script>
	import {
		shjController
	} from "@/api/index.js";
	export default {
		name: "shjbusinType",
		data() {
			return {
				businessType: false,
				typeList: [],
				typeId: 0,
				searchValue: null,
			};
		},
		mounted() {
			this.getList();
		},
		methods: {
			//获取列表
			async getList() {
				let res = await shjController.businessType({
					...(this.searchValue && {
						search: encodeURIComponent(this.searchValue)
					})
				})
				if (res.code == 200) {
					this.typeList = res.data ?? []
				}
			},
			stratesSearch(search) {
				this.searchValue = search
				this.getList()
			},
			//展示
			openBusiness(params) {
				this.typeId = params ? params : 0
				this.businessType = true
			},
			//父子传值
			confirm(item) {
				this.typeId = item.id
				this.$emit("itemclick", item)
				this.businessType = false
			},
		},
	};
</script>
<style lang="scss" scoped>
	.popup-content {
		height: 60vh;
		max-height: 1000rpx;
		width: 100%;
		background: #f5f6f7;
		display: flex;
		flex-direction: column;
	}

	.top {
		display: flex;
		height: 44px;
		align-items: center;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
		line-height: 44px;
		position: sticky;
		padding: 0 2.5%;
		top: 0;
		z-index: 999;

		.sides {
			color: #5241ff;
			font-size: 15px;
			height: 44px;
			width: 20%;
		}

		.right-side {
			text-align: right;
		}

		.title {
			width: 60%;
			font-size: 16px;
			text-align: center;
		}
	}

	.content {
		flex: 1;
		overflow-y: auto;
		margin-top: 12px;

		.typeItem {
			padding: 0 2.5%;
			align-items: center;
			color: #000;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			font-size: 16px;
			height: 48px;
			box-sizing: border-box;
			border-bottom: 1px solid #e5e5e5;
			background: #fff;

			.text {
				flex: 1;
			}

			.check-icon {
				text-align: right;
			}
		}
	}
</style>