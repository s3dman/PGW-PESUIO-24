#version 300 es
precision highp float;

out vec4 fragColor;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uPos;

uniform sampler2D uSampler;

in vec2 vTextureCoord;

void main() {
	fragColor = texture(uSampler,vec2(vTextureCoord.x,vTextureCoord.y));
}
