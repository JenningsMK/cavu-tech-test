<template>
  <li class="departure-board__flight grid-alignment">
    <time :datetime="entrys.scheduledDepartureDateTime" aria-labelledby="departure">
      {{ entrys.scheduledDepartureDateTimeHuman }}
    </time>

    <span aria-labelledby="city-name" class="flight__city-name">
      {{ entrys.arrivalAirport.name }}
    </span>

    <span aria-labelledby="code" class="flight__code">
      {{ entrys.flightNumber }}
    </span>

    <span aria-labelledby="airline">
      {{ entrys.airline.name }}
    </span>

    <span aria-labelledby="gate" class="flight__gate">
      {{ entrys.departureGate.number }}
    </span>

    <span
      aria-labelledby="status"
      class="flight"
      :class="{
        'flight--closing': entrys.statusClasses.closing,
        'flight--boarding': entrys.statusClasses.boarding,
        'flight--to-gate': entrys.statusClasses.toGate,
        'flight--open': entrys.statusClasses.open,
        'flight--departed': entrys.statusClasses.departed
      }"
    >
      {{ entrys.departureGate.action }}
    </span>
  </li>
</template>

<script>

export default {
  name: 'FlightEntry',

  props: {
    entrys: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
  .departure-board__flight {
    border-bottom: 2px solid white;
    color: white;
    font-size: 1rem;
    grid-gap: 1rem;
    list-style: none;
    margin-bottom: 1rem;
    max-width: var(--cap-screen-size);
    padding-bottom: 1.5rem;
  }

  .flight {
    background: white;
    border-left-width: 12px;
    border-left-style: solid;
    border-radius: 3px 25px 25px 3px;
    font-weight: bold;
    grid-column: -1 / 1;
    margin: 0 auto;
    padding: 0.5rem 0.5rem 0.5rem 0.8rem;
    width: 8.125rem;
  }

  .flight__city-name {
    word-break: break-word;
  }

  .flight__city-name,
  .flight__gate {
    color: var(--yellow-v2);
  }

  .flight--closing {
    border-color: var(--flight-closing);
    color: var(--flight-closing);
  }

  .flight--boarding {
    border-color: var(--flight-boarding);
    color: var(--flight-boarding);
  }

  .flight--to-gate {
    border-color: var(--flight-go-to-gate);
    color: var(--flight-text-color);
  }

  .flight--open {
    border-color: var(--flight-gate-open);
    color: var(--flight-text-color);
  }

  .flight--departed {
    border-color: var(--flight-gate-departed);
    color: var(--flight-gate-departed);
  }

  @media screen and (min-width: 50rem) {
    .grid-alignment {
      grid-template-columns: repeat(var(--columns), 1fr);
    }

    .departure-board__flight {
      border: 2px solid white;
      border-radius: 10px;
      font-size: 1.5rem;
      font-weight: bold;
      padding: 1rem var(--spacing-table-cell);
    }

    .flight {
      grid-column: auto;
      width: 100%;
    }
  }
</style>
