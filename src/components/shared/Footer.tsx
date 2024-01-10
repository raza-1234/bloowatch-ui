import React from 'react'
import "../../css/Footer.css"
import instaPic1 from "../../assets/instagram-1.png"
import instaPic2 from "../../assets/instagram-3.png"
import instaPic3 from "../../assets/instagram-4.png"

const Footer = () => {
  return (
    <footer className='sec-footer bloowatch-footer'>
      <div className='footer-wrapper bloowatch-footer__wrapper container'>
        <div className='footer-col-1 bloowatch-footer__col-1'>
          <h3>About</h3>
          <p>Bloowatch is specialized software for watersports <br/>
          schools (surfing. kitesurfing. sailing. and diving) and <br/>
          outdoor activity providers (sking, climbing)
          </p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>156-677-124-442-2887<br/>
          wave@bloowatch.com<br/>
          Spain
          </p>
        </div>
        <div>
          <h3>Useful Links</h3>
          <p>About us <br/>
          History<br/>
          Contact us
          </p>
        </div>
        <div>
          <h3>Instagram</h3>
          <div className='insta_images bloowatch-footer__insta-images'>
            <img src={instaPic1} alt='insta-pic1'/>
            <img src={instaPic2} alt='insta-pic2'/>
            <img src={instaPic3} alt='insta-pic3'/>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
