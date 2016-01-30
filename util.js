// Commonly used utility functions.

// f is a function(key, value) that is called over every member
foreach = function(object, f) {
	for(var key in object) {
		if(object.hasOwnProperty(key))
			f(key, object[key]);
	}
}

debug = function(object, level) {
	if(!level)
		level = 0;
	var s = '';
	if(typeof object === 'object') {
		if(level != 0)
			s += "\n";
		var first = true;
		foreach(object, function(key, value) {
			if(!first)
				s += ",\n";
			else
				first = false;
			s += " ".repeat((level + 1) * 2) + key + ": " + debug(value, level + 1);
		});
		s += "";
	}
	else if(typeof object === 'function')
		s = 'function';
	else
		s = object;
	if(level == 0)
		console.log(s);
	else
		return s;
}