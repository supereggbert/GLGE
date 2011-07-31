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
 * @name glge_binarymultimaterial.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


GLGE.MultiMaterial.prototype.binaryPack=function(pack){
	//will need to add multimaterial depenancies first
	for(var i=0;i<this.lods.length;i++){
		pack.addResource(this.lods[i]);
	}
	
	var size=8+this.lods.length*40;
	
	var buffer=new GLGE.BinaryBuffer(size);
	buffer.write("Uint32",0); //add fields placeholder for posible future use

	buffer.write("Uint32",this.lods.length);
	for(var i=0;i<this.lods.length;i++){
		buffer.write("String",this.lods[i].uid,40);
	}
	return buffer;
}

GLGE.MultiMaterial.binaryUnPack=function(pack,data){
	var buffer=pack.buffer;
	var num_fields=buffer.read("Uint32"); //currently always 0
	var num_lods=buffer.read("Uint32");
	
	var multiMaterial=new GLGE.MultiMaterial(data.uid);
	for(var i=0;i<num_lods;i++){
		multiMaterial.addObjectLod(pack.getResource(buffer.read("String",40)));
	}
	return multiMaterial;
}


})(GLGE)