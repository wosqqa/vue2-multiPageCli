<template>
<div class="qr-lottery">
	<div class="box-a">
		<template v-for="(item,index) in luckData" >
			<div  :class="'box-a-1 '+item.active" :key="index" v-if="index!=4"> 
				<img :src="item.img" alt="" >
						<div   :class="'box-a-2 '">{{item.title}}</div>
			</div>
			<div  class="box-a-1" @click="getLuckyRunner" :key="index" v-else > 
				<img class="box-a-1img" :src="item.img" alt="">
						<div   :class="'box-a-2c'">剩余<span style="color:#f44b50">{{luckNum}}</span>次机会</div>
			</div>
		 </template>
	</div>
</div>
</template>

<script>
import {getInviteCode} from '@/api/api';
import GLOBAL from '@/assets/js/lib/app.global'

	export default {
		props:[
			'luckNum',
			'luckData',
			'runLuck',
			'target'//哪一个中奖
		],
		data() {
			return {
				current:0,//当前转到runLuck数组位置
				time:3000,//抽奖需要时间
				flg:false,//抽奖是否正在运行
				stop:null,
				v:0,
				a:-25.0,
				v0:500.0,
				t:0.0,
				urlParam:'',
			}
		},
		created(){
				var scope = this
		},
		mounted() {//初始化数据
			var scope = this
		},
		methods: {
			runner(){//运行
					let scope = this;
					let item = scope.runLuck[scope.current]
					// alert(item+'-'+scope.current)
					let luck = scope.luckData[item];
						luck.active='active'
					scope.luckData.splice(scope.runLuck[scope.current],1,luck)
					scope.current++;
					if(scope.current === 8){
						let oldItem = scope.current-2;
						let oldLuck = scope.luckData[scope.runLuck[oldItem]];
						oldLuck.active=''
						scope.luckData.splice(scope.runLuck[oldItem],1,oldLuck)
						scope.current = 0;
					}
					else if(scope.current === 1){
						let oldLuck = scope.luckData[scope.runLuck[7]];
						oldLuck.active='';
						scope.luckData.splice(scope.runLuck[7],1,oldLuck);
					}
					else{
						let oldItem = scope.current-2;
						let oldLuck = scope.luckData[scope.runLuck[oldItem]];
						oldLuck.active=''
						scope.luckData.splice(scope.runLuck[oldItem],1,oldLuck)
					}
			},
			speedDown(){//减速
					let scope = this;
					var stop3 = setTimeout(scope.speedDown,scope.v);
					if(scope.v >= 500){
						scope.v = 500;
						// if(scope.current == scope.runLuck[scope.target-1]){
						if(scope.runLuck[scope.current]== scope.runLuck[scope.target-1]){
							clearTimeout(stop3);
							scope.flg = false;
							setTimeout(() => {
								scope.$emit('luckyWin')
							}, 1000);//延时一秒打开调用传参数
						}
					}else{
						scope.t++;
						scope.v = scope.v - scope.a*scope.t;
					}
					scope.runner();
			},
			uniform(){//匀速
				let scope = this;
				scope.stop = setTimeout(scope.uniform,scope.v);
					if(scope.t == scope.time/50){
						clearTimeout(scope.stop);
						scope.t = 0.0;
						scope.speedDown();
					}else{
						scope.t++;
					}
					scope.runner();
			},
			speedUp(){//加速
				let scope = this;
				scope.runner();
				if(scope.v <= 50){
						clearTimeout(scope.stop);
						scope.v = 50;
						scope.t = 0.0;
						scope.uniform(); //跳转到匀速
					}else{
						scope.t++;
						scope.v = scope.v0 + scope.a*scope.t;/*	加速度公式	v1 = v0 + a*t;注意加速度的v代表时间*/
						scope.stop = setTimeout(scope.speedUp,scope.v);
					}
			},
			startRunner(){//点击运行
				let scope = this;
					if(!scope.flg){
							scope.flg =true;
							scope.speedUp();
					}else{
						return ;
					}
			},
			getLuckyRunner(){
					this.$emit('LuckyRunner',this.flg);//打开调用传参数
			}
		}

	}

</script>

<style lang="scss">

@import '../assets/scss/common/_tools.scss';

.qr-lottery{
  width: 8.8rem;
  margin: 0 auto;
  height: 7.6rem;
  font-size: 12px;
//   background-image: url('../../assets/img/sewmbs@3.png');
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
	background-size: cover;
	.box-a{
		width: 8.8rem;
		height: 7.6rem;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		padding: 0.25rem 0.15rem 0;
		.box-a-1{
			position: relative;
			width: 2.62rem;
			height: 2.214rem;
			border-radius: 0.2rem;
			background-image: url('../assets/img/lottery/jbbg.png');
			background-repeat: no-repeat;
			background-size: cover;
			background-color: #fff;
			.box-a-1img{
				width: 2.62rem;
				height: 2.214rem;
				margin: 0rem;
			}
			.box-a-2c{
				position: absolute;
				width: 2.62rem;
				height: 0.514rem;
				font-size: 0.34rem;
				text-align: center;
				bottom: 0;
				margin-bottom: 0.5rem;
			}
			img{
				width: 2.42rem;
				margin: 0.18rem 0.1rem 0;
			}
			.box-a-2{
				color: #666;
				font-size: 0.293rem;
				position: absolute;
				width: 2.62rem;
				text-align: center;
				height: 0.514rem;
			    left: 0;
				top: 1.5rem;
				// top: 1.5rem;
    			// left: 0.5rem;
				// left: 0.25rem;
				// top: 0.25rem;
			}
		}
		.active{
					background-image: url('../assets/img/lottery/czjp.png');
					background-repeat: no-repeat;
					background-size: cover;
		}
	}
	.box-b{
		text-align: center;
		width: 2rem;
		height: 0.8rem;
		background-color: #e7e
	}
}

</style>
