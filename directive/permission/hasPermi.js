/**
* v-hasPermi 操作权限处理
*/

import {getPermissions} from "@/common/auth.js"

export default {
  inserted(el, binding, vnode) {

    const { value } = binding;
    const all_permission = "*:*:*";
    const permissions = getPermissions() || [];

    if (value && value instanceof Array && value.length > 0) {
      let hasPermissions;
      // 拥有所有权限
      if (permissions.length == 1 && permissions.includes(all_permission)) {
        hasPermissions = true;
      } else {
        // 拥有什么权限
        const permissionFlag = value;
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