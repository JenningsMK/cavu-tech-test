/**
 * @param {*} statusNumber - The status number of the request
 */
const errorHandling = (statusNumber) => {
  switch (statusNumber) {
    case 404:
      return 'The request has gone to the wrong location and was rejected, please contact the IT team about this.';

    case 500:
      return 'Server error';

    default:
      return `An unknown error was reported, ${statusNumber}`;
  }
};

export default errorHandling;
