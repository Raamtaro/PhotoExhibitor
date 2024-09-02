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

#include ./includes/utils.glsl;

varying vec2 vUv;
varying vec2 vUvCover;

float M_PI = 3.141529654;

// vec3 deformationCurve(vec3 position, vec2 uv) {
//   position.y = position.y - (sin(uv.x * M_PI) * min(abs(uScrollVelocity), 5.0) * sign(uScrollVelocity));
//   position.x = position.x - (sin(uv.y * M_PI) * min(abs(uScrollVelocity), 5.0) * sign(uScrollVelocity));

//   return position;
// }

void main() {
    vUv = uv;
    vUvCover = getCoverUvVert(vUv, uTextureSize, uQuadSize);

    // vec3 newPosition = deformationCurve(position, vUvCover);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}