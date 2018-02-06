import Viewport from './viewport.js'

/**
 * The WebGL renderer.
 */
class Renderer {
	/**
	 * Constructor.
	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		/**
		 * The canvas.
		 * @type {HTMLCanvasElement}
		 * @private
		 */
		this._canvas = canvas;

		/**
		 * The WebGL context.
		 * @type {WebGLRenderingContext}
		 * @private
		*/
		this._gl = canvas.getContext('webgl');
		if (!this._gl) {
			throw 'WebGL could not be started.';
		}

		/** The list of viewports to render.
		 * @type {Viewport[]}
		 * @private
		 */
		this._viewports = [];

		// Enable some WebGL defaults.
		this._gl.enable(this._gl.SCISSOR_TEST);
	}

	/**
	 * Adds a viewport.
	 * @returns {Viewport}
	 */
	addViewport() {
		let viewport = new Viewport(this._gl);
		this._viewports.push(viewport);
		return viewport;
	}

	/**
	 * Removes a viewport.
	 * @param {Viewport} viewport
	 */
	removeViewport(viewport) {
		for (let i = 0; i < this._viewports.length; i++) {
			if (this._viewports[i] === viewport) {
				this._viewports.splice(i, 1);
				break;
			}
		}
	}

	/**
	 * Renders the scene.
	 */
	render() {
		// Check if the canvas size changed.
		if (this._canvas.width != this._canvas.offsetWidth || this._canvas.height != this._canvas.offsetHeight) {
			this._canvas.width = this._canvas.offsetWidth;
			this._canvas.height = this._canvas.offsetHeight;
		}

		for (let i = 0; i < this._viewports.length; i++) {
			this._viewports[i].render();
		}
	}
}

export default Renderer;