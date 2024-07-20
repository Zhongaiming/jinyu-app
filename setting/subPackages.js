const subPackages = [
	{
		"root": "pages/subpackages/home",  // 首页包
		"pages": [
			{
				"path": "index",
				"name": "首页下的分包"
			}
		]
	},
	{
		"root": "pages/subpackages/personal",  // 个人中心包
		"pages": [
			{
				"path": "setting/index",
				"name": "设置"
			},
			{
				"path": "setting/lang/index",
				"name": "多语言"
			},
			{
				"path": "setting/accountSecurity/index",
				"name": "账号与安全"
			},
			{
				"path": "setting/accountSecurity/nickname",
				"name": "修改昵称"
			},
			{
				"path": "setting/accountSecurity/updateEmail",
				"name": "修改邮箱地址"
			},
			{
				"path": "version/index",
				"name": "版本"
			},
			{
				"path": "aboutUs/index",
				"name": "关于我们"
			},
			{
				"path": "userTerms/index",
				"name": "用户条款"
			},
			{
				"path": "userTerms/termDetail",
				"name": "条款详情"
			},
			{
				"path": "version/updateLogs",
				"name": "更新日志"
			},
			{
				"path": "version/logsDetail",
				"name": "日志详情"
			}			
		]
	}
]

module.exports = subPackages
