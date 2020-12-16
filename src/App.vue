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
        >
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

  {{ images[activeSlideIndex].likes }}
  <button @click="modifyLikes(images[activeSlideIndex], 1)">like</button>
  <button @click="modifyLikes(images[activeSlideIndex], -1)">dislike</button>

</template>

<script>
import { ref } from 'vue'
import SliderButton from './components/SliderButton.vue'

export default {
  name: 'App',
  components: {
    SliderButton
  },
  setup() {
    const getImagesFromLocalStorage = () => {
      return JSON.parse(localStorage.getItem('images')) || [
        {
          filename: 'pug.jpg',
          alt: 'Pug covered in blanket',
          name: 'Pug',
          likes: 0
        },
        {
          filename: 'milky-way.jpg',
          alt: 'Milky Way Galaxy',
          name: 'Milky Way',
          likes: 0,
        },
        {
          filename: 'turtle.jpg',
          alt: 'Turtle in ocean',
          name: 'Turtle',
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

    const setAnimationPlayingState = (state) => { isSlideAnimationPlaying = state }
    const modifyLikes = (image, value) => {
      image.likes += value
      if (image.likes < 0) image.likes = 0
      saveImagesToLocalStorage(images.value)
    }

    return {
      images,
      activeSlideIndex,
      next,
      prev,
      slideAnimationDirection,
      setAnimationPlayingState,
      modifyLikes
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/reset';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--c-background);
  min-height: 100vh;
  width: 100%;
}

.slider-container {
  @include rect(100%, 80vh);
  position: relative;
}

.slider-button {
  @include position(absolute, 50%);
  transform: translateY(-50%);

  &.prev { left: 2%; }
  &.next { right: 2%; }
}

.slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.slider-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.slider-item-image {
  height: auto;
  max-height: 100%;
  max-width: 100%;
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
