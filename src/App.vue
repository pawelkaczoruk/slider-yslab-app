<template>
  <div class="slider-container">
    <transition-group
      class="slider"
      tag="div"
      :name="`slide-${slideAnimationDirection}`"
      @before-enter="setAnimationPlayingState(true)"
      @after-enter="setAnimationPlayingState(false)" 
    >
      <div
        class="slider-item"
        v-for="(image, i) in images"
        :key="i"
        v-show="i === activeSlideIndex"
      >
        <img
          class="slider-item-image"
          :src="require(`${'./assets/images/' + image.filename}`)"
          :alt="`${image.title}`"
        >

        <div class="slide-description">
          <span class="title">{{ image.title }}</span>
          <span
            class="subtitle"
            v-if="image.subtitle.length"
          >{{ image.subtitle }}</span>
        </div>

        <transition
          :name="`reaction-${reactionAnimationName}`"
          @after-enter="setReactionAnimationPlayingState(false)"
        >
          <svg
            class="animated-icon"
            viewBox="0 0 48 42"
            v-show="isReactionAnimationPlaying && i === reactedImageIndex"
          >
            <path
              d="M23.074,72.654C9.535,60.859,0,54.612,0,44.675,0,37.16,5.381,31,12.75,31c5.114,0,8.908,3.126,11.25,7.561C26.342,34.127,30.136,31,35.25,31,42.62,31,48,37.161,48,44.675c0,9.936-9.522,16.174-23.074,27.979A1.411,1.411,0,0,1,23.074,72.654Z"
              transform="translate(0 -31)"
            />
          </svg>
        </transition>
      </div>
    </transition-group>

    <SliderButton
      class="prev"
      :disabled="activeSlideIndex === 0"
      @click="prev()"
    />
    <SliderButton
      class="next"
      :disabled="activeSlideIndex === images.length - 1"
      @click="next()"
      flip-icon
    />
  </div>

  <div class="action-menu">

    <div class="action-buttons-container">
      <button
        class="action-button like-button"
        @click="modifyLikes(activeSlideIndex, 1)"
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
        class="action-button dislike-button"
        @click="modifyLikes(activeSlideIndex, -1)"
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

    <div class="likes-display">
      <svg
        class="icon"
        :class="{ 'colored': images[activeSlideIndex].likes > 0 }"
        viewBox="0 0 48 42"
      >
        <path
          d="M23.074,72.654C9.535,60.859,0,54.612,0,44.675,0,37.16,5.381,31,12.75,31c5.114,0,8.908,3.126,11.25,7.561C26.342,34.127,30.136,31,35.25,31,42.62,31,48,37.161,48,44.675c0,9.936-9.522,16.174-23.074,27.979A1.411,1.411,0,0,1,23.074,72.654Z"
          transform="translate(0 -31)"
        />
      </svg>
      <span class="likes-counter">
        {{ images[activeSlideIndex].likes }}
      </span>
    </div>

  </div>

</template>

<script>
import { ref } from 'vue'
import SliderButton from './components/SliderButton.vue'

export default {
  name: 'App',
  components: {
    SliderButton,
  },
  setup() {
    const getImagesFromLocalStorage = () => {
      return JSON.parse(localStorage.getItem('images')) || [
        {
          filename: 'pug.jpg',
          title: 'Pug',
          subtitle: 'Cold day in the forest',
          likes: 0
        },
        {
          filename: 'night.jpg',
          title: 'City at night',
          subtitle: 'It is our cyberpunk',
          likes: 0
        },
        {
          filename: 'milky-way.jpg',
          title: 'Milky Way',
          subtitle: 'Endless...',
          likes: 0,
        },
        {
          filename: 'turtle.jpg',
          title: 'Turtle',
          subtitle: 'Beauty at the bottom of the sea',
          likes: 0,
        }
      ]
    }
    const saveImagesToLocalStorage = (images) => {
      localStorage.setItem('images', JSON.stringify(images))
    }

    const images = ref(getImagesFromLocalStorage())

    const activeSlideIndex = ref(0)
    const slideAnimationDirection = ref('next')
    let isSlideAnimationPlaying = false
    const reactionAnimationName = ref('like')
    const isReactionAnimationPlaying = ref(false)
    const reactedImageIndex = ref(0)

    const next = () => {
      if (isSlideAnimationPlaying) return
      slideAnimationDirection.value = 'next'
      if (activeSlideIndex.value < images.value.length - 1) activeSlideIndex.value++
    }

    const prev = () => {
      if (isSlideAnimationPlaying) return
      slideAnimationDirection.value = 'prev'
      if (activeSlideIndex.value > 0) activeSlideIndex.value--
    }

    const setReactionAnimationPlayingState = (state) => { isReactionAnimationPlaying.value = state }
    const setAnimationPlayingState = (state) => { isSlideAnimationPlaying = state }
    const modifyLikes = (imageIndex, value) => {
      const image = images.value[imageIndex]
      image.likes += value

      if (image.likes < 0) {
        image.likes = 0
        return
      }

      reactedImageIndex.value = imageIndex
      reactionAnimationName.value = value > 0 ? 'like' : 'dislike'
      setReactionAnimationPlayingState(true)
      saveImagesToLocalStorage(images.value)
    }

    return {
      images,
      activeSlideIndex,
      next,
      prev,
      slideAnimationDirection,
      setAnimationPlayingState,
      modifyLikes,

      isReactionAnimationPlaying,
      reactionAnimationName,
      setReactionAnimationPlayingState,
      reactedImageIndex
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/reset';

.slide-description {
  position: absolute;
  bottom: 1%;
  color: var(--c-text);
  padding: 0.5em 1em;
  border-radius: 10px;
  background: var(--c-background-opaque);
  text-align: center;
  
  .title {
    display: inline-block;
    font-weight: bold;
    margin-right: 0.5em;
  }

  .subtitle {
    display: inline-block;
    font-size: 0.875em;
    padding-left: 0.5rem;
    border-left: 2px solid currentColor;
  }
}


@keyframes bounce-in {
  0% {
    transform: translate(50%, -50%) scale(0.7);
  }
  50% {
    transform: translate(50%, -50%) scale(1.2);
  }
  60% {
    transform: translate(50%, -50%) scale(1.15);
  }
  70%,
  100% {
    transform: translate(50%, -50%) scale(1.2);
  }
}

@keyframes shrink {
  0% {
    transform: translate(50%, -50%) scale(1.2);
  }
  60% {
    transform: translate(50%, -50%) scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: translate(50%, -50%) scale(0.4);
    opacity: 0;
  }
}

.slider-container {

  .animated-icon {
    overflow: visible;
    max-width: 30%;
    height: 20%;
    opacity: 0.7;
    fill: var(--c-light-blue);
    stroke: var(--c-text);
    @include position(absolute, 50%, 50%);
    transform: translate(50%, -50%);
    // transition: all 0.4s ease;

    &.reaction-like-enter-active,
    &.reaction-dislike-enter-active {
      animation: bounce-in 0.6s;
    }
    &.reaction-like-leave-active,
    &.reaction-dislike-leave-active {
      animation: shrink 0.6s;
    }
    &.reaction-dislike-enter-active,
    &.reaction-dislike-leave-active {
      fill: var(--c-gray);
    }

  }
}





#app {
  @include flex(center, center, column);
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
  max-width: 1600px;
}

.slider-container {
  @include rect(100%, 80vh);
  max-height: 1000px;
  position: relative;
}

.slider-button {
  @include position(absolute, 50%);
  transform: translateY(-50%);

  &.prev { left: 2%; }
  &.next { right: 2%; }
}

.action-menu {
  @include flex(center);
  height: 2.75em;
}

.action-buttons-container {
  @include rect(7.25em, 100%, 10px);
  @include flex(space-between, center);
  overflow: hidden;
  background: linear-gradient(var(--c-gray) 12%, var(--c-background) 12% 88%, var(--c-gray) 88% 100%) ;
}

.action-button {
  @include rect(3.5em, 100%);
  @include flex(center, center);
  background: var(--c-gray);
  user-select: none;

  @include hover() {
    &.like-button {
      .icon { fill: var(--c-light-blue); }
    }

    &.dislike-button {
      .icon { fill: var(--c-light-red); }
    }
  }

  &:focus-visible {
    &.like-button {
      .icon { fill: var(--c-light-blue); }
    }

    &.dislike-button {
      .icon { fill: var(--c-light-red); }
    }
  }

  .icon {
    @include rect(1.75em, 1.75em);
    fill: var(--c-light-gray);
    transition: all 0.2s ease-in-out;
  }
}

.likes-display {
  height: 100%;
  @include flex(false, center);
  color: var(--c-text);
  margin-left: 2.5em;
  position: relative;

  .likes-counter {
    @include position(absolute, $l: 105%);
    margin-left: 0.25rem;
    font-size: 2em;
    font-weight: bold;
  }

  .icon {
    height: 70%;
    fill: var(--c-light-gray);
    transition: all 0.4s ease;

    &.colored { fill: var(--c-light-blue); }
  }
}

.slider-container {
  padding: 2% 0;

  @media screen and (orientation: portrait) {
    padding: 1% 0;
  }
}

.slider {
  @include rect(100%, 100%);
  overflow: hidden;
  position: relative;
}

.slider-item {
  @include flex(center, center);
  height: 100%;
  width: 100%;
  padding: 0 1%;
}

.slider-item-image {
  height: auto;
  max-height: 100%;
  max-width: 100%;
  border-radius: 1em;
  user-select: none;
}

.slide-prev-enter-active,
.slide-prev-leave-active,
.slide-next-enter-active,
.slide-next-leave-active {
  transition: all 0.8s ease;
  position: absolute;
  top: 0;  
}

.slide-next-enter-from,
.slide-prev-leave-to {
  transform: translate(100%, 0);
}

.slide-next-leave-to,
.slide-prev-enter-from {
  transform: translate(-100%, 0);
}

</style>
