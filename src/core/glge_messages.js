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
 * @name glge_messages.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @namespace GLGE Messaging System
*/
GLGE.Message={};
/**
* @function parses messages and updates the scene graph
*/
GLGE.Message.parseMessage=function(msg){
	switch(msg.command){
		case "create":
			var obj=new GLGE[msg.type](msg.uid);
			this.setAttributes(obj,msg.attributes);
			if(msg.children) GLGE.Message.addChildren(obj,msg.children);
			return obj;
			break;
		case "update":
			var obj=GLGE.Assets.get(msg.uid);
			this.setAttributes(obj,msg.attributes);
			if(msg.add) GLGE.Message.addChildren(obj,msg.add);
			if(msg.remove) GLGE.Message.removeChildren(obj,msg.remove);
			return obj;
			break;
	}
	return null;
}
/**
* @function parses the attributes from a message
* @private
*/
GLGE.Message.setAttributes=function(obj,attribs){
	if(attribs){
		for(var attrib in attribs){
			if(obj["set"+attrib]){
				//check to see if the attribute has to be parsed as a message
				if(attribs[attrib].command){
					attribs[attrib]=GLGE.Message.parseMessage(attribs[attrib]);
				}
				obj["set"+attrib](attribs[attrib]);
			}
		}
	}
	return this;
}
/**
* @function parses the children to add
* @private
*/
GLGE.Message.addChildren=function(obj,children){
	if(!(children instanceof Array)) children=[children];
	for(var i=0;i<children.length;i++){
		if(children[i].command){
			var asset=GLGE.Message.parseMessage(children[i]);
		}else{
			var asset=GLGE.Assets.get(children[i]);
		}
		obj["add"+asset.className](asset);
	}
}
/**
* @function parses the children to remove
* @private
*/
GLGE.Message.removeChildren=function(obj,children){
	if(!(children instanceof Array)) children=[children];
	for(var i=0;i<children.length;i++){
		var asset=GLGE.Assets.get(children[i]);
		obj["add"+asset.className](asset);
	}
}

GLGE.Message.toLoad=[];
GLGE.Message.messageLoader=function(url,callback,priority){
	GLGE.Message.toLoad.push([url,callback,priority]);
	if(GLGE.Message.toLoad.length==1) GLGE.Message.loadMessages();
}
GLGE.Message.loadMessages=function(){
	//TODO: use priority
	var nextDoc=GLGE.Message.toLoad.pop();
	var req=new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState  == 4){
			if(this.status  == 200 || this.status==0){
				nextDoc[1](this.responseText);
			}else{ 
				GLGE.error("Error loading Document: "+nextDoc[0]+" status "+this.status);
			}
		}
	}
	req.open("GET", nextDoc[0], true);
	req.send("");
	if(GLGE.Message.toLoad.length>0) GLGE.Message.loadMessages();
}


})(GLGE);