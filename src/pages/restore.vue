<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="11" lg="5" md="7" sm="8" xl="4" class="d-flex justify-center">
        <v-btn v-if="!resetSend"
               :loading="loading"
               :disabled="loading"
               color="blue-grey"
               class="ma-2 white--text"
               @click="resetPassword"
        >
          {{ $t('resetPassword') }}
          <v-icon
            right
            dark
          >
            mdi-lock-reset
          </v-icon>
        </v-btn>
        <v-alert
          v-else
          dense
          text
          type="success"
        >
          {{ $t('successResetPassword') }} {{ email }}
        </v-alert>
      </v-col>
    </v-row>
    <dialog-confirm ref="dialogConfirm"/>
  </v-container>
</template>
<script>
  import redirectLoggedInUser from '@/plugins/mixins/redirectLoggedInUser'

  export default {
    mixins: [redirectLoggedInUser],
    data () {
      return {
        resetSend: false
      }
    },
    computed: {
      loading () {
        return this.$store.state.auth.isLoading
      },
      email () {
        return this.$route.query.email
      }
    },
    methods: {
      async resetPassword () {
        const confirmDialogText = {
          title: this.$t('resetPassword'),
          message: this.$t('resetPassword') + '?'
        }
        if (await this.$refs.dialogConfirm.open(confirmDialogText)) {
          try {
            await this.$store.dispatch('auth/resetPassword', this.email)
            this.resetSend = true
          } finally {
            this.$refs.dialogConfirm.close()
          }
        }
      }
    }
  }
</script>

