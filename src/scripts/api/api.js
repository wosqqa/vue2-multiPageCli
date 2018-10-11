var qs = require('qs')    // qs.stringify(params)对提交json参数格式化a=212&b=2332的格式
import jsonp from 'jsonp';
//静态变量
var localHref = window.location.href;//判断正式测试参数

// 接口请求地址base
let base = ''
let baseTwo = ''
let baseThree= ''
let incomeUrl= ''
export var hostname='';//cdn测试服
export var giveRedUrl='';//发红包页面//kp.dftoutiao.com/shb_in3/second.html正式
export var wallet='';//晒收入金额
export var qrInvite='';//面对面邀请抽奖
if(localHref.indexOf('http://localhost:8888/')>-1 || localHref.indexOf('http://172.18.5.108:8888/')>-1|| localHref.indexOf('http://192.168.1.13:8888/')>-1){//本地
	base = 'https://test-shoutu.dftoutiao.com';
	hostname='http://172.18.5.108:8888';
	baseTwo = 'https://awaken.dftoutiao.com';
	baseThree = 'https://test-kp.dftoutiao.com';
	giveRedUrl='https://test-shoutu2.dftoutiao.com';
	wallet = 'https://test-wallet.dftoutiao.com';
	qrInvite = 'https://test-shoutu-choujiang.dftoutiao.com';
	incomeUrl= 'https://test-shoutu-sharedpool.dftoutiao.com';
}else if(localHref.indexOf('//resources.dftoutiao.com/apprentice2__test')>-1){//测试
	base = 'https://test-shoutu.dftoutiao.com';
	hostname='https://resources.dftoutiao.com/apprentice2__test';
	baseTwo = 'https://awaken.dftoutiao.com';
	baseThree = 'https://test-kp.dftoutiao.com';
	giveRedUrl='https://test-shoutu2.dftoutiao.com';
	wallet = 'https://test-wallet.dftoutiao.com';
	qrInvite = 'https://test-shoutu-choujiang.dftoutiao.com';
	incomeUrl= 'https://test-shoutu-sharedpool.dftoutiao.com';
}else{//正式
	base = 'https://shoutu.dftoutiao.com';
	hostname='https://resources.dftoutiao.com/apprentice2';
	baseTwo = 'https://awaken.dftoutiao.com';
	baseThree = 'https://kp.dftoutiao.com';
	giveRedUrl='https://shoutu2.dftoutiao.com';
	wallet = 'https://wallet.dftoutiao.com';
	qrInvite = 'https://shoutu-choujiang.dftoutiao.com';
	incomeUrl= 'https://shoutu-sharedpool.dftoutiao.com';
}

//jsonp get获取数据
export const jsonpGetData = params => {
	jsonp(params.url+'?'+qs.stringify(params.param), {}, function (err, data) {
		 console.log(params.url+'?'+qs.stringify(params.param));
			window[params.callback](data);
	});
}

//jsonp post获取数据
export const jsonpPostData = params => {
	jsonp(params.url, qs.stringify(params.param), function (err, data) {
			window[params.callback](data);
	});
}

//获取云控玩法、邀请码
export const getInviteCode = `${base}/invitefriends/can_type_code`

//获取云控数据参数
export const pollingConfig = `${base}/polling/config`
//获取top参数
export const typeCodeTop = `${base}/invitefriends/type_code_top`
//获取我的徒儿
export const myApprenticeList = `${base}/Invitenew/my_apprentice_list`

//唤醒徒儿列表
export const wakeupApprenticeList = `${base}/Invitenew/wakeup_apprentice_list`

//好友详情
export const redpacketdisplayInfo = `${base}/redpacketdisplay/index`

//唤醒徒儿Top提示
export const wakeupTopTips = `${base}/awaken/config`

//徒孙列表
export const getGrandApprentice = `${base}/grand/apprentice`

//单独页唤醒好友列表
export const gettxlhx02 = `${baseTwo}/dfh_dingyue/gettxlhx02`

//群发邀请获取图片等
export const getbalance = `${baseTwo}/ucenter/pocketmoney/getbalance`

//手气抢红包列表
export const giveRedEnvelope = `${giveRedUrl}/index/invite/init`
//拆云控
export const giveInviteApprentice = `${giveRedUrl}/index/invite/invite_apprentice`
//点击拆
export const giveRedChai = `${baseThree}/act6th4/take`

//面对面分享滚轮
export const LuckyRoller = `${qrInvite}/luck/Luckydraw/roller`
//面对面分享抽奖
export const LuckyRunner = `${qrInvite}/luck/Luckydraw/startDraw`
//面对面抽奖次数
export const getUserDraws = `${qrInvite}/luck/Luckydraw/getUserDraws`
//QQ分享滚轮
export const qqLuckyRoller = `${qrInvite}/luck/qqshare/roller`
//qq分享抽奖
export const qqLuckyRunner = `${qrInvite}/luck/qqshare/startDraw`
//QQ抽奖次数
export const getQqUserDraws = `${qrInvite}/luck/qqshare/getUserDraws`

//黑名单验证
export const userValidation = `${incomeUrl}/share/Sharedpool/validation`
//获取当前用户的奖池钱数
export const getUserSharedpool = `${incomeUrl}/share/Sharedpool/get_user_sharedpool`
