<template>
	<z-paging ref="paging" v-model="recordList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="远程启动记录"></xls-jy-navbar>
			<view class="search-content">
				<view class="search-icon" @click="enterInput = !enterInput">
					<u-icon name="search" size="40" />
				</view>
				<view class="search-enter">
					<input type="text" style="color: #5241ff" placeholder="选择日期区间" readonly="true"
						@click="clickMethod" v-model="pickDate" />
					<view class="clear-icon Center" v-show="pickDate" @click.stop="clearPick" >
						<u-icon name="trash" size="34" />
					</view>
				</view>
				<view class="search-input" :class="{'show-input': enterInput}">
					<view class="search-icon">
						<u-icon name="search" size="40" />
					</view>
					<view class="search-enter">
						<input type="text" ref="searchInput" placeholder="请输入设备编号" v-model="deviceNumber"
							@confirm="comfirmSearch"/>
					</view>
					<view class="cancel-text" @click="cancelSearch">取消</view>
				</view>
			</view>

			<view class="centerB">
				<view class="choose-item Center" @click="$refs.deviceType.showDeviceTypelist()">
					<span>设备类型</span>
					<u-icon name="arrow-down" size="36" class="icon" />
				</view>
				<view class="choose-item Center" @click="showOperator = !showOperator">
					<span>操作人</span>
					<u-icon name="arrow-down" size="36" class="icon" />
				</view>
			</view>
			

			<view class="txtB">
				<view>当前累计上分{{ recordList.length }}次,共计{{ allPoints }}分</view>
			</view>
		</view>
		
		<!-- 操作记录 -->
		<view class="record-list">
			<view class="megItem-content" v-for="(rec, index) in recordList" :key="index" v-show="recordList.length">
				<view class="megItem" :style="{border:index==recordList.length-1?0:''}">
					<view class="itemB">
						<view class="topT">
							<span>{{ rec.deviceTypeName }}{{ rec.deviceNumber }}-{{rec.shippingSpace || "1"}}/{{ rec.railNumber || "1" }}</span><span>{{ rec.points }}分</span>
						</view>
						<view class="centerT">{{ rec.placeName }}</view>
						<view class="bottomT">
							<span>操作人：{{ rec.operatorName }}</span><span>{{ rec.operatorTime }}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<xls-empty slot="empty"></xls-empty>
		<!-- 日历 -->
		<xls-calendar :show="pickerDate" @close="() => { pickerDate = false }" @confirm="onConfirm"></xls-calendar>
		<!-- 设备类型 -->
		<xls-device-type-radio ref="deviceType" @changDeviceType="changDeviceType"></xls-device-type-radio>
		<!-- 操作人 -->
		<u-popup :show="showOperator" mode="bottom">
			<view class="person-content">
				<view class="contentT box-sizing">
					<view class="topTabs">
						<view class="topM">
							<view class="left" @click="showOperator = !showOperator">取消</view>
							<view class="center">请选择操作人</view>
							<view class="right" @click="operComfirm">确定</view>
						</view>
					</view>
				</view>
				
				<view class="content">
					<view class="option">
						<view class="optionB">
							<span>全部</span>
							<!-- <u-checkbox v-model="allCheck" checked-color="#5241FF"
								@click="$refs.checkboxGroup.toggleAll(allCheck)"></u-checkbox> -->
							<u-checkbox-group v-model="allCheck" @change="allGroupChange">
								<u-checkbox activeColor="#5241FF" name="1" shape="circle" 
								iconSize="32" labelSize="36" size="38">
									全选&nbsp;({{ `${checkboxGroup.length} 个` }})
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
					<u-checkbox-group v-model="checkboxGroup">
						<view class="option" v-for="(oper, index) in operatorList" :key="index">
							<view class="optionB">
								<span>{{ oper.operatorName }}</span>
								<u-checkbox :name="oper.operatorId" 
								activeColor="#5241FF" shape="circle" iconSize="32" 
								labelSize="36" size="38"></u-checkbox>
							</view>
						</view>
					</u-checkbox-group>
				</view>
			</view>
		</u-popup>
	</z-paging>	
</template>

<script>
	import {
		deviceController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				isShowInput: true,
				checkbox: true,
				//----deviceType
				showOperator: false,
				//operatorName
				operatorList: [],
				recordList: [],
				allPoints: 0,
				// person
				checkboxGroup: [],
				allCheck: [],
				operatorId: "",
				deviceTypeId: "",
				//date
				enterInput: false,
				deviceNumber: "",
				//参数
				pickerDate: false,
				pickDate: "",
				startTime: "",
				endTime: "",
			};
		},
		onLoad() {
			this.getOperator();
		},
		methods: {
			queryList(pageNo, pageSize) {
				deviceController.getRemoteLoginRecord({
					page: pageNo,
					size: pageSize,
					startTime: this.startTime,
					endTime: this.endTime,
					deviceTypeId: this.deviceTypeId,
					operatorId: this.operatorId,
					deviceNumber: this.deviceNumber,
				}).then(res => {
					this.$refs.paging.complete(res.data.dataList);
					this.allPoints = this.recordList.reduce((sum, item) => {
					    return sum + (item.points || 0);
					}, 0);
				})
			},
			//操作人
			async getOperator() {
				let res = await deviceController.getOperatorList();
				if (res.code == 200) {
					this.operatorList = res.data;
					this.checkboxGroup= this.operatorList.map(item => item.operatorId);
				}
			},
			allGroupChange(item) {
				if (item.length) {
					this.checkboxGroup = this.operatorList.map(item => item.operatorId);
				} else {
					this.checkboxGroup = [];
				}
			},
			//设备类型
			changDeviceType(arr) {
				this.deviceTypeId = arr.deviceTypeId;
				this.$refs.paging.reload();
			},
			clickMethod() {
				uni.hideKeyboard();
				this.pickerDate = !this.pickerDate;
			},
			//选择日期
			onConfirm(date) {
				const [startTime, endTime] = date;
				this.pickerDate = false;
				this.startTime = startTime;
				this.endTime = endTime;
				this.pickDate = `${startTime} 至 ${endTime}`;
				this.$refs.paging.reload();
			},
			operComfirm() {
				this.showOperator = !this.showOperator;
				this.operatorId = String(this.checkboxGroup);
				this.$refs.paging.reload();
			},
			clearPick() {
				this.pickDate = "";
				this.startTime = "";
				this.endTime = "";
				this.$refs.paging.reload();
			},
			cancelSearch() {
				this.enterInput = !this.enterInput;
				this.deviceNumber = "";
				uni.hideKeyboard();
				this.$refs.paging.reload();
			},
			comfirmSearch() {
				uni.hideKeyboard();
				this.$refs.paging.reload();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.person-content {
		height: 60vh;
		max-height: 1000rpx;
	}
	.search-content {
		height: 44px;
		width: 100%;
		background: #fff;
		display: flex;
		align-items: center;
		position: relative;

		.search-icon {
			padding: 0 10px;
			height: 44px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.search-enter {
			flex: 1;
			height: 44px;
			display: flex;
			align-items: center;
			position: relative;

			input {
				font-size: 14px;
				height: 32px;
				width: 100%;
				margin-right: 12px;
				padding: 0 12px;
				box-sizing: border-box;
				border-radius: 20px;
				background: #f5f6f7;
				border: 0;
				outline: 0;
				text-decoration: none;
			}

			.clear-icon {
				position: absolute;
				top: 0;
				right: 0;
				width: 70px;
				height: 100%;
				color: #8f8f94;
			}
		}

		.search-input {
			width: 100%;
			align-items: center;
			background: #fff;
			display: flex;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			transform: translateX(-100%);
			transition: transform 0.3s linear;
			width: 100%;
		}

		.cancel-text {
			font-size: 14px;
			padding-right: 10px;
			color: #5241ff;
		}

		.show-input {
			transform: translateX(0);
		}
	}

	.topFather {
		height: 44px;
		width: 100%;
		position: absolute;
		top: 0;
	}

	.topH {
		height: 44px;
		width: 100%;
		background: #fff;
		position: absolute;
		z-index: 999;
		top: 50px;
		display: flex;

		:nth-child(1) {
			width: 10%;
			height: 44px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		:nth-child(2) {
			width: 80%;
			height: 44px;
			display: flex;
			align-items: center;

			input[type="text"] {
				font-size: 13px;
				height: 32px;
				width: 95%;
				padding: 0 12px;
				box-sizing: border-box;
				border-radius: 20px;
				background: #f5f6f7;
				border: 0;
				color: #c2baba;
				appearance: none;
				-moz-appearance: none;
				outline: 0;
				text-decoration: none;
			}
		}

		:nth-child(3) {
			width: 10%;
			height: 44px;
			color: #5241ff;
			font-size: 13px;
			text-align: center;
			line-height: 44px;
		}
	}

	.centerB {
		width: 100%;
		height: 42px;
		background: #fff;
		display: flex;
		font-size: 14px;

		.choose-item {
			flex: 1;
			height: 100%;
			color: #333;
			font-weight: 400;

			.icon {
				margin-left: 4px;
			}
		}
	}

	.txtB {
		width: 100%;
		height: 40px;
		background: #f5f6f7;
		border-bottom: 1px solid #dcdcdc;

		:nth-child(1) {
			width: 95%;
			margin: 0 auto;
			font-size: 14px;
			font-weight: 400;
			color: #8f8f94;
			line-height: 40px;
		}
	}

	.record-list {
		flex: 1;
		overflow-y: scroll;
	}

	.megItem-content {
		padding: 0 12px;
		background: #fff;
	}

	.megItem {
		height: 100px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #c8c7cc;

		.itemB {
			height: 80%;
			width: 100%;

			.topT {
				height: 33%;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				font-weight: 500;
			}

			.centerT {
				height: 33%;
				font-size: 13px;
				color: #8f8f94;
				line-height: 26px;
			}

			.bottomT {
				height: 33%;
				font-size: 13px;
				color: #8f8f94;
				display: flex;
				justify-content: space-between;
				line-height: 100%;
				line-height: 26px;
			}
		}
	}

	.topTabs {
		height: 50px;
		width: 100%;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #f0f0f0;

		.topM {
			width: 95%;
			height: 21px;
			display: flex;
			font-size: 15px;

			.left {
				width: 25%;
				text-align: left;
				color: #5241ff;
			}

			.center {
				width: 50%;
				text-align: center;
			}

			.right {
				width: 25%;
				text-align: right;
				color: #5241ff;
			}
		}
	}

	.option {
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: center;

		.optionB {
			height: 44px;
			width: 95%;
			display: flex;
			font-size: 14px;
			justify-content: space-between;
			align-items: center;
		}
	}

	.option:not(:last-child) {
		border-bottom: 1px solid #f0f0f0;
	}
</style>