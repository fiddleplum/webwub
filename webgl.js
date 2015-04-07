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
	return gl;		
}

function resizeWebGL(gl)
{
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

function createShader(gl, vertexCode, fragmentCode)
{
	// Compile the vertex shader object.
	var vObject = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vObject, vertexCode);
	gl.compileShader(vObject);
	if(!gl.getShaderParameter(vObject, gl.COMPILE_STATUS))
	{
		console.log("The vertex shader object did not compile correctly: " + gl.getShaderInfoLog(vObject));
		return null;
	}

	// Compile the fragment shader object.
	var fObject = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fObject, fragmentCode);
	gl.compileShader(fObject);
	if(!gl.getShaderParameter(fObject, gl.COMPILE_STATUS))
	{
		console.log("The fragment shader object did not compile correctly: " + gl.getShaderInfoLog(fObject));
		return null;
	}

	// Create and link the shader program.
	var program = gl.createProgram();
	gl.attachShader(program, vObject);
	gl.attachShader(program, fObject);
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		console.log("The shader program did not link correctly: " + gl.getProgramInfoLog(program));
		return null;
	}
	gl.detachShader(program, vObject);
	gl.detachShader(program, fObject);
	gl.deleteShader(vObject);
	gl.deleteShader(fObject);

	// Get the uniform locations.	
	var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
	var uniforms = {}
	for(var i = 0; i < numUniforms; i++)
	{
		var name = gl.getActiveUniform(program, i).name;
		uniforms[name] = gl.getUniformLocation(program, name);
	}

	var shader = {}
	shader._program = program;
	shader.use = function ()
	{
		gl.useProgram(this._program);
	}
	
	return shader;
}

function destroyShader(gl, shader)
{
	gl.deleteProgram(shader._program);
}

var shaderPrograms = {}
function loadShader(gl, id, vertexCode, fragmentCode)
{
	if(!(id in shaderPrograms))
	{
		// Compile the shader object.
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(shader, vertexCode);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		{
			console.log("Vertex Shader '" + id + "' did not compile correctly: " + gl.getShaderInfoLog(shader));
			return null;
		}

		// Compile the shader object.
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(shader, code);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		{
			console.log("Shader object '" + id + "' did not compile correctly: " + gl.getShaderInfoLog(shader));
			return null;
		}

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

function createVBO(gl)
{
	var vbo = {}
	vbo._vBuffer = gl.createBuffer();
	vbo._iBuffer = gl.createBuffer();
	vbo._mode = gl.TRIANGLES;
	vbo._vertexComponents = [];
	vbo._bytesPerVertex = 0;
	vbo._numIndices = 0;
	vbo.setNumVerticesPerPrimitive = function (num)
	{
		if(num == 1)
		{
			this._mode = gl.POINTS;
		}
		else if(num == 2)
		{
			this._mode = gl.LINES;
		}
		else if(num == 3)
		{
			this._mode = gl.TRIANGLES;
		}
		else
		{
			console.log("Invalid number of vertices per primitive.");
		}
	}
	vbo.addVertexComponent = function (location, offset, dimensions)
	{
		var component = {}
		component.location = location;
		component.offset = offset;
		component.dimensions = dimensions;
		vbo._vertexComponents.push(component);
		if(this._bytesPerVertex < (offset + dimensions) * 4)
		{
			this._bytesPerVertex = (offset + dimensions) * 4;
		}
	}
	vbo.setVertices = function (vertices)
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this._vBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	}
	vbo.setIndices = function (indices)
	{
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		this._numIndices = indices.length;
	}
	vbo.render = function ()
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this._vBuffer);
		for(var component in this._vertexComponents)
		{
			gl.enableVertexAttribArray(component.location);
			gl.vertexAttribPointer(component.location, component.dimensions, gl.FLOAT, gl.FALSE, this._bytesPerVertex, component.offset * 4);
		}
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iBuffer);
		gl.drawElements(this._mode, this._numIndices, gl.UNSIGNED_SHORT, 0);
	}
	return vbo;
}

function destroyVBO(gl, vbo)
{
	gl.deleteBuffer(vbo.arrayBuffer);
	gl.deleteBuffer(vbo.elementArrayBuffer);
}

