<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="11" lg="5" md="7" sm="8" xl="4">
        <v-card>
          <v-toolbar color="secondary" dark>
            <v-toolbar-title>{{ $t('registration') }}</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" lazy-validation @submit.prevent="register">
            <v-card-text>
              <v-text-field
                v-model.trim="form.email"
                :label="$t('email')"
                :rules="[globalRules.required, globalRules.email]"
                autofocus
                prepend-icon="mdi-account"
                type="text"
                @keypress.enter.prevent="focusPassword"
              />
              <password-field
                ref="password"
                v-model.trim="form.password"
                :label="$t('password')"
                :rules="[globalRules.required, globalRules.minLength(6)]"
                prepend-icon="mdi-lock"
                validate-on-blur
                @keypress.enter.prevent="focusRepeatPassword"
                @keydown.tab.prevent="focusRepeatPassword"
              />
              <password-field
                ref="repeatPassword"
                v-model.trim="form.repeatPassword"
                :label="$t('repeatPassword')"
                :rules="[globalRules.required, globalRules.samePassword(this.form.password)]"
                prepend-icon="mdi-lock"
                validate-on-blur
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn :loading="loading" :disabled="loading" color="accent" depressed type="submit">{{
                  $t('registration')
                }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import clearForm from '@/plugins/mixins/clearForm'
  import PasswordField from '@/components/common/fields/Password'
  import redirectLoggedInUser from '@/plugins/mixins/redirectLoggedInUser'

  export default {
    components: {
      PasswordField
    },
    mixins: [clearForm,redirectLoggedInUser],
    data () {
      return {
        form: {
          email: '',
          password: '',
          repeatPassword: ''
        }
      }
    },
    computed: {
      loading() {
        return this.$store.state.auth.isLoading
      }
    },
    methods: {
      async register () {
        if (!this.$refs.form.validate()) return
        const { email, password } = this.form
        try {
          await this.$store.dispatch('auth/register', { email, password })
          await this.$router.push('/profile/settings')
          this.$store.commit('SET_SUCCESS', 'Successfully registration', { root: true })
        } catch (e) {
          this.clearForm()
          this.form.email = email
        }
      },
      focusPassword () {
        this.$refs.password.focus()
      },
      focusRepeatPassword () {
        this.$refs.repeatPassword.focus()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
