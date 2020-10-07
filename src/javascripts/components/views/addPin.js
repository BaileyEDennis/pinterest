import pinForm from '../forms/pinForm';

const pinFormView = (user) => {
  $('#app').html('<h2 id="pinForm">Form Goes Here</h2>');
  pinForm.addPinForm(user);
};

export default { pinFormView };
