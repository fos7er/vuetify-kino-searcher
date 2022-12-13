export default function () {
  return {
    required: v => {
      if (Array.isArray(v)) {
        return !!v.length || this.$t('field-rules.input-required')
      }
      return !!v || this.$t('field-rules.input-required')
    },
    email: v => (v ? (/^[A-Za-z0-9._%-]+@[a-z0-9.-]+[.][a-z]+$/.test(v) && /^.{1,64}@.{1,250}$/.test(v)) : true) || this.$t('field-rules.incorrect-email'),
    samePassword: (one) => {
      return (another) => {
        return one === another ? true : this.$t('field-rules.passwords-must-match')
      }
    },
    minLength: (length) => {
      return (v) => {
        return v.length >= length ? true : `${this.$t('field-rules.min-length')} ${length - 1} ${this.$t('field-rules.characters')}`
      }
    }
  }
}
