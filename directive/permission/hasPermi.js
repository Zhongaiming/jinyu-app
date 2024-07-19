/*
 * @Author: zhm
 * @Date: 2022-08-03 14:39:50
 * @LastEditors: zhm
 * @LastEditTime: 2023-09-14 11:07:13
 * @FilePath: \xls_22_3_7_app\src\directive\permission\hasPermi.js
 * @Description: 
 * Wish: 佛祖保佑 永不宕机~
 * Copyright (c) 2023 by zhm, All Rights Reserved. 
 */
/**
* v-hasPermi 操作权限处理
*/

import local from '@/plugins/storage'
// var permissions = [
// 	'app:bing:index',
// 	'app:meal:index',
// 	'app:today:index',
// 	'app:coin:index',
// 	'app:outPresent:index'
// ]
var permissions = ["*:*:*"]
export default {
  inserted(el, binding, vnode) {

    const { value } = binding;
    const all_permission = "*:*:*";
    // const permissions = local.get("permissions") || ["*:*:*"];
    if (value && value instanceof Array && value.length > 0) {
      let hasPermissions;
      // 拥有所有权限
      if (permissions.length == 1 && permissions.includes(all_permission)) {
        hasPermissions = true;
      } else {
        // 拥有什么权限
        const permissionFlag = value;
        // .some() 检测数组中的元素是否满足指定条件
        // 会依次执行数组的每个元素：
        // 如果有一个元素满足条件，则表达式返回true, 剩余的元素不会再执行检测。
        // 如果没有满足条件的元素，则返回false。
        // 注意： some() 不会对空数组进行检测。
        // 注意： some() 不会改变原始数组。
        hasPermissions = permissions.some(permission => {
          return permissionFlag.includes(permission)|| permissionFlag.includes(all_permission);
        })

      }

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
}