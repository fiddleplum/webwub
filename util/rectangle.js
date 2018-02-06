import Freezable from './freezable.js'
import Vector2 from './vector2.js'

/**
 * A rectangle.
 */
class Rectangle extends Freezable {
	/**
	 * Constructor.
	 * @param {number?} minX
	 * @param {number?} minY
	 * @param {number?} sizeX
	 * @param {number?} sizeY
	 */
	constructor(minX = 0, minY = 0, sizeX = 0, sizeY = 0) {
		super();

		/**
		 * The minimum coordinate.
		 * @type {Vector2}
		 * @private
		 */
		this._min = new Vector2(minX, minY);
		this._min.freeze();

		/**
		 * The maximum coordinate.
		 * @type {Vector2}
		 * @private
		 */
		this._size = new Vector2(sizeX, sizeY);
		this._size.freeze();
	}

	/**
	 * Gets the minimum coordinate.
	 * @returns {Vector2}
	 */
	get min() {
		return this._min;
	}

	/**
	 * Sets the minimum coordinate.
	 * @param {Vector2} min
	 */
	set min(min) {
		this.throwIfFrozen();
		this._min.copy(min);
	}

	/**
	 * Gets the size.
	 * @returns {Vector2}
	 */
	get size() {
		return this._size;
	}

	/**
	 * Sets the size.
	 * @param {Vector2}
	 */
	set size(size) {
		this.throwIfFrozen();
		this._size.copy(size);
	}

	/**
	 * Copy a to this.
	 * @param {Rectangle} a
	 */
	copy(a) {
		this.throwIfFrozen();
		this._min.copy(a._min);
		this._size.copy(a._size);
	}

	/**
	 * @override
	 */
	freeze() {
		super.freeze();
		this._min.freeze();
		this._size.freeze();
	}

	/**
	 * @override
	 */
	thaw() {
		super.thaw();
		this._min.thaw();
		this._size.thaw();
	}
}

export default Rectangle;