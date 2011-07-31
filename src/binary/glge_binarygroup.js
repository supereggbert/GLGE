/*
GLGE WebGL Graphics Engine
Copyright (c) 2011, Paul Brunt
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
 * @name glge_binarygroup.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


var fieldMap=[
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
["scaleX","ScaleX","Float32",1],
["scaleY","ScaleY","Float32",1],
["scaleZ","ScaleZ","Float32",1],
["dScaleX","DScaleX","Float32",1],
["dScaleY","DScaleY","Float32",1],
["dScaleZ","DScaleZ","Float32",1],
["quatX","QuatX","Float32",1],
["quatY","QuatY","Float32",1],
["quatZ","QuatZ","Float32",1],
["quatW","QuatW","Float32",1],
["rotOrder","RotOrder","Uint16",1],
["rotmatrix","RotMatrix","Float32",16],
["mode","TransformMode","Uint16",1],
["upAxis","UpAxis","Float32",3]];



GLGE.Group.prototype.binaryPack=function(pack){
	var num_children=0;
	for(var i=0;i<this.children.length;i++){
		var child=this.children[i];
		if(child.className=="Object" || child.className=="Group"){
			pack.addResource(child);
			num_children++;
		}
	}
	
	var size=8+num_children*40;
	
	for(var i=0;i<fieldMap.length;i++){
		var map=fieldMap[i];
		var inc=GLGE.BYTE_SIZES[map[2]];
		size=Math.ceil(size/inc)*inc
		size+=inc*map[3];
	}
	
	var buffer=new GLGE.BinaryBuffer(size);
	buffer.write("Uint32",fieldMap.length);
	
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
	buffer.write("Uint32",num_children);
	for(var i=0;i<this.children.length;i++){
		var child=this.children[i]
		if(child.className=="Object" || child.className=="Group"){
			buffer.write("String",child.uid,40);
		}
	}
	return buffer;
}

GLGE.Group.binaryUnPack=function(pack,data){
	var buffer=pack.buffer;
	var group=new GLGE.Group(data.uid);
	var num_feilds=buffer.read("Uint32");
	for(var i=0;i<num_feilds;i++){
		var map=fieldMap[i];
		if(map[3]>1){
			var value=buffer.read(map[2],map[3]);
			group["set"+map[1]](value);
		}else{
			group["set"+map[1]](buffer.read(map[2]));
		}
	}
	var num_children=buffer.read("Uint32");
	for(var i=0;i<num_children;i++){
		var uid=buffer.read("String",40);
		var child=pack.getResource(uid);
		group.addChild(child);
	}
	
	return group;
}

if(GLGE.Collada){
	GLGE.Collada.binaryUnPack=GLGE.Group.binaryUnPack;
	GLGE.Collada.prototype.binaryPack=GLGE.Group.prototype.binaryPack;
}


})(GLGE)