import pins from '../../helpers/data/pinData';

const pinView = (obj) => {
  const domString = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${obj.image}" class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${obj.name}</h5>
        <button class="btn btn-warning update-pin">Update This Pin</button>
        <button class="btn btn-danger remove-pin">Remove This Pin</button>
        <a href="#" class="pinterest-link">Go To Site</a>
      </div>
    </div>
  </div>
</div>`;

  $('body').on('click', 'remove-pin', (e) => {
    const firebasekey = e.currentTarget.id;
    $(`.card${firebasekey}`).remove();
    pins.deletePin(firebasekey);
  });
  return domString;
};

const showAllPins = (firebaseKey) => {
  $('#app').html('');
  pins.getPinsOnBoards(firebaseKey).then((response) => {
    const pin = response;
    const allPins = [];
    Object.keys(pin).forEach((item) => {
      allPins.push(pin[item]);
    });
    allPins.forEach((item) => {
      $('#app').append(pinView(item));
    });
  });
};

export default { pinView, showAllPins };
