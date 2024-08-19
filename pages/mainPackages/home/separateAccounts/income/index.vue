<template>
	<z-paging ref="sPersonPaging" v-model="dataList" @query="queryList">
		<view slot="top">
			<xls-jy-navbar title="收益分成查询"></xls-jy-navbar>
			<xls-search placeholder="输入名字/电话搜索" marLeft="-6.5em" @confirm="searchMethod"></xls-search>
			<view class="top-wrapper">
				<view class="title-name">
					分成人员管理<u-icon name="question-o" size="18" color="#797979" class="icon" @click="questionTips" />
				</view>
				<view class="add-person-btn" @click="pickerPerson = !pickerPerson">
					+ 添加人员
				</view>
			</view>
		</view>

		<view class="person-list">
			<view class="person-item" v-for="(people, index) in dataList" :key="index">
				<view class="row">
					<view class="flex-left">
						<span class="name">{{ people.nickName }}</span>
						<span class="tel">({{ people.username }})</span>
					</view>
					<span class="s-del-btn" @click="deletePerson(people.id)">删除</span>
				</view>
				<view class="row">
					<view class="flex">
						<span class="name">商户号</span>
					</view>
					<view class="right-number text-over">
						{{ people.accountCommercialNumber }}
					</view>
				</view>
				<view class="row">
					<view class="flex">
						<span class="name">分账账号(E码)</span>
					</view>
					<view class="right-number text-over">{{ people.accountNumber }}</view>
				</view>
				<view class="row">
					<view class="flex-left">
						<span class="name">分成场地</span>
					</view>
					<view class="right-txt" @click="readPersonPlace(people.id)">
						{{ people.placeNum }}个<u-icon name="arrow" size="18" color="#999" />
					</view>
				</view>
			</view>
			<xls-empty slot="empty"></xls-empty>
		</view>

		<!-- 查找分账人 -->
		<u-popup v-model="pickerPerson" round>
			<view class="picker-person">
				<view class="title-name">添加分成人员</view>
				<view class="info-panel">
					<view class="ipt-title"><span class="red-tips">*</span>手机号码</view>
					<view class="search-box">
						<input maxlength="11" class="input" type="tel" placeholder="请输入手机号" v-model="personPhone" />
						<view class="search-btn" @click="checkPerson">查询</view>
					</view>
				</view>
				<view class="person-info" v-show="showCheckPerson">
					<p>* 温馨提示：</p>
					<p class="txt">
						确定添加姓名为：
						<span style="color: #5241ff">{{ checkInfo.nickName }}</span>
						手机号码为：<span style="color: #5241ff">{{
		          checkInfo.userPhone
		        }}</span>
						的用户为分账人吗？
					</p>
				</view>
				<view class="bom-btn-panel">
					<view class="btn cancel-btn" @click="pickerPerson = !pickerPerson">
						取消
					</view>
					<view class="btn s-save-btn" @click="addPerson">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 分账人管理场地 -->
		<u-popup v-model="personPlace" :style="{ height: '60%' }" position="bottom">
			<view class="place-warpper">
				<view class="title">
					分账场地
					<span style="float: right" @click="personPlace = false">关闭</span>
				</view>
				<view class="place-content">
					<u-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getPersonPlace"
						v-if="placeList.length">
						<u-cell v-for="(item, index) in placeList" :key="index" :title="item.placeName"
							:value="`${item.proportion} %`" />
					</u-list>
					<no-data v-else />
				</view>
			</view>
		</u-popup>
	</z-paging>
</template>

<script>
	import {
		separateController
	} from '@/api/index.js';
	export default {
		data() {
			return {
				dataList: [],
			}
		},
		methods: {
			searchMethod() {

			},
			queryList(pageNo, pageSize) {
				separateController.getSeparatePerson({
					pageParam: {
						pageNum: pageNo,
						pageSize: pageSize
					}
				}).then(res => {
					this.$refs.sPersonPaging.complete(res.data.dataList);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top-wrapper {
		padding: 0 10px;
		display: flex;
		font-size: 15px;
		line-height: 40px;

		.title-name {
			flex: 1;
			display: flex;
			align-items: center;

			.icon {
				margin-left: 5px;
			}
		}

		.add-person-btn {
			color: #5241ff;
		}
	}

	.person-list {
		flex: 1;
		overflow-y: scroll;

		.person-item {
			padding: 0 10px;
			margin-bottom: 10px;
			border-bottom: 1px solid #ebeceb;
			background-color: #fff;

			.row {
				line-height: 45px;
				position: relative;
				display: flex;
			}

			.row:not(:last-child) {
				border-bottom: 1px solid #f5f6f7;
			}

			.flex-left {
				flex: 1;
				margin-right: 10px;
				display: flex;
				align-items: center;
			}

			.s-del-btn {
				width: 54px;
				height: 28px;
				text-align: center;
				line-height: 28px;
				border: 1px solid #d0d0d0;
				margin: 8px 0;
				border-radius: 4px;
				-webkit-border-radius: 4px;
			}

			.name {
				font-weight: 500;
				display: inline-block;
				height: 100%;
				vertical-align: middle;
				// flex: 1;
				max-width: 150px;
				// min-width: 70px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				margin-right: 5px;
			}

			.tel {
				color: #999;
				font-size: 12px;
			}

			.right-txt {
				display: flex;
				align-items: center;
				max-width: 150px;
			}

			.right-number {
				flex: 1;
				text-align: right;
			}
		}
	}

	.picker-person {
		width: 320px;
		box-sizing: border-box;

		.title-name {
			color: #1b1b1b;
			margin-top: 15px;
			margin-bottom: 20px;
			text-align: center;
			font-size: 18px;
			font-weight: 700;
		}

		.bom-btn-panel {
			border-top: 1px solid #dedede;
			display: flex;
			text-align: center;

			.btn {
				font-size: 16px;
				flex: 1;
				line-height: 50px;
				color: #676767;
			}

			.s-save-btn {
				color: #5241ff;
				border-left: 1px solid #dedede;
			}
		}

		.info-panel {
			padding: 0 12px 12px;

			.ipt-title {
				font-weight: 700;
				margin-bottom: 10px;
			}

			.red-tips {
				color: red;
				margin-right: 5px;
			}

			.search-box {
				display: flex;
				align-items: center;
				padding-left: 20px;
				width: 100%;
				box-sizing: border-box;

				.input {
					font-size: 15px;
					flex: 1;
					padding: 0 10px;
					margin: 0 8px;
					border: 1px solid #d0d0d0;
					margin-bottom: 0;
					border-radius: 3px;
					line-height: 40px;
					outline: 0;
					background-color: #fff;
					appearance: none;
					box-sizing: border-box;
				}

				.search-btn {
					padding: 5px 10px;
					background: #5241ff;
					color: #fff;
					font-size: 14px;
					border-radius: 4px;
					white-space: nowrap;
				}

				.search-btn:active {
					opacity: 0.7;
				}
			}
		}

		.person-info {
			padding: 0 12px 24px;
			color: #8c8c8c;
			font-size: 14px;

			.txt {
				padding-left: 20px;
				line-height: 24px;
				text-align: center;
			}
		}
	}

	.place-warpper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.title {
			line-height: 50px;
			text-align: center;
			border-bottom: 1px solid rgb(228, 225, 225);
			padding: 0 12px;
		}

		.place-content {
			flex: 1;
			overflow-y: scroll;
		}
	}
</style>