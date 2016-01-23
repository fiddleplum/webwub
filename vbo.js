var VBO = function(gl) {
	this._gl = gl;
	this._vertexBuffer = this._gl.createBuffer();
	this._indexBuffer = this._gl.createBuffer();
	this._mode = this._gl.TRIANGLES;
	this._vertexComponents = [];
	this._bytesPerVertex = 0;
	this._numIndices = 0;
}

VBO.prototype.cleanUp = function() {
	this._gl.deleteBuffer(this._vertexBuffer);
	this._gl.deleteBuffer(this._indexBuffer);
}

VBO.prototype.setNumVerticesPerPrimitive = function(numVertices) {
	if(numVertices == 1)
		this._mode = this._gl.POINTS;
	else if(numVertices == 2)
		this._mode = this._gl.LINES;
	else if(numVertices == 3)
		this._mode = this._gl.TRIANGLES;
	else
		console.log("Invalid number of vertices per primitive.");
}

VBO.prototype.addVertexComponent = function(location, offset, dimensions) {
	var component = {}
	component.location = location;
	component.offset = offset;
	component.dimensions = dimensions;
	this._vertexComponents.push(component);
	if(this._bytesPerVertex < (offset + dimensions) * 4)
		this._bytesPerVertex = (offset + dimensions) * 4;
}

VBO.prototype.setVertices = function(vertices) {
	this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(vertices), this._gl.STATIC_DRAW);
}

VBO.prototype.setIndices = function(indices) {
	this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this._gl.STATIC_DRAW);
	this._numIndices = indices.length;
}

VBO.prototype.render = function() {
	this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
	for(var componentIndex = 0; componentIndex < this._vertexComponents.length; componentIndex++) {
		var component = this._vertexComponents[componentIndex];
		this._gl.enableVertexAttribArray(component.location);
		this._gl.vertexAttribPointer(component.location, component.dimensions, this._gl.FLOAT, this._gl.FALSE, this._bytesPerVertex, component.offset * 4);
	}
	this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	this._gl.drawElements(this._mode, this._numIndices, this._gl.UNSIGNED_SHORT, 0);
}