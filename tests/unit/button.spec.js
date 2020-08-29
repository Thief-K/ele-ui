import { shallowMount } from '@vue/test-utils'
import Button from '@/components/button/button.vue'

describe('Button', () => {
  it('snapshot', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('content', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.vm.content).toBe('Button')
    expect(wrapper.text()).toBe('Button')
  })

  // TODO
  // it('tooltip', async () => {
  //   const wrapper = shallowMount(Button, {
  //     slots: {
  //       default: 'Button'
  //     },
  //     propsData: {
  //       tooltip: true
  //     }
  //   })
  //   console.log(wrapper.html())
  // })

  it('click', () => {
    const wrapper = shallowMount(Button)
    wrapper.vm.onClick()
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('preset', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'query'
      }
    })
    expect(wrapper.attributes().type).toBe('primary')
    expect(wrapper.attributes().icon).toBe('el-icon-search')
  })
})
