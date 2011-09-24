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
 * @name glge_placeable.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


GLGE.ZUP=[0,0,1];
GLGE.YUP=[0,1,0];
GLGE.XUP=[1,0,0];


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
GLGE.Placeable.prototype.upAxis=GLGE.ZUP;

/**
* @name GLGE.Placeable#appened
* @event fires when all the object is appened as a child to another
* @param {object} event
*/
	
/**
* @name GLGE.Placeable#removed
* @event fires when all the object is removed as a child to another
* @param {object} event
*/

/**
* @name GLGE.Placeable#matrixUpdate
* @event fires when this object has its transform changed supplies the target object as event.obj
* @param {object} event
*/


/**
* @name GLGE.Placeable#childMatrixUpdate
* @event fires when any child objects have there transform changed supplies the target object as event.obj
* @param {object} event
*/

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
* gets the up axis of the object
*/
GLGE.Placeable.prototype.getUpAxis=function(){
	return this.upAxis;
}
/**
* sets the upAxis for this object
* @param {array} value the up axis for the object
*/
GLGE.Placeable.prototype.setUpAxis=function(value){
	this.upAxis=value;
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
	var xvec=GLGE.toUnitVec3(GLGE.crossVec3(this.upAxis,zvec));
	
	if(xvec[0]==0 && xvec[1]==0 && xvec[2]==0) xvec[1]=1;
	
	var yvec=GLGE.toUnitVec3(GLGE.crossVec3(zvec,xvec));		
	this.setRotMatrix(GLGE.Mat4([xvec[0], yvec[0], zvec[0], 0,
					xvec[1], yvec[1], zvec[1], 0,
					xvec[2], yvec[2], zvec[2], 0,
					0, 0, 0, 1]));
}
/**
* Sets the transform mode
* @param {mode} value the transform mode
*/
GLGE.Placeable.prototype.setTransformMode=function(value){
	this.mode=value;
	this.matrix=null;
	return this;
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
GLGE.Placeable.prototype.setLocY=function(value){this.locY=value; this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the z location of the object
* @param {number} value The value to assign to the z position
*/
GLGE.Placeable.prototype.setLocZ=function(value){this.locZ=value; this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the location of the object
* @param {number} x The value to assign to the x position
* @param {number} y The value to assign to the y position
* @param {number} z The value to assign to the z position
*/
GLGE.Placeable.prototype.setLoc=function(x,y,z){this.locX=x;this.locY=y;this.locZ=z; this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the x location displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDLocX=function(value){this.dLocX=value;this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
/**
* Sets the y location displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDLocY=function(value){this.dLocY=value; this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
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
GLGE.Placeable.prototype.setDLoc=function(x,y,z){this.dLocX=x;this.dLocY=y;this.dLocZ=z; this.translateMatrix=null;this.staticMatrix=null;this.updateMatrix();return this;}
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
	if(!this.tmatrix) this.tmatrix=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
	if(!this.translateMatrix){
		this.tmatrix[3]=+this.locX+this.dLocX;
		this.tmatrix[7]=+this.locY+this.dLocY;
		this.tmatrix[11]=+this.locZ+this.dLocZ;
		this.translateMatrix=this.tmatrix;
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
	var o=obj=this;
	obj.fireEvent("matrixUpdate",{obj:o});
	if(obj=obj.parent) obj.fireEvent("childMatrixUpdate",{obj:o});
}
/**
* Gets the model matrix to transform the model within the world
*/
GLGE.Placeable.prototype.getModelMatrix=function(){
	if(!this.matrix){
		GLGE.reuseMatrix4(this.invmatrix);
		GLGE.reuseMatrix4(this.transmatrix);
		GLGE.reuseMatrix4(this.transinvmatrix);
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
			var M1=GLGE.mulMat4(this.getRotMatrix(),scale);
			var matrix=GLGE.mulMat4(translate,M1);
			//GLGE.reuseMatrix4(M1);
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
/**
* Moves the object
* @returns {array} amount array [x,y,z] to move
* @returns {number} reference move with respecct to GLGE.GLOBAL or GLGE.LOCAL
*/
GLGE.Placeable.prototype.move=function(amount,reference){
	if(!reference) reference=GLGE.GLOBAL;
	switch(reference){
		case GLGE.GLOBAL:
			this.setLocX(+this.locX+amount[0]);
			this.setLocY(+this.locY+amount[1]);
			this.setLocZ(+this.locZ+amount[2]);
			break;
		case GLGE.LOCAL:
			var matrix=this.getModelMatrix();
			var xAxis=GLGE.toUnitVec3([matrix[0],matrix[1],matrix[2]]);
			var yAxis=GLGE.toUnitVec3([matrix[4],matrix[5],matrix[6]]);
			var zAxis=GLGE.toUnitVec3([matrix[8],matrix[9],matrix[10]]);
			var x=xAxis[0]*amount[0]+xAxis[1]*amount[1]+xAxis[2]*amount[2];
			var y=yAxis[0]*amount[0]+yAxis[1]*amount[1]+yAxis[2]*amount[2];
			var z=zAxis[0]*amount[0]+zAxis[1]*amount[1]+zAxis[2]*amount[2];
			this.setLocX(+this.locX+x);
			this.setLocY(+this.locY+y);
			this.setLocZ(+this.locZ+z);
			break;
	}
	return this;
}

})(GLGE);