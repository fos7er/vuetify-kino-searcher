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
                v-model="form.email"
                autofocus
                @keypress.enter.prevent="focusPassword"
              />
              <password-field
                prepend-icon="mdi-lock"
                :label="$t('password')"
                validate-on-blur
                v-model.trim="form.password"
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
export default {
  components: {
    PasswordField,
  },
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
    doLogin() {},
    focusPassword() {
      this.$refs.password.focus()
    },
  },
}
</script>

<style lang="scss" scoped></style>
