uniform sampler2D uTexture;

uniform vec2 uOffset;

varying vec2 vUv;
varying vec2 vNewUv;



vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset) {
    float r = texture2D(textureimage, uv + offset).r;
    float g = texture2D(textureimage, uv).g;
    float b = texture2D(textureimage, uv - offset).b;

    return vec3(r, g, b);
}

vec2 scaleUV(vec2 uv,float scale) {
    float center = 0.5;
    return ((uv - center) * scale) + center;
}

void main() {
    vec2 newUv = vUv;
    // vec3 color = rgbShift(uTexture, vUv, uOffset);
    vec3 color = rgbShift(uTexture, scaleUV(vNewUv, .75), uOffset);
    gl_FragColor = vec4(color, 1.0);
}