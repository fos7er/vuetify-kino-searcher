<template>
  <v-container class="">
    <v-row align="center" justify="center">
      <v-col lg="5" md="7" sm="8">
        <v-card>
          <v-toolbar color="secondary" dark>
            <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" lazy-validation @submit.prevent="save">
            <v-card-text>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-account</v-icon>
                </v-col>
                <v-col
                >
                  <v-text-field
                    v-model.trim="form.name"
                    :label="$t('name')"
                    :rules="[globalRules.required, globalRules.minLength(2)]"
                    autofocus
                    type="text"
                    @keypress.enter.prevent="focusGender"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-gender-male-female</v-icon>
                </v-col>
                <v-col
                >
                  <v-radio-group v-model="form.gender" row>
                    <v-radio :label="$t('male')" value="male"></v-radio>
                    <v-radio :label="$t('female')" value="female"></v-radio>
                  </v-radio-group
                  >
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-calendar</v-icon>
                </v-col>
                <v-col>
                  <field-date-picker
                    v-model="form.birthDate"
                    :rules="[globalRules.required]"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-card-account-details-outline</v-icon>
                </v-col>
                <v-col>
                  <v-textarea :label="$t('aboutYou')" name="input-7-4" outlined solo></v-textarea>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-palette</v-icon>
                </v-col>
                <v-col
                >
                  <v-switch
                    v-model="form.darkTheme"
                    :label="$t('Dark theme')"
                    @change="saveTheme({ theme: $event ? 'dark' : 'light' })"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn :loading="loading" color="accent" depressed type="submit">{{ $t('save') }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dayjs from 'dayjs'
  import fieldDatePicker from '@/components/common/fields/DatePicker'
  import vuetify from '@/plugins/vuetify'

  export default {
    components: { fieldDatePicker },
    data () {
      return {
        loading: false,
        form: {
          name: '',
          gender: 'male',
          birthDate: dayjs().format('YYYY-MM-DD'),
          contacts: '',
          darkTheme: true
        },
        datePickerMenu: false
      }
    },
    methods: {
      focusGender () {},
      save () {
        const data = this.prepareData()
        vuetify.framework.theme.dark = data.darkTheme
        document.documentElement.style.setProperty('--colorTheme', data.darkTheme ? 'dark' : 'light')
      },
      saveTheme () {},
      prepareData () {
        return this.form
      }
    }
  }
</script>

<style lang="scss" scoped></style>
