$(document).ready(function() {
 "use strict"

//Add jQuery code that will change the background color of an h1 element when clicked.
 $('#btn1').click(function() {
  $('#oneH1').toggleClass('h1Background');
 });

 //Make all paragraphs have a font size of 18px when they are double clicked.
 $('p').dblclick(function() {
  $(this).toggleClass('font18');//(this) allows individual selection vs ('p') choosing all
 });
 //Set all li text color to red when the mouse is hovering; reset to black when it is not.
 $('li').hover(function() {
  $(this).addClass('liTextHover');
 }, function() {
  $(this).removeClass('liTextHover');
 });



//Closing braces for ready listener
});


