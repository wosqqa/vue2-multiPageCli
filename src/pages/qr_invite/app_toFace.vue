<template>
<div class="qr-face">
	<div class="box-a">
		<div class="box-aa">
			<div class="box-aam">
				<div class="box-aama"  v-for="(item,index) in rollerData" :key="index" v-if="index<=15">
					<img class="box-aama-img" src="http://resources.dftoutiao.com/songheng/DFTT/default/img/dftt00000.png" alt="" v-if="item.headpic=='' || item.headpic==null">
					<img class="box-aama-img" :src="item.headpic" alt="" v-else>
					<span class="box-aama-name">{{item.user_phone}}</span>
					<span class="box-aama-jp">抽中了<span>{{item.prize_name}}</span></span>
				</div>
			</div>
			<div class="box-aam box-aal">
				<div class="box-aama box-aamb"  v-for="(item,index) in rollerData" :key="index" v-if="index>15">
					<img class="box-aama-img" src="http://resources.dftoutiao.com/songheng/DFTT/default/img/dftt00000.png" alt="" v-if="item.headpic=='' || item.headpic==null">
					<img class="box-aama-img" :src="item.headpic" alt="" v-else>
					<span class="box-aama-name">{{item.user_phone}}</span>
					<span class="box-aama-jp">抽中了<span>{{item.prize_name}}</span></span>
				</div>
			</div>
		</div>
		<!-- <div class="box-aa">
			<marquee behavior="scroll" contenteditable="true" onstart="this.firstChild.innerHTML+=this.firstChild.innerHTML;" onfocus="this.blur();"  scrollamount="1" scrolldelay="4" width="100%"> 
						<div class="box-aam">
							<div class="box-aama" v-for="(item,index) in rollerData" :key="index" v-if="index>15">
								<img class="box-aama-img" src="http://resources.dftoutiao.com/songheng/DFTT/default/img/dftt00000.png" alt="" v-if="item.headpic==''">
								<img class="box-aama-img" src="item.headpic" alt="" v-else>
								<span class="box-aama-name">{{item.user_phone}}</span>
								<span class="box-aama-jp">抽中了<span>{{item.prize_name}}</span></span>
							</div>
						</div>
			</marquee>
		</div> -->
	</div>
	
	<div class="box-b">
		<div class="box-ba">
			活动时间：8月13日至10月31日
		</div>
		<div class="box-bb" id='qrinvite-img'>
			
		</div>
		<div class="box-bc">
			<div class="box-bca" @click="qrRecord">
				中奖记录<span></span>
			</div>
			<div class="box-bcb">
				<lottery ref="lotteryRunner" @luckyWin = "luckyWin" :runLuck='runLuck'  :luck-data="luckData" :luck-num="luckNum" :target="target" @LuckyRunner = "LuckyRunner"></lottery>
			</div>
		</div>
		<div class="box-bd">
			<div class="box-bda">
				活动规则
			</div>
			<div class="box-bdb">
				<div class="box-bdba"><div class="box-bdbas">1</div> <div class="box-bdbat">通过二维码成功邀请一名好友，且好友阅读获得30金币，您可获得一次抽奖机会.</div></div>
				<div class="box-bdba"><div class="box-bdbas">2</div> <div class="box-bdbat">参与抽奖您将获得实物/现金/金币奖励一份，单次抽奖最高可获得iphone8P 64G手机一部。</div></div>
				<div class="box-bdba"><div class="box-bdbas">3</div> <div class="box-bdbat">活动时间8月13日-10月31日，过期抽奖次数清零，请您尽量在活动截止前将抽奖次数用完避免不必要的损失。</div></div>
				<div class="box-bdba"><div class="box-bdbak"></div> <div class="box-bdbat">*此活动与0元购活动不共享奖励</div></div>
			</div>
		</div>
		
	</div>
	<div  class="box-c" v-show="noluck">
		<div class="box-ca" >
			<div class="box-caa" >您暂无抽奖机会</div>
			<div class="box-cab" >好友当面扫此二维码<br/>您获得抽奖机会，好友也能领红包</div>
			<div class="box-cac" id="qrinvite-tcimg"></div>
			<div class="box-cad" ><img src="../../assets/img/lottery/tipbz.png" alt=""></div>
			<div class="box-cae" @click="noluck=false">知道了</div>
		</div>
		<div class="box-cb" ></div>
	</div>

	<div  class="box-c" v-if="winluck">
		<div class="box-cd" >
			<div class="box-cabi" >
				<img :src="imgUrl+'/static/img/lottery/iphone.png'" alt="" v-if="targetData.id==4">
				<img :src="imgUrl+'/static/img/lottery/kongtiao.png'" alt="" v-else-if="targetData.id==8">
				<img :src="imgUrl+'/static/img/lottery/jinbi.png'" alt="" v-else-if="targetData.id==1 || targetData.id==2 || targetData.id==5">
				<img :src="imgUrl+'/static/img/lottery/hongbao.png'" alt="" v-else-if="targetData.id==3 || targetData.id==6 || targetData.id==7">
			</div>
			<div class="box-caba" >恭喜您获奖</div>
			<div class="box-cabb" >{{targetData.prize}}</div>
			<div class="box-cabc" v-if="targetData.type==2">客服会在一周内联系您发货</div>
			<div class="box-cabc" v-else></div>
			<div class="box-cabd"  @click="closeFaceLuck"></div>
		</div>
	<div class="box-cb"></div>
</div>
</div>
</template>

<script>
import {jsonpGetData,LuckyRoller,LuckyRunner,getUserDraws,hostname} from '@/api/api';
import GLOBAL from '@/assets/js/lib/app.global'
import QRCode from 'qrcodejs2'
const lottery = resolve => require(['@/components/invite_lottery.vue'], resolve)

	export default {
		data() {
			return {
				imgUrl:hostname,
				urlParam:'',
				winHeight:'',
				codeData:'',
				runLuck:[1,2,5,8,7,6,3,0],//中奖转动的顺序
				luckData:[
					{
						active:'',
						id:1,
						title:'美的1.5匹空调',
						img:hostname+'/static/img/lottery/kongtiao.png',
					},{
						active:'',
						id:2,
						title:'100金币',
						img:hostname+'/static/img/lottery/jinbi.png',
						
					},{
						active:'',
						id:3,
						title:'300金币',
						img:hostname+'/static/img/lottery/jinbi.png',
						
					},{
						active:'',
						id:4,
						title:'1.88元现金',
						img:hostname+'/static/img/lottery/hongbao.png',
						
					},{
						active:'',
						id:5,
						title:'抽奖',
						img:hostname+'/static/img/lottery/ljcj_btn.png',
						
					},{
						active:'',
						id:6,
						title:'3.88元现金',
						img:hostname+'/static/img/lottery/hongbao.png',
						
					},{
						active:'',
						id:7,
						title:'18.8元现金',
						img:hostname+'/static/img/lottery/hongbao.png',
						
					},{
						active:'',
						id:8,
						title:'50金币',
						img:hostname+'/static/img/lottery/jinbi.png',
						
					},{
						active:'',
						id:9,
						title:'iPhone8P 64G',
						img:hostname+'/static/img/lottery/iphone.png',
						
					}
				],
				clipboard:'',
				noluck:false,
				winluck:false,
				luckNum:0,
				rollerData:[],
				targetData:'',
				target:8,//哪一个中奖
				loginToken:'',
				loadingData:false,
				shareUrl:''
			}
		},
		components: {
			lottery,
		},
		created(){
			var scope = this
			scope.urlParam = scope.$route.query; 
			scope.webLoadComplete();
			window.nativeGetRandomUrlCallBack=function(res){//获取到二维码Url数据
					let Base64 = require('js-base64').Base64;
					let shareUrl=Base64.decode(res.key);
					scope.shareUrl = shareUrl;
					scope.createQr('qrinvite-img');
					scope.createQr('qrinvite-tcimg');
			}	
		},
		mounted() {//初始化数据
			var scope = this
			scope.getLogParameter();
			window.getLogParameter = function (data) {//获取登录token
					if(GLOBAL.Os().android){
						data = JSON.parse(data);
					}
					scope.loginToken = data.login_token
					if(scope.loginToken!=''){
					// GLOBAL.App().toast(scope.loginToken)
						scope.getUserDraws();
						scope.getLuckyRoller()
					}else{//跳转登录
						var obj = {
							'method': 'goToViewLogin',
						}
						GLOBAL.App().postMessage(obj)
					}
			}
		},
		methods: {
			closeFaceLuck(){
				this.winluck=false;
				let target =this.runLuck[this.target-1];
				let luck= this.luckData[target];
					luck.active='';
				this.luckData.splice(target,1,luck);
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
			luckyWin(){
				this.luckNum --;
				this.winluck=true;
			},
			qrRecord(){
				this.$router.push({ path: 'qrRecord', query: { loginToken: this.loginToken, type:'qr' }})
			},
			getUserDraws(){//抽奖次数
				let scope=this;
				let listObj = {
						param:{
							lt: scope.loginToken,
						},
						callback:'pushUserDraws',
						url:getUserDraws,
				};
				window.pushUserDraws =function(res){
					if(res.code=='0'){
						scope.luckNum = res.data.res;
					}else{

					}
				}
				jsonpGetData(listObj);
			},
			getLuckyRoller(){//中奖滚动
				let scope=this;
				let listObj = {
						param:{
							lt: scope.loginToken,
						},
						callback:'pushLuckyRoller',
						url:LuckyRoller,
				};
				window.pushLuckyRoller =function(res){
					if(res.code=='0'){
						scope.rollerData=res.data;
					}else{

					}
				}
				jsonpGetData(listObj);
			},
			LuckyRunner(flg){//点击抽奖
				let scope=this;
				if(flg){//运行中不能点击抽奖
					return false;
				}
				if(scope.luckNum == 0){
					scope.noluck = true;
					return false;
				}
				let listObj = {
						param:{
							lt: scope.loginToken,
						},
						callback:'pushLuckyRunner',
						url:LuckyRunner,
				};
				window.pushLuckyRunner =function(res){
					if(res.code=='0'){
						scope.target=res.data.id;
						scope.targetData=res.data;
						scope.$refs.lotteryRunner.startRunner();//调用子组件的方法转动
					}else if(res.code=='2'){
						scope.noluck=true;
					}else if(res.code=='1'){
						GLOBAL.App().toast('手机号为空，请到我的页面绑定手机号!')
					}else{
						GLOBAL.App().toast(res.message)
					}
				}
				jsonpGetData(listObj);
			},
			getLogParameter() {//登陆toke
				var obj = {
					'method': 'getLogParameter',
					'callback':'getLogParameter'
				}
				GLOBAL.App().postMessage(obj)
			},
			createQr(type){
				var scope = this;
				console.log(type)
					var qrcode = new QRCode(document.getElementById(type), {
					});
					qrcode.makeCode(scope.shareUrl);
			},
		}

	}

</script>

<style lang="scss">

@import '../../assets/scss/common/_tools.scss';
    @keyframes marquee {
        0% {
            left:9rem
        }
        100% {
			left:-120rem;
        }
	}

.qr-face{
  background-image: url('../../assets/img/lottery/box-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #b6151a;
  width: 100%;
  padding-bottom: 0.5rem;
  .box-a{
	  height: 3.2rem;
	  width: 10rem;
	  overflow: hidden;
	  position: relative;
	  .box-aa{
		  overflow: hidden;
		  .box-aam{
			  position: absolute;
			  display: inline-block;
			  width: 120rem;
			  height: 0.587rem;
			  overflow: hidden;
			  animation: marquee 140s linear infinite;
			  margin: 0.13rem 0 0.067rem;
			  .box-aama{
				  display: inline-block;
				  color: #fff;
				  width: auto;
				  height: 0.587rem;
				  line-height: 0.6rem;
				  padding: 0 0.2rem 0 0.09rem;
				  border-radius: 1rem;
				  border: 1px solid #fcbf2d;
				  background-color: rgba(0, 0, 0, 0.3);
				  font-size: 0.374rem;
				  margin-right: 0.75rem;
				  .box-aama-img{
					  width: 0.4rem;
					  height: 0.4rem;
					  vertical-align: middle;
					  border-radius: 0.4rem;
					  margin-bottom: 0.14rem;
				  }
				  .box-aama-name{
					  margin: 0 0.1rem 0 0.05rem;
				  }
				  .box-aama-jp{
					  span{
						  margin: 0 0.1rem;
						  color: #feee3e
					  }
				  }
			  }
		  }
		.box-aal{
			margin: 0rem 0 0.1rem;
			top: 0.784rem;
			animation: marquee 120s linear infinite;
		}
	  }
  }
  .box-b{
	  margin-top: 0.8rem;
	  .box-ba{
		  color: #fff;
		  font-size: 0.35rem;
		  text-align: center;
		  height:2rem;
		  margin: 0 auto;
	  }
	  .box-bb{
		  width: 5.4rem;
		  height:5.4rem;
		  margin: 0 auto;
	  }
	  .box-bc{
		  margin-top: 3.5rem;
		  .box-bca{
				width: 4.94rem;
				height: 0.79rem;
				line-height: 0.79rem;
				font-size: 0.36rem;
				color: #eb241c;
				margin: 0 auto;
				text-align: center;
				background-image: url('../../assets/img/lottery/zjjl-btn.png');
				background-repeat: no-repeat;
				background-size: cover;
				padding-top: 0.05rem;
				span{
					background-image: url('../../assets/img/lottery/dicon.png');
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 0.5rem;
					color: #fff;
					display:inline-block;
					width: 0.35rem;
					height: 0.35rem;
					line-height: 0.35rem;
					margin-left: 0.1rem;
				}
		  }
		  .box-bcb{
			  width: 9.2rem;
			  height: 8rem;
			  margin: 0 auto;
			  border-radius: 0.35rem;
			  border: 0.18rem solid #ffda85;
		  }
	  }
	  .box-bd{
		  margin: 0 0.4rem;
		  .box-bda{
			  text-align: center;
			  font-size: 0.455rem;
			  color: #fff;
			  margin: 1.2rem 0 0.59rem;
			  font-weight: 600;
		  }
		  .box-bda::before{
			content: '';
			background-image: url('../../assets/img/lottery/title-zs.png');
			background-repeat: no-repeat;
			background-position: bottom;
			position: relative;
			display: inline-block;
			margin-right: 0.2rem;
			background-size: 100%;
			width: 0.7rem;
    		height: 0.35rem;
		}
		.box-bda::after{
			content: '';
			background-image: url('../../assets/img/lottery/title-zs.png');
			background-repeat: no-repeat;
			background-position: bottom;
			position: relative;
			display: inline-block;
			margin-left: 0.2rem;
			background-size: 100%;
			width: 0.7rem;
    		height: 0.35rem;
		}
		  .box-bdb{
			  font-size: 0.35rem;
			  color: #ffda85;
			  letter-spacing: 1px;
			  .box-bdba{
					display: flex;
					width: 9.2rem;
					font-size: 0.35rem;
					margin-bottom: 0.4rem;
					.box-bdbas{
						width: 0.5rem;
						height: 0.5rem;
						line-height: 0.5rem;
						border-radius: 0.5rem;
						padding-left: 0.15rem;
						margin-right: 0.3rem;
						color: #b6151a;
						background-color: #fff;
					}
					.box-bdbak{
						width: 0.5rem;
						height: 0.5rem;
						line-height: 0.5rem;
						border-radius: 0.5rem;
						padding-left: 0.15rem;
						margin-right: 0.3rem;
					}
					.box-bdbat{
						width: 8.2rem;
					}
					// div{
					// 	span{
					// 		display: block;
					// 		padding: 0.03rem 0.175rem;
					// 		text-align: center;
					// 		color: #b6151a;
					// 		background-color: #fff;
					// 		border-radius: 0.5rem;
					// 		margin-right: 0.3rem;
					// 	}
					// }
			  }
		  }
	  }
  }
  .box-c{
	  .box-ca{
		margin: 23% 1.27rem;
		width: 7.46rem;
		height: 11.134rem;
		color: #222;
		z-index: 2000;
		position: fixed;
		top: 0;
		font-size: 14px;
		background-color: #fff;
		padding: .2rem 0.4rem 0.4rem 0.4rem;
		border-radius: .5rem;
		text-align: center;
		.box-caa{
			color: #999;
			font-size: 0.48rem;
			margin: 0.694rem 0 0.52rem;
		}
		.box-cab{
			color: #eb2a30;
			font-size: 0.35rem;
		}
		.box-cac{
			width: 3.92rem;
			height: 3.92rem;
			margin: 0.4rem auto;
			margin-bottom: 0.1rem;
			img{
				width: 3.92rem;
				height: 3.92rem;
			}
		}
		.box-cad{
			width: 4.45rem;
			height: 1.2rem;
			margin: 0.2rem auto;
		}
		.box-cae{
			color: #eb2a30;
			font-size: 0.45rem;
			width: 6.16rem;
			height: 1.2rem;
			margin: 0 auto;
			margin-top: 0.67rem;
			line-height: 1.2rem;
			border: 1px solid #eb2a30;
			border-radius: 1.5rem;
		}
	  }
	  .box-cd{
		background-image: url('../../assets/img/lottery/zjla.png');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		margin: 23% 1.27rem;
		width: 7.46rem;
		height: 12rem;
		color: #222;
		z-index: 2000;
		position: fixed;
		top: 0;
		font-size: 14px;
		padding: .2rem 0.4rem 0.4rem 0.4rem;
		border-radius: .5rem;
		text-align: center;
		padding-top: 4.2rem;
		.box-caba{
			color: #333;
			font-size: 0.454rem;
		}
		.box-cabb{
			color: #d8272c;
			font-size: 0.374rem;
		}
		.box-cabc{
			color: #999;
			height: 0.5rem;
			font-size: 0.374rem;
		}
		.box-cabd{
			width: 4.4rem;
			height: 1.6rem;
			background-image: url('../../assets/img/lottery/zjlbtn.png');
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;

			margin: 0 auto;
		}
	  }
	  .box-cb{
		position: fixed;
		z-index: 1200;
		top: 0px;
		width: 10rem;
		background-color: rgba(0, 0, 0, 0.6);
		height: 100%;
	  }
  }
}

</style>
