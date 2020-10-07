import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsOnBoards = (boardUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardUid"&equalTo="${boardUid}"`).then((response) => {
    const pinsOnBoards = response.data;
    const pins = [];
    if (pinsOnBoards) {
      Object.keys(pinsOnBoards).forEach((item) => {
        pins.push(pinsOnBoards[item]);
      });
    }
    resolve(pins);
  }).catch((error) => reject(error));
});

const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

const addPin = (data) => axios.post(`${baseUrl}/pins.json`, data)
  .then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/pins/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

const getSinglePin = (pinUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinUid}.json`).then((response) => {
    const thisPin = response.data;
    resolve(thisPin);
  }).catch((error) => reject(error));
});

const updatePins = (firebaseKey, cowObject) => axios.patch(`${baseUrl}/pins/${firebaseKey}.json`, cowObject);

export default {
  getPinsOnBoards,
  deletePin,
  addPin,
  getSinglePin,
  updatePins
};
