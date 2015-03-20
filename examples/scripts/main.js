(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var App = require('./app.js');

var app = new App();

app.beep();
},{"./app.js":2}],2:[function(require,module,exports){
/**
 * scripts/app.js
 *
 * This is a sample CommonJS module.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var Spritepack = require('spritepack.js');

function App() {
  console.log('app initialized');

  var sp = new Spritepack();
  sp.load('images.pack', 'images.json');

  sp.onLoadComplete = function() {

    document.getElementById("i1").src = sp.getURI('forkit.gif');
    document.getElementById("i2").src = sp.getURI('mario.jpg');
    document.getElementById("i3").src = sp.getURI('Smile.png');
    document.getElementById("container").style.backgroundImage = 'url(' + sp.getURI('packman_ghost.gif') + ')';

  }


}

module.exports = App;

App.prototype.beep = function () {
  console.log('boop');
};

},{"spritepack.js":"spritepack.js"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2FwcC9zY3JpcHRzL21haW4uanMiLCIvVXNlcnMvbWFkamlkL1NpdGVzL2dpdC9wZXJzby9icm93c2VyaWZ5L2FwcC9zY3JpcHRzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIHNjcmlwdHMvbWFpbi5qc1xuICpcbiAqIFRoaXMgaXMgdGhlIHN0YXJ0aW5nIHBvaW50IGZvciB5b3VyIGFwcGxpY2F0aW9uLlxuICogVGFrZSBhIGxvb2sgYXQgaHR0cDovL2Jyb3dzZXJpZnkub3JnLyBmb3IgbW9yZSBpbmZvXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXBwID0gcmVxdWlyZSgnLi9hcHAuanMnKTtcblxudmFyIGFwcCA9IG5ldyBBcHAoKTtcblxuYXBwLmJlZXAoKTsiLCIvKipcbiAqIHNjcmlwdHMvYXBwLmpzXG4gKlxuICogVGhpcyBpcyBhIHNhbXBsZSBDb21tb25KUyBtb2R1bGUuXG4gKiBUYWtlIGEgbG9vayBhdCBodHRwOi8vYnJvd3NlcmlmeS5vcmcvIGZvciBtb3JlIGluZm9cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTcHJpdGVwYWNrID0gcmVxdWlyZSgnc3ByaXRlcGFjay5qcycpO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnNvbGUubG9nKCdhcHAgaW5pdGlhbGl6ZWQnKTtcblxuICB2YXIgc3AgPSBuZXcgU3ByaXRlcGFjaygpO1xuICBzcC5sb2FkKCdzcHJpdGVzL2ltYWdlcy5wYWNrJywgJ3Nwcml0ZXMvaW1hZ2VzLmpzb24nKTtcblxuICBzcC5vbkxvYWRDb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpMVwiKS5zcmMgPSBzcC5nZXRVUkkoJ2ZvcmtpdC5naWYnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImkyXCIpLnNyYyA9IHNwLmdldFVSSSgnbWFyaW8uanBnJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpM1wiKS5zcmMgPSBzcC5nZXRVUkkoJ1NtaWxlLnBuZycpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHNwLmdldFVSSSgncGFja21hbl9naG9zdC5naWYnKSArICcpJztcblxuICB9XG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcblxuQXBwLnByb3RvdHlwZS5iZWVwID0gZnVuY3Rpb24gKCkge1xuICBjb25zb2xlLmxvZygnYm9vcCcpO1xufTtcbiJdfQ==
