import React from 'react'
import axiosProvider from '../ulti/axios'
import Search from './Search'

const SearchTab = ({ handleSetDataSearch, urlApi }) => {

  const searchTab = async (search) => {
    return new Promise(async (resolve) => {
      const data = await axiosProvider.get(urlApi + search)
      handleSetDataSearch(data.data)

      resolve('finished')
      console.log(data)

    })
  }
  return (
    <div style={{ padding: '.5em .5em .5em 0' }}>
      <Search searchCall={searchTab} />
    </div>
  )
}

export default SearchTab
