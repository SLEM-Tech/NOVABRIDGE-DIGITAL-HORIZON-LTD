import React from 'react'
import img1 from "../src/assets/home-image.png"

function Home() {
  return (
    <div id='home'>
        <img src={img1} alt="" className='home-img'/>
        <div className='home-text'>
            <h1>Discover Timeless Elegance with Timezone</h1>
            <p>we believe that every second counts. Our carefully curated collection of luxury and everyday timepieces offers more than just a way to keep time—they reflect your style, precision, and craftsmanship.</p>
            <div className="home-btns">
                <button className='shop'>Shop now</button>
                <button className='collections'>New collections</button>
            </div>
        </div>
        
    </div>
  )
}

export default Home