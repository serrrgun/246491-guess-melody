const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 246491;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then((response) => response.json());
  }

  static loadResults() {
    return fetch(`${SERVER_URL}/stats/${APP_ID}`)
      .then(checkStatus)
      .then((response) => response.json());
  }
  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}`, requestSettings).then(checkStatus);
  }
}
