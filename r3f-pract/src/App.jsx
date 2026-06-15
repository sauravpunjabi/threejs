import {useRef, useState} from 'react'
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

const Sphere = ({position, size, color}) => {
const ref = useRef()
const [isHovered, setIsHovered] = useState(false) 


  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2
  })

  return(
    <mesh position={position} ref={ref} onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
    >
      <sphereGeometry args={size}/>
      <meshStandardMaterial color={isHovered ? "orange" : "hotpink"} wireframe/>
    </mesh>
  )
}

const Torus = ({position, size, color}) => {
  return(
    <mesh position={position}  >
      <torusGeometry args={size}/>
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Donut = ({position, size, color}) => {
const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 3
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2 
})

  return(
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size}/>
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


      {/* <Cube position={[0,0,0]} color={"red"} /> */}

      <Sphere position={[0,0,0]} size={[1, 30, 30]} color={"hotpink"} />


    
   {/*    <Torus position={[2,0,0]} size={[0.8, 0.1, 30, 30]} color={"blue"} />
      <Donut position={[-2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color={"purple"} /> */}
    </Canvas>
  )
}

export default App
