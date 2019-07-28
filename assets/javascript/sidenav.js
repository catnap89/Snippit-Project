var database = firebase.database();

$('#fav-add-btn').on('shown.bs.modal', function () {
    $('#fav-modal-div').trigger('focus')
})

$('#fav-save-btn').on('click', function () {
  var favName = $('#nameFav').val().trim();
  var editKey = '';
  
  if (favName !='') {
    favName = '';
    if (editKey =='') {
      database.ref().child('favorites').push({
        favName: favName,
        userID: userID,
      }),
      $('#fav-modal-div').modal('hide');
    } else if (editKey !=='') {
      database.ref('favorites/' + editKey).update({
        favName: favName,
        userID: userID,
      }),
      $('#fav-modal-div').modal('hide');
      editKey = '';
    }
  }

})


