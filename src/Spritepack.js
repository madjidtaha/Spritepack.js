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

 
window.Spritepack = (function() {
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	Spritepack.isIE = Boolean(document.all);
	var hasBlob = false;
	try{
		hasBlob = Boolean(Blob);
	}catch(e)
	{
		hasBlob = false;
	}
	Spritepack.hasBlob = hasBlob;
	Spritepack.version = '0.1';
	if(!Spritepack.hasBlob)
	{
		throw new Error('Spritepack need blob support to work.') 
		
	}

	function req()
	{
		if(window.XMLHttpRequest) return new XMLHttpRequest()
		if(window.ActiveXObject)return new ActiveXObject("MSXML2.XMLHTTP.3.0")
	}

	function Spritepack(pack, config) {
		this.progress = 0
		if(pack)
		{
			this.init(pack, config);
		}
	}

	Spritepack.prototype._onProgress = function(e)
	{
		p = e.position / e.totalSize;
		if(isNaN(p)) p = 0;
		if(this._configComplete)
		{
			p = p * 0.9 + 0.1;
		}else{
			p *= 0.1;
		}
		this.progress = p;
		if(this.onProgress) this.onProgress(p, 1);
	}

	Spritepack.prototype._loadFile = function(path, callback, type)
	{
		var xhr = req();
		if(!type)
		{
			type = 'arraybuffer';
			try{
				if(Blob.prototype.slice)
				{
					type = 'blob';
				}
			}catch(e)
			{

			}
		}

		xhr.open('GET', path, true);

		xhr.responseType = type;
		var _callback = callback;
		var _this = this;
		xhr.onprogress = function(e)
		{
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

	Spritepack.prototype._configLoaded = function(e)
	{
		this._configComplete = true;
		this.config = eval('(' + e.responseText + ')');
		this._loadFile(this.pack, this._packLoaded);
	}

	Spritepack.prototype._packLoaded = function(e)
	{
		if(!Spritepack.hasBlob)
		{
			this.init(e.responseBody, this.config);
		}else{
			this.init(e.response, this.config);
		}
		if(this.onLoadComplete)
		{
			this.onLoadComplete(this);
		}
	}

	Spritepack.prototype._findFile = function(name)
	{
		var i;
		i = this.config.length;
		while (i-- > 0)
		{
			if(this.config[i][0] == name)
			{
				return this.config[i];
			}
		}
		while (i-- > 0) {
			if (name.indexOf(this.config[i][0]) >= 0) {
				return this.config[i];
			}
		}
	}

	Spritepack.prototype._getRange = function(i, e, type)
	{
		var b;
		if(this.blob.slice)
		{
			b = this.blob.slice(i, e, type);
			return window.URL.createObjectURL(b);
		}else if (this.blob.webkitSlice)
		{
			b = this.blob.webkitSlice(i, e, type);
			return window.URL.createObjectURL(b);
		}else if(this.blob.mozSlice)
		{
			b = this.blob.mozSlice(i, e, type);
			return window.URL.createObjectURL(b);
		}
	}

	Spritepack.prototype.init = function(pack, config)
	{
		this.config = config;
		if(pack != null)
		{
			if(!Spritepack.hasBlob)
			{
				this.ieBlob = GetIEByteArray_ByteStr(pack);
			}else{
				this.blob = new Blob([pack])
			}
		}
	}

	Spritepack.prototype.load = function(pack, config)
	{
		this.pack = pack;
		if(config)
		{
			this._loadFile(config, this._configLoaded, 'text');
		}else{
			this._loadFile(pack, this._packLoaded);
		}
	}

	Spritepack.prototype.getURI = function()
	{
		if(arguments.length == 0) throw new Error('Not enough arguments.');
		if(isNaN(arguments[0]) && !this.config) throw new Error('No config file loaded.');

		var type;

		if(!isNaN(arguments[0]) && !isNaN(arguments[1]))
		{
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
		if(pack)
		{
			this._instance.init(pack, config);
		}
		this.inited = true;
	};

	Spritepack.load = function(pack, config) {
		if(!this.inited) this.init();
		this._instance.onLoadComplete = this.onLoadComplete;
		this._instance.load(pack, config);
	};

	Spritepack.getURI = function()
	{
		return this._instance.getURI.apply(this._instance, arguments);
	}

	return Spritepack;

})();
