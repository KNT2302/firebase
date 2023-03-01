const TabChat = (tab, setTab, key) => {
  const messageDisplay = tab.lastMessenge
  const isNew = messageDisplay.split(":")[1]

  return (
    <div key={key} style={{ display: 'flex', alignItems: 'flex-start', padding: '.5em', gap: '.5em', width: '150px', overflow: 'hidden', cursor: 'pointer', flexShrink: '0' }} onClick={() => { setTab(tab.query, tab.userToken) }}>
      <div style={{ width: '2em', height: '2em', background: 'white', borderRadius: '50%', flexShrink: '0' }}></div>
      <div>
        <h1 style={{ fontSize: '1.2em', textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap' }}>{tab.name}</h1>
        <p style={{ textOverflow: "ellipsis", overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: `${isNew ? "700" : '500'}` }}>
          {messageDisplay.split(":")[0]}
        </p>
      </div>
    </div>
  )
}

export default TabChat

