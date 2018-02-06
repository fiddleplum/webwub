import Freezable from './freezable'
import Pool from './pool'
import Vector3 from './vector3'

/**
 * A quaternion.
 */
class Quaternion extends Freezable {
	/**
	 * Constructor.
	 * @param {number?} w
	 * @param {number?} x
	 * @param {number?} y
	 * @param {number?} z
	 */
	constructor(w = 1, x = 0, y = 0, z = 0) {
		super();

		/**
		 * The w component.
		 * @type {number}
		 * @private
		 */
		this._w = w;

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
	get w() {
		return this._w;
	}

	/**
	 * Sets the x component.
	 * @param {number} w
	 */
	set w(w) {
		this.throwIfFrozen();
		this._w = w;
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
	 * @param {Quaternion} a
	 * @returns {boolean}
	 */
	equals(a) {
		return this._w == a._w && this._x == a._x && this._y == a._y && this._z == a._z;
	}

	/**
	 * Copies a to this.
	 * @param {Quaternion} a
	 */
	copy(a) {
		this.throwIfFrozen();
		this._w = a._w;
		this._x = a._x;
		this._y = a._y;
		this._z = a._z;
	}

	/** 
	 * Sets this to the components w, x, y, and z.
	 * @param {number} w
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	set(w, x, y, z) {
		this.throwIfFrozen();
		this._w = w;
		this._x = x;
		this._y = y;
		this._z = z;
	}

	/**
	 * Sets this to the quaternion represented by the rotation angle about the unit axis.
	 * @param {Vector3} axis
	 * @param {number} angle
	 */
	setAxisAngle(axis, angle) {
		this.throwIfFrozen();
		let cosHalfAngle = Math.cos(angle * 0.5);
		let sinHalfAngle = Math.sin(angle * 0.5);
		this._w = cosHalfAngle;
		this._x = sinHalfAngle * Math.cos(axis._x);
		this._y = sinHalfAngle * Math.cos(axis._y);
		this._z = sinHalfAngle * Math.cos(axis._z);
	}

	/**
	 * Sets this to the quaterion represented by the roll (x), pitch (y), and yaw (z) rotations. The order of application is x, y, then z.
	 */
	setFromEulerAngles(x, y, z) {
		this.throwIfFrozen();
		var cx = Math.cos(x * 0.5);
		var sx = Math.sin(x * 0.5);
		var cy = Math.cos(y * 0.5);
		var sy = Math.sin(y * 0.5);
		var cz = Math.cos(z * 0.5);
		var sz = Math.sin(z * 0.5);
		this._w = cx * cy * cz + sx * sy * sz;
		this._x = cx * cy * sz - sx * sy * cz;
		this._y = cx * sy * cz + sx * cy * sz;
		this._z = sx * cy * cz - cx * sy * sz;
	}

	/**
	 * Sets this to the inverse of a.
	 * @param {Quaternion} a
	 */
	inv(a) {
		this.throwIfFrozen();
		this._w = a._w;
		this._x = -a._x;
		this._y = -a._y;
		this._z = -a._z;
	}

	/**
	 * Sets this to a * b.
	 * @param {Quaternion} a
	 * @param {Quaternion} b
	 */
	mult(a, b) {
		this.throwIfFrozen();
		let tempQuaternion = Quaternion.Pool.get();
		tempQuaternion._x = a._x * b._w + a._w * b._x - a._z * b._y + a._y * b._z;
		tempQuaternion._y = a._y * b._w + a._z * b._x + a._w * b._y - a._x * b._z;
		tempQuaternion._z = a._z * b._w - a._y * b._x + a._x * b._y + a._w * b._z;
		tempQuaternion._w = a._w * b._w - a._x * b._x - a._y * b._y - a._z * b._z;
		this.copy(tempQuaternion);
		Quaternion.Pool.release(tempQuaternion);
	}

	/** Gets the dot product between this and a.
	 * @param {Quaternion} a
	 * @returns {number}
	 */
	dot(a) {
		return this._w * a._w + this._x * a._x + this._y * a._y + this._z * a._z;
	}

	/**
	 * Gets the norm of this.
	 * @returns {number}
	 */
	norm() {
		return Math.sqrt(this.dot(this));
	}

	/** Sets this to a normalized.
	 * @param {Quaternion} a
	 */
	normalize(a) {
		this.throwIfFrozen();
		let n = a.norm();
		if (n != 0) {
			this._w = a._w / n;
			this._x = a._x / n;
			this._y = a._y / n;
			this._z = a._z / n;
		}
	}

}

Quaternion.Identity = new Quaternion(1, 0, 0, 0);
Quaternion.Identity.freeze();

Quaternion.Pool = new Pool(Quaternion);

export default Quaternion;