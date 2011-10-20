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
 * @name glge_binarybuffer.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

GLGE.BYTE_SIZES={
	"String":1,
	"Uint8":1,
	"Int8":1,
	"Uint16":2,
	"Int16":2,
	"Uint32":4,
	"Int32":4,
	"Float32":4
}

GLGE.BinaryBuffer=function(size){
	this.pointer=0;
	if(typeof(size)=="number"){
		//make sure size in multiple of 4
		this.size=Math.ceil(size/4)*4;
		var buffer=this.buffer=new ArrayBuffer(this.size);
	}else{
		buffer=this.buffer=size;
		this.size=buffer.byteLength;
		if(this.size%4!=0) return false;
	}
	this.views={
		"Int8":new Int8Array(buffer),
		"Uint8":new Uint8Array(buffer),
		"Int16":new Int16Array(buffer),
		"Uint16":new Uint16Array(buffer),
		"Int32":new Int32Array(buffer),
		"Uint32":new Uint32Array(buffer),
		"Float32":new Float32Array(buffer),
	}
}
GLGE.BinaryBuffer.prototype.seek=function(point){
	this.pointer=point;
}
GLGE.BinaryBuffer.prototype.writeString=function(data,size){
	var len=data.length;
	//if(len>size) len=size;
	for(var i=0;i<size;i++){
		this.write("Uint8",data.charCodeAt(i));
	}
	//for(i=i;i<size;i++) {this.write("Uint8",0);}
}
GLGE.BinaryBuffer.prototype.write=function(type,data,size){
	if(type=="String") return this.writeString(data,size);
	
	var inc=GLGE.BYTE_SIZES[type];
	this.pointer=Math.ceil(this.pointer/inc)*inc;
	var offset=this.pointer/inc;
	if(size){
		for(var i=0;i<size;i++){
			this.views[type][(offset)+i]=data[i];
		}
		this.pointer+=inc*size;
	}else{
		this.views[type][offset]=data;
		this.pointer+=inc;
	}
}
GLGE.BinaryBuffer.prototype.readString=function(size){
	var string="";
	for(var i=0;i<size;i++){
		var value=this.read("Uint8");
		if(value) string+=String.fromCharCode(value);
	}
	return string;
}
GLGE.BinaryBuffer.prototype.read=function(type,size){
	if(type=="String") return this.readString(size);

	if(!this.views) return;
	
	var inc=GLGE.BYTE_SIZES[type];
	this.pointer=Math.ceil(this.pointer/inc)*inc;
	var offset=this.pointer/inc;
	if(size){
		var value=new window[type+"Array"](this.buffer,this.pointer,size);
		this.pointer+=size*inc;
		return value;
	}else{
		var value=this.views[type][offset];
		this.pointer+=inc;
		return value;
	}
}
GLGE.BinaryBuffer.prototype.reset=function(){
	this.pointer=0;
	return this;
}
GLGE.BinaryBuffer.prototype.getUrl=function(){
	if(window.WebKitBlobBuilder){
		var bb = new window.WebKitBlobBuilder();
	}else{
		var bb = new window.MozBlobBuilder();
	}
	bb.append(this.buffer);
	var blobURL = window.webkitURL.createObjectURL(bb.getBlob());
	return blobURL;
}

})(GLGE)