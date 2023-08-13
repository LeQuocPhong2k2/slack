'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setUserList } from '@/redux/slice/userSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { use, useEffect } from 'react'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { userList, value, loading } = useSelector((state: RootState) => state.user)

  const getChannles = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    dispatch(setUserList(data))
  }

  useEffect(() => {
    getChannles()
  }, [])
  const channels = useSelector((state: RootState) => state.user.userList)
  console.log(channels)
  return (
    <div>
      {/* {loading ? (
        <h1>Loading...</h1>
      ) : (
        data?.map((user: any) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
          </div>
        ))
      )}

      <button onClick={() => dispatch(increment())}>Click on me</button>
      {value} */}
    </div>
  )
}
