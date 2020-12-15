<template>
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

  <button
    v-show="activeSlideIndex > 0"
    @click="prev()"
  >prev</button>
  <button
    v-show="activeSlideIndex < images.length - 1"
    @click="next()"
  >next</button>

  {{ images[activeSlideIndex].likes }}
  <button @click="modifyLikes(images[activeSlideIndex], 1)">like</button>
  <button @click="modifyLikes(images[activeSlideIndex], -1)">dislike</button>

</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
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
// reset

html { font-size: 16px; }

body {
  min-height: 100vh;
  color: var(--c-text-primary);
  background: var(--c-background);
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 1em;
  font-weight: normal;
}

ul,
ol { list-style: none; }

a { text-decoration: none; }

// other

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.slider {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  position: relative;
  background: rgb(32, 32, 32);
}

.slider-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
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
