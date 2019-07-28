


// $(document).ready(function() {

 
//   var database = firebase.database();

//   $('#fav-add-btn').on('shown.bs.modal', function () {
//       $('#fav-modal-div').modal('show');
//   })

 
//   // Make Dropdown to choose the favorite folder to save the snippit

//   // On click Save Snippit button (#modal-save-btn), push the snippit into firebase database and dynamically generate card with the code snippit.
//   $('#fav-save-btn').on('click', saveFavorite);


//   // saveSnippit function
//   function saveFavorite() {
//       // Declare variables
//       var editKey = ''; // variable to store reference key to firebase for editing correspond data
//       var favName = $('#favoriteName').val().trim();
//       console.log(favName);

//       // Using conditional statement to prevent data to be pushed to the database when there is no codes writeen in the textaera.
//       if (favName != '') {
//           // Clear CodeMirror input field (Not sure if this is needed since we haven't used codemirror yet. When new modal is opened, is the input field going to be cleared automatically?)
//           $('#favoriteName').val('');

//           // Push to firebase
//           if (editKey == '') { // If there is no editKey value
//               database.ref().child('favorites').push({ // push the variables to the database in a child named 'snippits'
//               favName: favName,
//               userID: userID, // using global variable userID from auth.js
//               }),
//               $('#fav-modal-div').modal('hide');
//           } else if (editKey !== '') { // If there is editKey value --- THIS WILL BE USED FOR UPDATING EXISTING DATA. IF WE LET USERS TO CHANGE, MODIFY, ETC PREVIOUSLY SAVED SNIPPIT
//               database.ref('favorites/' + editKey).update({ // Locate database with provided editKey value as it's unique key in 'snippits' path and update database
//               favName: favName,
//               userID: userID, // using global variable userID from auth.js
//               }),
//               $('#fav-modal-div').modal('hide');
//               editKey = ''; // Empty the editKey value once else if conditional is met and database is updated
//           } 
//       }

//   }





// // 





// })
