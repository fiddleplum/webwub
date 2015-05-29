// doneFunction(name, text), failFunction(name)
function getFile(name, doneFunction, failFunction)
{
	var file = new XMLHttpRequest();
	file.open("GET", file, false);
	file.onreadystatechange = function ()
	{
		if(file.readyState === 4)
		{
			if(file.status == 200 || file.status == 0) // 0 for local file system
			{
				doneFunction(name, file.responseText);
			}
			else
			{
				failFunction(name);
			}
		}
	}
	file.send(null);
}

