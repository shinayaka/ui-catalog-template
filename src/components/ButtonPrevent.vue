<template>
  <!-- 日本語コメント: 二度押し防止ボタン。クリック後は一定時間 disabled にします。 -->
  <v-btn :disabled="isDisabled" color="primary" @click="handleClick">
    {{ isDisabled ? '処理中...' : label }}
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props: ボタン表示ラベルと無効化維持時間(ms)
interface Props {
  label?: string
  lockMs?: number
}
const props = withDefaults(defineProps<Props>(), {
  label: '送信',
  lockMs: 1000,
})

const isDisabled = ref(false)

// クリックハンドラ: 一度無効化し、指定時間後に復帰
const handleClick = async () => {
  if (isDisabled.value) return

  isDisabled.value = true
  // 実務ではここで API リクエストなどの非同期処理を行う
  await new Promise((resolve) => setTimeout(resolve, props.lockMs))
  isDisabled.value = false
}
</script>
