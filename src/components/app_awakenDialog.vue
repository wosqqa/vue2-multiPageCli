<template>
		<div class="awaken-container-dialog" id='awaken-dialog'>
			
			<div class="dialog-content">
					<div class="dialog-cont">
						<div class="dialog-title"></div>
						<div class="dialog-txt">
							<span v-if="myParam.type=='hy'">只要好友登录并认真阅读新闻，您就可以获得<span style="color:#f44b50;">500金币奖励</span>~</span>
							<span v-else>
								只要好友登录并认真阅读新闻，你和好友都可以获得
								<span style="color:#f44b50;">500金币奖励</span>,同时好友也继续向你
								<span style="color:#f44b50;">进贡金币</span>
						</span>
						</div>
						<div class="dialog-type">
						<div>
							<p class="type-h"></p>
						</div>
						<div>唤醒方式</div>
						<div>
							<p class="type-h"></p>
						</div>
						</div>
						<div class="dialog-type">
						<div class="dialog-img" id='dialog-wx' @click="awakeTaWithShare('wx')">
							<div class="dialog-img-wx">
							<span class="rf-text-red"></span>
							</div>
							<p>微信邀请</p>
						</div>
						<div class="dialog-img" id='dialog-qq'  @click="awakeTaWithShare('qq')">
							<div class="dialog-img-qq">
							<span class="rf-text-red"></span>
							</div>
							<p>QQ邀请</p>
						</div>
						<div class="dialog-img" id='dialog-dx'  @click="awakeTaWithShare('dx')">
							<div class="dialog-img-dx">
							<span class="rf-text-red"></span>
							</div>
							<p>短信好友</p>
						</div>
						</div>
					</div>
			</div>
			<div class="awaken-dialog-modal" @click="closeWakeupDialog"></div>
	</div>
</template>

<script>
import GLOBAL from '@/scripts/util/app.global'
	export default {
		props:[
            'myParam'
        ],
		data() {
			return {
			}
		},
		methods: {
			awakeTaWithShare(type){
				let scope=this;
				let obj={
					'method': 'awakeTaWithShare',
					'mobile': scope.myParam.mobile,//手机号码
					'accid':scope.myParam.accid,//被唤醒人的accid
					'type': ''
					};
				if(type=='wx'){//微信邀请
					obj.type=0;
					GLOBAL.App().sentLog(383)
				}else if(type=='qq'){//QQ邀请
					obj.type=1;
					GLOBAL.App().sentLog(384)
				}else if(type=='dx'){//短信好友
					obj.type=2;
					GLOBAL.App().sentLog(385)
				}
				let actentryid=0;
				if(scope.myParam.type=='hy'){//单独唤醒好友页面唤醒
							actentryid = 1250002;
				}else{//好友页面的唤醒
							actentryid = 1250001;
				}
				
				let objLog ={
                method:"uploadActivityLog",
                thisurl: null,
								materialid:null,
								acttype: "entry",
          			plan: "",
                actentryid:actentryid,
								actid:"wakeit",
								type:"click"
						}
				try {
					GLOBAL.App().postMessage(objLog);
					GLOBAL.App().postMessage(obj);
				} catch (e) { 
					console.error(e); 
				}	
				scope.$emit('closeWakeupDialog',true);//以唤醒
			},
			closeWakeupDialog(){
				this.$emit('closeWakeupDialog',false);//为唤醒关闭
			}
		}

	}

</script>

<style scoped lang="scss">
@import '../../styles/common/_tools.scss';
.awaken-container-dialog{
    // @include dialog();
    .dialog-content{
      margin: 40% 1rem;
      height: 7.5rem;
      color: #222;
			z-index: 2000;
			position: fixed;
			top: 0;
			font-size: 14px;
			background-color: #fdfdfd;
			padding: .2rem 0.4rem 0.4rem 0.4rem;
			border-radius: .5rem;
      .dialog-cont{
        overflow-y: auto;
        height: 96%;
        .dialog-title{
          @include bgnrcbc(1.2rem,'../assets/icon/fsxxtx');
          background-position: center;
          background-size: 80%;
          width: 100%;
          height: 1.2rem;
        }
        .dialog-type{
          @include flexrnsa();
          div{
            flex:1;
            color: #666666;
            padding: 0.2rem 0;
            text-align: center;
            .type-h{
              height: 1px;
              width:  100%;
              background-color: #e3e3e3;
              margin-top: 15%;
            }
          }
          .dialog-img{
            flex:1;
            padding: 0.1rem 0;
            text-align: center;
            p{
              color: #666666;
            }
            .dialog-img-wx{
              @include bgnrcbc(1.22rem,'../assets/icon/wx');
            }
            .dialog-img-qq{
              @include bgnrcbc(1.22rem,'../assets/icon/QQ');
            }
            .dialog-img-dx{
              @include bgnrcbc(1.22rem,'../assets/icon/dx');
            }
          }
        }
      }
    }

		.awaken-dialog-modal{
			    position: fixed;
					z-index: 1200;
					top: 0px;
					width: 10rem;
					background-color: rgba(0, 0, 0, 0.29);
					height: 100%;
		}
  }
</style>
