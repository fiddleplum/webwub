// Depends on downloader and pools

var Shader = function(vertexUrl, fragmentUrl) {
	this._vertexObject = null;
	this._fragmentObject = null;
	this._program = null;
	this._uniforms = {};
	downloader.add(vertexUrl, this._onVertexDownload, null, this);
	downloader.add(fragmentUrl, this._onFragmentDownload, null, this);
}

Shader.prototype.cleanUp = function() {
	gl.deleteProgram(this._program);
}

Shader.prototype.isReady = function() {
	return this._program != null;
}

Shader.prototype._onVertexDownload = function(url, text) {
	this._vertexObject = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(this._vertexObject, text);
	gl.compileShader(this._vertexObject);
	if(!gl.getShaderParameter(this._vertexObject, gl.COMPILE_STATUS)) {
		console.log("The vertex shader object did not compile correctly: " + gl.getShaderInfoLog(this._vertexObject));
		this._vertexObject = null;
	}
	this._linkProgram();
}

Shader.prototype._onFragmentDownload = function(url, text) {
	this._fragmentObject = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(this._fragmentObject, text);
	gl.compileShader(this._fragmentObject);
	if(!gl.getShaderParameter(this._fragmentObject, gl.COMPILE_STATUS)) {
		console.log("The fragment shader object did not compile correctly: " + gl.getShaderInfoLog(this._fragmentObject));
		this._fragmentObject = null;
	}
	this._linkProgram();
}

Shader.prototype._linkProgram = function() {
	if(this._vertexObject && this._fragmentObject) { // Link the program after compiling shader objects.
		this._program = gl.createProgram();
		gl.attachShader(this._program, this._vertexObject);
		gl.attachShader(this._program, this._fragmentObject);
		gl.linkProgram(this._program);
		if(!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
			console.log("The shader program did not link correctly: " + gl.getProgramInfoLog(this._program));
			this._program = null;
		}
		gl.detachShader(this._program, this._vertexObject);
		gl.detachShader(this._program, this._fragmentObject);
		gl.deleteShader(this._vertexObject);
		gl.deleteShader(this._fragmentObject);
		delete this._vertexObject;
		delete this._fragmentObject;
	}

	if(this._program) { // Get the uniform locations after linking.
		var numUniforms = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
		for(var i = 0; i < numUniforms; i++) {
			var name = gl.getActiveUniform(this._program, i).name;
			this._uniforms[name] = gl.getUniformLocation(this._program, name);
		}
	}
}

