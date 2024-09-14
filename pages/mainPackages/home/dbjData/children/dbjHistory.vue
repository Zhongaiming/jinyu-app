<template>
  <div class="dbj-history-wrapper">
    <div ref="choose">
      <!-- <nav-bar>兑币机历史数据</nav-bar> -->
      <!-- <ConditionScreening text="history" @getParams="getParams" ref="screen" /> -->
    </div>
    <div class="table-container" @scroll="crossSlip($event)">
      <div class="thead-fixed show" v-show="topTitle">
        <table border="0">
          <thead :style="{ left: '-' + scrollLeft + 'px' }">
            <tr>
              <th class="tex-center">
                <p style="width: 85px">设备编号</p>
              </th>
              <th class="tex-center">
                <p style="width: 80px">现有库存</p>
              </th>
              <th class="tex-center">
                <p style="width: 120px">
                  在线支付(元)<span
                    class="DBJ-triangle"
                    @click="clickDbj('exchangeBalance')"
                    ><div
                      class="DBJ-triangleT"
                      :class="dbjStyle('exchangeBalance', 'asc')"
                    ></div>
                    <div
                      class="DBJ-triangleB"
                      :class="dbjStyle('exchangeBalance', 'desc')"
                    ></div
                  ></span>
                </p>
              </th>
              <th class="tex-center">
                <p style="width: 120px">
                  纸钞现金(元)<span
                    class="DBJ-triangle"
                    @click="clickDbj('sumMoney')"
                    ><div
                      class="DBJ-triangleT"
                      :class="dbjStyle('sumMoney', 'asc')"
                    ></div>
                    <div
                      class="DBJ-triangleB"
                      :class="dbjStyle('sumMoney', 'desc')"
                    ></div
                  ></span>
                </p>
              </th>
              <th class="tex-center">
                <p style="width: 120px">
                  线上取币<span
                    class="DBJ-triangle"
                    @click="clickDbj('exchangeNumber')"
                    ><div
                      class="DBJ-triangleT"
                      :class="dbjStyle('exchangeNumber', 'asc')"
                    ></div>
                    <div
                      class="DBJ-triangleB"
                      :class="dbjStyle('exchangeNumber', 'desc')"
                    ></div
                  ></span>
                </p>
              </th>
              <th class="tex-center">
                <p style="width: 120px">
                  纸钞取币<span
                    class="DBJ-triangle"
                    @click="clickDbj('sumGetToken')"
                    ><div
                      class="DBJ-triangleT"
                      :class="dbjStyle('sumGetToken', 'asc')"
                    ></div>
                    <div
                      class="DBJ-triangleB"
                      :class="dbjStyle('sumGetToken', 'desc')"
                    ></div
                  ></span>
                </p>
              </th>
              <th class="tex-center">
                <p style="width: 120px">合计取币</p>
              </th>
              <th class="tex-center">
                <p style="width: 120px">
                  实际出币数<span
                    class="DBJ-triangle"
                    @click="clickDbj('outPresentNumber')"
                    ><div
                      class="DBJ-triangleT"
                      :class="dbjStyle('outPresentNumber', 'asc')"
                    ></div>
                    <div
                      class="DBJ-triangleB"
                      :class="dbjStyle('outPresentNumber', 'desc')"
                    ></div
                  ></span>
                </p>
              </th>
              <th style="text-align: left">
                <p style="width: 150px">场地</p>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <table border="0" id="table-gash">
        <thead>
          <tr>
            <th class="tex-center">
              <p style="width: 85px">设备编号</p>
            </th>
            <th class="tex-center">
              <p style="width: 80px">现有库存</p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">
                在线支付(元)<span
                  class="DBJ-triangle"
                  @click="clickDbj('exchangeBalance')"
                  ><div
                    class="DBJ-triangleT"
                    :class="dbjStyle('exchangeBalance', 'asc')"
                  ></div>
                  <div
                    class="DBJ-triangleB"
                    :class="dbjStyle('exchangeBalance', 'desc')"
                  ></div
                ></span>
              </p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">
                纸钞现金(元)<span
                  class="DBJ-triangle"
                  @click="clickDbj('sumMoney')"
                  ><div
                    class="DBJ-triangleT"
                    :class="dbjStyle('sumMoney', 'asc')"
                  ></div>
                  <div
                    class="DBJ-triangleB"
                    :class="dbjStyle('sumMoney', 'desc')"
                  ></div
                ></span>
              </p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">
                线上取币<span
                  class="DBJ-triangle"
                  @click="clickDbj('exchangeNumber')"
                  ><div
                    class="DBJ-triangleT"
                    :class="dbjStyle('exchangeNumber', 'asc')"
                  ></div>
                  <div
                    class="DBJ-triangleB"
                    :class="dbjStyle('exchangeNumber', 'desc')"
                  ></div
                ></span>
              </p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">
                纸钞取币<span
                  class="DBJ-triangle"
                  @click="clickDbj('sumGetToken')"
                  ><div
                    class="DBJ-triangleT"
                    :class="dbjStyle('sumGetToken', 'asc')"
                  ></div>
                  <div
                    class="DBJ-triangleB"
                    :class="dbjStyle('sumGetToken', 'desc')"
                  ></div
                ></span>
              </p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">合计取币</p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">
                实际出币数<span
                  class="DBJ-triangle"
                  @click="clickDbj('outPresentNumber')"
                  ><div
                    class="DBJ-triangleT"
                    :class="dbjStyle('outPresentNumber', 'asc')"
                  ></div>
                  <div
                    class="DBJ-triangleB"
                    :class="dbjStyle('outPresentNumber', 'desc')"
                  ></div
                ></span>
              </p>
            </th>
            <th style="text-align: left">
              <p style="width: 150px">场地</p>
            </th>
          </tr>
        </thead>
        <tbody v-if="dataList.length">
          <tr v-for="(item, index) in dataList" :key="index">
            <th class="tex-center">
              <p style="width: 85px">{{ item.deviceNumber }}</p>
            </th>
            <th class="tex-center">
              <p style="width: 80px">{{ item.repo || '0' }}</p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">{{ item.exchangeBalance }}</p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">{{ item.sumMoney }}</p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">{{ item.exchangeNumber }}</p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">{{ item.sumGetToken }}</p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">
                {{ item.exchangeNumber + item.sumGetToken }}
              </p>
            </th>
            <th class="tex-center">
              <p style="width: 120px">{{ item.outPresentNumber }}</p>
            </th>
            <th style="text-align: left" class="flex text-over">
              <span class="span-style" v-if="item.siteUnbinding">已解绑</span>
              <p style="width: 150px">{{ item.placeName }}</p>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <no-data v-if="!dataList.length" />
  </div>
</template>

<script>
// import ConditionScreening from "./conditionScreening.vue";
// import api from "@/utils/dbjApi";

export default {
  name: "dbjHistory",
  // components: { ConditionScreening },
  data() {
    return {
      scrollLeft: 0,
      topTitle: false,
      dataList: [],
      params: {
        sort: null, // 排序的变量名
        sortDirection: null, //asc 正序，desc 反序
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.screen.quickTime(4);
    });
    window.addEventListener("scroll", this.screenSlide);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.screenSlide);
  },
  methods: {
    //纵向
    screenSlide() {
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      var scrollHeight = document.documentElement.scrollHeight; // 元素高度
      var clientHeight = document.documentElement.clientHeight; // 视口高度
      this.topTitle = scrollTop >= this.$refs.choose.scrollHeight;
    },
    //横向滚动
    crossSlip(event) {
      this.scrollLeft = event.target.scrollLeft;
    },
    getParams(data) {
      this.params = Object.assign(this.params, data);
      this.getList(this.params);
    },
    async getList(data) {
      // sort 排序的变量名
      // sortDirection asc 正序，desc 反序
      this.loading();
      let res = await api.getDbjDataSum(data);
      this.clearing();
      if (res.data.code == 200) {
        this.dataList = res.data.data;
      }
    },
    /** 排序 */
    clickDbj(type) {
      if (this.params.sort == type) {
        this.params.sortDirection =
          this.params.sortDirection == "desc" ? "asc" : "desc";
      } else {
        this.params.sort = type;
        this.params.sortDirection = "desc";
      }
      this.getList(this.params);
    },
    dbjStyle(type, sort) {
      if (type == this.params.sort && this.params.sortDirection == sort) {
        return sort == "desc" ? "activeT" : "activeB";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.dbj-history-wrapper {
  width: 100%;
  .table-container {
    z-index: 1000;
    position: relative;
    overflow-x: auto;
    width: 100%;
    background: #fff;
    table {
      font-size: 14px;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      text-indent: initial;
      thead {
        background: #e6e4fe;
        font-size: 11px;
        th {
          height: 40px;
          margin-left: 20px;
          padding: 0 2px;
        }
        p {
          box-sizing: content-box;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .desc {
          color: #ccc;
          font-size: 10px;
          text-align: center;
        }
        .txt-center {
          text-align: center;
        }
      }
      tbody {
        tr {
          border-bottom: 1px solid #e6e6e6;
          height: 40px;
          td {
            padding: 0 2px;
            span {
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }
            .text-history {
              color: #f60;
              display: block !important;
              font-size: 10px;
              margin-top: -5px;
              text-align: center;
            }
          }
        }
      }
    }
    .thead-fixed {
      display: none;
      thead {
        position: fixed;
        top: 0;
        z-index: 99999;
      }
    }
    .show {
      display: block;
    }
    .DBJ-triangle {
      display: inline-block;
      padding-left: 5px;
      vertical-align: middle;
      .DBJ-triangleT {
        border: 6px solid transparent;
        border-bottom-color: rgba(0, 0, 0, 0.2);
        height: 0;
        margin-bottom: 5px;
        position: relative;
        top: 1px;
        width: 0;
      }
      .DBJ-triangleB {
        border: 6px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.2);
        height: 0;
        position: relative;
        top: -1px;
        width: 0;
      }
      .activeT {
        border-top-color: #5241ff;
      }
      .activeB {
        border-bottom-color: #5241ff;
      }
    }
  }
  .table-container::-webkit-scrollbar {
    display: none;
  }
  .flex {
    display: flex;
    align-items: center;
    height: 40px;
  }
  .span-style {
    padding: 1px 5px;
    border-radius: 2px;
    font-size: 12px;
    background: rgb(250, 50, 50);
    color: #fff;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>