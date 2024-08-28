<template>
	<view class="xls-place-operate">
		<xls-jy-navbar :title="`${place.id?'编辑':'添加'}场地`"></xls-jy-navbar>
		<view class="xls-place-operate-form">
			<u--form :model="place" labelWidth="200" ref="placeForm" :rules="rules">
				<view class="place-modul">
					<view class="form-title">
						<view class="left">基础信息配置</view>
						<view class="right">
							<!-- <u-icon name="trash" size="36" /> -->
							<!-- <span> 清空信息</span> -->
						</view>
					</view>
					<u-form-item label="场地名称" prop="placeName" borderBottom required>
						<u--input placeholder="请输入" v-model="place.placeName" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="场地类型" prop="placeTypeName" borderBottom required rightIcon="map-fill"
						@click="pickerPlaceType">
						<u--input placeholder="请输入" v-model="place.placeTypeName" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
							@focus="stopKeyborad"></u--input>
					</u-form-item>
					<u-form-item label="所在地区" prop="proCityRegion" borderBottom required @click="pickerAddressItem">
						<u--input placeholder="请输入" v-model="place.proCityRegion" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
							@focus="stopKeyborad"></u--input>
					</u-form-item>
					<u-form-item label="详细地址" prop="placeDetails" borderBottom required>
						<u--textarea v-model="place.placeDetails" placeholder="请输入内容" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"
							autoHeight></u--textarea>
					</u-form-item>
					<u-form-item label="设置默认场地" borderBottom>
						<u-switch v-model="place.wightState" active-color="#5241FF" size="50" />
					</u-form-item>
					<u-form-item label="场地图片" borderBottom>
						<u-upload :previewFullImage="true" :fileList="image.placeImgList" name="placeImg"
							@afterRead="afterRead" @delete="deletePic" :maxCount="1" width="160"
							height="160"></u-upload>
					</u-form-item>
				</view>

				<view class="place-modul" v-if="detail">
					<view class="form-title">
						<view class="left">详细信息配置</view>
						<view class="right"></view>
					</view>
					<u-form-item label="场地编码" prop="placeNumber" borderBottom required>
						<u--input placeholder="请输入" v-model="place.placeNumber" border="none"
							:placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle"></u--input>
					</u-form-item>
					<u-form-item label="场地区域" prop="placeAreaId" borderBottom required>
						<xls-select v-model="place.placeAreaId" ref="AreaSelect"
							:value="place.placeAreaId"></xls-select>
					</u-form-item>
					<u-form-item label="场地分类" prop="placeClassifyId" borderBottom required>
						<xls-select v-model="place.placeClassifyId" ref="ClassifySelect"
							:value="place.placeClassifyId"></xls-select>
					</u-form-item>
					<u-form-item label="场地组别" prop="placeGroupId" borderBottom required>
						<xls-select v-model="place.placeGroupId" ref="GroupSelect"
							:value="place.placeGroupId"></xls-select>
					</u-form-item>
				</view>
			</u--form>
		</view>
		<xls-p-botn @goTo="confirmMethod" text="保存"></xls-p-botn>
		<xls-drag-button @clickBtn="clickBtn">{{ detail ? '精简':'详情' }}</xls-drag-button>
		<xls-area-picker @getAreaMethod="getAreaMethod" ref="xlsArea"></xls-area-picker>
		<xls-place-type-vue @confirm="getPlaceTypeMethod" :value="place.placeTypeId"
			ref="placeType"></xls-place-type-vue>
	</view>
</template>

<script>
	import {
		placeController
	} from "@/api/index.js";
	import {
		uploadFilePromise
	} from "@/common/upload.js";
	import xlsPBotn from "./components/xls-pBotn";
	import xlsPlaceTypeVue from "./components/xls-place-type.vue";
	export default {
		components: {
			xlsPBotn,
			xlsPlaceTypeVue,
		},
		data() {
			return {
				//场地信息
				place: {
					id: null,
					placeName: "",
					placeTypeId: 0,
					placeTypeName: "",
					province: "",
					city: "",
					region: "",
					proCityRegion: "",
					placeDetails: "",
					wight: 0,
					wightState: false,
					placeImg: "",
					// 详细版
					placeNumber: "",
					placeAreaId: 0,
					placeClassifyId: 0,
					placeGroupId: 0,
				},
				placeholderStyle: "fontSize: 28rpx;opacity: .7",
				prefixIconStyle: {
					fontSize: '35rpx',
					padding: '0'
				},
				rules: {
					'placeName': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'placeTypeName': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['change', 'blur']
					},
					'proCityRegion': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['change']
					},
					'placeDetails': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					// 详情
					'placeNumber': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur']
					},
					'placeAreaId': {
						type: 'number',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'placeClassifyId': {
						type: 'number',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'placeGroupId': {
						type: 'number',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
				},
				image: {
					placeImgList: [],
				},
				detail: false,
			};
		},
		onLoad(option) {
			if (option.params != undefined) {
				const id = JSON.parse(option.params).placeId;
				if (id) this.getplaceView(id)
			}
		},
		onReady() {
			// #ifdef MP
			this.$refs.placeForm.setRules(this.rules)
			// #endif
		},
		methods: {
			stopKeyborad() {
				uni.hideKeyboard();
			},
			clickBtn() {
				this.detail = !this.detail;
				this.initialMethod();
			},
			initialMethod() {
				placeController.getAllArea().then(res => {
					this.$refs.AreaSelect.initialData(res.data);
				})
				placeController.getAllClassify().then(res => {
					this.$refs.ClassifySelect.initialData(res.data);
				})
				placeController.getAllGroup().then(res => {
					this.$refs.GroupSelect.initialData(res.data);
				})
			},
			getplaceView(id) {
				placeController.getPlaceById({
					placeId: id
				}).then(res => {
					Object.assign(this.place, res.data);
					const place = this.place;
					this.place.wightState = place.wight == 1;
					this.place.proCityRegion = `${place.province} ${place.city} ${place.region}`
					if (place.placeImg) {
						this.image.placeImgList = this.updateList(this.image.placeImgList, place.placeImg);
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
				this.place[`${name}`] = res.data.downloadUri;

			},
			deletePic(event) {
				const {
					file,
					index,
					name
				} = event;
				this.image[`${name}List`].splice(index, 1);
				this.place[`${name}`] = "";
			},
			confirmMethod() {
				let params = JSON.parse(JSON.stringify(this.place));
				params.wight = params.wightState ? 1 : 0;
				this.$refs.placeForm.validate().then(() => {
					placeController[`${params.id?'edit':'add'}Place`](params).then(res => {
						if(res.code === 200) {
							this.$toast('校验通过')
							this.$goBack();
						}
					})
				}).catch(errors => {
					this.$toast('请补全信息~')
				})
			},
			getAreaMethod(params) {
				const {
					columnIndex,
					value,
					values
				} = params
				this.place.proCityRegion = value
					.map((option) => option.addressNames)
					.join(" ");
				this.place.province = value[0].addressNames;
				this.place.city = value[1].addressNames;
				this.place.region = value[2].addressNames;
			},
			pickerAddressItem() {
				this.$refs.xlsArea.pickerAddressItem();
			},
			pickerPlaceType() {
				this.$refs.placeType.showPlaceType = true;
			},
			getPlaceTypeMethod(params) {
				this.place.placeTypeId = params.id;
				this.place.placeTypeName = params.name;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.xls-place-operate {
		&-form {
			padding: 0 24rpx;

			.place-modul {
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