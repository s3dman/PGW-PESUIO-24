import Shader from "./Shader";
import { Triangle } from "./Model";

import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag.glsl";

const canvas = document.querySelector("#glcanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl2"));

if (gl === null) {
	alert("Unable to initialize WebGL.");
} else {
	gl.clearColor(0, 0, 0, 1);

	// SHADER
	const globalShader = new Shader(gl);
	globalShader.createShaders(vertexShaderSource, fragmentShaderSource);

	// DATA
	const triangle = new Triangle(gl);
	triangle.setupGeometry();

	gl.useProgram(globalShader.program);

	function renderLoop() {
		// RENDER
		gl.clear(gl.COLOR_BUFFER_BIT);
		triangle.render();
		requestAnimationFrame(renderLoop);
	}

	renderLoop();
}
