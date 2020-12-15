<template>
  <button
    class="slider-button"
    :class="direction"
  >

  </button>
</template>

<script>
export default {
  name: 'SliderButton',
  props: {
    direction: { type: String, required: true }
  }
}
</script>

<style>

</style>