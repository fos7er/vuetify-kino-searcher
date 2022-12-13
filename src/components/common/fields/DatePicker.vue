<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    min-width="auto"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        ref="input"
        v-mask="'##.##.####'"
        :label="label"
        :placeholder="$t('Date')"
        :rules="applyRules"
        :value="dateFormat"
        clearable
        inputmode='none'
        maxlength="10"
        v-bind="attrs"
        @click="selectOnClick"
        @input="setDate"
        v-on="on"
        @click:clear="$emit('input',''); menu = true"
        @keyup.enter="menu = false"
        @keydown.up.prevent="upDownHandler"
        @keydown.down.prevent="upDownHandler"
        @keydown.left.prevent="leftRightHandler"
        @keydown.right.prevent="leftRightHandler"
      ></v-text-field>
    </template>
    <v-date-picker
      :show-current="false"
      :value="value"
      @input="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  import dayjs from '@/utils/dayjs'

  export default {
    data () {
      return {
        menu: false,
        selectedPeriod: null,
        localRules: [
          v => (!v || dayjs(v, 'DD.MM.YYYY', true).isValid()) || this.$t('field-rules.invalid-format-date')
        ]
      }
    },
    props: {
      value: {
        type: String,
        required: true
      },
      rules: {
        type: Array,
        required: false
      },
      label: {
        type: String,
        required: false
      }
    },
    computed: {
      applyRules () {
        if (this.rules) return this.localRules.concat(this.rules)
        return this.localRules
      },
      dateFormat () {
        const val = this.value
        if (!val) return ''
        return new Date(val).toLocaleDateString('Ru-ru')
      }
    },
    methods: {
      save (data) {
        this.menu = false
        this.$emit('input', data)
      },
      setDate (val) {
        if (!val) {
          this.$emit('input', '')
          return
        }
        if (!dayjs(val, 'DD.MM.YYYY', true).isValid()) {
          this.menu = false
          return
        }
        this.$emit('input', dayjs(val, 'DD.MM.YYYY').format('YYYY-MM-DD'))
      },
      upDownHandler (e) {
        if (!this.value) {
          this.$emit('input', '')
          return
        }
        // ArrowUp
        if (e.keyCode === 38) {
          this.$emit('input', dayjs(this.value).add(1, this.selectedPeriod).format('YYYY-MM-DD'))

        } else {
          this.$emit('input', dayjs(this.value).subtract(1, this.selectedPeriod).format('YYYY-MM-DD'))
        }
        this.setSelection(e.target)
      },
      leftRightHandler (e) {
        if (e.target.value.length < 10) return
        // ArrowLeft
        if (e.keyCode === 37) {
          if (this.selectedPeriod === 'year') {
            this.selectedPeriod = 'month'
          } else {
            this.selectedPeriod = 'day'
          }
        } else {
          if (this.selectedPeriod === 'day') {
            this.selectedPeriod = 'month'
          } else {
            this.selectedPeriod = 'year'
          }
        }
        this.setSelection(e.target)
      },
      selectOnClick (e) {
        if (e.target.value.length < 10) return
        if (e.target.selectionStart > 5) {
          e.target.setSelectionRange(6, 10)
          this.selectedPeriod = 'year'
        } else if (e.target.selectionStart < 2) {
          e.target.setSelectionRange(0, 2)
          this.selectedPeriod = 'day'
        } else {
          e.target.setSelectionRange(3, 5)
          this.selectedPeriod = 'month'
        }
      },
      setSelection (target) {
        const intervals = {
          day: [0, 2],
          month: [3, 5],
          year: [6, 10]
        }
        const type = this.selectedPeriod
        this.$nextTick(() => {
          target.setSelectionRange(intervals[type][0], intervals[type][1])
        })
      }
    }
  }
</script>
