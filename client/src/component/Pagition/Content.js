import React from 'react'

const Content = ({ data }) => {
  return (
    <div>{data && JSON.stringify(data)}</div>
  )
}

export default Content
