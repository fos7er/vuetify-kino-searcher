<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="11" sm="8" md="7" lg="5" xl="4">
        <v-card>
          <v-toolbar dark color="secondary">
            <v-toolbar-title>{{ $t('login') }}</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" lazy-validation @submit.prevent="doLogin">
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                :label="$t('email')"
                type="text"
                v-model.trim="form.email"
                :rules="[globalRules.required, globalRules.email]"
                autofocus
                @keypress.enter.prevent="focusPassword"
              />
              <password-field
                prepend-icon="mdi-lock"
                :label="$t('password')"
                validate-on-blur
                v-model.trim="form.password"
                :rules="[globalRules.required, globalRules.minLength(6)]"
                ref="password"
              />
              <div class="d-flex justify-end">
                <router-link to="restore" v-text="$t('forgotPassword')" />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" :loading="loading" depressed color="accent">{{ $t('login') }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PasswordField from '@/components/common/fields/Password'
import clearForm from '@/plugins/mixins/clearForm'

export default {
  components: {
    PasswordField,
  },
  mixins: [clearForm],
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    doLogin() {
      if (!this.$refs.form.validate()) return
      const { email, password } = this.form
      this.loading = true
      this.$store
        .dispatch('auth/login', { email, password })
        .then(() => {
          this.clearForm()
        })
        .finally(() => {
          this.loading = false
        })
    },
    focusPassword() {
      this.$refs.password.focus()
    },
  },
  created() {
    if (this.$route.query.redirect) {
      this.$store.commit('SET_WARNING', this.$t('pleaseLogin'))
    }
  },
}
</script>

<style lang="scss" scoped></style>
