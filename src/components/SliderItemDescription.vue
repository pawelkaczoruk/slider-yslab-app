<template>
  <div class="slider-item-description">

    <span class="title">
      {{ title.trim() }}
    </span>

    <span
      class="subtitle"
      v-if="subtitle.trim().length"
    >
      {{ subtitle.trim() }}
    </span>

  </div>
</template>

<script>
export default {
  name: 'SliderItemDescription',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true }
  }
}
</script>

<style scoped lang="scss">

.slider-item-description {
  padding: 0.5em 1em;
  border-radius: 10px;
  color: var(--c-text);
  background: var(--c-background-opaque);
  text-align: center;
}

.title,
.subtitle {
  display: inline-block;
}

.title {
  font-weight: bold;
  margin-right: 0.5em;
}

.subtitle {
  font-size: 0.875em;
  padding-left: 0.5rem;
  border-left: 2px solid currentColor;
}

</style>