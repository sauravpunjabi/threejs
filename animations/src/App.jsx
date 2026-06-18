import React from 'react'
import NavBar from './components/NavBar'
import Hero from './sections/Hero'
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Message from './sections/Message';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
        <NavBar />
        <Hero />
        <Message />
        <div className='h-dvh border border-red-500'></div>
    </main>
  )
}

export default App