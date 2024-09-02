import http from '../../core/http/index.js'

export default class subAccountController {
	
	
	/**
	 * 获取子账户列表
	 * @param {Object} data
	 */
	static getSysReleuceList(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/merchantUserBinding/getSysUserBindingList',
			method: "GET",
			data
		})
	}
	
	/**
	 * 新增子账户
	 */
	static registerSonAccount(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/merchantUserBinding/addSysUserBinding',
			method: "POST",
			data
		})
	}
	
	/**
	 * 编辑子账号
	 * @param {Object} data
	 */
	static updateSysRelevanceList(data) {
		return http.request({
			url: "/merchant/api/v1/admin/merchant/merchantUserBinding/updateSysUserBinding",
			method: "POST",
			data
		})
	}
	
	/**
	 * 删除子账号
	 * @param {Object} data
	 */
	static delSonUser(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/merchantUserBinding/delSysUserBindingList',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 修改子账户状态
	 * @param {Object} data
	 */
	static updateReleuceState(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/merchantUser/updateRelevanceState',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 用户的管理分账查询
	 */
	static getLedgerManagement(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/merchantUserBinding/getLedgerManagement',
			method: 'GET',
			data
		})
	}
	
	/**
	 * 获取岗位角色列表
	 */
	static getSysRoles() {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/role/getSysRoles',
			method: "GET",
		})
	}
	
	/**
	 * 获取岗位权限设置列表
	 */
	static getSysRolesMenuList() {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/menu/list',
			method: "GET",
		})
	}
	
	/**
	 * 根据roleId查角色权限
	 */
	static getRoleModuleById(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/role/getRoleModuleById',
			method: "GET",
			data: data
		})
	}
	
	/**
	 * 删除角色
	 */
	static deleteSysRole(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/role/deleteSysRole',
			method: 'POST',
			data
		})
	}
	
	/**
	 * 编辑角色信息
	 */
	static putSysRole(data) {
		return http.request({
			url: '/merchant/api/v1/admin/merchant/role/putSysRolees',
			method: "POST",
			data
		})
	}
	
	/**
	 * 新增角色
	 */
	static addSysRole(data) {
		return http.request({
			url: "/merchant/api/v1/admin/merchant/role/addSysRole",
			method: 'POST',
			data
		})
	}
}