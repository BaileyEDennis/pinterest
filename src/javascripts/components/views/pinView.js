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
        <button id="updatep${obj.uid}" class="btn btn-warning update-pin">Update This Pin</button>
        <button id="removep${obj.uid}" class="btn btn-danger remove-pin">Remove This Pin</button>
        <a href="gop${obj.url}" class="pinterest-link">Go To Site</a>
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

const showAllPins = () => {
  $('body').on('click', '.pinterest-link', (e) => {
    e.stopImmediatePropagation();
    $('#app').html('');
    pins.getPinsOnBoards(e.currentTarget.id).then((response) => {
      const pin = response;
      const allPins = [];
      Object.keys(pin).forEach((item) => {
        allPins.push(pin[item]);
      });
    });
  });
};

export default { pinView, showAllPins };
