import useGetUserId from "../../../ulti/hooks/getUserId"

const BoxChat = ({ inbox, sent, friend, isLastSent, sameUser }) => {

  const isUser = true

  const user = useGetUserId(isUser)

  return (

    <div style={{ display: "flex", flexDirection: `${sent ? 'row-reverse' : 'row'}`, alignItems: 'flex-end', gap: '.5em', marginBlock: '.5em' }}>

      <div style={{ height: "2rem", width: '2rem', borderRadius: '50%', flexShrink: '0', backgroundImage: `${isLastSent ? `url(${sent ? user.photoURL : friend.photoURL})` : 'none'}`, backgroundPosition: "center", backgroundSize: 'cover' }}>

      </div>

      <div style={{ background: 'rgba(225,225,225,1)', borderRadius: "1em", padding: '.5em', display: 'inline-block' }}>
        {inbox.message}
      </div>

    </div>
  )
}

export default BoxChat
