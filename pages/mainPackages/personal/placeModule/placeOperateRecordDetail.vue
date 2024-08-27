<template>
	<div class="operatingRecordDetail">
		<xls-jy-navbar title="操作详情" bgColor="#5241FF" titleStyle="color: #fff"></xls-jy-navbar>
		<div class="bg"></div>
		<div class="detail-content">
			<div class="update-details">
				<div class="top-title" v-show="$route.query.fromType == 0">
					<span class="details-type add" :class="[getClassType]">{{recordDetail.operationType == 1
                ? '新增分账人'
                : recordDetail.operationType == 2
                ? '编辑分账人'
                : '删除分账人'}}</span>
					<span class="subs">操作已完成</span>
				</div>
				<div class="top-title" v-show="$route.query.fromType == 1">
					<span class="details-type add" :class="[getClassType]">
						{{recordDetail.operationType == 1?'新增场地':recordDetail.operationType==2?'编辑场地':'删除场地'}}
					</span>
					<span class="subs">操作已完成</span>
				</div>
				<!-- 操作类型 1添加，2修改，3删除 -->
				<div class="update-details-content bgAdd" :class="[getOperateType]">
					<div class="update-after">
						<div class="left-tips">
							<!-- <img src="@/assets/place_image/suc.png" alt="" class="sub-img" /> -->
							<div class="line"></div>
						</div>
						<div class="right-main">
							<div class="title"><span>更新后</span></div>
							<div class="bottom">
								<div class="label-value" v-for="(value, key, index) of recordDetail.operationTextMap"
									:key="index">
									<span class="label">{{ key }}</span>
									<span class="value">{{ value }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="update-before">
						<div class="left">
							<span class="cicle"></span> <span class="occupied line"></span>
						</div>
						<div class="right">
							<div class="title">
								<span>更新前:</span>
								<span class="title-subs" v-show="!recordDetail.operationBeforeTextMap">无</span>
							</div>
							<div class="bottom">
								<div class="label-value"
									v-for="(value, key, index) of recordDetail.operationBeforeTextMap" :key="index">
									<span class="label">{{ key }}</span>
									<span class="value">{{ value }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="opreation-info">
				<div class="top">操作信息</div>
				<div class="bottom">
					<div class="label-value">
						<span class="label">场地ID</span>
						<span class="value">{{ recordDetail.placeId }}</span>
					</div>
					<div class="label-value">
						<span class="label">场地名称</span>
						<span class="value">{{ recordDetail.placeName }}</span>
					</div>
					<div class="label-value">
						<span class="label">操作时间</span>
						<span class="value">{{ recordDetail.operationTime }}</span>
					</div>
					<div class="label-value">
						<span class="label">操作人</span>
						<span class="value">{{ recordDetail.operationName }}</span>
					</div>
					<!-- <div class="label-value"><span class="label">网络IP</span> <span class="value">{{recordDetail.placeId}}</span></div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import {
	// 	getPlaceLogDetail
	// } from "@/utils/api/place";
	// import {
	// 	getSeparateBillsLogDetail
	// } from "@/utils/api/separateBills";

	export default {
		name: "operatingRecordDetail",
		data() {
			return {
				recordDetail: {},
			};
		},
		// async created() {
		// 	let id = this.$route.query.id;
		// 	let res;
		// 	if (this.$route.query.fromType == 1) {
		// 		res = await getPlaceLogDetail({
		// 			id
		// 		});
		// 	} else if (this.$route.query.fromType == 0) {
		// 		res = await getSeparateBillsLogDetail({
		// 			id
		// 		});
		// 	}
		// 	if (res.data.code == 0 || res.data.msg == "ok") {
		// 		this.recordDetail = res.data.data;
		// 	}
		// },
		computed: {
			getClassType() {
				return this.recordDetail.operationType == 1 ?
					'add' :
					this.recordDetail.operationType == 2 ?
					'edit' :
					'delete';
			},
			getOperateType() {
				return this.recordDetail.operationType == 1 ?
					'bgAdd' :
					this.recordDetail.operationType == 2 ?
					'bgEdit' :
					'bgDelete'
			}
		},
		methods: {

		}
	};
</script>

<style lang="scss" scoped>
	.operatingRecordDetail {
		width: 100%;
		height: 100vh;
		position: relative;
		overflow: scroll;
		font-family: PingFangSC, PingFangSC-Regular;
	}

	.bg {
		background-color: #5241FF;
		border-radius: 0 0 50% 50%;
		height: 140px;
		left: -50%;
		position: relative;
		width: 200%;
	}

	.detail-content {
		padding: 0 12px;
		position: relative;
		top: -134px;

		.update-details {
			background: #fff;
			border-radius: 12px;
			min-height: 258px;
			padding: 0 12px;

			.top-title {
				align-items: center;
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				height: 46px;
				justify-content: space-between;

				.add {
					color: #15d193;
					font-size: 16px;
					font-weight: 700;
				}

				.edit {
					color: #3d93f0;
				}

				.delete {
					color: rgb(240, 81, 81);
				}

				.subs {
					color: #333;
					font-size: 12px;
					font-weight: 400;
					text-align: right;
				}
			}

			.update-details-content {
				padding: 12px 0;
				background-position: 100% 0;
				background-repeat: no-repeat;
				background-size: 64px 64px;

				.update-after {
					display: flex;

					.left-tips {
						align-items: center;
						display: flex;
						flex-direction: column;
						justify-content: center;
						position: relative;
						width: 20px;

						.sub-img {
							font-size: 20px;
							height: 20px;
							position: absolute;
							top: 0;
							width: 20px;
						}

						.line {
							background-image: linear-gradient(180deg,
									#e6e6e6 0,
									#e6e6e6 30%,
									transparent 50%);
							background-repeat: repeat-y;
							background-size: 70% 18px;
							flex: 1;
							position: relative;
							top: 22.5px;
							width: 2px;
						}
					}

					.right-main {
						flex: 1;
						margin-left: 8px;
						padding-bottom: 24px;

						.title {
							color: #333;
							font-family: PingFangSC, PingFangSC-Medium;
							font-size: 14px;
							font-weight: 700;
							line-height: 20px;
						}
					}
				}

				.update-before {
					display: flex;

					.left {
						margin-top: 6px;
						width: 20px;
						align-items: center;
						display: flex;
						flex-direction: column;
						justify-content: center;
						position: relative;

						.cicle {
							background: #e6e6e6;
							border-radius: 4px;
							height: 8px;
							opacity: 1;
							width: 8px;
						}

						.occupied {
							background-image: linear-gradient(180deg,
									#e6e6e6 0,
									#e6e6e6 30%,
									transparent 50%);
							background-repeat: repeat-y;
							background-size: 70% 18px;
							flex: 1;
							position: relative;
							top: 5px;
							width: 2px;
						}
					}

					.right {
						flex: 1;
						padding-bottom: 0;
						margin-left: 8px;

						.title {
							color: #999;
							font-size: 14px;
							font-weight: 700;
							line-height: 20px;

							.title-subs {
								margin-left: 8px;
							}
						}
					}
				}

				.bottom {
					margin-top: 8px;

					.label-value {
						display: flex;

						.label {
							color: #999;
							font-size: 13px;
							font-weight: 400;
							line-height: 18px;
							min-width: 57px;
						}

						.value {
							color: #333;
							font-size: 13px;
							font-weight: 400;
							line-height: 18px;
							margin-left: 8px;
						}
					}

					.label-value:not(:first-child) {
						margin-top: 6px;
					}
				}
			}

			// .bgAdd {
			// 	background-image: url("../../../../assets/place_image/add.png");
			// }

			// .bgDelete {
			// 	background-image: url("../../../../assets/place_image/delete.png");
			// }

			// .bgEdit {
			// 	background-image: url("../../../../assets/place_image/edit.png");
			// }
		}

		.opreation-info {
			background: #fff;
			border-radius: 12px;
			margin-top: 8px;
			padding: 12px 12px;

			.top {
				font-size: 14px;
				font-weight: 700;
				border-bottom: 1px solid #f5f5f5;
				color: #333;
				padding-bottom: 10px;
			}

			.bottom {
				padding: 12px 0;

				.label-value {
					align-items: center;
					display: flex;
					justify-content: space-between;

					.label {
						color: #999;
						font-size: 13px;
						font-weight: 400;
					}

					.value {
						color: #333;
						font-size: 13px;
						font-weight: 400;
					}
				}

				.label-value:not(:first-child) {
					margin-top: 10px;
				}
			}
		}
	}
</style>