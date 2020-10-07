import boardForm from '../forms/boardForm';

const boardView = () => {
  $('#app').html('<h2 id="boardForm">Form Goes Here</h2>');
  boardForm.addBoardForm();
};

export default { boardView };
