interface ButtonType {
  type: string
  icon: string
  round?: boolean
  circle?: boolean
}

interface ButtonPreset {
  [type: string]: ButtonType
}

const preset: ButtonPreset = {
  add: { type: '', icon: 'el-icon-plus', round: true },
  edit: { type: '', icon: 'el-icon-edit-outline', round: true },
  delete: { type: 'danger', icon: 'el-icon-delete', round: true },
  confirm: { type: 'primary', icon: 'el-icon-check' },
  cancel: { type: '', icon: 'el-icon-close' },
  pre: { type: '', icon: 'el-icon-d-arrow-left' },
  next: { type: '', icon: 'el-icon-d-arrow-right' },
  query: { type: 'primary', icon: 'el-icon-search' },
  set: { type: '', icon: 'el-icon-setting', round: true },
  save: { type: 'primary', icon: 'el-icon-document' },
  append: { type: '', icon: 'el-icon-check', round: true },
  call: { type: 'primary', icon: 'el-icon-phone-outline', round: true },
  blank: { type: '', icon: 'el-icon-document' },
  success: { type: 'success', icon: 'el-icon-check' },
  fail: { type: 'danger', icon: 'el-icon-close' },
  plus: { type: 'primary', icon: '', circle: true },
  minus: { type: 'danger', icon: '', circle: true },
  refresh: { type: 'primary', icon: '' },
  up: { type: '', icon: 'el-icon-arrow-up', circle: true },
  down: { type: '', icon: 'el-icon-arrow-down', circle: true },
  view: { type: '', icon: 'el-icon-view', circle: true },
  display: { type: 'success', icon: 'el-icon-setting', circle: true },
  copy: { type: 'primary', icon: 'el-icon-document', circle: true },
  more: { type: 'primary', icon: 'el-icon-more', circle: true },
  download: { type: 'primary', icon: 'el-icon-download', round: true }
}

export default preset
