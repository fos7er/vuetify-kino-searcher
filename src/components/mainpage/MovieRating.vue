<template>
  <div>
    <div :class="[size, color]">
      <span>{{ rating }}%</span>
      <div class="slice">
        <div class="bar"></div>
        <div class="fill"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
  },
  computed: {
    size() {
      return `c100 p${this.rating} small dark`
    },
    color() {
      console.log(this.rating)
      if (this.rating >= 70) {
        return 'green-color'
      }
      if (this.rating >= 50) {
        return 'yellow-color'
      }
      if (this.rating >= 40) {
        return 'orange-color'
      }
      return 'red-color'
    },
    rating() {
      return (this.score * 10).toFixed(0)
    },
  },
}
</script>

<style lang="scss" scoped>
/****************************************************************
 *
 * CSS Percentage Circle
 * Author: Andre Firchow
 *
*****************************************************************/

// Compass utilities
@import '~compass-mixins/lib/compass/css3';

// VARS
$circle-width: 0.08em;
$circle-width-hover: 0.04em;

// colors default
$primary-color: #307bbb;
$secondary-color: #ccc;
$bg-color: #f5f5f5;

$primary-color-green: #4db53c;
$primary-color-orange: #dd9d22;
$primary-color-yellow: #ecf015;
$primary-color-red: #e63516;

// colors dark skin
$primary-color-dark: #c6ff00;
$secondary-color-dark: #777;
$bg-color-dark: #666;

$primary-color-green-dark: #21d07a;
$primary-color-orange-dark: #e08833;
$primary-color-yellow-dark: #ecf015;
$primary-color-red-dark: #e63516;

// CIRCLE
// classes 2 extend
.rect-auto {
  clip: rect(auto, auto, auto, auto);
}

.pie {
  position: absolute;
  border: $circle-width solid $primary-color;
  width: 1 - (2 * $circle-width);
  height: 1 - (2 * $circle-width);
  clip: rect(0em, 0.5em, 1em, 0em);
  border-radius: 50%;
  @include rotate(0deg);
}

.pie-fill {
  @include rotate(180deg);
}

// main
.c100 {
  *,
  *:before,
  *:after {
    @include box-sizing(content-box);
  }

  position: relative;
  font-size: 120px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  float: left;
  margin: 0 0.1em 0.1em 0;
  background-color: $secondary-color;

  // center circle to its parent
  &.center {
    float: none;
    margin: 0 auto;
  }

  // bigger size
  &.big {
    font-size: 240px;
  }

  // smaller size
  &.small {
    font-size: 80px;
  }

  // centered value inside circle
  > span {
    position: absolute;
    width: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    width: 3.3em;
    line-height: 3.3em;
    font-size: 0.3em;
    color: $bg-color;
    display: block;
    text-align: center;
    white-space: nowrap;
    @include transition-property(all);
    @include transition-duration(0.2s);
    @include transition-timing-function(ease-out);
  }

  // background inside the circle
  &:after {
    position: absolute;
    top: $circle-width;
    left: $circle-width;
    display: block;
    content: ' ';
    border-radius: 50%;
    background-color: $bg-color;
    width: 1 - (2 * $circle-width);
    height: 1 - (2 * $circle-width);
    @include transition-property(all);
    @include transition-duration(0.2s);
    @include transition-timing-function(ease-in);
  }

  // the slice (mask)
  .slice {
    position: absolute;
    width: 1em;
    height: 1em;
    clip: rect(0em, 1em, 1em, 0.5em);
  }

  // circle to show the status
  .bar {
    @extend .pie;
  }

  // loop to create all needed elements automatically
  @for $j from 51 through 100 {
    &.p#{$j} .slice {
      @extend .rect-auto;
    }

    &.p#{$j} .bar:after {
      @extend .pie-fill;
    }

    &.p#{$j} .fill {
      @extend .pie;
      @extend .pie-fill;
    }
  }

  // loop to rotate all 100 circles
  @for $j from 1 through 100 {
    &.p#{$j} .bar {
      @include rotate((360/100 * $j) + deg);
    }
  }

  // hover styles
  &:hover {
    cursor: default;

    > span {
      width: 3.33em;
      line-height: 3.33em;
      font-size: 0.3em;
      color: $primary-color;
    }

    &:after {
      top: $circle-width-hover;
      left: $circle-width-hover;
      width: 1 - (2 * $circle-width-hover);
      height: 1 - (2 * $circle-width-hover);
    }
  }

  // override colors for the dark skin
  &.dark {
    background-color: $secondary-color-dark;

    .bar,
    .fill {
      border-color: $primary-color-dark !important;
    }

    > span {
      color: $bg-color;
    }

    &:after {
      background-color: $bg-color-dark;
    }

    &:hover {
      > span {
        color: $primary-color-dark;
      }
    }
  }

  // green skin
  &.green {
    .bar,
    .fill {
      border-color: $primary-color-green !important;
    }

    &:hover {
      > span {
        color: $primary-color-green;
      }
    }
  }

  &.green-color.dark {
    .bar,
    .fill {
      border-color: $primary-color-green-dark !important;
    }

    &:hover {
      > span {
        color: $primary-color-green-dark;
      }
    }
  }

  // orange skin
  &.orange-color {
    .bar,
    .fill {
      border-color: $primary-color-orange !important;
    }

    &:hover {
      > span {
        color: $primary-color-orange;
      }
    }
  }

  &.orange-color.dark {
    .bar,
    .fill {
      border-color: $primary-color-orange-dark !important;
    }

    &:hover {
      > span {
        color: $primary-color-orange-dark;
      }
    }
  }

  // yellow skin
  &.yellow-color {
    .bar,
    .fill {
      border-color: $primary-color-yellow !important;
    }

    &:hover {
      > span {
        color: $primary-color-yellow;
      }
    }
  }
  &.yellow-color.dark {
    .bar,
    .fill {
      border-color: $primary-color-yellow-dark !important;
    }

    &:hover {
      > span {
        color: $primary-color-yellow-dark;
      }
    }
  }

  // red skin
  &.red-color {
    .bar,
    .fill {
      border-color: $primary-color-red !important;
    }

    &:hover {
      > span {
        color: $primary-color-red;
      }
    }
  }
  &.red-color.dark {
    .bar,
    .fill {
      border-color: $primary-color-red-dark !important;
    }

    &:hover {
      > span {
        color: $primary-color-red-dark;
      }
    }
  }
}
</style>
