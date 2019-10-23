export default {
  search: {
    inline: true,
    formAttrs: {
      size: 'mini'
    },
    isShowSubmitBtn: false,
    formDesc: {
      date: {
        type: 'daterange',
        attrs: {
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期'
        }
      }
    },
    getFormData: () => ({
      date: []
    })
  }
}
