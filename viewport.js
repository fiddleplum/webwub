import Rectangle from './util/rectangle.js'

/**
 * A viewport through shich rendering happens.
 */
class Viewport {
	/**
	 * Constructor.
	 * @param {WebGLRenderingContext} gl
	 */
	constructor(gl) {
		/**
		 * The WebGL rendering context.
		 * @type {WebGLRenderingContext}
		 * @private
		 */
		this._gl = gl;

		/**
		 * The bounds relative to the rendering context.
		 * @type {Rectangle}
		 * @private
		 */
		this._bounds = new Rectangle();
		this._bounds.freeze();
	}

	/**
	 * Get the bounds relative to the rendering context.
	 * @returns {Rectangle}
	 */
	getBounds() {
		return this._bounds;
	}

	/**
	 * Sets the bounds relative to the rendering context.
	 * @param {Rectangle} bounds
	 */
	setBounds(bounds) {
		this._bounds.thaw();
		this._bounds.copy(bounds);
		this._bounds.freeze();
	}

	/**
	 * Renders the viewport.
	 */
	render() {
		this._gl.viewport(this._bounds.min.x * this._gl.drawingBufferWidth, this._bounds.min.y * this._gl.drawingBufferHeight, this._bounds.size.x * this._gl.drawingBufferWidth, this._bounds.size.y * this._gl.drawingBufferHeight);
		this._gl.scissor(this._bounds.min.x * this._gl.drawingBufferWidth, this._bounds.min.y * this._gl.drawingBufferHeight, this._bounds.size.x * this._gl.drawingBufferWidth, this._bounds.size.y * this._gl.drawingBufferHeight);
		this._gl.clearColor(Math.random(), 0, 0, 1);
		this._gl.enable(this._gl.DEPTH_TEST);
		this._gl.depthFunc(this._gl.LEQUAL);
		this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
	}
}

export default Viewport;