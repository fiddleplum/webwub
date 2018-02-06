import Freezable from './freezable.js'
import Pool from './pool.js'
import Quaternion from './quaternion.js'

/**
 * A three-dimensional vector.
 */
class Vector3 extends Freezable {
	/**
	 * Constructor.
	 * Sets all components to zero.
	 * @param {number?} x
	 * @param {number?} y
	 * @param {number?} z
	 */
	constructor(x = 0, y = 0, z = 0) {
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

		/**
		 * The z component.
		 * @type {number}
		 * @private
		 */
		this._z = z;
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
	 * Gets the z component.
	 * @returns {number}
	 */
	get z() {
		return this._z;
	}

	/**
	 * Sets the z component.
	 * @param {number} z
	 */
	set z(z) {
		this.throwIfFrozen();
		this._z = z;
	}

	/**
	 * Returns true if this equals a.
	 * @param {Vector3} a
	 * @returns {boolean}
	 */
	equals(a) {
		return this._x == a._x && this._y == a._y && this._z == a._z;
	}

	/**
	 * Copies a to this.
	 * @param {Vector3} a
	 */
	copy(a) {
		this.throwIfFrozen();
		this._x = a._x;
		this._y = a._y;
		this._z = a._z;
	}

	/** 
	 * Sets this to the components x, y, and z.
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	set(x, y, z) {
		this.throwIfFrozen();
		this._x = x;
		this._y = y;
		this._z = z;
	}

	/**
	 * Sets this to the negative of a.
	 * @param {Vector3} a
	 */
	neg(a) {
		this.throwIfFrozen();
		this._x = -a._x;
		this._y = -a._y;
		this._z = -a._z;
	}

	/**
	 * Sets this to a + b.
	 * @param {Vector3} a
	 * @param {Vector3} b
	 */
	add(a, b) {
		this.throwIfFrozen();
		this._x = a._x + b._x;
		this._y = a._y + b._y;
		this._z = a._z + b._z;
	}

	/**
	 * Sets this to a - b.
	 * @param {Vector3} a
	 * @param {Vector3} b
	 */
	sub(a, b) {
		this.throwIfFrozen();
		this._x = a._x - b._x;
		this._y = a._y - b._y;
		this._z = a._z - b._z;
	}

	/**
	 * Sets this to a * b.
	 * @param {Vector3} a
	 * @param {number} b
	 */
	mult(a, b) {
		this.throwIfFrozen();
		this._x = a._x * b;
		this._y = a._y * b;
		this._z = a._z * b;
	}

	/**
	 * Sets this to a scaled by b, component-wise.
	 * @param {Vector3} a
	 * @param {Vector3} b
	 */
	scale(a, b) {
		this.throwIfFrozen();
		this._x = a._x * b._x;
		this._y = a._y * b._y;
		this._z = b._z * b._z;
	}

	/**
	 * Gets the dot product between this and a.
	 * @param {Vector3} a
	 * @returns {number}
	 */
	dot(a) {
		return this._x * a._x + this._y * a._y + this._z * a._z;
	}

	/**
	 * Gets the norm of this.
	 * @returns {number}
	 */
	norm() {
		return Math.sqrt(this.dot(this));
	}

	/** Sets this to a normalized.
	 * @param {Vector3} a
	 */
	normalize(a) {
		this.throwIfFrozen();
		let n = a.norm();
		if (n != 0) {
			this._x = a._x / n;
			this._y = a._y / n;
			this._z = a._z / n;
		}
	}

	/** Sets this to a cross b.
	 * @param {Vector3} a
	 * @param {Vector3} b
	 */
	cross(a, b) {
		this.throwIfFrozen();
		let x = a._y * b._z - a._z * b._y;
		let y = a._z * b._x - a._x * b._z;
		let z = a._x * b._y - a._y * b._x;
		this._x = x;
		this._y = y;
		this._z = z;
	}

	/** Sets this to a, clamped between min and max.
	 * @param {Vector3} a
	 * @param {number} min
	 * @param {number} max
	 */
	clamp(a, min, max) {
		this.throwIfFrozen();
		this._x = Math.max(min, Math.min(max, a._x));
		this._y = Math.max(min, Math.min(max, a._y));
		this._z = Math.max(min, Math.min(max, a._z));
	}

	/** Sets this to the lerp between a and b, with lerp factor u.
	 * @param {Vector3} a
	 * @param {Vector3} b
	 * @param {number} u
	 */
	lerp(a, b, u) {
		this.throwIfFrozen();
		this._x = a._x + (b._x - a._x) * u;
		this._y = a._y + (b._y - a._y) * u;
		this._z = a._z + (b._z - a._z) * u;
	}

	/**
	 * Sets this to b rotated by a.
	 * @param {Quaternion} a
	 * @param {Vector3} b
	 */
	rotate(a, b) {
		this.throwIfFrozen();
		let x = 2 * (a._y * b._z - a._z * b._y);
		let y = 2 * (a._z * b._x - a._x * b._z);
		let z = 2 * (a._x * b._y - a._y * b._x);
		this._x = b._x + a._w * x + a._y * z - a._z * y;
		this._y = b._y + a._w * y + a._z * x - a._x * z;
		this._z = b._z + a._w * z + a._x * y - a._y * x;
		// from http://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
	}
}

Vector3.Zero = new Vector3(0, 0, 0);
Vector3.Zero.freeze();

Vector3.One = new Vector3(1, 1, 1);
Vector3.One.freeze();

Vector3.Pool = new Pool(Vector3);

export default Vector3;