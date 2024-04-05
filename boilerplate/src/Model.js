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
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(1);
	}
	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
}

export class Mesh extends Model {
	setup() {
		const trianglesPerSide = 5;
		const triangleSpacing = 0.3;
		const halfGridSize = ((trianglesPerSide - 1) * triangleSpacing) / 2;

		const data = new Float32Array(25 * 18);

		let index = 0;
		for (let i = 0; i < trianglesPerSide; i++) {
			for (let j = 0; j < trianglesPerSide; j++) {
				const xOffset = i * triangleSpacing - halfGridSize;
				const yOffset = j * triangleSpacing - halfGridSize;

				data.set(
					[-0.1 + xOffset, -0.1 + yOffset, 0.0, 1.0, 0.0, 0.0],
					index,
				);
				data.set(
					[0.1 + xOffset, -0.1 + yOffset, 0.0, 1.0, 0.0, 0.0],
					index + 6,
				);
				data.set(
					[0.0 + xOffset, 0.1 + yOffset, 0.0, 0.0, 0.0, 1.0],
					index + 12,
				);

				index += 18;
			}
		}

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
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 25 * 3);
	}
}
export class Frame extends Model {
	setup() {
		const data = new Float32Array([
			-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0,
			1.0, 1.0, 0.0, -1.0, 1.0, 0.0,
		]);
		this.vbo = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);

		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
	}
	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
}
export class TexMap extends Model {
	setup() {
		const data = new Float32Array([
			-1.0, -1.0, 0.0, 0.0, 0.0,
			1.0, -1.0, 0.0, 1.0, 0.0,
			1.0, 1.0, 0.0, 1.0, 1.0,
			-1.0, -1.0, 0.0, 0.0, 0.0,
			1.0, 1.0, 0.0, 1.0, 1.0,
			-1.0, 1.0, 0.0, 0.0, 1.0,
		]);

		this.vbo = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);

		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);

		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 20, 0);

		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 20, 12);
	}
	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
}

export class Cube extends Model {
	setup() {
		const pos = new Float32Array([
			-0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5, -0.5,
			0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5, -0.5,
			0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5, -0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5, 0.5,
			0.5, -0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, 0.5, -0.5,
			-0.5, 0.5, -0.5,
			0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			-0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			0.5, -0.5, 0.5
		]);
		const col = new Float32Array([
			0.583, 0.771, 0.014,
			0.609, 0.115, 0.436,
			0.327, 0.483, 0.844,
			0.822, 0.569, 0.201,
			0.435, 0.602, 0.223,
			0.310, 0.747, 0.185,
			0.597, 0.770, 0.761,
			0.559, 0.436, 0.730,
			0.359, 0.583, 0.152,
			0.483, 0.596, 0.789,
			0.559, 0.861, 0.639,
			0.195, 0.548, 0.859,
			0.014, 0.184, 0.576,
			0.771, 0.328, 0.970,
			0.406, 0.615, 0.116,
			0.676, 0.977, 0.133,
			0.971, 0.572, 0.833,
			0.140, 0.616, 0.489,
			0.997, 0.513, 0.064,
			0.945, 0.719, 0.592,
			0.543, 0.021, 0.978,
			0.279, 0.317, 0.505,
			0.167, 0.620, 0.077,
			0.347, 0.857, 0.137,
			0.055, 0.953, 0.042,
			0.714, 0.505, 0.345,
			0.783, 0.290, 0.734,
			0.722, 0.645, 0.174,
			0.302, 0.455, 0.848,
			0.225, 0.587, 0.040,
			0.517, 0.713, 0.338,
			0.053, 0.959, 0.120,
			0.393, 0.621, 0.362,
			0.673, 0.211, 0.457,
			0.820, 0.883, 0.371,
			0.982, 0.099, 0.879
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
		this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(1);

	}
	render() {
		this.gl.bindVertexArray(this.vao);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 12 * 3);
	}
}
