/*

This is not a generic Vector class, because that would require loops of 3, which are about 75% slower in Chrome.
It uses an out vector so that vectors aren't constantly created and destroyed.

*/

var Vec3 = {};

Vec3.create = function()
{
	return new Float64Array(3);
}

Vec3.create32 = function()
{
	return new Float32Array(3);
}

Vec3.copy = function(out, v)
{
	out[0] = v[0];
	out[1] = v[1];
	out[2] = v[2];
}

Vec3.set = function(out, a0, a1, a2)
{
	out[0] = a0;
	out[1] = a1;
	out[2] = a2;
}

Vec3.setZero = function(out)
{
	out[0] = 0;
	out[1] = 0;
	out[2] = 0;
}

Vec3.equals = function(v0, v1)
{
	return v0[0] == v1[0] && v0[1] == v1[1] && v0[2] == v1[2];
}

Vec3.add = function(out, v0, v1)
{
	out[0] = v0[0] + v1[0];
	out[1] = v0[1] + v1[1];
	out[2] = v0[2] + v1[2];
}

Vec3.sub = function(out, v0, v1)
{
	out[0] = v0[0] - v1[0];
	out[1] = v0[1] - v1[1];
	out[2] = v0[2] - v1[2];
}

Vec3.mult = function(out, v, s)
{
	out[0] = v[0] * s;
	out[1] = v[1] * s;
	out[2] = v[2] * s;
}

Vec3.scale = function(out, v0, v1)
{
	out[0] = v0[0] * v1[0];
	out[1] = v0[1] * v1[1];
	out[2] = v0[2] * v1[2];
}

Vec3.negate = function(out, v)
{
	out[0] = -v[0];
	out[1] = -v[1];
	out[2] = -v[2];
}

Vec3.dot = function(v0, v1)
{
	return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
}

Vec3.norm = function(v)
{
	return Math.sqrt(Vec3.dot(v, v));
}

Vec3.normalize = function(out, v)
{
	Vec3.mult(out, 1.0 / Vec3.norm(v), v);
}

Vec3.cross = function(out, v0, v1)
{
	Vec3.set(out, v0[1] * v1[2] - v0[2] * v1[1], v0[2] * v1[0] - v0[0] * v1[2], v0[0] * v1[1] - v0[1] * v1[0]);
}

Vec3.clamp = function(out, v, min, max)
{
	out[0] = Math.max(min, Math.min(max, v[0]));
	out[1] = Math.max(min, Math.min(max, v[1]));
	out[2] = Math.max(min, Math.min(max, v[2]));
}

Vec3.lerp : function(out, v0, v1, t)
{
	out[0] = v0[0] + (v1[0] - v0[0]) * t;
	out[1] = v0[1] + (v1[1] - v0[1]) * t;
	out[2] = v0[2] + (v1[2] - v0[2]) * t;
}

