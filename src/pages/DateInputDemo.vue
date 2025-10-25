<template>
  <v-container class="py-6" fluid>
    <v-row class="g-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">基本的な日付入力</v-card-title>
          <v-card-subtitle>
            カレンダーから選択しても、テキストフィールドから直接入力しても値が更新されます。
          </v-card-subtitle>
          <v-card-text class="d-flex flex-column ga-4">
            <DateInput v-model="basicDate" label="受講希望日" />

            <v-alert type="info" variant="tonal">
              選択された日付: <strong>{{ basicDate || '未選択' }}</strong>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">制約付きの利用例</v-card-title>
          <v-card-subtitle>
            最短開始日と締切日を設定し、必須入力・エラーメッセージを確認できます。
          </v-card-subtitle>
          <v-card-text class="d-flex flex-column ga-4">
            <DateInput
              v-model="restrictedDate"
              label="開始予定日"
              :min="minDate"
              :max="maxDate"
              required
            />

            <v-alert type="warning" variant="tonal">
              入力可能期間: {{ minDate }} 〜 {{ maxDate }}
            </v-alert>

            <v-alert
              :type="restrictedDate ? 'success' : 'error'"
              variant="tonal"
            >
              {{ restrictedDate ? `設定された日付: ${restrictedDate}` : '日付を設定してください。' }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6">複数フォームでの併用例</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <DateInput v-model="period.start" label="開始日" />
              </v-col>
              <v-col cols="12" md="4">
                <DateInput v-model="period.end" label="終了日" />
              </v-col>
              <v-col cols="12" md="4">
                <DateInput
                  v-model="period.deadline"
                  label="締切日"
                  :placeholder="'YYYY/MM/DD 形式でも入力可'"
                />
              </v-col>
            </v-row>

            <v-divider class="my-4" />

            <v-card-subtitle class="mb-2">現在の入力値</v-card-subtitle>
            <pre class="preview-block">{{ formattedPeriod }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DateInput from '../components/DateInput.vue'

const basicDate = ref<string | null>(null)
const restrictedDate = ref<string | null>(null)

const today = new Date()
const minDate = formatDate(addDays(today, 3))
const maxDate = formatDate(addDays(today, 30))

const period = ref({
  start: null as string | null,
  end: null as string | null,
  deadline: null as string | null,
})

const formattedPeriod = computed(() =>
  JSON.stringify(
    {
      start: period.value.start,
      end: period.value.end,
      deadline: period.value.deadline,
    },
    null,
    2,
  ),
)

function addDays(date: Date, days: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style scoped>
.preview-block {
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 0.9rem;
  max-height: 240px;
  overflow: auto;
}
</style>
