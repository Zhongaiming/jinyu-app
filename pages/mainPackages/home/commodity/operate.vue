<template>
	<view class="xls-commodity-operate">
		<xls-jy-navbar title="添加商品"></xls-jy-navbar>
		<view class="xls-commodity-operate-form">
			<u--form :model="commodity" labelWidth="200" ref="commodityForm" :rules="rules">
				<view class="commodity-modul">
					<view class="form-title">
						<view class="left">基础信息配置</view>
						<view class="right">
							<!-- <u-icon name="trash" size="36" /> -->
							<!-- <span> 清空信息</span> -->
						</view>
					</view>
					<u-form-item label="商品名称" prop="commodityName" borderBottom required>
						<u--input placeholder="请输入" v-model="commodity.commodityName" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="商品类型" prop="commodityTypeId" borderBottom required>
						<xls-select v-model="commodity.commodityTypeId" ref="typeSelect"
							:value="commodity.commodityTypeId"></xls-select>
					</u-form-item>
					<u-form-item label="商品成本价" prop="costPrice" borderBottom required>
						<u--input placeholder="请输入" v-model="commodity.costPrice" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="建议零售价" prop="suggestRetailPrice" borderBottom required>
						<u--input placeholder="请输入" v-model="commodity.suggestRetailPrice" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="商品图片" borderBottom>
						<u-upload :previewFullImage="true" :fileList="image.commodityImgList" name="commodityImg"
							@afterRead="afterRead" @delete="deletePic" :maxCount="1" width="160"
							height="160"></u-upload>
					</u-form-item>
					<u-form-item label="商品描述" borderBottom>
						<u--textarea v-model="commodity.commodityDescribe" placeholder="请输入内容" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
							autoHeight></u--textarea>
					</u-form-item>
				</view>

				<view class="commodity-modul" v-if="detail">
					<view class="form-title">
						<view class="left">详细信息配置</view>
						<view class="right"></view>
					</view>
					<u-form-item label="商品编码" prop="commodityCode" borderBottom required>
						<u--input placeholder="请输入" v-model="commodity.commodityCode" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="商品条形码" prop="barCode" borderBottom required>
						<u--input placeholder="请输入" v-model="commodity.barCode" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="商品品牌" prop="brandId" borderBottom required>
						<xls-select v-model="commodity.brandId" ref="brandSelect"
							:value="commodity.brandId"></xls-select>
					</u-form-item>
					<u-form-item label="商品IP" prop="ipId" borderBottom required>
						<xls-select v-model="commodity.ipId" ref="ipSelect" :value="commodity.ipId"></xls-select>
					</u-form-item>
					<u-form-item label="商品规格" prop="commoditySpecificationsId" borderBottom required>
						<xls-select v-model="commodity.commoditySpecificationsId" ref="specificationSelect"
							:value="commodity.commoditySpecificationsId"></xls-select>
					</u-form-item>
					<u-form-item label="屏幕展示素材" borderBottom>
						<u-switch v-model="commodity.openSourceMaterial" active-color="#5241FF" size="50" />
					</u-form-item>
					<u-form-item borderBottom>
						<u-upload :previewFullImage="true" :fileList="image.specificationList" name="specification"
							@afterRead="afterRead" @delete="deletePic" :maxCount="5" width="160"
							height="160"></u-upload>
					</u-form-item>
				</view>
			</u--form>
		</view>
		<xls-p-botn @confirm="confirmMethod"></xls-p-botn>
		<xls-drag-button @clickBtn="clickBtn">{{ detail ? '精简':'详情' }}</xls-drag-button>
	</view>
</template>

<script>
	import {
		commodityController
	} from "@/api/index.js";
	import {
		uploadFilePromise
	} from "@/common/upload.js";
	import xlsPBotn from "./components/xls-pBotn";
	export default {
		components: {
			xlsPBotn
		},
		data() {
			return {
				//商品信息
				commodity: {
					barCode: "",
					brandId: "",
					commercial: "",
					commodityCode: "",
					commodityDescribe: "",
					commodityId: "",
					commodityImg: "",
					commodityName: "",
					commoditySourceMaterial: "",
					commoditySpecificationsId: "", // 屏幕展示素材(图片地址，最多五份，不同图片url用，分割开)
					commodityTypeId: "",
					commodityTypeName: "",
					costPrice: "",
					createTime: "",
					createUserId: "",
					ipId: "",
					openSourceMaterial: false, // 是否开启屏幕展示素材（0：关闭 1：开启），默认关闭
					suggestRetailPrice: "",
					updateTime: "",
					updateUserId: ""
				},
				placeholderStyle: "fontSize: 28rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx'
				},
				rules: {
					'commodityName': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'commodityTypeId': {
						type: 'number',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'costPrice': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'suggestRetailPrice': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					// 详情
					'commodityCode': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'barCode': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'brandId': {
						type: 'number',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'ipId': {
						type: 'number',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'commoditySpecificationsId': {
						type: 'number',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
				},
				image: {
					commodityImgList: [],
					specificationList: [],
				},
				detail: false,
			};
		},
		onLoad(option) {
			if (option.params != undefined) {
				const id = JSON.parse(option.params).id
				this.getCommodityView(id)
			}
			commodityController.getCommodityType({
				pageParam: {
					pageNum: 1,
					pageSize: 10000
				}
			}).then(res => {
				this.$refs.typeSelect.initialData(res.data.dataList);
			})
		},
		methods: {
			initialMethod() {
				commodityController.getSpecification({
					pageParam: {
						pageNum: 1,
						pageSize: 10000
					}
				}).then(res => {
					this.$refs.specificationSelect.initialData(res.data.dataList);
				})
				commodityController.getBrand({
					pageParam: {
						pageNum: 1,
						pageSize: 10000
					}
				}).then(res => {
					this.$refs.brandSelect.initialData(res.data.dataList);
				})
				commodityController.getIp({
					pageParam: {
						pageNum: 1,
						pageSize: 10000
					}
				}).then(res => {
					this.$refs.ipSelect.initialData(res.data.dataList);
				})
			},
			getCommodityView(id) {
				commodityController.getCommodityView({
					id
				}).then(res => {
					Object.assign(this.commodity, res.data);
					this.commodity.openSourceMaterial = this.commodity.openSourceMaterial == 1;
					if (this.commodity.commodityImg) {
						this.image.commodityImgList = this.updateList(this.image.commodityImgList, this.commodity
							.commodityImg);
					}
				})
			},
			updateList(list, url) {
				list = [];
				list.push({
					status: 'success', // uploading
					message: '上传成功', // 上传中
					url
				});
				return list;
			},
			clickBtn() {
				this.detail = !this.detail;
				this.initialMethod();
			},
			async afterRead(event) {
				const {
					file,
					index,
					name
				} = event;
				this.image[`${name}List`].push({
					...file,
					status: 'uploading',
					message: '上传中'
				})
				let res = await uploadFilePromise(file)
				this.image[`${name}List`] = []
				this.image[`${name}List`].push({
					status: 'success',
					message: '上传成功',
					url: res.data.downloadUri
				})
				this.commodity[`${name}`] = res.data.downloadUri;

			},
			deletePic(event) {
				const {
					file,
					index,
					name
				} = event;
				this.image[`${name}List`].splice(index, 1);
			},
			confirmMethod() {
				let params = JSON.parse(JSON.stringify(this.commodity));
				params.openSourceMaterial = params.openSourceMaterial ? 1 : 0;
				params.suggestRetailPrice *= 100;
				params.costPrice *= 100;
				this.$refs.commodityForm.validate().then(res => {
					commodityController.addCommodity({
						dto: params
					}).then(res => {
						this.$toast('校验通过')
						this.$goBack();
					})
				}).catch(errors => {
					this.$toast('请补全信息~')
				})
			},

		},
	};
</script>

<style lang="scss" scoped>
	.xls-commodity-operate {
		&-form {
			padding: 0 24rpx;

			.commodity-modul {
				padding: 24rpx;
				background-color: #fff;
				border-radius: 12rpx;
				margin-bottom: 24rpx;
			}
		}

		.form-title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 24rpx;

			.left {
				font-weight: 700;
			}

			.right {
				color: #5241ff;
				display: flex;
				align-items: center;
			}
		}
	}
</style>