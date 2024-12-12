'use client'
import accountApiRequest from '@/apiRequests/account'
import { handleErrorApi } from '@/lib/utils'
import { cookies } from 'next/headers'
import { useEffect } from 'react'

export default function MeProfile() {
  useEffect(() => {

    // fetch("http://localhost:8080/users/my-info")
    // .then((response) => {
    //   return response.json();
    // })
    // .then((res) => {
    //   console.log("🚀 ~ .then ~ users:", res.data)
    // });

    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.meClient()
        console.log(result)
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
    fetchRequest()
  }, [])
  return (
    <div>
      <h1>Profile</h1>
      {/* <div>Xin chào {result.payload.data.name}</div> */}
      {/* <Profile /> */}
    </div>
  )
}