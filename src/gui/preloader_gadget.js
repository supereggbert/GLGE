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
 * @name preloader_gadget.js
 * @author seamonkey@uni-koblenz.de
 */

(function(GLGE){
(function(GUI){

/**
* @class Preloader gadget
* @augments GLGE.GUI.Gadget
*/
GUI.Preloader=function(){
	// call super constructor
	this.baseclass.call(this);
	
	this.domGadgetObject.innerHTML = "<h1>Loading</h1>";
	this.domGadgetObject.className += ' glge-gui-gadget-preloader';
		
	// progress bar
	this.progressBar = new GUI.Progressbar();
	this.domGadgetObject.appendChild(this.progressBar.domRoot);
	
	this.domPercentageLabel = document.createElement('div');
	this.domPercentageLabel.setAttribute('class','glge-gui-gadget-preloader-percentage');
	this.domPercentageLabel.innerHTML = "<div style='float:left;'>0%</div><div style='float:right;'>100%</div></div>";
	this.domGadgetObject.appendChild(this.domPercentageLabel);
	
	// information box
	this.domInfoBox = document.createElement('div');
	this.domInfoBox.setAttribute('class','glge-gui-gadget-preloader-info');
	this.domInfoBox.setAttribute('style','clear:both;');
	this.domGadgetObject.appendChild(this.domInfoBox);
	
	// state label
	this.domStateLabel = document.createElement('div');
	this.domInfoBox.appendChild(this.domStateLabel);
	
	// bytes label
	this.domBytesLabel = document.createElement('div');
	this.domInfoBox.appendChild(this.domBytesLabel);
	
	// files label
	this.domFilesLabel = document.createElement('div');
	this.domInfoBox.appendChild(this.domFilesLabel);
	
	// last file label
	this.domLastFileLabel = document.createElement('div');
	this.domInfoBox.appendChild(this.domLastFileLabel);
}

GUI.Preloader.prototype.progressBar = null;
GUI.Preloader.prototype.documentLoader = null;
GUI.Preloader.prototype.domInfoBox = null;
GUI.Preloader.prototype.domStateLabel = null;
GUI.Preloader.prototype.domBytesLabel = null;
GUI.Preloader.prototype.domFilesLabel = null;
GUI.Preloader.prototype.domLastFileLabel = null;
GUI.Preloader.prototype.domPercentageLabel = null;


/**
 * Combine the preloader gadget with an actual preloader
 * @param {GLGE.DocumentPreloader} docLoader	preloader
 */ 
GUI.Preloader.prototype.setDocumentLoader = function(docLoader){
	
	this.documentLoader = docLoader;
	
	// add listeners
	var that = this;
	this.documentLoader.addEventListener("downloadComplete", function(args){that.complete(args);});
	this.documentLoader.addEventListener("progress", function(args){that.progress(args);});
	this.documentLoader.addEventListener("stateChange", function(args){that.stateChange(args);});
	this.documentLoader.addEventListener("fileLoaded", function(args){that.fileLoaded(args);});
}

/**
 * Add preloader-gadget to DOM. Creates the content of the DOM-object (domGadgetObject).
 * @param {object} element			Parent element of the gadget
 * @param {string|object} [position]		Gadget position
 */ 
GUI.Preloader.prototype.addToDOM = function(element, position){

	// update labels
	this.stateChange(this.documentLoader.state);
	this.progress({progress:0, loadedBytes:0, loadedFiles:0, totalFiles:0, totalBytes: 0});
	this.fileLoaded({});
	
	this.baseclass.addToDOM.call(this, element, position)
}

/**
 * Called on progress
 */
GUI.Preloader.prototype.progress = function(args){
	//this.domProgressBar.progressbar({value: args.progress });
	this.progressBar.setValue(args.progress);
	this.domBytesLabel.innerHTML = args.loadedBytes + " of " + args.totalBytes + " Bytes loaded";
	this.domFilesLabel.innerHTML = args.loadedFiles + " of " + args.totalFiles + " Files loaded";
}

/**
 * Called when the preloader finished loading
 */
GUI.Preloader.prototype.complete = function(args){
	//this.domProgressBar.progressbar({value: 100 });
	this.progressBar.setValue(100);
	var that = this;
	setTimeout ( function(){that.domGadgetRoot.parentNode.removeChild(that.domGadgetRoot)}, 300);
	
}

/**
 * Called when the preloader changed it's state
 */
GUI.Preloader.prototype.stateChange = function(args){
	switch(args)
	{
		case 0:
		case 1: this.domStateLabel.innerHTML = "Step 1 of 2: Loading XML"; break;
		case 2:
		case 3: this.domStateLabel.innerHTML = "Step 2 of 2: Loading Textures"; break;
	}
}

/**
 * Called when a file has been loaded
 */
GUI.Preloader.prototype.fileLoaded = function(args){
	if(args.url){
		var path = args.url;
		
		// use only 40 letters
		if(path.length > 40){
			path = path.slice(-37);
			path = "..." + path;
		}
		this.domLastFileLabel.innerHTML = "Last file loaded: \"" + path + "\"";
	}
	else 
		if(this.domLastFileLabel.innerHTML == "") this.domLastFileLabel.innerHTML = "Last file loaded: <i>none</i>";
}

GLGE.augment(GUI.Gadget,GUI.Preloader);

})(GLGE.GUI);})(GLGE);
