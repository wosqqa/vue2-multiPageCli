<template>
<div class="qr-record">
	<div class="box-a" v-if="recodrdData.length > 0">
		<div class="box-ab">
			中奖记录
		</div>
		<div class="box-ac">
			<div class="box-aca">
				奖品
			</div>
			<div class="box-acb">
			中奖时间
			</div>
			<div class="box-acc">
				数量
			</div>
		</div>
		<div class="box-ad">
			<div :class="'box-ada '+ (index%2==0 ? 'box-adabg':'')" v-for="(item,index) in recodrdData" :key="index">
				<div class="box-adaa">
					{{item.prize_name}}
				</div>
				<div class="box-adab">
				{{item.draw_time}}
				</div>
				<div class="box-adac">
					{{item.count}}
				</div>
			</div>
		</div>
	</div>
	<div class="box-b" v-else>
		<div class="box-ba"></div>
		<div class="box-bb">您当前还未中奖</div>
		<div class="box-bc">面对面邀请好友抽奖吧</div>
	</div>
</div>
</template>

<script>
import {jsonpGetData,LuckyRoller,qqLuckyRoller} from '@/scripts/api/api';
import GLOBAL from '@/scripts/util/app.global'

	export default {
		data() {
			return {
				urlParam:'',
				recodrdData:[]
			}
		},
		created(){
			var scope = this
			scope.urlParam = scope.$route.query; 
		},
		watch: {
			'$route' (to, from) {
				if(this.urlParam.type=='qq'){
					this.getLuckyRoller(qqLuckyRoller)
				}else{
					this.getLuckyRoller(LuckyRoller)
				}
			}
		},
		mounted() {//初始化数据
			if(this.urlParam.type=='qq'){
				this.getLuckyRoller(qqLuckyRoller)
			}else{
				this.getLuckyRoller(LuckyRoller)
			}
		},
		methods: {
			getLuckyRoller(typeURL){//中奖滚动
				let scope=this;
				let listObj = {
						param:{
							lt: scope.urlParam.loginToken,
							info:'test'
						},
						callback:'pushLuckyRoller',
						url:typeURL,
				};
				window.pushLuckyRoller =function(res){
					if(res.code=='0'){
						scope.recodrdData=res.data;
					}else{

					}
				}
				jsonpGetData(listObj);
			},
		}

	}

</script>

<style lang="scss">

@import '@/styles/common/_tools.scss';

.qr-record{
  width: 10rem;
  margin: 0 auto;
  height: 100%;
  font-size: 12px;
  background-color: #b6151a;
  position: fixed;
  left: 0;
  top: 0;
  .box-a{
	  width: 9.2rem;
	  height: 93%;
	  margin: 0.4rem;
	  padding: 0.3rem;
	  box-sizing: border-box;
	  border-radius: 0.3rem;
	  background-color: #fff;
	  .box-ab{
		  color: #b6151a;
		  font-size: 0.454rem;
		  margin-bottom: 0.8rem;
		  margin-top: 0.3rem;
		  text-align: center;
		  font-weight: 600
	  }
	  .box-bda{
			  text-align: center;
			  font-size: 0.455rem;
			  color: #fff;
			  margin: 1.2rem 0 0.59rem;
			  font-weight: 600;
		  }
		  .box-ab::before{
			content: '';
			background-image: url('../../assets/lottery/title-zs.png');
			background-repeat: no-repeat;
			background-position: bottom;
			position: relative;
			display: inline-block;
			margin-right: 0.2rem;
			background-size: 100%;
			width: 0.7rem;
    		height: 0.35rem;
		}
		.box-ab::after{
			content: '';
			background-image: url('../../assets/lottery/title-zs.png');
			background-repeat: no-repeat;
			background-position: bottom;
			position: relative;
			display: inline-block;
			margin-left: 0.2rem;
			background-size: 100%;
			width: 0.7rem;
    		height: 0.35rem;
		}
	  .box-ac{
		  background-color: #f5eedc;
		  width: 8.55rem;
		  height: 1.2rem;
		  line-height: 1.2rem;
		  font-size: 0.44rem;
		  border-radius: 0.2rem 0.2rem 0 0;
		  color: #c39d5b;
		  padding: 0 0.4rem;
		  display: flex;
		  flex-flow: row nowrap;
		  border: 0.05rem solid #f5eedc;
		  justify-content: space-between;
	  }
	  .box-ad{
		  width: 8.55rem;
		  height: 77%;
		  overflow: hidden;
		  overflow-y:auto;
		  border: 0.05rem solid #f5eedc;
		  border-radius:  0 0 0.2rem 0.2rem;
		  .box-ada{
			height: 0.93rem;
			line-height: 0.93rem;
			display: flex;
			color: #7e7e7e;
			flex-flow: row nowrap;
			justify-content:space-between;
			padding: 0 0.4rem;
			.box-adaa{
				min-width: 3rem;
				text-align: left;
			}
			.box-adab{
				min-width: 3rem;
				text-align: left;
			}
			.box-adac{
				min-width: 2.5rem;
				text-align: center;
			}
		  }
		  .box-adabg{
			  background-color: #f8f8f8;
		  }
	  }
  }
  .box-b{
	width: 9.2rem;
	height: 93%;
	margin: 0.4rem;
	padding: 45% 0;
	box-sizing: border-box;
	text-align: center;
	border-radius: 0.3rem;
	background-color: #fff;
	letter-spacing: 1px;
	.box-ba{
		width: 2.5rem;
		height: 2.5rem;
		margin: 0.4rem auto;
		background-image: url('../../assets/lottery/listk.png');
		background-repeat: no-repeat;
		background-size: contain;
	}
	.box-bb{
		font-size: 0.5rem;
		color: #000;
		margin: 0.5rem 0 0.2rem;
	}
	.box-bc{
		font-size: 0.4rem;
		color: #ccc;
	}
  }
}

</style>
