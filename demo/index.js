// components tree
const treeData_zh_CN = [
  {
    id: 'basic',
    label: '基础组件',
    disabled: true,
    children: [
      { id: 'button', label: 'Button 按钮' },
      { id: 'select', label: 'Select 下拉框' }
      // { id: 'test', label: 'Test 测试' }
    ]
  }
]

const treeData_en = [
  {
    id: 'basic',
    label: 'Basic',
    disabled: true,
    children: [
      { id: 'button', label: 'Button' },
      { id: 'select', label: 'Select' }
      // { id: 'test', label: 'Test' }
    ]
  }
]

export default {
  ['zh-CN']: treeData_zh_CN,
  ['en']: treeData_en
}
