var downloader = {
	// url - string
	// pass - function (string url, string text)
	// fail - function (string url, int status)
	add: function(url, pass, fail, thisParam) {
		var download = new this._Download(url, pass, fail, thisParam, false);
		this._queue.push(download);
		this._update();
	},
	
	// url - string
	// pass - function (string url)
	// fail - function (string url)
	addScript: function(url, load, fail, thisParam) {
		var download = new this._Download(url, load, fail, thisParam, true);
		this._queue.push(download);
		this._update();
	},

	// Internal

	_Download: function(url, pass, fail, thisParam, script) {
		this.url = url;
		this.pass = pass;
		this.fail = fail;
		this.thisParam = thisParam;
		this.script = script;
	},

	_update: function() {
		if(this._active.length < this._maxActive && this._queue.length > 0) {
			var download = this._queue.shift();
			if(download.script) {
				var script = document.createElement('script');
				script.src = download.url;
				if(download.pass) {
					script.onload = download.pass.bind(undefined, download.url);
				}
				if(download.fail) {
					script.onerror = download.fail.bind(undefined, download.url);
				}
				document.getElementsByTagName('head')[0].appendChild(script);
			}
			else {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if(request.readyState == 4) {
						if(request.status == 200 || request.status == 0) {
							if(download.pass) {
								if(download.thisParam)
									download.pass.call(download.thisParam, download.url, request.responseText);
								else
									download.pass(download.url, request.responseText);
							}
						}
						else {
							if(download.fail) {
								if(download.thisParam)
									download.fail.call(download.thisParam, download.url, reques.status);
								else
									download.fail(download.url, reques.status);
							}
						}
						downloader._update();
					}
				}
				request.open("GET", download.url, true);
				request.send();
			}
		}
	},

	_active: [],
	_queue: [],
	_maxActive: 10
}
