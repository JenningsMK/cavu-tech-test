<template>
  <div class="departure-board">
    <header class="departure-board__header">
      <border-header />
    </header>

    <table-header />

    <ul ref="flights" class="departure-board__flights" aria-live="polite">
      <template v-if="Array.isArray(flightData) && flightData.length">
        <template v-for="flight in flightData">
          <flight-entry :key="flight.flightNumber" :entrys="flight" />
        </template>
      </template>

      <template v-else>
        <p class="loading-message">
          Getting flight data
        </p>
      </template>
    </ul>
  </div>
</template>

<script>
import BorderHeader from '~/components/atoms/headers/BorderHeader';
import TableHeader from '~/components/atoms/headers/TableHeader';
import FlightEntry from '~/components/atoms/listItems/FlightEntry';

export default {
  name: 'LargeDepartureBoard',

  components: {
    BorderHeader,
    TableHeader,
    FlightEntry
  },

  props: {
    flightData: {
      type: Array || String,
      required: true
    }
  }
};
</script>

<style>
  .departure-board {
    background: linear-gradient(90deg, #464646 0%, #000 100%);
    font-size: 1.5rem;
    margin: auto auto 2rem;
    width: 100%;
  }

  .departure-board__header {
    background-image:
      radial-gradient(
        81.65% 10898.53% at 18.35% 50%,
        var(--yellow-v0) 0%,
        var(--yellow-v1) 100%
      );
    padding: var(--padding);
    margin-bottom: 1rem;
  }

  .loading-message {
    color: white;
    line-height: 2;
    text-align: center;
  }

  .departure-board__flights {
    margin: 0 auto;
    padding: 0 1rem 2rem;
  }
</style>
