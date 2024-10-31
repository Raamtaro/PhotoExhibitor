uniform sampler2D uTexture;

uniform vec2 uOffset;

varying vec2 vUv;



vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset) {
    float r = texture2D(textureimage, uv + offset).r;
    float g = texture2D(textureimage, uv).g;
    float b = texture2D(textureimage, uv - offset).b;

    return vec3(r, g, b);
}

void main() {
    vec2 newUv = vUv;
    vec3 color = rgbShift(uTexture, vUv, uOffset);
    gl_FragColor = vec4(color, 1.0);
}