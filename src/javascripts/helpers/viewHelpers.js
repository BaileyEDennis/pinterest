import addBoard from '../components/views/addBoard';
import showBoards from '../components/views/showBoard';
import addPin from '../components/views/addPin';

const viewHelper = (id, user) => {
  switch (id) {
    case 'boards-link':
      return showBoards.showBoards(user);
    case 'add-board-link':
      return addBoard.boardView();
    case 'add-pin-link':
      return addPin.pinFormView(user);
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view, user) => {
  viewHelper(view, user);
  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id, user);
  });
};

export default { viewListener };
