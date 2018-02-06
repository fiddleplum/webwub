class Freezable {
	constructor() {
		this._frozen = false;
	}

	freeze() {
		this._frozen = true;
	}

	thaw() {
		this._frozen = false;
	}

	throwIfFrozen() {
		if (this._frozen) {
			throw new TypeError('Attempt to modify a frozen object.');
		}
	}
}

export default Freezable;