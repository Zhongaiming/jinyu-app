<template>
  <view class="add-account-wrapper">
		<xls-jy-navbar :title=" sonAccount ? '编辑子账号': '创建子账号'"></xls-jy-navbar>
    <view class="create-child">
      <view class="wrap-padding">
        <p class="label">账号信息</p>
        <ul class="post-list">
          <li class="item">
            <span class="item-left">账号<span class="tips">(zt默认添加)</span></span>
						<u-input
							type="number"
							v-model="sonAccountInfo.username"
							placeholder="请输入11位手机号"
						
							border="none"
							inputAlign="right"
							:readonly="disableInput ? true : false"
						 />
          </li>
          <li class="item">
            <span class="item-left">请输入密码</span>
						<u-input 
							type="password"
							placeholder="新密码"
							border="none"
							inputAlign="right"
							v-model="sonAccountInfo.password"
						/>
          </li>
          <li class="item">
            <span class="item-left">使用人姓名</span>
						<u-input
							placeholder="请输入使用人姓名"
							border="none"
							inputAlign="right"
							v-model="sonAccountInfo.nickName"
						/>
          </li>
        </ul>
        <p class="label">账号权限</p>
        <ul class="post-list">
          <li class="item arrows-right"  @click="$refs.job.showJob(sonAccountInfo.roleId)">
            <span class="item-left">岗位角色</span>
           <span
              class="item-right"
              :class="jobName != '请选择岗位角色' ? 'font-color' : ''"
              >{{ jobName }}</span
            >
          </li>
          <li
            class="item arrows-right"
            v-hasPermi="['app:place:index']"
            style="border: 0"
            @click="$refs.place.showPlace(placeIds)"
          >
            <span class="item-left">场地权限</span
            ><span
              class="item-right"
              :class="placeIds.length ? 'font-color' : ''"
              >{{
                placeIds.length
                  ? `已选择${placeIds.length}个场地`
                  : "请选择场地权限"
              }}</span
            >
          </li>
          <li class="synchronous-new-group">
            <span class="synchronous-new-group-text"
              >自动同步授权新建的场地</span
            >
            <view class="handle-list">
              <u-switch v-model="checked" size="35" active-color="#5241FF"/>
            </view>
          </li>
        </ul>
        <view class="autoAccount-item">
          <span class="autoAccount-item-text">自动分账管理权限</span>
          <view class="handle-list">
            <u-switch v-model="ledger" size="35" active-color="#5241FF" />
          </view>
        </view>
        <view class="autoAccount-content" v-show="ledger">
          <view
            class="item-top"
            @click="$refs.picker.showMember(separateBillsId)"
          >
            <span class="item-top-text">该子账号可管理的分成人员</span>
            <view class="viewidePerson-number">
              {{ separateBillsId.length }}人
            </view>
          </view>
          <p class="detail-txt">
            授权分成人员给该子账号后，子账号可操作：
            ①给指定分成人员绑定银行卡等信息。②查询指定分成人员的结算信息、分成金额明细、分成比例等
          </p>
        </view>
      </view>
      <view class="bottom-container">
        <span class="search-btn" @click="registerAccount">保存</span>
      </view>
    </view>
    <!-- 分账人员 -->
    <PickerMember ref="picker" @getMemberList="getMemberList" />
    <!-- 场地 -->
    <PickerPlace ref="place" @getPickerPlace="getPickerPlace" />
    <!-- 角色 -->
    <PickerJob ref="job" @getPickerJob="getPickerJob" />
  </view>
</template>

<script>
import PickerMember from "../comp/pickerMember.vue";
import PickerPlace from "../comp/pickerPlace.vue";
import PickerJob from "../comp/pickerJob.vue";

import md5 from "js-md5";
import { subAccountController, placeController } from "../../../../../api";
export default {
  name: "addAccount",
  components: {PickerJob, PickerPlace, PickerMember },
  data() {
    return {
      checked: false,
      jobName: "请选择岗位角色",
      ledger: false,
      separateBillsId: [],
      //注册
      sonAccountInfo: {
        nickName: "",
        username: "",
        password: "",
        roleType: "",
        placeIds: "",
        roleId: "",
        userId: "",
        roleName: "",
        id: "",
        synchronizationPlace: "",
      },
      disableInput: false, //禁止输入
      //场地
      placeIds: [],
			
			sonAccount: null
    };
  },
  created() {
    this.enterOper();
  },
	onLoad(option) {
		if(option.params) {
			this.sonAccount = JSON.parse(option.params).sonAccount
		}
		
	},
  methods: {
		// 岗位角色选择
		getPickerJob(job) {
			this.jobName = job.roleName;
			this.sonAccountInfo.roleId = job.roleId; //新
		},
		// 场地权限选择
		getPickerPlace(list) {
			this.placeIds = list;
		},
		getMemberList(member) {
			this.separateBillsId = member;
		},
    async enterOper() {
      //编辑子账号
      if (this.sonAccount) {
        this.sonAccountInfo = Object.assign(
          this.sonAccountInfo,
          this.sonAccount,
        );
				console.log(12121212, this.sonAccount)
        this.jobName = this.sonAccountInfo.roleName;
				console.log(11111111, this.jobName, this.sonAccountInfo)
        // this.sonAccountInfo.username =
        //   this.sonAccountInfo.username + "(不可编辑)";
        if (
          this.sonAccountInfo.synchronizationPlace != "" ||
          this.sonAccountInfo.synchronizationPlace != undefined
        ) {
          this.sonAccountInfo.synchronizationPlace
            ? (this.checked = true)
            : (this.checked = false);
        }
        this.disableInput = true;
        //待定
        this.sonAccountInfo.password = "**ztwl**";
        //回填 场地 角色
        this.jobActive = this.sonAccountInfo.roleId;
        //子用户的管理分账查询
        this.ledger = this.sonAccountInfo.ledger == 1; //分账管理开关  0关 1开
        subAccountController.getLedgerManagement({
          subUserId: this.sonAccountInfo.id,
        }).then((res) => {
          if (res.code == 200) {
            this.separateBillsId = res.data; //分账人id  list
          }
        });
        placeController.getPlaceList({
          id: this.sonAccountInfo.id,
        }).then((res) => {
          if (res.code == 200) {
            this.placeIds = [];
            res.data.map((place) => {
              this.placeIds.push(place.id);
            }); //已绑定场地
          }
        });
      } else {
        // 添加子账号
        this.disableInput = false;
        this.ledger = false; //分账管理开关  0关 1开
        this.separateBillsId = []; //分账人id  list
        this.placeIds = []; // 场地
      }
			
							console.log(11111111111111, this.sonAccountInfo)
    },
    // 选择场地
    getPickerPlace(list) {
      this.placeIds = list;
    },
    // 选择角色
    getPickerJob(job) {
      this.jobName = job.roleName;
      this.sonAccountInfo.roleId = job.roleId; //新
    },
    // 自动分账 分成人
    getMemberList(member) {
      this.separateBillsId = member;
    },
    // 注册或编辑
    async registerAccount() {
      if (!this.sonAccountInfo.username) {
        return this.$toast("请输入手机号~");
      }
      if (!this.sonAccountInfo.nickName) {
        return this.$toast("请输入昵称~");
      }
      if (!this.sonAccountInfo.password) {
        return this.$toast("请输入密码~");
      }
      if (!this.sonAccountInfo.roleId) {
        return this.$toast("请选择角色~");
      }
      let operation;
      // this.loading();
      if (this.sonAccount) {
        operation = await  subAccountController.updateSysRelevanceList({
          id: this.sonAccountInfo.id,
          roleIds: this.sonAccountInfo.roleId, //修改岗位角色
          password:
            this.sonAccountInfo.password == "**ztwl**"
              ? null
              : md5(this.sonAccountInfo.password), //修改密码
          nickName: this.sonAccountInfo.nickName, //修改昵称
          synchronizationPlace: this.checked ? 1 : 0,
          placeIds: this.placeIds.length ? String(this.placeIds) : "", //选择场地
          isAll: "",
          ledger: this.ledger ? 1 : 0, //分账管理开关  0关 1开
          separateBillsId: this.separateBillsId, //分账人id  list
        });
      } else {
        operation = await subAccountController.registerSonAccount({
          roleId: this.sonAccountInfo.roleId, //添加子用户角色
          username: this.sonAccountInfo.username, //用户名
          nickName: this.sonAccountInfo.nickName, //昵称
          password: md5(this.sonAccountInfo.password), //密码
          synchronizationPlace: this.checked ? 1 : 0, //同步场地
          placeIds: this.placeIds.length ? String(this.placeIds) : "", //添加场地
          isAll: "",
          ledger: this.ledger ? 1 : 0, //分账管理开关  0关 1开
          separateBillsId: this.separateBillsId, //分账人id  list
        });
      }
			console.log(2121212, operation)
      if (operation.code == 200) {
			
        setTimeout(() => {
          this.$toast("操作成功~");
          this.$parent.page = 0;
          this.$parent.finished = false;
          this.$goBack();
        }, 500);
      }
    },
    // 子账号标识
    addTips() {
      if (this.sonAccountInfo.username.indexOf("zt") !== 0) {
        if (this.sonAccountInfo.username.length) {
          this.sonAccountInfo.username = "zt" + this.sonAccountInfo.username;
        }
      } else if (this.sonAccountInfo.username === "zt") {
        this.sonAccountInfo.username = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.add-account-wrapper {
  width: 100%;
  height: 100vh;
  background: #f5f6f7;
  overflow: auto;
  padding-bottom: 80px;
  box-sizing: border-box;

  .create-child {
    width: 100%;
    .wrap-padding {
      .label {
        color: #595959;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        height: 20px;
        letter-spacing: 0;
        line-height: 20px;
        margin: 16px 0 6px 12px;
      }
      .post-list {
        background-color: #fff;
        padding-left: 12px;
        position: relative;
        .item {
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: 14px 12px 14px 0;
          .item-left {
            color: #262626;
            font-size: 16px;
            font-weight: 400;
            height: 22px;
            line-height: 22px;
            text-align: left;
          }
          .tips {
            font-size: 10px;
            color: #999;
          }
          input {
            background-color: #fff;
            flex: 1;
            font-size: 15px;
            font-weight: 400;
            height: 22px;
            line-height: 22px;
            margin-bottom: 0;
            padding: 0;
            text-align: right;
            border: none;
            outline: none;
            margin: 0;
          }
        }
        .item:not(:last-child) {
          border-bottom: 1px solid #e5e5e5;
        }
        .arrows-right {
          position: relative;
          padding-right: 26px;
          .item-right {
            flex: 1;
            font-size: 14px;
            font-weight: 400;
            height: 20px;
            line-height: 20px;
            margin-bottom: 0;
            padding: 0;
            text-align: right;
            color: #acacac;
          }
        }
        .arrows-right:after {
          border-right: 1px solid #4c4c4c;
          border-top: 1px solid #4c4c4c;
          content: "";
          height: 9px;
          opacity: 0.6;
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 9px;
        }
        .synchronous-new-group {
          align-items: center;
          display: flex;
          font-size: 16px;
          height: 65px;
          justify-content: space-between;
          padding-right: 12px;
          position: relative;
          // background: url(../../../../assets/my/account_image/con-bg.png) no-repeat;
          background-size: 98% 85%;

          .synchronous-new-group-text {
            color: #262626;
            font-size: 16px;
            font-weight: 400;
            height: 22px;
            line-height: 22px;
            margin: 14px 0;
            padding-left: 9.5px;
          }
        }
      }
      .autoAccount-item {
        margin-top: 12px;
        padding: 0 12px;
        align-items: center;
        background: #fff;
        display: flex;
        justify-content: space-between;
        .autoAccount-item-text {
          color: #262626;
          font-size: 16px;
          font-weight: 400;
          height: 22px;
          line-height: 22px;
          margin: 14px 0;
        }
      }
      .autoAccount-content {
        background: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top: 1px solid #e5e5e5;
        padding-bottom: 12px;
        padding-left: 12px;
        .item-top {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin: 14px 0;
          padding-right: 12px;
          position: relative;
          .item-top-text {
            color: #262626;
            font-size: 16px;
            font-weight: 400;
            height: 22px;
            line-height: 22px;
          }
          .viewidePerson-number {
            color: #262626;
            flex: 1;
            font-size: 14px;
            font-weight: 400;
            height: 20px;
            line-height: 20px;
            margin-right: 26px;
            text-align: right;
          }
        }
        .item-top:after {
          border-right: 1px solid #4c4c4c;
          border-top: 1px solid #4c4c4c;
          content: "";
          height: 9px;
          opacity: 0.6;
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 9px;
        }
        .detail-txt {
          color: #8c8c8c;
          font-size: 13px;
          font-weight: 400;
          line-height: 18px;
          padding-right: 12px;
        }
      }
    }
    .bottom-container {
      background-color: #fff;
      bottom: 0;
      left: 0;
      padding: 8px 11px 8px 13px;
      position: fixed;
      right: 0;
      text-align: center;
      .search-btn {
        background: #5241ff;
        border-radius: 4px;
        color: #fff;
        display: inline-block;
        font-size: 18px;
        font-weight: 400;
        height: 48px;
        line-height: 48px;
        width: 100%;
      }
    }
    .font-color {
      color: #000 !important;
    }
  }
}
</style>