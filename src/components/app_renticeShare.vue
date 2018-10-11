<template>
		<div  class="app-share">
			<!-- <div  class="popup-top-txt">
				<span>每成功邀请好友1名 ,获1次砸金蛋机会</span>
			</div> -->
			<div class="popup-share">
					<div @click="openShareApp('pyq')"  v-if="urlParam.os !=='iOS'" >
						<div class="share-bgimg share-pyq"></div>
						<div class="share-type">朋友圈邀请</div>
					</div>
					<div  @click="openShareApp('wx')">
						<div  class="share-bgimg share-wx"></div>
						<div  class="share-type">微信邀请</div>
					</div>
					<div  @click="openShareApp('mdm')">
						<div  class="share-bgimg share-mdm"></div>
						<div  class="share-type">面对面邀请</div>
					</div>
					<div  @click="openShareApp('qq')">
						<div  class="share-bgimg share-qq"></div>
						<div  class="share-type">QQ邀请</div>
					</div>
					<div  @click="openShareApp('dx')"   v-if="urlParam.os =='iOS'" >
						<div  class="share-bgimg share-dx"></div>
						<div  class="share-type">短信邀请</div>
					</div>
          			<div  @click="openShareApp('wb')">
						<div  class="share-bgimg share-wb"></div>
						<div  class="share-type">微博邀请</div>
					</div>
					<div  @click="openShareApp('dx')"   v-if="urlParam.os !=='iOS'" >
						<div  class="share-bgimg share-dx"></div>
						<div  class="share-type">短信邀请</div>
					</div>
					<div  @click="openShareApp('qf')">
						<div  class="share-bgimg share-qf"><span class="rf-text-red" ></span></div>
						<div  class="share-type">群发邀请</div>
					</div>
          			<div   v-if="urlParam.os !=='iOS'">
						<div  class="share-bgimg"></div>
						<div  class="share-type"></div>
					</div>
		</div>
		</div>
</template>

<script>
export default {
  props: ["myParam"],
  data() {
    return {
			urlParam:'',
    };
	},
  created(){
     this.urlParam=this.$route.query;
  },
  mounted() {//初始化数据
  },
  methods: {
    openShareApp(type){
      this.$emit("openShareApp", type); //调用父类分享
      this.$emit("openPopup", false); //关闭弹层
		},
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/common/_tools.scss";
.popup-top-txt{
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		padding-top: 0.2rem;
		font-size: 0.36rem;
		color: #9c9c9c;
		background-color: #f0f0f0;
		span{
			color: #333333;
			margin: 0 0.5rem;
		}
}
.popup-share {
	width: 10rem;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	font-size: 14px;
	padding-top: 0.2rem;
	background-color: #f0f0f0;
	div{
    width: 23%;
	text-align: center;
	margin: 0.25rem 0 0.23rem;
		.share-bgimg{
			border-radius: 1rem;
			height: 1.5rem;
			width: 1.5rem;
			margin: 0 0;
		}
		.share-type{
			width: 100%;
			margin: 0 0;
			font-size: 13px;
			letter-spacing: 1px;
			line-height: 0.8rem;
		}
		.share-pyq{
			@include bgnrcbc(1.5rem,'../assets/img/share/pyq_share');
    }
    .share-qq{
			@include bgnrcbc(1.5rem,'../assets/img/share/qq_share');
    }
    .share-dx{
			@include bgnrcbc(1.5rem,'../assets/img/share/dx_share');
    }
    .share-qf{
			@include bgnrcbc(1.5rem,'../assets/img/share/qf_share');
			.rf-text-red{
				@include bgnrcbc(0.56rem,'../assets/img/share/retip');
				color: #fff;
				float: right;
				box-sizing: border-box;
			}
    }
    .share-wx{
			@include bgnrcbc(1.5rem,'../assets/img/share/wx_share');
    }
    .share-mdm{
			@include bgnrcbc(1.5rem,'../assets/img/share/ewm_share');
    }
    .share-wb{
			@include bgnrcbc(1.5rem,'../assets/img/share/wb_share');
		}
	}
}
</style>
