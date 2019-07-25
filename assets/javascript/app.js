// This file handles the main aspects of the application

$(document).ready(function() {

    var database = firebase.database();

    // MODAL
    // on click #main-add-btn, display modal
    $('#main-add-btn').on('shown.bs.modal', function () {
        $('#main-modal-div').trigger('focus')
    })

    // Make Dropdown to choose the favorite folder to save the snippit

    // On click Save Snippit button (#modal-save-btn), push the snippit into firebase database and dynamically generate card with the code snippit.
    $('#modal-save-btn').on('click', saveSnippit);


    // saveSnippit function
    function saveSnippit() {
        // Declare variables
        var editKey = ''; // variable to store reference key to firebase for editing correspond data
        var textarea = $('.Codemirror-Code');
        var snippit = htmlEditor.getValue("\n"); // grab value of the codemirror textarea 
        console.log("Snippit: " + snippit);
        var userId; // maybe this can be used somehow

        // Using conditional statement to prevent data to be pushed to the database when there is no codes writeen in the textaera.
        if (snippit != '') {
            // Clear CodeMirror input field (Not sure if this is needed since we haven't used codemirror yet. When new modal is opened, is the input field going to be cleared automatically?)
            htmlEditor.setValue("");

            // Push to firebase
            if (editKey == '') { // If there is no editKey value
            // NEED TO KNOW THE DATABASE STRUCTURE WE WILL USE. LIKE IF WE WILL MAKE CHILD FOR EACH USER?
                database.ref().child('snippits').push({ // push the variables to the database in a child named 'snippits'
                snippit: snippit,
                // userId: userId,
                })
            } else if (editKey !== '') { // If there is editKey value --- THIS WILL BE USED FOR UPDATING EXISTING DATA. IF WE LET USERS TO CHANGE, MODIFY, ETC PREVIOUSLY SAVED SNIPPIT
                database.ref('snippits/' + editKey).update({ // Locate database with provided editKey value as it's unique key in 'snippits' path and update database
                snippit: snippit,
                // userId: userId,       
                })
                editKey = ''; // Empty the editKey value once else if conditional is met and database is updated
            } 
        }

    }


})

