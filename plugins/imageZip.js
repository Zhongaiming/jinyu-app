/**
 * 图片压缩
 * @file 图片文件
 * @size M 图片大小
 * 2022-12-30
 */
// import { Toast } from 'vant';
import suan from './floastCalculate';
var i = 0.92;


export const compress = (file, size = 2, imgWidth = 512) => {
	return new Promise(async (resolve, reject) => {
		i = 0.92;
		const uploadTypes = ['jpg', 'png', 'jpeg'];
		const filetype = file.name.replace(/.+\./, '');
		if (uploadTypes.indexOf(filetype.toLowerCase()) === -1) {
			// Toast('仅支持jpg, png, jpeg格式的图片')
			return;
		}
		let image = new Image();
		image.src = await getBase64(file);
		// Toast.loading({
		//     message: "处理中...",
		//     forbidClick: true,
		//     duration: 0
		// })
		image.onload = () => {
			compressUpload(image, file, imgWidth, size).then(res => {
				resolve(res);
				// Toast.clear();
			})
		}
		image.onerror = () => {
			reject(new Error("Failed to read file"));
		}
	})
}


/* 递归 调整大小 调整尺寸 */
function compressUpload(image, file, imgWidth, size) {
	return new Promise((resolve, reject) => {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		let {
			width
		} = image, {
			height
		} = image
		if (width > imgWidth) {
			canvas.width = imgWidth
			canvas.height = height * (imgWidth / width)
		} else {
			canvas.width = width
			canvas.height = height
		}

		// //绘制一个填充矩形
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		//将图片画在画布上
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		i = suan.subFloast(i, 0.01); // 0.7据说是最优压缩值 默认 0.92

		// 图像数据转换为Base64编码的数据URL字符串
		let base64 = canvas.toDataURL('image/jpeg', Number(i.toFixed(2)));

		// 注意：用var oldSize = base64.length/1024来表示图片的大小，
		// 会比图片实际尺寸大1/4，即oldSize*3/4后才是图片的实际尺寸（略有误差）。

		if (getBase64Size(base64) < size * 1024 * 1024 || i <= 0) {
			let blobImg = dataURLtoFile(base64, file.name.split('.')[0] + '.jpeg');
			resolve(blobImg);
		} else {
			// 定时器函数（requestAnimationFrame 或 setTimeout）
			// resolve(compressUpload(image, file, imgWidth, size));
			// requestAnimationFrame(resolve(compressUpload(image, file, imgWidth, size)));
			// resolve(compressUpload(image, file, imgWidth, size));
			// 递归阻塞 注意深度
			requestAnimationFrame(() => {
				resolve(compressUpload(image, file, imgWidth, size));
			})
		}
	})
}


// 将base64转换为file文件
const dataURLtoFile = (base64, filename) => {
	let arr = base64.split(',')
	let mime = arr[0].match(/:(.*?);/)[1]
	let bstr = atob(arr[1])
	let n = bstr.length
	let u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], filename, {
		type: mime
	})
}

/* base64转Blob对象 */
function dataURItoBlob(data) {
	let byteString;
	if (data.split(',')[0].indexOf('base64') >= 0) {
		byteString = atob(data.split(',')[1])
	} else {
		byteString = unescape(data.split(',')[1])
	}
	let mimeString = data
		.split(',')[0]
		.split(':')[1]
		.split(';')[0];
	let ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i += 1) {
		ia[i] = byteString.charCodeAt(i)
	}
	return new Blob([ia], {
		type: mimeString
	})
}

//获取base64字符的大小
function getBase64Size(base64) {
	if (base64) {
		// 获取base64图片byte大小
		base64 = base64.split(",")[1].split("=")[0];
		var strLength = base64.length;
		var fileLength = strLength - (strLength / 8) * 2;
		return Math.floor(fileLength); // 向下取整
	} else {
		return null
	}
}

//file 转 base64
function getBase64(file) {
	return new Promise(function(resolve, reject) {
		let reader = new FileReader();
		let imgResult = "";
		reader.readAsDataURL(file);
		reader.onload = function() {
			imgResult = reader.result;
		}
		reader.onerror = function(error) {
			reject(error);
		}
		reader.onloadend = function() {
			resolve(imgResult);
		}
	})
}