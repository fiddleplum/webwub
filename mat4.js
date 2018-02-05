Mat4 = {};

Mat4.create = function() { // Creates a identity 64-bit float array
	var m = new Float64Array(16);
	m[0] = 1; m[5] = 1; m[10] = 1; m[15] = 1;
	return m;
}

Mat4.create32 = function() { // Creates a identity 32-bit float array, for use in webgl calls
	var m = new Float32Array(16);
	m[0] = 1; m[5] = 1; m[10] = 1; m[15] = 1;
	return m;
}

Mat4.copy = function(out, m) {
	out[0] = m[0]; out[4] = m[4]; out[8]  = m[8];  out[12] = m[12];
	out[1] = m[1]; out[5] = m[5]; out[9]  = m[8];  out[13] = m[13];
	out[2] = m[2]; out[6] = m[6]; out[10] = m[10]; out[14] = m[14];
	out[3] = m[3]; out[7] = m[7]; out[11] = m[11]; out[15] = m[15];
}

Mat4.setZero = function(out) {
	out[0] = 0; out[4] = 0; out[8]  = 0; out[12] = 0;
	out[1] = 0; out[5] = 0; out[9]  = 0; out[13] = 0;
	out[2] = 0; out[6] = 0; out[10] = 0; out[14] = 0;
	out[3] = 0; out[7] = 0; out[11] = 0; out[15] = 0;
}

Mat4.setIdentity = function(out) {
	out[0] = 1; out[4] = 0; out[8]  = 0; out[12] = 0;
	out[1] = 0; out[5] = 1; out[9]  = 0; out[13] = 0;
	out[2] = 0; out[6] = 0; out[10] = 1; out[14] = 0;
	out[3] = 0; out[7] = 0; out[11] = 0; out[15] = 1;
}

Mat4.setTR = function(out, v, q) { // rotate then translate matrix
	out[0]  = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
	out[1]  = 2 * (q[0] * q[1] + q[3] * q[2]);
	out[2]  = 2 * (q[2] * q[0] - q[3] * q[1]);
	out[3]  = 0;
	out[4]  = 2 * (q[0] * q[1] - q[3] * q[2]);
	out[5]  = 1 - 2 * (q[2] * q[2] + q[0] * q[0]);
	out[6]  = 2 * (q[1] * q[2] + q[3] * q[0]);
	out[7]  = 0;
	out[8]  = 2 * (q[2] * q[0] + q[3] * q[1]);
	out[9]  = 2 * (q[1] * q[2] - q[3] * q[0]);
	out[10] = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
	out[11] = 0;
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1;
}

Mat4.setTRInv = function(out, v, q) { // rotate then translate matrix
	out[0]  = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
	out[1]  = 2 * (q[0] * q[1] - q[3] * q[2]);
	out[2]  = 2 * (q[2] * q[0] + q[3] * q[1]);
	out[3]  = 0;
	out[4]  = 2 * (q[0] * q[1] + q[3] * q[2]);
	out[5]  = 1 - 2 * (q[2] * q[2] + q[0] * q[0]);
	out[6]  = 2 * (q[1] * q[2] - q[3] * q[0]);
	out[7]  = 0;
	out[8]  = 2 * (q[2] * q[0] - q[3] * q[1]);
	out[9]  = 2 * (q[1] * q[2] + q[3] * q[0]);
	out[10] = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
	out[11] = 0;
	out[12] = -out[0] * v[0] - out[4] * v[1] - out[8] * v[2];
	out[13] = -out[1] * v[0] - out[5] * v[1] - out[9] * v[2];
	out[14] = -out[2] * v[0] - out[6] * v[1] - out[10] * v[2];
	out[15] = 1;
}

Mat4.setTRS = function(out, v, q, s) { // scale then rotate then translate matrix
	Mat4.setTR(out, v, q);
	out[0]  *= s[0];
	out[1]  *= s[0];
	out[2]  *= s[0];
	out[4]  *= s[1];
	out[5]  *= s[1];
	out[6]  *= s[1];
	out[8]  *= s[2];
	out[9]  *= s[2];
	out[10] *= s[2];
}

Mat4.setTRSInv = function(out, v, q, s) { // scale then rotate then translate matrix
	Mat4.setTRInv(out, v, q);
	out[0]  /= s[0];
	out[5]  /= s[1];
	out[10] /= s[2];
}

Mat4.mult = function(out, m0, m1) {
	out[0]  = m0[0] * m1[0]  + m0[4] * m1[1]  + m0[8]  * m1[2]  + m0[12] * m1[3];
	out[1]  = m0[1] * m1[0]  + m0[5] * m1[1]  + m0[9]  * m1[2]  + m0[13] * m1[3];
	out[2]  = m0[2] * m1[0]  + m0[6] * m1[1]  + m0[10] * m1[2]  + m0[14] * m1[3];
	out[3]  = m0[3] * m1[0]  + m0[7] * m1[1]  + m0[11] * m1[2]  + m0[15] * m1[3];
	out[4]  = m0[0] * m1[4]  + m0[4] * m1[5]  + m0[8]  * m1[6]  + m0[12] * m1[7];
	out[5]  = m0[1] * m1[4]  + m0[5] * m1[5]  + m0[9]  * m1[6]  + m0[13] * m1[7];
	out[6]  = m0[2] * m1[4]  + m0[6] * m1[5]  + m0[10] * m1[6]  + m0[14] * m1[7];
	out[7]  = m0[3] * m1[4]  + m0[7] * m1[5]  + m0[11] * m1[6]  + m0[15] * m1[7];
	out[8]  = m0[0] * m1[8]  + m0[4] * m1[9]  + m0[8]  * m1[10] + m0[12] * m1[11];
	out[9]  = m0[1] * m1[8]  + m0[5] * m1[9]  + m0[9]  * m1[10] + m0[13] * m1[11];
	out[10] = m0[2] * m1[8]  + m0[6] * m1[9]  + m0[10] * m1[10] + m0[14] * m1[11];
	out[11] = m0[3] * m1[8]  + m0[7] * m1[9]  + m0[11] * m1[10] + m0[15] * m1[11];
	out[12] = m0[0] * m1[12] + m0[4] * m1[13] + m0[8]  * m1[14] + m0[12] * m1[15];
	out[13] = m0[1] * m1[12] + m0[5] * m1[13] + m0[9]  * m1[14] + m0[13] * m1[15];
	out[14] = m0[2] * m1[12] + m0[6] * m1[13] + m0[10] * m1[14] + m0[14] * m1[15];
	out[15] = m0[3] * m1[12] + m0[7] * m1[13] + m0[11] * m1[14] + m0[15] * m1[15];
}

Mat4.multVec3 = function(out, m, v, w) { // returns a Vec3 and uses w as the fourth component
	out[0] = m[0] * v[0] + m[4] * v[1] + m[8]  * v[2] + m[12] * w;
	out[1] = m[1] * v[0] + m[5] * v[1] + m[9]  * v[2] + m[13] * w;
	out[2] = m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * w;
	out[3] = m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * w;
}

Mat4.toString = function(m) {
	return m[0] + ',' + m[4] + ',' + m[8]  + ',' + m[12] + '\n'
		+ m[1] + ',' + m[5] + ',' + m[9]  + ',' + m[13] + '\n'
		+ m[2] + ',' + m[6] + ',' + m[10] + ',' + m[14] + '\n'
		+ m[3] + ',' + m[7] + ',' + m[11] + ',' + m[15];
}