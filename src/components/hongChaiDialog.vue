<template>
		<div class="awaken-container-dialog" id='awaken-dialog'>
			<div class="dialog-content">
					<div  class="dialog-top-close" @click="closeHongChaiDialog"></div>
					<div class="dialog-cont">
						<div  v-if="myParam.status!=1">
							<div class="dialog-txt">
								恭喜您获得
							</div>
							<div class="dialog-user">
								<img class="dialog-user-icon" :src="myParam.head.length > 0 ? myParam.head : '//resources.dftoutiao.com/songheng/DFTT/default/img/dftt00000.png'"> 
								<span class="dialog-user-name" v-if="myParam.next_hongbao_type !=2" >{{myParam.nick.length > 0 ? myParam.nick : '头条用户'}}</span>助力的红包
								<span style="color:red;font-weight: 600;" v-if="myParam.next_hongbao_type==2" >X10</span>
							</div>
							<div class="dialog-num">
								<span>￥</span>{{myParam.bonus}}
							</div>
							<div class="dialog-btn" @click="awakeTaWithShare(1400006)">
								晒红包
							</div>
							<div class="dialog-btxt">
								已存入您的余额中
							</div>
						</div>
						<div  v-else>
							<div class="dialog-txt2">
								您兜里的红包已经拆完
							</div>
							<div class="dialog-txt3">
								时间有限赶紧去抢！<br/>
								&nbsp;&nbsp;&nbsp;&nbsp;
							</div>
							<div class="dialog-num">
							</div>
							<div class="dialog-btn" @click="awakeTaWithShare(1400005)">
								立即去邀请
							</div>
						</div>
					</div>
			</div>
			<div class="awaken-dialog-modal" ></div>
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
				hongData:'',
				urlParam:''
			}
		},
		created() {
		this.urlParam=this.$route.query;
			//webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow"
			// GLOBAL.App().toast(this.urlParam.accid);
		},
		mounted() {
			//初始化数据
		},
		methods: {
			awakeTaWithShare(shareId){
				let scope=this;
				// let shareType = 0
				// // GLOBAL.App().toast('GLOBAL.Os().android');
				// if(GLOBAL.Os().android){//安卓分享朋友圈
				// 	shareType=3
				// }
				// let obj={
				// 	'method': 'shareInviteInfo',
				// 	'type': shareType
				// 	};
				// GLOBAL.App().postMessage(obj);
				scope.$emit('shareApp',shareId);//打点
				scope.$emit('giveInviteApprentice');//重新请求

			},
			closeHongChaiDialog(){
				this.$emit('closeHongChaiDialog',false);//关闭
			}
		}

	}

</script>

<style scoped lang="scss">
@import '../../styles/common/_tools.scss';
.awaken-container-dialog{
    // @include dialog();
    .dialog-content{
      margin: 23% 1rem;
      height: 9rem;
      color: #222;
			z-index: 2000;
			position: fixed;
			top: 0;
			font-size: 14px;
			background-color: #fdfdfd00;
			padding: .2rem 0.4rem 0.4rem 0.4rem;
			border-radius: .5rem;
			.dialog-top-close{
				@include bgnrcbc(1rem,'../assets/share/topClose');
				width: 0.7rem;
				height: 1.3rem;
				float: right;
				margin-right: 0.4rem;
			}
      .dialog-cont{
				@include bgnrcbc(7.5rem,'../assets/share/hongbaoka');
        overflow-y: auto;
				height: 8.5rem;
				background-size: 95%;
				background-position: top;
				text-align: center;
				.dialog-txt{
					font-size: 0.51rem;
					color: #222;
					margin-top: 0.9rem;
				}
				.dialog-txt2{
					font-size: 0.46rem;
					color: #222;
					margin-top: 1.3rem;
				}
				.dialog-txt3{
					font-size: 0.44rem;
					color: #222;
					margin: 1rem 0;
				}
				.dialog-user{
					font-size: 0.35rem;
					color: #fff;
					height: 0.9rem;
					width: 4rem;
					line-height: 0.9rem;
					background-color: #f74046;
					margin: 0.3rem auto 0rem;
					border-radius: 0.5rem;
					.dialog-user-icon{
						height: 0.7rem;
						line-height: 0.7rem;
						border-radius: 0.5rem;
						vertical-align: middle;
						// margin-bottom: 0.05rem;
					}
					.dialog-user-name{
						color: #fff100;
						width: 1.2rem ;
						height: 0.75rem;
						display: inline-flex;
						white-space: normal;
    				overflow: hidden;
					}
        }
        .dialog-num{
					color: #f74046;
					margin-top: 0.12rem;
					font-size: 1.6rem;
					span{
						font-size: 1.2rem;
					}
				}
				.dialog-btn{
					color: #f33c42;
					font-size: 0.48rem;
					margin-top: 0.6rem;
					@include bgnrcbc(1.5rem,'../assets/share/sbutton');
					width: 5.2rem;
					height: 1.4rem;
					line-height: 1.4rem;
				}
				.dialog-btxt{
					margin-top: 0.2rem;
					font-size: 0.4rem;
					color: #fff
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
