import React, { useState } from 'react'

const RemainingTask = ({ total, completed }) => {
  const finished = completed / total === 1
  const processing = completed / total >= 0.5
  return (
    <div style={{ fontWeight: '700' }}>
      (<span style={{ color: `${finished ? 'green' : (processing ? 'orange' : 'red')}` }}>{completed}</span>/{total})
    </div>
  )
}
const Task = ({ task }) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <div style={{ display: 'flex', width: '100%', gap: '1em', padding: '.5em', background: `${isHover ? 'rgba(225,225,225,.5)' : 'white'}`, marginLeft: '-.5em', cursor: 'pointer' }} onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}>
      <p style={{}}>{task.mission}</p>
      <RemainingTask total={task.total} completed={task.completed} />
    </div>
  )
}

export default Task
