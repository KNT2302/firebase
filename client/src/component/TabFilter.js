import React, { useCallback, useEffect, useState } from 'react'



const TabItem = ({ changeQuery, query }) => {
  return (
    <div style={{ padding: '.25em 1em', borderRadius: '1em', border: '1px solid lightpink', cursor: 'pointer' }} onClick={() => { changeQuery(query) }}>User 1</div>
  )
}

const TabFilter = ({ data, changeQuery, getContent, beginStringQuery, getTab, reverse, setData }) => {


  const [stringQuery, setStringQuery] = useState(() => beginStringQuery)

  const handleChangeQuery = useCallback((query) => {
    const string = changeQuery(query)
    console.log(string)
    setStringQuery(string)
  }, [])



  const content = () => {
    return getContent(stringQuery, data, setData)
  }


  return (
    <div style={{ display: 'flex', flexDirection: `${reverse ? 'column-reverse' : 'column'}` }}>
      <div style={{ display: 'flex', gap: '.25em' }}>
        {getTab ? getTab(handleChangeQuery, stringQuery) : <>
          <TabItem query="user1" changeQuery={handleChangeQuery} />
          <TabItem query="user2" changeQuery={handleChangeQuery} />
        </>}
      </div>
      <div>
        {content()}
      </div>
    </div>
  )
}

export default TabFilter
