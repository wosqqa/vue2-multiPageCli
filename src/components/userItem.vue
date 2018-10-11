<template>
<div class="user-info" @click="goUserInfo">
	<div class="list-img">
		<img v-if="userData.headpic" :src="userData.headpic"/>
		<img v-else src="http://resources.dftoutiao.com/songheng/DFTT/default/img/dftt00000.png"/>
		<!-- <span class="list-img-b"></span> -->
	</div>
	<div class="list-user">
		<div class="list-user-a">
			<span class="list-user-ab" >{{userData.nickname | replaceMobile}}</span> <span v-if="bookName!=''" v-text="'('+bookName+')'"></span>
		</div>
		<div class="list-user-b" v-if ="userData.bonus>0" >今日进贡：<span style="color:#f44b50;">+{{parseInt(userData.bonus)}}</span>金币</div>
		<div class="list-user-b" v-else>成功唤醒好友，立得<span style="color:#f44b50;">500</span>金币</div>
	</div>
	<div class="list-gx" v-if="(userData.isreg =='300' || userData.isreg=='600')&&userType=='hy'">
		<div></div>
		<p>+{{parseInt(userData.bonus)}}<span class="list-jinbi"></span> </p><p class="list-p">今日进贡</p>
	</div>
	<div class="list-gx" v-else-if="userData.isreg=='100'&&userType=='hy'">
		<p class="list-p">待注册好友</p>
	</div>
	<div class="list-gx" v-else-if="userData.isreg=='200'&&userType=='hy'">
		<p class="list-p">新好友</p>
	</div>
	<div class="list-gx" v-else-if="userData.isreg=='400'&&userType=='hy'">
		<p class="list-p">已唤醒</p>
	</div>
	<div class="list-gx" v-else-if="userData.tag=='200'&&userType=='hx'">
		<p class="list-p">已唤醒</p>
	</div>
	<div class="list-gx" v-else-if="userData.tag=='500'&&userType=='hy'" >
		<p> <span class="list-hx" @click.stop="tapWakeupUser('hx')">唤醒ta</span></p>
		<p class="list-p">好友好久未进贡</p>
	</div>
	<div class="list-gx" v-else-if="userData.tag=='666'">
		<p> <span class="list-hx" @click.stop="tapWakeupUser('yfc')" style="font-size:0.30rem;padding-top:0.04rem;">继续唤醒</span></p>
	</div>
	<div class="list-gx" v-else-if="(userData.tag=='100'|| (userData.tag=='600'&& parseInt(userData.bonus)==0))&&userType=='hx'" >
		<p class="list-pd">2018/09/25</p>
		<p> <span class="list-hx" @click.stop="tapWakeupUser('hx')">唤醒ta</span></p>
	</div>
	<div class="list-gx" v-else>
		<p> <span class="list-hx" @click.stop="tapWakeupUser('hx')">唤醒ta</span></p>
		<p class="list-p">好友未进贡</p>
	</div>
</div>
</template>

<script>
import {getInviteCode,hostname} from '@/api/api';
import GLOBAL from '@/assets/js/lib/app.global'
import stringUtils from '@/assets/js/string.utils'
	export default {
		props:[
			'userData','userIndex','userType'
		],
		filters: {
			replaceMobile(value) {//替换中间手机号
					return stringUtils.replaceMobile(value)
			},
		},
		data() {
			return {
				bookName:'',
			}
		},
		created(){
			var scope = this;
		},
		mounted() {//初始化数据
			var scope = this
			let day =new Date().getFullYear()+''+new Date().getMonth()+''+new Date().getDate();
			scope.bookInfo = JSON.parse(localStorage.getItem("bookInfo"));
			if(scope.bookInfo && scope.bookInfo[scope.userData.mobile]){//识别昵称
				scope.bookName =	scope.bookInfo[scope.userData.mobile]
			}
			scope.bookInfoAccid = JSON.parse(localStorage.getItem("bookInfoAccid"+day));
			if(scope.bookInfoAccid.indexOf(scope.userData.accid)>-1 && scope.userType =='hx'){//获取唤醒过的accid 识别已邀请
				scope.$set(scope.userData,'tag','666');
			}else if(scope.bookInfoAccid.indexOf(scope.userData.inviteaccid)>-1 && scope.userType =='hy'){
				scope.$set(scope.userData,'tag','666');
			}
		},
		methods: {
			tapWakeupUser(type){//单机唤醒
				if(this.userType =='hy'){
					this.userData.accid = this.userData.inviteaccid
				}
				openWakeupShare(this.userData);
				if(type == 'hx'){
					GLOBAL.App().sentLog(382)
				}else{
					GLOBAL.App().sentLog(546)
				}
				if(scope.userType == 'hx'){
					GLOBAL.App().uploadActivityLog('',null,1250006,'huanxing','click',"entry",'');
				}else{
					GLOBAL.App().uploadActivityLog('',null,1250007,'huanxing','click',"entry",'');
				}
			},
			goUserInfo(){
				if(this.userType =='hy'){
					this.userData.accid = this.userData.inviteaccid;
					GLOBAL.App().sentLog(1409)
				}else{
					GLOBAL.App().sentLog(1408)
				}
				this.$router.push({ path: 'friendInfo', query: {accid:this.userData.accid}})
			}
		}

	}

</script>

<style lang="scss">

@import '../assets/scss/common/_tools.scss';

.user-info{
		display:  flex;
		flex-flow: row nowrap;
		padding-right: 0.4rem;
		margin-left: 0.4rem;
		justify-content:  space-around;
		background-color: #fff;
		height: 1.73rem;
		line-height: 1.73rem;
		border-bottom: 1px solid #f1f1f1;
		.list-img{
			width: 1.293rem;
			height: 1.21rem;
			position: relative;
			flex-grow: 0;
			overflow: hidden;
			vertical-align: middle;
			padding: 0.1rem 0.1rem 0.1rem 0;
			margin: auto;
			img{
				width: 1.093rem;
				height: 1.093rem;
				margin-right: 5px;
				border-radius: 50%;
			}
			.list-img-b{
				content: "";
				position: absolute;
				top: 0.1rem;
				right: 0.04rem;
				border-radius: 50px;
				width: 10px;
				height: 10px;
				background: #f44b50;
			}
		}

		.list-user{
			flex-grow: 1;
			padding-left: 0.18rem;
			align-self: center;
			font-size: 15px;
			line-height: 0.54rem;
			.list-user-a{
				width:5.2rem;
				height: 0.7rem;
				text-align:left;
				display: flex;
				.list-user-ab{
					display: block;
					max-width:3rem;
					height: 0.7rem;
					line-height: 0.7rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap
				}
			}
			.list-user-b{
				font-size: 13px;
				border-radius: 0.1rem;
				// border: 1px solid #e9e9e9;
				width: max-content;
				padding: 0 0.1rem;
				color: #999;
			}
		}
		.list-gx{
			flex-grow: 0;
			align-self: center;
			line-height: 0.62rem;
			p{
				font-size: 18px;
				// color: #f44b50;
				color:#ff742a;
				.list-jinbi{
					background-image: url('../assets/img/yqhy/csjinbi@2x.png');
					background-repeat: no-repeat;
					position: relative;
					display: inline-block;
					background-size: cover;
					width: 15px;
					height: 15px;
					margin-left: 0.05rem;
				}
				.list-hx{
					border-radius: 0.5rem;
					width: 51px;
					display: block;
					text-align: center;
					// padding: .05rem 0rem;
					margin-left: 0.8rem;
					background-color: white;
					font-size: 12px;
					color: #f44b50;
					border: 1px solid;
				}

			}
			.text-red{
				color: #f44b50;
				line-height: 0.9rem;
			}
			.list-p{
				font-size: 12px;
				text-align: right;
				color: #999;
			}
			.list-pd{
				font-size: 10px;
				text-align: right;
				color: #999;
			}
			.list-line{
				font-size: 12px;
				margin: 0.2rem auto;
				text-align: right;
				color: #999;
			}
		}
}

</style>
