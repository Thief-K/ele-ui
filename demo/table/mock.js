import Mock from 'better-mock'

const Random = Mock.Random

Mock.mock(/common\/table1/, 'get', {
  data: {
    result: () => {
      const result = []
      for (let i = 0; i < 5; i++) {
        result.push({
          no: Random.id(),
          name: Random.name(),
          gender: '0' + Random.character('12') === '01' ? 'Male' : 'Female',
          age: Random.integer(10, 35)
        })
      }
      return result
    },
    total: 5
  }
})

Mock.mock(/common\/table2/, 'get', {
  data: {
    result: () => {
      const result = []
      for (let i = 0; i < 5; i++) {
        result.push({
          no: Random.id(),
          name: Random.name(),
          hobby1: Random.pick(['game', 'movie', 'music', 'read']),
          hobby2: Random.pick(['game', 'movie', 'music', 'read']),
          hobby3: Random.pick(['game', 'movie', 'music', 'read'])
        })
      }
      return result
    },
    total: 5
  }
})

Mock.mock(/common\/table3/, 'get', {
  data: {
    result: () => {
      const result = [
        { id: '0', gender: 'Group 1', children: [] },
        { id: '1', gender: 'Group 2', children: [] }
      ]
      for (let i = 0; i < 7; i++) {
        result[i % 2].children.push({
          id: Random.id(),
          no: Random.id(),
          name: Random.name(),
          gender: '0' + Random.character('12') === '01' ? 'Male' : 'Female',
          age: Random.integer(10, 35)
        })
      }
      return result
    },
    rows: 7
  }
})
