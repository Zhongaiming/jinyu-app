<template>
  <!-- 售货机场地-多选 -->
  <u-popup
    v-model="shjCommodity"
    position="bottom"
    :style="{ height: '60%' }"
  >
    <view class="commodity-list-wrapper">
      <view class="title-top-wrapper">
        <view class="left-back" @click="shjCommodity = false">返回</view>
        <view class="center-tit">选择商品</view>
        <view class="right-count" @click="pickerSpecial">确定</view>
      </view>
      <!-- <xls-search
        placeholder="请输入商品名称"
        marLeft="-5.5em"
        @stratesSearch="stratesSearch"
      ></xls-search> -->
      <view class="all-style">
        <span class="text">全选</span>
        <u-checkbox
          v-model="allCheck"
          checked-color="#5241FF"
          @click="$refs.checkboxGroup.toggleAll(allCheck)"
        ></u-checkbox>
      </view>

      <view class="commodity-list-wrapper" v-show="commodityList.length">
        <u-checkbox-group
          v-model="checkboxGroup"
          direction="horizontal"
          ref="checkboxGroup"
        >
          <!-- <u-list
            v-model="loading"
            :finished="onEarth"
            finished-text="没有更多了"
            @load="getCommodity"
            v-show="commodityList.length"
          > -->
          <view class="commodity-wrapper">
            <view
              class="list-item"
              v-for="(item, index) in commodityList"
              :key="index"
            >
              <view class="image-wrapper">
                <img :src="item.commodityImg" alt="" v-if="item.commodityImg" />
                <img src="@/assets/image/other/ztwl.png" alt="" v-else />
                <u-checkbox
                  :name="item.id"
                  checked-color="#5241FF"
                  class="checkbox"
                ></u-checkbox>
              </view>
              <view class="name text-over">{{ item.commodityName }}</view>
            </view>
          </view>
          <!-- </u-list> -->
        </u-checkbox-group>
      </view>
      <xls-empty v-show="!commodityList.length" :textHide="false" />
      <view
        v-show="!commodityList.length"
        class="add-btn-style"
        @click="$router.push('/shjCommodity')"
      >
        添加商品
      </view>
    </view>
  </u-popup>
</template>

<script>
import {shjController} from '@/api/index.js';
export default {
  name: "shjCommodity",
  data() {
    return {
      shjCommodity: false,
      commodityList: [],
      searchValue: "",
      loading: false,
      onEarth: true,
      page: 0,
      checkboxGroup: [],
      allCheck: false,
    };
  },
  async created() {
    this.getCommodity();
  },
  methods: {
    async getCommodity() {
      let deviceNumber = this.$route.query.deviceNumber;
      let res = await api.railCommodity({ deviceNumber });
      if (res.data.code == 0) {
        this.commodityList = res.data.data;
      }
    },
    async getList() {
      this.loading = true;
      let res = await api.shjCommodity({
        page: ++this.page,
        size: 20,
        search: this.searchValue ? encodeURIComponent(this.searchValue) : null,
      });
      this.loading = false;
      if (res.data.code == 0 || res.data.msg == "ok") {
        if (res.data.data != null) {
          if (res.data.data.records.length < 20) {
            this.onEarth = true;
          } else {
            this.onEarth = false;
          }
          if (this.page > 1) {
            this.commodityList = [
              ...this.commodityList,
              ...res.data.data.records,
            ];
          } else {
            this.commodityList = res.data.data.records;
          }
        }
      }
    },
    stratesSearch(search) {
      this.searchValue = search;
      this.page = 0;
      this.onEarth = false;
      this.getList();
    },
    showCommodity(arr) {
      this.checkboxGroup = arr;
      this.allCheck = false;
      this.shjCommodity = true;
    },
    pickerSpecial() {
      this.$emit("getShjCommodity", this.checkboxGroup);
      this.shjCommodity = false;
    },
  },
};
</script>

<style lang="less" scoped>
.commodity-list-wrapper {
  width: 100%;
  height: 100%;
  font-family: "Microsoft JhengHei", "Microsoft YaHei";
  display: flex;
  flex-direction: column;
  .title-top-wrapper {
    padding: 0 12px;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 400;
    font-size: 16px;
    color: #5241ff;
    display: flex;
    align-items: center;
    .left-back {
      width: 25%;
      color: #262626;
    }
    .center-tit {
      width: 50%;
      text-align: center;
    }
    .right-count {
      width: 25%;
      text-align: right;
    }
  }
  .all-style {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 30px;
    padding: 0 12px;
    margin-bottom: 5px;
    font-size: 15px;
    .text {
      margin-right: 10px;
    }
  }
  .commodity-list-wrapper {
    flex: 1;
    overflow-y: scroll;
    background: #f5f6f7;
    .commodity-wrapper {
      display: flex;
      width: 100%;
      align-items: center;
      flex-wrap: wrap;
    }
    .list-item {
      width: 31%;
      background: #fff;
      border-radius: 6px;
      padding: 5px 0;
      font-size: 14px;
      text-align: center;
      margin: 5px 0;
      margin-left: 2%;
      .image-wrapper {
        position: relative;
      }
      .checkbox {
        position: absolute;
        bottom: 5px;
        right: 12px;
        background: #fff;
        border-radius: 50%;
      }
      img {
        width: 76px;
        height: 76px;
      }
      .name {
        margin-top: 10px;
      }
    }
  }
  .add-btn-style {
    padding: 5px 20px;
    border-radius: 6px;
    font-size: 14px;
    color: #fff;
    background: #544df2;
    margin: 20px auto;
  }
}
</style>