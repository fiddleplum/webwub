import Freezable from './freezable.js'
import Pool from './pool.js'

/**
 * A column-major 4x4 matrix.
 */
class Matrix44 extends Freezable {
	/**
	 * Constructor. Defaults to the identity matrix.
	 */
	constructor() {
		super();
		this._v = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}

	/**
	 * Gets the value at (row, col).
	 * @param {number} row
	 * @param {number} col
	 * @returns {number}
	 */
	get(row, col) {
		return this._v[col * 4 + row];
	}

	/**
	 * Sets the value at (row, col) to a.
	 * @param {number} row
	 * @param {number} col
	 * @param {number} a
	 */
	set(row, col, a) {
		this.throwIfFrozen();
		this._v[col * 4 + row] = a;
	}

	/**
	 * Copies a to this.
	 * @param {Matrix44} a
	 */
	copy(a) {
		this.throwIfFrozen();
		for (let i = 0; i < 16; i++) {
			this._v[i] = a._v[i];
		}
	}

	/**
	 * Sets this to a * b.
	 * @param {Matrix44} a
	 * @param {Matrix44} b
	 */
	mult(a, b) {
		this.throwIfFrozen();
		let tempMatrix = Matrix44.Pool.get();
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				tempMatrix._v[col * 4 + row] = 0;
				for (let k = 0; k < 4; k++) {
					tempMatrix._v[col * 4 + row] += a._v[k * 4 + row] * b._v[col * 4 + k];
				}
			}
		}
		this.copy(tempMatrix);
		Matrix44.Pool.release(tempMatrix);
	}
}

Matrix44.Identity = new Matrix44();
Matrix44.Identity.freeze();

Matrix44.Zero = new Matrix44();
Matrix44.Zero.set(0, 0, 0);
Matrix44.Zero.set(1, 1, 0);
Matrix44.Zero.set(2, 2, 0);
Matrix44.Zero.set(3, 3, 0);
Matrix44.Zero.freeze();

Matrix44.Pool = new Pool(Matrix44);

export default Matrix44;