<template>
	<div class="app_inviteCode">
		 <div class="code-container">
			<div class="code-box1">222填写好友邀请码，立得<span class="text-red">{{codeData.geter_money}}元</span>奖励！</div>
			<div class="code-box2"><input type="text" v-model="inviteCode" class="inviteCode" placeholder="输入邀请码  (向介绍人索取)"></div>
			<div class="code-box3" @click="submitCode">提交邀请码</div>
			<div class="code-copy">
				<span id="codeNum"></span>
				<div ></div>
			</div>
			
		</div>
		<div  class="code-split"></div>
		<div class="code-container">
			<div class="code-img"><img src="../../assets/invite/yqjinbi.png" alt="" srcset=""></div>
			<div class="code-red">邀请好友赚大钱</div>
			<div class="code-info code-info-money">邀请好友赚最高<span class="text-red">215元</span>现金奖励</div>
			<div class="code-info">您的好友邀请成功，您还可以<span class="text-red">额外获得现金奖励</span></div>
			<div class="code-info">您的好友还可以为您<span class="text-red">源源不断赚钱</span></div>
			<div  class="code-btnfx" @click="gotoInviteCallBack">邀请好友去赚大钱</div>
		</div>
	</div>
</template>

<script>
import {getInviteCode,jsonpGetData} from '@/scripts/api/api';
import GLOBAL from '@/scripts/util/app.global'
	export default {
		data() {
			return {
				clickNum: '',
				inviteCode:'',
				codeNum:'888888888',
				urlQuery:'',
				codeData:'',
				clipboard:'',
			}
		},
		created(){
			this.urlParam=this.$route.query;
			this.getInviteCode();
		},
		mounted() {//初始化数据
		},
		methods: {
			getInviteCode(){//获取页面参数
				let scope=this;
				let listObj={
					param:{
						accid: scope.urlQuery.accid,
						imei:scope.urlQuery.ime,
						oem:scope.urlQuery.apptypeid,
						qid:scope.urlQuery.qid,
						version:scope.urlQuery.appver,
						plantform:scope.urlQuery.os,
					},
					callback:'getInviteCodeData',
					url:getInviteCode,
				}

				window.getInviteCodeData = function(data) {
					scope.codeData = data;
					scope.pushData();
				}
				jsonpGetData(listObj);
			},
			submitCode(){//提交邀请码
				let timestamp = Date.parse(new Date());
				if(this.clickNum=='' || timestamp-this.clickNum>5000){//5秒内不能重复提交
					let obj = {
					'method': 'submitCodeCallBack',
					'inviteCode':this.inviteCode,
					'bindMobileReward':this.codeData.bind_mobile_reward
					}
					GLOBAL.App().sentLog(536)
					try {
					GLOBAL.App().postMessage(obj);
					} catch (e) { 
					console.error(e); 
					}	
				}
				this.clickNum = timestamp;
			},
			gotoInviteCallBack(){
					let obj = {
					'method': 'gotoInviteCallBack',
					}
						GLOBAL.App().sentLog(355)
					try {
						GLOBAL.App().postMessage(obj);
					} catch (e) { 
					console.error(e); 
					}
			},
			copyClipboard(){//复制按钮
				let _this = this
				let obj = {
				'method': 'copyText',
				"text" : _this.codeNum,
				'successPrompt':'邀请码已复制'
				}
				GLOBAL.App().sentLog(608)
				try {
				GLOBAL.App().postMessage(obj);
				} catch (e) { 
				console.error(e); 
				}
			},
			pushData(){//提交给app右上角图片显示
				var obj = {
				'method': 'pushData',
				'inviteRule':this.codeData.html_base64ed
				}
				GLOBAL.App().sentLog(536)
				try {
				GLOBAL.App().postMessage(obj);
				} catch (e) { 
				console.error(e); 
				}
			},
			
		}

	}

</script>

<style lang="scss">
@import "../../styles/to_invite.scss";
</style>
