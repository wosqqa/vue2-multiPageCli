<template>
	  <div class="list-container">
      <div class="list-container-box1">
          <div :class="navActive=='1' ? 'am-popover am-active' : 'am-popover'" @click="clickTab(1)">
              <div class="am-popover-inner">邀请奖励</div>
          </div>
          <div :class="navActive=='2' ? 'am-popover am-active' : 'am-popover'" @click="clickTab(2)">
              <div class="am-popover-inner">唤醒奖励</div>
          </div>
          <!-- <div :class="navActive=='2' ? 'am-popover am-active' : 'am-popover'"  @click="clickTab(2)">
              <div class="am-popover-re" v-if="myParam.activity.length!= activeLength">热</div>
              <div class="am-popover-inner">最新活动</div>
          </div> -->
      </div>
      <div class="list-container-box2">
          <div class="list-box3-luck"   v-show="navActive=='1'">
              <div class="list-title" >每邀请1名好友，即可获<span>10元</span>现金奖励</div>
              <div class="list-subtitle" >好友通过阅读获得20金币奖励，您即可拿到当日现金奖励</div>
              <div class="list-conter">
                  <div class="list-conter-box">
                    <div class="list-conter-day">第一天</div>
                    <div  class="list-conter-txt"><span class="list-conter-dayD">获得</span><span class="list-conter-dayE"><span>{{myParam.money[0] | numFilter2}}</span>元</span></div>
                  </div>
                  <div class="list-conter-box">
                    <div class="list-conter-day">第二天</div>
                    <div  class="list-conter-txt"><span class="list-conter-dayD">获得</span><span class="list-conter-dayE"><span>{{myParam.money[1] | numFilter2}}</span>元</span></div>
                  </div>
                  <div class="list-conter-box">
                    <div class="list-conter-day">第三天</div>
                    <div  class="list-conter-txt"><span class="list-conter-dayD">获得</span><span class="list-conter-dayE"><span>{{myParam.money[2] | numFilter2}}</span>元</span></div>
                  </div>
                  <div class="list-conter-box">
                    <div class="list-conter-day">第四天</div>
                    <div  class="list-conter-txt"><span class="list-conter-dayD">获得</span><span class="list-conter-dayE"><span>{{myParam.money[3] | numFilter2}}</span>元</span></div>
                  </div>
              </div>
              <div class="list-conter list-conter-two">
                  <div class="list-conter-box">
                    <div class="list-conter-day">第五天</div>
                    <div  class="list-conter-txt"><span class="list-conter-dayD">获得</span><span class="list-conter-dayE"><span>{{myParam.money[4] | numFilter2}}</span>元</span></div>
                  </div>
                  <div class="list-conter-box">
                    <div class="list-conter-day">第六天</div>
                    <div  class="list-conter-txt"><span class="list-conter-dayD">获得</span><span class="list-conter-dayE"><span>{{myParam.money[5] | numFilter2}}</span>元</span></div>
                  </div>
                  <div class="list-conter-box">
                    <div class="list-conter-day">第七天</div>
                    <div  class="list-conter-txt"><span class="list-conter-dayD">获得</span><span class="list-conter-dayE"><span>{{myParam.money[6] | numFilter2}}</span>元</span></div>
                  </div>
                  <div class="list-conter-box" style="border: 0px solid #e8e8e8;">
                  </div>
              </div>
              <div class="list-ling" >
                </div>
              <div class="list-title" >如何提升邀请成功率？</div>
              <div class="list-subtitle" >最高可提高成功率200%以上</div>
              <div class="list-li" ><div  class="list-li-title">1</div><div>邀请您的家人、朋友、同学、同事成功率最高。</div> </div>
              <div class="list-li" ><div  class="list-li-title">2</div><div>同时分享到3个以上微信群/QQ群，成功率提升<span class="list-li-red">200%</span>以上。</div> </div>
              <div class="list-li" ><div  class="list-li-title">3</div><div>可以告诉您的朋友：在注册后可收到奖励，通过任务和阅读都可以产生现金奖励，并可以提现。</div></div>

          </div>
          <div class="list-box3-obtained" id="list-box3-roll-2"  v-show="navActive=='2'">
              <div v-if="wakeupList.length>0" >
                <userItem v-if="relodItem" v-for="(item,index) in wakeupList" :key="index" :userData='item' :userType='userType' :userIndex='index' @openWakeupDialog="openWakeupDialog"></userItem>
              </div>
              <div class="box3-obtained" v-else>
                <div class="box3-obtained-a">暂时没有需要唤醒的好友</div>
                <div class="box3-obtained-b" @click="openShare">赶紧去邀请好友吧</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { wakeupApprenticeList,hostname,giveRedEnvelope,jsonpGetData } from "@/scripts/api/api";
import GLOBAL from '@/scripts/util/app.global'
const userItem = resolve => require(["@/components/userItem.vue"], resolve);
export default {
  props: ["myParam","isCopy"],
  components: {
      userItem,
	},
  data() {
    return {
      navActive: "1",
      userType:'hx',
      urlParam:'',
      relodItem:true,
      remPx:'',
      divHeight:'',
      scrollTop: '',
      activeLength:0,
      time:'',
      speed:2500,
			envelopeData:'',
      oneData: [],
      twoData: [],
      wakeupObj:'',
      userIndex:'',
      wakeupList:[],
      threeData: []
    };
  },
  filters: {
    numFilter2(value) {
            // 截取当前数据到小数点后两位
            let realVal = new Number(value)
            // num.toFixed(2)获取的是字符串
            return realVal.toFixed(1)
    },
  },
  created() {
    let scope=this;
    window.relodWakeupItem = function(){//重新更新list
      scope.relodItem = false
      scope.$nextTick(() => {
        scope.relodItem = true
      })
    }
    this.urlParam=this.$route.query
    this.activeLength = localStorage.getItem("activeLength")==null ? 0:Number(localStorage.getItem("activeLength"));
    this.wakeupApprenticeList();
  },
  watch: {
    navActive(curVal, oldVal) {
      if(this.wakeupList.length>0){
        this.$emit("changeBottomShow", curVal);
      }
    }
  },
  mounted() {
    let scope=this;
  },
  methods: {
    wakeupApprenticeList(){//获取页面参数
				let scope=this;
				let listObj={
						param:{
							accid: scope.urlParam.accid,
							pg:scope.wakeupPage,
							ime:scope.urlParam.ime,
							apptypeid:scope.urlParam.apptypeid,
							appqid:scope.urlParam.qid,
							ver:scope.urlParam.appver,
							machine:scope.urlParam.device,
							plantform:scope.urlParam.os,
						},
						callback:'wakeupApprenticeListData',
						url:wakeupApprenticeList,
					}
				window.wakeupApprenticeListData = function(res) {
          scope.wakeupList=res.data;
          // scope.wakeupList = [
          //     {
          //         "accid": "500321520",
          //         "headpic": "http://q.qlogo.cn/qqapp/1104948794/C26DA3363CD9DAE3305FBFEC9984ED41/100",
          //         "nickname": "徐",
          //         "mobile": "",
          //         "tag": "100",
          //         "bonus": "0"
          //     },
				}
				jsonpGetData(listObj);
      },
    openShare(){
       this.$emit("openPopup", true);
       GLOBAL.App().sentLog(1410)
    },
    openWakeupDialog(item) {
      item.type='wakeup';
      openWakeupShare(item);
      //打开弹层
      // this.wakeupObj = item;
      // this.wakeupObj.type='wakeup';
      // this.wakeupDialog = true;
      // document.getElementsByTagName('body')[0].style.position="fixed";
    },
    awakeAddBookApprentice(){//一键短信唤醒
      let scope=this;
				let wakeupList = []
					for ( var i=0 ; i < scope.wakeupList.length ; i++ ){
								let obj={};
								let element = scope.wakeupList[i];
								if((element.tag=='100'||element.tag=='666')&&element.mobile!=''){
									obj ={
										mobile:element.mobile,
										accid:element.accid,
									}
									element.tag = '666'
									wakeupList.push(obj);
									scope.wakeupList.splice(i,1,element);
								}
					}
				let	objw = {
            'method': 'directAwakeAddBookApprentice',
            'awakeList':wakeupList,
            'isApprientice':0
          }
					GLOBAL.App().postMessage(objw);
          GLOBAL.App().sentLog(537)
          GLOBAL.App().uploadActivityLog('',null,1250003,'wakeit','entry',"click",'');
		},
    closeWakeupDialog(item){//关闭弹层
      this.wakeupDialog = false;
			document.getElementsByTagName('body')[0].style.position="static";
    },
		clickTab(index){
      let scope=this;
      scope.navActive= index
      if(index=='1'){
        GLOBAL.App().sentLog(1309)
      }else{
        GLOBAL.App().sentLog(1311)
        GLOBAL.App().uploadActivityLog('',null,1800000,'invitefriend','show',"page",'');
        scope.activeLength = scope.myParam.activity.length
        localStorage.setItem("activeLength", JSON.stringify(scope.myParam.activity.length));
      }
    },
	}
};
</script>

<style scoped lang="scss">
@import "../../styles/common/_tools.scss";
		
.list-container {
  background: #fff;
  text-align: center;
  margin-top: 0.2rem;
  margin-bottom: 1.65rem;
	.txt-red{
		color: #f44b50;
	}
  .list-container-box1 {
    border-radius: 0.16rem;
    height: 1.174rem;
    line-height: 0.552rem;
    display: flex;
    flex-flow: row nowrap;
		justify-content: space-around;
		background: #fff;
    overflow: hidden;
    font-size: 0.42rem;
    border-bottom: 1px solid #f1f1f1;
    .am-popover {
      flex: 1;
      position: relative;
      padding-bottom: 0%;
      .am-popover-inner {
				padding: 5% 0;
        color: #333333;
        span {
          display: block;
          font-size: 0.38rem;
          color: #f44b50;
          font-weight: 400;
          margin-top: 0.1rem;
        }
      }
      .am-popover-re{
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        line-height: 0.5rem;
        right: 1.2rem;
        top: 0;
        background-color: #f44b50;
        color: #fff;
        border-radius: 0.5rem;
        font-size: 0.3rem;
      }
    }
    .am-active {
      .am-popover-inner {
        color: #f44b50;
      }
       &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -.2rem;
            width: .54rem;
            height: 0.08rem;
            border-radius: 0.1rem;
            background: #f44b50;
        }
    }
  }
  .list-container-box2 {
    .list-box3-luck{
      .list-title{
        margin: 0.5rem 0 0.2rem;
        font-size: 0.453rem;
        color: #333333;
        font-weight: 500;
        span{
          color: #f44b50;
        }
      }
      .list-subtitle{
        font-size: 0.373rem;
        color: #999999;
      }
      .list-conter{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin: 0.1rem 0.22rem;
        .list-conter-box{
          border-radius: 0.2rem;
          margin: 0.4rem 0 0.2rem;
          border: 1px solid #f1f1f1;
          padding: 0.32rem 0.2rem;
          width: 1.9rem;
          height: 2.03rem;
          .list-conter-day{
            @include bgnrcbc(1rem,'../assets/yqhy/days');
            width: 1.4rem;
            height: 0.7rem;
            line-height: 0.55rem;
            font-size: 0.3rem;
            color: #fff;
            background-size: contain;
            // padding: 0.1rem 0.15rem;
          }
          .list-conter-txt{
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            font-size: 0.275rem;
            .list-conter-dayD{
              width: 0.5rem;
              margin-top: 0.13rem;
              line-height: 0.3rem;
            }
            .list-conter-dayE{
              width: 1.8rem;
              line-height: 0.8rem;
              font-size: 0.4rem;
              color: #ff742a;
              span{
                font-size: 0.45rem;
                line-height: 0.57rem;
                font-weight: 600;
              }
            }
          }
          
        }
      }
      .list-conter-two{
        margin-top: -0.1rem;
        justify-content: space-around;
      }
      .list-ling{
        font-size: 0.453rem;
        color: #333333;
        text-align: left;
        // padding: 0.25rem 0.53rem 0.45rem;
        padding: 0.2rem 0.53rem;
        border-bottom: 0.22rem solid #f4f4f4;
        span{
          color: #f44b50;
          font-size: 0.48rem;
        }
      }
      .list-li{
        text-align: left;
        color: #333333;
        font-size: 0.4rem;
        margin: 0.35rem 0.53rem;
        display: flex;
        div{
          width: 8rem;
          margin-left: 0.25rem;
        }
        .list-li-red{
          color: #f44b50;
        }
        .list-li-title{
          color: #ffffff;
          @include bgnrcbc(1rem,'../assets/yqhy/xhbg');
          width: 0.51rem;
          height: 0.51rem;
          line-height: 0.55rem;
          text-align: center;
          margin-top: 0.1rem;
          font-size: 0.35rem;
          background-size: contain;
          margin-left: 0;
        }
        .list-li-share{
          background: url('../assets/share/txt-bg@2x.png') center right no-repeat;
          background-size: contain;
          margin: 0 auto;
          width: 9rem;
          height: 5rem;
          .list-title{
            text-align: center;
            padding: 0.7rem 0.25rem 0.25rem;
            margin: 0 auto;
            color: #333333;
            font-size: 0.45rem;
          }
          .list-li-are{
            width: 8.9rem;
            height: 2.6rem;
            color: #333333;
            line-height: 0.65rem;
            padding: 0 0.45rem;
            font-size: 0.4rem;
            background-color: #ffe4e4;
            border: 0 solid #ffe4e4;
            border-radius: 0.2rem;
            font-weight: 500;
          }
        }
      }
    }

    .list-box3-obtained{
      .list-box3-roll{
        margin: 0.35rem 0.53rem;
        .list-txt{
          text-align: left;
          font-size: 0.373rem;
          color: #999999;
        }
        .list-hd{
          div{
            height: 3.34rem;
            margin: 0.4rem 0;
            img{
              height: 3.34rem;
              width: 9rem;
              border-radius: 0.2rem;
            }
          }

          
        }
      }
      .box3-obtained{
        .box3-obtained-a{
          margin:2.08rem 0 0.48rem;
          font-size:0.4rem;
          color:#999;
        }
        .box3-obtained-b{
          height:1.067rem;
          line-height:1.067rem;
          font-size:0.42rem;
          color:#fff;
          background-color:#f44b50;
          border-radius:0.5rem;
          margin:0 2.66rem;
        }
      }
      .list-txtNo{
          margin: 2.7rem auto;
          text-align: center;
          font-size: 0.4rem;
          color: #999999;
          font-weight: 500;
      }
    }
  }
}
</style>
