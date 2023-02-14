<template>
  <v-progress-linear v-model="value" :height="8" v-bind="$attrs"></v-progress-linear>
</template>

<script>
  export default {
    props: {
      step: {
        type: Number,
        default: 1000
      },
      capacity: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        value: 0,
        interval:null
      }
    },
    methods: {
      start () {
        this.interval = null
        setInterval(() => {
          this.value += 100 / (this.capacity / this.step)
        }, this.step)
      }
    },
    mounted () {
      this.start()
    },
    beforeUnmount () {
      clearInterval(this.interval)
    }
  }
</script>
