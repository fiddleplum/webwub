import Matrix44 from './matrix44'
import Quaternion from './quaternion'
import Vector3 from './vector3'

/**
 * A 4x4 matrix that represents a scale, rotation, and a translation.
 */
class Transform extends Matrix44 {
	/**
	 * Constructor.
	 */
	constructor() {
		super();
	}

	/**
	 * Sets this to a matrix represented by a rotation r and then a translation t.
	 * @param {Vector3} t
	 * @param {Quaternion} r
	 */
	setTR(t, r) {
		this._v[0] = 1 - 2 * (r._y * r._y + r._z * r._z);
		this._v[1] = 2 * (r._x * r._y + r._w * r._z);
		this._v[2] = 2 * (r._z * r._x - r._w * r._y);
		this._v[3] = 0;
		this._v[4] = 2 * (r._x * r._y - r._w * r._z);
		this._v[5] = 1 - 2 * (r._z * r._z + r._x * r._x);
		this._v[6] = 2 * (r._y * r._z + r._w * r._x);
		this._v[7] = 0;
		this._v[8] = 2 * (r._z * r._x + r._w * r._y);
		this._v[9] = 2 * (r._y * r._z - r._w * r._x);
		this._v[10] = 1 - 2 * (r._x * r._x + r._y * r._y);
		this._v[11] = 0;
		this._v[12] = t._x;
		this._v[13] = t._y;
		this._v[14] = t._z;
		this._v[15] = 1;
	}

	/**
	 * Sets this to a matrix represented by an inverse translation t, then an inverse rotation r.
	 * @param {Vector3} t
	 * @param {Quaternion} r
	 */
	setTRInv(t, r) {
		this._v[0] = 1 - 2 * (r._y * r._y + r._z * r._z);
		this._v[1] = 2 * (r._x * r._y - r._w * r._z);
		this._v[2] = 2 * (r._z * r._x + r._w * r._y);
		this._v[3] = 0;
		this._v[4] = 2 * (r._x * r._y + r._w * r._z);
		this._v[5] = 1 - 2 * (r._z * r._z + r._x * r._x);
		this._v[6] = 2 * (r._y * r._z - r._w * r._x);
		this._v[7] = 0;
		this._v[8] = 2 * (r._z * r._x - r._w * r._y);
		this._v[9] = 2 * (r._y * r._z + r._w * r._x);
		this._v[10] = 1 - 2 * (r._x * r._x + r._y * r._y);
		this._v[11] = 0;
		this._v[12] = -this._v[0] * t._x - this._v[4] * t._y - this._v[8] * t._z;
		this._v[13] = -this._v[1] * t._x - this._v[5] * t._y - this._v[9] * t._z;
		this._v[14] = -this._v[2] * t._x - this._v[6] * t._y - this._v[10] * t._z;
		this._v[15] = 1;
	}

	/**
	 * Sets this to a matrix represented by a scale s, then a rotation r, and then a translation t.
	 * @param {Vector3} t
	 * @param {Quaternion} r
	 * @param {Vector3} s
	 */
	setTRS(t, r, s) {
		this.setTR(t, r);
		this._v[0] *= s[0];
		this._v[1] *= s[0];
		this._v[2] *= s[0];
		this._v[4] *= s[1];
		this._v[5] *= s[1];
		this._v[6] *= s[1];
		this._v[8] *= s[2];
		this._v[9] *= s[2];
		this._v[10] *= s[2];
	}

	/**
	 * Sets this to a matrix represented by an inverse translation t, then an inverse rotation r, and then an inverse scale s.
	 * @param {Vector3} t
	 * @param {Quaternion} r
	 * @param {Vector3} s
	 */
	setTRSInv(t, r, s) {
		this.setTRInv(t, r);
		this._v[0] /= s[0];
		this._v[5] /= s[1];
		this._v[10] /= s[2];
	}
}