<template>
	<u-tabbar :value="activeType" active-color="#5241FF" @change="changeType">
		<u-tabbar-item v-for="item in list" :key="item.name" :name="item.name" :text="item.title" :badge="item.badge">
			<image slot="active-icon" :src="item.active" class="item__slot-icon" mode="heightFix" />
			<image slot="inactive-icon" :src="item.inactive" class="item__slot-icon" mode="heightFix" />
		</u-tabbar-item>
	</u-tabbar>
</template>

<script>
	import {
		deviceController
	} from "@/api/index.js";
	export default {
		name: "xls-tabbar",
		props: {
			activeType: {
				type: [String, Number],
				default: 1
			},
			list: {
				type: Array,
				default: () => {
					return [{
							name: 1,
							title: '设备管理',
							active: 'https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/' +
								"appV4/device_tabbar/device_active.png",
							inactive: 'https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/' +
								"appV4/device_tabbar/device.png",
							route: '/pages/mainPackages/home/deviceModule/index',
							badge: 0
						},
						{
							name: 2,
							title: '设备故障',
							active: 'https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/' +
								"appV4/device_tabbar/fault_active.png",
							inactive: 'https://xls-ui-file.oss-cn-hangzhou.aliyuncs.com/appui/' +
								"appV4/device_tabbar/fault.png",
							route: '/pages/mainPackages/home/deviceModule/deviceFault',
							badge: 0
						}
					]
				}
			}
		},
		mounted() {
			this.getFaultTotal()
		},
		methods: {
			changeType(name) {
				if (name === this.activeType) return
				const {
					route
				} = this.list.find(item => item.name === name)
				this.$goTo(route)
			},
			getFaultTotal() {
				deviceController.getUntreatedTotal().then(res => {
					if(res.code == 200) {
						this.list[1].badge = res.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item__slot-icon {
		height: 20px;
	}
</style>