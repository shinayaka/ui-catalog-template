import { createRouter, createWebHistory } from 'vue-router';
import ButtonPreventDemo from '../pages/ButtonPreventDemo.vue';
import FileUploadDemo from '../pages/FileUploadDemo.vue';
import FormValidationDemo from '../pages/FormValidationDemo.vue';
import ModalDemo from '../pages/ModalDemo.vue';

// 日本語コメント: シンプルなルーティング定義
const routes = [
  { path: '/', redirect: '/button-prevent' },
  {
    path: '/button-prevent',
    component: ButtonPreventDemo,
    meta: { title: '二度押し防止' },
  },
  {
    path: '/file-upload',
    component: FileUploadDemo,
    meta: { title: 'ファイルアップロード' },
  },
  {
    path: '/modal',
    component: ModalDemo,
    meta: { title: 'モーダルデモ' },
  },
  {
    path: '/form-validation',
    component: FormValidationDemo,
    meta: { title: 'フォームバリデーション' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ルート遷移時にタイトルを更新（任意）
router.afterEach((to) => {
  if (to.meta?.title) document.title = String(to.meta.title) + ' - UI Catalog';
});

export default router;
