const TabChat = (tab, setTab, key) => {
  const messageDisplay = tab.lastMessenge
  const isNew = messageDisplay.split(":")[1]

  return (
    <div key={key} style={{ display: 'flex', alignItems: 'center', padding: '.5em', gap: '.5em', cursor: 'pointer', flexShrink:'1',background: 'rgba(225,225,225,1)',borderRadius:'.5em', margin:'.5em .5em 0em 0', width:'250px', textOverflow:'ellipsis', overflow:'hidden' }} onClick={() => { setTab(tab.query, tab.userToken) }}>
      <div style={{ width: '2em', height: '2em', borderRadius: '50%', flexShrink: '0', backgroundImage: `url(${tab.photoURL})`, backgroundPosition: "center", backgroundSize: 'cover'}}></div>
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

