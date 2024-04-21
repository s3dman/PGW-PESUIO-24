import Shader from "./Shader";
import Texture from "./Texture";
import { TexMap, Cube, Triangle } from "./Model";
import { keys, mouseX, mouseY } from "./Input";

import vertexShaderSource from "./shaders/ortho.glsl";
import fragmentShaderSource from "./shaders/texture.glsl";

import sampleTexture from "./tex2.jpg";

const canvas = document.querySelector("#glcanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const resolution = [canvas.width, canvas.height];

const gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl2"));

if (gl === null) {
	alert("Unable to initialize WebGL.");
} else {
	// SHADER
	const vert = Shader.compileShader(vertexShaderSource, gl.VERTEX_SHADER, gl);
	const frag0 = Shader.compileShader(
		fragmentShaderSource,
		gl.FRAGMENT_SHADER,
		gl,
	);

	const globalShader = new Shader(gl);
	globalShader.createShaders(vert, frag0);

	// DATA
	const data = new TexMap(gl);
	data.setup();

	// TEXTURE
	const texture = new Texture(gl, 0);
	texture.createTexture(sampleTexture);

	gl.useProgram(globalShader.program);

	// UNIFORMS
	const uSamplerLocation = gl.getUniformLocation(
		globalShader.program,
		"uSampler",
	);
	gl.uniform1i(uSamplerLocation, 0);

	const startTime = performance.now();
	let currentTime, elapsedTime;
	const uTimeLocation = gl.getUniformLocation(globalShader.program, "uTime");
	const uResolutionLocation = gl.getUniformLocation(
		globalShader.program,
		"uResolution",
	);
	const uMouseLocation = gl.getUniformLocation(
		globalShader.program,
		"uMouse",
	);
	let posX = 0;
	let posY = 0;
	function updatePos(movementSpeed) {
		if (keys[72]) posX -= movementSpeed;
		if (keys[76]) posX += movementSpeed;
		if (keys[75]) posY += movementSpeed;
		if (keys[74]) posY -= movementSpeed;
	}
	const uPosLocation = gl.getUniformLocation(globalShader.program, "uPos");

	const kernels = {
		normal: [
			0, 0, 0,
			0, 1, 0,
			0, 0, 0,
		],
		gaussianBlur: [
			1, 2, 1,
			2, 4, 2,
			1, 2, 1,
		],
		gaus3: [
			0, 0, 0, 0, 0,
			0, 1, 2, 1, 0,
			0, 2, 4, 2, 0,
			0, 1, 2, 1, 0,
			0, 0, 0, 0, 0
		],
		biggaussianBlur: [
			0, 1, 2, 1, 0,
			1, 2, 4, 2, 1,
			2, 4, 8, 4, 2,
			1, 2, 4, 2, 1,
			0, 1, 2, 1, 0
		],
		unsharpen: [
			-1, -1, -1,
			-1, 9, -1,
			-1, -1, -1,
		],
		sharpen: [
			0, -1, 0,
			-1, 5, -1,
			0, -1, 0,
		],
		edgeDetect1: [
			0, -1, 0,
			-1, 4, -1,
			0, -1, 0,
		],
		edgeDetect2: [
			-1, -1, -1,
			-1, 8, -1,
			-1, -1, -1,
		],
		edgeDetect3: [
			-5, 0, 0,
			0, 0, 0,
			0, 0, 5,
		],
		edgeDetect4: [
			-1, -1, -1,
			0, 0, 0,
			1, 1, 1,
		],
		edgeDetect5: [
			-1, -1, -1,
			2, 2, 2,
			-1, -1, -1,
		],
		edgeDetect6: [
			-5, -5, -5,
			-5, 39, -5,
			-5, -5, -5,
		],
		boxBlur: [
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
		],
		triangleBlur: [
			0.0625, 0.125, 0.0625,
			0.125, 0.25, 0.125,
			0.0625, 0.125, 0.0625,
		],
		emboss: [
			-2, -1, 0,
			-1, 1, 1,
			0, 1, 2,
		],
	};

	function computeKernelWeight(kernel) {
		var weight = kernel.reduce(function(prev, curr) {
			return prev + curr;
		});
		return weight <= 0 ? 1 : weight;
	}
	const uKernelLocation = gl.getUniformLocation(globalShader.program, "uKernel");
	const uKernelWeightLocation = gl.getUniformLocation(globalShader.program, "uKernelWeight");

	const cc = kernels.sharpen;

	gl.uniform1fv(uKernelLocation, cc);
	gl.uniform1f(uKernelWeightLocation, computeKernelWeight(cc));

	const uPMLocation = gl.getUniformLocation(globalShader.program, "uPM");
	const uMVMLocation = gl.getUniformLocation(globalShader.program, "uMVM");

	const fieldOfView = (45 * Math.PI) / 180;
	const aspect = resolution[0] / resolution[1];
	const zNear = 0.1;
	const zFar = 100.0;
	const projectionMatrix = mat4.create();

	mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
	const modelViewMatrix = mat4.create();

	mat4.translate(
		modelViewMatrix,
		modelViewMatrix,
		[0.0, 0.0, -10.0]
	);

	mat4.rotate(
		modelViewMatrix,
		modelViewMatrix,
		45.0 * Math.PI / 180,
		[1, 1, 0]
	);


	gl.uniformMatrix4fv(
		uPMLocation,
		false,
		projectionMatrix
	);
	gl.uniformMatrix4fv(
		uMVMLocation,
		false,
		modelViewMatrix
	);

	gl.uniform2fv(uResolutionLocation, resolution);


	gl.clearColor(0, 0, 0, 1);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	function renderLoop() {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// UPDATE
		currentTime = performance.now();
		elapsedTime = (currentTime - startTime) / 1000;
		gl.uniform1f(uTimeLocation, elapsedTime);

		updatePos(0.01);
		gl.uniform2f(uPosLocation, posX, posY);

		gl.uniform2f(
			uMouseLocation,
			mouseX / resolution[0] - 0.5,
			0.5 - mouseY / resolution[1],
		);

		mat4.rotate(
			modelViewMatrix,
			modelViewMatrix,
			(mouseX / resolution[0] - 0.5) * 2.0 * Math.PI / 180,
			[1, 0, 0]
		);
		mat4.rotate(
			modelViewMatrix,
			modelViewMatrix,
			(0.5 - mouseY / resolution[1]) * 2.0 * Math.PI / 180,
			[0, 1, 0]
		);
		// mat4.rotate(
		// 	modelViewMatrix,
		// 	modelViewMatrix,
		// 	(posX) * Math.PI / 180,
		// 	[1, 0, 0]
		// );
		// mat4.rotate(
		// 	modelViewMatrix,
		// 	modelViewMatrix,
		// 	(posY) * Math.PI / 180,
		// 	[0, 1, 0]
		// );

		gl.uniformMatrix4fv(
			uMVMLocation,
			false,
			modelViewMatrix
		);
		data.render();

		requestAnimationFrame(renderLoop);
	}

	renderLoop();
}

