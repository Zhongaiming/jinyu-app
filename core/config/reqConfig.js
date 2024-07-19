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
	] ,// 请求地址白名单
}

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // config.baseUrl = '/xls'
		config.baseUrl = 'http://tianan.st88168.top:825'
}else{
    // 生产环境
    // config.baseUrl = 'http://192.168.0.106:808'
		config.baseUrl = 'http://tianan.st88168.top:825'
}


export default config