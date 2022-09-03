import errorHandling from '~/services/error-handling';
/**
 * @typedef {object} RequestData
 * @property {string} flightCode
 * @property {string} flightStatus
 */

/**
 * Send a request to update a flights status
 * @param {RequestData} data
 * @returns {Promise<Response>}
 */
const updateStatus = data =>
  fetch('https://a5bffa7f-92dc-454e-bd7b-41377007474b.mock.pstmn.io/departures/', {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }

      return Promise.resolve();
    })
    .catch((status) => {
      throw new Error(errorHandling(status));
    });

export default updateStatus;
