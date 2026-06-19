import NavBar from './components/NavBar'
import Hero from './sections/Hero'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Message from './sections/Message';
import Flavors from './sections/Flavors';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <main>
        <NavBar />

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Hero />
            <Message />
            <Flavors />
            <div className="border border-red-500 h-screen" />
          </div>
        </div>
        
    </main>
  )
}

export default App