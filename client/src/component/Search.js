import React, { useRef } from 'react'
import Input from './Input'
import { IoIosSearch } from "react-icons/io"
import Button from './Button'

const Search = ({searchCall}) => {

  const searchRef = useRef(null)

  const doSearch = () => {
    searchCall()
  }
  return (
    <div style={{ background: 'white', border: '2px solid rgba(225,225,225,1)', padding: '0 .5em', borderRadius: '.5em', fontSize: '1.8rem', width: '100%', display: 'flex', alignItems: 'center' }}>
      <Input ref={searchRef} type="text" placeholder="Search" />
      <Button type='button' name={<IoIosSearch />} onClick={doSearch} />
    </div>
  )
}

export default Search
