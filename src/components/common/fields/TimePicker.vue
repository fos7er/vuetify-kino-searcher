<template>
  <div>
    <v-menu
      ref="timePickerMenu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-left="40"
      min-width="300"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-mask="'##:##'"
          :placeholder="$t('Time')"
          :rules="applyRules"
          :value="value"
          clearable
          inputmode='none'
          maxlength="5"
          v-bind="attrs"
          @click="selectOnClick"
          @input="setDate"
          v-on="on"
          @click:clear="$emit('input','')"
          @keyup.enter="menu = false"
          @keydown.up.prevent="upDownHandler"
          @keydown.down.prevent="upDownHandler"
          @keydown.left.prevent="leftRightHandler"
          @keydown.right.prevent="leftRightHandler"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu"
        :value="value"
        format="24hr"
        full-width
        scrollable
        @input="$emit('input', $event)"
        @click:minute="menu = false"
      ></v-time-picker>
    </v-menu>
    <v-overlay :value="overlay && menu"></v-overlay>
  </div>
</template>

<script>
  import dayjs from '@/utils/dayjs'

  export default {
    data () {
      return {
        menu: false,
        selectedPeriod: null,
        localRules: [
          v => (!v || dayjs(v, 'HH:mm', true).isValid()) || this.$t('field-rules.invalid-format-time')
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
      overlay: {
        type: Boolean,
        required: false,
        default: false
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

        return new Date(this.value).toLocaleDateString('Ru-ru')
      }
    },
    methods: {
      setDate (val) {
        if (!val) {
          this.$emit('input', '')
          return
        }

        if (!dayjs(val, 'HH:mm', true).isValid()) {
          this.menu = false
          return
        }

        this.$emit('input', val)
      },
      upDownHandler (e) {
        if (!this.value) {
          this.$emit('input', '')
          return
        }
        // ArrowUp
        if (e.keyCode === 38) {
          this.$emit('input', dayjs(`2022-01-01 ${this.value}`, 'YYYY-MM-DD HH:mm').add(1, this.selectedPeriod).format('HH:mm'))

        } else {
          this.$emit('input', dayjs(`2022-01-01 ${this.value}`, 'YYYY-MM-DD HH:mm').subtract(1, this.selectedPeriod).format('HH:mm'))
        }
        this.setSelection(e.target)
      },
      leftRightHandler (e) {
        if (e.target.value.length < 5) return
        // ArrowLeft
        if (e.keyCode === 37) {
          this.selectedPeriod = 'hour'
        } else {
          this.selectedPeriod = 'minute'
        }
        this.setSelection(e.target)
      },
      selectOnClick (e) {
        if (e.target.value.length < 5) return
        if (e.target.selectionStart > 2) {
          e.target.setSelectionRange(3, 5)
          this.selectedPeriod = 'minute'
        } else {
          e.target.setSelectionRange(0, 2)
          this.selectedPeriod = 'hour'
        }
      },
      setSelection (target) {
        const intervals = {
          minute: [3, 5],
          hour: [0, 2]
        }
        const type = this.selectedPeriod
        this.$nextTick(() => {
          target.setSelectionRange(intervals[type][0], intervals[type][1])
        })
      }
    }
  }
</script>
