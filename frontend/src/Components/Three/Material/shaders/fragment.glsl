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

varying vec2 vUv;
varying vec2 vUvCover;

vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset) {
    float r = texture2D(textureimage, uv + 0.01 * offset + vec2(0.0, uScrollVelocity) * 0.003).r;
    float g = texture2D(textureimage, uv + .05  * offset - 0.0002*vec2(0.0, uScrollVelocity)).g;
    float b = texture2D(textureimage, uv - 0.01 * offset - vec2(0.0, uScrollVelocity)*0.007).b;

    return vec3(r, g, b);
}

void main() {
    vec2 texCoords = vUvCover;
    vec2 offsetCoords = vUvCover;
    float aspectRatio = uQuadSize.y/uQuadSize.x;

    float circle = 1.0 - distance(
    vec2(uMouseOverPos.x, (1.0 - uMouseOverPos.y) * aspectRatio),
    vec2(vUv.x, vUv.y * aspectRatio)
    ) * 5.0;

    texCoords.x += mix(0.0, circle * 0.01, uMouseEnter);
    texCoords.y += mix(0.0, circle * 0.01, uMouseEnter);
    // float r = texture2D(uTexture, texCoords += circle * (uMouseOverPos * .5)).x;
    // float g = texture2D(uTexture, texCoords += circle * (uMouseOverPos * .525)).y;
    // float b = texture2D(uTexture, texCoords += circle * (uMouseOverPos * .55)).z;

    // vec3 texture = vec3(texture(uTexture, vUvCover));
    

    

    vec3 texture = vec3(texture(uTexture, texCoords));
    vec3 color = rgbShift(uTexture, offsetCoords, uMouseOverPos);

    vec3 finalColor = texture + color;



    gl_FragColor = vec4(finalColor, 1.0);
    // gl_FragColor = vec4(texture, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}