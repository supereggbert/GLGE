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
 * @name glge_binarymaterial.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

GLGE.BYTE_SIZES.Color=12
	
var fieldMap=[
	["shadeless","Shadeless","Uint8",1],
	["shadow","Shadow","Uint8",1],
	["color","Color","Color",1],
	["specColor","SpecularColor","Color",1],
	["ambient","Ambient","Color",1],
	["emit","Emit","Color",1],
	["alpha","Alpha","Float32",1],
	["shine","Shininess","Float32",1],
	["reflect","Reflectivity","Float32",1],
	["binaryAlpha","BinaryAlpha","Uint8",1],
	["shadeless","Shadeless","Uint8",1]
]

GLGE.Material.prototype.binaryPack=function(pack){
	for(var i=0;i<this.layers.length;i++){
		pack.addResource(this.layers[i]);
	}
	for(var i=0;i<this.textures.length;i++){
		pack.addResource(this.textures[i]);
	}
	if(this.fallback){
		pack.addResource(this.fallback);
	}
	
	var size=12+this.layers.length*40+this.textures.length*40+40;
	
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
			if(map[2]=="Color"){
				buffer.write("Float32",this[map[0]].r);
				buffer.write("Float32",this[map[0]].g);
				buffer.write("Float32",this[map[0]].b);
			}else{
				buffer.write(map[2],this[map[0]]);
			}
		}
	}
	buffer.write("Uint32",this.layers.length);
	for(var i=0;i<this.layers.length;i++){
		buffer.write("String",this.layers[i].uid,40);
	}
	buffer.write("Uint32",this.textures.length);
	for(var i=0;i<this.textures.length;i++){
		buffer.write("String",this.textures[i].uid,40);
	}
	if(this.fallback){
		buffer.write("String",this.fallback.uid,40);
	}
	return buffer;
}

GLGE.Material.binaryUnPack=function(pack,data){
	var buffer=pack.buffer;
	var material=new GLGE.Material(data.uid);
	var num_feilds=buffer.read("Uint32");
	for(var i=0;i<num_feilds;i++){
		var map=fieldMap[i];
		if(map[3]>1){
			var value=buffer.read(map[2],map[3]);
			material["set"+map[1]](value);
		}else{
			if(map[2]=="Color"){
				material["set"+map[1]]({r:buffer.read("Float32"),g:buffer.read("Float32"),b:buffer.read("Float32")});
			}else{
				material["set"+map[1]](buffer.read(map[2]));
			}
		}
	}
	var num_layers=buffer.read("Uint32");
	for(var i=0;i<num_layers;i++){
		material.addMaterialLayer(pack.getResource(buffer.read("String",40)));
	}	
	var num_textures=buffer.read("Uint32");
	for(var i=0;i<num_textures;i++){
		material.addTexture(pack.getResource(buffer.read("String",40)));
	}
	var fallback=buffer.read("String",40);
	if(fallback!=""){
		material.setFallback(pack.getResource(fallback));
	}
	
	return material;
}


})(GLGE)