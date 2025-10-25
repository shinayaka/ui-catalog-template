<template>
  <v-container class="pa-6" fluid>
    <v-row>
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h6">ButtonPrevent デモ</v-card-title>
          <v-card-subtitle>二度押し防止ボタンの動作確認</v-card-subtitle>
          <v-card-text>
            <p class="mb-4">
              ボタンをクリックすると <code>lockMs</code> で指定した時間だけ無効になります。
              もう一度クリックしても反応しません。
            </p>
            <div class="d-flex align-center ga-4">
              <ButtonPrevent :label="'送信（1秒ロック）'" :lockMs="1000" />
              <ButtonPrevent :label="'長め（3秒ロック）'" :lockMs="3000" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ButtonPrevent from '../components/ButtonPrevent.vue'
</script>
