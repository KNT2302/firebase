import React from 'react'
import Container from '../../component/Container'
import InlineEdit from '../../component/InlineEdit'

const Profile = () => {
  return (
    <Container>
      <div style={{ fontSize: '1.8rem', margin: '0 auto' }}>
        <h1>Profile</h1>
        <div style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '1em', paddingBlock:'.5em' }}>
          <div style={{ width: '5em', height: '5em', background: 'gray', borderRadius: '50%' }}>
            {/* image */}
          </div>
          <h2>Display name</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
          <InlineEdit />
          <InlineEdit />
          <InlineEdit />
          <InlineEdit />
          <InlineEdit />
        </div>
      </div>
    </Container>
  )
}

export default Profile
