<template>

          <div class="myrentice-container-dialog" 
            id='myrentice-dialog' style="z-index: 2001;">
                <div class="dialog-content">
                  <div class="dialog-close">
                      <span @click="dialogClose"></span>
                  </div>
                  <div class="dialog-cont">
                      <div class="dialog-title"></div>
                      <div class="dialog-li" v-if="myParam.inviteType=='1'"><div  class="list-li-title">1</div><div v-html="replaceHtmlRed(myReplace(myParam.apprentice_rule.text1,'9','8'),1)"></div></div>
                      <div class="dialog-li" v-else><div  class="list-li-title">1</div><div v-html="replaceHtmlRed(myReplace(myParam.apprentice_rule.text1,'9','13.5'),1)"></div></div>
                      <div class="dialog-txt" v-if="myParam.inviteType=='1'" v-html="replaceHtmlRed(myReplace(myParam.apprentice_rule.text2,'9','8'),1)">
                      </div>
                      <div class="dialog-txt" v-else v-html="replaceHtmlRed(myReplace(myParam.apprentice_rule.text2,'9','13.5'),1)">
                      </div>

                      <div class="dialog-li"><div  class="list-li-title">2</div><div>{{myParam.apprentice_rule.text3}}</div></div>
                      <div class="dialog-txt" v-html="replaceHtmlRed(myParam.apprentice_rule.text4,3)"></div>
                      <!-- <div class="dialog-li"><div  class="list-li-title">3</div><div v-html="replaceHtmlRed('新注册用户，14日内邀请好友奖励提升<%%1.5倍 %%>。',3)"></div></div> -->
                      <div class="dialog-subtitle"></div>
                      <div class="dialog-li"><div  class="list-li-title">1</div><div>{{myParam.apprentice_rule.text5}}</div></div>
                      <div class="dialog-txt" v-html="replaceHtmlRed(myParam.apprentice_rule.text6,3)"></div>
                      <div class="dialog-li"><div  class="list-li-title">2</div><div>{{myParam.apprentice_rule.text7}}</div></div>
                      <div class="dialog-txt" v-html="replaceHtmlRed(myParam.apprentice_rule.text8,3)"></div>
                      <div class="dialog-li"><div  class="list-li-title">3</div><div>{{myParam.apprentice_rule.text9}}</div></div>
                      <div class="dialog-txt" v-html="replaceHtmlRed(myParam.apprentice_rule.text10,3)"></div>
                      <div class="dialog-bottom">{{myParam.apprentice_rule.text11}}</div>
                  </div>
                </div>
          </div>
</template>

<script>
import GLOBAL from '@/assets/js/lib/app.global'
import stringUtils from '@/assets/js/string.utils'
	export default {
		props:[
            'myParam'
        ],
		data() {
			return {
			}
		},
		methods: {
			replaceHtmlRed: function (value,type) {
            return stringUtils.replaceRed(value,type)
      },
      myReplace: function (value,f,t) {
            return stringUtils.myReplace(value,f,t)
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
        @include bgnrcbc(1rem,'../assets/img/yqhy/gzjli');
        background-position: center;
        background-size: 100%;
        margin: 0.2rem 1rem 0;
        width: 5.5rem;
        height: 0.75rem;
      }
      .dialog-subtitle{
        @include bgnrcbc(1rem,'../assets/img/yqhy/jingong');
        background-position: center;
        background-size: 100%;
        margin: 0.3rem 2rem 0;
        width: 3.5rem;
        height: 0.75rem;
      }
      .dialog-li{
          color: #333333;
          margin: 0.3rem 0 0.2rem;
          font-size: 16px;
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
            @include bgnrcbc(1rem,'../assets/img/yqhy/guibg');
            width: 0.65rem;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            font-size: 14px;
            background-size: contain;
            margin-left: 0;
          }
      }
      .dialog-txt{
        padding-bottom: 0.1rem;
        font-size: 15px;
        line-height: 0.6rem;
        margin: 0.2rem 0 0;
        color: #333;
      }
      .dialog-bottom{
        font-size: 15px;
        color: #999999;
      }

    }
    
  }
}
</style>
