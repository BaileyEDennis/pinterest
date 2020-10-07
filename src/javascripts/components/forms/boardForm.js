import userData from '../../helpers/data/userData';
import boardData from '../../helpers/data/boardData';

const addBoardForm = () => {
  $('#boardForm').html(`<h1>Create A Board!</h1>
    <div id="user-message"></div>
    <form>
      <div id="errorMsg"></div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="e.x: Cooking, Sewing, etc!">
      </div>
      <div class="form-group>
        <label for="image">Image</label>
        <input type="text" class="form-control" id="picture" placeholder="Image Url">
      </div>
      <div class="form-group>
        <label for="user">User</label>
          <select class="form-control" id="user">
            <option value="">Who's Board?</option>
          </select>
      </div>
      <button id="addBoardButton" type="submit" class="btn btn-info">><i class="fas fa-plus-circle"></i>Add It!</button>
</form>
    `);
  userData.getAllUsers().then((response) => {
    response.forEach((item) => {
      $('select').append(`<option value="${item.uid}">${item.name}</select>`);
    });
  });
  $('#addBoardButton').on('click', (e) => {
    e.preventDefault();

    const userInfo = {
      name: $('#name').val() || false,
      image: $('#image').val() || false,
      useruid: $('#user').val() || false,
    };

    if (Object.values(userInfo).includes(false)) {
      $('#errorMsg').html('<div class="alert alert-danger" role="alert">All Fields Must Have Values!</div>');
    } else {
      $('errorMsg').html('');
      boardData
        .addBoard(userInfo)
        .then(() => {
          $('#user-message').html('<div class="alert alert-success" role="alert">Board Added!</div>');
        })
        .catch((error) => console.warn(error));
      setTimeout(() => {
        $('#user-message').html('');
      }, 2000);
      $('#name').val('');
      $('#image').val('');
      $('#user').val('');
    }
  });
};

export default { addBoardForm };
