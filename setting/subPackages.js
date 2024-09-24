const subPackages = [
	{
		"root": "pages/subpackages/home",  // 首页包
		"pages": [
			{
				"path": "index",
				"name": "首页下的分包"
			},
			// 会员模块
			{
				"path": "member/index",
				"name": "会员列表"
			},
			{
				"path": "member/search",
				"name": "会员搜索"
			},
			{
				"path": "member/detail",
				"name": "会员详情"
			},
			{
				"path": "member/account",
				"name": "账户余币、余额"
			},
			// 抖音核销
			{
				"path": "douyinWriteOff/index",
				"name": "抖音核销"
			},
			{
				"path": "douyinWriteOff/children/meal",
				"name": "创建团购套餐"
			},
			{
				"path": "douyinWriteOff/children/mealDetail",
				"name": "团购套餐详情"
			},
			// 美团核销
			{
				"path": "meituanWriteOff/add",
				"name": "美团店铺"
			},
			// 售货机模块
			{
				"path": "shjModule/shjStock/index",
				"name": "缺货备货"
			},
			{
				"path": "shjModule/shjStock/detail",
				"name": "缺货备货详情"
			},
			{
				"path": "shjModule/shjAnalyse/index",
				"name": "数据分析"
			},
			{
				"path": "shjModule/shjReplenishment/index",
				"name": "补货管理"
			},
			{
				"path": "shjModule/shjReplenishment/replenishment",
				"name": "补货管理操作"
			},
			{
				"path": "shjModule/shjGrounding/index",
				"name": "商品上架"
			},
			{
				"path": "shjModule/shjClassify/index",
				"name": "商品分类"
			},
			{
				"path": "shjModule/shjParameter/index",
				"name": "机台参数设置列表"
			},
			{
				"path": "shjModule/shjCargoWay/index",
				"name": "货道管理"
			},
			{
				"path": "shjModule/shjBatchCopy/index",
				"name": "批量设备选择"
			},
			// 营销工具模块
			{
				"path": "marketingModule/index",
				"name": "营销工具"
			},
			{
				"path": "marketingModule/newUser/indexList/index",
				"name": "新用户特惠"
			},
			{
				"path": "marketingModule/newUser/activityDetail/index",
				"name": "新用户特惠详情"
			},
			{
				"path": "marketingModule/newUser/userList/index",
				"name": "新用户特惠参与详情"
			},
			{
				"path": "marketingModule/coupon/list/index",
				"name": "支付立减券"
			},
			{
				"path": "marketingModule/coupon/add/index",
				"name": "支付立减券操作"
			},
			{
				"path": "marketingModule/coupon/rule/index",
				"name": "支付立减券规则"
			},
			{
				"path": "marketingModule/random/list/index",
				"name": "随机立减券"
			},
			{
				"path": "marketingModule/random/detail/index",
				"name": "随机立减券详情"
			},
		]
	},
	{
		"root": "pages/subpackages/personal",  // 个人中心包
		"pages": [
			{
				"path": "brandMessage/index",
				"name": "品牌信息设置"
			},
			{
				"path": "noticeSet/index",
				"name": "通知设置"
			},
			{
				"path": "noticeSet/detail",
				"name": "接受消息的微信"
			},
			{
				"path": "placeService/index",
				"name": "客服设置"
			},
			{
				"path": "placeService/batch",
				"name": "客服操作"
			},
			{
				"path": "placeService/operate",
				"name": "场地客服设置"
			},
			// ===== 自带 =====
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
	},
	{
		"root": "pages/subpackages/merchant",  // 进件包
		"pages": [
			{
				"path": "dailyBill/index",
				"name": "每日账单"
			},
			{
				"path": "dailyBill/detail",
				"name": "每日账单详情"
			},
			{
				"path": "walletQuestion/index",
				"name": "钱包常见问题"
			},
			{
				"path": "bankCard/index",
				"name": "银行卡"
			},
			{
				"path": "merchantCA/index",
				"name": "商户认证"
			},
			{
				"path": "documentExample/index",
				"name": "证件示例"
			},
			{
				"path": "authentication/index",
				"name": "实名认证"
			},
			{
				"path": "authentication/detail",
				"name": "实名认证详情"
			},
			{
				"path": "frequentlyQuestion/index",
				"name": "实名认证常见问题"
			},
		]
	}
]

module.exports = subPackages
