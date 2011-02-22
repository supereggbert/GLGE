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
 * @name glge_quicknote.js
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
	GLGE.Assets.registerAsset(this,uid);
	this.GLbuffers=[];
	this.buffers=[];
	this.UV=[];
	this.boneWeights=[];
	this.setBuffers=[];
	this.faces={};
    if (windingOrder!==undefined)
        this.windingOrder=windingOrder;
    else
        this.windingOrder=GLGE.Mesh.WINDING_ORDER_CLOCKWISE;
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
	if(!this.boundingVolume){
		var minX,maxX,minY,maxY,minZ,maxZ;
		for(var i=0;i<this.buffers.length;i++){
			if(this.buffers[i].name=="position") var positions=this.buffers[i].data;
		}
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
	for(i in this.buffers){
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
*/
GLGE.Mesh.prototype.setPositions=function(jsArray){
	this.loaded=true;
	this.positions=jsArray;
	this.setBuffer("position",jsArray,3);
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
*/
GLGE.Mesh.prototype.setNormals=function(jsArray){
	this.normals=jsArray;
	this.setBuffer("normal",jsArray,3);
	return this;
}
/**
* Sets a buffer for the
* @param {String} boneName The name of the bone
* @param {Number[]} jsArray The 1 dimentional array of weights
* @private
*/
GLGE.Mesh.prototype.setBuffer=function(bufferName,jsArray,size){
	//make sure all jsarray items are floats
	for(var i=0;i<jsArray.length;i++) jsArray[i]=parseFloat(jsArray[i]);
	var buffer;
	for(var i=0;i<this.buffers.length;i++){
		if(this.buffers[i].name==bufferName) buffer=i;
	}
	if(!buffer){
		this.buffers.push({name:bufferName,data:jsArray,size:size,GL:false});
	}
        else 
	{
		this.buffers[buffer]={name:bufferName,data:jsArray,size:size,GL:false};
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
	
	//add a tangent buffer
	for(var i=0;i<this.buffers.length;i++){
		if(this.buffers[i].name=="position") var position=this.buffers[i].data;
		if(this.buffers[i].name=="UV") var uv=this.buffers[i].data;
		if(this.buffers[i].name=="normal") var normal=this.buffers[i].data;
	}
	

	if(position && uv){
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
			var t=GLGE.toUnitVec3(data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][0]);
			var b=GLGE.toUnitVec3(data[[p1[0],p1[1],p1[2],uv1[0],uv1[1],n1[0],n1[1],n1[2]].join(",")][1]);
			
			if(t){
				tangentArray[i*3]=t[0];
				tangentArray[i*3+1]=t[1];
				tangentArray[i*3+2]=t[2];
			}
		}
		this.setBuffer("tangent",tangentArray,3);
	}
	return this;
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
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(jsArray), gl.STATIC_DRAW);
	this.GLbuffers[bufferName].itemSize = size;
	this.GLbuffers[bufferName].numItems = jsArray.length/size;
};
/**
* Calculates the normals for this mesh
* @private
*/
GLGE.Mesh.prototype.calcNormals=function(){
	var normals=[];
	var positions=this.positions;
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
	this.setNormals(norms);
}
/**
* Sets the Attributes for this mesh
* @param {WebGLContext} gl The context being drawn on
* @private
*/
GLGE.Mesh.prototype.GLAttributes=function(gl,shaderProgram){
	this.gl=gl;
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
}


})(GLGE);