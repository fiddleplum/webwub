var downloader = {
	// url - string
	// onDownload - function (string url, string text)
	// onFail - function (string url, int status)
	add: function(url, onDownload, onFail) {
		var download = new this._Download(url, onDownload, onFail, false);
		this._queue.push(download);
		this._update();
	},
	
	// url - string
	// onLoad - function (string url)
	// onFail - function (string url)
	addScript: function(url, onLoad, onFail) {
		var download = new this._Download(url, onLoad, onFail, true);
		this._queue.push(download);
		this._update();
	},

	// Internal

	_Download: function(url, onDownload, onFail, script) {
		this.url = url;
		this.onDownload = onDownload;
		this.onFail = onFail;
		this.script = script;
	},

	_update: function() {
		if(this._active.length < this._maxActive && this._queue.length > 0) {
			var download = this._queue.shift();
			if(download.script) {
				var script = document.createElement('script');
				script.src = download.url;
				if(download.onDownload) {
					script.onload = download.onDownload.bind(undefined, download.url);
				}
				if(download.onFail) {
					script.onerror = download.onFail.bind(undefined, download.url);
				}
				document.getElementsByTagName('head')[0].appendChild(script);
			}
			else {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if(request.readyState == 4) {
						if(request.status == 200 || request.status == 0) {
							if(download.onDownload)
								download.onDownload(download.url, request.responseText);
						}
						else {
							if(download.onFail)
								download.onFail(download.url, request.status);
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
