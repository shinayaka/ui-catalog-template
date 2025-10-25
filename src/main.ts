import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import router from './router'

// 日本語コメント: アプリケーションのエントリポイント
createApp(App).use(vuetify).use(router).mount('#app')
