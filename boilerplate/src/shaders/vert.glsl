#version 300 es

layout (location=0) in vec3 position;
layout (location=1) in vec3 color;

out vec3 vColor;

uniform float uTime;
uniform vec2 uResolution;

void main() {
	// gl_Position = vec4(position.x+cos(uTime)/2.0,position.y+sin(uTime)/2.0,position.z,1.0);
	float vcount = 6.0;
	float vid = float(gl_VertexID)/vcount; // do +1
    gl_Position = vec4(position.x*cos(uTime*vid),position.y,position.z, 1.0);
    // gl_Position = vec4(position.x*cos(uTime*position.x),position.y*cos(uTime*position.y),position.z, 1.0);
	// gl_Position = vec4(position,1.0);
    vColor = color;
}
