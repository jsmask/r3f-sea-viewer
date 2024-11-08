import * as THREE from "three";
import { useState, Suspense, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Sky as SkyImp,
  useTexture,
  PositionalAudio,
  Stats,
} from "@react-three/drei";
import { EffectComposer, SSR, Bloom, LUT, GodRays, Autofocus } from "@react-three/postprocessing";
import { LUTCubeLoader, BlendFunction } from "postprocessing";
import { Cloud } from "./libs/Cloud.js";
import { SeaSatge } from "./SeaSatge.jsx";
import { Seagulls } from "./Seagulls.jsx";
// import { Boat } from "./Boat.jsx"

export function Effects() {
  // const texture = useLoader(LUTCubeLoader, '/lut/F-6800-STD.cube')
  const texture = useTexture("/lut/filmic2.png");
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.flipY = false;

  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.3}
        mipmapBlur
        luminanceSmoothing={0}
        intensity={0.36}
      />
      <LUT lut={texture} />

      {/* <Autofocus /> */}
    </EffectComposer>
  );
}
function Sky() {
  return (
    <>
      <SkyImp scale={1000} sunPosition={[500, 150, -1000]} turbidity={0} />
      <Cloud
        position={[10, 85, -30]}
        speed={0.1}
        seed={18}
        segments={12}
        bounds={[21, 12, 22]}
        volume={100}
        color={0xffffff}
        opacity={0.7}
      />
      <Cloud
        position={[-30, 90, 200]}
        speed={0.1}
        seed={3}
        segments={12}
        bounds={[121, 12, 22]}
        volume={150}
        color={0xffffff}
        opacity={0.46}
      />
      <Cloud
        position={[220, 88, 150]}
        speed={0.1}
        seed={3}
        segments={9}
        bounds={[51, 12, 22]}
        volume={90}
        color={0xffffff}
        opacity={0.46}
      />
      <Cloud
        position={[250, 98, 230]}
        speed={0.1}
        seed={2}
        segments={9}
        bounds={[21, 12, 22]}
        volume={170}
        color={0xffffff}
        opacity={0.46}
      />
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={Math.PI} />
      <pointLight position={[-10, 100, -20]} color={0xfffffff} />
      <pointLight position={[10, 90, -20]} color={0xfffffff} />
      <directionalLight
        intensity={2}
        color={0xfffffff}
        shadow-mapSize={4096}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-left={100}
        shadow-camera-right={-100}
        shadow-intensity={3}
        shadow-bias={-0.0001}
        position={[10, 150, 20]}
        castShadow
      ></directionalLight>
    </>
  );
}

function App({ ready }) {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [10, 5, 100], fov: 60, near: 1 }}
        gl={{ localClippingEnabled: true }} 
        shadows
      >
        {/* <Stats /> */}
        {/* <fog attach="fog" args={["rgb(223,226,230)", 90,200]} /> */}
        <Sky />
        <Lights />
        {/* <Suspense fallback={null}> */}
        <SeaSatge ready={ready} />
        <Seagulls ready={ready} position={[-28, 8, 42]} scale={0.6} />
        {/* <Boat position={[-32,-0.7,34]} scale={.4} /> */}
        <Environment files={"/hdr/empty_warehouse_01_1k.hdr"} />
        <Effects />
        {/* </Suspense> */}
        <OrbitControls
          makeDefault
          maxDistance={110}
          minDistance={30}
          maxPolarAngle={Math.PI / 2}
          enablePan={false}
        />
      </Canvas>
    </>
  );
}

export default App;
