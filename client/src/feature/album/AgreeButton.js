import React from 'react'
import Button from '../../component/Button'

const AgreeButton = ({handleOnClick}) => {
  return (
    <Button onClick={handleOnClick} name="Agree" type="button" />
  )
}

export default AgreeButton
