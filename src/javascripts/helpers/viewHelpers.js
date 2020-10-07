import showBoards from '../components/views/showBoard';

const viewHelper = (id, user) => {
  switch (id) {
    case 'boards-link':
      return showBoards.showBoards(user);
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
