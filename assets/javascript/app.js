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

    // On click Test Snippit button (#model-test-btn), which pulls up test in code mirror for use.
    $('#modal-test-btn').on('click') //testSnippit);


    // saveSnippit function
    function saveSnippit() {
        // Declare variables
        var editKey = ''; // variable to store reference key to firebase for editing correspond data
        var textarea = $('.Codemirror-Code');
        var snippit = editor.getValue("\n"); // grab value of the codemirror textarea 
        console.log("Snippit: " + snippit);
        var name = $('#snippitName').val().trim();
        var codeType = $('#langOption').find(":selected").attr("data-language");
        console.log("codetype: " + codeType);

        // Using conditional statement to prevent data to be pushed to the database when there is no codes writeen in the textaera.
        if (snippit != '') {
            // Clear CodeMirror input field (Not sure if this is needed since we haven't used codemirror yet. When new modal is opened, is the input field going to be cleared automatically?)
            editor.setValue("");

            // Push to firebase
            if (editKey == '') { // If there is no editKey value
                database.ref().child('snippits').push({ // push the variables to the database in a child named 'snippits'
                snippit: snippit,
                userID: userID, // using global variable userID from auth.js
                name: name,
                type: codeType,
                })
            } else if (editKey !== '') { // If there is editKey value --- THIS WILL BE USED FOR UPDATING EXISTING DATA. IF WE LET USERS TO CHANGE, MODIFY, ETC PREVIOUSLY SAVED SNIPPIT
                database.ref('snippits/' + editKey).update({ // Locate database with provided editKey value as it's unique key in 'snippits' path and update database
                snippit: snippit,
                userID: userID, // using global variable userID from auth.js
                name: name,
                type: codeType,
                })
                editKey = ''; // Empty the editKey value once else if conditional is met and database is updated
            } 
        }

    }


    firebase.database().ref("/snippits").on("child_added", function(data) {
        // get the current snippits info
        data.val();
        let mainContainer = $(".main-content-container"); 
        let snippit = data.val();
        if(userID !== null && snippit.userID === userID){
            mainContainer.prepend(`
            <div class="col-sm-12 col-md-6 mt-3 snippets">
                <div class="card snippit" data-type=${snippit.type}>
                        <h5 class="card-header">${snippit.name}</h5>
                        <div class="card-body">
                            <p class="card-text">
                                <textarea disabled class="code-text">${snippit.snippit}</textarea>
                            </p>
                    </div>
                </div>
            </div>
            `);
        }
    });

    function testSnippit () {
        //Pull up testing code from Code Mirror for current used Snippit

    }
})

