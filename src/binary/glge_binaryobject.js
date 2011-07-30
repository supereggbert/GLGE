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
 * @file
 * @name glge_binaryobject.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


var fieldMap=[
["zTrans","Ztransparent","Uint8",1],
["noCastShadows","CastShadow","Uint8",1],
["lineWidth","LineWidth","Float32",1],
["pointSize","PointSize","Float32",1],
["drawType","DrawType","Uint16",1],
["cull","Cull","Uint8",1],
["meshFrame1","MeshFrame1","Uint16",1],
["meshFrame2","MeshFrame2","Uint16",1],
["meshBlendFactor","MeshBlendFactor","Float32",1],
["locX","LocX","Float32",1],
["locY","LocY","Float32",1],
["locZ","LocZ","Float32",1],
["dLocX","DLocX","Float32",1],
["dLocY","DLocY","Float32",1],
["dLocZ","DLocZ","Float32",1],
["rotX","RotX","Float32",1],
["rotY","RotY","Float32",1],
["rotZ","RotZ","Float32",1],
["dRotX","DRotX","Float32",1],
["dRotY","DRotY","Float32",1],
["dRotZ","DRotZ","Float32",1],
["scaleX","SacleX","Float32",1],
["scaleY","SacleY","Float32",1],
["scaleZ","SacleZ","Float32",1],
["dScaleX","DSacleX","Float32",1],
["dScaleY","DSacleY","Float32",1],
["dScaleZ","DSacleZ","Float32",1],
["quatX","QuatX","Float32",1],
["quatY","QuatY","Float32",1],
["quatZ","QuatZ","Float32",1],
["quatW","QuatW","Float32",1],
["rotMatrix","RotMatrix","Float32",16],
["rotOrder","RotOrder","Uint16",1],
["mode","TransformMode","Uint16",1],
["upAxis","UpAxis","Float32",3]];



GLGE.Object.prototype.binaryPack=function(pack){
	//will need to add multimaterial depenancies first
	for(var i=0;i<this.multimaterials.length;i++){
		pack.addResource(this.multimaterials[i]);
	}
	
	var size=4+this.multimaterials.length*32;
	
	for(var i=0;i<fieldMap.length;i++){
		var map=fieldMap[i];
		size+=GLGE.BYTE_SIZES[map[2]]*map[3];
	}
	
	var buffer=new GLGE.BinaryBuffer(size);
	buffer.write("Uint16",fieldMap.length);
	
	for(var i=0;i<fieldMap.length;i++){
		var map=fieldMap[i];
		if(map[3]>1){
			var value=this[map[0]];
			if(!value) value=[];
			buffer.write(map[2],value,map[3]);
		}else{
			buffer.write(map[2],this[map[0]]);
		}
	}
	buffer.write("Uint16",this.multimaterials.length);
	for(var i=0;i<this.multimaterials.length;i++){
		buffer.write("String",this.multimaterials[i].uid,32);
	}
	return buffer;
}

GLGE.Object.binaryUnPack=function(buffer,data){

}


})(GLGE)