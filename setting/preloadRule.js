const preloadRule = {
	"pages/mainPackages/home/index": {
		"network": "all",
		"packages": ["pages/subpackages/home"]
	},
	"pages/mainPackages/personal/index": {
		"network": "all",
		"packages": ["pages/subpackages/personal"]
	}
}

module.exports = preloadRule
