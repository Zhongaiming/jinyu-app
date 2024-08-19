<template>
	<view class="xls-setup-page">
		<view class="mui-input-group">
			<view class="mui-input-row">
				<label class="label">分成场地</label>
				<view class="left-text">已选择{{ acountPlaceNum(placeId) }}个场地</view>
			</view>

			<view class="explanation">
				开启即代表您已阅读并同意
				<span class="serviceBtn" @click="protocolMask('protocol')">《支付服务协议》</span>
			</view>
		</view>

		<view class="mui-input-group status">
			<view class="mui-input-row">
				<label class="label">分成方设置</label>
				<view class="add-member" @click="estimateAdd('add')">+添加分成方</view>
			</view>
		</view>

		<u-swipe-action></u-swipe-action>
		<u-swipe-cell v-for="(item, index) in billsPeopleList" :key="index">
			<view class="wrapper">
				<view class="person-item">
					<span class="tips-icon" v-show="item.masterNo == 1">主</span>
					<span class="name">{{ item.nickName
              }}<span class="phone" v-html="item.username ? '(' + item.username + ')' : ''"></span></span>
					<span class="right" v-html="item.proportion ? item.proportion + '%' : ''"
						v-show="acountPlaceNum(placeId) <= 1"></span>
				</view>
			</view>
			<template #right>
				<u-button square type="info" text="编辑" @click="estimateEdit(item)" />
				<u-button square type="danger" text="删除"
					@click="deletePersonItem(item.separateBillsId, item.masterNo)" />
			</template>
		</u-swipe-cell>

		<view class="footer">
			<view class="text-tips">
				<view>注意事项：</view>
				<!-- 于第二天0时生效 -->
				<view>1.分成设置成功后,将立即生效。</view>
				<view>
					2.开启“自动结算到账”，并绑定银行卡后，当天的“在线支付” 分成收益
					,扣除手续费0.6%后,第二天24:00前将直接自动结算打款到各分成方的银行卡(D+1结算)。
				</view>
				<view>
					3.如果您上游有代理商参与设备分账，且您场地添加了其他分成方和分成比例，那么您添加的分成方所分得的金额为剔除代理商分成金额以后剩下的金额再乘以您设置的分成比例。代理商分账只对代理商专属的设备生效，非代理商设备是不会发生代理商分账的。
				</view>
				<a class="checkALLBtn" @click="protocolMask = !protocolMask">查看全部&gt;&gt;</a>
			</view>
		</view>
		<view class="footer-save" @click="goBack()">
			<view class="footer-next-step">返回分账首页</view>
		</view>



		<!-- add -->
		<u-popup v-model="noPersontips">
			<view class="noPersontips">
				<view class="close-btn-panel" @click="noPersontips = !noPersontips">
					x
				</view>
				<view class="title-name">暂无可以参与分成的人员！</view>
				<view class="hint-info">
					请前往 “分成人员管理” 添加人员。<span class="isBindCard">如果您已添加人员，请确认分成人员的银行卡是否已绑定成功。</span>
				</view>
				<view class="bom-btn-panel" @click="$router.replace('/subAccount/separatePerson')">
					前往管理分成人员
				</view>
			</view>
		</u-popup>

		<u-popup v-model="havePersontips">
			<view class="noPersontips havePersontips">
				<view class="title-name title-name-have">分成设置</view>
				<view class="content-person">
					<view class="items">
						<view class="title">分成人员：</view>
						<view class="item-con" :style="editOradd ? { 'pointer-events': 'none' } : ''"
							@click="showPeople = true">
							<span class="main-text" :style="
                  billsPeople == '请选择分成人员' ? { color: '#c8c9cc' } : ''
                ">
								{{ billsPeople }}
								<span v-show="editOradd" style="color: #c8c9cc; font-size: 10rpx">(不可编辑)</span>
							</span>
							<u-icon name="arrow-down" class="icon" size="20" color="#c8c9cc" />
						</view>
					</view>
					<view class="items">
						<view class="title">分成比例：</view>
						<view class="item-con">
							<u-field type="number" v-model="proportion" placeholder="请输入给合作方的分成比例" maxlength="5"
								clearable />
							<span class="icon">%</span>
						</view>
					</view>
					<view class="items" v-show="editOradd">
						<view class="title">是否主分账人员：</view>
						<view class="right">
							<u-switch v-model="checked" size="24rpx" active-color="#5241FF" />
						</view>
					</view>
					<view class="items">
						<view class="title">合作方银行卡号：</view>
						<span class="next-txt">自动读取</span>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="btn" @click="havePersontips = !havePersontips">取消</view>
					<view class="btn" @click="addOreditPeople">确定</view>
				</view>
			</view>
		</u-popup>

		<!-- 分账人 -->
		<u-popup v-model="showPeople" position="bottom" :style="{ height: '60%' }">
			<view class="person-list">
				<span class="title">请选择分成人员</span>
				<search-input placeholder="请输入场地名称" marLeft="-5.5em" @stratesSearch="stratesSearch"></search-input>
				<view class="list-content">
					<view class="item" v-for="(item, index) in searchBillList" :key="index" @click="pickerPerson(item)">
						<span class="person-name">{{ item.nickName
              }}<span class="person-phone">&nbsp;&nbsp;({{ item.username }})</span></span>
						<span>&gt;</span>
					</view>
					<view class="on-earth">到底了~</view>
				</view>
			</view>
		</u-popup>
		<xls-setup-protocol-vue></xls-setup-protocol-vue>
	</view>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	import xlsSetupProtocolVue from './xls-setup-protocol.vue';

	export default {
		components: {
			xlsSetupProtocolVue
		},
		data() {
			return {
				checked: false,

				noPersontips: false,
				havePersontips: false,
				//
				element: {
					target: {
						scrollLeft: 0,
						scrollWidth: 0,
					},
				},
				lastIndex: -1,
				//
				placeId: "",
				billsPeopleList: [],
				editOradd: false,
				proportion: "",
				editInfo: {
					proportion: "",
					masterNo: "",
					id: "",
					separateBillsId: "",
				},
				//
				billsPeople: "请选择分成人员",
				showPeople: false,
				separateBillsList: [],
				searchBillList: [],
				separateBillsId: "",
			};
		},
		async onLoad(option) {
			// if (this.$route.query.placeId) {
			// 	this.placeId = this.$route.query.placeId;
			// 	this.getPeopleList();
			// }
			// let res = await getSeparateBillsPeople({});
			// if (res.data.code == 0 || res.data.msg == "ok") {
			// 	this.separateBillsList = res.data.data;
			// 	this.searchBillList = res.data.data;
			// }
		},
		methods: {
			protocolMask() {

			},
			goBack() {
				
			},
			async stratesSearch(search) {
				let res = await getSeparateBillsPeople({
					search: encodeURIComponent(search),
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.searchBillList = res.data.data;
				}
			},
			acountPlaceNum(place) {
				let placeNum = 0;
				for (let len = 0; len < place.length; len++) {
					if (place[len] == ",") {
						++placeNum;
					}
				}
				return placeNum + 1;
			},
			scrollLeft(elm, index) {
				let width = document.body.clientWidth || document.body.offsetWidth;
				let scrollWidth = elm.target.scrollWidth - width;
				if (this.lastIndex !== index) {
					this.lastIndex = index;
					this.element.target.scrollLeft = 0;
				}
				this.element = elm;
			},
			//删除
			async deletePersonItem(separateBillsId, masterNo) {
				if (masterNo == 1) {
					return this.$dialog
						.alert({
							title: "温馨提示",
							message: "注意！！主分账人不可删除~",
							width: "270",
						})
						.then(() => {});
				}
				this.$dialog
					.confirm({
						title: "温馨提示",
						message: "确定要删除该合作人分成比例设置吗？",
						width: "270",
						confirmButtonText: "删除",
						confirmButtonColor: "#f73e3e",
					})
					.then(() => {
						deleteSeparateBillsInfo({
								separateBillsId,
								placeIdList: this.placeId,
							})
							.then((res) => {
								console.log("删", res);
								if (res.data.code == 0 || res.data.msg == "ok") {
									// this.billsPeopleList = this.billsPeopleList.filter((item)=>{
									//     return item.separateBillsId != separateBillsId
									// })
									this.$toast.success("删除成功");
									this.getPeopleList();
								}
							})
							.catch((err) => {});
					})
					.catch(() => {});
			},
			//获取
			async getPeopleList() {
				let res = await getviewidePersonList({
					placeId: String(this.placeId)
				});
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.billsPeopleList = res.data.data;
				}
			},
			//选择分成人员
			pickerPerson(item) {
				this.showPeople = false;
				this.billsPeople = item.nickName;
				this.separateBillsId = item.id;
			},
			//添加
			estimateAdd(type) {
				if (type == "add") {
					this.billsPeople = "请选择分成人员";
					this.separateBillsId = "";
					this.proportion = "";
				}
				if (!this.separateBillsList.length) {
					//无分成人
					this.noPersontips = !this.noPersontips;
				} else {
					this.havePersontips = !this.havePersontips;
					this.editOradd = false;
				}
			},
			async addBillsPeople() {
				if (!this.proportion) {
					return this.$toast("请确保信息完整后再添加~");
				}
				if (this.proportion > 100) {
					return this.$toast("比例不能大于100~");
				}
				let res = await addSeparateBillsInfo({
					separateBillsId: this.separateBillsId, //分账人员ID
					masterNo: this.checked ? 1 : 0, //是否主分账人员;（1：是，0：否）
					proportion: this.proportion, //分账比例;100% = 100
					placeIdList: this.placeId, //场地ID
				});
				console.log("加", res);
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.getPeopleList();
					this.havePersontips = !this.havePersontips;
					this.billsPeople = "请选择分成人员";
					this.separateBillsId = "";
					this.proportion = "";
					this.$toast.success("添加成功");
				} else {
					return;
				}
			},
			//编辑
			async estimateEdit(item) {
				// console.log('bianj',item)
				if (item.masterNo == 1) {
					return this.$dialog
						.alert({
							title: "温馨提示",
							message: "注意！！主分账人不可编辑~",
							width: "270",
						})
						.then(() => {
							this.element.target.scrollLeft = 0;
						});
				}
				this.havePersontips = !this.havePersontips;
				this.editOradd = true;
				this.editInfo = item;
				this.proportion = item.proportion;
				this.billsPeople = item.nickName;
				item.masterNo ? (this.checked = true) : (this.checked = false);
			},
			async editBillsPeople() {
				if (!this.proportion) {
					return this.$toast("请确保信息完整后再修改~");
				}
				if (this.proportion > 100) {
					return this.$toast("比例不能大于100~");
				}
				let res = await editSeparateBillsInfo({
					separateBillsId: this.editInfo.separateBillsId,
					masterNo: this.checked ? 1 : 0, //是否主分账人员;（1：是，0：否）
					proportion: this.proportion, //分账比例;100% = 100
					placeIdList: this.placeId, //场地ID
				});
				console.log("改", res);
				if (res.data.code == 0 || res.data.msg == "ok") {
					this.havePersontips = !this.havePersontips;
					this.getPeopleList();
					this.element.target.scrollLeft = 0;
					this.$toast.success("修改成功");
				}
			},
			//确定--添加或编辑
			addOreditPeople() {
				if (this.editOradd) {
					//编辑
					this.editBillsPeople();
				} else {
					//添加
					this.addBillsPeople();
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	.xls-setup-page {
		width: 100%;
		font-family: "Microsoft JhengHei", "Microsoft YaHei";

		.mui-input-group {
			background: #fff;
			padding: 0 20rpx 16rpx;

			.mui-input-row {
				line-height: 90rpx;
				width: 100%;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				.label {
					padding: 0 0 0 20rpx;
					line-height: 90rpx;
					color: #999;
					font-size: 30rpx;
					width: 190rpx;
				}

				.left-text {
					flex: 1;
					padding-right: 50rpx;
					color: #3a3d44;
					font-size: 30rpx;
					line-height: 90rpx;
				}
			}

			.mui-input-row:not(:last-child) {
				border-bottom: 2rpx solid #e3e2e7;
			}

			.explanation {
				line-height: 30rpx;
				font-size: 26rpx;
				color: #999;
				padding: 10rpx 20rpx;
				height: 88rpx;
				box-sizing: border-box;
				background: #f5f6f7;
				border-radius: 0 0 10rpx 10rpx;
				display: flex;
				align-items: center;
				margin-top: 26rpx;
				flex-wrap: wrap;

				.serviceBtn {
					color: #5241ff;
				}
			}
		}

		.status {
			margin-top: 20rpx;
			padding-bottom: 0;
			border-bottom: 2rpx solid #e3e2e7;

			.add-member {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				color: #5241ff;
				font-size: 28rpx;
			}
		}

		.footer {
			overflow: hidden;
			padding: 50rpx 30rpx 0;
			background: unset;
			margin-bottom: 150rpx;
			font-size: 28rpx;

			.text-tips {
				color: #999;
				line-height: 40rpx;
			}

			.checkALLBtn {
				color: #5241ff;
				margin: 12rpx 0 20rpx 0;
			}
		}

		.footer-save {
			padding: 24rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.footer-next-step {
				width: 100%;
				line-height: 88rpx;
				text-align: center;
				color: #fff;
				background: #ccc;
				font-size: 32rpx;
				border-radius: 12rpx;
			}
		}
	}

	.wrapper {
		width: 100vw;
		line-height: 45rpx;
		height: 45rpx;
		box-sizing: border-box;
		white-space: nowrap;
		padding: 0 10rpx;
		background: #fff;

		.person-item {
			box-sizing: border-box;
			width: 100%;
			font-size: 15rpx;
			display: inline-block;
			font-weight: 600;
			height: 45rpx;
			line-height: 45rpx;
			border-bottom: 1rpx solid #e3e2e7;

			.name {
				padding: 0 8rpx;

				.phone {
					font-size: 10rpx;
					font-weight: normal;
					color: #999;
				}
			}

			.right {
				float: right;
			}
		}

		.delete {
			font-size: 15rpx;
			padding: 0 8rpx;
			width: 56rpx;
			box-sizing: border-box;
			color: #fff;
			background: rgb(233, 87, 87);
			white-space: nowrap;
			display: inline-block;
			text-align: center;
		}

		.delete:active {
			opacity: 0.8;
		}

		.edit {
			background: rgb(82, 152, 243);
		}

		.tips-icon {
			line-height: 22rpx;
			text-align: center;
			font-size: 10rpx;
			width: 22rpx;
			height: 22rpx;
			border-radius: 50%;
			display: inline-block;
			color: #5241ff;
			background: #f5f6f7;
			margin-top: -15rpx;
			font-style: italic;
		}
	}

	::-webkit-scrollbar {
		display: none // 去掉滚动条;
	}







	.noPersontips {
		width: 355rpx;
		position: relative;
		box-sizing: border-box;
		padding: 50rpx 10rpx 40rpx;
		background: #fff;

		.close-btn-panel {
			position: absolute;
			top: 0;
			color: #cacaca;
			font-size: 29rpx;
			width: 40rpx;
			text-align: center;
			line-height: 40rpx;
			height: 40rpx;
			right: 0;
		}

		.title-name {
			text-align: center;
			font-size: 16rpx;
			font-weight: 700;
		}

		.hint-info {
			text-align: justify;
			margin: 15rpx 0 50rpx;
			font-size: 14rpx;
		}

		.bom-btn-panel {
			background: #5241ff;
			color: #fff;
			border-radius: 4rpx;
			font-size: 15rpx;
			text-align: center;
			line-height: 40rpx;
		}

		.title-name-have {
			padding: 12rpx;
		}
	}

	.havePersontips {
		padding: 0;

		.bottom-btn {
			display: flex;
			border-top: 1rpx solid rgba(229, 229, 229, 1);

			.btn {
				flex: 1;
				text-align: center;
				line-height: 50rpx;
				font-size: 16rpx;
				color: #5241ff;
			}

			.btn:not(:first-child) {
				border-left: 1rpx solid rgba(229, 229, 229, 1);
			}
		}

		.content-person {
			padding: 12rpx;

			.items {
				display: flex;
				align-items: center;
				font-size: 15rpx;
				margin-bottom: 12rpx;

				.title {
					font-weight: 600;
				}

				.next-txt {
					font-size: 14rpx;
					color: #999;
				}

				.right {
					flex: 1;
					display: flex;
					justify-content: flex-end;
				}

				.item-con {
					flex: 1;
					margin-left: 12rpx;
					padding: 0 10rpx;
					line-height: 44rpx;
					border: 1rpx solid #d0d0d0;
					border-radius: 6rpx;
					display: flex;
					align-items: center;
					position: relative;

					.input {
						font-size: 15rpx;
						flex: 1;
						padding: 0;
						margin: 0;
						box-sizing: border-box;
						border: 0;
						margin-bottom: 0;
						line-height: 44rpx;
						outline: 0;
						background-color: #fff;
						appearance: none;
					}

					.icon {
						font-size: 16rpx;
						padding-left: 8rpx;
					}

					.main-text {
						flex: 1;
						width: 100%;
					}
				}
			}
		}
	}

	/***************/
	.person-list {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.title {
			text-align: center;
			border-bottom: 1rpx solid #e6e2e2;
			line-height: 50rpx;
			font-size: 16rpx;
		}

		.list-content {
			flex: 1;
			overflow-y: auto;
			padding-bottom: 10rpx;
			box-sizing: border-box;
			font-size: 15rpx;
			padding: 0 12rpx;

			.item {
				display: flex;
				line-height: 40rpx;
				border-bottom: 1rpx solid #f5f5f5;

				.person-name {
					display: inline-block;
					font-weight: 600;
					flex: 1;
				}

				.person-phone {
					font-size: 10rpx;
					color: #999;
				}
			}
		}

		.on-earth {
			text-align: center;
			color: #999;
			font-size: 10rpx;
			padding: 5rpx 0;
		}
	}
</style>