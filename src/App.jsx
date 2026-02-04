import { useState } from 'react'
import { FaBolt } from 'react-icons/fa'
import './App.css'

function App() {
  const [showQR, setShowQR] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hello, setHello] = useState("Hola Facu!")
  const [showMemeModal, setShowMemeModal] = useState(false)
  const [currentMeme, setCurrentMeme] = useState(null)
  const [memeLoading, setMemeLoading] = useState(false)
  
  // Using a QR code API service to generate QR code as an image
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent('https://www.youtube.com/watch?v=cAaYMTBjB68&list=PL_vGrerK7fHt9ZcGU-VWpgKYxZ1I360tp&index=1')}`

  const fetchRandomDog = async () => {
    setMemeLoading(true)
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await response.json()
      
      if (data.status === 'success') {
        // Asegurar que no sea la misma imagen anterior
        if (!currentMeme || data.message !== currentMeme.url) {
          setCurrentMeme({
            url: data.message,
            title: '¡Aquí tienes un perrito para alegrarte el día! 🐕',
            postLink: '#'
          })
        } else {
          // Si es la misma imagen, pedir otra
          const newResponse = await fetch('https://dog.ceo/api/breeds/image/random')
          const newData = await newResponse.json()
          setCurrentMeme({
            url: newData.message,
            title: '¡Aquí tienes un perrito para alegrarte el día! 🐕',
            postLink: '#'
          })
        }
      } else {
        throw new Error('API response not successful')
      }
    } catch (error) {
      console.error('Error fetching dog image:', error)
      setCurrentMeme({
        url: 'https://images.dog.ceo/breeds/hound-english/n02089973_612.jpg',
        title: '¡Perrito de respaldo para ti! 🐕'
      })
    }
    setMemeLoading(false)
  }

  const handleRevealQR = async () => {
    const password = prompt("Ingresa el nombre de la editorial para ver el QR:")
    
    if (password === "minotauro") {
      setShowQR(true)
      setHello("Hola FuckYou!")
    } else if (password !== null) {
      // Si la contraseña es incorrecta pero no presionó cancelar, mostrar perrito
      await fetchRandomDog()
      setShowMemeModal(true)
    }
    // Si presionó cancelar (password === null), no hacer nada
  }

  const closeMemeModal = () => {
    setShowMemeModal(false)
    setCurrentMeme(null)
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
        {showQR && (
                <div style={{
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '1rem',
                  fontSize: '1rem',
                  fontStyle: 'italic'
                }}>
                  -una playlist a medida curada por mi-
                </div>
              )}
      </div>

      {/* Modal de Meme */}
      {showMemeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            borderRadius: '15px',
            border: '2px solid #888888',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              color: '#cccccc',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              ¡LA CLAVE ESTA COMO EL ORTO PERO ACA TENES UN PERRO !
            </h2>
            
            {memeLoading ? (
              <div style={{
                color: 'white',
                fontSize: '1.2rem'
              }}>
                Cargando perrito... ⚡
              </div>
            ) : currentMeme ? (
              <div>
                <img 
                  src={currentMeme.url}
                  alt={currentMeme.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    marginBottom: '1rem'
                  }}
                />
                <p style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  {currentMeme.title}
                </p>
              </div>
            ) : null}
            
            <button 
              onClick={closeMemeModal}
              style={{
                backgroundColor: '#888888',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Cerrar
            </button>
            
            <button 
              onClick={async () => {
                await fetchRandomDog()
              }}
              style={{
                backgroundColor: 'transparent',
                color: '#cccccc',
                border: '2px solid #888888',
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Otro perrito 🐕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
