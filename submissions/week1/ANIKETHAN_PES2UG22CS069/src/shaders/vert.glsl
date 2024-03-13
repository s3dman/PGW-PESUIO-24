#version 300 es

layout (location=0) in vec3 position;

uniform float uTime;
uniform vec2 uResolution;

void main() {
    gl_Position = vec4(position,1.0);
}
