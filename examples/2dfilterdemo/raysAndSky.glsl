#version 100

precision highp float;

uniform sampler2D GLGE_RENDER;
varying vec2 texCoord;

void main(void){
	vec4 color = texture2D(GLGE_RENDER, texCoord);

	float intensity = 0.0;
	if(color.r==0.0 && color.g==0.0 && color.b==1.0) intensity=1.0;
	gl_FragColor = vec4(vec3(intensity),1.0);
}
