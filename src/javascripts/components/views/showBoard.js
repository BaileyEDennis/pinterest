import boardData from '../../helpers/data/boardData';
import board from '../cards/boardCard';

const showBoards = (user) => {
  $('#app').html('');
  boardData.getBoards(user).then((response) => {
    if (response.length) {
      response.forEach((item) => {
        $('#app').append(board.buildBoards(item));
      });
    } else {
      $('#app').append('<h1>No Boards</h1>');
    }
  });
};

export default { showBoards };
