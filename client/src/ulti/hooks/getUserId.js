import { useEffect, useState } from 'react'

const useGetUserId = () => {
  const [getUserId, setGetUserId] = useState(0)


  const userId = JSON.parse(localStorage.getItem('user')).data ? JSON.parse(localStorage.getItem('user')).data.userId : ""


  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        setGetUserId(getUserId + 1)

      }, 1000)
    }


  }, [getUserId])

  return userId
}
export default useGetUserId
