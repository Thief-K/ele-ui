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
    wrapper.vm.$emit('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
