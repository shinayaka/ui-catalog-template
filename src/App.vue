<template>
  <!-- 日本語コメント: サイドバー付きのシンプルなレイアウト -->
  <v-app>
    <v-app-bar color="primary" density="comfortable" dark>
      <v-app-bar-title>UI Catalog</v-app-bar-title>
      <v-spacer />
      <v-btn
        :variant="currentPath === '/button-prevent' ? 'flat' : 'text'"
        to="/button-prevent"
      >
        二度押し防止
      </v-btn>
      <v-btn :variant="currentPath === '/file-upload' ? 'flat' : 'text'" to="/file-upload">
        ファイルアップロード
      </v-btn>
      <v-btn :variant="currentPath === '/modal' ? 'flat' : 'text'" to="/modal">
        モーダルデモ
      </v-btn>
      <v-btn
        :variant="currentPath === '/form-validation' ? 'flat' : 'text'"
        to="/form-validation"
      >
        フォーム検証
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-8">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = computed(() => route.path)
</script>

<style scoped>
/* 見出しの余白など最小限の調整 */
</style>
