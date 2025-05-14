// import React, { useRef, useEffect, Suspense, forwardRef } from "react";
// import { Canvas, useThree } from "@react-three/fiber";
// import { CameraHelper, DirectionalLightHelper } from "three";
// import { OrbitControls, Environment } from "@react-three/drei";
// import EdisonBulb from "./EdisonBulb";

// // Light helper component for debugging
// const SceneHelpers = () => {
//   const { scene, camera } = useThree();
//   const lightRef = useRef();

//   useEffect(() => {
//     if (!lightRef.current) return;
//     const cameraHelper = new CameraHelper(camera);
//     const lightHelper = new DirectionalLightHelper(lightRef.current, 0.5);
//     scene.add(cameraHelper);
//     scene.add(lightHelper);

//     return () => {
//       scene.remove(cameraHelper);
//       scene.remove(lightHelper);
//     };
//   }, [scene, camera]);

//   return <directionalLight ref={lightRef} position={[2, 5, 2]} intensity={1} />;
// };

// // ✅ Correctly Forward Ref to EdisonBulb
// const Scene = forwardRef((props, ref) => {
//   const canvasRef = useRef();

//   useEffect(() => {
//     console.log("Scene: Ref updated, bulbRef:", ref?.current);
//   }, [ref]);

//   useEffect(() => {
//     console.log("Scene Mounted, bulbRef:", ref?.current);
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const handleContextLost = (e) => {
//       e.preventDefault();
//       console.warn("WebGL context lost. Attempting to restore...");
//     };

//     const handleContextRestored = () => {
//       console.log("WebGL context restored.");
//     };

//     canvas.addEventListener("webglcontextlost", handleContextLost);
//     canvas.addEventListener("webglcontextrestored", handleContextRestored);

//     return () => {
//       canvas.removeEventListener("webglcontextlost", handleContextLost);
//       canvas.removeEventListener("webglcontextrestored", handleContextRestored);
//     };
//   }, []);

//   return (
//     <Canvas ref={canvasRef} camera={{ position: [0, 0, 5], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} intensity={0.3} />
      
//       {/* Helper lights for debugging */}
//       {/* <SceneHelpers /> */}
      
//       {/* Additional point light below the bulb to ensure the bottom is illuminated */}
//       <pointLight position={[0, -2, 0]} intensity={1} />
      
//       {/* Suspense for dynamic loading of the bulb model */}
//       <Suspense fallback={null}>
//         {/* Correctly passing the forwarded ref to the EdisonBulb */}
//         <EdisonBulb ref={ref} scale={1.5} position={[0, -1, 0]} />
//       </Suspense>

//       {/* Night environment preset for more contrast */}
//       <Environment preset="night" />
//       <OrbitControls enableZoom={false} />
//     </Canvas>
//   );
// });

// export default Scene;



import React, { useRef, useEffect, Suspense, forwardRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { CameraHelper, DirectionalLightHelper } from "three";
import { OrbitControls, Environment } from "@react-three/drei";
import EdisonBulb from "./EdisonBulb";

// Light helper component for debugging
const SceneHelpers = () => {
  const { scene, camera } = useThree();
  const lightRef = useRef();

  useEffect(() => {
    if (!lightRef.current) return;
    const cameraHelper = new CameraHelper(camera);
    const lightHelper = new DirectionalLightHelper(lightRef.current, 0.5);
    scene.add(cameraHelper);
    scene.add(lightHelper);

    return () => {
      scene.remove(cameraHelper);
      scene.remove(lightHelper);
    };
  }, [scene, camera]);

  return <directionalLight ref={lightRef} position={[2, 5, 2]} intensity={1} />;
};

const Scene = forwardRef((props, ref) => {
  const canvasRef = useRef();

  useEffect(() => {
    // Handle WebGL context lost and restored
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn("WebGL context lost. Attempting to restore...");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored.");
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%", display: "block" }} // Ensuring canvas fills the viewport
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />

      {/* Additional point light below the bulb to ensure the bottom is illuminated */}
      <pointLight position={[0, -2, 0]} intensity={1} />
      
      {/* Suspense for dynamic loading of the bulb model */}
      <Suspense fallback={null}>
        <EdisonBulb ref={ref} scale={1.5} position={[0, -1, 0]}  textRef={props.textRef}/>
      </Suspense>

      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
});

export default Scene;
















