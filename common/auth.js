import cache from '@/common/cache.js'

let TOKEN_KEY = "xlsV4_token"
let INFO_KEY = "xlsV4_info"
let PERMISSIONS_KEY = "xlsV4_permissions"
let LOGIN_KEY = "xlsV4_login"
/**
 * 存储token
 */
export function getToken() {
	return cache.getCache(TOKEN_KEY)
}
export function setToken(data) {
	cache.setCache(TOKEN_KEY, data)
}
export function removeToken() {
	cache.removeCache(TOKEN_KEY)
}

/**
 * 存储用户信息
 */
export function getInfo() {
	return cache.getCache(INFO_KEY)
}
export function setInfo(data) {
	cache.setCache(INFO_KEY, data)
}
export function removeInfo() {
	cache.removeCache(INFO_KEY)
}

/**
 * 存储用户权限
 */
export function getPermissions() {
	return cache.getCache(PERMISSIONS_KEY)
}
export function setPermissions(data) {
	cache.setCache(PERMISSIONS_KEY, data)
}
export function removePermissions() {
	cache.removeCache(PERMISSIONS_KEY)
}

/**
 * 存储用户登录账号密码
 */
export function getLoginInfo() {
	return cache.getCache(LOGIN_KEY)
}
export function setLoginInfo(data) {
	cache.setCache(LOGIN_KEY, data)
}
export function removeLoginInfo() {
	cache.removeCache(LOGIN_KEY)
}

export {
	TOKEN_KEY,
	INFO_KEY,
	PERMISSIONS_KEY,
	LOGIN_KEY,
}