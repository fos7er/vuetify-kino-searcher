<template>
  <v-icon class="icon" :class="{'rotate': open}" v-bind="$attrs">
    mdi-chevron-down
  </v-icon>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        required:true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  }

  .rotate {
    transform: rotate(-180deg);
  }
</style>
