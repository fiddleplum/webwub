Scripts.require('frame', ['mat4', 'quat', 'vec3'], function() {
	Frame = function() {
		this._pos = Vec3.create();
		this._ori = Quat.create();
		this._l2wMat = Mat4.create32();
		this._w2lMat = Mat4.create32();
		this._wlMatsDirty = true;
	}

	Frame.prototype.getPos = function() {
		return this._pos;
	}

	Frame.prototype.getOri = function() {
		return this._ori;
	}

	Frame.prototype.setPos = function(pos) {
		Vec3.copy(this._pos, pos);
		this._wlMatsDirty = true;
	}

	Frame.prototype.setOri = function(ori) {
		Quat.copy(this._ori, ori);
		this._wlMatsDirty = true;
	}

	Frame.prototype.getL2WMat = function() {
		if(this._wlMatsDirty)
			this._updateMats();
		return this._l2wMat;
	}

	Frame.prototype.getW2LMat = function() {
		if(this._wlMatsDirty)
			this._updateMats();
		return this._w2lMat;
	}

	Frame.prototype._updateMats = function() {
		Mat4.setTR(this._l2wMat, this._pos, this._ori);
		Mat4.setTRInv(this._w2lMat, this._pos, this._ori);
		this._wlMatsDirty = false;
	}
});