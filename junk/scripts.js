// This handles the dependencies of scripts.
// The url of each script is url base + script name.
// If it has already been loaded, it just passes through.
// Ironically, this requires downloader.

Scripts = {}

// urlBase - string, prefix every script name when constructing the url
Scripts.setUrlBase = function(urlBase) {
	Scripts._urlBase = urlBase;
}

// parent - the name of the calling script
// scripts - array of names of the script to load
// onLoaded - function() called when each script in scripts has been loaded
Scripts.require = function(parent, scripts, onLoaded) {
	if(Scripts._loaded.has(parent))
		Scripts._loaded.delete(parent);
	Scripts._requires[parent] = { 'scripts': scripts, 'onLoaded': onLoaded };
	for(var i = 0; i < scripts.length; i++) {
		var script = scripts[i];
		if(!Scripts._loaded.has(script)) {
			Downloader.add(Scripts._urlBase + script + ".js", function(script, url, text) {
				Scripts._loaded.add(script);
				eval(text);
				if(Scripts._loaded.has(script))
					Scripts._scriptLoaded(script);
			}.bind(undefined, script));
		}
		else
			Scripts._scriptLoaded(script);
	}
}

// Internal

Scripts._scriptLoaded = function(script) {
	foreach(Scripts._requires, function(parent, value) {
		var indexOfScript = value.scripts.indexOf(script);
		if(indexOfScript != -1) {
			value.scripts.splice(indexOfScript, 1);
			if(value.scripts.length == 0) {
				value.onLoaded();
				delete Scripts._requires[parent];
				Scripts._loaded.add(parent);
				Scripts._scriptLoaded(parent);
			}
		}
	});
}

Scripts._urlBase = "";
Scripts._requires = {}; // key is parent, value is { scripts: [], onLoaded: function() }
Scripts._loaded = new Set(['downloader', 'scripts'])