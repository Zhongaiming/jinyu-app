<template>
  <view class="createJobs">
    <xls-jy-navbar title="创建岗位角色"></xls-jy-navbar>
    <view class="create-role home-family">
      <u-cell title="岗位名称">
      	<template slot="value">
      		<u-input v-model="jobName" placeholder="请输入岗位名称" border="none" inputAlign="right" :readonly="!editJobs ? true : false" />
      	</template>
      </u-cell>
      <view class="title">岗位权限设置</view>
      <view class="container">
        <view class="container-content">
          <view class="all-check">
						<u-checkbox-group>
						  <u-checkbox :checked="deptNodeAll" :size="40" labelSize="25" iconSize="25" label="全选/全不选"  @change="handleCheckedTreeNodeAll($event)" ></u-checkbox>
						</u-checkbox-group>
          </view>
						 <DaTreeVue2
								ref="DaTreeRef"
								:data="menuOptions"
								labelField="title"
								valueField="menuId"
								showCheckbox
								:defaultCheckedKeys="selectTreeData"
								@change="handleTreeChange" />
        </view>
      </view>
      <!-- bottom -->
      <!-- @click="addOredit" -->
			<view class="footer-sub" v-show="editJobs">
			  <button class="btn" @click="submitEvent">保存</button>
			  <button class="btn"  style="margin-left: 12px" v-show="roleId">取消</button>
			</view>
      <view class="footer-sub" v-show="!editJobs">
        <button class="btn" @click="editJobs = true">编辑</button>
       <!-- <button class="btn" v-hasPermi="['app:account:index:deletejob']" style="margin-left: 12px" v-show="canDelete"
          @click="deleteJob">
          删除
        </button> -->
      </view>
    </view>
  </view>
</template>

<script>
import DaTreeVue2 from '@/components/da-tree-vue2/index.vue'
import { subAccountController } from '@/api/index.js'
import { handleTree } from "@/plugins/tree";
// import { getRoleModuleById } from "@/utils/otherRequest/modules";
// import {
//   getRoleComNum,
//   listMenu,
//   addSysRole,
//   delSysRole,
//   updateSysRole,
// } from "@/utils/otherRequest/modules";

// import local from "@/plugins/storage";

export default {
  name: "createJobs",
	components: {
		DaTreeVue2
	},
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      menuOptions: [], // 岗位权限设置树数据
			topTreeData: [], // 岗位树顶级menuId（全选使用）
			selectTreeData: [], // 选中的数据
      deptNodeAll: false,
      editJobs: true,
			

      allChecked: false,
			jobName: "",
			roleId: '',
			
			
     
      //
      editJobInfo: {
        roleName: "",
        id: "",
        roleNumber: "",
      },
      canDelete: true,
      models: [],
    };
  },
	watch: {
	  selectTreeData: {
			deep: true,
			handler(newV) {
				this.pickerAll(newV);
			},
		},
	},
	onLoad(option) {
		this.getList();
		if(option.params) {
			let params = JSON.parse(option.params)
			if(params.jobs) {
				this.editJobs = false;
				this.jobName = params.jobs
				this.roleId = params.roleId
				this.$nextTick(() => {
					if (this.$refs.DaTreeRef != undefined) {
					  this.$refs.DaTreeRef.setCheckedKeys([], true);
					}
					this.roleCheck();
					
				})
			}
		}
	},
  methods: {
		// 树形组件操作事件
		handleTreeChange(value) {
			this.selectTreeData = value
		},
    /** 查询菜单列表 */
    getList() {
			this.topTreeData = []
      subAccountController.getSysRolesMenuList().then((response) => {
        let menuList = handleTree(response.data, "menuId");
				this.menuOptions = menuList;
				menuList.forEach(item => {
					this.topTreeData.push(item.menuId)
				})
      });
    },
    //全选/全不选
    handleCheckedTreeNodeAll(value) {
			this.deptNodeAll = value
			if(value) {
				this.$refs.DaTreeRef.setCheckedKeys(this.topTreeData, true)
			} else {
				this.$refs.DaTreeRef.setCheckedKeys(this.topTreeData, false)
			}
    },
    //反选-角色权限
    roleCheck() {
     subAccountController.getRoleModuleById({ roleId: this.roleId }).then(res => {
			 if (res.code == 200) {
					this.$nextTick(() => {
						this.selectTreeData = res.data

						this.$refs.DaTreeRef.setCheckedKeys(res.data ?? [], true);	
						this.pickerAll(res.data ?? []); // 判断全选按钮是否需要勾上		
					})
							
			 }
		 })
    },
		/**
		 * 新增/编辑提交操作
		 */
		submitEvent() {
			if(this.roleId) {
				// 编辑	
				let data = {
					models: this.selectTreeData + '',
					roleId: this.roleId,
					roleName: this.jobName
				}
				subAccountController.putSysRole(data).then(res => {
					if(res.code === 200) {
						this.roleCheck()
						this.$toast("修改成功！")
						this.editJobs = false
					}
				})
				
			} else {
				// 新增
				if(this.jobName) {
					subAccountController.addSysRole({
						modules: this.selectTreeData + '',
						roleName: this.jobName
					}).then(res => {
						if(res.code == 200) {
							this.$toast('新增角色成功！')
							this.$goBack()
						}
					})
				} else {
					this.$toast("请输入角色名称~");
				}
			}
		},
    //删除角色
    async deleteJob() {
			this.$modal("确定要删除岗位角色?").then(() => {
				subAccountController.deleteSysRole({roleId: this.roleId}).then(res => {
					if(res.code == 200) {
						this.$toast("删除成功!")
						this.$goBack()
					}
				})
			})
    },

  
    //全选
    pickerAll(data) {
			if(data.length > 0 && this.topTreeData.every(element => data.includes(element))) {
				this.deptNodeAll = true
			} else {
				this.deptNodeAll = false
			}
			
    },
  },
};
</script>

<style lang="less" scoped>
.createJobs {
  width: 100%;
  background: #f5f6f7;
  min-height: 100vh;
  overflow: auto;
}

.create-role {
  padding-top: 12px;

  .header {
    align-items: center;
    background-color: #fff;
    color: #292424;
    display: flex;
    font-size: 15px;
    height: 50px;
    padding: 0 12px;
    position: relative;

    .header-label {
      color: #262626;
      font-size: 16px;
      font-weight: 400;
      height: 22px;
      line-height: 22px;
    }

    .header-input {
      border: unset;
      flex: 1;
      font-size: 16px;
      font-weight: 400;
      height: 22px;
      line-height: 22px;
      margin-bottom: 0;
      text-align: right;
    }
  }

  .title {
    color: #595959;
    font-size: 14px;
    font-weight: 400;
    height: 20px;
    line-height: 20px;
    margin: 16px 0 8px 12px;
    position: relative;
  }

  .all-function-box {
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    height: 49px;
    justify-content: space-between;
    padding: 0 12px;

    .all-function-label {
      color: #262626;
      font-size: 16px;
      font-weight: 700;
      height: 22px;
      line-height: 22px;
    }
  }

  .container {
    padding-bottom: 75px;

    .container-content {
      background-color: #fff;
      padding: 0 10px 10px;

      .card {
        .name {
          color: #262626;
          font-size: 16px;
          font-weight: 700;
          height: 50px;
          line-height: 50px;
        }

        .panel-content {
          border-left: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
          border-top: 1px solid #e6e6e6;
          margin-top: 3px;
          background: #fff;
          overflow: hidden;
          height: 0;
          transition: height linear 0.3s;

          .item {
            border-bottom: 1px solid #e5e5e5;
            color: #262626;
            display: table;
            font-size: 16px;
            font-weight: 400;
            height: 50px;
            padding: 0 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .item-next {
            padding-left: 25px;
          }

          .item-next-50 {
            padding-left: 50px;
          }
        }

        .panel-con {
          height: auto;
        }
      }
    }

    .none-click {
      pointer-events: none;
    }
  }

  .footer-sub {
    background: #fff;
    bottom: 0;
    display: flex;
    padding: 8px 12px;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;

    .btn {
      background-color: #5241ff;
      border: unset;
      border-radius: 4px;
      color: #fff;
      flex: 1;
      font-size: 18px;
      font-weight: 400;
      height: 48px;
      line-height: 48px;
    }
  }
}

.all-check {
  padding: 10px 0;
}

::v-deep .el-tree-node__label {
  font-size: 16px;
}

::v-deep .el-tree-node__content {
  padding: 10px 0;
  // border-bottom: 1px dashed transparent;
  // background: linear-gradient(white,white) padding-box,
  //   repeating-linear-gradient(-45deg,#ccc 0, #ccc 0.25em,white 0,white 0.75em);
}

::v-deep .el-checkbox__original {
  width: 25px;
  height: 25px;
}

::v-deep .el-checkbox__inner {
  width: 25px;
  height: 25px;
  position: relative !important;
}

::v-deep .el-checkbox__inner::after {
  border: 3px solid #fff;
  position: absolute;
  border-left: 0;
  border-top: 0;
  width: 5px;
  height: 12px;
  top: 25%;
  left: 50%;
  transform: rotate(45deg) scaleY(1) translateX(-50%) !important;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #5241ff;
  border-color: #5241ff;
}

::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #5241ff;
  border-color: #5241ff;
}

::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #5241ff;
}

::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #5241ff;
}
</style>