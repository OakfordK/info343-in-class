/**
 * app.js
 * main application script
 */
"use strict";

var video = document.querySelector("video");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var mouseIsDown = false;

var filterSel = document.querySelector("#filter-select");

function evtToCanvas(evt) {
   return {
      x: evt.clientX - canvas.offsetLeft + window.scrollX,
      y: evt.clientY - canvas.offsetTop + window.scrollY
   }
}

// If either of these is true, we can use webcam
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   // Get what you want with following method
   // Returns a promise
   navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
         video.src = window.URL.createObjectURL(stream);

         video.addEventListener("click", function() {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0);
         });

         filterSel.addEventListener("change", function() {
            var filterName = filterSel.options.item
                              (filterSel.selectedIndex).value;
            canvas.className = filterName;
         });

         // canvas.addEventListener("click", function() {
         //    console.log(canvas.toDataURL());
         // });

         canvas.addEventListener("mousedown", function(evt) {
            mouseIsDown = true;
            ctx.beginPath();
            ctx.strokeStyle = '#FF0';
            var coord = evtToCanvas(evt);
            ctx.moveTo(coords.x, coords.y);
         });

         canvas.addEventListener("mousemove", function(evt) {
            if(mouseIsDown) {
               var coords = evtToCanvas(evt);

               ctx.lineTo(coords.x, coords.y);
               ctx.stroke();
            }
         });

         canvas.addEventListener("mouseup", function(evt) {
            mouseIsDown = false;
         });
      })
      .catch(function(err) {
         console.err(err);
         alert(err.message);
      });


} else {
   alert("Browser incompatible.")
}