import pinData from '../../helpers/data/pinData';
import form from '../forms/updatePinForm';

const updatePin = (user, pinUid) => {
  $('#app').html('<div class="pinForm" id="update-pin"></div>');
  pinData.getSinglePin(pinUid).then((response) => {
    form.updatePinForm(response, user);
  });
};

export default { updatePin };
