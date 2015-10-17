var downloads =
{
	// url - string
	// pass - function (string url, string text)
	// fail - function (string url, int status)
	add: function(url, pass, fail)
	{
		var download = new this._Download(url, pass, fail, false);
		this._queue.push(download);
		this._update();
	},
	
	// url - string
	// pass - function (string url)
	// fail - function (string url)
	addScript: function(url, load, fail)
	{
		var download = new this._Download(url, load, fail, true);
		this._queue.push(download);
		this._update();
	},

	// Internal

	_Download: function(url, pass, fail, script)
	{
		this.url = url;
		this.pass = pass;
		this.fail = fail;
		this.script = script;
	},

	_active: [],
	_queue: [],
	_maxActive: 10,

	_update: function()
	{
		if(this._active.length < this._maxActive && this._queue.length > 0)
		{
			var download = this._queue.shift();
			if(download.script)
			{
				var script = document.createElement('script');
				script.src = download.url;
				if(download.pass)
				{
					script.onload = download.pass.bind(undefined, download.url);
				}
				if(download.fail)
				{
					script.onerror = download.fail.bind(undefined, download.url);
				}
				document.getElementsByTagName('head')[0].appendChild(script);
			}
			else
			{
				var request = new XMLHttpRequest();
				request.onreadystatechange = function()
				{
					if(request.readyState == 4)
					{
						if(request.status == 200 || request.status == 0)
						{
							if(download.pass)
							{
								download.pass(download.url, request.responseText);
							}
						}
						else
						{
							if(download.fail)
							{
								download.fail(download.url, request.request.status);
							}
						}
						downloads._update();
					}
				}
				request.open("GET", download.url, true);
				request.send();
			}
		}
	}
}
