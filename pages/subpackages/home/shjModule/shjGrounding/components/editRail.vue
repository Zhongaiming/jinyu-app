<template>
  <view>
    <!-- 货道编辑 -->
    <u-popup v-model="railEdit" position="bottom" :style="{ height: '60%' }">
      <view class="edit-cargoroad">
        <view class="popup-header">
          <span @click="railEdit = false">取消</span>
          <span class="popup-title">货道设置</span>
          <span @click="confirmSet">保存</span>
        </view>
        <view class="popup-content">
          <view
            class="edit-panel"
            @click="
              (railEdit = false),
                $refs.commodity.showCommodity(railMsg.commodityId)
            "
          >
            <span>商品名称</span>
            <span class="product-name">{{ commodityName }}</span>
          </view>
          <view class="edit-panel">
            <span>商品售卖价格</span>
            <view class="input-wrapper">
              <u-field
                placeholder="请输入商品售卖价格"
                v-model="railMsg.price"
                type="number"
                input-align="right"
              />
            </view>
            <span>元/个</span>
          </view>
          <view class="edit-panel">
            <span>现有库存</span>
            <u-stepper
              v-model="railMsg.railRepertory"
              integer
              input-width="60px"
              button-size="32px"
              min="0"
            />
          </view>
          <view class="edit-panel">
            <span>货道容量</span>
            <view class="input-wrapper">
              <u-field
                v-model="railMsg.railCapacity"
                type="digit"
                placeholder="请输入货道容量"
                input-align="right"
              />
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <shj-commodity ref="commodity" @getShjCommodity="getShjCommodity" />
  </view>
</template>

<script>
import ShjCommodity from "./shjCommodity.vue";
// import api from "@/utils/shjApi";
export default {
  name: "editRail",
  components: { ShjCommodity },
  data() {
    return {
      railEdit: false,
      railMsg: {
        railId: null,
        commodityId: null,
        price: null, //价格
        railRepertory: null, //现有库存
        railCapacity: null, //货道容量
      },
      commodityName: "",
    };
  },
  methods: {
    handleEdit(item) {
      this.commodityName = item.commodityName ? item.commodityName : "未设置";
      this.railMsg = {
        railId: item.id,
        commodityId: item.commodityId,
        price: item.price, //价格
        railRepertory: item.railRepertory, //现有库存
        railCapacity: item.railCapacity, //货道容量
      };
      this.railEdit = true;
    },
    getShjCommodity(commodity) {
      this.railMsg.commodityId = commodity.id;
      this.railMsg.price = commodity.referenceSellingPrice;
      this.commodityName = commodity.commodityName;
      this.railEdit = true;
    },
    async confirmSet() {
      let res = await api.goodsOnTheShelf(this.railMsg);
      if (res.data.code == 0) {
        this.$parent.getDetail();
        this.$toast("修改成功~");
        this.railEdit = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.edit-cargoroad {
  background: #fff;
  width: 100%;
  .popup-header {
    align-items: center;
    background: #f4f5f7;
    color: #5241ff;
    display: flex;
    font-size: 16px;
    height: 45px;
    justify-content: space-between;
    padding: 0 10px;
    .popup-title {
      color: #000;
    }
  }
  .popup-content {
    font-size: 15px;
    .edit-panel {
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      height: 50px;
      justify-content: space-between;
      padding: 0 10px;
      .input-wrapper {
        flex: 1;
      }
    }
    .product-name {
      padding-right: 20px;
    }
    .product-name:after {
      border-right: 1px solid #4c4c4c;
      border-top: 1px solid #4c4c4c;
      content: "";
      height: 9px;
      margin-top: 5px;
      opacity: 0.6;
      position: absolute;
      right: 13px;
      transform: rotate(45deg);
      width: 9px;
    }
  }
}
</style>