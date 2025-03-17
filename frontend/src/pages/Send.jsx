import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { useFetchReciever } from "../hooks/useFetchReciever";
import axios from "axios";
import { useState } from "react";
import { SuccessCard } from "../components/SuccessCard";

export const Send = () => {
  const { id } = useParams()
  const reciever = useFetchReciever({id})
  const [amount, setAmount] = useState(0)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const navigate = useNavigate()

  const sendMoney = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKENED_URL}/api/v1/account/transfer`, {
      recieverId: id,
      amount: amount
    }, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    if(!response.data){
      navigate('/dashboard')
    }
    setPaymentSuccess(true)
  }
  if(paymentSuccess){
    return (
      <div className="bg-slate-300 h-screen w-full flex justify-center items-center">
        <SuccessCard />
      </div>
    )
  }
  return (
    <div className="bg-slate-300 h-screen w-full flex justify-center items-center">
      <div className="w-80 bg-white p-4 flex-col rounded-md">
        <h1 className="text-2xl text-center my-2">Sending Money to</h1>
        <div className='my-8'>
          <Avatar name={reciever} />
          <span className="ml-2 font-bold">{reciever}</span>
        </div>
        <div className="py-2">
          <label className="block text-left text-sm mb-1">Amount to be paid</label>
          <input
            type='number'
            className="w-full p-3 outline-green-300 outline-2 rounded-md placeholder:text-sm text-sm"
            onChange={(e)=>setAmount(e.target.value)}
          />
          <Button label={'Pay'} onClick={sendMoney}/>
        </div>
      </div>
    </div>
  );
};
