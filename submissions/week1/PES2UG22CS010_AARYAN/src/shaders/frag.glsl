#version 300 es
precision highp float;

out vec4 fragColor;

in vec3 vColor;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

void main() {
    fragColor = vec4(vColor.r+uMouse.x,vColor.gb,1.0);
}
