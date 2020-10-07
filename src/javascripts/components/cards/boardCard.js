import pins from '../views/pinView';
import deleteBoard from '../../helpers/data/boardData';

const buildBoards = (board) => {
  const domString = `<div class="card mb-3" id="${board.uid}" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${board.image}" class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${board.name}</h5>
        <div class="button-group">
          <a href="#" class="btn btn-info see-associated-pins" id="show${board.uid}">Pins</a>
          <button class="btn btn-warning update-board" id="update${board.uid}">Update This Board</button>
          <button class="btn btn-danger remove-board" id="remove${board.uid}">Remove This Board</button>
        </div>
      </div>
    </div>
  </div>
</div>`;

  $('body').on('click', '.remove-board', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`#remove${firebaseKey}`).remove();
    deleteBoard.deleteBoard(firebaseKey);
  });

  pins.showAllPins();
  return domString;
};

export default { buildBoards };
