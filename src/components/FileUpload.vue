<template>
  <div>
    <v-alert v-if="infoText" type="info" variant="tonal" class="mb-6">
      {{ infoText }}
    </v-alert>

    <div
      class="drop-zone"
      :class="{ 'is-dragover': isDragOver }"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <v-icon size="48" color="primary" class="mb-3">mdi-cloud-upload</v-icon>
      <p class="mb-3">{{ dropText }}</p>
      <v-btn color="primary" variant="tonal" @click="openFilePicker">
        {{ buttonText }}
      </v-btn>
      <input
        ref="fileInput"
        type="file"
        :multiple="multiple"
        class="d-none"
        @change="handleFileSelect"
      />
    </div>

    <v-divider class="my-6" />

    <div v-if="files.length">
      <slot name="summary" :files="files">
        <div class="mb-4 text-body-2 text-medium-emphasis">
          {{ files.length }} 件のファイルが選択されています
        </div>
      </slot>

      <slot :files="files" :remove="removeFile">
        <v-list density="comfortable" class="rounded">
          <v-list-item
            v-for="(file, index) in files"
            :key="`${file.name}-${file.lastModified}-${index}`"
          >
            <template #prepend>
              <v-avatar color="primary" variant="tonal">
                <v-icon>mdi-file</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title>{{ file.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ formatBytes(file.size) }} ・ {{ formatDate(file.lastModified) }}
            </v-list-item-subtitle>

            <template #append>
              <v-btn
                icon="mdi-close"
                variant="text"
                color="default"
                @click="removeFile(index)"
                :aria-label="`${file.name} を削除`"
              />
            </template>
          </v-list-item>
        </v-list>
      </slot>
    </div>
    <div v-else class="text-body-2 text-medium-emphasis">
      選択されたファイルはありません。
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<File[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  infoText: {
    type: String,
    default: '下のエリアにファイルをドラッグ＆ドロップするか、クリックしてファイル選択ダイアログを開いてください。',
  },
  dropText: {
    type: String,
    default: 'ここにファイルをドロップ',
  },
  buttonText: {
    type: String,
    default: 'ファイルを選択',
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: File[]): void
  (event: 'change', value: File[]): void
}>()

const files = ref<File[]>([...props.modelValue])
const isDragOver = ref(false)
const dragCounter = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)

watch(
  () => props.modelValue,
  (next) => {
    files.value = [...next]
  },
)

const openFilePicker = () => fileInput.value?.click()

const updateFiles = (next: File[]) => {
  files.value = next
  emit('update:modelValue', [...files.value])
  emit('change', [...files.value])
}

const addFiles = (selected: FileList | File[]) => {
  const incoming = Array.from(selected)

  let next: File[]
  if (props.multiple) {
    const existingKeys = new Set(
      files.value.map((file) => `${file.name}-${file.size}-${file.lastModified}`),
    )
    const unique = incoming.filter(
      (file) => !existingKeys.has(`${file.name}-${file.size}-${file.lastModified}`),
    )
    next = [...files.value, ...unique]
  } else {
    next = incoming.length ? [incoming[0]] : []
  }

  updateFiles(next)
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    addFiles(target.files)
    target.value = ''
  }
}

const handleDragEnter = () => {
  dragCounter.value += 1
  isDragOver.value = true
}

const handleDragLeave = () => {
  dragCounter.value = Math.max(0, dragCounter.value - 1)
  if (dragCounter.value === 0) isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  dragCounter.value = 0
  isDragOver.value = false

  if (event.dataTransfer?.files?.length) {
    addFiles(event.dataTransfer.files)
  }
}

const removeFile = (index: number) => {
  const next = [...files.value]
  next.splice(index, 1)
  updateFiles(next)
}

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes)) return ''
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = bytes
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  const precision = value < 10 && unitIndex > 0 ? 1 : 0
  return `${value.toFixed(precision)} ${units[unitIndex]}`
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}
</script>

<style scoped>
.drop-zone {
  border: 2px dashed #9e9e9e;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.drop-zone.is-dragover {
  border-color: #1976d2;
  background-color: rgba(25, 118, 210, 0.08);
}
</style>
