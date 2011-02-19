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


var XML={};
(function(XML){
XML.TextNode=function(value){
	this.nodeValue=value;
};
XML.Element=function(name){
	this.tagName=name;
	this.children=[];
	this.attributes={};
};
XML.Element.prototype.children=null;
XML.Element.prototype.attributes=null;
XML.Element.prototype.addChild=function(node){
	node.parentNode=this;
	if(this.children.length==0){
		this.hasChildren=true;
		this.firstChild=node;
	}else{
		this.children[this.children.length-1].nextSibling=node;
		node.previousSibling=this.children[this.children.length-1];
	}
	this.children.push(node);
};
XML.Element.prototype.setAttributes=function(attributes){
	this.attributes=attributes;
};
XML.Element.prototype.getAttribute=function(name){
	return this.attributes[name];
};
XML.Element.prototype.hasAttribute=function(name){
	if(this.attributes[name]) return true;
		else return false;
};
//function returns array of elements
XML.Element.prototype.getElementsByTagName=function(tagName){
	var retArray=[];
	for(var i=0;i<this.children.length;i++){
		if(this.children[i].tagName==tagName || tagName=="*"){
			if(this.children[i].tagName) retArray.push(this.children[i]);
		}
		//process the children
		if(this.children[i].hasChildren) retArray=retArray.concat(this.children[i].getElementsByTagName(tagName));
	}
	return retArray;
};
XML.Document=function(xml){
	this.currentElement=null;
	this.rootElement=null;
	this.eleStack=[];
	this.idCache={};
	this.xml=xml;
	this.sPointer=0;
	this.parseXML();
};
XML.Document.prototype.parseXML=function(){
	var xml=this.xml;
	var textValue="";
	var cdata=false;
	do{
		if(xml[this.sPointer]=="<" && !cdata){
			//add the text node
			if(textValue!="" && this.currentElement) this.currentElement.addChild(new XML.TextNode(textValue));
			textValue="";
			if(xml[this.sPointer+1]=="!"){
				//comment or cdata?
				if(xml[this.sPointer+2]=="[" && xml[this.sPointer+3]=="C" && xml[this.sPointer+4]=="D" && xml[this.sPointer+5]=="A" && xml[this.sPointer+6]=="T" && xml[this.sPointer+7]=="A" && xml[this.sPointer+8]=="["){
					cdata=true;
					this.sPointer=this.sPointer+8;
				}else{
					//it's just a comment so forget it
					this.closeElement();
					this.sPointer++;
				}
			}else if(xml[this.sPointer+1]=="?"){
				this.closeElement();
				this.sPointer++;
			}else if(xml[this.sPointer+1]!="/"){
				//new element
				newElement=this.parseElement();
				if(xml[this.sPointer]==">"){
					this.eleStack.push(this.currentElement);
					this.currentElement=newElement;
				}else{
					//self closing
					this.currentElement.addChild(newElement);
					this.sPointer++;
				}
			}else{
				//close element
				parentElement=this.eleStack.pop();
				if(parentElement){
					parentElement.addChild(this.currentElement);
					this.currentElement=parentElement;
				}else{
					this.rootElement=this.currentElement;
				}
				this.closeElement();
			}
		}else{
			if(cdata && xml[this.sPointer]=="]" && xml[this.sPointer+1]=="]"  && xml[this.sPointer+2]==">"){
				//close cdata section!
				this.currentElement.addChild(new XML.TextNode(textValue));
				textValue="";
				this.sPointer=this.sPointer+2;
				cdata=false;
			}else{
				textValue=textValue+xml[this.sPointer];
				if(textValue.length==32768){
					//add the text node
					this.currentElement.addChild(new XML.TextNode(textValue));
					textValue="";
				}
			}
		}
		this.sPointer++;
	}while(this.sPointer<xml.length);
};
XML.Document.prototype.closeElement=function(){
	var xml=this.xml;
	do{
		this.sPointer++;
	}while(xml[this.sPointer]!=">" && this.sPointer<xml.length);
};
XML.Document.prototype.parseElement=function(){
	var xml=this.xml;
	var name="";
	this.sPointer++;
	do{
		if(xml[this.sPointer]==" "){
			var attributes=this.parseAttributes();
		}else{
			name=name+xml[this.sPointer];
			this.sPointer++;
		}
	}while(xml[this.sPointer]!="/" && xml[this.sPointer]!=">" && this.sPointer<xml.length);
	var element=new XML.Element(name);
	if(attributes){
		element.setAttributes(attributes);
		if(attributes.id){
			this.idCache[attributes.id]=element;
		}
	}
	return element;
};
XML.Document.prototype.parseAttributes=function(){
	var xml=this.xml;
	var attributes={};
	do{
		var name="";
		do{
			if(xml[this.sPointer]!=" ") name=name+xml[this.sPointer];
			this.sPointer++;
		}while(xml[this.sPointer]!="=" && this.sPointer<xml.length);
		var quote=xml[++this.sPointer];
		var value="";
		this.sPointer++;
		do{
			value=value+xml[this.sPointer];
			this.sPointer++;
		}while(xml[this.sPointer]!=quote && this.sPointer<xml.length);
		if(name!="") attributes[name]=value;
		this.sPointer++;
	}while(xml[this.sPointer]!="/" && xml[this.sPointer]!=">" && this.sPointer<xml.length);
	return attributes;
};
XML.Document.prototype.getElementsByTagName=function(tagName){
	return this.rootElement.getElementsByTagName(tagName);
};
XML.Document.prototype.getElementById=function(id){
	if(this.idCache[id]){
		return this.idCache[id];
	}else{
		return false;
	}
};
})(XML);