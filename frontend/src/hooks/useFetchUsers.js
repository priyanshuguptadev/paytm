import axios from "axios"
import { useEffect, useState } from "react"

export const useFetchUsers = ({filter}) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKENED_URL}/api/v1/user/bulk?filter=${filter}`)
    .then(response=>{
      setUsers(response.data),
      setLoading(false)
    })
    .catch((e)=>console.log(e))
  }, [filter])
  
  return {users, loading}
}