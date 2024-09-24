<template>
	<!-- 设备货道 -->
	<u-popup v-model="railCheck" position="bottom" :style="{ height: '60%' }"
		@click-overlay="$parent.railEdit = true">
		<div class="edit-cargoroad flex-wrapper">
			<div class="popup-header">
				<span @click="($parent.railEdit = true), (railCheck = false)">取消</span>
				<span class="popup-title">货道选择</span>
				<span @click="specialRail">确定</span>
			</div>
			<search-input @stratesSearch="stratesSearch" placeholder="请输入货道号"></search-input>
			<div class="all-checkbox-box">
				<div class="left-style">
					<u-checkbox v-model="allCheck" checked-color="#5241FF"
						@click="$refs.checkboxGroup.toggleAll(allCheck)"></u-checkbox>
					<span>全选</span>
				</div>
				<div>
					设备号： {{ allRailList.length ? allRailList[0].deviceNumber : "" }}
				</div>
			</div>
			<u-checkbox-group v-model="checkboxGroup" direction="horizontal" ref="checkboxGroup" class="rail-wrapper"
				v-show="railList.length">
				<div class="item-style-wrapper" v-for="(item, index) in railList" :key="index">
					<div class="item-style">
						<img :src="item.commodityImg" alt="" v-if="item.commodityImg" />
						<img src="@/assets/image/other/ztwl.png" alt="" v-else />
						<div>{{ item.railNumber }}</div>
						<div class="value text-over">{{ item.commodityName || "未设置" }}</div>
						<div class="handle-list">
							<u-checkbox :name="item.id" @click="allCheck = checkboxGroup.length == railList.length"
								checked-color="#5241FF"></u-checkbox>
						</div>
					</div>
				</div>
				<on-earth />
			</u-checkbox-group>
			<no-data v-show="!railList.length" />
		</div>
	</u-popup>
</template>

<script>
	import local from "@/plugins/storage";
	export default {
		name: "shjRails",
		data() {
			return {
				//货道
				allRailList: [],
				railList: [],
				railCheck: false,
				allCheck: false,
				checkboxGroup: [],
			};
		},
		methods: {
			openRailModule() {
				this.railList = local.getSion("shjRailList") || [];
				this.allRailList = local.getSion("shjRailList") || [];
				this.checkboxGroup = [];
				this.allCheck = false;
				this.railCheck = true;
			},
			stratesSearch(value) {
				if (!value) {
					return this.railList = this.allRailList;
				}
				this.railList = this.allRailList.filter((item) => {
					return item.railNumber.indexOf(value) > -1;
				});
			},
			specialRail() {
				if (!this.checkboxGroup.length) {
					return this.$toast("请您至少选择一条货道~");
				}
				this.$emit("getShjRail", this.checkboxGroup);
				this.railCheck = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.edit-cargoroad {
		background: #fff;
		width: 100%;

		.popup-header {
			align-items: center;
			background: #f4f5f7;
			color: #5241FF;
			display: flex;
			font-size: 16px;
			height: 45px;
			justify-content: space-between;
			padding: 0 10px;

			.popup-title {
				color: #000;
			}
		}
	}

	.flex-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-size: 14px;

		.all-checkbox-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 12px 5px;

			.left-style {
				display: flex;
				align-items: center;

				span {
					margin-left: 10px;
				}
			}
		}

		.rail-wrapper {
			flex: 1;
			overflow-y: scroll;
			background: #f5f6f7;
			display: flex;
			flex-wrap: wrap;
			align-items: start;
			padding: 5px 12px;

			// justify-content: space-between;
			.item-style-wrapper {
				width: 32%;
				margin-right: 1.3%;
				background: #fff;
				border-radius: 6px;
				margin-bottom: 10px;
				padding: 5px;
				box-sizing: border-box;
				position: relative;
			}

			.item-style {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				img {
					width: 50px;
					height: 50px;
					margin-bottom: 5px;
				}

				.value {
					max-width: 95%;
					font-size: 12px;
					color: #999;
				}

				.handle-list {
					position: absolute;
					top: 6px;
					right: -8px;
				}
			}
		}
	}
</style>