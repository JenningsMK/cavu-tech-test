import {mount} from "@vue/test-utils";
import indexPage from '@/pages';

const mockFlightDate = {
  allDepartures: [
    {
      "flightDirection": "departure",
      "scheduledDepartureDateTime": "2022-08-22T11:10:00",
      "scheduledArrivalDateTime": "2022-08-22T01:00:00",
      "estimatedDepartureDateTime": "2022-08-22T11:15:00",
      "actualDepartureDateTime": "2022-08-22T11:15:00",
      "arrivalAirport": {
        "name": "Amsterdam Airport Schiphol",
        "cityName": "Amsterdam",
        "countryName": "Netherlands",
        "code": "AMS"
      },
      "departureAirport": {
        "name": "Manchester Airport",
        "cityName": "Manchester",
        "countryName": "United Kingdom",
        "code": "MAN"
      },
      "flightNumber": "KL1074",
      "airline": {
        "name": "KLM",
        "code": "KL"
      },
      "departureGate": {
        "name": "Gate A7",
        "number": "A7",
        "action": "Final Call"
      },
      "arrivalTerminal": null,
      "departureTerminal": "2",
      "status": "Departed 11:15"
    },
    {
      "flightDirection": "departure",
      "scheduledDepartureDateTime": "2022-08-22T11:15:00",
      "scheduledArrivalDateTime": "2022-08-22T01:00:00",
      "estimatedDepartureDateTime": "2022-08-22T11:15:00",
      "actualDepartureDateTime": "2022-08-22T11:16:00",
      "arrivalAirport": {
        "name": "Amsterdam Airport Schiphol",
        "cityName": "Amsterdam",
        "countryName": "Netherlands",
        "code": "AMS"
      },
      "departureAirport": {
        "name": "Manchester Airport",
        "cityName": "Manchester",
        "countryName": "United Kingdom",
        "code": "MAN"
      },
      "flightNumber": "EZY1837",
      "airline": {
        "name": "easyJet",
        "code": "EZY"
      },
      "departureGate": {
        "name": "Gate 09",
        "number": "9",
        "action": "Final Call"
      },
      "arrivalTerminal": null,
      "departureTerminal": "1",
      "status": "Departed 11:16"
    },
    {
      "flightDirection": "departure",
      "scheduledDepartureDateTime": "2022-08-22T11:30:00",
      "scheduledArrivalDateTime": "2022-08-22T01:00:00",
      "estimatedDepartureDateTime": "2022-08-22T12:05:00",
      "actualDepartureDateTime": null,
      "arrivalAirport": {
        "name": "Punta Cana International Airport",
        "cityName": "Punta Cana",
        "countryName": "Dominican Republic",
        "code": "PUJ"
      },
      "departureAirport": {
        "name": "Manchester Airport",
        "cityName": "Manchester",
        "countryName": "United Kingdom",
        "code": "MAN"
      },
      "flightNumber": "TOM184",
      "airline": {
        "name": "TUI Airways",
        "code": "TOM"
      },
      "departureGate": {
        "name": "Gate A6",
        "number": "A6",
        "action": "Gate Open"
      },
      "arrivalTerminal": null,
      "departureTerminal": "2",
      "status": "Go to Gate A6"
    },
    {
      "flightDirection": "departure",
      "scheduledDepartureDateTime": "2022-08-22T11:40:00",
      "scheduledArrivalDateTime": "2022-08-22T01:00:00",
      "estimatedDepartureDateTime": "2022-08-22T11:40:00",
      "actualDepartureDateTime": null,
      "arrivalAirport": {
        "name": "Antalya Airport",
        "cityName": "Antalya",
        "countryName": "Turkey",
        "code": "AYT"
      },
      "departureAirport": {
        "name": "Manchester Airport",
        "cityName": "Manchester",
        "countryName": "United Kingdom",
        "code": "MAN"
      },
      "flightNumber": "PC1816",
      "airline": {
        "name": "Pegasus",
        "code": "PC"
      },
      "departureGate": {
        "name": "Gate A9",
        "number": "A9",
        "action": "Final Call"
      },
      "arrivalTerminal": null,
      "departureTerminal": "2",
      "status": "Final Call - Gate A9"
    }
  ]
}

global.ResizeObserver = jest.fn(() => {
  return {
    observe: () => {
    }
  }
});
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockFlightDate),
  ok: true
}));
global.performance.mark = jest.fn();
global.performance.measure = jest.fn();

describe('Handling and formatting the data', () => {

  test('We filter out the departed flights from the array and get the flight that ready to leave', async () => {
    const comp = mount(indexPage);

    await comp.vm.sortData();
    const flightData = comp.vm.flightData;

    expect(flightData).toHaveLength(2);
    expect([flightData[0], flightData[1]])
      .toMatchObject([
        mockFlightDate.allDepartures[2],
        mockFlightDate.allDepartures[3]
      ])
  });

  test('We format the timmDate into a human readily format', async () => {
    const comp = mount(indexPage);

    await comp.vm.sortData();
    const flightData = comp.vm.flightData;

    expect(flightData[0].scheduledDepartureDateTimeHuman).toMatch(/[0-9]{2}:[0-9]{2}/);
  });
});
