import React, { useEffect, useState } from 'react'
import Content from './Content'
import Navigate from './Navigate'

const Pagition = ({ data, setData, fetchData, firstPage }) => {

  const [page, setPage] = useState(()=>firstPage)

  useEffect(() => {
    const fetchNewPage = async () => {
      const response = await fetchData(page)
      setData(response.data, page)
    }
    if (page !== 'from=0&to=4') {
      fetchNewPage()
    }
  }, [page])

  return (
    <div>
      <Content data={data ? (data[page] ? data[page] : []) : []} />
      <Navigate setPage={setPage} currentPage={page} />
    </div>
  )
}

export default Pagition
