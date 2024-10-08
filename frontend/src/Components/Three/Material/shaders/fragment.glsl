precision highp float;

uniform vec2 uResolution; // in pixel
uniform float uTime; // in s
uniform vec2 uCursor; // 0 (left) 0 (top) / 1 (right) 1 (bottom)
uniform float uScrollVelocity; // - (scroll up) / + (scroll down)
uniform sampler2D uTexture; // texture
uniform vec2 uTextureSize; // size of texture
uniform vec2 uQuadSize; // size of texture element
uniform float uBorderRadius; // pixel value
uniform float uMouseEnter; // 0 - 1 (enter) / 1 - 0 (leave)
uniform vec2 uMouseOverPos; // 0 (left) 0 (top) / 1 (right) 1 (bottom)
uniform float uMouseVelocity;

varying vec2 vUv;


vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset) {
    float r = texture2D(textureimage, uv + 0.01 * offset + 0.0015 * vec2(0.0, uScrollVelocity) ).r;
    float g = texture2D(textureimage, uv + 0.01 * offset - 0.00225 * vec2(0.0, uScrollVelocity)).g;
    float b = texture2D(textureimage, uv - 0.01 * offset - 0.00125 * vec2(0.0, uScrollVelocity)).b;

    return vec3(r, g, b);
}

void main() {

    vec3 color = rgbShift(uTexture, vUv, vec2(0.0));

    vec3 finalColor = color;

    gl_FragColor = vec4(finalColor, 1.0);


    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}