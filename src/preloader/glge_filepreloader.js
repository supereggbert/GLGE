/*
Copyright (c) 2011 Martin Ruenz

Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @fileOverview Base class for preloaders. Enables the handling of multiple files.
 * @name glge_filepreloader.js
 * @author seamonkey@uni-koblenz.de
 */


(function(GLGE){




/**
* @class FilePreloader class
* @augments GLGE.Events
*/
GLGE.FilePreloader=function(){
	this.files=[];
}

GLGE.augment(GLGE.Events,GLGE.FilePreloader);

GLGE.FilePreloader.prototype.loadedBytes=0;
GLGE.FilePreloader.prototype.totalBytes=0;
GLGE.FilePreloader.prototype.numLoadedFiles=0;
GLGE.FilePreloader.prototype.numTotalFiles=0;
GLGE.FilePreloader.prototype.sizesCount=0;		/** @description Specifies how many file sizes has been collected */
GLGE.FilePreloader.prototype.progress=0; 		/** @description 0 - 100 */
GLGE.FilePreloader.prototype.files=null; 		/** @description List of files. file: {	"url":url,"loaded":fileloaded,"size":filesize,"bytesLoaded":loadedSize,
											"type":'xml'/'image',"callback":called when loaded,"content":content, "preloader":GLGE.FilePreloader} */
/**
* Add a file which has to be loaded
* @param {string} url 		The url of the file.
* @param {string} type 		Defines the type of the requested file. "image" or "xml"
* @param {function} [callback] 	Call this function when the file is loaded and pass the loaded content.
* @public
*/
GLGE.FilePreloader.prototype.addFile=function(url, type, callback){
	//if(this.files.indexOf(url) != -1) return;
	
	this.files.push({"url":url,"loaded":false,"size":-1,"bytesLoaded":0,"type":type,"callback":callback,"content":null,"preloader":this});
	this.numTotalFiles++;
}

/**
* Same as addFile. But instead of creating a new file object use an existing one.
* @param {object} file	The file to add.
* @public
*/
GLGE.FilePreloader.prototype.addFileRef=function(file){
	//if(this.files.indexOf(url) != -1) return;
	
	this.files.push(file);
	this.numTotalFiles++;
}

/**
* This function accumulates the size of all files. When done it triggers loadFiles(). It has to be called for each file.
* @param {object} file	Current file.
* @private
*/
GLGE.FilePreloader.prototype.accumulateFileSize=function(file)
{
	var req = new XMLHttpRequest();
	req.preloader = this;
	req.active = true;
	req.file = file;
	req.overrideMimeType("text/xml");
	req.onreadystatechange = function() {
		if(this.readyState  > 1 && req.active)
		{
			this.active = false;

			this.file.size = parseFloat(this.getResponseHeader('Content-length'));
			this.preloader.totalBytes += this.file.size;
			
			if(++this.preloader.sizesCount >= this.preloader.files.length) // are all file sizes collected?
				this.preloader.loadFiles();
			
			this.abort();
			this.onreadystatechange = null;
		}
	};
	req.open("GET", file.url, true);
	req.send("");
}

/**
* Start loading
* @public
*/
GLGE.FilePreloader.prototype.start=function(){
	for(i in this.files)
		this.accumulateFileSize(this.files[i]);
}

/**
* Load files. Assumes that the file sizes have been accumulated.
* @private
*/
GLGE.FilePreloader.prototype.loadFiles=function(){
	
	for(i in this.files){
		var file = this.files[i];
		if(file.type == "image")
		{
			// only update the preloader, when the file is completely loaded (no ajax)
			
			var image = new Image();
			file.content = image;
			var that = this;
			image.file = file;
			image.onload = function(){ that.fileLoaded(this.file, this.file.size); } 
			image.src=file.url;
		}else{
			// update the preloader each 0.1 seconds (ajax)
			
			var req = new XMLHttpRequest();
			req.overrideMimeType("text/xml");
			req.preloader = this;
			req.file = file;
			
			var updateTrigger = setInterval (function ()
			{
				if (req.readyState == 3)
				{
					// TODO: Check if the file reference is always correct
					var stepBytes = req.responseText.length - file.bytesLoaded;
					file.bytesLoaded = req.responseText.length;
					req.preloader.update(stepBytes);
				}
				
			}, 100);
			
			req.onreadystatechange = function() {
				if(this.readyState  >= 4)
				{	
					clearInterval(updateTrigger);
					this.file.content = this.responseXML;
					
					var stepBytes = this.responseText.length - this.file.bytesLoaded;
					
					this.preloader.update(stepBytes);
					this.preloader.fileLoaded(this.file, stepBytes);
				}
			};
			
			req.open("GET", file.url, true);
			req.send();
				
		}
	}
}

/**
 * This functions updates the progress.
 * @param {number} stepBytes	Amount of bytes that have been loaded since the last call. 
 * @private
 */
GLGE.FilePreloader.prototype.update=function(stepBytes){
	this.loadedBytes += stepBytes;
	this.progress = (100.0 * this.loadedBytes) / this.totalBytes;

	this.fireEvent("progress", {"progress":this.progress, "stepBytes":stepBytes, "loadedBytes":this.loadedBytes, "totalBytes":this.totalBytes, "loadedFiles": this.numLoadedFiles, "totalFiles": this.numTotalFiles}); 
}

/**
 * Called when a file has been loaded. This function triggers an event and updates the state.
 * @param {object} file		The file that has been loaded.
 * @param {number} stepBytes	Amount of bytes that have been loaded since the last call. 
 * @private
 */
GLGE.FilePreloader.prototype.fileLoaded=function(file, stepBytes){

	this.numLoadedFiles++;
	
	// update file
	file.loaded = true;
	file.bytesLoaded = file.size;	
	
	// update progress
	if(this.numLoadedFiles >= this.files.length){
		this.progress = 100;
		this.fireEvent("downloadComplete", {"file":file,"stepBytes":stepBytes});
	}else{
		this.update(stepBytes);
	}
	
	// events
	this.fireEvent("fileLoaded", {"file":file,"stepBytes":stepBytes});
	if(file.callback) file.callback(file);
}

/**
 * This function returns a list (an array) of all loaded files.
 * @public
 */
GLGE.FilePreloader.prototype.getLoadedFiles=function(){
	var result = [];
	for(i in this.files)
		if(this.files[i].loaded)
			result.push(this.files[i]);
	return result;
}

/**
 * This function returns information about one file.
 * @param {string} url	The url of the file.
 * @public
 */
GLGE.FilePreloader.prototype.getFile=function(url){
	for(i in this.files)
		if(this.files[i].url==url)
			return this.files[i];
	return -1;
}


})(GLGE);
