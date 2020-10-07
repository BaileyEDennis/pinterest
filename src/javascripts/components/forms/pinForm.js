// import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

const addPinForm = (user) => {
  $('#pinForm').html(`<h1>Create A Pin!</h1>
    <div id="user-message"></div>
    <form>
      <div id="errorMsg"></div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="e.x: New Sewing Machine, article title, etc.">
      </div>
      <div class="form-group>
        <label for="image">Image</label>
        <input type="text" class="form-control" id="picture" placeholder="Image Url">
      </div>
      <div class="form-group>
        <label for="url">Website Address</label>
        <input type="text" class="form-control" id="site" placeholder="https://wikipedia.com">
      </div>
      <div class="form-group>
        <label for="user">What board does it belong to?</label>
          <select class="form-control" id="board">
            <option value="">Select</option>
          </select>
      </div>
      <button id="addPinButton" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add It!</button>
</form>
    `);
  boardData.getBoards(user).then((response) => {
    response.forEach((resp) => {
      $('select').append(`<option value="${resp.uid}">${resp.name}</option>`);
    });
  });
  $('#addPinButton').on('click', (e) => {
    e.preventDefault();
    const information = {
      name: $('#name').val() || false,
      image: $('#picture').val() || false,
      url: $('#site').val() || false,
      boardUid: $('#board').val() || false,
    };
    if (Object.values(information).includes(false)) {
      $('#user-message').html(
        '<div class="alert alert-danger" role="alert">Please fill out form completely!</div>'
      );
    } else {
      $('#user-message').html('');
      pinData
        .addPin(information)
        .then(() => {
          $('#user-message').html(
            '<div class="alert alert-success" role="alert">Pin Added!</div>'
          );
        })
        .catch((error) => console.warn(error));
      setTimeout(() => {
        $('#user-message').html('');
      }, 2000);
      $('#name').val('');
      $('#picture').val('');
      $('#site').val('');
      $('#board').val('');
    }
  });
};

export default { addPinForm };
