<template>
  <!-- 日本語コメント: サイドバー付きのシンプルなレイアウト -->
  <v-app>
    <v-app-bar color="primary" density="comfortable" dark>
      <v-app-bar-title>UI Catalog</v-app-bar-title>
      <v-spacer />
      <v-btn variant="text" to="/button-prevent">二度押し防止</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="py-8">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// ここでは特にロジックは不要です。ルーターの表示領域を用意しています。
</script>

<style scoped>
/* 見出しの余白など最小限の調整 */
</style>
