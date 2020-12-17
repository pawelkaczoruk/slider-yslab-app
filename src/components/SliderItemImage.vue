<template>

  <img
    class="slider-item-image"
    :src="path" 
    :alt="`${alt}`"
  >

</template>

<script>
export default {
  name: 'SliderItemImage',
  props: {
    filename: { type: String, required: true },
    alt: { type: String, required: true }
  },
  setup(props) {
    return {
      path: require('@/assets/images/' + props.filename)
    }
  }
}
</script>

<style scoped lang="scss">

.slider-item-image {
  @include rect(false, auto, 1em);
  max-height: 100%;
  max-width: 100%;
  user-select: none;
}

</style>