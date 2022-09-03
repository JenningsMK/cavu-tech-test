import {mount} from "@vue/test-utils";
import DepartureBoard from "@/components/moleculs/DepartureBoard";

global.ResizeObserver = jest.fn(() => {
  return {
    observe: () => {
    }
  }
});

describe('The outputted HTML', () => {
  test('We get a total of 4 list elements with the correct out put', () => {
    const comp = mount(DepartureBoard, {
      propsData: {
        flightData: [
          {"scheduledDepartureDateTime":"2022-08-22T10:40:00","scheduledArrivalDateTime":"2022-08-22T01:00:00","estimatedDepartureDateTime":"2022-08-22T11:30:00","actualDepartureDateTime":null,"arrivalAirport":{"name":"Istanbul Airport","cityName":"Istanbul","countryName":"Turkey","code":"IST"},"departureAirport":{"name":"Manchester Airport","cityName":"Manchester","countryName":"United Kingdom","code":"MAN"},"flightNumber":"TK1994","airline":{"name":"Turkish Airlines","code":"TK"},"departureGate":{"name":"Gate 31","number":"31","action":"Final Call"},"arrivalTerminal":null,"departureTerminal":"1","status":"Final Call - Gate 31","scheduledDepartureDateTimeHuman":"10:40","statusClasses":{"closing":true,"boarding":false,"toGate":false,"open":false,"departed":false}},
          {"flightDirection":"departure","scheduledDepartureDateTime":"2022-08-22T10:55:00","scheduledArrivalDateTime":"2022-08-22T01:00:00","estimatedDepartureDateTime":"2022-08-22T11:20:00","actualDepartureDateTime":null,"arrivalAirport":{"name":"Lisbon Portela Airport","cityName":"Lisbon","countryName":"Portugal","code":"LIS"},"departureAirport":{"name":"Manchester Airport","cityName":"Manchester","countryName":"United Kingdom","code":"MAN"},"flightNumber":"TP1317","airline":{"name":"TAP Air Portugal","code":"TP"},"departureGate":{"name":"Gate 22","number":"22","action":"Final Call"},"arrivalTerminal":null,"departureTerminal":"1","status":"Final Call - Gate 22","scheduledDepartureDateTimeHuman":"10:55","statusClasses":{"closing":true,"boarding":false,"toGate":false,"open":false,"departed":false}},
          {"flightDirection":"departure","scheduledDepartureDateTime":"2022-08-22T11:00:00","scheduledArrivalDateTime":"2022-08-22T01:00:00","estimatedDepartureDateTime":"2022-08-22T11:25:00","actualDepartureDateTime":null,"arrivalAirport":{"name":"Orlando International Airport","cityName":"Orlando","countryName":"United States","code":"MCO"},"departureAirport":{"name":"Manchester Airport","cityName":"Manchester","countryName":"United Kingdom","code":"MAN"},"flightNumber":"EI35","airline":{"name":"Aer Lingus","code":"EI"},"departureGate":{"name":"Gate 208","number":"208","action":"Final Call"},"arrivalTerminal":null,"departureTerminal":"2","status":"Final Call - Gate 208","scheduledDepartureDateTimeHuman":"11:00","statusClasses":{"closing":true,"boarding":false,"toGate":false,"open":false,"departed":false}},
          {"flightDirection":"departure","scheduledDepartureDateTime":"2022-08-22T11:00:00","scheduledArrivalDateTime":"2022-08-22T01:00:00","estimatedDepartureDateTime":"2022-08-22T12:40:00","actualDepartureDateTime":null,"arrivalAirport":{"name":"Cancun International Airport","cityName":"Cancun","countryName":"Mexico","code":"CUN"},"departureAirport":{"name":"Manchester Airport","cityName":"Manchester","countryName":"United Kingdom","code":"MAN"},"flightNumber":"TOM192","airline":{"name":"TUI Airways","code":"TOM"},"departureGate":{"name":"Gate 204","number":"204","action":"Gate Open"},"arrivalTerminal":null,"departureTerminal":"2","status":"Go to Gate 204","scheduledDepartureDateTimeHuman":"11:00","statusClasses":{"closing":false,"boarding":false,"toGate":true,"open":false,"departed":false}},
          {"flightDirection":"departure","scheduledDepartureDateTime":"2022-08-22T11:05:00","scheduledArrivalDateTime":"2022-08-22T01:00:00","estimatedDepartureDateTime":"2022-08-22T11:50:00","actualDepartureDateTime":null,"arrivalAirport":{"name":"Brussels Airport","cityName":"Brussels","countryName":"Belgium","code":"BRU"},"departureAirport":{"name":"Manchester Airport","cityName":"Manchester","countryName":"United Kingdom","code":"MAN"},"flightNumber":"SN2174","airline":{"name":"Brussels Airlines","code":"SN"},"departureGate":{"name":"Gate A1","number":"A1","action":"Final Call"},"arrivalTerminal":null,"departureTerminal":"2","status":"Final Call - Gate A1","scheduledDepartureDateTimeHuman":"11:05","statusClasses":{"closing":true,"boarding":false,"toGate":false,"open":false,"departed":false}}
        ]
      }
    });

    const listItems = comp.findAll('.departure-board__flight');

    expect(listItems).toHaveLength(5);
    expect(comp.html()).toMatchSnapshot();
  })
});
