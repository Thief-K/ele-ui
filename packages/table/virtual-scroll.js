import throttle from 'lodash-es/throttle'

export default {
  bind(el, binding, vnode) {
    if (vnode.context.virtualScroll === false) {
      return
    }
    // Create wrapper
    const wrapper = el.querySelector('.el-table__body-wrapper')
    const box = document.createElement('div')
    box.style.float = 'left'
    box.style.width = '0px'
    box.className = 'virtual-scroll-wrapper'
    wrapper.insertBefore(box, wrapper.firstChild)
  },
  update(el, binding, vnode) {
    if (
      vnode.context.virtualScroll === false ||
      binding.value.data.length === 0 ||
      (binding.value.data.length === binding.oldValue.data.length && binding.value.data === binding.oldValue.data)
    ) {
      return
    }
    // Get wrapper
    const context = vnode.context
    const config = binding.value
    const wrapper = el.querySelector('.el-table__body-wrapper')
    const body = el.querySelector('.el-table__body')
    const box = el.querySelector('.virtual-scroll-wrapper')

    // Update height
    box.style.height = `${config.itemHeight * config.data.length}px`

    // Calculate best number of per range
    const NUMBER = context.$attrs.height / config.itemHeight - 1

    // Define variables
    let lastTop = 0
    let lastRange = 0
    let updateFlag = false
    // Add event listener (use throttle to improve performance)
    wrapper.onscroll = throttle((e) => {
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
        if ((move === 'down' && top > config.itemHeight * (lastRange + 1) * NUMBER) || (move === 'up' && top <= config.itemHeight * lastRange * NUMBER)) {
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
    if (binding.value.data !== binding.oldValue.data) {
      wrapper.scrollTop = 0
    }
  }
}
