Scripts.require('free_controller', ['camera'], function() {
	FreeController = function(canvas, camera) {
		this._canvas = canvas;
		this._camera = camera;
		canvas.addEventListener("keydown", this._keydown.bind(this), false);
		canvas.addEventListener("keyup", this._keyup.bind(this), false);
	}

	FreeController.prototype._keydown = function(event) {
		console.log("Key down");
	}

	FreeController.prototype._keyup = function(event) {
		console.log("Key up");
	}
});