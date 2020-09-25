<template>
  <el-table v-virtual-scroll="config" :data="tableData" :height="height" highlight-current-row style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
import throttle from 'lodash/throttle'
import Mock from 'better-mock'

export default {
  data() {
    const options = []
    const num = Mock.Random.integer(1, 1000)
    for (let i = 1; i <= num; i++) {
      options.push({
        date: i,
        name: Mock.Random.name(),
        address: Mock.Random.city()
      })
    }
    return {
      tableData: [],
      height: 300,
      config: {
        data: options,
        itemHeight: 40
      }
    }
  },
  directives: {
    virtualScroll: {
      bind(el, binding, vnode) {
        // Create wrapper
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

        // Calculate best number of per range
        const NUMBER = context.height / config.itemHeight - 1

        // Define variables
        let lastTop = 0
        let lastRange = 0
        let updateFlag = false
        // Add event listener (use throttle to improve performance)
        wrapper.onscroll = throttle(e => {
          // Define constant
          const top = e.target.scrollTop
          const ratio = top / config.itemHeight
          const index = Math.floor(ratio)

          // Calculate move type
          const move = top > lastTop ? 'down' : 'up'
          lastTop = top

          // Avoid redundant execution
          const currentRange = Math.floor(index / NUMBER)
          if (currentRange !== lastRange && updateFlag === true) {
            updateFlag = false
          }

          // Virtual scroll & Rerender
          if (updateFlag === false) {
            if (
              (move === 'down' && top > config.itemHeight * (lastRange + 1) * NUMBER) ||
              (move === 'up' && top < config.itemHeight * lastRange * NUMBER)
            ) {
              const currentRangeIndex = currentRange * NUMBER
              context.tableData = binding.value.data.slice(currentRangeIndex, currentRangeIndex + NUMBER * 2)
              const offset = config.itemHeight * currentRangeIndex
              body.style.transform = `translateY(${offset}px)`
              // body.style.marginTop = `${offset}px` // same effect
              lastRange = currentRange
              updateFlag = true
            }
          }
        }, 30)

        // Init view
        context.tableData = binding.value.data.slice(0, NUMBER * 2)
      }
    }
  }
}
</script>
