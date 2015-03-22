Spritepack.js
===========

[Spritepack.js](https://github.com/madjidtaha/Spritepack.js) is a Javascript code that will help minimize HTTP requests.
Spritepack.js is a fork of [Magipack.js](https://github.com/keitakun/Magipack.js)

One of the issues on HTTP load time usually are the number of requests and the preferred method to minimize HTTP requests are generating image [Spritesheets](https://www.google.com/search?q=spritesheet&oq=spritesheet&aqs=chrome..69i57j69i59j69i60.1687j0j7&sourceid=chrome&espv=210&es_sm=91&ie=UTF-8).

Though, using Spritesheets you end up with some other issues such:

* Can't use different compressions for each image
* Can't use Spritesheets that exceeds 2048x2048 in most browsers
* Hard to use Spritesheets in *IMG* elements
* Needs repositioning *background-position* in CSS when Spritesheets changes

### So what [Spritepack.js](https://github.com/madjidtaha/Spritepack.js) does better than Spritesheets?
It loads a single file which is a concatenation of binary data of the files you want and a json file which maps the position and the size of each file.

This way, you can pack up several images with different file formats in a single file without losing compression or metadatas.

The example files and a python script are in the [examples folder](https://github.com/madjidtaha/Spritepack.js/tree/master/examples) so you can easily generate the pack and config file.

### So what [Spritepack.js](https://github.com/madjidtaha/Spritepack.js) does better than [Magipack.js](https://github.com/keitakun/Magipack.js)?

Spritepack.js bring to Magipack.js Javascript Module support (AMD, CommonJS), it also drop weird IE9 and lower support.


Browser compatibility
---------------------
This examples were tested in Chrome 32, IE10, Safari 7, Firefox 25, Safari iOS 7.

Spritepack.js need browser support of [blob](http://caniuse.com/#search=blob) to work.

There wasn't any large scale testing for this project yet, so if you find any [issue, please report it](https://github.com/madjidtaha/Spritepack.js/issues).

Installation
============

- npm : `npm install -S spritepack.js`
- bower : `bower install -S spritepack.js`

Examples
========

[example1-static.html](http://madj.me/lib/Spritepack.js/examples/example1-static.html)

[example2-instance.html](http://madj.me/lib/Spritepack.js/examples/example2-instance.html)

[example3-preloadjs.html](http://madj.me/lib/Spritepack.js/examples/example3-preloadjs.html)

[example4-browserify.html](http://madj.me/lib/Spritepack.js/examples/example4-browserify.html)

### Using as static class
```javascript
Spritepack.init();
Spritepack.onLoadComplete = function()
{
	document.getElementById("i1").src = Spritepack.getURI('forkit.gif');
	document.getElementById("i2").src = Spritepack.getURI('mario.jpg');
	document.getElementById("i3").src = Spritepack.getURI('Smile.png');
	document.getElementById("container").style.backgroundImage = 'url(' + Spritepack.getURI('packman_ghost.gif') + ')';
}

Spritepack.load('images.pack', 'images.json');
```

### Using as an instance
```javascript
var sp = new Spritepack();
sp.onLoadComplete = function()
{
	// Here you can use either the instance you created or `this` scope.
	document.getElementById("i1").src = this.getURI('forkit.gif');
	document.getElementById("i2").src = sp.getURI('mario.jpg');
	document.getElementById("i3").src = sp.getURI('Smile.png');
	document.getElementById("container").style.backgroundImage = 'url(' + sp.getURI('packman_ghost.gif') + ')';
}
sp.load('images.pack', 'images.json');
```

### Using with [Preload.js](http://www.createjs.com/#!/PreloadJS)
``` javascript
var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.loadManifest([
	{id: "image", src:"images.pack", type: 'binary'},
	{id: "config", src:"images.json"},
]);
function handleComplete() {
	var sp = new Spritepack(queue.getResult('image'), queue.getResult('config'));
	document.getElementById("i1").src = sp.getURI('forkit.gif');
	document.getElementById("i2").src = sp.getURI('mario.jpg');
	document.getElementById("i3").src = sp.getURI('Smile.png');
	document.getElementById("container").style.backgroundImage = 'url(' + sp.getURI('packman_ghost.gif') + ')';
}
```

### Using with [Browserify.js](http://browserify.org/)
``` javascript
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
```

### Packing images with packImages.py
In terminal, if you are in UNIX system, set permissions to execute script
```
chmod 0755 packImages.py
```

Then run it:
```
./packImages.py -p <path> -o <output>
```

Both `path` and `output` are optional parameters and it will fallback to the same directory as the *packImages.py* script.


Planned features
========================

- Port packImages to Javascript
- Make a gulp plugin to easily use Spritepack.js in your workflow
- Make a [vue.js](http://vuejs.org) custom directive to set source of an image from the DOM

Credits
=======

- [Keita Kuroki](https://github.com/keitakun) for [Magipack.js](https://github.com/keitakun/Magipack.js)
- [Danilo Figueiredo](https://github.com/grifotv)
- [Lucas Motta](https://github.com/lucasmotta)
- [Arthur Muchir](https://github.com/arthurmuchir)
- [Madjid Taha](https://madj.me)

License
=======

[The MIT License (MIT)](http://opensource.org/licenses/MIT)
