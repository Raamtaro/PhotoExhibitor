uniform sampler2D uTexture;
uniform vec2 uOffset;
varying vec2 vUv;
varying vec2 vNewUv;

float M_PI = 3.141529654;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
}

void main() {
    vUv = uv;
    vNewUv = uv + (uOffset * 2.);
    vec3 newPosition = deformationCurve(position, uv, uOffset);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}