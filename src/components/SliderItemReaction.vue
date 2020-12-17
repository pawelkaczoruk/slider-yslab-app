<template>
  <transition
    :name="`reaction-${reactionAnimationName}`"
    @after-enter="setState(false)"
  >

    <svg
      class="slider-item-reaction icon"
      viewBox="0 0 48 42"
      v-show="isReactionAnimationPlaying && index === reactedSlideIndex"
    >
      <path
        d="M23.074,72.654C9.535,60.859,0,54.612,0,44.675,0,37.16,5.381,31,12.75,31c5.114,0,8.908,3.126,11.25,7.561C26.342,34.127,30.136,31,35.25,31,42.62,31,48,37.161,48,44.675c0,9.936-9.522,16.174-23.074,27.979A1.411,1.411,0,0,1,23.074,72.654Z"
        transform="translate(0 -31)"
      />
    </svg>

  </transition>
</template>

<script>
import useSlider from '../composables/useSlider.js'

export default {
  name: 'SliderItemReaction',
  props: {
    index: { type: Number, required: true }
  },
  setup() {
    const { isReactionAnimationPlaying, reactedSlideIndex, reactionAnimationName } = useSlider()
    const setState = (state) => { isReactionAnimationPlaying.value = state }

    return {
      isReactionAnimationPlaying,
      reactedSlideIndex,
      reactionAnimationName,
      setState
    }
  }
}
</script>

<style scoped lang="scss">

.slider-item-reaction {
  position: absolute;

  &.reaction-upvote-enter-active,
  &.reaction-downvote-enter-active {
    animation: bounce-in 0.6s;
  }

  &.reaction-upvote-leave-active,
  &.reaction-downvote-leave-active {
    animation: shrink 0.6s;
  }

  &.reaction-downvote-enter-active,
  &.reaction-downvote-leave-active {
    fill: var(--c-gray);
  }
}

.icon {
  @include svgStyle(var(--c-light-blue), var(--c-text));
  height: 20%;
  max-width: 30%;
  overflow: visible;
  opacity: 0.7;
}

@keyframes bounce-in {
  0% { transform: scale(0.7); }
  50% { transform: scale(1.2); }
  60% { transform: scale(1.15); }
  70%,
  100% { transform: scale(1.2); }
}

@keyframes shrink {
  0% { transform: scale(1.2); }
  60% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.4);
    opacity: 0;
  }
}

</style>