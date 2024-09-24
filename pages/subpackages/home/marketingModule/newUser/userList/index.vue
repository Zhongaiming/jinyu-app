<!--
 * @Author: zhm
 * @Date: 2023-09-07 10:04:34
 * @LastEditors: zhm
 * @LastEditTime: 2024-03-26 14:22:24
 * @FilePath: \xls_22_3_7_app\src\pages\home\marketingTool\newUser\userList\index.vue
 * @Description: 
 * Wish: 佛祖保佑 永不宕机~
 * Copyright (c) 2023 by zhm, All Rights Reserved. 
-->
<template>
  <view class="page_mark_wrapper">
    <nav-bar>参与用户明细</nav-bar>
    <view class="table">
      <view class="table-tr table-header">
        <view class="table-td">用户ID</view>
        <view class="table-td">原价/实付</view>
        <!-- <view class="table-td">场地</view> -->
        <!-- <view class="table-td">套餐类型</view> -->
        <view class="table-td flex2">时间</view>
      </view>
      <view class="table-tr" v-for="(item, index) in list" :key="index">
        <view class="table-td text-over">{{ item.memberNumber }}</view>
        <view class="table-td text-over">
          {{ item.amount / 100 }}/{{ item.discountAmount / 100 }}
        </view>
        <!-- <view class="table-td text-over">V0006中土513</view> -->
        <!-- <view class="table-td text-over">自定义套餐</view> -->
        <view class="table-td flex2 text-over">{{ item.createTime }}</view>
      </view>
      <on-earth v-if="list.length"></on-earth>
      <no-data v-else></no-data>
    </view>
  </view>
</template>

<script>
export default {
  name: "mark_user_user",
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = JSON.parse(this.$route.query.list)
      ? JSON.parse(this.$route.query.list)
      : [];
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.table {
  background: #fff;
  padding-bottom: 50px;
  .table-header {
    color: #999;
    padding: 0 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .table-tr {
    text-align: center;
    display: flex;
  }
  .table-td {
    flex: 1;
    box-sizing: border-box;
    padding: 12.5px 3px;
    font-size: 14px;
  }
  .flex2 {
    flex: 2;
  }
}
</style>