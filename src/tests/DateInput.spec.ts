import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateInput from '../components/DateInput.vue'
import { vuetify } from '../plugins/vuetify'

const mountDateInput = (props: Record<string, unknown> = {}) =>
  mount(DateInput, {
    props,
    global: {
      plugins: [vuetify],
      stubs: {
        Transition: false,
        Teleport: true,
      },
    },
    attachTo: document.body,
  })

describe('DateInput.vue', () => {
  it('手入力した日付が正しく同期される', async () => {
    const wrapper = mountDateInput({ modelValue: null })
    const input = wrapper.get('input')

    await input.setValue('2025-01-05')
    await input.trigger('blur')
    await flushPromises()

    const updates = wrapper.emitted()['update:modelValue'] ?? []
    expect(updates[0]).toEqual(['2025-01-05'])
    expect(wrapper.emitted().change?.[0]).toEqual(['2025-01-05'])
    expect((input.element as HTMLInputElement).value).toBe('2025-01-05')
  })

  it('不正な日付の入力時にエラーメッセージを表示する', async () => {
    const wrapper = mountDateInput({ modelValue: null })
    const input = wrapper.get('input')

    await input.setValue('2025-13-01')
    await input.trigger('blur')
    await flushPromises()

    expect(wrapper.text()).toContain('日付の形式が正しくありません。YYYY-MM-DD で入力してください。')
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined()
  })

  it('カレンダー選択でモデルとテキストが更新される', async () => {
    const wrapper = mountDateInput({ modelValue: null })

    const vm = wrapper.vm as { $: { setupState: Record<string, unknown> } }
    const handlePicker = vm.$.setupState.handlePicker as (value: unknown) => void
    handlePicker('2025-05-10')
    await flushPromises()

    const updates = wrapper.emitted()['update:modelValue'] ?? []
    expect(updates[0]).toEqual(['2025-05-10'])
    const input = wrapper.get('input')
    expect((input.element as HTMLInputElement).value).toBe('2025-05-10')
  })
})
