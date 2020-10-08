import addBoard from '../components/views/addBoard';
import showBoards from '../components/views/showBoard';
import addPin from '../components/views/addPin';
import updatePin from '../components/views/updatePins';

const viewHelper = (id, user, param) => {
  switch (id) {
    case 'boards-link':
      return showBoards.showBoards(user);
    case 'add-board-link':
      return addBoard.boardView();
    case 'add-pin-link':
      return addPin.pinFormView(user);
    case 'update-pin-link':
      return updatePin.updatePin(user, param);
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view, user) => {
  viewHelper(view, user);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id, user);
  });
  $('body').on('click', '.update-pin', (e) => {
    const pinUid = e.currentTarget.id;
    viewHelper('update-pin-link', user, pinUid);
  });
};

export default { viewListener };
