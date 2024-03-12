import Shader from "./Shader";
import { Triangle, Square, Frame, Mesh } from "./Model";

import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag1.glsl";

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
	const rdata = new Triangle(gl);
	rdata.setup();

	// UNIFORMS
	const startTime = performance.now();
	let currentTime, elapsedTime;
	const uTimeLocation = gl.getUniformLocation(globalShader.program, "uTime");

	const resolution = [canvas.width, canvas.height];
	const uResolutionLocation = gl.getUniformLocation(
		globalShader.program,
		"uResolution",
	);

	gl.useProgram(globalShader.program);

	gl.uniform2fv(uResolutionLocation, resolution);

	gl.clearColor(1, 1, 1, 0);
	function renderLoop() {
		gl.clear(gl.COLOR_BUFFER_BIT);

		// UPDATE
		currentTime = performance.now();
		elapsedTime = (currentTime - startTime) / 1000;
		gl.uniform1f(uTimeLocation, elapsedTime);

		// RENDER
		rdata.render();
		requestAnimationFrame(renderLoop);
	}

	renderLoop();
}
