<template>
  <main>
    <departure-board :flight-data="flightData" />
    <departure-form />
  </main>
</template>

<script>
import DepartureBoard from '@/components/moleculs/DepartureBoard';
import DepartureForm from '@/components/moleculs/DepartureForm';

// Services
import getDepartures from '@/services/api-calls/departures';

export default {
  name: 'IndexPage',

  components: {
    DepartureBoard,
    DepartureForm
  },

  data () {
    return {
      flightData: []
    };
  },

  mounted () {
    this.sortData();
  },

  methods: {
    /**
     * Sorts the data we get form the API call in the following way.
     * * Remove departed flights
     * * sort the flight into order of departure time
     * * take the first 5
     * * add a new property and convert the time into human friendly readable format
     * * add some logic to work out what class the statue of the flight should have
     * @returns {Promise<void>}
     */
    async sortData () {
      performance.mark('departure-call-start');
      const response = await getDepartures();
      performance.mark('departure-call-end');
      performance.measure('departure-call', 'departure-call-start', 'departure-call-end');

      /** @type {FlightEntry[]} */
      const allDepartures = response;
      performance.mark('format-data-start');
      // Remove the departed from the array
      const validFlights = allDepartures.filter(flightEntry => !(/departed [0-9]{2}:[0-9]{2}/i).test(flightEntry.status));
      // Sort the flight based on scheduled departure time
      const sortedFlights = validFlights.sort((a, b) => {
        if (+(new Date(a.scheduledDepartureDateTime)) < +(new Date(b.scheduledDepartureDateTime))) {
          return -1;
        }

        if (+(new Date(a.scheduledDepartureDateTime)) > +(new Date(b.scheduledDepartureDateTime))) {
          return 1;
        }

        return 0;
      });
      // Select the first 5
      const selectedFlights = sortedFlights.slice(0, 5);
      // Formatting the date time into human-readable format and assign to new property `scheduledDepartureDateTimeHuman`
      const transformTimes = selectedFlights.map((flightEntry) => {
        const time = new Intl.DateTimeFormat('en-GB', {
          timeStyle: 'short',
          hour12: false
        }).format(new Date(flightEntry.scheduledDepartureDateTime));

        return {
          ...flightEntry,
          scheduledDepartureDateTimeHuman: time
        };
      });
      this.flightData = transformTimes.map((flightEntry) => {
        flightEntry.statusClasses = {
          closing: false,
          boarding: false,
          toGate: false,
          open: false,
          departed: false
        };

        flightEntry.statusClasses.closing = /final call/i.test(flightEntry.status);
        flightEntry.statusClasses.toGate = /go to gate/i.test(flightEntry.status);
        flightEntry.statusClasses.boarding = /boarding now/i.test(flightEntry.status);
        flightEntry.statusClasses.open = /wait in lounge/i.test(flightEntry.status);
        flightEntry.statusClasses.departed = /departed/i.test(flightEntry.status);

        return flightEntry;
      });
      performance.mark('format-data-end');
      performance.measure('format-data', 'format-data-start', 'format-data-end');

      setTimeout(this.sortData, 4500);
    }
  }
};
</script>

<style>
:root {
  --yellow-v0: rgb(255 239 151);
  --yellow-v1: rgb(223 196 46);
  --yellow-v2: rgb(245 216 54);
  --flight-closing: rgb(214 123 39);
  --flight-boarding: rgb(30 169 69);
  --flight-go-to-gate: rgb(56 119 245);
  --flight-gate-open: rgb(245 216 54);
  --flight-gate-departed: rgb(178 34 34);
  --flight-text-color: rgb(28 28 28);
  --padding: 2.25rem;
  --columns: 5;
  --grid-size: calc(100%  / var(--columns));
  --cap-screen-size: 1200px;
  --spacing-table-cell: 80px;
  --error: firebrick;
}

@media screen and (min-width: 800px) {
  :root {
    --columns: 6;
  }
}

body {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
