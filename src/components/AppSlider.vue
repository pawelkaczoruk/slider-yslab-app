<template>
  <div class="app-slider">

    <SliderDisplay
      :images="images"
      :index="activeSlideIndex"
    />

    <SliderButton
      class="prev"
      :disabled="activeSlideIndex === 0"
      @click="slideToPrev()"
    />

    <SliderButton
      class="next"
      :disabled="activeSlideIndex === images.length - 1"
      @click="slideToNext(images.length - 1)"
      flip-icon
    />

  </div>
</template>

<script>
import SliderDisplay from './SliderDisplay.vue'
import SliderButton from './SliderButton.vue'
import useSlider from '../composables/useSlider.js'
import useImagesController from '../composables/useImagesController.js'

export default {
  name: 'AppSlider',
  components: {
    SliderDisplay,
    SliderButton
  },
  setup() {
    const { slideToPrev, slideToNext, activeSlideIndex } = useSlider()
    const { images } = useImagesController()

    return {
      slideToPrev,
      slideToNext,
      activeSlideIndex,
      images
    }
  }
}
</script>

<style scoped lang="scss">

.app-slider {
  @include rect(100%, 80vh);
  max-height: 1000px;
  padding: 1.5em 0;
  position: relative;

  @media screen and (orientation: portrait) {
    padding: 0.75em 0;
  }
}

.slider-button {
  @include position(absolute, 50%);
  transform: translateY(-50%);

  &.prev { left: 2%; }
  &.next { right: 2%; }
}

</style>
