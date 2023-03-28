import React from 'react'
import { Link, useParams } from 'react-router-dom'

const LinkTab = ({ index, route, name, tab, typeTab }) => {
  const params = useParams()

  const chooseTab = params[typeTab] ? params[typeTab] : index


  return (
    <Link style={{ color: `${chooseTab === tab || chooseTab === 0 ? 'red' : 'blue'}`, textDecoration: 'none', flex: '1', textAlign: 'center', border: '1px solid lightpink', minHeight: '2em', borderRadius: '1em 1em 0 0', lineHeight: '100%', borderRight: `${index === -1 ? '1px solid lightpink' : 'none'}` }} to={`${route}/${tab}`}>{name}</Link>
  )
}

function TabClick({ tabs, route, tabContent, typeTab }) {
  const params = useParams()
  const handleTabContent = () => {
    const contentItems = tabContent()
    const indexTab = tabs.indexOf(params[typeTab]) >= 0 ? tabs.indexOf(params[typeTab]) : 0
    return contentItems[indexTab]
  }

  const content = handleTabContent()

  return (
    <div style={{ fontSize: '1.8rem' }}>
      <div style={{ display: 'flex' }}>
        {tabs.map((tab, index) => {
          return (
            <LinkTab index={index === tabs.length - 1 ? -1 : index} typeTab={typeTab} key={tab} route={route} name={tab} tab={tab} />
          )
        })}
      </div>
      <div style={{ border: '1px solid lightpink', borderTop: 'none', padding:'.25em' }}>
        {content ? handleTabContent() : <div>Comming soon</div>}
      </div>
    </div>
  )
}

export default TabClick
