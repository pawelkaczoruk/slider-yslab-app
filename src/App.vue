<template>

  <AppSlider />
  <ReactionMenu />

</template>

<script>
import AppSlider from './components/AppSlider.vue'
import ReactionMenu from './components/ReactionMenu.vue'

export default {
  name: 'App',
  components: {
    AppSlider,
    ReactionMenu,
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/reset';

#app {
  @include flex(center, center, column);
  width: 100%;
  max-width: 1600px;
  min-height: 100%;
  margin: 0 auto;
}

</style>
