const preloadRule = {
	"pages/mainPackages/home/index": {
		"network": "all",
		"packages": ["pages/subpackages/home"]
	},
	"pages/mainPackages/personal/index": {
		"network": "all",
		"packages": ["pages/subpackages/personal"]
	},
	"pages/mainPackages/personal/userWallet/index": {
		"network": "all",
		"packages": ["pages/subpackages/merchant"]
	},
}

module.exports = preloadRule
// 分包预下载