<template>
  <v-container class="">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="7" lg="5">
        <v-card>
          <v-toolbar dark color="secondary">
            <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" lazy-validation @submit.prevent="saveSettings">
            <v-card-text>
              <v-row align="center">
                <v-col cols="2"><v-icon large aria-hidden="false"> mdi-account </v-icon></v-col>
                <v-col
                  ><v-text-field
                    :label="$t('name')"
                    type="text"
                    v-model.trim="form.name"
                    :rules="[globalRules.required, globalRules.minLength(2)]"
                    autofocus
                    @keypress.enter.prevent="focusGender"
                /></v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2"><v-icon large aria-hidden="false"> mdi-gender-male-female </v-icon> </v-col>
                <v-col
                  ><v-radio-group v-model="form.gender" row>
                    <v-radio :label="$t('male')" value="male"></v-radio>
                    <v-radio :label="$t('female')" value="female"></v-radio> </v-radio-group
                ></v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2"><v-icon large aria-hidden="false"> mdi-calendar </v-icon> </v-col>
                <v-col>
                  <v-menu
                    v-model="datePickerMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.birthDate"
                        :label="$t('birthDate')"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      no-title
                      v-model="form.birthDate"
                      @input="datePickerMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon large aria-hidden="false"> mdi-card-account-details-outline </v-icon>
                </v-col>
                <v-col>
                  <v-textarea solo name="input-7-4" outlined :label="$t('aboutYou')"></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" :loading="loading" depressed color="accent">{{ $t('save') }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      form: {
        name: '',
        gender: 'male',
        birthDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        contacts: '',
      },
      datePickerMenu: false,
    }
  },
  methods: {
    focusGender() {},
  },
}
</script>

<style lang="scss" scoped></style>
