<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="11" lg="5" md="7" sm="8" xl="4">
        <v-card>
          <v-toolbar color="secondary" dark>
            <v-toolbar-title>{{ $t('login') }}</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" lazy-validation @submit.prevent="doLogin">
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
              />
              <div class="d-flex justify-end">
                <router-link to="restore" v-text="$t('forgotPassword')"/>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn :loading="loading" color="accent" depressed type="submit">{{ $t('login') }}</v-btn>
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
      PasswordField
    },
    mixins: [clearForm],
    data () {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      loading() {
        return this.$store.state.isLoading
      }
    },
    methods: {
      async doLogin () {
        if (!this.$refs.form.validate()) return
        const { email, password } = this.form
        try {
          await this.$store.dispatch('auth/login', { email, password })
          this.$store.commit('SET_SUCCESS', this.$t('successLogin'), { root: true })
          this.clearForm()
          this.$router.push('/')
        } catch (e) {
          this.form.email = email
        }
      },
      focusPassword () {
        this.$refs.password.focus()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
