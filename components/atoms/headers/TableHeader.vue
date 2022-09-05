<template>
  <section class="departure-board__headings">
    <div class="grid-alignment">
      <span id="departure">Departure time</span>
      <span id="city-name">City Name</span>
      <span id="code">Code</span>
      <span id="airline">Airline</span>
      <span id="gate">Gate</span>
      <span id="status">Status</span>
    </div>
  </section>
</template>

<script>

export default {
  name: 'TableHeader'
};
</script>

<style>
  .grid-alignment {
    align-items: center;
    display: grid;
    grid-gap: 0 1rem;
    grid-template-columns: repeat(var(--columns), minmax(35px, var(--grid-size)));
    margin: 0 auto;
  }

  .departure-board__headings {
    background: linear-gradient(90deg, #fff 0%, #aebcca 100%);
    font-size: 0.9375rem;
    font-weight: bold;
    margin-bottom: 1rem;
    max-width: var(--cap-screen-size);
    padding: 0.3rem 1rem;
  }

  @media screen and (min-width: 800px) {
    .grid-alignment {
      grid-template-columns: repeat(var(--columns), 1fr);
    }

    .departure-board__headings {
      border-radius: 10px;
      font-size: 1.125rem;
      margin: 0 1rem 1rem;
      padding: 0.3rem var(--spacing-table-cell);
    }
  }

  @media screen and (min-width: 86.875rem) {
    .departure-board__headings {
      margin: 0 auto 1rem;
    }
  }
</style>
