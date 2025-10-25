# 🧠 Codex CLI プロンプトガイド（Vue 3 + TypeScript + Vuetify UIカタログ用）

このドキュメントは、**Codex CLI**を使って
UIコンポーネント、デモページ、テスト、READMEを自動生成するための
高精度プロンプトテンプレート集です。

---

## 🧩 UIコンポーネント生成プロンプト

```bash
codex "
Generate a Vue 3 + TypeScript + Vuetify UI component.

Requirements:
- Use Composition API and <script setup lang='ts'>
- Component must be reusable and production-ready
- Include Props and Emits definitions
- Include brief inline comments for logic
- Use Vuetify components for UI consistency
- Fully executable with no missing imports
- Avoid placeholders; provide real working code
- Output only the .vue file content (no explanation)

Example format:
<template>...</template>
<script setup lang='ts'>...</script>
<style scoped>...</style>

Task:
Create a component named [COMPONENT_NAME].
Description: [SHORT_DESCRIPTION]
"
```

## 💡 デモページ生成プロンプト

```bash
codex "
Generate a Vue 3 + TypeScript + Vuetify demo page that showcases the component [COMPONENT_NAME].

Requirements:
- Import the component and render it in the template
- Add a clear title and short instruction text
- Use Vuetify layout components (v-container, v-row, v-col)
- Include simple state examples if applicable
- Output a single file App.vue that can run directly after 'npm run dev'
- Do not include placeholder text or incomplete imports
"
```

## 📘 README生成プロンプト

```bash
codex "
Generate a README.md for a Vue 3 + TypeScript + Vuetify UI component library.

Requirements:
- Project name: [PROJECT_NAME]
- Include badges (Vue, TypeScript, Vuetify, License)
- Describe project overview, purpose, and usage
- Show example installation and run commands
- Include code sample (ButtonPrevent.vue example)
- Add section for contribution and license
- Output only valid Markdown (no extra comments)
"
```

## 🧪 テスト生成プロンプト（Vitest + Vue Test Utils）

```bash
codex "
Generate a Vitest + Vue Test Utils test file for [COMPONENT_NAME].

Requirements:
- Use TypeScript syntax
- Import the component and mount it
- Test rendering, props, and event emission
- Include at least 3 meaningful test cases
- Use describe/it structure
- Output a single .spec.ts file content
"
```

## ⚙️ 実行フロー（例）

```bash
codex "Create a component named FileUploader.vue. Description: Drag & drop file uploader with progress bar."
codex "Generate a demo page for FileUploader.vue."
codex "Generate a Vitest test file for FileUploader.vue."
codex "Generate a README.md for the project 'ui-catalog-vue'."
```
