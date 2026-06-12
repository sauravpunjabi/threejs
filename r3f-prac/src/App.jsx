import { Canvas } from '@react-three/fiber';


function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [2,2,2] }} >
        
        <mesh>
        {/*  <sphereGeometry args={[3, 80, 80]} /> */}

          <boxGeometry args={[2, 3, 2]} />
          <meshPhongMaterial color='red' />
          <directionalLight position={[2, 5, 1]} />
        </mesh>

      </Canvas>
    </div>
  )
}

export default App
