#version 300 es

layout (location=0) in vec3 position;
layout (location=1) in vec3 color;

out vec3 vColor;

uniform float uTime;
uniform vec2 uResolution;

void main() {
	// gl_Position = vec4(position.x+cos(uTime)/2.0,position.y+sin(uTime)/2.0,position.z,1.0);
	gl_Position = vec4(position,1.0);
    vColor = color;
}
