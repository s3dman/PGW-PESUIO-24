export default class Shader {
	constructor(gl) {
		this.gl = gl;
		this.program = null;
	}

	createShaders(vertexShaderSource, fragmentShaderSource) {
		const vertexShader = this.compileShader(
			vertexShaderSource,
			this.gl.VERTEX_SHADER,
		);
		const fragmentShader = this.compileShader(
			fragmentShaderSource,
			this.gl.FRAGMENT_SHADER,
		);

		this.program = this.gl.createProgram();

		this.gl.attachShader(this.program, vertexShader);
		this.gl.attachShader(this.program, fragmentShader);

		this.gl.linkProgram(this.program);

		if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
			console.error(this.gl.getProgramInfoLog(this.program));
			this.gl.deleteProgram(this.program);
		}
	}

	compileShader(source, type) {
		const shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			console.error(this.gl.getShaderInfoLog(shader));
			return null;
		}

		return shader;
	}
}
