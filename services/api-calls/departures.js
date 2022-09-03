import errorHandling from '@/services/error-handling';
/**
 * @typedef {object} DepartureResponse
 * @property {FlightEntry[]} allDepartures
 * @typedef {object} FlightEntry
 * @property {string} flightDirection
 * @property {string} scheduledDepartureDateTime
 * @property {string} scheduledArrivalDateTime
 * @property {null|string} estimatedDepartureDateTime
 * @property {null|string} actualDepartureDateTime
 * @property {object} arrivalAirport
 * @property {string} arrivalAirport.name
 * @property {string} arrivalAirport.cityName
 * @property {string} arrivalAirport.countryName
 * @property {string} arrivalAirport.code
 * @property {object} departureAirport
 * @property {string} departureAirport.name
 * @property {string} departureAirport.cityName
 * @property {string} departureAirport.countryName
 * @property {string} departureAirport.code
 * @property {string} flightNumber
 * @property {object} airline
 * @property {string} airline.name
 * @property {string} airline.code
 * @property {object|null} departureGate
 * @property {string} departureGate.name
 * @property {string} departureGate.number
 * @property {string} departureGate.action
 * @property {null} arrivalTerminal
 * @property {string} departureTerminal
 * @property {string} status
 */

/**
 * API call to get the data.
 * @returns {Promise<FlightEntry[]>}
 */
export const getDepartures = () =>
  fetch('https://a5bffa7f-92dc-454e-bd7b-41377007474b.mock.pstmn.io/departures/', {
    method: 'GET',
    cache: 'no-cache'
  })
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      }

      return Promise.reject(response.statusText);
    })
    .then(response => response.allDepartures)
    .catch((error) => {
      throw new Error(errorHandling(error));
    });

export default getDepartures;
