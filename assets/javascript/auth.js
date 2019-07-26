/* 

    This file handles the authentication with firebase

*/

var userID = null;


$(document).ready(function () {
    const uiConfig = {
        signInSuccessUrl: '/',
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
            $("#main-logout-btn").show()
        }else{
            $("#firebaseui-auth-container").show();
            $("#main-logout-btn").hide();
            $(".snippets").remove();
        }
    })

    $("#main-logout-btn").on("click", (e) => {
        e.preventDefault();
        firebase.auth().signOut();
      });
})