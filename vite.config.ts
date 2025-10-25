import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// 日本語コメント: Viteの基本設定 + Vuetifyプラグインを有効化
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true, // Vuetifyのコンポーネント/ディレクティブを自動インポート
    }),
  ],
})
