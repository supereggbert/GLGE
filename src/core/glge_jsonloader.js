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
 * @name glge_jsonloader.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @class A class to load json fragments from remote location or string
**/
GLGE.JSONLoader=function(){
}
GLGE.JSONLoader.prototype.downloadPriority=0;
/**
* Loads a json fragment from a url
* @param {string} url The URL to load
**/
GLGE.JSONLoader.prototype.setJSONSrc=function(url){
	var GLGEObj=this;
	GLGE.Message.messageLoader(url,function(text){
		GLGEObj.setJSONString(text);
	},this.downloadPriority);
}
/**
* Loads a json fragment from a string
* @param {string} string The URL to load
**/
GLGE.JSONLoader.prototype.setJSONString=function(string){
	var message = JSON.parse(string);
	//check to make sure this is the correct class type
	if(message.type==this.className){
		message.uid=this.uid;
		//we don't want to create a new one we want to update this one
		message.command="update";
		GLGE.Message.parseMessage(message);
	}
}
/**
* Sets the download priority
* @param {number} value The download priority
**/
GLGE.JSONLoader.prototype.setDownloadPriority=function(value){
	this.downloadPriority=value;
}
/**
* Gets the download priority
* @returns {number} The download priority
**/
GLGE.JSONLoader.prototype.getDownloadPriority=function(){
	return this.downloadPriority;
}

})(GLGE);