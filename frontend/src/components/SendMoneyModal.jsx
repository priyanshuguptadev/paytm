import { useFetchReciever } from "../hooks/useFetchReciever";
import axios from "axios";
import { useState } from "react";
export const SendMoneyModal = ({ id }) => {
  const reciever = useFetchReciever({ id });
  const [amount, setAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const sendMoney = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENED_URL}/api/v1/account/transfer`,
        {
          recieverId: id,
          amount: amount,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data) {
        setPaymentSuccess(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <a
        className="btn btn-square btn-ghost"
        onClick={() => document.getElementById(id).showModal()}
      >
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </a>
      <dialog id={id} className="modal">
        <div className="modal-box">
          {paymentSuccess ? (
            <img src="/images/success.svg" className="mx-auto"/>
          ) : (
            <div>
              <h3 className="font-bold text-xl">{reciever}</h3>
              <form id="amount-input">
                <input
                  type="number"
                  placeholder="Enter the amount"
                  className="input mt-4 w-full p-4"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </form>
              <button
                className="btn btn-primary mt-8 w-full"
                onClick={sendMoney}
              >
                {"Pay"}
              </button>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              document.getElementById("amount-input").reset();
              setPaymentSuccess(false);
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
};
