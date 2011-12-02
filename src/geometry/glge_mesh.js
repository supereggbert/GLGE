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
 * @name glge_mesh.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class Creates a new mesh
* @see GLGE.Object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.Mesh=function(uid,windingOrder){
	this.GLbuffers=[];
	this.buffers=[];
	this.framePositions=[];
	this.frameNormals=[];
	this.frameTangents=[];
	this.UV=[];
	this.boneWeights=[];
	this.setBuffers=[];
	this.faces={};
    if (windingOrder!==undefined)
        this.windingOrder=windingOrder;
    else
        this.windingOrder=GLGE.Mesh.WINDING_ORDER_UNKNOWN;

	GLGE.Assets.registerAsset(this,uid);
};

GLGE.Mesh.WINDING_ORDER_UNKNOWN=2;
GLGE.Mesh.WINDING_ORDER_CLOCKWISE=1;
GLGE.Mesh.WINDING_ORDER_COUNTER=0;

GLGE.augment(GLGE.QuickNotation,GLGE.Mesh);
GLGE.augment(GLGE.JSONLoader,GLGE.Mesh);
GLGE.augment(GLGE.Events,GLGE.Mesh);
GLGE.Mesh.prototype.gl=null;
GLGE.Mesh.prototype.className="Mesh";
GLGE.Mesh.prototype.GLbuffers=null;
GLGE.Mesh.prototype.buffers=null;
GLGE.Mesh.prototype.setBuffers=null;
GLGE.Mesh.prototype.GLfaces=null;
GLGE.Mesh.prototype.faces=null;
GLGE.Mesh.prototype.UV=null;
GLGE.Mesh.prototype.joints=null;
GLGE.Mesh.prototype.invBind=null;
GLGE.Mesh.prototype.loaded=false;
/**
 * @name GLGE.Mesh#shaderupdate
 * @event fired when the shader needs updating
 * @param {object} data
 */

/**
* Gets the bounding volume for the mesh
* @returns {GLGE.BoundingVolume} 
*/
GLGE.Mesh.prototype.getBoundingVolume=function(){
	if(!this.positions) return new GLGE.BoundingVolume(0,0,0,0,0,0);
	if(!this.boundingVolume){
		var minX,maxX,minY,maxY,minZ,maxZ;
		var positions=this.positions;
		for(var i=0;i<positions.length;i=i+3){
			if(i==0){
				minX=maxX=positions[i];
				minY=maxY=positions[i+1];
				minZ=maxZ=positions[i+2];
			}else{
				minX=Math.min(minX,positions[i]);
				maxX=Math.max(maxX,positions[i]);
				minY=Math.min(minY,positions[i+1]);
				maxY=Math.max(maxY,positions[i+1]);
				minZ=Math.min(minZ,positions[i+2]);
				maxZ=Math.max(maxZ,positions[i+2]);
			}
		}
		this.boundingVolume=new GLGE.BoundingVolume(minX,maxX,minY,maxY,minZ,maxZ);
	}
	return this.boundingVolume;
}
/**
* Sets the joints
* @param {string[]} jsArray set joint objects
*/
GLGE.Mesh.prototype.setJoints=function(jsArray){
	this.joints=jsArray;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Sets the inverse bind matrix for each joint
* @param {GLGE.Matrix[]} jsArray set joint names
*/
GLGE.Mesh.prototype.setInvBindMatrix=function(jsArray){
	this.invBind=jsArray;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Sets the joint channels for each vertex 
* @param {Number[]} jsArray The 1 dimentional array of bones
* @param {Number} num the number of chanels in this mesh
*/
GLGE.Mesh.prototype.setVertexJoints=function(jsArray,num){
	if(!num){
		num=jsArray.length*3/this.positions.length;
	}
	if(num<5){
		this.setBuffer("joints1",jsArray,num);
	}else{
		var jsArray1=[];
		var jsArray2=[];
		for(var i=0;i<jsArray.length;i++){
			if(i%num<4){
				jsArray1.push(jsArray[i]);
			}else{
				jsArray2.push(jsArray[i]);
			}
		}
		this.setBuffer("joints1",jsArray1,4);
		this.setBuffer("joints2",jsArray2,num-4);
	}
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Sets the joint weights on each vertex
* @param {Number[]} jsArray The 1 dimentional array of weights
* @param {Number} num the number of chanels in this mesh
*/
GLGE.Mesh.prototype.setVertexWeights=function(jsArray,num){
	if(!num){
		num=jsArray.length*3/this.positions.length;
	}
	//normalize the weights!
	for(var i=0;i<jsArray.length;i=i+parseInt(num)){
		var total=0;
		for(var n=0;n<num;n++){
			total+=parseFloat(jsArray[i+n]);
		}
		if(total==0) total=1;
		for(var n=0;n<num;n++){
			jsArray[i+n]=jsArray[i+n]/total;
		}
	}


	if(num<4){
		this.setBuffer("weights1",jsArray,num);
	}else{
		var jsArray1=[];
		var jsArray2=[];
		for(var i=0;i<jsArray.length;i++){
			if(i%num<4){
				jsArray1.push(jsArray[i]);
			}else{
				jsArray2.push(jsArray[i]);
			}
		}
		this.setBuffer("weights1",jsArray1,4);
		this.setBuffer("weights2",jsArray2,num-4);
	}
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* clears any buffers currently set
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.clearBuffers=function(){
	//if(this.GLfaces) this.gl.deleteBuffer(this.GLfaces);
	this.GLFaces=null;
	delete(this.GLFaces);
	for(var i in this.buffers){
		//if(this.buffers[i].GL) this.gl.deleteBuffer(this.buffers[i].GL);
		this.buffers[i]=null;
		delete(this.buffers[i]);
	}
	this.buffers=[];
	this.loaded=false;
}
/**
* Set the UV coord for the first UV layer
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.setUV=function(jsArray){
	this.uv1set=jsArray;
	var idx=0;
	for(var i=0; i<jsArray.length;i=i+2){
		this.UV[idx]=jsArray[i];
		this.UV[idx+1]=jsArray[i+1];
		if(!this.UV[idx+2]) this.UV[idx+2]=jsArray[i];//<-- hack in case the collada file only specified UV1 but accesses UV2 and expects the UV1 coordinates to be properly reflected there
		if(!this.UV[idx+3]) this.UV[idx+3]=jsArray[i+1];
		idx=idx+4;
	}
	this.setBuffer("UV",this.UV,4);
	return this;
}
/**
* Set the UV coord for the second UV layer
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.setUV2=function(jsArray){
	this.uv2set=jsArray;
	var idx=0;
	for(var i=0; i<jsArray.length;i=i+2){
		if(!this.UV[idx]) this.UV[idx]=jsArray[i];
		if(!this.UV[idx+1]) this.UV[idx+1]=jsArray[i+1];
		this.UV[idx+2]=jsArray[i];
		this.UV[idx+3]=jsArray[i+1];
		idx=idx+4;
	}
	this.setBuffer("UV",this.UV,4);
	return this;
}
/**
* Sets the positions of the verticies
* @param {Number[]} jsArray The 1 dimentional array of positions
* @param {number} frame optional mesh frame number
*/
GLGE.Mesh.prototype.setPositions=function(jsArray,frame){
	if(!frame) frame=0;
	this.loaded=true;
	if(frame==0) this.positions=jsArray;
	this.framePositions[frame]=jsArray;
	this.setBuffer("position"+frame,jsArray,3,true);
	this.boundingVolume=null;
	this.fireEvent("updatebound");
	return this;
}
/**
* Sets the colors of the verticies
* @param {Number[]} jsArray The vertex colors
*/
GLGE.Mesh.prototype.setVertexColors=function(jsArray){
	this.colors=jsArray;
	this.setBuffer("color",jsArray,4);
	return this;
}
/**
* Sets the normals of the verticies
* @param {Number[]} jsArray The 1 dimentional array of normals
* @param {number} frame optional mesh frame number
*/
GLGE.Mesh.prototype.setNormals=function(jsArray,frame){
	if(!frame) frame=0;
	if(frame==0) this.normals=jsArray;
	this.frameNormals[frame]=jsArray;
	this.setBuffer("normal"+frame,jsArray,3,true);
	return this;
}
/**
* Sets the tangents of the verticies
* @param {Number[]} jsArray The 1 dimentional array of tangents
* @param {number} frame optional mesh frame number
*/
GLGE.Mesh.prototype.setTangents=function(jsArray,frame){
	if(!frame) frame=0;
	if(frame==0) this.tangents=jsArray;
	this.frameTangents[frame]=jsArray;
	this.setBuffer("tangent"+frame,jsArray,3,true);
	return this;
}


/**
* Sets a buffer for the
* @param {String} boneName The name of the bone
* @param {Number[]} jsArray The 1 dimentional array of weights
* @private
*/
GLGE.Mesh.prototype.setBuffer=function(bufferName,jsArray,size,exclude){
	//make sure all jsarray items are floats
	if(typeof jsArray[0] !="number") for(var i=0;i<jsArray.length;i++) jsArray[i]=parseFloat(jsArray[i]);
	
	var buffer;
	for(var i=0;i<this.buffers.length;i++){
		if(this.buffers[i].name==bufferName) buffer=i;
	}
	if(!buffer){
		this.buffers.push({name:bufferName,data:jsArray,size:size,GL:false,exclude:exclude});
	}
        else 
	{
		this.buffers[buffer]={name:bufferName,data:jsArray,size:size,GL:false,exclude:exclude};
	}
	return this;
}

/**
* gets a vert tangent
* @private
*/
GLGE.Mesh.prototype.tangentFromUV=function(p1,p2,p3,uv1,uv2,uv3,n){
	var toUnitVec3=GLGE.toUnitVec3;
	var subVec3=GLGE.subVec3;
	var scaleVec3=GLGE.scaleVec3;
	var dotVec3=GLGE.dotVec3;
	var crossVec3=GLGE.crossVec3;
	
	uv21=[uv2[0]-uv1[0],uv2[1]-uv1[1]];
	uv31=[uv3[0]-uv1[0],uv3[1]-uv1[1]];
	
	p21=GLGE.subVec3(p2,p1);
	p31=GLGE.subVec3(p3,p1);
	var s=(uv21[0]*uv31[1]-uv31[0]*uv21[1]);

	if(s!=0){
		s=1/s;
		var t=subVec3(scaleVec3(p21,uv31[1]*s),scaleVec3(p31,uv21[1]*s));
		var b=subVec3(scaleVec3(p31,uv21[0]*s),scaleVec3(p21,uv31[0]*s));
	}else{
		t=[0,0,0];
		b=[0,0,0];
	}
	if(GLGE.dotVec3(GLGE.crossVec3(p21,p31),n)>0){
		t=scaleVec3(t,-1);
		b=scaleVec3(b,-1);
	}
	return [t,b];
}

/**
* Sets the faces for this mesh
* @param {Number[]} jsArray The 1 dimentional array of normals
*/
GLGE.Mesh.prototype.setFaces=function(jsArray){
	this.faces={data:jsArray,GL:false};	
	//if at this point calculate normals if we haven't got them yet
	if(!this.normals) this.calcNormals();
	if(!this.tangents && this.UV.length>0) this.calcTangents();
	
	return this;
}


/**
* Calculates the tangents for this mesh - this is messy FIX ME!
* @private
*/
GLGE.Mesh.prototype.calcTangents=function(){
	
	for(var j=0;j<this.framePositions.length;j++){
		var position=this.framePositions[j];
		var normal=this.frameNormals[j];
		var uv=this.UV;
		var tangentArray=[];
		var data={};
		var ref;
		for(var i=0;i<position.length;i++){
			tangentArray[i]=0;
		}
		for(var i=0;i<this.faces.data.length;i=i+3){
			var p1=[position[(parseInt(this.faces.data[i]))*3],position[(parseInt(this.faces.data[i]))*3+1],position[(parseInt(this.faces.data[i]))*3+2]];
			var p2=[position[(parseInt(this.faces.data[i+1]))*3],position[(parseInt(this.faces.data[i+1]))*3+1],position[(parseInt(this.faces.data[i+1]))*3+2]];
			var p3=[position[(parseInt(this.faces.data[i+2]))*3],position[(parseInt(this.faces.data[i+2]))*3+1],position[(parseInt(this.faces.data[i+2]))*3+2]];
			
			var n1=[normal[(parseInt(this.faces.data[i]))*3],normal[(parseInt(this.faces.data[i]))*3+1],normal[(parseInt(this.faces.data[i]))*3+2]];
			var n2=[normal[(parseInt(this.faces.data[i+1]))*3],normal[(parseInt(this.faces.data[i+1]))*3+1],normal[(parseInt(this.faces.data[i+1]))*3+2]];
			var n3=[normal[(parseInt(this.faces.data[i+2]))*3],normal[(parseInt(this.faces.data[i+2]))*3+1],normal[(parseInt(this.faces.data[i+2]))*3+2]];
			
			var uv1=[uv[(parseInt(this.faces.data[i]))*4],uv[(parseInt(this.faces.data[i]))*4+1]];
			var uv2=[uv[(parseInt(this.faces.data[i+1]))*4],uv[(parseInt(this.faces.data[i+1]))*4+1]];
			var uv3=[uv[(parseInt(this.faces.data[i+2]))*4],uv[(parseInt(this.faces.data[i+2]))*4+1]];
			
			var tb=this.tangentFromUV(p2,p1,p3,uv2,uv1,uv3,n2);
			
			if(!data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")]){
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")]=tb;
			}else{
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0][0]+=tb[0][0];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0][1]+=tb[0][1];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0][2]+=tb[0][2];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1][0]+=tb[1][0];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1][1]+=tb[1][1];
				data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1][2]+=tb[1][2];
			}
			if(!data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")]){
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")]=tb;
			}else{
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][0][0]+=tb[0][0];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][0][1]+=tb[0][1];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][0][2]+=tb[0][2];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][1][0]+=tb[1][0];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][1][1]+=tb[1][1];
				data[[p2[0],p2[1],p2[2],uv2[0],uv2[1],n2[0],n2[1],n2[2]].join(",")][1][2]+=tb[1][2];
			}
			if(!data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")]){
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")]=tb;
			}else{
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][0][0]+=tb[0][0];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][0][1]+=tb[0][1];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][0][2]+=tb[0][2];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][1][0]+=tb[1][0];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][1][1]+=tb[1][1];
				data[[p3[0],p3[1],p3[2],uv3[0],uv3[1],n3[0],n3[1],n3[2]].join(",")][1][2]+=tb[1][2];
			}

		}		
		for(var i=0;i<position.length/3;i++){
			var p1=[position[i*3],position[i*3+1],position[i*3+2]];
			var n1=[normal[i*3],normal[i*3+1],normal[i*3+2]];
			var uv1=[uv[i*4],uv[i*4+1]];
			try{
			var t=GLGE.toUnitVec3(data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0]);
			var b=GLGE.toUnitVec3(data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1]);
			}catch(e){
				//if we fail probably a exporter bug carry on anyway
			}
			if(t){
				tangentArray[i*3]=t[0];
				tangentArray[i*3+1]=t[1];
				tangentArray[i*3+2]=t[2];
			}
		}
		this.setTangents(tangentArray,j);
	}
	
}

/**
* Sets the faces for this mesh
* @param {Number[]} jsArray The 1 dimentional array of normals
* @private
*/
GLGE.Mesh.prototype.GLSetFaceBuffer=function(gl){
	if(!this.GLfaces) this.GLfaces = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.faces.data), gl.STATIC_DRAW);
	this.GLfaces.itemSize = 1;
	this.GLfaces.numItems = this.faces.data.length;
}
/**
* Sets up a GL Buffer
* @param {WebGLContext} gl The context being drawn on
* @param {String} bufferName The name of the buffer to create
* @param {Number[]}  jsArray The data to add to the buffer
* @param {Number}  size Size of a single element within the array
* @private
*/
GLGE.Mesh.prototype.GLSetBuffer=function(gl,bufferName,jsArray,size){
	if(!this.GLbuffers[bufferName]) this.GLbuffers[bufferName] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers[bufferName]);
	if(!jsArray.byteLength) jsArray=new Float32Array(jsArray);
	gl.bufferData(gl.ARRAY_BUFFER, jsArray, gl.STATIC_DRAW);
	this.GLbuffers[bufferName].itemSize = size;
	this.GLbuffers[bufferName].numItems = jsArray.length/size;
};
/**
* Calculates the normals for this mesh
* @private
*/
GLGE.Mesh.prototype.calcNormals=function(){
	for(var n=0;n<this.framePositions.length;n++){
		var normals=[];
		var positions=this.framePositions[n];
		var faces=this.faces.data;
		if(!faces){
			faces=[];
			for(var i=0;i<positions.length/3;i++) faces[i]=i;
		}
		for(var i=0;i<faces.length;i=i+3){
			var v1=[positions[faces[i]*3],positions[faces[i]*3+1],positions[faces[i]*3+2]];
			var v2=[positions[faces[i+1]*3],positions[faces[i+1]*3+1],positions[faces[i+1]*3+2]];
			var v3=[positions[faces[i+2]*3],positions[faces[i+2]*3+1],positions[faces[i+2]*3+2]];
			var vec1=GLGE.subVec3(v2,v1);
			var vec2=GLGE.subVec3(v3,v1);
			var norm=GLGE.toUnitVec3(GLGE.crossVec3(vec1,vec2));
			if(normals[faces[i]]==undefined) normals[faces[i]]=[];
			normals[faces[i]].push(norm);
			if(normals[faces[i+1]]==undefined) normals[faces[i+1]]=[];
			normals[faces[i+1]].push(norm);
			if(normals[faces[i+2]]==undefined) normals[faces[i+2]]=[];
			normals[faces[i+2]].push(norm);
		}
		var norms=[];
		for(i=0;i<normals.length;i++){
			var x=0,y=0,z=0;
			if(normals[i]!=undefined){
				for(var j=0;j<normals[i].length;j++){
					x+=normals[i][j][0];
					y+=normals[i][j][1];
					z+=normals[i][j][2];
				}
				x/=normals[i].length;
				y/=normals[i].length;
				z/=normals[i].length;
				norms[i*3]=x;
				norms[i*3+1]=y;
				norms[i*3+2]=z;
			}
		}
		this.setNormals(norms,n);
	}
}
/**
* Calculates a ambient occlution effect and sets the vertex color with AO level
*/
GLGE.Mesh.prototype.calcFauxAO=function(){	
	this.optimize();
	
	//calculate ambient color based on vertex angles
	var verts=this.positions;
	var faces=this.faces.data;
	var normals=this.normals;
	
	var idx=[];
	var len=verts.length/3
	for(var i=0;i<len;i++){
		idx.push([]);
	}
	for(var i=0;i<faces.length;i=i+3){
		idx[faces[i]].push(faces[i+1]);
		idx[faces[i]].push(faces[i+2]);
		idx[faces[i+1]].push(faces[i]);
		idx[faces[i+1]].push(faces[i+2]);
		idx[faces[i+2]].push(faces[i]);
		idx[faces[i+2]].push(faces[i+1]);
	}
	var ao=[];
	for(var i=0;i<len;i++){
		var AOfactor=0;
		var normal=[normals[i*3],normals[i*3+1],normals[i*3+2]];
		for(var j=0;j<idx[i].length;j++){
			var f=idx[i][j];
			var v=[verts[f*3]-verts[i*3],verts[f*3+1]-verts[i*3+1],verts[f*3+2]-verts[i*3+2]];
			v=GLGE.toUnitVec3(v);
			AOfactor+=v[0]*normal[0]+v[1]*normal[1]+v[2]*normal[2];
		}
		AOfactor/=idx[i].length;
		AOfactor=1.0-(AOfactor+1)*0.5;
		ao.push(AOfactor);
		ao.push(AOfactor);
		ao.push(AOfactor);
		ao.push(1);
	}
	this.setVertexColors(ao);
}
/**
* optimize geometry
* @private
*/
GLGE.Mesh.prototype.optimize=function(){
	var verts=this.positions;
	var normals=this.normals;
	var faces=this.faces.data;
	var tangents=this.tangents;
	var uv1=this.uv1set;
	var uv2=this.uv2set;
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
	this.setPositions(newVerts).setNormals(newNormals).setFaces(newFaces).setUV(newUV1s).setUV2(newUV2s).setTangents(newTangents);
}



/**
* Sets the Attributes for this mesh
* @param {WebGLContext} gl The context being drawn on
* @private
*/
GLGE.Mesh.prototype.GLAttributes=function(gl,shaderProgram,frame1, frame2){
	this.gl=gl;
	if(!frame1) frame1=0;
	//if at this point we have no normals set then calculate them
	if(!this.normals) this.calcNormals();
	//disable all the attribute initially arrays - do I really need this?
	for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
	//check if the faces have been updated
	if(!this.faces.GL && this.faces.data && this.faces.data.length>0){
		this.GLSetFaceBuffer(gl);
		this.faces.GL=true;
	}
	//loop though the buffers
	for(i=0; i<this.buffers.length;i++){
		if(!this.buffers[i].GL){
			this.GLSetBuffer(gl,this.buffers[i].name,this.buffers[i].data,this.buffers[i].size);
			this.buffers[i].GL=true;
		}
		attribslot=GLGE.getAttribLocation(gl,shaderProgram, this.buffers[i].name);
		if(attribslot>-1){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers[this.buffers[i].name]);
			gl.enableVertexAttribArray(attribslot);
			gl.vertexAttribPointer(attribslot, this.GLbuffers[this.buffers[i].name].itemSize, gl.FLOAT, false, 0, 0);
		}
	}

	//do the position normal and if we have tangent then tangent
	var positionSlot=GLGE.getAttribLocation(gl,shaderProgram, "position");
	if(positionSlot>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers["position"+frame1]);
		gl.enableVertexAttribArray(positionSlot);
		gl.vertexAttribPointer(positionSlot, this.GLbuffers["position"+frame1].itemSize, gl.FLOAT, false, 0, 0);
	}
	var normalSlot=GLGE.getAttribLocation(gl,shaderProgram, "normal");
	if(normalSlot>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers["normal"+frame1]);
		gl.enableVertexAttribArray(normalSlot);
		gl.vertexAttribPointer(normalSlot, this.GLbuffers["normal"+frame1].itemSize, gl.FLOAT, false, 0, 0);
	}
	var tangentSlot=GLGE.getAttribLocation(gl,shaderProgram, "tangent");
	if(tangentSlot>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers["tangent"+frame1]);
		gl.enableVertexAttribArray(tangentSlot);
		gl.vertexAttribPointer(tangentSlot, this.GLbuffers["tangent"+frame1].itemSize, gl.FLOAT, false, 0, 0);
	}
	if(frame2!=undefined){
		var positionSlot2=GLGE.getAttribLocation(gl,shaderProgram, "position2");
		if(positionSlot2>-1){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers["position"+frame2]);
			gl.enableVertexAttribArray(positionSlot2);
			gl.vertexAttribPointer(positionSlot2, this.GLbuffers["position"+frame2].itemSize, gl.FLOAT, false, 0, 0);
		}
		var normalSlot2=GLGE.getAttribLocation(gl,shaderProgram, "normal2");
		if(normalSlot2>-1){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers["normal"+frame2]);
			gl.enableVertexAttribArray(normalSlot2);
			gl.vertexAttribPointer(normalSlot2, this.GLbuffers["normal"+frame2].itemSize, gl.FLOAT, false, 0, 0);
		}
		var tangentSlot2=GLGE.getAttribLocation(gl,shaderProgram, "tangent2");
		if(tangentSlot2>-1){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers["tangent"+frame2]);
			gl.enableVertexAttribArray(tangentSlot2);
			gl.vertexAttribPointer(tangentSlot2, this.GLbuffers["tangent"+frame2].itemSize, gl.FLOAT, false, 0, 0);
		}	
	}
}


})(GLGE);