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
	</div>
	
	<div class="box-b">
		<div class="box-ba">
			活动时间：8月13日至10月31日
		</div>
		<div class="box-bc">
			<div class="box-bca" @click="qrRecord">
				邀请好友数与中奖记录<span></span>
			</div>
			<div class="box-bcb">
				<lottery ref="lotteryRunner" @luckyWin = "luckyWin" :runLuck='runLuck' :luck-data="luckData" :luck-num="luckNum" :target="target" @LuckyRunner = "LuckyRunner"></lottery>
			</div>
		</div>
		<div class="box-bd">
			<div class="box-bda">
				活动规则
			</div>
			<div class="box-bdb">
				<div class="box-bdba"><div class="box-bdbas">1</div> <div class="box-bdbat">通过QQ分享成功邀请一名好友，且好友阅读获得30金币，您可获得一次抽奖机会。</div></div>
				<div class="box-bdba"><div class="box-bdbas">2</div> <div class="box-bdbat">参与抽奖您将获得实物/现金/金币奖励一份，单次抽奖最高可获得iphone8P 64G手机一部。</div></div>
				<div class="box-bdba"><div class="box-bdbas">3</div> <div class="box-bdbat">活动时间8月13日-10月31日，过期抽奖次数清零，请您尽量在活动截止前将抽奖次数用完避免不必要的损失。</div></div>
				<div class="box-bdba"><div class="box-bdbak"></div> <div class="box-bdbat">*此活动与0元购活动不共享奖励</div></div>
			</div>
		</div>
		
	</div>
	<div  class="box-d" >
		<div class="box-da"  @click="openShareApp"></div>
		<div class="box-db" >分享到3个以上QQ群，成功邀请的几率能够提升200%</div>
	</div>
	<div  class="box-c" v-if="noluck">
		<div class="box-ca" >
			<div class="dialog-close">
                      <span @click="noluck=false"></span>
            </div>
			<div class="box-cac" ><img src="../../assets/img/lottery/qqno.png" alt=""></div>
			<div class="box-caa" >您当前没有抽奖机会</div>
			<div class="box-cab" >每邀请一位好友就获得8元现金和<br/>一次抽奖机会，百分百中奖!</div>
			<div class="box-cae"  @click="openShareApp"></div>
		</div>
		<div class="box-cb" ></div>
	</div>

	<div  class="box-c" v-if="winluck">
		<div class="box-cd" >
			<div class="box-cabi" >
				<img :src="imgUrl+'/static/img/lottery/txhy.png'" alt="" v-if="targetData.id==2">
				<img :src="imgUrl+'/static/img/lottery/lbpf.png'" alt="" v-else-if="targetData.id==8">
				<img :src="imgUrl+'/static/img/lottery/jinbi.png'" alt="" v-else-if="targetData.id==3 || targetData.id==7">
				<img :src="imgUrl+'/static/img/lottery/hongbao.png'" alt="" v-else-if="targetData.id==1 || targetData.id==5">
				<img :src="imgUrl+'/static/img/lottery/QQhy.png'" alt="" v-else-if="targetData.id==6">
				<img :src="imgUrl+'/static/img/lottery/iphone.png'" alt="" v-else-if="targetData.id==4">
			</div>
			<div class="box-caba" >恭喜您获奖</div>
			<div class="box-cabb" >{{targetData.prize}}</div>
			<div class="box-cabc" v-if="targetData.type==2">客服会在一周内联系您发货</div>
			<div class="box-cabd"  @click="closeLuck"></div>
		</div>
	<div class="box-cb" ></div>
</div>
</div>
</template>

<script>
import {jsonpGetData,qqLuckyRoller,qqLuckyRunner,getQqUserDraws,hostname} from '@/api/api';
import GLOBAL from '@/assets/js/lib/app.global'
const lottery = resolve => require(['@/components/invite_lottery.vue'], resolve)

	export default {
		data() {
			return {
				imgUrl:hostname,
				urlParam:'',
				winHeight:'',
				codeData:'',
				clipboard:'',
				runLuck:[1,2,5,8,7,6,3,0],//中奖转动的顺序
				noluck:false,
				from:'',
				winluck:false,
				luckData:[{
					active:'',
					id:1,
					title:'鲁班皮肤',
					img:hostname+'/static/img/lottery/lbpf.png',
				},{
					active:'',
					id:2,
					title:'3.88元现金',
					img:hostname+'/static/img/lottery/hongbao.png',
					
				},{
					active:'',
					id:3,
					title:'腾讯视频会员季卡',
					img:hostname+'/static/img/lottery/txhy.png',
					
				},{
					active:'',
					id:4,
					title:'50金币',
					img:hostname+'/static/img/lottery/jinbi.png',
					
				},{
					active:'',
					id:5,
					title:'抽奖',
					img:hostname+'/static/img/lottery/ljcj_btn.png',
					
				},{
					active:'',
					id:6,
					title:'100金币',
					img:hostname+'/static/img/lottery/jinbi.png',
					
				},{
					active:'',
					id:7,
					title:'QQ超级会员30天',
					img:hostname+'/static/img/lottery/QQhy.png',
					
				},{
					active:'',
					id:8,
					title:'1.88现金',
					img:hostname+'/static/img/lottery/hongbao.png',
					
				},{
					active:'',
					id:9,
					title:'iPhone8P 64G',
					img:hostname+'/static/img/lottery/iphone.png',
				}],
				luckNum:0,
				rollerData:[],
				target:3,//哪一个中奖
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
			 if(scope.urlParam.from == undefined){
				scope.from = 93
			 }else{
				scope.from = scope.urlParam.from
			 }
		},
		mounted() {//初始化数据
			var scope = this
			console.log(document.documentElement.clientHeight);
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
			this.uploadActivityLog(null,'',1000006,'invitefriend','show',"page",'');
		},
		methods: {
			qrRecord(){
				this.$router.push({ path: 'qrRecord', query: { loginToken: this.loginToken, type:'qq' }})
			},
			getUserDraws(){//抽奖次数
				let scope=this;
				let listObj = {
						param:{
							lt: scope.loginToken,
						},
						callback:'pushUserDraws',
						url:getQqUserDraws,
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
						url:qqLuckyRoller,
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
						url:qqLuckyRunner,
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
			openShareApp(){// 分享
				this.noluck = false;
				let	obj = {
					'method': 'shareInviteFrom',
					'type': 1,
					'from':this.from
					}
					console.log(obj)
					GLOBAL.App().sentLog(369)
					try {
						GLOBAL.App().postMessage(obj);
					} catch (e) { 
					console.error(e); 
					}
			},
			uploadActivityLog(thisurl,materialid,actentryid,actid,type,acttype,plan){//上报事件
					let objLog ={
						method:"uploadActivityLog",
						thisurl: thisurl,
						materialid:materialid,
						actentryid:actentryid,
						acttype: acttype,
          				plan: plan,
						actid:actid,
						type:type
					}
					try {
					GLOBAL.App().postMessage(objLog);
					} catch (e) { 
					console.error(e); 
					}
			},
			closeLuck(){
				this.winluck=false;
				let target =this.runLuck[this.target-1];
				let luck= this.luckData[target];
					luck.active='';
				this.luckData.splice(target,1,luck);
			},
			luckyWin(){
				this.luckNum --;
				this.winluck=true;
			}
			
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
  background-image: url('../../assets/img/lottery/qqbg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #c10629;
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
	  margin-top: 1.26rem;
	  margin-bottom: 2.1rem;
	  .box-ba{
		  color: #77041d;
		  font-size: 0.35rem;
		  text-align: center;
		  height:1rem;
		  margin: 0 auto;
	  }
	  .box-bc{
		  margin-top: 1rem;
		  .box-bca{
				width: 4.94rem;
				height: 0.79rem;
				line-height: 0.8rem;
				font-size: 0.36rem;
				color: #9b130f;
				margin: 0 auto;
				text-align: center;
				background-image: url('../../assets/img/lottery/zjjl-btn.png');
				background-repeat: no-repeat;
				background-size: cover;
				span{
					background-image: url('../../assets/img/lottery/icon.png');
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
		margin: 3.39rem 1.27rem;
		width: 7.46rem;
		height: 9.28rem;
		color: #222;
		z-index: 2000;
		position: fixed;
		top: 0;
		font-size: 14px;
		background-color: #fff;
		padding: .2rem 0.4rem 0.4rem 0.4rem;
		border-radius: .5rem;
		text-align: center;
		.dialog-close{
			background-color: #fff;
			position: absolute;
			top: 0.48rem;
    		right: 0.45rem;
			height: 0.4rem;
			z-index: 100;
			span{
				float: right;
				@include bgnrcbc(0.4rem,'../../assets/img/icon/gzclose');
			}
		}
		.box-caa{
			color: #333;
			font-size: 0.48rem;
			font-weight: 500;
			margin: 0.2rem 0 0.22rem;
		}
		.box-cab{
			color: #999;
			font-size: 0.373rem;
			margin: 0.1rem 0 0.5rem;
		}
		.box-cac{
			width: 6rem;
			margin: 0.4rem auto;
			margin-bottom: 0.1rem;
			img{
				width: 5.5rem;
				height: 4rem;
			}
		}
		.box-cad{
			width: 4.45rem;
			height: 1.2rem;
			margin: 0rem auto;
		}
		.box-cae{
			font-size: 0.45rem;
			width: 6.12rem;
			height: 1.4rem;
			padding-top: 0.3rem;
			margin: 0 auto;
			border-radius: 1.5rem;
			background-image: url('../../assets/img/lottery/shareqq.png');
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
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
  .box-d{
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	  height: 2.345rem;
	  background-color: #df2145;
	  text-align: center;
	  .box-da{
		background-image: url('../../assets/img/lottery/bsbtn.png');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		width: 10rem;
		height: 1.45rem;
		margin-top: 0.2rem;
	  }
	  .box-db{
		  margin: 0.1rem auto;
		  font-size:0.32rem;
		  color: #fff;
	  }

  }
}

</style>
