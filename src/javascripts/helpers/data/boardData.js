import axios from 'axios';
import apiKeys from './apiKeys.json';
import pins from './pinData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = (userId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json?orderBy="useruid"&equalTo="${userId}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      if (demBoards) {
        Object.keys(demBoards).forEach((boardId) => {
          boards.push(demBoards[boardId]);
        });
      }
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const getSingleBoard = (boardUid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${boardUid}"`)
    .then((response) => {
      const board = Object.values(response.data);
      const thisBoard = board[0];
      resolve(thisBoard);
    })
    .catch((error) => reject(error));
});

const addBoard = (data) => axios.post(`${baseUrl}/boards.json`, data).then((response) => {
  const update = { uid: response.data.name };
  axios
    .patch(`${baseUrl}/boards/${response.data.name}.json`, update)
    .catch((error) => console.warn(error));
});

const deleteBoard = (boardUid) => {
  pins
    .getPinsOnBoards(boardUid)
    .then((response) => {
      response.forEach((item) => {
        pins.deletePin(item.uid);
      });
    })
    .then(() => {
      getSingleBoard(boardUid).then((response) => {
        console.warn(response.uid);
        axios.delete(`${baseUrl}/boards/${response.uid}.json`);
      });
    });
};

const updateBoard = (uid, dataObject) => axios.patch(`${baseUrl}/boards/${uid}.json`, dataObject);

export default {
  getBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard
};
