var csv =
{
	// filename - string
	// hasHeaders - boolean
	// passFunction - function (string url, object csv)
	// failFunction - function (string url, string error)
	load : function(filename, hasHeaders, passFunction, failFunction)
	{
		downloads.add(filename, function(url, text)
		{
			var data = []
			var i = 0;
			var lineNum = 1;
			while(i < text.length)
			{
				var o = csv._parseLine(text, i, lineNum, failFunction, url);
				if(o == null)
				{
					return null;
				}
				var fields = o[0];
				console.log(fields);
				i = o[1];
				if(i == text.length && fields.length == 0)
				{
					break;
				}
				if(data.length > 0 && fields.length != data[0].length)
				{
					failFunction(url, 'On line ' + lineNum + ', incorrect number of fields');
					return null;
				}
				if(hasHeaders && data.length > 0)
				{
					var fieldsH = {};
					for(var h = 0; h < data[0].length; h++)
					{
						fieldsH[data[0][h]] = fields[h];
					}
					data.push(fieldsH);
				}
				else
				{
					data.push(fields);
				}
				lineNum++;
			}
			if(hasHeaders && data.length > 0)
			{
				data.shift();
			}
			passFunction(url, data);
		}, function(url, status)
		{
			failFunction(url, 'Failed to download: ' + status);
		});
	},
	
	// Internal

	// returns [array fields, int new_i]
	_parseLine : function(text, i, lineNum, failFunction, url)
	{
		var fields = [];
		var fieldNum = 1;
		var field = '';
		var quoted = false;
		while(i < text.length)
		{
			var c = text[i];
			var nc = (i + 1 < text.length ? text[i + 1] : '');
			console.log(c + " " + nc + " " + lineNum + " " + fieldNum + " " + quoted + " |" + field + "|");
			if(c == '"')
			{
				if(field == '') // start of quoted field
				{
					console.log('start quote');
					quoted = true;
					i++;
				}
				else if(quoted)
				{
					if(i + 1 >= text.length || nc == '\n' || nc == '\r' || nc == ',') // end of quoted field
					{
						console.log('end quote');
						fields.push(field);
						field = '';
						fieldNum++;
						quoted = false;
						i++; // pass quote
						if(i + 1 >= text.length || nc == '\n' || nc == '\r') // end of line
						{
							while(i < text.length && (text[i] == '\n' || text[i] == '\r')) // get passed nl and cr
							{
								i++;
							}
							return [fields, i];
						}
						else // pass comma
						{
							i++;
						}
					}
					else if(nc == '"') // escaped quote
					{
						field += '"';
						i++;
						i++;
					}
					else // lonely double quote
					{
						failFunction(url, 'On line ' + lineNum + ', field ' + fieldNum + ', lonely double quote (escape with another quote)');
						return null;
					}
				}
				else // double quote outside of double quoted field
				{
					failFunction(url, 'On line ' + lineNum + ', field ' + fieldNum + ', invalid double quote (quote the field and escape this one)');
					return null;
				}
			}
			else if(!quoted && (c == ',' || c == '\n' || c == '\r')) // end of field
			{
				fields.push(field);
				field = '';
				quoted = false;
				fieldNum++;
				if(c == '\n' || c == '\r') // end of line
				{
					while(i < text.length && (text[i] == '\n' || text[i] == '\r')) // get passed nl and cr
					{
						i++;
					}
					return [fields, i];
				}
				else
				{
					i++;
				}
			}
			else
			{
				field += c;
				i++;
			}
		}
		fields.push(field);
		return [fields, i];
	}
};