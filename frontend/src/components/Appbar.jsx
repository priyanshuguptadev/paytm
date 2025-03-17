import { useEffect, useState } from "react"
import { DropdownAvatar } from "./DropdownAvatar"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const AppBar = () => {
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()
  const logout = () => {
    localStorage.setItem("token", '')
    navigate('/signin')
  }
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKENED_URL}/api/v1/user/username`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((res)=>{
      setName(res.data.firstName)
      setUserName(res.data.username)
    })
  }, [])
  return (
    <div className='w-full md:px-24 py-2 px-2 flex justify-between'>
      <div className='text-xl font-extrabold text-green-500'>PayPaisa</div>
      <div className='text-sm'>
        <DropdownAvatar logoutOnClick={logout} balanceOnClick={()=>navigate('/balance')} name={name} username={userName}/>
      </div>
    </div>
  )
}