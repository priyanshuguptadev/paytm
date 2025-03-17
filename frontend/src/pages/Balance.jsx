import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Balance = () => {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKENED_URL}/api/v1/account/balance`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(response=>{
      console.log(response.data.balance)
      setBalance(response.data.balance)
      setLoading(false)
      
    })
    .catch((e)=>console.log(e))
  }, [])
  return (
    <div className="w-full h-screen bg-slate-200 flex justify-center items-center">
      <div className="w-80 bg-white flex flex-col gap-2 p-4">
        <div>Your current balance is</div>
        <div className="text-2xl font-bold">{loading ? 'Loading...' : balance}</div>
        <button className="bg-green-500 p-2 text-white hover:cursor-pointer" onClick={()=>navigate("/balance")}>Refresh</button>
        <button className="bg-red-500 p-2 text-white hover:cursor-pointer" onClick={()=>navigate('/dashboard')}>Back</button>
      </div>
    </div>
  )
}