varying vec2 vUv;
varying vec2 vNewUv;
uniform float uAlpha;
uniform sampler2D uTexture;
uniform vec2 uOffset;

vec3 rgbShift(sampler2D baseTexture, vec2 uv, vec2 offset) { //This function specifcally causes the error.
    float r = texture2D(baseTexture, uv + offset).r;
    float g = texture2D(baseTexture, uv).g;
    float b = texture2D(baseTexture, uv - offset).b;

    return vec3(r, g, b);
}

vec2 scaleUV(vec2 uv,float scale) {
    float center = 0.5;
    return ((uv - center) * scale) + center;
}

void main() {
    // vec4 helloWorld = texture2D(uTexture, vUv);


    // vec3 color = rgbShift(uTexture, vUv, uOffset); 
    // vec3 color = texture2D(uTexture,scaleUV(vNewUv, .8)).rgb;

    // //Combo
    // vec3 color = rgbShift(uTexture, scaleUV(vNewUv, .83), uOffset);


    // gl_FragColor = vec4(color, uAlpha);

    gl_FragColor = vec4(vUv, 0.0 ,uAlpha); //This works out, vUv is being passed correctly.
    // gl_FragColor = vec4(helloWorld.rgb, uAlpha);
    // #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}