<template>
  <button
    class="slider-button"
    :disabled="disabled"
  >

    <svg
      class="icon"
      :class="{ flipped: flipIcon }"
      viewBox="0 0 30 53"
    >
      <path
        d="M24.969,53.5,2.8,31.137a3.963,3.963,0,0,1-1.143-2.98A3.963,3.963,0,0,1,2.8,25.177L24.969,2.815a3.892,3.892,0,0,1,5.54,0,3.976,3.976,0,0,1,0,5.59L10.934,28.157,30.509,47.908a3.976,3.976,0,0,1,0,5.59,3.892,3.892,0,0,1-5.54,0Z"
        transform="translate(-1.657 -1.657)"
      />
    </svg>

  </button>
</template>

<script>
export default {
  name: 'SliderButton',
  props: {
    flipIcon: { type: Boolean, default: false },
    disabled: { type: Boolean, required: true }
  }
}
</script>

<style scoped lang="scss">

.slider-button {
  height: 3.5em;
  opacity: 0.8;
  user-select: none;

  &:disabled .icon {
    @include svgStyle(var(--c-gray), var(--c-dark-gray));
    transition: all 0.8s ease-in-out;
  }
  
  &:enabled {
    @include hover() {
      .icon {
        @include svgStyle(var(--c-dark-blue), var(--c-blue));
      }
    }
  }

  &:focus-visible {
    .icon {
      @include svgStyle(var(--c-dark-blue), var(--c-blue));
    }
  }
}

.icon {
  height: 100%;
  overflow: visible;
  @include svgStyle(var(--c-blue), var(--c-light-blue), 1px);
  transition: all 0.2s ease-in-out;

  &.flipped { transform: scaleX(-1); }
}

</style>