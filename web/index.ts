interface NavItem {
  id: string
  label: string
  disabled?: boolean
  children?: NavItem[]
}

interface NavItemComponents {
  [lang: string]: NavItem[]
}

const components_zh_CN: NavItem[] = [
  {
    id: 'basic',
    label: '基础组件',
    disabled: true,
    children: [
      { id: 'button', label: 'Button 按钮' },
      { id: 'select', label: 'Select 下拉框' },
      { id: 'form', label: 'Form 表单' },
      { id: 'table', label: 'Table 表格' }
      // { id: 'test', label: 'Test 测试' }
    ]
  }
]

const components_en: NavItem[] = [
  {
    id: 'basic',
    label: 'Basic',
    disabled: true,
    children: [
      { id: 'button', label: 'Button' },
      { id: 'select', label: 'Select' },
      { id: 'form', label: 'Form' },
      { id: 'table', label: 'Table' }
      // { id: 'test', label: 'Test' }
    ]
  }
]

const demoComponents: NavItemComponents = {
  ['zh-cn']: components_zh_CN,
  ['en']: components_en
}

export default demoComponents
