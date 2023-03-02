import { useEffect, useState } from 'react'

const useGetUserId = (isUser) => {
  const [getUserId, setGetUserId] = useState(0)


  const userId = JSON.parse(localStorage.getItem('user')).data ? JSON.parse(localStorage.getItem('user')).data.userId : ""

  let user = null
  if (isUser) {
    user = JSON.parse(localStorage.getItem('user')).data ? JSON.parse(localStorage.getItem('user')).data : null
  }

  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        setGetUserId(getUserId + 1)

      }, 1000)
    }


  }, [getUserId])

  return isUser ? user : userId
}
export default useGetUserId
