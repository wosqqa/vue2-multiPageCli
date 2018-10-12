import Vue from 'vue'
import Router from 'vue-router'
const appQrinvite = resolve => require(['@/pages/qr_invite/app_qrinvite.vue'], resolve)
const qqLuck = resolve => require(['@/pages/qr_invite/app_qqLuck.vue'], resolve)
const qrRecord = resolve => require(['@/pages/qr_invite/app_qrRecord.vue'], resolve)
const toFace = resolve => require(['@/pages/qr_invite/app_toFace.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      component: toFace, 
      name: '二维码邀请',
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/qqLuck', 
      component: qqLuck, 
      name: 'QQ邀请赢大奖',
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/qrRecord', 
      component: qrRecord, 
      name: '中奖记录',
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/toFace', 
      component: toFace, 
      name: '面对面邀请好友',
      meta: {
        keepAlive: true // 需要缓存
      }
    },
  ]
})
