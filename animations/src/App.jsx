import React from 'react'
import NavBar from './components/NavBar'
import Hero from './sections/Hero'
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Message from './sections/Message';
import Flavors from './sections/Flavors';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
        <NavBar />
        <Hero />
        <Message />
        <Flavors />
    </main>
  )
}

export default App