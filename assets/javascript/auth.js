
// This file handles the authentication with firebase


var userID = null;


$(document).ready(function () {
    const uiConfig = {
        signInSuccessUrl: `${window.location.pathname}`,
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
        signInFlow: 'popup',
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
    

    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            userID = user.uid;
            $("#firebaseui-auth-container").hide();
            $("#main-logout-btn").show();
            $("#main-add-btn").show();
            $("#intro").hide();
            $(".vertical-navbar").addClass("d-md-block");
            $("#float-btn").show();
            setUserInfo(user.photoURL, user.displayName);
        }else{
            userID = null;
            $("#main-logout-btn").hide();
            $("#main-add-btn").hide();
            $(".snippets").remove(); 
            $("#firebaseui-auth-container").show();
            $("#intro").show();
            $(".vertical-navbar").removeClass("d-md-block");
            $("#float-btn").hide();
            removeUserInfo()
        }
    });

    $("#main-logout-btn").on("click", (e) => {
        e.preventDefault();
        firebase.auth().signOut();
      });
})


function setUserInfo(image, name){
    $("#user-container").append(`
        <img id="user-image" src="${image}"/>
        <h4 id="user-name">${name}</h4>
    `)
}

function removeUserInfo(){
    $("#user-container").empty();
}

