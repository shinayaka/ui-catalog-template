<template>
  <v-container class="py-6" fluid>
    <v-row>
      <v-col cols="12" lg="8">
        <v-card>
          <v-card-title class="text-h6"
            >バリデーション付きフォーム</v-card-title
          >
          <v-card-subtitle
            >リアルタイムで入力内容を検証するデモです。</v-card-subtitle
          >

          <v-card-text>
            <v-form
              @submit.prevent="handleSubmit"
              class="d-flex flex-column ga-6"
            >
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name"
                    label="氏名"
                    placeholder="山田 太郎"
                    :counter="40"
                    :error-messages="showNameErrors"
                    @blur="markTouched('name')"
                    @update:modelValue="() => markTouched('name')"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    label="メールアドレス"
                    type="email"
                    placeholder="taro.yamada@example.com"
                    :error-messages="showEmailErrors"
                    @blur="markTouched('email')"
                    @update:modelValue="() => markTouched('email')"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.password"
                    label="パスワード"
                    type="password"
                    :error-messages="showPasswordErrors"
                    @blur="markTouched('password')"
                    @update:modelValue="() => markTouched('password')"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.confirmPassword"
                    label="パスワード（確認用）"
                    type="password"
                    :error-messages="showConfirmErrors"
                    @blur="markTouched('confirmPassword')"
                    @update:modelValue="() => markTouched('confirmPassword')"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model.number="form.age"
                    label="年齢"
                    type="number"
                    :min="18"
                    :max="65"
                    suffix="歳"
                    :error-messages="showAgeErrors"
                    @blur="markTouched('age')"
                    @update:modelValue="() => markTouched('age')"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="form.phone"
                    label="電話番号"
                    type="tel"
                    placeholder="09012345678"
                    :error-messages="showPhoneErrors"
                    @blur="markTouched('phone')"
                    @update:modelValue="() => markTouched('phone')"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="form.plan"
                    label="プラン"
                    :items="planOptions"
                    item-title="label"
                    item-value="value"
                    :error-messages="showPlanErrors"
                    @blur="markTouched('plan')"
                    @update:modelValue="() => markTouched('plan')"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-radio-group
                    v-model="form.contactMethod"
                    label="連絡方法の希望"
                    :error-messages="showContactErrors"
                    @blur="markTouched('contactMethod')"
                    @update:modelValue="() => markTouched('contactMethod')"
                  >
                    <v-radio
                      v-for="option in contactOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </v-radio-group>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="text-subtitle-2 mb-2">興味のあるカテゴリー</div>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="option in interestOptions"
                      :key="option.value"
                    >
                      <v-checkbox
                        v-model="form.interests"
                        :label="option.label"
                        :value="option.value"
                        density="compact"
                        @change="markTouched('interests')"
                      />
                    </v-col>
                  </v-row>
                  <v-messages
                    v-if="showInterestsErrors.length"
                    class="mt-n2"
                    color="error"
                    :messages="showInterestsErrors"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.startDate"
                    label="開始希望日"
                    type="date"
                    :error-messages="showStartDateErrors"
                    @blur="markTouched('startDate')"
                    @update:modelValue="() => markTouched('startDate')"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="form.bio"
                    label="自己紹介"
                    rows="4"
                    :counter="200"
                    hint="30〜200文字で入力してください"
                    persistent-hint
                    :error-messages="showBioErrors"
                    @blur="markTouched('bio')"
                    @update:modelValue="() => markTouched('bio')"
                  />
                </v-col>

                <v-col cols="12">
                  <div class="text-subtitle-2 mb-2">関連資料のアップロード</div>
                  <FileUpload
                    v-model="form.files"
                    multiple
                    @change="markTouched('files')"
                  >
                    <template #summary="{ files }">
                      <div class="mb-2 text-body-2 text-medium-emphasis">
                        {{ files.length }} 件のファイルが選択されています
                      </div>
                    </template>
                    <template #default="{ files, remove }">
                      <v-list density="comfortable" class="rounded mb-2">
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
                            {{ formatBytes(file.size) }}
                          </v-list-item-subtitle>
                          <template #append>
                            <v-btn
                              icon="mdi-close"
                              variant="text"
                              color="default"
                              @click="remove(index)"
                              :aria-label="`${file.name} を削除`"
                            />
                          </template>
                        </v-list-item>
                      </v-list>
                      <v-alert
                        v-if="showFileErrors.length"
                        type="error"
                        variant="tonal"
                        density="comfortable"
                      >
                        <div v-for="error in showFileErrors" :key="error">
                          {{ error }}
                        </div>
                      </v-alert>
                    </template>
                  </FileUpload>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-switch
                    v-model="form.enableNewsletter"
                    label="新着情報をメールで受け取る"
                    inset
                    color="primary"
                    @change="markTouched('enableNewsletter')"
                  />
                </v-col>

                <v-col cols="12" sm="6" class="d-flex align-center">
                  <v-checkbox
                    v-model="form.agree"
                    :error="showAgreeErrors.length > 0"
                    :error-messages="showAgreeErrors"
                    label="利用規約に同意します"
                    @change="markTouched('agree')"
                  />
                </v-col>
              </v-row>

              <v-divider />

              <v-card-actions class="justify-end">
                <v-btn variant="text" color="default" @click="resetForm"
                  >リセット</v-btn
                >
                <v-btn type="submit" color="primary">送信する</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>

        <v-alert
          v-if="statusMessage"
          :type="statusType"
          variant="tonal"
          class="mt-6"
        >
          {{ statusMessage }}
        </v-alert>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="h-100">
          <v-card-title class="text-h6">入力内容のプレビュー</v-card-title>
          <v-card-subtitle
            >フォームの状態はリアルタイムに更新されます。</v-card-subtitle
          >
          <v-card-text>
            <v-alert
              :type="isFormValid ? 'success' : 'warning'"
              variant="tonal"
              density="comfortable"
              class="mb-4"
            >
              {{
                isFormValid
                  ? '送信可能な状態です。'
                  : '未入力または不正な値があります。'
              }}
            </v-alert>
            <pre class="preview-block">{{ preview }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import FileUpload from '../components/FileUpload.vue';

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: null as number | null,
  phone: '',
  plan: '' as string | null,
  contactMethod: 'email',
  interests: [] as string[],
  startDate: '',
  bio: '',
  enableNewsletter: true,
  agree: false,
  files: [] as File[],
});

const touched = reactive({
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
  age: false,
  phone: false,
  plan: false,
  contactMethod: false,
  interests: false,
  startDate: false,
  bio: false,
  enableNewsletter: false,
  agree: false,
  files: false,
});

const planOptions = [
  { label: 'スターター', value: 'starter' },
  { label: 'スタンダード', value: 'standard' },
  { label: 'ビジネス', value: 'business' },
];

const contactOptions = [
  { label: 'メール', value: 'email' },
  { label: '電話', value: 'phone' },
  { label: 'チャット', value: 'chat' },
];

const interestOptions = [
  { label: 'DX 推進', value: 'dx' },
  { label: 'AI・機械学習', value: 'ai' },
  { label: 'モバイルアプリ', value: 'mobile' },
  { label: 'データ分析', value: 'data' },
  { label: 'UI/UX デザイン', value: 'design' },
  { label: 'インフラ', value: 'infra' },
];

const statusMessage = ref('');
const statusType = ref<'success' | 'error'>('success');

const nameErrors = computed<string[]>(() => {
  const errors: string[] = [];
  const value = form.name.trim();
  if (!value) {
    errors.push('氏名は必須です。');
  } else if (value.length < 2) {
    errors.push('氏名は2文字以上で入力してください。');
  } else if (value.length > 40) {
    errors.push('氏名は40文字以内で入力してください。');
  }
  return errors;
});

const emailErrors = computed<string[]>(() => {
  const errors: string[] = [];
  const value = form.email.trim();
  if (!value) {
    errors.push('メールアドレスは必須です。');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.push('メールアドレスの形式が正しくありません。');
  }
  return errors;
});

const passwordErrors = computed<string[]>(() => {
  const errors: string[] = [];
  const value = form.password;
  if (!value) {
    errors.push('パスワードは必須です。');
  } else {
    if (value.length < 8)
      errors.push('パスワードは8文字以上で入力してください。');
    if (!/[A-Z]/.test(value))
      errors.push('英大文字を1文字以上含めてください。');
    if (!/[0-9]/.test(value)) errors.push('数字を1文字以上含めてください。');
  }
  return errors;
});

const confirmErrors = computed<string[]>(() => {
  const errors: string[] = [];
  if (!form.confirmPassword) {
    errors.push('確認用パスワードを入力してください。');
  } else if (form.password !== form.confirmPassword) {
    errors.push('パスワードが一致しません。');
  }
  return errors;
});

const ageErrors = computed<string[]>(() => {
  const errors: string[] = [];
  const value = form.age;
  if (value === null || Number.isNaN(value)) {
    errors.push('年齢を入力してください。');
  } else {
    if (value < 18) errors.push('18歳以上の方のみ登録できます。');
    if (value > 65) errors.push('65歳以下の方のみ登録できます。');
  }
  return errors;
});

const phoneErrors = computed<string[]>(() => {
  const errors: string[] = [];
  const value = form.phone.trim();
  if (!value) return errors;
  const digits = value.replace(/[-\s]/g, '');
  if (!/^\d{10,11}$/.test(digits)) {
    errors.push('電話番号はハイフンなしで10〜11桁の数字で入力してください。');
  }
  return errors;
});

const planErrors = computed<string[]>(() => {
  const errors: string[] = [];
  if (!form.plan) errors.push('プランを選択してください。');
  return errors;
});

const contactErrors = computed<string[]>(() => {
  const errors: string[] = [];
  if (!form.contactMethod) errors.push('希望する連絡方法を選択してください。');
  return errors;
});

const interestsErrors = computed<string[]>(() => {
  const errors: string[] = [];
  if (!form.interests.length)
    errors.push('少なくとも1つのカテゴリーを選択してください。');
  return errors;
});

const startDateErrors = computed<string[]>(() => {
  const errors: string[] = [];
  if (!form.startDate) {
    errors.push('開始希望日を選択してください。');
  } else {
    const selected = new Date(form.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected <= today)
      errors.push('開始希望日は翌日以降を選択してください。');
  }
  return errors;
});

const bioErrors = computed<string[]>(() => {
  const errors: string[] = [];
  const length = form.bio.trim().length;
  if (length > 0 && length < 30)
    errors.push('自己紹介は30文字以上入力してください。');
  if (length > 200) errors.push('自己紹介は200文字以内で入力してください。');
  return errors;
});

const agreeErrors = computed<string[]>(() => {
  const errors: string[] = [];
  if (!form.agree) errors.push('利用規約への同意が必要です。');
  return errors;
});

const fileErrors = computed<string[]>(() => {
  const errors: string[] = [];
  if (!form.files.length) {
    errors.push('少なくとも1件のファイルを追加してください。');
  }
  if (form.files.length > 3) {
    errors.push('アップロードできるファイルは最大3件までです。');
  }
  if (form.files.some((file) => file.size > 5 * 1024 * 1024)) {
    errors.push('各ファイルは5MB以下にしてください。');
  }
  return errors;
});

const showNameErrors = computed(() => (touched.name ? nameErrors.value : []));
const showEmailErrors = computed(() =>
  touched.email ? emailErrors.value : []
);
const showPasswordErrors = computed(() =>
  touched.password ? passwordErrors.value : []
);
const showConfirmErrors = computed(() =>
  touched.confirmPassword ? confirmErrors.value : []
);
const showAgeErrors = computed(() => (touched.age ? ageErrors.value : []));
const showPhoneErrors = computed(() =>
  touched.phone ? phoneErrors.value : []
);
const showPlanErrors = computed(() => (touched.plan ? planErrors.value : []));
const showContactErrors = computed(() =>
  touched.contactMethod ? contactErrors.value : []
);
const showInterestsErrors = computed(() =>
  touched.interests ? interestsErrors.value : []
);
const showStartDateErrors = computed(() =>
  touched.startDate ? startDateErrors.value : []
);
const showBioErrors = computed(() => (touched.bio ? bioErrors.value : []));
const showAgreeErrors = computed(() =>
  touched.agree ? agreeErrors.value : []
);
const showFileErrors = computed(() => (touched.files ? fileErrors.value : []));

const isFormValid = computed(() => {
  const errorGroups = [
    nameErrors.value,
    emailErrors.value,
    passwordErrors.value,
    confirmErrors.value,
    ageErrors.value,
    phoneErrors.value,
    planErrors.value,
    contactErrors.value,
    interestsErrors.value,
    startDateErrors.value,
    bioErrors.value,
    agreeErrors.value,
    fileErrors.value,
  ];
  return errorGroups.every((errors) => errors.length === 0);
});

const preview = computed(() =>
  JSON.stringify(
    {
      ...form,
      files: form.files.map((file) => ({
        name: file.name,
        size: formatBytes(file.size),
      })),
    },
    null,
    2
  )
);

const markTouched = (key: keyof typeof touched) => {
  touched[key] = true;
};

const markAllTouched = () => {
  (Object.keys(touched) as Array<keyof typeof touched>).forEach((key) => {
    touched[key] = true;
  });
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.password = '';
  form.confirmPassword = '';
  form.age = null;
  form.phone = '';
  form.plan = '';
  form.contactMethod = 'email';
  form.interests = [];
  form.startDate = '';
  form.bio = '';
  form.enableNewsletter = true;
  form.agree = false;
  form.files = [];

  statusMessage.value = '';
  statusType.value = 'success';
  (Object.keys(touched) as Array<keyof typeof touched>).forEach((key) => {
    touched[key] = false;
  });
};

const handleSubmit = () => {
  markAllTouched();
  if (!isFormValid.value) {
    statusType.value = 'error';
    statusMessage.value = '入力内容を確認してください。';
    return;
  }
  statusType.value = 'success';
  statusMessage.value = '送信が完了しました。';
};

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes)) return '';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const precision = value < 10 && unitIndex > 0 ? 1 : 0;
  return `${value.toFixed(precision)} ${units[unitIndex]}`;
};
</script>

<style scoped>
.preview-block {
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 0.9rem;
  max-height: 420px;
  overflow: auto;
}
</style>
