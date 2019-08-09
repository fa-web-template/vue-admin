export default {
  search: {
    item: [
      {
        key: 'date',
        type: 'datetimerange',
        meta: {
          enableEvent: true
        }
      }
    ],
    data: () => ({
      date: []
    })
  }
}
