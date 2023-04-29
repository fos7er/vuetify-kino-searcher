<template>
  <v-dialog v-model="dialog" max-width="500px" @keydown.esc="$_cancel" @keydown.enter="$_confirm">
    <v-card>
      <v-toolbar :color="color" class="mb-4" dark dense flat>
        <v-toolbar-title class="white--text">{{ titleText }}</v-toolbar-title>
      </v-toolbar>
      <v-card-subtitle v-show="!!messageText" class="text-body-2">
        {{ messageText }}
      </v-card-subtitle>
      <v-card-text v-show="!!agreeText">
        <v-checkbox v-model="agree" :label="agreeText" class="mt-0"/>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!allow"
          :loading="sending"
          color="primary"
          text
          @click.native="$_confirm"
        >
          {{ $t('yes') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          v-text="$t('cancel')"
          @click.native="$_cancel"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        sending: false,
        titleText: null,
        messageText: null,
        agree: false,
        agreeText: null,
        color: null,
        resolve: null,
        reject: null
      }
    },
    computed: {
      allow () {
        return this.agree || !this.agreeText
      }
    },
    methods: {
      open ({ title, message, agree, color = 'warning' } = {}) {
        this.dialog = true
        this.titleText = title
        this.messageText = message
        this.agree = false
        this.agreeText = agree
        this.color = color
        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
      },
      close () {
        this.dialog = false
        this.sending = false
      },
      loadingOver () {
        this.close()
      },
      $_confirm () {
        this.resolve(true)
        this.sending = true
      },
      $_cancel () {
        this.resolve(false)
        this.dialog = false
      }
    }
  }
</script>
