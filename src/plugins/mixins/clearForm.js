export default {
  methods: {
    clearForm(obj) {
      const form = obj || this.form
      for (const key in form) {
        form[key] = ''
      }
    },
  },
}
