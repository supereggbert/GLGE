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
 * @fileOverview
 * @name glge_binarypack.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

GLGE.BINARY_TYPES=[
	"Mesh",
	"Object",
	"ObjectLod",
	"MultiMaterial",
	"Collada",
	"Group",
	"Material",
	"MaterialLayer",
	"Texture"
];

/**
* @class class to pack and unback GLGEs binary format
* @see GLGE.BinaryPack
* @augments GLGE.Events
*/
GLGE.BinaryPack=function(){
	this.pack=[];
	this.buffer=new GLGE.BinaryBuffer(0);
}

GLGE.augment(GLGE.Events,GLGE.BinaryPack);

GLGE.BinaryPack.prototype.load=function(url){
	var binaryPack=this;
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, true);
	xhr.responseType = "arraybuffer";
	xhr.onreadystatechange = function (aEvt) {
		if (xhr.readyState == 4) {
			if(xhr.status == 200){
				var buffer = xhr.response;
				binaryPack.buffer=new GLGE.BinaryBuffer(buffer);
				if(!binaryPack.buffer.views || binaryPack.buffer.read("String",4)!="GLGE"){
					LZMA.decompress(new Uint8Array(buffer),function(data){
						binaryPack.buffer=new GLGE.BinaryBuffer(data.length);
						for(var i=0;i<binaryPack.buffer.views.Uint8.length;i++){
							binaryPack.buffer.views.Uint8[i]=data[i];
						}
						//alert(binaryPack.buffer.getUrl());
						//alert(binaryPack.buffer.read("String",4));
						binaryPack.unPack();
						binaryPack.fireEvent("loaded",{pack:binaryPack});
					});
				}else{
					binaryPack.buffer.reset();
					binaryPack.unPack();
					binaryPack.fireEvent("loaded",{pack:binaryPack});
				}
			}
		}
	}
	xhr.send(null);
}

GLGE.BinaryPack.prototype.addResource=function(GLGEObject){
	if(this.pack[GLGEObject.uid] || !GLGEObject.binaryPack) return;
	var packed=GLGEObject.binaryPack(this);
	var data={obj:GLGEObject, uid:GLGEObject.uid,type:GLGE.BINARY_TYPES.indexOf(GLGEObject.className),pack:packed};
	this.pack[GLGEObject.uid]=data;
	this.pack.push(data);
	return this;
}

GLGE.BinaryPack.prototype.getResource=function(uid){
	if(!this.pack[uid]) return null;
	return this.pack[uid].obj;
}

GLGE.BinaryPack.prototype.unPack=function(){
	this.buffer.reset();
	var result=this.buffer.read("String",4);
	if(result!="GLGE"){
		GLGE.error("Unknown file type:"+result);
		return;
	}
	var version=this.buffer.read("Uint16");
	var num_resources=this.buffer.read("Uint16");
	this.pack=[];
	for(var i=0;i<num_resources;i++){
		var data={};
		data.type=this.buffer.read("Uint16");
		data.uid=this.buffer.read("String",40);
		data.uidlength=data.uid.length;
		data.offset=this.buffer.read("Uint32");
		data.size=this.buffer.read("Uint32");
		this.pack.push(data);
		this.pack[data.uid]=data;
	}
	for(var i=0;i<num_resources;i++){
		var data=this.pack[i];
		this.buffer.seek(data.offset);
		data.obj=GLGE[GLGE.BINARY_TYPES[data.type]].binaryUnPack(this,data);
	}
}

GLGE.BinaryPack.prototype.getPack=function(){
	var size=8+this.pack.length*54;
	size=Math.ceil(size/4)*4; //make sure header size is multiple of 4
	
	for(var i=0;i<this.pack.length;i++){
		this.pack[i].offset=size;
		size+=Math.ceil(this.pack[i].pack.size/4)*4;
	}
	
	//create the header
	this.buffer=new GLGE.BinaryBuffer(size);
	this.buffer.write("String","GLGE",4); //ID
	this.buffer.write("Uint16",1); //version number
	this.buffer.write("Uint16",this.pack.length); //number of resources
	for(var i=0;i<this.pack.length;i++){
		var pack=this.pack[i];
		this.buffer.write("Uint16",pack.type);
		this.buffer.write("String",pack.uid,40);
		this.buffer.write("Uint32",pack.offset);
		this.buffer.write("Uint32",pack.pack.size);
		for(var j=0;j<pack.pack.size;j++){
			var pointer=pack.offset+j;
			this.buffer.views["Uint8"][pointer]=pack.pack.views["Uint8"][j];
		}
	}
	return this.buffer;
}

})(GLGE)