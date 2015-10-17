// right = x (0), forward = y (1), up = z (2)
// stored as [x, y, z, w] so that it can be used directly with vec3

var Quat = {};

Quat.create = function()
{
	return new Float64Array([0, 0, 0, 1]);
}

Quat.copy = function(out, q)
{
	out[0] = q[0];
	out[1] = q[1];
	out[2] = q[2];
	out[3] = q[3];
}

Quat.set = function(out, a0, a1, a2, ar)
{
	out[0] = a0;
	out[1] = a1;
	out[2] = a2;
	out[3] = ar;
}

Quat.setIdentity = function(out)
{
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
	out[3] = 1;
}

Quat.setAxisAngle = function(out, axis, angle) // the axis must be normalized
{
	var halfAngle = angle * 0.5;
	Vec3.mult(out, axis, Math.sin(halfAngle));
	out[3] = Math.cos(halfAngle);
}

Quat.setEulerAngles = function(out, v) // roll = v[1], pitch = v[0], yaw = v[2] (order is 1 then 0 then 2)
{
	var c0 = Math.cos(v[0] * 0.5);
	var s0 = Math.sin(v[0] * 0.5);
	var c1 = Math.cos(v[1] * 0.5);
	var s1 = Math.sin(v[1] * 0.5);
	var c2 = Math.cos(v[2] * 0.5);
	var s2 = Math.sin(v[2] * 0.5);
	out[0] = s0 * c1 * c2 - c0 * s1 * s2;
	out[1] = c0 * s1 * c2 + s0 * c1 * s2;
	out[2] = c0 * c1 * s2 + s0 * s1 * c2;
	out[3] = c0 * c1 * c2 - s0 * s1 * s2;
}

Quat.inverse = function(out, q)
{
	Vec3.negate(out, q);
	out[3] = q[3];
}

Quat.dot = function(q0, q1)
{
	return Vec3.dot(q0, q1) + q0[3] * q1[3];
}

Quat.norm = function(q)
{
	return Math.sqrt(Quat.dot(q, q));
}

Quat.mult = function(out, q0, q1)
{
	var q00 = q0[0]; var q01 = q0[1]; var q02 = q0[2]; var q0r = q0[3];
	var q10 = q1[0]; var q11 = q1[1]; var q12 = q1[2]; var q1r = q1[3];
	out[0] = q00 * q1r + q0r * q10 - q02 * q11 + q01 * q12;
	out[1] = q01 * q1r + q02 * q10 + q0r * q11 - q00 * q12;
	out[2] = q02 * q1r - q01 * q10 + q00 * q11 + q0r * q12;
	out[3] = q0r * q1r - q00 * q10 - q01 * q11 - q02 * q12;
}

Quat.rotate = function(out, q, v)
{
	var t = Vec3.create();
	Vec3.cross(t, q, v);
	Vec3.mult(t, t, 2.0);
	Vec3.cross(out, q, t);
	Vec3.mult(t, t, q[3]);
	Vec3.add(out, out, t);
	Vec3.add(out, out, v);
	// from http://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
}

