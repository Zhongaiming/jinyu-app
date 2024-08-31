import http from '@/core/http/index.js'
import reqConfig from '@/core/config/reqConfig.js'
/**
 * url: 服务器上传地址
 * count: 最多可以选择的图片张数，默认9 (暂时只支持每次选1张)
 * sizeType: original 原图，compressed 压缩图，默认二者都有
 * sourceType: album 从相册选图，camera 使用相机，默认二者都有。
 * nameKey: 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 */
export function upload(url, asImage = true, count = 1, sizeType = [], sourceType = [], nameKey = 'uploadFile') {
	if (!url) {
		url = reqConfig.uploadUrl
	}
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			sizeType: sizeType,
			sourceType: sourceType,
			success: (res) => {
				http.upload(url, {
					params: {
						asImage
					},
					file: res.tempFiles[0],
					name: nameKey,
				}).then(res => {
					if (res.code === 200) {
						resolve(res.data)
					}
				})
			}
		})
	})
}


/**
 * 根据文件url获取文件名
 * @param url 文件url
 */
export function getFileName(url) {
	const num = url.lastIndexOf('/') + 1;
	let fileName = url.substring(num);
	//把参数和文件名分割开
	fileName = decodeURI(fileName.split('?')[0]);
	return fileName;
}


/**
 * 返回文件预览地址
 */
export function getPreviewUrl(url) {
	return reqConfig.baseUrl + url
}

import {
	getToken
} from '@/common/auth.js'
import {
	commonController
} from "@/api/index.js"
import axios from 'axios'
import {
	UploadRent
} from './axiosReq.js'
export function uploadFilePromise(file) {
	return new Promise((resolve, reject) => {
		const blobUrl = file.url
		const fileName = file.name
		fetch(blobUrl)
			.then(response => response.blob())
			.then(blob => {
				
				// 创建一个 File 对象
				const file = new File([blob], fileName, {
					type: blob.type
				});
				
				// const token = getToken();
				// axios({
				// 	url: 'http://8.138.24.164:659/upms/api/v1/common/upload/downloadOSS',
				// 	method: 'GET',
				// 	headers: {
				// 		"Authorization": token,
				// 		// "Content-Type": "application/json;charset=UTF-8",
				// 		// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				// 	},
				// 	params: {
				// 		filePath:''
				// 	}
				// }).then(res => {
				// 	console.log("filePath", res)
				// 	// if (res.data.code === 200) {
				// 	// 	resolve(res.data)
				// 	// }
				// })
				// return
				// blobToBase64(blob).then(res =>{
				// 	console.log("blobresres", res)
				// 	const token = getToken();
				// 	axios({
				// 		url: reqConfig.proxyUrl + '/upms/api/v1/common/upload/uploadByBase64',
				// 		method: 'POST',
				// 		headers: {
				// 			"Authorization": token,
				// 			// "Content-Type": "application/json;charset=UTF-8",
				// 			// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				// 		},
				// 		data: {
				// 			uploadDataDto: {
				// 				fileName: fileName,
				// 				originalFilename: fileName,
				// 				str: res
				// 			}
				// 		}
				// 	}).then(res => {
				// 		if (res.data.code === 200) {
				// 			resolve(res.data)
				// 		}
				// 	})
				// })

				let formdata = new FormData();
				formdata.append('uploadFile', file)
				formdata.append('asImage', true)
				const token = getToken();
				axios({
					url: reqConfig.proxyUrl + '/upms/api/v1/common/upload/upload',
					method: 'post',
					headers: {
						"Authorization": token,
					},
					data: formdata
				}).then(res => {
					if (res.data.code === 200) {
						resolve(res.data)
					}
				})


			// 你可以使用 File 对象， 例如上传到服务器或保存到本地
			// 	uni.uploadFile({
			// 		url: reqConfig.proxyUrl + '/upms/api/v1/common/upload/upload',
			// 		header: {
			// 			"Authorization": getToken(),
			// 		},
			// 		file: file,
			// 		name: "uploadFile",
			// 		formData: {
			// 			asImage: true
			// 		},
			// 		success: (res) => {
			// 			if (res.statusCode === 200) {
			// 				const result = JSON.parse(res.data)
			// 				if (result.code === 200) {
			// 					resolve(result)
			// 				}
			// 			}
			// 		},
			// 		fail: (err) => {
			// 			console.log("失败", err)
			// 		}
			// 	});
			
			})
			.catch(error => console.error('Error:', error));

	})
}

function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			const base64String = reader.result.split(',')[1]; // Extract base64 part
			resolve(base64String);
		};

		reader.onerror = reject; // Handle errors
		reader.readAsDataURL(blob); // Convert Blob to base64 data URL
	});
}