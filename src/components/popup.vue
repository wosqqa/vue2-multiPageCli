<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="popup" :class="[position ? 'popup-' + position : '']">
      <appRenticeShare ref="appRenticeShare" @openPopup="openPopup" @openShareApp="openShareApp"></appRenticeShare>
				<div v-if="videoPlayShowTips" style="font-size: 13px;padding-bottom: 0.26rem;color: #333333;text-align: center;background-color: #f0f0f0;">不能用
					<img src="../assets/img/share/weixin@2x.png" style="height:1.1rem;width:1.1rem;vertical-align: middle;" />
				 微信分享<span style="color: #55AAEC;" @click="openVideoPlay(true)"> “点击查看教程”</span></div>
				<div  class="popup-close"  @click="openPopup(false)">取消</div>
    </div>
  </transition>
</template>


<script type="text/babel">
import Popup from "vue-popup";
import "vue-popup/lib/popup.css";
import { hostname } from "@/api/api";
import GLOBAL from "@/assets/js/lib/app.global";
const videoPlay = resolve =>
  require(["@/components/app_videoPlay.vue"], resolve);
const appRenticeShare = resolve =>
  require(["@/components/app_renticeShare.vue"], resolve);

export default {
  name: "mt-popup",
  mixins: [Popup],
  props: {
    modal: {
      default: true
    },
    modalFade: {
      default: false
    },
    lockScroll: {
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    popupTransition: {
      type: String,
      default: "popup-slide"
    },
    position: {
      type: String,
      default: ""
    },
    qqIconOnoff: {
      default: 1
    },
    videoPlayShowTips: {
      default: false
    },
  },
  components: {
    appRenticeShare,
    videoPlay
  },
  data() {
    return {
      currentValue: false,
      urlParam: "",
      clickNum: "",
      currentTransition: this.popupTransition
    };
  },
  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.currentValue = val;
    }
  },
  beforeMount() {
    if (this.popupTransition !== "popup-fade") {
      this.currentTransition = `popup-slide-${this.position}`;
    }
  },
  mounted() {
    let _this = this;
    _this.urlParam = _this.$route.query;
    if (_this.value) {
      _this.rendered = true;
      _this.currentValue = true;
      _this.open();
    }
  },
  methods: {
    openVideoPlay(type){
      this.$emit("openVideoPlay", type);
    },
    openPopup(type) {
      this.$emit("openPopup", type);
    },
    openShareApp(type) {
      // 分享
      let obj;
      let timestamp = Date.parse(new Date());
      if (this.clickNum == "" || timestamp - this.clickNum > 1000) {
        //5秒内不能重复提交
        if (type == "mdm") {
          //二维码
          obj = {
            // 'method': 'showIncome',
            // 'url': hostname + 'appIncome',
            method: "faceToFaceInvite",
            url: hostname + "/qr_invite.html#/"
          };
          GLOBAL.App().sentLog(348);
          GLOBAL.App().uploadActivityLog(
            hostname + "/qr_invite.html#/",
            null,
            1050007,
            "invitefriend",
            "click",
            "entry",
            ""
          );
        } else if (type == "dx") {
          //短信
          obj = {
            method: "gotoAddBookList",
            type: 0
          };
          GLOBAL.App().sentLog(352);
        } else if (type == "qf") {
          //群发
          obj = {
            method: "groupInvite",
            url:
              hostname.replace("apprentice2", "apprentice") +
              "/index.html#/appInviteMass"
          };
          GLOBAL.App().sentLog(564);
          GLOBAL.App().uploadActivityLog(
            hostname + "/invite_mass.html#/",
            null,
            1060008,
            "invitefriend",
            "click",
            "entry",
            ""
          );
        } else {
          if (type == "wx" || type == "bwx") {
            //微信
            type = 0;
            if (type == "wx") {
              GLOBAL.App().sentLog(350);
            } else {
              GLOBAL.App().sentLog(720);
            }
            GLOBAL.App().uploadActivityLog(
              null,
              "X",
              1000002,
              "invitefriend",
              "click",
              "share",
              ""
            );
          } else if (type == "qq") {
            //QQ
            type = 1;
            GLOBAL.App().sentLog(351);
            GLOBAL.App().uploadActivityLog(
              null,
              "",
              1000005,
              "invitefriend",
              "click",
              "entry",
              ""
            );
            if (
              this.qqIconOnoff == "1" &&
              !(
                Number(this.urlParam.appver.substring(0, 1)) <= 2 &&
                Number(this.urlParam.appver.slice(2)) < 2
              )
            ) {
              let ObjUrl = {
                method: "ToNewWebPage",
                url:
                  hostname +
                  "/qr_invite.html#/qqLuck?random=" +
                  Math.random() * 100000,
                // 'url': "http://172.18.5.108:8888/#/appRenticeChai?random=" + Math.random() * 100000,
                type: "0"
              };
              GLOBAL.App().postMessage(ObjUrl);
              return;
            }
          } else if (type == "wb") {
            //微博
            type = 2;
            GLOBAL.App().sentLog(353);
            GLOBAL.App().uploadActivityLog(
              null,
              null,
              1000002,
              "invitefriend",
              "click",
              "share",
              ""
            );
          } else if (type == "pyq" || type == "bpyq") {
            //朋友圈
            type = 3;
            if (type == "bpyq") {
              GLOBAL.App().sentLog(721);
            } else {
              GLOBAL.App().sentLog(349);
            }

            GLOBAL.App().uploadActivityLog(
              null,
              "Y",
              1000002,
              "invitefriend",
              "click",
              "share",
              ""
            );
          }
          obj = {
            method: "shareInviteInfo",
            type: type
          };
        }
        try {
          GLOBAL.App().postMessage(obj);
        } catch (e) {
          console.error(e);
        }
      }
      this.clickNum = timestamp;
    }
  }
};
</script>


<style  lang="scss">

  .video-share {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3000;
    top: 0;
    left: 0;
    background-color: #000000;
  }

.popup {
  position: fixed;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  transition: 0.2s ease-out;
  .popup-close {
    text-align: center;
    font-size: 18px;
    line-height: 1.34rem;
    border-top: 1px solid #e8e8e8;
  }
  .video-share-btn {
    background-color: #4e9af2;
    margin: 0.5rem 3rem;
    line-height: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    color: #fff;
    font-size: 0.38rem;
  }
}
.popup-top {
  top: 0;
  right: auto;
  bottom: auto;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.popup-right {
  top: 50%;
  right: 0;
  bottom: auto;
  left: auto;
  transform: translate3d(0, -50%, 0);
}
.popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.popup-left {
  top: 50%;
  right: auto;
  bottom: auto;
  left: 0;
  transform: translate3d(0, -50%, 0);
}

.popup-slide-top-enter,
.popup-slide-top-leave-active {
  transform: translate3d(-50%, -100%, 0);
}
.popup-slide-right-enter,
.popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}
.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translate3d(-50%, 100%, 0);
}
.popup-slide-left-enter,
.popup-slide-left-leave-active {
  transform: translate3d(-100%, -50%, 0);
}
.popup-fade-enter,
.popup-fade-leave-active {
  opacity: 0;
}
</style>