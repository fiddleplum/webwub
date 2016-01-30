Scripts.require('camera', ['frame'], function() {
	Camera = function() {
		this._fovY = Math.PI / 3;
		this._aspectRatio = 1;
		this._near = .01;
		this._far = 10;
		this._w2vMat = Mat4.create32();
		this._v2wMat = Mat4.create32();
		this._v2pMat = Mat4.create32();
		this._v2pMat[11] = 1;
		this._v2pMat[15] = 0;
		this._p2vMat = Mat4.create32();
		this._p2vMat[6] = 0;
		this._p2vMat[14] = -1;
		this._vpMatsDirty = true;
	}

	Camera.prototype = Object.create(Frame.prototype);

	Camera.prototype.getFovY = function() {
		return this._fovY;
	}

	Camera.prototype.getAspectRatio = function() {
		return this._aspectRatio;
	}

	Camera.prototype.getNear = function() {
		return this._near;
	}

	Camera.prototype.getFar = function() {
		return this._far;
	}

	Camera.prototype.setFovY = function(fovY) {
		this._fovY = fovY;
		this._vpMatsDirty = true;
	}

	Camera.prototype.setAspectRatio = function(aspectRatio) {
		this._aspectRatio = aspectRatio;
		this._vpMatsDirty = true;
	}

	Camera.prototype.setNear = function(near) {
		this._near = near;
		this._vpMatsDirty = true;
	}

	Camera.prototype.setFar = function(far) {
		this._far = far;
		this._vpMatsDirty = true;
	}

	Camera.prototype.getW2VMat = function() {
		return this.getW2LMat();
	}

	Camera.prototype.getV2WMat = function() {
		return this.getL2WMat();
	}

	Camera.prototype.getV2PMat = function() {
		if(this._vpMatsDirty)
			this._updateVPMats();
		return this._v2pMat;
	}

	Camera.prototype.getP2VMat = function() {
		if(this._vpMatsDirty)
			this._updateVPMats();
		return this._p2vMat;
	}

	Camera.prototype._updateVPMats = function() {
		var fovYTan2 = Math.tan(this._fovY / 2);
		var fovYTan2AR = fovYTan2 * this._aspectRatio;
		var npf = this._near + this._far;
		var nmf = this._near - this._far;
		var nf2 = this._near * this._far * 2;
		this._v2pMat[0] = 1 / fovYTan2AR;
		this._v2pMat[6] = 1 / fovYTan2;
		this._v2pMat[9] = npf / nmf;
		this._v2pMat[13] = -nf2 / nmf;
		this._p2vMat[0] = fovYTan2AR;
		this._p2vMat[9] = fovYTan2;
		this._p2vMat[7] = nmf / nf2;
		this._p2vMat[15]  -npf / nf2;
		this._vpMatsDirty = false;
	}
});