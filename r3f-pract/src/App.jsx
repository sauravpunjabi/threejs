import {useRef} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import './App.css'

const Cube = ({ position, size, color }) => {
const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 3
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2 
  })

  return(
      <mesh position={position} ref={ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>

  )
}

function App() {
  return(
    <Canvas>


      <directionalLight position={[0,0, 2]} intensity={0.5}/>
      <ambientLight />

     {/*  <group position={[0, -1, 0]}>
        <Cube position={[1,0,0]} color={"orange"} />
        <Cube position={[-1,0,0]} color={"pink"} />
        <Cube position={[-1,2,0]} color={"red"} />
        <Cube position={[1,2,0]} color={"purple"} />
      </group> */}


      <Cube position={[0,0,0]} color={"red"} />
    </Canvas>
  )
}

export default App
