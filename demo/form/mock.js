import Mock from 'better-mock'

const Random = Mock.Random

Mock.mock(/common\/getDictCode/, 'get', {
  data: () => {
    let arr = []
    for (let i = 1; i <= 4; i++) {
      arr.push({
        value: '0' + i,
        label: Random.name()
      })
    }
    return arr
  }
})
