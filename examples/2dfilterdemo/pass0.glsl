#version 100

precision highp float;

uniform sampler2D GLGE_RENDER;
uniform sampler2D GLGE_PASS0;
uniform vec3 lightpos;
varying vec2 texCoord;

void main(void){
	float intensity=0.0;
	vec2 lightvec=texCoord-lightpos.xy;
	lightvec=lightvec*(1.0-clamp(length(lightvec),0.0,1.0));
	if((lightpos.z-1.0)>0.0){
		for(int i=1;i<30;i++){
			intensity+=texture2D(GLGE_PASS0, texCoord-lightvec*0.045*float(i)).r*pow(length(lightvec),2.5);
		}
	}
	intensity+=texture2D(GLGE_PASS0, texCoord).r;
	gl_FragColor = vec4(vec3(intensity),1.0);
}
