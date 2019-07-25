// This file handles the main aspects of the application

$(document).ready(function() {

    // MODAL
    // on click #main-add-btn, display modal
    $('#main-add-btn').on('shown.bs.modal', function () {
        $('#main-modal-div').trigger('focus')
    })

    // Make Dropdown to choose the favorite folder to save the snippit

    // On click Save Snippit button (#modal-save-btn), push the snippit into firebase database and dynamically generate card with the code snippit.
    $('#modal-save-btn').on('click', saveSnippit);

    // codemirror

    var code = $('.codemirror-textarea')[0];
    // Declaring editor variable and settings (lineNubers, lineWrapping..etc) to pass from CodeMirror.fromTextArea function code variable.
    var editor = CodeMirror.fromTextArea(code, {
   
        lineNumbers: true,
        lineWrapping : true,
        

    })

    // saveSnippit function
    function saveSnippit() {
        // Declare variables
        var editKey = ''; // variable to store reference key to firebase for editing correspond data
        var codeMirrorVal = $('#codeMirror-input').val().trim(); // grab input value
        var snippit; // maybe this can be used somehow
        var userId; // maybe this can be used somehow

        // Using conditional statement to prevent data to be pushed to the database when not every form is filled
        if (codeMirrorVal != '') {
            // Clear CodeMirror input field (Not sure if this is needed since we haven't used codemirror yet. When new modal is opened, is the input field going to be cleared automatically?)
            $('#codeMirror-input').val('');

            // Push to firebase
            if (editKey == '') { // If there is no editKey value
            // NEED TO KNOW THE DATABASE STRUCTURE WE WILL USE. LIKE IF WE WILL MAKE CHILD FOR EACH USER?
                database.ref().child('snippits').push({ // push the variables to the database in a child named 'snippits'
                snippit: codeMirrorVal,
                userId: userId,
                })
            } else if (editKey !== '') { // If there is editKey value --- THIS WILL BE USED FOR UPDATING EXISTING DATA. IF WE LET USERS TO CHANGE, MODIFY, ETC PREVIOUSLY SAVED SNIPPIT
                database.ref('snippits/' + editKey).update({ // Locate database with provided editKey value as it's unique key in 'snippits' path and update database
                snippit: codeMirrorVal,
                userId: userId,       
                })
                editKey = ''; // Empty the editKey value once else if conditional is met and database is updated
            } 
        }

    }


})



/*
<!-- Button trigger modal-->
<button type="button" class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#main-modal-div" id="main-add-btn">Create Snippit</button>
//
<div class="modal" tabindex="-1" role="dialog" id="main-modal-div">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Snippit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                    id="model-cancel-btn">Cancel</button>
                <button type="button" class="btn btn-primary" id="modal-save-btn">Save</button>
            </div>
        </div>
    </div>
</div>
==============

<div class="card bg-light mb-3" style="width: 50rem;">
    <div class="card-header">Header</div>
    <div class="card-body">
        <h5 class="card-title">Light card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
            card's content.</p>
    </div>
</div>


*/