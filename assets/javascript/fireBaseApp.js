/* 

    This file handles seting up the fire base application

*/

$(document).ready(function () {

    // Todo fill out info
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBVyjIxp0Q8qMwRcgE3JtSshdpX0bPP3JQ",
        authDomain: "snippit-8f9be.firebaseapp.com",
        databaseURL: "https://snippit-8f9be.firebaseio.com",
        projectId: "snippit-8f9be",
        storageBucket: "",
        messagingSenderId: "948130174171",
        appId: "1:948130174171:web:aab1ef37d6e9560e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // this script will have come first in the scripts on index html
    // then it should be accesible in any js script that uses firebase

    // create a new database object
    const database = firebase.database();


    /*
        // set up the listener for when snippets are changed
        // we may not need this...

        database.ref("/snippits").on("child_added", function(data) {
            // get the current snippits info
            data.val(); 
    
        }

        firebase.database().ref("/snippits").push(
            // a snippit object not sure what we should include in here
            {
                code: "", // the code itself
                type: "", // type of code?
                owner: "", // user id
            }
        )

    */
});