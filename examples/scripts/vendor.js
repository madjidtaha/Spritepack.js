require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"spritepack.js":[function(require,module,exports){
/**
 *
 * Copyright (c) 2015 Madjid Taha
 * Released under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * For more information:
 * https://github.com/madjidtaha/Spritepack.js
 * contact@madjidtaha.fr
 *
 * Spritepack is a fork of Magipack by Keita Kuroki
 * https://github.com/keitakun/Magipack.js
 * code@hellokeita.in
 *
 **/

(function(global) {

  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  Spritepack.isIE = Boolean(document.all);
  var hasBlob = false;
  try {
    hasBlob = Boolean(Blob);
  }
  catch(e) {
    throw new Error('Spritepack need blob support to work.')
  }

  Spritepack.hasBlob = hasBlob;
  Spritepack.version = '1.0.0';

  function Spritepack(pack, config) {
    this.progress = 0
    if(pack)
    {
      this.init(pack, config);
    }
  }

  Spritepack.prototype._onProgress = function(e)
  {
    if (e.loaded && e.total) {
      p = e.loaded / e.total;
    }
    else {
      p = e.position / e.totalSize;
    }

    if(isNaN(p)) p = 0;
    if(this._configComplete) {
      p = p * 0.9 + 0.1;
    } else {
      p *= 0.1;
    }

    this.progress = p;
    if(this.onProgress) this.onProgress(p, 1);
  }

  Spritepack.prototype._loadFile = function(path, callback, type)
  {
    var xhr = new XMLHttpRequest();
    if(!type) {
      type = 'arraybuffer';
      try {
        if(Blob.prototype.slice) type = 'blob';
      }
      catch(e) { }
    }

    xhr.open('GET', path, true);

    xhr.responseType = type;
    var _callback = callback;
    var _this = this;
    xhr.onprogress = function(e) {
      _this._onProgress(e)
    }
    xhr.onreadystatechange = function(e) {
      if (this.readyState == 4) {
        if(_callback) _callback.call(_this, this);
        this.onreadystatechange = null;
      }
    };

    xhr.send(null);
  }

  Spritepack.prototype._configLoaded = function(e) {
    this._configComplete = true;
    this.config = eval('(' + e.responseText + ')');
    this._loadFile(this.pack, this._packLoaded);
  }

  Spritepack.prototype._packLoaded = function(e) {

    this.init(e.response, this.config);
    if(this.onLoadComplete) this.onLoadComplete(this);
  }

  Spritepack.prototype._findFile = function(name) {
    var i;
    i = this.config.length;
    while (i-- > 0) {
      if(this.config[i][0] == name) return this.config[i];
    }
    while (i-- > 0) {
      if (name.indexOf(this.config[i][0]) >= 0) return this.config[i];
    }
  }

  Spritepack.prototype._getRange = function(i, e, type) {
    var b;

    if(this.blob.slice) {

      b = this.blob.slice(i, e, type);

    } else if (this.blob.webkitSlice) {

      b = this.blob.webkitSlice(i, e, type);

    } else if(this.blob.mozSlice) {

      b = this.blob.mozSlice(i, e, type);

    }

    return window.URL.createObjectURL(b);
  }

  Spritepack.prototype.init = function(pack, config) {
    this.config = config;

    if(pack != null) {
      this.blob = new Blob([pack])
    }
  }

  Spritepack.prototype.load = function(pack, config) {
    this.pack = pack;
    if(config) {
      this._loadFile(config, this._configLoaded, 'text');
    }
    else {
      this._loadFile(pack, this._packLoaded);
    }
  }

  Spritepack.prototype.getURI = function()
  {
    if(arguments.length == 0) throw new Error('Not enough arguments.');
    if(isNaN(arguments[0]) && !this.config) throw new Error('No config file loaded.');

    var type;

    if(!isNaN(arguments[0]) && !isNaN(arguments[1])) {
      type = arguments[2];
      if(!type) type = 'text/plain';
      return this._getRange(arguments[0], arguments[1], type);
    }

    var file = this._findFile(arguments[0]);
    if(!file) throw new Error('File not found in pack.');
    type = file[3];
    if(!type) type = 'text/plain';

    return this._getRange(file[1], file[2], type);
  }

  Spritepack.init = function(pack, config) {
    if(this.inited) throw new Error('Spritepack static instance already initialized.');
    this._instance = new Spritepack(pack, config);
    if(pack) {
      this._instance.init(pack, config);
    }
    this.inited = true;
  };

  Spritepack.load = function(pack, config) {
    if(!this.inited) this.init();
    this._instance.onLoadComplete = this.onLoadComplete;
    this._instance.load(pack, config);
  };

  Spritepack.getURI = function() {
    return this._instance.getURI.apply(this._instance, arguments);
  }

  /* global define:true module:true window:true */

  if (typeof define === 'function' && define.amd) {

    define(function() { return Spritepack; });

  } else if (typeof module !== 'undefined' && module.exports) {

    module.exports = Spritepack;

  } else if (typeof this !== 'undefined') {

      global.Spritepack = Spritepack;

  }

})(this);

},{}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWFkamlkL1NpdGVzL2dpdC9wZXJzby9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9zcHJpdGVwYWNrLmpzL3NyYy9TcHJpdGVwYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBNYWRqaWQgVGFoYVxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICpcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uOlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hZGppZHRhaGEvU3ByaXRlcGFjay5qc1xuICogY29udGFjdEBtYWRqaWR0YWhhLmZyXG4gKlxuICogU3ByaXRlcGFjayBpcyBhIGZvcmsgb2YgTWFnaXBhY2sgYnkgS2VpdGEgS3Vyb2tpXG4gKiBodHRwczovL2dpdGh1Yi5jb20va2VpdGFrdW4vTWFnaXBhY2suanNcbiAqIGNvZGVAaGVsbG9rZWl0YS5pblxuICpcbiAqKi9cblxuKGZ1bmN0aW9uKGdsb2JhbCkge1xuXG4gIHdpbmRvdy5VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93Lm1velVSTCB8fCB3aW5kb3cubXNVUkw7XG4gIFNwcml0ZXBhY2suaXNJRSA9IEJvb2xlYW4oZG9jdW1lbnQuYWxsKTtcbiAgdmFyIGhhc0Jsb2IgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICBoYXNCbG9iID0gQm9vbGVhbihCbG9iKTtcbiAgfVxuICBjYXRjaChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTcHJpdGVwYWNrIG5lZWQgYmxvYiBzdXBwb3J0IHRvIHdvcmsuJylcbiAgfVxuXG4gIFNwcml0ZXBhY2suaGFzQmxvYiA9IGhhc0Jsb2I7XG4gIFNwcml0ZXBhY2sudmVyc2lvbiA9ICcxLjAuMCc7XG5cbiAgZnVuY3Rpb24gU3ByaXRlcGFjayhwYWNrLCBjb25maWcpIHtcbiAgICB0aGlzLnByb2dyZXNzID0gMFxuICAgIGlmKHBhY2spXG4gICAge1xuICAgICAgdGhpcy5pbml0KHBhY2ssIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgU3ByaXRlcGFjay5wcm90b3R5cGUuX29uUHJvZ3Jlc3MgPSBmdW5jdGlvbihlKVxuICB7XG4gICAgaWYgKGUubG9hZGVkICYmIGUudG90YWwpIHtcbiAgICAgIHAgPSBlLmxvYWRlZCAvIGUudG90YWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcCA9IGUucG9zaXRpb24gLyBlLnRvdGFsU2l6ZTtcbiAgICB9XG5cbiAgICBpZihpc05hTihwKSkgcCA9IDA7XG4gICAgaWYodGhpcy5fY29uZmlnQ29tcGxldGUpIHtcbiAgICAgIHAgPSBwICogMC45ICsgMC4xO1xuICAgIH0gZWxzZSB7XG4gICAgICBwICo9IDAuMTtcbiAgICB9XG5cbiAgICB0aGlzLnByb2dyZXNzID0gcDtcbiAgICBpZih0aGlzLm9uUHJvZ3Jlc3MpIHRoaXMub25Qcm9ncmVzcyhwLCAxKTtcbiAgfVxuXG4gIFNwcml0ZXBhY2sucHJvdG90eXBlLl9sb2FkRmlsZSA9IGZ1bmN0aW9uKHBhdGgsIGNhbGxiYWNrLCB0eXBlKVxuICB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGlmKCF0eXBlKSB7XG4gICAgICB0eXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKEJsb2IucHJvdG90eXBlLnNsaWNlKSB0eXBlID0gJ2Jsb2InO1xuICAgICAgfVxuICAgICAgY2F0Y2goZSkgeyB9XG4gICAgfVxuXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuXG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IHR5cGU7XG4gICAgdmFyIF9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihlKSB7XG4gICAgICBfdGhpcy5fb25Qcm9ncmVzcyhlKVxuICAgIH1cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgIGlmKF9jYWxsYmFjaykgX2NhbGxiYWNrLmNhbGwoX3RoaXMsIHRoaXMpO1xuICAgICAgICB0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhoci5zZW5kKG51bGwpO1xuICB9XG5cbiAgU3ByaXRlcGFjay5wcm90b3R5cGUuX2NvbmZpZ0xvYWRlZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLl9jb25maWdDb21wbGV0ZSA9IHRydWU7XG4gICAgdGhpcy5jb25maWcgPSBldmFsKCcoJyArIGUucmVzcG9uc2VUZXh0ICsgJyknKTtcbiAgICB0aGlzLl9sb2FkRmlsZSh0aGlzLnBhY2ssIHRoaXMuX3BhY2tMb2FkZWQpO1xuICB9XG5cbiAgU3ByaXRlcGFjay5wcm90b3R5cGUuX3BhY2tMb2FkZWQgPSBmdW5jdGlvbihlKSB7XG5cbiAgICB0aGlzLmluaXQoZS5yZXNwb25zZSwgdGhpcy5jb25maWcpO1xuICAgIGlmKHRoaXMub25Mb2FkQ29tcGxldGUpIHRoaXMub25Mb2FkQ29tcGxldGUodGhpcyk7XG4gIH1cblxuICBTcHJpdGVwYWNrLnByb3RvdHlwZS5fZmluZEZpbGUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGk7XG4gICAgaSA9IHRoaXMuY29uZmlnLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgaWYodGhpcy5jb25maWdbaV1bMF0gPT0gbmFtZSkgcmV0dXJuIHRoaXMuY29uZmlnW2ldO1xuICAgIH1cbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgaWYgKG5hbWUuaW5kZXhPZih0aGlzLmNvbmZpZ1tpXVswXSkgPj0gMCkgcmV0dXJuIHRoaXMuY29uZmlnW2ldO1xuICAgIH1cbiAgfVxuXG4gIFNwcml0ZXBhY2sucHJvdG90eXBlLl9nZXRSYW5nZSA9IGZ1bmN0aW9uKGksIGUsIHR5cGUpIHtcbiAgICB2YXIgYjtcblxuICAgIGlmKHRoaXMuYmxvYi5zbGljZSkge1xuXG4gICAgICBiID0gdGhpcy5ibG9iLnNsaWNlKGksIGUsIHR5cGUpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLmJsb2Iud2Via2l0U2xpY2UpIHtcblxuICAgICAgYiA9IHRoaXMuYmxvYi53ZWJraXRTbGljZShpLCBlLCB0eXBlKTtcblxuICAgIH0gZWxzZSBpZih0aGlzLmJsb2IubW96U2xpY2UpIHtcblxuICAgICAgYiA9IHRoaXMuYmxvYi5tb3pTbGljZShpLCBlLCB0eXBlKTtcblxuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChiKTtcbiAgfVxuXG4gIFNwcml0ZXBhY2sucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihwYWNrLCBjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIGlmKHBhY2sgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ibG9iID0gbmV3IEJsb2IoW3BhY2tdKVxuICAgIH1cbiAgfVxuXG4gIFNwcml0ZXBhY2sucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbihwYWNrLCBjb25maWcpIHtcbiAgICB0aGlzLnBhY2sgPSBwYWNrO1xuICAgIGlmKGNvbmZpZykge1xuICAgICAgdGhpcy5fbG9hZEZpbGUoY29uZmlnLCB0aGlzLl9jb25maWdMb2FkZWQsICd0ZXh0Jyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5fbG9hZEZpbGUocGFjaywgdGhpcy5fcGFja0xvYWRlZCk7XG4gICAgfVxuICB9XG5cbiAgU3ByaXRlcGFjay5wcm90b3R5cGUuZ2V0VVJJID0gZnVuY3Rpb24oKVxuICB7XG4gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzLicpO1xuICAgIGlmKGlzTmFOKGFyZ3VtZW50c1swXSkgJiYgIXRoaXMuY29uZmlnKSB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbmZpZyBmaWxlIGxvYWRlZC4nKTtcblxuICAgIHZhciB0eXBlO1xuXG4gICAgaWYoIWlzTmFOKGFyZ3VtZW50c1swXSkgJiYgIWlzTmFOKGFyZ3VtZW50c1sxXSkpIHtcbiAgICAgIHR5cGUgPSBhcmd1bWVudHNbMl07XG4gICAgICBpZighdHlwZSkgdHlwZSA9ICd0ZXh0L3BsYWluJztcbiAgICAgIHJldHVybiB0aGlzLl9nZXRSYW5nZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgdHlwZSk7XG4gICAgfVxuXG4gICAgdmFyIGZpbGUgPSB0aGlzLl9maW5kRmlsZShhcmd1bWVudHNbMF0pO1xuICAgIGlmKCFmaWxlKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgbm90IGZvdW5kIGluIHBhY2suJyk7XG4gICAgdHlwZSA9IGZpbGVbM107XG4gICAgaWYoIXR5cGUpIHR5cGUgPSAndGV4dC9wbGFpbic7XG5cbiAgICByZXR1cm4gdGhpcy5fZ2V0UmFuZ2UoZmlsZVsxXSwgZmlsZVsyXSwgdHlwZSk7XG4gIH1cblxuICBTcHJpdGVwYWNrLmluaXQgPSBmdW5jdGlvbihwYWNrLCBjb25maWcpIHtcbiAgICBpZih0aGlzLmluaXRlZCkgdGhyb3cgbmV3IEVycm9yKCdTcHJpdGVwYWNrIHN0YXRpYyBpbnN0YW5jZSBhbHJlYWR5IGluaXRpYWxpemVkLicpO1xuICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IFNwcml0ZXBhY2socGFjaywgY29uZmlnKTtcbiAgICBpZihwYWNrKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KHBhY2ssIGNvbmZpZyk7XG4gICAgfVxuICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgfTtcblxuICBTcHJpdGVwYWNrLmxvYWQgPSBmdW5jdGlvbihwYWNrLCBjb25maWcpIHtcbiAgICBpZighdGhpcy5pbml0ZWQpIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuX2luc3RhbmNlLm9uTG9hZENvbXBsZXRlID0gdGhpcy5vbkxvYWRDb21wbGV0ZTtcbiAgICB0aGlzLl9pbnN0YW5jZS5sb2FkKHBhY2ssIGNvbmZpZyk7XG4gIH07XG5cbiAgU3ByaXRlcGFjay5nZXRVUkkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UuZ2V0VVJJLmFwcGx5KHRoaXMuX2luc3RhbmNlLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyogZ2xvYmFsIGRlZmluZTp0cnVlIG1vZHVsZTp0cnVlIHdpbmRvdzp0cnVlICovXG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gU3ByaXRlcGFjazsgfSk7XG5cbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTcHJpdGVwYWNrO1xuXG4gIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgIGdsb2JhbC5TcHJpdGVwYWNrID0gU3ByaXRlcGFjaztcblxuICB9XG5cbn0pKHRoaXMpO1xuIl19
