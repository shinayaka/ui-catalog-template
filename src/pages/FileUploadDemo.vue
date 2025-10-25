<template>
  <v-container class="pa-6" fluid>
    <v-row>
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="text-h6">ファイルアップロード デモ</v-card-title>
          <v-card-subtitle>ドラッグ＆ドロップでファイルを追加できます</v-card-subtitle>

          <v-card-text>
            <FileUpload v-model="selectedFiles" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileUpload from '../components/FileUpload.vue'

const selectedFiles = ref<File[]>([])
</script>
