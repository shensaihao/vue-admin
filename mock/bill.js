const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    amount: '@integer(300, 5000)',
    'status|1': ['published', 'draft', 'deleted'],
    contractName: 'name',
    applicationCreateTime: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
