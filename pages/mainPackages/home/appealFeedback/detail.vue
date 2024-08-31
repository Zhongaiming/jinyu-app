<template>
  <view class="couple-detail">
	<xls-jy-navbar title="申诉详情"></xls-jy-navbar>
    <view class="complaint-details">
      <view class="top-content">
        <xls-image :src="`${$baseUrl}appV4/image/couple/state-icon.png`" alt="" class="image"/>
        <span class="text">{{conductorStateDict[coupleDetail.conductorState]}}</span>
      </view>
      <!-- 选择处理方式 微信-->
      <view class="details-list" v-show="coupleDetail.sourceType == 1&&coupleDetail.conductorState==1">
        <view class="title-type">选择处理方式:</view>
        <view class="reason-wrapper">
          <u-radio-group v-model="pickerReason" class="reason-group">
            <u-radio :name="item.id" class="reason-radio-item" checked-color="#5241FF"
              v-for="(item, index) in reasonList" :key="index" @click="responseContent = item.resMsg">{{ item.resTitle}}</u-radio>
          </u-radio-group>
          <textarea placeholder="请输入具体协商情况,至少10个字 ，此留言将直接同步消费者。" v-model="responseContent" class="area-content"
            :disabled="pickerReason != 6"></textarea>
          <view class="upload">
            <u-upload v-model="fileList" :before-read="beforeRead" :after-read="afterRead" @delete="deleteRead"
              :max-count="4">
              <view class="upload-img">
                <view class="main-wrapper">
                  <view>
                    <xls-image :src="`${$baseUrl}appV4/image/couple/camera.png`" alt="" class="image"/>
                  </view>
                  <view>上传图片</view>
                </view>
              </view>
            </u-upload>
          </view>
          <view class="tips">
            <view class="text">支付扩展名:jpg、jpeg、png</view>
            <view class="text">最多上传4张图片,每张图片大小不超过5M</view>
          </view>
        </view>
        <view class="footer-btn-wrapper">
          <view class="btn" @click="replyWx">回复</view>
        </view>
        <view class="footer-btn-wrapper">
          <view class="btn close-btn" @click="closeReply">
            已协商处理，关闭投诉
          </view>
        </view>
      </view>
      <!-- 处理方式 支付宝 -->
      <view class="details-list" v-show="coupleDetail.sourceType == 3 && coupleDetail.conductorState == 1
          ">
        <view class="title-type">选择处理方式:</view>
        <view class="reason-wrapper">
          <u-radio-group v-model="pickerReasonZFB" class="reason-group">
            <u-radio :name="item.id" class="reason-radio-item" checked-color="#5241FF"
              v-for="(item, index) in reasonListZFB" :key="index" @click="responseContent = item.resMsg">{{
				  item.resTitle }}</u-radio>
          </u-radio-group>
          <textarea placeholder="请输入具体协商情况,至少10个字 ，此留言将直接同步消费者。" v-model="responseContent" class="area-content"
            :disabled="pickerReasonZFB != 5"></textarea>
        </view>
        <view class="footer-btn-wrapper">
          <view class="btn" @click="closeReply">回复处理，关闭投诉</view>
        </view>
      </view>
      <!-- 详情信息 -->
      <view class="details-list">
        <view class="image-content" v-show="coupleDetail.sourceType == 2">
          <view class="txt-detail">{{ coupleDetail.problemDescription }}</view>
          <img :src="coupleDetail.problemImg" alt="" class="img" @click="imgView([coupleDetail.problemImg], 0)"
            v-show="coupleDetail.problemImg" />
        </view>
        <view class="list-content">
          <view class="info">
            <span class="field">反馈类型</span>
            <span class="value">{{coupleDetail.feedbackType == 1?'问题':coupleDetail.feedbackType==2?'意见':'投诉'}}</span>
          </view>
          <view class="info">
            <span class="field">投诉时间</span>
            <span class="value" v-html="coupleDetail.complaintTime"></span>
          </view>
          <view class="info">
            <span class="field">用户昵称/ID</span>
            <span class="value" v-html="coupleDetail.claimantName + '/' + coupleDetail.claimantId"></span>
          </view>
          <view class="info">
            <span class="field">用户联系方式</span>
            <span class="value" v-html="coupleDetail.phone"></span>
          </view>
          <view class="info" v-show="coupleDetail.orderNo">
            <span class="field">支付订单号</span>
            <span class="value" v-html="coupleDetail.orderNo" @click="goTo('order')"></span>
            <span class="order">&gt;</span>
          </view>
          <view class="operate" v-show="coupleDetail.orderNo">
            <span class="remote" @click="goTo('remote')">
              {{ coupleDetail.deviceNumber}}-{{coupleDetail.shippingSpace }}-{{coupleDetail.railNumber }}远程启动</span>
            <span class="send-coins" v-show="0">派发福利</span>
          </view>
          <view class="info">
            <span class="field">设备类型</span><span class="value" v-html="coupleDetail.deviceTypeName"></span>
          </view>
          <view class="info">
            <span class="field">当前设备状态</span><span class="value" v-html="coupleDetail.onlineState ? '在线' : '离线'"></span>
          </view>
          <view class="info">
            <span class="field">设备编码</span><span class="value" v-html="coupleDetail.deviceNumber"></span>
          </view>
          <view class="info">
            <span class="field">设备场地</span><span class="value" v-html="coupleDetail.placeName"></span>
          </view>
        </view>
      </view>
      <!-- 系统回复 -->
      <view class="reply" v-show="coupleDetail.conductorState == 1 && coupleDetail.sourceType == 2
          ">
        <view class="title">回复内容</view>
        <view class="textarea">
          <u--textarea v-model="problemDescription" type="textarea" maxlength="40" placeholder="请输入回复内容"
            count />
        </view>
      </view>
      <view class="bottom-wrapper" v-show="coupleDetail.conductorState == 1 && coupleDetail.sourceType == 2">
        <view class="footer-btn" @click="handCouple">回复</view>
      </view>
      <!-- 协商历史 -微信 -->
      <view class="egotiate-history" v-if="coupleDetail.sourceType == 1">
        <view class="big-title">协商历史</view>
        <view class="content-info" v-for="(item, index) in historyList" :key="index">
          <view class="left">
            <span class="head"><span class="point"></span></span>
            <span class="line"></span>
          </view>
          <view class="right" style="margin: 0">
            <view class="top">
              <view class="name text-over">
                {{ item.type == 2 ? item.conductorName : item.claimantName
                }}<span>{{ item.type == 2 ? "(我)" : "(投诉人)" }}</span>
              </view>
              <view class="gust-time">
                {{ item.type == 2 ? item.conductorTime : item.complaintTime }}
              </view>
            </view>
            <view class="bottom">
              <view class="gust-commit">
                {{item.type == 2?item.replyContent:item.problemDescription}}
              </view>
            </view>
            <view class="images-wrapper" v-if="item.complaintImageUrl">
              <img v-for="(items, index) in changeParse(item.complaintImageUrl)" :key="index" :src="items" alt=""
                @click="imgView(JSON.parse(item.complaintImageUrl), index)" />
            </view>
          </view>
        </view>
      </view>
      <!-- 协商历史 -长回复系统 -->
      <view class="egotiate-history" v-if="coupleDetail.sourceType==2&&historyList.length">
        <view class="big-title">协商历史</view>
        <view v-for="(item, index) in historyList" :key="index">
          <!-- 投诉 -->
          <view class="content-info" v-show="item.problemDescription">
            <view class="left">
              <span class="head"><span class="point"></span></span>
              <span class="line"></span>
            </view>
            <view class="right">
              <view class="top">
                <view class="name text-over">
                  {{ item.claimantName }}<span>(投诉人)</span>
                </view>
                <view class="gust-time">
                  {{ item.complaintTime }}
                </view>
              </view>
              <view class="bottom">
                <view class="gust-commit">
                  {{ item.problemDescription }}
                </view>
                <view class="images"></view>
              </view>
            </view>
          </view>
          <!-- 回复 -->
          <view class="content-info" v-show="item.replyContent">
            <view class="left">
              <span class="head"><span class="point"></span></span>
              <span class="line"></span>
            </view>
            <view class="right">
              <view class="top">
                <view class="name text-over">
                  {{ item.conductorName }}<span>(我)</span>
                </view>
                <view class="gust-time">
                  {{ item.conductorTime }}
                </view>
              </view>
              <view class="bottom">
                <view class="gust-commit">
                  {{ item.replyContent }}
                </view>
                <view class="images"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 普通单回复 -->
      <view class="egotiate-history" v-if="coupleDetail.sourceType == 2 &&!historyList.length && coupleDetail.replyContent">
        <view class="big-title">协商历史</view>
        <view class="content-info">
          <view class="left">
            <span class="head"><span class="point"></span></span>
            <span class="line"></span>
          </view>
          <view class="right">
            <view class="top">
              <view class="name text-over">
                {{ coupleDetail.conductorName }}(我)
              </view>
              <view class="gust-time">{{ coupleDetail.conductorTime }}</view>
            </view>
            <view class="bottom">
              <view class="gust-commit">{{ coupleDetail.replyContent }}</view>
              <view class="images"></view>
            </view>
          </view>
        </view>
      </view>
      <!-- 支付宝回复 -->
      <view class="egotiate-history" v-if="coupleDetail.sourceType==3&&coupleDetail.reply.length">
        <view class="big-title">协商历史</view>
        <view class="content-info">
          <view class="left">
            <span class="head"><span class="point"></span></span>
            <span class="line"></span>
          </view>
          <view class="right">
            <view class="top">
              <view class="name text-over">
                {{ coupleDetail.claimantName }}(投诉人)
              </view>
              <view class="gust-time">{{ coupleDetail.complaintTime }}</view>
            </view>
            <view class="bottom">
              <view class="gust-commit">{{ coupleDetail.problemDescription }}</view>
              <view class="images"></view>
            </view>
          </view>
        </view>
        <view class="content-info" v-if="coupleDetail.replyContent">
          <view class="left">
            <span class="head"><span class="point"></span></span>
            <span class="line"></span>
          </view>
          <view class="right">
            <view class="top">
              <view class="name text-over">
                {{ coupleDetail.conductorName }}(我)
              </view>
              <view class="gust-time">{{ coupleDetail.conductorTime }}</view>
            </view>
            <view class="bottom">
              <view class="gust-commit">{{ coupleDetail.replyContent }}</view>
              <view class="images"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import { ImagePreview } from "vant";
// import { compress } from "@/plugins/imageZip";
// import api from "@/utils/api/couple";
// import qs from "qs";
import {
	appealController
} from '@/api/index.js';
export default {
  name: "coupleDetail",
  data() {
    return {
      problemDescription: "",
      coupleDetail: {
        id: "",
      },
      pickerReason: 6,
      responseContent: "",
      reasonList: [
        {
          id: 1,
          resTitle: "已协商处理",
          resMsg:
            "您的反馈已处理完毕，请于微信支付订单进行撤诉操作，感谢您的配合。",
        },
        {
          id: 2,
          resTitle: "已协商退款",
          resMsg:
            "您好,该投诉已双方协商并线下退款，请您于微信支付订单进行撤诉操作，感谢您的配合。",
        },
        {
          id: 3,
          resTitle: "已协商并派发福利",
          resMsg:
            "您好,该投诉已双方协商处理并线下派发福利，请您于微信支付订单进行撤诉操作，感谢您的配合。",
        },
        {
          id: 4,
          resTitle: "无法联系到消费者",
          resMsg:
            "您好！已多次联系，均无法联系到您，给您带来不便，敬请见谅。如有需协助处理，请拨打客服电话。",
        },
        {
          id: 5,
          resTitle: "无联系方式",
          resMsg:
            "您好！无法获取您的联系方式，给您带来不便，敬请见谅。如有需协助处理，请拨打客服电话。",
        },
        {
          id: 7,
          resTitle: "常用回复",
          resMsg:
            "您好！申诉问题已经解决，如有问题请继续申诉，资金预计10分钟左右到账。",
        },
        {
          id: 6,
          resTitle: "其他",
          resMsg: "",
        },
      ],
      pickerReasonZFB: 5,
      reasonListZFB: [
        {
          id: 1,
          resTitle: "已协商",
          resMsg: "已联系到用户，协商一致，无异议",
          code: "CONSENSUS_WITH_CLIENT"
        },
        {
          id: 2,
          resTitle: "已整改",
          resMsg: "不涉及退款，已针对投诉内容进行整改",
          code: "RECTIFICATION_NO_REFUND"
        },
        {
          id: 3,
          resTitle: "已退款",
          resMsg: "已退款，用户无异议",
          code: "REFUND"
        },
        {
          id: 4,
          resTitle: "已提交",
          resMsg: "已提交证明材料",
          code: "SUBMIT_PROOF_NOT_CONTACTED"
        },
        {
          id: 5,
          resTitle: "其他",
          resMsg: "",
          code: "ORTHER"
        },
      ],
      fileList: [],
      responseImages: [],
      historyList: [],
	  conductorStateDict: {
		  1: '问题待处理',
		  2: '已处理',
		  3: '已回复',
		  4: '已关闭',
	  },
    };
  },
  onLoad(option) {
    if (option.params) {
		const {id} = JSON.parse(option.params)
		this.getDetail(id);
    }
  },
  methods: {
	goTo() {
		
		// $router.push({
		//   name: 'orderCenter',
		//   query: { transactionId: coupleDetail.orderNo },
		// })
		// "  
		
		// $router.push({
		//   name: 'deviceStartup',
		//   query: {
		//     deviceNumber: coupleDetail.deviceNumber,
		//     deviceTypeId:
		//       coupleDetail.deviceTypeName == '扭蛋机' ? 2 : 1,
		//     railSpace: coupleDetail.shippingSpace,
		//     railNumber: coupleDetail.railNumber,
		//   },
		// })
	},
    //查询详情
    async getDetail(id) {
      let res = await appealController.getRepresentationDetail({ id });
      if (res.code == 200) {
        this.coupleDetail = res.data;
        this.historyList = res.data.reply ? res.data.reply : [];
      }
    },
    //上传图片
    async beforeRead(file) {
      const uploadTypes = ["jpg", "png", "bmp"];
      const filetype = file.name.replace(/.+\./, "");
      if (uploadTypes.indexOf(filetype.toLowerCase()) === -1) {
        return this.$toast({ message: "请上传格式为：jpg, png, bmp的图片~" });
      }
      return compress(file);
    },
    async afterRead(file) {
      if (this.coupleDetail.sourceType == 3) {
        let formData = new FormData();
        formData.append('file_content', file.file);
        let zfb = await api.setComplaintsImgZfb(formData);
        if (zfb.data.code == 200) {
          this.$toast("上传成功~");
          let obj = JSON.parse(zfb.data.msg).alipay_security_risk_complaint_file_upload_response;
          this.responseImages.push({
            img_url: obj.file_url,
            img_url_key: obj.file_key
          });
        }
      } else {
        let base64 = file.content.substring(file.content.indexOf(",") + 1);
        let res = await api.setComplaintsImg(
          qs.stringify({
            buf: base64,
            filePath: file.file.name,
          })
        );
        if (res.data.code == 200) {
          this.$toast("上传成功~");
          this.responseImages.push(JSON.parse(res.data.msg).media_id);
        }
      }
    },
    deleteRead(file, index) {
      this.responseImages.splice(index.index, 1);
    },
    changeParse(value) {
      return JSON.parse(value);
    },
    imgView(urlList, index) {
      ImagePreview({
        images: urlList,
        startPosition: index,
      });
    },
    //处理申诉_系统
    async handCouple() {
      if (!this.problemDescription) {
        return this.$toast("回复内容不能为空");
      }
      let res = await appealController.handleRepresentation({
        id: this.coupleDetail.id,
        replyContent: this.problemDescription,
      });
      if (res.data.code == 0 || res.data.msg == "ok") {
        this.$dialog
          .alert({
            title: "温馨提示",
            message: "处理成功",
            confirmButtonColor: "#5241FF",
          })
          .then(() => {
            this.$parent.detailItem.conductorState = 2;
            this.$store.state.coupleNum = this.$store.state.coupleNum - 1;
            this.$router.back();
          });
      }
    },
    //微信回复
    async replyWx() {
      if (this.responseContent.length < 10) {
        return this.$toast("不少于10个字~");
      }
      let res = await api.replyFeed(
        qs.stringify({
          complaintId: this.coupleDetail.complaintId,
          responseContent: this.responseContent,
          responseImages: JSON.stringify(this.responseImages),
          sourceType: this.coupleDetail.sourceType
        })
      );
      if (res.data.code == 0 || res.data.msg == "ok") {
        this.$dialog
          .alert({
            title: "温馨提示",
            message: "回复成功",
            confirmButtonColor: "#5241FF",
          })
          .then(() => {
            this.getDetail();
            this.pickerReason = 6;
            this.responseContent = "";
          });
      }
    },
    //反馈完成
    async closeReply() {
      if (this.coupleDetail.sourceType == 3 && !this.responseContent) {
        return this.$toast("请输入处理回复！")
      }
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确定已经协商完成吗？",
          width: "270",
        })
        .then(() => {
          let params = {
            complaints: this.coupleDetail.complaintId,
            sourceType: this.coupleDetail.sourceType
          }
          if (this.coupleDetail.sourceType == 3) {
            params['complaintId'] = this.coupleDetail.complaintId
            params['process_code'] = this.reasonListZFB[this.pickerReasonZFB - 1].code
            params['remark'] = this.pickerReasonZFB != 5 ? this.reasonListZFB[this.pickerReasonZFB - 1].resMsg : this.responseContent;
            params['img_file_list'] = this.responseImages
          }
          console.log("req参数", params)
          api.finishReply({
            complaintId: this.coupleDetail.complaintId,
            process_code: this.reasonListZFB[this.pickerReasonZFB - 1].code,
            remark: this.pickerReasonZFB != 5 ? this.reasonListZFB[this.pickerReasonZFB - 1].resMsg : this.responseContent,
            img_file_list: this.responseImages,
            sourceType: this.coupleDetail.sourceType
          }).then((res) => {
            if (res.data.code == 0 || res.data.msg == "ok") {
              this.$parent.detailItem.conductorState = 2;
              this.$store.state.coupleNum = this.$store.state.coupleNum - 1;
              this.$router.back();
            }
          });
        })
        .catch(() => { });
    },
  },
};
</script>

<style lang="scss" scoped>
.couple-detail {
  width: 100%;
  font-size: 24rpx;
}

.complaint-details {
  width: 100%;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  background: linear-gradient(180deg, #5241ff, #f7f9fa);
  background-repeat: no-repeat;
  background-size: 100% 85vh;
  padding: 10px 12.5px 60px;

  .top-content {
    align-items: center;
    color: #fff;
    display: flex;
    justify-content: center;
    padding-bottom: 15px;
    padding-top: 5px;
    text-align: center;

    .image {
      height: 21px;
      margin-right: 10px;
      width: 21px;
    }

    .text {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .details-list {
    background: #fff;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 10px;

    .title-type {
      color: #333;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 15px;
    }

    .reason-wrapper {
      width: 100%;

      .reason-group {
        display: flex;
        flex-wrap: wrap;
        z-index: 2014;

        .reason-radio-item {
          margin-bottom: 10px;
          width: 50%;
          font-size: 14px;
          color: #000;
        }
      }

      .area-content {
        background: #fafafa;
        border: 1px dashed #e6e6e6;
        border-radius: 9px;
        font-size: 13px;
        height: 80px;
        margin-top: 10px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        resize: none;
      }

      .upload {
        padding: 10px 15px 0;
        background: #fafafa;

        .upload-img {
          width: 64px;
          height: 64px;
          border: 1px dashed #999;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;

          .main-wrapper {
            font-size: 11px;
            color: #999;

            .image {
              width: 25px;
              height: 25px;
            }
          }
        }
      }

      .tips {
        padding: 10px 15px;
        background: #fafafa;

        .text {
          color: #bbb;
          font-family: PingFangSC-Regular, PingFang SC;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }

    .footer-btn-wrapper {
      margin: 20px 15px 5px;

      .btn {
        height: 44px;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
        line-height: 44px;
        font-weight: 400;
        color: #fff;
        background: #5241ff;
      }

      .close-btn {
        color: #5241ff;
        background: #fff;
        box-sizing: border-box;
        border: 1px solid #5241ff;
      }
    }

    .image-content {
      .txt-detail {
        font-size: 15px;
        line-height: 18px;
        margin-bottom: 10px;
      }

      .img {
        width: 80px;
        height: 80px;
      }
    }

    .info {
      display: flex;
      margin-top: 10px;
      align-items: center;

      .order {
        padding-left: 10px;
        font-size: 13px;
      }

      .field {
        color: #8b8b8c;
        display: inline-block;
        font-size: 13px;
        font-weight: 400;
      }

      .value {
        flex: 1;
        display: inline-block;
        display: flex;
        justify-content: flex-end;
      }
    }

    .operate {
      background: #f5f6f7;
      border-radius: 4px;
      margin-top: 10px;
      padding: 7px 16px 7px 0;
      position: relative;
      text-align: right;

      .remote {
        color: #03bf79;
        margin-right: 0;
      }

      .send-coins {
        color: #ff4747;
      }
    }
  }

  .egotiate-history {
    background: #fff;
    margin-top: 10px;
    padding: 12px;
    border-radius: 8px;

    .big-title {
      font-size: 16px;
      font-weight: 500;
    }

    .content-info {
      display: flex;
      min-height: 144px;
      padding-top: 12px;

      .left {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin-right: 8px;
        width: 20px;

        .head {
          align-items: center;
          display: inline-flex;
          height: 20px;
          justify-content: center;
          width: 20px;
          background-color: rgba(71, 133, 255, 0.11);
          border-radius: 50%;

          .point {
            background: #5241ff;
            border-radius: 50%;
            display: inline-block;
            height: 8px;
            width: 8px;
          }
        }

        .line {
          background: linear-gradient(180deg, #5241ff, #fff);
          display: inline-block;
          height: 100%;
          margin-top: 2px;
          min-height: 109px;
          width: 2px;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        flex: 1;

        .top {
          display: flex;
          align-items: center;
          width: 100%;

          .name {
            font-size: 14px;
            flex: 1;
          }

          .gust-time {
            color: #a4a5a6;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .bottom {
          background: #f5f6f7;
          border-radius: 4px;
          color: #262626;
          font-size: 14px;
          font-weight: 400;
          margin-top: 12px;
          padding: 12px;
          text-align: left;
        }

        .reply-bg {
          background: rgba(253, 217, 223, 0.38);
        }
      }
    }
  }

  .reply {
    background: #fff;
    border-radius: 8px;
    margin: 8px 0 16px;
    padding: 12px;

    .title {
      color: #262626;
      font-size: 16px;
      font-weight: 500;
      padding: 12px;
      padding-top: 0;
    }

    .textarea {
      background: #fff;
      border: 1px solid #edeef0;
      border-radius: 4px;
    }
  }

  .bottom-wrapper {
    display: flex;
    align-items: center;
  }

  .footer-btn {
    flex: 1;
    background: #5241ff;
    border-radius: 4px;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 10px;
    padding: 13px 0;
    text-align: center;
  }
}

::v-deep .u-uploader__preview-image {
  width: 64px;
  height: 64px;
}

.images-wrapper {
  display: flex;
  padding: 0px 10px 0;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  max-width: 298px;
  overflow-x: scroll;

  img {
    width: 46px;
    height: 46px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    margin-bottom: 8px;
  }
}
</style>