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
 * @name glge_binaryobjectlod.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


GLGE.ObjectLod.prototype.binaryPack=function(pack){
	pack.addResource(this.material);
	pack.addResource(this.mesh);
	
	var size=6+2*40;
	
	var buffer=new GLGE.BinaryBuffer(size);
	buffer.write("Uint16",3); //number of fields
	buffer.write("Float32",this.pixelSize); //pixelsize
	buffer.write("String",this.material.uid,40); //material uid
	buffer.write("String",this.mesh.uid,40); //mesh uid

	return buffer;
}

GLGE.ObjectLod.binaryUnPack=function(pack,data){
	var buffer=pack.buffer;
	var objectLod=new GLGE.ObjectLod(data.uid);
	var num_fields=buffer.read("Uint16");
	objectLod.setPixelSize(buffer.read("Float32"));
	objectLod.setMaterial(pack.getResource(buffer.read("String",40)));
	//buffer.read("String",40);
	//objectLod.setMaterial(new GLGE.Material);
	objectLod.setMesh(pack.getResource(buffer.read("String",40)));
	return objectLod;
}


})(GLGE)