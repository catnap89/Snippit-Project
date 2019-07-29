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
        var snippitTitle = $("#snippitName").val();
        console.log(type)
        if (code != '' && snippitTitle != '') {

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

        }

    });

    // saveSnippit function
    function saveSnippit() {
        // Declare variables
        var editKey = ''; // variable to store reference key to firebase for editing correspond data
        var snippit = editor.getValue("\n"); // grab value of the codemirror textarea 
        var name = $('#snippitName').val().trim();
        var codeType = $('#langOption').find(":selected").attr("data-language");
        var snippitTitle = $("#snippitName").val();

        // Using conditional statement to prevent data to be pushed to the database when there is no codes writeen in the textaera.
        if (snippit != '' && snippitTitle != '') {
            // Clear CodeMirror input field (Not sure if this is needed since we haven't used codemirror yet. When new modal is opened, is the input field going to be cleared automatically?)
            editor.setValue("");
            $("#snippitName").val('');

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
        let snippitContainer = $("#snippit-container"); 
        let snippit = data.val();
        console.log("snippit: " + snippit);
        var editKey = data.key;

        if(userID !== null && snippit.userID === userID){
            snippitContainer.prepend(`
            <div class="col-sm-12 col-md-6 mt-3 snippets ${editKey}" data-key="${editKey}">
                <div class="card snippit" data-type=${snippit.type}>
                    <div class="card-header nav">
                        <h5 class="card-title d-inline-block mr-auto">${snippit.name}</h5>
                        <button class="delete btn pull-right" data-editkey="${editKey}"><i class="fas fa-trash"></i></button>
                    </div>
                        
                    <div class="card-body">
                        <p class="card-text">
                            <textarea disabled class="code-text codemirror-cursor">${snippit.snippit}</textarea>
                        </p>
                    </div>

                    <div class="card-footer">
                        <button id="heart-empty" class="btn btn-dark heartEmpty" data-id="${editKey}" data-title="${snippit.name}">
                            <span class="far fa-heart"></span> Add As Favorite Snippit
                        </button>
                        <button id="heart-filled" class="btn btn-dark heartfilled" data-id="${editKey}" data-title="${snippit.name}">
                            <span class="fas fa-heart"></span> Remove from Favorite
                        </button>
                    </div>
                </div>
            </div>
            `);
        }
        highlightSnippets(editKey);
    });

    // when data changes (deleted), this will update the cards, without the on child_changed function, cards gets removed upon clicking removed button but was displayed again
    // database.ref("/snippits").on('child_changed', function(data) {
    //     // get the current snippits info
    //     data.val();
    //     let snippitContainer = $(".snippit-container"); 
    //     let snippit = data.val();
    //     var editKey = data.key;
    //     // data.forEach(function(childSnapshot) {
    //     //     var editKey = childSnapshot.key;
    //     // })
    //     if(userID !== null && snippit.userID === userID){
    //         snippitContainer.html(`
    //         <div class="col-sm-12 col-md-6 mt-3 snippets ${editKey}">
    //             <div class="card snippit" data-type=${snippit.type}>
    //                 <div class="card-btn-header">
    //                     <h5 class="card-header">${snippit.name}</h5>
    //                     <button class='delete btn' data-editkey="${editKey}"><i class="fas fa-trash"></i></button>
    //                 </div>
    //                 <div class="card-body">
    //                     <p class="card-text">
    //                         <textarea disabled class="code-text">${snippit.snippit}</textarea>
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //         `);
    //     }

    // });

    // Remove Snippit card and the data from the database
    $(document).on('click', '.delete', function() {
      var editKey = $(this).attr('data-editkey');
      database.ref('snippits/' + editKey).remove();
      $('.' + editKey).remove();

    })
    
    // Favorite Button on click
    $(document).on('click', '#heart-empty', function() {
        $('#heart-empty').hide();
        $('#heart-filled').show();
        
        // Declare variables
        var editKey = ''; // variable to store reference key to firebase for editing correspond data
        var favoriteID = $(this).attr("data-id"); //editKey of the snippit child
        console.log(favoriteID);
        var favoriteName = $(this).attr("data-title"); // snippit title       

        // Push to firebase
        if (editKey == '') { // If there is no editKey value
            database.ref().child('favorites').push({ // push the variables to the database in a child named 'snippits'
                favoriteID: favoriteID,
                favoriteName: favoriteName,
                userID: userID,
            })
        } else if (editKey !== '') { // If there is editKey value --- THIS WILL BE USED FOR UPDATING EXISTING DATA. IF WE LET USERS TO CHANGE, MODIFY, ETC PREVIOUSLY SAVED SNIPPIT
            database.ref('favorites/' + editKey).update({ // Locate database with provided editKey value as it's unique key in 'snippits' path and update database
                favoriteID: favoriteID,
                favoriteName: favoriteName,
                userID: userID,
            })
            editKey = ''; // Empty the editKey value once else if conditional is met and database is updated
        } 
 
    })
    //
    var editKey = '';
    firebase.database().ref("/favorites").on("child_added", function(data) {
        // get the current favoritebutton info
        data.val();
        let favContainer = $(".button-container"); 
        let navID = data.val();
        console.log("navID: " + navID);
        let favName = navID.favoriteName;
        console.log("favName: " + favName);
        let favID = navID.favoriteID;
        console.log("favID: " + favID);
        editKey = data.key;
        console.log("favorite editkey: " + editKey)

        database.ref('favorites/' + editKey).update({
            
        })

       if(userID !== null && navID.userID === userID){
        favContainer.append(`
        <button class="btn btn-dark favorite-btn ${editKey}" data-editkey="${editKey}" data-id="${favID}">${favName}</button>
        `);
        }
       
    });

    $(document).on('click', '#heart-filled', function(data) {
        $('#heart-empty').show();
        $('#heart-filled').hide();

        // var editKey = data.key
        console.log("HF ek: " + editKey);

        database.ref('favorites/' + editKey).remove();
        $('.' + editKey).remove();
        
    })

    database.ref("/favorites").on('child_changed', function(data) {
        // get the current snippits info
        data.val();
        let favContainer = $(".button-container"); 
        let navID = data.val();
        console.log("navID: " + navID);
        let favName = navID.favoriteName;
        console.log("favName: " + favName);
        let favID = navID.favoriteID;
        console.log("favID: " + favID);
        editKey = data.key;
        console.log("favorite editkey: " + editKey)

        database.ref('favorites/' + editKey).update({
            
        })

       if(userID !== null && navID.userID === userID){
        favContainer.html(`
        <button class="btn btn-dark favorite-btn" data-editkey="${editKey}" data-id="${favID}">${favName}</button>
        `);
        }

    });


    // Push Favorites Data to the DB
    // $('#fav-save-btn').on('click', function () {
    //     var favName = $('#favoriteName').val().trim();
    //     var editKey = '';
    //     console.log(favName);
    //     console.log(editKey);
        
    //     if (favName !='') {
    //         $('#favoriteName').val('');
    //         if (editKey == '') {
    //         database.ref().child('favorites').push({
    //             favName: favName,
    //             userID: userID,
    //         }),
    //         $('#fav-modal-div').modal('hide');
    //         } else if (editKey !== '') {
    //         database.ref('favorites/' + editKey).update({
    //             favName: favName,
    //             userID: userID,
    //         }),
    //         $('#fav-modal-div').modal('hide');
    //         editKey = '';
    //         }
    //     }

    // })

    // firebase.database().ref("/favorites").on("child_added", function(data) {
    //     // get the current snippits info
    //     data.val();
    //     let navContainer = $(".v-nav"); 
    //     let navID = data.val();
    //     let editKey = data.key;
    //     let favName = navID.favName;
    //     // data.forEach(function(childSnapshot) {
    //     //     var editKey = childSnapshot.key;
    //     // })
    //     if(userID !== null && navID.userID === userID){
    //         navContainer.append(`
    //         <li class="nav-item ${editKey}">
    //             <a class="nav-link" href="#">${favName}</a>
    //         </li>
    //         `);
    //     }
    // });
})  

function highlightSnippets(key){
    let snippit = $(`.snippets[data-key="${key}"]`);
    if(snippit.length > 0){
        let type = snippit.find(".snippit").attr("data-type");
        CodeMirror.fromTextArea(snippit.find(".code-text")[0], {
            mode: type,			// sets syntax mode
            theme: 'cobalt',
            readOnly: true,
        })
    }
}