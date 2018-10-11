<template>
	  <div class="list-container">
      <div class="list-container-box1">
          <div :class="navActive=='1' ? 'am-popover am-active' : 'am-popover'" @click="navActive='1'">
              <div class="am-popover-inner">看大家手气<span>瞅一瞅</span></div>
              <div class="am-popover-caret"></div>
          </div>
          <div :class="navActive=='2' ? 'am-popover am-active' : 'am-popover'"  @click="navActive='2'">
              <div class="am-popover-inner">已获得的红包<span class="num_mine">{{envelopeData.mine_total}}元</span></div>
              <div class="am-popover-caret"></div>
          </div>
          <div :class="navActive=='3' ? 'am-popover am-active' : 'am-popover'"  @click="navActive='3'">
              <div class="am-popover-inner">红包在路上<span class="num_app">{{envelopeData.road_count}}份</span></div>
              <div class="am-popover-caret"></div>
          </div>
      </div>
      <div class="list-container-box3">
          <div class="list-box3-luck" v-show="navActive=='1'" style="height:20rem">
              <div class="list-conter" v-if="oneData.length==0" id="list-roll-loading">啊哦~没有加载出来<br>请稍后再来</div>
              <div class="list-box3-top" id="top" v-if="oneData.length>0">
								<div class="list-txt">
									<div class="list-img"><img v-lazy="oneData[0].head"></div>
									<div class="list-user"><span class="list-user-nick">{{oneData[0].nick}}</span><span class="user-shouqi">手气王</span><span class="list-user-sp">领取好友助力红包</span></div>
									<div class="list-gx"><p class="list-line">+{{oneData[0].bonus}}元</p></div>
								</div>
								<div class="list-img-hg"></div>
							</div>
            <div class="list-box3-roll" id='list-box3-roll' v-if="oneData.length>0">
							<div :class="index==1 ? 'list-txt top-active' : 'list-txt'" v-for="(item,index) in oneData" :key="index"  v-if='index>0'>
								<div class="list-img"><img class="lazy"  v-lazy="item.head=='' ? envelopeData.init.default_head : item.head" style="display: inline;"></div>
								<div class="list-user"><span class="list-user-nick" v-text="(item.nick==''|| item.nick==null) ?  '头条用户': item.nick"></span><span class="list-user-sp">领取东方头条助力红包</span></div>
								<div class="list-gx"><p class="list-line">+{{item.bonus}}元</p></div>
							</div>
              <div class="list-txt" v-for="(item,index) in oneData" :key="index+'w'"  v-if='index>0'>
								<div class="list-img"><img class="lazy"  v-lazy="item.head=='' ? envelopeData.init.default_head : item.head" style="display: inline;"></div>
								<div class="list-user"><span class="list-user-nick" v-text="(item.nick==''|| item.nick==null) ?  '头条用户': item.nick"></span><span class="list-user-sp">领取东方头条助力红包</span></div>
								<div class="list-gx"><p class="list-line">+{{item.bonus}}元</p></div>
							</div>
            </div>

          </div>
          <div class="list-box3-obtained" id="list-box3-roll-1"  v-show="navActive=='2'">
							<div class="list-box3-roll"  v-if="twoData.length>0">
								<div class="list-txt" v-for="(item,index) in twoData" :key="index">
									<div class="list-img"><img class="lazy"  v-lazy="item.head=='' ? envelopeData.init.default_head : item.head " style="display: inline;"></div>
									<div class="list-user"><span class="list-user-nick" v-text="(item.nick==''|| item.nick==null) ?  '头条用户': item.nick"></span><span class="list-user-sp">已成功助力，帮你拆出{{item.bonus}}元</span></div>
									<div class="list-gx"><p class="list-line">+{{item.bonus}}元</p></div>
								</div>
							</div>
              <div class="list-conter"  v-if="twoData.length==0">您还没有获得助力红包哦~<br>赶快去呼朋唤友帮你助力吧</div>
          </div>
          <div class="list-box3-road" id="list-box3-road"  v-show="navActive=='3'">
							<div class="list-packet" >您有<span class="num_app">{{envelopeData.road_count}}份</span>红包在路上</div>
              <div class="list-tip"  >
                  <span class="txt-red"></span>好友在邀请当日进贡满<span class="txt-red"><span class="youxiao-line">60</span>金币</span>，你就可获得红包。
              </div>
              <div class="list-box3-roll" v-if="threeData.length>0">
								<div class="list-txt" v-for="(item,index) in threeData" :key="index">
									<div class="list-img"><img class="lazy"  v-lazy="item.head=='' ? envelopeData.init.default_head : item.head" style="display: inline;"></div>
									<div class="list-user"><span class="list-user-nick" v-text="(item.nick==''|| item.nick==null) ?  '头条用户': item.nick"></span><span class="list-user-sp">进贡未满60金币，红包还在路上~</span></div>
									<div class="list-gx"><p class="list-line"></p></div>
								</div>
							</div>
          </div>
      </div>
  </div>
</template>

<script>
import { giveRedEnvelope,jsonpGetData } from "@/api/api";
import GLOBAL from '@/assets/js/lib/app.global'
export default {
  props: ["myParam",'urlParam'],
  data() {
    return {
			navActive: "1",
      remPx:'',
      divHeight:'',
      scrollTop: '',
      time:'',
      speed:2500,
			envelopeData:'',
      oneData: '',
      twoData: '',
      threeData: ''
    };
  },
  created() {
    let fz= window.document.documentElement.style.fontSize
    this.remPx =fz.substring(0,fz.length-2)
  },
  mounted() {
    //初始化数据
     this.giveRedEnvelope()
  },
  methods: {
		giveRedEnvelope(){
      let scope=this;
			let listObj = {
          param:{
            accid: scope.urlParam.ttaccid,
						lt:scope.myParam,
          },
					callback:'giveRedEnvelopeJsonp',
					url:giveRedEnvelope,
      };
      window.giveRedEnvelopeJsonp =function(res){
            scope.envelopeData = res.data;
						scope.oneData =  scope.envelopeData.others;
						scope.twoData =  scope.envelopeData.mine;
            scope.threeData =  scope.envelopeData.road;
            setTimeout(() => {
                clearInterval(scope.time);
                scope.scrollDiv();
            }, 2500);
			}
			jsonpGetData(listObj);
    },
    scrollUp(){
      let scope = this;
      document.getElementById('list-box3-roll').scrollTop = scope.scrollTop
      scope.scrollTop = scope.scrollTop-scope.divHeight;
      scope.scrollSetDiv(document.getElementById("list-box3-roll"),scope.scrollTop,1000)
      if(scope.scrollTop<=0){
          clearInterval(scope.time);
          // scope.scrollTop =(scope.oneData.length-1)*Number(scope.remPx)*2;
          scope.scrollDiv()
      }
    },
    scrollSetDiv(obj,scrollTo, time){//计算滚动距离
      let scope = this;
      let scrollFrom = parseInt(obj.scrollTop),i = 0,runEvery = 30;
            scrollTo = parseInt(scrollTo);
            time /= runEvery;
            let interval = setInterval(function () {
                i++;
                obj.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
                if (i >= time) {
                    clearInterval(interval);
                }
            }, runEvery);
    },
    scrollDiv(){//设置滚动时间
      let scope = this;
      scope.divHeight = 2*Number(scope.remPx);
      // GLOBAL.App().toast(scope.divHeight)
      scope.scrollTop = (scope.oneData.length-1)*Number(scope.remPx)*2;
      document.getElementById('list-box3-roll').scrollTop = scope.scrollTop
      scope.time=setInterval(function () {
            scope.scrollUp();
      }, scope.speed);
    },
	}
};
</script>

<style scoped lang="scss">
@import "../assets/scss/common/_tools.scss";

@keyframes myfirst {
        0% {
            margin-top: 0rem;
            transition:margin-top 500ms;
        }
      
        100% {
            margin-top: -30rem;
            transition:margin-top 500ms;
        }
}
		
.list-container {
  background: #fff;
  text-align: center;
	margin-top: 0.2rem;
	.txt-red{
		color: #f44b50;
	}
  .list-container-box1 {
    border-radius: 0.16rem;
    display: flex;
    flex-flow: row nowrap;
		justify-content: space-around;
		background: #fff;
		margin: 0rem 0.4rem;
    border-radius: 0.16rem;
    overflow: hidden;
    font-size: 0.4rem;
    .am-popover {
      flex: 1;
      position: relative;
      padding-bottom: 0%;
      background-color: #f4f4f4;
      .am-popover-inner {
        background-color: #f8f8f8;
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
    }
    .am-active {
      .am-popover-caret {
        border: 1.5px solid #f34248;
        margin: 0 auto;
        width: 15%;
			}
    }
  }
  .list-container-box2 {
    background-repeat: no-repeat;
    position: relative;
    display: inline-block;
    background-size: cover;
    height: 3.45rem;
    width: 100%;
    .dsd {
      color: #ffdf00;
    }
    .box2-jinbi {
      color: #fff;
      font-size: 0.34rem;
      padding-top: 3.7rem;
    }
    .box2-info {
      color: #fff;
      text-align: center;
      font-size: 0.3rem;
      width: 40%;
      margin: 5% auto 30%;
      border-radius: 0.3rem;
      padding: 0.1rem;
      background-color: #e13136;
    }
    .box2-txt {
      padding: 4% 0;
    }
    .box2-btn {
      // @include bgnrcbc(1.5rem,'../assets/img/share/yqbtn');
      background-repeat: no-repeat;
      position: relative;
      display: inline-block;
      background-size: cover;
      background-position: center;
      padding: 0.23rem 0;
      margin: 0.3rem 0;
      color: #8a3c0c;
      font-weight: 700;
      font-size: 0.4rem;
      width: 80%;
      text-align: center;
    }
  }
  .list-container-box3 {
    font-size: 0.3rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    /* margin-bottom: 0.5rem; */
    .list-box3-luck {
      display: block;
      width: 90%;
      .list-box3-roll {
        height: 18rem;
        overflow-y: hidden;
      }
		}

		.top-active{
			// animation: myfirst 30s infinite linear;
		}

    .list-txt {
      display: flex;
      flex-flow: row nowrap;
      padding: 0.4rem 0;
      justify-content: space-around;
      background-color: #fff;
      border-bottom: 1px solid #f1f1f1;
      height: 2rem;
      .list-img {
        width: 1.2rem;
        height: 1.2rem;
        flex-grow: 0;
        overflow: hidden;
        vertical-align: middle;
        img {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 5px;
          border-radius: 50%;
        }
			}
			.list-user-sp {
          display: block;
          font-size: 0.38rem;
    			color: #666666;
          margin-top: 0.1rem;
        }
        .list-user {
          flex-grow: 1;
					padding-left: 0.2rem;
					font-size: 0.45rem;
					text-align: left;
					color: #333333;
					.list-user-nick{
						max-width: 3.5rem;
						height: 0.6rem;
						white-space: normal;
						display: inline-flex;
						overflow: hidden;
					}
          .user-shouqi {
            font-size: 0.32rem;
            background-color: #ffd502;
            border-radius: 0.04rem;
            padding: 0.02rem 0.12rem;
            margin-left: 0.1rem;
            color: #e33d3b;
          }
          .list-user-sp {
            display: block;
            font-size: 0.38rem;
    				color: #666666;
            margin-top: 0.1rem;
          }
        }
      .list-gx {
        flex-grow: 0;
        .list-line {
          	font-size: 0.45rem;
            margin: 0.2rem auto;
            text-align: right;
            color: #f34248;
        }
      }
    }
    .list-box3-road {
			width: 90%;
			font-size: 0.4rem;
      .list-tip {
        margin: 0.2rem 0;
        padding: 0.2rem 0.5rem;
        color: #999;
        font-size: 0.32rem;
        text-align: center;
			}
			.list-packet {
					margin-top: 0.7rem;
					font-size: 0.4rem;
					color: #333;
			}
      .list-head {
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        div {
          flex: 1;
          line-height: 0.8rem;
        }
        .list-head-date {
          line-height: 0.4rem;
        }
      }
		}
		.list-box3-obtained,list-box3-road{
			width: 90%;
		}
		.list-box3-obtained .list-conter, .list-box3-luck .list-conter {
				color: #999;
				margin: 1rem auto;
				line-height: .8rem;
				font-size: 0.4rem;
				width: 100%;
		}
  }
}
</style>
