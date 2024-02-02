import React from 'react'

const Reset = ({ onReset,xScore,yScore,playAgain}) => {
  return (
    <>
      <div className='winning-points'><p>X:{xScore}</p></div>
      <div className='winning-points'><p>O:{yScore}</p></div>
      <div onClick={playAgain} className='reset'><button className='reset-btn'>Play Again</button></div>
      <div onClick={onReset} className='reset'><button className='reset-btn'>Reset</button></div>
    </>
  )
}

export default Reset