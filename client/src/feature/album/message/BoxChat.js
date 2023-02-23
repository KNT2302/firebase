const BoxChat = ({ inbox, sent }) => {
  return (
    <div style={{ display: "flex", flexDirection: `${sent ? 'row-reverse' : 'row'}`, alignItems: 'flex-end', gap: '.5em', marginBlock: '.5em' }}>
      <div style={{ height: "1em", width: '1em', background: 'white', borderRadius: '50%', flexShrink: '0' }}>

      </div>

      <div style={{ background: 'white', borderRadius: "1em", padding: '.5em', display: 'inline-block' }}>
        {inbox.message}
      </div>

    </div>
  )
}

export default BoxChat
