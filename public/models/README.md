# 3D Model Asset Guide

By default, the portfolio renders a high-performance procedural titanium smartphone with custom materials, camera optics, dynamic OLED screen textures, and 5-layer exploded architecture directly via Three.js / React Three Fiber.

If you wish to use a custom 3D model instead:
1. Export your phone model in `.glb` format (compressed with Draco or Meshopt, ideally under 3MB).
2. Place it here as `/public/models/phone.glb`.
3. In `src/components/3d/LivingDevicePhone.tsx`, load it with `useGLTF('/models/phone.glb')`.
