import {Canvas, useFrame} from '@react-three/fiber';
import {EffectComposer, Bloom} from '@react-three/postprocessing';
import {useMemo, useRef} from 'react';
import * as THREE from "three";

function ParticleLayer({
    scrollProgressRef,

    count = 10000, //total number of particles
    size = 0.02,
    opacity = 0.4,
    spread = 16, //width of each particle
    height = 2.2, //vertical randomness
    depth = 3, //Z-depth this gives 3d depth
    yOffSet = 0 //moves the layer up and down
}) {
    const pointsRef = useRef();
    const positions = useMemo(() => {
  const arr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * spread;

    const wave =
      Math.sin(x * 0.9) * 0.55 +
      Math.sin(x * 1.8) * 0.25;

    const y = wave + (Math.random() - 0.5) * height + yOffSet;
    const z = (Math.random() - 0.5) * depth;

    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
  }

  return arr;
}, [count, spread, height, depth, yOffSet]);
    useFrame((state) => {
        if(!pointsRef.current) return;

        const t = state.clock.elapsedTime;

        //scrollProgressRef is controlled by gsap.
        const scroll = scrollProgressRef?.current || 0;

        //normal idle animation + scroll animation 
        pointsRef.current.rotation.z = Math.sin(t * 0.08) * 0.025 + scroll * 0.18;
        pointsRef.current.position.y = Math.sin(t * 0.35) * 0.05 + scroll * 1.2;

        

        //particles expand as user scrolls
        const scale = 1 + scroll * 0.35;
        pointsRef.current.scale.setScalar(scale);
    });

    return(
        <points ref={pointsRef}>
                {/* bufferGeometry stores all the particles efficiently and gives Threejs the position data */}

            <bufferGeometry> 

                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>

            {/*pointsMaterial controls how the dots look.*/}
            <pointsMaterial 
            size = {size}
            color="#eeeeee"
            transparent
            opacity={opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            />  
        </points>
    )
}

export default function ParticleBackground({ scrollProgressRef }){
    return(
        <div className='particle-bg'>
            <Canvas camera={{position: [0,0,6], fov:45}} dpr = {[1,1.5]}
                gl = {{antialias: true}}>
                
                {/*background in canvas */}
                <color attach="background" args={["#171717"]} />

                {/*main particle layer*/}
                <ParticleLayer 
                    scrollProgressRef={scrollProgressRef} 
                    count = {8000}
                    size = {0.02}
                    opacity={0.38} />

                {/* second layer*/}
                <ParticleLayer
                    scrollProgressRef={scrollProgressRef}
                    count={1300}
                    size={0.055}
                    opacity={0.2}
                    height={2.8}
                    depth={4}
                />

                {/* bloom layer : adds a soft glow*/}
               <EffectComposer>
                    <Bloom
                        intensity={0.55}
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}