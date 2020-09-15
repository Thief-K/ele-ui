// components tree
const treeData_zh_CN = [
  {
    id: 'basic',
    label: '基础组件',
    disabled: true,
    children: [
      { id: 'button', label: 'Button 按钮' },
      { id: 'select', label: 'Select 下拉框' },
      { id: 'form', label: 'Form 表单' },
      { id: 'table', label: 'Table 表格' }
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
      { id: 'select', label: 'Select' },
      { id: 'form', label: 'Form' },
      { id: 'table', label: 'Table' }
    ]
  }
]

export default {
  ['zh-CN']: treeData_zh_CN,
  ['en']: treeData_en
}
