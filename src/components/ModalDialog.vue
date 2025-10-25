<template>
  <v-dialog
    v-model="dialog"
    :max-width="maxWidth"
    :persistent="persistent"
    :scrollable="scrollable"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <slot name="header">
          <span v-if="title" class="text-h6">{{ title }}</span>
        </slot>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          color="default"
          @click="close"
          aria-label="閉じる"
        />
      </v-card-title>

      <v-divider />

      <v-card-text class="py-6">
        <slot />
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-end">
        <slot name="actions" :close="close">
          <v-btn color="primary" variant="tonal" @click="close">閉じる</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  maxWidth: {
    type: [Number, String],
    default: 480,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  scrollable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'open'): void
  (event: 'close'): void
}>()

const updateModel = (value: boolean) => {
  emit('update:modelValue', value)
  if (value !== props.modelValue) {
    emit(value ? 'open' : 'close')
  }
}

const dialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => updateModel(value),
})

const close = () => updateModel(false)
</script>
