<template>
	<view class="">
		<jy-navbar title="审核进度" bgColor="#5241ff" leftIconColor="#fff" titleStyle="color: #fff"></jy-navbar>
		<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="6" multiple :maxCount="1"
			width="250" height="150">
			<image src="https://cdn.uviewui.com/uview/demo/upload/positive.png" mode="widthFix"
				style="width: 250px;height: 150px;"></image>
		</u-upload>
		<image src="../../../static/xlsHome/five.svg" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: []
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style>
</style>