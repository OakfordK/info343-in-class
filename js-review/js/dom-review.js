/**
 * DOM review
 */

"use strict";

/**
 * The Document Object Model (DOM) is a set of global 
 * objects and methods that the browser exposes to our 
 * scripts, so that we can respond to events and
 * manipulate the tree of elements created by our HTML.
 *
 * The `document` object is one of those globals added
 * by the browser, and we can use it to get a reference 
 * to any element in the page. You can use the
 * `document.getElementById()` method to get an element
 * that has a particular `id` attribute, and you can
 * use `document.querySelector()` to get the first element 
 * that matches a given CSS selector. If you want all
 * the elements that match a CSS selector, use the
 * `document.querySelectorAll()` method. 
 */

//get a reference to the "Click Me!" button, which has a
//style class on it named `btn-click-me`
//just as in CSS, the selector would be `.btn-click-me`
var clickMeButton = document.querySelector(".btn-click-me");

//once you have a reference to an element, you can ask
//the browser to call a function whenever that element
//raises a particular event. If the user clicks an
//element, that element will raise its "click" event
clickMeButton.addEventListener("click", function() {
    //this function will be called every time
    //the user clicks the button
    alert("You clicked me!");
});

