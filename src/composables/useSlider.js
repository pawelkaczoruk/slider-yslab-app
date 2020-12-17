import { ref } from 'vue'


const activeSlideIndex = ref(0)
const slideAnimationDirection = ref('next')
let isSlideAnimationPlaying = ref(false)

const slideToNext = (max) => {
  if (isSlideAnimationPlaying.value) return
  slideAnimationDirection.value = 'next'
  if (activeSlideIndex.value < max) activeSlideIndex.value++
}

const slideToPrev = () => {
  if (isSlideAnimationPlaying.value) return
  slideAnimationDirection.value = 'prev'
  if (activeSlideIndex.value > 0) activeSlideIndex.value--
}


const reactedSlideIndex = ref(0)
const reactionAnimationName = ref('upvote')
const isReactionAnimationPlaying = ref(false)

const addReactionToSlide = (slideIndex, name) => {
  reactedSlideIndex.value = slideIndex
  reactionAnimationName.value = name
  isReactionAnimationPlaying.value = true
}


export default function useSlider() {
  return {
    activeSlideIndex,
    slideAnimationDirection,
    isSlideAnimationPlaying,
    slideToNext,
    slideToPrev,
    reactedSlideIndex,
    reactionAnimationName,
    isReactionAnimationPlaying,
    addReactionToSlide
  }
}