<template>
  <div class="date-input">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      max-width="320"
      min-width="320"
    >
      <template #activator="{ props: menuProps }">
        <v-text-field
          v-model="textValue"
          v-bind="menuProps"
          :label="label"
          :placeholder="placeholder"
          :readonly="readonly"
          :clearable="clearable"
          :hide-details="hideDetails"
          :error="Boolean(errorMessage)"
          :error-messages="errorMessage ? [errorMessage] : []"
          @blur="handleBlur"
          @keydown.enter.prevent="commitInput"
          @click:clear="clear"
        >
          <template #append-inner>
            <v-btn
              icon="mdi-calendar"
              variant="text"
              size="small"
              color="primary"
              @click.stop="toggleMenu"
            />
          </template>
        </v-text-field>
      </template>

      <v-date-picker
        v-model="pickerValue"
        color="primary"
        :min="min"
        :max="max"
        @update:model-value="handlePicker"
      />
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  label: {
    type: String,
    default: '日付',
  },
  placeholder: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  min: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  max: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  required: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  hideDetails: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: 'auto',
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void
  (event: 'change', value: string | null): void
}>()

const menu = ref(false)
const textValue = ref(formatDate(props.modelValue))
const pickerValue = ref<string | null>(props.modelValue)
const errorMessage = ref('')

watch(
  () => props.modelValue,
  (next) => {
    textValue.value = formatDate(next)
    pickerValue.value = next ?? null
    errorMessage.value = ''
  },
)

const parsedMin = computed(() => (props.min ? normalizeDate(props.min) : null))
const parsedMax = computed(() => (props.max ? normalizeDate(props.max) : null))

const toggleMenu = () => {
  menu.value = !menu.value
}

const clear = () => {
  updateValue(null)
  textValue.value = ''
  pickerValue.value = null
  errorMessage.value = ''
}

const handlePicker = (value: string | string[] | Date | null) => {
  const picked = normalizeIncoming(value)
  if (!picked) return

  pickerValue.value = picked
  textValue.value = formatDate(picked)
  errorMessage.value = ''
  updateValue(picked)
  if (!props.readonly) {
    menu.value = false
  }
}

const handleBlur = () => {
  commitInput()
}

const commitInput = () => {
  const raw = textValue.value.trim()
  if (!raw) {
    if (props.required) {
      errorMessage.value = '日付を入力してください。'
      return
    }
    clear()
    return
  }

  const normalized = normalizeDate(raw)
  if (!normalized) {
    errorMessage.value = '日付の形式が正しくありません。YYYY-MM-DD で入力してください。'
    return
  }

  if (parsedMin.value && normalized < parsedMin.value) {
    errorMessage.value = `日付は ${parsedMin.value} 以降を指定してください。`
    return
  }

  if (parsedMax.value && normalized > parsedMax.value) {
    errorMessage.value = `日付は ${parsedMax.value} 以前を指定してください。`
    return
  }

  errorMessage.value = ''
  textValue.value = normalized
  pickerValue.value = normalized
  updateValue(normalized)
}

const updateValue = (value: string | null) => {
  emit('update:modelValue', value)
  emit('change', value)
}

function formatDate(value: string | null | undefined) {
  if (!value) return ''
  const normalized = normalizeDate(value)
  return normalized ?? ''
}

function normalizeDate(value: string | null | undefined) {
  if (!value) return null
  const trimmed = value.trim()
  const normalized = trimmed.replace(/\//g, '-')

  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(normalized)) {
    return null
  }

  const [yearStr, monthStr, dayStr] = normalized.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = Number(dayStr)

  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null

  const date = new Date(Date.UTC(year, month - 1, day))
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return `${year.toString().padStart(4, '0')}-${(month).toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`
}

function normalizeIncoming(value: string | string[] | Date | null): string | null {
  if (Array.isArray(value)) {
    return normalizeDate(value[0])
  }

  if (value instanceof Date) {
    return normalizeDate(
      `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`,
    )
  }

  return normalizeDate(value)
}
</script>

<style scoped>
.date-input {
  width: 100%;
}
</style>
