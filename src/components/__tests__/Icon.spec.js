import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../Icon.vue'

describe('Icon', () => {
  it('renders an svg with the default size', () => {
    const wrapper = mount(Icon, { props: { name: 'mail' } })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('width')).toBe('24')
    expect(svg.attributes('height')).toBe('24')
  })

  it('honors a custom size prop', () => {
    const wrapper = mount(Icon, { props: { name: 'mail', size: 32 } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('32')
    expect(svg.attributes('height')).toBe('32')
  })

  it('is hidden from assistive technology', () => {
    const wrapper = mount(Icon, { props: { name: 'mail' } })
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
  })

  it('renders the path(s) for a known icon', () => {
    const wrapper = mount(Icon, { props: { name: 'mail' } })
    expect(wrapper.findAll('path').length).toBeGreaterThan(0)
  })

  it('falls back to a circle for an unknown icon name', () => {
    const wrapper = mount(Icon, { props: { name: 'definitely-not-a-real-icon' } })
    expect(wrapper.find('circle').exists()).toBe(true)
    expect(wrapper.findAll('path').length).toBe(0)
  })

  it('falls back to the default viewBox for an unknown icon', () => {
    const wrapper = mount(Icon, { props: { name: 'nope' } })
    const attrs = wrapper.find('svg').attributes()
    // jsdom may preserve SVG attribute casing, so accept either form
    expect(attrs.viewBox ?? attrs.viewbox).toBe('0 0 24 24')
  })

  it('uses stroke for line icons by default', () => {
    const wrapper = mount(Icon, { props: { name: 'mail' } })
    const path = wrapper.find('path')
    expect(path.attributes('fill')).toBe('none')
    expect(path.attributes('stroke')).toBe('currentColor')
  })

  it('switches to fill when a fill color is provided', () => {
    const wrapper = mount(Icon, { props: { name: 'mail', fill: '#ffd700' } })
    const path = wrapper.find('path')
    expect(path.attributes('fill')).toBe('#ffd700')
  })
})
