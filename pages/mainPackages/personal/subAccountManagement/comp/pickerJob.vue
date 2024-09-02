<template>
  <!-- 角色 -->
  <u-popup ref="rolePopup" :show="showRole" mode="bottom" @close="closePopup">
    <view class="pickerJob">
      <view class="place-top">
        <view class="left-back"></view>
        <view class="center-tit">岗位角色</view>
        <view
          class="right-count"
          @click="goTo"
        >
          新增
        </view>
      </view>
      <view class="place-con">
        <view
          class="place-item"
          v-for="(job, index) in jobList"
          :key="index"
          @click="pitchonJob(job)"
        >
          <!-- 新 -->
          <view class="place-main">
            <view
              :style="jobActive == job.roleId ? { color: '#5241FF' } : ''"
              class="job-name"
            >
              {{ job.roleName }}
            </view>
            <u-icon
              name="checkmark-circle"
              v-show="jobActive != job.roleId"
              size="40"
              color="#d3d4d6"
            />
            <u-icon
              name="checkmark-circle-fill"
              v-show="jobActive == job.roleId"
              size="40"
              color="#5241FF"
            />
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import { subAccountController } from '@/api/index'
export default {
  name: "pickerJob",
  data() {
    return {
      //角色
      showRole: false,
      jobList: [],
      jobActive: -1,
    };
  },
  methods: {
		closePopup() {
			this.showRole = false
		},
		goTo() {
			this.$goTo("/pages/mainPackages/personal/subAccountManagement/children/createJobs")
			this.showRole = false
		},
    // 角色
    getRoleList() {
      subAccountController.getSysRoles().then(res => {
				if(res.code === 200) {
					this.jobList = res.data
				}
			}) 
      
    },
    // 选择角色
    pitchonJob(job) {
      this.jobActive = job.roleId;
      this.$emit("getPickerJob", job);
      this.showRole = false;
    },
    showJob(id) {
			this.getRoleList();
      this.jobActive = id;
      this.showRole = true;
    },
  },
};
</script>

<style lang="less" scoped>
.pickerJob {
  width: 100%;
  height: 50vh;
  font-family: PingFangSC-Regular, PingFang SC;
  display: flex;
  flex-direction: column;
  .place-top {
    padding: 0 12px;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 400;
    font-size: 16px;
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
      text-align: right;
      color: #5241ff;
    }
  }
  .place-con {
    flex: 1;
    overflow-y: auto;
    font-family: "Microsoft JhengHei", "Microsoft YaHei";
    .place-item {
      padding-left: 12px;
      .place-main {
        padding: 10px;
        padding-left: 0;
        border-bottom: 1px solid #eee;
        min-height: 50px;
        box-sizing: border-box;
        font-size: 16px;
        display: flex;
        align-items: center;
        .job-name {
          flex: 1;
        }
      }
    }
  }
}
</style>