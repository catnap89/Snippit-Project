# Snippit

A web page that allows users to quickly add and reference code snippits. 

## Built with

- JQuery
- Firebase
- Bootstrap
- Code Mirror
- Font Awesome
- Codepen
- Github

## APIs used

- Codepen
- Code Mirror

## Authors

- Abby
- Daniel
- Steven
- Zac

## Layout and Innerworkings

  - When Webpage is loaded
    * Log in button
  
  - When Log in Button is clicked, the followings will be displayed
      * Favorite navigation bar (wip)
      * Create Snippet button
      * Log out button
  
  - When Create Snippet button is clicked
    * Show model
      * Modal will have a textbox (codemirror) / Close Button / Save Snippit / Test Snippit / Favorite Snippit (wip)

  - When Close Button is clicked
    * The current snippit being made is removed and closed

  - When Test Snippit is clicked
    * The code is pulled into Codepen to be tested

  - When Save Snippit is clicked
    * Save the code in the firebase database
    * Save the user id in the firebase database
    * Save code type in the database
    * Use the data saved in the database to display card that contains code snippet
    * By clicking the save Snippit button, the user will have their Snippit saved to the page
    
  - Code snippet cards have
    * Code saved
    * Remove button

  - Favorite Navigation bar (wip)
    * Saved snippets will have specific names
    * Clicking on the name will pull up the "favorite" snippit



## Acknowledgments

