<template>
  <transition-group
    class="slider-display"
    tag="div"
    :name="`slide-${slideAnimationDirection}`"
    @before-enter="setState(true)"
    @after-enter="setState(false)" 
  >

    <SliderItem
      v-for="(image, i) in images"
      :key="i"
      :image="image"
      :index="i"
      v-show="i === index"
    />

  </transition-group>
</template>

<script>
import SliderItem from './SliderItem.vue'
import useSlider from '../composables/useSlider.js'

export default {
  name: 'SliderDisplay',
  components: { SliderItem },
  props: {
    images: { type: Array, required: true },
    index: { type: Number, required: true }
  },
  setup() {
    const { isSlideAnimationPlaying, slideAnimationDirection } = useSlider()
    const setState = (state) => { isSlideAnimationPlaying.value = state }

    return {
      setState,
      slideAnimationDirection
    }
  }
}
</script>

<style scoped lang="scss">

.slider-display {
  @include rect(100%, 100%);
  overflow: hidden;
  position: relative;
}

.slider-item {
  @include position(absolute, 0);

  &.slide-prev-enter-active,
  &.slide-prev-leave-active,
  &.slide-next-enter-active,
  &.slide-next-leave-active {
    transition: all 0.8s ease-in-out;
  }
  
  &.slide-next-enter-from,
  &.slide-prev-leave-to {
    transform: translateX(100%);
  }
  
  &.slide-next-leave-to,
  &.slide-prev-enter-from {
    transform: translateX(-100%);
  }
}

</style>
