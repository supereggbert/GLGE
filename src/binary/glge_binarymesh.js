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
 * @file Overview
 * @name glge_binarymesh.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

GLGE.Mesh.prototype.encodeNormal=function(normal){
	var azimuth=(Math.atan2(normal[1], normal[0]) * 255 / (2 * Math.PI))|0;
	var zenith=(Math.acos(normal[2]) * 255 / (2 * Math.PI))|0;
	return [azimuth,zenith];
}
GLGE.Mesh.prototype.decodeNormal=function(zenith, azimuth){
	var pi=Math.PI;
	var lat = zenith * (2 * pi ) / 255
	var lng = azimuth * (2 * pi) / 255
	var x = Math.cos ( lat ) * Math.sin ( lng );
	var y = Math.sin ( lat ) * Math.sin ( lng );
	var z = Math.cos ( lng );
	return [x,y,z];
}
GLGE.Mesh.prototype.getVertsScale=function(verts){
	var min=[100000,100000,10000];
	var max=[-100000,-100000,-100000];
	for(var i=0;i<verts.length;i=i+3){
		min[0]=min[0]>verts[i] ? verts[i] : min[0];
		min[1]=min[1]>verts[i+1] ? verts[i+1] : min[1];
		min[2]=min[2]>verts[i+2] ? verts[i+2] : min[2];
		
		max[0]=max[0]<verts[i] ? verts[i] : max[0];
		max[1]=max[1]<verts[i+1] ? verts[i+1] : max[1];
		max[2]=max[2]<verts[i+2] ? verts[i+2] : max[2];
	}
	var scaleX=max[0]-min[0];
	var scaleY=max[1]-min[1];
	var scaleZ=max[2]-min[2];
	var transX=min[0]+scaleX/2;
	var transY=min[1]+scaleY/2;
	var transZ=min[2]+scaleZ/2;
	return [scaleX,scaleY,scaleZ,transX,transY,transZ];
}

//function to make sure the indexing is optimal
GLGE.Mesh.prototype.optimizeGeom=function(verts,normals,faces,tangents,uv1,uv2){
	//expand out the faces
	var vertsTemp=[];
	var normalsTemp=[];
	var uv1Temp=[];
	var uv2Temp=[];
	var tangentsTemp=[];
	if(faces){
		for(var i=0;i<faces.length;i++){
			vertsTemp.push(verts[faces[i]*3]);
			vertsTemp.push(verts[faces[i]*3+1]);
			vertsTemp.push(verts[faces[i]*3+2]);
			normalsTemp.push(normals[faces[i]*3]);
			normalsTemp.push(normals[faces[i]*3+1]);
			normalsTemp.push(normals[faces[i]*3+2]);
			if(tangents && tangents.length>0){
				tangentsTemp.push(tangents[faces[i]*3]);
				tangentsTemp.push(tangents[faces[i]*3+1]);
				tangentsTemp.push(tangents[faces[i]*3+2]);
			}
			if(uv1){
				uv1Temp.push(uv1[faces[i]*2]);
				uv1Temp.push(uv1[faces[i]*2+1]);
			}
			if(uv2){
				uv2Temp.push(uv2[faces[i]*2]);
				uv2Temp.push(uv2[faces[i]*2+1]);
			}
		}
	}else{
		vertsTemp=verts;
		normalsTemp=normals;
		tangentsTemp=tangents;
		uv1Temp=uv1;
		uv2Temp=uv2;
	}

	var newVerts=[];
	var newNormals=[];
	var newFaces=[];
	var newUV1s=[];
	var newUV2s=[];
	var newTangents=[];
	var stack=[];
	
	for(var i=0;i<vertsTemp.length;i=i+3){
		if(uv1 && uv2){
			var idx=[vertsTemp[i],vertsTemp[i+1],vertsTemp[i+2],normalsTemp[i],normalsTemp[i+1],normalsTemp[i+2],uv1Temp[i/3*2],uv1Temp[i/3*2+1]].join(" ");
		}else if(uv1){
			var idx=[vertsTemp[i],vertsTemp[i+1],vertsTemp[i+2],normalsTemp[i],normalsTemp[i+1],normalsTemp[i+2],uv1Temp[i/3*2],uv1Temp[i/3*2+1]].join(" ");
		}else{
			var idx=[vertsTemp[i],vertsTemp[i+1],vertsTemp[i+2],normalsTemp[i],normalsTemp[i+1],normalsTemp[i+2]].join(" ");
		}
		var vertIdx=stack.indexOf(idx);
		if(vertIdx<0){
			stack.push(idx);
			vertIdx=stack.length-1;
			newVerts.push(vertsTemp[i]);
			newVerts.push(vertsTemp[i+1]);
			newVerts.push(vertsTemp[i+2]);
			newNormals.push(normalsTemp[i]);
			newNormals.push(normalsTemp[i+1]);
			newNormals.push(normalsTemp[i+2]);
			if(tangents && tangents.length>0){
				newTangents.push(tangentsTemp[i]);
				newTangents.push(tangentsTemp[i+1]);
				newTangents.push(tangentsTemp[i+2]);
			}
			if(uv1){
				newUV1s.push(uv1Temp[i/3*2]);
				newUV1s.push(uv1Temp[i/3*2+1]);
			}
			if(uv2){
				newUV2s.push(uv2Temp[i/3*2]);
				newUV2s.push(uv2Temp[i/3*2+1]);
			}
		}
		newFaces.push(vertIdx);
	}
	return [newFaces,newVerts,newNormals,newUV1s,newUV2s,newTangents];
}

GLGE.Mesh.prototype.compressUV=function(uv){
	var max=[-100000,-100000];
	var min=[100000,100000];
	for(var i=0;i<uv.length;i=i+2){
		max[0]=Math.max(uv[i],max[0]);
		min[0]=Math.min(uv[i],min[0]);
		max[1]=Math.max(uv[i+1],max[1]);
		min[1]=Math.min(uv[i+1],min[1]);
	}
	var scaleX=max[0]-min[0];
	var scaleY=max[1]-min[1];
	var transX=min[0]+scaleX/2;
	var transY=min[1]+scaleY/2;
	
	var newUV=[];
	for(var i=0;i<uv.length;i=i+2){
		newUV.push((uv[i]-transX)/scaleX*32766);
		newUV.push((uv[i+1]-transY)/scaleY*32766);
	}
	return [newUV,[scaleX,scaleY,transX,transY]];
}

GLGE.Mesh.decompressUV=function(uv,scaleTrans){
	var retuv=[];
	for(var i=0;i<uv.length;i=i+2){
		retuv.push(uv[i]/32766*scaleTrans[0]+scaleTrans[2]);
		retuv.push(uv[i+1]/32766*scaleTrans[1]+scaleTrans[3]);
	}
	return retuv;
}

var FLAGS={
	VERTS: 1,
	UV1: 2,
	UV2: 4,
	NORMALS: 8,
	TANGENTS: 16,
	FACES: 32,
	JOINTS: 64,
	COLORS: 128,
}
/*
Mesh format
Flag
num_frames
num_verts
num_faces
*/
GLGE.Mesh.prototype.exportTangents=true;
GLGE.Mesh.prototype.binaryPack=function(){
	var flag=FLAGS.VERTS+FLAGS.NORMALS;
	var verts=this.positions;
	var normals=this.normals;
	var tangents=[];
	
	if(this.faces.data && this.uv1set && !this.frameTangents[0]){
		this.calcTangents();
	}
	if(this.frameTangents[0] && this.exportTangents){
		var tangents=this.frameTangents[0];
		flag+=FLAGS.TANGENTS;
	}
	
	var size=16 + 20 // mesh header
	
	if(this.uv1set){
		var uv1data=this.compressUV(this.uv1set);
		flag+=FLAGS.UV1;
	}
	if(this.uv2set){
		var uv2data=this.compressUV(this.uv2set);
		flag+=FLAGS.UV2;
	}
	
	if(this.faces.data){
		var faces=this.faces.data;
		if(this.uv1set && this.uv2set){
			var result=this.optimizeGeom(verts,normals,faces,tangents,uv1data[0],uv2data[0]);
			uv1data[0]=result[3];
			uv2data[0]=result[4];
			tangents=result[5];
		}else if(this.uv1set){
			var result=this.optimizeGeom(verts,normals,faces,tangents,uv1data[0]);
			uv1data[0]=result[3];
			tangents=result[5];
		}else{
			var result=this.optimizeGeom(verts,normals,faces);
		}
		faces=result[0];
		verts=result[1];
		normals=result[2];
		flag+=FLAGS.FACES;
		
		size += faces.length*2; // byte size of faces
		size=Math.ceil(size/4)*4;
	}
	
	if(this.uv1set){
		size += 16 + uv1data[0].length*2; // byte size of uvdata
		size=Math.ceil(size/4)*4;
	}
	
	if(this.uv2set){
		size += 16 + uv2data[0].length*2; // byte size of uvdata
		size=Math.ceil(size/4)*4;
	}
	
	size += verts.length*2 + 24; // size of verts array
	size=Math.ceil(size/4)*4;
	
	size += verts.length/3*2; // size of normals array
	if(flag & FLAGS.TANGENTS) size += verts.length/3*2; // size of tangents array
	size=Math.ceil(size/4)*4;
	
	var buffer=new GLGE.BinaryBuffer(size);
	
	buffer.write("Uint32",flag); // flag indicating data being packed
	buffer.write("Uint32",1); // the number of frames
	buffer.write("Uint32",verts.length); // the number of verts
	if(flag & FLAGS.FACES) buffer.write("Uint32",faces.length); // the number of faces
	if(flag & FLAGS.UV1) buffer.write("Uint32",uv1data[0].length); // the number of faces
	if(flag & FLAGS.UV2) buffer.write("Uint32",uv2data[0].length); // the number of faces

	var vertScale=this.getVertsScale(verts);
	buffer.write("Float32",vertScale,6);
	for(var i=0;i<verts.length;i=i+3){
		buffer.write("Int16",((verts[i]-vertScale[3])/vertScale[0]*32766)|0);
		buffer.write("Int16",((verts[i+1]-vertScale[4])/vertScale[1]*32766)|0);
		buffer.write("Int16",((verts[i+2]-vertScale[5])/vertScale[2]*32766)|0);
	}

	var total=verts.length/3;
	for(var i=0;i<total;i++){
		var normal=[normals[i*3],normals[i*3+1],normals[i*3+2]];
		var enc=this.encodeNormal(normal);
		buffer.write("Int8",enc,2);
	}
	
	if(flag & FLAGS.TANGENTS){
		for(var i=0;i<total;i++){
			var tangent=[tangents[i*3],tangents[i*3+1],tangents[i*3+2]];
			var enc=this.encodeNormal(tangent);
			buffer.write("Int8",enc,2);
		}
	}
	
	if(flag & FLAGS.FACES) buffer.write("Uint16",faces,faces.length);
	
	if(flag & FLAGS.UV1){
		buffer.write("Float32",uv1data[1],uv1data[1].length);
		buffer.write("Uint16",uv1data[0],uv1data[0].length);
	}
	
	if(flag & FLAGS.UV2){
		buffer.write("Float32",uv2data[1],uv2data[1].length);
		buffer.write("Uint16",uv2data[0],uv2data[0].length);
	}
	
	buffer.reset();

	
	return buffer;
}

GLGE.Mesh.binaryUnPack=function(pack,data){
	var buffer=pack.buffer;
	var flag=buffer.read("Uint32");
	var num_frames=buffer.read("Uint32");
	var vertslength=buffer.read("Uint32");
	if(flag & FLAGS.FACES) var faceslength=buffer.read("Uint32");
	if(flag & FLAGS.UV1) var uv1length=buffer.read("Uint32");
	if(flag & FLAGS.UV2) var uv2length=buffer.read("Uint32");
	
	var vertScale=buffer.read("Float32",6);
	var vertData=buffer.read("Int16",vertslength);

	var verts=[];
	for(var i=0;i<vertslength;i=i+3){
		verts[i]=vertData[i]/32766*vertScale[0]+vertScale[3];
		verts[i+1]=vertData[i+1]/32766*vertScale[1]+vertScale[4];
		verts[i+2]=vertData[i+2]/32766*vertScale[2]+vertScale[5];
	}
	var normalData=buffer.read("Int8",vertslength/3*2);
	var normals=[];
	for(var i=0;i<normalData.length;i=i+2){
		var normal=GLGE.Mesh.prototype.decodeNormal(normalData[i],normalData[i+1]);
		normals.push(normal[0]);
		normals.push(normal[1]);
		normals.push(normal[2]);
	}
	
		
	var mesh=new GLGE.Mesh(data.uid);
	mesh.setPositions(verts).setNormals(normals);
	
	if(flag & FLAGS.TANGENTS){
		var tangentData=buffer.read("Int8",vertslength/3*2);
		var tangents=[];
		for(var i=0;i<tangentData.length;i=i+2){
			var tangent=GLGE.Mesh.prototype.decodeNormal(tangentData[i],tangentData[i+1]);
			tangents.push(tangent[0]);
			tangents.push(tangent[1]);
			tangents.push(tangent[2]);
		}
		mesh.setTangents(tangents);
	}
	
	if(flag & FLAGS.FACES){
		var faces=buffer.read("Uint16",faceslength);
		mesh.setFaces(faces);
	}
	
	if(flag & FLAGS.UV1){
		var scaleTrans=buffer.read("Float32",4);
		var uv=GLGE.Mesh.decompressUV(buffer.read("Int16",uv1length),scaleTrans);
		mesh.setUV(uv);
	}
	
	if(flag & FLAGS.UV2){
		var scaleTrans=buffer.read("Float32",4);
		var uv=GLGE.Mesh.decompressUV(buffer.read("Int16",uv2length),scaleTrans);
		mesh.setUV2(uv);
	}
	
	return mesh;
}


})(GLGE)