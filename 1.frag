/*{
//     "server": 3000,
    "pixelRatio": 1,
    "vertexCount":10000,
    "vertexMode": "TRIANGLES",
    // "vertexMode": "LINE_LOOP",
    "glslify": true,
    "PASSES": [{
        "TARGET": "renderBuffer",
        "vs": "./1.vert",
    }, {
    }],
}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D renderBuffer;
uniform sampler2D backbuffer;
#pragma glslify: triNoise = require(./util/triNoise.frag)

vec2 rotate(in vec2 v, in float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 uv = gl_FragCoord.xy / resolution;
    vec2 uv0 = uv;


    // p = sin(abs(p)) * sin(time * 2.4);

p=abs(uv-.5);
// p=rotate(p, sin(time*.3)*cos(time*.4));
// p*=p;

    float t = mod(time, .9);
    p *= 3.9;
    // if (t < .5) {
        // p = fract(p + time *.3);
        // p *= 1. - fract(time*.2);
    // }
    // else {
        p = rotate(p, time*.8);
    // }

// p += triNoise(p, fract(time)+30.);

    // p *= 1. - t;
   // p = rotate(p, time * .7 + triNoise(p*.22, time*.1)*10.);
  p = fract(p) * (1. +fract(time *2.2));

    gl_FragColor = vec4(1);
    gl_FragColor.bg = (1. - vec2(
        texture2D(renderBuffer, p).b,
        texture2D(renderBuffer, p+.1).g
    )) *2. - 1.;
    gl_FragColor.r = .7 - texture2D(backbuffer, uv0).b;
    // gl_FragColor.r= triNoise(uv + .02, time *.3);

// vec2 up = uv0 - .5;
    // gl_FragColor += texture2D(backbuffer, rotate(up, .2) * .9+.5)*.8;
    // gl_FragColor -= .2 / length(uv0 - .5);
}
