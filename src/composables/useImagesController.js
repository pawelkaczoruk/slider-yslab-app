import { ref } from "vue"


const ITEM_NAME = 'images'
const BASE_IMAGES = [
  {
    filename: 'pug.jpg',
    title: 'Pug',
    subtitle: 'Cold day in the forest',
    reactions: 0
  },
  {
    filename: 'night.jpg',
    title: 'City at night',
    subtitle: 'It is our cyberpunk',
    reactions: 0
  },
  {
    filename: 'milky-way.jpg',
    title: 'Milky Way',
    subtitle: 'Endless...',
    reactions: 0,
  },
  {
    filename: 'turtle.jpg',
    title: 'Turtle',
    subtitle: 'Beauty at the bottom of the sea',
    reactions: 0,
  }
]


const loadImagesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(ITEM_NAME)) || BASE_IMAGES
}

const saveImagesToLocalStorage = () => {
  localStorage.setItem(ITEM_NAME, JSON.stringify(images.value))
}

const images = ref(loadImagesFromLocalStorage())

const modifyImageReactions = (imageIndex, value) => {
  images.value[imageIndex].reactions += value

  if (images.value[imageIndex].reactions < 0) {
    images.value[imageIndex].reactions = 0
    return
  }
  
  saveImagesToLocalStorage()
}


export default function useImagesController() {
  return {
    loadImagesFromLocalStorage,
    saveImagesToLocalStorage,
    images,
    modifyImageReactions
  }
}