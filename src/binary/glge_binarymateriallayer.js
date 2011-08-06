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
 * @name glge_binarymateriallayer.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){
	
var fieldMap=[
	["height","Height","Float32",1],
	["alpha","Alpha","Float32",1],
	["mapto","Mapto","Uint16",1],
	["mapinput","Mapinput","Uint16",1],
	["scaleX","ScaleX","Float32",1],
	["scaleY","ScaleY","Float32",1],
	["scaleZ","ScaleZ","Float32",1],
	["dScaleX","DScaleX","Float32",1],
	["dScaleY","DScaleY","Float32",1],
	["dScaleZ","DScaleZ","Float32",1],
	["offsetX","OffsetX","Float32",1],
	["offsetY","OffsetY","Float32",1],
	["offsetZ","OffsetZ","Float32",1],
	["dOffsetX","DOffsetX","Float32",1],
	["dOffsetY","DOffsetY","Float32",1],
	["dOffsetZ","DOffsetZ","Float32",1],
	["rotX","RotX","Float32",1],
	["rotY","RotY","Float32",1],
	["rotZ","RotZ","Float32",1],
	["dRotX","DRotX","Float32",1],
	["dRotY","DRotY","Float32",1],
	["dRotZ","DRotZ","Float32",1],
	["blendMode","BlendMode","Uint16",1]
]

GLGE.MaterialLayer.prototype.binaryPack=function(pack){
	if(this.texture) pack.addResource(this.texture);
	
	var size=4+40;
	
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
	//write uid texture to end
	buffer.write("String",this.texture.uid,40);
	return buffer;
}

GLGE.MaterialLayer.binaryUnPack=function(pack,data){
	var buffer=pack.buffer;
	var materialLayer=new GLGE.MaterialLayer(data.uid);
	var num_feilds=buffer.read("Uint32");

	for(var i=0;i<num_feilds;i++){
		var map=fieldMap[i];
		if(map[3]>1){
			var value=buffer.read(map[2],map[3]);
			materialLayer["set"+map[1]](value);
		}else{
			materialLayer["set"+map[1]](buffer.read(map[2]));
		}
	}
	materialLayer.setTexture(pack.getResource(buffer.read("String",40)));
	
	return materialLayer;
}


})(GLGE)