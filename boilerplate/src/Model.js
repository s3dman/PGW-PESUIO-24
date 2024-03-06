export default class Model {
	constructor(gl) {
		this.gl = gl;
	}
}

export class Triangle extends Model {
	setup() {
		const data = new Float32Array([
			-0.2, -0.2, 0.0, 0.0, 0.0, 1.0, 0.2, -0.2, 0.0, 0.0, 1.0, 0.0, 0.0,
			0.2, 0.0, 1.0, 0.0, 0.0,
		]);

		this.vbo = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);

		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 24, 0);

		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 24, 12);
	}

	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
	}
}

export class Square extends Model {
	setup() {
		const pos = new Float32Array([
			-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, -0.5, 0.0,
			0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
		]);
		const col = new Float32Array([
			1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 1.0, 1.0, 0.0,
		]);

		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);

		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, pos, this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);

		this.colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, col, this.gl.STATIC_DRAW);
		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 0, 0);
	}
	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
}
