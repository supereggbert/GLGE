/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name GLGE_math.js
 */

 if(typeof(GLGE) == "undefined"){
	/**
	* @namespace Holds the functionality of the library
	*/
	GLGE = {};
}

(function(GLGE){

GLGE.Vec=function(array) {
    return array.slice(0);
}

/**
* The Vec3 Class creates a vector 
* @param {Array} array An array of 3 floats
*/
GLGE.Vec3=function(x,y,z){
    return [x,y,z];
}

/**
* The Vec4 Class creates a vector 
* @param {Array} array An array of 4 floats
*/
GLGE.Vec4=function(x,y,z,w){
    return [x,y,z,w];
}

/**
* Gets the nth element (1 indexed) from the array
* @param {Array} v A vector with 4 elements
* @param {number} i The index from one 
*/
GLGE.get1basedVec4=function(v,i){
	return v[i-1];
};
/**
* Gets the nth element (1 indexed) from the array
* @param {Array} v A vector with 3 elements
* @param {number} i The index from one 
*/
GLGE.get1basedVec3=function(v,i){
	return v[i-1];
};

/**
* Gets the nth element (1 indexed) from the array
* @param {Array} v A vector with 4 elements
* @param {number} i The index from one 
*/
GLGE.getVec4=function(v,i){
	return v[i];
};
/**
* Gets the nth element (1 indexed) from the array
* @param {Array} v A vector with 3 elements
* @param {number} i The index from one 
*/
GLGE.getVec3=function(v,i){
	return v[i];
};



/**
* Adds a GLGE.Vec4 to this Vec4
* @param {Array} a The first value to add
* * @param {Array} b The second value to add
*/
GLGE.addVec4=function(a,b) {
    return [a[0]+b[0],a[1]+b[1],a[2]+b[2],a[3]+b[3]];
}
/**
* Adds a GLGE.Vec3 to this GLGE.Vec3
* @param {Array} a The first value to add
* @param {Array} b The second value to add
*/
GLGE.addVec3=function(a,b) {
    return [a[0]+b[0],a[1]+b[1],a[2]+b[2]];
}


/**
* Adds a GLGE.Vec4 to this Vec4
* @param {Array} a The first value
* * @param {Array} b The second value to subtract from the first
*/
GLGE.subVec4=function(a,b) {
    return [a[0]-b[0],a[1]-b[1],a[2]-b[2],a[3]-b[3]];
}
/**
* Adds a GLGE.Vec3 to this GLGE.Vec3
* @param {Array} a The first value
* @param {Array} b The second value to subtract from the first
*/
GLGE.subVec3=function(a,b) {
    return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
}


/**
* Gets the dot product between this and the input vector
* @param {Array} a the first value to dot
* @param {Array} b the second value to dot
*/
GLGE.dotVec3=function(a,b) {
    return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
}


/**
* Gets the dot product between this and the input vector
* @param {Array} a the first value to dot
* @param {Array} b the second value to dot
*/
GLGE.dotVec4=function(a,b) {
    return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];
}

/**
* Gets the dot product between this and the input vector
* @param {Array} a the vector to scale
* @param {Number} b the scalar
*/
GLGE.scaleVec4=function(a,b) {
    return [a[0]*b,a[1]*b,a[2]*b,a[3]*b];
}

/**
* Gets the dot product between this and the input vector
* @param {Array} a the vector to scale
* @param {Number} b the scalar
*/
GLGE.scaleVec3=function(a,b) {
    return [a[0]*b,a[1]*b,a[2]*b];
}


/**
* Gets the cross product between this and the input vector
* @param {Array} a the first value to dot
* @param {Array} b the second value to dot
*/
GLGE.crossVec3=function(a,b) {
  return [a[1]*b[2]-a[2]*b[1],
          a[2]*b[0]-a[0]*b[2],
          a[0]*b[1]-a[1]*b[0]];
}

/**
* Returns a unitized version of the input vector3
* @param {Array} a the vector3 to be unitized
*/
GLGE.toUnitVec3=function(a) {
    var sq=a[0]*a[0]+a[1]*a[1]+a[2]*a[2];
    var f=1.0;
    if (sq>0) {
        f=Math.pow(sq,0.5);
    }
    return [a[0]/f,a[1]/f,a[2]/f];
};

/**
* Returns a unitized version of the input vector4
* @param {Array} a the vector4 to be unitized
*/
GLGE.toUnitVec4=function(a) {
    var sq=a[0]*a[0]+a[1]*a[1]+a[2]*a[2]+a[3]*a[3];
    var f=1.0;
    if (sq>0) {
        f=Math.pow(sq,0.5);
    }
    return [a[0]/f,a[1]/f,a[2]/f,a[3]/f];
};


/**
* Returns the length of a vector3
* @param {Array} a the vector to be measured
*/
GLGE.lengthVec3=function(a) {
    return Math.pow(a[0]*a[0]+a[1]*a[1]+a[2]*a[2],0.5);
};

/**
* Returns the distance between 2 vector3s
* @param {Array} a the first vector
* @param {Array} b the second vector
*/
GLGE.distanceVec3=function(a,b){
    return GLGE.lengthVec3(GLGE.subVec3(a,b));
};

/**
* Returns the length of a vector3
* @param {Array} a the vector to be measured
*/
GLGE.lengthVec4=function(a,b) {
    return Math.pow(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]+a[3]*a[3],0.5);
};

/**
* Returns the distance between 2 vector4s
* @param {Array} a the first vector
* @param {Array} b the second vector
*/
GLGE.distanceVec4=function(a,b){
    return GLGE.lengthVec4(GLGE.subVec4(a,b));
};


/**
* Returns the angle between 2 vector3s in radians
* @param {Array} a the first vector
* @param {Array} b the second vector
*/
GLGE.angleVec3=function(a,b){
    a=GLGE.toUnitVec3(a);
    b=GLGE.toUnitVec3(b);
    d=GLGE.dotVec3(a,b);
    if (d<-1)
        d=-1;
    if (d>1)
        d=1;
    return Math.acos(d);
};

/**
* Returns the angle between 2 vector4s in radians
* @param {Array} a the first vector
* @param {Array} b the second vector
*/
GLGE.angleVec4=function(a,b){
    a=GLGE.toUnitVec4(a);
    b=GLGE.toUnitVec4(b);
    d=GLGE.dotVec4(a,b);
    if (d<-1)
        d=-1;
    if (d>1)
        d=1;
    return Math.acos(d);
};

GLGE_math_use_webgl_float=false;

/**
* The Mat class creates a matrix from an array
* @param {Array} array An array of 9 or 16 floats
*/
GLGE.Mat3=GLGE_math_use_webgl_float?function(array) {
    if (array.length==9) {
        return new Float32Array(array);
    }else if (array.length==16) {
        return new Float32Array([array[0],array[1],array[2],array[4],array[5],array[6],array[8],array[9],array[10]]);        
    }else {
		throw "invalid matrix length";
    }
}:function(array) {
    var retval;
    if (array.length==9) {
        retval=array.slice(0);
    }else if (array.length==16) {
        retval=[array[0],array[1],array[2],array[4],array[5],array[6],array[8],array[9],array[10]];
    }else {
		throw "invalid matrix length";
    }    
    retval.get=function(i){return this[i];};
    return retval;
};
GLGE.Mat=GLGE_math_use_webgl_float?function(array) {
    return new Float32Array(array);
}:function(array){
    var retval=array.slice(0);
    retval.get=function(i){return this[i];};
    return retval;
};
GLGE.Mat4=function(array) {
    var retval;
    if (array.length==9) {
        retval=[array[0],array[1],array[2],0,array[3],array[4],array[5],0,array[6],array[7],array[8],0,0,0,0,1];
    }else if (array.length==16) {
        retval=array.slice(0);
    }else {
        throw "invalid matrix length";
    }
    retval.get=function(i){return this[i];};
    return retval;
};
/**
* Finds the determinate of the matrix
* @returns {number} the determinate
*/
GLGE.determinantMat4=function(m) {
    return m[12] * m[9] * m[6] * m[3] - m[8] * m[13] * m[6] * m[3] - m[12] * m[5] * m[10] * m[3] + m[4] * m[13] * m[10] * m[3] + m[8] * m[5] * m[14] * m[3] - m[4] * m[9] * m[14] * m[3] - m[12] * m[9] * m[2] * m[7] + m[8] * m[13] * m[2] * m[7] + m[12] * m[1] * m[10] * m[7] - m[0] * m[13] * m[10] * m[7] - m[8] * m[1] * m[14] * m[7] + m[0] * m[9] * m[14] * m[7] + m[12] * m[5] * m[2] * m[11] - m[4] * m[13] * m[2] * m[11] - m[12] * m[1] * m[6] * m[11] + m[0] * m[13] * m[6] * m[11] + m[4] * m[1] * m[14] * m[11] - m[0] * m[5] * m[14] * m[11] - m[8] * m[5] * m[2] * m[15] + m[4] * m[9] * m[2] * m[15] + m[8] * m[1] * m[6] * m[15] - m[0] * m[9] * m[6] * m[15] - m[4] * m[1] * m[10] * m[15] + m[0] * m[5] * m[10] * m[15];
};

/**
* Finds the inverse of the matrix
* @returns {GLGE.Mat} the inverse
*/
GLGE.inverseMat4=function(mat){
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	var d = a30*a21*a12*a03 - a20*a31*a12*a03 - a30*a11*a22*a03 + a10*a31*a22*a03 +
			a20*a11*a32*a03 - a10*a21*a32*a03 - a30*a21*a02*a13 + a20*a31*a02*a13 +
			a30*a01*a22*a13 - a00*a31*a22*a13 - a20*a01*a32*a13 + a00*a21*a32*a13 +
			a30*a11*a02*a23 - a10*a31*a02*a23 - a30*a01*a12*a23 + a00*a31*a12*a23 +
			a10*a01*a32*a23 - a00*a11*a32*a23 - a20*a11*a02*a33 + a10*a21*a02*a33 +
			a20*a01*a12*a33 - a00*a21*a12*a33 - a10*a01*a22*a33 + a00*a11*a22*a33;
	
	return [ (a21*a32*a13 - a31*a22*a13 + a31*a12*a23 - a11*a32*a23 - a21*a12*a33 + a11*a22*a33)/d,
	(a31*a22*a03 - a21*a32*a03 - a31*a02*a23 + a01*a32*a23 + a21*a02*a33 - a01*a22*a33)/d,
	(a11*a32*a03 - a31*a12*a03 + a31*a02*a13 - a01*a32*a13 - a11*a02*a33 + a01*a12*a33)/d,
	(a21*a12*a03 - a11*a22*a03 - a21*a02*a13 + a01*a22*a13 + a11*a02*a23 - a01*a12*a23)/d,
	(a30*a22*a13 - a20*a32*a13 - a30*a12*a23 + a10*a32*a23 + a20*a12*a33 - a10*a22*a33)/d,
	(a20*a32*a03 - a30*a22*a03 + a30*a02*a23 - a00*a32*a23 - a20*a02*a33 + a00*a22*a33)/d,
	(a30*a12*a03 - a10*a32*a03 - a30*a02*a13 + a00*a32*a13 + a10*a02*a33 - a00*a12*a33)/d,
	(a10*a22*a03 - a20*a12*a03 + a20*a02*a13 - a00*a22*a13 - a10*a02*a23 + a00*a12*a23)/d,
	(a20*a31*a13 - a30*a21*a13 + a30*a11*a23 - a10*a31*a23 - a20*a11*a33 + a10*a21*a33)/d,
	(a30*a21*a03 - a20*a31*a03 - a30*a01*a23 + a00*a31*a23 + a20*a01*a33 - a00*a21*a33)/d,
	(a10*a31*a03 - a30*a11*a03 + a30*a01*a13 - a00*a31*a13 - a10*a01*a33 + a00*a11*a33)/d,
	(a20*a11*a03 - a10*a21*a03 - a20*a01*a13 + a00*a21*a13 + a10*a01*a23 - a00*a11*a23)/d,
	(a30*a21*a12 - a20*a31*a12 - a30*a11*a22 + a10*a31*a22 + a20*a11*a32 - a10*a21*a32)/d,
	(a20*a31*a02 - a30*a21*a02 + a30*a01*a22 - a00*a31*a22 - a20*a01*a32 + a00*a21*a32)/d,
	(a30*a11*a02 - a10*a31*a02 - a30*a01*a12 + a00*a31*a12 + a10*a01*a32 - a00*a11*a32)/d,
	(a10*a21*a02 - a20*a11*a02 + a20*a01*a12 - a00*a21*a12 - a10*a01*a22 + a00*a11*a22)/d]
};

/**
* multiplies two mat4's
* @returns {GLGE.Mat} the matrix multiplication of the matrices
*/
GLGE.mulMat4Vec3=function(mat1,vec2){
	return GLGE.Vec3(mat1[0]*vec2[0]+mat1[1]*vec2[1]+mat1[2]*vec2[2]+mat1[3],
			          mat1[4]*vec2[0]+mat1[5]*vec2[1]+mat1[6]*vec2[2]+mat1[7],
			          mat1[8]*vec2[0]+mat1[9]*vec2[1]+mat1[10]*vec2[2]+mat1[11]);
};

/**
* multiplies two mat4's
* @returns {GLGE.Mat} the matrix multiplication of the matrices
*/
GLGE.mulMat4Vec4=function(mat1,vec2){
	return GLGE.Vec4(mat1[0]*vec2[0]+mat1[1]*vec2[1]+mat1[2]*vec2[2]+mat1[3]*vec2[3],
			          mat1[4]*vec2[0]+mat1[5]*vec2[1]+mat1[6]*vec2[2]+mat1[7]*vec2[3],
			          mat1[8]*vec2[0]+mat1[9]*vec2[1]+mat1[10]*vec2[2]+mat1[11]*vec2[3],
			          mat1[12]*vec2[0]+mat1[13]*vec2[1]+mat1[14]*vec2[2]+mat1[15]*vec2[3]);
};
     
/**
* multiplies a Mat4 by a scalar value
* @returns {GLGE.Mat} the matrix multiplication of the matrices
*/
GLGE.scaleMat4=function(m,value) {
    return GLGE.Mat([m[0]*value,m[1]*value,m[2]*value,m[3]*value,
                                m[4]*value,m[5]*value,m[6]*value,m[7]*value,
                                m[8]*value,m[9]*value,m[10]*value,m[11]*value,
                                m[12]*value,m[13]*value,m[14]*value,m[15]*value]);
};
/**
* multiplies a Mat4 by a scalar value in place without allocation
* @returns {GLGE.Mat} the input matrix, modified
*/
GLGE.scaleInPlaceMat4=function(m,value) {
    m.set(0,m[0]*value);
    m.set(1,m[1]*value);
    m.set(2,m[2]*value);
    m.set(3,m[3]*value);
    m.set(4,m[4]*value);
    m.set(5,m[5]*value);
    m.set(6,m[6]*value);
    m.set(7,m[7]*value);
    m.set(8,m[8]*value);
    m.set(9,m[9]*value);
    m.set(10,m[10]*value);
    m.set(11,m[11]*value);
    m.set(12,m[12]*value);
    m.set(13,m[13]*value);
    m.set(14,m[14]*value);
    m.set(15,m[15]*value);
    return m;
};

/**
* adds a Mat4 to another Mat4 in place without allocation
* @returns {GLGE.Mat} the first input matrix, modified to be added
*/
GLGE.addInPlaceMat4=function(m,value) {
    m.set(0,m[0]+value[0]);
    m.set(1,m[1]+value[1]);
    m.set(2,m[2]+value[2]);
    m.set(3,m[3]+value[3]);
    m.set(4,m[4]+value[4]);
    m.set(5,m[5]+value[5]);
    m.set(6,m[6]+value[6]);
    m.set(7,m[7]+value[7]);
    m.set(8,m[8]+value[8]);
    m.set(9,m[9]+value[9]);
    m.set(10,m[10]+value[10]);
    m.set(11,m[11]+value[11]);
    m.set(12,m[12]+value[12]);
    m.set(13,m[13]+value[13]);
    m.set(14,m[14]+value[14]);
    m.set(15,m[15]+value[15]);
    return m;
};



/**
* adds two Mat4 together
* @returns {GLGE.Mat} a new, added Mat4
*/
GLGE.addMat4=function(m,value) {
return GLGE.Mat([m[0]+value[0],
                 m[1]+value[1],
                 m[2]+value[2],
                 m[3]+value[3],
                 m[4]+value[4],
                 m[5]+value[5],
                 m[6]+value[6],
                 m[7]+value[7],
                 m[8]+value[8],
                 m[9]+value[9],
                 m[10]+value[10],
                 m[11]+value[11],
                 m[12]+value[12],
                 m[13]+value[13],
                 m[14]+value[14],
                 m[15]+value[15]]);
    return m;
};



/**
* subs a Mat4 from another Mat4 in place without allocation
* @returns {GLGE.Mat} the first input matrix, modified to have the second subtacted
*/
GLGE.subInPlaceMat4=function(m,value) {
    m.set(0,m[0]-value[0]);
    m.set(1,m[1]-value[1]);
    m.set(2,m[2]-value[2]);
    m.set(3,m[3]-value[3]);
    m.set(4,m[4]-value[4]);
    m.set(5,m[5]-value[5]);
    m.set(6,m[6]-value[6]);
    m.set(7,m[7]-value[7]);
    m.set(8,m[8]-value[8]);
    m.set(9,m[9]-value[9]);
    m.set(10,m[10]-value[10]);
    m.set(11,m[11]-value[11]);
    m.set(12,m[12]-value[12]);
    m.set(13,m[13]-value[13]);
    m.set(14,m[14]-value[14]);
    m.set(15,m[15]-value[15]);
    return m;
};



/**
* subtracts the second matrix from the first
* @returns {GLGE.Mat} a new, subed Mat4
*/
GLGE.subMat4=function(m,value) {
return GLGE.Mat([m[0]-value[0],
                 m[1]-value[1],
                 m[2]-value[2],
                 m[3]-value[3],
                 m[4]-value[4],
                 m[5]-value[5],
                 m[6]-value[6],
                 m[7]-value[7],
                 m[8]-value[8],
                 m[9]-value[9],
                 m[10]-value[10],
                 m[11]-value[11],
                 m[12]-value[12],
                 m[13]-value[13],
                 m[14]-value[14],
                 m[15]-value[15]]);
    return m;
};


/**
* Finds the matrix multiplication with another GLGE.Mat or GLGE.vec or an Array of length 3-4
* @param {object} value An GLGE.Mat, GLGE.vec or Array
* @returns {GLGE.Mat|GLGE.Vec}
*/
GLGE.mulMat4=function(mat2,mat1){

	var a00 = mat1[0], a01 = mat1[1], a02 = mat1[2], a03 = mat1[3];
	var a10 = mat1[4], a11 = mat1[5], a12 = mat1[6], a13 = mat1[7];
	var a20 = mat1[8], a21 = mat1[9], a22 = mat1[10], a23 = mat1[11];
	var a30 = mat1[12], a31 = mat1[13], a32 = mat1[14], a33 = mat1[15];
	
	var b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3];
	var b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7];
	var b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11];
	var b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];
	return [b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
		b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
		b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
		b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
		
		b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
		b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
		b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
		b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
		
		b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
		b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
		b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
		b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
		
		b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
		b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
		b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
		b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33];
};

GLGE.transposeInPlaceMat4=function(m) {
    var v=m[1];
    m.set(1,m[4]);
    m.set(4,v);


    v=m[8];
    m.set(8,m[2]);
    m.set(2,v);
    

    v=m[3];
    m.set(3,m[12]);
    m.set(12,v);

    v=m[9];
    m.set(9,m[6]);
    m.set(6,v);

    v=m[13];
    m.set(13,m[7]);
    m.set(7,v);

    v=m[14];
    m.set(14,m[11]);
    m.set(11,v);
    
};

/**
* Builds the transpose of the matrix
* @returns {GLGE.Mat} the transposed matrix
*/
GLGE.transposeMat4=function(m) {
    return GLGE.Mat4([m[0],m[4],m[8],m[12],
		              m[1],m[5],m[9],m[13],
		              m[2],m[6],m[10],m[14],
		              m[3],m[7],m[11],m[15]]);
};

/**
* copys a js array into a webglarray
* @param {array} mat the source array
* @param {webglarray} glarray the destination array
*/
GLGE.mat4gl=function(mat,glarray){
	glarray[0]=mat[0];
	glarray[1]=mat[1];
	glarray[2]=mat[2];
	glarray[3]=mat[3];
	glarray[4]=mat[4];
	glarray[5]=mat[5];
	glarray[6]=mat[6];
	glarray[7]=mat[7];
	glarray[8]=mat[8];
	glarray[9]=mat[9];
	glarray[10]=mat[10];
	glarray[11]=mat[11];
	glarray[12]=mat[12];
	glarray[13]=mat[13];
	glarray[14]=mat[14];
	glarray[15]=mat[15];
};

/**
* Sets the value at the specified index
* @param {number} i the first index 1 offset
* @param {number} j the second index 1 offset
* @param {number} value the value to set
*/
GLGE.set1basedMat4=function(m,i,j,value){
	m[(i-1)*4+(j-1)]=value;
    if(m.glData!==undefined){
        delete m.glData;
    }
};

/**
* Sets the value at the specified index
* @param {number} i the first index from zero
* @param {number} j the second index from zero
* @param {number} value the value to set
*/
GLGE.setMat4=function(m,i,j,value){
	m[i*4+j]=value;
    if(m.glData!==undefined){
        delete m.glData;
    }
};

/**
* Gets the value at the specified index
* @param {number} i the first index from one
* @param {number} j the second index from one
* @returns {number} the value at the given index
*/
GLGE.get1basedMat4=function(m,i,j){
	return m.get((i-1)*4+(j-1));
};

/**
* Gets the value at the specified index
* @param {number} i the first index from zero
* @param {number} j the second index from zero
* @returns {number} the value at the given index
*/
GLGE.getMat4=function(m,i,j){
	return m[i*4+j];
};
/**
* gets the a webgl float array for this Matrix, once generated it will cache it so it doesn't need to recreate everytime
* @returns {Float32Array} the webgl array for this Matrix
* @private
*/
GLGE.glDataMat4=function(m) {
    m.glArray=new Float32Array(m);
    return m.glArray;
};
/**
 * Creates an identity matrix
 * @returns {GLGE.Mat} the identity matrix
 */
GLGE.identMatrix=function(){
	return GLGE.Mat([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
};
/**
 * Creates a translation matrix
 * @returns {Array} value an array GLGE.Vec or 3 paramters
 * @returns {GLGE.Mat} the translation matrix
 */
GLGE.translateMatrix=function(value){
	var x;
	var y;
	var z;
	if(arguments.length==3){
		x=arguments[0];
		y=arguments[1];
		z=arguments[2];
	}
	else if(value.data){
		x=value.data[0];
		y=value.data[1];
		z=value.data[2];
	}
	else if(value instanceof Array){
		x=value[0];
		y=value[1];
		z=value[2];
	}
	return GLGE.Mat([
		1,0,0,x,
		0,1,0,y,
		0,0,1,z,
		0,0,0,1
		]);
};
/**
 * Creates a scale matrix
 * @returns {Array} value an array GLGE.Vec or 3 paramters
 * @returns {GLGE.Mat} the scale matrix
 */
GLGE.scaleMatrix=function(value){
    var x;
    var y;
    var z;
	if(arguments.length==3){
		x=arguments[0];
		y=arguments[1];
		z=arguments[2];
	}
	else if(value.data){
		x=value.data[0];
		y=value.data[1];
		z=value.data[2];
	}
	else if(value instanceof Array){
		x=value[0];
		y=value[1];
		z=value[2];
	}
	return GLGE.Mat([
		x,0,0,0,
		0,y,0,0,
		0,0,z,0,
		0,0,0,1
		]);
}
/**
* @constant 
* @description Enum for XYZ rotation order
*/
GLGE.ROT_XYZ=1;
/**
* @constant 
* @description Enum for XZY rotation order
*/
GLGE.ROT_XZY=2;
/**
* @constant 
* @description Enum for YXZ rotation order
*/
GLGE.ROT_YXZ=3;
/**
* @constant 
* @description Enum for YZX rotation order
*/
GLGE.ROT_YZX=4;
/**
* @constant 
* @description Enum for ZXY rotation order
*/
GLGE.ROT_ZXY=5;
/**
* @constant 
* @description Enum for ZYX rotation order
*/
GLGE.ROT_ZYX=6;
/**
 * Creates a rotation matrix
 * @returns {Array} value an array GLGE.Vec or 3 paramters
 * @returns {GLGE.Mat} the rotation matrix
 */
GLGE.rotateMatrix=function(value,type) {
    var x;
    var y;
    var z;
	if(arguments.length>2){
		x=arguments[0];
		y=arguments[1];
		z=arguments[2];
		type=arguments[3];
	}
	else if(value.data){
		x=value.data[0];
		y=value.data[1];
		z=value.data[2];
	}
	else if(value instanceof Array){
		x=value[0];
		y=value[1];
		z=value[2];
	}
	if(!type) type=GLGE.ROT_XYZ;
	var cosx=Math.cos(x);
	var sinx=Math.sin(x);
	var cosy=Math.cos(y);
	var siny=Math.sin(y);
	var cosz=Math.cos(z);
	var sinz=Math.sin(z);
	var rotx=GLGE.Mat([1,0,0,0,0,cosx,-sinx,0,0,sinx,cosx,0,0,0,0,1]);
	var roty=GLGE.Mat([cosy,0,siny,0,0,1,0,0,-siny,0,cosy,0,0,0,0,1]);
	var rotz=GLGE.Mat([cosz,-sinz,0,0,sinz,cosz,0,0,0,0,1,0,0,0,0,1]);
	switch(type){
		case GLGE.ROT_XYZ:
			return GLGE.mulMat4(rotx,GLGE.mulMat4(roty,rotz));
			break;
		case GLGE.ROT_XZY:
			return GLGE.mulMat4(rotx,GLGE.mulMat4(rotz,roty));
			break;
		case GLGE.ROT_YXZ:
			return GLGE.mulMat4(roty,GLGE.mulMat4(rotx,rotz));
			break;
		case GLGE.ROT_YZX:
			return GLGE.mulMat4(roty,GLGE.mulMat4(rotz,rotx));
			break;
		case GLGE.ROT_ZXY:
			return GLGE.mulMat4(rotz,GLGE.mulMat4(rotx,roty));
			break;
		case GLGE.ROT_ZYX:
			return GLGE.mulMat4(rotz,GLGE.mulMat4(roty,rotx));
			break;
	}
}


GLGE.angleAxis=function(angle, axis) {
    var xmx,ymy,zmz,xmy,ymz,zmx,xms,yms,zms;
	axis=[axis[0],axis[1],axis[2],0];

        var x = axis[0];
        var y = axis[1];
        var z = axis[2];
	
	        
        var cos = Math.cos(angle);
        var cosi = 1.0 - cos;
	var sin = Math.sin(angle);
 
	xms = x * sin;yms = y * sin;zms = z * sin;
        xmx = x * x;ymy = y * y;zmz = z * z;
        xmy = x * y;ymz = y * z;zmx = z * x;
	
	var matrix = [(cosi * xmx) + cos,(cosi * xmy) - zms,(cosi * zmx) + yms,0,
			(cosi * xmy) + zms,(cosi * ymy) + cos,(cosi * ymz) - xms,0,
			(cosi * zmx) - yms,(cosi * ymz) + xms,(cosi * zmz) + cos,0,
			0,0,0,1];

        return GLGE.Mat(matrix);
};

GLGE.quatRotation=function(qx,qy,qz,qw){
	return GLGE.Mat([
	                    1 - 2*qy*qy - 2*qz*qz,2*qx*qy - 2*qz*qw,2*qx*qz + 2*qy*qw,0,
	                    2*qx*qy + 2*qz*qw,1 - 2*qx*qx - 2*qz*qz,2*qy*qz - 2*qx*qw,0,
	                    2*qx*qz - 2*qy*qw,2*qy*qz + 2*qx*qw,1 - 2*qx*qx - 2*qy*qy,0,
	                    0,0,0,1
	                ]);
};


GLGE.makeOrtho=function(left,right,bottom,top,near,far){
	var x = -(right+left)/(right-left);
	var y = -(top+bottom)/(top-bottom);
	var z = -(far+near)/(far-near);

        return GLGE.Mat([2/(right-left), 0, 0, x,
               0, 2/(top-bottom), 0, y,
               0, 0, -2/(far-near), z,
               0, 0, 0, 1]);
};


GLGE.makeFrustum=function(left,right,bottom,top,near,far){
	var x = 2*near/(right-left);
	var y = 2*near/(top-bottom);
	var a = (right+left)/(right-left);
	var b = (top+bottom)/(top-bottom);
	var c = -(far+near)/(far-near);
	var d = -2*far*near/(far-near);
	return GLGE.Mat([x, 0, a, 0,
		       0, y, b, 0,
		       0, 0, c, d,
		       0, 0, -1, 0]);
};

GLGE.makePerspective=function(fovy, aspect, near, far){
	var ymax = near * Math.tan(fovy * 0.00872664625972);
	var ymin = -ymax;
	var xmin = ymin * aspect;
	var xmax = ymax * aspect;
	return GLGE.makeFrustum(xmin, xmax, ymin, ymax, near, far);
};

GLGE.matrix2Scale=function(m){
	var m1=m[0];
	var m2=m[1];
	var m3=m[2];
	var m4=m[4];
	var m5=m[5];
	var m6=m[6];
	var m7=m[8];
	var m8=m[9];
	var m9=m[10];
	var scaleX=Math.sqrt(m1*m1+m2*m2+m3*m3);
	var scaleY=Math.sqrt(m4*m4+m5*m5+m6*m6);
	var scaleZ=Math.sqrt(m7*m7+m8*m8+m9*m9);
	return [scaleX,scaleY,scaleZ]
}


GLGE.rotationMatrix2Quat=function(m){
	var tr = m[0] + m[5] + m[10]+1.0;
	var S,x,y,z,w;

	if (tr > 0) { 
		S = 0.5/Math.sqrt(tr); 
		w = 0.25 / S;
		x = (m[9] - m[6]) * S;
		y = (m[2] - m[8]) * S; 
		z = (m[4] - m[1]) * S; 
	} else if ((m[0] > m[5])&&(m[0] > m[10])) { 
		S = Math.sqrt(1.0 + m[0] - m[5] - m[10]) * 2; 
		w = (m[9] - m[6]) / S;
		x = 0.25 / S;
		y = (m[1] + m[4]) / S; 
		z = (m[2] + m[8]) / S; 
	} else if (m[5] > m[10]) { 
		S = Math.sqrt(1.0 + m[5] - m[0] - m[10]) * 2;
		w = (m[2] - m[8]) / S;
		x = (m[1] + m[4]) / S; 
		y = 0.25 / S;
		z = (m[6] + m[9]) / S; 
	} else { 
		S = Math.sqrt(1.0 + m[10] - m[0] - m[5]) * 2; 
		w = (m[4] - m[1]) / S;
		x = (m[2] + m[8]) / S;
		y = (m[6] + m[9]) / S;
		z = 0.25 / S;
	}
	var N=Math.sqrt(x*x+y*y+z*z+w*w)
	
	return [x/N,y/N,z/N,w/N];
}



//returns plane as array [X,Y,Z,D]
GLGE.rayToPlane=function(origin,dir){
	var dirnorm=GLGE.toUnitVec3(dir);
	return [dirnorm[0],dirnorm[1],dirnorm[2],GLGE.dotVec3(origin,dirnorm)];
}

GLGE.rayIntersectPlane=function(origin,dir,plane){
	var planeN=[plane[0],plane[1],plane[2]];
	var planeD=plane[3];
	var vdir=GLGE.dotVec3(planeN,dir);
	if(vdir<=0){
		//ray in wrong direction
		return false;
	}
	var vo=-(GLGE.dotVec3(planeN,origin)+planeD);
	var t=vo/vdir;
	if(t<=0){
		return false;
	}
	return GLGE.addVec3(origin,GLGE.scaleVec3(dir,t));
}
//assumes perspective projection
GLGE.screenToDirection=function(x,y,width,height,proj){
	xcoord =  -( ( ( 2 * x ) / width ) - 1 ) / proj[0];
	ycoord =( ( ( 2 * y ) / height ) - 1 ) / proj[5];
	zcoord =  1;
	return GLGE.toUnitVec3([xcoord,ycoord,zcoord]);
}

GLGE.BoundingVolume=function(minX,maxX,minY,maxY,minZ,maxZ){
	this.limits=[minX,maxX,minY,maxY,minZ,maxZ];
	
	this.calcProps();
}


GLGE.BoundingVolume.prototype.getCornerPoints=function(){
	return this.points;
}

//returns the radius of a bounding sphere
GLGE.BoundingVolume.prototype.getSphereRadius=function(){
	return this.radius;
}

//returns the center of a bounding volume
GLGE.BoundingVolume.prototype.getCenter=function(){
	return this.center;
}
GLGE.BoundingVolume.prototype.isNull=function(){
	return this.limits[0]==0&&this.limits[1]==0&&this.limits[2]==0&&this.limits[3]==0&&this.limits[4]==0&&this.limits[5]==0;
}
//adds an additional bounding volume to resize the current and returns the result
GLGE.BoundingVolume.prototype.addBoundingVolume=function(vol){
	if (this.isNull()) {
		this.limits[0]=vol.limits[0];
		this.limits[1]=vol.limits[1];
		this.limits[2]=vol.limits[2];
		this.limits[3]=vol.limits[3];
		this.limits[4]=vol.limits[4];
		this.limits[5]=vol.limits[5];
	}
	else if (!vol.isNull()) {
		this.limits[0]=Math.min(vol.limits[0],this.limits[0]);
		this.limits[2]=Math.min(vol.limits[2],this.limits[2]);
		this.limits[4]=Math.min(vol.limits[4],this.limits[4]);
		this.limits[1]=Math.max(vol.limits[1],this.limits[1]);
		this.limits[3]=Math.max(vol.limits[3],this.limits[3]);
		this.limits[5]=Math.max(vol.limits[5],this.limits[5]);
    }
	
	this.calcProps();
}

//scales a volume based on a transform matrix
GLGE.BoundingVolume.prototype.applyMatrix=function(matrix){
	var coord0=GLGE.mulMat4Vec4(matrix,[this.limits[0],this.limits[2],this.limits[4],1]);
	var coord1=GLGE.mulMat4Vec4(matrix,[this.limits[1],this.limits[2],this.limits[4],1]);
	var coord2=GLGE.mulMat4Vec4(matrix,[this.limits[0],this.limits[3],this.limits[4],1]);
	var coord3=GLGE.mulMat4Vec4(matrix,[this.limits[1],this.limits[3],this.limits[4],1]);
	var coord4=GLGE.mulMat4Vec4(matrix,[this.limits[0],this.limits[2],this.limits[5],1]);
	var coord5=GLGE.mulMat4Vec4(matrix,[this.limits[1],this.limits[2],this.limits[5],1]);
	var coord6=GLGE.mulMat4Vec4(matrix,[this.limits[0],this.limits[3],this.limits[5],1]);
	var coord7=GLGE.mulMat4Vec4(matrix,[this.limits[1],this.limits[3],this.limits[5],1]);
	this.limits[0]=Math.min(coord0[0],coord1[0],coord2[0],coord3[0],coord4[0],coord5[0],coord6[0],coord7[0]);
	this.limits[1]=Math.max(coord0[0],coord1[0],coord2[0],coord3[0],coord4[0],coord5[0],coord6[0],coord7[0]);
	this.limits[2]=Math.min(coord0[1],coord1[1],coord2[1],coord3[1],coord4[1],coord5[1],coord6[1],coord7[1]);
	this.limits[3]=Math.max(coord0[1],coord1[1],coord2[1],coord3[1],coord4[1],coord5[1],coord6[1],coord7[1]);
	this.limits[4]=Math.min(coord0[2],coord1[2],coord2[2],coord3[2],coord4[2],coord5[2],coord6[2],coord7[2]);
	this.limits[5]=Math.max(coord0[2],coord1[2],coord2[2],coord3[2],coord4[2],coord5[2],coord6[2],coord7[2]);
	this.calcProps();
}

GLGE.BoundingVolume.prototype.calcProps=function(){
	var minX=this.limits[0];
	var maxX=this.limits[1];
	var minY=this.limits[2];
	var maxY=this.limits[3];
	var minZ=this.limits[4];
	var maxZ=this.limits[5];
	this.points=[
		[minX,minY,minZ],
		[maxX,minY,minZ],
		[minX,maxY,minZ],
		[maxX,maxY,minZ],
		[minX,minY,maxZ],
		[maxX,minY,maxZ],
		[minX,maxY,maxZ],
		[maxX,maxY,maxZ]
	];
	this.center=[(this.limits[1]-this.limits[0])/2+this.limits[0],(this.limits[3]-this.limits[2])/2+this.limits[2],(this.limits[5]-this.limits[4])/2+this.limits[4]];
	var dx=this.limits[0]-this.center[0];
	var dy=this.limits[2]-this.center[1];
	var dz=this.limits[4]-this.center[2];
	this.radius=Math.sqrt(dx*dx+dy*dy+dz*dz);
}

GLGE.BoundingVolume.prototype.clone=function(){
	return new GLGE.BoundingVolume(this.limits[0],this.limits[1],this.limits[2],this.limits[3],this.limits[4],this.limits[5]);
}

GLGE.BoundingVolume.prototype.toString=function(){
	return this.limits.toString();
}


//creates the bounding planes for the cameraViewProjectionMatrix
GLGE.cameraViewProjectionToPlanes=function(cvp){
	var cvpinv=GLGE.inverseMat4(cvp);
	var mulMat4Vec4=GLGE.mulMat4Vec4;
	var subVec3=GLGE.subVec3;
	var crossVec3=GLGE.crossVec3;
	var toUnitVec3=GLGE.toUnitVec3;
	var dotVec3=GLGE.dotVec3
	
	var nbl=mulMat4Vec4(cvpinv,[-1,-1,-1,1]);
	var nbr=mulMat4Vec4(cvpinv,[1,-1,-1,1]);
	var fbl=mulMat4Vec4(cvpinv,[-1,-1,1,1]);
	var ntr=mulMat4Vec4(cvpinv,[1,1,-1,1]);
	var ftr=mulMat4Vec4(cvpinv,[1,1,1,1]);
	var ftl=mulMat4Vec4(cvpinv,[-1,1,1,1]);
	
	nbl=[nbl[0]/nbl[3],nbl[1]/nbl[3],nbl[2]/nbl[3]];
	nbr=[nbr[0]/nbr[3],nbr[1]/nbr[3],nbr[2]/nbr[3]];
	fbl=[fbl[0]/fbl[3],fbl[1]/fbl[3],fbl[2]/fbl[3]];
	ntr=[ntr[0]/ntr[3],ntr[1]/ntr[3],ntr[2]/ntr[3]];
	ftr=[ftr[0]/ftr[3],ftr[1]/ftr[3],ftr[2]/ftr[3]];
	ftl=[ftl[0]/ftl[3],ftl[1]/ftl[3],ftl[2]/ftl[3]];

	var nearnorm=toUnitVec3(crossVec3(subVec3(ntr,nbr),subVec3(nbl,nbr)));
	var farnorm=toUnitVec3(crossVec3(subVec3(ftl,fbl),subVec3(ftr,fbl)));
	var leftnorm=toUnitVec3(crossVec3(subVec3(nbl,fbl),subVec3(ftl,fbl)));
	var rightnorm=toUnitVec3(crossVec3(subVec3(ftr,ntr),subVec3(ntr,nbr)));
	var topnorm=toUnitVec3(crossVec3(subVec3(ftl,ntr),subVec3(ntr,ftr)));
	var bottomnorm=toUnitVec3(crossVec3(subVec3(nbl,nbr),subVec3(fbl,nbl)));

	nearnorm.push(dotVec3(nearnorm,nbl));
	farnorm.push(dotVec3(farnorm,fbl));
	leftnorm.push(dotVec3(leftnorm,nbl));
	rightnorm.push(dotVec3(rightnorm,nbr));
	topnorm.push(dotVec3(topnorm,ftr));
	bottomnorm.push(dotVec3(bottomnorm,nbl));
	//might be worth calulating the frustum sphere for optimization at this point!
	
	return [nearnorm,farnorm,leftnorm,rightnorm,topnorm,bottomnorm];
}


//Checks if sphere is within frustum planes
//sphere passed as [center.x,center.y,center.z,radius]
GLGE.sphereInFrustumPlanes=function(sphere,planes){
	var sphere0=sphere[0];var sphere1=sphere[1];
	var sphere2=sphere[2];var sphere3=sphere[3];
	var plane0=planes[0];var plane1=planes[1];
	var plane2=planes[2];var plane3=planes[3];
	var plane4=planes[4];var plane5=planes[5];
	if(sphere0*plane0[0] + sphere1*plane0[1] + sphere2*plane0[2] - plane0[3] - sphere3 > 0
	|| sphere0*plane1[0] + sphere1*plane1[1] + sphere2*plane1[2] - plane1[3]  - sphere3 > 0
	|| sphere0*plane2[0] + sphere1*plane2[1] + sphere2*plane2[2] - plane2[3]  - sphere3 > 0
	|| sphere0*plane3[0] + sphere1*plane3[1] + sphere2*plane3[2] - plane3[3]  - sphere3 > 0
	|| sphere0*plane4[0] + sphere1*plane4[1] + sphere2*plane4[2] - plane4[3]  - sphere3 > 0
	|| sphere0*plane5[0] + sphere1*plane5[1] + sphere2*plane5[2] - plane5[3]  - sphere3 > 0){
		return false;
	}else{
		return true;
	}
}

//checks if cube points are within the frustum planes
GLGE.pointsInFrustumPlanes=function(points,planes){
	var plane0=planes[0];var plane1=planes[1];
	var plane2=planes[2];var plane3=planes[3];
	var plane4=planes[4];var plane5=planes[5];
	var x, y, z;
	
	for(var i=0; i<points.length;i++){
		x=points[i][0];
		y=points[i][1];
		z=points[i][2];
	
		if(x*plane0[0] + y*plane0[1] + z*plane0[2] - plane0[3] > 0
		&& x*plane1[0] + y*plane1[1] + z*plane1[2] - plane1[3]  > 0
		&& x*plane2[0] + y*plane2[1] + z*plane2[2] - plane3[3]  > 0
		&& x*plane3[0] + y*plane3[1] + z*plane3[2] - plane4[3]  > 0
		&& x*plane4[0] + y*plane4[1] + z*plane4[2] - plane4[3]  > 0
		&& x*plane5[0] + y*plane5[1] + z*plane5[2] - plane5[3]  > 0){
			return false;
		}
	}
	return true;
}


function GLGE_mathUnitTest() {
    var a=GLGE.Vec([1,2,3,4]);
    var b=GLGE.Vec4(GLGE.getVec4(a,3),
                    GLGE.get1basedVec4(a,3),
                    GLGE.getVec4(a,1),
                    GLGE.getVec4(a,0));
    var c=GLGE.identMatrix();
    var d=GLGE.mulMat4Vec4(c,b);
    if (GLGE.getVec4(d,0)!=4||
        GLGE.getVec4(d,1)!=3||
        GLGE.getVec4(d,2)!=2||
        GLGE.getVec4(d,3)!=1) {
        throw "Unit Test 1 failed MatVecMul "+d;
    }
    var m=GLGE.Mat4([3,4,5,0,.5,.75,0,0,.75,.5,0,0,.25,.25,1,1]);
    var m1=GLGE.Mat4([2,1,8,2,1,4,3,2,1,.5,6.5,2,8,3,1,.25]);
    var mm1=GLGE.mulMat4(m,m1);
    var am1=GLGE.Mat4([15,21.5,68.5,24,
                       1.75,3.5,6.25,2.5,
                       2,2.75,7.5,2.5,
                       9.75,4.75,10.25,3.25]);
    for (var i=0;i<4;++i) {
        for (var j=0;j<4;++j) {      
            var diff=GLGE.getMat4(mm1,i,j)-GLGE.getMat4(am1,i,j);
            if (diff<.000001&&diff>-.000001) {                

            }else {
                throw "Unit Test 1 failed Multiplication "+GLGE.getMat4(mm1,i,j)+" != "+GLGE.getMat4(am1,i,j);      
            }
        }
    }
    var inv = GLGE.inverseMat4(m);
    var k = GLGE.mulMat4(m,inv);
    var l = GLGE.mulMat4(inv,m);
    for (var i=0;i<4;++i) {
        for (var j=0;j<4;++j) {      
            var diff=GLGE.getMat4(k,i,j)-GLGE.getMat4(c,i,j);
            if (diff<.0001&&diff>-.0001) {                
            }else {
                throw "Unit Test 1 failed Inverse "+GLGE.getMat4(k,i,j)+" != "+GLGE.getMat4(c,i,j);   
            }
        }
    }
}
GLGE_mathUnitTest() ;



})(GLGE);
/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge.js
 * @author me@paulbrunt.co.uk
 */



 if(typeof(GLGE) == "undefined"){
	/**
	* @namespace Holds the functionality of the library
	*/
	GLGE = {};
}

(function(GLGE){

//speed ups parsing a float that is already a float is expensive!
var parseFloat2=function(val){
	if(typeof val!="number") return parseFloat(val);
		else return val;
}


/**
* Function to augment one object with another
* @param {object} obj1 Source Object
* @param {object} obj2 Destination Object
*/
GLGE.augment=function(obj1,obj2){
	for(proto in obj1.prototype){
		obj2.prototype[proto]=obj1.prototype[proto];
	}
}


/**
* Moves all GLGE function to global
**/
GLGE.makeGlobal=function(){
	for(var key in GLGE){
		window[key]=GLGE[key];
	}
}

GLGE.New=function(createclass){
	if(GLGE[createclass].prototype.className!=""){
		return new GLGE[createclass]();
	}else{
		return false;
	}
}

/**
* @constant 
* @description Enumeration for TRUE
*/
GLGE.TRUE=1;
/**
* @constant 
* @description Enumeration for FALSE
*/
GLGE.FALSE=0;


/**
* @constant 
* @description Enumeration for tri rendering
*/
GLGE.DRAW_TRIS=1;
/**
* @constant 
* @description Enumeration for line rendering
*/
GLGE.DRAW_LINES=2;

/**
* @constant 
* @description Enumeration for line loop rendering
*/
GLGE.DRAW_LINELOOPS=3;
/**
* @constant 
* @description Enumeration for line loop rendering
*/
GLGE.DRAW_LINESTRIPS=4;
/**
* @constant 
* @description Enumeration for point rendering
*/
GLGE.DRAW_POINTS=5;


/**
* @constant 
* @description Enumeration for rendering using default shader
*/
GLGE.RENDER_DEFAULT=0;

/**
* @constant 
* @description Enumeration for rendering using shadow shader
*/
GLGE.RENDER_SHADOW=1;

/**
* @constant 
* @description Enumeration for rendering using pick shader
*/
GLGE.RENDER_PICK=2;

/**
* @constant 
* @description Enumeration for rendering using normal shader
*/
GLGE.RENDER_NORMAL=3;

/**
* @constant 
* @description Enumeration for no rendering
*/
GLGE.RENDER_NULL=4;

/**
* @constant 
* @description Enumeration for box bound text picking
*/
GLGE.TEXT_BOXPICK=1;
/**
* @constant 
* @description Enumeration for text bound text picking
*/
GLGE.TEXT_TEXTPICK=1;

/**
* @constant 
* @description Enumeration for euler rotaions mode
*/
GLGE.P_EULER=1;

/**
* @constant 
* @description Enumeration for quaternions mode
*/
GLGE.P_QUAT=2;

/**
* @constant 
* @description Enumeration for matrix rotation mode
*/
GLGE.P_MATRIX=3;

/**
* @constant 
* @description Enumeration for no value
*/
GLGE.NONE=0;

/**
* @constant 
* @description Enumeration for X-Axis
*/
GLGE.XAXIS=1;
/**
* @constant 
* @description Enumeration for Y-Axis
*/
GLGE.YAXIS=2;
/**
* @constant 
* @description Enumeration for Z-Axis
*/
GLGE.ZAXIS=3;

/**
* @constant 
* @description Enumeration for +X-Axis
*/
GLGE.POS_XAXIS=1;
/**
* @constant 
* @description Enumeration for -X-Axis
*/
GLGE.NEG_XAXIS=2;
/**
* @constant 
* @description Enumeration for +Y-Axis
*/
GLGE.POS_YAXIS=3;
/**
* @constant 
* @description Enumeration for -Y-Axis
*/
GLGE.NEG_YAXIS=4;
/**
* @constant 
* @description Enumeration for +Z-Axis
*/
GLGE.POS_ZAXIS=5;
/**
* @constant 
* @description Enumeration for -Z-Axis
*/
GLGE.NEG_ZAXIS=6;

/**
* @constant 
* @description Linear blending function
*/
GLGE.LINEAR_BLEND=function(value){
	return value;
}
/**
* @constant 
* @description Quadratic blending function
*/
GLGE.QUAD_BLEND=function(value){
	return value*value;
}
/**
* @constant 
* @description Special blending function
*/
GLGE.SPECIAL_BLEND=function(value){
	value=value*(2-value);
	return value*value;
}


GLGE.error=function(error){
    if (console&&console.log)
        console.log("GLGE error: "+error);
    //do not use a modal dialog to indicate this users can override GLGE.error if they desire
};

/**
* @namespace Holds the global asset store
*/
GLGE.Assets={};
GLGE.Assets.assets={};
//don't need to register assets unless we are using network or webworkers
GLGE.REGISTER_ASSETS=false;
 
GLGE.Assets.createUUID=function(){
	var data=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	var data2=["8","9","A","B"];
	uuid="";
	for(var i=0;i<38;i++){
		switch(i){
			case 8:uuid=uuid+"-";break;
			case 13:uuid=uuid+"-";break;
			case 18:uuid=uuid+"-";break;
			case 14:uuid=uuid+"4";break;
			case 19:uuid=uuid+data2[Math.round(Math.random()*3)];break;
			default:uuid=uuid+data[Math.round(Math.random()*15)];break;
		}
	}
	return uuid;
}
/**
* @function registers a new asset
*/
GLGE.Assets.registerAsset=function(obj,uid){
	if(GLGE.REGISTER_ASSETS){
		if(!uid){
			uid=GLGE.Assets.createUUID();
		};
		obj.uid=uid;
		GLGE.Assets.assets[uid]=obj;
	}
}
/**
* @function removes an asset
*/
GLGE.Assets.unregisterAsset=function(uid){
	delete GLGE.Assets.assets[uid];
}
/**
* @function finds an asset by uid
*/
GLGE.Assets.get=function(uid){
	var value=GLGE.Assets.assets[uid];
	if(value){
		return value;
	}else{
		return false;
	}
}

/**
* @function hashing function
* @private
*/
GLGE.fastHash=function(str){
	var s1=0;var s2=0;var s3=0;var s4=0;var s5=0;var s6=0;
	var c1=0;var c2=0;var c3=0;var c4=0;var c5=0;var c6=0;
	var i=0;
	var length=str.length;
	str+="000000";
	while(i<length){
		c1=str.charCodeAt(i++);c2=str.charCodeAt(i++);c3=str.charCodeAt(i++);
		c4=str.charCodeAt(i++);c5=str.charCodeAt(i++);c6=str.charCodeAt(i++);
		s1=(s5+c1+c2)%255;s2=(s6+c2+c3)%255;s3=(s1+c3+c4)%255;
		s4=(s2+c4+c5)%255;s5=(s3+c5+c6)%255;s6=(s4+c6+c1)%255;
	}
	var r=[String.fromCharCode(s1),String.fromCharCode(s2),String.fromCharCode(s3),
		String.fromCharCode(s4),String.fromCharCode(s5),String.fromCharCode(s6)];
	return r.join('');
}
/**
* @function check if shader is already created if not then create it
* @private
*/
GLGE.getGLShader=function(gl,type,str){
	var hash=GLGE.fastHash(str);
	if(!gl.shaderCache) gl.shaderCache={};
	if(!gl.shaderCache[hash]){
		var shader=gl.createShader(type);
		gl.shaderSource(shader, str);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			try {
				GLGE.error(gl.getShaderInfoLog(shader));
				return;
			} catch (e) {
				/* Firefox hack: Assume no error if there was no shader log. */
			}
		}
		gl.shaderCache[hash]=shader;
	}
	return gl.shaderCache[hash];
}

var progIdx=0;
/**
* @function tries to re use programs
* @private
*/
GLGE.getGLProgram=function(gl,vShader,fShader){
	if(!gl.programCache) gl.programCache=[];
	var programCache=gl.programCache;
	for(var i=0; i<programCache.length;i++){
		if(programCache[i].fShader==fShader && programCache[i].vShader==vShader){
			return programCache[i].program;
		}
	}
	var program=gl.createProgram();
	program.progIdx=progIdx++;
	gl.attachShader(program, vShader);
	gl.attachShader(program, fShader);
	gl.linkProgram(program);
	programCache.push({vShader:vShader,fShader:fShader,program:program});
	if(!program.uniformDetails){
		program.uniformDetails={};
		var uniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
		for (var i=0;i<uniforms;++i) {
			var info=gl.getActiveUniform(program, i);
			program.uniformDetails[info.name]={loc:GLGE.getUniformLocation(gl,program,info.name),info:info};
		}
	}
	return program;
}


/**
* function to cache the uniform locations
* @param {glcontext} the gl context of the program
* @param {program} the shader program
* @param {string} the uniform name
* @private
*/
GLGE.getUniformLocation=function(gl,program, uniform){
	/*if(program.uniformDetails[uniform]){
		return program.uniformDetails[uniform].loc;
	}else{
		return gl.getUniformLocation(program, uniform);
	}*/
	if(!program.uniformCache) program.uniformCache={};
	if(!program.uniformChecked) program.uniformChecked={};
	if(!program.uniformChecked[uniform]){
		program.uniformCache[uniform]=gl.getUniformLocation(program, uniform);
		program.uniformChecked[uniform]=true;
	}
	return program.uniformCache[uniform];
};
/**
* functions to set uniforms with location check.
*/
GLGE.setUniform=function(gl,type,location,value){
	if(typeof value=="string") value=+value;
	if(location!=null)
		gl["uniform"+type](location,value);

};

GLGE.setUniform3=function(gl,type,location,value1,value2,value3){
	if(typeof value1=="string") value1=+value1;
	if(typeof value2=="string") value2=+value2;
	if(typeof value3=="string") value3=+value3;
	if(location!=null)
		gl["uniform"+type](location,value1,value2,value3);

};
GLGE.setUniform4=function(gl,type,location,value1,value2,value3,value4){
	if(location!=null)
		gl["uniform"+type](location,value1,value2,value3,value4);

};

GLGE.setUniformMatrix=function(gl,type,location,transpose,value){
	if(location!=null)
		gl["uniform"+type](location,transpose,value);
};

/**
* function to cache the attribute locations
* @param {glcontext} the gl context of the program
* @param {program} the shader program
* @param {string} the attribe name
* @private
*/
GLGE.getAttribLocation=function(gl,program, attrib){
	if(!program.attribCache) program.attribCache={};
	if(program.attribCache[attrib]==undefined){
		program.attribCache[attrib]=gl.getAttribLocation(program, attrib);
	}
	return program.attribCache[attrib];
}




/**
* function to parse a colour input into RGB eg #ff00ff, red, rgb(100,100,100)
* @param {string} color the color to parse
*/
GLGE.colorParse=function(color){
	var red,green,blue,alpha;
	//defines the color names
	var color_names = {
		aliceblue: 'f0f8ff',		antiquewhite: 'faebd7',	aqua: '00ffff',
		aquamarine: '7fffd4',	azure: 'f0ffff',		beige: 'f5f5dc',
		bisque: 'ffe4c4',		black: '000000',		blanchedalmond: 'ffebcd',
		blue: '0000ff',			blueviolet: '8a2be2',	brown: 'a52a2a',
		burlywood: 'deb887',	cadetblue: '5f9ea0',		chartreuse: '7fff00',
		chocolate: 'd2691e',		coral: 'ff7f50',		cornflowerblue: '6495ed',
		cornsilk: 'fff8dc',		crimson: 'dc143c',		cyan: '00ffff',
		darkblue: '00008b',		darkcyan: '008b8b',		darkgoldenrod: 'b8860b',
		darkgray: 'a9a9a9',		darkgreen: '006400',	darkkhaki: 'bdb76b',
		darkmagenta: '8b008b',	darkolivegreen: '556b2f',	darkorange: 'ff8c00',
		darkorchid: '9932cc',	darkred: '8b0000',		darksalmon: 'e9967a',
		darkseagreen: '8fbc8f',	darkslateblue: '483d8b',	darkslategray: '2f4f4f',
		darkturquoise: '00ced1',	darkviolet: '9400d3',	deeppink: 'ff1493',
		deepskyblue: '00bfff',	dimgray: '696969',		dodgerblue: '1e90ff',
		feldspar: 'd19275',		firebrick: 'b22222',		floralwhite: 'fffaf0',
		forestgreen: '228b22',	fuchsia: 'ff00ff',		gainsboro: 'dcdcdc',
		ghostwhite: 'f8f8ff',		gold: 'ffd700',			goldenrod: 'daa520',
		gray: '808080',		green: '008000',		greenyellow: 'adff2f',
		honeydew: 'f0fff0',		hotpink: 'ff69b4',		indianred : 'cd5c5c',
		indigo : '4b0082',		ivory: 'fffff0',		khaki: 'f0e68c',
		lavender: 'e6e6fa',		lavenderblush: 'fff0f5',	lawngreen: '7cfc00',
		lemonchiffon: 'fffacd',	lightblue: 'add8e6',		lightcoral: 'f08080',
		lightcyan: 'e0ffff',		lightgoldenrodyellow: 'fafad2',	lightgrey: 'd3d3d3',
		lightgreen: '90ee90',	lightpink: 'ffb6c1',		lightsalmon: 'ffa07a',
		lightseagreen: '20b2aa',	lightskyblue: '87cefa',	lightslateblue: '8470ff',
		lightslategray: '778899',	lightsteelblue: 'b0c4de',	lightyellow: 'ffffe0',
		lime: '00ff00',			limegreen: '32cd32',	linen: 'faf0e6',
		magenta: 'ff00ff',		maroon: '800000',		mediumaquamarine: '66cdaa',
		mediumblue: '0000cd',	mediumorchid: 'ba55d3',	mediumpurple: '9370d8',
		mediumseagreen: '3cb371',	mediumslateblue: '7b68ee',	mediumspringgreen: '00fa9a',
		mediumturquoise: '48d1cc',	mediumvioletred: 'c71585',	midnightblue: '191970',
		mintcream: 'f5fffa',	mistyrose: 'ffe4e1',		moccasin: 'ffe4b5',
		navajowhite: 'ffdead',	navy: '000080',		oldlace: 'fdf5e6',
		olive: '808000',		olivedrab: '6b8e23',		orange: 'ffa500',
		orangered: 'ff4500',	orchid: 'da70d6',		palegoldenrod: 'eee8aa',
		palegreen: '98fb98',		paleturquoise: 'afeeee',	palevioletred: 'd87093',
		papayawhip: 'ffefd5',	peachpuff: 'ffdab9',		peru: 'cd853f',
		pink: 'ffc0cb',		plum: 'dda0dd',		powderblue: 'b0e0e6',
		purple: '800080',		red: 'ff0000',		rosybrown: 'bc8f8f',
		royalblue: '4169e1',		saddlebrown: '8b4513',	salmon: 'fa8072',
		sandybrown: 'f4a460',	seagreen: '2e8b57',		seashell: 'fff5ee',
		sienna: 'a0522d',		silver: 'c0c0c0',		skyblue: '87ceeb',
		slateblue: '6a5acd',		slategray: '708090',	snow: 'fffafa',
		springgreen: '00ff7f',	steelblue: '4682b4',		tan: 'd2b48c',
		teal: '008080',		thistle: 'd8bfd8',		tomato: 'ff6347',
		turquoise: '40e0d0',		violet: 'ee82ee',		violetred: 'd02090',
		wheat: 'f5deb3',		white: 'ffffff',		whitesmoke: 'f5f5f5',
		yellow: 'ffff00',		yellowgreen: '9acd32'
	};
	if(color_names[color]) color="#"+color_names[color];
	if(color.substr && color.substr(0,1)=="#"){
		color=color.substr(1);
		if(color.length==8){
			red=parseInt("0x"+color.substr(0,2))/255;
			green=parseInt("0x"+color.substr(2,2))/255;
			blue=parseInt("0x"+color.substr(4,2))/255;
			alpha=parseInt("0x"+color.substr(6,2))/255;
		}else if(color.length==4){
			red=parseInt("0x"+color.substr(0,1))/15;
			green=parseInt("0x"+color.substr(1,1))/15;
			blue=parseInt("0x"+color.substr(2,1))/15;
			alpha=parseInt("0x"+color.substr(3,1))/15;
		}else if(color.length==6){
			red=parseInt("0x"+color.substr(0,2))/255;
			green=parseInt("0x"+color.substr(2,2))/255;
			blue=parseInt("0x"+color.substr(4,2))/255;
			alpha=1;
		}else if(color.length==3){
			red=parseInt("0x"+color.substr(0,1))/15;
			green=parseInt("0x"+color.substr(1,1))/15;
			blue=parseInt("0x"+color.substr(2,1))/15;
			alpha=1;
		}
	}else if(color.substr && color.substr(0,4)=="rgb("){
		var colors=color.substr(4).split(",");
		red=parseInt(colors[0])/255;
		green=parseInt(colors[1])/255;
		blue=parseInt(colors[2])/255;
		alpha=1;
	}else if(color.substr && color.substr(0,5)=="rgba("){
		var colors=color.substr(4).split(",");
		red=parseInt(colors[0])/255;
		green=parseInt(colors[1])/255;
		blue=parseInt(colors[2])/255;
		alpha=parseInt(colors[3])/255;
	}else{
		red=0;
		green=0;
		blue=0;
		alpha=0;
	}
	return {r:red,g:green,b:blue,a:alpha};
}



})(GLGE);


/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A events class
**/
GLGE.Events=function(){
}
/**
* Fires an event
* @param {string} event The name of the event to fire
* @param {object} data the events data
**/
GLGE.Events.prototype.fireEvent=function(event,data){
	if(this.events && this.events[event]){
		var events=this.events[event];
		for(var i=0;i<events.length;i++){
			events[i].call(this,data);
		}
	}
}
/**
* Adds an event listener
* @param {string} event The name of the event to listen for
* @param {function} fn the event callback
**/
GLGE.Events.prototype.addEventListener=function(event,fn){
	if(!this.events) this.events={};
	if(!this.events[event]) this.events[event]=[];
	this.events[event].push(fn);
}
/**
* Removes an event listener
* @param {function} fn the event callback to remove
**/
GLGE.Events.prototype.removeEventListener=function(event,fn){
	var idx=this.events[event].indexOf(fn);
	if(idx!=-1) this.events[event].splice(idx,1);
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){
	
/**
* @class class to implelemnt quick notation
*/
GLGE.QuickNotation=function(){
}
/**
* Call to set properties and add children to an object
* @example myObject._({LocX:10,LocY:20},child1,child2,.....);
*/
GLGE.QuickNotation.prototype._=function(){
	var argument;
	for(var i=0; i<arguments.length;i++){
		argument=arguments[i];
		if(typeof argument=="object"){
			if(argument.className && this["add"+argument.className]){
				this["add"+argument.className](argument);
			}else{
				for(var key in argument){
					if(this["set"+key]){
						this["set"+key](argument[key]);
					}
				}
			}
		}
	}
	return this;
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class Animation class to agument animatiable objects 
* @augments GLGE.Events
*/
GLGE.Animatable=function(){
}
/**
 * @name GLGE.Animatable#animFinished
 * @event
 * @param {object} data
 */
GLGE.augment(GLGE.Events,GLGE.Animatable);

GLGE.Animatable.prototype.animationStart=null;
GLGE.Animatable.prototype.animation=null;
GLGE.Animatable.prototype.blendStart=0;
GLGE.Animatable.prototype.blendTime=0;
GLGE.Animatable.prototype.lastFrame=null;
GLGE.Animatable.prototype.frameRate=30;
GLGE.Animatable.prototype.loop=GLGE.TRUE;
GLGE.Animatable.prototype.paused=GLGE.FALSE;
GLGE.Animatable.prototype.pausedTime=null;
GLGE.Animatable.prototype.blendFunction=GLGE.LINEAR_BLEND;

/**
* Creates and sets an animation to blend to the properties. Useful for blending to a specific location for example:
* blendto({LocX:10,LocY:5,LocZ:10},2000);
* @param {object} properties The properties to blend
* @param {number} duration the duration of the blend
* @param {function} blendFunction[optional] the function used for blending defaults to GLGE.LINEAR_BLEND
*/
GLGE.Animatable.prototype.blendTo=function(properties,duration,blendFunction){
	if(!blendFunction) blendFunction=GLGE.LINEAR_BLEND;
	var animation=new GLGE.AnimationVector();
	var curve;
	var point;
	for(prop in properties){
		curve=new GLGE.AnimationCurve();
		curve.setChannel(prop);
		point=new GLGE.LinearPoint();
		point.setX(1);
		point.setY(properties[prop]);
		curve.addPoint(point);
		animation.addAnimationCurve(curve);
	}
	this.setBlendFunction(blendFunction);
	this.setAnimation(animation,duration);
	return this;
}
/**
* Sets the animation blending function
* @param {function} value The blending function
*/
GLGE.Animatable.prototype.setBlendFunction=function(value){
	this.blendFunction=value;
	return this;
}
/**
* Gets the animation blending function
* @returns {function} the blending function
*/
GLGE.Animatable.prototype.getBlendFunction=function(){
	return this.blendFunction;
}

/**
* Sets the name of this object used for skinning
* @param {String} value The name to set
*/
GLGE.Animatable.prototype.setName=function(value){
	this.name=value;
	return this;
}
/**
* Gets the name of this object used for skinning
* @returns {String} the name
*/
GLGE.Animatable.prototype.getName=function(){
	return this.name;
}
/**
* gets the frame at the specified time
* @param {number} now the current time
*/
 GLGE.Animatable.prototype.getFrameNumber=function(now){
	if(!this.startFrame) this.startFrame=this.animation.startFrame;
	if(!this.animFrames) this.animFrames=this.animation.frames;
	var frame;
	if(!now) now=parseInt(new Date().getTime());
	if(this.animFrames>1){
		if(this.loop){
			frame=((parseFloat(now)-parseFloat(this.animationStart))/1000*this.frameRate)%(this.animFrames-1)+1+this.startFrame; 
		}else{
			frame=((parseFloat(now)-parseFloat(this.animationStart))/1000*this.frameRate)+1+this.startFrame; 
			if(frame>=this.animFrames){
				frame=this.animFrames;
			}
		}
	}else{
		frame=1;
	}

	return Math.round(frame);
}
 
/**
* Sets the start frame for the animation overriding the animation default
* @param {number} startFrame the start frame
*/
 GLGE.Animatable.prototype.setStartFrame=function(startFrame,blendTime,loop){
	this.loop=loop;
	var starttime=parseInt(new Date().getTime());
	if(!blendTime) blendTime=0;
	if(blendTime>0){
		if(this.animation){
			this.blendInitValues=this.getInitialValues(this.animation,starttime);
			this.blendTime=blendTime;
		}
	}
	this.animationStart=starttime;
	this.lastFrame=null;
	this.animFinished=false;
	this.startFrame=startFrame;
	if(this.children){
		for(var i=0;i<this.children.length;i++){
			if(this.children[i].setStartFrame){
				this.children[i].setStartFrame(startFrame,blendTime,loop);
			}
		}
	}
	return this;
 }
 /**
* Sets the number of frames to play overriding the animation default
* @param {number} frames the number of frames
* @private
*/
 GLGE.Animatable.prototype.setFrames=function(frames){
	this.animFrames=frames;
	if(this.children){
		for(var i=0;i<this.children.length;i++){
			if(this.children[i].setFrames){
				this.children[i].setFrames(frames);
			}
		}
	}
	return this;l
 }
 
 /**
* gets the initial values for the animation vector for blending
* @param {GLGE.AnimationVector} animation The animation
* @private
*/
 GLGE.Animatable.prototype.getInitialValues=function(animation,time){
	var initValues={};
	
	if(this.animation){
		this.lastFrame=null;
		this.animate(time,true);
	}
	
	for(var property in animation.curves){
		if(this["get"+property]){
			initValues[property]=this["get"+property]();
		}
	}
	
	return initValues;
}
 
/**
* update animated properties on this object
*/
GLGE.Animatable.prototype.animate=function(now,nocache){
	if(!this.paused && this.animation){
		if(!now) now=parseInt(new Date().getTime());
		var frame=this.getFrameNumber(now);
		
		if(!this.animation.animationCache) this.animation.animationCache={};
		if(frame!=this.lastFrame || this.blendTime!=0){
			this.lastFrame=frame;
			if(this.blendTime==0){
				if(!this.animation.animationCache[frame] || nocache){
					this.animation.animationCache[frame]=[];
					if(this.animation.curves["LocX"] && this.animation.curves["LocY"] && this.animation.curves["LocZ"]
						&& this.animation.curves["ScaleX"] && this.animation.curves["ScaleY"] && this.animation.curves["ScaleZ"]
						&& this.animation.curves["QuatX"] && this.animation.curves["QuatY"] && this.animation.curves["QuatZ"] && this.animation.curves["QuatW"]){
						//just set matrix
						for(property in this.animation.curves){
							if(this["set"+property]){
								var value=this.animation.curves[property].getValue(parseFloat(frame));
								switch(property){
									case "QuatX":
									case "QuatY":
									case "QuatZ":
									case "QuatW":
									case "LocX":
									case "LocY":
									case "LocZ":
									case "ScaleX":
									case "ScaleY":
									case "ScaleZ":
										break;
									default:
										this.animation.animationCache[frame].push({property:property,value:value});
										break;
								}
								this["set"+property](value);
							}	
						}
						this.animation.animationCache[frame].push({property:"StaticMatrix",value:this.getLocalMatrix()});
					}else{
						for(property in this.animation.curves){
							if(this["set"+property]){
								var value=this.animation.curves[property].getValue(parseFloat(frame));
								switch(property){
									case "QuatX":
									case "QuatY":
									case "QuatZ":
									case "QuatW":
									case "RotX":
									case "RotY":
									case "RotZ":
											var rot=true;
										break;
									default:
										this.animation.animationCache[frame].push({property:property,value:value});
										break;
								}
								this["set"+property](value);
							}	
						}
						if(rot){
							value=this.getRotMatrix();
							this.animation.animationCache[frame].push({property:"RotMatrix",value:value});
						}
					}
				}else{
					var cache=this.animation.animationCache[frame];
					for(var i=0;i<cache.length;i++){
						if(this["set"+cache[i].property]) this["set"+cache[i].property](cache[i].value);
					}
				}
			}else{
				var time=now-this.animationStart;
				if(time<this.blendTime){
					var blendfactor=time/this.blendTime;
					blendfactor=this.blendFunction(blendfactor);
					for(property in this.animation.curves){
						if(this["set"+property]){
							var value=this.animation.curves[property].getValue(parseFloat(frame));
							value=value*blendfactor+this.blendInitValues[property]*(1-blendfactor);
							this["set"+property](value);
						}	
					}
				}else{
					this.blendTime=0;
				}
			}
		}
	}
	if(this.children){
		for(var i=0; i<this.children.length;i++){
			if(this.children[i].animate){
				this.children[i].animate(now,nocache);
			}
		}
	}
	if(this.animation && !this.animFinished && this.blendTime==0 && this.animation.frames==frame && !nocache){
		this.animFinished=true;
		this.fireEvent("animFinished",{});
	}
}
/**
* Sets the animation vector of this object
* @param {GLGE.AnimationVector} animationVector the animation to apply to this object
* @param {number} blendDuration [Optional] the time in milliseconds to blend into this animation
* @param {number} starttime [Optional] the starting time of the animation
*/
GLGE.Animatable.prototype.setAnimation=function(animationVector,blendDuration,starttime){
	if(starttime==null) starttime=parseInt(new Date().getTime());
	if(!blendDuration) blendDuration=0;
	if(blendDuration>0){
		this.blendInitValues=this.getInitialValues(animationVector,starttime);
		this.blendTime=blendDuration;
	}
	this.animFrames=null;
	this.startFrame=null;
	this.animationStart=starttime;
	this.lastFrame=null;
	this.animation=animationVector;
	this.animFinished=false;
	return this;
}
/**
* Gets the animation vector of this object
* @returns {AnimationVector}
*/
GLGE.Animatable.prototype.getAnimation=function(){
	return this.animation;
}
/**
* Sets the frame rate of the animation
* @param  {number} value the frame rate to set
*/
GLGE.Animatable.prototype.setFrameRate=function(value){
	this.frameRate=value;
	return this;
}
/**
* Gets the frame rate of the animation
* @return {number} the current frame rate
*/
GLGE.Animatable.prototype.getFrameRate=function(){
	return this.frameRate;
}
/**
* Sets the loop flag to GLGE.TRUE or GLGE.FALSE
* @param  {boolean} value 
*/
GLGE.Animatable.prototype.setLoop=function(value){
	this.loop=value;
	return this;
}
/**
* Gets the loop flag
* @return {boolean}
*/
GLGE.Animatable.prototype.getLoop=function(){
	return this.loop;
}
/**
* @function is looping? @see GLGE.Animatable#getLoop
*/
GLGE.Animatable.prototype.isLooping=GLGE.Animatable.prototype.getLoop;
 
/**
* Sets the paused flag to GLGE.TRUE or GLGE.FALSE
* @param  {boolean} value 
*/
GLGE.Animatable.prototype.setPaused=function(value){
	if(value) this.pauseTime=parseInt(new Date().getTime());
		else this.animationStart=this.animationStart+(parseInt(new Date().getTime())-this.pauseTime);
	this.paused=value;
	return this;
}
/**
* Gets the paused flag
* @return {boolean}
*/
GLGE.Animatable.prototype.getPaused=function(){
	return this.paused;
}
/**
* Toggles the paused flag
* @return {boolean} returns the resulting flag state
*/
GLGE.Animatable.prototype.togglePaused=function(){
	this.setPaused(!this.getPaused());
	return this.paused;
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class Document class to load scene, object, mesh etc from an external XML file 
* @param {string} url URL of the resource to load
*/
GLGE.Document=function(){
	this.listeners=[];
	this.documents=[];
}
GLGE.Document.prototype.listeners=null;
GLGE.Document.prototype.documents=null;
GLGE.Document.prototype.rootURL=null;
GLGE.Document.prototype.loadCount=0;
GLGE.Document.prototype.version=0;
/**
* This is just a fix for a bug in webkit
* @param {string} id the id name to get
* @returns {object} node with teh specified id
* @private
*/
GLGE.Document.prototype.getElementById=function(id){
	var tags=this.getElementsByTagName("*");
	for(var i=0; i<tags.length;i++){
		if(tags[i].getAttribute("id")==id){
			return tags[i];
			break;
		}
	}
	return null;
}
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.Document.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,8)=="https://"){
		return path;
	}
	else
	{
		if(!relativeto){
			relativeto=window.location.href;
		}
		//find the path compoents
		var bits=relativeto.split("/");
		var domain=bits[2];
		var proto=bits[0];
		var initpath=[];
		for(var i=3;i<bits.length-1;i++){
			initpath.push(bits[i]);
		}
		//relative to domain
		if(path.substr(0,1)=="/"){
			initpath=[];
		}
		var locpath=path.split("/");
		for(i=0;i<locpath.length;i++){
			if(locpath[i]=="..") initpath.pop();
				else if(locpath[i]!="") initpath.push(locpath[i]);
		}
		return proto+"//"+domain+"/"+initpath.join("/");
	}
}
/**
* Loads the root document
* @param {string} url URL of the resource to load
*/
GLGE.Document.prototype.load=function(url){
	this.documents=[];
	this.rootURL=url;
	this.loadDocument(url,null);
}
/**
* Loads an additional documents into the collection
* @param {string} url URL of the resource to load
* @param {string} relativeto the path the URL is relative to, null for default
*/
GLGE.Document.prototype.loadDocument=function(url,relativeto){
	this.loadCount++;
	url=this.getAbsolutePath(url,relativeto);
	var req = new XMLHttpRequest();
	if(req) {
		req.docurl=url;
		req.docObj=this;
		req.overrideMimeType("text/xml");
		req.onreadystatechange = function() {
			if(this.readyState  == 4)
			{
				if(this.status  == 200 || this.status==0){
					this.responseXML.getElementById=this.docObj.getElementById;
					this.docObj.loaded(this.docurl,this.responseXML);
				}else{ 
					GLGE.error("Error loading Document: "+this.docurl+" status "+this.status);
				}
			}
		};
		req.open("GET", url, true);
		req.send("");
	}	
}
/**
* Trigered when a document has finished loading
* @param {string} url the absolute url of the document that has loaded
* @param {XMLDoc} responceXML the xml document that has finished loading
* @private
*/
GLGE.Document.prototype.loaded=function(url,responceXML){
	this.loadCount--;
	this.documents[url]={xml:responceXML};
	var root=responceXML.getElementsByTagName("glge");
	if(root[0] && root[0].hasAttribute("version")) this.version=parseFloat(root[0].getAttribute("version"));
	var imports=responceXML.getElementsByTagName("import");
	for(var i=0; i<imports.length;i++){
		if(!this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]){
			this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]={};
			this.loadDocument(imports[i].getAttribute("url"),url);
		}
	}
	if(this.loadCount==0){
		this.finishedLoading();
	}
}
/**
* Called when all documents have finished loading
* @private
*/
GLGE.Document.prototype.finishedLoading=function(){
	for(var i=0; i<this.listeners.length;i++){
		this.listeners[i](this.listeners.rootURL);
	}
	this["onLoad"]();
}
/**
* Called when all documents have finished loading
* @event
*/
GLGE.Document.prototype["onLoad"]=function(){};
/**
* Converts and attribute name into a class name
* @param {string} name attribute name to convert
* @private
*/
GLGE.Document.prototype.classString=function(name){
	if(!name) return false;
	var names=name.split("_");
	var converted="";
	for(var i=0;i<names.length;i++){
		converted=converted+names[i][0].toUpperCase()+names[i].substr(1);
	}
	return converted;
}
/**
* Sets the properties of an object based on the attributes of the corresponding dom element
* @param {object} Obj the DOM element to apply the attributes of
* @private
*/
GLGE.Document.prototype.setProperties=function(Obj){
	var set_method;
	var attribute_name;
	var value;
	for(var i=0; i<Obj.attributes.length; i++){
		value=false;
		set_method="set"+this.classString(Obj.attributes[i].nodeName);

		if(Obj.attributes[i].value[0]=="#"){
			value=this.getElement(Obj.attributes[i].value.substr(1),true);
		}
		if(!value){
			//if this is a GLGE contsant then set the constant value otherwise just literal
			if(typeof(GLGE[Obj.attributes[i].value]) != "undefined"){
				value=GLGE[Obj.attributes[i].value];
			}
			else
			{
				value=Obj.attributes[i].value;
			}
		}
		
		if(Obj.object[set_method]) Obj.object[set_method](value);
		//if a uid is set in the xml doc then make sure it's registered correctly in the assets
		if(Obj.attributes[i].nodeName=="uid"){
			GLGE.Assets.unregisterAsset(Obj.object.uid);
			Obj.object.uid=Obj.attributes[i].value;
			GLGE.Assets.registerAsset(Obj.object,Obj.attributes[i].value);
		}
	}
}
/**
* Adds child objects 
* @param {object} Obj the DOM element to apply the children of
* @private
*/
GLGE.Document.prototype.addChildren=function(Obj){
	//loop though and add the children
	var add_method;
	var child=Obj.firstChild;
	while(child){
		add_method="add"+this.classString(child.tagName);
		if(Obj.object[add_method]) Obj.object[add_method](this.getElement(child));
		child=child.nextSibling;
	}
}
/**
* Gets an object from the XML document based on the dom element 
* @param {string|domelement} ele the id of the element to get or the dom node
*/
GLGE.Document.prototype.getElement=function(ele,noerrors){
	var docele,doc;
	if(typeof(ele)=="string"){
		for(doc in this.documents){
			if(this.documents[doc].xml){
				docele=this.documents[doc].xml.getElementById(ele);
				if(docele){
					ele=docele;
					break;
				}
			}
		}
	}
	if(typeof(ele)=="string"){
		//if element is still a string at this point there there is an issue
		if(!noerrors) GLGE.error("Element "+ele+" not found in document");
		return false;
	}
	else
	{
		if(this["get"+this.classString(ele.tagName)]){
			return this["get"+this.classString(ele.tagName)](ele);
		}
		else
		{
			return this.getDefault(ele);
		}
	}
}
/**
* Parses the a data array
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getData=function(ele){
	if(!ele.object){
		ele.object=this.parseArray(ele);
		if(ele.hasAttribute("type")){
			var type=ele.getAttribute("type");
			switch(type){
				case "matrix":
					for(var i=0;i<ele.object.length;i++){
						ele.object[i]=GLGE.Mat4(ele.object[i].split(" "));
					}
					break;
				case "links":
					for(var i=0;i<ele.object.length;i++){
						ele.object[i]=this.getElement(ele.object[i].substr(1));
					}
					break;
			}
		}
	}
	return ele.object;
}
/**
* Parses the dom element and creates any objects that are required
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getDefault=function(ele){
	if(!ele.object){
		if(GLGE[this.classString(ele.tagName)]){
			ele.object=new GLGE[this.classString(ele.tagName)]();
			this.setProperties(ele);
			this.addChildren(ele);
		}
		else
		{
			GLGE.error("XML Parse Error: GLGE Object not found"); 
		}
	}
	return ele.object;
}
/**
* Parses the dom element and creates a texture
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getTexture=function(ele){
	if(!ele.object){
		var rel=this.getAbsolutePath(this.rootURL,null);
		ele.object=new GLGE[this.classString(ele.tagName)];
		ele.object.setSrc(this.getAbsolutePath(ele.getAttribute("src"),rel));
		ele.removeAttribute("src");
		this.setProperties(ele);
	}
	return ele.object;
}
GLGE.Document.prototype.getTextureVideo=GLGE.Document.prototype.getTexture;

/**
* Parses a document node into an array
* @param {node} the node to parse
* @private
*/
GLGE.Document.prototype.parseArray=function(node){
	var child=node.firstChild;
	var prev="";
	var output=[];
	var currentArray;
	var i;
	while(child){
		currentArray=(prev+child.nodeValue).split(",");
		child=child.nextSibling;
		if(currentArray[0]=="") currentArray.unshift();
		if(child) prev=currentArray.pop();
		for(i=0;i<currentArray.length;i++) output.push(currentArray[i]);
	}
	return output;
}

/**
* Parses the mesh dom to create the mesh object
* @param {domelement} ele the element to create the mesh from
* @private
*/
GLGE.Document.prototype.getMesh=function(ele){
	if(this.version>0) return this.getDefault(ele); //as of GLGE XML 1.0 the mesh is nothing special!
	
	if(!ele.object){
		ele.object=new GLGE.Mesh();
		this.setProperties(ele);
		var child=ele.firstChild;
		while(child){
			switch(child.tagName){
				case "positions":
					ele.object.setPositions(this.parseArray(child));
					break;
				case "normals":
					ele.object.setNormals(this.parseArray(child));
					break;				
				case "uv1":
					ele.object.setUV(this.parseArray(child));
					break;				
				case "uv2":
					ele.object.setUV2(this.parseArray(child));
					break;
				case "faces":
					ele.object.setFaces(this.parseArray(child));
					break;
				case "joint_names":
					var names=this.parseArray(child);
					var jointObjects=[];
					for(var i=0;i<names.length;i++){
						if(names[i].substr(0,1)=="#"){
							jointObjects.push(this.getElement(names[i].substr(1)));
						}else{
							jointObjects.push(names[i]);
						}
					}
					ele.object.setJoints(jointObjects);
					break;
				case "bind_matrix":
					var mats=this.parseArray(child);
					var invBind=[];
					for(var i=0;i<mats.length;i++){
						invBind.push(GLGE.Mat4(mats[i].split(" ")));
					}
					ele.object.setInvBindMatrix(invBind);
					break;
				case "joints":
					ele.object.setVertexJoints(this.parseArray(child),child.getAttribute("count"));
					break;
				case "weights":
					ele.object.setVertexWeights(this.parseArray(child),child.getAttribute("count"));
					break;
			}
			child=child.nextSibling;
		}
	}
	return ele.object;
}

/**
* Adds a listener to be called when all documents have finished loading
* @param {function} listener the function to call when all loading in complete
*/
GLGE.Document.prototype.addLoadListener=function(listener){
	this.listeners.push(listener);
}
/**
* Removes a load listener
* @param {function} listener Listener to remove
*/
GLGE.Document.prototype.removeLoadListener=function(listener){
	for(var i=0; i<this.listeners.length; i++){
		if(this.listeners[i]===listener) this.listeners.splice(i,1);
	}
}

/**
* loads xml from a script tag
* @param {string} id the id of the element to load
*/
GLGE.Document.prototype.parseScript=function(id){
	this.rootURL=window.location.toString();
	var xmlScript = document.getElementById(id);
	if (!xmlScript) {
		return null;
	}
 
	var str = "";
	var k = xmlScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}
	
	var parser=new DOMParser();
	var xmlDoc=parser.parseFromString(str,"text/xml");
	xmlDoc.getElementById=this.getElementById;
	
	this.documents["#"+id]={xml:xmlDoc};

	var imports=xmlDoc.getElementsByTagName("import");
	for(var i=0; i<imports.length;i++){
		if(!this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]){
			this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]={};
			this.loadDocument(imports[i].getAttribute("url"));
		}
	}
	if(this.loadCount==0){
		this.finishedLoading();
	}
}


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class Abstract class to agument objects that requires position, rotation and scale.
*/
GLGE.Placeable=function(){
}
GLGE.Placeable.prototype.locX=0;
GLGE.Placeable.prototype.locY=0;
GLGE.Placeable.prototype.locZ=0;
GLGE.Placeable.prototype.dLocX=0;
GLGE.Placeable.prototype.dLocY=0;
GLGE.Placeable.prototype.dLocZ=0;
GLGE.Placeable.prototype.quatX=0;
GLGE.Placeable.prototype.quatY=0;
GLGE.Placeable.prototype.quatZ=0;
GLGE.Placeable.prototype.quatW=0;
GLGE.Placeable.prototype.rotX=0;
GLGE.Placeable.prototype.rotY=0;
GLGE.Placeable.prototype.rotZ=0;
GLGE.Placeable.prototype.dRotX=0;
GLGE.Placeable.prototype.dRotY=0;
GLGE.Placeable.prototype.dRotZ=0;
GLGE.Placeable.prototype.scaleX=1;
GLGE.Placeable.prototype.scaleY=1;
GLGE.Placeable.prototype.scaleZ=1;
GLGE.Placeable.prototype.dScaleX=0;
GLGE.Placeable.prototype.dScaleY=0;
GLGE.Placeable.prototype.dScaleZ=0;
GLGE.Placeable.prototype.matrix=null;
GLGE.Placeable.prototype.rotOrder=GLGE.ROT_XYZ;
GLGE.Placeable.prototype.lookAt=null;
GLGE.Placeable.prototype.mode=GLGE.P_EULER;



/**
* Gets the root node object
* @returns {object}
*/
GLGE.Placeable.prototype.getRoot=function(){
	if(this.type==GLGE.G_ROOT){
		return this;
	}else if(this.parent){
		var value=this.parent.getRoot();
		if(!value) return this;
			else return value;
	}else{
		return this;
	}
}
/**
* Gets the id string of this text
* @returns {string}
*/
GLGE.Placeable.prototype.getRef=function(){
	if(this.id){
		return this.id;
	}else if(this.parent){
		return this.parent.getRef();
	}else{
		return null;
	}
}
/**
* Sets the id string
* @param {string} id The id string 
*/
GLGE.Placeable.prototype.setId=function(id){
    this.id=id;
    return this;
}
/**
* Gets the id string of this text
* @returns {string}
*/
GLGE.Placeable.prototype.getId=function(){
	return this.id
}
/**
* gets the object or poisition being looking at
* @param {array|object} value the location/object
*/
GLGE.Placeable.prototype.getLookat=function(){
	return this.lookAt;
}
/**
* sets the look at for this object, will be updated every frame
* @param {array|object} value the location/objec to look at
*/
GLGE.Placeable.prototype.setLookat=function(value){
	this.lookAt=value;
	return this;
}
/**
* Points the object in the direction of the coords or placeable value
* @param {array|object} value the location/objec to look at
*/
GLGE.Placeable.prototype.Lookat=function(value){
	var objpos;
	var pos=this.getPosition();
	if(value.getPosition){
		objpos=value.getPosition();
	}else{
		objpos={x:value[0],y:value[1],z:value[2]};
	}
	
	var coord=[pos.x-objpos.x,pos.y-objpos.y,pos.z-objpos.z];
	var zvec=GLGE.toUnitVec3(coord);
	var xvec=GLGE.toUnitVec3(GLGE.crossVec3([0,0,1],zvec));
	var yvec=GLGE.toUnitVec3(GLGE.crossVec3(zvec,xvec));		
	this.setRotMatrix(GLGE.Mat4([xvec[0], yvec[0], zvec[0], 0,
					xvec[1], yvec[1], zvec[1], 0,
					xvec[2], yvec[2], zvec[2], 0,
					0, 0, 0, 1]));
}
/**
* Gets the euler rotation order
* @returns {number} the objects rotation matrix
*/
GLGE.Placeable.prototype.getRotOrder=function(){
	return this.rotOrder;
}
/**
* Sets the euler rotation order
* @param {number} value the order to rotate GLGE.ROT_XYZ,GLGE.ROT_XZY,etc..
*/
GLGE.Placeable.prototype.setRotOrder=function(value){
	this.rotOrder=value;
	this.matrix=null;
	this.rotmatrix=null;
	return this;
}
/**
* Gets the rotaion matrix 
* @returns {matrix} the objects rotation matrix
*/
GLGE.Placeable.prototype.getRotMatrix=function(){
	if(!this.rotmatrix){
		var rotation=this.getRotation();
		if(this.mode==GLGE.P_EULER) this.rotmatrix=GLGE.rotateMatrix(rotation.x,rotation.y,rotation.z,this.rotOrder);
		if(this.mode==GLGE.P_QUAT)	this.rotmatrix=GLGE.quatRotation(rotation.x,rotation.y,rotation.z,rotation.w);
	}
	return this.rotmatrix;
}
/**
* Sets the rotation matrix 
* @param {matrix} the objects rotation matrix
*/
GLGE.Placeable.prototype.setRotMatrix=function(matrix){
	this.mode=GLGE.P_MATRIX;
	this.rotmatrix=matrix;
	this.updateMatrix();
	return this;
}
/**
* Sets the x location of the object
* @param {number} value The value to assign to the x position
*/
GLGE.Placeable.prototype.setLocX=function(value){this.locX=value; this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the y location of the object
* @param {number} value The value to assign to the y position
*/
GLGE.Placeable.prototype.setLocY=function(value){this.locY=value;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the z location of the object
* @param {number} value The value to assign to the z position
*/
GLGE.Placeable.prototype.setLocZ=function(value){this.locZ=value;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the location of the object
* @param {number} x The value to assign to the x position
* @param {number} y The value to assign to the y position
* @param {number} z The value to assign to the z position
*/
GLGE.Placeable.prototype.setLoc=function(x,y,z){this.locX=x;this.locY=y;this.locZ=z;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the x location displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDLocX=function(value){this.dLocX=value;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the y location displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDLocY=function(value){this.dLocY=value;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the z location displacement of the object, usefull for animation
* @param {number} value The value to assign to the z displacement
*/
GLGE.Placeable.prototype.setDLocZ=function(value){this.dLocZ=value;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the location displacement of the object, useful for animation
* @param {number} x The value to assign to the x position
* @param {number} y The value to assign to the y position
* @param {number} z The value to assign to the z position
*/
GLGE.Placeable.prototype.setDLoc=function(x,y,z){this.dLocX=x;this.dLocY=y;this.dLocZ=z;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the x quat value
* @param {number} value the x quat value
*/
GLGE.Placeable.prototype.setQuatX=function(value){this.mode=GLGE.P_QUAT;this.quatX=parseFloat(value);this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the y quat value
* @param {number} value the y quat value
*/
GLGE.Placeable.prototype.setQuatY=function(value){this.mode=GLGE.P_QUAT;this.quatY=parseFloat(value);this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the z quat value
* @param {number} value the z quat value
*/
GLGE.Placeable.prototype.setQuatZ=function(value){this.mode=GLGE.P_QUAT;this.quatZ=parseFloat(value);this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the w quat value
* @param {number} value the w quat value
*/
GLGE.Placeable.prototype.setQuatW=function(value){this.mode=GLGE.P_QUAT;this.quatW=parseFloat(value);this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the quaternions
* @param {number} x The value to assign to the x 
* @param {number} y The value to assign to the y 
* @param {number} z The value to assign to the z 
* @param {number} w The value to assign to the w
*/
GLGE.Placeable.prototype.setQuat=function(x,y,z,w){this.mode=GLGE.P_QUAT;this.quatX=x;this.quatY=y;this.quatZ=z;this.quatW=w;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}

/**
* Sets the x rotation of the object
* @param {number} value The value to assign to the x rotation
*/
GLGE.Placeable.prototype.setRotX=function(value){this.mode=GLGE.P_EULER;this.rotX=value;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the y rotation of the object
* @param {number} value The value to assign to the y rotation
*/
GLGE.Placeable.prototype.setRotY=function(value){this.mode=GLGE.P_EULER;this.rotY=value;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the z rotation of the object
* @param {number} value The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setRotZ=function(value){this.mode=GLGE.P_EULER;this.rotZ=value;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the rotation of the object
* @param {number} x The value to assign to the x rotation
* @param {number} y The value to assign to the y rotation
* @param {number} z The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setRot=function(x,y,z){this.mode=GLGE.P_EULER;this.rotX=x;this.rotY=y;this.rotZ=z;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the x rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDRotX=function(value){this.mode=GLGE.P_EULER;this.dRotX=value;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the y rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDRotY=function(value){this.mode=GLGE.P_EULER;this.dRotY=value;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the z rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the z displacement
*/
GLGE.Placeable.prototype.setDRotZ=function(value){this.mode=GLGE.P_EULER;this.dRotZ=value;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the rotation displacement of the object, useful for animation
* @param {number} x The value to assign to the x rotation
* @param {number} y The value to assign to the y rotation
* @param {number} z The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setDRot=function(x,y,z){this.mode=GLGE.P_EULER;this.dRotX=x;this.dRotY=y;this.dRotZ=z;this.staticMatrix=null;this.rotmatrix=null;this.updateMatrix();return this;}
/**
* Sets the x scale of the object
* @param {number} value The value to assign to the x scale
*/
GLGE.Placeable.prototype.setScaleX=function(value){if(this.ScaleX==value) return this;this.scaleX=value;this.staticMatrix=null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Sets the y scale of the object
* @param {number} value The value to assign to the y scale
*/
GLGE.Placeable.prototype.setScaleY=function(value){if(this.ScaleY==value) return this;this.scaleY=value;this.staticMatrix=null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Sets the z scale of the object
* @param {number} value The value to assign to the z scale
*/
GLGE.Placeable.prototype.setScaleZ=function(value){if(this.ScaleZ==value) return this;this.scaleZ=value;this.staticMatrix=null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Sets the scale of the object
* @param {number} x The value to assign to the x scale
* @param {number} y The value to assign to the y scale
* @param {number} z The value to assign to the z scale
*/
GLGE.Placeable.prototype.setScale=function(x,y,z){if(!y){y=x;z=x}; this.scaleX=x;this.scaleY=y;this.scaleZ=z;this.staticMatrix=null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Sets the x scale displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDScaleX=function(value){if(this.dScaleX==value) return this;this.dScaleX=value;this.staticMatrix=null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Sets the y scale displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDScaleY=function(value){if(this.dScaleY==value) return this;this.dScaleY=value;this.staticMatrix=null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Sets the z scale displacement of the object, usefull for animation
* @param {number} value The value to assign to the z displacement
*/
GLGE.Placeable.prototype.setDScaleZ=function(value){if(this.dScaleZ==value) return this;this.dScaleZ=value;this.staticMatrix=null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Sets the scale displacement of the object, useful for animation
* @param {number} x The value to assign to the x scale
* @param {number} y The value to assign to the y scale
* @param {number} z The value to assign to the z scale
*/
GLGE.Placeable.prototype.setDScale=function(x,y,z){this.dScaleX=x;this.dScaleY=y;this.dScaleZ=z;this.staticMatrix==null;this.scaleMatrix=null;this.updateMatrix();return this;}
/**
* Gets the x location of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getLocX=function(){return this.locX;}
/**
* Gets the y location of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getLocY=function(){return this.locY;}
/**
* Gets the z location of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getLocZ=function(){return this.locZ;}
/**
* Gets the x location displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDLocX=function(){return this.dLocX;}
/**
* Gets the y location displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDLocY=function(){return this.dLocY;}
/**
* Gets the z location displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDLocZ=function(){return this.dLocZ;}
/**
* Gets the x quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatX=function(){return this.quatX;}
/**
* Gets the y quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatY=function(){return this.quatY;}
/**
* Gets the z quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatZ=function(){return this.quatZ;}
/**
* Gets the w quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatW=function(){return this.quatW;}
/**
* Gets the x rotation of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getRotX=function(){return this.rotX;}
/**
* Gets the y rotation of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getRotY=function(){return this.rotY;}
/**
* Gets the z rotation of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getRotZ=function(){return this.rotZ;}
/**
* Gets the x rotaional displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDRotX=function(){return this.dRotX;}
/**
* Gets the y rotaional displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDRotY=function(){return this.dRotY;}
/**
* Gets the z rotaional displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDRotZ=function(){return this.dRotZ;}
/**
* Gets the x scale of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getScaleX=function(){return this.scaleX;}
/**
* Gets the y scale of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getScaleY=function(){return this.scaleY;}
/**
* Gets the z scale of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getScaleZ=function(){return this.scaleZ;}
/**
* Gets the x scale displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDScaleX=function(){return this.dScaleX;}
/**
* Gets the y scale displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDScaleY=function(){return this.dScaleY;}
/**
* Gets the z scale displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDScaleZ=function(){return this.dScaleZ;}
/**
* Gets the position of the object
* @returns {array}
*/
GLGE.Placeable.prototype.getPosition=function(){
	var position={};
	position.x=parseFloat(this.locX)+parseFloat(this.dLocX);
	position.y=parseFloat(this.locY)+parseFloat(this.dLocY);
	position.z=parseFloat(this.locZ)+parseFloat(this.dLocZ);
	return position;
}
/**
* Gets the rotation of the object
* @returns {object}
*/
GLGE.Placeable.prototype.getRotation=function(){
	var rotation={};
	if(this.mode==GLGE.P_EULER){
		rotation.x=parseFloat(this.rotX)+parseFloat(this.dRotX);
		rotation.y=parseFloat(this.rotY)+parseFloat(this.dRotY);
		rotation.z=parseFloat(this.rotZ)+parseFloat(this.dRotZ);
	}
	if(this.mode==GLGE.P_QUAT){
		rotation.x=parseFloat(this.quatX);
		rotation.y=parseFloat(this.quatY);
		rotation.z=parseFloat(this.quatZ);
		rotation.w=parseFloat(this.quatW);
	}
	return rotation;
}
/**
* Gets the scale of the object
* @returns {object}
*/
GLGE.Placeable.prototype.getScale=function(){
	var scale={};
	scale.x=parseFloat(this.scaleX)+parseFloat(this.dScaleX);
	scale.y=parseFloat(this.scaleY)+parseFloat(this.dScaleY);
	scale.z=parseFloat(this.scaleZ)+parseFloat(this.dScaleZ);
	return scale;
}
/**
* Gets the scale matrix
* @returns {object}
*/
GLGE.Placeable.prototype.getScaleMatrix=function(){
	if(!this.scaleMatrix){
		this.scaleMatrix=GLGE.scaleMatrix(parseFloat(this.scaleX)+parseFloat(this.dScaleX),parseFloat(this.scaleY)+parseFloat(this.dScaleY),parseFloat(this.scaleZ)+parseFloat(this.dScaleZ));
	}
	return this.scaleMatrix;
}
/**
* Gets the translate matrix
* @returns {object}
*/
GLGE.Placeable.prototype.getTranslateMatrix=function(){
	if(!this.translateMatrix){
		this.translateMatrix=GLGE.translateMatrix(parseFloat(this.locX)+parseFloat(this.dLocX),parseFloat(this.locY)+parseFloat(this.dLocY),parseFloat(this.locZ)+parseFloat(this.dLocZ));
	}
	return this.translateMatrix;
}

/**
* Gets the local transform matrix
* @returns {object}
*/
GLGE.Placeable.prototype.getLocalMatrix=function(){
	this.getModelMatrix();
	return this.localMatrix;
}

/**
* Sets a static transfrom matrix, overrides any rotations and translation that may be set
* @returns {object}
*/
GLGE.Placeable.prototype.setStaticMatrix=function(matrix){
	this.staticMatrix=matrix;
	this.updateMatrix();
	return this;
}

/**
* Clears the static matrix if one is set
* @returns {object}
*/
GLGE.Placeable.prototype.clearStaticMatrix=function(){
	this.staticMatrix=null;
	this.updateMatrix();
	return this;
}

/**
* Updates the model matrix
* @private
*/
GLGE.Placeable.prototype.updateMatrix=function(){
	this.matrix=null;
	if(this.children){
		for(var i=0;i<this.children.length;i++){
			this.children[i].updateMatrix();
		}
	}
}
/**
* Gets the model matrix to transform the model within the world
*/
GLGE.Placeable.prototype.getModelMatrix=function(){
	if(!this.matrix){
		this.invmatrix=null;
		this.transmatrix=null;
		this.transinvmatrix=null;
		if(this.staticMatrix){
			var matrix=this.staticMatrix;
			this.localMatrix=this.staticMatrix;
			if(this.parent) matrix=GLGE.mulMat4(this.parent.getModelMatrix(),matrix);
			this.matrix=matrix;
		}else{
			var translate=this.getTranslateMatrix();
			var scale=this.getScaleMatrix();
			var matrix=GLGE.mulMat4(translate,GLGE.mulMat4(this.getRotMatrix(),scale));
			this.localMatrix=matrix;
			if(this.parent) matrix=GLGE.mulMat4(this.parent.getModelMatrix(),matrix);
			this.matrix=matrix;
		}
	}
	return this.matrix;
}
/**
* Gets the model inverse matrix to transform the model within the world
*/
GLGE.Placeable.prototype.getInverseModelMatrix=function(){
	if(!this.matrix){
		this.getModelMatrix();
	}
	if(!this.invmatrix){
		this.invmatrix=GLGE.transposeMat4(this.matrix);
	}
	return this.invmatrix;
}
/**
* Gets the model transposed matrix to transform the model within the world
*/
GLGE.Placeable.prototype.getTransposeModelMatrix=function(){
	if(!this.matrix){
		this.getModelMatrix();
	}
	if(!this.transmatrix){
		this.transmatrix=GLGE.transposeMat4(this.matrix);
	}
	return this.transmatrix;
}
/**
* Gets the model inverse transposed matrix to transform the model within the world
*/
GLGE.Placeable.prototype.getTransposeInverseModelMatrix=function(){
	if(!this.matrix){
		this.getModelMatrix();
	}
	if(!this.transinvmatrix){
		this.invtransmatrix=GLGE.transposeMat4(this.getInverseModelMatrix());
	}
	return this.transinvmatrix;
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @class A class to load json fragments from remote location or string
**/
GLGE.JSONLoader=function(){
}
GLGE.JSONLoader.prototype.downloadPriority=0;
/**
* Loads a json fragment from a url
* @param {string} url The URL to load
**/
GLGE.JSONLoader.prototype.setJSONSrc=function(url){
	var GLGEObj=this;
	GLGE.Message.messageLoader(url,function(text){
		GLGEObj.setJSONString(text);
	},this.downloadPriority);
}
/**
* Loads a json fragment from a string
* @param {string} string The URL to load
**/
GLGE.JSONLoader.prototype.setJSONString=function(string){
	var message = JSON.parse(string);
	//check to make sure this is the correct class type
	if(message.type==this.className){
		message.uid=this.uid;
		//we don't want to create a new one we want to update this one
		message.command="update";
		GLGE.Message.parseMessage(message);
	}
}
/**
* Sets the download priority
* @param {number} value The download priority
**/
GLGE.JSONLoader.prototype.setDownloadPriority=function(value){
	this.downloadPriority=value;
}
/**
* Gets the download priority
* @returns {number} The download priority
**/
GLGE.JSONLoader.prototype.getDownloadPriority=function(){
	return this.downloadPriority;
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @constant 
* @description Enumeration for node group type
*/
GLGE.G_NODE=1;
/**
* @constant 
* @description Enumeration for root group type
*/
GLGE.G_ROOT=2;
/**
* @class Group class to allow object transform hierarchies 
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Group=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.children=[];
}
GLGE.augment(GLGE.Placeable,GLGE.Group);
GLGE.augment(GLGE.Animatable,GLGE.Group);
GLGE.augment(GLGE.QuickNotation,GLGE.Group);
GLGE.augment(GLGE.JSONLoader,GLGE.Group);
GLGE.Group.prototype.children=null;
GLGE.Group.prototype.className="Group";
GLGE.Group.prototype.type=GLGE.G_NODE;
/**
* Sets the action for this Group
* @param {GLGE.Action} action the action to apply
*/
GLGE.Group.prototype.setAction=function(action,blendTime,loop){
	action.start(blendTime,loop,this.getNames());
	return this;
}
/**
* Gets the name of the object and names of any sub objects
* @returns an object of name
*/
GLGE.Group.prototype.getNames=function(names){
	if(!names) names={};
	var thisname=this.getName();
	if(thisname!="") names[thisname]=this;
	for(var i=0;i<this.children.length;i++){
		if(this.children[i].getNames){
			this.children[i].getNames(names);
		}
	}
	return names;
}
/**
* Gets the bounding volume for this group
* @returns {GLGE.BoundingVolume} 
*/
GLGE.Group.prototype.getBoundingVolume=function(local){
	this.boundingVolume=null;
	for(var i=0; i<this.children.length;i++){
		if(this.children[i].getBoundingVolume){
			if(!this.boundingVolume) {
				this.boundingVolume=this.children[i].getBoundingVolume(true).clone();
			}else{
				this.boundingVolume.addBoundingVolume(this.children[i].getBoundingVolume(true));
			}
		}
	}
	if(!this.boundingVolume) this.boundingVolume=new GLGE.BoundingVolume(0,0,0,0,0,0);
	if(local){
		this.boundingVolume.applyMatrix(this.getLocalMatrix());
	}else{
		this.boundingVolume.applyMatrix(this.getModelMatrix());
	}
	
	return this.boundingVolume;
}
/**
* Gets a list of all objects in this group
* @param {array} pointer to an array [optional]
* @returns {GLGE.Object[]} an array of GLGE.Objects
*/
GLGE.Group.prototype.getObjects=function(objects){
	if(this.lookAt) this.Lookat(this.lookAt);
	if(this.animation) this.animate();

	if(!objects) objects=[];
	for(var i=0; i<this.children.length;i++){
		if(this.children[i].className=="Object" || this.children[i].className=="Text" || this.children[i].toRender){
		if(this.children[i].renderFirst) objects.unshift(this.children[i]);
			else	objects.push(this.children[i]);
		}else if(this.children[i].getObjects){
			this.children[i].getObjects(objects);
		}
	}
	return objects;
}
/**
* Gets a list of all lights in this group
* @param {array} pointer to an array [optional]
* @returns {GLGE.Lights[]} an array of GLGE.Lights
*/
GLGE.Group.prototype.getLights=function(lights){
	if(!lights) lights=[];
	for(var i=0; i<this.children.length;i++){
		if(this.children[i].className=="Light"){
			lights.push(this.children[i]);
		}else if(this.children[i].getLights){
			this.children[i].getLights(lights);
		}
	}
	return lights;
}


/**
* Adds a new object to this group
* @param {object} object the object to add to this group
*/
GLGE.Group.prototype.addChild=function(object){
	if(object.parent) object.parent.removeChild(object);
	object.matrix=null; //clear any cache
	object.parent=this;
	this.children.push(object);
	//if the child added contains lights or is a light then we'll need to update shader programs
	if((object.getLights && object.getLights().length>0) || object.className=="Light"){
		var root=object;
		while(root.parent) root=root.parent;
		var objects=root.getObjects();
		for(var i=0;i<objects.length;i++){
			if(objects[i].updateProgram) objects[i].updateProgram();
		}
	}	
	return this;
}
GLGE.Group.prototype.addObject=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addObjectInstance=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addGroup=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addLight=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addText=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addSkeleton=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addCamera=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addWavefront=GLGE.Group.prototype.addChild;


/**
* Removes an object or sub group from this group
* @param {object} object the item to remove
*/
GLGE.Group.prototype.removeChild=function(object){
	for(var i=0;i<this.children.length;i++){
		if(this.children[i]==object){
			this.children.splice(i, 1);
			if(this.scene && this.scene["remove"+object.className]){
				this.scene["remove"+object.className](object);
			}
			break;
		}
	}
}



/**
* Gets an array of all children in this group
*/
GLGE.Group.prototype.getChildren=function(){
	return this.children;
}
/**
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Group.prototype.GLInit=function(gl){
	this.gl=gl;
	for(var i=0;i<this.children.length;i++){
		if(this.children[i].GLInit){
			this.children[i].GLInit(gl);
		}
	}
}
/**
* Gets the pickable flag for the object
*/
GLGE.Group.prototype.getPickable=function(){
	return this.pickable;
}
/**
* Sets the pickable flag for the object
* @param {boolean} value the picking flag
*/
GLGE.Group.prototype.setPickable=function(pickable){
	for(var i=0;i<this.children.length;i++){
		if(this.children[i].setPickable){
			this.children[i].setPickable(pickable);
		}
	}
	this.pickable=pickable;
	return this;
}
 

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @namespace GLGE Messaging System
*/
GLGE.Message={};
/**
* @function parses messages and updates the scene graph
*/
GLGE.Message.parseMessage=function(msg){
	switch(msg.command){
		case "create":
			var obj=new GLGE[msg.type](msg.uid);
			this.setAttributes(obj,msg.attributes);
			if(msg.children) GLGE.Message.addChildren(obj,msg.children);
			return obj;
			break;
		case "update":
			var obj=GLGE.Assets.get(msg.uid);
			this.setAttributes(obj,msg.attributes);
			if(msg.add) GLGE.Message.addChildren(obj,msg.add);
			if(msg.remove) GLGE.Message.removeChildren(obj,msg.remove);
			return obj;
			break;
	}
	return null;
}
/**
* @function parses the attributes from a message
* @private
*/
GLGE.Message.setAttributes=function(obj,attribs){
	if(attribs){
		for(var attrib in attribs){
			if(obj["set"+attrib]){
				//check to see if the attribute has to be parsed as a message
				if(attribs[attrib].command){
					attribs[attrib]=GLGE.Message.parseMessage(attribs[attrib]);
				}
				obj["set"+attrib](attribs[attrib]);
			}
		}
	}
	return this;
}
/**
* @function parses the children to add
* @private
*/
GLGE.Message.addChildren=function(obj,children){
	if(!(children instanceof Array)) children=[children];
	for(var i=0;i<children.length;i++){
		if(children[i].command){
			var asset=GLGE.Message.parseMessage(children[i]);
		}else{
			var asset=GLGE.Assets.get(children[i]);
		}
		obj["add"+asset.className](asset);
	}
}
/**
* @function parses the children to remove
* @private
*/
GLGE.Message.removeChildren=function(obj,children){
	if(!(children instanceof Array)) children=[children];
	for(var i=0;i<children.length;i++){
		var asset=GLGE.Assets.get(children[i]);
		obj["add"+asset.className](asset);
	}
}

GLGE.Message.toLoad=[];
GLGE.Message.messageLoader=function(url,callback,priority){
	GLGE.Message.toLoad.push([url,callback,priority]);
	if(GLGE.Message.toLoad.length==1) GLGE.Message.loadMessages();
}
GLGE.Message.loadMessages=function(){
	//TODO: use priority
	var nextDoc=GLGE.Message.toLoad.pop();
	var req=new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState  == 4){
			if(this.status  == 200 || this.status==0){
				nextDoc[1](this.responseText);
			}else{ 
				GLGE.error("Error loading Document: "+nextDoc[0]+" status "+this.status);
			}
		}
	}
	req.open("GET", nextDoc[0], true);
	req.send("");
	if(GLGE.Message.toLoad.length>0) GLGE.Message.loadMessages();
}


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class Class to describe and action on a skeleton
* @param {string} uid a unique reference string for this object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Action=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.channels=[];
};
GLGE.augment(GLGE.QuickNotation,GLGE.Action);
GLGE.augment(GLGE.JSONLoader,GLGE.Action);
/**
 * @name Action#animFinished
 * @event
 * @param {object} data
 */
GLGE.augment(GLGE.Events,GLGE.Action);

/**
* Starts playing the action
*/
GLGE.Action.prototype.start=function(blendTime,loop,names){
	if(!loop) loop=false;
	if(!blendTime) blendTime=0;
	var channels=this.channels;
	var start=(new Date()).getTime();
	this.animFinished=false;
	
	for(var i=0;i<channels.length;i++){
		var animation=channels[i].getAnimation();
		var action=this;
		var channel=channels[i];
		var target=channel.getTarget();
		if(typeof target=="string"){
			if(names && names[target]){
				target=names[target];
			}
		}
		var closure={};
		closure.finishEvent=function(data){
			target.removeEventListener("animFinished",closure.finishEvent);
			if(!action.animFinished && target.animation==animation){
				action.fireEvent("animFinished",{});
				action.animFinished=true;
			}
		}
		target.addEventListener("animFinished",closure.finishEvent);
		
		target.setAnimation(animation,blendTime,start);
		target.setLoop(loop);

	}
};
/**
* Sets the start frame for all animations
* @param {number} startFrame the starting frame for the animation
*/
GLGE.Action.prototype.setStartFrame=function(startFrame){
	for(var i=0;i<this.channels.length;i++){
		this.channels[i].getAnimation().setStartFrame(startFrame);
	}
	return this;
};
/**
* Sets the number of frames to play
* @param {number} frame the number of frames to play
*/
GLGE.Action.prototype.setFrames=function(frames){
	for(var i=0;i<this.channels.length;i++){
		this.channels[i].getAnimation().setFrames(frames);
	}
	return this;
};


/**
* Adds and action channel to this action
* @param {GLGE.ActionChannel} channel the channel to be added
*/
GLGE.Action.prototype.addActionChannel=function(channel){
	this.channels.push(channel);
	return this;
};
/**
* Removes and action channel to this action
* @param {GLGE.ActionChannel} channel the channel to be removed
*/
GLGE.Action.prototype.removeActionChannel=function(channel){
	for(var i=0;i<this.channels.length;i++){
		if(this.channels[i]==channels){
			this.channels.splice(i,1);
			break;
		}
	}
};


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


/**
* @class Class defining a channel of animation for an action
* @param {string} uid a unique reference string for this object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.ActionChannel=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.ActionChannel);
GLGE.augment(GLGE.JSONLoader,GLGE.ActionChannel);
/**
* Sets the name/object of the bone channel
* @param {string} name the name of the bone channel
*/
GLGE.ActionChannel.prototype.setTarget=function(object){
	this.target=object;
};
/**
* Sets the animation for this channel
* @param {GLGE.AnimationVector} animation the animation vector for this channel
*/
GLGE.ActionChannel.prototype.setAnimation=function(animation){
	this.animation=animation;
};
/**
* Gets the name/object of the bone channel
* @returns {string} the name of the bone channel
*/
GLGE.ActionChannel.prototype.getTarget=function(){
	return this.target;
};
/**
* Gets the animation vector for this channel
* @returns {GLGE.AnimationVector} the animation vector for this channel
*/
GLGE.ActionChannel.prototype.getAnimation=function(){
	return this.animation;
};

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class A curve which interpolates between control points
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.AnimationCurve=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.keyFrames=[];
	this.solutions={};
	this.caches={};
};
GLGE.augment(GLGE.QuickNotation,GLGE.AnimationCurve);
GLGE.augment(GLGE.JSONLoader,GLGE.AnimationCurve);
GLGE.AnimationCurve.prototype.className="AnimationCurve";
GLGE.AnimationCurve.prototype.keyFrames=null;
/**
* Adds a point to the curve
* @param {object} point The point to add
* @returns {Number} Index of the newly added point
*/
GLGE.AnimationCurve.prototype.addPoint=function(point){
	this.keyFrames.push(point);
	return this.keyFrames.length-1;
};
GLGE.AnimationCurve.prototype.addStepPoint=GLGE.AnimationCurve.prototype.addPoint;
GLGE.AnimationCurve.prototype.addLinearPoint=GLGE.AnimationCurve.prototype.addPoint;
GLGE.AnimationCurve.prototype.addBezTriple=GLGE.AnimationCurve.prototype.addPoint;
/**
* Get the value of the curve at any point
* @param {Number} frame The frame(x-coord) to return the value for
* @returns {Number} The value of the curve at the given point
*/
GLGE.AnimationCurve.prototype.coord=function(x,y){
	return {x:x,y:y}
}
/**
* Sets the animation channel this curve animates
* @param {string} channel The property to animate
*/
GLGE.AnimationCurve.prototype.setChannel=function(channel){
	this.channel=channel
}
GLGE.AnimationCurve.prototype.getValue=function(frame){
	if(this.keyFrames.length==0) return 0;
	
	if(this.caches[frame]) return this.caches[frame];
	var startKey;
	var endKey;
	var preStartKey;
	var preEndKey;
	if(frame<this.keyFrames[0].x) return this.keyFrames[0].y;
	for(var i=0; i<this.keyFrames.length;i++){
		if(this.keyFrames[i].x==frame){
			return this.keyFrames[i].y;
		}
		if(this.keyFrames[i].x<=frame && (startKey==undefined || this.keyFrames[i].x>this.keyFrames[startKey].x)){
			preStartKey=startKey;
			startKey=i;
		}else if(this.keyFrames[i].x<=frame && (preStartKey==undefined || this.keyFrames[i].x>this.keyFrames[preStartKey].x)){
			preStartKey=i;
		}
		if(this.keyFrames[i].x>frame && (endKey==undefined || this.keyFrames[i].x<=this.keyFrames[endKey].x)){
			preEndKey=endKey;
			endKey=i;
		}else if(this.keyFrames[i].x>frame && (preEndKey==undefined || this.keyFrames[i].x<=this.keyFrames[preEndKey].x)){
			preEndKey=i;
		}
	}
	if(startKey==undefined){
		startKey=endKey;
		endKey=preEndKey;
	}
	if(endKey==undefined){
		endKey=startKey;
		startKey=preStartKey;
	}
	if(this.keyFrames[startKey] instanceof GLGE.BezTriple && this.keyFrames[endKey] instanceof GLGE.BezTriple){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C3=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.LinearPoint && this.keyFrames[endKey] instanceof GLGE.BezTriple){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C3=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.BezTriple && this.keyFrames[endKey] instanceof GLGE.LinearPoint){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C3=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.LinearPoint && this.keyFrames[endKey] instanceof GLGE.LinearPoint){
		var value=(frame-this.keyFrames[startKey].x)*(this.keyFrames[endKey].y-this.keyFrames[startKey].y)/(this.keyFrames[endKey].x-this.keyFrames[startKey].x)+this.keyFrames[startKey].y;
		return value;
	}
	if(this.keyFrames[startKey] instanceof GLGE.StepPoint){
		return this.keyFrames[startKey].y
	}
	if(!this.keyFrames.preStartKey) this.keyFrames.preStartKey=this.keyFrames[0].y;
	
	this.caches[frame]=this.keyFrames.preStartKey;
	
	return this.caches[frame];
};
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B1=function(t) { return t*t*t };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B2=function(t) { return 3*t*t*(1-t) };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B3=function(t) { return 3*t*(1-t)*(1-t) };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B4=function(t) { return (1-t)*(1-t)*(1-t) };
/**
* Gets the value of a bezier curve at a given point
* @private
*/
GLGE.AnimationCurve.prototype.getBezier=function(t,C1,C2,C3,C4) {
	var pos = {};
	pos.x = C1.x*this.B1(t) + C2.x*this.B2(t) + C3.x*this.B3(t) + C4.x*this.B4(t);
	pos.y = C1.y*this.B1(t) + C2.y*this.B2(t) + C3.y*this.B3(t) + C4.y*this.B4(t);
	return pos;
};
/**
* Solves cubic equation to get the parametic value of the curve at a specified point
* @private
*/
GLGE.AnimationCurve.prototype.Quad3Solve=function(a,b,c,d){
	ref=a+"-"+b+"-"+"-"+c+"-"+d;
	if(this.solutions[ref]){
		return this.solutions[ref];
	}
	else
	{
		b /= a;c /= a;d /= a;
		var q, r, d1, s, t, t1, r13;
		q = (3.0*c - (b*b))/9.0;
		r = -(27.0*d) + b*(9.0*c - 2.0*(b*b));
		r /= 54.0;
		t1 = (b/3.0);
		discrim = q*q*q + r*r;
		result=[];
				
		if (discrim > 0) { 
		// one real, two complex
		 s = r + Math.sqrt(discrim);
		 s = ((s < 0) ? -Math.pow(-s, (1.0/3.0)) : Math.pow(s, (1.0/3.0)));
		 t = r - Math.sqrt(discrim);
		 t = ((t < 0) ? -Math.pow(-t, (1.0/3.0)) : Math.pow(t, (1.0/3.0)));
		 result[0] = -t1 + s + t;
		 t1 = t1 + (s + t)/2.0;
		 result[1] = result[2] = -t1;
		 t1 = Math.sqrt(3.0)*(-t + s)/2;
		} 
		else if (discrim == 0){ 
		// All roots real
		 r13 = ((r < 0) ? -Math.pow(-r,(1.0/3.0)) : Math.pow(r,(1.0/3.0)));
		 result[1] = -t1 + 2.0*r13;
		 result[1] = result[2]  = -(r13 + t1);
		} 
		else
		{
			q = -q;
			d1 = q*q*q;
			d1 = Math.acos(r/Math.sqrt(1));
			r13 = 2.0*Math.sqrt(q);


			result[0] = -t1 + r13*Math.cos(d1/3.0);
			result[1] = -t1 + r13*Math.cos((d1 + 2.0*Math.PI)/3.0);
			result[2] = -t1 + r13*Math.cos((d1 + 4.0*Math.PI)/3.0);
		}
		var toreturn=false;
		//determine which is the correct result
		if(result[0]>=0 && result[0]<=1) toreturn=result[0];
		if(!toreturn && result[1]>=0 && result[1]<=1) toreturn=result[1];
		if(!toreturn && result[2]>=0 && result[2]<=1) toreturn=result[2];
		//cache result for next time
		this.solutions[ref]=toreturn;
		
		return toreturn;
	}
};
/**
* Get the value of the a single bezier curve 
* @param {Number} x xcoord of point to get
* @param {Number} C1 First bezier control point
* @param {Number} C2 Second bezier control point
* @param {Number} C3 Third bezier control point
* @param {Number} C4 Forth bezier control point
* @returns {Number} The value of the curve at the given x
*/
GLGE.AnimationCurve.prototype.atX=function(x,C1,C2,C3,C4){
	a=C1.x-C2.x*3+C3.x*3-C4.x;
	b=C2.x*3-C3.x*6+C4.x*3;
	c=C3.x*3-C4.x*3;
	d=C4.x-x;
	return this.getBezier(this.Quad3Solve(a,b,c,d),C1,C2,C3,C4);
};

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class The AnimationVectors class allows you to specify the 2D Animation curves that define specific channels of animation within the engine. 
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.AnimationVector=function(uid){
    GLGE.Assets.registerAsset(this,uid);
    this.curves=[];
}
GLGE.augment(GLGE.QuickNotation,GLGE.AnimationVector);
GLGE.augment(GLGE.JSONLoader,GLGE.AnimationVector);
GLGE.AnimationVector.prototype.curves=[];
GLGE.AnimationVector.prototype.frames=250;
GLGE.AnimationVector.prototype.startFrame=0;

/**
* Adds an Animation Curve to a channel 
* @param {String} channel The name of the curve to be added
* @param {GLGE.AnimationCurve} curve The animation curve to add
*/
GLGE.AnimationVector.prototype.addAnimationCurve=function(curve){
	this.curves[curve.channel]=curve;
	return this;
}
/**
* Removes an Animation Curve form a channel
* @param {String} channel The name of the curve to be removed
*/
GLGE.AnimationVector.prototype.removeAnimationCurve=function(name){
	delete(this.curves[name]);
}
/**
* Sets the number of frames in the animation
* @param {number} value The number of frames in the animation
*/
GLGE.AnimationVector.prototype.setFrames=function(value){
	this.frames=value;
	return this;
}
/**
* Sets the number of frames in the animation
* @returns {number} The number of frames in the animation
*/
GLGE.AnimationVector.prototype.getFrames=function(){
	return this.frames;
}

/**
* Sets the start frame
* @param {number} value The starting frame for the animation
*/
GLGE.AnimationVector.prototype.setStartFrame=function(value){
	this.startFrame=value;
	return this;
}
/**
* Gets the start fames
* @returns {number} The starting frame for the animation
*/
GLGE.AnimationVector.prototype.getStartFrame=function(){
	return this.startFrame;
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class A bezier class to add points to the Animation Curve 
* @param {string} uid a unique string to identify this object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.BezTriple=function(uid){
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.QuickNotation,GLGE.BezTriple);
GLGE.augment(GLGE.JSONLoader,GLGE.BezTriple);

GLGE.BezTriple.prototype.className="BezTriple";
/**
* set the x1-coord
* @param {number} x x1-coord control point
*/
GLGE.BezTriple.prototype.setX1=function(x){
	this.x1=parseFloat(x);
	return this;
};
/**
* set the y1-coord
* @param {number} y y1-coord control point
*/
GLGE.BezTriple.prototype.setY1=function(y){
	this.y1=parseFloat(y);
	return this;
};
/**
* set the x2-coord
* @param {number} x x2-coord control point
*/
GLGE.BezTriple.prototype.setX2=function(x){
	this.x=parseFloat(x);
	return this;
};
/**
* set the y2-coord
* @param {number} y y2-coord control point
*/
GLGE.BezTriple.prototype.setY2=function(y){
	this.y=parseFloat(y);
	return this;
};
/**
* set the x3-coord
* @param {number} x x3-coord control point
*/
GLGE.BezTriple.prototype.setX3=function(x){
	this.x3=parseFloat(x);
	return this;
};
/**
* set the y3-coord
* @param {number} y y3-coord control point
*/
GLGE.BezTriple.prototype.setY3=function(y){
	this.y3=parseFloat(y);
	return this;
};


/**
* @class A LinearPoint class to add points to the Animation Curve 
* @param {string} uid unique string for this class
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.LinearPoint=function(uid){
	//GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.QuickNotation,GLGE.LinearPoint);
GLGE.augment(GLGE.JSONLoader,GLGE.LinearPoint);
GLGE.LinearPoint.prototype.className="LinearPoint";
GLGE.LinearPoint.prototype.x=0;
GLGE.LinearPoint.prototype.y=0;
/**
* set the x-coord
* @param {number} x x-coord control point
*/
GLGE.LinearPoint.prototype.setX=function(x){
	this.x=parseFloat(x);
	return this;
};
/**
* set the y-coord
* @param {number} y y-coord control point
*/
GLGE.LinearPoint.prototype.setY=function(y){
	this.y=parseFloat(y);
	return this;
};


/**
* @class A StepPoint class to add points to the Animation Curve 
* @param {number} x x-coord control point
* @param {object} value value of control point
*/
GLGE.StepPoint=function(x,value){
	this.x=parseFloat(x);
	this.y=value;
};

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class Creates a new mesh
* @see GLGE.Object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.Mesh=function(uid,windingOrder){
	GLGE.Assets.registerAsset(this,uid);
	this.GLbuffers=[];
	this.buffers=[];
	this.UV=[];
	this.boneWeights=[];
	this.setBuffers=[];
	this.faces={};
    if (windingOrder!==undefined)
        this.windingOrder=windingOrder;
    else
        this.windingOrder=GLGE.Mesh.WINDING_ORDER_CLOCKWISE;
};

GLGE.Mesh.WINDING_ORDER_UNKNOWN=2;
GLGE.Mesh.WINDING_ORDER_CLOCKWISE=1;
GLGE.Mesh.WINDING_ORDER_COUNTER=0;

GLGE.augment(GLGE.QuickNotation,GLGE.Mesh);
GLGE.augment(GLGE.JSONLoader,GLGE.Mesh);
GLGE.augment(GLGE.Events,GLGE.Mesh);
GLGE.Mesh.prototype.gl=null;
GLGE.Mesh.prototype.className="Mesh";
GLGE.Mesh.prototype.GLbuffers=null;
GLGE.Mesh.prototype.buffers=null;
GLGE.Mesh.prototype.setBuffers=null;
GLGE.Mesh.prototype.GLfaces=null;
GLGE.Mesh.prototype.faces=null;
GLGE.Mesh.prototype.UV=null;
GLGE.Mesh.prototype.joints=null;
GLGE.Mesh.prototype.invBind=null;
GLGE.Mesh.prototype.loaded=false;
/**
 * @name GLGE.Mesh#shaderupdate
 * @event fired when the shader needs updating
 * @param {object} data
 */

/**
* Gets the bounding volume for the mesh
* @returns {GLGE.BoundingVolume} 
*/
GLGE.Mesh.prototype.getBoundingVolume=function(){
	if(!this.boundingVolume){
		var minX,maxX,minY,maxY,minZ,maxZ;
		for(var i=0;i<this.buffers.length;i++){
			if(this.buffers[i].name=="position") var positions=this.buffers[i].data;
		}
		for(var i=0;i<positions.length;i=i+3){
			if(i==0){
				minX=maxX=positions[i];
				minY=maxY=positions[i+1];
				minZ=maxZ=positions[i+2];
			}else{
				minX=Math.min(minX,positions[i]);
				maxX=Math.max(maxX,positions[i]);
				minY=Math.min(minY,positions[i+1]);
				maxY=Math.max(maxY,positions[i+1]);
				minZ=Math.min(minZ,positions[i+2]);
				maxZ=Math.max(maxZ,positions[i+2]);
			}
		}
		this.boundingVolume=new GLGE.BoundingVolume(minX,maxX,minY,maxY,minZ,maxZ);
	}
	return this.boundingVolume;
}
/**
* Sets the joints
* @param {string[]} jsArray set joint objects
*/
GLGE.Mesh.prototype.setJoints=function(jsArray){
	this.joints=jsArray;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Sets the inverse bind matrix for each joint
* @param {GLGE.Matrix[]} jsArray set joint names
*/
GLGE.Mesh.prototype.setInvBindMatrix=function(jsArray){
	this.invBind=jsArray;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Sets the joint channels for each vertex 
* @param {Number[]} jsArray The 1 dimentional array of bones
* @param {Number} num the number of chanels in this mesh
*/
GLGE.Mesh.prototype.setVertexJoints=function(jsArray,num){
	if(!num){
		num=jsArray.length*3/this.positions.length;
	}
	if(num<5){
		this.setBuffer("joints1",jsArray,num);
	}else{
		var jsArray1=[];
		var jsArray2=[];
		for(var i=0;i<jsArray.length;i++){
			if(i%num<4){
				jsArray1.push(jsArray[i]);
			}else{
				jsArray2.push(jsArray[i]);
			}
		}
		this.setBuffer("joints1",jsArray1,4);
		this.setBuffer("joints2",jsArray2,num-4);
	}
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Sets the joint weights on each vertex
* @param {Number[]} jsArray The 1 dimentional array of weights
* @param {Number} num the number of chanels in this mesh
*/
GLGE.Mesh.prototype.setVertexWeights=function(jsArray,num){
	if(!num){
		num=jsArray.length*3/this.positions.length;
	}
	//normalize the weights!
	for(var i=0;i<jsArray.length;i=i+parseInt(num)){
		var total=0;
		for(var n=0;n<num;n++){
			total+=parseFloat(jsArray[i+n]);
		}
		for(var n=0;n<num;n++){
			jsArray[i+n]=jsArray[i+n]/total;
		}
	}

	if(num<4){
		this.setBuffer("weights1",jsArray,num);
	}else{
		var jsArray1=[];
		var jsArray2=[];
		for(var i=0;i<jsArray.length;i++){
			if(i%num<4){
				jsArray1.push(jsArray[i]);
			}else{
				jsArray2.push(jsArray[i]);
			}
		}
		this.setBuffer("weights1",jsArray1,4);
		this.setBuffer("weights2",jsArray2,num-4);
	}
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* clears any buffers currently set
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.clearBuffers=function(){
	//if(this.GLfaces) this.gl.deleteBuffer(this.GLfaces);
	this.GLFaces=null;
	delete(this.GLFaces);
	for(i in this.buffers){
		//if(this.buffers[i].GL) this.gl.deleteBuffer(this.buffers[i].GL);
		this.buffers[i]=null;
		delete(this.buffers[i]);
	}
	this.buffers=[];
	this.loaded=false;
}
/**
* Set the UV coord for the first UV layer
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.setUV=function(jsArray){
	var idx=0;
	for(var i=0; i<jsArray.length;i=i+2){
		this.UV[idx]=jsArray[i];
		this.UV[idx+1]=jsArray[i+1];
		if(!this.UV[idx+2]) this.UV[idx+2]=jsArray[i];//<-- hack in case the collada file only specified UV1 but accesses UV2 and expects the UV1 coordinates to be properly reflected there
		if(!this.UV[idx+3]) this.UV[idx+3]=jsArray[i+1];
		idx=idx+4;
	}
	this.setBuffer("UV",this.UV,4);
	return this;
}
/**
* Set the UV coord for the second UV layer
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.setUV2=function(jsArray){
	var idx=0;
	for(var i=0; i<jsArray.length;i=i+2){
		if(!this.UV[idx]) this.UV[idx]=jsArray[i];
		if(!this.UV[idx+1]) this.UV[idx+1]=jsArray[i+1];
		this.UV[idx+2]=jsArray[i];
		this.UV[idx+3]=jsArray[i+1];
		idx=idx+4;
	}
	this.setBuffer("UV",this.UV,4);
	return this;
}
/**
* Sets the positions of the verticies
* @param {Number[]} jsArray The 1 dimentional array of positions
*/
GLGE.Mesh.prototype.setPositions=function(jsArray){
	this.loaded=true;
	this.positions=jsArray;
	this.setBuffer("position",jsArray,3);
	return this;
}
/**
* Sets the normals of the verticies
* @param {Number[]} jsArray The 1 dimentional array of normals
*/
GLGE.Mesh.prototype.setNormals=function(jsArray){
	this.normals=jsArray;
	this.setBuffer("normal",jsArray,3);
	return this;
}
/**
* Sets a buffer for the
* @param {String} boneName The name of the bone
* @param {Number[]} jsArray The 1 dimentional array of weights
* @private
*/
GLGE.Mesh.prototype.setBuffer=function(bufferName,jsArray,size){
	//make sure all jsarray items are floats
	for(var i=0;i<jsArray.length;i++) jsArray[i]=parseFloat(jsArray[i]);
	var buffer;
	for(var i=0;i<this.buffers.length;i++){
		if(this.buffers[i].name==bufferName) buffer=i;
	}
	if(!buffer){
		this.buffers.push({name:bufferName,data:jsArray,size:size,GL:false});
	}
        else 
	{
		this.buffers[buffer]={name:bufferName,data:jsArray,size:size,GL:false};
	}
	return this;
}

/**
* gets a vert tangent
* @private
*/
GLGE.Mesh.prototype.tangentFromUV=function(p1,p2,p3,uv1,uv2,uv3,n){
	var toUnitVec3=GLGE.toUnitVec3;
	var subVec3=GLGE.subVec3;
	var scaleVec3=GLGE.scaleVec3;
	var dotVec3=GLGE.dotVec3;
	var crossVec3=GLGE.crossVec3;
	
	uv21=[uv2[0]-uv1[0],uv2[1]-uv1[1]];
	uv31=[uv3[0]-uv1[0],uv3[1]-uv1[1]];
	
	p21=GLGE.subVec3(p2,p1);
	p31=GLGE.subVec3(p3,p1);
	var s=(uv21[0]*uv31[1]-uv31[0]*uv21[1]);

	if(s!=0){
		s=1/s;
		var t=subVec3(scaleVec3(p21,uv31[1]*s),scaleVec3(p31,uv21[1]*s));
		var b=subVec3(scaleVec3(p31,uv21[0]*s),scaleVec3(p21,uv31[0]*s));
	}else{
		t=[0,0,0];
		b=[0,0,0];
	}
	if(GLGE.dotVec3(GLGE.crossVec3(p21,p31),n)>0){
		t=scaleVec3(t,-1);
		b=scaleVec3(b,-1);
	}
	return [t,b];
}

/**
* Sets the faces for this mesh
* @param {Number[]} jsArray The 1 dimentional array of normals
*/
GLGE.Mesh.prototype.setFaces=function(jsArray){
	this.faces={data:jsArray,GL:false};	
	//if at this point calculate normals if we haven't got them yet
	if(!this.normals) this.calcNormals();
	
	//add a tangent buffer
	for(var i=0;i<this.buffers.length;i++){
		if(this.buffers[i].name=="position") var position=this.buffers[i].data;
		if(this.buffers[i].name=="UV") var uv=this.buffers[i].data;
		if(this.buffers[i].name=="normal") var normal=this.buffers[i].data;
	}
	

	if(position && uv){
		var tangentArray=[];
		var data={};
		var ref;
		for(var i=0;i<position.length;i++){
			tangentArray[i]=0;
		}
		for(var i=0;i<this.faces.data.length;i=i+3){
			var p1=[position[(parseInt(this.faces.data[i]))*3],position[(parseInt(this.faces.data[i]))*3+1],position[(parseInt(this.faces.data[i]))*3+2]];
			var p2=[position[(parseInt(this.faces.data[i+1]))*3],position[(parseInt(this.faces.data[i+1]))*3+1],position[(parseInt(this.faces.data[i+1]))*3+2]];
			var p3=[position[(parseInt(this.faces.data[i+2]))*3],position[(parseInt(this.faces.data[i+2]))*3+1],position[(parseInt(this.faces.data[i+2]))*3+2]];
			
			var n1=[normal[(parseInt(this.faces.data[i]))*3],normal[(parseInt(this.faces.data[i]))*3+1],normal[(parseInt(this.faces.data[i]))*3+2]];
			var n2=[normal[(parseInt(this.faces.data[i+1]))*3],normal[(parseInt(this.faces.data[i+1]))*3+1],normal[(parseInt(this.faces.data[i+1]))*3+2]];
			var n3=[normal[(parseInt(this.faces.data[i+2]))*3],normal[(parseInt(this.faces.data[i+2]))*3+1],normal[(parseInt(this.faces.data[i+2]))*3+2]];
			
			var uv1=[uv[(parseInt(this.faces.data[i]))*4],uv[(parseInt(this.faces.data[i]))*4+1]];
			var uv2=[uv[(parseInt(this.faces.data[i+1]))*4],uv[(parseInt(this.faces.data[i+1]))*4+1]];
			var uv3=[uv[(parseInt(this.faces.data[i+2]))*4],uv[(parseInt(this.faces.data[i+2]))*4+1]];
			
			var tb=this.tangentFromUV(p2,p1,p3,uv2,uv1,uv3,n2);

			
			
			if(!data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")]){
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")]=tb;
			}else{
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0][0]+=tb[0][0];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0][1]+=tb[0][1];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0][2]+=tb[0][2];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1][0]+=tb[1][0];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1][1]+=tb[1][1];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1][2]+=tb[1][2];
			}
			if(!data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")]){
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")]=tb;
			}else{
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][0][0]+=tb[0][0];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][0][1]+=tb[0][1];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][0][2]+=tb[0][2];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][1][0]+=tb[1][0];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][1][1]+=tb[1][1];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][1][2]+=tb[1][2];
			}
			if(!data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")]){
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")]=tb;
			}else{
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][0][0]+=tb[0][0];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][0][1]+=tb[0][1];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][0][2]+=tb[0][2];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][1][0]+=tb[1][0];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][1][1]+=tb[1][1];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][1][2]+=tb[1][2];
			}

		}		
		for(var i=0;i<position.length/3;i++){
			var p1=[position[i*3],position[i*3+1],position[i*3+2]];
			var n1=[normal[i*3],normal[i*3+1],normal[i*3+2]];
			var uv1=[uv[i*4],uv[i*4+1]];
			var t=GLGE.toUnitVec3(data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0]);
			var b=GLGE.toUnitVec3(data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1]);
			
			if(t){
				tangentArray[i*3]=t[0];
				tangentArray[i*3+1]=t[1];
				tangentArray[i*3+2]=t[2];
			}
		}
		this.setBuffer("tangent",tangentArray,3);
	}
	return this;
}
/**
* Sets the faces for this mesh
* @param {Number[]} jsArray The 1 dimentional array of normals
* @private
*/
GLGE.Mesh.prototype.GLSetFaceBuffer=function(gl){
	if(!this.GLfaces) this.GLfaces = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces.data), gl.STATIC_DRAW);
	this.GLfaces.itemSize = 1;
	this.GLfaces.numItems = this.faces.data.length;
}
/**
* Sets up a GL Buffer
* @param {WebGLContext} gl The context being drawn on
* @param {String} bufferName The name of the buffer to create
* @param {Number[]}  jsArray The data to add to the buffer
* @param {Number}  size Size of a single element within the array
* @private
*/
GLGE.Mesh.prototype.GLSetBuffer=function(gl,bufferName,jsArray,size){
	if(!this.GLbuffers[bufferName]) this.GLbuffers[bufferName] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers[bufferName]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(jsArray), gl.STATIC_DRAW);
	this.GLbuffers[bufferName].itemSize = size;
	this.GLbuffers[bufferName].numItems = jsArray.length/size;
};
/**
* Calculates the normals for this mesh
* @private
*/
GLGE.Mesh.prototype.calcNormals=function(){
	var normals=[];
	var positions=this.positions;
	var faces=this.faces.data;
	if(!faces){
		faces=[];
		for(var i=0;i<positions.length/3;i++) faces[i]=i;
	}
	for(var i=0;i<faces.length;i=i+3){
		var v1=[positions[faces[i]*3],positions[faces[i]*3+1],positions[faces[i]*3+2]];
		var v2=[positions[faces[i+1]*3],positions[faces[i+1]*3+1],positions[faces[i+1]*3+2]];
		var v3=[positions[faces[i+2]*3],positions[faces[i+2]*3+1],positions[faces[i+2]*3+2]];
		var vec1=GLGE.subVec3(v2,v1);
		var vec2=GLGE.subVec3(v3,v1);
		var norm=GLGE.toUnitVec3(GLGE.crossVec3(vec1,vec2));
		if(normals[faces[i]]==undefined) normals[faces[i]]=[];
		normals[faces[i]].push(norm);
		if(normals[faces[i+1]]==undefined) normals[faces[i+1]]=[];
		normals[faces[i+1]].push(norm);
		if(normals[faces[i+2]]==undefined) normals[faces[i+2]]=[];
		normals[faces[i+2]].push(norm);
	}
	var norms=[];
	for(i=0;i<normals.length;i++){
		var x=0,y=0,z=0;
		if(normals[i]!=undefined){
			for(var j=0;j<normals[i].length;j++){
				x+=normals[i][j][0];
				y+=normals[i][j][1];
				z+=normals[i][j][2];
			}
			x/=normals[i].length;
			y/=normals[i].length;
			z/=normals[i].length;
			norms[i*3]=x;
			norms[i*3+1]=y;
			norms[i*3+2]=z;
		}
	}
	this.setNormals(norms);
}
/**
* Sets the Attributes for this mesh
* @param {WebGLContext} gl The context being drawn on
* @private
*/
GLGE.Mesh.prototype.GLAttributes=function(gl,shaderProgram){
	this.gl=gl;
	//if at this point we have no normals set then calculate them
	if(!this.normals) this.calcNormals();
	
	//disable all the attribute initially arrays - do I really need this?
	for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
	//check if the faces have been updated
	if(!this.faces.GL && this.faces.data && this.faces.data.length>0){
		this.GLSetFaceBuffer(gl);
		this.faces.GL=true;
	}
	//loop though the buffers
	for(i=0; i<this.buffers.length;i++){
		if(!this.buffers[i].GL){
			this.GLSetBuffer(gl,this.buffers[i].name,this.buffers[i].data,this.buffers[i].size);
			this.buffers[i].GL=true;
		}
		attribslot=GLGE.getAttribLocation(gl,shaderProgram, this.buffers[i].name);
		if(attribslot>-1){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers[this.buffers[i].name]);
			gl.enableVertexAttribArray(attribslot);
			gl.vertexAttribPointer(attribslot, this.GLbuffers[this.buffers[i].name].itemSize, gl.FLOAT, false, 0, 0);
		}
	}
}


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




var materialIdx=0;

/**
* @class The Material class creates materials to be applied to objects in the graphics engine
* @see GLGE.Object
* @augments GLGE.Animatable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.Material=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.layers=[];
	this.layerlisteners=[];
	this.textures=[];
	this.lights=[];
	this.color={r:1,g:1,b:1,a:1};
	this.specColor={r:1,g:1,b:1};
	this.reflect=0.8;
	this.shine=10;
	this.specular=1;
	this.emit=0;
	this.alpha=1;
	this.materialIdx=materialIdx++;
};
GLGE.augment(GLGE.Animatable,GLGE.Material);
GLGE.augment(GLGE.QuickNotation,GLGE.Material);
GLGE.augment(GLGE.JSONLoader,GLGE.Material);
GLGE.augment(GLGE.Events,GLGE.Material);


/**
 * @name GLGE.Material#shaderupdate
 * @event fires when the shader for this material needs updating
 * @param {object} data
 */

/**
* @constant 
* @description Flag for material colour
*/
GLGE.M_COLOR=1; 
/**
* @constant 
* @description Flag for material normal
*/
GLGE.M_NOR=2;
/**
* @constant 
* @description Flag for material alpha
*/
GLGE.M_ALPHA=4; 
/**
* @constant 
* @description Flag for material specular color
*/
GLGE.M_SPECCOLOR=8; 
/**
* @constant 
* @description Flag for material specular cvalue
*/
GLGE.M_SPECULAR=16;
/**
* @constant 
* @description Flag for material shineiness
*/
GLGE.M_SHINE=32; 
/**
* @constant 
* @description Flag for material reflectivity
*/
GLGE.M_REFLECT=64;
/**
* @constant 
* @description Flag for material emision
*/
GLGE.M_EMIT=128;
/**
* @constant 
* @description Flag for material alpha
*/
GLGE.M_ALPHA=256;
/**
* @constant 
* @description Flag for masking with textures red value
*/
GLGE.M_MSKR=512;
/**
* @constant 
* @description Flag for masking with textures green value
*/
GLGE.M_MSKG=1024;
/**
* @constant 
* @description Flag for masking with textures blue value
*/
GLGE.M_MSKB=2048;
/**
* @constant 
* @description Flag for masking with textures alpha value
*/
GLGE.M_MSKA=4096;
/**
* @constant 
* @description Flag for mapping of the height in parallax mapping
*/
GLGE.M_HEIGHT=8192;

/**
* @constant 
* @description Flag for mapping of the height in parallax mapping
*/
GLGE.M_AMBIENT=16384;

/**
* @constant 
* @description Enumeration for first UV layer
*/
GLGE.UV1=0;
/**
* @constant 
* @description Enumeration for second UV layer
*/
GLGE.UV2=1;
/**
* @constant 
* @description Enumeration for normal texture coords
*/
GLGE.MAP_NORM=3;

/**
* @constant 
* @description Enumeration for object texture coords
*/
GLGE.MAP_OBJ=4;

/**
* @constant 
* @description Enumeration for reflection coords
*/
GLGE.MAP_REF=5;

/**
* @constant 
* @description Enumeration for environment coords
*/
GLGE.MAP_ENV=6;

/**
* @constant 
* @description Enumeration for view coords
*/
GLGE.MAP_VIEW=7;

/**
* @constant 
* @description Enumeration for mix blending mode
*/
GLGE.BL_MIX=0;

/**
* @constant 
* @description Enumeration for mix blending mode
*/
GLGE.BL_MUL=1;
	
GLGE.Material.prototype.layers=null;
GLGE.Material.prototype.className="Material";
GLGE.Material.prototype.textures=null;
GLGE.Material.prototype.color=null;
GLGE.Material.prototype.specColor=null;
GLGE.Material.prototype.specular=null;
GLGE.Material.prototype.emit=null;
GLGE.Material.prototype.shine=null;
GLGE.Material.prototype.reflect=null;
GLGE.Material.prototype.lights=null;
GLGE.Material.prototype.alpha=null;
GLGE.Material.prototype.ambient=null;
GLGE.Material.prototype.shadow=true;
/**
* Sets the flag indicateing the material should or shouldn't recieve shadows
* @param {boolean} value The recieving shadow flag
*/
GLGE.Material.prototype.setShadow=function(value){
	this.shadow=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* gets the show flag
* @returns {boolean} The shadow flag
*/
GLGE.Material.prototype.getShadow=function(value){
	return this.shadow;
};
/**
* Sets the base colour of the material
* @param {string} color The colour of the material
*/
GLGE.Material.prototype.setColor=function(color){
	if(!color.r){
		color=GLGE.colorParse(color);
	}
	this.color={r:color.r,g:color.g,b:color.b};
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Sets the red base colour of the material
* @param {Number} r The new red level 0-1
*/
GLGE.Material.prototype.setColorR=function(value){
	this.color.r=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Sets the green base colour of the material
* @param {Number} g The new green level 0-1
*/
GLGE.Material.prototype.setColorG=function(value){
	this.color.g=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Sets the blue base colour of the material
* @param {Number} b The new blue level 0-1
*/
GLGE.Material.prototype.setColorB=function(value){
	this.color.b=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the current base color of the material
* @return {[r,g,b]} The current base color
*/
GLGE.Material.prototype.getColor=function(){
	return this.color;
};
/**
* Sets the base specular colour of the material
* @param {string} color The new specular colour
*/
GLGE.Material.prototype.setSpecularColor=function(color){
	if(!color.r){
		color=GLGE.colorParse(color);
	}
	this.specColor={r:parseFloat(color.r),g:parseFloat(color.g),b:parseFloat(color.b)};
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the ambient lighting of the material
* @return {[r,g,b]} The current ambient lighting
*/
GLGE.Material.prototype.getAmbient=function(){
	return this.ambient;
};


/**
* Sets the ambient lighting of the material
* @param {string} color The new specular colour
*/
GLGE.Material.prototype.setAmbient=function(color){
	if(!color.r){
		color=GLGE.colorParse(color);
	}
	this.ambient={r:parseFloat(color.r),g:parseFloat(color.g),b:parseFloat(color.b)};
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the current base specular color of the material
* @return {[r,g,b]} The current base specular color
*/
GLGE.Material.prototype.getSpecularColor=function(){
	return this.specColor;
};


/**
* Sets the alpha of the material
* @param {Number} value how much alpha
*/
GLGE.Material.prototype.setAlpha=function(value){
	this.alpha=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the alpha of the material
* @return {Number} The current alpha of the material
*/
GLGE.Material.prototype.getAlpha=function(){
	return this.alpha;
};
/**
* Sets the specular of the material
* @param {Number} value how much specular
*/
GLGE.Material.prototype.setSpecular=function(value){
	this.specular=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the specular of the material
* @return {Number} The current specular of the material
*/
GLGE.Material.prototype.getSpecular=function(){
	return this.specular;
};
/**
* Sets the shininess of the material
* @param {Number} value how much shine
*/
GLGE.Material.prototype.setShininess=function(value){
	if (value<=0) value=0.001;
	this.shine=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the shininess of the material
* @return {Number} The current shininess of the material
*/
GLGE.Material.prototype.getShininess=function(){
	return this.shine;
};
/**
* Sets how much the material should emit
* @param {Number} value how much to emit (0-1)
*/
GLGE.Material.prototype.setEmit=function(value){
	this.emit=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the amount this material emits
* @return {Number} The emit value for the material
*/
GLGE.Material.prototype.getEmit=function(){
	return this.emit;
};
/**
* Sets reflectivity of the material
* @param {Number} value how much to reflect (0-1)
*/
GLGE.Material.prototype.setReflectivity=function(value){
	this.reflect=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the materials reflectivity
* @return {Number} The reflectivity of the material
*/
GLGE.Material.prototype.getReflectivity=function(){
	return this.reflect;
};

/**
* Sets the material to output with 0 alpha or 1 alpha
* @param {boolean} value binary alpha flag
*/
GLGE.Material.prototype.setBinaryAlpha=function(value){
	this.binaryAlpha=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the binary alpha flag
* @return {boolean} The binary alpha flag
*/
GLGE.Material.prototype.getBinaryAlpha=function(){
	return this.binaryAlpha;
};

/**
* Add a new layer to the material
* @param {MaterialLayer} layer The material layer to add to the material
*/
GLGE.Material.prototype.addMaterialLayer=function(layer){
	if(typeof layer=="string")  layer=GLGE.Assets.get(layer);
	this.layers.push(layer);
	var material=this;
	var listener=function(event){
		material.fireEvent("shaderupdate",{});
	};
	this.layerlisteners.push(listener);
	layer.addEventListener("shaderupdate",listener);
	this.fireEvent("shaderupdate",{});
	return this;
};

/**
* Removes a layer from the material
* @param {MaterialLayer} layer The material layer to remove
*/
GLGE.Material.prototype.removeMaterialLayer=function(layer){
	var idx=this.layers.indexOf(layer);
	if(idx>=0){
		this.layers.splice(idx,1);
		layer.removeEventListener("shaderupdate",this.layerlisteners[idx]);
		this.layerlisteners.splice(idx,1);
		this.fireEvent("shaderupdate",{});
	}
	return this;
};

/**
* Gets all the materials layers
* @returns {GLGE.MaterialLayer[]} all of the layers contained within this material
*/
GLGE.Material.prototype.getLayers=function(){
	return this.layers;
};
/**
* Generate the code required to calculate the texture coords for each layer
* @private
*/
GLGE.Material.prototype.getLayerCoords=function(){
		var shader=[];
		shader.push("vec4 texturePos;\n"); 
		for(i=0; i<this.layers.length;i++){
			shader.push("textureCoords"+i+"=vec3(0.0,0.0,0.0);\n"); 
			
			if(this.layers[i].mapinput==GLGE.UV1 || this.layers[i].mapinput==GLGE.UV2){
				shader.push("texturePos=vec4(vec2(UVCoord["+(this.layers[i].mapinput*2)+"],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"])),1.0,1.0);\n");
			}
			
			if(this.layers[i].mapinput==GLGE.MAP_NORM){
				shader.push("texturePos=vec4(normalize(n.xyz),1.0);\n");
			}
			if(this.layers[i].mapinput==GLGE.MAP_OBJ){
				shader.push("texturePos=vec4(normalize(OBJCoord.xyz),1.0);\n");
			}
			
			if(this.layers[i].mapinput==GLGE.MAP_REF){
				//will need to do in fragment to take the normal maps into account!
				shader.push("texturePos=vec4(reflect(normalize(eyevec.xyz),normalize(n.xyz)),1.0);\n");
			}
			

			
			if(this.layers[i].mapinput==GLGE.MAP_ENV){
				//will need to do in fragment to take the normal maps into account!
				shader.push("texturePos=envMat * vec4(reflect(normalize(eyevec.xyz),normalize(n.xyz)),1.0);\n");
			}
			
			shader.push("textureCoords"+i+"=(layer"+i+"Matrix * texturePos).xyz;\n");			
			
		}
		
		return shader.join("");
}
/**
* Generate the fragment shader program for this material
* @private
*/
GLGE.Material.prototype.getVertexVarying=function(){
	var shader=[];
	for(i=0; i<this.layers.length;i++){
		shader.push("uniform mat4 layer"+i+"Matrix;\n");  
		shader.push("varying vec3 textureCoords"+i+";\n"); 
	}
	return shader.join("");
}

GLGE.Material.prototype.registerPasses=function(gl,object){
	for(var i=0; i<this.textures.length;i++){
		if(this.textures[i].registerPasses) this.textures[i].registerPasses(gl,object);
	}
}

/**
* Generate the fragment shader program for this material
* @private
*/
GLGE.Material.prototype.getFragmentShader=function(lights){
	var shader="#ifdef GL_ES\nprecision highp float;\n#endif\n";
	var tangent=false;
	for(var i=0; i<lights.length;i++){
		if(lights[i].type==GLGE.L_POINT || lights[i].type==GLGE.L_SPOT || lights[i].type==GLGE.L_DIR){
			shader=shader+"varying vec3 lightvec"+i+";\n"; 
			shader=shader+"varying vec3 lightpos"+i+";\n"; 
			shader=shader+"varying float lightdist"+i+";\n";  
			shader=shader+"varying vec2 spotCoords"+i+";\n"; 
		}
	}
	shader=shader+"varying vec3 n;\n";  
	shader=shader+"varying vec3 t;\n";  
	shader=shader+"varying vec4 UVCoord;\n";
	shader=shader+"varying vec3 eyevec;\n"; 
	shader=shader+"varying vec3 OBJCoord;\n";

	//texture uniforms
	for(var i=0; i<this.textures.length;i++){
		if(this.textures[i].className=="Texture") shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
		if(this.textures[i].className=="TextureCanvas") shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
		if(this.textures[i].className=="TextureVideo") shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
		if(this.textures[i].className=="TextureCube") shader=shader+"uniform samplerCube TEXTURE"+i+";\n";
	}
	
	var cnt=0;
	var shadowlights=[];
	var num;
	for(var i=0; i<lights.length;i++){
			shader=shader+"uniform vec3 lightcolor"+i+";\n";  
			shader=shader+"uniform vec3 lightAttenuation"+i+";\n";  
			shader=shader+"uniform float spotCosCutOff"+i+";\n";  
			shader=shader+"uniform float spotExp"+i+";\n";  
			shader=shader+"uniform vec3 lightdir"+i+";\n";  
			shader=shader+"uniform mat4 lightmat"+i+";\n";
			shader=shader+"uniform float shadowbias"+i+";\n"; 
			shader=shader+"uniform int shadowsamples"+i+";\n";  
			shader=shader+"uniform float shadowsoftness"+i+";\n";  
			shader=shader+"uniform bool castshadows"+i+";\n";  
			shader=shader+"varying vec4 spotcoord"+i+";\n";  
			if(lights[i].getCastShadows() && this.shadow){
				num=this.textures.length+(cnt++);
				shader=shader+"uniform sampler2D TEXTURE"+num+";\n";
				shadowlights[i]=num;
			}
	}
	for(i=0; i<this.layers.length;i++){		
		shader=shader+"varying vec3 textureCoords"+i+";\n";
		shader=shader+"uniform float layeralpha"+i+";\n";
		if((this.layers[i].mapto & GLGE.M_HEIGHT) == GLGE.M_HEIGHT){
			shader=shader+"uniform float layerheight"+i+";\n";
		}
	}
	
	shader=shader+"uniform vec4 baseColor;\n";
	shader=shader+"uniform vec3 specColor;\n";
	shader=shader+"uniform float shine;\n";
	shader=shader+"uniform float specular;\n";
	shader=shader+"uniform float reflective;\n";
	shader=shader+"uniform float emit;\n";
	shader=shader+"uniform float alpha;\n";
	shader=shader+"uniform vec3 amb;\n";
	shader=shader+"uniform float fognear;\n";
	shader=shader+"uniform float fogfar;\n";
	shader=shader+"uniform int fogtype;\n";
	shader=shader+"uniform vec3 fogcolor;\n";
	shader=shader+"uniform float far;\n";
	shader=shader+"uniform mat4 worldInverseTranspose;\n"; 
	shader=shader+"uniform mat4 projection;\n"; 
    
	shader=shader+"void main(void)\n";
	shader=shader+"{\n";
	shader=shader+"float att;\n"; 
	shader=shader+"int texture;\n"; 
	shader=shader+"float mask=1.0;\n";
	shader=shader+"float spec=specular;\n"; 
	shader=shader+"vec3 specC=specColor;\n"; 
	shader=shader+"vec4 view;\n"; 
	shader=shader+"vec3 textureCoords=vec3(0.0,0.0,0.0);\n"; 
	shader=shader+"float ref=reflective;\n";
	shader=shader+"float sh=shine;\n"; 
	shader=shader+"float em=emit;\n"; 
	shader=shader+"float al=alpha;\n"; 
	shader=shader+"vec3 amblight=amb;\n"; 
	shader=shader+"vec4 normalmap= vec4(n,0.0);\n"
	shader=shader+"vec4 color = baseColor;"; //set the initial color
	shader=shader+"float pheight=0.0;\n"
	shader=shader+"vec3 textureHeight=vec3(0.0,0.0,0.0);\n";
	shader=shader+"vec3 normal = normalize(n);\n";
	shader=shader+"vec3 b = vec3(0.0,0.0,0.0);\n";
	for(i=0; i<this.layers.length;i++){
		shader=shader+"textureCoords=textureCoords"+i+"+textureHeight;\n";
		shader=shader+"mask=layeralpha"+i+"*mask;\n";
		
		if(this.layers[i].mapinput==GLGE.MAP_VIEW){
			//will need to do in fragment to take the normal maps into account!
			shader=shader+"view=projection * vec4(-eyevec,1.0);\n";
			shader=shader+"textureCoords=view.xyz/view.w*0.5+0.5;\n";
			shader=shader+"textureCoords=textureCoords+textureHeight;\n";
		}
			
		if(this.layers[i].getTexture().className=="Texture" || this.layers[i].getTexture().className=="TextureCanvas"  || this.layers[i].getTexture().className=="TextureVideo" ){
			var txcoord="xy";
			var sampletype="2D";
		}else{
			var txcoord="xyz";
			var sampletype="Cube";
		}
		
		if((this.layers[i].mapto & GLGE.M_COLOR) == GLGE.M_COLOR){			
			if(this.layers[i].blendMode==GLGE.BL_MUL){
				shader=shader+"color = color*(1.0-mask) + color*texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+")*mask;\n";
			}
			else 
			{
				shader=shader+"color = color*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+")*mask;\n";
			}
		}        
		
		if((this.layers[i].mapto & GLGE.M_HEIGHT) == GLGE.M_HEIGHT){
			//do paralax stuff
			shader=shader+"pheight = texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").x;\n";
			shader=shader+"textureHeight =vec3((layerheight"+i+"* (pheight-0.5)  * normalize(eyevec).xy*vec2(1.0,-1.0)),0.0);\n";
		}
		if((this.layers[i].mapto & GLGE.M_SPECCOLOR) == GLGE.M_SPECCOLOR){
			shader=shader+"specC = specC*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").rgb*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKR) == GLGE.M_MSKR){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").r;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKG){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").g;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKB) == GLGE.M_MSKB){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").b;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKA) == GLGE.M_MSKA){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").a;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SPECULAR) == GLGE.M_SPECULAR){
			shader=shader+"spec = spec*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").r*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_REFLECT) == GLGE.M_REFLECT){
			shader=shader+"ref = ref*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").g*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SHINE) == GLGE.M_SHINE){
			shader=shader+"sh = sh*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").b*mask*255.0;\n";
		}
		if((this.layers[i].mapto & GLGE.M_EMIT) == GLGE.M_EMIT){
			shader=shader+"em = em*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").r*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_NOR) == GLGE.M_NOR){
			shader=shader+"normalmap = normalmap*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+")*mask;\n";
			shader=shader+"normal = normalmap.rgb;\n";
			shader=shader+"normal = 2.0*(vec3(normal.r, -normal.g, normal.b) - vec3(0.5, -0.5, 0.5));";
			shader=shader+"b=normalize(cross(t.xyz,n));\n";
			shader=shader+"normal = normal.x*t + normal.y*b + normal.z*n;";
			shader=shader+"normal = normalize(normal);";
		}
		if((this.layers[i].mapto & GLGE.M_ALPHA) == GLGE.M_ALPHA){
			shader=shader+"al = al*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").a*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_AMBIENT) == GLGE.M_AMBIENT){
			shader=shader+"amblight = amblight*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").rgb*mask;\n";
		}
	}		
	shader=shader+"if(al<0.5) discard;\n";
	if(this.binaryAlpha) shader=shader+"al=1.0;\n";

	shader=shader+"vec3 lightvalue=amblight;\n"; 
	shader=shader+"float dotN,spotEffect;";
	shader=shader+"vec3 lightvec=vec3(0.0,0.0,0.0);";
	shader=shader+"vec3 viewvec=vec3(0.0,0.0,0.0);";
	shader=shader+"vec3 specvalue=vec3(0.0,0.0,0.0);";
	shader=shader+"vec2 scoord=vec2(0.0,0.0);";
	shader=shader+"float spotmul=0.0;";
	shader=shader+"float rnd=0.0;";
	shader=shader+"float spotsampleX=0.0;";
	shader=shader+"float spotsampleY=0.0;";
	shader=shader+"float totalweight=0.0;";
	shader=shader+"int cnt=0;";
	shader=shader+"float specularSmoothStepValue=.125;\n";
	shader=shader+"vec2 spotoffset=vec2(0.0,0.0);";
	shader=shader+"float dp=0.0;";
	shader=shader+"if (normal.z<0.0) {normal.z=0.0;}\n";
	shader=shader+"normal/=length(normal);\n";
		
    
	for(var i=0; i<lights.length;i++){
	
		shader=shader+"lightvec=lightvec"+i+";\n";  
		shader=shader+"viewvec=eyevec;\n"; 
		
		//shader=shader+"dp=dot(normal.rgb,eyevec.xyz); if (dp<0.0){(normal-=dp*eyevec/length(eyevec)); normal/=length(normal);}";
		
		if(lights[i].type==GLGE.L_POINT){ 
			shader=shader+"dotN=max(dot(normal,normalize(-lightvec)),0.0);\n";       
			shader=shader+"att = 1.0 / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
			shader=shader+"if(dotN>0.0){\n";
			if(lights[i].diffuse){
				shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
			}
			shader=shader+"}\n";
			if(lights[i].specular){
				shader=shader+"specvalue += smoothstep(-specularSmoothStepValue,specularSmoothStepValue,dotN)*att * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), 0.3*sh);\n";
			}
			
			
			
		}
		shader=shader+"spotEffect = 0.0;\n";
		if(lights[i].type==GLGE.L_SPOT){
			shader=shader+"spotEffect = dot(normalize(lightdir"+i+"), normalize(-lightvec"+i+"));";	
			shader=shader+"if (spotEffect > spotCosCutOff"+i+") {\n";		
			shader=shader+"spotEffect = pow(spotEffect, spotExp"+i+");";
			//spot shadow stuff
			if(lights[i].getCastShadows() && this.shadow){
				shader=shader+"scoord=(((spotcoord"+i+".xy)/spotcoord"+i+".w)+1.0)/2.0;\n";
				shader=shader+"if(scoord.x>0.0 && scoord.x<1.0 && scoord.y>0.0 && scoord.y<1.0){\n";
				shader=shader+"vec4 dist=texture2D(TEXTURE"+shadowlights[i]+", scoord);\n";
				shader=shader+"float depth = dot(dist, vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0))*"+lights[i].distance+".0;\n";
				shader=shader+"spotmul=0.0;\n";
				shader=shader+"totalweight=0.0;\n";
				shader=shader+"if((depth+shadowbias"+i+"-length(lightvec"+i+"))<0.0) {spotmul=1.0; totalweight=1.0;}\n";
				if(lights[i].samples>0){
					shader=shader+"for(int cnt=0; cnt<4; cnt++){;\n";
						shader=shader+"spotsampleX=-0.707106781;spotsampleY=-0.707106781;\n"; 
						shader=shader+"if(cnt==0 || cnt==3) spotsampleX=0.707106781;\n"; 
						shader=shader+"if(cnt==1 || cnt==3) spotsampleY=0.707106781;\n"; 
						shader=shader+"spotoffset=vec2(spotsampleX,spotsampleY)*0.5;\n";
						shader=shader+"dist=texture2D(TEXTURE"+shadowlights[i]+", scoord+spotoffset*shadowsoftness"+i+");\n";
						shader=shader+"depth = dot(dist, vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0))*"+lights[i].distance+".0;\n";
						shader=shader+"if((depth+shadowbias"+i+"-length(lightvec"+i+"))<0.0){\n";
						shader=shader+"spotmul+=length(spotoffset);\n";
						shader=shader+"}\n";
						shader=shader+"totalweight+=length(spotoffset);\n";
					shader=shader+"};\n";
				
					shader=shader+"if(totalweight!=spotmul){\n";
						shader=shader+"spotmul=0.0;\n";
						shader=shader+"totalweight=0.0;\n";
						shader=shader+"for(int cnt=0; cnt<"+lights[i].samples+"; cnt++){;\n"; 
							shader=shader+"rnd=(fract(sin(dot(scoord,vec2(12.9898,78.233))) * 43758.5453)-0.5)*2.0;\n"; //generate random number
							//shader=shader+"spotsampleY=(fract(sin(dot(spotcoord"+i+".yz + vec2(float(cnt)),vec2(12.9898,78.233))) * 43758.5453)-0.5)*2.0;\n"; //generate random number
							shader=shader+"spotsampleX=cos(float(cnt)*"+(360/lights[i].samples).toFixed(2)+"+rnd);\n";
							shader=shader+"spotsampleY=sin(float(cnt)*"+(360/lights[i].samples).toFixed(2)+"+rnd);\n"; 
							shader=shader+"spotoffset=vec2(spotsampleX,spotsampleY)*0.5;\n";
							shader=shader+"dist=texture2D(TEXTURE"+shadowlights[i]+", scoord+spotoffset*shadowsoftness"+i+");\n";
							shader=shader+"depth = dot(dist, vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0))*"+lights[i].distance+".0;\n";
							shader=shader+"if((depth+shadowbias"+i+"-length(lightvec"+i+"))<0.0){\n";
							shader=shader+"spotmul+=length(spotoffset);\n";
							shader=shader+"}\n";
							shader=shader+"totalweight+=length(spotoffset);\n";
						shader=shader+"};\n";
					shader=shader+"}\n";
				}
				shader=shader+"if(totalweight>0.0) spotEffect=spotEffect*pow(1.0-spotmul/totalweight,3.0);\n";
				shader=shader+"}\n";
			}
			//shader=shader+"color=vec4(vec3(spotEffect),1.0);\n";
			shader=shader+"dotN=max(dot(normal,normalize(-lightvec)),0.0);\n";  
			
			if(lights[i].negativeShadow){
				shader=shader+"if(dotN>0.0){\n";
				if(lights[i].diffuse){
					shader=shader+"lightvalue -= (1.0-spotEffect) / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
				}
				shader=shader+"}\n";
			}else{     
				shader=shader+"att = spotEffect / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
			
				shader=shader+"if(dotN>0.0){\n";
				if(lights[i].diffuse){
					shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
				}
				shader=shader+"}\n";
				if(lights[i].specular){
				    shader=shader+"specvalue += smoothstep(-specularSmoothStepValue,specularSmoothStepValue,dotN) * att * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), 0.3 * sh);\n";
				}
			}
			
			
			shader=shader+"}\n";
		}
		if(lights[i].type==GLGE.L_DIR){
			shader=shader+"dotN=max(dot(normal,-normalize(lightvec)),0.0);\n";    
			if(lights[i].diffuse){
				shader=shader+"lightvalue += dotN * lightcolor"+i+";\n";
			}
			if(lights[i].specular){
				shader=shader+"specvalue += smoothstep(-specularSmoothStepValue,specularSmoothStepValue,dotN) * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), 0.3 * sh);\n";
			}
		}
	}
	shader=shader+"float fogfact=1.0;";
	shader=shader+"if(fogtype=="+GLGE.FOG_QUADRATIC+") fogfact=clamp(pow(max((fogfar - length(eyevec)) / (fogfar - fognear),0.0),2.0),0.0,1.0);\n";
	shader=shader+"if(fogtype=="+GLGE.FOG_LINEAR+") fogfact=clamp((fogfar - length(eyevec)) / (fogfar - fognear),0.0,1.0);\n";
	
	shader=shader+"lightvalue = (lightvalue)*ref;\n";
	shader=shader+"if(em>0.0){lightvalue=vec3(1.0,1.0,1.0);  fogfact=1.0;}\n";
	shader=shader+"gl_FragColor =vec4(specvalue.rgb+color.rgb*(em+1.0)*lightvalue.rgb,al)*fogfact+vec4(fogcolor,al)*(1.0-fogfact);\n";
	//shader=shader+"gl_FragColor =vec4(vec3(color.rgb),1.0);\n";

	shader=shader+"}\n";

	return shader;
};
/**
* Set the uniforms needed to render this material
* @private
*/
GLGE.Material.prototype.textureUniforms=function(gl,shaderProgram,lights,object){
	if(this.animation) this.animate();
	var pc=shaderProgram.caches;
		
	if(pc.baseColor!=this.color){
		if(this.ccache!=this.color){
			this.ccache=this.color;
			this.glColor=new Float32Array([this.color.r,this.color.g,this.color.b,this.color.a]);
		}
		gl.uniform4fv(GLGE.getUniformLocation(gl,shaderProgram, "baseColor"), this.glColor);
		pc.baseColor=this.color;
	}
	if(pc.specColor!=this.specColor){
		if(this.sccache!=this.specColor){
			this.sccache=this.specColor;
			this.glspecColor=new Float32Array([this.specColor.r,this.specColor.g,this.specColor.b]);
		}
		gl.uniform3fv(GLGE.getUniformLocation(gl,shaderProgram, "specColor"), this.glspecColor);
		pc.specColor=this.specColor;
	}
	if(pc.specular!=this.specular){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "specular"), this.specular);
		pc.specular=this.specular;
	}
	if(pc.shine!=this.shine){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "shine"), this.shine);
		pc.shine=this.shine;
	}
	if(pc.reflect!=this.reflect){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "reflective"), this.reflect);
		pc.reflect=this.reflect;
	}
	if(pc.emit!=this.emit){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "emit"), this.emit);
		pc.emit=this.emit;
	}
	if(pc.alpha!=this.alpha){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "alpha"), this.alpha);
		pc.alpha=this.alpha;
	}
	
	/*
	if(this.ambient && pc.ambient!=this.ambient){
		gl.uniform3fv(GLGE.getUniformLocation(gl,shaderProgram, "amb"), new Float32Array([this.ambient.r,this.ambient.g,this.ambient.b]));
		pc.ambient=this.ambient;
	}
	*/
	var cnt=0;
	var num=0;
	if(!pc["lightcolor"]){
		pc["lightcolor"]=[];
		pc["lightAttenuation"]=[];
		pc["spotCosCutOff"]=[];
		pc["spotExponent"]=[];
		pc["shadowbias"]=[];
		pc["castshadows"]=[];
		pc["shadowsamples"]=[];
		pc["shadowsoftness"]=[];
	}
	for(var i=0; i<lights.length;i++){
		if(pc["lightcolor"][i]!=lights[i].color){
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,shaderProgram, "lightcolor"+i), lights[i].color.r,lights[i].color.g,lights[i].color.b);
			pc["lightcolor"][i]=lights[i].color;
		}
		if(pc["lightAttenuation"][i]!=lights[i].constantAttenuation){
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,shaderProgram, "lightAttenuation"+i), lights[i].constantAttenuation,lights[i].linearAttenuation,lights[i].quadraticAttenuation);
			pc["lightAttenuation"][i]=lights[i].constantAttenuation;
		}
		if(pc["spotCosCutOff"][i]!=lights[i].spotCosCutOff){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "spotCosCutOff"+i), lights[i].spotCosCutOff);
			pc["spotCosCutOff"][i]=lights[i].spotCosCutOff;
		}
		if(pc["spotExponent"][i]!=lights[i].spotExponent){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "spotExp"+i), lights[i].spotExponent);
			pc["spotExponent"][i]=lights[i].spotExponent;
			
		}
		if(pc["shadowbias"][i]!=lights[i].shadowBias){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "shadowbias"+i), lights[i].shadowBias);
			pc["shadowbias"][i]=lights[i].shadowBias;
		}
		if(pc["shadowsoftness"][i]!=lights[i].softness){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "shadowsoftness"+i), lights[i].softness);
			pc["shadowsoftness"][i]=lights[i].softness;
		}
		    
		//shadow code
		if(lights[i].getCastShadows() && this.shadow && this.emit==0) {
			num=this.textures.length+(cnt++);
			gl.activeTexture(gl["TEXTURE"+num]);
			gl.bindTexture(gl.TEXTURE_2D, lights[i].texture);
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,shaderProgram, "TEXTURE"+num), num);
		}
	
			
	}
	
	if(!shaderProgram.glarrays.layermat) shaderProgram.glarrays.layermat=[];
	

		
	var scale,offset;
	for(i=0; i<this.layers.length;i++){
		if(this.layers[i].animation) this.layers[i].animate();
		scale=this.layers[i].getScale();
		offset=this.layers[i].getOffset();		
		if(!shaderProgram.glarrays.layermat[i]) shaderProgram.glarrays.layermat[i]=new Float32Array(this.layers[i].getMatrix());
			else GLGE.mat4gl(this.layers[i].getMatrix(),shaderProgram.glarrays.layermat[i]);	
		
		try{GLGE.setUniformMatrix(gl,"Matrix4fv",GLGE.getUniformLocation(gl,shaderProgram, "layer"+i+"Matrix"), true, shaderProgram.glarrays.layermat[i]);}catch(e){}
		
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "layeralpha"+i), this.layers[i].getAlpha());
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "layerheight"+i), this.layers[i].getHeight());
	}
    
	for(var i=0; i<this.textures.length;i++){
		
			gl.activeTexture(gl["TEXTURE"+i]);
			if(this.textures[i].doTexture(gl,object)){
			}
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,shaderProgram, "TEXTURE"+i), i);
	}	

};
/**
* Adds a new texture to this material
* @param {String} image URL of the image to be used by the texture
* @return {Number} index of the new texture
*/
GLGE.Material.prototype.addTexture=function(texture){	
	if(typeof texture=="string")  texture=GLGE.Assets.get(texture);
	this.textures.push(texture);
	texture.idx=this.textures.length-1;
	this.fireEvent("shaderupdate",{});
	return this;
};
GLGE.Material.prototype.addTextureCube=GLGE.Material.prototype.addTexture;
GLGE.Material.prototype.addTextureCamera=GLGE.Material.prototype.addTexture;
GLGE.Material.prototype.addTextureCanvas=GLGE.Material.prototype.addTexture;
GLGE.Material.prototype.addTextureVideo=GLGE.Material.prototype.addTexture;



})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class The material layer describes how to apply this layer to the material
* @see GLGE.Material
* @augments GLGE.Animatable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.MaterialLayer=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.blendMode=GLGE.BL_MIX;
};
GLGE.augment(GLGE.Animatable,GLGE.MaterialLayer);
GLGE.augment(GLGE.QuickNotation,GLGE.MaterialLayer);
GLGE.augment(GLGE.JSONLoader,GLGE.MaterialLayer);
GLGE.augment(GLGE.Events,GLGE.MaterialLayer);
/**
 * @name GLGE.MaterialLayer#shaderupdated
 * @event Fires when a change will result in a change to the GLSL shader
 * @param {object} data
 */
 
GLGE.MaterialLayer.prototype.className="MaterialLayer";
GLGE.MaterialLayer.prototype.texture=null;
GLGE.MaterialLayer.prototype.blendMode=null;
GLGE.MaterialLayer.prototype.mapto=GLGE.M_COLOR;
GLGE.MaterialLayer.prototype.mapinput=GLGE.UV1;
GLGE.MaterialLayer.prototype.scaleX=1;
GLGE.MaterialLayer.prototype.offsetX=0;
GLGE.MaterialLayer.prototype.rotX=0;
GLGE.MaterialLayer.prototype.scaleY=1;
GLGE.MaterialLayer.prototype.offsetY=0;
GLGE.MaterialLayer.prototype.rotY=0;
GLGE.MaterialLayer.prototype.scaleZ=1;
GLGE.MaterialLayer.prototype.offsetZ=0;
GLGE.MaterialLayer.prototype.rotZ=0;
GLGE.MaterialLayer.prototype.dScaleX=0;
GLGE.MaterialLayer.prototype.dOffsetX=0;
GLGE.MaterialLayer.prototype.dRotX=0;
GLGE.MaterialLayer.prototype.dScaleY=0;
GLGE.MaterialLayer.prototype.dOffsetY=0;
GLGE.MaterialLayer.prototype.dRotY=0;
GLGE.MaterialLayer.prototype.dScaleZ=0;
GLGE.MaterialLayer.prototype.dOffsetZ=0;
GLGE.MaterialLayer.prototype.dRotZ=0;
GLGE.MaterialLayer.prototype.alpha=1;
GLGE.MaterialLayer.prototype.height=0.05;
GLGE.MaterialLayer.prototype.matrix=null;

/**
* Gets the textures used by the layer
* @return {GLGE.Texture} The current shininess of the material
*/
GLGE.MaterialLayer.prototype.getMatrix=function(){
	if(!this.matrix){
		var offset=this.getOffset();
		var scale=this.getScale();
		var rotation=this.getRotation();
		this.matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.translateMatrix(offset.x,offset.y,offset.z),GLGE.scaleMatrix(scale.x,scale.y,scale.z)),GLGE.rotateMatrix(rotation.x,rotation.y,rotation.z));
	}
	return this.matrix;
};
/**
* Sets the height for this layer, currently only used for parallax mapping
* @param {number} the height of this layer
*/
GLGE.MaterialLayer.prototype.setHeight=function(value){
	this.height=value;
	return this;
};
/**
* Gets the height for this layer, currently only used for parallax mapping
* @return {number} the height of this layer
*/
GLGE.MaterialLayer.prototype.getHeight=function(){
	return this.height;
};

/**
* Sets the textures alpha blending value
* @param {number} the alpha for this layer
*/
GLGE.MaterialLayer.prototype.setAlpha=function(value){
	this.alpha=value;
	return this;
};
/**
* Gets the textures alpha blending value
* @return {number} the alpha for this layer
*/
GLGE.MaterialLayer.prototype.getAlpha=function(){
	return this.alpha;
};

/**
* Sets the textures used by the layer
* @param {GLGE.Texture} value the teture to associate with this layer
*/
GLGE.MaterialLayer.prototype.setTexture=function(value){
	if(typeof value=="string")  value=GLGE.Assets.get(value);
	this.texture=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the textures used by the layer
* @return {GLGE.Texture} The current shininess of the material
*/
GLGE.MaterialLayer.prototype.getTexture=function(){
	return this.texture;
};
/**
* Sets the flag for how this layer maps to the material
* @param {Number} value the flags to set for this layer
*/
GLGE.MaterialLayer.prototype.setMapto=function(value){
	this.mapto=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the flag representing the way the layer maps to the material
* @return {Number} The flags currently set for this layer
*/
GLGE.MaterialLayer.prototype.getMapto=function(){
	return this.mapto;
};
/**
* Sets the texture coordinate system
* @param {Number} value the mapping to use
*/
GLGE.MaterialLayer.prototype.setMapinput=function(value){
	this.mapinput=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the texture coordinate system
* @return {Number} The current mapping
*/
GLGE.MaterialLayer.prototype.getMapinput=function(){
	return this.mapinput;
};

/**
* Gets the layers texture offset
* @return {object} the current offset
*/
GLGE.MaterialLayer.prototype.getOffset=function(){
	var offset={};
	offset.x=parseFloat(this.getOffsetX())+parseFloat(this.getDOffsetX());
	offset.y=parseFloat(this.getOffsetY())+parseFloat(this.getDOffsetY());
	offset.z=parseFloat(this.getOffsetZ())+parseFloat(this.getDOffsetZ());
	return offset;
};

/**
* Gets the layers texture rotation
* @return {object} the current rotation
*/
GLGE.MaterialLayer.prototype.getRotation=function(){
	var rotation={};
	rotation.x=parseFloat(this.getRotX())+parseFloat(this.getDRotX());
	rotation.y=parseFloat(this.getRotY())+parseFloat(this.getDRotY());
	rotation.z=parseFloat(this.getRotZ())+parseFloat(this.getDRotZ());
	return rotation;
};

/**
* Gets the layers texture scale
* @return {object} the current scale
*/
GLGE.MaterialLayer.prototype.getScale=function(){
	var scale={};
	scale.x=parseFloat(this.getScaleX())+parseFloat(this.getDScaleX());
	scale.y=parseFloat(this.getScaleY())+parseFloat(this.getDScaleY());
	scale.z=parseFloat(this.getScaleZ())+parseFloat(this.getDScaleZ());
	return scale;
};

/**
* Sets the layers texture X offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetX=function(value){
	this.matrix=null;
	this.offsetX=value;
	return this;
};
/**
* Gets the layers texture X offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetX=function(){
	return this.offsetX;
};
/**
* Sets the layers texture Y offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetY=function(value){
	this.matrix=null;
	this.offsetY=value;
	return this;
};
/**
* Gets the layers texture Y offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetY=function(){
	return this.offsetY;
};
/**
* Sets the layers texture Z offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetZ=function(value){
	this.matrix=null;
	this.offsetZ=value;
	return this;
};
/**
* Gets the layers texture Z offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetZ=function(){
	return this.offsetZ;
};
/**
* Sets the layers texture X displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetX=function(value){
	this.matrix=null;
	this.dOffsetX=value;
	return this;
};
/**
* Gets the layers texture X displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetX=function(){
	return this.dOffsetX;
};
/**
* Sets the layers texture Y displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetY=function(value){
	this.matrix=null;
	this.dOffsetY=value;
	return this;
};
/**
* Gets the layers texture Y displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetY=function(){
	return this.dOffsetY;
};
/**
* Sets the layers texture Z displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetZ=function(value){
	this.matrix=null;
	this.dOffsetZ=value;
	return this;
};
/**
* Gets the layers texture X displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetZ=function(){
	return this.dOffsetZ;
};
/**
* Sets the layers texture X scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleX=function(value){
	this.matrix=null;
	this.scaleX=value;
	return this;
};
/**
* Gets the layers texture X scale
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getScaleX=function(){
	return this.scaleX;
};
/**
* Sets the layers texture Y scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleY=function(value){
	this.matrix=null;
	this.scaleY=value;
	return this;
};
/**
* Gets the layers texture Y scale
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getScaleY=function(){
	return this.scaleY;
};
/**
* Sets the layers texture Z scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleZ=function(value){
	this.matrix=null;
	this.scaleZ=value;
	return this;
};
/**
* Gets the layers texture Z offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getScaleZ=function(){
	return this.scaleZ;
};
/**
* Sets the layers texture X displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleX=function(value){
	this.matrix=null;
	this.dScaleX=value;
	return this;
};
/**
* Gets the layers texture X displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleX=function(){
	return this.dScaleX;
};
/**
* Sets the layers texture Y displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleY=function(value){
	this.matrix=null;
	this.dScaleY=value;
	return this;
};
/**
* Gets the layers texture Y displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleY=function(){
	return this.dScaleY;
};
/**
* Sets the layers texture Z displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleZ=function(value){
	this.matrix=null;
	this.dScaleZ=value;
	return this;
};
/**
* Gets the layers texture X displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleZ=function(){
	return this.dScaleZ;
};


/**
* Sets the layers texture X Rotation
* @param {Number} value the amount to roate the texture
*/
GLGE.MaterialLayer.prototype.setRotX=function(value){
	this.matrix=null;
	this.rotX=value;
	return this;
};
/**
* Gets the layers texture X rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotX=function(){
	return this.rotX;
};
/**
* Sets the layers texture Y rotate
* @param {Number} value the amount to rotate the texture
*/
GLGE.MaterialLayer.prototype.setRotY=function(value){
	this.matrix=null;
	this.rotY=value;
	return this;
};
/**
* Gets the layers texture Y rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotY=function(){
	return this.rotY;
};
/**
* Sets the layers texture Z rotate
* @param {Number} value the amount to rotate the texture
*/
GLGE.MaterialLayer.prototype.setRotZ=function(value){
	this.matrix=null;
	this.rotZ=value;
	return this;
};
/**
* Gets the layers texture Z rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotZ=function(){
	return this.rotZ;
};
/**
* Sets the layers texture X displacment rotation, useful for animation
* @param {Number} value the amount to rotation the texture
*/
GLGE.MaterialLayer.prototype.setDRotX=function(value){
	this.matrix=null;
	this.dRotX=value;
	return this;
};
/**
* Gets the layers texture X displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotX=function(){
	return this.dRotX;
};
/**
* Sets the layers texture Y displacment rotation, useful for animation
* @param {Number} value the amount to rotaion the texture
*/
GLGE.MaterialLayer.prototype.setDRotY=function(value){
	this.matrix=null;
	this.dRotY=value;
	return this;
};
/**
* Gets the layers texture Y displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotY=function(){
	return this.dRotY;
};
/**
* Sets the layers texture Z displacment rotation, useful for animation
* @param {Number} value the amount to rotation the texture
*/
GLGE.MaterialLayer.prototype.setDRotZ=function(value){
	this.matrix=null;
	this.dRotZ=value;
	return this;
};
/**
* Gets the layers texture X displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotZ=function(){
	return this.dRotZ;
};

/**
* Sets the layers blending mode
* @param {Number} value the blend mode for the layer
*/
GLGE.MaterialLayer.prototype.setBlendMode=function(value){
	this.blendMode=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the layers tblending mode
* @return {Number} the blend mode for the layer
*/
GLGE.MaterialLayer.prototype.getBlendMode=function(){
	return this.blendMode;
};



})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class Creates a new mesh/material to add to an object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.MultiMaterial=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.lods=[new GLGE.ObjectLod]
}
GLGE.augment(GLGE.QuickNotation,GLGE.MultiMaterial);
GLGE.augment(GLGE.JSONLoader,GLGE.MultiMaterial);
GLGE.MultiMaterial.prototype.className="MultiMaterial";
/**
* sets the mesh
* @param {GLGE.Mesh} mesh 
*/
GLGE.MultiMaterial.prototype.setMesh=function(mesh){
	this.lods[0].setMesh(mesh);
	return this;
}
/**
* gets the mesh
* @returns {GLGE.Mesh}
*/
GLGE.MultiMaterial.prototype.getMesh=function(){
	return this.lods[0].getMesh();
}
/**
* sets the material
* @param {GLGE.Material} material 
*/
GLGE.MultiMaterial.prototype.setMaterial=function(material){
	this.lods[0].setMaterial(material);
	return this;
}
/**
* gets the material
* @returns {GLGE.Material}
*/
GLGE.MultiMaterial.prototype.getMaterial=function(){
	return this.lods[0].getMaterial();
}

/**
* returns the load for a given pixel size
* @param {number} pixelsize the current pixel size of the object
* @returns {GLGE.ObjectLod}
*/
GLGE.MultiMaterial.prototype.getLOD=function(pixelsize){
	var currentSize=0;
	var currentLOD=this.lods[0];
	if(this.lods.length>1){
		for(var i=1; i<this.lods.length;i++){
			var size=this.lods[i].pixelSize;
			if(size>currentSize && size<pixelsize && this.lods[i].mesh && this.lods[i].mesh.loaded){
				currentSize=size;
				currentLOD=this.lods[i];
			}
		}
	}
	return currentLOD;
}

/**
* adds a lod to this multimaterial
* @param {GLGE.ObjectLod} lod the lod to add
*/
GLGE.MultiMaterial.prototype.addObjectLod=function(lod){
	this.lods.push(lod);
	return this;
}

/**
* Updates the GL shader program for the object
* @private
*/
GLGE.MultiMaterial.prototype.updateProgram=function(){
	for(var i=0; i<this.lods.length;i++){
		this.lods[i].GLShaderProgram=null;
	}
	return this;
}


/**
* removes a lod to this multimaterial
* @param {GLGE.ObjectLod} lod the lod to remove
*/
GLGE.MultiMaterial.prototype.removeObjectLod=function(lod){
	var idx=this.lods.indexOf(lod);
	if(idx) this.lods.splice(idx,1);
	return this;
}



})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){







/**
* @class A texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Texture=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.Texture);
GLGE.augment(GLGE.JSONLoader,GLGE.Texture);
GLGE.Texture.prototype.className="Texture";
GLGE.Texture.prototype.image=null;
GLGE.Texture.prototype.glTexture=null;
GLGE.Texture.prototype.url=null;
/**
* Gets the textures used by the layer
* @return {string} The textures image url
*/
GLGE.Texture.prototype.getSrc=function(){
	return this.url;
};

/**
* Sets the textures image location
* @param {string} url the texture image url
*/
GLGE.Texture.prototype.setSrc=function(url){
	this.url=url;
	this.state=0;
	this.image=new Image();
	var texture=this;
	this.image.onload = function(){
		texture.state=1;
	}	
	this.image.src=url;	
	if(this.glTexture && this.gl){
		this.gl.deleteTexture(this.glTexture);
		this.glTexture=null;
	}
	return this;
};

/**
* Sets the textures image location
* @private
**/
GLGE.Texture.prototype.doTexture=function(gl){
	this.gl=gl;
	//create the texture if it's not already created
	if(!this.glTexture) this.glTexture=gl.createTexture();
	//if the image is loaded then set in the texture data
	if(this.state==1){
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,this.image);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.state=2;
	}
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	
	if(this.state==2) return true;
		else return false;
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){






/**
* @class A reflection texture will reflect in a plane for a specified transform
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureCamera=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureCamera);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureCamera);
GLGE.TextureCamera.prototype.className="Texture";
GLGE.TextureCamera.prototype.texture=null;
GLGE.TextureCamera.prototype.glTexture=null;
GLGE.TextureCamera.prototype.object=null;
GLGE.TextureCamera.prototype.camera=null;
GLGE.TextureCamera.prototype.bufferHeight=0;
GLGE.TextureCamera.prototype.bufferWidth=0;
GLGE.TextureCamera.prototype.mirrorAxis=GLGE.NONE;
GLGE.TextureCamera.prototype.clipAxis=GLGE.NONE;

/**
* sets the RTT  render buffer width
* @param {number} buffer width
**/
GLGE.TextureCamera.prototype.setBufferWidth=function(width){
	this.bufferWidth=width;
	this.update=true;
	return this;
}
/**
* gets the RTT  render buffer width
* @returns the width
**/
GLGE.TextureCamera.prototype.getBufferWidth=function(){
	return this.bufferWidth;
}

/**
* sets the RTT  render buffer height
* @param {number} buffer height
**/
GLGE.TextureCamera.prototype.setBufferHeight=function(height){
	this.bufferHeight=height;
	this.update=true;
	return this;
}
/**
* gets the RTT  render buffer height
* @returns the height
**/
GLGE.TextureCamera.prototype.getBufferHeight=function(){
	return this.bufferHeight;
}

/**
* sets the RTT  clip axis
* @param {number} the axis
**/
GLGE.TextureCamera.prototype.setClipAxis=function(camera){
	this.clipAxis=camera;
	return this;
}
/**
* gets the RTT clip axis
* @returns the axis
**/
GLGE.TextureCamera.prototype.getClipAxis=function(){
	return this.clipAxis;
}

/**
* sets the RTT  mirror axis
* @param {number} the axis
**/
GLGE.TextureCamera.prototype.setMirrorAxis=function(camera){
	this.mirrorAxis=camera;
	return this;
}
/**
* gets the RTT mirror axis
* @returns the axis
**/
GLGE.TextureCamera.prototype.getMirrorAxis=function(){
	return this.mirrorAxis;
}

/**
* sets the RTT camera to use
* @param {GLGE.Camera} the source camera
**/
GLGE.TextureCamera.prototype.setCamera=function(camera){
	this.camera=camera;
	return this;
}
/**
* gets the RTT source camera
* @returns {GLGE.Camera} the source camera
**/
GLGE.TextureCamera.prototype.getCamera=function(){
	return this.camera;
}

/**
* does what is needed to get the texture
* @private
**/
GLGE.TextureCamera.prototype.doTexture=function(gl,object){
	if(this.camera){
		this.gl=gl;
		var modelmatrix=object.getModelMatrix();
		var pmatrix=gl.scene.camera.getProjectionMatrix();
		var cameramatrix=this.camera.getViewMatrix();
		var matrix;
		
		if(this.mirrorAxis){
			switch(this.mirrorAxis){
				case GLGE.XAXIS:
					matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.mulMat4(cameramatrix,modelmatrix),GLGE.scaleMatrix(-1,1,1)),GLGE.inverseMat4(modelmatrix));
				break;
				case GLGE.YAXIS:
					matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.mulMat4(cameramatrix,modelmatrix),GLGE.scaleMatrix(1,-1,1)),GLGE.inverseMat4(modelmatrix));
				break;
				case GLGE.ZAXIS:
					matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.mulMat4(cameramatrix,modelmatrix),GLGE.scaleMatrix(1,1,-1)),GLGE.inverseMat4(modelmatrix));
				break;
			}
		}else{
			matrix=cameramatrix;
		}
		
		if(this.clipAxis){
			var clipplane
			switch(this.clipAxis){
				case GLGE.NEG_XAXIS:
					var dirnorm=GLGE.toUnitVec3([-modelmatrix[0],-modelmatrix[4],-modelmatrix[8]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)];
					break;
				case GLGE.POS_XAXIS:
					var dirnorm=GLGE.toUnitVec3([modelmatrix[0],modelmatrix[4],modelmatrix[8]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)];
					break;
				case GLGE.NEG_YAXIS:
					var dirnorm=GLGE.toUnitVec3([-modelmatrix[1],-modelmatrix[5],-modelmatrix[9]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)];
					break;
				case GLGE.POS_YAXIS:
					var dirnorm=GLGE.toUnitVec3([modelmatrix[1],modelmatrix[5],modelmatrix[9]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)];
					break;
				case GLGE.NEG_ZAXIS:
					var dirnorm=GLGE.toUnitVec3([-modelmatrix[2],-modelmatrix[6],-modelmatrix[10]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)];
					break;
				case GLGE.POS_ZAXIS:
					var dirnorm=GLGE.toUnitVec3([modelmatrix[2],modelmatrix[6],modelmatrix[10]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)];
					break;
			}
			
			var itmvp=GLGE.transposeMat4(GLGE.inverseMat4(GLGE.mulMat4(pmatrix,matrix)));

			clipplane=GLGE.mulMat4Vec4(itmvp,clipplane);
			clipplane=GLGE.scaleVec4(clipplane,pmatrix[10]);
			clipplane[3] -= 1;
			if(clipplane[2]<0) GLGE.scaleVec4(clipplane,-1);
			var suffix=[ 1,0,0,0,
					0,1,0,0,
					clipplane[0],clipplane[1],clipplane[2],clipplane[3],
					0,0,0,1];
			pmatrix=GLGE.mulMat4(suffix,pmatrix);
		}
		var height=(!this.bufferHeight ? gl.scene.renderer.canvas.height : this.bufferHeight);
		var width=(!this.bufferWidth ? gl.scene.renderer.canvas.width : this.bufferWidth);
	
		//create the texture if it's not already created
		if(!this.glTexture || this.update){
			this.createFrameBuffer(gl);
			gl.scene.addRenderPass(this.frameBuffer,matrix, gl.scene.camera.getProjectionMatrix(),width,height,object);
			gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
			this.update=false;
			return false;
		}else{	
			gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.scene.addRenderPass(this.frameBuffer,matrix, pmatrix,width,height,object);
			return true;
		}
	}else{
		return false;
	}
}
GLGE.TextureCamera.prototype.registerPasses=GLGE.TextureCamera.prototype.doTexture;
/**
* Creates the frame buffer for our texture
* @private
*/
GLGE.TextureCamera.prototype.createFrameBuffer=function(gl){
	var height=(!this.bufferHeight ? gl.scene.renderer.canvas.height : this.bufferHeight);
	var width=(!this.bufferWidth ? gl.scene.renderer.canvas.width : this.bufferWidth);
	
	if(!this.frameBuffer) this.frameBuffer = gl.createFramebuffer();
	if(!this.renderBuffer) this.renderBuffer = gl.createRenderbuffer();
	if(!this.glTexture) this.glTexture=gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

	var tex = new Uint8Array(width*height*4);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    
	gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
	//dpeth stencil doesn't seem to work in either webkit or mozilla so don't use for now - reflected particles will be messed up!
	//gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL,width, height);
	//gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,width, height);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
    
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.glTexture, 0);	
    
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, null);
}



})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A canvase texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureCanvas=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.canvas=document.createElement("canvas");
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureCanvas);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureCanvas);
GLGE.TextureCanvas.prototype.className="TextureCanvas";
GLGE.TextureCanvas.prototype.glTexture=null;
GLGE.TextureCanvas.prototype.autoUpdate=true;
/**
* Gets the auto update flag
* @return {boolean} The auto update flag
*/
GLGE.TextureCanvas.prototype.getAutoUpdate=function(){
	return this.autoUpdate;
};
/**
* Sets the auto update flag
* @param {boolean} value The auto update flag
*/
GLGE.TextureCanvas.prototype.setAutoUpdate=function(value){
	this.autoUpdate=value;
	return this;
};
/**
* Gets the canvas used by the texture
* @return {canvas} The textures image url
*/
GLGE.TextureCanvas.prototype.getCanvas=function(){
	return this.canvas;
};
/**
* Sets the canvas used by the texture
* @param {canvas} canvas The canvas to use
*/
GLGE.TextureCanvas.prototype.setCanvas=function(canvas){
	this.canvas=canvas;
	return this;
};
/**
* Sets the canvas height
* @param {number} value The canvas height
*/
GLGE.TextureCanvas.prototype.setHeight=function(value){
	this.canvas.height=value;
	return this;
};
/**
* Sets the canvas width
* @param {number} value The canvas width
*/
GLGE.TextureCanvas.prototype.setWidth=function(value){
	this.canvas.width=value;
	return this;
};

/**
* gets the canvas height
* @returns {number} The canvas height
*/
GLGE.TextureCanvas.prototype.getHeight=function(){
	return this.canvas.height;
};
/**
* gets the canvas width
* @returns {number} The canvas width
*/
GLGE.TextureCanvas.prototype.getWidth=function(){
	return this.canvas.width;
};

/**
* does the canvas texture GL stuff
* @private
**/
GLGE.TextureCanvas.prototype.doTexture=function(gl){
	this.gl=gl;
	//create the texture if it's not already created
	if(!this.glTexture){
		this.glTexture=gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		this.updateCanvas(gl);
	}else{
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		if(this.autoUpdate || this.doUpdate) this.updateCanvas(gl);
	}
	this.doUpdate=false;

	
	return true;
}
/**
* Manually updates the canvas Texture
*/
GLGE.TextureCanvas.prototype.update=function(){
	this.doUpdate=true;
}
/**
* Updates the canvas texture
* @private
*/
GLGE.TextureCanvas.prototype.updateCanvas=function(gl){
	var canvas = this.canvas;
	
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	//TODO: fix this when minefield is upto spec
	try{gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
}


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureCube=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureCube);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureCube);
GLGE.TextureCube.prototype.className="TextureCube";
GLGE.TextureCube.prototype.posX=null;
GLGE.TextureCube.prototype.negX=null;
GLGE.TextureCube.prototype.posY=null;
GLGE.TextureCube.prototype.negY=null;
GLGE.TextureCube.prototype.posZ=null;
GLGE.TextureCube.prototype.negZ=null;
GLGE.TextureCube.prototype.texture=null;
GLGE.TextureCube.prototype.glTexture=null;
GLGE.TextureCube.prototype.loadState=0;
/**
* Sets the url for a given image
* @param {string} url the texture image url
* @param {string} image the image element to load
*/
GLGE.TextureCube.prototype.setSrc=function(url,image,mask){
	this.url=url;
	this.state=0;
	this[image]=new Image();
	var texture=this;
	this[image].onload = function(){
		texture.loadState+=mask;
	}	
	this[image].src=url;	
	if(this.glTexture && this.gl) {
		this.gl.deleteTexture(this.glTexture);
		this.glTexture=null;
	}
	return this;
}

/**
* Sets the positive X cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcPosX=function(url){
	this.setSrc(url,"posX",1);
	return this;
};
/**
* Sets the negative X cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcNegX=function(url){
	this.setSrc(url,"negX",2);
	return this;
};
/**
* Sets the positive Y cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcPosY=function(url){
	this.setSrc(url,"posY",4);
	return this;
};
/**
* Sets the negative Y cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcNegY=function(url){
	if(typeof url!="string"){
		this.negY=url;
		this.loadState+=8;
	}else{
		this.setSrc(url,"negY",8);
	}
	return this;
};
/**
* Sets the positive Z cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcPosZ=function(url){
	this.setSrc(url,"posZ",16);
	return this;
};
/**
* Sets the negative Z cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcNegZ=function(url){
	this.setSrc(url,"negZ",32);
	return this;
};

/**
* Sets the textures image location
* @private
**/
GLGE.TextureCube.prototype.doTexture=function(gl,object){
	this.gl=gl;
	//create the texture if it's not already created
	if(!this.glTexture) this.glTexture=gl.createTexture();
	//if the image is loaded then set in the texture data
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
	if(this.loadState==63 && this.state==0){
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.posX);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.negX);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.posY);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.negY);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.posZ);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.negZ);
		gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		this.state=1;
	}
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
	if(this.state==1) return true;
		else return false;
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A video texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureVideo=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.video=document.createElement("video");
	this.video.style.display="none";
	this.video.setAttribute("loop","loop");
	this.video.autoplay=true;
	//looping isn't working in firefox so quick fix!
	this.video.addEventListener("ended", function() { this.play(); }, true); 
	//video needs to be part of page to work for some reason :-s
	document.getElementsByTagName("body")[0].appendChild(this.video);
	//used to get webkit working
	this.canvas=document.createElement("canvas");
	this.ctx=this.canvas.getContext("2d");
	
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureVideo);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureVideo);
GLGE.TextureVideo.prototype.className="TextureVideo";
GLGE.TextureVideo.prototype.glTexture=null;
/**
* Gets the canvas used by the texture
* @return {video} The textures image url
*/
GLGE.TextureVideo.prototype.getVideo=function(){
	return this.video;
};
/**
* Sets the video used by the texture
* @param {video} canvas The canvas to use
*/
GLGE.TextureVideo.prototype.setVideo=function(video){
	this.video=video;
	return this;
};

/**
* Sets the source used for the video
* @param {string} src The URL of the video
*/
GLGE.TextureVideo.prototype.setSrc=function(src){
	this.video.src=src;
	return this;
};
/**
* gets the source used for the video
* @returns {string} The URL of the video
*/
GLGE.TextureVideo.prototype.getSrc=function(src){
	return this.video.src;
};

/**
* does the canvas texture GL stuff
* @private
**/
GLGE.TextureVideo.prototype.doTexture=function(gl){
	this.gl=gl;
	//create the texture if it's not already created
	if(!this.glTexture){
		this.glTexture=gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		this.updateTexture(gl);
	}else{
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		this.updateTexture(gl);
	}

	
	return true;
}
/**
* Updates the canvas texture
* @private
*/
GLGE.TextureVideo.prototype.updateTexture=function(gl){
	var video = this.video;
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	//TODO: fix this when minefield is upto spec
	if(video.readyState>0){
	if(video.height<=0){
		video.style.display="";
		video.height=video.offsetHeight;
		video.width=video.offsetWidth;
		video.style.display="none";
	}
	this.canvas.height=video.height;
	this.canvas.width=video.width;
	this.ctx.drawImage(video, 0, 0);
	try{gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	
	/*
	use when video is working in webkit
	try{gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	*/
	}
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class Creates a new load for a multimaterial
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.ObjectLod=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.ObjectLod);
GLGE.augment(GLGE.JSONLoader,GLGE.ObjectLod);
GLGE.ObjectLod.prototype.mesh=null;
GLGE.ObjectLod.prototype.className="ObjectLod";
GLGE.ObjectLod.prototype.material=null;
GLGE.ObjectLod.prototype.program=null;
GLGE.ObjectLod.prototype.GLShaderProgramPick=null;
GLGE.ObjectLod.prototype.GLShaderProgramShadow=null;
GLGE.ObjectLod.prototype.GLShaderProgram=null;
GLGE.ObjectLod.prototype.pixelSize=0;

/**
* sets the mesh
* @param {GLGE.Mesh} mesh 
*/
GLGE.ObjectLod.prototype.setMesh=function(mesh){
	if(typeof mesh=="string")  mesh=GLGE.Assets.get(mesh);
	
	//remove event listener from current material
	if(this.mesh){
		this.mesh.removeEventListener("shaderupdate",this.meshupdated);
	}
	var multiMaterial=this;
	this.meshupdated=function(event){
		multiMaterial.GLShaderProgram=null;
	};
	//set event listener for new material
	mesh.addEventListener("shaderupdate",this.meshupdated);
	
	this.GLShaderProgram=null;
	this.mesh=mesh;
	return this;
}
/**
* gets the mesh
* @returns {GLGE.Mesh}
*/
GLGE.ObjectLod.prototype.getMesh=function(){
	return this.mesh;
}
/**
* sets the material
* @param {GLGE.Material} material 
*/
GLGE.ObjectLod.prototype.setMaterial=function(material){
	if(typeof material=="string")  material=GLGE.Assets.get(material);
	
	//remove event listener from current material
	if(this.material){
		this.material.removeEventListener("shaderupdate",this.materialupdated);
	}
	var ObjectLOD=this;
	this.materialupdated=function(event){
		ObjectLOD.GLShaderProgram=null;
	};
	//set event listener for new material
	material.addEventListener("shaderupdate",this.materialupdated);
	
	this.GLShaderProgram=null;
	this.material=material;
	return this;
}
/**
* gets the material
* @returns {GLGE.Material}
*/
GLGE.ObjectLod.prototype.getMaterial=function(){
	return this.material;
}

/**
* gets the pixelsize limit for this lod
* @returns {number}
*/
GLGE.ObjectLod.prototype.getPixelSize=function(){
	return this.pixelSize;
}
/**
* sets the pixelsize limit for this lod
* @returns {number}
*/
GLGE.ObjectLod.prototype.setPixelSize=function(value){
	this.pixelSize=parseFloat(value);
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class An object that can be rendered in a scene
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Object=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.multimaterials=[];
	this.renderCaches=[];
}
GLGE.augment(GLGE.Placeable,GLGE.Object);
GLGE.augment(GLGE.Animatable,GLGE.Object);
GLGE.augment(GLGE.QuickNotation,GLGE.Object);
GLGE.augment(GLGE.JSONLoader,GLGE.Object);
GLGE.Object.prototype.className="Object";
GLGE.Object.prototype.mesh=null;
GLGE.Object.prototype.skeleton=null;
GLGE.Object.prototype.scene=null;
GLGE.Object.prototype.transformMatrix=GLGE.identMatrix();
GLGE.Object.prototype.material=null;
GLGE.Object.prototype.gl=null;
GLGE.Object.prototype.multimaterials=null;
GLGE.Object.prototype.zTrans=false;
GLGE.Object.prototype.renderCaches=null;
GLGE.Object.prototype.id="";
GLGE.Object.prototype.pickable=true;
GLGE.Object.prototype.drawType=GLGE.DRAW_TRIS;
GLGE.Object.prototype.pointSize=1;
GLGE.Object.prototype.cull=false;

//shadow fragment
var shfragStr=[];
shfragStr.push("#ifdef GL_ES\nprecision highp float;\n#endif\n");
shfragStr.push("uniform float distance;\n");
shfragStr.push("varying vec3 eyevec;\n");
shfragStr.push("void main(void)\n");
shfragStr.push("{\n");
//shfragStr.push("float depth = gl_FragCoord.z / gl_FragCoord.w;\n");
shfragStr.push("float depth=length(eyevec);\n");
shfragStr.push("vec4 rgba=fract(depth/distance * vec4(16777216.0, 65536.0, 256.0, 1.0));\n");
shfragStr.push("gl_FragColor=rgba-rgba.rrgb*vec4(0.0,0.00390625,0.00390625,0.00390625);\n");
shfragStr.push("}\n");
GLGE.Object.prototype.shfragStr=shfragStr.join("");

//normal fragment
var nfragStr=[];
nfragStr.push("#ifdef GL_ES\nprecision highp float;\n#endif\n");
nfragStr.push("varying vec3 n;\n");
nfragStr.push("void main(void)\n");
nfragStr.push("{\n");
nfragStr.push("gl_FragColor=vec4(n,1.0);\n");
nfragStr.push("}\n");
GLGE.Object.prototype.nfragStr=nfragStr.join("");

//picking fragment
var pkfragStr=[];
pkfragStr.push("#ifdef GL_ES\nprecision highp float;\n#endif\n");
pkfragStr.push("uniform float far;\n");
pkfragStr.push("uniform vec3 pickcolor;\n");
pkfragStr.push("varying vec3 n;\n");
pkfragStr.push("varying vec4 UVCoord;\n");
pkfragStr.push("void main(void)\n");
pkfragStr.push("{\n");
pkfragStr.push("float Xcoord = gl_FragCoord.x+0.5;\n");
pkfragStr.push("if(Xcoord>0.0) gl_FragColor = vec4(pickcolor,1.0);\n");
pkfragStr.push("if(Xcoord>1.0) gl_FragColor = vec4(n,1.0);\n");
pkfragStr.push("if(Xcoord>2.0){");	
pkfragStr.push("vec3 rgb=fract((gl_FragCoord.z/gl_FragCoord.w) * vec3(65536.0, 256.0, 1.0));\n");
pkfragStr.push("gl_FragColor=vec4(rgb-rgb.rrg*vec3(0.0,0.00390625,0.00390625),1.0);\n");
pkfragStr.push("}");
//x tex coord
pkfragStr.push("if(Xcoord>3.0){");	
pkfragStr.push("vec3 rgb=fract(UVCoord.x * vec3(65536.0, 256.0, 1.0));\n");
pkfragStr.push("gl_FragColor=vec4(rgb-rgb.rrg*vec3(0.0,0.00390625,0.00390625),1.0);\n");
pkfragStr.push("}");
//y tex coord
pkfragStr.push("if(Xcoord>4.0){");	
pkfragStr.push("vec3 rgb=fract(UVCoord.y * vec3(65536.0, 256.0, 1.0));\n");
pkfragStr.push("gl_FragColor=vec4(rgb-rgb.rrg*vec3(0.0,0.00390625,0.00390625),1.0);\n");
pkfragStr.push("}");
pkfragStr.push("}\n");
GLGE.Object.prototype.pkfragStr=pkfragStr.join("");


/**
* Gets the pickable flag for the object
*/
GLGE.Object.prototype.getPickable=function(){
	return this.pickable;
}
/**
* Sets the pickable flag for the object
* @param {boolean} value the culling flag
*/
GLGE.Object.prototype.setPickable=function(pickable){
	this.pickable=pickable;
	return this;
}

/**
* Gets the culling flag for the object
*/
GLGE.Object.prototype.getCull=function(){
	return this.cull;
}
/**
* Sets the culling flag for the object
* @param {boolean} value the culling flag
*/
GLGE.Object.prototype.setCull=function(cull){
	this.cull=cull;
	return this;
}

/**
* Gets the objects draw type
*/
GLGE.Object.prototype.getDrawType=function(){
	return this.drawType;
}
/**
* Sets the objects draw type
* @param {GLGE.number} value the draw type of this object
*/
GLGE.Object.prototype.setDrawType=function(value){
	this.drawType=value;
	return this;
}

/**
* Gets the objects draw point size
*/
GLGE.Object.prototype.getPointSize=function(){
	return this.pointSize;
}
/**
* Sets the objects draw points size
* @param {GLGE.number} value the point size to render
*/
GLGE.Object.prototype.setPointSize=function(value){
	this.pointSize=parseFloat(value);
	return this;
}


/**
* Gets the objects skeleton
* @returns GLGE.Group
*/
GLGE.Object.prototype.getSkeleton=function(){
	return this.skeleton;
}
/**
* Sets the objects skeleton
* @param {GLGE.Group} value the skeleton group to set
*/
GLGE.Object.prototype.setSkeleton=function(value){
	this.skeleton=value;
	this.bones=null;
	return this;
}

GLGE.Object.prototype.getBoundingVolume=function(local){
	if(!local) local=0;
	if(!this.boundingVolume) this.boundingVolume=[];
	if(!this.boundmatrix) this.boundmatrix=[];
	
	var matrix=this.getModelMatrix();
	if(matrix!=this.boundmatrix[local] || !this.boundingVolume[local]){
		var multimaterials=this.multimaterials;
		var boundingVolume;
		for(var i=0;i<multimaterials.length;i++){
			if(multimaterials[i].lods[0].mesh){
				if(!boundingVolume){
					boundingVolume=multimaterials[i].lods[0].mesh.getBoundingVolume().clone();
				}else{
					boundingVolume.addBoundingVolume(multimaterials[i].lods[0].mesh.getBoundingVolume());
				}
			}
		}
		if(!boundingVolume) boundingVolume=new GLGE.BoundingVolume(0,0,0,0,0,0);

		if(local){
			boundingVolume.applyMatrix(this.getLocalMatrix());
		}else{
			boundingVolume.applyMatrix(this.getModelMatrix());
		}
		this.boundingVolume[local]=boundingVolume;
	}
	this.boundmatrix[local]=matrix;
	return this.boundingVolume[local];
}

/**
* Sets the Z Transparency of this object
* @param {boolean} value Does this object need blending?
*/
GLGE.Object.prototype.setZtransparent=function(value){
	this.zTrans=value;
	return this;
}
/**
* Gets the z transparency
* @returns boolean
*/
GLGE.Object.prototype.isZtransparent=function(){
	return this.zTrans;
}




/**
* Sets the material associated with the object
* @param GLGE.Material
*/
GLGE.Object.prototype.setMaterial=function(material,idx){
	if(typeof material=="string")  material=GLGE.Assets.get(material);
	if(!idx) idx=0;
	if(!this.multimaterials[idx]) this.multimaterials[idx]=new GLGE.MultiMaterial();
	if(this.multimaterials[idx].getMaterial()!=material){
		this.multimaterials[idx].setMaterial(material);
		this.updateProgram();
	}
	return this;
}
/**
* Gets the material associated with the object
* @returns GLGE.Material
*/
GLGE.Object.prototype.getMaterial=function(idx){
	if(!idx) idx=0;
	if(this.multimaterials[idx]) {
		return this.multimaterials[idx].getMaterial();
	}else{
		return false;
	}
}
/**
* Sets the mesh associated with the object
* @param GLGE.Mesh
*/
GLGE.Object.prototype.setMesh=function(mesh,idx){
	if(typeof mesh=="string")  mesh=GLGE.Assets.get(mesh);
	if(!idx) idx=0;
	if(!this.multimaterials[idx]) this.multimaterials.push(new GLGE.MultiMaterial());
	this.multimaterials[idx].setMesh(mesh);
	this.boundingVolume=null;
	return this;
}
/**
* Gets the mesh associated with the object
* @returns GLGE.Mesh
*/
GLGE.Object.prototype.getMesh=function(idx){
	if(!idx) idx=0;
	if(this.multimaterials[idx]) {
		return this.multimaterials[idx].getMesh();
	}else{
		return false;
	}
}
/**
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Object.prototype.GLInit=function(gl){
	this.gl=gl;
}
/**
* Cleans up all the GL stuff we sets
* @private
*/
GLGE.Object.prototype.GLDestory=function(gl){
}
/**
* Updates the GL shader program for the object
* @private
*/
GLGE.Object.prototype.updateProgram=function(){
	for(var i=0; i<this.multimaterials.length;i++){
		this.multimaterials[i].updateProgram();
	}
}
/**
* Adds another material to this object
* @returns GLGE.Material
*/
GLGE.Object.prototype.addMultiMaterial=function(multimaterial){
	if(typeof multimaterial=="string")  multimaterial=GLGE.Assets.get(multimaterial);
	this.multimaterials.push(multimaterial);
	this.boundingVolume=null;
	return this;
}
/**
* gets all of the objects materials and meshes
* @returns array of GLGE.MultiMaterial objects
*/
GLGE.Object.prototype.getMultiMaterials=function(){
	return this.multimaterials;
}
/**
* Creates the shader program for the object
* @private
*/
GLGE.Object.prototype.GLGenerateShader=function(gl){
	//create the programs strings
	//Vertex Shader
	var UV=joints1=joints2=false;
	var lights=gl.lights;
	var vertexStr=[];
	var tangent=false;
	if(!this.mesh.normals) this.mesh.calcNormals();
	for(var i=0;i<this.mesh.buffers.length;i++){
		if(this.mesh.buffers[i].name=="tangent") tangent=true;
		if(this.mesh.buffers[i].size>1){
			vertexStr.push("attribute vec"+this.mesh.buffers[i].size+" "+this.mesh.buffers[i].name+";\n");
		}else{
			vertexStr.push("attribute float "+this.mesh.buffers[i].name+";\n");
		}
		if(this.mesh.buffers[i].name=="UV") UV=true;
		if(this.mesh.buffers[i].name=="joints1") joints1=this.mesh.buffers[i];
		if(this.mesh.buffers[i].name=="joints2") joints2=this.mesh.buffers[i];
	}
	vertexStr.push("uniform mat4 worldView;\n");
	vertexStr.push("uniform mat4 projection;\n");  
	vertexStr.push("uniform mat4 worldInverseTranspose;\n");
	vertexStr.push("uniform mat4 envMat;\n");

	for(var i=0; i<lights.length;i++){
			vertexStr.push("uniform vec3 lightpos"+i+";\n");
			vertexStr.push("uniform vec3 lightdir"+i+";\n");
			vertexStr.push("uniform mat4 lightmat"+i+";\n");
			vertexStr.push("varying vec4 spotcoord"+i+";\n");
	}
	
	vertexStr.push("varying vec3 eyevec;\n"); 
	for(var i=0; i<lights.length;i++){
			vertexStr.push("varying vec3 lightvec"+i+";\n"); 
			vertexStr.push("varying float lightdist"+i+";\n"); 
	}
	
	if(this.mesh.joints && this.mesh.joints.length>0){
		vertexStr.push("uniform vec4 jointMat["+(3*this.mesh.joints.length)+"];\n"); 
	}
	
	if(this.material) vertexStr.push(this.material.getVertexVarying(vertexStr));
    
	vertexStr.push("varying vec3 n;\n");  
	vertexStr.push("varying vec3 t;\n");  
	
	vertexStr.push("varying vec4 UVCoord;\n");
	vertexStr.push("varying vec3 OBJCoord;\n");
	
	vertexStr.push("void main(void)\n");
	vertexStr.push("{\n");
	if(UV) vertexStr.push("UVCoord=UV;\n");
		else vertexStr.push("UVCoord=vec4(0.0,0.0,0.0,0.0);\n");
	vertexStr.push("OBJCoord = position;\n");
	vertexStr.push("vec3 tang;\n");
	vertexStr.push("vec4 pos = vec4(0.0, 0.0, 0.0, 1.0);\n");
	vertexStr.push("vec4 norm = vec4(0.0, 0.0, 0.0, 1.0);\n");
	vertexStr.push("vec4 tang4 = vec4(0.0, 0.0, 0.0, 1.0);\n");
	
	if(joints1){
		if(joints1.size==1){
			vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints1)],vec4(position,1.0)),\n"+
                           "              dot(jointMat[int(3.0*joints1+1.0)],vec4(position,1.0)),\n"+
                           "              dot(jointMat[int(3.0*joints1+2.0)],vec4(position,1.0)),1.0)*weights1;\n");
			vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints1)].xyz,normal),\n"+
                           "               dot(jointMat[int(3.0*joints1+1.0)].xyz,normal),\n"+
                           "               dot(jointMat[int(3.0*joints1+2.0)].xyz,normal),1.0)*weights1;\n");
            if (tangent)
			  vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints1)].xyz,tangent),\n"+
                           "               dot(jointMat[int(3.0*joints1+1.0)].xyz,tangent),\n"+
                           "               dot(jointMat[int(3.0*joints1+2.0)].xyz,tangent),1.0)*weights1;\n");
		}else{
			for(var i=0;i<joints1.size;i++){
			vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints1["+i+"])],vec4(position,1.0)),\n"+
                           "              dot(jointMat[int(3.0*joints1["+i+"]+1.0)],vec4(position,1.0)),\n"+
                           "              dot(jointMat[int(3.0*joints1["+i+"]+2.0)],vec4(position,1.0)),1.0)*weights1["+i+"];\n");
			vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints1["+i+"])].xyz,normal),\n"+
                           "               dot(jointMat[int(3.0*joints1["+i+"]+1.0)].xyz,normal),\n"+
                           "               dot(jointMat[int(3.0*joints1["+i+"]+2.0)].xyz,normal),1.0)*weights1["+i+"];\n");
            if (tangent)
			  vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints1["+i+"])].xyz,tangent),\n"+
                           "               dot(jointMat[int(3.0*joints1["+i+"]+1.0)].xyz,tangent),\n"+
                           "               dot(jointMat[int(3.0*joints1["+i+"]+2.0)].xyz,tangent),1.0)*weights1["+i+"];\n");
			}
		}

		if(joints2){
		    if(joints2.size==1){
			    vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints2)],vec4(position,1.0)),\n"+
                               "              dot(jointMat[int(3.0*joints2+1.0)],vec4(position,1.0)),\n"+
                               "              dot(jointMat[int(3.0*joints2+2.0)],vec4(position,1.0)),1.0)*weights2;\n");
			    vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints2)].xyz,normal),\n"+
                               "               dot(jointMat[int(3.0*joints2+1.0)].xyz,normal),\n"+
                               "               dot(jointMat[int(3.0*joints2+2.0)].xyz,normal),1.0)*weights2;\n");
                if (tangent)
			        vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints2)].xyz,tangent),\n"+
                                   "               dot(jointMat[int(3.0*joints2+1.0)].xyz,tangent),\n"+
                                   "               dot(jointMat[int(3.0*joints2+2.0)].xyz,tangent),1.0)*weights2;\n");
		    }else{
			    for(var i=0;i<joints2.size;i++){
			        vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints2["+i+"])],vec4(position,1.0)),\n"+
                                   "              dot(jointMat[int(3.0*joints2["+i+"]+1.0)],vec4(position,1.0)),\n"+
                                   "              dot(jointMat[int(3.0*joints2["+i+"]+2.0)],vec4(position,1.0)),1.0)*weights2["+i+"];\n");
			        vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints2["+i+"])].xyz,normal),\n"+
                                   "               dot(jointMat[int(3.0*joints2["+i+"]+1.0)].xyz,normal),\n"+
                                   "               dot(jointMat[int(3.0*joints2["+i+"]+2.0)].xyz,normal),1.0)*weights2["+i+"];\n");
            if (tangent)
			    vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints2["+i+"])].xyz,tangent),\n"+
                               "               dot(jointMat[int(3.0*joints2["+i+"]+1.0)].xyz,tangent),\n"+
                               "               dot(jointMat[int(3.0*joints2["+i+"]+2.0)].xyz,tangent),1.0)*weights2["+i+"];\n");
			    }
		    }
		}
		
		for(var i=0; i<lights.length;i++){
			vertexStr.push("spotcoord"+i+"=lightmat"+i+"*vec4(pos.xyz,1.0);\n");
		}
		vertexStr.push("pos = worldView * vec4(pos.xyz, 1.0);\n");
		vertexStr.push("norm = worldInverseTranspose * vec4(norm.xyz, 1.0);\n");
		if(tangent) vertexStr.push("tang = (worldInverseTranspose*vec4(tang4.xyz,1.0)).xyz;\n");
	}else{	
		for(var i=0; i<lights.length;i++){
			vertexStr.push("spotcoord"+i+"=lightmat"+i+"*vec4(position,1.0);\n");
		}
		vertexStr.push("pos = worldView * vec4(position, 1.0);\n");
		vertexStr.push("norm = worldInverseTranspose * vec4(normal, 1.0);\n");  
		if(tangent) vertexStr.push("tang = (worldInverseTranspose*vec4(tangent,1.0)).xyz;\n");
	}
	
    
	vertexStr.push("gl_Position = projection * pos;\n");
	vertexStr.push("gl_PointSize="+(this.pointSize.toFixed(5))+";\n");
	
	vertexStr.push("eyevec = -pos.xyz;\n");
	
	vertexStr.push("t = normalize(tang);");
	vertexStr.push("n = normalize(norm.rgb);");

	
	for(var i=0; i<lights.length;i++){			
			if(lights[i].getType()==GLGE.L_DIR){
				vertexStr.push("lightvec"+i+" = -lightdir"+i+";\n");
			}else{
				vertexStr.push("lightvec"+i+" = -(lightpos"+i+"-pos.xyz);\n");
			}
			
			vertexStr.push("lightdist"+i+" = length(lightpos"+i+".xyz-pos.xyz);\n");
	}
	if(this.material) vertexStr.push(this.material.getLayerCoords(vertexStr));
	vertexStr.push("}\n");
	
	vertexStr=vertexStr.join("");
	//Fragment Shader
	if(!this.material){
		var fragStr=[];
		fragStr.push("void main(void)\n");
		fragStr.push("{\n");
		fragStr.push("gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n");
		fragStr.push("}\n");
		fragStr=fragStr.join("");
	}
	else
	{
		fragStr=this.material.getFragmentShader(lights);
	}
	
	this.GLFragmentShaderNormal=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,this.nfragStr);
	this.GLFragmentShaderShadow=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,this.shfragStr);
	this.GLFragmentShaderPick=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,this.pkfragStr);
	this.GLFragmentShader=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,fragStr);
	this.GLVertexShader=GLGE.getGLShader(gl,gl.VERTEX_SHADER,vertexStr);

	this.GLShaderProgramPick=GLGE.getGLProgram(gl,this.GLVertexShader,this.GLFragmentShaderPick);
	this.GLShaderProgramShadow=GLGE.getGLProgram(gl,this.GLVertexShader,this.GLFragmentShaderShadow);
	this.GLShaderProgramNormal=GLGE.getGLProgram(gl,this.GLVertexShader,this.GLFragmentShaderNormal);
	this.GLShaderProgram=GLGE.getGLProgram(gl,this.GLVertexShader,this.GLFragmentShader);
}
/**
* creates shader programs;
* @param multimaterial the multimaterial object to create the shader programs for
* @private
*/
GLGE.Object.prototype.createShaders=function(multimaterial){
	if(this.gl){
		this.mesh=multimaterial.mesh;
		this.material=multimaterial.material;
		this.GLGenerateShader(this.gl);
		multimaterial.GLShaderProgramPick=this.GLShaderProgramPick;
		multimaterial.GLShaderProgramShadow=this.GLShaderProgramShadow;
		multimaterial.GLShaderProgram=this.GLShaderProgram;
	}
}

/**
* Sets the shader program uniforms ready for rendering
* @private
*/
GLGE.Object.prototype.GLUniforms=function(gl,renderType,pickindex){
	var program;
	switch(renderType){
		case GLGE.RENDER_DEFAULT:
			program=this.GLShaderProgram;
			break;
		case GLGE.RENDER_SHADOW:
			program=this.GLShaderProgramShadow;
			break;
		case GLGE.RENDER_NORMAL:
			program=this.GLShaderProgramNormal;
			break;
		case GLGE.RENDER_PICK:
			program=this.GLShaderProgramPick;
			var b = pickindex >> 16 & 0xFF; 
			var g = pickindex >> 8 & 0xFF; 
			var r = pickindex & 0xFF;
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "pickcolor"), r/255,g/255,b/255);
			break;
	}
	
	if(!program.caches) program.caches={};
	if(!program.glarrays) program.glarrays={};
	var pc=program.caches;
	var pgl=program.glarrays;
	var scene=gl.scene;
	var camera=scene.camera;

	if(pc.far!=camera.far){
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "far"), camera.far);
		pc.far=camera.far;
	}
	if(renderType==GLGE.RENDER_DEFAULT){
		if(pc.ambientColor!=scene.ambientColor){
			var ambientColor=scene.ambientColor;
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "amb"), ambientColor.r,ambientColor.g,ambientColor.b);
			pc.ambientColor=ambientColor;
		}
		if(pc.fogFar!=scene.fogFar){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,program, "fogfar"), scene.fogFar);
			pc.fogFar=scene.fogFar;
		}
		if(pc.fogNear!=scene.fogNear){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,program, "fognear"), scene.fogNear);
			pc.fogNear=scene.fogNear;
		}
		if(pc.fogType!=scene.fogType){
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "fogtype"), scene.fogType);
			pc.fogType=scene.fogType;
		}
		if(pc.fogType!=scene.fogcolor){
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "fogcolor"), scene.fogColor.r,scene.fogColor.g,scene.fogColor.b);
			pc.fogcolor=scene.fogcolor;
		}
	}

			
	
	var cameraMatrix=camera.getViewMatrix();
	var modelMatrix=this.getModelMatrix();
	
	if(!pc.mvMatrix) pc.mvMatrix={cameraMatrix:null,modelMatrix:null};
	var mvCache=pc.mvMatrix;
	
	if(mvCache.camerMatrix!=cameraMatrix || mvCache.modelMatrix!=modelMatrix){
		//generate and set the modelView matrix
		if(!this.caches.mvMatrix) this.caches.mvMatrix=GLGE.mulMat4(cameraMatrix,modelMatrix);
		mvMatrix=this.caches.mvMatrix;
		
		if(this.mesh.joints){
		mvMatrix=cameraMatrix;
		}
	
		var mvUniform = GLGE.getUniformLocation(gl,program, "worldView");
		if(!pgl.mvMatrix){
			pgl.mvMatrixT=new Float32Array(GLGE.transposeMat4(mvMatrix));
		}else{
			GLGE.mat4gl(GLGE.transposeMat4(mvMatrix),pgl.mvMatrixT);
		}
		pgl.mvMatrix=mvMatrix;
		GLGE.setUniformMatrix(gl,"Matrix4fv",mvUniform, false, program.glarrays.mvMatrixT);
	    
		//invCamera matrix
		var icUniform = GLGE.getUniformLocation(gl,program, "envMat");
		if(icUniform){
			if(!this.caches.envMat){
				var envMat = GLGE.inverseMat4(mvMatrix);
				envMat[3]=0;
				envMat[7]=0;
				envMat[11]=0;
				this.caches.envMat = envMat;
			}
			envMat=this.caches.envMat;
			
			if(!program.glarrays.envMat){
				pgl.envMatT=new Float32Array(GLGE.transposeMat4(envMat));
			}else{
				GLGE.mat4gl(GLGE.transposeMat4(envMat),pgl.envMatT);	
			}
			pgl.envMat=envMat;
				
			GLGE.setUniformMatrix(gl,"Matrix4fv",icUniform, false, pgl.envMatT);
		}
		//normalising matrix
		if(!this.caches.normalMatrix){
			var normalMatrix = GLGE.inverseMat4(mvMatrix);
			this.caches.normalMatrix = normalMatrix;
		}
		normalMatrix=this.caches.normalMatrix;
		var nUniform = GLGE.getUniformLocation(gl,program, "worldInverseTranspose");
		
		if(!pgl.normalMatrix) pgl.normalMatrix=new Float32Array(normalMatrix);
			else GLGE.mat4gl(normalMatrix,pgl.normalMatrix);	
		GLGE.setUniformMatrix(gl,"Matrix4fv",nUniform, false, pgl.normalMatrix);
		
		var cUniform = GLGE.getUniformLocation(gl,program, "view");
		if(!pgl.cameraMatrix){
			pgl.cameraMatrixT=new Float32Array(GLGE.transposeMat4(cameraMatrix));
		}else{
			GLGE.mat4gl(GLGE.transposeMat4(cameraMatrix),pgl.cameraMatrixT);	
		}
		pgl.cameraMatrix=cameraMatrix;
			
		GLGE.setUniformMatrix(gl,"Matrix4fv",cUniform, false, pgl.cameraMatrixT);
		
		mvCache.camerMatrix=cameraMatrix;
		mvCache.modelMatrix=modelMatrix;
	}


	var pUniform = GLGE.getUniformLocation(gl,program, "projection");
	if(!pgl.pMatrix){
		pgl.pMatrixT=new Float32Array(GLGE.transposeMat4(camera.getProjectionMatrix()));
	}else{
		GLGE.mat4gl(GLGE.transposeMat4(camera.getProjectionMatrix()),pgl.pMatrixT);	
	}
	pgl.pMatrix=camera.getProjectionMatrix();
			
	GLGE.setUniformMatrix(gl,"Matrix4fv",pUniform, false, pgl.pMatrixT);

	
	//light
	//dont' need lighting for picking
	if(renderType==GLGE.RENDER_DEFAULT || renderType==GLGE.RENDER_SHADOW){
		var pos,lpos;
		var lights=gl.lights
		if(!pc.lights) pc.lights=[];
		if(!pgl.lights) pgl.lights=[];
		if(!this.caches.lights) this.caches.lights=[];
		var lightCache=pc.lights;
		for(var i=0; i<lights.length;i++){
			if(!lightCache[i]) lightCache[i]={modelMatrix:null,cameraMatrix:null};
			if(lightCache[i].modelMatrix!=modelMatrix || lightCache[i].cameraMatrix!=cameraMatrix){
				if(!this.caches.lights[i])this.caches.lights[i]={};
				
				if(!this.caches.lights[i].pos) this.caches.lights[i].pos=GLGE.mulMat4Vec4(GLGE.mulMat4(cameraMatrix,lights[i].getModelMatrix()),[0,0,0,1]);
				pos=this.caches.lights[i].pos;
				GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "lightpos"+i), pos[0],pos[1],pos[2]);		
				
				
				if(!this.caches.lights[i].lpos) this.caches.lights[i].lpos=GLGE.mulMat4Vec4(GLGE.mulMat4(cameraMatrix,lights[i].getModelMatrix()),[0,0,1,1]);
				lpos=this.caches.lights[i].lpos;
				GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "lightdir"+i),lpos[0]-pos[0],lpos[1]-pos[1],lpos[2]-pos[2]);
				
				if(lights[i].s_cache){
					var lightmat=GLGE.mulMat4(lights[i].s_cache.smatrix,modelMatrix);
					if(!pgl.lights[i]) pgl.lights[i]=new Float32Array(lightmat);
						else GLGE.mat4gl(lightmat,pgl.lights[i]);
					GLGE.setUniformMatrix(gl,"Matrix4fv",GLGE.getUniformLocation(gl,program, "lightmat"+i), true,pgl.lights[i]);
					lightCache[i].modelMatrix=modelMatrix;
					lightCache[i].cameraMatrix=cameraMatrix;
				}else{
					lightCache[i].modelMatrix=modelMatrix;
					lightCache[i].cameraMatrix=cameraMatrix;
				}
			}
		}
	}
	
	if(this.mesh.joints){
		if(!pc.joints) pc.joints=[];
		if(!pgl.joints) pgl.joints=[];
		if(!pgl.jointsT) pgl.jointsT=[];
		if(!pgl.jointsinv) pgl.jointsinv=[];
        if ((!pgl.jointsCombined)||pgl.jointsCombined.length!=this.mesh.joints.length*12) 
            pgl.jointsCombined = new Float32Array(this.mesh.joints.length*12);
		var jointCache=pc.joints;
		var ident=GLGE.identMatrix();
		for(i=0;i<this.mesh.joints.length;i++){
			if(!jointCache[i]) jointCache[i]={modelMatrix:null,invBind:null};
			if(typeof this.mesh.joints[i]=="string"){
				if(!this.bones) this.bones=this.skeleton.getNames();
				if(this.bones){
					var modelMatrix=this.bones[this.mesh.joints[i]].getModelMatrix();
				}
			}else{
				var modelMatrix=this.mesh.joints[i].getModelMatrix();
			}
			var invBind=this.mesh.invBind[i];
			if(jointCache[i].modelMatrix!=modelMatrix || jointCache[i].invBind!=invBind){
				var jointmat=GLGE.mulMat4(modelMatrix,invBind);
				if(!pgl.joints[i]){
					pgl.jointsT[i]=new Float32Array(GLGE.transposeMat4(jointmat));
				}else{
					GLGE.mat4gl(GLGE.transposeMat4(jointmat),pgl.jointsT[i]);	
				}
				pgl.joints[i]=jointmat;
				
				if(!pgl.jointsinv[i]) pgl.jointsinv[i]=new Float32Array(GLGE.inverseMat4(jointmat));
				else GLGE.mat4gl(GLGE.inverseMat4(jointmat),pgl.jointsinv[i]);		
				var mat=pgl.jointsT[i];
                var combinedMat=pgl.jointsCombined;
                combinedMat[i*12]=mat[0];
                combinedMat[i*12+1]=mat[4];
                combinedMat[i*12+2]=mat[8];
                combinedMat[i*12+3]=mat[12];

                combinedMat[i*12+4]=mat[1];
                combinedMat[i*12+5]=mat[5];
                combinedMat[i*12+6]=mat[9];
                combinedMat[i*12+7]=mat[13];

                combinedMat[i*12+8]=mat[2];
                combinedMat[i*12+9]=mat[6];
                combinedMat[i*12+10]=mat[10];
                combinedMat[i*12+11]=mat[14];
                
				//GLGE.setUniform4(gl,"4f",GLGE.getUniformLocation(gl,program, "jointMat["+(i*3)+"]"), mat[0],mat[4],mat[8],mat[12]);
				//GLGE.setUniform4(gl,"4f",GLGE.getUniformLocation(gl,program, "jointMat["+(i*3+1)+"]"), mat[1],mat[5],mat[9],mat[13]);
				//GLGE.setUniform4(gl,"4f",GLGE.getUniformLocation(gl,program, "jointMat["+(i*3+2)+"]"), mat[2],mat[6],mat[10],mat[14]);
				jointCache[i].modelMatrix=modelMatrix;
				jointCache[i].invBind=invBind;
			}
		}
        gl.uniform4fv(GLGE.getUniformLocation(gl,program, "jointMat"),pgl.jointsCombined);
	}

    
	if(this.material && renderType==GLGE.RENDER_DEFAULT && gl.scene.lastMaterial!=this.material){
		this.material.textureUniforms(gl,program,lights,this);
		gl.scene.lastMaterial=this.material;
	}
}
/**
* Renders the object to the screen
* @private
*/
GLGE.Object.prototype.GLRender=function(gl,renderType,pickindex,multiMaterial,distance){
	if(!gl) return;
	if(!this.gl) this.GLInit(gl);
	
	//if look at is set then look
	if(this.lookAt) this.Lookat(this.lookAt);
 
	//animate this object
	if(renderType==GLGE.RENDER_DEFAULT){
		if(this.animation) this.animate();
	}
	
	if(!this.renderCaches[renderType]) this.renderCaches[renderType]={};
	
	var cameraMatrix=gl.scene.camera.getViewMatrix();
	var modelMatrix=this.getModelMatrix();
	
	if(this.renderCaches[renderType].camerMatrix!=cameraMatrix || this.renderCaches[renderType].modelMatrix!=modelMatrix){
		this.renderCaches[renderType]={};
		this.renderCaches[renderType].camerMatrix=cameraMatrix;
		this.renderCaches[renderType].modelMatrix=modelMatrix;
	}
	
	this.caches=this.renderCaches[renderType];
	
	
	

	var pixelsize;
	
	if(multiMaterial==undefined){
		var start=0;
		var end=this.multimaterials.length;
	}else{
		var start=multiMaterial;
		var end=multiMaterial+1;
	}

	for(var i=start; i<end;i++){
		if(this.multimaterials[i].lods.length>1 && !pixelsize){
			var camerapos=gl.scene.camera.getPosition();
			var modelpos=this.getPosition();
			var dist=GLGE.lengthVec3([camerapos.x-modelpos.x,camerapos.y-modelpos.y,camerapos.z-modelpos.z]);
			dist=GLGE.mulMat4Vec4(gl.scene.camera.getProjectionMatrix(),[this.getBoundingVolume().getSphereRadius(),0,-dist,1]);
			pixelsize=dist[0]/dist[3]*gl.scene.renderer.canvas.width;
		}
	
		var lod=this.multimaterials[i].getLOD(pixelsize);

		if(lod.mesh && lod.mesh.loaded){
			if(renderType==GLGE.RENDER_NULL){
				if(lod.material) lod.material.registerPasses(gl,this);
				break;
			}
			if(!lod.GLShaderProgram){
				this.createShaders(lod);
			}else{
				this.GLShaderProgramPick=lod.GLShaderProgramPick;
				this.GLShaderProgramShadow=lod.GLShaderProgramShadow;
				this.GLShaderProgram=lod.GLShaderProgram;
			}
			this.mesh=lod.mesh;
			this.material=lod.material;
			
			var drawType;
			switch(this.drawType){
				case GLGE.DRAW_LINES:
					drawType=gl.LINES;
					break;
				case GLGE.DRAW_POINTS:
					drawType=gl.POINTS;
					break;
				case GLGE.DRAW_LINELOOPS:
					drawType=gl.LINE_LOOP;
					break;
				case GLGE.DRAW_LINESTRIPS:
					drawType=gl.LINE_STRIP;
					break;
				default:
					drawType=gl.TRIANGLES;
					break;
			}

			switch(renderType){
				case  GLGE.RENDER_DEFAULT:
					if(gl.program!=this.GLShaderProgram){
						gl.useProgram(this.GLShaderProgram);
						gl.program=this.GLShaderProgram;
					}
					this.mesh.GLAttributes(gl,this.GLShaderProgram);
					break;
				case  GLGE.RENDER_SHADOW:
					if(gl.program!=this.GLShaderProgramShadow){
						gl.useProgram(this.GLShaderProgramShadow);
						gl.program=this.GLShaderProgramShadow;
					}
					GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,this.GLShaderProgramShadow, "distance"), distance);
					this.mesh.GLAttributes(gl,this.GLShaderProgramShadow);
					break;
				case  GLGE.RENDER_NORMAL:
					if(gl.program!=this.GLShaderProgramNormal){
						gl.useProgram(this.GLShaderProgramNormal);
						gl.program=this.GLShaderProgramNormal;
					}
					this.mesh.GLAttributes(gl,this.GLShaderProgramNormal);
					break;
				case  GLGE.RENDER_PICK:
					if(gl.program!=this.GLShaderProgramPick){
						gl.useProgram(this.GLShaderProgramPick);
						gl.program=this.GLShaderProgramPick;
					}
					this.mesh.GLAttributes(gl,this.GLShaderProgramPick);
					drawType=gl.TRIANGLES;
					break;
			}
			//render the object
			this.GLUniforms(gl,renderType,pickindex);
			switch (this.mesh.windingOrder) {
				case GLGE.Mesh.WINDING_ORDER_UNKNOWN:
					gl.disable(gl.CULL_FACE);
					break;
				case GLGE.Mesh.WINDING_ORDER_COUNTER:
					gl.cullFace(gl.FRONT);
				default:
					break;
			}
			if(this.mesh.GLfaces){
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.GLfaces);
				gl.drawElements(drawType, this.mesh.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
			}else{
				gl.drawArrays(drawType, 0, this.mesh.positions.length/3);
			}
			switch (this.mesh.windingOrder) {
				case GLGE.Mesh.WINDING_ORDER_UNKNOWN:
					if (gl.scene.renderer.cullFaces)
						gl.enable(gl.CULL_FACE);    
					break;
				case GLGE.Mesh.WINDING_ORDER_COUNTER:
					gl.cullFace(gl.BACK);
				default:
					break;
			}
			var matrix=this.matrix;
			var caches=this.caches;
			

			this.matrix=matrix;
			this.caches=caches;
		}
	}
}

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class Text that can be rendered in a scene
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Text=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.canvas=document.createElement("canvas");
	this.color={r:1.0,g:1.0,b:1.0};
}
GLGE.augment(GLGE.Placeable,GLGE.Text);
GLGE.augment(GLGE.Animatable,GLGE.Text);
GLGE.augment(GLGE.QuickNotation,GLGE.Text);
GLGE.augment(GLGE.JSONLoader,GLGE.Text);
GLGE.Text.prototype.className="Text";
GLGE.Text.prototype.zTrans=true;
GLGE.Text.prototype.canvas=null;
GLGE.Text.prototype.aspect=1.0;
GLGE.Text.prototype.color=null;
GLGE.Text.prototype.text="";
GLGE.Text.prototype.font="Times";
GLGE.Text.prototype.size=100;
GLGE.Text.prototype.pickType=GLGE.TEXT_TEXTPICK;

/**
* Gets the pick type for this text
* @returns {string} the pick type
*/
GLGE.Text.prototype.getPickType=function(){
	return this.pickType;
};
/**
* Sets the pick type GLGE.TEXT_BOXPICK for picking based on bound box or GLGE.TEXT_TEXTPICK for pixel perfect text picking
* @param {Number} value the picking type
*/
GLGE.Text.prototype.setPickType=function(value){
	this.pickType=value;
	return this;
};
/**
* Gets the font of the text
* @returns {string} the font of the text
*/
GLGE.Text.prototype.getFont=function(){
	return this.size;
};
/**
* Sets the font of the text
* @param {Number} value the font of the text
*/
GLGE.Text.prototype.setFont=function(value){
	this.font=value;
	if(this.gl) this.updateCanvas(this.gl);
	return this;
};
/**
* Gets the size of the text
* @returns {string} the size of the text
*/
GLGE.Text.prototype.getSize=function(){
	return this.size;
};
/**
* Sets the size of the text
* @param {Number} value the size of the text
*/
GLGE.Text.prototype.setSize=function(value){
	this.size=value;
	if(this.gl) this.updateCanvas(this.gl);
	return this;
};
/**
* Gets the rendered text
* @returns {string} the text rendered
*/
GLGE.Text.prototype.getText=function(){
	return this.text;
};
/**
* Sets the text to be rendered
* @param {Number} value the text to render
*/
GLGE.Text.prototype.setText=function(value){
	this.text=value;
	if(this.gl) this.updateCanvas(this.gl);
	return this;
};
/**
* Sets the base colour of the text
* @param {string} color The colour of the material
*/
GLGE.Text.prototype.setColor=function(color){
	color=GLGE.colorParse(color);
	this.color={r:color.r,g:color.g,b:color.b};
	return this;
};
/**
* Sets the red base colour of the text
* @param {Number} r The new red level 0-1
*/
GLGE.Text.prototype.setColorR=function(value){
	this.color.r=value;
	return this;
};
/**
* Sets the green base colour of the text
* @param {Number} g The new green level 0-1
*/
GLGE.Text.prototype.setColorG=function(value){
	this.color.g=value;
	return this;
};
/**
* Sets the blue base colour of the text
* @param {Number} b The new blue level 0-1
*/
GLGE.Text.prototype.setColorB=function(value){
	this.color.b=value;
	return this;
};
/**
* Gets the current base color of the text
* @return {[r,g,b]} The current base color
*/
GLGE.Text.prototype.getColor=function(){
	return this.color;
	return this;
};

/**
* Sets the Z Transparency of this text
* @param {boolean} value Does this object need blending?
*/
GLGE.Text.prototype.setZtransparent=function(value){
	this.zTrans=value;
	return this;
}
/**
* Gets the z transparency
* @returns boolean
*/
GLGE.Text.prototype.isZtransparent=function(){
	return this.zTrans;
}
/**
* Creates the shader program for the object
* @private
*/
GLGE.Text.prototype.GLGenerateShader=function(gl){
	if(this.GLShaderProgram) gl.deleteProgram(this.GLShaderProgram);

	//Vertex Shader
	var vertexStr="";
	vertexStr+="attribute vec3 position;\n";
	vertexStr+="attribute vec2 uvcoord;\n";
	vertexStr+="varying vec2 texcoord;\n";
	vertexStr+="uniform mat4 Matrix;\n";
	vertexStr+="uniform mat4 PMatrix;\n";
	vertexStr+="varying vec4 pos;\n";
	
	vertexStr+="void main(void){\n";
	vertexStr+="texcoord=uvcoord;\n";    
	vertexStr+="pos = Matrix * vec4(position,1.0);\n";
	vertexStr+="gl_Position = PMatrix * pos;\n";
	vertexStr+="}\n";
	
	//Fragment Shader
	var fragStr="#ifdef GL_ES\nprecision highp float;\n#endif\n";
	fragStr=fragStr+"uniform sampler2D TEXTURE;\n";
	fragStr=fragStr+"varying vec2 texcoord;\n";
	fragStr=fragStr+"varying vec4 pos;\n";
	fragStr=fragStr+"uniform float far;\n";
	fragStr=fragStr+"uniform int picktype;\n";
	fragStr=fragStr+"uniform vec3 pickcolor;\n";
	fragStr=fragStr+"uniform vec3 color;\n";
	fragStr=fragStr+"void main(void){\n";
	fragStr=fragStr+"float alpha=texture2D(TEXTURE,texcoord).a;\n";
	fragStr=fragStr+"if(picktype=="+GLGE.TEXT_BOXPICK+"){gl_FragColor = vec4(pickcolor,1.0);}"
	fragStr=fragStr+"else if(picktype=="+GLGE.TEXT_TEXTPICK+"){gl_FragColor = vec4(pickcolor,alpha);}"
	fragStr=fragStr+"else{gl_FragColor = vec4(color.rgb*alpha,alpha);};\n";
	fragStr=fragStr+"}\n";
	
	this.GLFragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
	this.GLVertexShader=gl.createShader(gl.VERTEX_SHADER);


	gl.shaderSource(this.GLFragmentShader, fragStr);
	gl.compileShader(this.GLFragmentShader);
	if (!gl.getShaderParameter(this.GLFragmentShader, gl.COMPILE_STATUS)) {
	      GLGE.error(gl.getShaderInfoLog(this.GLFragmentShader));
	      return;
	}
	
	//set and compile the vertex shader
	//need to set str
	gl.shaderSource(this.GLVertexShader, vertexStr);
	gl.compileShader(this.GLVertexShader);
	if (!gl.getShaderParameter(this.GLVertexShader, gl.COMPILE_STATUS)) {
		GLGE.error(gl.getShaderInfoLog(this.GLVertexShader));
		return;
	}
	
	this.GLShaderProgram = gl.createProgram();
	gl.attachShader(this.GLShaderProgram, this.GLVertexShader);
	gl.attachShader(this.GLShaderProgram, this.GLFragmentShader);
	gl.linkProgram(this.GLShaderProgram);	
}
/**
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Text.prototype.GLInit=function(gl){
	this.gl=gl;
	this.createPlane(gl);
	this.GLGenerateShader(gl);
	
	this.glTexture=gl.createTexture();
	this.updateCanvas(gl);
}
/**
* Updates the canvas texture
* @private
*/
GLGE.Text.prototype.updateCanvas=function(gl){
	var canvas = this.canvas;
	canvas.width=1;
	canvas.height=this.size*1.2;
	var ctx = canvas.getContext("2d");
	ctx.font = this.size+"px "+this.font;
	canvas.width=ctx.measureText(this.text).width;
	canvas.height=this.size*1.2;
	 ctx = canvas.getContext("2d");
	ctx.textBaseline="top";
	ctx.font = this.size+"px "+this.font;
	this.aspect=canvas.width/canvas.height;
	ctx.fillText(this.text, 0, 0);   
	
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	//TODO: fix this when minefield is upto spec
	try{gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.bindTexture(gl.TEXTURE_2D, null);
}

/**
* Renders the text to the render buffer
* @private
*/
GLGE.Text.prototype.GLRender=function(gl,renderType,pickindex){
	if(!this.gl){
		this.GLInit(gl);
	}
	if(renderType==GLGE.RENDER_DEFAULT || renderType==GLGE.RENDER_PICK){	
		//if look at is set then look
		if(this.lookAt) this.Lookat(this.lookAt);
		
		if(gl.program!=this.GLShaderProgram){
			gl.useProgram(this.GLShaderProgram);
			gl.program=this.GLShaderProgram;
		}
					
		var attribslot;
		//disable all the attribute initially arrays - do I really need this?
		for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
		attribslot=GLGE.getAttribLocation(gl,this.GLShaderProgram, "position");

		gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
		gl.enableVertexAttribArray(attribslot);
		gl.vertexAttribPointer(attribslot, this.posBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		attribslot=GLGE.getAttribLocation(gl,this.GLShaderProgram, "uvcoord");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
		gl.enableVertexAttribArray(attribslot);
		gl.vertexAttribPointer(attribslot, this.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		gl.activeTexture(gl["TEXTURE0"]);
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "TEXTURE"),0);
		
		if(!pickindex) pickindex=0;
		var b = pickindex >> 16 & 0xFF; 
		var g = pickindex >> 8 & 0xFF; 
		var r = pickindex & 0xFF;
		GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,this.GLShaderProgram, "pickcolor"),r/255,g/255,b/255);
		
		if(renderType==GLGE.RENDER_PICK){
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "picktype"), this.pickType);	
		}else{
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "picktype"), 0);	
		}
		
		if(!this.GLShaderProgram.glarrays) this.GLShaderProgram.glarrays={};

		
		//generate and set the modelView matrix
		var scalefactor=this.size/100;
		var mMatrix=GLGE.mulMat4(gl.scene.camera.getViewMatrix(),GLGE.mulMat4(this.getModelMatrix(),GLGE.scaleMatrix(this.aspect*scalefactor,scalefactor,scalefactor)));
		var mUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "Matrix");
		if(!this.GLShaderProgram.glarrays.mMatrix) this.GLShaderProgram.glarrays.mMatrix=new Float32Array(mMatrix);
			else GLGE.mat4gl(mMatrix,this.GLShaderProgram.glarrays.mMatrix);
		GLGE.setUniformMatrix(gl,"Matrix4fv",mUniform, true, this.GLShaderProgram.glarrays.mMatrix);
		
		var mUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "PMatrix");

		if(!this.GLShaderProgram.glarrays.pMatrix) this.GLShaderProgram.glarrays.pMatrix=new Float32Array(gl.scene.camera.getProjectionMatrix());
			else GLGE.mat4gl(gl.scene.camera.getProjectionMatrix(),this.GLShaderProgram.glarrays.pMatrix);
		GLGE.setUniformMatrix(gl,"Matrix4fv",mUniform, true, this.GLShaderProgram.glarrays.pMatrix);

		
		var farUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "far");
		GLGE.setUniform(gl,"1f",farUniform, gl.scene.camera.getFar());
		//set the color
		GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,this.GLShaderProgram, "color"), this.color.r,this.color.g,this.color.b);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
		gl.drawElements(gl.TRIANGLES, this.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
		gl.scene.lastMaterial=null;
	}
}
/**
* creates the plane mesh to draw
* @private
*/
GLGE.Text.prototype.createPlane=function(gl){
	//create the vertex positions
	if(!this.posBuffer) this.posBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1,1,0,-1,1,0,-1,-1,0,1,-1,0]), gl.STATIC_DRAW);
	this.posBuffer.itemSize = 3;
	this.posBuffer.numItems = 4;
	//create the vertex uv coords
	if(!this.uvBuffer) this.uvBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0,1,0,1,1,0,1]), gl.STATIC_DRAW);
	this.uvBuffer.itemSize = 2;
	this.uvBuffer.numItems = 4;
	//create the faces
	if(!this.GLfaces) this.GLfaces = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,2,3,0]), gl.STATIC_DRAW);
	this.GLfaces.itemSize = 1;
	this.GLfaces.numItems = 6;
}


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class Sets the scene to render
* @param {object} canvas The canvas element to render to
* @augments GLGE.QuickNotation
*/
GLGE.Renderer=function(canvas,error){
	this.viewport=[];
	this.canvas=canvas;
	try {
		this.gl = canvas.getContext("experimental-webgl",{alpha:true,depth:true,stencil:true,antialias:true,premultipliedAlpha:true});
	} catch(e) {}
	if(!this.gl) {
        console.log("GLGE err:", typeof(globalNoWebGLError)=="undefined")
		if( (!error) && (typeof(globalNoWebGLError)=="undefined")){
			var div=document.createElement("div");
			div.setAttribute("style","position: absolute; top: 10px; left: 10px; font-family: sans-serif; font-size: 14px; padding: 10px;background-color: #fcffcb;color: #800; width: 200px; border:2px solid #f00");
			div.innerHTML="Cannot detect webgl please download a compatible browser";
			document.getElementsByTagName("body")[0].appendChild(div);
			throw "cannot create webgl context";
		}else{
			error();
			throw "cannot create webgl context";
		}
	}
	//firefox is doing something here?
	try{
	this.gl.canvas=canvas;
	}catch(e){};
	//this.gl = WebGLDebugUtils.makeDebugContext(this.gl);
	//this.gl.setTracing(true);

	//chome compatibility
	//TODO: Remove this when chome is right
	if (!this.gl.getProgramParameter)
	{
		this.gl.getProgramParameter = this.gl.getProgrami
	}
	if (!this.gl.getShaderParameter)
	{
		this.gl.getShaderParameter = this.gl.getShaderi
	}
	// End of Chrome compatibility code
	
	this.gl.uniformMatrix4fvX=this.gl.uniformMatrix4fv
	this.gl.uniformMatrix4fv=function(uniform,transpose,array){
		if(!transpose){
			this.uniformMatrix4fvX(uniform,false,array);
		}else{
			GLGE.mat4gl(GLGE.transposeMat4(array),array);
			this.uniformMatrix4fvX(uniform,false,array);
		}
	}
	var gl=this.gl;
	
	/*this.gl.texImage2Dx=this.gl.texImage2D;
	this.gl.texImage2D=function(){
		if(arguments.length==9){
			gl.texImage2Dx(arguments[0], arguments[1], arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8]);
		}else{
			gl.texImage2Dx(arguments[0], arguments[1], arguments[5],false,false);
		}
	}*/

	
	//set up defaults
	this.gl.clearDepth(1.0);
	this.gl.clearStencil(0);
	this.gl.enable(this.gl.DEPTH_TEST);
    
    
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ZERO,this.gl.ONE);	
};
GLGE.augment(GLGE.QuickNotation,GLGE.Renderer);
GLGE.Renderer.prototype.gl=null;
GLGE.Renderer.prototype.scene=null;
GLGE.C_STENCIL=1;
GLGE.C_DEPTH=2;
GLGE.C_COLOR=4;
GLGE.C_ALL=7;

GLGE.Renderer.prototype.clearType=GLGE.C_ALL;

/**
* Sets the width of the viewport to render
* @param width the width of the viewport to render
*/
GLGE.Renderer.prototype.setViewportWidth=function(width){
	this.viewport[0]=width;
	return this;
};
/**
* Sets the height of the viewport to render
* @param height the height of the viewport to render
*/
GLGE.Renderer.prototype.setViewportHeight=function(height){
	this.viewport[1]=height;
	return this;
};
/**
* Sets the left offset of the viewport to render
* @param left the left offset of the viewport to render
*/
GLGE.Renderer.prototype.setViewportOffsetX=function(left){
	this.viewport[2]=left;
	return this;
};
/**
* Sets the top offset of the viewport to render
* @param top the top offset of the viewport to render
*/
GLGE.Renderer.prototype.setViewportOffsetY=function(top){
	this.viewport[3]=top;
	return this;
};
/**
* Clears all viewport data and defaults back to canvas size
*/
GLGE.Renderer.prototype.clearViewport=function(){
	this.viewport=[];
};
/**
* Gets the width of the viewport to render
* @returns the viewport width
*/
GLGE.Renderer.prototype.getViewportWidth=function(){
	if(this.viewport.length>0){
		return this.viewport[0];
	}else{
		return this.canvas.width;
	}
};
/**
* Gets the height of the viewport to render
* @returns the viewport height
*/
GLGE.Renderer.prototype.getViewportHeight=function(){
	if(this.viewport.length>0){
		return this.viewport[1];
	}else{
		return this.canvas.height;
	}
};
/**
* Gets the left offset of the viewport to render
* @returns the left viewport offset
*/
GLGE.Renderer.prototype.getViewportOffsetX=function(){
	if(this.viewport.length>0){
		return this.viewport[2];
	}else{
		return 0;
	}
};
/**
* Gets the top offset of the viewport to render
* @returns the top viewport offset
*/
GLGE.Renderer.prototype.getViewportOffsetY=function(){
	if(this.viewport.length>0){
		return this.viewport[3];
	}else{
		return 0;
	}
};

/**
* Sets the clear type for rendering GLGE.C_ALL, GLGE.C_STENCIL, GLGE.C_DEPTH, GLGE.C_COLOR
* @param type how to clear the viewport for the next render
*/
GLGE.Renderer.prototype.setClearType=function(type){
	this.clearType=type;
	return this;
};
/**
* Gets the clear type for rendering GLGE.C_ALL, GLGE.C_STENCIL, GLGE.C_DEPTH, GLGE.C_COLOR
* @returns how to clear the viewport for the next render
*/
GLGE.Renderer.prototype.getClearType=function(){
	return this.clearType;
};
/**
* Clears the viewport
* @private
*/
GLGE.Renderer.prototype.GLClear=function(){
	var gl=this.gl;
	var clearType=this.clearType;
	var clear=0;
	if(clearType & GLGE.C_COLOR ==  GLGE.C_COLOR){
		clear=clear | gl.COLOR_BUFFER_BIT;
	}
	if(clearType & GLGE.C_DEPTH == GLGE.C_DEPTH){
		clear=clear | gl.DEPTH_BUFFER_BIT;
	}
	if(clearType & GLGE.C_STENCIL == GLGE.C_STENCIL){
		clear=clear | gl.STENCIL_BUFFER_BIT;
	}
	gl.clear(clear);
};
/**
* Gets the scene which is set to be rendered
* @returns the current render scene
*/
GLGE.Renderer.prototype.getScene=function(){
	return this.scene;
};
/**
* Sets the scene to render
* @param {GLGE.Scene} scene The scene to be rendered
*/
GLGE.Renderer.prototype.setScene=function(scene){
	scene.renderer=this;
	this.scene=scene;
	scene.GLInit(this.gl);
	this.render();
	scene.camera.matrix=null; //reset camera matrix to force cache update
	return this;
};
/**
* Renders the current scene to the canvas
*/
GLGE.Renderer.prototype.render=function(){
	if(this.cullFaces) this.gl.enable(this.gl.CULL_FACE);
	if (this.scene)
	this.scene.render(this.gl);
	//if this is the first ever pass then render twice to fill shadow buffers
	if(!this.rendered&&this.scene){
		this.scene.render(this.gl);
		this.rendered=true;
	}
};


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @constant 
* @description Enumeration for a perspective camera
*/
GLGE.C_PERSPECTIVE=1;
/**
* @constant 
* @description Enumeration for a orthographic camera
*/
GLGE.C_ORTHO=2;

/**
* @class Creates a new camera object
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Camera=function(uid){
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.Placeable,GLGE.Camera);
GLGE.augment(GLGE.Animatable,GLGE.Camera);
GLGE.augment(GLGE.QuickNotation,GLGE.Camera);
GLGE.augment(GLGE.JSONLoader,GLGE.Camera);
GLGE.Camera.prototype.className="Camera";
GLGE.Camera.prototype.fovy=35;
GLGE.Camera.prototype.aspect=1.0;
GLGE.Camera.prototype.near=0.1;
GLGE.Camera.prototype.far=1000.0;
GLGE.Camera.prototype.orthoscale=5;
GLGE.Camera.prototype.type=GLGE.C_PERSPECTIVE;
GLGE.Camera.prototype.pMatrix=null;


/**
* Method gets the orthographic scale for the camers
* @return {Matrix} Returns the orthographic scale
*/
GLGE.Camera.prototype.getOrthoScale=function(){
	if(this.type==GLGE.C_ORTHO) {
		return this.orthoscale
	}else{
		GLGE.error("You may only get a scale for a orthographic camera");
		return 1;
	}
};
/**
* Method sets the orthographic scale for the camers
* @param {number} scale The new orthographic scale
*/
GLGE.Camera.prototype.setOrthoScale=function(scale){
	if(this.type==GLGE.C_ORTHO) {
		this.orthoscale=scale;
		this.pMatrix=null;
	}
	else
	{
		GLGE.error("You may only set a scale for a orthographic camera");
	}
	return this;
};

/**
* Method gets the far drawing distance
* @return {Matrix} Returns the cameras far draw distance
*/
GLGE.Camera.prototype.getFar=function(){
	return this.far;
};
/**
* Method sets the far draw distance of the camera
* @param {number} distance The far draw distance
*/
GLGE.Camera.prototype.setFar=function(distance){
	this.far=distance;
	return this;
};

/**
* Method gets the near drawing distance
* @return {Matrix} Returns the cameras near draw distance
*/
GLGE.Camera.prototype.getNear=function(){
	return this.near;
};
/**
* Method sets the near draw distance of the camera
* @param {number} distance The near draw distance
*/
GLGE.Camera.prototype.setNear=function(distance){
	this.near=distance;
	return this;
};

/**
* Method gets the current camera type
* @return {Matrix} Returns the camera type
*/
GLGE.Camera.prototype.getType=function(){
	return this.type
};
/**
* Method sets the type of camera GLGE.C_PERSPECTIVE or GLGE.C_ORTHO
* @param {number} type The type of this camera
*/
GLGE.Camera.prototype.setType=function(type){
	if(type==GLGE.C_PERSPECTIVE || type==GLGE.C_ORTHO){
		this.type=type;
		this.pMatrix=null;
	}else{
		GLGE.error("unsuported camera type");
	}
	return this;
};

/**
* Method gets the current yfov if the camera type is GLGE.C_PERSPECTIVE
* @return {Matrix} Returns the yfov
*/
GLGE.Camera.prototype.getFovY=function(){
	if(this.type==GLGE.C_PERSPECTIVE) {
		return this.fovy
	}else{
		GLGE.error("You may only get a yfov for a perspective camera");
		return 1;
	}
};
/**
* Method sets the yfov of the camera
* @param {number} yfov The new yfov of the camera
*/
GLGE.Camera.prototype.setFovY=function(fovy){
	if(this.type==GLGE.C_PERSPECTIVE) {
		this.fovy=fovy;
		this.ymax=null;
		this.pMatrix=null;
	}
	else
	{
		GLGE.error("You may only set a yfov for a perspective camera");
	}
	return this;
};

/**
* Method gets the current aspect if the camera type is GLGE.C_PERSPECTIVE
* @return {Matrix} Returns the yfov
*/
GLGE.Camera.prototype.getAspect=function(){
	if(this.type==GLGE.C_PERSPECTIVE || this.type==GLGE.C_ORTHO) {
		return this.aspect
	}
	else
	{
		GLGE.error("You may only set a aspect for a perspective or orthographic camera");
		return 1;
	}
};
/**
* Method sets the aspect of the camera
* @param {number} aspect The new projection matrix
*/
GLGE.Camera.prototype.setAspect=function(aspect){
	if(this.type==GLGE.C_PERSPECTIVE || this.type==GLGE.C_ORTHO) {
		this.aspect=aspect;
		this.pMatrix=null;
	}
	else
	{
		GLGE.error("You may only set a aspect for a perspective or orthographic camera");
	}
	return this;
};


/**
* Method gets the current projection matrix of this camera
* @return {Matrix} Returns the camera projection matrix
*/
GLGE.Camera.prototype.getProjectionMatrix=function(){
	if(!this.pMatrix){
		switch(this.type){
			case GLGE.C_PERSPECTIVE:
				this.pMatrix=GLGE.makePerspective(this.fovy, this.aspect, this.near, this.far);
				break;
			case GLGE.C_ORTHO:
				this.pMatrix=GLGE.makeOrtho(-this.orthoscale*this.aspect,this.orthoscale*this.aspect,-this.orthoscale,this.orthoscale, this.near, this.far);
				break;
		}
	}
	return this.pMatrix;
};
/**
* Method generates the projection matrix based on the 
* camera paramaters
* @param {Matrix} projection The new projection matrix
*/
GLGE.Camera.prototype.setProjectionMatrix=function(projection){
	this.pMatrix=projection;
	return this;
};
/**
* Method generates the cameras view matrix
* @return Returns the view matrix based on this camera
* @type Matrix
*/
GLGE.Camera.prototype.updateMatrix=function(){
	var position=this.getPosition();
	var vMatrix=GLGE.translateMatrix(position.x,position.y,position.z);
	vMatrix=GLGE.mulMat4(vMatrix,this.getRotMatrix());
	if(this.parent) vMatrix=GLGE.mulMat4(this.parent.getModelMatrix(),vMatrix);
	this.matrix=GLGE.inverseMat4(vMatrix);
};
/**
* Method generates the cameras view matrix
* @return Returns the view matrix based on this camera
* @type Matrix
*/
GLGE.Camera.prototype.getViewMatrix=function(){
	if(!this.matrix || !this.rotmatrix) this.updateMatrix();
	return this.matrix;
};

/**
* Method generates the cameras view projection matrix
* @return Returns the view projection  matrix based on this camera
* @type Matrix
*/
GLGE.Camera.prototype.getViewProjection=function(){
	var projectionMatrix=this.getProjectionMatrix();
	var viewMatrix=this.getViewMatrix();
	if(projectionMatrix!=this.vpProjectionMatrix || viewMatrix!=this.vpViewMatrix){
		this.cameraViewProjection=GLGE.mulMat4(projectionMatrix,viewMatrix);
		this.vpProjectionMatrix=projectionMatrix;
		this.vpViewMatrix=viewMatrix;
	}
	return this.cameraViewProjection;
};



})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class Creates a new light source to be added to a scene
* @property {Boolean} diffuse Dose this light source effect diffuse shading
* @property {Boolean} specular Dose this light source effect specular shading
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Light=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.color={r:1,g:1,b:1};
}
GLGE.augment(GLGE.Placeable,GLGE.Light);
GLGE.augment(GLGE.Animatable,GLGE.Light);
GLGE.augment(GLGE.QuickNotation,GLGE.Light);
GLGE.augment(GLGE.JSONLoader,GLGE.Light);
GLGE.Light.prototype.className="Light";
/**
* @constant 
* @description Enumeration for an point light source
*/
GLGE.L_POINT=1;
/**
* @constant 
* @description Enumeration for an directional light source
*/
GLGE.L_DIR=2;
/**
* @constant 
* @description Enumeration for an spot light source
*/
GLGE.L_SPOT=3;

GLGE.Light.prototype.constantAttenuation=1;
GLGE.Light.prototype.linearAttenuation=0.002;
GLGE.Light.prototype.quadraticAttenuation=0.0008;
GLGE.Light.prototype.spotCosCutOff=0.95;
GLGE.Light.prototype.spotPMatrix=null;
GLGE.Light.prototype.spotExponent=10;
GLGE.Light.prototype.color=null; 
GLGE.Light.prototype.diffuse=true; 
GLGE.Light.prototype.specular=true; 
GLGE.Light.prototype.samples=0; 
GLGE.Light.prototype.softness=0.01; 
GLGE.Light.prototype.type=GLGE.L_POINT;
GLGE.Light.prototype.frameBuffer=null;
GLGE.Light.prototype.renderBuffer=null;
GLGE.Light.prototype.texture=null;
GLGE.Light.prototype.bufferHeight=256;
GLGE.Light.prototype.bufferWidth=256;
GLGE.Light.prototype.shadowBias=2.0;
GLGE.Light.prototype.distance=100.0;
GLGE.Light.prototype.castShadows=false;

/**
* Gets the spot lights projection matrix
* @returns the lights spot projection matrix
* @private
*/
GLGE.Light.prototype.getPMatrix=function(){
	if(!this.spotPMatrix){
		var far;
		if(this.scene && this.scene.camera) far=this.scene.camera.far;
			else far=1000;
		this.spotPMatrix=GLGE.makePerspective(Math.acos(this.spotCosCutOff)/3.14159*360, 1.0, 0.1, far);
	}
	return this.spotPMatrix;
}


/**
* Sets the shadow casting flag
* @param {number} distance
*/
GLGE.Light.prototype.setDistance=function(value){
	this.distance=value;
	return this;
}
/**
* Gets the shadow casting distance
* @returns {number} distance
*/
GLGE.Light.prototype.getDistance=function(){
	return this.distance;
}

/**
* Sets negative shadow flag
* @param {boolean} negative shadow
*/
GLGE.Light.prototype.setNegativeShadow=function(value){
	this.negativeShadow=value;
	return this;
}
/**
* Gets negative shadow flag
* @param {boolean} negative shadow
*/
GLGE.Light.prototype.getNegative=function(){
	return this.negativeShadow;
}

/**
* Sets the shadow casting flag
* @param {number} value should cast shadows?
*/
GLGE.Light.prototype.setCastShadows=function(value){
	this.castShadows=value;
	return this;
}
/**
* Gets the shadow casting flag
* @returns {number} true if casts shadows
*/
GLGE.Light.prototype.getCastShadows=function(){
	return this.castShadows;
	return this;
}
/**
* Sets the shadow bias
* @param {number} value The shadow bias
*/
GLGE.Light.prototype.setShadowBias=function(value){
	this.shadowBias=value;
	return this;
}
/**
* Gets the shadow bias
* @returns {number} The shadow buffer bias
*/
GLGE.Light.prototype.getShadowBias=function(){
	return this.shadowBias;
}

/**
* Sets the number of samples for this shadow
* @param {number} value The number of samples to perform
*/
GLGE.Light.prototype.setShadowSamples=function(value){
	this.samples=value;
	return this;
}
/**
* Gets the number of samples for this shadow
* @returns {number} The number of samples
*/
GLGE.Light.prototype.getShadowSamples=function(){
	return this.samples;
}
/**
* Sets the shadow softness
* @param {number} value The number of samples to perform
*/
GLGE.Light.prototype.setShadowSoftness=function(value){
	this.softness=value;
	return this;
}
/**
* Gets the shadow softness
* @returns {number} The softness of the shadows
*/
GLGE.Light.prototype.getShadowSamples=function(){
	return this.softness;
}
/**
* Sets the shadow buffer width
* @param {number} value The shadow buffer width
*/
GLGE.Light.prototype.setBufferWidth=function(value){
	this.bufferWidth=value;
	return this;
}
/**
* Gets the shadow buffer width
* @returns {number} The shadow buffer width
*/
GLGE.Light.prototype.getBufferHeight=function(){
	return this.bufferHeight;
}
/**
* Sets the shadow buffer width
* @param {number} value The shadow buffer width
*/
GLGE.Light.prototype.setBufferHeight=function(value){
	this.bufferHeight=value;
	return this;
}
/**
* Gets the shadow buffer width
* @returns {number} The shadow buffer width
*/
GLGE.Light.prototype.getBufferWidth=function(){
	return this.bufferWidth;
}
/**
* Sets the spot light cut off
* @param {number} value The cos of the angle to limit
*/
GLGE.Light.prototype.setSpotCosCutOff=function(value){
	this.spotPMatrix=null;
	this.spotCosCutOff=value;
	return this;
}
/**
* Gets the spot light cut off
* @returns {number} The cos of the limiting angle 
*/
GLGE.Light.prototype.getSpotCosCutOff=function(){
	return this.spotCosCutOff;
}
/**
* Sets the spot light exponent
* @param {number} value The spot lights exponent
*/
GLGE.Light.prototype.setSpotExponent=function(value){
	this.spotExponent=value;
	return this;
}
/**
* Gets the spot light exponent
* @returns {number} The exponent of the spot light
*/
GLGE.Light.prototype.getSpotExponent=function(){
	return this.spotExponent;
}
/**
* Sets the light sources Attenuation
* @returns {Object} The components of the light sources attenuation
*/
GLGE.Light.prototype.getAttenuation=function(constant,linear,quadratic){
	var attenuation={};
	attenuation.constant=this.constantAttenuation;
	attenuation.linear=this.linearAttenuation;
	attenuation.quadratic=this.quadraticAttenuation;
	return attenuation;
}
/**
* Sets the light sources Attenuation
* @param {Number} constant The constant part of the attenuation
* @param {Number} linear The linear part of the attenuation
* @param {Number} quadratic The quadratic part of the attenuation
*/
GLGE.Light.prototype.setAttenuation=function(constant,linear,quadratic){
	this.constantAttenuation=constant;
	this.linearAttenuation=linear;
	this.quadraticAttenuation=quadratic;
	return this;
}
/**
* Sets the light sources constant attenuation
* @param {Number} value The constant part of the attenuation
*/
GLGE.Light.prototype.setAttenuationConstant=function(value){
	this.constantAttenuation=value;
	return this;
}
/**
* Sets the light sources linear attenuation
* @param {Number} value The linear part of the attenuation
*/
GLGE.Light.prototype.setAttenuationLinear=function(value){
	this.linearAttenuation=value;
	return this;
}
/**
* Sets the light sources quadratic attenuation
* @param {Number} value The quadratic part of the attenuation
*/
GLGE.Light.prototype.setAttenuationQuadratic=function(value){
	this.quadraticAttenuation=value;
	return this;
}

/**
* Sets the color of the light source
* @param {string} color The color of the light
*/
GLGE.Light.prototype.setColor=function(color){
	color=GLGE.colorParse(color);
	this.color={r:color.r,g:color.g,b:color.b};
	return this;
}
/**
* Sets the red color of the light source
* @param {Number} value The new red level 0-1
*/
GLGE.Light.prototype.setColorR=function(value){
	this.color.r=value;
	return this;
}
/**
* Sets the green color of the light source
* @param {Number} value The new green level 0-1
*/
GLGE.Light.prototype.setColorG=function(value){
	this.color.g=value;
	return this;
}
/**
* Sets the blue color of the light source
* @param {Number} value The new blue level 0-1
*/
GLGE.Light.prototype.setColorB=function(value){
	this.color.b=value;
	return this;
}
/**
* Gets the current color of the light source
* @return {[r,g,b]} The current position
*/
GLGE.Light.prototype.getColor=function(){
	return this.color;
}
/**
* Gets the type of the light
* @return {Number} The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.getType=function(){
	return this.type;
}
/**
* Sets the type of the light
* @param {Number} type The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.setType=function(type){
	this.type=type;
	return this;
}
/**
* init for the rendering
* @private
*/
GLGE.Light.prototype.GLInit=function(gl){	
	this.gl=gl;
	if(this.type==GLGE.L_SPOT && !this.texture){
		this.createSpotBuffer(gl);
	}
}
/**
* Sets up the WebGL needed to render the depth map for this light source. Only used for spot lights which produce shadows
* @private
*/
GLGE.Light.prototype.createSpotBuffer=function(gl){
    this.frameBuffer = gl.createFramebuffer();
    this.renderBuffer = gl.createRenderbuffer();
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.bufferWidth, this.bufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } catch (e) {
        var tex = new Uint8Array(this.bufferWidth * this.bufferHeight * 4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, parseFloat2(this.bufferWidth), parseFloat2(this.bufferHeight), 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.bufferWidth, this.bufferHeight);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @constant 
* @description Enumeration for no fog
*/
GLGE.FOG_NONE=1;
/**
* @constant 
* @description Enumeration for linear fall off fog
*/
GLGE.FOG_LINEAR=2;
/**
* @constant 
* @description Enumeration for exponential fall off fog
*/
GLGE.FOG_QUADRATIC=3;

/**
* @class Scene class containing the camera, lights and objects
* @augments GLGE.Group
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Scene=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.children=[];
	this.camera=new GLGE.Camera();
	this.backgroundColor={r:1,g:1,b:1,a:1};
	this.ambientColor={r:0,g:0,b:0};
	this.fogColor={r:0.5,g:0.5,b:0.5};
	this.passes=[];
}
GLGE.augment(GLGE.Group,GLGE.Scene);
GLGE.augment(GLGE.QuickNotation,GLGE.Scene);
GLGE.augment(GLGE.JSONLoader,GLGE.Scene);
GLGE.Scene.prototype.camera=null;
GLGE.Scene.prototype.className="Scene";
GLGE.Scene.prototype.renderer=null;
GLGE.Scene.prototype.backgroundColor=null;
GLGE.Scene.prototype.filter=null;
GLGE.Scene.prototype.fogColor=null;
GLGE.Scene.prototype.ambientColor=null;
GLGE.Scene.prototype.fogNear=10;
GLGE.Scene.prototype.fogFar=80;
GLGE.Scene.prototype.fogType=GLGE.FOG_NONE;
GLGE.Scene.prototype.passes=null;
GLGE.Scene.prototype.culling=true;

/**
* Gets the fog falloff type
* @returns {number} the far falloff type
*/
GLGE.Scene.prototype.getFogType=function(){	
	return this.fogType;
}
/**
* Sets the scenes fog falloff type
* @param {number} type The fog falloff type FOG_NONE,FOG_LINEAR,FOG_QUADRATIC
*/
GLGE.Scene.prototype.setFogType=function(type){	
	this.fogType=type;
	return this;
}

/**
* Gets the far fog distance
* @returns {number} the far distance of the fog
*/
GLGE.Scene.prototype.getFogFar=function(){	
	return this.fogFar;
}
/**
* Sets the scenes fog far distance
* @param {number} dist The fog far distance
*/
GLGE.Scene.prototype.setFogFar=function(dist){	
	this.fogFar=dist;
	return this;
}

/**
* Gets the near fog distance
* @returns {number} the near distance of the fog
*/
GLGE.Scene.prototype.getFogNear=function(){	
	return this.fogNear;
}
/**
* Sets the scenes fog near distance
* @param {number} dist The fog near distance
*/
GLGE.Scene.prototype.setFogNear=function(dist){	
	this.fogNear=dist;
	return this;
}

/**
* Gets the fog color
* @returns {object} An assoiative array r,g,b
*/
GLGE.Scene.prototype.getFogColor=function(){	
	return this.fogColor;
}
/**
* Sets the scenes fog color
* @param {string} color The fog color
*/
GLGE.Scene.prototype.setFogColor=function(color){	
	color=GLGE.colorParse(color);
	this.fogColor={r:color.r,g:color.g,b:color.b};
	return this;
}

/**
* Gets the scenes background color
* @returns {object} An assoiative array r,g,b
*/
GLGE.Scene.prototype.getBackgroundColor=function(){	
	return this.backgroundColor;
}
/**
* Sets the scenes background color
* @param {string} color The backgorund color
*/
GLGE.Scene.prototype.setBackgroundColor=function(color){	
	color=GLGE.colorParse(color);
	this.backgroundColor={r:color.r,g:color.g,b:color.b,a:color.a};
	return this;
}
/**
* Gets the scenes ambient light
* @returns {object} An assoiative array r,g,b
*/
GLGE.Scene.prototype.getAmbientColor=function(){	
	return this.ambientColor;
}

/**
* Sets the scenes ambient light
* @param {string} color The ambient light color
*/
GLGE.Scene.prototype.setAmbientColor=function(color){	
	color=GLGE.colorParse(color);
	this.ambientColor={r:color.r,g:color.g,b:color.b};
	if(this.renderer){
		this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
	}
	return this;
}
/**
* Sets the scenes ambient light
* @param {number} value the red componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorR=function(value){	
	this.ambientColor.r=value;
	return this;
}
/**
* Sets the scenes ambient light
* @param {number} value the green componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorG=function(value){	
	this.ambientColor.g=value;
	return this;
}
/**
* Sets the scenes ambient light
* @param {number} value the blue componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorB=function(value){	
	this.ambientColor.b=value;
	return this;
}

/**
* Sets the active camera for this scene
* @property {GLGE.Camera} object The object to be added
*/
GLGE.Scene.prototype.setCamera=function(camera){	
	if(typeof camera=="string")  camera=GLGE.Assets.get(camera);
	this.camera=camera;
	return this;
}
/**
* Gets the scenes active camera
* @returns {GLGE.Camera} The current camera
*/
GLGE.Scene.prototype.getCamera=function(){	
	return this.camera;
}


/**
* Sets the Culling Flag
*/
GLGE.Scene.prototype.setCull=function(cull){	
	this.culling=cull;
	return this;
}
/**
* Gets the Culling Flag
*/
GLGE.Scene.prototype.getCull=function(){	
	return this.culling;
}

/**
* used to initialize all the WebGL buffers etc need for this scene
* @private
*/
GLGE.Scene.prototype.GLInit=function(gl){
	this.gl=gl;
	gl.lights=this.getLights();
	//sets the camera aspect to same aspect as the canvas
	this.camera.setAspect(this.renderer.canvas.width/this.renderer.canvas.height);

	//this.createPickBuffer(gl);
	this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
	
	for(var i=0;i<this.children;i++){
		if(this.children[i].GLInit) children[i].GLInit(gl);
	}
}
/**
* used to clean up all the WebGL buffers etc need for this scene
* @private
*/
GLGE.Scene.prototype.GLDestroy=function(gl){
}
/**
* sort function
*/
GLGE.Scene.sortFunc=function(a,b){
	return a.zdepth-b.zdepth;
}

/**
* z sorts the objects
* @private
*/
GLGE.Scene.prototype.zSort=function(gl,objects){
	var cameraMatrix=gl.scene.camera.getViewMatrix();
	var transMatrix;
	for(var i=0;i<objects.length;i++){
		if(objects[i].object.getBoundingVolume){
			var center=objects[i].object.getBoundingVolume().getCenter();
		}else{
			var matrix=objects[i].object.getModelMatrix();
			var center=[matrix[3],matrix[7],matrix[11]];
		}
		objects[i].zdepth=center[0]*cameraMatrix[8]+center[1]*cameraMatrix[9]+center[2]*cameraMatrix[10]+cameraMatrix[11];
	}
	objects.sort(GLGE.Scene.sortFunc);
	return objects;
}
/**
* sets the 2d filter to apply
* @param {GLGE.Filter2d} filter the filter to apply when rendering the scene
*/
GLGE.Scene.prototype.setFilter2d=function(value){
	this.filter=value;
	return this;
}
/**
* gets the 2d filter being applied apply
* @returns {GLGE.Filter2d}
*/
GLGE.Scene.prototype.getFilter2d=function(filter){
	return this.filter;
}
/**
* gets the scenes frame buffer
* @private
*/
GLGE.Scene.prototype.getFrameBuffer=function(gl){
	if(this.filter) return this.filter.getFrameBuffer(gl);
	return null;
}
/**
* culls objects from the scene
* @private
*/
GLGE.Scene.prototype.objectsInViewFrustum=function(renderObjects,cvp){
	var obj;
	var returnObjects=[];
	var planes=GLGE.cameraViewProjectionToPlanes(cvp);
	for(var i=0;i<renderObjects.length;i++){
		obj=renderObjects[i];
		if(obj.getBoundingVolume && obj.cull){
			var boundingVolume=obj.getBoundingVolume();
			var center=boundingVolume.getCenter();
			var radius=boundingVolume.getSphereRadius();
			if(GLGE.sphereInFrustumPlanes([center[0],center[1],center[2],radius],planes)){
				var points=boundingVolume.getCornerPoints();
				if(GLGE.pointsInFrustumPlanes(points,planes)){
					returnObjects.push(obj);
				}
			}	
		}else{
			returnObjects.push(obj);
		}
	}
	return returnObjects;	
}
/**
* Extracts all of the scene elements that need rendering
* @private
*/
GLGE.Scene.prototype.unfoldRenderObject=function(renderObjects){
	var returnObjects=[];
	for(var i=0;i<renderObjects.length;i++){
		var renderObject=renderObjects[i];
		if(renderObject.getMultiMaterials){
			var multiMaterials=renderObject.getMultiMaterials();
			for(var j=0;j<multiMaterials.length;j++){
				var mat=multiMaterials[j].getMaterial();
				var mesh=multiMaterials[j].getMesh();
				if(!mat.meshIdx) mat.matIdx=j;
				if(!mat.meshIdx) mat.meshIdx=j;
				returnObjects.push({object:renderObject, multiMaterial:j});
			}
		}else{
			returnObjects.push({object:renderObject, multiMaterial:0});
		}
	}
	return returnObjects;
}

/**
* State sorting function
* @private
*/
GLGE.Scene.prototype.stateSort=function(a,b){
	if(!a.object.GLShaderProgram) return 1;
	if(!b.object.GLShaderProgram) return -1;
	var aidx=a.object.GLShaderProgram.progIdx;
	var bidx=b.object.GLShaderProgram.progIdx;
	if(aidx>bidx){
		return 1;
	}else if(aidx<bidx){
		return -1;
	}else{
		if(!a.object.multimaterials || !b.object.multimaterials) return -1;
		var aidx=a.object.multimaterials[a.multiMaterial].getMaterial().matIdx;
		var bidx=b.object.multimaterials[b.multiMaterial].getMaterial().matIdx;
		if(aidx>bidx){
			return 1;
		}else if(aidx<bidx){
			return -1;
		}else{
			var amesh=a.object.multimaterials[a.multiMaterial].getMesh();
			var bmesh=a.object.multimaterials[a.multiMaterial].getMesh();
			if(!amesh) return -1;
			if(!bmesh) return 1;
			var aidx=amesh.meshIdx;
			var bidx=bmesh.meshIdx;
			if(aidx>bidx){
				return 1;
			}else if(aidx<bidx){
				return -1;
			}else{
				return 0;
			}
		}
	}
}


/**
* renders the scene
* @private
*/
GLGE.Scene.prototype.render=function(gl){
	//if look at is set then look
	if(this.camera.lookAt) this.camera.Lookat(this.camera.lookAt);	
	
	this.animate();
	gl.lights=this.getLights();
	
	var lights=gl.lights;
	gl.scene=this;
	this.lastMaterial=null;
	
	gl.disable(gl.BLEND);
	
	this.framebuffer=this.getFrameBuffer(gl);
	
	var renderObjects=this.getObjects();
	var cvp=this.camera.getViewProjection();
	
	if(this.culling){
		var cvp=this.camera.getViewProjection();
		renderObjects=this.objectsInViewFrustum(renderObjects,cvp);
	}
	renderObjects=this.unfoldRenderObject(renderObjects);
	renderObjects=renderObjects.sort(this.stateSort);
	
	//shadow stuff
	for(var i=0; i<lights.length;i++){
		if(lights[i].castShadows){
			if(!lights[i].gl) lights[i].GLInit(gl);
			var cameraMatrix=this.camera.matrix;
			var cameraPMatrix=this.camera.getProjectionMatrix();
			if(!lights[i].s_cache) lights[i].s_cache={};
			if(lights[i].s_cache.pmatrix!=lights[i].getPMatrix() || lights[i].s_cache.mvmatrix!=lights[i].getModelMatrix()){
				lights[i].s_cache.pmatrix=lights[i].getPMatrix();
				lights[i].s_cache.mvmatrix=lights[i].getModelMatrix();
				lights[i].s_cache.imvmatrix=GLGE.inverseMat4(lights[i].getModelMatrix());
				lights[i].s_cache.smatrix=GLGE.mulMat4(lights[i].getPMatrix(),lights[i].s_cache.imvmatrix);
				lights[i].shadowRendered=false;
			}
				gl.bindFramebuffer(gl.FRAMEBUFFER, lights[i].frameBuffer);
				

				gl.viewport(0,0,parseFloat(lights[i].bufferWidth),parseFloat(lights[i].bufferHeight));
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
				
				this.camera.setProjectionMatrix(lights[i].s_cache.pmatrix);
				this.camera.matrix=lights[i].s_cache.imvmatrix;
				//draw shadows
				for(var n=0; n<renderObjects.length;n++){
					renderObjects[n].object.GLRender(gl, GLGE.RENDER_SHADOW,n,renderObjects[n].multiMaterial,lights[i].distance);
				}
				gl.flush();
				this.camera.matrix=cameraMatrix;
				this.camera.setProjectionMatrix(cameraPMatrix);
				
				gl.bindTexture(gl.TEXTURE_2D, lights[i].texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.generateMipmap(gl.TEXTURE_2D);
			
			
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	}
	if(this.camera.animation) this.camera.animate();
	
	//null render pass to findout what else needs rendering
	this.getPasses(gl,renderObjects);	
	
	//first off render the passes
	var cameraMatrix=this.camera.matrix;
	var cameraPMatrix=this.camera.getProjectionMatrix();
	this.allowPasses=false;
	while(this.passes.length>0){
		var pass=this.passes.pop();
		gl.bindFramebuffer(gl.FRAMEBUFFER, pass.frameBuffer);
		this.camera.matrix=pass.cameraMatrix;
		this.camera.setProjectionMatrix(pass.projectionMatrix);
		this.renderPass(gl,renderObjects,0,0,pass.width,pass.height,GLGE.RENDER_DEFAULT,pass.self);
	}
	
	this.camera.matrix=cameraMatrix;
	this.camera.setProjectionMatrix(cameraPMatrix);
	

	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
	this.renderPass(gl,renderObjects,this.renderer.getViewportOffsetX(),this.renderer.getViewportOffsetY(),this.renderer.getViewportWidth(),this.renderer.getViewportHeight());	
	
	this.applyFilter(gl,renderObjects,null);
	
	this.allowPasses=true;
	
}
/**
* gets the passes needed to render this scene
* @private
*/
GLGE.Scene.prototype.getPasses=function(gl,renderObjects){
	for(var i=0; i<renderObjects.length;i++){
		renderObjects[i].object.GLRender(gl,GLGE.RENDER_NULL,0,renderObjects[i].multiMaterial);
	}
}

/**
* renders the scene
* @private
*/
GLGE.Scene.prototype.renderPass=function(gl,renderObjects,offsetx,offsety,width,height,type,self){
	gl.clearDepth(1.0);
	gl.depthFunc(gl.LEQUAL);
	gl.viewport(offsetx,offsety,width,height);
	
	gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
	if(!type) {
		gl.scissor(offsetx,offsety,width,height);
		gl.enable(gl.SCISSOR_TEST);
		this.renderer.GLClear();
		gl.disable(gl.SCISSOR_TEST);
	}else{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	}
	if(!type) type=GLGE.RENDER_DEFAULT;
	
	var transObjects=[];
	gl.disable(gl.BLEND);
	for(var i=0; i<renderObjects.length;i++){
		if(!renderObjects[i].object.zTrans && renderObjects[i]!=self) renderObjects[i].object.GLRender(gl,type,0,renderObjects[i].multiMaterial);
			else if(renderObjects[i]!=self) transObjects.push(renderObjects[i])
	}

	gl.enable(gl.BLEND);
	transObjects=this.zSort(gl,transObjects);
	for(var i=0; i<transObjects.length;i++){
		if(renderObjects[i]!=self) transObjects[i].object.GLRender(gl, type,0,transObjects[i].multiMaterial);
	}
}

GLGE.Scene.prototype.applyFilter=function(gl,renderObject,framebuffer){
	if(this.filter && this.filter.renderDepth){	
		gl.clearDepth(1.0);
		gl.depthFunc(gl.LEQUAL);
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.filter.getDepthBuffer(gl));
		this.renderPass(gl,renderObject,0,0,this.filter.getDepthBufferWidth(), this.filter.getDepthBufferHeight(),GLGE.RENDER_SHADOW);	
	}
	
	if(this.filter && this.filter.renderNormal){	
		gl.clearDepth(1.0);
		gl.depthFunc(gl.LEQUAL);
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.filter.getNormalBuffer(gl));
		this.renderPass(gl,renderObject,0,0,this.filter.getNormalBufferWidth(),this.filter.getNormalBufferHeight(),GLGE.RENDER_NORMAL);	
	}
	
	if(this.filter) this.filter.GLRender(gl,framebuffer);
}

/**
* Adds and additional render pass to the scene for RTT, reflections and refractions
* @private
*/
GLGE.Scene.prototype.addRenderPass=function(frameBuffer,cameraMatrix,projectionMatrix,width,height,self){
	if(this.allowPasses)	this.passes.push({frameBuffer:frameBuffer, cameraMatrix:cameraMatrix, projectionMatrix:projectionMatrix, height:height, width:width,self:self});
	return this;
}
/**
* Sets up the WebGL needed create a picking frame and render buffer
* @private
*/
/*GLGE.Scene.prototype.createPickBuffer=function(gl){
    this.framePickBuffer = gl.createFramebuffer();
    this.renderPickBufferD = gl.createRenderbuffer();
    this.renderPickBufferC = gl.createRenderbuffer();
    //this.pickTexture = gl.createTexture();
    //gl.bindTexture(gl.TEXTURE_2D, this.pickTexture);

    //TODO update when null is accepted
   /* try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } catch (e) {
        var tex = new WebGLUnsignedByteArray(4*1*4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framePickBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderPickBufferD);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,4, 1);
    //gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pickTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderPickBufferD);
    
    
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderPickBufferC);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA,4, 1);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.renderPickBufferC);
    
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
}*/

/**
* ray query from origin in the given direction
* @param origin the source of the ray
* @param direction the direction of the ray
*/
GLGE.Scene.prototype.ray=function(origin,direction){

		var gl=this.renderer.gl;
		var origmatrix=this.camera.matrix;	
		var origpmatrix=this.camera.pMatrix;
		
		this.camera.matrix=GLGE.inverseMat4(GLGE.Mat4([direction[2], direction[1], direction[0], origin[0],
									direction[0], direction[2], direction[1], origin[1],
									direction[1], direction[0], direction[2], origin[2],
									0, 0, 0, 1]));

		if(!this.pickPMatrix)	this.pickPMatrix=GLGE.makeOrtho(-0.0001,0.0001,-0.0001,0.0001,this.camera.near,this.camera.far);
		this.camera.pMatrix=this.pickPMatrix;
		gl.viewport(0,0,8,1);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.disable(gl.BLEND);
		gl.scene=this;
		var objects=this.getObjects();
		for(var i=0; i<objects.length;i++){
			if(objects[i].pickable) objects[i].GLRender(gl,GLGE.RENDER_PICK,i+1);
		}
		gl.flush();

		var data = new Uint8Array(8 * 1 * 4);
		gl.readPixels(0, 0, 8, 1, gl.RGBA,gl.UNSIGNED_BYTE, data);
		
		
		var norm=[data[4]/255,data[5]/255,data[6]/255];
		var normalsize=Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2])*0.5;
		norm=[norm[0]/normalsize-1,norm[1]/normalsize-1,norm[2]/normalsize-1];
		var obj=objects[data[0]+data[1]*256+data[2]*65536-1];
		
		var dist=(data[10]/255+0.00390625*data[9]/255+0.0000152587890625*data[8]/255)*this.camera.far;
		var tex=[];
		tex[0]=(data[14]/255+0.00390625*data[13]/255+0.0000152587890625*data[12]/255);
		tex[1]=(data[18]/255+0.00390625*data[17]/255+0.0000152587890625*data[16]/255);
		
				
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0,0,this.renderer.canvas.width,this.renderer.canvas.height);
		
		//revert the view matrix
		this.camera.matrix=origmatrix;	
		this.camera.pMatrix=origpmatrix;
		if (obj) {
			return {object:obj,distance:dist,coord:[origin[0]-direction[0]*dist,origin[1]-direction[1]*dist,origin[2]-direction[2]*dist],normal:norm,texture:tex};
		}
		return null;
}

/**
* Picks and object from canvas coords
* @param x the canvas x coord to pick
* @param y the canvas y coord to pick
*/

GLGE.Scene.prototype.pick=function(x,y){
	var ray = this.makeRay(x,y);
	if (!ray) {
		return null;
	}
	return this.ray(ray.origin,ray.coord);
};


/**
* Returns an object containing origin and coord, starting from the camera and pointing towards (x,y)
* @param x the canvas x coord to pick
* @param y the canvas y coord to pick
*/

GLGE.Scene.prototype.makeRay=function(x,y){
	if(!this.camera){
		GLGE.error("No camera set for picking");
		return null;
	}else if(this.camera.matrix && this.camera.pMatrix){
		var height=this.renderer.getViewportHeight();
		var width=this.renderer.getViewportWidth();
		var offsetx=this.renderer.getViewportOffsetX();
		var offsety=this.renderer.getViewportHeight()-this.renderer.canvas.height+this.renderer.getViewportOffsetY();
		var xcoord =  ((x-offsetx)/width-0.5)*2;
		var ycoord = -((y+offsety)/height-0.5)*2;

		var invViewProj=GLGE.mulMat4(GLGE.inverseMat4(this.camera.matrix),GLGE.inverseMat4(this.camera.pMatrix));
		var origin =GLGE.mulMat4Vec4(invViewProj,[xcoord,ycoord,-1,1]);
		origin=[origin[0]/origin[3],origin[1]/origin[3],origin[2]/origin[3]];
		var coord =GLGE.mulMat4Vec4(invViewProj,[xcoord,ycoord,1,1]);
		coord=[-(coord[0]/coord[3]-origin[0]),-(coord[1]/coord[3]-origin[1]),-(coord[2]/coord[3]-origin[2])];
		coord=GLGE.toUnitVec3(coord);

		return {origin: origin, coord: coord};
		
	}else{
		return null;
	}
	
};


})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_particles.js
 */

(function(GLGE){


/**
* @class A texture to be included in a material
* @param {string} uid the unique id for this texture
* @augments GLGE.Placeable
* @augments GLGE.Animatable
*/
GLGE.ParticleSystem=function(uid){
	this.startTime=(new Date()).getTime();
	this.texture={};
	this.startMaxVelocity={x:0,y:0,z:0};
	this.startMinVelocity={x:0,y:0,z:0};
	this.startMaxAcceleration={x:0,y:0,z:0};
	this.endMaxAcceleration={x:0,y:0,z:0};
	this.startMinAcceleration={x:0,y:0,z:0};
	this.endMinAcceleration={x:0,y:0,z:0};
	this.startColor={r:0,g:0,b:0,a:1};
	this.endColor={r:0,g:0,b:0,a:1};
}

GLGE.augment(GLGE.Placeable,GLGE.ParticleSystem);
GLGE.augment(GLGE.Animatable,GLGE.ParticleSystem);

/**
* Sets the max velocity in the X direction
* @param {number} value the maximum velocity
*/
GLGE.ParticleSystem.prototype.setMaxVelX=function(value){
	this.startMaxVelocity.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the max velocity in the Y direction
* @param {number} value the maximum velocity
*/
GLGE.ParticleSystem.prototype.setMaxVelY=function(value){
	this.startMaxVelocity.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the max velocity in the Z direction
* @param {number} value the maximum velocity
*/
GLGE.ParticleSystem.prototype.setMaxVelZ=function(value){
	this.startMaxVelocity.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the max velocity in the all direction
* @param {number} x the maximum velocity in x axis
* @param {number} y the maximum velocity in y axis
* @param {number} z the maximum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setMaxVelocity=function(x,y,z){
	this.startMaxVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}
/**
* Sets the min velocity in the X direction
* @param {number} value the minimum velocity
*/
GLGE.ParticleSystem.prototype.setMinVelX=function(value){
	this.startMinVelocity.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the min velocity in the Y direction
* @param {number} value the minimum velocity
*/
GLGE.ParticleSystem.prototype.setMinVelY=function(value){
	this.startMinVelocity.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the min velocity in the Z direction
* @param {number} value the minimum velocity
*/
GLGE.ParticleSystem.prototype.setMinVelZ=function(value){
	this.startMinVelocity.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the min velocity in the all direction
* @param {number} x the minimum velocity in x axis
* @param {number} y the minimum velocity in y axis
* @param {number} z the minimum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setMinVelocity=function(x,y,z){
	this.startMinVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

/**
* Sets the velocity in the X direction
* @param {number} value the minimum velocity
*/
GLGE.ParticleSystem.prototype.setVelX=function(value){
	this.startMaxVelocity.x=parseFloat(value);
	this.startMinVelocity.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the velocity in the Y direction
* @param {number} value the minimum velocity
*/
GLGE.ParticleSystem.prototype.setVelY=function(value){
	this.startMaxVelocity.y=parseFloat(value);
	this.startMinVelocity.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the velocity in the Z direction
* @param {number} value the minimum velocity
*/
GLGE.ParticleSystem.prototype.setVelZ=function(value){
	this.startMaxVelocity.z=parseFloat(value);
	this.startMinVelocity.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the velocity in the all direction
* @param {number} x the minimum velocity in x axis
* @param {number} y the minimum velocity in y axis
* @param {number} z the minimum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setVelocity=function(x,y,z){
	this.startMaxVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.startMinVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

/**
* Sets the max starting acceleration in the X direction
* @param {number} value the maximum acceleration
*/
GLGE.ParticleSystem.prototype.setMaxStartAccX=function(value){
	this.startMaxAcceleration.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the max starting acceleration in the Y direction
* @param {number} value the maximum acceleration
*/
GLGE.ParticleSystem.prototype.setMaxStartAccY=function(value){
	this.startMaxAcceleration.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the max starting acceleration in the Z direction
* @param {number} value the maximum acceleration
*/
GLGE.ParticleSystem.prototype.setMaxStartAccZ=function(value){
	this.startMaxAcceleration.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the max starting acceleration in the all direction
* @param {number} x the minimum velocity in x axis
* @param {number} y the minimum velocity in y axis
* @param {number} z the minimum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setMaxStartAccelertaion=function(x,y,z){
	this.startMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}
/**
* Sets the min starting acceleration in the X direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setMinStartAccX=function(value){
	this.startMinAcceleration.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the min starting acceleration in the Y direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setMinStartAccY=function(value){
	this.startMinAcceleration.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the min starting acceleration in the Z direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setMinStartAccZ=function(value){
	this.startMinAcceleration.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the min starting acceleration in the all direction
* @param {number} x the minimum velocity in x axis
* @param {number} y the minimum velocity in y axis
* @param {number} z the minimum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setMinStartAccelertaion=function(x,y,z){
	this.startMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

/**
* Sets the starting acceleration in the X direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setStartAccX=function(value){
	this.startMaxAcceleration.x=parseFloat(value);
	this.startMinAcceleration.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the starting acceleration in the Y direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setStartAccY=function(value){
	this.startMaxAcceleration.y=parseFloat(value);
	this.startMinAcceleration.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the starting acceleration in the Z direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setStartAccZ=function(value){
	this.startMaxAcceleration.z=parseFloat(value);
	this.startMinAcceleration.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the starting acceleration in the all direction
* @param {number} x the minimum velocity in x axis
* @param {number} y the minimum velocity in y axis
* @param {number} z the minimum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setStartAccelertaion=function(x,y,z){
	this.startMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.startMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

/**
* Sets the maximum ending acceleration in the X direction
* @param {number} value the maximum acceleration
*/
GLGE.ParticleSystem.prototype.setMaxEndAccX=function(value){
	this.endMaxAcceleration.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the maximum ending acceleration in the Y direction
* @param {number} value the maximum acceleration
*/
GLGE.ParticleSystem.prototype.setMaxEndAccY=function(value){
	this.endMaxAcceleration.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the maximum ending acceleration in the Z direction
* @param {number} value the maximum acceleration
*/
GLGE.ParticleSystem.prototype.setMaxEndAccZ=function(value){
	this.endMaxAcceleration.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the maximum ending acceleration in the all direction
* @param {number} x the maximum velocity in x axis
* @param {number} y the maximum velocity in y axis
* @param {number} z the maximum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setMaxEndAccelertaion=function(x,y,z){
	this.endMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}
/**
* Sets the minimum ending acceleration in the X direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setMinEndAccX=function(value){
	this.endMinAcceleration.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the minimum ending acceleration in the Y direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setMinEndAccY=function(value){
	this.endMinAcceleration.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the minimum ending acceleration in the Z direction
* @param {number} value the minimum acceleration
*/
GLGE.ParticleSystem.prototype.setMinEndAccZ=function(value){
	this.endMinAcceleration.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the minimum ending acceleration in the all direction
* @param {number} x the minimum velocity in x axis
* @param {number} y the minimum velocity in y axis
* @param {number} z the minimum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setMinEndAccelertaion=function(x,y,z){
	this.endMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}
/**
* Sets the ending acceleration in the X direction
* @param {number} value the acceleration
*/
GLGE.ParticleSystem.prototype.setEndAccX=function(value){
	this.endMinAcceleration.x=parseFloat(value);
	this.endMaxAcceleration.x=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the ending acceleration in the Y direction
* @param {number} value the acceleration
*/
GLGE.ParticleSystem.prototype.setEndAccY=function(value){
	this.endMinAcceleration.y=parseFloat(value);
	this.endMaxAcceleration.y=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the ending acceleration in the Z direction
* @param {number} value the acceleration
*/
GLGE.ParticleSystem.prototype.setEndAccZ=function(value){
	this.endMinAcceleration.z=parseFloat(value);
	this.endMaxAcceleration.z=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the ending acceleration in the all direction
* @param {number} x the minimum velocity in x axis
* @param {number} y the minimum velocity in y axis
* @param {number} z the minimum velocity in z axis
*/
GLGE.ParticleSystem.prototype.setEndAccelertaion=function(x,y,z){
	this.endMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.endMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

/**
* Sets the starting color of the particle
* @param {number} value the start color
*/
GLGE.ParticleSystem.prototype.setStartColor=function(value){
	var color=GLGE.colorParse(value);
	this.startColor=color;
	this.attribute=null;
}
/**
* Sets the ending color of the particle
* @param {number} value the end color
*/
GLGE.ParticleSystem.prototype.setEndColor=function(value){
	var color=GLGE.colorParse(value);
	this.endColor=color;
	this.attribute=null;
}
/**
* Sets the starting size of the particle
* @param {number} value the start size
*/
GLGE.ParticleSystem.prototype.setStartSize=function(value){
	this.startSize=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the ending size of the particle
* @param {number} value the end size
*/
GLGE.ParticleSystem.prototype.setEndSize=function(value){
	this.endSize=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the particles lifetime
* @param {number} value the particles life time
*/
GLGE.ParticleSystem.prototype.setLifeTime=function(value){
	this.maxLifeTime=parseFloat(value);
	this.minLifeTime=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the particles maximum lifetime
* @param {number} value the particles life time
*/
GLGE.ParticleSystem.prototype.setMaxLifeTime=function(value){
	this.maxLifeTime=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the particles minimum lifetime
* @param {number} value the particles life time
*/
GLGE.ParticleSystem.prototype.setMinLifeTime=function(value){
	this.minLifeTime=parseFloat(value);
	this.attribute=null;
}
/**
* Sets the total number of particles
* @param {number} value the number of particles
*/
GLGE.ParticleSystem.prototype.setNumParticles=function(value){
	this.numParticles=parseFloat(value);
	this.attribute=null;
}


/**
* The particles velocity function used to generate the initial particles velocities
*/
GLGE.ParticleSystem.prototype.velocityFunction=function(i){
	return [
		(this.startMaxVelocity.x-this.startMinVelocity.x) * Math.random()+this.startMinVelocity.x,
		(this.startMaxVelocity.y-this.startMinVelocity.y) * Math.random()+this.startMinVelocity.y,
		(this.startMaxVelocity.z-this.startMinVelocity.z) * Math.random()+this.startMinVelocity.z
		];
}
/**
* The particles acceleration function used to generate the initial particles accelerations
*/
GLGE.ParticleSystem.prototype.accelerationFunction=function(i){
	return [[
		(this.startMaxAcceleration.x-this.startMinAcceleration.x) * Math.random()+this.startMinAcceleration.x,
		(this.startMaxAcceleration.y-this.startMinAcceleration.y) * Math.random()+this.startMinAcceleration.y,
		(this.startMaxAcceleration.z-this.startMinAcceleration.z) * Math.random()+this.startMinAcceleration.z,
		],
		[
		(this.endMaxAcceleration.x-this.endMinAcceleration.x) * Math.random()+this.endMinAcceleration.x,
		(this.endMaxAcceleration.y-this.endMinAcceleration.y) * Math.random()+this.endMinAcceleration.y,
		(this.endMaxAcceleration.z-this.endMinAcceleration.z) * Math.random()+this.endMinAcceleration.z,
		]];
}
/**
* The particles color function used to generate the initial colors
*/
GLGE.ParticleSystem.prototype.colorFunction=function(i){
	return [[this.startColor.r,this.startColor.g,this.startColor.b,this.startColor.a],[this.endColor.r,this.endColor.g,this.endColor.b,this.endColor.a]];
}
/**
* The particles position  function used to generate the initial positions
*/
GLGE.ParticleSystem.prototype.positionFunction=function(i){
	return [0,0,0];
}
/**
* The particles size function used to generate the initial sizes
*/
GLGE.ParticleSystem.prototype.sizeFunction=function(i){
	return [this.startSize,this.endSize];
}
/**
* The particles life time function used to generate the initial lifetimes
*/
GLGE.ParticleSystem.prototype.lifeTimeFunction=function(i){
	return (this.maxLifeTime-this.minLifeTime)*Math.random()+this.minLifeTime;
}
//lifetime of a particle
GLGE.ParticleSystem.prototype.minLifeTime=2000;
GLGE.ParticleSystem.prototype.maxLifeTime=2000;
//particle emit rate
GLGE.ParticleSystem.prototype.numParticles=200;
GLGE.ParticleSystem.prototype.startTime=0;
GLGE.ParticleSystem.prototype.startSize=0;
GLGE.ParticleSystem.prototype.endSize=1;
GLGE.ParticleSystem.prototype.toRender=true;
GLGE.ParticleSystem.prototype.renderFirst=true;
GLGE.ParticleSystem.prototype.className="ParticleSystem";
GLGE.ParticleSystem.prototype.zTrans=true;
GLGE.ParticleSystem.prototype.velocity=null;
GLGE.ParticleSystem.prototype.loop=1;
/**
* Sets a new velocity function for this particle system
* @param {function} func the new function
*/
GLGE.ParticleSystem.prototype.setVelocityFunction=function(func){
	this.vecoityFunction=func;
	this.particles=null;
}
/**
* Sets a new acceleration function for this particle system
* @param {function} func the new function
*/
GLGE.ParticleSystem.prototype.setAccelerationFunction=function(func){
	this.accelerationFunction=func;
	this.particles=null;
}
/**
* Sets a new position function for this particle system
* @param {function} func the new function
*/
GLGE.ParticleSystem.prototype.setPositionFunction=function(func){
	this.colorFunction=func;
	this.particles=null;
}
/**
* Sets a new color function for this particle system
* @param {function} func the new function
*/
GLGE.ParticleSystem.prototype.setColorFunction=function(func){
	this.positionFunction=func;
	this.particles=null;
}
/**
* Sets a new size function for this particle system
* @param {function} func the new function
*/
GLGE.ParticleSystem.prototype.setSizeFunction=function(func){
	this.sizeFunction=func;
	this.particles=null;
}
/**
* generates the particles
* @private
*/
GLGE.ParticleSystem.prototype.generateParticles=function(gl){
	var num_particles=this.numParticles;
	this.attribute={initPos:[],initAcc:[],endAcc:[],initVel:[],initColor:[],endColor:[],sizeAndOffset:[]};
	this.faces=[];
	for(var i=0; i<num_particles;i++){
		var position=this.positionFunction(i);
		var velocity=this.velocityFunction(i);
		var acceleration=this.accelerationFunction(i);
		var color=this.colorFunction(i);
		var size=this.sizeFunction(i);
		var lifetime=this.lifeTimeFunction(i);
		var offsetTime=Math.floor(Math.random()*lifetime);
		for(var y=-1;y<=1;y=y+2){
			for(var x=-1;x<=1;x=x+2){
				this.attribute.initPos.push(parseFloat(position[0])+x,parseFloat(position[1])+y,parseFloat(position[2]));
				this.attribute.initAcc.push(acceleration[0][0],acceleration[0][1],acceleration[0][2]);
				this.attribute.endAcc.push(acceleration[1][0],acceleration[1][1],acceleration[1][2]);
				this.attribute.initVel.push(velocity[0],velocity[1],velocity[2]);
				this.attribute.initColor.push(color[0][0],color[0][1],color[0][2],color[0][3]);
				this.attribute.endColor.push(color[1][0],color[1][1],color[1][2],color[1][3]);
				this.attribute.sizeAndOffset.push(size[0],size[1],offsetTime,lifetime);
			}
		}
	}
	
	//create the face buffer
	for(var i=0; i<num_particles;i=i+4){
		this.faces.push(0+i,1+i,2+i);
		this.faces.push(1+i,2+i,3+i);
	}
	this.facesGL=gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesGL);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces), gl.STATIC_DRAW);
	this.facesGL.num=this.faces.length;

	this.attribute.initPosGL=this.createBuffer(gl,this.attribute.initPos);
	this.attribute.initAccGL=this.createBuffer(gl,this.attribute.initAcc);
	this.attribute.endAccGL=this.createBuffer(gl,this.attribute.endAcc);
	this.attribute.initVelGL=this.createBuffer(gl,this.attribute.initVel);
	this.attribute.initColorGL=this.createBuffer(gl,this.attribute.initColor);
	this.attribute.endColorGL=this.createBuffer(gl,this.attribute.endColor);
	this.attribute.sizeAndOffsetGL=this.createBuffer(gl,this.attribute.sizeAndOffset);
}
/**
* Show the paricle system loop
* @param {boolean} value the lopping flag
*/
GLGE.ParticleSystem.prototype.setLoop=function(value){
	this.loop=value;
}
/**
* Resets the particle system
*/
GLGE.ParticleSystem.prototype.reset=function(){
	this.startTime=(new Date()).getTime();
}

/**
* Creates the particle system shader programs
* @private
*/
GLGE.ParticleSystem.prototype.generateProgram=function(gl){
	var vtxShader=[
	//attributes
	"attribute vec3 position;",
	"attribute vec3 initVel;",
	"attribute vec3 initAcc;",
	"attribute vec3 endAcc;",
	"attribute vec4 initColor;",
	"attribute vec4 endColor;",
	"attribute vec4 sizeTimeLife;",
	//uniforms
	"uniform float time;",
	"uniform bool loop;",
	"uniform mat4 mvMatrix;",
	"uniform mat4 pMatrix;",
	//varying
	"varying vec2 UV;",
	"varying vec4 color;",
	//main
	"void main(){",
	
	"UV = (position.xy+1.0)/2.0;",
	"if((time>sizeTimeLife[2] && (time-sizeTimeLife[2])<sizeTimeLife[3]) || loop){",
	"float localTime = mod((time - sizeTimeLife[2]), sizeTimeLife[3]);",
	"color = (endColor-initColor)/sizeTimeLife[3]*localTime+initColor;",
	"float size = (sizeTimeLife[1]-sizeTimeLife[0])/sizeTimeLife[3]*localTime+sizeTimeLife[0];",
	"vec3 pos = (endAcc-initAcc)*(localTime*log(localTime)-localTime)+0.5*initAcc*localTime*localTime+initVel*localTime;",
	"pos = (mvMatrix*vec4(pos,1.0)).xyz;",
	"vec3 positions = pos+(position*size);",
	"gl_Position = pMatrix*vec4(positions,1.0);",
	"}else{",
	"gl_Position = vec4(0.0,0.0,0.0,1.0);",
	"}",
	"}"
	].join("");
	frgShader=[
	"#ifdef GL_ES\nprecision mediump float;\n#endif\n",
	//uniforms
	"uniform sampler2D texture;",
	//varying
	"varying vec2 UV;",
	"varying vec4 color;",
	//main
	"void main(){",
	"gl_FragColor=texture2D(texture,UV)*color;",
	"}"
	].join("");


	var vertexShader=gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader=gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vtxShader);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	      GLGE.error(gl.getShaderInfoLog(vertexShader));
	      return;
	}

	gl.shaderSource(fragmentShader,frgShader);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	      GLGE.error(gl.getShaderInfoLog(fragmentShader));
	      return;
	}

	if(this.program) gl.deleteProgram(this.Program);
	this.program = gl.createProgram();
	gl.attachShader(this.program, vertexShader);
	gl.attachShader(this.program, fragmentShader);
	gl.linkProgram(this.program);	
}
/**
* Creates the particle system buffers
* @private
*/
GLGE.ParticleSystem.prototype.createBuffer=function(gl,array){
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
	return buffer;
}
/**
* Sets the uniforms
* @private
*/
GLGE.ParticleSystem.prototype.setUniforms=function(gl){
	var program=this.program;
	if(!program.glarrays) program.glarrays={};
	var cameraMatrix=gl.scene.camera.getViewMatrix();
	
	var pos=this.getPosition();
	//var camerapos=gl.scene.camera.getPosition();
	var mvMatrix=GLGE.mulMat4(cameraMatrix,[
		1,0,0,pos.x,
		0,1,0,pos.y,
		0,0,1,pos.z,
		0,0,0,1]);

		
	var mvUniform = GLGE.getUniformLocation(gl,program, "mvMatrix");

	if(!program.glarrays.mvMatrix) program.glarrays.mvMatrix=new Float32Array(mvMatrix);
		else GLGE.mat4gl(mvMatrix,program.glarrays.mvMatrix);
	gl.uniformMatrix4fv(mvUniform, true, program.glarrays.mvMatrix);

	var pUniform = GLGE.getUniformLocation(gl,program, "pMatrix");
	if(!program.glarrays.pMatrix) program.glarrays.pMatrix=new Float32Array(gl.scene.camera.getProjectionMatrix());
			else GLGE.mat4gl(gl.scene.camera.getProjectionMatrix(),program.glarrays.pMatrix);	
	gl.uniformMatrix4fv(pUniform, true, program.glarrays.pMatrix);

	gl.uniform1f(GLGE.getUniformLocation(gl,program, "time"), ((new Date()).getTime()-this.startTime));
	gl.uniform1i(GLGE.getUniformLocation(gl,program, "loop"), this.loop);
	
	
	gl.activeTexture(gl.TEXTURE0);
	//create the texture if it's not already created
	if(!this.glTexture) this.glTexture=gl.createTexture();
	//if the image is loaded then set in the texture data
	if(this.texture.state==1){
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,this.texture.image);
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.texture.state=2;
		program.texture=true;
	}
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	if(program.texture){
		gl.uniform1i(GLGE.getUniformLocation(gl,program, "texture"), 0);
	}

}
/**
* Sets the particle image
* @param {string} url the image url
*/
GLGE.ParticleSystem.prototype.setImage=function(url){
	var texture=this.texture;
	texture.image=new Image();
	texture.image.onload=function(e){
		texture.state=1;
	}
	texture.image.src=url;
}
/**
* Sets the attributes
* @private
*/
GLGE.ParticleSystem.prototype.setAttributes=function(gl){
	for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
	
	var attrib=GLGE.getAttribLocation(gl,this.program, "position");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initPosGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "initAcc");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initAccGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "endAcc");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.endAccGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "initColor");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initColorGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 4, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "endColor");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.endColorGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 4, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "sizeTimeLife");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.sizeAndOffsetGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 4, gl.FLOAT, false, 0, 0);
	}
	
	var attrib=GLGE.getAttribLocation(gl,this.program, "initVel");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initVelGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}
	
}

/**
* Renders the particle system
* @private
*/
GLGE.ParticleSystem.prototype.GLRender=function(gl){
	if(!this.attribute) this.generateParticles(gl);
	if(!this.program) this.generateProgram(gl);
	
	gl.useProgram(this.program);
	this.setAttributes(gl);
	this.setUniforms(gl);
	gl.colorMask(0,0,0,0);
	gl.disable(gl.BLEND);
	gl.enable(gl.STENCIL_TEST);
	gl.stencilFunc(gl.ALWAYS, 1, 1);
	gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesGL);
	gl.drawElements(gl.TRIANGLES,this.facesGL.num, gl.UNSIGNED_SHORT, 0);
	gl.stencilFunc(gl.EQUAL, 1, 1);
	gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
	gl.colorMask(1,1,1,1);
	gl.disable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesGL);
	gl.drawElements(gl.TRIANGLES,this.facesGL.num, gl.UNSIGNED_SHORT, 0);
	gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);
	gl.stencilFunc(gl.ALWAYS, 0, 0);
	gl.enable(gl.DEPTH_TEST);
	
	gl.scene.lastMaterial=null;
}
/**
* @function Adds a particle system to the scene
* @param {GLGE.ParticleSystem} the particle system to add
*/
GLGE.Scene.prototype.addParticleSystem=GLGE.Scene.prototype.addGroup;
/**
* @function Adds a particle system to the group
* @param {GLGE.ParticleSystem} the particle system to add
*/
GLGE.Group.prototype.addParticleSystem=GLGE.Group.prototype.addGroup;

})(GLGE);/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_filter2d.js
 * @author me@paulbrunt.co.uk
 */
 
 if(!window["GLGE"]){
	window["GLGE"]={};
}

(function(GLGE){

GLGE.Filter2d=function(){
	
}
GLGE.Filter2d.prototype.renderDepth=true;
GLGE.Filter2d.prototype.renderNormal=true;
GLGE.Filter2d.prototype.passes=null;
GLGE.Filter2d.prototype.textures=null;
GLGE.Filter2d.prototype.uniforms=null;
GLGE.Filter2d.prototype.buffers=null;
GLGE.Filter2d.prototype.depthBufferWidth=null;
GLGE.Filter2d.prototype.depthBufferHeight=null;
GLGE.Filter2d.prototype.normalBufferWidth=null;
GLGE.Filter2d.prototype.normalBufferHeight=null;

GLGE.Filter2d.prototype.addTexture=function(texture){
	if(!this.textures) this.textures=[];
	this.textures.push(texture);
}
GLGE.Filter2d.prototype.removeTexture=function(texture){
	var idx=this.textures.indexOf(texture);
	if(idx>-1) this.textures.splice(idx,1);
}

GLGE.Filter2d.prototype.createBuffer=function(gl,width,height){
	if(!width) width=gl.canvas.width;
	if(!height) height=gl.canvas.height;
	var frameBuffer = gl.createFramebuffer();
	var renderBuffer = gl.createRenderbuffer();
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	var tex = new Uint8Array(width*height*4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, null);
	return [frameBuffer,renderBuffer,texture];
}

GLGE.Filter2d.prototype.getFrameBuffer=function(gl){
	if(!this.passes) return null;
	
	if(!this.gl) this.gl=gl;
	if(!this.buffers){
		this.buffers=this.createBuffer(gl);
	}
	return this.buffers[0];
}

GLGE.Filter2d.prototype.getDepthBuffer=function(gl){
	if(!this.passes) return null;
	
	if(!this.gl) this.gl=gl;
	if(!this.depthBuffers){
		this.depthBuffers=this.createBuffer(gl,this.setDepthBufferWidth(),this.setDepthBufferHeight());
	}
	return this.depthBuffers[0];
}

GLGE.Filter2d.prototype.setDepthBufferWidth=function(value){
	this.depthBufferWidth=value;
	this.depthBuffers=null;
}
GLGE.Filter2d.prototype.getDepthBufferWidth=function(){
	return (this.depthBufferWidth ? this.depthBufferWidth : this.gl.canvas.width);
}

GLGE.Filter2d.prototype.setDepthBufferHeight=function(value){
	this.depthBufferHeight=value;
	this.depthBuffers=null;
}
GLGE.Filter2d.prototype.getDepthBufferHeight=function(){
	return (this.depthBufferHeight ? this.depthBufferHeight : this.gl.canvas.height);
}

GLGE.Filter2d.prototype.setNormalBufferWidth=function(value){
	this.normalBufferWidth=value;
	this.normalBuffers=null;
}
GLGE.Filter2d.prototype.getNormalBufferWidth=function(){
	return (this.normalBufferWidth ? this.normalBufferWidth : this.gl.canvas.width);
}

GLGE.Filter2d.prototype.setNormalBufferHeight=function(value){
	this.normalBufferHeight=value;
	this.normalBuffers=null;
}
GLGE.Filter2d.prototype.getNormalBufferHeight=function(){
	return (this.normalBufferHeight ? this.normalBufferHeight : this.gl.canvas.height);
}

GLGE.Filter2d.prototype.getNormalBuffer=function(gl){
	if(!this.passes) return null;
	
	if(!this.gl) this.gl=gl;
	if(!this.normalBuffers){
		this.normalBuffers=this.createBuffer(gl,this.getNormalBufferWidth(),this.getNormalBufferHeight());
	}
	return this.normalBuffers[0];
}

GLGE.Filter2d.prototype.setUniform=function(type,name,value){
	if(!this.uniforms) this.uniforms={};
	this.uniforms[name]={type:type,value:value};
}
GLGE.Filter2d.prototype.getUniform=function(name){
	if(!this.uniforms) this.uniforms={};
	return this.uniforms[name].value
}
GLGE.Filter2d.prototype.getUniformType=function(name){
	if(!this.uniforms) this.uniforms={};
	return this.uniforms[name].type;
}

GLGE.Filter2d.prototype.addPassFile=function(url){
	var req = new XMLHttpRequest();
    var filter=this;
	if(req) {
		req.open("GET", url, false);
		req.send("");
		filter.addPass(req.responseText);
	}	
}

GLGE.Filter2d.prototype.addPass=function(GLSL,width,height){
	if(!this.passes) this.passes=[];
	this.passes.push({GLSL:GLSL,height:height,width:width});
}

//does all passes and renders result to screen
GLGE.Filter2d.prototype.GLRender=function(gl,buffer){
	if(!buffer) buffer=null;
	if(this.passes){
		for(var i=0;i<this.passes.length;i++){
			//set the frame buffer here
			if(this.passes.length-1==i){
				gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
			}else{
				if(!this.passes[i].buffer) this.passes[i].buffer=this.createBuffer(gl,this.passes[i].width,this.passes[i].height);
				gl.bindFramebuffer(gl.FRAMEBUFFER, this.passes[i].buffer[0]);
			}
			var width=(this.passes[i].width ? this.passes[i].width : gl.canvas.width);
			var height=(this.passes[i].height ? this.passes[i].height : gl.canvas.height);
			gl.viewport(0,0,width,height);
			gl.clearDepth(1.0);
			gl.depthFunc(gl.LEQUAL);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.DEPTH_BUFFER_BIT);
			
			if(!this.passes[i].program){
				this.passes[i].program=this.GLCreateShader(gl,this.passes[i].GLSL);
			}
			gl.useProgram(this.passes[i].program);
			
			for(var j=0; j<8; j++) gl.disableVertexAttribArray(j);
			attribslot=GLGE.getAttribLocation(gl,this.passes[i].program, "position");
			if(!this.posBuffer) this.createPlane(gl);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
			gl.enableVertexAttribArray(attribslot);
			gl.vertexAttribPointer(attribslot, this.posBuffer.itemSize, gl.FLOAT, false, 0, 0);
			this.GLSetUniforms(gl,i);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
			gl.drawElements(gl.TRIANGLES, this.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
		}
	}
}

GLGE.Filter2d.prototype.GLSetUniforms=function(gl,pass){
	for(key in this.uniforms){
		var uniform=this.uniforms[key];
		if(uniform.type=="Matrix4fv"){
			GLGE.setUniformMatrix(gl,"Matrix4fv",GLGE.getUniformLocation(gl,this.passes[pass].program, key),false,uniform.value);
		}else{
			GLGE.setUniform(gl,uniform.type,GLGE.getUniformLocation(gl,this.passes[pass].program, key),uniform.value);
		}
	}

	var tidx=1;
	gl.activeTexture(gl["TEXTURE0"]);
	gl.bindTexture(gl.TEXTURE_2D, this.buffers[2]);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.passes[pass].program, "GLGE_RENDER"), 0);
	
	if(this.renderDepth){
		gl.activeTexture(gl["TEXTURE"+tidx]);
		gl.bindTexture(gl.TEXTURE_2D, this.depthBuffers[2]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.passes[pass].program, "GLGE_DEPTH"), tidx);
		tidx++;
	}
	
	if(this.renderNormal){
		gl.activeTexture(gl["TEXTURE"+tidx]);
		gl.bindTexture(gl.TEXTURE_2D, this.normalBuffers[2]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.passes[pass].program, "GLGE_NORMAL"), tidx);
		tidx++;
	}
	
	for(var i=0;i<pass;i++){
		gl.activeTexture(gl["TEXTURE"+tidx]);
		gl.bindTexture(gl.TEXTURE_2D, this.passes[i].buffer[2]);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.passes[pass].program, "GLGE_PASS"+i), tidx);
		tidx++;
	}
	
	if(!this.textures) this.textures=[];
	for(var i=0; i<this.textures.length;i++){
		gl.activeTexture(gl["TEXTURE"+(i+tidx)]);
		this.textures[i].doTexture(gl,null);
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.passes[pass].program, "TEXTURE"+i), i+tidx);
	}
}

/**
* creates the screen aligned plane mesh
* @private
*/
GLGE.Filter2d.prototype.createPlane=function(gl){
	//create the vertex positions
	if(!this.posBuffer) this.posBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1,1,0.5,-1,1,0.5,-1,-1,0.5,1,-1,0.5]), gl.STATIC_DRAW);
	this.posBuffer.itemSize = 3;
	this.posBuffer.numItems = 4;
	//create the faces
	if(!this.GLfaces) this.GLfaces = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,2,3,0]), gl.STATIC_DRAW);
	this.GLfaces.itemSize = 1;
	this.GLfaces.numItems = 6;
}

/**
* Creates a shader program
* @private
*/
GLGE.Filter2d.prototype.GLCreateShader=function(gl,fragStr){
	//Vertex Shader
	var vertexStr=[];
	vertexStr.push("attribute vec3 position;\n");
	vertexStr.push("varying vec2 texCoord;\n");
	
	vertexStr.push("void main(void){\n");
	vertexStr.push("texCoord=(position.xy+vec2(1.0,1.0))/2.0;\n");    
	vertexStr.push("gl_Position = vec4(position.xyz,1.0);\n");
	vertexStr.push("}\n");
	
	var GLVertexShader=GLGE.getGLShader(gl,gl.VERTEX_SHADER,vertexStr.join(""));
	var GLFragmentShader=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,fragStr);

	return GLGE.getGLProgram(gl,GLVertexShader,GLFragmentShader);
}

})(GLGE);
/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.
 
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
 
 /**
 * @fileOverview
 * @name glge_collada.js
 * @author me@paulbrunt.co.uk
 */
 
if(typeof(GLGE) == "undefined"){
	/**
	* @namespace Holds the functionality of the library
	*/
	GLGE = {};
}

(function(GLGE){
 GLGE.ColladaDocuments=[];
 

 
 
/**
* @class Class to represent a collada object
* @augments GLGE.Group
*/
GLGE.Collada=function(){
	this.children=[];
	this.actions={};
	this.boneIdx=0;
	this.actionsIdx=0;
};
GLGE.augment(GLGE.Group,GLGE.Collada);
GLGE.Collada.prototype.type=GLGE.G_NODE;
GLGE.Collada.prototype.useLights=false;
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.Collada.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,7)=="https://"){
		return path;
	}
	else
	{
		if(!relativeto){
			relativeto=window.location.href;
		}
		//find the path compoents
		var bits=relativeto.split("/");
		var domain=bits[2];
		var proto=bits[0];
		var initpath=[];
		for(var i=3;i<bits.length-1;i++){
			initpath.push(bits[i]);
		}
		//relative to domain
		if(path.substr(0,1)=="/"){
			initpath=[];
		}
		var locpath=path.split("/");
		for(i=0;i<locpath.length;i++){
			if(locpath[i]=="..") initpath.pop();
				else if(locpath[i]!="") initpath.push(locpath[i]);
		}
		return proto+"//"+domain+"/"+initpath.join("/");
	}
}
/**
* function to get the element with a specified id
* @param {string} id the id of the element
* @private
*/
GLGE.Collada.prototype.getElementById=function(id){
	if(!this.idcache){
		var tags=this.getElementsByTagName("*");
		var attribid;
		this.idcache={};
		for(var i=0; i<tags.length;i++){
			attribid=tags[i].getAttribute("id");
			if(attribid!="") this.idcache[attribid]=tags[i];
		}
	}
	return this.idcache[id];
}


/**
* function extracts a javascript array from the document
* @param {DOM Element} node the value to parse
* @private
*/
GLGE.Collada.prototype.parseArray=function(node){
	var value;
	var child=node.firstChild;
	var prev="";
	var output=[];
	var currentArray;
	var i;
	while(child){
		currentArray=(prev+child.nodeValue).replace(/\s+/g," ").replace(/^\s+/g,"").split(" ");
		child=child.nextSibling;
		if(currentArray[0]=="") currentArray.unshift();
		if(child) prev=currentArray.pop();
		for(i=0;i<currentArray.length;i++) if(currentArray[i]!="") output.push(currentArray[i]);
	}
	return output;
};

/**
* determine if this is a sketchupfile
* @private
*/
GLGE.Collada.prototype.isSketchupFile = function() {
    var asset=this.xml.getElementsByTagName("asset");
    if (!asset || asset.length==0)
        return false;
    for (var i=0;i<asset.length;++i){
        var contributor=asset[i].getElementsByTagName("contributor");
        if (!contributor || contributor.length==0)
            return false;
        for (var j=0;j<contributor.length;++j) {
            var authoring=contributor[j].getElementsByTagName("authoring_tool");
            if (!authoring || authoring.length==0)
                return false;
            for (var k=0;k<authoring.length;++k) {    
                var tool=authoring[k].firstChild.nodeValue;
                if (tool.indexOf("Google")==0) {
                    return true;
                }
            }
        }        
    }
    return false;
};

/**
* set flag indicating if lights should be extracted from the collada document
* @param {boolean} node the value to parse
*/
GLGE.Collada.prototype.setUseLights=function(uselights){
	this.useLights=uselights;
	return this;
}
/**
* get flag indicating if lights should be extracted from the collada document
* @returns {boolean} node the value to parse
*/
GLGE.Collada.prototype.getUseLights=function(uselights){
	return this.useLights;
}

/**
* loads an collada file from a given url
* @param {DOM Element} node the value to parse
* @param {string} relativeTo optional the path the url is relative to
*/
GLGE.Collada.prototype.setDocument=function(url,relativeTo,cb){
	this.url=url;
    this.loadedCallback=cb;
	//use # to determine the is of the asset to extract
	if(url.indexOf("#")!=-1){
		this.rootId=url.substr(url.indexOf("#")+1);
		url=url.substr(0,url.indexOf("#"));
	}
	if(relativeTo) url=this.getAbsolutePath(url,relativeTo);
	this.docURL=url;
	if(GLGE.ColladaDocuments[url]){
		this.xml=GLGE.ColladaDocuments[url];
	}else{
		var req = new XMLHttpRequest();
		if(req) {
			req.overrideMimeType("text/xml")
			var docurl=url;
			var docObj=this;
			req.onreadystatechange = function() {
				if(this.readyState  == 4)
				{
					if(this.status  == 200 || this.status==0){
						this.responseXML.getElementById=docObj.getElementById;
						docObj.loaded(docurl,this.responseXML);
					}else{ 
						GLGE.error("Error loading Document: "+docurl+" status "+this.status);
					}
				}
			};
			req.open("GET", url, true);
			req.send("");
		}	
	}
};

/**
* gets data for a given source element
* @param {string} id the id of the source element
* @private
*/
GLGE.Collada.prototype.getSource=function(id){
	var element=this.xml.getElementById(id);
    if (!element )
        return []
	if(!element.jsArray || this.badAccessor){
		var value;
		if(element.tagName=="vertices"){
			value=[];
			var inputs=element.getElementsByTagName("input");
			for(var i=0;i<inputs.length;i++){
				value[i]=this.getSource(inputs[i].getAttribute("source").substr(1));
				value[i].block=inputs[i].getAttribute("semantic");
			}
		}else{
			var accessor=element.getElementsByTagName("technique_common")[0].getElementsByTagName("accessor")[0];
			var sourceArray=this.xml.getElementById(accessor.getAttribute("source").substr(1));
			var type=sourceArray.tagName;
			value=this.parseArray(sourceArray);
			stride=parseInt(accessor.getAttribute("stride"));
			offset=parseInt(accessor.getAttribute("offset"));
			if(!offset) offset=0;
			if(!stride) stride=1;
			count=parseInt(accessor.getAttribute("count"));
			var params=accessor.getElementsByTagName("param");
			var pmask=[];
			for(var i=0;i<params.length;i++){if(params[i].hasAttribute("name") || this.exceptions.badAccessor || this.badAccessor) pmask.push({type:params[i].getAttribute("type"),name:params[i].getAttribute("name")}); else pmask.push(false);}
			value={array:value,stride:stride,offset:offset,count:count,pmask:pmask,type:type};
		}	

		element.jsArray=value;
	}
	
	return element.jsArray;
};


var meshCache={};
/**
* Creates a new object and added the meshes parse in the geomertry
* @param {string} id id of the geomerty to parse
* @private
*/
GLGE.Collada.prototype.getMeshes=function(id,skeletonData){
	if(!meshCache[this.url]) meshCache[this.url]=[];
	if(meshCache[this.url][id]) return meshCache[this.url][id];
	
	var i,n;
	var mesh;
	var inputs;
	var inputArray;		
	var vertexJoints;
	var vertexWeights;
	var faces;
	var outputData;
	var block;
	var set;
	var rootNode=this.xml.getElementById(id);
    if (!rootNode) {
        GLGE.error("Collada.getMeshes returning [], id: " + id);
        return [];        
    }
    var temp = rootNode.getElementsByTagName("mesh");
    if (!temp){
        GLGE.error("Collada.getMeshes returning [], id: " + id);
        return [];        
    }
    meshNode = null;
    if (temp.length) {
        meshNode = temp[0];
    }
    else {
        GLGE.error("Collada.getMeshes returning [], id: " + id);
    }
	var meshes=[];
	if(!meshNode) return meshes;
	
	//convert polylists to triangles my head hurts now :-(
	var polylists=meshNode.getElementsByTagName("polylist");
	for(i=0;i<polylists.length;i++){
		faces=this.parseArray(polylists[i].getElementsByTagName("p")[0]);
		vcount=this.parseArray(polylists[i].getElementsByTagName("vcount")[0]);
		var inputcount=polylists[i].getElementsByTagName("input");
		var maxoffset=0;
		for(n=0;n<inputcount.length;n++) maxoffset=Math.max(maxoffset,inputcount[n].getAttribute("offset"));
		var tris=[];
		var cnt=0;
		for(n=0;n<vcount.length;n++){
		
			for(j=0; j<vcount[n]-2;j++){
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+1)+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+2)+k]);
				}
			}
			cnt=cnt+(maxoffset+1)*vcount[n];
		}
		polylists[i].getElementsByTagName("p")[0].data=tris;
	}
	
	//convert polygons to tris
	var polygons=meshNode.getElementsByTagName("polygons");
	for(i=0;i<polygons.length;i++){
		var polys=polygons[i].getElementsByTagName("p");
		var tris=[];
		for(var l=0;l<polys.length;l++){
			var faces=this.parseArray(polys[l]);
			var inputcount=polygons[i].getElementsByTagName("input");
			var maxoffset=0;
			for(n=0;n<inputcount.length;n++) maxoffset=Math.max(maxoffset,inputcount[n].getAttribute("offset"));
			var cnt=0;
			for(j=0; j<(faces.length/(maxoffset+1))-2;j++){
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+1)+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+2)+k]);
				}
			}
			cnt=cnt+(maxoffset+1)*(faces.length/(maxoffset+1));
		}
		if(polys.length>0) polygons[i].getElementsByTagName("p")[0].data=tris;
	}
	
	
	//create a mesh for each set of faces
	var triangles=[];
	var tris=meshNode.getElementsByTagName("triangles");
	for(i=0;i<polylists.length;i++){triangles.push(polylists[i])};
	for(i=0;i<polygons.length;i++){if(polygons[i].getElementsByTagName("p").length>0) triangles.push(polygons[i])};
	for(i=0;i<tris.length;i++){triangles.push(tris[i])};
	
	for(i=0;i<triangles.length;i++){
		//go though the inputs to get the data layout
		inputs=triangles[i].getElementsByTagName("input");
		vertexJoints=[];
		vertexWeights=[];
		inputArray=[];
		outputData={};
		for(n=0;n<inputs.length;n++){
			inputs[n].data=this.getSource(inputs[n].getAttribute("source").substr(1));
			block=inputs[n].getAttribute("semantic");
			if(block=="TEXCOORD"){
					set=inputs[n].getAttribute("set");
					if(!set) set=0;
					block=block+set;
			}
			if(block=="VERTEX"){
				for(var l=0;l<inputs[n].data.length;l++){
					outputData[inputs[n].data[l].block]=[];
				}
			}
			inputs[n].block=block;
			inputs[n].offset=parseInt(inputs[n].getAttribute("offset"));
			outputData[block]=[];
			inputArray.push(inputs[n]);
			//inputArray[inputs[n].getAttribute("offset")]=inputs[n];
		}
		//get the face data and push the data into the mesh
		if(triangles[i].getElementsByTagName("p")[0].data) faces=triangles[i].getElementsByTagName("p")[0].data;
			else faces=this.parseArray(triangles[i].getElementsByTagName("p")[0]);

		for(var n=0;n<inputArray.length;n++){
			if(inputArray[n].block!="VERTEX"){
				inputArray[n].data=[inputArray[n].data];
				inputArray[n].data[0].block=inputArray[n].block;
			}
		}
		
		//get max offset
		var maxoffset=0;
		for(n=0;n<inputArray.length;n++){
			maxoffset=Math.max(inputArray[n].offset+1,maxoffset);
		}
		
		for(j=0;j<faces.length;j=j+maxoffset){
			for(n=0;n<inputArray.length;n++){
				for(var l=0;l<inputArray[n].data.length;l++){
					var block=inputArray[n].data[l].block;
					var pcnt=inputArray[n].data[l].stride;
					for(k=0;k<inputArray[n].data[l].stride;k++){
						if(inputArray[n].data[l].pmask[k]){
							outputData[block].push(inputArray[n].data[l].array[faces[j+inputArray[n].offset]*inputArray[n].data[l].stride+k+inputArray[n].data[l].offset]);
						}
					}
					if(skeletonData && block=="POSITION"){
						for(k=0;k<skeletonData.count;k++){
							vertexJoints.push(skeletonData.vertexJoints[faces[j+inputArray[n].offset]*skeletonData.count+k]);
							vertexWeights.push(skeletonData.vertexWeight[faces[j+inputArray[n].offset]*skeletonData.count+k]);
						}
					}
					//account for 1D and 2D
					if(block=="POSITION" && pcnt==1) {outputData[block].push(0);outputData[block].push(0);}
					if(block=="POSITION" && pcnt==2) outputData[block].push(0);
					//we can't handle 3d texcoords at the moment so try two
					if(block=="TEXCOORD0" && pcnt==3) outputData[block].pop();
					if(block=="TEXCOORD1" && pcnt==3) outputData[block].pop();
				}
			}
		}
		
		//create faces array
		faces=[];
		//create mesh
        var windingOrder=GLGE.Mesh.WINDING_ORDER_CLOCKWISE;
		if(!outputData.NORMAL){
            console.log("Autogenerating normals, do not know facings");
			outputData.NORMAL=[];
			for(n=0;n<outputData.POSITION.length;n=n+9){
				var vec1=GLGE.subVec3([outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]],[outputData.POSITION[n+3],outputData.POSITION[n+4],outputData.POSITION[n+5]]);
				var vec2=GLGE.subVec3([outputData.POSITION[n+6],outputData.POSITION[n+7],outputData.POSITION[n+8]],[outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]]);
				var vec3=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.toUnitVec3(vec2),GLGE.toUnitVec3(vec1)));
				outputData.NORMAL.push(vec3[0]);
				outputData.NORMAL.push(vec3[1]);
				outputData.NORMAL.push(vec3[2]);
				outputData.NORMAL.push(vec3[0]);
				outputData.NORMAL.push(vec3[1]);
				outputData.NORMAL.push(vec3[2]);
				outputData.NORMAL.push(vec3[0]);
				outputData.NORMAL.push(vec3[1]);
				outputData.NORMAL.push(vec3[2]);
			}
            var len=outputData.POSITION.length/3;
         	for(n=0;n<len;n++) faces.push(n);   
		}else {
            windingOrder=GLGE.Mesh.WINDING_ORDER_CLOCKWISE;
			for(n=0;n<outputData.POSITION.length;n=n+9){
				var vec1=GLGE.subVec3([outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]],[outputData.POSITION[n+3],outputData.POSITION[n+4],outputData.POSITION[n+5]]);
				var vec2=GLGE.subVec3([outputData.POSITION[n+6],outputData.POSITION[n+7],outputData.POSITION[n+8]],[outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]]);
				var vec3=GLGE.crossVec3(vec2,vec1);
                var clockwise_winding_order=0;                
                for (var dp=0;dp<9;dp+=3) {
                    if (
                        vec3[0]*outputData.NORMAL[n+dp]
                        + vec3[1]*outputData.NORMAL[n+dp+1]
                        + vec3[2]*outputData.NORMAL[n+dp+2]<0) {
                        clockwise_winding_order-=1;
                    }else clockwise_winding_order+=1;
                }
                if (clockwise_winding_order<0) {
                    var len=outputData.POSITION.length/3;
                    faces.push(n/3);
                    faces.push(n/3+2);
                    faces.push(n/3+1);//invert
                }else {
	                faces.push(n/3);
                    faces.push(n/3+1);
                    faces.push(n/3+2);
                }
            }
        }

        if (!this.isSketchupFile())
            windingOrder=GLGE.Mesh.WINDING_ORDER_UNKNOWN;
		function min(a,b){
            return (a>b?b:a);
        }
        var MAXVERTS=21843;
        MAXVERTS*=3;//always must be a multiple of 3 (3 vertices)
        var nummesh=((faces.length-faces.length%MAXVERTS)/MAXVERTS)+(faces.length%MAXVERTS?1:0);
		var trimesh=[];
        var vstride=3;
        var nstride=3;
        var tstride=2;
        for (var index=0;index<nummesh;++index) {
            trimesh.push(new GLGE.Mesh(undefined,windingOrder));
		    trimesh[index].setPositions(outputData.POSITION.slice(MAXVERTS*index*vstride,min(MAXVERTS*vstride*(index+1),outputData.POSITION.length)));
		    trimesh[index].setNormals(outputData.NORMAL.slice(MAXVERTS*index*nstride,min(MAXVERTS*(index+1)*nstride,outputData.POSITION.length)));
		    
		    if(outputData.TEXCOORD0) trimesh[index].setUV(outputData.TEXCOORD0.slice(MAXVERTS*index*tstride,min(MAXVERTS*(index+1)*tstride,outputData.TEXCOORD0.length)));
		    if(!outputData.TEXCOORD0 && outputData.TEXCOORD1) trimesh[index].setUV(outputData.TEXCOORD1.slice(MAXVERTS*index*tstride,min(MAXVERTS*(index+1)*tstride,outputData.TEXCOORD1.length)));
		    if(outputData.TEXCOORD1) trimesh[index].setUV2(outputData.TEXCOORD1.slice(MAXVERTS*index*tstride,min(MAXVERTS*(index+1)*tstride,outputData.TEXCOORD1.length)));
        }

		if(skeletonData){
			if(skeletonData.count>8){
				var newjoints=[];
				var newweights=[];
				for(var j=0;j<vertexWeights.length;j=j+skeletonData.count){
					var tmp=[];
					for(k=0;k<skeletonData.count;k++){
						tmp.push({weight:vertexWeights[j+k],joint:vertexJoints[j+k]});
					}
					tmp.sort(function(a,b){return parseFloat(b.weight)-parseFloat(a.weight)});
					for(k=0;k<8;k++){
						newjoints.push(tmp[k].joint);
						newweights.push(tmp[k].weight);
					}
				}
				vertexJoints=newjoints;
				vertexWeights=newweights;
				skeletonData.count=8;
			}
            for (var index=0;index<nummesh;++index) {			
			    trimesh[index].setJoints(skeletonData.joints);
			    trimesh[index].setInvBindMatrix(skeletonData.inverseBindMatrix);
                var maxval=min(MAXVERTS*(index+1)*skeletonData.count,vertexJoints.length);
                var minval=MAXVERTS*index*skeletonData.count;
			    trimesh[index].setVertexJoints(vertexJoints.slice(minval,maxval),skeletonData.count);
			    trimesh[index].setVertexWeights(vertexWeights.slice(minval,maxval),skeletonData.count);
            }
		}
        for (var index=0;index<nummesh;++index) {		
		    trimesh[index].setFaces(faces.slice(0,min(MAXVERTS*(index+1),faces.length)-MAXVERTS*(index)));
		    trimesh[index].matName=triangles[i].getAttribute("material");
            
		    meshes.push(trimesh[index]);
        }
	}
	meshCache[this.url][id]=meshes;
	return meshes;
};

/**
* Gets the float4 parameter for a shader
* @private
*/
GLGE.Collada.prototype.getFloat4=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			return params[i].getElementsByTagName("float4")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}

/**
* Gets the float parameter for a shader
* @private
*/
GLGE.Collada.prototype.getFloat=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			return params[i].getElementsByTagName("float")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}

/**
* Gets the sampler for a texture
* @private
*/
GLGE.Collada.prototype.getSampler=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			//only do 2d atm.
			return params[i].getElementsByTagName("sampler2D")[0].getElementsByTagName("source")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}
/**
* Gets the surface for a texture
* @private
*/
GLGE.Collada.prototype.getSurface=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			return params[i].getElementsByTagName("surface")[0].getElementsByTagName("init_from")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}

/**
* Gets the the collada image location
* @private
*/
GLGE.Collada.prototype.getImage=function(id){
	var image=this.xml.getElementById(id);
	if(!image) return;
	return this.getAbsolutePath(image.getElementsByTagName("init_from")[0].firstChild.nodeValue,this.docURL);

}

/**
* creates a material layer
* @private
*/
GLGE.Collada.prototype.createMaterialLayer=function(node,material,common,mapto,bvi){
	var textureImage;
	var imageid=this.getSurface(common,this.getSampler(common,node.getAttribute("texture")));
	if(!imageid) imageid=node.getAttribute("texture"); //assume converter bug  - workround
	textureImage=this.getImage(imageid);
	var texture=new GLGE.Texture();
	texture.setSrc(textureImage);
	material.addTexture(texture);
	var layer=new GLGE.MaterialLayer();
	layer.setTexture(texture);
	layer.setMapto(mapto);
	if(node.hasAttribute("texcoord") && bvi[node.getAttribute("texcoord")]){
		if(bvi[node.getAttribute("texcoord")]==1) {
			layer.setMapinput(GLGE.UV2);
		}else if (bvi[node.getAttribute("texcoord")]==0) {
			layer.setMapinput(GLGE.UV1);
		} else {
            GLGE.error("GLGE only supports 2 texture sets\n");
			layer.setMapinput(GLGE.UV1);
        }
	}else {
        GLGE.error("Collada material does not specify texture coordinates, but it may have them: defaulting to set 0\n");
        
        layer.setMapinput(GLGE.UV1);
    }
	if(node.getElementsByTagName("blend_mode")[0]) var blend=node.getElementsByTagName("blend_mode")[0].firstChild.nodeValue;
	if(blend=="MULTIPLY")  layer.setBlendMode(GLGE.BL_MUL);
	material.addMaterialLayer(layer);
}


/**
 * Function will get element by id starting from specified node.
 * Author: Renato Bebić <renato.bebic@gmail.com>
 *
 * The material getter below borked if there is e.g. a scene node with the same name as the material.
 * This is used to fix that by only looking for materials in the library_materials element.
 */
function getChildElementById( dNode, id ) {

	var dResult = null;

	if ( dNode.getAttribute('id') == id )
		return dNode;

	for ( var i = 0; i < dNode.childNodes.length; i++ ) {
		if ( dNode.childNodes[i].nodeType == 1 ) {
                        dResult = getChildElementById( dNode.childNodes[i], id ); //note: 1-level deep would suffice here, doesn't need to recurse into further childs. but this works.
                        if ( dResult != null )
				break;
		}
	}

	return dResult;
}

var MaterialCache={};

/**
* Gets the sampler for a texture
* @param {string} id the id or the material element
* @private
*/
GLGE.Collada.prototype.getMaterial=function(id,bvi){	
	if(!MaterialCache[this.url]) MaterialCache[this.url]={};
	if(MaterialCache[this.url][id]){
		return MaterialCache[this.url][id];
	}
	
    	var materialLib=this.xml.getElementsByTagName("library_materials")[0];
	var materialNode=getChildElementById(materialLib, id); //this.xml.getElementById(id);
    if (!materialNode) {
        var returnMaterial=new GLGE.Material();
	    MaterialCache[this.url][id]=returnMaterial;        
        return returnMaterial;
    }
	var effectid=materialNode.getElementsByTagName("instance_effect")[0].getAttribute("url").substr(1);
	var effect=this.xml.getElementById(effectid);
	var common=effect.getElementsByTagName("profile_COMMON")[0];
	//glge only supports one technique currently so try and match as best we can
	var technique=common.getElementsByTagName("technique")[0];
	var returnMaterial=new GLGE.Material();
	returnMaterial.setSpecular(0);
	
	MaterialCache[this.url][id]=returnMaterial;
	
	var child;
	var color;
	
	
	//do ambient lighting
	var ambient=technique.getElementsByTagName("ambient");
	if(ambient.length>0){
		child=ambient[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					returnMaterial.setAmbient({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					returnMaterial.setAmbient({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_AMBIENT,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do diffuse color
	var diffuse=technique.getElementsByTagName("diffuse");
	if(diffuse.length>0){
		child=diffuse[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					returnMaterial.setColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					returnMaterial.setColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_COLOR,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}
	
	
	var bump=technique.getElementsByTagName("bump");
	if(bump.length>0){
		child=bump[0].firstChild;
		do{
			switch(child.tagName){
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_NOR,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do shininess
	var shininess=technique.getElementsByTagName("shininess");
	if(shininess.length>0){
		returnMaterial.setSpecular(1);
		child=technique.getElementsByTagName("shininess")[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
					if(parseFloat(child.firstChild.nodeValue)>1) returnMaterial.setShininess(parseFloat(child.firstChild.nodeValue));
						else  returnMaterial.setShininess(parseFloat(child.firstChild.nodeValue)*128);
					break;
				case "param":
					var value=parseFloat(this.getFloat(common,child.getAttribute("ref")));
					if(value>1) returnMaterial.setShininess(value);
						else    returnMaterial.setShininess(value*128);
					break;
                // MCB: texture is invalid here. should remove this case.
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_SHINE,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do specular color
	var specular=technique.getElementsByTagName("specular");
	if(specular.length>0){
		returnMaterial.setSpecular(1);
		child=specular[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					returnMaterial.setSpecularColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					returnMaterial.setSpecularColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_SPECCOLOR,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}

	//do reflectivity
	/*
	var reflectivity=technique.getElementsByTagName("reflectivity");
	if(reflectivity.length>0){
		child=reflectivity[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
					//returnMaterial.setReflectivity(parseFloat(child.firstChild.nodeValue))
					break;
				case "param":
					//returnMaterial.setReflectivity(parseFloat(this.getFloat(common,child.getAttribute("ref"))));
					break;
                // MCB: texture is invalid here. should remove this case.
				case "texture":
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.getImage(imageid);
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					returnMaterial.addMaterialLayer(new GLGE.MaterialLayer(texture,GLGE.M_REFLECT,GLGE.UV1));
					break;
			}
		}while(child=child.nextSibling);
	}*/
	
	//do emission color
	var emission=technique.getElementsByTagName("emission");
	if(emission.length>0){
		child=emission[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.split(" ");
					returnMaterial.setEmit(color[0]);
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).split(" ");
					returnMaterial.setEmit(color[0]);
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_EMIT,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}

	//do reflective color
	var reflective=technique.getElementsByTagName("reflective");
	if(reflective.length>0){
		child=reflective[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
//TODO				returnMaterial.setReflectiveColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
//TODO				returnMaterial.setReflectiveColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_REFLECT,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}

	//do transparency
	var transparency=technique.getElementsByTagName("transparency");
	if(transparency.length>0){
		child=transparency[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
//TODO				returnMaterial.setTransparency(parseFloat(child.firstChild.nodeValue))
					break;
				case "param":
//TODO                    	returnMaterial.setTransparency(parseFloat(this.getFloat(common,child.getAttribute("ref"))));
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do transparent color
	var transparent=technique.getElementsByTagName("transparent");
	if(transparent.length>0){
        var opaque=transparent[0].getAttribute("opaque");
        if(!opaque) opaque="A_ONE"; // schema default
        
		child=transparent[0].firstChild;
		do{
			switch(child.tagName){
                // MCB: float is invalid here. should remove this case.
				case "float":
					var alpha=parseFloat(child.firstChild.nodeValue);
					if(alpha<1){
						returnMaterial.setAlpha(parseFloat(child.firstChild.nodeValue));
						returnMaterial.trans=true;
					}
					break;
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					var alpha=this.getMaterialAlpha(color,opaque,1);
//TODO                    	var alpha=this.getMaterialAlpha(color,opaque,returnMaterial.getTransparency());
					if(alpha<1){
						returnMaterial.setAlpha(alpha);
						returnMaterial.trans=true;
					}
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					var alpha=this.getMaterialAlpha(color,opaque,1);
//TODO                    	var alpha=this.getMaterialAlpha(color,opaque,returnMaterial.getTransparency());
					if(alpha<1){
						returnMaterial.setAlpha(alpha);
						returnMaterial.trans=true;
					}
					break;
                // MCB: this case assumes opaque="A_ONE" and transparency="1.0"
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_ALPHA,bvi);
					returnMaterial.trans=true;
					break;
			}
		}while(child=child.nextSibling);
	}

	return returnMaterial;
};

/**
* gets the material alpha from the transparent color
* @param {color} the transparent color
* @param {opaque} the transparent color opaque attribute value
* @param {transparency} the transparency value
* @private
*/
GLGE.Collada.prototype.getMaterialAlpha=function(color,opaque,transparency){
    var returnAlpha;

    switch(opaque){
        case "A_ONE":
            returnAlpha=parseFloat(color[3])*transparency;
            break;
        case "A_ZERO":
            returnAlpha=1-parseFloat(color[3])*transparency;
            break;
        case "RGB_ONE":
            var luminance=parseFloat(color[0])*0.212671
                         +parseFloat(color[1])*0.715160
                         +parseFloat(color[2])*0.072169;
            returnAlpha=luminance*transparency;
            break;
        case "RGB_ZERO":
            var luminance=parseFloat(color[0])*0.212671
                         +parseFloat(color[1])*0.715160
                         +parseFloat(color[2])*0.072169;
            returnAlpha=1-luminance*transparency;
            break;
    }
    return returnAlpha;
};


GLGE.Collada.prototype.setMaterialOntoMesh=function(meshes,node) {
	var materials=node.getElementsByTagName("instance_material");
	var objMaterials={};
	for(var i=0; i<materials.length;i++){
		var bvis=materials[i].getElementsByTagName("bind_vertex_input");
		var bvi={};
		for(var j=0;j<bvis.length;j++){
			if (bvis[j].hasAttribute("input_set")) {
				bvi[bvis[j].getAttribute("semantic")]=bvis[j].getAttribute("input_set");					
			}else {//the exporter is buggy eg VCGLab | MeshLab and does not specify input_set
				function getLastNumber(str){
					var retval="";
					for (var i=str.length-1;i>=0;--i)
						if (str[i]>="0"&&str[i]<="9")
							retval=str[i]+retval;
					if (retval.length==0) return "0";
					return retval;
				}
				bvi[bvis[j].getAttribute("semantic")]=getLastNumber(bvis[j].getAttribute("semantic"));
			}
		}
		mat=this.getMaterial(materials[i].getAttribute("target").substr(1),bvi);
		objMaterials[materials[i].getAttribute("symbol")]=mat;
	}
	//create GLGE object
	var obj=new GLGE.Object();
	for(i=0; i<meshes.length;i++){
		if(objMaterials[meshes[i].matName] && objMaterials[meshes[i].matName].trans){
			obj.setZtransparent(true);
			//default to not pickable for transparent objects
			obj.setPickable(false);
		}
		var multimat=new GLGE.MultiMaterial();
		multimat.setMesh(meshes[i]);
		if(!objMaterials[meshes[i].matName]){
			objMaterials[meshes[i].matName]=new GLGE.Material();
			objMaterials[meshes[i].matName].setColor("lightgrey");
		}
		multimat.setMaterial(objMaterials[meshes[i].matName]);
		obj.addMultiMaterial(multimat);
	}
	obj.setSkeleton(this);
	node.GLGEObj=obj;
};

/**
* creates a GLGE Object from a given instance Geomertry
* @param {node} node the element to parse
* @private
*/
GLGE.Collada.prototype.getInstanceGeometry=function(node){
	if(node.GLGEObj && false){
		var obj=new GLGE.ObjectInstance();
		obj.setObject(node.GLGEObj);
		return obj;
	}else{
		var meshes=this.getMeshes(node.getAttribute("url").substr(1));
        this.setMaterialOntoMesh(meshes,node);
		return node.GLGEObj;
	}
};


/**
* creates an array of animation curves
* @param {string} id the id of the sampler
* @private
*/
GLGE.Collada.prototype.getAnimationSampler=function(id,rotation){
	var frameRate=30;
	var inputs=this.xml.getElementById(id).getElementsByTagName("input");
	var outputData={};
	var inputsArray=[];
	var data,block;
	for(var i=0;i<inputs.length;i++){
		//modify get source to return the array and element length
		data=this.getSource(inputs[i].getAttribute("source").substr(1));
		block=inputs[i].getAttribute("semantic");
		inputsArray.push({block:block,data:data});
	}
	for(n=0;n<inputsArray.length;n++){
		block=inputsArray[n].block;
		outputData[block]={};
		outputData[block].data=[];
		outputData[block].names=[];
		for(k=0;k<inputsArray[n].data.array.length;k=k+inputsArray[n].data.stride){
			var pcnt=0;
			for(i=0;i<inputsArray[n].data.pmask.length;i++){
				if(inputsArray[n].data.pmask[i]){
					outputData[block].names.push(inputsArray[n].data.pmask[i].name);
					if(inputsArray[n].data.pmask[i].type=="float4x4"){
						outputData[block].stride=16;
						for(j=0;j<16;j++){
							outputData[block].data.push(inputsArray[n].data.array[j+k+inputsArray[n].data.offset+i]);
						}
					}else{
						pcnt++;
						outputData[block].stride=pcnt;
						outputData[block].data.push(inputsArray[n].data.array[k+inputsArray[n].data.offset+i]);
					}
				}
			}
		}
	}
	//this should return an array of curves
	var point;
	var anim=[];
	for(var i=0; i<outputData["OUTPUT"].stride;i++){
		anim.push(new GLGE.AnimationCurve());
	}
	for(var i=0;i<outputData["INPUT"].data.length;i++){
		for(var j=0;j<outputData["OUTPUT"].stride;j++){
			anim[j].name=outputData["OUTPUT"].names[j];
			//fix if type is bezier and no tangent the fallback to linear
			if(outputData["INTERPOLATION"] && outputData["INTERPOLATION"].data[i]=="BEZIER" && !outputData["IN_TANGENT"]){
				outputData["INTERPOLATION"].data[i]="LINEAR";
			}
			
			if((!outputData["INTERPOLATION"]) || outputData["INTERPOLATION"].data[i]=="LINEAR"){
				point=new GLGE.LinearPoint();
				point.setX(outputData["INPUT"].data[i]*frameRate);
				var val=parseFloat(outputData["OUTPUT"].data[i*outputData["OUTPUT"].stride+j]);
				if(val==-180) val=-179.9;
				if(val==180) val=179.9;
				if(this.exceptions["flipangle"] && rotation){
					if(anim[j].lastval){
						if(Math.abs(anim[j].lastval-(360+val))<Math.abs(anim[j].lastval-val)){
							val=360+val;
						}else if(Math.abs(anim[j].lastval-(val-360))<Math.abs(anim[j].lastval-val)){
							val=val-360;
						}
					}
				}
				point.setY(val);
				anim[j].lastval=val;
				anim[j].addPoint(point);
			}
			
			if(outputData["INTERPOLATION"] && outputData["INTERPOLATION"].data[i]=="BEZIER"){
				point=new GLGE.BezTriple();
				point.setX1(outputData["IN_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2]*frameRate);
				point.setY1(outputData["IN_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2+1]);
				point.setX2(Math.round(outputData["INPUT"].data[i]*frameRate));
				point.setY2(outputData["OUTPUT"].data[i*outputData["OUTPUT"].stride+j]);
				point.setX3(outputData["OUT_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2]*frameRate);
				point.setY3(outputData["OUT_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2+1]);
				anim[j].addPoint(point);			
			}
		}
	}
	return anim;
}

/**
* Gets the animation vector for a node
* @param {object} channels the animation channels effecting this node
* @private
*/
GLGE.Collada.prototype.getAnimationVector=function(channels){
	//I can see no nice way to map a seuqnce of animated transforms onto a single transform 
	//so instead calc transform for each frame then use quat and trans then linear between them
	var maxFrame=0;
	//get the initial state of the target
	var targetNode=this.xml.getElementById(channels[0].target[0]);
	//get the initial transforms for the target node
	var child=targetNode.firstChild;
	var transforms=[];
	var sids={};
	do{
		switch(child.tagName){
			case "matrix":
			case "translate":
			case "rotate":
			case "scale":
				def={type:child.tagName,data:this.parseArray(child),animations:[]};
				if(child.hasAttribute("sid")) sids[child.getAttribute("sid")]=def;
				transforms.push(def);
				break;
		}
		child=child.nextSibling
	}while(child);
	//loop though the animation channels effecting this node
	var anim={};
	for(var i=0;i<channels.length;i++){
		var target=channels[i].target;
		var animcurves=this.getAnimationSampler(channels[i].source,/ANGLE/i.test(target));
		for(j=0;j<animcurves.length;j++){
			maxFrame=Math.max(maxFrame,animcurves[j].keyFrames[animcurves[j].keyFrames.length-1].x);
		}
		if(target[1].indexOf(".")!=-1){
			var splittarget=target[1].split(".");
			switch(splittarget[1]){
				case "X":
					sids[splittarget[0]].animations[0]=animcurves[0];
					break;
				case "Y":
					sids[splittarget[0]].animations[1]=animcurves[0];
					break;
				case "Z":
					sids[splittarget[0]].animations[2]=animcurves[0];
					break;
				case "ANGLE":
					sids[splittarget[0]].animations[3]=animcurves[0];
					break;
			}
		}else if(target[1].indexOf("(")!=-1){
			//do bracket type
			var idx=target[1].split("(");
			sidtarget=idx.shift();
			if(idx.length>1) idx=parseInt(idx[0])+4*parseInt(idx[1]);
				else idx=parseInt(idx[0]);
			sids[sidtarget].animations[idx]=animcurves[0];
		}else{
			//do all
			for(var j=0;j<animcurves.length;j++){
				switch(animcurves[j].name){
					case "X":
						sids[target[1]].animations[0]=animcurves[j];
						break;
					case "Y":
						sids[target[1]].animations[1]=animcurves[j];
						break;
					case "Z":
						sids[target[1]].animations[2]=animcurves[j];
						break;
					case "ANGLE":
						sids[target[1]].animations[3]=animcurves[j];
						break;
					default:
						sids[target[1]].animations[j]=animcurves[j];
						break;
				}
			}
		}
	
	}
	var animVector=new GLGE.AnimationVector();
	animVector.setFrames(maxFrame);
	var quatxcurve=new GLGE.AnimationCurve(); quatxcurve.setChannel("QuatX");
	var quatycurve=new GLGE.AnimationCurve(); quatycurve.setChannel("QuatY");
	var quatzcurve=new GLGE.AnimationCurve(); quatzcurve.setChannel("QuatZ");
	var quatwcurve=new GLGE.AnimationCurve(); quatwcurve.setChannel("QuatW");
	var locxcurve=new GLGE.AnimationCurve(); locxcurve.setChannel("LocX");
	var locycurve=new GLGE.AnimationCurve(); locycurve.setChannel("LocY");
	var loczcurve=new GLGE.AnimationCurve(); loczcurve.setChannel("LocZ");
	var scalexcurve=new GLGE.AnimationCurve(); scalexcurve.setChannel("ScaleX");
	var scaleycurve=new GLGE.AnimationCurve(); scaleycurve.setChannel("ScaleY");
	var scalezcurve=new GLGE.AnimationCurve(); scalezcurve.setChannel("ScaleZ");
	animVector.addAnimationCurve(quatxcurve);
	animVector.addAnimationCurve(quatycurve);
	animVector.addAnimationCurve(quatzcurve);
	animVector.addAnimationCurve(quatwcurve);
	animVector.addAnimationCurve(locxcurve);
	animVector.addAnimationCurve(locycurve);
	animVector.addAnimationCurve(loczcurve);
	animVector.addAnimationCurve(scalexcurve);
	animVector.addAnimationCurve(scaleycurve);
	animVector.addAnimationCurve(scalezcurve);
	var lastQuat=null;
	for(var frame=0; frame<maxFrame;frame++){
		var matrix=GLGE.identMatrix();
		for(var i=0;i<transforms.length;i++){
			//get full transform for this frame
			switch(transforms[i].type){
				case "matrix":
					var matrix_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2]),
						(transforms[i].animations[3] ? transforms[i].animations[3].getValue(frame) : transforms[i].data[3]),
						(transforms[i].animations[4] ? transforms[i].animations[4].getValue(frame) : transforms[i].data[4]),
						(transforms[i].animations[5] ? transforms[i].animations[5].getValue(frame) : transforms[i].data[5]),
						(transforms[i].animations[6] ? transforms[i].animations[6].getValue(frame) : transforms[i].data[6]),
						(transforms[i].animations[7] ? transforms[i].animations[7].getValue(frame) : transforms[i].data[7]),
						(transforms[i].animations[8] ? transforms[i].animations[8].getValue(frame) : transforms[i].data[8]),
						(transforms[i].animations[9] ? transforms[i].animations[9].getValue(frame) : transforms[i].data[9]),
						(transforms[i].animations[10] ? transforms[i].animations[10].getValue(frame) : transforms[i].data[10]),
						(transforms[i].animations[11] ? transforms[i].animations[11].getValue(frame) : transforms[i].data[11]),
						(transforms[i].animations[12] ? transforms[i].animations[12].getValue(frame) : transforms[i].data[12]),
						(transforms[i].animations[13] ? transforms[i].animations[13].getValue(frame) : transforms[i].data[13]),
						(transforms[i].animations[14] ? transforms[i].animations[14].getValue(frame) : transforms[i].data[14]),
						(transforms[i].animations[15] ? transforms[i].animations[15].getValue(frame) : transforms[i].data[15])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.Mat4(matrix_array));
					break;
				case "rotate":
					var rotate_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2]),
						(transforms[i].animations[3] ? transforms[i].animations[3].getValue(frame) : transforms[i].data[3])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.angleAxis(rotate_array[3]*0.017453278,[ rotate_array[0], rotate_array[1], rotate_array[2]]));
					break;
				case "translate":
					var translate_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.translateMatrix(translate_array[0],translate_array[1],translate_array[2]));
					break;
				case "scale":
					var scale_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.scaleMatrix(scale_array[0],scale_array[1],scale_array[2]));
					break;
			}
		}
		scale=GLGE.matrix2Scale(matrix);
		matrix=GLGE.mulMat4(matrix,GLGE.scaleMatrix(1/scale[0],1/scale[1],1/scale[2]));
		//convert to quat and trans and add to the curve
		quat=GLGE.rotationMatrix2Quat(matrix);
		if(lastQuat){
			//make sure we are in the same range as previous!
			if((lastQuat[0]*quat[0]+lastQuat[1]*quat[1]+lastQuat[2]*quat[2]+lastQuat[3]*quat[3])<0){
				quat[0]=quat[0]*-1;
				quat[1]=quat[1]*-1;
				quat[2]=quat[2]*-1;
				quat[3]=quat[3]*-1;
			}
		}
		lastQuat=quat;
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[0]);
		quatxcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[1]);
		quatycurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[2]);
		quatzcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[3]);
		quatwcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(matrix[3]);
		locxcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(matrix[7]);
		locycurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(matrix[11]);
		loczcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(scale[0].toFixed(4));
		scalexcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(scale[1].toFixed(4));
		scaleycurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(scale[2].toFixed(4));
		scalezcurve.addPoint(point);
	}
	//return the animation vector
	/*for(var i=0; i<targetNode.GLGEObjects.length;i++){
		targetNode.GLGEObjects[i].setAnimation(animVector);
		targetNode.GLGEObjects[i].animationStart=0;
		targetNode.GLGEObjects[i].setFrameRate(30);
	}*/
	return animVector;
}

var actionCache={};
/**
* creates an action form the intially animation within the document
* @private
*/
GLGE.Collada.prototype.getAnimations=function(){
	if(actionCache[this.url]){
		this.actions=actionCache[this.url];
	}else{
		var animationClips=this.xml.getElementsByTagName("animation_clip");
		var animations=this.xml.getElementsByTagName("animation");
		if(animationClips.length==0){
			animations.name="default";
			var clips=[animations];
		}else{
			var clips=[];
			for(var i=0;i<animationClips.length;i++){
				var anim=[];
				var instances=animationClips[i].getElementsByTagName("instance_animation");
				for(var j=0;j<instances.length;j++){
					anim.push(this.xml.getElementById(instances[j].getAttribute("url").substr(1)));
				}
				anim.name=animationClips[i].getAttribute("id");
				clips.push(anim);
			}
		}

		for(var k=0;k<clips.length;k++){
			var animations=clips[k];
			var channels,target,source;
			var channelGroups={};
			for(var i=0;i<animations.length;i++){
				channels=animations[i].getElementsByTagName("channel");
				for(var j=0;j<channels.length;j++){
					var target=channels[j].getAttribute("target").split("/");
					source=channels[j].getAttribute("source").substr(1);
					if(!channelGroups[target[0]]) channelGroups[target[0]]=[];
					channelGroups[target[0]].push({source:source,target:target});
				}
			}
			var action=new GLGE.Action();
			for(target in channelGroups){
				var animVector=this.getAnimationVector(channelGroups[target]);
				var targetNode=this.xml.getElementById(target);
				for(var i=0; i<targetNode.GLGEObjects.length;i++){
					var ac=new GLGE.ActionChannel();

					var name=targetNode.GLGEObjects[i].getName();
					ac.setTarget(name);
					ac.setAnimation(animVector);
					action.addActionChannel(ac);
				}
			}
			this.addColladaAction({name:animations.name,action:action});
		}
	}
	actionCache[this.url]=this.actions;
	for(n in this.actions) {this.setAction(this.actions[n],0,true);break}
}
/**
* Adds a collada action
* @param {object} action object hold action info
* @private
*/
GLGE.Collada.prototype.addColladaAction=function(action){
	this.actions[action.name]=action.action;
}
/**
* Gets the available actions from the collada file
* @returns {object} all the available actions within the collada file
*/
GLGE.Collada.prototype.getColladaActions=function(){
	return this.actions;
}


/**
* creates a GLGE Object from a given instance controler
* @param {node} node the element to parse
* @private
*/
GLGE.Collada.prototype.getInstanceController=function(node){
	var obj=new GLGE.Object();
	var controller=this.xml.getElementById(node.getAttribute("url").substr(1));
	var skeletons=node.getElementsByTagName("skeleton");
	var joints=controller.getElementsByTagName("joints")[0];
	var inputs=joints.getElementsByTagName("input");
	var bindShapeMatrix;
	if(controller.getElementsByTagName("bind_shape_matrix").length>0){
		bindShapeMatrix=this.parseArray(controller.getElementsByTagName("bind_shape_matrix")[0]);
	}else{
		//assume identity
		bindShapeMatrix=GLGE.identMatrix();
	}

	var inverseBindMatrix=[bindShapeMatrix];
	var base=new GLGE.Group;
	this.addGroup(base);
	var joints=[base];
	var mat;
	for(var i=0; i<inputs.length;i++){
		if(inputs[i].getAttribute("semantic")=="JOINT"){
			var jointdata=this.getSource(inputs[i].getAttribute("source").substr(1));
			if(jointdata.type=="IDREF_array"){
				var all_items_incorrect=(jointdata.array.length!=0);
				for(var k=0;k<jointdata.array.length;k=k+jointdata.stride){
					var curNode=this.getNode(this.xml.getElementById(jointdata.array[k]),true);
					var name=curNode.getName();
					if (!this.xml.getElementById(jointdata.array[k])) {
						GLGE.error("Bone is not specified "+jointdata.array[k]);
						inverseBindMatrix=[bindShapeMatrix=GLGE.identMatrix()];
					}else all_items_incorrect=false;
					joints.push(name);
				}
				if (all_items_incorrect)
					inverseBindMatrix=[bindShapeMatrix=GLGE.identMatrix()];
			}else if(jointdata.type=="Name_array"){
				var sidArray={};
				var sid,name;
				//is this right controller with no skeleton set, export bug??
				if(skeletons.length==0){
					var elements=this.xml.getElementsByTagName("node");
					for(k=0; k<elements.length;k++){
						sid=elements[k].getAttribute("sid");
						if(sid){
							sidArray[sid]=elements[k];
						}
						name=elements[k].getAttribute("name");
						if(name && !sidArray[name]){
							sidArray[name]=elements[k];
						}
					}
				}else{
					for(var n=0; n<skeletons.length;n++){
						var skeletonElement=this.xml.getElementById(skeletons[n].firstChild.nodeValue.substr(1));
						sid=skeletonElement.getAttribute("sid");
						if(sid) sidArray[sid]=skeletonElement;
						var elements=skeletonElement.getElementsByTagName("*");
						for(k=0; k<elements.length;k++){
							sid=elements[k].getAttribute("sid");
							if(sid){
								sidArray[sid]=elements[k];
							}
							name=elements[k].getAttribute("name");
							if(name && !sidArray[name]){
								sidArray[name]=elements[k];
							}
						}
					}
				}
				for(var k=0;k<jointdata.array.length;k=k+jointdata.stride){
					if(jointdata.array[k]!=""){
						var name=this.getNode(sidArray[jointdata.array[k]],true).getName();
						joints.push(name);
					}
				}
			}

		}
	}
	for(var i=0; i<inputs.length;i++){
		//TODO: sort out correct use of accessors for these source
		if(inputs[i].getAttribute("semantic")=="INV_BIND_MATRIX"){
			var matrixdata=this.getSource(inputs[i].getAttribute("source").substr(1));
			for(var k=0;k<matrixdata.array.length;k=k+matrixdata.stride){
				mat=matrixdata.array.slice(k,k+16);
				inverseBindMatrix.push(GLGE.mulMat4(GLGE.Mat4(mat),GLGE.Mat4(bindShapeMatrix.slice(0,16))));
			}
		}
	}
	//go though the inputs to get the data layout
	var vertexWeight=controller.getElementsByTagName("vertex_weights")[0];
	inputs=vertexWeight.getElementsByTagName("input");
	var inputArray=[];
	var outputData={};
	for(n=0;n<inputs.length;n++){
		block=inputs[n].getAttribute("semantic");
		inputs[n].data=this.getSource(inputs[n].getAttribute("source").substr(1));
		inputs[n].block=block;
		outputData[block]=[];
		var offset=inputs[n].getAttribute("offset");
		if (!inputArray[offset])
			inputArray[offset]=[];//may be more than 1 input per offset -DRH
		inputArray[offset].push(inputs[n]);
	}
	
	
	var vcounts=this.parseArray(vertexWeight.getElementsByTagName("vcount")[0]);

	var vs=this.parseArray(vertexWeight.getElementsByTagName("v")[0]);

	//find the maximum vcount
	var maxJoints=0;

	for(var i=0; i<vcounts.length;i++) if(vcounts[i]) maxJoints=Math.max(maxJoints,parseInt(vcounts[i]));
	vPointer=0;
	var block;
	for(var i=0; i<vcounts.length;i++){
		for(var j=0; j<vcounts[i];j++){
			for(var k=0; k<inputArray.length;k++){
				for (var ksub=0; ksub < inputArray[k].length; ++ksub) {
					block=inputArray[k][ksub].block;
					for(n=0;n<inputArray[k][ksub].data.stride;n++){
						if(inputArray[k][ksub].data.pmask[n]){
							if(block!="JOINT"){
								outputData[block].push(inputArray[k][ksub].data.array[parseInt(vs[vPointer])+parseInt(inputArray[k][ksub].data.offset)]);
							}else{
								outputData[block].push(parseInt(vs[vPointer]));
							}
							vPointer++;
						}
					}
				}
			}
		}
		//pad out the remaining data
		for(j=j; j<maxJoints;j++){
			for(var k=0; k<inputArray.length;k++){
				for (var ksub=0; ksub < inputArray[k].length; ++ksub) {
					block=inputArray[k][ksub].block;
					outputData[block].push(0);
				}
			}
		}
	}	

	if(!this.badAccessor && outputData["JOINT"].length==0){
		this.badAccessor=true;
		return this.getInstanceController(node);
	}
	
	for(var i=0;i<outputData["JOINT"].length;i++){
			outputData["JOINT"][i]++;
	}
	//blender fix
	if(this.exceptions.negjoints){
		for(var i=0;i<outputData["JOINT"].length;i++){
			if(outputData["JOINT"][i]==0){
				outputData["WEIGHT"][i]=0;
			}
		}
	}

	var skeletonData={vertexJoints:outputData["JOINT"],vertexWeight:outputData["WEIGHT"],joints:joints,inverseBindMatrix:inverseBindMatrix,count:maxJoints};

	var meshes=this.getMeshes(controller.getElementsByTagName("skin")[0].getAttribute("source").substr(1),skeletonData);
	this.setMaterialOntoMesh(meshes,node);
	return node.GLGEObj;
};

/**
* creates a GLGE lights from a given instance light
* @param {node} node the element to parse
* @private
*/
GLGE.Collada.prototype.getInstanceLight=function(node){
	var type=node.getElementsByTagName("technique_common")[0].getElementsByTagName("*")[0];
	var light=new GLGE.Light;
	var color=type.getElementsByTagName("color");
	if(color.length>0){
		var colors=color[0].firstChild.nodeValue.split(" ");
		var c="rgb("+((colors[0]*255)|0)+","+((colors[1]*255)|0)+","+((colors[2]*255)|0)+")";
		light.setColor(c);
	}
	switch(type.tagName){
		case "point":
		case "spot":
			light.setType(GLGE.L_POINT);
			var ca=type.getElementsByTagName("constant_attenuation");
			if(ca.length>0) light.setAttenuationConstant(parseFloat(ca[0].firstChild.nodeValue));
			var la=type.getElementsByTagName("linear_attenuation");
			if(la.length>0) light.setAttenuationLinear(parseFloat(la[0].firstChild.nodeValue));
			var qa=type.getElementsByTagName("quadratic_attenuation");
			if(qa.length>0) light.setAttenuationQuadratic(parseFloat(qa[0].firstChild.nodeValue));
		case "spot":
			light.setType(GLGE.L_SPOT);
			var se=type.getElementsByTagName("falloff_exponent");
			if(se.length>0) {
				var exp=parseFloat(se[0].firstChild.nodeValue);
				if(exp<1.0001) exp*=128; //if less then one then assume they are using 0-1 so convert to 0-128
				light.setSpotExponent(exp);
			}
			var fa=type.getElementsByTagName("falloff_angle");
			if(fa.length>0) light.setSpotCosCutOff(Math.cos(parseFloat(fa[0].firstChild.nodeValue)/180*Math.PI));
			break;
	}
	return light;
}


/**
* Creates a new group and parses it's children
* @param {DOM Element} node the element to parse
* @param {boolean} ref should this just get a reference for later addition
* @private
*/
GLGE.Collada.prototype.getNode=function(node,ref){

	//if a reference has previously been created then add it now
	if(!ref && node.GLGEObject){
		newGroup=node.GLGEObject;
		delete(this.GLGEObject);
		return newGroup;
	}
	
	//if a reference is requested a the node previously created then return here
	if(ref && node && node.GLGEObjects){
		return node.GLGEObjects[0];
	}
	
	var newGroup=new GLGE.Group();
	var name="bone"+(++this.boneIdx);
	newGroup.setName(name);
	if (!node) {
        return newGroup;
    }
	if(!node.GLGEObjects) node.GLGEObjects=[];
	node.GLGEObjects.push(newGroup); //map Collada DOM to GLGE
	var child=node.firstChild;
	var matrix=GLGE.identMatrix();
	var data;
	if(child) do{
		switch(child.tagName){
			case "node":
				newGroup.addGroup(this.getNode(child));
				break;
			case "instance_node":
				newGroup.addGroup(this.getNode(this.xml.getElementById(child.getAttribute("url").substr(1))));
				break;
			case "instance_visual_scene":
				newGroup.addGroup(this.getNode(this.xml.getElementById(child.getAttribute("url").substr(1))));
				break;
			case "instance_light":
				if(this.useLights) newGroup.addLight(this.getInstanceLight(this.xml.getElementById(child.getAttribute("url").substr(1))));
				break;
			case "instance_geometry":
				newGroup.addObject(this.getInstanceGeometry(child));
				break;
			case "instance_controller":
				newGroup.addObject(this.getInstanceController(child));
				break;
			case "matrix":
				matrix=this.parseArray(child);
				break;
			case "translate":
				data=this.parseArray(child);
				matrix=GLGE.mulMat4(matrix,GLGE.translateMatrix(data[0],data[1],data[2]));
				break;
			case "rotate":
				data=this.parseArray(child);
				matrix=GLGE.mulMat4(matrix,GLGE.angleAxis(data[3]*0.017453278,[data[0],data[1],data[2]]));
				break;
			case "scale":
				data=this.parseArray(child);
				matrix=GLGE.mulMat4(matrix,GLGE.scaleMatrix(data[0],data[1],data[2]));
				break;
		}
	}while(child=child.nextSibling);
	
	newGroup.setLoc(matrix[3],matrix[7],matrix[11]);
	var mat=GLGE.Mat4([matrix[0], matrix[1], matrix[2], 0,
								matrix[4], matrix[5], matrix[6], 0,
								matrix[8], matrix[9], matrix[10], 0,
								0, 0, 0, 1]);
			
	newGroup.setRotMatrix(mat);
	
	if(ref) node.GLGEObject=newGroup;
	
	return newGroup;
};
/**
* Initializes the Object/Scene when the collada document has been loaded
* @private
*/
GLGE.Collada.prototype.initVisualScene=function(){
    var metadata=this.xml.getElementsByTagName("asset");
    var up_axis="Z_UP";
    if(metadata.length) {
        var up_axis_node=metadata[0].getElementsByTagName("up_axis");
        if (up_axis_node.length) {
            up_axis_node=up_axis_node[0];
            var cur_axis=up_axis_node.firstChild.nodeValue;
            if (cur_axis.length)
                up_axis=cur_axis;
        }
    }
    var transformRoot=this;
    if (up_axis[0]!="Y"&&up_axis[0]!="y") {
        transformRoot = new GLGE.Group();
        this.addChild(transformRoot);
        if (up_axis[0]!="Z"&&up_axis[0]!="z") {
            this.setRotMatrix(GLGE.Mat4([0, -1 , 0,  0,
					                     1, 0, 0, 0,
					                     0, 0, 1, 0,
					                     0, 0, 0, 1]));
          
        }else {
            this.setRotMatrix(GLGE.Mat4([1, 0 , 0,  0,
					                     0, 0, 1, 0,
					                     0, -1, 0, 0,
					                     0, 0, 0, 1]));
            
        }
    }
	if(!this.rootId){
		var scene=this.xml.getElementsByTagName("scene");
		if(scene.length>0){
			transformRoot.addGroup(this.getNode(scene[0]));
		}else{
			GLGE.error("Please indicate the asset to render in Collada Document"+this.url);
		}
	}else{
		var root=this.xml.getElementById(this.rootId);
		if(root){
			transformRoot.addGroup(this.getNode(root));
		}else{
			GLGE.error("Asset "+this.rootId+" not found in document"+this.url);
		}
	}
};


/**
* Exceptions for the bad exports out there, I'm sure there will be many more :-(
*/
var exceptions={
	"default":{},
	"COLLADA Mixamo exporter":{badAccessor:true},
	"Blender2.5":{flipangle:true,negjoints:true}
}
	
GLGE.Collada.prototype.getExceptions=function(){
	if(this.xml.getElementsByTagName("authoring_tool").length>0 && this.xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue=="COLLADA Mixamo exporter"){
		return exceptions["COLLADA Mixamo exporter"];
	}
	if(this.xml.getElementsByTagName("authoring_tool").length>0 && /Blender 2.5/.test(this.xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue)){
		return exceptions["Blender2.5"];
	}
}
/**
* Called when a collada document has is loaded
* @param {string} url the url of the loaded document
* @param {DOM Document} xml the xml document
* @private
*/
GLGE.Collada.prototype.loaded=function(url,xml){
	this.xml=xml;
	if(xml.getElementsByTagName("authoring_tool").length>0) this.exceptions=exceptions[xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue];
	this.exceptions=this.getExceptions();
	if(!this.exceptions) this.exceptions=exceptions['default'];
/// FIXME -- I used to have some try/catches going on here to avoid silent fails
	this.initVisualScene();
	this.getAnimations();
    if (this.loadedCallback) {
        this.loadedCallback(this);
    }
	this.fireEvent("loaded",{url:this.url});
};

GLGE.Scene.prototype.addCollada=GLGE.Scene.prototype.addGroup;
GLGE.Group.prototype.addCollada=GLGE.Group.prototype.addGroup;


if(GLGE.Document){
	/**
	* Parses the dom element and creates a collada object
	* @param {domelement} ele the element to create the objects from
	* @private
	*/
	GLGE.Document.prototype.getCollada=function(ele){
		if(!ele.object){
			ele.object=new GLGE[this.classString(ele.tagName)]();
			ele.object.setDocument(ele.getAttribute("document"),this.getAbsolutePath(this.rootURL,null));
			ele.removeAttribute("document");
			this.setProperties(ele);
		}
		return ele.object;
	}
}

})(GLGE);
/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_input.js
 * @author me@paulbrunt.co.uk
 */


 if(!GLGE){
	/**
	* @namespace Holds the functionality of the library
	*/
	var GLGE={};
}

(function(GLGE){
	/**
	* @class Creates a heightmap for a region of the world based on an image. Originally created as a quick and easy collision detection. At least until we have a better physics implementation.
	* @deprecated not intended as a permanent addition
	* @param {string} imageURL The url of the image to generate the hightmap for
	* @param {number} imageWidth The width of the image
	* @param {number} imageHeight The height of the image
	* @param {number} x1 The lower X bound of the height map in world coords
	* @param {number} x2 The upper X bound of the height map in world coords
	* @param {number} y1 The lower Y bound of the height map in world coords
	* @param {number} y2 The upper Y bound of the height map in world coords
	* @param {number} z1 The lower Z bound of the height map in world coords
	* @param {number} z2 The upper Z bound of the height map in world coords
	*/
	GLGE.HeightMap=function(imageURL,imageWidth,imageHeight,x1,x2,y1,y2,z1,z2){
		this.canvas=document.createElement("canvas");
		this.context = this.canvas.getContext('2d');
		this.canvas.width=imageWidth;
		this.canvas.height=imageHeight;
		this.minX=x1;
		this.maxX=x2;
		this.minY=y1;
		this.maxY=y2;
		this.minZ=z1;
		this.maxZ=z2;
		var image=new Image();
		image.heightmap=this;
		image.onload=function(e){
			this.heightmap.context.drawImage(this, 0, 0);
			this.heightmap.data=this.heightmap.context.getImageData(0,0,this.heightmap.canvas.width,this.heightmap.canvas.height).data;
		};
		image.src=imageURL;
	}
	GLGE.HeightMap.prototype.canvas=null;
	GLGE.HeightMap.prototype.context=null;
	GLGE.HeightMap.prototype.minZ=null;
	GLGE.HeightMap.prototype.maxZ=null;
	GLGE.HeightMap.prototype.minY=null;
	GLGE.HeightMap.prototype.maxY=null;
	GLGE.HeightMap.prototype.minX=null;
	GLGE.HeightMap.prototype.maxX=null;
	GLGE.HeightMap.prototype.data=null;
	/**
	* Gets the pixel height at the specified image coords
	* @param {number} x the x image coord 
	* @param {number} y the y image coord 
	* @private
	*/
	GLGE.HeightMap.prototype.getPixelAt=function(x,y){
		if(this.data){
			return (this.data[(this.canvas.width*y+x)*4])/255*(this.maxZ-this.minZ);
		}
		else
		{
			return 0;
		}
	}
	/**
	* Function to get he height as specified x, y world coords
	* @param {number} x the x world coord 
	* @param {number} y the y world coord 
	* @returns {number} the height of the level in world units 
	*/
	GLGE.HeightMap.prototype.getHeightAt=function(x,y){
		var retValue;
		if(this.lastx!=undefined && x==this.lastx && y==this.lasty){
			retValue=this.lastValue;
		}
		else
		{
			var imgX=Math.round((x-this.minX)/(this.maxX-this.minX)*this.canvas.width);
			var imgY=Math.round((y-this.minY)/(this.maxY-this.minY)*this.canvas.height);
			retValue=this.getPixelAt(imgX,imgY);
			this.lastValue=retValue;
		}
		this.lastx=x;
		this.lasty=y;
		return retValue;
	}
	/**
	* @class Monitors keyboard input for use in render loops
	*/
	GLGE.KeyInput=function(){
		if(!document.keyStates) document.keyStates=[];
		document.addEventListener("keydown",this.onKeyDown,false);
		document.addEventListener("keyup",this.onKeyUp,false);
	}
	/**
	* Tests if a key is pressed
	* @param {number} the keycode to check
	* @returns {boolean} key returns true if the key is being pressed
	*/
	GLGE.KeyInput.prototype.isKeyPressed=function(key){
		if(document.keyStates[key]) return true;
			else return false;
	};
	var skiptimmer=null;
	/**
	* document keydown event used to monitor the key states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.KeyInput.prototype.onKeyDown=function(e){
		document.keyStates[e.keyCode]=true;
	};
	/**
	* Document keyup event used to monitor the key states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.KeyInput.prototype.onKeyUp=function(e){
		document.keyStates[e.keyCode]=false;
	};
	/**
	* @class Monitors mouse input for use in render loops
	*/
	GLGE.MouseInput=function(element){
		this.element=element;
		this.element.mouseX=0;
		this.element.mouseY=0;
		if(!this.element.buttonState) this.element.buttonState=[];
		element.addEventListener("mousemove",this.onMouseMove,false);
		element.addEventListener("mousedown",this.onMouseDown,false);
		element.addEventListener("mouseup",this.onMouseUp,false);
	}
	GLGE.MouseInput.prototype.element=null;
	/**
	* Elements mousemove event used to monitor the mouse states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.MouseInput.prototype.onMouseMove=function(e){
		this.mouseX=e.clientX;
		this.mouseY=e.clientY;
	}
	/**
	* Elements mousedown event used to monitor the mouse states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.MouseInput.prototype.onMouseDown=function(e){
		this.buttonState[e.button]=true;
	}
	/**
	* Elements mouseup event used to monitor the mouse states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.MouseInput.prototype.onMouseUp=function(e){
		this.buttonState[e.button]=false;
	}
	/**
	* Tests if a mouse button is pressed
	* @param {number} button the button to check
	* @returns {boolean} returns true if the button is being pressed
	*/
	GLGE.MouseInput.prototype.isButtonDown=function(button){
		if(this.element.buttonState[button]) return true;
			else return false;
	}
	/**
	* Gets the mouse coords
	* @returns {object} the current mouse coors
	*/
	GLGE.MouseInput.prototype.getMousePosition=function(){
		return {x:this.element.mouseX,y:this.element.mouseY}
	}

	/**
	* @constant 
	* @description Enumeration for the left mouse button
	*/
	GLGE.MI_LEFT=0;
	/**
	* @constant 
	* @description Enumeration for the middle mouse button
	*/
	GLGE.MI_MIDDLE=1;
	/**
	* @constant 
	* @description Enumeration for the right mouse button
	*/
	GLGE.MI_RIGHT=2;

	/**
	* @constant 
	* @description Enumeration for the backspace key
	*/
	GLGE.KI_BACKSPACE=8;
	/**
	* @constant 
	* @description Enumeration for the tab key
	*/
	GLGE.KI_TAB=9;
	/**
	* @constant 
	* @description Enumeration for the enter key
	*/
	GLGE.KI_ENTER=13;
	/**
	* @constant 
	* @description Enumeration for the shift key
	*/
	GLGE.KI_SHIFT=16;
	/**
	* @constant 
	* @description Enumeration for the ctrl key
	*/
	GLGE.KI_CTRL=17;
	/**
	* @constant 
	* @description Enumeration for the alt key
	*/
	GLGE.KI_ALT=18;
	/**
	* @constant 
	* @description Enumeration for the pause/break key
	*/
	GLGE.KI_PAUSE_BREAK=19;
	/**
	* @constant 
	* @description Enumeration for the caps lock key
	*/
	GLGE.KI_CAPS_LOCK=20;
	/**
	* @constant 
	* @description Enumeration for the escape key
	*/
	GLGE.KI_ESCAPE=27;
	/**
	* @constant 
	* @description Enumeration for the page up key
	*/
	GLGE.KI_PAGE_UP=33;
	/**
	* @constant 
	* @description Enumeration for the page down key
	*/
	GLGE.KI_PAGE_DOWN=34;
	/**
	* @constant 
	* @description Enumeration for the end key
	*/
	GLGE.KI_END=35;
	/**
	* @constant 
	* @description Enumeration for the home key
	*/
	GLGE.KI_HOME=36;
	/**
	* @constant 
	* @description Enumeration for the left arrow key
	*/
	GLGE.KI_LEFT_ARROW=37;
	/**
	* @constant 
	* @description Enumeration for the up arrow key
	*/
	GLGE.KI_UP_ARROW=38;
	/**
	* @constant 
	* @description Enumeration for the right arrow key
	*/
	GLGE.KI_RIGHT_ARROW=39;
	/**
	* @constant 
	* @description Enumeration for the down arrow key
	*/
	GLGE.KI_DOWN_ARROW=40;
	/**
	* @constant 
	* @description Enumeration for the insert key
	*/
	GLGE.KI_INSERT=45;
	/**
	* @constant 
	* @description Enumeration for the delete key
	*/
	GLGE.KI_DELETE=46;
	/**
	* @constant 
	* @description Enumeration for the 0 key
	*/
	GLGE.KI_0=48;
	/**
	* @constant 
	* @description Enumeration for the 1 key
	*/
	GLGE.KI_1=49;
	/**
	* @constant 
	* @description Enumeration for the 2 key
	*/
	GLGE.KI_2=50;
	/**
	* @constant 
	* @description Enumeration for the 3 key
	*/
	GLGE.KI_3=51;
	/**
	* @constant 
	* @description Enumeration for the 4 key
	*/
	GLGE.KI_4=52;
	/**
	* @constant 
	* @description Enumeration for the 5 key
	*/
	GLGE.KI_5=53;
	/**
	* @constant 
	* @description Enumeration for the 6 key
	*/
	GLGE.KI_6=54;
	/**
	* @constant 
	* @description Enumeration for the 7 key
	*/
	GLGE.KI_7=55;
	/**
	* @constant 
	* @description Enumeration for the 8 key
	*/
	GLGE.KI_8=56;
	/**
	* @constant 
	* @description Enumeration for the 9 key
	*/
	GLGE.KI_9=57;
	/**
	* @constant 
	* @description Enumeration for the a key
	*/
	GLGE.KI_A=65;
	/**
	* @constant 
	* @description Enumeration for the b key
	*/
	GLGE.KI_B=66;
	/**
	* @constant 
	* @description Enumeration for the c key
	*/
	GLGE.KI_C=67;
	/**
	* @constant 
	* @description Enumeration for the d key
	*/
	GLGE.KI_D=68;
	/**
	* @constant 
	* @description Enumeration for the e key
	*/
	GLGE.KI_E=69;
	/**
	* @constant 
	* @description Enumeration for the f key
	*/
	GLGE.KI_F=70;
	/**
	* @constant 
	* @description Enumeration for the g key
	*/
	GLGE.KI_G=71;
	/**
	* @constant 
	* @description Enumeration for the h key
	*/
	GLGE.KI_H=72;
	/**
	* @constant 
	* @description Enumeration for the i key
	*/
	GLGE.KI_I=73;
	/**
	* @constant 
	* @description Enumeration for the j key
	*/
	GLGE.KI_J=74;
	/**
	* @constant 
	* @description Enumeration for the k key
	*/
	GLGE.KI_K=75;
	/**
	* @constant 
	* @description Enumeration for the l key
	*/
	GLGE.KI_L=76;
	/**
	* @constant 
	* @description Enumeration for the m key
	*/
	GLGE.KI_M=77;
	/**
	* @constant 
	* @description Enumeration for the n key
	*/
	GLGE.KI_N=78;
	/**
	* @constant 
	* @description Enumeration for the o key
	*/
	GLGE.KI_O=79;
	/**
	* @constant 
	* @description Enumeration for the p key
	*/
	GLGE.KI_P=80;
	/**
	* @constant 
	* @description Enumeration for the q key
	*/
	GLGE.KI_Q=81;
	/**
	* @constant 
	* @description Enumeration for the r key
	*/
	GLGE.KI_R=82;
	/**
	* @constant 
	* @description Enumeration for the s key
	*/
	GLGE.KI_S=83;
	/**
	* @constant 
	* @description Enumeration for the t key
	*/
	GLGE.KI_T=84;
	/**
	* @constant 
	* @description Enumeration for the u key
	*/
	GLGE.KI_U=85;
	/**
	* @constant 
	* @description Enumeration for the v key
	*/
	GLGE.KI_V=86;
	/**
	* @constant 
	* @description Enumeration for the w key
	*/
	GLGE.KI_W=87;
	/**
	* @constant 
	* @description Enumeration for the x key
	*/
	GLGE.KI_X=88;
	/**
	* @constant 
	* @description Enumeration for the y key
	*/
	GLGE.KI_Y=89;
	/**
	* @constant 
	* @description Enumeration for the z key
	*/
	GLGE.KI_Z=90;
	/**
	* @constant 
	* @description Enumeration for the left window key key
	*/
	GLGE.KI_LEFT_WINDOW_KEY=91;
	/**
	* @constant 
	* @description Enumeration for the right window key key
	*/
	GLGE.KI_RIGHT_WINDOW_KEY=92;
	/**
	* @constant 
	* @description Enumeration for the select key key
	*/
	GLGE.KI_SELECT_KEY=93;
	/**
	* @constant 
	* @description Enumeration for the numpad 0 key
	*/
	GLGE.KI_NUMPAD_0=96;
	/**
	* @constant 
	* @description Enumeration for the numpad 1 key
	*/
	GLGE.KI_NUMPAD_1=97;
	/**
	* @constant 
	* @description Enumeration for the numpad 2 key
	*/
	GLGE.KI_NUMPAD_2=98;
	/**
	* @constant 
	* @description Enumeration for the numpad 3 key
	*/
	GLGE.KI_NUMPAD_3=99;
	/**
	* @constant 
	* @description Enumeration for the numpad 4 key
	*/
	GLGE.KI_NUMPAD_4=100;
	/**
	* @constant 
	* @description Enumeration for the numpad 5 key
	*/
	GLGE.KI_NUMPAD_5=101;
	/**
	* @constant 
	* @description Enumeration for the numpad 6 key
	*/
	GLGE.KI_NUMPAD_6=102;
	/**
	* @constant 
	* @description Enumeration for the numpad 7 key
	*/
	GLGE.KI_NUMPAD_7=103;
	/**
	* @constant 
	* @description Enumeration for the numpad 8 key
	*/
	GLGE.KI_NUMPAD_8=104;
	/**
	* @constant 
	* @description Enumeration for the numpad 9 key
	*/
	GLGE.KI_NUMPAD_9=105;
	/**
	* @constant 
	* @description Enumeration for the multiply key
	*/
	GLGE.KI_MULTIPLY=106;
	/**
	* @constant 
	* @description Enumeration for the add key
	*/
	GLGE.KI_ADD=107;
	/**
	* @constant 
	* @description Enumeration for the subtract key
	*/
	GLGE.KI_SUBTRACT=109;
	/**
	* @constant 
	* @description Enumeration for the decimal point key
	*/
	GLGE.KI_DECIMAL_POINT=110;
	/**
	* @constant 
	* @description Enumeration for the divide key
	*/
	GLGE.KI_DIVIDE=111;
	/**
	* @constant 
	* @description Enumeration for the f1 key
	*/
	GLGE.KI_F1=112;
	/**
	* @constant 
	* @description Enumeration for the f2 key
	*/
	GLGE.KI_F2=113;
	/**
	* @constant 
	* @description Enumeration for the f3 key
	*/
	GLGE.KI_F3=114;
	/**
	* @constant 
	* @description Enumeration for the f4 key
	*/
	GLGE.KI_F4=115;
	/**
	* @constant 
	* @description Enumeration for the f5 key
	*/
	GLGE.KI_F5=116;
	/**
	* @constant 
	* @description Enumeration for the f6 key
	*/
	GLGE.KI_F6=117;
	/**
	* @constant 
	* @description Enumeration for the f7 key
	*/
	GLGE.KI_F7=118;
	/**
	* @constant 
	* @description Enumeration for the f8 key
	*/
	GLGE.KI_F8=119;
	/**
	* @constant 
	* @description Enumeration for the f9 key
	*/
	GLGE.KI_F9=120;
	/**
	* @constant 
	* @description Enumeration for the f10 key
	*/
	GLGE.KI_F10=121;
	/**
	* @constant 
	* @description Enumeration for the f11 key
	*/
	GLGE.KI_F11=122;
	/**
	* @constant 
	* @description Enumeration for the f12 key
	*/
	GLGE.KI_F12=123;
	/**
	* @constant 
	* @description Enumeration for the num lock key
	*/
	GLGE.KI_NUM_LOCK=144;
	/**
	* @constant 
	* @description Enumeration for the scroll lock key
	*/
	GLGE.KI_SCROLL_LOCK=145;
	/**
	* @constant 
	* @description Enumeration for the semi-colon key
	*/
	GLGE.KI_SEMI_COLON=186;
	/**
	* @constant 
	* @description Enumeration for the equal sign key
	*/
	GLGE.KI_EQUAL_SIGN=187;
	/**
	* @constant 
	* @description Enumeration for the comma key
	*/
	GLGE.KI_COMMA=188;
	/**
	* @constant 
	* @description Enumeration for the dash key
	*/
	GLGE.KI_DASH=189;
	/**
	* @constant 
	* @description Enumeration for the period key
	*/
	GLGE.KI_PERIOD=190;
	/**
	* @constant 
	* @description Enumeration for the forward slash key
	*/
	GLGE.KI_FORWARD_SLASH=191;
	/**
	* @constant 
	* @description Enumeration for the grave accent key
	*/
	GLGE.KI_GRAVE_ACCENT=192;
	/**
	* @constant 
	* @description Enumeration for the open bracket key
	*/
	GLGE.KI_OPEN_BRACKET=219;
	/**
	* @constant 
	* @description Enumeration for the back slash key
	*/
	GLGE.KI_BACK_SLASH=220;
	/**
	* @constant 
	* @description Enumeration for the close braket key
	*/
	GLGE.KI_CLOSE_BRAKET=221;
	/**
	* @constant 
	* @description Enumeration for the single quote key
	*/
	GLGE.KI_SINGLE_QUOTE=222;
	/**
	* @constant 
	* @description Enumeration for the space key
	*/
	GLGE.KI_SPACE=32;
})(GLGE);



/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_wavefront.js
 * @author me@paulbrunt.co.uk
 */

(function(GLGE){
/**
* @class parses and displays a warefront object file with mtl material
* @param {string} uid the unique id for this object
* @augments GLGE.Object
*/
GLGE.Wavefront=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.multimaterials=[];
	this.materials={};
	this.instances=[];
	this.queue=[];
}
GLGE.augment(GLGE.Object,GLGE.Wavefront);
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.Wavefront.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,7)=="https://"){
		return path;
	}
	else
	{
		if(!relativeto){
			relativeto=window.location.href;
		}
		//find the path compoents
		var bits=relativeto.split("/");
		var domain=bits[2];
		var proto=bits[0];
		var initpath=[];
		for(var i=3;i<bits.length-1;i++){
			initpath.push(bits[i]);
		}
		//relative to domain
		if(path.substr(0,1)=="/"){
			initpath=[];
		}
		var locpath=path.split("/");
		for(i=0;i<locpath.length;i++){
			if(locpath[i]=="..") initpath.pop();
				else if(locpath[i]!="") initpath.push(locpath[i]);
		}
		return proto+"//"+domain+"/"+initpath.join("/");
	}
};
/**
* Loads a material file from a url
* @param {string} url the url of the material file
* @private
*/
GLGE.Wavefront.prototype.loadMaterials=function(url){
	if(!this.loading){
		this.loadFile(url,null,function(url,text){
			this.parseMaterials(text.split("\n"));
			if(this.queue.length>0){
				var matUrl=this.queue.pop();
				this.loadMaterial(matUrl);
			}else{
				this.parseMesh();
			}
		});
	}else{
		this.queue.push(url);
	}

};
/**
* creates the GLGE materials from a mtl file
* @param {string} file the file to parse
* @private
*/
GLGE.Wavefront.prototype.parseMaterials=function(file){
	//loop though all lines and look for matlibs
	for(var i=0;i<file.length;i++){
		//newmtl
		if(file[i].substr(0,6)=="newmtl"){
			var data=file[i].split(" ");
			var material=new GLGE.Material;
			this.materials[data[1]]=material;
			i++;
		}
		var data=file[i].split(" ");
		if(data.length>1){
			switch(data[0]){
				case "Kd":
					material.setColorR(parseFloat(data[1]));
					material.setColorG(parseFloat(data[2]));
					material.setColorB(parseFloat(data[3]));
					break;
				case "Ks":
					material.setSpecularColor({r:parseFloat(data[1]),g:parseFloat(data[2]),b:parseFloat(data[3])});
					break;
				case "Ns":
					material.setShininess(parseFloat(data[1]));
					break;
				case "d":
				case "Tr":
					this.setZtransparent(true);
					material.setAlpha(parseFloat(data[1]));
					break;
				case "map_Kd":
					var ml=new GLGE.MaterialLayer;
					ml.setMapto(GLGE.M_COLOR);
					ml.setMapinput(GLGE.UV1);
					var tex=new GLGE.Texture;
					var k=1;
					while(data[k][0]=="-") k=k+2;
					tex.setSrc(this.getAbsolutePath(data[k],this.relativeTo));
					material.addTexture(tex);
					ml.setTexture(tex);
					material.addMaterialLayer(ml);
				case "map_Ks":
				case "map_spec":
					var ml=new GLGE.MaterialLayer;
					ml.setMapto(GLGE.M_SPECULAR);
					ml.setMapinput(GLGE.UV1);
					var tex=new GLGE.Texture;
					var k=1;
					while(data[k][0]=="-") k=k+2;
					tex.setSrc(this.getAbsolutePath(data[k],this.relativeTo));
					material.addTexture(tex);
					ml.setTexture(tex);
					material.addMaterialLayer(ml);
				case "bump":
				case "map_bump":
					var ml=new GLGE.MaterialLayer;
					ml.setMapto(GLGE.M_NOR);
					ml.setMapinput(GLGE.UV1);
					var tex=new GLGE.Texture;
					var k=1;
					while(data[k][0]=="-") k=k+2;
					tex.setSrc(this.getAbsolutePath(data[k],this.relativeTo));
					material.addTexture(tex);
					ml.setTexture(tex);
					material.addMaterialLayer(ml);
			}
		}
	}
};
/**
* loads a resource from a url
* @param {string} url the url of the resource to load
* @param {string} relativeTo the url to load relative to
* @param {function} callback thefunction to call once the file is loaded
* @private
*/
GLGE.Wavefront.prototype.loadFile=function(url,relativeTo,callback){
	if(this.relativeTo && !relativeTo) relativeTo=this.relativeTo;
		else this.relativeTo=url;
	this.loading=true;
	if(!callback) callback=this.loaded;
	url=this.getAbsolutePath(url,relativeTo);
	var req = new XMLHttpRequest();
	var that=this;
	if(req) {
		req.overrideMimeType("text/plain")
		req.onreadystatechange = function() {
			if(this.readyState  == 4)
			{
				if(this.status  == 200 || this.status==0){
					that.loading=false;
					callback.call(that,url,this.responseText);
				}else{ 
					GLGE.error("Error loading Document: "+url+" status "+this.status);
				}
			}
		};
		req.open("GET", url, true);
		req.send("");
	}	
}
/**
* loads a wavefront ojvect from a given url
* @param {DOM Element} url the url to retrieve
* @param {string} relativeTo optional the path the url is relative to
*/
GLGE.Wavefront.prototype.setSrc=function(url,relativeTo){
	this.loadFile(url,relativeTo);
};
/**
* loads a resource from a url
* @param {string} url the url of the resource loaded
* @param {string} objfile the loaded file
* @private
*/
GLGE.Wavefront.prototype.loaded=function(url,objfile){
	this.file=objArray=objfile.split("\n");
	var hasMaterial=false;
	//loop through the file and load the Materials
	for(var i=0;i<objArray.length;i++){
		var data=objArray[i].split(" ");
		if(data.length>1){
			if(data[0]=="mtllib"){
				hasMaterial=true;
				this.loadMaterials(data[1]);
			}
		}
	}
	if(!hasMaterial) this.parseMesh();
	
};
/**
* creates a new multimaterial
* @private
*/
GLGE.Wavefront.prototype.createMultiMaterial=function(idxDataOrig,verts,norms,texCoords,faces,material,smooth){
	//loop though the indexes to produce streams
	var positions=[];
	var normals=[];
	var uv=[];
	var newfaces=[];
	var idxData=[];
	for(i=0;i<faces.length;i++){
		var data=idxDataOrig[faces[i]];
		if(idxData.indexOf(data)==-1 || !smooth){
			idxData.push(data);
			newfaces.push(idxData.length-1);
		}else{
			newfaces.push(idxData.indexOf(data));
		}
	}
	faces=newfaces;
	for(i=0;i<idxData.length;i++){
		var vertData=idxData[i].split("/");
		if(!verts[vertData[0]-1]) GLGE.error(vertData[0]);
		positions.push(verts[vertData[0]-1][1]);
		positions.push(verts[vertData[0]-1][2]);
		positions.push(verts[vertData[0]-1][3]);
		if(vertData[1]){
			uv.push(texCoords[vertData[1]-1][1]);
			uv.push(texCoords[vertData[1]-1][2]);
		}
		if(vertData[2]){
			normals.push(norms[vertData[2]-1][1]);
			normals.push(norms[vertData[2]-1][2]);
			normals.push(norms[vertData[2]-1][3]);
		}
	}
	
	var multiMat=new GLGE.MultiMaterial;
	var mesh=new GLGE.Mesh;
	mesh.setPositions(positions);
	if(uv.length>0) mesh.setUV(uv);
	if(normals.length>0) mesh.setNormals(normals);
	mesh.setFaces(faces);
	multiMat.setMesh(mesh);
	multiMat.setMaterial(material);
	this.addMultiMaterial(multiMat);
}
/**
* Parses the mesh
* @private
*/
GLGE.Wavefront.prototype.parseMesh=function(){
	objArray=this.file;
	var texCoords=[];
	var verts=[];
	var norms=[];
	var faces=[];
	var idxData=[];
	var vertoffset=0;
	var smooth=true;
	var material=new GLGE.Material;
	for(var i=0;i<objArray.length;i++){
		if(objArray[i][0]!="#"){
			var data=objArray[i].split(" ");
			if(data.length>0){
				switch(data[0]){
					case "s":
						if(data[1]=="1") smooth=true;
							else smooth=false;
					case "o":
						if(faces.length>0){
							this.createMultiMaterial(idxData,verts,norms,texCoords,faces,material,smooth);
							faces=[];
							material=new GLGE.Material;
						}
						break;
					case "usemtl":
						if(faces.length>0){
							this.createMultiMaterial(idxData,verts,norms,texCoords,faces,material,smooth);
							faces=[];
						}
						material=this.materials[data[1]];
						break;
					case "v":
						verts.push(data);
						break;
					case "vt":
						texCoords.push(data);
						break;
					case "vn":
						norms.push(data);
						break;
					case "f":
						var tmpface=[];
						for(var j=1;j<data.length;j++){
							var idx=idxData.indexOf(data[j]);
							if(idx==-1 || !smooth){
								idxData.push(data[j]);
								idx=idxData.length-1;
							}
							tmpface.push(idx);
						}
						for(j=0;j<tmpface.length-2;j++){
							faces.push(tmpface[0]-vertoffset);
							faces.push(tmpface[1+j]-vertoffset);
							faces.push(tmpface[2+j]-vertoffset);
						}
						break;
				}
			}
		}
	}
	this.createMultiMaterial(idxData,verts,norms,texCoords,faces,material,smooth);
};

/**
* Parses the dom element and creates a texture
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getWavefront=function(ele){
	if(!ele.object){
		var rel=this.getAbsolutePath(this.rootURL,null);
		ele.object=new GLGE[this.classString(ele.tagName)];
		ele.object.setSrc(this.getAbsolutePath(ele.getAttribute("src"),rel));
		ele.removeAttribute("src");
		this.setProperties(ele);
	}
	return ele.object;
}
})(GLGE);

