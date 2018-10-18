<template>
	<div class="swiper-fixed" v-show="loadingData">
      <div class="swiper-container gallery-top">
            <div class="swiper-wrapper">
				<div class="swiper-slide" v-if="tabActive==index" v-for="(item,index) in balance.plan" :key="index" :id="index">
					<!-- <div class="swiper-slide swiper-no-swiping">
						<div>
							<img class="swiper-slide-img" :src="item.bg1" :alt="index">
						</div>{{totalmoney}}
					</div> -->
					<div class="swiper-slide swiper-no-swiping">
						<div >
							<div class="swiper-slide-content">
                <img :src="avatar" alt="" v-if="qrimg!=''" class="content-avatar" >
							  <img v-else src="http://resources.dftoutiao.com/songheng/DFTT/default/img/dftt00000.png"  class="content-avatar"/>
								<div class="slide-content-num" :style="'color:'+item.color">{{totalmoney}}元
								</div>
								<!-- <div class="slide-content-txt"  :style="'color:#'+item.colour">到各手机应用市场搜索<span style="color: #ffd810;">[东方头条]</span>下载安装<br/>登录后输入邀请码
                <span style="color: #ffd810;">{{replaceInvite(urlParam.accid)}}</span>领红包</div> -->
							</div>
							<img class="swiper-slide-img" :id="'slide-active-'+index"  :src="item.ori_url" :alt="index">
						</div>
					</div>
				</div>
			</div>
          <div class="swiper-button-next swiper-button-black" @click="swiperSlide(tabActive+1,'next')"></div>
          <div class="swiper-button-prev swiper-button-black" @click="swiperSlide(tabActive-1,'prev')"></div>
      </div>
    	<div class="slide-content-ewm" :style="'position: fixed;width: '+positionQr.qr_length/75+'rem;height: '+positionQr.qr_height/75+'rem;left:'+positionQr.qr_from_left/75+'rem;top: '+positionQr.qr_from_top/75+'rem;'">
        <img :src="avatar" alt="" style="width: 0.8rem;height: 0.8rem; border-radius: 0.5rem; position: absolute;left: 40%;top: 40%;" v-if="qrimg!=''" class="content-avatar" >
        <img v-else alt="" style="width: 0.8rem;height: 0.8rem; border-radius: 0.5rem; position: absolute;left: 40%;top: 40%;" src="http://resources.dftoutiao.com/songheng/DFTT/default/img/dftt00000.png"  class="content-avatar"/>
        <img :src="qrimg" alt=""  :style="'width: '+positionQr.qr_length/75+'rem;height: '+positionQr.qr_height/75+'rem;'" :id="'qrimg-active_'+tabActive">
      </div>
	  <div class="gallery" id='gallery-box'>
		<div class="gallery-thumbs" id='gallery-thumbs' :style="styleWidth">
				<div :class="galleryStyle[index]" @click="swiperSlide(index,'bg')" v-for="(item,index) in balance.plan" :key="index"  :style="'background-image:url(' + item.thumb_url+')'">
					<div class="swiper-slide-icon">
            <div>
            </div>
          </div>
				</div>
		</div>
	  </div>
      
      <div class="box-bottom">
          <div id="slide-content-qrimg"></div>
          <div class="box-bottom-btn" v-if="totalmoney>0&&shareUrl!=''" @click="shareRewardCallBack">立即分享</div>
          <div class="box-bottom-btn" style="background-color: rgb(204, 204, 204);" v-else>立即分享</div>
          <div class="box-bottom-txt" v-if="balance.text&& totalmoney>0" v-html="replaceHtmlRed(balance.text,1)"></div>
          <div class="box-bottom-txt" v-else-if="!balance.text&& totalmoney>0">{{balance.text}}-每日首次分享奖励10金币，分享出去且朋友们看到后即发放奖励,分享后可至钱包查看</div>
          <div class="box-bottom-txt" v-else >你的收入还不够晒哦~快去赚钱吧！</div>
      </div>
  </div>
</template>

<script>
import { getbalance, jsonpGetData,wallet } from "@/scripts/api/api";
import GLOBAL from "@/scripts/util/app.global";
import QRCode from "qrcodejs2";
import stringUtils from '@/scripts/util/string.utils'


export default {
  data() {
    return {
      tabActive: 0,
      totalmoney:10,
      styleWidth: "",
      positionQr:{
						          color : "#000000",
                        "ori_url" : "https://resources.dftoutiao.com/songheng/toutiao/newbackstageimg/uploads/2018-08-01/5b612553d4b0c.png",
                        "pic_id" : 0,
                        "qr_from_left" : 255,
                        "qr_from_top" : 550,
                        "qr_height" : 240,
                        "qr_length" : 240,
                        "thumb_url" : "https://resources.dftoutiao.com/songheng/toutiao/newbackstageimg/uploads/2018-08-01/5b6125589f170.png",
                    },
      avatar:'',
      galleryStyle: [],
      loadingData:true,
      qrimg:'',
      shareUrl:'',
      urlParam: "",
      pollData: "",
      ycode:'',
	    balance:''
    };
  },
  watch: {
    tabActive: function(newValue, oldValue) {
      this.galleryStyle.splice(oldValue, 1, "swiper-slide");
      console.log(newValue)
      this.positionQr = this.balance.plan[newValue]
      this.galleryStyle.splice(
        newValue,
        1,
        "swiper-slide  swiper-slide-active"
      );
    }
  },
  created() {
    let scope = this;
    scope.webLoadComplete();
    scope.urlParam = scope.$route.query; 
    scope.avatar = scope.urlParam.avatar; 
    scope.ycode = stringUtils.replaceInvite(scope.urlParam.accid);
    scope.appReloadH5();
    // scope.pollData = JSON.parse(localStorage.getItem("pollData"));
    scope.getGrobalConfigInfo();
    scope.getMoneyBalance();
  },
  mounted() {
  },
  methods: {
    setQrimg(){
      let scope = this;
      var qrcode = new QRCode(document.getElementById("slide-content-qrimg"), {

        });
        qrcode.makeCode(scope.shareUrl);
        if(scope.shareUrl==''){
          scope.totalmoney = 0
        }else{
          if(scope.totalmoney<10){
            scope.totalmoney = (10 + parseFloat(scope.totalmoney)).toFixed(2);
          }
        }
        scope.loadingData = true;
        setTimeout(function(){
            scope.qrimg = document.getElementById("slide-content-qrimg").getElementsByTagName("img")[0].src;
        },300);
    },
    appReloadH5(){
      let scope = this;
      window.pushPollingInfo=function(res){//获取到polling/config数据
            scope.pollData = res
            scope.balance =scope.pollData.share_plan_xyzwt.income.z;
            scope.positionQr = scope.balance.plan[0]
            // GLOBAL.App().toast('多页pollData'+JSON.stringify(scope.balance))
            //初始化数据
            for (let i = 0; i < scope.balance.plan.length; i++) {
                if (i == 0) {
                  scope.galleryStyle.push("swiper-slide  swiper-slide-active");
                } else {
                  scope.galleryStyle.push("swiper-slide");
                }
              }
            scope.styleWidth = "width:" + 2.8 * scope.balance.plan.length + "rem";
            scope.tabActive = 0;
            scope.loadingData =true;
            // scope.getMoneyBalance();
            localStorage.setItem('pollData', JSON.stringify(res));
      }
      window.pushGetbalance = function(res){//获取到totalmoney数据
          scope.totalmoney = res;
          if(scope.totalmoney<10){
            scope.totalmoney = (10 + parseFloat(scope.totalmoney)).toFixed(2);
          }
          // else{
          //   let num = Number((Math.random()*0.7+1.4).toFixed(1)) //倍数1.4n~2.1n
          //   scope.totalmoney = Number((scope.totalmoney * num).toFixed(2));
          // }
      }
      window.nativeGetRandomUrlCallBack = function(res){//获取到二维码Url数据
          let Base64 = require('js-base64').Base64;
          let shareUrl=Base64.decode(res.key);
					scope.shareUrl = shareUrl;
          scope.setQrimg();
			}
    },
    replaceHtmlRed: function (value,type) {
            return stringUtils.replaceRed(value,type)
    },
    webLoadComplete(){
				let obj = {
					'method': 'webLoadComplete',
          }
				try {
					GLOBAL.App().postMessage(obj);
				} catch (e) { 
					console.error(e); 
        }
    },
    getGrobalConfigInfo(){
				let obj = {
					'method': 'getPollingInfo',
          }
				try {
          if(Number(this.urlParam.appver.substring(0,1))<=2 && Number(this.urlParam.appver.slice(2))<0.8){
            GLOBAL.App().toast('版本太低,请下载最新版App!')
          }else{
            GLOBAL.App().postMessage(obj);
          }
				} catch (e) { 
					console.error(e); 
        }
    },
    getMoneyBalance(){
      let scope = this;
      let listObj = {
        param: {
          accid: scope.urlParam.accid,
          type: "bonus"
        },
        callback: "getWalltBonus",
        url: wallet+"/qianbao/get_default" 
      };
      window.getWalltBonus = function(res) {
        if (res.status === "1") {
          scope.totalmoney = res.data.today.all_money;
          if (scope.totalmoney < 10) {
            scope.totalmoney = (10 + parseFloat(scope.totalmoney)).toFixed(2);
          }
        } else {
          GLOBAL.App().toast(res.msg);
        }
      };
      jsonpGetData(listObj);

      let objs = {
        'method': 'getMoneyBalance',
        'callback':'pushGetbalance'
        }
      try {
        GLOBAL.App().postMessage(objs);
      } catch (e) {
        console.error(e);
      }
    },
    replaceInvite: function (value) {
            return stringUtils.replaceInvite(value)
    },
    swiperSlide(index,type) {
      //上下页
      if (index == this.balance.plan.length) {
        this.tabActive = 0;
        document.getElementById("gallery-box").scrollLeft = 0;
      } else if (index < 0) {
        this.tabActive = this.balance.plan.length - 1;
        document.getElementById("gallery-box").scrollLeft =
              document.documentElement.clientWidth * 0.25;
      } else {
        this.tabActive = index;
        if (index > this.balance.plan.length / 2) {
          document.getElementById("gallery-box").scrollLeft =
          document.documentElement.clientWidth * 0.25;
        } else {
          document.getElementById("gallery-box").scrollLeft = 0;
        }
      }
      if(type=='bg'){
         GLOBAL.App().sentLog(512)
      }else{
         GLOBAL.App().sentLog(513)
      }
    },
	shareRewardCallBack(){
        var box=document.getElementById('slide-active-'+this.tabActive);
        var qrbox=document.getElementById('qrimg-active_'+this.tabActive);
        var pos = box.getBoundingClientRect();
        var qrox = qrbox.getBoundingClientRect();
        var dpr = window.devicePixelRatio;
        let dprTop,dprLeft,dprRight,dprBottom,qrTop,qrLeft,qrRight,qrBottom;
        if(this.urlParam.os !=='iOS'){
            dprLeft =  pos.left * dpr;
            dprTop = pos.top * dpr;
            dprRight = pos.right * dpr;
            dprBottom = pos.bottom * dpr;

            qrLeft =  qrox.left * dpr - dprLeft-2;
            qrTop = qrox.top  * dpr -2 ;
            qrRight = qrLeft + (document.documentElement.clientWidth * (this.positionQr.qr_length/750)) * dpr +4;
            qrBottom = qrTop + (document.documentElement.clientWidth * (this.positionQr.qr_height/750))* dpr +4;
        }else if(dpr>2){
            dprLeft =  pos.left * dpr;
            dprTop = pos.top * dpr;
            dprRight = pos.right * dpr;
            dprBottom = pos.bottom * dpr;

            qrLeft =  qrox.left * dpr  - dprLeft-2;
            qrTop = qrox.top  * dpr -2 ;
            qrRight = qrLeft + (document.documentElement.clientWidth * (this.positionQr.qr_length/750)) * dpr +2;
            qrBottom = qrTop + (document.documentElement.clientWidth * (this.positionQr.qr_height/750))* dpr +2;
        }else{
            dprLeft =  pos.left * dpr;
            dprTop = pos.top * dpr;
            dprRight = pos.right * dpr;
            dprBottom = pos.bottom * dpr;
            qrLeft =  qrox.left * dpr - dprLeft-2 ;
            qrTop = qrox.top  * dpr -2 ;
            qrRight = qrLeft + (document.documentElement.clientWidth * (this.positionQr.qr_length/750)) * dpr +2;
            qrBottom = qrTop + (document.documentElement.clientWidth * (this.positionQr.qr_height/750))* dpr +2;
        }
        // GLOBAL.App().toast(dprTop+'分享'+dprBottom)
        // GLOBAL.App().toast(qrTop+'二维码'+qrBottom)
      	var obj = {//保存生成的图片
          'method': 'shareRewardCallBack',
          "top":dprTop,
          "left": dprLeft,
          "bottom":dprBottom,
          "right": dprRight,
          "qrtop":qrTop,
          "qrleft": qrLeft,
          "qrbottom":qrBottom,
          "qrright": qrRight,
          "index": this.tabActive,
          "picUrl": this.balance.plan[this.tabActive].ori_url,
          'des':'快来领红包。看新闻领红包，邀请好友最高拿18.8元。注册填写我的邀请码：'+this.ycode
        }
        console.log(obj)
        // GLOBAL.App().toast(qrLeft);
				GLOBAL.App().sentLog(417);
				try {
					GLOBAL.App().postMessage(obj);
				} catch (e) { 
					console.error(e); 
				}
	}
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/app_income.scss";
</style>
