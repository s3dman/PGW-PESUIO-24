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
	// SHADER
	const vertexShader = Shader.compileShader(
		vertexShaderSource,
		gl.VERTEX_SHADER,
		gl,
	);
	const fragmentShader = Shader.compileShader(
		fragmentShaderSource,
		gl.FRAGMENT_SHADER,
		gl,
	);
	const globalShader = new Shader(gl);
	globalShader.createShaders(vertexShader, fragmentShader);

	// DATA
	const triangle = new Triangle(gl);
	triangle.setup();

	gl.useProgram(globalShader.program);

	gl.clearColor(0, 0, 0, 1);
	function renderLoop() {
		gl.clear(gl.COLOR_BUFFER_BIT);

		// RENDER
		triangle.render();
		requestAnimationFrame(renderLoop);
	}

	renderLoop();
}
