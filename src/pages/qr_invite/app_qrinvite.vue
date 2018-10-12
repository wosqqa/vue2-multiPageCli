<template>
<div class="qr-container" :style="winHeight">
	<div class="qrinvite-container">
		<div class="qrinvite-container-top">
		<div>
			<!-- 徒儿点击右上角扫一扫<br/> 扫描我的邀请码<span style="color:#f44b50">领取红包</span> -->
			<p></p>
		</div>
		</div>
		<div class="qrinvite-container-center" id="qrinvite-img">
		</div>
		<!-- <div class="qrinvite-container-bottom">
		<div>分享到以下平台，收更多徒儿</div>
		</div> 
		<div class="qrinvite-container-footer">
				<div >
				<div class="box3-img-pyq qrinvite-img" id='btn-pyq' @click="openShareApp('pyq')">
				</div>
				</div>
				<div>
				<div class="box3-img-qq qrinvite-img" id='btn-qq' @click="openShareApp('qq')"></div>
				</div>
				<div>
					<div class="box3-img-wx qrinvite-img" id='btn-wx' @click="openShareApp('wx')">
					</div>
				</div>
				<div>
				<div class="box3-img-kj qrinvite-img" id='btn-kj' @click="openShareApp('kj')"></div>
				</div>
		</div> -->
  </div>
</div>
</template>

<script>
import {getInviteCode} from '@/api/api';
import GLOBAL from '@/assets/js/lib/app.global'
import QRCode from 'qrcodejs2'

	export default {
		data() {
			return {
				urlParam:'',
				winHeight:'',
				codeData:'',
				clipboard:'',
				loadingData:false,
				shareUrl:''
			}
		},
		created(){
				var scope = this
			 scope.urlParam = scope.$route.query; 
				window.nativeGetRandomUrlCallBack=function(res){//获取到二维码Url数据
					let Base64 = require('js-base64').Base64;
					let shareUrl=Base64.decode(res.key);
					scope.shareUrl = shareUrl;
					scope.createQr();
				}	
		},
		mounted() {//初始化数据
			var scope = this
			console.log(document.documentElement.clientHeight);
			scope.winHeight = 'height: '+document.documentElement.clientHeight+'px';
			scope.webLoadComplete();
			
		},
		methods: {
			createQr(){
				var scope = this;
					var qrcode = new QRCode(document.getElementById("qrinvite-img"), {
					});
					qrcode.makeCode(scope.shareUrl);
					scope.loadingData = true;
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
			openShareApp(type){// 分享
				var obj;
				if(this.shareUrl!=''){
					if(type=='pyq'){//朋友圈
						type=1;
						// GLOBAL.App().sentLog(349)
					}else if(type=='wx'){//微信
						type=0;
						// GLOBAL.App().sentLog(350)
					}else if(type=='qq'){//QQ
						type=2;
						// GLOBAL.App().sentLog(351)
					}else if(type=='kj'){//qq空间
						type=3;
						// GLOBAL.App().sentLog(354)
					}
					obj = {
					'method': 'qrcodeShare',
					'type': type
					}
					
					GLOBAL.App().sentLog(369)
					try {
						GLOBAL.App().postMessage(obj);
					} catch (e) { 
					console.error(e); 
					}
				}
			},
		}

	}

</script>

<style lang="scss">

@import '../../assets/scss/common/_tools.scss';

.qr-container{
  width: 10rem;
  margin: 0 auto;
  height: 16.2rem;
  font-size: 12px;
  background-image: url('../../assets/img/sewmbs@3.png');
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  background-size: cover;
  .qrinvite-container{
    text-align: center;
    .qrinvite-container-top{
      text-align: center;
      padding: .6rem;
			color: #7b5217;
      font-size: 0.4rem;
    	line-height: 0.6rem;
      letter-spacing: 0.04rem;
    }
    .qrinvite-container-center{
				width: 5.8rem;
				height: 5.8rem;
				margin: 5.75rem auto 0;
				box-sizing: border-box;
				padding: 0.08rem;
				background-color: #fff;
				border-radius: 0.2rem;
				img{
					width: 5.8rem;
					border-radius: 0.2rem;
					text-align: center;
					border: 0.05rem solid #fff;
				}
		} 
    .qrinvite-container-bottom{
	  margin-top: 1.5rem;
	  font-size: 14px;
    }
    .qrinvite-container-footer{
      margin-top: 0.5rem;
      @include flexrwsa();
      padding: 0.35rem 0;
      margin: 0 15%;
      .box3-img-pyq{
        @include bgnrcbc(1rem,'../../assets/img/icon/pyq');
      }
      .box3-img-wx{
        @include bgnrcbc(1rem,'../../assets/img/icon/wx');
      }
      .box3-img-qq{
        @include bgnrcbc(1rem,'../../assets/img/icon/QQ');
      }
      .box3-img-dx{
        @include bgnrcbc(1rem,'../../assets/img/icon/dx');
      }
      .box3-img-kj{
        @include bgnrcbc(1rem,'../../assets/img/icon/QQkj');
      }
    }
  }
}

</style>
