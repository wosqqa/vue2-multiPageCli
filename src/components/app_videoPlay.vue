<template>
		<div class="video-play">
			<div>
					<video controls autoplay preload="true"  class="my-player" poster="http://resources.dftoutiao.com/apprentice2__test/static/img/share/shipinsy.png">
							<source src="http://resources.dftoutiao.com/apprentice2__test/static/img/share/weixinyaoqing.mp4" type="video/mp4">
					</video>	
			</div>
		</div>
</template>

<script>
export default {
  props: ["myParam"],
  data() {
    return {
    };
	},
	computed: {
	},
  created(){
		 	//webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow"
      // GLOBAL.App().toast(this.urlParam.accid);
  },
	mounted() {//初始化数据

  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
.video-play{
	
}
</style>
