<template>
  <div class="reaction-counter">

    <svg
      class="icon"
      :class="{ colored: reactions > 0 }"
      viewBox="0 0 48 42"
    >
      <path
        d="M23.074,72.654C9.535,60.859,0,54.612,0,44.675,0,37.16,5.381,31,12.75,31c5.114,0,8.908,3.126,11.25,7.561C26.342,34.127,30.136,31,35.25,31,42.62,31,48,37.161,48,44.675c0,9.936-9.522,16.174-23.074,27.979A1.411,1.411,0,0,1,23.074,72.654Z"
        transform="translate(0 -31)"
      />
    </svg>

    <span class="counter">
      {{ reactions }}
    </span>

  </div>
</template>

<script>
export default {
  name: 'ReactionCounter',
  props: {
    reactions: { type: Number, required: true }
  }
}
</script>

<style scoped lang="scss">

.reaction-counter {
  @include flex(false, center);
  height: 100%;
  margin-left: 2.5em;
  position: relative;
  color: var(--c-text);
}

.counter {
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

</style>
