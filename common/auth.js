import cache from '@/common/cache.js'

let TOKEN_KEY = "token"
let INFO_KEY = "info"

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


export {
	TOKEN_KEY
}