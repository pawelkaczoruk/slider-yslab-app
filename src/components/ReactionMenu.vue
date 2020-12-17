<template>
  <div class="reaction-menu">

    <div class="reaction-buttons-container">
      <button
        class="reaction-button left"
        @click="modifyLikes(1)"
      >
        <svg
          class="icon"
          viewBox="0 0 26 26"
        >
          <path
            d="M9.5,22V15h-7a3,3,0,1,1,0-6h7V2a3,3,0,1,1,6,0V9h7a3,3,0,0,1,0,6h-7v7a3,3,0,1,1-6,0Z"
            transform="translate(0.5 1)"
          />
        </svg>
      </button>

      <button
        class="reaction-button right"
        @click="modifyLikes(-1)"
      >
        <svg
          class="icon"
          viewBox="0 0 26 6"
        >
          <path
            d="M3,0A3,3,0,0,1,6,3V23a3,3,0,0,1-6,0V3A3,3,0,0,1,3,0Z"
            transform="translate(26) rotate(90)"
          />
        </svg>
      </button>
    </div>

    <ReactionCounter :reactions="images[activeSlideIndex].reactions" />

  </div>
</template>

<script>
import ReactionCounter from './ReactionCounter.vue'
import useImagesController from '../composables/useImagesController'
import useSlider from '../composables/useSlider'

export default {
  name: 'RectionMenu',
  components: { ReactionCounter },
  setup() {
    const { activeSlideIndex, addReactionToSlide } = useSlider()
    const { images, modifyImageReactions } = useImagesController()

    const modifyLikes = (value) => {
      modifyImageReactions(activeSlideIndex.value, value)
      const reactionName = value > 0 ? 'upvote' : 'downvote'
      addReactionToSlide(activeSlideIndex.value, reactionName)
    }

    return {
      activeSlideIndex,
      images,
      modifyLikes
    }
  }
}
</script>

<style scoped lang="scss">

.reaction-menu {
  @include flex(center);
  height: 2.75em;
}

.reaction-buttons-container {
  @include rect(7.25em, 100%, 10px);
  @include flex(space-between, center);
  overflow: hidden;
  background: linear-gradient(
    var(--c-gray) 12%,
    var(--c-background) 12% 88%,
    var(--c-gray) 88% 100%
  );
}

.reaction-button {
  @include rect(3.5em, 100%);
  @include flex(center, center);
  background: var(--c-gray);
  user-select: none;

  @include hover() {
    &.left .icon { fill: var(--c-light-blue); }
    &.right .icon { fill: var(--c-light-red); }
  }

  &:focus-visible {
    &.left .icon { fill: var(--c-light-blue); }
    &.right .icon { fill: var(--c-light-red); }
  }

  .icon {
    @include rect(1.75em, 1.75em);
    fill: var(--c-light-gray);
    transition: all 0.2s ease-in-out;
  }
}

</style>
