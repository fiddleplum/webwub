glContexts = {}

function startWebGL(canvasId)
{
	var canvas = document.getElementById(canvasId);
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	var gl = glContexts[canvasId] = canvas.getContext("webgl");
	if(!gl)
	{
		console.log("WebGL could not be started.");
	}
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	gl.clearColor(0, 0, 0, 1);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	return gl;		
}

function resizeWebGL(gl)
{
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

function getGLContextFromCanvas(id)
{
	if(id in glContexts)
	{
		return glContexts[id];
	}
	return null;
}

