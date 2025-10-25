import { createRouter, createWebHistory } from 'vue-router'
import ButtonPreventDemo from '../pages/ButtonPreventDemo.vue'

// 日本語コメント: シンプルなルーティング定義
const routes = [
  { path: '/', redirect: '/button-prevent' },
  { path: '/button-prevent', component: ButtonPreventDemo, meta: { title: '二度押し防止' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ルート遷移時にタイトルを更新（任意）
router.afterEach((to) => {
  if (to.meta?.title) document.title = String(to.meta.title) + ' - UI Catalog'
})

export default router
