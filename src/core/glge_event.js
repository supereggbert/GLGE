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
 * @name glge_event.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A events class
**/
GLGE.Events=function(){
}
/**
* Fires an event
* @param {string} event The name of the event to fire
* @param {object} data the events data
**/
GLGE.Events.prototype.fireEvent=function(event,data){
	if(this.events && this.events[event]){
		var events=this.events[event];
		for(var i=0;i<events.length;i++){
			if(events[i] && events[i].call) events[i].call(this,data);
		}
	}
}
/**
* Adds an event listener
* @param {string} event The name of the event to listen for
* @param {function} fn the event callback
**/
GLGE.Events.prototype.addEventListener=function(event,fn){
	if(!this.events) this.events={};
	if(!this.events[event]) this.events[event]=[];
	this.events[event].push(fn);
}
/**
* Removes an event listener
* @param {function} fn the event callback to remove
**/
GLGE.Events.prototype.removeEventListener=function(event,fn){
    if(!this.events[event]) return;
	var idx=this.events[event].indexOf(fn);
	if(idx!=-1) this.events[event].splice(idx,1);
}

})(GLGE);