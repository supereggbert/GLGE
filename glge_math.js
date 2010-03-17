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
 * @name glge_math.js
 * @author me@paulbrunt.co.uk
 */

if(!GLGE){
	var GLGE={};
}
(function(GLGE){
/**
* @class The Vec Class creates a vector 
* @param {Array} array An array of 3-4 floats
*/
GLGE.Vec=function(array){
	this.data=array;
};
/**
* Gets the dot product between this and the input vector
* @param {GLGE.Vec} vec The other vector
*/
GLGE.Vec.prototype.dot=function(vec){
	var v; if(vec.data) v=vec.data; else v=vec;
	if (this.data.length != v.length) GLGE.error("GLGE.Vec.add -- unmatched vector length")
	var ret=0.0
	for(var i in v) {
		ret += this.data[i]*v[i]
	}
	return ret
};
/**
* Gets the cross product between this and the input vector
* @param {GLGE.Vec} vec The other vector
*/
GLGE.Vec.prototype.cross=function(vec){
	var v; if(vec.data) v=vec.data; else v=vec;
	//if (this.data.length != v.length) GLGE.error("GLGE.Vec.cross -- unmatched vector length") // need to be lax here
	if(v.length<3) GLGE.error("oops -- cross product only meaningful on vector dimension 3")
	var retvec=[
		this.data[1]*v[2]-this.data[2]*v[1],
		this.data[2]*v[0]-this.data[0]*v[2],
		this.data[0]*v[1]-this.data[1]*v[0] ];
	return new GLGE.Vec(retvec);
};
/**
* Adds a Number, Array or GLGE.vec to this vector
* @param {Object} value The value to add
*/
GLGE.Vec.prototype.add=function(value){
	var retvec=[];
	if(value.data || value instanceof Array){
		var v;
		if(value.data) v=value.data; else v=value;
		if (this.data.length != v.length) GLGE.error("GLGE.Vec.add -- unmatched vector length")
		for(var i in v) {
			retvec[i]=this.data[i]+v[i]
		}
	}else{
		for(var i in v) {
			retvec[i]=this.data[i]+v
		}
	}
	return new GLGE.Vec(retvec);
};
/**
* Subtracts a Number, Array or GLGE.vec to this vector
* @param {Object} value The value to subtract
*/
GLGE.Vec.prototype.sub=function(value){
	var retvec=[];
	if(value.data || value instanceof Array){
		var v;
		if(value.data) v=value.data; else v=value;
		if (this.data.length != v.length) GLGE.error("GLGE.Vec.subtract -- unmatched vector length")
		for(var i in v) {
			retvec[i]=this.data[i]-v[i]
		}
	}else{
		for(var i in v) {
			retvec[i]=this.data[i]-v
		}
	}
	return new GLGE.Vec(retvec);
};
GLGE.Vec.prototype.subtract=GLGE.Vec.prototype.sub

/**
* Multiplies a Number, or if supplied a GLGE.Vec it will return the cross product
* @param {Object} value The value to subtract
*/
GLGE.Vec.prototype.mul=function(value){
	if(value.data || value instanceof Array){
		return this.cross(value);
	}
	else
	{
		var retvec=[];
		for(var i in this.data) {
			retvec[i]=this.data[i]*value
		}
		return new GLGE.Vec(retvec);
	}
};

GLGE.Vec.prototype.multiply=GLGE.Vec.prototype.mul
/**
* Sets a value of the Vector at the given index
* @param {number} index The index to update
* @param {number} value The value set
*/
GLGE.Vec.prototype.set=function(index,value){
	this.glArray=null;
	this.data[index-1]=value;
};
/**
* Gets a value of the Vector at the given index
* @param {number} index The index to update
* @returns {number} the currently set values
*/
GLGE.Vec.prototype.get=function(index){
	return this.data[index-1];
};
/**
* gets the a webgl float array for this vector, once generated it will cache it so it doesn't need to recreate everytime
* @returns {WebGLFloatArray} the webgl array for this Vector
* @private
*/
GLGE.Vec.prototype.gldata=function(){
	if(!this.glArray){
		this.glArray=new WebGLFloatArray(this.data);
	};
	return this.glArray;
};
/**
* Gets the dot product between this and the input vector
* @param {GLGE.Vec} vec The other vector
*/
GLGE.Vec.prototype.toUnitVector=function(){
	var sq=0.0
	for (i in this.data) {
		sq += this.data[i] * this.data[i]
	}
	var f = 1.0 / Math.pow(sq, 0.5)
	var retval = []
	for (i in this.data) {
		retval.push(this.data[i]*f)
	}
	return new GLGE.Vec(retval);
};

GLGE.Vec.prototype.distanceFrom=function(vec){
	var v; if(vec.data) v=vec.data; else v=vec;
	if (this.data.length != v.length) GLGE.error("GLGE.Vec.subtract -- unmatched vector length")
	var sq=0.0
	for (i in this.data) {
		var delta = (this.data[i]-v[i])
		sq += delta*delta
	}
	return Math.pow(sq, 0.5)
};

GLGE.Vec.prototype.angle = function(vec){
	var v; if(vec.data) v=vec.data; else v=vec;
    if (this.data.length != v.length) GLGE.error("Vec.angle mismatch vector sizes")
    var d = 0, m1 = 0, m2 = 0;
	
	for(var i in this.data) {
		d += this.data[i] * v[i]
		m1 += Math.pow(this.data[i],2);
		m2 += Math.pow(v[i],2)
	}

    m1 = Math.sqrt(m1);
    m2 = Math.sqrt(m2);
    if (m1 * m2 === 0) {
        return 0;
    }
    var th = d / (m1 * m2);
    if (th < -1) {
        th = -1;
    }
    if (th > 1) {
        th = 1;
    }
    return Math.acos(th);
}

/**
 * @function Alias
 * @see GLGE.Vec#mul
 */
GLGE.Vec.prototype.x=GLGE.Vec.prototype.mul;
/**
 * @function Alias
 * @see GLGE.Vec#get
 */
GLGE.Vec.prototype.e=GLGE.Vec.prototype.get;

/**
* @class The Mat class creates a matrix from an array
* @param {Array} array An array of 9 or 16 floats
*/
GLGE.Mat=function(array){
	if(array.length==9){
		this.data=[array[0],array[1],array[2],0,array[3],array[4],array[5],0,array[6],array[7],array[8],0,0,0,0,1];
	}else{
		this.data=[array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7],array[8],array[9],array[10],array[11],array[12],array[13],array[14],array[15]];
	}
};
/**
* Finds the cross with another GLGE.Mat or GLGE.vec or an Array of length 3-4
* @param {object} value An GLGE.Mat, GLGE.vec or Array
* @returns {GLGE.Mat|GLGE.Vec}
*/
GLGE.Mat.prototype.cross=function(value){
	var mat1=this.data;
	if(value.data || value instanceof Array){
		var mat2;
		if(value instanceof Array) mat2=value;
			else mat2=value.data;
		if(mat2.length==16){		
			var mat=[
				mat2[0] * mat1[0]+mat2[4] * mat1[1]+mat2[8] * mat1[2]+mat2[12] * mat1[3],
				mat2[1] * mat1[0]+mat2[5] * mat1[1]+mat2[9] * mat1[2]+mat2[13] * mat1[3],
				mat2[2] * mat1[0]+mat2[6] * mat1[1]+mat2[10] * mat1[2]+mat2[14] * mat1[3],
				mat2[3] * mat1[0]+mat2[7] * mat1[1]+mat2[11] * mat1[2]+mat2[15] * mat1[3],
				
				mat2[0] * mat1[4]+mat2[4] * mat1[5]+mat2[8] * mat1[6]+mat2[12] * mat1[7],
				mat2[1] * mat1[4]+mat2[5] * mat1[5]+mat2[9] * mat1[6]+mat2[13] * mat1[7],
				mat2[2] * mat1[4]+mat2[6] * mat1[5]+mat2[10] * mat1[6]+mat2[14] * mat1[7],
				mat2[3] * mat1[4]+mat2[7] * mat1[5]+mat2[11] * mat1[6]+mat2[15] * mat1[7],
				
				mat2[0] * mat1[8]+mat2[4] * mat1[9]+mat2[8] * mat1[10]+mat2[12] * mat1[11],
				mat2[1] * mat1[8]+mat2[5] * mat1[9]+mat2[9] * mat1[10]+mat2[13] * mat1[11],
				mat2[2] * mat1[8]+mat2[6] * mat1[9]+mat2[10] * mat1[10]+mat2[14] * mat1[11],
				mat2[3] * mat1[8]+mat2[7] * mat1[9]+mat2[11] * mat1[10]+mat2[15] * mat1[11],
				
				
				mat2[0] * mat1[12]+mat2[4] * mat1[13]+mat2[8] * mat1[14]+mat2[12] * mat1[15],
				mat2[1] * mat1[12]+mat2[5] * mat1[13]+mat2[9] * mat1[14]+mat2[13] * mat1[15],
				mat2[2] * mat1[12]+mat2[6] * mat1[13]+mat2[10] * mat1[14]+mat2[14] * mat1[15],
				mat2[3] * mat1[12]+mat2[7] * mat1[13]+mat2[11] * mat1[14]+mat2[15] * mat1[15]];

			return new GLGE.Mat(mat);
		}else if(mat2.length==4){
			var vec=[
			mat1[0]*mat2[0]+mat1[1]*mat2[1]+mat1[2]*mat2[2]+mat1[3]*mat2[3],
			mat1[4]*mat2[0]+mat1[5]*mat2[1]+mat1[6]*mat2[2]+mat1[7]*mat2[3],
			mat1[8]*mat2[0]+mat1[9]*mat2[1]+mat1[10]*mat2[2]+mat1[11]*mat2[3],
			mat1[12]*mat2[0]+mat1[13]*mat2[1]+mat1[14]*mat2[2]+mat1[15]*mat2[3]];
			return new GLGE.Vec(vec);
		}else if(mat2.length==3){
			var vec=[
			mat1[0]*mat2[0]+mat1[1]*mat2[1]+mat1[2]*mat2[2]+mat1[3],
			mat1[4]*mat2[0]+mat1[5]*mat2[1]+mat1[6]*mat2[2]+mat1[7],
			mat1[8]*mat2[0]+mat1[9]*mat2[1]+mat1[10]*mat2[2]+mat1[11],
			mat1[12]*mat2[0]+mat1[13]*mat2[1]+mat1[14]*mat2[2]+mat1[15]];
			return new GLGE.Vec(vec);
		} else {
			GLGE.error("Unsupported matrix length in cross(): must be 3-4");
			throw "invalid matrix length";
		}
	}else{
		var mat=[
		mat1[0]*value,mat1[1]*value,mat1[2]*value,mat1[3]*value,
		mat1[4]*value,mat1[5]*value,mat1[6]*value,mat1[7]*value,
		mat1[8]*value,mat1[9]*value,mat1[10]*value,mat1[11]*value,
		mat1[12]*value,mat1[13]*value,mat1[14]*value,mat1[15]*value];
		return new GLGE.Mat(mat);
	}
};
/**
* Finds the determinate of the matrix
* @returns {number} the determinate
*/
GLGE.Mat.prototype.determinant=function() {
	var m=this.data;
        return m[12] * m[9] * m[6] * m[3] - m[8] * m[13] * m[6] * m[3] - m[12] * m[5] * m[10] * m[3] + m[4] * m[13] * m[10] * m[3] + m[8] * m[5] * m[14] * m[3] - m[4] * m[9] * m[14] * m[3] - m[12] * m[9] * m[2] * m[7] + m[8] * m[13] * m[2] * m[7] + m[12] * m[1] * m[10] * m[7] - m[0] * m[13] * m[10] * m[7] - m[8] * m[1] * m[14] * m[7] + m[0] * m[9] * m[14] * m[7] + m[12] * m[5] * m[2] * m[11] - m[4] * m[13] * m[2] * m[11] - m[12] * m[1] * m[6] * m[11] + m[0] * m[13] * m[6] * m[11] + m[4] * m[1] * m[14] * m[11] - m[0] * m[5] * m[14] * m[11] - m[8] * m[5] * m[2] * m[15] + m[4] * m[9] * m[2] * m[15] + m[8] * m[1] * m[6] * m[15] - m[0] * m[9] * m[6] * m[15] - m[4] * m[1] * m[10] * m[15] + m[0] * m[5] * m[10] * m[15];
};
/**
* Finds the inverse of the matrix
* @returns {GLGE.Mat} the inverse
*/
GLGE.Mat.prototype.inverse=function(){
	//cache the inverse, no point in a calc everytime
	if(!this.inverseMat){
		var m=this.t().data;
		var det=this.t().det();
		var mat=[
		(m[9] * m[14] * m[7] - m[13] * m[10] * m[7] + m[13] * m[6] * m[11] - m[5] * m[14] * m[11] - m[9] * m[6] * m[15] + m[5] * m[10] * m[15])/det,
		(m[12] * m[10] * m[7] - m[8] * m[14] * m[7] - m[12] * m[6] * m[11] + m[4] * m[14] * m[11] + m[8] * m[6] * m[15] - m[4] * m[10] * m[15])/det,
		(m[8] * m[13] * m[7] - m[12] * m[9] * m[7] + m[12] * m[5] * m[11] - m[4] * m[13] * m[11] - m[8] * m[5] * m[15] + m[4] * m[9] * m[15])/det,
		(m[12] * m[9] * m[6] - m[8] * m[13] * m[6] - m[12] * m[5] * m[10] + m[4] * m[13] * m[10] + m[8] * m[5] * m[14] - m[4] * m[9] * m[14])/det,
		(m[13] * m[10] * m[3] - m[9] * m[14] * m[3] - m[13] * m[2] * m[11] + m[1] * m[14] * m[11] + m[9] * m[2] * m[15] - m[1] * m[10] * m[15])/det,
		(m[8] * m[14] * m[3] - m[12] * m[10] * m[3] + m[12] * m[2] * m[11] - m[0] * m[14] * m[11] - m[8] * m[2] * m[15] + m[0] * m[10] * m[15])/det,
		(m[12] * m[9] * m[3] - m[8] * m[13] * m[3] - m[12] * m[1] * m[11] + m[0] * m[13] * m[11] + m[8] * m[1] * m[15] - m[0] * m[9] * m[15])/det,
		(m[8] * m[13] * m[2] - m[12] * m[9] * m[2] + m[12] * m[1] * m[10] - m[0] * m[13] * m[10] - m[8] * m[1] * m[14] + m[0] * m[9] * m[14])/det,
		(m[5] * m[14] * m[3] - m[13] * m[6] * m[3] + m[13] * m[2] * m[7] - m[1] * m[14] * m[7] - m[5] * m[2] * m[15] + m[1] * m[6] * m[15])/det,
		(m[12] * m[6] * m[3] - m[4] * m[14] * m[3] - m[12] * m[2] * m[7] + m[0] * m[14] * m[7] + m[4] * m[2] * m[15] - m[0] * m[6] * m[15])/det,
		(m[4] * m[13] * m[3] - m[12] * m[5] * m[3] + m[12] * m[1] * m[7] - m[0] * m[13] * m[7] - m[4] * m[1] * m[15] + m[0] * m[5] * m[15])/det,
		(m[12] * m[5] * m[2] - m[4] * m[13] * m[2] - m[12] * m[1] * m[6] + m[0] * m[13] * m[6] + m[4] * m[1] * m[14] - m[0] * m[5] * m[14])/det,
		(m[9] * m[6] * m[3] - m[5] * m[10] * m[3] - m[9] * m[2] * m[7] + m[1] * m[10] * m[7] + m[5] * m[2] * m[11] - m[1] * m[6] * m[11])/det,
		(m[4] * m[10] * m[3] - m[8] * m[6] * m[3] + m[8] * m[2] * m[7] - m[0] * m[10] * m[7] - m[4] * m[2] * m[11] + m[0] * m[6] * m[11])/det,
		(m[8] * m[5] * m[3] - m[4] * m[9] * m[3] - m[8] * m[1] * m[7] + m[0] * m[9] * m[7] + m[4] * m[1] * m[11] - m[0] * m[5] * m[11])/det,
		(m[4] * m[9] * m[2] - m[8] * m[5] * m[2] + m[8] * m[1] * m[6] - m[0] * m[9] * m[6] - m[4] * m[1] * m[10] + m[0] * m[5] * m[10])/det];
		
		this.inverseMat=new GLGE.Mat(mat);
	};
	return this.inverseMat;
};
/**
* Adds a number or another matrix
* @param {object} value A GLGE.Mat or number to add
* @returns GLGE.Mat the resulting matrix
*/
GLGE.Mat.prototype.add=function(value) {
	if(value.data){
		var m=this.data;
		var m2=value.data;
		var mat=[
		m[0]+m2[0],m[1]+m2[1],m[2]+m2[2],m[3]+m2[3],
		m[4]+m2[4],m[5]+m2[5],m[6]+m2[6],m[7]+m2[7],
		m[8]+m2[8],m[9]+m2[9],m[10]+m2[10],m[11]+m2[11],
		m[12]+m2[12],m[13]+m2[13],m[14]+m2[14],m[15]+m2[15]];
		return new GLGE.Mat(mat);
	}else{
		var mat=[
		m[0]+value,m[1]+value,m[2]+value,m[3]+value,
		m[4]+value,m[5]+value,m[6]+value,m[7]+value,
		m[8]+value,m[9]+value,m[10]+value,m[11]+value,
		m[12]+value,m[13]+value,m[14]+value,m[15]+value];
		return new GLGE.Mat(mat);
	};
};
/**
* Subtracts a number or another matrix
* @param {object} value A GLGE.Mat or number to subtract
* @returns GLGE.Mat the resulting matrix
*/
GLGE.Mat.prototype.subtract=function(value) {
	if(value.data){
		var m=this.data;
		var m2=value.data;
		var mat=[
		m[0]-m2[0],m[1]-m2[1],m[2]-m2[2],m[3]-m2[3],
		m[4]-m2[4],m[5]-m2[5],m[6]-m2[6],m[7]-m2[7],
		m[8]-m2[8],m[9]-m2[9],m[10]-m2[10],m[11]-m2[11],
		m[12]-m2[12],m[13]-m2[13],m[14]-m2[14],m[15]-m2[15]];
		return new GLGE.Mat(mat);
	}else{
		var mat=[
		m[0]-value,m[1]-value,m[2]-value,m[3]-value,
		m[4]-value,m[5]-value,m[6]-value,m[7]-value,
		m[8]-value,m[9]-value,m[10]-value,m[11]-value,
		m[12]-value,m[13]-value,m[14]-value,m[15]-value];
		return new GLGE.Mat(mat);
	};
};
/**
* Builds the transpose of the matrix
* @returns {GLGE.Mat} the transposed matrix
*/
GLGE.Mat.prototype.transpose=function() {
	if(!this.transposeMat){
		var mat=[
		this.data[0],this.data[4],this.data[8],this.data[12],
		this.data[1],this.data[5],this.data[9],this.data[13],
		this.data[2],this.data[6],this.data[10],this.data[14],
		this.data[3],this.data[7],this.data[11],this.data[15]];
		this.transposeMat=new GLGE.Mat(mat);
	}
	return this.transposeMat;
};
/**
* Multiplies this matrix with a GLGE.Mat, GLGE.Vec or an array length 3-4
* @param {object} value An GLGE.Mat, GLGE.vec or Array
* @returns {GLGE.Mat|GLGE.Vec}
*/
GLGE.Mat.prototype.mul=function(value) {
	if(value.data || value instanceof Array){
		return this.cross(value);
	}else{
		var m=this.data;
		var mat=[
		m[0]*value,m[1]*value,m[2]*value,m[3]*value,
		m[4]*value,m[5]*value,m[6]*value,m[7]*value,
		m[8]*value,m[9]*value,m[10]*value,m[11]*value,
		m[12]*value,m[13]*value,m[14]*value,m[15]*value];
		return new GLGE.Mat(mat);
	};
};
/**
* Sets the value at the specified index
* @param {number} i the first index
* @param {number} j the second index
* @param {number} value the value to set
*/
GLGE.Mat.prototype.set=function(i,j,value){
	this.inverseMat=null;
	this.glArray=null;
	this.transposeMat=null;
	this.data[((i-1)*4+(j-1))]=value;
};
/**
* Gets the value at the specified index
* @param {number} i the first index
* @param {number} j the second index
* @returns {number} the value at the given index
*/
GLGE.Mat.prototype.get=function(i,j){
	return this.data[((i-1)*4+(j-1))];
};
/**
* gets the a webgl float array for this Matrix, once generated it will cache it so it doesn't need to recreate everytime
* @returns {WebGLFloatArray} the webgl array for this Matrix
* @private
*/
GLGE.Mat.prototype.glData=function(){
	if(!this.glArray){
		this.glArray=new WebGLFloatArray(this.t().data);
	}
	return this.glArray;
};
/**
 * @function Alias
 * @see GLGE.Mat#mul
 */
GLGE.Mat.prototype.x=GLGE.Mat.prototype.mul;
/**
 * @function Alias
 * @see GLGE.Mat#determinant
 */
GLGE.Mat.prototype.det=GLGE.Mat.prototype.determinant;
/**
 * @function Alias
 * @see GLGE.Mat#inverse
 */
GLGE.Mat.prototype.inv=GLGE.Mat.prototype.inverse;
/**
 * @function Alias
 * @see GLGE.Mat#get
 */
GLGE.Mat.prototype.e=GLGE.Mat.prototype.get;
/**
 * @function Alias
 * @see GLGE.Mat#transpose
 */
GLGE.Mat.prototype.t=GLGE.Mat.prototype.transpose;

/**
 * Creates an identity matrix
 * @returns {GLGE.Mat} the identity matrix
 */
GLGE.identMatrix=function(){
	return new GLGE.Mat([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
};
/**
 * Creates a translation matrix
 * @returns {Object} value an array GLGE.Vec or 3 paramters
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
	return new GLGE.Mat([
		1,0,0,x,
		0,1,0,y,
		0,0,1,z,
		0,0,0,1
		]);
};
/**
 * Creates a scale matrix
 * @returns {Object} value an array GLGE.Vec or 3 paramters
 * @returns {GLGE.Mat} the scale matrix
 */
GLGE.scaleMatrix=function(value){
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
	return new GLGE.Mat([
		x,0,0,0,
		0,y,0,0,
		0,0,z,0,
		0,0,0,1
		]);
};
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
 * @returns {Object} value an array GLGE.Vec or 3 paramters
 * @returns {GLGE.Mat} the rotation matrix
 */
GLGE.rotateMatrix=function(value,type){
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
	var rotx=new GLGE.Mat([1,0,0,0,0,cosx,-sinx,0,0,sinx,cosx,0,0,0,0,1]);
	var roty=new GLGE.Mat([cosy,0,siny,0,0,1,0,0,-siny,0,cosy,0,0,0,0,1]);
	var rotz=new GLGE.Mat([cosz,-sinz,0,0,sinz,cosz,0,0,0,0,1,0,0,0,0,1]);
	switch(type){
		case GLGE.ROT_XYZ:
			return rotx.x(roty.x(rotz));
			break;
		case GLGE.ROT_XZY:
			return rotx.x(rotz.x(roty));
			break;
		case GLGE.ROT_YXZ:
			return roty.x(rotx.x(rotz));
			break;
		case GLGE.ROT_YZX:
			return roty.x(rotz.x(rotx));
			break;
		case GLGE.ROT_ZXY:
			return rotz.x(rotx.x(roty));
			break;
		case GLGE.ROT_ZYX:
			return rotz.x(roty.x(rotx));
			break;
	}
};


GLGE.angleAxis=function(angle, axis) {
        var xmx,ymy,zmz,xmy,ymz,zmx,xms,yms,zms;
	if(axis instanceof GLGE.Vec) axis=[axis.e(1),axis.e(2),axis.e(3),0]

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
			0,0,0,1]

        return new GLGE.Mat(matrix);
};

GLGE.quatRotation=function(qx,qy,qz,qw){
	return new GLGE.Mat([
	1 - 2*qy*qy - 2*qz*qz,2*qx*qy - 2*qz*qw,2*qx*qz + 2*qy*qw,0,
	2*qx*qy + 2*qz*qw,1 - 2*qx*qx - 2*qz*qz,2*qy*qz - 2*qx*qw,0,
	2*qx*qz - 2*qy*qw,2*qy*qz + 2*qx*qw,1 - 2*qx*qx - 2*qy*qy,0,
	0,0,0,1
	])
};

GLGE.makeOrtho=function(left,right,bottom,top,near,far){
	var x = -(right+left)/(right-left);
	var y = -(top+bottom)/(top-bottom);
	var z = -(far+near)/(far-near);
    
        return new GLGE.Mat([2/(right-left), 0, 0, x,
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
	return new GLGE.Mat([x, 0, a, 0,
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

})(GLGE);