<template>
  <div class="slider-item">

    <SliderItemImage
      :filename="image.filename"
      :alt="image.title"
    />

    <SliderItemDescription
      :title="image.title"
      :subtitle="image.subtitle"
      v-if="image.title.trim().length || image.subtitle.trim().length"
    />

    <SliderItemReaction :index="index" />

  </div>
</template>

<script>
import SliderItemDescription from './SliderItemDescription.vue'
import SliderItemImage from './SliderItemImage.vue'
import SliderItemReaction from './SliderItemReaction.vue'

export default {
  name: 'SliderItem',
  components: {
    SliderItemImage,
    SliderItemDescription,
    SliderItemReaction
  },
  props: {
    image: { type: Object, required: true },
    index: { type: Number, required: true }
  }
}
</script>

<style scoped lang="scss">

.slider-item {
  @include flex(center, center);
  @include rect(100%, 100%);
  padding: 0 1em;
}

.slider-item-description {
  @include position(absolute, $b: 0.5em);
}

</style>