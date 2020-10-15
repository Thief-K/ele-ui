import Mock from 'better-mock'

const Random = Mock.Random

Mock.mock(/common\/getI18n/, 'get', {
  data: {
    no: 'No.',
    name: 'Name',
    hobby: 'Hobby',
    hobby1: 'Hobby1',
    hobby2: 'Hobby2',
    hobby3: 'Hobby3',
    gender: 'Gender',
    age: 'Age',
    website: 'Website',
    subscribe: 'Subscribe',
    operation: 'Operation',
    score: 'Score',
    query: 'Query',
    edit: 'Edit',
    delete: 'Delete',
    talent: 'Talent',
    count: 'Count'
  }
})

Mock.mock(/common\/getDictCode/, 'get', {
  data: [
    { value: '01', label: 'Male' },
    { value: '02', label: 'Female' }
  ]
})

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
    total: 7
  }
})

Mock.mock(/common\/table4/, 'get', {
  data: {
    result: () => {
      const result = [
        { id: 1, name: 'dog', talent: 'wang' },
        { id: 2, name: 'cat', talent: 'miao', hasChildren: true }
      ]
      return result
    },
    total: 2
  }
})

Mock.mock(/common\/table5/, 'get', {
  data: {
    result: () => {
      const result = []
      for (let i = 0; i < 10; i++) {
        result.push({
          name: Random.name(),
          gender: '0' + Random.character('12'),
          age: Random.integer(10, 35),
          hobby: Random.pick(['game', 'movie', 'music', 'read', '']),
          score: Random.integer(0, 100),
          website: Random.url(),
          subscribe: Random.natural(0, 1)
        })
      }
      return result
    },
    total: 150
  }
})

Mock.mock(/common\/table6/, 'get', {
  data: {
    result: () => {
      const result = []
      for (let i = 1; i <= 10000; i++) {
        result.push({
          no: i,
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
