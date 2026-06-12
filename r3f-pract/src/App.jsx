import {Canvas} from '@react-three/fiber'
import './App.css'

function App() {
  return(
    <Canvas>


      <directionalLight position={[0,0, 2]}/>

      <mesh position={[1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>

       <mesh position={[-1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>

       <mesh position={[-1, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>

       <mesh position={[1, 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
      </mesh>
      
    </Canvas>
  )
}

export default App
