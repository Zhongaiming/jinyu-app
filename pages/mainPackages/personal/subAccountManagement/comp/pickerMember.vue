<template>
  <!-- 分账人员 -->
  <u-popup
    :show="pickerMember"
     mode="bottom"
		 @close="closePopup"
  >
    <view class="dev-content">
      <view class="modal-header box-sizing">
        <span class="handle-btn" @click="cancelMethed">取消</span>
        <span class="handle-btn ok-btn" @click="comfirmPicker"
          >确定<span class="sub-text"
            >({{ checkboxGroup.length }}个)</span
          ></span
        >
      </view>
			<u-input
        placeholder="请输入姓名或手机号"
        @change="inputSearch"
				clearable prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399"
				style="margin: 30rpx;"
        ref="search"
				:customStyle="{backgroundColor: '#F2F2F2'}"
      ></u-input>
    
      <view class="device-body">
        <view class="list-hd item" v-show="!searchValue">
          <span class="value">全部</span>
          <view class="handle-list" @click="checkAllPlace">
            <u-icon
              name="checkmark-circle-fill"
              size="40"
              color="#5241FF"
              v-if="allCheck"
            />
            <u-icon name="checkmark-circle" size="40" color="#CECFD2" v-else />
          </view>
        </view>
        <view class="list-bd">
          <view
            class="item dev-item"
            v-for="(item, index) in memberList"
            :key="index"
            v-show="!searchValue || item.nickName.indexOf(searchValue) > -1"
          >
            <span class="value">{{ item.nickName }}</span>
            <view class="handle-list" @click="checkPlaceItem(item.id)">
              <u-icon
                name="checkmark-circle-fill"
                size="40"
                color="#5241FF"
                v-if="checkboxGroup.includes(item.id)"
              />
              <u-icon name="checkmark-circle" size="40" color="#CECFD2" v-else />
            </view>
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import checkboxGroup from '../../../../../uni_modules/uview-ui/libs/config/props/checkboxGroup';
import { separateController } from '@/api/index.js';
export default {
  name: "pickerMember",
  data() {
    return {
      searchValue: "",
      pickerMember: false,
      memberList: [],
      allCheck: false,
      checkboxGroup: [],
    };
  },
  methods: {
		closePopup() {
			this.pickerMember = false
		},
    // 列表
    getBillPeople() {
       return new Promise((resolve, reject) => {
				 separateController.getSeparatePerson().then(res => {
					 if (res.code == 200) {
						 this.memberList = res.data;
						 resolve()
					 }
				 })
			 }) 
    },
    // 搜索
    inputSearch(value) {
      this.searchValue = value;
    },
    stratesSearch(value) {
      this.searchValue = value;
    },
    // 单项反选
    checkPlaceItem(id) {
      if (this.checkboxGroup.includes(id)) {
        this.checkboxGroup.splice(this.checkboxGroup.indexOf(id), 1);
      } else {
        this.checkboxGroup.push(id);
      }
			if(this.checkboxGroup.length == this.memberList.length) {
				this.allCheck = true;
			} else {
				this.allCheck = false
			}
    },
    // 全选、全不选
    checkAllPlace() {
      this.allCheck = !this.allCheck;
      this.checkboxGroup = [];
      if (this.allCheck) {
        this.memberList.forEach((place) => {
          this.checkboxGroup.push(place.id);
        });
      }
    },
    // 展示
    showMember(list) {
			this.getBillPeople().then(() => {
				this.checkboxGroup = [];
				if (list.length) {
				  list.map((id) => {
				    this.checkboxGroup.push(id);
				    // this.unshiftMember(id);
				  });
					if(list.length == this.memberList.length) {
						this.allCheck = true
					}
				}
				this.pickerMember = true;
			})
      
    },
    // 取消
    cancelMethed() {
      this.pickerMember = false;
    },
    // 确定
    comfirmPicker() {
      this.allCheck = false;
      this.searchValue = ''
			this.$emit("getMemberList", this.checkboxGroup);
      this.pickerMember = false;
    },
    // 勾选置顶
    unshiftMember(id) {
      let item;
      this.memberList = this.memberList.filter((member) => {
        member.id == id ? (item = member) : "";
        return member.id != id;
      });
      this.memberList.unshift(item);
    },
  },
};
</script>

<style lang="less" scoped>
.dev-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .modal-header {
    width: 100%;
    padding: 0 10px;
    height: 44px;
    line-height: 44px;
    background: #fafafa;
    border-bottom: 1px solid #e5e5e5;
    .handle-btn {
      display: inline-block;
      height: 100%;
      font-size: 16px;
      color: #5241ff;
    }
    .ok-btn {
      float: right;
    }
    .disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  .device-body {
    flex: 1;
    background: #f5f6f7;
    overflow: auto;
    padding-bottom: 50px;
    .list-hd {
      padding: 0 15px;
    }
    .item {
      position: relative;
      height: 46px;
      line-height: 46px;
      font-size: 16px;
      color: #000;
      background: #fff;
      width: 100%;
      box-sizing: border-box;
    }
    .value {
      display: inline-block;
      max-width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .handle-list {
      float: right;
      height: 100%;
      justify-content: flex-end;
      display: flex;
      align-items: center;
    }
    .van-checkbox--horizontal {
      margin-right: 0;
    }
    .list-bd {
      margin-top: 15px;
      padding-left: 15px;
      background: #fff;
    }
    .dev-item {
      padding-right: 15px;
    }
    .dev-item:not(:last-child) {
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
</style>