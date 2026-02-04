import { useState } from 'react'
import { FaBolt } from 'react-icons/fa'
import './App.css'

function App() {
  const [showQR, setShowQR] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hello, setHello] = useState("Hola Facu!")
  
  // Using a QR code API service to generate QR code as an image
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent('https://www.youtube.com/watch?v=cAaYMTBjB68&list=PL_vGrerK7fHt9ZcGU-VWpgKYxZ1I360tp&index=1')}`

  const handleRevealQR = () => {
    setShowQR(true)
    setHello("Hola FuckYou!")
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className="app">
      <div style={{flexDirection: 'column'}}>
        <div
          className="rock-title"
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            height: '2.5rem',
            marginBottom: '1rem',
       
          }}
        >
          {hello}
        </div>
        <div className="qr-container" onClick={handleRevealQR}>
          {!showQR ? (
            <div className="question-mark">
              <span className="lightning-svg">
                <FaBolt
                  size={96}
                  color="black"
                  style={{
                    textShadow: '0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 8px #fff'
                  }}
                />
              </span>
              <p className="rock-text">Hace click aca barbeta y escanea el QR</p>
            </div>
          ) : (
            <div className="qr-code-wrapper">
              {!imageLoaded && (
                <div className="qr-loading">
                  <span>...</span>
                </div>
              )}
              <img 
                src={qrCodeUrl} 
                alt="QR Code for 'Hello World!'" 
                className={`qr-code ${imageLoaded ? 'loaded' : ''}`}
                onLoad={handleImageLoad}
              />
            </div>
          )}
        </div>
        <div className="thank-you-message" style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '1.2rem',
          fontStyle: 'italic'
        }}>
          Un agradecimiento por ser tan piola!
        </div>
      </div>
    </div>
  )
}

export default App
