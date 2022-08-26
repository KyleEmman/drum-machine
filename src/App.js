import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [enabled, setEnabled] = useState(true)
  const [defaultInstrument, setDefaultInstrument] = useState(true)
  const [displayState, setDisplayState] = useState('')
  const rangeRef = useRef()
  const bankRef = useRef()
  const audios = document.getElementsByTagName('audio')

  function playSoundOnKeyPress(event) {
    let eventKey = event.key.toUpperCase()
    let pressedAudio = document.getElementById(eventKey)
    if (!pressedAudio) return
    setDisplayState(pressedAudio.dataset.audioName)
    pressedAudio.play()
    let pressedButton = pressedAudio.parentElement
    pressedButton.style = 'top: 5px; background-color: yellow; '
    setTimeout(() => {
      pressedButton.style = 'background-color: #808080;'
    }, '50');
  }

  function playSound(e) {
    let sound = e.target.children[0]
    sound.play()
    setDisplayState(sound.dataset.audioName)
    console.log(sound.dataset.audioName)
    e.target.style = 'top: 5px; background-color: yellow; '
    setTimeout(() => {
      e.target.style = 'background-color: #808080;'
    }, '50');
  }

  function powerOff(e) {
    setEnabled(prev => !prev)
    e.target.style = 'float: left;'
    bankRef.current.classList.add('no-click')
  }

  function powerOn(e) {
    setEnabled(prev => !prev)
    e.target.style = 'float: right'
    bankRef.current.classList.remove('no-click')
  }

  function offDefaultInstrument(e) {
    setDefaultInstrument(prev => !prev)
    e.target.style = 'float: left'
  }

  function onDefaultInstrument(e) {
    setDefaultInstrument(prev => !prev)
    e.target.style = 'float: right'
  }

  function handleChangeVolume(e) {
    Array.from(audios).forEach(audio => {
      audio.volume = e.target.value
    })
    setDisplayState(Math.round(e.target.value*100)) //convert volume value to 0-100
    setTimeout(() => {
      setDisplayState('')
    }, "1000")
  }

  useEffect (() => {
    if (enabled === false) {
      rangeRef.current.disabled = true
    }else rangeRef.current.disabled = false
  }, [enabled])

  useEffect(() => {
    
    window.addEventListener('keydown', playSoundOnKeyPress)
    return () => window.removeEventListener('keydown', playSoundOnKeyPress)
  }, [])

  return (
    <>
    <div className="container" id="drum-machine" >
      <div className='drum-keys-container'>
        <button className='key drum-pad' id={defaultInstrument ? "Chord 1" : "Heater 1"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Chord 1" : "Heater 1"} id='Q' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"}></audio>Q</button>
        <button className='key drum-pad' id={defaultInstrument ? "Chord 2" : "Heater 2"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Chord 2" : "Heater 2"} id='W' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"}></audio>W</button>
        <button className='key drum-pad' id={defaultInstrument ? "Chord 3" : "Heater 3"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Chord 3" : "Heater 3"} id='E' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"}></audio>E</button>
        <button className='key drum-pad' id={defaultInstrument ? "Give us a Light" : "Heater 4"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Give us a Light" : "Heater 4"} id='A' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"}></audio>A</button>
        <button className='key drum-pad' id={defaultInstrument ? "Dry Ohh" : "Heater 6"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Dry Ohh" : "Heater 6"} id='S' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"}></audio>S</button>
        <button className='key drum-pad' id={defaultInstrument ? "Bid Hi" : "Dsc Oh"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Bid Hi" : "Dsc Oh"} id='D' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"}></audio>D</button>
        <button className='key drum-pad' id={defaultInstrument ? "Punchy Kick 1" : "Kick n Hat"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Punchy Kick 1" : "Kick n Hat"} id='Z' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"}></audio>Z</button>
        <button className='key drum-pad' id={defaultInstrument ? "Side Stick 1" : "Rp4 Kick 1"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Side Stick 1" : "Rp4 Kick 1"} id='X' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"}></audio>X</button>
        <button className='key drum-pad' id={defaultInstrument ? "Brk Snr" : "Cev H2"} onClick={enabled ? (e) => playSound(e) : null}><audio className='clip' data-audio-name={defaultInstrument ? "Brk Snr" : "Cev H2"} id='C' src={defaultInstrument ? "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}></audio>C</button>
      </div>
      <div className='control-buttons-container'>
        <h5 className='power-h5'>Power</h5>
        <div className='power-div'>
          <button className='power-button' onClick={enabled ? powerOff : powerOn}></button>
        </div>
        <div className='chord-name'>
          <h4 id='display'>{displayState}</h4>
        </div>
        <input type="range" id="volume" name="vol" min="0" max="1" step='0.01' defaultValue='0.50' ref={rangeRef} onChange={handleChangeVolume}></input>
        <h5 className='bank-h5'>Bank</h5>
        <div className='bank-div'>
          <button ref={bankRef} className='bank-button' onClick={defaultInstrument ? offDefaultInstrument : onDefaultInstrument}></button>
        </div>
      </div>
    </div>
    <h4 className='kyle'>By: Kyle E.F.O</h4>
    </>
  );
}

export default App;
