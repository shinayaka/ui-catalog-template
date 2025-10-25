<template>
  <v-container class="py-6" fluid>
    <v-row class="g-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">基本的なモーダル</v-card-title>
          <v-card-text>
            <p class="mb-4">
              `ModalDialog` コンポーネントは `v-model` で開閉を制御し、外側をクリックすると自動的に閉じます。
            </p>
            <v-btn color="primary" @click="basicDialog = true">モーダルを開く</v-btn>

            <ModalDialog v-model="basicDialog" title="お知らせ">
              <p class="mb-4">
                これは基本的なモーダルの例です。閉じるボタンか背景をクリックするとモーダルが閉じます。
              </p>
              <v-alert type="success" variant="tonal">
                モーダルの本文には任意のコンテンツを配置できます。
              </v-alert>
            </ModalDialog>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h6">スロットを使ったカスタマイズ</v-card-title>
          <v-card-text>
            <p class="mb-4">
              ヘッダーやアクションをスロットで差し替えることで、より柔軟なモーダルを構築できます。
            </p>
            <v-btn color="secondary" @click="customDialog = true">プランを選択</v-btn>

            <ModalDialog
              v-model="customDialog"
              :max-width="560"
              scrollable
              @open="status = 'モーダルを開きました'"
              @close="status = 'モーダルを閉じました'"
            >
              <template #header>
                <div>
                  <div class="text-h6">プランを選択</div>
                  <div class="text-body-2 text-medium-emphasis">
                    3つのプランの詳細を比較できます
                  </div>
                </div>
              </template>

              <v-list class="mb-4">
                <v-list-item
                  v-for="plan in plans"
                  :key="plan.name"
                  :active="selectedPlan === plan.name"
                  :value="plan.name"
                  lines="two"
                  @click="selectedPlan = plan.name"
                >
                  <template #prepend>
                    <v-avatar color="primary" variant="tonal">
                      {{ plan.initial }}
                    </v-avatar>
                  </template>
                  <v-list-item-title>{{ plan.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ plan.description }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>

              <v-alert v-if="selectedPlan" type="info" variant="tonal" class="mb-4">
                {{ selectedPlan }} を選択中です。
              </v-alert>

              <template #actions="{ close }">
                <v-btn variant="text" color="default" @click="resetSelection">リセット</v-btn>
                <v-btn color="primary" @click="confirmSelection(close)">決定</v-btn>
              </template>
            </ModalDialog>

            <div class="text-body-2 text-medium-emphasis mt-4">
              {{ status }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalDialog from '../components/ModalDialog.vue'

const basicDialog = ref(false)
const customDialog = ref(false)
const status = ref('モーダルは閉じています。')
const selectedPlan = ref('')

const plans = [
  {
    name: 'スタータープラン',
    description: '小規模チーム向けの基本機能を提供します。',
    initial: 'S',
  },
  {
    name: 'プロフェッショナルプラン',
    description: '成長中のチームに必要な拡張機能を含みます。',
    initial: 'P',
  },
  {
    name: 'エンタープライズプラン',
    description: '大規模組織向けの高度な管理機能を備えています。',
    initial: 'E',
  },
]

const resetSelection = () => {
  selectedPlan.value = ''
}

const confirmSelection = (close: () => void) => {
  if (selectedPlan.value) {
    status.value = `${selectedPlan.value} を決定しました`
  } else {
    status.value = 'プランが選択されていません'
  }
  close()
}
</script>
