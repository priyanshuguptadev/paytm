import axios from "axios"
import { useEffect, useState } from "react"

export const useFetchReciever = ({id}) => {
  const [reciever, setReciever] = useState("")
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKENED_URL}/api/v1/user/${id}`)
    .then(response=>setReciever(response.data.firstName))
  }, [])
  return reciever
}