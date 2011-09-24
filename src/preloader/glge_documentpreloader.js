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
 * @fileOverview
 * @name glge_documentpreloader.js
 * @author seamonkey@uni-koblenz.de
 */


(function(GLGE){




/**
* @class Document preloader class
* @augments GLGE.Events
*/
GLGE.DocumentPreloader=function(doc, args){

	
	// create image preloader
	this.imagePreloader = new GLGE.FilePreloader();
	
	this.document = doc;
	

	if(args.XMLQuota)
		this.XMLQuota = args.XMLQuota;
	else
		this.XMLQuota = 0.2; // 20% XML, 80% images
	
	this.imageQuota = 1-this.XMLQuota;
		
	// Passing the size of all xml files will improve the accuracy of the preloader. Alternative: Pass the number of xml files (approximation)
	if(args.XMLBytes)
		this.XMLBytes = args.XMLBytes;
	else if(args.numXMLFiles)
		this.numXMLFiles = args.numXMLFiles;
	else
		this.numXMLFiles = 3; //TODO necessary?
}

GLGE.augment(GLGE.Events,GLGE.DocumentPreloader);

GLGE.DocumentPreloader.prototype.progress = 0;

GLGE.DocumentPreloader.prototype.imageQuota = 0;	// size quota of images (Textures) [0..1]
GLGE.DocumentPreloader.prototype.XMLQuota = 0; 		// size quota XML (Documents) [0..1]

GLGE.DocumentPreloader.prototype.XMLBytes = -1; 	// XML size in bytes (for higher accuracy)
GLGE.DocumentPreloader.prototype.totalBytes = -1; 	// XML size in bytes (highest accuracy)
GLGE.DocumentPreloader.prototype.loadedBytes=0;

GLGE.DocumentPreloader.prototype.numXMLFiles = 3;	// default value

GLGE.DocumentPreloader.prototype.state = 0; 		// 0: not yet started, 1: loading XML, 2: loading images, 3: completed
GLGE.DocumentPreloader.prototype.imagePreloader = null; // GLGE.Peloader
GLGE.DocumentPreloader.prototype.document = null;	// GLGE.Document

/**
 * Add an image, which should be loaded by the preloader.
 * @param {string} url	Url of the image.
 */
GLGE.DocumentPreloader.prototype.addImage=function(url){
	this.imagePreloader.addFile(url, "image");
}

/**
 * Start loading all images in all xml files. Assumes that XML-files have finished loading.
 */
GLGE.DocumentPreloader.prototype.loadImages=function(){

	this.changeState(2);
	
	if(this.progress < this.XMLQuota * 100.0) this.progress = this.XMLQuota * 100.0; // correct progress.

	var that = this;
	this.imagePreloader.addEventListener("progress", function(args){that.updateProgress.call(that, args);});
	this.imagePreloader.addEventListener("downloadComplete", function(args){that.finish.call(that, args);});
	this.imagePreloader.addEventListener("fileLoaded", function(args){that.fireEvent("fileLoaded", args.file);});
	this.imagePreloader.start();
}

/**
 * Update preloader progress.
 * @param {object} args		Progress information. 
 *				<br />args.stepBytes describes how many bytes have been loaded since the last update.
 */
GLGE.DocumentPreloader.prototype.updateProgress=function(args){

	if(this.state < 2){ // loading xml

		if(this.XMLBytes > 0){ // high accuracy
			//if(!args.stepBytes) args.stepBytes = 0; 
			this.loadedBytes += args.stepBytes;
			this.progress = this.XMLQuota * 100.0 * this.loadedBytes / this.XMLBytes;
		}
		else{ // low accuracy
			this.progress += this.XMLQuota * 100.0 / this.numXMLFiles;
			if(this.progress > this.XMLQuota * 100) this.progress = this.XMLQuota * 100;
		}
	}
	else{ // loading images
		this.progress = this.XMLQuota * 100 + this.imageQuota * this.imagePreloader.progress;
	}
	this.fireEvent("progress", {"progress":this.progress, "stepBytes":args.stepBytes, "loadedBytes":args.loadedBytes, "totalBytes":args.totalBytes, "loadedFiles": args.loadedFiles, "totalFiles": args.totalFiles});
}

/**
 * This function loads a XML-file. Assumes that loading images hasn't yet begun.
 * @param {string} url	Url of the XML-file.
 */
GLGE.DocumentPreloader.prototype.loadXMLFile=function(url){

	this.changeState(1);

	var xmlPreloader = new GLGE.FilePreloader();
	xmlPreloader.addFile(url, "xml");
	
	var that = this;
	
	if(this.XMLBytes > 0) xmlPreloader.addEventListener("progress", function(arg){that.updateProgress.call(that, arg);}); // high accuracy
	else xmlPreloader.addEventListener("downloadComplete", function(arg){that.updateProgress.call(that, arg);}); // low accuracy

	var doc = this.document;
	xmlPreloader.addEventListener("fileLoaded", function(args){ 
			args.file.content.getElementById=doc.getElementById; 
			doc.loaded(args.file.url,args.file.content);
			that.fireEvent("fileLoaded", args.file);
		});	
	
	xmlPreloader.start();
}

/**
 * Sets the state of the document preloader.
 * @param {number} newState	New state
 */
GLGE.DocumentPreloader.prototype.changeState = function(newState) {
	//if(this.state > newState) GLGE.warning("GLGE.DocumentPreloader.prototype.changeState: The new state is lower than the old.");
	this.state = newState;
	this.fireEvent("stateChange", newState);
}

/**
 * Called when the document preloader loaded all files.
 * @param {object} event	Event parameter. Not used at all.
 */
GLGE.DocumentPreloader.prototype.finish=function(event){
	this.changeState(3);
	this.progress = 100;
	this.fireEvent("downloadComplete");		
}

})(GLGE);
