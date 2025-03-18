import axios from "axios";
import { useEffect, useState } from "react";

export const CheckBalanceModal = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchBalance = () => {
    axios
      .get(`${import.meta.env.VITE_BACKENED_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }
  return (
    <div>
      <a
        className="justify-between"
        onClick={() => {
          fetchBalance()
          document.getElementById("balance-modal").showModal()
        }}
      >
        Balance <span className="badge">New</span>
      </a>
      <dialog id="balance-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-4xl text-success-content">
            {loading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              balance
            )}
          </h3>
          <p className="py-4 text-neutral-content">Remaining Paise</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
