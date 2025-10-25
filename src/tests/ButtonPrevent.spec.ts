import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ButtonPrevent from '../components/ButtonPrevent.vue'

// 日本語コメント: setTimeout の早送りに vi.useFakeTimers を使用
describe('ButtonPrevent.vue', () => {
  it('クリックすると一定時間 disabled になる', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ButtonPrevent, { props: { lockMs: 1000 } })
    const btn = wrapper.find('button')
    expect(btn.element.disabled).toBe(false)

    await btn.trigger('click')
    expect(btn.element.disabled).toBe(true)

    // 1秒経過
    await vi.advanceTimersByTimeAsync(1000)
    await wrapper.vm.$nextTick()
    expect(btn.element.disabled).toBe(false)

    vi.useRealTimers()
  })

  it('連続クリックしても2回目は無視される', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ButtonPrevent, { props: { lockMs: 500 } })
    const btn = wrapper.find('button')

    await btn.trigger('click')
    const disabledAfterFirst = btn.element.disabled
    await btn.trigger('click') // 無視されるべき
    const disabledAfterSecond = btn.element.disabled

    expect(disabledAfterSecond).toBe(disabledAfterFirst)

    await vi.advanceTimersByTimeAsync(500)
    await wrapper.vm.$nextTick()
    expect(btn.element.disabled).toBe(false)

    vi.useRealTimers()
  })

  it('props によりラベル表示が変わる', () => {
    const wrapper = mount(ButtonPrevent, { props: { label: '実行' } })
    expect(wrapper.text()).toContain('実行')
  })
})
