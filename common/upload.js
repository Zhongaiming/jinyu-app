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
import { compress } from "@/plugins/imageZip";

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
				compress(file, 3.5, 2048).then(res => {
				
					let formdata = new FormData();
					formdata.append('uploadFile', res)
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
				})
			
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


export async function blobUrlToBase64(blobUrl) {
    try {
        // Fetch the Blob from the URL
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        // Create a FileReader to convert Blob to Base64
        const reader = new FileReader();

        // Convert Blob to Base64
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract base64 part
                resolve(base64String);
            };

            reader.onerror = reject; // Handle errors
            reader.readAsDataURL(blob); // Convert Blob to base64 data URL
        });
    } catch (error) {
        console.error('Error:', error);
    }
}