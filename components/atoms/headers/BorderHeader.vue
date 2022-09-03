<template functional>
  <h1 class="page-title" :class="[data.class, data.staticClass]">
    Departures
  </h1>
</template>

<script>
export default {
  name: 'BorderHeader'
};
</script>

<style>
  .page-title {
    --image-spacing: 1.2rem;
    --image-size: 3rem;

    background: url("~/static/departures.svg") no-repeat var(--image-spacing) / var(--image-size);
    padding-left: calc(var(--padding) + var(--image-size) + var(--image-spacing));
    font-size: 2.625rem;
    margin: 0 auto;
    max-width: var(--cap-screen-size);
    text-align: left;
  }
</style>
