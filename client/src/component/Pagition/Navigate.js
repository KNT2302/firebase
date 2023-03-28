import React from 'react'

const Navigate = ({ setPage, currentPage }) => {
  return (
    <div style={{ display: 'flex', gap: '.5em' }}>
      <div style={{color:`${currentPage === 'from=0&to=4'?'red':'black'}`, background:'lightblue', padding:'.15em', cursor:'pointer'}} onClick={() => { setPage("from=0&to=4") }}>1</div>
      <div style={{color:`${currentPage === 'from=5&to=9'?'red':'black'}`, background:'lightblue', padding:'.15em', cursor:'pointer'}} onClick={() => { setPage("from=5&to=9") }}>2</div>
    </div>
  )
}

export default Navigate
