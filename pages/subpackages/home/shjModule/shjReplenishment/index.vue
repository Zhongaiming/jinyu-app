<template>
  <view class="shj-replenishment">
	<xls-jy-navbar title="补货管理" bgColor="#f5f6f7"></xls-jy-navbar>
    <xls-search
      @stratesSearch="stratesSearch"
      placeholder="输入设备编号或场地"
      marLeft="-6.5em"
    ></xls-search>
    <view class="places-select-wrapper" @click="$refs.place.showPlacelist()">
      <view class="select-label">场地</view>
      <view class="select-value">{{ placeName }}</view>
      <van-icon name="arrow" size="18" color="#ccc" />
    </view>
    <!-- <shj-place ref="place" @getShjPlace="getShjPlace" /> -->
    <view class="main-content-wrapper">
      <van-list
        v-model="loading"
        :finished="onEarth"
        finished-text="没有更多了"
        @load="getCommodity"
        v-show="commodityList.length"
      >
        <view
          class="li-item-wrapper"
          v-for="(item, index) in commodityList"
          :key="index"
          v-show="item.railList.length"
        >
          <view class="title-style">{{ item.placeName }}</view>
          <view
            class="device-message"
            v-for="(rail, index) in item.railList"
            :key="index"
            @click="goReplenishment(rail.deviceNumber)"
          >
            <view class="item-top">
              <span class="name">售货机{{ rail.deviceNumber }}</span>
              <span class="status-icon offline" v-if="!rail.onlineState"
                >离线</span
              >
              <span style="color: #15d193" class="status-icon" v-else
                >在线</span
              >
              <i
                class="iconfont icon-lixian"
                style="color: #ff4747; font-size: 22px"
                v-if="!rail.onlineState"
              ></i>
              <i
                class="iconfont icon-zaixian"
                style="color: #15d193; font-size: 19px"
                v-else
              ></i>
            </view>
            <view class="data-list">
              <view class="data-list_item">
                <view class="item-label">货道总数</view>
                <view class="item-value">{{ rail.railCount }}条</view>
              </view>
              <view class="data-list_item">
                <view class="item-label color-blue">缺货</view>
                <view class="item-value color-blue">
                  {{ rail.shortSupply }}个
                </view>
              </view>
              <view class="data-list_item">
                <view class="item-label">总容量</view>
                <view class="item-value">{{ rail.total }}个</view>
              </view>
              <view class="data-list_item">
                <view class="item-label">现有库存</view>
                <view class="item-value">{{ rail.stock }}个</view>
              </view>
            </view>
          </view>
        </view>
      </van-list>
      <xls-empty v-show="!commodityList.length" />
    </view>
  </view>
</template>

<script>
// import api from "@/utils/shjApi";
// import ShjPlace from "@/components/commonComps/shjPlace.vue";
export default {
  name: "shjReplenishment",
  // components: { ShjPlace },
  data() {
    return {
      searchValue: "",
      placeName: "全部场地",
      placeId: null,
      loading: false,
      onEarth: false,
      page: 0,
      commodityList: [],
    };
  },
  // created() {
  //   this.getCommodity();
  // },
  methods: {
    stratesSearch(search) {
      this.searchValue = search;
      this.page = 0;
      this.onEarth = false;
      this.getCommodity();
    },
    async getCommodity() {
      this.loading = true;
      let res = await api.venueVendingMachine({
        page: ++this.page,
        size: 20,
        search: this.searchValue ? encodeURIComponent(this.searchValue) : null,
        placeId: this.placeId,
      });
      this.loading = false;
      if (res.data.code == 0 || res.data.msg == "ok") {
        if (res.data.data != null) {
          if (res.data.data.length < 20) {
            this.onEarth = true;
          } else {
            this.onEarth = false;
          }
          if (this.page > 1) {
            this.commodityList = [...this.commodityList, ...res.data.data];
          } else {
            this.commodityList = res.data.data;
          }
        }
      }
    },
    goReplenishment(deviceNumber) {
      this.$router.push({
        path: "/deviceManagement/replenishment",
        query: {
          deviceNumber,
        },
      });
    },
    getShjPlace(place) {
      if (place == -1) {
        this.placeId = null;
        this.placeName = "全部场地";
      } else {
        this.placeId = place.id;
        this.placeName = place.placeName;
      }
      this.stratesSearch("");
    },
  },
};
</script>

<style lang="scss" scoped>
.shj-replenishment {
  width: 100%;
  .places-select-wrapper {
    padding: 12px 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    font-size: 15px;
    .select-label {
      width: 87.5px;
      color: #666;
    }
    .select-value {
      flex: 1;
      color: #5241FF;
      text-align: right;
    }
  }
  .main-content-wrapper {
    margin-top: 8px;
    padding: 0 12px 30px;
    .li-item-wrapper {
      margin-top: 6px;
      .title-style {
        padding: 10px;
        font-size: 15px;
      }
      .device-message {
        padding: 0 12px;
        margin-bottom: 12px;
        background: #fff;
        border-radius: 2px;
        .item-top {
          border-bottom: 1px solid #f0f0f0;
          padding: 10px 0;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          position: relative;
          .name {
            color: #262626;
            margin-right: 8px;
            vertical-align: middle;
          }
          .offline {
            color: #ff4747;
          }
        }
        .item-top:after {
          border-right: 1px solid #999;
          border-top: 1px solid #999;
          content: "";
          height: 9px;
          opacity: 0.6;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 9px;
        }
        .data-list {
          align-items: center;
          display: flex;
          height: 70px;
          justify-content: space-between;
          width: 100%;
          .data-list_item {
            color: #999;
            font-size: 13px;
            text-align: center;
            .item-label {
              color: #595959;
              font-size: 11.5px;
              margin-bottom: 4px;
            }
            .item-value {
              color: #262626;
              font-size: 13px;
              font-weight: 500;
            }
            .color-blue {
              color: #5241FF;
            }
          }
        }
      }
    }
  }
}
</style>