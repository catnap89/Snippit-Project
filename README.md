# Snippit

:bookmark_tabs: A web page that allows users to quickly add and reference code snippits. 

## Built with

- JQuery
- Firebase
- Bootstrap
- etc...

## APIs used

## Authors

- Abby
- Daniel
- Steven
- Zac

## Psuedo Coding

  - When Webpage is loaded.
    * Log in button
  
  - When Log in Button is clicked
    * The followings will be displayed
      * Favorite navigation bar(if a snippet is saved as snippet before)
      * Create Snippet button
      * Log out button
      * Create directory button
        * Clicking create directory button will create favorite folder in the favorite navbar
  
  - When Create Snippet button is clicked
    * Show modal
      * Modal will have textbox (codemirror) / close button / save button 
  
  - When the code inputted in the modal is saved
    * save the code in the firebase database
    * save the user id in the firebase database
    * save code type in the database
      * Use the data saved in the database to display card that contains code snippet
    * Clicking save button will let user to choose favorite folder the snippet will be saved and save it there
    
  - Code snippet cards have
    * Remove button
    * Move to different favorite folder

  - Favorite Navigation bar
    * Saved snippets will have specific tags 
    * Clicking on the tags in the favorite navigation bar will display snippet cards containing the tag.

  




## Acknowledgments

