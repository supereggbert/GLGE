/**
 * @name jigLib
 * @class jigLib the main library class
 * @constructor
 **/
jigLib={};

/**
 * @function extend handles class inheritance
 * @param {} dest the child class
 * @param {} source the parent class
 * @type void
 **/
jigLib.extend=function(dest,source){
	for(proto in source.prototype){
		dest.prototype[proto]=source.prototype[proto];
	}
	dest.prototype.Super=source;
};(function(jigLib){
	/**
	 * @namespace JConfig a collection of configuration values
	 * @property {string} solverType the solver to use - can be one of FAST NORMAL or ACCUMULATED
	 * @property {string} boxCollisionsType can be one of EDGEBASE or SORTBASE
	 * @property {string} rotationType the unit of rotation - can be one of DEGREES or RADIANS
	 * @property {boolean} aabbDetection whether to execute aabb detection
	 * @property {boolean} doShockStep whether to perform the shock step (helps with stacking)
	 * @property {number} allowedPenetration the amount of penetration to be permitted
	 * @property {number} collToll collision detection tolerance
	 * @property {number} velThreshold the line velocity threshold for freezing
	 * @property {number} angVelThreshold the angle velocity threshold for freezing
	 * @property {number} posThreshold the threshold for detecting position changes during deactivation
	 * @property {number} orientThreshold the threshold for detecting orientation changes during deactivation
	 * @property {number} deactivationTime how long it takes to go from active to frozen when stationary
	 * @property {number} numPenetrationRelaxationTimesteps the number of timesteps over which to resolve penetration
	 * @property {number} numCollisionIterations the number of collision iterations
	 * @property {number} numContactIterations the number of contact iterations
	 * @property {number} numConstraintIterations number of constraint iterations
	 **/
	jigLib.JConfig={
		solverType: "ACCUMULATED",
		boxCollisionsType: "EDGEBASE",
		rotationType: "DEGREES",
		aabbDetection: true,
		doShockStep:  false,
		allowedPenetration: 0.015,
		collToll: 0.01,
		velThreshold: 0.1,
		angVelThreshold: 5,
		posThreshold: 0.1,
		orientThreshold: 0.1, 
		deactivationTime: 0.1, 
		numPenetrationRelaxationTimesteps: 20,
		numCollisionIterations: 4,
		numContactIterations: 5,
		numConstraintIterations: 15
	};
	 
})(jigLib);
/* 
 * glMatrix.js - High performance matrix and vector operations for WebGL
 * version 0.9.5
 */
 
/*
 * Copyright (c) 2010 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
(function(jigLib){
	// Fallback for systems that don't support WebGL
	if(typeof Float32Array != 'undefined') {
		glMatrixArrayType = Float32Array;
	} else if(typeof WebGLFloatArray != 'undefined') {
		glMatrixArrayType = WebGLFloatArray; // This is officially deprecated and should dissapear in future revisions.
	} else {
		glMatrixArrayType = Array;
	}
	
	/*
	 * vec3 - 3 Dimensional Vector
	 */
	var vec3 = {};
	
	/*
	 * vec3.create
	 * Creates a new instance of a vec3 using the default array type
	 * Any javascript array containing at least 3 numeric elements can serve as a vec3
	 *
	 * Params:
	 * vec - Optional, vec3 containing values to initialize with
	 *
	 * Returns:
	 * New vec3
	 */
	vec3.create = function(vec) {
		var dest = new glMatrixArrayType(3);
		
		if(vec) {
			dest[0] = vec[0];
			dest[1] = vec[1];
			dest[2] = vec[2];
		}
		
		return dest;
	};
	
	/*
	 * vec3.set
	 * Copies the values of one vec3 to another
	 *
	 * Params:
	 * vec - vec3 containing values to copy
	 * dest - vec3 receiving copied values
	 *
	 * Returns:
	 * dest
	 */
	vec3.set = function(vec, dest) {
		dest[0] = vec[0];
		dest[1] = vec[1];
		dest[2] = vec[2];
		
		return dest;
	};
	
	/*
	 * vec3.add
	 * Performs a vector addition
	 *
	 * Params:
	 * vec - vec3, first operand
	 * vec2 - vec3, second operand
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	vec3.add = function(vec, vec2, dest) {
		if(!dest || vec == dest) {
			vec[0] += vec2[0];
			vec[1] += vec2[1];
			vec[2] += vec2[2];
			return vec;
		}
		
		dest[0] = vec[0] + vec2[0];
		dest[1] = vec[1] + vec2[1];
		dest[2] = vec[2] + vec2[2];
		return dest;
	};
	
	/*
	 * vec3.subtract
	 * Performs a vector subtraction
	 *
	 * Params:
	 * vec - vec3, first operand
	 * vec2 - vec3, second operand
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	vec3.subtract = function(vec, vec2, dest) {
		if(!dest || vec == dest) {
			vec[0] -= vec2[0];
			vec[1] -= vec2[1];
			vec[2] -= vec2[2];
			return vec;
		}
		
		dest[0] = vec[0] - vec2[0];
		dest[1] = vec[1] - vec2[1];
		dest[2] = vec[2] - vec2[2];
		return dest;
	};
	
	/*
	 * vec3.negate
	 * Negates the components of a vec3
	 *
	 * Params:
	 * vec - vec3 to negate
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	vec3.negate = function(vec, dest) {
		if(!dest) { dest = vec; }
		
		dest[0] = -vec[0];
		dest[1] = -vec[1];
		dest[2] = -vec[2];
		return dest;
	};
	
	/*
	 * vec3.scale
	 * Multiplies the components of a vec3 by a scalar value
	 *
	 * Params:
	 * vec - vec3 to scale
	 * val - Numeric value to scale by
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	vec3.scale = function(vec, val, dest) {
		if(!dest || vec == dest) {
			vec[0] *= val;
			vec[1] *= val;
			vec[2] *= val;
			return vec;
		}
		
		dest[0] = vec[0]*val;
		dest[1] = vec[1]*val;
		dest[2] = vec[2]*val;
		return dest;
	};
	
	/*
	 * vec3.normalize
	 * Generates a unit vector of the same direction as the provided vec3
	 * If vector length is 0, returns [0, 0, 0]
	 *
	 * Params:
	 * vec - vec3 to normalize
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	vec3.normalize = function(vec, dest) {
		if(!dest) { dest = vec; }
		
		var x = vec[0], y = vec[1], z = vec[2];
		var len = Math.sqrt(x*x + y*y + z*z);
		
		if (!len) {
			dest[0] = 0;
			dest[1] = 0;
			dest[2] = 0;
			return dest;
		} else if (len == 1) {
			dest[0] = x;
			dest[1] = y;
			dest[2] = z;
			return dest;
		}
		
		len = 1 / len;
		dest[0] = x*len;
		dest[1] = y*len;
		dest[2] = z*len;
		return dest;
	};
	
	/*
	 * vec3.cross
	 * Generates the cross product of two vec3s
	 *
	 * Params:
	 * vec - vec3, first operand
	 * vec2 - vec3, second operand
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	vec3.cross = function(vec, vec2, dest){
		if(!dest) { dest = vec; }
		
		var x = vec[0], y = vec[1], z = vec[2];
		var x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];
		
		dest[0] = y*z2 - z*y2;
		dest[1] = z*x2 - x*z2;
		dest[2] = x*y2 - y*x2;
		return dest;
	};
	
	/*
	 * vec3.length
	 * Caclulates the length of a vec3
	 *
	 * Params:
	 * vec - vec3 to calculate length of
	 *
	 * Returns:
	 * Length of vec
	 */
	vec3.length = function(vec){
		var x = vec[0], y = vec[1], z = vec[2];
		return Math.sqrt(x*x + y*y + z*z);
	};
	
	/*
	 * vec3.dot
	 * Caclulates the dot product of two vec3s
	 *
	 * Params:
	 * vec - vec3, first operand
	 * vec2 - vec3, second operand
	 *
	 * Returns:
	 * Dot product of vec and vec2
	 */
	vec3.dot = function(vec, vec2){
		return vec[0]*vec2[0] + vec[1]*vec2[1] + vec[2]*vec2[2];
	};
	
	/*
	 * vec3.direction
	 * Generates a unit vector pointing from one vector to another
	 *
	 * Params:
	 * vec - origin vec3
	 * vec2 - vec3 to point to
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	vec3.direction = function(vec, vec2, dest) {
		if(!dest) { dest = vec; }
		
		var x = vec[0] - vec2[0];
		var y = vec[1] - vec2[1];
		var z = vec[2] - vec2[2];
		
		var len = Math.sqrt(x*x + y*y + z*z);
		if (!len) { 
			dest[0] = 0; 
			dest[1] = 0; 
			dest[2] = 0;
			return dest; 
		}
		
		len = 1 / len;
		dest[0] = x * len; 
		dest[1] = y * len; 
		dest[2] = z * len;
		return dest; 
	};
	
	/*
	 * vec3.str
	 * Returns a string representation of a vector
	 *
	 * Params:
	 * vec - vec3 to represent as a string
	 *
	 * Returns:
	 * string representation of vec
	 */
	vec3.str = function(vec) {
		return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']'; 
	};
	
	/*
	 * mat3 - 3x3 Matrix
	 */
	var mat3 = {};
	
	/*
	 * mat3.create
	 * Creates a new instance of a mat3 using the default array type
	 * Any javascript array containing at least 9 numeric elements can serve as a mat3
	 *
	 * Params:
	 * mat - Optional, mat3 containing values to initialize with
	 *
	 * Returns:
	 * New mat3
	 */
	mat3.create = function(mat) {
		var dest = new glMatrixArrayType(9);
		
		if(mat) {
			dest[0] = mat[0];
			dest[1] = mat[1];
			dest[2] = mat[2];
			dest[3] = mat[3];
			dest[4] = mat[4];
			dest[5] = mat[5];
			dest[6] = mat[6];
			dest[7] = mat[7];
			dest[8] = mat[8];
			dest[9] = mat[9];
		}
		
		return dest;
	};
	
	/*
	 * mat3.set
	 * Copies the values of one mat3 to another
	 *
	 * Params:
	 * mat - mat3 containing values to copy
	 * dest - mat3 receiving copied values
	 *
	 * Returns:
	 * dest
	 */
	mat3.set = function(mat, dest) {
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		dest[8] = mat[8];
		return dest;
	};
	
	/*
	 * mat3.identity
	 * Sets a mat3 to an identity matrix
	 *
	 * Params:
	 * dest - mat3 to set
	 *
	 * Returns:
	 * dest
	 */
	mat3.identity = function(dest) {
		dest[0] = 1;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		dest[4] = 1;
		dest[5] = 0;
		dest[6] = 0;
		dest[7] = 0;
		dest[8] = 1;
		return dest;
	};
	
	/*
	 * mat3.toMat4
	 * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
	 *
	 * Params:
	 * mat - mat3 containing values to copy
	 * dest - Optional, mat4 receiving copied values
	 *
	 * Returns:
	 * dest if specified, a new mat4 otherwise
	 */
	mat3.toMat4 = function(mat, dest) {
		if(!dest) { dest = mat4.create(); }
		
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = 0;
	
		dest[4] = mat[3];
		dest[5] = mat[4];
		dest[6] = mat[5];
		dest[7] = 0;
	
		dest[8] = mat[6];
		dest[9] = mat[7];
		dest[10] = mat[8];
		dest[11] = 0;
	
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = 0;
		dest[15] = 1;
		
		return dest;
	};
	
	/*
	 * mat3.str
	 * Returns a string representation of a mat3
	 *
	 * Params:
	 * mat - mat3 to represent as a string
	 *
	 * Returns:
	 * string representation of mat
	 */
	mat3.str = function(mat) {
		return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + 
			', ' + mat[3] + ', '+ mat[4] + ', ' + mat[5] + 
			', ' + mat[6] + ', ' + mat[7] + ', '+ mat[8] + ']';
	};
	
	/*
	 * mat4 - 4x4 Matrix
	 */
	var mat4 = {};
	
	/*
	 * mat4.create
	 * Creates a new instance of a mat4 using the default array type
	 * Any javascript array containing at least 16 numeric elements can serve as a mat4
	 *
	 * Params:
	 * mat - Optional, mat4 containing values to initialize with
	 *
	 * Returns:
	 * New mat4
	 */
	mat4.create = function(mat) {
		var dest = new glMatrixArrayType(16);
		
		if(mat) {
			dest[0] = mat[0];
			dest[1] = mat[1];
			dest[2] = mat[2];
			dest[3] = mat[3];
			dest[4] = mat[4];
			dest[5] = mat[5];
			dest[6] = mat[6];
			dest[7] = mat[7];
			dest[8] = mat[8];
			dest[9] = mat[9];
			dest[10] = mat[10];
			dest[11] = mat[11];
			dest[12] = mat[12];
			dest[13] = mat[13];
			dest[14] = mat[14];
			dest[15] = mat[15];
		}
		
		return dest;
	};
	
	/*
	 * mat4.set
	 * Copies the values of one mat4 to another
	 *
	 * Params:
	 * mat - mat4 containing values to copy
	 * dest - mat4 receiving copied values
	 *
	 * Returns:
	 * dest
	 */
	mat4.set = function(mat, dest) {
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		dest[8] = mat[8];
		dest[9] = mat[9];
		dest[10] = mat[10];
		dest[11] = mat[11];
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
		return dest;
	};
	
	/*
	 * mat4.identity
	 * Sets a mat4 to an identity matrix
	 *
	 * Params:
	 * dest - mat4 to set
	 *
	 * Returns:
	 * dest
	 */
	mat4.identity = function(dest) {
		dest[0] = 1;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		dest[4] = 0;
		dest[5] = 1;
		dest[6] = 0;
		dest[7] = 0;
		dest[8] = 0;
		dest[9] = 0;
		dest[10] = 1;
		dest[11] = 0;
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = 0;
		dest[15] = 1;
		return dest;
	};
	
	/*
	 * mat4.transpose
	 * Transposes a mat4 (flips the values over the diagonal)
	 *
	 * Params:
	 * mat - mat4 to transpose
	 * dest - Optional, mat4 receiving transposed values. If not specified result is written to mat
	 *
	 * Returns:
	 * dest is specified, mat otherwise
	 */
	mat4.transpose = function(mat, dest) {
		// If we are transposing ourselves we can skip a few steps but have to cache some values
		if(!dest || mat == dest) { 
			var a01 = mat[1], a02 = mat[2], a03 = mat[3];
			var a12 = mat[6], a13 = mat[7];
			var a23 = mat[11];
			
			mat[1] = mat[4];
			mat[2] = mat[8];
			mat[3] = mat[12];
			mat[4] = a01;
			mat[6] = mat[9];
			mat[7] = mat[13];
			mat[8] = a02;
			mat[9] = a12;
			mat[11] = mat[14];
			mat[12] = a03;
			mat[13] = a13;
			mat[14] = a23;
			return mat;
		}
		
		dest[0] = mat[0];
		dest[1] = mat[4];
		dest[2] = mat[8];
		dest[3] = mat[12];
		dest[4] = mat[1];
		dest[5] = mat[5];
		dest[6] = mat[9];
		dest[7] = mat[13];
		dest[8] = mat[2];
		dest[9] = mat[6];
		dest[10] = mat[10];
		dest[11] = mat[14];
		dest[12] = mat[3];
		dest[13] = mat[7];
		dest[14] = mat[11];
		dest[15] = mat[15];
		return dest;
	};
	
	/*
	 * mat4.determinant
	 * Calculates the determinant of a mat4
	 *
	 * Params:
	 * mat - mat4 to calculate determinant of
	 *
	 * Returns:
	 * determinant of mat
	 */
	mat4.determinant = function(mat) {
		// Cache the matrix values (makes for huge speed increases!)
		var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
		var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
		return	a30*a21*a12*a03 - a20*a31*a12*a03 - a30*a11*a22*a03 + a10*a31*a22*a03 +
				a20*a11*a32*a03 - a10*a21*a32*a03 - a30*a21*a02*a13 + a20*a31*a02*a13 +
				a30*a01*a22*a13 - a00*a31*a22*a13 - a20*a01*a32*a13 + a00*a21*a32*a13 +
				a30*a11*a02*a23 - a10*a31*a02*a23 - a30*a01*a12*a23 + a00*a31*a12*a23 +
				a10*a01*a32*a23 - a00*a11*a32*a23 - a20*a11*a02*a33 + a10*a21*a02*a33 +
				a20*a01*a12*a33 - a00*a21*a12*a33 - a10*a01*a22*a33 + a00*a11*a22*a33;
	};
	
	/*
	 * mat4.inverse
	 * Calculates the inverse matrix of a mat4
	 *
	 * Params:
	 * mat - mat4 to calculate inverse of
	 * dest - Optional, mat4 receiving inverse matrix. If not specified result is written to mat
	 *
	 * Returns:
	 * dest is specified, mat otherwise
	 */
	mat4.inverse = function(mat, dest) {
		if(!dest) { dest = mat; }
		
		// Cache the matrix values (makes for huge speed increases!)
		var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
		var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
		
		var b00 = a00*a11 - a01*a10;
		var b01 = a00*a12 - a02*a10;
		var b02 = a00*a13 - a03*a10;
		var b03 = a01*a12 - a02*a11;
		var b04 = a01*a13 - a03*a11;
		var b05 = a02*a13 - a03*a12;
		var b06 = a20*a31 - a21*a30;
		var b07 = a20*a32 - a22*a30;
		var b08 = a20*a33 - a23*a30;
		var b09 = a21*a32 - a22*a31;
		var b10 = a21*a33 - a23*a31;
		var b11 = a22*a33 - a23*a32;
		
		// Calculate the determinant (inlined to avoid double-caching)
		var invDet = 1/(b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);
		
		dest[0] = (a11*b11 - a12*b10 + a13*b09)*invDet;
		dest[1] = (-a01*b11 + a02*b10 - a03*b09)*invDet;
		dest[2] = (a31*b05 - a32*b04 + a33*b03)*invDet;
		dest[3] = (-a21*b05 + a22*b04 - a23*b03)*invDet;
		dest[4] = (-a10*b11 + a12*b08 - a13*b07)*invDet;
		dest[5] = (a00*b11 - a02*b08 + a03*b07)*invDet;
		dest[6] = (-a30*b05 + a32*b02 - a33*b01)*invDet;
		dest[7] = (a20*b05 - a22*b02 + a23*b01)*invDet;
		dest[8] = (a10*b10 - a11*b08 + a13*b06)*invDet;
		dest[9] = (-a00*b10 + a01*b08 - a03*b06)*invDet;
		dest[10] = (a30*b04 - a31*b02 + a33*b00)*invDet;
		dest[11] = (-a20*b04 + a21*b02 - a23*b00)*invDet;
		dest[12] = (-a10*b09 + a11*b07 - a12*b06)*invDet;
		dest[13] = (a00*b09 - a01*b07 + a02*b06)*invDet;
		dest[14] = (-a30*b03 + a31*b01 - a32*b00)*invDet;
		dest[15] = (a20*b03 - a21*b01 + a22*b00)*invDet;
		
		return dest;
	};
	
	/*
	 * mat4.toRotationMat
	 * Copies the upper 3x3 elements of a mat4 into another mat4
	 *
	 * Params:
	 * mat - mat4 containing values to copy
	 * dest - Optional, mat4 receiving copied values
	 *
	 * Returns:
	 * dest is specified, a new mat4 otherwise
	 */
	mat4.toRotationMat = function(mat, dest) {
		if(!dest) { dest = mat4.create(); }
		
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		dest[8] = mat[8];
		dest[9] = mat[9];
		dest[10] = mat[10];
		dest[11] = mat[11];
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = 0;
		dest[15] = 1;
		
		return dest;
	};
	
	/*
	 * mat4.toMat3
	 * Copies the upper 3x3 elements of a mat4 into a mat3
	 *
	 * Params:
	 * mat - mat4 containing values to copy
	 * dest - Optional, mat3 receiving copied values
	 *
	 * Returns:
	 * dest is specified, a new mat3 otherwise
	 */
	mat4.toMat3 = function(mat, dest) {
		if(!dest) { dest = mat3.create(); }
		
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[4];
		dest[4] = mat[5];
		dest[5] = mat[6];
		dest[6] = mat[8];
		dest[7] = mat[9];
		dest[8] = mat[10];
		
		return dest;
	};
	
	/*
	 * mat4.toInverseMat3
	 * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
	 * The resulting matrix is useful for calculating transformed normals
	 *
	 * Params:
	 * mat - mat4 containing values to invert and copy
	 * dest - Optional, mat3 receiving values
	 *
	 * Returns:
	 * dest is specified, a new mat3 otherwise
	 */
	mat4.toInverseMat3 = function(mat, dest) {
		// Cache the matrix values (makes for huge speed increases!)
		var a00 = mat[0], a01 = mat[1], a02 = mat[2];
		var a10 = mat[4], a11 = mat[5], a12 = mat[6];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10];
		
		var b01 = a22*a11-a12*a21;
		var b11 = -a22*a10+a12*a20;
		var b21 = a21*a10-a11*a20;
			
		var d = a00*b01 + a01*b11 + a02*b21;
		if (!d) { return null; }
		var id = 1/d;
		
		if(!dest) { dest = mat3.create(); }
		
		dest[0] = b01*id;
		dest[1] = (-a22*a01 + a02*a21)*id;
		dest[2] = (a12*a01 - a02*a11)*id;
		dest[3] = b11*id;
		dest[4] = (a22*a00 - a02*a20)*id;
		dest[5] = (-a12*a00 + a02*a10)*id;
		dest[6] = b21*id;
		dest[7] = (-a21*a00 + a01*a20)*id;
		dest[8] = (a11*a00 - a01*a10)*id;
		
		return dest;
	};
	
	/*
	 * mat4.multiply
	 * Performs a matrix multiplication
	 *
	 * Params:
	 * mat - mat4, first operand
	 * mat2 - mat4, second operand
	 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
	 *
	 * Returns:
	 * dest if specified, mat otherwise
	 */
	mat4.multiply = function(mat, mat2, dest) {
		if(!dest) { dest = mat; }
		
		// Cache the matrix values (makes for huge speed increases!)
		var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
		var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
		
		var b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3];
		var b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7];
		var b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11];
		var b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];
		
		dest[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
		dest[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
		dest[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
		dest[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
		dest[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
		dest[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
		dest[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
		dest[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
		dest[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
		dest[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
		dest[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
		dest[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
		dest[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
		dest[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
		dest[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
		dest[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
		
		return dest;
	};
	
	/*
	 * mat4.multiplyVec3
	 * Transforms a vec3 with the given matrix
	 * 4th vector component is implicitly '1'
	 *
	 * Params:
	 * mat - mat4 to transform the vector with
	 * vec - vec3 to transform
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	mat4.multiplyVec3 = function(mat, vec, dest) {
		if(!dest) { dest = vec; }
		
		var x = vec[0], y = vec[1], z = vec[2];
		
		dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
		dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
		dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
		
		return dest;
	};
	
	/*
	 * mat4.multiplyVec4
	 * Transforms a vec4 with the given matrix
	 *
	 * Params:
	 * mat - mat4 to transform the vector with
	 * vec - vec4 to transform
	 * dest - Optional, vec4 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	mat4.multiplyVec4 = function(mat, vec, dest) {
		if(!dest) { dest = vec; }
		
		var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
		
		dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12]*w;
		dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13]*w;
		dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14]*w;
		dest[4] = mat[4]*x + mat[7]*y + mat[11]*z + mat[15]*w;
		
		return dest;
	};
	
	/*
	 * mat4.translate
	 * Translates a matrix by the given vector
	 *
	 * Params:
	 * mat - mat4 to translate
	 * vec - vec3 specifying the translation
	 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
	 *
	 * Returns:
	 * dest if specified, mat otherwise
	 */
	mat4.translate = function(mat, vec, dest) {
		var x = vec[0], y = vec[1], z = vec[2];
		
		if(!dest || mat == dest) {
			mat[12] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
			mat[13] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
			mat[14] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
			mat[15] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15];
			return mat;
		}
		
		var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
		
		dest[0] = a00;
		dest[1] = a01;
		dest[2] = a02;
		dest[3] = a03;
		dest[4] = a10;
		dest[5] = a11;
		dest[6] = a12;
		dest[7] = a13;
		dest[8] = a20;
		dest[9] = a21;
		dest[10] = a22;
		dest[11] = a23;
		
		dest[12] = a00*x + a10*y + a20*z + mat[12];
		dest[13] = a01*x + a11*y + a21*z + mat[13];
		dest[14] = a02*x + a12*y + a22*z + mat[14];
		dest[15] = a03*x + a13*y + a23*z + mat[15];
		return dest;
	};
	
	/*
	 * mat4.scale
	 * Scales a matrix by the given vector
	 *
	 * Params:
	 * mat - mat4 to scale
	 * vec - vec3 specifying the scale for each axis
	 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
	 *
	 * Returns:
	 * dest if specified, mat otherwise
	 */
	mat4.scale = function(mat, vec, dest) {
		var x = vec[0], y = vec[1], z = vec[2];
		
		if(!dest || mat == dest) {
			mat[0] *= x;
			mat[1] *= x;
			mat[2] *= x;
			mat[3] *= x;
			mat[4] *= y;
			mat[5] *= y;
			mat[6] *= y;
			mat[7] *= y;
			mat[8] *= z;
			mat[9] *= z;
			mat[10] *= z;
			mat[11] *= z;
			return mat;
		}
		
		dest[0] = mat[0]*x;
		dest[1] = mat[1]*x;
		dest[2] = mat[2]*x;
		dest[3] = mat[3]*x;
		dest[4] = mat[4]*y;
		dest[5] = mat[5]*y;
		dest[6] = mat[6]*y;
		dest[7] = mat[7]*y;
		dest[8] = mat[8]*z;
		dest[9] = mat[9]*z;
		dest[10] = mat[10]*z;
		dest[11] = mat[11]*z;
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
		return dest;
	};
	
	/*
	 * mat4.rotate
	 * Rotates a matrix by the given angle around the specified axis
	 * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
	 *
	 * Params:
	 * mat - mat4 to rotate
	 * angle - angle (in radians) to rotate
	 * axis - vec3 representing the axis to rotate around 
	 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
	 *
	 * Returns:
	 * dest if specified, mat otherwise
	 */
	mat4.rotate = function(mat, angle, axis, dest) {
		var x = axis[0], y = axis[1], z = axis[2];
		var len = Math.sqrt(x*x + y*y + z*z);
		if (!len) { return null; }
		if (len != 1) {
			len = 1 / len;
			x *= len; 
			y *= len; 
			z *= len;
		}
		
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		var t = 1-c;
		
		// Cache the matrix values (makes for huge speed increases!)
		var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
		
		// Construct the elements of the rotation matrix
		var b00 = x*x*t + c, b01 = y*x*t + z*s, b02 = z*x*t - y*s;
		var b10 = x*y*t - z*s, b11 = y*y*t + c, b12 = z*y*t + x*s;
		var b20 = x*z*t + y*s, b21 = y*z*t - x*s, b22 = z*z*t + c;
		
		if(!dest) { 
			dest = mat; 
		} else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
			dest[12] = mat[12];
			dest[13] = mat[13];
			dest[14] = mat[14];
			dest[15] = mat[15];
		}
		
		// Perform rotation-specific matrix multiplication
		dest[0] = a00*b00 + a10*b01 + a20*b02;
		dest[1] = a01*b00 + a11*b01 + a21*b02;
		dest[2] = a02*b00 + a12*b01 + a22*b02;
		dest[3] = a03*b00 + a13*b01 + a23*b02;
		
		dest[4] = a00*b10 + a10*b11 + a20*b12;
		dest[5] = a01*b10 + a11*b11 + a21*b12;
		dest[6] = a02*b10 + a12*b11 + a22*b12;
		dest[7] = a03*b10 + a13*b11 + a23*b12;
		
		dest[8] = a00*b20 + a10*b21 + a20*b22;
		dest[9] = a01*b20 + a11*b21 + a21*b22;
		dest[10] = a02*b20 + a12*b21 + a22*b22;
		dest[11] = a03*b20 + a13*b21 + a23*b22;
		return dest;
	};
	
	/*
	 * mat4.rotateX
	 * Rotates a matrix by the given angle around the X axis
	 *
	 * Params:
	 * mat - mat4 to rotate
	 * angle - angle (in radians) to rotate
	 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
	 *
	 * Returns:
	 * dest if specified, mat otherwise
	 */
	mat4.rotateX = function(mat, angle, dest) {
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		
		// Cache the matrix values (makes for huge speed increases!)
		var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	
		if(!dest) { 
			dest = mat; 
		} else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
			dest[0] = mat[0];
			dest[1] = mat[1];
			dest[2] = mat[2];
			dest[3] = mat[3];
			
			dest[12] = mat[12];
			dest[13] = mat[13];
			dest[14] = mat[14];
			dest[15] = mat[15];
		}
		
		// Perform axis-specific matrix multiplication
		dest[4] = a10*c + a20*s;
		dest[5] = a11*c + a21*s;
		dest[6] = a12*c + a22*s;
		dest[7] = a13*c + a23*s;
		
		dest[8] = a10*-s + a20*c;
		dest[9] = a11*-s + a21*c;
		dest[10] = a12*-s + a22*c;
		dest[11] = a13*-s + a23*c;
		return dest;
	};
	
	/*
	 * mat4.rotateY
	 * Rotates a matrix by the given angle around the Y axis
	 *
	 * Params:
	 * mat - mat4 to rotate
	 * angle - angle (in radians) to rotate
	 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
	 *
	 * Returns:
	 * dest if specified, mat otherwise
	 */
	mat4.rotateY = function(mat, angle, dest) {
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		
		// Cache the matrix values (makes for huge speed increases!)
		var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
		
		if(!dest) { 
			dest = mat; 
		} else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
			dest[4] = mat[4];
			dest[5] = mat[5];
			dest[6] = mat[6];
			dest[7] = mat[7];
			
			dest[12] = mat[12];
			dest[13] = mat[13];
			dest[14] = mat[14];
			dest[15] = mat[15];
		}
		
		// Perform axis-specific matrix multiplication
		dest[0] = a00*c + a20*-s;
		dest[1] = a01*c + a21*-s;
		dest[2] = a02*c + a22*-s;
		dest[3] = a03*c + a23*-s;
		
		dest[8] = a00*s + a20*c;
		dest[9] = a01*s + a21*c;
		dest[10] = a02*s + a22*c;
		dest[11] = a03*s + a23*c;
		return dest;
	};
	
	/*
	 * mat4.rotateZ
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * Params:
	 * mat - mat4 to rotate
	 * angle - angle (in radians) to rotate
	 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
	 *
	 * Returns:
	 * dest if specified, mat otherwise
	 */
	mat4.rotateZ = function(mat, angle, dest) {
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		
		// Cache the matrix values (makes for huge speed increases!)
		var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
		
		if(!dest) { 
			dest = mat; 
		} else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
			dest[8] = mat[8];
			dest[9] = mat[9];
			dest[10] = mat[10];
			dest[11] = mat[11];
			
			dest[12] = mat[12];
			dest[13] = mat[13];
			dest[14] = mat[14];
			dest[15] = mat[15];
		}
		
		// Perform axis-specific matrix multiplication
		dest[0] = a00*c + a10*s;
		dest[1] = a01*c + a11*s;
		dest[2] = a02*c + a12*s;
		dest[3] = a03*c + a13*s;
		
		dest[4] = a00*-s + a10*c;
		dest[5] = a01*-s + a11*c;
		dest[6] = a02*-s + a12*c;
		dest[7] = a03*-s + a13*c;
		
		return dest;
	};
	
	/*
	 * mat4.frustum
	 * Generates a frustum matrix with the given bounds
	 *
	 * Params:
	 * left, right - scalar, left and right bounds of the frustum
	 * bottom, top - scalar, bottom and top bounds of the frustum
	 * near, far - scalar, near and far bounds of the frustum
	 * dest - Optional, mat4 frustum matrix will be written into
	 *
	 * Returns:
	 * dest if specified, a new mat4 otherwise
	 */
	mat4.frustum = function(left, right, bottom, top, near, far, dest) {
		if(!dest) { dest = mat4.create(); }
		var rl = (right - left);
		var tb = (top - bottom);
		var fn = (far - near);
		dest[0] = (near*2) / rl;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		dest[4] = 0;
		dest[5] = (near*2) / tb;
		dest[6] = 0;
		dest[7] = 0;
		dest[8] = (right + left) / rl;
		dest[9] = (top + bottom) / tb;
		dest[10] = -(far + near) / fn;
		dest[11] = -1;
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = -(far*near*2) / fn;
		dest[15] = 0;
		return dest;
	};
	
	/*
	 * mat4.perspective
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * Params:
	 * fovy - scalar, vertical field of view
	 * aspect - scalar, aspect ratio. typically viewport width/height
	 * near, far - scalar, near and far bounds of the frustum
	 * dest - Optional, mat4 frustum matrix will be written into
	 *
	 * Returns:
	 * dest if specified, a new mat4 otherwise
	 */
	mat4.perspective = function(fovy, aspect, near, far, dest) {
		var top = near*Math.tan(fovy*Math.PI / 360.0);
		var right = top*aspect;
		return mat4.frustum(-right, right, -top, top, near, far, dest);
	};
	
	/*
	 * mat4.ortho
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * Params:
	 * left, right - scalar, left and right bounds of the frustum
	 * bottom, top - scalar, bottom and top bounds of the frustum
	 * near, far - scalar, near and far bounds of the frustum
	 * dest - Optional, mat4 frustum matrix will be written into
	 *
	 * Returns:
	 * dest if specified, a new mat4 otherwise
	 */
	mat4.ortho = function(left, right, bottom, top, near, far, dest) {
		if(!dest) { dest = mat4.create(); }
		var rl = (right - left);
		var tb = (top - bottom);
		var fn = (far - near);
		dest[0] = 2 / rl;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		dest[4] = 0;
		dest[5] = 2 / tb;
		dest[6] = 0;
		dest[7] = 0;
		dest[8] = 0;
		dest[9] = 0;
		dest[10] = -2 / fn;
		dest[11] = 0;
		dest[12] = -(left + right) / rl;
		dest[13] = -(top + bottom) / tb;
		dest[14] = -(far + near) / fn;
		dest[15] = 1;
		return dest;
	};
	
	/*
	 * mat4.ortho
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * Params:
	 * eye - vec3, position of the viewer
	 * center - vec3, point the viewer is looking at
	 * up - vec3 pointing "up"
	 * dest - Optional, mat4 frustum matrix will be written into
	 *
	 * Returns:
	 * dest if specified, a new mat4 otherwise
	 */
	mat4.lookAt = function(eye, center, up, dest) {
		if(!dest) { dest = mat4.create(); }
		
		var eyex = eye[0],
			eyey = eye[1],
			eyez = eye[2],
			upx = up[0],
			upy = up[1],
			upz = up[2],
			centerx = center[0],
			centery = center[1],
			centerz = center[2];
	
		if (eyex == centerx && eyey == centery && eyez == centerz) {
			return mat4.identity(dest);
		}
		
		var z0,z1,z2,x0,x1,x2,y0,y1,y2,len;
		
		//vec3.direction(eye, center, z);
		z0 = eyex - center[0];
		z1 = eyey - center[1];
		z2 = eyez - center[2];
		
		// normalize (no check needed for 0 because of early return)
		len = 1/Math.sqrt(z0*z0 + z1*z1 + z2*z2);
		z0 *= len;
		z1 *= len;
		z2 *= len;
		
		//vec3.normalize(vec3.cross(up, z, x));
		x0 = upy*z2 - upz*z1;
		x1 = upz*z0 - upx*z2;
		x2 = upx*z1 - upy*z0;
		len = Math.sqrt(x0*x0 + x1*x1 + x2*x2);
		if (!len) {
			x0 = 0;
			x1 = 0;
			x2 = 0;
		} else {
			len = 1/len;
			x0 *= len;
			x1 *= len;
			x2 *= len;
		};
		
		//vec3.normalize(vec3.cross(z, x, y));
		y0 = z1*x2 - z2*x1;
		y1 = z2*x0 - z0*x2;
		y2 = z0*x1 - z1*x0;
		
		len = Math.sqrt(y0*y0 + y1*y1 + y2*y2);
		if (!len) {
			y0 = 0;
			y1 = 0;
			y2 = 0;
		} else {
			len = 1/len;
			y0 *= len;
			y1 *= len;
			y2 *= len;
		}
		
		dest[0] = x0;
		dest[1] = y0;
		dest[2] = z0;
		dest[3] = 0;
		dest[4] = x1;
		dest[5] = y1;
		dest[6] = z1;
		dest[7] = 0;
		dest[8] = x2;
		dest[9] = y2;
		dest[10] = z2;
		dest[11] = 0;
		dest[12] = -(x0*eyex + x1*eyey + x2*eyez);
		dest[13] = -(y0*eyex + y1*eyey + y2*eyez);
		dest[14] = -(z0*eyex + z1*eyey + z2*eyez);
		dest[15] = 1;
		
		return dest;
	};
	
	/*
	 * mat4.str
	 * Returns a string representation of a mat4
	 *
	 * Params:
	 * mat - mat4 to represent as a string
	 *
	 * Returns:
	 * string representation of mat
	 */
	mat4.str = function(mat) {
		return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] + 
			', '+ mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] + 
			', '+ mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] + 
			', '+ mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
	};
	
	/*
	 * quat4 - Quaternions 
	 */
	quat4 = {};
	
	/*
	 * quat4.create
	 * Creates a new instance of a quat4 using the default array type
	 * Any javascript array containing at least 4 numeric elements can serve as a quat4
	 *
	 * Params:
	 * quat - Optional, quat4 containing values to initialize with
	 *
	 * Returns:
	 * New quat4
	 */
	quat4.create = function(quat) {
		var dest = new glMatrixArrayType(4);
		
		if(quat) {
			dest[0] = quat[0];
			dest[1] = quat[1];
			dest[2] = quat[2];
			dest[3] = quat[3];
		}
		
		return dest;
	};
	
	/*
	 * quat4.set
	 * Copies the values of one quat4 to another
	 *
	 * Params:
	 * quat - quat4 containing values to copy
	 * dest - quat4 receiving copied values
	 *
	 * Returns:
	 * dest
	 */
	quat4.set = function(quat, dest) {
		dest[0] = quat[0];
		dest[1] = quat[1];
		dest[2] = quat[2];
		dest[3] = quat[3];
		
		return dest;
	};
	
	/*
	 * quat4.calculateW
	 * Calculates the W component of a quat4 from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length. 
	 * Any existing W component will be ignored. 
	 *
	 * Params:
	 * quat - quat4 to calculate W component of
	 * dest - Optional, quat4 receiving calculated values. If not specified result is written to quat
	 *
	 * Returns:
	 * dest if specified, quat otherwise
	 */
	quat4.calculateW = function(quat, dest) {
		var x = quat[0], y = quat[1], z = quat[2];
	
		if(!dest || quat == dest) {
			quat[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
			return quat;
		}
		dest[0] = x;
		dest[1] = y;
		dest[2] = z;
		dest[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
		return dest;
	};
	
	/*
	 * quat4.inverse
	 * Calculates the inverse of a quat4
	 *
	 * Params:
	 * quat - quat4 to calculate inverse of
	 * dest - Optional, quat4 receiving inverse values. If not specified result is written to quat
	 *
	 * Returns:
	 * dest if specified, quat otherwise
	 */
	quat4.inverse = function(quat, dest) {
		if(!dest || quat == dest) {
			quat[0] *= 1;
			quat[1] *= 1;
			quat[2] *= 1;
			return quat;
		}
		dest[0] = -quat[0];
		dest[1] = -quat[1];
		dest[2] = -quat[2];
		dest[3] = quat[3];
		return dest;
	};
	
	/*
	 * quat4.length
	 * Calculates the length of a quat4
	 *
	 * Params:
	 * quat - quat4 to calculate length of
	 *
	 * Returns:
	 * Length of quat
	 */
	quat4.length = function(quat) {
		var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
		return Math.sqrt(x*x + y*y + z*z + w*w);
	};
	
	/*
	 * quat4.normalize
	 * Generates a unit quaternion of the same direction as the provided quat4
	 * If quaternion length is 0, returns [0, 0, 0, 0]
	 *
	 * Params:
	 * quat - quat4 to normalize
	 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
	 *
	 * Returns:
	 * dest if specified, quat otherwise
	 */
	quat4.normalize = function(quat, dest) {
		if(!dest) { dest = quat; }
		
		var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
		var len = Math.sqrt(x*x + y*y + z*z + w*w);
		if(len == 0) {
			dest[0] = 0;
			dest[1] = 0;
			dest[2] = 0;
			dest[3] = 0;
			return dest;
		}
		len = 1/len;
		dest[0] = x * len;
		dest[1] = y * len;
		dest[2] = z * len;
		dest[3] = w * len;
		
		return dest;
	};
	
	/*
	 * quat4.multiply
	 * Performs a quaternion multiplication
	 *
	 * Params:
	 * quat - quat4, first operand
	 * quat2 - quat4, second operand
	 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
	 *
	 * Returns:
	 * dest if specified, quat otherwise
	 */
	quat4.multiply = function(quat, quat2, dest) {
		if(!dest) { dest = quat; }
		
		var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3];
		var qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];
		
		dest[0] = qax*qbw + qaw*qbx + qay*qbz - qaz*qby;
		dest[1] = qay*qbw + qaw*qby + qaz*qbx - qax*qbz;
		dest[2] = qaz*qbw + qaw*qbz + qax*qby - qay*qbx;
		dest[3] = qaw*qbw - qax*qbx - qay*qby - qaz*qbz;
		
		return dest;
	};
	
	/*
	 * quat4.multiplyVec3
	 * Transforms a vec3 with the given quaternion
	 *
	 * Params:
	 * quat - quat4 to transform the vector with
	 * vec - vec3 to transform
	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
	 *
	 * Returns:
	 * dest if specified, vec otherwise
	 */
	quat4.multiplyVec3 = function(quat, vec, dest) {
		if(!dest) { dest = vec; }
		
		var x = vec[0], y = vec[1], z = vec[2];
		var qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3];
	
		// calculate quat * vec
		var ix = qw*x + qy*z - qz*y;
		var iy = qw*y + qz*x - qx*z;
		var iz = qw*z + qx*y - qy*x;
		var iw = -qx*x - qy*y - qz*z;
		
		// calculate result * inverse quat
		dest[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
		dest[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
		dest[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
		
		return dest;
	};
	
	/*
	 * quat4.toMat3
	 * Calculates a 3x3 matrix from the given quat4
	 *
	 * Params:
	 * quat - quat4 to create matrix from
	 * dest - Optional, mat3 receiving operation result
	 *
	 * Returns:
	 * dest if specified, a new mat3 otherwise
	 */
	quat4.toMat3 = function(quat, dest) {
		if(!dest) { dest = mat3.create(); }
		
		var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
	
		var x2 = x + x;
		var y2 = y + y;
		var z2 = z + z;
	
		var xx = x*x2;
		var xy = x*y2;
		var xz = x*z2;
	
		var yy = y*y2;
		var yz = y*z2;
		var zz = z*z2;
	
		var wx = w*x2;
		var wy = w*y2;
		var wz = w*z2;
	
		dest[0] = 1 - (yy + zz);
		dest[1] = xy - wz;
		dest[2] = xz + wy;
	
		dest[3] = xy + wz;
		dest[4] = 1 - (xx + zz);
		dest[5] = yz - wx;
	
		dest[6] = xz - wy;
		dest[7] = yz + wx;
		dest[8] = 1 - (xx + yy);
		
		return dest;
	};
	
	/*
	 * quat4.toMat4
	 * Calculates a 4x4 matrix from the given quat4
	 *
	 * Params:
	 * quat - quat4 to create matrix from
	 * dest - Optional, mat4 receiving operation result
	 *
	 * Returns:
	 * dest if specified, a new mat4 otherwise
	 */
	quat4.toMat4 = function(quat, dest) {
		if(!dest) { dest = mat4.create(); }
		
		var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
	
		var x2 = x + x;
		var y2 = y + y;
		var z2 = z + z;
	
		var xx = x*x2;
		var xy = x*y2;
		var xz = x*z2;
	
		var yy = y*y2;
		var yz = y*z2;
		var zz = z*z2;
	
		var wx = w*x2;
		var wy = w*y2;
		var wz = w*z2;
	
		dest[0] = 1 - (yy + zz);
		dest[1] = xy - wz;
		dest[2] = xz + wy;
		dest[3] = 0;
	
		dest[4] = xy + wz;
		dest[5] = 1 - (xx + zz);
		dest[6] = yz - wx;
		dest[7] = 0;
	
		dest[8] = xz - wy;
		dest[9] = yz + wx;
		dest[10] = 1 - (xx + yy);
		dest[11] = 0;
	
		dest[12] = 0;
		dest[13] = 0;
		dest[14] = 0;
		dest[15] = 1;
		
		return dest;
	};
	
	/*
	 * quat4.str
	 * Returns a string representation of a quaternion
	 *
	 * Params:
	 * quat - quat4 to represent as a string
	 *
	 * Returns:
	 * string representation of quat
	 */
	quat4.str = function(quat) {
		return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']'; 
	};
	jigLib.GLMatrix=mat4;
})(jigLib);
(function(jigLib){
	/**
	 * @author Jim Sangwine
	 * 
	 * These methods were originally in the Vector3D object ported by Paul Brunt from Flex. 
	 * 
	 * @name Vector3DUtil
	 * @class Vector3DUtil a utility class (containing only static members) for manipulation of 3D vectors expressed as arrays
	 * @constant {array} X_AXIS
	 * @constant {array} Y_AXIS
	 * @constant {array} Z_AXIS
	 * @constructor
	 * @throws Error on attempted instantiation
	 **/
	var Vector3DUtil=function(){ throw new Error('Vector3DUtil is a utility class and should not be instantiated'); };

	Vector3DUtil.X_AXIS=[1,0,0,0];
	Vector3DUtil.Y_AXIS=[0,1,0,0];
	Vector3DUtil.Z_AXIS=[0,0,1,0];

	/**
	 * @function add returns a new 3D vector that is the sum of v1 and v2
	 * @static
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type array
	 **/
	Vector3DUtil.add=function(v1,v2){
		return [v1[0]+v2[0],v1[1]+v2[1],v1[2]+v2[2],v1[3]+v2[3]];
	};

	/**
	 * @function subtract returns a new 3D vector that is the result of v2 subtracted from v1
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type array
	 **/
	Vector3DUtil.subtract=function(v1,v2){
		return [v1[0]-v2[0],v1[1]-v2[1],v1[2]-v2[2],v1[3]-v2[3]];
	};

	/**
	 * @function decrementBy performs an in-place subtraction of v2 from v1 (v1 is modified)
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type void
	 **/
	Vector3DUtil.decrementBy=function(v1,v2){
		v1[0]-=v2[0];
		v1[1]-=v2[1];
		v1[2]-=v2[2];
		v1[3]-=v2[3];
	};

	/**
	 * @function IncrementBy performs an in-place addition of v2 to v1 (v1 is modified)
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type void
	 **/
	Vector3DUtil.IncrementBy=function(v1,v2){
		v1[0]+=v2[0];
		v1[1]+=v2[1];
		v1[2]+=v2[2];
		v1[3]+=v2[3];
	};

	/**
	 * @function distance determines the distance between vectors v1 and v2
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type number
	 **/
	Vector3DUtil.distance=function(v1,v2) {
		var math=Math;
		var pow=math.pow;
		var x=pow(v1[0]-v2[0], 2);
		var y=pow(v1[1]-v2[1], 2);
		var z=pow(v1[2]-v2[2], 2);
		return math.sqrt(x+y+z);
	};

	/**
	 * @function dotProduct determines the dot product for two vectors
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type number
	 **/
	Vector3DUtil.dotProduct=function(v1,v2){
		return v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2];
	};

	/**
	 * @function crossProduct determines the cross product for two vectors
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type array
	 **/
	Vector3DUtil.crossProduct=function(v1,v2){
		return [v1[1]*v2[2]-v1[2]*v2[1],v1[2]*v2[0]-v1[0]*v2[2],v1[0]*v2[1]-v1[1]*v2[0],0];
	};

	/**
	 * @function get_length determines the length of a vector
	 * @param v {array} in the format [x,y,z,w]
	 * @type number
	 **/
	Vector3DUtil.get_length=function(v){
		var sq=v[0]*v[0]+v[1]*v[1]+v[2]*v[2];
		return(sq>0) ? Math.pow(sq,0.5) : 0.0;
	};

	/**
	 * @function get_length_squared determines the length squared of a vector
	 * @param v {array} in the format [x,y,z,w]
	 * @type number
	 **/
	Vector3DUtil.get_lengthSquared=function(v){
		var sq=v[0]*v[0]+v[1]*v[1]+v[2]*v[2];
		return sq;
	};

	/**
	 * @function normalize performs in-place normalisation of a vector
	 * @param v {array} in the format [x,y,z,w]
	 * @type number
	 **/
	Vector3DUtil.normalize=function(v){
		f=Vector3DUtil.get_length(v);
		v[0]/=f;
		v[1]/=f;
		v[2]/=f;
		return f;
	};

	/**
	 * @function negate performs in-place negation of a vector
	 * @param v {array} in the format [x,y,z,w]
	 * @type array
	 **/
	Vector3DUtil.negate=function(v){
		v[0]*=-1;
		v[1]*=-1;
		v[2]*=-1;
		return v;
	};

	/**
	 * @function scaleBy performs in-place scaling of a vector
	 * @param v {array} in the format [x,y,z,w]
	 * @param s {number}
	 * @type void
	 **/
	Vector3DUtil.scaleBy=function(v,s){
		v[0]*=s;
		v[1]*=s;
		v[2]*=s;
	};

	/**
	 * @function getSum gets the absolute sum of each value of a given 3D vector
	 * useful for determining the total amount of force acting on a given body for example
	 * @param v {array} in the format [x,y,z,w]
	 * @type number
	 **/
	Vector3DUtil.getSum=function(v){
		var abs=Math.abs;
		return abs(v[0])+abs(v[1])+abs(v[2]);
	};
	
	/**
	 * @function limitSum scales Vector3D v so that the absolute sum of x,y & z is no greater than s
	 * useful in situations when a force vector must be limited to some maximum total amount of force
	 * @param v {array} in the format [x,y,z,w]
	 * @param s {number} the scaling factor
	 * @type void
	 **/
	Vector3DUtil.limitSum=function(v,s){
		var abs=Math.abs;
		c=Vector3DUtil.getSum(v);
		if (s>=c) return;
		f=s/c;
		Vector3DUtil.scaleBy(v,f);
	};

	/**
	 * @function project performs in-place projection on a vector
	 * @param v {array} in the format [x,y,z,w]
	 * @type void
	 **/
	Vector3DUtil.project=function(v){
		v[0]/=v[3];
		v[1]/=v[3];
		v[2]/=v[3];
		v[3]=1;
	};

	/**
	 * @function angleBetween determines the angle between two vectors
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @type number
	 **/
	Vector3DUtil.angleBetween=function(v1,v2){
		var v1n=v1.slice(0);
		var v2n=v2.slice(0);
		Vector3DUtil.normalize(v1n);
		Vector3DUtil.normalize(v2n);
		d=Vector3DUtil.dotProduct(v1n, v2n);
		if (d<-1) d=-1;
		else if (d>1) d=1;

		return Math.acos(d);
	};

	/**
	 * @function equals tests two vectors for equality
	 * @param v1 {array} in the format [x,y,z,w]
	 * @param v2 {array} in the format [x,y,z,w]
	 * @param allFour {Boolean} whether to test all 4 slots [x,y,z,w] or only the 1st 3 coordinate values [x,y,z]
	 * @type boolean
	 **/
	Vector3DUtil.equals=function(v1, v2, allFour){
		if(!allFour)
			return (v1[0]==v2[0] && v1[1]==v2[1]  && v1[2]==v2[2]); 
		else
			return (v1[0]==v2[0] && v1[1]==v2[1]  && v1[2]==v2[2] && v1[3]==v2[3]); 
	};

	/**
	 * @function create replacement for the Vector3D constructor - avoids NaN assignments
	 * 
	 * @param x {number}
	 * @param y {number}
	 * @param z {number}
	 * @param w {number}
	 * @type array
	 **/
	Vector3DUtil.create=function(x,y,z,w){
		var v3d=[];
		v3d[0] = (x) ? x : 0;
		v3d[1] = (y) ? y : 0;
		v3d[2] = (z) ? z : 0;
		v3d[3] = (w) ? w : 0;
		return v3d;
	};

	jigLib.Vector3DUtil=Vector3DUtil;
	
})(jigLib);(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var GLMatrix=jigLib.GLMatrix;
	
	/**
	 * @author Paul Brunt - rewritten by Jim Sangwine to use GLMatrix (http://code.google.com/p/glmatrix/)
	 * 
	 * @name Matrix3D
	 * @class Matrix3D a wrapper class for GLMatrix 
	 * @requires Vector3DUtil
	 * @requires GLMatrix
	 * @property {GLMatrix} glmatrix the internal GLMatrix object
	 * @constructor
	 **/
	var Matrix3D=function(v){
		if(v) this.glmatrix=GLMatrix.create(v);
		else this.glmatrix=GLMatrix.create([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
	};
	Matrix3D.prototype.glmatrix=null;
	
	/**
	 * @function get_determinant returns the determinant for this matrix
	 * @type number
	 **/
	Matrix3D.prototype.get_determinant=function() {
		return GLMatrix.determinant(this.glmatrix);
	};

	/**
	 * @function prepend prepends another matrix to this one
	 * @param {GLMatrix} m the matrix to prepend
	 * @type void
	 **/
	Matrix3D.prototype.prepend=function(m){
		GLMatrix.multiply(m.glmatrix, this.glmatrix, this.glmatrix);
	};
	
	/**
	 * @function append appends another matrix to this one
	 * @param {GLMatrix} m the matrix to append
	 * @type void
	 **/
	Matrix3D.prototype.append=function(m){
		GLMatrix.multiply(this.glmatrix, m.glmatrix);
	};
	
	/**
	 * @function angleAxis 
	 * @param {number} angle
	 * @param {array} axis 
	 * @type Matrix3D
	 **/
	Matrix3D.prototype.angleAxis=function(angle, axis) {
		var xmx,ymy,zmz,xmy,ymz,zmx,xms,yms,zms;

		//convert from degrees to radians
		angle=angle/(3.14159*2);

		var x = axis[0];
		var y = axis[1];
		var z = axis[2];

		var cos = Math.cos(angle);
		var cosi = 1.0 - cos;
		var sin = Math.sin(angle);

		xms = x * sin;yms = y * sin;zms = z * sin;
		xmx = x * x;ymy = y * y;zmz = z * z;
		xmy = x * y;ymz = y * z;zmx = z * x;

		var matrix=[(cosi * xmx) + cos,(cosi * xmy) - zms,(cosi * zmx) + yms,0,
					(cosi * xmy) + zms,(cosi * ymy) + cos,(cosi * ymz) - xms,0,
					(cosi * zmx) - yms,(cosi * ymz) + xms,(cosi * zmz) + cos,0,
					0,0,0,1];
		/*var matrix=[(cosi * xmx) + cos,(cosi * xmy) + zms,(cosi * zmx) - yms,0,
					(cosi * xmy) - zms,(cosi * ymy) + cos,(cosi * ymz) + xms,0,
					(cosi * zmx) + yms,(cosi * ymz) - xms,(cosi * zmz) + cos,0,
					0,0,0,1];   */
					
		
		return new Matrix3D(matrix);
	};
	
	/**
	 * @function rotate clones and rotates this matrix
	 * @param {number} angle
	 * @param {array} axis 
	 * @type Matrix3D
	 **/
	Matrix3D.prototype.rotate=function(angle, axis) {
		var mat=this.clone();
		GLMatrix.rotate(mat.glmatrix,angle,axis);
		return mat;
	};
	
	/**
	 * @function translateMatrix returns a translate matrix based on v
	 * @param {array} v translation expressed as a 3D vector
	 * @type Matrix3D
	 **/
	Matrix3D.prototype.translateMatrix=function(v){
		return new Matrix3D([ 
		         			1,0,0,v[0],
		         			0,1,0,v[1],
		         			0,0,1,v[2],
		         			0,0,0,1
		         			]);
		/*return new Matrix3D([
		         			1,0,0,0,
		         			0,1,0,0,
		         			0,0,1,0,
		         			v[0],v[1],v[2],1
		         			]);*/
	};
	
	/**
	 * @function scaleMatrix returns a scale matrix based on v
	 * @param {array} v scale expressed as a 3D vector
	 * @type Matrix3D
	 **/
	Matrix3D.prototype.scaleMatrix=function(v){
		return new Matrix3D([
		         			v[0],0,0,0,
		         			0,v[1],0,0,
		         			0,0,v[2],0,
		         			0,0,0,1
		         			]);
	};
	
	/**
	 * @function appendRotation appends rotation to this matrix
	 * @param {number} angle the rotation angle
	 * @param {array} axis the rotation axis expressed as a 3D vector
	 * @param {array} pivot the pivot point expressed as a 3D vector
	 * @type void
	 **/
	Matrix3D.prototype.appendRotation=function(angle,axis,pivot){
		angle=angle/(3.14159*2);
		Vector3DUtil.negate(axis);
		
		if (pivot)
		{
			var npivot=Vector3DUtil.negate(pivot.slice(0));
			this.appendTranslation(npivot[0], npivot[1], npivot[2]);
		}

		GLMatrix.rotate(this.glmatrix, angle, axis);

		if (pivot)
			this.appendTranslation(pivot[0], pivot[1], pivot[2]);
	};

	/**
	 * @function prependRotation prepends rotation to this matrix
	 * @param {number} angle the rotation angle
	 * @param {array} axis the rotation axis expressed as a 3D vector
	 * @param {array} pivot the pivot point expressed as a 3D vector
	 * @type void
	 **/
	Matrix3D.prototype.prependRotation=function(angle,axis,pivot){
		if(pivot)
			this.prepend(this.translateMatrix(Vector3DUtil.negate(pivot.slice(0))));

		this.prepend(this.angleAxis(angle,axis));
		if(pivot)
			this.prepend(this.translateMatrix(pivot));
	};
	
	/**
	 * @function appendScale appends scale to this matrix
	 * @param {number} x scale in the X axis
	 * @param {number} y scale in the Y axis
	 * @param {number} z scale in the Z axis
	 * @type void
	 **/
	Matrix3D.prototype.appendScale=function(x,y,z){
		GLMatrix.scale(this.glmatrix, [x,y,z]);
	};
	
	/**
	 * @function prependScale prepends scale to this matrix
	 * @param {number} x scale in the X axis
	 * @param {number} y scale in the Y axis
	 * @param {number} z scale in the Z axis
	 * @type void
	 **/
	Matrix3D.prototype.prependScale=function(x,y,z){
		this.prepend(this.scaleMatrix([x,y,z]));
	};
	
	/**
	 * @function appendTranslation appends translation to this matrix
	 * @param {number} x translation in the X axis
	 * @param {number} y translation in the Y axis
	 * @param {number} z translation in the Z axis
	 * @type void
	 **/
	Matrix3D.prototype.appendTranslation=function(x,y,z){
		this.append(this.translateMatrix([x,y,z]));
	};
	
	/**
	 * @function prependTranslation prepends translation to this matrix
	 * @param {number} x translation in the X axis
	 * @param {number} y translation in the Y axis
	 * @param {number} z translation in the Z axis
	 * @type void
	 **/
	Matrix3D.prototype.prependTranslation=function(x,y,z){
		this.prepend(this.translateMatrix([x,y,z]));
	};
	
	/**
	 * @function identity
	 * @type void
	 **/
	Matrix3D.prototype.identity=function(){
		GLMatrix.identity(this.glmatrix);
	};
	
	/**
	 * @function transpose transposes this matrix (making it compatible with the old Flex matrices)
	 * @type void
	 **/
	Matrix3D.prototype.transpose=function(){
		GLMatrix.transpose(this.glmatrix);
	};
	
	/**
	 * @function invert inverts this matrix
	 * @type void
	 **/
	Matrix3D.prototype.invert=function(){
		GLMatrix.inverse(this.glmatrix);
	};
	
	/**
	 * @function clone returns a clone of this matrix
	 * @type Matrix3D
	 **/
	Matrix3D.prototype.clone=function(){
		return new Matrix3D(this.glmatrix);
	};
	
	/**
	 * @function transformVector transforms (multiplies) this matrix by vector
	 * @param vector a 3D vector
	 * @returns
	 */
	Matrix3D.prototype.transformVector=function(vector){
		var x=vector[0];
		var y=vector[1];
		var z=vector[2];
		var m=this.glmatrix;
		return [m[0]*x+m[1]*y+m[2]*z+m[3],m[4]*x+m[5]*y+m[6]*z+m[7],m[8]*x+m[9]*y+m[10]*z+m[11]];
		
		//return GLMatrix.multiplyVec3(GLMatrix.transpose(this.glmatrix), vector); for some reason this is giving a very wrong answer!!!
	};
	
	jigLib.Matrix3D=Matrix3D;
	
})(jigLib);(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JNumber3D
	 * @class JNumber3D
	 * @requires Vector3DUtil
	 * @constant {number} NUM_TINY
	 * @constant {number} NUM_HUGE
	 * @constructor
	 **/
	var JNumber3D={};
	
	JNumber3D.NUM_TINY = 0.00001;
	JNumber3D.NUM_HUGE = 100000;

	/* this method is redundant since we are already using arrays for 3D Vector storage
	JNumber3D.toArray=function(v){
		return v;//[v[0], v[1], v[2]];
	};
	*/
	
	/**
	 * @function getScaleVector clones a 3D vector and scales it's elements by s
	 * @param {array} v a 3D vector
	 * @param {number} s the scale to apply
	 * @type array
	 **/
	JNumber3D.getScaleVector=function(v, s){
		return [v[0]*s,v[1]*s,v[2]*s,v[3]];
	};

	/**
	 * @function getScaleVector clones a a 3D vector and divides it's elements by w
	 * @param {array} v a 3D vector
	 * @param {number} w the divisor
	 * @type array
	 **/
	JNumber3D.getDivideVector=function(v, w){
		return (w) ? [v[0] / w, v[1] / w, v[2] / w, 0] : [0, 0, 0, 0];
	};
	
	/**
	 * @function getNormal
	 * @param {array} v0 a 3D vector
	 * @param {array} v1 a 3D vector
	 * @param {array} v2 a 3D vector
	 * @type array
	 **/
	JNumber3D.getNormal=function(v0, v1, v2){
		// Vector3DUtil.subtract is non-destructive so we don't need to clone here...
		// var E = v1.slice(0);
		// var F = v2.slice(0);
		
		// replacing with a 1 liner...
		// var N = Vector3DUtil.crossProduct(Vector3DUtil.subtract(v1, v0), Vector3DUtil.subtract(v2, v1));
		// Vector3DUtil.normalize(N);
		// return N;
		
		return Vector3DUtil.normalize(Vector3DUtil.crossProduct(Vector3DUtil.subtract(v1, v0), Vector3DUtil.subtract(v2, v1)));
	};

	/**
	 * @function copyFromArray copies an array into a 3D vector
	 * @deprecated JigLibJS uses array for 3D vector storage so this method is redundant - use array.slice(0) instead
	 * @param {array} v a 3D vector
	 * @param {array} arr the array to copy to v
	 * @type void
	 **/
	JNumber3D.copyFromArray=function(v, arr){
		if (arr.length >= 3) v=arr.slice(0);
	};

	/**
	 * @function getLimiteNumber ensures num falls between min and max
	 * @param {number} num the number to limit
	 * @param {number} min the minimum allowable value for num
	 * @param {number} max the maximum allowable value for num
	 * @type number
	 **/
	JNumber3D.getLimiteNumber=function(num, min, max){
		var n = num;
		if (n < min) n = min;
		else if (n > max) n = max;

		return n;
	};
	
	jigLib.JNumber3D=JNumber3D;
	
})(jigLib);
(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var Matrix3D=jigLib.Matrix3D;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JMatrix3D
	 * @class JMatrix3D
	 * @requires Vector3DUtil
	 * @requires Matrix3D
	 * @constructor
	 **/
	var JMatrix3D={};
	
	/**
	 * @function getTranslationMatrix returns a translate matrix
	 * @param {number} x translation amount in the X axis
	 * @param {number} y translation amount in the Y axis
	 * @param {number} z translation amount in the Z axis
	 * @type Matrix3D
	 **/
	JMatrix3D.getTranslationMatrix=function(x, y, z){
		var matrix3D = new Matrix3D();
		matrix3D.appendTranslation(x, y, z);
		return matrix3D;
	};
	
	/**
	 * @function getScaleMatrix returns a scale matrix
	 * @param {number} x scale amount in the X axis
	 * @param {number} y scale amount in the Y axis
	 * @param {number} z scale amount in the Z axis
	 * @type Matrix3D
	 **/
	JMatrix3D.getScaleMatrix=function(x, y, z){
		var matrix3D = new Matrix3D();
		matrix3D.prependScale(x, y, z);
		return matrix3D;
	};
				
	/**
	 * @function getRotationMatrix returns a rotation matrix
	 * @param {number} x axis X
	 * @param {number} y axis Y
	 * @param {number} z axis Z
	 * @param {number} degree rotation amount in degrees
	 * @param {array} pivotPoint the pivot point expressed as a 3D vector
	 * @type Matrix3D
	 **/
	JMatrix3D.getRotationMatrix=function(x, y, z, degree, pivotPoint){
		var matrix3D = new Matrix3D();
		matrix3D.appendRotation(degree, Vector3DUtil.create(x,y,z,0), pivotPoint);
		return matrix3D;
	};
				
	/**
	 * @function getInverseMatrix returns an inverted clone of a given Matrix3D
	 * @param {Matrix3D} m the matrix to invert
	 * @type Matrix3D
	 **/
	JMatrix3D.getInverseMatrix=function(m){
		var matrix3D = m.clone();
		matrix3D.invert();
		return matrix3D;
	};
	
	/**
	 * @function getTransposeMatrix returns a transposed clone of a given Matrix3D
	 * @param {Matrix3D} m the matrix to transpose
	 * @type Matrix3D
	 **/
	JMatrix3D.getTransposeMatrix=function(m){
		var matrix3D = m.clone();
		matrix3D.transpose();
		return matrix3D;
	};

	/**
	 * @function getAppendMatrix3D returns the result of one matrix appended to another
	 * @param {Matrix3D} a the original matrix
	 * @param {Matrix3D} b the matrix to append to a
	 * @type Matrix3D
	 **/
	JMatrix3D.getAppendMatrix3D=function(a, b){
		var matrix3D = a.clone();
		matrix3D.append(b);
		return matrix3D;
	};

	/**
	 * @function getPrependMatrix returns the result of one matrix prepended to another
	 * @param {Matrix3D} a the original matrix
	 * @param {Matrix3D} b the matrix to prepend to a
	 * @type Matrix3D
	 **/
	JMatrix3D.getPrependMatrix=function(a, b){
		var matrix3D = a.clone();
		matrix3D.prepend(b);
		return matrix3D;
	};
				
	/**
	 * @function getSubMatrix returns the result of one matrix subtracted from another
	 * @param {Matrix3D} a the original matrix
	 * @param {Matrix3D} b the matrix to subtract from a
	 * @type Matrix3D
	 **/
	JMatrix3D.getSubMatrix=function(a, b){
		var num = [16];
		for (var i = 0; i < 16; i++ ) {
			num[i] = a.glmatrix[i] - b.glmatrix[i];
		}
		return new Matrix3D(num);
	};
	
	/**
	 * @function getRotationMatrixAxis generates a rotation matrix for a given axis and amount
	 * @param {number} degree the rotation amount in degrees
	 * @param {array} rotateAxis the rotation axis
	 * @type Matrix3D
	 **/
	JMatrix3D.getRotationMatrixAxis=function(degree, rotateAxis){
				var matrix3D = new Matrix3D();
				matrix3D.appendRotation(degree, rotateAxis?rotateAxis:Vector3DUtil.X_AXIS);
				return matrix3D;
	};
				
	/**
	 * @function getCols returns the columns Matrix3D in a multidimensional array
	 * @param {Matrix3D} matrix3D the Matrix3D
	 * @type array
	 **/
	JMatrix3D.getCols=function(matrix3D){
		var _rawData =  matrix3D.glmatrix;
		var cols = [];
						
		/*
		cols[0] = Vector3DUtil.create(_rawData[0], _rawData[1], _rawData[2], 0);
		cols[1] = Vector3DUtil.create(_rawData[4], _rawData[5], _rawData[6], 0);
		cols[2] = Vector3DUtil.create(_rawData[8], _rawData[9], _rawData[10], 0);
		
		*/
		cols[0] = Vector3DUtil.create(_rawData[0], _rawData[4], _rawData[8], 0);
		cols[1] = Vector3DUtil.create(_rawData[1], _rawData[5], _rawData[9], 0);
		cols[2] = Vector3DUtil.create(_rawData[2], _rawData[6], _rawData[10], 0);
						
		return cols;
	};

	/**
	 * @function multiplyVector performs in-place multiplication of a 3D vector by a given Matrix3D
	 * @param {Matrix3D} matrix3D the Matrix3D to use in multiplying the vector
	 * @param {array} v the 3D vector to multiply
	 * @type void
	 **/
	JMatrix3D.multiplyVector=function(matrix3D, v){
		var vx = v[0];
		var vy = v[1];
		var vz = v[2];

		if (vx == 0 && vy == 0 && vz == 0) { return; }
						
		var _rawData =  matrix3D.glmatrix;
		
		/*
		How did this work in AS3? it looks wrong!
		v[0] = vx * _rawData[0] + vy * _rawData[4] + vz * _rawData[8]  + _rawData[12];
		v[1] = vx * _rawData[1] + vy * _rawData[5] + vz * _rawData[9]  + _rawData[13];
		v[2] = vx * _rawData[2] + vy * _rawData[6] + vz * _rawData[10] + _rawData[14];
		 */
		
		v[0] = vx * _rawData[0] + vy * _rawData[1] + vz * _rawData[2]  + _rawData[3];
		v[1] = vx * _rawData[4] + vy * _rawData[5] + vz * _rawData[6]  + _rawData[7];
		v[2] = vx * _rawData[8] + vy * _rawData[9] + vz * _rawData[10] + _rawData[11];
	};
	
	jigLib.JMatrix3D=JMatrix3D;
	
})(jigLib);
	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JMath3D
	 * @class JMath3D
	 * @requires Vector3DUtil
	 * @constructor
	 **/
	var JMath3D={};
		
	/**
	 * @function fromNormalAndPoint
	 * @param {array} normal the normal expressed as a 3D vector
	 * @param {array} point the point expressed as a 3D vector
	 * @type array
	 **/
	JMath3D.fromNormalAndPoint=function(normal, point){
			var v = Vector3DUtil.create(normal[0], normal[1], normal[2], 0);
			v[3] = -(v[0]*point[0] + v[1]*point[1] + v[2]*point[2]);
			
			return normal;
	};
		
	/**
	 * @function getIntersectionLine
	 * @param {array} v a 3D vector
	 * @param {array} v0 a 3D vector
	 * @param {array} v1 a 3D vector
	 * @type array
	 **/
	JMath3D.getIntersectionLine=function(v, v0, v1){
		var d0 = v[0] * v0[0] + v[1] * v0[1] + v[2] * v0[2] - v[3];
		var d1 = v[0] * v1[0] + v[1] * v1[1] + v[2] * v1[2] - v[3];
		var m = d1 / (d1 - d0);
		return [v1[0] + (v0[0] - v1[0]) * m,
				v1[1] + (v0[1] - v1[1]) * m,
				v1[2] + (v0[2] - v1[2]) * m, 
				0];
	};
	
	 JMath3D.getLimiteNumber=function(num, min, max){
		var n = num;
		if (n < min){
			n = min;
		}else if (n > max){
			n = max;
		}
		return n;
	};
	
	 JMath3D.wrap=function(val, min, max){
		var delta = max - min;
		if (val > delta){
			val = val / delta;
			val = val - Math.floor(val);
			val = val * delta;
		}
		return val;
	};

	/**
	 * @function unproject
	 * @param {Matrix3D} matrix3d
	 * @param {number} focus
	 * @param {number} zoom
	 * @param {number} mX
	 * @param {number} mY
	 * @type array
	 **/
	JMath3D.unproject=function(matrix3D, focus, zoom, mX, mY){
		var persp = (focus * zoom) / focus;
		var vector = Vector3DUtil.create(mX / persp, -mY / persp, focus, 0);
		return matrix3D.transformVector(vector);
	};
	jigLib.JMath3D=JMath3D;
	
})(jigLib);
(function(jigLib){
	/**
	 * @author katopz
	 * 
	 * @name ContactData
	 * @class ContactData stores information about a contact between 2 objects
	 * @property {BodyPair} pair
	 * @property {CachedImpulse} impulse
	 * @constructor
	 **/
	var ContactData=function(){};
	ContactData.prototype.pair=null;
	ContactData.prototype.impulse=null;
	
	jigLib.ContactData=ContactData;
})(jigLib);


(function(jigLib){
	/**
	 * @author katopz
	 * 
	 * @name EdgeData
	 * @class EdgeData describes an edge in terms of the numbers of it's connecting vertices - used by JBox 
	 * @property {number} ind0 the number of the vertex at the start of the edge
	 * @property {number} ind1 the number of the vertex at the end of the edge
	 * @constructor
	 **/
	var EdgeData=function(ind0, ind1){
		this.ind0 = ind0;
		this.ind1 = ind1;
	};
	
	jigLib.EdgeData=EdgeData;
})(jigLib);(function(jigLib){

	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMath3D=jigLib.JMath3D;
	
	
	/**
	 * @name PlaneData
	 * @class PlaneData stores information about a contact between 2 objects
	 * @requires Vector3DUtil
	 * @property {array} position the position of the plane expressed as a 3D vector
	 * @property {array} normal the normal direction of the plane expressed as a 3D vector
	 * @property {number} distance the dot product of position and normal
	 * @constructor
	 * @param {array} pos the position of the plane expressed as a 3D vector
	 * @param {nor} the normal direction of the plane expressed as a 3D vector
	 **/
	var PlaneData=function(pos, nor){
		if(!pos) pos=[0,0,0];
		if(!nor) nor=[0,1,0];
		this.position = pos.slice(0);
		this.normal = nor.slice(0);
		this.distance = Vector3DUtil.dotProduct(this.position, this.normal);
	};
	PlaneData.prototype.position=null;
	PlaneData.prototype.normal=null;
	PlaneData.prototype.distance=null;
	
	
	/**
	 * @function pointPlaneDistance determines the distance between a given point and the plane
	 * @param {array} pt a 3D vector
	 * @type number
	 **/
	PlaneData.prototype.pointPlaneDistance=function(pt){
		return Vector3DUtil.dotProduct(this.normal, pt) - this.distance;
	};
	
                
        PlaneData.prototype.setWithNormal=function(pos, nor){
		this.position = pos.slice(0);
		this.normal = nor.slice(0);
		this.distance = Vector3DUtil.dotProduct(this.position, this.normal);
	};
	
        PlaneData.prototype.setWithPoint=function(pos0, pos1, pos2){
                        this.position = pos0.slice(0);
                        
                        var dr1 = Vector3DUtil.subtract(pos1,pos0);
                        var dr2 = Vector3DUtil.subtract(pos2,pos0);
                        this.normal = Vector3DUtil.crossProduct(dr1,dr2);
                        
                        var nLen = Vector3DUtil.get_length(this.normal);
                        if (nLen < JMath3D.NUM_TINY) {
                                this.normal = new Vector3D(0, 1, 0);
                                this.distance = 0;
                        }else {
                                Vector3DUtil.scaleBy(this.normal,1 / nLen);
                                this.distance = Vector3DUtil.dotProduct(pos0,this.normal);
                        }
                }
	
		
	jigLib.PlaneData=PlaneData;
	
})(jigLib);
(function(jigLib){
	/**
	 * @author katopz
	 * 
	 * @name SpanData
	 * @class SpanData
	 * @property {number} min
	 * @property {number} max
	 * @property {boolean} flag
	 * @property {number} depth
	 * @constructor
	 **/
	var SpanData=function(){};
	SpanData.prototype.min=null;
	SpanData.prototype.max=null;
	SpanData.prototype.flag=null;
	SpanData.prototype.depth=null;
	
	jigLib.SpanData=SpanData;
})(jigLib);
(function(jigLib){
        // structure used to set up the mesh
	var TriangleVertexIndices=function(_i0, _i1, _i2){
		this.i0 = _i0;
		this.i1 = _i1;
		this.i2 = _i2;
	}
	
	jigLib.TriangleVertexIndices=TriangleVertexIndices;

})(jigLib);	
(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JAABox=jigLib.JAABox;
	var JNumber3D=jigLib.JNumber3D;
                
	var OctreeCell=function(aabox){
		this.childCellIndices = [-1,-1,-1,-1,-1,-1,-1,-1];
		this.triangleIndices = [];
                        
		this.clear();
                        
		if(aabox){
			this.AABox = aabox.clone();
		}else {
			this.AABox = new JAABox();
		}
		this._points = this.AABox.getAllPoints();
		this._egdes = this.AABox.get_edges();
	}
		
	OctreeCell.NUM_CHILDREN = 8;
                
	// indices of the children (if not leaf). Will be -1 if there is no child
        OctreeCell.prototype.childCellIndices=null;
	// indices of the triangles (if leaf)
        OctreeCell.prototype.triangleIndices=null;
	// Bounding box for the space we own
	OctreeCell.prototype.AABox=null;
                
        OctreeCell.prototype._points=null;
        OctreeCell.prototype._egdes=null;
	
	// Indicates if we contain triangles (if not then we should/might have children)
        OctreeCell.prototype.isLeaf=function() {
		return this.childCellIndices[0] == -1;
	}
                
	OctreeCell.prototype.clear=function(){
		for (var i = 0; i < this.NUM_CHILDREN; i++ ) {
			this.childCellIndices[i] = -1;
		}
		this.triangleIndices.splice(0, this.triangleIndices.length);
	}
                
	OctreeCell.prototype.get_points=function(){
		return this._points;
	}
	OctreeCell.prototype.get_egdes=function(){
		return this._egdes;
	}
	
	jigLib.OctreeCell=OctreeCell;

})(jigLib);		(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var RigidBody=jigLib.RigidBody;
	
	var CollOutData=function(frac, position, normal){
		if(frac==undefined)frac=0;
		
		this.frac = frac;
		this.position = position ? position : [0,0,0];
		this.normal = normal ? normal : [0,0,0];
	};
	
	jigLib.CollOutData=CollOutData;

})(jigLib);	
	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var RigidBody=jigLib.RigidBody;
	
	var CollOutBodyData=function(frac, position, normal, rigidBody){
		if(frac==undefined) frac=0;
		this.Super(frac, position, normal);
		this.rigidBody = rigidBody;
	};
	jigLib.extend(CollOutBodyData,jigLib.CollOutData);
	
	jigLib.CollOutBodyData=CollOutBodyData;

})(jigLib);	
	(function(jigLib){
	/**
	 * @author Jim Sangwine
	 * 
	 * @name JEventDispatcher
	 * @class JEventDispatcher The base class for event dispatchers
	 * @constructor
	 **/
	var JEventDispatcher=function() 
	{
		this._listeners={};
	};
	
	JEventDispatcher.prototype._listeners={};
	
	/**
	 * @function addEventListener adds a listener to this dispatcher
	 * @param type {string} the type of event
	 * @param listener {function} the event handler
	 **/
	JEventDispatcher.prototype.addEventListener=function(type,listener)
	{
		if (typeof listener != 'function')
			throw new Error('Invalid argument passed to JEventDispatcher.addEventListener - listener must be a function');
		
		if (typeof(this._listeners[type])=='undefined' || !this._listeners[type] instanceof Array)
			this._listeners[type]=[];
		
		this._listeners[type].push(listener);
	};
	
	/**
	 * @function removeEventListener drops a listener from this dispatcher
	 * @param type {string} the type of event
	 * @param listener {function} the event handler
	 **/
	JEventDispatcher.prototype.removeEventListener=function(type, listener)
	{
		if (!this._listeners[type] instanceof Array) return;
		
		var listeners = this._listeners[type];
		for (var i=0, num=listeners.length; i<num; i++)
		{
			if (listener === listeners[i])
			{
				listeners.splice(i, 1);
				break;
			}
		}
	};
	
	/**
	 * @function dispatchEvent fires an event
	 * @param event {JEvent} the event (should be an instance or subclass of JEvent)
	 **/
	JEventDispatcher.prototype.dispatchEvent=function(event)
	{
		//remove this for now do we want to be strict?
		//if (typeof event.type == 'undefined')
		//	throw new Error('Invalid argument passed to JEventDispatcher.dispatchEvent - use an instance or subclass of JEvent');
		
		var listeners = this._listeners[event.type];
		
		if (!listeners || listeners.length == 0)
			return;
		
		for (var i=0, num=listeners.length; i < num; i++)
		{
			listeners[i].call(this, event);
		}
	};
	
	jigLib.JEventDispatcher=JEventDispatcher;
})(jigLib);(function(jigLib){
	/**
	 * @author Jim Sangwine
	 * 
	 * @name JEvent
	 * @class JEvent Base class for JigLib events
	 * @constant {string} COLLISION
	 * @constructor
	 * @param type {string}
	 **/
	var JEvent=function(type)
	{
		this.type=type;
	};
	
	JEvent.prototype.type=null;
	
	Event.EVENT='JigLibJSEvent';
	
	jigLib.JEvent=JEvent;
})(jigLib);(function(jigLib){
	/**
	 * @author Jim Sangwine
	 * 
	 * @name JCollisionEvent
	 * @class JCollisionEvent An event representing a collision with another RigidBody (to be dispatched by RigidBody)
	 * @extends JEvent
	 * @constant {string} COLLISION
	 * @constructor
	 * @param body {RigidBody} The other body involved in the collision
	 * @param impulse {Array} A 3D vector representing the impulse applied to this RigidBody as a result of the collision
	 **/
	var JCollisionEvent=function(body, impulse)
	{
		this.Super(JCollisionEvent.COLLISION);
		this.collisionBody=body;
		this.collisionImpulse=impulse;
	};
	jigLib.extend(JCollisionEvent,jigLib.JEvent);
	
	JCollisionEvent.prototype.collisionBody=null;
	JCollisionEvent.prototype.collisionImpulse=null;
	
	JCollisionEvent.COLLISION='JigLibJSCollisionEvent';
	
	jigLib.JCollisionEvent=JCollisionEvent;
})(jigLib);(function(jigLib){
	/**
		 * Represents a mesh from a 3D engine inside JigLib.
		 * Its implementation shold allow to get and set a Matrix3D on
		 * the original object.
		 *
		 * In the implementation, JMatrix3D should be translated into
		 * the type proper for a given engine.
		 *
		 * @author bartekd
		 */
	var Matrix3D=jigLib.Matrix3D;
	
	/**
	 * @author bartekd
	 * 
	 * @name ISkin3D
	 * @class ISkin3D an interface representing a mesh from a 3D engine inside JigLib. 
	 * Implementations should allow getting and setting a Matrix3D on the original object. 
	 * Matrix3D should be translated into a type compatible with the engine.
	 * 
	 * @requires Matrix3D
	 * @property {Matrix3D} matrix
	 * @constructor
	 **/
	function ISkin3D(){
		this.matrix=new Matrix3D();
	};
	
	ISkin3D.prototype.matrix=null;
	
	/**
	 * @function get_transform gets the transform matrix
	 * @type Matrix3D
	 **/
	ISkin3D.prototype.get_transform=function(){
		return this.matrix;
	};
	
	/**
	 * @function set_transform sets the transform matrix
	 * @param {Matrix3D} value
	 * @type void
	 **/
	ISkin3D.prototype.set_transform=function(value){
		this.matrix=value;
	};
	
	jigLib.ISkin3D=ISkin3D;
	
})(jigLib);/*
Copyright (c) 2007 Danny Chapman 
http://www.rowlhouse.co.uk

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.
Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:
1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.
3. This notice may not be removed or altered from any source
distribution.
 */

(function(jigLib){
	
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var EdgeData=jigLib.EdgeData;
	var JMath3D=jigLib.JMath3D;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JAABox
	 * @class JAABox an axis aligned box
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @property {array} minPos a 3D vector
	 * @property {array} maxPos a 3D vector
	 * @constructor
	 * @param {array} minPos a 3D vector
	 * @param {array} maxPos a 3D vector
	 **/
	var JAABox=function(minPos, maxPos) {
		if(minPos){
			this._minPos = minPos.slice(0);
			this._maxPos = maxPos.slice(0);
		}else{
			this._minPos = [0,0,0];
			this._maxPos = [0,0,0];
		}
	};
	
	JAABox.prototype._minPos=null;
	JAABox.prototype._maxPos=null;
	
	/**
	 * @function get_minPos getter for _minPos
	 * @type array
	 **/
	JAABox.prototype.get_minPos=function(){
		return this._minPos;
	};
	
	/**
	 * @function set_minPos setter for _minPos
	 * @param {array} pos a 3D vector 
	 * @type void
	 **/
	JAABox.prototype.set_minPos=function(pos){
		this._minPos = pos.slice(0);
	};
				
	/**
	 * @function get_minPos getter for _maxPos
	 * @type array
	 **/
	JAABox.prototype.get_maxPos=function(){
		return this._maxPos;
	};
	
	/**
	 * @function set_minPos setter for _maxPos
	 * @param {array} pos a 3D vector 
	 * @type void
	 **/
	JAABox.prototype.set_maxPos=function(pos){
		this._maxPos = pos.slice(0);
	};
	
	/**
	 * @function get_sideLengths determines the side lengths of the JAABox
	 * @returns the side lengths expressed as 3D vector
	 * @type array
	 **/
	JAABox.prototype.get_sideLengths=function() {
		var pos = this._maxPos.slice(0);
		Vector3DUtil.subtract(pos, this._minPos);
		return pos;
	};

	/**
	 * @function get_centrePos determines the center point of the JAABox
	 * @returns the center point expressed as 3D vector
	 * @type array
	 **/
	JAABox.prototype.get_centrePos=function(){
		var pos = this._minPos.slice(0);
		return JNumber3D.getScaleVector(Vector3DUtil.add(pos, this._maxPos), 0.5);
	};
	
	
	JAABox.prototype.getAllPoints=function(){
		var center,halfSide;
		var points;
		center = this.get_centrePos();
		halfSide = this.get_sideLengths().slice(0);
		Vector3DUtil.scaleBy(halfSide, 0.5);
		points = [];
		points[0] = Vector3DUtil.add(center,[halfSide[0], -halfSide[1], halfSide[2]]);
		points[1] = Vector3DUtil.add(center,[halfSide[0], halfSide[1], halfSide[2]]);
		points[2] = Vector3DUtil.add(center,[-halfSide[0], -halfSide[1], halfSide[2]]);
		points[3] = Vector3DUtil.add(center,[-halfSide[0], halfSide[1], halfSide[2]]);
		points[4] = Vector3DUtil.add(center,[-halfSide[0], -halfSide[1], -halfSide[2]]);
		points[5] = Vector3DUtil.add(center,[-halfSide[0], halfSide[1], -halfSide[2]]);
		points[6] = Vector3DUtil.add(center,[halfSide[0], -halfSide[1], -halfSide[2]]);
		points[7] = Vector3DUtil.add(center,[halfSide[0], halfSide[1], -halfSide[2]]);
                        
		return points;
	}
                
	JAABox.prototype.get_edges=function(){
		return [
		new EdgeData( 0, 1 ), new EdgeData( 0, 2 ), new EdgeData( 0, 6 ),
		new EdgeData( 2, 3 ), new EdgeData( 2, 4 ), new EdgeData( 6, 7 ),
		new EdgeData( 6, 4 ), new EdgeData( 1, 3 ), new EdgeData( 1, 7 ),
		new EdgeData( 3, 5 ), new EdgeData( 7, 5 ), new EdgeData( 4, 5 )];
	}
	
				
	/**
	 * @function move moves the JAABox by delta
	 * @param {array} delta a 3D vector
	 * @type void
	 **/
	JAABox.prototype.move=function(delta){
		Vector3DUtil.add(this._minPos, delta);
		Vector3DUtil.add(this._maxPos, delta);
	};

	/**
	 * @function clear resets the JAABox
	 * @type void
	 **/
	JAABox.prototype.clear=function(){
		this._minPos = Vector3DUtil.create(JNumber3D.NUM_HUGE, JNumber3D.NUM_HUGE, JNumber3D.NUM_HUGE, 0);
		this._maxPos = Vector3DUtil.create(-JNumber3D.NUM_HUGE, -JNumber3D.NUM_HUGE, -JNumber3D.NUM_HUGE, 0);
	};

	/**
	 * @function clone clones the JAABox 
	 * @returns a copy of this JAABox
	 * @type JAABox
	 **/
	JAABox.prototype.clone=function(){
		return new JAABox(this._minPos, this._maxPos);
	};

	/**
	 * @function addPoint  
	 * @param {array} pos a 3D vector
	 * @type void
	 **/
	JAABox.prototype.addPoint=function(pos){
		var _minPos=this._minPos;
		var _maxPos=this._maxPos;
		if (pos[0] < _minPos[0]) _minPos[0] = pos[0] - JNumber3D.NUM_TINY;
		if (pos[0] > _maxPos[0]) _maxPos[0] = pos[0] + JNumber3D.NUM_TINY;
		if (pos[1] < _minPos[1]) _minPos[1] = pos[1] - JNumber3D.NUM_TINY;
		if (pos[1] > _maxPos[1]) _maxPos[1] = pos[1] + JNumber3D.NUM_TINY;
		if (pos[2] < _minPos[2]) _minPos[2] = pos[2] - JNumber3D.NUM_TINY;
		if (pos[2] > _maxPos[2]) _maxPos[2] = pos[2] + JNumber3D.NUM_TINY;
	};

	/**
	 * @function addBox  
	 * @param {JBox} box 
	 * @type void
	 **/
	JAABox.prototype.addBox=function(box){
		var pts = box.getCornerPoints(box.get_currentState());
		this.addPoint(pts[0]);
		this.addPoint(pts[1]);
		this.addPoint(pts[2]);
		this.addPoint(pts[3]);
		this.addPoint(pts[4]);
		this.addPoint(pts[5]);
		this.addPoint(pts[6]);
		this.addPoint(pts[7]);
	};

	/**
	 * @function addSphere
	 * @param {JSphere} sphere 
	 * @type void
	 **/
	JAABox.prototype.addSphere=function(sphere){
		var _minPos=this._minPos;
		var _maxPos=this._maxPos;
		if (sphere.get_currentState().position[0] - sphere.get_radius() < _minPos[0]) 
			_minPos[0] = (sphere.get_currentState().position[0] - sphere.get_radius()) - JNumber3D.NUM_TINY;

		if (sphere.get_currentState().position[0] + sphere.get_radius() > _maxPos[0]) 
			_maxPos[0] = (sphere.get_currentState().position[0] + sphere.get_radius()) + JNumber3D.NUM_TINY;

		if (sphere.get_currentState().position[1] - sphere.get_radius() < _minPos[1]) 
			_minPos[1] = (sphere.get_currentState().position[1] - sphere.get_radius()) - JNumber3D.NUM_TINY;

		if (sphere.get_currentState().position[1] + sphere.get_radius() > _maxPos[1]) 
			_maxPos[1] = (sphere.get_currentState().position[1] + sphere.get_radius()) + JNumber3D.NUM_TINY;

		if (sphere.get_currentState().position[2] - sphere.get_radius() < _minPos[2]) 
			_minPos[2] = (sphere.get_currentState().position[2] - sphere.get_radius()) - JNumber3D.NUM_TINY;

		if (sphere.get_currentState().position[2] + sphere.get_radius() > _maxPos[2]) 
			_maxPos[2] = (sphere.get_currentState().position[2] + sphere.get_radius()) + JNumber3D.NUM_TINY;
	};
				
	/**
	 * @function addCapsule  
	 * @param {JCapsule} capsule 
	 * @type void
	 **/
	JAABox.prototype.addCapsule=function(capsule){
		var pos= capsule.getBottomPos(capsule.get_currentState());
		var _minPos=this._minPos;
		var _maxPos=this._maxPos;
		if (pos[0] - capsule.get_radius() < _minPos[0]) 
			_minPos[0] = (pos[0] - capsule.get_radius()) - JNumber3D.NUM_TINY;

		if (pos[0] + capsule.get_radius() > _maxPos[0]) 
			_maxPos[0] = (pos[0] + capsule.get_radius()) + JNumber3D.NUM_TINY;

		if (pos[1] - capsule.get_radius() < _minPos[1]) 
			_minPos[1] = (pos[1] - capsule.get_radius()) - JNumber3D.NUM_TINY;

		if (pos[1] + capsule.get_radius() > _maxPos[1]) 
			_maxPos[1] = (pos[1] + capsule.get_radius()) + JNumber3D.NUM_TINY;

		if (pos[2] - capsule.get_radius() < _minPos[2]) 
			_minPos[2] = (pos[2] - capsule.get_radius()) - JNumber3D.NUM_TINY;

		if (pos[2] + capsule.get_radius() > _maxPos[2]) 
			_maxPos[2] = (pos[2] + capsule.get_radius()) + JNumber3D.NUM_TINY;

		pos = capsule.getEndPos(capsule.get_currentState());

		if (pos[0] - capsule.get_radius() < _minPos[0]) 
			_minPos[0] = (pos[0] - capsule.get_radius()) - JNumber3D.NUM_TINY;

		if (pos[0] + capsule.get_radius() > _maxPos[0]) 
			_maxPos[0] = (pos[0] + capsule.get_radius()) + JNumber3D.NUM_TINY;

		if (pos[1] - capsule.get_radius() < _minPos[1]) 
			_minPos[1] = (pos[1] - capsule.get_radius()) - JNumber3D.NUM_TINY;

		if (pos[1] + capsule.get_radius() > _maxPos[1]) 
			_maxPos[1] = (pos[1] + capsule.get_radius()) + JNumber3D.NUM_TINY;

		if (pos[2] - capsule.get_radius() < _minPos[2]) 
			_minPos[2] = (pos[2] - capsule.get_radius()) - JNumber3D.NUM_TINY;

		if (pos[2] + capsule.get_radius() > _maxPos[2]) 
			_maxPos[2] = (pos[2] + capsule.get_radius()) + JNumber3D.NUM_TINY;
	};
				
	/**
	 * @function addSegment
	 * @param {JSegment} seg 
	 * @type void
	 **/
	JAABox.prototype.addSegment=function(seg){
		this.addPoint(seg.origin);
		this.addPoint(seg.getEnd());
	};

	/**
	 * @function overlapTest tests for an overlap between 2 boxes  
	 * @param {JAABox} box 
	 * @type boolean
	 **/
	JAABox.prototype.overlapTest=function(box){
		var _minPos=this._minPos;
		var _maxPos=this._maxPos;
		return ((_minPos[2] >= box.get_maxPos()[2]) ||
				(_maxPos[2] <= box.get_minPos()[2]) ||
				(_minPos[1] >= box.get_maxPos()[1]) ||
				(_maxPos[1] <= box.get_minPos()[1]) ||
				(_minPos[0] >= box.get_maxPos()[0]) ||
				(_maxPos[0] <= box.get_minPos()[0])) ? false : true;
	};

	/**
	 * @function isPointInside tests if a given point lies inside this JAABox  
	 * @param {array} pos a 3D vector
	 * @type boolean
	 **/
	JAABox.prototype.isPointInside=function(pos){
		var _minPos=this._minPos;
		var _maxPos=this._maxPos;
		return ((pos[0] >= _minPos[0]) && 
				(pos[0] <= _maxPos[0]) && 
				(pos[1] >= _minPos[1]) && 
				(pos[1] <= _maxPos[1]) && 
				(pos[2] >= _minPos[2]) && 
				(pos[2] <= _maxPos[2]));
	};
	
	JAABox.prototype.getRadiusAboutCentre=function(){
		return 0.5 * (Vector3DUtil.get_length(Vector3DUtil.subtract(this._maxPos,this._minPos)));
	}
	
	JAABox.prototype.scaleBox=function(factor){
		var center=this.get_centrePos()
		var deltamin=Vector3DUtil.subtract(this._minPos,center);
		Vector3DUtil.scaleBy(deltamin,factor);
		this._minPos=Vector3DUtil.subtract(this._minPos,deltamin);
		
		var deltamax=Vector3DUtil.subtract(this._maxPos,center);
		Vector3DUtil.scaleBy(deltamax,factor);
		this._maxPos=Vector3DUtil.subtract(this._maxPos,deltamax);
	}

	/**
	 * @function toString  
	 * @type string
	 **/
	JAABox.prototype.toString=function(){
		var _minPos=this._minPos;
		var _maxPos=this._maxPos;
		return [_minPos[0],_minPos[1],_minPos[2],_maxPos[0],_maxPos[1],_maxPos[2]].toString();
	};
	
	JAABox.prototype.segmentAABoxOverlap=function(seg){
		pt1 = seg.origin.slice(0);
		pt2 = seg.getEnd().slice(0);

		//if either point is inside the box then it must overlap!
		if(this.isPointInside(pt1) || this.isPointInside(pt2)){
			return true;
		}
		
		min= this._minPos.slice(0);
		max = this._maxPos.slice(0);
		
		var sidesIntersected1=( (pt1[0]-min[0])*(pt2[0]-min[0])<0 ) + ( (pt1[0]-max[0])*(pt2[0]-max[0])<0 ) +
		( (pt1[1]-min[1])*(pt2[1]-min[1])<0 ) + ( (pt1[1]-max[1])*(pt2[1]-max[1])<0 );
		
		var sidesIntersected2=( (pt1[0]-min[0])*(pt2[0]-min[0])<0 ) + ( (pt1[0]-max[0])*(pt2[0]-max[0])<0 ) +
		( (pt1[2]-min[2])*(pt2[2]-min[2])<0 ) + ( (pt1[2]-max[2])*(pt2[2]-max[2])<0 );
		
		var sidesIntersected3=( (pt1[1]-min[1])*(pt2[1]-min[1])<0 ) + ( (pt1[1]-max[1])*(pt2[1]-max[1])<0 ) +
		( (pt1[2]-min[2])*(pt2[2]-min[2])<0 ) + ( (pt1[2]-max[2])*(pt2[2]-max[2])<0 );
		
		if((sidesIntersected1>1) + (sidesIntersected2>1) + (sidesIntersected3>1)>1) return true;
		
		return false;
	};
	/*
	JAABox.prototype.segmentAABoxOverlap=function(seg){
		var jDir,kDir,i,iFace;
		var frac,dist0,dist1,tiny=JNumber3D.NUM_TINY;
                        
		var pt,minPosArr,maxPosArr,p0,p1,faceOffsets;
		minPosArr = this._minPos.slice(0);
		maxPosArr = this._maxPos.slice(0);
		p0 = seg.origin.slice(0);
		p1 = seg.getEnd().slice(0);
		for (i = 0; i < 3; i++ ) {
			jDir = (i + 1) % 3;
			kDir = (i + 2) % 3;
			faceOffsets = [minPosArr[i], maxPosArr[i]];
                                
			for (iFace = 0 ; iFace < 2 ; iFace++) {
				dist0 = p0[i] - faceOffsets[iFace];
				dist1 = p1[i] - faceOffsets[iFace];
				frac = -1;
				if (dist0 * dist1 < -tiny){
					frac = -dist0 / (dist1 - dist0);
				}else if (Math.abs(dist0) < tiny){
					frac = 0;
				}else if (Math.abs(dist1) < tiny){
					frac = 1;
				}
				if (frac >= 0) {
					pt = seg.getPoint(frac).slice(0);
					if((pt[jDir] > minPosArr[jDir] - tiny) && 
					(pt[jDir] < maxPosArr[jDir] + tiny) && 
					(pt[kDir] > minPosArr[kDir] - tiny) && 
					(pt[kDir] < maxPosArr[kDir] + tiny)) {
						return true;
					}
				}
			}
		}
		return false;
	}*/


	jigLib.JAABox=JAABox;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name BodyPair
	 * @class BodyPair a container for a pair of RigidBody objects
	 * @property {RigidBody} body0 the first body of the constrained pair
	 * @property {RigidBody} body1 the second body of the constrained pair
	 * @property {array} r a 3D vector
	 * @constructor
	 * @param {RigidBody} _body0 the first body of the constrained pair
	 * @param {RigidBody} _body1 the second body of the constrained pair
	 * @param {array} _r0 a 3D vector
	 * @param {array} _r1 a 3D vector
	 **/
	var BodyPair=function(_body0, _body1, r0, r1){
		if (_body0.id > _body1.id){
			this.body0 = _body0;
			this.body1 = _body1;
			this.r = r0;
		}else{
			this.body0 = _body1;
			this.body1 = _body0;
			this.r = r1;
		}
	};
	BodyPair.prototype.body0=null;
	BodyPair.prototype.body1=null;
	BodyPair.prototype.r=null;
	
	jigLib.BodyPair=BodyPair;
		
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CachedImpulse
	 * @class CachedImpulse 
	 * @property {number} normalImpulse 
	 * @property {number} normalImpulseAux 
	 * @property {array} frictionImpulse a 3D vector
	 * @constructor
	 * @param {number} _normalImpulse 
	 * @param {number} _normalImpulseAux 
	 * @param {array} _frictionImpulse a 3D vector
	 **/
	var CachedImpulse=function(_normalImpulse, _normalImpulseAux, _frictionImpulse){
		this.normalImpulse = _normalImpulse;
		this.normalImpulseAux = _normalImpulseAux;
		this.frictionImpulse = _frictionImpulse;
	};
	CachedImpulse.prototype.normalImpulse=null;
	CachedImpulse.prototype.normalImpulseAux=null;
	CachedImpulse.prototype.frictionImpulse=null;
	
	jigLib.CachedImpulse=CachedImpulse;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	 
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name MaterialProperties
	 * @class MaterialProperties 
	 * @property {number} _restitution
	 * @property {number} _friction
	 * @constructor
	 * @param {number} restitution
	 * @param {number} friction
	 **/
	var MaterialProperties=function(restitution, friction){
		if(restitution==null) restitution=0.25;
		if(friction==null) friction=0.25;
		this._restitution = restitution;
		this._friction = friction;
	};
	
	MaterialProperties.prototype._restitution=null;
	MaterialProperties.prototype._friction=null;
	
	/**
	 * @function get_restitution getter for _restitution
	 * @type number
	 **/
	MaterialProperties.prototype.get_restitution=function(){
		return this._restitution;
	};

	/**
	 * @function set_restitution setter for _restitution
	 * @param {number} restitution
	 * @type void
	 **/
	MaterialProperties.prototype.set_restitution=function(restitution){
		this._restitution = restitution;
	};

	/**
	 * @function get_restitution getter for _friction
	 * @type number
	 **/
	MaterialProperties.prototype.get_friction=function(){
		return this._friction;
	};

	/**
	 * @function get_restitution setter for _friction
	 * @param {number} friction
	 * @type void
	 **/
	MaterialProperties.prototype.set_friction=function(friction){
		this._friction = friction;
	};
		
	jigLib.MaterialProperties=MaterialProperties;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name PhysicsController
	 * @class PhysicsController 
	 * @property {boolean} _controllerEnabled
	 * @constructor
	 **/
	var PhysicsController=function(){
		this._controllerEnabled = false;
	};
	
	PhysicsController.prototype._controllerEnabled=null;
	
	
	/**
	 * @function updateController implement this to apply whatever forces are needed to the objects this controls
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	PhysicsController.prototype.updateController=function(dt){
	};

	/**
	 * @function enableController register with the physics system
	 * @type void
	 **/
	PhysicsController.prototype.enableController=function(){
		if (this._controllerEnabled){
			return;
		}
		this._controllerEnabled = true;
		jigLib.PhysicsSystem.getInstance().addController(this);
	};

	/**
	 * @function disableController de-register from the physics system
	 * @type void
	 **/
	PhysicsController.prototype.disableController=function(){
		if (!this._controllerEnabled){
			return;
		}
		this._controllerEnabled = false;
		jigLib.PhysicsSystem.getInstance().removeController(this);
	};

	/**
	 * @function get_controllerEnabled returns true if this controller is registered with the PhysicsSystem
	 * @type boolean
	 **/
	PhysicsController.prototype.get_controllerEnabled=function(){
		return this._controllerEnabled;
	};
	
	jigLib.PhysicsController=PhysicsController;
	
})(jigLib);(function(jigLib){
	var Matrix3D=jigLib.Matrix3D;
	var JMatrix3D=jigLib.JMatrix3D;
	
	/**
	 * @author katopz
	 * Devin Reimer (blog.almostlogical.com)
	 * 
	 * @name PhysicsState
	 * @class PhysicsState 
	 * @requires Matrix3D
	 * @requires JMatrix3D
	 * @property {array} position
	 * @property {Matrix3D} 
	 * @property {array} linVelocity
	 * @property {array} rotVelocity
	 * @property {array} orientationCols
	 * @constructor
	 **/
	var PhysicsState=function(){
		this._orientation = new Matrix3D();
	};
	
	PhysicsState.prototype.position = [0,0,0,0];
	PhysicsState.prototype._orientation;
	PhysicsState.prototype.linVelocity = [0,0,0,0];
	PhysicsState.prototype.rotVelocity = [0,0,0,0];
	PhysicsState.prototype.orientationCols = [[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	
	/**
	 * @function get_orientation getter for _orientation
	 * @type Matrix3D
	 **/
	PhysicsState.prototype.get_orientation=function(){ return this._orientation; };
	
	/**
	 * @function set_orientation setter for _orientation
	 * @param {array} val
	 **/
	PhysicsState.prototype.set_orientation=function(val){
		this._orientation = val;			 
		var _rawData = this._orientation.glmatrix;
						
		this.orientationCols[0][0] = _rawData[0];
		this.orientationCols[0][1] = _rawData[1];
		this.orientationCols[0][2] = _rawData[2];
		
		this.orientationCols[1][0] = _rawData[4];
		this.orientationCols[1][1] = _rawData[5];
		this.orientationCols[1][2] = _rawData[6];
		
		this.orientationCols[2][0] = _rawData[8];
		this.orientationCols[2][1] = _rawData[9];
		this.orientationCols[2][2] = _rawData[10];
	};
		
	/**
	 * @function getOrientationCols here for backwards compatibility should use this.orientationCols unless you need a clone
	 * @type array
	 **/
	PhysicsState.prototype.getOrientationCols=function(){
		return JMatrix3D.getCols(this._orientation);
	};
	
	jigLib.PhysicsState=PhysicsState;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JConfig=jigLib.JConfig;
	var Matrix3D=jigLib.Matrix3D;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var MaterialProperties=jigLib.MaterialProperties;
	var PhysicsState=jigLib.PhysicsState;
	var PhysicsSystem=jigLib.PhysicsSystem;
	var JAABox=jigLib.JAABox;
	var JCollisionEvent=jigLib.JCollisionEvent;
	
	/**
	 * @name RigidBody
	 * @class RigidBody a body in the physics simulation
	 * @requires Vector3DUtil
	 * @requires JConfig
	 * @requires Matrix3D
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @requires MaterialProperties
	 * @requires PhysicsState
	 * @requires PhysicsSystem
	 * @requires JAABox
	 * @property {number} idCounter
	 * @property {number} _id
	 * @property {ISkin3D} _skin
	 * @property {string} _type
	 * @property {number} _boundingSphere
	 * @property {JAABox} _boundingBox
	 * @property {PhysicsState} _currState
	 * @property {PhysicsState} _oldState
	 * @property {PhysicsState} _storeState
	 * @property {Matrix3D} _invOrientation
	 * @property {array} _currLinVelocityAux a 3D vector
	 * @property {array} _currRotVelocityAux a 3D vector
	 * @property {number} _mass
	 * @property {number} _invMass
	 * @property {Matrix3D} _bodyInertia
	 * @property {Matrix3D} _bodyInvInertia
	 * @property {Matrix3D} _worldInertia
	 * @property {Matrix3D} _worldInvInertia
	 * @property {array} _force a 3D vector
	 * @property {array} _torque a 3D vector
	 * @property {array} _linVelDamping a 3D vector
	 * @property {array} _rotVelDamping a 3D vector
	 * @property {number} _maxLinVelocities
	 * @property {number} _maxRotVelocities
	 * @property {boolean} _velChanged
	 * @property {boolean} _activity
	 * @property {boolean} _movable
	 * @property {boolean} _origMovable
	 * @property {number} _inactiveTime
	 * @property {boolean} _doShockProcessing
	 * @property {RigidBody} _bodiesToBeActivatedOnMovement the list of bodies that need to be activated when we move away from our stored position
	 * @property {array} _storedPositionForActivation a 3D vector the position stored when we need to notify other bodies
	 * @property {array} _lastPositionForDeactivation a 3D vector last position for when trying the deactivate
	 * @property {Matrix3D} _lastOrientationForDeactivation last orientation for when trying to deactivate
	 * @property {MaterialProperties} _material
	 * @property {number} _rotationX
	 * @property {number} _rotationY
	 * @property {number} _rotationZ
	 * @property {boolean} _useDegrees
	 * @property {array} _nonCollidables a collection of RigidBody objects
	 * @property {array} _constraints a collection of JConstraint objects
	 * @property {array} collisions a collection of CollisionInfo objects
	 * @property {boolean} isActive
	 * @property {number} minImpulseForCollisionEvent the minimum total absolute impulse required to trigger a collision event
	 * @constructor
	 * @param {ISkin3D} _skin
	 **/
	var RigidBody=function(skin){
		// calling "this.Super" causes recursion in inheritance chains 
		// because Super references this class constructor
		//this.Super(skin);
		jigLib.JEventDispatcher.call(this);
		
		this._useDegrees = (JConfig.rotationType == "DEGREES") ? true : false;
		
		this._id = RigidBody.idCounter++;

		this._skin = skin;
		this._material = new MaterialProperties();

		this._bodyInertia = new Matrix3D();
		this._bodyInvInertia = JMatrix3D.getInverseMatrix(this._bodyInertia);

		this._currState = new PhysicsState();
		this._oldState = new PhysicsState();
		this._storeState = new PhysicsState();
		this._invOrientation = JMatrix3D.getInverseMatrix(this._currState.get_orientation());
		this._currLinVelocityAux = [0,0,0,0];
		this._currRotVelocityAux = [0,0,0,0];

		this._force = [0,0,0,0];
		this._torque = [0,0,0,0];
			
		this._linVelDamping = [0.995, 0.995, 0.995, 0];
		this._rotVelDamping = [0.5, 0.5, 0.5, 0];
		this._maxLinVelocities = 500;
		this._maxRotVelocities = 500;

		this._velChanged = false;
		this._inactiveTime = 0;
		
		this._doShockProcessing = true;

		this.isActive = this._activity = true;
		this._movable = true;
		this._origMovable = true;

		this.collisions = [];
		this._constraints = [];
		this._nonCollidables = [];

		this._storedPositionForActivation = [0,0,0,0];
		this._bodiesToBeActivatedOnMovement = [];
		this._lastPositionForDeactivation = this._currState.position.slice(0);
		this._lastOrientationForDeactivation = this._currState.get_orientation().clone();

		this._type = "Object3D";
		this._boundingSphere = 0;
		this._boundingBox = new JAABox([0,0,0,0], [0,0,0,0]);
		this._boundingBox.clear();
	};
	jigLib.extend(RigidBody,jigLib.JEventDispatcher);
	
	RigidBody.idCounter = 0;
	
	RigidBody.prototype._id=null;
	RigidBody.prototype._skin=null;
	RigidBody.prototype._type=null;
	RigidBody.prototype._boundingSphere=null;
	RigidBody.prototype._boundingBox=null;
	RigidBody.prototype._currState=null;
	RigidBody.prototype._oldState=null;
	RigidBody.prototype._storeState=null;
	RigidBody.prototype._invOrientation=null;
	RigidBody.prototype._currLinVelocityAux=null;
	RigidBody.prototype._currRotVelocityAux=null;

	RigidBody.prototype._mass=null;
	RigidBody.prototype._invMass=null;
	RigidBody.prototype._bodyInertia=null;
	RigidBody.prototype._bodyInvInertia=null;
	RigidBody.prototype._worldInertia=null;
	RigidBody.prototype._worldInvInertia=null;

	RigidBody.prototype._force=null;
	RigidBody.prototype._torque=null;
		
	RigidBody.prototype._linVelDamping=null;
	RigidBody.prototype._rotVelDamping=null;
	RigidBody.prototype._maxLinVelocities=null;
	RigidBody.prototype._maxRotVelocities=null;

	RigidBody.prototype._velChanged=null;
	RigidBody.prototype._activity=null;
	RigidBody.prototype._movable=null;
	RigidBody.prototype._origMovable=null;
	RigidBody.prototype._inactiveTime=null;
	RigidBody.prototype._doShockProcessing=null;

	// The list of bodies that need to be activated when we move away from our stored position
	RigidBody.prototype._bodiesToBeActivatedOnMovement=null;

	RigidBody.prototype._storedPositionForActivation=null;// The position stored when we need to notify other bodies
	RigidBody.prototype._lastPositionForDeactivation=null;// last position for when trying the deactivate
	RigidBody.prototype._lastOrientationForDeactivation=null;// last orientation for when trying to deactivate

	RigidBody.prototype._material=null;

	RigidBody.prototype._rotationX = 0;
	RigidBody.prototype._rotationY = 0;
	RigidBody.prototype._rotationZ = 0;
	RigidBody.prototype._useDegrees=null;

	RigidBody.prototype._nonCollidables=null;
	RigidBody.prototype._constraints=null;
	RigidBody.prototype.collisions=null;
	
	RigidBody.prototype.isActive=null;
	RigidBody.prototype.minImpulseForCollisionEvent = 1;
	
	/**
	 * @function dispatchCollisionEvent dispatches a JCollisionEvent
	 * @param {RigidBody} body the other body involved in the collision
	 * @param {Array} impulse a 3D vector representing the impulse applied to this body as a result of the collision
	 */
	RigidBody.prototype.dispatchCollisionEvent=function(body, impulse)
	{
		if (Vector3DUtil.getSum(impulse) < this.minImpulseForCollisionEvent)
			return;
		
		this.dispatchEvent(new JCollisionEvent(body, impulse));
	};
	
	/**
	 * @function radiansToDegrees converts radians to degrees
	 * @param {number} rad
	 * @type number
	 **/
	RigidBody.prototype.radiansToDegrees=function(rad){
		return rad * 180 / Math.PI;
	};
	
	/**
	 * @function degreesToRadians converts degrees to radians
	 * @param {number} deg
	 * @type number
	 **/
	RigidBody.prototype.degreesToRadians=function(deg){
		return deg * Math.PI / 180;
	};
	
	/**
	 * @function get_rotationX gets rotation in the X axis
	 * @type number
	 **/
	RigidBody.prototype.get_rotationX=function(){
		return this._rotationX;//(_useDegrees) ? radiansToDegrees(_rotationX) : _rotationX;
	};
	
	/**
	 * @function get_rotationY gets rotation in the Y axis
	 * @type number
	 **/
	RigidBody.prototype.get_rotationY=function(){
		return this._rotationY;//(_useDegrees) ? radiansToDegrees(_rotationY) : _rotationY;
	};

	/**
	 * @function get_rotationZ gets rotation in the Z axis
	 * @type number
	 **/
	RigidBody.prototype.get_rotationZ=function(){
		return this._rotationZ;//(_useDegrees) ? radiansToDegrees(_rotationZ) : _rotationZ;
	};
	
	/**
	 * @function set_rotationX sets rotation in the X axis
	 * @param {number} px
	 * @type void
	 **/
	RigidBody.prototype.set_rotationX=function(px){
		//var rad:Number = (_useDegrees) ? degreesToRadians(px) : px;
		this._rotationX = px;
		this.setOrientation(this.createRotationMatrix());
	};

	/**
	 * @function set_rotationY sets rotation in the Y axis
	 * @param {number} py
	 * @type void
	 **/
	RigidBody.prototype.set_rotationY=function(py){
		//var rad:Number = (_useDegrees) ? degreesToRadians(py) : py;
		this._rotationY = py;
		this.setOrientation(this.createRotationMatrix());
	};

	/**
	 * @function set_rotationZ sets rotation in the Z axis
	 * @param {number} pz
	 * @type void
	 **/
	RigidBody.prototype.set_rotationZ=function(pz){
		//var rad:Number = (_useDegrees) ? degreesToRadians(pz) : pz;
		this._rotationZ = pz;
		this.setOrientation(this.createRotationMatrix());
	};
	
	/**
	 * @function setRotation sets the rotation angle
	 * @param {array} vect [x,y,z] rotation
	 * @type void
	 **/
	RigidBody.prototype.setRotation=function(vect){
		this._rotationX=vect[0];
		this._rotationY=vect[1];
		this._rotationZ=vect[2];
		this.setOrientation(this.createRotationMatrix());
	};

	/**
	 * @function setRotation sets the pitch angle
	 * @param {number} rot
	 * @type void
	 **/
	RigidBody.prototype.pitch=function(rot){
		this.setOrientation(JMatrix3D.getAppendMatrix3D(this.get_currentState().orientation, JMatrix3D.getRotationMatrixAxis(rot, Vector3DUtil.X_AXIS)));
	};

	/**
	 * @function setRotation sets the yaw angle
	 * @param {number} rot
	 * @type void
	 **/
	RigidBody.prototype.yaw=function(rot){
		this.setOrientation(JMatrix3D.getAppendMatrix3D(this.get_currentState().orientation, JMatrix3D.getRotationMatrixAxis(rot, Vector3DUtil.Y_AXIS)));
	};

	/**
	 * @function setRotation sets the roll angle
	 * @param {number} rot
	 * @type void
	 **/
	RigidBody.prototype.roll=function(rot){
		this.setOrientation(JMatrix3D.getAppendMatrix3D(this.get_currentState().orientation, JMatrix3D.getRotationMatrixAxis(rot, Vector3DUtil.Z_AXIS)));
	};
	
	/**
	 * @function createRotationMatrix returns a rotation matrix based on the current angles of rotation
	 * @type Matrix3D
	 **/
	RigidBody.prototype.createRotationMatrix=function(){
		var matrix3D = new Matrix3D();
		matrix3D.appendRotation(this._rotationX, Vector3DUtil.X_AXIS);
		matrix3D.appendRotation(this._rotationY, Vector3DUtil.Y_AXIS);
		matrix3D.appendRotation(this._rotationZ, Vector3DUtil.Z_AXIS);
		return matrix3D;
	};

	/**
	 * @function setOrientation set orientation using a matrix
	 * @param orient Matrix3D
	 * @type void
	 **/
	RigidBody.prototype.setOrientation=function(orient){
		this._currState.set_orientation(orient.clone());
		this.updateInertia();
		this.updateState();
	};

	/**
	 * @function get_position gets the current position
	 * @returns a 3D vector
	 * @type array
	 **/
	RigidBody.prototype.get_position=function(){
		return this._currState.position;
	};

	/**
	 * @function get_x gets the current position in the X axis
	 * @type number
	 **/
	RigidBody.prototype.get_x=function(){
		return this._currState.position[0];
	};

	/**
	 * @function get_y gets the current position in the Y axis
	 * @type number
	 **/
	RigidBody.prototype.get_y=function(){
		return this._currState.position[1];
	};

	/**
	 * @function get_z gets the current position in the Z axis
	 * @type number
	 **/
	RigidBody.prototype.get_z=function(){
		return this._currState.position[2];
	};

	/**
	 * @function set_x sets the current position in the X axis
	 * @param {number} px
	 * @type void
	 **/
	RigidBody.prototype.set_x=function(px){
		this._currState.position[0] = px;
		this.updateState();
	};

	/**
	 * @function set_x sets the current position in the Y axis
	 * @param {number} py
	 * @type void
	 **/
	RigidBody.prototype.set_y=function(py){
		this._currState.position[1] = py;
		this.updateState();
	};

	/**
	 * @function set_x sets the current position in the Z axis
	 * @param {number} pz
	 * @type void
	 **/
	RigidBody.prototype.set_z=function(pz){
		this._currState.position[2] = pz;
		this.updateState();
	};
	
	/**
	 * @function move_to 
	 * @param {array} pos a 3D vector
	 * @type void
	 **/
	RigidBody.prototype.moveTo=function(pos){
		this._currState.position = pos.slice(0);
		this.updateState();
	};

	/**
	 * @function updateState 
	 * @type void
	 **/
	RigidBody.prototype.updateState=function(){
		this._currState.linVelocity = [0,0,0,0];
		this._currState.rotVelocity = [0,0,0,0];
		this.copyCurrentStateToOld();
		this.updateBoundingBox();
		this.setActive();
	};

	/**
	 * @function setVelocity 
	 * @param {array} vel velocity in each axis expressed as a 3D vector
	 * @param {boolean} local apply velocity in local frame
	 * @type void
	 **/
	RigidBody.prototype.setVelocity=function(vel,local){
		if(!local){
			this._currState.linVelocity = vel.slice(0);
		}else{
			var matrix=this._currState.get_orientation();
			this._currState.linVelocity[0]=matrix.glmatrix[0]*vel[0]+matrix.glmatrix[1]*vel[1]+matrix.glmatrix[2]*vel[2];
			this._currState.linVelocity[1]=matrix.glmatrix[4]*vel[0]+matrix.glmatrix[5]*vel[1]+matrix.glmatrix[6]*vel[2];
			this._currState.linVelocity[2]=matrix.glmatrix[8]*vel[0]+matrix.glmatrix[9]*vel[1]+matrix.glmatrix[10]*vel[2];
		}
	};

	/**
	 * @function setAngVel 
	 * @param {array} angVel a 3D vector
	 * @type void
	 **/
	RigidBody.prototype.setAngVel=function(angVel){
		this._currState.rotVelocity = angVel.slice(0);
	};

	/**
	 * @function setVelocityAux 
	 * @param {array} vel a 3D vector
	 * @type void
	 **/
	RigidBody.prototype.setVelocityAux=function(vel){
		this._currLinVelocityAux = vel.slice(0);
	};

	/**
	 * @function setAngVelAux 
	 * @param {array} angVel a 3D vector
	 * @type void
	 **/
	RigidBody.prototype.setAngVelAux=function(angVel){
		this._currRotVelocityAux = angVel.slice(0);
	};

	/**
	 * @function addGravity 
	 * @type void
	 **/
	RigidBody.prototype.addGravity=function(){
		if (!this._movable){
			return;
		}
		this._force = Vector3DUtil.add(this._force, JNumber3D.getScaleVector(jigLib.PhysicsSystem.getInstance().get_gravity(), this._mass));
		this._velChanged = true;
	};
	
	/**
	 * @function addExternalForces
	 * @param {number} dt a UNIX timestamp 
	 * @type void
	 **/
	RigidBody.prototype.addExternalForces=function(dt){
		this.addGravity();
	};

	/**
	 * @function addWorldTorque
	 * @param {array} t torque expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.addWorldTorque=function(t){
		if (!this._movable) return;
		
		this._torque = Vector3DUtil.add(this._torque, t);
		this._velChanged = true;
		this.setActive();
	};

	/**
	 * @function addBodyTorque
	 * @param {array} t torque expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.addBodyTorque=function(t){
		if (!this._movable) return;
		
		JMatrix3D.multiplyVector(this._currState.get_orientation(), t);
		this.addWorldTorque(t);
	};

	/**
	 * @function addWorldForce add forces in the world coordinate frame
	 * @param {array} f force expressed as a 3D vector
	 * @param {array} p position of origin of the force expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.addWorldForce=function(f, p){
		if (!this._movable) return;
		
		this._force = Vector3DUtil.add(this._force, f);
		this.addWorldTorque(Vector3DUtil.crossProduct(Vector3DUtil.subtract(p, this._currState.position), f));
		this._velChanged = true;
		this.setActive();
	};

	/**
	 * @function addBodyForce add forces in the body coordinate frame
	 * @param {array} f force expressed as a 3D vector
	 * @param {array} p position of origin of the force expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.addBodyForce=function(f, p){
		if (!this._movable){
			return;
		}
		JMatrix3D.multiplyVector(this._currState.get_orientation(), f);
		JMatrix3D.multiplyVector(this._currState.get_orientation(), p);
		this.addWorldForce(f, Vector3DUtil.add(this._currState.position, p));
	};

	/**
	 * @function clearForces remove active force and torque
	 * @type void
	 **/
	RigidBody.prototype.clearForces=function(){
		this._force = [0,0,0,0];
		this._torque = [0,0,0,0];
	};
	
	/**
	 * @function applyWorldImpulse add impulses in the world coordinate frame
	 * @param {array} impulse impulse expressed as a 3D vector
	 * @param {array} pos position of origin of the impulse expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.applyWorldImpulse=function(impulse, pos){
		if (!this._movable) return;
				
		this._currState.linVelocity = Vector3DUtil.add(this._currState.linVelocity, JNumber3D.getScaleVector(impulse, this._invMass));

		var rotImpulse = Vector3DUtil.crossProduct(Vector3DUtil.subtract(pos, this._currState.position), impulse);
		JMatrix3D.multiplyVector(this._worldInvInertia, rotImpulse);
		this._currState.rotVelocity = Vector3DUtil.add(this._currState.rotVelocity, rotImpulse);

		this._velChanged = true;
	};

	/**
	 * @function applyWorldImpulseAux
	 * @param {array} impulse impulse expressed as a 3D vector
	 * @param {array} pos position of origin of the impulse expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.applyWorldImpulseAux=function(impulse, pos){
		if (!this._movable) return;
						
		this._currLinVelocityAux = Vector3DUtil.add(this._currLinVelocityAux, JNumber3D.getScaleVector(impulse, this._invMass));

		var rotImpulse = Vector3DUtil.crossProduct(Vector3DUtil.subtract(pos, this._currState.position), impulse);
		JMatrix3D.multiplyVector(this._worldInvInertia, rotImpulse);
		this._currRotVelocityAux = Vector3DUtil.add(this._currRotVelocityAux, rotImpulse);

		this._velChanged = true;
	};

	/**
	 * @function applyBodyWorldImpulse add impulses in the body coordinate frame
	 * @param {array} impulse impulse expressed as a 3D vector
	 * @param {array} delta impulse delta expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.applyBodyWorldImpulse=function(impulse, delta){

		if (!this._movable) return;
				
		this._currState.linVelocity = Vector3DUtil.add(this._currState.linVelocity, JNumber3D.getScaleVector(impulse, this._invMass));
		var rotImpulse = Vector3DUtil.crossProduct(delta, impulse); 
		JMatrix3D.multiplyVector(this._worldInvInertia, rotImpulse);
		this._currState.rotVelocity = Vector3DUtil.add(this._currState.rotVelocity, rotImpulse);

		this._velChanged = true;
	};

	/**
	 * @function applyBodyWorldImpulseAux
	 * @param {array} impulse impulse expressed as a 3D vector
	 * @param {array} delta impulse delta expressed as a 3D vector 
	 * @type void
	 **/
	RigidBody.prototype.applyBodyWorldImpulseAux=function(impulse, delta){
		if (!this._movable) return;
				
		this._currLinVelocityAux = Vector3DUtil.add(this._currLinVelocityAux, JNumber3D.getScaleVector(impulse, this._invMass));

		var rotImpulse = Vector3DUtil.crossProduct(delta, impulse);
		JMatrix3D.multiplyVector(this._worldInvInertia, rotImpulse);
		this._currRotVelocityAux = Vector3DUtil.add(this._currRotVelocityAux, rotImpulse);

		this._velChanged = true;
	};

	/**
	 * @function addConstraint add a constraint to this body
	 * @param {JConstraint} constraint the constraint
	 * @type void
	 **/
	RigidBody.prototype.addConstraint=function(constraint){
		if (!this.findConstraint(constraint)){
			this._constraints.push(constraint);
		}
	};

	/**
	 * @function removeConstraint remove a constraint from this body
	 * @param {JConstraint} constraint the constraint
	 * @type void
	 **/
	RigidBody.prototype.removeConstraint=function(constraint){
		if (this.findConstraint(constraint)){
			this._constraints.splice(this._constraints.indexOf(constraint), 1);
		}
	};

	/**
	 * @function removeAllConstraints remove all constraints from this body
	 * @type void
	 **/
	RigidBody.prototype.removeAllConstraints=function(){
		this._constraints = [];
	};

	/**
	 * @function findConstraint checks if a given constraint is applied to this body
	 * @param {JConstraint} constraint the constraint
	 * @type void
	 **/
	RigidBody.prototype.findConstraint=function(constraint){
		for(var i=0, cl=this._constraints.length; i<cl; i++){
			if (constraint == this._constraints[i]){
				return true;
			}
		}
		return false;
	};

	/**
	 * @function updateVelocity update the velocity/angular rotation with the force/torque
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	RigidBody.prototype.updateVelocity=function(dt){
		if (!this._movable || !this._activity) 
			return;
		
		this._currState.linVelocity = Vector3DUtil.add(this._currState.linVelocity, JNumber3D.getScaleVector(this._force, this._invMass * dt));

		var rac = JNumber3D.getScaleVector(this._torque, dt);
		JMatrix3D.multiplyVector(this._worldInvInertia, rac);
		this._currState.rotVelocity = Vector3DUtil.add(this._currState.rotVelocity, rac);
	};
	
	/**
	 * @function updateVelocity update the position with the auxiliary velocities, and zeros them
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	RigidBody.prototype.updatePositionWithAux=function(dt){
		if (!this._movable || !this._activity){
			this._currLinVelocityAux = [0,0,0,0];
			this._currRotVelocityAux = [0,0,0,0];
			return;
		}
		
		var ga = jigLib.PhysicsSystem.getInstance().get_gravityAxis();
		
		if (ga != -1){
			var arr = this._currLinVelocityAux.slice(0);
			arr[(ga + 1) % 3] *= 0.1;
			arr[(ga + 2) % 3] *= 0.1;
			JNumber3D.copyFromArray(this._currLinVelocityAux, arr);
		}

		var angMomBefore = this._currState.rotVelocity.slice(0);
		JMatrix3D.multiplyVector(this._worldInertia, angMomBefore);
		
		this._currState.position = Vector3DUtil.add(this._currState.position, JNumber3D.getScaleVector(Vector3DUtil.add(this._currState.linVelocity, this._currLinVelocityAux), dt));

		var dir = Vector3DUtil.add(this._currState.rotVelocity, this._currRotVelocityAux);
		var ang = Vector3DUtil.get_length(dir) * 180 / Math.PI;
		if (ang > 0){
			Vector3DUtil.normalize(dir);
			ang *= dt;
			var rot = JMatrix3D.getRotationMatrix(dir[0], dir[1], dir[2], ang);
			this._currState.set_orientation(JMatrix3D.getAppendMatrix3D(this._currState.get_orientation(), rot));
				
			this.updateInertia();
		}
		this._currLinVelocityAux = [0,0,0,0];
		this._currRotVelocityAux = [0,0,0,0];
		
		JMatrix3D.multiplyVector(this._worldInvInertia, angMomBefore);
		this._currState.rotVelocity = angMomBefore.slice(0);
			
		this.updateBoundingBox();
	};

	/**
	 * @function postPhysics to be implemented by inheriting classes
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	RigidBody.prototype.postPhysics=function(dt){};

	/**
	 * @function tryToFreeze provided for the use of Physics system
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	RigidBody.prototype.tryToFreeze=function(dt){
		if (!this._movable || !this._activity)
			return;
		
		if (Vector3DUtil.get_length(Vector3DUtil.subtract(this._currState.position, this._lastPositionForDeactivation)) > JConfig.posThreshold){
			this._lastPositionForDeactivation = this._currState.position.slice(0);
			this._inactiveTime = 0;
			return;
		}
		
		var ot = JConfig.orientThreshold;
		var deltaMat = JMatrix3D.getSubMatrix(this._currState.get_orientation(), this._lastOrientationForDeactivation);

		var cols = JMatrix3D.getCols(deltaMat);

		if (Vector3DUtil.get_length(cols[0]) > ot || Vector3DUtil.get_length(cols[1]) > ot || Vector3DUtil.get_length(cols[2]) > ot){
			this._lastOrientationForDeactivation = this._currState.get_orientation().clone();
			this._inactiveTime = 0;
			return;
		}

		if (this.getShouldBeActive()){
			return;
		}

		this._inactiveTime += dt;
		if (this._inactiveTime > JConfig.deactivationTime){
			this._lastPositionForDeactivation = this._currState.position.slice(0);
			this._lastOrientationForDeactivation = this._currState.get_orientation().clone();
			this.setInactive();
		}
	};

	/**
	 * @function set_mass set the mass for this body
	 * @param {number} m the mass
	 * @type void
	 **/
	RigidBody.prototype.set_mass=function(m){
		this._mass = m;
		this._invMass = 1 / m;
		this.setInertia(this.getInertiaProperties(m));
	};

	/**
	 * @function setInertia set the inertia for this body
	 * @param {Matrix3D} matrix3D the inertia expressed as a 3D matrix
	 * @type void
	 **/
	RigidBody.prototype.setInertia=function(matrix3D){
		this._bodyInertia =  matrix3D.clone();
		this._bodyInvInertia = JMatrix3D.getInverseMatrix(this._bodyInertia.clone());
			
		this.updateInertia();
	};
	
	/**
	 * @function updateInertia
	 * @type void
	 **/
	RigidBody.prototype.updateInertia=function(){
		this._invOrientation = JMatrix3D.getTransposeMatrix(this._currState.get_orientation());
			
		this._worldInertia = JMatrix3D.getAppendMatrix3D(
			this._invOrientation,
			JMatrix3D.getAppendMatrix3D(this._currState.get_orientation(), this._bodyInertia)
		);

		this._worldInvInertia = JMatrix3D.getAppendMatrix3D(
			this._invOrientation,
				JMatrix3D.getAppendMatrix3D(this._currState.get_orientation(), this._bodyInvInertia)
			);
	};

	/**
	 * @function get_movable checks if this body is movable
	 * @type boolean
	 **/
	RigidBody.prototype.get_movable=function(){
		return this._movable;
	};

	/**
	 * @function set_movable set whether this body is movable or not - if this is a PLANE or TERRAIN this method does nothing (movable is always false)
	 * @param {boolean} mov 
	 * @type void
	 **/
	RigidBody.prototype.set_movable=function(mov){
		if (this._type == "PLANE" || this._type == "TERRAIN" || this._type == "TRIANGLEMESH") 
			return;

		this._movable = mov;
		this.isActive = this._activity = mov;
		this._origMovable = mov;
	};

	/**
	 * @function internalSetImmovable for internal use
	 * @type void
	 **/
	RigidBody.prototype.internalSetImmovable=function(){
		if (this._type == "PLANE" || this._type == "TERRAIN" || this._type == "TRIANGLEMESH") 
			return;
		this._origMovable = this._movable;
		this._movable = false;
	};

	/**
	 * @function internalRestoreImmovable for internal use
	 * @type void
	 **/
	RigidBody.prototype.internalRestoreImmovable=function(){
		if (this._type == "PLANE" || this._type == "TERRAIN" || this._type == "TRIANGLEMESH") 
			return;
		this._movable = this._origMovable;
	};

	/**
	 * @function getVelChanged checks whether velocity has changed
	 * @type boolean
	 **/
	RigidBody.prototype.getVelChanged=function(){
		return this._velChanged;
	};

	/**
	 * @function clearVelChanged resets the velocity changed flag
	 * @type void
	 **/
	RigidBody.prototype.clearVelChanged=function(){
		this._velChanged = false;
	};

	/**
	 * @function setActive makes this body active
	 * @param {number} activityFactor
	 * @type void
	 **/
	RigidBody.prototype.setActive=function(activityFactor){
		if(!activityFactor) activityFactor=1;
		if (this._movable){
			this.isActive = this._activity = true;
			this._inactiveTime = (1 - activityFactor) * JConfig.deactivationTime;
		}
	};

	/**
	 * @function setInactive makes this body inactive
	 * @type void
	 **/
	RigidBody.prototype.setInactive=function(){
		if (this._movable){
			this.isActive = this._activity = false;
		}
	};

	/**
	 * @function getVelocity gets the velocity of a point at body-relative position
	 * @param {array} relPos the body-relative position expressed as a 3D vector
	 * @type array
	 **/
	RigidBody.prototype.getVelocity=function(relPos){
		return Vector3DUtil.add(this._currState.linVelocity, Vector3DUtil.crossProduct(this._currState.rotVelocity, relPos));
	};

	/**
	 * @function getVelocityAux gets the velocity of a point at body-relative position using aux velocities
	 * @param {array} relPos the body-relative position expressed as a 3D vector
	 * @type array
	 **/
	RigidBody.prototype.getVelocityAux=function(relPos){
		return Vector3DUtil.add(this._currLinVelocityAux, Vector3DUtil.crossProduct(this._currRotVelocityAux, relPos));
	};
		

	/**
	 * @function getShouldBeActive indicates if the velocity is above the threshold for freezing
	 * @type boolean
	 **/
	RigidBody.prototype.getShouldBeActive=function(){
		return ((Vector3DUtil.get_length(this._currState.linVelocity) > JConfig.velThreshold) || (Vector3DUtil.get_length(this._currState.rotVelocity) > JConfig.angVelThreshold));
	};

	/**
	 * @function getShouldBeActiveAux indicates if the aux velocity is above the threshold for freezing
	 * @type boolean
	 **/
	RigidBody.prototype.getShouldBeActiveAux=function(){
		return ((Vector3DUtil.get_length(this._currLinVelocityAux) > JConfig.velThreshold) || (Vector3DUtil.get_length(this._currRotVelocityAux) > JConfig.angVelThreshold));
	};

	/**
	 * @function dampForDeactivation damp movement as the body approaches deactivation
	 * @type void
	 **/
	RigidBody.prototype.dampForDeactivation=function(){
		this._currState.linVelocity[0] *= this._linVelDamping[0];
		this._currState.linVelocity[1] *= this._linVelDamping[1];
		this._currState.linVelocity[2] *= this._linVelDamping[2];
		this._currState.rotVelocity[0] *= this._rotVelDamping[0];
		this._currState.rotVelocity[1] *= this._rotVelDamping[1];
		this._currState.rotVelocity[2] *= this._rotVelDamping[2];
			
		this._currLinVelocityAux[0] *= this._linVelDamping[0];
		this._currLinVelocityAux[1] *= this._linVelDamping[1];
		this._currLinVelocityAux[2] *= this._linVelDamping[2];
		this._currRotVelocityAux[0] *= this._rotVelDamping[0];
		this._currRotVelocityAux[1] *= this._rotVelDamping[1];
		this._currRotVelocityAux[2] *= this._rotVelDamping[2];
			
		var r = 0.5;
		var frac = this._inactiveTime / JConfig.deactivationTime;
		if (frac < r){
			return;
		}

		var scale = 1 - ((frac - r) / (1 - r));
		if (scale < 0){
			scale = 0;
		}else if (scale > 1){
			scale = 1;
		}
		this._currState.linVelocity = JNumber3D.getScaleVector(this._currState.linVelocity, scale);
		this._currState.rotVelocity = JNumber3D.getScaleVector(this._currState.rotVelocity, scale);
	};

	/**
	 * @function doMovementActivations provided for use of physics system. 
	 * Activates any body in its list if it's moved more than a certain distance,
	 * in which case it also clears its list.
	 * @type void
	 **/
	RigidBody.prototype.doMovementActivations=function(){
		var numBodies = this._bodiesToBeActivatedOnMovement.length;
		if (numBodies == 0 || Vector3DUtil.get_length(Vector3DUtil.subtract(this._currState.position, this._storedPositionForActivation)) < JConfig.posThreshold)
			return;
		
		for (var i = 0; i<numBodies; i++){
			jigLib.PhysicsSystem.getInstance().activateObject(this._bodiesToBeActivatedOnMovement[i]);
		}
		this._bodiesToBeActivatedOnMovement = [];
	};

	/**
	 * @function addMovementActivation adds the other body to the list of bodies to be activated if this body 
	 * moves more than a certain distance from either a previously stored position, or the position passed in.
	 * in which case it also clears its list.
	 * 
	 * @param {array} pos position expressed as a 3D vector
	 * @param {RigidBody} otherBody the other body
	 * @type void
	 **/
	RigidBody.prototype.addMovementActivation=function(pos, otherBody){
		var len = this._bodiesToBeActivatedOnMovement.length;
		for (var i = 0; i < len; i++){
			if (this._bodiesToBeActivatedOnMovement[i] == otherBody){
				return;
			}
		}
		if (this._bodiesToBeActivatedOnMovement.length == 0){
			this._storedPositionForActivation = pos;
		}
		this._bodiesToBeActivatedOnMovement.push(otherBody);
	};

	/**
	 * @function setConstraintsAndCollisionsUnsatisfied marks all constraints/collisions as being unsatisfied 
	 * 
	 * @type void
	 **/
	RigidBody.prototype.setConstraintsAndCollisionsUnsatisfied=function(){
		for(var i=0, cl=this._constraints.length; i<cl; i++){
			this._constraints[i].set_satisfied(false);
		}
		for(var i=0, cll=this.collisions.length; i<cll; i++){
			this.collisions[i].satisfied = false;
		}
	};

	/**
	 * @function segmentIntersect to be implemented by inheriting classes
	 * @param {object} out
	 * @param {JSegment} seg
	 * @param {PhysicsState} state
	 * @type boolean
	 **/
	RigidBody.prototype.segmentIntersect=function(out, seg, state){
		return false;
	};

	/**
	 * @function getInertiaProperties to be implemented by inheriting classes
	 * @param {number} m
	 * @type Matrix3D
	 **/
	RigidBody.prototype.getInertiaProperties=function(m){
		return new Matrix3D();
	};
		
	/**
	 * @function updateBoundingBox to be implemented by inheriting classes
	 * @type void
	 **/
	RigidBody.prototype.updateBoundingBox=function(){
	};

	/**
	 * @function hitTestObject3D
	 * @param {RigidBody} obj3D
	 * @type boolean
	 **/
	RigidBody.prototype.hitTestObject3D=function(obj3D){
		var num1 = Vector3DUtil.get_length(Vector3DUtil.subtract(this._currState.position, obj3D.get_currentState().position));
		var num2 = this._boundingSphere + obj3D.get_boundingSphere();

		if (num1 <= num2){
			return true;
		}

		return false;
	};

	/**
	 * @function findNonCollidablesBody
	 * @param {RigidBody} body
	 * @type boolean
	 **/
	RigidBody.prototype.findNonCollidablesBody=function(body){
		for(var i=0, ncl=this._nonCollidables.length; i<ncl; i++){
			if (body == this._nonCollidables[i])
				return true;
		}
		return false;
	};

	/**
	 * @function disableCollisions
	 * @param {RigidBody} body
	 * @type void
	 **/
	RigidBody.prototype.disableCollisions=function(body){
		if (!this.findNonCollidablesBody(body)){
			this._nonCollidables.push(body);
		}
	};

	/**
	 * @function enableCollisions
	 * @param {RigidBody} body
	 * @type void
	 **/
	RigidBody.prototype.enableCollisions=function(body){
		if (this.findNonCollidablesBody(body)){
			this._nonCollidables.splice(this._nonCollidables.indexOf(body), 1);
		}
	};

	/**
	 * @function copyCurrentStateToOld copies the current position etc to old - normally called only by physicsSystem.
	 * @type void
	 **/
	RigidBody.prototype.copyCurrentStateToOld=function(){
		this._oldState.position = this._currState.position.slice(0);
		this._oldState.set_orientation(this._currState.get_orientation().clone());
		this._oldState.linVelocity = this._currState.linVelocity.slice(0);
		this._oldState.rotVelocity = this._currState.rotVelocity.slice(0);
	};

	/**
	 * @function storeState copy the current state into the stored state
	 * @type void
	 **/
	RigidBody.prototype.storeState=function(){
		this._storeState.position = this._currState.position.slice(0);
		this._storeState.set_orientation(this._currState.get_orientation().clone());
		this._storeState.linVelocity = this._currState.linVelocity.slice(0);
		this._storeState.rotVelocity = this._currState.rotVelocity.slice(0);
	};

	/**
	 * @function restoreState restore from the stored state into the current state.
	 * @type void
	 **/
	RigidBody.prototype.restoreState=function(){
		this._currState.position = this._storeState.position.slice(0);
		this._currState.set_orientation(this._storeState.get_orientation().clone());
		this._currState.linVelocity = this._storeState.linVelocity.slice(0);
		this._currState.rotVelocity = this._storeState.rotVelocity.slice(0);
	};

	/**
	 * @function get_currentState get the "working" state
	 * @type PhysicsState
	 **/
	RigidBody.prototype.get_currentState=function(){
		return this._currState;
	};

	/**
	 * @function get_oldState the previous state - copied explicitly using copyCurrentStateToOld
	 * @type PhysicsState
	 **/
	RigidBody.prototype.get_oldState=function(){
		return this._oldState;
	};

	/**
	 * @function get_id the unique ID for this body
	 * @type number
	 **/
	RigidBody.prototype.get_id=function(){
		return this._id;
	};

	/**
	 * @function get_id the body type (e.g. BOX, PLANE, SPHERE etc.)
	 * @type string
	 **/
	RigidBody.prototype.get_type=function(){
		return this._type;
	};

	/**
	 * @function get_skin the skin 
	 * @type ISkin3D
	 **/
	RigidBody.prototype.get_skin=function(){
		return this._skin;
	};

	/**
	 * @function get_boundingSphere the bounding sphere radius
	 * @type number
	 **/
	RigidBody.prototype.get_boundingSphere=function(){
		return this._boundingSphere;
	};
		
	/**
	 * @function get_boundingSphere the bounding box dimensions
	 * @type JAABox
	 **/
	RigidBody.prototype.get_boundingBox=function(){
		return this._boundingBox;
	};

	/**
	 * @function get_force current force in world frame expressed as a 3D vector
	 * @type array
	 **/
	RigidBody.prototype.get_force=function(){
		return this._force;
	};

	/**
	 * @function get_mass the mass of this body
	 * @type number
	 **/
	RigidBody.prototype.get_mass=function(){
		return this._mass;
	};

	/**
	 * @function get_invMass the inverse mass of this body
	 * @type number
	 **/
	RigidBody.prototype.get_invMass=function(){
		return this._invMass;
	};

	/**
	 * @function get_worldInertia the inertia tensor in world space
	 * @type Matrix3D
	 **/
	RigidBody.prototype.get_worldInertia=function(){
		return this._worldInertia;
	};

	/**
	 * @function get_worldInvInertia the inverse inertia tensor in world space
	 * @type Matrix3D
	 **/
	RigidBody.prototype.get_worldInvInertia=function(){
		return this._worldInvInertia;
	};

	/**
	 * @function get_nonCollidables 
	 * @returns a collection of RigidBody objects
	 * @type array
	 **/
	RigidBody.prototype.get_nonCollidables=function(){
		return this._nonCollidables;
	};
	
	/**
	 * @function get_doShockProcessing returns whether shock processing is being applied to this body
	 * @type boolean
	 **/
	RigidBody.prototype.get_doShockProcessing=function(){
		return this._doShockProcessing;
	};
	
	/**
	 * @function set_doShockProcessing sets whether shock processing should be applied to this body
	 * @param {boolean} doShock
	 * @type void
	 **/
	RigidBody.prototype.set_doShockProcessing=function(doShock){
		this._doShockProcessing = doShock;
	};

	/**
	 * @function set_linVelocityDamping each dimension will be limited to the range 0-1
	 * @param {array} vel a 3D vector
	 * @type void
	 **/
	RigidBody.prototype.set_linVelocityDamping=function(vel){
		this._linVelDamping[0] = JNumber3D.getLimiteNumber(vel[0], 0, 1);
		this._linVelDamping[1] = JNumber3D.getLimiteNumber(vel[1], 0, 1);
		this._linVelDamping[2] = JNumber3D.getLimiteNumber(vel[2], 0, 1);
	};
		
	/**
	 * @function get_linVelocityDamping
	 * @type array
	 **/
	RigidBody.prototype.get_linVelocityDamping=function(){
		return this._linVelDamping;
	};
		
	/**
	 * @function set_rotVelocityDamping each dimension will be limited to the range 0-1
	 * @param {array} vel a 3D vector
	 * @type void
	 **/
	RigidBody.prototype.set_rotVelocityDamping=function(vel){
		this._rotVelDamping[0] = JNumber3D.getLimiteNumber(vel[0], 0, 1);
		this._rotVelDamping[1] = JNumber3D.getLimiteNumber(vel[1], 0, 1);
		this._rotVelDamping[2] = JNumber3D.getLimiteNumber(vel[2], 0, 1);
	};
	
	/**
	 * @function get_rotVelocityDamping
	 * @type array
	 **/
	RigidBody.prototype.get_rotVelocityDamping=function(){
		return this._rotVelDamping;
	};
		
	/**
	 * @function set_maxLinVelocities limit the max value of body's line velocity
	 * @param {number} vel
	 * @type void
	 **/
	RigidBody.prototype.set_maxLinVelocities=function(vel){
		this._maxLinVelocities = JNumber3D.getLimiteNumber(Math.abs(vel), 0, 500);
	};
	
	/**
	 * @function get_maxLinVelocities
	 * @type number
	 **/
	RigidBody.prototype.get_maxLinVelocities=function(){
		return this._maxLinVelocities;
	};

	/**
	 * @function set_maxRotVelocities limit the max value of body's angle velocity
	 * @param {number} vel
	 * @type void
	 **/
	RigidBody.prototype.set_maxRotVelocities=function(vel){
		this._maxRotVelocities = JNumber3D.getLimiteNumber(Math.abs(vel), JNumber3D.NUM_TINY, 50);
	};
	
	/**
	 * @function get_maxRotVelocities
	 * @type number
	 **/
	RigidBody.prototype.get_maxRotVelocities=function(){
		return this._maxRotVelocities;
	};

	/**
	 * @function limitVel
	 * @type void
	 **/
	RigidBody.prototype.limitVel=function(){
		this._currState.linVelocity[0] = JNumber3D.getLimiteNumber(this._currState.linVelocity[0], -this._maxLinVelocities, this._maxLinVelocities);
		this._currState.linVelocity[1] = JNumber3D.getLimiteNumber(this._currState.linVelocity[1], -this._maxLinVelocities, this._maxLinVelocities);
		this._currState.linVelocity[2] = JNumber3D.getLimiteNumber(this._currState.linVelocity[2], -this._maxLinVelocities, this._maxLinVelocities);
	};

	/**
	 * @function limitAngVel
	 * @type void
	 **/
	RigidBody.prototype.limitAngVel=function(){
		var fx = Math.abs(this._currState.rotVelocity[0]) / this._maxRotVelocities;
		var fy = Math.abs(this._currState.rotVelocity[1]) / this._maxRotVelocities;
		var fz = Math.abs(this._currState.rotVelocity[2]) / this._maxRotVelocities;
		var f = Math.max(fx, fy, fz);
		if (f > 1)
			this._currState.rotVelocity = JNumber3D.getDivideVector(this._currState.rotVelocity, f);
	};

	/**
	 * @function getTransform gets the transform matrix for the skin
	 * @type Matrix3D
	 **/
	RigidBody.prototype.getTransform=function(){
		if (this._skin != null){
			return this._skin.get_transform();
		}else{
			return null;
		}
	};

	/**
	 * @function updateObject3D updates the skin
	 * @type void
	 **/
	RigidBody.prototype.updateObject3D=function(){
		if (this._skin != null)
			this._skin.set_transform(JMatrix3D.getAppendMatrix3D(this._currState.get_orientation(), JMatrix3D.getTranslationMatrix(this._currState.position[0], this._currState.position[1], this._currState.position[2])));
	};

	/**
	 * @function get_material
	 * @type MaterialProperties
	 **/
	RigidBody.prototype.get_material=function(){
		return this._material;
	};

	/**
	 * @function get_restitution get the coefficient of elasticity
	 * @type number
	 **/
	RigidBody.prototype.get_restitution=function(){
		return this._material.get_restitution();
	};

	/**
	 * @function set_restitution set the coefficient of elasticity
	 * @param {number} restitution
	 * @type void
	 **/
	RigidBody.prototype.set_restitution=function(restitution){
		this._material.set_restitution(JNumber3D.getLimiteNumber(restitution, 0, 1));
	};

	/**
	 * @function get_friction get the coefficient of friction
	 * @type number
	 **/
	RigidBody.prototype.get_friction=function(){
		return this._material.get_friction();
	};

	/**
	 * @function set_friction set the coefficient of friction
	 * @param {number} restitution
	 * @type void
	 **/
	RigidBody.prototype.set_friction=function(friction){
		this._material.set_friction(JNumber3D.getLimiteNumber(friction, 0, 1));
	};
	
	jigLib.RigidBody=RigidBody;
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraintMaxDistance=jigLib.JConstraintMaxDistance;
	var JConstraintPoint=jigLib.JConstraintPoint;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name HingeJoint
	 * @class HingeJoint hinge connector for two rigid bodies
	 * @extends PhysicsController
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @requires JConstraintMaxDistance
	 * @requires JConstraintPoint
	 * @constant {number} MAX_HINGE_ANGLE_LIMIT
	 * @property {array} _hingeAxis
	 * @property {array} _hingePosRel0
	 * @property {RigidBody} body0 the first rigid body 
	 * @property {RigidBody} body1 the second rigid body 
	 * @property {boolean} _usingLimit
	 * @property {boolean} _hingeEnabled
	 * @property {boolean} _broken
	 * @property {number} _damping
	 * @property {number} _extraTorque
	 * @property {array} sidePointConstraints used to store 2 JConstraintMaxDistance instances
	 * @property {JConstraintPoint} midPointConstraint
	 * @property {JConstraintMaxDistance} maxDistanceConstraint
	 * @property {array} r a 3D vector
	 * @constructor
	 * @param {RigidBody} _body0 the first body of the constrained pair
	 * @param {RigidBody} _body1 the second body of the constrained pair
	 * @param {array} _hingeAxis
	 * @param {array} _hingePosRel0
	 * @param {number} hingeHalfWidth
	 * @param {number} hingeFwdAngle
	 * @param {number} hingeBckAngle
	 * @param {number} sidewaysSlack
	 * @param {number} damping
	 **/
	var HingeJoint=function(body0, body1, hingeAxis, hingePosRel0, hingeHalfWidth, hingeFwdAngle, hingeBckAngle, sidewaysSlack, damping){
		this._body0 = body0;
		this._body1 = body1;
		this._hingeAxis = hingeAxis.slice(0);
		this._hingePosRel0 = hingePosRel0.slice(0);
		this._usingLimit = false;
		this._hingeEnabled = false;
		this._broken = false;
		this._damping = damping;
		this._extraTorque = 0;

		Vector3DUtil.normalize(this._hingeAxis);
		var _hingePosRel1 = Vector3DUtil.add(this._body0.get_currentState().position, Vector3DUtil.subtract(this._hingePosRel0, this._body1.get_currentState().position));

		var relPos0a = Vector3DUtil.add(this._hingePosRel0, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));
		var relPos0b = Vector3DUtil.subtract(this._hingePosRel0, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));

		var relPos1a = Vector3DUtil.add(_hingePosRel1, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));
		var relPos1b = Vector3DUtil.subtract(_hingePosRel1, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));

		var timescale = 1 / 20;
		var allowedDistanceMid = 0.005;
		var allowedDistanceSide = sidewaysSlack * hingeHalfWidth;

		this.sidePointConstraints = [];
		this.sidePointConstraints[0] = new JConstraintMaxDistance(this._body0, relPos0a, this._body1, relPos1a, allowedDistanceSide);
		this.sidePointConstraints[1] = new JConstraintMaxDistance(this._body0, relPos0b, this._body1, relPos1b, allowedDistanceSide);

		this.midPointConstraint = new JConstraintPoint(this._body0, this._hingePosRel0, this._body1, _hingePosRel1, allowedDistanceMid, timescale);

		if (hingeFwdAngle <= this.MAX_HINGE_ANGLE_LIMIT){
			var perpDir = Vector3DUtil.Y_AXIS;
			if (Vector3DUtil.dotProduct(perpDir, this._hingeAxis) > 0.1){
				perpDir[0] = 1;
				perpDir[1] = 0;
				perpDir[2] = 0;
			}
			var sideAxis = Vector3DUtil.crossProduct(this._hingeAxis, perpDir);
			perpDir = Vector3DUtil.crossProduct(sideAxis, this._hingeAxis);
			Vector3DUtil.normalize(perpDir);

			var len = 10 * hingeHalfWidth;
			var hingeRelAnchorPos0 = JNumber3D.getScaleVector(perpDir, len);
			var angleToMiddle = 0.5 * (hingeFwdAngle - hingeBckAngle);
			var hingeRelAnchorPos1 = hingeRelAnchorPos0.slice(0);
			JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(this._hingeAxis[0], this._hingeAxis[1], this._hingeAxis[2], -angleToMiddle), hingeRelAnchorPos1);

			var hingeHalfAngle = 0.5 * (hingeFwdAngle + hingeBckAngle);
			var allowedDistance = len * 2 * Math.sin(0.5 * hingeHalfAngle * Math.PI / 180);

			var hingePos = Vector3DUtil.add(this._body1.get_currentState().position, this._hingePosRel0);
			var relPos0c = Vector3DUtil.add(hingePos, Vector3DUtil.subtract(hingeRelAnchorPos0, this._body0.get_currentState().position));
			var relPos1c = Vector3DUtil.add(hingePos, Vector3DUtil.subtract(hingeRelAnchorPos1, this._body1.get_currentState().position));

			this.maxDistanceConstraint = new JConstraintMaxDistance(this._body0, relPos0c, this._body1, relPos1c, allowedDistance);
			this._usingLimit = true;
		}
		if (this._damping <= 0){
			this._damping = -1;
		}else{
			this._damping = JNumber3D.getLimiteNumber(this._damping, 0, 1);
		}

		this.enableHinge();
	};
	jigLib.extend(HingeJoint, jigLib.PhysicsController);
	
	HingeJoint.prototype.MAX_HINGE_ANGLE_LIMIT = 150;
	HingeJoint.prototype._hingeAxis = null;
	HingeJoint.prototype._hingePosRel0 = null;
	HingeJoint.prototype._body0 = null;
	HingeJoint.prototype._body1 = null;
	HingeJoint.prototype._usingLimit = null;
	HingeJoint.prototype._hingeEnabled = null;
	HingeJoint.prototype._broken = null;
	HingeJoint.prototype._damping = null;
	HingeJoint.prototype._extraTorque = null;
	
	HingeJoint.prototype.sidePointConstraints = null;
	HingeJoint.prototype.midPointConstraint = null;
	HingeJoint.prototype.maxDistanceConstraint = null;

	/**
	 * @function enableHinge enable the joint
	 * @type void
	 **/
	HingeJoint.prototype.enableHinge=function(){
		if (this._hingeEnabled) return;
		
		this.midPointConstraint.enableConstraint();
		this.sidePointConstraints[0].enableConstraint();
		this.sidePointConstraints[1].enableConstraint();
		if (this._usingLimit && !this._broken)
			this.maxDistanceConstraint.enableConstraint();

		this.enableController();
		this._hingeEnabled = true;
	};

	/**
	 * @function disableHinge disable the joint
	 * @type void
	 **/
	HingeJoint.prototype.disableHinge=function(){
		if (!this._hingeEnabled) return;

		this.midPointConstraint.disableConstraint();
		this.sidePointConstraints[0].disableConstraint();
		this.sidePointConstraints[1].disableConstraint();

		if (this._usingLimit && !this._broken)
			this.maxDistanceConstraint.disableConstraint();

		this.disableController();
		this._hingeEnabled = false;
	};

	/**
	 * @function breakHinge break the joint
	 * @type void
	 **/
	HingeJoint.prototype.breakHinge=function(){
		if (this._broken) return;

		if (this._usingLimit)
			this.maxDistanceConstraint.disableConstraint();

		this._broken = true;
	};

	/**
	 * @function mendHinge repair the joint
	 * @type void
	 **/
	HingeJoint.prototype.mendHinge=function(){
		if (!this._broken)
			return;

		if (this._usingLimit)
			this.maxDistanceConstraint.enableConstraint();

		this._broken = false;
	};

	/**
	 * @function setExtraTorque setter for _extraTorque
	 * @param {number} torque
	 * @type void
	 **/
	HingeJoint.prototype.setExtraTorque=function(torque){
		this._extraTorque = torque;
	};

	/**
	 * @function getExtraTorque getter for _extraTorque
	 * @type number
	 **/
	HingeJoint.prototype.getHingeEnabled=function(){
		return this._hingeEnabled;
	};

	/**
	 * @function isBroken getter for _broken
	 * @type boolean
	 **/
	HingeJoint.prototype.isBroken=function(){
		return this._broken;
	};

	/**
	 * @function getHingePosRel0 getter for _hingePosRel0
	 * @type array
	 **/
	HingeJoint.prototype.getHingePosRel0=function(){
		return this._hingePosRel0;
	};

	/**
	 * @function updateController updates this physics controller
	 * @see PhysicsSystem.updateController
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	HingeJoint.prototype.updateController=function(dt){
		if (this._damping > 0){
			var hingeAxis = Vector3DUtil.subtract(this._body1.get_currentState().rotVelocity, this._body0.get_currentState().rotVelocity);
			Vector3DUtil.normalize(hingeAxis);

			var angRot1 = Vector3DUtil.dotProduct(this._body0.get_currentState().rotVelocity, hingeAxis);
			var angRot2 = Vector3DUtil.dotProduct(this._body1.get_currentState().rotVelocity, hingeAxis);

			var avAngRot = 0.5 * (angRot1 + angRot2);
			var frac = 1 - this._damping;
			var newAngRot1= avAngRot + (angRot1 - avAngRot) * frac;
			var newAngRot2= avAngRot + (angRot2 - avAngRot) * frac;

			var newAngVel1 = Vector3DUtil.add(this._body0.get_currentState().rotVelocity, JNumber3D.getScaleVector(hingeAxis, newAngRot1 - angRot1));
			var newAngVel2 = Vector3DUtil.add(this._body1.get_currentState().rotVelocity, JNumber3D.getScaleVector(hingeAxis, newAngRot2 - angRot2));

			this._body0.setAngVel(newAngVel1);
			this._body1.setAngVel(newAngVel2);
		}

		if (this._extraTorque != 0){
			var torque1 = this._hingeAxis.slice(0);
			JMatrix3D.multiplyVector(this._body0.get_currentState().get_orientation(), torque1);
			torque1 = JNumber3D.getScaleVector(torque1, this._extraTorque);

			this._body0.addWorldTorque(torque1);
			this._body1.addWorldTorque(JNumber3D.getScaleVector(torque1, -1));
		}
	};
	
	jigLib.HingeJoint=HingeJoint;
	
})(jigLib);
(function(jigLib){
	
	/**
	 * @author Jim Sangwine
	 * 
	 * @name JEffect
	 * @class JEffect the base class for effects
	 * @property {boolean} _effectEnabled changing this boolean registers and de-registers the effect with the physics system
	 * @constructor
	 **/
	var JEffect=function(){
		this._effectEnabled = true;
	};
	
	JEffect.prototype._effectEnabled=false;
	
	JEffect.prototype.__defineGetter__('enabled', 
										function() { return this._effectEnabled; });
	JEffect.prototype.__defineSetter__('enabled', 
										function(bool) {
											  				if (bool == this._effectEnabled) return;
											  				this._effectEnabled = bool;
											  				if (bool) jigLib.PhysicsSystem.getInstance().addEffect(this);
											  				else jigLib.PhysicsSystem.getInstance().removeEffect(this);
														});
	
	/**
	 * @function Apply this should be implemented by the effect to apply force to bodies in the physics system as appropriate.
	 * @see PhysicsSystem.handleAllEffects
	 * 
	 * @type void
	 */
	JEffect.prototype.Apply=function(){
		return;
	};
	
	jigLib.JEffect=JEffect;
})(jigLib);(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	
	/**
	 * @author Jim Sangwine
	 * 
	 * @name Wind
	 * @class Wind a wind effect
	 * This effect has global influence - All objects that are movable in the scene will be affected, apart from those added to the exclusions array. 
	 * This effect will be applied continuously as long as it is enabled
	 * 
	 * @extends JEffect
	 * @requires Vector3DUtil
	 * @property {array} direction a 3D vector defining the force of the effect in each axis
	 * @property {array} exclusions optional - a list of bodies to be excluded from the effect
	 * @constructor
	 * @param {array} _direction a 3D vector defining the force of the effect in each axis
	 * @param {array} _exclusions optional - a list of bodies to be excluded from the effect
	 **/
	var Wind=function(_direction, _exclusions) {
		this.Super();
		this.direction=_direction;
		if (_exclusions) this.exclusions=_exclusions;
	};
	jigLib.extend(Wind,jigLib.JEffect);

	Wind.prototype.direction = null;
	Wind.prototype.exclusions = [];
	
	/**
	 * @function isExcluded checks if a given body is in the exclusions list
	 * @param {RigidBody} body the body to check for
	 * @type boolean
	 */
	Wind.prototype.isExcluded = function(body) {
		var i=this.exclusions.length;
		while (i--) { if (this.exclusions[i] == body) return true; }
		return false;
	};
	
	/**
	 * @function Apply applies the effect to the relevant bodies
	 * @see JEffect.Apply
	 * @type void
	 **/
	Wind.prototype.Apply = function() {
		var system=jigLib.PhysicsSystem.getInstance();
		var bodies=system.get_bodies();
		var i=bodies.length;
		var curBody;
		
		this._affectedBodies=[];
		while(i--) {
			curBody=bodies[i];
			if (!curBody.get_movable() || this.isExcluded(curBody)) continue;
			system.activateObject(curBody);
			curBody.applyWorldImpulse(this.direction, curBody.get_position());
		}
	};
	
	jigLib.Wind=Wind;
})(jigLib);(function(jigLib){
	
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var RigidBody=jigLib.RigidBody;
	var EdgeData=jigLib.EdgeData;
	var SpanData=jigLib.SpanData;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JBox
	 * @class JBox a box rigid body
	 * @extends RigidBody
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @requires EdgeData
	 * @requires SpanData
	 * @property {array} _sideLengths the side lengths of this JBox expressed as a 3D vector
	 * @property {array} _points a collection of 3D vectors representing the points (vertices) of this JBox
	 * @property {array} _edges a collection of EdgeData objects representing the edges of this JBox
	 * @property {array} _faces a collection of 3D vectors representing the faces of this JBox
	 * @constructor
	 * @param {ISkin3D} skin
	 * @param {number} width
	 * @param {number} depth
	 * @param {number} height
	 **/
	var JBox=function(skin, width, depth, height){
		//	calling "this.Super" causes recursion in inheritance chains longer than 1
		//this.Super(skin);
		jigLib.RigidBody.call(this);
		
		this._edges=[new EdgeData( 0, 1 ), new EdgeData( 3, 1 ), new EdgeData( 2, 3 ),
					new EdgeData( 2, 0 ), new EdgeData( 4, 5 ), new EdgeData( 5, 7 ),
					new EdgeData( 6, 7 ), new EdgeData( 4, 6 ), new EdgeData( 7, 1 ),
					new EdgeData( 5, 3 ), new EdgeData( 4, 2 ), new EdgeData( 6, 0 )];
		
		this._faces=[[6, 7, 1, 0], [5, 4, 2, 3],
					[3, 1, 7, 5], [4, 6, 0, 2],
					[1, 3, 2, 0], [7, 6, 4, 5]];

		this._type = "BOX";
		this._skin = skin;

		this._sideLengths = Vector3DUtil.create(width, height, depth, 0);
		this._boundingSphere = 0.5 * Vector3DUtil.get_length(this._sideLengths);
		this.initPoints();
		this.set_mass(1);
		this.updateBoundingBox();
	};
	jigLib.extend(JBox,jigLib.RigidBody);
	
	JBox.prototype._sideLengths=null;
	JBox.prototype._points=null;
	JBox.prototype._edges=null; 
	JBox.prototype._faces=null; 
	
	/**
	 * @function initPoints determines the point (vertex) locations for this JBox
	 * @type void
	 **/
	JBox.prototype.initPoints=function(){
		var halfSide = this.getHalfSideLengths();
		this._points = [];
		this._points[0] = Vector3DUtil.create(halfSide[0], -halfSide[1], halfSide[2], 0);
		this._points[1] = Vector3DUtil.create(halfSide[0], halfSide[1], halfSide[2], 0);
		this._points[2] = Vector3DUtil.create(-halfSide[0], -halfSide[1], halfSide[2], 0);
		this._points[3] = Vector3DUtil.create(-halfSide[0], halfSide[1], halfSide[2], 0);
		this._points[4] = Vector3DUtil.create(-halfSide[0], -halfSide[1], -halfSide[2], 0);
		this._points[5] = Vector3DUtil.create(-halfSide[0], halfSide[1], -halfSide[2], 0);
		this._points[6] = Vector3DUtil.create(halfSide[0], -halfSide[1], -halfSide[2], 0);
		this._points[7] = Vector3DUtil.create(halfSide[0], halfSide[1], -halfSide[2], 0);
	};

	/**
	 * @function set_sideLengths sets the side lengths for this JBox
	 * @param {array} size 3D vector specifying the side lengths i.e. [width, height, depth, 0]
	 * @type void
	 **/
	JBox.prototype.set_sideLengths=function(size){
		this._sideLengths = size.slice(0);
		this._boundingSphere = 0.5 * Vector3DUtil.get_length(this._sideLengths);
		this.initPoints();
		this.setInertia(this.getInertiaProperties(this.get_mass()));
		this.setActive();
		this.updateBoundingBox();
	};

	/**
	 * @function get_sideLengths returns the side lengths for this JBox as a 3D vector
	 * @type array
	 **/
	JBox.prototype.get_sideLengths=function(){
		return this._sideLengths;
	};

	/**
	 * @function get_edges returns an array of EdgeData objects representing the edges of this JBox
	 * @type array
	 **/
	JBox.prototype.get_edges=function(){
		return this._edges;
	};

	/**
	 * @function getVolume returns the volume of this JBox
	 * @type number
	 **/
	JBox.prototype.getVolume=function(){
		return (this._sideLengths[0] * this._sideLengths[1] * this._sideLengths[2]);
	};

	/**
	 * @function getSurfaceArea returns the surface area of this JBox
	 * @type number
	 **/
	JBox.prototype.getSurfaceArea=function(){
		return 2 * (this._sideLengths[0] * this._sideLengths[1] + this._sideLengths[0] * this._sideLengths[2] + this._sideLengths[1] * this._sideLengths[2]);
	};

	/**
	 * @function getHalfSideLengths returns the half-side lengths of this JBox expressed as a 3D vector
	 * @type array
	 **/
	JBox.prototype.getHalfSideLengths=function(){
		return JNumber3D.getScaleVector(this._sideLengths, 0.5);
	};

	/**
	 * @function getSpan returns the minimum and maximum extents of the box along the axis, relative to the center of the box.
	 * @param {array} axis the axis expressed as a 3D vector
	 * @type SpanData
	 **/
	JBox.prototype.getSpan=function(axis){
		var cols= this.get_currentState().getOrientationCols();
		var obj = new SpanData();
		var s = Math.abs(Vector3DUtil.dotProduct(axis, cols[0])) * (0.5 * this._sideLengths[0]);
		var u = Math.abs(Vector3DUtil.dotProduct(axis, cols[1])) * (0.5 * this._sideLengths[1]);
		var d = Math.abs(Vector3DUtil.dotProduct(axis, cols[2])) * (0.5 * this._sideLengths[2]);
		var r = s + u + d;
		var p = Vector3DUtil.dotProduct(this.get_currentState().position, axis);
		obj.min = p - r;
		obj.max = p + r;

		return obj;
	};

	/**
	 * @function getCornerPoints returns the corner points of this JBox
	 * @param {PhysicsState} state
	 * @type array
	 **/
	JBox.prototype.getCornerPoints=function(state){
		var vertex;
		var arr = [];
						
		var transform = JMatrix3D.getTranslationMatrix(state.position[0], state.position[1], state.position[2]);
		transform = JMatrix3D.getAppendMatrix3D(state.get_orientation(), transform);
						
		for(var i=0, pl=this._points.length; i<pl; i++){
			var _point=this._points[i];
			vertex=Vector3DUtil.create(_point[0], _point[1], _point[2], 0);
			JMatrix3D.multiplyVector(transform, vertex);
			arr.push(vertex);
			//arr.push(transform.transformVector(new Vector3D(_point[0], _point[1], _point[2])));
		}
		//arr.fixed = true;
		return arr;
	};
				
	/**
	 * @function getCornerPointsInBoxSpace returns the corner points of this JBox in another box space
	 * @param {PhysicsState} thisState
	 * @param {PhysicsState} boxState
	 * @type array
	 **/
	JBox.prototype.getCornerPointsInBoxSpace=function(thisState, boxState){
		var max = JMatrix3D.getTransposeMatrix(boxState.get_orientation());
		var pos = Vector3DUtil.subtract(thisState.position,boxState.position);
		JMatrix3D.multiplyVector(max, pos);
						
		var orient = JMatrix3D.getAppendMatrix3D(thisState.get_orientation(), max);
						
		var arr = [];
						
		var transform = JMatrix3D.getTranslationMatrix(pos[0], pos[1], pos[2]);
		transform = JMatrix3D.getAppendMatrix3D(orient, transform);
		
		for(var i=0;i<this._points.length;i++){
			_point=this._points[i].slice(0);
			JMatrix3D.multiplyVector(transform,_point);
			arr[i] = _point;
		}
		return arr;
	};
				
	/**
	 * @function getSqDistanceToPoint
	 * @param {PhysicsState} state
	 * @param {array} closestBoxPoint
	 * @param {array} point
	 * @type number
	 **/
	JBox.prototype.getSqDistanceToPoint=function(state, closestBoxPoint, point){
		closestBoxPoint.pos = Vector3DUtil.subtract(point, state.position);
		JMatrix3D.multiplyVector(JMatrix3D.getTransposeMatrix(state.get_orientation()), closestBoxPoint.pos);

		var delta = 0;
		var sqDistance = 0;
		var halfSideLengths = this.getHalfSideLengths();

		if (closestBoxPoint.pos[0] < -halfSideLengths[0]){
			delta = closestBoxPoint.pos[0] + halfSideLengths[0];
			sqDistance += (delta * delta);
			closestBoxPoint.pos[0] = -halfSideLengths[0];
		}else if (closestBoxPoint.pos[0] > halfSideLengths[0]){
			delta = closestBoxPoint.pos[0] - halfSideLengths[0];
			sqDistance += (delta * delta);
			closestBoxPoint.pos[0] = halfSideLengths[0];
		}

		if (closestBoxPoint.pos[1] < -halfSideLengths[1]){
			delta = closestBoxPoint.pos[1] + halfSideLengths[1];
			sqDistance += (delta * delta);
			closestBoxPoint.pos[1] = -halfSideLengths[1];
		}else if (closestBoxPoint.pos[1] > halfSideLengths[1]){
			delta = closestBoxPoint.pos[1] - halfSideLengths[1];
			sqDistance += (delta * delta);
			closestBoxPoint.pos[1] = halfSideLengths[1];
		}

		if (closestBoxPoint.pos[2] < -halfSideLengths[2]){
			delta = closestBoxPoint.pos[2] + halfSideLengths[2];
			sqDistance += (delta * delta);
			closestBoxPoint.pos[2] = -halfSideLengths[2];
		}else if (closestBoxPoint.pos[2] > halfSideLengths[2]){
			delta = (closestBoxPoint.pos[2] - halfSideLengths[2]);
			sqDistance += (delta * delta);
			closestBoxPoint.pos[2] = halfSideLengths[2];
		}
		JMatrix3D.multiplyVector(state.get_orientation(), closestBoxPoint.pos);
		closestBoxPoint.pos = Vector3DUtil.add(state.position, closestBoxPoint.pos);
		return sqDistance;
	};

	/**
	 * @function getDistanceToPoint returns the distance from the point to the box, (negative if the point is inside the box), and optionally the closest point on the box
	 * @param {PhysicsState} state
	 * @param {array} closestBoxPoint
	 * @param {array} point
	 * @type number
	 **/
	JBox.prototype.getDistanceToPoint=function(state, closestBoxPoint, point){
		return Math.sqrt(this.getSqDistanceToPoint(state, closestBoxPoint, point));
	};

	/**
	 * @function pointIntersect 
	 * @param {array} pos
	 * @type boolean
	 **/
	JBox.prototype.pointIntersect=function(pos){
		var p = Vector3DUtil.subtract(pos, this.get_currentState().position);
		var h = JNumber3D.getScaleVector(this._sideLengths, 0.5);
		var dirVec;
		var cols = this.get_currentState().getOrientationCols();
		for (var dir; dir < 3; dir++){
			dirVec = cols[dir].slice(0);
			Vector3DUtil.normalize(dirVec);
			if (Math.abs(Vector3DUtil.dotProduct(dirVec, p)) > h[dir] + JNumber3D.NUM_TINY){
				return false;
			}
		}
		return true;
	};

	/**
	 * @function getSupportVertices 
	 * @param {array} axis
	 * @type array
	 **/
	JBox.prototype.getSupportVertices=function(axis){
		var vertices = [];
		var d = [1,1,1];
		var H;
		var temp = this.get_currentState().getOrientationCols();
		Vector3DUtil.normalize(temp[0]);
		Vector3DUtil.normalize(temp[1]);
		Vector3DUtil.normalize(temp[2]);
		for (var i = 0; i < 3; i++){
			d[i] = Vector3DUtil.dotProduct(axis, temp[i]);
			if (Math.abs(d[i]) > 1 - 0.001){
				var f = (d[i] < 0) ? (i * 2) : (i * 2) + 1;
				for (var j = 0; j < 4; j++){
					H = this._points[this._faces[f][j]];
					var _vj = vertices[j] = this.get_currentState().position.slice(0);
					_vj = Vector3DUtil.add(_vj, JNumber3D.getScaleVector(temp[0], H[0]));
					_vj = Vector3DUtil.add(_vj, JNumber3D.getScaleVector(temp[1], H[1]));
					_vj = Vector3DUtil.add(_vj, JNumber3D.getScaleVector(temp[2], H[2]));
				}
				return vertices;
			}
		}

		for (i = 0; i < 3; i++){
			if (Math.abs(d[i]) < 0.005){
				var k;
				var m = (i + 1) % 3;
				var n = (i + 2) % 3;

				H = this.get_currentState().position.slice(0);
				k = (d[m] > 0) ? -1 : 1;
				H = Vector3DUtil.add(H, JNumber3D.getScaleVector(temp[m], k * this._sideLengths[m] / 2));
				k = (d[n] > 0) ? -1 : 1;
				H = Vector3DUtil.add(H, JNumber3D.getScaleVector(temp[n], k * this._sideLengths[n] / 2));

				vertices[0] = Vector3DUtil.add(H, JNumber3D.getScaleVector(temp[i], this._sideLengths[i] / 2));
				vertices[1] = Vector3DUtil.add(H, JNumber3D.getScaleVector(temp[i], -this._sideLengths[i] / 2));
				return vertices;
			}
		}

		var _v0 =vertices[0] = this.get_currentState().position.slice(0);
		k = (d[0] > 0) ? -1 : 1;
		vertices[0] = Vector3DUtil.add(_v0, JNumber3D.getScaleVector(temp[0], k * this._sideLengths[0] / 2));
		k = (d[1] > 0) ? -1 : 1;
		vertices[0] = Vector3DUtil.add(_v0, JNumber3D.getScaleVector(temp[1], k * this._sideLengths[1] / 2));
		k = (d[2] > 0) ? -1 : 1;
		vertices[0] = Vector3DUtil.add(_v0, JNumber3D.getScaleVector(temp[2], k * this._sideLengths[2] / 2));
		return vertices;
	};
	

	/**
	 * @function segmentIntersect 
	 * @param {object} out
	 * @param {JSegment} seg
	 * @param {PhysicsState} state
	 * @type boolean
	 **/
	JBox.prototype.segmentIntersect=function(out, seg, state){
		out.frac = 0;
		out.position = [0,0,0,0];
		out.normal = [0,0,0,0];

		var frac = JNumber3D.NUM_HUGE;
		var min = -JNumber3D.NUM_HUGE;
		var max = JNumber3D.NUM_HUGE;
		var dirMin = 0;
		var dirMax = 0;
		var dir = 0;
		var p = Vector3DUtil.subtract(state.position, seg.origin);
		var h = JNumber3D.getScaleVector(this._sideLengths, 0.5);

		//var tempV:Vector3D;
		var e;
		var f;
		var t;
		var t1;
		var t2;
						
		var orientationCol = state.getOrientationCols();
		var directionVectorArray = h.slice(0);
		var directionVectorNumber;
		for (dir = 0; dir < 3; dir++){
			directionVectorNumber = directionVectorArray[dir];
			e = Vector3DUtil.dotProduct(orientationCol[dir], p);
			f = Vector3DUtil.dotProduct(orientationCol[dir], seg.delta);
			if (Math.abs(f) > JNumber3D.NUM_TINY){
				t1 = (e + directionVectorNumber) / f;
				t2 = (e - directionVectorNumber) / f;
				if (t1 > t2){
					t = t1;
					t1 = t2;
					t2 = t;
				}
				if (t1 > min){
					min = t1;
					dirMin = dir;
				}
				if (t2 < max){
					max = t2;
					dirMax = dir;
				}
				if (min > max) return false;
				if (max < 0) return false;
			}else if (-e - directionVectorNumber > 0 || -e + directionVectorNumber < 0){
				return false;
			}
		}

		if (min > 0){
			dir = dirMin;
			frac = min;
		}else{
			dir = dirMax;
			frac = max;
		}
		if (frac < 0) frac = 0;
		/*if (frac > 1)
		frac = 1;*/
		if (frac > 1 - JNumber3D.NUM_TINY){
			return false;
		}
		out.frac = frac;
		out.position = seg.getPoint(frac);

		if (Vector3DUtil.dotProduct(orientationCol[dir], seg.delta) < 0)
			out.normal = JNumber3D.getScaleVector(orientationCol[dir], -1);
		else
			out.normal = orientationCol[dir];

		return true;
	};

	/**
	 * @function getInertiaProperties 
	 * @param {number} m
	 * @type JMatrix3D
	 **/
	JBox.prototype.getInertiaProperties=function(m){
		return JMatrix3D.getScaleMatrix(
			(m/12) * (this._sideLengths[1] * this._sideLengths[1] + this._sideLengths[2] * this._sideLengths[2]),
			(m/12) * (this._sideLengths[0] * this._sideLengths[0] + this._sideLengths[2] * this._sideLengths[2]),
			(m/12) * (this._sideLengths[0] * this._sideLengths[0] + this._sideLengths[1] * this._sideLengths[1]));
	};
				
	/**
	 * @function updateBoundingBox updates the bounding box for this JBox 
	 * @type void
	 **/
	JBox.prototype.updateBoundingBox=function(){
		this._boundingBox.clear();
		this._boundingBox.addBox(this);
	};
	
	jigLib.JBox=JBox;
	
})(jigLib);	
/*
Copyright (c) 2007 Danny Chapman 
http://www.rowlhouse.co.uk

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.
Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:
1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.
3. This notice may not be removed or altered from any source
distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var RigidBody=jigLib.RigidBody;
	var JSegment=jigLib.JSegment;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JCapsule
	 * @class JCapsule
	 * @extends RigidBody
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @requires JSegment
	 * @property {number} _length the length of this JCapsule
	 * @property {number} _radius the radius of this JCapsule
	 * @constructor
	 * @param {ISkin3D} skin
	 * @param {number} r the radius
	 * @param {number} l the length
	 **/
	var JCapsule=function(skin, r, l) {
		this.Super(skin);
		this._type = "CAPSULE";
		this._radius = r;
		this._length = l;
		this._boundingSphere = this.getBoundingSphere(r, l);
		this.set_mass(1);
		this.updateBoundingBox();
	};
	jigLib.extend(JCapsule,jigLib.RigidBody);
	
	JCapsule.prototype._length=null;
	JCapsule.prototype._radius=null;
	
	/**
	 * @function set_radius sets the radius
	 * @param {number} r the new radius
	 * @type void
	 **/
	JCapsule.prototype.set_radius=function(r){
		this._radius = r;
		this._boundingSphere = getBoundingSphere(this._radius, this._length);
		this.setInertia(this.getInertiaProperties(this.get_mass()));
		this.updateBoundingBox();
		this.setActive();
	};
	
	/**
	 * @function get_radius gets the radius
	 * @type number
	 **/
	JCapsule.prototype.get_radius=function(){
		return this._radius;
	};
				 
	/**
	 * @function set_length sets the length
	 * @param {number} l the new length
	 * @type void
	 **/
	JCapsule.prototype.set_length=function(l){
		this._length = l;
		this._boundingSphere = getBoundingSphere(this._radius, this._length);
		this.setInertia(this.getInertiaProperties(this.get_mass()));
		this.updateBoundingBox();
		this.setActive();
	};
	
	/**
	 * @function get_length gets the length
	 * @type number
	 **/
	JCapsule.prototype.get_length=function(){
		return this._length;
	};
	
	/**
	 * @function getBottomPos gets the bottom position expressed as a 3D vector
	 * @param {PhysicsState} state
	 * @type array
	 **/
	JCapsule.prototype.getBottomPos=function(state){
		var temp = state.getOrientationCols()[1];
		//Vector3DUtil.normalize(temp);
		return Vector3DUtil.add(state.position, JNumber3D.getScaleVector(temp, -this._length / 2 - this._radius));
	};
				 
	/**
	 * @function getEndPos gets the end position expressed as a 3D vector
	 * @param {PhysicsState} state
	 * @type array
	 **/
	JCapsule.prototype.getEndPos=function(state){
		var temp = state.getOrientationCols()[1];
		//Vector3DUtil.normalize(temp);
		return Vector3DUtil.add(state.position, JNumber3D.getScaleVector(temp, this._length / 2 + this._radius));
	};
				 
	/**
	 * @function segmentIntersect tests a segment for intersection
	 * @param {object} out
	 * @param {JSegment} seg
	 * @param {PhysicsState} state
	 * @type boolean
	 **/
	JCapsule.prototype.segmentIntersect=function(out, seg, state){
		out.frac = 0;
		out.position = [0,0,0,0];
		out.normal = [0,0,0,0];
						
		var Ks = seg.delta;
		var kss = Vector3DUtil.dotProduct(Ks, Ks);
		var radiusSq = this._radius * this._radius;
						
		var cols = state.getOrientationCols();
		var cylinderAxis = new JSegment(getBottomPos(state), cols[1]);
		var Ke = cylinderAxis.delta;
		var Kg = Vector3DUtil.subtract(cylinderAxis.origin, seg.origin);
		var kee = Vector3DUtil.dotProduct(Ke, Ke);
		if (Math.abs(kee) < JNumber3D.NUM_TINY) {
			return false;
		}
						
		var kes = Vector3DUtil.dotProduct(Ke, Ks);
		var kgs = Vector3DUtil.dotProduct(Kg, Ks);
		var keg = Vector3DUtil.dotProduct(Ke, Kg);
		var kgg = Vector3DUtil.dotProduct(Kg, Kg);
						
		var distSq = Vector3DUtil.get_lengthSquared(Vector3DUtil.subtract(Kg, JNumber3D.getDivideVector(JNumber3D.getScaleVector(Ke, keg), kee)));
		if (distSq < radiusSq) {
			out.fracOut = 0;
			out.posOut = seg.origin.slice(0);
			out.normalOut = Vector3DUtil.subtract(out.posOut, getBottomPos(state));
			out.normalOut = Vector3DUtil.subtract(out.normalOut, JNumber3D.getScaleVector(cols[1], Vector3DUtil.dotProduct(out.normalOut, cols[1])));
			Vector3DUtil.normalize(out.normalOut);
			return true;
		}
						
		var ar = kee * kss - (kes * kes);
		if (Math.abs(a) < JNumber3D.NUM_TINY) {
			return false;
		}
		var b = 2 * (keg * kes - kee * kgs);
		var c = kee * (kgg - radiusSq) - (keg * keg);
		var blah = (b * b) - 4 * a * c;
		if (blah < 0) {
			return false;
		}
		var t = ( -b - Math.sqrt(blah)) / (2 * a);
		if (t < 0 || t > 1) {
			return false;
		}
		out.frac = t;
		out.position = seg.getPoint(t);
		out.normal = Vector3DUtil.subtract(out.posOut, getBottomPos(state));
		out.normal = Vector3DUtil.subtract(out.normal, JNumber3D.getScaleVector(cols[1], Vector3DUtil.dotProduct(out.normal, cols[1])));
		Vector3DUtil.normalize(out.normal);
		return true;
	};

	/**
	 * @function getInertiaProperties
	 * @param {number} m
	 * @type JMatrix3D
	 **/
	JCapsule.prototype.getInertiaProperties=function(m){
		var cylinderMass = m * Math.PI * this._radius * this._radius * this._length / this.getVolume();
		var Ixx = 0.25 * cylinderMass * this._radius * this._radius + (1 / 12) * cylinderMass * this._length * this._length;
		var Iyy = 0.5 * cylinderMass * this._radius * this._radius;
		var Izz= Ixx;
						 
		var endMass = m - cylinderMass;
		Ixx += (0.4 * endMass * this._radius * this._radius + endMass * Math.pow(0.5 * this._length, 2));
		Iyy += (0.2 * endMass * this._radius * this._radius);
		Izz += (0.4 * endMass * this._radius * this._radius + endMass * Math.pow(0.5 * this._length, 2));
						
						 /*
						var inertiaTensor:JMatrix3D = new JMatrix3D();
						inertiaTensor.n11 = Ixx;
						inertiaTensor.n22 = Iyy;
						inertiaTensor.n33 = Izz;
						*/
						
		return JMatrix3D.getScaleMatrix(Ixx, Iyy, Izz);
	};
				
	/**
	 * @function updateBoundingBox updates the bounding box for this JCapsule
	 * @type void
	 **/
	JCapsule.prototype.updateBoundingBox=function(){
		this._boundingBox.clear();
		this._boundingBox.addCapsule(this);
	};
				
	/**
	 * @function getBoundingSphere gets the bounding sphere for any JCapsule based on it's radius and length
	 * @param {number} r the radius
	 * @param {number} l the length
	 * @type number
	 **/
	JCapsule.prototype.getBoundingSphere=function(r, l){
		return Math.sqrt(Math.pow(l / 2, 2) + r * r) + r;
	};
				
	/**
	 * @function getVolume gets the vollume for this JCapsule
	 * @type number
	 **/
	JCapsule.prototype.getVolume=function(){
		return (4 / 3) * Math.PI * this._radius * this._radius * this._radius + this._length * Math.PI * this._radius * this._radius;
	};
	
	jigLib.JCapsule=JCapsule;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var RigidBody=jigLib.RigidBody;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JPlane
	 * @class JPlane
	 * @extends RigidBody
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @property {array} _initNormal the length of this JCapsule
	 * @property {array} _normal the radius of this JCapsule
	 * @property {number} _distance
	 * @constructor
	 * @param {ISkin3D} skin
	 * @param {array} initNormal
	 **/
	var JPlane=function(skin, initNormal){
		this.Super(skin);
		if (initNormal == undefined) {
			this._initNormal = [0, 0, -1, 0];
			this._normal = this._initNormal.slice(0);
		}else{
			this._initNormal = initNormal.slice(0);
			this._normal = this._initNormal.slice(0);
		}
						
		this._distance = 0;
		this._type = "PLANE";
		this._movable=false;
	};
	jigLib.extend(JPlane,jigLib.RigidBody);
	
	JPlane.prototype._initNormal=null;
	JPlane.prototype._normal=null;
	JPlane.prototype._distance=null;

	/**
	 * @function get_normal gets the normal
	 * @type array
	 **/
	JPlane.prototype.get_normal=function(){
		return this._normal;
	};

	/**
	 * @function get_normal gets the distance
	 * @type number
	 **/
	JPlane.prototype.get_distance=function(){
		return this._distance;
	};
	
	/**
	 * @function set_normal sets the normal
	 * @param {array} value The plane normal
	 **/
	JPlane.prototype.set_normal=function(value){
		this._normal=value;
	};

	/**
	 * @function set_normal sets the distance
	 * @param {number} value The plane distance
	 **/
	JPlane.prototype.set_distance=function(value){
		this._distance=value;
	};

	/**
	 * @function pointPlaneDistance gets the distance from a given point
	 * @param {array} pt the point expressed as a 3D vector
	 * @type array
	 **/
	JPlane.prototype.pointPlaneDistance=function(pt){
		return Vector3DUtil.dotProduct(this._normal, pt) - this._distance;
	};

	/**
	 * @function segmentIntersect tests for intersection with a JSegment
	 * @param {object} out
	 * @param {JSegment} seg
	 * @param {PhysicsState} state
	 * @type boolean
	 **/
	JPlane.prototype.segmentIntersect=function(out, seg, state){
		out.frac = 0;
		out.position = [0,0,0,0];
		out.normal = [0,0,0,0];

		var frac = 0;

		var t;

		var denom = Vector3DUtil.dotProduct(this._normal, seg.delta);
		if (Math.abs(denom) > JNumber3D.NUM_TINY){
			t = -1 * (Vector3DUtil.dotProduct(this._normal, seg.origin) - this._distance) / denom;

			if (t < 0 || t > 1){
				return false;
			}else{
				frac = t;
				out.frac = frac;
				out.position = seg.getPoint(frac);
				out.normal = this._normal.slice(0);
				Vector3DUtil.normalize(out.normal);
				return true;
			}
		}else{
			return false;
		}
	};

	/**
	 * @function updateState updates the current PhysicsState
	 * @type void
	 **/
	JPlane.prototype.updateState=function(){
		this.Super.prototype.updateState.call(this);
		this._normal = this._initNormal.slice(0);
		JMatrix3D.multiplyVector(this._currState._orientation, this._normal);
		//_normal = _currState.orientation.transformVector(new Vector3D(0, 0, -1));
		this._distance = Vector3DUtil.dotProduct(this._currState.position, this._normal);
	};

	jigLib.JPlane=JPlane;

})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JRay
	 * @class JRay
	 * @extends RigidBody
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @property {array} origin the origin of the ray expressed as a 3D vector
	 * @property {array} dir the direction of the ray expressed as a 3D vector
	 * @constructor
	 * @param {array} _origin the origin of the ray expressed as a 3D vector
	 * @param {array} _dir the direction of the ray expressed as a 3D vector
	 **/
	var JRay=function(_origin, _dir){
		this.origin = _origin;
		this.dir = _dir;
	};
	JRay.prototype.origin=null;
	JRay.prototype.dir=null;
	
	/**
	 * @function getOrigin gets the origin
	 * @param {number} t
	 * @type array
	 **/
	JRay.prototype.getOrigin=function(t){
		return Vector3DUtil.add(this.origin, JNumber3D.getScaleVector(this.dir, t));
	};
	
	jigLib.JRay=JRay;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JRay=jigLib.JRay;
	 
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JSegment
	 * @class JSegment
	 * @extends RigidBody
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JRay
	 * @property {array} origin the origin of the segment expressed as a 3D vector
	 * @property {array} delta the delta of the segment expressed as a 3D vector
	 * @constructor
	 * @param {array} _origin the origin of the segment expressed as a 3D vector
	 * @param {array} _delta the delta of the segment expressed as a 3D vector
	 **/
	var JSegment=function(_origin, _delta){
		this.origin = _origin;
		this.delta = _delta;
	};
	JSegment.prototype.origin=null;
	JSegment.prototype.delta=null;
	
	/**
	 * @function getPoint gets the point of the segment expressed as a 3D vector
	 * @param {number} t
	 * @type array
	 **/
	JSegment.prototype.getPoint=function(t){
		return Vector3DUtil.add(this.origin, JNumber3D.getScaleVector(this.delta, t));
	};

	/**
	 * @function getEnd gets the end of the segment expressed as a 3D vector
	 * @type array
	 **/
	JSegment.prototype.getEnd=function(){
		return Vector3DUtil.add(this.origin, this.delta);
	};

	/**
	 * @function clone returns a copy
	 * @type JSegment
	 **/
	JSegment.prototype.clone=function(){
		return new JSegment(this.origin, this.delta);
	};
	
	/**
	 * @function segmentSegmentDistanceSq
	 * @param {object} out
	 * @param {JSegment} seg
	 * @type number
	 **/
	JSegment.prototype.segmentSegmentDistanceSq=function(out, seg){
		out.t0 = 0;
		out.t1 = 0;

		var kDiff = Vector3DUtil.subtract(this.origin, seg.origin);
		var fA00 = Vector3DUtil.get_lengthSquared(this.delta);
		var fA01 = -Vector3DUtil.dotProduct(this.delta, seg.delta);
		var fA11 = Vector3DUtil.get_lengthSquared(seg.delta);
		var fB0 = Vector3DUtil.dotProduct(kDiff, this.delta);
		var fC = Vector3DUtil.get_lengthSquared(kDiff);
		var fDet = Math.abs(fA00 * fA11 - fA01 * fA01);
		var fB1;
		var fS;
		var fT;
		var fSqrDist;
		var fTmp;

		if (fDet >= JNumber3D.NUM_TINY){
			fB1 = -Vector3DUtil.dotProduct(kDiff, seg.delta);
			fS = fA01 * fB1 - fA11 * fB0;
			fT = fA01 * fB0 - fA00 * fB1;

			if (fS >= 0){
				if (fS <= fDet){
					if (fT >= 0){
						if (fT <= fDet){
							var fInvDet = 1 / fDet;
							fS *= fInvDet;
							fT *= fInvDet;
							fSqrDist = fS * (fA00 * fS + fA01 * fT + 2 * fB0) + fT * (fA01 * fS + fA11 * fT + 2 * fB1) + fC;
						}else{
							fT = 1;
							fTmp = fA01 + fB0;
							if (fTmp >= 0){
								fS = 0;
								fSqrDist = fA11 + 2 * fB1 + fC;
							}else if (-fTmp >= fA00){
								fS = 1;
								fSqrDist = fA00 + fA11 + fC + 2 * (fB1 + fTmp);
							}else{
								fS = -fTmp / fA00;
								fSqrDist = fTmp * fS + fA11 + 2 * fB1 + fC;
							}
						}
					}else{
						fT = 0;
						if (fB0 >= 0){
							fS = 0;
							fSqrDist = fC;
						}else if (-fB0 >= fA00){
							fS = 1;
							fSqrDist = fA00 + 2 * fB0 + fC;
						}else{
							fS = -fB0 / fA00;
							fSqrDist = fB0 * fS + fC;
						}
					}
				}else{
					if (fT >= 0){
						if (fT <= fDet){
							fS = 1;
							fTmp = fA01 + fB1;
							if (fTmp >= 0){
								fT = 0;
								fSqrDist = fA00 + 2 * fB0 + fC;
							}else if (-fTmp >= fA11){
								fT = 1;
								fSqrDist = fA00 + fA11 + fC + 2 * (fB0 + fTmp);
							}else{
								fT = -fTmp / fA11;
								fSqrDist = fTmp * fT + fA00 + 2 * fB0 + fC;
							}
						}else{
							fTmp = fA01 + fB0;
							if (-fTmp <= fA00){
								fT = 1;
								if (fTmp >= 0){
									fS = 0;
									fSqrDist = fA11 + 2 * fB1 + fC;
								}else{
									fS = -fTmp / fA00;
									fSqrDist = fTmp * fS + fA11 + 2 * fB1 + fC;
								}
							}else{
								fS = 1;
								fTmp = fA01 + fB1;
								if (fTmp >= 0){
									fT = 0;
									fSqrDist = fA00 + 2 * fB0 + fC;
								}else if (-fTmp >= fA11){
									fT = 1;
									fSqrDist = fA00 + fA11 + fC + 2 * (fB0 + fTmp);
								}else{
									fT = -fTmp / fA11;
									fSqrDist = fTmp * fT + fA00 + 2 * fB0 + fC;
								}
							}
						}
					}else{
						if (-fB0 < fA00){
							fT = 0;
							if (fB0 >= 0){
								fS = 0;
								fSqrDist = fC;
							}else{
								fS = -fB0 / fA00;
								fSqrDist = fB0 * fS + fC;
							}
						}else{
							fS = 1;
							fTmp = fA01 + fB1;
							if (fTmp >= 0){
								fT = 0;
								fSqrDist = fA00 + 2 * fB0 + fC;
							}else if (-fTmp >= fA11){
								fT = 1;
								fSqrDist = fA00 + fA11 + fC + 2 * (fB0 + fTmp);
							}else{
								fT = -fTmp / fA11;
								fSqrDist = fTmp * fT + fA00 + 2 * fB0 + fC;
							}
						}
					}
				}
			}else{
				if (fT >= 0){
					if (fT <= fDet){
						fS = 0;
						if (fB1 >= 0){
							fT = 0;
							fSqrDist = fC;
						}else if (-fB1 >= fA11){
							fT = 1;
							fSqrDist = fA11 + 2 * fB1 + fC;
						}else{
							fT = -fB1 / fA11;
							fSqrDist = fB1 * fT + fC;
						}
					}else{
						fTmp = fA01 + fB0;
						if (fTmp < 0){
							fT = 1;
							if (-fTmp >= fA00){
								fS = 1;
								fSqrDist = fA00 + fA11 + fC + 2 * (fB1 + fTmp);
							}else{
								fS = -fTmp / fA00;
								fSqrDist = fTmp * fS + fA11 + 2 * fB1 + fC;
							}
						}else{
							fS = 0;
							if (fB1 >= 0){
								fT = 0;
								fSqrDist = fC;
							}else if (-fB1 >= fA11){
								fT = 1;
								fSqrDist = fA11 + 2 * fB1 + fC;
							}else{
								fT = -fB1 / fA11;
								fSqrDist = fB1 * fT + fC;
							}
						}
					}
				}else{
					if (fB0 < 0){
						fT = 0;
						if (-fB0 >= fA00){
							fS = 1;
							fSqrDist = fA00 + 2 * fB0 + fC;
						}else{
							fS = -fB0 / fA00;
							fSqrDist = fB0 * fS + fC;
						}
					}else{
						fS = 0;
						if (fB1 >= 0){
							fT = 0;
							fSqrDist = fC;
						}else if (-fB1 >= fA11){
							fT = 1;
							fSqrDist = fA11 + 2 * fB1 + fC;
						}else{
							fT = -fB1 / fA11;
							fSqrDist = fB1 * fT + fC;
						}
					}
				}
			}
		}else{
			if (fA01 > 0){
				if (fB0 >= 0){
					fS = 0;
					fT = 0;
					fSqrDist = fC;
				}else if (-fB0 <= fA00){
					fS = -fB0 / fA00;
					fT = 0;
					fSqrDist = fB0 * fS + fC;
				}else{
					fB1 = -Vector3DUtil.dotProduct(kDiff, seg.delta);
					fS = 1;
					fTmp = fA00 + fB0;
					if (-fTmp >= fA01){
						fT = 1;
						fSqrDist = fA00 + fA11 + fC + 2 * (fA01 + fB0 + fB1);
					}else{
						fT = -fTmp / fA01;
						fSqrDist = fA00 + 2 * fB0 + fC + fT * (fA11 * fT + 2 * (fA01 + fB1));
					}
				}
			}else{
				if (-fB0 >= fA00){
					fS = 1;
					fT = 0;
					fSqrDist = fA00 + 2 * fB0 + fC;
				}else if (fB0 <= 0) {
					fS = -fB0 / fA00;
					fT = 0;
					fSqrDist = fB0 * fS + fC;
				}else{
					fB1 = -Vector3DUtil.dotProduct(kDiff, seg.delta);
					fS = 0;
					if (fB0 >= -fA01){
						fT = 1;
						fSqrDist = fA11 + 2 * fB1 + fC;
					}else{
						fT = -fB0 / fA01;
						fSqrDist = fC + fT * (2 * fB1 + fA11 * fT);
					}
				}
			}
		}

		out.t0 = fS;
		out.t1 = fT;
		return Math.abs(fSqrDist);
	};

	/**
	 * @function pointSegmentDistanceSq
	 * @param {object} out
	 * @param {array} pt
	 * @type number
	 **/
	JSegment.prototype.pointSegmentDistanceSq=function(out, pt){
		out.t = 0;

		var kDiff = Vector3DUtil.subtract(pt,  this.origin);
		var fT = Vector3DUtil.dotProduct(kDiff, this.delta);

		if (fT <= 0){
			fT = 0;
		}else{
			var fSqrLen = Vector3DUtil.get_lengthSquared(this._delta);
			if (fT >= fSqrLen){
				fT = 1;
				kDiff = Vector3DUtil.subtract(kDiff, this._delta);
			}else{
				fT /= fSqrLen;
				kDiff = Vector3DUtil.subtract(kDiff, JNumber3D.getScaleVector(this._delta, fT));
			}
		}

		out.t = fT;
		return Vector3DUtil.get_lengthSquared(kDiff);
	};

	/**
	 * @function segmentBoxDistanceSq
	 * @param {object} out
	 * @param {JBox} rkBox
	 * @param {PhysicsState} boxState
	 * @type number
	 **/
	JSegment.prototype.segmentBoxDistanceSq=function(out, rkBox, boxState){
		out.pfLParam = 0;
		out.pfLParam0 = 0;
		out.pfLParam1 = 0;
		out.pfLParam2 = 0;

		var obj = {};
		var kRay = new JRay(this.origin, this.delta);
		var fSqrDistance = this.sqrDistanceLine(obj, kRay, rkBox, boxState);
		if (obj.num >= 0){
			if (obj.num <= 1){
				out.pfLParam = obj.num;
				out.pfLParam0 = obj.num0;
				out.pfLParam1 = obj.num1;
				out.pfLParam2 = obj.num2;
				return Math.max(fSqrDistance, 0);
			}else{
				fSqrDistance = this.sqrDistancePoint(out, Vector3DUtil.add(this.origin, this.delta), rkBox, boxState);
				out.pfLParam = 1;
				return Math.max(fSqrDistance, 0);
			}
		}else{
			fSqrDistance = this.sqrDistancePoint(out, this.origin, rkBox, boxState);
			out.pfLParam = 0;
			return Math.max(fSqrDistance, 0);
		}
	};

	/**
	 * @function sqrDistanceLine
	 * @param {object} out
	 * @param {JRay} rkLine
	 * @param {JBox} rkBox
	 * @param {PhysicsState} boxState
	 * @type number
	 **/
	JSegment.prototype.sqrDistanceLine=function(out, rkLine, rkBox, boxState){
		var orientationCols = boxState.getOrientationCols();
		out.num = 0;
		out.num0 = 0;
		out.num1 = 0;
		out.num2 = 0;

		var kDiff = Vector3DUtil.subtract(rkLine.origin, boxState.position);
		var kPnt = Vector3DUtil.create( Vector3DUtil.dotProduct(kDiff, orientationCols[0]),
										Vector3DUtil.dotProduct(kDiff, orientationCols[1]),
										Vector3DUtil.dotProduct(kDiff, orientationCols[2]), 
										0);

		var kDir = Vector3DUtil.create( Vector3DUtil.dotProduct(rkLine.dir, orientationCols[0]),
										Vector3DUtil.dotProduct(rkLine.dir, orientationCols[1]),
										Vector3DUtil.dotProduct(rkLine.dir, orientationCols[2]), 
							            0);
						
		var kPntArr = kPnt.slice(0);
		var kDirArr = kDir.slice(0);
						
		var bReflect = [1,1,1,0];
		for (var i = 0; i < 3; i++){
			if (kDirArr[i] < 0){
				kPntArr[i] = -kPntArr[i];
				kDirArr[i] = -kDirArr[i];
				bReflect[i] = true;
			}else{
				bReflect[i] = false;
			}
		}

		JNumber3D.copyFromArray(kPnt, kPntArr);
		JNumber3D.copyFromArray(kDir, kDirArr);
						
		var obj = {};
		obj.rkPnt = kPnt.slice(0);
		obj.pfLParam = 0;
		obj.rfSqrDistance = 0;

		if (kDir[0] > 0){
			if (kDir[1] > 0){
				if (kDir[2] > 0){
					this.caseNoZeros(obj, kDir, rkBox);
					out.num = obj.pfLParam;
				}else{
					this.case0(obj, 0, 1, 2, kDir, rkBox);
					out.num = obj.pfLParam;
				}
			}else{
				if (kDir[2] > 0){
					this.case0(obj, 0, 2, 1, kDir, rkBox);
					out.num = obj.pfLParam;
				}else{
					this.case00(obj, 0, 1, 2, kDir, rkBox);
					out.num = obj.pfLParam;
				}
			}
		}else{
			if (kDir[1] > 0){
				if (kDir[2] > 0){
					this.case0(obj, 1, 2, 0, kDir, rkBox);
					out.num = obj.pfLParam;
				}else{
					this.case00(obj, 1, 0, 2, kDir, rkBox);
					out.num = obj.pfLParam;
				}
			}else{
				if (kDir[2] > 0){
					this.case00(obj, 2, 0, 1, kDir, rkBox);
					out.num = obj.pfLParam;
				}else{
					this.case000(obj, rkBox);
					out.num = 0;
				}
			}
		}

		kPntArr = obj.rkPnt.slice(0);
		for (i = 0; i < 3; i++){
			if (bReflect[i]) kPntArr[i] = -kPntArr[i];
		}
		JNumber3D.copyFromArray(obj.rkPnt, kPntArr);

		out.num0 = obj.rkPnt[0];
		out.num1 = obj.rkPnt[1];
		out.num2 = obj.rkPnt[2];

		return Math.max(obj.rfSqrDistance, 0);
	};
	
	/**
	 * @function sqrDistancePoint
	 * @param {object} out
	 * @param {array} rkPoint
	 * @param {JBox} rkBox
	 * @param {PhysicsState} boxState
	 * @type number
	 **/
	JSegment.prototype.sqrDistancePoint=function(out, rkPoint, rkBox, boxState){
		var orientationVector = boxState.getOrientationCols();
		var kDiff = Vector3DUtil.subtract(rkPoint, boxState.position);
		var kClosest = Vector3DUtil.create( Vector3DUtil.dotProduct(kDiff, orientationVector[0]),
							                Vector3DUtil.dotProduct(kDiff, orientationVector[1]),
							                Vector3DUtil.dotProduct(kDiff, orientationVector[2]), 
							                0);

		var fSqrDistance = 0;
		var fDelta;
		var boxHalfSide = rkBox.getHalfSideLengths();

		if (kClosest[0] < -boxHalfSide[0]){
			fDelta = kClosest[0] + boxHalfSide[0];
			fSqrDistance += (fDelta * fDelta);
			kClosest[0] = -boxHalfSide[0];
		}else if (kClosest[0] > boxHalfSide[0]){
			fDelta = kClosest[0] - boxHalfSide[0];
			fSqrDistance += (fDelta * fDelta);
			kClosest[0] = boxHalfSide[0];
		}

		if (kClosest[1] < -boxHalfSide[1]){
			fDelta = kClosest[1] + boxHalfSide[1];
			fSqrDistance += (fDelta * fDelta);
			kClosest[1] = -boxHalfSide[1];
		}else if (kClosest[1] > boxHalfSide[1]){
			fDelta = kClosest[1] - boxHalfSide[1];
			fSqrDistance += (fDelta * fDelta);
			kClosest[1] = boxHalfSide[1];
		}

		if (kClosest[2] < -boxHalfSide[2]){
			fDelta = kClosest[2] + boxHalfSide[2];
			fSqrDistance += (fDelta * fDelta);
			kClosest[2] = -boxHalfSide[2];
		}else if (kClosest[2] > boxHalfSide[2]){
			fDelta = kClosest[2] - boxHalfSide[2];
			fSqrDistance += (fDelta * fDelta);
			kClosest[2] = boxHalfSide[2];
		}

		out.pfLParam0 = kClosest[0];
		out.pfLParam1 = kClosest[1];
		out.pfLParam2 = kClosest[2];

		return Math.max(fSqrDistance, 0);
	};

	/**
	 * @function face
	 * @param {object} out
	 * @param {number} i0
	 * @param {number} i1
	 * @param {number} i2
	 * @param {array} rkDir
	 * @param {JBox} rkBox
	 * @param {array} rkPmE
	 * @type void
	 **/
	JSegment.prototype.face=function(out, i0, i1, i2, rkDir, rkBox, rkPmE){
		var kPpE = [0,0,0,0];
		var fLSqr;
		var fInv;
		var fTmp;
		var fParam;
		var fT;
		var fDelta;

		var boxHalfSide = rkBox.getHalfSideLengths();
		var boxHalfArr = boxHalfSide;
		var rkPntArr = out.rkPnt;
		var rkDirArr = rkDir;
		var kPpEArr = kPpE;
		var rkPmEArr = rkPmE;

		kPpEArr[i1] = rkPntArr[i1] + boxHalfArr[i1];
		kPpEArr[i2] = rkPntArr[i2] + boxHalfArr[i2];
		JNumber3D.copyFromArray(rkPmE, kPpEArr);

		if (rkDirArr[i0] * kPpEArr[i1] >= rkDirArr[i1] * rkPmEArr[i0]){
			if (rkDirArr[i0] * kPpEArr[i2] >= rkDirArr[i2] * rkPmEArr[i0]){
				rkPntArr[i0] = boxHalfArr[i0];
				fInv = 1 / rkDirArr[i0];
				rkPntArr[i1] -= (rkDirArr[i1] * rkPmEArr[i0] * fInv);
				rkPntArr[i2] -= (rkDirArr[i2] * rkPmEArr[i0] * fInv);
				out.pfLParam = -rkPmEArr[i0] * fInv;
				JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
			}else{
				fLSqr = rkDirArr[i0] * rkDirArr[i0] + rkDirArr[i2] * rkDirArr[i2];
				fTmp = fLSqr * kPpEArr[i1] - rkDirArr[i1] * (rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i2] * kPpEArr[i2]);
				if (fTmp <= 2 * fLSqr * boxHalfArr[i1]){
					fT = fTmp / fLSqr;
					fLSqr += (rkDirArr[i1] * rkDirArr[i1]);
					fTmp = kPpEArr[i1] - fT;
					fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * fTmp + rkDirArr[i2] * kPpEArr[i2];
					fParam = -fDelta / fLSqr;
					out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + fTmp * fTmp + kPpEArr[i2] * kPpEArr[i2] + fDelta * fParam);

					out.pfLParam = fParam;
					rkPntArr[i0] = boxHalfArr[i0];
					rkPntArr[i1] = fT - boxHalfArr[i1];
					rkPntArr[i2] = -boxHalfArr[i2];
					JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
				}else{
					fLSqr += (rkDirArr[i1] * rkDirArr[i1]);
					fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * rkPmEArr[i1] + rkDirArr[i2] * kPpEArr[i2];
					fParam = -fDelta / fLSqr;
					out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + rkPmEArr[i1] * rkPmEArr[i1] + kPpEArr[i2] * kPpEArr[i2] + fDelta * fParam);

					out.pfLParam = fParam;
					rkPntArr[i0] = boxHalfArr[i0];
					rkPntArr[i1] = boxHalfArr[i1];
					rkPntArr[i2] = -boxHalfArr[i2];
					JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
				}
			}
		}else{
			if (rkDirArr[i0] * kPpEArr[i2] >= rkDirArr[i2] * rkPmEArr[i0])
			{
				fLSqr = rkDirArr[i0] * rkDirArr[i0] + rkDirArr[i1] * rkDirArr[i1];
				fTmp = fLSqr * kPpEArr[i2] - rkDirArr[i2] * (rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * kPpEArr[i1]);
				if (fTmp <= 2 * fLSqr * boxHalfArr[i2]){
					fT = fTmp / fLSqr;
					fLSqr += (rkDirArr[i2] * rkDirArr[i2]);
					fTmp = kPpEArr[i2] - fT;
					fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * kPpEArr[i1] + rkDirArr[i2] * fTmp;
					fParam = -fDelta / fLSqr;
					out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + kPpEArr[i1] * kPpEArr[i1] + fTmp * fTmp + fDelta * fParam);

					out.pfLParam = fParam;
					rkPntArr[i0] = boxHalfArr[i0];
					rkPntArr[i1] = -boxHalfArr[i1];
					rkPntArr[i2] = fT - boxHalfArr[i2];
					JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
				}else{
					fLSqr += (rkDirArr[i2] * rkDirArr[i2]);
					fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * kPpEArr[i1] + rkDirArr[i2] * rkPmEArr[i2];
					fParam = -fDelta / fLSqr;
					out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + kPpEArr[i1] * kPpEArr[i1] + rkPmEArr[i2] * rkPmEArr[i2] + fDelta * fParam);

					out.pfLParam = fParam;
					rkPntArr[i0] = boxHalfArr[i0];
					rkPntArr[i1] = -boxHalfArr[i1];
					rkPntArr[i2] = boxHalfArr[i2];
					JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
				}
			}else{
				fLSqr = rkDirArr[i0] * rkDirArr[i0] + rkDirArr[i2] * rkDirArr[i2];
				fTmp = fLSqr * kPpEArr[i1] - rkDirArr[i1] * (rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i2] * kPpEArr[i2]);
				if (fTmp >= 0){
					if (fTmp <= 2 * fLSqr * boxHalfArr[i1]){
						fT = fTmp / fLSqr;
						fLSqr += (rkDirArr[i1] * rkDirArr[i1]);
						fTmp = kPpEArr[i1] - fT;
						fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * fTmp + rkDirArr[i2] * kPpEArr[i2];
						fParam = -fDelta / fLSqr;
						out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + fTmp * fTmp + kPpEArr[i2] * kPpEArr[i2] + fDelta * fParam);

						out.pfLParam = fParam;
						rkPntArr[i0] = boxHalfArr[i0];
						rkPntArr[i1] = fT - boxHalfArr[i1];
						rkPntArr[i2] = -boxHalfArr[i2];
						JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
					}else{
						fLSqr += (rkDirArr[i1] * rkDirArr[i1]);
						fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * rkPmEArr[i1] + rkDirArr[i2] * kPpEArr[i2];
						fParam = -fDelta / fLSqr;
						out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + rkPmEArr[i1] * rkPmEArr[i1] + kPpEArr[i2] * kPpEArr[i2] + fDelta * fParam);

						out.pfLParam = fParam;
						rkPntArr[i0] = boxHalfArr[i0];
						rkPntArr[i1] = boxHalfArr[i1];
						rkPntArr[i2] = -boxHalfArr[i2];
						JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
					}
					return;
				}

				fLSqr = rkDirArr[i0] * rkDirArr[i0] + rkDirArr[i1] * rkDirArr[i1];
				fTmp = fLSqr * kPpEArr[i2] - rkDirArr[i2] * (rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * kPpEArr[i1]);
				if (fTmp >= 0){
					if (fTmp <= 2 * fLSqr * boxHalfArr[i2]){
						fT = fTmp / fLSqr;
						fLSqr += (rkDirArr[i2] * rkDirArr[i2]);
						fTmp = kPpEArr[i2] - fT;
						fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * kPpEArr[i1] + rkDirArr[i2] * fTmp;
						fParam = -fDelta / fLSqr;
						out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + kPpEArr[i1] * kPpEArr[i1] + fTmp * fTmp + fDelta * fParam);

						out.pfLParam = fParam;
						rkPntArr[i0] = boxHalfArr[i0];
						rkPntArr[i1] = -boxHalfArr[i1];
						rkPntArr[i2] = fT - boxHalfArr[i2];
						JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
					}else{
						fLSqr += (rkDirArr[i2] * rkDirArr[i2]);
						fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * kPpEArr[i1] + rkDirArr[i2] * rkPmEArr[i2];
						fParam = -fDelta / fLSqr;
						out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + kPpEArr[i1] * kPpEArr[i1] + rkPmEArr[i2] * rkPmEArr[i2] + fDelta * fParam);

						out.pfLParam = fParam;
						rkPntArr[i0] = boxHalfArr[i0];
						rkPntArr[i1] = -boxHalfArr[i1];
						rkPntArr[i2] = boxHalfArr[i2];
						JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
					}
					return;
				}

				fLSqr += (rkDirArr[i2] * rkDirArr[i2]);
				fDelta = rkDirArr[i0] * rkPmEArr[i0] + rkDirArr[i1] * kPpEArr[i1] + rkDirArr[i2] * kPpEArr[i2];
				fParam = -fDelta / fLSqr;
				out.rfSqrDistance += (rkPmEArr[i0] * rkPmEArr[i0] + kPpEArr[i1] * kPpEArr[i1] + kPpEArr[i2] * kPpEArr[i2] + fDelta * fParam);

				out.pfLParam = fParam;
				rkPntArr[i0] = boxHalfArr[i0];
				rkPntArr[i1] = -boxHalfArr[i1];
				rkPntArr[i2] = -boxHalfArr[i2];
				JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
			}
		}
	};
	
	/**
	 * @function caseNoZeros
	 * @param {object} out
	 * @param {array} rkDir
	 * @param {JBox} rkBox
	 * @type void
	 **/
	JSegment.prototype.caseNoZeros=function(out, rkDir, rkBox){
		var boxHalfSide = rkBox.getHalfSideLengths();
		var kPmE = Vector3DUtil.create(out.rkPnt[0] - boxHalfSide[0], out.rkPnt[1] - boxHalfSide[1], out.rkPnt[2] - boxHalfSide[2], 0);

		var fProdDxPy = rkDir[0] * kPmE[1];
		var fProdDyPx = rkDir[1] * kPmE[0];
		var fProdDzPx;
		var fProdDxPz;
		var fProdDzPy;
		var fProdDyPz;

		if (fProdDyPx >= fProdDxPy){
			fProdDzPx = rkDir[2] * kPmE[0];
			fProdDxPz = rkDir[0] * kPmE[2];
			if (fProdDzPx >= fProdDxPz)
				this.face(out, 0, 1, 2, rkDir, rkBox, kPmE);
			else
				this.face(out, 2, 0, 1, rkDir, rkBox, kPmE);
		}else{
			fProdDzPy = rkDir[2] * kPmE[1];
			fProdDyPz = rkDir[1] * kPmE[2];
			if (fProdDzPy >= fProdDyPz)
				this.face(out, 1, 2, 0, rkDir, rkBox, kPmE);
			else
				this.face(out, 2, 0, 1, rkDir, rkBox, kPmE);
		}
	};

	/**
	 * @function case0
	 * @param {object} out
	 * @param {number} i0
	 * @param {number} i1
	 * @param {number} i2
	 * @param {array} rkDir
	 * @param {JBox} rkBox
	 * @type void
	 **/
	JSegment.prototype.case0=function(out, i0, i1, i2, rkDir, rkBox){
		var boxHalfSide = rkBox.getHalfSideLengths();
		var boxHalfArr = boxHalfSide.slice(0);
		var rkPntArr = out.rkPnt.slice(0);
		var rkDirArr = rkDir.slice(0);
		var fPmE0 = rkPntArr[i0] - boxHalfArr[i0];
		var fPmE1 = rkPntArr[i1] - boxHalfArr[i1];
		var fProd0 = rkDirArr[i1] * fPmE0;
		var fProd1 = rkDirArr[i0] * fPmE1;
		var fDelta;
		var fInvLSqr;
		var fInv;

		if (fProd0 >= fProd1){
			rkPntArr[i0] = boxHalfArr[i0];

			var fPpE1 = rkPntArr[i1] + boxHalfArr[i1];
			fDelta = fProd0 - rkDirArr[i0] * fPpE1;
			if (fDelta >= 0){
				fInvLSqr = 1 / (rkDirArr[i0] * rkDirArr[i0] + rkDirArr[i1] * rkDirArr[i1]);
				out.rfSqrDistance += (fDelta * fDelta * fInvLSqr);

				rkPntArr[i1] = -boxHalfArr[i1];
				out.pfLParam = -(rkDirArr[i0] * fPmE0 + rkDirArr[i1] * fPpE1) * fInvLSqr;
			}else{
				fInv = 1 / rkDirArr[i0];
				rkPntArr[i1] -= (fProd0 * fInv);
				out.pfLParam = -fPmE0 * fInv;
			}
			JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
		}else{
			rkPntArr[i1] = boxHalfArr[i1];

			var fPpE0 = rkPntArr[i0] + boxHalfArr[i0];
			fDelta = fProd1 - rkDirArr[i1] * fPpE0;
			if (fDelta >= 0){
				fInvLSqr = 1 / (rkDirArr[i0] * rkDirArr[i0] + rkDirArr[i1] * rkDirArr[i1]);
				out.rfSqrDistance += (fDelta * fDelta * fInvLSqr);

				rkPntArr[i0] = -boxHalfArr[i0];
				out.pfLParam = -(rkDirArr[i0] * fPpE0 + rkDirArr[i1] * fPmE1) * fInvLSqr;
			}else{
				fInv = 1 / rkDirArr[i1];
				rkPntArr[i0] -= (fProd1 * fInv);
				out.pfLParam = -fPmE1 * fInv;
			}
			JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
		}

		if (rkPntArr[i2] < -boxHalfArr[i2]){
			fDelta = rkPntArr[i2] + boxHalfArr[i2];
			out.rfSqrDistance += (fDelta * fDelta);
			rkPntArr[i2] = -boxHalfArr[i2];
		}else if (rkPntArr[i2] > boxHalfArr[i2]){
			fDelta = rkPntArr[i2] - boxHalfArr[i2];
			out.rfSqrDistance += (fDelta * fDelta);
			rkPntArr[i2] = boxHalfArr[i2];
		}
		JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
	};

	/**
	 * @function case00
	 * @param {object} out
	 * @param {number} i0
	 * @param {number} i1
	 * @param {number} i2
	 * @param {array} rkDir
	 * @param {JBox} rkBox
	 * @type void
	 **/
	JSegment.prototype.case00=function(out, i0, i1, i2, rkDir, rkBox){
		var fDelta = 0;
		var boxHalfSide = rkBox.getHalfSideLengths();
		var boxHalfArr = boxHalfSide.slice(0);
		var rkPntArr = out.rkPnt.slice(0);
		var rkDirArr = rkDir.slice(0);
		out.pfLParam = (boxHalfArr[i0] - rkPntArr[i0]) / rkDirArr[i0];

		rkPntArr[i0] = boxHalfArr[i0];

		if (rkPntArr[i1] < -boxHalfArr[i1]){
			fDelta = rkPntArr[i1] + boxHalfArr[i1];
			out.rfSqrDistance += (fDelta * fDelta);
			rkPntArr[i1] = -boxHalfArr[i1];
		}else if (rkPntArr[i1] > boxHalfArr[i1]) {
			fDelta = rkPntArr[i1] - boxHalfArr[i1];
			out.rfSqrDistance += (fDelta * fDelta);
			rkPntArr[i1] = boxHalfArr[i1];
		}

		if (rkPntArr[i2] < -boxHalfArr[i2]){
			fDelta = rkPntArr[i2] + boxHalfArr[i2];
			out.rfSqrDistance += (fDelta * fDelta);
			rkPntArr[i2] = -boxHalfArr[i2];
		}else if (rkPntArr[i2] > boxHalfArr[i2]){
			fDelta = rkPntArr[i2] - boxHalfArr[i2];
			out.rfSqrDistance += (fDelta * fDelta);
			rkPntArr[i2] = boxHalfArr[i2];
		}

		JNumber3D.copyFromArray(out.rkPnt, rkPntArr);
	};

	/**
	 * @function case000
	 * @param {object} out
	 * @param {JBox} rkBox
	 * @type void
	 **/
	JSegment.prototype.case000=function(out, rkBox){
		var fDelta = 0;
		var boxHalfSide = rkBox.getHalfSideLengths();

		if (out.rkPnt[0] < -boxHalfSide[0]){
			fDelta = out.rkPnt[0] + boxHalfSide[0];
			out.rfSqrDistance += (fDelta * fDelta);
			out.rkPnt[0] = -boxHalfSide[0];
		}else if (out.rkPnt[0] > boxHalfSide[0]){
			fDelta = out.rkPnt[0] - boxHalfSide[0];
			out.rfSqrDistance += (fDelta * fDelta);
			out.rkPnt[0] = boxHalfSide[0];
		}

		if (out.rkPnt[1] < -boxHalfSide[1]){
			fDelta = out.rkPnt[1] + boxHalfSide[1];
			out.rfSqrDistance += (fDelta * fDelta);
			out.rkPnt[1] = -boxHalfSide[1];
		}else if (out.rkPnt[1] > boxHalfSide[1]){
			fDelta = out.rkPnt[1] - boxHalfSide[1];
			out.rfSqrDistance += (fDelta * fDelta);
			out.rkPnt[1] = boxHalfSide[1];
		}

		if (out.rkPnt[2] < -boxHalfSide[2]){
			fDelta = out.rkPnt[2] + boxHalfSide[2];
			out.rfSqrDistance += (fDelta * fDelta);
			out.rkPnt[2] = -boxHalfSide[2];
		}else if (out.rkPnt[2] > boxHalfSide[2]){
			fDelta = out.rkPnt[2] - boxHalfSide[2];
			out.rfSqrDistance += (fDelta * fDelta);
			out.rkPnt[2] = boxHalfSide[2];
		}
	};
	
	jigLib.JSegment=JSegment;
	
 })(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var RigidBody=jigLib.RigidBody;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JSphere
	 * @class JSphere
	 * @extends RigidBody
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @property {string} name
	 * @property {number} radius the radius of this JSphere
	 * @constructor
	 * @param {ISkin3D} skin
	 * @param {number} r the radius of the new JSphere
	 **/
	var JSphere=function(skin, r){
		this.Super(skin);
		this._type = "SPHERE";
		this._radius = r;
		this._boundingSphere = this._radius;
		this.set_mass(1);
		this.updateBoundingBox();
	};
	jigLib.extend(JSphere,jigLib.RigidBody);
	
	JSphere.prototype.name=null;
	JSphere.prototype._radius=null;

	/**
	 * @function set_radius gets the radius
	 * @param {number} r the new radius
	 * @type void
	 **/
	JSphere.prototype.set_radius=function(r){
		this._radius = r;
		this._boundingSphere = this._radius;
		this.setInertia(this.getInertiaProperties(this.get_mass()));
		this.setActive();
		this.updateBoundingBox();
	};

	/**
	 * @function get_radius returns the radius
	 * @type void
	 **/
	JSphere.prototype.get_radius=function(){
		return this._radius;
	};

	/**
	 * @function segmentIntersect
	 * @param {object} out 
	 * @param {JSegment} seg
	 * @param {PhysicsState} state
	 * @type boolean
	 **/
	JSphere.prototype.segmentIntersect=function(out, seg, state){
		out.frac = 0;
		out.position = [0,0,0,0];
		out.normal = [0,0,0,0];

		var frac = 0;
		var r = seg.delta;
		var s = Vector3DUtil.subtract(seg.origin, state.position);

		var radiusSq = this._radius * this._radius;
		var rSq = Vector3DUtil.get_lengthSquared(r);
		if (rSq < radiusSq){
			out.fracOut = 0;
			out.posOut = seg.origin.slice(0);
			out.normalOut = Vector3DUtil.subtract(out.posOut, state.position);
			Vector3DUtil.normalize(out.normalOut);
			return true;
		}

		var sDotr = Vector3DUtil.dotProduct(s, r);
		var sSq = Vector3DUtil.get_lengthSquared(s);
		var sigma = sDotr * sDotr - rSq * (sSq - radiusSq);
		if (sigma < 0){
			return false;
		}
		var sigmaSqrt = Math.sqrt(sigma);
		var lambda1 = (-sDotr - sigmaSqrt) / rSq;
		var lambda2 = (-sDotr + sigmaSqrt) / rSq;
		if (lambda1 > 1 || lambda2 < 0){
			return false;
		}
		frac = Math.max(lambda1, 0);
		out.frac = frac;
		out.position = seg.getPoint(frac);
		out.normal = Vector3DUtil.subtract(out.position, state.position);
		Vector3DUtil.normalize(out.normal);
		return true;
	};

	/**
	 * @function getInertiaProperties
	 * @param {number} m
	 * @type JMatrix3D
	 **/
	JSphere.prototype.getInertiaProperties=function(m){
		var Ixx = 0.4 * m * this._radius * this._radius;
		return JMatrix3D.getScaleMatrix(Ixx, Ixx, Ixx);
	};
				
	/**
	 * @function updateBoundingBox updates the bounding box
	 * @type void
	 **/
	JSphere.prototype.updateBoundingBox=function(){
		this._boundingBox.clear();
		this._boundingBox.addSphere(this);
	};
	
	jigLib.JSphere=JSphere;
	
})(jigLib);(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var RigidBody=jigLib.RigidBody;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JTerrain
	 * @class JTerrain
	 * @extends RigidBody
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @property {object} _terrain the terrain mesh
	 * @constructor
	 * @param {object} tr the terrain mesh
	 * TODO: in JigLibFlash the terrain mesh is of type ITerrain - this needs re-implementing somehow?!?
	 **/
	var JTerrain=function(tr){
		this.Super(null);
		this._terrain = tr;
		this.set_movable(false);
		this._type = "TERRAIN";
	};
	jigLib.extend(JTerrain,jigLib.RigidBody);
	
	JTerrain.prototype._terrain=null;
	
	/**
	 * @function get_terrainMesh gets the mesh
	 * @type object
	 **/
	JTerrain.prototype.get_terrainMesh=function(){
		return this._terrain;
	};
				
	/**
	 * @function getHeightByIndex
	 * @type number
	 **/
	JTerrain.prototype.getHeightByIndex=function(i, j){
		i = this.limiteInt(i, 0, _terrain.get_sw());
		j = this.limiteInt(j, 0, _terrain.get_sh());
		return _terrain.get_heights(i,j);
	};
	
	/**
	 * @function getHeightAndNormalByPoint
	 * @param {array} point
	 * @type object
	 **/
	JTerrain.prototype.getHeightAndNormalByPoint=function(point){
		var w = this.limiteInt(point[0], this._terrain.get_minW(), this._terrain.get_maxW());
		var h = this.limiteInt(point[2], this._terrain.get_minH(), this._terrain.get_maxH());
						
		var i0 = ((w - this._terrain.get_minW()) / this._terrain.get_dw())|0;
		var j0 = ((h - this._terrain.get_minH()) / this._terrain.get_dh())|0;
		i0 = this.limiteInt(i0, 0, this._terrain.get_sw());
		j0 = this.limiteInt(j0, 0, this._terrain.get_sh());
		
		var i1 = i0 + 1;
		var j1 = j0 + 1;
		i1 = this.limiteInt(i1, 0, this._terrain.get_sw());
		j1 = this.limiteInt(j1, 0, this._terrain.get_sh());
						
		var iFrac = 1 - (w - (i0 * this._terrain.get_dw() + this._terrain.get_minW())) / this._terrain.get_dw();
		var jFrac = (h - (j0 * this._terrain.get_dh() + this._terrain.get_minH())) / this._terrain.get_dh();
		iFrac = JNumber3D.getLimiteNumber(iFrac, 0, 1);
		jFrac = JNumber3D.getLimiteNumber(jFrac, 0, 1);
						
		var h00 = this._terrain.get_heights(i0,j0);
		var h01 = this._terrain.get_heights(i0,j1);
		var h10 = this._terrain.get_heights(i1,j0);
		var h11 = this._terrain.get_heights(i1,j1);
						
		var obj = { };
		obj.height = 0;
		obj.normal = [0,0,0,0];
		var plane;
		if (iFrac < jFrac || i0==i1 || j0 == j1){
			obj.normal = Vector3DUtil.crossProduct( [0, h11 - h10, this._terrain.get_dh(), 0],
													[this._terrain.get_dw(), h11 - h01, 0, 0]);
			Vector3DUtil.normalize(obj.normal);
								
			plane = new PlaneData([(i1 * this._terrain.get_dw() + this._terrain.get_minW()), h11, (j1 * this._terrain.get_dh() + this._terrain.get_minH()), 0], 
								  obj.normal);
			obj.height = plane.pointPlaneDistance(point);
		}else{
			obj.normal = Vector3DUtil.crossProduct( [0, h01 - h00, this._terrain.get_dh(), 0], 
													[this._terrain.get_dw(), h10 - h00, 0, 0]);
			Vector3DUtil.normalize(obj.normal);
								
			plane = new PlaneData([(i0 * this._terrain.get_dw() + this._terrain.get_minW()), h00, (j0 * this._terrain.get_dh() + this._terrain.get_minH()), 0], 
			                      obj.normal);
			obj.height = plane.pointPlaneDistance(point);
		}
		return obj;
	};
				
	/**
	 * @function getHeightByPoint
	 * @param {array} point
	 * @type number
	 **/
	JTerrain.prototype.getHeightByPoint=function(point){
		return this.getHeightAndNormalByPoint(point).height;
	};
				
	/**
	 * @function getNormalByPoint
	 * @param {array} point
	 * @type array
	 **/
	JTerrain.prototype.getNormalByPoint=function(point){
		return this.getHeightAndNormalByPoint(point).normal;
	};
				
	/**
	 * @function getSurfacePosByPoint
	 * @param {array} point
	 * @type array
	 **/
	JTerrain.prototype.getSurfacePosByPoint=function(point){
		return [point[0], this.getHeightAndNormalByPoint(point).height, point[2], 0];
	};
	
	   
	/**
	 * @function segmentIntersect
	 * @param {object} out
	 * @param {JSegment} seg
	 * @param {PhysicsState} state
	 * @type array
	 **/
	JTerrain.prototype.segmentIntersect=function(out, seg, state){
		out.fracOut = 0;
		out.posOut = [0,0,0,0];
		out.normalOut = [0,0,0,0];
						
		if (seg.delta[1] > -JNumber3D.NUM_TINY) 
			return false;

		var obj1 = this.getHeightAndNormalByPoint(seg.origin);
		if (obj1.height < 0) 
			return false;

		var obj2 = getHeightAndNormalByPoint(seg.getEnd());
		if (obj2.height > 0) 
			return false;

		var depthEnd = -obj2.height;
		var weightStart = 1 / (JNumber3D.NUM_TINY + obj1.height);
		var weightEnd = 1 / (JNumber3D.NUM_TINY + obj2.height);
						
		Vector3DUtil.scaleBy(obj1.normal, weightStart);
		Vector3DUtil.scaleBy(obj2.normal, weightEnd);
		out.normalOut = Vector3DUtil.add(obj1.normal, obj2.normal);
		Vector3DUtil.scaleBy(out.normalOut, 1 / (weightStart + weightEnd));
						
		out.fracOut = obj1.height / (obj1.height + depthEnd + JNumber3D.NUM_TINY);
		out.posOut = seg.getPoint(out.fracOut);
						
		return true;
	};
				
	/**
	 * @function limiteInt
	 * @param {number} num
	 * @param {number} min
	 * @param {number} max
	 * @type array
	 **/
	JTerrain.prototype.limiteInt=function(num,min,max){
		var n = num;
		if (n < min){
			n = min;
		}else if (n > max){
			n = max;
		}
		return n;
	};
	
	jigLib.JTerrain=JTerrain;
	
})(jigLib);(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var PlaneData=jigLib.PlaneData;
	var JAABox=jigLib.JAABox;
	
        /// Support for an indexed triangle - assumes ownership by something that 
        /// has an array of vertices and an array of tIndexedTriangle
	var JIndexedTriangle=function(){
		counter = 0;
		this._vertexIndices = [];
		this._vertexIndices[0] = -1;
		this._vertexIndices[1] = -1;
		this._vertexIndices[2] = -1;
		this._plane = new PlaneData();
		this._boundingBox = new JAABox();
	};
	
	JIndexedTriangle.prototype.counter=0;
        /// Set the indices into the relevant vertex array for this triangle. Also sets the plane and bounding box
	JIndexedTriangle.prototype.setVertexIndices=function(i0, i1, i2, vertexArray){
		this._vertexIndices[0] = i0;
		this._vertexIndices[1] = i1;
		this._vertexIndices[2] = i2;
                        
		this._plane.setWithPoint(vertexArray[i0], vertexArray[i1], vertexArray[i2]);
                        
		this._boundingBox.clear();
		this._boundingBox.addPoint(vertexArray[i0]);
		this._boundingBox.addPoint(vertexArray[i1]);
		this._boundingBox.addPoint(vertexArray[i2]);
	};
	
	JIndexedTriangle.prototype.updateVertexIndices=function(vertexArray){
		var i0,i1,i2;
		i0=this._vertexIndices[0];
		i1=this._vertexIndices[1];
		i2=this._vertexIndices[2];
                        
		this._plane.setWithPoint(vertexArray[i0], vertexArray[i1], vertexArray[i2]);
                        
		this._boundingBox.clear();
		this._boundingBox.addPoint(vertexArray[i0]);
		this._boundingBox.addPoint(vertexArray[i1]);
		this._boundingBox.addPoint(vertexArray[i2]);
	};
	
	
	 // Get the indices into the relevant vertex array for this triangle.
        JIndexedTriangle.prototype.get_vertexIndices=function(){
		return this._vertexIndices;
	};
                
	// Get the vertex index association with iCorner (which should be 0, 1 or 2)
	JIndexedTriangle.prototype.getVertexIndex=function(iCorner){
		return this._vertexIndices[iCorner];
	};
                
	// Get the triangle plane
        JIndexedTriangle.prototype.get_plane=function(){
		return this._plane;
	};
                
        JIndexedTriangle.prototype.get_boundingBox=function(){
		return this._boundingBox;
	};
	
	
	jigLib.JIndexedTriangle=JIndexedTriangle;

})(jigLib);
	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var CollOutData=jigLib.CollOutData;
	var PlaneData=jigLib.PlaneData;
	var SpanData=jigLib.SpanData;
	
	// Defines a 3d triangle. Each edge goes from the origin. Cross(edge0, edge1)  gives the triangle normal.
	
	// Points specified so that pt1-pt0 is edge0 and p2-pt0 is edge1
	var JTriangle=function(pt0, pt1, pt2){
		this.origin = pt0.slice(0);
		this.edge0 = Vector3DUtil.subtract(pt1,pt0);
		this.edge1 = Vector3DUtil.subtract(pt2,pt0);
	};
	
                
	// Edge2 goes from pt1 to pt2
	JTriangle.prototype.get_edge2=function() {
		return Vector3DUtil.subtract(this.edge1,this.edge0);
	};
                
	// Gets the triangle normal.
	JTriangle.prototype.get_normal=function(){
		var N = Vector3DUtil.crossProduct(this.edge0,this.edge1);
		Vector3DUtil.normalize(N);
                        
		return N;
	};
                
	// Gets the plane containing the triangle
	JTriangle.prototype.get_plane=function(){
		var pl = new PlaneData();
		pl.setWithNormal(this.origin, this.get_normal());
                        
		return pl;
	};
                
	// Returns the point parameterised by t0 and t1
	JTriangle.prototype.getPoint=function(t0, t1) {
		var d0,d1;
		d0 = this.edge0.slice(0);
		d1 = this.edge1.slice(0);
                        
		Vector3DUtil.scaleBy(d0,t0);
		Vector3DUtil.scaleBy(d1,t1);
                        
		return Vector3DUtil.add(Vector3DUtil.add(this.origin,d0),d1);
	};
	
	
	JTriangle.prototype.getCentre=function() {
		var result = Vector3DUtil.add(this.edge0,this.edge1);
		Vector3DUtil.scaleBy(result,0.333333);
                        
		return Vector3DUtil.add(this.origin,result);
	};
                
	// Same numbering as in the constructor
	JTriangle.prototype.getVertex=function(_id){
		switch(_id) {
			case 1: 
				return Vector3DUtil.add(this.origin,this.edge0);
			case 2:
				return Vector3DUtil.add(this.origin,this.edge1);
			default:
				return this.origin;
		}
	};
	
	JTriangle.prototype.getSpan=function(axis) {
		var d0,d1,d2;
		d0 = Vector3DUtil.dotProduct(this.getVertex(0),axis);
		d1 = Vector3DUtil.dotProduct(this.getVertex(1),axis);
		d2 = Vector3DUtil.dotProduct(this.getVertex(2),axis);
                        
		var result = new SpanData();
		result.min = Math.min(d0, d1, d2);
		result.max = Math.max(d0, d1, d2);
                        
		return result;
	};
	
	
	JTriangle.prototype.segmentTriangleIntersection=function(out, seg){
                        
		var u,v,t,a,f;
		var p,s,q;
                        
		p = Vector3DUtil.crossProduct(seg.delta,this.edge1);
		a =Vector3DUtil.dotProduct(this.edge0,p);
                        
		if (a > -JNumber3D.NUM_TINY && a < JNumber3D.NUM_TINY) {
			return false;
		}
		
		f = 1 / a;
		s = Vector3DUtil.subtract(seg.origin,this.origin);
		u = f * Vector3DUtil.dotProduct(s,p);
                        
		if (u < 0 || u > 1) return false;
                        
		q = Vector3DUtil.crossProduct(s,this.edge0);
		v = f * Vector3DUtil.dotProduct(seg.delta,q);
		if (v < 0 || (u + v) > 1) return false;
                        
		t = f * Vector3DUtil.dotProduct(this.edge1,q);
		if (t < 0 || t > 1) return false;
                        
		if (out) out.frac = t;
		return true;
	}
	
	
	JTriangle.prototype.pointTriangleDistanceSq=function(out, point){
                        
		var fA00,fA01,fA11,fB0,fB1,fC,fDet,fS,fT,fSqrDist;
                        
		var kDiff = Vector3DUtil.subtract(this.origin,point);
                    fA00 = Vector3DUtil.get_lengthSquared(this.edge0);
                    fA01 = Vector3DUtil.dotProduct(this.edge0,this.edge1);
                    fA11 = Vector3DUtil.get_lengthSquared(this.edge1);
                    fB0 = Vector3DUtil.dotProduct(kDiff,this.edge0);
                    fB1 = Vector3DUtil.dotProduct(kDiff,this.edge1);
                    fC = Vector3DUtil.get_lengthSquared(kDiff);
                    fDet = Math.abs(fA00 * fA11 - fA01 * fA01);
                    fS = fA01 * fB1 - fA11 * fB0;
                    fT = fA01 * fB0 - fA00 * fB1;
                        
                  if ( fS + fT <= fDet ){
                        if ( fS < 0 ){
                          if ( fT < 0 ){  // region 4
                                if ( fB0 < 0 ){
                                  fT = 0;
                                  if ( -fB0 >= fA00 ){
                                        fS = 1;
                                        fSqrDist = fA00+2*fB0+fC;
                                  }else{
                                        fS = -fB0/fA00;
                                        fSqrDist = fB0*fS+fC;
                                  }
                                }else{
                                  fS = 0;
                                  if ( fB1 >= 0 ){
                                        fT = 0;
                                        fSqrDist = fC;
                                  }else if ( -fB1 >= fA11 ){
                                        fT = 1;
                                        fSqrDist = fA11+2*fB1+fC;
                                  }else{
                                        fT = -fB1/fA11;
                                        fSqrDist = fB1*fT+fC;
                                  }
                                }
                          }else{  // region 3
                                fS = 0;
                                if ( fB1 >= 0 ){
                                  fT = 0;
                                  fSqrDist = fC;
                                }else if ( -fB1 >= fA11 ){
                                  fT = 1;
                                  fSqrDist = fA11+2*fB1+fC;
                                }else{
                                  fT = -fB1/fA11;
                                  fSqrDist = fB1*fT+fC;
                                }
                          }
                        }else if ( fT < 0 ){  // region 5
                          fT = 0;
                          if ( fB0 >= 0 ){
                                fS = 0;
                                fSqrDist = fC;
                          }else if ( -fB0 >= fA00 ){
                                fS = 1;
                                fSqrDist = fA00+2*fB0+fC;
                          }else{
                                fS = -fB0/fA00;
                                fSqrDist = fB0*fS+fC;
                          }
                        }else{  // region 0
                          // minimum at interior point
                          var fInvDet = 1/fDet;
                          fS *= fInvDet;
                          fT *= fInvDet;
                          fSqrDist = fS * (fA00 * fS + fA01 * fT + 2 * fB0) +fT * (fA01 * fS + fA11 * fT + 2 * fB1) + fC;
                        }
                  }else{
                        var fTmp0,fTmp1,fNumer,fDenom;

                        if ( fS < 0 ){  // region 2
                          fTmp0 = fA01 + fB0;
                          fTmp1 = fA11 + fB1;
                          if ( fTmp1 > fTmp0 ){
                                fNumer = fTmp1 - fTmp0;
                                fDenom = fA00-2*fA01+fA11;
                                if ( fNumer >= fDenom ){
                                  fS = 1;
                                  fT = 0;
                                  fSqrDist = fA00+2*fB0+fC;
                                }else{
                                  fS = fNumer/fDenom;
                                  fT = 1 - fS;
                                  fSqrDist = fS * (fA00 * fS + fA01 * fT + 2 * fB0) +fT * (fA01 * fS + fA11 * fT + 2 * fB1) + fC;
                                }
                          }else{
                                fS = 0;
                                if ( fTmp1 <= 0 ){
                                  fT = 1;
                                  fSqrDist = fA11+2*fB1+fC;
                                }else if ( fB1 >= 0 ){
                                  fT = 0;
                                  fSqrDist = fC;
                                }else {
                                  fT = -fB1/fA11;
                                  fSqrDist = fB1*fT+fC;
                                }
                          }
                        }else if ( fT < 0 ) { // region 6
                          fTmp0 = fA01 + fB1;
                          fTmp1 = fA00 + fB0;
                          if ( fTmp1 > fTmp0 ){
                                fNumer = fTmp1 - fTmp0;
                                fDenom = fA00-2*fA01+fA11;
                                if ( fNumer >= fDenom ){
                                  fT = 1;
                                  fS = 0;
                                  fSqrDist = fA11+2*fB1+fC;
                                }else{
                                  fT = fNumer/fDenom;
                                  fS = 1 - fT;
                                  fSqrDist = fS * (fA00 * fS + fA01 * fT + 2 * fB0) +fT * (fA01 * fS + fA11 * fT + 2 * fB1) + fC;
                                }
                          }else{
                                fT = 0;
                                if ( fTmp1 <= 0 ){
                                  fS = 1;
                                  fSqrDist = fA00+2*fB0+fC;
                                }else if ( fB0 >= 0 ){
                                  fS = 0;
                                  fSqrDist = fC;
                                }else{
                                  fS = -fB0/fA00;
                                  fSqrDist = fB0*fS+fC;
                                }
                          }
                        }else{  // region 1
                          fNumer = fA11 + fB1 - fA01 - fB0;
                          if ( fNumer <= 0 ){
                                fS = 0;
                                fT = 1;
                                fSqrDist = fA11+2*fB1+fC;
                          }else{
                                fDenom = fA00-2*fA01+fA11;
                                if ( fNumer >= fDenom ){
                                  fS = 1;
                                  fT = 0;
                                  fSqrDist = fA00 + 2 * fB0 + fC;
                                }else{
                                  fS = fNumer/fDenom;
                                  fT = 1 - fS;
                                  fSqrDist = fS * (fA00 * fS + fA01 * fT + 2 * fB0) +fT * (fA01 * fS + fA11 * fT + 2 * fB1) + fC;
                                }
                          }
                        }
                  }
                  out[0] = fS;
                  out[1] = fT;
                 
                  return Math.abs(fSqrDist);
                }
	
	
	jigLib.JTriangle=JTriangle;

})(jigLib);	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var EdgeData=jigLib.EdgeData;
	var JIndexedTriangle=jigLib.JIndexedTriangle;
	var JTriangle=jigLib.JTriangle;
	var JSegment=jigLib.JSegment;
	var OctreeCell=jigLib.OctreeCell;
	var TriangleVertexIndices=jigLib.TriangleVertexIndices;
	var JAABox=jigLib.JAABox;
        
	var JOctree=function(){
		this._testCounter = 0;
		this._cells = [];
		this._vertices = [];
		this._triangles = [];
		this._cellsToTest = [];
		this._boundingBox = new JAABox();
	};
	
	
	JOctree.prototype.get_trianglesData=function(){
		return this._triangles;
	};
                
        JOctree.prototype.getTriangle=function(iTriangle) {
		return this._triangles[iTriangle];
	};
                
        JOctree.prototype.get_verticesData=function(){
		return this._vertices;
	};
        JOctree.prototype.getVertex=function(iVertex){
		return this._vertices[iVertex];
	};
                
        JOctree.prototype.boundingBox=function(){
		return this._boundingBox;
	};
                
	JOctree.prototype.clear=function(){
		this._cells=[];
		this._vertices=[];
		this._triangles=[];
	}
	
                
	// Add the triangles - doesn't actually build the octree
	JOctree.prototype.addTriangles=function(vertices, numVertices, triangleVertexIndices, numTriangles){
		this.clear();
		this._vertices=vertices.slice(0);
		
		var NLen,tiny=JNumber3D.NUM_TINY;
		var i0,i1,i2;
		var dr1,dr2,N;
		var indexedTriangle;
		for(var i=0;i<triangleVertexIndices.length;i++){
			var tri=triangleVertexIndices[i];
			var i0 = triangleVertexIndices[i][0];
			var i1 = triangleVertexIndices[i][1];
			var i2 = triangleVertexIndices[i][2];
                                
			dr1 = Vector3DUtil.subtract(vertices[i1],vertices[i0]);
			dr2 = Vector3DUtil.subtract(vertices[i2],vertices[i0]);
			N = Vector3DUtil.crossProduct(dr1,dr2);
			NLen = Vector3DUtil.get_length(N);
                                
			if (NLen > tiny){
				indexedTriangle = new JIndexedTriangle();
				indexedTriangle.setVertexIndices(i0, i1, i2, this._vertices);
				this._triangles.push(indexedTriangle);
			}
		}
	}
	
	
	/* Builds the octree from scratch (not incrementally) - deleting
                 any previous tree.  Building the octree will involve placing
                 all triangles into the root cell.  Then this cell gets pushed
                 onto a stack of cells to examine. This stack will get parsed
                 and every cell containing more than maxTrianglesPerCell will
                 get split into 8 children, and all the original triangles in
                 that cell will get partitioned between the children. A
                 triangle can end up in multiple cells (possibly a lot!) if it
                 straddles a boundary. Therefore when intersection tests are
                 done tIndexedTriangle::m_counter can be set/tested using a
                 counter to avoid properly testing the triangle multiple times
                 (the counter _might_ wrap around, so when it wraps ALL the
                 triangle flags should be cleared! Could do this
                 incrementally...).*/
	JOctree.prototype.buildOctree=function(maxTrianglesPerCell, minCellSize){
		this._boundingBox.clear();
                        
		for(var i=0;i<this._vertices.length;i++){
			var vt=this._vertices[i];
			this._boundingBox.addPoint(vt);
		}
                        
		this._cells=[];
		this._cells.push(new OctreeCell(this._boundingBox));
                        
		var numTriangles = this._triangles.length;
		for (var i = 0; i < numTriangles; i++ ) {
			this._cells[0].triangleIndices[i] = i;
		}
                        
		var cellsToProcess = [];
		cellsToProcess.push(0);
                        
		var iTri;
		var cellIndex;
		var childCell;
		while (cellsToProcess.length != 0) {
			cellIndex = cellsToProcess.pop();
			if (this._cells[cellIndex].triangleIndices.length <= maxTrianglesPerCell || this._cells[cellIndex].AABox.getRadiusAboutCentre() < minCellSize) {
				continue;
			}
			
			for (var i = 0; i < OctreeCell.NUM_CHILDREN; i++ ) {
				this._cells[cellIndex].childCellIndices[i] = this._cells.length;
				cellsToProcess.push(this._cells.length);
				this._cells.push(new OctreeCell(this.createAABox(this._cells[cellIndex].AABox, i)));
                                        
				childCell = this._cells[this._cells.length - 1];
				numTriangles = this._cells[cellIndex].triangleIndices.length;
				for (var j=0; j < numTriangles; j++ ) {
					iTri = this._cells[cellIndex].triangleIndices[j];
					if (this.doesTriangleIntersectCell(this._triangles[iTri], childCell)){
						childCell.triangleIndices.push(iTri);
					}
				}
			}
			this._cells[cellIndex].triangleIndices=[];
		}
	}
                
	JOctree.prototype.updateTriangles=function(vertices){
		//this._vertices.concat(vertices);
		this._vertices=vertices.slice(0);
		for(var i=0;i<this._triangles.length;i++){
			var triangle=this._triangles[i];
			triangle.updateVertexIndices(this._vertices);
		}
	}
	
	JOctree.prototype.getTrianglesIntersectingSegment=function(triangles, seg){
		if (this._cells.length == 0) return 0;
                        
		this._cellsToTest=[];
		this._cellsToTest.push(0);
                                               
		var cellIndex,nTris,cell,triangle;
		
		this.incrementTestCounter();
		while (this._cellsToTest.length != 0) {
			cellIndex = this._cellsToTest.pop();
			cell = this._cells[cellIndex];
                                
			if (!cell.AABox.segmentAABoxOverlap(seg)) {
				continue;
			}
			
			if (cell.isLeaf()) {
				nTris = cell.triangleIndices.length;
				for (var i = 0 ; i < nTris ; i++) {
					triangle = this.getTriangle(cell.triangleIndices[i]);
					if (triangle.counter != this._testCounter) {
						triangle.counter = this._testCounter;
						if (triangle.get_boundingBox().segmentAABoxOverlap(seg)) {
							triangles.push(triangle);
						}
					}
				}
			}else {
				for (var i = 0 ; i < OctreeCell.NUM_CHILDREN ; i++) {
					this._cellsToTest.push(cell.childCellIndices[i]);
				}
			}
		}
		return triangles.length;
	}
                
	/* Gets a list of all triangle indices that intersect an AABox. The vector passed in resized,
                 so if you keep it between calls after a while it won't grow any more, and this
                 won't allocate more memory.
                 Returns the number of triangles (same as triangles.size())*/
	JOctree.prototype.getTrianglesIntersectingtAABox=function(triangles, aabb){
		if (this._cells.length == 0) return 0;
                        
		this._cellsToTest=[];
		this._cellsToTest.push(0);
                        
		this.incrementTestCounter();
                        
		var cellIndex,nTris,cell,triangle;
		while (this._cellsToTest.length != 0) {
			cellIndex = this._cellsToTest.pop();
			cell = this._cells[cellIndex];
                                
			if (!aabb.overlapTest(cell.AABox)) {
				continue;
			}
			if (cell.isLeaf()) {
				nTris = cell.triangleIndices.length;
				for (var i = 0 ; i < nTris ; i++) {
					triangle = this.getTriangle(cell.triangleIndices[i]);
					if (triangle.counter != this._testCounter) {
						triangle.counter = this._testCounter;
						if (aabb.overlapTest(triangle.get_boundingBox())) {
							triangles.push(cell.triangleIndices[i]);
						}
					}
				}
			}else {
				for (var i = 0 ; i < OctreeCell.NUM_CHILDREN ; i++) {
					this._cellsToTest.push(cell.childCellIndices[i]);
				}
			}
		}
		return triangles.length;
	}
                
	JOctree.prototype.dumpStats=function(){
		var maxTris = 0,numTris,cellIndex,cell;
                        
		var cellsToProcess = [];
		cellsToProcess.push(0);
                        
		while (cellsToProcess.length != 0) {
			cellIndex = cellsToProcess.pop();
                                
			cell = cell[cellIndex];
			if (cell.isLeaf()) {
                                        
				numTris = cell.triangleIndices.length;
				if (numTris > maxTris) {
					maxTris = numTris;
				}
			}else {
				for (var i = 0 ; i < OctreeCell.NUM_CHILDREN ; i++) {
					if ((cell.childCellIndices[i] >= 0) && (cell.childCellIndices[i] < this._cells.length)) {
						cellsToProcess.push(cell.childCellIndices[i]);
					}
				}
			}
		}
	}
	
	
	// Create a bounding box appropriate for a child, based on a parents AABox
	JOctree.prototype.createAABox=function(aabb, _id){
		var dims = JNumber3D.getScaleVector(Vector3DUtil.subtract(aabb.get_maxPos(),aabb.get_minPos()), 0.5);
		var offset;
		switch(_id) {
			case 0:
				offset = [1, 1, 1];
				break;
			case 1:
				offset = [1, 1, 0];
				break;
			case 2:
				offset = [1, 0, 1];
				break;
			case 3:
				offset = [1, 0, 0];
				break;
			case 4:
				offset = [0, 1, 1];
				break;
			case 5:
				offset = [0, 1, 0];
				break;
			case 6:
				offset = [0, 0, 1];
				break;
			case 7:
				offset = [0, 0, 0];
				break;
			default:
				offset = [0, 0, 0];
				break;
		}
                        		
		var result = new JAABox();
		result.set_minPos(Vector3DUtil.add(aabb.get_minPos(),[offset[0] * dims[0], offset[1] * dims[1], offset[2] * dims[2]]));
		result.set_maxPos(Vector3DUtil.add(result.get_minPos(),dims));
		Vector3DUtil.scaleBy(dims,0.00001);
		result.set_minPos(Vector3DUtil.subtract(result.get_minPos(),dims));
		result.set_maxPos(Vector3DUtil.add(result.get_maxPos(),dims));
                        
		return result;
	}	
	
	
	// Returns true if the triangle intersects or is contained by a cell
	JOctree.prototype.doesTriangleIntersectCell=function(triangle, cell){
		if (!triangle.get_boundingBox().overlapTest(cell.AABox)) {
			return false;
		}
		if (cell.AABox.isPointInside(this.getVertex(triangle.getVertexIndex(0))) ||
			cell.AABox.isPointInside(this.getVertex(triangle.getVertexIndex(1))) ||
			cell.AABox.isPointInside(this.getVertex(triangle.getVertexIndex(2)))) {
			return true;
		}

		var tri = new JTriangle(this.getVertex(triangle.getVertexIndex(0)), this.getVertex(triangle.getVertexIndex(1)), this.getVertex(triangle.getVertexIndex(2)));
		var edge;
		var seg;
		var edges = cell.get_egdes();
		var pts = cell.get_points();
		for (var i = 0; i < 12; i++ ) {
			edge = edges[i];
			seg = new JSegment(pts[edge.ind0], Vector3DUtil.subtract(pts[edge.ind1],pts[edge.ind0]));
			if (tri.segmentTriangleIntersection({}, seg)) {
				return true;
			}
		}
                        
		var pt0;
		var pt1;
		for (i = 0; i < 3; i++ ) {
			pt0 = tri.getVertex(i);
			pt1 = tri.getVertex((i + 1) % 3);
			if (cell.AABox.segmentAABoxOverlap(new JSegment(pt0, Vector3DUtil.subtract(pt1,pt0)))) {
				return true;
			}
		}
		return false;
	}
	
                
	/* Increment our test counter, wrapping around if necessary and zapping the triangle counters.
                 Const because we only modify mutable members.*/
	JOctree.prototype.incrementTestCounter=function(){
		++this._testCounter;
		if (this._testCounter == 0) {
			var numTriangles = this._triangles.length;
			for (var i = 0; i < numTriangles; i++) {
				this._triangles[i].counter = 0;
			}
			this._testCounter = 1;
		}
	}
	
	
	jigLib.JOctree=JOctree;

})(jigLib);
	
	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JMatrix3D=jigLib.JMatrix3D;
	var JOctree=jigLib.JOctree;
	var CollOutData=jigLib.CollOutData;
	var TriangleVertexIndices=jigLib.TriangleVertexIndices;
	var PhysicsState=jigLib.PhysicsState;
	var RigidBody=jigLib.RigidBody;
	var ISkin3D=jigLib.ISkin3D;
	var JTriangle=jigLib.JTriangle;

	//removed init position and init orientation seems weird to have on trimesh but no other geom types
	var JTriangleMesh=function(skin, maxTrianglesPerCell, minCellSize){
		this.Super(skin);
		if(maxTrianglesPerCell==undefined) maxTrianglesPerCell=20;
		if(minCellSize==undefined) minCellSize=1;
                        
		this._maxTrianglesPerCell = maxTrianglesPerCell;
		this._minCellSize = minCellSize;
                        
		this.set_movable(false);
                        
		if(skin){
			this._skinVertices=skin.vertices;
			this.createMesh(this._skinVertices,skin.indices);
                                
			this._boundingBox=this._octree.boundingBox().clone();
			this._boundingSphere=this._boundingBox.getRadiusAboutCentre();
		}
                        
		this._type = "TRIANGLEMESH";
	};
	
	jigLib.extend(JTriangleMesh,jigLib.RigidBody);
	
	/*Internally set up and preprocess all numTriangles. Each index
                 should, of course, be from 0 to numVertices-1. Vertices and
                 triangles are copied and stored internally.*/
        JTriangleMesh.prototype.createMesh=function(vertices, triangleVertexIndices){
		this._skinVertices=vertices;
		var len=vertices.length;
		var vts=[];
                        
		var transform = JMatrix3D.getTranslationMatrix(this.get_currentState().position[0], this.get_currentState().position[1], this.get_currentState().position[2]);
		transform = JMatrix3D.getAppendMatrix3D(this.get_currentState().get_orientation(), transform);
                        
		var i = 0;
		for(var j=0;j<vertices.length;j++){
			var _point=vertices[j].slice(0);
			vts[i++] = transform.transformVector(_point);
		}

		this._octree = new JOctree();
                        
		this._octree.addTriangles(vts, vts.length, triangleVertexIndices, triangleVertexIndices.length);
		this._octree.buildOctree(this._maxTrianglesPerCell, this._minCellSize);
                        
	}
	
	
	
	JTriangleMesh.prototype.get_octree=function(){
		return this._octree;
	}
                
        /*JTriangleMesh.prototype.segmentIntersect=function(out, seg, state){
		var segBox = new jigLib.JAABox();
		segBox.addSegment(seg);
                        
		var potentialTriangles = [];
		var numTriangles = this._octree.getTrianglesIntersectingtAABox(potentialTriangles, segBox);
                        
		var bestFrac = JNumber3D.NUM_HUGE;
		var tri;
		var meshTriangle;
		for (var iTriangle = 0 ; iTriangle < numTriangles ; iTriangle++) {
			meshTriangle = this._octree.getTriangle(potentialTriangles[iTriangle]);
                                
			tri = new JTriangle(this._octree.getVertex(meshTriangle.getVertexIndex(0)), this._octree.getVertex(meshTriangle.getVertexIndex(1)), this._octree.getVertex(meshTriangle.getVertexIndex(2)));
                                
			if (tri.segmentTriangleIntersection(out, seg)) {
				if (out.frac < bestFrac) {
					bestFrac = out.frac;
					out.position = seg.getPoint(bestFrac);
					out.normal = meshTriangle.get_plane().normal;
				}
			}
		}
		out.frac = bestFrac;
		if (bestFrac < JNumber3D.NUM_HUGE) {
			return true;
		}else {
			return false;
		}
	}*/
	
	JTriangleMesh.prototype.segmentIntersect=function(out, seg, state){
                        
		var potentialTriangles = [];
		var numTriangles = this._octree.getTrianglesIntersectingSegment(potentialTriangles, seg);
                        
		var bestFrac = JNumber3D.NUM_HUGE;
		for (var iTriangle = 0 ; iTriangle < numTriangles ; iTriangle++) {
			var meshTriangle = potentialTriangles[iTriangle];
                                
			var tri = new JTriangle(this._octree.getVertex(meshTriangle.getVertexIndex(0)), this._octree.getVertex(meshTriangle.getVertexIndex(1)), this._octree.getVertex(meshTriangle.getVertexIndex(2)));
                                
			if (tri.segmentTriangleIntersection(out, seg)) {
				if (out.frac < bestFrac) {
					bestFrac = out.frac;
					out.position = seg.getPoint(bestFrac);
					out.normal = meshTriangle.get_plane().normal;
				}
			}
		}
		out.frac = bestFrac;
		if (bestFrac < JNumber3D.NUM_HUGE) {
			return true;
		}else {
			return false;
		}
	}
	
	JTriangleMesh.prototype.updateState=function(){
		this.Super.prototype.updateState.call(this);
                        
		var len=this._skinVertices.length;
		var vts=[];
		
		var transform = JMatrix3D.getTranslationMatrix(this.get_currentState().position[0], this.get_currentState().position[1], this.get_currentState().position[2]);
		transform = JMatrix3D.getAppendMatrix3D(this.get_currentState().get_orientation(), transform);

		var i = 0;
		for(j=0;j<this._skinVertices.length;j++){
			var _point=this._skinVertices[j].slice(0);
			vts[i++] = transform.transformVector(_point);
		}

		this._octree.updateTriangles(vts);
		this._octree.buildOctree(this._maxTrianglesPerCell, this._minCellSize);
                        
		this._boundingBox=this._octree.boundingBox().clone();
	}
                
                /*
                override public function getInertiaProperties(m:Number):Matrix3D
                {
                        return new Matrix3D();
                }
                
                override protected function updateBoundingBox():void {
                }*/
	
	
	
	jigLib.JTriangleMesh=JTriangleMesh;

})(jigLib);	/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollPointInfo
	 * @class CollPointInfo
	 * @property {number} initialPenetration
	 * @property {array} r0 a 3D vector
	 * @property {array} r1 a 3D vector
	 * @property {array} position a 3D vector
	 * @property {number} minSeparationVel
	 * @property {number} denominator
	 * @property {number} accumulatedNormalImpulse
	 * @property {number} accumulatedNormalImpulseAux
	 * @property {array} accumulatedFrictionImpulse a 3D vector
	 * @constructor
	 **/
	var CollPointInfo=function(){
		this.accumulatedFrictionImpulse=[0,0,0,0];
	};
	
	CollPointInfo.prototype.initialPenetration=null;
	CollPointInfo.prototype.r0;
	CollPointInfo.prototype.r1;
	CollPointInfo.prototype.position;

	CollPointInfo.prototype.minSeparationVel = 0;
	CollPointInfo.prototype.denominator = 0;

	CollPointInfo.prototype.accumulatedNormalImpulse = 0;
	CollPointInfo.prototype.accumulatedNormalImpulseAux = 0;
	CollPointInfo.prototype.accumulatedFrictionImpulse = null;
	
	jigLib.CollPointInfo=CollPointInfo;
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

 (function(jigLib){
	var MaterialProperties=jigLib.MaterialProperties;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollisionInfo
	 * @class CollisionInfo stores information about a collision
	 * @requires MaterialProperties
	 * @property {MaterialProperties} mat
	 * @property {CollDetectInfo} objInfo
	 * @property {array} pointInfo a collection of points expressed as 3D vectors
	 * @property {boolean} satisfied whether the collision has been satisfied
	 * @constructor
	 **/
	var CollisionInfo=function(){
		this.mat=new MaterialProperties();
		this.pointInfo=[];
	};
	CollisionInfo.prototype.mat=null;
	CollisionInfo.prototype.objInfo=null;
	CollisionInfo.prototype.dirToBody=null;
	CollisionInfo.prototype.pointInfo=null;
	CollisionInfo.prototype.satisfied=null;
	
	jigLib.CollisionInfo=CollisionInfo;
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

 (function(jigLib){
	 /**
	  * @author Muzer(muzerly@gmail.com)
	  * 
	  * @name CollDetectInfo
	  * @class CollDetectInfo stores 2 rigid bodies and is used by collision detection classes
	  * @property {RigidBody} body0
	  * @property {RigidBody} body1
	  * @constructor
	  */
	 var CollDetectInfo=function(){
	 };
	 CollDetectInfo.prototype.body0=null;
	 CollDetectInfo.prototype.body1=null;
	 
	 jigLib.CollDetectInfo=CollDetectInfo;
 })(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectFunctor
	 * @class CollDetectFunctor base class for collision detection classes
	 * @property {string} name the inheriting class's collision type e.g. BoxPlane
	 * @property {string} type0 the first geometry type in the collisions supported by the inheritng class e.g. Box
	 * @property {string} type1 the second geometry type in the collisions supported by the inheritng class e.g. Plane
	 * @constructor
	 **/
	var CollDetectFunctor=function(){
	};
	
	CollDetectFunctor.prototype.name=null;
	CollDetectFunctor.prototype.type0=null;
	CollDetectFunctor.prototype.type1=null;
	
	/**
	 * @function collDetect detects a collision and updates the info parameter - must be implemented by the inheriting class
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectFunctor.prototype.collDetect=function(info,collArr){
	};
	
	jigLib.CollDetectFunctor=CollDetectFunctor;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JMatrix3D=jigLib.JMatrix3D;
	var JConstraint=jigLib.JConstraint;
	var JSegment=jigLib.JSegment;
	var JConfig=jigLib.JConfig;
	var JSphere=jigLib.JSphere;
	var MaterialProperties=jigLib.MaterialProperties;
	var PhysicsState=jigLib.PhysicsState;
	var EdgeData=jigLib.EdgeData;
	var SpanData=jigLib.SpanData;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectBoxBox
	 * @class CollDetectBoxBox handles collisions between boxes
	 * @extends CollDetectFunctor
	 * @property {number} combinationDist the combination distance
	 * @requires CollDetectInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JBox
	 * @requires PhysicsState
	 * @constructor
	 **/
	var CollDetectBoxBox=function(){
		this.name = "BoxBox";
		this.type0 = "BOX";
		this.type1 = "BOX";
	};
	jigLib.extend(CollDetectBoxBox,jigLib.CollDetectFunctor);
	
	CollDetectBoxBox.prototype.combinationDist=null;
	
	// I can't find any other reference to the MAX_SUPPORT_VERTS property anywhere!
	// CollDetectBoxBox.prototype.MAX_SUPPORT_VERTS = 10;
	
	/**
	 * @function disjoint tests for disjoint or intersection
	 * @param {SpanData} out the SpanData object to apply test results to
	 * @param {array} axis the axis expressed as a 3D vector
	 * @param {JBox} box0 the first box to use for testing
	 * @param {JBox} box1 the second box to use for testing
	 * @returns true if disjoint, false if intersecting
	 * @type boolean
	 **/
	CollDetectBoxBox.prototype.disjoint=function(out, axis, box0, box1){
		var obj0 = box0.getSpan(axis);
		var obj1 = box1.getSpan(axis);
		var obj0Min = obj0.min;
		var obj0Max = obj0.max;
		var obj1Min = obj1.min;
		var obj1Max = obj1.max;
		var mmin = Math.min;
		
		if (obj0Min > (obj1Max + JConfig.collToll + JNumber3D.NUM_TINY) || obj1Min > (obj0Max + JConfig.collToll + JNumber3D.NUM_TINY)){
			out.flag = true;
			return true;
		}
		if ((obj0Max > obj1Max) && (obj1Min > obj0Min)){
			out.depth = mmin(obj0Max - obj1Min, obj1Max - obj0Min);
		}else if ((obj1Max > obj0Max) && (obj0Min > obj1Min)){
			out.depth = mmin(obj1Max - obj0Min, obj0Max - obj1Min);
		}else{
			out.depth = (obj0Max < obj1Max) ? obj0Max : obj1Max;
			out.depth -= (obj0Min > obj1Min) ? obj0Min : obj1Min;
		}
		out.flag = false;
		return false;
	};
	
	
	/**
	 * @function addPoint conditionally adds one 3D vector to a collection of other 3D vectors
	 * @param {array} contactPoints a collection of points (3D vectors)
	 * @param {array} pt the point to add expressed as a 3D vector
	 * @param {number} combinationDistanceSq the maximum length squared allowed between pt and any of contactPoints
	 * @returns true if pt was added to contactPoints, false if combinationDistanceSq was ever exceeded
	 * @type boolean
	 **/
	CollDetectBoxBox.prototype.addPoint=function(contactPoints, pt, combinationDistanceSq){
		for(var i=0,cpsl=contactPoints.length;i<cpsl;i++){
			var contactPoint=contactPoints[i];
			if (Vector3DUtil.get_lengthSquared(Vector3DUtil.subtract(contactPoint, pt)) < combinationDistanceSq){
				contactPoint = JNumber3D.getDivideVector(Vector3DUtil.add(contactPoint, pt), 2);
				return false;
			}
		}
		contactPoints.push(pt);
		return true;
	};

				
	/**
	 * @function getSupportPoint
	 * @param {JBox} box
	 * @param {array} axis the axis expressed as a 3D vector
	 * @returns the point expressed as a 3D Vector
	 * @type {array}
	 **/
	CollDetectBoxBox.prototype.getSupportPoint=function(box, axis) {
		var orientationCol = box.get_currentState().getOrientationCols();
		var _as = Vector3DUtil.dotProduct(axis,orientationCol[0]);
		var _au = Vector3DUtil.dotProduct(axis,orientationCol[1]);
		var _ad = Vector3DUtil.dotProduct(axis,orientationCol[2]);
						
		var p = box.get_currentState().position.slice(0);
  
		var sideLengths=box.get_sideLengths();
		
		if (_as < -JNumber3D.NUM_TINY) {
			p = Vector3DUtil.add(p,JNumber3D.getScaleVector(orientationCol[0], 0.5 * sideLengths[0]));
		}else if (_as >= JNumber3D.NUM_TINY) {
			p = Vector3DUtil.subtract(p,JNumber3D.getScaleVector(orientationCol[0], 0.5 * sideLengths[0]));
		}
  
		if (_au < -JNumber3D.NUM_TINY) {
			p = Vector3DUtil.add(p,JNumber3D.getScaleVector(orientationCol[1], 0.5 * sideLengths[1]));
		}else if (_au > JNumber3D.NUM_TINY) {
			p = Vector3DUtil.subtract(p,JNumber3D.getScaleVector(orientationCol[1], 0.5 * sideLengths[1]));
		}
  
		if (_ad < -JNumber3D.NUM_TINY) {
			p = Vector3DUtil.add(p,JNumber3D.getScaleVector(orientationCol[2], 0.5 * sideLengths[2]));
		}else if (_ad > JNumber3D.NUM_TINY) {
			p = Vector3DUtil.subtract(p,JNumber3D.getScaleVector(orientationCol[2], 0.5 * sideLengths[2]));
		}
		return p;
	};

	/**
	 * @function getAABox2EdgeIntersectionPoints
	 * @param {array} contactPoint a 3D vector
	 * @param {array} origBoxSides a 3D vector
	 * @param {PhysicsState} origBoxState
	 * @param {array} edgePt0 a 3D vector
	 * @param {array} edgePt1 a 3D vector
	 * @type {number}
	 **/
	CollDetectBoxBox.prototype.getAABox2EdgeIntersectionPoints=function(contactPoint, origBoxSides, origBoxState, edgePt0, edgePt1){
		var jDir;
		var kDir;
		var dist0;
		var dist1;
		var frac;
		var num=0;
		var pt;
		var edgeDir = Vector3DUtil.subtract(edgePt1, edgePt0);
		Vector3DUtil.normalize(edgeDir);
		var ptArr=[];
		var faceOffsets=[];
		var edgePt0Arr = edgePt0;
		var edgePt1Arr = edgePt1;
		var edgeDirArr = edgeDir;
		var sidesArr = JNumber3D.getScaleVector(origBoxSides, 0.5);
		for (var iDir= 2; iDir >= 0; iDir--) {
			if (Math.abs(edgeDirArr[iDir]) < 0.1) {
				continue;
			}
			jDir = (iDir + 1) % 3;
			kDir = (iDir + 2) % 3;
			faceOffsets = [ -sidesArr[iDir], sidesArr[iDir]];
			for (var iFace= 1; iFace >= 0; iFace-- ) {
				dist0 = edgePt0Arr[iDir] - faceOffsets[iFace];
				dist1 = edgePt1Arr[iDir] - faceOffsets[iFace];
				frac = -1;
				if (dist0 * dist1 < -JNumber3D.NUM_TINY) {
					frac = -dist0 / (dist1 - dist0);
				}else if (Math.abs(dist0) < JNumber3D.NUM_TINY) {
					frac = 0;
				}else if (Math.abs(dist1) < JNumber3D.NUM_TINY) {
					frac = 1;
				}
				if (frac >= 0) {
					pt = Vector3DUtil.add(JNumber3D.getScaleVector(edgePt0, 1 - frac),JNumber3D.getScaleVector(edgePt1, frac));
					ptArr = pt;
					if ((ptArr[jDir] > -sidesArr[jDir] - JNumber3D.NUM_TINY) && (ptArr[jDir] < sidesArr[jDir] + JNumber3D.NUM_TINY) && (ptArr[kDir] > -sidesArr[kDir] - JNumber3D.NUM_TINY) && (ptArr[kDir] < sidesArr[kDir] + JNumber3D.NUM_TINY) ) {
						pt=pt.splice(0);
						JMatrix3D.multiplyVector(origBoxState.get_orientation(),pt);
						pt = Vector3DUtil.add(pt,origBoxState.position);
						this.addPoint(contactPoint, pt, combinationDist);
						if (++num == 2) {
							return num;
						}
					}
				}
			}
		}
		return num;
	};
				
	/**
	 * @function getBox2BoxEdgesIntersectionPoints
	 * @param {array} contactPoint a 3D vector
	 * @param {JBox} box0
	 * @param {JBox} box1
	 * @param {PhysicsState} newState
	 * @type {number}
	 **/
	CollDetectBoxBox.prototype.getBox2BoxEdgesIntersectionPoints=function(contactPoint, box0, box1, newState){
		var num = 0;
		var seg;
		var box0State = (newState) ? box0.get_currentState() : box0.get_oldState();
		var box1State= (newState) ? box1.get_currentState() : box1.get_oldState();
		var boxPts = box1.getCornerPointsInBoxSpace(box1State, box0State);
		
		var boxEdges = box1.get_edges();
		var edgePt0;
		var edgePt1;
		for(var i=0;i<boxEdges.length;i++){
		var boxEdge=boxEdges[i];
			edgePt0 = boxPts[boxEdge.ind0];
			edgePt1 = boxPts[boxEdge.ind1];
			num += this.getAABox2EdgeIntersectionPoints(contactPoint, box0.get_sideLengths(), box0State, edgePt0, edgePt1);
			if (num >= 8) {
				return num;
			}
		}
		return num;
	};

	/**
	 * @function getBoxBoxIntersectionPoints
	 * @param {array} contactPoint a 3D vector
	 * @param {JBox} box0
	 * @param {JBox} box1
	 * @param {PhysicsState} newState
	 * @type {number}
	 **/
	CollDetectBoxBox.prototype.getBoxBoxIntersectionPoints=function(contactPoint, box0, box1, newState){
		this.getBox2BoxEdgesIntersectionPoints(contactPoint, box0, box1, newState);
		this.getBox2BoxEdgesIntersectionPoints(contactPoint, box1, box0, newState);
		return Vector3DUtil.get_length(contactPoint);
	};
	
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @param {PhysicsState} newState
	 * @type {void}
	 **/
	CollDetectBoxBox.prototype.collDetect=function(info, collArr){
		var box0 = info.body0;
		var box1 = info.body1;

		if (!box0.hitTestObject3D(box1)) return;

		if (JConfig.aabbDetection && !box0.get_boundingBox().overlapTest(box1.get_boundingBox())) return;

		var numTiny= JNumber3D.NUM_TINY;
		var numHuge= JNumber3D.NUM_HUGE;

		var dirs0Arr = box0.get_currentState().getOrientationCols();
		var dirs1Arr = box1.get_currentState().getOrientationCols();

		// the 15 potential separating axes
		var axes = [dirs0Arr[0], dirs0Arr[1], dirs0Arr[2],
								dirs1Arr[0], dirs1Arr[1], dirs1Arr[2],
								Vector3DUtil.crossProduct(dirs0Arr[0],dirs1Arr[0]),
								Vector3DUtil.crossProduct(dirs0Arr[1],dirs1Arr[0]),
								Vector3DUtil.crossProduct(dirs0Arr[2],dirs1Arr[0]),
								Vector3DUtil.crossProduct(dirs0Arr[0],dirs1Arr[1]),
								Vector3DUtil.crossProduct(dirs0Arr[1],dirs1Arr[1]),
								Vector3DUtil.crossProduct(dirs0Arr[2],dirs1Arr[1]),
								Vector3DUtil.crossProduct(dirs0Arr[0],dirs1Arr[2]),
								Vector3DUtil.crossProduct(dirs0Arr[1],dirs1Arr[2]),
								Vector3DUtil.crossProduct(dirs0Arr[2],dirs1Arr[2])];

		var l2;
		// the overlap depths along each axis
		var overlapDepths = [];
		var i= 0;
		var axesLength = axes.length;

		// see if the boxes are separate along any axis, and if not keep a 
		// record of the depths along each axis
		for (i = 0; i < axesLength; i++){
			var _overlapDepth = overlapDepths[i] = new SpanData();
			_overlapDepth.depth = numHuge;

			l2 = Vector3DUtil.get_lengthSquared(axes[i]);
			if (l2 < numTiny) continue;
								
			var ax = axes[i].slice(0);
			Vector3DUtil.normalize(ax);
			if (this.disjoint(overlapDepths[i], ax, box0, box1)) return;
		}

		// The box overlap, find the separation depth closest to 0.
		var minDepth = numHuge;
		var minAxis = -1;
		axesLength = axes.length;
		for (i = 0; i < axesLength; i++){
			l2 = Vector3DUtil.get_lengthSquared(axes[i]);
			if (l2 < numTiny) continue;

			// If this axis is the minimum, select it
			if (overlapDepths[i].depth < minDepth){
				minDepth = overlapDepths[i].depth;
				minAxis =i;
			}
		}
						
		if (minAxis == -1) return;
						
		// Make sure the axis is facing towards the box0. if not, invert it
		var N= axes[minAxis].splice(0);
		if (Vector3DUtil.dotProduct(Vector3DUtil.subtract(box1.get_currentState().position,box0.get_currentState().position),N) > 0) 
			N = JNumber3D.getScaleVector(N, -1);
						
		var contactPointsFromOld = true;
		var contactPoints = [];
		var box0lengths=box0.get_sideLengths();
		var box1lengths=box1.get_sideLengths();
		combinationDist = 0.05 * Math.min(Math.min(box0lengths[0], box0lengths[1], box0lengths[2]), Math.min(box1lengths[0], box1lengths[1], box1lengths[2]));
		combinationDist += (JConfig.collToll * 3.464);
		combinationDist *= combinationDist;

		if (minDepth > -JNumber3D.NUM_TINY)
			this.getBoxBoxIntersectionPoints(contactPoints, box0, box1, false);
						
		if (contactPoints.length == 0){
			contactPointsFromOld = false;
			this.getBoxBoxIntersectionPoints(contactPoints, box0, box1, true);
		}
						
		var bodyDelta = Vector3DUtil.subtract(Vector3DUtil.subtract(box0.get_currentState().position,box0.get_oldState().position),Vector3DUtil.subtract(box1.get_currentState().position,box1.get_oldState().position));
		var bodyDeltaLen = Vector3DUtil.dotProduct(bodyDelta,N);
		var oldDepth = minDepth + bodyDeltaLen;
						
		var SATPoint = [];
		switch(minAxis){
			//-----------------------------------------------------------------
			// Box0 face, Box1 Corner collision
			//-----------------------------------------------------------------
		case 0:
		case 1:
		case 2:
			//-----------------------------------------------------------------
			// Get the lowest point on the box1 along box1 normal
			//-----------------------------------------------------------------
			SATPoint = this.getSupportPoint(box1, JNumber3D.getScaleVector(N, -1));
			break;
		//-----------------------------------------------------------------
		// We have a Box2 corner/Box1 face collision
		//-----------------------------------------------------------------
		case 3:
		case 4:
		case 5:
			//-----------------------------------------------------------------
			// Find with vertex on the triangle collided
			//-----------------------------------------------------------------
			SATPoint = this.getSupportPoint(box0, N);
			break;
		//-----------------------------------------------------------------
		// We have an edge/edge colliiosn
		//-----------------------------------------------------------------
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
			//-----------------------------------------------------------------
			// Retrieve which edges collided.
			//-----------------------------------------------------------------
			i = minAxis - 6;
			var ia = (i / 3)|0;
			var ib= i - ia * 3;
			//-----------------------------------------------------------------
			// find two P0, P1 point on both edges. 
			//-----------------------------------------------------------------
			var P0 = this.getSupportPoint(box0, N);
			var P1 = this.getSupportPoint(box1, JNumber3D.getScaleVector(N, -1));
	  
			//-----------------------------------------------------------------
			// Find the edge intersection. 
			//-----------------------------------------------------------------
	 
			//-----------------------------------------------------------------
			// plane along N and F, and passing through PB
			//-----------------------------------------------------------------
			var planeNormal = Vector3DUtil.crossProduct(N,dirs1Arr[ib]);
			var planeD = Vector3DUtil.dotProduct(planeNormal,P1);
	  
			//-----------------------------------------------------------------
			// find the intersection t, where Pintersection = P0 + t*box edge dir
			//-----------------------------------------------------------------
			var div = Vector3DUtil.dotProduct(dirs0Arr[ia],planeNormal);
	  
			//-----------------------------------------------------------------
			// plane and ray colinear, skip the intersection.
			//-----------------------------------------------------------------
			if (Math.abs(div) < JNumber3D.NUM_TINY) return;
	  
			var t = (planeD - Vector3DUtil.dotProduct(P0,planeNormal)) / div;
	  
			//-----------------------------------------------------------------
			// point on edge of box0
			//-----------------------------------------------------------------
			P0 = Vector3DUtil.add(P0,JNumber3D.getScaleVector(dirs0Arr[ia], t));
			SATPoint =Vector3DUtil.add(P0,JNumber3D.getScaleVector(N, 0.5 * minDepth));
			break;
		}

		var collPts;
		if (contactPoints.length > 0){
			collPts = [];

			var minDist = JNumber3D.NUM_HUGE;
			var maxDist = -JNumber3D.NUM_HUGE;
			var dist;
			var depth;
			var depthScale;
			var cpInfo;
			var contactPoint;

			for(var j=0;j<contactPoints.length;j++){
				contactPoint=contactPoints[j];

				dist = Vector3DUtil.get_length(Vector3DUtil.subtract(contactPoint,SATPoint));
						
				if (dist < minDist) minDist = dist;

				if (dist > maxDist) maxDist = dist;
			}

			if (maxDist < minDist + JNumber3D.NUM_TINY) maxDist = minDist + JNumber3D.NUM_TINY;

			i = 0;
							  
			for(var j=0;j<contactPoints.length;j++){
				contactPoint=contactPoints[j];
				dist = Vector3DUtil.get_length(Vector3DUtil.subtract(contactPoint,SATPoint));
				depthScale = (dist - minDist) / (maxDist - minDist);
				depth = (1 - depthScale) * oldDepth;
				cpInfo = new CollPointInfo();
						
				if (contactPointsFromOld) {
					cpInfo.r0 = Vector3DUtil.subtract(contactPoint,box0.get_oldState().position);
					cpInfo.r1 = Vector3DUtil.subtract(contactPoint,box1.get_oldState().position);
				} else {
					cpInfo.r0 = Vector3DUtil.subtract(contactPoint,box0.get_currentState().position);
					cpInfo.r1 = Vector3DUtil.subtract(contactPoint,box1.get_currentState().position);
				}
						
				cpInfo.initialPenetration = depth;
				collPts[i++] = cpInfo;
			}
		}else{
			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(SATPoint,box0.get_currentState().position);
			cpInfo.r1 = Vector3DUtil.subtract(SATPoint,box1.get_currentState().position);
			cpInfo.initialPenetration = oldDepth;

			collPts = [];
			collPts[0] = cpInfo;
		}
		var collInfo = new CollisionInfo();
		collInfo.objInfo = info;
		collInfo.dirToBody = N;
		collInfo.pointInfo = collPts;

		var mat = new MaterialProperties();
		mat.set_restitution(Math.sqrt(box0.get_material().get_restitution() * box1.get_material().get_restitution()));
		mat.set_friction(Math.sqrt(box0.get_material().get_friction() * box1.get_material().get_friction()));
		collInfo.mat = mat;
		collArr.push(collInfo);

		info.body0.collisions.push(collInfo);
		info.body1.collisions.push(collInfo);
	};

	jigLib.CollDetectBoxBox=CollDetectBoxBox;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JPlane=jigLib.JPlane;
	var JSegment=jigLib.JSegment;
	var JBox=jigLib.JBox;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectBoxPlane
	 * @class CollDetectBoxPlane handles collisions between boxes and planes
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires Vector3DUtil
	 * @constructor
	 **/
	var CollDetectBoxPlane=function(){
		this.name = "BoxPlane";
		this.type0 = "BOX";
		this.type1 = "PLANE";
	};
	jigLib.extend(CollDetectBoxPlane,jigLib.CollDetectFunctor);

	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectBoxPlane.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.get_type() == "PLANE"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}

		var box = info.body0;
		var plane = info.body1;

		var centreDist= plane.pointPlaneDistance(box.get_currentState().position);

		if (centreDist > box.get_boundingSphere() + JConfig.collToll)
			return;
		
		var newPts = box.getCornerPoints(box.get_currentState());
		var oldPts = box.getCornerPoints(box.get_oldState());
		var collPts = [];
		var cpInfo;
		var newPt;
		var oldPt;
		var newDepth;
		var oldDepth;
		
		for (var i=0; i<8; i++){
			newPt = newPts[i];
			oldPt = oldPts[i];
			newDepth = -1 * plane.pointPlaneDistance(newPt);
			oldDepth = -1 * plane.pointPlaneDistance(oldPt);
			if (Math.max(newDepth, oldDepth) > -JConfig.collToll){
				cpInfo = new CollPointInfo();
				cpInfo.r0 = Vector3DUtil.subtract(oldPt, box.get_oldState().position);
				cpInfo.r1 = Vector3DUtil.subtract(oldPt, plane.get_oldState().position);
				cpInfo.initialPenetration = oldDepth;
				collPts.push(cpInfo);
			}
		}
		if (collPts.length > 0){
			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = plane.get_normal();
			collInfo.pointInfo = collPts;

			var mat = new MaterialProperties();
			mat.set_restitution(Math.sqrt(box.get_material().get_restitution() * plane.get_material().get_restitution()));
			mat.set_friction(Math.sqrt(box.get_material().get_friction() * plane.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);
			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectBoxPlane=CollDetectBoxPlane;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JTerrain=jigLib.JTerrain;
	var JBox=jigLib.JBox;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectBoxTerrain
	 * @class CollDetectBoxTerrain handles collisions between boxes and terrain
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires Vector3DUtil
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectBoxTerrain=function(){
		this.name = "BoxTerrain";
		this.type0 = "BOX";
		this.type1 = "TERRAIN";
	};
	jigLib.extend(CollDetectBoxTerrain,jigLib.CollDetectFunctor);
	
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectBoxTerrain.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.type == "TERRAIN"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}
						
		var box = info.body0;
		var terrain = info.body1;
						
		var oldPts = box.getCornerPoints(box.oldState);
		var newPts = box.getCornerPoints(box.currentState);
		var collNormal = [0,0,0,0];
						
		var obj;
		var dist;
		var newPt;
		var oldPt;
						
		var collPts = [];
		var cpInfo;
						
		for (var i = 0; i < 8; i++ ) {
			newPt = newPts[i];
			obj = terrain.getHeightAndNormalByPoint(newPt);
								
			if (obj.height < JConfig.collToll) {
				oldPt = oldPts[i];
				dist = terrain.getHeightByPoint(oldPt);
				collNormal = Vector3DUtil.add(collNormal, obj.normal);
				cpInfo = new CollPointInfo();
				cpInfo.r0 = Vector3DUtil.subtract(oldPt, box.oldState.position);
				cpInfo.r1 = Vector3DUtil.subtract(oldPt, terrain.oldState.position);
				cpInfo.initialPenetration = -dist;
				collPts.push(cpInfo);
			}
		}
						
		if (collPts.length > 0) {
			Vector3DUtil.normalize(collNormal);
			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = collNormal;
			collInfo.pointInfo = collPts;
			var mat = new MaterialProperties();
			mat.restitution = Math.sqrt(box.material.restitution * terrain.material.restitution);
			mat.friction = Math.sqrt(box.material.friction * terrain.material.friction);
			collInfo.mat = mat;
			collArr.push(collInfo);
			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		};
	};
	
	jigLib.CollDetectBoxTerrain=CollDetectBoxTerrain;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JCapsule=jigLib.JCapsule;
	var JSegment=jigLib.JSegment;
	var JBox=jigLib.JBox;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectCapsuleBox
	 * @class CollDetectCapsuleBox handles collisions between capsules and boxes
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JSegment
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectCapsuleBox=function(){
		this.name = "CapsuleBox";
		this.type0 = "CAPSULE";
		this.type1 = "BOX";
	};
	jigLib.extend(CollDetectCapsuleBox,jigLib.CollDetectFunctor);

	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectCapsuleBox.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.get_type() == "BOX"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}

		var capsule = info.body0;
		var box = info.body1;

		if (!capsule.hitTestObject3D(box)){
			return;
		}
		if (JConfig.aabbDetection && !capsule.get_boundingBox().overlapTest(box.get_boundingBox())) {
			return;
		}

		var collPts = [];
		var cpInfo;

		var averageNormal = [0,0,0,0];
		var oldSeg = new JSegment(capsule.getEndPos(capsule.get_oldState()), JNumber3D.getScaleVector(capsule.get_oldState().getOrientationCols()[1], -Vector3DUtil.get_length(capsule)));
		var newSeg = new JSegment(capsule.getEndPos(capsule.get_currentState()), JNumber3D.getScaleVector(capsule.get_currentState().getOrientationCols()[1], -Vector3DUtil.get_length(capsule)));
		var radius = capsule.get_radius();

		var oldObj = {};
		var oldDistSq= oldSeg.segmentBoxDistanceSq(oldObj, box, box.get_oldState());
		var newObj = {};
		var newDistSq = newSeg.segmentBoxDistanceSq(newObj, box, box.get_currentState());
		var arr = box.get_oldState().getOrientationCols();

		if (Math.min(oldDistSq, newDistSq) < Math.pow(radius + JConfig.collToll, 2)){
			var segPos = oldSeg.getPoint(Number(oldObj.pfLParam));
			var boxPos = box.get_oldState().position.slice(0);
			boxPos = Vector3DUtil.add(boxPos, JNumber3D.getScaleVector(arr[0], oldObj.pfLParam0));
			boxPos = Vector3DUtil.add(boxPos, JNumber3D.getScaleVector(arr[1], oldObj.pfLParam1));
			boxPos = Vector3DUtil.add(boxPos, JNumber3D.getScaleVector(arr[2], oldObj.pfLParam2));

			var dist = Math.sqrt(oldDistSq);
			var depth = radius - dist;

			var dir;
			if (dist > JNumber3D.NUM_TINY){
				dir = Vector3DUtil.subtract(segPos, boxPos);
				Vector3DUtil.normalize(dir);
			}else if (Vector3DUtil.get_length(Vector3DUtil.subtract(segPos, box.get_oldState().position)) > JNumber3D.NUM_TINY){
				dir = Vector3DUtil.subtract(segPos, box.get_oldState().position);
				Vector3DUtil.normalize(dir);
			}else{
				dir = Vector3DUtil.Y_AXIS;
				JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(0, 0, 1, 360 * Math.random()), dir);
			}
			averageNormal = Vector3DUtil.add(averageNormal, dir);

			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(boxPos, capsule.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(boxPos, box.get_oldState().position);
			cpInfo.initialPenetration = depth;
			collPts.push(cpInfo);
		}


		oldSeg = new JSegment(capsule.getBottomPos(capsule.get_oldState()), JNumber3D.getScaleVector(capsule.get_oldState().getOrientationCols()[1], Vector3DUtil.get_length(capsule)));
		newSeg = new JSegment(capsule.getBottomPos(capsule.get_currentState()), JNumber3D.getScaleVector(capsule.get_currentState().getOrientationCols()[1], Vector3DUtil.get_length(capsule)));

		oldObj = {};
		oldDistSq = oldSeg.segmentBoxDistanceSq(oldObj, box, box.get_oldState());
		newObj = {};
		newDistSq = newSeg.segmentBoxDistanceSq(newObj, box, box.get_currentState());

		if (Math.min(oldDistSq, newDistSq) < Math.pow(radius + JConfig.collToll, 2)){
			segPos = oldSeg.getPoint(Number(oldObj.pfLParam));
			boxPos = box.get_oldState().position.slice(0);
			boxPos = Vector3DUtil.add(boxPos, JNumber3D.getScaleVector(arr[0], oldObj.pfLParam0));
			boxPos = Vector3DUtil.add(boxPos, JNumber3D.getScaleVector(arr[1], oldObj.pfLParam1));
			boxPos = Vector3DUtil.add(boxPos, JNumber3D.getScaleVector(arr[2], oldObj.pfLParam2));

			dist = Math.sqrt(oldDistSq);
			depth = radius - dist;

			if (dist > JNumber3D.NUM_TINY){
				dir = Vector3DUtil.subtract(segPos, boxPos);
				Vector3DUtil.normalize(dir);
			}else if (Vector3DUtil.get_length(Vector3DUtil.subtract(segPos, box.get_oldState().position)) > JNumber3D.NUM_TINY){
				dir = Vector3DUtil.subtract(segPos, box.get_oldState().position);
				Vector3DUtil.normalize(dir);
			}else{
				dir = Vector3DUtil.Y_AXIS;
				JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(0, 0, 1, 360 * Math.random()), dir);
			}
			averageNormal = Vector3DUtil.add(averageNormal, dir);

			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(boxPos, capsule.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(boxPos, box.get_oldState().position);
			cpInfo.initialPenetration = depth;
			collPts.push(cpInfo);
		}

		if (collPts.length > 0){
			averageNormal.normalize();
			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = averageNormal;
			collInfo.pointInfo = collPts;

			var mat = new MaterialProperties();
			mat.set_restitution(Math.sqrt(capsule.get_material().get_restitution() * box.get_material().get_restitution()));
			mat.set_friction(Math.sqrt(capsule.get_material().get_friction() * box.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);

			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectCapsuleBox=CollDetectCapsuleBox;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JCapsule=jigLib.JCapsule;
	var JSegment=jigLib.JSegment;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectCapsuleCapsule
	 * @class CollDetectCapsuleCapsule handles collisions between capsules
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JMatrix3D
	 * @requires JSegment
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectCapsuleCapsule=function(){
		this.name = "CapsuleCapsule";
		this.type0 = "CAPSULE";
		this.type1 = "CAPSULE";
	};
	jigLib.extend(CollDetectCapsuleCapsule,jigLib.CollDetectFunctor);

	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectCapsuleCapsule.prototype.collDetect=function(info, collArr){
		var capsule0 = info.body0;
		var capsule1 = info.body1;

		if (!capsule0.hitTestObject3D(capsule1)) {
			return;
		}
						
		if (JConfig.aabbDetection && !capsule0.get_boundingBox().overlapTest(capsule1.get_boundingBox())) {
			return;
		}

		var collPts = [];
		var cpInfo;

		var averageNormal = [0,0,0,0];
		var oldSeg0= new JSegment(capsule0.getEndPos(capsule0.get_oldState()), JNumber3D.getScaleVector(capsule0.get_oldState().getOrientationCols()[1], -Vector3DUtil.get_length(capsule0)));
		var newSeg0= new JSegment(capsule0.getEndPos(capsule0.get_currentState()), JNumber3D.getScaleVector(capsule0.get_currentState().getOrientationCols()[1], -Vector3DUtil.get_length(capsule0)));
		var oldSeg1= new JSegment(capsule1.getEndPos(capsule1.get_oldState()), JNumber3D.getScaleVector(capsule1.get_oldState().getOrientationCols()[1], -Vector3DUtil.get_length(capsule1)));
		var newSeg1 = new JSegment(capsule1.getEndPos(capsule1.get_currentState()), JNumber3D.getScaleVector(capsule1.get_currentState().getOrientationCols()[1], -Vector3DUtil.get_length(capsule1)));

		var radSum = capsule0.get_radius() + capsule1.get_radius();

		var oldObj = {};
		var oldDistSq = oldSeg0.segmentSegmentDistanceSq(oldObj, oldSeg1);
		var newObj = {};
		var newDistSq = newSeg0.segmentSegmentDistanceSq(oldObj, newSeg1);

		if (Math.min(oldDistSq, newDistSq) < Math.pow(radSum + JConfig.collToll, 2)){
			var pos0 = oldSeg0.getPoint(oldObj.t0);
			var pos1 = oldSeg1.getPoint(oldObj.t1);

			var delta = Vector3DUtil.subtract(pos0, pos1);
			var dist = Math.sqrt(oldDistSq);
			var depth = radSum - dist;

			if (dist > JNumber3D.NUM_TINY){
				delta = JNumber3D.getDivideVector(delta, dist);
			}else{
				delta = Vector3DUtil.Y_AXIS;
				JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(0, 0, 1, 360 * Math.random()), delta);
			}

			var worldPos = Vector3DUtil.add(pos1, JNumber3D.getScaleVector(delta, capsule1.get_radius() - 0.5 * depth));
			averageNormal = Vector3DUtil.add(averageNormal, delta);

			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, capsule0.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, capsule1.get_oldState().position);
			cpInfo.initialPenetration = depth;
			collPts.push(cpInfo);
		}

		oldSeg0 = new JSegment(capsule0.getBottomPos(capsule0.get_oldState()), JNumber3D.getScaleVector(capsule0.get_oldState().getOrientationCols()[1], Vector3DUtil.get_length(capsule0)));
		newSeg0 = new JSegment(capsule0.getBottomPos(capsule0.get_currentState()), JNumber3D.getScaleVector(capsule0.get_currentState().getOrientationCols()[1], Vector3DUtil.get_length(capsule0)));
		oldSeg1 = new JSegment(capsule1.getBottomPos(capsule1.get_oldState()), JNumber3D.getScaleVector(capsule1.get_oldState().getOrientationCols()[1], Vector3DUtil.get_length(capsule1)));
		newSeg1 = new JSegment(capsule1.getBottomPos(capsule1.get_currentState()), JNumber3D.getScaleVector(capsule1.get_currentState().getOrientationCols()[1], Vector3DUtil.get_length(capsule1)));

		oldObj = {};
		oldDistSq = oldSeg0.segmentSegmentDistanceSq(oldObj, oldSeg1);
		newObj = {};
		newDistSq = newSeg0.segmentSegmentDistanceSq(oldObj, newSeg1);

		if (Math.min(oldDistSq, newDistSq) < Math.pow(radSum + JConfig.collToll, 2)){
			pos0 = oldSeg0.getPoint(oldObj.t0);
			pos1 = oldSeg1.getPoint(oldObj.t1);

			delta = Vector3DUtil.subtract(pos0, pos1);
			dist = Math.sqrt(oldDistSq);
			depth = radSum - dist;

			if (dist > JNumber3D.NUM_TINY){
				delta = JNumber3D.getDivideVector(delta, dist);
			}else{
				delta = Vector3DUtil.Y_AXIS;
				JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(0, 0, 1, 360 * Math.random()), delta);
			}

			worldPos = Vector3DUtil.add(pos1, JNumber3D.getScaleVector(delta, capsule1.get_radius() - 0.5 * depth));
			averageNormal = Vector3DUtil.add(averageNormal, delta);

			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, capsule0.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, capsule1.get_oldState().position);
			cpInfo.initialPenetration = depth;
			collPts.push(cpInfo);

		}

		if (collPts.length > 0){
			Vector3DUtil.normalize(averageNormal);
			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = averageNormal;
			collInfo.pointInfo = collPts;

			var mat = new MaterialProperties();
			mat.set_restitution(Math.sqrt(capsule0.get_material().get_restitution() * capsule1.get_material().get_restitution()));
			mat.set_friction(Math.sqrt(capsule0.get_material().get_friction() * capsule1.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);

			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectCapsuleCapsule=CollDetectCapsuleCapsule;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JCapsule=jigLib.JCapsule;
	var JTerrain=jigLib.JPlane;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectCapsulePlane
	 * @class CollDetectCapsulePlane handles collisions between capsules and planes
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectCapsulePlane=function(){
		this.name = "CapsulePlane";
		this.type0 = "CAPSULE";
		this.type1 = "PLANE";
	};
	jigLib.extend(CollDetectCapsulePlane,jigLib.CollDetectFunctor);
	
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectCapsulePlane.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.get_type() == "PLANE"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}

		var capsule = info.body0;
		var plane = info.body1;

		var collPts = [];
		var cpInfo;

		var oldPos = capsule.getBottomPos(capsule.get_oldState());
		var oldDist = plane.pointPlaneDistance(oldPos);
		var newPos = capsule.getBottomPos(capsule.get_currentState());
		var newDist = plane.pointPlaneDistance(newPos);

		if (Math.min(oldDist, newDist) < capsule.get_radius() + JConfig.collToll){
			var oldDepth= capsule.get_radius() - oldDist;
			var worldPos= Vector3DUtil.subtract(oldPos, JNumber3D.getScaleVector(plane.get_normal(), capsule.get_radius()));

			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, capsule.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, plane.get_oldState().position);
			cpInfo.initialPenetration = oldDepth;
			collPts.push(cpInfo);
		}

		oldPos = capsule.getEndPos(capsule.get_oldState());
		newPos = capsule.getEndPos(capsule.get_currentState());
		oldDist = plane.pointPlaneDistance(oldPos);
		newDist = plane.pointPlaneDistance(newPos);
		if (Math.min(oldDist, newDist) < capsule.get_radius() + JConfig.collToll){
			oldDepth = capsule.get_radius() - oldDist;
			worldPos = Vector3DUtil.subtract(oldPos, JNumber3D.getScaleVector(plane.get_normal(), capsule.get_radius()));

			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, capsule.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, plane.get_oldState().position);
			cpInfo.initialPenetration = oldDepth;
			collPts.push(cpInfo);
		}

		if (collPts.length > 0){
			var collInfo= new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = plane.get_normal();
			collInfo.pointInfo = collPts;

			var mat = new MaterialProperties();
			mat.set_restitution(Math.sqrt(capsule.get_material().get_restitution() * plane.get_material().get_restitution()));
			mat.set_friction(Math.sqrt(capsule.get_material().get_friction() * plane.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);

			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectCapsulePlane=CollDetectCapsulePlane;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JCapsule=jigLib.JCapsule;
	var JTerrain=jigLib.JTerrain;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectCapsuleTerrain
	 * @class CollDetectCapsuleTerrain handles collisions between capsules and terrain
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires CollisionInfo
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectCapsuleTerrain=function(){
		this.name = "BoxTerrain";
		this.type0 = "CAPSULE";
		this.type1 = "TERRAIN";
	};
	jigLib.extend(CollDetectCapsuleTerrain,jigLib.CollDetectFunctor);

	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectCapsuleTerrain.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.type == "TERRAIN"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}
						
		var capsule = info.body0;
		var terrain = info.body1;
						
		var collPts = [];
		var cpInfo;
						
		var averageNormal= [0,0,0,0];
		var pos1 = capsule.getBottomPos(capsule.oldState);
		var pos2 = capsule.getBottomPos(capsule.currentState);
		var obj1= terrain.getHeightAndNormalByPoint(pos1);
		var obj2 = terrain.getHeightAndNormalByPoint(pos2);
		if (Math.min(obj1.height, obj2.height) < JConfig.collToll + capsule.radius) {
			var oldDepth = capsule.radius - obj1.height;
			var worldPos = Vector3DUtil.subtract(pos1, JNumber3D.getScaleVector(obj2.normal, capsule.radius));
			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, capsule.oldState.position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, terrain.oldState.position);
			cpInfo.initialPenetration = oldDepth;
			collPts.push(cpInfo);
			averageNormal = Vector3DUtil.add(averageNormal, obj2.normal);
		}
						
		pos1 = capsule.getEndPos(capsule.oldState);
		pos2 = capsule.getEndPos(capsule.currentState);
		obj1 = terrain.getHeightAndNormalByPoint(pos1);
		obj2 = terrain.getHeightAndNormalByPoint(pos2);
		if (Math.min(obj1.height, obj2.height) < JConfig.collToll + capsule.radius) {
			oldDepth = capsule.radius - obj1.height;
			worldPos = Vector3DUtil.subtract(pos1, JNumber3D.getScaleVector(obj2.normal, capsule.radius));
			cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, capsule.oldState.position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, terrain.oldState.position);
			cpInfo.initialPenetration = oldDepth;
			collPts.push(cpInfo);
			averageNormal = Vector3DUtil.add(averageNormal, obj2.normal);
		}
						
		if (collPts.length > 0){
			Vector3DUtil.normalize(averageNormal);
			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = averageNormal;
			collInfo.pointInfo = collPts;

			var mat = new MaterialProperties();
			mat.restitution = Math.sqrt(capsule.material.restitution * terrain.material.restitution);
			mat.friction = Math.sqrt(capsule.material.friction * terrain.material.friction);
			collInfo.mat = mat;
			collArr.push(collInfo);

			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectCapsuleTerrain=CollDetectCapsuleTerrain;
	
})(jigLib);/*
Copyright (c) 2007 Danny Chapman 
http://www.rowlhouse.co.uk

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.
Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:
1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.
3. This notice may not be removed or altered from any source
distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConfig=jigLib.JConfig;
	var MaterialProperties=jigLib.MaterialProperties;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectSphereBox
	 * @class CollDetectSphereBox handles collisions between spheres and boxes
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires CollisionInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JConfig
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectSphereBox=function(){
		this.name = "SphereBox";
		this.type0 = "SPHERE";
		this.type1 = "BOX";
	};
	jigLib.extend(CollDetectSphereBox,jigLib.CollDetectFunctor);
	
				
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectSphereBox.prototype.collDetect=function(info, collArr){
		var tempBody;
		if(info.body0.get_type()=="BOX") {
			tempBody=info.body0;
			info.body0=info.body1;
			info.body1=tempBody;
		}
						
		var sphere = info.body0;
		var box = info.body1;		
		if (!sphere.hitTestObject3D(box)) 
			return;

		if (JConfig.aabbDetection && !sphere.get_boundingBox().overlapTest(box.get_boundingBox())) 
			return;
		
		//var spherePos:Vector3D = sphere.get_oldState().position;
		//var boxPos:Vector3D = box.get_oldState().position;

		var oldBoxPoint={};
		var newBoxPoint={};
						
		var oldDist = box.getDistanceToPoint(box.get_oldState(), oldBoxPoint, sphere.get_oldState().position);
		var newDist = box.getDistanceToPoint(box.get_currentState(), newBoxPoint, sphere.get_currentState().position);
						
		var oldDepth = sphere.get_radius() - oldDist;
		var newDepth = sphere.get_radius() - newDist;
		if (Math.max(oldDepth, newDepth) > -JConfig.collToll) {
			var dir;
			var collPts = [];
			if (oldDist < -JNumber3D.NUM_TINY) {
				dir = Vector3DUtil.subtract(Vector3DUtil.subtract(oldBoxPoint.pos, 
																  sphere.get_oldState().position), 
											oldBoxPoint.pos);
				Vector3DUtil.normalize(dir);
			}else if (oldDist > JNumber3D.NUM_TINY) {
				dir = Vector3DUtil.subtract(sphere.get_oldState().position, oldBoxPoint.pos);
				Vector3DUtil.normalize(dir);
			}else{
				dir = Vector3DUtil.subtract(sphere.get_oldState().position, box.get_oldState().position);
				Vector3DUtil.normalize(dir);
			}
								
			var cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(oldBoxPoint.pos, sphere.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(oldBoxPoint.pos, box.get_oldState().position);
			cpInfo.initialPenetration = oldDepth;
			collPts.push(cpInfo);
								
			var collInfo=new CollisionInfo();
			collInfo.objInfo=info;
			collInfo.dirToBody = dir;
			collInfo.pointInfo = collPts;
								
			var mat = new MaterialProperties();
			mat.set_restitution(Math.sqrt(sphere.get_material().get_restitution() * box.get_material().get_restitution()));
			mat.set_friction(Math.sqrt(sphere.get_material().get_friction() * box.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);
								
			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectSphereBox=CollDetectSphereBox;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JSphere=jigLib.JSphere;
	var JSegment=jigLib.JSegment;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectSphereCapsule
	 * @class CollDetectSphereCapsule handles collisions between spheres and capsules
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires CollisionInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JMatrix3D
	 * @requires JSegment
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectSphereCapsule=function(){
		this.name = "SphereCapsule";
		this.type0 = "SPHERE";
		this.type1 = "CAPSULE";
	};
	jigLib.extend(CollDetectSphereCapsule,jigLib.CollDetectFunctor);
	
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectSphereCapsule.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.get_type() == "CAPSULE"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}

		var sphere = info.body0;
		var capsule= info.body1;

		if (!sphere.hitTestObject3D(capsule)){
			return;
		}
						
		if (JConfig.aabbDetection && !sphere.get_boundingBox().overlapTest(capsule.get_boundingBox())) {
			return;
		}

		var oldSeg = new JSegment(capsule.getBottomPos(capsule.get_oldState()), JNumber3D.getScaleVector(capsule.get_oldState().getOrientationCols()[1], Vector3DUtil.get_length(capsule) + 2 * capsule.get_radius()));
		var newSeg = new JSegment(capsule.getBottomPos(capsule.get_currentState()), JNumber3D.getScaleVector(capsule.get_currentState().getOrientationCols()[1], Vector3DUtil.get_length(capsule) + 2 * capsule.get_radius()));
		var radSum = sphere.get_radius() + capsule.get_radius();

		var oldObj = {};
		var oldDistSq = oldSeg.pointSegmentDistanceSq(oldObj, sphere.get_oldState().position);
		var newObj = {};
		var newDistSq = newSeg.pointSegmentDistanceSq(newObj, sphere.get_currentState().position);

		if (Math.min(oldDistSq, newDistSq) < Math.pow(radSum + JConfig.collToll, 2)){
			var segPos = oldSeg.getPoint(oldObj.t);
			var delta = Vector3DUtil.subtract(sphere.get_oldState().position, segPos);

			var dist = Math.sqrt(oldDistSq);
			var depth = radSum - dist;

			if (dist > JNumber3D.NUM_TINY){
				delta = JNumber3D.getDivideVector(delta, dist);
			}else{
				delta = Vector3DUtil.Y_AXIS;
				JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(0, 0, 1, 360 * Math.random()), delta);
			}

			var worldPos = Vector3DUtil.add(segPos, JNumber3D.getScaleVector(delta, capsule.get_radius() - 0.5 * depth));

			var collPts = [];
			var cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, sphere.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, capsule.get_oldState().position);
			cpInfo.initialPenetration = depth;
			collPts.push(cpInfo);

			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = delta;
			collInfo.pointInfo = collPts;

			var mat = new MaterialProperties();
			mat.set_restitution(Math.sqrt(sphere.get_material().get_restitution() * capsule.get_material().get_restitution()));
			mat.set_friction(Math.sqrt(sphere.get_material().get_friction() * capsule.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);

			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectSphereCapsule=CollDetectSphereCapsule;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JSphere=jigLib.JSphere;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;
	 
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectSpherePlane
	 * @class CollDetectSpherePlane handles collisions between spheres and planes
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollisionInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectSpherePlane=function(){
		this.name = "SpherePlane";
		this.type0 = "SPHERE";
		this.type1 = "PLANE";
	};
	jigLib.extend(CollDetectSpherePlane,jigLib.CollDetectFunctor);
	
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectSpherePlane.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.get_type() == "PLANE"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}

		var sphere = info.body0;
		var plane = info.body1;
		var oldDist = plane.pointPlaneDistance(sphere.get_oldState().position);
		var newDist = plane.pointPlaneDistance(sphere.get_currentState().position);

		if (Math.min(newDist, oldDist) > sphere.get_boundingSphere() + JConfig.collToll){
			return;
		}
		
		var collPts = [];
		var cpInfo;
		var depth = sphere.get_radius() - oldDist;

		var worldPos = Vector3DUtil.subtract(sphere.get_oldState().position, JNumber3D.getScaleVector(plane.get_normal(), sphere.get_radius()));
		cpInfo = new CollPointInfo();
		cpInfo.r0 = Vector3DUtil.subtract(worldPos, sphere.get_oldState().position);
		cpInfo.r1 = Vector3DUtil.subtract(worldPos, plane.get_oldState().position);
		cpInfo.initialPenetration = depth;
		collPts.push(cpInfo);

		var collInfo = new CollisionInfo();
		collInfo.objInfo = info;
		collInfo.dirToBody = plane.get_normal();
		collInfo.pointInfo = collPts;
		var mat = new MaterialProperties();
		mat.set_restitution(Math.sqrt(sphere.get_material().get_restitution() * plane.get_material().get_restitution()));
		mat.set_friction(Math.sqrt(sphere.get_material().get_friction() * plane.get_material().get_friction()));
		collInfo.mat = mat;
		collArr.push(collInfo);
		info.body0.collisions.push(collInfo);
		info.body1.collisions.push(collInfo);
	};
	
	jigLib.CollDetectSpherePlane=CollDetectSpherePlane;
	 
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JSphere=jigLib.JSphere;	var MaterialProperties=jigLib.MaterialProperties;	var CollPointInfo=jigLib.CollPointInfo;	var CollisionInfo=jigLib.CollisionInfo;
	 
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollDetectSphereSphere
	 * @class CollDetectSphereSphere handles collisions between spheres 
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires CollisionInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JMatrix3D
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectSphereSphere=function(){
		this.name = "SphereSphere";
		this.type0 = "SPHERE";
		this.type1 = "SPHERE";
	};
	jigLib.extend(CollDetectSphereSphere,jigLib.CollDetectFunctor);
	
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectSphereSphere.prototype.collDetect=function(info, collArr){
		var sphere0 = info.body0;
		var sphere1 = info.body1;
		var oldDelta = Vector3DUtil.subtract(sphere0.get_oldState().position, sphere1.get_oldState().position);
		var newDelta = Vector3DUtil.subtract(sphere0.get_currentState().position, sphere1.get_currentState().position);

		var oldDistSq = Vector3DUtil.get_lengthSquared(oldDelta);
		var newDistSq = Vector3DUtil.get_lengthSquared(newDelta);
		var radSum = sphere0.get_radius() + sphere1.get_radius();

		if (Math.min(oldDistSq, newDistSq) < Math.pow(radSum + JConfig.collToll, 2)){
			var oldDist = Math.sqrt(oldDistSq);
			var depth = radSum - oldDist;
			if (oldDist > JNumber3D.NUM_TINY){
				oldDelta = JNumber3D.getDivideVector(oldDelta, oldDist);
			}else{
				oldDelta = Vector3DUtil.Y_AXIS;
				JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(0, 0, 1, 360 * Math.random()), oldDelta);
			}

			var worldPos = Vector3DUtil.add(sphere1.get_oldState().position, JNumber3D.getScaleVector(oldDelta, sphere1.get_radius() - 0.5 * depth));

			var collPts = [];
			var cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(worldPos, sphere0.get_oldState().position);
			cpInfo.r1 = Vector3DUtil.subtract(worldPos, sphere1.get_oldState().position);
			cpInfo.initialPenetration = depth;
			collPts.push(cpInfo);

			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = oldDelta;
			collInfo.pointInfo = collPts;

			var mat = new MaterialProperties();
			mat.set_restitution(Math.sqrt(sphere0.get_material().get_restitution() * sphere1.get_material().get_restitution()));
			mat.set_friction(Math.sqrt(sphere0.get_material().get_friction() * sphere1.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);

			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	
	jigLib.CollDetectSphereSphere=CollDetectSphereSphere;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JSphere=jigLib.JSphere;
	var JTerrain=jigLib.JTerrain;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 *
	 * @name CollDetectSphereTerrain
	 * @class CollDetectSphereTerrain handles collisions between spheres and terrain
	 * @extends CollDetectFunctor
	 * @requires CollDetectInfo
	 * @requires CollPointInfo
	 * @requires CollisionInfo
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires MaterialProperties
	 * @constructor
	 **/
	var CollDetectSphereTerrain=function(){ 
		this.name = "SphereTerrain";
		this.type0 = "SPHERE";
		this.type1 = "TERRAIN";
	};
	jigLib.extend(CollDetectSphereTerrain,jigLib.CollDetectFunctor);
	
	/**
	 * @function collDetect detects a collision and updates the info parameter
	 * @param {CollDetectInfo} info
	 * @param {array} collArray
	 * @type void
	 **/
	CollDetectSphereTerrain.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.type == "TERRAIN"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}

		var sphere = info.body0;
		var terrain = info.body1;
						
		var obj = terrain.getHeightAndNormalByPoint(sphere.currentState.position);
		if (obj.height < JConfig.collToll + sphere.radius) {
			var dist = terrain.getHeightByPoint(sphere.oldState.position);
			var depth = sphere.radius - dist;
								
			var Pt = Vector3DUtil.subtract(sphere.oldState.position, JNumber3D.getScaleVector(obj.normal, sphere.radius));
								
			var collPts = [];
			var cpInfo = new CollPointInfo();
			cpInfo.r0 = Vector3DUtil.subtract(Pt, sphere.oldState.position);
			cpInfo.r1 = Vector3DUtil.subtract(Pt, terrain.oldState.position);
			cpInfo.initialPenetration = depth;
			collPts.push(cpInfo);
								
			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = obj.normal;
			collInfo.pointInfo = collPts;
			var mat = new MaterialProperties();
			mat.restitution = Math.sqrt(sphere.material.restitution * terrain.material.restitution);
			mat.friction = Math.sqrt(sphere.material.friction * terrain.material.friction);
			collInfo.mat = mat;
			collArr.push(collInfo);
			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
		}
	};
	jigLib.CollDetectSphereTerrain=CollDetectSphereTerrain;
})(jigLib);(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraint=jigLib.JConstraint;
	var JConfig=jigLib.JConfig;
	var JSphere=jigLib.JSphere;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionInfo=jigLib.CollisionInfo;
	var JBox=jigLib.JBox;
	var JIndexedTriangle=jigLib.JIndexedTriangle;
	var JSegment=jigLib.JSegment;
	var JTriangle=jigLib.JTriangle;
	var JTriangleMesh=jigLib.JTriangleMesh;
	var CollOutData=jigLib.CollOutData;
	var EdgeData=jigLib.EdgeData;
	var SpanData=jigLib.SpanDatadot
	;
	var SpanData=jigLib.SpanData;

	var CollDetectBoxMesh=function(){
		this.name = "BoxMesh";
		this.type0 = "BOX";
		this.type1 = "TRIANGLEMESH";
	};
	jigLib.extend(CollDetectBoxMesh,jigLib.CollDetectFunctor);
        
	CollDetectBoxMesh.prototype.disjoint=function(out, axis, box, triangle){
		var obj0 = box.getSpan(axis);
		var obj1 = triangle.getSpan(axis);
		var obj0Min=obj0.min,obj0Max=obj0.max,obj1Min=obj1.min,obj1Max=obj1.max,tiny=JNumber3D.NUM_TINY;
		
		
		if (obj0Min > (obj1Max + JConfig.collToll + tiny) || obj1Min > (obj0Max + JConfig.collToll + tiny)){
			out.flag = true;
			return true;
		}
		if ((obj0Max > obj1Max) && (obj1Min > obj0Min)){
			out.depth = Math.min(obj0Max - obj1Min, obj1Max - obj0Min);
		}else if ((obj1Max > obj0Max) && (obj0Min > obj1Min)){
			out.depth = Math.min(obj1Max - obj0Min, obj0Max - obj1Min);
		}else{
			out.depth = Math.min(obj0Max, obj1Max);
			out.depth -= Math.max(obj0Min, obj1Min);
		}
		out.flag = false;
		return false;
	};
	
                
	CollDetectBoxMesh.prototype.addPoint=function(contactPoints, pt, combinationDistanceSq){
		for(var i=0; i<contactPoints.length;i++){
			var contactPoint=contactPoints[i];
			if (Vector3DUtil.get_lengthSquared(Vector3DUtil.subtract(contactPoint,pt))< combinationDistanceSq){
				contactPoint = Vector3DUtil.add(contactPoint,pt);
				Vector3DUtil.scaleBy(contactPoint,0.5);
				return false;
			}
		}
		contactPoints.push(pt);
		return true;
	};
	
	
	CollDetectBoxMesh.prototype.getBoxTriangleIntersectionPoints=function(pts,box,triangle,combinationDistanceSq){
		var edges=box.get_edges();
		var boxPts=box.getCornerPoints(box.get_currentState());
                        
		var data;
		var edge;
		var seg;
		for(var i=0;i<12;i++){
			edge=edges[i];
			data=new CollOutData();
			seg=new JSegment(boxPts[edge.ind0],Vector3DUtil.subtract(boxPts[edge.ind1],boxPts[edge.ind0]));
			if(triangle.segmentTriangleIntersection(data,seg)){
				this.addPoint(pts,seg.getPoint(data.frac),combinationDistanceSq);
				if(pts.length>8) return pts.length;
			}
		}
                        
		var pt0,pt1;
		for(i=0;i<3;i++){
			pt0=triangle.getVertex(i);
			pt1=triangle.getVertex((i+1)%3);
			data=new CollOutData();
			if(box.segmentIntersect(data,new JSegment(pt0,Vector3DUtil.subtract(pt1,pt0)),box.get_currentState())){
				this.addPoint(pts,data.position,combinationDistanceSq);
				if(pts.length>8) return pts.length;
			}
			if(box.segmentIntersect(data,new JSegment(pt1,Vector3DUtil.subtract(pt0,pt1)),box.get_currentState())){
				this.addPoint(pts,data.position,combinationDistanceSq);
				if(pts.length>8) return pts.length;
			}
		}
		return pts.length;
	};
	
	
                
	CollDetectBoxMesh.prototype.doOverlapBoxTriangleTest=function(box,triangle,mesh,info,collArr){
                        
		var triEdge0,triEdge1,triEdge2,triNormal,D,N,boxOldPos,boxNewPos,meshPos,delta;
		var dirs0=box.get_currentState().getOrientationCols();
		var tri=new JTriangle(mesh.get_octree().getVertex(triangle.getVertexIndex(0)),mesh.get_octree().getVertex(triangle.getVertexIndex(1)),mesh.get_octree().getVertex(triangle.getVertexIndex(2)));
		triEdge0=Vector3DUtil.subtract(tri.getVertex(1),tri.getVertex(0));
		Vector3DUtil.normalize(triEdge0);
		triEdge1=Vector3DUtil.subtract(tri.getVertex(2),tri.getVertex(1));
		Vector3DUtil.normalize(triEdge1);
		triEdge2=Vector3DUtil.subtract(tri.getVertex(0),tri.getVertex(2));
		Vector3DUtil.normalize(triEdge2);
		var triNormal=triangle.get_plane().normal.slice(0);
                        
		var numAxes=13;
		var axes = [triNormal,dirs0[0],dirs0[1],dirs0[2],
					Vector3DUtil.crossProduct(dirs0[0],triEdge0),
					Vector3DUtil.crossProduct(dirs0[0],triEdge1),
					Vector3DUtil.crossProduct(dirs0[0],triEdge2),
					Vector3DUtil.crossProduct(dirs0[1],triEdge0),
					Vector3DUtil.crossProduct(dirs0[1],triEdge1),
					Vector3DUtil.crossProduct(dirs0[1],triEdge2),
					Vector3DUtil.crossProduct(dirs0[2],triEdge0),
					Vector3DUtil.crossProduct(dirs0[2],triEdge1),
					Vector3DUtil.crossProduct(dirs0[2],triEdge2)];
                        
		var overlapDepths=[];
		for(var i=0;i<numAxes;i++){
			overlapDepths[i]=new SpanData();
			if(this.disjoint(overlapDepths[i],axes[i],box,tri)){
				return false;
			}
		}
                        
		var minAxis=-1;
		var tiny=JNumber3D.NUM_TINY,minDepth=JNumber3D.NUM_HUGE,l2,invl,depth,combinationDist,oldDepth;

		for(i = 0; i < numAxes; i++){
			l2=Vector3DUtil.get_lengthSquared(axes[i]);
			if (l2 < tiny){
				continue;
			}
                                
			invl=1/Math.sqrt(l2);
			Vector3DUtil.scaleBy(axes[i],invl);
			overlapDepths[i].depth*=invl;
                                
			if (overlapDepths[i].depth < minDepth){
				minDepth = overlapDepths[i].depth;
				minAxis=i;
			}
		}
                        
		if (minAxis == -1) return false;
                        
		D=Vector3DUtil.subtract(box.get_currentState().position,tri.getCentre());
		N=axes[minAxis];
		depth=overlapDepths[minAxis].depth;
                        
		if(Vector3DUtil.dotProduct(D,N)<0){
			Vector3DUtil.negate(N);
		}
                        
		boxOldPos=box.get_oldState().position;
		boxNewPos=box.get_currentState().position;
		meshPos=mesh.get_currentState().position;
                        
		var pts=[];
		combinationDist=depth+0.05;
		this.getBoxTriangleIntersectionPoints(pts,box,tri,combinationDist*combinationDist);
                        
		delta=Vector3DUtil.subtract(boxNewPos,boxOldPos);
		oldDepth=depth+Vector3DUtil.dotProduct(delta,N);

		var numPts=pts.length;
		var collPts = [];
		if(numPts>0){
			var cpInfo;
			for (i=0; i<numPts; i++){
				cpInfo = new CollPointInfo();
				cpInfo.r0=Vector3DUtil.subtract(pts[i],boxNewPos);
				cpInfo.r1=Vector3DUtil.subtract(pts[i],meshPos);
				cpInfo.initialPenetration=oldDepth;
				collPts[i]=cpInfo;
			}
                                
			var collInfo = new CollisionInfo();
			collInfo.objInfo = info;
			collInfo.dirToBody = N;
			collInfo.pointInfo = collPts;
			
			var mat = new MaterialProperties();
			mat.set_restitution(0.5*(box.get_material().get_restitution() + mesh.get_material().get_restitution()));
			mat.set_friction(0.5*(box.get_material().get_friction() + mesh.get_material().get_friction()));
			collInfo.mat = mat;
			collArr.push(collInfo);
			info.body0.collisions.push(collInfo);
			info.body1.collisions.push(collInfo);
                                
			return true;
		}else{
			return false;
		}
	};
	
	
	 CollDetectBoxMesh.prototype.collDetectBoxStaticMeshOverlap=function(box,mesh,info,collArr){
		var boxRadius=box.get_boundingSphere();
		var boxCentre=box.get_currentState().position;
                        
		var potentialTriangles = [];
		var numTriangles=mesh.get_octree().getTrianglesIntersectingtAABox(potentialTriangles,box.get_boundingBox());
                        
		var collision=false;
		var dist;
		var meshTriangle;
		for (var iTriangle = 0 ; iTriangle < numTriangles ; ++iTriangle) {
			meshTriangle=mesh.get_octree().getTriangle(potentialTriangles[iTriangle]);
                                
			dist=meshTriangle.get_plane().pointPlaneDistance(boxCentre);
			if (dist > boxRadius || dist < 0){
				continue;
			}
                                
			if(this.doOverlapBoxTriangleTest(box,meshTriangle,mesh,info,collArr)){
				collision = true;
			}
		}
                        
		return collision;
	};
	

	CollDetectBoxMesh.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0.type == "TRIANGLEMESH"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}
		var box = info.body0;
		var mesh = info.body1;
                        
		this.collDetectBoxStaticMeshOverlap(box,mesh,info,collArr);
	};
	
	jigLib.CollDetectBoxMesh=CollDetectBoxMesh;

})(jigLib);

                
                
                
                
(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JConfig=jigLib.JConfig;
	var JIndexedTriangle=jigLib.JIndexedTriangle;
	var JSphere=jigLib.JSphere;
	var JTriangle=jigLib.JTriangle;
	var JTriangleMesh=jigLib.JTriangleMesh;
	var JNumber3D=jigLib.JNumber3D;
	var MaterialProperties=jigLib.MaterialProperties;
	var RigidBody=jigLib.RigidBody;
	var CollPointInfo=jigLib.CollPointInfo;
	

        var CollDetectSphereMesh=function() {
		this.name = "SphereMesh";
		this.type0 = "SPHERE";
		this.type1 = "TRIANGLEMESH";
	}	
	
	jigLib.extend(CollDetectSphereMesh,jigLib.CollDetectFunctor);
	
	
	CollDetectSphereMesh.prototype.collDetectSphereStaticMeshOverlap=function(sphere, mesh, info, collTolerance, collArr){
		var body0Pos = info.body0.get_oldState().position;
		var body1Pos = info.body1.get_oldState().position;

		var sphereTolR = collTolerance + sphere.get_radius();
		var sphereTolR2 = sphereTolR * sphereTolR;
                        
		var collNormal = [0,0,0];
		var collPts = []
                        
		var potentialTriangles = [];
		var numTriangles = mesh.get_octree().getTrianglesIntersectingtAABox(potentialTriangles, sphere.get_boundingBox());
		if(!numTriangles) return;
		
		var newD2,distToCentre,oldD2,dist,depth,tiny=JNumber3D.NUM_TINY;
		var meshTriangle;
		var vertexIndices;
		var arr;
		var triangle;
		for (var iTriangle = 0 ; iTriangle < numTriangles ; ++iTriangle) {
			meshTriangle = mesh.get_octree().getTriangle(potentialTriangles[iTriangle]);
			distToCentre = meshTriangle.get_plane().pointPlaneDistance(sphere.get_currentState().position);

			if (distToCentre <= 0) continue;
			if (distToCentre >= sphereTolR) continue;
                                
			vertexIndices = meshTriangle.get_vertexIndices();
			triangle = new JTriangle(mesh.get_octree().getVertex(vertexIndices[0]), mesh.get_octree().getVertex(vertexIndices[1]), mesh.get_octree().getVertex(vertexIndices[2]));
			arr = [];
			newD2 = triangle.pointTriangleDistanceSq(arr, sphere.get_currentState().position);
                                
			if (newD2 < sphereTolR2) {
				// have overlap - but actually report the old intersection
				oldD2 = triangle.pointTriangleDistanceSq(arr, sphere.get_oldState().position);
				dist = Math.sqrt(oldD2);
				
				depth = sphere.get_radius() - dist;
				var collisionN = (dist > tiny) ? (Vector3DUtil.subtract(sphere.get_oldState().position,triangle.getPoint(arr[0], arr[1]))) : triangle.get_normal().slice(0);
				Vector3DUtil.normalize(collisionN);
				// since impulse get applied at the old position
				var pt = Vector3DUtil.subtract(sphere.get_oldState().position,JNumber3D.getScaleVector(collisionN, sphere.get_radius()));
                                        
				var cpInfo = new CollPointInfo();
				cpInfo.r0 = Vector3DUtil.subtract(pt,body0Pos);
				cpInfo.r1 = Vector3DUtil.subtract(pt,body1Pos);
				cpInfo.initialPenetration = depth;
				collPts.push(cpInfo);
				collNormal = Vector3DUtil.add(collNormal,collisionN);
				Vector3DUtil.normalize(collNormal);
			}
		}
		var collInfo = new jigLib.CollisionInfo();
		collInfo.objInfo = info;
		collInfo.dirToBody = collNormal;
		collInfo.pointInfo = collPts;
                        
		var mat = new MaterialProperties();
		mat.set_restitution(0.5*(sphere.get_material().get_restitution() + mesh.get_material().get_restitution()));
		mat.set_friction(0.5*(sphere.get_material().get_friction() + mesh.get_material().get_friction()));
		collInfo.mat = mat;
		collArr.push(collInfo);
		info.body0.collisions.push(collInfo);
		info.body1.collisions.push(collInfo);
	};
	
	
	CollDetectSphereMesh.prototype.collDetect=function(info, collArr){
		var tempBody;
		if (info.body0._type == "TRIANGLEMESH"){
			tempBody = info.body0;
			info.body0 = info.body1;
			info.body1 = tempBody;
		}
                        
		var sphere = info.body0;
		var mesh = info.body1;
                        
		this.collDetectSphereStaticMeshOverlap(sphere, mesh, info, JConfig.collToll, collArr);
	}
	
	jigLib.CollDetectSphereMesh=CollDetectSphereMesh;

})(jigLib);	
	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var CollOutBodyData=jigLib.CollOutBodyData;
	var JSegment=jigLib.JSegment;
	var JNumber3D=jigLib.JNumber3D;
	var RigidBody=jigLib.RigidBody;
	var CollDetectInfo=jigLib.CollDetectInfo;
	

	var CollisionSystemAbstract=function(){
		this.collBody = [];
		this.detectionFunctors = {};
		this.detectionFunctors["BOX_BOX"] = new jigLib.CollDetectBoxBox();
		this.detectionFunctors["BOX_SPHERE"] = new jigLib.CollDetectSphereBox();
		this.detectionFunctors["BOX_CAPSULE"] = new jigLib.CollDetectCapsuleBox();
		this.detectionFunctors["BOX_PLANE"] = new jigLib.CollDetectBoxPlane();
		this.detectionFunctors["BOX_TERRAIN"] = new jigLib.CollDetectBoxTerrain();
		this.detectionFunctors["BOX_TRIANGLEMESH"] = new jigLib.CollDetectBoxMesh();
		this.detectionFunctors["SPHERE_BOX"] = new jigLib.CollDetectSphereBox();
		this.detectionFunctors["SPHERE_SPHERE"] = new jigLib.CollDetectSphereSphere();
		this.detectionFunctors["SPHERE_CAPSULE"] = new jigLib.CollDetectSphereCapsule();
		this.detectionFunctors["SPHERE_PLANE"] = new jigLib.CollDetectSpherePlane();
		this.detectionFunctors["SPHERE_TERRAIN"] = new jigLib.CollDetectSphereTerrain();
		this.detectionFunctors["SPHERE_TRIANGLEMESH"] = new jigLib.CollDetectSphereMesh();
		this.detectionFunctors["CAPSULE_CAPSULE"] = new jigLib.CollDetectCapsuleCapsule();
		this.detectionFunctors["CAPSULE_BOX"] = new jigLib.CollDetectCapsuleBox();
		this.detectionFunctors["CAPSULE_SPHERE"] = new jigLib.CollDetectSphereCapsule();
		this.detectionFunctors["CAPSULE_PLANE"] = new jigLib.CollDetectCapsulePlane();
		this.detectionFunctors["CAPSULE_TERRAIN"] = new jigLib.CollDetectCapsuleTerrain();
		this.detectionFunctors["PLANE_BOX"] = new jigLib.CollDetectBoxPlane();
		this.detectionFunctors["PLANE_SPHERE"] = new jigLib.CollDetectSpherePlane();
		this.detectionFunctors["PLANE_CAPSULE"] = new jigLib.CollDetectCapsulePlane();
		this.detectionFunctors["TERRAIN_SPHERE"] = new jigLib.CollDetectSphereTerrain();
		this.detectionFunctors["TERRAIN_BOX"] = new jigLib.CollDetectBoxTerrain();
		this.detectionFunctors["TERRAIN_CAPSULE"] = new jigLib.CollDetectCapsuleTerrain();
		this.detectionFunctors["TRIANGLEMESH_SPHERE"] = new jigLib.CollDetectSphereMesh();
		this.detectionFunctors["TRIANGLEMESH_BOX"] = new jigLib.CollDetectBoxMesh();
	};
	CollisionSystemAbstract.prototype.detectionFunctors={};
    CollisionSystemAbstract.prototype.collBody=null;
	CollisionSystemAbstract.prototype._numCollisionsChecks = 0;

    CollisionSystemAbstract.prototype.addCollisionBody=function(body){
		if (!this.findBody(body)) this.collBody.push(body);
		
	};
                
    CollisionSystemAbstract.prototype.removeCollisionBody=function(body){
		if (this.findBody(body))  this.collBody.splice(this.collBody.indexOf(body), 1);
	};

    CollisionSystemAbstract.prototype.removeAllCollisionBodies=function(){
		this.collBody=[];
	};
	
	
	// Detects collisions between the body and all the registered collision bodies
    CollisionSystemAbstract.prototype.detectCollisions=function(body, collArr){
		if (!body.isActive) return;
                        
		var info;
		var fu;
		for(var j=0;j<this.collBody.length;j++){
			var _collBody=this.collBody[j];
			if (body == _collBody){
				continue;
			}
			if (this.checkCollidables(body, _collBody) && this.detectionFunctors[body.get_type() + "_" + _collBody.get_type()] != undefined){
				info = new CollDetectInfo();
				info.body0 = body;
				info.body1 = _collBody;
				fu = this.detectionFunctors[info.body0.get_type() + "_" + info.body1.get_type()];
				fu.collDetect(info, collArr);
			}
		}
	};
                
	// Detects collisions between the all bodies
    CollisionSystemAbstract.prototype.detectAllCollisions=function(bodies, collArr){
	};

	CollisionSystemAbstract.prototype.collisionSkinMoved=function(colBody){
		// used for grid
	};
	
	
	CollisionSystemAbstract.prototype.segmentIntersect=function(out, seg, ownerBody){
		out.frac = JNumber3D.NUM_HUGE;
		out.position = [];
		out.normal = [];
		var obj = new CollOutBodyData();
		
		for(j=0;j<this.collBody.length;j++){
			var _collBody=this.collBody[j];
			if (_collBody != ownerBody && this.segmentBounding(seg, _collBody)){
				if (_collBody.segmentIntersect(obj, seg, _collBody.get_currentState())){
					if (obj.frac < out.frac){
						out.position = obj.position;
						out.normal = obj.normal;
						out.frac = obj.frac;
						out.rigidBody = _collBody;
					}
				}
			}
		}
                        
		if (out.frac > 1) return false;
                        
		if (out.frac < 0){
			out.frac = 0;
		}else if (out.frac > 1) {
			out.frac = 1;
		}
                        
		return true;
	};
	
	
	CollisionSystemAbstract.prototype.segmentBounding=function(seg, obj){
		var pos = seg.getPoint(0.5);
		var r = Vector3DUtil.get_length(seg.delta) / 2;

		if (obj.get_type() != "PLANE" && obj.get_type() != "TERRAIN" && obj.get_type() != "TRIANGLEMESH"){
			var num1 = Vector3DUtil.get_length(Vector3DUtil.subtract(pos, obj.get_currentState().position));
			var num2 = r + obj.get_boundingSphere();
			if (num1 <= num2){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	};
	
	/*CollisionSystemAbstract.prototype.segmentBounding=function(seg, obj){
		var pos = seg.getPoint(0.5);
		var r = Vector3DUtil.get_length(seg.delta) / 2;
                        
		var num1 = Vector3DUtil.get_length(Vector3DUtil.subtract(pos,obj.get_currentState().position));
		var num2 = r + obj.get_boundingSphere();
                        
		if (num1 <= num2) return true;
                        else return false;
	};*/

	CollisionSystemAbstract.prototype.get_numCollisionsChecks=function(){
		return this._numCollisionsChecks;    
	};
	
	CollisionSystemAbstract.prototype.findBody=function(body){
		return this.collBody.indexOf(body) > -1;
	};
                
	CollisionSystemAbstract.prototype.checkCollidables=function(body0, body1){
		if (body0.get_nonCollidables().length == 0 && body1.get_nonCollidables().length == 0) return true;
                        
		if(body0.get_nonCollidables().indexOf(body1) > -1) return false;
                        
		if(body1.get_nonCollidables().indexOf(body0) > -1) return false;
                        
		return true;
	}
	
	jigLib.CollisionSystemAbstract=CollisionSystemAbstract;

})(jigLib);	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var RigidBody=jigLib.RigidBody;
	var CollDetectInfo=jigLib.CollDetectInfo;

	
	var CollisionSystemBrute=function(){
		this.Super();
	};
	jigLib.extend(CollisionSystemBrute,jigLib.CollisionSystemAbstract);
	
	// Detects collisions between the all bodies
	CollisionSystemBrute.prototype.detectAllCollisions=function(bodies, collArr){
		var info;
		var fu;
		var bodyID;
		var bodyType;
		this._numCollisionsChecks = 0;
		
		for(j=0;j<bodies.length;j++){
			var _body=bodies[j];
			if(!_body.isActive) continue;
                                
			bodyID = _body.id;
			bodyType = _body.get_type();
			for(k=0;k<this.collBody.length;k++){
				var _collBody=this.collBody[k];
				if (_body == _collBody){
					continue;
				}
                                        
				if (_collBody && _collBody.isActive && bodyID > _collBody.id){
					continue;
				}
                                        
				if (this.checkCollidables(_body, _collBody) && this.detectionFunctors[bodyType + "_" + _collBody.get_type()] != undefined){
					info = new CollDetectInfo();
					info.body0 = _body;
					info.body1 = _collBody;
					fu = this.detectionFunctors[info.body0.get_type() + "_" + info.body1.get_type()];
					fu.collDetect(info, collArr);
					this._numCollisionsChecks += 1;
				}
			}
		}
	}
	
	jigLib.CollisionSystemBrute=CollisionSystemBrute;

})(jigLib);	
	
(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var RigidBody=jigLib.RigidBody;
	
	var CollisionSystemGridEntry=function(collisionBody) {
		this.collisionBody = collisionBody;
		this.previous = this.next = null;
	};
	
	CollisionSystemGridEntry.prototype.collisionBody=null;
        CollisionSystemGridEntry.prototype.previous=null;
        CollisionSystemGridEntry.prototype.next=null;
        CollisionSystemGridEntry.prototype.gridIndex=0;
                
	/*
	* Removes the entry by updating its neighbours. Also zaps the prev/next
	* pointers in the entry, to help debugging
	*/
	CollisionSystemGridEntry.removeGridEntry=function(entry){
		// link the previous to the next (may be 0)
		entry.previous.next = entry.next;
		// link the next (if it exists) to the previous.
		if (entry.next != null)
			entry.next.previous = entry.previous;
		// tidy up this entry
		entry.previous = entry.next = null;
		entry.gridIndex = -2;
	};
	
	/*
	* Inserts an entry after prev, updating all links
	* @param entry prev
	*/
	CollisionSystemGridEntry.insertGridEntryAfter=function(entry, prev){
		var next = prev.next;
		prev.next = entry;
		entry.previous = prev;
		entry.next = next;
		if (next != null)
			next.previous = entry;
		entry.gridIndex = prev.gridIndex;
	}
	
	jigLib.CollisionSystemGridEntry=CollisionSystemGridEntry;

})(jigLib);	(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var CollOutBodyData=jigLib.CollOutBodyData;
	var JAABox=jigLib.JAABox;
	var JSegment=jigLib.JSegment;
	var JMath3D=jigLib.JMath3D;
	var JNumber3D=jigLib.JNumber3D;
	var RigidBody=jigLib.RigidBody;
	var CollisionSystemGridEntry=jigLib.CollisionSystemGridEntry;
	var CollDetectInfo=jigLib.CollDetectInfo;

	/*
	* Initializes a new CollisionSystem which uses a grid to speed up collision detection.
	* Use this system for larger scenes with many objects.
	* @param sx start point of grid in X axis.
	* @param sy start point of grid in Y axis.
	* @param sz start point of grid in Z axis.
	* @param nx Number of GridEntries in X Direction.
	* @param ny Number of GridEntries in Y Direction.
	* @param nz Number of GridEntries in Z Direction.
	* @param dx Size of a single GridEntry in X Direction.
	* @param dy Size of a single GridEntry in Y Direction.
	* @param dz Size of a single GridEntry in Z Direction.
	*/
	var CollisionSystemGrid=function(sx, sy, sz, nx, ny, nz, dx, dy, dz){
		this.Super();
		if(sx==undefined) sx=0;
		if(sy==undefined) sy=0;
		if(sz==undefined) sz=0;
		if(nx==undefined) nx=20; 
		if(ny==undefined) ny=20;
		if(nz==undefined) nz=20;
		if(dx==undefined) dx=200;
		if(dy==undefined) dy=200;
		if(dz==undefined) dz=200;
		this.nx = nx; this.ny = ny; this.nz = nz;
		this.dx = dx; this.dy = dy; this.dz = dz;
		this.sizeX = nx * dx;
		this.sizeY = ny * dy;
		this.sizeZ = nz * dz;
		this.minDelta = Math.min(dx, dy, dz);
                        
		this.startpoint = [sx, sy, sz];
		
		this.gridEntries = [];
		//gridBoxes = new Vector.<JAABox>(nx*ny*nz,true);
                        
		var len=this.gridEntries.length;
		for (var j = 0; j < len; ++j){
			var gridEntry = new CollisionSystemGridEntry(null);
			gridEntry.gridIndex = j;
			this.gridEntries[j]=gridEntry;
		}
                        
		this.overflowEntries = new CollisionSystemGridEntry(null);
		this.overflowEntries.gridIndex = -1;
	}
	
	jigLib.extend(CollisionSystemGrid,jigLib.CollisionSystemAbstract);
	
	CollisionSystemGrid.prototype.gridEntries=null;            
	//private var gridBoxes:Vector.<JAABox>;
                
	CollisionSystemGrid.prototype.overflowEntries=null;
                
        CollisionSystemGrid.prototype.nx=0;
        CollisionSystemGrid.prototype.ny=0;
        CollisionSystemGrid.prototype.nz=0;
	
        CollisionSystemGrid.prototype.dx=0;
        CollisionSystemGrid.prototype.dy=0;
        CollisionSystemGrid.prototype.dz=0;
	
        CollisionSystemGrid.prototype.sizeX=0;
        CollisionSystemGrid.prototype.sizeY=0;
        CollisionSystemGrid.prototype.sizeZ=0;
	
        CollisionSystemGrid.prototype.minDelta=0;

        CollisionSystemGrid.prototype.calcIndex=function(i, j, k){
		var _i = i % this.nx;
		var _j = j % this.ny;
		var _k = k % this.nz;
                        
		return (_i + this.nx * _j + (this.nx + this.ny) * _k);
	};

                
        CollisionSystemGrid.prototype.calcGridForSkin3=function(colBody){
		var i;var j;var k;
		var sides = colBody.get_boundingBox().get_sideLengths();
                        
		if ((sides[0] > this.dx) || (sides[1] > this.dy) || (sides[2] > this.dz)){
			//trace("calcGridForSkin3 -- Rigidbody to big for gridsystem - putting it into overflow list (lengths,type,id):", sides.x,sides.y,sides.z,colBody.type,colBody.id,colBody.boundingBox.minPos,colBody.boundingBox.maxPos);
			i = j = k = -1;
			return [i,j,k];
		}
		//trace(sides.x,sides.y,sides.z);
                        
		var min = colBody.get_boundingBox().get_minPos();
		min[0] = JMath3D.wrap(min[0], this.startpoint[0], this.startpoint[0]+this.sizeX);
		min[1] = JMath3D.wrap(min[1], this.startpoint[1], this.startpoint[1]+this.sizeY);
		min[2] = JMath3D.wrap(min[2], this.startpoint[2], this.startpoint[2]+this.sizeZ);
                        
		i = ( ((min[0]-this.startpoint[0]) / this.dx) % this.nx)|0;
		j = ( ((min[1]-this.startpoint[1]) / this.dy) % this.ny)|0;
		k = ( ((min[2]-this.startpoint[2]) / this.dz) % this.nz)|0;
                        
		return [i,j,k];
	};

	
	CollisionSystemGrid.prototype.calcGridForSkin6=function(colBody){
		var tempStoreObject = {};
		var i;var j;var k;
		var fi;var fj;var fk;
                        
		var sides = colBody.get_boundingBox().get_sideLengths();
                        
		if ((sides[0] > this.dx) || (sides[1] > this.dy) || (sides[2] > this.dz)){
			//trace("calcGridForSkin6 -- Rigidbody to big for gridsystem - putting it into overflow list (lengths,type,id):", sides.x,sides.y,sides.z,colBody.type,colBody.id,colBody.boundingBox.minPos,colBody.boundingBox.maxPos);
			i = j = k = -1;
			fi = fj = fk = 0.0;
			tempStoreObject.i = i; tempStoreObject.j = j; tempStoreObject.k = k; tempStoreObject.fi = fi; tempStoreObject.fj = fj; tempStoreObject.fk = fk;
			return tempStoreObject;
		}
                        
		var min = colBody.get_boundingBox().get_minPos();
	
		min[0] = JMath3D.getLimiteNumber(min[0], this.startpoint[0], this.startpoint[0] + this.sizeX);
		min[1] = JMath3D.getLimiteNumber(min[1], this.startpoint[1], this.startpoint[1] + this.sizeY);
		min[2] = JMath3D.getLimiteNumber(min[2], this.startpoint[2], this.startpoint[2] + this.sizeZ);
                        
		fi = (min[0] - this.startpoint[0]) / this.dx;
		fj = (min[1] - this.startpoint[1]) / this.dy;
		fk = (min[2] - this.startpoint[2]) / this.dz;
                        
		i = fi;
		j = fj;
		k = fk;
                        
		if (i < 0) { i = 0; fi = 0.0; }
		else if (i >= this.nx) { i = 0; fi = 0.0; }
		else fi -= i;
                        
		if (j < 0) { j = 0; fj = 0.0; }
		else if (j >= this.ny) { j = 0; fj = 0.0; }
		else fj -= j;
                        
		if (k < 0) { k = 0; fk = 0.0; }
		else if (k >= this.nz) { k = 0; fk = 0.0; }
		else fk -= k;
                        
		tempStoreObject.i = i; tempStoreObject.j = j; tempStoreObject.k = k; tempStoreObject.fi = fi; tempStoreObject.fj = fj; tempStoreObject.fk = fk;
		//trace(i,j,k,fi,fj,fk);
		//trace(colBody.x,colBody.y,colBody.z);
		return tempStoreObject;
	};

                
	CollisionSystemGrid.prototype.calcGridIndexForBody=function(colBody){
		var tempStoreVector = this.calcGridForSkin3(colBody);
                        //trace(tempStoreVector.x,tempStoreVector.y,tempStoreVector.z);
		if (tempStoreVector.x == -1) return -1;
		return this.calcIndex(tempStoreVector[0], tempStoreVector[1], tempStoreVector[2]);
	};
	
	
	CollisionSystemGrid.prototype.addCollisionBody=function(body){
		if (!this.findBody(body)) this.collBody.push(body);
                        
		body.collisionSystem = this;

		// also do the grid stuff - for now put it on the overflow list
		var entry = new CollisionSystemGridEntry(body);
		body.externalData = entry;
                        
		// add entry to the start of the list
		CollisionSystemGridEntry.insertGridEntryAfter(entry, this.overflowEntries);
		this.collisionSkinMoved(body);
	};
                        
	CollisionSystemGrid.prototype.removeCollisionBody=function(body){
		if (body.externalData != null){
			body.externalData.collisionBody = null;
			CollisionSystemGridEntry.removeGridEntry(body.externalData);
			body.externalData = null;
		}

		if (this.findBody(body))
			this.collBody.splice(this.collBody.indexOf(body), 1);
	};
                
	CollisionSystemGrid.prototype.removeAllCollisionBodies=function(){
		for(var i=0;i<this.collBody.length;i++){
			var body=this.collBody[i];
			if (body.externalData != null){
				body.externalData.collisionBody = null;
				CollisionSystemGridEntry.removeGridEntry(body.externalData);
			}
		}
		collBody=[];
	};
	
	
	// todo: only call when really moved, make it override public add into abstract ?
	CollisionSystemGrid.prototype.collisionSkinMoved=function(colBody){
		var entry = colBody.externalData;
		if (entry == null){
                                //trace("Warning rigidbody has grid entry null!");
			return;
		}
                        
		var gridIndex = this.calcGridIndexForBody(colBody);
                                                
		// see if it's moved grid
		if (gridIndex == entry.gridIndex)
			return;

		//trace(gridIndex);
		var start;
		var gridEntries=this.gridEntries;
		//if (gridIndex >= 0**)
		if (gridEntries.length-1 > gridIndex && gridIndex >=0) // check if it's outside the gridspace, if so add to overflow
			start = gridEntries[gridIndex];
		else
			start = this.overflowEntries;
                        
		CollisionSystemGridEntry.removeGridEntry(entry);
		CollisionSystemGridEntry.insertGridEntryAfter(entry, start);
	};
	
        CollisionSystemGrid.prototype.getListsToCheck=function(colBody){
		var entries = []; 
                        
		var entry = colBody.externalData;
		if (entry == null){
			//trace("Warning skin has grid entry null!");
			return null;
		}
                        
		// todo - work back from the mGridIndex rather than calculating it again...
		var i; var j; var k;
		var fi; var fj; var fk;
		var tempStoreObject = this.calcGridForSkin6(colBody);
		i = tempStoreObject.i; j = tempStoreObject.j; k = tempStoreObject.k; fi = tempStoreObject.fi; fj = tempStoreObject.fj; fk = tempStoreObject.fk;
                        
		if (i == -1){
			//trace("ADD ALL!");
			entries=this.gridEntries.concat();
			entries.push(this.overflowEntries);
			return entries;
		}
                        
		// always add the overflow
		entries.push(this.overflowEntries);
                        
		var delta = colBody.get_boundingBox().get_sideLengths(); // skin.WorldBoundingBox.Max - skin.WorldBoundingBox.Min;
		var maxI = 1, maxJ = 1, maxK = 1;
		if (fi + (delta[0] / this.dx) < 1)
			maxI = 0;
		if (fj + (delta[1] / this.dy) < 1)
			maxJ = 0;
		if (fk + (delta[2]/ this.dz) < 1)
			maxK = 0;
                        
		// now add the contents of all grid boxes - their contents may extend beyond the bounds
		for (var di = -1; di <= maxI; ++di){
			for (var dj = -1; dj <= maxJ; ++dj){
				for (var dk = -1; dk <= maxK; ++dk){
					var thisIndex = this.calcIndex(this.nx + i + di, this.ny + j + dj, this.nz + k + dk); // + ((nx*ny*nz)*0.5);
					//trace("ge", gridEntries.length);
					if (this.gridEntries.length-1 > thisIndex && thisIndex >=0) {
						var start = this.gridEntries[thisIndex];
                                                
						//trace(thisIndex,gridEntries.length);
						if (start != null && start.next != null){
							entries.push(start);
						}
					}
				}
			}
		}
		return entries;
	}
	
	
        CollisionSystemGrid.prototype.detectAllCollisions=function(bodies, collArr) {
		var info;
		var fu;
		var bodyID;
		var bodyType;
		this._numCollisionsChecks = 0;
                        
		for(var j=0;j<bodies.length;j++){
			var body=bodies[j];
			if (!body.isActive) continue;

			bodyID = body.get_id();
			bodyType = body.get_type();
                                
			var lists=this.getListsToCheck(body);
			
			for(var k=0;k<lists.length;k++){
				var entry=lists[k];                                      
				for (entry = entry.next; entry != null; entry = entry.next){
					if (body == entry.collisionBody) continue;
                                                
					if (entry.collisionBody && entry.collisionBody.isActive && bodyID > entry.collisionBody.get_id())
						continue;
                                                
					if (this.checkCollidables(body, entry.collisionBody) && this.detectionFunctors[bodyType + "_" + entry.collisionBody.get_type()] != undefined){
						info = new CollDetectInfo();
						info.body0 = body;
						info.body1 = entry.collisionBody;
						fu = this.detectionFunctors[info.body0.get_type() + "_" + info.body1.get_type()];
						fu.collDetect(info, collArr);
						this._numCollisionsChecks += 1;
					} //check collidables
				}// loop over entries
			} // loop over lists
		} // loop over bodies
	}
	
	jigLib.CollisionSystemGrid=CollisionSystemGrid;

})(jigLib);	/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JConstraint
	 * @class JConstraint the base class for constraints
	 * @property {boolean} _satisfied flag indicating whether this constraint has been satisfied
	 * @property {boolean} _constraintEnabled flag indicating whether this constraint is registered with the physics system
	 * @constructor
	 **/
	var JConstraint=function(){
		this._constraintEnabled = false;
		this.enableConstraint();
	};
	JConstraint.prototype._satisfied=null;
	JConstraint.prototype._constraintEnabled=null;

	/**
	 * @function set_satisfied setter for the _satisfied flag
	 * @param {boolean} s
	 * @type void
	 **/
	JConstraint.prototype.set_satisfied=function(s){
		this._satisfied = s;
	};

	/**
	 * @function get_satisfied getter for the _satisfied flag
	 * @type boolean
	 **/
	JConstraint.prototype.get_satisfied=function(){
		return this._satisfied;
	};

	/**
	 * @function preApply prepare for applying constraints - subsequent calls to
	 * apply will all occur with a constant position i.e. precalculate everything possible 
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	JConstraint.prototype.preApply=function(dt){
		this._satisfied = false;
	};

	/**
	 * @function apply enforces the constraint using impulses. Return value
	 * indicates if any impulses were applied. If impulses were applied
	 * the derived class should call SetConstraintsUnsatisfied() on each
	 * body that is involved.
	 * @param {number} dt a UNIX timestamp
	 * @type boolean
	 **/
	JConstraint.prototype.apply=function(dt){
		return false;
	};

	/**
	 * @function enableConstraint registers this constraint with the physics system
	 * @type void
	 **/
	JConstraint.prototype.enableConstraint=function(){
		if (this._constraintEnabled)
			return;
		
		this._constraintEnabled = true;
		jigLib.PhysicsSystem.getInstance().addConstraint(this);
	};

	/**
	 * @function disableConstraint de-registers this constraint from the physics system
	 * @type void
	 **/
	JConstraint.prototype.disableConstraint=function(){
		if (!this._constraintEnabled)
			return;
		
		this._constraintEnabled = false;
		jigLib.PhysicsSystem.getInstance().removeConstraint(this);
	};

	/**
	 * @function get_constraintEnabled determines whether this constraint is registered with the physics system
	 * @type boolean
	 **/
	JConstraint.prototype.get_constraintEnabled=function(){
		return this._constraintEnabled;
	};
	
	jigLib.JConstraint=JConstraint;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JConstraintMaxDistance
	 * @class JConstraintMaxDistance a maximum distance constraint
	 * @extends JConstraint
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @property {number} _maxVelMag limits the velocity of the constrained bodies
	 * @property {number} _minVelForProcessing the lower velocity threshold below which the constraint is not processed 
	 * @property {RigidBody} _body0 the first body of the constrained pair
	 * @property {RigidBody} _body1 the second body of the constrained pair
	 * @property {array} _body0Pos the position of the first body
	 * @property {array} _body1Pos the position of the second body
	 * @property {number} _maxDistance the maximum allowed distance
	 * @property {array} r0 for internal use
	 * @property {array} r1 for internal use
	 * @property {array} _worldPos for internal use
	 * @property {array} _currentRelPos0 for internal use
	 * @constructor
	 * @param {RigidBody} body0 the first body of the constrained pair
	 * @param {array} body0Pos the position of the first body expressed as a 3D vector
	 * @param {RigidBody} body1 the second body of the constrained pair
	 * @param {array} body1Pos the position of the second body expressed as a 3D vector
	 * @param {number} maxDistance the maximum allowed distance between body0 and body1
	 **/
	var JConstraintMaxDistance=function(body0, body0Pos, body1, body1Pos, maxDistance){
		if(!maxDistance) maxDistance=1;
		this.Super();
		this._body0 = body0;
		this._body0Pos = body0Pos;
		this._body1 = body1;
		this._body1Pos = body1Pos;
		this._maxDistance = maxDistance;
		body0.addConstraint(this);
		body1.addConstraint(this);
	};
	jigLib.extend(JConstraintMaxDistance,jigLib.JConstraint);
	
	JConstraintMaxDistance.prototype._maxVelMag = 20;
	JConstraintMaxDistance.prototype._minVelForProcessing = 0.01;

	JConstraintMaxDistance.prototype._body0=null;
	JConstraintMaxDistance.prototype._body1=null;
	JConstraintMaxDistance.prototype._body0Pos=null;
	JConstraintMaxDistance.prototype._body1Pos=null;
	JConstraintMaxDistance.prototype._maxDistance=null;

	JConstraintMaxDistance.prototype.r0=null;
	JConstraintMaxDistance.prototype.r1=null;
	JConstraintMaxDistance.prototype._worldPos=null;
	JConstraintMaxDistance.prototype._currentRelPos0=null;
	
	/**
	 * @function preApply prepare for applying the constraint
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	JConstraintMaxDistance.prototype.preApply=function(dt){
		this.set_satisfied(false);
		
		this.r0 = this._body0Pos.slice(0);
		this.r1 = this._body1Pos.slice(0);
		JMatrix3D.multiplyVector(this._body0.get_currentState().get_orientation(), this.r0);
		JMatrix3D.multiplyVector(this._body1.get_currentState().get_orientation(), this.r1);
		//this.r0 = this._body0.get_currentState().get_orientation().transformVector(this._body0Pos.slice(0));
		//this.r1 = this._body1.get_currentState().get_orientation().transformVector(this._body1Pos.slice(0));
		
		var worldPos0 = Vector3DUtil.add(this._body0.get_currentState().position, this.r0);
		var worldPos1 = Vector3DUtil.add(this._body1.get_currentState().position, this.r1);
		this._worldPos = JNumber3D.getScaleVector(Vector3DUtil.add(worldPos0, worldPos1), 0.5);

		this._currentRelPos0 = Vector3DUtil.subtract(worldPos0, worldPos1);
	};

	/**
	 * @function apply enforce the constraint
	 * @param {number} dt a UNIX timestamp
	 * @type boolean
	 **/
	JConstraintMaxDistance.prototype.apply=function(dt){
		this.set_satisfied(true);

		if (!this._body0.isActive && !this._body1.isActive)
			return false;
		
		var currentVel0 = this._body0.getVelocity(this.r0);
		var currentVel1 = this._body1.getVelocity(this.r1);

		var predRelPos0 = Vector3DUtil.add(this._currentRelPos0, JNumber3D.getScaleVector(Vector3DUtil.subtract(currentVel0, currentVel1), dt));
		var clampedRelPos0 = predRelPos0.slice(0);
		var clampedRelPos0Mag = Vector3DUtil.get_length(clampedRelPos0);
		
		if (clampedRelPos0Mag <= JNumber3D.NUM_TINY)
			return false;
		
		if (clampedRelPos0Mag > this._maxDistance)
			clampedRelPos0 = JNumber3D.getScaleVector(clampedRelPos0, this._maxDistance / clampedRelPos0Mag);

		var desiredRelVel0 = JNumber3D.getDivideVector(Vector3DUtil.subtract(clampedRelPos0, this._currentRelPos0), dt);
		var Vr = Vector3DUtil.subtract(Vector3DUtil.subtract(currentVel0, currentVel1), desiredRelVel0);

		var normalVel = Vector3DUtil.get_length(Vr);
		if (normalVel > this._maxVelMag){
			Vr = JNumber3D.getScaleVector(Vr, this._maxVelMag / normalVel);
			normalVel = this._maxVelMag;
		}else if (normalVel < this._minVelForProcessing){
			return false;
		}

		var N = JNumber3D.getDivideVector(Vr, normalVel);
		
		var tempVec1 = Vector3DUtil.crossProduct(this.r0, N);
		JMatrix3D.multiplyVector(this._body0.get_worldInvInertia(), tempVec1);
		
		var tempVec2 = Vector3DUtil.crossProduct(this.r1, N);
		JMatrix3D.multiplyVector(this._body1.get_worldInvInertia(), tempVec2);
		
		var denominator = this._body0.get_invMass()  
						+ this._body1.get_invMass() 
						+ Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempVec1, this.r0)) 
						+ Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempVec2, this.r1));

		if (denominator < JNumber3D.NUM_TINY)
			return false;

		var normalImpulse = JNumber3D.getScaleVector(N, -normalVel / denominator);
		this._body0.applyWorldImpulse(normalImpulse, this._worldPos);
		this._body1.applyWorldImpulse(JNumber3D.getScaleVector(normalImpulse, -1), this._worldPos);

		this._body0.setConstraintsAndCollisionsUnsatisfied();
		this._body1.setConstraintsAndCollisionsUnsatisfied();
		this.set_satisfied(true);
		return true;
	};
	
	jigLib.JConstraintMaxDistance=JConstraintMaxDistance;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JConstraintPoint
	 * @class JConstraintPoint a constraint that links a point on one body to a point on another body
	 * @extends JConstraint
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @property {number} _maxVelMag limits the velocity of the constrained bodies
	 * @property {number} _minVelForProcessing the lower velocity threshold below which the constraint is not processed
	 * @property {RigidBody} _body0 the first body of the constrained pair
	 * @property {RigidBody} _body1 the second body of the constrained pair
	 * @property {array} _body0Pos the position of the first body
	 * @property {array} _body1Pos the position of the second body
	 * @property {number} _allowedDistance the maximum allowed distance
	 * @property {array} r0 for internal use
	 * @property {array} r1 for internal use
	 * @property {array} _worldPos for internal use
	 * @property {array} _vrExtra for internal use
	 * @constructor
	 * @param {RigidBody} body0 the first body of the constrained pair
	 * @param {array} body0Pos the position of the first body expressed as a 3D vector
	 * @param {RigidBody} body1 the second body of the constrained pair
	 * @param {array} body1Pos the position of the second body expressed as a 3D vector
	 * @param {number} allowedDistance how much the points are allowed to deviate
	 * @param timescale the timescale over which deviation is eliminated (suggest a few times dt - be careful if there's a variable timestep!). If timescale < 0 then the value indicates the number of dts
	 **/
	var JConstraintPoint=function(body0, body0Pos, body1, body1Pos, allowedDistance, timescale)
	{
		this.Super();
		this._body0 = body0;
		this._body0Pos = body0Pos;
		this._body1 = body1;
		this._body1Pos = body1Pos;
		this._allowedDistance = (allowedDistance) ? allowedDistance : 1;
		this._timescale = (timescale) ? timescale : 1;
		if (this._timescale < JNumber3D.NUM_TINY) _timescale = JNumber3D.NUM_TINY;
		body0.addConstraint(this);
		body1.addConstraint(this);
	};
	jigLib.extend(JConstraintPoint,jigLib.JConstraint);
	
	JConstraintPoint.prototype._maxVelMag = 20;
	JConstraintPoint.prototype._minVelForProcessing = 0.01;

	JConstraintPoint.prototype._body0=null;
	JConstraintPoint.prototype._body1=null;
	JConstraintPoint.prototype._body0Pos=null;
	JConstraintPoint.prototype._body1Pos=null;

	JConstraintPoint.prototype._timescale=null;
	JConstraintPoint.prototype._allowedDistance=null;

	JConstraintPoint.prototype.r0=null;
	JConstraintPoint.prototype.r1=null;
	JConstraintPoint.prototype._worldPos=null;
	JConstraintPoint.prototype._vrExtra=null;
	
	/**
	 * @function preApply prepare for applying the constraint
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	JConstraintPoint.prototype.preApply=function(dt)
	{
		this.set_satisfied(false);
		
		this.r0 = this._body0Pos.slice(0);
		JMatrix3D.multiplyVector(this._body0.get_currentState().get_orientation(), this.r0);
		this.r1 = this._body1Pos.slice(0);
		JMatrix3D.multiplyVector(this._body1.get_currentState().get_orientation(), this.r1);
		
		//this.r0 = this._body0.get_currentState().get_orientation().transformVector(this._body0Pos);
		//this.r1 = this._body1.get_currentState().get_orientation().transformVector(this._body1Pos);

		var worldPos0 = Vector3DUtil.add(this._body0.get_currentState().position, this.r0);
		var worldPos1 = Vector3DUtil.add(this._body1.get_currentState().position, this.r1);
		this._worldPos = JNumber3D.getScaleVector(Vector3DUtil.add(worldPos0, worldPos1), 0.5);

		var deviation = Vector3DUtil.subtract(worldPos0, worldPos1);
		var deviationAmount = Vector3DUtil.get_length(deviation);
		/*
		if (deviationAmount <= this._allowedDistance){
			this.set_satisfied(true);
			this._vrExtra = [0,0,0,0];
			return;
		}
		*/
		if (deviationAmount > this._allowedDistance)
			this._vrExtra = JNumber3D.getScaleVector(deviation, (deviationAmount - this._allowedDistance) / (deviationAmount * Math.max(this._timescale, dt)));
		else
			this._vrExtra = [0,0,0,0];
	};

	/**
	 * @function apply enforce the constraint
	 * @param {number} dt a UNIX timestamp
	 * @type boolean
	 **/
	JConstraintPoint.prototype.apply=function(dt)
	{
		//if (this._satisfied) return;
		this.set_satisfied(true);
		
		if (!this._body0.isActive && !this._body1.isActive)
			return false;
		
		var currentVel0 = this._body0.getVelocity(this.r0);
		var currentVel1 = this._body1.getVelocity(this.r1);
		var Vr = Vector3DUtil.add(this._vrExtra, Vector3DUtil.subtract(currentVel0, currentVel1));

		var normalVel = Vector3DUtil.get_length(Vr);
		if (normalVel < this._minVelForProcessing)
			return false;

		if (normalVel > this._maxVelMag){
			Vr = JNumber3D.getScaleVector(Vr, this._maxVelMag / normalVel);
			normalVel = this._maxVelMag;
		}
		
		var N = JNumber3D.getDivideVector(Vr, normalVel);
		var tempVec1 = Vector3DUtil.crossProduct(this.r0, N);
		JMatrix3D.multiplyVector(this._body0.get_worldInvInertia(), tempVec1);
		//tempVec1 = this._body0.get_worldInvInertia().transformVector(tempVec1);
		var tempVec2 = Vector3DUtil.crossProduct(this.r1, N);
		JMatrix3D.multiplyVector(this._body1.get_worldInvInertia(), tempVec2);
		//tempVec2 = this._body1.get_worldInvInertia().transformVector(tempVec2);
		
		var denominator = this._body0.get_invMass() 
						+ this._body1.get_invMass() 
						+ Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempVec1, this.r0)) 
						+ Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempVec2, this.r1));

		
		if (denominator < JNumber3D.NUM_TINY)
			return false;

		var normalImpulse0=JNumber3D.getScaleVector(N, -normalVel / denominator);
		//Vector3DUtil.scaleBy(normalImpulse0, 0.5);
		var normalImpulse1=JNumber3D.getScaleVector(normalImpulse0, -1);
		
		/*limit the impulse applied to body1 so it does not exceed the velocity of body0
		var vel1toAdd=JNumber3D.getScaleVector(normalImpulse1, this._body1._invMass);
		var newVel1=Vector3DUtil.add(this._body1._currState.linVelocity, vel1toAdd);
		var vel0Sum=Vector3DUtil.getSum(currentVel0);
		var newVel1Sum=Vector3DUtil.getSum(newVel1);
		if (newVel1Sum > vel0Sum){
			var diff=newVel1Sum-vel0Sum;
			Vector3DUtil.limitSum(normalImpulse1,newVel1Sum-diff);
		}
		
		//limit the impulse applied to body1 so it does not exceed the velocity of body0
		var vel0toAdd=JNumber3D.getScaleVector(normalImpulse0, this._body1._invMass);
		var newVel0=Vector3DUtil.add(this._body0._currState.linVelocity, vel0toAdd);
		//var vel0Sum=Vector3DUtil.getSum(currentVel0);
		var newVel0Sum=Vector3DUtil.getSum(newVel0);
		if (newVel0Sum > vel0Sum){
			var diff=newVel0Sum-vel0Sum;
			Vector3DUtil.limitSum(normalImpulse0,newVel0Sum-diff);
		}
		*/
		
		this._body0.applyWorldImpulse(normalImpulse0, this._worldPos);
		this._body1.applyWorldImpulse(normalImpulse1, this._worldPos);
		
		this._body0.setConstraintsAndCollisionsUnsatisfied();
		this._body1.setConstraintsAndCollisionsUnsatisfied();
		this.set_satisfied(true);
		
		return true;
	};
	
	jigLib.JConstraintPoint=JConstraintPoint;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var JConstraintMaxDistance=jigLib.JConstraintMaxDistance;
	var JConstraintPoint=jigLib.JConstraintPoint;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name HingeJoint
	 * @class HingeJoint hinge connector for two rigid bodies
	 * @extends PhysicsController
	 * @requires Vector3DUtil
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @requires JConstraintMaxDistance
	 * @requires JConstraintPoint
	 * @constant {number} MAX_HINGE_ANGLE_LIMIT
	 * @property {array} _hingeAxis
	 * @property {array} _hingePosRel0
	 * @property {RigidBody} body0 the first rigid body 
	 * @property {RigidBody} body1 the second rigid body 
	 * @property {boolean} _usingLimit
	 * @property {boolean} _hingeEnabled
	 * @property {boolean} _broken
	 * @property {number} _damping
	 * @property {number} _extraTorque
	 * @property {array} sidePointConstraints used to store 2 JConstraintMaxDistance instances
	 * @property {JConstraintPoint} midPointConstraint
	 * @property {JConstraintMaxDistance} maxDistanceConstraint
	 * @property {array} r a 3D vector
	 * @constructor
	 * @param {RigidBody} _body0 the first body of the constrained pair
	 * @param {RigidBody} _body1 the second body of the constrained pair
	 * @param {array} _hingeAxis
	 * @param {array} _hingePosRel0
	 * @param {number} hingeHalfWidth
	 * @param {number} hingeFwdAngle
	 * @param {number} hingeBckAngle
	 * @param {number} sidewaysSlack
	 * @param {number} damping
	 **/
	var HingeJoint=function(body0, body1, hingeAxis, hingePosRel0, hingeHalfWidth, hingeFwdAngle, hingeBckAngle, sidewaysSlack, damping){
		this._body0 = body0;
		this._body1 = body1;
		this._hingeAxis = hingeAxis.slice(0);
		this._hingePosRel0 = hingePosRel0.slice(0);
		this._usingLimit = false;
		this._hingeEnabled = false;
		this._broken = false;
		this._damping = damping;
		this._extraTorque = 0;

		Vector3DUtil.normalize(this._hingeAxis);
		var _hingePosRel1 = Vector3DUtil.add(this._body0.get_currentState().position, Vector3DUtil.subtract(this._hingePosRel0, this._body1.get_currentState().position));

		var relPos0a = Vector3DUtil.add(this._hingePosRel0, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));
		var relPos0b = Vector3DUtil.subtract(this._hingePosRel0, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));

		var relPos1a = Vector3DUtil.add(_hingePosRel1, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));
		var relPos1b = Vector3DUtil.subtract(_hingePosRel1, JNumber3D.getScaleVector(this._hingeAxis, hingeHalfWidth));

		var timescale = 1 / 20;
		var allowedDistanceMid = 0.005;
		var allowedDistanceSide = sidewaysSlack * hingeHalfWidth;

		this.sidePointConstraints = [];
		this.sidePointConstraints[0] = new JConstraintMaxDistance(this._body0, relPos0a, this._body1, relPos1a, allowedDistanceSide);
		this.sidePointConstraints[1] = new JConstraintMaxDistance(this._body0, relPos0b, this._body1, relPos1b, allowedDistanceSide);

		this.midPointConstraint = new JConstraintPoint(this._body0, this._hingePosRel0, this._body1, _hingePosRel1, allowedDistanceMid, timescale);

		if (hingeFwdAngle <= this.MAX_HINGE_ANGLE_LIMIT){
			var perpDir = Vector3DUtil.Y_AXIS;
			if (Vector3DUtil.dotProduct(perpDir, this._hingeAxis) > 0.1){
				perpDir[0] = 1;
				perpDir[1] = 0;
				perpDir[2] = 0;
			}
			var sideAxis = Vector3DUtil.crossProduct(this._hingeAxis, perpDir);
			perpDir = Vector3DUtil.crossProduct(sideAxis, this._hingeAxis);
			Vector3DUtil.normalize(perpDir);

			var len = 10 * hingeHalfWidth;
			var hingeRelAnchorPos0 = JNumber3D.getScaleVector(perpDir, len);
			var angleToMiddle = 0.5 * (hingeFwdAngle - hingeBckAngle);
			var hingeRelAnchorPos1 = hingeRelAnchorPos0.slice(0);
			JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(this._hingeAxis[0], this._hingeAxis[1], this._hingeAxis[2], -angleToMiddle), hingeRelAnchorPos1);

			var hingeHalfAngle = 0.5 * (hingeFwdAngle + hingeBckAngle);
			var allowedDistance = len * 2 * Math.sin(0.5 * hingeHalfAngle * Math.PI / 180);

			var hingePos = Vector3DUtil.add(this._body1.get_currentState().position, this._hingePosRel0);
			var relPos0c = Vector3DUtil.add(hingePos, Vector3DUtil.subtract(hingeRelAnchorPos0, this._body0.get_currentState().position));
			var relPos1c = Vector3DUtil.add(hingePos, Vector3DUtil.subtract(hingeRelAnchorPos1, this._body1.get_currentState().position));

			this.maxDistanceConstraint = new JConstraintMaxDistance(this._body0, relPos0c, this._body1, relPos1c, allowedDistance);
			this._usingLimit = true;
		}
		if (this._damping <= 0){
			this._damping = -1;
		}else{
			this._damping = JNumber3D.getLimiteNumber(this._damping, 0, 1);
		}

		this.enableHinge();
	};
	jigLib.extend(HingeJoint, jigLib.PhysicsController);
	
	HingeJoint.prototype.MAX_HINGE_ANGLE_LIMIT = 150;
	HingeJoint.prototype._hingeAxis = null;
	HingeJoint.prototype._hingePosRel0 = null;
	HingeJoint.prototype._body0 = null;
	HingeJoint.prototype._body1 = null;
	HingeJoint.prototype._usingLimit = null;
	HingeJoint.prototype._hingeEnabled = null;
	HingeJoint.prototype._broken = null;
	HingeJoint.prototype._damping = null;
	HingeJoint.prototype._extraTorque = null;
	
	HingeJoint.prototype.sidePointConstraints = null;
	HingeJoint.prototype.midPointConstraint = null;
	HingeJoint.prototype.maxDistanceConstraint = null;

	/**
	 * @function enableHinge enable the joint
	 * @type void
	 **/
	HingeJoint.prototype.enableHinge=function(){
		if (this._hingeEnabled) return;
		
		this.midPointConstraint.enableConstraint();
		this.sidePointConstraints[0].enableConstraint();
		this.sidePointConstraints[1].enableConstraint();
		if (this._usingLimit && !this._broken)
			this.maxDistanceConstraint.enableConstraint();

		this.enableController();
		this._hingeEnabled = true;
	};

	/**
	 * @function disableHinge disable the joint
	 * @type void
	 **/
	HingeJoint.prototype.disableHinge=function(){
		if (!this._hingeEnabled) return;

		this.midPointConstraint.disableConstraint();
		this.sidePointConstraints[0].disableConstraint();
		this.sidePointConstraints[1].disableConstraint();

		if (this._usingLimit && !this._broken)
			this.maxDistanceConstraint.disableConstraint();

		this.disableController();
		this._hingeEnabled = false;
	};

	/**
	 * @function breakHinge break the joint
	 * @type void
	 **/
	HingeJoint.prototype.breakHinge=function(){
		if (this._broken) return;

		if (this._usingLimit)
			this.maxDistanceConstraint.disableConstraint();

		this._broken = true;
	};

	/**
	 * @function mendHinge repair the joint
	 * @type void
	 **/
	HingeJoint.prototype.mendHinge=function(){
		if (!this._broken)
			return;

		if (this._usingLimit)
			this.maxDistanceConstraint.enableConstraint();

		this._broken = false;
	};

	/**
	 * @function setExtraTorque setter for _extraTorque
	 * @param {number} torque
	 * @type void
	 **/
	HingeJoint.prototype.setExtraTorque=function(torque){
		this._extraTorque = torque;
	};

	/**
	 * @function getExtraTorque getter for _extraTorque
	 * @type number
	 **/
	HingeJoint.prototype.getHingeEnabled=function(){
		return this._hingeEnabled;
	};

	/**
	 * @function isBroken getter for _broken
	 * @type boolean
	 **/
	HingeJoint.prototype.isBroken=function(){
		return this._broken;
	};

	/**
	 * @function getHingePosRel0 getter for _hingePosRel0
	 * @type array
	 **/
	HingeJoint.prototype.getHingePosRel0=function(){
		return this._hingePosRel0;
	};

	/**
	 * @function updateController updates this physics controller
	 * @see PhysicsSystem.updateController
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	HingeJoint.prototype.updateController=function(dt){
		if (this._damping > 0){
			var hingeAxis = Vector3DUtil.subtract(this._body1.get_currentState().rotVelocity, this._body0.get_currentState().rotVelocity);
			Vector3DUtil.normalize(hingeAxis);

			var angRot1 = Vector3DUtil.dotProduct(this._body0.get_currentState().rotVelocity, hingeAxis);
			var angRot2 = Vector3DUtil.dotProduct(this._body1.get_currentState().rotVelocity, hingeAxis);

			var avAngRot = 0.5 * (angRot1 + angRot2);
			var frac = 1 - this._damping;
			var newAngRot1= avAngRot + (angRot1 - avAngRot) * frac;
			var newAngRot2= avAngRot + (angRot2 - avAngRot) * frac;

			var newAngVel1 = Vector3DUtil.add(this._body0.get_currentState().rotVelocity, JNumber3D.getScaleVector(hingeAxis, newAngRot1 - angRot1));
			var newAngVel2 = Vector3DUtil.add(this._body1.get_currentState().rotVelocity, JNumber3D.getScaleVector(hingeAxis, newAngRot2 - angRot2));

			this._body0.setAngVel(newAngVel1);
			this._body1.setAngVel(newAngVel2);
		}

		if (this._extraTorque != 0){
			var torque1 = this._hingeAxis.slice(0);
			JMatrix3D.multiplyVector(this._body0.get_currentState().get_orientation(), torque1);
			torque1 = JNumber3D.getScaleVector(torque1, this._extraTorque);

			this._body0.addWorldTorque(torque1);
			this._body1.addWorldTorque(JNumber3D.getScaleVector(torque1, -1));
		}
	};
	
	jigLib.HingeJoint=HingeJoint;
	
})(jigLib);
/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */
 
(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JConfig=jigLib.JConfig;
	var CollPointInfo=jigLib.CollPointInfo;
	var CollisionSystemBrute=jigLib.CollisionSystemBrute;
	var CollisionSystemGrid=jigLib.CollisionSystemGrid;
	var ContactData=jigLib.ContactData;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var BodyPair=jigLib.BodyPair;
	var CachedImpulse=jigLib.CachedImpulse;
	var JCollisionEvent=jigLib.JCollisionEvent;

	/**
	 * @name PhysicsSystem
	 * @class PhysicsSystem a singleton representing the physics system
	 * @requires Vector3DUtil
	 * @requires JConfig
	 * @requires CollPointInfo
	 * @requires CollisionSystem
	 * @requires ContactData
	 * @requires JMatrix3D
	 * @requires JNumber3D
	 * @requires BodyPair
	 * @requires CachedImpulse
	 * @property {PhysicsSystem} _currentPhysicsSystem
	 * @property {number} _maxVelMag
	 * @property {number} _minVelForProcessing
	 * @property {array} _bodies a collection of RigidBody objects
	 * @property {array} _activeBodies a collection of RigidBody objects
	 * @property {array} _collisions a collection of CollisionInfo objects
	 * @property {array} _constraints a collection of JConstraint objects
	 * @property {array} _controllers a collection of PhysicsController objects
	 * @property {array} _effects  a collection of JEffect objects
	 * @property {number} _gravityAxis
	 * @property {array} _gravity a 3D vector
	 * @property {boolean} _doingIntegration
	 * @property {function} preProcessCollisionFn
	 * @property {function} preProcessContactFn
	 * @property {function} processCollisionFn
	 * @property {function} processContactFn
	 * @property {array} _cachedContacts a collection of ContactData objects
	 * @property {CollisionSystem} _collisionSystem
	 * @constructor
	 **/
	var PhysicsSystem=function(){
		this.setSolverType(JConfig.solverType);
		this._doingIntegration = false;
		this._bodies = [];
		this._collisions = [];
		this._effects=[];
		this._activeBodies = [];
		this._constraints = [];
		this._controllers = [];

		this._cachedContacts = [];
		this._collisionSystem = new CollisionSystemBrute();

		this.setGravity(JNumber3D.getScaleVector(Vector3DUtil.Y_AXIS, -10));
	};
	
	PhysicsSystem.prototype._currentPhysicsSystem=null;

	PhysicsSystem.prototype._maxVelMag = 0.5;
	PhysicsSystem.prototype._minVelForProcessing = 0.001;

	PhysicsSystem.prototype._bodies = null;
	PhysicsSystem.prototype._activeBodies=null;
	PhysicsSystem.prototype._collisions=null;
	PhysicsSystem.prototype._constraints=null;
	PhysicsSystem.prototype._controllers=null;
	PhysicsSystem.prototype._effects=null;

	PhysicsSystem.prototype._gravityAxis=null;
	PhysicsSystem.prototype._gravity=null;

	PhysicsSystem.prototype._doingIntegration=null;

	PhysicsSystem.prototype.preProcessCollisionFn=function(){};
	PhysicsSystem.prototype.preProcessContactFn=function(){};
	PhysicsSystem.prototype.processCollisionFn=function(){};
	PhysicsSystem.prototype.processContactFn=function(){};

	PhysicsSystem.prototype._cachedContacts=null;
	PhysicsSystem.prototype._collisionSystem=null;
	
	/**
	 * @function getInstance returns the singleton instance
	 * @type PhysicsSystem
	 **/
	PhysicsSystem.getInstance=function(){
		if (!PhysicsSystem._currentPhysicsSystem){
			PhysicsSystem._currentPhysicsSystem = new PhysicsSystem();
		}
		return PhysicsSystem._currentPhysicsSystem;
	};
	
	/**
	 * @function getAllExternalForces
	 * @type void
	 **/
	PhysicsSystem.prototype.getAllExternalForces=function(dt){
		for(var i=0, bl=this._bodies.length; i<bl; i++){
			this._bodies[i].addExternalForces(dt);
		}

		for(var i=0, cl=this._controllers.length; i<cl; i++){
			this._controllers[i].updateController(dt);
		}
	};
	//TODO document here
	PhysicsSystem.prototype.setCollisionSystem=function(collisionSystemGrid, sx, sy, sz, nx, ny, nz, dx, dy, dz){
		if(sx==undefined) sx=0;
		if(sy==undefined) sy=0;
		if(sz==undefined) sz=0;
		if(nx==undefined) nx=20;
		if(ny==undefined) ny=20;
		if(nz==undefined) nz=20;
		if(dx==undefined) dx=200;
		if(dy==undefined) dy=200;
		if(dz==undefined) dz=200;
		// which collisionsystem to use grid / brute
		if (collisionSystemGrid){
			this._collisionSystem = new CollisionSystemGrid(sx, sy, sz, nx, ny, nz, dx, dy, dz);
		}else{
			this._collisionSystem = new CollisionSystemBrute(); // brute by default      
		}
	};

	/**
	 * @function getCollisionSystem getter for _collisionSystem
	 * @type CollisionSystem
	 **/
	PhysicsSystem.prototype.getCollisionSystem=function(){
		return this._collisionSystem;
	};

	/**
	 * @function setGravity
	 * @param {array} gravity a 3D vector
	 * @type void
	 **/
	PhysicsSystem.prototype.setGravity=function(gravity){
		this._gravity = gravity;
		if (this._gravity[0] == this._gravity[1] && this._gravity[1] == this._gravity[2])
			this._gravityAxis = -1;

		this._gravityAxis = 0;
		
		if (Math.abs(this._gravity[1]) > Math.abs(this._gravity[2]))
			this._gravityAxis = 1;

		if (Math.abs(this._gravity[2]) > Math.abs(this._gravity[this._gravityAxis]))
			this._gravityAxis = 2;
	};

	/**
	 * @function get_gravity global gravity acceleration
	 * @type array
	 **/
	PhysicsSystem.prototype.get_gravity=function(){
		return this._gravity;
	};

	/**
	 * @function get_gravityAxis getter for _gravityAxis
	 * @type number
	 **/
	PhysicsSystem.prototype.get_gravityAxis=function(){
		return this._gravityAxis;
	};

	/**
	 * @function get_bodies getter for _bodies
	 * @type array
	 **/
	PhysicsSystem.prototype.get_bodies=function(){
		return this._bodies;
	};

	/**
	 * @function addBody add a RigidBody to the simulation
	 * @param {RigidBody} body
	 * @type void
	 **/
	PhysicsSystem.prototype.addBody=function(body){
		if (!this.findBody(body)){
			this._bodies.push(body);
			this._collisionSystem.addCollisionBody(body);
		}
	};

	/**
	 * @function removeBody remove a RigidBody from the simulation
	 * @param {RigidBody} body
	 * @type void
	 **/
	PhysicsSystem.prototype.removeBody=function(body){
		if (this.findBody(body)){
			this._bodies.splice(this._bodies.indexOf(body), 1);
			this._collisionSystem.removeCollisionBody(body);
		}
	};

	/**
	 * @function removeAllBodies remove all bodies from the simulation
	 * @type void
	 **/
	PhysicsSystem.prototype.removeAllBodies=function(){
		this._bodies = [];
		this._collisionSystem.removeAllCollisionBodies();
	};

	/**
	 * @function addConstraint add a constraint to the simulation
	 * @param {JConstraint} constraint
	 * @type void
	 **/
	PhysicsSystem.prototype.addConstraint=function(constraint){
		if (!this.findConstraint(constraint))
			this._constraints.push(constraint);
	};
	
	/**
	 * @function removeConstraint remove a constraint from the simulation
	 * @param {JConstraint} constraint
	 * @type void
	 **/
	PhysicsSystem.prototype.removeConstraint=function(constraint){
		if (this.findConstraint(constraint))
			this._constraints.splice(this._constraints.indexOf(constraint), 1);
	};

	/**
	 * @function removeAllConstraints remove all constraints from the simulation
	 * @type void
	 **/
	PhysicsSystem.prototype.removeAllConstraints=function(){
		this._constraints = [];
	};
	
	/**
	 * @function addEffect add an effect to the simulation
	 * @param {JEffect} effect
	 * @type void
	 **/
	PhysicsSystem.prototype.addEffect=function(effect){
		if (!this.findEffect(effect))
			this._effects.push(effect);
	};
	
	/**
	 * @function removeEffect remove an effect from the simulation
	 * @param {JEffect} effect
	 * @type void
	 **/
	PhysicsSystem.prototype.removeEffect=function(effect){
		if (this.findEffect(effect))
			this._effects.splice(this._effects.indexOf(effect), 1);
	};

	/**
	 * @function removeAllEffects remove all effects from the simulation
	 * @type void
	 **/
	PhysicsSystem.prototype.removeAllEffects=function(){
		this._effects = [];
	};

	/**
	 * @function addController add a physics controller to the simulation
	 * @param {PhysicsController} controller
	 * @type void
	 **/
	PhysicsSystem.prototype.addController=function(controller){
		if (!this.findController(controller))
			this._controllers.push(controller);
	};

	/**
	 * @function removeController remove a physics controller from the simulation
	 * @param {PhysicsController} controller
	 * @type void
	 **/
	PhysicsSystem.prototype.removeController=function(controller){
		if (this.findController(controller))
			this._controllers.splice(this._controllers.indexOf(controller), 1);
	};

	/**
	 * @function removeAllControllers remove all physics controllers from the simulation
	 * @type void
	 **/
	PhysicsSystem.prototype.removeAllControllers=function(){
		this._controllers = [];
	};

	/**
	 * @function setSolverType select which solver type should be used for the simulation
	 * @see JConfig.solverType
	 * @param {string} type
	 * @type void
	 **/
	PhysicsSystem.prototype.setSolverType=function(type){
		switch (type)
		{
			case "FAST":
				this.preProcessCollisionFn = this.preProcessCollisionFast;
				this.preProcessContactFn = this.preProcessCollisionFast;
				this.processCollisionFn = this.processCollision;
				this.processContactFn = this.processCollision;
				return;
			case "NORMAL":
				this.preProcessCollisionFn = this.preProcessCollisionNormal;
				this.preProcessContactFn = this.preProcessCollisionNormal;
				this.processCollisionFn = this.processCollision;
				this.processContactFn = this.processCollision;
				return;
			case "ACCUMULATED":
				this.preProcessCollisionFn = this.preProcessCollisionAccumulated;
				this.preProcessContactFn = this.preProcessCollisionAccumulated;
				this.processCollisionFn = this.processCollision;
				this.processContactFn = this.processCollisionAccumulated;
				return;
			default:
				this.preProcessCollisionFn = this.preProcessCollisionNormal;
				this.preProcessContactFn = this.preProcessCollisionNormal;
				this.processCollisionFn = this.processCollision;
				this.processContactFn = this.processCollision;
				return;
		}
	};

	/**
	 * @function findBody find a body in _bodies
	 * @param {RigidBody} body
	 * @returns true if the body is found, otherwise false
	 * @type boolean
	 **/
	PhysicsSystem.prototype.findBody=function(body){
		return (this._bodies.indexOf(body)>-1);
	};

	/**
	 * @function findConstraint find a constraint in _constraints
	 * @param {JConstraint} constraint
	 * @returns true if the constraint is found, otherwise false
	 * @type boolean
	 **/
	PhysicsSystem.prototype.findConstraint=function(constraint){
		var i=this._constraints.length-1;
		if (i > 0) do { if(constraint==this._constraints[i]) return true; } while (i--);
		return false;
	};
	
	/**
	 * @function findEffect find an effect in _effects
	 * @param {JEffect} effect
	 * @returns true if the effect is found, otherwise false
	 * @type boolean
	 **/
	PhysicsSystem.prototype.findEffect=function(effect){
		var i=this._effects.length-1;
		if (i > 0) do { if(effect==this._effects[i]) return true; } while (i--);
		return false;
	};

	/**
	 * @function findController find a controller in _controllers
	 * @param {PhysicsController} controller
	 * @returns true if the controller is found, otherwise false
	 * @type boolean
	 **/
	PhysicsSystem.prototype.findController=function(controller){
		var i=this._controllers.length-1;
		if (i > 0) do { if(controller==this._controllers[i]) return true; } while (i--);
		return false;
	};

	/**
	 * @function preProcessCollisionFast a fast-but-inaccurate pre-processor
	 * @param {CollisionInfo} collision
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	PhysicsSystem.prototype.preProcessCollisionFast=function(collision, dt){
		collision.satisfied=false;

		var body0 = collision.objInfo.body0;
		var body1 = collision.objInfo.body1;

		var N = collision.dirToBody;
		var timescale = JConfig.numPenetrationRelaxationTimesteps * dt;
		var approachScale = 0;
		var ptInfo;
		var tempV;
		var ptNum = collision.pointInfo.length;
		var numTiny = JNumber3D.NUM_TINY;

		if (ptNum > 1){
			var avR0 = [0,0,0,0];
			var avR1 = [0,0,0,0];
			var avDepth = 0;

			for (var i = 0; i < ptNum; i++){
				ptInfo = collision.pointInfo[i];
				avR0 = Vector3DUtil.add(avR0, ptInfo.r0);
				avR1 = Vector3DUtil.add(avR1, ptInfo.r1);
				avDepth += ptInfo.initialPenetration;
			}
			avR0 = JNumber3D.getDivideVector(avR0, ptNum);
			avR1 = JNumber3D.getDivideVector(avR1, ptNum);
			avDepth /= ptNum;

			var colPI = new CollPointInfo();
			colPI.r0 = avR0;
			colPI.r1 = avR1;
			colPI.initialPenetration = avDepth;
			collision.pointInfo = [colPI];
		}
		
		// removed loop because collision.pointInfo.length can only ever be 1 - Jim Sangwine
		ptInfo = collision.pointInfo[0];
		if (!body0.get_movable()){
			ptInfo.denominator = 0;
		}else{
			tempV = Vector3DUtil.crossProduct(ptInfo.r0, N);
			JMatrix3D.multiplyVector(body0.get_worldInvInertia(), tempV);
			ptInfo.denominator = body0.get_invMass() + Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempV, ptInfo.r0));
		}
		if (body1.get_movable()){
			tempV = Vector3DUtil.crossProduct(ptInfo.r1, N);
			JMatrix3D.multiplyVector(body1.get_worldInvInertia(), tempV);
			ptInfo.denominator += (body1.get_invMass() + Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempV, ptInfo.r1)));
		}
		if (ptInfo.denominator < numTiny)
			ptInfo.denominator = numTiny;

		if (ptInfo.initialPenetration > JConfig.allowedPenetration){
			ptInfo.minSeparationVel = (ptInfo.initialPenetration - JConfig.allowedPenetration) / timescale;
		}else{
			approachScale = -0.1 * (ptInfo.initialPenetration - JConfig.allowedPenetration) / JConfig.allowedPenetration;
			if (approachScale < numTiny)
				approachScale = numTiny;
			else if (approachScale > 1)
				approachScale = 1;
			var max = (dt > numTiny) ? dt : numTiny; // ~7x quicker than Math.max in Chromium, ~4x quicker in WebKit and marginally slower in Minefield
			ptInfo.minSeparationVel = approachScale * (ptInfo.initialPenetration - JConfig.allowedPenetration) / max;
		}
		
		if (ptInfo.minSeparationVel > this._maxVelMag)
			ptInfo.minSeparationVel = this._maxVelMag;
	};

	/**
	 * @function preProcessCollisionNormal a special pre-processor for the normal solver
	 * @param {CollisionInfo} collision
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	PhysicsSystem.prototype.preProcessCollisionNormal=function(collision, dt){
		collision.satisfied = false;

		var body0 = collision.objInfo.body0;
		var body1 = collision.objInfo.body1;

		var N = collision.dirToBody;
		var timescale= JConfig.numPenetrationRelaxationTimesteps * dt;
		var approachScale = 0;
		var ptInfo;
		var tempV;
		var len= collision.pointInfo.length;
		for (var i = 0; i < len; i++){
			ptInfo = collision.pointInfo[i];
			if (!body0.get_movable()){
				ptInfo.denominator = 0;
			}else{
				tempV = Vector3DUtil.crossProduct(ptInfo.r0, N);
				JMatrix3D.multiplyVector(body0.get_worldInvInertia(), tempV);
				ptInfo.denominator = body0.get_invMass() + Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempV, ptInfo.r0));
			}

			if (body1.get_movable()){
				tempV = Vector3DUtil.crossProduct(ptInfo.r1, N);
				JMatrix3D.multiplyVector(body1.get_worldInvInertia(), tempV);
				ptInfo.denominator += (body1.get_invMass() + Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempV, ptInfo.r1)));
			}

			if (ptInfo.denominator < JNumber3D.NUM_TINY)
				ptInfo.denominator = JNumber3D.NUM_TINY;

			if (ptInfo.initialPenetration > JConfig.allowedPenetration){
				ptInfo.minSeparationVel = (ptInfo.initialPenetration - JConfig.allowedPenetration) / timescale;
			}else{
				approachScale = -0.1 * (ptInfo.initialPenetration - JConfig.allowedPenetration) / JConfig.allowedPenetration;
				if (approachScale < JNumber3D.NUM_TINY)
					approachScale = JNumber3D.NUM_TINY;
				else if (approachScale > 1)
					approachScale = 1;
				
				var max=(dt > JNumber3D.NUM_TINY) ? dt : JNumber3D.NUM_TINY;
				ptInfo.minSeparationVel = approachScale * (ptInfo.initialPenetration - JConfig.allowedPenetration) / max;
			}
			if (ptInfo.minSeparationVel > this._maxVelMag)
				ptInfo.minSeparationVel = this._maxVelMag;
		}
	};

	/**
	 * @function preProcessCollisionAccumulated a special pre-processor for the accumulated solver
	 * @param {CollisionInfo} collision
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	PhysicsSystem.prototype.preProcessCollisionAccumulated=function(collision, dt){
		collision.satisfied = false;
		var body0 = collision.objInfo.body0;
		var body1 = collision.objInfo.body1;
		var N = collision.dirToBody;
		var timescale = JConfig.numPenetrationRelaxationTimesteps * dt;
		var tempV;
		var ptInfo;
		var initMinAllowedPen;
		var approachScale = 0;
		var numTiny = JNumber3D.NUM_TINY;
		var allowedPenetration = JConfig.allowedPenetration;
		var len = collision.pointInfo.length;
		for (var i = 0; i < len; i++){
			ptInfo = collision.pointInfo[i];
			initMinAllowedPen = ptInfo.initialPenetration - allowedPenetration;
			if (!body0.get_movable()){
				ptInfo.denominator = 0;
			}else{
				tempV = Vector3DUtil.crossProduct(ptInfo.r0, N);
				JMatrix3D.multiplyVector(body0.get_worldInvInertia(), tempV);
				ptInfo.denominator = body0.get_invMass() + Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempV, ptInfo.r0));
			}

			if (body1.get_movable()){
				tempV = Vector3DUtil.crossProduct(ptInfo.r1, N);
				JMatrix3D.multiplyVector(body1.get_worldInvInertia(), tempV);
				ptInfo.denominator += (body1.get_invMass() + Vector3DUtil.dotProduct(N, Vector3DUtil.crossProduct(tempV, ptInfo.r1)));
			}
			if (ptInfo.denominator < numTiny) ptInfo.denominator = numTiny;

			if (ptInfo.initialPenetration > allowedPenetration){
				ptInfo.minSeparationVel = initMinAllowedPen / timescale;
			}else{
				approachScale = -0.1 * initMinAllowedPen / allowedPenetration;
				
				if (approachScale < numTiny) approachScale = numTiny;
				else if (approachScale > 1) approachScale = 1;
				
				var max=(dt>numTiny) ? dt : numTiny;
				ptInfo.minSeparationVel = approachScale * initMinAllowedPen / max;
			}

			ptInfo.accumulatedNormalImpulse = 0;
			ptInfo.accumulatedNormalImpulseAux = 0;
			ptInfo.accumulatedFrictionImpulse = [0,0,0,0];

			var bestDistSq = 0.04;
			var bp = new BodyPair(body0, body1, [0,0,0,0], [0,0,0,0]);

			for(var j=0, ccl=this._cachedContacts.length; j<ccl; j++){
				var cont=this._cachedContacts[j];
				var cpair=cont.pair;

				if (bp.body0 != cpair.body0 || bp.body1 == cpair.body1)
					continue;

				var distSq = (cpair.body0 == body0)  ? Vector3DUtil.get_lengthSquared(Vector3DUtil.subtract(cpair.r, ptInfo.r0)) 
													 : Vector3DUtil.get_lengthSquared(Vector3DUtil.subtract(cpair.r, ptInfo.r1));

				if (distSq < bestDistSq){
					bestDistSq = distSq;
					ptInfo.accumulatedNormalImpulse = this._cachedContacts[j].impulse.normalImpulse;
					ptInfo.accumulatedNormalImpulseAux = this._cachedContacts[j].impulse.normalImpulseAux;
					ptInfo.accumulatedFrictionImpulse = this._cachedContacts[j].impulse.frictionImpulse;
					if (this._cachedContacts[j].pair.body0 != body0){
						ptInfo.accumulatedFrictionImpulse = JNumber3D.getScaleVector(ptInfo.accumulatedFrictionImpulse, -1);
					}
				}
			}
			
			var impulse;
			if (ptInfo.accumulatedNormalImpulse != 0){
				impulse = JNumber3D.getScaleVector(N, ptInfo.accumulatedNormalImpulse);
				impulse = Vector3DUtil.add(impulse, ptInfo.accumulatedFrictionImpulse);
				body0.applyBodyWorldImpulse(impulse, ptInfo.r0);
				body1.applyBodyWorldImpulse(JNumber3D.getScaleVector(impulse, -1), ptInfo.r1);
			}
			if (ptInfo.accumulatedNormalImpulseAux != 0){
				impulse = JNumber3D.getScaleVector(N, ptInfo.accumulatedNormalImpulseAux);
				body0.applyBodyWorldImpulseAux(impulse, ptInfo.r0);
				body1.applyBodyWorldImpulseAux(JNumber3D.getScaleVector(impulse, -1), ptInfo.r1);
			}
		}
	};
	
	/**
	 * @function processCollision handle an individual collision by classifying it, calculating
	 * impulse, applying impulse and updating the velocities of the objects. Allows over-riding of the elasticity.
	 * 
	 * @param {CollisionInfo} collision
	 * @param {number} dt a UNIX timestamp
	 * @returns true if an impulse was applied, otherwise false
	 * @type boolean
	 **/
	PhysicsSystem.prototype.processCollision=function(collision, dt){
		collision.satisfied = true;

		var body0 = collision.objInfo.body0;
		var body1 = collision.objInfo.body1;

		var gotOne = false;
		var N = collision.dirToBody;

		var deltaVel = 0;
		var normalVel = 0;
		var finalNormalVel = 0;
		var normalImpulse= 0;
		var impulse;
		var Vr0;
		var Vr1;
		var ptInfo;
		
		// tracking var for the collision event
		var appliedImpulse = [0,0,0,0];
		
		var len = collision.pointInfo.length;
		for (var i = 0; i < len; i++){
			ptInfo = collision.pointInfo[i];

			Vr0 = body0.getVelocity(ptInfo.r0);
			Vr1 = body1.getVelocity(ptInfo.r1);

			normalVel = Vector3DUtil.dotProduct(Vector3DUtil.subtract(Vr0, Vr1), N);
			if (normalVel > ptInfo.minSeparationVel)
				continue;

			finalNormalVel = -1 * collision.mat.get_restitution() * normalVel;
			if (finalNormalVel < this._minVelForProcessing)
				finalNormalVel = ptInfo.minSeparationVel;

			deltaVel = finalNormalVel - normalVel;
			if (deltaVel <= this._minVelForProcessing)
				continue;

			normalImpulse = deltaVel / ptInfo.denominator;

			gotOne = true;
			impulse = JNumber3D.getScaleVector(N, normalImpulse);
			appliedImpulse = Vector3DUtil.add(appliedImpulse, impulse); // keep track of the total impulse applied

			body0.applyBodyWorldImpulse(impulse, ptInfo.r0);
			body1.applyBodyWorldImpulse(JNumber3D.getScaleVector(impulse, -1), ptInfo.r1);

			Vr0 = body0.getVelocity(ptInfo.r0);
			Vr1 = body1.getVelocity(ptInfo.r1);

			var tempV;
			var VR = Vr0.slice(0);
			if(body1.get_movable()) VR = Vector3DUtil.subtract(Vr0, Vr1);
			var tangent_vel = Vector3DUtil.subtract(VR, JNumber3D.getScaleVector(N, Vector3DUtil.dotProduct(VR, N)));
			var tangent_speed = Vector3DUtil.get_length(tangent_vel);

			if (tangent_speed > this._minVelForProcessing){
				var T = JNumber3D.getDivideVector(tangent_vel, -tangent_speed);
				var denominator = 0;

				if (body0.get_movable()){
					tempV = Vector3DUtil.crossProduct(ptInfo.r0, T);
					JMatrix3D.multiplyVector(body0.get_worldInvInertia(), tempV);
					denominator = body0.get_invMass() + Vector3DUtil.dotProduct(T, Vector3DUtil.crossProduct(tempV, ptInfo.r0));
				}

				if (body1.get_movable()){
					tempV = Vector3DUtil.crossProduct(ptInfo.r1, T);
					JMatrix3D.multiplyVector(body1.get_worldInvInertia(), tempV);
					denominator += (body1.get_invMass() + Vector3DUtil.dotProduct(T, Vector3DUtil.crossProduct(tempV, ptInfo.r1)));
				}

				if (denominator > JNumber3D.NUM_TINY){
					var impulseToReverse = tangent_speed / denominator;
					T = JNumber3D.getScaleVector(T, impulseToReverse);
					body0.applyBodyWorldImpulse(T, ptInfo.r0);
					body1.applyBodyWorldImpulse(JNumber3D.getScaleVector(T, -1), ptInfo.r1);
				}
			}
		}

		if (gotOne){
			body0.setConstraintsAndCollisionsUnsatisfied();
			body1.setConstraintsAndCollisionsUnsatisfied();
			// dispatch collision events
			if(Vector3DUtil.get_length(appliedImpulse)>0){ //only fire event if the impulse size is greater then zero
				body0.dispatchEvent(new JCollisionEvent(body1, appliedImpulse));
				body1.dispatchEvent(new JCollisionEvent(body0, JNumber3D.getScaleVector(appliedImpulse, -1)));
			}
		}
		return gotOne;
	};

	/**
	 * @function processCollisionAccumulated accumulated and clamp impulses
	 * 
	 * @param {CollisionInfo} collision
	 * @param {number} dt a UNIX timestamp
	 * @returns true if an impulse was applied, otherwise false
	 * @type boolean
	 **/
	PhysicsSystem.prototype.processCollisionAccumulated=function(collision, dt){
		collision.satisfied = true;
		var gotOne = false;
		var N = collision.dirToBody;
		var body0 = collision.objInfo.body0;
		var body1 = collision.objInfo.body1;

		var deltaVel = 0;
		var normalVel = 0;
		var normalImpulse = 0;
		var impulse;
		var Vr0;
		var Vr1;
		var ptInfo;
		
		// tracking var for the collision event
		var appliedImpulse = [0,0,0,0];
		
		var len = collision.pointInfo.length;
		for (var i = 0; i < len; i++){
			ptInfo = collision.pointInfo[i];

			Vr0 = body0.getVelocity(ptInfo.r0);
			Vr1 = body1.getVelocity(ptInfo.r1);
			normalVel = Vector3DUtil.dotProduct(Vector3DUtil.subtract(Vr0, Vr1), N);
			deltaVel = -normalVel;
			if (ptInfo.minSeparationVel < 0)
				deltaVel += ptInfo.minSeparationVel;

			if (Math.abs(deltaVel) > this._minVelForProcessing){
				normalImpulse = deltaVel / ptInfo.denominator;
				var origAccumulatedNormalImpulse = ptInfo.accumulatedNormalImpulse;
				var accImpulse=(origAccumulatedNormalImpulse + normalImpulse);
				if (accImpulse<0) accImpulse = 0;
				ptInfo.accumulatedNormalImpulse = accImpulse;
				var actualImpulse = accImpulse - origAccumulatedNormalImpulse;

				impulse = JNumber3D.getScaleVector(N, actualImpulse);
				appliedImpulse = Vector3DUtil.add(appliedImpulse, impulse); // keep track of the total impulse applied
				
				body0.applyBodyWorldImpulse(impulse, ptInfo.r0);
				body1.applyBodyWorldImpulse(JNumber3D.getScaleVector(impulse, -1), ptInfo.r1);

				gotOne = true;
			}

			Vr0 = body0.getVelocityAux(ptInfo.r0);
			Vr1 = body1.getVelocityAux(ptInfo.r1);
			normalVel = Vector3DUtil.dotProduct(Vector3DUtil.subtract(Vr0, Vr1), N);

			deltaVel = -normalVel;
			if (ptInfo.minSeparationVel > 0)
				deltaVel += ptInfo.minSeparationVel;

			if (Math.abs(deltaVel) > this._minVelForProcessing){
				normalImpulse = deltaVel / ptInfo.denominator;
				origAccumulatedNormalImpulse = ptInfo.accumulatedNormalImpulseAux;
				var accImpulseAux=ptInfo.accumulatedNormalImpulseAux + normalImpulse;
				if (accImpulseAux < 0) accImpulseAux = 0;
				ptInfo.accumulatedNormalImpulseAux = accImpulseAux;
				actualImpulse = accImpulseAux - origAccumulatedNormalImpulse;

				impulse = JNumber3D.getScaleVector(N, actualImpulse);
				body0.applyBodyWorldImpulseAux(impulse, ptInfo.r0);
				body1.applyBodyWorldImpulseAux(JNumber3D.getScaleVector(impulse, -1), ptInfo.r1);

				gotOne = true;
			}

			if (ptInfo.accumulatedNormalImpulse > 0){
				Vr0 = body0.getVelocity(ptInfo.r0);
				Vr1 = body1.getVelocity(ptInfo.r1);
				var tempV;
				var VR = Vector3DUtil.subtract(Vr0, Vr1);
				var tangent_vel = Vector3DUtil.subtract(VR, JNumber3D.getScaleVector(N, Vector3DUtil.dotProduct(VR, N)));
				var tangent_speed = Vector3DUtil.get_length(tangent_vel);
				if (tangent_speed > this._minVelForProcessing){
					var T= JNumber3D.getScaleVector(JNumber3D.getDivideVector(tangent_vel, tangent_speed), -1);
					var denominator = 0;
					if (body0.get_movable()){
						tempV = Vector3DUtil.crossProduct(ptInfo.r0, T);
						JMatrix3D.multiplyVector(body0.get_worldInvInertia(), tempV);
						denominator = body0.invMass + Vector3DUtil.dotProduct(T, Vector3DUtil.crossProduct(tempV, ptInfo.r0));
					}
					if (body1.get_movable()){
						tempV = Vector3DUtil.crossProduct(ptInfo.r1, T);
						JMatrix3D.multiplyVector(body1.get_worldInvInertia(), tempV);
						denominator += (body1.invMass + Vector3DUtil.dotProduct(T, Vector3DUtil.crossProduct(tempV, ptInfo.r1)));
					}
					if (denominator > JNumber3D.NUM_TINY){
						var impulseToReverse = tangent_speed / denominator;
						var frictionImpulseVec = JNumber3D.getScaleVector(T, impulseToReverse);

						var origAccumulatedFrictionImpulse = ptInfo.accumulatedFrictionImpulse.slice(0);
						ptInfo.accumulatedFrictionImpulse = Vector3DUtil.add(ptInfo.accumulatedFrictionImpulse, frictionImpulseVec);

						var AFIMag = Vector3DUtil.get_length(ptInfo.accumulatedFrictionImpulse);
						var maxAllowedAFIMag = collision.mat.friction * ptInfo.accumulatedNormalImpulse;

						if (AFIMag > JNumber3D.NUM_TINY && AFIMag > maxAllowedAFIMag)
							ptInfo.accumulatedFrictionImpulse = JNumber3D.getScaleVector(ptInfo.accumulatedFrictionImpulse, maxAllowedAFIMag / AFIMag);

						var actualFrictionImpulse = Vector3DUtil.subtract(ptInfo.accumulatedFrictionImpulse, origAccumulatedFrictionImpulse);

						body0.applyBodyWorldImpulse(actualFrictionImpulse, ptInfo.r0);
						body1.applyBodyWorldImpulse(JNumber3D.getScaleVector(actualFrictionImpulse, -1), ptInfo.r1);
					}
				}
			}
		}
		if (gotOne)
		{
			body0.setConstraintsAndCollisionsUnsatisfied();
			body1.setConstraintsAndCollisionsUnsatisfied();
			// dispatch collision events
			if(Vector3DUtil.get_length(appliedImpulse)>0){ //only fire event if the impulse size is greater then zero
				body0.dispatchEvent(new JCollisionEvent(body1, appliedImpulse));
				body1.dispatchEvent(new JCollisionEvent(body0, JNumber3D.getScaleVector(appliedImpulse, -1)));
			}
		}
		return gotOne;
	};
	
	
	/**
	 * @function sortPositionX
	 * 
	 * @param {RigidBody} body0
	 * @param {RigidBody} body1
	 * @type number
	 **/
	PhysicsSystem.prototype.sortPositionX=function(body0, body1){
		if (body0.get_currentState().position[0] < body1.get_currentState().position[0])
			return -1;
		else if (body0.get_currentState().position[0] > body1.get_currentState().position[0])
			return 1;
		else
			return 0;
	};
                
	/**
	 * @function sortPositionY
	 * 
	 * @param {RigidBody} body0
	 * @param {RigidBody} body1
	 * @type number
	 **/
	PhysicsSystem.prototype.sortPositionY=function(body0, body1){
		if (body0.get_currentState().position[1] < body1.get_currentState().position[1])
			return -1;
		else if (body0.get_currentState().position[1] > body1.get_currentState().position[1])
			return 1;
		else
			return 0;
	};
                
	/**
	 * @function sortPositionZ
	 * 
	 * @param {RigidBody} body0
	 * @param {RigidBody} body1
	 * @type number
	 **/
	PhysicsSystem.prototype.sortPositionZ=function(body0, body1){
		if (body0.get_currentState().position[2] < body1.get_currentState().position[2])
			return -1;
		else if (body0.get_currentState().position[2] > body1.get_currentState().position[2])
			return 1;
		else
			return 0;
	};
                
	/**
	 * @function doShockStep the shock step helps with stacking
	 * @see JConfig.doShockStep
	 * @param {RigidBody} body0
	 * @param {RigidBody} body1
	 * @type void
	 **/
	PhysicsSystem.prototype.doShockStep=function(dt){
		if (Math.abs(this._gravity[0]) > Math.abs(this._gravity[1]) && Math.abs(this._gravity[0]) > Math.abs(this._gravity[2])){
			this._bodies = this._bodies.sort(this.sortPositionX);
			this._collisionSystem.collBody = this._collisionSystem.collBody.sort(this.sortPositionX);
		}else if (Math.abs(this._gravity[1]) > Math.abs(this._gravity[2]) && Math.abs(this._gravity[1]) > Math.abs(this._gravity[0])){
			this._bodies = this._bodies.sort(this.sortPositionY);
			this._collisionSystem.collBody = this._collisionSystem.collBody.sort(this.sortPositionY);
		}else if (Math.abs(this._gravity[2]) > Math.abs(this._gravity[0]) && Math.abs(this._gravity[2]) > Math.abs(this._gravity[1])){
			this._bodies = this._bodies.sort(this.sortPositionZ);
			this._collisionSystem.collBody = this._collisionSystem.collBody.sort(this.sortPositionZ);
		}
                        
		var info;
		var setImmovable;
		var gotOne = true;
		var body_collisions=[];
                        
		var body0;
		var body1;
                        

		while (gotOne){
			gotOne = false;
			for(var i=0;i<this._bodies.length;i++){
				var body=this._bodies[i];
				if (body.get_movable() && body.get_doShockProcessing()){
					if (body.collisions.length == 0 || !body.isActive){
						body.internalSetImmovable();
					}else{
						setImmovable = false;
						body_collisions = body.collisions;
						for(var j=0;j<body_collisions.length;j++){
							info=body_collisions[j];

							body0 = info.objInfo.body0;
							body1 = info.objInfo.body1;
                                                                
							if ((body0 == body && !body1.get_movable()) || (body1 == body && !body0.get_movable())){
								this.preProcessCollisionFast(info, dt);
								this.processCollision(info, dt);
								setImmovable = true;
							}
						}
                                                        
						if (setImmovable){
							body.internalSetImmovable();
							gotOne = true;
						}
					}
				}
			}
		}

		for(var i=0;i<this._bodies.length;i++){
			body=this._bodies[i];
			body.internalRestoreImmovable();
			body_collisions = body.collisions;
			for(var j=0;j<body_collisions.length;j++){
				info=body_collisions[j];
				this.preProcessCollisionFn(info, dt);
				this.processCollisionFn(info, dt);
			}
		}
	};
	
	/**
	 * @function updateContactCache
	 * @type void
	 **/
	PhysicsSystem.prototype.updateContactCache=function(){
		this._cachedContacts = [];
		var ptInfo;
		var fricImpulse;
		var contact;
		for(var i=0, cl=this._collisions.length; i<cl; i++){
			var collInfo=this._collisions[i];
			for (var j=0, pilen=collInfo.pointInfo.length; j<pilen; j++){
				ptInfo = collInfo.pointInfo[j];
				fricImpulse = (collInfo.objInfo.body0.id > collInfo.objInfo.body1.id) ? ptInfo.accumulatedFrictionImpulse : JNumber3D.getScaleVector(ptInfo.accumulatedFrictionImpulse, -1);

				contact = new ContactData();
				contact.pair = new BodyPair(collInfo.objInfo.body0, collInfo.objInfo.body1, ptInfo.r0, ptInfo.r1);
				contact.impulse = new CachedImpulse(ptInfo.accumulatedNormalImpulse, ptInfo.accumulatedNormalImpulseAux, ptInfo.accumulatedFrictionImpulse);

				this._cachedContacts.push(contact);
			}
		}
	};

	/**
	 * @function handleAllConstraints applies all constraints registered with the PhysicsSystem
	 * @param {number} dt a UNIX timestamp
	 * @param {number} iter
	 * @param {boolean} forceInelastic
	 * @type void
	 **/
	PhysicsSystem.prototype.handleAllConstraints=function(dt, iter, forceInelastic){
		var origNumCollisions = this._collisions.length;
		var collInfo;
		var _constraint;

		for(var i=0, cl=this._constraints.length; i<cl; i++){
			this._constraints[i].preApply(dt);
		}

		if (forceInelastic){
			for(var i=0, cl=this._collisions.length; i<cl; i++){
				this.preProcessContactFn(this._collisions[i], dt);
				this._collisions[i].mat.set_restitution(0);
				this._collisions[i].satisfied=false;
			}
		}else{
			for(var i=0, cl=this._collisions.length; i<cl;i++){
				this.preProcessCollisionFn(this._collisions[i], dt);
			}
		}

		var flag;
		var gotOne;
		var len;
		for (var step = 0; step < iter; step++){
			gotOne = false;

			for(var i=0, cl=this._collisions.length; i<cl;i++){
				collInfo=this._collisions[i];
				if (!collInfo.satisfied){
					if (forceInelastic){
						flag = this.processContactFn(collInfo, dt);
						gotOne = gotOne || flag;
					}else{
						flag = this.processCollisionFn(collInfo, dt);
						gotOne = gotOne || flag;
					}
				}
			}
			for(var i=0, cl=this._constraints.length; i<cl; i++){
				var _constraint=this._constraints[i];
				if (!_constraint.get_satisfied()){
					flag = _constraint.apply(dt);
					gotOne = gotOne || flag;
				}
			}
			this.tryToActivateAllFrozenObjects();

			if (forceInelastic){
				len = this._collisions.length;
				for (var j = origNumCollisions; j < len; j++){
					this._collisions[j].mat.set_restitution(0);
					this._collisions[j].satisfied=false;
					this.preProcessContactFn(this._collisions[j], dt);
				}
			}else{
				len = this._collisions.length;
				for (j = origNumCollisions; j < len; j++){
					this.preProcessCollisionFn(this._collisions[j], dt);
				}
			}
			origNumCollisions = this._collisions.length;
			if (!gotOne) break;
		}
	};

	/**
	 * @function handleAllEffects applies all effects registered with the PhysicsSystem
	 * @type void
	 **/
	PhysicsSystem.prototype.handleAllEffects=function(){
		var effect;
		var i=this._effects.length-1;
		if (i < 0) return;
		
		do {
			effect=this._effects[i];
			if (effect.enabled) effect.Apply();
		} while(i--);
	};
	
	/**
	 * @function activateObject 
	 * @param {RigidBody} body
	 * @type void
	 **/
	PhysicsSystem.prototype.activateObject=function(body){
		if (!body.get_movable() || body.isActive)
			return;

		body.setActive();
		this._activeBodies.push(body);
		var orig_num = this._collisions.length;
		this._collisionSystem.detectCollisions(body, this._collisions);
		var other_body;
		var thisBody_normal;
		for (var i=orig_num, len=this._collisions.length; i<len; i++){
			other_body = this._collisions[i].objInfo.body0;
			thisBody_normal = this._collisions[i].dirToBody;
			if (other_body == body){
				other_body = this._collisions[i].objInfo.body1;
				thisBody_normal = JNumber3D.getScaleVector(this._collisions[i].dirToBody, -1);
			}
			if (!other_body.isActive && Vector3DUtil.dotProduct(other_body.get_force(), thisBody_normal) < -JNumber3D.NUM_TINY)
				this.activateObject(other_body);
		}
	};

	/**
	 * @function dampAllActiveBodies 
	 * @type void
	 **/
	PhysicsSystem.prototype.dampAllActiveBodies=function(){
		for(var i=0, abl=this._activeBodies.length; i<abl; i++){
			_activeBody=this._activeBodies[i];
			_activeBody.dampForDeactivation();
		}
	};

	/**
	 * @function tryToActivateAllFrozenObjects 
	 * @type void
	 **/
	PhysicsSystem.prototype.tryToActivateAllFrozenObjects=function(){
		for(var i=0, bl=this._bodies.length; i<bl; i++){
			var _body=this._bodies[i];
			if (!_body.isActive){
				if (_body.getShouldBeActive()){
					this.activateObject(_body);
				}else{
					if (_body.getVelChanged()){
						_body.setVelocity([0,0,0,0]);
						_body.setAngVel([0,0,0,0]);
						_body.clearVelChanged();
					}
				}
			}	
		}
	};

	/**
	 * @function activateAllFrozenObjectsLeftHanging 
	 * @type void
	 **/
	PhysicsSystem.prototype.activateAllFrozenObjectsLeftHanging=function(){
		var other_body;
		for(var i=0, bl=this._bodies.length; i<bl; i++){
			var _body=this._bodies[i];
			if (_body.isActive){
				_body.doMovementActivations();
				if (_body.collisions.length > 0){
					for (var j=0, bcl=_body.collisions.length; j<bcl; j++){
						other_body = _body.collisions[j].objInfo.body0;
						if (other_body == _body)
							other_body = _body.collisions[j].objInfo.body1;

						if (!other_body.isActive)
							_body.addMovementActivation(_body.get_currentState().position, other_body);
					}
				}
			}
		}
	};

	/**
	 * @function updateAllVelocities
	 * @param {number} dt a UNIX timestamp 
	 * @type void
	 **/
	PhysicsSystem.prototype.updateAllVelocities=function(dt){
		for(var i=0, abl=this._activeBodies.length; i<abl; i++){
			_activeBody=this._activeBodies[i];
			_activeBody.updateVelocity(dt);
		}
	};

	/**
	 * @function updateAllPositions
	 * @param {number} dt a UNIX timestamp 
	 * @type void
	 **/
	PhysicsSystem.prototype.updateAllPositions=function(dt){
		for(var i=0, abl=this._activeBodies.length; i<abl; i++){
			_activeBody=this._activeBodies[i];
			_activeBody.updatePositionWithAux(dt);
		}
	};

	/**
	 * @function notifyAllPostPhysics
	 * @param {number} dt a UNIX timestamp 
	 * @type void
	 **/
	PhysicsSystem.prototype.notifyAllPostPhysics=function(dt){
		for(var i=0, abl=this._bodies.length; i<abl; i++){
			_body=this._bodies[i];
			_body.postPhysics(dt);
		}
	};

	/**
	 * @function updateAllObject3D
	 * @type void
	 **/
	PhysicsSystem.prototype.updateAllObject3D=function(){
		for(var i=0, abl=this._bodies.length; i<abl; i++){
			_body=this._bodies[i];
			_body.updateObject3D();
		}
	};

	/**
	 * @function limitAllVelocities
	 * @type void
	 **/
	PhysicsSystem.prototype.limitAllVelocities=function(){
		for(var i=0, abl=this._activeBodies.length; i<abl; i++){
			_activeBody=this._activeBodies[i];
			_activeBody.limitVel();
			_activeBody.limitAngVel();
		}
	};

	/**
	 * @function tryToFreezeAllObjects
	 * @param {number} dt a UNIX timestamp 
	 * @type void
	 **/
	PhysicsSystem.prototype.tryToFreezeAllObjects=function(dt){
		for(var i=0, abl=this._activeBodies.length; i<abl; i++){
			_activeBody=this._activeBodies[i];
			_activeBody.tryToFreeze(dt);
		}
	};

	/**
	 * @function detectAllCollisions
	 * @param {number} dt a UNIX timestamp 
	 * @type void
	 **/
	PhysicsSystem.prototype.detectAllCollisions=function(dt){
		for (var i=0, abl=this._activeBodies.length; i<abl; i++)
		{
			_activeBody=this._activeBodies[i];
			_activeBody.storeState();
		}
		
		this.updateAllVelocities(dt);
		this.updateAllPositions(dt);
		
		for (var i=0, bl=this._bodies.length; i<bl; i++)
		{
			_body=this._bodies[i];
			_body.collisions = [];
		}
		
		this._collisions = [];
		this._collisionSystem.detectAllCollisions(this._activeBodies, this._collisions);
		
		for (var i=0, abl=this._activeBodies.length; i<abl; i++)
		{
			_activeBody=this._activeBodies[i];
			_activeBody.restoreState();
		}
	};

	/**
	 * @function copyAllCurrentStatesToOld
	 * @type void
	 **/
	PhysicsSystem.prototype.copyAllCurrentStatesToOld=function(){
		for(var i=0, bl=this._bodies.length; i<bl; i++){
			_body=this._bodies[i];
			if (_body.isActive || _body.getVelChanged())
				_body.copyCurrentStateToOld();
		}
	};

	/**
	 * @function findAllActiveBodies
	 * @type void
	 **/
	PhysicsSystem.prototype.findAllActiveBodies=function(){
		this._activeBodies = [];
		for(var i=0, bl=this._bodies.length; i<bl; i++){
			var _body=this._bodies[i];
			if (_body.isActive)
				this._activeBodies.push(_body);
		}
	};

	/**
	 * @function integrate integrates the system forwards by dt 
	 * the caller is responsible for making sure that repeated calls to this use the same dt (if desired)
	 * @param {number} dt a UNIX timestamp 
	 * @type void
	 **/
	PhysicsSystem.prototype.integrate=function(dt){
		this._doingIntegration = true;

		this.findAllActiveBodies();
		this.copyAllCurrentStatesToOld();

		this.getAllExternalForces(dt);
		this.handleAllEffects();
		this.detectAllCollisions(dt);
		this.handleAllConstraints(dt, JConfig.numCollisionIterations, false);
		this.updateAllVelocities(dt);
		this.handleAllConstraints(dt, JConfig.numContactIterations, true);

		if (JConfig.doShockStep) {
			this.doShockStep(dt);
		}

		this.dampAllActiveBodies();
		this.tryToFreezeAllObjects(dt);
		this.activateAllFrozenObjectsLeftHanging();

		this.limitAllVelocities();

		this.updateAllPositions(dt);
		this.notifyAllPostPhysics(dt);

		this.updateAllObject3D();
		if (JConfig.solverType == "ACCUMULATED")
			this.updateContactCache();

		for(var i=0, bl=this._bodies.length; i<bl; i++){
			_body=this._bodies[i];
			_body.clearForces();
		}

		this._doingIntegration = false;
	};
	
	jigLib.PhysicsSystem=PhysicsSystem;
	

})(jigLib);(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	/**
	 * @author Jim Sangwine
	 * 
	 * This effect has a radius within which it will repel bodies depending on the defined force 
	 * and their distance (the closer the object, the stronger the effect). 
	 * 
	 * This effect will only be applied during a single cycle of the PhysicsSystem, imparting a sudden impulse.
	 * 
	 * This effect can either be placed at an arbitrary location in the scene, or it can be attached to a parent object.
	 * 
	 **/
	/**
	 * @author Jim Sangwine
	 * 
	 * @name Explosion
	 * @class Explosion an explosive force effect
	 * This effect has a radius within which it will repel bodies depending on the defined force 
	 * and their distance (the closer the object, the stronger the effect). 
	 * This effect will only be applied during a single cycle of the PhysicsSystem, imparting a sudden impulse.
	 * This effect can either be placed at an arbitrary location in the scene, or it can be attached to a parent object.
	 * 
	 * @extends JEffect
	 * @requires Vector3DUtil
	 * @property {array} location initial location of the effect expressed as a 3D vector
	 * @property {number} radius radius of effect - the distance at which the effect's influence will drop to zero
	 * @property {number} force the force of the effect at 0 distance (impulse will be force/distance)
	 * @property {RigidBody} parent optional - a RigidBody that the gravitational field will follow - excluded from the main effect force, but optionally receives relative force
	 * @property {boolean} relativity optional - toggle whether or not the parent receives a reactive impulse relative to that delivered to bodies falling within the effect radius 
	 * @constructor
	 * @param {array} _location initial location of the effect expressed as a 3D vector
	 * @param {number} _radius radius of effect
	 * @param {number} _force the force of the effect at 0 distance
	 * @param {RigidBody} _parent optional parent body
	 * @param {boolean} _relativity optional toggle whether or not the parent receives a reactive impulse
	 **/
	var Explosion=function(_location, _radius, _force, _parent, _relativity) {
		this.Super();
		this.location=_location;
		this.radius=_radius;
		this.force=_force;
		if (_parent) this.parent=_parent;
		if (_parent && _relativity) this.relativity=true;
		// set to NOT fire instantly...
		this.enabled = false;
	};
	jigLib.extend(Explosion,jigLib.JEffect);

	Explosion.prototype.location = null;
	Explosion.prototype.radius = null;
	Explosion.prototype.force = null;
	Explosion.prototype.parent = null;
	Explosion.prototype.relativity = false;

	/**
	 * @function explode triggers the effect (sets the effect to fire the next time Apply() is called)
	 * 
	 * @type void
	 **/
	Explosion.prototype.explode = function() {
		this.enabled = true;
	};
	
	/**
	 * @function Apply applies the effect to the relevant bodies
	 * @see JEffect.Apply
	 * @type void
	 **/
	Explosion.prototype.Apply = function() {
		this.enabled = false;
		var system=jigLib.PhysicsSystem.getInstance();
		
		var bodies=system.get_bodies();
		var i=bodies.length;
		var curBody, distance, force, forceV;
		var forceVP=[0,0,0,0];
		
		if (this.parent)
			this.location = this.parent.get_position();
		
		this._affectedBodies=[];
		while(i--) {
			curBody=bodies[i];
			if (this.parent && curBody == this.parent) continue;
			
			// handle normal bodies first
			if (curBody._type!="PLANE")
			{
				distance=Vector3DUtil.distance(curBody.get_position(), this.location);
				if (distance < this.radius)
				{
					forceV=Vector3DUtil.subtract(curBody.get_position(), this.location);
					force=(1-(distance / this.radius)) * this.force;
					Vector3DUtil.scaleBy(forceV, force);
					
					if(this.relativity) forceVP = Vector3DUtil.add(forceV,forceVP);
					
					if(curBody.get_movable()) 
					{
						system.activateObject(curBody);
						curBody.addWorldForce(forceV, this.location);
					}
				}
			}
			else if (this.relativity)
			{
				// allow ground and wall type immovable bodies to impart relative force to the exploding body
				distance=curBody.pointPlaneDistance(this.location);
				if (distance<this.radius)
				{
					forceV=Vector3DUtil.negate(curBody.get_normal().slice(0));
					force=(1-(distance / this.radius)) * (this.force*2);
					Vector3DUtil.scaleBy(forceV, force);
					forceVP = Vector3DUtil.add(forceV,forceVP);
				}
			}
		}
		if(this.relativity) {
			Vector3DUtil.limitSum(forceVP,this.force);
			Vector3DUtil.negate(forceVP);
			system.activateObject(this.parent);
			this.parent.applyWorldImpulse(forceVP, this.location);
		}
	};
	
	jigLib.Explosion=Explosion;
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	
	var JBox=jigLib.JBox;

	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JChassis
	 * @class JChassis represents vehicle chassis
	 * @extends JBox
	 * @property {JCar} _car the vehicle this chassis belongs to
	 * @constructor
	 * @param {JCar} car the vehicle this chassis belongs to
	 * @param {ISkin3D} skin the mesh
	 * @param {number} width the required chassis width
	 * @param {number} depth the required chassis depth
	 * @param {number} height the required chassis height
	 **/
	var JChassis=function(car, skin, width, depth, height){
		if(width==null) width=40;
		if(depth==null) depth=70;
		if(height==null) height=30;
		
		this.Super(skin, width, depth, height);

		this._car = car;
	};
	jigLib.extend(JChassis, jigLib.JBox);
	
	JChassis.prototype._car=null;
	
	/**
	 * @function addExternalForces applies wheel forces to the vehicle
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	JChassis.prototype.addExternalForces=function(dt){
		this.clearForces();
		this.addGravity();
		this._car.addExternalForces(dt);
	};

	/**
	 * @function postPhysics runs after the PhysicsSystem has been applied
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	JChassis.prototype.postPhysics=function(dt){
		this._car.postPhysics(dt);
	};
	
	jigLib.JChassis=JChassis;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JMatrix3D=jigLib.JMatrix3D;
	var JNumber3D=jigLib.JNumber3D;
	var JSegment=jigLib.JSegment;
	var JConfig=jigLib.JConfig;
	var PhysicsSystem=jigLib.PhysicsSystem;
	
	// get local refs to Math methods to improve performance
	var mr=Math, mrPI=mr.PI, mrMin=mr.min, mrMax=mr.max, mrCos=mr.cos, mrAbs=mr.abs, mrSqrt=mr.sqrt;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JWheel
	 * @class JWheel represents a wheel
	 * @constant {number} noslipVel
	 * @constant {number} slipVel
	 * @constant {number} slipFactor
	 * @constant {number} smallVel
	 * @property {string} name a unique name by which to identify the wheel (e.g. FrontRight, RearLeft etc.)
	 * @property {JCar} _car the car this wheel belongs to
	 * @property {array} _pos position of the wheel relative to the car's center as a 3D vector
	 * @property {array} _axisUp the inverse of the gravity axis as a 3D vector
	 * @property {number} _spring amount of suspension spring
 	 * @property {number} _travel vertical suspension travel
	 * @property {number} _inertia the wheel inertia
	 * @property {number} _radius the wheel radius
	 * @property {number} _sideFriction side friction
	 * @property {number} _fwdFriction forward friction
	 * @property {number} _damping suspension damping
	 * @property {number} _numRays
	 * @property {number} _angVel
	 * @property {number} _steerAngle the steering angle
	 * @property {number} _torque amount of torque
	 * @property {number} _driveTorque
	 * @property {number} _axisAngle
	 * @property {number} _displacement current suspension travel
	 * @property {number} _upSpeed
	 * @property {number} _rotDamping
	 * @property {number} _normalForce
	 * @property {boolean} _locked whether the wheel is locked
	 * @property {number} _lastDisplacement previous suspension travel
	 * @property {boolean} _lastOnFloor whether the wheel was previously on the floor
	 * @property {number} _angVelForGrip
	 * @property {array} worldPos a 3D vector
	 * @property {array} worldAxis a 3D vector
	 * @property {array} wheelFwd a 3D vector
	 * @property {array} wheelUp a 3D vector
	 * @property {array} wheelLeft a 3D vector
	 * @property {array} wheelRayEnd a 3D vector
	 * @property {JSegment} wheelRay
	 * @property {array} groundUp a 3D vector
	 * @property {array} groundLeft a 3D vector
	 * @property {array} groundFwd a 3D vector
	 * @property {array} wheelPointVel a 3D vector
	 * @property {array} rimVel a 3D vector
	 * @property {array} worldVel a 3D vector
	 * @property {array} wheelCentreVel a 3D vector
	 * @property {CollisionSystem} _collSystem the collision system
	 * @constructor
	 * @param {JCar} car the vehicle this wheel belongs to
	 **/
	var JWheel=function(car){
		this._car = car;
	};
	
	JWheel.prototype.name = null;
	
	JWheel.prototype.noslipVel = 0.2;
	JWheel.prototype.slipVel = 0.4;
	JWheel.prototype.slipFactor = 0.7;
	JWheel.prototype.smallVel = 3;

	JWheel.prototype._car=null;
	JWheel.prototype._pos=null;
	JWheel.prototype._axisUp=null;
	JWheel.prototype._spring=null;
 	JWheel.prototype._travel=null;
	JWheel.prototype._inertia=null;
	JWheel.prototype._radius=null;
	JWheel.prototype._sideFriction=null;
	JWheel.prototype._fwdFriction=null;
	JWheel.prototype._damping=null;
	JWheel.prototype._numRays=null;

	JWheel.prototype._angVel=null;
	JWheel.prototype._steerAngle=null;
	JWheel.prototype._torque=null;
	JWheel.prototype._driveTorque=null;
	JWheel.prototype._axisAngle=null;
	JWheel.prototype._displacement=null;
	JWheel.prototype._upSpeed=null;
	JWheel.prototype._rotDamping=null;
	JWheel.prototype._normalForce=null;

	JWheel.prototype._locked=null;
	JWheel.prototype._lastDisplacement=null;
	JWheel.prototype._lastOnFloor=null;
	JWheel.prototype._angVelForGrip=null;

	JWheel.prototype.worldPos=null;
	JWheel.prototype.worldAxis=null;
	JWheel.prototype.wheelFwd=null;
	JWheel.prototype.wheelUp=null;
	JWheel.prototype.wheelLeft=null;
	JWheel.prototype.wheelRayEnd=null;
	JWheel.prototype.wheelRay=null;
	JWheel.prototype.groundUp=null;
	JWheel.prototype.groundLeft=null;
	JWheel.prototype.groundFwd=null;
	JWheel.prototype.wheelPointVel=null;
	JWheel.prototype.rimVel=null;
	JWheel.prototype.worldVel=null;
	JWheel.prototype.wheelCentreVel=null;
	
	JWheel.prototype._collSystem=null;
	
	/**
	 * @function setup setup the wheel
	 * @param {array} pos position relative to car, in car's space
	 * @param {array} axisUp in car's space
	 * @param {number} spring force per suspension offset
	 * @param {number} travel suspension travel upwards
	 * @param {number} inertia inertia about the axle
	 * @param {number} radius wheel radius
	 * @param {number} sideFriction side friction
	 * @param {number} fwdFriction forward friction
	 * @param {number} damping suspension damping
	 * @param {number} numRays 
	 * @param {number} drive 
	 * @param {number} normalForce 
	 * @type void
	 **/
	JWheel.prototype.setup=function(pos, axisUp, spring, travel, inertia, radius, sideFriction, fwdFriction, damping, numRays, drive, normalForce){
		if(spring==null) spring=0;
		if(travel==null) travel=0;
		if(inertia==null) inertia=0;
		if(radius==null) radius=0;
		if(sideFriction==null) sideFriction=0;
		if(fwdFriction==null) fwdFriction=0;
		if(damping==null) damping=0;
		if(numRays==null) numRays=0;
		if(drive==null) drive=0;
		if(normalForce==null) normalForce=0;
		
		this._pos = pos;
		this._axisUp = axisUp;
		this._spring = spring;
		this._travel = travel;
		this._inertia = inertia;
		this._radius = radius;
		this._sideFriction = sideFriction;
		this._fwdFriction = fwdFriction;
		this._damping = damping;
		this._numRays = numRays;
		this._drive = drive;
		this._normalForce = normalForce;
		this._torque = 0;
		this.reset();
	};

	/**
	 * @function addTorque add torque to the wheel
	 * @param {number} torque the amount of torque to add
	 * @type void
	 **/
	JWheel.prototype.addTorque=function(torque){
		this._driveTorque += torque;
	};

	/**
	 * @function setLock lock/unlock the wheel
	 * @param {boolean} lock
	 * @type void
	 **/
	JWheel.prototype.setLock=function(lock){
		this._locked = lock;
	};

	/**
	 * @function setSteerAngle set the target steering angle
	 * @param {number} steer
	 * @type void
	 **/
	JWheel.prototype.setSteerAngle=function(steer){
		this._steerAngle = steer;
	};

	/**
	 * @function setSteerAngle get the steering angle in degrees
	 * @type number
	 **/
	JWheel.prototype.getSteerAngle=function(){
		return this._steerAngle;
	};

	/**
	 * @function getPos get the base wheel position as a 3D vector
	 * @type array
	 **/
	JWheel.prototype.getPos=function(){
		return this._pos;
	};
	

	/**
	 * @function getLocalAxisUp get the suspension axis in the car's frame as a 3D vector
	 * @type array
	 **/
	JWheel.prototype.getLocalAxisUp=function(){
		return this._axisUp;
	};

	/**
	 * @function getActualPos get the real position of the wheel taking into account current suspension travel
	 * @type array
	 **/
	JWheel.prototype.getActualPos=function(){
		return Vector3DUtil.add(this._pos, JNumber3D.getScaleVector(this._axisUp, this._displacement));
	};

	/**
	 * @function getRadius get the wheel radius
	 * @type number
	 **/
	JWheel.prototype.getRadius=function(){
		return this._radius;
	};

	/**
	 * @function getDisplacement get the current suspension travel
	 * @type number
	 **/
	JWheel.prototype.getDisplacement=function(){
		return this._displacement;
	};

	/**
	 * @function getAxisAngle
	 * @type array
	 **/
	JWheel.prototype.getAxisAngle=function(){
		return this._axisAngle;
	};

	/**
	 * @function getRollAngle get the current rotation around the axle axis
	 * @type number
	 **/
	JWheel.prototype.getRollAngle=function(){
		return 0.1 * this._angVel * 180 / mrPI;
	};

	/**
	 * @function setRotationDamping set the rotation damping
	 * @param {number} vel
	 * @type void
	 **/
	JWheel.prototype.setRotationDamping=function(vel){
		this._rotDamping = vel;
	};
	
	/**
	 * @function getRotationDamping get the rotation damping value
	 * @type number
	 **/
	JWheel.prototype.getRotationDamping=function(){
		return this._rotDamping;
	};
				
	/**
	 * @function getOnFloor tests whether the wheel is on the ground or not
	 * @returns true if on the ground, else false
	 * @type boolean
	 **/
	JWheel.prototype.getOnFloor=function(){
		return this._lastOnFloor;
	};
	
	/**
	 * @function addForcesToCar adds the forces from this wheel to the parent vehicle.
	 * @returns true if the wheel is on the ground, else false
	 * @type boolean
	 **/
	JWheel.prototype.addForcesToCar=function(dt){
		var force = [0,0,0,0];
		this._lastDisplacement = this._displacement;
		this._displacement = 0;

		var carBody = this._car._chassis;
		worldPos = this._pos.slice(0);
		JMatrix3D.multiplyVector(carBody.get_currentState().get_orientation(), worldPos);
		worldPos = Vector3DUtil.add(carBody.get_currentState().position, worldPos);
		worldAxis = this._axisUp.slice(0);
		JMatrix3D.multiplyVector(carBody.get_currentState().get_orientation(), worldAxis);

		wheelFwd = carBody.get_currentState().getOrientationCols()[2].slice(0);
		JMatrix3D.multiplyVector(JMatrix3D.getRotationMatrix(worldAxis[0], worldAxis[1], worldAxis[2], this._steerAngle/180*2*Math.PI), wheelFwd);
		wheelUp = worldAxis;
		wheelLeft = Vector3DUtil.crossProduct(wheelUp, wheelFwd);
		Vector3DUtil.normalize(wheelLeft);

		var rayLen = 2 * this._radius + this._travel;
		wheelRayEnd = Vector3DUtil.subtract(worldPos, JNumber3D.getScaleVector(worldAxis, this._radius));
		wheelRay = new JSegment(Vector3DUtil.add(wheelRayEnd, JNumber3D.getScaleVector(worldAxis, rayLen)), JNumber3D.getScaleVector(worldAxis, -rayLen));

		if (this._collSystem == null)
			this._collSystem = PhysicsSystem.getInstance().getCollisionSystem();

		var maxNumRays = 10;
		var numRays = mrMin(this._numRays, maxNumRays);

		var objArr = [];
		var segments = [];

		var deltaFwd = (2 * this._radius) / (numRays +1);
		var deltaFwdStart = deltaFwd;

		this._lastOnFloor = false;

		var distFwd;
		var yOffset;
		var bestIRay = 0;
		var iRay = 0;
		var segment = null;
		for (iRay = 0; iRay < numRays; iRay++){
			objArr[iRay] = {};
			distFwd = (deltaFwdStart + iRay * deltaFwd) - this._radius;
			yOffset = this._radius * (1 - mrCos(90 * (distFwd / this._radius) * mrPI / 180));
			segment = wheelRay.clone();
			segment.origin = Vector3DUtil.add(segment.origin, Vector3DUtil.add(JNumber3D.getScaleVector(wheelFwd, distFwd), JNumber3D.getScaleVector(wheelUp, yOffset)));
			
			if (this._collSystem.segmentIntersect(objArr[iRay], segment, carBody)) {
				this._lastOnFloor = true;
				if (objArr[iRay].frac < objArr[bestIRay].frac){
					bestIRay = iRay;
				}
			}
			segments[iRay] = segment;
		}
		if (!this._lastOnFloor) return false;
		
		var frac= objArr[bestIRay].frac;
		var groundPos = objArr[bestIRay].position;
		var otherBody = objArr[bestIRay].rigidBody;

		var groundNormal = worldAxis.slice(0);
		if (numRays > 1){
			for (iRay = 0; iRay < numRays; iRay++){
				var rayFracOut=objArr[iRay].fracOut;
				if (rayFracOut <= 1)
					groundNormal = Vector3DUtil.add(groundNormal, JNumber3D.getScaleVector(Vector3DUtil.subtract(worldPos, segments[iRay].getEnd()), 1 - rayFracOut));
			}
			Vector3DUtil.normalize(groundNormal);
		}else groundNormal = objArr[bestIRay].normalOut;
		
		wheelFwd=Vector3DUtil.crossProduct(wheelLeft,groundNormal);
		
		this._displacement = rayLen * (1 - frac);

		if (this._displacement < 0) this._displacement = 0;
		
		var mass = carBody.get_mass();
		var mass4 = mass/4;
		var otherFriction=otherBody.get_friction();
	
		var wheelCenterVel=carBody.getVelocity(this._pos);
		
		
		//hit floor hard
		var origDisplacement=this._displacement;
		if (this._displacement > this._travel){
			this._displacement=this._travel;
			var cv=Vector3DUtil.dotProduct(wheelCenterVel,groundNormal)/dt*mass4;
			cv=cv*2*otherBody.get_restitution()/10;
			extraForce = JNumber3D.getScaleVector(groundNormal, -cv);
			force = Vector3DUtil.add(force, extraForce);
		}
		//suspension spring force
		extraForce = JNumber3D.getScaleVector(this._axisUp, this._spring*this._displacement+this._upSpeed*this._damping);
		force = Vector3DUtil.add(force, extraForce);

		
		groundUp = groundNormal;
		groundLeft = Vector3DUtil.crossProduct(groundNormal, wheelFwd);
		Vector3DUtil.normalize(groundLeft);
		groundFwd = Vector3DUtil.crossProduct(groundLeft, groundUp);
	
		var rimVel = JNumber3D.getScaleVector(Vector3DUtil.crossProduct(groundLeft, Vector3DUtil.subtract(groundPos, worldPos)), -this._angVel);
		var centerVel = JNumber3D.getScaleVector(groundFwd, Vector3DUtil.dotProduct(wheelCenterVel,groundFwd));

		var friction=this._fwdFriction*otherFriction;
		var extraForce = JNumber3D.getScaleVector(Vector3DUtil.subtract(rimVel,centerVel), mass4/dt/this._radius*friction);
		var forceSize=Vector3DUtil.get_length(extraForce);
		if(forceSize>this._normalForce*friction) extraForce = JNumber3D.getScaleVector(extraForce,this._normalForce*friction/forceSize);
		force = Vector3DUtil.add(force, extraForce);		
		this._torque-=Vector3DUtil.dotProduct(Vector3DUtil.subtract(rimVel,centerVel),groundFwd)/this._radius*mass4/dt;
		this._angVelForGrip = Vector3DUtil.dotProduct(wheelCenterVel, groundFwd) / this._radius;

		//sideways friction
		var sideVel = Vector3DUtil.dotProduct(wheelCenterVel,groundLeft);
		var friction=this._sideFriction*otherFriction;		
		var leftVel = JNumber3D.getScaleVector(groundLeft, -sideVel*friction);

		
		var extraForce = JNumber3D.getScaleVector(leftVel, mass4/dt/this._radius);	
		var forceSize=Vector3DUtil.get_length(extraForce);
		if(forceSize>this._normalForce*friction) extraForce = JNumber3D.getScaleVector(extraForce,this._normalForce*friction/forceSize);
		
		force = Vector3DUtil.add(force, extraForce);

		carBody.addWorldForce(force, groundPos);
		
		if (otherBody.get_movable()){
			var maxOtherBodyAcc = 500;
			var maxOtherBodyForce = maxOtherBodyAcc * otherBody.get_mass();
			if (Vector3DUtil.get_lengthSquared(force) > (maxOtherBodyForce * maxOtherBodyForce))
				force = JNumber3D.getScaleVector(force, maxOtherBodyForce / Vector3DUtil.get_length(force));

			otherBody.addWorldForce(JNumber3D.getScaleVector(force, -1), groundPos);
		}
		return true;
	};

	/**
	 * @function update updates the rotational state etc
	 * @type void
	 **/
	JWheel.prototype.update=function(dt){
		if (dt <= 0) return;

		var origAngVel = this._angVel;
		this._upSpeed = (this._displacement - this._lastDisplacement) / mrMax(dt, JNumber3D.NUM_TINY);

		if (this._locked){
			this._angVel = 0;
			this._torque = 0;
		}else{					
			this._angVel += (this._torque * dt / this._inertia);
			this._torque = 0;
			
			if (((origAngVel > this._angVelForGrip) && (this._angVel < this._angVelForGrip)) || ((origAngVel < this._angVelForGrip) && (this._angVel > this._angVelForGrip)))
				this._angVel = this._angVelForGrip;
			
			
			this._angVel += this._driveTorque * dt / this._inertia * this._drive;
			this._driveTorque = 0;

			if (this._angVel < -100) this._angVel = -100;
			else if (this._angVel > 100) this._angVel = 100;
			
			this._angVel *= this._rotDamping;
			this._axisAngle += (this._angVel * dt * 180 / mrPI);
		}
	};

	/**
	 * @function reset resets everything
	 * @type void
	 **/
	JWheel.prototype.reset=function(){
		this._angVel = 0;
		this._steerAngle = 0;
		this._torque = 0;
		this._driveTorque = 0;
		this._axisAngle = 0;
		this._displacement = 0;
		this._upSpeed = 0;
		this._locked = false;
		this._lastDisplacement = 0;
		this._lastOnFloor = false;
		this._angVelForGrip = 0;
		this._rotDamping = 0.99;
	};
	
	jigLib.JWheel=JWheel;
	
})(jigLib);/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	var Vector3DUtil=jigLib.Vector3DUtil;
	var JNumber3D=jigLib.JNumber3D;
	var JChassis=jigLib.JChassis;
	var JWheel=jigLib.JWheel;
	var PhysicsSystem=jigLib.PhysicsSystem;
	
	// get local refs to Math methods to improve performance
	var mr=Math, mrAbs=mr.abs, mrSqrt=mr.sqrt;
	
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name JCar
	 * @class JCar represents a wheeled vehicle
	 * @requires Vector3DUtil
	 * @requires JNumber3D
	 * @requires JChassis
	 * @requires JWheel
	 * @requires PhysicsSystem
	 * @property {number} _maxSteerAngle the maximum steering angle
	 * @property {number} _steerRate the rate of steering angle change
	 * @property {number} _driveTorque the maximum torque of a wheel
	 * @property {number} _destSteering the target steering angle
	 * @property {number} _destAccelerate the target acceleration
	 * @property {number} _steering the current steering angle
	 * @property {number} _accelerate the current acceleration
	 * @property {number} _HBrake whether the handbrake is on (1) or off (0)
	 * @property {JChassis} _chassis the vehicle chassis
	 * @property {array} _wheels the wheels (a collection of Wheel objects)
	 * @property {array} _steerWheels the wheels used for steering (a collection of Wheel objects)
	 * @constructor
	 * @param {ISkin3D} skin
	 **/
	var JCar=function(skin){
		this._chassis = new JChassis(this, skin);
		this._wheels = [];
		this._steerWheels = [];
		this._destSteering = this._destAccelerate = this._steering = this._accelerate = this._HBrake = 0;
		this.setCar();
	};
	
	JCar.prototype._maxSteerAngle=null;
	JCar.prototype._steerRate=null;
	JCar.prototype._driveTorque=null;

	JCar.prototype._destSteering=null;
	JCar.prototype._destAccelerate=null;

	JCar.prototype._steering=null;
	JCar.prototype._accelerate=null;
	JCar.prototype._HBrake=null;

	JCar.prototype._chassis=null;
	JCar.prototype._wheels=null;
	JCar.prototype._steerWheels=null;
	
	/**
	 * @function setCar sets up the vehicle
	 * @param {number} maxSteerAngle the maximum steering angle
	 * @param {number} steerRate the rate of steering angle change
	 * @param {number} driveTorque the maximum torque of a wheel
	 * @type void
	 **/
	JCar.prototype.setCar=function(maxSteerAngle, steerRate, driveTorque){
		if(maxSteerAngle==null) maxSteerAngle=45;
		if(steerRate==null) steerRate=4;
		if(driveTorque==null) driveTorque=500;
		
		this._maxSteerAngle = maxSteerAngle;
		this._steerRate = steerRate;
		this._driveTorque = driveTorque;
	};

	/**
	 * @function setupWheel add a wheel to the vehicle
	 * @param {string} _name a unique name by which to identify the wheel (e.g. FrontRight, RearLeft etc.)
	 * @param {array} pos position of the wheel relative to the car's center
	 * @param {number} wheelSideFriction side friction
	 * @param {number} wheelFwdFriction forward friction
	 * @param {number} wheelTravel vertical suspension travel
	 * @param {number} wheelRadius wheel radius
	 * @param {number} wheelRestingFrac elasticity coefficient
	 * @param {number} wheelDampingFrac suspension damping
	 * @param {number} wheelNumRays 
	 * @param {number} drive
	 * @type void
	 **/
	JCar.prototype.setupWheel=function(_name, pos, wheelSideFriction, wheelFwdFriction, wheelTravel, wheelRadius, wheelRestingFrac, wheelDampingFrac, wheelNumRays, drive){
		if(wheelSideFriction==null) wheelSideFriction=2;
		if(wheelFwdFriction==null) wheelFwdFriction=2;
		if(wheelTravel==null) wheelTravel=3;
		if(wheelRadius==null) wheelRadius=10;
		if(wheelRestingFrac==null) wheelRestingFrac=0.5;
		if(wheelDampingFrac==null) wheelDampingFrac=0.5;
		if(wheelNumRays==null) wheelNumRays=1;
		if(drive==null) drive=1;

		
		var gravity = PhysicsSystem.getInstance().get_gravity().slice(0);
		var mass = this._chassis.get_mass();
		var mass4 = 0.25 * mass;
		var gravityLen = Vector3DUtil.get_length(gravity);

		Vector3DUtil.normalize(gravity);
		var axis = JNumber3D.getScaleVector(gravity,-1);
		var spring = mass4 * gravityLen / (wheelRestingFrac * wheelTravel);
		var inertia = 0.015 * wheelRadius * wheelRadius * mass;
		var damping = wheelDampingFrac/2;
		var normalForce = gravityLen*mass4;
		//var damping = 2 * mrSqrt(spring * mass);
		//damping *= (0.25 * wheelDampingFrac);
		//damping /= this._steerRate;
		//damping *= wheelDampingFrac;

		var wheel = new JWheel(this);
		wheel.name = _name;
		wheel.setup(pos, axis, spring, wheelTravel, inertia, wheelRadius, wheelSideFriction, wheelFwdFriction, damping, wheelNumRays, drive, normalForce);
		this._wheels.push(wheel);
	};

	/**
	 * @function setAccelerate set the target acceleration
	 * @param {number} val the target acceleration
	 * @type void
	 **/
	JCar.prototype.setAccelerate=function(val){
		this._destAccelerate = val;
	};

	/**
	 * @function setSteer set the target steering angle and define which wheels should turn
	 * @param {array} wheels a collection of Wheel objects
	 * @param {number} val the target acceleration
	 * @type void
	 **/
	JCar.prototype.setSteer=function(wheels, val){
		this._destSteering = val;
		this._steerWheels = [];
		var wheel=null;
		for (var i=0, l=wheels.length; i<l; i++){
			wheel=this.getWheel(wheels[i]);
			if (wheel)
				this._steerWheels.push(wheel);
		}
	};

	/**
	 * @function findWheel checks if a wheel exists matching a given name
	 * @param {string} name the name of the wheel to find
	 * @type boolean
	 **/
	JCar.prototype.findWheel=function(_name){
		for (var i=0, l=this._wheels.length; i<l; i++){
			if (this._wheels[i].name == _name) return true;
		}
		return false;
	};
	
	/**
	 * @function getWheel get a wheel by name
	 * @param {string} name the name of the wheel to get
	 * @type Wheel
	 **/
	JCar.prototype.getWheel=function(_name){
		for (var i=0; i<this._wheels.length; i++){
			if (this._wheels[i].name == _name) return this._wheels[i];
		}
		return null;
	};
	
	/**
	 * @function setHBrake sets the handbrake off or on
	 * @param {number} val 0 to set the handbrake off, and 1 to set it on
	 * @type void
	 **/
	JCar.prototype.setHBrake=function(val){
		this._HBrake = val;
	};

	/**
	 * @function addExternalForces applies wheel forces to the vehicle
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	JCar.prototype.addExternalForces=function(dt){
		for(var i=0, wl=this._wheels.length; i<wl; i++){
			this._wheels[i].addForcesToCar(dt);
		}
	};

	/**
	 * @function postPhysics runs after the PhysicsSystem has been applied
	 * @param {number} dt a UNIX timestamp
	 * @type void
	 **/
	JCar.prototype.postPhysics=function(dt){
		for(var i=0, wl=this._wheels.length; i<wl; i++){
			this._wheels[i].update(dt);
		}

		var deltaAccelerate = dt;
		var deltaSteering = dt * this._steerRate;
		var dAccelerate = this._destAccelerate - this._accelerate;

		if (dAccelerate < -deltaAccelerate) dAccelerate = -deltaAccelerate;
		else if (dAccelerate > deltaAccelerate) dAccelerate = deltaAccelerate;

		this._accelerate += dAccelerate;

		var dSteering = this._destSteering - this._steering;

		if (dSteering < -deltaSteering) dSteering = -deltaSteering;
		else if (dSteering > deltaSteering) dSteering = deltaSteering;

		this._steering += dSteering;

		for(var i=0;i<this._wheels.length;i++){
			this._wheels[i].addTorque(this._driveTorque * this._accelerate);
			this._wheels[i].setLock(this._HBrake > 0.5);
		}

		var alpha = mrAbs(this._maxSteerAngle * this._steering);
		var angleSgn = (this._steering > 0) ? 1 : -1;
		for(var i=0, swl=this._steerWheels.length; i<swl; i++){
			this._steerWheels[i].setSteerAngle(angleSgn * alpha);
		}
	};

	/**
	 * @function getNumWheelsOnFloor returns the number of wheels in contact with the ground
	 * @param {number} dt a UNIX timestamp
	 * @type number
	 **/
	JCar.prototype.getNumWheelsOnFloor=function(dt){
		var count = 0;
		for(var i=0, wl=this._wheels.length; i<wl; i++){
			//this._wheels[i].update(dt);
			if (this._wheels[i].getOnFloor()) count++;
		}
		return count;
	};
	
	jigLib.JCar=JCar;
	
})(jigLib);