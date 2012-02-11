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
 * @name glge_md2.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
 * @name GLGE.MD2#md2AnimFinished
 * @event fired when the the animation has finished
 * @param {object} data
 */

/**
* @class A quake MD2 model class
* @augments GLGE.Object
*/
GLGE.MD2=function(uid){
	this.MD2Started=+new Date;
	this.setAnimation(new GLGE.AnimationVector);
	GLGE.Object.call(this,uid);
}
GLGE.augment(GLGE.Object,GLGE.MD2);
GLGE.MD2.prototype.loadingCache={};
GLGE.MD2.prototype.headersCache={};
GLGE.MD2.prototype.meshCache={};
GLGE.MD2.prototype.MD2Animations={};
GLGE.MD2.prototype.MD2StartFrame=0;
GLGE.MD2.prototype.MD2EndFrame=0;
GLGE.MD2.prototype.MD2Loop=true;
GLGE.MD2.prototype.MD2AnimFinished=false;

GLGE.MD2.prototype.headerNames=[
"ident",
"version",
"skinwidth",
"skinheight",
"framesize",
"num_skins",
"num_xyz",
"num_st",
"num_tris",
"num_glcmds",
"num_frames",
"ofs_skins",
"ofs_st",
"ofs_tris",
"ofs_frames",
"ofs_glcmds",
"ofs_end"];

GLGE.MD2.prototype.preNormals = [
  [-0.525731,  0.000000,  0.850651], [-0.442863,  0.238856,  0.864188], [-0.295242,  0.000000,  0.955423], 
  [-0.309017,  0.500000,  0.809017], [-0.162460,  0.262866,  0.951056], [ 0.000000,  0.000000,  1.000000], 
  [ 0.000000,  0.850651,  0.525731], [-0.147621,  0.716567,  0.681718], [ 0.147621,  0.716567,  0.681718], 
  [ 0.000000,  0.525731,  0.850651], [ 0.309017,  0.500000,  0.809017], [ 0.525731,  0.000000,  0.850651], 
  [ 0.295242,  0.000000,  0.955423], [ 0.442863,  0.238856,  0.864188], [ 0.162460,  0.262866,  0.951056], 
  [-0.681718,  0.147621,  0.716567], [-0.809017,  0.309017,  0.500000], [-0.587785,  0.425325,  0.688191], 
  [-0.850651,  0.525731,  0.000000], [-0.864188,  0.442863,  0.238856], [-0.716567,  0.681718,  0.147621], 
  [-0.688191,  0.587785,  0.425325], [-0.500000,  0.809017,  0.309017], [-0.238856,  0.864188,  0.442863], 
  [-0.425325,  0.688191,  0.587785], [-0.716567,  0.681718, -0.147621], [-0.500000,  0.809017, -0.309017], 
  [-0.525731,  0.850651,  0.000000], [ 0.000000,  0.850651, -0.525731], [-0.238856,  0.864188, -0.442863], 
  [ 0.000000,  0.955423, -0.295242], [-0.262866,  0.951056, -0.162460], [ 0.000000,  1.000000,  0.000000], 
  [ 0.000000,  0.955423,  0.295242], [-0.262866,  0.951056,  0.162460], [ 0.238856,  0.864188,  0.442863], 
  [ 0.262866,  0.951056,  0.162460], [ 0.500000,  0.809017,  0.309017], [ 0.238856,  0.864188, -0.442863], 
  [ 0.262866,  0.951056, -0.162460], [ 0.500000,  0.809017, -0.309017], [ 0.850651,  0.525731,  0.000000], 
  [ 0.716567,  0.681718,  0.147621], [ 0.716567,  0.681718, -0.147621], [ 0.525731,  0.850651,  0.000000], 
  [ 0.425325,  0.688191,  0.587785], [ 0.864188,  0.442863,  0.238856], [ 0.688191,  0.587785,  0.425325], 
  [ 0.809017,  0.309017,  0.500000], [ 0.681718,  0.147621,  0.716567], [ 0.587785,  0.425325,  0.688191], 
  [ 0.955423,  0.295242,  0.000000], [ 1.000000,  0.000000,  0.000000], [ 0.951056,  0.162460,  0.262866], 
  [ 0.850651, -0.525731,  0.000000], [ 0.955423, -0.295242,  0.000000], [ 0.864188, -0.442863,  0.238856], 
  [ 0.951056, -0.162460,  0.262866], [ 0.809017, -0.309017,  0.500000], [ 0.681718, -0.147621,  0.716567], 
  [ 0.850651,  0.000000,  0.525731], [ 0.864188,  0.442863, -0.238856], [ 0.809017,  0.309017, -0.500000], 
  [ 0.951056,  0.162460, -0.262866], [ 0.525731,  0.000000, -0.850651], [ 0.681718,  0.147621, -0.716567], 
  [ 0.681718, -0.147621, -0.716567], [ 0.850651,  0.000000, -0.525731], [ 0.809017, -0.309017, -0.500000], 
  [ 0.864188, -0.442863, -0.238856], [ 0.951056, -0.162460, -0.262866], [ 0.147621,  0.716567, -0.681718], 
  [ 0.309017,  0.500000, -0.809017], [ 0.425325,  0.688191, -0.587785], [ 0.442863,  0.238856, -0.864188],
  [ 0.587785,  0.425325, -0.688191], [ 0.688191,  0.587785, -0.425325], [-0.147621,  0.716567, -0.681718], 
  [-0.309017,  0.500000, -0.809017], [ 0.000000,  0.525731, -0.850651], [-0.525731,  0.000000, -0.850651], 
  [-0.442863,  0.238856, -0.864188], [-0.295242,  0.000000, -0.955423], [-0.162460,  0.262866, -0.951056], 
  [ 0.000000,  0.000000, -1.000000], [ 0.295242,  0.000000, -0.955423], [ 0.162460,  0.262866, -0.951056], 
  [-0.442863, -0.238856, -0.864188], [-0.309017, -0.500000, -0.809017], [-0.162460, -0.262866, -0.951056], 
  [ 0.000000, -0.850651, -0.525731], [-0.147621, -0.716567, -0.681718], [ 0.147621, -0.716567, -0.681718], 
  [ 0.000000, -0.525731, -0.850651], [ 0.309017, -0.500000, -0.809017], [ 0.442863, -0.238856, -0.864188], 
  [ 0.162460, -0.262866, -0.951056], [ 0.238856, -0.864188, -0.442863], [ 0.500000, -0.809017, -0.309017], 
  [ 0.425325, -0.688191, -0.587785], [ 0.716567, -0.681718, -0.147621], [ 0.688191, -0.587785, -0.425325], 
  [ 0.587785, -0.425325, -0.688191], [ 0.000000, -0.955423, -0.295242], [ 0.000000, -1.000000,  0.000000], 
  [ 0.262866, -0.951056, -0.162460], [ 0.000000, -0.850651,  0.525731], [ 0.000000, -0.955423,  0.295242], 
  [ 0.238856, -0.864188,  0.442863], [ 0.262866, -0.951056,  0.162460], [ 0.500000, -0.809017,  0.309017], 
  [ 0.716567, -0.681718,  0.147621], [ 0.525731, -0.850651,  0.000000], [-0.238856, -0.864188, -0.442863], 
  [-0.500000, -0.809017, -0.309017], [-0.262866, -0.951056, -0.162460], [-0.850651, -0.525731,  0.000000], 
  [-0.716567, -0.681718, -0.147621], [-0.716567, -0.681718,  0.147621], [-0.525731, -0.850651,  0.000000], 
  [-0.500000, -0.809017,  0.309017], [-0.238856, -0.864188,  0.442863], [-0.262866, -0.951056,  0.162460], 
  [-0.864188, -0.442863,  0.238856], [-0.809017, -0.309017,  0.500000], [-0.688191, -0.587785,  0.425325], 
  [-0.681718, -0.147621,  0.716567], [-0.442863, -0.238856,  0.864188], [-0.587785, -0.425325,  0.688191], 
  [-0.309017, -0.500000,  0.809017], [-0.147621, -0.716567,  0.681718], [-0.425325, -0.688191,  0.587785], 
  [-0.162460, -0.262866,  0.951056], [ 0.442863, -0.238856,  0.864188], [ 0.162460, -0.262866,  0.951056], 
  [ 0.309017, -0.500000,  0.809017], [ 0.147621, -0.716567,  0.681718], [ 0.000000, -0.525731,  0.850651], 
  [ 0.425325, -0.688191,  0.587785], [ 0.587785, -0.425325,  0.688191], [ 0.688191, -0.587785,  0.425325], 
  [-0.955423,  0.295242,  0.000000], [-0.951056,  0.162460,  0.262866], [-1.000000,  0.000000,  0.000000], 
  [-0.850651,  0.000000,  0.525731], [-0.955423, -0.295242,  0.000000], [-0.951056, -0.162460,  0.262866], 
  [-0.864188,  0.442863, -0.238856], [-0.951056,  0.162460, -0.262866], [-0.809017,  0.309017, -0.500000], 
  [-0.864188, -0.442863, -0.238856], [-0.951056, -0.162460, -0.262866], [-0.809017, -0.309017, -0.500000], 
  [-0.681718,  0.147621, -0.716567], [-0.681718, -0.147621, -0.716567], [-0.850651,  0.000000, -0.525731], 
  [-0.688191,  0.587785, -0.425325], [-0.587785,  0.425325, -0.688191], [-0.425325,  0.688191, -0.587785], 
  [-0.425325, -0.688191, -0.587785], [-0.587785, -0.425325, -0.688191], [-0.688191, -0.587785, -0.425325]
];

GLGE.MD2.prototype.MD2FrameRate=6;

/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.MD2.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,7)=="https://"){
		return path;
	}
	else
	{
		if(!relativeto){
			relativeto=window.location.href;
		}
		if (relativeto.indexOf("://")==-1){
			return relativeto.slice(0,relativeto.lastIndexOf("/"))+"/"+path;
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
		for(var i=0;i<locpath.length;i++){
			if(locpath[i]=="..") initpath.pop();
				else if(locpath[i]!="") initpath.push(locpath[i]);
		}
		return proto+"//"+domain+"/"+initpath.join("/");
	}
}

/**
* Sets the MD2 framerate
* @param {string} framerate the MD2 files framerate
*/
GLGE.MD2.prototype.setMD2FrameRate=function(framerate){
	this.MD2FrameRate=framerate;
	return this;
}

/**
* Should GLGE Generate the tangents for the model
* @param {boolean} value tflag inidcating auto generation of tangents
*/
GLGE.MD2.prototype.setAutoTangents=function(value){
	this.doTangents=value;
	return this;
}

/**
* Sets the MD2 animation
* @param {string} framerate the MD2 files framerate
*/
GLGE.MD2.prototype.setMD2Animation=function(anim,loop){
	this.MD2Anim=anim;
	this.MD2AnimFinished=false;
	if(loop!=undefined) this.MD2Loop=loop;
	this.MD2Started=+new Date;
	if(this.MD2Animations[this.url] && this.MD2Animations[this.url][anim]){
		this.MD2LastAnimFrame=this.lastMD2Frame;
		var a=this.MD2Animations[this.url][anim];
		this.MD2StartFrame=a[0];
		this.MD2EndFrame=a[1];
	}
	return this;
}

/**
* Gets a list of availalbe animations
* @returns {array} array
*/
GLGE.MD2.prototype.getAnimations=function(){
	var animations=[];
	for(var name in this.MD2Animations[this.url]) animations.push(name);
	return animations;
}

/**
* Sets the MD2 frame number
* @param {string} frame the frame to display
*/
GLGE.MD2.prototype.setMD2Frame=function(frame){
	var totalframes=this.MD2EndFrame-this.MD2StartFrame+1;
	if(totalframes==0) return;
	if(this.MD2Loop){
		frame=frame%totalframes;
		var frame2=((Math.floor(frame)+1)%totalframes);
	}else{
		frame=Math.min(totalframes,frame);
		frame2=Math.min(totalframes,Math.floor(frame)+1);
		if(frame==totalframes && !this.MD2AnimFinished){
			this.MD2AnimFinished=true;
			this.fireEvent("md2AnimFinished",{});
		}
	}
	var framefrac=frame%1;
	if(frame<1 && this.MD2LastAnimFrame){
		frame=this.MD2LastAnimFrame-this.MD2StartFrame;
	}else{
		this.MD2LastAnimFrame=null;
		this.lastMD2Frame=Math.floor(frame)+this.MD2StartFrame;
	}
	this.setMeshFrame1(Math.floor(frame)+this.MD2StartFrame);
	this.setMeshFrame2(frame2+this.MD2StartFrame);
	this.setMeshBlendFactor(framefrac);
}

GLGE.MD2.prototype.animate=function(now,nocache){
	if(!now) now=+new Date;
	if(this.header){
		var frame=(now-this.MD2Started)/1000*this.MD2FrameRate;
		this.setMD2Frame(frame);
	}
	GLGE.Object.prototype.animate.call(this,now,nocache);
}

/**
* Sets the url of the MD2 model
* @param {string} url the url to the MD2 file
*/
GLGE.MD2.prototype.setSrc=function(url,relativeTo){
	if(relativeTo) url=this.getAbsolutePath(url,relativeTo);
	this.url=url;
	
	//prevent the same model parsing multiple times
	if(this.loadingCache[this.url] && !this.headersCache[url]){
		var that=this;
		setTimeout(function(){that.setSrc(url)},15);
		return;
	}
	
	this.loadingCache[this.url]=true;
	if(this.headersCache[url]){
		this.header=this.headersCache[url];
		this.setMesh(this.meshCache[url]);
		if(this.MD2Anim) this.setMD2Animation(this.MD2Anim);
		this.fireEvent("loaded",{url:this.url});
		return;
	}
	
	var that=this;
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType('text/plain; charset=x-user-defined');
	xhr.open("GET", url, true);
	xhr.send(null);
	this.verts=[];
	this.normals=[];
	
	xhr.onreadystatechange = function (aEvt) {
		if (xhr.readyState == 4) {
			if(xhr.status == 200){
				response = xhr.responseText;
				if (response) {
					var buffer = new ArrayBuffer(response.length);
					var byteArray = new Uint8Array(buffer);
					var byteArray = [];
					for(var i=0;i<response.length;i++){
						byteArray[i]=response.charCodeAt(i) & 0xff;
					}
					that.bufferLoaded(byteArray);
				}
			}else{
				alert("Error loading page\n");
			}
		}
	};
}

/**
* Called when the model has loaded
* @private
*/
GLGE.MD2.prototype.bufferLoaded=function(byteArray){
	this.byteArray=byteArray;
	this.parseHeader();
	this.parseFrames();
	this.parseUVs();
	this.parseFaces();
	if(this.MD2Anim) this.setMD2Animation(this.MD2Anim,this.MD2Loop);
}

/**
* Extract header info
* @private
*/
GLGE.MD2.prototype.parseHeader=function(){
	this.header={};
	for (var i=0; i<this.headerNames.length; i++) {
		this.header[this.headerNames[i]]=this.getUint16At(i*4);
	}
	this.headersCache[this.url]=this.header;
}
/**
* get 16 bit int at location
* @private
*/
GLGE.MD2.prototype.getUint16At=function(index){
	return this.byteArray[index]+this.byteArray[index+1]*256;
}
/**
* get 32 bit float at location
* @private
*/
GLGE.MD2.prototype.getFloat32At=function(index){
	var b3=this.byteArray[index];
	var b2=this.byteArray[index+1];
	var b1=this.byteArray[index+2];
	var b0=this.byteArray[index+3];
	sign = 1 - (2 * (b0 >> 7)),
	exponent = (((b0 << 1) & 0xff) | (b1 >> 7)) - 127,
	mantissa = ((b1 & 0x7f) << 16) | (b2 << 8) | b3;

	if (mantissa == 0 && exponent == -127) {
		return 0.0;
	}

	if (exponent == -127) { // Denormalized
		return sign * mantissa * Math.pow(2, -126 - 23);
	}

	return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
}
/**
* process the frame data
* @private
*/
GLGE.MD2.prototype.parseFrames=function(){
	
	var vertsArray = this.byteArray;
	var startFrame=0;
	var MD2Animations={};
	for(var j=0;j<this.header.num_frames;j++){
		var scaleTrans=[
			this.getFloat32At(this.header.ofs_frames+j*this.header.framesize),
			this.getFloat32At(this.header.ofs_frames+4+j*this.header.framesize),
			this.getFloat32At(this.header.ofs_frames+8+j*this.header.framesize),
			this.getFloat32At(this.header.ofs_frames+12+j*this.header.framesize),
			this.getFloat32At(this.header.ofs_frames+16+j*this.header.framesize),
			this.getFloat32At(this.header.ofs_frames+20+j*this.header.framesize)
		];	
		var verts=[];
		var normals=[];
		var start=this.header.ofs_frames+24+j*this.header.framesize;
		var frameName="";
		for(var i=start;i<start+16;i++){
			if(vertsArray[i]==0) break;
			frameName+=String.fromCharCode(vertsArray[i]);
		}
		frameName=frameName.replace(/[0-9]/g,'');
		if(lastFrameName && frameName!=lastFrameName){
			MD2Animations[lastFrameName]=[startFrame,j-1];
			startFrame=j;
		}
		var lastFrameName=frameName;
		start=this.header.ofs_frames+40+j*this.header.framesize;
		for(var i=start;i<start+this.header.framesize-40;i=i+12){
			verts.push(vertsArray[i]*scaleTrans[0]+scaleTrans[3]);
			verts.push(vertsArray[i+1]*scaleTrans[1]+scaleTrans[4]);
			verts.push(vertsArray[i+2]*scaleTrans[2]+scaleTrans[5]);
			verts.push(vertsArray[i+4]*scaleTrans[0]+scaleTrans[3]);
			verts.push(vertsArray[i+5]*scaleTrans[1]+scaleTrans[4]);
			verts.push(vertsArray[i+6]*scaleTrans[2]+scaleTrans[5]);
			verts.push(vertsArray[i+8]*scaleTrans[0]+scaleTrans[3]);
			verts.push(vertsArray[i+9]*scaleTrans[1]+scaleTrans[4]);
			verts.push(vertsArray[i+10]*scaleTrans[2]+scaleTrans[5]);
			var n=this.preNormals[vertsArray[i+3]];
			if(!n) n=[0,0,1]; //sanity check
			normals.push(n[0]);normals.push(n[1]);normals.push(n[2]);
			n=this.preNormals[vertsArray[i+7]];
			if(!n) n=[0,0,1]; //sanity check
			normals.push(n[0]);normals.push(n[1]);normals.push(-n[2]);
			n=this.preNormals[vertsArray[i+11]];
			if(!n) n=[0,0,1]; //sanity check
			normals.push(n[0]);normals.push(n[1]);normals.push(n[2]);
		}
		this.verts[j]=verts;
		this.normals[j]=normals;
	}
	MD2Animations[lastFrameName]=[startFrame,j-2];
	this.MD2Animations[this.url]=MD2Animations;
}
/**
* Process the UV data
* @private
*/
GLGE.MD2.prototype.parseUVs=function(){
	var uvs=[];
	var byteArray=this.byteArray;
	var start=this.header.ofs_st;
	for(var i=start;i<start+this.header.num_st*4;i=i+4){
		uvs.push(this.getUint16At(i)/this.header.skinwidth);
		uvs.push(1-this.getUint16At(i+2)/this.header.skinheight);
	}
	this.globaluvs=uvs;
}
/**
* parses the face data in the md2 file
* @private
*/
GLGE.MD2.prototype.parseFaces=function(){
	var start=this.header.ofs_tris;
	var len=start+this.header.num_tris*12;
	var faces=[];
	var uvs=[];
	var verts=[];
	var normals=[];
	var idx=0;
	for(var i=start;i<len;i=i+12){
		faces.push(idx++);
		faces.push(idx++);
		faces.push(idx++);
		var n1=this.getUint16At(i);
		var n2=this.getUint16At(i+2);
		var	n3=this.getUint16At(i+4);
		for(var j=0;j<this.verts.length;j++){
			if(!verts[j]){verts[j]=[];normals[j]=[];}
			var v=this.verts[j];
			var n=this.normals[j];
			verts[j].push(v[n1*3]);
			verts[j].push(v[n1*3+1]);
			verts[j].push(v[n1*3+2]);
			normals[j].push(n[n1*3]);
			normals[j].push(n[n1*3+1]);
			normals[j].push(n[n1*3+2]);
			verts[j].push(v[n2*3]);
			verts[j].push(v[n2*3+1]);
			verts[j].push(v[n2*3+2]);
			normals[j].push(n[n2*3]);
			normals[j].push(n[n2*3+1]);
			normals[j].push(n[n2*3+2]);
			verts[j].push(v[n3*3]);
			verts[j].push(v[n3*3+1]);
			verts[j].push(v[n3*3+2]);
			normals[j].push(n[n3*3]);
			normals[j].push(n[n3*3+1]);
			normals[j].push(n[n3*3+2]);
		}
		uvs.push(this.globaluvs[this.getUint16At(i+6)*2]);
		uvs.push(this.globaluvs[this.getUint16At(i+6)*2+1]);
		uvs.push(this.globaluvs[this.getUint16At(i+8)*2]);
		uvs.push(this.globaluvs[this.getUint16At(i+8)*2+1]);
		uvs.push(this.globaluvs[this.getUint16At(i+10)*2]);
		uvs.push(this.globaluvs[this.getUint16At(i+10)*2+1]);
	}
	this.normals=normals;
	this.verts=verts;
	this.uvs=uvs;
	this.faces=faces;
	this.createMesh()
}

/**
* creates the mesh
* @private
*/
GLGE.MD2.prototype.createMesh=function(){
	var m=new GLGE.Mesh;
	var verts=this.verts;
	var normals=this.normals;
	var uvs=this.uvs;
	var faces=this.faces;
	for(var i=0;i<verts.length;i++){
		m.setPositions(verts[i],i).setNormals(normals[i],i);
	}
	if(this.doTangents){
		m.setUV(uvs).setFaces(faces);
	}else{
		m.setFaces(faces).setUV(uvs);
	}
	this.setMesh(m);
	this.meshCache[this.url]=m;
	this.fireEvent("loaded",{url:this.url});
}

GLGE.Group.prototype.addMD2=GLGE.Group.prototype.addObject;
GLGE.Scene.prototype.addMD2=GLGE.Scene.prototype.addObject;


})(GLGE);