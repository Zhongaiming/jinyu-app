<template>
	<view class="revenue-share">
		<xls-jy-navbar title="收益分成查询"></xls-jy-navbar>
		<view class="classify-wrapper">
			<view class="classify-list" :class="{'active-item':accountType == item.id}"
				@click="changeAccountType(item.id)" v-for="item in accountTypeList" :key="item.id">
				{{ item.accountTypeName }}
			</view>
		</view>
		<view class="container">
			<view class="detail-header">
				<view class="site-wrapper" @click="pickerPerson = !pickerPerson" v-show="accountType == 1">
					<view class="title">人员</view>
					<view class="info s-divide-user">{{ personName }}</view>
					<u-icon name="arrow-right" size="36" color="#999" />
				</view>
				<view class="site-wrapper" @click="openPopup" v-show="accountType == 3">
					<view class="title">场地</view>
					<view class="info s-divide-user">{{ pickerPlace }}</view>
					<u-icon name="arrow-right" size="36" color="#999" />
				</view>
				<view class="site-wrapper no-border" @click="pickerTime = !pickerTime">
					<view class="title">时间</view>
					<view class="info s-divide-user">{{ date }}</view>
					<u-icon name="arrow-right" size="36" color="#999" />
				</view>
			</view>
			<view class="detail-title position">
				<view class="title-cell" v-show="accountType == 1">经营日期</view>
				<view class="title-cell" v-show="accountType != 1">分账人</view>
				<view class="title-cell">分成金额</view>
				<view class="title-cell" v-show="accountType == 1">结算到账情况</view>
			</view>
			<view class="detail-title detail-title-main" v-for="(item, index) in billsList" :key="index"
				v-show="billsList.length">
				<view class="title-cell" v-show="accountType == 1">
					{{ item.date }}
				</view>
				<view class="title-cell" v-show="accountType != 1">
					{{ item.nickName }}
				</view>
				<view class="title-cell" v-show="accountType != 3">
					{{ $formatAmount(item.separateAmount) }}
				</view>
				<view class="title-cell" v-show="accountType == 3">
					{{ $formatAmount(item.separateMoney) }}
				</view>
				<view class="title-cell" v-show="accountType == 1" v-html="'查看'" style="color: #5241FF"
					@click="goToDetail(item)"></view>
			</view>
		</view>
		<view class="all-wrapper">
			<view class="cell">合计</view>
			<view class="cell s-total">{{ $formatAmount(allCount) }}</view>
			<view class="cell" v-show="accountType == 1"></view>
		</view>
		<!-- person -->
		<u-popup :show="pickerPerson" mode="bottom">
			<view class="picker-person">
				<view class="title-wrapper">
					<view class="side" @click="pickerPerson = !pickerPerson">取消</view>
					<view class="center-main">请选择分账人</view>
					<view class="side"></view>
				</view>
				<xls-search placeholder="请输入场地名称" marLeft="-5.5em" @confirm="stratesSearch"></xls-search>
				<view class="person-content">
					<view class="person-item" v-for="(item, index) in billPeopleList" :key="index"
						v-show="billPeopleList.length" @click="selectPerson(item)">
						<view class="person-name">
							{{ item.nickName}}
							<span class="phone">({{ item.username }})</span>
						</view>
						<u-icon name="checkbox-mark" size="40" color="#5241FF" v-show="personName == item.nickName" />
					</view>
				</view>
			</view>
		</u-popup>
		<!-- place -->
		<xls-place-checkbox ref="placelist" @getPlaceId="getPlaceId"></xls-place-checkbox>
		<!-- time -->
		<xls-calendar :show="pickerTime" @close="() => { pickerTime = false }" @confirm="getCalender"></xls-calendar>
	</view>
</template>

<script>
	import {
		getTime,
		getDateAll
	} from "@/plugins/utilityClass";
	import {
		separateController
	} from '@/api/index.js';
	import suan from "@/plugins/floastCalculate";
	export default {
		data() {
			return {
				//查询类型
				accountType: 1,
				accountTypeList: [{
						id: 1,
						accountTypeName: "结算查询"
					},
					{
						id: 2,
						accountTypeName: "按日期查询"
					},
					{
						id: 3,
						accountTypeName: "按场地查询"
					},
				],
				//bill
				billsList: [],
				//person
				pickerPerson: false,
				billPeopleList: [],
				accountNumber: "",
				personName: "暂无人员",
				//place
				pickerPlace: "全部场地",
				placeIdList: "",
				//time
				pickerTime: false,
				date: new Date().getFullYear() +
					"-" +
					(new Date().getMonth() + 1 < 10 ?
						"0" + (new Date().getMonth() + 1) :
						new Date().getMonth() + 1) +
					"-" +
					"01" +
					"\u2002至\u2002昨天",
				//开始结束时间
				startTime: new Date().getFullYear() +
					"-" +
					(new Date().getMonth() + 1 < 10 ?
						"0" + (new Date().getMonth() + 1) :
						new Date().getMonth() + 1) +
					"-" +
					"01",
				endTime: getDateAll(1),
				//合计
				allCount: 0,
				searchValue: "",
			};
		},
		created() {
			this.getList();

		},
		methods: {
			//选择日期
			getCalender(date) {
				const [startTime, endTime] = date;
				this.pickerTime = false;
				this.date = `${startTime} 至 ${endTime}`;
				this.startTime = startTime;
				this.endTime = endTime;
				this.getBillsByType();
			},
			async getList() {
				let res = await separateController.getSeparatePerson();
				if (res.code == 200) {
					this.billPeopleList = res.data;
					if (this.billPeopleList.length) {
						this.accountNumber = this.billPeopleList[0].accountNumber;
						this.personName = this.billPeopleList[0].nickName;
						this.getBillsByPerson();
					}
				}
			},
			stratesSearch(search) {
				this.searchValue = search;
				this.getBillPeople();
			},
			async getBillPeople() {
				let res = await separateController.getSeparateBillsPeople({
					search: encodeURIComponent(this.searchValue),
				});
				if (res.code == 200) {
					this.billPeopleList = res.data;
				}
			},
			openPopup() {
				this.$refs.placelist.showPlacePopup()
			},
			//选择场地
			getPlaceId(place) {
				if (place[1].length == 1) {
					this.pickerPlace = `${place[0][0]}`;
				} else {
					this.pickerPlace = place[1].length ?
						`已选中(${place[1].length})个场地` :
						"全部场地";
				}
				this.placeIdList = place[1].length ? String(place[1]) : "";

				this.getBillsByType();
			},
			//选择分账人
			selectPerson(person) {
				this.pickerPerson = !this.pickerPerson;
				this.accountNumber = person.accountNumber;
				this.personName = person.nickName;
				this.getBillsByType();
			},
			//切换
			changeAccountType(id) {
				this.accountType = id;
				(this.startTime =
					new Date().getFullYear() +
					"-" +
					(new Date().getMonth() + 1 < 10 ?
						"0" + (new Date().getMonth() + 1) :
						new Date().getMonth() + 1) +
					"-" +
					"01"),
				(this.endTime = getDateAll(1));
				this.date =
					new Date().getFullYear() +
					"-" +
					(new Date().getMonth() + 1 < 10 ?
						"0" + (new Date().getMonth() + 1) :
						new Date().getMonth() + 1) +
					"-" +
					"01" +
					"\u2002至\u2002昨天";
				this.getBillsByType();
			},
			getBillsByType() {
				this.billsList = [];
				this.allCount = 0;
				if (this.accountType == 1) {
					this.getBillsByPerson();
				} else if (this.accountType == 2) {
					this.getBillsByTime();
				} else if (this.accountType == 3) {
					this.getBillsByPlace();
				}
			},
			//person
			async getBillsByPerson() {
				let res = await separateController.getSeparateByPerson({
					accountNumber: this.accountNumber, //分账人趣付码
					startTime: this.startTime,
					endTime: this.endTime,
				});
				if (res.code == 200) {
					this.billsList = res.data;
					this.allCount = 0;
					this.billsList.forEach((element) => {
						this.allCount = suan.add(element.separateAmount * 1, this.allCount);
					});
				}
			},
			//time
			async getBillsByTime() {
				let res = await separateController.getSeparateByTime({
					startTime: this.startTime,
					endTime: this.endTime,
				});
				if (res.code == 200) {
					this.billsList = res.data;
					this.allCount = 0;
					this.billsList.forEach((element) => {
						this.allCount = suan.add(element.separateAmount * 1, this.allCount);
					});
				}
			},
			//place
			async getBillsByPlace() {
				let res = await separateController.getSeparateByPlace({
					placeIdList: this.placeIdList, //场地id列表（字符串类型）
					startTime: this.startTime,
					endTime: this.endTime,
				});
				if (res.code == 200) {
					this.billsList = res.data;
					this.allCount = 0;
					this.billsList.forEach((element) => {
						this.allCount = suan.add(element.separateMoney * 1, this.allCount);
					});
				}
			},
			//分成明细
			goToDetail(item) {
				let date = item.date;
				let appMerchantCode = this.accountNumber;
				this.$goTo("/pages/mainPackages/home/separateAccounts/income/detail", "navigateTo", {
					date,
					appMerchantCode
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.revenue-share {
		width: 100%;
		height: 100vh;
		font-size: 28rpx;
		font-family: "PingFangSC", "Microsoft JhengHei", "Microsoft YaHei";
		overflow: scroll;
	}

	.classify-wrapper {
		width: 500rpx;
		height: 60rpx;
		text-align: center;
		display: flex;
		border: 1rpx solid #5241FF;
		border-radius: 10rpx;
		line-height: 50rpx;
		margin: 30rpx auto;
		font-size: 28rpx;
		overflow: hidden;
		box-sizing: border-box;

		.classify-list {
			flex: 1;
			color: #5241FF;
		}

		.classify-list:not(:last-child) {
			border-right: 1rpx solid #5241FF;
		}

		.active-item {
			color: #fff;
			background: #5241FF;
		}
	}

	.container {
		width: 100%;
		padding-bottom: 88rpx;

		.detail-header {
			padding: 0 20rpx;
			background: #fff;
			margin-bottom: 20rpx;

			.site-wrapper {
				display: flex;
				height: 88rpx;
				line-height: 88rpx;
				display: flex;
				font-size: 30rpx;
				align-items: center;
				border-bottom: 1rpx solid #e5e5e5;

				.title {
					color: #7a7a7a;
				}

				.s-divide-user {
					color: #5241FF;
					-webkit-box-flex: 1;
					flex: 1;
					text-align: right;
					position: relative;
					padding: 0 16rpx;
				}
			}

			.no-border {
				border: 0;
			}
		}

		.detail-title {
			text-align: center;
			color: #4f607c;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			height: 88rpx;
			background: #F5F6F7;
			padding: 0 20rpx;

			.title-cell {
				flex: 1;
			}
		}

		.position {
			position: sticky;
			top: 0;
			left: 0;
			z-index: 999;
		}

		.detail-title-main {
			border-top: 1rpx solid #e5e5e5;
			background: #fff;
			color: #000;
		}
	}

	.picker-person {
		width: 100%;
		height: 60vh;
		max-height: 1000rrpx;
		display: flex;
		flex-direction: column;

		.title-wrapper {
			padding: 0 20rpx;
			height: 88rpx;
			background: #f5f6f7;
			display: flex;
			align-items: center;
			text-align: center;
			font-size: 30rpx;

			.side {
				flex: 1;
				text-align: left;
				color: #5241FF;
			}

			.center-main {
				flex: 4;
				font-weight: 600;
			}
		}

		.person-content {
			padding: 0 20rpx;
			flex: 1;
			overflow: scroll;

			.person-item {
				height: 88rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #e5e5e5;

				.person-name {
					flex: 1;
					font-size: 30rpx;

					.phone {
						font-size: 24rpx;
						color: #999;
						margin-left: 12rpx;
					}
				}
			}
		}
	}

	.all-wrapper {
		position: fixed;
		bottom: 0;
		height: 88rpx;
		padding: 0 20rpx;
		width: 100%;
		box-sizing: border-box;
		line-height: 88rpx;
		background: #F5F6F7;
		border-top: 1rpx solid #e5e5e5;
		display: flex;
		font-size: 28rpx;
		text-align: center;

		.cell {
			flex: 1;
		}
	}
</style>