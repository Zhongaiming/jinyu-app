/*
 * @Author: zhm
 * @Date: 2022-11-02 18:49:34
 * @LastEditors: zhm
 * @LastEditTime: 2024-01-12 10:58:48
 * @FilePath: \xls_22_3_7_app\src\plugins\storage.js
 * @Description: 
 * Wish: 佛祖保佑 永不宕机~
 * Copyright (c) 2023 by zhm, All Rights Reserved. 
 */
//取
function get(key) {
    try {
        //SyntaxError：Unexpected token u in JSON at position 0
        //传空报错
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null; // 解析存储的数据
    } catch (error) {
        console.error('从LocalStorage获取数据失败:', error);
        return null; // 获取失败
    }
}
//存
function set(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true; // 存储成功
    } catch (error) {
        console.error('LocalStorage存储失败:', error);
        return false; // 存储失败
    }
}
//删
function remove(key) {
    try {
        localStorage.removeItem(key);
        return true; // 删除成功
    } catch (error) {
        console.error('从LocalStorage删除数据失败:', error);
        return false; // 删除失败
    }
}

/** 会话存储 */
//取
function getSion(key) {
    try {
        //SyntaxError：Unexpected token u in JSON at position 0
        //传空报错
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null; // 解析存储的数据
    } catch (error) {
        console.error('从LocalStorage获取数据失败:', error);
        return null; // 获取失败
    }
}
//存
function setSion(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true; // 存储成功
    } catch (error) {
        console.error('LocalStorage存储失败:', error);
        return false; // 存储失败
    }
}
//删
function removeSion(key) {
    try {
        sessionStorage.removeItem(key);
        return true; // 删除成功
    } catch (error) {
        console.error('从LocalStorage删除数据失败:', error);
        return false; // 删除失败
    }
    // 清除会话存储
    // sessionStorage.clear()
}

export default {
    get,
    set,
    remove,
    getSion,
    setSion,
    removeSion
}



const storage = window.localStorage;

const localCache = {
    set(key, value, expirationDays = 7) {
        const expirationTime = new Date().getTime() + expirationDays * 24 * 60 * 60 * 1000;
        const item = {
            value,
            expirationTime,
        };
        storage.setItem(key, JSON.stringify(item));
    },

    get(key) {
        const item = JSON.parse(storage.getItem(key));
        if (item && item.expirationTime >= new Date().getTime()) {
            return item.value;
        }
        this.remove(key);
        return null;
    },

    remove(key) {
        storage.removeItem(key);
    },

    clear() {
        storage.clear();
    },
};
