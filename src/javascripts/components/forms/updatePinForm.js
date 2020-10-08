// import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

const updatePinForm = (obj, user) => {
  $('#update-pin').html(`<h1>Update Pin!</h1>
    <div id="user-message"></div>
    <form>
      <div class="form-group>
        <label for="user">What board are we moving to?</label>
          <select class="form-control" id="board">
            <option value="">Select</option>
          </select>
      </div>
      <button type="submit" class="btn btn-info updateBtn" id="updatePinBtn"><i class="fas fa-plus-circle"></i> Update!</button>
</form>
    `);
  boardData.getBoards(user).then((response) => {
    response.forEach((resp) => {
      $('select').append(`<option value="${resp.uid}" ${obj.boardUid === resp.uid ? "selected ='selected'" : ''}>${resp.name}</option>`);
    });
  });
  $('#updatePinBtn').on('click', (e) => {
    e.preventDefault();
    const information = {
      boardUid: $('#board').val() || false,
    };
    if (Object.values(information).includes(false)) {
      $('#user-message').html(
        '<div class="alert alert-danger" role="alert">Please choose a board!</div>'
      );
    } else {
      $('#user-message').html('');
      pinData
        .updatePins(obj.uid, information)
        .then(() => {
          $('#user-message').html(
            '<div class="alert alert-success" role="alert">Pin Update to new Board!</div>'
          );
        })
        .catch((error) => console.warn(error));
      setTimeout(() => {
        $('#user-message').html('');
      }, 2000);
      $('#board').val('');
    }
  });
};

export default { updatePinForm };
