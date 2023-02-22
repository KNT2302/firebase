import React, { useRef, useState } from 'react'
import Popup from '../../component/Popup'
import Tab from '../../component/Tab'
import Input from '../../component/Input'
import Button from '../../component/Button'


const tabMesList = [
  {
    name: 'Terami',
    query: "/teremi"
  },
  {
    name: 'Ronaldo',
    query: "/Ronaldo"
  },
  {
    name: 'Messi',
    query: "/Messi"
  },
  {
    name: 'Neymar',
    query: "/Neymar"
  },
  {
    name: 'Son',
    query: "/Son"
  }
]

const BoxChat = ({ inbox, sent }) => {
  return (
    <div style={{ display: "flex", flexDirection: `${sent ? 'row-reverse' : 'row'}`, alignItems: 'flex-end', gap: '.5em' }}>
      <div style={{ height: "1em", width: '1em', background: 'white', borderRadius: '50%' }}>

      </div>

      <div style={{ background: 'white', borderRadius: "1em", padding: '.5em', display: 'inline-block' }}>
        inbox
      </div>

    </div>
  )
}

const Sender = () => {
  const inputRef = useRef(null)
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '.5em', alignItems: 'flex-end', fontSize: '1em' }}>
      <div style={{ borderRadius: '1em', overflow: 'hidden', flex: '1', transition: '.3s' }}>

        <Input textarea ref={inputRef} type="text" />
      </div>
      <div style={{ padding: '0 .5em' }}>

        <Button name="Send" onClick={() => { }} />
      </div>
    </div>
  )
}

const Chat = ({ query }) => {
  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%', minHeight:'50vh'}}>
      <h1>{query}</h1>
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'flex-end', padding: '.5em', flex:'1'}}>

        {query?
        <>
         <BoxChat />
        <BoxChat sent />
        <Sender />
        
        </>:
        <>Chat</>
        }

       

      </div>

    </div>
  )
}
const Message = () => {

  const [query, setQuery] = useState("")

  const handleUser = (query) => {

    setQuery(query)

  }

  const itemTab =(query, setTab,key)=>{
    return (
      <div key={key} style={{display:'flex', alignItems:'flex-start', padding:'.5em', gap:'.5em'}} onClick={()=>{setTab(query)}}>
        <div style={{width:'2em', height:'2em', background:'white', borderRadius:'50%'}}></div>
        <div>
          <h1 style={{fontSize:'1.2em'}}>{query}</h1>
          <p>message</p>
        </div>
      </div>
    )
  }

  const getChildren = () => {
    return (
      <div style={{ width: '100%'}}>
        <Tab listTab={tabMesList} row setTab={handleUser} itemTab={itemTab}>
          <Chat query={query} />
        </Tab>
      </div>
    )

  }
  return (
    <>
      <Popup name="Message" getChildren={getChildren} position={{bottom:'0%',left:'0'}}/>
    </>
  )
}

export default Message
