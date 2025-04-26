import React from 'react'
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision'

const Hero = () => {
  return (
<BackgroundBeamsWithCollision className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
    <div>
        <div>some text goes here</div>
        <div>a big black logo goes here</div>

    </div>
    </BackgroundBeamsWithCollision>
  )
}

export default Hero

