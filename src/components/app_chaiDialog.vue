<template>
          <div class="myrentice-container-dialog" 
            id='myrentice-dialog' style="z-index: 2001;">
                <div class="dialog-content">
                <div class="dialog-close">
                    <span @click="dialogClose"></span>
                </div>
                <div class="dialog-cont">
                    <div class="dialog-title"></div>
                    <div class="dialog-txt" v-html="replaceHtmlRed(apprenticeRule.text1,3)">
                    </div>
                    <div class="dialog-txt dialog-btn">{{apprenticeRule.text2}}</div>
                    <div class="dialog-ffjl">
                    <div class="dialog-img"></div>
                    <div class="dialog-jl">
                        <ul>
                        <li v-for="(item, index) in apprenticeRule.text3.split('\n')" :key="index" v-html="replaceHtmlRed(item,1)">
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div class="dialog-txt" v-html="replaceHtmlRed(apprenticeRule.text4,3)">
                    </div>
                </div>
                </div>
          </div>
</template>

<script>
import stringUtils from '@/assets/js/string.utils'
	export default {
		data() {
			return {
        apprenticeRule: {
            "text1": "9.7日-9.21日活动期间，每邀请1名好友，且1日内好友阅读向您进贡<%%60金币%%>，您即有1次拆红包机会，每个最高奖励<%%200元%%>。\n·每邀请一位好友奖励<%%【10元】%%>，发放条件：奖励分7次发放，每次好友的当日阅读获得20金币，即可满足您获得奖励的条件",
            "text2": "\n7次奖励发放如下",
            "text3": "\n第1次奖励 <%%【2.0元】%%>\n第2次奖励 <%%【1元】%%>\n第3次奖励 <%%【1元】%%>\n第4次奖励 <%%【1元】%%>\n第5次奖励 <%%【1.5元】%%>\n第6次奖励 <%%【1.5元】%%>\n第7次奖励 <%%【2.0元】%%>",
            "text4": "·首次邀请奖励<%%5元%%>。对于全体用户，若您的好友首次在1日内向您进贡60金币，额外奖励您<%%5元%%>。\n·每收一位好友奖励<%%0.2元%%>，分2次发放，第一次发放0.1元，第二次发放0.1元，发放条件同上。\n·好友在邀请之日起的前7日内每日都完成进贡指标，额外奖励您<%%100%%>金币，同时好友也可以获得<%%300%%>金币。\n\n·如发现以下相关作弊行为，东方头条有权取消用户已获得的奖励：\n  ①使用虚拟机刷邀请活动、做任务\n  ②同设备互刷账户的各类赚钱行为\n  ③收虚假好友\n  ④通过各种刷分接口获得的奖励\n·最终解释权归东方头条所有"
        }
			}
		},
		methods: {
			replaceHtmlRed: function (value,type) {
            return stringUtils.replaceRed(value,type)
      },
      dialogClose(){
        this.$emit('closeRenticeDialog',false);
      },
		}

	}

</script>

<style scoped lang="scss">
@import '../assets/scss/common/_tools.scss';

//规则弹层
.myrentice-container-dialog{
  display: block;
  animation-duration: .5s;
  @include dialog();
  .dialog-content{
    margin: 2rem 1rem;
    padding: .6rem 0rem 0.26rem 0.4rem;
    height: 70%;
    color: #222;
    .dialog-close{
      background-color: #fff;
      position: absolute;
      top: 2.3rem;
      right: 1.4rem;
      height: 0.4rem;
      z-index: 100;
      span{
        float: right;
        @include bgnrcbc(0.4rem,'../assets/img/icon/gzclose');
      }
    }
    .dialog-cont{
      padding-right: 0.2rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      height: 96%;
      .dialog-title{
        @include bgnrcbc(1rem,'../assets/img/icon/jlffgz');
        background-position: center;
        background-size: 80%;
        width: 100%;
        height: 1rem;
      }
      .dialog-txt{
        padding-bottom: 0.1rem;
        font-size: 15px;
        line-height: 0.6rem;
        margin: 0.2rem 0 0;
      }
      .dialog-btn{
        @include bgnrcbc(1rem,'../assets/img/icon/jlff');
        background-position: center;
        background-size: 80%;
        color: #fff;
        text-align: center;
        width: 7rem;
        line-height: 0.6rem;
        border-radius: 0.4rem;
        padding: 0.2rem 0;
      }
      .dialog-ffjl{
        @include flexrnsa();
        padding: 0.5rem 0 0.3rem;
        height: 4.2rem;
        .dialog-img{
          @include bgnrcbc(0.8rem,'../assets/img/icon/jlffgzh');
          background-size: 90%;
          width: 3.5rem;
          height: 3.2rem;
        }
        .dialog-jl{
          font-size: 13px;
        }
    }

    }
    
  }
}
</style>