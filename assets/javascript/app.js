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
    $('#modal-test-btn').on('click', function(e){
        e.preventDefault();
        let type = $('#langOption').find(":selected").attr("data-language");
        let data = {}
        let code = editor.getValue("\n");
        console.log(type)
        if(type === 'htmlmixed'){
            data = {
                html: code,
            }
        }else if(type ==='css'){
            data = {
                css: code,
            }
        }else if(type === 'javascript'){
            data = {
                js: code
            }
        }
        data.title = $('#snippitName').val().trim();
        console.log(data)
        $("#modal-test-code").val(JSON.stringify(data));
        $("#modal-test-form").submit();

    });

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
                }),
                $('#main-modal-div').modal('hide');
            } else if (editKey !== '') { // If there is editKey value --- THIS WILL BE USED FOR UPDATING EXISTING DATA. IF WE LET USERS TO CHANGE, MODIFY, ETC PREVIOUSLY SAVED SNIPPIT
                database.ref('snippits/' + editKey).update({ // Locate database with provided editKey value as it's unique key in 'snippits' path and update database
                snippit: snippit,
                userID: userID, // using global variable userID from auth.js
                name: name,
                type: codeType,
                }),
                $('#main-modal-div').modal('hide');
                editKey = ''; // Empty the editKey value once else if conditional is met and database is updated
            } 
        }

    }


    firebase.database().ref("/snippits").on("child_added", function(data) {
        // get the current snippits info
        data.val();
        let mainContainer = $(".main-content-container"); 
        let snippit = data.val();
        var editKey = data.key;
        console.log("editkey: " + editKey);
        // data.forEach(function(childSnapshot) {
        //     var editKey = childSnapshot.key;
        //     console.log("editKey: " + editKey);
        // })
        if(userID !== null && snippit.userID === userID){
            mainContainer.prepend(`
            <div class="col-sm-12 col-md-6 mt-3 snippets ${editKey}">
                <div class="card snippit" data-type=${snippit.type}>
                    <div class="card-header nav">
                        <h5 class="card-title d-inline-block mr-auto">${snippit.name}</h5>
                        <button class="delete btn pull-right" data-editkey="${editKey}"><i class="fas fa-trash"></i></button>
                    </div>
                        
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

    // when data changes (deleted), this will update the cards, without the on child_changed function, cards gets removed upon clicking removed button but was displayed again
    database.ref("/snippits").on('child_changed', function(data) {
        // get the current snippits info
        data.val();
        let mainContainer = $(".main-content-container"); 
        let snippit = data.val();
        var editKey = data.key;
        console.log("editkey: " + editKey);
        // data.forEach(function(childSnapshot) {
        //     var editKey = childSnapshot.key;
        //     console.log("editKey: " + editKey);
        // })
        if(userID !== null && snippit.userID === userID){
            mainContainer.html(`
            <div class="col-sm-12 col-md-6 mt-3 snippets ${editKey}">
                <div class="card snippit" data-type=${snippit.type}>
                    <div class="card-btn-header">
                        <h5 class="card-header">${snippit.name}</h5>
                        <button class='delete btn' data-editkey="${editKey}"><i class="fas fa-trash"></i></button>
                    </div>
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

    // Remove Snippit card and the data from the database
    $(document).on('click', '.delete', function() {
      var editKey = $(this).attr('data-editkey');
      database.ref('snippits/' + editKey).remove();
      $('.' + editKey).remove();

    })

    function testSnippit () {
        //Pull up testing code from Code Mirror for current used Snippit

    }
})

