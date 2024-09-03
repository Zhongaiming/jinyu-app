const pages = [{
		"path": "pages/loginAndReg/xlsLogin",
		"name": "loginIndex",
		"meta": {
			"title": "xls登录"
		}
	},
	{
		"path": "pages/loginAndReg/xlsRegister",
		"name": "registerIndex",
		"meta": {
			"title": "xls注册"
		}
	},
	{
		"path": "pages/loginAndReg/userAccount",
		"name": "userAccount",
		"meta": {
			"title": "xls账号切换"
		}
	},
	// ===== 首页 ======
	{
		"path": "pages/mainPackages/home/order/index",
		"name": "Order",
		"meta": {
			"title": "订单"
		}
	},
	{
		"path": "pages/mainPackages/home/order/orderDetail",
		"name": "orderDetail",
		"meta": {
			"title": "订单详情"
		}
	},
	{
		"path": "pages/mainPackages/home/order/orderRefund",
		"name": "orderRefund",
		"meta": {
			"title": "订单退款"
		}
	},
	{
		"path": "pages/mainPackages/home/order/refundDetail",
		"name": "orderRefundDetail",
		"meta": {
			"title": "退款详情"
		}
	},
	// ====
	{
		"path": "pages/mainPackages/home/todayEarning/index",
		"name": "todayEarning",
		"meta": {
			"title": "今日收益"
		}
	},
	{
		"path": "pages/mainPackages/home/todayEarning/earnDetail",
		"name": "todayEarningDetail",
		"meta": {
			"title": "今日收益详情"
		}
	},
	{
		"path": "pages/mainPackages/home/comeGift/index",
		"name": "comeGift",
		"meta": {
			"title": "出礼统计"
		}
	},
	{
		"path": "pages/mainPackages/home/insertCoins/index",
		"name": "insertCoins",
		"meta": {
			"title": "合计投币"
		}
	},
	// 设备模块
	{
		"path": "pages/mainPackages/home/deviceModule/index",
		"name": "deviceModuleList",
		"meta": {
			"title": "商户设备"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/children/deviceParamSet",
		"name": "deviceParamSet",
		"meta": {
			"title": "设备参数设置"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/children/paramSetDetail",
		"name": "paramSetDetail",
		"meta": {
			"title": "设备参数设置详情"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/children/deviceShiftPage",
		"name": "deviceShiftPage",
		"meta": {
			"title": "设备转移"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/children/deviceOnlineRecord",
		"name": "deviceOnlineRecord",
		"meta": {
			"title": "设备在线离线记录"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/deviceFault",
		"name": "deviceModuleFault",
		"meta": {
			"title": "设备故障"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/deviceBind",
		"name": "deviceModuleBinding",
		"meta": {
			"title": "设备绑定"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/deviceBinded",
		"name": "deviceModuleBinding",
		"meta": {
			"title": "设备已绑定"
		}
	},
	{
		"path": "pages/mainPackages/home/deviceModule/deviceBinding",
		"name": "deviceModuleBinding",
		"meta": {
			"title": "设备未绑定"
		}
	},
	// 经营统计模块
	{
		"path": "pages/mainPackages/home/operateModule/index",
		"name": "operateModuleList",
		"meta": {
			"title": "商户经营统计"
		}
	},
	{
		"path": "pages/mainPackages/home/operateModule/trend",
		"name": "operateModuleTrend",
		"meta": {
			"title": "近30天场地收益趋势"
		}
	},
	{
		"path": "pages/mainPackages/home/operateModule/detail",
		"name": "operateModuleDetail",
		"meta": {
			"title": "场地收益详情"
		}
	},
	{
		"path": "pages/mainPackages/home/operateModule/classify",
		"name": "operateModuleDetail",
		"meta": {
			"title": "查看收益分类统计"
		}
	},
	// 套餐设置
	{
		"path": "pages/mainPackages/home/packageModule/index",
		"name": "packageModule",
		"meta": {
			"title": "套餐设置"
		}
	},
	{
		"path": "pages/mainPackages/home/packageModule/packageOperate",
		"name": "packageOperate",
		"meta": {
			"title": "修改充值套餐"
		}
	},
	// 远程启动
	{
		"path": "pages/mainPackages/home/remote/index",
		"name": "remoteDevice",
		"meta": {
			"title": "远程启动"
		}
	},
	{
		"path": "pages/mainPackages/home/remote/operate",
		"name": "remoteDevice",
		"meta": {
			"title": "操作远程启动"
		}
	},
	{
		"path": "pages/mainPackages/home/remote/record",
		"name": "remoteRecord",
		"meta": {
			"title": "远程启动记录"
		}
	},
	// 营销工具
	{
		"path": "pages/mainPackages/home/marketingModule/index",
		"name": "marketingModule",
		"meta": {
			"title": "营销工具"
		}
	},
	{
		"path": "pages/mainPackages/home/marketingModule/rule/index",
		"name": "marketingModuleRule",
		"meta": {
			"title": "营销工具规则"
		}
	},
	// 新用户
	{
		"path": "pages/mainPackages/home/marketingModule/newUser/index",
		"name": "marketingModuleNewUser",
		"meta": {
			"title": "营销工具新用户"
		}
	},
	{
		"path": "pages/mainPackages/home/marketingModule/newUser/operate",
		"name": "marketingModuleNewUserOperate",
		"meta": {
			"title": "营销工具新用户操作"
		}
	},
	// 随机立减
	{
		"path": "pages/mainPackages/home/marketingModule/random/index",
		"name": "marketingModuleRandom",
		"meta": {
			"title": "营销工具随机立减"
		}
	},
	{
		"path": "pages/mainPackages/home/marketingModule/random/operate",
		"name": "marketingModuleRandomOperate",
		"meta": {
			"title": "营销工具随机立减操作"
		}
	},
	// 立减券
	{
		"path": "pages/mainPackages/home/marketingModule/coupon/index",
		"name": "marketingModuleCoupon",
		"meta": {
			"title": "营销工具立减券"
		}
	},
	{
		"path": "pages/mainPackages/home/marketingModule/coupon/operate",
		"name": "marketingModuleCouponOperate",
		"meta": {
			"title": "营销工具立减券操作"
		}
	},
	// 出货统计、出礼统计
	{
		"path": "pages/mainPackages/home/shipmentStatistics/index",
		"name": "shipmentStatistics",
		"meta": {
			"title": "出货统计/出礼统计"
		}
	},
	// 商品管理
	{
		"path": "pages/mainPackages/home/commodity/shjCommodity",
		"name": "shjCommodity",
		"meta": {
			"title": "商品管理"
		}
	},
	{
		"path": "pages/mainPackages/home/commodity/shjCommodityOperate",
		"name": "shjCommodityOperate",
		"meta": {
			"title": "操作商品"
		}
	},
	{
		"path": "pages/mainPackages/home/commodity/index",
		"name": "Commodity",
		"meta": {
			"title": "商品管理"
		}
	},
	{
		"path": "pages/mainPackages/home/commodity/operate",
		"name": "CommodityOperate",
		"meta": {
			"title": "操作商品"
		}
	},
	// 扭蛋机数据
	{
		"path": "pages/mainPackages/home/ndjData/index",
		"name": "ndjData",
		"meta": {
			"title": "扭蛋机数据"
		}
	},
	// 兑币机数据
	{
		"path": "pages/mainPackages/home/dbjData/index",
		"name": "dbjData",
		"meta": {
			"title": "兑币机数据"
		}
	},
	// 自动分账
	{
		"path": "pages/mainPackages/home/separateAccounts/index",
		"name": "separateAccounts",
		"meta": {
			"title": "自动分账"
		}
	},
	{
		"path": "pages/mainPackages/home/separateAccounts/person/index",
		"name": "SeparatePerson",
		"meta": {
			"title": "分账人员"
		}
	},
	{
		"path": "pages/mainPackages/home/separateAccounts/setup/index",
		"name": "SeparateSetup",
		"meta": {
			"title": "场地分账设置"
		}
	},
	{
		"path": "pages/mainPackages/home/separateAccounts/setup/detail",
		"name": "SeparateSetupDetail",
		"meta": {
			"title": "场地分账设置详情"
		}
	},
	{
		"path": "pages/mainPackages/home/separateAccounts/record/index",
		"name": "SeparateSetupLog",
		"meta": {
			"title": "场地分账设置记录"
		}
	},
	{
		"path": "pages/mainPackages/home/separateAccounts/record/detail",
		"name": "SeparateSetup",
		"meta": {
			"title": "场地分账设置记录详情"
		}
	},
	{
		"path": "pages/mainPackages/home/separateAccounts/income/index",
		"name": "SeparateIncome",
		"meta": {
			"title": "分账统计"
		}
	},
	{
		"path": "pages/mainPackages/home/separateAccounts/income/detail",
		"name": "SeparateIncomeDetail",
		"meta": {
			"title": "分账统计详情"
		}
	},
	// 申诉反馈
	{
		"path": "pages/mainPackages/home/appealFeedback/index",
		"name": "appealFeedback",
		"meta": {
			"title": "申诉反馈"
		}
	},
	{
		"path": "pages/mainPackages/home/appealFeedback/detail",
		"name": "appealFeedbackDetail",
		"meta": {
			"title": "申诉反馈详情"
		}
	},
	// 黑名单管理
	{
		"path": "pages/mainPackages/home/blacklist/index",
		"name": "blacklist",
		"meta": {
			"title": "黑名单管理"
		}
	},
	{
		"path": "pages/mainPackages/home/blacklist/record",
		"name": "blacklistRecord",
		"meta": {
			"title": "黑名单管理记录"
		}
	},
	// ======= 我的 =======
	{
		"path": "pages/mainPackages/personal/commodityType/index",
		"name": "commodityType",
		"meta": {
			"title": "商品类型"
		}
	},
	{
		"path": "pages/mainPackages/personal/handleRecord/index",
		"name": "handleRecord",
		"meta": {
			"title": "操作记录"
		}
	},
	{
		"path": "pages/mainPackages/personal/replenishmentRecord/index",
		"name": "replenishmentRecord",
		"meta": {
			"title": "补货记录"
		}
	},
	{
		"path": "pages/mainPackages/personal/placeModule/index",
		"name": "placeModule",
		"meta": {
			"title": "商户场地"
		}
	},
	{
		"path": "pages/mainPackages/personal/placeModule/placeOperate",
		"name": "placeModuleOperate",
		"meta": {
			"title": "操作场地"
		}
	},
	{
		"path": "pages/mainPackages/personal/placeConfigure/index",
		"name": "placeConfigure",
		"meta": {
			"title": "场地配置信息"
		}
	},
	{
		"path": "pages/mainPackages/personal/placeModule/placeOperateRecord",
		"name": "placeModuleRecord",
		"meta": {
			"title": "操作记录"
		}
	},
	{
		"path": "pages/mainPackages/personal/placeModule/placeOperateRecordDetail",
		"name": "placeModuleDetail",
		"meta": {
			"title": "操作记录详情"
		}
	},
	{
		"path": "pages/mainPackages/personal/userWallet/index",
		"name": "userWallet",
		"meta": {
			"title": "钱包"
		}
	},
	// 子账号
	{
		"path": "pages/mainPackages/personal/subAccountManagement/index",
		"name": "subAccountManagement",
		"meta": {
			"title": "子账号管理"
		}
	},
	{
		"path": "pages/mainPackages/personal/subAccountManagement/children/addAccount",
		"name": "operateAccount",
		"meta": {
			"title": "子账号操作"
		}
	},
	{
		"path": "pages/mainPackages/personal/subAccountManagement/children/createJobs",
		"name": "subAccountManagementAddRole",
		"meta": {
			"title": "子账号角色操作"
		}
	},
	// 登录、注册
	{
		"path": "pages/loginAndReg/login",
		"name": "login",
		"meta": {
			"title": "登录"
		}
	},
	{
		"path": "pages/loginAndReg/register",
		"name": "register",
		"meta": {
			"title": "注册"
		}
	},
	{
		"path": "pages/loginAndReg/children/codeSafe",
		"name": "codeSafe",
		"meta": {
			"title": "账号与安全"
		}
	},
	{
		"path": "pages/loginAndReg/children/changePassword",
		"name": "personal",
		"meta": {
			"title": "更改登录密码"
		}
	},
	{
		"path": "pages/loginAndReg/children/changePhone",
		"name": "personal",
		"meta": {
			"title": "修改登录手机号码"
		}
	},
	{
		"path": "pages/loginAndReg/retrievePassword",
		"name": "retrievePassword",
		"meta": {
			"title": "找回密码"
		}
	},
	{
		"path": "pages/mainPackages/personal/index",
		"name": "personal",
		"meta": {
			"title": "个人中心"
		}
	},
	{
		"path": "pages/mainPackages/home/index",
		"name": "home",
		"meta": {
			"title": "首页"
		}
	},
]

module.exports = pages;