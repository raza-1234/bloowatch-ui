import "../../css/Footer.css"
import React from 'react'
import instaPic1 from "../../assets/instagram-1.png"
import instaPic2 from "../../assets/instagram-3.png"
import instaPic3 from "../../assets/instagram-4.png"

const Footer = () => {
  return (
    <footer data-testid = "footer" className='bloowatch-footer'>
      <div data-testid = "footer__wrapper" className='bloowatch-footer__wrapper'>
        <div data-testid = "footer-col" className='bloowatch-footer__col'>
          <h3>About</h3>
          <p data-testid = "bloowatch_text">Bloowatch is specialized software for watersports 
          schools (surfing. kitesurfing. sailing. and diving) and 
          outdoor activity providers (sking, climbing)
          </p>
        </div>
        <div data-testid = "footer-col" className='bloowatch-footer__col'>
          <h3>Contact</h3>
          <p data-testid = "address">156-677-124-442-2887<br/>
          wave@bloowatch.com<br/>
          Spain
          </p>
        </div>
        <div data-testid = "footer-col" className='bloowatch-footer__col'>
          <h3>Useful Links</h3>
          <p data-testid = "pages">About us <br/>
          History <br/>
          Contact us
          </p>
        </div>
        <div data-testid = "footer-col" className='bloowatch-footer__col'>
          <h3>Instagram</h3>
          <div data-testid = "images" className='bloowatch-footer__insta-images'>
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
