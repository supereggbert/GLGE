/**
 * @fileOverview
 * @name audio3d.js
 * @author victorcarlquist@gmail.com
 */
(function(GLGE){

/**
* @class Audio 3D, audio manager 
*/

GLGE.AudioSources 		= [];
GLGE.AudioContext 		= new webkitAudioContext();
GLGE.AudioListener 		= null;

GLGE.AudioIR 			= [];
GLGE.AudioLoading 		= []; //waiting load audio files IR

GLGE.AudioSource 			= [];
GLGE.AudioLoadingSource 	= []; //waiting load audio files Sources

GLGE.AudioIR_HALL 		= 0;
GLGE.AudioIR_TELEPHONE 	= 1;
GLGE.AudioIR_ECHO 		= 2;
GLGE.AudioIR_NONE	 	= -1;

GLGE.Audio3D=function(uid){
	this.source;	
	this.panner;
	this.convolver;
	this.convolverGain;
	this.plainGain;
	this.oldX					= 0;
	this.oldY					= 0;
	this.oldZ					= 0;
	this.bufferList				= [];
	this.fileList				= [];
	
	this.stoped					= false;
	this.currentIndexSource		= 0;
	this.currentIndexEffect		= -1;
	
	GLGE.Assets.registerAsset(this,uid);
}

GLGE.Audio3D.prototype.setLocX = function (a){this.x =a;}
GLGE.Audio3D.prototype.setLocY = function (a){this.y =a;}
GLGE.Audio3D.prototype.setLocZ = function (a){this.z =a;}

/**
* Loading audio source buffer
* @param {int} index bufferlist
*/
GLGE.Audio3D.prototype.setAudioSource = function(i) 
{		
	this.currentIndexSource = i;
	
	if (!this.bufferList[i])
	{
		var url = this.fileList[i];

		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.responseType = "arraybuffer";
		var som = this;
		request.onload = function() { 
			
			var buffer = GLGE.AudioContext.createBuffer(request.response, true);
			som.bufferList[i] = buffer; 
		};
	
		request.send("");
	}
}

/**
* add path file source 
* @param {vector} vector paths files
*/
GLGE.Audio3D.prototype.setFiles = function(paths)
{
	for(var i in paths)
		this.fileList.push(paths[i]);
} 

/**
* Set Effect IR
* @param {int} index Effect (Impulse Response) in the list IRs
*/
GLGE.Audio3D.prototype.setEffect = function(id)
{
	this.currentIndexEffect	= id;
	if(id >= 0)
	{
		if(GLGE.AudioIR[id] != null)
			this.convolver.buffer = GLGE.AudioIR[id];
		else
		{
			GLGE.AudioLoading.push({obj:this,id:id});
		}
	}else
		this.convolver.buffer = 0;
	
} 

/**
* create Object sound with default values
* @private
*/
GLGE.Audio3D.prototype.createSound = function()
{
	// Initialize audio
	this.source 	= GLGE.AudioContext.createBufferSource();
	this.panner 	= GLGE.AudioContext.createPanner();
	this.convolver	= GLGE.AudioContext.createConvolver();
	
	this.plainGain = GLGE.AudioContext.createGainNode();
	this.convolverGain = GLGE.AudioContext.createGainNode();
	
	this.plainGain.gain.value = 0;
	this.convolverGain.gain.value = 2.0;
	
	this.source.connect(this.plainGain);
	this.plainGain.connect(this.panner);
	this.panner.connect(GLGE.AudioContext.destination);

	this.source.connect(this.convolver);
	this.convolver.connect(this.convolverGain);
	this.convolverGain.connect(this.panner);
	this.panner.connect(GLGE.AudioContext.destination);
	
	this.stoped = false;	
}

/**
* Link object with Audio
* @param {object} object GLGE.object
*/
GLGE.Audio3D.prototype.initSource = function(obj) 
{

	this.createSound(); //init sound

	this.bufferList = new Array(this.fileList.length);
	for (var i = 0; i < this.bufferList.lenght; i++) {
		bufferList[i] = 0;
	}
	
	this.setAudioSource(0); //default : load the first sound in the list
	
	GLGE.AudioSources.push({obj:obj,Source:this});
}

/**
* Play Audio
* @param {boolean} true = enable loop, false or null = disable loop
* @param {float} time (seconds) start sound
*/
GLGE.Audio3D.prototype.play = function(loop,time)
{
	if(!time)
		time = 0;
 	if(loop)
 		this.source.loop = true;
 	else
 		this.source.loop = false;
 		
 	if(this.stoped)
 	{
 		this.createSound();
 		this.setEffect(this.currentIndexEffect);	
 	}
 	if(this.bufferList[this.currentIndexSource] != null)
 	{
 		this.source.buffer = this.bufferList[this.currentIndexSource];	
 		this.source.noteOn(time);
	}
	else
		GLGE.AudioLoadingSource.push({obj:this,time:time});
	
}
/**
* Stop Audio
* @param {float} time (seconds) for stop sound
*/
GLGE.Audio3D.prototype.stop = function(time)
{
	if(!time)
		time = 0;
 	this.stoped = true;
 	this.source.noteOff(time);
}

/**
* Set volume source no Effects
* @param {float} volume Main (no Effect)
*/
GLGE.Audio3D.prototype.setVolumeMain = function(a)
{
	this.plainGain.gain.value = a;
}
/**
* Get volume source no Effects
*/
GLGE.Audio3D.prototype.getVolumeMain = function()
{
	return this.plainGain.gain.value;
}
/**
* Set volume source Effects
* @param {float} volume Effects (convolver)
*/
GLGE.Audio3D.prototype.setVolumeEffect = function(a)
{
	this.convolverGain.gain.value = a;
}
/**
* Get volume source Effects
*/
GLGE.Audio3D.prototype.getVolumeEffect = function()
{
	return this.convolverGain.gain.value;
}
/**
* Set Doppler Factor
* @param {float} value Doppler Factor 
*/
GLGE.Audio3D.setDopplerFactor = function(a)
{
	GLGE.AudioContext.listener.dopplerFactor = a;
}
/**
* Get Doppler Factor
*/
GLGE.Audio3D.getDopplerFactor = function()
{
	return GLGE.AudioContext.listener.dopplerFactor;
}
/**
*  Define cone listener  
* @param {object} listener object (GLGE.object)
*/
GLGE.Audio3D.initListener = function(obj) 
{
	GLGE.AudioContext.listener.coneOuterGain = 0;
	GLGE.AudioContext.listener.coneOuterAngle = 90;
	GLGE.AudioContext.listener.coneInnerAngle = 10;
	GLGE.AudioListener = obj;
}
/**
* Refresh positions audios Sources
*@private
*/ 
GLGE.Audio3D.RefreshPositions = function()
{
	for(var i in GLGE.AudioSources)
	{
		var obj = GLGE.AudioSources[i].obj;
		GLGE.AudioSources[i].Source.panner.setPosition(obj.getLocX(),obj.getLocY(),obj.getLocZ());
		
		var vy = (GLGE.AudioSources[i].oldY - obj.getLocY());
		var vx = (GLGE.AudioSources[i].oldX - obj.getLocX());
		var vz = (GLGE.AudioSources[i].oldZ - obj.getLocZ());
		
		GLGE.AudioSources[i].Source.panner.setVelocity(vx,vy,vz);
		
		GLGE.AudioSources[i].oldY = obj.getLocY();
		GLGE.AudioSources[i].oldX = obj.getLocX();
		GLGE.AudioSources[i].oldZ = obj.getLocZ();
		
	}
	
	var obj = GLGE.AudioListener.getPosition();
	GLGE.AudioContext.listener.setPosition(obj.x,obj.y,obj.z);
	obj = GLGE.AudioListener.getRotation();
	var x = (((obj.x%6.28)*360)/6.28);
	var y = (((obj.y%6.28)*360)/6.28);
	var z = (((obj.z%6.28)*360)/6.28);
	
	obj = GLGE.AudioListener.getUpAxis();
	//GLGE.AudioContext.listener.setOrientation(x,y,z,obj[0],obj[1],obj[2]);
	//document.getElementById("debug").innerHTML=y;
	
	
}
setInterval(GLGE.Audio3D.RefreshPositions,30);
/**
* Load IR, fix delay load
* @private
*/
GLGE.Audio3D.Loading =setInterval(function() 
{
	for(var i in GLGE.AudioLoading)
	{
		if(GLGE.AudioIR[GLGE.AudioLoading[i].id] != null)
		{
			GLGE.AudioLoading[i].obj.convolver.buffer = GLGE.AudioIR[GLGE.AudioLoading[i].id];
			GLGE.AudioLoading.splice(i,1);
		}
	}
},100);

/**
* Load Source, fix delay load
* @private
*/
GLGE.Audio3D.LoadingSource =setInterval(function() 
{
	for(var i in GLGE.AudioLoadingSource)
	{
		if(GLGE.AudioLoadingSource[i].obj.bufferList[GLGE.AudioLoadingSource[i].obj.currentIndexSource] != null)
		{
			GLGE.AudioLoadingSource[i].obj.source.buffer = GLGE.AudioLoadingSource[i].obj.bufferList[GLGE.AudioLoadingSource[i].obj.currentIndexSource];
			var time = 0;
			if((GLGE.AudioLoadingSource[i].time-100) > 0)
				time = GLGE.AudioLoadingSource[i].time-100;
			GLGE.AudioLoadingSource[i].obj.source.noteOn(time);
			GLGE.AudioLoadingSource.splice(i,1);
		}
	}
},100);

/**
* Loading audio Impulse Response buffer
* @param {string} url path file IR audio 
* @private
*/
GLGE.Audio3D.setAudiosourceIR = function(url) 
{
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";
	
	request.onload = function() { 
		var buffer = GLGE.AudioContext.createBuffer(request.response, true);
		GLGE.AudioIR.push(buffer);
	};
	request.send("");

}

/**
* Init audio source buffer
*/
GLGE.Audio3D.loadIR = function()
{
	var path = ["ir/big_hall.ogg","ir/filter-telephone.wav","ir/cosmic-ping-longdrive.wav"];
	
	for(var i =0;i<3;i++)
		GLGE.Audio3D.setAudiosourceIR(path[i]);
	
}


})(GLGE);

