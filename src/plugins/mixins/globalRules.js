export default function () {
  return {
    required: v => {
      if (Array.isArray(v)) {
        return !!v.length || this.$t('inputRequired')
      }
      return !!v || this.$t('inputRequired')
    },
    email: v => (v ? (/^[A-Za-z0-9._%-]+@[a-z0-9.-]+[.][a-z]+$/.test(v) && /^.{1,64}@.{1,250}$/.test(v)) : true) || this.$t('incorrectEmail'),
    same: (one) => {
      return (another) => {
        return one === another ? true : this.$t('notIdenticalPasswords')
      }
    },
    minLength: (length) => {
      return (v) => {
        return v.length >= length ? true : `${this.$t('minLength')} ${length - 1} ${this.$t('characters')}`
      }
    }
  }
}
