#version 300 es

layout (location=0) in vec3 position;
layout (location=1) in vec3 color;

out vec3 vColor;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uPos;

void main() {
    // gl_Position = vec4(position,1.0);
    // gl_Position = vec4(position.x*cos(uTime*position.x),position.y*cos(uTime*position.y),position.z, 1.0);
	gl_Position = vec4(position.xy+uMouse, position.z, 1.0);
	// gl_Position = vec4(position.xy+uPos, position.z, 1.0);

    vColor = color;
}