<template>
  <v-text-field
      ref="field"
      :append-icon="open ? 'mdi-eye' : 'mdi-eye-off'"
      :type="open ? 'text' : 'password'"
      v-bind="$attrs"
      v-on="$listeners"
      @click:append="toggle"
  />
</template>

<script>
  export default {
    data () {
      return {
        open: false
      }
    },
    methods: {
      show () {
        this.open = true
      },
      hide () {
        this.open = false
      },
      toggle () {
        this.open = !this.open
      },
      resetValidation () {
        this.$refs.field.resetValidation()
      },
      validate () {
        return this.$refs.field.validate()
      },
      focus () {
        return this.$refs.field.focus()
      }
    }
  }
</script>
