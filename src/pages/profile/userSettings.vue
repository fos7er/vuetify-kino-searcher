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
                    v-model="form.birthDay"
                    :rules="[globalRules.required]"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-card-account-details-outline</v-icon>
                </v-col>
                <v-col>
                  <v-textarea v-model="form.about" :label="$t('aboutYou')" name="input-7-4" outlined solo></v-textarea>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-palette</v-icon>
                </v-col>
                <v-col
                >
                  <v-switch
                    v-model="form.theme"
                    :label="$t('dark theme')"
                    true-value="dark"
                    false-value="light"
                    @change="themePreview"
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="2">
                  <v-icon aria-hidden="false" large> mdi-pirate</v-icon>
                </v-col>
                <v-col
                >
                  <v-switch
                    v-model="form.pirate"
                    :label="$t('imPirate')"
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
  import fieldDatePicker from '@/components/common/fields/DatePicker'

  export default {
    components: { fieldDatePicker },
    data () {
      return {
        loading: false,
        form: this.$store.getters['userSettings/settings'],
        datePickerMenu: false
      }
    },
    methods: {
      focusGender () {},
      async save () {
        const data = this.prepareData()
        await this.$store.dispatch('userSettings/updateSettings',data)
        this.$store.commit('SET_SUCCESS',this.$t('saveSettings'))
      },
      themePreview () {
        this.$store.commit('userSettings/UPDATE_SETTINGS', { theme: this.form.theme })
      },
      prepareData () {
        //TODO ADD COLLECT PROPS
        return {
          about: this.form.about,
          birthDay: this.form.birthDay,
          gender: this.form.gender,
          name: this.form.name,
          pirate:  this.form.pirate,
          theme: this.form.theme
        }
      }
    }
  }
</script>
