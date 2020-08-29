import { shallowMount } from '@vue/test-utils'
import Select from '@/components/select/select.vue'

const mockHttp = {
  get: url => {
    return new Promise(resolve => {
      let response = null
      if (url === '/common/getDictCode') {
        response = {
          data: [
            { value: '01', label: 'Male' },
            { value: '02', label: 'Female' }
          ]
        }
      }
      if (url === '/get/options') {
        response = {
          data: {
            type: 'options',
            data: [
              { value: '01', label: 'Male' },
              { value: '02', label: 'Female' }
            ]
          }
        }
      }
      if (url === '/get/groups') {
        response = {
          data: {
            type: 'groups',
            data: [
              {
                label: 'Group',
                options: [
                  { value: '01', label: 'Male' },
                  { value: '02', label: 'Female' }
                ]
              }
            ]
          }
        }
      }
      resolve(response)
    })
  }
}

describe('Button', () => {
  it('snapshot', () => {
    const wrapper = shallowMount(Select)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('options', async () => {
    const wrapper = shallowMount(Select, {
      propsData: {
        options: [
          { value: '1', label: 'A' },
          { value: '2', label: 'B' },
          { value: '3', label: 'C' }
        ]
      }
    })
    expect(wrapper.findAll('el-option-group-stub').length).toBe(0)
    expect(wrapper.findAll('el-option-stub').length).toBe(3)
    wrapper.setProps({ options: [] })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('el-option-group-stub').length).toBe(0)
    expect(wrapper.findAll('el-option-stub').length).toBe(0)
  })

  it('groups', async () => {
    const wrapper = shallowMount(Select, {
      propsData: {
        groups: [
          {
            label: 'Group1',
            options: [
              { value: '1', label: 'Option1' },
              { value: '2', label: 'Option2' },
              { value: '3', label: 'Option3' }
            ]
          },
          {
            label: 'Group2',
            options: [
              { value: '4', label: 'Option4' },
              { value: '5', label: 'Option5' },
              { value: '6', label: 'Option6' }
            ]
          }
        ]
      }
    })
    expect(wrapper.findAll('el-option-group-stub').length).toBe(2)
    expect(wrapper.findAll('el-option-stub').length).toBe(6)
    wrapper.setProps({ groups: [] })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('el-option-group-stub').length).toBe(0)
    expect(wrapper.findAll('el-option-stub').length).toBe(0)
  })

  it('data dictionary', done => {
    const wrapper = shallowMount(Select, {
      propsData: {
        dictCode: 'gender'
      },
      mocks: {
        $http: mockHttp
      }
    })
    setTimeout(() => {
      expect(wrapper.findAll('el-option-group-stub').length).toBe(0)
      expect(wrapper.findAll('el-option-stub').length).toBe(2)
      done()
    }, 0)
  })

  it('request options', done => {
    const wrapper = shallowMount(Select, {
      propsData: {
        request: {
          url: '/get/options',
          param: null
        }
      },
      mocks: {
        $http: mockHttp
      }
    })
    setTimeout(() => {
      expect(wrapper.findAll('el-option-group-stub').length).toBe(0)
      expect(wrapper.findAll('el-option-stub').length).toBe(2)
      done()
    }, 0)
  })

  it('request groups', done => {
    const wrapper = shallowMount(Select, {
      propsData: {
        request: {
          url: '/get/groups',
          param: null
        }
      },
      mocks: {
        $http: mockHttp
      }
    })
    setTimeout(() => {
      expect(wrapper.findAll('el-option-group-stub').length).toBe(1)
      expect(wrapper.findAll('el-option-stub').length).toBe(2)
      done()
    }, 0)
  })

  it('change', () => {
    const wrapper = shallowMount(Select)
    wrapper.vm.onChange()
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
