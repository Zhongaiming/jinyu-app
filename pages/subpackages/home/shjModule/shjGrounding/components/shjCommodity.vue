<template>
  <!-- 售货机-单选 -->
  <u-popup
    :show="shjCommodity"
    position="bottom"
    :style="{ height: '60%' }"
    :close-on-click-overlay="false"
  >
    <view class="commodity-list-wrapper">
      <view class="title-top-wrapper">
        <view class="left-back" @click="shjCommodity = false">返回</view>
        <view class="center-tit">选择商品</view>
        <view class="right-count" @click="$router.push('/shjCommodity')">
          添加商品
        </view>
      </view>
      <xls-search
        placeholder="请输入商品名称"
        marLeft="-5.5em"
        @stratesSearch="stratesSearch"
      ></xls-search>

      <view class="commodity-list-wrapper" v-show="commodityList.length">
        <u-list
          v-model="loading"
          :finished="onEarth"
          finished-text="没有更多了"
          @load="getList"
          v-show="commodityList.length"
        >
          <view
            class="list-item"
            v-for="(item, index) in commodityList"
            :key="index"
            @click="pickerSpecial(item)"
          >
            <view
              class="list-main"
              :class="specialOption == item.id ? 'active-style' : ''"
            >
              <xls-image :src="item.commodityImg" alt="" v-if="item.commodityImg" />
              <xls-image src="@/assets/image/other/ztwl.png" alt="" v-else />
              <view class="text-wrapper">
                <view class="name text-over">{{ item.commodityName }}</view>
                <view>{{ item.referenceSellingPrice }}元</view>
              </view>
            </view>
          </view>
        </u-list>
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
// import api from "@/utils/shjApi";
export default {
  name: "shjCommodity",
  data() {
    return {
      shjCommodity: false,
      commodityList: [],
      searchValue: "",
      loading: false,
      onEarth: false,
      page: 0,
      specialOption: 0,
    };
  },
  async created() {
    this.getList();
  },
  methods: {
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
    showCommodity(Id) {
      if (Id) {
        this.specialOption = Id;
      }
      this.shjCommodity = true;
    },
    pickerSpecial(params) {
      this.$emit("getShjCommodity", params);
      this.specialOption = params.id;
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
    }
    .center-tit {
      width: 50%;
      text-align: center;
    }
    .right-count {
      width: 25%;
      color: #262626;
      text-align: right;
    }
  }
  .commodity-list-wrapper {
    flex: 1;
    overflow-y: scroll;
    .list-item {
      padding: 5px 12px 0;
      .list-main {
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding-bottom: 6px;
        font-size: 14px;
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          margin-right: 20px;
        }
        .text-wrapper {
          flex: 1;
          .name {
            margin-bottom: 5px;
          }
        }
      }
    }
    .active-style {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background: #e6e4fe;
      color: #5241ff;
      font-weight: 600;
      box-shadow: 2px 2px 1px 1px #f5f6f7f;
      transform: scale(1.01);
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