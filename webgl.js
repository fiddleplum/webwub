var glContexts = {}

function startWebGL(canvasId)
{
	var gl = glContexts[canvasId] = document.getElementById(canvasId).getContext("webgl");
	if(!gl)
	{
		console.log("WebGL could not be started.");
	}
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);		
}

function resizeWebGL(canvasId)
{
	var gl = glContexts[canvasId];
	gl.viewport(0, 0, canvas.width, canvas.height);
}

function getGLContextFromCanvas(id)
{
	if(id in glContexts)
	{
		return glContexts[id];
	}
	return null;
}

var shaderObjects = {}
function loadShaderObject(gl, id)
{
	if(!(id in shaderObjects))
	{
		// Get the script element.
		var shaderScript = document.getElementById(id);
		if(!shaderScript)
		{
			console.log("Shader object '" + id + "' not found!");
			return null;
		}

		// Get the code.
		var code = "";
		var currentChild = shaderScript.firstChild;
		while(currentChild)
		{
			if(currentChild.nodeType == currentChild.TEXT_NODE)
			{
				code += currentChild.textContent;
			}
			currentChild = currentChild.nextSibling;
		}

		// Create the shader object.
		var shader;
		if(shaderScript.type == "x-shader/x-vertex")
		{
			shader = gl.createShader(gl.VERTEX_SHADER);
		}
		else if(shaderScript.type == "x-shader/x-fragment")
		{
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		}
		if(!shader)
		{
			console.log("Shader object '" + id + "' needs type 'x-shader/x-vertex' or 'x-shader/x-fragment'");
			return null;
		}

		// Compile the shader object.
		gl.shaderSource(shader, code);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		{
			console.log("Shader object '" + id + "' did not compile correctly: " + gl.getShaderInfoLog(shader));
			return null;
		}

		shaderObjects[id] = shader;
	}
	return shaderObjects[id];
}

var shaderPrograms = {}
function loadShaderProgram(gl, vertexId, fragmentId)
{
	var id = vertexId + "." + fragmentId;
	if(!(id in shaderPrograms))
	{
		// Load the shader objects.
		var vertexShaderObject = loadShaderObject(gl, vertexId);
		if(!vertexShaderObject)
		{
			return null;
		}
		var fragmentShaderObject = loadShaderObject(gl, fragmentId);
		if(!fragmentShaderObject)
		{
			return null;
		}

		// Create and link the shader program.
		var shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShaderObject);
		gl.attachShader(shaderProgram, fragmentShaderObject);
		gl.linkProgram(shaderProgram);
		if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
		{
			console.log("Shader program '" + id + "' did not link correctly: " + gl.getProgramInfoLog(shaderProgram));
			return null;
		}

		shaderPrograms[id] = shaderProgram;
	}
	return shaderPrograms[id];	
}