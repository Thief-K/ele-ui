<template>
  <el-table v-virtual-scroll="config" :data="tableData" :height="height" highlight-current-row style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  data() {
    const options = []
    const num = 100
    for (let i = 1; i < num; i++) {
      options.push({
        date: i,
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      })
    }
    return {
      tableData: [],
      height: 500,
      config: {
        data: options,
        itemHeight: 40
      }
    }
  },
  directives: {
    virtualScroll: {
      bind(el, binding, vnode) {
        const context = vnode.context
        const config = binding.value
        const wrapper = el.querySelector('.el-table__body-wrapper')
        const body = el.querySelector('.el-table__body')
        const box = document.createElement('div')
        Object.assign(box.style, {
          float: 'left',
          width: '0px',
          height: `${config.itemHeight * config.data.length}px`
        })
        wrapper.insertBefore(box, wrapper.firstChild)

        // scroll event
        wrapper.onscroll = throttle(e => {
          const top = e.target.scrollTop
          const ratio = top / config.itemHeight
          const index = Math.floor(ratio)
          console.log(top, ratio % 5, index)

          if (index % 10 === 0 && ratio % 5 === 0) {
            context.tableData = binding.value.data.slice(index, index + 20)
            if (index !== 0) {
              // body.style.marginTop = `${top}px`
              body.style.transform = `translateY(${top}px)`
            }
            if (index === 0) {
              // body.style.marginTop = '0px'
              body.style.transform = `translateY(0px)`
              context.tableData = binding.value.data.slice(0, index + 20)
            }
          }
          // body.style.transform = `translateY(${top}px)`
        }, 0)

        context.tableData = binding.value.data.slice(0, 20)
      }
    }
  }
}
</script>
