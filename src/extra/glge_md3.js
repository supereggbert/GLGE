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
 * @name glge_md3.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
 * @name GLGE.MD3#md3AnimFinished
 * @event fired when the the animation has finished
 * @param {object} data
 */

/**
* @class A quake MD3 model class
* @augments GLGE.Group
*/
GLGE.MD3=function(uid){
	this.MD3Started=+new Date;
	this.MD3Materials=[];
	this.surfaces=[];
	this.MD3Children=[];
	this.loaded=false;
	this.setAnimation(new GLGE.AnimationVector); //set animation to force animation
	GLGE.Group.call(this,uid);
}

GLGE.augment(GLGE.Group,GLGE.MD3);
GLGE.MD3.prototype.MD3FrameRate=10;
GLGE.MD3.prototype.MD3Animations={};
GLGE.MD3.prototype.MD3Tags={};
GLGE.MD3.prototype.MD3StartFrame=0;
GLGE.MD3.prototype.MD3EndFrame=0;
GLGE.MD3.prototype.MD3Loop=true;

GLGE.MD3.prototype.headerNames=[
"NUM_FRAMES",
"NUM_TAGS",
"NUM_SURFACES",
"NUM_SKINS",
"OFS_FRAMES",
"OFS_TAGS",
"OFS_SURFACES",
"OFS_EOF"
];

GLGE.MD3.prototype.surfaceHeaderNames=[
"NUM_FRAMES",
"NUM_SHADERS",
"NUM_VERTS",
"NUM_TRIANGLES",
"OFS_TRIANGLES",
"OFS_SHADERS",
"OFS_ST",
"OFS_XYZNORMAL",
"OFS_END"
]


/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.MD3.prototype.getAbsolutePath=function(path,relativeto){
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
* Sets the url of the MD3 model
* @param {string} url the url to the MD3 file
*/
GLGE.MD3.prototype.setSrc=function(url,relativeTo){
	if(relativeTo) url=this.getAbsolutePath(url,relativeTo);
	this.url=url;
	
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
* Sets the MD3 framerate
* @param {string} framerate the MD3 files framerate
*/
GLGE.MD3.prototype.setMD3FrameRate=function(framerate){
	this.MD3FrameRate=framerate;
	return this;
}

/**
* Sets the tag to attach the model to
* @param {string} tag The name of the tag to attach to.
*/
GLGE.MD3.prototype.setTag=function(tag){
	this.MD3Tag=tag;
	return this;
}


/**
* Called when the model has loaded
* @private
*/
GLGE.MD3.prototype.bufferLoaded=function(byteArray){
	this.byteArray=byteArray;
	this.parseHeader();
	this.parseFrames();
	this.parseTags();
	this.createTags();
	this.parseSurfaces();
	this.addSurfaces(); //adds the surfaces to this group
	if(this.MD3Anim) this.setMD3Animation(this.MD3Anim,this.MD3Loop);
	if(this.MD3Children.length>0) this.addMD3Childred();
	this.loaded=true;
	this.fireEvent("loaded",{url:this.url});
}
/**
* Adds the child md3 object
* @private
*/
GLGE.MD3.prototype.addMD3Childred=function(){
	for(var i=0; i<this.MD3Children.length;i++){
		this.addMD3(this.MD3Children[i]);
	}
}

/**
* Adds the surfaces to this group
* @private
*/
GLGE.MD3.prototype.addSurfaces=function(){

	for(var i=0;i<this.surfaces.length;i++){
		if(this.MD3Tag) {
			t=this.MD3Tags[this.url][this.MD3Tag];
			this.surfaces[i].setLocX(t[0][0]).setLocY(t[0][1]).setLocX(t[0][1]).setRotMatrix(t[1]);
		}
		this.addObject(this.surfaces[i]);
	}
	return this;
}

/**
* Gets a list of availalbe animations
* @returns {array} array
*/
GLGE.MD3.prototype.getAnimations=function(){
	var animations=[];
	for(var name in this.MD3Animations[this.url]) animations.push(name);
	return animations;
}

/**
* Sets the MD3 animation
* @param {string} framerate the MD3 files framerate
*/
GLGE.MD3.prototype.setMD3Animation=function(anim,loop){
	this.MD3Anim=anim;
	if(loop!=undefined) this.MD3Loop=loop;
	this.MD3Started=+new Date;
	if(this.MD3Animations[this.url] && this.MD3Animations[this.url][anim]){
		this.MD3LastAnimFrame=this.lastMD2Frame;
		var a=this.MD3Animations[this.url][anim];
		this.MD3StartFrame=a[0];
		this.MD3EndFrame=a[1];
	}
	return this;
}


/**
* Creates the tag groups
* @private
*/
GLGE.MD3.prototype.createTags=function(){
	var tags=this.MD3Tags[this.url];
	this.MD3TagGroups={};
	for(var tag in tags){
		var t=tags[tag];
		var g=(new GLGE.Group).setLocX(t[0][0]).setLocY(t[0][1]).setLocX(t[0][1]).setRotMatrix(t[1]);
		this.addGroup(g);
		this.MD3TagGroups[tag]=g;
	}
	
}

/**
* Extract tag info
* @private
*/
GLGE.MD3.prototype.parseTags=function(){
		//alert(this.url);
	var start=this.headers.OFS_TAGS;
	var tagSize=112;
	var data=this.MD3Tags[this.url]={};
	for(var i=0;i<this.headers.NUM_TAGS;i++){
		var name=this.getStringAt(start+i*tagSize,64).replace(/[0-9_]/g,'');
		var posStart=start+i*tagSize+64
		var pos=[this.getFloat32At(posStart)*10,this.getFloat32At(posStart+4)*10,this.getFloat32At(posStart+8)*10];
		var rotStart=posStart+12;
		var rot=[this.getFloat32At(rotStart),this.getFloat32At(rotStart+4),this.getFloat32At(rotStart+8),0,
			this.getFloat32At(rotStart+12),this.getFloat32At(rotStart+16),this.getFloat32At(rotStart+20),0,
			this.getFloat32At(rotStart+24),this.getFloat32At(rotStart+28),this.getFloat32At(rotStart+32),0,
			0,0,0,1];
		/*var rot=[this.getFloat32At(rotStart),this.getFloat32At(rotStart+12),this.getFloat32At(rotStart+24),0,
			this.getFloat32At(rotStart+4),this.getFloat32At(rotStart+16),this.getFloat32At(rotStart+28),0,
			this.getFloat32At(rotStart+8),this.getFloat32At(rotStart+20),this.getFloat32At(rotStart+32),0,
			0,0,0,1];*/
		data[name]=[pos,rot];
		//alert(name);
		//alert(pos);
	}
	
}

/**
* Extract frame info
* @private
*/
GLGE.MD3.prototype.parseFrames=function(){
	var start=this.headers.OFS_FRAMES+40;
	var frameSize=56;
	var animations={};
	var lastName=false;
	var firstFrame=0;
	for(var i=0;i<this.headers.NUM_FRAMES;i++){
		var name=this.getStringAt(start+i*frameSize,16).replace(/[0-9_]/g,'');
		if(lastName && lastName!=name){
			animations[lastName]=[firstFrame,i-1];
			firstFrame=i;
		}
		lastName=name;
	}
	animations[lastName]=[firstFrame,i-3];

	this.MD3Animations[this.url]=animations;
}
/**
* Extract header info
* @private
*/
GLGE.MD3.prototype.parseHeader=function(){
	this.headers={};
	for (var i=0; i<this.headerNames.length; i++) {
		this.headers[this.headerNames[i]]=this.getSint32At(i*4+76);
	}
}
/**
* Parse the surfaces 
* @private
*/
GLGE.MD3.prototype.parseSurfaces=function(){
	this.surfaceHeaders=[];
	var offset=this.headers.OFS_SURFACES;
	for(var i=0;i<this.headers.NUM_SURFACES;i++){
		var start=offset+72;
		var sHeaders=this.surfaceHeaders[i]={offset:offset};
		var idx=0;
		for(var j=start;j<start+36;j=j+4){
			sHeaders[this.surfaceHeaderNames[idx++]]=this.getSint32At(j);
		}
		var normverts=this.parseNormVerts(i);
		var uvs=this.parseUVs(i);
		var faces=this.parseFaces(i);
		var mesh=this.createMesh(normverts[0],normverts[1],uvs,faces);
		var surface=new GLGE.Object;
		if(!this.MD3Materials[i]) this.MD3Materials[i]=new GLGE.Material;
		surface.setMaterial(this.MD3Materials[i]);
		surface.setMesh(mesh);
		this.surfaces.push(surface);
		offset+=this.surfaceHeaders[i].OFS_END;
	}
}

/**
* Creates a mesh
* @private
*/
GLGE.MD3.prototype.createMesh=function(verts,normals,uvs,faces){
	var m=new GLGE.Mesh;
	for(var i=0;i<verts.length;i++){
		m.setPositions(verts[i],i).setNormals(normals[i],i);
	}
	m.setFaces(faces).setUV(uvs);
	return m;	
}

/**
* Parse the Faces
* @private
*/
GLGE.MD3.prototype.parseFaces=function(surface){
	var header=this.surfaceHeaders[surface];
	var faces=[];
	var start=header.offset+header.OFS_TRIANGLES;
	var end=12*header.NUM_TRIANGLES;
	for(var i=start; i<start+end;i=i+12){
		faces.push(this.getSint32At(i));
		faces.push(this.getSint32At(i+4));
		faces.push(this.getSint32At(i+8));
	}
	return faces;
}
/**
* Parse the vertex UVs
* @private
*/
GLGE.MD3.prototype.parseUVs=function(surface){
	var header=this.surfaceHeaders[surface];
	var uvs=[];
	var start=header.offset+header.OFS_ST;
	var end=8*header.NUM_VERTS;
	for(var i=start; i<start+end;i=i+8){
		uvs.push(this.getFloat32At(i));
		uvs.push(1-this.getFloat32At(i+4));
	}
	return uvs;
}
/**
* Parse the verts for each frame
* @private
*/
GLGE.MD3.prototype.parseNormVerts=function(surface){
	var header=this.surfaceHeaders[surface];
	var verts=[];
	var normals=[];
	var start=header.offset+header.OFS_XYZNORMAL;
	var frameSize=8*header.NUM_VERTS;
	for(var frame=0; frame<header.NUM_FRAMES; frame++){
		var frameVerts=[];
		var frameNormals=[];
		for(var i=start+frame*frameSize; i<start+(frame+1)*frameSize;i=i+8){
			frameVerts.push(this.getSint16At(i)/64);
			frameVerts.push(this.getSint16At(i+2)/64);
			frameVerts.push(this.getSint16At(i+4)/64);
			var norm=this.decodeNormal(this.byteArray[i+6],this.byteArray[i+7]);
			frameNormals.push(norm[0]);
			frameNormals.push(norm[1]);
			frameNormals.push(norm[2]);
		}
		verts[frame]=frameVerts;
		normals[frame]=frameNormals;
	}
	return [verts,normals];
}

/**
* Decode the normal coords
* @private
*/
GLGE.MD3.prototype.decodeNormal=function(zenith,azimuth){
	var lat = zenith * (2 * Math.PI) / 255;
	var lng = azimuth * (2 * Math.PI) / 255;
	var clat=Math.cos(lat);
	var slat=Math.sin(lat);
	var clng=Math.cos(lng);
	var slng=Math.sin(lng);
	return [-clat*slng,-slat*slng,clng];
}

/**
* Gets the attach points(tags) availalbe
* @returns Array of availalbe attach points
*/
GLGE.MD3.prototype.getAttachPoints=function(){
	var attachPoints=[];
	for(var tag in this.MD3TagGroups) attachPoints.push(tag);
	return attachPoints
}

/**
* get 16 bit int at location
* @private
*/
GLGE.MD3.prototype.getSint16At=function(index){
	var value=this.byteArray[index]|(this.byteArray[index+1]<<8);
	if(value>0x8000) value=value-0x10000;
	return value;
}
/**
* get 32 bit signed int at location
* @private
*/
GLGE.MD3.prototype.getSint32At=function(index){
	var value=this.byteArray[index]|(this.byteArray[index+1]<<8)|(this.byteArray[index+2]<<16)|(this.byteArray[index+3]<<24);
	if(value>0x80000000) value=value-0x100000000;
	return value;
}

/**
* Get 32 bit float at location
* @private
*/
GLGE.MD3.prototype.getFloat32At=function(index){
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
* Get 32 bit float at location
* @private
*/
GLGE.MD3.prototype.getStringAt=function(index,size){
	var name="";
	for(var i=index;i<index+size;i++){
		if(this.byteArray[i]==0) break;
		name+=String.fromCharCode(this.byteArray[i]);
	}
	return name;
}

/**
* Adds an MD3 model as a child of this MD3 Group
* @param {GLGE.MD3} md3 the md3 group to attach
*/
GLGE.MD3.prototype.addMD3=function(md3){
	if(!this.loaded){
		this.addEventListener("loaded",function(){
			this.addMD3(md3);
		});
		return;
	}
	if(this.MD3TagGroups){
		var attach=md3.MD3Tag;
		if(attach && this.MD3TagGroups[attach]){
			this.MD3TagGroups[attach].addGroup(md3);
		}else{
			this.addGroup(md3);
		}
	}else{
		this.MD3Children.push(md3);
	}
	return this;
}

/**
* sets the attach tag for this md3 model
* @param {String} tag the tag to attach to
*/
GLGE.MD3.prototype.setMD3Tag=function(tag){
	this.MD3Tag=tag;
	return this;
}



/**
* Sets the MD3 frame number
* @param {string} frame the frame to display
*/
GLGE.MD3.prototype.setMD3Frame=function(frame){
	var totalframes=this.MD3EndFrame-this.MD3StartFrame;
	if(totalframes==0) return;
	if(this.MD3Loop){
		frame=frame%totalframes;
		var frame2=((Math.floor(frame)+1)%totalframes);
	}else{
		frame=Math.min(totalframes,frame);
		frame2=Math.min(totalframes,Math.floor(frame)+1);
		if(frame==totalframes){
			this.fireEvent("md3AnimFinished",{});
		}
	}
	var framefrac=frame%1;
	if(frame<1 && this.MD3LastAnimFrame){
		frame=this.MD3LastAnimFrame-this.MD3StartFrame;
	}else{
		this.MD3LastAnimFrame=null;
		this.lastMD3Frame=Math.floor(frame)+this.MD3StartFrame;
	}
	for(var i=0;i<this.surfaces.length;i++){
		this.surfaces[i].setMeshFrame1(Math.floor(frame)+this.MD3StartFrame);
		this.surfaces[i].setMeshFrame2(frame2+this.MD3StartFrame);
		this.surfaces[i].setMeshBlendFactor(framefrac);
	}
}

GLGE.MD3.prototype.animate=function(now,nocache){
	if(!now) now=+new Date;
	if(this.headers){
		var frame=(now-this.MD3Started)/1000*this.MD3FrameRate;
		this.setMD3Frame(frame);
	}
	GLGE.Object.prototype.animate.call(this,now,nocache);
}
/**
* Sets the Material to use
* @param {GLGE.Material} material the material to use
* @param {number} surface the surface to attach the material to
*/
GLGE.MD3.prototype.setMaterial=function(material,surface){
	if(!surface) surface=0;
	this.MD3Materials[surface]=material;
	if(this.surfaces[surface]) this.surfaces[surface].setMaterial(material);
}

var matfunc=function(idx){
	return function(material){
		this.setMaterial(material,idx);
	}
}
for(var i=1;i<32;i++){
	GLGE.MD3.prototype["setMaterial"+i]=matfunc(i);
}

GLGE.Group.prototype.addMD3=GLGE.Group.prototype.addGroup;
GLGE.Scene.prototype.addMD3=GLGE.Scene.prototype.addGroup;


})(GLGE);
