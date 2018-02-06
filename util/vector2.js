import Freezable from './freezable'
import Pool from './pool'

/**
 * A two-dimensional vector.
 */
class Vector2 extends Freezable {
	/**
	 * Constructor.
	 * Sets all components to zero.
	 * @param {number?} x
	 * @param {number?} y
	 */
	constructor(x = 0, y = 0) {
		super();

		/**
		 * The x component.
		 * @type {number}
		 * @private
		 */
		this._x = x;

		/**
		 * The y component.
		 * @type {number}
		 * @private
		 */
		this._y = y;
	}

	/**
	 * Gets the x component.
	 * @returns {number}
	 */
	get x() {
		return this._x;
	}

	/**
	 * Sets the x component.
	 * @param {number} x
	 */
	set x(x) {
		this.throwIfFrozen();
		this._x = x;
	}

	/**
	 * Gets the y component.
	 * @returns {number}
	 */
	get y() {
		return this._y;
	}

	/**
	 * Sets the y component.
	 * @param {number} y
	 */
	set y(y) {
		this.throwIfFrozen();
		this._y = y;
	}

	/**
	 * Returns true if this equals a.
	 * @param {Vector2} a
	 * @returns {boolean}
	 */
	equals(a) {
		return this._x == a._x && this._y == a._y;
	}

	/**
	 * Copies a to this.
	 * @param {Vector2} a
	 */
	copy(a) {
		this.throwIfFrozen();
		this._x = a._x;
		this._y = a._y;
	}

	/** 
	 * Sets this to the components x and y.
	 * @param {number} x
	 * @param {number} y
	 */
	set(x, y, z) {
		this.throwIfFrozen();
		this._x = x;
		this._y = y;
	}

	/**
	 * Sets this to the negative of a.
	 * @param {Vector2} a
	 */
	neg(a) {
		this.throwIfFrozen();
		this._x = -a._x;
		this._y = -a._y;
	}

	/**
	 * Sets this to a + b.
	 * @param {Vector2} a
	 * @param {Vector2} b
	 */
	add(a, b) {
		this.throwIfFrozen();
		this._x = a._x + b._x;
		this._y = a._y + b._y;
	}

	/**
	 * Sets this to a - b.
	 * @param {Vector2} a
	 * @param {Vector2} b
	 */
	sub(a, b) {
		this.throwIfFrozen();
		this._x = a._x - b._x;
		this._y = a._y - b._y;
	}

	/**
	 * Sets this to a * b.
	 * @param {Vector2} a
	 * @param {number} b
	 */
	mult(a, b) {
		this.throwIfFrozen();
		this._x = a._x * b;
		this._y = a._y * b;
	}

	/**
	 * Sets this to a scaled by b, component-wise.
	 * @param {Vector2} a
	 * @param {Vector2} b
	 */
	scale(a, b) {
		this.throwIfFrozen();
		this._x = a._x * b._x;
		this._y = a._y * b._y;
	}

	/**
	 * Gets the dot product between this and a.
	 * @param {Vector2} a
	 * @returns {number}
	 */
	dot(a) {
		return this._x * a._x + this._y * a._y;
	}

	/**
	 * Gets the norm of this.
	 * @returns {number}
	 */
	norm() {
		return Math.sqrt(this.dot(this));
	}

	/** Sets this to a normalized.
	 * @param {Vector2} a
	 */
	normalize(a) {
		this.throwIfFrozen();
		let n = a.norm();
		if (n != 0) {
			this._x = a._x / n;
			this._y = a._y / n;
		}
	}

	/** Sets this to a, clamped between min and max.
	 * @param {Vector2} a
	 * @param {number} min
	 * @param {number} max
	 */
	clamp(a, min, max) {
		this.throwIfFrozen();
		this._x = Math.max(min, Math.min(max, a._x));
		this._y = Math.max(min, Math.min(max, a._y));
	}

	/** Sets this to the lerp between a and b, with lerp factor u.
	 * @param {Vector2} a
	 * @param {Vector2} b
	 * @param {number} u
	 */
	lerp(a, b, u) {
		this.throwIfFrozen();
		this._x = a._x + (b._x - a._x) * u;
		this._y = a._y + (b._y - a._y) * u;
	}
}

Vector2.Zero = new Vector2(0, 0);
Vector2.Zero.freeze();

Vector2.One = new Vector2(1, 1);
Vector2.One.freeze();

Vector2.Pool = new Pool(Vector2);

export default Vector2;