attribute vec3 aVertexPosition;

uniform mat4 uVMMatrix;
uniform mat4 uPMatrix;

void main(void)
{
	gl_Position = vec4(aVertexPosition, 1.0);
//	gl_Position = uPMatrix * uVMMatrix * vec4(aVertexPosition, 1.0);
}

