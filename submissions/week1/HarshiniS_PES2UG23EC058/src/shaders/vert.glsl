#version 300 es
in keys, mouseX, mouseY

layout (location=0) in vec3 position;

out vec3 vColor;

uniform float uTime;
uniform vec2 uResolution;

void main() {
    gl_Position = vec4(position,1.0);
}
