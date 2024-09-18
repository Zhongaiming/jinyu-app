const config = {
	baseUrl: '',
	uploadUrl: '/api/v1/common/upload/upload', // 上传接口
	whiteList: [
		'/api/v1/app/user/emailRegister',
		'/api/v1/app/user/emailForget',
		'/api/v1/app/user/doLogin',
		'/api/v1/app/user/emailLogin',
		'/api/v1/app/user/sendEmailCode',
		'/api/v1/app/user/emailForget'
	], // 请求地址白名单
}

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	config.baseUrl = 'http://8.138.24.164:659'
	config.proxyUrl = 'http://8.138.24.164:659'
	// config.baseUrl = 'https://apiv4.ztuwl.com'
	// config.proxyUrl = 'https://apiv4.ztuwl.com'
	// config.baseUrl = 'http://39vacm.natappfree.cc'
	// config.proxyUrl = 'http://39vacm.natappfree.cc'
	// config.baseUrl = 'https://xls.redorange.top'
	// config.proxyUrl = 'https://xls.redorange.top'
	// config.baseUrl = 'http://192.168.0.114:8006' // 潮
	// config.baseUrl = 'http://192.168.0.59:8006' // 畅
	// config.baseUrl = 'http://192.168.0.33:8006' // 健
} else {
	// 生产环境
	config.baseUrl = 'https://apiv4.ztuwl.com'
	config.proxyUrl = 'https://apiv4.ztuwl.com'
}


export default config