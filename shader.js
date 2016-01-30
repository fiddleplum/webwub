// Depends on downloader

var Shader = function(gl, vertexUrl, fragmentUrl, onReady) {
	this._gl = gl;
	this._onReady = onReady;
	this._uniforms = {};
	this._attributes = {};
	Downloader.add(vertexUrl, this._onVertexDownload.bind(this), null);
	Downloader.add(fragmentUrl, this._onFragmentDownload.bind(this), null);
}

Shader.prototype.cleanUp = function() {
	this._gl.deleteProgram(this._program);
}

Shader.prototype.activate = function() {
	this._gl.useProgram(this._program);
}

Shader.prototype.getUniformLocation = function(name) {
	return this._uniforms[name];
}

Shader.prototype.getAttributeLocation = function(name) {
	return this._attributes[name];
}

Shader.prototype._onVertexDownload = function(url, text) {
	this._vertexObject = this._gl.createShader(gl.VERTEX_SHADER);
	this._gl.shaderSource(this._vertexObject, text);
	this._gl.compileShader(this._vertexObject);
	if(!this._gl.getShaderParameter(this._vertexObject, gl.COMPILE_STATUS)) {
		console.log("The vertex shader object did not compile correctly: " + this._gl.getShaderInfoLog(this._vertexObject));
		this._vertexObject = null;
	}
	this._linkProgram();
}

Shader.prototype._onFragmentDownload = function(url, text) {
	this._fragmentObject = this._gl.createShader(gl.FRAGMENT_SHADER);
	this._gl.shaderSource(this._fragmentObject, text);
	this._gl.compileShader(this._fragmentObject);
	if(!this._gl.getShaderParameter(this._fragmentObject, this._gl.COMPILE_STATUS)) {
		console.log("The fragment shader object did not compile correctly: " + this._gl.getShaderInfoLog(this._fragmentObject));
		this._fragmentObject = null;
	}
	this._linkProgram();
}

Shader.prototype._linkProgram = function() {
	if(this._vertexObject && this._fragmentObject) { // Link the program after compiling shader objects.
		this._program = gl.createProgram();
		this._gl.attachShader(this._program, this._vertexObject);
		this._gl.attachShader(this._program, this._fragmentObject);
		this._gl.linkProgram(this._program);
		if(!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)) {
			console.log("The shader program did not link correctly: " + this._gl.getProgramInfoLog(this._program));
			this._gl.deleteProgram(this._program);
			delete this._program;
		}
		this._gl.detachShader(this._program, this._vertexObject);
		this._gl.detachShader(this._program, this._fragmentObject);
		this._gl.deleteShader(this._vertexObject);
		this._gl.deleteShader(this._fragmentObject);
		delete this._vertexObject;
		delete this._fragmentObject;
	}

	if(this._program) {
		var numUniforms = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_UNIFORMS); // Get the uniform locations.
		for(var i = 0; i < numUniforms; i++) {
			var name = this._gl.getActiveUniform(this._program, i).name;
			this._uniforms[name] = this._gl.getUniformLocation(this._program, name);
		}

		var numAttributes = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES); // Get the attribute locations.
		for(var i = 0; i < numAttributes; i++) {
			var name = this._gl.getActiveAttrib(this._program, i).name;
			this._attributes[name] = this._gl.getAttribLocation(this._program, name);
		}

		if(this._onReady)
			this._onReady();
	}
}

