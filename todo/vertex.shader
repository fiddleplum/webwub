attribute vec3 aVertexPosition;

uniform mat4 uV2PMatrix;
uniform mat4 uW2VMatrix;

void main(void)
{
	gl_Position = uV2PMatrix * uW2VMatrix * vec4(aVertexPosition, 1.0);
}

