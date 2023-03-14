import useGetUserId from "../../../ulti/hooks/getUserId"
import Picture, { BoxPictures } from "../../../component/Picture"
import useGetPathPictures from "../../../ulti/hooks/getPathPictures"

const BoxChat = ({ inbox, sent, friend, isLastSent, sameUser, isFirstLoad }) => {

  const isUser = true

  const user = useGetUserId(isUser)

  return (

    <div style={{ display: "flex", flexDirection: `${sent ? 'row-reverse' : 'row'}`, alignItems: 'flex-end', gap: '.5em', marginBlock: '.5em' }}>

      <div style={{ height: "2rem", width: '2rem', borderRadius: '50%', flexShrink: '0', backgroundImage: `${isLastSent ? `url(${sent ? user.photoURL : friend.photoURL})` : 'none'}`, backgroundPosition: "center", backgroundSize: 'cover' }}>

      </div>

      <div style={{ background: 'rgba(225,225,225,1)', borderRadius: "1em", padding: '.5em', display: 'inline-block' }}>
        {inbox.pictures.length > 0 && <Pictures pictures={inbox.pictures} isSocket={inbox.isSocket ? true : false}  />}

        {inbox.message}
      </div>

    </div>
  )
}

const Pictures = ({ pictures, isSocket }) => {

  const { getPathPics } = useGetPathPictures(pictures)

  return (

    <div style={{ width: '300px', height: '250px' }}>
      <Picture getSrc={!isSocket ? getPathPics : () => {
        return pictures
      }} multiple={pictures.length > 0} />
    </div>


  )
}

export default BoxChat
